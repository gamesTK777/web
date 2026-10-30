import {GameAudio} from './audio.mjs';
import {ClearEffects} from './clear-effects.mjs';
import {KeyboardInput,GestureInput,bindGestures,KEY_ACTIONS} from './input.mjs';
import {beginRankingRun, showRanking} from './ranking.mjs';
import {Game, SHAPES, COLORS, SKILLS, MAX_ENERGY} from './engine.mjs';

const $=id=>document.getElementById(id);
const canvas=$('board'), ctx=canvas.getContext('2d');
const overlay=$('overlay'), content=$('overlay-content'), intro=content.innerHTML;
const dialog=$('help-dialog'), rankingDialog=$('ranking-dialog');
let rankingSession=null;
let game=null, mode='arcade', particles=[], beams=[], trails=[], shake=0, flash=0, fallingCells=[];
const soundtrack=new GameAudio(), clearEffects=new ClearEffects();
let last=performance.now(), hudTime=0, toastTime=0;
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const keyboard=new KeyboardInput(), gestures=new GestureInput(name=>action(name));
let gestureBinding=null;
let records={arcade:0,sprint:null};
try {
  const saved=JSON.parse(localStorage.getItem('tk777-neonshift-records')||'{}');
  if(Number.isFinite(saved.arcade)&&saved.arcade>=0)records.arcade=saved.arcade;
  if(Number.isFinite(saved.sprint)&&saved.sprint>0)records.sprint=saved.sprint;
  reduced=localStorage.getItem('tk777-neonshift-motion')==='reduced'||reduced;
} catch {}
$('reduced-motion').checked=reduced;
document.body.classList.toggle('reduced-motion',reduced);

