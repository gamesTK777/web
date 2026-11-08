import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import * as engine from './engine.mjs';
import * as feedback from './feedback.mjs';
import * as presentation from './presentation.mjs';

// Execute the real app and rule engine. Only the browser, transport, and final
// audio/animation devices are replaced, so assertions exercise FX coordination.
class Element {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase(); this.children = []; this.attributes = {};
    this.dataset = {}; this.style = { setProperty() {} }; this.listeners = new Map();
    this.className = ''; this.hidden = false; this.disabled = false; this.open = false;
    this.value = ''; this.scrollLeft = 0; this.scrollWidth = 600; this.clientWidth = 600; this._text = '';
    this.classList = {
      contains: name => this.className.split(/\s+/).includes(name),
      add: (...names) => { for (const name of names) if (!this.classList.contains(name)) this.className += ' ' + name; },
      remove: (...names) => { this.className = this.className.split(/\s+/).filter(name => !names.includes(name)).join(' '); },
      toggle: (name, force) => { const next = force ?? !this.classList.contains(name); this.classList[next ? 'add' : 'remove'](name); return next; },
    };
  }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
  get firstElementChild() { return this.children[0] || null; }
  get offsetWidth() { return this.clientWidth; }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
    if (name === 'class') this.className = String(value);
    if (name === 'id') this.id = String(value);
    if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = String(value);
    if (['hidden', 'disabled', 'open'].includes(name)) this[name] = true;
    if (name === 'value') this.value = String(value);
  }
  getAttribute(name) { return name === 'class' ? this.className : this.attributes[name] ?? null; }
  removeAttribute(name) { delete this.attributes[name]; if (['hidden', 'disabled', 'open'].includes(name)) this[name] = false; }
  append(...children) { for (const child of children) { child.parentElement = this; this.children.push(child); } }
  replaceChildren(...children) { this._text = ''; this.children = []; this.append(...children); }
  after() {}
  addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(fn); }
  dispatch(type, extra = {}) { const event = { type, target: this, preventDefault() {}, stopPropagation() {}, ...extra }; for (const fn of this.listeners.get(type) || []) fn(event); }
  matches(selector) {
    if (selector.includes(',')) return selector.split(',').some(item => this.matches(item.trim()));
    if (selector.endsWith(':not(:disabled)')) return !this.disabled && this.matches(selector.slice(0, -15));
    const attr = selector.match(/^(.*?)\[([^=\]]+)(?:=["']?([^"'\]]+)["']?)?\]$/);
    if (attr) return (!attr[1] || this.matches(attr[1])) && (attr[2] === 'open' ? this.open : this.getAttribute(attr[2]) !== null && (attr[3] === undefined || this.getAttribute(attr[2]) === attr[3]));
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    if (selector.startsWith('#')) return this.id === selector.slice(1);
    return this.tagName.toLowerCase() === selector.toLowerCase();
  }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) || null; }
  showModal() { this.open = true; }
  close() { this.open = false; }
  focus() {}
  scrollIntoView() {}
  getBoundingClientRect() { return { x: 20, y: 30, width: 98, height: 145 }; }
  animate() { return { cancel() {} }; }
}

