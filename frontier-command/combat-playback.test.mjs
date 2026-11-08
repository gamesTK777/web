import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,applyAction} from './engine.mjs';
import {createCombatReport,getCombatFrame} from './combat-model.mjs';
import {createCombatPlayback} from './combat-playback.mjs';

class Events {
  constructor(){this.listeners=new Map();}
  addEventListener(type,listener){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(listener);}
  removeEventListener(type,listener){this.listeners.get(type)?.delete(listener);}
  emit(type,extra={}){const event={type,target:this,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},...extra};for(const fn of [...(this.listeners.get(type)||[])])fn(event);return event;}
}
class Element extends Events {
  constructor(id,enqueue){super();this.id=id;this.enqueue=enqueue;this.open=false;this.hidden=false;this.textContent='';this.attributes={};this.showCalls=0;this.closeCalls=0;this.focusCalls=0;}
  setAttribute(name,value){this.attributes[name]=String(value);}
  getAttribute(name){return this.attributes[name]??null;}
  focus(){this.focusCalls++;}
  showModal(){assert.equal(this.open,false,'a dialog cannot open twice');this.open=true;this.showCalls++;}
  close(){if(!this.open)return;this.open=false;this.closeCalls++;this.enqueue(()=>this.emit('close'));}
}
function harness({reducedMotion=false}={}){
  const tasks=[],ids=['combatDialog','combatCanvas','combatLeftName','combatRightName','combatLeftCount','combatRightCount','combatLeftMeter','combatRightMeter','combatTitle','combatStage','combatSummary','skipCombatButton','combatCloseButton'];
  const elements=new Map(ids.map(id=>[id,new Element(id,fn=>tasks.push(fn))])),document=new Events();document.hidden=false;document.getElementById=id=>elements.get(id)||null;
  let now=0,rafId=1;const callbacks=new Map(),window={matchMedia:()=>({matches:reducedMotion}),requestAnimationFrame(fn){const id=rafId++;callbacks.set(id,fn);return id;},cancelAnimationFrame(id){callbacks.delete(id);}};
  const step=(milliseconds=40)=>{now+=milliseconds;const pending=[...callbacks.values()];callbacks.clear();for(const fn of pending)fn(now);};
  const flush=()=>{for(let n=0;tasks.length&&n<100;n++)tasks.shift()();assert.equal(tasks.length,0,'DOM event queue did not settle');};
  const untilDone=controller=>{let frames=0;while(controller.isPlaying()&&frames++<200){step();flush();}assert.ok(frames<200,'playback failed to settle within bounded RAF frames');};
  return {document,window,elements,dialog:elements.get('combatDialog'),canvas:elements.get('combatCanvas'),step,flush,untilDone,queuedFrames:()=>callbacks.size,visibility(hidden){document.hidden=hidden;document.emit('visibilitychange');}};
}
function report({team=0,attackerHp=10,defenderHp=10}={}){
  const before=createGame({missionId:5});before.turn=team;before.units=[{id:'u1',type:'tank',team,x:3,y:4,hp:attackerHp,moved:false,acted:false},{id:'u2',type:'tank',team:1-team,x:4,y:4,hp:defenderHp,moved:false,acted:false}];before.idSeq=3;
  for(const u of before.units)Object.assign(before.tiles[u.y*before.width+u.x],{terrain:'plain',building:null,owner:null});
  const result=applyAction(before,{type:'attack',unitId:'u1',targetId:'u2'});assert.equal(result.ok,true,result.error);return createCombatReport(before,result.state,result.event);
}
function record(frames){return (_canvas,_report,frame)=>frames.push({stage:frame.stage,elapsed:frame.elapsed,attackerCount:frame.attackerCount,defenderCount:frame.defenderCount,finished:frame.finished,reducedMotion:frame.reducedMotion});}
function finalCounts(h,combat){const left=combat.attacker.team===0?combat.attacker:combat.defender,right=combat.attacker.team===1?combat.attacker:combat.defender;assert.equal(h.elements.get('combatLeftMeter').value,left.hpAfter);assert.equal(h.elements.get('combatRightMeter').value,right.hpAfter);assert.match(h.elements.get('combatLeftCount').textContent,new RegExp(`HP ${left.hpAfter}$`));assert.match(h.elements.get('combatRightCount').textContent,new RegExp(`HP ${right.hpAfter}$`));}

