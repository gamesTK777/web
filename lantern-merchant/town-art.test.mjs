import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame, validateSave} from './engine.mjs';
import {drawTown, getTownPlot, isTownWalkable, townTransform, TOWN_LANDMARKS, TOWN_SPAWN} from './town-art.mjs';
import {createTownNavigation} from './town-navigation.mjs';

function freeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value); for (const part of Object.values(value)) freeze(part);
  }
  return value;
}
function town(full = false) {
  const state = newGame(20261106);
  if (full) state.plots = Array.from({length: 12}, (_, i) => ({building: i % 2 ? 'workshop' : 'cottage', level: 1 + i % 3}));
  return freeze(validateSave(state));
}
// A contract probe; image appearance and timings are verified on a real browser canvas.
function context(width = 960, height = 590, calls = []) {
  const gradient = {addColorStop() {}};
  return new Proxy({canvas: {width, height}, calls}, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === 'measureText') return text => ({width: String(text).length * 7});
      if (key === 'createLinearGradient' || key === 'createRadialGradient') return () => gradient;
      return (...args) => {
        for (const value of args) if (typeof value === 'number') assert.ok(Number.isFinite(value), `${String(key)} has a non-finite coordinate`);
        calls.push({method: key, args});
      };
    },
    set(target, key, value) { target[key] = value; return true; }
  });
}
globalThis.OffscreenCanvas = class {
  constructor(width, height) { this.width = width; this.height = height; this.context = context(width, height); }
  getContext() { return this.context; }
};

function reachable(state) {
  const queue = [{...TOWN_SPAWN}], keys = new Set([`${TOWN_SPAWN.x},${TOWN_SPAWN.y}`]);
  for (let i = 0; i < queue.length; i++) {
    const p = queue[i];
    for (const [dx, dy] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) {
      const x = p.x + dx, y = p.y + dy, key = `${x},${y}`;
      if (!keys.has(key) && isTownWalkable(x, y, state)) { keys.add(key); queue.push({x, y}); }
    }
  }
  return queue;
}

test('all facility and parcel entrances remain connected before and after all twelve plots are built', () => {
  for (const full of [false, true]) {
    const state = town(full), connected = reachable(state);
    assert.ok(isTownWalkable(TOWN_SPAWN.x, TOWN_SPAWN.y, state));
    const entrances = [...TOWN_LANDMARKS.map(b => ({name: b.name, ...b.entry})), ...Array.from({length: 12}, (_, i) => ({name: `plot ${i + 1}`, ...getTownPlot(i).entry}))];
    for (const p of entrances) {
      assert.ok(isTownWalkable(p.x, p.y, state), `${p.name} entrance is blocked`);
      assert.ok(connected.some(q => Math.hypot(q.x - p.x, q.y - p.y) <= 2), `${p.name} is disconnected from the plaza`);
    }
  }
});

test('water and building footings block movement while purchased empty plots remain usable', () => {
  const empty = town(), built = town(true);
  for (const p of [{x: 0, y: 0}, {x: 1000, y: 600}, {x: 245, y: 265}, {x: 278, y: 445}, {x: 477, y: 185}]) {
    assert.equal(isTownWalkable(p.x, p.y, empty), false);
  }
  for (let index = 0; index < 12; index++) {
    const p = getTownPlot(index), x = p.x + 45, y = p.y + 40;
    assert.equal(isTownWalkable(x, y, empty), true);
    assert.equal(isTownWalkable(x, y, built), false);
    assert.equal(isTownWalkable(p.entry.x, p.entry.y, built), true);
  }
  assert.equal(isTownWalkable(NaN, 200, empty), false);
  const n = createTownNavigation({isWalkable: isTownWalkable, spawn: {x: 245, y: 295}, reducedMotion: true});
  assert.equal(n.move(0, -1, empty), true);
  assert.ok(n.current().y >= 291, 'the explorer must stop on the near side of the trading house');
  assert.equal(n.move(0, -1, empty), false);
});

