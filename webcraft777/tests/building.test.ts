import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {World,emptyFixtures,validFixtures,voxelIndex} from "../src/world.ts";
import {createBag,transferStack,transferAll,sortSlots,splitStack,craft,quantity,validStacks,stageMining, type Stack} from "../src/inventory.ts";
import {validJourney,createJourney,recipeCrafted,placedDecor,visitCave} from "../src/expedition.ts";
import {runJourney} from "./journey-scenario.ts";

test("旧版で採取した基礎地形の全バイトが2つの旧シードで一致する",()=>{
  for (const [seed,digest] of [["777-SOAK","d9c11e800d9f301984b56b91d5bad4a0aa83e0787bb7f77724ba34446a68a349"],
    ["ひだまり・777","fa3802d9469355997a70d28ba40cece5ef785b33447d4f72fcc3276b2cb62614"]]) {
    const world=new World(seed,false,1);
    assert.equal(createHash("sha256").update(world.data).digest("hex"),digest);
    assert.deepEqual(world.landmarks,[]);
  }
});
test("チェストの分割・整頓・一括移動では数量と道具の個別の耐久を保つ",()=>{
  const bag=createBag("explore");bag.slots=[{id:7,count:63},{id:18,count:1,durability:13},{id:7,count:63}];
  const chest:Stack[]=[];
  assert.ok(splitStack(bag.slots,0).ok);assert.equal(bag.slots.length,4);
  assert.ok(transferStack(bag,chest,"bag",0,true).ok);assert.equal(chest[0].count,16);
  assert.ok(transferAll(bag,chest,"bag").ok);assert.equal(bag.slots.length,0);
  assert.ok(sortSlots(chest).ok);
  assert.deepEqual(chest,[{id:7,count:64},{id:7,count:62},{id:18,count:1,durability:13}]);
  bag.slots=Array.from({length:27},()=>({id:1,count:64}));
  const snapshot=structuredClone([bag,chest]);assert.equal(transferStack(bag,chest,"chest",2).ok,false);
  assert.equal(transferAll(bag,chest,"chest").ok,false);assert.deepEqual([bag,chest],snapshot);
  bag.slots=[];assert.ok(transferAll(bag,chest,"chest").ok);assert.equal(quantity(bag,7),126);
  assert.equal(bag.slots.find(s=>s.id===18)?.durability,13);
});
test("向き・設備を保存し、無効な建具と中身の消去を拒否する",()=>{
  const w=new World("収納");const x=134,z=143,y=84;
  w.set(x,y,z,22);w.set(x+1,y,z,21);w.set(x+2,y,z,5);
  const chest=w.chestAt(x,y,z)!;chest.push({id:17,count:1,durability:13});
  w.useBench(x+1,y,z,7);w.setAxis(x+2,y,z,"x");
  assert.equal(w.set(x,y,z,0),false);
  const changes=w.exportEdits(),fixtures=w.exportFixtures();
  const w2=new World("収納");w2.loadEdits(changes);w2.loadFixtures(fixtures);
  assert.equal(w2.axisAt(x+2,y,z),"x");assert.equal(w2.benchUses(x+1,y,z),7);assert.deepEqual(w2.chestAt(x,y,z),chest);
  const wrong={...emptyFixtures(),chests:[[voxelIndex(x+1,y,z),[]]]} as typeof fixtures;
  assert.throws(()=>w2.loadFixtures(wrong));assert.deepEqual(w2.exportFixtures(),fixtures);
  assert.equal(validFixtures({...fixtures,axes:[fixtures.axes[0],fixtures.axes[0]]}),false);
  assert.equal(validStacks([{id:24,count:65}]),false);
  assert.ok(validFixtures(fixtures));
});
test("取り消しは最大20件で体と設備を保護し、原木を元の軸で戻す",()=>{
  const w=new World("undo");const y=88,z=120;
  for(let x=120;x<=140;x++){const b=w.capture(x,y,z);w.set(x,y,z,5);w.setAxis(x,y,z,"z");w.remember(b);}
  const old=w.capture(140,y,z);w.set(140,y,z,0);w.remember(old);
  assert.equal(w.undo(()=>true).ok,false);assert.equal(w.get(140,y,z),0);
  assert.equal(w.undo(()=>false).ok,true);assert.equal(w.axisAt(140,y,z),"z");
  const hold=w.capture(150,y,z);w.set(150,y,z,22);w.remember(hold);
  let n=0;while(w.undo(()=>false).ok)n++;
  assert.equal(n,19);assert.equal(w.get(150,y,z),22);assert.equal(w.get(120,y,z),5);
});
test("旧ワールドで潮晶を加工し、新規ワールドでは鉱石を掘る。設備と容量を確認して一括製作する",()=>{
  const bag=createBag("explore");bag.slots=[{id:10,count:4},{id:15,count:2}];
  for(const ctx of [{generator:2,bench:true},{generator:1,bench:false}] as const) assert.equal(craft(bag,"crystal-cut",1,ctx).ok,false);
  assert.ok(craft(bag,"crystal-cut",2,{generator:1,bench:true}).ok);assert.equal(quantity(bag,24),4);
  assert.equal(craft(bag,"crystal-cut",1,{generator:1,bench:true}).ok,false);
  assert.equal(stageMining(bag,23,17).draft,undefined);bag.slots.push({id:17,count:1,durability:18});
  assert.equal(quantity(stageMining(bag,23,17).draft!,24),6);
});
test("目標は実際の制作、灯りの携行・到達、拠点付近への設置を順番に確認する",()=>{
  const w=new World("journey",false,2),bag=createBag("explore"),j=createJourney();
  const cave=w.landmarks.find(l=>l.kind==="cave")!,p={...cave,x:cave.x+7};
  recipeCrafted(j,"boards");assert.equal(j.toolMade,false);recipeCrafted(j,"wood-pick");
  assert.equal(visitCave(j,w,p,bag),false);bag.slots.push({id:12,count:1});
  assert.equal(visitCave(j,w,w.spawn(),bag),false);assert.equal(visitCave(j,w,p,bag),true);
  j.home=w.spawn();assert.equal(placedDecor(j,25,p),false);assert.equal(placedDecor(j,7,w.spawn()),false);
  assert.equal(placedDecor(j,26,w.spawn()),true);assert.ok(validJourney(j));
});
test("3つのシードで物理移動・採掘・建築を経て全ての名所に到達し、潮晶で拠点を飾る",()=>{
  for(const seed of ["潮だまり・777","777-SOAK","ひだまり・777"]){
    const r=runJourney(seed);assert.ok(r.journey.decorated);assert.ok(r.walked>200);
    assert.equal(r.mined,8);assert.equal(r.placed,3);
    assert.deepEqual(r.chestContents,[{id:17,count:1,durability:34},{id:24,count:1}]);
    assert.equal(r.world.get(r.ore.x,r.ore.y,r.ore.z),0);
  }
});
