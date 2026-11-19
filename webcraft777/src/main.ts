import { World } from './world'
import { SceneView } from './renderer'
import { GameUI, inventoryView } from './ui'
import { InputController } from './input'
import { Soundscape } from './audio'
import { craft, createBag, assignHotbar, activeStack, miningSeconds, type Mode } from './inventory'
import { createPlayer, safeSpawn, stepPlayer, raycast, placeAt, mineAt, type Player, type Pose } from './physics'
import { SaveStore, settingsAtTitle, rememberSettings, validSettings, parseBackup, backupText, type WorldSave } from './storage'

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!
canvas.tabIndex = -1
const saves = new SaveStore()
const audio = new Soundscape()
const ui = new GameUI((action,value)=>{ void handle(action,value).catch(err=>ui.toast(reason(err))) })
type Session = { data: WorldSave; world: World; player: Player; view: SceneView }
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
function viewInventory() { const s=session!;return inventoryView(s.data.bag,s.data.mode,s.data.selected) }
function refreshBag() {
  if(!session)return
  if(ui.screen==='inventory')ui.inventory(viewInventory())
  else if(ui.screen==='play')ui.hud(viewInventory())
}
function resetMining(){ aimKey='';mining=0;ui.mining(0) }
function select(slot:number) {
  if(!session||!Number.isInteger(slot)||slot<0||slot>8)return
  session.data.selected=slot;resetMining(); refreshBag()
}
function stopInput(){ input.stop(); resetMining(); cooldown=0; stepDistance=0; frameTime=0 }
function pause() {
  if(!session || !input.active)return
  stopInput(); ui.pause()
}
function inventory() {
  if(!session || !input.active)return
  stopInput(); ui.inventory(viewInventory())
}
function showPlay(fallback:boolean){
  if(!session||!input.active)return
  ui.play(fallback,firstGuide);ui.hud(viewInventory())
}
function resume(drag:boolean) {
  if(!session || !['ready','pause','inventory'].includes(ui.screen))return
  firstGuide=!session.data.guideSeen
  fallbackPreferred=drag
  frameTime=0;lastStats=0;frameCount=0
  ui.play(drag,firstGuide);ui.hud(viewInventory());audio.unlock()
  input.start(drag)
}
function aim(dx:number,dy:number){
  if(!session)return
  const p=session.player, factor=.00235*settings.sensitivity
  p.yaw=(p.yaw-dx*factor)%(2*Math.PI)
  p.pitch=Math.max(-1.55,Math.min(1.55,p.pitch-dy*factor))
}
function place() {
  if(!session||!input.active)return
  const {world,player,data,view}=session,hit=raycast(world,player)
  const result=placeAt(world,player,data.bag,data.mode,data.selected,hit)
  if(result.ok&&hit){
    const id=data.bag.hotbar[data.selected]
    view.effect(hit.x+hit.nx,hit.y+hit.ny,hit.z+hit.nz,id)
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
  if(key!==aimKey){mining=0;aimKey=key}
  if(hit.id===14){ui.toast('岩盤は掘れません。');input.mining=false;resetMining();return}
  const id=data.bag.hotbar[data.selected]
  const held=data.mode==='creative'||activeStack(data.bag,id)?id:0
  const duration=miningSeconds(hit.id,held,data.mode)
  if(!Number.isFinite(duration)){ui.toast('この素材にはツルハシが必要です。');input.mining=false;resetMining();return}
  mining += dt
  ui.mining(Math.min(1,mining/duration))
  if(mining<duration && !(data.mode==='creative' && dt===0)) return
  const result=mineAt(world,player,data.bag,data.mode,data.selected,hit)
  if(result.ok){
    view.effect(hit.x,hit.y,hit.z,hit.id)
    audio.sound(result.message.includes('壊れ')?'break':'mine',hit.id)
    refreshBag()
  }else input.mining=false
  ui.toast(result.message);resetMining(); cooldown=data.mode==='creative'?.15:.11
}
const input=new InputController(canvas,{
  pause,inventory,place,select,look:aim, beginMine:()=>advanceMine(0),
  cycle:d=>{if(session)select((session.data.selected+d+9)%9)},
  fly:()=>{if(!session)return;const {player,data}=session
    if(data.mode!=='creative'){ui.toast('飛行はクリエイティブモードで使えます。');return}
    player.flying=!player.flying;player.vy=0;ui.toast(player.flying?'飛行中：Spaceで上昇、Ctrlで下降':'飛行を終了しました。')},
  debug:()=>{debugging=!debugging;if(!debugging)ui.debug('')},
  dragChanged:showPlay,background:()=>{if(session) void persist(session)}
})
function snapshot(s:Session): WorldSave {
  const {x,y,z,yaw,pitch}=s.player
  return {...s.data,pose:{x,y,z,yaw,pitch},flying:s.player.flying,edits:s.world.exportEdits(),
    settings:{...settings},bag:structuredClone(s.data.bag)}
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
    })
    if(loaded)world.loadEdits(loaded.edits)
    const start=world.spawn()
    const data:WorldSave=loaded??{format:'webcraft777',version:1,generator:1,id:crypto.randomUUID(),
      revision:0,updatedAt:Date.now(),name:args!.name.trim().slice(0,64)||'新しいワールド',seed,mode:args!.mode,
      pose:start,flying:false,bag:createBag(args!.mode),selected:0,edits:[],day:.39,settings:{...settings},guideSeen:false}
    settings={...data.settings};audio.configure(settings.volume,settings.muted)
    const player=createPlayer(safeSpawn(world,data.pose));player.flying=data.mode==='creative'&&data.flying
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
    const data=parseBackup(await file.text())
    // Validate world-dependent rules too, before replacing a known good record.
    const terrain=await World.generate(data.seed)
    terrain.loadEdits(data.edits)
    const existing=(await saves.list()).find(w=>w.id===data.id)
    if(existing&&!await ui.confirmImport(existing.name))return
    await saves.write(data,existing?.revision??null);await worldList();ui.status('読み込み・保存が完了しました。')
  }catch(e){ui.status('読み込み失敗：'+reason(e))}finally{busy=false}
}
async function exportWorld(id?:string) {
  const data=id?await saves.get(id):session?snapshot(session):undefined
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
      const result=craft(session.data.bag,value);if(result.ok){audio.sound('craft');refreshBag()}ui.toast(result.message)
    }break
    case 'mine-down':if(input.active){input.mining=true;advanceMine(0)}break
    case 'mine-up': input.mining=false;resetMining();break
    case 'place': place();break
    case 'save':if(session)await persist(session);break
    case 'settings-change':if(validSettings(value)){
      settings={...value};rememberSettings(settings);session?.view.configure(settings);stillFrame='';audio.configure(settings.volume,settings.muted)
    }break
    case 'dismiss-guide': if(session)session.data.guideSeen=true;firstGuide=false;break
    case 'import':await importWorld(value);break
    case 'export':await exportWorld(value);break
  }
}
document.addEventListener('keydown',e=>{
  if(e.repeat||e.defaultPrevented||input.active||document.querySelector('dialog[open]'))return
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
    stepPlayer(s.world,p,movement,dt)
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
  s.view.update(s.player,target,s.data.day,input.active?dt:0)
  if(input.active && debugging){
    frameCount++
    if(!lastStats){lastStats=now;frameCount=0}
    else if(now-lastStats>600){
      const {x,y,z}=s.player, stats=s.view.stats
      ui.debug(Math.round(frameCount*1000/(now-lastStats))+' FPS　描画 '+stats.draws+' 回　チャンク '+stats.chunks+'　座標 '+[x,y,z].map(n=>n.toFixed(1)).join(' / '))
      frameCount=0;lastStats=now
    }
  }
}
audio.configure(settings.volume,settings.muted)
void title().then(()=>{if(!graphicsOK)ui.error(gpuMessage)})
requestAnimationFrame(frame)
