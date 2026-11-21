import { validStacks, type Stack, type Outcome } from "./inventory.ts";
import { makeLandmarks, type Landmark } from "./landmarks.ts";
import type { TerrainPreset } from "./stages.ts";
import { buildSchool, schoolSpawn } from "./school.ts";
import { buildFrontierTerrain, buildFrontierTown, frontierSpawn, type FrontierStructureCell } from "./frontier-world.ts";
import { buildCopsStage, COPS_ROBBER_SPAWN, COPS_WALK_Y } from "./cops-stages.ts";

export const SIZE = 256;
export const HEIGHT = 96;
export const CHUNK = 16;
export const SEA_LEVEL = 28;
export const GENERATOR_VERSION = 2;
export type GeneratorVersion = 1 | 2;
const AREA = SIZE * SIZE;
const CHUNKS_Y = HEIGHT / CHUNK;
const VOLUME = AREA * HEIGHT;
const SPAWN_X = 128, SPAWN_Z = 139;

export type Edit = [number, number];
export type Axis = 'x'|'y'|'z';
export type WorldFixtures = { axes:[number,'x'|'z'][]; chests:[number,Stack[]][]; benches:[number,number][] };
type CapturedCell = {x:number;y:number;z:number;id:number;axis:Axis};
export const emptyFixtures = (): WorldFixtures => ({axes:[],chests:[],benches:[]});
export function editableId(id: unknown): id is number {
  return typeof id==="number" && Number.isInteger(id) && (id>=0 && id<=13 || [21,22,23].includes(id) || id>=25 && id<=33);
}
export function validFixtures(value: unknown): value is WorldFixtures {
  if (!value || typeof value!=="object") return false;
  const f=value as Partial<WorldFixtures>;
  const rows=(entries: unknown, valid: (item:unknown)=>boolean) => {
    if (!Array.isArray(entries) || entries.length>VOLUME-AREA) return false;
    const seen=new Set<number>();
    for (const entry of entries) {
      if (!Array.isArray(entry) || entry.length!==2 || !Number.isInteger(entry[0]) ||
        entry[0]<AREA || entry[0]>=VOLUME || seen.has(entry[0]) || !valid(entry[1])) return false;
      seen.add(entry[0]);
    }
    return true;
  };
  return rows(f.axes,v=>v==='x'||v==='z') && rows(f.chests,validStacks) &&
    rows(f.benches,v=>Number.isSafeInteger(v)&&Number(v)>=0);
}
export type Spawn = { x: number; y: number; z: number; yaw: number; pitch: number };
export const voxelIndex = (x: number, y: number, z: number) => x + SIZE * z + AREA * y;
export const chunkKey = (cx: number, cy: number, cz: number) => cx + 16 * cz + 256 * cy;
export function inside(x: number, y: number, z: number) {
  return x >= 0 && y >= 0 && z >= 0 && x < SIZE && y < HEIGHT && z < SIZE;
}
export function isOpaque(id: number) { return id !== 0 && id !== 6 && id !== 10 && id !== 13 && !(id>=30 && id<=33); }
export function isSolid(id: number) { return id !== 0 && id !== 13; }
export function affectedChunks(x: number, y: number, z: number): number[] {
  // Corner AO and crossed foliage depend on diagonal neighbours as well as face neighbours.
  const keys: number[] = [];
  for (let cy = Math.max(0, (y - 1) >> 4); cy <= Math.min(5, (y + 1) >> 4); cy++)
    for (let cz = Math.max(0, (z - 1) >> 4); cz <= Math.min(15, (z + 1) >> 4); cz++)
      for (let cx = Math.max(0, (x - 1) >> 4); cx <= Math.min(15, (x + 1) >> 4); cx++)
        keys.push(chunkKey(cx, cy, cz));
  return keys;
}

function seedHash(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return hash >>> 0;
}
export function scatter(x: number, z: number, seed = 0) {
  let h = Math.imul(x ^ seed, 0x9e3779b1) ^ Math.imul(z, 0x85ebca77);
  h = Math.imul(h ^ h >>> 16, 0x7feb352d);
  h = Math.imul(h ^ h >>> 15, 0x846ca68b);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}
