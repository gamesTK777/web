import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {handleWebcraft} from './room-service.mjs'
import {createLocalRoomDb} from './sqlite-d1.mjs'
import {tagBotPose,tagBotSeats} from './tag-bots.mjs'
import {copsBotPose} from './cops-bots.mjs'

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
  async function create(nickname = '作り手', mode, now = epoch, protocol, tagMinutes) {
    const res = await run('rooms', {name:'みんなの丘', seed:'hill', nickname, mode, protocol, tagMinutes}, {now})
    assert.equal(res.status, 201)
    return res.json()
  }
  async function join(host, nickname = '建築仲間', now = epoch, protocol = 2) {
    return run('join', {code:host.room.code, nickname, protocol}, {now})
  }
  async function sync(actor, {protocol=2,since=0, at=pose(), edit, ride, sampleAt, now=epoch} = {}) {
    return run('sync', {protocol,code:actor.room.code, token:actor.token, since, pose:at, edit, ride, sampleAt}, {now})
  }
  return {sql,run,create,join,sync}
}

async function copsSession(t,stage='park',count=3) {
  const service=env(t),body={mode:'cops',stage,protocol:8,tagMinutes:1,nickname:'ケイ役',name:'ドロケイ'}
  const response=await service.run('rooms',body)
  assert.equal(response.status,201)
  const host=await response.json()
  const guests=[]
  for(let index=1;index<count;index++){
    const joined=await service.join(host,'仲間'+index,epoch,8)
    assert.equal(joined.status,200)
    guests.push(await joined.json())
  }
  async function frame(actor,now,at=pose(),ride){
    const result=await service.sync(actor,{protocol:8,at,ride,now})
    assert.equal(result.status,200)
    return result.json()
  }
  return {...service,body,host,guests,frame}
}

async function copsCpuSession(t,stage,tagBots=2,seed='b'){
  const service=env(t)
  const body={mode:'cops',stage,protocol:9,tagMinutes:1,tagBots,seed,nickname:'ひとりの参加者',name:'CPUドロケイ'}
  const created=await service.run('rooms',body)
  assert.equal(created.status,201)
  const host=await created.json()
  async function frame(now,at=pose(128.5,33,87.5)){
    const response=await service.sync(host,{protocol:9,now,at})
    assert.equal(response.status,200)
    return response.json()
  }
  return {...service,body,host,frame}
}

test('cops rooms preserve stage, select duration and reject legacy clients and terrain edits',async t=>{
  const {run,host,guests,body,join,frame,sync}=await copsSession(t,'crossing',2)
  assert.equal(host.room.mode,'cops')
  assert.equal(host.room.stage,'crossing')
  assert.equal(guests[0].room.stage,'crossing')
  assert.equal(host.room.tagMinutes,1)
  assert.equal(host.room.tagBots,0)
  assert.equal((await run('rooms',{...body,stage:'school'})).status,400)
  assert.equal((await run('rooms',{...body,tagMinutes:2})).status,400)
  assert.equal((await run('rooms',{...body,mode:'tag'})).status,400)
  assert.equal((await run('rooms',{...body,protocol:7})).status,426)
  assert.equal((await join(host,'以前の画面',epoch,7)).status,426)
  assert.equal((await sync(host,{protocol:7})).status,426)
  assert.equal((await sync(host,{protocol:8,edit:{key:voxel(128,34,131),before:0,block:8,axis:'y',fromRevision:0}})).status,403)
  const waiting=await frame(host,epoch,pose())
  assert.equal(waiting.tag,undefined)
  assert.equal(waiting.rides,undefined)
  assert.equal(waiting.cops.phase,'waiting')
  assert.deepEqual(waiting.cops.policeIds,[])
})

test('additive cops CPU migration leaves old rooms playable and enforces the new seat count',async t=>{
  const {sql,host,frame}=await copsSession(t,'park',2)
  sql.exec('ALTER TABLE webcraft_rooms DROP COLUMN cops_bots')
  sql.exec(readFileSync(new URL('./cops-bots-migration.sql',import.meta.url),'utf8'))
  const count=sql.prepare('SELECT cops_bots FROM webcraft_rooms WHERE code=?')
  assert.equal(count.get(host.room.code).cops_bots,0)
  assert.equal((await frame(host,epoch)).cops.phase,'waiting')
  const set=sql.prepare('UPDATE webcraft_rooms SET cops_bots=? WHERE code=?')
  for(const bad of [-1,1.5,5])assert.throws(()=>set.run(bad,host.room.code),/CHECK constraint failed/)
})

test('cops CPU count validates, reserves room seats and protects legacy clients',async t=>{
  const {run,join,sync,frame,host,body,sql}=await copsCpuSession(t,'park',4)
  for(const tagBots of [-1,1.5,5,'2',null])
    assert.equal((await run('rooms',{...body,tagBots})).status,400)
  assert.equal((await run('rooms',{...body,protocol:8})).status,426)
  assert.equal((await join(host,'以前の画面',epoch,8)).status,426)
  assert.equal((await sync(host,{protocol:8,now:epoch+1200})).status,426)
  assert.equal(sql.prepare('SELECT pose FROM webcraft_members WHERE room_code=? AND id=?').get(host.room.code,host.id).pose,null)
  const guest=await (await join(host,'仲間',epoch,9)).json()
  assert.equal(guest.room.tagBots,4)
  assert.equal((await join(host,'定員超過',epoch,9)).status,409)
  const first=await frame(epoch,null)
  const later=await frame(epoch+5000,null)
  assert.equal(first.cops.phase,'waiting')
  assert.equal(later.cops.phase,'waiting')
  assert.deepEqual(later.players,first.players)
  assert.equal(later.players.length,4)
  assert(later.players.every(p=>p.cpu===true))
})

for(const stage of ['park','crossing'])test(`solo cops run with CPU officers and robbers in ${stage}`,async t=>{
  const {host,frame}=await copsCpuSession(t,stage)
  const start=await frame(epoch+1)
  assert.equal(host.room.stage,stage)
  assert.equal(host.room.tagBots,2)
  assert.equal(start.cops.phase,'hiding')
  assert.equal(start.cops.hideUntil,epoch+20_001)
  assert.deepEqual(start.cops.policeIds,['cpu-1'])
  assert.deepEqual(new Set(start.cops.enrolledIds),new Set([host.id,'cpu-1','cpu-2']))
  const cpu=({players},id)=>players.find(p=>p.id===id).pose
  assert.deepEqual([cpu(start,'cpu-1').x,cpu(start,'cpu-1').z],[128.5,169.5])
  const hide=await frame(epoch+261)
  assert.deepEqual(cpu(hide,'cpu-1'),cpu(start,'cpu-1'))
  assert.notDeepEqual(cpu(hide,'cpu-2'),cpu(start,'cpu-2'))
  assert.deepEqual(Object.keys(cpu(hide,'cpu-2')).sort(),Object.keys(pose()).sort())
  const playing=await frame(start.cops.hideUntil)
  assert.equal(playing.cops.phase,'playing')
  const [chase,repeat]=await Promise.all([frame(start.cops.hideUntil+260),frame(start.cops.hideUntil+260)])
  assert.deepEqual(chase.players,repeat.players)
  assert.notDeepEqual(cpu(chase,'cpu-1'),cpu(playing,'cpu-1'))
  assert.deepEqual((await frame(start.cops.hideUntil+5500,null)).players,chase.players)
  const finished=await frame(start.cops.endsAt)
  assert.equal(finished.cops.phase,'finished')
  assert.equal(finished.cops.winner,'robbers')
  assert.deepEqual(new Set(finished.cops.winnerIds),new Set([host.id,'cpu-2']))
})

