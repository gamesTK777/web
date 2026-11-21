import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createBag, stageMining } from '../src/inventory'
import { createJourney } from '../src/expedition'
import { readRoomProfile, writeRoomProfile, type RoomProfile } from '../src/room-exploration'

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
