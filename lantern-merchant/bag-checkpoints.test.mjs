import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,validateSave,BAG_UPGRADES,bagCapacity,RETURN_FLOORS,MAX_FLOOR} from './engine.mjs';

const copy=value=>JSON.parse(JSON.stringify(value));
const quantity=(state,id,key='inventory')=>state[key].find(item=>item.id===id)?.qty??0;
function perform(state,action){const result=act(state,action);assert.equal(result.ok,true,result.message);return result.state;}
function findTile(state,tile){for(let y=0;y<state.map.height;y++){const x=state.map.tiles[y].indexOf(tile);if(x!==-1)return{x,y};}return null;}
function floorState(floor,seed=73){let state=perform(newGame(seed),{type:'enter'});while(state.floor<floor){state.player=findTile(state,2);state=perform(state,{type:'stairs'});}return state;}

test('three sequential shop upgrades charge once and expand the exploration bag to 40/50/60',()=>{
  let state=newGame(1);state.gold=2000;
  assert.equal(bagCapacity(state),30);
  for(const [i,upgrade]of BAG_UPGRADES.entries()){
    const before=copy(state),gold=state.gold;
    state=perform(state,{type:'buyBag',id:upgrade.id});
    assert.equal(state.bagTier,i+1);assert.equal(bagCapacity(state),upgrade.capacity);
    assert.equal(state.gold,gold-upgrade.cost);assert.deepEqual(before.inventory,state.inventory);
    assert.deepEqual(validateSave(copy(state)),state);
    const repeated=act(state,{type:'buyBag',id:upgrade.id});
    assert.equal(repeated.ok,false);assert.strictEqual(repeated.state,state);
  }
  assert.equal(state.gold,300);
  const maxed=act(state,{type:'buyBag',id:BAG_UPGRADES.at(-1).id});assert.equal(maxed.ok,false);assert.strictEqual(maxed.state,state);
});

test('shop rejects unaffordable, skipped, forged, bulk and dungeon bag purchases without mutation',()=>{
  const state=newGame(5),before=copy(state);
  for(const action of [{type:'buyBag',id:'satchel'},{type:'buyBag',id:'rucksack'},{type:'buyBag',id:'caravan'},{type:'buyBag',id:'__proto__'},{type:'buyBag'},{type:'buyBag',id:'satchel',qty:2}]){
    const result=act(state,action);assert.equal(result.ok,false);assert.strictEqual(result.state,state);assert.deepEqual(state,before);
  }
  let dungeon=perform(state,{type:'enter'});dungeon.gold=2000;
  const result=act(dungeon,{type:'buyBag',id:'satchel'});assert.equal(result.ok,false);assert.strictEqual(result.state,dungeon);
});

test('pickup respects every expanded capacity and leaves overflow treasure on the floor',()=>{
  for(let tier=0;tier<=BAG_UPGRADES.length;tier++){
    let state=newGame(31);state.bagTier=tier;state=perform(state,{type:'enter'});state.enemies=[];
    const destination={x:state.player.x+1,y:state.player.y};assert.equal(state.map.tiles[destination.y][destination.x],1);
    state.runLoot=[{id:'ore',qty:bagCapacity(state)-1}];state.loot=[{id:'herb',...destination},{id:'amber',...destination}];
    const before=copy(state);state=perform(state,{type:'move',dx:1,dy:0});
    assert.equal(state.runLoot.reduce((sum,item)=>sum+item.qty,0),bagCapacity(state));
    assert.equal(quantity(state,'herb','runLoot'),1);assert.deepEqual(state.loot,[{id:'amber',...destination}]);
    assert(state.log.some(message=>message.includes(`いっぱい（${bagCapacity(state)}個）`)));
    assert.equal(before.loot.length,2);
    state=perform(state,{type:'move',dx:-1,dy:0});state=perform(state,{type:'move',dx:1,dy:0});
    assert.equal(state.runLoot.reduce((sum,item)=>sum+item.qty,0),bagCapacity(state));assert.equal(state.loot.length,1);
  }
});

