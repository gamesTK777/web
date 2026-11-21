import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import * as engine from './engine.mjs';
import * as arcade from './arcade.mjs';
import * as tiles from './tiles.mjs';
import * as cast from './cast.mjs';
import * as encounterModule from './encounter.mjs';
import * as voiceLines from './voice-lines.mjs';
import * as rewardMedia from './reward-media.mjs';

// The actual app handlers and engine run with queued timers. This checks that
// a conversation gates the real round, rather than testing a parallel mock app.
class Element {
  constructor(tag = 'div') { this.tagName = tag.toUpperCase(); this.dataset = {}; this.listeners = new Map(); this.children = []; this.style = { setProperty() {} }; this.open = false; this.disabled = false; this.hidden = false; this.value = ''; this._html = ''; this._text = ''; this.classList = { add() {}, remove() {}, toggle() {} }; }
  set innerHTML(value) { this._html = value; this.children = []; const img = value.match(/<img\s+[^>]*src="([^"]*)"[^>]*>/); if (img) { const node = new Element('img'); node.src = img[1]; this.children.push(node); } }
  get innerHTML() { return this._html; }
  set textContent(value) { this._text = String(value); }
  get textContent() { return this._text; }
  setAttribute(name,value) { this[name]=String(value); }
  getAttribute(name) { return this[name]??null; }
  removeAttribute(name) { if(name==='autoplay'){this.autoplay=false;return;}delete this[name]; }
  append(...nodes) { for (const node of nodes) node.parentElement = this; this.children.push(...nodes); }
  get lastElementChild() { return this.children.at(-1); }
  remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(node => node !== this); }
  replaceChildren(...nodes) { this.children = nodes; }
  querySelector(selector) { return this.children.find(node => node.matches(selector)) || null; }
  matches(selector) { return selector.split(',').some(part => {part=part.trim();const data=part.match(/^\[data-([\w-]+)\]$/);return part===this.tagName.toLowerCase()||part==='dialog[open]'&&this.tagName==='DIALOG'&&this.open||data&&this.dataset[data[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]!==undefined;}); }
  closest(selector) {
    if (selector === 'button[data-tile-index]') return this.tagName === 'BUTTON' && 'tileIndex' in this.dataset ? this : null;
    return this.matches(selector) ? this : null;
  }
  addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(fn); }
  removeEventListener(type, fn) { this.listeners.set(type, (this.listeners.get(type) || []).filter(callback => callback !== fn)); }
  dispatch(type, extras = {}) { const event = { type, target: this, key: '', repeat: false, preventDefault() { this.defaultPrevented = true; }, ...extras }; for (const fn of this.listeners.get(type) || []) fn(event); this['on' + type]?.(event); return event; }
  click() { if (!this.disabled) this.dispatch('click'); }
  showModal() { this.open = true; }
  close() { if (this.open) { this.open = false; this.dispatch('close'); } }
  pause() {this.paused=true;this.pauseCalls=(this.pauseCalls||0)+1;}
  load() {this.loadCalls=(this.loadCalls||0)+1;this.currentTime=0;}
  play() {this.playCalls=(this.playCalls||0)+1;this.paused=false;this.dispatch('play');return Promise.resolve();}
  scrollIntoView() {}
  focus() {}
}