function makeDocument(html) {
  const document = new Element('document'), stack = [document], ids = new Map();
  for (const [, closing, tag, attributes] of html.matchAll(/<(\/?)([a-z][\w-]*)([^>]*)>/gi)) {
    if (closing) { while (stack.length > 1 && stack.at(-1).tagName.toLowerCase() !== tag.toLowerCase()) stack.pop(); if (stack.length > 1) stack.pop(); continue; }
    const node = new Element(tag);
    for (const [, key, quoted, single, bare] of attributes.matchAll(/([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) node.setAttribute(key, quoted ?? single ?? bare ?? '');
    stack.at(-1).append(node); if (node.id) ids.set(node.id, node);
    if (!['meta', 'link', 'input', 'br', 'hr', 'img', 'source'].includes(tag.toLowerCase())) stack.push(node);
  }
  document.getElementById = id => { assert.ok(ids.has(id), 'Application HTML contains #' + id); return ids.get(id); };
  document.createElement = tag => new Element(tag);
  document.body = document.querySelector('body'); document.activeElement = document.body; document.hidden = false;
  return document;
}

let sequence = 0;
const card = (color, value) => ({ id: 'fx-' + sequence++, color, value });
function gameFixture({ hand, count = 3, now = 1000 } = {}) {
  const game = engine.createGame(Array.from({ length: count }, (_, i) => ({ id: i ? 'cpu-' + i : 'you', name: i ? 'CPU' + i : 'あなた' })), { rng: () => .31, now });
  for (const seat of game.players) seat.hand = [card('red', '7'), card('blue', '2'), card('green', '3')];
  if (hand) game.players[0].hand = hand;
  game.deck = Array.from({ length: 18 }, (_, i) => card(i % 2 ? 'blue' : 'green', String(i % 10)));
  game.discard = [card('red', '5')]; game.color = 'red';
  return game;
}
function roomView(game, version = 1) {
  return { roomId: 'ABCDEFGH', version, selfId: 'you', hostId: 'you', status: 'playing', players: game.players.map(({ id, name }) => ({ id, name })), game: engine.publicView(game, 'you') };
}

async function harness() {
  const [html, application] = await Promise.all(['index.html', 'app.mjs'].map(name => readFile(new URL(name, import.meta.url), 'utf8')));
  const document = makeDocument(html), window = new Element('window'), timers = new Map(), audioCalls = [], motionCalls = [], requests = [];
  let timerId = 0, respond = () => { throw new Error('Unexpected network request'); }, audioStops = 0, motionStops = 0, unlocks = 0;
  class RecordingAudio {
    constructor({ onChange, enabled = true, volume = .7 }) { this.enabled = enabled; this.volume = volume; this.changed = onChange; this.unlocked = false; this.pending = []; this.changed(this.state()); }
    state() { return { supported: true, enabled: this.enabled, volume: this.volume, unlocked: this.unlocked, blocked: false }; }
    unlock() { this.unlocked = true; unlocks++; this.changed(this.state()); return true; }
    play(kind, options = {}) { const call = { kind, ...options }; audioCalls.push(call); if (this.enabled && this.unlocked && this.volume > 0) this.pending.push(call); }
    stop() { audioStops++; this.pending.length = 0; }
    setEnabled(value) { this.enabled = value; this.changed(this.state()); }
    setVolume(value) { this.volume = value; this.changed(this.state()); }
  }
  class RecordingMotion {
    receive(options) { motionCalls.push({ kind: 'receive', ...options }); }
    play(options) { motionCalls.push({ kind: 'play', ...options }); }
    stop() { motionStops++; }
  }
  const context = vm.createContext({
    document, window, __engine: engine, __feedback: feedback, __presentation: presentation, UnoAudio: RecordingAudio, UnoMotion: RecordingMotion,
    URL, AbortController, crypto: webcrypto, console,
    location: new URL('https://example.test/uno/'), navigator: { clipboard: { writeText: async () => {} } },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    getComputedStyle: () => ({ gap: '8' }), matchMedia: () => ({ matches: false }),
    setTimeout: (fn, delay) => { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout: id => timers.delete(id),
    requestAnimationFrame: fn => { fn(0); return ++timerId; }, cancelAnimationFrame() {},
    fetch: async (url, options) => { requests.push({ url, options }); return respond(url, options); },
  });
  window.scrollTo = () => {}; window.matchMedia = context.matchMedia;
  const hooks = `
globalThis.testHooks = {
  configure(game, {online = true, deal = false, lobby = false} = {}) {
    generation++; stopTimers(); closeWild(); mode = online ? 'online' : 'solo'; selfId = 'you';
    busy = false; unoArmed = false; lastConnectionError = ''; apiPauseUntil = 0; localGame = online ? null : game;
    session = online ? {roomId:'ABCDEFGH',playerId:'you',token:'test-token'} : null;
    room = online ? {roomId:'ABCDEFGH',version:1,selfId:'you',hostId:'you',status:lobby?'lobby':'playing',players:game.players.map(({id,name})=>({id,name})),game:lobby?null:publicView(game,selfId)} : null;
    resetHand({deal}); render();
  },
  startSolo, toggleUno, selectCard, perform, render, renderControls, acceptView, goHome, scheduleCpu,
  unlock() { unoAudio.unlock(); },
  replaceGame(game) { localGame = game; render(); },
  state() { return {mode, localGame, room, unoArmed, fxSnapshot, initialDealPending, pendingAudio:unoAudio.pending, generation}; }
};`;
  vm.runInContext(`const {createGame,applyAction,publicView,chooseCpuAction,COLORS}=__engine; const {gameFeedback,turnIdentity}=__feedback; const {snapshotPublicGame,diffPublicSnapshots}=__presentation;\n` + application.replace(/^import .*;\r?$/gm, '') + hooks, context);
  const node = id => document.getElementById(id);
  return {
    document, window, node, hooks: context.testHooks, audioCalls, motionCalls, requests, timers,
    setRespond: fn => { respond = fn; },
    clear() { audioCalls.length = 0; motionCalls.length = 0; },
    counts: () => ({ audioStops, motionStops, unlocks }),
    sounds: kind => audioCalls.filter(call => call.kind === kind),
    incomingIds: () => motionCalls.filter(call => call.kind === 'receive').flatMap(call => [...call.targets].map(target => target.dataset.cardId).filter(Boolean)),
  };
}

test('opening the page is silent; solo start deals exactly seven visible own cards once', async () => {
  const f = await harness(); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0); assert.equal(f.counts().unlocks, 0);
  f.node('soloCount').value = '4'; f.node('soloStart').dispatch('click');
  const visible = engine.publicView(f.hooks.state().localGame, 'you');
  assert.equal(visible.hand.length, 7); assert.deepEqual(f.incomingIds().sort(), visible.hand.map(card => card.id).sort());
  assert.equal(f.sounds('deal').length, 7); assert.equal(f.sounds('play').length, 0); assert.equal(f.sounds('uno').length, 0); assert.equal(f.counts().unlocks, 1);
  const receive = f.motionCalls.find(call => call.kind === 'receive'); assert.equal(receive.source, f.node('drawPile')); assert.equal(receive.initial, true); assert.ok(receive.targets.length <= 12);
  assert.equal(Object.hasOwn(receive, 'card'), false, 'incoming cards expose no opponent faces');
  f.clear(); f.hooks.render(); f.hooks.renderControls(); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
});

test('an ordinary draw animates only the new own card and unchanged polls do not repeat it', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game); f.hooks.unlock(); f.clear();
  const next = engine.applyAction(game, 'you', { type: 'draw' }, { now: 2000 });
  const before = new Set(engine.publicView(game, 'you').hand.map(card => card.id));
  const expected = engine.publicView(next, 'you').hand.filter(card => !before.has(card.id)).map(card => card.id);
  f.hooks.acceptView(roomView(next, 2)); assert.deepEqual(f.incomingIds(), expected); assert.equal(f.sounds('draw').length, 1); assert.equal(f.sounds('play').length, 0);
  f.clear(); f.hooks.acceptView(roomView(next, 2)); f.hooks.acceptView(roomView(next, 3)); f.hooks.render(); f.hooks.renderControls();
  assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
});

test('draw-two and draw-four polls identify every actual new own card, with no hidden hand faces', async () => {
  for (const value of ['draw2', 'wild4']) {
    const f = await harness(), game = gameFixture(); game.current = 2;
    const attack = card(value === 'draw2' ? 'red' : null, value);
    game.players[2].hand = [attack, card('blue', '8'), card('green', '1')];
    f.hooks.configure(game); f.hooks.unlock(); f.clear();
    const actorRow = f.node('opponents').children.find(node => node.dataset.playerId === 'cpu-2');
    actorRow.getBoundingClientRect = () => ({ x: 401, y: 80, width: 100, height: 60 });
    const next = engine.applyAction(game, 'cpu-2', { type: 'play', cardId: attack.id, color: 'blue' }, { now: 2000 });
    const old = new Set(engine.publicView(game, 'you').hand.map(card => card.id));
    const expected = engine.publicView(next, 'you').hand.filter(card => !old.has(card.id)).map(card => card.id);
    assert.equal(expected.length, value === 'draw2' ? 2 : 4);
    f.hooks.acceptView(roomView(next, 2)); assert.deepEqual(f.incomingIds(), expected); assert.equal(f.sounds('draw').length, expected.length); assert.equal(f.sounds('play').length, 1);
    const played = f.motionCalls.find(call => call.kind === 'play'); assert.equal(played.from.x, 401); assert.equal(played.card.id, engine.publicView(next, 'you').topCard.id);
    const receive = f.motionCalls.find(call => call.kind === 'receive'); assert.equal(Object.hasOwn(receive, 'card'), false);
  }
});

test('arming and cancelling UNO is silent; a confirmed play voices UNO exactly once', async () => {
  const playable = card('red', '7'), game = gameFixture({ hand: [playable, card('blue', '2')] }), f = await harness();
  f.hooks.configure(game, { online: false }); f.hooks.unlock(); f.clear();
  f.hooks.toggleUno(); f.hooks.toggleUno(); f.hooks.toggleUno(); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  const oldButton = f.node('hand').children.find(node => node.dataset.cardId === playable.id);
  oldButton.getBoundingClientRect = () => ({ x: 153, y: 444, width: 98, height: 145 });
  f.hooks.selectCard(playable.id); assert.equal(f.sounds('play').length, 1); assert.equal(f.sounds('uno').length, 1); assert.equal(f.incomingIds().length, 0);
  assert.equal(f.motionCalls.find(call => call.kind === 'play').from.x, 153, 'play source is captured before the old hand DOM is replaced');
  f.clear(); f.hooks.render(); f.hooks.renderControls(); assert.equal(f.audioCalls.length, 0);
});

test('missing an UNO declaration animates both penalty cards despite a net gain of only one', async () => {
  const playable = card('red', '7'), game = gameFixture({ hand: [playable, card('blue', '2')] }), f = await harness();
  f.hooks.configure(game, { online: false }); f.hooks.unlock(); f.clear();
  const before = new Set(engine.publicView(game, 'you').hand.map(card => card.id));
  f.hooks.selectCard(playable.id);
  const after = engine.publicView(f.hooks.state().localGame, 'you');
  const expected = after.hand.filter(card => !before.has(card.id)).map(card => card.id);
  assert.equal(after.hand.length, 3); assert.equal(expected.length, 2); assert.deepEqual(f.incomingIds(), expected);
  assert.equal(f.sounds('draw').length, 2); assert.equal(f.sounds('uno').length, 0);
});

test('online actions stay silent until success, and failed or unchanged conflict replies create no FX', async () => {
  const playable = card('red', '7'), game = gameFixture({ hand: [playable, card('blue', '2')] }), f = await harness();
  f.hooks.configure(game); f.hooks.unlock(); f.hooks.toggleUno(); f.clear();
  for (const status of [500, 409]) {
    f.setRespond(async () => ({ ok: false, status, json: async () => ({ error: 'test rejection', ...(status === 409 ? { view: roomView(game, 2) } : {}) }) }));
    await f.hooks.perform({ type: 'play', cardId: playable.id, uno: true });
    assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  }
  // Reconnect clears the intentionally surfaced transport failure before retry.
  f.hooks.acceptView(roomView(game, 3));
  let reply; f.setRespond(() => new Promise(resolve => { reply = resolve; }));
  const pending = f.hooks.perform({ type: 'play', cardId: playable.id, uno: true });
  assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  const next = engine.applyAction(game, 'you', { type: 'play', cardId: playable.id, uno: true }, { now: 2000 });
  reply({ ok: true, json: async () => ({ view: roomView(next, 4) }) }); await pending;
  assert.equal(f.sounds('play').length, 1); assert.equal(f.sounds('uno').length, 1);
  f.clear(); f.hooks.acceptView(roomView(next, 5)); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
});

test('reconnect establishes a silent baseline, while lobby start and rematch deal a fresh hand', async () => {
  const first = gameFixture(), f = await harness(); f.hooks.unlock();
  f.hooks.configure(first); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  const live = gameFixture({ now: 2000 }); f.hooks.configure(first, { lobby: true }); f.clear();
  f.hooks.acceptView(roomView(live, 2)); assert.equal(f.sounds('deal').length, 3); assert.deepEqual(f.incomingIds().sort(), engine.publicView(live, 'you').hand.map(card => card.id).sort());
  f.clear(); const finished = structuredClone(live); finished.phase = 'finished'; finished.winnerId = 'cpu-1';
  f.hooks.acceptView(roomView(finished, 3)); assert.equal(f.sounds('win').length, 1);
  f.clear(); const rematch = gameFixture({ now: 3000 }); f.hooks.acceptView(roomView(rematch, 4));
  assert.equal(f.sounds('deal').length, 3); assert.equal(f.sounds('play').length, 0); assert.equal(f.sounds('uno').length, 0); assert.equal(f.sounds('win').length, 0);
  f.clear(); f.hooks.acceptView(roomView(rematch, 5)); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
});

test('hidden snapshots advance the baseline without replaying stale effects on visibility restoration', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game); f.hooks.unlock(); f.clear();
  const next = engine.applyAction(game, 'you', { type: 'draw' }, { now: 2000 });
  f.document.hidden = true; f.hooks.acceptView(roomView(next, 2)); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  f.document.hidden = false; f.hooks.acceptView(roomView(next, 3)); f.hooks.render();
  assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  assert.equal(f.hooks.state().fxSnapshot.handIds.length, engine.publicView(next, 'you').hand.length);
});

