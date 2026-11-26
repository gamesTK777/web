import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,previewBattle,commit,finishBattle,TYPES} from './strategy.mjs';
import {createBattle,stepBattle,battleResults} from './battle.mjs';

function firstBattle(flank=false){
  const world=newGame();
  if(flank)assert.equal(commit(world,'blue-heavy',7,4,'wait'),true);
  const preview=previewBattle(world,'blue-scout',5,4,'red-heavy');
  assert.ok(preview);
  assert.equal(commit(world,'blue-scout',5,4,'attack','red-heavy'),true);
  assert.deepEqual(preview,world.pending);
  return {world,model:createBattle(world.pending,'blue-scout')};
}
const byId=(s,id)=>s.fighters.find(v=>v.id===id);
function ticks(s,count,input=()=>({})){for(let i=0;i<count&&!s.reason;i++)stepBattle(s,input(i),1/60)}
test('the same opening has one fighter west, or real crossfire from the one parked east',()=>{
  const solo=firstBattle(),flank=firstBattle(true),m=flank.model;
  assert.equal(solo.model.fighters.length,2);assert.equal(m.fighters.length,3);
  const a=byId(m,'blue-scout'),b=byId(m,'red-heavy'),h=byId(m,'blue-heavy');
  assert.ok(a.x<b.x&&h.x>b.x);assert.equal(a.y,b.y);assert.equal(b.y,h.y);
  assert.ok(Math.cos(b.turret)<-.99,'defender initially faces the lead robot');
  // Cross its firing lane while holding the trigger. The AI wingman
  // independently shoots the target in the back and finishes it.
  ticks(m,2150,i=>({x:i<105?1:0,y:i>110?Math.sin(i/32):0,fire:true,boost:i===180}));
  assert.equal(m.reason,'elimination');assert.equal(b.hp,0);assert.equal(h.kills,1);assert.ok(a.hp>0&&a.hp<65);
  const saved=JSON.parse(JSON.stringify(flank.world));
  assert.ok(finishBattle(saved,saved.pending.id,battleResults(m)));
  assert.equal(saved.units.find(v=>v.id===a.id).hp,a.hp);
  assert.equal(saved.units.find(v=>v.id===a.id).q,5);assert.equal(saved.units.find(v=>v.id===h.id).q,7);
  assert.equal(saved.units.some(v=>v.id===b.id),false);
});
test('all six strategic bearings are preserved exactly in both open and industrial terrain',()=>{
  for(const terrain of ['plain','factory','hq','ridge','road','crater']){
    for(let i=0;i<6;i++){
      const rad=i*Math.PI/3,b={...firstBattle().world.pending,terrain};
      b.fighters[0].dx=Math.cos(rad);b.fighters[0].dy=Math.sin(rad);
      const m=createBattle(b,b.attackerId),[att,def]=m.fighters;
      const cross=(att.x-def.x)*Math.sin(rad)-(att.y-def.y)*Math.cos(rad);
      assert.ok(Math.abs(cross)<.00001,terrain+' bearing '+i);
    }
  }
});
test('a disabled pilot hands over to a surviving wingman until the whole side falls',()=>{
  const {model:m}=firstBattle(true);byId(m,'blue-scout').hp=0;stepBattle(m);
  assert.equal(m.pilotId,'blue-heavy');assert.equal(m.reason,null);
  assert.ok(m.events.some(e=>e.type==='handover'));
  const x=byId(m,m.pilotId).x;ticks(m,12,()=>({x:1}));assert.ok(byId(m,m.pilotId).x>x);
  byId(m,'blue-heavy').hp=0;stepBattle(m);assert.equal(m.reason,'elimination');
});
test('enemy-initiated battle permits manual carrier defense and timeout persists exact surviving HP',()=>{
  const {world}=firstBattle(),b=world.pending;
  b.fighters[0].side='red';b.fighters[1].side='blue';b.fighters[1].kind='carrier';
  b.fighters[1].hp=121;b.fighters[1].maxHp=TYPES.carrier.hp;
  const m=createBattle(b,b.defenderId),f=byId(m,b.defenderId);assert.equal(m.pilotId,f.id);
  const x=f.x;ticks(m,15,()=>({x:-1,fire:true}));assert.ok(f.x<x);
  m.elapsed=34.999;stepBattle(m,{},1/60);
  assert.equal(m.reason,'timeout');assert.equal(m.elapsed,35);
  assert.deepEqual(battleResults(m).map(v=>v.hp),m.fighters.map(v=>v.hp));
});
test('walls stop boosted movement and incoming rounds; heavy shots give a visible warning',()=>{
  const {model:m}=firstBattle();const f=byId(m,'blue-scout'),enemy=byId(m,'red-heavy');
  f.x=174;f.y=74;enemy.x=276;enemy.y=74;
  const x=f.x;ticks(m,30,i=>({x:1,boost:i===0}));assert.ok(f.x>x&&f.x<=195-f.p.r);
  const oldHp=f.hp;
  m.bolts.push({x:264,y:74,dx:-1,dy:0,speed:220,left:180,damage:30,source:enemy.id,side:'red',heavy:true});
  ticks(m,20);assert.equal(m.bolts.length,0);assert.equal(f.hp,oldHp);
  const {model:n}=firstBattle();ticks(n,40);
  assert.equal(byId(n,'red-heavy').phase,'shot');assert.equal(n.bolts.length,0);
});
test('stationary pilot and mobile pilot resolve the opening differently',()=>{
  const {model:still}=firstBattle(true);ticks(still,2150);
  assert.equal(byId(still,'blue-scout').hp,0);assert.ok(byId(still,'red-heavy').hp>0);
});
