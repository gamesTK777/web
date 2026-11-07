import {createRound,actRound,legalActions,publicView} from './engine.mjs?v=20261107-mahjong';
import {createArcade,finishBattle,advanceArcade,retryStage} from './arcade.mjs?v=20261107-mahjong';
import {tileHTML,tileName,portraitPlaceholder} from './tiles.mjs?v=20261107-mahjong';
const $=id=>document.getElementById(id),API='https://tk777-neonshift-scores.takesuke.chatgpt.site',MODE='mahjong:arcade';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n||0).toLocaleString('ja-JP');
const titles=['はじまりの卓','風を読む卓','静かな駆け引き','月下の対局','揺るがぬ一手','頂を望む卓','最後の対戦相手'];
const colors=['#315f6b','#396c5c','#725d80','#8a625b','#526d91','#8b7452','#6f5b81'];
const defaults={version:0,stages:Array.from({length:7},(_,i)=>({id:i+1,name:`ステージ${i+1}の対戦相手`,portrait:null,rewards:[null,null,null],accent:colors[i]}))};
let config=defaults,runConfig=defaults,run=createArcade(),round=null,selected=null,riichiPicking=false,started=false,ended=false,submitted=false;
let generation=0,cpuTimer=null,startedAt=0,duration=0,sessionPromise=null,toastTimer=null,logs=[];
let audio=null;
async function api(path,payload){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
 try{const response=await fetch(API+path,{method:payload?'POST':'GET',headers:payload?{'Content-Type':'application/json'}:{},body:payload?JSON.stringify(payload):undefined,cache:'no-store',signal:controller.signal});const result=await response.json();if(!response.ok)throw Error(result.error||'通信できませんでした。');return result;}
 finally{clearTimeout(timer);}
}
const configReady=api('/api/mahjong/config').then(value=>{if(Array.isArray(value.stages)&&value.stages.length===7){config=value;if(!started){runConfig=config;render();}}}).catch(()=>{});
function asset(id){return API+'/api/mahjong/assets/'+encodeURIComponent(id);}
function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3500);}
function sound(kind='tile'){
 if(!audio)return;try{const t=audio.currentTime,o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(kind==='win'?660:kind==='riichi'?480:340,t);o.frequency.exponentialRampToValueAtTime(kind==='win'?990:kind==='riichi'?720:240,t+.10);g.gain.setValueAtTime(.035,t);g.gain.exponentialRampToValueAtTime(.001,t+.18);o.connect(g).connect(audio.destination);o.start(t);o.stop(t+.2);}catch{}
}
function appendLog(text){logs.push(text);logs=logs.slice(-7);}
function show(id){clearTimeout(cpuTimer);cpuTimer=null;const d=$(id);if(!d.open)d.showModal();}
function close(id){if($(id).open)$(id).close();scheduleCpu();}
function stopTimers(){generation++;clearTimeout(cpuTimer);cpuTimer=null;}
function startBattle(){
 stopTimers();selected=null;riichiPicking=false;round=createRound({stage:run.stage,dealer:run.totalBattles%2});
 logs=[];appendLog(`第${run.stage}ステージ・第${run.battle}戦。${runConfig.stages[run.stage-1].name}と対局開始。`);render();scheduleCpu();
}
async function startRun(){
 if($('startButton').disabled)return;
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(Audio){audio??=new Audio();void audio.resume();}}catch{}
 $('startButton').disabled=true;
 await configReady;runConfig=structuredClone(config);run=createArcade();started=true;ended=false;submitted=false;startedAt=Date.now();duration=0;
 sessionPromise=api('/api/games/session',{mode:MODE}).then(r=>r.id).catch(()=>null);
 for(const d of document.querySelectorAll('dialog[open]'))d.close();$('startButton').disabled=false;
 startBattle();
}
function scheduleCpu(){
 clearTimeout(cpuTimer);cpuTimer=null;
 if(!started||ended||run.phase!=='playing'||!round||round.phase!=='cpu'||document.querySelector('dialog[open]')||document.hidden)return;
 const token=generation;cpuTimer=setTimeout(()=>{cpuTimer=null;if(token!==generation||ended||document.querySelector('dialog[open]'))return;step({type:'cpu'});},650);
}
function step(action){
 if(!started||ended||run.phase!=='playing'||!round)return;
 const result=actRound(round,action);
 if(!result.ok){notify(result.message||'その操作はできません。');return;}
 round=result.state;selected=null;riichiPicking=false;
 if(result.message)appendLog(result.message);
 sound(action.type==='riichi'||action.riichi?'riichi':'tile');
 if(round.phase==='finished'){run=finishBattle(run,round.result);render();showBattleResult();return;}
 render();scheduleCpu();
}
function discard(){
 if(!Number.isInteger(selected)){notify('打牌する牌を選んでください。');return;}
 step({type:'discard',index:selected,riichi:riichiPicking});
}
function render(){
 const stage=runConfig.stages[run.stage-1]||defaults.stages[run.stage-1],a=round?legalActions(round):{};
 const view=round?publicView(round):null;
 document.documentElement.style.setProperty('--rival-accent',stage.accent||colors[run.stage-1]);
 $('stageNumber').textContent=run.stage;$('battleNumber').textContent=run.battle;$('stageName').textContent=titles[run.stage-1];$('cpuName').textContent=stage.name;$('opponentSeatName').textContent=stage.name;
 $('cpuLevel').textContent=`CPU LEVEL ${run.stage}`;$('scoreValue').textContent=fmt(run.score);
 $('stageDescription').textContent=`第${run.battle}戦 / 3戦 · 3戦全勝でステージ突破`;
 $('stageMap').innerHTML=Array.from({length:7},(_,i)=>`<span class="stage-node ${i+1===run.stage?'current':''} ${i+1<=run.completedStages?'cleared':''}"><b>${String(i+1).padStart(2,'0')}</b><small>${i===6?'FINAL':'STAGE'}</small></span>`).join('');
 $('stageProgress').innerHTML=Array.from({length:3},(_,i)=>`<span class="${run.results[i]?(run.results[i].won?'won':'lost'):''}">${run.results[i]?(run.results[i].won?'✓ 勝利':run.results[i].draw?'― 流局':'× 敗北'):`第${i+1}戦`}</span>`).join('');
 const portraitId=stage.portrait||'';
 if($('cpuPortrait').dataset.asset!==portraitId||$('cpuPortrait').dataset.stage!==String(run.stage)){
  $('cpuPortrait').dataset.asset=portraitId;$('cpuPortrait').dataset.stage=run.stage;
  $('cpuPortrait').innerHTML=portraitId?`<img src="${asset(portraitId)}" alt="${esc(stage.name)}" class="registered-portrait">`:portraitPlaceholder(run.stage);
  $('cpuPortrait').querySelector('img')?.addEventListener('error',()=>{$('cpuPortrait').innerHTML=portraitPlaceholder(run.stage,'画像を読み込めません');},{once:true});
 }
 const live=!!round&&!ended&&run.phase==='playing',hand=round?.hands?.[0]||[];
 const legal=a.discardIndices||[],riichiLegal=a.riichiDiscards||[];
 $('cpuHand').innerHTML=view?view.hands[1].map(id=>tileHTML(id,{small:true,hidden:id===null})).join(''):Array.from({length:13},()=>tileHTML(null,{small:true,hidden:true})).join('');
 $('playerHand').innerHTML=hand.map((id,index)=>{
  const disabled=!live||!legal.includes(index)||(riichiPicking&&!riichiLegal.includes(index));
  return `<span class="hand-tile-wrap ${round.drawn?.[0]!==null&&index===13?'drawn-tile':''}">${tileHTML(id,{button:true,index,selected:selected===index,disabled})}</span>`;
 }).join('');
 for(const [id,seat] of [['playerRiver',0],['cpuRiver',1]])$(id).innerHTML=(view?.discards?.[seat]||[]).map((t,i)=>`<span class="${view.riichiAt[seat]===i?'riichi-discard':''}">${tileHTML(t,{small:true})}</span>`).join('');
 $('doraIndicator').innerHTML=round?tileHTML(view.doraIndicator,{small:true}):'—';
 $('windLabel').textContent=round?.dealer===1?'あなた：南家 / CPU：東家':'あなた：東家 / CPU：南家';
 $('wallCount').textContent=round?.wall?.length??108;
 $('playerPoints').textContent=fmt(round?.points?.[0]??25000)+' 点';$('cpuPoints').textContent=fmt(round?.points?.[1]??25000);
 $('discardButton').disabled=!live||!legal.includes(selected)||(riichiPicking&&!riichiLegal.includes(selected));
 $('riichiButton').disabled=!live||!riichiLegal.length;$('riichiButton').classList.toggle('is-armed',riichiPicking);$('riichiButton').textContent=riichiPicking?'リーチを取り消す':'リーチ';
 $('tsumoButton').disabled=!live||!a.canTsumo;$('ronButton').disabled=!live||!a.canRon;$('passButton').disabled=!live||!a.canPass;
 const message=!started?'ゲーム開始を待っています':ended?'今回の挑戦は終了しました':!live?'対局が終了しました':round.phase==='cpu'?'対戦相手の思考中…':a.canRon?'ロンできます。和了するか見送りを選択。':a.canTsumo?'ツモ和了できます。':'あなたの手番。打牌する牌を選んでください。';
 $('turnStatus').textContent=message;$('roundNotice').textContent=riichiPicking?'リーチを宣言します。待ちが残る牌を選んで打牌してください。':message;
 $('tileHint').textContent=riichiPicking?'リーチできる牌だけを選択できます。':round?.riichi?.[0]?'リーチ中は引いた牌のみ打牌できます。':'牌を選んで打牌。同じ牌をもう一度押しても打牌できます。';
 $('logList').replaceChildren(...logs.slice().reverse().map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
}
function showBattleResult(){
 clearTimeout(cpuTimer);const result=round.result,won=result.winner===0,stage=runConfig.stages[run.stage-1];
 if(won){
  sound('win');const image=stage.rewards[run.wins-1];
  $('rewardTitle').textContent=`${stage.name}との第${run.battle}戦に勝利`;
  $('rewardKicker').textContent=`STAGE ${run.stage} · ${run.wins}つ目の勝利`;
  $('rewardDescription').textContent=image?'この勝利のために登録された一枚です。':`この勝利の画像はまだ登録されていません。獲得スコア +${fmt(run.lastAward)} pt`;
  $('rewardImage').hidden=!image;$('rewardPlaceholder').hidden=!!image;
  if(image){$('rewardImage').src=asset(image);$('rewardImage').alt=`${stage.name}・${run.wins}勝目の画像`;$('rewardImage').onerror=()=>{$('rewardImage').hidden=true;$('rewardPlaceholder').hidden=false;};}
  show('rewardDialog');
 }else renderResult();
}
function renderResult(){
 const result=round.result,won=result.winner===0;
 $('resultKicker').textContent=`STAGE ${run.stage} · 第${run.battle}戦 / 3`;
 $('resultTitle').textContent=run.phase==='complete'?'全7ステージ完全クリア！':run.phase==='stage-clear'?'3戦全勝！ ステージ突破':run.phase==='stage-failed'?'ステージの再挑戦へ':won?'あなたの勝利':result.winner===null?'流局':'対戦相手の勝利';
 $('resultMessage').textContent=result.message|| (won?'おめでとうございます。':result.winner===null?'牌山が尽きました。流局は勝利に数えません。':'次の一局へ、気持ちを切り替えましょう。');
 $('resultScore').innerHTML=`+${fmt(run.lastAward+run.lastClearBonus)} <small>pt</small>`;
 $('resultDetails').textContent=`今回の和了点 ${fmt(result.points)} 点 · ${result.han||0}翻 ${result.fu||0}符${run.lastClearBonus?` · 突破ボーナス +${fmt(run.lastClearBonus)} pt`:''}`;
 $('yakuList').replaceChildren(...(result.yaku||[]).map(y=>{const li=document.createElement('li');li.textContent=typeof y==='string'?y:`${y.name} ${y.han}翻`;return li;}));
 $('resultWinningHand').innerHTML=(result.winningHand||[]).map(id=>tileHTML(id,{small:true})).join('');
 $('nextRoundButton').hidden=run.phase!=='battle-result';$('nextStageButton').hidden=run.phase!=='stage-clear';$('retryStageButton').hidden=run.phase!=='stage-failed';
 $('retryStageButton').textContent=`3戦をやり直す（このステージの得点破棄・${run.stage*500}pt減点）`;
 $('endRunButton').textContent=run.phase==='complete'?'完全クリアの記録を見る':'終了してスコアを登録';
 show('resultDialog');
}
function endRun(){
 if(!started||ended)return;ended=true;stopTimers();duration=Math.max(100,Date.now()-startedAt);
 for(const d of document.querySelectorAll('dialog[open]'))d.close();
 $('finalTitle').textContent=run.phase==='complete'?'セブン麻雀、完全制覇。':'今回の挑戦、おつかれさまでした。';
 $('finalScore').innerHTML=`${fmt(run.score)} <small>pt</small>`;$('finalSummary').textContent=`${run.completedStages} / 7ステージ突破 · ${run.totalBattles}対戦 / ${run.totalWins}勝 · 再挑戦 ${run.retries}回`;
 $('submitScore').disabled=false;$('finalRankStatus').textContent='ニックネームを入れて、今回のスコアを共有ランキングへ。';
 render();show('finalDialog');void loadRanking('finalRanking','finalRankStatus');
}
async function loadRanking(tableId='rankingRows',statusId='rankingStatus'){
 const target=$(tableId);target.innerHTML='<tr><td colspan="3">読み込み中…</td></tr>';
 try{const data=await api('/api/games/scores?mode='+encodeURIComponent(MODE));const list=data.entries||[];target.replaceChildren(...list.map((entry,i)=>{const tr=document.createElement('tr');for(const value of [i+1,entry.nickname,fmt(entry.score)]){const td=document.createElement('td');td.textContent=value;tr.append(td);}return tr;}));if(!list.length)target.innerHTML='<tr><td colspan="3">最初の記録を残そう。</td></tr>';if(statusId==='rankingStatus')$(statusId).textContent='どの端末からでも共有されるTOP10です。';}
 catch(error){target.innerHTML='<tr><td colspan="3">ランキングを取得できませんでした。</td></tr>';$(statusId).textContent=error.message;}
}
async function submitScore(event){
 event.preventDefault();if(!ended||submitted)return;$('submitScore').disabled=true;$('finalRankStatus').textContent='記録を登録しています…';
 try{const id=await sessionPromise;if(!id)throw Error('開始時にランキングに接続できなかったため、この記録は登録できません。');await api('/api/games/scores',{id,mode:MODE,score:run.score,duration,nickname:$('finalNickname').value});submitted=true;$('finalRankStatus').textContent='記録を登録しました。';await loadRanking('finalRanking','finalRankStatus');}
 catch(error){$('finalRankStatus').textContent=error.message;$('submitScore').disabled=false;}
}
document.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;if(b.dataset.close)close(b.dataset.close);});
$('playerHand').addEventListener('click',event=>{const b=event.target.closest('[data-tile-index]');if(!b||b.disabled)return;const index=Number(b.dataset.tileIndex);if(selected===index)discard();else{selected=index;sound();render();}});
$('startButton').onclick=startRun;$('discardButton').onclick=discard;
$('riichiButton').onclick=()=>{riichiPicking=!riichiPicking;selected=null;render();};$('tsumoButton').onclick=()=>step({type:'tsumo'});$('ronButton').onclick=()=>step({type:'ron'});$('passButton').onclick=()=>step({type:'pass'});
for(const id of ['helpButton','welcomeHelpButton'])$(id).onclick=()=>show('helpDialog');
for(const id of ['rankingButton','welcomeRankingButton'])$(id).onclick=()=>{show('rankingDialog');void loadRanking();};$('refreshRankingButton').onclick=()=>void loadRanking();
$('rewardContinue').onclick=()=>{close('rewardDialog');renderResult();};
$('nextRoundButton').onclick=$('nextStageButton').onclick=()=>{close('resultDialog');run=advanceArcade(run);startBattle();};
$('retryStageButton').onclick=()=>{close('resultDialog');run=retryStage(run);startBattle();};
$('endRunButton').onclick=endRun;$('finishButton').onclick=()=>{if(started&&!ended)show('quitDialog');};$('confirmFinishButton').onclick=endRun;
$('finalRankForm').addEventListener('submit',submitScore);
$('newRunButton').onclick=()=>{close('finalDialog');$('finalNickname').value='';void startRun();};
$('adminLink').href=API+'/mahjong-admin/';
for(const id of ['welcomeDialog','rewardDialog','resultDialog','finalDialog'])$(id).addEventListener('cancel',event=>event.preventDefault());
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',scheduleCpu));
document.addEventListener('keydown',event=>{
 if(/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||event.ctrlKey||event.altKey||event.metaKey||document.querySelector('dialog[open]'))return;
 if(event.key==='?'){event.preventDefault();show('helpDialog');return;}
 if(!started||ended||!round)return;
 const a=legalActions(round),indices=riichiPicking?a.riichiDiscards:a.discardIndices;
 if(['ArrowLeft','ArrowRight'].includes(event.key)&&indices.length){event.preventDefault();const i=indices.indexOf(selected),next=i<0?0:(i+(event.key==='ArrowLeft'?-1:1)+indices.length)%indices.length;selected=indices[next];render();$('playerHand').querySelector(`[data-tile-index="${selected}"]`)?.scrollIntoView({block:'nearest',inline:'nearest'});}
 if(event.key==='Enter'||event.key===' '){if(event.target.closest('button,a'))return;event.preventDefault();if(!event.repeat)discard();}
 if(event.key.toLowerCase()==='r'&&!event.repeat&&!$('riichiButton').disabled){event.preventDefault();$('riichiButton').click();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(cpuTimer);cpuTimer=null;}else scheduleCpu();});
render();show('welcomeDialog');
