const clamp=(value,fallback=.7)=>Number.isFinite(Number(value))?Math.max(0,Math.min(1,Number(value))):fallback;
const KINDS=new Set(['deal','draw','play','uno','win']);

// All effects share one gain bus. Audio starts only after an explicit gesture.
// The short UNO recording is fetched/decoded once and never uses device TTS.
export class UnoAudio {
  constructor({Context=globalThis.AudioContext||globalThis.webkitAudioContext,enabled=true,volume=.7,onChange=()=>{},setTimer=(...args)=>globalThis.setTimeout(...args),clearTimer=(...args)=>globalThis.clearTimeout(...args),fetcher=(...args)=>globalThis.fetch(...args),voiceURL='./assets/audio/uno-call.wav?v=20261108-fx'}={}){
    this.Context=Context;this.enabled=!!enabled;this.volume=clamp(volume);this.onChange=onChange;
    this._setTimer=(...args)=>setTimer(...args);this._clearTimer=(...args)=>clearTimer(...args);this._fetch=(...args)=>fetcher(...args);this.voiceURL=voiceURL;
    this.ctx=null;this.master=null;this.noise=null;this.voice=null;this._voicePromise=null;this._voiceFailed=false;
    this.sources=new Set();this._epoch=0;this._voiceRequest=null;this._voiceTimer=null;
    this._disposed=false;this._activated=false;this.blocked=false;this.error='';this.loadingVoice=false;
    this._emit();
  }
  state(){return{supported:typeof this.Context==='function',enabled:this.enabled,volume:this.volume,unlocked:!!this.ctx&&this._activated&&!this._disposed,blocked:this.blocked,error:this.error,voiceReady:!!this.voice,loadingVoice:this.loadingVoice};}
  _emit(){try{this.onChange(this.state());}catch{/* Optional controls cannot stop a game. */}}
  unlock(){
    if(this._disposed||!this.enabled||this.volume<=0||typeof this.Context!=='function')return false;
    try{
      if(!this.ctx){
        const c=this.ctx=new this.Context(),master=this.master=c.createGain();master.gain.value=this.volume*.72;
        if(typeof c.createDynamicsCompressor==='function'){
          this.limiter=c.createDynamicsCompressor();this.limiter.threshold.value=-8;this.limiter.knee.value=10;this.limiter.ratio.value=5;this.limiter.attack.value=.003;this.limiter.release.value=.12;
          master.connect(this.limiter);this.limiter.connect(c.destination);
        }else master.connect(c.destination);
        this.noise=c.createBuffer(1,Math.max(1,Math.round(c.sampleRate*.16)),c.sampleRate);
        const data=this.noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*.85;
      }
      if(this.ctx.state==='closed'){this._activated=false;this.blocked=true;this.error='audio-unavailable';this._emit();return false;}
      const c=this.ctx;this._activated=true;this.blocked=false;this.error=this._voiceFailed?'voice-unavailable':'';
      // resume() is called synchronously in the gesture, before any awaited work.
      if(c.state==='suspended'||c.state==='interrupted'){
        const resumed=c.resume();
        if(resumed&&typeof resumed.then==='function')resumed.then(()=>{if(!this._disposed&&this.ctx===c){this.blocked=false;this._emit();}}).catch(()=>{if(!this._disposed&&this.ctx===c){this.stop();this._activated=false;this.blocked=true;this.error='audio-blocked';this._emit();}});
      }
      this._loadVoice();this._emit();return true;
    }catch{this.stop();this._activated=false;this.blocked=true;this.error='audio-unavailable';this._emit();return false;}
  }
  _loadVoice(){
    if(this._voicePromise||!this.ctx||this._disposed)return;
    const c=this.ctx;this.loadingVoice=true;
    this._voicePromise=(async()=>{
      const response=await this._fetch(this.voiceURL,{cache:'force-cache',credentials:'omit'});
      if(!response.ok)throw Error('UNO recording unavailable');
      const bytes=await response.arrayBuffer();
      const buffer=await new Promise((resolve,reject)=>{
        let done=false;const yes=value=>{if(!done){done=true;resolve(value);}},no=error=>{if(!done){done=true;reject(error);}};
        try{const result=c.decodeAudioData(bytes,yes,no);if(result&&typeof result.then==='function')result.then(yes,no);}catch(error){no(error);}
      });
      if(this._disposed||this.ctx!==c)return;
      this.voice=buffer;this.loadingVoice=false;this._voiceFailed=false;this.error='';this._emit();this._flushVoice();
    })().catch(()=>{
      if(this._disposed||this.ctx!==c)return;
      this.loadingVoice=false;this._voiceFailed=true;this.error='voice-unavailable';this._clearVoiceRequest();this._emit();
    });
  }
  _track(source,nodes,kind,end){
    const entry={source,nodes,kind,cleaned:false};this.sources.add(entry);
    const clean=()=>{if(entry.cleaned)return;entry.cleaned=true;this.sources.delete(entry);for(const node of [source,...nodes])try{node.disconnect();}catch{}};
    entry.clean=clean;source.onended=clean;source.stop(end);return entry;
  }
  _paper(kind,at){
    const c=this.ctx,source=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();source.buffer=this.noise;
    const settings=kind==='deal'?{duration:.065,gain:.11,from:1600,to:3400}:kind==='draw'?{duration:.085,gain:.135,from:1100,to:3100}:{duration:.105,gain:.17,from:3300,to:1350};
    filter.type='bandpass';filter.Q.value=.7;filter.frequency.setValueAtTime(settings.from,at);filter.frequency.exponentialRampToValueAtTime(settings.to,at+settings.duration);
    gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(settings.gain,at+.008);gain.gain.exponentialRampToValueAtTime(.0001,at+settings.duration);
    source.connect(filter);filter.connect(gain);gain.connect(this.master);source.start(at);this._track(source,[filter,gain],kind,at+settings.duration+.015);
    if(kind==='play')this._tone(240,145,at+.006,.055,.025,'triangle',kind);
  }
  _tone(from,to,at,duration,volume,type,kind){
    const c=this.ctx,source=c.createOscillator(),gain=c.createGain();source.type=type;source.frequency.setValueAtTime(from,at);source.frequency.exponentialRampToValueAtTime(to,at+duration);
    gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+.007);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
    source.connect(gain);gain.connect(this.master);source.start(at);this._track(source,[gain],kind,at+duration+.015);
  }
  _sparkle(at){[784,1046.5,1318.5].forEach((hz,i)=>this._tone(hz,hz*1.002,at+i*.045,.14,.022,'sine','uno'));
  }
  _recording(at){
    for(const entry of [...this.sources])if(entry.kind==='uno-voice'){try{entry.source.stop(this.ctx.currentTime);}catch{}entry.clean();}
    const source=this.ctx.createBufferSource(),gain=this.ctx.createGain();source.buffer=this.voice;source.playbackRate.value=1.12;gain.gain.value=.88;source.connect(gain);gain.connect(this.master);
    source.start(at);this._track(source,[gain],'uno-voice',at+this.voice.duration/1.12+.03);
  }
  _clearVoiceRequest(){if(this._voiceTimer!==null)this._clearTimer(this._voiceTimer);this._voiceTimer=null;this._voiceRequest=null;}
  _flushVoice(){
    const request=this._voiceRequest;if(!request||!this.voice)return;
    this._clearVoiceRequest();
    if(request.epoch!==this._epoch||this._disposed||!this.enabled||this.volume<=0||!this._activated)return;
    this._recording(Math.max(request.at,this.ctx.currentTime+.008));
  }
  play(kind,{delay=0}={}){
    if(!KINDS.has(kind)||this._disposed||!this.enabled||this.volume<=0||!this.ctx||!this._activated||this.ctx.state==='closed')return false;
    const wait=Number.isFinite(Number(delay))?Math.max(0,Math.min(4,Number(delay))):0,at=this.ctx.currentTime+.012+wait;
    try{
      if(['deal','draw','play'].includes(kind))this._paper(kind,at);
      else if(kind==='win')[523.25,659.25,784,1046.5].forEach((hz,i)=>this._tone(hz,hz,at+i*.075,.26,.045,'sine','win'));
      else{
        this._sparkle(at);
        if(this.voice)this._recording(at+.025);
        else if(this.loadingVoice){
          this._clearVoiceRequest();this._voiceRequest={epoch:this._epoch,at:at+.025};
          this._voiceTimer=this._setTimer(()=>this._clearVoiceRequest(),Math.round(wait*1000)+1500);
        }
      }
      return true;
    }catch{this.error='audio-unavailable';this._emit();return false;}
  }
  stop(){
    ++this._epoch;this._clearVoiceRequest();
    for(const entry of [...this.sources]){try{entry.source.stop(this.ctx?.currentTime||0);}catch{}entry.clean();}
    this._emit();
  }
  setEnabled(enabled){this.enabled=!!enabled;if(!this.enabled)this.stop();else this._emit();return this.enabled;}
  setVolume(volume){
    this.volume=clamp(volume,this.volume);
    if(this.master&&this.ctx){const t=this.ctx.currentTime;try{this.master.gain.cancelScheduledValues(t);this.master.gain.setTargetAtTime(this.volume*.72,t,.02);}catch{this.master.gain.value=this.volume*.72;}}
    if(this.volume===0)this.stop();else this._emit();return this.volume;
  }
  dispose(){
    if(this._disposed)return;this.stop();this._disposed=true;this._activated=false;
    const c=this.ctx;this.ctx=null;try{this.master?.disconnect();this.limiter?.disconnect();const closed=c?.close();closed?.catch?.(()=>{});}catch{}
  }
}