test('one CPU can play either team in a solo match',async t=>{
  const first=await copsCpuSession(t,'park',1,'b')
  const second=await copsCpuSession(t,'crossing',1,'a')
  assert.deepEqual((await first.frame(epoch+1)).cops.policeIds,['cpu-1'])
  assert.deepEqual((await second.frame(epoch+1)).cops.policeIds,[second.host.id])
})

for(const stage of ['park','crossing'])test(`a CPU officer arrests and a CPU robber rescues in ${stage}`,async t=>{
  const {host,frame,sql}=await copsCpuSession(t,stage)
  const start=await frame(epoch+1)
  await frame(start.cops.hideUntil)
  const relocate=sql.prepare(`UPDATE webcraft_members SET pose=?,pose_at=?,previous_pose=NULL,previous_pose_at=0
    WHERE room_code=? AND id=?`)
  const contactAt=start.cops.hideUntil+260
  const arrest=pose(128.5,33,130.5)
  relocate.run(JSON.stringify(arrest),contactAt-1,host.room.code,'cpu-1')
  relocate.run(JSON.stringify(pose(128.5,33,174.5)),contactAt-1,host.room.code,'cpu-2')
  const [capture,repeat]=await Promise.all([frame(contactAt,arrest),frame(contactAt,arrest)])
  assert.deepEqual(capture.cops.event,{kind:'capture',ids:[host.id],by:'cpu-1'})
  assert.deepEqual(capture.cops,repeat.cops)
  assert.equal(capture.cops.phase,'playing')
  assert.deepEqual(capture.cops.jailedIds,[host.id])
  let rescued=capture
  for(let index=1;index<=12&&rescued.cops.jailedIds.length;index++)
    rescued=await frame(contactAt+260*index,arrest)
  assert.deepEqual(rescued.cops.event,{kind:'rescue',ids:[host.id],by:'cpu-2'})
  assert.deepEqual(rescued.cops.jailedIds,[])
})

test('CPU prisoner waits in jail and returns through the shared exit on rescue',async t=>{
  const {host,frame,sql}=await copsCpuSession(t,'park')
  const start=await frame(epoch+1)
  await frame(start.cops.hideUntil)
  const contactAt=start.cops.hideUntil+260
  const relocate=sql.prepare(`UPDATE webcraft_members SET pose=?,pose_at=?,previous_pose=NULL,previous_pose_at=0
    WHERE room_code=? AND id=?`)
  for(const bot of ['cpu-1','cpu-2'])
    relocate.run(JSON.stringify(pose(128.5,33,130.5)),contactAt-1,host.room.code,bot)
  const capture=await frame(contactAt,pose(128.5,33,174.5))
  assert.deepEqual(capture.cops.event,{kind:'capture',ids:['cpu-2'],by:'cpu-1'})
  const cpuPose=frame=>frame.players.find(p=>p.id==='cpu-2').pose
  assert.equal(cpuPose(capture).z,184.5)
  const jailed=await frame(contactAt+260,pose(128.5,33,174.5))
  assert.deepEqual(cpuPose(jailed),cpuPose(capture))
  const rescued=await frame(contactAt+520,pose(128.5,33,177.5))
  assert.deepEqual(rescued.cops.event,{kind:'rescue',ids:['cpu-2'],by:host.id})
  assert.equal(cpuPose(rescued).z,171.5)
  assert.deepEqual(rescued.cops.jailedIds,[])
})

test('police are frozen for 20 seconds, arrests lock prisoners in jail and rescues give a shared grace',async t=>{
  const {host,guests,frame,join}=await copsSession(t)
  const [first,rescuer]=guests
  const start=epoch+100
  await frame(host,epoch,pose(125,33,168))
  const hiding=(await frame(first,start,pose(128,33,92))).cops
  assert.equal(hiding.phase,'hiding')
  assert.deepEqual(hiding.policeIds,[host.id])
  assert.equal(hiding.hideUntil,start+20_000)
  assert.equal(hiding.endsAt,hiding.hideUntil+60_000)
  assert.equal((await join(host,'途中から参加',start+30,8)).status,409)
  await frame(host,start+200,pose(92,33,92))
  const enrolled=await frame(rescuer,start+220,pose(92,33,92))
  const cop=enrolled.players.find(player=>player.id===host.id)
  assert.deepEqual([cop.pose.x,cop.pose.y,cop.pose.z,cop.pose.moving],[128.5,33,169.5,false])
  assert.deepEqual(new Set(enrolled.cops.enrolledIds),new Set([host.id,first.id,rescuer.id]))
  const hideEnds=hiding.hideUntil
  await frame(host,hideEnds-210,pose(61,33,61))
  await frame(first,hideEnds-200,pose(129,33,168))
  await frame(rescuer,hideEnds-190,pose(128.5,33,173.5))
  assert.equal((await frame(host,hideEnds,pose(128.5,33,169.5))).cops.phase,'playing')
  await frame(first,hideEnds+120,pose(128.55,33,169.48))
  const caught=(await frame(host,hideEnds+130,pose(128.5,33,169.5))).cops
  assert.equal(caught.phase,'playing')
  assert.deepEqual(caught.jailedIds,[first.id])
  assert.deepEqual(caught.event,{kind:'capture',ids:[first.id],by:host.id})
  assert.equal(caught.endsAt,hiding.endsAt)
  await frame(first,hideEnds+200,pose(128.5,33,177.5))
  const inJail=await frame(rescuer,hideEnds+210,pose(128.5,33,174))
  const prisoner=inJail.players.find(player=>player.id===first.id)
  assert.deepEqual([prisoner.pose.x,prisoner.pose.y,prisoner.pose.z,prisoner.pose.moving],[128.5,33,184.5,false])
  assert.deepEqual(inJail.cops.jailedIds,[first.id])
  const freed=(await frame(rescuer,hideEnds+430,pose(128.5,33,176))).cops
  assert.deepEqual(freed.jailedIds,[])
  assert.deepEqual(freed.event,{kind:'rescue',ids:[first.id],by:rescuer.id})
  await frame(host,hideEnds+500,pose(128.5,33,176))
  assert.deepEqual((await frame(rescuer,hideEnds+510,pose(128.5,33,176))).cops.jailedIds,[])

  const contact=hideEnds+3500
  const sameSpot=pose(118.5,33,157)
  await frame(first,contact,sameSpot)
  await frame(rescuer,contact+1,sameSpot)
  const finished=(await frame(host,contact+2,sameSpot)).cops
  assert.equal(finished.phase,'finished')
  assert.equal(finished.winner,'police')
  assert.deepEqual(finished.winnerIds,[host.id])
  assert.deepEqual(new Set(finished.jailedIds),new Set([first.id,rescuer.id]))
  assert.deepEqual(new Set(finished.results.map(player=>player.id)),new Set([host.id,first.id,rescuer.id]))
  assert.equal((await frame(first,contact+200,sameSpot)).cops.seq,finished.seq)
})

test('at the deadline the robbers win before a late touch can begin',async t=>{
  const {host,guests,frame,join}=await copsSession(t,'crossing',2)
  const [runner]=guests
  const at=pose(125,33,164)
  await frame(host,epoch,at)
  const {hideUntil,endsAt}=(await frame(runner,epoch+100,pose(118,33,151))).cops
  await frame(host,hideUntil-100,at)
  await frame(runner,hideUntil-90,pose(118,33,151))
  await frame(host,hideUntil,at)
  await frame(host,endsAt-15,at)
  const finished=(await frame(runner,endsAt,at)).cops
  assert.equal(finished.winner,'robbers')
  assert.deepEqual(finished.winnerIds,[runner.id])
  assert.deepEqual(finished.jailedIds,[])
  const closed=await join(host,'次の参加者',endsAt+20,8)
  assert.equal(closed.status,409)
  assert.deepEqual(await closed.json(),{error:'room-finished'})
})

