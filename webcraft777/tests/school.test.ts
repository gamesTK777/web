import test from 'node:test'
import assert from 'node:assert/strict'
import { World, voxelIndex } from '../src/world.ts'
import { createPlayer, stepPlayer, type Input } from '../src/physics.ts'
import { SCHOOL_BOUNDS, SCHOOL_LEVELS, schoolSpawn, schoolStairTop } from '../src/school.ts'

const world=new World('school-layout',false,2,'school')
const [ground,upper]=SCHOOL_LEVELS
const {minX,maxX,minZ,maxZ}=SCHOOL_BOUNDS
const walking:Input={forward:1,right:0,jump:false,sprint:true,down:false}

test('校舎の入口と近くの参加者の開始位置は安全で、外へ抜ける隙間がない',()=>{
  assert.deepEqual(world.spawn(),schoolSpawn)
  assert.equal(world.exportEdits().length,0)
  for(let z=147;z<=151;z++)for(let x=126;x<=130;x++){
    assert.notEqual(world.get(x,ground-1,z),0)
    for(let y=ground;y<ground+2;y++)assert.equal(world.get(x,y,z),0)
  }
  for(let z=minZ;z<maxZ;z++)for(let x=minX;x<maxX;x++){
    assert.notEqual(world.get(x,upper+6,z),0)
    if(x===minX||x===maxX-1||z===minZ||z===maxZ-1){
      for(let y=ground-1;y<=upper+6;y++)assert.notEqual(world.get(x,y,z),0)
    }
  }
  assert(world.lamps.has(voxelIndex(128,ground+5,146)))
})

test('廊下から教室に複数の入口があり、体育館と上階の本棚へも回り込める',()=>{
  const visit=(feet:number,nodes:[number,number][])=>{
    const seen=new Set<string>()
    const passable=([x,z]:[number,number])=>x>minX&&x<maxX-1&&z>minZ&&z<maxZ-1&&
      world.get(x,feet-1,z)!==0&&world.get(x,feet,z)===0&&world.get(x,feet+1,z)===0
    for(let i=0;i<nodes.length;i++){
      const point=nodes[i],key=point.join(',')
      if(seen.has(key)||!passable(point))continue
      seen.add(key)
      const [x,z]=point
      nodes.push([x+1,z],[x-1,z],[x,z+1],[x,z-1])
    }
    return seen
  }
  const main=visit(ground,[[128,149]]), upstairs=visit(upper,[[128,140]])
  for(const point of ['124,112','124,123','116,116','104,116','143,119','151,126','102,148'])
    assert(main.has(point),point)
  for(const point of ['107,119','117,119','144,117','151,134','102,139'])
    assert(upstairs.has(point),point)
  assert.equal(world.get(146,upper-1,115),0)
  assert.equal(world.get(145,upper,115),10)
  assert.equal(world.get(114,upper+2,114),5)
})

test('東西の階段をジャンプなしで上り下りできる',()=>{
  for(const [x,z,direction] of [[102.5,148.5,-1],[152.5,124.5,1]] as const){
    const player=createPlayer({x,y:ground+.001,z,yaw:direction<0?0:Math.PI,pitch:0})
    const elevations=new Set<number>()
    for(let tick=0;tick<100;tick++){
      stepPlayer(world,player,walking,1/60)
      if(player.grounded)elevations.add(Math.round(player.y))
    }
    assert.equal(player.y,upper,JSON.stringify(player))
    assert.equal(elevations.size,upper-ground+1)
    player.yaw=direction<0?Math.PI:0
    for(let tick=0;tick<120;tick++)stepPlayer(world,player,walking,1/60)
    assert.equal(player.y,ground,JSON.stringify(player))
    assert(player.grounded)
  }
  assert.equal(schoolStairTop(102,146),ground+1)
  assert.equal(schoolStairTop(152,133),upper)
})

test('物陰のベンチ下はしゃがんで隠れられる',()=>{
  const pose={x:148.5,y:ground+.001,z:150.5,yaw:Math.PI,pitch:0}
  const standing=createPlayer(pose)
  for(let tick=0;tick<60;tick++)stepPlayer(world,standing,{...walking,sprint:false},1/60)
  assert(standing.z<151)
  const hiding=createPlayer(pose)
  for(let tick=0;tick<56;tick++)stepPlayer(world,hiding,{...walking,sprint:false,down:true},1/60)
  assert(hiding.z>151.5)
  stepPlayer(world,hiding,{...walking,forward:0,sprint:false},1/60)
  assert(hiding.crouched)
})
