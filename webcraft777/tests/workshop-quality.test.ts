import test from 'node:test'
import assert from 'node:assert/strict'
import {createBag, supplyCreative, transferStack} from '../src/inventory.ts'
import {defaults, migrate} from '../src/storage.ts'
import {emptyFixtures} from '../src/world.ts'
import {createJourney} from '../src/expedition.ts'
test('creative supplies can be stored and retrieved, while exploration and full stacks stay unchanged',()=>{
  const bag=createBag('creative'),chest:typeof bag.slots=[]
  assert.equal(supplyCreative(bag,'explore',7,64).ok,false)
  assert.equal(supplyCreative(bag,'creative',7,64).ok,true)
  assert.equal(transferStack(bag,chest,'bag',0,true).ok,true)
  assert.deepEqual(chest,[{id:7,count:32}]);assert.deepEqual(bag.slots,chest)
  assert.equal(transferStack(bag,chest,'chest',0).ok,true)
  assert.deepEqual(bag.slots,[{id:7,count:64}])
  bag.slots=Array.from({length:27},()=>({id:7,count:64}));bag.slots[0].count=63
  const original=structuredClone(bag)
  assert.equal(supplyCreative(bag,'creative',7,64).ok,false);assert.deepEqual(bag,original)
})
test('legacy format rejects newer inventories and format 2 rejects fixture contents at a mismatched block',()=>{
  const base={format:'webcraft777',version:1,generator:1,id:'check',name:'検証',seed:'a',mode:'explore',revision:0,updatedAt:5,
    pose:{x:12,y:23,z:11,pitch:0,yaw:0},flying:false,bag:createBag('explore'),selected:0,edits:[],day:.4,settings:defaults,guideSeen:false}
  assert.throws(()=>migrate({...base,bag:{...base.bag,slots:[{id:22,count:1}]}}),/旧ワールド/)
  assert.throws(()=>migrate({...base,settings:{distance:2}}),/設定/)
  assert.throws(()=>migrate({...base,mode:['explore']}),/ワールド情報/)
  const v2={...base,version:2,fixtures:emptyFixtures(),journey:createJourney()}
  assert.throws(()=>migrate({...v2,edits:[[70000,7]],fixtures:{...v2.fixtures,chests:[[70000,[{id:3,count:1}]]]}}),/設備/)
})