test('a park seesaw has four shared seats with exclusive occupants and authorized control',async t=>{
  const {host,guests,frame,join,run}=await copsSession(t,'park',6)
  const [first,officer,...others]=guests
  const seat=pose(146.5,33,141.5)
  const far=pose(130.5,33,130.5)
  assert.equal((await join(host,'満員の参加者',epoch,8)).status,409)
  const empty=await frame(host,epoch,far,{id:'seesaw',pump:1})
  assert.deepEqual(empty.rides,[])
  const hiding=await frame(first,epoch+100,seat,{id:'seesaw',seat:0,pump:1})
  assert.deepEqual(hiding.cops.policeIds,[host.id,officer.id])
  assert.deepEqual(hiding.rides,[{id:'seesaw',seat:0,pump:1,memberId:first.id}])
  const collision=await frame(others[0],epoch+120,seat,{id:'seesaw',seat:0,pump:-1})
  assert.deepEqual(collision.rides,hiding.rides)
  for(const [i,guest] of others.entries())await frame(guest,epoch+130+i*10,seat,{id:'seesaw',pump:-1})
  const shared=await frame(host,epoch+220,seat,{id:'seesaw',pump:1})
  assert.deepEqual(shared.rides.map(rider=>rider.seat),[0,1,2,3])
  assert.deepEqual(new Set(shared.rides.map(rider=>rider.memberId)),new Set([first,...others].map(person=>person.id)))
  const stopped=await frame(first,epoch+240,seat,{id:'seesaw',pump:0})
  assert.equal(stopped.rides.find(rider=>rider.memberId===first.id).pump,0)
  const dismounted=await frame(first,epoch+260,seat,null)
  assert.equal(dismounted.rides.length,3)
  await run('leave',{code:host.room.code,token:others[0].token},{now:epoch+270})
  assert.equal((await frame(first,epoch+280,seat)).rides.length,2)
  assert.deepEqual((await frame(first,epoch+5000,seat)).rides,[])
})

async function tagSession(t) {
  const service = env(t)
  const host = await service.create('おにの候補', 'tag', epoch, 3)
  const guest = await (await service.join(host, '探検仲間', epoch, 3)).json()
  async function frame(actor, now, at) {
    const result = await service.sync(actor, {protocol:3,now,at})
    assert.equal(result.status, 200)
    return result.json()
  }
  async function pair(now, hostPose, guestPose) {
    await frame(guest, now, guestPose)
    return frame(host, now, hostPose)
  }
  return {...service,host,guest,frame,pair}
}

async function timedSession(t, minutes=1) {
  const service=env(t)
  const host=await service.create('ときの鬼','tag',epoch,4,minutes)
  const enlist=async nickname=>(await service.join(host,nickname,epoch,4)).json()
  const guest=await enlist('森の逃げ役')
  async function frame(actor, now, at=pose()){
    const response=await service.sync(actor,{protocol:4,now,at})
    assert.equal(response.status,200)
    return response.json()
  }
  const leave=(actor,now)=>service.run('leave',{code:host.room.code,token:actor.token},{now})
  return {...service,host,guest,enlist,frame,leave}
}

test('timed tag validates the selected duration and isolates old wire formats', async t=>{
  const {run,create,join,sync}=env(t)
  const body={nickname:'仲間',name:'丘',seed:'hill',mode:'tag',protocol:4}
  for (const tagMinutes of [0,2,30,1.5,'5',null]) {
    assert.equal((await run('rooms',{...body,tagMinutes})).status,400)
  }
  for (const mode of ['creative','explore']) {
    assert.equal((await run('rooms',{...body,mode,tagMinutes:5})).status,400)
  }
  assert.equal((await run('rooms',{...body,protocol:3,tagMinutes:5})).status,426)
  const defaultRoom=await create('標準','tag',epoch,4)
  assert.equal(defaultRoom.room.tagMinutes,5)
  for (const minutes of [1,3,5,10,15]) {
    const selected=await create('設定','tag',epoch,4,minutes)
    assert.equal(selected.room.tagMinutes,minutes)
    assert.equal((await join(selected,'旧版',epoch,3)).status,426)
    assert.equal((await sync(selected,{protocol:3})).status,426)
    const newest=await (await join(selected,'新版',epoch,4)).json()
    assert.equal(newest.room.tagMinutes,minutes)
  }
  const old=await create('旧ルーム','tag',epoch,3)
  assert.equal(old.room.tagMinutes,undefined)
  const oldState=(await (await sync(old,{protocol:3})).json()).tag
  const newState=(await (await sync(old,{protocol:4})).json()).tag
  assert.deepEqual(Object.keys(oldState).sort(),['hideUntil','it','phase','previousIt','seq'])
  assert.deepEqual(newState,{...oldState,endsAt:0,serverNow:epoch,winnerIds:[],results:[],enrolledIds:[]})
})

test('deadline follows hiding, exact-time contact cannot tag, and each client gets a frozen winner list', async t=>{
  const {host,guest,enlist,join,frame,leave}=await timedSession(t)
  const another=await enlist('湖の逃げ役')
  const spectator=await enlist('開始前に待機')
  const start=epoch+100
  assert.equal((await frame(spectator,epoch,null)).tag.phase,'waiting')
  assert.equal((await frame(host,epoch,pose(128))).tag.endsAt,0)
  const hiding=(await frame(guest,start,pose(130.5))).tag
  assert.equal(hiding.phase,'hiding')
  assert.equal(hiding.it,host.id)
  assert.equal(hiding.hideUntil,start+20_000)
  assert.equal(hiding.endsAt,hiding.hideUntil+60000)
  assert.equal(hiding.serverNow,start)
  assert.deepEqual(new Set(hiding.enrolledIds),new Set([host.id,guest.id]))
  assert.deepEqual(hiding.results,[])
  const late=await join(host,'開始後の参加',start+200,4)
  assert.equal(late.status,409)
  assert.deepEqual(await late.json(),{error:'round-started'})

  await frame(another,hiding.hideUntil-1,pose(130))
  await frame(spectator,hiding.hideUntil,pose(128))
  const playing=await frame(host,hiding.hideUntil,pose(128))
  assert.equal(playing.tag.phase,'playing')
  assert.deepEqual(new Set(playing.tag.enrolledIds),new Set([host.id,guest.id,another.id]))
  assert.equal(playing.players.some(player=>player.id===spectator.id),false)
  await frame(another,hiding.endsAt-300,pose(130))
  await frame(guest,hiding.endsAt-290,pose(130.5))
  const before=await frame(host,hiding.endsAt-1,pose(129.2))
  assert.equal(before.tag.phase,'playing')
  assert.equal(before.tag.it,host.id)

  const calls=await Promise.all([
    frame(host,hiding.endsAt,pose(130.4)),
    frame(guest,hiding.endsAt,pose(130.4)),
    frame(another,hiding.endsAt,pose(130.4))
  ])
  for(const {tag} of calls){
    assert.equal(tag.phase,'finished')
    assert.equal(tag.it,host.id)
    assert.equal(tag.previousIt,null)
    assert.equal(tag.endsAt,hiding.endsAt)
    assert.equal(tag.serverNow,hiding.endsAt)
    assert.equal(tag.seq,calls[0].tag.seq)
    assert.deepEqual(tag.results[0],{id:host.id,nickname:'ときの鬼'})
    assert.deepEqual(new Set(tag.winnerIds),new Set([guest.id,another.id]))
    assert.deepEqual(new Set(tag.results.slice(1).map(result=>result.nickname)),new Set(['森の逃げ役','湖の逃げ役']))
  }
  await leave(another,hiding.endsAt+1)
  const stable=await frame(guest,hiding.endsAt+10_000)
  assert.deepEqual(stable.tag,{...calls[0].tag,serverNow:hiding.endsAt+10_000})
  const finished=await join(host,'終了後の参加',hiding.endsAt+10_010,4)
  assert.equal(finished.status,409)
  assert.deepEqual(await finished.json(),{error:'room-finished'})
})

