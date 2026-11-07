import test from 'node:test';
import assert from 'node:assert/strict';
import {swordPose,drawSwordExplorer,drawSwordImpact,ATTACK_DURATION} from './combat-art.mjs';
function context(){const calls=[],gradient={addColorStop(){}};return new Proxy({calls,globalAlpha:1},{get(t,k){if(k in t)return t[k];if(k==='createLinearGradient')return()=>gradient;return(...args)=>{calls.push({key:k,args});for(const v of args)if(typeof v==='number')assert.ok(Number.isFinite(v),String(k));};},set(t,k,v){t[k]=v;return true;}});}
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
