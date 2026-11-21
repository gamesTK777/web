import {test} from 'node:test'
import assert from 'node:assert/strict'
import {handleWebcraft} from './room-service.mjs'
import {createLocalRoomDb} from './sqlite-d1.mjs'

const origin = 'https://gamestk777.github.io'
const epoch = 1_799_000_000_000
const day = 86_400_000
const voxel = (x, y, z) => x + 256 * z + 65536 * y
const pose = (x = 128.5, y = 33, z = 130.5) => ({x,y,z,yaw:1,moving:true,crouched:false,flying:false})

function env(t) {
  const {db, sql, close} = createLocalRoomDb()
  t.after(close)
  function run(path, data, opts = {}) {
    const body = data === undefined ? undefined : JSON.stringify(data)
    return handleWebcraft(new Request('https://api.example.test/api/webcraft/' + path, {
      method:opts.method ?? 'POST',
      headers:{'Content-Type':'application/json', Origin:opts.origin ?? origin, ...opts.headers},
      body:opts.rawBody ?? body
    }), db, {now:opts.now ?? epoch})
  }
  async function create(nickname = '作り手') {
    const res = await run('rooms', {name:'みんなの丘', seed:'hill', nickname})
    assert.equal(res.status, 201)
    return res.json()
  }
  async function join(host, nickname = '建築仲間', now = epoch) {
    return run('join', {code:host.room.code, nickname}, {now})
  }
  async function sync(actor, {since=0, at=pose(), edit, now=epoch} = {}) {
    return run('sync', {code:actor.room.code, token:actor.token, since, pose:at, edit}, {now})
  }
  return {sql,run,create,join,sync}
}

test('room code, seeds, and player positions work with distinct room-only credentials', async t => {
  const {sql,run,create,join,sync} = env(t)
  const host = await create()
  const visitorRes = await join(host)
  assert.equal(visitorRes.status, 200)
  const visitor = await visitorRes.json()
  assert.match(host.room.code, /^[A-HJ-NP-Z2-9]{8}$/)
  assert.deepEqual(host.room, visitor.room)
  assert.equal(host.room.seed, 'hill')
  assert.notEqual(host.id, visitor.id)
  assert.match(host.token, /^[a-f0-9]{64}$/)
  assert.notEqual(host.token, visitor.token)
  assert.equal(sql.prepare('SELECT token_hash FROM webcraft_members WHERE id=?').get(host.id).token_hash === host.token, false)
  assert.deepEqual(await (await sync(host)).json(), {revision:0,cells:[],players:[]})
  const {players} = await (await sync(visitor, {at:pose(131.5)})).json()
  assert.deepEqual(players, [{id:host.id, nickname:'作り手', pose:pose()}])
  assert.equal((await sync({...host,token:'a'.repeat(64)})).status, 401)
  const another = await create('招待先')
  const cross = await run('sync', {code:another.room.code, token:host.token, since:0, pose:pose()})
  assert.equal(cross.status, 401)
})

test('concurrent edits use one cell revision, and later snapshots include placements and removals', async t => {
  const {create,join,sync} = env(t)
  const host = await create()
  const visitor = await (await join(host)).json()
  const key = voxel(133,33,130)
  const [a,b] = await Promise.all([
    sync(host, {edit:{key,fromRevision:0,before:0,block:5,axis:'x'}}),
    sync(visitor, {edit:{key,fromRevision:0,before:0,block:3,axis:'y'}})
  ].map(response => response.then(r => r.json())))
  assert.deepEqual([a.result.ok,b.result.ok].sort(), [false,true])
  assert.equal((a.result.ok ? b : a).result.reason, 'conflict')
  const placed = (a.result.ok ? a : b).cells[0]
  assert.equal(placed.revision, 1)
  assert.equal(placed.key, key)
  assert.equal(placed.axis, placed.block === 5 ? 'x' : 'y')
  const before = await (await sync(visitor,{since:1})).json()
  assert.deepEqual(before.cells, [])
  const deleted = await (await sync(host, {since:1,
    edit:{key,fromRevision:1,before:placed.block,block:0,axis:'y'}})).json()
  assert.deepEqual(deleted.cells, [{key,block:0,axis:'y',revision:2}])
  assert.equal(deleted.result.ok, true)
  const snapshot = await (await sync(visitor)).json()
  assert.equal(snapshot.revision, 2)
  assert.deepEqual(snapshot.cells, [{key,block:0,axis:'y',revision:2}])

  const first = voxel(132,33,129), second = voxel(132,33,130)
  const edits = [first, second].map(key => ({key,fromRevision:0,before:0,block:8,axis:'y'}))
  const results = await Promise.all([
    sync(host,{since:2,edit:edits[0]}),
    sync(visitor,{since:2,edit:edits[1]})
  ].map(response => response.then(r => r.json())))
  assert.ok(results.every(({result}) => result.ok))
  const simultaneous = await (await sync(host,{since:2})).json()
  assert.equal(simultaneous.revision, 4)
  assert.deepEqual(simultaneous.cells.map(cell => cell.revision), [3,4])
  assert.deepEqual(simultaneous.cells.map(cell => cell.key).sort(), [first,second])
})

