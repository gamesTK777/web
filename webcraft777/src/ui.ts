import { ITEMS, RECIPES, activeStack, craftable, quantity, craftReason, needsBench, type CraftContext, type Stack, type Bag, type Mode } from './inventory'

export type { Mode } from './inventory'
import type { Settings as UISettings } from './preferences'
export interface UIWorld { id:string; name:string; mode:Mode; updatedAt:number; hasOriginal?:boolean }
export interface ItemView { id:number; name:string; count:number; durability?:number; maxDurability?:number }
export interface RecipeView { id:string; name:string; ingredients:string; outputs:string; craftable:number; itemId:number; reason:string; equipment:string }
export interface InventoryView { items:ItemView[]; bar:(ItemView|null)[]; recipes:RecipeView[]; selected:number; mode:Mode; benchUses?:number; chest?:Stack[]; palette?:ItemView[] }

export function inventoryView(bag:Bag, mode:Mode, selected:number,ctx:CraftContext):InventoryView {
  const creative = mode === 'creative'
  function item(id:number):ItemView|null {
    const def = ITEMS[id]
    if (!def) return null
    return {id, name:def.name, count:creative ? Infinity : quantity(bag,id), durability:creative ? undefined : activeStack(bag,id)?.durability, maxDurability:def.maxDurability}
  }
  const items = creative
    ? Object.keys(ITEMS).map(Number).filter(id=>ITEMS[id].block).map(item).filter((i):i is ItemView=>!!i)
    : bag.slots.map(s=>({id:s.id,name:ITEMS[s.id].name,count:s.count,durability:s.durability,maxDurability:ITEMS[s.id].maxDurability}))
  const recipes = creative ? [] : RECIPES.filter(r=>!r.legacy||ctx.generator===1).map(r=>({id:r.id, name:r.name, itemId:r.output.id,
    ingredients:r.inputs.map(i=>ITEMS[i.id].name+' '+quantity(bag,i.id)+'/'+i.count).join(' ・ '),
    outputs:ITEMS[r.output.id].name+' ×'+r.output.count, craftable:craftable(bag,r,ctx),reason:craftReason(bag,r,ctx),equipment:needsBench(r,ctx.generator)?'作業台':'手作り'}))
  return {items, bar:bag.hotbar.map(item), recipes, mode, selected}
}

