import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import * as engine from './engine.mjs';
import * as arcade from './arcade.mjs';
import * as tiles from './tiles.mjs';
import * as cast from './cast.mjs';
import * as encounterModule from './encounter.mjs';
import * as voiceModule from './voice.mjs';
import * as voiceLines from './voice-lines.mjs';

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
  removeAttribute(name) { delete this[name]; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  querySelector(selector) { return this.children.find(node => node.matches(selector)) || null; }
  matches(selector) { return selector.split(',').some(part => {part=part.trim();const data=part.match(/^\[data-([\w-]+)\]$/);return part===this.tagName.toLowerCase()||part==='dialog[open]'&&this.tagName==='DIALOG'&&this.open||data&&this.dataset[data[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]!==undefined;}); }
  closest(selector) { return this.matches(selector) ? this : null; }
  addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(fn); }
  dispatch(type, extras = {}) { const event = { type, target: this, key: '', repeat: false, preventDefault() { this.defaultPrevented = true; }, ...extras }; for (const fn of this.listeners.get(type) || []) fn(event); this['on' + type]?.(event); return event; }
  click() { if (!this.disabled) this.dispatch('click'); }
  showModal() { this.open = true; }
  close() { if (this.open) { this.open = false; this.dispatch('close'); } }
  scrollIntoView() {}
  focus() {}
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
  const context = vm.createContext({ document, window: new Element('window'), console, structuredClone, AbortController,
    __engine: engine, __arcade: arcade, __tiles: tiles, __cast: cast, __encounter: encounterModule, __voice: voiceModule, __voiceLines: voiceLines, createdRounds: 0,
    setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, delay }); return id; }, clearTimeout(id) { timers.delete(id); },
    fetch: async url => ({ ok: true, json: async () => String(url).endsWith('/config') ? { version: 0, stages: cast.CAST.map(p => ({ id: p.id, name: `ステージ${p.id}の対戦相手`, portrait: null, rewards: [null, null, null], accent: '#315f6b' })) } : { id: 'test-session', entries: [] } })
  });
  const imports = `const {actRound,legalActions,publicView}=__engine; const createRound=options=>{createdRounds++;return __engine.createRound({...options,seed:1});}; const {createArcade,finishBattle,advanceArcade,retryStage}=__arcade; const {tileHTML,tileName,portraitPlaceholder}=__tiles; const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast; const {createEncounter,advanceEncounter,skipEncounter}=__encounter; const {CharacterVoice}=__voice; const {chooseVoiceLine,getVoiceProfile}=__voiceLines;`;
  const hooks = `globalThis.hooks={ready:configReady,startRun,startBattle,nextEncounter,skipConversation,beginBattleRound,step,scheduleCpu,
    begin({stage=1,battle=1,portrait=null,name,retries=0}={}){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();run=createArcade();Object.assign(run,{stage,battle,retries,totalBattles:battle-1});runConfig=structuredClone(defaults);if(portrait)runConfig.stages[stage-1].portrait=portrait;if(name)runConfig.stages[stage-1].name=name;started=true;ended=false;encounter=null;round=null;startBattle();},
    reward(stage,win,custom=null){const result={winner:0,points:2000,han:1,fu:30};run={...createArcade(),stage,battle:win,wins:win-1};run=finishBattle(run,result);round={result};runConfig=structuredClone(defaults);if(custom)runConfig.stages[stage-1].rewards[win-1]=custom;showBattleResult();},
    finish(result,points){for(const d of document.querySelectorAll('dialog[open]'))d.close();encounter=null;round={...__engine.createRound({stage:run.stage,seed:1}),phase:'finished',result:structuredClone(result),points:[...points]};run=finishBattle(run,{...result,finalPoints:points});render();showBattleResult();},
    configure(stage,patch){Object.assign(config.stages[stage-1],structuredClone(patch));},
    setupRound(value){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();encounter=null;round=structuredClone(value);started=true;ended=false;render();},
    state(){return{run,round,encounter,createdRounds,ended};}};`;
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


