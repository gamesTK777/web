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
  dispatch(surface,'pointerdown');dispatch(surface,'pointermove',{clientX:124,timeStamp:100});dispatch(doc,'pointerup',{clientX:124,timeStamp:120});
  dispatch(surface,'pointermove',{clientX:196,timeStamp:300});assert.deepEqual(actions,['right']);assert.equal(surface.captures.size,0);
  for(const interrupt of [()=>dispatch(doc,'pointercancel'),()=>dispatch(surface,'lostpointercapture'),()=>dispatch(win,'resize'),()=>dispatch(win,'pointerout',{relatedTarget:null}),()=>binding.reset(),()=>dispatch(surface,'pointermove',{pointerType:'mouse',buttons:0}),()=>dispatch(doc,'pointerdown',{isPrimary:false,pointerId:2})]){
    dispatch(surface,'pointerdown');interrupt();dispatch(doc,'pointerup',{clientX:180,timeStamp:150});assert.deepEqual(actions,['right']);
  }
  dispatch(surface,'pointerdown');enabled=false;dispatch(doc,'pointerup',{clientY:180,timeStamp:100});assert.deepEqual(actions,['right']);
});
