import assert from 'node:assert/strict'
import { test } from 'node:test'
import { craft, createBag, quantity, stageMining, validBag } from '../src/inventory'
import { createJourney } from '../src/expedition'
import { createExplorationBag, readRoomProfile, writeRoomProfile, type RoomProfile } from '../src/room-exploration'

test('木のないステージでも各参加者の初期素材から道具と作業台を作れる',()=>{
  assert.deepEqual(createExplorationBag('classic'),createBag('explore'))
  assert.deepEqual(createExplorationBag('frontier'),createBag('explore'))
  for(const stage of ['flat','lake','school','park','crossing'] as const){
    const host=createExplorationBag(stage),guest=createExplorationBag(stage)
    assert(validBag(host))
    assert.equal(host.hotbar[0],5)
    assert.equal(quantity(host,5),16)
    assert.equal(quantity(host,15),8)
    assert(craft(host,'boards',3).ok)
    assert(craft(host,'sticks').ok)
    assert(craft(host,'wood-pick').ok)
    assert(craft(host,'bench').ok)
    assert.equal(quantity(host,17),1)
    assert.equal(quantity(host,21),1)
    assert.equal(quantity(guest,5),16)
    assert.equal(quantity(guest,21),0)
  }
})

test('探索ルーム用の持ち物は編集中の素材取得を反映せず、再読み込みから同じ受付番号を使える',t=>{
  const entries=new Map<string,string>()
  const original=Object.getOwnPropertyDescriptor(globalThis,'sessionStorage')
  Object.defineProperty(globalThis,'sessionStorage',{configurable:true,value:{
    getItem:(key:string)=>entries.get(key)??null,setItem:(key:string,value:string)=>entries.set(key,value),
  }})
  t.after(()=>{if(original)Object.defineProperty(globalThis,'sessionStorage',original);else Reflect.deleteProperty(globalThis,'sessionStorage')})
  const bag=createBag('explore')
  const after=stageMining(bag,5,0).draft!
  const profile:RoomProfile={bag,selected:0,journey:createJourney(),pose:{x:128.5,y:34,z:139.5,yaw:0,pitch:0},
    pending:{edit:{actionId:crypto.randomUUID(),key:2_195_000,before:5,block:0,axis:'y',fromRevision:0},after}}
  writeRoomProfile('ROOM7777','ふー',profile)
  assert.deepEqual(readRoomProfile('ROOM7777','ふー'),profile)
  assert.equal(readRoomProfile('ROOM7777','ふー')?.bag.slots.length,0)
  assert.equal(readRoomProfile('ROOM7777','ふー')?.pending?.after.slots[0].id,5)
  assert.equal(readRoomProfile('ROOM7777','ほかの人'),undefined)
  assert.equal(readRoomProfile('ROOM8888','ふー'),undefined)
  const key=[...entries.keys()][0]
  entries.set(key,JSON.stringify({...profile,pending:{...profile.pending,edit:{...profile.pending?.edit,actionId:'broken'}}}))
  assert.equal(readRoomProfile('ROOM7777','ふー'),undefined)
})
