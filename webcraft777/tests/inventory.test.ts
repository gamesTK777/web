import { test } from "node:test";
import assert from "node:assert/strict";
import { activeStack, assignHotbar, CAPACITY, craft, craftable, createBag, miningSeconds, quantity, RECIPES, stageMining, validBag } from "../src/inventory.ts";
import type { Bag } from "../src/inventory.ts";

function gather(bag: Bag, id: number, tool = 0) {
  const staged = stageMining(bag,id,tool);
  assert.ok(staged.draft);
  Object.assign(bag,staged.draft);
  return staged.message;
}

test("two logs start a build: planks, sticks, tools, rubble, brick, glass and light", () => {
  const bag = createBag("explore");
  gather(bag,5); gather(bag,5);
  assert.equal(craftable(bag,RECIPES[0]),2);
  assert.ok(craft(bag,"boards",2).ok);
  assert.ok(craft(bag,"sticks").ok);
  assert.ok(craft(bag,"wood-pick").ok);
  assert.ok(craft(bag,"wood-axe").ok);
  assert.equal(quantity(bag,7),0);
  for (let n=0;n<10;n++) gather(bag,3,17);
  assert.equal(activeStack(bag,17)?.durability,26);
  assert.ok(craft(bag,"bricks").ok);
  gather(bag,5); assert.ok(craft(bag,"boards").ok);
  assert.ok(craft(bag,"sticks").ok);
  assert.ok(craft(bag,"stone-pick").ok);
  assert.ok(craft(bag,"stone-axe").ok);
  assert.equal(activeStack(bag,18)?.durability,90);
  gather(bag,11,18); assert.equal(quantity(bag,15),2);
  for (let n=0;n<3;n++) gather(bag,4);
  assert.ok(craft(bag,"glass").ok);
  assert.ok(craft(bag,"lamp").ok);
  assert.deepEqual([quantity(bag,9),quantity(bag,10),quantity(bag,12)],[4,4,2]);
  assert.ok(validBag(bag));
});

test("repeated craft cannot spend a missing ingredient or produce partial output", () => {
  const bag = createBag("explore");
  bag.slots = [{id:5,count:1}];
  const before = structuredClone(bag);
  for (const count of [0,-1,1.1,2,NaN,Infinity]) assert.equal(craft(bag,"boards",count).ok,false);
  assert.deepEqual(bag,before);
  assert.equal(craft(bag,"boards").ok,true);
  const after = structuredClone(bag);
  assert.equal(craft(bag,"boards").ok,false);
  assert.deepEqual(bag,after);
});

test("ジャンプ台を3段階作れて、どの向きの坂も一つの滑り台パーツに戻る",()=>{
  const bag=createBag('explore');
  bag.slots=[{id:7,count:22},{id:16,count:2},{id:8,count:12}];
  for(const recipe of ['jump-small','jump-medium','jump-large','slide-part'])assert.ok(craft(bag,recipe).ok);
  assert.deepEqual([27,28,29,30].map(id=>quantity(bag,id)),[1,1,1,3]);
  for(const placed of [30,31,32,33])gather(bag,placed);
  assert.equal(quantity(bag,30),7);
  assert.equal(assignHotbar(createBag('creative'),0,33,'creative'),false);
  assert.ok(validBag(bag));
});

test("reward that does not fit is rejected, including an otherwise legal full-bag craft", () => {
  const bag = createBag("explore");
  bag.slots = Array.from({length:CAPACITY},()=>({id:5,count:64}));
  const before = structuredClone(bag);
  assert.equal(craftable(bag,RECIPES[0]),0);
  assert.equal(craft(bag,"boards").ok,false);
  assert.deepEqual(bag,before);
  assert.equal(stageMining(bag,6,0).draft,undefined);
  bag.slots[0].count = 1;
  assert.ok(craft(bag,"boards").ok);
  assert.equal(quantity(bag,7),4);
  assert.equal(bag.slots.length,CAPACITY);
});

test("breakage frees one tool slot and a spare tool retains its separate durability", () => {
  const bag = createBag("explore");
  bag.slots = [{id:17,count:1,durability:1},{id:17,count:1,durability:35}];
  assert.match(gather(bag,3,17),/木のツルハシが壊れました/);
  assert.equal(activeStack(bag,17)?.durability,35);
  assert.equal(quantity(bag,17),1);
  assert.equal(quantity(bag,8),1);
  assert.ok(miningSeconds(3,17,"explore") < miningSeconds(3,0,"explore"));
  assert.ok(miningSeconds(3,18,"explore") < miningSeconds(3,17,"explore"));
  assert.ok(miningSeconds(5,19,"explore") < miningSeconds(5,17,"explore"));
  assert.equal(miningSeconds(14,18,"creative"),Infinity);
});

test("creative hotbar only admits placeable blocks and swaps assigned positions", () => {
  const bag = createBag("creative");
  assert.equal(assignHotbar(bag,3,10,"creative"),true);
  assert.equal(bag.hotbar[3],10);
  assert.equal(bag.hotbar[7],5);
  assert.equal(assignHotbar(bag,8,11,"creative"),true);
  assert.equal(assignHotbar(bag,7,14,"creative"),false);
  assert.equal(assignHotbar(bag,7,19,"creative"),false);
  const explore = createBag("explore");
  assert.equal(assignHotbar(explore,2,9,"explore"),false);
  gather(explore,9);
  assert.equal(assignHotbar(explore,2,9,"explore"),true);
  assert.equal(explore.hotbar[2],9);
});

test("save validation rejects invalid ids, capacities, counts and tool durability", () => {
  const bag = createBag("explore");
  for (const slots of [[{id:34,count:1}], [{id:33,count:1}], [{id:2,count:0}], [{id:2,count:65}], [{id:14,count:1}],
    [{id:13,count:1}], [{id:18,count:2,durability:1}], [{id:17,count:1,durability:37}],
    [{id:17,count:1,durability:0}], [{id:7,count:10,durability:4}], Array(28).fill({id:1,count:1})]) {
    assert.equal(validBag({...bag,slots}),false);
  }
  assert.equal(validBag({...bag,hotbar:Array(8).fill(0)}),false);
  assert.equal(validBag({...bag,hotbar:Array(9).fill("5")}),false);
  assert.equal(validBag({...bag,slots:[{id:19,count:1,durability:2}]}),true);
});
