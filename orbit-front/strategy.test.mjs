import test from 'node:test';
import assert from 'node:assert/strict';
import {WIDTH,HEIGHT,TYPES,inside,neighbors,hexDistance,hexXY,terrainAt,rank,newGame,validSave,at,
  siteAt,commands,reachable,threats,previewBattle,commit,finishBattle,produce,deploy,deployCells,
  cargoOf,unload,unloadCells,income,endTurn,cpuStep} from './strategy.mjs';

const get=(s,id)=>s.units.find(u=>u.id===id);
const roundTrip=s=>JSON.parse(JSON.stringify(s));
const sameHP=b=>b.fighters.map(f=>({id:f.id,hp:f.hp,kills:0}));
const blueAttack=s=>commit(s,'blue-scout',5,4,'attack','red-heavy');
const nextRound=s=>{assert.equal(endTurn(s),true);assert.equal(endTurn(s),true);};

test('12×9 odd-row grid has symmetric neighbours and one common action-space projection',()=>{
  for(let r=0;r<HEIGHT;r++)for(let q=0;q<WIDTH;q++){
    const a=hexXY(q,r);
    for(const p of neighbors(q,r)){
      assert.ok(inside(p.q,p.r));
      assert.ok(neighbors(p.q,p.r).some(n=>n.q===q && n.r===r));
      assert.equal(hexDistance(q,r,p.q,p.r),1);
      const b=hexXY(p.q,p.r);
      assert.ok(Math.abs(Math.hypot(b.x-a.x,b.y-a.y)-1)<1e-10);
    }
  }
  const s=newGame();assert.equal(validSave(s),true);
  assert.equal(s.units.length,8);
  assert.ok(s.units.every(u=>terrainAt(u.q,u.r)!=='ridge'));
  assert.equal(at(s,6,4).kind,'heavy');assert.equal(siteAt(s,6,4).owner,null);
});

test('opening can preview exact 1v1 or a real 2v1 pincer without changing the board on preview',()=>{
  const s=newGame(),before=roundTrip(s);
  const single=previewBattle(s,'blue-scout',5,4,'red-heavy');
  assert.deepEqual(s,before);assert.equal(single.fighters.length,2);
  assert.ok(reachable(s,'blue-heavy').some(p=>p.q===7 && p.r===4));
  assert.equal(commit(s,'blue-heavy',7,4,'wait'),true);
  const preview=previewBattle(s,'blue-scout',5,4,'red-heavy');
  const [left,center,right]=preview.fighters;
  assert.deepEqual([left.dx,center.dx,right.dx],[-1,0,1]);
  assert.deepEqual([left.dy,center.dy,right.dy],[0,0,0]);
  assert.equal(preview.terrain,'factory');
  assert.equal(blueAttack(s),true);assert.deepEqual(s.pending,preview);
  assert.equal(validSave(roundTrip(s)),true);
  assert.equal(endTurn(s),false);assert.equal(produce(s,1,4,'scout'),false);
  assert.equal(get(s,'blue-heavy').acted,true);assert.equal(get(s,'blue-scout').acted,true);
});

test('attack timeout persists damage to all survivors, positions/actions and experience exactly once',()=>{
  let s=newGame();commit(s,'blue-heavy',7,4,'wait');blueAttack(s);
  s=roundTrip(s);const b=s.pending, before=s.units.map(u=>[u.id,u.q,u.r]);
  const results=sameHP(b).map((v,i)=>({...v,hp:v.hp-(i+1)*5}));
  assert.equal(finishBattle(s,b.id,[results[0]]),null);
  assert.equal(finishBattle(s,b.id,results.map(v=>({...v,hp:NaN}))),null);
  assert.equal(s.pending.id,b.id);
  const report=finishBattle(s,b.id,results);
  assert.equal(report.length,3);assert.deepEqual(s.units.map(u=>[u.id,u.q,u.r]),before);
  assert.deepEqual(report.map(v=>v.hp),results.map(v=>v.hp));
  assert.equal(get(s,'red-heavy').acted,false);assert.equal(get(s,'red-heavy').xp,1);
  assert.equal(get(s,'blue-heavy').battles,1);assert.equal(s.turn,'blue');assert.equal(siteAt(s,6,4).owner,null);
  assert.equal(finishBattle(s,b.id,results),null);assert.equal(get(s,'blue-scout').xp,1);
  assert.equal(validSave(s),true);
});

