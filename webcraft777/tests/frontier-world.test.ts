import test from 'node:test'
import assert from 'node:assert/strict'
import {FRONTIER_BOUNDS, FRONTIER_FLOOR, FRONTIER_LOTS, FRONTIER_RESOURCES, FRONTIER_SPAWNS, frontierSpawn} from '../src/frontier-world.ts'
import {SEA_LEVEL, SIZE, World, isSolid, voxelIndex} from '../src/world.ts'
import {safeSpawn} from '../src/physics.ts'

const world=new World('frontier-test',false,2,'frontier')

test('the frontier has a large lake, layered mesas, wood and a shallow coal seam',()=>{
  const {x,z}=FRONTIER_RESOURCES.lake
  assert.equal(world.get(x,SEA_LEVEL,z),13)
  assert.equal(world.get(x,SEA_LEVEL-4,z),13)
  assert(world.data.filter(block=>block===13).length>10_000)
  assert(world.highest[62+53*SIZE]>60)
  assert(world.highest[222+73*SIZE]>57)
  assert(world.data.includes(5))
  assert(world.data.includes(6))
  const {x:oreX,y:oreY,z:oreZ}=FRONTIER_RESOURCES.mine
  assert.equal(world.get(oreX,oreY,oreZ),11)
  assert.equal(world.get(oreX-1,oreY,oreZ),0)
  assert.equal(world.get(174,18,135),3)
  assert.equal(world.get(184,0,94),14)
})

test('the frontier town is traversable at street level, with open house lots',()=>{
  assert.deepEqual(world.spawn(),frontierSpawn)
  assert.deepEqual(safeSpawn(world,frontierSpawn),frontierSpawn)
  const feet=FRONTIER_FLOOR+1
  const {minX,maxX,minZ,maxZ}=FRONTIER_BOUNDS
  const visited=new Set<number>()
  const waypoints=[[128,147]]
  for(let i=0;i<waypoints.length;i++){
    const [x,z]=waypoints[i],key=x+z*SIZE
    if(x<minX||x>=maxX||z<minZ||z>=maxZ||visited.has(key))continue
    if(!isSolid(world.get(x,feet-1,z))||world.get(x,feet,z)||world.get(x,feet+1,z))continue
    visited.add(key)
    waypoints.push([x-1,z],[x+1,z],[x,z-1],[x,z+1])
  }
  for(const anchor of [FRONTIER_SPAWNS.sheriff,...FRONTIER_SPAWNS.residents,...FRONTIER_SPAWNS.horses,...FRONTIER_SPAWNS.raidSpawns]){
    assert.equal(anchor.y,feet)
    assert(visited.has(Math.floor(anchor.x)+Math.floor(anchor.z)*SIZE),JSON.stringify(anchor))
  }
  for(const {minX,maxX,minZ,maxZ} of FRONTIER_LOTS){
    for(let x=minX;x<maxX;x++)for(let z=minZ;z<maxZ;z++){
      assert(visited.has(x+z*SIZE))
      assert.equal(world.highest[x+z*SIZE],FRONTIER_FLOOR)
    }
  }
  const bench=FRONTIER_RESOURCES.workbench
  assert.equal(world.get(bench.x,bench.y,bench.z),21)
  assert(visited.has(bench.x+1+bench.z*SIZE))
})

test('the repair list tracks original town buildings and leaves house lots to the player',()=>{
  assert(world.frontierStructures.length>2500)
  const authored=new Set<number>()
  for(const {x,y,z,id} of world.frontierStructures){
    const key=voxelIndex(x,y,z)
    assert.equal(world.data[key],id)
    assert(!authored.has(key))
    authored.add(key)
    assert(!FRONTIER_LOTS.some(lot=>x>=lot.minX&&x<lot.maxX&&z>=lot.minZ&&z<lot.maxZ))
  }
  const cell=world.frontierStructures.find(({id,y})=>id===7&&y===FRONTIER_FLOOR+1)!
  const key=voxelIndex(cell.x,cell.y,cell.z)
  assert(world.set(cell.x,cell.y,cell.z,0))
  assert.deepEqual(world.exportEdits(),[[key,0]])
  assert.equal(cell.id,7)
  assert(world.set(cell.x,cell.y,cell.z,cell.id))
  assert.deepEqual(world.exportEdits(),[])
})

test('a public workbench works without storing fixture metadata against base terrain',()=>{
  const {x,y,z}=FRONTIER_RESOURCES.workbench
  world.useBench(x,y,z)
  assert.deepEqual(world.exportFixtures().benches,[])
  const lot=FRONTIER_LOTS[0]
  assert(world.set(lot.minX,y,lot.minZ,21))
  world.useBench(lot.minX,y,lot.minZ)
  assert.deepEqual(world.exportFixtures().benches,[[voxelIndex(lot.minX,y,lot.minZ),1]])
  assert(world.set(lot.minX,y,lot.minZ,0))
})

test('frontier terrain regenerates exactly from its seed without changing base town cells',()=>{
  const copy=new World('frontier-test',false,2,'frontier')
  const other=new World('frontier-other',false,2,'frontier')
  assert.deepEqual(copy.frontierStructures,world.frontierStructures)
  assert.deepEqual(copy.data,world.data)
  assert.deepEqual(other.frontierStructures,world.frontierStructures)
  assert.notEqual(other.highest[62+53*SIZE],world.highest[62+53*SIZE])
})
