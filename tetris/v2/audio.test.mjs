import test from 'node:test';
import assert from 'node:assert/strict';
import {GameAudio} from './audio.mjs';
function fixture(state='running'){
  const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},cancelScheduledValues(){},setTargetAtTime(){}});
  const nodes=[];const node=()=>{const n={gain:param(),frequency:param(),detune:param(),Q:param(),threshold:param(),knee:param(),ratio:param(),attack:param(),release:param(),connect(){},disconnect(){},start(t){this.started=t;},stop(t){this.stopped=t;}};nodes.push(n);return n;};
  let resolve;const c={state,currentTime:0,sampleRate:100,createGain:node,createOscillator:node,createBiquadFilter:node,createBufferSource:node,createDynamicsCompressor:node,createBuffer:()=>({getChannelData:()=>new Float32Array(100)}),resume:()=>new Promise(r=>resolve=()=>{c.state='running';r();})};
  const timers=new Set();let created=0;const a=new GameAudio({contextFactory:()=>{created++;return c;},setTimer:fn=>{timers.add(fn);return fn;},clearTimer:fn=>timers.delete(fn)});
  return {a,c,nodes,timers,get created(){return created;},resume:()=>resolve()};
}
test('intro stays silent, including toggling music before starting',()=>{
  const f=fixture();assert.equal(f.created,0);f.a.setMusic(false);f.a.setMusic(true);f.a.unlock();assert.equal(f.timers.size,0);assert.equal(f.a.nodes.size,0);
});
test('playing schedules one loop; pause cancels it and scheduled music sources',()=>{
  const f=fixture();f.a.unlock();f.a.setPlaying(true);f.a.setPlaying(true);assert.equal(f.timers.size,1);assert.ok(f.a.nodes.size>0);
  f.c.currentTime=.1;f.a.setPlaying(false);assert.equal(f.timers.size,0);assert.equal(f.a.music,null);for(const n of f.a.nodes)assert.equal(n.source.stopped,.135);
  f.a.setPlaying(true);assert.equal(f.timers.size,1);f.a.setPlaying(false);assert.equal(f.timers.size,0);
});
test('a late browser audio resume cannot restart BGM after game ended',async()=>{
  const f=fixture('suspended');f.a.unlock();f.a.setPlaying(true);f.a.setPlaying(false);f.resume();await Promise.resolve();assert.equal(f.timers.size,0);assert.equal(f.a.music,undefined);
});
test('BGM and effects can be muted independently and restarting resets arrangement',()=>{
  const f=fixture();f.a.unlock();f.a.setPlaying(true);f.a.setMusic(false);assert.equal(f.timers.size,0);const prior=f.a.nodes.size;f.a.clear(4);assert.ok(f.a.nodes.size>prior);
  f.a.sfxEnabled=false;const count=f.a.nodes.size;f.a.clear(4);assert.equal(f.a.nodes.size,count);f.a.setMusic(true);assert.equal(f.timers.size,1);
  f.a.step=90;f.a.setPlaying(true,true);assert.equal(f.a.step,1);assert.equal(f.timers.size,1);
});
test('scheduler recovers from long stalls without playing a backlog',()=>{
  const f=fixture();f.a.unlock();f.a.setPlaying(true);const step=f.a.step;f.c.currentTime=30;f.a.pump();assert.ok(f.a.step-step<=2);
});
