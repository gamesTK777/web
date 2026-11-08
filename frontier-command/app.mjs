import {createGame,applyAction,getReachable,getAttackTargets,getProduction,planAIAction,serializeGame,deserializeGame,getIncome,defenseAt,canCapture,UNIT_TYPES,TERRAIN,MISSIONS} from './engine.mjs?v=20261108-frontier';
import {renderBoard,cellFromPointer} from './renderer.mjs?v=20261108-frontier';
import {CommandAudio} from './audio.mjs?v=20261108-frontier';

const $=id=>document.getElementById(id),canvas=$('boardCanvas'),audio=new CommandAudio();
const KEYS={auto:'tk777.frontier.autosave.v1',manual:'tk777.frontier.manual.v1',progress:'tk777.frontier.progress.v1',sound:'tk777.frontier.sound.v1'};
const clone=value=>JSON.parse(JSON.stringify(value));
const storage={get(key){try{return localStorage.getItem(key);}catch{return null;}},set(key,value){try{localStorage.setItem(key,value);return true;}catch{return false;}}};
const missionItems=Array.isArray(MISSIONS)?MISSIONS:Object.values(MISSIONS);
const unitName=type=>UNIT_TYPES[type]?.name||type;
const teamName=team=>team===0?'コーラル隊':'タイド隊';
const terrainName=type=>TERRAIN[type]?.name||({plain:'草原',grass:'草原',road:'道路',forest:'森',mountain:'山地',river:'川',bridge:'橋',sea:'海'}[type]||type);
const buildingName=type=>({city:'都市',factory:'工場',hq:'本部',airfield:'飛行場'}[type]||'');
const money=value=>Number(value||0).toLocaleString('ja-JP');
let game=createGame({missionId:missionItems[0].id,difficulty:'normal'}),started=false,phase='setup';
let selectedId=null,targetId=null,cursor={x:0,y:0},moveUndo=null,zoom=1,effect=null,aiTimer=null,aiEpoch=0,aiActions=0,lastDraw=0,viewMoves=[],viewTargets=[];
let soundOn=storage.get(KEYS.sound)!=='off',progress=[];
try{const value=JSON.parse(storage.get(KEYS.progress)||'[]');if(Array.isArray(value))progress=value.filter(x=>missionItems.some(m=>m.id===x));}catch{}
audio.setEnabled(false);