test('audio settings pause solo CPU timers and hidden or exited pages cancel the presentation', async () => {
  const f = await harness(), game = gameFixture(); game.current = 1; f.hooks.configure(game, { online: false }); f.hooks.unlock();
  f.hooks.scheduleCpu(); assert.equal(f.timers.size, 1);
  const before = f.counts(); f.node('gameAudioSettings').dispatch('click');
  assert.equal(f.node('audioDialog').open, true); assert.equal(f.timers.size, 0);
  assert.ok(f.counts().audioStops > before.audioStops); assert.ok(f.counts().motionStops > before.motionStops);
  f.node('audioDialog').close(); f.node('audioDialog').dispatch('close'); assert.equal(f.timers.size, 1);
  const closing = f.counts(); f.document.hidden = true; f.document.dispatch('visibilitychange');
  assert.equal(f.timers.size, 0); assert.ok(f.counts().audioStops > closing.audioStops); assert.ok(f.counts().motionStops > closing.motionStops);
  f.document.hidden = false; f.document.dispatch('visibilitychange'); assert.equal(f.timers.size, 1);
  const hiding = f.counts(); f.window.dispatch('pagehide'); assert.equal(f.timers.size, 0);
  assert.ok(f.counts().audioStops > hiding.audioStops); assert.ok(f.counts().motionStops > hiding.motionStops);
  f.window.dispatch('pageshow'); assert.equal(f.timers.size, 1);
});

