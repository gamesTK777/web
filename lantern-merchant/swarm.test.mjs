import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,validateSave} from './engine.mjs';
import {ENEMY_BY_ID} from './enemies.mjs';
const copy=value=>JSON.parse(JSON.stringify(value));
const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
const inside=(p,r)=>p.x>=r.x&&p.x<r.x+r.width&&p.y>=r.y&&p.y<r.y+r.height;
const neighbors=p=>[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>({x:p.x+dx,y:p.y+dy}));
const walkable=(s,p)=>s.map.tiles[p.y]?.[p.x]>0;
function perform(s,a){const result=act(s,a);assert.equal(result.ok,true,result.message);return result.state;}
function descend(s){const y=s.map.tiles.findIndex(row=>row.includes(2));s.player={x:s.map.tiles[y].indexOf(2),y};return perform(s,{type:'stairs'});}
function floor(seed,n){let s=perform(newGame(seed),{type:'enter'});while(s.floor<n)s=descend(s);return s;}
function house(){const s=floor(3,3);assert.ok(s.map.swarm);s.enemies=s.enemies.filter(e=>s.map.swarm.enemyIds.includes(e.id));return s;}
function cells(s){return s.map.tiles.flatMap((row,y)=>row.flatMap((tile,x)=>tile?[{x,y}]:[]));}
function doorway(s){
 const room=s.map.rooms[s.map.swarm.roomIndex];
 for(const entry of cells(s).filter(p=>inside(p,room)))for(const outside of neighbors(entry).filter(p=>!inside(p,room)&&walkable(s,p)))return {entry,outside};
 throw Error('missing door');
}
function distances(s,start){const found=new Map([[`${start.x},${start.y}`,0]]),queue=[start];for(let i=0;i<queue.length;i++)for(const next of neighbors(queue[i])){const key=`${next.x},${next.y}`;if(walkable(s,next)&&!found.has(key)){found.set(key,found.get(`${queue[i].x},${queue[i].y}`)+1);queue.push(next);}}return found;}

test('seeded houses appear only in B2-B4 and B6-B9, keep entrances open, add bounded diverse creatures and useful treasure',()=>{
 const houses=Array(11).fill(0),expectedRewards=['potion','bomb','ration','amber','prism'];
 for(let seed=1;seed<=120;seed++){
  let s=floor(seed,1);
  for(let f=1;f<=10;f++){
   const swarm=s.map.swarm,normal=[4,5,6,7,8,9,10,11,12,12][f-1]+(f===10?1:0),occupied=new Set([`${s.player.x},${s.player.y}`]);
   assert.equal(s.enemies.length,normal+(swarm?(f<=4?f+4:8):0));
   for(const entity of [...s.enemies,...s.loot]){const key=`${entity.x},${entity.y}`;assert.ok(!occupied.has(key));occupied.add(key);assert.equal(s.map.tiles[entity.y][entity.x],1);}
   const reachable=distances(s,s.player);for(const p of cells(s))assert.ok(reachable.has(`${p.x},${p.y}`));
   if([1,5,10].includes(f))assert.equal(Object.hasOwn(s.map,'swarm'),false);
   if(swarm){
    houses[f]++;assert.equal(swarm.status,'dormant');assert.ok(swarm.roomIndex>=1&&swarm.roomIndex<=4);
    const room=s.map.rooms[swarm.roomIndex],members=s.enemies.filter(e=>swarm.enemyIds.includes(e.id));assert.equal(members.length,f<=4?f+4:8);assert.equal(new Set(members.map(e=>e.kind)).size,members.length);
    for(const enemy of members){assert.ok(inside(enemy,room));assert.notEqual(enemy.kind,'boss');assert.ok(ENEMY_BY_ID[enemy.kind].firstFloor<=f);assert.ok(!neighbors(enemy).some(p=>!inside(p,room)&&walkable(s,p)),'dormant creatures never occupy a door');}
    for(const id of expectedRewards)assert.ok(s.loot.some(item=>item.id===id&&inside(item,room)),id);
    assert.equal(s.loot.length,8+f+5);assert.ok(!s.loot.some(item=>item.id==='relic'));
   }
   assert.deepEqual(validateSave(copy(s)),s);
   if(f<10)s=descend(s);
  }
 }
 for(const f of [2,3,4,6,7,8,9])assert.ok(houses[f]>120*.18&&houses[f]<120*.52,`B${f}: ${houses[f]}`);
 assert.deepEqual(floor(3,3),floor(3,3),'generation remains deterministic');
});

