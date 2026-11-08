import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveMusicTrack} from './music-scene.mjs';
import {newGame, act, validateSave} from './engine.mjs';

const copy = value => JSON.parse(JSON.stringify(value));
const inside = (p, r) => p.x >= r.x && p.x < r.x + r.width && p.y >= r.y && p.y < r.y + r.height;
const neighbors = p => [[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy]) => ({x:p.x + dx, y:p.y + dy}));
function perform(state, action) { const result = act(state, action); assert.equal(result.ok, true, result.message); return result; }
function floorState(floor) {
  let state = perform(newGame(3), {type:'enter'}).state;
  while (state.floor < floor) {
    const y = state.map.tiles.findIndex(row => row.includes(2)); state.player = {x:state.map.tiles[y].indexOf(2), y};
    state = perform(state, {type:'stairs'}).state;
  }
  return state;
}
function swarmDoor(state) {
  const room = state.map.rooms[state.map.swarm.roomIndex];
  for (let y = room.y; y < room.y + room.height; y++) for (let x = room.x; x < room.x + room.width; x++) {
    const entry = {x,y};
    const outside = neighbors(entry).find(p => !inside(p,room) && state.map.tiles[p.y]?.[p.x] > 0);
    if (outside) return {entry,outside};
  }
  throw Error('Missing swarm room doorway');
}

test('all ten real floors select their paired track and town always takes priority', () => {
  for (let floor = 1; floor <= 10; floor++) {
    const state = floorState(floor), lower = Math.floor((floor - 1) / 2) * 2 + 1;
    assert.equal(resolveMusicTrack(state), `dungeon-${lower}-${lower + 1}`);
  }
  assert.equal(resolveMusicTrack(newGame(8)), 'town');
  assert.equal(resolveMusicTrack({mode:'town', floor:10, map:{swarm:{status:'active',enemyIds:['a']}}, enemies:[{id:'a',hp:4}]}), 'town');
});

test('explicit track names and legacy scene callers remain supported with safe fallback values', () => {
  for (const id of ['town','dungeon-1-2','dungeon-3-4','dungeon-5-6','dungeon-7-8','dungeon-9-10','swarm']) assert.equal(resolveMusicTrack(id), id);
  assert.equal(resolveMusicTrack('dungeon'), 'dungeon-1-2');
  for (const value of [undefined,null,false,1,NaN,Symbol('scene'),'', 'dungeon-2', {}, [], {mode:'invalid'}]) assert.equal(resolveMusicTrack(value), 'town');
});

test('malformed floors are bounded without executing object conversions or throwing', () => {
  for (const [floor, expected] of [[-3,'dungeon-1-2'], [0,'dungeon-1-2'], [2.8,'dungeon-1-2'], [3.9,'dungeon-3-4'], [99,'dungeon-9-10'], ['8','dungeon-7-8'], [NaN,'dungeon-1-2'], [Infinity,'dungeon-1-2'], ['', 'dungeon-1-2'], [null,'dungeon-1-2'], [Symbol('floor'),'dungeon-1-2'], [{valueOf(){throw Error('must not convert');}},'dungeon-1-2']]) {
    assert.equal(resolveMusicTrack({mode:'dungeon', floor}), expected);
  }
});

test('only active living marked enemies enable swarm music, independent of room location', () => {
  const state = {mode:'dungeon',floor:7,player:{x:0,y:0},map:{swarm:{status:'active',roomIndex:99,enemyIds:['a','a','b']}},enemies:[{id:'a',hp:3,x:99,y:99}]};
  const before = copy(state); assert.equal(resolveMusicTrack(state), 'swarm'); assert.deepEqual(state,before);
  for (const status of ['dormant','cleared','invalid',undefined]) assert.equal(resolveMusicTrack({...state,map:{swarm:{...state.map.swarm,status}}}), 'dungeon-7-8');
  for (const enemies of [[],[{id:'other',hp:4}],[{id:'a',hp:0}],[{id:'a',hp:-1}],[{id:'a',hp:'3'}],[{id:'a',hp:NaN}],[null],null]) assert.equal(resolveMusicTrack({...state,enemies}), 'dungeon-7-8');
  for (const swarm of [null,{}, {status:'active'}, {status:'active',enemyIds:'a'}, {status:'active',enemyIds:[null,42,{}]}]) assert.equal(resolveMusicTrack({...state,map:{swarm}}), 'dungeon-7-8');
});

test('real encounter activation, save reload, final kill, stairs and return restore the appropriate music', () => {
  let state = floorState(3); assert.ok(state.map.swarm); state.enemies = state.enemies.filter(e => state.map.swarm.enemyIds.includes(e.id));
  assert.equal(resolveMusicTrack(validateSave(copy(state))), 'dungeon-3-4');
  const {entry,outside} = swarmDoor(state); state.player = outside;
  const waking = perform(state,{type:'move',dx:entry.x-outside.x,dy:entry.y-outside.y});
  assert.equal(waking.event,'swarm-start'); state = validateSave(copy(waking.state)); assert.equal(resolveMusicTrack(state),'swarm');
  const live = copy(state); live.player = outside; assert.equal(resolveMusicTrack(live),'swarm');
  state.enemies = state.enemies.slice(0,1); const enemy = state.enemies[0]; enemy.hp = 1; enemy.xp = 1;
  state.player = neighbors(enemy).find(p => state.map.tiles[p.y]?.[p.x] > 0); assert.ok(state.player);
  const cleared = perform(state,{type:'move',dx:enemy.x-state.player.x,dy:enemy.y-state.player.y});
  assert.equal(cleared.event,'swarm-clear'); assert.equal(resolveMusicTrack(validateSave(copy(cleared.state))),'dungeon-3-4');
  const next = floorState(4); const stairsY = next.map.tiles.findIndex(row => row.includes(2)); next.player = {x:next.map.tiles[stairsY].indexOf(2),y:stairsY};
  assert.equal(resolveMusicTrack(perform(next,{type:'stairs'}).state),'dungeon-5-6');
  const returnState = copy(live); const exitY = returnState.map.tiles.findIndex(row => row.includes(3)); returnState.player = {x:returnState.map.tiles[exitY].indexOf(3),y:exitY};
  const returned = perform(returnState,{type:'return'}).state; assert.equal(returned.mode,'town'); assert.equal(resolveMusicTrack(returned),'town');
});
