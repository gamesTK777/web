export const FRONTIER_BOUNDS={minX:92,maxX:164,minZ:99,maxZ:175} as const
export const FRONTIER_FLOOR=32
export const frontierSpawn={x:128.5,y:33.001,z:147.5,yaw:-.04,pitch:-.045} as const
export const FRONTIER_LOTS=[
  {minX:102,maxX:116,minZ:147,maxZ:158},
  {minX:142,maxX:157,minZ:147,maxZ:160},
  {minX:103,maxX:116,minZ:162,maxZ:173},
  {minX:142,maxX:156,minZ:163,maxZ:174},
] as const
export const FRONTIER_SPAWNS={
  sheriff:{x:136.5,y:33,z:135.5},
  residents:[{x:119.5,y:33,z:130.5},{x:118.5,y:33,z:147.5},{x:140.5,y:33,z:118.5}],
  horses:[{x:150.5,y:33,z:139.5},{x:148.5,y:33,z:138.5}],
  raidSpawns:[{x:118.5,y:33,z:105.5},{x:129.5,y:33,z:105.5},{x:139.5,y:33,z:105.5},{x:127.5,y:33,z:172.5}],
} as const
export const FRONTIER_RESOURCES={
  workbench:{x:119,y:33,z:141},
  mine:{x:167,y:34,z:135},
  lake:{x:183,z:89},
} as const

export type FrontierStructureCell={x:number;y:number;z:number;id:number}
type WriteBlock=(x:number,y:number,z:number,block:number)=>void
type FrontierTerrain={
  size:number;seaLevel:number;seed:number;heights:Uint8Array
  write:WriteBlock
  noise:(x:number,z:number,scale:number,seed:number)=>number
  scatter:(x:number,z:number,seed:number)=>number
  tree:(x:number,z:number,broad?:boolean)=>void
}

const stone=3, sand=4, timber=5, boards=7, cobble=8, brick=9, glass=10, coal=11, lamp=12, tile=26
const ground=FRONTIER_FLOOR, feet=ground+1
const mix=(a:number,b:number,t:number)=>a+(b-a)*t
const clamp=(n:number)=>Math.min(1,Math.max(0,n))
function fade(value:number,inner:number,outer:number) {
  const t=clamp((outer-value)/(outer-inner))
  return t*t*(3-2*t)
}

// The crags use several shelf radii, so the silhouettes read as mesas from town.
const mesas=[
  {x:62,z:53,rx:36,rz:29,rise:38},
  {x:96,z:63,rx:25,rz:24,rise:24},
  {x:131,z:36,rx:28,rz:25,rise:34},
  {x:222,z:73,rx:29,rz:33,rise:34},
  {x:204,z:167,rx:32,rz:28,rise:27},
  {x:51,z:184,rx:32,rz:43,rise:25},
  {x:169,z:218,rx:32,rz:24,rise:31},
] as const