test('online updates during audio settings advance silently and do not replay after closing', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game); f.hooks.unlock(); f.clear();
  f.node('gameAudioSettings').dispatch('click');
  const next = engine.applyAction(game, 'you', { type: 'draw' }, { now: 2000 });
  f.hooks.acceptView(roomView(next, 2)); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  f.node('audioDialog').close(); f.node('audioDialog').dispatch('close');
  f.hooks.acceptView(roomView(next, 3)); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
  assert.equal(f.hooks.state().fxSnapshot.handIds.length, engine.publicView(next, 'you').hand.length);
});

test('returning home stops ongoing effects and prevents a late online action from recreating them', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game); f.hooks.unlock(); f.clear();
  let reply; f.setRespond(() => new Promise(resolve => { reply = resolve; }));
  const pending = f.hooks.perform({ type: 'draw' });
  const before = f.counts(); f.hooks.goHome(); assert.ok(f.counts().audioStops > before.audioStops); assert.ok(f.counts().motionStops > before.motionStops); assert.equal(f.hooks.state().pendingAudio.length, 0);
  const next = engine.applyAction(game, 'you', { type: 'draw' }, { now: 2000 });
  reply({ ok: true, json: async () => ({ view: roomView(next, 2) }) }); await pending;
  assert.equal(f.hooks.state().mode, 'home'); assert.equal(f.hooks.state().fxSnapshot, null); assert.equal(f.audioCalls.length, 0); assert.equal(f.motionCalls.length, 0);
});
