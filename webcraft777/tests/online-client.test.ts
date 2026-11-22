import assert from 'node:assert/strict'
import { test } from 'node:test'
import { OnlineClient, OnlineError, type NetPose, type OnlineState, type RoomConnection, type RoomEdit, type RoomFrame } from '../src/online-client'
import { TERRAIN_PRESETS } from '../src/stages'

const connection: RoomConnection = {
  room: { code: 'TEAM7777', name: '工作の島', seed: 'green-777', generator: 2, createdAt: 1784600000000, mode:'creative',stage:'classic' },
  id: 'local-player', token: 'test-private-member-session-1234',
}
const pose: NetPose = { x: 16, y: 33, z: 44, yaw: 0, moving: false, crouched: false, flying: false }
const edit: RoomEdit = { key: 655366, fromRevision: 0, before: 0, block: 7, axis: 'y' }
const empty = { revision: 0, cells: [], players: [] }
const changed = { revision: 1, cells: [{ key: edit.key, block: 7, axis: 'y', revision: 1 }], players: [] }

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>(done => { resolve = done })
  return { promise, resolve }
}

const json = (value: unknown, status = 200) => Response.json(value, { status })

test('部屋作成と参加の通信では参加トークンをURLへ載せず、異常応答を拒む', async () => {
  const calls: {path: string; body: unknown}[] = []
  const fetcher: typeof fetch = async (input, options) => {
    const url = new URL(String(input))
    assert.equal(url.search, '')
    assert.equal(options?.credentials, 'omit')
    calls.push({ path: url.pathname, body: JSON.parse(String(options?.body)) })
    if (url.pathname.endsWith('/rooms')) return json(connection)
    return json({ error: 'room_missing' }, 404)
  }
  const client = new OnlineClient('https://rooms.example.test', fetcher)
  const fields = { name: '工作の島', seed: 'green-777', nickname: 'あお' }
  assert.deepEqual(await client.create(fields), connection)
  await assert.rejects(() => client.join({ code: 'NOEXISTS', nickname: 'あお' }),
    err => err instanceof OnlineError && err.status === 404 && err.code === 'room_missing')
  assert.deepEqual(calls, [
    { path: '/api/webcraft/rooms', body: {...fields,protocol:10} },
    { path: '/api/webcraft/join', body: { code: 'NOEXISTS', nickname: 'あお', protocol:10 } },
  ])
  const malformed = new OnlineClient('http://127.0.0.1:8080', async () => json({ ...connection, token: 'short' }))
  await assert.rejects(() => malformed.create(fields),
    err => err instanceof OnlineError && err.code === 'invalid-response')
  assert.throws(() => new OnlineClient('http://rooms.example.test', fetcher))
})

test('同期した編集だけを適用し、編集は一つずつ送る', { timeout: 3_000 }, async t => {
  const ready = deferred<OnlineState>(), left = deferred<void>()
  const frames: RoomFrame[] = []
  const requests: unknown[] = []
  const fetcher: typeof fetch = async (url, options) => {
    if (String(url).endsWith('/leave')) {
      left.resolve()
      return json({ ok: true })
    }
    const body = JSON.parse(String(options?.body))
    requests.push(body)
    return body.edit ? json({ ...changed, result: { ok: true } }) : json(empty)
  }
  const sync = new OnlineClient('https://rooms.example.test', fetcher).start(connection, {
    pose: () => pose,
    onFrame: frame => frames.push(frame),
    onState: state => ready.resolve(state),
  })
  t.after(() => sync.close())
  assert.equal(await ready.promise, 'connected')
  const pending = sync.edit(edit)
  assert.deepEqual(await sync.edit({ ...edit, key: edit.key + 1 }), { ok: false, reason: 'busy' })
  assert.equal(frames.length, 1)
  assert.deepEqual(await pending, { ok: true })
  assert.deepEqual(frames, [empty, changed])
  assert.deepEqual(requests, [
    { protocol:10,code: connection.room.code, token: connection.token, since: 0, pose },
    { protocol:10,code: connection.room.code, token: connection.token, since: 0, pose, edit },
  ])
  sync.close()
  await left.promise
  assert.deepEqual(await sync.edit(edit), { ok: false, reason: 'offline' })
})

test('編集の応答が途切れても再送せず、差分で確定して不正なプレイヤーを除く', { timeout: 4_000 }, async t => {
  const ready = deferred<void>(), recovered = deferred<RoomFrame>()
  const states: OnlineState[] = []
  const syncRequests: { since: number; edit?: RoomEdit }[] = []
  const peer = { id: 'peer', nickname: 'みどり', pose }
  const fetcher: typeof fetch = async (url, options) => {
    if (String(url).endsWith('/leave')) return json({ ok: true })
    const body = JSON.parse(String(options?.body))
    syncRequests.push(body)
    if (syncRequests.length === 1) return json(empty)
    if (body.edit) throw new TypeError('request interrupted after server commit')
    return json({ ...changed, players: [peer, peer, { ...peer, id: 'bad-pose', pose: { ...pose, z: -1 } }] })
  }
  const sync = new OnlineClient('https://rooms.example.test', fetcher).start(connection, {
    pose: () => pose,
    onFrame: frame => { if (frame.revision === 1) recovered.resolve(frame) },
    onState: state => {
      states.push(state)
      if (state === 'connected') ready.resolve()
    },
  })
  t.after(() => sync.close())
  await ready.promise
  assert.deepEqual(await sync.edit(edit), { ok: false, reason: 'uncertain' })
  assert.deepEqual(await recovered.promise, { ...changed, players: [peer] })
  assert.deepEqual(states, ['connected', 'reconnecting', 'connected'])
  assert.equal(syncRequests.filter(request => request.edit).length, 1)
  assert.equal(syncRequests[2].since, 0)
})

