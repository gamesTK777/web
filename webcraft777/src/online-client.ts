import { HEIGHT, SIZE, type Axis } from './world'
import type { Mode } from './inventory'
import { copsStage, stageSupportsTagBots, validTerrainPreset, type TerrainPreset } from './stages'
export type OnlineMode = Mode|'tag'|'cops'
export type TagMinutes = 1|3|5|10|15

export interface NetPose {
  x: number
  y: number
  z: number
  yaw: number
  moving: boolean
  crouched: boolean
  flying: boolean
}

export interface RoomEdit {
  key: number
  before: number
  fromRevision: number
  block: number
  axis: Axis
  actionId?: string
}

export interface RoomCell {
  key: number
  block: number
  axis: Axis
  revision: number
}

export interface RoomPlayer {
  id: string
  nickname: string
  pose: NetPose
  cpu?:boolean
}

export interface RoomSummary {
  code: string
  name: string
  seed: string
  generator: 2
  createdAt: number
  mode: OnlineMode
  stage: TerrainPreset
  tagMinutes?: TagMinutes
  tagBots?:number
}

export interface RoomConnection {
  room: RoomSummary
  id: string
  token: string
}

export interface RoomFrame {
  revision: number
  cells: RoomCell[]
  players: RoomPlayer[]
  tag?: TagState
  cops?:CopsState
  rides?:RideSeat[]
}
export type RideId='swings'|'seesaw'
export type RideRequest={id:RideId;seat?:number;pump?:number}
export type RideSeat={id:RideId;seat:number;memberId:string;pump:number}
export interface CopsState {
  phase:TagState['phase']
  hideUntil:number;endsAt:number;serverNow:number;seq:number
  policeIds:string[];jailedIds:string[];enrolledIds:string[]
  winner:'police'|'robbers'|null;winnerIds:string[]
  results:TagState['results']
  event:{kind:'capture'|'rescue';ids:string[];by:string}|null
}
export interface TagState {
  it:string|null
  phase:'waiting'|'hiding'|'playing'|'finished'
  hideUntil:number
  seq:number
  previousIt:string|null
  endsAt:number
  serverNow?:number
  enrolledIds?:string[]
  winnerIds:string[]
  results:{id:string;nickname:string}[]
}

export interface EditOutcome {
  ok: boolean
  reason?: string
}

export type OnlineState = 'connecting' | 'connected' | 'reconnecting'

export interface RoomHooks {
  pose: () => NetPose | null
  ride?:()=>RideRequest|null|undefined
  onFrame: (frame: RoomFrame) => void
  onState: (state: OnlineState) => void
  onEnd?: (error: OnlineError) => void
}

const POLL_INTERVAL = 900
const TAG_POLL_INTERVAL = 260
const EDIT_INTERVAL = 300
const REQUEST_TIMEOUT = 7_000
const MAX_BACKOFF = 12_000
const MAX_ROOM_CELLS = 10_000
const PROTOCOL = 8

const timedMode=(mode:OnlineMode)=>mode==='tag'||mode==='cops'

const statusMessages: Record<number, string> = {
  400: '部屋名・ニックネーム・合言葉を確認してください。',
  401: '部屋との接続が切れました。合言葉を入れて参加し直してください。',
  403: 'このページからは部屋に接続できません。',
  404: '部屋が見つかりません。合言葉を確認してください。',
  409: '部屋が現在いっぱいです。',
  410: '部屋の有効期限が切れました。新しい部屋を作ってください。',
  426: 'ゲームを再読み込みして、最新版でルームに入り直してください。',
  429: '通信が集中しています。少し待ってからお試しください。',
}

export class OnlineError extends Error {
  constructor(readonly status: number, readonly code: string, readonly retryAfter = 0) {
    super(code === 'invalid-response' ? '部屋から正しい応答を受け取れませんでした。' :
      code === 'round-started' ? 'この鬼ごっこは始まっています。次のルームに参加してください。' :
      code === 'room-finished' ? 'この鬼ごっこは終了しました。新しいルームに参加してください。' :
      statusMessages[status] ?? 'マルチプレイに接続できませんでした。通信環境を確認してください。')
    this.name = 'OnlineError'
  }
}

