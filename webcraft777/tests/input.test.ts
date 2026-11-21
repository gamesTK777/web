import test, {type TestContext} from "node:test";
import assert from "node:assert/strict";
import {InputController} from "../src/input.ts";

// Dispatch through the production event listeners. Node supplies EventTarget;
// browser permission, pointer-lock ownership and timers are simulated here.
function fire(target:EventTarget,type:string,fields:Record<string,unknown>={}) {
  const {target:source,...props}=fields;
  const event=Object.assign(new Event(type,{cancelable:true}),props);
  if(source)Object.defineProperty(event,'target',{value:source});
  target.dispatchEvent(event);
}
function touchButton() {
  const styles=new Map<string,string>(), captured=new Set<number>();
  return Object.assign(new EventTarget(),{
    style:{setProperty:(name:string,value:string)=>styles.set(name,value),removeProperty:(name:string)=>styles.delete(name)},
    dataset:{} as Record<string,string>,
    getBoundingClientRect:()=>({left:0,top:100,width:100,height:100}),
    setPointerCapture:(id:number)=>captured.add(id),
    releasePointerCapture:(id:number)=>captured.delete(id),
    hasPointerCapture:(id:number)=>captured.has(id),
    styles,captured
  });
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
  const events={pauses:0,backgrounds:0,mines:0,places:0,picks:0,undos:0,rotates:0,cycles:0,looks:[] as number[][],drag:[] as boolean[],recoveries:[] as string[]};
  const pose={yaw:0,pitch:0};
  const touch={stick:touchButton(),jump:touchButton(),down:touchButton()};
  const input=new InputController(canvas as unknown as HTMLCanvasElement,{
    pause(){events.pauses++;input.stop();}, // Same stop-on-pause contract as the game.
    background(){events.backgrounds++;},beginMine(){events.mines++;},place(){events.places++;},
    look(x,y){events.looks.push([x,y]);input.applyLook(pose,x,y,1);},dragChanged(on){events.drag.push(on);},
    inventory(){},fly(){},debug(){},select(){},cycle(direction){events.cycles+=direction;},
    recovery(message){events.recoveries.push(message);},
    pick(){events.picks++;},undo(){events.undos++;},rotate(){events.rotates++;}
  },touch as unknown as {stick:HTMLElement;jump:HTMLButtonElement;down:HTMLButtonElement});
  function grant(){doc.pointerLockElement=canvas;fire(doc,"pointerlockchange");}
  function hold(){fire(win,"keydown",{code:"KeyW"});fire(win,"keydown",{code:"ShiftLeft"});fire(canvas,"pointerdown",{button:0});}
  input.rememberView(pose);
  return {canvas,doc,win,timers,events,input,pose,grant,hold,touch};
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
  fire(h.win,"pointerup",{pointerId:3,button:0,buttons:0});fire(h.canvas,"pointermove",{pointerId:3,clientX:50,clientY:50});
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

test("ドラッグ開始後に遅れて届いた固定許可は解放される",t=>{
  const h=setup(t,()=>{});
  h.input.start(false);
  h.timers[0]();
  h.grant();
  assert.equal(h.doc.pointerLockElement,null);
  assert.equal(h.input.drag,true);
  assert.deepEqual(h.events.drag,[true]);
});

test("固定の解除通知を待たず視点や設置を停止し、ドラッグで復帰できる",t=>{
  const h=setup(t,()=>{});
  h.input.start(false);h.grant();h.hold();
  h.doc.pointerLockElement=null;
  fire(h.canvas,'pointerdown',{button:2,pointerType:'mouse'});
  assert.equal(h.events.places,0);
  assert.equal(h.events.pauses,1);
  assert.equal(h.events.recoveries.length,1);
  assert.equal(h.input.frame(h.pose,.016),false);
  assert.equal(h.input.mining,false);
  h.input.start(true);
  fire(h.canvas,'pointerdown',{button:0,pointerId:1,pointerType:'mouse',clientX:10,clientY:20});
  fire(h.canvas,'pointermove',{pointerId:1,pointerType:'mouse',buttons:1,clientX:40,clientY:10});
  assert.deepEqual(h.events.looks,[[30,-10]]);
  assert.equal(h.input.frame(h.pose,.016),true);
});

test("高速な切り返しを受け付け、固定カーソルの異常な移動や非有限値から復帰する",t=>{
  const h=setup(t,()=>{});
  h.input.start(false);h.grant();
  for(let i=0;i<250;i++){
    fire(h.doc,'mousemove',{movementX:85,movementY:-34});
    fire(h.doc,'mousemove',{movementX:-85,movementY:34});
  }
  assert.equal(h.events.looks.length,500);
  assert(Math.abs(h.pose.yaw)<1e-10&&Math.abs(h.pose.pitch)<1e-10);
  fire(h.doc,'mousemove',{movementX:770,movementY:0});
  assert(Math.abs(h.pose.yaw+770*.00235)<1e-10);
  fire(h.doc,'mousemove',{movementX:-770,movementY:0});
  fire(h.doc,'mousemove',{movementX:1024,movementY:630});
  assert(Math.abs(Math.hypot(h.pose.yaw,h.pose.pitch)-2*Math.PI/3)<1e-10);
  const safe={...h.pose};
  fire(h.doc,'mousemove',{movementX:2147483647,movementY:0});
  assert.deepEqual(h.pose,safe);
  fire(h.doc,'mousemove',{movementX:NaN,movementY:0});
  assert.deepEqual(h.pose,safe);
  assert.equal(h.input.active,false);
  assert.equal(h.doc.pointerLockElement,null);
  h.input.start(true);
  h.pose.yaw=Infinity;
  assert.equal(h.input.frame(h.pose,.016),false);
  assert.deepEqual(h.pose,safe);
  assert(h.input.report().anomalies>=4 && h.input.report().events.length<=192);
});

test("マウス固定中は別ボタンを押したまま主ボタンを離しても採掘が止まる",t=>{
  const h=setup(t,()=>{});
  h.input.start(false);h.grant();
  for(const release of ['mouseup','mousemove','pointerup'] as const){
    fire(h.canvas,'pointerdown',{button:0,pointerId:1,pointerType:'mouse',buttons:1});
    assert.equal(h.input.mining,true);
    if(release==='mouseup')fire(h.win,release,{button:0,buttons:2});
    if(release==='mousemove')fire(h.doc,release,{buttons:2,movementX:2,movementY:-1});
    if(release==='pointerup')fire(h.win,release,{pointerId:1,button:2,buttons:0});
    assert.equal(h.input.mining,false,release);
  }
});

test("ドラッグと専用の採掘ボタンは主ボタンの状態とキャプチャを共有する",t=>{
  const h=setup(t);
  h.input.start(true);
  fire(h.canvas,'pointerdown',{button:0,pointerId:1,pointerType:'mouse',clientX:10,clientY:20});
  fire(h.canvas,'pointermove',{pointerId:1,buttons:2,clientX:40,clientY:10});
  assert.deepEqual(h.events.looks,[]);
  const mine={closest(){return mine;},disabled:false};
  fire(h.doc,'pointerdown',{target:mine,button:0,pointerId:1,pointerType:'mouse'});
  assert.equal(h.input.mining,true);
  fire(h.win,'mouseup',{button:0,buttons:2});
  assert.equal(h.input.mining,false);
  fire(h.doc,'pointerdown',{target:mine,button:0,pointerId:1,pointerType:'mouse'});
  assert.equal(h.input.mining,true);
  fire(h.doc,'lostpointercapture',{target:mine,pointerId:1});
  assert.equal(h.input.mining,false);
});

test("トラックパッドの横スワイプとピンチをホットバーから除外し、細かな縦入力はまとめる",t=>{
  const h=setup(t);
  h.input.start(true);
  fire(h.canvas,'wheel',{deltaX:200,deltaY:12,deltaMode:0});
  fire(h.canvas,'wheel',{deltaX:0,deltaY:100,deltaMode:0,ctrlKey:true});
  for(let i=0;i<47;i++)fire(h.canvas,'wheel',{deltaX:0,deltaY:1,deltaMode:0});
  assert.equal(h.events.cycles,0);
  fire(h.canvas,'wheel',{deltaX:0,deltaY:1,deltaMode:0});
  for(let i=0;i<30;i++)fire(h.canvas,'wheel',{deltaX:0,deltaY:200,deltaMode:0});
  assert.equal(h.events.cycles,1);
});

test("別々の指で移動・視点・採掘・ジャンプを扱い、離した指の操作だけが止まる",t=>{
  const h=setup(t);
  const press=(el:EventTarget,id:number,clientX=50,clientY=150)=>fire(el,'pointerdown',{pointerType:'touch',pointerId:id,button:0,clientX,clientY});
  const release=(id:number)=>fire(h.win,'pointerup',{pointerType:'touch',pointerId:id,button:0,buttons:0});
  h.input.start(true);
  press(h.touch.stick,1,52,149);
  assert.equal(h.input.movement().forward,0);
  assert.equal(h.input.movement().right,0);
  fire(h.doc,'pointermove',{pointerId:1,clientX:100,clientY:100});
  const diagonal=h.input.movement();
  assert.ok(diagonal.forward>0 && diagonal.right>0);
  assert.ok(Math.abs(Math.hypot(diagonal.forward,diagonal.right)-1)<1e-10);

  press(h.canvas,2);
  const mine=Object.assign(touchButton(),{disabled:false,closest(){return this;}});
  fire(h.doc,'pointerdown',{target:mine,pointerId:3,pointerType:'touch',button:0});
  assert.equal(h.events.mines,1);
  fire(h.canvas,'pointermove',{pointerId:2,pointerType:'touch',clientX:80,clientY:132});
  assert.deepEqual(h.events.looks,[[30,-18]]);
  release(2);
  assert.equal(h.input.mining,true);
  assert.equal(h.input.movement().forward,diagonal.forward);

  press(h.touch.jump,4);
  release(4);
  assert.equal(h.input.movement().jumpPressed,true);
  assert.equal(h.input.movement().jumpPressed,false);
  fire(h.doc,'lostpointercapture',{target:h.touch.stick,pointerId:1});
  assert.equal(h.input.movement().forward,0);
  assert.equal(h.touch.stick.styles.size,0);
  assert.equal(h.touch.stick.captured.size,0);
  assert.equal(h.input.mining,true);
  fire(h.win,'pointercancel',{pointerId:3});
  assert.equal(h.input.mining,false);
});

test("端末の向き変更で移動・上昇・下降を解除し、視点モードを止めずに操作を続けられる",t=>{
  const h=setup(t);
  h.input.start(true);
  const press=(el:EventTarget,id:number)=>fire(el,'pointerdown',{pointerType:'touch',pointerId:id,button:0,clientX:50,clientY:115});
  press(h.touch.stick,1);
  press(h.touch.jump,2);
  press(h.touch.down,3);
  assert.equal(h.input.movement().forward,1);
  assert.equal(h.input.movement().jump,true);
  assert.equal(h.input.movement().down,true);
  fire(h.win,'orientationchange');
  assert.equal(h.input.movement().forward,0);
  assert.equal(h.input.movement().jump,false);
  assert.equal(h.input.movement().down,false);
  assert.equal(h.input.drag,true);
  press(h.touch.stick,4);
  assert.equal(h.input.movement().forward,1);
  fire(h.win,'blur');
  assert.equal(h.input.active,false);
  assert.equal(h.input.movement().forward,0);
  h.input.start(true);
  assert.equal(h.input.movement().forward,0);
});
