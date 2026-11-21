import test from 'node:test';
import assert from 'node:assert/strict';
import {GameAudio,MUSIC_TRACKS} from './audio.mjs';

class Media extends EventTarget {
  constructor(play){
    super();
    this.requestPlay=play;
    this.paused=true;
    this.ended=false;
    this.error=null;
    this.currentTime=0;
    this.loaded=[];
    this.playCalls=0;
  }
  get src(){return this.loaded.at(-1);}
  set src(value){
    this.loaded.push(value);
    this.currentTime=0;this.paused=true;this.ended=false;this.error=null;
  }
  play(){
    this.playCalls++;
    if(this.requestPlay)return this.requestPlay(this);
    this.paused=false;
    this.dispatchEvent(new Event('playing'));
    return Promise.resolve();
  }
  pause(){this.paused=true;}
  finish(){
    this.ended=true;this.paused=true;this.dispatchEvent(new Event('ended'));
  }
  fail(){
    this.error={code:4};this.paused=true;this.dispatchEvent(new Event('error'));
  }
}

function fixture({state='running',play,random,tracks,volumeLocked=false}={}){
  const parameter=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}});
  const oscillators=[];
  const node=()=>({gain:parameter(),frequency:parameter(),threshold:parameter(),knee:parameter(),
    ratio:parameter(),attack:parameter(),release:parameter(),connect(){},disconnect(){},start(){},stop(){}});
  let resume;
  const context={state,currentTime:0,createGain:node,createDynamicsCompressor:node,
    createOscillator:()=>{const osc=node();oscillators.push(osc);return osc;},
    resume:()=>new Promise(resolve=>{resume=()=>{context.state='running';resolve();};})};
  let created=0,musicGain;
  const media=new Media(play);
  if(volumeLocked){
    Object.defineProperty(media,'volume',{get:()=>1,set(){}});
    context.createMediaElementSource=element=>({connect(gain){assert.equal(element,media);musicGain=gain;}});
  }
  const audio=new GameAudio({contextFactory:()=>context,mediaFactory:()=>{created++;return media;},random,tracks});
  return {audio,media,oscillators,resume:()=>resume(),get created(){return created;},get musicGain(){return musicGain;}};
}

test('twenty MP3 assets use relative same-site URLs',()=>{
  assert.equal(new Set(MUSIC_TRACKS).size,20);
  assert.deepEqual(MUSIC_TRACKS.map(url=>new URL(url).pathname.split('/').at(-1)),
    Array.from({length:20},(_,i)=>String(i+1).padStart(2,'0')+'.mp3'));
});

test('title screen, muted settings and audio unlocking do not load a track until Play',()=>{
  const f=fixture();
  f.audio.unlock();f.audio.setMusic(false);f.audio.setMusic(true);
  assert.equal(f.created,0);
  f.audio.setMusic(false);f.audio.setPlaying(true,true);
  assert.equal(f.created,0);
  f.audio.setMusic(true);
  assert.equal(f.created,1);
  assert.equal(f.media.loop,false);
  assert.equal(f.media.preload,'none');
  assert.equal(f.media.playCalls,1);
});

test('the shuffle uses all tracks and prevents repeats at a queue boundary',()=>{
  let rolls=0;
  const f=fixture({random:()=>rolls++<19?.99:0});
  f.audio.setPlaying(true,true);
  for(let i=0;i<20;i++)f.media.finish();
  assert.equal(f.created,1);
  const used=f.media.loaded;
  assert.deepEqual(new Set(used.slice(0,20)),new Set(MUSIC_TRACKS));
  assert.notEqual(used[19],used[20]);
  assert.equal(f.media.playCalls,21);
});

test('pause, mute and volume keep the current track; a new run chooses another',()=>{
  const {audio,media}=fixture();
  audio.setVolume(.34);audio.setPlaying(true,true);
  assert.equal(media.volume,.34);
  const first=media.src;
  media.currentTime=17;
  audio.setPlaying(true);
  assert.equal(media.playCalls,1);
  audio.setPlaying(false);
  assert.equal(media.paused,true);
  audio.setPlaying(true);
  assert.equal(media.currentTime,17);
  audio.setMusic(false);
  assert.equal(media.paused,true);
  audio.setVolume(.71);audio.setMusic(true);
  assert.equal(media.currentTime,17);
  assert.equal(media.volume,.71);
  assert.deepEqual(media.loaded,[first]);
  audio.setPlaying(true,true);
  assert.notEqual(media.src,first);
  assert.equal(media.currentTime,0);
});

test('a late media or sound-context resume cannot start music after the game ends',async()=>{
  let release;
  const {audio,media,resume}=fixture({state:'suspended',play:el=>{
    el.paused=false;return new Promise(resolve=>{release=resolve;});
  }});
  audio.unlock();audio.setPlaying(true,true);audio.setPlaying(false);
  release();resume();
  await Promise.resolve();
  assert.equal(media.paused,true);
  media.finish();
  assert.equal(media.playCalls,1);
  assert.equal(media.loaded.length,1);
});

test('the BGM slider uses Web Audio gain when a mobile browser ignores media volume',()=>{
  const f=fixture({volumeLocked:true});
  f.audio.unlock();
  f.audio.setPlaying(true,true);
  assert.equal(f.media.volume,1);
  assert.equal(f.musicGain.gain.value,.42);
  const gain=f.musicGain;
  f.audio.setVolume(0);
  assert.equal(f.media.muted,true);
  f.audio.setVolume(.25);
  assert.equal(f.musicGain,gain);
  assert.equal(gain.gain.value,.25);
  assert.equal(f.media.muted,false);
});

test('a denied browser play keeps the active track ready for another gesture',async()=>{
  let first=true;
  const {audio,media}=fixture({play:el=>{
    if(first){first=false;return Promise.reject(new DOMException('', 'NotAllowedError'));}
    el.paused=false;return Promise.resolve();
  }});
  audio.setPlaying(true,true);
  await Promise.resolve();
  assert.equal(media.paused,true);
  audio.unlock();
  assert.equal(media.paused,false);
  assert.equal(media.loaded.length,1);
  assert.equal(media.playCalls,2);
});

test('a broken file skips to another and a wholly unavailable playlist stops after one pass',async()=>{
  const f=fixture({tracks:['a','b','c'],random:()=>.99});
  f.audio.setPlaying(true,true);
  const first=f.media.src;
  f.media.fail();
  assert.notEqual(f.media.src,first);
  assert.equal(f.media.paused,false);
  const bad=fixture({tracks:['a','b','c'],play:()=>Promise.reject(new DOMException('', 'NotSupportedError'))});
  bad.audio.setPlaying(true,true);
  for(let i=0;i<5;i++)await Promise.resolve();
  assert.equal(bad.media.playCalls,3);
  assert.equal(new Set(bad.media.loaded).size,3);
  assert.equal(bad.media.paused,true);
  bad.audio.setPlaying(false);
  bad.audio.setPlaying(true,true);
  assert.equal(bad.media.playCalls,4);
});

test('line-clear effects remain independent of the soundtrack',()=>{
  const {audio,media,oscillators}=fixture();
  audio.unlock();audio.setPlaying(true,true);audio.setMusic(false);
  audio.clear(4);
  assert.ok(oscillators.length>0);
  assert.equal(media.paused,true);
  audio.sfxEnabled=false;
  const count=oscillators.length;
  audio.clear(4);audio.tone();
  assert.equal(oscillators.length,count);
  audio.setMusic(true);
  assert.equal(media.paused,false);
});