function noise(x: number, z: number, scale: number, seed: number) {
  x /= scale; z /= scale;
  const ix = Math.floor(x), iz = Math.floor(z);
  let u = x - ix, v = z - iz;
  u = u*u*(3-2*u); v = v*v*(3-2*v);
  const a = scatter(ix, iz, seed), b = scatter(ix+1, iz, seed);
  const c = scatter(ix, iz+1, seed), d = scatter(ix+1, iz+1, seed);
  return a + (b-a)*u + (c-a)*v + (a-b-c+d)*u*v;
}
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
function fade(radius: number, inner: number, outer: number) {
  const t = clamp((outer-radius)/(outer-inner));
  return t*t*(3-2*t);
}

export class World {
  readonly data = new Uint8Array(VOLUME);
  readonly highest = new Int16Array(AREA);
  readonly occupied = new Uint16Array(256 * CHUNKS_Y);
  readonly dense = new Uint16Array(256 * CHUNKS_Y);
  readonly lamps = new Set<number>();
  readonly salt: number;
  readonly generator: GeneratorVersion;
  landmarks: Landmark[]=[];
  frontierStructures: readonly FrontierStructureCell[]=[];
  private axes=new Map<number,'x'|'z'>();
  private chests=new Map<number,Stack[]>();
  private benches=new Map<number,number>();
  private history:{before:CapturedCell;after:CapturedCell}[]=[];
  private readonly heights = new Uint8Array(AREA);
  private readonly edits = new Map<number, {id: number; base: number}>();
  private readonly listeners = new Set<(x: number, y: number, z: number) => void>();

