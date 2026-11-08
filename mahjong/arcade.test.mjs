import test from 'node:test';import assert from 'node:assert/strict';
import {createArcade,finishBattle,advanceArcade,retryStage} from './arcade.mjs';
const win={winner:0,points:2000,han:1};
const copy=value=>JSON.parse(JSON.stringify(value));
function playStage(results,initial=createArcade()){
 let s=initial;
 for(const [i,result]of results.entries()){s=finishBattle(s,result);if(i<2){assert.equal(s.phase,'battle-result');s=advanceArcade(s);}}
 return s;
}

test('three battles decide each stage by held-point totals and seven stages lead to complete',()=>{
 let s=createArcade();for(let stage=1;stage<=7;stage++){
  assert.deepEqual(s.stageTotals,[0,0]);
  for(let battle=1;battle<=3;battle++){
   assert.equal(s.stage,stage);assert.equal(s.battle,battle);const before=JSON.stringify(s);const next=finishBattle(s,win);assert.equal(JSON.stringify(s),before);s=next;
   assert.deepEqual(s.stageTotals,[27000*battle,23000*battle]);assert.deepEqual(s.results.at(-1).finalPoints,[27000,23000]);
   if(battle<3)s=advanceArcade(s);
  }
  assert.equal(s.completedStages,stage);assert.equal(s.phase,stage===7?'complete':'stage-clear');if(stage<7)s=advanceArcade(s);
 }
 assert.equal(s.totalWins,21);assert.equal(s.totalBattles,21);assert.throws(()=>advanceArcade(s));assert.throws(()=>finishBattle(s,win));
});

test('one large win and two small losses clear a stage while retaining each victory count',()=>{
 const results=[{winner:1,points:1000},{winner:0,points:16000},{winner:1,points:1000}];
 const s=playStage(results);assert.equal(s.phase,'stage-clear');assert.equal(s.wins,1);assert.equal(s.totalWins,1);assert.deepEqual(s.stageTotals,[89000,61000]);
 assert.deepEqual(s.results.map(r=>r.won),[false,true,false]);assert.equal(s.completedStages,1);assert.equal(s.lastClearBonus,2000);
});

test('two small wins and one large loss do not clear merely because a majority won',()=>{
 const s=playStage([win,win,{winner:1,points:8000}]);
 assert.equal(s.phase,'stage-failed');assert.equal(s.wins,2);assert.equal(s.completedStages,0);assert.deepEqual(s.stageTotals,[71000,79000]);assert.equal(s.lastClearBonus,0);
 assert.throws(()=>advanceArcade(s));
});

test('draws still count as one of the three battles and tied stage totals require a retry',()=>{
 for(const results of [[{winner:0,points:4000},{winner:1,points:4000},{winner:null}],Array.from({length:3},()=>({winner:null}))]){
  const s=playStage(results);assert.equal(s.phase,'stage-failed');assert.deepEqual(s.stageTotals,[75000,75000]);assert.equal(s.results.length,3);assert.equal(s.totalBattles,3);
 }
 const s=playStage([{winner:1,points:1000},{winner:null},win]);assert.equal(s.phase,'stage-clear');assert.equal(s.wins,1);assert.deepEqual(s.stageTotals,[76000,74000]);
});

test('supplied final points are authoritative for riichi deductions and do not award extra ranking points',()=>{
 let s=createArcade();const original=copy(s),points=[24000,25000];
 s=finishBattle(s,{winner:null,points:0,finalPoints:points});assert.deepEqual(s.stageTotals,[24000,25000]);assert.equal(s.score,0);assert.equal(s.lastAward,0);assert.deepEqual(original,createArcade());
 points[0]=999999;assert.deepEqual(s.results[0].finalPoints,[24000,25000]);
 s=advanceArcade(s);s=finishBattle(s,{winner:0,points:1000,finalPoints:[26000,24000]});assert.deepEqual(s.stageTotals,[50000,49000]);assert.equal(s.score,1500);
 s=advanceArcade(s);s=finishBattle(s,{winner:null,finalPoints:[25000,25000]});assert.equal(s.phase,'stage-clear');assert.deepEqual(s.stageTotals,[75000,74000]);assert.equal(s.score,3500);
});

test('negative held points are accumulated exactly and malformed explicit totals are rejected immutably',()=>{
 const s=createArcade(),before=copy(s);
 const result=finishBattle(s,{winner:1,points:500000,finalPoints:[-475000,525000]});assert.deepEqual(result.stageTotals,[-475000,525000]);assert.deepEqual(s,before);
 for(const finalPoints of [null,undefined,[],[25000],[25000,25000,0],['25000',25000],[NaN,25000],[Infinity,25000],[25000.5,25000],[-500001,25000],[1000001,25000]]){
  assert.throws(()=>finishBattle(s,{winner:0,points:1000,finalPoints}));assert.deepEqual(s,before);
 }
});

test('duplicate finalization is blocked and ranking awards remain capped independently of stage totals',()=>{
 let s=createArcade();s.score=9999990;
 s=finishBattle(s,{winner:0,points:500000});assert.equal(s.score,9999999);const before=copy(s);assert.throws(()=>finishBattle(s,win));assert.deepEqual(s,before);
 assert.deepEqual(s.stageTotals,[525000,-475000]);
});

test('retry removes failed-stage earnings and clears totals so deliberate losses cannot farm score',()=>{
 let s=playStage([win,win,win]);s=advanceArcade(s);const bank=s.score;
 for(let attempt=1;attempt<=3;attempt++){
  s=playStage([win,win,{winner:1,points:20000}],s);const before=copy(s);s=retryStage(s);assert.ok(s.score<=bank-attempt*1000);assert.equal(s.stage,2);assert.equal(s.battle,1);assert.equal(s.wins,0);assert.equal(before.phase,'stage-failed');assert.deepEqual(s.stageTotals,[0,0]);assert.deepEqual(s.results,[]);
 }
});
