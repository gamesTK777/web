import test from 'node:test';
import assert from 'node:assert/strict';
import {RecordedCharacterVoice,findRecordedVoice} from './recorded-voice.mjs';
import {CharacterVoice} from './voice.mjs';
import {CAST,encounterLines} from './cast.mjs';
import {chooseVoiceLine,getVoiceProfile} from './voice-lines.mjs';
import {VOICE_ASSETS} from './assets/voices/manifest.mjs';

const lineA=chooseVoiceLine(1,'roundStart'),lineB=chooseVoiceLine(2,'roundStart'),lineC=chooseVoiceLine(3,'roundStart');
const settle=async()=>{for(let n=0;n<16;n++)await Promise.resolve();};
function deferred(){let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return{promise,resolve,reject};}
function fixture(options={}){
  let time=0,id=0,created=0,resumes=0,closed=0,decodes=0;
  const timers=new Map(),requests=[],sources=[],synthCalls=[];
  class Gain{value=0;setTargetAtTime(value){this.value=value;}}
  class Node{gain=new Gain();playbackRate={value:1};connect(){}disconnect(){this.disconnected=true;}start(at){this.at=at;this.started=true;}stop(){this.stopped=true;this.onended?.();}}
  class Context{
    state='suspended';currentTime=0;destination=new Node();
    constructor(){created++;}
    createGain(){return new Node();}
    createBufferSource(){const source=new Node();sources.push(source);return source;}
    resume(){resumes++;if(options.resumeError)return Promise.reject(Error('blocked'));if(options.resumeGate)return options.resumeGate.then(()=>{this.state='running';});this.state='running';return Promise.resolve();}
    close(){closed++;this.state='closed';return Promise.resolve();}
    decodeAudioData(bytes,ok,bad){decodes++;const result=options.decodeError?Promise.reject(Error('decode')):options.decodeGate||Promise.resolve({duration:1.5});result.then(ok,bad);return result;}
  }
  class Utterance{constructor(text){this.text=text;}}
  const synth={getVoices:()=>options.voices??[],speak:utterance=>synthCalls.push(utterance),cancel(){this.speaking=false;this.pending=false;},addEventListener(){},removeEventListener(){}};
  const configuration={Context,assets:VOICE_ASSETS,synth,Utterance,now:()=>time,
    fetcher:(url,request)=>{const item={url,request};requests.push(item);return options.fetcher?options.fetcher(item):Promise.resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(16)});},
    setTimer:(fn,ms)=>{timers.set(++id,{fn,at:time+ms});return id;},clearTimer:key=>timers.delete(key),...options.configuration};
  const voice=options.wrapper?new CharacterVoice(configuration):new RecordedCharacterVoice(configuration);
  return{voice,timers,requests,sources,synth,synthCalls,stats:()=>({created,resumes,closed,decodes}),advance(ms){const until=time+ms;let entry;while((entry=[...timers].filter(([,item])=>item.at<=until).sort((a,b)=>a[1].at-b[1].at)[0])){const[key,item]=entry;time=item.at;timers.delete(key);item.fn();}time=until;}};
}

test('every original encounter, event variation and reward has one safe natural recording, without prototype lookups',()=>{
  const events=['roundStart','playerRiichi','cpuRiichi','cpuWin','draw','playerTurn','playerGoodHand'];
  const keys=new Set();
  for(const character of CAST){
    const lines=[...encounterLines(character.id,1),...encounterLines(character.id,2),...encounterLines(character.id,3),...encounterLines(character.id,1,{retry:true}),...character.rewards];
    for(const event of events)for(let variant=0;variant<3;variant++)lines.push(chooseVoiceLine(character.id,event,{variant}));
    for(const text of lines){const path=findRecordedVoice(VOICE_ASSETS,character.id,text);assert.match(path,new RegExp('^\\./assets/voices/'+character.slug+'/[a-f0-9]{16}\\.mp3$'));keys.add(character.id+'\n'+text);}
  }
  assert.equal(keys.size,231);assert.equal(Object.keys(VOICE_ASSETS).length,231);
  assert.equal(findRecordedVoice(Object.create({'1\nhello':'./assets/voices/hinata/0000000000000000.mp3'}),1,'hello'),null);
  assert.equal(findRecordedVoice({'1\nhello':'https://invalid.example/recording.mp3'},1,'hello'),null);
});

