import { World, emptyFixtures, type Axis } from './world'
import { createJourney, currentGoal, homeBearing, bearing, placedDecor, recipeCrafted, visitCave } from './expedition'
import { presets } from './preferences'
import { SceneView } from './renderer'
import { GameUI, inventoryView } from './ui'
import { InputController } from './input'
import { Soundscape } from './audio'
import { craft, createBag, assignHotbar, activeStack, miningSeconds, ITEMS, sortSlots, splitStack, transferAll, transferStack, supplyCreative, type Mode } from './inventory'
import { createPlayer, safeSpawn, stepPlayer, resetPlayerInput, overlapsPlayer, placementIssue, raycast, placeAt, mineAt, type Player, type Hit } from './physics'
import { SaveStore, settingsAtTitle, rememberSettings, validSettings, readBackup, backupText, type ActiveSave, type WorldSave } from './storage'

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!
canvas.tabIndex = -1
const saves = new SaveStore()
const audio = new Soundscape()
const ui = new GameUI((action,value)=>{ void handle(action,value).catch(err=>ui.toast(reason(err))) })
type Session = { data: ActiveSave; world: World; player: Player; view: SceneView }
let station:Hit|null=null, logAxis:Axis='y', progress=0, guideDue=0, tapSound=0
let currentSite=''
const tuneAudio=()=>audio.configure(settings.volume,settings.muted,settings.effectsVolume,settings.ambientVolume)
let session: Session|null=null
let settings = settingsAtTitle()
let busy = false, debugging = false, fallbackPreferred=false, firstGuide=false
let aimKey='', mining=0, cooldown=0, stepDistance=0
let saveQueue: Promise<boolean> = Promise.resolve(true)
let frameTime=0, lastStats=0, frameCount=0
let stillFrame=''
let graphicsOK=false
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
function viewInventory() {
  const s=session!, v=inventoryView(s.data.bag,s.data.mode,s.data.selected,context(s))
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
  if(!hit||![21,22].includes(hit.id)){if(explicit)ui.toast('作業台かチェストに照準を合わせてください。');return false}
  station=hit;stopInput();ui.inventory(viewInventory());return true
}
function pick(){
  if(!session)return
  const {world,player,data}=session,hit=raycast(world,player)
  if(!hit){ui.toast('選びたい建材に照準を合わせてください。');return}
  const slot=data.bag.hotbar.indexOf(hit.id)
  if(data.mode==='explore'&&!activeStack(data.bag,hit.id)){ui.toast('この建材は所持品にありません。');return}
  if(slot>=0){select(slot);return}
  if(assignHotbar(data.bag,data.selected,hit.id,data.mode)){refreshBag();ui.toast(ITEMS[hit.id].name+'を選びました。')}
  else ui.toast('このブロックは選択できません。')
}
function undo(){
  if(!session)return
  if(session.data.mode!=='creative'){ui.toast('元に戻す操作はクリエイティブで使えます。');return}
  const s=session,r=s.world.undo((x,y,z)=>overlapsPlayer(s.player,x,y,z));resetMining();ui.toast(r.message)
}
function refreshBag() {
  if(!session)return
  if(ui.screen==='inventory')ui.inventory(viewInventory())
  else if(ui.screen==='play')ui.hud(viewInventory())
}
function resetMining(){ aimKey='';mining=0;progress=0;tapSound=0;ui.mining(0) }
function select(slot:number) {
  if(!session||!Number.isInteger(slot)||slot<0||slot>8)return
  session.data.selected=slot;resetMining(); refreshBag()
}
function stopInput(){ input.stop(); if(session)resetPlayerInput(session.player);audio.setPlaying(false);resetMining();cooldown=0;stepDistance=0;frameTime=0 }
function pause() {
  if(!session || !input.active)return
  stopInput(); ui.pause()
}
function inventory() {
  if(!session || !input.active)return
  station=null;stopInput(); ui.inventory(viewInventory())
}
function showPlay(fallback:boolean){
  if(!session||!input.active)return
  ui.play(fallback,firstGuide);ui.hud(viewInventory());guide()
}
function resume(drag:boolean) {
  if(!session || !['ready','pause','inventory'].includes(ui.screen))return
  station=null
  firstGuide=!session.data.guideSeen
  fallbackPreferred=drag
  frameTime=0;lastStats=0;frameCount=0
  ui.play(drag,firstGuide);ui.hud(viewInventory());guide();audio.unlock();audio.setPlaying(true)
  input.start(drag)
}
function aim(dx:number,dy:number){
  if(!session)return
  const p=session.player, factor=.00235*settings.sensitivity
  p.yaw=(p.yaw-dx*factor)%(2*Math.PI)
  p.pitch=Math.max(-1.55,Math.min(1.55,p.pitch-dy*factor*(settings.invertY?-1:1)))
}
function place() {
  if(!session||!input.active)return
  const {world,player,data,view}=session,hit=raycast(world,player)
  if(!player.crouched&&interact(hit))return
  const before=hit&&data.mode==='creative'?world.capture(hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz):null
  const id=data.bag.hotbar[data.selected]
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
  if(cooldown>0)return
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
const input=new InputController(canvas,{
  pause,inventory,place,select,look:aim, beginMine:()=>advanceMine(0),pick,undo,
  rotate:()=>{logAxis=logAxis==='y'?'x':logAxis==='x'?'z':'y';ui.toast('原木の向き　'+({x:'東西',y:'縦',z:'南北'}[logAxis]))},
  interact:()=>{if(session)interact(raycast(session.world,session.player),true)},
  home:()=>{if(session){const {x,y,z}=session.player;session.data.journey.home={x,y,z};guide();ui.toast('現在地を拠点に登録しました。')}},
  guide:()=>{if(session){session.data.journey.hidden=!session.data.journey.hidden;guide()}},
  cycle:d=>{if(session)select((session.data.selected+d+9)%9)},
  fly:()=>{if(!session)return;const {player,data}=session
    if(data.mode!=='creative'){ui.toast('飛行はクリエイティブモードで使えます。');return}
    player.flying=!player.flying;player.vy=0;ui.toast(player.flying?'飛行中：Spaceで上昇、Ctrlで下降':'飛行を終了しました。')},
  debug:()=>{debugging=!debugging;if(!debugging)ui.debug('')},
  dragChanged:showPlay,background:()=>{if(session) void persist(session)}
})
function snapshot(s:Session): WorldSave {
  const {x,y,z,yaw,pitch}=s.player
  return {...s.data,pose:{x,y,z,yaw,pitch,crouched:s.player.crouched},flying:s.player.flying,edits:s.world.exportEdits(),
    fixtures:s.world.exportFixtures(),journey:structuredClone(s.data.journey),settings:{...settings},bag:structuredClone(s.data.bag)}
}
function persist(s:Session) {
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
    if(!await persist(s) && !window.confirm('保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？')) {ui.pause();return}
    s.view.dispose();session=null
  }
  ui.title(false)
  try {const entries=await saves.list();if(ui.screen==='title') ui.title(!!entries.length)}
  catch(e){if(ui.screen==='title')ui.status('保存領域：'+reason(e))}
}
async function openWorld(id:string|null, args?:{name:string;seed:string;mode:Mode}) {
  if(session || busy)return
  if(!graphicsOK){ui.error(gpuMessage);return}
  busy=true
  try {
    ui.loading('森と湖を準備しています…')
    const loaded=id?await saves.get(id):undefined
    if(id&&!loaded)throw new Error('ワールドが見つかりません。一覧を開き直してください。')
    const seed=loaded?.seed||args?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8)
    let step=-1
    const world=await World.generate(seed,(fraction:number)=>{
      const n=Math.min(10,Math.floor(fraction*10));if(step!==n){ui.loading('地形を生成中　'+n*10+'%');step=n}
    },loaded?.generator??2)
    if(loaded){world.loadEdits(loaded.edits);world.loadFixtures(loaded.fixtures)}
    const start=world.spawn()
    const data:ActiveSave=loaded??{format:'webcraft777',version:2,generator:2,id:crypto.randomUUID(),
      fixtures:emptyFixtures(),journey:createJourney(),
      revision:0,updatedAt:Date.now(),name:args!.name.trim().slice(0,64)||'新しいワールド',seed,mode:args!.mode,
      pose:start,flying:false,bag:createBag(args!.mode),selected:0,edits:[],day:.39,settings:{...settings},guideSeen:false}
    if(!data.journey.home){const {x,y,z}=start;data.journey.home={x,y,z}}
    station=null;logAxis='y';currentSite=''
    settings={...data.settings};tuneAudio()
    const player=createPlayer(safeSpawn(world,data.pose,!!loaded));player.flying=data.mode==='creative'&&data.flying
    const view=new SceneView(canvas,world)
    session={world,data,player,view}; view.configure(settings);stillFrame=''
    ui.setWorld(data.name); ui.pause(true)
    if(!loaded) await persist(session)
    fallbackPreferred=false;debugging=false
  } catch(e){
    session?.view.dispose();session=null
    console.error(e);ui.error(reason(e))
  } finally {busy=false}
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
  const url=URL.createObjectURL(new Blob([backupText(data)],{type:'application/json'}))
  const link=document.createElement('a');link.href=url;link.download='ウェブクラフト777-'+data.name.replace(/[\\/:*?"<>|]/g,'_')+'.json'
  document.body.append(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),60_000)
  ui.status('バックアップファイルを書き出しました。')
}
async function handle(action:string,value?:any) {
  if(busy && !['resume','resume-drag','dismiss-guide'].includes(action))return
  switch(action){
    case 'goto-create': ui.create();break
    case 'goto-worlds': await worldList();break
    case 'goto-help': ui.help();break
    case 'goto-settings': ui.settings(settings);break
    case 'back':
      if(session){if(ui.screen==='inventory')resume(fallbackPreferred);else ui.pause()}
      else await title();break
    case 'title': if(!busy){busy=true;try {await title()}finally{busy=false}}break
    case 'start': audio.unlock();await openWorld(null,value);break
    case 'load': audio.unlock();await openWorld(value);break
    case 'resume':case 'resume-drag':resume(action==='resume-drag');break
    case 'pause':pause();break
    case 'inventory':inventory();break
    case 'select':select(value);break
    case 'assign':if(session&&assignHotbar(session.data.bag,value.slot,value.id,session.data.mode)){refreshBag();ui.toast('ホットバーに登録しました。')}break
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
    e.preventDefault();if(e.code==='Escape')ui.pause();else resume(fallbackPreferred)
  }else if(e.code==='Escape'&&['settings','help','create','worlds'].includes(ui.screen)){
    e.preventDefault();void handle('back')
  }
})
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();graphicsOK=false;pause()
  if(session)void persist(session)
  ui.error('3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。')
})
window.addEventListener('pagehide',()=>{if(session){if(input.active)pause();void persist(session)}})
window.setInterval(()=>{if(session && !document.hidden)void persist(session)},25000)
function frame(now:number){
  requestAnimationFrame(frame)
  if(!session||!graphicsOK||document.hidden){frameTime=0;return}
  const s=session,elapsed=frameTime?(now-frameTime)/1000:0,dt=Math.min(elapsed,.1);frameTime=now
  if(input.active){
    const p=s.player, movement=input.movement(), ox=p.x,oz=p.z
    const keys=input.keys
    if(keys.has('ArrowRight')||keys.has('ArrowLeft'))p.yaw=(p.yaw+(Number(keys.has('ArrowLeft'))-Number(keys.has('ArrowRight')))*dt*1.65)%(2*Math.PI)
    if(keys.has('ArrowUp')||keys.has('ArrowDown'))p.pitch=Math.min(1.55,Math.max(-1.55,p.pitch+(Number(keys.has('ArrowUp'))-Number(keys.has('ArrowDown')))*dt*1.3))
    stepPlayer(s.world,p,movement,dt,settings);audio.environment(s.world,p,dt)
    guideDue-=dt
    if(guideDue<=0){guideDue=.24;if(s.data.mode==='explore')visitCave(s.data.journey,s.world,p,s.data.bag);guide()}
    stepDistance+=Math.hypot(ox-p.x,oz-p.z)
    if(stepDistance>1.8){stepDistance=0;if(p.grounded&&!p.flying)audio.sound('step',s.world.get(Math.floor(p.x),Math.floor(p.y-.05),Math.floor(p.z)))}
    s.data.day=(s.data.day+dt/600)%1
    cooldown=Math.max(0,cooldown-dt);advanceMine(dt)
  }
  const target=input.active?raycast(s.world,s.player):null
  if(!input.active) {
    const key=canvas.clientWidth+'/'+canvas.clientHeight+'/'+s.data.id
    if(stillFrame===key && !s.view.stats.queued)return
    stillFrame=key
  } else stillFrame=''
  const held=s.data.bag.hotbar[s.data.selected],use=target&&[21,22].includes(target.id)&&!s.player.crouched
  const preview=target&&!use&&ITEMS[held]?.block&&!input.mining?{x:target.x+target.nx,y:target.y+target.ny,z:target.z+target.nz,
    id:held,axis:logAxis,valid:!placementIssue(s.world,s.player,s.data.bag,s.data.mode,s.data.selected,target)}:null
  ui.target(use?(target!.id===21?'右クリックで作業台':'右クリックでチェスト'): '')
  const speed=Math.hypot(s.player.vx,s.player.vz),heldItem=s.data.mode==='creative'||activeStack(s.data.bag,held)?held:0
  s.view.update(s.player,target,s.data.day,input.active?dt:0,{active:input.active,held:heldItem,mining:progress,preview,
    moving:settings.bob&&s.player.grounded&&speed>.15,sprinting:speed>4.5})
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
void title().then(()=>{if(!graphicsOK)ui.error(gpuMessage)})
requestAnimationFrame(frame)
