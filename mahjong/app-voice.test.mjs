import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as engine from './engine.mjs';
import * as arcade from './arcade.mjs';
import * as tiles from './tiles.mjs';
import * as cast from './cast.mjs';
import * as encounterModule from './encounter.mjs';
import * as voiceLines from './voice-lines.mjs';

// Real application handlers and the real game engine are exercised here.
// The recording controller verifies speech requests without playing native audio.
class Element {
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.dataset={};this.listeners=new Map();this.children=[];this.attributes={};this.style={setProperty(){}};this.open=false;this.disabled=false;this.hidden=false;this.checked=false;this.value='';this._html='';this._text='';this.classList={add(){},remove(){},toggle(){}};}
  set innerHTML(value){this._html=value;this.children=[];const img=value.match(/<img\s+[^>]*src="([^"]*)"[^>]*>/);if(img){const node=new Element('img');node.src=img[1];this.children.push(node);}}
  get innerHTML(){return this._html;}
  set textContent(value){this._text=String(value);}
  get textContent(){return this._text;}
  setAttribute(name,value){this.attributes[name]=String(value);}
  getAttribute(name){return this.attributes[name]??null;}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=nodes;}
  querySelector(selector){return this.children.find(node=>node.matches(selector))||null;}
  matches(selector){return selector.split(',').some(part=>part.trim()===this.tagName.toLowerCase()||part.trim()==='dialog[open]'&&this.tagName==='DIALOG'&&this.open||part.trim()==='[data-tile-index]'&&this.dataset.tileIndex!==undefined);}
  closest(selector){return this.matches(selector)?this:null;}
  addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(fn);}
  dispatch(type,extras={}){const event={type,target:this,key:'',repeat:false,preventDefault(){this.defaultPrevented=true;},...extras};for(const fn of this.listeners.get(type)||[])fn(event);this['on'+type]?.(event);return event;}
  click(){if(!this.disabled)this.dispatch('click');}
  showModal(){this.open=true;}
  close(){if(this.open){this.open=false;this.dispatch('close');}}
  scrollIntoView(){}
  focus(){}
}

