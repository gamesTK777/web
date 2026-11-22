import { activeStack, consumeBlock, ITEMS, stageMining } from "./inventory.ts";
import type { Bag, Mode, Outcome } from "./inventory.ts";
import { isSlide, jumpPadHeight, slideDirection, slideHeight } from "./playground.ts";
import { schoolStairTop } from "./school.ts";
import { parkStairTop } from "./cops-stages.ts";
import type { TerrainPreset } from "./stages.ts";

export const WORLD_WIDTH = 256;
export const WORLD_HEIGHT = 96;
export const EYE_HEIGHT = 1.62;
export const BODY_HEIGHT = 1.8;
export const BODY_RADIUS = .30;
export const CROUCH_HEIGHT = .96;
export const REACH = 5;
const EPS = 1e-7;
export type Pose = { x: number; y: number; z: number; yaw: number; pitch: number; crouched?: boolean };
export type Player = Pose & {
  vx: number; vy: number; vz: number; grounded: boolean; inWater: boolean; flying: boolean;
  crouched: boolean; wasJump: boolean; jumpBuffer: number; coyote: number;
  eye: number; stride: number; bobOffset: number; fovOffset: number;
};
export type Input = { forward: number; right: number; jump: boolean; jumpPressed?: boolean; sprint: boolean; down: boolean };
export type Hit = { x: number; y: number; z: number; nx: number; ny: number; nz: number; id: number; distance: number };
type ReadWorld = {
  get(x: number, y: number, z: number): number; spawn?(): Pose;
  stage?:TerrainPreset;
  chestAt?(x: number, y: number, z: number): {length: number}|undefined;
};
type EditWorld = ReadWorld & { set(x: number, y: number, z: number, id: number): boolean };
const inside = (x: number, y: number, z: number) =>
  x >= 0 && x < WORLD_WIDTH && z >= 0 && z < WORLD_WIDTH && y >= 0 && y < WORLD_HEIGHT;
const solid = (id: number) => id !== 0 && id !== 13;
const clamp = (n: number, low: number, high: number) => Math.min(high, Math.max(low, n));

export function createPlayer(pose: Pose): Player {
  return { ...pose, grounded: false, vx: 0, vy: 0, vz: 0, inWater: false, flying: false, wasJump: false,
    crouched: !!pose.crouched, coyote: 0, jumpBuffer: 0, eye: pose.crouched ? .79 : EYE_HEIGHT,
    stride: 0, bobOffset: 0, fovOffset: 0 };
}
export function resetPlayerInput(p: Player) {
  p.wasJump = false; p.jumpBuffer = 0; p.coyote = 0; p.vx = 0; p.vz = 0;
  p.bobOffset = 0; p.fovOffset = 0;
}
export function eyeHeight(p: Pose & Partial<Pick<Player,"eye"|"bobOffset">>) {
  return (p.eye ?? (p.crouched ? .79 : EYE_HEIGHT)) + (p.bobOffset ?? 0);
}

function rampTop(id:number,bx:number,by:number,bz:number,x:number,z:number,radius:number){
  const {x:dx,z:dz}=slideDirection(id);
  // The uphill edge of the intersection is the highest point under the feet.
  return by+slideHeight(id,x-bx-dx*radius,z-bz-dz*radius);
}

