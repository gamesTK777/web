import test from 'node:test';
import assert from 'node:assert/strict';
import {drawExplorer} from './hero-art.mjs';

function surface(width=64,height=72){
  const canvas={width,height,paints:[]},stack=[];
  const c=new Proxy({canvas,globalAlpha:1,imageSmoothingEnabled:true},{get(target,key){
    if(key in target)return target[key];
    if(key==='save')return()=>stack.push({globalAlpha:target.globalAlpha,imageSmoothingEnabled:target.imageSmoothingEnabled,fillStyle:target.fillStyle});
    if(key==='restore')return()=>Object.assign(target,stack.pop());
    return(...args)=>{for(const v of args)if(typeof v==='number')assert.ok(Number.isFinite(v),String(key));canvas.paints.push({key,args,color:target.fillStyle});};
  },set(target,key,value){target[key]=value;return true;}});canvas.getContext=()=>c;return canvas;
}
globalThis.OffscreenCanvas=class{constructor(w,h){Object.assign(this,surface(w,h));}};

test('pixel fallback removes the blade in all unarmed poses and keeps armed and unarmed sprite caches separate',()=>{
  for(const facing of ['up','down','left','right'])for(const kind of ['idle','move','attack']){
    const sprites=[];
    for(const unarmed of [false,true,false]){
      const canvas=surface(),motion=Object.freeze({facing,kind,progress:.48,unarmed}),before=JSON.stringify(motion);
      drawExplorer(canvas.getContext(),100,120,56,1000,motion);assert.equal(JSON.stringify(motion),before);
      const art=canvas.paints.find(p=>p.key==='drawImage').args[0];sprites.push(art);
      assert.equal(art.paints.some(p=>p.color==='#dcebd0'),!unarmed,'steel highlights occur only on an equipped blade');
      assert.ok(art.paints.some(p=>p.color==='#db9d73'),'the explorer still has a hand');
      assert.equal(canvas.getContext().imageSmoothingEnabled,true);
    }
    assert.notEqual(sprites[0],sprites[1]);assert.equal(sprites[0],sprites[2]);
  }
});
