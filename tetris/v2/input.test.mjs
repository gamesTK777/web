import test from 'node:test';
import assert from 'node:assert/strict';
import {KeyboardInput,GestureInput,bindGestures} from './input.mjs';

const point=(x=100,y=100,time=0,id=1)=>({id,x,y,time});
function setup(){const actions=[];const input=new GestureInput(a=>actions.push(a));input.begin(point());return {input,actions};}
test('keyboard needs actual events, release/reset reject orphan repeats',()=>{
  const k=new KeyboardInput();assert.equal(k.press('ArrowRight'),'right');
  assert.equal(k.press('ArrowRight',true),'right');k.release('ArrowRight');
  assert.equal(k.press('ArrowRight',true),null);k.press('ArrowLeft');k.reset();
  assert.equal(k.press('ArrowLeft',true),null);assert.equal(k.press('Space'),'drop');assert.equal(k.press('Space',true),null);
  assert.equal(k.press('Unknown'),null);
});
test('tap tolerates jitter; holding still never rotates or moves',()=>{
  const {input,actions}=setup();input.end(point(103,102,120));assert.deepEqual(actions,['rotate']);
  input.begin(point());input.move(point(100,100,900));input.end(point(100,100,1000));assert.deepEqual(actions,['rotate']);
});
test('horizontal travel, reversal and stationary finger have no timed drift',()=>{
  const {input,actions}=setup();input.move(point(148,100,100));input.move(point(148,100,2000));
  assert.deepEqual(actions,['right','right']);input.move(point(124,100,2100));input.end(point(124,100,2200));
  assert.deepEqual(actions,['right','right','left']);input.move(point(300,100,2300));assert.equal(actions.length,3);
});
test('short flick moves one cell in either direction without rotation',()=>{
  for(const [x,direction] of [[85,'left'],[115,'right']]){const {input,actions}=setup();input.end(point(x,101,100));assert.deepEqual(actions,[direction]);}
});
test('down flick hard drops exactly once; up flick holds',()=>{
  const {input,actions}=setup();input.move(point(101,170,100));assert.deepEqual(actions,[]);input.end(point(101,180,140));input.end(point(101,180,145));
  input.begin(point());input.end(point(100,40,150));assert.deepEqual(actions,['drop','hold']);
});
test('slow downward drag soft drops and never turns into hard drop',()=>{
  const {input,actions}=setup();input.move(point(100,148,400));input.end(point(100,172,600));assert.deepEqual(actions,['down','down','down']);
});
test('axis lock prevents diagonal drag from dropping',()=>{
  const {input,actions}=setup();input.move(point(124,100,50));input.end(point(124,200,150));assert.deepEqual(actions,['right']);
});
test('cancel, reset and expired gesture cannot emit later actions',()=>{
  for(const cancel of [i=>i.cancel(1),i=>i.reset(),i=>i.move(point(100,100,4100))]){const {input,actions}=setup();cancel(input);input.end(point(180,100,4200));assert.deepEqual(actions,[]);}
});
test('multi-touch cancels until all fingers lift; unrelated release preserves gesture',()=>{
  const {input,actions}=setup();input.end(point(0,0,10,9));assert.equal(input.active.id,1);
  input.begin({...point(100,100,20,2),primary:false});input.end(point(160,100,100));input.end(point(100,100,110,2));assert.deepEqual(actions,[]);
  input.begin(point());input.end(point(100,100,100));assert.deepEqual(actions,['rotate']);
});
test('piece transition during movement stops remaining steps',()=>{
  let count=0;const input=new GestureInput(()=>{count++;input.reset();});input.begin(point());input.move(point(200,100,100));assert.equal(count,1);
});

class Surface extends EventTarget {
  captures=new Set();focus(){}setPointerCapture(id){this.captures.add(id);}hasPointerCapture(id){return this.captures.has(id);}releasePointerCapture(id){this.captures.delete(id);}
}
function dispatch(target,type,extra={}){const e=new Event(type,{cancelable:true});Object.defineProperties(e,Object.fromEntries(Object.entries({pointerId:1,clientX:100,clientY:100,timeStamp:0,button:0,buttons:1,isPrimary:true,pointerType:'touch',...extra}).map(([k,v])=>[k,{value:v}])));target.dispatchEvent(e);}
test('DOM binding captures off-board release and cancels interrupted inputs',()=>{
  const surface=new Surface(),doc=new Surface(),win=new Surface(),actions=[];let enabled=true;
  const input=new GestureInput(a=>actions.push(a));const binding=bindGestures([surface],{input,enabled:()=>enabled,unit:()=>24,doc,win});
  dispatch(surface,'pointerdown');dispatch(doc,'pointermove',{clientX:124,timeStamp:100});dispatch(doc,'pointerup',{clientX:124,timeStamp:120});
  dispatch(doc,'pointermove',{clientX:196,timeStamp:300});assert.deepEqual(actions,['right']);assert.equal(surface.captures.size,0);
  for(const interrupt of [()=>dispatch(doc,'pointercancel'),()=>dispatch(surface,'lostpointercapture'),()=>{win.innerWidth=400;dispatch(win,'resize');win.innerWidth=390;dispatch(win,'resize');},()=>binding.reset(),()=>dispatch(doc,'pointermove',{pointerType:'mouse',buttons:0}),()=>dispatch(doc,'pointerdown',{isPrimary:false,pointerId:2})]){
    dispatch(surface,'pointerdown');interrupt();dispatch(doc,'pointerup',{clientX:180,timeStamp:150});assert.deepEqual(actions,['right']);
  }
  dispatch(surface,'pointerdown');enabled=false;dispatch(doc,'pointerup',{clientY:180,timeStamp:100});assert.deepEqual(actions,['right']);
});