function invalidResponse(): never {
  throw new OnlineError(0, 'invalid-response')
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : undefined
}

function isText(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max
}

function isInteger(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= min && value <= max
}

function isNumber(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max
}

function isMemberId(value: unknown): value is string {
  return isText(value, 64) && /^[a-z0-9_-]+$/i.test(value)
}
function isTagMinutes(value:unknown):value is TagMinutes {
  return value===1||value===3||value===5||value===10||value===15
}

function parseConnection(value: unknown): RoomConnection {
  const body = asRecord(value), room = asRecord(body?.room)
  if (!body || !room || typeof room.code !== 'string' || !/^[A-Z0-9]{8}$/.test(room.code) ||
      !isText(room.name, 120) || !isText(room.seed, 128) || room.generator !== 2 ||
      (room.mode!==undefined&&room.mode!=='explore'&&room.mode!=='creative'&&room.mode!=='tag'&&room.mode!=='cops') ||
      (room.stage!==undefined&&!validTerrainPreset(room.stage)) ||
      room.stage==='frontier' ||
      ((room.mode==='cops')!==copsStage(room.stage)) ||
      (room.stage==='school'&&(room.mode!=='tag'||!isTagMinutes(room.tagMinutes))) ||
      (room.tagMinutes!==undefined&&(room.mode!=='tag'&&room.mode!=='cops'||!isTagMinutes(room.tagMinutes))) ||
      (room.mode==='cops'&&!isTagMinutes(room.tagMinutes)) ||
      (room.tagBots!==undefined&&(!isInteger(room.tagBots,0,4)||
        room.tagBots>0&&(room.mode!=='tag'||!isTagMinutes(room.tagMinutes)||!stageSupportsTagBots(room.stage)))) ||
      !isInteger(room.createdAt, 1, Number.MAX_SAFE_INTEGER) ||
      !isMemberId(body.id) || !isText(body.token, 256) || body.token.length < 16 ||
      !/^[a-z0-9_.-]+$/i.test(body.token)) return invalidResponse()
  return {
    id: body.id,
    token: body.token,
    room: { code: room.code, name: room.name, seed: room.seed, generator: room.generator, createdAt: room.createdAt,
      mode:room.mode==='explore'||room.mode==='tag'||room.mode==='cops'?room.mode:'creative',
      stage:validTerrainPreset(room.stage)?room.stage:'classic',
      ...(isTagMinutes(room.tagMinutes)?{tagMinutes:room.tagMinutes}:{}),
      ...(isInteger(room.tagBots,1,4)?{tagBots:room.tagBots}:{}) },
  }
}

function parsePlayer(value: unknown): RoomPlayer | undefined {
  const member = asRecord(value), pose = asRecord(member?.pose)
  if (!member || !pose || !isMemberId(member.id) || !isText(member.nickname, 80) ||
      !isNumber(pose.x, 0, SIZE) || !isNumber(pose.y, 0, HEIGHT) || !isNumber(pose.z, 0, SIZE) ||
      !isNumber(pose.yaw, -Math.PI * 2, Math.PI * 2) ||
      typeof pose.moving !== 'boolean' || typeof pose.crouched !== 'boolean' || typeof pose.flying !== 'boolean') return undefined
  const {x, y, z, yaw, moving, crouched, flying} = pose
  return { id: member.id, nickname: member.nickname, pose: { x, y, z, yaw, moving, crouched, flying },
    ...(member.cpu===true?{cpu:true}:{}) }
}

