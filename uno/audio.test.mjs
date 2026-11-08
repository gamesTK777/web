import test from 'node:test';
import assert from 'node:assert/strict';
import {UnoAudio} from './audio.mjs';

class Param{
  constructor(value=0){this.value=value;this.events=[];}
  setValueAtTime(value,time){this.events.push(['set',value,time]);this.value=value;}
  exponentialRampToValueAtTime(value,time){this.events.push(['ramp',value,time]);this.value=value;}
  setTargetAtTime(value,time,constant){this.events.push(['target',value,time,constant]);this.value=value;}
  cancelScheduledValues(time){this.events.push(['cancel',time]);}
}
class Node{
  constructor(type){this.nodeType=type;this.connections=[];this.disconnected=false;this.stops=[];this.frequency=new Param();this.gain=new Param(1);this.Q=new Param();this.playbackRate=new Param(1);}
  connect(node){this.connections.push(node);return node;}
  disconnect(){this.disconnected=true;}
  start(at){this.startedAt=at;}
  stop(at){this.stops.push(at);}
}
class Context{
  static instances=[];
  constructor(){Context.instances.push(this);this.currentTime=10;this.sampleRate=8000;this.state='running';this.destination=new Node('destination');this.nodes=[];this.resumes=0;this.closes=0;}
  node(type){const node=new Node(type);this.nodes.push(node);return node;}
  createGain(){return this.node('gain');}
  createBiquadFilter(){return this.node('filter');}
  createOscillator(){return this.node('oscillator');}
  createBufferSource(){return this.node('buffer-source');}
  createDynamicsCompressor(){const node=this.node('limiter');for(const key of ['threshold','knee','ratio','attack','release'])node[key]=new Param();return node;}
  createBuffer(channels,length,rate){const data=new Float32Array(length);return{duration:length/rate,getChannelData:()=>data};}
  decodeAudioData(bytes,resolve){const decoded={duration:.64,data:bytes};resolve?.(decoded);return Promise.resolve(decoded);}
  resume(){this.resumes++;this.state='running';return Promise.resolve();}
  close(){this.closes++;this.state='closed';return Promise.resolve();}
}
const tick=()=>new Promise(setImmediate);
function harness({fetcher,ContextType=Context,enabled=true}={}){
  const timers=new Map(),requests=[],states=[];let timerId=0,resolveFetch;
  const pending=new Promise(resolve=>{resolveFetch=resolve;});
  const audio=new UnoAudio({Context:ContextType,enabled,onChange:state=>states.push(state),
    setTimer:function(fn,ms){assert.equal(this,undefined);const id=++timerId;timers.set(id,{fn,ms});return id;},
    clearTimer:function(id){assert.equal(this,undefined);timers.delete(id);},
    fetcher:fetcher||((...args)=>{requests.push(args);return pending;})});
  return {audio,timers,requests,states,finishVoice:()=>resolveFetch({ok:true,arrayBuffer:async()=>new ArrayBuffer(4)})};
}

test('page construction stays silent and allocates no audio resources until the gesture unlock',async()=>{
  Context.instances=[];const f=harness();
  assert.equal(Context.instances.length,0);assert.equal(f.requests.length,0);assert.equal(f.audio.play('deal'),false);
  assert.equal(f.audio.unlock(),true);assert.equal(Context.instances.length,1);assert.equal(f.requests.length,1);
  assert.equal(f.audio.sources.size,0);assert.equal(f.audio.state().loadingVoice,true);
  f.audio.unlock();assert.equal(f.requests.length,1,'One recording fetch is shared by every event');
  f.finishVoice();await tick();assert.equal(f.audio.state().voiceReady,true);assert.equal(f.audio.sources.size,0);
});

test('a suspended context resumes synchronously inside unlock while first deal sounds may be scheduled',async()=>{
  for(const state of ['suspended','interrupted']){
    class Suspended extends Context{constructor(){super();this.state=state;}}
    const f=harness({ContextType:Suspended});assert.equal(f.audio.unlock(),true);
    assert.equal(f.audio.ctx.resumes,1);assert.equal(f.audio.play('deal'),true);
    assert.equal(f.audio.sources.size,1);await tick();assert.equal(f.audio.state().blocked,false);
  }
});

test('card actions create short papery filtered noise envelopes, and played cards add a quiet contact sound',()=>{
  const f=harness();f.audio.unlock();
  for(const kind of ['deal','draw','play'])assert.equal(f.audio.play(kind,{delay:.2}),true);
  const c=f.audio.ctx,noise=c.nodes.filter(node=>node.nodeType==='buffer-source');
  assert.equal(noise.length,3);assert.ok(noise.every(node=>node.buffer===f.audio.noise&&Math.abs(node.startedAt-10.212)<1e-8));
  const filters=c.nodes.filter(node=>node.nodeType==='filter');assert.equal(filters.length,3);assert.ok(filters.every(node=>node.type==='bandpass'));
  assert.notEqual(filters[0].frequency.events[0][1],filters[2].frequency.events[0][1]);
  assert.equal(c.nodes.filter(node=>node.nodeType==='oscillator').length,1);
  for(const entry of f.audio.sources){assert.ok(entry.source.stops[0]>entry.source.startedAt);assert.ok(entry.source.stops[0]-entry.source.startedAt<.2);}
  const first=[...f.audio.sources][0];first.source.onended();assert.equal(f.audio.sources.has(first),false);assert.ok(first.nodes.every(node=>node.disconnected));
});

