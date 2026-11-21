import 'fake-indexeddb/auto'
import test from 'node:test'
import assert from 'node:assert/strict'
import { defaults, SaveStore, parseBackup, backupText, migrate, type WorldSave } from '../src/storage.ts'
import { createBag } from '../src/inventory.ts'
import { World,voxelIndex } from '../src/world.ts'

function fixture():WorldSave {
  const bag=createBag('explore')
  bag.slots=[{id:5,count:3},{id:17,count:1,durability:7}];bag.hotbar[0]=17
  return {format:'webcraft777',version:1,generator:1,id:'first-777',name:'森の家',seed:'stone-777',mode:'explore',
    revision:0,updatedAt:1,pose:{x:120.5,y:40,z:128.5,yaw:-.9,pitch:.23},flying:false,bag,selected:0,
    day:.73,settings:{...defaults,volume:.4},edits:[[voxelIndex(127,12,128),0],[voxelIndex(128,52,128),7]],guideSeen:true}
}
test('IndexedDB commit, fresh connection, JSON and regenerated world retain air, buildings, pose and tool wear',async()=>{
  const db='craft-'+crypto.randomUUID(),s=new SaveStore(db)
  const result=await s.write(fixture(),null)
  const fromDisk=(await new SaveStore(db).get(result.id))!
  const restored=parseBackup(backupText(fromDisk))
  assert.deepEqual(restored,result)
  const world=new World(restored.seed);world.loadEdits(restored.edits)
  assert.equal(world.get(127,12,128),0);assert.equal(world.get(128,52,128),7)
  assert.equal((await s.list())[0].revision,1)
  const imported=await new SaveStore('import-'+db).write(restored,null)
  assert.deepEqual(imported.edits,restored.edits)
})
test('a duplicate creation and stale writer cannot replace a newer world; distinct namesakes coexist',async()=>{
  const s=new SaveStore('craft-'+crypto.randomUUID()),a=await s.write(fixture(),null)
  await assert.rejects(s.write(fixture(),null))
  const attempts=await Promise.allSettled([s.write({...a,day:.44},1),s.write({...a,day:.88},1)])
  assert.equal(attempts.filter(r=>r.status==='fulfilled').length,1)
  assert.equal((await s.get(a.id))?.revision,2)
  await s.write({...a,id:'second'},null)
  assert.equal((await s.list()).length,2)
})
test('import rejects invalid UTF JSON data, incompatible versions, invalid inventory, settings and terrain entries',()=>{
  const base=fixture()
  for(const patch of [{version:2},{generator:12},{format:'foreign'}, {pose:{...base.pose,x:Infinity}},
    {bag:{slots:[{id:17,count:1,durability:-1}],hotbar:Array(9).fill(0)}},{selected:9},
    {edits:[[1,0]]},{edits:[[65536,99]]},{edits:[[65536,0],[65536,1]]},{settings:{...defaults,distance:50}}])
    assert.throws(()=>parseBackup(JSON.stringify({...base,...patch})))
  assert.throws(()=>parseBackup('{'))
})

test('湖のステージとサメの討伐、ジャンプ台と坂の向きがセーブと書き出しで残る',async()=>{
  const save=migrate(fixture())
  assert.equal(save.stage,'classic')
  const lake=new World('staged-lake',false,2,'lake'), start=lake.spawn()
  const pad=voxelIndex(130,35,139),slide=voxelIndex(131,34,139)
  const data:WorldSave={...save,id:'lake-check',stage:'lake',generator:2,seed:'staged-lake',
    pose:start,mode:'creative',bag:createBag('creative'),sharkDefeated:true,edits:[[pad,29],[slide,31]]}
  const store=new SaveStore('stage-'+crypto.randomUUID())
  const written=await store.write(data,null)
  const backup=parseBackup(backupText(written))
  assert.equal((await store.list())[0].stage,'lake')
  assert.equal(backup.sharkDefeated,true)
  assert.equal(backup.stage,'lake')
  const restored=new World(backup.seed,false,backup.generator,backup.stage)
  restored.loadEdits(backup.edits)
  assert.equal(restored.get(130,35,139),29)
  assert.equal(restored.get(131,34,139),31)
  assert.throws(()=>migrate({...data,stage:null}))
  assert.throws(()=>migrate({...data,stage:'unrecognized'}))
  assert.throws(()=>migrate({...data,sharkDefeated:1}))
})
