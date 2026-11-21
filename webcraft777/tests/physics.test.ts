import { test } from "node:test";
import assert from "node:assert/strict";
import { canPlaceAt, createPlayer, eyeHeight, mineAt, overlapsPlayer, placeAt, raycast, resetPlayerInput, safeSpawn, stepPlayer } from "../src/physics.ts";
import type { Input, Pose } from "../src/physics.ts";
import { createBag, quantity } from "../src/inventory.ts";

class FloorWorld {
  changes = new Map<string, number>();
  get(x: number, y: number, z: number) {
    return this.changes.get([x, y, z].join()) ?? (y === 0 ? 14 : 0);
  }
  set(x: number, y: number, z: number, id: number) {
    if (y < 1 || this.get(x, y, z) === id) return false;
    this.changes.set([x, y, z].join(), id);
    return true;
  }
  spawn() { return { x: 32.5, y: 1, z: 32.5, yaw: 0, pitch: 0 }; }
}
const pose: Pose = { x: 16.5, y: 1, z: 16.5, yaw: 0, pitch: 0 };
const idle: Input = { forward: 0, right: 0, jump: false, down: false, sprint: false };

test("movement respects flat feet, normalized directions and sprint speed", () => {
  const w = new FloorWorld();
  const travel = (input: Partial<Input>) => {
    const p = createPlayer(pose);
    for (let n = 0; n < 60; n++) stepPlayer(w, p, { ...idle, ...input }, 1 / 60);
    assert.equal(p.grounded, true);
    assert.equal(p.y, 1);
    return Math.hypot(p.x - pose.x, p.z - pose.z);
  };
  const straight = travel({forward:1});
  assert.ok(straight>4 && straight<4.2);
  assert.ok(Math.abs(travel({forward:1,right:1}) - straight) < 1e-6);
  assert.ok(travel({forward:1,sprint:true}) > 6);
});

test("the tag chaser's sprint bonus does not change ordinary or invalid-input speeds", () => {
  const w = new FloorWorld();
  const speed = (sprintMultiplier?: number, sprint = true) => {
    const p = createPlayer(pose);
    for (let n = 0; n < 60; n++) stepPlayer(w, p, { ...idle, forward: 1, sprint }, 1 / 60, { sprintMultiplier });
    return -p.vz;
  };
  assert.ok(Math.abs(speed(1.25) / speed() - 1.25) < .001);
  assert.equal(speed(Infinity), speed());
  assert.equal(speed(1.25, false), speed(undefined, false));
});

test("jump buffering consumes a quick tap on landing, and cannot repeat in midair", () => {
  const w=new FloorWorld(),p=createPlayer({...pose,y:1.19});
  p.vy=-4;
  stepPlayer(w,p,{...idle,jumpPressed:true},.016);
  for(let i=0;i<7;i++) stepPlayer(w,p,idle,.01);
  assert.ok(p.vy>6 && p.y>1.2);
  const rising=p.vy;
  stepPlayer(w,p,{...idle,jumpPressed:true},.025);
  assert.ok(p.vy<rising && p.coyote===0);
  for(let i=0;i<100;i++) stepPlayer(w,p,{...idle,jump:true},.01);
  assert.equal(p.y,1);
});

test("jump grace after support disappears is short and cannot be spent twice",()=>{
  const w=new FloorWorld(); w.set(16,4,16,3);
  const attempt=(delay:number)=>{
    w.set(16,4,16,3);
    const p=createPlayer({...pose,y:5});stepPlayer(w,p,idle,1/120);
    w.set(16,4,16,0);stepPlayer(w,p,idle,delay);
    stepPlayer(w,p,{...idle,jump:true},1/120);return p;
  };
  const early=attempt(.050);assert.ok(early.vy>7);
  stepPlayer(w,early,idle,.01);stepPlayer(w,early,{...idle,jump:true},.01);
  assert.ok(early.vy<8);assert.equal(early.coyote,0);
  assert.ok(attempt(.11).vy<0);
});

test("crouching slides along an edge without falling and respects the tunnel ceiling",()=>{
  const w=new FloorWorld(),p=createPlayer({...pose,y:5});
  for(let z=10;z<20;z++)w.set(16,4,z,3);
  for(let i=0;i<90;i++)stepPlayer(w,p,{...idle,right:1,forward:1,down:true},1/60);
  assert.equal(p.y,5);assert.ok(p.z<15 && p.x<17.105);assert.ok(p.crouched);
  const tunnel=createPlayer(pose);
  w.set(17,2,16,3);w.set(18,2,16,3);
  for(let n=0;n<50;n++)stepPlayer(w,tunnel,{...idle,right:1,down:true},1/60);
  assert.ok(tunnel.x>17.5 && tunnel.x<18.5);
  stepPlayer(w,tunnel,idle,.20);
  assert.ok(tunnel.crouched);assert.ok(eyeHeight(tunnel)<1);
  const sleep={x:tunnel.x,y:tunnel.y,z:tunnel.z,yaw:0,pitch:0,crouched:true};
  assert.deepEqual(safeSpawn(w,sleep),sleep);
  assert.equal(overlapsPlayer(tunnel,Math.floor(tunnel.x),2,16),false);
  for(let n=0;n<110;n++)stepPlayer(w,tunnel,{...idle,right:1},1/60);
  assert.ok(!tunnel.crouched && eyeHeight(tunnel)>1.55);
});

