const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const roomPattern = /^[A-HJ-NP-Z2-9]{8}$/
const tokenPattern = /^[a-f0-9]{64}$/
const actionPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
const publicOrigin = 'https://gamestk777.github.io'
const localOrigin = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]{1,5})?$/
const lifetime = 24 * 60 * 60 * 1000
const presence = 20_000
const tagPresence = 4000
const tagSamples = 750
const tagSkew = 450
const hideTime = 8000
const tagCooldown = 2500
const tagReach = .68
const playersLimit = 6
const roomLimit = 128
const cellsLimit = 8192
const maxBody = 4096
const size = 256
const height = 96
const area = size * size
const paths = new Set(['rooms', 'join', 'sync', 'leave'])

class RoomError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.status = status
  }
}

const prepared = (db, sql, ...values) => db.prepare(sql).bind(...values)
const changed = result => result.meta.changes > 0
const wireProtocol = value => value === 3 ? 3 : value === 2 ? 2 : 1
const publicMode = room => room.tag_enabled ? 'tag' : room.mode
const minimumProtocol = `CASE WHEN tag_enabled=1 THEN 3 WHEN mode='explore' THEN 2 ELSE 1 END`
const validBlock = n => Number.isInteger(n) && ((n >= 1 && n <= 12) || n === 23 || (n >= 25 && n <= 33))
const clean = (value, max, label) => {
  if (typeof value !== 'string') throw new RoomError(label + 'を入力してください。')
  const safe = value.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').trim()
  const chars = Array.from(safe)
  if (!chars.length || chars.length > max) throw new RoomError(label + 'は1〜' + max + '文字で入力してください。')
  return safe
}
const hex = bytes => Array.from(bytes, n => n.toString(16).padStart(2, '0')).join('')
const hash = async value => hex(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))))
const makeCode = () => Array.from(crypto.getRandomValues(new Uint8Array(8)), n => alphabet[n % alphabet.length]).join('')

function roomCode(value) {
  const code = typeof value === 'string' ? value.trim().toUpperCase() : ''
  if (!roomPattern.test(code)) throw new RoomError('8文字のルームコードを確認してください。')
  return code
}

async function newSeat(nickname) {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)))
  return {id:crypto.randomUUID(), token, hash:await hash(token), nickname:clean(nickname, 16, 'ニックネーム')}
}

function publicRoom(row, seat) {
  return {
    room: {code:row.code, name:row.name, seed:row.seed, generator:2, createdAt:row.created_at, mode:publicMode(row)},
    id:seat.id, token:seat.token
  }
}

function checkRoom(room, now) {
  if (!room) throw new RoomError('ルームが見つかりません。コードを確認してください。', 404)
  if (room.expires_at <= now) throw new RoomError('ルームの有効期限が切れました。', 410)
}

function checkProtocol(room, protocol) {
  if (room.tag_enabled && protocol < 3) {
    throw new RoomError('かくれ鬼ルームに入るには、ゲーム画面を再読み込みしてください。', 426)
  }
  if (room.mode === 'explore' && protocol < 2) {
    throw new RoomError('探索ルームに入るには、ゲーム画面を再読み込みしてください。', 426)
  }
}

async function readJson(request) {
  const type = request.headers.get('Content-Type')?.split(';', 1)[0].trim().toLowerCase()
  if (type !== 'application/json') throw new RoomError('リクエストの形式が不正です。', 415)
  if (!request.body) throw new RoomError('リクエストが空です。')
  if (Number(request.headers.get('Content-Length')) > maxBody) {
    throw new RoomError('リクエストが大きすぎます。', 413)
  }
  const reader = request.body.getReader()
  const decoder = new TextDecoder('utf-8', {fatal:true})
  let size = 0
  let json = ''
  try {
    while (true) {
      const {done, value} = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBody) {
        await reader.cancel()
        throw new RoomError('リクエストが大きすぎます。', 413)
      }
      json += decoder.decode(value, {stream:true})
    }
    const body = JSON.parse(json + decoder.decode())
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new SyntaxError()
    return body
  } catch (error) {
    if (error instanceof RoomError) throw error
    throw new RoomError('リクエストの形式が不正です。')
  } finally {
    reader.releaseLock()
  }
}

