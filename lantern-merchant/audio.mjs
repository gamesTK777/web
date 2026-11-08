/* Original synthesized soundtrack for Pal Merchant Diary.
 * Seven location scores live in music-score.mjs; game state selects the score.
 * All melodies, harmonies and sounds are authored here; no recordings or samples.
 * AudioContext is deliberately created ONLY by start(), called from a user gesture.
 */
import {getTrack,scheduleMusicStep} from './music-score.mjs?v=20261108-music7';
import {resolveMusicTrack} from './music-scene.mjs?v=20261108-music7';
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const hz=midi=>440*2**((midi-69)/12);

export function createAudioManager(dependencies={}){
  const Context=dependencies.AudioContext??globalThis.AudioContext??globalThis.webkitAudioContext;
  const later=dependencies.setTimeout??((fn,ms)=>setTimeout(fn,ms));
  const cancel=dependencies.clearTimeout??(id=>clearTimeout(id));
  let context=null,master=null,musicBus=null,sfxBus=null,compressor=null,noise=null,waves=null;
  let scene='town',started=false,paused=true,muted=false,volume=.35,disposed=false;
  let timer=null,step=0,nextNote=0,resumeTask=null,generation=0;
  const voices=new Set(),lastEffect=new Map();
  const silent=()=>disposed||!context||!started||paused||muted||volume===0||context.state!=='running';

  function ensureContext(){
    if(context)return true;
    if(!Context||disposed)return false;
    try{
      context=new Context();master=context.createGain();musicBus=context.createGain();sfxBus=context.createGain();
      compressor=context.createDynamicsCompressor();
      compressor.threshold.value=-15;compressor.knee.value=12;compressor.ratio.value=5;
      compressor.attack.value=.004;compressor.release.value=.18;
      musicBus.gain.value=.68;sfxBus.gain.value=.9;master.gain.value=muted?0:volume;
      musicBus.connect(compressor);sfxBus.connect(compressor);compressor.connect(master);master.connect(context.destination);
      noise=context.createBuffer(1,Math.ceil(context.sampleRate*.8),context.sampleRate);
      const samples=noise.getChannelData(0);let seed=0x6d2b79f5;
      for(let i=0;i<samples.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;samples[i]=seed/2147483648-1;}
      const makeWave=(values)=>{const imag=new Float32Array(values.length+1);values.forEach((v,i)=>imag[i+1]=v);return context.createPeriodicWave(new Float32Array(imag.length),imag);};
      waves={harp:makeWave([1,.36,.18,.07,.045,.025]),flute:makeWave([1,.06,.18,.025,.045]),bell:makeWave([1,.14,.37,.04,.14,.02,.06]),reed:makeWave([1,.2,.14,.1,.04,.025])};
      return true;
    }catch{
      try{context?.close?.()?.catch?.(()=>{});}catch{}
      context=null;return false;
    }
  }
  function remember(source,nodes,bus){
    const voice={source,nodes,bus};voices.add(voice);
    source.onended=()=>{voices.delete(voice);for(const node of nodes)try{node.disconnect();}catch{}};
    return source;
  }
  function stopVoices(onlyMusic=false){
    for(const voice of [...voices]){if(onlyMusic&&voice.bus!==musicBus)continue;const {source,nodes}=voice;try{source.stop();}catch{}for(const node of nodes)try{node.disconnect();}catch{}voices.delete(voice);}
  }
  function tone(midi,when,duration,level=.08,instrument='harp',bus=musicBus,slide=0){
    if(!context||voices.size>120||!Number.isFinite(midi))return;
    const osc=context.createOscillator(),gain=context.createGain();
    if(waves[instrument])osc.setPeriodicWave(waves[instrument]);else osc.type=instrument;
    const freq=hz(midi);osc.frequency.setValueAtTime(freq,when);
    if(slide)osc.frequency.exponentialRampToValueAtTime(Math.max(20,hz(midi+slide)),when+duration);
    const attack=instrument==='flute'?.025:.006,release=instrument==='flute'?.11:.03;
    gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(level,when+attack);
    gain.gain.exponentialRampToValueAtTime(Math.max(.0001,level*.23),when+Math.max(attack+.005,duration*.65));
    gain.gain.linearRampToValueAtTime(0,when+duration+release);
    osc.connect(gain);gain.connect(bus);remember(osc,[osc,gain],bus);osc.start(when);osc.stop(when+duration+release+.01);
  }
  function percussion(when,kind,amount=1,bus=musicBus){
    if(kind==='kick'){
      const o=context.createOscillator(),g=context.createGain();o.type='sine';
      o.frequency.setValueAtTime(130,when);o.frequency.exponentialRampToValueAtTime(43,when+.16);
      g.gain.setValueAtTime(.18*amount,when);g.gain.exponentialRampToValueAtTime(.0001,when+.22);
      o.connect(g);g.connect(bus);remember(o,[o,g],bus);o.start(when);o.stop(when+.24);return;
    }
    const s=context.createBufferSource(),f=context.createBiquadFilter(),g=context.createGain();
    const hat=kind==='hat',duration=hat?.045:.13;s.buffer=noise;f.type=hat?'highpass':'bandpass';f.frequency.value=hat?6500:1800;f.Q.value=.65;
    g.gain.setValueAtTime((hat?.025:.065)*amount,when);g.gain.exponentialRampToValueAtTime(.0001,when+duration);
    s.connect(f);f.connect(g);g.connect(bus);remember(s,[s,f,g],bus);s.start(when);s.stop(when+duration+.01);
    if(!hat)tone(50,when,.055,.028*amount,'triangle',bus,-3);
  }
  function scoreStep(n,time){
    scheduleMusicStep(scene,n,time,{tone,percussion});
  }
  function stopScheduler(){if(timer!==null){cancel(timer);timer=null;}generation++;}
  function pump(token){
    if(token!==generation)return;
    timer=null;if(silent())return;
    try{
      // Never catch up an old score after a background tab or interrupted context.
      if(nextNote<context.currentTime-.1)nextNote=context.currentTime+.025;
      const unit=60/getTrack(scene).bpm/4;
      let scheduled=0;while(nextNote<context.currentTime+.16&&scheduled++<4){scoreStep(step++,nextNote);nextNote+=unit;}
      timer=later(()=>pump(token),30);
    }catch{stopScheduler();stopVoices();}
  }
  function beginScheduler(){if(silent()||timer!==null)return;nextNote=Math.max(nextNote,context.currentTime+.025);pump(generation);}
  function setScene(value){
    const next=resolveMusicTrack(value);if(scene===next)return;
    scene=next;step=0;stopScheduler();stopVoices(true);nextNote=context?context.currentTime+.035:0;beginScheduler();
  }
  async function wake(){
    if(disposed||!started||paused||!context)return false;
    try{
      if(context.state!=='running'){
        if(!resumeTask)resumeTask=Promise.resolve(context.resume()).finally(()=>{resumeTask=null;});
        await resumeTask;
      }
      if(disposed||paused)return false;
      beginScheduler();return context.state==='running';
    }catch{return false;}
  }
  async function start(value='town'){
    if(disposed)return false;
    if(!ensureContext())return false;
    started=true;paused=false;setScene(value);return wake();
  }
  function pause(){
    if(disposed)return;paused=true;stopScheduler();stopVoices();
    try{if(context?.state==='running')context.suspend()?.catch?.(()=>{});}catch{}
  }
  async function resume(){if(disposed||!started)return false;paused=false;return wake();}
  function setMuted(value){
    muted=!!value;if(!context)return;
    master.gain.setTargetAtTime(muted?0:volume,context.currentTime,.025);
    if(muted){stopScheduler();stopVoices();}else if(started&&!paused)void wake();
  }
  function setVolume(value){
    if(!Number.isFinite(value))return;volume=clamp(value,0,1);
    if(context)master.gain.setTargetAtTime(muted?0:volume,context.currentTime,.025);
    if(volume===0){stopScheduler();stopVoices();}else beginScheduler();
  }
  function play(event){
    if(silent())return;
    try{
      const now=context.currentTime,previous=lastEffect.get(event)??-100;
      if(now-previous<(event==='move'?.07:.04))return;lastEffect.set(event,now);
      const t=now+.005,notes=(seq,length=.1,level=.09,instrument='bell',gap=.065)=>seq.forEach((n,i)=>tone(n,t+i*gap,length,level,instrument,sfxBus));
      switch(event){
        case 'move':tone(43,t,.035,.043,'triangle',sfxBus,-4);break;
        case 'attack':percussion(t,'snare',.8,sfxBus);tone(78,t,.09,.1,'reed',sfxBus,-24);break;
        case 'hurt':tone(43,t,.15,.15,'triangle',sfxBus,-9);tone(48,t+.025,.12,.075,'reed',sfxBus,-11);break;
        case 'pickup':notes([83,90],.13,.083);break;
        case 'heal':notes([72,76,79,84],.24,.065,'flute',.07);break;
        case 'level':notes([74,78,81,86,90],.28,.085,'bell',.09);break;
        case 'stairs':notes([76,71,67,64],.16,.07,'harp',.07);break;
        case 'swarm-start':
          // A short rising minor warning leaves the next decision to the player.
          percussion(t,'kick',.4,sfxBus);notes([52,55,58],.16,.075,'reed',.075);
          tone(64,t+.27,.25,.06,'bell',sfxBus);tone(70,t+.27,.25,.045,'bell',sfxBus);break;
        case 'swarm-clear':
          notes([64,67,71,76,79,83,88],.24,.065,'bell',.075);
          for(const note of [64,67,71])tone(note,t+.48,.32,.035,'flute',sfxBus);break;
        case 'return':notes([74,78,81,86],.3,.075,'harp',.1);break;
        case 'victory':notes([74,78,81,86,81,86,90],.34,.095,'bell',.12);break;
        case 'defeat':notes([64,62,59,55],.45,.073,'flute',.2);break;
        case 'sale':case 'trade':notes([86,90,93],.11,.07,'bell',.045);break;
        case 'build':percussion(t,'kick',.7,sfxBus);notes([62,69,74,78,81],.21,.08,'harp',.08);break;
        case 'equip':notes([69,74,81,86],.18,.08,'reed',.06);break;
        case 'error':notes([55,52],.08,.055,'triangle',.085);break;
        case 'ui':tone(78,t,.045,.045,'harp',sfxBus);break;
        default:break;
      }
    }catch{ /* Sound must never block a game action. */ }
  }
  function getStatus(){const track=getTrack(scene);return{started,muted,volume,available:!!Context&&!disposed,playing:!silent()&&timer!==null,trackId:track.id,trackTitle:track.title,trackArea:track.area};}
  function dispose(){disposed=true;started=false;paused=true;stopScheduler();stopVoices();lastEffect.clear();try{context?.close()?.catch?.(()=>{});}catch{}context=null;}
  return{start,setScene,play,setMuted,setVolume,pause,resume,dispose,getStatus};
}
