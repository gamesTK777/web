export const MUSIC_TRACKS=Object.freeze(Array.from({length:20},(_,i)=>
  new URL(`./music/${String(i+1).padStart(2,'0')}.mp3`,import.meta.url).href
));
const hz=midi=>440*2**((midi-69)/12);

export class GameAudio {
  constructor({
    contextFactory=()=>new (window.AudioContext||window.webkitAudioContext)(),
    mediaFactory=()=>new Audio(),
    tracks=MUSIC_TRACKS,
    random=Math.random,
  }={}) {
    this.contextFactory=contextFactory;
    this.mediaFactory=mediaFactory;
    this.tracks=tracks;
    this.random=random;
    this.ctx=null;
    this.media=null;
    this.musicGain=null;
    this.musicEnabled=true;
    this.sfxEnabled=true;
    this.playing=false;
    this.volume=.42;
    this.queue=[];
    this.currentTrack=null;
    this.lastPlayed=null;
    this.needsTrack=true;
    this.failureStreak=0;
    this.pendingPlay=null;
  }

  unlock(){
    try {
      if(!this.ctx){
        const c=this.ctx=this.contextFactory();
        this.master=c.createGain();
        this.master.gain.value=.72;
        const limiter=c.createDynamicsCompressor();
        limiter.threshold.value=-10;limiter.knee.value=12;limiter.ratio.value=6;
        limiter.attack.value=.003;limiter.release.value=.16;
        this.master.connect(limiter);limiter.connect(c.destination);
        this.fx=c.createGain();this.fx.gain.value=.65;this.fx.connect(this.master);
      }
      if(this.ctx.state==='suspended'||this.ctx.state==='interrupted')this.ctx.resume().catch(()=>{});
    } catch {this.ctx=null;}
    if(this.media)this.applyVolume(this.media);
    this.startMusic();
  }

  setPlaying(active,restart=false){
    this.playing=active;
    if(restart){
      this.stopMusic();
      this.needsTrack=true;
      this.failureStreak=0;
    }
    if(active)this.startMusic();else this.stopMusic();
  }

  setMusic(enabled){
    if(enabled&&!this.musicEnabled)this.failureStreak=0;
    this.musicEnabled=enabled;
    if(enabled)this.startMusic();else this.stopMusic();
  }

  setVolume(value){
    if(!Number.isFinite(value))return;
    this.volume=Math.max(0,Math.min(1,value));
    if(this.media)this.applyVolume(this.media);
  }

  applyVolume(media){
    if(!this.musicGain){
      try {media.volume=this.volume;} catch {}
      // Some mobile browsers keep the media volume at its device-controlled value.
      if(Math.abs(media.volume-this.volume)>.0001&&this.ctx?.createMediaElementSource){
        try {
          const gain=this.ctx.createGain();
          this.ctx.createMediaElementSource(media).connect(gain);
          gain.connect(this.master);
          this.musicGain=gain;
        } catch {}
      }
    }
    if(this.musicGain)this.musicGain.gain.value=this.volume;
    media.muted=this.volume===0;
  }

  nextTrack(){
    if(!this.queue.length){
      this.queue=[...this.tracks];
      for(let i=this.queue.length-1;i>0;i--){
        const j=Math.floor(this.random()*(i+1));
        [this.queue[i],this.queue[j]]=[this.queue[j],this.queue[i]];
      }
    }
    const last=this.queue.length-1;
    // If a track failed to load, avoid repeating the last audible song too.
    if(last>0&&(this.queue[last]===this.currentTrack||this.queue[last]===this.lastPlayed)){
      const next=this.queue.findIndex(track=>track!==this.currentTrack&&track!==this.lastPlayed);
      if(next>=0)[this.queue[last],this.queue[next]]=[this.queue[next],this.queue[last]];
    }
    return this.queue.pop();
  }

  createMedia(){
    const media=this.mediaFactory();
    media.preload='none';
    media.loop=false;
    this.applyVolume(media);
    media.addEventListener('playing',()=>{
      this.lastPlayed=this.currentTrack;
      this.failureStreak=0;
    });
    media.addEventListener('ended',()=>{
      if(!media.ended||this.needsTrack)return;
      this.needsTrack=true;
      this.stopMusic();
      this.startMusic();
    });
    media.addEventListener('error',()=>{if(media.error)this.skipFailedTrack();});
    return media;
  }

  startMusic(){
    if(!this.playing||!this.musicEnabled||this.failureStreak>=this.tracks.length)return;
    if(!this.media){
      try {this.media=this.createMedia();} catch {return;}
    }
    const media=this.media;
    if(this.needsTrack){
      this.currentTrack=this.nextTrack();
      this.needsTrack=false;
      media.src=this.currentTrack;
    }
    if(!media.paused||this.pendingPlay)return;
    const attempt={};
    this.pendingPlay=attempt;
    const release=()=>{
      if(this.pendingPlay!==attempt)return false;
      this.pendingPlay=null;
      return true;
    };
    const reject=error=>{
      if(release()&&error?.name==='NotSupportedError')this.skipFailedTrack();
    };
    try {
      const playback=media.play();
      if(playback?.then)playback.then(release,reject);
      else release();
    } catch(error){reject(error);}
  }

  skipFailedTrack(){
    if(this.needsTrack)return;
    this.needsTrack=true;
    this.failureStreak++;
    this.stopMusic();
    this.startMusic();
  }

  stopMusic(){
    const wasStarting=this.pendingPlay!==null;
    this.pendingPlay=null;
    if(this.media&&(wasStarting||!this.media.paused))this.media.pause();
  }

  voice(note,t,length,volume,type='sine'){
    const c=this.ctx,osc=c.createOscillator(),gain=c.createGain();
    osc.type=type;osc.frequency.value=hz(note);
    gain.gain.setValueAtTime(.0001,t);
    gain.gain.exponentialRampToValueAtTime(volume,t+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,t+length);
    osc.connect(gain);gain.connect(this.fx);
    osc.onended=()=>{osc.disconnect();gain.disconnect();};
    osc.start(t);osc.stop(t+length+.015);
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
