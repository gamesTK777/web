import test from 'node:test';
import assert from 'node:assert/strict';
import {createAudioManager} from './audio.mjs';
import {TRACKS} from './music-score.mjs';

function harness(options={}){
  let creations=0,resumes=0,suspends=0,closes=0,nextTimer=1,startedNodes=0,stoppedNodes=0;
  const timers=new Map(),soundEvents=[],stopEvents=[];
  class Param{value=0;setValueAtTime(v){this.value=v;}linearRampToValueAtTime(v){this.value=v;}exponentialRampToValueAtTime(v){this.value=v;}setTargetAtTime(v){this.value=v;}}
  class Node{gain=new Param();frequency=new Param();Q=new Param();threshold=new Param();knee=new Param();ratio=new Param();attack=new Param();release=new Param();connect(){}disconnect(){}setPeriodicWave(){}start(when){startedNodes++;soundEvents.push({when,frequency:this.frequency.value});}stop(when){stoppedNodes++;stopEvents.push({when});}}
  class Context{
    state='suspended';currentTime=0;sampleRate=22050;destination=new Node();
    constructor(){creations++;if(options.constructError)throw Error('Unavailable');}
    createGain(){return new Node();}createDynamicsCompressor(){return new Node();}createOscillator(){return new Node();}createBufferSource(){return new Node();}createBiquadFilter(){return new Node();}
    createPeriodicWave(){return{};}createBuffer(ch,length){return{getChannelData:()=>new Float32Array(length)};}
    async resume(){resumes++;if(options.resumeError)throw Error('User gesture required');if(options.resumeGate)await options.resumeGate;this.state='running';}
    async suspend(){suspends++;this.state='suspended';}
    async close(){closes++;this.state='closed';}
  }
  const manager=createAudioManager({AudioContext:Context,setTimeout:(fn,ms)=>{const id=nextTimer++;timers.set(id,{fn,ms});return id;},clearTimeout:id=>timers.delete(id)});
  return{manager,timers,soundEvents,stopEvents,stats:()=>({creations,resumes,suspends,closes,startedNodes,stoppedNodes})};
}

test('loading, selecting a scene and using effects never create audio before explicit start',async()=>{
  const h=harness();h.manager.setScene('dungeon');for(const event of ['attack','swarm-start','swarm-clear'])h.manager.play(event);h.manager.setVolume(.6);h.manager.setMuted(false);
  assert.equal(await h.manager.resume(),false);assert.equal(h.stats().creations,0);assert.equal(h.timers.size,0);assert.equal(h.manager.getStatus().started,false);
});
test('explicit start creates one context and repeated start/resume does not duplicate scheduler',async()=>{
  const h=harness();assert.equal(await h.manager.start('town'),true);assert.equal(h.timers.size,1);assert.ok(h.stats().startedNodes>0);
  await Promise.all([h.manager.start('town'),h.manager.resume(),h.manager.start('town')]);
  assert.equal(h.stats().creations,1);assert.equal(h.timers.size,1);assert.equal(h.manager.getStatus().playing,true);h.manager.dispose();
});
test('concurrent initial start shares the resume operation',async()=>{
  let resolve;const gate=new Promise(r=>resolve=r),h=harness({resumeGate:gate});
  const a=h.manager.start('town'),b=h.manager.start('town');assert.equal(h.stats().resumes,1);assert.equal(h.timers.size,0);resolve();await Promise.all([a,b]);assert.equal(h.timers.size,1);h.manager.dispose();
});
test('mute stops voices and scheduling; unmute continues only an already started session',async()=>{
  const h=harness();await h.manager.start('dungeon');const voices=h.stats().startedNodes;
  h.manager.setMuted(true);assert.equal(h.manager.getStatus().playing,false);assert.equal(h.timers.size,0);assert.ok(h.stats().stoppedNodes>=voices);
  h.manager.play('attack');assert.equal(h.stats().startedNodes,voices);h.manager.setMuted(false);await Promise.resolve();assert.equal(h.timers.size,1);h.manager.dispose();
});
test('pause suspends audio and resume restarts exactly one scheduler',async()=>{
  const h=harness();await h.manager.start();h.manager.pause();assert.equal(h.timers.size,0);assert.equal(h.stats().suspends,1);assert.equal(h.manager.getStatus().playing,false);
  await h.manager.resume();assert.equal(h.timers.size,1);assert.equal(h.manager.getStatus().playing,true);h.manager.dispose();
});
test('a pause during a delayed initial resume cannot start background music',async()=>{
  let resolve;const h=harness({resumeGate:new Promise(r=>resolve=r)});const started=h.manager.start();h.manager.pause();resolve();assert.equal(await started,false);assert.equal(h.timers.size,0);h.manager.dispose();
});
test('scene changes replace pending music and keep a single scheduler',async()=>{
  const h=harness();await h.manager.start();const oldTimer=[...h.timers.values()][0];h.manager.setScene('dungeon');assert.equal(h.timers.size,1);
  // An already queued old callback is ignored after the scene changes.
  oldTimer.fn();assert.equal(h.timers.size,1);assert.equal(h.manager.getStatus().playing,true);h.manager.pause();assert.equal(h.timers.size,0);h.manager.dispose();
});
test('zero volume silences and stops work; volume is bounded',async()=>{
  const h=harness();await h.manager.start();h.manager.setVolume(0);assert.equal(h.timers.size,0);assert.equal(h.manager.getStatus().playing,false);
  h.manager.setVolume(9);assert.equal(h.manager.getStatus().volume,1);assert.equal(h.timers.size,1);h.manager.setVolume(NaN);assert.equal(h.manager.getStatus().volume,1);h.manager.dispose();
});
test('all effects can play safely and dispose prevents any future playback',async()=>{
  const h=harness();await h.manager.start();for(const e of ['move','attack','hurt','pickup','heal','level','stairs','swarm-start','swarm-clear','return','victory','defeat','sale','trade','build','equip','ui','error'])assert.doesNotThrow(()=>h.manager.play(e));
  h.manager.dispose();assert.equal(h.timers.size,0);assert.equal(h.stats().closes,1);assert.equal(await h.manager.start(),false);assert.equal(await h.manager.resume(),false);assert.equal(h.manager.getStatus().playing,false);
});
test('unavailable or blocked audio returns failure without affecting the caller',async()=>{
  for(const options of [{constructError:true},{resumeError:true}]){const h=harness(options);assert.equal(await h.manager.start(),false);assert.equal(h.timers.size,0);assert.doesNotThrow(()=>h.manager.play('attack'));h.manager.dispose();}
});
test('swarm warning and clear cues have distinct finite motifs without replacing the music scheduler',async()=>{
  const motifs=[];
  for(const event of ['swarm-start','swarm-clear']){
    const h=harness();await h.manager.start('dungeon');const from=h.soundEvents.length,timer=[...h.timers.keys()][0];
    h.manager.play(event);const motif=h.soundEvents.slice(from);assert.ok(motif.length>=5&&motif.length<=10);
    assert.ok(motif.every(note=>Number.isFinite(note.when)&&Number.isFinite(note.frequency)));
    assert.ok(Math.max(...motif.map(note=>note.when))<.6,'a brief cue must not schedule a second song');
    assert.deepEqual([...h.timers.keys()],[timer]);assert.equal(h.stats().creations,1);motifs.push(motif);h.manager.dispose();
  }
  assert.notDeepEqual(motifs[0],motifs[1]);
});
test('both swarm cues remain silent while muted, paused or at zero volume',async()=>{
  for(const silence of ['mute','pause','zero']){
    const h=harness();await h.manager.start('dungeon');
    if(silence==='mute')h.manager.setMuted(true);else if(silence==='pause')h.manager.pause();else h.manager.setVolume(0);
    const before=h.stats().startedNodes;h.manager.play('swarm-start');h.manager.play('swarm-clear');
    assert.equal(h.stats().startedNodes,before);assert.equal(h.timers.size,0);h.manager.dispose();
  }
});

