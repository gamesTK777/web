import {newGame,act,validateSave,ITEMS,WEAPONS,STOCKS,BUILDINGS,rentTotal,landCost,upgradeCost,xpNeeded} from './engine.mjs?v=20261105';
import {drawScene} from './renderer.mjs?v=20261105-16bit';
import {createAudioManager} from './audio.mjs?v=20261105-16bit';
import {createHoldInput,isMovementKey} from './hold-input.mjs?v=20261105-cloud';
import {createCloudSave} from './cloud-save.mjs?v=20261105-cloud';

const $=id=>document.getElementById(id), KEY='tk777-lantern-merchant-v1';
const money=n=>Number(n).toLocaleString('ja-JP'), esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=newGame(), tab='bag', fresh=true, persistAllowed=true, savedAt=null, saveFailed=false, loadError='', toastTimer, confirmTask=null, frameInfo=null, lastFrame=0;
const sound=createAudioManager(), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let sessionStarted=false, zoom=3, facing='down', motion=null, effects=[], volume=.35, muted=false;
let cloudReady=false,cloudBusy=false,cloudConflict=false,newCloudSlot=false,cloudGeneration=0,cloudReconnectQueued=false;
try{newCloudSlot=localStorage.getItem('tk777-lantern-new-cloud-slot')==='1';}catch{}
const cloud=createCloudSave({endpoint:'https://tk777-neonshift-scores.takesuke.chatgpt.site/api/lantern-save',onStatus:status=>{const line=$('cloudStatus');if(line)line.textContent=status.message;if($('cloudCode'))$('cloudCode').value=cloud.getCode();if(status.phase==='conflict'){cloudReady=false;cloudConflict=true;}else if(status.phase==='error'&&!status.connected)cloudReady=false;}});
const held=createHoldInput({onMove:(dx,dy)=>dispatch({type:'move',dx,dy}),canMove:()=>sessionStarted&&state.mode==='dungeon'&&!document.querySelector('dialog[open]')&&!document.hidden});
try{const settings=JSON.parse(localStorage.getItem('tk777-lantern-audio')||'{}');if(typeof settings.muted==='boolean')muted=settings.muted;if(Number.isFinite(settings.volume))volume=Math.max(0,Math.min(1,settings.volume));}catch{}
sound.setVolume(volume);sound.setMuted(muted);
try { const text=localStorage.getItem(KEY); if(text){const data=JSON.parse(text);state=validateSave(data.state??data);savedAt=data.savedAt??null;fresh=false;} } catch {loadError='保存された記録を読み込めませんでした。元の記録は保護しています。保存画面からバックアップを読み込むか、はじめから開始してください。';persistAllowed=false;fresh=false;}

