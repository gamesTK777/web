import test from 'node:test';
import assert from 'node:assert/strict';
import {rewardMediaKind,isVideoControlEvent,createRewardMediaController} from './reward-media.mjs';

class MediaElement {
  constructor(tag){this.tagName=tag.toUpperCase();this.attributes=new Map();this.hidden=false;this.paused=true;this.currentTime=0;this.duration=60;this.pauseCalls=0;this.loadCalls=0;this.playCalls=0;this.textContent='';this._src='';}
  set src(value){this._src=String(value);this.attributes.set('src',this._src);}
  get src(){return this._src;}
  setAttribute(key,value){this.attributes.set(key,String(value));}
  getAttribute(key){return this.attributes.get(key)??null;}
  removeAttribute(key){this.attributes.delete(key);if(key==='src')this._src='';}
  closest(selector){return selector.toUpperCase()===this.tagName?this:null;}
  pause(){this.paused=true;this.pauseCalls++;}
  load(){this.currentTime=0;this.loadCalls++;}
  play(){this.paused=false;this.playCalls++;this.onplay?.();}
}
function fixture(){const image=new MediaElement('img'),video=new MediaElement('video'),empty=new MediaElement('p'),status=new MediaElement('p'),fallbacks=[];let stops=0;const media=createRewardMediaController({image,video,empty,status,onVideoPlay:()=>stops++,onFallback:value=>fallbacks.push(value)});return{image,video,empty,status,media,fallbacks,get stops(){return stops;}};}

test('only explicit MP4 metadata opts into video; absent and inherited metadata keep old image behavior',()=>{
  assert.equal(rewardMediaKind('old-id'), 'image');assert.equal(rewardMediaKind('old-id',{}),'image');assert.equal(rewardMediaKind('id',{'id':'image/webp'}),'image');assert.equal(rewardMediaKind('id',{'id':'video/webm'}),'image');assert.equal(rewardMediaKind('id',{'id':'video/mp4'}),'video');assert.equal(rewardMediaKind('id',Object.create({id:'video/mp4'})),'image');
});

test('a registered image keeps the bundled fallback and stale image errors cannot disturb a later MP4',()=>{
  const f=fixture(),spec=Object.freeze({id:'photo',src:'/photo',fallbackSrc:'/bundled',alt:'記念画像'});
  f.media.show(spec);const oldError=f.image.onerror;assert.equal(f.image.hidden,false);assert.equal(f.video.hidden,true);f.image.onerror();assert.equal(f.image.src,'/bundled');assert.equal(f.fallbacks.at(-1),true);f.image.onerror();assert.equal(f.image.hidden,true);assert.equal(f.empty.hidden,false);assert.match(f.status.textContent,/画像を読み込めません/);
  f.media.show({id:'movie',mediaTypes:{movie:'video/mp4'},src:'/movie'});oldError();assert.equal(f.video.hidden,false);assert.equal(f.video.src,'/movie');assert.equal(f.empty.hidden,true);assert.equal(spec.src,'/photo');
});

test('MP4 uses native inline controls without autoplay and switching or clearing releases hidden audio',()=>{
  const f=fixture();f.media.show({id:'movie',mediaTypes:{movie:'video/mp4'},src:'/movie',alt:'ご褒美動画'});
  assert.equal(f.video.controls,true);assert.equal(f.video.playsInline,true);assert.equal(f.video.preload,'metadata');assert.equal(f.video.autoplay,false);assert.equal(f.video.getAttribute('autoplay'),null);assert.equal(f.video.getAttribute('playsinline'),'');assert.equal(f.video.playCalls,0);assert.equal(f.stops,0);
  f.video.play();assert.equal(f.stops,1);assert.equal(f.video.paused,false);const loads=f.video.loadCalls;
  f.media.show({id:'photo',src:'/photo'});assert.equal(f.video.paused,true);assert.equal(f.video.getAttribute('src'),null);assert.ok(f.video.loadCalls>loads);assert.equal(f.video.hidden,true);assert.equal(f.image.hidden,false);
  f.media.clear();assert.equal(f.image.hidden,true);assert.equal(f.image.getAttribute('src'),null);assert.equal(f.media.state().kind,null);f.media.clear();assert.equal(f.video.paused,true);
});

test('backgrounding unloads a movie and returning restores its position but never restarts playback',()=>{
  const f=fixture();f.media.show({id:'movie',mediaTypes:{movie:'video/mp4'},src:'/movie'});f.video.play();f.video.currentTime=17.5;
  f.media.suspend();assert.equal(f.video.paused,true);assert.equal(f.video.src,'');assert.equal(f.video.hidden,true);assert.equal(f.media.state().suspended,true);
  f.media.resume();assert.equal(f.video.src,'/movie');assert.equal(f.video.hidden,false);assert.equal(f.video.playCalls,1);assert.equal(f.video.paused,true);f.video.onloadedmetadata();assert.equal(f.video.currentTime,17.5);assert.equal(f.media.state().suspended,false);
  f.video.currentTime=59.99;f.media.pause();assert.equal(f.video.src,'/movie');assert.equal(f.video.currentTime,59.99);
  f.media.suspend();f.media.clear();f.media.resume();assert.equal(f.video.src,'');assert.equal(f.media.state().kind,null);
});

test('a failed MP4 stays a video slot with a clear message and a later image remains navigable',()=>{
  const f=fixture();f.media.show({id:'broken',mediaTypes:{broken:'video/mp4'},src:'/broken',fallbackSrc:'/must-not-be-used',errorText:'動画を読み込めません。次へ進めます。'});const stale=f.video.onerror;f.video.play();f.video.onerror();assert.equal(f.video.hidden,true);assert.equal(f.video.paused,true);assert.equal(f.video.src,'');assert.equal(f.image.hidden,true);assert.equal(f.media.state().kind,'video');assert.match(f.status.textContent,/動画を読み込めません/);
  f.media.show({id:'next',src:'/next'});stale();assert.equal(f.image.src,'/next');assert.equal(f.image.hidden,false);assert.equal(f.empty.hidden,true);assert.equal(f.status.hidden,true);
});

test('native video keyboard events are recognized through retargeting and their composed path',()=>{
  const video=new MediaElement('video'),button=new MediaElement('button');assert.equal(isVideoControlEvent({target:video}),true);assert.equal(isVideoControlEvent({target:button,composedPath:()=>[button,video]}),true);assert.equal(isVideoControlEvent({target:button}),false);assert.equal(isVideoControlEvent({target:new MediaElement('img'),composedPath:()=>[new MediaElement('div')]}),false);
});
