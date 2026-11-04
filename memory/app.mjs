import {MemorySession} from './controller.mjs?v=20261104-rebuild';

const $=id=>document.getElementById(id);
const names=['いちごねこ','ベレーわんこ','フードうさぎ','いたずらラビ','プリンドッグ','おそらわんこ','ぺんぎん','ひよこ','かえるプリンス','こひつじ','ぱんだ','あざらし','きつね','こあら','ゆにこーん','はりねずみ','はむすたー','しか'];
const KEY='tk777-pair-garden-settings';
let preferences={pairs:6,playerNames:['プレイヤー1','プレイヤー2'],sound:true};
try{
  const saved=JSON.parse(localStorage.getItem(KEY)||'null');
  if(saved&&[6,10,18].includes(saved.pairs))preferences.pairs=saved.pairs;
  if(saved&&Array.isArray(saved.playerNames)&&saved.playerNames.length===2)preferences.playerNames=saved.playerNames.map((n,i)=>typeof n==='string'?n.trim().slice(0,12)||`プレイヤー${i+1}`:`プレイヤー${i+1}`);
  if(saved&&saved.sound===false)preferences.sound=false;
}catch{}
let cardNodes=new Map(),renderedGeneration=-1,columns=4,toastTimer=0,pendingResult=null,audio=null;
function persist(){try{localStorage.setItem(KEY,JSON.stringify(preferences));}catch{}}
function isOpen(dialog){return dialog.hasAttribute('open');}
function openDialog(dialog){if(isOpen(dialog))return;try{if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');}catch{dialog.setAttribute('open','');}}
function closeDialog(dialog){if(!isOpen(dialog))return;if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');}
function anyDialog(){return ['settingsDialog','restartDialog','resultDialog'].some(id=>isOpen($(id)));}
function formatTime(ms){const seconds=Math.floor(ms/1000);return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
function toast(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>{$('toast').hidden=true;},2400);}
function unlockAudio(){
  if(!preferences.sound)return;
  try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;if(!audio)audio=new Audio();if(audio.state==='suspended')audio.resume().catch(()=>{});}catch{}
}
function notes(frequencies,volume=.04){
  if(!preferences.sound||!audio||audio.state!=='running')return;
  try{frequencies.forEach((frequency,i)=>{const at=audio.currentTime+i*.085,osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+.012);gain.gain.exponentialRampToValueAtTime(.0001,at+.19);osc.connect(gain);gain.connect(audio.destination);osc.start(at);osc.stop(at+.2);});}catch{}
}
function updateSound(){const b=$('soundButton');b.textContent=preferences.sound?'♪ 音 ON':'♪ 音 OFF';b.setAttribute('aria-pressed',String(preferences.sound));b.setAttribute('aria-label',preferences.sound?'効果音をオフにする':'効果音をオンにする');}
function artFor(pairId){const i=Number(pairId),tile=i%9;return {sheet:i<9?'sanrio_sheet_1.webp':'sanrio_sheet_2.webp',position:`${(tile%3)*50}% ${Math.floor(tile/3)*50}%`};}
function makeCard(card,index,generation){
  const button=document.createElement('button');button.type='button';button.className='card';button.dataset.cardId=card.id;
  const back=document.createElement('span');back.className='card-back';back.textContent='✿';back.setAttribute('aria-hidden','true');
  const front=document.createElement('span');front.className='card-front';front.hidden=true;front.setAttribute('aria-hidden','true');
  const art=document.createElement('span');art.className='card-art';const image=artFor(card.pairId);art.style.backgroundImage=`url('${image.sheet}')`;art.style.backgroundPosition=image.position;front.append(art);
  const number=document.createElement('span');number.className='card-number';number.textContent=String(index+1);number.setAttribute('aria-hidden','true');
  const check=document.createElement('span');check.className='card-check';check.textContent='✓';check.hidden=true;check.setAttribute('aria-hidden','true');
  button.append(back,front,number,check);
  button.addEventListener('click',()=>{if(generation!==session.generation||anyDialog())return;unlockAudio();if(session.select(card.id))notes([460],.018);});
  return {button,back,front,check};
}
function render(state){
  if(renderedGeneration!==session.generation){
    renderedGeneration=session.generation;cardNodes=new Map();
    const buttons=state.cards.map((card,i)=>{const nodes=makeCard(card,i,session.generation);cardNodes.set(card.id,nodes);return nodes.button;});
    $('board').replaceChildren(...buttons);fitBoard();
  }
  state.cards.forEach((card,i)=>{
    const n=cardNodes.get(card.id),revealed=card.matched||state.selected.includes(card.id);
    n.button.classList.toggle('is-open',revealed);n.button.classList.toggle('is-matched',card.matched);
    n.button.disabled=card.matched||state.phase==='finished';
    n.button.setAttribute('aria-pressed',String(revealed));
    n.button.setAttribute('aria-label',card.matched?`${names[Number(card.pairId)]}、ペア成立`:revealed?`${names[Number(card.pairId)]}、おもて`:`カード${i+1}、うら`);
    n.back.hidden=revealed;n.front.hidden=!revealed;n.check.hidden=!card.matched;
  });
  $('board').setAttribute('aria-busy',String(state.phase==='resolving'));
  for(let i=0;i<2;i++){
    $('player'+i+'Name').textContent=state.playerNames[i];$('player'+i+'Score').textContent=String(state.scores[i]);
    const pill=document.querySelector(`.player-pill[data-player="${i}"]`);pill.classList.toggle('is-active',state.phase!=='finished'&&state.currentPlayer===i);pill.setAttribute('aria-current',state.phase!=='finished'&&state.currentPlayer===i?'true':'false');
  }
  $('progress').textContent=`${state.matchedPairs} / ${state.pairs} ペア`;$('moves').textContent=`${state.moves} 手`;$('time').textContent=formatTime(session.elapsedMs());
  $('turnStatus').textContent=state.phase==='finished'?'すべてのペアがそろいました':`${state.playerNames[state.currentPlayer]} の番`;
  $('feedback').classList.toggle('is-match',!!(state.lastResult&&state.lastResult.type==='match'));
  if(state.phase==='finished')$('feedback').textContent='できた！ もう一度あそぼう。';
  else if(state.phase==='resolving')$('feedback').textContent='2枚を見比べています…';
  else if(state.phase==='one')$('feedback').textContent='もう1枚、選んでね。';
  else if(state.lastResult)$('feedback').textContent=state.lastResult.type==='match'?'ペア発見！ 続けて選べるよ。':'おしい！ 次の人の番です。';
  else $('feedback').textContent='カードを2枚選んで、ペアを見つけよう。';
}
function showResult(state){
  if(state.phase!=='finished')return;
  if(isOpen($('settingsDialog'))||isOpen($('restartDialog'))){pendingResult=session.generation;return;}
  pendingResult=null;
  $('winnerTitle').textContent=state.winner==='draw'?'仲良く、引き分け！':`${state.playerNames[state.winner]} の勝ち！`;
  $('resultSummary').textContent=`${state.pairs}ペア完成 · ${state.moves}手 · ${formatTime(session.elapsedMs())}`;
  $('resultScores').replaceChildren(...state.playerNames.map((name,i)=>{const line=document.createElement('p');line.textContent=`${name}　${state.scores[i]} ペア`;return line;}));
  openDialog($('resultDialog'));
}
const session=new MemorySession({onChange:render,onResult:result=>{if(result.type==='match')notes([660,830,990]);else notes([330,280],.022);},onFinish:state=>{notes([660,830,990,1320]);showResult(state);}});
function start(){
  pendingResult=null;for(const id of ['settingsDialog','restartDialog','resultDialog'])closeDialog($(id));
  session.start({pairs:preferences.pairs,playerNames:preferences.playerNames});updateSound();
}
function fitBoard(){
  const area=$('playArea'),box=getComputedStyle(area);
  const w=area.clientWidth-parseFloat(box.paddingLeft)-parseFloat(box.paddingRight),h=area.clientHeight-parseFloat(box.paddingTop)-parseFloat(box.paddingBottom);if(w<=0||h<=0||!session.state)return;
  const landscape=window.innerHeight<500&&w>560&&w/h>1.6,pairs=session.state.pairs;
  columns=landscape?{6:6,10:10,18:12}[pairs]:pairs===18&&w>800?9:{6:4,10:5,18:6}[pairs];
  const rows=Math.ceil(pairs*2/columns),gap=w<400?4:8;
  const maxWidth=pairs===6?144:pairs===10?120:108;
  const width=Math.max(20,Math.floor(Math.min(maxWidth,(w-gap*(columns-1))/columns,(h-gap*(rows-1)-4)/(rows*1.25))));
  const board=$('board');board.style.setProperty('--cols',columns);board.style.setProperty('--gap',gap+'px');board.style.setProperty('--card-w',width+'px');board.style.setProperty('--card-h',Math.floor(width*1.25)+'px');
}
function viewportChanged(){const v=window.visualViewport;document.documentElement.style.setProperty('--app-height',(v&&v.height?v.height:window.innerHeight)+'px');fitBoard();}
$('settingsButton').addEventListener('click',()=>{session.flushDue();$('name0').value=preferences.playerNames[0];$('name1').value=preferences.playerNames[1];$('pairsSelect').value=String(preferences.pairs);openDialog($('settingsDialog'));});
$('closeSettings').addEventListener('click',()=>closeDialog($('settingsDialog')));
$('settingsForm').addEventListener('submit',event=>{event.preventDefault();preferences.pairs=Number($('pairsSelect').value);preferences.playerNames=[$('name0').value,$('name1').value].map((name,i)=>name.trim().slice(0,12)||`プレイヤー${i+1}`);persist();unlockAudio();start();});
$('restartButton').addEventListener('click',()=>{session.flushDue();if(session.state.phase==='finished')start();else openDialog($('restartDialog'));});
$('cancelRestart').addEventListener('click',()=>closeDialog($('restartDialog')));
$('confirmRestart').addEventListener('click',start);
$('playAgain').addEventListener('click',start);
$('closeResult').addEventListener('click',()=>closeDialog($('resultDialog')));
$('soundButton').addEventListener('click',()=>{preferences.sound=!preferences.sound;persist();updateSound();unlockAudio();if(preferences.sound)notes([660,880]);});
for(const id of ['settingsDialog','restartDialog'])$(id).addEventListener('close',()=>{if(pendingResult===session.generation&&session.state.phase==='finished')showResult(session.state);});
document.addEventListener('keydown',event=>{
  if(anyDialog()||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('input,select,textarea'))return;
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
    event.preventDefault();session.flushDue();const cards=session.state.cards,focused=document.activeElement&&document.activeElement.dataset.cardId;
    let index=cards.findIndex(card=>card.id===focused),step=event.key==='ArrowLeft'?-1:event.key==='ArrowRight'?1:event.key==='ArrowUp'?-columns:columns;
    let target=null;
    if(index<0||cards[index].matched)target=cards.find(card=>!card.matched);
    else for(let i=0;i<cards.length;i++){index=(index+step+cards.length)%cards.length;if(!cards[index].matched){target=cards[index];break;}}
    if(!target)target=cards.find(card=>!card.matched);
    if(target)cardNodes.get(target.id).button.focus({preventScroll:true});
  }else if(event.key.toLowerCase()==='r'){event.preventDefault();$('restartButton').click();}
});
function recover(){session.flushDue();viewportChanged();if(session.state&&session.state.phase==='finished'&&pendingResult===session.generation)showResult(session.state);}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)recover();});
window.addEventListener('pageshow',recover);window.addEventListener('focus',recover);window.addEventListener('resize',viewportChanged);
if(window.visualViewport)window.visualViewport.addEventListener('resize',viewportChanged);
if(window.ResizeObserver)new ResizeObserver(fitBoard).observe($('playArea'));
setInterval(()=>{if(session.state)$('time').textContent=formatTime(session.elapsedMs());},500);
start();viewportChanged();