function parseCell(value: unknown, since: number, total: number): RoomCell {
  const cell = asRecord(value)
  if (!cell || !isInteger(cell.key, SIZE * SIZE, SIZE * SIZE * HEIGHT - 1) ||
      !isInteger(cell.block, 0, 33) || (cell.block > 12 && cell.block !== 21 && cell.block !== 23 && cell.block < 25) ||
      (cell.axis !== 'y' && !(cell.block === 5 && (cell.axis === 'x' || cell.axis === 'z'))) ||
      !isInteger(cell.revision, since + 1, total)) return invalidResponse()
  return { key: cell.key, block: cell.block, axis: cell.axis, revision: cell.revision }
}

function tagIds(value:unknown):string[] {
  if(!Array.isArray(value)||value.length>6||!value.every(isMemberId)||new Set(value).size!==value.length)
    return invalidResponse()
  return value
}

function parseTag(value:unknown,timed:boolean):TagState {
  const tag=asRecord(value)
  if(!tag||(tag.it!==null&&!isMemberId(tag.it))||(tag.previousIt!==null&&!isMemberId(tag.previousIt))||
    (tag.phase!=='waiting'&&tag.phase!=='hiding'&&tag.phase!=='playing'&&tag.phase!=='finished')||
    !isInteger(tag.hideUntil,0,Number.MAX_SAFE_INTEGER)||!isInteger(tag.seq,0,Number.MAX_SAFE_INTEGER))
    return invalidResponse()
  const endsAt=isInteger(tag.endsAt,0,Number.MAX_SAFE_INTEGER)?tag.endsAt:undefined
  const serverNow=isInteger(tag.serverNow,1,Number.MAX_SAFE_INTEGER)?tag.serverNow:undefined
  if(timed&&(endsAt===undefined||serverNow===undefined||
      (tag.phase!=='waiting'&&(!tag.it||endsAt<=tag.hideUntil))))return invalidResponse()
  const enrolledIds=tag.enrolledIds===undefined?undefined:tagIds(tag.enrolledIds)
  const winnerIds=tag.winnerIds===undefined?[]:tagIds(tag.winnerIds)
  const results:{id:string;nickname:string}[]=[]
  if(tag.results!==undefined){
    if(!Array.isArray(tag.results)||tag.results.length>6)return invalidResponse()
    for(const value of tag.results){
      const member=asRecord(value)
      if(!member||!isMemberId(member.id)||!isText(member.nickname,80))return invalidResponse()
      results.push({id:member.id,nickname:member.nickname})
    }
  }
  if(tag.phase==='finished'){
    const ids=new Set(results.map(member=>member.id))
    if(!timed||tag.it===null||winnerIds.includes(tag.it)||!ids.has(tag.it)||
      !winnerIds.every(id=>ids.has(id))||ids.size!==winnerIds.length+1||results.length!==ids.size)
      return invalidResponse()
  }
  return {it:tag.it,previousIt:tag.previousIt,phase:tag.phase,hideUntil:tag.hideUntil,seq:tag.seq,
    endsAt:endsAt??0,serverNow,enrolledIds,winnerIds,results}
}
function parseCops(value:unknown):CopsState {
  const state=asRecord(value)
  if(!state||(state.phase!=='waiting'&&state.phase!=='hiding'&&state.phase!=='playing'&&state.phase!=='finished')||
    !isInteger(state.hideUntil,0,Number.MAX_SAFE_INTEGER)||!isInteger(state.endsAt,0,Number.MAX_SAFE_INTEGER)||
    !isInteger(state.serverNow,1,Number.MAX_SAFE_INTEGER)||!isInteger(state.seq,0,Number.MAX_SAFE_INTEGER)||
    (state.winner!==null&&state.winner!=='police'&&state.winner!=='robbers')||
    (state.phase==='finished')!==Boolean(state.winner)||!Array.isArray(state.results)||state.results.length>6)
    return invalidResponse()
  const results:CopsState['results']=[]
  for(const raw of state.results){
    const entry=asRecord(raw)
    if(!entry||!isMemberId(entry.id)||!isText(entry.nickname,80))return invalidResponse()
    results.push({id:entry.id,nickname:entry.nickname})
  }
  let event:CopsState['event']=null
  if(state.event!=null){
    const entry=asRecord(state.event)
    if(!entry||(entry.kind!=='capture'&&entry.kind!=='rescue')||!isMemberId(entry.by))return invalidResponse()
    event={kind:entry.kind,ids:tagIds(entry.ids),by:entry.by}
  }
  return {phase:state.phase,hideUntil:state.hideUntil,endsAt:state.endsAt,serverNow:state.serverNow,seq:state.seq,
    policeIds:tagIds(state.policeIds),jailedIds:tagIds(state.jailedIds),enrolledIds:tagIds(state.enrolledIds),
    winner:state.winner,winnerIds:tagIds(state.winnerIds),results,event}
}
function parseRides(value:unknown):RideSeat[] {
  if(value===undefined)return []
  if(!Array.isArray(value)||value.length>6)return invalidResponse()
  const seen=new Set<string>(), members=new Set<string>()
  return value.map(raw=>{
    const entry=asRecord(raw)
    if(!entry||(entry.id!=='swings'&&entry.id!=='seesaw')||!isInteger(entry.seat,0,entry.id==='swings'?1:3)||
      !isMemberId(entry.memberId)||!isNumber(entry.pump,-1,1))return invalidResponse()
    const key=entry.id+'/'+entry.seat
    if(seen.has(key)||members.has(entry.memberId))return invalidResponse()
    seen.add(key);members.add(entry.memberId)
    return {id:entry.id,seat:entry.seat,memberId:entry.memberId,pump:entry.pump}
  })
}
function parseFrame(value: unknown, since: number, id: string, sentEdit: boolean, room:RoomSummary) {
  const body = asRecord(value)
  if (!body || !isInteger(body.revision, since, Number.MAX_SAFE_INTEGER) ||
      !Array.isArray(body.cells) || body.cells.length > MAX_ROOM_CELLS ||
      !Array.isArray(body.players) || body.players.length > 6) return invalidResponse()
  const revision = body.revision
  const cells = body.cells.map(cell => parseCell(cell, since, revision))
  if (new Set(cells.map(cell => cell.key)).size !== cells.length ||
      (revision > since && !cells.some(cell => cell.revision === revision))) return invalidResponse()

  const ids = new Set([id])
  const players: RoomPlayer[] = []
  for (const value of body.players) {
    const peer = parsePlayer(value)
    if (!peer || ids.has(peer.id)) continue
    ids.add(peer.id)
    players.push(peer)
  }

  let result: EditOutcome | undefined
  if (sentEdit) {
    const outcome = asRecord(body.result)
    if (!outcome || typeof outcome.ok !== 'boolean') return invalidResponse()
    const reason = typeof outcome.reason === 'string' && /^[a-z-]{1,32}$/.test(outcome.reason) ? outcome.reason : undefined
    result = { ok: outcome.ok, ...(reason ? { reason } : {}) }
  }
  const modeState=room.mode==='tag'?{tag:parseTag(body.tag,!!room.tagMinutes)}:
    room.mode==='cops'?{cops:parseCops(body.cops),rides:parseRides(body.rides)}:{}
  return { frame: { revision, cells, players, ...modeState }, result }
}

