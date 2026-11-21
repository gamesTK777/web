import assert from 'node:assert/strict'
import { test } from 'node:test'
import { OnlineClient, OnlineError, type NetPose, type OnlineState, type RoomConnection, type RoomEdit, type RoomFrame } from '../src/online-client'

const connection: RoomConnection = {
  room: { code: 'TEAM7777', name: '工作の島', seed: 'green-777', generator: 2, createdAt: 1784600000000, mode:'creative' },
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
    { path: '/api/webcraft/rooms', body: fields },
    { path: '/api/webcraft/join', body: { code: 'NOEXISTS', nickname: 'あお', protocol:2 } },
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
    { protocol:2,code: connection.room.code, token: connection.token, since: 0, pose },
    { protocol:2,code: connection.room.code, token: connection.token, since: 0, pose, edit },
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
