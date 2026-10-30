const API='https://tk777-neonshift-scores.takesuke.chatgpt.site';
const $=id=>document.getElementById(id);
let view=0, current=null;
async function request(path, data) {
  const response=await fetch(API+path,{method:data?'POST':'GET',headers:data?{'Content-Type':'application/json'}:{},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(12000)});
  const result=await response.json();
  if(!response.ok)throw new Error(result.error||'接続できませんでした。時間をおいて再試行してください。');
  return result;
}
export function beginRankingRun(mode) {
  // Resolve failures into a value immediately, even if the player quits this run.
  return request('/api/session',{mode}).then(result=>result.id).catch(()=>null);
}
const duration=ms=>`${Math.floor(ms/60000)}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(Math.floor(ms%1000/10)).padStart(2,'0')}`;
async function load(mode, token) {
  $('ranking-status').textContent='世界の記録を読み込み中…';
  $('ranking-rows').replaceChildren();
  try {
    const result=await request('/api/scores?mode='+mode);
    if(token!==view)return;
    for(const [i,entry] of result.entries.entries()) {
      const row=document.createElement('tr');
      if(entry.id===current?.id)row.className='your-record';
      for(const value of [String(i+1).padStart(2,'0'),entry.nickname,mode==='sprint'?duration(entry.duration):entry.score.toLocaleString(),entry.lines]) {
        const td=document.createElement('td');td.textContent=String(value);row.append(td);
      }
      $('ranking-rows').append(row);
    }
    $('ranking-status').textContent=result.entries.length?'全プレイヤー共通の最新記録':'まだ記録がありません。最初の記録を残そう。';
  } catch {
    if(token===view)$('ranking-status').textContent='ランキングを取得できませんでした。「更新」で再試行できます。';
  }
}
export function showRanking(mode, run=null) {
  const token=++view;current=run?{...run,id:null}:null;
  $('ranking-title').textContent=mode==='sprint'?'40 LINES / TOP 10':'ARCADE / TOP 10';
  $('ranking-value-label').textContent=mode==='sprint'?'TIME':'SCORE';
  $('ranking-form').hidden=!run||mode==='sprint'&&!run.won;
  $('ranking-result').textContent=run?(mode==='sprint'?(run.won?'CLEAR TIME '+duration(run.duration):'40ライン達成でランキングに参加できます。'):'YOUR SCORE '+run.score.toLocaleString()):'みんなの記録に挑もう。';
  $('ranking-submit').disabled=false;$('ranking-submit').textContent='この記録を登録';$('ranking-save-status').textContent='';
  try{$('nickname').value=localStorage.getItem('neonshift-nickname')||'';}catch{}
  $('ranking-refresh').onclick=()=>load(mode,token);
  $('ranking-form').onsubmit=async event=>{
    event.preventDefault();const record=current;if(!record||$('ranking-submit').disabled)return;
    $('ranking-submit').disabled=true;$('ranking-save-status').textContent='記録を送信中…';
    try {
      record.id??=await record.session;
      if(!record.id)throw new Error('開始時にサーバーへ接続できなかったため、このプレイは登録できません。接続を確認して次のゲームでお試しください。');
      const nickname=$('nickname').value.trim();
      await request('/api/scores',{id:record.id,mode,score:record.score,lines:record.lines,duration:record.duration,nickname});
      try{localStorage.setItem('neonshift-nickname',nickname);}catch{}
      if(token!==view)return;
      $('ranking-save-status').textContent='登録しました。上位10件に入ると一覧に表示されます。';$('ranking-submit').textContent='登録済み';
      await load(mode,token);
    } catch(error) {
      if(token!==view)return;
      $('ranking-save-status').textContent=error.message;$('ranking-submit').disabled=false;
    }
  };
  if(!$('ranking-dialog').open)$('ranking-dialog').showModal();
  load(mode,token);
}
$('ranking-close').onclick=()=>$('ranking-dialog').close();