test('all seven tracks report the selected place and replace one scheduler without creating another context',async()=>{
  const h=harness();await h.manager.start({mode:'town'});
  for(const track of Object.values(TRACKS)){
    const previous=[...h.timers.values()][0];h.manager.setScene(track.id);
    const status=h.manager.getStatus();assert.equal(status.trackId,track.id);assert.equal(status.trackTitle,track.title);assert.equal(status.trackArea,track.area);
    assert.equal(status.playing,true);assert.equal(h.timers.size,1);assert.equal(h.stats().creations,1);
    if(track.id!=='town'){const activeTimer=[...h.timers.keys()][0];previous.fn();assert.deepEqual([...h.timers.keys()],[activeTimer]);}
  }
  h.manager.dispose();assert.equal(h.timers.size,0);
});

test('moving within one depth band keeps its musical phrase, while live swarm and return change it immediately',async()=>{
  const h=harness();await h.manager.start({mode:'dungeon',floor:3});const timer=[...h.timers.keys()][0],notes=h.stats().startedNodes;
  h.manager.setScene({mode:'dungeon',floor:4,map:{swarm:{status:'dormant',enemyIds:['group']}},enemies:[{id:'group',hp:8}]});
  assert.deepEqual([...h.timers.keys()],[timer]);assert.equal(h.stats().startedNodes,notes);assert.equal(h.manager.getStatus().trackId,'dungeon-3-4');
  const encounter={mode:'dungeon',floor:4,map:{swarm:{status:'active',enemyIds:['group']}},enemies:[{id:'group',hp:8}]};
  h.manager.setScene(encounter);assert.equal(h.manager.getStatus().trackId,'swarm');assert.equal(h.timers.size,1);
  h.manager.setScene({...encounter,enemies:[]});assert.equal(h.manager.getStatus().trackId,'dungeon-3-4');
  h.manager.setScene({mode:'dungeon',floor:5});assert.equal(h.manager.getStatus().trackId,'dungeon-5-6');
  h.manager.pause();h.manager.setScene({mode:'town'});assert.equal(h.manager.getStatus().trackId,'town');assert.equal(h.timers.size,0);
  await h.manager.resume();assert.equal(h.manager.getStatus().trackId,'town');assert.equal(h.timers.size,1);h.manager.dispose();
});

test('switching location cancels old BGM voices while preserving an already playing damage effect',async()=>{
  const h=harness();await h.manager.start('town');const musicVoices=h.stats().startedNodes;
  h.manager.play('hurt');assert.ok(h.stats().startedNodes>musicVoices);
  h.manager.setScene('dungeon-5-6');assert.equal(h.stopEvents.filter(event=>event.when===undefined).length,musicVoices);
  h.manager.setMuted(true);assert.equal(h.timers.size,0);assert.equal(h.manager.getStatus().playing,false);h.manager.dispose();
});