function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),4200);}
function save(manual=false){
  if(!persistAllowed){if(manual)toast(loadError);return false;}
  try{const timestamp=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify({game:'lantern-ledger',version:1,savedAt:timestamp,state}));savedAt=timestamp;saveFailed=false;$('saveStatus').textContent='端末に保存済み';$('saveStatus').classList.remove('failed');$('saveButton').textContent='保存';if(cloudReady)cloud.queue(state);if(manual)toast('端末に保存しました。オンラインの記録も同期します。');return true;}
  catch{$('saveStatus').textContent='保存できません';$('saveStatus').classList.add('failed');$('saveButton').textContent='未保存 !';if(manual||!saveFailed)toast('ブラウザーへの保存ができません。バックアップを書き出してください。');saveFailed=true;return false;}
}
function confirm(title,message,task){held.clear();confirmTask=task;$('confirmTitle').textContent=title;$('confirmText').textContent=message;$('confirmDialog').showModal();}
function applyCloudState(value){state=validateSave(value);held.clear();motion=null;effects=[];sound.setScene(state.mode);persistAllowed=true;const ready=cloudReady;cloudReady=false;save();cloudReady=ready;render();}
async function connectCloud(localSavedAt=savedAt){
  if(cloudConflict)return;if(cloudBusy){cloudReconnectQueued=true;return;}cloudBusy=true;const generation=cloudGeneration;
  try{const local=state,localTime=localSavedAt;const result=newCloudSlot?await cloud.newSlot(state):await cloud.enable(state);if(generation!==cloudGeneration)return;newCloudSlot=false;try{localStorage.removeItem('tk777-lantern-new-cloud-slot');}catch{}
    const remote=validateSave(result.state);const localChanged=state!==local||!!(localTime&&result.previousSavedAt&&Date.parse(localTime)>Date.parse(result.previousSavedAt));
    const remoteChanged=result.restored&&result.revision>result.previousRevision;
    if(result.fromBackup){cloudReady=false;if(!localChanged)applyCloudState(remote);toast('GitHubの記録を読み込みました。通信が戻ったら保存画面で再接続してください。');return;}
    if(remoteChanged&&localChanged){cloudReady=false;cloudConflict=true;toast('別端末の記録も更新されています。保存画面の「コードで読み込む」から使用する記録を選んでください。');return;}
    cloudReady=true;if(result.restored&&!localChanged)applyCloudState(remote);else cloud.queue(state);
  }catch(error){if(generation===cloudGeneration){cloudReady=cloud.getStatus().connected&&!cloud.getStatus().needsRestore;$('cloudStatus').textContent=error.message||'オンライン保存に接続できません。端末内の記録は残っています。';}}finally{cloudBusy=false;if(cloudReconnectQueued&&sessionStarted){cloudReconnectQueued=false;void connectCloud();}}
}
function restartGame(){held.clear();cloudGeneration++;cloudReady=false;cloudConflict=false;newCloudSlot=true;try{localStorage.setItem('tk777-lantern-new-cloud-slot','1');}catch{}state=newGame();motion=null;effects=[];sessionStarted=false;fresh=true;sound.pause();persistAllowed=true;save();tab='bag';render();if($('saveDialog').open)$('saveDialog').close();if(!$('welcomeDialog').open)showStart();else showStartContents();}
function count(id){return [...state.inventory,...state.runLoot].filter(i=>i.id===id).reduce((s,i)=>s+i.qty,0);}
function draw(time=performance.now()){frameInfo=drawScene($('world'),state,{time,zoom,motion,effects,reducedMotion:reduced});}
function visualEvent(previous,action,result){
  const time=performance.now(),sameFloor=previous.mode==='dungeon'&&state.mode==='dungeon'&&previous.floor===state.floor;
  if(action.type==='move')facing=action.dx<0?'left':action.dx>0?'right':action.dy<0?'up':'down';
  const from=sameFloor?(frameInfo?.playerWorld??previous.player):state.player;
  motion={from:{...from},to:{...state.player},startedAt:time,duration:reduced?0:190,facing,kind:sameFloor&&result.event==='move'?'move':result.event==='attack'?'attack':'idle'};
  const add=(kind,text='',position=state.player)=>effects.push({kind,...position,text,startedAt:time,duration:800});
  if(!sameFloor)effects=[];
  let event=result.event;
  if(event==='attack')add('attack','', {x:previous.player.x+(action.dx||0),y:previous.player.y+(action.dy||0)});
  if(sameFloor&&state.hp<previous.hp){add('hurt',`−${previous.hp-state.hp}`);sound.play('hurt');}
  if(sameFloor&&state.runLoot.reduce((n,i)=>n+i.qty,0)>previous.runLoot.reduce((n,i)=>n+i.qty,0)){add('pickup','GET');event='pickup';}
  if(state.level>previous.level){add('level',`LEVEL ${state.level}`);event='level';}
  if(action.type==='use'&&state.hp>previous.hp){add('heal',`+${state.hp-previous.hp}`);event='heal';}
  if(action.type==='use'&&action.id==='ration')event='heal';
  effects=effects.slice(-16);sound.setScene(state.mode);sound.play(event||'ui');
}
function updateSound(){const status=sound.getStatus();$('soundButton').textContent=muted?'♪ OFF':'♪ 音';$('soundButton').classList.toggle('sound-off',muted);$('muteAudio').checked=muted;$('audioVolume').value=Math.round(volume*100);$('volumeValue').textContent=`${Math.round(volume*100)}%`;$('audioStatus').textContent=!sessionStarted?'ゲーム開始後に再生されます。':muted?'ミュート中です。':status.playing?'オリジナルBGMを再生しています。':'音が聞こえない場合は、ミュートの解除や端末の音量をご確認ください。';}
function storeSound(){try{localStorage.setItem('tk777-lantern-audio',JSON.stringify({muted,volume}));}catch{}updateSound();}
function dispatch(action){
  if(!sessionStarted)return;
  const previous=state, result=act(state,action);
  if(!result.ok){toast(result.message);sound.play('error');return;}
  state=result.state;visualEvent(previous,action,result);save();render();
  if(previous.mode!==state.mode||previous.floor!==state.floor)held.clear();
  if(!['move','wait','attack'].includes(result.event))toast(result.message);
  if(previous.mode==='dungeon'&&state.mode==='town'){
    const earned=state.gold-previous.gold;
    const title=result.event==='victory'?'暁の種を、街へ。':result.event==='defeat'?'救助隊が迎えに来た。':'おかえりなさい、採集商。';
    const text=result.event==='defeat'?'今回の探索品は失いましたが、街の財産・装備・レベルは守られています。宿で体力を整えて、次の冒険へ。':`今回の帰還で ${money(earned)} G が所持金に加わりました。持ち帰った素材を売って、街と装備を育てましょう。`;
    $('sceneHint').textContent=title;toast(`${title} ${text}`);
  }
}
function render(){
  const dungeon=state.mode==='dungeon', weapon=WEAPONS.find(w=>w.id===state.weaponId);
  document.body.dataset.mode=state.mode;
  $('worldHud').innerHTML=`<div class="hud-stat"><small>LEVEL</small><b>${state.level}</b></div><div class="hud-stat health ${state.hp/state.maxHp<.3?'low':''}"><small>HP</small><b>${state.hp} / ${state.maxHp}</b><div class="hud-meter"><i style="width:${state.hp/state.maxHp*100}%"></i></div></div><div class="hud-stat"><small>満腹度</small><b>${Math.floor(state.hunger)}%</b></div><div class="hud-stat gold"><small>GOLD</small><b>${money(state.gold)} G</b></div>`;
  $('dayLabel').textContent=`DAY ${String(state.day).padStart(2,'0')}`;
  $('levelBadge').textContent=`LV. ${state.level}`;$('weaponName').textContent=weapon.name;
  $('hpText').textContent=`${state.hp} / ${state.maxHp}`;$('hpBar').style.width=`${state.hp/state.maxHp*100}%`;
  $('hpBar').style.background=state.hp/state.maxHp<.3?'#ee9a87':'#91b99f';
  $('hungerText').textContent=`${Math.floor(state.hunger)} / 100`;$('hungerBar').style.width=`${state.hunger}%`;
  $('attackText').textContent=`攻撃 ${state.attack} · 守備 ${state.defense}`;$('xpText').textContent=`EXP ${state.xp}/${xpNeeded(state.level)}`;
  $('goldValue').textContent=money(state.gold);$('rentValue').textContent=`+${money(rentTotal(state))} G`;
  $('locationTitle').textContent=dungeon?`翠灯の迷宮 ― 地下${state.floor}階`:'水灯りの街';
  $('locationEyebrow').textContent=dungeon?'THE LANTERN DEPTHS':'YOUR HOMETOWN';
  $('locationBadge').textContent=dungeon?`TURN ${state.runTurns}`:'安全な拠点';
  $('sceneCaption').textContent=dungeon?`探索袋 ${state.runLoot.reduce((s,i)=>s+i.qty,0)}/30 · 拾得金 ${state.runGold} G`:`所有地 ${state.plots.length} 区画 · 建物 ${state.plots.filter(p=>p.building).length} 棟`;
  $('sceneHint').textContent=dungeon?'一歩ずつ、灯りの届く先へ。':'街で準備を整えて、迷宮へ。';
  $('primaryAction').innerHTML=dungeon?'足元を調べる <span>↓</span>':'迷宮へ出発 <span>↗</span>';
  $('dungeonControls').hidden=!dungeon;
  $('potionButton').innerHTML=`回復薬 <b>${count('potion')}</b>`;$('potionButton').disabled=!count('potion');
  $('foodButton').innerHTML=`食料 <b>${count('ration')}</b>`;$('foodButton').disabled=!count('ration');
  const progress=[state.stats.runs>0,state.stats.earned>0,rentTotal(state)>0,state.weaponId!=='starter',state.stats.clears>0];
  const quest=state.stats.clears>0?['街の灯りを増やそう','暁の種を持ち帰りました。土地を広げ、家賃と商いで豊かな街を育てよう。']:rentTotal(state)>0?['最深部の「暁の種」を探そう','家賃を装備に変えて、地下5階の番人へ。食料と帰灯石の準備を忘れずに。']:state.stats.earned>0?['最初の貸家を建てよう','土地と建物から「庭付き貸家」を建てると、翌日から家賃が届きます。']:['最初の宝物を持ち帰ろう','迷宮で素材を拾い、帰還して売却。まずは入口の近くから探索しよう。'];
  $('questTitle').textContent=quest[0];$('questDescription').textContent=quest[1];$('milestones').innerHTML=progress.map(done=>`<i class="${done?'done':''}"></i>`).join('');
  $('eventLog').replaceChildren(...state.log.slice(-7).reverse().map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  $('recordStats').innerHTML=`<div><b>${state.stats.runs}</b>探索回数</div><div><b>B${state.maxFloor}</b>到達階層</div><div><b>${state.stats.clears}</b>遺物帰還</div>`;
  renderWorkspace();updateZoom();draw();
}
function itemRow(item,qty,run=false){return `<div class="item-row"><span class="item-symbol">${esc(item.icon)}</span><div class="item-info"><b>${esc(item.name)} ×${qty}</b><small>${run?'今回の探索品':item.kind==='loot'?`売値 ${item.sell} G / 個`:esc(item.description)}</small></div>${state.mode==='dungeon'?(item.kind==='consumable'?`<button data-use="${item.id}">使う</button>`:''):`<button data-sell="${item.id}" data-qty="${qty}">売る ${money(item.sell*qty)}G</button>`}</div>`;}
function renderWorkspace(){
  document.querySelectorAll('[data-tab]').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);b.setAttribute('aria-current',b.dataset.tab===tab?'page':'false');});
  const locked=state.mode==='dungeon', lock=locked?'<p class="town-lock">街の施設は帰還後に利用できます。</p>':'', disabled=locked?'disabled':'';
  let html='';
  if(tab==='bag'){
    html=`<div class="workspace-header"><div><h3>${locked?'冒険のかばん':'持ち帰った宝物'}</h3><p>${locked?'探索品は無事に帰還すると持ち物になります。':'素材を売って、次の冒険と街づくりの資金に。'}</p></div>${!locked?'<button data-sell-all>素材をまとめて売る</button>':''}</div>`;
    const items=locked?[...state.inventory.map(i=>({...i,run:false})),...state.runLoot.map(i=>({...i,run:true}))]:state.inventory;
    html+=items.length?`<div class="item-grid">${items.map(i=>itemRow(ITEMS.find(s=>s.id===i.id),i.qty,i.run)).join('')}</div>`:'<div class="empty-note">まだ宝物はありません。迷宮に出発してみよう。</div>';
    html+='<p class="workspace-note">装備は失われません。素材の一括売却では、回復薬・食料などの道具は残ります。</p>';
  } else if(tab==='shop'){
    html=lock+'<div class="workspace-header"><div><h3>旅支度の道具店</h3><p>購入した武器は自動で装備されます。</p></div><button data-action="rest" '+disabled+'>宿で休む · 20G</button></div><div class="item-grid">';
    html+=ITEMS.filter(i=>i.buy!==null).map(i=>`<div class="item-row"><span class="item-symbol">${i.icon}</span><div class="item-info"><b>${i.name}</b><small>${i.description}</small></div><button data-buy="${i.id}" ${disabled||state.gold<i.buy?'disabled':''}>${i.buy} G</button></div>`).join('');
    html+=WEAPONS.filter(i=>i.price).map(i=>{const owned=i.attack<=WEAPONS.find(w=>w.id===state.weaponId).attack;return `<div class="item-row"><span class="item-symbol">⚔</span><div class="item-info"><b>${i.name}</b><small>${i.description}</small></div><button data-weapon="${i.id}" ${locked||owned||state.gold<i.price?'disabled':''}>${owned?'入手済み':money(i.price)+' G'}</button></div>`;}).join('');
    html+='</div><p class="workspace-note">宿で休むとHPと満腹度が回復します。日は進みません。資金が20G未満なら救護所で一部回復できます。</p>';
  } else if(tab==='estate'){
    html=lock+`<div class="workspace-header"><div><h3>あなたの土地と建物</h3><p>${state.plots.length} / 12区画 · 翌日の家賃 ${rentTotal(state)} G</p></div><button data-action="buyLand" ${locked||state.gold<landCost(state)||state.plots.length>=12?'disabled':''}>土地を買う ${money(landCost(state))}G</button></div><div class="estate-grid">`;
    html+=state.plots.map((p,index)=>{const b=BUILDINGS.find(v=>v.id===p.building);return `<div class="plot"><h4>${b?'⌂':'▧'} 第${index+1}区画 · ${b?b.name:'空き地'}</h4><p>${b?`建物 Lv.${p.level} · 家賃 ${b.rent*p.level} G / 日`:'ここに商いの種をまこう。'}</p>${b?`<button data-upgrade="${index}" ${locked||p.level>=3||state.gold<upgradeCost(state,index)?'disabled':''}>${p.level>=3?'増築済み':`増築 ${upgradeCost(state,index)} G`}</button>`:BUILDINGS.map(v=>`<button data-build="${v.id}" data-index="${index}" ${locked||state.gold<v.cost?'disabled':''}>${v.name} ${v.cost}G</button>`).join('')}</div>`;}).join('');
    html+='</div><p class="workspace-note">貸家は24G、工房は48Gから。増築で最大3倍に。12ターン以上探索して帰還すると1日分の家賃が入ります。</p>';
  } else {
    html=lock+'<div class="workspace-header"><div><h3>灯都の株式市場</h3><p>架空企業に投資。価格は探索帰還後の翌日に変動。</p></div><span class="coin">G</span></div>';
    html+=STOCKS.map(i=>{const h=state.priceHistory[i.id],min=Math.min(...h)*.9,max=Math.max(...h)*1.1;const points=h.length<2?`0,18 80,18`:h.map((v,n)=>`${n/(h.length-1)*80},${32-(v-min)/(max-min)*28}`).join(' ');return `<div class="stock"><div><b>${i.name} <small>${i.ticker} · 保有 ${state.stocks[i.id]} 株</small></b><span class="stock-price">${state.prices[i.id]} <small style="display:inline">G / 株</small></span></div><svg viewBox="0 0 80 36" aria-label="株価の推移"><polyline points="${points}" fill="none" stroke="#a9c9a1" stroke-width="2"/></svg><div class="stock-actions"><button data-stock-buy="${i.id}" ${locked||state.gold<state.prices[i.id]?'disabled':''}>1株買う</button><button data-stock-sell="${i.id}" ${locked||!state.stocks[i.id]?'disabled':''}>1株売る</button></div></div>`;}).join('');
    html+='<p class="workspace-note">1銘柄につき5株ごとに、翌日1Gの配当。価格は上下します。ゲーム内通貨のみを使用します。</p>';
  }
  $('workspaceContent').innerHTML=html;
}
function returnHome(){if(state.mode!=='dungeon')return;const free=state.map.tiles[state.player.y][state.player.x]===3; if(free)dispatch({type:'return'});else if(!count('recall'))toast('帰灯石がありません。青い帰還門へ戻りましょう。');else confirm('帰灯石を使って帰還？','帰灯石を1つ使い、拾った品を持って街へ戻ります。',()=>dispatch({type:'return'}));}
function inspectFloor(){if(state.mode==='town'){dispatch({type:'enter'});return;} const tile=state.map.tiles[state.player.y][state.player.x];if(tile===2)dispatch({type:'stairs'});else if(tile===3)returnHome();else toast('階段か青い帰還門の上で使えます。敵には移動で攻撃できます。');}

