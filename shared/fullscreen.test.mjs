import test from 'node:test';
import assert from 'node:assert/strict';
import {createGameFullscreen,initGameFullscreen} from './fullscreen.mjs';

class FakeEvent {
  constructor(type,options={}) { this.type=type;Object.assign(this,options);this.defaultPrevented=false;this.propagationStopped=false; }
  preventDefault(){this.defaultPrevented=true;} stopPropagation(){this.propagationStopped=true;}
}
class Target {
  constructor(){this.listeners=new Map();}
  addEventListener(name,fn,options){if(!this.listeners.has(name))this.listeners.set(name,[]);this.listeners.get(name).push({fn,options});}
  removeEventListener(name,fn){this.listeners.set(name,(this.listeners.get(name)||[]).filter(entry=>entry.fn!==fn));}
  dispatchEvent(event){for(const {fn} of [...(this.listeners.get(event.type)||[])])fn(event);return !event.defaultPrevented;}
}
class Element extends Target {
  constructor(tag='div'){
    super();this.nodeType=1;this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.attributes={};this.hidden=false;this.isConnected=true;this.focusCalls=[];
    const classes=new Set(),properties=new Map();
    this.classList={add:(...names)=>names.forEach(name=>classes.add(name)),remove:(...names)=>names.forEach(name=>classes.delete(name)),contains:name=>classes.has(name)};
    this.style={setProperty:(name,value,priority='')=>properties.set(name,{value,priority}),getPropertyValue:name=>properties.get(name)?.value||'',getPropertyPriority:name=>properties.get(name)?.priority||'',removeProperty:name=>properties.delete(name)};
  }
  setAttribute(name,value){this.attributes[name]=String(value);}
  getAttribute(name){return this.attributes[name]??null;}
  removeAttribute(name){delete this.attributes[name];}
  append(...nodes){for(const node of nodes){this.children.push(node);node.parentElement=this;}}
  remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(node=>node!==this);this.isConnected=false;}
  focus(options){this.focusCalls.push(options);}
}
function harness(mode='absent'){
  const document=new Target(),window=new Target(),root=new Element('html'),body=new Element('body'),stage=new Element('main'),first=new Element('button'),second=new Element('button'),focus=new Element('button');
  root.append(body);body.append(stage);stage.append(first);body.append(second);first.dataset.fullscreenTarget='#stage';second.dataset.fullscreenTarget='#stage';
  Object.assign(document,{body,documentElement:root,activeElement:focus,fullscreenElement:null,webkitFullscreenElement:null,hasDialog:false,
    createElement:tag=>new Element(tag),querySelectorAll:selector=>selector==='[data-game-fullscreen]'?[first,second]:[],
    querySelector:selector=>{if(selector==='[')throw Error('Invalid selector');return selector==='#stage'?stage:selector==='dialog[open]'&&document.hasDialog?new Element('dialog'):null;}});
  const visualViewport=new Target();visualViewport.height=720;
  Object.assign(window,{innerWidth:1280,innerHeight:760,scrollX:19,scrollY:430,visualViewport,Event:FakeEvent,CustomEvent:FakeEvent,scrolls:[],scrollTo(x,y){this.scrolls.push([x,y]);this.scrollX=x;this.scrollY=y;}});
  const changes=[];let resizeCount=0,requests=0,exits=0,resolveRequest,requestOptions;
  window.addEventListener('gamefullscreenchange',event=>changes.push(event.detail));window.addEventListener('resize',()=>resizeCount++);
  const becomeNative=()=>{document.fullscreenElement=root;document.dispatchEvent(new FakeEvent('fullscreenchange'));};
  if(mode!=='absent')root.requestFullscreen=options=>{
    requests++;requestOptions=options;
    if(mode==='rejected')return Promise.reject(Error('Native fullscreen unavailable'));
    if(mode==='deferred')return new Promise(resolve=>{resolveRequest=()=>{becomeNative();resolve();};});
    becomeNative();return Promise.resolve();
  };
  document.exitFullscreen=()=>{exits++;document.fullscreenElement=null;document.dispatchEvent(new FakeEvent('fullscreenchange'));return Promise.resolve();};
  const controller=createGameFullscreen({document,window});
  return{controller,document,window,root,body,stage,first,second,focus,changes,
    resolveRequest:()=>resolveRequest?.(),nativeExit:()=>{document.fullscreenElement=null;document.dispatchEvent(new FakeEvent('fullscreenchange'));},
    stats:()=>({requests,exits,requestOptions,resizeCount})};
}
const settle=async()=>{for(let n=0;n<5;n++)await Promise.resolve();};

