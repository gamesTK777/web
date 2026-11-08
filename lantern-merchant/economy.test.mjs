import test from 'node:test';
import assert from 'node:assert/strict';
import {DAY_TURNS,DAY_WAIT_COST,BUILDINGS,landCost,rentTotal,landIncome,dividendTotal,dailyIncome,upgradeCost} from './economy.mjs';

const empty=()=>({plots:[{building:null,level:1}],stocks:{loom:0,guild:0,beacon:0}});

test('daily income uses the game calendar and starts at zero without purchased assets',()=>{
  assert.equal(DAY_TURNS,60);
  assert.equal(DAY_WAIT_COST,20);
  const state=empty();
  assert.deepEqual(dailyIncome(state),{rent:0,land:0,dividend:0,total:0});
  assert.equal(landCost(state),200);
});

test('building daily rents are reduced while construction and upgrade costs stay unchanged',()=>{
  const cottage=BUILDINGS.find(building=>building.id==='cottage'),workshop=BUILDINGS.find(building=>building.id==='workshop');
  assert.equal(cottage.cost,160);assert.equal(workshop.cost,340);
  assert.equal(cottage.rent,6);assert.equal(workshop.rent,12);
  for(let level=1;level<=3;level++){
    const state=empty();state.plots=[{building:'cottage',level},{building:'workshop',level}];
    assert.equal(rentTotal(state),18*level);
    assert(rentTotal(state)<(24+48)*level);
    assert.equal(upgradeCost(state,0),Math.round(160*.8*level));
    assert.equal(upgradeCost(state,1),Math.round(340*.8*level));
  }
  assert.equal(upgradeCost(empty(),0),0);assert.equal(upgradeCost(empty(),8),0);
});

test('only purchased empty plots receive land income, with no overlap with building rent',()=>{
  const state=empty();state.plots.push({building:null,level:1},{building:null,level:1});
  assert.equal(landIncome(state),2);assert.equal(landCost(state),360);
  state.plots[1]={building:'cottage',level:2};
  assert.deepEqual(dailyIncome(state),{rent:12,land:1,dividend:0,total:13});
  state.plots[0]={building:'workshop',level:1};
  assert.deepEqual(dailyIncome(state),{rent:24,land:1,dividend:0,total:25});
});

test('stock dividends require ten shares of the same company and use whole gold',()=>{
  const state=empty();
  for(const shares of [0,1,5,9,10,19,20,999]){
    state.stocks.loom=shares;assert.equal(dividendTotal(state),Math.floor(shares/10));
  }
  state.stocks={loom:9,guild:9,beacon:9};assert.equal(dividendTotal(state),0);
  state.stocks={loom:10,guild:25,beacon:39};assert.equal(dividendTotal(state),6);
  assert.deepEqual(dailyIncome(state),{rent:0,land:0,dividend:6,total:6});
});

test('income totals remain pure when called repeatedly on frozen assets',()=>{
  const state=Object.freeze({plots:Object.freeze([Object.freeze({building:'cottage',level:3}),Object.freeze({building:null,level:1}),Object.freeze({building:'workshop',level:2})]),stocks:Object.freeze({loom:25,guild:10,beacon:9})});
  const snapshot=JSON.stringify(state);
  for(let i=0;i<3;i++)assert.deepEqual(dailyIncome(state),{rent:42,land:1,dividend:3,total:46});
  assert.equal(JSON.stringify(state),snapshot);
});
