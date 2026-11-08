/** View-only combat snapshots. HP is the number of actors in a formation.
 * This module never rolls damage, changes an engine state or touches storage.
 * createCombatReport returns null for missing/invalid participants.
 * getCombatFrame always returns finite, serializable display data.
 */
import {UNIT_TYPES,TERRAIN,BUILDINGS} from './engine.mjs';

export const COMBAT_DURATIONS=Object.freeze({
  normal:Object.freeze({intro:500,attack:900,damage:700,counter:900,counterDamage:700,result:600}),
  reduced:Object.freeze({intro:150,attack:200,damage:150,counter:200,counterDamage:150,result:250})
});
export const COMBAT_STAGES=Object.freeze(['intro','attack','damage','counter','counterDamage','result']);
const stageLabels={intro:'交戦開始',attack:'攻撃',damage:'損害確認',counter:'反撃',counterDamage:'損害確認',result:'戦闘結果'};
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const integerHp=(value,zero=false)=>Number.isInteger(value)&&value>=(zero?0:1)&&value<=10;
const hasType=type=>typeof type==='string'&&Object.hasOwn(UNIT_TYPES,type);
function validBeforeUnit(unit){return !!unit&&typeof unit.id==='string'&&unit.id.length>0&&unit.id.length<=80&&hasType(unit.type)&&[0,1].includes(unit.team)&&integerHp(unit.hp)&&Number.isInteger(unit.x)&&Number.isInteger(unit.y)&&unit.x>=0&&unit.y>=0&&unit.x<100000&&unit.y<100000;}
function validParticipant(unit){return !!unit&&typeof unit.id==='string'&&unit.id.length>0&&hasType(unit.type)&&[0,1].includes(unit.team)&&integerHp(unit.hpBefore)&&integerHp(unit.hpAfter,true)&&unit.hpAfter<=unit.hpBefore;}
function terrainUnder(state,unit){
  const tile=Array.isArray(state.tiles)&&Number.isInteger(state.width)&&state.width>0?state.tiles[unit.y*state.width+unit.x]:null;
  return {terrain:tile&&Object.hasOwn(TERRAIN,tile.terrain)?tile.terrain:'plain',building:tile&&Object.hasOwn(BUILDINGS,tile.building)?tile.building:null};
}
function participant(before,after,original){
  const matches=after.units.filter(unit=>unit?.id===original.id);if(matches.length>1)return null;
  const next=matches[0];
  if(next&&(!integerHp(next.hp,true)||next.hp>original.hp||next.type!==original.type||next.team!==original.team))return null;
  const hpAfter=next?.hp??0;
  return {id:original.id,type:original.type,team:original.team,name:UNIT_TYPES[original.type].name,domain:UNIT_TYPES[original.type].domain,hpBefore:original.hp,hpAfter,x:original.x,y:original.y,...terrainUnder(before,original),destroyed:hpAfter===0};
}

/** The before/after snapshots are the authority; event damage is informational.
 * Defeated units have been removed by the engine, so retain their old identity
 * and explicitly record hpAfter=0. No references to either state are retained.
 */
export function createCombatReport(before,after,event){
  if(!before||!after||!Array.isArray(before.units)||!Array.isArray(after.units)||!event||event.type!=='attack'||typeof event.unitId!=='string'||typeof event.targetId!=='string'||event.unitId===event.targetId)return null;
  const attackMatches=before.units.filter(unit=>unit?.id===event.unitId),defendMatches=before.units.filter(unit=>unit?.id===event.targetId);
  if(attackMatches.length!==1||defendMatches.length!==1)return null;
  const originalAttacker=attackMatches[0],originalDefender=defendMatches[0];
  if(!validBeforeUnit(originalAttacker)||!validBeforeUnit(originalDefender)||originalAttacker.team===originalDefender.team)return null;
  const attacker=participant(before,after,originalAttacker),defender=participant(before,after,originalDefender);
  if(!attacker||!defender)return null;
  const damage=defender.hpBefore-defender.hpAfter,counter=attacker.hpBefore-attacker.hpAfter;
  // Engine combat cannot normally kill both sides at once. If a restored or
  // external display fixture does, show both losses during the damage stage
  // rather than inventing a counterattack by a formation with no survivors.
  const hasCounter=counter>0&&defender.hpAfter>0,simultaneousLoss=counter>0&&!hasCounter;
  const destroyedIds=[attacker,defender].filter(unit=>unit.destroyed).map(unit=>unit.id);
  return {version:1,id:`${Number.isInteger(before.turnNumber)?before.turnNumber:0}:${attacker.id}:${defender.id}`,attacker,defender,damage,counter,hasCounter,simultaneousLoss,indirect:!!UNIT_TYPES[attacker.type].indirect,destroyedIds,destroyed:[...destroyedIds],winner:[0,1].includes(after.winner)?after.winner:null,victoryReason:typeof after.victoryReason==='string'?after.victoryReason:null,day:Number.isInteger(before.day)&&before.day>0?before.day:1};
}

