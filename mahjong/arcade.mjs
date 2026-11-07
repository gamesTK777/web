// The arcade campaign exists only in memory. Image configuration and shared
// rankings are independent of a player's unsaved run.
const clone=value=>JSON.parse(JSON.stringify(value));
export function createArcade(){return{stage:1,battle:1,wins:0,results:[],completedStages:0,totalBattles:0,totalWins:0,score:0,stageBaseScore:0,retries:0,phase:'playing',lastAward:0,lastClearBonus:0};}
export function finishBattle(source,result){
  if(source.phase!=='playing')throw Error('この対戦の結果はすでに確定しています。');
  if(!result||![0,1,null].includes(result.winner))throw Error('対戦結果を確認できません。');
  const s=clone(source),won=result.winner===0;
  s.totalBattles++;s.totalWins+=Number(won);s.wins+=Number(won);
  const handPoints=Number.isFinite(result.points)?Math.min(500000,Math.max(0,Math.round(result.points))):0;
  s.lastAward=won?Math.max(1000,handPoints)+s.stage*500:0;s.lastClearBonus=0;
  s.score=Math.min(9999999,s.score+s.lastAward);
  s.results.push({won,draw:result.winner===null,points:handPoints,han:result.han||0,award:s.lastAward});
  if(s.battle<3)s.phase='battle-result';
  else if(s.wins===3){
    s.completedStages=s.stage;s.lastClearBonus=s.stage*2000+(s.stage===7?30000:0);
    s.score=Math.min(9999999,s.score+s.lastClearBonus);s.phase=s.stage===7?'complete':'stage-clear';
  }else s.phase='stage-failed';
  return s;
}
export function advanceArcade(source){
  const s=clone(source);
  if(s.phase==='battle-result'){s.battle++;s.phase='playing';}
  else if(s.phase==='stage-clear'){s.stage++;s.battle=1;s.wins=0;s.results=[];s.phase='playing';s.stageBaseScore=s.score;}
  else throw Error('次の対戦へは進めません。');
  return s;
}
export function retryStage(source){
  if(source.phase!=='stage-failed')throw Error('再挑戦できる状態ではありません。');
  const s=clone(source);s.retries++;s.score=Math.max(0,s.stageBaseScore-s.stage*500);s.stageBaseScore=s.score;
  s.battle=1;s.wins=0;s.results=[];s.phase='playing';s.lastAward=0;s.lastClearBonus=0;return s;
}