test('timed tag preserves the last ghost and clock through sparse polls and explicit departures', async t=>{
  const {host,guest,enlist,frame,leave}=await timedSession(t,3)
  const departed=await enlist('途中で退出')
  const spectator=await enlist('開始前に待機')
  await frame(host,epoch,pose(128))
  const hiding=(await frame(guest,epoch+1,pose(129))).tag
  await frame(departed,epoch+2,pose(129))
  const chase=(await frame(guest,hiding.hideUntil+100,pose(129))).tag
  await frame(spectator,hiding.hideUntil+200,pose(129))
  assert.equal(chase.phase,'playing')
  assert.equal(chase.endsAt,hiding.hideUntil+180000)
  assert.deepEqual(new Set(chase.enrolledIds),new Set([host.id,guest.id,departed.id]))
  assert.equal(chase.it,host.id)
  await leave(departed,chase.endsAt-1100)
  await leave(host,chase.endsAt-1000)
  const alone=(await frame(guest,chase.endsAt-1,pose(129))).tag
  assert.equal(alone.it,host.id)
  assert.equal(alone.endsAt,chase.endsAt)
  const finished=(await frame(guest,chase.endsAt+1,pose(129))).tag
  assert.deepEqual(finished.results,[{id:host.id,nickname:'ときの鬼'},{id:guest.id,nickname:'森の逃げ役'}])
  assert.deepEqual(finished.winnerIds,[guest.id])
  assert.equal(finished.phase,'finished')
})

test('a tag hides and pauses the chase for 20 seconds without reopening the roster', async t=>{
  const {host,guest,enlist,join,frame}=await timedSession(t)
  const spectator=await enlist('開始前に待機')
  await frame(host,epoch,pose(128))
  const hiding=(await frame(guest,epoch+1,pose(129))).tag
  await frame(host,hiding.hideUntil,pose(128))
  await frame(host,hiding.hideUntil+100,pose(128))
  await frame(guest,hiding.hideUntil+100,pose(129))
  const taggedAt=hiding.hideUntil+350
  await frame(host,taggedAt,pose(128))
  const tag=(await frame(guest,taggedAt,pose(128.3))).tag
  assert.equal(tag.phase,'hiding')
  assert.equal(tag.it,guest.id)
  assert.equal(tag.previousIt,host.id)
  assert.equal(tag.hideUntil,taggedAt+20_000)
  assert.equal(tag.endsAt,hiding.endsAt+20_000)
  assert.equal(tag.endsAt-tag.hideUntil,hiding.endsAt-taggedAt)

  for(const elapsed of [700,2500,8000,19_999]){
    const now=taggedAt+elapsed
    await frame(spectator,now,pose(128.3))
    await frame(guest,now,pose(128.3))
    const escaping=await frame(host,now,pose(128.3))
    assert.equal(escaping.tag.seq,tag.seq)
    assert.equal(escaping.tag.it,guest.id)
    assert.equal(escaping.tag.phase,'hiding')
    assert.equal(escaping.players.some(player=>player.id===spectator.id),false)
  }
  const resumed=(await frame(host,tag.hideUntil,pose(132))).tag
  assert.equal(resumed.phase,'playing')
  assert.equal(resumed.seq,tag.seq+1)
  assert.deepEqual(new Set(resumed.enrolledIds),new Set([host.id,guest.id]))
  assert.equal((await join(host,'途中参加',tag.hideUntil+1,4)).status,409)
  assert.equal((await frame(host,hiding.endsAt,pose(132))).tag.phase,'playing')
  const finalized=(await frame(host,tag.endsAt,pose(132))).tag
  assert.equal(finalized.phase,'finished')
  assert.equal(finalized.it,guest.id)
  assert.deepEqual(finalized.winnerIds,[host.id])
  assert.deepEqual(finalized.results,[{id:guest.id,nickname:'森の逃げ役'},{id:host.id,nickname:'ときの鬼'}])
})

test('a touch just before expiry extends the clock exactly once and retains its last millisecond', async t=>{
  const {host,guest,frame}=await timedSession(t)
  await frame(host,epoch,pose(128))
  const hiding=(await frame(guest,epoch+1,pose(129))).tag
  await frame(host,hiding.hideUntil,pose(128))
  const end=hiding.endsAt
  await frame(host,end-311,pose(128))
  await frame(guest,end-311,pose(129))
  await frame(host,end-1,pose(128))
  const touch=(await frame(guest,end-1,pose(128.3))).tag
  assert.equal(touch.it,guest.id)
  assert.equal(touch.endsAt-touch.hideUntil,1)
  assert.equal(touch.endsAt,end+20_000)
  assert.equal((await frame(guest,end,pose(128.3))).tag.phase,'hiding')
  assert.equal((await frame(host,touch.hideUntil,pose(128))).tag.phase,'playing')
  const final=(await frame(host,touch.endsAt,pose(128))).tag
  assert.equal(final.phase,'finished')
  assert.deepEqual(final.winnerIds,[host.id])
})

test('a round can finish after an extended interruption without a chase-phase poll', async t=>{
  const {host,guest,enlist,frame}=await timedSession(t)
  const lobby=await Promise.all(['三人目','四人目','五人目','六人目'].map(name=>enlist(name)))
  await frame(host,epoch,pose(128))
  const hiding=(await frame(guest,epoch+1,pose(129))).tag
  for(const [index,entrant] of lobby.entries())await frame(entrant,hiding.hideUntil-10+index,pose(132))
  const resume=(await frame(host,hiding.endsAt+2000,pose(129))).tag
  assert.equal(resume.phase,'finished')
  assert.equal(resume.it,host.id)
  assert.deepEqual(new Set(resume.winnerIds),new Set([guest.id,...lobby.map(entrant=>entrant.id)]))
  assert.equal(resume.enrolledIds.length,6)
})

