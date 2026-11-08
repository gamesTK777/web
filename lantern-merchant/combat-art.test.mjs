import test from 'node:test';
import assert from 'node:assert/strict';
import {swordPose,drawSwordExplorer,drawSwordImpact,drawUnarmedExplorer,drawUnarmedImpact,ATTACK_DURATION} from './combat-art.mjs';
function context(){const calls=[],stack=[],gradient={addColorStop(){}};return new Proxy({calls,globalAlpha:1},{get(t,k){if(k in t)return t[k];if(k==='createLinearGradient')return()=>gradient;return(...args)=>{calls.push({key:k,args,color:k==='stroke'?t.strokeStyle:t.fillStyle});if(k==='save')stack.push({globalAlpha:t.globalAlpha,fillStyle:t.fillStyle,strokeStyle:t.strokeStyle});if(k==='restore')Object.assign(t,stack.pop());for(const v of args)if(typeof v==='number')assert.ok(Number.isFinite(v),String(k));};},set(t,k,v){t[k]=v;return true;}});}
test('the sword raises, cuts downward, holds impact, then recovers in bounded visual time',()=>{
  assert.ok(ATTACK_DURATION>=260&&ATTACK_DURATION<=400);
  assert.deepEqual([0,.15,.3,.5,.8].map(p=>swordPose(p).phase),['raise','raise','cut','impact','recover']);
  assert.ok(swordPose(.4).cut>swordPose(.3).cut);assert.equal(swordPose(.5).cut,1);assert.equal(swordPose(1).recover,1);
});
test('all four directions animate the sword arm separately while preserving original image and geometry',()=>{
  const image=Object.freeze({width:329,height:512}),g=Object.freeze({width:45,height:80,anchor:.99});
  for(const facing of ['up','down','left','right'])for(const progress of [0,.18,.35,.52,.9]){
    const c=context();drawSwordExplorer(c,image,g,facing,56,progress);
    assert.ok(c.calls.some(v=>v.key==='clip'&&v.args[0]==='evenodd'),'resting arm is hidden without removing the original head/torso');
    assert.ok(c.calls.some(v=>v.key==='drawImage'&&v.args[0]===image));assert.ok(c.calls.some(v=>v.key==='stroke'),'moving jointed arm is rendered');
  }
});
test('cut impacts wait for the blade contact, stay finite, and remain legible with motion reduced',()=>{
  const early=context();drawSwordImpact(early,{x:100,y:100,progress:.1});assert.equal(early.calls.length,0);
  for(const facing of ['up','down','left','right'])for(const reducedMotion of [false,true]){const c=context();drawSwordImpact(c,{x:100,y:100,size:72,progress:.48,facing,damage:12,reducedMotion});assert.ok(c.calls.some(v=>v.key==='quadraticCurveTo'));assert.ok(c.calls.some(v=>v.key==='fillText'&&v.args[0]==='−12'));}
  const done=context();drawSwordImpact(done,{x:100,y:100,progress:1});assert.equal(done.calls.length,0);
});

test('unarmed poses mask the original knife and replace it with a hand without any steel blade in every direction',()=>{
  const image=Object.freeze({width:329,height:512}),g=Object.freeze({width:45,height:80,anchor:.99});
  for(const facing of ['up','down','left','right'])for(const attacking of [false,true])for(const progress of [0,.2,.48,.85,1]){
    const c=context();drawUnarmedExplorer(c,image,g,facing,56,progress,{attacking});
    assert.ok(c.calls.some(v=>v.key==='clip'&&v.args[0]==='evenodd'));
    assert.ok(c.calls.some(v=>v.key==='drawImage'&&v.args[0]===image));
    assert.ok(c.calls.some(v=>v.key==='fill'&&v.color==='#e5c39a'),'a shaded fist replaces the weapon');
    assert.ok(!c.calls.some(v=>['#f8ffed','#89c5c5'].includes(v.color)),'neither steel plane is drawn');
    assert.equal(c.globalAlpha,1);assert.equal(c.calls.filter(v=>v.key==='save').length,c.calls.filter(v=>v.key==='restore').length);
  }
  const armed=context();drawSwordExplorer(armed,image,g,'right',56,.48);assert.ok(armed.calls.some(v=>v.color==='#f8ffed'));
});

test('unarmed contact is a bounded round flash with damage text rather than a blade trail',()=>{
  for(const reducedMotion of [false,true]){
    const c=context();drawUnarmedImpact(c,Object.freeze({x:80,y:90,size:72,progress:.48,damage:5,reducedMotion}));
    assert.ok(c.calls.some(v=>v.key==='arc'));assert.ok(!c.calls.some(v=>v.key==='quadraticCurveTo'));
    assert.ok(c.calls.some(v=>v.key==='fillText'&&v.args[0]==='−5'));assert.equal(c.globalAlpha,1);
  }
  for(const progress of [0,.37,1,2]){const c=context();drawUnarmedImpact(c,{x:1,y:2,progress});assert.equal(c.calls.length,0);}
});
