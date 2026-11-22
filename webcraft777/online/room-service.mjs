import { cpuTokenPrefix, tagBotInterval, tagBotPose, tagBotSeats, tagBotStages } from './tag-bots.mjs'
import { copsBotPose, copsBotSpawn } from './cops-bots.mjs'
import { advanceStamina } from './chase-movement.mjs'
import { bodiesTouch, contactTrack, contactWindow } from './chase-contact.mjs'
import { advanceCopsState, copsStages, jailSpawn, policeSpawn, publicCops, readCops, rescueExit } from './cops-rules.mjs'
import { PARK_RIDES, PARK_RIDE_REACH } from './park-rides-config.mjs'

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const roomPattern = /^[A-HJ-NP-Z2-9]{8}$/
const tokenPattern = /^[a-f0-9]{64}$/
const actionPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
const publicOrigin = 'https://gamestk777.github.io'
const localOrigin = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]{1,5})?$/
const lifetime = 24 * 60 * 60 * 1000
const presence = 20_000
const tagPresence = 4000
const copsBotInterval = 200
const maxSampleLag = 350
const hideTime = 20_000
const tagDurations = new Set([1,3,5,10,15])
const roomStages = new Set(['classic','flat','lake','school'])
const playersLimit = 6
const roomLimit = 128
const cellsLimit = 8192
const maxBody = 4096
const size = 256
const height = 96
const area = size * size
const paths = new Set(['rooms', 'join', 'sync', 'leave'])

class RoomError extends Error {
  constructor(message, status = 400, code) {
    super(message)
    this.status = status
    this.code = code
  }
}

const prepared = (db, sql, ...values) => db.prepare(sql).bind(...values)
const changed = result => result.meta.changes > 0
const wireProtocol = value => [2,3,4,5,6,7,8,9].includes(value) ? value : 1
const publicMode = room => room.cops_stage ? 'cops' : room.tag_enabled ? 'tag' : room.mode
const publicStage = room => room.cops_stage ?? room.tag_stage ?? room.stage
const minimumProtocol = `CASE WHEN cops_bots>0 THEN 9 WHEN cops_stage IS NOT NULL THEN 8 WHEN tag_bots>0 THEN 7 WHEN tag_stage IS NOT NULL THEN 6 WHEN stage<>'classic' THEN 5
  WHEN tag_minutes>0 THEN 4 WHEN tag_enabled=1 THEN 3 WHEN mode='explore' THEN 2 ELSE 1 END`
const cpuSeat = `token_hash LIKE '${cpuTokenPrefix}%'`
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

function publicRoom(row, seat, protocol) {
  const minutes=row.cops_minutes || row.tag_minutes
  return {
    room: {code:row.code, name:row.name, seed:row.seed, generator:2, createdAt:row.created_at, mode:publicMode(row),
      ...(minutes>0?{tagMinutes:minutes}:{}),
      ...(protocol>=5?{stage:publicStage(row)}:{}),
      ...(protocol>=7?{tagBots:row.cops_bots||row.tag_bots}:{})},
    id:seat.id, token:seat.token
  }
}

function checkRoom(room, now) {
  if (!room) throw new RoomError('ルームが見つかりません。コードを確認してください。', 404)
  if (room.expires_at <= now) throw new RoomError('ルームの有効期限が切れました。', 410)
}

