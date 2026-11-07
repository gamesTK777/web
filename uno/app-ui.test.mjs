import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import * as engine from './engine.mjs';
import * as feedback from './feedback.mjs';

// Run the real application and event handlers without a network or a browser.
// Timers stay queued so CPU turns and polling cannot race these interaction checks.
class Element {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase(); this.children = []; this.attributes = {};
    this.dataset = {}; this.style = { setProperty() {} }; this.listeners = new Map();
    this.className = ''; this.hidden = false; this.disabled = false; this.open = false;
    this.value = ''; this.scrollLeft = 0; this.scrollWidth = 600; this.clientWidth = 600;
    this._text = ''; this.animationCalls = []; this.classAdds = new Map();
    this.classList = {
      contains: name => this.className.split(/\s+/).includes(name),
      add: (...names) => { for (const name of names) { if (!this.classList.contains(name)) { this.className += ' ' + name; this.classAdds.set(name, (this.classAdds.get(name) || 0) + 1); } } },
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
  getBoundingClientRect() { return { width: 98, height: 145 }; }
  animate(...args) { const result = { cancel() {} }; this.animationCalls.push(args); return result; }
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
  document.getElementById = id => { if (!ids.has(id)) throw new Error('Unknown application node: ' + id); return ids.get(id); };
  document.createElement = tag => new Element(tag);
  document.body = document.querySelector('body'); document.activeElement = document.body;
  document.hidden = false;
  return document;
}

let sequence = 0;
const card = (color, value) => ({ id: 'ui-' + sequence++, color, value });
function gameFixture({ hand = [card('red', '7'), card('blue', '2')], count = 3 } = {}) {
  return {
    players: Array.from({ length: count }, (_, i) => ({ id: i ? 'cpu-' + i : 'you', name: i ? 'CPU' + i : 'あなた', hand: i ? [card('red', '9'), card('green', '7'), card('blue', '2')] : hand })),
    deck: [card('blue', '4'), card('yellow', '8'), card('green', '2'), card('blue', '6')],
    discard: [card('red', '5')], current: 0, direction: 1, color: 'red',
    phase: 'playing', winnerId: null, drawnCardId: null, turnStartedAt: 1000, log: [],
  };
}
function roomView(game, version = 1) {
  return { roomId: 'ABCDEFGH', version, selfId: 'you', hostId: 'you', status: 'playing', players: game.players.map(({ id, name }) => ({ id, name })), game: engine.publicView(game, 'you') };
}
async function harness({ reducedMotion = false } = {}) {
  const [html, application] = await Promise.all(['index.html', 'app.mjs'].map(name => readFile(new URL(name, import.meta.url), 'utf8')));
  const document = makeDocument(html), window = new Element('window'), timers = new Map(), requests = [];
  let timerId = 0, respond = () => { throw new Error('Unexpected network request'); };
  const context = vm.createContext({
    document, window, __engine: engine, __feedback: feedback, URL, AbortController, crypto: webcrypto, console,
    location: new URL('https://example.test/uno/'), navigator: { clipboard: { writeText: async () => {} } },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    getComputedStyle: () => ({ gap: '8' }), matchMedia: () => ({ matches: reducedMotion }),
    setTimeout: (fn, delay) => { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout: id => timers.delete(id),
    requestAnimationFrame: fn => { fn(0); return ++timerId; }, cancelAnimationFrame() {},
    fetch: async (url, options) => { requests.push({ url, options }); return respond(url, options); },
  });
  window.scrollTo = () => {}; window.matchMedia = context.matchMedia;
  const hooks = `
globalThis.testHooks = {
  configure(game, online = false) {
    generation++; stopTimers(); closeWild(); mode = online ? 'online' : 'solo'; selfId = 'you';
    busy = false; unoArmed = false; lastConnectionError = ''; apiPauseUntil = 0; localGame = game;
    session = online ? {roomId:'ABCDEFGH',playerId:'you',token:'test-token'} : null;
    room = online ? {roomId:'ABCDEFGH',version:1,selfId:'you',hostId:'you',status:'playing',players:game.players.map(({id,name})=>({id,name})),game:publicView(game,selfId)} : null;
    resetHand(); render();
  },
  toggleUno, selectCard, perform, render, renderControls, acceptView, connectionError, closeWild,
  block(error = 'offline') { lastConnectionError = error; renderControls(); },
  pause() { apiPauseUntil = Date.now() + 60000; renderControls(); },
  replaceGame(game) { localGame = game; render(); },
  state() { return {unoArmed, localGame, room, pendingWild, busy}; }
};`;
  vm.runInContext(`const {createGame,applyAction,publicView,chooseCpuAction,COLORS} = __engine; const {gameFeedback,turnIdentity}=__feedback;\n` + application.replace(/^import .*;\r?$/gm, '') + hooks, context);
  return { document, node: id => document.getElementById(id), hooks: context.testHooks, requests, setRespond: fn => { respond = fn; }, key: key => document.dispatch('keydown', { key }) };
}

test('UNO selection survives unchanged online polls and is cleared when the turn leaves the player', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game, true);
  f.hooks.toggleUno(); assert.equal(f.node('unoButton').getAttribute('aria-pressed'), 'true');
  f.hooks.acceptView(roomView(game, 2)); f.hooks.acceptView(roomView(game, 2));
  assert.equal(f.hooks.state().unoArmed, true);
  const moved = structuredClone(game); moved.current = 1;
  f.hooks.acceptView(roomView(moved, 3));
  assert.equal(f.hooks.state().unoArmed, false); assert.equal(f.node('unoButton').disabled, true);
});