function time(ms, precise=false) {
  const total=Math.floor(ms/1000), minutes=String(Math.floor(total/60)).padStart(2,'0'), seconds=String(total%60).padStart(2,'0');
  return `${minutes}:${seconds}${precise?'.'+String(Math.floor(ms%1000/10)).padStart(2,'0'):''}`;
}
function saveRecord() {
  let isNew=false;
  if(game.mode==='arcade'&&game.score>records.arcade){records.arcade=game.score;isNew=true;}
  if(game.mode==='sprint'&&game.state==='won'&&(!records.sprint||game.elapsed<records.sprint)){records.sprint=game.elapsed;isNew=true;}
  try{localStorage.setItem('tk777-neonshift-records',JSON.stringify(records));}catch{}
  return isNew;
}
function initAudio(){soundtrack.unlock();}
function tone(notes,duration,kind){soundtrack.tone(notes,duration,kind);}
function syncAudioButtons(){
  $('sound').setAttribute('aria-pressed',soundtrack.sfxEnabled);$('sound').setAttribute('aria-label',`効果音を${soundtrack.sfxEnabled?'オフ':'オン'}にする`);$('sound').innerHTML=`SE <span>${soundtrack.sfxEnabled?'ON':'OFF'}</span>`;
  $('music').setAttribute('aria-pressed',soundtrack.musicEnabled);$('music').setAttribute('aria-label',`BGMを${soundtrack.musicEnabled?'オフ':'オン'}にする`);$('music').innerHTML=`♫ <span>BGM ${soundtrack.musicEnabled?'ON':'OFF'}</span>`;
  $('music').title='NEON / AFTERHOURS · 126 BPM · プレイ中のみ再生';
}
function saveAudioSettings(){try{localStorage.setItem('neonshift-audio',JSON.stringify({music:soundtrack.musicEnabled,sfx:soundtrack.sfxEnabled,volume:soundtrack.volume}));}catch{}}
const musicButton=document.createElement('button');musicButton.id='music';musicButton.className='icon-button';$('sound').before(musicButton);
const musicSetting=document.createElement('label');musicSetting.className='setting-row';musicSetting.innerHTML='<span>ハウスBGMの音量 <small style="display:block;color:#91a5bb;margin-top:5px">NEON / AFTERHOURS · 126 BPM</small></span><input id="music-volume" type="range" min="0" max="100" step="1" aria-label="BGM音量" style="width:120px;height:24px">';$('close-help-bottom').before(musicSetting);
const musicNote=document.createElement('p');musicNote.textContent='BGMはプレイ中のみ再生。一時停止・別タブへの移動・ゲーム終了で止まります。画面上部のBGMとSEで、それぞれオン／オフを切り替えられます。';musicSetting.before(musicNote);
try{const saved=JSON.parse(localStorage.getItem('neonshift-audio')||'{}');soundtrack.musicEnabled=saved.music!==false;soundtrack.sfxEnabled=saved.sfx!==false;if(Number.isFinite(saved.volume))soundtrack.setVolume(saved.volume);}catch{}
$('music-volume').value=Math.round(soundtrack.volume*100);$('music-volume').oninput=e=>{soundtrack.setVolume(Number(e.target.value)/100);saveAudioSettings();};
$('music').onclick=()=>{soundtrack.setMusic(!soundtrack.musicEnabled);if(game?.state==='playing')initAudio();syncAudioButtons();saveAudioSettings();};
syncAudioButtons();
function clearCelebration(e){
  clearEffects.trigger(e.rows,e.cells,COLORS,reduced);soundtrack.clear(e.n,e.chain||0);
  if(!reduced){shake=e.n>=4?13:3+e.n*1.5;const board=$('board-frame');board.classList.remove('line-clear-fx','quad-clear-fx');void board.offsetWidth;board.classList.add(e.n>=4?'quad-clear-fx':'line-clear-fx');}
}
function toast(title, sub='', color='#b7ff63') {
  $('toast').classList.toggle('quad-toast',title==='QUAD BREAK!');
  $('toast').replaceChildren(document.createTextNode(title));
  if(sub){const small=document.createElement('small');small.textContent=sub;$('toast').append(small);}
  $('toast').style.color=color;$('toast').classList.add('visible');toastTime=1500;
}
function burst(cells, multiplier=1) {
  if(reduced)return;
  for(const cell of cells)for(let i=0;i<3*multiplier;i++) {
    const a=Math.random()*Math.PI*2,s=35+Math.random()*120;
    particles.push({x:cell.x*30+15,y:cell.y*30+15,vx:Math.cos(a)*s,vy:Math.sin(a)*s-70,life:.5+Math.random()*.5,max:1,color:COLORS[cell.t]||'#fff',size:1+Math.random()*3});
  }
  if(particles.length>450)particles.splice(0,particles.length-450);
}
function event(e) {
  if(['lock','hold','skill'].includes(e.type))resetInput();
  if(e.type==='cascadeFall')fallingCells=e.cells.map(c=>({...c,life:.1}));
  if(e.type==='cascadeClear') {
    fallingCells=fallingCells.filter(c=>!e.rows.includes(c.y));clearCelebration(e);
    toast(`${e.chain} CHAIN!`,`${e.n} LINE / +${e.points.toLocaleString()}`,'#54e5f4');
    if(!reduced)shake=Math.min(13,3+e.chain*2);
  }
  if(e.type==='cascadeEnd') {
    fallingCells=[];toast(e.chain?`${e.chain} CHAIN COMPLETE`:'AVALANCHE COMPLETE',e.chain?`${e.lines} LINES / +${e.points.toLocaleString()}`:'隙間を埋めて、次の一手へ','#54e5f4');
  }
  if(e.type==='drop') {trails=e.cells.map((c,i)=>({x:c.x*30,y:Math.max(0,e.from[i]?.y||0)*30,end:c.y*30,life:.24,color:COLORS[c.t]}));shake=reduced?0:3;tone([90,140],.07,'triangle');}
  if(e.type==='lock')burst(e.cells);
  if(e.type==='rotate')tone([400],.035,'sine');
  if(e.type==='hold')tone([280,420],.06);
  if(e.type==='clear') {
    clearCelebration(e);
    toast(['','SINGLE','DOUBLE','TRIPLE','QUAD BREAK!'][e.n],`${e.b2b?'BACK TO BACK / ':''}+${e.points.toLocaleString()}${e.combo>0?' / '+e.combo+' COMBO':''}`);
    if(e.n===4)toastTime=1900;
  }
  if(e.type==='level')toast(`LEVEL ${e.level}`,'落下速度アップ');
  if(e.type==='skill') {
    const label={pulse:['PULSE BREAK','下段を突破','#f38ccc'],avalanche:['AVALANCHE','200 ENERGY / 全ブロック崩落','#54e5f4'],prism:['PRISM SHIFT','I ブロックへ変換','#b7ff63']}[e.name];
    toast(...label);burst(e.cells,3);
    if(e.name==='pulse'){beams.push(...e.cells.map(c=>({y:c.y*30,life:.55,color:'#f38ccc'})));shake=reduced?0:10;}
    if(!reduced){$('board-frame').classList.remove('pulse-fx','prism-fx');void $('board-frame').offsetWidth;$('board-frame').classList.add(e.name==='pulse'?'pulse-fx':'prism-fx');}
    tone(e.name==='avalanche'?[880,660,440]:[220,440,880],.22,'triangle');
  }
  // Defer the end screen until lock/spawn has completed all state changes.
  if(e.type==='end'){soundtrack.setPlaying(false);queueMicrotask(finish);}
}
function bindIntro() {
  content.querySelectorAll('[data-mode]').forEach(button=>{
    button.classList.toggle('selected',button.dataset.mode===mode);button.setAttribute('aria-pressed',button.dataset.mode===mode);
    button.onclick=()=>{mode=button.dataset.mode;bindIntro();updateHud();};
  });
  $('start').onclick=start;
}
function resetInput(){keyboard.reset();gestureBinding?.reset();}
function start() {
  document.body.classList.add('session-active');
  initAudio();clearEffects.reset();resetInput();particles=[];beams=[];trails=[];fallingCells=[];shake=0;flash=0;
  toastTime=0;$('toast').classList.remove('visible');
  game=new Game({mode,onEvent:event});soundtrack.setPlaying(true,true);rankingSession=beginRankingRun(mode);overlay.hidden=true;$('pause').disabled=false;
  last=performance.now();updateHud();canvas.focus({preventScroll:true});tone([220,330,440],.13);
  if(matchMedia('(max-width: 560px)').matches)window.scrollTo({top:0,behavior:'instant'});
}
function home() {
  soundtrack.setPlaying(false);clearEffects.reset();
  document.body.classList.remove('session-active');
  resetInput();game=null;particles=[];beams=[];trails=[];overlay.hidden=false;
  content.innerHTML=intro;bindIntro();$('pause').disabled=true;updateHud();$('start').focus({preventScroll:true});
}
function pause() {
  if(!game||game.state!=='playing')return;
  soundtrack.setPlaying(false);game.state='paused';resetInput();overlay.hidden=false;
  content.innerHTML='<span class="intro-symbol">Ⅱ</span><p class="eyebrow">TAKE A BREATH</p><h2>ひと休み。</h2><p class="overlay-copy">次の一手を、ゆっくり考えよう。</p><button id="resume" class="primary-button">RESUME <span>→</span></button><button id="return-home" class="secondary-button">このプレイを終了してモード選択へ</button>';
  $('resume').onclick=resume;$('return-home').onclick=home;updateHud();$('resume').focus({preventScroll:true});
}
function resume() {
  if(game?.state!=='paused'||dialog.open||rankingDialog.open)return;
  initAudio();game.state='playing';soundtrack.setPlaying(true);overlay.hidden=true;last=performance.now();resetInput();updateHud();canvas.focus({preventScroll:true});
}
function finish() {
  if(!game||!['over','won'].includes(game.state))return;
  soundtrack.setPlaying(false);resetInput();const record=saveRecord(),won=game.state==='won';overlay.hidden=false;$('pause').disabled=true;
  content.innerHTML=`<span class="intro-symbol">${won?'✦':'◇'}</span><p class="eyebrow">${record?'NEW PERSONAL BEST':won?'MISSION COMPLETE':'KEEP SHIFTING'}</p><h2>${won?'40ライン、突破。':'もう一度、その先へ。'}</h2><div class="result-score">${won?time(game.elapsed,true):game.score.toLocaleString()}</div><p class="result-detail">${won?'CLEAR TIME':'SCORE'}<br>${game.lines} LINES / LEVEL ${game.level} / ${time(game.elapsed)}</p><button id="retry" class="primary-button">PLAY AGAIN <span>↻</span></button><button id="return-home" class="secondary-button">モード選択へ</button>`;
  $('retry').onclick=start;$('return-home').onclick=home;updateHud();$('retry').focus({preventScroll:true});tone(won?[440,660,880,1100]:[330,220,110],.22);
  showRanking(mode,{score:game.score,lines:game.lines,duration:Math.max(1000,Math.round(game.elapsed)),won,session:rankingSession});
}
function action(name) {
  if(!game||game.state!=='playing'||game.cascade||dialog.open||rankingDialog.open)return;
  if(name==='left')game.move(-1);
  if(name==='right')game.move(1);
  if(name==='down')game.softDrop();
  if(name==='rotate')game.rotate(1);
  if(name==='rotateLeft')game.rotate(-1);
  if(name==='drop')game.hardDrop();
  if(name==='hold')game.holdPiece();
  if(name in SKILLS&&!game.useSkill(name))tone([100],.06,'triangle');
  updateHud();
}
document.addEventListener('keydown',e=>{
  if(dialog.open||rankingDialog.open||e.ctrlKey||e.metaKey||e.altKey||e.target.matches('input,select,textarea')||e.target.isContentEditable){resetInput();return;}
  if(['Space','Enter'].includes(e.code)&&e.target.closest('button,a'))return;
  if(e.code==='Enter'&&!game){e.preventDefault();start();return;}
  if(['KeyP','Escape'].includes(e.code)) {
    if(!game||!['playing','paused'].includes(game.state))return;
    e.preventDefault();if(e.repeat)return;game.state==='paused'?resume():pause();return;
  }
  if(!KEY_ACTIONS[e.code]||game?.state!=='playing'||game.cascade)return;
  e.preventDefault();gestureBinding?.reset();const name=keyboard.press(e.code,e.repeat);if(name)action(name);
});
window.addEventListener('keyup',e=>keyboard.release(e.code),true);
gestureBinding=bindGestures([canvas,$('gesture-pad')].filter(Boolean),{
  input:gestures,enabled:()=>game?.state==='playing'&&!game.cascade&&!dialog.open&&!rankingDialog.open,
  unit:()=>canvas.getBoundingClientRect().width/10,onBegin:()=>keyboard.reset()
});
document.querySelectorAll('[data-action]').forEach(button=>{
  button.addEventListener('click',()=>{resetInput();action(button.dataset.action);});
});
document.querySelectorAll('[data-skill]').forEach(button=>button.onclick=()=>{resetInput();action(button.dataset.skill);if(game?.state==='playing')canvas.focus({preventScroll:true});});
$('pause').onclick=()=>game?.state==='paused'?resume():pause();
window.addEventListener('blur',()=>{resetInput();pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){resetInput();pause();}});
function openHelp(){pause();dialog.showModal();}
$('ranking-open').onclick=()=>{pause();showRanking(mode);};
$('help').onclick=openHelp;$('settings').onclick=openHelp;
$('close-help').onclick=() => dialog.close();$('close-help-bottom').onclick=()=>dialog.close();
$('reduced-motion').onchange=e=>{reduced=e.target.checked;document.body.classList.toggle('reduced-motion',reduced);if(reduced){clearEffects.reset();particles=[];shake=0;flash=0;}try{localStorage.setItem('tk777-neonshift-motion',reduced?'reduced':'full');}catch{}};
$('sound').onclick=()=>{soundtrack.sfxEnabled=!soundtrack.sfxEnabled;if(game?.state==='playing')initAudio();syncAudioButtons();saveAudioSettings();};
window.addEventListener('pagehide',()=>{resetInput();pause();soundtrack.setPlaying(false);});
if($('button-controls')){
  try{$('button-controls').checked=localStorage.getItem('neonshift-buttons')==='show';}catch{}
  const sync=()=>{document.body.classList.toggle('show-button-controls',$('button-controls').checked);resetInput();};
  sync();$('button-controls').onchange=()=>{sync();try{localStorage.setItem('neonshift-buttons',$('button-controls').checked?'show':'hide');}catch{}};
}