// Padding makes touching a face legal while retaining solid world bounds.
function occupied(world: ReadWorld, x: number, y: number, z: number, height = BODY_HEIGHT): boolean {
  const x0 = Math.floor(x - BODY_RADIUS + EPS), x1 = Math.floor(x + BODY_RADIUS - EPS);
  const y0 = Math.floor(y + EPS), y1 = Math.floor(y + height - EPS);
  const z0 = Math.floor(z - BODY_RADIUS + EPS), z1 = Math.floor(z + BODY_RADIUS - EPS);
  if (!inside(x0, y0, z0) || !inside(x1, y1, z1)) return true;
  for (let by = y0; by <= y1; by++)
    for (let bz = z0; bz <= z1; bz++)
      for (let bx = x0; bx <= x1; bx++) {
        const id=world.get(bx,by,bz);
        if (solid(id) && (!isSlide(id) || y < rampTop(id,bx,by,bz,x,z,BODY_RADIUS-EPS)-EPS)) return true;
      }
  return false;
}
export function playerPoseClear(world: ReadWorld, pose: Pick<Pose, "x" | "y" | "z" | "crouched">): boolean {
  return !occupied(world, pose.x, pose.y, pose.z, pose.crouched ? CROUCH_HEIGHT : BODY_HEIGHT);
}
function wet(world: ReadWorld, x: number, y: number, z: number) {
  return world.get(Math.floor(x), Math.floor(y + .12), Math.floor(z)) === 13 ||
    world.get(Math.floor(x), Math.floor(y + 1.0), Math.floor(z)) === 13;
}
export function safeSpawn(world: ReadWorld, pose: Pose, restoring=false): Pose {
  const angles = {
    yaw: Number.isFinite(pose.yaw) ? pose.yaw : 0,
    pitch: Number.isFinite(pose.pitch) ? clamp(pose.pitch, -1.55, 1.55) : 0,
  };
  const safe = (x: number, y: number, z: number, height = BODY_HEIGHT, allowWater=false) => Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z) &&
    !occupied(world, x, y, z, height) && (allowWater || !wet(world, x, y, z));
  if (safe(pose.x, pose.y, pose.z, pose.crouched ? CROUCH_HEIGHT : BODY_HEIGHT, restoring)) {
    return { x: pose.x, y: pose.y, z: pose.z, ...angles, ...(pose.crouched ? {crouched:true} : {}) };
  }
  const fallback = world.spawn?.() ?? { x: 128.5, y: 60, z: 128.5, ...angles };
  const origin = Number.isFinite(pose.x) && Number.isFinite(pose.z) ? pose : fallback;
  const cx = clamp(Math.floor(origin.x), 0, WORLD_WIDTH - 1);
  const cz = clamp(Math.floor(origin.z), 0, WORLD_WIDTH - 1);
  function findGround(bx: number, bz: number): Pose | undefined {
    if (!inside(bx, 0, bz)) return;
    for (let by = WORLD_HEIGHT - 1; by >= 0; by--) {
      const block = world.get(bx, by, bz);
      if (block === 0) continue;
      if (block !== 13 && safe(bx + .5, by + 1, bz + .5)) return { x: bx + .5, y: by + 1, z: bz + .5, ...angles };
      return;
    }
  }
  const local = findGround(cx, cz);
  if (local) return local;
  if (safe(fallback.x, fallback.y, fallback.z)) return { ...fallback, ...angles };
  // Each perimeter is visited once; an edited spawn tower or a lake can be bypassed.
  for (let r = 1; r < WORLD_WIDTH; r++) {
    for (let d = -r; d <= r; d++) {
      const near = findGround(cx + d, cz - r) ?? findGround(cx + d, cz + r);
      if (near) return near;
      if (Math.abs(d) < r) {
        const side = findGround(cx - r, cz + d) ?? findGround(cx + r, cz + d);
        if (side) return side;
      }
    }
  }
  throw new Error("立てる場所が見つかりません。別のワールドかバックアップを開いてください。");
}

