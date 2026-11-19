import { test } from "node:test";
import assert from "node:assert/strict";
import { World } from "../src/world.ts";
import { quantity } from "../src/inventory.ts";
import { runScenario, SCENE_SEED } from "./scenario-world.ts";

test("reachable exploration, a house across two chunk boundaries, and its air edits survive world recreation",()=>{
  const original=new World(SCENE_SEED);
  const scenario=runScenario(original);
  assert.equal(scenario.placed,208);
  assert.equal(scenario.mined,7);
  assert.equal(scenario.tool,32);
  assert.equal(quantity(scenario.explore,9),4);
  assert.deepEqual([...new Set(scenario.plan.map(t=>t.x>>4))].sort(),[7,8]);
  assert.deepEqual([...new Set(scenario.plan.map(t=>t.z>>4))].sort(),[8,9]);
  const edits=original.exportEdits();
  const restored=new World(SCENE_SEED);
  restored.loadEdits(JSON.parse(JSON.stringify(edits)));
  for(const {x,y,z,id} of scenario.plan)assert.equal(restored.get(x,y,z),id);
  const {x,y,z}=scenario.hole;
  assert.equal(restored.get(x,y,z),0);
  assert.deepEqual(restored.exportEdits(),edits);
});