test('dormant enemies and status survive waiting and save reload without moving or attacking',()=>{
 let s=house();const before=copy(s.enemies),hp=s.hp;
 for(let i=0;i<12;i++){s=perform(s,{type:'wait'});s=validateSave(JSON.stringify(s));}
 assert.deepEqual(s.enemies,before);assert.equal(s.hp,hp);assert.equal(s.map.swarm.status,'dormant');
});

test('entering announces the house, reveals the room and gives one safe turn before awakened creatures act',()=>{
 let s=house();const {entry,outside}=doorway(s);s.player=outside;
 for(const e of s.enemies)e.attack=99;
 const before=copy(s.enemies),hp=s.hp,result=act(s,{type:'move',dx:entry.x-outside.x,dy:entry.y-outside.y});
 assert.equal(result.ok,true);assert.equal(result.event,'swarm-start');assert.match(result.message,/魔物だまり/);assert.match(result.message,/次の行動/);
 s=result.state;assert.equal(s.map.swarm.status,'active');assert.deepEqual(s.enemies,before);assert.equal(s.hp,hp);
 const room=s.map.rooms[s.map.swarm.roomIndex];for(const p of cells(s).filter(p=>inside(p,room)))assert.equal(s.map.visible[p.y][p.x],true);
 for(const e of s.enemies)e.attack=1;
 s=validateSave(copy(s));const next=act(s,{type:'wait'});assert.equal(next.ok,true);assert.notEqual(next.event,'swarm-start');
 assert.ok(next.state.hp<hp||JSON.stringify(next.state.enemies)!==JSON.stringify(before),'the next action wakes movement or combat');
});

test('awakened group pursuit works outside ordinary detection and beyond twelve path squares',()=>{
 let s=house();s.map.swarm.status='active';s.enemies=s.enemies.slice(0,1);const enemy=s.enemies[0];enemy.kind='moss';
 const path=distances(s,enemy),far=cells(s).filter(p=>distance(p,enemy)>12).sort((a,b)=>path.get(`${b.x},${b.y}`)-path.get(`${a.x},${a.y}`))[0];assert.ok(far);
 s.player=far;const before=copy(enemy),remaining=path.get(`${far.x},${far.y}`);assert.ok(remaining>12);
 const next=perform(s,{type:'wait'});assert.equal(distance(next.enemies[0],before),1);
 assert.equal(distances(next,next.player).get(`${next.enemies[0].x},${next.enemies[0].y}`),remaining-1);
 const control=copy(s);delete control.map.swarm;const ordinary=perform(control,{type:'wait'});assert.deepEqual(ordinary.enemies[0],before);
});

test('the arrival grace belongs to sleeping group members, while an ordinary guard still acts',()=>{
 const s=house(),{entry,outside}=doorway(s),occupied=new Set(s.enemies.map(e=>`${e.x},${e.y}`));
 const guard=neighbors(entry).find(p=>walkable(s,p)&&distance(p,outside)!==0&&!occupied.has(`${p.x},${p.y}`));assert.ok(guard);
 s.player=outside;s.enemies.push({id:'ordinary-guard',kind:'moss',name:'苔玉',...guard,hp:8,maxHp:8,attack:2,defense:0,xp:1});
 const members=copy(s.enemies.filter(e=>s.map.swarm.enemyIds.includes(e.id))),result=act(s,{type:'move',dx:entry.x-outside.x,dy:entry.y-outside.y});
 assert.equal(result.ok,true);assert.equal(result.event,'swarm-start');assert.ok(result.state.hp<s.hp);
 assert.deepEqual(result.state.enemies.filter(e=>result.state.map.swarm.enemyIds.includes(e.id)),members);
});

test('the last melee kill clears once, adds the bonus and remains cleared after reload and more turns',()=>{
 let s=house();s.map.swarm.status='active';s.enemies=s.enemies.slice(0,1);const enemy=s.enemies[0];enemy.hp=1;enemy.xp=1;
 s.player=neighbors(enemy).find(p=>walkable(s,p));assert.ok(s.player);const gold=s.runGold;
 const result=act(s,{type:'move',dx:enemy.x-s.player.x,dy:enemy.y-s.player.y});assert.equal(result.ok,true);assert.equal(result.event,'swarm-clear');
 s=result.state;assert.equal(s.map.swarm.status,'cleared');assert.equal(s.runGold-gold,8+s.floor*5+s.floor*40);assert.equal(s.enemies.length,0);
 const reward=s.runGold;s=validateSave(JSON.stringify(s));for(let i=0;i<5;i++)s=perform(s,{type:'wait'});
 assert.equal(s.runGold,reward);assert.equal(s.map.swarm.status,'cleared');assert.equal(s.log.filter(message=>message.includes('魔物だまりを制圧')).length,1);
});