test("grounding is stable, a grazing wall permits sliding and releasing movement brakes promptly",()=>{
  const w=new FloorWorld(),p=createPlayer(pose);
  for(let z=5;z<24;z++)w.set(17,1,z,3);
  for(let n=0;n<90;n++)stepPlayer(w,p,{...idle,right:1,forward:1},1/60);
  assert.ok(p.z<13 && p.x===16.7); assert.equal(p.y,1);
  const last=p.z;stepPlayer(w,p,idle,.14);
  assert.ok(last-p.z<.12 && p.vz===0);
  const still=[p.x,p.y,p.z];
  for(let n=0;n<500;n++)stepPlayer(w,p,idle,1/60);
  assert.deepEqual([p.x,p.y,p.z],still);
  resetPlayerInput(p);assert.equal(p.bobOffset,0);
});

test("crouching after stepping beyond the safety margin still lets the player retreat",()=>{
  const w=new FloorWorld(),p=createPlayer({...pose,x:17.23,y:5});
  w.set(16,4,16,3);
  stepPlayer(w,p,{...idle,down:true,right:-1},.01);
  assert.ok(p.eye>.96 && p.eye<1.62); // No camera snap in the open.
  for(let n=0;n<35;n++) stepPlayer(w,p,{...idle,down:true,right:-1},.01);
  assert.equal(p.y,5);assert.ok(p.x<17 && p.x>16.3);
});

test("crouched targeting starts at the camera and diagonal rays skip cells they merely graze",()=>{
  const w=new FloorWorld(),p=createPlayer({...pose,crouched:true});
  w.set(16,1,14,7);w.set(16,2,14,3);assert.equal(raycast(w,p)?.id,7);
  w.set(15,2,16,9);w.set(16,2,15,9);w.set(15,2,15,10);
  const hit=raycast(w,{...pose,yaw:Math.PI/4})!;
  assert.deepEqual([hit.x,hit.z,hit.id],[15,15,10]);
});

test("dropped frames, walls, ceilings and the edge cannot be tunneled through", () => {
  const w = new FloorWorld();
  const p = createPlayer(pose);
  w.set(16, 1, 15, 3); w.set(16, 2, 15, 3);
  for (let n = 0; n < 4; n++) stepPlayer(w,p,{...idle,forward:1,sprint:true},3);
  assert.equal(p.z, 16.3);
  w.set(16,3,16,3);
  stepPlayer(w,p,{...idle,jump:true},.09);
  assert.ok(p.y <= 1.2 + 1e-8);
  for (let n = 0; n < 12; n++) stepPlayer(w,p,{...idle,jump:true},.12);
  assert.equal(p.y,1);
  const edge = createPlayer({...pose,x:.5,y:93.8});
  edge.flying = true;
  for (let n = 0; n < 4; n++) stepPlayer(w,edge,{...idle,jump:true,right:-1},.25);
  assert.equal(edge.x,.3);
  assert.equal(edge.y,96 - 1.8);
  stepPlayer(w,edge,{...idle,down:true},.125);
  assert.ok(Math.abs(edge.y - (96 - 1.8 - 1)) < 1e-8);
});

test("normal jump clears one block, removal underfoot starts a fall", () => {
  const w = new FloorWorld(), p = createPlayer(pose);
  let peak = p.y;
  for (let n = 0; n < 60; n++) {
    stepPlayer(w,p,{...idle,jump:n===0},1/60);
    peak = Math.max(peak,p.y);
  }
  assert.ok(peak >= 2 && peak < 2.7);
  w.set(16,1,16,7);
  p.y = 2; p.pitch = -Math.PI/2;
  assert.equal(raycast(w,p)?.ny,1);
  const bag = createBag("creative");
  assert.equal(mineAt(w,p,bag,"creative",0,raycast(w,p)).ok,true);
  stepPlayer(w,p,idle,.24);
  assert.ok(p.y < 2);
});

