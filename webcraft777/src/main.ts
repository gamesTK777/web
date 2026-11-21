import { World, emptyFixtures, isSolid, voxelIndex, type Axis } from './world'
import { createJourney, currentGoal, homeBearing, bearing, placedDecor, recipeCrafted, visitCave } from './expedition'
import { presets } from './preferences'
import { SceneView } from './renderer'
import { GameUI, inventoryView } from './ui'
import { InputController, preferredControlMode, type ControlMode } from './input'
import { Soundscape } from './audio'
import { craft, createBag, assignHotbar, activeStack, miningSeconds, ITEMS, sortSlots, splitStack, transferAll, transferStack, supplyCreative, type Mode } from './inventory'
import { createPlayer, safeSpawn, stepPlayer, resetPlayerInput, overlapsPlayer, placementIssue, raycast, placeAt, mineAt, type Player, type Hit } from './physics'
import { SaveStore, settingsAtTitle, rememberSettings, validSettings, readBackup, backupText, type ActiveSave, type WorldSave } from './storage'
import { OnlineClient, type OnlineState, type RoomConnection, type RoomFrame, type RoomSync } from './online-client'

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!
const hud = document.querySelector<HTMLElement>('#hud')!
const touchControls = hud.querySelector<HTMLElement>('#touch-controls')!
const touchFly = hud.querySelector<HTMLButtonElement>('#touch-fly')!
const touchButtons = {
  stick:hud.querySelector<HTMLElement>('#move-stick')!,
  jump:hud.querySelector<HTMLButtonElement>('#touch-jump')!,
  down:hud.querySelector<HTMLButtonElement>('#touch-down')!,
}
canvas.tabIndex = -1
const saves = new SaveStore()
const audio = new Soundscape()
const ui = new GameUI((action,value)=>{ void handle(action,value).catch(err=>ui.toast(reason(err))) })
const loopback=['localhost','127.0.0.1','[::1]'].includes(location.hostname)
const onlineClient=new OnlineClient(loopback ? location.origin : 'https://tk777-neonshift-scores.takesuke.chatgpt.site')
const inviteCode=(new URLSearchParams(location.search).get('room')??'').trim().toUpperCase()
type SharedRoom = {connection:RoomConnection;sync?:RoomSync;state:OnlineState;
  ready:boolean;ended:boolean;count:number;editing:boolean;versions:Map<number,number>}
type Session = { data: ActiveSave; world: World; player: Player; view: SceneView;
  kids: boolean; originalPitch: number; kidsPitch: number; online?:SharedRoom }
