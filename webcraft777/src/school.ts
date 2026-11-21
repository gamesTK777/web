export const SCHOOL_BOUNDS = {minX:98,maxX:158,minZ:106,maxZ:158} as const
export const SCHOOL_LEVELS = [33,40] as const
export const schoolSpawn = {x:128.5,y:33.001,z:149.5,yaw:0,pitch:-.04} as const

const ground=SCHOOL_LEVELS[0], upper=SCHOOL_LEVELS[1]
const roof=upper+6
// Existing voxel materials keep the school compatible with the terrain renderer.
const wood=7, timber=5, stone=9, sand=4, glass=10, lamp=12, teal=26
type WriteBlock = (x:number,y:number,z:number,block:number)=>void
const stairs = [{x:101,baseZ:146,direction:-1},{x:151,baseZ:127,direction:1}] as const
const stairWidth=3

export function schoolStairTop(x:number,z:number):number|undefined {
  for(const {x:left,baseZ,direction} of stairs){
    const step=(z-baseZ)*direction
    if(x>=left&&x<left+stairWidth&&step>=0&&step<upper-ground)return ground+step+1
  }
}

export function buildSchool(write:WriteBlock) {
  const {minX,maxX,minZ,maxZ}=SCHOOL_BOUNDS
  const box=(x0:number,y0:number,z0:number,x1:number,y1:number,z1:number,id:number)=>{
    for(let z=z0;z<=z1;z++)for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)write(x,y,z,id)
  }
  const mark=(x:number,z:number)=>write(x,ground-1,z,sand)

  box(minX,ground-1,minZ,maxX-1,ground-1,maxZ-1,wood)
  box(minX,upper-1,minZ,maxX-1,upper-1,maxZ-1,wood)
  box(minX,roof,minZ,maxX-1,roof,maxZ-1,stone)

  // Exterior windows admit daylight without opening the enclosed arena.
  for(const y of [ground,upper]){
    for(let x=minX;x<maxX;x++){
      const window=(x-minX)%6>=2&&(x-minX)%6<=4&&x<maxX-1
      for(const z of [minZ,maxZ-1]){
        box(x,y,z,x,y+5,z,stone)
        if(window)box(x,y+2,z,x,y+4,z,glass)
      }
    }
    for(let z=minZ+1;z<maxZ-1;z++){
      const window=(z-minZ)%6>=2&&(z-minZ)%6<=4
      for(const x of [minX,maxX-1]){
        box(x,y,z,x,y+5,z,stone)
        if(window)box(x,y+2,z,x,y+4,z,glass)
      }
    }
  }
  // Opaque roof ribs frame narrower solid-glass skylights above the corridors.
  for(const z of [112,123,137,149])
    box(126,roof,z,129,roof,z+2,glass)
  for(const x of [109,119,136,148])
    box(x,roof,135,x+2,roof,138,glass)

  const partition=(x0:number,z0:number,x1:number,z1:number,feet:number,doors:readonly number[])=>{
    const alongX=z0===z1
    for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){
      box(x,feet,z,x,feet+5,z,stone)
      write(x,feet,z,wood)
      if(doors.some(start=>(alongX?x:z)>=start&&(alongX?x:z)<start+3)){
        box(x,feet,z,x,feet+2,z,0)
        write(x,feet+3,z,teal)
      }
    }
  }
  for(const feet of SCHOOL_LEVELS){
    for(const x of [124,131]){
      partition(x,107,x,132,feet,[112,123])
      partition(x,141,x,156,feet,[146,152])
    }
    partition(99,132,123,132,feet,[105,118])
    partition(132,132,156,132,feet,[134,148,151])
    partition(99,141,123,141,feet,[101,105,118])
    partition(132,141,156,141,feet,[134,148])
    for(const x of [111,144])partition(x,142,x,156,feet,[146,152])

    box(125,feet-1,107,130,feet-1,156,stone)
    box(99,feet-1,133,156,feet-1,140,stone)
    for(let z=108;z<=156;z+=4){
      write(125,feet-1,z,teal);write(130,feet-1,z,teal)
    }
    for(let x=100;x<=156;x+=4){
      write(x,feet-1,133,teal);write(x,feet-1,140,teal)
      if(x%8===4)write(x,feet+5,136,lamp)
    }
    for(let z=110;z<=154;z+=6)write(128,feet+5,z,lamp)
  }
  partition(111,107,111,131,ground,[113,126])

  // Gym floor markings and an upper gallery share the same tall space.
  box(134,ground-1,109,154,ground-1,127,wood)
  for(let x=134;x<=154;x++){mark(x,110);mark(x,125)}
  for(let z=110;z<=125;z++){mark(134,z);mark(144,z);mark(154,z)}
  box(146,upper-1,110,155,upper-1,124,0)
  box(145,upper,110,145,upper+1,124,glass)
  box(156,upper,110,156,upper+1,124,glass)
  box(146,upper,109,155,upper+1,109,glass)
  box(146,upper,125,155,upper+1,125,glass)
  for(const x of [136,151]){
    box(x,ground+2,107,x+1,ground+3,107,teal)
    box(x,ground+2,108,x+1,ground+2,108,wood)
  }
  for(const z of [113,120])box(155,ground,z,156,ground,z+4,wood)
  box(134,ground,127,137,ground+1,129,timber)
  box(139,ground,128,141,ground+2,130,wood)
  for(const x of [136,144,152])write(x,upper+5,117,lamp)

  const classroom=(x:number,z:number,feet:number)=>{
    // Chalk board, teacher's podium, chair rows and desks.
    box(x+1,feet+1,z,x+7,feet+3,z,teal)
    box(x+3,feet,z+2,x+5,feet,z+3,timber)
    for(const dx of [1,5])for(const dz of [6,10]){
      box(x+dx,feet+1,z+dz,x+dx+1,feet+1,z+dz,wood)
      write(x+dx,feet,z+dz,timber)
      write(x+dx+1,feet,z+dz+2,wood)
    }
    write(x+4,feet+5,z+6,lamp)
  }
  classroom(101,108,ground);classroom(113,108,ground)
  classroom(113,142,ground);classroom(133,142,ground)
  classroom(113,142,upper);classroom(133,142,upper)

  const shelves=(x:number,z:number,feet:number,count:number)=>{
    for(let k=0;k<count;k++){
      box(x,feet,z+k,x,feet+2,z+k,k%3===1?wood:timber)
      write(x,feet+3,z+k,wood)
    }
  }
  // Tall shelves break sightlines. Open aisles on both sides allow chases to loop.
  for(const x of [102,108,114,120]){
    shelves(x,112,upper,5);shelves(x,121,upper,5)
    write(x+1,upper+5,119,lamp)
  }
  for(const x of [106,118])box(x,upper,128,x+2,upper,129,wood)
  for(const feet of SCHOOL_LEVELS){
    shelves(147,145,feet,5);shelves(152,147,feet,6)
    box(148,feet,143,150,feet+1,143,timber)
    box(105,feet,149,108,feet+1,151,timber)
    box(106,feet,153,109,feet+2,154,wood)
    write(108,feet+5,147,lamp);write(150,feet+5,150,lamp)
  }
  // A three-sided storage bench has a crawl opening along the front.
  box(147,ground+1,151,150,ground+1,153,wood)
  box(147,ground,153,150,ground,153,timber)
  box(147,ground,151,147,ground,152,timber)
  box(150,ground,151,150,ground,152,timber)

  // Keep both stair passages clear after constructing intersecting rooms.
  for(const {x,baseZ,direction} of stairs){
    for(let i=0;i<upper-ground;i++){
      const z=baseZ+i*direction
      box(x,ground,z,x+stairWidth-1,upper+2,z,0)
      box(x,ground,z,x+stairWidth-1,ground+i,z,i%2===0?stone:wood)
      box(x-1,ground,z,x-1,upper+1,z,stone)
      box(x+stairWidth,ground,z,x+stairWidth,upper+1,z,stone)
    }
    const low=baseZ-direction, high=baseZ+(upper-ground)*direction
    box(x,ground,low,x+stairWidth-1,ground+2,low,0)
    box(x,upper,low,x+stairWidth-1,upper+1,low,glass)
    box(x,upper,high,x+stairWidth-1,upper+2,high,0)
    write(x+1,ground+5,low,lamp)
    write(x+1,upper+5,high,lamp)
  }

  // Trees and paving outside break up the view through the sealed windows.
  box(95,ground-1,103,160,ground-1,105,stone)
  box(95,ground-1,158,160,ground-1,160,stone)
  box(95,ground-1,106,97,ground-1,157,stone)
  box(158,ground-1,106,160,ground-1,157,stone)
  for(const [x,z] of [[93,113],[93,126],[93,145],[162,112],[162,133],[162,149],[107,101],[146,101],[112,162],[145,162]]){
    box(x,ground,z,x,ground+3,z,timber)
    box(x-1,ground+2,z-1,x+1,ground+4,z+1,6)
    write(x,ground+5,z,6)
  }
}
