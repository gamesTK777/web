import { World, emptyFixtures, isSolid, voxelIndex, SEA_LEVEL, type Axis } from './world'
import { createJourney, currentGoal, homeBearing, bearing, placedDecor, recipeCrafted, visitCave } from './expedition'
import { presets } from './preferences'
import { SceneView } from './renderer'
import { GameUI, inventoryView } from './ui'
import { InputController, preferredControlMode, type ControlMode } from './input'
import { Soundscape } from './audio'
import { craft, createBag, assignHotbar, activeStack, miningSeconds, stageMining, consumeBlock, ITEMS, SLIDE_ITEM, blockItemId, sortSlots, splitStack, transferAll, transferStack, supplyCreative, type Mode, type Bag } from './inventory'
import { createPlayer, safeSpawn, stepPlayer, resetPlayerInput, overlapsPlayer, placementIssue, raycast, placeAt, mineAt, type Player, type Hit } from './physics'
import { SaveStore, settingsAtTitle, rememberSettings, validSettings, readBackup, backupText, type ActiveSave, type WorldSave } from './storage'
import { OnlineClient, type OnlineState, type RoomConnection, type RoomEdit, type RoomFrame, type RoomPlayer, type RoomSync, type TagState } from './online-client'
import { readRoomProfile, writeRoomProfile, type ExplorationEdit } from './room-exploration'
import { validTerrainPreset, type TerrainPreset } from './stages'
import { LandLife } from './land-life'
import { AquaticLife } from './aquatic-life'
import { TagMap } from './tag-map'

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!
const hud = document.querySelector<HTMLElement>('#hud')!
const tagCanvas = hud.querySelector<HTMLCanvasElement>('#tag-map-canvas')!
const touchControls = hud.querySelector<HTMLElement>('#touch-controls')!
const touchFly = hud.querySelector<HTMLButtonElement>('#touch-fly')!
const lifeStatus=hud.querySelector<HTMLElement>('#life-status')!
const sharkStatus=hud.querySelector<HTMLElement>('#shark-status')!
const lifeHealth=hud.querySelector<HTMLProgressElement>('#life-health')!
const sharkHealth=hud.querySelector<HTMLProgressElement>('#shark-health')!
const lifeHealthNumber=hud.querySelector<HTMLElement>('#life-health-number')!
const sharkHealthNumber=hud.querySelector<HTMLElement>('#shark-health-number')!
const touchAttack=hud.querySelector<HTMLButtonElement>('#touch-attack')!
const touchRotate=hud.querySelector<HTMLButtonElement>('#touch-rotate')!
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
type TagGame = {map:TagMap;status?:TagState;receivedAt:number;remaining?:number;peers:RoomPlayer[];started:boolean;open:boolean;mapDue:number;uiKey:string}
type SharedRoom = {connection:RoomConnection;sync?:RoomSync;state:OnlineState;
  ready:boolean;ended:boolean;count:number;editing:boolean;versions:Map<number,number>;
  nickname:string;restoring:boolean;pendingExplore?:ExplorationEdit;tagGame?:TagGame}
type Session = { data: ActiveSave; world: World; player: Player; view: SceneView;
  kids: boolean; originalPitch: number; kidsPitch: number; online?:SharedRoom; land?:LandLife; aquatic?:AquaticLife }
