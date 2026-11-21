import { validBag, type Bag, type Mode } from './inventory'

import { defaults, upgradeSettings, validSettings, type Settings } from './preferences'
import { emptyFixtures, validFixtures, editableId, type WorldFixtures } from './world'
import { createJourney, validJourney } from './expedition'
import { validTerrainPreset, type TerrainPreset } from './stages'
export { defaults, validSettings, type Settings }
export interface WorldSave {
  format: 'webcraft777'; version: 1|2; generator: 1|2; id: string; name: string; seed: string; mode: Mode
  fixtures?: WorldFixtures; journey?: ReturnType<typeof createJourney>; stage?: TerrainPreset; sharkDefeated?: boolean
  revision: number; updatedAt: number; pose: { x: number; y: number; z: number; yaw: number; pitch: number; crouched?: boolean }
  flying: boolean; bag: Bag; selected: number; edits: [number, number][]; day: number; settings: Settings; guideSeen: boolean
}
export type ActiveSave = WorldSave & {version:2;fixtures:WorldFixtures;journey:ReturnType<typeof createJourney>}
export type WorldEntry = Pick<WorldSave, 'id'|'name'|'seed'|'mode'|'stage'|'updatedAt'|'revision'> & {hasOriginal?:boolean}
const inRange = (v: unknown, lo: number, hi: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi
const integer = (v: unknown, lo: number, hi: number): v is number => inRange(v, lo, hi) && Number.isInteger(v)
const object = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const isText = (s: unknown, limit: number): s is string => typeof s === 'string' && s.trim().length > 0 && s.length <= limit

export function settingsAtTitle(): Settings {
  try { return upgradeSettings(JSON.parse(localStorage.getItem('tk777.webcraft.settings') || 'null')) } catch {}
  return {...defaults}
}
export function rememberSettings(s: Settings) {
  try { localStorage.setItem('tk777.webcraft.settings', JSON.stringify(s)) } catch {}
}
export function migrate(value: unknown): ActiveSave {
  if (!object(value) || value.format !== 'webcraft777') throw new Error('ウェブクラフト777のワールドファイルを選んでください。')
  const legacy=value.version===1 && value.generator===1
  if (!legacy && (value.version!==2 || (value.generator!==1 && value.generator!==2))) throw new Error('この保存形式または地形バージョンには対応していません。')
  const stage=value.stage===undefined?'classic':value.stage
  if(!validTerrainPreset(stage)||(stage!=='classic'&&(value.generator!==2||value.mode!=='creative'))||
    (value.sharkDefeated!==undefined&&typeof value.sharkDefeated!=='boolean'))
    throw new Error('ステージまたは生き物の保存情報が正しくありません。')
  if(legacy && (!object(value.settings) || !['distance','scale','shadows','sensitivity','volume','muted'].every(k=>Object.hasOwn(value.settings as object,k))))
    throw new Error('旧ワールドの設定が欠けています。元のバックアップを確認してください。')
  const settings=legacy ? upgradeSettings(value.settings) : value.settings
  const fixtures=legacy ? emptyFixtures() : value.fixtures, journey=legacy ? createJourney() : value.journey
  if (!validFixtures(fixtures)||!validJourney(journey))throw Error('設備または探検記録を読めません。元のバックアップを確認してください。')
  const p = value.pose
  if (!isText(value.id,64) || !/^[a-zA-Z0-9-]+$/.test(value.id) || !isText(value.name,64) || !isText(value.seed,128) ||
    (value.mode!=='creative' && value.mode!=='explore') || !integer(value.revision,0,Number.MAX_SAFE_INTEGER) ||
    !integer(value.updatedAt,0,8640000000000000) || !object(p) || !inRange(p.x,0,256) || !inRange(p.z,0,256) ||
    !inRange(p.y,-10,130) || !inRange(p.yaw,-1e7,1e7) || !inRange(p.pitch,-Math.PI/2,Math.PI/2) ||
    !inRange(value.day,0,1) || typeof value.guideSeen !== 'boolean' || typeof value.flying !== 'boolean' ||
    (p.crouched!==undefined && typeof p.crouched!=='boolean') || !integer(value.selected,0,8) || !validSettings(settings) || !validBag(value.bag))
    throw new Error('ワールド情報・設定または所持品のデータが正しくありません。')
  if(legacy && (value.bag.hotbar.some(id=>id>20)||value.bag.slots.some(stack=>stack.id>20)))throw new Error('旧ワールドの所持品に未対応の素材があります。')
  if (!Array.isArray(value.edits) || value.edits.length > 256*256*95) throw new Error('ブロック変更のデータが正しくありません。')
  const editsByPosition = new Map<number,number>()
  for (const edit of value.edits) {
    if (!Array.isArray(edit) || edit.length!==2 || !integer(edit[0],65536,256*256*96-1) ||
      !(legacy?integer(edit[1],0,13):editableId(edit[1])) || editsByPosition.has(edit[0])) throw new Error('ブロック変更に範囲外または重複した座標があります。')
    editsByPosition.set(edit[0],edit[1])
  }
  if(fixtures.chests.some(([k])=>editsByPosition.get(k)!==22) || fixtures.benches.some(([k])=>editsByPosition.get(k)!==21) ||
    fixtures.axes.some(([k])=>editsByPosition.has(k) && editsByPosition.get(k)!==5))throw Error('設備と建築記録が一致しません。')
  return {...value,version:2,stage,settings,fixtures,journey} as ActiveSave
}
export function readBackup(text: string) {
  let data: unknown
  try { data = JSON.parse(text) } catch { throw new Error('ファイルを読めません。書き出したJSONファイルを選んでください。') }
  const save=migrate(data)
  return { save, original:(data as WorldSave).version===1?data as WorldSave:undefined }
}
export const parseBackup=(text:string)=>readBackup(text).save
export const backupText = (save: WorldSave) => JSON.stringify(save)

export class SaveStore {
  private connection?: Promise<IDBDatabase>
  constructor(private database = 'tk777.webcraft777.v1') {}
  private open(): Promise<IDBDatabase> {
    if (this.connection) return this.connection
    this.connection = new Promise<IDBDatabase>((resolve,reject) => {
      const r = indexedDB.open(this.database, 2)
      r.onupgradeneeded = () => {
        for (const name of ['worlds','directory','originals'])if(!r.result.objectStoreNames.contains(name))r.result.createObjectStore(name,{keyPath:'id'})
      }
      r.onsuccess = () => { r.result.onversionchange = () => { r.result.close(); this.connection = undefined }; resolve(r.result) }
      r.onerror = () => reject(r.error)
      r.onblocked = () => reject(new Error('ほかのタブのゲームを閉じてから、もう一度お試しください。'))
    }).catch(err => { this.connection = undefined; throw err })
    return this.connection
  }
  async list(): Promise<WorldEntry[]> {
    const db = await this.open()
    return new Promise((resolve,reject) => {
      const tx=db.transaction(['directory','originals'])
      const directory=tx.objectStore('directory').getAll(), originals=tx.objectStore('originals').getAllKeys()
      tx.oncomplete=()=>{const old=new Set(originals.result)
        resolve(directory.result.map(row=>({...row,hasOriginal:row.schemaVersion!==2||old.has(row.id)})).sort((a,b)=>b.updatedAt-a.updatedAt))}
      tx.onabort=()=>reject(tx.error)
    })
  }
  async original(id:string): Promise<WorldSave|undefined> {
    const db=await this.open()
    return new Promise((resolve,reject)=>{const r=db.transaction(['originals','worlds']).objectStore('originals').get(id)
      r.onsuccess=()=>{if(r.result){resolve(r.result);return}
        const old=r.transaction!.objectStore('worlds').get(id);old.onsuccess=()=>resolve(old.result?.version===1?old.result:undefined);old.onerror=()=>reject(old.error)}
      r.onerror=()=>reject(r.error)})
  }
  async get(id: string): Promise<ActiveSave|undefined> {
    const db = await this.open()
    const value: unknown = await new Promise((resolve,reject) => {
      const r = db.transaction('worlds').objectStore('worlds').get(id)
      r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error)
    })
    if (value===undefined) return undefined
    return migrate(value)
  }
  // The terrain and its directory entry become visible in the same transaction.
  async write(snapshot: WorldSave, expectedRevision: number|null): Promise<WorldSave> {
    const next=migrate(snapshot)
    const db = await this.open()
    return new Promise((resolve,reject) => {
      const tx = db.transaction(['directory','worlds','originals'],'readwrite')
      const directory = tx.objectStore('directory')
      const lookup = directory.get(snapshot.id)
      let saved: WorldSave
      let conflict = false
      lookup.onsuccess = () => {
        if ((lookup.result?.revision ?? null) !== expectedRevision) {
          conflict = true; tx.abort(); return
        }
        const worlds=tx.objectStore('worlds'), prior=worlds.get(snapshot.id)
        prior.onsuccess=()=>{
          const legacy=prior.result?.version===1?prior.result:snapshot.version===1?snapshot:null
          if(legacy){const originals=tx.objectStore('originals'),has=originals.getKey(snapshot.id)
            has.onsuccess=()=>{if(has.result===undefined)originals.add(legacy)}}
        }
        saved = { ...next, revision: (expectedRevision ?? 0)+1, updatedAt: Date.now() }
        const {id,name,seed,mode,stage,updatedAt,revision} = saved
        tx.objectStore('worlds').put(saved); directory.put({id,name,seed,mode,stage,updatedAt,revision,schemaVersion:2})
      }
      tx.oncomplete = () => resolve(saved)
      tx.onabort = () => reject(conflict
        ? new Error('別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。')
        : tx.error ?? new Error('保存が中断されました。'))
    })
  }
}