function retryDelay(header: string | null) {
  if (!header) return 0
  const value = /^\d+$/.test(header) ? Number(header) * 1_000 : Date.parse(header) - Date.now()
  return Number.isFinite(value) ? Math.min(Math.max(value, 0), 60_000) : 0
}

type SyncRequest = {
  protocol: typeof PROTOCOL
  code: string
  token: string
  since: number
  pose: NetPose | null
  edit?: RoomEdit
  ride?:RideRequest|null
}

export class OnlineClient {
  private readonly origin: string

  constructor(apiOrigin: string, private readonly fetcher: typeof fetch = globalThis.fetch.bind(globalThis)) {
    const url = new URL(apiOrigin)
    const loopback = ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname)
    if (url.username || url.password || (url.protocol !== 'https:' && !(loopback && url.protocol === 'http:'))) {
      throw new Error('安全なマルチプレイ接続先を指定してください。')
    }
    this.origin = url.origin
  }

  async create(input: { name: string; seed: string; nickname: string; mode?: OnlineMode; tagMinutes?:TagMinutes; stage?:TerrainPreset;tagBots?:number }): Promise<RoomConnection> {
    const timed=input.mode!==undefined&&timedMode(input.mode)
    const connection=parseConnection(await this.request('rooms', {...input,protocol:PROTOCOL}))
    if((input.mode&&connection.room.mode!==input.mode)||(timed&&connection.room.tagMinutes!==(input.tagMinutes??5))||
      (input.stage&&connection.room.stage!==input.stage)||(input.tagBots??0)!==(connection.room.tagBots??0)){
      void this.leave(connection)
      throw new OnlineError(426,'mode-unavailable')
    }
    return connection
  }

  async join(input: { code: string; nickname: string }): Promise<RoomConnection> {
    return parseConnection(await this.request('join', {...input,protocol:PROTOCOL}))
  }

  start(connection: RoomConnection, hooks: RoomHooks): RoomSync {
    return new RoomSync(connection, hooks, (payload, signal) => this.request('sync', payload, signal), () => this.leave(connection))
  }

  async leave(connection: RoomConnection): Promise<void> {
    try { await this.request('leave', { code: connection.room.code, token: connection.token }, undefined, true) }
    catch { /* The member also expires if delivery is interrupted. */ }
  }

  private async request(path: string, data: object, signal?: AbortSignal, keepalive = false): Promise<unknown> {
    const controller = new AbortController()
    const cancel = () => controller.abort()
    if (signal?.aborted) cancel()
    const timeout = setTimeout(cancel, REQUEST_TIMEOUT)
    signal?.addEventListener('abort', cancel, { once: true })
    try {
      const response = await this.fetcher(this.origin + '/api/webcraft/' + path, {
        method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' },
        signal: controller.signal, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer',
        redirect: 'error', keepalive,
      })
      if (!response.ok) {
        const body = asRecord(await response.json().catch(() => undefined))
        const code = typeof body?.error === 'string' && /^[a-z0-9_-]{1,40}$/i.test(body.error) ? body.error : 'http'
        throw new OnlineError(response.status, code, retryDelay(response.headers.get('Retry-After')))
      }
      return await response.json().catch(() => invalidResponse())
    } catch (error) {
      throw error instanceof OnlineError ? error : new OnlineError(0, 'network')
    } finally {
      clearTimeout(timeout)
      signal?.removeEventListener('abort', cancel)
    }
  }
}

