import test from 'node:test';
import assert from 'node:assert/strict';
import {createTownNavigation} from './town-navigation.mjs';

function harness(options = {}) {
  let time = 1000;
  const navigation = createTownNavigation({spawn: {x: 100, y: 200}, isWalkable: () => true, now: () => time, ...options});
  return {navigation, advance: amount => { time += amount; }};
}

test('a town step interpolates over 165 ms and rests at exactly 18 pixels', () => {
  const {navigation: n, advance} = harness();
  assert.equal(n.move(1, 0, {}), true);
  assert.deepEqual(n.current(), {x: 100, y: 200});
  advance(82.5);
  assert.deepEqual(n.current(), {x: 109, y: 200});
  assert.deepEqual(n.getVisual().motion, {kind: 'move', progress: .5, facing: 'right'});
  advance(82.5);
  assert.deepEqual(n.current(), {x: 118, y: 200});
  assert.deepEqual(n.getVisual().motion, {kind: 'idle', progress: 1, facing: 'right'});
  advance(10000);
  assert.deepEqual(n.current(), {x: 118, y: 200});
});

test('a direction change starts from the current visual position without a jump', () => {
  const {navigation: n, advance} = harness();
  n.move(1, 0, {}); advance(55);
  const before = n.current();
  n.move(0, -1, {});
  assert.deepEqual(n.current(), before);
  assert.equal(n.getVisual().motion.facing, 'up');
  advance(165);
  assert.deepEqual(n.current(), {x: 106, y: 182});
});

test('swept collision samples stop before a narrow obstacle even when the destination is clear', () => {
  const samples = [];
  const {navigation: n, advance} = harness({isWalkable(x, y) { samples.push({x, y}); return x < 109 || x > 113; }});
  assert.equal(n.move(1, 0, {}), true);
  advance(165);
  assert.deepEqual(n.current(), {x: 106, y: 200});
  assert.ok(samples.some(p => p.x === 109), 'the intermediate obstacle must be sampled');
  assert.equal(n.move(1, 0, {}), false);
  assert.deepEqual(n.current(), {x: 106, y: 200});
  assert.equal(n.getVisual().motion.kind, 'idle');
});

test('only one cardinal unit direction is accepted', () => {
  const {navigation: n} = harness();
  for (const direction of [[0, 0], [1, 1], [2, 0], [.5, 0], [NaN, 1], [1, Infinity]]) {
    assert.equal(n.move(...direction, {}), false);
    assert.deepEqual(n.current(), {x: 100, y: 200});
  }
});

test('construction checks both the visible position and the in-flight destination', () => {
  const {navigation: n, advance} = harness({isWalkable: (x, y, state) => !state.block || x < 115});
  n.move(1, 0, {}); advance(20);
  assert.equal(n.ensurePosition({block: false}), false);
  assert.equal(n.ensurePosition({block: true}), true);
  assert.deepEqual(n.current(), {x: 100, y: 200});
  advance(200);
  assert.deepEqual(n.current(), {x: 100, y: 200});
  assert.equal(n.getVisual().motion.facing, 'down');
});

test('reset cancels a walk, and returned coordinates cannot alter the controller', () => {
  const spawn = {x: 100, y: 200};
  const {navigation: n, advance} = harness({spawn});
  spawn.x = -100;
  n.move(0, 1, {}); advance(60); n.reset();
  const visual = n.getVisual(); visual.x = 900; visual.motion.facing = 'left';
  assert.deepEqual(n.current(), {x: 100, y: 200});
  assert.deepEqual(n.getVisual().motion, {kind: 'idle', progress: 1, facing: 'down'});
});

test('reduced motion jumps to the endpoint while preserving collisions and facing', () => {
  const {navigation: n} = harness({reducedMotion: true, isWalkable: x => x >= 90});
  n.move(-1, 0, {});
  assert.deepEqual(n.current(), {x: 91, y: 200});
  assert.deepEqual(n.getVisual().motion, {kind: 'idle', progress: 1, facing: 'left'});
  assert.equal(n.move(-1, 0, {}), false);
});

test('navigation does not mutate a frozen game snapshot or consume turns', () => {
  const state = Object.freeze({mode: 'town', gold: 180, turn: 0, player: Object.freeze({x: 0, y: 0}), plots: Object.freeze([])});
  const before = JSON.stringify(state);
  const {navigation: n, advance} = harness({isWalkable: (x, y, provided) => { assert.equal(provided, state); return x >= 0 && y >= 0; }});
  for (const [dx, dy] of [[1, 0], [0, -1], [-1, 0], [0, 1]]) { n.move(dx, dy, state); advance(170); }
  n.ensurePosition(state);
  assert.equal(JSON.stringify(state), before);
  assert.deepEqual(n.current(), {x: 100, y: 200});
});