test('room code, seeds, and player positions work with distinct room-only credentials', async t => {
  const {sql,run,create,join,sync} = env(t)
  const host = await create()
  const visitorRes = await join(host)
  assert.equal(visitorRes.status, 200)
  const visitor = await visitorRes.json()
  assert.match(host.room.code, /^[A-HJ-NP-Z2-9]{8}$/)
  assert.deepEqual(host.room, visitor.room)
  assert.equal(host.room.seed, 'hill')
  assert.equal(host.room.mode, 'creative')
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

test('tag requires current clients, rejects terrain edits and keeps other room modes independent', async t => {
  const {run,create,join,sync,host,guest,frame,sql} = await tagSession(t)
  const request = {name:'みんなの丘',seed:'hill',nickname:'新規',mode:'tag'}
  assert.equal((await run('rooms', {...request,protocol:2})).status, 426)
  assert.equal(host.room.mode, 'tag')
  assert.deepEqual(host.room, guest.room)
  assert.equal((await join(host, '前の版', epoch, 2)).status, 426)
  assert.equal((await sync(host, {protocol:2})).status, 426)
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM webcraft_members WHERE room_code=?').get(host.room.code).n, 2)
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM webcraft_members WHERE pose IS NOT NULL').get().n, 0)
  const edit = {key:voxel(132,33,130),fromRevision:0,before:0,block:8,axis:'y',actionId:crypto.randomUUID()}
  assert.equal((await sync(host, {protocol:3,edit})).status, 403)
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM webcraft_cells WHERE room_code=?').get(host.room.code).n, 0)
  assert.deepEqual((await frame(host,epoch+1,pose())).tag,
    {it:null,phase:'waiting',hideUntil:0,seq:0,previousIt:null})
  const explorer = await create('探索者', 'explore', epoch, 3)
  assert.equal((await join(explorer, '前の版', epoch, 2)).status, 200)
  const modified = await (await sync(explorer, {protocol:3,edit:{...edit,block:21}})).json()
  assert.equal(modified.cells[0].block,21)
  assert.equal('tag' in modified,false)
  const builder = await create('自由建築', 'creative', epoch, 3)
  const creative = await (await sync(builder, {protocol:3,edit:{...edit,block:31}})).json()
  assert.equal(creative.cells[0].block,31)
  assert.equal('tag' in creative,false)
})

test('tag waits for two players and a hiding period, tracks swept body contact and prevents tag-back', async t => {
  const {host,guest,frame,pair} = await tagSession(t)
  const hostStart = pose(128,33,129)
  const guestStart = pose(129,33,128)
  const starts = epoch + 100
  const deadline = starts + 20_000
  assert.equal((await frame(host, epoch, hostStart)).tag.phase,'waiting')
  assert.deepEqual((await frame(guest,starts,hostStart)).tag,
    {it:host.id,phase:'hiding',hideUntil:deadline,seq:1,previousIt:null})
  for (const elapsed of [3000,6000,9000,12000,15000,18000,19_800]) {
    const hiding = (await pair(starts+elapsed, hostStart, hostStart)).tag
    assert.equal(hiding.it,host.id)
    assert.equal(hiding.phase,'hiding')
  }
  assert.deepEqual((await pair(deadline,hostStart,guestStart)).tag,
    {it:host.id,phase:'playing',hideUntil:deadline,seq:2,previousIt:null})
  // No pair of end points is close enough. The paths cross between polls.
  const swapped = (await pair(deadline+300,pose(130,33,129),pose(129,33,130))).tag
  const release=deadline+300+20_000
  assert.deepEqual(swapped, {it:guest.id,phase:'hiding',hideUntil:release,seq:3,previousIt:host.id})
  for (const elapsed of [600,3000,6000,9000,12000,15000,18000,20_299]) {
    const protectedState = (await pair(deadline+elapsed,hostStart,hostStart)).tag
    assert.equal(protectedState.it,guest.id)
    assert.equal(protectedState.seq,3)
  }
  assert.equal((await pair(release,guestStart,hostStart)).tag.phase,'playing')
  const back = (await pair(release+300,hostStart,hostStart)).tag
  assert.equal(back.it,host.id)
  assert.equal(back.seq,5)
  assert.equal(back.previousIt,guest.id)
})

test('tag ignores different levels, stale positions and out-of-order samples', async t => {
  const {host,guest,frame,pair,sql} = await tagSession(t)
  const start = epoch + 100
  const deadline = start + 20_000
  const below = pose(128,33,129)
  const above = pose(129,36,128)
  for (const elapsed of [0,3000,6000,9000,12000,15000,18000,20_000]) await pair(start+elapsed,below,above)
  const crossed = (await pair(deadline+300,pose(130,33,129),pose(129,36,130))).tag
  assert.equal(crossed.it,host.id)
  assert.equal(crossed.seq,2)
  await frame(guest,deadline+600,below)
  await frame(host,deadline+1500,below)
  const stale = (await frame(host,deadline+1750,below)).tag
  assert.equal(stale.it,host.id)
  assert.equal(stale.seq,2)
  await frame(guest,deadline+1650,pose(132,33,130))
  await frame(guest,deadline+1640,below)
  assert.equal(sql.prepare('SELECT pose_at FROM webcraft_members WHERE id=?').get(guest.id).pose_at,deadline+1650)
  assert.equal((await frame(host,deadline+1850,below)).tag.it,host.id)
})

async function chaseSession(t,mode,stage=mode==='tag'?'flat':'park') {
  const service=env(t),protocol=9
  const created=await service.run('rooms',{mode,stage,protocol,tagMinutes:1,nickname:'追う役',name:'すれ違い'})
  assert.equal(created.status,201)
  const pursuer=await created.json()
  const runner=await (await service.join(pursuer,'逃げ役',epoch,protocol)).json()
  async function sample(actor,now,at,sampleAt){
    const response=await service.sync(actor,{protocol,now,at,sampleAt})
    assert.equal(response.status,200)
    return response.json()
  }
  await sample(pursuer,epoch,pose(70,33,70))
  const start=(await sample(runner,epoch+100,pose(90,33,90)))[mode].hideUntil
  await sample(pursuer,start,pose(70,33,70))
  return {...service,pursuer,runner,sample,start}
}

for(const [mode,stage] of [['tag','flat'],['cops','park'],['cops','crossing']]){
  test(`${mode}/${stage} recognizes a brief perpendicular touch after a delayed poll`,async t=>{
    const {pursuer,runner,sample,start}=await chaseSession(t,mode,stage)
    const t0=start+1000, offset=320, interval=260
    const pace=mode==='tag'?9:6.3
    const chasing=millis=>pose(128+(millis-130)*pace/1000,33,128)
    const escaping=millis=>pose(128,33,128+(millis-130)*6.3/1000)
    await sample(pursuer,t0,chasing(0),t0)
    await sample(pursuer,t0+interval,chasing(interval),t0+interval)
    const before=await sample(runner,t0+offset,escaping(0),t0)
    assert.equal(before[mode].phase,'playing')
    assert.equal(before.players.find(({id})=>id===pursuer.id).poseAt,t0+interval)
    await sample(pursuer,t0+2*interval,chasing(2*interval),t0+2*interval)

    // Latest endpoints are far apart. The runner's second position arrives
    // after the pursuer has already advanced past the only overlapping step.
    const after=await sample(runner,t0+interval+offset,escaping(interval),t0+interval)
    if(mode==='tag'){
      assert.equal(after.tag.it,runner.id)
      assert.equal(after.tag.previousIt,pursuer.id)
      assert.equal(after.tag.phase,'hiding')
    }else{
      assert.deepEqual(after.cops.event,{kind:'capture',ids:[runner.id],by:pursuer.id})
      assert.equal(after.cops.winner,'police')
    }
  })
}

test('corrected touch samples respect the hiding fence, floor separation and impossible jumps',async t=>{
  const {pursuer,runner,sample,start}=await chaseSession(t,'tag')
  const contact=pose(120,33,120)
  await sample(pursuer,start+100,contact,start-50)
  const hiddenContact=await sample(runner,start+120,contact,start-35)
  assert.equal(hiddenContact.tag.it,pursuer.id)
  for(const [offset,x] of [[900,118.5],[1180,121.0]]){
    await sample(pursuer,start+offset,pose(x,33,120),start+offset)
    const floor=await sample(runner,start+offset+240,pose(120,36,120),start+offset)
    assert.equal(floor.tag.it,pursuer.id)
  }
  await sample(runner,start+1920,pose(120,33,120),start+1700)
  await sample(pursuer,start+1940,pose(93,33,120),start+1720)
  await sample(pursuer,start+2080,pose(148,33,120),start+1860)
  const teleport=await sample(runner,start+2120,contact,start+1900)
  assert.equal(teleport.tag.it,pursuer.id)
  assert.equal(teleport.tag.phase,'playing')
})

test('additive touch history limiting preserves older rooms and rejects untrusted sample times',async t=>{
  const {pursuer,runner,sample,start,sql}=await chaseSession(t,'tag')
  sql.exec('ALTER TABLE webcraft_members DROP COLUMN sample_at; ALTER TABLE webcraft_members DROP COLUMN pose_history;')
  sql.exec(readFileSync(new URL('./touch-history-migration.sql',import.meta.url),'utf8'))
  const status=sql.prepare('SELECT pose_at,sample_at,json_array_length(pose_history) AS samples FROM webcraft_members WHERE id=?')
  const at=pose(72,33,72), t0=start+1500
  const initial=status.get(pursuer.id)
  assert.equal(initial.sample_at,0)
  assert.equal(initial.samples,0)
  await sample(pursuer,t0,at,t0-351)
  assert.equal(status.get(pursuer.id).sample_at,t0)
  await sample(pursuer,t0+250,at,t0+251)
  assert.equal(status.get(pursuer.id).sample_at,t0+250)
  await sample(pursuer,t0+310,at,t0+180)
  assert.equal(status.get(pursuer.id).sample_at,t0+251)
  for(let index=2;index<12;index++)await sample(pursuer,t0+260*index,at,t0+260*index-50)
  const latest=status.get(pursuer.id)
  assert.equal(latest.pose_at,t0+260*11)
  assert.equal(latest.sample_at,latest.pose_at-50)
  assert.equal(latest.samples,5)
  const frame=await sample(runner,latest.pose_at+10,pose(88,33,88))
  assert.equal(frame.players[0].poseAt,latest.sample_at)
})

test('concurrent contact changes the ghost once, and departure, rejoining and expiry stay isolated', async t => {
  const {host,guest,frame,pair,join,run,create,sql} = await tagSession(t)
  const third = await (await join(host,'三人目',epoch,3)).json()
  const another = await create('別の部屋', 'tag', epoch, 3)
  const start = epoch + 100
  const deadline = start + 20_000
  const here = pose(128,33,129)
  const there = pose(129.5,33,129)
  await frame(host, epoch, here)
  for (const elapsed of [0,3000,6000,9000,12000,15000,18000,20_000]) {
    await frame(third,start+elapsed,pose(125,33,130))
    await pair(start+elapsed,here,there)
  }
  await Promise.all([host,guest,third].map(actor => frame(actor,deadline+300,here)))
  const touched = (await frame(host,deadline+301,here)).tag
  assert.equal(touched.seq,3)
  assert.equal(touched.previousIt,host.id)
  const departed = touched.it === guest.id ? guest : third
  const remaining = departed === guest ? third : guest
  assert.equal((await run('leave',{code:host.room.code,token:departed.token},{now:deadline+500})).status,200)
  const replacement = (await frame(remaining,deadline+550,here)).tag
  assert.equal(replacement.seq,4)
  assert.equal(replacement.phase,'hiding')
  assert.equal(replacement.it,host.id)
  assert.equal(replacement.previousIt,null)
  assert.equal((await run('leave',{code:host.room.code,token:host.token},{now:deadline+600})).status,200)
  const waiting = (await frame(remaining,deadline+650,here)).tag
  assert.deepEqual(waiting,{it:null,phase:'waiting',hideUntil:0,seq:5,previousIt:null})
  const rejoined = await (await join(host,'再参加',deadline+700,3)).json()
  const resumed = (await frame(rejoined,deadline+750,there)).tag
  assert.equal(resumed.phase,'hiding')
  assert.equal(resumed.seq,6)
  assert.equal((await frame(another,deadline+750,here)).tag.seq,0)
  await create('新しい部屋','creative',epoch+day+10_000)
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM webcraft_tag_state').get().n,0)
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

test('stage is authoritative for each room in every multiplayer mode', async t => {
  const {run,join,sync}=env(t)
  const base={name:'選べる地形',nickname:'ホスト',seed:'shared-stage',protocol:5}
  const withoutStage=await run('rooms',base)
  assert.equal(withoutStage.status,201)
  assert.equal((await withoutStage.json()).room.stage,'classic')
  for(const stage of ['','ocean',5,null]){
    assert.equal((await run('rooms',{...base,stage})).status,400)
  }
  for(const mode of ['creative','explore','tag']){
    for(const stage of ['classic','flat','lake']){
      const created=await run('rooms',{...base,stage,mode})
      assert.equal(created.status,201)
      const host=await created.json()
      assert.equal(host.room.stage,stage)
      assert.equal(host.room.mode,mode)
      assert.equal(host.room.generator,2)
      assert.equal(host.room.seed,base.seed)
      const joined=await run('join',{code:host.room.code,nickname:'ゲスト',protocol:5,stage:'unknown'})
      assert.equal(joined.status,200)
      assert.deepEqual((await joined.json()).room,host.room)
      const legacyProtocol={creative:1,explore:2,tag:4}[mode]
      const legacy=await join(host,'旧バージョン',epoch,legacyProtocol)
      assert.equal(legacy.status,stage==='classic'?200:426)
      if(legacy.ok){
        const {stage:_stage,...expected}=host.room
        assert.deepEqual((await legacy.json()).room,expected)
      }
      assert.equal((await sync(host,{protocol:5})).status,200)
      const current=await join(host,'新版',epoch,6)
      assert.equal(current.status,200)
      assert.deepEqual((await current.json()).room,host.room)
    }
  }
})

test('old clients cannot mutate alternate rooms before protocol validation', async t => {
  const {sql,run,create,join,sync}=env(t)
  const selected={name:'まっさらな平地',nickname:'ホスト',stage:'flat'}
  assert.equal((await run('rooms',{...selected,protocol:4})).status,426)
  const response=await run('rooms',{...selected,protocol:5})
  assert.equal(response.status,201)
  const host=await response.json()
  const edit={key:voxel(132,33,130),fromRevision:0,before:0,block:8,axis:'y'}
  assert.equal((await sync(host,{edit,protocol:4,now:epoch+5_000})).status,426)
  assert.deepEqual({...sql.prepare('SELECT last_seen,pose FROM webcraft_members WHERE room_code=?').get(host.room.code)},
    {last_seen:epoch,pose:null})
  const initial=await (await sync(host,{protocol:5})).json()
  assert.equal(initial.revision,0)
  assert.deepEqual(initial.cells,[])
  assert.deepEqual((await (await sync(host,{edit,protocol:5})).json()).result,{ok:true})

  const legacy=await create()
  assert.equal(legacy.room.stage,undefined)
  assert.equal((await (await join(legacy,'新版',epoch,5)).json()).room.stage,'classic')
})

test('school is a timed tag stage shared by current hosts and guests', async t => {
  const {sql,run,join,sync}=env(t)
  const settings={name:'放課後の学校',nickname:'鬼の候補',seed:'after-school',stage:'school',mode:'tag'}
  for(const mode of [undefined,'creative','explore']){
    assert.equal((await run('rooms',{...settings,mode,protocol:6})).status,400)
  }
  assert.equal((await run('rooms',{...settings,tagMinutes:0,protocol:6})).status,400)
  for(const protocol of [undefined,3,4,5]){
    assert.equal((await run('rooms',{...settings,protocol})).status,426)
  }
  const created=await run('rooms',{...settings,protocol:6,tagMinutes:3})
  assert.equal(created.status,201)
  const host=await created.json()
  assert.equal(host.room.mode,'tag')
  assert.equal(host.room.stage,'school')
  assert.equal(host.room.tagMinutes,3)
  assert.deepEqual({...sql.prepare('SELECT stage,tag_stage FROM webcraft_rooms WHERE code=?').get(host.room.code)},
    {stage:'classic',tag_stage:'school'})

  const rejected=await join(host,'古いゲーム画面',epoch,5)
  assert.equal(rejected.status,426)
  const oldFrame=await sync(host,{protocol:5,now:epoch+5000})
  assert.equal(oldFrame.status,426)
  assert.deepEqual({...sql.prepare('SELECT last_seen,pose FROM webcraft_members WHERE room_code=?').get(host.room.code)},
    {last_seen:epoch,pose:null})
  assert.equal(sql.prepare('SELECT COUNT(*) n FROM webcraft_members WHERE room_code=?').get(host.room.code).n,1)
  const joined=await run('join',{code:host.room.code,nickname:'探検仲間',protocol:6,stage:'flat'})
  assert.equal(joined.status,200)
  const guest=await joined.json()
  assert.deepEqual(guest.room,host.room)

  async function frame(actor,now,at) {
    const response=await sync(actor,{protocol:6,now,at})
    assert.equal(response.status,200)
    return response.json()
  }
  assert.equal((await frame(host,epoch,pose(128))).tag.phase,'waiting')
  const start=epoch+100
  const hiding=(await frame(guest,start,pose(130))).tag
  assert.equal(hiding.phase,'hiding')
  assert.equal(hiding.it,host.id)
  assert.equal(hiding.hideUntil,start+20_000)
  assert.equal(hiding.endsAt,hiding.hideUntil+3*60_000)
  assert.equal((await join(host,'途中参加',start+5,6)).status,409)
  const playing=(await frame(host,hiding.hideUntil,pose(128))).tag
  assert.equal(playing.phase,'playing')
  const edit={key:voxel(132,33,130),fromRevision:0,before:0,block:8,axis:'y'}
  assert.equal((await sync(host,{protocol:6,edit,now:hiding.hideUntil+5})).status,403)
  const finished=await frame(guest,hiding.endsAt,pose(130))
  assert.equal(finished.tag.phase,'finished')
  assert.equal(finished.tag.it,host.id)
  assert.deepEqual(finished.tag.winnerIds,[guest.id])
  assert.deepEqual(finished.cells,[])
})

test('CPU tag validates counts, reserves seats and waits for a real player to start',async t=>{
  const {run,join,sync}=env(t)
  const args={name:'CPUと鬼ごっこ',nickname:'ホスト',mode:'tag',stage:'flat',protocol:7,tagMinutes:1}
  for(const tagBots of [-1,1.5,5,'2',null])
    assert.equal((await run('rooms',{...args,tagBots})).status,400)
  for(const choice of [{mode:'creative',tagMinutes:undefined},{mode:'explore',tagMinutes:undefined},{stage:'lake'},{stage:'classic'}])
    assert.equal((await run('rooms',{...args,...choice,tagBots:1})).status,400)
  assert.equal((await run('rooms',{...args,protocol:6,tagBots:1})).status,426)
  const result=await run('rooms',{...args,tagBots:4})
  assert.equal(result.status,201)
  const host=await result.json()
  assert.equal(host.room.tagBots,4)
  assert.equal((await join(host,'旧版',epoch,6)).status,426)
  const guest=await (await join(host,'ひとりの仲間',epoch,7)).json()
  assert.equal(guest.room.tagBots,4)
  assert.equal((await join(host,'定員超過',epoch,7)).status,409)
  const frames=[]
  for(const who of [host,guest]){
    const waiting=await (await sync(who,{protocol:7,at:null})).json()
    assert.equal(waiting.tag.phase,'waiting')
    assert.equal(waiting.players.length,4)
    assert(waiting.players.every(bot=>bot.cpu===true&&bot.nickname.startsWith('CPU ')))
    assert(waiting.players.every(bot=>!Object.hasOwn(bot,'token')&&!Object.hasOwn(bot.pose,'waypoint')))
    frames.push(waiting)
  }
  assert.deepEqual(frames[0].players,frames[1].players)
})

test('a solo player and a server CPU share starts, movement, handoffs, countdown and results',async t=>{
  const {run,sync,sql}=env(t)
  const host=await (await run('rooms',{name:'CPUと鬼ごっこ',nickname:'ひとりの鬼',mode:'tag',stage:'flat',
    protocol:7,tagMinutes:1,tagBots:1})).json()
  const start=epoch+10
  const atHome=pose(128.5,33,139.5)
  const frame=async(now,at=atHome)=>{
    const response=await sync(host,{protocol:7,now,at})
    assert.equal(response.status,200)
    return response.json()
  }
  const first=await frame(start)
  const cpu=first.players[0]
  assert.equal(first.tag.phase,'hiding')
  assert.equal(first.tag.it,host.id)
  assert.equal(first.tag.hideUntil,start+20_000)
  assert.deepEqual(new Set(first.tag.enrolledIds),new Set([host.id,cpu.id]))
  const escape=await frame(start+260)
  assert.notDeepEqual(escape.players[0].pose,cpu.pose)
  assert(!Object.hasOwn(escape.players[0].pose,'stamina'))
  const before=await frame(first.tag.hideUntil)
  assert.equal(before.tag.phase,'playing')
  const locate=await frame(first.tag.hideUntil+250)
  const catchAt=first.tag.hideUntil+251
  const hit=await frame(catchAt,locate.players[0].pose)
  assert.equal(hit.tag.it,cpu.id)
  assert.equal(hit.tag.previousIt,host.id)
  assert.equal(hit.tag.phase,'hiding')
  assert.equal(hit.tag.hideUntil,catchAt+20_000)
  assert.equal(hit.tag.endsAt,first.tag.endsAt+20_000)
  const frozen=await frame(catchAt+1000)
  assert.equal(frozen.players[0].pose.moving,false)
  assert.equal(frozen.players[0].pose.x,hit.players[0].pose.x)
  assert.equal(frozen.players[0].pose.z,hit.players[0].pose.z)
  const away=pose(Math.min(250,frozen.players[0].pose.x+4),33,frozen.players[0].pose.z)
  await frame(hit.tag.hideUntil-500,away)
  const release=await frame(hit.tag.hideUntil,away)
  assert.equal(release.tag.phase,'playing')
  const pursuitAt=hit.tag.hideUntil+250
  const repeated=await Promise.all([frame(pursuitAt,away),frame(pursuitAt,away)])
  assert.deepEqual(repeated[0].players,repeated[1].players)
  assert.notEqual(repeated[0].players[0].pose.x,frozen.players[0].pose.x)
  assert.equal(sql.prepare('SELECT pose_at FROM webcraft_members WHERE room_code=? AND id=?').get(host.room.code,cpu.id).pose_at,pursuitAt)
  const finish=await frame(hit.tag.endsAt)
  assert.equal(finish.tag.phase,'finished')
  assert.equal(finish.tag.it,cpu.id)
  assert.deepEqual(finish.tag.winnerIds,[host.id])
  assert.deepEqual(finish.tag.results,[{id:cpu.id,nickname:cpu.nickname},{id:host.id,nickname:'ひとりの鬼'}])
})

test('flat CPU tag dashes at a 10:7 ratio, then walks and recovers after exhaustion',()=>{
  const current=pose(96.5,33,139.5)
  const bot={id:'cpu-1',current,pose_at:epoch}
  const hunter={id:'person',current:pose(106.5,33,139.5)}
  const target={id:'person',current:pose(228.5,33,139.5)}
  const seconds=.25
  const tick=(current,now,it,peer)=>tagBotPose('flat',{...bot,current,pose_at:now},[peer],
    {phase:'playing',it},now+seconds*1000)
  const distance=(from,to)=>Math.hypot(from.x-to.x,from.z-to.z)
  const close=(actual,expected)=>assert(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`)
  const ghost=tick(current,epoch,bot.id,target)
  const runner=tick(current,epoch,hunter.id,hunter)
  close(distance(current,ghost),9*seconds)
  close(distance(current,runner),6.3*seconds)
  close(distance(current,ghost)/distance(current,runner),10/7)

  let at=current
  for(let i=0;i<16;i++)at=tick(at,epoch+i*250,bot.id,target)
  assert.deepEqual(at.stamina,{energy:0,rest:0,exhausted:true})
  for(let i=16;i<21;i++){
    const next=tick(at,epoch+i*250,bot.id,target)
    close(distance(at,next),4.2*seconds)
    if(i<20)assert.equal(next.stamina.energy,0)
    at=next
  }
  close(at.stamina.energy,1.1)
  for(let i=21;i<32;i++)at=tick(at,epoch+i*250,bot.id,target)
  assert(at.stamina.energy>=55)
  const resumed=tick(at,epoch+32*250,bot.id,target)
  close(distance(at,resumed),9*seconds)
})

for(const stage of ['park','crossing'])test(`both cops CPU teams use the same dash pace in ${stage}`,()=>{
  const position=pose(128.5,33,172.5)
  const elapsed=.12
  const base={stage,id:'cpu-1',pose:position,elapsed,now:epoch}
  const officer=copsBotPose({...base,policeIds:['cpu-1'],jailedIds:[],
    players:[{id:'runner',pose:pose(128.5,33,177.5)}]})
  const runner=copsBotPose({...base,policeIds:['officer'],jailedIds:['prisoner'],players:[]})
  const distances=[officer,runner].map(bot=>Math.hypot(bot.x-position.x,bot.z-position.z))
  assert(distances.every(distance=>Math.abs(distance-6.3*elapsed)<1e-8))
  assert.deepEqual(officer.stamina,runner.stamina)
})

test('school CPUs climb the staircase and stop against the matching target floor',()=>{
  const bot=tagBotSeats('school',1)[0]
  const player={id:'person',current:pose(106.5,40,118.5)}
  const room={phase:'playing',it:bot.id}
  let now=epoch
  let current=bot.pose
  const heights=new Set()
  for(let i=0;i<240;i++){
    const next=tagBotPose('school',{...bot,current,pose_at:now},[player],room,now+200)
    assert(Math.abs(next.y-current.y)<=1)
    assert(Math.hypot(next.x-current.x,next.z-current.z)<=1.801)
    current=next
    heights.add(next.y)
    now+=200
  }
  assert.deepEqual([...heights],[33,34,35,36,37,38,39,40])
  assert.equal(current.x,player.current.x)
  assert.equal(current.z,player.current.z)
})

test('a school CPU can dash several blocks down a straight hall and still stops at bends',()=>{
  const cpu=tagBotSeats('school',1)[0]
  const start=cpu.pose
  const bot={...cpu,current:start,pose_at:epoch}
  const elapsed=.26
  const step=(current,offset)=>tagBotPose('school',{...bot,current},
    [{id:'person',current:{...start,x:start.x+offset}}],{phase:'playing',it:cpu.id},epoch+elapsed*1000)
  const dash=step(start,8)
  const walk=step({...start,stamina:{energy:0,rest:0,exhausted:true}},8)
  const turn=step(start,-8)
  assert(Math.abs(dash.x-start.x-9*elapsed)<1e-8)
  assert(Math.abs(walk.x-start.x-4.2*elapsed)<1e-8)
  assert.equal(turn.x,start.x-1)
  assert.equal(turn.z,start.z)
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

test('playground blocks and their encoded directions can be placed, shared, and removed', async t => {
  const {create,join,sync} = env(t)
  const host=await create(),visitor=await (await join(host)).json()
  const key=voxel(132,33,130)
  let revision=0
  for(let block=27;block<=33;block++) {
    const edit={key,before:0,fromRevision:revision,block,axis:'y'}
    const placed=await (await sync(host,{since:revision,edit})).json()
    assert.equal(placed.result.ok,true)
    const copy=await (await sync(visitor,{since:revision})).json()
    assert.deepEqual(copy.cells,[{key,block,axis:'y',revision:++revision}])
    const legacy=await (await sync(visitor,{since:revision-1,protocol:1})).json()
    assert.deepEqual(legacy.cells,[{key,block:8,axis:'y',revision}])
    const removed=await (await sync(host,{since:revision,edit:{...edit,fromRevision:revision,before:block,block:0}})).json()
    assert.deepEqual(removed.cells,[{key,block:0,axis:'y',revision:++revision}])
  }
  const base={key,fromRevision:revision,before:0,axis:'y'}
  assert.equal((await sync(host,{since:revision,edit:{...base,block:34}})).status,400)
  assert.equal((await sync(host,{since:revision,edit:{...base,block:31,axis:'x'}})).status,400)
})

test('only current clients can join and edit shared workbenches in exploration rooms', async t => {
  const {sql,run,create,join,sync}=env(t)
  const explorer=await create('案内役','explore')
  assert.equal(explorer.room.mode,'explore')
  assert.equal((await run('join',{code:explorer.room.code,nickname:'旧版'})).status,426)
  assert.equal((await join(explorer,'旧版',epoch,1)).status,426)
  assert.equal((await sync(explorer,{protocol:1,now:epoch+5000})).status,426)
  const oldSeat=sql.prepare('SELECT last_seen FROM webcraft_members WHERE room_code=?').all(explorer.room.code)
  assert.deepEqual(oldSeat.map(seat=>seat.last_seen),[epoch])
  const visitor=await (await join(explorer)).json()
  assert.deepEqual(visitor.room,explorer.room)
  const key=voxel(133,33,130)
  const edit={key,fromRevision:0,before:0,block:21,axis:'y'}
  assert.equal((await sync(explorer,{edit})).status,400)
  assert.equal((await sync(explorer,{edit:{...edit,actionId:'not-a-uuid'}})).status,400)
  assert.equal((await sync(explorer,{edit:{...edit,block:22,actionId:crypto.randomUUID()}})).status,400)
  assert.equal((await (await sync(explorer)).json()).revision,0)
  const placed=await (await sync(explorer,{edit:{...edit,actionId:crypto.randomUUID()}})).json()
  assert.deepEqual(placed.result,{ok:true})
  const seen=await (await sync(visitor)).json()
  assert.deepEqual(seen.cells,[{key,block:21,axis:'y',revision:1}])
  const removed=await (await sync(visitor,{since:1,edit:{...edit,before:21,block:0,fromRevision:1,actionId:crypto.randomUUID()}})).json()
  assert.deepEqual(removed.cells,[{key,block:0,axis:'y',revision:2}])

  const creative=await create()
  assert.equal((await run('join',{code:creative.room.code,nickname:'旧版'})).status,200)
  assert.equal((await sync(creative,{edit:{...edit,actionId:crypto.randomUUID()}})).status,400)
  assert.equal((await sync(creative,{edit:{...edit,before:21,block:0,actionId:crypto.randomUUID()}})).status,400)
  assert.equal((await run('rooms',{name:'丘',nickname:'初参加',mode:'survival'})).status,400)
})

test('successful edits replay exactly once even after a different seat edits the same cell', async t => {
  const {sql,run,create,join,sync}=env(t)
  const explorer=await create('案内役','explore')
  const visitor=await (await join(explorer)).json()
  const key=voxel(133,33,130)
  const actionId=crypto.randomUUID()
  const edit={key,fromRevision:0,before:0,block:21,axis:'y',actionId}
  const both=await Promise.all([
    sync(explorer,{edit}),sync(explorer,{edit:{...edit,actionId:actionId.toUpperCase()}}),
  ].map(response=>response.then(value=>value.json())))
  assert.deepEqual(both.map(value=>value.result),[{ok:true},{ok:true}])
  assert.deepEqual(both.map(value=>value.revision),[1,1])
  const removed=await (await sync(visitor,{since:1,edit:{...edit,actionId:crypto.randomUUID(),fromRevision:1,before:21,block:0}})).json()
  assert.equal(removed.revision,2)

  await run('leave',{code:explorer.room.code,token:explorer.token})
  assert.equal((await sync(explorer,{since:2,edit})).status,401)
  const rejoined=await (await join(explorer,'帰ってきた案内役')).json()
  const replay=await (await sync(rejoined,{since:2,at:pose(210),edit})).json()
  assert.deepEqual(replay.result,{ok:true})
  assert.equal(replay.revision,2)
  assert.deepEqual(replay.cells,[])
  const conflict=await (await sync(rejoined,{since:2,at:null,edit:{...edit,block:8}})).json()
  assert.deepEqual(conflict.result,{ok:false,reason:'conflict'})
  assert.equal(conflict.revision,2)
  assert.equal(sql.prepare('SELECT count(*) count FROM webcraft_edit_receipts').get().count,2)
  assert.deepEqual((await (await sync(visitor)).json()).cells,[{key,block:0,axis:'y',revision:2}])

  await create('次の部屋','creative',epoch+day+1)
  assert.equal(sql.prepare('SELECT count(*) count FROM webcraft_edit_receipts').get().count,0)
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