type PendingEdit = { edit: RoomEdit; resolve: (outcome: EditOutcome) => void }
const isHidden = () => typeof document !== 'undefined' && document.hidden

export class RoomSync {
  private currentState: OnlineState = 'connecting'
  private revision = 0
  private lastStart = -Infinity
  private retryAt = 0
  private failures = 0
  private timer: ReturnType<typeof setTimeout> | undefined
  private running: AbortController | undefined
  private pending: PendingEdit | undefined
  private sent: PendingEdit | undefined
  private closed = false
  private finished = false

  get state() { return this.currentState }

  constructor(
    private readonly connection: RoomConnection,
    private readonly hooks: RoomHooks,
    private readonly send: (data: SyncRequest, signal: AbortSignal) => Promise<unknown>,
    private readonly leave: () => Promise<void>,
  ) {
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', this.visibility)
    this.schedule(0)
  }

  edit(edit: RoomEdit): Promise<EditOutcome> {
    if (this.closed || this.state !== 'connected' || isHidden()) return Promise.resolve({ ok: false, reason: 'offline' })
    if (this.pending) return Promise.resolve({ ok: false, reason: 'busy' })
    return new Promise(resolve => {
      this.pending = { edit: { ...edit }, resolve }
      this.schedule(0)
    })
  }

