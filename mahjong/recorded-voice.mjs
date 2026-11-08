import {getVoiceProfile} from './voice-lines.mjs?v=20261108-voice';

const volumeValue=(value,fallback)=>Number.isFinite(Number(value))?Math.max(0,Math.min(1,Number(value))):fallback;
const failure=code=>Object.assign(new Error(code),{code});

export function findRecordedVoice(assets,stageId,text){
  const profile=getVoiceProfile(stageId);
  if(!profile||typeof text!=='string')return null;
  const key=profile.id+'\n'+text;
  if(!assets||!Object.hasOwn(assets,key))return null;
  const path=assets[key];
  return typeof path==='string'&&/^\.\/assets\/voices\/[a-z0-9-]+\/[a-f0-9]{16}\.mp3(?:\?v=[a-z0-9-]+)?$/i.test(path)?path:null;
}

// Original dialogue is rendered once by a natural Japanese voice and bundled
// with the game. Playback never pitches or time-stretches these recordings.
// Audio resources and downloads begin only after a player's explicit gesture.
export class RecordedCharacterVoice {
  constructor({Context=globalThis.AudioContext||globalThis.webkitAudioContext,assets={},fetcher=(...args)=>globalThis.fetch(...args),onChange=()=>{},enabled=true,volume=.8,now=Date.now,setTimer=(...args)=>globalThis.setTimeout(...args),clearTimer=(...args)=>globalThis.clearTimeout(...args),cacheLimit=24}={}){
    this.Context=Context;this.assets=assets;this.fetcher=(...args)=>fetcher(...args);this.onChange=onChange;
    this.now=()=>now();this.setTimer=(...args)=>setTimer(...args);this.clearTimer=(...args)=>clearTimer(...args);
    this.cacheLimit=Math.max(1,Math.min(48,Math.floor(Number(cacheLimit)||24)));this.cache=new Map();this.loads=new Map();
    this.supported=typeof Context==='function';this.enabled=!!enabled;this.volume=volumeValue(volume,.8);
    this.context=null;this.master=null;this.source=null;this.pending=false;this.speaking=false;this.blocked=false;
    this.text='';this.voiceName='';this.error='';this.availability=this.supported?'ready':'unsupported';
    this._token=0;this._unlocked=false;this._disposed=false;this._resumeTask=null;this._watchdog=null;this._ending=null;
    this._lastKey='';this._lastIssuedAt=-Infinity;this._profileVolume=1;this._emit();
  }
  state(){return{supported:this.supported,enabled:this.enabled,volume:this.volume,speaking:this.speaking,blocked:this.blocked,availability:this.availability,voiceName:this.voiceName,error:this.error,text:this.text,engine:'recorded',loading:this.pending,cachedClips:this.cache.size};}
  _emit(){try{this.onChange(this.state());}catch{/* Optional voice controls cannot block a match. */}}
  asset(stageId,text){return findRecordedVoice(this.assets,stageId,text);}
  unlock(){
    if(!this.supported||this._disposed||!this.enabled||this.volume<=0)return false;
    try{
      if(!this.context){const context=this.context=new this.Context();this.master=context.createGain();this.master.gain.value=this.volume*this._profileVolume;this.master.connect(context.destination);}
      const context=this.context;if(context.state==='closed')throw failure('audio-unavailable');
      this._unlocked=true;this.blocked=false;if(['not-allowed','audio-unavailable','not-started'].includes(this.error))this.error='';
      // resume() must be invoked in the original click/tap, before an await.
      if((context.state==='suspended'||context.state==='interrupted')&&!this._resumeTask){
        const resumed=context.resume();
        const task=Promise.resolve(resumed).then(()=>{
          if(this._disposed||this.context!==context)return false;
          if(context.state!=='running')throw failure('not-allowed');
          this.blocked=false;this._emit();return true;
        }).catch(()=>{
          if(!this._disposed&&this.context===context){this._cancel(true);this._unlocked=false;this.blocked=true;this.error='not-allowed';this.availability='ready';this._emit();}
          return false;
        }).finally(()=>{if(this._resumeTask===task)this._resumeTask=null;});
        this._resumeTask=task;
      }
      this._emit();return true;
    }catch{this._cancel(true);this._unlocked=false;this.blocked=true;this.error='audio-unavailable';this._emit();return false;}
  }
  _clear(name){if(this[name]!==null)this.clearTimer(this[name]);this[name]=null;}
  _cancel(abortLoads=false){
    ++this._token;this._clear('_watchdog');this._clear('_ending');
    const source=this.source;this.source=null;
    if(source){source.onended=null;try{source.stop();}catch{}try{source.disconnect();}catch{}}
    this.pending=false;this.speaking=false;
    if(abortLoads)for(const [url,load] of this.loads){load.controller.abort();this.clearTimer(load.timer);this.loads.delete(url);}
  }
  _remember(url,buffer){
    this.cache.delete(url);this.cache.set(url,buffer);
    while(this.cache.size>this.cacheLimit)this.cache.delete(this.cache.keys().next().value);
  }
  _clip(url){
    if(this.cache.has(url)){const buffer=this.cache.get(url);this._remember(url,buffer);return Promise.resolve(buffer);}
    if(this.loads.has(url))return this.loads.get(url).promise;
    // Fast conversation skips must not start unbounded downloads or decodes.
    while(this.loads.size>=2){const [oldURL,old]=this.loads.entries().next().value;old.controller.abort();this.clearTimer(old.timer);this.loads.delete(oldURL);}
    const context=this.context,load={controller:new AbortController(),timer:null,promise:null};
    load.timer=this.setTimer(()=>load.controller.abort(),12000);
    const alive=()=>!this._disposed&&this.context===context&&!load.controller.signal.aborted&&this.loads.get(url)===load;
    this.loads.set(url,load);
    load.promise=(async()=>{
      const response=await this.fetcher(url,{signal:load.controller.signal,cache:'force-cache',credentials:'omit'});
      if(!response.ok||!alive())throw failure('recording-unavailable');
      const bytes=await response.arrayBuffer();if(!alive())throw failure('recording-unavailable');
      const buffer=await new Promise((resolve,reject)=>{
        let settled=false;const ok=value=>{if(!settled){settled=true;resolve(value);}},bad=error=>{if(!settled){settled=true;reject(error);}};
        try{const result=context.decodeAudioData(bytes,ok,bad);result?.then?.(ok,bad);}catch(error){bad(error);}
      });
      if(!alive()||!buffer||!Number.isFinite(buffer.duration)||buffer.duration<=0||buffer.duration>45)throw failure('recording-unavailable');
      this._remember(url,buffer);return buffer;
    })().finally(()=>{this.clearTimer(load.timer);if(this.loads.get(url)===load)this.loads.delete(url);});
    return load.promise;
  }
  speak(stageId,text,{key='',priority='dialogue',force=false}={}){
    if(!this.supported||this._disposed||!this.enabled||this.volume<=0)return false;
    const profile=getVoiceProfile(stageId),url=this.asset(stageId,text);if(!profile||!url)return false;
    if(!this._unlocked||!this.context){this.blocked=true;this.error='not-allowed';this._emit();return false;}
    const identity=profile.id+':'+(key||text);
    if(!force&&identity===this._lastKey)return false;
    if(!force&&priority==='ambient'&&(this.pending||this.source||this.now()-this._lastIssuedAt<12000))return false;
    this._cancel();const token=this._token,context=this.context;
    this._lastKey=identity;this._lastIssuedAt=this.now();this._profileVolume=profile.volume??1;
    this.text=text;this.voiceName=profile.name+' · 自然な日本語音声';this.error='';this.blocked=false;this.pending=true;this.availability='loading';
    const current=()=>!this._disposed&&token===this._token&&this.enabled&&this.volume>0&&this._unlocked;
    const fail=error=>{
      if(!current())return;this._cancel(true);this._lastKey='';this.error=error?.code||'recording-unavailable';this.blocked=context.state!=='running';this.availability='ready';this._emit();
    };
    this._watchdog=this.setTimer(()=>fail(failure(context.state==='running'?'recording-unavailable':'not-started')),15000);
    this._emit();
    Promise.all([this._clip(url),this._resumeTask||Promise.resolve(true)]).then(([buffer,resumed])=>{
      if(!current())return;if(!resumed||context.state!=='running')throw failure('not-allowed');
      this._clear('_watchdog');
      const source=context.createBufferSource();source.buffer=buffer;source.playbackRate.value=1;
      this.master.gain.value=this.volume*this._profileVolume;source.connect(this.master);this.source=source;
      const end=()=>{if(!current()||this.source!==source)return;this._clear('_ending');this.source=null;this.pending=false;this.speaking=false;this.availability='ready';try{source.disconnect();}catch{}this._emit();};
      source.onended=end;source.start(context.currentTime+.008);this.pending=false;this.speaking=true;this.availability='ready';
      this._ending=this.setTimer(()=>{if(current()&&this.source===source){try{source.stop();}catch{}end();}},Math.ceil(buffer.duration*1000)+750);
      this._emit();
    }).catch(fail);
    return true;
  }
  stop(){this._cancel(true);this.text='';this.availability=this.supported?'ready':'unsupported';this._emit();}
  setEnabled(value){this.enabled=!!value;if(!this.enabled)this.stop();else this._emit();return this.enabled;}
  setVolume(value){
    this.volume=volumeValue(value,this.volume);
    if(this.master&&this.context){try{this.master.gain.setTargetAtTime(this.volume*this._profileVolume,this.context.currentTime,.015);}catch{this.master.gain.value=this.volume*this._profileVolume;}}
    if(this.volume===0)this.stop();else this._emit();return this.volume;
  }
  dispose(){if(this._disposed)return;this.stop();this._disposed=true;this._unlocked=false;this.cache.clear();try{this.master?.disconnect();this.context?.close()?.catch?.(()=>{});}catch{}this.context=null;this.master=null;}
}