document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.tab){tab=b.dataset.tab;renderWorkspace();sound.play('ui');return;}
  if(b.dataset.close){$(b.dataset.close).close();return;}
  if(b.dataset.move){if(e.detail===0){const [dx,dy]=b.dataset.move.split(',').map(Number);dispatch({type:'move',dx,dy});}return;}
  if(b.dataset.action){dispatch({type:b.dataset.action});return;}
  if(b.dataset.use){if(b.dataset.use==='recall')returnHome();else dispatch({type:'use',id:b.dataset.use});return;}
  if(b.dataset.sell){const i=ITEMS.find(i=>i.id===b.dataset.sell);const action={type:'sell',id:i.id,qty:Number(b.dataset.qty)};if(i.kind==='consumable')confirm('道具を売却しますか？',`${i.name} ${action.qty}個を売却します。冒険で使う分が不要か確認してください。`,()=>dispatch(action));else dispatch(action);return;}
  if(b.hasAttribute('data-sell-all')){const loot=state.inventory.filter(i=>ITEMS.find(s=>s.id===i.id).kind==='loot');if(!loot.length){toast('売却できる素材はまだありません。');return;}const value=loot.reduce((s,i)=>s+ITEMS.find(v=>v.id===i.id).sell*i.qty,0);for(const i of loot){const r=act(state,{type:'sell',id:i.id,qty:i.qty});if(r.ok)state=r.state;}save();render();sound.play('sale');toast(`素材をまとめて売却し、${money(value)} G を受け取りました。`);return;}
  if(b.dataset.buy)dispatch({type:'buyItem',id:b.dataset.buy,qty:1});
  if(b.dataset.weapon)dispatch({type:'buyWeapon',id:b.dataset.weapon});
  if(b.dataset.stockBuy)dispatch({type:'buyStock',id:b.dataset.stockBuy,qty:1});
  if(b.dataset.stockSell)dispatch({type:'sellStock',id:b.dataset.stockSell,qty:1});
  if(b.dataset.build)dispatch({type:'build',id:b.dataset.build,index:Number(b.dataset.index)});
  if(b.dataset.upgrade!==undefined)dispatch({type:'upgrade',index:Number(b.dataset.upgrade)});
});
$('primaryAction').addEventListener('click',inspectFloor);$('potionButton').addEventListener('click',()=>dispatch({type:'use',id:'potion'}));$('foodButton').addEventListener('click',()=>dispatch({type:'use',id:'ration'}));$('returnButton').addEventListener('click',returnHome);
for(const id of ['helpButton','tipsButton'])$(id).addEventListener('click',()=>$('helpDialog').showModal());
$('startButton').addEventListener('click',()=>{const localTime=savedAt;sessionStarted=true;sound.start(state.mode).then(ok=>{updateSound();if(!ok&&!muted)toast('音声を開始できませんでした。「♪ 音」から再生をお試しください。');});$('welcomeDialog').close();save();draw();void connectCloud(localTime);});
$('startNewButton').addEventListener('click',()=>confirm('初めから冒険しますか？','新しい冒険を始めます。以前のオンライン記録は引き継ぎコードで読み込めます。必要なら先に保存画面でコードを控えてください。',restartGame));
$('startupRestore').addEventListener('click',()=>{$('restoreDialog').showModal();});
$('welcomeDialog').addEventListener('cancel',e=>e.preventDefault());
$('welcomeDialog').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();}});
$('welcomeDialog').addEventListener('close',()=>{if(!sessionStarted)requestAnimationFrame(()=>{if(!sessionStarted&&!$('welcomeDialog').open)$('welcomeDialog').showModal();});});
$('soundButton').addEventListener('click',()=>{if(sessionStarted&&!muted)sound.resume().then(updateSound);updateSound();$('soundDialog').showModal();});
$('stageSoundButton').addEventListener('click',()=>{if(sessionStarted&&!muted)sound.resume().then(updateSound);updateSound();$('soundDialog').showModal();});
$('muteAudio').addEventListener('change',e=>{muted=e.target.checked;sound.setMuted(muted);if(sessionStarted&&!muted)sound.resume().then(updateSound);storeSound();});
$('audioVolume').addEventListener('input',e=>{volume=Number(e.target.value)/100;sound.setVolume(volume);storeSound();});
function updateZoom(){const active=state.mode==='dungeon';$('zoomLabel').textContent=active?`${zoom}×`:'全景';$('zoomOut').disabled=!active||zoom===2;$('zoomIn').disabled=!active||zoom===4;}
function setZoom(value){zoom=Math.max(2,Math.min(4,value));updateZoom();draw();}
$('zoomOut').addEventListener('click',()=>setZoom(zoom-1));$('zoomIn').addEventListener('click',()=>setZoom(zoom+1));
function setFocus(value){document.body.classList.toggle('focus-mode',value);$('focusButton').textContent=value?'✕ 戻す':'⛶ 拡大';$('focusButton').setAttribute('aria-label',value?'拡大表示を閉じる':'ゲーム画面を拡大表示');$('focusButton').setAttribute('aria-pressed',String(value));requestAnimationFrame(()=>draw());}
$('focusButton').addEventListener('click',()=>setFocus(!document.body.classList.contains('focus-mode')));
$('saveButton').addEventListener('click',()=>{$('saveDetails').textContent=savedAt?`最終保存：${new Date(savedAt).toLocaleString('ja-JP')}`:'まだ保存されていません。';$('saveDialog').showModal();});
$('manualSave').addEventListener('click',()=>{save(true);$('saveDetails').textContent=savedAt?`最終保存：${new Date(savedAt).toLocaleString('ja-JP')}`:'バックアップをご利用ください。';});
$('manualSave').addEventListener('click',()=>{void syncCloud();});
$('cloudReconnect').addEventListener('click',()=>{void syncCloud();});
async function syncCloud(){if(cloudConflict){toast('別端末の新しい記録があります。「コードで読み込む」から確認してください。');return;}if(!cloudReady)await connectCloud();if(cloudReady){cloud.queue(state);await cloud.flush();}$('cloudCode').value=cloud.getCode();}
$('copyCloudCode').addEventListener('click',async()=>{const code=cloud.getCode();if(!code){toast('ゲームを開始して保存先へ接続してください。');return;}try{await navigator.clipboard.writeText(code);toast('引き継ぎコードをコピーしました。');}catch{$('cloudCode').focus();$('cloudCode').select();toast('表示されたコードをコピーして保管してください。');}});
$('openRestore').addEventListener('click',()=>{held.clear();$('restoreCode').value=cloud.getCode();$('restoreDialog').showModal();});
$('restoreCloudButton').addEventListener('click',()=>{const code=$('restoreCode').value.trim();if(!code){$('restoreStatus').textContent='引き継ぎコードを入力してください。';return;}confirm('このコードの旅を読み込みますか？','現在の端末内の進行を、このコードの記録に置き換えます。現在の記録を残す場合は先にバックアップを書き出してください。',async()=>{const generation=++cloudGeneration,before=state;cloudReady=false;cloudConflict=false;$('restoreStatus').textContent='記録を確認しています…';$('restoreCloudButton').disabled=true;try{const result=await cloud.load(code);if(generation!==cloudGeneration||state!==before)throw new Error('進行が変わったため読み込みを中止しました。');const validated=validateSave(result.state);try{localStorage.removeItem('tk777-lantern-new-cloud-slot');}catch{}cloudReady=!result.fromBackup;newCloudSlot=false;fresh=false;applyCloudState(validated);$('restoreDialog').close();if($('saveDialog').open)$('saveDialog').close();if(!sessionStarted)showStartContents();toast(result.fromBackup?'GitHubのバックアップから記録を読み込みました。':'オンラインの記録を読み込みました。');}catch(error){if(generation===cloudGeneration){cloudConflict=true;$('restoreStatus').textContent=error.message||'読み込めませんでした。';}}finally{$('restoreCloudButton').disabled=false;}});});
$('exportSave').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({game:'lantern-ledger',version:1,savedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`lantern-ledger-day${state.day}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);toast('バックアップファイルを書き出しました。');});
$('importSave').addEventListener('change',async e=>{const file=e.target.files?.[0];e.target.value='';if(!file)return;try{if(file.size>500000)throw new Error();const data=JSON.parse(await file.text());if(data.game&&data.game!=='lantern-ledger')throw new Error();const imported=validateSave(data.state??data);confirm('この記録を読み込みますか？',`${imported.day}日目・レベル${imported.level}・${money(imported.gold)}G の記録に置き換えます。現在の進行を残すには、先に書き出してください。`,()=>{state=imported;motion=null;effects=[];sound.setScene(state.mode);persistAllowed=true;save();render();$('saveDialog').close();toast('旅の記録を読み込みました。');});}catch{toast('このファイルは読み込めません。有効なバックアップを選んでください。現在の記録は変更していません。');}});
$('newGameButton').addEventListener('click',()=>confirm('初めから冒険しますか？','新しい冒険を別のコードで保存します。以前の記録を残したい場合は、引き継ぎコードを先に控えてください。',restartGame));
$('confirmCancel').addEventListener('click',()=>{$('confirmDialog').close();confirmTask=null;});$('confirmOk').addEventListener('click',()=>{const task=confirmTask;confirmTask=null;$('confirmDialog').close();task?.();});$('confirmDialog').addEventListener('cancel',()=>confirmTask=null);
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey){held.clear();return;}
  const key=e.key.length===1?e.key.toLowerCase():e.key;
  if(key==='Escape'&&document.body.classList.contains('focus-mode')){e.preventDefault();setFocus(false);return;}
  if(key==='?'){e.preventDefault();$('helpDialog').showModal();return;}
  if(state.mode!=='dungeon')return;
  if(isMovementKey(e.code)){e.preventDefault();held.keyDown(e.code);return;}
  if(e.target.closest('button,a')&&(key==='Enter'||key===' '))return;
  if([' ','.','e','Enter','h','f','r'].includes(key)){e.preventDefault();if(e.repeat)return;if(key===' '||key==='.')dispatch({type:'wait'});if(key==='e'||key==='Enter')inspectFloor();if(key==='h')dispatch({type:'use',id:'potion'});if(key==='f')dispatch({type:'use',id:'ration'});if(key==='r')returnHome();}
});
document.addEventListener('keyup',e=>held.keyUp(e.code));
for(const button of document.querySelectorAll('[data-move]')){button.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();const[dx,dy]=button.dataset.move.split(',').map(Number);button.setPointerCapture(e.pointerId);held.pointerDown(e.pointerId,dx,dy);});for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,e=>held.pointerUp(e.pointerId));button.addEventListener('contextmenu',e=>e.preventDefault());}
new MutationObserver(()=>{if(document.querySelector('dialog[open]'))held.clear();}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
let pointer=null;
$('world').addEventListener('pointerdown',e=>{if(state.mode!=='dungeon'||(e.pointerType==='mouse'&&e.button!==0))return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};$('world').setPointerCapture(e.pointerId);});
$('world').addEventListener('pointerup',e=>{if(!pointer||pointer.id!==e.pointerId)return;let dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;if(state.mode!=='dungeon')return;if(Math.hypot(dx,dy)<15){const rect=$('world').getBoundingClientRect();const center=frameInfo?.playerScreen??{x:rect.width/2,y:rect.height/2};dx=e.clientX-rect.left-center.x;dy=e.clientY-rect.top-center.y;if(Math.hypot(dx,dy)<12){toast('方向をタップ・スワイプすると移動します。');return;}}dispatch({type:'move',dx:Math.abs(dx)>Math.abs(dy)?Math.sign(dx):0,dy:Math.abs(dx)>Math.abs(dy)?0:Math.sign(dy)});});
for(const event of ['pointercancel','lostpointercapture'])$('world').addEventListener(event,()=>pointer=null);
window.addEventListener('blur',()=>{pointer=null;held.clear();});document.addEventListener('visibilitychange',()=>{pointer=null;held.clear();if(document.hidden){if(sessionStarted){save();if(cloudReady)void cloud.flush();}sound.pause();}else if(sessionStarted)sound.resume().then(updateSound);});
window.addEventListener('pagehide',()=>{held.clear();sound.pause();});window.addEventListener('pageshow',()=>{held.clear();if(sessionStarted&&!document.hidden)sound.resume().then(updateSound);});
new ResizeObserver(()=>draw()).observe($('canvasWrap'));
function animate(time){const active=motion&&time-motion.startedAt<motion.duration;const interval=reduced?100:active?16:33;if(!document.hidden&&time-lastFrame>interval){effects=effects.filter(e=>time-e.startedAt<e.duration);draw(time);lastFrame=time;}requestAnimationFrame(animate);}
function showStartContents(){const heading=$('welcomeDialog').querySelector('h2');heading.innerHTML=fresh?'灯りをともして、<br>大きな冒険へ。':`第${state.day}日の旅を、<br>ここからもう一度。`;$('startButton').textContent=fresh?'ゲーム開始 →':'つづきから →';let note=$('welcomeDialog').querySelector('.start-audio-note');if(!note){note=document.createElement('p');note.className='start-audio-note';$('startButton').before(note);}note.textContent=muted?'音はミュート中です。開始後「♪ OFF」で切り替えられます。':'開始ボタンを押すとBGMと効果音が流れます。音量は「♪ 音」で調整できます。';}
function showStart(){showStartContents();held.clear();$('welcomeDialog').showModal();}
render();updateSound();setZoom(3);requestAnimationFrame(animate);showStart();
if(loadError){$('saveStatus').textContent='記録の確認が必要';$('saveStatus').classList.add('failed');toast(loadError);}