  close() {
    if (this.closed) return
    this.stop()
    void this.leave()
  }

  private readonly visibility = () => {
    if (!isHidden()) {
      this.schedule(0)
      return
    }
    clearTimeout(this.timer)
    this.timer = undefined
    if (this.pending && this.pending !== this.sent) this.finishEdit({ ok: false, reason: 'interrupted' })
  }

  private updateState(state: OnlineState) {
    if (this.currentState === state) return
    this.currentState = state
    this.hooks.onState(state)
  }

  private schedule(delay: number) {
    if (this.closed || this.finished || this.running || isHidden()) return
    clearTimeout(this.timer)
    const now = performance.now()
    const minimum=timedMode(this.connection.room.mode)?TAG_POLL_INTERVAL:EDIT_INTERVAL
    const at = Math.max(now + delay, this.lastStart + minimum, this.retryAt)
    this.timer = setTimeout(() => { void this.tick() }, at - now)
  }

  private finishEdit(outcome: EditOutcome) {
    const pending = this.pending
    this.pending = undefined
    this.sent = undefined
    pending?.resolve(outcome)
  }

  private stop() {
    this.closed = true
    clearTimeout(this.timer)
    this.timer = undefined
    this.running?.abort()
    this.finishEdit({ ok: false, reason: 'closed' })
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', this.visibility)
  }

  private async tick() {
    this.timer = undefined
    if (this.closed || this.finished || this.running || isHidden()) return
    const request = new AbortController()
    this.running = request
    this.lastStart = performance.now()
    this.sent = this.pending
    const sent = this.sent, { room, token, id } = this.connection
    let attemptedEdit = false
    try {
      const pose = this.hooks.pose()
      const ride=this.hooks.ride?.()
      attemptedEdit = Boolean(sent && pose)
      if (sent && !attemptedEdit) this.finishEdit({ ok: false, reason: 'offline' })
      const payload = await this.send({
        protocol: PROTOCOL, code: room.code, token, since: this.revision, pose, ...(sent && pose ? { edit: sent.edit } : {}),
        ...(ride===undefined?{}:{ride}),
      }, request.signal)
      if (this.closed) return
      const { frame, result } = parseFrame(payload, this.revision, id, attemptedEdit, room)
      this.finished=frame.tag?.phase==='finished'||frame.cops?.phase==='finished'
      this.hooks.onFrame(frame)
      this.revision = frame.revision
      this.failures = this.retryAt = 0
      this.updateState('connected')
      if (sent && result) this.finishEdit(result)
    } catch (err) {
      if (this.closed) return
      const error = err instanceof OnlineError ? err : new OnlineError(0, 'invalid-response')
      if(error.status===400&&attemptedEdit&&sent?.edit.actionId){
        this.finishEdit({ok:false,reason:'invalid'})
        return
      }
      if ([400, 401, 403, 404, 409, 410, 426].includes(error.status)) {
        this.stop()
        this.hooks.onEnd?.(error)
        return
      }
      // A request that failed on the way back may have changed the world. Poll
      // the unchanged cursor again to learn the result without sending the edit twice.
      if (this.pending) this.finishEdit({ ok: false, reason: attemptedEdit ? 'uncertain' : 'offline' })
      this.updateState('reconnecting')
      this.failures = Math.min(this.failures + 1, 5)
      this.retryAt = performance.now() + Math.max(error.retryAfter, Math.min(MAX_BACKOFF, POLL_INTERVAL * 2 ** (this.failures - 1)))
    } finally {
      this.running = undefined
      const interval=timedMode(room.mode)?TAG_POLL_INTERVAL:POLL_INTERVAL
      if (!this.closed) this.schedule(this.pending ? 0 : Math.max(0, this.lastStart + interval - performance.now()))
    }
  }
}
