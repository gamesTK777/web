import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,applyAction,serializeGame,deserializeGame} from './engine.mjs';
import {createCombatReport,getCombatFrame,COMBAT_DURATIONS} from './combat-model.mjs';

function battle({attackerType='tank',defenderType='tank',attackerHp=10,defenderHp=10,team=0,distance=1}={}){
  const before=createGame({missionId:5});before.turn=team;before.idSeq=3;
  before.tiles.forEach(tile=>Object.assign(tile,{terrain:'plain',building:null,owner:null,capture:20,capturingTeam:null,capturingUnitId:null}));
  before.units=[{id:'u1',type:attackerType,team,x:3,y:4,hp:attackerHp,moved:false,acted:false},{id:'u2',type:defenderType,team:1-team,x:3+distance,y:4,hp:defenderHp,moved:false,acted:false}];
  const result=applyAction(before,{type:'attack',unitId:'u1',targetId:'u2'});assert.equal(result.ok,true,result.error);
  return {before,after:result.state,event:result.event,report:createCombatReport(before,result.state,result.event)};
}
function freezeTree(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);Object.values(value).forEach(freezeTree);}return value;}
function finiteTree(value){if(typeof value==='number')assert.ok(Number.isFinite(value));else if(value&&typeof value==='object')Object.values(value).forEach(finiteTree);}
function boundaries(report,reducedMotion=false){const durations=reducedMotion?COMBAT_DURATIONS.reduced:COMBAT_DURATIONS.normal;const stages=report.hasCounter?['intro','attack','damage','counter','counterDamage','result']:['intro','attack','damage','result'];let start=0;return stages.map(stage=>{const item={stage,start,duration:durations[stage],end:start+durations[stage]};start=item.end;return item;});}

test('a report keeps removed participants, map context, victory and restored-after consistency without state writes',()=>{
  const sample=battle({attackerType:'heavy',defenderType:'infantry',defenderHp:2});const beforeJson=JSON.stringify(sample.before),afterJson=JSON.stringify(sample.after),eventJson=JSON.stringify(sample.event);
  Object.assign(sample.before.tiles[4*sample.before.width+3],{terrain:'forest',building:'city',owner:0});
  const frozenBefore=freezeTree(sample.before),frozenAfter=freezeTree(sample.after),frozenEvent=freezeTree(sample.event),report=createCombatReport(frozenBefore,frozenAfter,frozenEvent);
  assert.equal(report.attacker.terrain,'forest');assert.equal(report.attacker.building,'city');assert.equal(report.defender.hpBefore,2);assert.equal(report.defender.hpAfter,0);assert.equal(report.defender.type,'infantry');assert.equal(report.defender.destroyed,true);assert.deepEqual(report.destroyedIds,['u2']);assert.equal(report.winner,sample.after.winner);
  assert.deepEqual(createCombatReport(sample.before,deserializeGame(serializeGame(sample.after)),sample.event),report);
  assert.equal(JSON.stringify(sample.after),afterJson);assert.equal(JSON.stringify(sample.event),eventJson);
  // The sole intentional fixture edit was the before tile; the function retained
  // no live unit references and did not change any other before-state value.
  const original=JSON.parse(beforeJson);Object.assign(original.tiles[4*original.width+3],{terrain:'forest',building:'city',owner:0});assert.equal(JSON.stringify(sample.before),JSON.stringify(original));
  assert.deepEqual(JSON.parse(JSON.stringify(report)),report);finiteTree(report);
});