test('armed UNO is included in the real solo play and clears after the card leaves the hand', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game);
  f.key('u'); assert.equal(f.hooks.state().unoArmed, true);
  f.hooks.selectCard(game.players[0].hand[0].id);
  const state = f.hooks.state(); assert.equal(state.localGame.players[0].hand.length, 1);
  assert.equal(state.unoArmed, false); assert.match(state.localGame.log.map(entry => entry.text).join(' '), /UNO！/);
  assert.equal(f.node('unoButton').getAttribute('aria-pressed'), 'false');
});

test('wild-card cancellation preserves selection and confirming a color sends UNO with the play', async () => {
  const wild = card(null, 'wild'), f = await harness(), game = gameFixture({ hand: [wild, card('blue', '2')] });
  f.hooks.configure(game); f.hooks.toggleUno(); f.hooks.selectCard(wild.id);
  assert.equal(f.node('colorDialog').open, true); f.node('cancelColor').dispatch('click');
  assert.equal(f.node('colorDialog').open, false); assert.equal(f.hooks.state().unoArmed, true);
  f.hooks.selectCard(wild.id); f.document.querySelector('[data-color="green"]').dispatch('click');
  assert.equal(f.hooks.state().localGame.color, 'green'); assert.equal(f.hooks.state().localGame.players[0].hand.length, 1);
  assert.equal(f.hooks.state().unoArmed, false);
});

test('connection failures and rate-limit pauses block keyboard UNO as well as card selection', async () => {
  for (const block of ['block', 'pause']) {
    const f = await harness(), game = gameFixture(); f.hooks.configure(game, true); f.hooks[block]();
    f.key('u'); f.hooks.toggleUno(); f.hooks.selectCard(game.players[0].hand[0].id);
    assert.equal(f.hooks.state().unoArmed, false); assert.equal(f.node('unoButton').disabled, true);
    assert.equal(f.requests.length, 0); assert.equal(f.hooks.state().pendingWild, null);
  }
});