function checkProtocol(room, protocol) {
  if (room.cops_stage && protocol<8) {
    throw new RoomError('ドロケイで遊ぶには、ゲーム画面を再読み込みしてください。', 426)
  }
  if ((room.cops_bots>0 && protocol<9) || (room.tag_bots>0 && protocol<7)) {
    throw new RoomError('CPUがいるルームで遊ぶには、ゲーム画面を再読み込みしてください。', 426)
  }
  const stage = publicStage(room)
  const stageProtocol = stage === 'school' ? 6 : stage && stage !== 'classic' ? 5 : 1
  if (protocol < stageProtocol) {
    throw new RoomError('このステージで遊ぶには、ゲーム画面を再読み込みしてください。', 426)
  }
  if (room.tag_enabled && protocol < (room.tag_minutes>0 ? 4 : 3)) {
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

const tagFields = 'it,phase,hide_until,seq,previous_it,protected_until,ends_at,round_roster,round_result'
const roomInfo = `SELECT r.code,r.name,r.seed,r.created_at,r.expires_at,r.revision,r.cell_count,r.mode,r.tag_enabled,r.tag_minutes,
  r.stage,r.tag_stage,r.tag_bots,r.cops_stage,r.cops_minutes,r.cops_bots,r.creator,${tagFields.split(',').map(field=>'t.'+field).join(',')},
  c.phase AS cops_phase,c.ends_at AS cops_ends_at FROM webcraft_rooms r
  LEFT JOIN webcraft_tag_state t ON t.room_code=r.code LEFT JOIN webcraft_cops_state c ON c.room_code=r.code WHERE r.code=?`
const addSeat = `INSERT INTO webcraft_members(room_code,token_hash,id,nickname,last_seen)
  SELECT code,?,?,?,? FROM webcraft_rooms`

async function createRoom(db, body, now) {
  const name = clean(body.name, 40, 'ワールド名')
  const seed = body.seed == null || body.seed === '' ? makeCode() : clean(body.seed, 64, 'シード')
  const requested = body.mode === undefined ? 'creative' : body.mode
  if (!['creative', 'explore', 'tag', 'cops'].includes(requested)) throw new RoomError('ゲームモードが不正です。')
  const cops = requested==='cops'
  const mode = requested === 'tag' || cops ? 'creative' : requested
  const tagEnabled = Number(requested === 'tag')
  const protocol = wireProtocol(body.protocol)
  const selectedStage = body.stage === undefined ? (cops?'park':'classic') : body.stage
  if (!(cops?copsStages:roomStages).has(selectedStage)) throw new RoomError('ゲームのステージを選んでください。')
  if (selectedStage === 'school' && !tagEnabled) throw new RoomError('学校は鬼ごっこルームで選べます。')
  const stage = cops || selectedStage === 'school' ? 'classic' : selectedStage
  const tagStage = selectedStage === 'school' ? selectedStage : null
  const copsStage = cops ? selectedStage : null
  const copsMinutes = cops ? (body.tagMinutes === undefined ? 5 : body.tagMinutes) : 0
  const tagMinutes = tagEnabled && protocol>=4 ? (body.tagMinutes === undefined ? 5 : body.tagMinutes) : 0
  const botCount = body.tagBots === undefined ? 0 : body.tagBots
  if (!Number.isInteger(botCount)||botCount<0||botCount>4) throw new RoomError('CPUの人数は0〜4人から選んでください。')
  if (botCount>0&&!cops&&(!tagEnabled||!tagBotStages.has(selectedStage)))
    throw new RoomError('CPUはドロケイと、平地または学校の鬼ごっこで参加できます。')
  const tagBots = cops ? 0 : botCount
  const copsBots = cops ? botCount : 0
  checkProtocol({stage,tag_stage:tagStage,tag_enabled:tagEnabled,tag_minutes:tagMinutes,tag_bots:tagBots,
    cops_stage:copsStage,cops_bots:copsBots},protocol)
  if (tagEnabled) {
    if (body.tagMinutes!==undefined && protocol<4) checkProtocol({tag_enabled:1,tag_minutes:5},protocol)
    if (protocol>=4 && !tagDurations.has(tagMinutes)) throw new RoomError('鬼ごっこの制限時間を選んでください。')
  } else if (cops) {
    if (!tagDurations.has(copsMinutes)) throw new RoomError('ドロケイの制限時間を選んでください。')
  } else if (body.tagMinutes!==undefined) throw new RoomError('制限時間は鬼ごっこやドロケイで選べます。')
  const seat = await newSeat(body.nickname)
  const bots=cops?Array.from({length:copsBots},(_,index)=>({
    id:'cpu-'+(index+1),nickname:'CPU '+(index+1),hash:cpuTokenPrefix+(index+1),pose:copsBotSpawn(selectedStage,index)
  })):tagBotSeats(selectedStage,tagBots)
  const cleanup = prepared(db, `DELETE FROM webcraft_rooms WHERE code IN
    (SELECT code FROM webcraft_rooms WHERE expires_at<=? ORDER BY expires_at LIMIT 4)`, now)
  for (let attempt = 0; attempt < 4; attempt++) {
    const code = makeCode()
    const statements = [
      prepared(db, `INSERT OR IGNORE INTO webcraft_rooms(code,creator,name,seed,created_at,expires_at,mode,tag_enabled,tag_minutes,stage,tag_stage,tag_bots,cops_stage,cops_minutes,cops_bots)
        SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM webcraft_rooms)< ?`,
      code, seat.id, name, seed, now, now + lifetime, mode, tagEnabled, tagMinutes, stage, tagStage, tagBots,
      copsStage,copsMinutes,copsBots,roomLimit),
      prepared(db, addSeat + ' WHERE code=? AND creator=?', seat.hash, seat.id, seat.nickname, now, code, seat.id)
    ]
    for(const bot of bots)statements.push(prepared(db,
      `INSERT INTO webcraft_members(room_code,token_hash,id,nickname,last_seen,pose,pose_at)
        SELECT code,?,?,?,?,?,? FROM webcraft_rooms WHERE code=? AND creator=?`,
      bot.hash,bot.id,bot.nickname,now,JSON.stringify(bot.pose),now,code,seat.id))
    if (tagEnabled) statements.push(prepared(db, `INSERT INTO webcraft_tag_state(room_code)
      SELECT code FROM webcraft_rooms WHERE code=? AND creator=?`, code, seat.id))
    if (cops) statements.push(prepared(db, `INSERT INTO webcraft_cops_state(room_code)
      SELECT code FROM webcraft_rooms WHERE code=? AND creator=?`, code, seat.id))
    const [created] = await db.batch([...statements, cleanup])
    if (changed(created)) return publicRoom({code,name,seed,created_at:now,mode,tag_enabled:tagEnabled,
      tag_minutes:tagMinutes,stage,tag_stage:tagStage,tag_bots:tagBots,cops_stage:copsStage,cops_minutes:copsMinutes,
      cops_bots:copsBots},seat,protocol)
  }
  throw new RoomError('現在ルームの空きがありません。少し待ってから再試行してください。', 503)
}

async function joinRoom(db, body, now) {
  const code = roomCode(body.code)
  const seat = await newSeat(body.nickname)
  const protocol = wireProtocol(body.protocol)
  const [, , inserted, , info] = await db.batch([
    finishTagStatement(db,code,now),
    prepared(db, `DELETE FROM webcraft_members WHERE room_code=? AND last_seen<=? AND NOT (${cpuSeat})
      AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND ?>=${minimumProtocol})
      AND NOT EXISTS(SELECT 1 FROM webcraft_tag_state WHERE room_code=? AND ends_at>0)
      AND NOT EXISTS(SELECT 1 FROM webcraft_cops_state WHERE room_code=? AND phase<>'waiting')`,
    code, now - presence, code, protocol, code, code),
    prepared(db, addSeat + ` WHERE code=? AND expires_at>? AND ?>=${minimumProtocol}
      AND NOT EXISTS(SELECT 1 FROM webcraft_tag_state WHERE room_code=? AND ends_at>0)
      AND NOT EXISTS(SELECT 1 FROM webcraft_cops_state WHERE room_code=? AND phase<>'waiting')
      AND (SELECT COUNT(*) FROM webcraft_members WHERE room_code=?) < ?`,
    seat.hash, seat.id, seat.nickname, now, code, now, protocol, code, code, code, playersLimit),
    refreshExpiry(db,code,seat.hash,now,protocol),
    prepared(db, roomInfo, code)
  ])
  const room = info.results[0]
  checkRoom(room, now)
  checkProtocol(room, protocol)
  if (room.round_result!==null || room.cops_phase==='finished' || (room.cops_ends_at>0&&room.cops_ends_at<=now))
    throw new RoomError('この対戦は終了しました。新しいルームを作ってください。', 409, 'room-finished')
  if (room.ends_at>0 || (room.cops_phase&&room.cops_phase!=='waiting'))
    throw new RoomError('この対戦は開始済みです。次のルームで参加できます。', 409, 'round-started')
  if (!changed(inserted)) throw new RoomError('このルームは満員です（最大6人）。', 409)
  return publicRoom(room, seat, protocol)
}

const authenticated = 'EXISTS(SELECT 1 FROM webcraft_members WHERE room_code=? AND token_hash=?)'

// Include lobby seats that pressed Play during hiding. Initial entrants stay
// named if one leaves before the chase or polling resumes after the deadline.
const rosterAtChase=`(SELECT json_group_array(json_object('id',id,'nickname',nickname)) FROM (
  SELECT m.id,m.nickname FROM webcraft_members m
  WHERE m.room_code=t.room_code AND m.pose_at>0 AND m.pose_at<t.hide_until
  UNION
  SELECT json_extract(value,'$.id'),json_extract(value,'$.nickname') FROM json_each(t.round_roster)
))`

// Freeze the result and the explicitly remaining runners in one statement. The
// original roster still provides the loser's name if the ghost already left.
function finishTagStatement(db,code,now,digest=null) {
  const roster=`CASE WHEN t.phase='hiding' AND t.previous_it IS NULL THEN ${rosterAtChase} ELSE t.round_roster END`
  return prepared(db,`UPDATE webcraft_tag_state AS t SET seq=seq+1,previous_it=NULL,round_roster=${roster},round_result=(
      SELECT json_group_array(json_object('id',entrant.id,'nickname',entrant.nickname)) FROM (
        SELECT json_extract(value,'$.id') AS id,json_extract(value,'$.nickname') AS nickname
        FROM json_each(${roster})
        WHERE json_extract(value,'$.id')=t.it OR EXISTS(
          SELECT 1 FROM webcraft_members m WHERE m.room_code=t.room_code AND m.id=json_extract(value,'$.id')
        )
        ORDER BY json_extract(value,'$.id')<>t.it,json_extract(value,'$.id')
      ) AS entrant
    )
    WHERE t.room_code=? AND t.ends_at>0 AND t.ends_at<=? AND t.round_result IS NULL
    AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=t.room_code AND expires_at>?)
    AND (? IS NULL OR ${authenticated})`,code,now,now,digest,code,digest)
}

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
    AND r.tag_enabled=0 AND r.cops_stage IS NULL AND ?>=${minimumProtocol} AND (r.mode='creative' OR ? IS NOT NULL)
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

const activePlayers = `SELECT id,nickname,pose,pose_at,previous_pose,previous_pose_at,sample_at,pose_history,${cpuSeat} AS cpu
  FROM webcraft_members WHERE room_code=? AND (last_seen>? OR ${cpuSeat}) AND pose IS NOT NULL AND ${authenticated}`
const activeCells = `SELECT voxel AS key,block,axis,revision FROM webcraft_cells
  WHERE room_code=? AND revision>? AND ${authenticated} ORDER BY revision`

const previousSampleAt = 'COALESCE(NULLIF(m.sample_at,0),m.pose_at)'
const rememberPose = `CASE WHEN m.pose IS NULL OR m.pose_at<=0 THEN '[]' ELSE json_insert(
   CASE WHEN json_array_length(m.pose_history)>=5 THEN json_remove(m.pose_history,'$[0]') ELSE m.pose_history END,
   '$[#]',json_array(${previousSampleAt},json_object(
     'x',json_extract(m.pose,'$.x'),'y',json_extract(m.pose,'$.y'),'z',json_extract(m.pose,'$.z'),
     'crouched',json_extract(m.pose,'$.crouched')))) END`

function poseStatement(db,code,digest,now,poseText,sampleAt,protocol) {
  const record = '(r.tag_enabled=1 OR r.cops_stage IS NOT NULL) AND tick.pose IS NOT NULL'
  return prepared(db, `UPDATE webcraft_members AS m SET
    last_seen=MAX(m.last_seen,tick.time), pose=CASE
      WHEN tick.pose IS NULL THEN m.pose
      WHEN EXISTS(SELECT 1 FROM json_each(c.jailed) WHERE value=m.id)
        THEN json_set(tick.pose,'$.x',${jailSpawn.x},'$.y',${jailSpawn.y},'$.z',${jailSpawn.z},'$.moving',json('false'),'$.flying',json('false'))
      WHEN c.phase='hiding' AND EXISTS(SELECT 1 FROM json_each(c.police) WHERE value=m.id)
        THEN json_set(tick.pose,'$.x',${policeSpawn.x},'$.y',${policeSpawn.y},'$.z',${policeSpawn.z},'$.moving',json('false'),'$.flying',json('false'))
      ELSE tick.pose END,
    previous_pose=CASE WHEN ${record} THEN m.pose ELSE m.previous_pose END,
    previous_pose_at=CASE WHEN ${record} THEN m.pose_at ELSE m.previous_pose_at END,
    pose_history=CASE WHEN ${record} THEN ${rememberPose} ELSE m.pose_history END,
    sample_at=CASE WHEN ${record} THEN MAX(tick.sample_at,${previousSampleAt}+1) ELSE m.sample_at END,
    pose_at=CASE WHEN ${record} THEN tick.time ELSE m.pose_at END
    FROM webcraft_rooms r LEFT JOIN webcraft_cops_state c ON c.room_code=r.code
    CROSS JOIN (SELECT ? AS time,? AS pose,? AS sample_at) tick
    WHERE m.room_code=r.code AND r.code=? AND m.token_hash=? AND r.expires_at>tick.time AND ?>=${minimumProtocol}
    AND NOT EXISTS(SELECT 1 FROM webcraft_tag_state t WHERE t.room_code=r.code AND t.ends_at>0
      AND (t.ends_at<=tick.time OR (t.phase='hiding' AND t.hide_until<=tick.time)))
    AND (c.phase IS NULL OR (c.phase<>'finished' AND (c.ends_at=0 OR c.ends_at>tick.time)
      AND (c.phase<>'hiding' OR c.hide_until>tick.time)))
    AND CASE WHEN ${record} THEN m.pose_at<tick.time
      ELSE m.last_seen<=tick.time-4000 OR (tick.pose IS NOT NULL AND m.pose IS NOT tick.pose) END`,
  now, poseText, sampleAt, code, digest, protocol)
}

function publicTag(row,protocol,now) {
  const status={it:row.it,phase:row.phase,hideUntil:row.hide_until,seq:row.seq,previousIt:row.previous_it}
  if (protocol<4) return status
  const results=row.round_result===null ? [] : JSON.parse(row.round_result)
  const enrolledIds=row.round_roster===null ? [] : JSON.parse(row.round_roster).map(person=>person.id)
  return {...status,phase:row.round_result===null ? row.phase : 'finished',endsAt:row.ends_at,serverNow:now,
    winnerIds:results.filter(person=>person.id!==row.it).map(person=>person.id),results,enrolledIds}
}

async function advanceTag(db, room, active, now, protocol, digest) {
  if (room.round_result!==null) return publicTag(room,protocol,now)
  const timedActive=room.ends_at>0
  const selectState=prepared(db,`SELECT ${tagFields} FROM webcraft_tag_state WHERE room_code=?`,room.code)
  if (timedActive && now>=room.ends_at) {
    const [, result]=await db.batch([finishTagStatement(db,room.code,now,digest),selectState])
    const finished=result.results[0]
    if (!finished) throw new RoomError('ルームの有効期限が切れました。', 410)
    return publicTag(finished,protocol,now)
  }
  const currentIt = active.find(row => row.id === room.it)
  let next
  let swapped = 0
  if (!timedActive && (active.length<2 || !active.some(player=>!player.cpu))) {
    if (room.phase !== 'waiting') next = {it:null,phase:'waiting',hide_until:0,previous_it:null,protected_until:0,ends_at:0}
  } else if (!timedActive && (room.phase === 'waiting' || !currentIt)) {
    const initial = active.find(row => row.id===room.creator) ?? active.find(row=>!row.cpu)
    const hideUntil = now+hideTime
    next = {it:initial.id,phase:'hiding',hide_until:hideUntil,previous_it:null,protected_until:0,
      ends_at:room.tag_minutes>0 ? hideUntil+room.tag_minutes*60000 : 0}
  } else if (room.phase === 'hiding' && now >= room.hide_until) {
    next = {...room, phase:'playing'}
  } else if (room.phase === 'playing' && currentIt && now >= room.protected_until) {
    const earliest = Math.max(now - contactWindow, room.hide_until, room.protected_until)
    const touched = active.find(row => row.id !== room.it && bodiesTouch(currentIt, row, earliest))
    if (touched) {
      const hideUntil=now+hideTime
      next = {...room,it:touched.id,phase:'hiding',hide_until:hideUntil,previous_it:room.it,
        protected_until:hideUntil,ends_at:timedActive ? room.ends_at+hideTime : 0}
      swapped = 1
    }
  }
  if (!next) return publicTag(room,protocol,now)
  const fresh = 'room_code=? AND pose_at>0 AND pose_at>=?'
  const cutoff = now - tagPresence
  const [, result] = await db.batch([
    prepared(db, `UPDATE webcraft_tag_state AS t SET it=?,phase=?,hide_until=?,seq=seq+1,previous_it=?,protected_until=?,ends_at=?,
      round_roster=CASE WHEN t.ends_at=0 AND ?>0 THEN (
        SELECT json_group_array(json_object('id',id,'nickname',nickname)) FROM webcraft_members WHERE ${fresh}
      ) WHEN t.ends_at>0 AND t.phase='hiding' AND t.previous_it IS NULL AND ?='playing' THEN ${rosterAtChase}
      ELSE round_roster END
      WHERE room_code=? AND seq=? AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND tag_enabled=1 AND expires_at>?)
      AND round_result IS NULL AND (ends_at=0 OR ends_at>?)
      AND ((ends_at>0 AND ?='playing' AND ?=0)
      OR (? IS NULL AND (SELECT COUNT(*) FROM webcraft_members WHERE ${fresh})<2)
      OR (? IS NOT NULL AND (SELECT COUNT(*) FROM webcraft_members WHERE ${fresh})>=2
        AND EXISTS(SELECT 1 FROM webcraft_members WHERE ${fresh} AND id=?)))
      AND (?=0 OR EXISTS(SELECT 1 FROM webcraft_members WHERE ${fresh} AND id=?))`,
    next.it,next.phase,next.hide_until,next.previous_it,next.protected_until,next.ends_at,next.ends_at,room.code,cutoff,next.phase,
    room.code,room.seq,room.code,now,now,next.phase,swapped,
    next.it,room.code,cutoff,next.it,room.code,cutoff,room.code,cutoff,next.it,swapped,room.code,cutoff,room.it),
    selectState
  ])
  const latest = result.results[0]
  if (!latest) throw new RoomError('ルームの有効期限が切れました。', 410)
  return publicTag(latest,protocol,now)
}

async function tokenFor(body) {
  if (typeof body.token !== 'string' || !tokenPattern.test(body.token)) {
    throw new RoomError('参加情報を確認できません。ルームに入り直してください。', 401)
  }
  return hash(body.token)
}

function gatherParticipants(room,rows,now){
  const enrolling=room.phase==='hiding'&&room.previous_it===null&&room.round_result===null
  const roster=room.round_roster===null||enrolling ? null : new Set(JSON.parse(room.round_roster).map(person=>person.id))
  const chase=room.tag_enabled||room.cops_stage
  return rows.filter(row=>!chase||
    (row.pose_at>0&&(row.cpu||row.pose_at>=now-tagPresence)&&(!roster||roster.has(row.id))))
    .map(row=>{
      const participant={...row,current:JSON.parse(row.pose)}
      if(chase)participant.contactTrack=contactTrack(participant)
      return participant
    })
}

async function tickTagBots(db,room,participants,now,digest){
  if(!room.tag_bots||room.round_result!==null||(room.ends_at>0&&now>=room.ends_at)||
    !participants.some(player=>!player.cpu))return null
  const due=participants.filter(player=>player.cpu&&now-player.pose_at>=tagBotInterval)
  if(!due.length)return null
  const stage=publicStage(room)
  // A poll advances bots once per interval. Compare the old sample and tag
  // sequence so two clients cannot both advance the same tick or bypass a freeze.
  const updates=due.map(bot=>prepared(db,`UPDATE webcraft_members AS m SET last_seen=?,previous_pose=pose,previous_pose_at=pose_at,
    pose_history=${rememberPose},sample_at=?,pose_at=?,pose=?
    WHERE room_code=? AND id=? AND ${cpuSeat} AND pose_at=? AND EXISTS(
      SELECT 1 FROM webcraft_tag_state WHERE room_code=? AND seq=? AND round_result IS NULL
    ) AND ${authenticated}`, now,now,now,JSON.stringify(tagBotPose(stage,bot,participants,room,now)),
    room.code,bot.id,bot.pose_at,room.code,room.seq,room.code,digest))
  const results=await db.batch([...updates,prepared(db,roomInfo,room.code),
    prepared(db,activePlayers,room.code,now-presence,room.code,digest)])
  const [latestRoom,latestMembers]=results.slice(-2)
  return {room:latestRoom.results[0],members:latestMembers.results}
}

function publicBotPose({x,y,z,yaw,moving,crouched,flying}){
  return {x,y,z,yaw,moving,crouched,flying}
}

async function tickCopsBots(db,room,state,participants,now,digest,selectState){
  if((state.phase!=='hiding'&&state.phase!=='playing')||
    (state.phase==='hiding'&&now>=state.hideUntil)||now>=state.endsAt)return null
  const enrolled = new Set(state.roster.map(player=>player.id))
  const police = new Set(state.policeIds)
  const jailed = new Set(state.jailedIds)
  if(!participants.some(p=>!p.cpu&&(enrolled.has(p.id)||state.phase==='hiding')))return null
  const due=participants.filter(p=>p.cpu&&enrolled.has(p.id)&&!jailed.has(p.id)&&
    (state.phase!=='hiding'||!police.has(p.id))&&now-p.pose_at>=copsBotInterval)
  if(!due.length)return null
  const players=participants.filter(p=>enrolled.has(p.id)).map(p=>({id:p.id,pose:p.current}))
  const updates=due.map(bot=>{
    const pose=copsBotPose({stage:room.cops_stage,id:bot.id,pose:bot.current,phase:state.phase,
      elapsed:Math.min((now-bot.pose_at)/1000,.5),now,policeIds:state.policeIds,jailedIds:state.jailedIds,players})
    return prepared(db,`UPDATE webcraft_members AS m SET last_seen=?,previous_pose=pose,previous_pose_at=pose_at,
      pose_history=${rememberPose},sample_at=?,pose_at=?,pose=?
      WHERE room_code=? AND id=? AND ${cpuSeat} AND pose_at=? AND EXISTS(
        SELECT 1 FROM webcraft_cops_state WHERE room_code=? AND seq=?
      ) AND ${authenticated}`,now,now,now,JSON.stringify(pose),room.code,bot.id,bot.pose_at,room.code,state.seq,room.code,digest)
  })
  const results=await db.batch([...updates,selectState,prepared(db,activePlayers,room.code,now-presence,room.code,digest)])
  return results.slice(-2)
}

function copsBotTeleports(state,next,participants,now){
  const teleports=[]
  for(const player of participants){
    if(!player.cpu)continue
    const startsAsPolice=state.phase==='waiting'&&next.policeIds.includes(player.id)
    const wasJailed=state.jailedIds.includes(player.id)
    const isJailed=next.jailedIds.includes(player.id)
    const destination=startsAsPolice?policeSpawn:isJailed&&!wasJailed?jailSpawn:wasJailed&&!isJailed?rescueExit:null
    if(!destination)continue
    const pose={...publicBotPose(player.current),...destination,moving:false,crouched:false,flying:false}
    if(player.current.stamina){
      pose.stamina={...player.current.stamina}
      if(wasJailed)advanceStamina(pose.stamina,false,(now-player.pose_at)/1000)
    }
    teleports.push({id:player.id,pose})
  }
  return teleports
}

async function advanceCops(db,room,participants,now,digest){
  const selectState=prepared(db,'SELECT * FROM webcraft_cops_state WHERE room_code=?',room.code)
  const selectPlayers=()=>prepared(db,activePlayers,room.code,now-presence,room.code,digest)
  const queries=[selectState,prepared(db,
    `SELECT id,nickname,pose_at,last_seen,${cpuSeat} AS cpu FROM webcraft_members WHERE room_code=? ORDER BY rowid`,room.code)]
  if(room.cops_bots)queries.push(selectPlayers())
  const [current,seats,fresh]=await db.batch(queries)
  if(!current.results[0])throw new RoomError('ルームの有効期限が切れました。',410)
  const state=readCops(current.results[0])
  const readParticipants=({results})=>{
    now=Math.max(now,...results.map(player=>player.pose_at))
    return gatherParticipants(room,results,now)
  }
  if(fresh)participants=readParticipants(fresh)
  if(room.cops_bots){
    const tick=await tickCopsBots(db,room,state,participants,now,digest,selectState)
    if(tick){
      const [status,players]=tick
      if(!status.results[0])throw new RoomError('ルームの有効期限が切れました。',410)
      participants=readParticipants(players)
      if(status.results[0].seq!==state.seq)return {state:readCops(status.results[0]),participants,now}
    }
  }
  const available=state.phase==='waiting'?seats.results.filter(seat=>seat.cpu||seat.last_seen>now-presence):seats.results
  const next=advanceCopsState(state,room,participants,available,now,bodiesTouch)
  if(!next)return {state,participants,now}
  const changes=[prepared(db,`UPDATE webcraft_cops_state SET phase=?,hide_until=?,ends_at=?,
    seq=seq+1,protected_until=?,roster=?,police=?,jailed=?,event=?,winner=?
    WHERE room_code=? AND seq=? AND EXISTS(SELECT 1 FROM webcraft_rooms WHERE code=? AND expires_at>?)
      AND ${authenticated}`,
    next.phase,next.hideUntil,next.endsAt,next.protectedUntil,JSON.stringify(next.roster),JSON.stringify(next.policeIds),
    JSON.stringify(next.jailedIds),next.event===null?null:JSON.stringify(next.event),next.winner,
    room.code,state.seq,room.code,now,room.code,digest)]
  const teleports=copsBotTeleports(state,next,participants,now)
  // Commit NPC jail and release positions with the same state transition. A
  // stale poll cannot teleport them when its compare-and-swap failed.
  if(teleports.length)changes.push(prepared(db,`UPDATE webcraft_members SET pose=json_extract(places.value,'$.pose'),
    last_seen=?,pose_at=?,sample_at=0,pose_history='[]',previous_pose=NULL,previous_pose_at=0 FROM json_each(?) places
    WHERE changes()>0 AND room_code=? AND ${cpuSeat} AND webcraft_members.id=json_extract(places.value,'$.id')`,
    now,now,JSON.stringify(teleports),room.code))
  const index=changes.push(selectState)-1
  if(room.cops_bots)changes.push(selectPlayers())
  const results=await db.batch(changes)
  const latest=results[index]
  if(!latest.results[0])throw new RoomError('ルームの有効期限が切れました。',410)
  if(room.cops_bots)participants=readParticipants(results[index+1])
  return {state:readCops(latest.results[0]),participants,now}
}

function cleanRide(value) {
  if(value===undefined||value===null)return value
  if(typeof value!=='object'||!Object.hasOwn(PARK_RIDES,value.id)||
    (value.pump!==undefined&&![0,1,-1].includes(value.pump))||
    (value.seat!==undefined&&(!Number.isInteger(value.seat)||value.seat<0||value.seat>=PARK_RIDES[value.id].capacity)))
    throw new RoomError('遊具の座席が不正です。')
  return {id:value.id,seat:value.seat,pump:value.pump??0}
}

function publicRide({ride_id,ride_seat,id,ride_pump}){
  return {id:ride_id,seat:ride_seat,memberId:id,pump:ride_pump}
}

async function updateRides(db,room,state,now,digest,memberId,pose,input){
  if(room.cops_stage!=='park')return undefined
  const cutoff=now-tagPresence,code=room.code
  const clear='SET ride_id=NULL,ride_seat=NULL,ride_pump=0'
  const seats=prepared(db,`SELECT id,ride_id,ride_seat,ride_pump FROM webcraft_members
    WHERE room_code=? AND ride_id IS NOT NULL AND last_seen>?
    ORDER BY ride_id,ride_seat`,code,cutoff)
  const blocked=state.phase==='hiding'?[...state.jailedIds,...state.policeIds]:state.jailedIds
  const cleanup=prepared(db,`UPDATE webcraft_members ${clear}
    WHERE room_code=? AND ride_id IS NOT NULL AND (last_seen<=? OR ?='finished'
      OR id IN (SELECT value FROM json_each(?))
      OR (?='playing' AND id NOT IN (SELECT value FROM json_each(?))))`,
  code,cutoff,state.phase,JSON.stringify(blocked),state.phase,JSON.stringify(state.roster.map(player=>player.id)))
  const [,listed]=await db.batch([cleanup,seats])
  if(input===undefined)return listed.results.map(publicRide)
  if(input===null){
    const [,remaining]=await db.batch([prepared(db,`UPDATE webcraft_members ${clear}
      WHERE room_code=? AND token_hash=? AND ride_id IS NOT NULL`,code,digest),seats])
    return remaining.results.map(publicRide)
  }
  if(!pose||state.phase==='finished'||blocked.includes(memberId)||
    (state.phase==='playing'&&!state.roster.some(player=>player.id===memberId)))return listed.results.map(publicRide)
  const config=PARK_RIDES[input.id],previous=listed.results.find(rider=>rider.id===memberId)
  const staying=previous?.ride_id===input.id&&(input.seat===undefined||input.seat===previous.ride_seat)
  if(!staying&&(Math.abs(pose.y-config.y)>2.5||
    Math.hypot(pose.x-config.x,pose.z-config.z)>PARK_RIDE_REACH))return listed.results.map(publicRide)
  const seen=new Set(listed.results.filter(rider=>rider.ride_id===input.id&&rider.id!==memberId).map(rider=>rider.ride_seat))
  const seat=staying?previous.ride_seat:input.seat??Array.from({length:config.capacity},(_,index)=>index).find(index=>!seen.has(index))
  if(seat===undefined||seen.has(seat)||staying&&input.pump===previous.ride_pump)return listed.results.map(publicRide)
  const [,remaining]=await db.batch([prepared(db,`UPDATE OR IGNORE webcraft_members SET ride_id=?,ride_seat=?,ride_pump=?
    WHERE room_code=? AND token_hash=? AND last_seen>? AND EXISTS(SELECT 1 FROM webcraft_cops_state
      WHERE room_code=? AND seq=? AND phase<>'finished')`,input.id,seat,input.pump,code,digest,cutoff,code,state.seq),seats])
  return remaining.results.map(publicRide)
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
  const sampleAt = Number.isSafeInteger(body.sampleAt) && body.sampleAt <= now && body.sampleAt >= now-maxSampleLag
    ? body.sampleAt : now
  const queries = [
    poseStatement(db,code,digest,now,poseText,sampleAt,protocol),
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
  let room = info.results[0]
  checkRoom(room, now)
  if (!member.results.length) throw new RoomError('参加情報を確認できません。ルームに入り直してください。', 401)
  checkProtocol(room, protocol)
  if (body.since > room.revision) throw new RoomError('同期を最初からやり直してください。')
  // Tabs still on the previous client can keep syncing older materials during rollout.
  const updates = protocol>=2 ? cells.results : cells.results.map(cell=>cell.block>=27&&cell.block<=33?{...cell,block:8}:cell)
  // A concurrent request can record a pose after this request's clock was sampled.
  let frameTime = room.tag_enabled||room.cops_stage ? Math.max(now, ...members.results.map(row => row.pose_at)) : now
  let participants=gatherParticipants(room,members.results,frameTime)
  if(room.tag_bots&&!edit){
    const updated=await tickTagBots(db,room,participants,frameTime,digest)
    if(updated){
      room=updated.room
      checkRoom(room,now)
      frameTime=Math.max(frameTime,...updated.members.map(row=>row.pose_at))
      participants=gatherParticipants(room,updated.members,frameTime)
    }
  }
  const remotePlayers = () => participants.filter(p=>p.id!==member.results[0].id).map(p=>({
    id:p.id,nickname:p.nickname,pose:p.cpu?publicBotPose(p.current):p.current,
    ...(p.cpu?{cpu:true}:{}), ...(p.contactTrack?{poseAt:p.contactTrack.latest}:{})
  }))
  const response = {revision:room.revision,cells:updates,players:[]}
  if(room.cops_stage){
    if(edit)throw new RoomError('ドロケイではブロックを編集できません。',403)
    const ride=room.cops_stage==='park'?cleanRide(body.ride):undefined
    const advanced=await advanceCops(db,room,participants,frameTime,digest)
    const {state}=advanced
    participants=advanced.participants
    frameTime=advanced.now
    response.players=remotePlayers()
    response.cops=publicCops(state,frameTime)
    if(state.phase==='playing')
      response.players=response.players.filter(player=>response.cops.enrolledIds.includes(player.id))
    for(const player of response.players)
      if(state.jailedIds.includes(player.id))Object.assign(player.pose,jailSpawn,{moving:false,flying:false})
    const rides=await updateRides(db,room,state,frameTime,digest,member.results[0].id,pose,ride)
    if(rides!==undefined)response.rides=rides
  }else response.players=remotePlayers()
  if (room.tag_enabled) {
    if (edit) throw new RoomError('かくれ鬼ではブロックを編集できません。', 403)
    response.tag = await advanceTag(db, room, participants, frameTime, protocol, digest)
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
    await db.batch([
      finishTagStatement(db,code,now,digest),
      prepared(db, 'DELETE FROM webcraft_members WHERE room_code=? AND token_hash=?', code, digest)
    ])
    return json({ok:true})
  } catch (error) {
    if (error instanceof RoomError) return json({error:error.code??error.message}, error.status)
    console.error('WebCraft room service:', error instanceof Error ? error.message : 'unknown error')
    return json({error:'ルームの通信に失敗しました。少し待って再試行してください。'}, 503)
  }
}