async function harness({mediaTypes={}, withTable=false}={}) {
  const [html, source] = await Promise.all(['index.html', 'app.mjs'].map(name => readFile(new URL(name, import.meta.url), 'utf8')));
  const nodes = new Map();
  for (const [, tag, attrs, id] of html.matchAll(/<([a-z][\w-]*)([^>]*\bid="([^"]+)"[^>]*)>/gi)) { const node = new Element(tag); node.id = id; node.disabled = /\sdisabled(?:\s|>|$)/.test(attrs); nodes.set(id, node); }
  const document = new Element('document'); document.hidden = false; document.documentElement = new Element('html');
  document.getElementById = id => { assert.ok(nodes.has(id), 'actual app node exists: ' + id); return nodes.get(id); };
  document.createElement = tag => new Element(tag);
  document.querySelectorAll = selector => [...nodes.values()].filter(node => node.matches(selector));
  document.querySelector = selector => document.querySelectorAll(selector)[0] || null;
  const timers = new Map(); let timerId = 0;
  const context = vm.createContext({ document, window: new Element('window'), console, structuredClone, AbortController,
    __engine: engine, __arcade: arcade, __tiles: tiles, __cast: cast, __encounter: encounterModule, __voiceLines: voiceLines,__rewardMedia:rewardMedia, createdRounds: 0,
    setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout(id) { timers.delete(id); },
    fetch: async url => ({ ok: true, json: async () => String(url).endsWith('/config') ? { version: 0, mediaTypes, stages: cast.CAST.map(p => ({ id: p.id, name: `ステージ${p.id}の対戦相手`, portrait: null, rewards: [null, null, null], accent: '#315f6b' })) } : { id: 'test-session', entries: [] } })
  });
  const imports = `const {actRound,legalActions,publicView}=__engine; const createRound=options=>{createdRounds++;return __engine.createRound({...options,seed:1});}; const {createArcade,finishBattle,advanceArcade,retryStage}=__arcade; const {tileHTML,tileName,portraitPlaceholder}=__tiles; const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast; const {createEncounter,advanceEncounter,skipEncounter}=__encounter; const {chooseVoiceLine}=__voiceLines;const {createStageRewardVideo,stageRewardVideoId}=__rewardMedia;`;
  const hooks = `globalThis.hooks={ready:configReady,startRun,startBattle,nextEncounter,skipConversation,beginBattleRound,step,scheduleCpu,
    begin({stage=1,battle=1,portrait=null,name,retries=0}={}){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();run=createArcade();Object.assign(run,{stage,battle,retries,totalBattles:battle-1});runConfig=structuredClone(defaults);if(portrait)runConfig.stages[stage-1].portrait=portrait;if(name)runConfig.stages[stage-1].name=name;started=true;ended=false;encounter=null;round=null;startBattle();},
    finish(result,points){for(const d of document.querySelectorAll('dialog[open]'))d.close();encounter=null;round={...__engine.createRound({stage:run.stage,seed:1}),phase:'finished',result:structuredClone(result),points:[...points]};run=finishBattle(run,{...result,finalPoints:points});render();showBattleResult();},
    configure(stage,patch,mediaTypes={}){Object.assign(config.stages[stage-1],structuredClone(patch));Object.assign(config.mediaTypes,mediaTypes);},
    stageConfig(stage,patch,mediaTypes={}){Object.assign(runConfig.stages[stage-1],structuredClone(patch));Object.assign(runConfig.mediaTypes,mediaTypes);},
    setupRound(value){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();encounter=null;round=structuredClone(value);started=true;ended=false;render();},
    state(){return{run,round,encounter,createdRounds,ended};}};`;
  let tableSource = '';
  let table;
  if (withTable) {
    // Run the production hit targets and app. Only Three.js projection and rendering
    // are substituted so these tests do not require a GPU or a browser permission.
    const controls = await readFile(new URL('./table-controls.mjs', import.meta.url), 'utf8');
    tableSource = controls.replace(/^import .*;\r?$/gm, '').replace('export function createTableControls', 'function createTableControls')
      .replace(/import\('\.\/table-scene\.mjs[^']*'\)/, 'Promise.resolve(__gpu)');
    assert.ok(tableSource.includes('Promise.resolve(__gpu)'));
    let drawn;
    const ready = new Promise(resolve => { drawn = resolve; });
    const canvas = nodes.get('tableScene'), board = new Element('section'), targets = nodes.get('handTargets');
    const classes = new Set(['has-3d','is-loading-3d']);
    board.classList = { add: name => classes.add(name), remove: name => classes.delete(name), toggle() {} };
    canvas.getContext = () => null;
    canvas.closest = selector => selector === '.mahjong-table' ? board : null;
    targets.getClientRects = () => [{}];
    table = {
      model: null, ready, classes, disposed: false, hitTest: () => -1,
      press(index) { targets.dispatch('click', { target: targets.children[index] }); },
    };
    context.cancelAnimationFrame = () => {};
    context.__gpu = { createTableScene(_canvas, { onReady, onUnavailable }) {
      table.present = onReady;
      table.loseContext = onUnavailable;
      return {
        update(model) { table.model = structuredClone(model); drawn(); },
        projectHand() { return table.model.hand.map((_, i) => ({ left:i / 16, top:0.7, width:0.06, height:0.2 })); },
        pickAt(x, y) { return table.hitTest(x, y); },
        dispose() { table.disposed = true; },
      };
    } };
  }
  vm.runInContext(imports + tableSource + '\n' + source.replace(/^import .*;\r?$/gm, '') + hooks, context);
  await context.hooks.ready;
  return { hooks: context.hooks, node: id => nodes.get(id), timers, document, window:context.window, table };
}

test('the 3D table prepares before the first round and only removes the loading state after a frame', async () => {
  const f = await harness({withTable:true});
  await f.table.ready;
  assert.equal(f.node('welcomeDialog').open, true);
  assert.equal(f.table.model.hand.length, 0);
  assert.equal(f.table.classes.has('is-loading-3d'), true);
  f.hooks.begin();
  f.hooks.skipConversation();
  assert.equal(f.table.model.hand.length, 14);
  assert.equal(f.table.classes.has('is-loading-3d'), true);
  f.table.present();
  assert.equal(f.table.classes.has('is-loading-3d'), false);
  assert.equal(f.table.classes.has('has-3d'), true);
  f.table.loseContext();
  assert.equal(f.table.classes.has('has-3d'), false);
  assert.equal(f.table.disposed, true);
});

test('the CPU discard preview updates from public discards and clears for the next round', async () => {
  const f = await harness();
  const round = engine.createRound({seed: 12});
  round.discards[1] = [9,28];
  f.hooks.setupRound(round);
  assert.match(f.node('latestCpuDiscard').innerHTML, /data-tile="28"/);
  assert.match(f.node('cpuRiver').innerHTML, /latest-river-tile[^>]*><span[^>]*data-tile="28"/);
  f.hooks.begin();
  f.hooks.skipConversation();
  assert.equal(f.node('latestCpuDiscard').textContent, '—');
});

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

test('3D手牌の初回選択では河に置かず、同じ牌をもう一度押したときだけ1枚を打つ', async () => {
  const game = await harness({ withTable: true });
  const initial = engine.createRound({ seed: 1, dealer: 0 });
  game.hooks.setupRound(initial);
  await game.table.ready;
  const index = 5, tile = initial.hands[0][index];
  const targets = game.node('handTargets');
  assert.deepEqual(game.table.model.hand, initial.hands[0]);
  assert.deepEqual(game.table.model.cpu, Array(initial.hands[1].length).fill(null));
  assert.equal(game.table.model.dora, initial.doraIndicator);
  assert.equal(game.table.model.wallCount, initial.wall.length);
  assert.equal(targets.children.length, 14);
  assert.equal(targets.children[index].getAttribute('aria-label'), tiles.tileName(tile));
  assert.equal(game.node('discardButton').disabled, true);

  game.table.press(index);
  assert.deepEqual(game.hooks.state().round, initial);
  assert.equal(game.table.model.selected, index);
  assert.equal(targets.children[index].getAttribute('aria-pressed'), 'true');
  assert.equal(game.node('discardButton').disabled, false);
  game.table.press(index);
  const after = game.hooks.state().round;
  assert.deepEqual(after, engine.actRound(initial, { type: 'discard', index }).state);
  assert.deepEqual(game.table.model.rivers, [[tile], []]);
  assert.equal(game.table.model.selected, null);
  assert.equal(targets.children.length, 13);
  assert.ok(targets.children.every(button => button.disabled));
  assert.ok(game.table.model.cpu.every(id => id === null));
  game.table.press(index);
  game.node('discardButton').click();
  assert.equal(game.hooks.state().round, after);
});

test('3Dで牌を選び直して打牌ボタンを押すと、最後に選択した牌だけが河に並ぶ', async () => {
  const game = await harness({ withTable: true });
  const initial = engine.createRound({ seed: 6, dealer: 0 });
  game.hooks.setupRound(initial);
  await game.table.ready;
  const second = initial.hands[0].findIndex(id => id !== initial.hands[0][0]);
  game.table.press(0);
  game.table.press(second);
  assert.equal(game.table.model.selected, second);
  assert.deepEqual(game.table.model.rivers, [[], []]);
  game.node('discardButton').click();
  assert.deepEqual(game.hooks.state().round, engine.actRound(initial, { type: 'discard', index: second }).state);
  assert.deepEqual(game.table.model.rivers, [[initial.hands[0][second]], []]);
  assert.equal(game.node('discardButton').disabled, true);
});

test('暗槓を宣言すると3D卓の手牌とドラが更新され、嶺上牌を打てる', async () => {
  const game = await harness({ withTable: true });
  game.hooks.setupRound(engine.createRound({ seed: 1, dealer: 0 }));
  const button = game.node('kanButton');
  assert.equal(button.hidden, false);
  assert.equal(button.disabled, true);
  const initial = engine.createRound({ seed: 276, dealer: 0 });
  game.hooks.setupRound(initial);
  await game.table.ready;
  assert.equal(button.hidden, false);
  assert.equal(button.disabled, false);
  button.click();

  const after = game.hooks.state().round;
  const table = game.table.model;
  assert.equal(after.phase, 'human-discard');
  assert.equal(table.hand.length, 11);
  assert.deepEqual(table.kans, [[31], []]);
  assert.deepEqual(table.doraIndicators, [initial.doraIndicator, initial.deadWall[6]]);
  assert.equal(table.drawnIndex, 10);
  assert.equal(table.hand[table.drawnIndex], initial.deadWall[0]);
  assert.equal(game.node('handTargets').children.length, 11);
  assert.equal(button.hidden, false);
  assert.equal(button.disabled, true);

  game.table.press(table.drawnIndex);
  game.node('discardButton').click();
  assert.equal(game.hooks.state().round.phase, 'cpu');
  assert.deepEqual(game.table.model.rivers[0], [initial.deadWall[0]]);
});

test('3Dのポインター操作は最前面の牌を選び、重なったボタン・隙間・CPU手番で誤打牌しない', async () => {
  const game = await harness({ withTable: true });
  const initial = engine.createRound({ seed: 6, dealer: 0 });
  game.hooks.setupRound(initial);
  await game.table.ready;
  const targets = game.node('handTargets'), canvas = game.node('tableScene');
  const overlap = { detail:1, clientX:142, clientY:238, target:targets.children[0] };
  game.table.hitTest = (x, y) => x === 142 && y === 238 ? 5 : -1;
  targets.dispatch('click', overlap);
  assert.equal(game.table.model.selected, 5);
  assert.equal(targets.children[0].getAttribute('aria-pressed'), 'false');
  targets.dispatch('click', { detail:1, clientX:143, clientY:238, target:targets.children[5] });
  canvas.dispatch('click', { detail:1, clientX:-30, clientY:-30 });
  assert.equal(game.table.model.selected, 5);
  assert.deepEqual(game.table.model.rivers, [[], []]);
  canvas.dispatch('click', { detail:1, clientX:142, clientY:238 });
  const after = game.hooks.state().round;
  assert.deepEqual(after, engine.actRound(initial, { type:'discard', index:5 }).state);
  assert.equal(after.phase, 'cpu');
  canvas.dispatch('click', { detail:1, clientX:142, clientY:238 });
  assert.equal(game.table.model.selected, null);
  assert.equal(game.hooks.state().round, after);
});

test('3D描画が中断しても、選択した牌と同じ局を保って通常の手牌から打牌できる', async () => {
  const game = await harness({ withTable: true });
  const initial = engine.createRound({ seed: 1, dealer: 0 });
  game.hooks.setupRound(initial);
  await game.table.ready;
  game.table.press(4);
  game.table.loseContext();
  assert.equal(game.table.disposed, true);
  assert.equal(game.node('handTargets').children.length, 0);
  assert.equal(game.window.listeners.get('resize').length, 0);
  assert.deepEqual(game.hooks.state().round, initial);
  const hand = game.node('playerHand');
  assert.match(hand.innerHTML, /<button[^>]+aria-pressed="true"[^>]+data-tile-index="4"/);
  const selectedButton = new Element('button');
  selectedButton.dataset.tileIndex = '4';
  hand.dispatch('click', { target:selectedButton });
  const after = game.hooks.state().round;
  assert.deepEqual(after, engine.actRound(initial, { type:'discard', index:4 }).state);
  assert.match(game.node('playerRiver').innerHTML, new RegExp('data-tile="' + initial.hands[0][4] + '"'));
  assert.equal(game.node('handTargets').children.length, 0);
});

test('リーチ時の3D手牌と捨て牌履歴は同じ局に従い、長い河にも宣言牌が残る', async () => {
  const game = await harness({ withTable: true });
  // This genuine shuffled deal permits riichi only by discarding index 7.
  const initial = engine.createRound({ seed: 568, dealer: 0 });
  initial.discards = [initial.wall.splice(-23), initial.wall.splice(-23)];
  initial.riichiAt[1] = 6;
  initial.riichi[1] = true;
  initial.riichiPot = 1000;
  initial.points[1] -= 1000;
  initial.turnCount = 46;
  game.hooks.setupRound(initial);
  await game.table.ready;
  assert.deepEqual(engine.legalActions(initial).riichiDiscards, [7]);
  game.node('riichiButton').click();
  assert.deepEqual(game.table.model.legal, [7]);
  const targets = game.node('handTargets').children;
  assert.ok(targets.every((button, i) => button.disabled === (i !== 7)));
  game.table.press(0);
  assert.equal(game.table.model.selected, null);
  game.table.press(7);
  game.node('discardButton').click();
  const after = game.hooks.state().round;
  assert.equal(after.riichi[0], true);
  assert.deepEqual(game.table.model.riichiAt, [23, 6]);
  assert.deepEqual(game.table.model.rivers, after.discards);
  assert.deepEqual(game.table.model.cpu, Array(13).fill(null));
  game.node('reviewRivers').click();
  assert.equal(game.node('riverReviewDialog').open, true);
  for (const [seat, id] of ['reviewPlayerRiver', 'reviewCpuRiver'].entries()) {
    const html = game.node(id).innerHTML;
    const displayed = Array.from(html.matchAll(/data-tile="(\d+)"/g), match => Number(match[1]));
    assert.deepEqual(displayed, after.discards[seat]);
    assert.equal((html.match(/class="riichi-discard"/g) || []).length, 1);
    const label = tiles.tileName(after.discards[seat][after.riichiAt[seat]]) + '（リーチ宣言牌）';
    assert.ok(html.includes('aria-label="' + label + '"'));
  }
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

test('custom characters keep their displayed name and use a dedicated greeting and portrait', async () => {
  const f = await harness(); f.hooks.begin({ stage: 3, name: '独自のキャラクター', portrait: 'portrait-upload' });
  assert.equal(f.node('encounterName').textContent, '独自のキャラクター');
  assert.equal(f.node('encounterSpeech').textContent, cast.getCast(3).customGreeting);
  const image = f.node('encounterPortrait').querySelector('img'); assert.match(image.src, /portrait-upload$/);
  image.onerror(); assert.equal(image.src, cast.defaultPortraitURL(3));
  image.onerror(); assert.ok(f.node('encounterPortrait').innerHTML.includes('画像を読み込めません'));
});


const completeResult=(winner,points)=>({winner,points,han:winner===null?0:1,fu:winner===null?0:30,yaku:[],winningHand:[]});
function finishThree(f, balances=[[24000,26000],[41000,9000],[24000,26000]]){
 for(const [index,finalPoints] of balances.entries()){
  const [you,rival]=finalPoints;
  f.hooks.finish(completeResult(you===rival?null:you>rival?0:1,Math.abs(you-25000)),finalPoints);
  if(index<2){
   assert.equal(f.hooks.state().run.phase,'battle-result');
   assert.equal(f.node('resultDialog').open,true);
   assert.equal(f.node('stageRewardDialog').open,false);
   assert.equal(f.node('stageRewardVideo').src,undefined);
   f.node('nextRoundButton').click();
  }
 }
}

test('a single win can automatically play exactly one muted stage reward after the third result',async()=>{
 const f=await harness();
 f.hooks.configure(1,{gallery:['stage-movie','other-movie'],rewards:['old-image',null,null]},
   {'stage-movie':'video/mp4','other-movie':'video/mp4'});
 await f.hooks.startRun();
 f.hooks.configure(1,{gallery:['later-movie']},{'later-movie':'video/mp4'});
 finishThree(f);
 const video=f.node('stageRewardVideo');
 assert.equal(f.hooks.state().run.phase,'stage-clear');
 assert.equal(f.hooks.state().run.wins,1);
 assert.equal(f.node('stageRewardDialog').open,true);
 assert.match(f.node('stageRewardSummary').textContent,/89,000.*61,000/);
 assert.match(video.src,/stage-movie$/);
 assert.equal(video.playCalls,1);
 assert.equal(video.muted,true);
 f.node('stageRewardContinue').click();
 assert.equal(f.hooks.state().run.stage,2);
 assert.equal(f.node('stageRewardDialog').open,false);
 assert.equal(f.node('encounterDialog').open,true);
 assert.equal(video.paused,true);
 assert.equal(video.src,undefined);
 f.node('stageRewardContinue').click();
 assert.equal(f.hooks.state().run.stage,2);
});

test('tie and loss show the result and offer a retry without loading the reward',async()=>{
 for (const end of [[25000,25000],[24000,26000]]){
  const f=await harness();
  f.hooks.begin();
  f.hooks.stageConfig(1,{gallery:['stage-movie']},{'stage-movie':'video/mp4'});
  finishThree(f,[[24000,26000],[26000,24000],end]);
  assert.equal(f.hooks.state().run.phase,'stage-failed');
  assert.equal(f.node('stageRewardDialog').open,false);
  assert.equal(f.node('stageRewardVideo').src,undefined);
  assert.equal(f.node('retryStageButton').hidden,false);
 }
});

test('an empty or legacy image slot leaves stage advancement available without other gallery items',async()=>{
 for(const first of [null,'photo']){
  const f=await harness();
  f.hooks.begin();
  f.hooks.stageConfig(1,{gallery:[first,'other-video']},{photo:'image/webp','other-video':'video/mp4'});
  finishThree(f);
  assert.equal(f.node('stageRewardDialog').open,false);
  assert.equal(f.node('stageRewardVideo').src,undefined);
  assert.equal(f.node('nextStageButton').hidden,false);
  f.node('nextStageButton').click();
  assert.equal(f.hooks.state().run.stage,2);
 }
});

test('the last stage reward can show results and complete the run without playing twice',async()=>{
 const f=await harness();
 f.hooks.begin({stage:7});
 f.hooks.stageConfig(7,{gallery:['final-movie']},{'final-movie':'video/mp4'});
 finishThree(f);
 assert.equal(f.hooks.state().run.phase,'complete');
 assert.match(f.node('stageRewardVideo').src,/final-movie$/);
 assert.equal(f.node('stageRewardVideo').playCalls,1);
 f.node('stageRewardDetails').click();
 assert.equal(f.node('resultDialog').open,true);
 assert.equal(f.node('stageRewardVideo').src,undefined);
 assert.equal(f.node('stageRewardVideo').playCalls,1);
 f.node('endRunButton').click();
 assert.equal(f.node('finalDialog').open,true);
 assert.equal(f.hooks.state().ended,true);
});

test('actual round completion passes held points including unclaimed riichi deposits into stage totals',async()=>{
 const f=await harness();f.hooks.begin();f.hooks.skipConversation();
 const drawn=engine.createRound({stage:1,seed:13,dealer:1});drawn.wall=[];drawn.points=[24000,25000];drawn.riichiPot=1000;drawn.riichi[0]=true;
 f.hooks.setupRound(drawn);f.hooks.step({type:'cpu'});
 assert.equal(f.hooks.state().round.result.winner,null);assert.deepEqual(Array.from(f.hooks.state().run.stageTotals),[24000,25000]);assert.deepEqual(Array.from(f.hooks.state().run.results[0].finalPoints),[24000,25000]);assert.equal(f.node('resultDialog').open,true);assert.equal(f.hooks.state().run.phase,'battle-result');
});
