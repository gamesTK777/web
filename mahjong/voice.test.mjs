import test from 'node:test';
import assert from 'node:assert/strict';
import {CharacterVoice} from './voice.mjs';
import {getVoiceProfile} from './voice-lines.mjs';

class Utterance{constructor(text){this.text=text;}}
const female={name:'Kyoko',lang:'ja-JP',localService:true,default:true};
class Synth {
  constructor(voices=[female]){this.voices=voices;this.calls=[];this.queue=[];this.listeners=new Map();this.cancels=0;this.speaking=false;this.pending=false;}
  getVoices(){return this.voices;}
  addEventListener(name,fn){this.listeners.set(name,fn);}
  removeEventListener(name,fn){if(this.listeners.get(name)===fn)this.listeners.delete(name);}
  speak(u){this.calls.push(u);this.queue.push(u);this.pending=true;}
  cancel(){this.cancels++;const old=this.queue;this.queue=[];this.speaking=false;this.pending=false;for(const u of old)u.onerror?.({error:'canceled'});}
  start(u=this.queue.at(-1)){this.pending=false;this.speaking=true;u.onstart?.();}
  end(u=this.queue.at(-1)){this.queue=this.queue.filter(item=>item!==u);this.pending=false;this.speaking=false;u.onend?.();}
  fail(error,u=this.queue.at(-1)){this.queue=this.queue.filter(item=>item!==u);this.pending=false;this.speaking=false;u.onerror?.({error});}
  change(voices){this.voices=voices;this.listeners.get('voiceschanged')?.();}
}
function fixture({voices=[female],enabled=true,volume=.8}={}){
  let time=0,id=0;const timers=new Map(),states=[],synth=new Synth(voices);
  const voice=new CharacterVoice({synth,Utterance,enabled,volume,now:()=>time,onChange:s=>states.push(s),setTimer:(fn,delay)=>{timers.set(++id,{fn,at:time+delay});return id;},clearTimer:timer=>timers.delete(timer)});
  return {voice,synth,states,timers,advance(ms){const until=time+ms;let next;while((next=[...timers].filter(([,timer])=>timer.at<=until).sort((a,b)=>a[1].at-b[1].at)[0])){const [key,timer]=next;time=timer.at;timers.delete(key);timer.fn();}time=until;}};
}

test('construction and late voice discovery never issue speech; unlock is silent and gesture controlled',()=>{
  const f=fixture({voices:[]});assert.equal(f.synth.calls.length,0);assert.equal(f.voice.state().availability,'loading');
  f.synth.change([female]);assert.equal(f.synth.calls.length,0);assert.equal(f.voice.state().availability,'ready');
  assert.equal(f.voice.unlock(),true);assert.equal(f.synth.calls.length,1);assert.equal(f.synth.calls[0].volume,0);assert.equal(f.synth.calls[0].text,' ');
  f.voice.unlock();assert.equal(f.synth.calls.length,1,'A second activation must not interrupt an active speech session');
});

test('new dialogue replaces the queue; duplicate keys do not repeat and forced replay does',()=>{
  const f=fixture();assert.equal(f.voice.speak(1,'こんにちは。',{key:'line-1'}),true);const old=f.synth.calls.at(-1);f.synth.start(old);
  assert.equal(f.voice.speak(1,'こんにちは。',{key:'line-1'}),false);assert.equal(f.synth.calls.length,1);
  assert.equal(f.voice.speak(1,'次の会話です。',{key:'line-2'}),true);f.advance(75);assert.equal(f.synth.queue.length,1);assert.equal(f.voice.state().text,'次の会話です。');
  assert.equal(f.voice.speak(1,'次の会話です。',{key:'line-2',force:true}),true);f.advance(75);assert.equal(f.synth.queue.length,1);assert.equal(f.synth.calls.length,3);
});

test('canceled utterance callbacks cannot stop or alter its replacement',()=>{
  const f=fixture();f.voice.speak(1,'最初の会話。',{key:'first'});const old=f.synth.calls.at(-1);f.synth.start(old);
  f.voice.speak(2,'次の対戦相手。',{key:'second'});f.advance(75);const next=f.synth.calls.at(-1);f.synth.start(next);
  old.onend();old.onerror({error:'not-allowed'});old.onstart();
  assert.equal(f.voice.state().speaking,true);assert.equal(f.voice.state().blocked,false);assert.equal(f.voice.state().text,'次の対戦相手。');
  f.synth.end(next);assert.equal(f.voice.state().speaking,false);
});