async function harness({supported=true}={}){
  const [html,source]=await Promise.all(['index.html','app.mjs'].map(name=>readFile(new URL(name,import.meta.url),'utf8')));
  const nodes=new Map();
  for(const[,tag,attrs,id]of html.matchAll(/<([a-z][\w-]*)([^>]*\bid="([^"]+)"[^>]*)>/gi)){const node=new Element(tag);node.id=id;node.disabled=/\sdisabled(?:\s|>|$)/.test(attrs);nodes.set(id,node);}
  const document=new Element('document');document.hidden=false;document.documentElement=new Element('html');
  document.getElementById=id=>{assert.ok(nodes.has(id),'actual app node exists: '+id);return nodes.get(id);};
  document.createElement=tag=>new Element(tag);
  document.querySelectorAll=selector=>[...nodes.values()].filter(node=>node.matches(selector));
  document.querySelector=selector=>document.querySelectorAll(selector)[0]||null;
  const calls=[],plays=[],timers=new Map(),storage=new Map(),window=new Element('window');let timerId=0,controller,time=100000;
  class ClockDate extends Date {static now(){return time;}}
  class RecordingVoice {
    constructor(options={}){this.options=options;this.value={supported,enabled:options.enabled??true,volume:options.volume??.8,speaking:false,blocked:false,availability:supported?'ready':'unsupported',voiceName:supported?'Japanese test voice':'',error:'',text:''};controller=this;}
    state(){return{...this.value};}
    publish(){this.options.onChange?.(this.state());}
    unlock(){calls.push({type:'unlock'});return supported;}
    speak(stageId,text,options={}){const call={type:'speak',stageId,text,options};calls.push(call);if(!supported||!this.value.enabled||this.value.volume<=0)return false;plays.push(call);this.value.speaking=true;this.value.text=text;this.publish();return true;}
    stop(){calls.push({type:'stop'});this.value.speaking=false;this.publish();}
    setEnabled(value){calls.push({type:'enabled',value});this.value.enabled=!!value;if(!value)this.stop();this.publish();}
    setVolume(value){this.value.volume=Number(value);calls.push({type:'volume',value:Number(value)});this.publish();}
  }
  const context=vm.createContext({document,window,console,structuredClone,AbortController,Date:ClockDate,
    __engine:engine,__arcade:arcade,__tiles:tiles,__cast:cast,__encounter:encounterModule,__voice:{CharacterVoice:RecordingVoice},__voiceLines:voiceLines,createdRounds:0,
    localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value))},
    setTimeout(fn,delay){const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id),
    fetch:async url=>({ok:true,json:async()=>String(url).endsWith('/config')?{version:0,stages:cast.CAST.map(p=>({id:p.id,name:p.name,portrait:null,rewards:[null,null,null],accent:'#315f6b'}))}:{id:'test-session',entries:[]}})});
  const imports=`const {actRound,legalActions,publicView}=__engine;const createRound=options=>{createdRounds++;return __engine.createRound({...options,seed:1});};const {createArcade,finishBattle,advanceArcade,retryStage}=__arcade;const {tileHTML,tileName,portraitPlaceholder}=__tiles;const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast;const {createEncounter,advanceEncounter,skipEncounter}=__encounter;const {CharacterVoice}=__voice;const {chooseVoiceLine,getVoiceProfile}=__voiceLines;`;
  const hooks=`globalThis.hooks={ready:configReady,startBattle,nextEncounter,skipConversation,beginBattleRound,step,scheduleCpu,render,renderEncounter,show,close,endRun,
    begin({stage=1,battle=1}={}){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();run={...createArcade(),stage,battle,totalBattles:battle-1};runConfig=structuredClone(defaults);started=true;ended=false;encounter=null;round=null;startBattle();},
    reward(stage,win){for(const d of document.querySelectorAll('dialog[open]'))d.close();const result={winner:0,points:2000,han:1,fu:30};run=finishBattle({...createArcade(),stage,battle:win,wins:win-1},result);round={result};runConfig=structuredClone(defaults);started=true;ended=false;showBattleResult();},
    setRound(value){stopTimers();for(const d of document.querySelectorAll('dialog[open]'))d.close();round=structuredClone(value);run={...createArcade(),stage:value.stage};runConfig=structuredClone(defaults);started=true;ended=false;encounter=null;render();},
    state(){return{run,round,encounter,createdRounds};}};`;
  vm.runInContext(imports+source.replace(/^import .*;\r?$/gm,'')+hooks,context);
  await context.hooks.ready;
  return{hooks:context.hooks,node:id=>nodes.get(id),timers,calls,plays,document,window,controller,storage,advance:ms=>{time+=ms;}};
}
const eventTexts=(stage,event)=>new Set(Array.from({length:12},(_,variant)=>voiceLines.chooseVoiceLine(stage,event,{variant})));
const hasEvent=(f,stage,event)=>f.plays.some(call=>call.stageId===stage&&eventTexts(stage,event).has(call.text));

test('opening the page stays silent, and encounter speech follows the selected person and line',async()=>{
  const f=await harness();assert.equal(f.plays.length,0);
  for(let stage=1;stage<=7;stage++){
    f.hooks.begin({stage});const encounter=f.hooks.state().encounter;
    assert.equal(f.plays.at(-1).stageId,stage);assert.equal(f.plays.at(-1).text,encounter.lines[0]);
    f.hooks.nextEncounter();assert.equal(f.plays.at(-1).text,encounter.lines[1]);
  }
});

test('encounter replay and skip are explicit, cancel old speech, and start only one round',async()=>{
  const f=await harness();f.hooks.begin({stage:4});
  const before=f.plays.length;f.node('encounterReplay').click();
  assert.equal(f.plays.length,before+1);assert.equal(f.plays.at(-1).options.force,true);
  const stopped=f.calls.filter(call=>call.type==='stop').length;
  f.node('encounterSkip').click();assert.equal(f.hooks.state().createdRounds,1);assert.ok(hasEvent(f,4,'roundStart'));
  assert.ok(f.calls.filter(call=>call.type==='stop').length>stopped);
  const after=f.plays.length;f.node('encounterSkip').click();assert.equal(f.plays.length,after);assert.equal(f.hooks.state().createdRounds,1);
});