test('共有の遊具ブロックは向きを表すIDを保持する', { timeout: 3_000 }, async t => {
  const ready=deferred<RoomFrame>()
  const cells=Array.from({length:7},(_,index)=>({
    key:edit.key+index,block:27+index,axis:'y' as const,revision:index+1,
  }))
  const sync=new OnlineClient('https://rooms.example.test',async (url)=>json(
    String(url).endsWith('/leave')?{ok:true}:{revision:7,cells,players:[]}
  )).start(connection,{
    pose:()=>pose,
    onFrame:frame=>ready.resolve(frame),
    onState:()=>{},
  })
  t.after(()=>sync.close())
  assert.deepEqual((await ready.promise).cells,cells)
})

test('学校の鬼ごっこはステージと終了結果を保持し、ルーム退出まで追跡の通信を止める', {timeout:3_000}, async t => {
  const match:RoomConnection={...connection,room:{...connection.room,mode:'tag',tagMinutes:1,stage:'school'}}
  const end=1784600068000
  const result={it:'peer',previousIt:'local-player',phase:'finished',hideUntil:end-60_000,endsAt:end,
    serverNow:end+4,seq:4,enrolledIds:['peer','local-player'],winnerIds:['local-player'],
    results:[{id:'peer',nickname:'あお'},{id:'local-player',nickname:'はる'}]}
  const received=deferred<RoomFrame>(),left=deferred<void>()
  let polls=0
  const client=new OnlineClient('https://rooms.example.test',async (url,options)=>{
    const path=new URL(String(url)).pathname
    if(path.endsWith('/leave')){left.resolve();return json({ok:true})}
    const body=JSON.parse(String(options?.body))
    assert.equal(body.protocol,10)
    if(path.endsWith('/rooms')){assert.equal(body.tagMinutes,1);assert.equal(body.stage,'school');return json(match)}
    if(path.endsWith('/join'))return json(match)
    polls++
    return json({...empty,tag:result})
  })
  const created=await client.create({name:match.room.name,seed:match.room.seed,nickname:'はる',mode:'tag',tagMinutes:1,stage:'school'})
  assert.equal(created.room.stage,'school')
  assert.equal((await client.join({code:match.room.code,nickname:'あお'})).room.stage,'school')
  const sync=client.start(created,{pose:()=>pose,onFrame:frame=>received.resolve(frame),onState:()=>{}})
  t.after(()=>sync.close())
  assert.deepEqual((await received.promise).tag,result)
  await new Promise(resolve=>setTimeout(resolve,315))
  assert.equal(polls,1)
  sync.close()
  await left.promise
})

test('追跡ルームは同期した時刻を送信し、対戦相手の位置の古さを補間に渡す', {timeout:3_000}, async t=>{
  const match:RoomConnection={...connection,room:{...connection.room,mode:'tag',tagMinutes:1,stage:'flat'}}
  const clockBase=1_840_000_000_000, frames:RoomFrame[]=[], requests:Record<string,unknown>[]=[]
  const ready=deferred<void>()
  const sync=new OnlineClient('https://rooms.example.test',async(url,options)=>{
    if(String(url).endsWith('/leave'))return json({ok:true})
    requests.push(JSON.parse(String(options?.body)))
    const serverNow=clockBase+Math.round(performance.now())
    const players=[{id:'peer',nickname:'あお',pose,poseAt:serverNow-155},
      {id:'legacy-peer',nickname:'しろ',pose,poseAt:'invalid'}]
    return json({...empty,players,tag:{it:'local-player',previousIt:null,phase:'playing',hideUntil:clockBase,endsAt:clockBase+60_000,
      serverNow,seq:2,enrolledIds:['local-player','peer','legacy-peer'],winnerIds:[],results:[]}})
  }).start(match,{
    pose:()=>requests.length<2?pose:null,
    onState:()=>{},
    onFrame:frame=>{frames.push(frame);if(frames.length===3)ready.resolve()},
  })
  t.after(()=>sync.close())
  await ready.promise
  assert.equal('sampleAt' in requests[0],false)
  assert.equal('sampleAt' in requests[2],false, 'no timestamp is sent without a pose')
  assert.ok(typeof requests[1].sampleAt==='number'&&Number.isSafeInteger(requests[1].sampleAt))
  assert.ok(Math.abs(requests[1].sampleAt-frames[1].tag!.serverNow!)<90)
  const [peer,oldPeer]=frames[0].players
  assert.equal(peer.poseAt,frames[0].tag!.serverNow!-155)
  assert.ok(peer.sampleAgeMs!>=155&&peer.sampleAgeMs!<245)
  assert.equal(oldPeer.sampleAgeMs,undefined)
})