function cleanPose(pose) {
  if (pose === null) return null
  if (!pose || ![pose.x, pose.y, pose.z, pose.yaw].every(Number.isFinite) ||
      pose.x < 0 || pose.x >= size || pose.z < 0 || pose.z >= size ||
      pose.y < 0 || pose.y > height || Math.abs(pose.yaw) > 2 * Math.PI ||
      [pose.moving, pose.crouched, pose.flying].some(flag => typeof flag !== 'boolean')) {
    throw new RoomError('位置情報が不正です。')
  }
  const snap = value => Math.round(value * 10000) / 10000
  return {x:snap(pose.x), y:snap(pose.y), z:snap(pose.z), yaw:snap(pose.yaw),
    moving:pose.moving, crouched:pose.crouched, flying:pose.flying}
}

function cleanEdit(edit) {
  if (!edit || !Number.isSafeInteger(edit.key) || edit.key < area ||
      edit.key >= area * height || !Number.isSafeInteger(edit.fromRevision) ||
      edit.fromRevision < 0 || !['x', 'y', 'z'].includes(edit.axis)) {
    throw new RoomError('ブロックの編集内容が不正です。')
  }
  if (edit.actionId !== undefined && (typeof edit.actionId !== 'string' || !actionPattern.test(edit.actionId))) {
    throw new RoomError('ブロック編集の識別子が不正です。')
  }
  const mine = edit.block === 0 && (validBlock(edit.before) || edit.before === 21)
  const place = (validBlock(edit.block) || edit.block === 21) && (edit.before === 0 || edit.before === 13)
  if ((!mine && !place) || (edit.block !== 5 && edit.axis !== 'y')) {
    throw new RoomError('このブロックは編集できません。')
  }
  return {key:edit.key, before:edit.before, fromRevision:edit.fromRevision, block:edit.block, axis:edit.axis,
    actionId:edit.actionId?.toLowerCase() ?? null, workbench:edit.before === 21 || edit.block === 21,
    x:edit.key % size, y:Math.floor(edit.key / area), z:Math.floor(edit.key / size) % size}
}

function canReach(p, e) {
  if (!p) return false
  const delta = (eye, min) => Math.max(min - eye, eye - min - 1, 0)
  const eyeY = p.y + (p.crouched ? .85 : 1.62)
  return Math.hypot(delta(p.x, e.x), delta(eyeY, e.y), delta(p.z, e.z)) <= 6.25
}

const tagFields = 'it,phase,hide_until,seq,previous_it,protected_until'
const roomInfo = `SELECT r.code,r.name,r.seed,r.created_at,r.expires_at,r.revision,r.cell_count,r.mode,r.tag_enabled,r.creator,${tagFields}
  FROM webcraft_rooms r LEFT JOIN webcraft_tag_state t ON t.room_code=r.code WHERE r.code=?`
const addSeat = `INSERT INTO webcraft_members(room_code,token_hash,id,nickname,last_seen)
  SELECT code,?,?,?,? FROM webcraft_rooms`

async function createRoom(db, body, now) {
  const name = clean(body.name, 40, 'ワールド名')
  const seed = body.seed == null || body.seed === '' ? makeCode() : clean(body.seed, 64, 'シード')
  const requested = body.mode === undefined ? 'creative' : body.mode
  if (!['creative', 'explore', 'tag'].includes(requested)) throw new RoomError('ゲームモードが不正です。')
  const mode = requested === 'tag' ? 'creative' : requested
  const tagEnabled = Number(requested === 'tag')
  if (tagEnabled) checkProtocol({tag_enabled:1}, wireProtocol(body.protocol))
  const seat = await newSeat(body.nickname)
  const cleanup = prepared(db, `DELETE FROM webcraft_rooms WHERE code IN
    (SELECT code FROM webcraft_rooms WHERE expires_at<=? ORDER BY expires_at LIMIT 4)`, now)
  for (let attempt = 0; attempt < 4; attempt++) {
    const code = makeCode()
    const statements = [
      prepared(db, `INSERT OR IGNORE INTO webcraft_rooms(code,creator,name,seed,created_at,expires_at,mode,tag_enabled)
        SELECT ?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM webcraft_rooms)< ?`,
      code, seat.id, name, seed, now, now + lifetime, mode, tagEnabled, roomLimit),
      prepared(db, addSeat + ' WHERE code=? AND creator=?', seat.hash, seat.id, seat.nickname, now, code, seat.id)
    ]
    if (tagEnabled) statements.push(prepared(db, `INSERT INTO webcraft_tag_state(room_code)
      SELECT code FROM webcraft_rooms WHERE code=? AND creator=?`, code, seat.id))
    const [created] = await db.batch([...statements, cleanup])
    if (changed(created)) return publicRoom({code, name, seed, created_at:now, mode, tag_enabled:tagEnabled}, seat)
  }
  throw new RoomError('現在ルームの空きがありません。少し待ってから再試行してください。', 503)
}