function emptyCasualties(){return {total:0,lost:0,remaining:0,lostIndices:[],latestIndex:null,latestLossAt:null,ageSinceLatestLoss:null};}
function emptyFrame(){return {valid:false,stage:'result',stageLabel:stageLabels.result,stageIndex:0,phaseProgress:1,elapsed:0,stageStart:0,stageDuration:0,totalDuration:0,progress:1,attackerCount:0,defenderCount:0,attackerHp:0,defenderHp:0,attackerInitialCount:0,defenderInitialCount:0,attackerFinalCount:0,defenderFinalCount:0,damageCount:0,counterDamageCount:0,attackerCasualties:0,defenderCasualties:0,casualties:{attacker:emptyCasualties(),defender:emptyCasualties()},casualtyRoles:[],shootingRole:null,shootingTeam:null,shootingSide:null,targetRole:null,targetTeam:null,targetSide:null,actingCount:0,isCounter:false,hasCounter:false,finished:true,reducedMotion:false};}
function isReport(report){return !!report&&validParticipant(report.attacker)&&validParticipant(report.defender)&&report.attacker.id!==report.defender.id&&report.attacker.team!==report.defender.team;}
function timeline(hasCounter,reducedMotion){
  const durations=reducedMotion?COMBAT_DURATIONS.reduced:COMBAT_DURATIONS.normal;
  const stages=hasCounter?COMBAT_STAGES:['intro','attack','damage','result'];let start=0;
  return stages.map(stage=>{const item={stage,start,duration:durations[stage],end:start+durations[stage]};start=item.end;return item;});
}
function lossAt(beforeCount,afterCount,segment,elapsed){
  const total=beforeCount-afterCount;
  let lost=0;
  if(total>0&&segment){if(elapsed>=segment.end)lost=total;else if(elapsed>segment.start)lost=clamp(Math.floor((elapsed-segment.start)*total/segment.duration+Number.EPSILON*4),0,total);}
  const latestLossAt=lost>0?segment.start+lost*segment.duration/total:null;
  return {total,lost,remaining:beforeCount-lost,lostIndices:Array.from({length:lost},(_,index)=>beforeCount-1-index),latestIndex:lost>0?beforeCount-lost:null,latestLossAt,ageSinceLatestLoss:latestLossAt===null?null:Math.max(0,elapsed-latestLossAt)};
}

/** Stages are half-open intervals: at damage start no actor has disappeared;
 * each damage/total interval removes one actor, and the following stage starts
 * with the exact engine result. At totalDuration, result has progress 1.
 * Role is attacker/defender; side is team 0 left, team 1 right, including CPU
 * initiated attacks. Renderer controls projectile motion and flashing separately.
 */
export function getCombatFrame(report,elapsed=0,options={}){
  if(!isReport(report))return emptyFrame();
  const reducedMotion=options?.reducedMotion===true,attacker=report.attacker,defender=report.defender;
  const damage=defender.hpBefore-defender.hpAfter,counter=attacker.hpBefore-attacker.hpAfter,hasCounter=counter>0&&defender.hpAfter>0;
  const segments=timeline(hasCounter,reducedMotion),totalDuration=segments.at(-1).end;
  const safeElapsed=typeof elapsed==='number'?(elapsed===Infinity?totalDuration:Number.isFinite(elapsed)?clamp(elapsed,0,totalDuration):0):0;
  const stageIndex=Math.max(0,segments.findIndex(segment=>safeElapsed<segment.end));
  const current=safeElapsed>=totalDuration?segments.at(-1):segments[stageIndex],index=safeElapsed>=totalDuration?segments.length-1:stageIndex;
  const phaseProgress=clamp((safeElapsed-current.start)/current.duration,0,1),isCounter=current.stage==='counter'||current.stage==='counterDamage';
  const defenseLoss=lossAt(defender.hpBefore,defender.hpAfter,segments.find(segment=>segment.stage==='damage'),safeElapsed);
  const attackLoss=lossAt(attacker.hpBefore,attacker.hpAfter,segments.find(segment=>segment.stage===(hasCounter?'counterDamage':'damage')),safeElapsed);
  const shootingRole=['attack','damage'].includes(current.stage)?'attacker':isCounter?'defender':null,targetRole=shootingRole==='attacker'?'defender':shootingRole==='defender'?'attacker':null;
  const shootingTeam=shootingRole?report[shootingRole].team:null,targetTeam=targetRole?report[targetRole].team:null;
  const attackerCount=attackLoss.remaining,defenderCount=defenseLoss.remaining;
  const casualtyRoles=current.stage==='damage'?(counter>0&&!hasCounter?['defender','attacker']:['defender']):current.stage==='counterDamage'?['attacker']:[];
  return {valid:true,stage:current.stage,stageLabel:stageLabels[current.stage],stageIndex:index,phaseProgress,elapsed:safeElapsed,stageStart:current.start,stageDuration:current.duration,totalDuration,progress:safeElapsed/totalDuration,attackerCount,defenderCount,attackerHp:attackerCount,defenderHp:defenderCount,attackerInitialCount:attacker.hpBefore,defenderInitialCount:defender.hpBefore,attackerFinalCount:attacker.hpAfter,defenderFinalCount:defender.hpAfter,damageCount:defenseLoss.lost,counterDamageCount:attackLoss.lost,attackerCasualties:attackLoss.lost,defenderCasualties:defenseLoss.lost,casualties:{attacker:attackLoss,defender:defenseLoss},casualtyRoles,shootingRole,shootingTeam,shootingSide:shootingTeam===null?null:shootingTeam===0?'left':'right',targetRole,targetTeam,targetSide:targetTeam===null?null:targetTeam===0?'left':'right',actingCount:shootingRole==='attacker'?attackerCount:shootingRole==='defender'?defenderCount:0,isCounter,hasCounter,finished:safeElapsed>=totalDuration,reducedMotion};
}