test('capture must be a later unit action, pays next owner turn, production is charged/completed once',()=>{
  let s=newGame();const f=s.funds.blue;
  blueAttack(s);finishBattle(s,s.pending.id,sameHP(s.pending).map(v=>({...v,hp:v.id==='red-heavy'?0:v.hp})));
  assert.equal(siteAt(s,6,4).owner,null);
  assert.equal(commit(s,'blue-scout',6,4,'capture'),false);
  assert.ok(commit(s,'blue-heavy',6,4,'capture'));assert.equal(s.funds.blue,f);
  assert.equal(income(s,'blue'),210);assert.ok(produce(s,6,4,'scout'));
  assert.equal(produce(s,6,4,'scout'),false);
  assert.equal(siteAt(s,6,4).queue.remaining,1);assert.equal(s.funds.blue,f-TYPES.scout.price);
  s=roundTrip(s);nextRound(s);assert.equal(s.funds.blue,f-TYPES.scout.price+210);
  assert.equal(siteAt(s,6,4).queue,null);assert.equal(s.units.filter(u=>u.id.startsWith('blue-new')).length,1);
  s=roundTrip(s);assert.equal(validSave(s),true);
  nextRound(s);assert.equal(s.units.filter(u=>u.id.startsWith('blue-new')).length,1);
});

test('heavy takes two turns and a blocked deployment can be manually released once',()=>{
  let s=newGame();s.funds.blue=1000;s.units=[];
  for(const p of neighbors(1,4))if(terrainAt(p.q,p.r)!=='ridge'){
    const i=s.units.length;s.units.push({...newGame().units[0],id:'block-'+i,q:p.q,r:p.r});
  }
  assert.ok(produce(s,1,4,'heavy'));nextRound(s);
  assert.equal(siteAt(s,1,4).queue.remaining,1);
  nextRound(s);assert.equal(siteAt(s,1,4).queue.remaining,0);assert.deepEqual(deployCells(s,1,4),[]);
  s=roundTrip(s);const opened=s.units.pop();
  assert.ok(deploy(s,1,4,opened.q,opened.r));assert.equal(at(s,opened.q,opened.r).kind,'heavy');
  assert.equal(deploy(s,1,4,opened.q,opened.r),false);assert.ok(validSave(s));
});

test('carrier transports up to two, preserves history, repairs up to maximum and unloads legally',()=>{
  const s=newGame(), pilot=get(s,'blue-scout');
  Object.assign(pilot,{hp:20,xp:5,battles:4,kills:1});
  assert.ok(commit(s,pilot.id,1,4,'load','blue-carrier'));
  assert.ok(commit(s,'blue-line',2,5,'load','blue-carrier'));
  assert.equal(cargoOf(s,'blue-carrier').length,2);assert.equal(rank(pilot.xp),'エース');
  assert.equal(at(s,1,5).id,'blue-carrier');assert.deepEqual(reachable(s,pilot.id),[]);
  assert.ok(commit(s,'blue-carrier',2,4,'wait'));assert.deepEqual([pilot.q,pilot.r],[2,4]);
  nextRound(s);assert.equal(pilot.hp,20+Math.ceil(TYPES.scout.hp*.24));
  assert.equal(unload(s,'blue-carrier',pilot.id,2,4),false);
  const p=unloadCells(s,'blue-carrier')[0];
  assert.ok(unload(s,'blue-carrier',pilot.id,p.q,p.r));assert.equal(pilot.carrierId,null);
  assert.deepEqual([pilot.xp,pilot.battles,pilot.kills],[5,4,1]);assert.ok(pilot.acted);
  assert.ok(validSave(roundTrip(s)));
});

test('CPU assault on carrier permits defensive battle, excludes cargo, sinks embarked units and retains hostile turn',()=>{
  const s=newGame();
  assert.ok(commit(s,'blue-scout',1,4,'load','blue-carrier'));
  assert.ok(endTurn(s));
  Object.assign(get(s,'red-line'),{q:2,r:5});
  assert.ok(commit(s,'red-line',2,5,'attack','blue-carrier'));
  assert.equal(s.pending.fighters.some(v=>v.id==='blue-scout'),false);
  assert.equal(validSave(roundTrip(s)),true);
  const result=sameHP(s.pending).map(v=>v.id==='blue-carrier'?{...v,hp:0}:v);
  const report=finishBattle(s,s.pending.id,result);
  assert.equal(get(s,'blue-scout'),undefined);assert.equal(get(s,'blue-carrier'),undefined);
  assert.equal(report.find(v=>v.id==='blue-scout').destroyed,true);
  assert.equal(s.turn,'red');assert.equal(get(s,'red-line').acted,true);
});