test('normal playback resolves and closes once, with authoritative final counts and no remaining RAF',async()=>{
  const h=harness(),frames=[],stages=[],combat=report(),before=JSON.stringify(combat),controller=createCombatPlayback({...h,render:record(frames),getFrame:getCombatFrame,onStage:frame=>stages.push(frame.stage)});
  let resolutions=0;const done=controller.play(combat).then(result=>{resolutions++;return result;});assert.equal(controller.isPlaying(),true);assert.equal(h.dialog.open,true);h.untilDone(controller);
  assert.deepEqual(await done,{cancelled:false,skipped:false});assert.equal(resolutions,1);assert.equal(h.dialog.closeCalls,1);assert.equal(h.queuedFrames(),0);assert.deepEqual(stages,['intro','attack','damage','counter','counterDamage','result']);assert.equal(frames.at(-1).finished,true);finalCounts(h,combat);assert.equal(JSON.stringify(combat),before);
  h.step(10000);h.flush();assert.equal(h.dialog.closeCalls,1);assert.equal(resolutions,1);controller.destroy();
});

test('slow visible frames catch up to the real timeline instead of prolonging combat',async()=>{
  const h=harness(),combat=report(),controller=createCombatPlayback({...h,render:()=>{}});
  const done=controller.play(combat);h.step(16);h.step(5000);h.flush();
  assert.deepEqual(await done,{cancelled:false,skipped:false});assert.equal(controller.isPlaying(),false);finalCounts(h,combat);controller.destroy();
});

test('skip and native Escape cancel events immediately release playback and show final engine counts',async()=>{
  for(const via of ['skip','escape']){
    const h=harness(),frames=[],combat=report({team:1}),controller=createCombatPlayback({...h,render:record(frames),getFrame:getCombatFrame}),done=controller.play(combat);h.step();h.step();
    if(via==='skip')h.elements.get('skipCombatButton').emit('click');else assert.equal(h.dialog.emit('cancel').defaultPrevented,true);
    assert.equal(controller.isPlaying(),false);assert.equal(h.dialog.open,false);assert.equal(h.queuedFrames(),0);assert.deepEqual(await done,{cancelled:false,skipped:true});assert.equal(frames.at(-1).stage,'result');assert.equal(frames.at(-1).finished,true);finalCounts(h,combat);h.flush();assert.equal(h.dialog.closeCalls,1);controller.destroy();
  }
});

test('replacement ignores a delayed old close event and settles only the old promise as cancelled',async()=>{
  const h=harness(),frames=[],controller=createCombatPlayback({...h,render:record(frames),getFrame:getCombatFrame}),first=report(),second=report({team:1,attackerHp:8,defenderHp:7});
  const old=controller.play(first);h.step();h.step();const next=controller.play(second);
  assert.deepEqual(await old,{cancelled:true,skipped:false});assert.equal(controller.isPlaying(),true);assert.equal(h.dialog.open,true);
  // HTMLDialogElement.close queues its close event. It may arrive after the
  // same dialog has already been reopened for the replacement session.
  h.flush();assert.equal(controller.isPlaying(),true,'an old close event cancelled the replacement');assert.equal(h.dialog.open,true);
  h.untilDone(controller);assert.deepEqual(await next,{cancelled:false,skipped:false});finalCounts(h,second);assert.equal(h.dialog.showCalls,2);assert.equal(h.dialog.closeCalls,2);assert.equal(h.queuedFrames(),0);controller.destroy();
});

test('explicit cancellation followed by replacement cannot leak old RAF callbacks or unlock the new session',async()=>{
  const h=harness(),frames=[],controller=createCombatPlayback({...h,render:record(frames),getFrame:getCombatFrame}),combat=report();
  const first=controller.play(combat);h.step();controller.cancel();assert.equal(controller.isPlaying(),false);assert.equal(h.queuedFrames(),0);const second=controller.play(combat);h.flush();
  assert.deepEqual(await first,{cancelled:true,skipped:false});assert.equal(controller.isPlaying(),true);assert.equal(h.queuedFrames(),1);h.untilDone(controller);assert.deepEqual(await second,{cancelled:false,skipped:false});assert.equal(h.queuedFrames(),0);controller.destroy();
});