test('muting prevents later encounter speech and manual replay works after enabling audio again',async()=>{
  const f=await harness();f.hooks.begin();f.node('voiceToggle').click();
  assert.equal(f.controller.state().enabled,false);const muted=f.plays.length;f.hooks.nextEncounter();assert.equal(f.plays.length,muted);
  f.node('voiceToggle').click();assert.equal(f.controller.state().enabled,true);
  f.node('encounterReplay').click();assert.equal(f.plays.at(-1).text,f.hooks.state().encounter.lines[1]);
});

test('help, backgrounding, page exit and ending a run stop speech without auto-replaying on resume',async()=>{
  const f=await harness();f.hooks.begin();f.hooks.show('helpDialog');assert.equal(f.controller.state().speaking,false);
  const count=f.plays.length;f.hooks.close('helpDialog');assert.equal(f.plays.length,count);
  f.document.hidden=true;f.document.dispatch('visibilitychange');assert.equal(f.controller.state().speaking,false);
  f.document.hidden=false;f.document.dispatch('visibilitychange');assert.equal(f.plays.length,count);
  const stops=f.calls.filter(call=>call.type==='stop').length;f.window.dispatch('pagehide');assert.ok(f.calls.filter(call=>call.type==='stop').length>stops);
  f.hooks.endRun();assert.equal(f.controller.state().speaking,false);
});

test('a delayed close event from the previous dialog cannot cancel the new encounter line',async()=>{
  const f=await harness();f.hooks.begin({stage:6});
  assert.equal(f.controller.state().speaking,true);const stops=f.calls.filter(call=>call.type==='stop').length;
  // Native dialog.close() queues its close event; it may arrive after a new
  // modal and its speech have already opened in the same click handler.
  f.node('welcomeDialog').dispatch('close');f.node('resultDialog').dispatch('close');
  assert.equal(f.controller.state().speaking,true);
  assert.equal(f.calls.filter(call=>call.type==='stop').length,stops);
  assert.equal(f.plays.at(-1).text,f.hooks.state().encounter.lines[0]);
});

test('an idle turn gets one gentle line after twenty seconds and rendering does not repeat it',async()=>{
  const f=await harness();f.hooks.begin();f.hooks.skipConversation();f.controller.stop();
  const idle=[...f.timers.entries()].find(([,timer])=>timer.delay===20000);assert.ok(idle,'an idle reminder is scheduled');
  f.advance(20000);f.timers.delete(idle[0]);idle[1].fn();assert.ok(hasEvent(f,1,'playerTurn'));
  const count=f.plays.length;f.hooks.render();f.hooks.render();assert.equal(f.plays.length,count);
  assert.equal([...f.timers.values()].filter(timer=>timer.delay===20000).length,0);
});

test('voice settings sample the chosen character and preserve the current opponent',async()=>{
  const f=await harness();f.hooks.begin({stage:2});f.node('voiceSettingsButton').click();
  assert.equal(f.controller.state().speaking,false);assert.equal(f.node('voiceDialog').open,true);
  f.node('voiceCharacter').value='7';f.node('voiceCharacter').dispatch('change');f.node('voiceTest').click();
  assert.equal(f.plays.at(-1).stageId,7);assert.equal(f.plays.at(-1).options.force,true);
  assert.equal(f.hooks.state().run.stage,2);
  f.node('voiceVolume').value='35';f.node('voiceVolume').dispatch('input');assert.equal(f.controller.state().volume,.35);
  assert.equal(f.node('voiceVolumeValue').textContent,'35%');
});

test('all 21 victories request the matching person and victory caption',async()=>{
  const f=await harness();
  for(let stage=1;stage<=7;stage++)for(let win=1;win<=3;win++){
    const before=f.plays.length;f.hooks.reward(stage,win);assert.equal(f.plays.length,before+1,'one victory line, without ambient chatter');assert.equal(f.plays.at(-1).stageId,stage);assert.equal(f.plays.at(-1).text,cast.getCast(stage).rewards[win-1]);assert.equal(f.plays.at(-1).options.priority,'important');
  }
  const before=f.plays.length;f.node('rewardReplay').click();assert.equal(f.plays.length,before+1);assert.equal(f.plays.at(-1).options.force,true);
});

