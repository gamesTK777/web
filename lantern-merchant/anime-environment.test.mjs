import test from 'node:test';
import assert from 'node:assert/strict';
import {createEnvironmentRenderer,ENVIRONMENT_IDS,DUNGEON_THEMES} from './anime-environment.mjs';

function context(){
  const calls=[],state={globalAlpha:1,globalCompositeOperation:'source-over',imageSmoothingEnabled:false,imageSmoothingQuality:'low'},stack=[];
  return new Proxy({calls,...state},{get(target,key){
    if(key in target)return target[key];
    if(key==='save')return()=>stack.push(Object.fromEntries(Object.keys(state).map(k=>[k,target[k]])));
    if(key==='restore')return()=>Object.assign(target,stack.pop());
    if(key==='createLinearGradient'||key==='createRadialGradient')return()=>({addColorStop(){}});
    return(...args)=>{for(const value of args)if(typeof value==='number')assert.ok(Number.isFinite(value),`${key} received a non-finite value`);calls.push({method:key,args});};
  },set(target,key,value){target[key]=value;return true;}});
}
const image=id=>({id,width:512,height:512});
let canvases=0;
globalThis.OffscreenCanvas=class{constructor(width,height){this.width=width;this.height=height;this.ctx=context();canvases++;}getContext(){return this.ctx;}};

test('all nine scenery assets coalesce and failed images can be retried independently',async()=>{
  const requested=[],attempts=new Map();
  const art=createEnvironmentRenderer({loadImage:async url=>{const id=new URL(url).pathname.split('/').at(-1).replace('.webp','');requested.push(id);attempts.set(id,(attempts.get(id)||0)+1);if(id==='tree'&&attempts.get(id)===1)throw Error('offline');return image(id);}});
  const [a,b]=await Promise.all([art.preloadEnvironment(),art.preloadEnvironment()]);
  assert.equal(requested.length,9);assert.equal(a.ready.length,8);assert.deepEqual(a.failed,['tree']);assert.equal(a.complete,true);assert.equal(b.revision,8);
  a.ready.length=0;assert.equal(art.getEnvironmentAssetStatus().ready.length,8);
  const retried=await art.preloadEnvironment({retryFailed:true});assert.equal(retried.ready.length,9);assert.equal(requested.length,10);assert.equal(retried.revision,9);
});

test('loading does not block vector terrain, and decoded images invalidate fallback tile caches',async()=>{
  const releases=[];const art=createEnvironmentRenderer({loadImage:url=>new Promise(resolve=>releases.push(()=>resolve(image(url))))});
  const before=canvases,c=context();art.drawAnimeDungeonTile(c,0,0,72,1,0,0);assert.equal(canvases,before+1);
  art.drawAnimeDungeonTile(c,72,0,72,1,0,0);assert.equal(canvases,before+1);
  const pending=art.preloadEnvironment();await Promise.resolve();await Promise.resolve();
  assert.equal(art.getEnvironmentAssetStatus().loading.length,9);assert.equal(art.drawEnvironmentSprite(c,'trade',{x:163,y:139,width:180,height:165}),false);
  for(const release of releases)release();await pending;
  art.drawAnimeDungeonTile(c,0,0,72,1,0,0);assert.equal(canvases,before+2);
  assert.equal(art.drawEnvironmentSprite(c,'trade',{x:163,y:139,width:180,height:165}),true);
});

test('anime dungeon floors, walls, stairs and return gates render all ten floor themes without context leaks',()=>{
  const art=createEnvironmentRenderer();assert.equal(DUNGEON_THEMES.length,5);
  for(let floor=1;floor<=10;floor++)for(const value of [0,1,2,3])for(const variant of [0,7,15]){
    const c=context(),before={alpha:c.globalAlpha,smoothing:c.imageSmoothingEnabled,quality:c.imageSmoothingQuality,composite:c.globalCompositeOperation};
    assert.equal(art.drawAnimeDungeonTile(c,20,30,72,value,variant,Math.floor((floor-1)/2)),true);
    assert.ok(c.calls.some(call=>call.method==='drawImage'));
    assert.deepEqual({alpha:c.globalAlpha,smoothing:c.imageSmoothingEnabled,quality:c.imageSmoothingQuality,composite:c.globalCompositeOperation},before);
    const cv=c.calls.find(call=>call.method==='drawImage').args[0];assert.equal(cv.width,128);assert.equal(cv.height,128);
  }
});

test('generated town sprites retain exact logical rectangles, and textures repeat in world coordinates',async()=>{
  const art=createEnvironmentRenderer({loadImage:async url=>image(new URL(url).pathname)});await art.preloadEnvironment();
  for(const [id,x,y,width,height]of [['trade',163,139,180,165],['inn',206,334,166,151],['gate',417,77,120,145],['cottage',600,182,96,96],['tree',61,112,104,132]]){
    const c=context();assert.equal(art.drawEnvironmentSprite(c,id,{x,y,width,height}),true);assert.deepEqual(c.calls.find(call=>call.method==='drawImage').args.slice(1),[x,y,width,height]);assert.equal(c.imageSmoothingEnabled,false);
  }
  const c=context();art.drawEnvironmentTexture(c,'grass',{x:15,y:33,width:210,height:190,tileSize:128,alpha:.4});
  const draws=c.calls.filter(call=>call.method==='drawImage');assert.equal(draws.length,4);assert.deepEqual(draws[0].args.slice(-4),[0,0,128,128]);assert.equal(c.globalAlpha,1);
  assert.deepEqual(ENVIRONMENT_IDS,['trade','inn','gate','cottage','workshop','tree','grass','stone-floor','stone-wall']);
});