test('constructing and selecting a known line stays silent until an explicit gesture, then resumes synchronously',async()=>{
  const f=fixture();assert.equal(f.voice.state().availability,'ready');assert.equal(f.stats().created,0);assert.equal(f.requests.length,0);
  assert.equal(f.voice.speak(1,lineA),false);assert.equal(f.stats().created,0);assert.equal(f.requests.length,0);
  assert.equal(f.voice.unlock(),true);assert.equal(f.stats().resumes,1);assert.equal(f.requests.length,0);
  assert.equal(f.voice.speak(1,lineA),true);await settle();assert.equal(f.voice.state().speaking,true);assert.equal(f.sources.length,1);assert.equal(f.sources[0].playbackRate.value,1);
  assert.equal(f.voice.master.gain.value,.8*getVoiceProfile(1).volume);f.voice.dispose();
});

test('original lines use recordings even when Japanese device voices are absent, and never warm up system speech',async()=>{
  const f=fixture({wrapper:true});assert.equal(f.voice.state().supported,true);assert.equal(f.voice.state().availability,'ready');
  f.voice.unlock();f.voice.speak(1,lineA);await settle();assert.equal(f.synthCalls.length,0);assert.equal(f.sources.length,1);assert.equal(f.voice.state().engine,'recorded');assert.match(f.voice.state().voiceName,/自然な日本語/);f.voice.dispose();
});

test('duplicate requests stay silent while forced replay uses the decoded cache and old end callbacks cannot alter a new line',async()=>{
  const f=fixture();f.voice.unlock();assert.equal(f.voice.speak(1,lineA,{key:'first'}),true);await settle();const old=f.sources[0],ended=old.onended;
  assert.equal(f.voice.speak(1,lineA,{key:'first'}),false);assert.equal(f.requests.length,1);
  assert.equal(f.voice.speak(1,lineA,{key:'first',force:true}),true);await settle();assert.equal(f.requests.length,1);assert.equal(f.stats().decodes,1);assert.equal(old.stopped,true);
  ended();assert.equal(f.voice.state().speaking,true);assert.equal(f.sources.length,2);f.sources[1].onended();assert.equal(f.voice.state().speaking,false);assert.equal(f.timers.size,0);f.voice.dispose();
});

test('late downloads never speak over replacement dialogue and rapid skips keep at most two loads',async()=>{
  const responses=[];const f=fixture({fetcher:item=>{const wait=deferred();responses.push({item,...wait});return wait.promise;}});f.voice.unlock();
  f.voice.speak(1,lineA);f.voice.speak(2,lineB);f.voice.speak(3,lineC);assert.equal(f.voice.loads.size,2);assert.equal(responses[0].item.request.signal.aborted,true);
  for(const response of responses)response.resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(16)});
  await settle();assert.equal(f.sources.length,1);assert.equal(f.voice.state().text,lineC);assert.equal(f.voice.state().speaking,true);assert.equal(f.voice.loads.size,0);f.voice.dispose();
});

test('replaying a still-loading clip reuses its request and only the latest token starts',async()=>{
  const wait=deferred(),f=fixture({fetcher:()=>wait.promise});f.voice.unlock();f.voice.speak(1,lineA);f.voice.speak(1,lineA,{force:true});assert.equal(f.requests.length,1);
  wait.resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(16)});await settle();assert.equal(f.sources.length,1);assert.equal(f.voice.state().speaking,true);f.voice.dispose();
});

test('stop, mute, zero volume and disposal abort a pending download and cannot revive speech when it completes',async()=>{
  for(const cancel of [v=>v.stop(),v=>v.setEnabled(false),v=>v.setVolume(0),v=>v.dispose()]){
    const wait=deferred(),f=fixture({fetcher:()=>wait.promise});f.voice.unlock();f.voice.speak(1,lineA);const request=f.requests[0];cancel(f.voice);
    assert.equal(request.request.signal.aborted,true);wait.resolve({ok:true,arrayBuffer:async()=>new ArrayBuffer(16)});await settle();assert.equal(f.sources.length,0);assert.equal(f.voice.state().speaking,false);assert.equal(f.timers.size,0);f.voice.dispose();
  }
});