test('hidden documents freeze elapsed time and resume without counting the hidden interval',async()=>{
  const h=harness(),frames=[],controller=createCombatPlayback({...h,render:record(frames),getFrame:getCombatFrame}),done=controller.play(report());for(let n=0;n<8;n++)h.step();const before=frames.at(-1).elapsed;
  h.visibility(true);assert.equal(h.queuedFrames(),0);h.step(12000);h.flush();assert.equal(frames.at(-1).elapsed,before);assert.equal(controller.isPlaying(),true);
  h.visibility(false);assert.equal(h.queuedFrames(),1);h.step();assert.equal(frames.at(-1).elapsed,before);h.step();assert.equal(frames.at(-1).elapsed,before+40);h.untilDone(controller);assert.deepEqual(await done,{cancelled:false,skipped:false});controller.destroy();
});

test('render failures at startup or during animation cancel cleanly without a dialog or input lock',async()=>{
  for(const failingStage of ['intro','attack']){
    const h=harness(),controller=createCombatPlayback({...h,getFrame:getCombatFrame,render(_canvas,_report,frame){if(frame.stage===failingStage)throw Error('display unavailable');}}),done=controller.play(report());h.untilDone(controller);
    assert.deepEqual(await done,{cancelled:true,skipped:false});assert.equal(controller.isPlaying(),false);assert.equal(h.dialog.open,false);assert.equal(h.queuedFrames(),0);assert.equal(h.dialog.closeCalls,1);controller.destroy();
  }
});

test('optional stage sound errors do not interrupt playback, including reduced-motion completion',async()=>{
  const h=harness({reducedMotion:true}),frames=[],controller=createCombatPlayback({...h,render:record(frames),getFrame:getCombatFrame,onStage(){throw Error('audio unavailable');}}),combat=report(),done=controller.play(combat);h.untilDone(controller);
  assert.deepEqual(await done,{cancelled:false,skipped:false});assert.equal(controller.isPlaying(),false);assert.equal(h.dialog.open,false);assert.ok(frames.every(frame=>frame.reducedMotion));assert.ok(frames.at(-1).elapsed<2000);finalCounts(h,combat);controller.destroy();
});

test('portrait panels copy each army half at its own aspect ratio and retain the correct army counts',async()=>{
  const h=harness(),copies=new Map(),combat=report({team:1});h.canvas.width=1280;h.canvas.height=520;
  h.window.matchMedia=query=>({matches:query.includes('orientation:portrait')});
  for(const id of ['combatLeftCanvas','combatRightCanvas']){const panel=new Element(id,()=>{}),calls=[];panel.getContext=()=>({clearRect(){},drawImage(...args){calls.push(args);}});h.elements.set(id,panel);copies.set(id,calls);}
  const controller=createCombatPlayback({...h,render:()=>{}}),done=controller.play(combat);
  assert.equal(copies.get('combatLeftCanvas')[0][1],0);assert.equal(copies.get('combatRightCanvas')[0][1],640);
  for(const id of copies.keys()){assert.equal(h.elements.get(id).width,640);assert.equal(h.elements.get(id).height,520);}
  h.elements.get('skipCombatButton').emit('click');await done;
  assert.match(h.elements.get('combatLeftCanvas').getAttribute('aria-label'),new RegExp(`${combat.defender.hpAfter}台$`));
  assert.match(h.elements.get('combatRightCanvas').getAttribute('aria-label'),new RegExp(`${combat.attacker.hpAfter}台$`));controller.destroy();
});

test('invalid reports or missing UI do not acquire playback, and destroy cancels a running session',async()=>{
  const missing=createCombatPlayback({document:{getElementById:()=>null},window:{}});assert.equal((await missing.play(report())).unavailable,true);assert.equal(missing.isPlaying(),false);
  const h=harness(),controller=createCombatPlayback({...h,render(){},getFrame:getCombatFrame});assert.equal((await controller.play(null)).unavailable,true);assert.equal(controller.isPlaying(),false);assert.equal(h.dialog.open,false);
  const pending=controller.play(report());controller.destroy();assert.deepEqual(await pending,{cancelled:true,skipped:false});assert.equal(controller.isPlaying(),false);assert.equal(h.dialog.open,false);assert.equal(h.queuedFrames(),0);h.flush();assert.deepEqual(await controller.play(report()),{cancelled:true});controller.destroy();
});