test('one Japanese system voice still receives every character distinct prosody',()=>{
  const f=fixture(),settings=[];
  for(let stage=1;stage<=7;stage++){
    assert.equal(f.voice.speak(stage,'よろしくお願いします。',{key:'stage-'+stage}),true);
    f.advance(75);
    const u=f.synth.calls.at(-1),p=getVoiceProfile(stage);
    assert.equal(u.lang,'ja-JP');assert.equal(u.voice,female);assert.equal(u.rate,p.rate);assert.equal(u.pitch,p.pitch);
    assert.equal(u.volume,.8*(p.volume??1));settings.push([u.rate,u.pitch].join(':'));
  }
  assert.equal(new Set(settings).size,7);
});

test('voice selection uses Japanese preferences while excluding a known male option when another is installed',()=>{
  const f=fixture({voices:[{name:'Samantha',lang:'en-US',default:true},{name:'Otoya',lang:'ja-JP'},{name:'Haruka',lang:'ja-JP'},{name:'Kyoko',lang:'ja-JP'}]});
  for(let stage=1;stage<=7;stage++){f.voice.speak(stage,'こんにちは。');f.advance(75);assert.match(f.synth.calls.at(-1).voice.name,/Haruka|Kyoko/);}
  const noJapanese=fixture({voices:[{name:'Samantha',lang:'en-US'}]});
  assert.equal(noJapanese.voice.state().availability,'unavailable');assert.equal(noJapanese.voice.speak(1,'こんにちは。'),false);assert.equal(noJapanese.synth.calls.length,0);
  noJapanese.synth.change([female]);assert.equal(noJapanese.voice.speak(1,'こんにちは。'),true);
});

test('mute stops an ongoing line and volume changes preserve the profile gain',()=>{
  const f=fixture();f.voice.speak(3,'ゆっくり始めましょう。');const u=f.synth.calls.at(-1);f.synth.start(u);
  f.voice.setVolume(.3);assert.equal(u.volume,.3*(getVoiceProfile(3).volume??1));
  f.voice.setEnabled(false);assert.equal(f.voice.state().speaking,false);assert.equal(f.synth.queue.length,0);assert.equal(f.voice.state().text,'');
  assert.equal(f.voice.speak(3,'声を止めます。',{force:true}),false);assert.equal(f.voice.unlock(),false);
  f.voice.setEnabled(true);assert.equal(f.synth.calls.length,1,'Re-enabling alone must not autoplay');
  assert.equal(f.voice.speak(3,'もう一度。',{force:true}),true);f.advance(75);assert.equal(f.synth.calls.at(-1).volume,.3*(getVoiceProfile(3).volume??1));
  assert.equal(f.voice.setVolume(9),1);assert.equal(f.voice.setVolume(-1),0);assert.equal(f.voice.setVolume(NaN),0);
});

test('ambient comments are dropped during another line and for twelve seconds after any speech',()=>{
  const f=fixture();f.voice.speak(1,'対局を始めよう。',{key:'start'});const u=f.synth.calls.at(-1);
  assert.equal(f.voice.speak(1,'あなたの番だよ。',{priority:'ambient',key:'turn-0'}),false);
  f.synth.start(u);f.synth.end(u);f.advance(11999);
  assert.equal(f.voice.speak(1,'あなたの番だよ。',{priority:'ambient',key:'turn-1'}),false);
  f.advance(1);assert.equal(f.voice.speak(1,'あなたの番だよ。',{priority:'ambient',key:'turn-1'}),true);
  assert.equal(f.voice.speak(1,'リーチだね！',{priority:'important',key:'riichi'}),true);f.advance(75);assert.equal(f.synth.queue.length,1);
});

