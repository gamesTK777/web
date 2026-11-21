import test from 'node:test'
import assert from 'node:assert/strict'
import { Scene } from 'three'
import { FrontierFire, frontierFireSpread, validFireRecords } from '../src/frontier-fire'
import { FrontierLife, validFrontierState } from '../src/frontier-life'
import { FRONTIER_LOTS, FRONTIER_SPAWNS } from '../src/frontier-world'
import { World, voxelIndex } from '../src/world'

function terrain(){
  const cells=new Map<number,number>()
  return {salt:371,cells,get:(x:number,y:number,z:number)=>cells.get(voxelIndex(x,y,z))??0,
    set:(x:number,y:number,z:number,id:number)=>{cells.set(voxelIndex(x,y,z),id);return true}}
}

test('火は隣接する木材や葉に燃え広がり、石は残る',()=>{
  const map=terrain(),fire=new FrontierFire(map)
  map.set(90,35,90,7);map.set(91,35,90,5);map.set(92,35,90,6);map.set(93,35,90,3)
  assert(fire.ignite(90,35,90))
  assert(!fire.ignite(90,35,90))
  assert(!fire.ignite(190,35,190))
  for(let i=0;i<33;i++)fire.step(.25)
  assert.deepEqual([90,91,92,93].map(x=>map.get(x,35,90)),[0,0,0,3])
  assert.equal(fire.count,0)
  assert(fire.ignite(93,35,90))
  assert(fire.extinguish(93,35,90))
  assert.equal(map.get(93,35,90),3)
})

test('巨大な連結建物の火を保存しても広がりの上限は維持する',()=>{
  const map=terrain(),fire=new FrontierFire(map)
  for(let z=40;z<61;z++)for(let x=40;x<61;x++)map.set(x,35,z,7)
  assert(fire.ignite(50,35,50))
  for(let i=0;i<38;i++)fire.step(.25)
  const records=fire.save(), budget=fire.budget
  assert(validFireRecords(records))
  assert(records.length>0&&budget<frontierFireSpread)
  const copy=new FrontierFire(map)
  copy.restore(records,budget)
  assert.deepEqual(copy.save(),records)
  assert.equal(copy.budget,budget)
  for(let i=0;i<280;i++)copy.step(.25)
  assert.equal(copy.count,0)
  assert.equal([...map.cells.values()].filter(id=>id===0).length,frontierFireSpread+1)
})

test('町の住民は元の建物を修復し、建築区画の破壊は復元しない',()=>{
  const world=new World('frontier-life-test',false,2,'frontier'), life=new FrontierLife(world,new Scene())
  const resident=FRONTIER_SPAWNS.residents[0]
  const block=world.frontierStructures.find(b=>b.id===7&&b.y===33&&
    Math.hypot(b.x+.5-resident.x,b.z+.5-resident.z)>1.5&&Math.hypot(b.x+.5-resident.x,b.z+.5-resident.z)<3.3)
  assert(block)
  const {minX:x,minZ:z}=FRONTIER_LOTS[0]
  assert(world.set(x+2,33,z+2,7))
  assert(world.set(x+2,33,z+2,0))
  assert(world.set(block.x,block.y,block.z,0))
  for(let i=0;i<90;i++)life.update(world.spawn(),.1)
  assert.equal(world.get(block.x,block.y,block.z),block.id)
  assert.equal(world.get(x+2,33,z+2),0)
  life.dispose()
})

test('火矢の射線とたいまつの消火操作は狙ったブロックを使う',()=>{
  const world=new World('frontier-life-test',false,2,'frontier'),life=new FrontierLife(world,new Scene())
  const aim={...world.spawn(),x:130.5,y:33,z:151.5,yaw:0,pitch:0}
  assert(world.set(130,34,141,7))
  assert(life.action(aim,35).ok)
  assert(life.fire.has(130,34,141))
  assert(!life.action(aim,35).ok)
  const close={...aim,z:144.5}
  assert.equal(life.interact(close),'火を消しました。')
  assert.equal(life.fire.count,0)
  assert.equal(world.get(130,34,141),7)
  life.dispose()
})

test('射線上の壁に阻まれた射撃は向こうの盗賊に届かない',()=>{
  const world=new World('frontier-life-test',false,2,'frontier'),life=new FrontierLife(world,new Scene())
  const aim={...world.spawn(),x:128.5,y:33,z:148.5,yaw:0,pitch:0}
  const state=life.save()
  state.raiders=[{x:128.5,y:33,z:138.5,kind:'bandit',hp:42,yaw:0}]
  life.restore(state)
  assert(world.set(128,34,145,3))
  assert(life.action(aim,34).ok)
  assert.equal(life.save().raiders[0].hp,42)
  assert(world.set(128,34,145,0))
  for(let i=0;i<4;i++)life.update(aim,.1)
  assert(life.action(aim,34).ok)
  assert.equal(life.save().raiders[0].hp,19)
  life.dispose()
})

test('襲撃で盗賊とギャングが現れ、保安官が応戦し設備にも被害が出る',()=>{
  const world=new World('frontier-life-test',false,2,'frontier'), life=new FrontierLife(world,new Scene())
  let burning=false, defense=false, attack=false, surfaced=false, damaged=false
  for(let i=0;i<840;i++){
    life.update(world.spawn(),.1)
    if(life.health===0)life.restoreHealth()
    const state=life.save()
    assert(validFrontierState(state))
    if(state.raiders.some(n=>n.kind==='bandit')&&state.raiders.some(n=>n.kind==='gang'))surfaced=true
    burning ||= state.fires.length>0
    defense ||= state.raiders.some(n=>n.hp<(n.kind==='gang'?56:42))
    attack ||= life.health<100
    damaged ||= world.exportEdits().length>0
  }
  assert(surfaced&&burning&&defense&&attack&&damaged)
  life.dispose()
})