const completeResult=(winner,points)=>({winner,points,han:winner===null?0:1,fu:winner===null?0:30,yaku:[],winningHand:[]});
const galleryIds=stage=>Array.from({length:10},(_,index)=>`stage-${stage}-gallery-${index+1}`);
async function beginConfigured(f,stage=1,gallery=galleryIds(stage)){
 f.hooks.configure(stage,{gallery});await f.hooks.startRun();
 if(stage!==1)f.hooks.begin({stage});
}
function finishThree(f,{lastWinner=1}={}){
 f.hooks.finish(completeResult(1,1000),[24000,26000]);assert.equal(f.hooks.state().run.phase,'battle-result');
 f.node('nextRoundButton').click();f.hooks.finish(completeResult(0,16000),[41000,9000]);f.node('rewardContinue').click();
 f.node('nextRoundButton').click();f.hooks.finish(completeResult(lastWinner,lastWinner===0?1000:1000),lastWinner===0?[26000,24000]:[24000,26000]);
 if(lastWinner===0)f.node('rewardContinue').click();
}

test('a loss keeps the campaign alive and one large win can unlock a gated stage gallery after three battles',async()=>{
 const f=await harness();await beginConfigured(f);
 f.hooks.finish(completeResult(1,1000),[24000,26000]);assert.equal(f.hooks.state().ended,false);assert.equal(f.hooks.state().run.battle,1);assert.equal(f.node('resultDialog').open,true);assert.equal(f.node('nextRoundButton').hidden,false);assert.equal(f.node('stageGalleryDialog').open,false);
 f.node('nextRoundButton').click();assert.equal(f.hooks.state().run.battle,2);assert.equal(f.node('encounterDialog').open,true);
 f.hooks.finish(completeResult(0,16000),[41000,9000]);assert.equal(f.node('rewardDialog').open,true);assert.equal(f.node('rewardImage').src,cast.defaultRewardURL(1,1));
 f.node('rewardContinue').click();f.node('nextRoundButton').click();f.hooks.finish(completeResult(1,1000),[24000,26000]);
 assert.equal(f.hooks.state().run.phase,'stage-clear');assert.equal(f.hooks.state().run.wins,1);assert.equal(f.hooks.state().run.stage,1);assert.match(f.node('stageResultTotal').textContent,/89,000.*61,000/);
 const rounds=f.hooks.state().createdRounds;f.node('nextStageButton').click();assert.equal(f.node('stageGalleryDialog').open,true);assert.equal(f.hooks.state().run.stage,1);assert.equal(f.hooks.state().createdRounds,rounds);assert.equal(f.node('encounterDialog').open,false);assert.equal([...f.timers.values()].filter(t=>t.delay===650).length,0);
 assert.equal(f.node('stageGallerySpeech').textContent,cast.getCast(1).stageReward);assert.match(f.node('stageGallerySpeech').textContent,/ご褒美/);
 f.node('stageGalleryContinue').click();assert.equal(f.hooks.state().run.stage,2);assert.equal(f.node('stageGalleryDialog').open,false);assert.equal(f.node('encounterDialog').open,true);assert.equal(f.hooks.state().createdRounds,rounds);assert.deepEqual(Array.from(f.hooks.state().run.stageTotals),[0,0]);
 f.node('stageGalleryContinue').click();assert.equal(f.hooks.state().run.stage,2);assert.equal(f.hooks.state().createdRounds,rounds);
});