test('a speech engine which never starts times out without blocking game code and old timers stay harmless',()=>{
  const f=fixture();f.voice.speak(1,'こんにちは。',{key:'silent'});f.advance(3999);assert.equal(f.voice.state().blocked,false);
  f.advance(1);assert.equal(f.voice.state().blocked,true);assert.equal(f.voice.state().error,'not-started');assert.equal(f.synth.queue.length,0);assert.equal(f.voice.state().speaking,false);
  assert.equal(f.voice.speak(1,'もう一度。',{force:true}),true);f.advance(75);const next=f.synth.calls.at(-1);f.synth.start(next);f.advance(4000);assert.equal(f.voice.state().blocked,false);assert.equal(f.voice.state().speaking,true);
});

test('stop, disposal and absent APIs never schedule automatic speech',()=>{
  const f=fixture();f.voice.speak(1,'こんにちは。');const old=f.synth.calls.at(-1);f.voice.stop();old.onstart();old.onend();
  assert.equal(f.voice.state().speaking,false);assert.equal(f.timers.size,0);f.voice.dispose();f.synth.change([female]);
  assert.equal(f.synth.listeners.size,0);assert.equal(f.voice.speak(1,'もう一度。',{force:true}),false);
  const unavailable=new CharacterVoice({synth:null,Utterance:null});assert.equal(unavailable.state().supported,false);assert.equal(unavailable.state().availability,'unsupported');assert.equal(unavailable.unlock(),false);assert.equal(unavailable.speak(1,'こんにちは。'),false);unavailable.stop();unavailable.dispose();
});

test('explicit speech errors surface recovery state without treating normal cancellation as failure',()=>{
  const f=fixture();f.voice.speak(1,'こんにちは。');f.synth.fail('not-allowed');
  assert.equal(f.voice.state().blocked,true);assert.equal(f.voice.state().error,'not-allowed');
  f.voice.speak(1,'別の会話。');f.synth.fail('language-unavailable');
  assert.equal(f.voice.state().availability,'unavailable');f.synth.change([female]);assert.equal(f.voice.state().availability,'ready');
  f.voice.speak(1,'別の会話。',{force:true});f.synth.fail('canceled');assert.equal(f.voice.state().error,'');assert.equal(f.voice.state().blocked,false);
});

test('timer adapters never invoke supplied timer functions with the controller receiver',()=>{
  const synth=new Synth(),timers=new Map();let id=0;
  function strictSchedule(fn,delay){assert.equal(this,undefined);assert.equal(delay,4000);timers.set(++id,fn);return id;}
  function strictCancel(timer){assert.equal(this,undefined);timers.delete(timer);}
  const voice=new CharacterVoice({synth,Utterance,setTimer:strictSchedule,clearTimer:strictCancel});
  assert.equal(voice.speak(1,'音声を確認します。'),true);
  assert.equal(voice.state().error,'');assert.equal(timers.size,1);
  synth.start();assert.equal(timers.size,0);assert.equal(voice.state().speaking,true);
  voice.stop();assert.equal(voice.state().speaking,false);
});

test('zero volume cancels native speech immediately and never leaves a silent queued utterance',()=>{
  const f=fixture();f.voice.speak(1,'音量を下げます。');const old=f.synth.calls.at(-1);f.synth.start(old);
  const before=f.synth.cancels;f.voice.setVolume(0);
  assert.equal(f.synth.cancels,before+1);assert.equal(f.synth.queue.length,0);assert.equal(f.timers.size,0);
  assert.equal(f.voice.state().speaking,false);assert.equal(f.voice.state().text,'');assert.equal(f.voice._utterance,null);
  assert.equal(f.voice.speak(1,'無音の台詞。',{force:true}),false);assert.equal(f.voice.unlock(),false);
  old.onstart();assert.equal(f.voice.state().speaking,false);
  f.voice.setVolume(.5);assert.equal(f.synth.calls.length,1,'Raising volume must not autoplay');
  assert.equal(f.voice.speak(1,'もう一度、確認します。',{force:true}),true);
});

test('idle speech is dispatched immediately without an unnecessary native cancellation',()=>{
  const f=fixture();f.voice.stop();assert.equal(f.synth.cancels,0);
  assert.equal(f.voice.speak(1,'はじめの会話。'),true);assert.equal(f.synth.calls.length,1);assert.equal(f.synth.cancels,0);
  f.synth.start();f.synth.end();
  assert.equal(f.voice.speak(2,'次の会話。'),true);assert.equal(f.synth.calls.length,2);assert.equal(f.synth.cancels,0);
});