export function* buildFrontierTerrain(cfg:FrontierTerrain):Generator<number> {
  const {size,seaLevel,seed,heights,write,noise,scatter,tree}=cfg
  const {minX,maxX,minZ,maxZ}=FRONTIER_BOUNDS
  for(let z=0;z<size;z++){
    for(let x=0;x<size;x++){
      const broad=noise(x,z,42,seed), grain=noise(x,z,12,seed^173)
      let summit=0
      for(const mesa of mesas){
        const r=Math.hypot((x-mesa.x)/mesa.rx,(z-mesa.z)/mesa.rz)+(grain-.5)*.21
        if(r>=1.28)continue
        const shelves=.56*fade(r,.54,1.23)+.28*fade(r,.42,.60)+.16*fade(r,.22,.32)
        summit=Math.max(summit,shelves*mesa.rise)
      }
      const rim=Math.hypot((x-183)/35,(z-89)/33)+(grain-.5)*.15
      const basin=fade(rim,.62,1.30)
      const rangeToTown=Math.hypot(Math.max(minX-x,0,x-maxX+1),Math.max(minZ-z,0,z-maxZ+1))
      const town=fade(rangeToTown,2,18)
      const foothills=30+8*broad+2.7*grain+summit
      const height=Math.floor(mix(mix(foothills,20+3*grain,basin),ground+.1,town))
      const forestry=noise(x,z,32,seed^772)
      const bank=height<=seaLevel+1
      const treeBelt=height<43&&town<.98&&!bank&&(forestry>.57||basin>.1&&forestry>.40)
      const desertSurface=treeBelt?1:bank||grain>.33?sand:2
      heights[x+z*size]=height
      write(x,0,z,14)
      for(let y=1;y<=height;y++){
        const bands=summit>11&&y>=height-17&&y>36&&((y+2)%9<2||y%13===2)
        const block=y===height?desertSurface:y>=height-2?(bank?sand:2):bands?((y+2)%9<2?sand:2):stone
        write(x,y,z,block)
      }
      for(let y=height+1;y<=seaLevel;y++)write(x,y,z,13)
    }
    if(z%4===3)yield .67*(z+1)/size
  }
  for(let z=5;z<size-4;z+=5){
    for(let x=5;x<size-4;x+=5){
      const xx=x+Math.floor(3*scatter(x,z,seed^91)), zz=z+Math.floor(3*scatter(x,z,seed^66))
      if(xx>=minX-3&&xx<maxX+3&&zz>=minZ-3&&zz<maxZ+3)continue
      if(scatter(x,z,seed^65)>.38)continue
      tree(xx,zz)
    }
    if(z%20===5)yield .67+.055*z/size
  }
  // A nearby grove is always present even if the seed puts forest farther away.
  for(const [x,z] of [[85,136],[83,142],[86,150],[84,159],[88,155],[91,180],[98,183],[161,180],[166,174],[169,178]]){
    const y=heights[x+z*size]
    write(x,y,z,1)
    tree(x,z,true)
  }
  // Exposed seams and deeper pockets supply the town's building and crafting loop.
  for(let z=126;z<=145;z++){
    for(let x=167;x<=178;x++){
      const prominence=fade(Math.hypot((x-172)/1.1,z-135),3,9)
      if(prominence<=.12)continue
      const h=heights[x+z*size], top=Math.max(h,33+Math.floor(4*prominence))
      for(let y=Math.max(2,h-5);y<=top;y++){
        const exposed=x===167&&(z===134||z===135||z===137)&&y>=33&&y<=34
        const vein=scatter(x+y*17,z-y*9,seed^515)>.79&&y<top
        write(x,y,z,exposed||vein?coal:stone)
      }
    }
  }
  for(let group=0;group<390;group++){
    const x=3+Math.floor(scatter(group,15,seed)*(size-6)),z=3+Math.floor(scatter(group,21,seed)*(size-6))
    const h=heights[x+z*size]
    const y=3+Math.floor(scatter(group,83,seed)*Math.max(1,h-7))
    for(const [dx,dy,dz] of [[0,0,0],[1,0,0],[0,1,0],[0,0,1],[-1,-1,0]])
      write(x+dx,y+dy,z+dz,coal)
  }
  yield .78
}

type Building={x0:number;x1:number;z0:number;z1:number;facing:'east'|'west';wall:number;trim:number;height:number;porch:boolean}

