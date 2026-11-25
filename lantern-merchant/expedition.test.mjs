import test from 'node:test';
import assert from 'node:assert/strict';
import {act,APPRAISAL_COST,ITEMS,newGame,TRAP_TYPES,validateSave} from './engine.mjs';

const copy=state=>JSON.parse(JSON.stringify(state));
const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
const findTile=(state,tile)=>{
  const y=state.map.tiles.findIndex(row=>row.includes(tile));
  return {x:state.map.tiles[y].indexOf(tile),y};
};
const quantity=(state,id)=>state.inventory.find(item=>item.id===id)?.qty??0;
function perform(state,action){
  const result=act(state,action);
  assert.equal(result.ok,true,result.message);
  return result.state;
}

function floor(seed,depth=1){
  let state=perform(newGame(seed),{type:'enter'});
  while(state.floor<depth){
    state.player=findTile(state,2);
    state=perform(state,{type:'stairs'});
  }
  return state;
}

function clearStage(state){
  state.enemies=[];
  state.loot=[];
  delete state.map.swarm;
  return state;
}

const hazard=(position,kind)=>({...position,kind,discovered:false,spent:false});

test('deep expeditions vary connected routes and place traps off critical tiles',()=>{
  const routes=new Set(),entrances=new Set(),kinds=new Set();
  for(let seed=1;seed<=60;seed++){
    const state=floor(seed,7),start=state.player,stairs=findTile(state,2),room=state.map.rooms[0];
    const corridors=state.map.tiles[10].map((tile,x)=>tile?x:-1).filter(x=>x>=0);
    const regions=[0,1,2].map(i=>corridors.some(x=>x>=10*i&&x<10*(i+1)));
    routes.add(String(regions));
    entrances.add(`${start.x-room.cx},${start.y-room.cy}`);
    const objects=[...state.enemies,...state.loot];
    assert.equal(state.map.traps.length,7);
    for(const trap of state.map.traps){
      assert.equal(state.map.tiles[trap.y][trap.x],1);
      assert.ok(distance(trap,start)>3&&distance(trap,stairs)>3);
      assert.ok(!objects.some(p=>distance(trap,p)===0));
      assert.equal(trap.discovered,false);
      assert.equal(trap.spent,false);
      objects.push(trap);
      kinds.add(trap.kind);
    }
    assert.deepEqual(validateSave(copy(state)),state);
  }
  assert.ok(routes.size>=3);
  assert.ok(entrances.size>=4);
  assert.deepEqual(kinds,new Set(Object.keys(TRAP_TYPES)));
  assert.deepEqual(floor(17,7),floor(17,7));
});

test('survey exposes only visible nearby traps at the price of an ordinary turn',()=>{
  const state=clearStage(floor(31));
  const {x,y}=state.player;
  state.map.tiles[y][x+1]=0;
  const visible=hazard({x,y:y+1},'salt-bed');
  const concealed=hazard({x:x+2,y},'steam-vent');
  const far=hazard({x:state.map.rooms[1].cx,y:state.map.rooms[1].cy},'bell-sigil');
  state.map.traps=[visible,concealed,far];
  const snapshot=copy(state),result=act(state,{type:'survey'});
  assert.equal(result.event,'survey');
  assert.deepEqual(result.survey,[{...visible,discovered:true}]);
  assert.deepEqual(result.state.map.traps,[{...visible,discovered:true},concealed,far]);
  assert.equal(result.state.turn,state.turn+1);
  assert.equal(result.state.hunger,state.hunger-.25);
  assert.deepEqual(state,snapshot);
  const reloaded=validateSave(copy(result.state));
  assert.deepEqual(reloaded.map.traps,result.state.map.traps);
  assert.deepEqual(act(reloaded,{type:'survey'}).survey,[]);
  assert.equal(act(newGame(31),{type:'survey'}).ok,false);
});

test('stepping on an exposed or hidden trap still moves, spends exactly one turn and cannot retrigger',()=>{
  for(const kind of ['salt-bed','steam-vent']){
    const state=clearStage(floor(36));
    const {x,y}=state.player,point={x:x+1,y};
    state.map.traps=[{...hazard(point,kind),discovered:kind==='salt-bed'}];
    const result=act(state,{type:'move',dx:1,dy:0});
    assert.equal(result.event,'move');
    assert.equal(result.trap.kind,kind);
    assert.match(result.trap.message,/作動/);
    assert.deepEqual(result.state.player,point);
    assert.equal(result.state.turn,state.turn+1);
    assert.equal(result.state.hunger,kind==='salt-bed'?93.75:99.75);
    assert.equal(result.state.hp,kind==='steam-vent'?33:36);
    const restored=validateSave(copy(result.state));
    assert.deepEqual(restored.map.traps,[{...hazard(point,kind),discovered:true,spent:true}]);
    const retread=act(perform(restored,{type:'move',dx:-1,dy:0}),{type:'move',dx:1,dy:0});
    assert.equal(retread.trap,undefined);
    assert.equal(retread.state.hp,result.state.hp);
    assert.equal(retread.state.hunger,result.state.hunger-.5);
  }
});

