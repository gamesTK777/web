import { validBag, type Bag, type Mode } from './inventory'

export interface Settings {
  distance: number; scale: number; shadows: boolean; sensitivity: number; volume: number; muted: boolean
}
export const defaults: Settings = { distance: 3, scale: 1, shadows: false, sensitivity: 1, volume: .45, muted: false }
export interface WorldSave {
  format: 'webcraft777'; version: 1; generator: 1; id: string; name: string; seed: string; mode: Mode
  revision: number; updatedAt: number; pose: { x: number; y: number; z: number; yaw: number; pitch: number }
  flying: boolean; bag: Bag; selected: number; edits: [number, number][]; day: number; settings: Settings; guideSeen: boolean
}
export type WorldEntry = Pick<WorldSave, 'id'|'name'|'seed'|'mode'|'updatedAt'|'revision'>
const inRange = (v: unknown, lo: number, hi: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi
const integer = (v: unknown, lo: number, hi: number): v is number => inRange(v, lo, hi) && Number.isInteger(v)
const object = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const isText = (s: unknown, limit: number): s is string => typeof s === 'string' && s.trim().length > 0 && s.length <= limit
export function validSettings(s: unknown): s is Settings {
  return object(s) && integer(s.distance,2,6) && inRange(s.scale,.5,1.5) && typeof s.shadows === 'boolean' &&
    inRange(s.sensitivity,.3,2.5) && inRange(s.volume,0,1) && typeof s.muted === 'boolean'
}
export function settingsAtTitle(): Settings {
  try { const value = JSON.parse(localStorage.getItem('tk777.webcraft.settings') || 'null'); if (validSettings(value)) return value } catch {}
  return {...defaults}
}
export function rememberSettings(s: Settings) {
  try { localStorage.setItem('tk777.webcraft.settings', JSON.stringify(s)) } catch {}
}
function check(value: unknown): asserts value is WorldSave {
  if (!object(value) || value.format !== 'webcraft777') throw new Error('ウェブクラフト777のワールドファイルを選んでください。')
  if (value.version !== 1 || value.generator !== 1) throw new Error('この保存形式または地形バージョンには対応していません。')
  const p = value.pose
  if (!isText(value.id,64) || !/^[a-zA-Z0-9-]+$/.test(value.id) || !isText(value.name,64) || !isText(value.seed,128) ||
    !['creative','explore'].includes(String(value.mode)) || !integer(value.revision,0,Number.MAX_SAFE_INTEGER) ||
    !integer(value.updatedAt,0,8640000000000000) || !object(p) || !inRange(p.x,0,256) || !inRange(p.z,0,256) ||
    !inRange(p.y,-10,130) || !inRange(p.yaw,-1e7,1e7) || !inRange(p.pitch,-Math.PI/2,Math.PI/2) ||
    !inRange(value.day,0,1) || typeof value.guideSeen !== 'boolean' || typeof value.flying !== 'boolean' ||
    !integer(value.selected,0,8) || !validSettings(value.settings) || !validBag(value.bag))
    throw new Error('ワールド情報・設定または所持品のデータが正しくありません。')
  if (!Array.isArray(value.edits) || value.edits.length > 256*256*95) throw new Error('ブロック変更のデータが正しくありません。')
  const seen = new Set<number>()
  for (const edit of value.edits) {
    if (!Array.isArray(edit) || edit.length!==2 || !integer(edit[0],65536,256*256*96-1) ||
      !integer(edit[1],0,13) || seen.has(edit[0])) throw new Error('ブロック変更に範囲外または重複した座標があります。')
    seen.add(edit[0])
  }
}
export function parseBackup(text: string): WorldSave {
  let data: unknown
  try { data = JSON.parse(text) } catch { throw new Error('ファイルを読めません。書き出したJSONファイルを選んでください。') }
  check(data)
  return data
}
export const backupText = (save: WorldSave) => JSON.stringify(save)

export class SaveStore {
  private connection?: Promise<IDBDatabase>
  constructor(private database = 'tk777.webcraft777.v1') {}
  private open(): Promise<IDBDatabase> {
    if (this.connection) return this.connection
    this.connection = new Promise<IDBDatabase>((resolve,reject) => {
      const r = indexedDB.open(this.database, 1)
      r.onupgradeneeded = () => {
        r.result.createObjectStore('worlds', { keyPath: 'id' })
        r.result.createObjectStore('directory', { keyPath: 'id' })
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
      const r = db.transaction('directory').objectStore('directory').getAll()
      r.onsuccess = () => resolve((r.result as WorldEntry[]).sort((a,b)=>b.updatedAt-a.updatedAt))
      r.onerror = () => reject(r.error)
    })
  }
  async get(id: string): Promise<WorldSave|undefined> {
    const db = await this.open()
    const value: unknown = await new Promise((resolve,reject) => {
      const r = db.transaction('worlds').objectStore('worlds').get(id)
      r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error)
    })
    if (value===undefined) return undefined
    check(value)
    return value
  }
  // The terrain and its directory entry become visible in the same transaction.
  async write(snapshot: WorldSave, expectedRevision: number|null): Promise<WorldSave> {
    const db = await this.open()
    return new Promise((resolve,reject) => {
      const tx = db.transaction(['directory','worlds'],'readwrite')
      const directory = tx.objectStore('directory')
      const lookup = directory.get(snapshot.id)
      let saved: WorldSave
      let conflict = false
      lookup.onsuccess = () => {
        if ((lookup.result?.revision ?? null) !== expectedRevision) {
          conflict = true; tx.abort(); return
        }
        saved = { ...snapshot, revision: (expectedRevision ?? 0)+1, updatedAt: Date.now() }
        const {id,name,seed,mode,updatedAt,revision} = saved
        tx.objectStore('worlds').put(saved); directory.put({id,name,seed,mode,updatedAt,revision})
      }
      tx.oncomplete = () => resolve(saved)
      tx.onabort = () => reject(conflict
        ? new Error('別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。')
        : tx.error ?? new Error('保存が中断されました。'))
    })
  }
}
