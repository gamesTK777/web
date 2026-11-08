import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,validateSave} from './engine.mjs';
import {DAY_TURNS,DAY_WAIT_COST,dailyIncome} from './economy.mjs';

const copy=value=>JSON.parse(JSON.stringify(value));
function perform(state,action){const result=act(state,action);assert.equal(result.ok,true,result.message);return result.state;}
function assets(){
  const state=newGame(331);state.gold=1000;
  state.plots=[{building:'cottage',level:2},{building:null,level:1},{building:'workshop',level:1}];
  state.stocks={loom:10,guild:25,beacon:9};
  return state;
}
function enter(state){const result=perform(state,{type:'enter'});result.enemies=[];delete result.map.swarm;return result;}

test('sixty exploration actions pay every income source while the explorer is still underground',()=>{
  let state=enter(assets());const before=copy(state),income=dailyIncome(state);
  for(let turn=1;turn<DAY_TURNS;turn++)state=perform(state,{type:'wait'});
  assert.equal(state.day,before.day);assert.equal(state.dayTurns,59);assert.equal(state.gold,before.gold);
  state=perform(state,{type:'wait'});
  assert.equal(state.mode,'dungeon');assert.equal(state.day,before.day+1);assert.equal(state.dayTurns,0);
  assert.equal(state.gold,before.gold+income.total);assert.equal(state.stats.earned,before.stats.earned+income.total);
  for(const ticker of Object.keys(state.priceHistory))assert.equal(state.priceHistory[ticker].length,before.priceHistory[ticker].length+1);
  for(let turn=0;turn<DAY_TURNS;turn++)state=perform(state,{type:'wait'});
  assert.equal(state.day,before.day+2);assert.equal(state.gold,before.gold+2*income.total);
});

test('partial game days survive short returns and consecutive expeditions without extra return income',()=>{
  let state=enter(assets());const day=state.day,gold=state.gold,income=dailyIncome(state).total;
  for(let turn=0;turn<25;turn++)state=perform(state,{type:'wait'});
  state=perform(state,{type:'return'});
  assert.equal(state.day,day);assert.equal(state.dayTurns,25);assert.equal(state.gold,gold);
  state=enter(state);
  for(let turn=0;turn<35;turn++)state=perform(state,{type:'wait'});
  assert.equal(state.day,day+1);assert.equal(state.dayTurns,0);assert.equal(state.gold,gold+income);
  state=perform(state,{type:'return'});
  assert.equal(state.day,day+1);assert.equal(state.gold,gold+income);
});

test('descending stairs counts once toward the next day and pays once at its boundary',()=>{
  let state=enter(assets());state.dayTurns=DAY_TURNS-1;
  const y=state.map.tiles.findIndex(row=>row.includes(2));state.player={x:state.map.tiles[y].indexOf(2),y};
  const before=copy(state),income=dailyIncome(state).total;
  state=perform(state,{type:'stairs'});
  assert.equal(state.floor,2);assert.equal(state.day,before.day+1);assert.equal(state.dayTurns,0);
  assert.equal(state.turn,before.turn+1);assert.equal(state.runTurns,before.runTurns+1);assert.equal(state.gold,before.gold+income);
  assert.deepEqual(validateSave(copy(state)),state);
});

test('a fatal action at a day boundary pays retained assets once and does not advance again on rescue',()=>{
  let state=enter(assets());state.dayTurns=59;state.hp=1;state.hunger=0;state.runGold=31;
  const before=copy(state),income=dailyIncome(state).total;
  const result=act(state,{type:'wait'});assert.equal(result.ok,true);assert.equal(result.event,'defeat');state=result.state;
  assert.equal(state.mode,'town');assert.equal(state.day,before.day+1);assert.equal(state.dayTurns,0);
  assert.equal(state.gold,before.gold+income+Math.floor(31/2));
  assert.deepEqual(state.plots,before.plots);assert.deepEqual(state.stocks,before.stocks);
  assert.equal(state.priceHistory.loom.length,before.priceHistory.loom.length+1);
  assert.deepEqual(validateSave(copy(state)),state);
});

test('spending a town day charges living costs, pays daily assets, and does not heal or take exploration turns',()=>{
  const original=assets();original.dayTurns=27;original.hp=3;original.hunger=41;
  const before=copy(original),income=dailyIncome(original).total;
  const result=act(original,{type:'nextDay'});assert.equal(result.ok,true);assert.equal(result.event,'day');
  const state=result.state;assert.deepEqual(original,before);
  assert.equal(state.day,before.day+1);assert.equal(state.dayTurns,0);assert.equal(state.gold,before.gold-DAY_WAIT_COST+income);
  assert.equal(state.hp,before.hp);assert.equal(state.hunger,before.hunger);assert.equal(state.turn,before.turn);assert.equal(state.runTurns,before.runTurns);
  assert.deepEqual(validateSave(copy(state)),state);
});

test('a town day cannot be bought without its up-front cost or from inside the dungeon',()=>{
  for(const state of [Object.assign(assets(),{gold:DAY_WAIT_COST-1}),enter(assets())]){
    const before=copy(state),result=act(state,{type:'nextDay'});
    assert.equal(result.ok,false);assert.strictEqual(result.state,state);assert.deepEqual(state,before);
  }
});

test('legacy clock values default to zero and malformed explicit progress is rejected',()=>{
  for(const original of [assets(),enter(assets())]){
    const legacy=copy(original);delete legacy.dayTurns;
    assert.equal(validateSave(legacy).dayTurns,0);
    for(const value of [-1,60,61,0.5,null,undefined,'59',true,Infinity,NaN]){
      const bad=copy(original);bad.dayTurns=value;assert.throws(()=>validateSave(bad));
    }
    for(const value of [0,29,59]){
      const valid=copy(original);valid.dayTurns=value;assert.equal(validateSave(valid).dayTurns,value);
    }
  }
});

test('save reloads preserve a partial day and never award income because real time changed',()=>{
  let state=enter(assets());state.dayTurns=59;const before=copy(state),realNow=Date.now;
  try{
    Date.now=()=>realNow()+365*24*60*60*1000;
    for(let load=0;load<4;load++)state=validateSave(JSON.stringify(state));
    assert.deepEqual(state,before);
    const after=perform(state,{type:'wait'});
    assert.equal(after.day,before.day+1);assert.equal(after.gold,before.gold+dailyIncome(before).total);
    assert.deepEqual(validateSave(JSON.stringify(after)),after);
  }finally{Date.now=realNow;}
});