test('permanent bag improvements survive defeat while all ordinary items are lost',()=>{
  let state=newGame(39);state.gold=2000;
  for(const upgrade of BAG_UPGRADES)state=perform(state,{type:'buyBag',id:upgrade.id});
  state=perform(state,{type:'enter'});state.hp=1;state.hunger=0;state.runLoot=[{id:'ore',qty:4}];
  const result=act(state,{type:'wait'});assert.equal(result.ok,true);assert.equal(result.event,'defeat');
  assert.equal(result.state.mode,'town');assert.equal(result.state.bagTier,3);assert.equal(bagCapacity(result.state),60);
  assert.deepEqual(result.state.inventory,[]);assert.deepEqual(result.state.runLoot,[]);assert.equal(result.state.weaponId,'unarmed');
  assert.equal(validateSave(copy(result.state)).bagTier,3);
});

test('legacy saves without a bag tier load at 30; explicit invalid tiers are rejected',()=>{
  for(const original of [newGame(3),floorState(3)]){
    const legacy=copy(original);delete legacy.bagTier;const restored=validateSave(legacy);
    assert.equal(restored.bagTier,0);assert.equal(bagCapacity(restored),30);
    for(const value of [-1,4,0.5,null,undefined,'1',true,Infinity,NaN]){
      const malformed=copy(original);malformed.bagTier=value;assert.throws(()=>validateSave(malformed));
    }
  }
});

test('milestone floors alone add one reachable exit beside onward stairs, with original entrances retained',()=>{
  assert.deepEqual(RETURN_FLOORS,[3,6,9]);
  for(let seed=1;seed<=20;seed++)for(let floor=1;floor<=MAX_FLOOR;floor++){
    const state=floorState(floor,seed),tiles=state.map.tiles.flat(),checkpoint=findTile(state,4),stairs=findTile(state,2);
    assert.equal(tiles.filter(tile=>tile===3).length,1);
    assert.equal(tiles.filter(tile=>tile===4).length,RETURN_FLOORS.includes(floor)?1:0);
    if(checkpoint)assert.equal(Math.abs(checkpoint.x-stairs.x)+Math.abs(checkpoint.y-stairs.y),1);
    assert.deepEqual(validateSave(copy(state)),state);
  }
});

test('milestone exits return loot to town without consuming a recall stone or taking another turn',()=>{
  for(const floor of RETURN_FLOORS){
    let state=floorState(floor);state.player=findTile(state,4);state.runLoot=[{id:'ore',qty:3}];state.runGold=77;
    const recall=quantity(state,'recall'),turn=state.turn,gold=state.gold;
    const result=act(state,{type:'return'});assert.equal(result.ok,true);assert.equal(result.event,'return');
    assert.equal(result.state.mode,'town');assert.equal(quantity(result.state,'recall'),recall);
    assert.equal(quantity(result.state,'ore'),3);assert.equal(result.state.turn,turn);assert.equal(result.state.gold,gold+77);
    state.inventory=[];assert.equal(perform(state,{type:'return'}).mode,'town');
  }
});

test('old milestone maps without an added exit remain valid; impossible or duplicate exits are rejected',()=>{
  for(const floor of RETURN_FLOORS){
    const state=floorState(floor),checkpoint=findTile(state,4);state.map.tiles[checkpoint.y][checkpoint.x]=1;
    assert.deepEqual(validateSave(copy(state)),state);
  }
  const wrongFloor=floorState(1);wrongFloor.map.tiles[wrongFloor.player.y][wrongFloor.player.x+1]=4;
  assert.throws(()=>validateSave(wrongFloor));
  const duplicate=floorState(3),room=duplicate.map.rooms[5];duplicate.map.tiles[room.cy][room.cx+1]=4;
  assert.throws(()=>validateSave(duplicate));
});
