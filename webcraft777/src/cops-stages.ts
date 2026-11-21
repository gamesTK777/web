export type CopsStage = 'park' | 'crossing'
type WriteBlock = (x:number,y:number,z:number,block:number)=>void
type Rect = readonly [minX:number,minZ:number,maxX:number,maxZ:number]
type Stair = Readonly<{x:number;z:number;dx:number;dz:number;length:number;base:number;width:number}>

export const COPS_WALK_Y=33
export const COPS_BOUNDS={minX:60,maxX:196,minZ:60,maxZ:196} as const
export const COPS_SPAWNS={
  police:{x:128.5,y:COPS_WALK_Y,z:169.5,yaw:0,pitch:-.04},
  robbers:{x:128.5,y:COPS_WALK_Y,z:87.5,yaw:Math.PI,pitch:-.04},
  jail:{x:128.5,y:COPS_WALK_Y,z:184.5,yaw:0,pitch:-.04},
  rescue:{x:128.5,y:COPS_WALK_Y,z:177.5,radius:2.3},
  release:{x:128.5,y:COPS_WALK_Y,z:171.5,yaw:0,pitch:-.04},
} as const
export const COPS_POLICE_SPAWN=COPS_SPAWNS.police
export const COPS_ROBBER_SPAWN=COPS_SPAWNS.robbers
export const COPS_JAIL=COPS_SPAWNS.jail
export const COPS_RESCUE=COPS_SPAWNS.rescue
export const COPS_RELEASE=COPS_SPAWNS.release

export const PARK_SLIDE={minX:170,maxX:175,firstZ:118,length:12,topY:45} as const
const stairs:readonly Stair[]=[
  {x:177,z:130,dx:0,dz:-1,length:12,base:33,width:3},
  {x:84,z:124,dx:0,dz:-1,length:7,base:33,width:3},
  {x:99,z:107,dx:1,dz:0,length:5,base:35,width:3},
  {x:113,z:126,dx:0,dz:-1,length:9,base:33,width:3},
]

function stairCell(stair:Stair,x:number,z:number) {
  const along=(x-stair.x)*stair.dx+(z-stair.z)*stair.dz
  const across=(x-stair.x)*Math.abs(stair.dz)+(z-stair.z)*Math.abs(stair.dx)
  return along>=0&&along<stair.length&&across>=0&&across<stair.width ? stair.base+along+1 : undefined
}

export function parkStairTop(x:number,z:number):number|undefined {
  for(const stair of stairs){
    const height=stairCell(stair,x,z)
    if(height!==undefined)return height
  }
}

const floor=COPS_WALK_Y-1
const grass=1, stone=3, gravel=4, log=5, leaf=6, wood=7, basalt=8, tiles=9,
  glass=10, light=12, water=13, asphalt=14, aquaLight=25, blueTile=26

function scenery(put:WriteBlock) {
  const box=(x0:number,y0:number,z0:number,x1:number,y1:number,z1:number,id:number)=>{
    for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)put(x,y,z,id)
  }
  const ground=([x0,z0,x1,z1]:Rect,id:number)=>box(x0,floor,z0,x1,floor,z1,id)
  function tree(x:number,z:number,height=6,variant=0) {
    const top=floor+height
    box(x,floor+1,z,x,top,z,log)
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){
      const radius=Math.abs(dx)+Math.abs(dz)
      if(radius>4||radius===4&&(x+z+dx-dz+variant)%3===0)continue
      const crown=top+(radius<=1?1:0)
      box(x+dx,crown-1,z+dz,x+dx,crown+1,z+dz,leaf)
    }
  }
  function lamp(x:number,z:number,tall=4){
    put(x,floor+1,z,tiles)
    box(x,floor+2,z,x,floor+tall,z,log)
    put(x,floor+tall+1,z,light)
    put(x,floor+tall+2,z,wood)
  }
  return {box,ground,tree,lamp}
}