test('the single master gain controls all effects and zero volume immediately cancels scheduled sources',()=>{
  const f=harness();f.audio.unlock();f.audio.play('draw',{delay:3});f.audio.play('play');
  const sources=[...f.audio.sources];f.audio.setVolume(.2);
  assert.ok(Math.abs(f.audio.master.gain.events.at(-1)[1]-.144)<1e-10);
  f.audio.setVolume(0);assert.equal(f.audio.sources.size,0);assert.ok(sources.every(entry=>entry.source.stops.at(-1)===10&&entry.source.disconnected));
  assert.equal(f.audio.play('draw'),false);f.audio.setVolume(.8);assert.equal(f.audio.sources.size,0,'Raising volume does not replay old sounds');
  f.audio.play('deal');f.audio.setEnabled(false);assert.equal(f.audio.sources.size,0);assert.equal(f.audio.play('uno'),false);
});

test('a requested UNO waits for the cached recording, plays as one bright voice, and cleans up',async()=>{
  const f=harness();f.audio.unlock();f.audio.play('uno');assert.equal(f.timers.size,1);
  assert.equal([...f.audio.sources].some(entry=>entry.kind==='uno-voice'),false);
  f.finishVoice();await tick();assert.equal(f.timers.size,0);
  const voice=[...f.audio.sources].find(entry=>entry.kind==='uno-voice');assert.ok(voice);
  assert.equal(voice.source.playbackRate.value,1.12);assert.equal(voice.source.buffer,f.audio.voice);
  f.audio.play('uno');assert.equal([...f.audio.sources].filter(entry=>entry.kind==='uno-voice').length,1,'Two announcements cannot overlap their spoken clips');
  assert.equal(voice.source.disconnected,true);
});

test('stop, mute and disposal prevent a late voice download from reviving an old announcement',async()=>{
  for(const action of ['stop','mute','dispose']){
    const f=harness();f.audio.unlock();f.audio.play('uno');
    if(action==='mute')f.audio.setEnabled(false);else f.audio[action]();
    assert.equal(f.audio.sources.size,0);assert.equal(f.timers.size,0);
    f.finishVoice();await tick();assert.equal(f.audio.sources.size,0);
  }
});

test('a late UNO recording is discarded after its bounded request window',async()=>{
  const f=harness();f.audio.unlock();f.audio.play('uno',{delay:.1});
  const timeout=[...f.timers.values()][0];assert.equal(timeout.ms,1600);timeout.fn();
  f.finishVoice();await tick();assert.equal([...f.audio.sources].filter(entry=>entry.kind==='uno-voice').length,0);
});

test('unsupported audio and recording errors never throw or prevent gameplay effects',async()=>{
  const none=harness({ContextType:null});assert.equal(none.audio.state().supported,false);assert.equal(none.audio.unlock(),false);assert.equal(none.audio.play('play'),false);none.audio.dispose();
  let fetches=0;const f=harness({fetcher:async()=>{fetches++;return{ok:false};}});f.audio.unlock();await tick();
  assert.equal(f.audio.state().error,'voice-unavailable');assert.equal(f.audio.play('deal'),true);
  f.audio.unlock();f.audio.setEnabled(false);f.audio.setEnabled(true);f.audio.unlock();await tick();
  assert.equal(fetches,1,'Gestures and mute changes must not retry a failed recording fetch');
  assert.equal(f.audio.state().error,'voice-unavailable','Keep the reload guidance visible after later gestures');
  assert.equal(f.audio.state().voiceReady,false);assert.equal(f.audio.play('draw'),true);
  assert.equal(f.audio.play('unknown'),false);f.audio.stop();assert.equal(f.audio.sources.size,0);
});

test('resume failure and disposal cancel pending audio without starting it after a later callback',async()=>{
  class Rejected extends Context{constructor(){super();this.state='suspended';}resume(){return Promise.reject(Error('blocked'));}}
  const f=harness({ContextType:Rejected});f.audio.unlock();f.audio.play('deal',{delay:1});await tick();assert.equal(f.audio.sources.size,0);assert.equal(f.audio.state().blocked,true);
  const g=harness();g.audio.unlock();const c=g.audio.ctx;g.audio.play('win',{delay:1});g.audio.dispose();assert.equal(g.audio.sources.size,0);assert.equal(c.closes,1);assert.equal(g.audio.unlock(),false);assert.equal(g.audio.play('deal'),false);
});