test('the first attack reduces the defender before surviving defenders counterattack',()=>{
  const {report}=battle(),segments=boundaries(report);assert.ok(report.hasCounter);assert.equal(getCombatFrame(report,0).attackerCount,10);assert.equal(getCombatFrame(report,0).defenderCount,10);
  for(const segment of segments){const frame=getCombatFrame(report,segment.start);assert.equal(frame.stage,segment.stage);assert.equal(frame.phaseProgress,0);finiteTree(frame);}
  const damage=segments.find(s=>s.stage==='damage'),counter=segments.find(s=>s.stage==='counter'),counterDamage=segments.find(s=>s.stage==='counterDamage');
  assert.equal(getCombatFrame(report,damage.start).defenderCount,report.defender.hpBefore);
  for(let lost=1;lost<=report.damage;lost++){const frame=getCombatFrame(report,damage.start+lost*damage.duration/report.damage+1e-7);assert.equal(frame.defenderCount,report.defender.hpBefore-lost);assert.equal(frame.attackerCount,report.attacker.hpBefore);assert.equal(frame.damageCount,lost);assert.equal(frame.casualties.defender.latestIndex,report.defender.hpBefore-lost);}
  const counterFrame=getCombatFrame(report,counter.start+counter.duration/2);assert.equal(counterFrame.defenderCount,report.defender.hpAfter);assert.equal(counterFrame.actingCount,report.defender.hpAfter);assert.equal(counterFrame.attackerCount,report.attacker.hpBefore);assert.equal(counterFrame.isCounter,true);assert.equal(counterFrame.shootingRole,'defender');
  for(let lost=1;lost<=report.counter;lost++){const frame=getCombatFrame(report,counterDamage.start+lost*counterDamage.duration/report.counter+1e-7);assert.equal(frame.attackerCount,report.attacker.hpBefore-lost);assert.equal(frame.defenderCount,report.defender.hpAfter);assert.equal(frame.counterDamageCount,lost);}
  const total=getCombatFrame(report,0).totalDuration,finished=getCombatFrame(report,total);assert.equal(total,4300);assert.equal(finished.stage,'result');assert.equal(finished.phaseProgress,1);assert.equal(finished.finished,true);assert.equal(finished.attackerCount,report.attacker.hpAfter);assert.equal(finished.defenderCount,report.defender.hpAfter);
});

test('indirect fire and zero counter damage omit every counter stage',()=>{
  const {report}=battle({attackerType:'artillery',distance:3});assert.equal(report.indirect,true);assert.equal(report.counter,0);assert.equal(report.hasCounter,false);assert.ok(report.defender.hpAfter>0);
  const total=getCombatFrame(report,0).totalDuration,seen=[];for(let time=0;time<=total;time+=25){const frame=getCombatFrame(report,time);if(seen.at(-1)!==frame.stage)seen.push(frame.stage);assert.equal(frame.isCounter,false);assert.equal(frame.attackerCount,report.attacker.hpBefore);}
  assert.equal(total,2700);assert.deepEqual(seen,['intro','attack','damage','result']);assert.equal(getCombatFrame(report,total).defenderCount,report.defender.hpAfter);
});

test('either side may be destroyed and final formation counts exactly match engine HP including zero',()=>{
  for(const options of [{attackerType:'heavy',defenderType:'infantry',defenderHp:1},{attackerType:'infantry',attackerHp:1,defenderType:'heavy'}]){
    const {before,after,event,report}=battle(options),start=getCombatFrame(report,0),end=getCombatFrame(report,100000);
    assert.equal(start.attackerCount,before.units.find(u=>u.id===event.unitId).hp);assert.equal(start.defenderCount,before.units.find(u=>u.id===event.targetId).hp);
    assert.equal(end.attackerCount,after.units.find(u=>u.id===event.unitId)?.hp||0);assert.equal(end.defenderCount,after.units.find(u=>u.id===event.targetId)?.hp||0);assert.equal(end.attackerHp,end.attackerCount);assert.equal(end.defenderHp,end.defenderCount);assert.ok(end.attackerCount===0||end.defenderCount===0);assert.equal(end.finished,true);
    assert.ok(report.destroyedIds.includes(end.attackerCount===0?event.unitId:event.targetId));
  }
});