let station:Hit|null=null, logAxis:Axis='y', slideFacing=0, progress=0, guideDue=0, tapSound=0
const slideNames=['北','東','南','西']
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
function context(s:Session){return {generator:s.world.generator,bench:station?.id===21&&s.world.get(station.x,station.y,station.z)===21}}
function sharedMaterial(id:number,mode:Mode){return !!ITEMS[id]?.block&&id!==22&&(id!==21||mode==='explore')}
function heldForSync(s:Session){return Boolean(s.online?.pendingExplore)}
function viewInventory() {
  const s=session!, v=inventoryView(s.data.bag,s.data.mode,s.data.selected,context(s))
  if(s.online&&s.data.mode==='creative')v.items=v.items.filter(item=>sharedMaterial(item.id,'creative'))
  if(s.online&&s.data.mode==='explore')v.recipes=v.recipes.filter(recipe=>recipe.id!=='chest')
  if(station?.id===21)v.benchUses=s.world.benchUses(station.x,station.y,station.z)
  if(station?.id===22){
    v.chest=s.world.chestAt(station.x,station.y,station.z)
    if(s.data.mode==='creative'){v.palette=v.items;v.items=s.data.bag.slots.map(stack=>({...stack,name:ITEMS[stack.id].name,maxDurability:ITEMS[stack.id].maxDurability}))}
  }
  return v
}
function guide(){
  if(!session)return
  if(session.online?.tagGame){ui.expedition('','','');return}
  const {world,data,player}=session,j=data.journey,cave=world.landmarks.find(l=>l.kind==='cave')
  const site=world.landmarks.find(l=>Math.hypot(l.x-player.x,l.z-player.z)<12)
  if(site&&site.kind!==currentSite&&input.active){ui.toast(site.name+'　'+({grove:'大樹の根元で建築用の原木を採れます。',cave:'坑道の壁に潮晶の鉱脈があります。',ruin:'回廊の床には持ち帰れる象眼タイルがあります。'}[site.kind]))}
  currentSite=site?.kind??''
  ui.expedition(data.mode==='explore'&&!j.hidden?currentGoal(j,world.generator):'',homeBearing(j,player),
    data.mode==='explore'&&!j.hidden&&j.toolMade&&!j.caveVisited&&cave?'岩窟 '+bearing(cave,player):'')
}
function interact(hit: Hit|null, explicit=false){
  if(!session||!input.active||session.online?.tagGame)return false
  if(session.online&&session.data.mode==='creative'){
    if(explicit)ui.toast('共同建築ルームでは、建材を自由に選んで建築できます。')
    return false
  }
  const response=session.land?.interact(session.player)
  if(response){ui.toast(response);return true}
  if(!hit||!(hit.id===21||hit.id===22&&!session.online)){
    if(explicit)ui.toast(session.online?'作業台に照準を合わせてください。':
      session.land?'住民・動物・作業台・チェストに照準を合わせてください。':'作業台かチェストに照準を合わせてください。')
    return false
  }
  station=hit;stopInput();ui.inventory(viewInventory());return true
}
function pick(){
  if(!session||session.online?.tagGame)return
  if(heldForSync(session)){ui.toast('素材の変更を確認しています。少し待ってください。');return}
  const {world,player,data}=session,hit=raycast(world,player)
  if(!hit){ui.toast('選びたい建材に照準を合わせてください。');return}
  if(session.online&&!sharedMaterial(hit.id,data.mode)){ui.toast('このブロックは共有ワールドで使えません。');return}
  const block=blockItemId(hit.id), slot=data.bag.hotbar.indexOf(block)
  if(data.mode==='explore'&&!activeStack(data.bag,block)){ui.toast('この建材は所持品にありません。');return}
  if(block===SLIDE_ITEM)slideFacing=hit.id-SLIDE_ITEM
  if(slot>=0){select(slot);return}
  if(assignHotbar(data.bag,data.selected,block,data.mode)){refreshBag();ui.toast(ITEMS[block].name+'を選びました。')}
  else ui.toast('このブロックは選択できません。')
}
function undo(){
  if(!session||session.online?.tagGame)return
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
  if(!session||session.online?.tagGame||!Number.isInteger(slot)||slot<0||slot>8)return
  session.data.selected=slot;resetMining(); refreshBag()
  void persistRoomProgress(session)
}
function stopInput(){ input.stop(); if(session)resetPlayerInput(session.player);audio.setPlaying(false);resetMining();cooldown=0;stepDistance=0;frameTime=0 }
function pause() {
  if(!session || !input.active)return
  stopInput(); ui.pause(false,controlMode)
}
function inventory() {
  if(!session || !input.active || session.online?.tagGame)return
  station=null;stopInput(); ui.inventory(viewInventory())
}
function showTouchControls(drag:boolean) {
  const enabled=drag&&controlMode==='tablet'
  touchControls.hidden=!enabled
  touchFly.hidden=session?.data.mode!=='creative'||!!session.online?.tagGame
  const flying=Boolean(session?.player.flying)
  touchFly.setAttribute('aria-pressed',String(flying))
  touchButtons.jump.textContent=flying?'上昇':'ジャンプ'
  touchButtons.down.textContent=flying?'下降':'しゃがむ'
  return enabled
}
function showPlay(fallback:boolean){
  if(!session||!input.active)return
  if(fallback&&controlMode==='lock')controlMode=recoverControlMode()
  const game=session.online?.tagGame
  if(game&&!game.started){
    const {x,z}=session.player
    if(game.peers.some(({pose})=>Math.hypot(x-pose.x,z-pose.z)<=1.2))separateSpawn(session,game.peers)
    game.started=true
  }
  ui.play(fallback,firstGuide,input.pending,showTouchControls(fallback));ui.hud(viewInventory());guide()
}
function resume(mode:ControlMode) {
  if(!session || !['ready','pause','inventory'].includes(ui.screen))return
  if(!graphicsOK){ui.pause(false,controlMode,'描画の復旧を待っています。ワールドを書き出すこともできます。');return}
  if(session.online&&(!session.online.ready||session.online.ended)){
    ui.toast(session.online.ended?'退出してルームに参加し直してください。':'共有ワールドの読み込みが完了するまでお待ちください。');return
  }
  station=null
  firstGuide=!session.data.guideSeen&&!session.online?.tagGame
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
  invalid:'編集内容を共有できませんでした。照準を合わせ直してください。',
}
function announceSharedEdit(s:Session,edit:RoomEdit,message?:string){
  const {key,block,before}=edit
  const x=key&255,y=key>>>16,z=(key>>>8)&255
  const mining=block===0,id=mining?before:block
  s.view.effect(x,y,z,id,mining?'mine':'place');audio.sound(mining?'mine':'place',id)
  if(mining&&s.data.mode==='explore')audio.sound('pickup')
  if(!mining&&s.data.mode==='explore'&&placedDecor(s.data.journey,id,{x,y,z}))guide()
  ui.toast(message??ITEMS[id].name+(mining?'を取り除きました。':'を置きました。'))
}
function flushExplorationEdit(s:Session){
  const room=s.online,pending=room?.pendingExplore
  if(!room?.sync||!pending||room.editing||room.ended||room.state!=='connected')return
  room.editing=true
  void room.sync.edit(pending.edit).then(result=>{
    if(session!==s)return
    // Keep the same operation ID on reconnect or reload. Only a confirmed
    // commit changes the player's inventory.
    if(!result.ok&&!['conflict','range','blocked','limit','invalid'].includes(result.reason??'')){
      if(result.reason==='uncertain')ui.toast(editMessages.uncertain)
      return
    }
    room.pendingExplore=undefined
    if(result.ok){
      s.data.bag=pending.after
      announceSharedEdit(s,pending.edit,pending.message)
      refreshBag()
    }else ui.toast(editMessages[result.reason??'']??editMessages.invalid)
    void persist(s)
  }).catch(error=>{if(session===s)ui.toast(reason(error))})
    .finally(()=>{room.editing=false})
}
function changeSharedBlock(s:Session,x:number,y:number,z:number,block:number,axis:Axis='y',after?:Bag,message?:string){
  const room=s.online
  if(!room?.ready||room.ended||room.state!=='connected'||!room.sync){ui.toast(editMessages.offline);return}
  if(room.editing||room.pendingExplore)return
  const before=s.world.get(x,y,z),key=voxelIndex(x,y,z)
  const edit={key,before,fromRevision:room.versions.get(key)??0,block,axis}
  if(after){
    room.pendingExplore={edit:{...edit,actionId:crypto.randomUUID()},after,message}
    void persist(s)
    flushExplorationEdit(s)
    return
  }
  room.editing=true
  void room.sync.edit(edit).then(result=>{
    if(session!==s)return
    if(!result.ok){ui.toast(editMessages[result.reason??'']??'共同建築の変更を確認できませんでした。');return}
    announceSharedEdit(s,edit)
  }).catch(error=>{if(session===s)ui.toast(reason(error))})
    .finally(()=>{room.editing=false})
}
function place() {
  if(!session||!input.active||session.online?.tagGame)return
  const {world,player,data,view}=session,hit=raycast(world,player)
  if(!player.crouched&&interact(hit))return
  if(hit&&session.land?.occupies(hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz)){
    ui.toast('住民や動物がいる場所には置けません。');return
  }
  const before=hit&&data.mode==='creative'?world.capture(hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz):null
  const id=data.bag.hotbar[data.selected]
  const placedId=id===SLIDE_ITEM?SLIDE_ITEM+slideFacing:id
  if(session.online){
    if(heldForSync(session))return
    const issue=placementIssue(world,player,data.bag,data.mode,data.selected,hit)
    if(issue||!hit){ui.toast(issue??'設置したい面に照準を合わせてください。');return}
    if(!sharedMaterial(id,data.mode)){ui.toast('共有ワールドで使える建材を選んでください。');return}
    const after=data.mode==='explore'?structuredClone(data.bag):undefined
    if(after&&!consumeBlock(after,id))return
    changeSharedBlock(session,hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz,placedId,id===5?logAxis:'y',after)
    resetMining();return
  }
  const result=placeAt(world,player,data.bag,data.mode,data.selected,hit,placedId)
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
function rotateMaterial(){
  if(!session||!input.active||session.online?.tagGame)return
  if(session.data.bag.hotbar[session.data.selected]===SLIDE_ITEM){
    slideFacing=(slideFacing+1)%4
    ui.toast('滑り台の下り方向　'+slideNames[slideFacing])
  }else{
    logAxis=logAxis==='y'?'x':logAxis==='x'?'z':'y'
    ui.toast('原木の向き　'+({x:'東西',y:'縦',z:'南北'}[logAxis]))
  }
}
function advanceMine(dt:number) {
  if(!session||!input.active||session.online?.tagGame)return
  const {world,player,data,view}=session
  const hit=raycast(world,player)
  if(!input.mining || !hit) { if(aimKey)resetMining(); return }
  if(cooldown>0||session.online?.editing||heldForSync(session))return
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
    if(!sharedMaterial(hit.id,data.mode)){ui.toast('このブロックは共有ワールドで取り除けません。');input.mining=false;resetMining();return}
    const staged=data.mode==='explore'?stageMining(data.bag,hit.id,held):undefined
    if(staged&&!staged.draft){ui.toast(staged.message);input.mining=false;resetMining();return}
    if(session.online.state!=='connected')input.mining=false
    changeSharedBlock(session,hit.x,hit.y,hit.z,0,'y',staged?.draft,staged?.message);resetMining();cooldown=.15;return
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
  if(!session||!input.active||session.online?.tagGame)return
  const {player,data}=session
  if(data.mode!=='creative'){ui.toast('飛行はクリエイティブモードで使えます。');return}
  player.flying=!player.flying
  player.vy=0
  const touch=showTouchControls(input.drag)
  ui.toast(player.flying?(touch?'飛行中：上昇・下降ボタンで高さを変えられます。':'飛行中：Spaceで上昇、Ctrlで下降'):'飛行を終了しました。')
}
function attackShark(){
  const s=session,water=s?.aquatic
  if(!s||!water||!input.active||!water.attack(s.player))return false
  input.mining=false
  resetMining()
  if(water.sharkDefeated&&!s.data.sharkDefeated){
    s.data.sharkDefeated=true
    void persist(s)
  }
  return true
}
function returnToShore(s:Session){
  const start=s.world.spawn()
  let pose:ReturnType<typeof safeSpawn>
  try {pose=safeSpawn(s.world,start)}
  catch {pose=safeSpawn(s.world,{...start,y:SEA_LEVEL+3})}
  Object.assign(s.player,createPlayer({...pose,pitch:s.kids?s.kidsPitch:pose.pitch}))
  if(!s.kids)s.originalPitch=s.player.pitch
  input.reset();input.rememberView(s.player)
  resetMining();cooldown=0;s.view.kidsCamera.reset()
  s.aquatic?.resetHealth()
  ui.toast('岸に戻りました。持ち物は引き継がれています。')
}
function showWildlife(s:Session,aimedShark:boolean){
  const water=s.aquatic
  const health=water?.health??100, shark=water?.sharkHealth??100
  const show=!!water?.hasAquaticLife&&(s.player.inWater||health<100)
  lifeStatus.hidden=!show&&!aimedShark
  sharkStatus.hidden=!aimedShark
  touchAttack.hidden=!aimedShark||!input.drag
  if(lifeHealth.value!==health){lifeHealth.value=health;lifeHealthNumber.textContent=String(health)}
  if(sharkHealth.value!==shark){sharkHealth.value=shark;sharkHealthNumber.textContent=String(shark)}
}
const input=new InputController(canvas,{
  pause,inventory,place,select,look:aim, beginMine:()=>{if(!attackShark())advanceMine(0)},pick,undo,viewMode:switchViewMode,
  tagMap:toggleTagMap,
  attack:()=>{if(!attackShark()&&session?.aquatic)ui.toast('近くのサメに照準を合わせてください。')},
  rotate:rotateMaterial,
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
  return {...s.data,sharkDefeated:s.aquatic?.sharkDefeated??s.data.sharkDefeated,
    pose:{x,y,z,yaw,pitch:s.kids?s.originalPitch:pitch,crouched:s.player.crouched},flying:s.player.flying,edits:s.world.exportEdits(),
    fixtures:s.world.exportFixtures(),journey:structuredClone(s.data.journey),settings:{...settings},bag:structuredClone(s.data.bag)}
}
function persist(s:Session) {
  if(s.online){
    if(s.data.mode==='explore'){
      const {x,y,z,yaw,pitch,crouched}=s.player
      writeRoomProfile(s.online.connection.room.code,s.online.nickname,{bag:s.data.bag,selected:s.data.selected,
        journey:s.data.journey,pose:{x,y,z,yaw,pitch:s.kids?s.originalPitch:pitch,crouched},pending:s.online.pendingExplore})
    }
    return Promise.resolve(true)
  }
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
function persistRoomProgress(s:Session){if(s.online&&s.data.mode==='explore')return persist(s)}
async function title() {
  if(session) {
    const s=session
    stopInput()
    s.online?.sync?.close()
    if(!await persist(s) && !window.confirm('保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？')) {ui.pause(false,controlMode);return}
    disposeLife(s);s.view.dispose();session=null
  }
  ui.onlineSession(null)
  ui.title(false)
  try {const entries=await saves.list();if(ui.screen==='title') ui.title(!!entries.length)}
  catch(e){if(ui.screen==='title')ui.status('保存領域：'+reason(e))}
}
function disposeLife(s:Session){
  s.land?.dispose()
  s.aquatic?.dispose()
}
function showRoom(room:SharedRoom) {
  ui.onlineSession({code:room.connection.room.code,count:room.count,state:room.state})
}
function updateTagUI(s:Session,now=performance.now()){
  const room=s.online,game=room?.tagGame
  if(!room||!game)return
  const state=game.status
  const it=state?.it===room.connection.id
  const hiding=state?.phase==='hiding', playing=state?.phase==='playing'
  const finished=state?.phase==='finished'
  const spectator=playing&&!!room.connection.room.tagMinutes&&state.enrolledIds&&!state.enrolledIds.includes(room.connection.id)
  const label=finished?'試合終了':playing||hiding?(it?'鬼':spectator?'観戦中':'逃げ役'):'参加者を待っています'
  const clock=state?.serverNow===undefined?Date.now():state.serverNow+Math.max(0,now-game.receivedAt)
  const seconds=hiding?Math.max(0,Math.ceil((state.hideUntil-clock)/1000)):0
  if(finished)game.remaining=0
  else if(playing&&state.endsAt>0){
    // A late response must not make the visible countdown gain a second.
    const secondsLeft=Math.max(0,Math.ceil((state.endsAt-clock)/1000))
    game.remaining=Math.min(game.remaining??secondsLeft,secondsLeft)
  }
  const hint=finished?'':spectator?'結果を待っています':hiding?(it?'鬼のスタートまで ':'隠れる時間 ')+seconds+'秒':
    playing?(it?'逃げ役にぶつかるとタッチ':'鬼から逃げて隠れよう'):'2人以上で開始'
  const key=[label,hint,game.open,game.remaining].join('/')
  if(game.uiKey!==key){
    ui.tagMode({label,hint,it,mapOpen:game.open,remaining:game.remaining})
    game.uiKey=key
  }
  if(game.open&&now>=game.mapDue){
    game.map.update(game.peers,s.player,playing)
    game.mapDue=now+240
  }
}
function toggleTagMap(){
  const s=session,game=s?.online?.tagGame
  if(!s||!game||!input.active)return
  game.open=!game.open;game.mapDue=0;updateTagUI(s)
}
function separateSpawn({world,player}:Session,peers:RoomPlayer[]){
  for(const [dx,dz] of [[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,2],[2,-2]]){
    const start=safeSpawn(world,{...player,x:player.x+dx,z:player.z+dz})
    if(peers.every(({pose})=>Math.hypot(start.x-pose.x,start.z-pose.z)>1.2)){
      Object.assign(player,{x:start.x,y:start.y,z:start.z});return
    }
  }
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
  const game=room.tagGame
  if(!room.ready&&!room.restoring&&!game&&peers.length)separateSpawn(s,peers)
  if(game&&frame.tag){
    const previous=game.status, state=frame.tag, localId=room.connection.id
    if(previous?.endsAt!==state.endsAt)game.remaining=undefined
    game.status=state;game.receivedAt=performance.now();game.peers=peers
    if(state.phase==='finished'&&previous?.phase!=='finished'){
      game.open=false
      stopInput()
      const loser=state.results.find(member=>member.id===state.it)!
      const winners=state.results.filter(member=>member.id!==state.it).map(member=>member.nickname)
      ui.tagResult({outcome:localId===state.it?'lose':state.winnerIds.includes(localId)?'win':'spectator',
        loser:loser.nickname,winners,minutes:room.connection.room.tagMinutes!})
    }else if(state.phase==='playing'&&previous?.it!==state.it&&state.previousIt){
      if(state.it===localId)ui.toast('タッチされました！ あなたが鬼です。')
      else if(state.previousIt===localId)ui.toast('タッチ成功！ 逃げ役になりました。')
    }
    updateTagUI(s)
  }
  const blinded=game?.status?.phase==='hiding'&&game.status.it===room.connection.id
  s.view.actors.setPlayers(blinded?[]:peers,game?.status?.it)
  if(room.count!==peers.length+1){room.count=peers.length+1;showRoom(room)}
  room.ready=true;stillFrame=''
  if(station?.id===21&&world.get(station.x,station.y,station.z)!==21){
    station=null
    refreshBag()
    ui.toast('作業台が取り除かれました。')
  }
  flushExplorationEdit(s)
}
function connectRoom(s:Session,room:SharedRoom) {
  showRoom(room)
  room.sync=onlineClient.start(room.connection,{
    pose:()=>{
      if(session!==s||(room.tagGame&&!room.tagGame.started))return null
      const {x,y,z,yaw,crouched,flying,vx,vz}=s.player
      return {x,y,z,yaw,crouched,flying,moving:Math.hypot(vx,vz)>.18}
    },
    onFrame:frame=>{if(session===s)applyRoomFrame(s,room,frame)},
    onState:state=>{if(session===s){room.state=state;showRoom(room);flushExplorationEdit(s)}},
    onEnd:error=>{
      if(session!==s||room.tagGame?.status?.phase==='finished')return
      room.ended=true;room.state='reconnecting';showRoom(room)
      stopInput();ui.pause(false,controlMode,reason(error))
    },
  })
}
async function openWorld(id:string|null,args?:{name:string;seed:string;mode:Mode;stage?:TerrainPreset},connect?:()=>Promise<RoomConnection>,retryCode='',nickname='') {
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
    const choice=args?.stage
    const stage=connection?'classic':loaded?.stage??(validTerrainPreset(choice)?choice:'classic')
    let step=-1
    const world=await World.generate(seed,(fraction:number)=>{
      const n=Math.min(10,Math.floor(fraction*10));if(step!==n){ui.loading('地形を生成中　'+n*10+'%');step=n}
    },connection?.room.generator??loaded?.generator??2,stage)
    if(loaded){world.loadEdits(loaded.edits);world.loadFixtures(loaded.fixtures)}
    const start=world.spawn()
    const tag=connection?.room.mode==='tag'
    const mode=connection?(connection.room.mode==='explore'?'explore':'creative'):
      stage!=='classic'?'creative':args?.mode??loaded?.mode??'creative'
    const profile=connection&&mode==='explore'?readRoomProfile(connection.room.code,nickname):undefined
    const data:ActiveSave=loaded??{format:'webcraft777',version:2,generator:2,id:crypto.randomUUID(),
      fixtures:emptyFixtures(),journey:profile?.journey??createJourney(),
      revision:0,updatedAt:Date.now(),name:connection?.room.name||args?.name.trim().slice(0,64)||'新しいワールド',seed,mode,stage,
      pose:profile?.pose??start,flying:false,bag:profile?.bag??createBag(tag?'explore':mode),selected:profile?.selected??0,
      edits:[],day:.39,settings:{...settings},guideSeen:false}
    if(!loaded&&stage!=='classic')data.bag.hotbar=[7,8,10,27,28,29,SLIDE_ITEM,9,12]
    if(!data.journey.home){const {x,y,z}=start;data.journey.home={x,y,z}}
    station=null;logAxis='y';slideFacing=0;currentSite=''
    settings={...data.settings};tuneAudio()
    const player=createPlayer(safeSpawn(world,data.pose,Boolean(loaded||profile)));player.flying=data.mode==='creative'&&data.flying
    const view=new SceneView(canvas,world)
    session={world,data,player,view,kids:preferKids(),originalPitch:player.pitch,kidsPitch:-.43}
    if(session.kids)player.pitch=session.kidsPitch
    view.configure(settings);stillFrame='';moveReticle(50)
    input.rememberView(player);frameHalted=false;controlMode=loadControlMode()
    if(connection){
      const room:SharedRoom={connection,state:'connecting',count:1,ready:false,ended:false,editing:false,versions:new Map(),
        nickname,restoring:!!profile,pendingExplore:profile?.pending}
      session.online=room
      if(tag){room.tagGame={map:new TagMap(tagCanvas,world),receivedAt:0,peers:[],started:false,open:false,mapDue:0,uiKey:''};updateTagUI(session)}
      connectRoom(session,room)
    }else if(stage!=='flat'){
      if(stage==='classic')session.land=new LandLife(world,view.scene,player)
      session.aquatic=new AquaticLife(world,view.scene,data.sharkDefeated)
    }
    showWildlife(session,false)
    ui.setWorld(data.name);ui.showViewMode(session.kids);ui.pause(true,controlMode)
    if(!loaded&&!connection)await persist(session)
    debugging=false
  } catch(e){
    if(session?.online?.sync)session.online.sync.close()
    else if(connection)void onlineClient.leave(connection)
    if(session){disposeLife(session);session.view.dispose();session=null}
    ui.onlineSession(null)
    ui.tagMode(null)
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
    const terrain=await World.generate(data.seed,undefined,data.generator,data.stage)
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
  if(ui.screen==='tag-result'&&action!=='online-leave')return
  if(session&&heldForSync(session)&&['assign','craft','split','sort'].includes(action)){
    ui.toast('素材の変更を確認しています。少し待ってください。');return
  }
  switch(action){
    case 'goto-create': ui.create();break
    case 'online-menu':ui.onlineMenu(inviteCode);break
    case 'online-create':audio.unlock();await openWorld(null,undefined,()=>onlineClient.create(value),'',value.nickname);break
    case 'online-join':audio.unlock();await openWorld(null,undefined,()=>onlineClient.join(value),value.code,value.nickname);break
    case 'online-copy':await copyInvitation();break
    case 'tag-map':toggleTagMap();break
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
    case 'attack-shark':attackShark();break
    case 'rotate-material':rotateMaterial();break
    case 'view-mode':switchViewMode();break
    case 'touch-fly':if(!touchControls.hidden)toggleFly();break
    case 'inventory':inventory();break
    case 'select':select(value);break
    case 'assign':if(session&&(!session.online||sharedMaterial(value.id,session.data.mode))&&assignHotbar(session.data.bag,value.slot,value.id,session.data.mode)){refreshBag();void persistRoomProgress(session);ui.toast('ホットバーに登録しました。')}break
    case 'craft':if(session&&session.data.mode==='explore'&&ui.screen==='inventory'){
      const count=value.count??1, recipe=value.id??value
      if(session.online&&recipe==='chest'){ui.toast('共有ワールドでは作業台を使えます。');break}
      const result=craft(session.data.bag,recipe,count,context(session))
      if(result.ok){if(station?.id===21)session.world.useBench(station.x,station.y,station.z,count)
        recipeCrafted(session.data.journey,recipe);audio.sound('craft');refreshBag();void persistRoomProgress(session)}ui.toast(result.message)
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
      if(r){ui.toast(r.message);if(r.ok){refreshBag();void persistRoomProgress(session)}}break}
    case 'preset':{
      if(Object.hasOwn(presets,value)){const name=value as keyof typeof presets;await handle('settings-change',{...settings,...presets[name],quality:name});if(session?.online?.tagGame?.status?.phase!=='finished')ui.settings(settings)}break}
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
  if(ui.screen!=='tag-result')ui.error('3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。')
})
canvas.addEventListener('webglcontextlost',event=>{
  event.preventDefault();graphicsOK=false;frameHalted=true;stopInput()
  if(ui.screen==='tag-result')return
  if(session){ui.pause(false,controlMode,'3D描画を中断しました。復旧後に再開できます。');void persist(session)}
  else ui.error(gpuMessage)
})
canvas.addEventListener('webglcontextrestored',()=>{
  graphicsOK=true;frameHalted=false;stillFrame=''
  if(session){session.view.configure(settings);if(ui.screen!=='tag-result')ui.pause(false,controlMode,'3D描画が復旧しました。操作を再開できます。')}
  else void title()
})
window.addEventListener('pagehide',event=>{if(session){
  if(input.active)pause()
  if(session.online){void persist(session);if(!event.persisted)session.online.sync?.close()}
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
  const tag=s.online?.tagGame
  if(tag?.status?.phase==='finished')return
  if(input.active){
    const p=s.player, movement=input.movement(), ox=p.x,oz=p.z
    if(!input.frame(p,elapsed))return
    const it=!!tag?.status?.it&&tag.status.it===s.online?.connection.id
    if(tag){
      movement.sprint=true
      if(it&&tag.status?.phase==='hiding'){
        movement.forward=movement.right=0;movement.jump=movement.jumpPressed=false
      }
      updateTagUI(s,now)
    }
    stepPlayer(s.world,p,movement,dt,it?{...settings,sprintMultiplier:1.25}:settings);audio.environment(s.world,p,dt)
    s.land?.update(p,dt,s.data.day)
    const water=s.aquatic
    water?.update(p,dt)
    const wildlifeEvent=water?.consumeEvent()
    if(wildlifeEvent)ui.toast(wildlifeEvent)
    if(water&&water.health<=0)returnToShore(s)
    guideDue-=dt
    if(guideDue<=0){guideDue=.24;if(s.data.mode==='explore')visitCave(s.data.journey,s.world,p,s.data.bag);guide()}
    stepDistance+=Math.hypot(ox-p.x,oz-p.z)
    if(stepDistance>1.8){stepDistance=0;if(p.grounded&&!p.flying)audio.sound('step',s.world.get(Math.floor(p.x),Math.floor(p.y-.05),Math.floor(p.z)))}
    s.data.day=s.online ? (.39+Math.max(0,Date.now()-s.online.connection.room.createdAt)/600_000)%1 : (s.data.day+dt/600)%1
    cooldown=Math.max(0,cooldown-dt);advanceMine(dt)
  }
  const target=input.active&&!tag?raycast(s.world,s.player):null
  if(!input.active) {
    const key=canvas.clientWidth+'/'+canvas.clientHeight+'/'+s.data.id
    if(stillFrame===key && !s.view.stats.queued)return
    stillFrame=key
  } else stillFrame=''
  const aimedShark=input.active&&!!s.aquatic?.canAttack(s.player)
  const aimedResident=input.active&&!aimedShark?s.land?.targetLabel(s.player,target?.distance):null
  if(input.active)showWildlife(s,aimedShark)
  const held=tag?0:s.data.bag.hotbar[s.data.selected]
  const use=target&&!s.player.crouched&&(!s.online?[21,22].includes(target.id):s.data.mode==='explore'&&target.id===21)
  const slide=held===SLIDE_ITEM
  touchRotate.hidden=!input.active||!input.drag||!slide||aimedShark
  const rotateLabel='向き '+slideNames[slideFacing]
  if(!touchRotate.hidden&&touchRotate.textContent!==rotateLabel)touchRotate.textContent=rotateLabel
  const preview=target&&!use&&!aimedShark&&!aimedResident&&ITEMS[held]?.block&&!input.mining?{x:target.x+target.nx,y:target.y+target.ny,z:target.z+target.nz,
    id:slide?SLIDE_ITEM+slideFacing:held,axis:logAxis,valid:!placementIssue(s.world,s.player,s.data.bag,s.data.mode,s.data.selected,target)&&
      !s.land?.occupies(target.x+target.nx,target.y+target.ny,target.z+target.nz)}:null
  const useAction=touchControls.hidden?'右クリック':'タップ'
  ui.target(aimedShark?(input.drag?'サメ　攻撃ボタン / X':'サメ　左クリック / X'):
    aimedResident?aimedResident+'　'+useAction+'で話す':use?useAction+(target!.id===21?'で作業台':'でチェスト'):'')
  const speed=Math.hypot(s.player.vx,s.player.vz),heldItem=s.data.mode==='creative'||activeStack(s.data.bag,held)?held:0
  s.view.update(s.player,target,s.data.day,input.active?dt:0,{active:input.active,held:heldItem,mining:progress,preview,
    moving:settings.bob&&s.player.grounded&&speed>.15,sprinting:speed>4.5},s.kids?{player:s.player,hit:target}:undefined,!!tag)
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