test('unsupported speech does not block conversations or a real round',async()=>{
  const f=await harness({supported:false});f.hooks.begin({stage:7});f.hooks.skipConversation();
  assert.equal(f.plays.length,0);assert.equal(f.hooks.state().createdRounds,1);assert.ok(f.hooks.state().round);
});

function physicalFixture(human,cpu,{phase='human-discard',stage=7,river=[[],[]],last=null,riichi=[false,false],top}={}){
  const s=engine.createRound({stage,seed:44});s.hands=[engine.tilesFromString(human),engine.tilesFromString(cpu)];s.discards=river.map(a=>[...a]);
  const counts=Array(34).fill(4);for(const tile of [...s.hands.flat(),...s.discards.flat()])counts[tile]--;assert.ok(counts.every(n=>n>=0));
  s.deadWall=[];for(let tile=0;tile<34&&s.deadWall.length<14;tile++)while(counts[tile]>0&&s.deadWall.length<14){s.deadWall.push(tile);counts[tile]--;}
  s.wall=counts.flatMap((n,tile)=>Array(n).fill(tile));if(top!==undefined){const i=s.wall.indexOf(top);assert.ok(i>=0);s.wall.splice(i,1);s.wall.push(top);}
  s.phase=phase;s.turn=phase==='cpu'?1:0;s.lastDiscard=last;s.drawn=s.hands.map(hand=>hand.length===14?hand.at(-1):null);s.riichi=[...riichi];s.doubleRiichi=[false,false];s.ippatsu=[false,false];s.pendingRiichi=null;s.points=riichi.map(value=>value?24000:25000);s.riichiPot=riichi.filter(Boolean).length*1000;
  return s;
}

test('real player riichi and CPU riichi with a simultaneous ron offer both get their appropriate line',async()=>{
  const f=await harness();
  const player=physicalFixture('m123456p789s12z11m9','m999p111222s999z1',{stage:1});
  assert.ok(engine.legalActions(player).riichiDiscards.includes(13));f.hooks.setRound(player);f.hooks.step({type:'riichi',index:13});assert.ok(hasEvent(f,1,'playerRiichi'));
  const cpu=physicalFixture('m123456p789s12z11','m123p123s789z1177',{phase:'cpu',river:[[0],[]],last:{player:0,tile:0},riichi:[true,false],top:20});
  const actual=engine.actRound(cpu,{type:'cpu'});assert.equal(actual.event,'ron-offer');assert.equal(actual.state.riichi[1],true);
  const before=f.plays.length;f.hooks.setRound(cpu);f.hooks.step({type:'cpu'});assert.equal(f.hooks.state().round.phase,'human-ron');assert.ok(hasEvent(f,7,'cpuRiichi'));assert.equal(f.plays.length,before+1);assert.equal(f.plays.at(-1).options.priority,'important');
});

test('actual CPU wins and wall exhaustion produce terminal lines rather than ordinary table chatter',async()=>{
  const f=await harness();
  const cpu=physicalFixture('m123p123s123z1155','m123456p789s12z11',{phase:'cpu',river:[[20],[]],last:{player:0,tile:20},riichi:[false,true]});
  assert.equal(engine.actRound(cpu,{type:'cpu'}).state.result.winner,1);f.hooks.setRound(cpu);const before=f.plays.length;f.hooks.step({type:'cpu'});assert.ok(hasEvent(f,7,'cpuWin'));assert.equal(f.plays.length,before+1);assert.equal(f.plays.at(-1).options.priority,'important');
  const drawn=engine.createRound({stage:3,seed:13,dealer:1});drawn.wall=[];f.hooks.setRound(drawn);const next=f.plays.length;f.hooks.step({type:'cpu'});
  assert.equal(f.hooks.state().round.result.winner,null);assert.ok(hasEvent(f,3,'draw'));assert.equal(f.plays.length,next+1);assert.equal(f.plays.at(-1).options.priority,'important');
});
