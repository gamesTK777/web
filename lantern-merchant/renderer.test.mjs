import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame, act} from './engine.mjs';
import {drawScene} from './renderer.mjs';
import {MONSTER_ART} from './anime-characters.mjs';
import {ENEMY_TYPES} from './enemies.mjs';

// Canvas contract probe, not a rasterizer. Visual quality is checked in-browser.
function makeCanvas(width=1280,height=720) {
  const canvas={clientWidth:width,clientHeight:height,width,height};
  const gradient={addColorStop(){}};
  const methods={
    createLinearGradient:()=>gradient,createRadialGradient:()=>gradient,
    createPattern:()=>({}),measureText:text=>({width:String(text).length*7}),
    getImageData:()=>({data:new Uint8ClampedArray(4),width:1,height:1})
  };
  let draws=0;
  const context=new Proxy({canvas}, {
    get(target,key){
      if(key in target)return target[key];
      if(key in methods)return methods[key];
      return (...args)=>{draws++;for(const n of args)if(typeof n==='number')assert.ok(Number.isFinite(n),`${String(key)} received non-finite coordinate`);};
    },
    set(target,key,value){target[key]=value;return true;}
  });
  canvas.getContext=()=>context;
  canvas.drawCount=()=>draws;
  return canvas;
}
// Support renderer caches without depending on native browser/canvas packages.
if(!globalThis.OffscreenCanvas)globalThis.OffscreenCanvas=class {
  constructor(width,height){Object.assign(this,makeCanvas(width,height));}
};

function deepFreeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);for(const part of Object.values(value))deepFreeze(part);}return value;}

test('town and dungeon rendering never mutate the persisted game state',()=>{
  for(const source of [newGame(20261105),act(newGame(20261105),{type:'enter'}).state]){
    const before=JSON.stringify(source),state=deepFreeze(source),canvas=makeCanvas();
    for(const time of [0,90,180,800])drawScene(canvas,state,{time,zoom:3});
    assert.equal(JSON.stringify(state),before);
    assert.ok(canvas.drawCount()>0);
  }
});

test('zoomed mobile cameras keep the hero tap anchor finite and on screen near floor boundaries',()=>{
  const base=act(newGame(508),{type:'enter'}).state;
  const floors=[];
  for(let y=0;y<base.map.height;y++)for(let x=0;x<base.map.width;x++)if(base.map.tiles[y][x])floors.push({x,y});
  const extremes=[floors[0],floors.at(-1),floors.reduce((a,b)=>a.x<b.x?a:b),floors.reduce((a,b)=>a.x>b.x?a:b)];
  for(const [width,height] of [[320,440],[390,560],[1280,720]])for(const zoom of [2,3,4])for(const player of extremes){
    const state={...base,player};
    const info=drawScene(makeCanvas(width,height),state,{time:1000,zoom});
    assert.ok(info&&info.playerScreen);
    assert.ok(info.tileSize>=40,'zoomed view should not collapse into tiny map tiles');
    assert.ok(Number.isFinite(info.playerScreen.x)&&info.playerScreen.x>=0&&info.playerScreen.x<=width);
    assert.ok(Number.isFinite(info.playerScreen.y)&&info.playerScreen.y>=0&&info.playerScreen.y<=height);
  }
});

test('walking, combat effects, and reduced motion render safely through a turn boundary',()=>{
  const state=act(newGame(77),{type:'enter'}).state,canvas=makeCanvas(390,560);
  const to={...state.player},from={x:to.x+1,y:to.y};
  for(const facing of ['up','down','left','right'])for(const reducedMotion of [false,true])for(const time of [1000,1090,1180,2000]){
    const info=drawScene(canvas,deepFreeze(state),{
      time,zoom:3,reducedMotion,
      motion:{from,to,startedAt:1000,duration:180,facing,kind:'move'},
      effects:[{kind:'hurt',...to,text:'-3',startedAt:1000,duration:650}]
    });
    assert.ok(Number.isFinite(info.playerScreen.x)&&Number.isFinite(info.playerScreen.y));
  }
});

test('every catalog enemy renders through the image-unavailable path without mutating an old save',()=>{
  assert.deepEqual(Object.keys(MONSTER_ART).sort(),ENEMY_TYPES.map(e=>e.id).sort());
  const base=act(newGame(20261107),{type:'enter'}).state;
  for(const kind of Object.keys(MONSTER_ART))for(const reducedMotion of [false,true]){
    const state=deepFreeze({...base,enemies:[{id:'visual-'+kind,kind,name:kind,...base.player,hp:4,maxHp:10,attack:1,defense:0,xp:1}]}),before=JSON.stringify(state),canvas=makeCanvas(390,560);
    const info=drawScene(canvas,state,{time:1200,zoom:3,reducedMotion});
    assert.ok(info.playerScreen);assert.equal(JSON.stringify(state),before,kind);assert.ok(canvas.drawCount()>0);
  }
});
