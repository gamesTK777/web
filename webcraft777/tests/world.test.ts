import test from "node:test";
import assert from "node:assert/strict";
import {World, affectedChunks, chunkKey, voxelIndex, HEIGHT, SIZE} from "../src/world.ts";
import {faceVisible, meshChunk} from "../src/mesher.ts";

const seed="ひだまり・777";
const sample=new World(seed);
test("整数座標・有限境界・不壊の岩盤・負座標が混ざらない",()=>{
  assert.equal(voxelIndex(255,95,255),SIZE*SIZE*HEIGHT-1);
  for(const [x,y,z] of [[-1,32,0],[256,32,0],[0,-1,0],[0,96,0],[0,23,256],[.5,20,0]]){
    assert.equal(sample.get(x,y,z),0);
    assert.equal(sample.set(x,y,z,1),false);
  }
  assert.equal(sample.get(120,0,74),14);
  assert.equal(sample.set(120,0,74,0),false);
  assert.equal(sample.set(120,22,74,14),false);
});
test("同じ種は時間分割・一括どちらでも木や洞窟を含めて一致する",async()=>{
  let last=0;
  const next=await World.generate(seed,f=>{assert(f>=last);last=f;});
  assert.equal(last,1);
  assert.deepEqual(next.data,sample.data);
  assert.notDeepEqual(new World("別の島").data,sample.data);
});
test("複数の種で安全な岸の地表に出現し、木・石・水辺・石炭が近い",()=>{
  for(const w of [sample,new World("海の見える丘"),new World("777")]){
    const p=w.spawn(),x=Math.floor(p.x),y=Math.floor(p.y),z=Math.floor(p.z);
    assert.notEqual(w.get(x,y-1,z),0);assert.notEqual(w.get(x,y-1,z),13);
    assert.equal(w.get(x,y,z),0);assert.equal(w.get(x,y+1,z),0);
    assert.equal(w.get(x-2,y,z-3),5);
    const near=new Set<number>();let lowest=96,highest=0;
    for(let zz=z-34;zz<=z+4;zz++)for(let xx=x-12;xx<=x+15;xx++){
      const h=w.highest[xx+SIZE*zz];
      highest=Math.max(highest,h);lowest=Math.min(lowest,h);
      for(let yy=26;yy<=Math.max(h,29);yy++)near.add(w.get(xx,yy,zz));
    }
    for(const id of [1,3,4,5,6,11,13])assert(near.has(id),'missing id '+id);
    assert(highest-lowest>=6);
    assert(w.data.includes(11));
    let cave=false;
    for(let zz=4;zz<250&&!cave;zz+=3)for(let xx=4;xx<250&&!cave;xx+=3)
      if(w.get(xx,13,zz)===0 && w.get(xx,18,zz)!==0)cave=true;
    assert(cave);
  }
});
test("差分は掘った空気を記録し、生成した状態へ戻すと差分も消える",()=>{
  const w=new World(seed),x=127,y=75,z=144;
  assert.equal(w.set(x,y,z,12),true);
  assert.equal(w.highest[x+SIZE*z],y);
  assert(w.lamps.has(voxelIndex(x,y,z)));
  const base=w.get(128,32,139);assert.equal(base,1);
  w.set(128,32,139,0);
  const edits=JSON.parse(JSON.stringify(w.exportEdits()));
  const restored=new World(seed);restored.loadEdits(edits);
  assert.equal(restored.get(x,y,z),12);assert.equal(restored.get(128,32,139),0);
  assert.deepEqual(restored.data,w.data);
  assert.throws(()=>restored.loadEdits([[0,11]]));assert.deepEqual(restored.exportEdits(),edits);
  restored.set(x,y,z,0);restored.set(128,32,139,base);
  assert.deepEqual(restored.exportEdits(),[]);assert.equal(restored.lamps.size,0);
  assert.deepEqual(restored.highest,sample.highest);
  assert.deepEqual(restored.occupied,sample.occupied);
});
test("チャンクの隅・世界端では接面とAOに必要な範囲だけ無効化する",()=>{
  assert.deepEqual(affectedChunks(17,35,17),[chunkKey(1,2,1)]);
  const edge=affectedChunks(31,47,63);assert.equal(edge.length,8);
  for(const x of [1,2])for(const y of [2,3])for(const z of [3,4])assert(edge.includes(chunkKey(x,y,z)));
  assert.deepEqual(affectedChunks(0,0,0),[0]);
  assert.deepEqual(affectedChunks(255,95,255),[chunkKey(15,5,15)]);
});
test("チャンク境界両側に積んだ石は共有面を出さず、片側の採掘で面が現れる",()=>{
  const w=new World(seed);
  const n=(cx:number)=>{
    const geoms=meshChunk(w,cx,5,3);
    const count=geoms.reduce((s,g)=>s+(g?.index?.count??0)/6,0);
    geoms.forEach(g=>g?.dispose());return count;
  };
  w.set(31,82,55,3); assert.equal(n(1),6);
  w.set(32,82,55,3);assert.equal(n(1),5);assert.equal(n(2),5);
  w.set(31,82,55,0);assert.equal(n(1),0);assert.equal(n(2),6);
  assert(!faceVisible(10,10));assert(!faceVisible(13,13));assert(faceVisible(3,10));assert(faceVisible(3,13));
});