test('ambient comments wait twelve seconds while important dialogue replaces the current source and volume updates live',async()=>{
  const f=fixture();f.voice.unlock();f.voice.speak(1,lineA);await settle();const first=f.sources[0];f.voice.setVolume(.3);assert.equal(f.voice.master.gain.value,.3*getVoiceProfile(1).volume);
  assert.equal(f.voice.speak(2,lineB,{priority:'ambient'}),false);first.onended();f.advance(11999);assert.equal(f.voice.speak(2,lineB,{priority:'ambient'}),false);
  f.advance(1);assert.equal(f.voice.speak(2,lineB,{priority:'ambient'}),true);await settle();assert.equal(f.voice.speak(3,lineC,{priority:'important'}),true);await settle();assert.equal(f.sources[1].stopped,true);assert.equal(f.voice.state().text,lineC);f.voice.dispose();
});

test('download and decode errors preserve the caption and never fall back to old device speech for a bundled line',async()=>{
  for(const options of [{fetcher:async()=>({ok:false})},{decodeError:true}]){
    const f=fixture({...options,wrapper:true});f.voice.unlock();assert.equal(f.voice.speak(1,lineA),true);await settle();
    assert.equal(f.voice.state().error,'recording-unavailable');assert.equal(f.voice.state().text,lineA);assert.equal(f.voice.state().speaking,false);assert.equal(f.synthCalls.length,0);assert.equal(f.timers.size,0);
    assert.equal(f.voice.speak(1,lineA,{force:true}),true);await settle();assert.equal(f.requests.length,2);assert.equal(f.synthCalls.length,0);f.voice.dispose();
  }
});

test('a rejected or delayed context resume cannot start stale speech after cancellation',async()=>{
  const rejected=fixture({resumeError:true});rejected.voice.unlock();rejected.voice.speak(1,lineA);await settle();assert.equal(rejected.voice.state().blocked,true);assert.equal(rejected.voice.state().error,'not-allowed');assert.equal(rejected.sources.length,0);rejected.voice.dispose();
  const gate=deferred(),f=fixture({resumeGate:gate.promise});f.voice.unlock();f.voice.speak(1,lineA);await settle();assert.equal(f.sources.length,0);f.voice.stop();gate.resolve();await settle();assert.equal(f.sources.length,0);assert.equal(f.timers.size,0);f.voice.dispose();
});

test('decoded audio uses a bounded least-recently-used cache and incomplete playback has a bounded cleanup timer',async()=>{
  const f=fixture({configuration:{cacheLimit:2}});f.voice.unlock();
  for(const [id,text] of [[1,lineA],[2,lineB],[3,lineC]]){f.voice.speak(id,text);await settle();f.sources.at(-1).onended();}
  assert.equal(f.voice.cache.size,2);assert.equal(f.voice.cache.has(VOICE_ASSETS['1\n'+lineA]),false);
  f.voice.speak(1,lineA,{force:true});await settle();assert.equal(f.requests.length,4);assert.equal(f.voice.cache.size,2);
  f.advance(2250);assert.equal(f.voice.state().speaking,false);assert.equal(f.timers.size,0);f.voice.dispose();
});

test('custom administrator text may use device speech without overlapping a natural recording',async()=>{
  const f=fixture({wrapper:true,voices:[{name:'Japanese test',lang:'ja-JP'}]});f.voice.unlock();f.voice.speak(1,lineA);await settle();
  assert.equal(f.voice.speak(1,'管理者が追加した特別な挨拶です。',{key:'custom'}),true);assert.equal(f.sources[0].stopped,true);assert.equal(f.synthCalls.length,1);assert.equal(f.voice.state().engine,'device');
  f.voice.speak(2,lineB);await settle();assert.equal(f.voice.state().engine,'recorded');assert.equal(f.synthCalls.length,1);assert.equal(f.sources.length,2);f.voice.dispose();
});