test("swimming reduces travel and held jump raises the player", () => {
  const w = new FloorWorld();
  for (let z=8; z<=20; z++) for(let y=1; y<=3; y++) w.set(16,y,z,13);
  const p = createPlayer(pose);
  stepPlayer(w,p,{...idle,forward:1,jump:true},.2);
  assert.ok(p.inWater);
  assert.ok(Math.abs(p.z - 16.1) < 1e-7);
  assert.ok(p.y > 1.8);
});

test("DDA finds the near face across chunk edges, with a five-block cap", () => {
  const w = new FloorWorld();
  w.set(16,2,15,13);
  w.set(16,2,13,10);
  w.set(16,2,11,3);
  const hit = raycast(w,pose)!;
  assert.deepEqual([hit.x,hit.y,hit.z,hit.nz,hit.distance],[16,2,13,1,2.5]);
  assert.equal(raycast(w,pose,2.49),null);
  w.set(16,2,13,0); w.set(16,2,11,0); w.set(16,2,10,3);
  assert.equal(raycast(w,pose,80),null);
  const exact = raycast(w,{...pose,z:16})!;
  assert.deepEqual([exact.z,exact.distance],[10,5]);
  const negFace = {...pose,x:16,z:15.5,yaw:Math.PI/2};
  w.set(15,2,15,3);
  assert.equal(raycast(w,negFace)?.distance,0);
  assert.equal(raycast(w,negFace)?.nx,1);
});

test("editing verifies reach again, rejects body overlaps and protects bedrock", () => {
  const w = new FloorWorld(), p = createPlayer(pose), bag = createBag("creative");
  w.set(16,2,15,5);
  const log = raycast(w,p)!;
  assert.equal(canPlaceAt(w,p,log),false);
  assert.equal(placeAt(w,p,bag,"creative",0,log).ok,false);
  assert.equal(w.get(16,2,16),0);
  p.yaw = Math.PI;
  assert.equal(mineAt(w,p,bag,"creative",0,log).ok,false);
  assert.equal(w.get(16,2,15),5);
  p.pitch = -Math.PI/2;
  assert.equal(mineAt(w,p,bag,"creative",0,raycast(w,p)).ok,false);
  assert.equal(w.get(16,0,16),14);
});

test("exploration placement spends once per commit; creative is unlimited", () => {
  const w = new FloorWorld(), p = createPlayer(pose), bag = createBag("explore");
  w.set(16,2,12,3); w.set(16,2,13,5);
  assert.ok(mineAt(w,p,bag,"explore",0,raycast(w,p)).ok);
  assert.equal(quantity(bag,5),1);
  const hit = raycast(w,p);
  assert.ok(placeAt(w,p,bag,"explore",0,hit).ok);
  assert.equal(quantity(bag,5),0);
  assert.equal(w.get(16,2,13),5);
  assert.equal(placeAt(w,p,bag,"explore",0,hit).ok,false);
  const unlimited = createBag("creative");
  assert.ok(placeAt(w,p,unlimited,"creative",0,raycast(w,p)).ok);
  assert.equal(unlimited.slots.length,0);
});

test("full bag or rejected world edit preserves both material and tool wear", () => {
  const w = new FloorWorld(), p = createPlayer(pose), bag = createBag("explore");
  bag.slots = [...Array.from({length:26},()=>({id:2,count:64})), {id:17,count:1,durability:2}];
  bag.hotbar[0]=17;
  w.set(16,2,14,3);
  const before = JSON.stringify(bag);
  assert.match(mineAt(w,p,bag,"explore",0,raycast(w,p)).message,/満杯/);
  assert.equal(w.get(16,2,14),3);
  assert.equal(JSON.stringify(bag),before);
  bag.slots.pop();
  const retry = JSON.stringify(bag);
  w.set = () => false;
  assert.equal(mineAt(w,p,bag,"explore",0,raycast(w,p)).ok,false);
  assert.equal(JSON.stringify(bag),retry);
});

test("safe spawn preserves valid cave/flight saves and recovers embedded or wet positions", () => {
  const w = new FloorWorld();
  assert.deepEqual(safeSpawn(w,pose),pose);
  w.set(16,1,16,3); w.set(16,2,16,3);
  assert.equal(safeSpawn(w,pose).y,3);
  w.set(16,3,16,13);
  assert.deepEqual(safeSpawn(w,pose),w.spawn());
  assert.deepEqual(safeSpawn(w,{...pose,x:NaN}),w.spawn());
  const swimming={...pose,y:3,pitch:1.55};
  assert.deepEqual(safeSpawn(w,swimming,true),swimming);
  assert.deepEqual(safeSpawn(w,swimming),{...w.spawn(),pitch:swimming.pitch});
  assert.notDeepEqual(safeSpawn(w,pose,true),pose);
});
