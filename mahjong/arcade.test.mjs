import test from 'node:test';import assert from 'node:assert/strict';
import {createArcade,finishBattle,advanceArcade,retryStage} from './arcade.mjs';
const win={winner:0,points:2000,han:1};
test('a stage requires all three wins, and seven stages lead to complete',()=>{
 let s=createArcade();for(let stage=1;stage<=7;stage++){
  for(let battle=1;battle<=3;battle++){
   assert.equal(s.stage,stage);assert.equal(s.battle,battle);const before=JSON.stringify(s);const next=finishBattle(s,win);assert.equal(JSON.stringify(s),before);s=next;
   if(battle<3)s=advanceArcade(s);
  }
  assert.equal(s.completedStages,stage);assert.equal(s.phase,stage===7?'complete':'stage-clear');if(stage<7)s=advanceArcade(s);
 }
 assert.equal(s.totalWins,21);assert.equal(s.totalBattles,21);assert.throws(()=>advanceArcade(s));assert.throws(()=>finishBattle(s,win));
});
test('losses and draws still allow all three battles but cannot clear the stage',()=>{
 for(const winner of [1,null]){let s=finishBattle(createArcade(),{winner});assert.equal(s.phase,'battle-result');s=advanceArcade(s);s=advanceArcade(finishBattle(s,win));s=finishBattle(s,win);assert.equal(s.phase,'stage-failed');assert.equal(s.completedStages,0);assert.equal(s.wins,2);}
});
test('retry removes failed-stage earnings so deliberate losses cannot farm score',()=>{
 let s=createArcade();for(let i=0;i<3;i++){s=finishBattle(s,win);if(i<2)s=advanceArcade(s);}s=advanceArcade(s);const bank=s.score;
 for(let attempt=1;attempt<=3;attempt++){
  s=advanceArcade(finishBattle(s,win));s=advanceArcade(finishBattle(s,win));s=finishBattle(s,{winner:1});const before=JSON.stringify(s);s=retryStage(s);assert.ok(s.score<=bank-attempt*1000);assert.equal(s.stage,2);assert.equal(s.battle,1);assert.equal(s.wins,0);assert.equal(JSON.parse(before).phase,'stage-failed');
 }
});