function stageBorder(put:WriteBlock,city:boolean) {
  const {box}=scenery(put)
  const {minX,maxX,minZ,maxZ}=COPS_BOUNDS,lastX=maxX-1,lastZ=maxZ-1
  const lower=city?stone:basalt, upper=city?tiles:leaf
  box(minX,floor+1,minZ,lastX,floor+3,minZ,lower)
  box(minX,floor+1,lastZ,lastX,floor+3,lastZ,lower)
  box(minX,floor+1,minZ,minX,floor+3,lastZ,lower)
  box(lastX,floor+1,minZ,lastX,floor+3,lastZ,lower)
  box(minX,floor+4,minZ,lastX,floor+8,minZ,upper)
  box(minX,floor+4,lastZ,lastX,floor+8,lastZ,upper)
  box(minX,floor+4,minZ,minX,floor+8,lastZ,upper)
  box(lastX,floor+4,minZ,lastX,floor+8,lastZ,upper)
  for(let p=66;p<194;p+=12){
    for(const [x,z] of [[p,minZ],[p,lastZ],[minX,p],[lastX,p]]){
      box(x,floor+4,z,x,floor+8,z,city?blueTile:log)
      put(x,floor+8,z,light)
    }
  }
}

function buildJail(put:WriteBlock,city:boolean) {
  const {box,ground}=scenery(put)
  const brick=city?tiles:blueTile
  ground([118,178,138,191],tiles)
  box(118,33,178,138,37,178,brick)
  box(118,33,191,138,37,191,brick)
  box(118,33,178,118,37,191,brick)
  box(138,33,178,138,37,191,brick)
  box(117,38,177,139,38,192,city?basalt:wood)
  for(const x of [120,123,133,136])box(x,34,178,x+1,36,178,glass)
  for(const z of [181,185,188])for(const x of [118,138])box(x,34,z,x,36,z+1,glass)
  box(126,33,178,130,36,178,0)
  box(126,33,191,130,36,191,0)
  for(const x of [121,126,130,135])put(x,37,184,light)
  put(128,37,178,aquaLight)
  for(let z=175;z<=177;z++)for(let x=125;x<=131;x++){
    if(Math.hypot(x+.5-COPS_SPAWNS.rescue.x,z+.5-COPS_SPAWNS.rescue.z)>2.4)continue
    put(x,floor,z,(x+z)%3===0?aquaLight:blueTile)
  }
}