test('drawing a third card or finishing the game removes any stale UNO selection', async () => {
  for (const change of ['hand', 'finished']) {
    const f = await harness(), game = gameFixture(); f.hooks.configure(game, true); f.hooks.toggleUno();
    const next = structuredClone(game);
    if (change === 'hand') next.players[0].hand.push(card('red', '1'));
    else { next.phase = 'finished'; next.winnerId = 'cpu-1'; }
    f.hooks.acceptView(roomView(next, 2));
    assert.equal(f.hooks.state().unoArmed, false); assert.equal(f.node('unoButton').getAttribute('aria-pressed'), 'false');
    assert.equal(f.node('unoButton').disabled, true);
  }
});

test('online actions submit the selected UNO flag and only clear it after success', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game, true); f.hooks.toggleUno();
  let respond;
  f.setRespond(() => new Promise(resolve => { respond = resolve; }));
  const done = f.hooks.perform({ type: 'play', cardId: game.players[0].hand[0].id, uno: f.hooks.state().unoArmed });
  assert.equal(f.hooks.state().busy, true); assert.equal(f.hooks.state().unoArmed, true);
  assert.equal(f.node('gameScreen').dataset.turn, 'updating');
  const submitted = JSON.parse(f.requests[0].options.body).action; assert.equal(submitted.uno, true);
  const played = engine.applyAction(game, 'you', submitted, { now: 2000 });
  respond({ ok: true, json: async () => ({ view: roomView(played, 2) }) }); await done;
  assert.equal(f.hooks.state().busy, false); assert.equal(f.hooks.state().unoArmed, false);
  assert.equal(f.hooks.state().room.game.hand.length, 1);
});

test('unchanged online conflict preserves UNO selection and restores usable controls', async () => {
  const f = await harness(), game = gameFixture(); f.hooks.configure(game, true); f.hooks.toggleUno();
  f.setRespond(async () => ({ ok: false, status: 409, json: async () => ({ error: 'version conflict', view: roomView(game, 2) }) }));
  await f.hooks.perform({ type: 'play', cardId: game.players[0].hand[0].id, uno: true });
  assert.equal(f.hooks.state().unoArmed, true); assert.equal(f.hooks.state().busy, false);
  assert.equal(f.node('unoButton').disabled, false); assert.equal(f.node('unoButton').getAttribute('aria-pressed'), 'true');
});

test('turn arrival animates once across polls and a playable draw, then again on a new same-player turn', async () => {
  const f = await harness(), game = gameFixture({ count: 2, hand: [card('red', 'skip'), card('blue', '2')] });
  f.hooks.configure(game, true); const notice = f.node('handTurnStatus');
  assert.equal(notice.animationCalls.length, 1);
  f.hooks.acceptView(roomView(game, 2)); f.hooks.toggleUno(); f.hooks.acceptView(roomView(game, 3));
  assert.equal(notice.animationCalls.length, 1);
  const drawingGame = structuredClone(game); drawingGame.deck.push(card('red', '4'));
  const drawn = engine.applyAction(drawingGame, 'you', { type: 'draw' }, { now: 2000 });
  assert.equal(engine.publicView(drawn, 'you').currentPlayerId, 'you');
  f.hooks.acceptView(roomView(drawn, 4)); assert.equal(notice.animationCalls.length, 1);
  const skipped = engine.applyAction(game, 'you', { type: 'play', cardId: game.players[0].hand[0].id, uno: true }, { now: 3000 });
  assert.equal(engine.publicView(skipped, 'you').currentPlayerId, 'you');
  f.hooks.acceptView(roomView(skipped, 5)); assert.equal(notice.animationCalls.length, 2);
  f.hooks.acceptView(roomView(skipped, 6)); assert.equal(notice.animationCalls.length, 2);
});

test('reduced-motion keeps the own-turn message visible without playing an arrival animation', async () => {
  const f = await harness({ reducedMotion: true }); f.hooks.configure(gameFixture());
  assert.equal(f.node('handTurnStatus').animationCalls.length, 0);
  assert.equal(f.node('gameScreen').dataset.turn, 'self');
  assert.match(f.node('handTurnTitle').textContent, /あなたの番/);
});