test('construction is idle and creates one persistent exit control without touching game state or requesting fullscreen',()=>{
  const h=harness();assert.equal(h.controller.state().active,false);assert.equal(h.stats().requests,0);
  const exit=h.body.children.find(node=>node.className==='game-fullscreen-exit');assert.equal(exit.hidden,true);assert.equal(exit.getAttribute('aria-label'),'全画面表示を終了');
  assert.equal(h.first.getAttribute('aria-pressed'),'false');assert.equal(h.stage.parentElement,h.body);assert.equal(h.first.parentElement,h.stage);h.controller.dispose();
});

test('iPhone-style fallback fills the selected game and exit restores scroll, focus and existing CSS variables',async()=>{
  const h=harness();h.root.style.setProperty('--game-fullscreen-height','80vh','important');
  assert.equal(await h.controller.enter(h.first),true);assert.equal(h.controller.state().native,false);
  assert.equal(h.body.classList.contains('game-fullscreen'),true);assert.equal(h.stage.classList.contains('game-fullscreen-target'),true);assert.equal(h.first.getAttribute('aria-pressed'),'true');assert.equal(h.second.getAttribute('aria-pressed'),'true');
  assert.equal(h.root.style.getPropertyValue('--game-fullscreen-height'),'720px');assert.equal(h.root.style.getPropertyValue('--game-fullscreen-width'),'1280px');
  h.window.scrollTo(0,0);await h.controller.exit();assert.equal(h.body.classList.contains('game-fullscreen'),false);assert.equal(h.stage.classList.contains('game-fullscreen-target'),false);
  assert.deepEqual(h.window.scrolls.at(-1),[19,430]);assert.deepEqual(h.focus.focusCalls.at(-1),{preventScroll:true});assert.equal(h.root.style.getPropertyValue('--game-fullscreen-height'),'80vh');assert.equal(h.root.style.getPropertyPriority('--game-fullscreen-height'),'important');assert.equal(h.root.style.getPropertyValue('--game-fullscreen-width'),'');
  assert.deepEqual(h.changes.map(change=>change.active),[true,false]);assert.equal(h.stats().resizeCount,2);h.controller.dispose();
});

test('desktop native fullscreen uses html so modal dialogs remain outside the fixed game target',async()=>{
  const h=harness('native');await h.controller.enter(h.first);
  assert.equal(h.document.fullscreenElement,h.root);assert.equal(h.controller.state().native,true);assert.equal(h.stats().requests,1);assert.deepEqual(h.stats().requestOptions,{navigationUI:'hide'});
  await h.controller.exit();assert.equal(h.stats().exits,1);assert.equal(h.document.fullscreenElement,null);assert.equal(h.controller.state().active,false);assert.equal(h.stage.parentElement,h.body);h.controller.dispose();
});

test('a rejected native request leaves a usable viewport fallback and exit button',async()=>{
  const h=harness('rejected');assert.equal(await h.controller.enter(),true);assert.equal(h.controller.state().active,true);assert.equal(h.controller.state().native,false);assert.equal(h.controller.state().busy,false);
  const exit=h.body.children.find(node=>node.className==='game-fullscreen-exit');assert.equal(exit.hidden,false);exit.dispatchEvent(new FakeEvent('click'));await settle();assert.equal(h.controller.state().active,false);assert.equal(h.stats().exits,0);h.controller.dispose();
});

test('Escape exits fallback in capture phase while an open game dialog retains its own Escape behavior',async()=>{
  const h=harness();await h.controller.enter();h.document.hasDialog=true;
  const modalEscape=new FakeEvent('keydown',{key:'Escape'});h.document.dispatchEvent(modalEscape);assert.equal(modalEscape.defaultPrevented,false);assert.equal(h.controller.state().active,true);
  h.document.hasDialog=false;const escape=new FakeEvent('keydown',{key:'Escape'});h.document.dispatchEvent(escape);await settle();assert.equal(escape.defaultPrevented,true);assert.equal(escape.propagationStopped,true);assert.equal(h.controller.state().active,false);
  assert.equal(h.document.listeners.get('keydown')[0].options,true);h.controller.dispose();
});