const escapeText = (value:unknown) => String(value ?? '').replace(/[&<>"']/g, character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[character]!)
const modeName = (mode:Mode) => mode === 'creative' ? 'クリエイティブ' : '探索'
const $ = <T extends HTMLElement = HTMLElement>(id:string) => document.getElementById(id) as T
const button = (action:string, text:string, css='')=>'<button type="button" class="'+css+'" data-action="'+action+'">'+text+'</button>'
const backButton = () => button('back','<span aria-hidden="true">‹</span> 戻る','back')
const sectionHead = (name:string) => '<header class="panel-head"><h1>'+name+'</h1>'+backButton()+'</header>'
const formattedCount=(count:number)=>Number.isFinite(count)?String(count):'∞'
const icons = new Map<number,string>()
const toolEffect:Record<number,string>={17:'石や鉱石を素早く掘り、潮晶を採取',18:'石や鉱石をさらに速く掘り、潮晶を採取',19:'原木・木材の採掘を短縮',20:'原木・木材をさらに速く採掘'}

// The game draws its own low-resolution item stamps on demand and shares them across all slots.
function icon(id:number):string {
  const existing = icons.get(id)
  if (existing) return existing
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 32
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  const poly=(fill:string, points:number[][])=>{
    ctx.fillStyle=fill; ctx.beginPath(); ctx.moveTo(points[0][0],points[0][1])
    for (const [x,y] of points.slice(1)) ctx.lineTo(x,y)
    ctx.closePath(); ctx.fill()
  }
  const palettes:Record<number,string[]> = {
    1:['#86bc59','#916742','#705637'],2:['#bf9165','#9b704c','#77563d'],3:['#b4bac1','#828e98','#646d79'],
    4:['#f1d9a0','#ccb17e','#b79565'],5:['#d1ad75','#926645','#684630'],6:['#71ac63','#538959','#386c47'],
    7:['#e6ba82','#bf8c53','#9d7044'],8:['#b4b7b4','#8e9392','#6f797a'],9:['#b9bfc5','#89939e','#647483'],
    10:['#d8f3f0','#8db8bf','#69a7ae'],11:['#a0aaa9','#7b8486','#69777a'],12:['#ffe3a2','#eeb756','#bf893c'],
    21:['#eac98f','#a97651','#755040'],22:['#e2ac58','#aa793c','#876137'],23:['#9fc6bd','#689a96','#536f79'],25:['#c2fff1','#6dc7c7','#5aafaf'],26:['#a1c8c1','#668c89','#4e7176']
  }
  if (palettes[id]) {
    const p = palettes[id]
    poly(p[1],[[2,9],[16,16],[16,31],[2,24]])
    poly(p[2],[[16,16],[30,9],[30,24],[16,31]])
    poly(p[0],[[2,9],[16,2],[30,9],[16,16]])
    const stroke=(c:string,x1:number,y1:number,x2:number,y2:number)=>{
      ctx.strokeStyle=c;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()
    }
    if(id===22||id===21){stroke('#573b34',3,15,16,22);stroke('#543c34',16,22,29,15);ctx.fillStyle='#ffe2a0';ctx.fillRect(9,16,3,5)}
    if([23,25,26].includes(id))poly('#c7fff1',[[6,15],[9,14],[12,20],[9,23]])
    if (id===1) {poly('#6b9e4c',[[2,9],[16,16],[16,19],[11,17],[10,19],[8,15],[6,16],[2,13]]);poly('#598340',[[16,16],[30,9],[30,12],[26,15],[23,15],[21,18],[16,19]])}
    if ([7,9,12].includes(id)) {
      for(const y of [14,19]) { stroke('#533f3970',2,y,16,y+7);stroke('#493c4266',16,y+7,30,y) }
      if(id===9){stroke('#56646b',8,12,8,17);stroke('#53616c',12,19,12,24)}
    } else if(id===5) {for(const x of [5,9,13])stroke('#5e422f',x,10+(x-2)/2,x,23+(x-2)/2);poly('#99784c',[[8,9],[16,5],[24,9],[16,13]]);poly('#d2ab76',[[11,9],[16,7],[21,9],[16,11]])}
    else if(id===10) {stroke('#e0ffff',4,13,9,22);stroke('#c3eeee',18,17,22,23)}
    else {ctx.fillStyle=id===11?'#35434a':'#ffffff38';for(const [x,y] of [[5,13],[9,19],[12,16],[19,21],[25,15],[16,7]])ctx.fillRect(x,y,id===11?3:2,id===11?3:1)}
  } else if(id===24){poly('#438c9a',[[7,16],[17,2],[25,13],[17,30],[10,26]]);poly('#a6fff0',[[7,16],[17,2],[15,18],[10,26]]);poly('#74ddd4',[[15,18],[17,2],[23,13]])}
  else if (id===15) {poly('#25323d',[[4,17],[9,8],[20,5],[28,12],[25,23],[14,27],[6,24]]);poly('#53626c',[[5,16],[11,9],[20,7],[18,14],[10,20]]);poly('#36454d',[[12,23],[19,16],[25,14],[24,21],[15,25]])}
  else {
    poly('#754e34',[[5,27],[8,29],[25,8],[22,5]]);poly('#ca965f',[[5,25],[7,27],[24,6],[22,4]])
    if(id>=17) {
      const stone=id===18 || id===20, top=stone?'#c3ccd0':'#e5c195', side=stone?'#869398':'#b78a59'
      if(id<=18){poly(side,[[11,4],[17,3],[26,10],[29,16],[27,17],[23,12],[16,7],[10,7]]);poly(top,[[9,4],[16,2],[23,5],[27,10],[25,12],[21,8],[15,5],[9,6]])}
      else {poly(side,[[17,5],[23,6],[28,10],[26,17],[19,17],[15,12]]);poly(top,[[15,4],[22,4],[27,8],[24,14],[19,15],[13,10]])}
    }
  }
  const url=canvas.toDataURL()
  icons.set(id,url)
  return url
}
function stamp(id:number) { return '<img class="stamp" src="'+icon(id)+'" alt="" draggable="false">' }

type Send = (action:string,value?:any)=>void
export class GameUI {
  screen = 'title'
  private panel = $('overlay')
  private guideSeen=false
  private guideTimer=0
  private inventoryState:InventoryView|null=null
  private noticeTimer=0
  private saveTimer=0
  private holding=false
  private worldName=''
  constructor(private send:Send) {
    const page=new URL(location.href)
    const cut=page.pathname.indexOf('/webcraft777/')
    this.portal=cut<0 ? '../index.html' : page.pathname.slice(0,cut+1)+'index.html'
    $('game').style.setProperty('--cover','url("'+new URL('./art/panorama.webp',document.baseURI).href+'")')
    $('game').addEventListener('click', e=>this.click(e))
    this.panel.addEventListener('submit',event=>this.submit(event))
    this.panel.addEventListener('change',event=>this.change(event))
    this.panel.addEventListener('input',event=>this.settingOutput(event.target))
    $('fallback').addEventListener('keydown',e=>{if((e.target as HTMLElement).closest('[data-hold]') && ['Enter',' '].includes(e.key)){e.preventDefault();this.startMining()}})
    $('fallback').addEventListener('keyup',()=>this.stopMining())
  }
  private portal:string
  private startMining(){if(!this.holding){this.holding=true;this.send('mine-down')}}
  private stopMining(){if(this.holding){this.holding=false;this.send('mine-up')}}
  private show(name:string,content:string,wide=false) {
    this.stopMining()
    window.clearTimeout(this.guideTimer)
    const onWorld = ['pause','ready','inventory','diagnostics'].includes(name) || (['settings','help'].includes(name) && !$('game').classList.contains('home'))
    if(['title','create','worlds','error'].includes(name))$('game').classList.add('home')
    else if(onWorld)$('game').classList.remove('home')
    this.screen=name
    $('game').dataset.screen=name
    this.panel.hidden=false
    this.panel.className='overlay '+(name==='title'?'title-overlay':'panel-overlay')
    this.panel.innerHTML=name==='title'?content:'<div class="panel'+(wide?' wide':'')+'">'+content+'</div>'
    $('hud').hidden=true
    $('debug').hidden=true
    this.mining(0)
    this.panel.scrollTop=0
  }
  private click(event:MouseEvent) {
    const control=(event.target as Element).closest<HTMLButtonElement>('[data-action]')
    if(!control || control.disabled)return
    const action=control.dataset.action!
    if(action==='select'){this.send(action,Number(control.dataset.slot));return}
    const index=Number(control.dataset.index),side=control.dataset.side??'bag'
    if(action==='assign'){
      if(event.shiftKey&&(this.inventoryState?.mode==='explore'||this.inventoryState?.chest)){
        const chest=this.inventoryState.chest!==undefined
        this.send(chest?'transfer':'split',{side,index,half:false})
      }else this.send(action,{id:Number(control.dataset.id),slot:this.inventoryState?.selected??0})
      return
    }
    if(['split','sort','transfer','transfer-all'].includes(action)){this.send(action,{index,side,half:control.dataset.half==='yes'});return}
    if(action==='supply'){this.send(action,{id:Number(control.dataset.id),count:event.shiftKey?64:1});return}
    if(action==='craft'){this.send(action,{id:control.dataset.id,count:Number(control.dataset.count??1)});return}
    if(['load','export','original','preset'].includes(action)){this.send(action,control.dataset.id);return}
    if(action==='dismiss-guide'){$('guide').hidden=true;this.guideSeen=true;this.send(action);return}
    this.send(action)
  }
  private submit(event:SubmitEvent) {
    event.preventDefault()
    const form=event.target as HTMLFormElement
    if(form.id!=='world-form')return
    const data=new FormData(form), name=String(data.get('name')??'').trim()
    if(!name){this.toast('ワールド名を入力してください。');form.querySelector('input')?.focus();return}
    this.send('start',{name,seed:String(data.get('seed')??'').trim(),mode:data.get('mode')==='creative'?'creative':'explore'})
  }
  private change(event:Event) {
    const input=event.target as HTMLInputElement
    if(input.id==='world-import'){const file=input.files?.[0];if(file)this.send('import',file);input.value='';return}
    if(input.closest('#setting-form')) {
      const data=new FormData($<HTMLFormElement>('setting-form'))
      this.send('settings-change',{distance:Number(data.get('distance')),scale:Number(data.get('scale')),shadows:data.has('shadows'),
        sensitivity:Number(data.get('sensitivity')),volume:Number(data.get('volume')),muted:data.has('muted'),quality:data.get('quality'),
        vegetation:data.has('vegetation'),effects:data.has('effects'),invertY:data.has('invertY'),bob:data.has('bob'),sprintFov:data.has('sprintFov'),
        ambientVolume:Number(data.get('ambientVolume')),effectsVolume:Number(data.get('effectsVolume'))})
    }
  }
  private settingOutput(target:EventTarget|null) {
    if(!(target instanceof HTMLInputElement) || target.type!=='range')return
    const out=target.parentElement?.querySelector('output')
    if(out)out.textContent=this.valueLabel(target.name,Number(target.value))
  }
  private valueLabel(name:string,value:number) {
    if(name==='distance')return value+' チャンク'
    if(name==='sensitivity')return value.toFixed(1)+' 倍'
    return Math.round(value*100)+'%'
  }
  setWorld(name:string){this.worldName=name}
  title(hasWorlds:boolean) {
    this.worldName=''
    const link='<a class="portal" href="'+escapeText(this.portal)+'"><span aria-hidden="true">‹</span> TK777 ARCADE</a>'
    this.show('title', '<div class="title-stage">'+link+'<div class="title-main"><h1 aria-label="ウェブクラフト777"><span>ウェブクラフト</span><strong>777</strong></h1>'+
      '<div class="start-actions">'+button('goto-create','<span>新しく始める</span><b aria-hidden="true">＋</b>','primary')+
      button('goto-worlds','<span>つづきから</span><b aria-hidden="true">›</b>')+'</div>'+
      '<div class="title-sub">'+button('goto-settings','設定')+button('goto-help','操作説明')+'</div></div></div>')
    this.panel.querySelector('[data-action="goto-worlds"]')?.setAttribute('title',hasWorlds?'保存したワールドを開く':'ワールド一覧とバックアップの読み込み')
  }
  create() {
    this.show('create',sectionHead('ワールドを作る')+'<form id="world-form"><label class="entry">ワールド名<input name="name" value="はじまりの谷" required maxlength="64" autocomplete="off"></label>'+
      '<label class="entry">地形のシード<input name="seed" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label>'+
      '<fieldset><legend>ゲームモード</legend><div class="modes"><label><input type="radio" name="mode" value="explore" checked><span><b>探索</b><small>木や石を集め、道具と建材を作る。</small></span></label>'+
      '<label><input type="radio" name="mode" value="creative"><span><b>クリエイティブ</b><small>素材は無制限。空を飛んで建築する。</small></span></label></div></fieldset>'+
      '<button type="submit" class="primary full">ワールドを作成</button></form>')
  }
  worlds(list:UIWorld[]) {
    const rows=list.map(w=>{
      const when=new Date(w.updatedAt)
      const stamp=Number.isFinite(when.getTime())?when.toLocaleString('ja-JP',{year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):''
      const id=escapeText(w.id)
      const original=w.hasOriginal?'<button data-action="original" data-id="'+id+'">旧版の原本</button>':''
      return '<li><div><strong>'+escapeText(w.name)+'</strong><small>'+modeName(w.mode)+'　'+stamp+'</small></div><div class="row-actions"><button class="primary" data-action="load" data-id="'+id+'">開く</button><button data-action="export" data-id="'+id+'">書き出す</button>'+original+'</div></li>'
    }).join('')
    this.show('worlds',sectionHead('ワールド一覧')+(list.length?'<ul class="worlds">'+rows+'</ul>':'<p class="empty">このブラウザーには保存したワールドがありません。</p>')+
      '<div class="actions">'+button('goto-create','新しく始める')+'<label class="file-btn">ファイルを読み込む<input id="world-import" type="file" accept=".json,application/json"></label></div>')
  }
  async confirmImport(name:string):Promise<boolean> {
    const dialog=$<HTMLDialogElement>('confirm-import')
    $('confirm-body').textContent='保存済みの「'+name+'」を、読み込むファイルの状態で置き換えます。'
    dialog.returnValue='cancel'
    return new Promise(resolve=>{dialog.addEventListener('close',()=>resolve(dialog.returnValue==='replace'),{once:true});dialog.showModal()})
  }
  loading(message:string) {
    this.show('loading','<div class="loading-mark" aria-hidden="true"></div><h1>読み込み中</h1><p role="status">'+escapeText(message)+'</p>')
  }
  error(message:string) {
    this.show('error',sectionHead('ゲームを開始できません')+'<p class="error-message">'+escapeText(message)+'</p>'+button('title','タイトルへ戻る','primary'))
  }
  pause(ready=false,drag=false,message='') {
    this.show(ready?'ready':'pause','<h1>'+(ready?'ワールドの準備ができました':'一時停止')+'</h1>'+
      (message?'<p class="input-message" role="status">'+escapeText(message)+'</p>':'')+
      '<div class="pause-actions">'+button('resume',ready?'プレイ開始':'再開','primary')+
      '<p class="control-mode">'+(drag?'ドラッグ操作で見回します。':'マウスを固定して見回します。')+'</p>'+
      (drag?button('resume-lock','視点を固定してプレイ'):button('resume-drag','ドラッグ操作でプレイ'))+
      (ready?'':button('save','手動保存')+button('export','ファイルへ書き出す')+button('goto-settings','設定')+button('goto-help','操作説明')+button('diagnostics','入力の診断・復旧'))+button('title','タイトルへ戻る')+'</div>')
  }
  diagnostics(summary:string,report:string){
    this.show('diagnostics',sectionHead('入力の診断・復旧')+
      '<p class="input-message">'+escapeText(summary)+'</p>'+
      '<div class="pause-actions">'+button('reset-input','入力をリセット','primary')+button('export-diagnostics','診断をファイルに書き出す')+'</div>'+
      '<details class="input-trace"><summary>直近の入力記録</summary><pre>'+escapeText(report)+'</pre></details>')
  }
  play(fallback:boolean,firstGuide=false,pending=false) {
    this.stopMining()
    window.clearTimeout(this.guideTimer)
    this.screen='play'
    $('game').dataset.screen='play'
    $('game').dataset.playInput=pending?'pending':fallback?'drag':'lock'
    $('game').classList.remove('home')
    this.panel.hidden=true;this.panel.replaceChildren();$('hud').hidden=false
    $('fallback').hidden=!fallback
    const guide=$('guide')
    if(firstGuide)this.guideSeen=false
    guide.hidden=!(firstGuide||fallback&&!this.guideSeen)
    guide.innerHTML='<div><b>'+(fallback?'ドラッグ操作':'はじめの操作')+'</b>'+button('dismiss-guide','閉じる','guide-close')+'</div>'+
      '<p><kbd>WASD</kbd> 移動　<kbd>Space</kbd> ジャンプ　<kbd>E</kbd> 持ち物</p><p>'+
      (fallback?'画面をドラッグして見回します。「採掘」は長押し、「設置」はクリック。':'左クリック長押しで採掘、右クリックで設置。')+'</p>'+
      (fallback?'<a href="'+escapeText(location.href)+'" target="_blank" rel="noopener">独立したタブで開く ↗</a>':'')
    if(!fallback && firstGuide)this.guideTimer=window.setTimeout(()=>{
      if(this.screen==='play' && !guide.hidden){guide.hidden=true;this.guideSeen=true;this.send('dismiss-guide')}
    },10000)
  }
  help() {
    this.show('help',sectionHead('操作説明')+'<dl class="keylist">'+[
      ['W / A / S / D','移動'],['マウス / 矢印キー','視点を変える'],['Space / Shift','ジャンプ・水中で浮上 ／ ダッシュ'],
      ['左クリック長押し','照準のブロックを採掘'],['右クリック','手に持っているブロックを設置'],['1 ～ 9 / ホイール','ホットバーを切り替える'],
      ['C 長押し','しゃがむ。足場の端で踏みとどまり、低い坑道を通れる'],['Q / 中クリック','照準の建材を選ぶ'],['R','原木を縦・東西・南北に切り替える'],
      ['右クリック / V','作業台・チェストを開く。しゃがんで右クリックすると隣に設置'],['Ctrl + Z','クリエイティブの通常ブロックを最大20回戻す。作業台とチェストは対象外'],
      ['B / G','現在地を拠点に登録 ／ 探索目標の表示切り替え'],['E','持ち物・クラフトを開閉'],['Esc','一時停止'],['F','クリエイティブで飛行を切り替える'],['Space / Ctrl','飛行中に上昇 ／ 下降'],['F3','FPS・描画回数・チャンク数を表示']
    ].map(([key,text])=>'<div><dt>'+key+'</dt><dd>'+text+'</dd></div>').join('')+'</dl>'+
    '<h2>探索のはじめ方</h2><p>木の幹に近づいて採掘し、持ち物を開いて原木から木材と棒を作ります。木のツルハシで石を掘り、石の道具や建材を作りましょう。持ち物のアイコンを選ぶと、選択中のホットバー枠に登録できます。</p>'+
    '<h2>拠点と遠征</h2><p>木材4個で作業台、6個でチェストを作れます。床に置き、照準を合わせて右クリックで開きます。木の道具と灯晶ブロックを用意したら、拠点をBで登録して岩窟へ。潮晶を持ち帰ると、作業台で青緑色のランタンや象眼タイルを作れます。旧ワールドでは朝霧ガラスと石炭から潮晶を作れます。</p>'+
    '<h2>トラックパッドと視点操作</h2><p>Macでは、トラックパッドを押したまま指を動かすと見回せます。画面上の「採掘」「設置」を使います。クリックせずに見回したいときは、一時停止から「視点を固定してプレイ」を選んでください。</p>'+
    '<p>視点が動かなくなったら、Esc または「一時停止」から「入力の診断・復旧」を開きます。「入力をリセット」でドラッグ操作に戻れます。診断記録は端末に保存・書き出しできます。</p>'+
    '<h2>保存とバックアップ</h2><p>進行はこのブラウザーに自動保存されます。一時停止から手動保存もできます。ブラウザーのデータ削除前や別のPCに移すときは、タイトルの「つづきから」でワールドを「書き出す」を選びます。復元は同じ一覧の「ファイルを読み込む」から行えます。</p>')
  }
  expedition(goal:string,home:string,cave:string){
    const hint=$('journey'),route=$('bearing')
    hint.hidden=!goal;if(hint.textContent!==goal)hint.textContent=goal
    const line=[home,cave].filter(Boolean).join('　·　');if(route.textContent!==line)route.textContent=line
  }
  target(text:string){const el=$('target-hint');if(el.textContent!==text)el.textContent=text;el.hidden=!text||this.screen!=='play'}
  settings(s:UISettings) {
    const range=(name:string,label:string,value:number,min:number,max:number,step:number)=>
      '<label class="range"><span>'+label+'</span><output>'+this.valueLabel(name,value)+'</output><input type="range" name="'+name+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'"></label>'
    const check=(name:string,label:string,checked:boolean)=>'<label class="check"><input type="checkbox" name="'+name+'" '+(checked?'checked':'')+'>'+label+'</label>'
    this.show('settings',sectionHead('設定')+'<form id="setting-form"><fieldset><legend>画面</legend><input type="hidden" name="quality" value="'+s.quality+'"><div class="quality-presets">'+
      Object.entries({low:'低',standard:'標準',high:'高'}).map(([id,name])=>'<button type="button" data-action="preset" data-id="'+id+'" aria-pressed="'+(s.quality===id)+'">'+name+'</button>').join('')+'</div>'+
      (s.quality==='legacy'?'<p>旧版の描画倍率を使用中です。プリセットを選ぶと新しい画質に切り替わります。</p>':'')+
      range('distance','描画距離',s.distance,2,6,1)+range('scale','解像度倍率',s.scale,.5,1.5,.05)+check('shadows','影を表示する',s.shadows)+'</fieldset>'+
      '<fieldset><legend>景色と動き</legend>'+check('vegetation','草花を表示する',s.vegetation)+check('effects','水面・葉の追加演出',s.effects)+check('bob','歩行時に視点を揺らす',s.bob)+check('sprintFov','ダッシュ時に視野を広げる',s.sprintFov)+'</fieldset>'+
      '<fieldset><legend>操作と音</legend>'+check('invertY','マウスの上下を反転する',s.invertY)+range('effectsVolume','効果音',s.effectsVolume,0,1,.05)+range('ambientVolume','環境音',s.ambientVolume,0,1,.05)+range('sensitivity','マウス感度',s.sensitivity,.3,2.5,.1)+range('volume','主音量',s.volume,0,1,.05)+check('muted','ミュート',s.muted)+'</fieldset></form>')
  }
  private slots(view:InventoryView) {
    return view.bar.map((item,i)=>'<button class="slot'+(view.selected===i?' selected':'')+'" data-action="select" data-slot="'+i+'" aria-pressed="'+(view.selected===i)+'" aria-label="'+(i+1)+'番 '+escapeText(item?.name??'空き')+'"><small>'+(i+1)+'</small>'+
      (item?stamp(item.id)+'<em>'+formattedCount(item.count)+'</em>'+this.wear(item):'')+'</button>').join('')
  }
  private wear(i:ItemView){return i.durability!==undefined&&i.maxDurability?'<i class="wear" title="耐久 '+i.durability+' / '+i.maxDurability+'"><b style="width:'+Math.min(100,100*i.durability/i.maxDurability)+'%"></b></i>':''}
  hud(view:InventoryView) {
    this.inventoryState=view
    const item=view.bar[view.selected]
    $('hud-bar').innerHTML=this.slots(view)
    $('mode-tag').textContent=(this.worldName?this.worldName+'　／　':'')+modeName(view.mode)
    $('equipped').textContent=item?item.name+'　'+formattedCount(item.count)+(item.durability!==undefined?'　耐久 '+item.durability+'/'+item.maxDurability:''):'素手'
  }
  inventory(view:InventoryView) {
    const same=this.screen==='inventory', scroller=same?this.panel.querySelector('.panel'):null
    const scroll=scroller?.scrollTop??0
    const active=document.activeElement as HTMLElement|null
    const data=same&&active?.dataset.action?Object.entries(active.dataset):null
    const paletteOpen=!!this.panel.querySelector('details[open]')
    this.inventoryState=view
    const bagTools=(side:'bag'|'chest')=>'<div class="storage-tools"><button data-action="sort" data-side="'+side+'">整理</button>'+
      (view.chest?'<button data-action="transfer-all" data-side="'+side+'">'+(side==='bag'?'すべて預ける':'すべて取り出す')+'</button>':'')+'</div>'
    const controls=(index:number,side:'bag'|'chest')=>{
      const attr=' data-index="'+index+'" data-side="'+side+'"'
      return '<div class="stack-actions">'+(view.chest?'<button data-action="transfer"'+attr+'>'+(side==='bag'?'預ける':'取る')+'</button><button data-action="transfer" data-half="yes"'+attr+'>半分</button>':
        '<button data-action="split"'+attr+'>分割</button>')+'</div>'
    }
    const title=view.chest?'チェスト':view.benchUses!==undefined?'作業台':view.mode==='creative'?'ブロック一覧':'持ち物とクラフト'
    const chest=view.chest?'<section><h2>チェスト　'+view.chest.length+' / 27 枠</h2>'+bagTools('chest')+
      (view.chest.length?'<div class="bag-grid">'+view.chest.map((s,i)=>'<div class="stack"><span>'+stamp(s.id)+' '+escapeText(ITEMS[s.id].name)+' ×'+s.count+(s.durability?'　耐久 '+s.durability:'')+'</span>'+controls(i,'chest')+'</div>').join('')+'</div>':'<p class="empty">まだ空です。所持品から預けられます。</p>')+'</section>':''
    const supply=view.palette?'<details class="supply" '+(paletteOpen?'open':'')+'><summary>建材を補充</summary><p>クリックで1個、Shift＋クリックで64個を所持品に加えます。</p><div class="bag-grid">'+view.palette.map(item=>'<button class="bag-item" data-action="supply" data-id="'+item.id+'">'+stamp(item.id)+escapeText(item.name)+'</button>').join('')+'</div></details>':''
    const items=view.items.map((i,index)=>'<div class="stack"><button class="bag-item" type="button" data-index="'+index+'" data-action="assign" data-id="'+i.id+'">'+stamp(i.id)+'<b>'+escapeText(i.name)+'</b><small>'+(
      i.durability!==undefined?'耐久 '+i.durability+'/'+i.maxDurability:'× '+formattedCount(i.count))+'</small>'+(toolEffect[i.id]?'<small>'+toolEffect[i.id]+'</small>':'')+this.wear(i)+'</button>'+(view.mode==='explore'||view.chest?controls(index,'bag'):'')+'</div>').join('')
    const recipes=view.recipes.map(r=>'<li>'+stamp(r.itemId)+'<div><strong>'+escapeText(r.outputs)+'</strong><small>'+escapeText(r.ingredients)+'</small><small>'+r.equipment+'　'+(r.reason|| (r.craftable?'制作可能 '+r.craftable+' 回':'所持品に空きがありません。'))+'</small></div><div class="craft-actions"><button data-action="craft" data-id="'+r.id+'" '+(r.craftable<1?'disabled':'')+'>作る</button>'+
      (r.craftable>1?'<button data-action="craft" data-id="'+r.id+'" data-count="'+r.craftable+'">まとめて ×'+r.craftable+'</button>':'')+'</div></li>').join('')
    this.show('inventory','<header class="panel-head"><h1>'+title+'</h1>'+button('back','閉じる <kbd>E</kbd>','back')+'</header>'+
      '<div class="inventory-bar"><h2>ホットバー</h2><div class="hotbar">'+this.slots(view)+'</div><p>数字1〜9かクリックで枠を選び、アイコンを押すと登録。'+(view.mode==='explore'?' Shift＋クリックで'+(view.chest?'移動':'分割')+'。':'')+(view.benchUses!==undefined?'　この作業台で制作 '+view.benchUses+' 回':'')+'</p></div>'+
      supply+'<div class="inventory-columns'+(view.mode==='creative'&&!view.chest?' palette':'')+'"><section><h2>'+(view.mode==='creative'&&!view.chest?'建築ブロック':'所持品')+'</h2>'+(view.mode==='explore'||view.chest?bagTools('bag'):'')+
      (items?'<div class="bag-grid">'+items+'</div>':'<p class="empty">'+(view.palette?'「建材を補充」を開くと、ここに素材を用意できます。':'まだ何も持っていません。木や土を採掘して集めましょう。')+'</p>')+'</section>'+
      (chest|| (view.mode==='creative'?'':'<section><h2>クラフト</h2><p class="ingredient-key">材料は所持数 / 必要数で表示します。</p><ul class="recipes">'+recipes+'</ul></section>'))+'</div>',true)
    const fresh=this.panel.querySelector('.panel')
    if(fresh)fresh.scrollTop=scroll
    if(data)Array.from(this.panel.querySelectorAll<HTMLElement>('[data-action]')).find(el=>data.every(([key,value])=>el.dataset[key]===value))?.focus({preventScroll:true})
  }
  mining(progress:number) {
    const meter=$('mine-meter')
    const n=Math.round(Math.max(0,Math.min(1,Number.isFinite(progress)?progress:0))*100)
    meter.hidden=n===0 || this.screen!=='play'
    if(meter.dataset.percent===String(n))return
    meter.dataset.percent=String(n)
    meter.setAttribute('aria-valuenow',String(n))
    meter.style.setProperty('--progress',n+'%')
  }
  debug(text:string) {
    const out=$('debug')
    out.hidden=!text||this.screen!=='play'
    if(out.textContent!==text)out.textContent=text
  }
  toast(message:string) {
    const notice=$('notice');notice.textContent=message;notice.hidden=!message
    window.clearTimeout(this.noticeTimer)
    this.noticeTimer=window.setTimeout(()=>{notice.hidden=true},2000)
  }
  status(message:string) {
    const status=$('save-status');status.textContent=message;status.hidden=!message
    window.clearTimeout(this.saveTimer)
    if(!message.includes('中')&&!/失敗|できません/.test(message))this.saveTimer=window.setTimeout(()=>{status.hidden=true},3500)
  }
}
