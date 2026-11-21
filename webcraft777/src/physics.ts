import { activeStack, consumeBlock, ITEMS, stageMining } from "./inventory.ts";
import type { Bag, Mode, Outcome } from "./inventory.ts";

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
// Padding makes touching a face legal while retaining solid world bounds.
function occupied(world: ReadWorld, x: number, y: number, z: number, height = BODY_HEIGHT): boolean {
  const x0 = Math.floor(x - BODY_RADIUS + EPS), x1 = Math.floor(x + BODY_RADIUS - EPS);
  const y0 = Math.floor(y + EPS), y1 = Math.floor(y + height - EPS);
  const z0 = Math.floor(z - BODY_RADIUS + EPS), z1 = Math.floor(z + BODY_RADIUS - EPS);
  if (!inside(x0, y0, z0) || !inside(x1, y1, z1)) return true;
  for (let by = y0; by <= y1; by++)
    for (let bz = z0; bz <= z1; bz++)
      for (let bx = x0; bx <= x1; bx++)
        if (solid(world.get(bx, by, bz))) return true;
  return false;
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
  // Each substep is shorter than one voxel. Snap to the face first crossed by the leading edge.
  const pad = axis === "y" ? (distance > 0 ? height : 0) : (distance > 0 ? BODY_RADIUS : -BODY_RADIUS);
  const edge = old + distance + pad;
  player[axis] = (distance > 0 ? Math.floor(edge - EPS) : Math.ceil(edge + EPS)) - pad;
  return true;
}
// Only a horizontal top face can support a foot. Touching a wall never counts.
function supported(world: ReadWorld, x: number, y: number, z: number, radius = BODY_RADIUS - EPS) {
  if (Math.abs(y - Math.round(y)) > .002) return false;
  const below = Math.round(y) - 1;
  for (let bz = Math.floor(z-radius); bz <= Math.floor(z+radius); bz++)
    for (let bx = Math.floor(x-radius); bx <= Math.floor(x+radius); bx++)
      if (inside(bx,below,bz) && solid(world.get(bx,below,bz))) return true;
  return false;
}
export function stepPlayer(world: ReadWorld, player: Player, input: Input, dt: number,
  comfort: {bob?: boolean; sprintFov?: boolean} = {}): void {
  if (!(dt > 0) || !Number.isFinite(dt)) return;
  // Cap elapsed time after backgrounding; never take a long untested displacement.
  const elapsed = Math.min(dt, .25);
  const steps = Math.ceil(elapsed * 100), h = elapsed / steps;
  const length = Math.max(1, Math.hypot(input.forward, input.right));
  const forward = input.forward / length, right = input.right / length;
  const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
  const dx = right * cos - forward * sin, dz = -right * sin - forward * cos;
  if (input.jumpPressed || (input.jump && !player.wasJump)) player.jumpBuffer = .105;
  for (let i = 0; i < steps; i++) {
    const px = player.x, pz = player.z;
    player.inWater = wet(world, player.x, player.y, player.z);
    const ground = player.vy <= 0 && supported(world, px, player.y, pz);
    if (ground) player.y = Math.round(player.y);
    // Never unfold the collision body into a low lintel, even when starting flight.
    player.crouched = (!player.flying && !player.inWater && input.down && (ground || player.crouched)) ||
      (player.crouched && occupied(world,px,player.y,pz));
    const speed = player.flying ? (input.sprint ? 13 : 8) : player.inWater ? 2 :
      player.crouched ? 1.65 : input.sprint ? 6.4 : 4.2;
    if (player.flying || player.inWater) {
      player.vx = dx*speed; player.vz = dz*speed;
    } else {
      const ax = dx*speed - player.vx, az = dz*speed - player.vz;
      const acceleration = ground ? ((dx || dz) ? 53 : 72) : ((dx || dz) ? 17 : 5);
      const amount = Math.min(1, acceleration*h/(Math.hypot(ax,az) || 1));
      player.vx += ax*amount; player.vz += az*amount;
    }
    const guard = ground && player.crouched && !player.flying;
    // A standing player may already overhang the safety margin when C is pressed.
    // Allow the existing footprint until they can step comfortably back onto the block.
    const foot = guard && supported(world,px,player.y,pz,.10) ? .10 : BODY_RADIUS-EPS;
    const sx = player.vx*h, sz = player.vz*h;
    if ((guard && !supported(world,px+sx,player.y,pz,foot)) || moveAxis(world,player,"x",sx)) player.vx = 0;
    if ((guard && !supported(world,player.x,player.y,pz+sz,foot)) || moveAxis(world,player,"z",sz)) player.vz = 0;
    if (ground) player.coyote = .08;
    if (player.flying) {
      player.coyote = player.jumpBuffer = 0;
      player.vy = (Number(input.jump) - Number(input.down)) * speed;
    } else if (player.inWater) {
      player.coyote = player.jumpBuffer = 0;
      // Keep momentum near the surface long enough to climb onto a shallow bank.
      player.vy = input.jump ? 4.9 : Math.max(-2.1, player.vy - 7 * h);
    } else {
      if (player.jumpBuffer > 0 && player.coyote > 0) {
        player.vy = 8.35;
        player.jumpBuffer = player.coyote = 0;
      }
      if (player.vy > 0 || !supported(world,player.x,player.y,player.z)) player.vy = Math.max(-30, player.vy - 24*h);
      else player.vy = 0;
    }
    if (moveAxis(world, player, "y", player.vy * h)) player.vy = 0;
    player.grounded = player.vy <= 0 && supported(world,player.x,player.y,player.z);
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
    if (solid(id)) return { x, y, z, id, nx, ny, nz, distance };
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
export function placeAt(world: EditWorld, player: Pose, bag: Bag, mode: Mode, slot: number, hit: Hit | null): Outcome {
  const issue = placementIssue(world,player,bag,mode,slot,hit);
  if (issue) return {ok:false,message:issue};
  if (!matchesSight(world,player,hit)) return {ok:false,message:"5ブロック以内の面に照準を合わせてください。"};
  const id = bag.hotbar[slot];
  if (!world.set(hit.x + hit.nx, hit.y + hit.ny, hit.z + hit.nz, id)) return { ok: false, message: "ここには置けません。" };
  if (mode === "explore") consumeBlock(bag, id);
  return { ok: true, message: ITEMS[id].name + "を置きました。" };
}
