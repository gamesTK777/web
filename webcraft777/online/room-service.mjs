const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const roomPattern = /^[A-HJ-NP-Z2-9]{8}$/
const tokenPattern = /^[a-f0-9]{64}$/
const actionPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
const publicOrigin = 'https://gamestk777.github.io'
const localOrigin = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]{1,5})?$/
const lifetime = 24 * 60 * 60 * 1000
const presence = 20_000
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
    room: {code:row.code, name:row.name, seed:row.seed, generator:2, createdAt:row.created_at, mode:row.mode},
    id:seat.id, token:seat.token
  }
}

function checkRoom(room, now) {
  if (!room) throw new RoomError('ルームが見つかりません。コードを確認してください。', 404)
  if (room.expires_at <= now) throw new RoomError('ルームの有効期限が切れました。', 410)
}

function checkProtocol(room, modern) {
  if (room.mode === 'explore' && !modern) {
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

const roomInfo = 'SELECT code,name,seed,created_at,expires_at,revision,cell_count,mode FROM webcraft_rooms WHERE code=?'
const addSeat = `INSERT INTO webcraft_members(room_code,token_hash,id,nickname,last_seen)
  SELECT code,?,?,?,? FROM webcraft_rooms`

async function createRoom(db, body, now) {
  const name = clean(body.name, 40, 'ワールド名')
  const seed = body.seed == null || body.seed === '' ? makeCode() : clean(body.seed, 64, 'シード')
  const mode = body.mode === undefined ? 'creative' : body.mode
  if (mode !== 'creative' && mode !== 'explore') throw new RoomError('ゲームモードが不正です。')
  const seat = await newSeat(body.nickname)
  const cleanup = prepared(db, `DELETE FROM webcraft_rooms WHERE code IN
    (SELECT code FROM webcraft_rooms WHERE expires_at<=? ORDER BY expires_at LIMIT 4)`, now)
  for (let attempt = 0; attempt < 4; attempt++) {
    const code = makeCode()
    const [created] = await db.batch([
      prepared(db, `INSERT OR IGNORE INTO webcraft_rooms(code,creator,name,seed,created_at,expires_at,mode)
        SELECT ?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM webcraft_rooms)< ?`,
      code, seat.id, name, seed, now, now + lifetime, mode, roomLimit),
      prepared(db, addSeat + ' WHERE code=? AND creator=?', seat.hash, seat.id, seat.nickname, now, code, seat.id),
      cleanup
    ])
    if (changed(created)) return publicRoom({code, name, seed, created_at:now, mode}, seat)
  }
  throw new RoomError('現在ルームの空きがありません。少し待ってから再試行してください。', 503)
}

async function joinRoom(db, body, now) {
  const code = roomCode(body.code)
  const seat = await newSeat(body.nickname)
  const modern = Number(body.protocol === 2)
  const [, inserted, , info] = await db.batch([
    prepared(db, `DELETE FROM webcraft_members WHERE room_code=? AND last_seen<=?
      AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND (mode='creative' OR ?=1))`,
    code, now - presence, code, modern),
    prepared(db, addSeat + ` WHERE code=? AND expires_at>? AND (mode='creative' OR ?=1)
      AND (SELECT COUNT(*) FROM webcraft_members WHERE room_code=?) < ?`,
    seat.hash, seat.id, seat.nickname, now, code, now, modern, code, playersLimit),
    refreshExpiry(db,code,seat.hash,now,modern),
    prepared(db, roomInfo, code)
  ])
  const room = info.results[0]
  checkRoom(room, now)
  checkProtocol(room, modern)
  if (!changed(inserted)) throw new RoomError('このルームは満員です（最大6人）。', 409)
  return publicRoom(room, seat)
}

const authenticated = 'EXISTS(SELECT 1 FROM webcraft_members WHERE room_code=? AND token_hash=?)'

function refreshExpiry(db,code,digest,now,modern) {
  return prepared(db, `UPDATE webcraft_rooms SET expires_at=? WHERE code=? AND expires_at>? AND expires_at<=?
    AND (mode='creative' OR ?=1) AND ${authenticated}`,
    now + lifetime, code, now, now + lifetime - 60000, modern, code, digest)
}

function editStatement(db, code, digest, edit, since, now, modern) {
  const {key, fromRevision, before, block, axis, actionId, workbench, x, y, z} = edit
  // Edit, revision and receipt are committed by the same SQLite statement.
  return prepared(db, `INSERT INTO webcraft_cells(room_code,voxel,block,axis,revision,action_id)
    SELECT r.code,?,?,?,r.revision+1,? FROM webcraft_rooms r
    WHERE r.code=? AND r.expires_at>? AND r.revision>=? AND ${authenticated}
    AND (r.mode='creative' OR (?=1 AND ? IS NOT NULL))
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
  key, block, axis, actionId, code, now, since, code, digest, modern, actionId, Number(workbench), actionId, actionId,
  fromRevision, cellsLimit, fromRevision, key, fromRevision, before,
  block, now - 2500, x - .31, x + 1.31, z - .31, z + 1.31, y + 1, y, fromRevision, before)
}

const activePlayers = `SELECT id,nickname,pose FROM webcraft_members WHERE room_code=? AND token_hash<>?
  AND last_seen>? AND pose IS NOT NULL AND ${authenticated}`
const activeCells = `SELECT voxel AS key,block,axis,revision FROM webcraft_cells
  WHERE room_code=? AND revision>? AND ${authenticated} ORDER BY revision`

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
  const modern = Number(body.protocol === 2)
  const poseText = pose === null ? null : JSON.stringify(pose)
  const queries = [
    prepared(db, `UPDATE webcraft_members SET last_seen=MAX(last_seen,?),pose=COALESCE(?,pose)
      WHERE room_code=? AND token_hash=? AND (last_seen<=? OR (? IS NOT NULL AND pose IS NOT ?))
      AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND expires_at>? AND (mode='creative' OR ?=1))`,
    now, poseText, code, digest, now - 4000, poseText, poseText, code, now, modern),
    refreshExpiry(db,code,digest,now,modern)
  ]
  const mutationIndex = canEdit ? queries.push(editStatement(db, code, digest, edit, body.since, now, modern)) - 1 : -1
  const receiptIndex = edit?.actionId ? queries.push(prepared(db,
    `SELECT voxel,block FROM webcraft_edit_receipts WHERE room_code=? AND action_id=? AND ${authenticated}`,
    code, edit.actionId, code, digest)) - 1 : -1
  const cellIndex = edit ? queries.push(prepared(db,
    `SELECT revision,block FROM webcraft_cells WHERE room_code=? AND voxel=? AND ${authenticated}`,
    code, edit.key, code, digest)) - 1 : -1
  queries.push(
    prepared(db, roomInfo, code),
    prepared(db, 'SELECT id FROM webcraft_members WHERE room_code=? AND token_hash=?', code, digest),
    prepared(db, activePlayers, code, digest, now - presence, code, digest),
    prepared(db, activeCells, code, body.since, code, digest)
  )
  const rows = await db.batch(queries)
  const [info, member, members, cells] = rows.slice(-4)
  const room = info.results[0]
  checkRoom(room, now)
  if (!member.results.length) throw new RoomError('参加情報を確認できません。ルームに入り直してください。', 401)
  checkProtocol(room, modern)
  if (body.since > room.revision) throw new RoomError('同期を最初からやり直してください。')
  // Tabs still on the previous client can keep syncing older materials during rollout.
  const updates = body.protocol===2 ? cells.results : cells.results.map(cell=>cell.block>=27&&cell.block<=33?{...cell,block:8}:cell)
  const response = {revision:room.revision, cells:updates,
    players:members.results.map(p => ({id:p.id, nickname:p.nickname, pose:JSON.parse(p.pose)}))}
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

export async function handleWebcraft(request, db, {now = Date.now()} = {}) {
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