test('the browser native exit event clears presentation and returns every button to normal',async()=>{
  const h=harness('native');await h.controller.enter();h.nativeExit();assert.equal(h.controller.state().active,false);assert.equal(h.first.getAttribute('aria-pressed'),'false');assert.equal(h.second.getAttribute('aria-pressed'),'false');assert.deepEqual(h.window.scrolls.at(-1),[19,430]);
  await h.controller.enter(h.second);assert.equal(h.controller.state().native,true);assert.equal(h.stats().requests,2);h.controller.dispose();await settle();
});

test('exit during a pending native request cannot resurrect fullscreen or allow a second overlapping request',async()=>{
  const h=harness('deferred'),entering=h.controller.enter();assert.equal(h.controller.state().active,true);assert.equal(h.controller.state().busy,true);
  await h.controller.exit();assert.equal(h.controller.state().active,false);assert.equal(await h.controller.enter(),false);assert.equal(h.stats().requests,1);
  h.resolveRequest();assert.equal(await entering,false);await settle();assert.equal(h.document.fullscreenElement,null);assert.equal(h.controller.state().active,false);assert.equal(h.controller.state().busy,false);assert.equal(h.stats().exits,1);h.controller.dispose();
});

test('viewport and orientation resize update the frame without restarting a game or dispatching synthetic blur',async()=>{
  const h=harness();let blurs=0;h.window.addEventListener('blur',()=>blurs++);await h.controller.enter();
  h.window.innerWidth=844;h.window.visualViewport.height=390;h.window.visualViewport.dispatchEvent(new FakeEvent('resize'));assert.equal(h.root.style.getPropertyValue('--game-fullscreen-height'),'390px');assert.equal(h.root.style.getPropertyValue('--game-fullscreen-width'),'844px');
  assert.equal(h.changes.length,1);assert.equal(blurs,0);await h.controller.exit();h.window.visualViewport.height=700;h.window.visualViewport.dispatchEvent(new FakeEvent('resize'));assert.equal(h.root.style.getPropertyValue('--game-fullscreen-height'),'');h.controller.dispose();
});

test('unusable target selectors safely fall back to the body and initialization is idempotent',async()=>{
  const h=harness();h.controller.dispose();h.first.dataset.fullscreenTarget='[';
  const a=initGameFullscreen(h.document,h.window),b=initGameFullscreen(h.document,h.window);assert.equal(a,b);await a.enter(h.first);assert.equal(a.state().target,h.body);assert.equal(h.body.classList.contains('game-fullscreen-target'),true);await a.exit();a.dispose();
});

test('dispose restores native presentation, removes listeners and prevents late or future entry',async()=>{
  const h=harness('deferred'),entering=h.controller.enter();h.controller.dispose();assert.equal(h.body.classList.contains('game-fullscreen'),false);assert.equal(h.document.listeners.get('keydown').length,0);assert.equal(h.window.visualViewport.listeners.get('resize').length,0);assert.equal(await h.controller.enter(),false);
  h.resolveRequest();assert.equal(await entering,false);await settle();assert.equal(h.document.fullscreenElement,null);assert.equal(h.stats().exits,1);assert.ok(!h.body.children.some(node=>node.className==='game-fullscreen-exit'));
});

test('entry focuses the game for keyboard play and restores temporary focus attributes on exit',async()=>{
  const h=harness();await h.controller.enter();assert.deepEqual(h.stage.focusCalls.at(-1),{preventScroll:true});assert.equal(h.stage.getAttribute('tabindex'),'-1');
  await h.controller.exit();assert.equal(h.stage.getAttribute('tabindex'),null);assert.deepEqual(h.focus.focusCalls.at(-1),{preventScroll:true});
  const canvas=new Element('canvas');canvas.setAttribute('tabindex','0');h.first.dataset.fullscreenFocus='#board';const original=h.document.querySelector;
  h.document.querySelector=selector=>selector==='#board'?canvas:original(selector);
  await h.controller.enter(h.first);assert.deepEqual(canvas.focusCalls.at(-1),{preventScroll:true});await h.controller.exit();assert.equal(canvas.getAttribute('tabindex'),'0');h.controller.dispose();
});