const finger=(x=100,y=100,id=7)=>({identifier:id,clientX:x,clientY:y});
function touch(target,type,touches,changedTouches=touches,timeStamp=0){
  const e=new Event(type,{cancelable:true});Object.defineProperties(e,{touches:{value:touches},changedTouches:{value:changedTouches},timeStamp:{value:timeStamp}});target.dispatchEvent(e);return e;
}
function touchSetup(){
  const surface=new Surface(),doc=new Surface(),win=new Surface(),actions=[];win.innerWidth=390;
  const input=new GestureInput(a=>actions.push(a));let enabled=true;
  const binding=bindGestures([surface],{input,enabled:()=>enabled,unit:()=>24,doc,win,touchEvents:true});
  return {surface,doc,win,input,actions,binding,disable:()=>enabled=false};
}
test('Safari touch-only horizontal flick works without pointer events or capture',()=>{
  const {surface,doc,actions}=touchSetup();assert.equal(touch(surface,'touchstart',[finger()]).defaultPrevented,true);
  assert.equal(touch(doc,'touchmove',[finger(52)],undefined,80).defaultPrevented,true);
  touch(doc,'touchend',[],[finger(52)],130);assert.deepEqual(actions,['left','left']);assert.equal(surface.captures.size,0);
});
test('Safari pointer boundary and address-bar resize cannot cancel native touch',()=>{
  const {surface,doc,win,actions}=touchSetup();touch(surface,'touchstart',[finger()]);
  dispatch(win,'pointerout',{pointerType:'touch',relatedTarget:null});dispatch(surface,'lostpointercapture',{pointerType:'touch'});
  win.innerHeight=650;dispatch(win,'resize');touch(doc,'touchend',[],[finger(148)],120);assert.deepEqual(actions,['right','right']);
});
test('interleaved pointer/touch streams and compatibility mouse events act once',()=>{
  const {surface,doc,actions}=touchSetup();dispatch(surface,'pointerdown',{pointerType:'touch'});touch(surface,'touchstart',[finger()]);
  dispatch(doc,'pointerup',{pointerType:'touch',timeStamp:100});touch(doc,'touchend',[],[finger()],100);
  dispatch(surface,'pointerdown',{pointerType:'mouse',timeStamp:110});dispatch(doc,'pointerup',{pointerType:'mouse',timeStamp:120});assert.deepEqual(actions,['rotate']);
});
test('native touch vertical flicks drop and hold, cancelled streams stay silent',()=>{
  const {surface,doc,actions}=touchSetup();touch(surface,'touchstart',[finger()]);touch(doc,'touchend',[],[finger(100,180)],100);
  touch(surface,'touchstart',[finger()],undefined,200);touch(doc,'touchend',[],[finger(100,40)],300);
  touch(surface,'touchstart',[finger()],undefined,400);touch(doc,'touchcancel',[],[finger()],410);touch(doc,'touchend',[],[finger(180)],450);
  assert.deepEqual(actions,['drop','hold']);
});
test('second finger outside control cancels and cannot accidentally rotate',()=>{
  const {surface,doc,actions}=touchSetup();touch(surface,'touchstart',[finger()]);touch(doc,'touchstart',[finger(),finger(100,100,8)],[finger(100,100,8)],30);
  touch(doc,'touchend',[finger(100,100,8)],[finger()],80);touch(doc,'touchend',[],[finger(100,100,8)],100);assert.deepEqual(actions,[]);
  touch(surface,'touchstart',[finger()],undefined,200);touch(doc,'touchend',[],[finger()],280);assert.deepEqual(actions,['rotate']);
});
test('touch stops on pause, orientation change and release outside controls',()=>{
  for(const cancel of [s=>s.binding.reset(),s=>s.disable(),s=>{s.win.innerWidth=844;dispatch(s.win,'resize');}]){
    const s=touchSetup();touch(s.surface,'touchstart',[finger()]);cancel(s);touch(s.doc,'touchend',[],[finger(180)],100);assert.deepEqual(s.actions,[]);
  }
});