async function joinRoom(db, body, now) {
  const code = roomCode(body.code)
  const seat = await newSeat(body.nickname)
  const protocol = wireProtocol(body.protocol)
  const [, inserted, , info] = await db.batch([
    prepared(db, `DELETE FROM webcraft_members WHERE room_code=? AND last_seen<=?
      AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND ?>=${minimumProtocol})`,
    code, now - presence, code, protocol),
    prepared(db, addSeat + ` WHERE code=? AND expires_at>? AND ?>=${minimumProtocol}
      AND (SELECT COUNT(*) FROM webcraft_members WHERE room_code=?) < ?`,
    seat.hash, seat.id, seat.nickname, now, code, now, protocol, code, playersLimit),
    refreshExpiry(db,code,seat.hash,now,protocol),
    prepared(db, roomInfo, code)
  ])
  const room = info.results[0]
  checkRoom(room, now)
  checkProtocol(room, protocol)
  if (!changed(inserted)) throw new RoomError('このルームは満員です（最大6人）。', 409)
  return publicRoom(room, seat)
}

const authenticated = 'EXISTS(SELECT 1 FROM webcraft_members WHERE room_code=? AND token_hash=?)'

function refreshExpiry(db,code,digest,now,protocol) {
  return prepared(db, `UPDATE webcraft_rooms SET expires_at=? WHERE code=? AND expires_at>? AND expires_at<=?
    AND ?>=${minimumProtocol} AND ${authenticated}`,
    now + lifetime, code, now, now + lifetime - 60000, protocol, code, digest)
}

function editStatement(db, code, digest, edit, since, now, protocol) {
  const {key, fromRevision, before, block, axis, actionId, workbench, x, y, z} = edit
  // Edit, revision and receipt are committed by the same SQLite statement.
  return prepared(db, `INSERT INTO webcraft_cells(room_code,voxel,block,axis,revision,action_id)
    SELECT r.code,?,?,?,r.revision+1,? FROM webcraft_rooms r
    WHERE r.code=? AND r.expires_at>? AND r.revision>=? AND ${authenticated}
    AND r.tag_enabled=0 AND (r.mode='creative' OR (?>=2 AND ? IS NOT NULL))
    AND (r.mode='explore' OR ?=0)
    AND (? IS NULL OR NOT EXISTS(SELECT 1 FROM webcraft_edit_receipts WHERE room_code=r.code AND action_id=?))
    AND ((?=0 AND r.cell_count<?) OR (? > 0 AND EXISTS(
      SELECT 1 FROM webcraft_cells WHERE room_code=r.code AND voxel=? AND revision=? AND block=?
    )))
    AND (?=0 OR NOT EXISTS(
      SELECT 1 FROM webcraft_members m WHERE m.room_code=r.code AND m.last_seen>? AND m.pose IS NOT NULL
      AND json_extract(m.pose,'$.x')>? AND json_extract(m.pose,'$.x')<?
      AND json_extract(m.pose,'$.z')>? AND json_extract(m.pose,'$.z')<?
      AND json_extract(m.pose,'$.y')<?
      AND json_extract(m.pose,'$.y')+CASE json_extract(m.pose,'$.crouched') WHEN 1 THEN 1 ELSE 1.82 END>?
    ))
    ON CONFLICT(room_code,voxel) DO UPDATE SET block=excluded.block,axis=excluded.axis,
      revision=excluded.revision,action_id=excluded.action_id
    WHERE webcraft_cells.revision=? AND webcraft_cells.block=?`,
  key, block, axis, actionId, code, now, since, code, digest, protocol, actionId, Number(workbench), actionId, actionId,
  fromRevision, cellsLimit, fromRevision, key, fromRevision, before,
  block, now - 2500, x - .31, x + 1.31, z - .31, z + 1.31, y + 1, y, fromRevision, before)
}

