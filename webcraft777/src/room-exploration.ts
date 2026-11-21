import { createBag, validBag, type Bag } from './inventory'
import { validJourney, type Journey } from './expedition'
import { editableId, HEIGHT, SIZE } from './world'
import type { Pose } from './physics'
import type { RoomEdit } from './online-client'
import type { TerrainPreset } from './stages'

export type ExplorationEdit = {edit:RoomEdit & {actionId:string}; after:Bag; message?:string}
export type RoomProfile = {bag:Bag;selected:number;journey:Journey;pose:Pose;pending?:ExplorationEdit}

export function createRoomExplorationBag(stage:TerrainPreset):Bag {
  const bag=createBag('explore')
  // These stages have no trees or coal veins, so provide the materials for
  // starter tools, a workbench and lighting without changing the terrain.
  if(stage!=='classic'){
    bag.slots=[{id:5,count:16},{id:15,count:8}]
    bag.hotbar[0]=5
  }
  return bag
}

const profileKey=(code:string,nickname:string)=>'tk777.webcraft.exploration.'+JSON.stringify([code,nickname.trim()])
const bounded=(value:unknown,min:number,max:number):value is number =>
  typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max
const validPose=(p:Pose|undefined)=>p&&bounded(p.x,0,SIZE)&&bounded(p.y,0,HEIGHT)&&bounded(p.z,0,SIZE)&&
  bounded(p.pitch,-Math.PI/2,Math.PI/2)&&bounded(p.yaw,-Math.PI*2,Math.PI*2)&&
  (p.crouched===undefined||typeof p.crouched==='boolean')

function validEdit(p:ExplorationEdit|undefined) {
  const e=p?.edit
  return e&&validBag(p?.after)&&typeof e.actionId==='string'&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(e.actionId)&&
    (p?.message===undefined||typeof p.message==='string'&&p.message.length<=150)&&
    Number.isSafeInteger(e.key)&&e.key>=SIZE*SIZE&&e.key<SIZE*SIZE*HEIGHT&&
    Number.isSafeInteger(e.fromRevision)&&e.fromRevision>=0&&editableId(e.before)&&editableId(e.block)&&
    (e.axis==='x'||e.axis==='y'||e.axis==='z')
}

// Keep inventories separate for two people using different tabs on the same PC.
// A reload reuses the journal for this room and nickname in the same tab.
export function readRoomProfile(code:string,nickname:string):RoomProfile|undefined {
  try{
    const data=JSON.parse(sessionStorage.getItem(profileKey(code,nickname))??'null') as RoomProfile|null
    if(data&&validBag(data.bag)&&Number.isInteger(data.selected)&&data.selected>=0&&data.selected<=8&&
      validJourney(data.journey)&&validPose(data.pose)&&(data.pending===undefined||validEdit(data.pending)))return data
  }catch{}
}

export function writeRoomProfile(code:string,nickname:string,profile:RoomProfile) {
  try {sessionStorage.setItem(profileKey(code,nickname),JSON.stringify(profile))} catch {}
}