test('edits validate bedrock, range, space occupied by a player and cursor before committing', async t => {
  const {create,join,sync} = env(t)
  const host = await create()
  const visitor = await (await join(host)).json()
  const key = voxel(132,33,130)
  await sync(visitor,{at:pose(132.5)})
  const near = {key,fromRevision:0,before:0,block:8,axis:'y'}
  const blocked = await (await sync(host,{edit:near})).json()
  assert.deepEqual(blocked.result,{ok:false,reason:'blocked'})
  assert.equal(blocked.revision, 0)
  const far = await (await sync(host,{edit:{...near,key:voxel(210,33,180)}})).json()
  assert.deepEqual(far.result,{ok:false,reason:'range'})
  assert.equal((await sync(host,{edit:{...near,key:voxel(132,0,130)}})).status, 400)
  assert.equal((await sync(host,{edit:{...near,block:24}})).status, 400)
  assert.equal((await sync(host,{edit:{...near,block:22}})).status, 400)
  assert.equal((await sync(host,{edit:{...near,axis:'x'}})).status, 400)
  assert.equal((await sync(host,{since:100,edit:near})).status, 400)
  assert.equal((await (await sync(host)).json()).revision, 0)
})

test('only six participant tokens admit at a time, stale seats and departed seats are reusable', async t => {
  const {run,create,join,sync} = env(t)
  const host = await create()
  const joinAttempts = await Promise.all(Array.from({length:7},(_,i) => join(host, '参加者' + i)))
  assert.equal(joinAttempts.filter(res => res.status === 200).length, 5)
  assert.equal(joinAttempts.filter(res => res.status === 409).length, 2)
  assert.equal((await run('leave', {code:host.room.code,token:host.token})).status, 200)
  assert.equal((await sync(host)).status, 401)
  assert.equal((await join(host, '交代')).status, 200)
  assert.equal((await join(host, '待つ')).status, 409)
  const current = await join(host, '新しい仲間', epoch + 21_000)
  assert.equal(current.status, 200)
  const active = await current.json()
  const {players} = await (await sync(active,{now:epoch+21_000})).json()
  assert.deepEqual(players,[])
})

test('rooms retain edits after closing, expire after inactivity, and reject disallowed origins and large inputs', async t => {
  const {run,create,join,sync} = env(t)
  const host = await create()
  const key = voxel(133,33,130)
  const edit = {key,fromRevision:0,before:0,block:8,axis:'y'}
  assert.equal((await (await sync(host,{edit})).json()).revision, 1)
  await run('leave',{code:host.room.code,token:host.token})
  const reopen = await (await join(host,'続き',epoch + 7_200_000)).json()
  const {cells} = await (await sync(reopen,{now:epoch + 7_200_000})).json()
  assert.deepEqual(cells,[{key,block:8,axis:'y',revision:1}])
  assert.equal((await join(host,'期限切れ',epoch + 7_200_001 + day)).status,410)
  const preflight = await run('rooms',undefined,{method:'OPTIONS',origin:'http://127.0.0.1:8000'})
  assert.equal(preflight.status,204)
  assert.equal(preflight.headers.get('Access-Control-Allow-Origin'),'http://127.0.0.1:8000')
  const denied = await run('rooms',undefined,{method:'OPTIONS',origin:'https://other.example.test'})
  assert.equal(denied.status,403)
  assert.equal(denied.headers.get('Access-Control-Allow-Origin'),null)
  assert.equal((await run('rooms',undefined,{rawBody:' '.repeat(4097)})).status,413)
  assert.equal((await run('rooms',undefined,{rawBody:'{'})).status,400)
})