  constructor(seed: string, defer = false, generator:GeneratorVersion=1, readonly stage:TerrainPreset='classic') {
    this.salt = seedHash(seed);
    this.generator=generator;
    if (!defer) for (const _ of this.generateTerrain()) { /* synchronous use in tools/tests */ }
  }
  static async generate(seed: string, progress?: (fraction: number) => void, generator:GeneratorVersion=1, stage:TerrainPreset='classic') {
    const world = new World(seed, true,generator,stage);
    let checkpoint = performance.now();
    for (const part of world.generateTerrain()) {
      if (performance.now() - checkpoint < 7 && part < 1) continue;
      progress?.(part);
      await new Promise<void>(done => setTimeout(done, 0));
      checkpoint = performance.now();
    }
    return world;
  }
  get(x: number, y: number, z: number): number {
    return inside(x, y, z) && Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(z)
      ? this.data[voxelIndex(x,y,z)] : 0;
  }
  private write(x: number, y: number, z: number, id: number) {
    if (inside(x,y,z)) this.data[voxelIndex(x,y,z)] = id;
  }
  private heightAt(x: number, z: number) {
    const gentle = noise(x,z,47,this.salt), ridge = noise(x,z,31,this.salt^109);
    const detail = noise(x,z,11,this.salt^51);
    let height = 22 + gentle*18 + Math.max(0,ridge-.47)*47 + detail*3;
    // A sheltered inlet and terrace frame the first view. The islands, banks,
    // headlands and every landscape beyond the landing vary with the seed.
    const inlet = Math.hypot((x-131)/1.55, (z-111));
    const lake = fade(inlet + (detail-.5)*5, 12, 24);
    height = height*(1-lake)+(25+detail*2)*lake;
    const terrace = fade(Math.hypot(x-SPAWN_X,z-SPAWN_Z), 5.4, 14);
    height = height*(1-terrace)+(32+.3*detail)*terrace;
    // Cut a gentle grassy ramp through the terrace. Even when the seeded
    // surrounding hills run high, the lake can be seen from standing height.
    const towardsLake=SPAWN_Z-z;
    if(towardsLake>4 && towardsLake<27) {
      const width=fade(Math.abs(x-(SPAWN_X+2)),4,12);
      const slope=32-clamp((towardsLake-4)/15)*6+.15*detail;
      height-=Math.max(0,height-slope)*width;
    }
    const headland = fade(Math.hypot((x-118)/1.6,z-75), 5, 28);
    height += headland*(8+7*detail);
    return clamp(Math.floor(height), 6, HEIGHT-14);
  }
  private lakeHeight(x:number,z:number) {
    const bottom=11+noise(x,z,25,this.salt^0xc44)*4;
    const landing=fade(Math.hypot((x-SPAWN_X)/1.2,z-SPAWN_Z),4,24);
    const west=fade(Math.hypot((x-92)/1.65,z-113),2,16);
    const east=fade(Math.hypot(x-154,(z-110)/1.75),2,13);
    return Math.floor(Math.max(bottom+(32-bottom)*landing,bottom+(30-bottom)*Math.max(west,east)));
  }
  private *generatePresetTerrain():Generator<number> {
    const flat=this.stage==='flat';
    this.data.fill(14,0,AREA);
    for(let z=0;z<SIZE;z++){
      for(let x=0;x<SIZE;x++){
        const height=flat?32:this.lakeHeight(x,z);
        for(let y=1;y<=height;y++){
          this.data[voxelIndex(x,y,z)]=y<height-3?3:flat?(y===height?1:2):4;
        }
        if(!flat){
          for(let y=height+1;y<=SEA_LEVEL;y++)this.data[voxelIndex(x,y,z)]=13;
        }
      }
      if(z%4===3)yield .78*(z+1)/SIZE;
    }
    yield* this.indexTerrain();
  }
  private *generateTerrain(): Generator<number> {
    if(this.stage==='park'||this.stage==='crossing'){
      this.data.fill(14,0,AREA);
      this.data.fill(3,(COPS_WALK_Y-5)*AREA,(COPS_WALK_Y-1)*AREA);
      this.data.fill(1,(COPS_WALK_Y-1)*AREA,COPS_WALK_Y*AREA);
      buildCopsStage(this.stage,(x,y,z,id)=>this.write(x,y,z,id));
      yield* this.indexTerrain();
      return;
    }
    if(this.stage==='school'){
      this.data.fill(14,0,AREA);
      this.data.fill(3,30*AREA,32*AREA);
      this.data.fill(1,32*AREA,33*AREA);
      buildSchool((x,y,z,id)=>this.write(x,y,z,id));
      yield* this.indexTerrain();
      return;
    }
    if(this.stage==='frontier'){
      yield* buildFrontierTerrain({
        size:SIZE,seaLevel:SEA_LEVEL,seed:this.salt,heights:this.heights,noise,scatter,
        write:(x,y,z,id)=>this.write(x,y,z,id),tree:(x,z,broad)=>this.tree(x,z,broad),
      });
      this.frontierStructures=buildFrontierTown((x,y,z,id)=>this.write(x,y,z,id));
      yield* this.indexTerrain();
      return;
    }
    if(this.stage!=='classic'){
      yield* this.generatePresetTerrain();
      return;
    }
    for (let z=0; z<SIZE; z++) {
      for (let x=0; x<SIZE; x++) {
        const h = this.heightAt(x,z);
        const sandy = h <= SEA_LEVEL+1 || (h < SEA_LEVEL+4 && noise(x,z,17,this.salt^311)>.65);
        const rim = x===0 || z===0 || x===SIZE-1 || z===SIZE-1;
        this.heights[x+SIZE*z]=h;
        for (let y=0; y<=Math.max(h,SEA_LEVEL); y++) {
          const id = y===0 || (rim && y===h) ? 14 : y>h ? 13 : y===h ? (sandy?4:1) : y>=h-3 ? (sandy?4:2) : 3;
          this.data[voxelIndex(x,y,z)] = id;
        }
      }
      if (z%4===3) yield .46*(z+1)/SIZE;
    }
    let step = 0;
    const rand = () => scatter(++step, 319, this.salt);
    const hollow = (ox:number, oy:number, oz:number, width:number, height:number) => {
      for(let dy=-Math.ceil(height);dy<=height;dy++) for(let dz=-Math.ceil(width);dz<=width;dz++)
        for(let dx=-Math.ceil(width);dx<=width;dx++) {
          if ((dx*dx+dz*dz)/(width*width)+dy*dy/(height*height)>1) continue;
          const x=Math.floor(ox)+dx, y=Math.floor(oy)+dy, z=Math.floor(oz)+dz;
          if (y<2 || x<=0 || z<=0 || x>=255 || z>=255 || !inside(x,y,z)) continue;
          // Keep the lakebed closed; caves inland may open onto a hillside.
          const h=this.heights[x+SIZE*z];
          if (h<=SEA_LEVEL && y>=h-2) continue;
          if (Math.abs(x-SPAWN_X)<5 && Math.abs(z-SPAWN_Z)<5 && y>27) continue;
          this.write(x,y,z,0);
        }
    };
    for (let i=0;i<108;i++) {
      let x=5+rand()*246, z=5+rand()*246, y=5+rand()*(this.heights[(x|0)+SIZE*(z|0)]-5);
      let heading=rand()*Math.PI*2, grade=(rand()-.5)*.6;
      const length=17+Math.floor(rand()*40);
      for(let s=0;s<length;s++) {
        const r=1.65+1.15*Math.sin(Math.PI*s/length);
        hollow(x,y,z,r,r*.7);
        heading+=(rand()-.5)*.56; grade=clamp(grade+(rand()-.5)*.17,-.45,.45);
        x+=Math.cos(heading); z+=Math.sin(heading); y+=grade;
      }
      if(i%4===3) yield .46+.12*(i+1)/108;
    }
    // A walk-in grotto and an exposed stone/coal shelf beside the first clearing.
    for(let i=0;i<13;i++){
      const x=SPAWN_X+12+i, z=SPAWN_Z-2;
      hollow(x, this.heights[SPAWN_X+12+SIZE*z]+1-i*.4, z, 2.5, 2.2);
    }
    for(let i=0;i<1800;i++) {
      const x=2+Math.floor(rand()*252), z=2+Math.floor(rand()*252);
      const y=2+Math.floor(rand()*(this.heights[x+SIZE*z]-3));
      for(let j=0;j<8;j++) {
        const xx=x+Math.floor(rand()*3)-1, zz=z+Math.floor(rand()*3)-1, yy=y+Math.floor(rand()*3)-1;
        if (this.get(xx,yy,zz)===3) this.write(xx,yy,zz,11);
      }
      if(i%160===0) yield .59+.06*i/1800;
    }
    for(let dx=-3;dx<=3;dx++) for(let dz=-2;dz<=2;dz++) {
      if(dx*dx*.55+dz*dz>4.8) continue;
      const x=SPAWN_X+6+dx, z=SPAWN_Z-4+dz, h=this.heights[x+SIZE*z];
      const crest=dx*dx+dz*dz<3 ? 2 : 1;
      for(let y=h-2;y<h+crest;y++) this.write(x,y,z,3);
      if(dx===0&&dz===0) this.write(x,h+1,z,11);
    }
    for(let cz=0;cz<51;cz++) {
      for(let cx=0;cx<51;cx++) {
        const x=cx*5+1+Math.floor(scatter(cx,cz,this.salt^134)*3);
        const z=cz*5+1+Math.floor(scatter(cx,cz,this.salt^854)*3);
        if(Math.hypot(x-SPAWN_X,z-SPAWN_Z)<10 ||
          (z<SPAWN_Z && z>SPAWN_Z-26 && Math.abs(x-(SPAWN_X+2))<5)) continue;
        const forest = noise(x,z,35,this.salt^482);
        const density = .026 + .75*clamp((forest-.38)*3.6);
        if(scatter(cx,cz,this.salt^723)<density) this.tree(x,z);
      }
      if(cz%3===2) yield .65+.13*(cz+1)/51;
    }
    this.tree(SPAWN_X-2,SPAWN_Z-3,true);
    this.tree(SPAWN_X-7,SPAWN_Z-7,true);
    this.tree(SPAWN_X+12,SPAWN_Z-10,true);
    if (this.generator===2) this.landmarks=makeLandmarks({
      ground:(x,z)=>this.heights[x+SIZE*z],noise:(x,z)=>scatter(x,z,this.salt^0x777),
      get:(x,y,z)=>this.get(x,y,z),put:(x,y,z,id)=>this.write(x,y,z,id)
    });
    yield* this.indexTerrain();
  }
  private *indexTerrain():Generator<number> {
    this.highest.fill(-1);
    const indexLandmarkLights=this.stage==='school'||this.stage==='frontier'||this.stage==='park'||this.stage==='crossing';
    for(let y=0;y<HEIGHT;y++) {
      for(let z=0;z<SIZE;z++) for(let x=0;x<SIZE;x++) {
        const index=voxelIndex(x,y,z),id=this.data[index];
        if (!id) continue;
        const key=chunkKey(x>>4,y>>4,z>>4);
        this.occupied[key]++;
        if(isOpaque(id)) this.dense[key]++;
        if(isSolid(id) && id!==10) this.highest[x+SIZE*z]=y;
        if(indexLandmarkLights&&(id===12||id===25)) this.lamps.add(index);
      }
      if(y%4===3) yield .78+.22*(y+1)/HEIGHT;
    }
  }
  private tree(x:number,z:number, forceBroad=false) {
    const floor=this.heights[x+SIZE*z];
    if (this.get(x,floor,z)!==1 || this.get(x,floor+1,z)!==0) return;
    const style=scatter(x,z,this.salt^813);
    const pine=!forceBroad && style>.68;
    const trunk=(pine?6:4)+Math.floor(scatter(x,z,this.salt^102)*3);
    for(let dy=1;dy<=trunk;dy++) this.write(x,floor+dy,z,5);
    const start=pine?3:trunk-1, end=pine?trunk+2:trunk+2;
    for(let dy=start;dy<=end;dy++) {
      const r=pine?Math.min(2,Math.ceil((end-dy)*.43)):dy===end?1:2;
      for(let dx=-r;dx<=r;dx++) for(let dz=-r;dz<=r;dz++){
        if(Math.abs(dx)===r && Math.abs(dz)===r && r>0 &&
          (pine || scatter(x+dx,z+dz,this.salt^dy)<.72)) continue;
        if(!inside(x+dx,floor+dy,z+dz) || this.get(x+dx,floor+dy,z+dz)!==0) continue;
        this.write(x+dx,floor+dy,z+dz,6);
      }
    }
  }
  spawn(): Spawn {
    if(this.stage==='park'||this.stage==='crossing')return {...COPS_ROBBER_SPAWN};
    if(this.stage==='school')return {...schoolSpawn};
    if(this.stage==='frontier')return {...frontierSpawn};
    for(let radius=0;radius<32;radius++) for(let dz=-radius;dz<=radius;dz++) for(let dx=-radius;dx<=radius;dx++) {
      if(Math.max(Math.abs(dx),Math.abs(dz))!==radius) continue;
      const x=SPAWN_X+dx,z=SPAWN_Z+dz;
      for(let y=HEIGHT-3;y>0;y--) {
        const id=this.get(x,y,z);
        if(!isSolid(id) || id===6 || id===5 || this.get(x,y+1,z)!==0 || this.get(x,y+2,z)!==0) continue;
        return {x:x+.5,y:y+1.001,z:z+.5,yaw:-.075,pitch:-.085};
      }
    }
    return {x:SPAWN_X+.5,y:HEIGHT+.01,z:SPAWN_Z+.5,yaw:0,pitch:0};
  }
  onEdit(callback:(x:number,y:number,z:number)=>void) {
    this.listeners.add(callback);
    return () => {this.listeners.delete(callback);};
  }
  set(x:number,y:number,z:number,id:number):boolean {
    if(!Number.isInteger(x)||!Number.isInteger(y)||!Number.isInteger(z)||!inside(x,y,z)||
      !editableId(id)||y===0) return false;
    const key=voxelIndex(x,y,z), old=this.data[key];
    if(old===id || old===14) return false;
    if(old===22 && this.chests.get(key)?.length) return false;
    const base=this.edits.get(key)?.base ?? old;
    if(id===base) this.edits.delete(key); else this.edits.set(key,{id,base});
    this.replace(x,y,z,id);
    return true;
  }
  private replace(x:number,y:number,z:number,id:number) {
    const key=voxelIndex(x,y,z), old=this.data[key], ck=chunkKey(x>>4,y>>4,z>>4);
    this.data[key]=id;
    this.axes.delete(key);
    this.chests.delete(key);
    this.benches.delete(key);
    this.occupied[ck]+=Number(id!==0)-Number(old!==0);
    this.dense[ck]+=Number(isOpaque(id))-Number(isOpaque(old));
    if(old===12||old===25) this.lamps.delete(key);
    if(id===12||id===25) this.lamps.add(key);
    const column=x+SIZE*z;
    if (y>=this.highest[column]) {
      let top=Math.max(y,this.highest[column]);
      while(top>=0 && (!isSolid(this.data[voxelIndex(x,top,z)]) || this.data[voxelIndex(x,top,z)]===10)) top--;
      this.highest[column]=top;
    }
    for(const notify of this.listeners) notify(x,y,z);
  }
  exportEdits():Edit[] { return Array.from(this.edits, ([key,{id}])=>[key,id]); }
  loadEdits(edits:Edit[]) {
    const seen=new Set<number>();
    for(const [key,id] of edits) {
      if(!Number.isInteger(key)||key<AREA||key>=VOLUME||!editableId(id)||seen.has(key)||
        (this.edits.get(key)?.base??this.data[key])===14) throw new Error("地形の変更データが不正です。");
      seen.add(key);
    }
    this.history=[];
    this.axes.clear(); this.benches.clear(); this.chests.clear();
    for(const [key,{base}] of this.edits) this.replace(key%256,key>>>16,(key>>>8)&255,base);
    this.edits.clear();
    for(const [key,id] of edits) this.set(key%256,key>>>16,(key>>>8)&255,id);
  }
  axisAt(x:number,y:number,z:number):Axis { return this.axes.get(voxelIndex(x,y,z)) ?? 'y'; }
  setAxis(x:number,y:number,z:number,axis:Axis):boolean {
    if (this.get(x,y,z)!==5 || !['x','y','z'].includes(axis)) return false;
    if (this.axisAt(x,y,z)===axis) return true;
    const key=voxelIndex(x,y,z);
    if (axis==='y') this.axes.delete(key); else this.axes.set(key,axis);
    for (const notify of this.listeners) notify(x,y,z);
    return true;
  }
  chestAt(x:number,y:number,z:number):Stack[]|undefined {
    if (this.get(x,y,z)!==22) return;
    const key=voxelIndex(x,y,z);
    const slots=this.chests.get(key) ?? [];
    this.chests.set(key,slots);
    return slots;
  }
  benchUses(x:number,y:number,z:number):number {return this.benches.get(voxelIndex(x,y,z)) ?? 0;}
  useBench(x:number,y:number,z:number,craftCount=1):void {
    if (this.get(x,y,z)!==21 || !Number.isSafeInteger(craftCount) || craftCount<1) return;
    const key=voxelIndex(x,y,z);
    // A prebuilt public workbench is part of the terrain, not a saved placement.
    if(this.stage==='frontier'&&!this.edits.has(key))return;
    this.benches.set(key,Math.min(Number.MAX_SAFE_INTEGER,this.benchUses(x,y,z)+craftCount));
  }
  exportFixtures():WorldFixtures {
    return {axes:[...this.axes],benches:[...this.benches],chests:[...this.chests].filter(([,slots])=>slots.length)
      .map(([key,slots])=>[key,slots.map(s=>({...s}))])};
  }
  loadFixtures(f:WorldFixtures) {
    if (!validFixtures(f) || f.axes.some(([key])=>this.data[key]!==5) || f.chests.some(([key])=>this.data[key]!==22) ||
      f.benches.some(([key])=>this.data[key]!==21)) throw new Error("建具と地形の保存内容が一致しません。元のバックアップを確認してください。");
    const changedAxes=new Set([...this.axes.keys(),...f.axes.map(([key])=>key)]);
    this.axes=new Map(f.axes); this.benches=new Map(f.benches);
    this.chests=new Map(f.chests.map(([key,slots])=>[key,slots.map(s=>({...s}))]));
    for (const key of changedAxes) for (const notify of this.listeners) notify(key%256,key>>>16,(key>>>8)&255);
  }
  capture(x:number,y:number,z:number):CapturedCell {
    return {x,y,z,id:this.get(x,y,z),axis:this.axisAt(x,y,z)};
  }
  remember(before:CapturedCell) {
    const after=this.capture(before.x,before.y,before.z);
    if (before.id===21 || before.id===22 || after.id===21 || after.id===22 ||
      before.id===after.id && before.axis===after.axis) return;
    this.history.push({before,after});
    if (this.history.length>20) this.history.shift();
  }
  undo(overlaps:(x:number,y:number,z:number)=>boolean):Outcome {
    const entry=this.history.at(-1);
    if (!entry) return {ok:false,message:"戻せる通常ブロックの編集がありません。作業台・チェストは対象外です。"};
    const {before,after}=entry,{x,y,z}=before;
    if (this.get(x,y,z)!==after.id || this.axisAt(x,y,z)!==after.axis) {
      this.history.pop();
      return {ok:false,message:"この場所はすでに変化したため、戻せません。"};
    }
    if (isSolid(before.id) && overlaps(x,y,z)) return {ok:false,message:"体と重なります。少し離れてから戻してください。"};
    if (before.id!==after.id && !this.set(x,y,z,before.id)) return {ok:false,message:"この編集は戻せません。"};
    if (before.id===5) this.setAxis(x,y,z,before.axis);
    this.history.pop();
    return {ok:true,message:"直前のブロック編集を戻しました。"};
  }
}