test('CPU-initiated attacks use role ordering while physical left/right always follows team',()=>{
  const {report}=battle({team:1}),attack=getCombatFrame(report,600),counterStart=boundaries(report).find(s=>s.stage==='counter').start,counter=getCombatFrame(report,counterStart+20);
  assert.equal(attack.shootingRole,'attacker');assert.equal(attack.shootingTeam,1);assert.equal(attack.shootingSide,'right');assert.equal(attack.targetSide,'left');
  assert.equal(counter.shootingRole,'defender');assert.equal(counter.shootingTeam,0);assert.equal(counter.shootingSide,'left');assert.equal(counter.targetSide,'right');assert.equal(counter.defenderCount,report.defender.hpAfter);
});

test('reduced motion shortens both timelines without altering casualty order or final results',()=>{
  for(const sample of [battle(),battle({attackerType:'artillery',distance:3})]){
    const {report}=sample,original=JSON.stringify(report);freezeTree(report);const full=getCombatFrame(report,Infinity),reduced=getCombatFrame(report,Infinity,{reducedMotion:true});
    assert.ok(reduced.totalDuration<full.totalDuration);assert.equal(reduced.totalDuration,report.hasCounter?1100:750);assert.equal(reduced.attackerCount,full.attackerCount);assert.equal(reduced.defenderCount,full.defenderCount);
    const segments=boundaries(report,true);for(const segment of segments){const frame=getCombatFrame(report,segment.start,{reducedMotion:true});assert.equal(frame.stage,segment.stage);assert.equal(frame.reducedMotion,true);finiteTree(frame);}
    assert.equal(JSON.stringify(report),original);
  }
});

test('invalid inputs and elapsed boundaries never return NaN, negative actors or a phantom counter',()=>{
  const {before,after,event,report}=battle();for(const args of [[null,after,event],[before,null,event],[before,after,{type:'move'}],[before,after,{...event,targetId:event.unitId}],[{...before,units:[]},after,event]])assert.equal(createCombatReport(...args),null);
  const broken=structuredClone(before);broken.units[0].hp=NaN;assert.equal(createCombatReport(broken,after,event),null);
  const healed=structuredClone(after);healed.units[0].hp=11;assert.equal(createCombatReport(before,healed,event),null);
  assert.equal(createCombatReport(before,after,{...event,damage:NaN,counter:Infinity}).damage,report.damage);
  for(const invalid of [null,{},7,{attacker:{hpBefore:NaN},defender:{hpBefore:10}}]){const frame=getCombatFrame(invalid,NaN,null);assert.equal(frame.valid,false);assert.equal(frame.finished,true);finiteTree(frame);}
  for(const time of [-10,-Infinity,NaN,undefined,null,'300',0,500,1400,2100,3000,3700,4300,Infinity,Number.MAX_VALUE]){const frame=getCombatFrame(report,time,null);finiteTree(frame);assert.ok(Number.isInteger(frame.attackerCount)&&frame.attackerCount>=0&&frame.attackerCount<=10);assert.ok(Number.isInteger(frame.defenderCount)&&frame.defenderCount>=0&&frame.defenderCount<=10);assert.ok(frame.phaseProgress>=0&&frame.phaseProgress<=1);}
  assert.equal(getCombatFrame(report,-100).stage,'intro');assert.equal(getCombatFrame(report,Infinity).finished,true);assert.equal(getCombatFrame(report,NaN).elapsed,0);
});

test('a defensive display fixture with both units absent ends at zero without dead defenders firing',()=>{
  const {before,event}=battle(),after={units:[],winner:0,victoryReason:'敵本部を占領'},report=createCombatReport(before,after,event);
  assert.equal(report.hasCounter,false);assert.equal(report.simultaneousLoss,true);assert.deepEqual(report.destroyedIds,['u1','u2']);assert.equal(report.victoryReason,'敵本部を占領');
  const middle=getCombatFrame(report,1750),end=getCombatFrame(report,Infinity);assert.equal(middle.attackerCount,middle.defenderCount);assert.deepEqual(middle.casualtyRoles,['defender','attacker']);assert.equal(end.attackerCount,0);assert.equal(end.defenderCount,0);assert.equal(end.finished,true);assert.equal(end.hasCounter,false);finiteTree(end);
});