function moveAxis(world: ReadWorld, player: Player, axis: "x" | "y" | "z", distance: number): boolean {
  if (!distance) return false;
  const old = player[axis];
  player[axis] = old + distance;
  const height = player.crouched ? CROUCH_HEIGHT : BODY_HEIGHT;
  if (!occupied(world, player.x, player.y, player.z,height)) return false;
  if(axis==="y"&&distance<0){
    const floor=floorBetween(world,player.x,player.z,player.y-EPS,old+EPS);
    if(floor){player.y=floor.y;return true;}
  }
  // Each substep is shorter than one voxel. Snap to the face first crossed by the leading edge.
  const pad = axis === "y" ? (distance > 0 ? height : 0) : (distance > 0 ? BODY_RADIUS : -BODY_RADIUS);
  const edge = old + distance + pad;
  const snap=(distance > 0 ? Math.floor(edge - EPS) : Math.ceil(edge + EPS)) - pad;
  if(axis!=="y"&&Math.abs(snap-old)>Math.abs(distance)+EPS){
    // An airborne avatar can hit the middle of a slope without crossing a
    // voxel boundary. Stop inside this substep instead of snapping backwards.
    let low=0,high=1;
    for(let i=0;i<9;i++){
      const t=(low+high)/2;
      player[axis]=old+distance*t;
      if(occupied(world,player.x,player.y,player.z,height))high=t;
      else low=t;
    }
    player[axis]=old+distance*low;
  }else player[axis]=snap;
  return true;
}
type Floor={y:number;id:number};
function floorBetween(world:ReadWorld,x:number,z:number,low:number,high:number,radius=BODY_RADIUS-EPS):Floor|null {
  let floor:Floor|null=null;
  const bottom=Math.max(0,Math.ceil(low-1)),top=Math.min(WORLD_HEIGHT-1,Math.floor(high));
  const x0=Math.max(0,Math.floor(x-radius)),x1=Math.min(WORLD_WIDTH-1,Math.floor(x+radius));
  const z0=Math.max(0,Math.floor(z-radius)),z1=Math.min(WORLD_WIDTH-1,Math.floor(z+radius));
  for(let by=bottom;by<=top;by++)for(let bz=z0;bz<=z1;bz++)for(let bx=x0;bx<=x1;bx++){
    const id=world.get(bx,by,bz);
    if(!solid(id))continue;
    const ramp=isSlide(id),y=ramp?rampTop(id,bx,by,bz,x,z,radius):by+1;
    if(y<low||y>high)continue;
    if(!floor||y>floor.y+EPS||!ramp&&isSlide(floor.id)&&Math.abs(y-floor.y)<=EPS)floor={y,id};
  }
  return floor;
}
function supported(world:ReadWorld,x:number,y:number,z:number,radius=BODY_RADIUS-EPS){
  return floorBetween(world,x,z,y-.002,y+.002,radius);
}
function walkAxis(world:ReadWorld,player:Player,axis:"x"|"z",distance:number,ground:Floor|null,guard:boolean,foot:number){
  if(!distance)return false;
  const x=player.x+(axis==="x"?distance:0),z=player.z+(axis==="z"?distance:0);
  if(ground&&(world.stage==="school"||world.stage==="park")){
    const stairTop=world.stage==="school"?schoolStairTop:parkStairTop;
    const edge=Math.sign(distance)*(BODY_RADIUS-EPS);
    const ex=axis==="x"?edge:0,ez=axis==="z"?edge:0;
    const next=stairTop(Math.floor(x+ex),Math.floor(z+ez));
    const previous=stairTop(Math.floor(x-ex),Math.floor(z-ez));
    const height=player.crouched?CROUCH_HEIGHT:BODY_HEIGHT;
    if(next!==undefined&&Math.abs(next-player.y-1)<.003&&!occupied(world,x,next,z,height)){
      player[axis]+=distance;player.y=next;return false;
    }
    if(next!==undefined||previous!==undefined){
      const stillOnTread=supported(world,x,player.y,z);
      if(!stillOnTread){
        const lower=floorBetween(world,x,z,player.y-1.003,player.y-.997);
        if(lower&&!occupied(world,x,lower.y,z,height)){
          player[axis]+=distance;player.y=lower.y;return false;
        }
      }else if(guard)foot=BODY_RADIUS-EPS;
    }
  }
  if(ground){
    const rise=Math.abs(distance)+.054;
    const next=floorBetween(world,x,z,player.y-rise,player.y+rise);
    if(next&&(isSlide(next.id)||isSlide(ground.id))){
      if(guard&&!floorBetween(world,x,z,player.y-rise,player.y+rise,foot))return true;
      if(!occupied(world,x,next.y,z,player.crouched?CROUCH_HEIGHT:BODY_HEIGHT)){
        player[axis]+=distance;player.y=next.y;return false;
      }
    }
  }
  if(guard&&!supported(world,x,player.y,z,foot))return true;
  return moveAxis(world,player,axis,distance);
}
export function stepPlayer(world: ReadWorld, player: Player, input: Input, dt: number,
  comfort: {bob?: boolean; sprintFov?: boolean; sprintSpeed?:number} = {}): void {
  if (!(dt > 0) || !Number.isFinite(dt)) return;
  // Cap elapsed time after backgrounding; never take a long untested displacement.
  const elapsed = Math.min(dt, .25);
  const steps = Math.ceil(elapsed * 100), h = elapsed / steps;
  const length = Math.max(1, Math.hypot(input.forward, input.right));
  const forward = input.forward / length, right = input.right / length;
  const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
  const dx = right * cos - forward * sin, dz = -right * sin - forward * cos;
  const requestedSpeed = comfort.sprintSpeed ?? 0;
  const customSprint = Number.isFinite(requestedSpeed) && requestedSpeed > 0;
  const sprintSpeed = customSprint ? requestedSpeed : 6.4;
  const swimSpeed = customSprint ? sprintSpeed * .4 : 2;
  if (input.jumpPressed || (input.jump && !player.wasJump)) player.jumpBuffer = .105;
  for (let i = 0; i < steps; i++) {
    const px = player.x, pz = player.z;
    player.inWater = wet(world, player.x, player.y, player.z);
    const ground = player.vy <= 0 ? supported(world, px, player.y, pz) : null;
    if (ground) player.y = ground.y;
    // Never unfold the collision body into a low lintel, even when starting flight.
    player.crouched = (!player.flying && !player.inWater && input.down && (!!ground || player.crouched)) ||
      (player.crouched && occupied(world,px,player.y,pz));
    const speed = player.flying ? (input.sprint ? 13 : 8) : player.inWater ? (input.sprint ? swimSpeed : 2) :
      player.crouched ? 1.65 : input.sprint ? sprintSpeed : 4.2;
    if (player.flying || player.inWater) {
      player.vx = dx*speed; player.vz = dz*speed;
    } else {
      const slide=ground&&isSlide(ground.id)?slideDirection(ground.id):null;
      const drive=slide?(player.crouched?2.4:6.4):0;
      const steer=slide?speed*.48:speed;
      const ax = dx*steer+(slide?.x??0)*drive-player.vx, az = dz*steer+(slide?.z??0)*drive-player.vz;
      const acceleration = slide ? 13 : ground ? ((dx || dz) ? 53 : 72) : ((dx || dz) ? 17 : 5);
      const amount = Math.min(1, acceleration*h/(Math.hypot(ax,az) || 1));
      player.vx += ax*amount; player.vz += az*amount;
    }
    const guard = !!ground && player.crouched && !player.flying;
    // A standing player may already overhang the safety margin when C is pressed.
    // Allow the existing footprint until they can step comfortably back onto the block.
    const foot = guard && supported(world,px,player.y,pz,.10) ? .10 : BODY_RADIUS-EPS;
    const sx = player.vx*h, sz = player.vz*h;
    const riding=player.flying||player.inWater?null:ground;
    if (walkAxis(world,player,"x",sx,riding,guard,foot)) player.vx = 0;
    if (walkAxis(world,player,"z",sz,riding,guard,foot)) player.vz = 0;
    if (ground) player.coyote = .08;
    if (player.flying) {
      player.coyote = player.jumpBuffer = 0;
      player.vy = (Number(input.jump) - Number(input.down)) * speed;
    } else if (player.inWater) {
      player.coyote = player.jumpBuffer = 0;
      // Keep momentum near the surface long enough to climb onto a shallow bank.
      player.vy = input.jump ? 4.9 : Math.max(-2.1, player.vy - 7 * h);
    } else {
      const pad=ground&&Math.abs(player.y-Math.round(player.y))<.002
        ?jumpPadHeight(world.get(Math.floor(player.x),Math.round(player.y)-1,Math.floor(player.z))):0;
      if (pad || player.jumpBuffer > 0 && player.coyote > 0) {
        player.vy = pad ? Math.sqrt(48*pad)+.12 : 8.35;
        player.jumpBuffer = player.coyote = 0;
      }
      if (player.vy > 0 || !supported(world,player.x,player.y,player.z)) player.vy = Math.max(-30, player.vy - 24*h);
      else player.vy = 0;
    }
    if (moveAxis(world, player, "y", player.vy * h)) player.vy = 0;
    player.grounded = player.vy <= 0 && !!supported(world,player.x,player.y,player.z);
    player.jumpBuffer = Math.max(0,player.jumpBuffer-h);
    player.coyote = Math.max(0,player.coyote-h);
    const distance = Math.hypot(player.x-px,player.z-pz);
    player.stride = (player.stride+distance*4.2) % (Math.PI*2);
    const bob = player.grounded && !player.flying && distance>0 && comfort.bob !== false
      ? Math.sin(player.stride)*(player.crouched?.006:.021) : 0;
    player.bobOffset += (bob-player.bobOffset)*Math.min(1,18*h);
    const eye = player.crouched ? .79 : EYE_HEIGHT;
    player.eye += (eye-player.eye)*Math.min(1,18*h);
    if (player.crouched && player.eye>CROUCH_HEIGHT-.07 &&
      occupied(world,player.x,player.y,player.z,player.eye+.07)) player.eye=CROUCH_HEIGHT-.07;
    const fov = input.sprint && !player.crouched && distance/h>4.2 && comfort.sprintFov !== false ? 4 : 0;
    player.fovOffset += (fov-player.fovOffset)*Math.min(1,10*h);
  }
  player.inWater = wet(world, player.x, player.y, player.z);
  player.wasJump = input.jump;
}