function park(put:WriteBlock) {
  const {box,ground,tree,lamp}=scenery(put)
  // Large grass lawns are separated by a loop and two wide promenades.
  ground([68,72,187,76],gravel)
  ground([68,169,116,173],gravel)
  ground([140,169,187,173],gravel)
  ground([68,76,72,168],gravel)
  ground([183,76,187,168],gravel)
  ground([123,75,133,174],gravel)
  ground([69,130,186,134],gravel)
  ground([68,149,186,152],gravel)
  ground([92,76,96,92],gravel)
  ground([158,107,187,111],gravel)
  ground([93,78,161,81],gravel)
  ground([114,84,141,92],gravel)
  ground([119,164,137,176],gravel)
  for(let p=77;p<=176;p+=14){
    lamp(121,p);lamp(135,p)
    if(p<164){lamp(p,128);lamp(p,153)}
  }
  for(const [x,z] of [[77,80],[112,76],[144,77],[77,97],[74,106],[75,143],[80,181],[104,181],
    [113,159],[144,157],[154,182],[168,182],[179,155],[189,118],[151,105],[149,98],[100,93]])tree(x,z,5+(x+z)%4)

  // An irregular pond, dock, and reeds framing the northeast corner.
  for(let z=83;z<=108;z++)for(let x=150;x<=180;x++){
    const d=Math.hypot((x-165)/15.5,(z-95)/11.8)
    if(d<.94)box(x,floor-2,z,x,floor,z,water)
    else if(d<1.13)put(x,floor,z,gravel)
  }
  ground([149,94,160,96],wood)
  for(const x of [151,155,159])for(const z of [94,96])put(x,33,z,log)
  for(const [x,z] of [[151,84],[176,83],[181,96],[173,108],[157,106]])tree(x,z,6)

  // Fountain with four passable approaches.
  ground([121,111,135,123],tiles)
  ground([125,115,131,119],water)
  box(124,33,114,132,33,114,blueTile)
  box(124,33,120,132,33,120,blueTile)
  box(124,33,115,124,33,119,blueTile)
  box(132,33,115,132,33,119,blueTile)
  box(128,33,117,128,35,117,tiles)
  put(128,36,117,aquaLight)

  // Ride clearances are shared with park-rides-config.mjs. The decorative
  // squares are floor-only so moving seats have clearance above them.
  for(const [cx,cz,id] of [[106,141,blueTile],[146,141,tiles]]){
    ground([cx-7,cz-7,cx+7,cz+7],grass)
    ground([cx-5,cz-5,cx+5,cz+5],id)
    ground([cx-4,cz-4,cx+4,cz+4],gravel)
  }

  // Slide and its separate walking staircase. Each ramp joins the next
  // ramp one block lower, using the standard interactive downhill blocks.
  const s=PARK_SLIDE
  ground([166,114,183,135],tiles)
  for(const x of [s.minX,s.maxX-1,178,180])box(x,33,114,x,s.topY-2,114,log)
  box(168,s.topY-1,113,180,s.topY-1,117,wood)
  box(175,s.topY-1,118,179,s.topY-1,119,wood)
  box(168,s.topY,113,180,s.topY,113,blueTile)
  box(168,s.topY,114,168,s.topY,117,blueTile)
  for(let n=0;n<s.length;n++){
    const z=s.firstZ+n,y=s.topY-n-1
    box(s.minX,y,z,s.maxX-1,y,z,32)
    box(s.minX-1,y,z,s.minX-1,y+1,z,blueTile)
    box(s.maxX,y,z,s.maxX,y+1,z,blueTile)
    if(n%3===0){
      box(s.minX-1,33,z,s.minX-1,y-1,z,log)
      box(s.maxX,33,z,s.maxX,y-1,z,log)
    }
  }
  ground([168,130,176,134],gravel)

  // Three tall wooden decks, balancers and two bridges make an athletic
  // loop onto ledges overlooking the paths, with cover underneath.
  ground([78,100,119,127],gravel)
  const decks=[
    {box:[80,103,91,117] as Rect,top:39},
    {box:[102,105,108,114] as Rect,top:39},
    {box:[109,109,118,117] as Rect,top:41},
  ]
  for(const {box:[x0,z0,x1,z1],top} of decks){
    for(const [x,z] of [[x0,z0],[x1,z0],[x0,z1],[x1,z1]]){
      box(x,33,z,x,top+2,z,log);put(x,top+3,z,light)
    }
    box(x0,top,z0,x1,top,z1,wood)
    box(x0,top+1,z0,x1,top+1,z0,blueTile)
    for(let y=top+2;y<=top+3;y++)for(let x=x0+1;x<x1;x+=3)put(x,y,z0,log)
  }
  box(91,39,108,102,39,111,wood)
  box(91,40,108,102,40,108,blueTile)
  box(92,39,112,96,39,113,wood)
  box(107,39,109,110,39,113,wood)
  box(109,40,109,109,40,112,stone)
  box(110,40,113,110,40,116,stone)
  box(111,41,113,113,41,116,wood)
  box(96,34,106,98,34,109,wood)
  box(96,33,106,98,33,109,wood)
  for(const stair of stairs){
    for(let i=0;i<stair.length;i++)for(let width=0;width<stair.width;width++){
      const x=stair.x+stair.dx*i+Math.abs(stair.dz)*width
      const z=stair.z+stair.dz*i+Math.abs(stair.dx)*width
      const y=stair.base+i
      box(x,33,z,x,y,z,width===0?blueTile:wood)
      box(x,y+1,z,x,y+2,z,0)
    }
  }
  for(const [x,z] of [[80,124],[92,123],[97,121],[101,123],[106,123]])box(x,33,z,x+1,34,z+1,log)

  // Hedges make several independent hiding routes rather than dead ends.
  const hedges:Rect[]=[[75,156,87,156],[91,155,106,155],[78,162,78,167],[84,161,96,161],[100,160,110,160],
    [86,166,103,166],[106,165,106,174],[113,156,113,164],[144,158,154,158],[158,158,173,158],
    [145,163,145,173],[151,163,166,163],[157,167,157,176],[165,169,176,169],[175,157,175,165]]
  for(const [x0,z0,x1,z1] of hedges)box(x0,33,z0,x1,34,z1,leaf)
  for(const [x,z] of [[76,118],[106,88],[146,120],[78,173],[175,176]]) {
    box(x,33,z,x+2,33,z,wood)
    put(x,34,z,blueTile);put(x+2,34,z,blueTile)
  }
  for(const [x,z] of [[82,82],[110,88],[149,115],[181,141],[81,151],[175,148]]) {
    ground([x-2,z-1,x+2,z+1],tiles)
    for(let i=-1;i<=1;i++)put(x+i,33,z,i===0?light:leaf)
  }
}