test('the gallery has ten ordered slots, clamps navigation and retains the run-start image configuration',async()=>{
 const f=await harness(),ids=galleryIds(1);await beginConfigured(f,1,ids);
 f.hooks.configure(1,{gallery:galleryIds(7)});finishThree(f);f.node('nextStageButton').click();
 assert.equal(f.node('stageGallerySlots').children.length,10);assert.equal(f.node('stageGalleryPrevious').disabled,true);
 for(let i=0;i<10;i++){
  assert.match(f.node('stageGalleryImage').src,new RegExp(`/stage-1-gallery-${i+1}$`));assert.match(f.node('stageGalleryCounter').textContent,new RegExp(`^${i+1} / 10`));assert.equal(f.hooks.state().run.stage,1);
  if(i<9)f.node('stageGalleryNext').click();
 }
 assert.equal(f.node('stageGalleryNext').disabled,true);f.node('stageGalleryNext').click();assert.match(f.node('stageGalleryCounter').textContent,/^10 \/ 10/);
 f.node('stageGallerySlots').children[3].click();assert.match(f.node('stageGalleryImage').src,/stage-1-gallery-4$/);
 f.node('stageGalleryDialog').dispatch('keydown',{key:'ArrowRight',repeat:true});assert.match(f.node('stageGalleryCounter').textContent,/^4 \/ 10/);
 f.node('stageGalleryDialog').dispatch('keydown',{key:'ArrowRight'});assert.match(f.node('stageGalleryCounter').textContent,/^5 \/ 10/);
 f.node('stageGalleryDialog').dispatch('keydown',{key:'ArrowLeft'});assert.match(f.node('stageGalleryCounter').textContent,/^4 \/ 10/);
 assert.equal(f.node('stageGalleryDialog').dispatch('cancel').defaultPrevented,true);
});

test('empty and failed gallery images stay navigable and a stale image error cannot hide a later slot',async()=>{
 const f=await harness();await beginConfigured(f,1,['available-first',null,'available-third',...Array(7).fill(null)]);finishThree(f);f.node('nextStageButton').click();
 const oldError=f.node('stageGalleryImage').onerror;assert.equal(f.node('stageGalleryImage').hidden,false);
 f.node('stageGalleryNext').click();assert.equal(f.node('stageGalleryImage').hidden,true);assert.equal(f.node('stageGalleryEmpty').hidden,false);assert.match(f.node('stageGalleryEmpty').textContent,/未登録/);
 f.node('stageGalleryNext').click();oldError();assert.equal(f.node('stageGalleryImage').hidden,false);assert.match(f.node('stageGalleryImage').src,/available-third$/);
 f.node('stageGalleryImage').onerror();assert.equal(f.node('stageGalleryImage').hidden,true);assert.match(f.node('stageGalleryEmpty').textContent,/読み込めません/);assert.equal(f.node('stageGalleryContinue').disabled,false);
 f.node('stageGalleryNext').click();assert.match(f.node('stageGalleryCounter').textContent,/^4 \/ 10/);f.node('stageGalleryContinue').click();assert.equal(f.hooks.state().run.stage,2);
});

test('the final stage shows its gallery before the complete-run record can open',async()=>{
 const f=await harness();f.hooks.begin({stage:7});finishThree(f);assert.equal(f.hooks.state().run.phase,'complete');assert.equal(f.hooks.state().ended,false);assert.equal(f.node('finalDialog').open,false);
 f.node('endRunButton').click();assert.equal(f.node('stageGalleryDialog').open,true);assert.equal(f.hooks.state().run.stage,7);assert.equal(f.hooks.state().ended,false);assert.equal(f.node('stageGallerySpeech').textContent,cast.getCast(7).stageReward);
 f.node('stageGalleryContinue').click();assert.equal(f.node('finalDialog').open,true);assert.equal(f.hooks.state().ended,true);assert.equal(f.hooks.state().run.stage,7);assert.match(f.node('finalTitle').textContent,/完全制覇/);
});


test('actual round completion passes held points including unclaimed riichi deposits into stage totals',async()=>{
 const f=await harness();f.hooks.begin();f.hooks.skipConversation();
 const drawn=engine.createRound({stage:1,seed:13,dealer:1});drawn.wall=[];drawn.points=[24000,25000];drawn.riichiPot=1000;drawn.riichi[0]=true;
 f.hooks.setupRound(drawn);f.hooks.step({type:'cpu'});
 assert.equal(f.hooks.state().round.result.winner,null);assert.deepEqual(Array.from(f.hooks.state().run.stageTotals),[24000,25000]);assert.deepEqual(Array.from(f.hooks.state().run.results[0].finalPoints),[24000,25000]);assert.equal(f.node('resultDialog').open,true);assert.equal(f.hooks.state().run.phase,'battle-result');
});
