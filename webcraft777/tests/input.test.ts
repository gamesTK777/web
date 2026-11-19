import test, {type TestContext} from "node:test";
import assert from "node:assert/strict";
import {InputController} from "../src/input.ts";

// Dispatch through the production event listeners. Node supplies EventTarget;
// browser permission, pointer-lock ownership and timers are simulated here.
function fire(target:EventTarget,type:string,fields:Record<string,unknown>={}) {
  target.dispatchEvent(Object.assign(new Event(type,{cancelable:true}),fields));
}
function setup(t:TestContext,request?:(()=>Promise<void>|void)) {
  const canvas=Object.assign(new EventTarget(),{focus(){},requestPointerLock:request});
  const doc=Object.assign(new EventTarget(),{hidden:false,pointerLockElement:null as EventTarget|null,
    exitPointerLock(){this.pointerLockElement=null;fire(this,"pointerlockchange");}});
  const timers:(()=>void)[]=[];
  const win=Object.assign(new EventTarget(),{setTimeout(fn:()=>void){timers.push(fn);return timers.length;}});
  for(const [name,value] of Object.entries({window:win,document:doc})){
    const original=Object.getOwnPropertyDescriptor(globalThis,name);
    Object.defineProperty(globalThis,name,{value,configurable:true});
    t.after(()=>{if(original)Object.defineProperty(globalThis,name,original);else Reflect.deleteProperty(globalThis,name);});
  }
  const events={pauses:0,backgrounds:0,mines:0,places:0,picks:0,undos:0,rotates:0,looks:[] as number[][],drag:[] as boolean[]};
  const input=new InputController(canvas as unknown as HTMLCanvasElement,{
    pause(){events.pauses++;input.stop();}, // Same stop-on-pause contract as the game.
    background(){events.backgrounds++;},beginMine(){events.mines++;},place(){events.places++;},
    look(x,y){events.looks.push([x,y]);},dragChanged(on){events.drag.push(on);},
    inventory(){},fly(){},debug(){},select(){},cycle(){},
    pick(){events.picks++;},undo(){events.undos++;},rotate(){events.rotates++;}
  });
  function grant(){doc.pointerLockElement=canvas;fire(doc,"pointerlockchange");}
  function hold(){fire(win,"keydown",{code:"KeyW"});fire(win,"keydown",{code:"ShiftLeft"});fire(canvas,"pointerdown",{button:0});}
  return {canvas,doc,win,timers,events,input,grant,hold};
}

test("Pointer Lock は要求後の所有権変更で有効になり、解除通知で一度だけ停止する",t=>{
  let requests=0;
  const h=setup(t,()=>{requests++;});h.input.start(false);
  assert.equal(requests,1);fire(h.doc,"mousemove",{movementX:5,movementY:-2});
  assert.deepEqual(h.events.looks,[]);
  h.grant();fire(h.doc,"mousemove",{movementX:5,movementY:-2});
  assert.deepEqual(h.events.drag,[false]);assert.deepEqual(h.events.looks,[[5,-2]]);
  h.hold();assert(h.input.mining);
  h.doc.exitPointerLock();
  assert.equal(h.events.pauses,1);assert.equal(h.input.active,false);assert.equal(h.input.mining,false);
  assert.equal(h.input.keys.size,0);
});

test("a space tap between frames is consumed once; repeats from a formerly focused tab are ignored",t=>{
  const h=setup(t);h.input.start(true);
  fire(h.win,"keydown",{code:"Space"});fire(h.win,"keyup",{code:"Space"});
  const tapped=h.input.movement();
  assert.equal(tapped.jump,false);assert.equal(tapped.jumpPressed,true);assert.equal(h.input.movement().jumpPressed,false);
  fire(h.win,"keydown",{code:"KeyC"});assert.equal(h.input.movement().down,true);
  fire(h.win,"blur");h.input.start(true);
  fire(h.win,"keydown",{code:"KeyC",repeat:true});assert.equal(h.input.movement().down,false);
});

test("building shortcuts do not double-trigger and a secondary mouse release never cancels mining",t=>{
  const h=setup(t,()=>{});h.input.start(false);h.grant();h.hold();
  fire(h.canvas,"pointerdown",{button:1});fire(h.win,"pointerup",{button:1});
  assert.equal(h.input.mining,true);assert.equal(h.events.picks,1);
  fire(h.win,"keydown",{code:"KeyQ"});fire(h.win,"keydown",{code:"KeyQ",repeat:true});
  fire(h.win,"keydown",{code:"KeyZ",ctrlKey:true});fire(h.win,"keydown",{code:"KeyR"});
  assert.deepEqual([h.events.picks,h.events.undos,h.events.rotates],[2,1,1]);
  h.input.stop();fire(h.win,"keydown",{code:"KeyZ",ctrlKey:true});assert.equal(h.events.undos,1);
});

for(const cause of ["blur","visibilitychange"] as const){
  test(cause+" で移動・ダッシュ・採掘を解除し、再開後も押しっぱなしにならない",t=>{
    const h=setup(t,()=>{});h.input.start(false);h.grant();h.hold();
    assert.equal(h.input.movement().forward,1);assert(h.input.movement().sprint);
    assert(h.input.mining);assert.equal(h.events.mines,1);
    if(cause==="blur")fire(h.win,"blur");
    else {fire(h.doc,"visibilitychange");assert(h.input.active);h.doc.hidden=true;fire(h.doc,cause);}
    assert.equal(h.events.pauses,1);assert.equal(h.events.backgrounds,Number(cause==="visibilitychange"));
    assert.equal(h.input.active,false);assert.equal(h.input.mining,false);assert.equal(h.input.keys.size,0);
    fire(h.canvas,"pointerdown",{button:0});assert.equal(h.events.mines,1);
    h.doc.hidden=false;h.input.start(true);
    assert.equal(h.input.movement().forward,0);assert.equal(h.input.movement().sprint,false);
  });
}

test("APIがない場合はドラッグ・右クリックが動作し、ドラッグ終了後の移動は無視する",t=>{
  const h=setup(t);h.input.start(false);
  assert.deepEqual(h.events.drag,[true]);assert(h.input.active);
  fire(h.canvas,"pointerdown",{button:0,pointerId:3,clientX:20,clientY:20});
  fire(h.canvas,"pointermove",{pointerId:3,clientX:25,clientY:18});
  fire(h.win,"pointerup");fire(h.canvas,"pointermove",{pointerId:3,clientX:50,clientY:50});
  fire(h.canvas,"pointerdown",{button:2});
  assert.deepEqual(h.events.looks,[[5,-2]]);assert.equal(h.events.places,1);
  assert.equal(h.input.mining,false);assert.equal(h.events.mines,0);
});

test("ブラウザーが要求を拒否してもプレイを継続し、Escapeで停止できる",async t=>{
  const h=setup(t,()=>Promise.reject(new Error("permission denied")));h.input.start(false);
  await Promise.resolve();
  assert.deepEqual(h.events.drag,[true]);assert(h.input.drag);assert(h.input.active);
  fire(h.win,"keydown",{code:"Escape"});assert.equal(h.events.pauses,1);assert.equal(h.input.active,false);
});

test("結果が返らないときにも代替操作へ切り替え、停止後の遅延取得は解放する",t=>{
  const h=setup(t,()=>{});h.input.start(false);
  assert.deepEqual(h.events.drag,[]);h.timers[0]();assert.deepEqual(h.events.drag,[true]);
  h.input.stop();h.grant();
  assert.equal(h.doc.pointerLockElement,null);assert.equal(h.input.active,false);assert.equal(h.events.pauses,0);
});