export function raycast(world: ReadWorld, pose: Pose, max = REACH): Hit | null {
  if (!Number.isFinite(max) || max < 0 ||
      ![pose.x, pose.y, pose.z, pose.yaw, pose.pitch].every(Number.isFinite)) return null;
  const ox = pose.x, oy = pose.y + eyeHeight(pose), oz = pose.z;
  const cp = Math.cos(pose.pitch);
  const dx = -Math.sin(pose.yaw) * cp, dy = Math.sin(pose.pitch), dz = -Math.cos(pose.yaw) * cp;
  let x = Math.floor(ox), y = Math.floor(oy), z = Math.floor(oz);
  const sx = Math.sign(dx), sy = Math.sign(dy), sz = Math.sign(dz);
  const tx = dx ? Math.abs(1 / dx) : Infinity, ty = dy ? Math.abs(1 / dy) : Infinity, tz = dz ? Math.abs(1 / dz) : Infinity;
  const first = (o: number, cell: number, dir: number) => dir === 0 ? Infinity : Math.max(0, ((dir > 0 ? cell + 1 : cell) - o) / dir);
  let nextX = first(ox, x, dx), nextY = first(oy, y, dy), nextZ = first(oz, z, dz);
  let nx = 0, ny = 0, nz = 0, distance = 0;
  const reach = Math.min(REACH, max);
  // A ray can cross at most ceil(reach) planes on each axis, plus the starting cell.
  for (let steps = 0; steps <= 3 * Math.ceil(reach) + 1 && distance <= reach && inside(x, y, z); steps++) {
    const id = world.get(x, y, z);
    if(isSlide(id)){
      const exit=Math.min(reach,nextX,nextY,nextZ);
      const above=(t:number)=>oy+dy*t-y-slideHeight(id,ox+dx*t-x,oz+dz*t-z);
      const entryHeight=above(distance),exitHeight=above(exit);
      if(entryHeight<=EPS)return {x,y,z,id,nx,ny,nz,distance};
      if(exitHeight<=0){
        const surface=distance+(exit-distance)*entryHeight/(entryHeight-exitHeight);
        return {x,y,z,id,nx:0,ny:1,nz:0,distance:surface};
      }
    }else if (solid(id)) return { x, y, z, id, nx, ny, nz, distance };
    nx = ny = nz = 0;
    // A ray across an exact edge enters the diagonal cell, never the two cells it only touches.
    distance = Math.min(nextX,nextY,nextZ);
    const crossX = nextX <= distance+1e-10, crossY = nextY <= distance+1e-10, crossZ = nextZ <= distance+1e-10;
    if (crossX) {nextX += tx; x += sx;}
    if (crossY) {nextY += ty; y += sy;}
    if (crossZ) {nextZ += tz; z += sz;}
    if (crossX) nx = -sx;
    else if (crossY) ny = -sy;
    else nz = -sz;
  }
  return null;
}
export function overlapsPlayer(player: Pose, x: number, y: number, z: number): boolean {
  return x < player.x + BODY_RADIUS - EPS && x + 1 > player.x - BODY_RADIUS + EPS &&
    z < player.z + BODY_RADIUS - EPS && z + 1 > player.z - BODY_RADIUS + EPS &&
    y < player.y + (player.crouched ? CROUCH_HEIGHT : BODY_HEIGHT) - EPS && y + 1 > player.y + EPS;
}
export function canPlaceAt(world: ReadWorld, player: Pose, hit: Hit | null): boolean {
  if (!hit || Math.abs(hit.nx) + Math.abs(hit.ny) + Math.abs(hit.nz) !== 1) return false;
  const x = hit.x + hit.nx, y = hit.y + hit.ny, z = hit.z + hit.nz;
  if (!inside(x, y, z) || solid(world.get(x, y, z))) return false;
  return !overlapsPlayer(player,x,y,z);
}
function matchesSight(world: ReadWorld, player: Pose, requested: Hit | null): requested is Hit {
  if (!requested) return false;
  const hit = raycast(world, player);
  return !!hit && hit.x === requested.x && hit.y === requested.y && hit.z === requested.z &&
    hit.id === requested.id && hit.nx === requested.nx && hit.ny === requested.ny && hit.nz === requested.nz;
}
export function mineAt(world: EditWorld, player: Pose, bag: Bag, mode: Mode, slot: number, hit: Hit | null): Outcome {
  if (!matchesSight(world, player, hit)) return { ok: false, message: "5ブロック以内の素材に照準を合わせてください。" };
  if (hit.id === 22 && world.chestAt?.(hit.x,hit.y,hit.z)?.length)
    return {ok:false,message:"先にチェストの中身を取り出してください。"};
  if (!ITEMS[hit.id]?.block) return { ok: false, message: "岩盤は掘れません。" };
  if (mode === "creative") return world.set(hit.x, hit.y, hit.z, 0) ?
    { ok: true, message: ITEMS[hit.id].name + "を取り除きました。" } : { ok: false, message: "ここは掘れません。" };
  const staged = stageMining(bag, hit.id, bag.hotbar[slot]);
  if (!staged.draft) return { ok: false, message: staged.message };
  if (!world.set(hit.x, hit.y, hit.z, 0)) return { ok: false, message: "ここは掘れません。" };
  Object.assign(bag, staged.draft);
  return { ok: true, message: staged.message };
}
export function placementIssue(world: ReadWorld, player: Pose, bag: Bag, mode: Mode, slot: number, hit: Hit | null): string|null {
  const id = bag.hotbar[slot];
  if (!ITEMS[id]?.block) return "ホットバーから建材を選んでください。";
  if (mode === "explore" && !activeStack(bag, id)) return ITEMS[id].name + "を持っていません。";
  if (!hit) return "5ブロック以内の面に照準を合わせてください。";
  const x = hit.x+hit.nx, y = hit.y+hit.ny, z = hit.z+hit.nz;
  if (!inside(x,y,z)) return "ワールドの外には置けません。";
  if (overlapsPlayer(player,x,y,z)) return "自分の体に重なる場所です。";
  if (!canPlaceAt(world,player,hit)) return "ここにはすでにブロックがあります。";
  return null;
}
export function placeAt(world: EditWorld, player: Pose, bag: Bag, mode: Mode, slot: number, hit: Hit | null, placedId?:number): Outcome {
  const issue = placementIssue(world,player,bag,mode,slot,hit);
  if (issue) return {ok:false,message:issue};
  if (!matchesSight(world,player,hit)) return {ok:false,message:"5ブロック以内の面に照準を合わせてください。"};
  const id = bag.hotbar[slot];
  if(placedId!==undefined && (id!==30 || !isSlide(placedId)))return {ok:false,message:"この建材の向きは変更できません。"};
  if (!world.set(hit.x + hit.nx, hit.y + hit.ny, hit.z + hit.nz, placedId??id)) return { ok: false, message: "ここには置けません。" };
  if (mode === "explore") consumeBlock(bag, id);
  return { ok: true, message: ITEMS[id].name + "を置きました。" };
}