const activePlayers = `SELECT id,nickname,pose,pose_at,previous_pose,previous_pose_at FROM webcraft_members WHERE room_code=?
  AND last_seen>? AND pose IS NOT NULL AND ${authenticated}`
const activeCells = `SELECT voxel AS key,block,axis,revision FROM webcraft_cells
  WHERE room_code=? AND revision>? AND ${authenticated} ORDER BY revision`

function poseStatement(db,code,digest,now,poseText,protocol) {
  return prepared(db, `UPDATE webcraft_members AS m SET
    last_seen=MAX(m.last_seen,tick.time), pose=COALESCE(tick.pose,m.pose),
    previous_pose=CASE WHEN r.tag_enabled=1 AND tick.pose IS NOT NULL THEN m.pose ELSE m.previous_pose END,
    previous_pose_at=CASE WHEN r.tag_enabled=1 AND tick.pose IS NOT NULL THEN m.pose_at ELSE m.previous_pose_at END,
    pose_at=CASE WHEN r.tag_enabled=1 AND tick.pose IS NOT NULL THEN tick.time ELSE m.pose_at END
    FROM webcraft_rooms r CROSS JOIN (SELECT ? AS time,? AS pose) tick
    WHERE m.room_code=r.code AND r.code=? AND m.token_hash=? AND r.expires_at>tick.time AND ?>=${minimumProtocol}
    AND CASE WHEN r.tag_enabled=1 AND tick.pose IS NOT NULL THEN m.pose_at<tick.time
      ELSE m.last_seen<=tick.time-4000 OR (tick.pose IS NOT NULL AND m.pose IS NOT tick.pose) END`,
  now, poseText, code, digest, protocol)
}

const bodyHeight = pose => pose.crouched ? 1 : 1.82
const mix = (from, to, part) => from + (to - from) * part
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)

function movement(row) {
  if (!row.previous_pose || row.previous_pose_at <= 0) return null
  const span = row.pose_at - row.previous_pose_at
  if (span <= 0 || span > tagSamples) return null
  const from = JSON.parse(row.previous_pose)
  if (distance(from, row.current) > .5 + 22 * span / 1000) return null
  return {from, to:row.current, start:row.previous_pose_at, end:row.pose_at, span,
    height:Math.min(bodyHeight(from), bodyHeight(row.current))}
}

function sampledPosition(track, time) {
  const part = (time - track.start) / track.span
  return {x:mix(track.from.x, track.to.x, part), y:mix(track.from.y, track.to.y, part),
    z:mix(track.from.z, track.to.z, part)}
}

function bodiesTouch(a, b, earliest) {
  if (a.pose_at < earliest || b.pose_at < earliest || Math.abs(a.pose_at - b.pose_at) > tagSkew) return false
  const am = movement(a)
  const bm = movement(b)
  const start = am && bm ? Math.max(am.start, bm.start, earliest) : Infinity
  const end = Math.min(a.pose_at, b.pose_at)
  if (start > end) {
    if (Math.abs(a.pose_at - b.pose_at) > 120) return false
    return a.current.y < b.current.y + bodyHeight(b.current) && b.current.y < a.current.y + bodyHeight(a.current) &&
      Math.hypot(a.current.x - b.current.x, a.current.z - b.current.z) <= tagReach
  }
  const a0 = sampledPosition(am, start), b0 = sampledPosition(bm, start)
  const a1 = sampledPosition(am, end), b1 = sampledPosition(bm, end)
  const x = a0.x - b0.x, y = a0.y - b0.y, z = a0.z - b0.z
  const dx = a1.x - b1.x - x, dy = a1.y - b1.y - y, dz = a1.z - b1.z - z
  // Intersect the simultaneous body heights before minimizing horizontal separation.
  let low = 0, high = 1
  const yMin = -am.height + .001, yMax = bm.height - .001
  if (dy) {
    const first = (yMin - y) / dy, second = (yMax - y) / dy
    low = Math.max(low, Math.min(first, second))
    high = Math.min(high, Math.max(first, second))
    if (low > high) return false
  } else if (y < yMin || y > yMax) return false
  const speedSquared = dx * dx + dz * dz
  const nearest = speedSquared ? -(x * dx + z * dz) / speedSquared : 0
  const at = Math.max(low, Math.min(high, nearest))
  return Math.hypot(x + dx * at, z + dz * at) <= tagReach
}