test('CPU obeys same rules, takes factories, chooses a manual defensive fight, and eventually seizes undefended HQ',()=>{
  const s=newGame();let cpuCaptures=0, defenses=0;
  for(let i=0;i<500 && !s.outcome;i++){
    if(s.turn==='blue')endTurn(s);
    else if(s.pending){
      assert.ok(s.pending.fighters.some(v=>v.side==='blue'));
      defenses++;finishBattle(s,s.pending.id,sameHP(s.pending).map(v=>({...v,hp:v.hp-8})));
    }else{
      assert.ok(cpuStep(s));cpuCaptures=Math.max(cpuCaptures,s.sites.filter(p=>p.type==='factory' && p.owner==='red').length);
    }
    assert.ok(validSave(roundTrip(s)));assert.ok(s.funds.red>=0);
  }
  assert.ok(cpuCaptures>0);assert.ok(defenses>0);assert.equal(s.outcome.winner,'red');
});

test('both headquarters can be captured; 30 full rounds allow victory, defeat or a draw on holdings',()=>{
  for(const side of ['blue','red']){
    const s=newGame(),q=side==='blue'?10:1;
    s.turn=side;Object.assign(get(s,side+'-scout'),{q,r:4});
    assert.ok(commit(s,side+'-scout',q,4,'capture'));assert.deepEqual(s.outcome,{winner:side,reason:'capture'});
    assert.equal(endTurn(s),false);assert.ok(validSave(s));
  }
  for(const winner of [null,'blue','red']){
    const s=newGame();s.round=30;siteAt(s,6,7).owner=winner;
    assert.ok(endTurn(s));assert.equal(s.outcome,null);assert.ok(endTurn(s));
    assert.deepEqual(s.outcome,{winner,reason:'rounds'});assert.ok(validSave(s));
  }
});

test('CPU guards its threatened home and boards a badly damaged ace for repairs',()=>{
  const s=newGame();endTurn(s);s.funds.red=0;
  for(const p of s.sites.filter(p=>p.type==='factory'))p.owner='red';
  const ace=get(s,'red-heavy');
  Object.assign(ace,{q:9,r:5,hp:18,xp:6});
  Object.assign(get(s,'blue-scout'),{q:9,r:4});
  let interception=false;
  for(let i=0;i<20 && s.turn==='red';i++){
    if(s.pending){
      if(s.pending.defenderId==='blue-scout' && s.pending.attackerId!=='red-heavy')interception=true;
      finishBattle(s,s.pending.id,sameHP(s.pending));
    }else assert.ok(cpuStep(s));
  }
  assert.equal(interception,true);assert.equal(ace.carrierId,'red-carrier');
  assert.ok(ace.xp>=5);assert.ok(validSave(s));
});

test('a reachable HQ with a nearby enemy takes priority over an available neutral factory',()=>{
  const s=newGame();s.turn='red';s.funds.red=0;
  s.units=s.units.filter(v=>v.id==='red-line' || v.id==='blue-scout');
  Object.assign(get(s,'blue-scout'),{q:10,r:3});
  assert.ok(commands(s,'red-line',6,4).capture);assert.ok(validSave(s));
  assert.ok(cpuStep(s));
  assert.equal(at(s,10,4)?.id,'red-line');assert.equal(siteAt(s,6,4).owner,null);
  assert.equal(s.pending?.defenderId,'blue-scout');
});

test('support cap, promotion, damage and ownership are independent of acting first or second',()=>{
  const s=newGame(), lineup=[['blue-line',5,3],['blue-heavy',7,4],['blue-carrier',5,5],['red-carrier',6,5],['red-scout',6,3]];
  for(const [id,q,r] of lineup)Object.assign(get(s,id),{q,r});
  const scout=get(s,'blue-scout');scout.xp=1;
  assert.ok(blueAttack(s));assert.equal(s.pending.fighters.filter(v=>v.side==='blue').length,3);
  assert.equal(s.pending.fighters.filter(v=>v.side==='red').length,3);
  const report=finishBattle(s,s.pending.id,sameHP(s.pending));
  assert.equal(report.find(v=>v.id===scout.id).promoted,true);
  assert.equal(rank(scout.xp),'ベテラン');assert.equal(siteAt(s,6,4).owner,null);
});

test('legality and corrupted snapshots are rejected before action',()=>{
  const s=newGame();assert.equal(commit(s,'red-heavy',6,4),false);
  assert.equal(commands(s,'blue-heavy',6,4).wait,false);
  assert.equal(previewBattle(s,'blue-scout',3,4,'red-heavy'),null);
  assert.equal(produce(s,6,4,'line'),false);assert.equal(produce(s,1,4,'carrier'),false);
  assert.ok(threats(s,'red').some(p=>p.q===5 && p.r===4));
  const bad=roundTrip(s);bad.units[0].q=99;assert.equal(validSave(bad),false);
  blueAttack(s);s.pending.fighters[0].dx=100;assert.equal(validSave(s),false);
});