function el(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
function button(text,fn,className=''){const node=el('button',text,className);node.type='button';node.addEventListener('click',fn);return node;}
function unitAt(x,y){return game.units.find(u=>u.x===x&&u.y===y);}
function tileAt(x,y){return game.tiles[y*game.width+x];}
function selected(){return game.units.find(u=>u.id===selectedId);}
function missionFor(id){return missionItems.find(m=>String(m.id)===String(id))||missionItems[0];}
function isPaused(){return !!document.querySelector('dialog[open]');}
function canAct(){return started&&phase==='playing'&&game.turn===0&&!isPaused();}
function status(text){$('statusText').textContent=text;}
function saveAuto(){if(started&&!storage.set(KEYS.auto,serializeGame(game)))status('このブラウザーでは保存できません。ストレージの空き容量や設定を確認してください。');}
function stopAI(){aiEpoch++;clearTimeout(aiTimer);aiTimer=null;}
function refreshSound(){audio.setEnabled(soundOn&&started&&phase==='playing'&&!document.hidden&&!isPaused());if(audio.enabled)audio.start();$('soundButton').textContent=soundOn?'♪ 音 ON':'♪ 音 OFF';$('soundButton').setAttribute('aria-pressed',String(soundOn));}

const confirmDialog=el('dialog',undefined,'command-dialog confirm-dialog');
const confirmHeading=el('h2'),confirmText=el('p'),confirmActions=el('div',undefined,'dialog-actions');
confirmDialog.append(confirmHeading,confirmText,confirmActions);document.body.append(confirmDialog);
function confirmAction(title,text,action){
  stopAI();confirmHeading.textContent=title;confirmText.textContent=text;
  const cancel=button('戻る',()=>confirmDialog.close(),'secondary');
  const accept=button('実行する',()=>{confirmDialog.close();action();},'primary');
  confirmActions.replaceChildren(cancel,accept);confirmDialog.showModal();refreshSound();
}
confirmDialog.addEventListener('close',()=>{refreshSound();queueAI();});

function income(team){return getIncome(game,team);}
function updateMissionBrief(){
  const m=missionFor($('missionSelect').value);$('missionBrief').textContent=m.description||m.briefing||m.brief||m.objective||m.name;
  if(!started){game=createGame({missionId:m.id,difficulty:$('difficultySelect').value});selectedId=null;cursor={x:0,y:0};render();}
}
function renderMissions(){
  const list=$('missionList');list.replaceChildren(...missionItems.map((m,i)=>{
    const node=button(`${progress.includes(m.id)?'✓ ':''}${String(i+1).padStart(2,'0')} ${m.name}`,()=>openSetup(m.id),'mission-card');
    node.classList.toggle('current',game.missionId===m.id);return node;
  }));
}
function setupContinue(){const b=$('continueButton');if(b)b.hidden=!storage.get(KEYS.auto);}
function openSetup(id){stopAI();if(id!==undefined)$('missionSelect').value=id;setupContinue();updateMissionBrief();if(!$('newGameDialog').open)$('newGameDialog').showModal();$('closeSetupButton').hidden=!started;refreshSound();}
function enterGame(next){
  stopAI();for(const d of document.querySelectorAll('dialog[open]'))d.close();
  game=next;started=true;phase=game.winner===null?'playing':'ended';selectedId=null;targetId=null;moveUndo=null;effect=null;aiActions=0;
  const first=game.units.find(u=>u.team===0);cursor=first?{x:first.x,y:first.y}:{x:0,y:0};
  $('missionSelect').value=game.missionId;$('difficultySelect').value=game.difficulty||'normal';
  renderMissions();render();saveAuto();refreshSound();canvas.focus({preventScroll:true});
  if(game.winner!==null)showResult();else {status('味方を選び、光るマスへ移動させましょう。空いている自軍工場からは生産できます。');queueAI();}
}
function startSelected(){
  const run=()=>enterGame(createGame({missionId:$('missionSelect').value,difficulty:$('difficultySelect').value}));
  audio.unlock();if(started&&phase==='playing')confirmAction('新しい作戦を開始しますか？','進行中の作戦は新しい作戦に置き換わります。必要なら先に手動保存してください。',run);else run();
}
function loadSaved(kind='manual'){
  const raw=storage.get(kind==='auto'?KEYS.auto:KEYS.manual);
  if(!raw){status(kind==='auto'?'途中の作戦はありません。':'手動セーブがありません。「保存」を押すとここから再開できます。');return;}
  let loaded;try{loaded=deserializeGame(raw);if(!loaded||!Array.isArray(loaded.units))throw Error('Invalid save');}catch{const message='セーブデータを読み込めませんでした。新しい作戦を選ぶか、現在の作戦を続けてください。';status(message);if($('newGameDialog').open)$('missionBrief').textContent=message;return;}
  audio.unlock();if(started&&phase==='playing')confirmAction('保存した作戦を読み込みますか？','現在の作戦を保存データに置き換えます。',()=>enterGame(loaded));else enterGame(loaded);
}

function selectCell(x,y){
  cursor={x,y};if(!started){status('「作戦開始」から対戦を始めましょう。');return;}
  const current=selected(),clicked=unitAt(x,y);
  if(canAct()&&current?.team===0&&!current.acted){
    if(clicked?.team===1&&getAttackTargets(game,current.id).some(t=>t.id===clicked.id)){targetId=clicked.id;render();status('ダメージ予測を確認し、「攻撃する」で確定してください。');return;}
    if(!clicked&&getReachable(game,current.id).some(p=>p.x===x&&p.y===y&&(p.x!==current.x||p.y!==current.y))){perform({type:'move',unitId:current.id,x,y});return;}
  }
  selectedId=clicked?.id??null;targetId=null;audio.sfx('select');render();
  if(clicked?.team===0)status(clicked.acted?'この部隊は行動済みです。別の部隊を選んでください。':'光るマスへ移動。敵を選ぶと攻撃の予測が見られます。');
}
function eventText(action,before,after){
  const u=before.units.find(x=>x.id===action.unitId),name=u?unitName(u.type):'';
  if(action.type==='move')return `${name}が移動。攻撃・占領・待機を選べます。`;
  if(action.type==='attack'){
    const old=before.units.find(x=>x.id===action.targetId),now=after.units.find(x=>x.id===action.targetId);
    return `${name}が${old?unitName(old.type):'敵部隊'}を攻撃。${now?`残りHP ${now.hp}`:'敵部隊を撃破！'}`;
  }
  if(action.type==='capture'){const t=after.tiles[u.y*after.width+u.x];return t.owner===u.team?`${buildingName(t.building)}を占領しました！`:`${buildingName(t.building)}を占領中。残り ${t.capture}。次の自分の番にも占領しましょう。`;}
  if(action.type==='produce')return `${unitName(action.unitType)}を生産しました。次の自分の番から行動できます。`;
  if(action.type==='endTurn')return after.turn===0?'あなたの番です。収入と拠点での補修を確認しましょう。':'タイド隊が行動しています…';
  return `${name}が待機しました。`;
}
function perform(action,{ai=false}={}){
  if(!ai&&!canAct())return;
  const before=game,result=applyAction(game,action);
  if(!result.ok){status(result.error||'その行動はできません。');audio.sfx('error');return false;}
  moveUndo=action.type==='move'&&!ai?clone(before):null;game=result.state;
  const moved=game.units.find(u=>u.id===action.unitId),old=before.units.find(u=>u.id===action.unitId),enemy=before.units.find(u=>u.id===action.targetId);
  const p=enemy||moved||{x:action.x,y:action.y};
  effect={type:action.type,unitId:action.unitId,x:p.x,y:p.y,fromX:old?.x,fromY:old?.y,team:before.turn,startedAt:performance.now()};
  if(action.type==='endTurn'){selectedId=null;targetId=null;aiActions=0;}
  else {selectedId=!ai?moved?.id??null:null;targetId=null;}
  audio.sfx(action.type==='endTurn'?'turn':action.type);render();status(eventText(action,before,game));saveAuto();
  if(game.winner!==null){phase='ended';stopAI();showResult();}else queueAI();
  return true;
}
function queueAI(){
  clearTimeout(aiTimer);aiTimer=null;
  if(!started||phase!=='playing'||game.turn!==1||isPaused()||document.hidden)return;
  const epoch=aiEpoch;aiTimer=setTimeout(()=>{
    if(epoch!==aiEpoch||game.turn!==1||isPaused()||phase!=='playing')return;
    let action;try{action=aiActions++>120?{type:'endTurn'}:planAIAction(game,game.difficulty||'normal');}catch{action=null;}
    if(!action)action={type:'endTurn'};
    if(!perform(action,{ai:true}))perform({type:'endTurn'},{ai:true});
  },300);
}

function showResult(){
  phase='ended';audio.pause();audio.enabled=soundOn;audio.sfx(game.winner===0?'victory':'defeat');
  const won=game.winner===0,m=missionFor(game.missionId),index=missionItems.findIndex(x=>x.id===m.id);
  if(won&&!progress.includes(m.id)){progress.push(m.id);storage.set(KEYS.progress,JSON.stringify(progress));renderMissions();}
  $('resultTitle').textContent=won?'作戦成功！':'作戦終了';
  $('resultSummary').textContent=`${m.name} / ${game.day}日目。${won?'地形と部隊を使いこなし、勝利しました。':'補給拠点と部隊の相性を見直して、もう一度挑戦しましょう。'}`;
  $('nextMissionButton').hidden=!won||index>=missionItems.length-1;
  if(won&&progress.length===missionItems.length)$('resultSummary').textContent+=' 全5作戦を制覇しました！';
  $('resultDialog').showModal();render();
}

function renderSelection(){
  const u=selected(),t=u?tileAt(u.x,u.y):tileAt(cursor.x,cursor.y),body=$('selectionBody'),actions=$('actionPanel');body.replaceChildren();actions.replaceChildren();
  $('selectionTitle').textContent=u?unitName(u.type):buildingName(t?.building)||terrainName(t?.terrain);
  $('selectionMeta').textContent=u?`${teamName(u.team)} · HP ${u.hp}/10 · ${u.acted?'行動済み':u.moved?'移動済み':'未行動'}`:`${cursor.x+1}, ${cursor.y+1} · ${t?.owner===null?'中立':teamName(t?.owner)}`;
  if(!t)return;
  body.append(el('p',`${terrainName(t.terrain)}${t.building?' / '+buildingName(t.building):''}：${t.building?'占領して収入を増やせます。':'地形と射程を生かして進軍しましょう。'}`));
  if(u){
    const type=UNIT_TYPES[u.type]||{};
    body.append(el('p',type.description||type.desc||`移動力 ${type.move??'—'} / 生産費 ${money(type.cost)} G`));
    body.append(el('p',`移動 ${type.move} / 射程 ${type.range?.join('〜')} / 地形防御 +${Math.round(defenseAt(game,u.x,u.y,u.type)*100)}%`,'unit-specs'));
    if(canAct()&&u.team===0&&!u.acted){
      const targets=getAttackTargets(game,u.id);
      if(targetId){const target=targets.find(x=>x.id===targetId),enemy=game.units.find(x=>x.id===targetId);if(target&&enemy){body.append(el('p',`攻撃予測：${unitName(enemy.type)}へ ${target.damage} ダメージ / 反撃 ${target.counter||0}`,'damage-preview'));actions.append(button('攻撃する',()=>perform({type:'attack',unitId:u.id,targetId:enemy.id}),'primary attack-button'));}}
      if(!targetId&&targets.length)body.append(el('p',`攻撃可能な敵 ${targets.length}部隊。敵をタップしてダメージを確認。`,'hint'));
      if(canCapture(game,u.id))actions.append(button(`占領する（残り ${t.capture??20}）`,()=>perform({type:'capture',unitId:u.id}),'primary'));
      actions.append(button('ここで待機',()=>perform({type:'wait',unitId:u.id}),'secondary'));
    }
  } else if(canAct()&&t.owner===0&&['factory','airfield'].includes(t.building)){
    const production=getProduction(game,cursor.x,cursor.y);
    const options=Array.isArray(production)?production:production?.options||[];
    for(const option of options){const id=typeof option==='string'?option:option.type||option.unitType||option.id,definition=UNIT_TYPES[id];if(!definition)continue;
      const b=button(`${definition.name}  ${money(definition.cost)} G`,()=>perform({type:'produce',x:cursor.x,y:cursor.y,unitType:id}),'production-button');b.disabled=game.funds[0]<definition.cost||option.available===false||option.affordable===false;actions.append(b);}
    if(!options.length)body.append(el('p','この拠点では現在、生産できる部隊がありません。'));
  } else if(!u){
    const units=game.units.filter(x=>x.team===0&&!x.acted);
    if(units.length){body.append(el('p','未行動の味方','small-label'));const list=el('div',undefined,'unit-shortcuts');for(const friendly of units)list.append(button(`${unitName(friendly.type)} ${friendly.hp}`,()=>{selectedId=friendly.id;targetId=null;cursor={x:friendly.x,y:friendly.y};render();canvas.focus({preventScroll:true});},'unit-shortcut'));body.append(list);}
  }
}
function render(){
  const m=missionFor(game.missionId);$('missionLabel').textContent=m.name;$('dayLabel').textContent=`DAY ${String(game.day).padStart(2,'0')}`;
  $('turnLabel').textContent=game.turn===0?'あなたの番':'CPUの番';$('turnLabel').dataset.team=game.turn;
  $('fundsLabel').textContent=`${money(game.funds[0])} G`;$('incomeLabel').textContent=`+${money(income(0))} G / 日`;
  $('objectiveText').textContent=m.objective||'敵本部を占領、または敵部隊と生産拠点を制圧';
  $('endTurnButton').disabled=!canAct();$('undoButton').disabled=!canAct()||!moveUndo;
  $('saveButton').disabled=!started;$('loadButton').disabled=!storage.get(KEYS.manual);$('restartButton').disabled=!started;
  $('eventLog').replaceChildren(...(game.log||[]).slice(-7).reverse().map(item=>el('li',typeof item==='string'?item:item.text||item.message||item.type||'部隊が行動しました。')));
  canvas.setAttribute('aria-label',`${m.name}。${game.width}×${game.height}マス。カーソル ${cursor.x+1},${cursor.y+1}。矢印で選びEnterで決定。`);
  document.body.dataset.turn=game.turn;const u=selected(),show=started&&phase==='playing'&&game.turn===0&&u?.team===0&&!u.acted;viewMoves=show?getReachable(game,u.id):[];viewTargets=show?getAttackTargets(game,u.id):[];renderSelection();draw(performance.now());
}
function draw(time){
  renderBoard(canvas,game,{selectedId,moves:viewMoves,targets:viewTargets,cursor,time,effect:effect&&time-effect.startedAt<650?effect:null});
}
function animate(time){if(!document.hidden&&time-lastDraw>45){lastDraw=time;draw(time);}requestAnimationFrame(animate);}

$('missionSelect').replaceChildren(...missionItems.map((m,i)=>{const node=el('option',`${String(i+1).padStart(2,'0')} · ${m.name}`);node.value=m.id;return node;}));
$('missionBrief').setAttribute('aria-live','polite');
$('missionSelect').addEventListener('change',updateMissionBrief);
$('startButton').addEventListener('click',startSelected);
$('continueButton')?.addEventListener('click',()=>loadSaved('auto'));
$('menuButton').addEventListener('click',()=>openSetup(game.missionId));
$('closeSetupButton').addEventListener('click',()=>$('newGameDialog').close());
$('newGameDialog').addEventListener('cancel',e=>{if(!started)e.preventDefault();});
$('newGameDialog').addEventListener('close',()=>{refreshSound();render();queueAI();});
$('helpButton').addEventListener('click',()=>{stopAI();$('helpDialog').showModal();refreshSound();});
$('closeHelpButton').addEventListener('click',()=>$('helpDialog').close());
$('helpDialog').addEventListener('close',()=>{refreshSound();render();queueAI();});
$('soundButton').addEventListener('click',()=>{soundOn=!soundOn;storage.set(KEYS.sound,soundOn?'on':'off');refreshSound();});
$('saveButton').addEventListener('click',()=>{if(storage.set(KEYS.manual,serializeGame(game))){status('この端末に手動保存しました。「読込」で再開できます。');audio.sfx('save');render();}else status('保存できませんでした。ブラウザーのストレージ設定を確認してください。');});
$('loadButton').addEventListener('click',()=>loadSaved('manual'));
$('restartButton').addEventListener('click',()=>confirmAction('この作戦を最初からやり直しますか？','部隊と資金を作戦開始時の状態へ戻します。',()=>enterGame(createGame({missionId:game.missionId,difficulty:game.difficulty||'normal'}))));
$('undoButton').addEventListener('click',()=>{if(moveUndo&&canAct()){game=moveUndo;moveUndo=null;targetId=null;effect=null;render();saveAuto();status('直前の移動を取り消しました。');}});
$('endTurnButton').addEventListener('click',()=>{if(!canAct())return;const count=game.units.filter(u=>u.team===0&&!u.acted).length;if(count)confirmAction('ターンを終了しますか？',`未行動の部隊が${count}部隊あります。終了するとCPUの番になります。`,()=>perform({type:'endTurn'}));else perform({type:'endTurn'});});
$('retryButton').addEventListener('click',()=>enterGame(createGame({missionId:game.missionId,difficulty:game.difficulty||'normal'})));
$('nextMissionButton').addEventListener('click',()=>{const i=missionItems.findIndex(m=>m.id===game.missionId);if(missionItems[i+1])enterGame(createGame({missionId:missionItems[i+1].id,difficulty:game.difficulty||'normal'}));});
$('resultMenuButton').addEventListener('click',()=>{$('resultDialog').close();openSetup(game.missionId);});
$('resultDialog').addEventListener('close',refreshSound);
function changeZoom(value){zoom=Math.max(1,Math.min(2.5,value));canvas.style.width=`${zoom*100}%`;$('zoomLabel').textContent=`${Math.round(zoom*100)}%`;$('zoomOutButton').disabled=zoom<=1;$('zoomInButton').disabled=zoom>=2.5;}
$('zoomInButton').addEventListener('click',()=>changeZoom(zoom+.25));$('zoomOutButton').addEventListener('click',()=>changeZoom(zoom-.25));
canvas.addEventListener('click',event=>{const cell=cellFromPointer(canvas,event,game);if(cell)selectCell(cell.x,cell.y);});
canvas.addEventListener('keydown',event=>{
  if(isPaused())return;const key=event.key.toLowerCase(),directions={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1]};
  if(directions[key]){event.preventDefault();const [dx,dy]=directions[key];cursor={x:Math.max(0,Math.min(game.width-1,cursor.x+dx)),y:Math.max(0,Math.min(game.height-1,cursor.y+dy))};render();}
  else if(key==='enter'||key===' '){event.preventDefault();if(!event.repeat)selectCell(cursor.x,cursor.y);}
  else if(key==='escape'){selectedId=null;targetId=null;render();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAI();audio.pause();}else{refreshSound();queueAI();}});
window.addEventListener('pagehide',()=>{stopAI();audio.pause();saveAuto();});
$('bootMessage').hidden=true;changeZoom(1);renderMissions();render();setupContinue();openSetup();requestAnimationFrame(animate);
