import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import * as engine from './engine.mjs';
import * as arcade from './arcade.mjs';
import * as tiles from './tiles.mjs';
import * as cast from './cast.mjs';
import * as encounterModule from './encounter.mjs';

// The actual app handlers and engine run with queued timers. This checks that
// a conversation gates the real round, rather than testing a parallel mock app.
class Element {
  constructor(tag = 'div') { this.tagName = tag.toUpperCase(); this.dataset = {}; this.listeners = new Map(); this.children = []; this.style = { setProperty() {} }; this.open = false; this.disabled = false; this.hidden = false; this.value = ''; this._html = ''; this._text = ''; this.classList = { add() {}, remove() {}, toggle() {} }; }
  set innerHTML(value) { this._html = value; this.children = []; const img = value.match(/<img\s+[^>]*src="([^"]*)"[^>]*>/); if (img) { const node = new Element('img'); node.src = img[1]; this.children.push(node); } }
  get innerHTML() { return this._html; }
  set textContent(value) { this._text = String(value); }
  get textContent() { return this._text; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  querySelector(selector) { return this.children.find(node => node.matches(selector)) || null; }
  matches(selector) { return selector.split(',').some(part => part.trim() === this.tagName.toLowerCase() || part.trim() === 'dialog[open]' && this.tagName === 'DIALOG' && this.open || part.trim() === '[data-tile-index]' && this.dataset.tileIndex !== undefined); }
  closest(selector) { return this.matches(selector) ? this : null; }
  addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(fn); }
  dispatch(type, extras = {}) { const event = { type, target: this, key: '', repeat: false, preventDefault() { this.defaultPrevented = true; }, ...extras }; for (const fn of this.listeners.get(type) || []) fn(event); this['on' + type]?.(event); return event; }
  click() { if (!this.disabled) this.dispatch('click'); }
  showModal() { this.open = true; }
  close() { if (this.open) { this.open = false; this.dispatch('close'); } }
  scrollIntoView() {}
}

