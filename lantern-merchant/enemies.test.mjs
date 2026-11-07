import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,validateSave} from './engine.mjs';
import {ENEMY_TYPES,ENEMY_BY_ID,enemiesForFloor,enemyStats} from './enemies.mjs';
const copy=value=>JSON.parse(JSON.stringify(value));
const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
function perform(state,action){const result=act(state,action);assert.equal(result.ok,true,result.message);return result.state;}
function fixture(kind,gap=4){
 const state=perform(newGame(719),{type:'enter'}),room=state.map.rooms[0],stats=enemyStats(kind,ENEMY_BY_ID[kind].firstFloor);
 state.level=30;state.hp=state.maxHp=181;state.attack=34;state.defense=7;
 state.player={x:room.x+gap,y:room.cy};state.enemies=[{id:'creature-fixture',kind,name:ENEMY_BY_ID[kind].name,x:room.x,y:room.cy,...stats,maxHp:stats.hp}];
 assert.equal(state.map.tiles[state.player.y][state.player.x]>0,true);return state;
}
function phase(id){return[...id].reduce((value,c)=>value+c.charCodeAt(0),0);}

test('the original bestiary has exactly fifteen distinct named species and valid floor rosters',()=>{
 assert.equal(ENEMY_TYPES.length,15);assert.equal(new Set(ENEMY_TYPES.map(type=>type.id)).size,15);assert.equal(new Set(ENEMY_TYPES.map(type=>type.name)).size,15);
 for(const type of ENEMY_TYPES){assert.ok(type.description);assert.ok(Number.isInteger(type.firstFloor)&&type.firstFloor>=1&&type.firstFloor<=10);assert.equal(ENEMY_BY_ID[type.id],type);}
 assert.equal(ENEMY_TYPES.filter(type=>type.boss).length,1);assert.equal(ENEMY_BY_ID.boss.name,'灯晶の番人');
 for(let floor=1;floor<=10;floor++)for(const type of enemiesForFloor(floor)){assert.ok(type.firstFloor<=floor);assert.equal(!!type.boss,false);}
});

test('every generated ten-floor expedition introduces all fifteen species without adding crowding or blocking the boss',()=>{
 for(let seed=1;seed<=40;seed++){
  let state=perform(newGame(seed),{type:'enter'});const encountered=new Set();
  for(let floor=1;floor<=10;floor++){
   const expectedNormal=[4,5,6,7,8,9,10,11,12,12][floor-1];
   assert.equal(state.enemies.length,expectedNormal+(floor===10?1:0)+(state.map.swarm?.enemyIds.length||0));
   const occupied=new Set([`${state.player.x},${state.player.y}`]);
   for(const enemy of state.enemies){
    encountered.add(enemy.kind);assert.ok(ENEMY_BY_ID[enemy.kind].firstFloor<=floor);
    assert.ok(state.map.tiles[enemy.y][enemy.x]>0);const key=`${enemy.x},${enemy.y}`;assert.ok(!occupied.has(key));occupied.add(key);
   }
   for(const type of ENEMY_TYPES.filter(type=>type.firstFloor===floor))assert.ok(state.enemies.some(enemy=>enemy.kind===type.id),`seed ${seed}, B${floor}: missing ${type.id}`);
   const boss=state.enemies.find(enemy=>enemy.kind==='boss');
   if(boss)for(const enemy of state.enemies.filter(enemy=>enemy!==boss))assert.ok(distance(enemy,boss)>1);
   assert.deepEqual(validateSave(copy(state)),state);
   if(floor<10){const y=state.map.tiles.findIndex(row=>row.includes(2));state.player={x:state.map.tiles[y].indexOf(2),y};state=perform(state,{type:'stairs'});}
  }
  assert.equal(encountered.size,15,`seed ${seed}`);
 }
});

test('all fifteen species survive version-one save round trips without adding or rewriting enemy fields',()=>{
 for(const type of ENEMY_TYPES){
  const state=fixture(type.id);state.enemies[0].name='保存された名前';state.enemies[0].hp=2;state.enemies[0].maxHp=99;state.enemies[0].attack=17;state.enemies[0].xp=71;
  const savedEnemy=copy(state.enemies[0]),normalized=validateSave(copy(state));
  assert.equal(normalized.version,1);assert.deepEqual(normalized.enemies[0],savedEnemy);assert.deepEqual(validateSave(JSON.stringify(normalized)),normalized);
 }
 for(const kind of ['__proto__','constructor','toString','unknown']){const state=fixture('moss');state.enemies[0].kind=kind;assert.throws(()=>validateSave(state));}
});

