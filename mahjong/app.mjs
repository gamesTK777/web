import {createRound,actRound,legalActions,publicView} from './engine.mjs?v=20261107-mahjong';
import {createArcade,finishBattle,advanceArcade,retryStage} from './arcade.mjs?v=20261107-mahjong';
import {tileHTML,tileName,portraitPlaceholder} from './tiles.mjs?v=20261107-mahjong';
import {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL} from './cast.mjs?v=20261108-cast';
import {createEncounter,advanceEncounter,skipEncounter} from './encounter.mjs?v=20261108-cast';
import {CharacterVoice} from './voice.mjs?v=20261108-natural';
import {chooseVoiceLine,getVoiceProfile} from './voice-lines.mjs?v=20261108-voice';
const $=id=>document.getElementById(id),API='https://tk777-neonshift-scores.takesuke.chatgpt.site',MODE='mahjong:arcade';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n||0).toLocaleString('ja-JP');
const colors=['#315f6b','#396c5c','#725d80','#8a625b','#526d91','#8b7452','#6f5b81'];
const defaults={version:0,stages:CAST.map(profile=>({id:profile.id,name:profile.name,portrait:null,rewards:[null,null,null],accent:colors[profile.id-1]}))};
let config=defaults,runConfig=defaults,run=createArcade(),round=null,selected=null,riichiPicking=false,started=false,ended=false,submitted=false;
let generation=0,cpuTimer=null,startedAt=0,duration=0,sessionPromise=null,toastTimer=null,logs=[];
let audio=null,encounter=null,encounterRetryStage=null;
let voiceState=null,currentSpokenLine=null,idleVoiceTimer=null,lastCharacterLineAt=0,activeSpeechOwner='';
const voiceEventCounts=new Map(),VOICE_KEY='tk777-seven-mahjong-voice';
function voicePreferences(){try{const p=JSON.parse(localStorage.getItem(VOICE_KEY));return{enabled:p?.enabled!==false,volume:Number.isFinite(p?.volume)?Math.max(0,Math.min(1,p.volume)):.8};}catch{return{enabled:true,volume:.8};}}
const characterVoice=new CharacterVoice({...voicePreferences(),Context:window.AudioContext||window.webkitAudioContext,synth:window.speechSynthesis,Utterance:window.SpeechSynthesisUtterance,onChange:state=>{voiceState=state;renderVoiceControls(state);}});
voiceState=characterVoice.state();
function saveVoicePreferences(){try{localStorage.setItem(VOICE_KEY,JSON.stringify({enabled:voiceState.enabled,volume:voiceState.volume}));}catch{}}
function renderVoiceControls(state){
 const label=!state.supported?'音声非対応':state.enabled?'音声オン':'音声オフ';
 for(const id of ['voiceToggle','welcomeVoiceToggle','encounterVoiceToggle','rewardVoiceToggle']){const button=$(id);button.textContent='♪ '+label;button.setAttribute('aria-pressed',String(state.enabled));button.disabled=!state.supported;}
 $('voiceEnabled').checked=state.enabled;$('voiceEnabled').disabled=!state.supported;
 $('voiceVolume').value=String(Math.round(state.volume*100));$('voiceVolume').disabled=!state.supported;$('voiceVolumeValue').textContent=Math.round(state.volume*100)+'%';
 const status=!state.supported?'このブラウザーは音声に対応していません。':!state.enabled?'声はオフです。台詞は文字で表示します。':state.volume===0?'音量は0%です。':state.availability==='unavailable'?'日本語の読み上げ音声が見つかりません。':state.blocked?'「もう一度聞く」か「声を聞く」を押してください。':state.error?'音声を再生できませんでした。「もう一度聞く」で再試行できます。':state.loading?'自然な音声を準備しています…':state.speaking?'キャラクターが話しています…':state.availability==='loading'?'日本語の音声を準備しています。':'会話・対局中・勝利時に話しかけます。';
 $('voiceStatus').textContent=status;$('voiceHelp').textContent=status;
 for(const id of ['encounterVoiceStatus','rewardVoiceStatus']){$(id).textContent=status;$(id).hidden=!state.enabled||!!state.supported&&state.availability!=='unavailable'&&!state.blocked&&!state.error&&!state.loading;}
 for(const id of ['voiceReplay','encounterReplay','rewardReplay'])$(id).disabled=!state.supported||!state.enabled||state.volume===0||!currentSpokenLine;
 $('voiceTest').disabled=!state.supported||!state.enabled||state.volume===0;
 $('cpuPortrait').dataset.speaking=String(state.speaking);$('encounterPortrait').dataset.speaking=String(state.speaking);
 $('characterVoiceState').textContent=state.speaking?'発話中':'台詞';
}
function stopCharacterVoice(){clearTimeout(idleVoiceTimer);idleVoiceTimer=null;activeSpeechOwner='';characterVoice.stop();}
function speakCharacter(text,{priority='important',key='',force=false}={}){
 if(!text||document.hidden)return false;
 if(priority==='ambient'&&Date.now()-lastCharacterLineAt<12000)return false;
 const accepted=characterVoice.speak(run.stage,text,{key,priority,force});
 if(priority==='ambient'&&!accepted&&voiceState.enabled&&voiceState.supported)return false;
 activeSpeechOwner=document.querySelector('dialog[open]')?.id||'';
 currentSpokenLine={stageId:run.stage,text,key,priority};lastCharacterLineAt=Date.now();
 $('characterCaption').textContent=text;$('characterSpeaker').textContent=displayStageName(currentStage());$('characterCommentary').hidden=false;
 renderVoiceControls(characterVoice.state());return accepted;
}
function sayEvent(event,{priority='ambient',key=''}={}){
 const count=voiceEventCounts.get(event)||0,text=chooseVoiceLine(run.stage,event,{variant:count});voiceEventCounts.set(event,count+1);
 return speakCharacter(text,{priority,key:key||`${generation}:${run.totalBattles}:${round?.turnCount??0}:${event}`});
}
function replayCharacterVoice(){if(!currentSpokenLine)return;characterVoice.unlock();activeSpeechOwner=document.querySelector('dialog[open]')?.id||'';characterVoice.speak(currentSpokenLine.stageId,currentSpokenLine.text,{key:currentSpokenLine.key,priority:'dialogue',force:true});}
function setVoiceEnabled(enabled){characterVoice.setEnabled(enabled);voiceState=characterVoice.state();saveVoicePreferences();renderVoiceControls(voiceState);if(enabled){characterVoice.unlock();if(started&&!ended&&currentSpokenLine)replayCharacterVoice();}}
function syncVoiceSample(){const profile=getVoiceProfile(Number($('voiceCharacter').value));$('voiceStyle').textContent=profile?`${profile.name}：${profile.style}`:'';}
function scheduleIdleVoice(){
 clearTimeout(idleVoiceTimer);idleVoiceTimer=null;
 if(!started||ended||encounter||run.phase!=='playing'||!round||!legalActions(round).canDiscard||document.hidden||document.querySelector('dialog[open]'))return;
 const token=generation,turn=round.turnCount;
 idleVoiceTimer=setTimeout(()=>{idleVoiceTimer=null;if(token!==generation||!round||round.turnCount!==turn||ended||encounter||document.hidden||document.querySelector('dialog[open]'))return;sayEvent('playerTurn',{key:`${token}:${run.totalBattles}:${turn}:idle`});},20000);
}
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
function show(id){clearTimeout(cpuTimer);cpuTimer=null;stopCharacterVoice();const d=$(id);if(!d.open)d.showModal();}
function close(id){stopCharacterVoice();if($(id).open)$(id).close();scheduleCpu();}
function stopTimers(){generation++;clearTimeout(cpuTimer);cpuTimer=null;stopCharacterVoice();}
function currentStage(){return runConfig.stages[run.stage-1]||defaults.stages[run.stage-1];}
function setPortrait(container,stage,className='registered-portrait'){
 const src=stage.portrait?asset(stage.portrait):defaultPortraitURL(stage.id),key=stage.id+':'+src+':'+displayStageName(stage);
 if(container.dataset.asset===key)return;
 container.dataset.asset=key;container.innerHTML=`<img src="${esc(src)}" alt="${esc(displayStageName(stage))}" class="${className}" decoding="async">`;
 const image=container.querySelector('img');let fallback=!stage.portrait;
 image.onerror=()=>{if(!fallback){fallback=true;image.src=defaultPortraitURL(stage.id);}else{image.onerror=null;container.innerHTML=portraitPlaceholder(stage.id,'画像を読み込めません');}};
}
function startBattle(){
 stopTimers();selected=null;riichiPicking=false;round=null;
 currentSpokenLine=null;$('characterCommentary').hidden=true;
 const stage=currentStage();encounter=createEncounter(run.stage,run.battle,{retry:encounterRetryStage===run.stage&&run.battle===1,name:displayStageName(stage)});encounterRetryStage=null;
 logs=[];appendLog(`第${run.stage}ステージ・第${run.battle}戦。まずは${displayStageName(stage)}とご挨拶。`);
 render();show('encounterDialog');renderEncounter();
}
function renderEncounter(){
 if(!encounter)return;const stage=currentStage(),profile=getCast(run.stage);
 $('encounterKicker').textContent=`STAGE ${String(run.stage).padStart(2,'0')} / 7 · 第${run.battle}戦`;
 $('encounterName').textContent=displayStageName(stage);$('encounterRole').textContent=profile.role;
 $('encounterPersonality').textContent=profile.personality;
 $('encounterSpeech').textContent=encounter.lines[encounter.index];
 $('encounterProgress').textContent=`${encounter.index+1} / ${encounter.lines.length}`;
 $('encounterNext').textContent=encounter.index+1===encounter.lines.length?'対局をはじめる →':'会話のつづき →';
 setPortrait($('encounterPortrait'),stage,'encounter-photo');
 speakCharacter(encounter.lines[encounter.index],{priority:'dialogue',key:`encounter:${generation}:${run.stage}:${run.battle}:${encounter.index}`});
}
function beginBattleRound(){
 if(!encounter?.complete||!started||ended||run.phase!=='playing')return;
 encounter=null;close('encounterDialog');stopTimers();
 round=createRound({stage:run.stage,dealer:run.totalBattles%2});
 appendLog(`${displayStageName(currentStage())}と対局開始。`);render();sayEvent('roundStart',{priority:'important'});scheduleCpu();
}
function nextEncounter(){
 if(!encounter||encounter.complete)return;encounter=advanceEncounter(encounter);
 if(encounter.complete)beginBattleRound();else renderEncounter();
}
function skipConversation(){if(!encounter)return;encounter=skipEncounter(encounter);beginBattleRound();}
async function startRun(){
 if($('startButton').disabled)return;
 characterVoice.unlock();
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(Audio){audio??=new Audio();void audio.resume();}}catch{}
 $('startButton').disabled=true;
 await configReady;runConfig=structuredClone(config);run=createArcade();encounterRetryStage=null;started=true;ended=false;submitted=false;startedAt=Date.now();duration=0;
 sessionPromise=api('/api/games/session',{mode:MODE}).then(r=>r.id).catch(()=>null);
 for(const d of document.querySelectorAll('dialog[open]'))d.close();$('startButton').disabled=false;
 startBattle();
}
function scheduleCpu(){
 clearTimeout(cpuTimer);cpuTimer=null;
 scheduleIdleVoice();
 if(!started||ended||encounter||run.phase!=='playing'||!round||round.phase!=='cpu'||document.querySelector('dialog[open]')||document.hidden)return;
 const token=generation;cpuTimer=setTimeout(()=>{cpuTimer=null;if(token!==generation||ended||document.querySelector('dialog[open]'))return;step({type:'cpu'});},650);
}
function step(action){
 if(!started||ended||encounter||run.phase!=='playing'||!round)return;
 const before=round;
 const result=actRound(round,action);
 if(!result.ok){notify(result.message||'その操作はできません。');return;}
 round=result.state;selected=null;riichiPicking=false;
 if(result.message)appendLog(result.message);
 sound(action.type==='riichi'||action.riichi?'riichi':'tile');
 if(round.phase==='finished'){run=finishBattle(run,round.result);render();showBattleResult();return;}
 render();
 if(!before.riichi[0]&&round.riichi[0])sayEvent('playerRiichi',{priority:'important'});
 else if(!before.riichi[1]&&round.riichi[1])sayEvent('cpuRiichi',{priority:'important'});
 else if(action.type==='cpu'&&round.turnCount>0&&round.turnCount%8===0)sayEvent('playerTurn');
 scheduleCpu();
}
function discard(){
 if(!Number.isInteger(selected)){notify('打牌する牌を選んでください。');return;}
 step({type:'discard',index:selected,riichi:riichiPicking});
}
function render(){
 const stage=currentStage(),profile=getCast(run.stage),name=displayStageName(stage),a=round?legalActions(round):{};
 const view=round?publicView(round):null;
 document.documentElement.style.setProperty('--rival-accent',stage.accent||colors[run.stage-1]);
 $('stageNumber').textContent=run.stage;$('battleNumber').textContent=run.battle;$('stageName').textContent=profile.tableTitle;$('cpuName').textContent=name;$('opponentSeatName').textContent=name;
 $('cpuRole').textContent=profile.role;$('cpuPersonality').textContent=profile.personality;
 $('cpuLevel').textContent=`CPU LEVEL ${run.stage}`;$('scoreValue').textContent=fmt(run.score);
 $('stageDescription').textContent=`第${run.battle}戦 / 3戦 · 3戦全勝でステージ突破`;
 $('stageMap').innerHTML=Array.from({length:7},(_,i)=>`<span class="stage-node ${i+1===run.stage?'current':''} ${i+1<=run.completedStages?'cleared':''}"><b>${String(i+1).padStart(2,'0')}</b><small>${i===6?'FINAL':'STAGE'}</small></span>`).join('');
 $('stageProgress').innerHTML=Array.from({length:3},(_,i)=>`<span class="${run.results[i]?(run.results[i].won?'won':'lost'):''}">${run.results[i]?(run.results[i].won?'✓ 勝利':run.results[i].draw?'― 流局':'× 敗北'):`第${i+1}戦`}</span>`).join('');
 setPortrait($('cpuPortrait'),stage);
 const live=!!round&&!encounter&&!ended&&run.phase==='playing',hand=round?.hands?.[0]||[];
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
 const message=!started?'ゲーム開始を待っています':encounter?'対戦相手と会話中です。会話が終わると対局が始まります。':ended?'今回の挑戦は終了しました':!live?'対局が終了しました':round.phase==='cpu'?'対戦相手の思考中…':a.canRon?'ロンできます。和了するか見送りを選択。':a.canTsumo?'ツモ和了できます。':'あなたの手番。打牌する牌を選んでください。';
 $('turnStatus').textContent=message;$('roundNotice').textContent=riichiPicking?'リーチを宣言します。待ちが残る牌を選んで打牌してください。':message;
 $('tileHint').textContent=riichiPicking?'リーチできる牌だけを選択できます。':round?.riichi?.[0]?'リーチ中は引いた牌のみ打牌できます。':'牌を選んで打牌。同じ牌をもう一度押しても打牌できます。';
 $('logList').replaceChildren(...logs.slice().reverse().map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
}
function showBattleResult(){
 clearTimeout(cpuTimer);const result=round.result,won=result.winner===0,stage=runConfig.stages[run.stage-1];
 if(won){
  sound('win');const image=stage.rewards[run.wins-1],profile=getCast(run.stage),name=displayStageName(stage),fallbackURL=defaultRewardURL(run.stage,run.wins);
  $('rewardTitle').textContent=`${name}との第${run.battle}戦に勝利`;
  $('rewardKicker').textContent=`STAGE ${run.stage} · ${run.wins}つ目の勝利`;
  $('rewardDescription').textContent=`「${profile.rewards[run.wins-1]}」 獲得スコア +${fmt(run.lastAward)} pt`;
  const reward=$('rewardImage');reward.hidden=false;$('rewardPlaceholder').hidden=true;
  $('rewardDialog').dataset.bundled=String(!image);
  reward.src=image?asset(image):fallbackURL;reward.alt=`${name}・${run.wins}勝目の記念画像`;
  let fallback=!image;reward.onerror=()=>{if(!fallback){fallback=true;$('rewardDialog').dataset.bundled='true';reward.src=fallbackURL;}else{reward.onerror=null;reward.hidden=true;$('rewardPlaceholder').hidden=false;$('rewardDialog').dataset.bundled='false';}};
  show('rewardDialog');
  speakCharacter(profile.rewards[run.wins-1],{priority:'important',key:`victory:${generation}:${run.stage}:${run.wins}:${run.totalBattles}`});
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
 if(!won)sayEvent(result.winner===null?'draw':'cpuWin',{priority:'important',key:`result:${generation}:${run.totalBattles}`});
}
function endRun(){
 if(!started||ended)return;ended=true;encounter=null;stopTimers();duration=Math.max(100,Date.now()-startedAt);
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
$('encounterNext').onclick=nextEncounter;$('encounterSkip').onclick=skipConversation;
$('encounterDialog').addEventListener('keydown',event=>{if(event.key==='ArrowRight'||(['Enter',' '].includes(event.key)&&!event.target.closest('button'))){event.preventDefault();if(!event.repeat)nextEncounter();}});
$('riichiButton').onclick=()=>{riichiPicking=!riichiPicking;selected=null;render();};$('tsumoButton').onclick=()=>step({type:'tsumo'});$('ronButton').onclick=()=>step({type:'ron'});$('passButton').onclick=()=>step({type:'pass'});
for(const id of ['helpButton','welcomeHelpButton'])$(id).onclick=()=>show('helpDialog');
for(const id of ['rankingButton','welcomeRankingButton'])$(id).onclick=()=>{show('rankingDialog');void loadRanking();};$('refreshRankingButton').onclick=()=>void loadRanking();
$('rewardContinue').onclick=()=>{close('rewardDialog');renderResult();};
$('nextRoundButton').onclick=$('nextStageButton').onclick=()=>{close('resultDialog');run=advanceArcade(run);startBattle();};
$('retryStageButton').onclick=()=>{close('resultDialog');run=retryStage(run);encounterRetryStage=run.stage;startBattle();};
$('endRunButton').onclick=endRun;$('finishButton').onclick=()=>{if(started&&!ended)show('quitDialog');};$('confirmFinishButton').onclick=endRun;
$('finalRankForm').addEventListener('submit',submitScore);
$('newRunButton').onclick=()=>{close('finalDialog');$('finalNickname').value='';void startRun();};
$('adminLink').href=API+'/mahjong-admin/';
for(const id of ['voiceToggle','welcomeVoiceToggle','encounterVoiceToggle','rewardVoiceToggle'])$(id).onclick=()=>setVoiceEnabled(!characterVoice.state().enabled);
$('voiceEnabled').onchange=event=>setVoiceEnabled(event.target.checked);
$('voiceVolume').oninput=event=>{characterVoice.setVolume(Number(event.target.value)/100);voiceState=characterVoice.state();saveVoicePreferences();renderVoiceControls(voiceState);};
for(const id of ['voiceSettingsButton','welcomeVoiceSettings'])$(id).onclick=()=>{show('voiceDialog');$('voiceCharacter').value=String(run.stage);syncVoiceSample();renderVoiceControls(characterVoice.state());};
$('voiceCharacter').onchange=()=>{stopCharacterVoice();syncVoiceSample();};
$('voiceTest').onclick=()=>{const id=Number($('voiceCharacter').value);characterVoice.unlock();activeSpeechOwner='voiceDialog';characterVoice.speak(id,chooseVoiceLine(id,'roundStart'),{key:`sample:${id}`,priority:'dialogue',force:true});};
for(const id of ['voiceReplay','encounterReplay','rewardReplay'])$(id).onclick=replayCharacterVoice;
for(const id of ['welcomeDialog','encounterDialog','rewardDialog','resultDialog','finalDialog'])$(id).addEventListener('cancel',event=>event.preventDefault());
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',()=>{if(activeSpeechOwner===d.id)stopCharacterVoice();scheduleCpu();}));
document.addEventListener('keydown',event=>{
 if(/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||event.ctrlKey||event.altKey||event.metaKey||document.querySelector('dialog[open]'))return;
 if(event.key==='?'){event.preventDefault();show('helpDialog');return;}
 if(!started||ended||!round)return;
 const a=legalActions(round),indices=riichiPicking?a.riichiDiscards:a.discardIndices;
 if(['ArrowLeft','ArrowRight'].includes(event.key)&&indices.length){event.preventDefault();const i=indices.indexOf(selected),next=i<0?0:(i+(event.key==='ArrowLeft'?-1:1)+indices.length)%indices.length;selected=indices[next];render();$('playerHand').querySelector(`[data-tile-index="${selected}"]`)?.scrollIntoView({block:'nearest',inline:'nearest'});}
 if(event.key==='Enter'||event.key===' '){if(event.target.closest('button,a'))return;event.preventDefault();if(!event.repeat)discard();}
 if(event.key.toLowerCase()==='r'&&!event.repeat&&!$('riichiButton').disabled){event.preventDefault();$('riichiButton').click();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(cpuTimer);cpuTimer=null;stopCharacterVoice();}else scheduleCpu();});
window.addEventListener('pagehide',()=>{clearTimeout(cpuTimer);cpuTimer=null;stopCharacterVoice();});
window.addEventListener('pageshow',()=>scheduleCpu());
render();syncVoiceSample();renderVoiceControls(characterVoice.state());show('welcomeDialog');