const publicTag = row => ({it:row.it,phase:row.phase,hideUntil:row.hide_until,seq:row.seq,previousIt:row.previous_it})

async function advanceTag(db, room, active, now) {
  const currentIt = active.find(row => row.id === room.it)
  let next
  let swapped = 0
  if (active.length < 2) {
    if (room.phase !== 'waiting') next = {it:null,phase:'waiting',hide_until:0,previous_it:null,protected_until:0}
  } else if (room.phase === 'waiting' || !currentIt) {
    const initial = active.find(row => row.id === room.creator) ?? active[0]
    next = {it:initial.id,phase:'hiding',hide_until:now+hideTime,previous_it:null,protected_until:0}
  } else if (room.phase === 'hiding' && now >= room.hide_until) {
    next = {...room, phase:'playing'}
  } else if (room.phase === 'playing' && now >= room.protected_until) {
    const earliest = Math.max(now - tagSamples, room.hide_until, room.protected_until)
    const touched = active.find(row => row.id !== room.it && bodiesTouch(currentIt, row, earliest))
    if (touched) {
      next = {...room,it:touched.id,previous_it:room.it,protected_until:now+tagCooldown}
      swapped = 1
    }
  }
  if (!next) return publicTag(room)
  const fresh = 'room_code=? AND pose_at>0 AND pose_at>=?'
  const cutoff = now - tagPresence
  const [, result] = await db.batch([
    prepared(db, `UPDATE webcraft_tag_state SET it=?,phase=?,hide_until=?,seq=seq+1,previous_it=?,protected_until=?
      WHERE room_code=? AND seq=? AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND tag_enabled=1 AND expires_at>?)
      AND ((? IS NULL AND (SELECT COUNT(*) FROM webcraft_members WHERE ${fresh})<2)
      OR (? IS NOT NULL AND (SELECT COUNT(*) FROM webcraft_members WHERE ${fresh})>=2
        AND EXISTS(SELECT 1 FROM webcraft_members WHERE ${fresh} AND id=?)))
      AND (?=0 OR EXISTS(SELECT 1 FROM webcraft_members WHERE ${fresh} AND id=?))`,
    next.it,next.phase,next.hide_until,next.previous_it,next.protected_until,room.code,room.seq,room.code,now,
    next.it,room.code,cutoff,next.it,room.code,cutoff,room.code,cutoff,next.it,swapped,room.code,cutoff,room.it),
    prepared(db, `SELECT ${tagFields} FROM webcraft_tag_state WHERE room_code=?`, room.code)
  ])
  const latest = result.results[0]
  if (!latest) throw new RoomError('ルームの有効期限が切れました。', 410)
  return publicTag(latest)
}

async function tokenFor(body) {
  if (typeof body.token !== 'string' || !tokenPattern.test(body.token)) {
    throw new RoomError('参加情報を確認できません。ルームに入り直してください。', 401)
  }
  return hash(body.token)
}