test('legacy creature combat values and final guardian rewards retain their old scale',()=>{
 for(let floor=1;floor<=5;floor++){
  for(const kind of ['moss','moth'])assert.deepEqual(enemyStats(kind,floor),{hp:5+floor*3,attack:1+floor,defense:0,xp:5+floor*3});
  assert.deepEqual(enemyStats('golem',floor),{hp:10+floor*3,attack:2+floor,defense:1,xp:5+floor*3});
 }
 assert.deepEqual(enemyStats('boss',5),{hp:65,attack:11,defense:3,xp:100});
});

test('deeper creature stats increase gradually and the new final guardian remains within equipped-player scale',()=>{
 for(const type of ENEMY_TYPES.filter(type=>!type.boss)){
  let prior=enemyStats(type.id,5);
  for(let floor=6;floor<=10;floor++){
   const current=enemyStats(type.id,floor);assert.equal(current.hp-prior.hp,type.hpPerFloor);assert.equal(current.attack-prior.attack,1);assert.equal(current.defense,prior.defense);assert.equal(current.xp-prior.xp,3);prior=current;
  }
 }
 const boss=enemyStats('boss',10);assert.deepEqual(boss,{hp:115,attack:16,defense:4,xp:200});
 assert.equal(ENEMY_BY_ID.boss.firstFloor,10);assert.equal(enemyStats('moss',999).hp,enemyStats('moss',10).hp);
});

test('slow creatures move once in two turns, while an undisturbed mimic waits outside its ambush radius',()=>{
 for(const kind of ['cap','shell','knight']){
  let state=fixture(kind),original=copy(state.enemies[0]);state=perform(state,{type:'wait'});state=perform(state,{type:'wait'});
  assert.equal(distance(state.enemies[0],original),1,kind);assert.equal(state.hp,state.maxHp);
 }
 let state=fixture('mimic'),original=copy(state.enemies[0]);state=perform(state,{type:'wait'});assert.deepEqual(state.enemies[0],original);
 state.player.x--;state=perform(state,{type:'wait'});assert.equal(distance(state.enemies[0],original),1);
});

test('thorn charges take at most two legal steps and never deal damage on the arrival turn',()=>{
 let state=fixture('thorn'),enemy=state.enemies[0],original=copy(enemy);
 state.turn=(3-phase(enemy.id)%3-1+3)%3;state=perform(state,{type:'wait'});
 assert.equal(distance(state.enemies[0],original),2);assert.equal(state.hp,state.maxHp);assert.match(state.log.at(-1),/勢いよく/);
});

test('glowing and paper attacks reach two clear straight squares but cannot cross a wall or attack diagonally',()=>{
 for(const kind of ['wisp','owl']){
  let state=fixture(kind,2),enemy=state.enemies[0];state.turn=(1-phase(enemy.id)%2+2)%2;
  const original=copy(enemy);state=perform(state,{type:'wait'});assert.ok(state.hp<state.maxHp);assert.deepEqual(state.enemies[0],original);assert.match(state.log.at(-1),/遠隔/);
  state=fixture(kind,2);enemy=state.enemies[0];state.turn=(1-phase(enemy.id)%2+2)%2;state.map.tiles[enemy.y][enemy.x+1]=0;
  state=perform(state,{type:'wait'});assert.equal(state.hp,state.maxHp);
  state=fixture(kind,2);enemy=state.enemies[0];state.turn=(1-phase(enemy.id)%2+2)%2;state.player.x--;state.player.y++;
  assert.equal(distance(enemy,state.player),2);state=perform(state,{type:'wait'});assert.equal(state.hp,state.maxHp);
 }
});

test('every species remains on walkable unoccupied squares and acts at most once for damage per player turn',()=>{
 for(const type of ENEMY_TYPES){
  let state=fixture(type.id);
  for(let turn=0;turn<20;turn++){
   const before=copy(state.enemies[0]),hp=state.hp;state=perform(state,{type:'wait'});const after=state.enemies[0];
   assert.ok(state.map.tiles[after.y][after.x]>0,type.id);assert.ok(distance(after,state.player)>=1,type.id);
   assert.ok(distance(before,after)<=2,type.id);assert.ok(hp-state.hp<=Math.max(1,before.attack-state.defense+1),type.id);
   if(distance(before,after)>0)assert.ok(state.hp>=hp,'movement never also attacks');
   assert.deepEqual(validateSave(copy(state)),state);
  }
 }
});
