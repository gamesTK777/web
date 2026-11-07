import test from 'node:test';
import assert from 'node:assert/strict';
import {createRound,actRound,legalActions,analyzeHand} from './engine.mjs';
import {createArcade,finishBattle,advanceArcade,retryStage} from './arcade.mjs';

// Use complete, seeded games rather than fabricated win results. The player
// follows visible-tile hand efficiency, while the normal stage CPU runs intact.
function playRound(run,seed){
  let round=createRound({stage:run.stage,dealer:run.totalBattles%2,seed}),steps=0;
  while(round.phase!=='finished'&&steps++<200){
    const legal=legalActions(round);let action;
    if(legal.canTsumo)action={type:'tsumo'};
    else if(legal.canRon)action={type:'ron'};
    else if(legal.needsCpu)action={type:'cpu'};
    else{
      const info=analyzeHand(round.hands[0],{discards:round.discards,doraIndicator:round.doraIndicator});
      const index=round.riichi[0]?13:info.discardOptions[0].index;
      action={type:legal.riichiDiscards.includes(index)?'riichi':'discard',index};
    }
    const response=actRound(round,action);assert.equal(response.ok,true,response.message);round=response.state;
    // One explicit CPU callback completes exactly one CPU turn and returns
    // control to the player (or the result), as app.mjs's timer assumes.
    if(action.type==='cpu')assert.notEqual(round.phase,'cpu');
    if(round.phase==='human-discard')assert.equal(round.hands[0].length,14);
    if(round.phase==='human-ron')assert.equal(round.hands[0].length,13);
  }
  assert.equal(round.phase,'finished');assert.ok(steps<200);
  assert.deepEqual(legalActions(round).discardIndices,[]);
  return round.result;
}

test('21 actual human wins across alternating dealer rounds complete all seven stages',()=>{
  const winningSeeds=[[1,1,1],[1,1,1],[3,2,3],[2,1,2],[1,2,1],[2,3,2],[1,2,1]];
  let run=createArcade(),expectedScore=0;
  for(let stage=1;stage<=7;stage++){
    for(let battle=1;battle<=3;battle++){
      assert.equal(run.stage,stage);assert.equal(run.battle,battle);assert.equal(run.phase,'playing');
      const result=playRound(run,winningSeeds[stage-1][battle-1]);assert.equal(result.winner,0);
      expectedScore+=Math.max(1000,result.points)+stage*500;
      run=finishBattle(run,result);
      assert.equal(run.results.length,battle);assert.equal(run.wins,battle);
      if(battle<3){assert.equal(run.phase,'battle-result');run=advanceArcade(run);}
    }
    expectedScore+=stage*2000+(stage===7?30000:0);
    assert.equal(run.score,expectedScore);assert.equal(run.completedStages,stage);
    assert.equal(run.phase,stage===7?'complete':'stage-clear');
    if(stage<7)run=advanceArcade(run);
  }
  assert.equal(run.totalBattles,21);assert.equal(run.totalWins,21);
  assert.throws(()=>advanceArcade(run));assert.throws(()=>retryStage(run));
});

test('actual draws and CPU victories still permit all three battles but require a stage retry',()=>{
  for(const [seed,winner]of [[13,null],[49,1]]){
    let run=createArcade();const first=playRound(run,seed);assert.equal(first.winner,winner);
    run=finishBattle(run,first);assert.equal(run.phase,'battle-result');
    for(let battle=2;battle<=3;battle++){
      run=advanceArcade(run);assert.equal(run.battle,battle);
      const result=playRound(run,1);assert.equal(result.winner,0);run=finishBattle(run,result);
    }
    assert.equal(run.phase,'stage-failed');assert.equal(run.wins,2);assert.equal(run.completedStages,0);assert.ok(run.score>0);
    assert.throws(()=>advanceArcade(run));
    run=retryStage(run);
    assert.equal(run.phase,'playing');assert.equal(run.stage,1);assert.equal(run.battle,1);assert.equal(run.wins,0);
    assert.equal(run.score,0);assert.equal(run.retries,1);assert.equal(run.totalBattles,3);
  }
});