test('招待先の地形を検証し、旧ルームは森と湖として復元する',async()=>{
  const {stage:_,...oldRoom}=connection.room
  const backup={...connection,room:oldRoom}
  const old=new OnlineClient('https://rooms.example.test',async ()=>json(backup))
  assert.equal((await old.join({code:connection.room.code,nickname:'あお'})).room.stage,'classic')
  await assert.rejects(()=>old.create({name:'湖へ',seed:'lake-test',nickname:'はる',stage:'lake'}),
    error=>error instanceof OnlineError&&error.code==='mode-unavailable')
  const malformed=new OnlineClient('https://rooms.example.test',async ()=>json({...backup,room:{...oldRoom,stage:'void'}}))
  await assert.rejects(()=>malformed.join({code:connection.room.code,nickname:'あお'}),
    error=>error instanceof OnlineError&&error.code==='invalid-response')
})

test('全オンラインモードで7ステージのルーム作成・入室を受け取れる',async()=>{
  for(const mode of ['creative','explore','tag','cops'] as const){
    for(const {id:stage} of TERRAIN_PRESETS){
      const rules=mode==='tag'||mode==='cops'?{tagMinutes:5 as const}:{}
      const room={...connection.room,mode,stage,...rules}
      const client=new OnlineClient('https://rooms.example.test',async()=>json({...connection,room}))
      const created=await client.create({name:room.name,seed:room.seed,nickname:'はる',mode,stage,...rules})
      assert.equal(created.room.stage,stage)
      const joined=await client.join({code:room.code,nickname:'あお'})
      assert.deepEqual(joined.room,created.room)
    }
  }
})

test('ドロケイの公園と渋谷でCPUの人数、役割、救出イベントを受け取れる', {timeout:3_000}, async t=>{
  for(const stage of ['park','crossing'] as const){
    const match:RoomConnection={...connection,room:{...connection.room,mode:'cops',stage,tagMinutes:1,tagBots:2}}
    const ready=deferred<RoomFrame>(),clock=1784600000000
    const peers=[{id:'cpu-1',nickname:'CPU 1',cpu:true,pose},{id:'cpu-2',nickname:'CPU 2',cpu:true,pose}]
    const client=new OnlineClient('https://rooms.example.test',async(url,options)=>{
      if(String(url).endsWith('/leave'))return json({ok:true})
      const body=JSON.parse(String(options?.body))
      assert.equal(body.protocol,10)
      if(String(url).endsWith('/rooms')){
        assert.equal(body.stage,stage)
        assert.equal(body.tagBots,2)
        return json(match)
      }
      return json({...empty,players:peers,cops:{phase:'playing',hideUntil:clock,endsAt:clock+60_000,serverNow:clock+3000,
        seq:3,policeIds:['cpu-1'],jailedIds:[],enrolledIds:['cpu-1','cpu-2',match.id],winner:null,winnerIds:[],results:[],
        event:{kind:'rescue',ids:[match.id],by:'cpu-2'}}})
    })
    const created=await client.create({name:match.room.name,seed:match.room.seed,nickname:'はる',mode:'cops',stage,tagMinutes:1,tagBots:2})
    assert.equal(created.room.tagBots,2)
    const sync=client.start(created,{pose:()=>pose,onFrame:frame=>ready.resolve(frame),onState:()=>{}})
    t.after(()=>sync.close())
    const frame=await ready.promise
    assert.deepEqual(frame.players,peers)
    assert.deepEqual(frame.cops?.policeIds,['cpu-1'])
    assert.equal(frame.cops?.event?.by,'cpu-2')
    sync.close()
  }
})

test('非表示中は同期を始めず、復帰して部屋が失効していた場合は終了する', { timeout: 3_000 }, async t => {
  const document = Object.assign(new EventTarget(), { hidden: true })
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'document')
  Object.defineProperty(globalThis, 'document', { configurable: true, value: document })
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, 'document', descriptor)
    else Reflect.deleteProperty(globalThis, 'document')
  })
  let polls = 0
  const ended = deferred<OnlineError>()
  const sync = new OnlineClient('https://rooms.example.test', async () => {
    polls++
    return json({ error: 'session_expired' }, 401)
  }).start(connection, {
    pose: () => pose,
    onFrame: () => assert.fail('expired sessions have no frame'),
    onState: () => assert.fail('expired sessions do not retry'),
    onEnd: error => ended.resolve(error),
  })
  t.after(() => sync.close())
  await new Promise(resolve => setTimeout(resolve, 15))
  assert.equal(polls, 0)
  document.hidden = false
  document.dispatchEvent(new Event('visibilitychange'))
  assert.equal((await ended.promise).status, 401)
  assert.equal(polls, 1)
})