test('real cancellation is separated from dispatch and only the newest replacement survives',()=>{
  const f=fixture();f.voice.speak(1,'最初の会話。');f.synth.start();
  f.voice.speak(2,'途中の会話。');assert.equal(f.synth.cancels,1);assert.equal(f.synth.calls.length,1);
  f.advance(25);f.voice.speak(3,'最後の会話。');assert.equal(f.synth.cancels,1,'Replacing an unsubmitted line must not cancel the native backend again');
  f.advance(49);assert.equal(f.synth.calls.length,1);
  f.advance(1);assert.equal(f.synth.calls.length,2);assert.equal(f.synth.calls.at(-1).text,'最後の会話。');
  assert.equal(f.voice.state().text,'最後の会話。');
});

test('stop, mute and volume zero cancel a deferred dispatch before native speech can start',()=>{
  for(const stop of [voice=>voice.stop(),voice=>voice.setEnabled(false),voice=>voice.setVolume(0)]){
    const f=fixture();f.voice.speak(1,'前の会話。');f.synth.start();f.voice.speak(2,'再生してはいけない会話。');
    assert.equal(f.voice._dispatchTimer!==null,true);stop(f.voice);f.advance(5000);
    assert.equal(f.synth.calls.length,1);assert.equal(f.synth.queue.length,0);assert.equal(f.timers.size,0);
    assert.equal(f.voice._dispatchTimer,null);assert.equal(f.voice._utterance,null);assert.equal(f.voice.state().speaking,false);
  }
});

test('the no-start watchdog begins at native dispatch rather than the replacement request',()=>{
  const f=fixture();f.voice.speak(1,'前の会話。');f.synth.start();f.voice.speak(2,'開始を待つ会話。');
  f.advance(4074);assert.equal(f.voice.state().blocked,false);
  f.advance(1);assert.equal(f.voice.state().blocked,true);assert.equal(f.voice.state().error,'not-started');
});

test('an immediate native end without start exposes recovery and keeps the full caption replayable',()=>{
  const f=fixture(),text='こんにちは。ゆっくり始めましょう。';
  f.voice.speak(1,text,{key:'silent-end'});const u=f.synth.calls.at(-1);
  u.onend({elapsedTime:.10000000149,charIndex:0});
  assert.equal(f.voice.state().blocked,true);assert.equal(f.voice.state().error,'not-started');
  assert.equal(f.voice.state().text,text);assert.equal(f.voice.state().speaking,false);
  assert.equal(f.voice._utterance,null);assert.equal(f.voice._watchdog,null);assert.equal(f.timers.size,0);
  assert.equal(f.voice._unlocked,false);assert.equal(f.synth.calls.length,1,'Silent completion must not trigger an automatic fallback loop');
});

test('the silent-end check preserves positive-duration completion, actual starts and short responses',()=>{
  const f=fixture();f.voice.speak(1,'落ち着いて、始めましょう。');
  f.synth.calls.at(-1).onend({elapsedTime:2.8,charIndex:13});
  assert.equal(f.voice.state().blocked,false);assert.equal(f.voice.state().error,'');
  // The fake native queue is reset, as a real completed backend would do.
  f.synth.queue=[];f.synth.pending=false;f.voice.speak(1,'ここからは、落ち着いて打ちましょう。',{key:'actually-started'});const short=f.synth.calls.at(-1);f.synth.start(short);
  short.onend({elapsedTime:.1,charIndex:0});assert.equal(f.voice.state().blocked,false);assert.equal(f.voice.state().error,'');
  f.synth.queue=[];f.synth.pending=false;f.synth.speaking=false;
  f.voice.speak(1,'はい。',{key:'short-response'});f.synth.calls.at(-1).onend({elapsedTime:.1,charIndex:0});assert.equal(f.voice.state().blocked,false);
  f.synth.queue=[];f.synth.pending=false;
  f.voice.speak(1,'長い会話ですが終了時刻は不明です。',{key:'unknown-duration'});
  f.synth.calls.at(-1).onend({charIndex:0});assert.equal(f.voice.state().blocked,false);
});