let station:Hit|null=null, logAxis:Axis='y', progress=0, guideDue=0, tapSound=0
let currentSite=''
const tuneAudio=()=>audio.configure(settings.volume,settings.muted,settings.effectsVolume,settings.ambientVolume)
let session: Session|null=null
let settings = settingsAtTitle()
const lookPreferenceKey='tk777.webcraft.look'
const controlsPreferenceKey='tk777.webcraft.controls'
const viewPreferenceKey='tk777.webcraft.view'
function preferKids(){
  try {return localStorage.getItem(viewPreferenceKey)==='kids'} catch {return false}
}
function controlDevice(){
  const coarse=window.matchMedia('(pointer: coarse)').matches
  return {coarse,touch:coarse||navigator.maxTouchPoints>0,mac:/^Mac/i.test(navigator.platform)}
}
function loadControlMode():ControlMode{
  const device=controlDevice()
  try {
    return preferredControlMode(localStorage.getItem(controlsPreferenceKey),localStorage.getItem(lookPreferenceKey),device)
  } catch {}
  return preferredControlMode(null,null,device)
}
let busy = false, debugging = false, controlMode=loadControlMode(), firstGuide=false
function recoverControlMode():ControlMode {
  return controlMode==='lock'?(controlDevice().touch?'tablet':'drag'):controlMode
}
let aimKey='', mining=0, cooldown=0, stepDistance=0
let saveQueue: Promise<boolean> = Promise.resolve(true)
let frameTime=0, lastStats=0, frameCount=0
let stillFrame=''
let reticleY=50
let graphicsOK=false,frameHalted=false
try {
  graphicsOK=!!canvas.getContext('webgl2',{alpha:false,antialias:false,powerPreference:'high-performance'})
} catch {}
const gpuMessage='WebGL 2を利用できません。ChromeまたはEdgeのハードウェア アクセラレーションを有効にして、ブラウザーを再起動してください。'
function reason(err:unknown) {
  if(err instanceof DOMException) {
    if(err.name==='QuotaExceededError') return 'ブラウザーの保存容量が不足しています。ファイルへ書き出してバックアップしてください。'
    if(err.name==='SecurityError'||err.name==='NotAllowedError') return 'ブラウザーのサイト設定で、このページのローカル保存を許可してください。'
    return '保存領域にアクセスできませんでした。他のタブを閉じ、空き容量を確認してください。'
  }
  return err instanceof Error && /[ぁ-龯]/u.test(err.message) ? err.message : '処理を完了できませんでした。ページを開き直してお試しください。'
}
function context(s:Session){return {generator:s.world.generator,bench:station?.id===21}}
function sharedMaterial(id:number){return !!ITEMS[id]?.block&&id!==21&&id!==22}
function viewInventory() {
  const s=session!, v=inventoryView(s.data.bag,s.data.mode,s.data.selected,context(s))
  if(s.online)v.items=v.items.filter(item=>sharedMaterial(item.id))
  if(station?.id===21)v.benchUses=s.world.benchUses(station.x,station.y,station.z)
  if(station?.id===22){
    v.chest=s.world.chestAt(station.x,station.y,station.z)
    if(s.data.mode==='creative'){v.palette=v.items;v.items=s.data.bag.slots.map(stack=>({...stack,name:ITEMS[stack.id].name,maxDurability:ITEMS[stack.id].maxDurability}))}
  }
  return v
}
function guide(){
  if(!session)return
  const {world,data,player}=session,j=data.journey,cave=world.landmarks.find(l=>l.kind==='cave')
  const site=world.landmarks.find(l=>Math.hypot(l.x-player.x,l.z-player.z)<12)
  if(site&&site.kind!==currentSite&&input.active){ui.toast(site.name+'　'+({grove:'大樹の根元で建築用の原木を採れます。',cave:'坑道の壁に潮晶の鉱脈があります。',ruin:'回廊の床には持ち帰れる象眼タイルがあります。'}[site.kind]))}
  currentSite=site?.kind??''
  ui.expedition(data.mode==='explore'&&!j.hidden?currentGoal(j,world.generator):'',homeBearing(j,player),
    data.mode==='explore'&&!j.hidden&&j.toolMade&&!j.caveVisited&&cave?'岩窟 '+bearing(cave,player):'')
}
function interact(hit: Hit|null, explicit=false){
  if(!session||!input.active)return false
  if(session.online){
    if(explicit)ui.toast('共同建築ルームでは、建材を自由に選んで建築できます。')
    return false
  }
  if(!hit||![21,22].includes(hit.id)){if(explicit)ui.toast('作業台かチェストに照準を合わせてください。');return false}
  station=hit;stopInput();ui.inventory(viewInventory());return true
}
function pick(){
  if(!session)return
  const {world,player,data}=session,hit=raycast(world,player)
  if(!hit){ui.toast('選びたい建材に照準を合わせてください。');return}
  if(session.online&&!sharedMaterial(hit.id)){ui.toast('このブロックは共同建築で使えません。');return}
  const slot=data.bag.hotbar.indexOf(hit.id)
  if(data.mode==='explore'&&!activeStack(data.bag,hit.id)){ui.toast('この建材は所持品にありません。');return}
  if(slot>=0){select(slot);return}
  if(assignHotbar(data.bag,data.selected,hit.id,data.mode)){refreshBag();ui.toast(ITEMS[hit.id].name+'を選びました。')}
  else ui.toast('このブロックは選択できません。')
}
function undo(){
  if(!session)return
  if(session.online){ui.toast('共同建築では、置いたブロックを採掘して取り除けます。');return}
  if(session.data.mode!=='creative'){ui.toast('元に戻す操作はクリエイティブで使えます。');return}
  const s=session,r=s.world.undo((x,y,z)=>overlapsPlayer(s.player,x,y,z));resetMining();ui.toast(r.message)
}
function refreshBag() {
  if(!session)return
  if(ui.screen==='inventory')ui.inventory(viewInventory())
  else if(ui.screen==='play')ui.hud(viewInventory())
}
function resetMining(){ aimKey='';mining=0;progress=0;tapSound=0;ui.mining(0) }
function moveReticle(y:number) {
  if(y===reticleY)return
  reticleY=y
  hud.style.setProperty('--aim-y',y+'%')
}
function switchViewMode(){
  const s=session
  if(!s||!['play','pause','ready'].includes(ui.screen))return
  if(s.kids){s.kidsPitch=s.player.pitch;s.player.pitch=s.originalPitch}
  else {s.originalPitch=s.player.pitch;s.player.pitch=s.kidsPitch}
  s.kids=!s.kids
  input.rememberView(s.player)
  // Keep movement and the current control method. A held mine must be pressed
  // again after switching so it cannot edit a different face by accident.
  input.mining=false;input.cancelPlacementTap();resetMining();cooldown=0
  s.view.kidsCamera.reset();moveReticle(50);stillFrame=''
  ui.showViewMode(s.kids)
  try {localStorage.setItem(viewPreferenceKey,s.kids?'kids':'original')} catch {}
}
function select(slot:number) {
  if(!session||!Number.isInteger(slot)||slot<0||slot>8)return
  session.data.selected=slot;resetMining(); refreshBag()
}
function stopInput(){ input.stop(); if(session)resetPlayerInput(session.player);audio.setPlaying(false);resetMining();cooldown=0;stepDistance=0;frameTime=0 }
function pause() {
  if(!session || !input.active)return
  stopInput(); ui.pause(false,controlMode)
}
function inventory() {
  if(!session || !input.active)return
  station=null;stopInput(); ui.inventory(viewInventory())
}
function showTouchControls(drag:boolean) {
  const enabled=drag&&controlMode==='tablet'
  touchControls.hidden=!enabled
  touchFly.hidden=session?.data.mode!=='creative'
  const flying=Boolean(session?.player.flying)
  touchFly.setAttribute('aria-pressed',String(flying))
  touchButtons.jump.textContent=flying?'上昇':'ジャンプ'
  touchButtons.down.textContent=flying?'下降':'しゃがむ'
  return enabled
}
function showPlay(fallback:boolean){
  if(!session||!input.active)return
  if(fallback&&controlMode==='lock')controlMode=recoverControlMode()
  ui.play(fallback,firstGuide,input.pending,showTouchControls(fallback));ui.hud(viewInventory());guide()
}
function resume(mode:ControlMode) {
  if(!session || !['ready','pause','inventory'].includes(ui.screen))return
  if(!graphicsOK){ui.pause(false,controlMode,'描画の復旧を待っています。ワールドを書き出すこともできます。');return}
  if(session.online&&(!session.online.ready||session.online.ended)){
    ui.toast(session.online.ended?'退出してルームに参加し直してください。':'共有ワールドの読み込みが完了するまでお待ちください。');return
  }
  station=null
  firstGuide=!session.data.guideSeen
  controlMode=mode
  frameHalted=false;frameTime=0;lastStats=0;frameCount=0
  audio.unlock();audio.setPlaying(true)
  input.start(mode!=='lock')
  if(input.pending)showPlay(false)
}
function aim(dx:number,dy:number){
  if(session)input.applyLook(session.player,dx,dy,settings.sensitivity,settings.invertY)
}
const editMessages:Record<string,string>={
  conflict:'ほかの人が先にこの場所を変更しました。照準を合わせ直してください。',
  range:'ブロックにもう少し近づいてください。',
  blocked:'ここは設置・採掘できません。建材や人が重なっていない場所を選んでください。',
  limit:'このルームで共有できるブロック変更数に達しました。',
  uncertain:'通信を確認しています。建築の結果が画面に反映されるまでお待ちください。',
  offline:'接続が戻ると建築できます。',
}
function changeSharedBlock(s:Session,x:number,y:number,z:number,block:number,axis:Axis='y'){
  const room=s.online
  if(!room?.ready||room.ended||room.state!=='connected'||!room.sync){ui.toast(editMessages.offline);return}
  if(room.editing)return
  const before=s.world.get(x,y,z),key=voxelIndex(x,y,z)
  room.editing=true
  void room.sync.edit({key,before,fromRevision:room.versions.get(key)??0,block,axis}).then(result=>{
    if(session!==s)return
    if(!result.ok){ui.toast(editMessages[result.reason??'']??'共同建築の変更を確認できませんでした。');return}
    const mining=block===0,id=mining?before:block
    s.view.effect(x,y,z,id,mining?'mine':'place');audio.sound(mining?'mine':'place',id)
    ui.toast(ITEMS[id].name+(mining?'を取り除きました。':'を置きました。'))
  }).catch(error=>{if(session===s)ui.toast(reason(error))})
    .finally(()=>{room.editing=false})
}
function place() {
  if(!session||!input.active)return
  const {world,player,data,view}=session,hit=raycast(world,player)
  if(!player.crouched&&interact(hit))return
  const before=hit&&data.mode==='creative'?world.capture(hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz):null
  const id=data.bag.hotbar[data.selected]
  if(session.online){
    const issue=placementIssue(world,player,data.bag,data.mode,data.selected,hit)
    if(issue||!hit){ui.toast(issue??'設置したい面に照準を合わせてください。');return}
    if(!sharedMaterial(id)){ui.toast('共同建築用の建材を選んでください。');return}
    changeSharedBlock(session,hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz,id,id===5?logAxis:'y')
    resetMining();return
  }
  const result=placeAt(world,player,data.bag,data.mode,data.selected,hit)
  if(result.ok&&hit){
    const x=hit.x+hit.nx,y=hit.y+hit.ny,z=hit.z+hit.nz
    if(id===5)world.setAxis(x,y,z,logAxis)
    if(before)world.remember(before)
    if(data.mode==='explore'&&placedDecor(data.journey,id,{x,y,z}))guide()
    view.effect(x,y,z,id,'place')
    audio.sound('place',id);refreshBag();resetMining()
  }
  ui.toast(result.message)
}
function advanceMine(dt:number) {
  if(!session||!input.active)return
  const {world,player,data,view}=session
  const hit=raycast(world,player)
  if(!input.mining || !hit) { if(aimKey)resetMining(); return }
  if(cooldown>0||session.online?.editing)return
  const key=[hit.x,hit.y,hit.z,hit.id,data.selected].join('/')
  if(key!==aimKey){resetMining();aimKey=key}
  if(hit.id===14){ui.toast('岩盤は掘れません。');input.mining=false;resetMining();return}
  const id=data.bag.hotbar[data.selected]
  const held=data.mode==='creative'||activeStack(data.bag,id)?id:0
  const duration=miningSeconds(hit.id,held,data.mode)
  if(!Number.isFinite(duration)){ui.toast('この素材にはツルハシが必要です。');input.mining=false;resetMining();return}
  mining += dt
  progress=Math.min(1,mining/duration);ui.mining(progress)
  tapSound-=dt;if(tapSound<=0&&dt>0&&progress<.96){audio.sound('tap',hit.id);tapSound=.32}
  if(mining<duration && !(data.mode==='creative' && dt===0)) return
  if(session.online){
    if(!sharedMaterial(hit.id)){ui.toast('このブロックは共同建築で取り除けません。');input.mining=false;resetMining();return}
    if(session.online.state!=='connected')input.mining=false
    changeSharedBlock(session,hit.x,hit.y,hit.z,0);resetMining();cooldown=.15;return
  }
  const before=data.mode==='creative'?world.capture(hit.x,hit.y,hit.z):null
  const result=mineAt(world,player,data.bag,data.mode,data.selected,hit)
  if(result.ok){
    if(before)world.remember(before)
    view.effect(hit.x,hit.y,hit.z,hit.id,'mine')
    audio.sound(result.message.includes('壊れ')?'break':'mine',hit.id)
    if(data.mode==='explore')audio.sound('pickup')
    refreshBag()
  }else input.mining=false
  ui.toast(result.message);resetMining(); cooldown=data.mode==='creative'?.15:.11
}
function toggleFly(){
  if(!session||!input.active)return
  const {player,data}=session
  if(data.mode!=='creative'){ui.toast('飛行はクリエイティブモードで使えます。');return}
  player.flying=!player.flying
  player.vy=0
  const touch=showTouchControls(input.drag)
  ui.toast(player.flying?(touch?'飛行中：上昇・下降ボタンで高さを変えられます。':'飛行中：Spaceで上昇、Ctrlで下降'):'飛行を終了しました。')
}
const input=new InputController(canvas,{
  pause,inventory,place,select,look:aim, beginMine:()=>advanceMine(0),pick,undo,viewMode:switchViewMode,
  rotate:()=>{logAxis=logAxis==='y'?'x':logAxis==='x'?'z':'y';ui.toast('原木の向き　'+({x:'東西',y:'縦',z:'南北'}[logAxis]))},
  interact:()=>{if(session)interact(raycast(session.world,session.player),true)},
  home:()=>{if(session){const {x,y,z}=session.player;session.data.journey.home={x,y,z};guide();ui.toast('現在地を拠点に登録しました。')}},
  guide:()=>{if(session){session.data.journey.hidden=!session.data.journey.hidden;guide()}},
  cycle:d=>{if(session)select((session.data.selected+d+9)%9)},
  fly:toggleFly,
  debug:()=>{debugging=!debugging;if(!debugging)ui.debug('')},
  dragChanged:showPlay,background:()=>{if(session) void persist(session)},
  recovery:message=>{if(session){stopInput();controlMode=recoverControlMode();ui.pause(false,controlMode,message)}}
},touchButtons)
function snapshot(s:Session): WorldSave {
  const {x,y,z,yaw,pitch}=s.player
  return {...s.data,pose:{x,y,z,yaw,pitch:s.kids?s.originalPitch:pitch,crouched:s.player.crouched},flying:s.player.flying,edits:s.world.exportEdits(),
    fixtures:s.world.exportFixtures(),journey:structuredClone(s.data.journey),settings:{...settings},bag:structuredClone(s.data.bag)}
}
function persist(s:Session) {
  if(s.online)return Promise.resolve(true)
  saveQueue=saveQueue.then(async()=>{
    if(s!==session)return true
    ui.status('保存中…')
    try {
      const written=await saves.write(snapshot(s),s.data.revision || null)
      s.data.revision=written.revision;s.data.updatedAt=written.updatedAt
      ui.status('保存済み'); return true
    } catch(e){ui.status('保存失敗：'+reason(e));return false}
  })
  return saveQueue
}
async function title() {
  if(session) {
    const s=session
    stopInput()
    s.online?.sync?.close()
    if(!await persist(s) && !window.confirm('保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？')) {ui.pause(false,controlMode);return}
    s.view.dispose();session=null
  }
  ui.onlineSession(null)
  ui.title(false)
  try {const entries=await saves.list();if(ui.screen==='title') ui.title(!!entries.length)}
  catch(e){if(ui.screen==='title')ui.status('保存領域：'+reason(e))}
}
function showRoom(room:SharedRoom) {
  ui.onlineSession({code:room.connection.room.code,count:room.count,state:room.state})
}
function applyRoomFrame(s:Session,room:SharedRoom,frame:RoomFrame) {
  const {player,world}=s
  let collision=false
  for(const change of frame.cells){
    const {key,block,axis,revision}=change
    if((room.versions.get(key)??0)>=revision)continue
    const x=key&255,y=key>>>16,z=(key>>>8)&255
    if(world.get(x,y,z)!==block&&world.set(x,y,z,block)&&isSolid(block)&&overlapsPlayer(player,x,y,z))collision=true
    if(block===5)world.setAxis(x,y,z,axis)
    room.versions.set(key,revision)
  }
  if(collision){
    const {x,y,z}=safeSpawn(world,player,true)
    Object.assign(player,{x,y,z,vy:0});resetPlayerInput(player)
  }
  const peers=frame.players.filter(peer=>peer.id!==room.connection.id)
  if(!room.ready&&peers.length){
    // Start near the group without spawning directly inside another player.
    for(const [dx,dz] of [[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,2],[2,-2]]){
      const start=safeSpawn(world,{...player,x:player.x+dx,z:player.z+dz})
      if(peers.every(({pose})=>Math.hypot(start.x-pose.x,start.z-pose.z)>1.2)){
        Object.assign(player,{x:start.x,y:start.y,z:start.z});break
      }
    }
  }
  s.view.actors.setPlayers(peers)
  if(room.count!==peers.length+1){room.count=peers.length+1;showRoom(room)}
  room.ready=true;stillFrame=''
}
function connectRoom(s:Session,room:SharedRoom) {
  showRoom(room)
  room.sync=onlineClient.start(room.connection,{
    pose:()=>{
      if(session!==s)return null
      const {x,y,z,yaw,crouched,flying,vx,vz}=s.player
      return {x,y,z,yaw,crouched,flying,moving:Math.hypot(vx,vz)>.18}
    },
    onFrame:frame=>{if(session===s)applyRoomFrame(s,room,frame)},
    onState:state=>{if(session===s){room.state=state;showRoom(room)}},
    onEnd:error=>{
      if(session!==s)return
      room.ended=true;room.state='reconnecting';showRoom(room)
      stopInput();ui.pause(false,controlMode,reason(error))
    },
  })
}
async function openWorld(id:string|null,args?:{name:string;seed:string;mode:Mode},connect?:()=>Promise<RoomConnection>,retryCode='') {
  if(session || busy)return
  if(!graphicsOK){ui.error(gpuMessage);return}
  busy=true
  let connection:RoomConnection|undefined
  try {
    if(connect){ui.loading('ルームに接続中…');connection=await connect()}
    ui.loading('森と湖を準備しています…')
    const loaded=id?await saves.get(id):undefined
    if(id&&!loaded)throw new Error('ワールドが見つかりません。一覧を開き直してください。')
    const seed=connection?.room.seed||loaded?.seed||args?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8)
    let step=-1
    const world=await World.generate(seed,(fraction:number)=>{
      const n=Math.min(10,Math.floor(fraction*10));if(step!==n){ui.loading('地形を生成中　'+n*10+'%');step=n}
    },connection?.room.generator??loaded?.generator??2)
    if(loaded){world.loadEdits(loaded.edits);world.loadFixtures(loaded.fixtures)}
    const start=world.spawn()
    const mode=connection?'creative':args?.mode??loaded?.mode??'creative'
    const data:ActiveSave=loaded??{format:'webcraft777',version:2,generator:2,id:crypto.randomUUID(),
      fixtures:emptyFixtures(),journey:createJourney(),
      revision:0,updatedAt:Date.now(),name:connection?.room.name||args?.name.trim().slice(0,64)||'新しいワールド',seed,mode,
      pose:start,flying:false,bag:createBag(mode),selected:0,edits:[],day:.39,settings:{...settings},guideSeen:false}
    if(!data.journey.home){const {x,y,z}=start;data.journey.home={x,y,z}}
    station=null;logAxis='y';currentSite=''
    settings={...data.settings};tuneAudio()
    const player=createPlayer(safeSpawn(world,data.pose,!!loaded));player.flying=data.mode==='creative'&&data.flying
    const view=new SceneView(canvas,world)
    session={world,data,player,view,kids:preferKids(),originalPitch:player.pitch,kidsPitch:-.43}
    if(session.kids)player.pitch=session.kidsPitch
    view.configure(settings);stillFrame='';moveReticle(50)
    input.rememberView(player);frameHalted=false;controlMode=loadControlMode()
    if(connection){
      const room:SharedRoom={connection,state:'connecting',count:1,ready:false,ended:false,editing:false,versions:new Map()}
      session.online=room;connectRoom(session,room)
    }
    ui.setWorld(data.name);ui.showViewMode(session.kids);ui.pause(true,controlMode)
    if(!loaded&&!connection)await persist(session)
    debugging=false
  } catch(e){
    if(session?.online?.sync)session.online.sync.close()
    else if(connection)void onlineClient.leave(connection)
    session?.view.dispose();session=null
    ui.onlineSession(null)
    if(connect)ui.onlineMenu(retryCode,reason(e))
    else{console.error(e);ui.error(reason(e))}
  } finally {busy=false}
}
async function copyInvitation(){
  const code=session?.online?.connection.room.code
  if(!code)return
  const invite=new URL(location.href)
  invite.searchParams.set('room',code)
  try{
    await navigator.clipboard.writeText(invite.href)
    ui.toast('招待リンクをコピーしました。')
  }catch{window.prompt('招待リンクをコピーしてください。',invite.href)}
}
async function worldList() {
  try { const list=await saves.list();ui.worlds(list) }
  catch(e){ui.worlds([]);ui.status('保存失敗：'+reason(e))}
}
async function importWorld(file:File){
  if(!file || busy)return
  busy=true
  try{
    if(file.size>128*1024*1024)throw new Error('バックアップは128 MBまで読み込めます。')
    const {save:data,original}=readBackup(await file.text())
    // Validate world-dependent rules too, before replacing a known good record.
    const terrain=await World.generate(data.seed,undefined,data.generator)
    terrain.loadEdits(data.edits);terrain.loadFixtures(data.fixtures)
    const existing=(await saves.list()).find(w=>w.id===data.id)
    if(existing&&!await ui.confirmImport(existing.name))return
    await saves.write(original??data,existing?.revision??null);await worldList();ui.status('読み込み・保存が完了しました。')
  }catch(e){ui.status('読み込み失敗：'+reason(e))}finally{busy=false}
}
async function exportWorld(id?:string,original=false) {
  const data=id?(original?await saves.original(id):await saves.get(id)):session?snapshot(session):undefined
  if(original&&!data){ui.toast('このワールドには旧版の保管データがありません。');return}
  if(!data)throw new Error('書き出すワールドが見つかりません。')
  downloadJson('ウェブクラフト777-'+data.name.replace(/[\\/:*?"<>|]/g,'_')+'.json',backupText(data))
  ui.status('バックアップファイルを書き出しました。')
}
function downloadJson(filename:string,text:string){
  const url=URL.createObjectURL(new Blob([text],{type:'application/json'}))
  const link=document.createElement('a');link.href=url;link.download=filename
  document.body.append(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),60_000)
}
async function handle(action:string,value?:any) {
  if(busy && !['resume','resume-drag','resume-lock','resume-tablet','dismiss-guide'].includes(action))return
  switch(action){
    case 'goto-create': ui.create();break
    case 'online-menu':ui.onlineMenu(inviteCode);break
    case 'online-create':audio.unlock();await openWorld(null,undefined,()=>onlineClient.create(value));break
    case 'online-join':audio.unlock();await openWorld(null,undefined,()=>onlineClient.join(value),value.code);break
    case 'online-copy':await copyInvitation();break
    case 'online-leave':if(session?.online){busy=true;try{await title()}finally{busy=false}}break
    case 'goto-worlds': await worldList();break
    case 'goto-help': ui.help();break
    case 'goto-settings': ui.settings(settings);break
    case 'back':
      if(session){if(ui.screen==='inventory')resume(controlMode);else ui.pause(false,controlMode)}
      else await title();break
    case 'title': if(!busy){busy=true;try {await title()}finally{busy=false}}break
    case 'start': audio.unlock();await openWorld(null,value);break
    case 'load': audio.unlock();await openWorld(value);break
    case 'resume':resume(controlMode);break
    case 'resume-drag':case 'resume-lock':case 'resume-tablet':{
      const mode=action==='resume-tablet'?'tablet':action==='resume-drag'?'drag':'lock'
      try {localStorage.setItem(controlsPreferenceKey,mode)} catch {}
      resume(mode);break
    }
    case 'diagnostics': if(session){
      input.setDiagnostics(true)
      const report=input.report()
      const summary='視点入力 '+report.lookEvents+' 回　フレーム '+report.frames+' 回　異常 '+report.anomalies+' 件'
      ui.diagnostics(report.lastIssue?summary+'\n'+report.lastIssue:summary,JSON.stringify(report,null,2))
    }break
    case 'export-diagnostics': if(session)downloadJson('ウェブクラフト777-入力診断.json',JSON.stringify(input.report(),null,2));break
    case 'reset-input': if(session){stopInput();input.rememberView(session.player);controlMode=recoverControlMode();ui.pause(false,controlMode,'入力をリセットしました。「再開」から操作できます。')}break
    case 'pause':pause();break
    case 'view-mode':switchViewMode();break
    case 'touch-fly':if(!touchControls.hidden)toggleFly();break
    case 'inventory':inventory();break
    case 'select':select(value);break
    case 'assign':if(session&&(!session.online||sharedMaterial(value.id))&&assignHotbar(session.data.bag,value.slot,value.id,session.data.mode)){refreshBag();ui.toast('ホットバーに登録しました。')}break
    case 'craft':if(session&&session.data.mode==='explore'&&ui.screen==='inventory'){
      const count=value.count??1, recipe=value.id??value
      const result=craft(session.data.bag,recipe,count,context(session))
      if(result.ok){if(station?.id===21)session.world.useBench(station.x,station.y,station.z,count)
        recipeCrafted(session.data.journey,recipe);audio.sound('craft');refreshBag()}ui.toast(result.message)
    }break
    case 'mine-down':if(input.active){input.mining=true;advanceMine(0)}break
    case 'mine-up': input.mining=false;resetMining();break
    case 'place': place();break
    case 'supply':{
      if(session&&ui.screen==='inventory'&&station?.id===22){
        const r=supplyCreative(session.data.bag,session.data.mode,value.id,value.count);ui.toast(r.message);if(r.ok)refreshBag()
      }break}
    case 'split':case 'sort':case 'transfer':case 'transfer-all':{
      if(!session||ui.screen!=='inventory')break
      const bag=session.data.bag, chest=station?.id===22?session.world.chestAt(station.x,station.y,station.z):undefined
      const side=value?.side==='chest'?'chest':'bag', slots=side==='bag'?bag.slots:chest
      if(!slots)break
      const r=action==='sort'?sortSlots(slots):action==='split'?splitStack(slots,value.index):
        !chest?undefined:action==='transfer-all'?transferAll(bag,chest,side):transferStack(bag,chest,side,value.index,value.half)
      if(r){ui.toast(r.message);if(r.ok)refreshBag()}break}
    case 'preset':{
      if(Object.hasOwn(presets,value)){const name=value as keyof typeof presets;await handle('settings-change',{...settings,...presets[name],quality:name});ui.settings(settings)}break}
    case 'original':await exportWorld(value,true);break
    case 'save':if(session)await persist(session);break
    case 'settings-change':if(validSettings(value)){
      settings={...value};rememberSettings(settings);session?.view.configure(settings);stillFrame='';tuneAudio()
    }break
    case 'dismiss-guide': if(session)session.data.guideSeen=true;firstGuide=false;break
    case 'import':await importWorld(value);break
    case 'export':await exportWorld(value);break
  }
}
document.addEventListener('keydown',e=>{
  if(e.repeat||e.defaultPrevented||input.active||document.querySelector('dialog[open]'))return
  const slot=/^Digit([1-9])$/.exec(e.code)
  if(ui.screen==='inventory'&&slot){e.preventDefault();select(Number(slot[1])-1);return}
  if(ui.screen==='inventory'&&(e.code==='KeyE'||e.code==='Escape')){
    e.preventDefault();if(e.code==='Escape')ui.pause(false,controlMode);else resume(controlMode)
  }else if(e.code==='Escape'&&['settings','help','create','worlds','diagnostics','online'].includes(ui.screen)){
    e.preventDefault();void handle('back')
  }
})
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();graphicsOK=false;pause()
  if(session)void persist(session)
  ui.error('3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。')
})
canvas.addEventListener('webglcontextlost',event=>{
  event.preventDefault();graphicsOK=false;frameHalted=true;stopInput()
  if(session){ui.pause(false,controlMode,'3D描画を中断しました。復旧後に再開できます。');void persist(session)}
  else ui.error(gpuMessage)
})
canvas.addEventListener('webglcontextrestored',()=>{
  graphicsOK=true;frameHalted=false;stillFrame=''
  if(session){session.view.configure(settings);ui.pause(false,controlMode,'3D描画が復旧しました。操作を再開できます。')}
  else void title()
})
window.addEventListener('pagehide',event=>{if(session){
  if(input.active)pause()
  if(session.online){if(!event.persisted)session.online.sync?.close()}
  else void persist(session)
}})
window.setInterval(()=>{if(session && !document.hidden)void persist(session)},25000)
function frame(now:number){
  requestAnimationFrame(frame)
  if(!session||!graphicsOK||frameHalted||document.hidden){frameTime=0;return}
  try {tick(now)} catch(error) {
    frameHalted=true
    input.fail(error)
    console.error(error)
  }
}
function tick(now:number){
  if(!session)return
  const s=session,elapsed=frameTime?(now-frameTime)/1000:0,dt=Math.min(elapsed,.1);frameTime=now
  if(input.active){
    const p=s.player, movement=input.movement(), ox=p.x,oz=p.z
    if(!input.frame(p,elapsed))return
    stepPlayer(s.world,p,movement,dt,settings);audio.environment(s.world,p,dt)
    guideDue-=dt
    if(guideDue<=0){guideDue=.24;if(s.data.mode==='explore')visitCave(s.data.journey,s.world,p,s.data.bag);guide()}
    stepDistance+=Math.hypot(ox-p.x,oz-p.z)
    if(stepDistance>1.8){stepDistance=0;if(p.grounded&&!p.flying)audio.sound('step',s.world.get(Math.floor(p.x),Math.floor(p.y-.05),Math.floor(p.z)))}
    s.data.day=s.online ? (.39+Math.max(0,Date.now()-s.online.connection.room.createdAt)/600_000)%1 : (s.data.day+dt/600)%1
    cooldown=Math.max(0,cooldown-dt);advanceMine(dt)
  }
  const target=input.active?raycast(s.world,s.player):null
  if(!input.active) {
    const key=canvas.clientWidth+'/'+canvas.clientHeight+'/'+s.data.id
    if(stillFrame===key && !s.view.stats.queued)return
    stillFrame=key
  } else stillFrame=''
  const held=s.data.bag.hotbar[s.data.selected],use=!s.online&&target&&[21,22].includes(target.id)&&!s.player.crouched
  const preview=target&&!use&&ITEMS[held]?.block&&!input.mining?{x:target.x+target.nx,y:target.y+target.ny,z:target.z+target.nz,
    id:held,axis:logAxis,valid:!placementIssue(s.world,s.player,s.data.bag,s.data.mode,s.data.selected,target)}:null
  const useAction=touchControls.hidden?'右クリック':'タップ'
  ui.target(use?useAction+(target!.id===21?'で作業台':'でチェスト'):'')
  const speed=Math.hypot(s.player.vx,s.player.vz),heldItem=s.data.mode==='creative'||activeStack(s.data.bag,held)?held:0
  s.view.update(s.player,target,s.data.day,input.active?dt:0,{active:input.active,held:heldItem,mining:progress,preview,
    moving:settings.bob&&s.player.grounded&&speed>.15,sprinting:speed>4.5},s.kids?{player:s.player,hit:target}:undefined)
  if(s.kids)moveReticle(Math.round(s.view.kidsCamera.reticle.y*20)/20)
  if(input.active && debugging){
    frameCount++
    if(!lastStats){lastStats=now;frameCount=0}
    else if(now-lastStats>600){
      const {x,y,z}=s.player, stats=s.view.stats
      ui.debug(Math.round(frameCount*1000/(now-lastStats))+' FPS　描画 '+stats.draws+' 回　チャンク '+stats.chunks+'\n'+
        '三角形 '+stats.triangles.toLocaleString('ja-JP')+'　更新 '+stats.chunkMs.toFixed(1)+' ms　待ち '+stats.queued+'\n'+
        '形状 '+stats.geometries+' 個　テクスチャ '+stats.textures+' 個\n座標 '+[x,y,z].map(n=>n.toFixed(1)).join(' / '))
      frameCount=0;lastStats=now
    }
  }
}
tuneAudio()
void title().then(()=>{
  if(!graphicsOK)ui.error(gpuMessage)
  else if(/^[A-HJ-NP-Z2-9]{8}$/.test(inviteCode)&&ui.screen==='title')ui.onlineMenu(inviteCode)
})
requestAnimationFrame(frame)
