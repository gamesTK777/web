// Original score for two scenes. Each row is a bar, one index per eighth note.
// The maps use a hollow bell motif; combat answers it with a shorter pulse lead.
const MAP_LEAD = [
  [null,69,null,72,76,null,71,null],[67,null,null,71,null,74,72,null],
  [null,65,69,null,72,null,76,null],[71,null,68,null,null,64,null,null],
  [69,null,72,null,79,null,76,72],[null,74,71,null,67,null,71,null],
  [65,null,69,72,null,77,null,74],[null,71,68,null,64,null,null,null]
];
const FIGHT_LEAD = [
  [76,72,null,76,79,76,72,71],[74,null,71,74,77,null,74,71],
  [72,69,72,null,77,76,72,69],[71,68,null,71,76,74,71,null],
  [76,null,79,81,79,76,72,null],[74,71,74,null,77,74,71,67],
  [72,null,77,76,72,69,65,69],[71,68,71,74,76,null,68,null]
];
const ROOTS=[45,43,41,40,45,43,41,40];
const clamp=x=>Math.max(0,Math.min(1,x));
const frequency=m=>440*2**((m-69)/12);
export function createSound(){
  let ctx, musicGain, fxGain, noiseBuffer;
  let scene='silent',paused=false,timer=null,step=0,next=0,music=.36,effects=.65;
  const musicVoices=new Set(), effectVoices=new Set();
  function connectVoice(source,destination,t,duration,volume,attack=.006){
    const env=ctx.createGain(); const pool=destination===musicGain?musicVoices:effectVoices;
    env.gain.setValueAtTime(.0001,t);
    env.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),t+attack);
    env.gain.exponentialRampToValueAtTime(.0001,t+duration);
    source.connect(env);env.connect(destination);
    pool.add(source);
    source.onended=()=>{pool.delete(source);source.disconnect();env.disconnect();};
    source.start(t);source.stop(t+duration+.018);
  }
  function tone(t,freq,duration,volume,type='triangle',end=freq,track=musicGain){
    const o=ctx.createOscillator();o.type=type;
    o.frequency.setValueAtTime(Math.max(20,freq),t);
    if(end!==freq) o.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration*.88);
    connectVoice(o,track,t,duration,volume);
  }
  function hiss(t,duration,volume,cutoff,track=musicGain){
    const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter();source.buffer=noiseBuffer;source.loop=true;
    filter.type='highpass';filter.frequency.value=cutoff;
    const env=ctx.createGain();
    env.gain.setValueAtTime(.0001,t);env.gain.linearRampToValueAtTime(volume,t+.003);env.gain.exponentialRampToValueAtTime(.0001,t+duration);
    const pool=track===musicGain?musicVoices:effectVoices;pool.add(source);
    source.connect(filter);filter.connect(env);env.connect(track);
    source.onended=()=>{pool.delete(source);source.disconnect();filter.disconnect();env.disconnect();};
    source.start(t);source.stop(t+duration+.01);
  }
  function musicBeat(t,n){
    const battle=scene==='battle',bar=Math.floor(n/8)%8,part=n%8;
    const lead=(battle?FIGHT_LEAD:MAP_LEAD)[bar][part],root=ROOTS[bar];
    if(lead!==null){
      tone(t,frequency(lead),battle?.18:.46,battle?.086:.17,battle?'square':'sine');
      if(!battle){tone(t+.004,frequency(lead+12),.24,.045,'triangle');tone(t+.19,frequency(lead),.23,.035,'sine');}
    }
    if(part===0||part===4||battle&&part===6){
      tone(t,frequency(root+(part===4?7:0)),battle?.18:.46,battle?.27:.24,'triangle');
      tone(t,95,battle?.12:.14,battle?.34:.21,'sine',37);
    }
    if(battle&&part%2===1)hiss(t,.045,.065,4200);
    if(part===2||part===6){hiss(t,battle?.12:.07,battle?.125:.035,battle?970:3600);}
    if(!battle&&part===0){
      const third=bar===3||bar===7?4:3;
      for(const interval of [7,12,12+third])tone(t,frequency(root+interval),1.05,.055,'sine');
    }
  }
  function tick(){
    if(!ctx || paused || scene==='silent' || document.hidden || ctx.state!=='running')return;
    const now=ctx.currentTime;
    if(next<now-.1) next=now+.02;
    const interval=30/(scene==='battle'?144:98);
    while(next<now+.11){if(music>0)musicBeat(next,step);step=(step+1)%64;next+=interval;}
  }
  function stopPool(pool){for(const src of pool)try{src.stop();}catch{/* Already ended. */}pool.clear();}
  function schedule(){
    if(timer!==null)clearInterval(timer);timer=null;
    if(!ctx||scene==='silent'||paused||document.hidden)return;
    step=0;next=ctx.currentTime+.036;tick();timer=setInterval(tick,55);
  }
  function setLevels(){
    if(!ctx)return;
    musicGain.gain.setTargetAtTime(music,ctx.currentTime,.018);
    fxGain.gain.setTargetAtTime(effects,ctx.currentTime,.018);
  }
  function unlock(){
    if(!ctx){
      const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;
      if(!Audio)return;
      try{ctx=new Audio();}catch{return;}
      const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=15;limiter.ratio.value=5;
      musicGain=ctx.createGain();fxGain=ctx.createGain();musicGain.connect(limiter);fxGain.connect(limiter);limiter.connect(ctx.destination);
      noiseBuffer=ctx.createBuffer(1,ctx.sampleRate/2,ctx.sampleRate);
      const data=noiseBuffer.getChannelData(0);let bits=777;
      for(let i=0;i<data.length;i++){bits=Math.imul(1664525,bits)+1013904223|0;data[i]=(bits>>>0)/2147483648-1;}
      setLevels();
    }
    if(!document.hidden && !paused && ctx.state!=='running')ctx.resume().then(schedule).catch(()=>{});
    else if(timer===null)schedule();
  }
  function play(id){
    if(!ctx || effects<=0 || paused || document.hidden || ctx.state!=='running' || effectVoices.size>28)return;
    const t=ctx.currentTime+.006;
    const f=(offset,hz,time,loud,type='triangle',end=hz)=>tone(t+offset,hz,time,loud,type,end,fxGain);
    const n=(offset,time,loud,hz)=>hiss(t+offset,time,loud,hz,fxGain);
    switch(id){
      case 'shot': f(0,620,.095,.24,'square',130);break;
      case 'heavy': f(0,145,.29,.48,'sawtooth',32);n(0,.18,.38,500);break;
      case 'slash': n(0,.12,.32,1700);f(.018,470,.11,.16,'triangle',95);break;
      case 'boost': n(0,.2,.26,1150);f(0,105,.18,.17,'sawtooth',48);break;
      case 'hit': n(0,.077,.25,650);f(0,180,.085,.18,'square',64);break;
      case 'down': n(0,.33,.38,260);f(0,130,.39,.45,'triangle',30);break;
      case 'handover': f(0,310,.1,.25);f(.12,620,.16,.22);break;
      case 'target':case 'select': f(0,560,.068,.17,'sine',720);break;
      case 'move': f(0,270,.11,.23);f(.07,405,.10,.18);break;
      case 'repair':case 'deploy':case 'capture':case 'production':
        [0,4,7].forEach((a,i)=>f(i*.085,frequency(65+a),.22,.18));break;
      case 'defeat': [64,60,57].forEach((a,i)=>f(i*.18,frequency(a),.4,.19));break;
      case 'victory': [64,67,71,76].forEach((a,i)=>f(i*.14,frequency(a),.39,.21));break;
      case 'sortie':case 'battle': f(0,180,.22,.24,'sawtooth',420);f(.24,550,.18,.2);break;
      default: f(0,410,.07,.12);
    }
  }
  function suspend(){
    paused=true;
    if(ctx){stopPool(musicVoices);stopPool(effectVoices);ctx.suspend().catch(()=>{});}
    schedule();
  }
  function resume(){paused=false;if(ctx)unlock();}
  function visibility(){
    if(!ctx)return;
    if(document.hidden){
      stopPool(musicVoices);stopPool(effectVoices);ctx.suspend().catch(()=>{});schedule();
    }else if(!paused)unlock();
  }
  document.addEventListener('visibilitychange',visibility);
  return {
    unlock,play,suspend,resume,
    scene(name){
      const newScene=name==='battle'||name==='strategy'?name:'silent';
      if(scene===newScene)return;
      scene=newScene;stopPool(musicVoices);schedule();
    },
    volume(bgm,sfx){
      if(Number.isFinite(bgm))music=clamp(bgm);
      if(Number.isFinite(sfx))effects=clamp(sfx);
      setLevels();
    },
    destroy(){
      document.removeEventListener('visibilitychange',visibility);
      suspend();ctx?.close().catch(()=>{});
    }
  };
}