test('a bomb can defeat the entire sleeping group from outside and an empty room never awakens later',()=>{
 let s,entry,outside,near;
 search:for(let seed=1;seed<=150;seed++){
  const candidate=floor(seed,2);if(!candidate.map.swarm)continue;
  candidate.enemies=candidate.enemies.filter(e=>candidate.map.swarm.enemyIds.includes(e.id));const room=candidate.map.rooms[candidate.map.swarm.roomIndex];
  for(const door of cells(candidate).filter(p=>inside(p,room))){for(const out of neighbors(door).filter(p=>!inside(p,room)&&walkable(candidate,p))){
   const choices=cells(candidate).filter(p=>inside(p,room)&&distance(p,out)<=3&&!neighbors(p).some(n=>!inside(n,room)&&walkable(candidate,n)));
   if(choices.length>=candidate.enemies.length){s=candidate;entry=door;outside=out;near=choices;break search;}
  }}
 }
 assert.ok(s,'there is a real doorway with reachable blast coverage');s.player=outside;s.loot=[];s.inventory.push({id:'bomb',qty:2});
 s.enemies.forEach((e,i)=>{Object.assign(e,near[i]);e.hp=1;e.xp=1;});
 const count=s.enemies.length,gold=s.runGold,result=act(s,{type:'use',id:'bomb'});assert.equal(result.ok,true);assert.equal(result.event,'swarm-clear');
 s=result.state;assert.equal(s.map.swarm.status,'cleared');assert.equal(s.enemies.length,0);assert.equal(s.runGold-gold,count*(8+s.floor*5)+s.floor*40);
 s=validateSave(JSON.stringify(s));const entryResult=act(s,{type:'move',dx:entry.x-outside.x,dy:entry.y-outside.y});assert.equal(entryResult.ok,true);assert.notEqual(entryResult.event,'swarm-start');assert.equal(entryResult.state.runGold,s.runGold);
});

test('retreat is not sealed off and a recall stone exits an active room normally',()=>{
 let s=house();const {entry,outside}=doorway(s);s.player=outside;s=perform(s,{type:'move',dx:entry.x-outside.x,dy:entry.y-outside.y});
 s=perform(s,{type:'move',dx:outside.x-entry.x,dy:outside.y-entry.y});assert.deepEqual(s.player,outside);assert.equal(s.map.swarm.status,'active');
 const result=act(s,{type:'use',id:'recall'});assert.equal(result.ok,true);assert.equal(result.event,'return');assert.equal(result.state.mode,'town');assert.equal(result.state.map,null);assert.equal(result.state.enemies.length,0);assert.deepEqual(validateSave(copy(result.state)),result.state);
});

test('new encounter metadata rejects malformed rooms, fake ordinary membership and contradictory lifecycle states',()=>{
 const original=house(),cases=[
  s=>s.map.swarm=null,s=>s.map.swarm.roomIndex=0,s=>s.map.swarm.roomIndex=5,
  s=>s.map.swarm.status='sleeping',s=>s.map.swarm.enemyIds.pop(),
  s=>s.map.swarm.enemyIds[0]=s.map.swarm.enemyIds[1],s=>s.map.swarm.enemyIds[0]='1-3-0',
  s=>s.map.swarm.enemyIds[0]='__proto__',s=>s.map.swarm.status='cleared',
  s=>s.enemies=[],s=>s.floor=1,s=>s.map.rooms[s.map.swarm.roomIndex].width=30,
  s=>s.map.rooms[s.map.swarm.roomIndex].cx++,s=>s.enemies[0].kind='boss',
  s=>{s.enemies[0].x=s.player.x+1;s.enemies[0].y=s.player.y;},
 ];
 for(const change of cases){const source=copy(original);change(source);assert.throws(()=>validateSave(source));}
 const active=copy(original);active.map.swarm.status='active';active.enemies=[];assert.throws(()=>validateSave(active));
});

test('version-one maps without encounter metadata retain their exact shape and do not gain events on reload',()=>{
 let checked=0;
 for(let seed=1;seed<=30;seed++){
  let s=floor(seed,1);
  for(let f=1;f<=10;f++){
   if(!s.map.swarm){const restored=validateSave(JSON.stringify(s));assert.deepEqual(restored,s);assert.equal(Object.hasOwn(restored.map,'swarm'),false);checked++;}
   if(f<10)s=descend(s);
  }
 }
 assert.ok(checked>90);
 let s=floor(1,1);s=perform(validateSave(copy(s)),{type:'wait'});assert.equal(Object.hasOwn(s.map,'swarm'),false);
});
