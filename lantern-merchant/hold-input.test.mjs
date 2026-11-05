import test from 'node:test';
import assert from 'node:assert/strict';
import {createHoldInput, isMovementKey} from './hold-input.mjs';

function harness() {
  let now = 0, sequence = 0, enabled = true;
  const timers = new Map(), calls = [];
  const control = createHoldInput({
    onMove: (dx, dy) => calls.push({dx, dy, at: now}),
    canMove: () => enabled,
    setTimeout: (fn, ms) => { const id = ++sequence; timers.set(id, {at: now + ms, fn}); return id; },
    clearTimeout: id => timers.delete(id)
  });
  return {
    control, calls, timers,
    enable: value => { enabled = value; },
    advance(ms) {
      const target = now + ms;
      while (true) {
        const next = [...timers.entries()].filter(([, t]) => t.at <= target).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        now = next[1].at; timers.delete(next[0]); next[1].fn();
      }
      now = target;
    }
  };
}

test('a held key moves immediately, waits briefly, then repeats at a predictable rate', () => {
  const h = harness();
  assert.equal(h.control.keyDown('KeyW'), true);
  assert.deepEqual(h.calls, [{dx: 0, dy: -1, at: 0}]);
  h.advance(259); assert.equal(h.calls.length, 1);
  h.advance(1); h.advance(340);
  assert.deepEqual(h.calls.map(v => v.at), [0, 260, 430, 600]);
  h.control.keyUp('KeyW'); h.advance(1000);
  assert.equal(h.calls.length, 4);
  assert.equal(h.timers.size, 0);
});

test('OS duplicate key-down events do not add moves or timers', () => {
  const h = harness();
  h.control.keyDown('ArrowRight');
  for (let i = 0; i < 20; i++) h.control.keyDown('ArrowRight');
  assert.equal(h.calls.length, 1); assert.equal(h.timers.size, 1);
  h.advance(430);
  assert.equal(h.calls.length, 3); assert.equal(h.timers.size, 1);
});

test('the newest held direction wins, and releasing it resumes the older direction', () => {
  const h = harness();
  h.control.keyDown('KeyW'); h.advance(100);
  h.control.keyDown('KeyD'); h.advance(260);
  h.control.keyUp('KeyD'); h.advance(170);
  assert.deepEqual(h.calls.map(({dx, dy}) => [dx, dy]), [[0, -1], [1, 0], [1, 0], [0, -1], [0, -1]]);
  h.control.keyUp('KeyW'); assert.equal(h.timers.size, 0);
});

test('releasing an inactive direction does not interrupt the active key', () => {
  const h = harness();
  h.control.keyDown('KeyA'); h.control.keyDown('KeyS');
  h.advance(100); h.control.keyUp('KeyA'); h.advance(160);
  assert.deepEqual(h.calls.at(-1), {dx: 0, dy: 1, at: 260});
});

test('clearing on blur or modal opening drops every held direction and stale callback', () => {
  const h = harness();
  h.control.keyDown('KeyW');
  const lateCallback = [...h.timers.values()][0].fn;
  h.control.pointerDown(7, 1, 0);
  h.control.clear(); lateCallback(); h.advance(2000);
  assert.equal(h.calls.length, 2); assert.equal(h.timers.size, 0);
  h.control.keyDown('KeyW'); assert.equal(h.calls.length, 3);
});

test('unavailable gameplay stops repeats and never resumes without a new press', () => {
  const h = harness();
  h.enable(false); h.control.keyDown('KeyW');
  assert.equal(h.calls.length, 0); assert.equal(h.timers.size, 0);
  h.enable(true); h.control.keyDown('KeyW');
  h.enable(false); h.advance(260);
  h.enable(true); h.advance(1000);
  assert.equal(h.calls.length, 1); assert.equal(h.timers.size, 0);
});

test('a held touch button repeats and releasing a different pointer does not stop it', () => {
  const h = harness();
  assert.equal(h.control.pointerDown(3, -1, 0), true);
  assert.equal(h.control.pointerDown(3, -1, 0), true);
  h.control.pointerUp(4); h.advance(430);
  assert.deepEqual(h.calls.map(v => v.dx), [-1, -1, -1]);
  h.control.pointerUp(3); h.advance(1000);
  assert.equal(h.calls.length, 3);
  assert.equal(h.control.pointerDown(3, 1, 1), false);
});

test('clear during a movement callback does not accidentally schedule a repeat', () => {
  let control;
  const timers = [];
  control = createHoldInput({onMove: () => control.clear(), setTimeout: fn => timers.push(fn), clearTimeout: () => {}});
  control.keyDown('KeyW');
  assert.equal(timers.length, 0);
});

test('disposal cancels all activity and unmapped keys remain available to other controls', () => {
  const h = harness();
  assert.equal(isMovementKey('KeyH'), false);
  assert.equal(h.control.keyDown('KeyH'), false);
  assert.equal(h.control.keyUp('KeyH'), false);
  h.control.keyDown('ArrowDown'); h.control.dispose();
  h.control.pointerDown(2, 1, 0); h.control.keyDown('ArrowUp'); h.advance(2000);
  assert.equal(h.calls.length, 1); assert.equal(h.timers.size, 0);
});