async function harness() {
  const [html, source] = await Promise.all(['index.html', 'app.mjs'].map(name => readFile(new URL(name, import.meta.url), 'utf8')));
  const nodes = new Map();
  for (const [, tag, attrs, id] of html.matchAll(/<([a-z][\w-]*)([^>]*\bid="([^"]+)"[^>]*)>/gi)) { const node = new Element(tag); node.id = id; node.disabled = /\sdisabled(?:\s|>|$)/.test(attrs); nodes.set(id, node); }
  const document = new Element('document'); document.hidden = false; document.documentElement = new Element('html');
  document.getElementById = id => { assert.ok(nodes.has(id), 'actual app node exists: ' + id); return nodes.get(id); };
  document.createElement = tag => new Element(tag);
  document.querySelectorAll = selector => [...nodes.values()].filter(node => node.matches(selector));
  document.querySelector = selector => document.querySelectorAll(selector)[0] || null;
  const timers = new Map(); let timerId = 0;
  const context = vm.createContext({ document, window: {}, console, structuredClone, AbortController,
    __engine: engine, __arcade: arcade, __tiles: tiles, __cast: cast, __encounter: encounterModule, createdRounds: 0,
    setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout(id) { timers.delete(id); },
    fetch: async url => ({ ok: true, json: async () => String(url).endsWith('/config') ? { version: 0, stages: cast.CAST.map(p => ({ id: p.id, name: `ステージ${p.id}の対戦相手`, portrait: null, rewards: [null, null, null], accent: '#315f6b' })) } : { id: 'test-session', entries: [] } })
  });
  const imports = `const {actRound,legalActions,publicView}=__engine; const createRound=options=>{createdRounds++;return __engine.createRound({...options,seed:1});}; const {createArcade,finishBattle,advanceArcade,retryStage}=__arcade; const {tileHTML,tileName,portraitPlaceholder}=__tiles; const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast; const {createEncounter,advanceEncounter,skipEncounter}=__encounter;`;
  const hooks = `globalThis.hooks={ready:configReady,startBattle,nextEncounter,skipConversation,beginBattleRound,step,scheduleCpu,
    begin({stage=1,battle=1,portrait=null,name,retries=0}={}){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();run=createArcade();Object.assign(run,{stage,battle,retries,totalBattles:battle-1});runConfig=structuredClone(defaults);if(portrait)runConfig.stages[stage-1].portrait=portrait;if(name)runConfig.stages[stage-1].name=name;started=true;ended=false;encounter=null;round=null;startBattle();},
    reward(stage,win,custom=null){const result={winner:0,points:2000,han:1,fu:30};run={...createArcade(),stage,battle:win,wins:win-1};run=finishBattle(run,result);round={result};runConfig=structuredClone(defaults);if(custom)runConfig.stages[stage-1].rewards[win-1]=custom;showBattleResult();},
    state(){return{run,round,encounter,createdRounds};}};`;
  vm.runInContext(imports + source.replace(/^import .*;\r?$/gm, '') + hooks, context);
  await context.hooks.ready;
  return { hooks: context.hooks, node: id => nodes.get(id), timers, document };
}

test('every battle waits for its encounter before a real round is created or CPU timer is scheduled', async () => {
  const f = await harness();
  for (let stage = 1; stage <= 7; stage++) for (let battle = 1; battle <= 3; battle++) {
    f.hooks.begin({ stage, battle }); const before = f.hooks.state().createdRounds;
    assert.equal(f.node('encounterDialog').open, true); assert.equal(f.hooks.state().round, null);
    f.hooks.beginBattleRound(); f.hooks.scheduleCpu(); f.hooks.step({ type: 'cpu' });
    assert.equal(f.hooks.state().createdRounds, before); assert.equal(f.timers.size, 0);
    const lines = f.hooks.state().encounter.lines.length;
    for (let i = 1; i < lines; i++) { f.hooks.nextEncounter(); assert.equal(f.hooks.state().round, null); }
    f.hooks.nextEncounter(); assert.equal(f.hooks.state().createdRounds, before + 1); assert.ok(f.hooks.state().round);
    assert.equal(f.node('encounterDialog').open, false); assert.equal(f.hooks.state().encounter, null);
    f.hooks.nextEncounter(); assert.equal(f.hooks.state().createdRounds, before + 1);
  }
});

test('skip starts exactly one real round and CPU dealer waits until that explicit action', async () => {
  const f = await harness(); f.hooks.begin({ stage: 4, battle: 2 });
  assert.equal(f.timers.size, 0); assert.equal(f.hooks.state().round, null);
  f.node('encounterSkip').click(); assert.equal(f.hooks.state().createdRounds, 1);
  assert.equal(f.hooks.state().round.phase, 'cpu'); assert.equal(f.timers.size, 1);
  f.node('encounterSkip').click(); assert.equal(f.hooks.state().createdRounds, 1);
  assert.equal(f.node('cpuName').textContent, '橘朱音');
});

test('dialog cannot escape into gameplay, and repeated keys do not skip dialogue lines', async () => {
  const f = await harness(); f.hooks.begin();
  assert.equal(f.node('encounterDialog').dispatch('cancel').defaultPrevented, true);
  f.document.dispatch('keydown', { key: 'Enter' }); assert.equal(f.hooks.state().round, null);
  f.node('encounterDialog').dispatch('keydown', { key: 'ArrowRight', repeat: true }); assert.equal(f.hooks.state().encounter.index, 0);
  f.node('encounterDialog').dispatch('keydown', { key: 'ArrowRight' }); assert.equal(f.hooks.state().encounter.index, 1);
  const syntheticTile = new Element('button'); syntheticTile.dataset.tileIndex = '0';
  f.node('playerHand').dispatch('click', { target: syntheticTile }); f.node('playerHand').dispatch('click', { target: syntheticTile });
  assert.equal(f.hooks.state().round, null); assert.equal(f.hooks.state().createdRounds, 0);
});

test('all 21 win slots select the matching person and image; custom images fall back safely', async () => {
  const f = await harness();
  for (let stage = 1; stage <= 7; stage++) for (let win = 1; win <= 3; win++) {
    f.hooks.reward(stage, win); assert.equal(f.node('rewardImage').src, cast.defaultRewardURL(stage, win));
    assert.ok(f.node('rewardDescription').textContent.includes(cast.getCast(stage).rewards[win - 1]));
    assert.equal(f.node('rewardImage').hidden, false);
  }
  f.hooks.reward(2, 2, 'test-upload'); assert.match(f.node('rewardImage').src, /\/api\/mahjong\/assets\/test-upload$/);
  f.node('rewardImage').onerror(); assert.equal(f.node('rewardImage').src, cast.defaultRewardURL(2, 2));
  f.node('rewardImage').onerror(); assert.equal(f.node('rewardImage').hidden, true); assert.equal(f.node('rewardPlaceholder').hidden, false);
});

test('custom character name and portrait override defaults, with a bundled-image recovery path', async () => {
  const f = await harness(); f.hooks.begin({ stage: 3, name: '独自のキャラクター', portrait: 'portrait-upload' });
  assert.equal(f.node('encounterName').textContent, '独自のキャラクター');
  assert.ok(f.node('encounterSpeech').textContent.includes('独自のキャラクター'));
  const image = f.node('encounterPortrait').querySelector('img'); assert.match(image.src, /portrait-upload$/);
  image.onerror(); assert.equal(image.src, cast.defaultPortraitURL(3));
  image.onerror(); assert.ok(f.node('encounterPortrait').innerHTML.includes('画像を読み込めません'));
});