export function buildFrontierTown(write:WriteBlock):FrontierStructureCell[] {
  const structure=new Map<number,FrontierStructureCell>()
  const record:WriteBlock=(x,y,z,id)=>{
    write(x,y,z,id)
    const key=x+z*256+y*65536
    if(id)structure.set(key,{x,y,z,id})
    else structure.delete(key)
  }
  const fill=(put:WriteBlock,x0:number,y0:number,z0:number,x1:number,y1:number,z1:number,id:number)=>{
    for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)put(x,y,z,id)
  }
  const box=(x0:number,y0:number,z0:number,x1:number,y1:number,z1:number,id:number)=>
    fill(record,x0,y0,z0,x1,y1,z1,id)

  // Packed Main Street, western boardwalks, and a trail towards the quarry.
  fill(write,122,ground,99,134,ground,174,2)
  fill(write,124,ground,99,132,ground,174,sand)
  fill(write,117,ground,104,120,ground,145,boards)
  fill(write,135,ground,109,137,ground,145,boards)
  fill(write,133,ground,143,164,ground,145,sand)
  for(let z=103;z<=172;z+=5)write(128,ground,z,2)
  for(const {minX,maxX,minZ,maxZ} of FRONTIER_LOTS){
    fill(write,minX,ground,minZ,maxX-1,ground,maxZ-1,2)
    fill(write,minX+1,ground,minZ+1,maxX-2,ground,maxZ-2,1)
    for(const [x,z] of [[minX,minZ],[maxX-1,minZ],[minX,maxZ-1],[maxX-1,maxZ-1]])
      write(x,ground,z,brick)
  }

  const building=({x0,x1,z0,z1,facing,wall,trim,height,porch}:Building)=>{
    const front=facing==='east'?x1:x0, back=facing==='east'?x0:x1
    const out=facing==='east'?1:-1
    const center=Math.floor((z0+z1)/2)
    box(x0,ground,z0,x1,ground,z1,boards)
    for(const x of [x0,x1])box(x,feet,z0,x,feet+height-1,z1,wall)
    for(const z of [z0,z1]){
      box(x0,feet,z,x1,feet+height-1,z,wall)
      for(const x of [x0,x1])box(x,feet,z,x,feet+height,z,timber)
      for(let x=x0+3;x<=x1-3;x+=5)box(x,feet+2,z,x+1,feet+3,z,glass)
    }
    for(const z of [z0+2,z1-3])box(front,feet+2,z,front,feet+3,z+1,glass)
    box(front,feet,center-1,front,feet+2,center+1,0)
    box(back,feet,center-1,back,feet+2,center,0)
    box(x0-1,feet+height,z0-1,x1+1,feet+height,z1+1,timber)
    box(x0,feet+height+1,z0+2,x1,feet+height+1,z1-2,trim)
    box(front,feet+height+1,z0,front,feet+height+1,z1,wall)
    box(front,feet+height+2,z0+2,front,feet+height+2,z1-2,wall)
    box(front,feet+height+3,center-2,front,feet+height+3,center+2,timber)
    const edge=front+out
    box(edge,feet+height,z0+2,edge,feet+height+1,z1-2,trim)
    if(porch){
      box(Math.min(front,front+out*3),ground,z0-1,Math.max(front,front+out*3),ground,z1+1,boards)
      box(Math.min(edge,front+out*3),feet+3,z0-1,Math.max(edge,front+out*3),feet+3,z1+1,boards)
      for(const z of [z0,z1])box(front+out*3,feet,z,front+out*3,feet+2,z,timber)
    }
    record(edge,feet+2,center-2,lamp)
    record(edge,feet+2,center+2,lamp)
    record(front-out,feet+height-1,center,lamp)
    return {x:edge,z:center,signY:feet+height+1}
  }
  const workshop=building({x0:104,x1:117,z0:109,z1:122,facing:'east',wall:boards,trim:2,height:4,porch:true})
  const saloon=building({x0:100,x1:117,z0:126,z1:142,facing:'east',wall:boards,trim:sand,height:6,porch:true})
  const sheriff=building({x0:137,x1:153,z0:111,z1:126,facing:'west',wall:brick,trim:tile,height:5,porch:false})
  building({x0:140,x1:157,z0:130,z1:143,facing:'west',wall:boards,trim:cobble,height:5,porch:true})

  // Simple voxel emblems keep the three main storefronts recognizable up close.
  for(const [x,y,z,id] of [
    [workshop.x,workshop.signY,workshop.z,lamp],
    [saloon.x,saloon.signY,saloon.z,lamp],
    [saloon.x,saloon.signY,saloon.z-2,boards],
    [saloon.x,saloon.signY,saloon.z+2,boards],
    [sheriff.x,sheriff.signY,sheriff.z,lamp],
    [sheriff.x,sheriff.signY,sheriff.z-1,lamp],
    [sheriff.x,sheriff.signY,sheriff.z+1,lamp],
    [sheriff.x,sheriff.signY-1,sheriff.z,lamp],
    [sheriff.x,sheriff.signY+1,sheriff.z,lamp],
  ])record(x,y,z,id)

  // Interior details leave clear aisles for horses and townspeople.
  box(103,feet,129,104,feet,138,timber)
  box(102,feet+1,128,104,feet+1,139,boards)
  for(const [x,z] of [[108,130],[111,137],[114,130]]){
    record(x,feet,z,timber)
    box(x-1,feet+1,z,x+1,feet+1,z,boards)
    record(x,feet,z+2,boards)
  }
  box(150,feet,114,151,feet,121,timber)
  box(149,feet+1,114,151,feet+1,121,boards)
  for(const x of [143,151])box(x,feet,131,x+2,feet,132,timber)
  for(const x of [140,141])box(x,feet,135,x,feet+2,139,0)
  box(146,feet,143,153,feet+2,143,0)
  record(FRONTIER_RESOURCES.workbench.x,FRONTIER_RESOURCES.workbench.y,FRONTIER_RESOURCES.workbench.z,21)
  record(114,feet,118,21)

  // Water tower, board rails, and tiny lantern posts frame the public street.
  for(const x of [103,108])for(const z of [101,106])box(x,feet,z,x,feet+7,z,timber)
  box(102,feet+7,100,109,feet+7,107,boards)
  box(103,feet+8,101,108,feet+11,106,boards)
  box(102,feet+10,100,109,feet+10,107,timber)
  box(104,feet+12,102,107,feet+12,105,cobble)
  for(const x of [121,135])for(const z of [111,123,137,151,165]){
    box(x,feet,z,x,feet+1,z,timber)
    record(x,feet+2,z,lamp)
  }

  return [...structure.values()].sort((a,b)=>a.y-b.y)
}