test('every parcel keeps its save index and camera-aligned hit region through zoom and resize', () => {
  const state = town(true);
  for (const [width, height] of [[320, 440], [390, 560], [960, 590], [1440, 800]]) for (const townZoom of [1, 1.5, 2]) {
    const options = {townZoom, townPlayer: TOWN_SPAWN};
    const info = drawTown(context(width, height), width, height, state, 1200, options);
    const tr = townTransform(width, height, options);
    assert.deepEqual(info.transform, tr);
    const plots = [...new Map(info.hitRegions.filter(hit => hit.type === 'plot').map(hit => [hit.index, null])).keys()]
      .map(index => info.hitRegions.find(hit => hit.type === 'plot' && hit.index === index));
    assert.equal(plots.length, 12);
    assert.deepEqual(plots.map(p => p.index), Array.from({length: 12}, (_, i) => i));
    for (const hit of plots) {
      const p = getTownPlot(hit.index);
      assert.equal(hit.x, tr.offsetX + p.x * tr.scale);
      assert.equal(hit.y, tr.offsetY + p.y * tr.scale);
      assert.equal(hit.width, p.width * tr.scale);
      assert.ok(Math.abs((hit.x + hit.width / 2 - tr.offsetX) / tr.scale - (p.x + p.width / 2)) < 1e-8);
    }
    assert.ok(info.playerScreen.x >= 0 && info.playerScreen.x <= width);
    assert.ok(info.playerScreen.y >= 0 && info.playerScreen.y <= height);
  }
});

test('visible labels and house roof bands select the plot they depict in painter priority', () => {
  const state = town(true);
  for (const [width, height] of [[390, 560], [960, 590]]) for (const townZoom of [1, 1.5, 2]) {
    const info = drawTown(context(width, height), width, height, state, 1200, {townZoom});
    const hitAt = (x, y) => [...info.hitRegions].reverse().find(hit => x >= hit.x && x <= hit.x + hit.width && y >= hit.y && y <= hit.y + hit.height);
    const lastSprite = info.hitRegions.findLastIndex(hit => 'depth' in hit);
    const labels = info.hitRegions.slice(lastSprite + 1);
    for (let index = 0; index < 12; index++) {
      const pieces = info.hitRegions.filter(hit => hit.type === 'plot' && hit.index === index);
      const label = pieces.at(-1);
      assert.equal(hitAt(label.x + label.width / 2, label.y + label.height / 2)?.index, index, 'a readable label selects its own plot');
      let exposed = 0;
      for (const roof of pieces.slice(1, 3)) for (const fx of [.05, .5, .95]) for (const fy of [.1, .5, .9]) {
        const x = roof.x + roof.width * fx, y = roof.y + roof.height * fy;
        if (labels.some(box => x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height)) continue;
        exposed++;
        assert.equal(hitAt(x, y)?.index, index, 'an exposed roof pixel selects its own plot');
      }
      assert.ok(exposed > 0, 'the roof retains a selectable visible area');
    }
    for (const id of ['trade', 'inn', 'dungeon']) {
      const label = info.hitRegions.filter(hit => hit.type === 'building' && hit.id === id).at(-1);
      assert.equal(hitAt(label.x + label.width / 2, label.y + label.height / 2)?.id, id);
    }
  }
});

test('facilities and the explorer are composited by their ground contact depth', () => {
  const state = town();
  for (const [size, foot] of [[[180, 165], 286], [[166, 151], 466]]) for (const delta of [-12, 12]) {
    const calls = [], c = context(960, 590, calls);
    drawTown(c, 960, 590, state, 1200, {townPlayer: {x: 245, y: foot + delta}}, () => calls.push({method: 'hero'}));
    const hero = calls.findIndex(v => v.method === 'hero');
    const building = calls.findIndex(v => v.method === 'drawImage' && v.args[0].width === size[0] && v.args[0].height === size[1]);
    assert.ok(hero >= 0 && building >= 0);
    assert.equal(hero < building, delta < 0);
  }
});

test('cached artwork, construction effects and navigation preserve existing town saves', () => {
  for (const state of [town(), town(true)]) {
    const before = JSON.stringify(state);
    for (const time of [0, 1200, 1500, 2400]) drawTown(context(), 960, 590, state, time, {
      selectedPlot: 0, selectedBuilding: 'trade', townPlayer: {...TOWN_SPAWN, motion: {kind: 'move', progress: .5, facing: 'left'}},
      effects: [{kind: 'build', index: 0, startedAt: 1200, duration: 1100}]
    });
    assert.equal(JSON.stringify(state), before);
    assert.deepEqual(validateSave(JSON.parse(before)).plots, state.plots);
  }
});