const glyphs={
  シ:['11000','00101','11001','00110','11100'],
  ブ:['00101','11000','00101','00010','01100'],
  ヤ:['00100','11111','00101','00110','00010'],
  ト:['01000','01000','01110','01001','01000'],
  キ:['00100','11111','00100','11111','00010'],
  コ:['11111','00001','00001','00001','11111'],
  ラ:['01110','00000','11111','00010','01100'],
  ボ:['01001','11110','01001','11010','01100'],
} satisfies Record<string,readonly string[]>
type Glyph=keyof typeof glyphs

function crossing(put:WriteBlock) {
  const {box,ground,tree,lamp}=scenery(put)
  ground([61,61,194,194],basalt)
  for(const side of [[64,64,109,112],[147,64,191,112],[64,145,110,191],[147,145,191,191]] as Rect[])
    ground(side,stone)
  // Four vehicle approaches set back parallel white bars from the diagonal
  // pedestrian crossings in the recognisable scramble intersection.
  ground([61,115,194,142],asphalt)
  ground([115,61,142,194],asphalt)
  for(const [x0,z0,x1,z1] of [[61,112,194,114],[61,143,194,145],[112,61,114,194],[143,61,145,194]] as Rect[])
    ground([x0,z0,x1,z1],tiles)
  for(let z=115;z<=142;z++)for(let x=115;x<=142;x++){
    const a=x-z,b=x+z-256
    const diagonalA=Math.abs(a)<=4&&Math.abs(b)<=27&&((Math.abs(b)+1)%4<2)
    const diagonalB=Math.abs(b)<=4&&Math.abs(a)<=27&&((Math.abs(a)+1)%4<2)
    if(diagonalA||diagonalB)put(x,floor,z,tiles)
  }
  for(let p=117;p<=139;p+=4){
    ground([p,110,p+1,114],tiles);ground([p,143,p+1,147],tiles)
    ground([110,p,114,p+1],tiles);ground([143,p,147,p+1],tiles)
  }
  for(let p=64;p<=192;p+=6){
    if(Math.abs(p-128)>22){
      ground([127,p,127,p+2],gravel);ground([p,127,p+2,127],gravel)
    }
  }

  const shops=[
    {r:[67,67,89,90],h:15,id:tiles},
    {r:[93,67,108,81],h:21,id:stone},
    {r:[75,94,108,108],h:15,id:blueTile},
    {r:[147,67,167,87],h:23,id:blueTile},
    {r:[172,69,189,92],h:12,id:tiles},
    {r:[149,93,182,108],h:17,id:basalt},
    {r:[67,149,89,168],h:13,id:blueTile},
    {r:[93,150,109,167],h:19,id:basalt},
    {r:[69,174,91,190],h:16,id:tiles},
    {r:[148,148,170,163],h:21,id:tiles},
    {r:[176,148,189,169],h:17,id:stone},
    {r:[150,172,173,188],h:11,id:blueTile},
    {r:[179,175,189,188],h:15,id:tiles},
  ] as const
  function blockBuilding([x0,z0,x1,z1]:Rect,height:number,id:number) {
    const y1=floor+height
    ground([x0-1,z0-1,x1+1,z1+1],tiles)
    for(const x of [x0,x1])box(x,33,z0,x,y1,z1,id)
    for(const z of [z0,z1])box(x0,33,z,x1,y1,z,id)
    box(x0,y1,z0,x1,y1,z1,id)
    // Floor slabs partition upper windows, with ground-level shops open to
    // both sidewalks. Back alleys can always be used as a second exit.
    for(let y=38;y<y1;y+=5){
      box(x0+1,y,z0+1,x1-1,y,z1-1,tiles)
      for(const z of [z0,z1])for(let x=x0+2;x+1<x1;x+=4)box(x,y-3,z,x+1,y-1,z,glass)
      for(const x of [x0,x1])for(let z=z0+2;z+1<z1;z+=4)box(x,y-3,z,x,y-1,z+1,glass)
    }
    const midX=Math.floor((x0+x1)/2),midZ=Math.floor((z0+z1)/2)
    for(const z of [z0,z1]){
      box(midX-2,33,z,midX+1,36,z,0)
      box(midX-3,37,z,midX+2,37,z,light)
    }
    for(const x of [x0,x1])box(x,33,midZ-1,x,35,midZ+1,0)
    for(const x of [x0+2,x1-2])for(const z of [z0+2,z1-2]){
      put(x,37,z,light)
      box(x,33,z,x+1,33,z+1,wood)
    }
    box(x0+1,y1+1,z0+1,x1-1,y1+1,z1-1,basalt)
    put(midX,y1+2,midZ,aquaLight)
  }
  for(const {r,h,id} of shops)blockBuilding(r,h,id)

  function billboard(x:number,z:number,y:number,value:readonly Glyph[],screen:number,ink:number) {
    const width=value.length*6+1
    box(x,y,z,x+width,y+7,z,screen)
    for(const [i,char] of value.entries()){
      for(const [row,line] of glyphs[char].entries()){
        for(let column=0;column<line.length;column++){
          if(line[column]==='1')put(x+1+6*i+column,y+6-row,z,ink)
        }
      }
    }
    for(let p=1;p<width;p+=3)put(x+p,y,z,light)
  }
  billboard(152,109,42,['シ','ブ','ヤ'],basalt,aquaLight)
  billboard(81,109,39,['コ','ラ','ボ'],blueTile,gravel)
  billboard(150,147,41,['ト','キ'],basalt,aquaLight)
  billboard(94,149,41,['ヤ','コ'],blueTile,tiles)

  for(const [x,z] of [[70,113],[92,112],[106,111],[149,112],[168,111],[186,113],[72,145],[91,146],
    [106,145],[149,145],[170,145],[186,145],[113,71],[145,71],[113,88],[145,88],[113,104],[145,104],[113,163],[145,164]]){
    lamp(x,z,5)
  }
  for(const [x,z] of [[113,112],[143,112],[113,143],[143,143]]){
    box(x,33,z,x,38,z,basalt)
    put(x,39,z,light)
    put(x,40,z,aquaLight)
    put(x,41,z,blueTile)
  }

  // Public plaza, subway canopy, benches, vending stands and planters.
  ground([93,172,111,191],tiles)
  for(const [x,z] of [[97,175],[108,178],[98,186],[144,151],[165,169],[171,188],[77,171]]){
    ground([x-2,z-2,x+2,z+2],blueTile)
    ground([x-1,z-1,x+1,z+1],grass)
    tree(x,z,5)
  }
  box(101,37,175,108,37,180,glass)
  for(const [x,z] of [[101,175],[108,175],[101,180],[108,180]])box(x,33,z,x,36,z,tiles)
  for(const [x,z] of [[75,147],[86,147],[149,146],[170,146],[108,95],[150,95],[96,91],[169,91]]){
    put(x,33,z,blueTile)
    box(x,34,z,x,35,z,aquaLight)
    put(x,36,z,glass)
  }
  for(const [x,z] of [[102,176],[105,184],[152,167],[161,167],[174,137],[80,138],[97,87]])box(x,33,z,x+2,33,z,wood)
}

export function buildCopsStage(stage:CopsStage,put:WriteBlock) {
  if(stage==='park')park(put)
  else crossing(put)
  stageBorder(put,stage==='crossing')
  buildJail(put,stage==='crossing')
}
