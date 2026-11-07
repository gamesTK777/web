import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame, act} from './engine.mjs';
import {drawScene} from './renderer.mjs';
import {MONSTER_ART} from './anime-characters.mjs';
import {ENEMY_TYPES} from './enemies.mjs';
import {drawSwarmRoom} from './swarm-art.mjs';

// Canvas contract probe, not a rasterizer. Visual quality is checked in-browser.
function makeCanvas(width=1280,height=720) {
  const canvas={clientWidth:width,clientHeight:height,width,height};
  const gradient={addColorStop(){}};
  const methods={
    createLinearGradient:()=>gradient,createRadialGradient:()=>gradient,
    createPattern:()=>({}),measureText:text=>({width:String(text).length*7}),
    getImageData:()=>({data:new Uint8ClampedArray(4),width:1,height:1})
  };
  let draws=0;canvas.text=[];canvas.paints=[];
  const context=new Proxy({canvas}, {
    get(target,key){
      if(key in target)return target[key];
      if(key in methods)return methods[key];
      return (...args)=>{draws++;if(key==='fillText')canvas.text.push(args[0]);if(['fillRect','stroke','fillText'].includes(key))canvas.paints.push({kind:key,color:key==='stroke'?target.strokeStyle:target.fillStyle,args});for(const n of args)if(typeof n==='number')assert.ok(Number.isFinite(n),`${String(key)} received non-finite coordinate`);};
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

function swarmProbe(){
  const calls=[],stack=[],target={};
  const c=new Proxy(target,{get(obj,key){
    if(key in obj)return obj[key];
    if(key==='save')return()=>stack.push({...obj});
    if(key==='restore')return()=>{for(const k of Object.keys(obj))delete obj[k];Object.assign(obj,stack.pop());};
    return(...args)=>calls.push({kind:key,args,color:key==='stroke'?obj.strokeStyle:obj.fillStyle,alpha:obj.globalAlpha});
  },set(obj,key,value){obj[key]=value;return true;}});
  return{c,calls};
}

test('event room marks reveal no hidden room and clip accents to currently visible floor tiles',()=>{
  const map={tiles:Array.from({length:6},()=>Array(6).fill(1)),rooms:[{x:1,y:1,width:3,height:3}]};
  for(const status of ['dormant','active','cleared']){
    map.swarm={roomIndex:0,status,enemyIds:[]};
    const hidden=swarmProbe();drawSwarmRoom(hidden.c,map,{visible:()=>false,px:x=>x*48,py:y=>y*48,tile:48,time:800});
    assert.equal(hidden.calls.length,0,`${status}: an unseen event room must draw no geometry`);
    const shown=swarmProbe();drawSwarmRoom(shown.c,map,{visible:(x,y)=>x===1&&y===2,px:x=>x*48,py:y=>y*48,tile:48,time:800});
    assert.deepEqual(shown.calls.find(call=>call.kind==='rect').args,[48,96,48,48]);
    for(const call of shown.calls.filter(call=>['moveTo','lineTo','fillRect'].includes(call.kind))){
      assert.ok(call.args[0]>=48&&call.args[0]<=96);assert.ok(call.args[1]>=96&&call.args[1]<=144);
    }
    assert.ok(shown.calls.some(call=>call.kind==='stroke'));
  }
});

test('event markers distinguish only visible sleeping or active group members, without altering save state',()=>{
  const base=act(newGame(77),{type:'enter'}).state,{x,y}=base.player;
  for(const status of ['dormant','active','cleared']){
    const state=JSON.parse(JSON.stringify(base));
    const enemy=(id,xx)=>({id,kind:'moss',name:'苔玉',x:xx,y,hp:8,maxHp:8,attack:2,defense:0,xp:8});
    state.enemies=[enemy('sleeping',x+1),enemy('hidden',x+2),enemy('ordinary',x)];state.enemies[0].hp=4;
    state.map.visible[y][x+2]=false;state.map.swarm={roomIndex:0,status,enemyIds:['sleeping','hidden']};
    const before=JSON.stringify(state),canvas=makeCanvas();drawScene(canvas,deepFreeze(state),{time:1000,zoom:3});
    assert.equal(canvas.text.filter(text=>text==='Z').length,status==='dormant'?1:0);
    assert.equal(canvas.text.filter(text=>text==='✦').length,status==='active'?1:0,'ordinary roaming monsters and hidden members have no group badge');
    if(status!=='cleared'){
      const badge=canvas.paints.find(paint=>paint.kind==='fillText'&&paint.args[0]===(status==='active'?'✦':'Z'));
      const health=canvas.paints.find(paint=>paint.color==='#eca27c');
      assert.ok(badge.args[2]+Math.max(7,72*.115)<health.args[1]-1,'the complete badge stays above the HP bar');
    }
    assert.equal(JSON.stringify(state),before);
  }
});

test('room signals remain still under reduced motion and transition bursts do not reveal offscreen events',()=>{
  const map={tiles:Array.from({length:6},()=>Array(6).fill(1)),rooms:[{x:1,y:1,width:3,height:3}],swarm:{roomIndex:0,status:'active',enemyIds:[]}};
  const probes=[swarmProbe(),swarmProbe()];
  for(const [i,time]of [0,100000].entries())drawSwarmRoom(probes[i].c,map,{visible:()=>true,px:x=>x*48,py:y=>y*48,tile:48,time,reducedMotion:true});
  assert.deepEqual(probes[0].calls,probes[1].calls);
  const state=act(newGame(77),{type:'enter'}).state,hidden={x:state.player.x+2,y:state.player.y};state.map.visible[hidden.y][hidden.x]=false;
  for(const kind of ['swarm-start','swarm-clear']){
    const canvas=makeCanvas();drawScene(canvas,deepFreeze(state),{time:1200,zoom:3,effects:[{kind,...hidden,startedAt:1000,duration:1600}]});
    assert.equal(canvas.paints.filter(paint=>paint.color===(kind==='swarm-start'?'#ffc28b':'#b9e6b9')).length,0);
    const visibleCanvas=makeCanvas();drawScene(visibleCanvas,state,{time:1200,zoom:3,effects:[{kind,...state.player,startedAt:1000,duration:1600}]});
    assert.ok(visibleCanvas.paints.some(paint=>paint.color===(kind==='swarm-start'?'#ffc28b':'#b9e6b9')));
  }
});
