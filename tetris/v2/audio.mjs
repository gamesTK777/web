// Original 126 BPM house arrangement, synthesized locally. No external audio files.
export const BPM=126;
const hz=midi=>440*2**((midi-69)/12);
export class GameAudio {
  constructor({contextFactory=()=>new (window.AudioContext||window.webkitAudioContext)(),setTimer=(fn,ms)=>setInterval(fn,ms),clearTimer=id=>clearInterval(id)}={}) {
    this.factory=contextFactory;this.setTimer=setTimer;this.clearTimer=clearTimer;
    this.ctx=null;this.musicEnabled=true;this.sfxEnabled=true;this.playing=false;this.volume=.42;
    this.timer=null;this.step=0;this.nodes=new Set();
  }
  unlock() {
    try {
      if(!this.ctx){
        const c=this.ctx=this.factory();this.master=c.createGain();this.master.gain.value=.72;
        const limiter=c.createDynamicsCompressor();limiter.threshold.value=-10;limiter.knee.value=12;limiter.ratio.value=6;limiter.attack.value=.003;limiter.release.value=.16;
        this.master.connect(limiter);limiter.connect(c.destination);
        this.fx=c.createGain();this.fx.gain.value=.65;this.fx.connect(this.master);
        this.noise=c.createBuffer(1,c.sampleRate,c.sampleRate);const data=this.noise.getChannelData(0);
        for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
      }
      if(this.ctx.state==='suspended')this.ctx.resume().then(()=>this.startMusic()).catch(()=>{});
      else this.startMusic();
    } catch {this.ctx=null;}
  }
  setPlaying(active,restart=false) {
    this.playing=active;if(restart){this.stopMusic();this.step=0;}
    if(active)this.startMusic();else this.stopMusic();
  }
  setMusic(enabled){this.musicEnabled=enabled;if(enabled)this.startMusic();else this.stopMusic();}
  setVolume(value){this.volume=Math.max(0,Math.min(1,value));if(this.music)this.music.gain.setTargetAtTime(this.volume,this.ctx.currentTime,.04);}
  startMusic(){
    if(!this.playing||!this.musicEnabled||!this.ctx||this.ctx.state!=='running'||this.timer!==null)return;
    this.music=this.ctx.createGain();this.music.gain.value=this.volume;this.music.connect(this.master);
    this.duck=this.ctx.createGain();this.duck.connect(this.music);
    this.next=this.ctx.currentTime+.04;this.pump();this.timer=this.setTimer(()=>this.pump(),25);
  }
  stopMusic(){
    if(this.timer!==null){this.clearTimer(this.timer);this.timer=null;}
    if(!this.ctx)return;
    const t=this.ctx.currentTime;
    const bus=this.music;
    if(this.music){bus.gain.cancelScheduledValues(t);bus.gain.setTargetAtTime(0,t,.008);this.music=null;}
    for(const node of this.nodes)if(node.music){try{node.source.stop(t+.035);}catch{} }
    // Disconnect the entire old bus after its tiny fade; it can never be resumed.
    const old=this.duck;this.duck=null;if(old){const silent=this.ctx.createOscillator();silent.onended=()=>{old.disconnect();bus?.disconnect();};silent.start(t);silent.stop(t+.05);}
  }
  track(source,gain,filter,music,end){
    const entry={source,music};this.nodes.add(entry);
    source.onended=()=>{source.disconnect();gain.disconnect();filter?.disconnect();this.nodes.delete(entry);};
    source.stop(end);
  }
  voice(note,t,length,volume,type='sine',music=false,cutoff=0,detune=0){
    const c=this.ctx,dest=music?this.duck:this.fx;if(!c||!dest)return;
    const osc=c.createOscillator(),gain=c.createGain();osc.type=type;osc.frequency.value=hz(note);osc.detune.value=detune;
    const filter=cutoff?c.createBiquadFilter():null;
    if(filter){filter.type='lowpass';filter.frequency.setValueAtTime(cutoff,t);filter.frequency.exponentialRampToValueAtTime(Math.max(160,cutoff*.45),t+length);osc.connect(filter);filter.connect(gain);}else osc.connect(gain);
    gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(volume,t+.008);gain.gain.exponentialRampToValueAtTime(.0001,t+length);
    gain.connect(dest);osc.start(t);this.track(osc,gain,filter,music,t+length+.015);
  }
  percussion(t,length,volume,frequency,type='highpass'){
    const c=this.ctx,src=c.createBufferSource(),gain=c.createGain(),filter=c.createBiquadFilter();src.buffer=this.noise;
    filter.type=type;filter.frequency.value=frequency;filter.Q.value=.8;src.connect(filter);filter.connect(gain);gain.connect(this.music);
    gain.gain.setValueAtTime(volume,t);gain.gain.exponentialRampToValueAtTime(.0001,t+length);
    src.start(t);this.track(src,gain,filter,true,t+length+.01);
  }
  kick(t){
    const c=this.ctx,osc=c.createOscillator(),gain=c.createGain();osc.frequency.setValueAtTime(155,t);osc.frequency.exponentialRampToValueAtTime(47,t+.075);osc.frequency.exponentialRampToValueAtTime(40,t+.32);
    gain.gain.setValueAtTime(.65,t);gain.gain.exponentialRampToValueAtTime(.0001,t+.36);osc.connect(gain);gain.connect(this.music);osc.start(t);this.track(osc,gain,null,true,t+.38);
    this.duck.gain.setValueAtTime(.2,t);this.duck.gain.exponentialRampToValueAtTime(1,t+.26);
  }
  pump(){
    if(!this.playing||!this.musicEnabled||!this.music)return;
    const now=this.ctx.currentTime;if(this.next<now-.1)this.next=now+.025;
    while(this.next<now+.13){this.scheduleStep(this.step++,this.next);this.next+=60/BPM/4;}
  }
  scheduleStep(step,t){
    const s=step%16,bar=Math.floor(step/16)%16;
    const chords=[[45,48,52,55],[41,45,48,52],[48,52,55,59],[43,47,50,53]],chord=chords[Math.floor(bar/2)%4];
    const breakdown=bar===7||bar===15;
    if(s%4===0&&!(breakdown&&s>=12))this.kick(t);
    if(s===4||s===12){for(let i=0;i<3;i++)this.percussion(t+i*.012,.11,.09,1700,'bandpass');this.voice(50,t,.09,.035,'triangle',true);}
    if(s%2===0)this.percussion(t,s%4===2?.14:.035,s%4===2?.055:.032,7500);
    if(bar>=4&&s%2===1)this.percussion(t,.022,.012,9500);
    if([2,5,6,10,13,14].includes(s)&&!breakdown)this.voice(chord[0]-12+(s===14?12:0),t,.18,.23,'sawtooth',true,650);
    if([2,6,10,14].includes(s))chord.forEach((n,i)=>this.voice(n+12,t,.23,.055,'sawtooth',true,bar%4>=2?2700:1700,(i-1)*6));
    // A 16-bar arrangement adds a bright hook, fills and a short breakdown.
    if(bar>=4&&[0,3,6,8,11,14].includes(s)){
      const melody=[0,2,1,3,2,1],i=[0,3,6,8,11,14].indexOf(s),note=chord[melody[i]]+24;
      this.voice(note,t,.19,.045,'triangle',true,4200);this.voice(note,t+.24,.22,.018,'sine',true);
    }
    if(breakdown&&s>=12)this.percussion(t,.045,.025+(s-12)*.009,2300,'bandpass');
  }
  tone(notes=[440],duration=.09,type='sine'){
    if(!this.sfxEnabled||!this.ctx||this.ctx.state!=='running')return;
    notes.forEach((f,i)=>this.voice(69+12*Math.log2(f/440),this.ctx.currentTime+i*.055,duration,.065,type));
  }
  clear(lines,chain=0){
    if(!this.sfxEnabled||!this.ctx||this.ctx.state!=='running')return;
    const t=this.ctx.currentTime,quad=lines>=4,notes=quad?[69,72,76,81,84,88]:[69,72,76].slice(0,Math.min(3,lines+1));
    notes.forEach((n,i)=>{const pitch=n+Math.min(3,chain),at=t+i*(quad?.045:.038);this.voice(pitch,at,.28,.14,'sine');this.voice(pitch+12,at,.16,.035,'triangle');this.voice(pitch,at+.17,.32,.035);});
    if(quad){[45,57,64,69].forEach(n=>this.voice(n,t,.55,.065,'triangle'));[81,84,88].forEach(n=>this.voice(n,t+.28,.6,.045));}
  }
}
