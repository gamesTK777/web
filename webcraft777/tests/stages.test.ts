import test from 'node:test'
import assert from 'node:assert/strict'
import { SEA_LEVEL, SIZE, World } from '../src/world.ts'
import { TERRAIN_PRESETS, validSoloTerrainPreset, validTerrainPreset } from '../src/stages.ts'

test('ステージの選択値は案内と一致する',()=>{
  assert.deepEqual(TERRAIN_PRESETS.map(stage=>stage.id),['classic','flat','lake','school','frontier','park','crossing'])
  assert.deepEqual(TERRAIN_PRESETS.map(stage=>stage.id).filter(validSoloTerrainPreset),['classic','flat','lake','frontier'])
  for(const {id,thumbnail} of TERRAIN_PRESETS){
    assert(validTerrainPreset(id))
    assert.match(thumbnail,/\.webp$/)
  }
  assert(!validTerrainPreset('unknown'))
  assert(!validTerrainPreset(undefined))
})

test('平地に木や水は生成せず、クリエイティブ用の開けた地面から始まる',()=>{
  const world=new World('stage-test',false,2,'flat')
  const pose=world.spawn()
  assert.equal(world.stage,'flat')
  assert.equal(world.landmarks.length,0)
  assert(world.highest.every(y=>y===32))
  assert.equal(world.get(pose.x|0,pose.y-1|0,pose.z|0),1)
  assert.equal(world.get(pose.x|0,pose.y|0,pose.z|0),0)
  assert(!world.data.includes(5))
  assert(!world.data.includes(13))
  assert.equal(world.get(40,0,49),14)
})

test('湖は泳げる深さを持ち、砂島の出発点は乾いている',async()=>{
  const seed='stage-lake-example'
  const world=new World(seed,false,2,'lake')
  const spawn=world.spawn(),x=spawn.x|0,z=spawn.z|0,y=spawn.y|0
  assert.equal(world.stage,'lake')
  assert.equal(world.landmarks.length,0)
  assert.equal(world.get(x,y-1,z),4)
  assert.equal(world.get(x,y,z),0)
  assert.equal(world.get(x,y+1,z),0)
  assert(world.highest.filter(height=>height<SEA_LEVEL).length>SIZE*SIZE*.95)
  for(let depth=0;depth<8;depth++)assert.equal(world.get(x,SEA_LEVEL-depth,z-25),13)
  let progress=0
  const restored=await World.generate(seed,part=>{assert(part>=progress);progress=part},2,'lake')
  assert.equal(progress,1)
  assert.deepEqual(restored.data,world.data)
  assert.deepEqual(restored.occupied,world.occupied)
})