async function syncRoom(db, body, now) {
  const code = roomCode(body.code)
  const digest = await tokenFor(body)
  if (!Number.isSafeInteger(body.since) || body.since < 0) throw new RoomError('同期カーソルが不正です。')
  const pose = cleanPose(body.pose)
  const edit = body.edit === undefined ? null : cleanEdit(body.edit)
  const canEdit = edit && canReach(pose, edit)
  const protocol = wireProtocol(body.protocol)
  const poseText = pose === null ? null : JSON.stringify(pose)
  const queries = [
    poseStatement(db,code,digest,now,poseText,protocol),
    refreshExpiry(db,code,digest,now,protocol)
  ]
  const mutationIndex = canEdit ? queries.push(editStatement(db, code, digest, edit, body.since, now, protocol)) - 1 : -1
  const receiptIndex = edit?.actionId ? queries.push(prepared(db,
    `SELECT voxel,block FROM webcraft_edit_receipts WHERE room_code=? AND action_id=? AND ${authenticated}`,
    code, edit.actionId, code, digest)) - 1 : -1
  const cellIndex = edit ? queries.push(prepared(db,
    `SELECT revision,block FROM webcraft_cells WHERE room_code=? AND voxel=? AND ${authenticated}`,
    code, edit.key, code, digest)) - 1 : -1
  queries.push(
    prepared(db, roomInfo, code),
    prepared(db, 'SELECT id FROM webcraft_members WHERE room_code=? AND token_hash=?', code, digest),
    prepared(db, activePlayers, code, now - presence, code, digest),
    prepared(db, activeCells, code, body.since, code, digest)
  )
  const rows = await db.batch(queries)
  const [info, member, members, cells] = rows.slice(-4)
  const room = info.results[0]
  checkRoom(room, now)
  if (!member.results.length) throw new RoomError('参加情報を確認できません。ルームに入り直してください。', 401)
  checkProtocol(room, protocol)
  if (body.since > room.revision) throw new RoomError('同期を最初からやり直してください。')
  // Tabs still on the previous client can keep syncing older materials during rollout.
  const updates = protocol>=2 ? cells.results : cells.results.map(cell=>cell.block>=27&&cell.block<=33?{...cell,block:8}:cell)
  // A concurrent request can record a pose after this request's clock was sampled.
  const frameTime = room.tag_enabled ? Math.max(now, ...members.results.map(row => row.pose_at)) : now
  const participants = members.results.filter(row => !room.tag_enabled || (row.pose_at > 0 && row.pose_at >= frameTime - tagPresence))
    .map(row => ({...row,current:JSON.parse(row.pose)}))
  const response = {revision:room.revision, cells:updates,
    players:participants.filter(p => p.id !== member.results[0].id).map(p => ({id:p.id,nickname:p.nickname,pose:p.current}))}
  if (room.tag_enabled) {
    if (edit) throw new RoomError('かくれ鬼ではブロックを編集できません。', 403)
    response.tag = await advanceTag(db, room, participants, frameTime)
  }
  if (edit) {
    if (room.mode === 'explore' && !edit.actionId) throw new RoomError('探索ルームのブロック編集には識別子が必要です。')
    if (room.mode !== 'explore' && edit.workbench) throw new RoomError('作業台は探索ルームでのみ編集できます。')
    const receipt = rows[receiptIndex]?.results[0]
    if (receipt) response.result = receipt.voxel === edit.key && receipt.block === edit.block
      ? {ok:true} : {ok:false, reason:'conflict'}
    else if (!canEdit) response.result = {ok:false, reason:'range'}
    else if (changed(rows[mutationIndex])) response.result = {ok:true}
    else {
      const current = rows[cellIndex].results[0]
      const stale = (current?.revision ?? 0) !== edit.fromRevision || (current && current.block !== edit.before)
      response.result = {ok:false, reason:stale ? 'conflict' : room.cell_count >= cellsLimit && !current ? 'limit' : 'blocked'}
    }
  }
  return response
}

export async function handleWebcraft(request, db, {now:clock} = {}) {
  const url = new URL(request.url)
  const origin = request.headers.get('Origin')
  const headers = {'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff',
    'Access-Control-Allow-Methods':'POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type', 'Vary':'Origin'}
  const json = (data, status = 200) => Response.json(data, {status, headers})
  if (origin && origin !== publicOrigin && origin !== url.origin && !localOrigin.test(origin)) {
    return json({error:'このページからはルームに接続できません。'}, 403)
  }
  if (origin) headers['Access-Control-Allow-Origin'] = origin
  const path = /^\/api\/webcraft\/([a-z]+)\/?$/.exec(url.pathname)?.[1]
  if (!paths.has(path)) return json({error:'この操作は見つかりません。'}, 404)
  if (request.method === 'OPTIONS') return new Response(null, {status:204, headers:{...headers, 'Access-Control-Max-Age':'7200'}})
  if (request.method !== 'POST') return json({error:'この操作はPOSTで送信してください。'}, 405)
  if (!db) return json({error:'ルームサーバーに接続できません。'}, 503)
  try {
    const body = await readJson(request)
    const now = clock ?? Date.now()
    if (path === 'rooms') return json(await createRoom(db, body, now), 201)
    if (path === 'join') return json(await joinRoom(db, body, now))
    if (path === 'sync') return json(await syncRoom(db, body, now))
    const code = roomCode(body.code)
    const digest = await tokenFor(body)
    await prepared(db, 'DELETE FROM webcraft_members WHERE room_code=? AND token_hash=?', code, digest).run()
    return json({ok:true})
  } catch (error) {
    if (error instanceof RoomError) return json({error:error.message}, error.status)
    console.error('WebCraft room service:', error instanceof Error ? error.message : 'unknown error')
    return json({error:'ルームの通信に失敗しました。少し待って再試行してください。'}, 503)
  }
}