function updateHud() {
  const g=game;
  $('score').textContent=String(g?.score||0).padStart(6,'0');
  $('best').textContent=mode==='sprint'?(records.sprint?time(records.sprint,true):'—'):records.arcade.toLocaleString();
  $('mode-label').textContent=mode==='arcade'?'ARCADE':'40 LINES';
  $('level').textContent=String(g?.level||1).padStart(2,'0');$('lines').textContent=String(g?.lines||0).padStart(2,'0');$('time').textContent=time(g?.elapsed||0);
  const energy=g?.energy??(mode==='arcade'?35:0);
  $('energy').textContent=energy;$('energy-bar').style.width=(energy/MAX_ENERGY*100)+'%';document.querySelector('.energy-track').setAttribute('aria-valuenow',energy);
  $('energy-state').textContent=mode==='sprint'?'SKILLS OFF':energy>=200?'AVALANCHE READY':energy>=60?'READY TO BURST':energy>=35?'SKILL AVAILABLE':'CHARGING';
  $('combo').innerHTML=`COMBO <b>${g&&g.combo>0?'×'+g.combo:'—'}</b>`;
  $('status').textContent=!g?'READY TO SHIFT':g.state==='paused'?'PAUSED':g.state==='over'?'GAME OVER':g.state==='won'?'COMPLETE':g.cascade?'AVALANCHE ACTIVE':'SYSTEM LIVE';
  $('pause').setAttribute('aria-label',g?.state==='paused'?'再開':'一時停止');
  $('hold-hint').textContent=g?.holdUsed?'次の設置で使えます':'ブロックを1つキープ';
  $('speed').textContent=((mode==='sprint'?800:850)/(g?.interval||850)).toFixed(1)+'× SPEED';
  $('progress').style.width=(mode==='sprint'?Math.min(100,(g?.lines||0)/40*100):((g?.lines||0)%10)*10)+'%';
  $('progress-label').textContent=mode==='sprint'?'40ラインまで':'次のレベルまで';
  $('progress-value').textContent=mode==='sprint'?`${g?.lines||0} / 40`:`${(g?.lines||0)%10} / 10`;
  $('mission-title').textContent=mode==='sprint'?'40ライン、最速へ。':(g?.lines||0)>0?'スキルで、突破。':'まずは、1ライン。';
  $('mission-copy').textContent=mode==='sprint'?'スキルなし・一定速度。ホールドと着地点ガイドを使いこなし、自己ベストを目指そう。':'横一列をそろえてエネルギーをチャージ。ピンチはスキルで切り抜けよう。';
  $('skill-hint').textContent=mode==='sprint'?'40 LINESではスキルを使用しません':'数字キー / タップで発動';
  document.querySelectorAll('[data-skill]').forEach(button=>{button.disabled=!g?.canUse(button.dataset.skill);});
  document.querySelectorAll('[data-action]').forEach(button=>button.disabled=g?.state!=='playing'||Boolean(g?.cascade));
  $('cascade-indicator').hidden=!g?.cascade;
  if(g?.cascade)$('cascade-indicator').querySelector('span').textContent=g.cascade.chain+' CHAIN';
  drawPreview($('hold'),g?.hold?[g.hold]:[],true);drawPreview($('next'),g?.queue.slice(0,5)||['T','I','S','L','O']);
}
function block(context,x,y,size,t,alpha=1,ghost=false) {
  const color=COLORS[t];context.save();context.globalAlpha=alpha;
  if(ghost){context.strokeStyle=color;context.lineWidth=1.2;context.strokeRect(x+2.5,y+2.5,size-5,size-5);context.fillStyle=color+'0c';context.fillRect(x+3,y+3,size-6,size-6);context.restore();return;}
  context.fillStyle=color;context.beginPath();context.roundRect(x+1.5,y+1.5,size-3,size-3,3);context.fill();
  const grad=context.createLinearGradient(x,y,x+size,y+size);grad.addColorStop(0,'#ffffff45');grad.addColorStop(.45,'#ffffff00');grad.addColorStop(1,'#00000040');context.fillStyle=grad;context.fill();
  context.strokeStyle='#ffffff50';context.lineWidth=.7;context.strokeRect(x+4.5,y+4.5,size-9,size-9);
  context.fillStyle='#ffffff55';context.fillRect(x+5,y+5,size-10,1);context.restore();
}
function drawPreview(c,types,isHold=false) {
  const pc=c.getContext('2d');pc.clearRect(0,0,c.width,c.height);
  if(!types.length){pc.fillStyle='#2c3d4e';pc.font='22px sans-serif';pc.textAlign='center';pc.fillText('—',c.width/2,c.height/2+7);return;}
  types.forEach((t,i)=>{
    const shape=SHAPES[t][0],cells=[];shape.forEach((row,y)=>row.forEach((v,x)=>{if(v)cells.push({x,y});}));
    const minX=Math.min(...cells.map(c=>c.x)),minY=Math.min(...cells.map(c=>c.y)),maxX=Math.max(...cells.map(c=>c.x)),maxY=Math.max(...cells.map(c=>c.y));
    const size=isHold?23:i===0?23:19,step=c.height/types.length;
    const ox=(c.width-(maxX-minX+1)*size)/2,oy=i*step+(step-(maxY-minY+1)*size)/2;
    cells.forEach(cell=>block(pc,ox+(cell.x-minX)*size,oy+(cell.y-minY)*size,size,t,isHold&&game?.holdUsed ? .42 : 1));
    if(!isHold&&i<types.length-1){pc.strokeStyle='#24344766';pc.beginPath();pc.moveTo(25,(i+1)*step);pc.lineTo(c.width-25,(i+1)*step);pc.stroke();}
  });
}
const demoRows=['J J... TTT .','JJJ .. T SS','L OO .. SS.','L OO IIII.','LL ZZ JJJ.','SS .ZZ J..'];
function render(dt) {
  ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,300,600);
  ctx.fillStyle='#0a1321';ctx.fillRect(0,0,300,600);ctx.save();
  if(shake>.1&&!reduced){ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);shake*=Math.pow(.005,dt);}
  ctx.lineWidth=.5;ctx.strokeStyle='#22344866';
  for(let x=0;x<=10;x++){ctx.beginPath();ctx.moveTo(x*30,0);ctx.lineTo(x*30,600);ctx.stroke();}
  for(let y=0;y<=20;y++){ctx.beginPath();ctx.moveTo(0,y*30);ctx.lineTo(300,y*30);ctx.stroke();}
  if(game) {
    const moving=new Set(fallingCells.map(c=>c.x+','+c.y));
    game.board.forEach((row,y)=>row.forEach((t,x)=>{if(t&&!moving.has(x+','+y))block(ctx,x*30,y*30,30,t);}));
    for(const cell of fallingCells){const f=reduced?1:1-cell.life/.1;block(ctx,cell.x*30,(cell.fromY+(cell.y-cell.fromY)*f)*30,30,cell.t);}
    if(['playing','paused'].includes(game.state)&&!game.cascade) {
      game.cells(game.ghost()).forEach(c=>block(ctx,c.x*30,c.y*30,30,c.t,.75,true));
      game.cells().forEach(c=>block(ctx,c.x*30,c.y*30,30,c.t));
    }
    if(game.board.slice(0,4).some(row=>row.some(Boolean))){ctx.fillStyle='#f7789b12';ctx.fillRect(0,0,300,120);ctx.strokeStyle='#f7789b66';ctx.strokeRect(1,1,298,598);}
    if(game.cascade){ctx.strokeStyle='#54e5f4';ctx.lineWidth=2;ctx.strokeRect(1,1,298,598);}
  } else {
    demoRows.forEach((row,i)=>[...row.replaceAll(' ','').padEnd(10,'.').slice(0,10)].forEach((t,x)=>{if(COLORS[t])block(ctx,x*30,(14+i)*30,30,t,.55);}));
    block(ctx,90,90,30,'T',.3);block(ctx,120,90,30,'T',.3);block(ctx,150,90,30,'T',.3);block(ctx,120,60,30,'T',.3);
  }
  if(game?.state==='playing')fallingCells=fallingCells.filter(c=>(c.life-=dt)>0);
  trails=trails.filter(t=>(t.life-=dt)>0);for(const t of trails){if(reduced)continue;const gradient=ctx.createLinearGradient(0,t.y,0,Math.max(t.y+1,t.end+30));gradient.addColorStop(0,'#54e5f400');gradient.addColorStop(1,t.color+'99');ctx.globalAlpha=t.life/.24;ctx.fillStyle=gradient;ctx.fillRect(t.x+3,t.y,24,t.end-t.y+30);}ctx.globalAlpha=1;
  beams=beams.filter(b=>(b.life-=dt)>0);for(const b of beams){ctx.globalAlpha=b.life*.65;ctx.fillStyle=b.color;ctx.fillRect(0,b.y,300,30);}ctx.globalAlpha=1;
  particles=particles.filter(p=>(p.life-=dt)>0);for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=220*dt;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);}ctx.globalAlpha=1;
  clearEffects.draw(ctx,dt);
  if(flash>0){ctx.fillStyle=`rgba(183,255,99,${flash})`;ctx.fillRect(0,0,300,600);flash=Math.max(0,flash-dt*.6);}ctx.restore();
}
function frame(now) {
  const elapsed=Math.max(0,now-last),dt=Math.min(50,elapsed);last=now;
  if(game?.state==='playing') {
    // Sprint records measure real play time even when rendering temporarily stalls.
    game.elapsed+=elapsed-dt;game.update(dt);
  }
  if(toastTime>0){toastTime-=dt;if(toastTime<=0)$('toast').classList.remove('visible');}
  hudTime+=dt;if(hudTime>=80){updateHud();hudTime=0;}
  render(dt/1000);requestAnimationFrame(frame);
}
bindIntro();updateHud();requestAnimationFrame(frame);