test('ringing sigil changes distant enemy movement on the triggering turn',()=>{
  const state=clearStage(floor(88));
  const point={x:state.player.x+1,y:state.player.y};
  const queue=[point],steps=new Map([[`${point.x},${point.y}`,0]]);
  for(let i=0;i<queue.length;i++){
    const p=queue[i],step=steps.get(`${p.x},${p.y}`)+1;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const x=p.x+dx,y=p.y+dy,key=`${x},${y}`;
      if(state.map.tiles[y]?.[x]===1&&!steps.has(key)){queue.push({x,y});steps.set(key,step);}
    }
  }
  const enemy=queue.find(p=>distance(p,point)>8&&distance(p,point)<=14&&steps.get(`${p.x},${p.y}`)<=18);
  assert.ok(enemy);
  state.enemies=[{id:'far',kind:'moss',name:'苔玉',...enemy,hp:6,maxHp:6,attack:2,defense:0,xp:2}];
  const move={type:'move',dx:1,dy:0};
  state.map.traps=[];
  assert.equal(distance(perform(state,move).enemies[0],enemy),0);
  state.map.traps=[hazard(point,'bell-sigil')];
  assert.equal(distance(perform(state,move).enemies[0],enemy),1);
});

test('fatal traps use the existing rescue and preserve the town economy',()=>{
  const state=clearStage(floor(42));
  state.map.traps=[hazard({x:state.player.x+1,y:state.player.y},'steam-vent')];
  state.hp=1;
  state.plots[0]={building:'cottage',level:2};
  state.stocks.loom=17;
  state.dayTurns=59;
  const result=act(state,{type:'move',dx:1,dy:0});
  assert.equal(result.event,'defeat');
  assert.equal(result.trap.kind,'steam-vent');
  assert.equal(result.state.mode,'town');
  assert.equal(result.state.day,state.day+1);
  assert.equal(result.state.turn,state.turn+1);
  assert.deepEqual(result.state.plots,state.plots);
  assert.deepEqual(result.state.stocks,state.stocks);
  assert.deepEqual(result.state.inventory,[]);
});

test('legacy maps remain trap-free and malformed trap data is rejected',()=>{
  const state=floor(19,3);
  const old=copy(state);
  delete old.map.traps;
  assert.deepEqual(validateSave(old),old);
  for(const adjust of [
    value=>value.map.traps.push({...value.map.traps[0]}),
    value=>Object.assign(value.map.traps[0],findTile(value,2)),
    value=>{value.map.traps[0].kind='__proto__';},
    value=>{value.map.traps[0].spent=true;},
    value=>{value.map.traps[0].discovered='yes';},
    value=>{value.map.traps=null;}
  ]){
    const sample=copy(state);
    adjust(sample);
    assert.throws(()=>validateSave(sample));
  }
});

test('a sealed box can be brought back, sold unopened, or appraised once for actual stock',()=>{
  const depth=1;
  for(let seed=1;seed<=70;seed++){
    const state=floor(seed,depth);
    assert.ok(state.loot.some(item=>item.id==='sealed-cache'&&distance(item,state.player)<=2));
  }
  let state=floor(31,depth);
  state.enemies=[];
  const box=state.loot.find(item=>item.id==='sealed-cache');
  assert.equal(distance(box,state.player),1);
  state=perform(state,{type:'move',dx:box.x-state.player.x,dy:box.y-state.player.y});
  assert.equal(act(state,{type:'appraise'}).ok,false);
  state.player=findTile(state,3);
  state=perform(state,{type:'return'});
  assert.equal(quantity(state,'sealed-cache'),1);
  const sale=perform(state,{type:'sell',id:'sealed-cache'});
  assert.equal(sale.gold-state.gold,ITEMS.find(item=>item.id==='sealed-cache').sell);
  assert.equal(quantity(sale,'sealed-cache'),0);
  const appraised=act(state,{type:'appraise'});
  assert.equal(appraised.event,'appraisal');
  assert.equal(state.gold-appraised.state.gold,APPRAISAL_COST);
  assert.equal(appraised.state.turn,state.turn);
  assert.equal(quantity(appraised.state,'sealed-cache'),0);
  assert.equal(['ore','amber','tideglass'].reduce((sum,id)=>sum+quantity(appraised.state,id)-quantity(state,id),0),1);
  assert.deepEqual(perform(validateSave(copy(state)),{type:'appraise'}),appraised.state);
  assert.equal(act(appraised.state,{type:'appraise'}).ok,false);
  assert.deepEqual(validateSave(copy(appraised.state)),appraised.state);
  for(const change of [
    value=>{value.gold=APPRAISAL_COST-1;},
    value=>{value.inventory.push(...['ore','amber','tideglass'].map(id=>({id,qty:999})));},
  ]){
    const candidate=copy(state);
    change(candidate);
    const result=act(candidate,{type:'appraise'});
    assert.equal(result.ok,false);
    assert.strictEqual(result.state,candidate);
  }
  assert.equal(act(state,{type:'appraise',qty:2}).ok,false);
});
