import test from 'node:test';
import assert from 'node:assert/strict';
import {createAnimeCharacterRenderer} from './anime-characters.mjs';

function context(){
  const calls=[],stack=[];
  const c={calls,imageSmoothingEnabled:false,imageSmoothingQuality:'low',fillStyle:'#000'};
  c.save=()=>stack.push({imageSmoothingEnabled:c.imageSmoothingEnabled,imageSmoothingQuality:c.imageSmoothingQuality,fillStyle:c.fillStyle});
  c.restore=()=>Object.assign(c,stack.pop());
  for(const key of ['translate','scale','rotate','beginPath','ellipse','fill','fillRect','drawImage'])c[key]=(...args)=>{calls.push({key,args});for(const arg of args)if(typeof arg==='number')assert.ok(Number.isFinite(arg),key+' uses finite coordinates');};
  c.createRadialGradient=()=>({addColorStop(){}});return c;
}
function image(id){return{id,width:id==='explorer'?320:512,height:512};}
function setup(options={}){
  const requests=[];
  const renderer=createAnimeCharacterRenderer({baseUrl:new URL('https://game.invalid/characters/'),loadImage:async url=>{const id=new URL(url).pathname.split('/').at(-1).replace('.webp','');requests.push(id);return image(id);},...options});
  return{...renderer,requests};
}

test('loading coalesces concurrent requests and leaves drawing available for fallback until decoded',async()=>{
  const pending=[],requests=[];
  const r=setup({loadImage:url=>{requests.push(url);return new Promise(resolve=>pending.push(()=>resolve(image('explorer'))));}});
  const c=context();assert.equal(r.drawAnimeExplorer(c,10,20),false);assert.equal(c.calls.length,0);
  const first=r.preloadCharacters(),second=r.preloadCharacters();await Promise.resolve();
  assert.equal(requests.length,5);assert.equal(r.getCharacterAssetStatus().loading.length,5);
  for(const finish of pending)finish();
  assert.equal((await first).baseReady,true);assert.equal((await second).baseReady,true);
  await r.preloadCharacters();assert.equal(requests.length,5);
});

test('a missing image does not block other characters and retries only when explicitly requested',async()=>{
  let attempts=0;
  const r=setup({loadImage:async url=>{const id=new URL(url).pathname.split('/').at(-1).replace('.webp','');if(id==='moth'&&attempts++===0)throw Error('offline');return image(id);}});
  const status=await r.preloadCharacters();assert.equal(status.complete,true);assert.equal(status.baseReady,false);assert.deepEqual(status.failed,['moth']);
  assert.equal(r.drawAnimeMonster(context(),{kind:'moth'},0,0),false);
  assert.equal(r.drawAnimeMonster(context(),{kind:'golem'},0,0),true);
  await r.preloadCharacters();assert.equal(attempts,1);
  assert.equal((await r.preloadCharacters({retryFailed:true})).baseReady,true);assert.equal(attempts,2);
});

test('directional assets are opt-in, deduplicated, and selected without changing motion data',async()=>{
  const r=setup();await r.preloadCharacters();assert.equal(r.requests.length,5);
  await r.preloadCharacters({views:['up','left','right','left','unknown']});assert.equal(r.requests.length,8);
  for(const facing of ['up','left','right','down']){
    const motion=Object.freeze({facing,kind:'idle',progress:1}),c=context();assert.equal(r.drawAnimeExplorer(c,100,100,40,1000,motion),true);
    const drawn=c.calls.find(v=>v.key==='drawImage').args[0];assert.equal(drawn.id,facing==='down'?'explorer':'explorer-'+facing);
    const draw=c.calls.find(v=>v.key==='drawImage'),anchor={down:.991525,up:.990183,left:.980984,right:.995376}[facing];
    assert.ok(Math.abs(draw.args[2]+56.8*anchor)<1e-10,'each approved view uses its own foot anchor');
    assert.deepEqual(motion,{facing,kind:'idle',progress:1});
  }
  const snapshot=r.getCharacterAssetStatus();snapshot.ready.length=0;assert.equal(r.getCharacterAssetStatus().ready.length,8);
});

test('walking alternates boot regions, attacks lunge, and reduced motion draws one grounded still',async()=>{
  const r=setup();await r.preloadCharacters();
  const walk=context();r.drawAnimeExplorer(walk,50,70,56,1000,Object.freeze({facing:'right',kind:'move',progress:.125}));
  assert.equal(walk.calls.filter(v=>v.key==='drawImage').length,3);
  const attack=context();r.drawAnimeExplorer(attack,50,70,56,1000,{facing:'right',kind:'attack',progress:.5});
  assert.ok(attack.calls.some(v=>v.key==='translate'&&v.args[0]>50),'attack moves toward the target visually');
  const still=context();r.drawAnimeExplorer(still,50,70,56,1000,{facing:'right',kind:'move',progress:.125,reducedMotion:true});
  assert.equal(still.calls.filter(v=>v.key==='drawImage').length,1);
  assert.equal(still.imageSmoothingEnabled,false);assert.equal(still.imageSmoothingQuality,'low');
  assert.ok(still.calls.some(v=>v.key==='translate'&&v.args[0]===50&&v.args[1]===86.8),'foot anchor keeps the existing gameplay contact point');
});

test('all enemy forms preserve saved data and place damage bars above their complete silhouettes',async()=>{
  const r=setup();await r.preloadCharacters();
  for(const kind of ['moss','moth','golem','boss'])for(const reducedMotion of [false,true]){
    const enemy=Object.freeze({kind,x:2,y:4,hp:5,maxHp:10}),before=JSON.stringify(enemy),c=context();
    assert.equal(r.drawAnimeMonster(c,enemy,200,160,60,1000,{reducedMotion}),true);
    assert.equal(JSON.stringify(enemy),before);assert.equal(c.imageSmoothingEnabled,false);
    const bar=c.calls.filter(v=>v.key==='fillRect').at(-2);assert.ok(bar.args[1]<160-30,'bar is above the head rather than across the face');
    assert.equal(c.calls.filter(v=>v.key==='drawImage').length,1);
  }
});

test('reduced motion produces identical character transforms regardless of clock time',async()=>{
  const r=setup();await r.preloadCharacters();
  const a=context(),b=context();
  r.drawAnimeExplorer(a,40,80,44,0,{reducedMotion:true});r.drawAnimeExplorer(b,40,80,44,100000,{reducedMotion:true});assert.deepEqual(a.calls,b.calls);
  const e=Object.freeze({kind:'moth',hp:1,maxHp:1,x:4,y:6}),c=context(),d=context();
  r.drawAnimeMonster(c,e,40,80,44,0,{reducedMotion:true});r.drawAnimeMonster(d,e,40,80,44,100000,{reducedMotion:true});assert.deepEqual(c.calls,d.calls);
});
