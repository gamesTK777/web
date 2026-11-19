export const SIZE = 256;
export const HEIGHT = 96;
export const CHUNK = 16;
export const SEA_LEVEL = 28;
export const GENERATOR_VERSION = 1;
const AREA = SIZE * SIZE;
const CHUNKS_Y = HEIGHT / CHUNK;
const VOLUME = AREA * HEIGHT;
const SPAWN_X = 128, SPAWN_Z = 139;

export type Edit = [number, number];
export type Spawn = { x: number; y: number; z: number; yaw: number; pitch: number };
export const voxelIndex = (x: number, y: number, z: number) => x + SIZE * z + AREA * y;
export const chunkKey = (cx: number, cy: number, cz: number) => cx + 16 * cz + 256 * cy;
export function inside(x: number, y: number, z: number) {
  return x >= 0 && y >= 0 && z >= 0 && x < SIZE && y < HEIGHT && z < SIZE;
}
export function isOpaque(id: number) { return id !== 0 && id !== 6 && id !== 10 && id !== 13; }
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
  private readonly heights = new Uint8Array(AREA);
  private readonly edits = new Map<number, {id: number; base: number}>();
  private readonly listeners = new Set<(x: number, y: number, z: number) => void>();

  constructor(seed: string, defer = false) {
    this.salt = seedHash(seed);
    if (!defer) for (const _ of this.generateTerrain()) { /* synchronous use in tools/tests */ }
  }
  static async generate(seed: string, progress?: (fraction: number) => void) {
    const world = new World(seed, true);
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
  private *generateTerrain(): Generator<number> {
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
    this.highest.fill(-1);
    for(let y=0;y<HEIGHT;y++) {
      for(let z=0;z<SIZE;z++) for(let x=0;x<SIZE;x++) {
        const id=this.data[voxelIndex(x,y,z)];
        if (!id) continue;
        const key=chunkKey(x>>4,y>>4,z>>4);
        this.occupied[key]++;
        if(isOpaque(id)) this.dense[key]++;
        if(isSolid(id) && id!==10) this.highest[x+SIZE*z]=y;
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
      !Number.isInteger(id)||id<0||id>13||y===0) return false;
    const key=voxelIndex(x,y,z), old=this.data[key];
    if(old===id || old===14) return false;
    const base=this.edits.get(key)?.base ?? old;
    if(id===base) this.edits.delete(key); else this.edits.set(key,{id,base});
    this.replace(x,y,z,id);
    return true;
  }
  private replace(x:number,y:number,z:number,id:number) {
    const key=voxelIndex(x,y,z), old=this.data[key], ck=chunkKey(x>>4,y>>4,z>>4);
    this.data[key]=id;
    this.occupied[ck]+=Number(id!==0)-Number(old!==0);
    this.dense[ck]+=Number(isOpaque(id))-Number(isOpaque(old));
    if(old===12) this.lamps.delete(key);
    if(id===12) this.lamps.add(key);
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
      if(!Number.isInteger(key)||key<AREA||key>=VOLUME||!Number.isInteger(id)||id<0||id>13||seen.has(key)||
        (this.edits.get(key)?.base??this.data[key])===14) throw new Error("地形の変更データが不正です。");
      seen.add(key);
    }
    for(const [key,{base}] of this.edits) this.replace(key%256,key>>>16,(key>>>8)&255,base);
    this.edits.clear();
    for(const [key,id] of edits) this.set(key%256,key>>>16,(key>>>8)&255,id);
  }
}
