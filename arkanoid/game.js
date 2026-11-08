(() => {
  'use strict';
  const W=560,H=660,WL=21,PY=603,COLS=10,GAP=5,BX=33,BY=91;
  const BW=(W-BX*2-GAP*(COLS-1))/COLS,BH=23;
  const palette=['#8df8cf','#75d9ec','#b7a3ff','#ffd985','#ff897d','#a2efb8','#8bbaff'];
  const powers={wide:['WIDE','↔','#8df8cf'],multi:['MULTI','✣','#b7a3ff'],shield:['SHIELD','▰','#ff897d'],laser:['LASER','ϟ','#ffd985']};
  const $=id=>document.getElementById(id);
  const ui={canvas:$('board'),score:$('scoreValue'),wave:$('waveValue'),lives:$('livesValue'),combo:$('comboValue'),
    status:$('statusText'),mode:$('modeText'),energy:$('energyNumber'),bar:$('energyBar'),
    meter:document.querySelector('.energy-meter'),surgeState:$('surgeState'),power:$('powerStatus'),
    toast:$('toast'),menu:$('menuOverlay'),pause:$('pauseOverlay'),over:$('gameoverOverlay'),
    final:$('finalScore'),finalCopy:$('finalCopy'),start:$('startBtn'),retry:$('retryBtn'),
    launch:$('launchBtn'),surge:$('surgeBtn'),pauseBtn:$('pauseBtn'),restart:$('restartBtn'),
    rank:$('rankBtn'),saveRank:$('saveRankBtn'),sound:$('soundBtn')};
  const ctx=ui.canvas.getContext('2d');
  const dpr=Math.min(2,window.devicePixelRatio||1);
  ui.canvas.width=Math.round(W*dpr);ui.canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const modes=[{value:'arkanoid:solo',label:'ひとりで挑戦'},{value:'arkanoid:coop',label:'ふたりで協力'}];
  const stars=Array.from({length:54},(_,i)=>({x:25+(i*127+37)%510,y:35+(i*83+19)%560,r:i%5===0?1.2:.6,p:i*.37}));
  let state='menu',mode='solo',score=0,lives=3,wave=1,energy=0,combo=0,comboUntil=0,clock=0;
  let bricks=[],balls=[],paddles=[],drops=[],bullets=[],particles=[];
  let shield=0,laserAmmo=0,wideUntil=0,surgeUntil=0,flash=0,shake=0;
  let session=null,startedAt=0,result=null,serial=0,toastTimer=null;
  let waveRemaining=0,pausedFrom='playing';
  let frame=0,lastFrame=0,soundOn=false,audio=null;
  const keys=new Set(),activePointers=new Map();
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const rand=(a,b)=>a+Math.random()*(b-a);
  const rankOpen=()=>Boolean(window.TKLeaderboard?.isOpen?.());
  const rankMode=()=>mode==='coop'?'arkanoid:coop':'arkanoid:solo';
  const baseSpeed=()=>Math.min(480,335+(wave-1)*25);
  function path(x,y,w,h,r){
    r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);
    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
  }
  function beep(freq,duration,type='triangle',volume=.025){
    if(!soundOn)return;
    try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
      if(!audio)audio=new Audio();if(audio.state==='suspended')audio.resume();
      const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;
      o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(70,freq*.68),t+duration);
      g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
      o.connect(g).connect(audio.destination);o.start(t);o.stop(t+duration+.01);
    }catch{}
  }
  function toast(message,duration=1600){ui.toast.textContent=message;ui.toast.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>ui.toast.classList.remove('show'),duration);}
  function burst(x,y,color,n=12,force=130){if(reduced.matches)n=Math.min(n,4);
    for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),s=rand(force*.35,force);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:rand(.3,.7),r:rand(1.5,4),color});}
    if(particles.length>240)particles.splice(0,particles.length-240);}
  function makePaddles(){const w=94;paddles=mode==='coop'
    ?[{id:0,x:W*.25,target:W*.25,y:PY,w,min:WL+3,max:W/2-4,color:'#8df8cf',vx:0},
      {id:1,x:W*.75,target:W*.75,y:PY,w,min:W/2+4,max:W-WL-3,color:'#b7a3ff',vx:0}]
    :[{id:0,x:W/2,target:W/2,y:PY,w,min:WL+3,max:W-WL-3,color:'#8df8cf',vx:0}];}
  function clampPad(p,x){return clamp(x,p.min+p.w/2,p.max-p.w/2);}
  function moveTarget(id,x){const p=paddles[id];if(p)p.target=clampPad(p,x);}
  function attachBall(){const p=paddles[0];balls=[{x:p.x,y:p.y-16,px:p.x,py:p.y-16,vx:0,vy:0,r:7.5,
    attached:true,trail:[],dead:false}];}
  function makeWave(){bricks=[];let id=0;const rows=Math.min(7,5+Math.floor((wave-1)/2));
    for(let r=0;r<rows;r++)for(let c=0;c<COLS;c++){if((wave+r*2+c*3)%13===0&&r>0)continue;
      const hp=wave>1&&(r+c*2+wave)%6===0?2:1;
      bricks.push({id:++id,x:BX+c*(BW+GAP),y:BY+r*(BH+5),w:BW,h:BH,hp,
        gem:(r*3+c*5+wave)%11===0,alive:true,color:palette[(r+wave-1)%palette.length],lastHit:-10});}}
  function selectMode(next){if(['playing','paused','transition'].includes(state))return;
    mode=next==='coop'?'coop':'solo';document.body.classList.toggle('is-solo',mode==='solo');
    document.body.classList.toggle('is-coop',mode==='coop');ui.mode.textContent=mode==='coop'?'CO-OP MODE':'SOLO MODE';
    document.querySelectorAll('.mode').forEach(b=>{const yes=b.dataset.mode===mode;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));});
    makePaddles();attachBall();sync();}
  function start(){clearTimeout(toastTimer);serial++;
    score=0;lives=3;wave=1;energy=0;combo=0;comboUntil=0;clock=0;shield=0;laserAmmo=0;wideUntil=0;surgeUntil=0;
    flash=0;shake=0;drops=[];bullets=[];particles=[];result=null;startedAt=Date.now();waveRemaining=0;pausedFrom='playing';
    session=window.TKLeaderboard?window.TKLeaderboard.start(rankMode()):Promise.resolve(null);
    makePaddles();makeWave();attachBall();state='playing';keys.clear();activePointers.clear();
    ui.menu.hidden=true;ui.pause.hidden=true;ui.over.hidden=true;ui.status.textContent='BALL READY · 発射してスタート';
    ui.canvas.focus({preventScroll:true});toast('WAVE 01 · START!');beep(500,.11);sync();
    // The mobile heading collapses for play; keep the newly visible board in view.
    const run=serial;requestAnimationFrame(()=>{
      if(run!==serial||state!=='playing'||!window.matchMedia('(max-width: 620px)').matches)return;
      const boardTop=ui.canvas.getBoundingClientRect().top+window.scrollY;
      window.scrollTo(0,Math.max(0,boardTop-72));
    });}
  function pause(){if(state!=='playing'&&state!=='transition')return;
    pausedFrom=state;state='paused';keys.clear();activePointers.clear();
    ui.pause.hidden=false;ui.status.textContent='PAUSED';sync();}
  function resume(){if(state!=='paused')return;state=pausedFrom;ui.pause.hidden=true;
    ui.status.textContent=state==='transition'?'WAVE CLEAR':balls.some(b=>b.attached)?'BALL READY · 発射してスタート':'IN PLAY · KEEP THE FLOW';
    ui.canvas.focus({preventScroll:true});lastFrame=performance.now();sync();}
  function togglePause(){if(state==='playing'||state==='transition')pause();else if(state==='paused')resume();}
  function fire(){if(state==='menu'||state==='gameover'){start();return;}if(state==='paused'){resume();return;}
    if(state!=='playing')return;const b=balls.find(x=>x.attached);
    if(b){const p=paddles[0];p.x=clampPad(p,p.target);p.vx=0;b.x=p.x;b.y=p.y-16;
      const angle=-Math.PI/2+rand(-.32,.32),s=baseSpeed();
      b.vx=Math.cos(angle)*s;b.vy=Math.sin(angle)*s;b.attached=false;
      ui.status.textContent='IN PLAY · KEEP THE FLOW';beep(670,.13);sync();return;}
    if(laserAmmo<=0)return;laserAmmo--;paddles.forEach(p=>{
      bullets.push({x:p.x-p.w*.32,y:p.y-8,vy:-650},{x:p.x+p.w*.32,y:p.y-8,vy:-650});});
    burst(paddles[0].x,PY,'#ffd985',6,95);beep(850,.08,'sawtooth',.018);sync();}
  function surge(){if(state!=='playing'||energy<100||clock<surgeUntil)return;
    energy=0;surgeUntil=clock+8;flash=.55;shake=reduced.matches?0:7;
    burst(W/2,H/2,'#ffd985',45,210);toast('✦ OVERDRIVE! 8秒間貫通',2300);beep(310,.24,'sawtooth',.035);sync();}
  function lostBall(){lives--;combo=0;if(lives<=0){finish();return;}
    attachBall();ui.status.textContent='BALL LOST · 再発射して続行';
    toast('残り '+lives+' ライフ');beep(170,.27,'sawtooth',.036);sync();}
  function finish(){if(state==='gameover')return;waveRemaining=0;state='gameover';keys.clear();activePointers.clear();
    ui.status.textContent='RUN COMPLETE';const key='tk777-arkanoid-best-'+mode;let best=0;
    try{best=Number(localStorage.getItem(key))||0;}catch{}
    if(score>best){try{localStorage.setItem(key,String(score));}catch{}
      ui.finalCopy.textContent='自己ベスト更新！世界のTOP10にも挑戦しよう。';
    }else ui.finalCopy.textContent='世界のTOP10に記録を残そう。';
    ui.final.textContent=score.toLocaleString('ja-JP');ui.over.hidden=false;
    result={mode:rankMode(),label:'アルカノイド',score:Math.round(score),duration:Math.max(100,Date.now()-startedAt),
      session,modeOptions:modes,note:'SOLOとCO-OPは別ランキング。スコアが高い順に表示します。'};
    beep(180,.35);sync();}
  function showRanking(){if(!window.TKLeaderboard)return;if(state==='playing'||state==='transition')pause();
    if(state==='gameover'&&result)window.TKLeaderboard.open(result);
    else window.TKLeaderboard.show({mode:rankMode(),label:'アルカノイド',modeOptions:modes,
      note:'SOLOとCO-OPは別ランキング。スコアが高い順に表示します。'});}
  function dropFrom(brick){const types=Object.keys(powers),type=types[Math.floor(Math.random()*types.length)];
    drops.push({x:brick.x+brick.w/2,y:brick.y+brick.h/2,type,vy:128});}
  function collect(drop){drop.dead=true;const power=powers[drop.type];
    if(drop.type==='wide')wideUntil=clock+17;
    if(drop.type==='shield')shield=Math.min(2,shield+1);
    if(drop.type==='laser')laserAmmo=Math.min(16,laserAmmo+8);
    if(drop.type==='multi'){const b=balls.find(x=>!x.attached);
      if(b){const angle=Math.atan2(b.vy,b.vx),speed=Math.hypot(b.vx,b.vy);
        [-.36,.36].forEach(offset=>{if(balls.length<6)balls.push({x:b.x,y:b.y,px:b.x,py:b.y,
          vx:Math.cos(angle+offset)*speed,vy:Math.sin(angle+offset)*speed,r:7.5,attached:false,trail:[],dead:false});});
      }else energy=clamp(energy+20,0,100);}
    score+=100;energy=clamp(energy+8,0,100);toast(power[0]+' GET!');
    burst(drop.x,drop.y,power[2],17,140);beep(760,.18);sync();}
  function hit(brick){if(!brick.alive||clock-brick.lastHit<.065)return;
    brick.lastHit=clock;brick.hp--;const alive=brick.hp>0;
    if(!alive){brick.alive=false;if(brick.gem||Math.random()<.1)dropFrom(brick);}
    combo=clock<=comboUntil?combo+1:1;comboUntil=clock+2.7;
    const multiplier=Math.min(5,1+Math.floor((combo-1)/4));
    score+=(alive?35:100)*multiplier;energy=clamp(energy+(alive?3:7),0,100);
    burst(brick.x+brick.w/2,brick.y+brick.h/2,brick.color,alive?9:17,140);
    flash=Math.max(flash,alive?0.07:0.12);shake=reduced.matches?0:Math.max(shake,alive?1.5:3.3);
    if([5,10,20].includes(combo))toast('COMBO ×'+combo+'!',1200);
    beep(230+Math.min(combo*28,420),.075);sync();
    if(bricks.every(b=>!b.alive))clearWave();}
  function clearWave(){if(state!=='playing')return;state='transition';score+=wave*500;waveRemaining=1.5;
    flash=.8;shake=reduced.matches?0:8;burst(W/2,230,'#ffd985',55,240);
    toast('WAVE '+String(wave).padStart(2,'0')+' CLEAR! +'+wave*500,2000);
    ui.status.textContent='WAVE CLEAR';
    beep(980,.27);sync();}
  function nextWave(){wave++;combo=0;drops=[];bullets=[];makeWave();makePaddles();attachBall();
    state='playing';ui.status.textContent='BALL READY · 次の波へ';sync();}
  function updatePaddles(dt){paddles.forEach(p=>{
    p.w=clock<wideUntil?133:94;p.x=clampPad(p,p.x);p.target=clampPad(p,p.target);
    let dir=0;
    if(p.id===0){if(keys.has('ArrowLeft')||(mode==='solo'&&keys.has('KeyA')))dir--;
      if(keys.has('ArrowRight')||(mode==='solo'&&keys.has('KeyD')))dir++;}
    else{if(keys.has('KeyA'))dir--;if(keys.has('KeyD'))dir++;}
    const before=p.x;
    if(dir){p.x=clampPad(p,p.x+dir*490*dt);p.target=p.x;}
    else p.x+=(p.target-p.x)*Math.min(1,dt*16);
    p.vx=dt?(p.x-before)/dt:0;});
    balls.forEach(b=>{if(b.attached){b.x=paddles[0].x;b.y=paddles[0].y-16;}});}
  function paddleHit(b,p){if(b.vy<=0||b.py+b.r>p.y+8)return false;
    if(b.y+b.r<p.y||b.y-b.r>p.y+15||b.x<p.x-p.w/2-b.r||b.x>p.x+p.w/2+b.r)return false;
    b.y=p.y-b.r-.5;const speed=Math.min(525,Math.max(baseSpeed(),Math.hypot(b.vx,b.vy)+4));
    b.vx=clamp((b.x-p.x)/(p.w/2)*speed*.77+p.vx*.14,-speed*.83,speed*.83);
    b.vy=-Math.sqrt(Math.max(speed*speed-b.vx*b.vx,speed*speed*.3));
    combo=0;burst(b.x,b.y+4,p.color,9,90);beep(420,.075);sync();return true;}
  function brickHit(b,brick){if(!brick.alive||clock-brick.lastHit<.065)return false;
    const cx=clamp(b.x,brick.x,brick.x+brick.w),cy=clamp(b.y,brick.y,brick.y+brick.h);
    const dx=b.x-cx,dy=b.y-cy;if(dx*dx+dy*dy>b.r*b.r)return false;
    hit(brick);if(clock<surgeUntil)return true;
    if(b.py+b.r<=brick.y){b.y=brick.y-b.r-.5;b.vy=-Math.abs(b.vy);}
    else if(b.py-b.r>=brick.y+brick.h){b.y=brick.y+brick.h+b.r+.5;b.vy=Math.abs(b.vy);}
    else if(b.px+b.r<=brick.x){b.x=brick.x-b.r-.5;b.vx=-Math.abs(b.vx);}
    else if(b.px-b.r>=brick.x+brick.w){b.x=brick.x+brick.w+b.r+.5;b.vx=Math.abs(b.vx);}
    else b.vy*=-1;
    return true;}
  function stepBalls(dt){for(const b of balls){if(b.attached||b.dead)continue;
    b.px=b.x;b.py=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;
    if(b.x-b.r<WL){b.x=WL+b.r;b.vx=Math.abs(b.vx);}
    if(b.x+b.r>W-WL){b.x=W-WL-b.r;b.vx=-Math.abs(b.vx);}
    if(b.y-b.r<24){b.y=24+b.r;b.vy=Math.abs(b.vy);}
    let caught=false;for(const p of paddles)if(paddleHit(b,p)){caught=true;break;}
    if(!caught)for(const brick of bricks)if(brickHit(b,brick)&&clock>=surgeUntil)break;
    if(shield>0&&b.vy>0&&b.py+b.r<=H-18&&b.y+b.r>=H-18){
      b.y=H-18-b.r;b.vy=-Math.abs(b.vy);shield--;burst(b.x,H-18,'#ff897d',24,130);
      toast('SHIELD SAVE!');beep(180,.19,'sawtooth');sync();}
    if(b.y-b.r>H+8)b.dead=true;}
    balls=balls.filter(b=>!b.dead);if(!balls.length&&state==='playing')lostBall();}
  function updateDrops(dt){for(const d of drops){d.y+=d.vy*dt;
    for(const p of paddles)if(d.y>=p.y-13&&d.y<=p.y+19&&Math.abs(d.x-p.x)<p.w/2+12){collect(d);break;}
    if(d.y>H+20)d.dead=true;}
    drops=drops.filter(d=>!d.dead);}
  function updateBullets(dt){for(const bullet of bullets){bullet.y+=bullet.vy*dt;
    if(bullet.y<24){bullet.dead=true;continue;}
    for(const brick of bricks)if(brick.alive&&bullet.x>=brick.x&&bullet.x<=brick.x+brick.w
      &&bullet.y>=brick.y&&bullet.y<=brick.y+brick.h){bullet.dead=true;hit(brick);break;}}
    bullets=bullets.filter(b=>!b.dead);}
  function updateParticles(dt){for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;
    p.vy+=110*dt;p.vx*=Math.max(0,1-dt*1.2);p.life-=dt;}
    particles=particles.filter(p=>p.life>0);}
  function sync(){ui.score.textContent=String(score).padStart(6,'0');ui.wave.textContent=String(wave).padStart(2,'0');
    ui.lives.textContent=lives>0?Array.from({length:lives},()=> '♥').join(' '):'—';
    ui.combo.textContent=combo?'×'+Math.min(5,1+Math.floor((combo-1)/4)):'×1';
    ui.energy.textContent=energy+' / 100';ui.bar.style.width=energy+'%';ui.surge.dataset.energy=Math.round(energy)+'%';
    ui.meter.setAttribute('aria-valuenow',String(energy));
    const powered=clock<surgeUntil;
    ui.surge.disabled=state!=='playing'||energy<100||powered;
    ui.surge.classList.toggle('ready',energy>=100&&state==='playing'&&!powered);
    ui.surge.classList.toggle('active',powered);
    ui.surgeState.textContent=powered?'発動中 · '+Math.ceil(surgeUntil-clock)+'秒':energy>=100?'発動できます！':'チャージ中';
    ui.launch.disabled=!((state==='playing'&&(balls.some(b=>b.attached)||laserAmmo>0))||state==='paused');
    ui.launch.querySelector('span').textContent=laserAmmo>0&&!balls.some(b=>b.attached)?'LASER ×'+laserAmmo:'発射 / FIRE';
    ui.pauseBtn.disabled=state!=='playing'&&state!=='paused'&&state!=='transition';
    ui.pauseBtn.querySelector('span').textContent=state==='paused'?'再開':'一時停止';
    ui.restart.disabled=state==='menu'||state==='gameover';
    document.querySelectorAll('.mode').forEach(b=>b.disabled=['playing','paused','transition'].includes(state));
    const effects=[];if(clock<wideUntil)effects.push('WIDE '+Math.ceil(wideUntil-clock)+'秒');
    if(shield)effects.push('SHIELD ×'+shield);if(laserAmmo)effects.push('LASER ×'+laserAmmo);
    ui.power.textContent=effects.length?effects.join(' · '):'アイテムを集めて、盤面をひっくり返そう。';
    document.body.classList.toggle('session-active',['playing','paused','transition'].includes(state));}
  function update(dt){frame++;
    if(state==='playing'&&!rankOpen()){
      clock+=dt;if(combo&&clock>comboUntil){combo=0;sync();}
      updatePaddles(dt);
      const steps=Math.max(1,Math.ceil(dt/(1/150))),step=dt/steps;
      for(let i=0;i<steps&&state==='playing';i++){
        stepBalls(step);if(state!=='playing')break;
        updateBullets(step);if(state!=='playing')break;
        updateDrops(step);
      }
      if(clock>=surgeUntil&&ui.surge.classList.contains('active'))sync();
    }
    if(state==='transition'&&!rankOpen()){
      waveRemaining-=dt;if(waveRemaining<=0)nextWave();
    }
    if(state!=='paused')updateParticles(dt);
    flash=Math.max(0,flash-dt*2.1);shake=Math.max(0,shake-dt*18);}
  function background(){const g=ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,'#102a30');g.addColorStop(.55,'#0b1e28');g.addColorStop(1,'#071821');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='#9af6dc0c';ctx.lineWidth=1;
    for(let x=30;x<W;x+=36){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=35;y<H;y+=36){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    stars.forEach(s=>{ctx.globalAlpha=reduced.matches?0.33:0.18+0.14*Math.sin(frame*.02+s.p);
      ctx.fillStyle='#c8fff0';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();});
    ctx.globalAlpha=1;ctx.fillStyle='#7dbbb3';ctx.font='700 10px "Space Grotesk", sans-serif';
    ctx.fillText('P R I S M   B R E A K',34,53);ctx.textAlign='right';
    ctx.fillText('W A V E   '+String(wave).padStart(2,'0'),W-34,53);ctx.textAlign='left';
    ctx.strokeStyle='#59978877';ctx.lineWidth=2;ctx.beginPath();
    ctx.moveTo(WL,24);ctx.lineTo(WL,H-12);ctx.moveTo(W-WL,24);ctx.lineTo(W-WL,H-12);
    ctx.moveTo(WL,24);ctx.lineTo(W-WL,24);ctx.stroke();
    const glow=ctx.createLinearGradient(0,H-115,0,H);
    glow.addColorStop(0,'#6fe5be00');glow.addColorStop(1,'#6fe5be0d');
    ctx.fillStyle=glow;ctx.fillRect(WL,H-115,W-WL*2,115);
    if(mode==='coop'){ctx.strokeStyle='#b7a3ff42';ctx.setLineDash([6,8]);
      ctx.beginPath();ctx.moveTo(W/2,H-98);ctx.lineTo(W/2,H-13);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#a9a8d5';ctx.font='700 9px "Space Grotesk", sans-serif';
      ctx.fillText('P1',WL+12,H-34);ctx.textAlign='right';ctx.fillText('P2',W-WL-12,H-34);ctx.textAlign='left';}}
  function drawBricks(){for(const b of bricks){if(!b.alive)continue;ctx.save();
    ctx.shadowColor=b.color;ctx.shadowBlur=b.hp>1?5:11;
    ctx.fillStyle=b.hp>1?'#244049':b.color;path(b.x,b.y,b.w,b.h,5);ctx.fill();
    ctx.shadowBlur=0;ctx.strokeStyle=b.color;ctx.lineWidth=b.hp>1?2:1;
    path(b.x+.5,b.y+.5,b.w-1,b.h-1,5);ctx.stroke();
    ctx.fillStyle=b.hp>1?b.color:'#ffffff66';ctx.fillRect(b.x+5,b.y+4,b.w-10,2);
    if(b.gem){ctx.fillStyle=b.hp>1?'#f7e9a6':'#193538';ctx.font='700 15px sans-serif';
      ctx.textAlign='center';ctx.fillText('✦',b.x+b.w/2,b.y+17);ctx.textAlign='left';}ctx.restore();}}
  function drawPaddles(){for(const p of paddles){const x=p.x-p.w/2;ctx.save();
    ctx.shadowColor=p.color;ctx.shadowBlur=20;const g=ctx.createLinearGradient(x,p.y,x+p.w,p.y);
    g.addColorStop(0,p.color);g.addColorStop(.5,'#f8fff6');g.addColorStop(1,p.color);
    ctx.fillStyle=g;path(x,p.y,p.w,13,7);ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#ffffff80';path(x+11,p.y+2,p.w-22,2,1);ctx.fill();ctx.restore();}}
  function drawBalls(){for(const b of balls){if(!b.attached&&!reduced.matches){
      b.trail.push({x:b.x,y:b.y});if(b.trail.length>11)b.trail.shift();}
    const bright=clock<surgeUntil;b.trail.forEach((p,i)=>{ctx.globalAlpha=(i+1)/b.trail.length*.19;
      ctx.fillStyle=bright?'#ffd985':'#8df8cf';ctx.beginPath();
      ctx.arc(p.x,p.y,b.r*(i+1)/b.trail.length,0,Math.PI*2);ctx.fill();});
    ctx.globalAlpha=1;ctx.save();ctx.shadowColor=bright?'#ffd985':'#a5ffe2';
    ctx.shadowBlur=bright?26:16;ctx.fillStyle=bright?'#fff0b2':'#f4fff8';
    ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();ctx.restore();
    if(b.attached){ctx.strokeStyle='#8df8cf88';ctx.setLineDash([3,7]);
      ctx.beginPath();ctx.moveTo(b.x,b.y-13);ctx.lineTo(b.x,b.y-72);ctx.stroke();ctx.setLineDash([]);}}}
  function drawDrops(){for(const d of drops){const info=powers[d.type];ctx.save();
    ctx.shadowColor=info[2];ctx.shadowBlur=14;ctx.fillStyle='#102a30';
    ctx.strokeStyle=info[2];ctx.lineWidth=2;path(d.x-17,d.y-12,34,24,8);ctx.fill();ctx.stroke();
    ctx.shadowBlur=0;ctx.fillStyle=info[2];ctx.font='700 16px sans-serif';
    ctx.textAlign='center';ctx.fillText(info[1],d.x,d.y+5);ctx.textAlign='left';ctx.restore();}}
  function drawBullets(){ctx.save();ctx.fillStyle='#ffd985';ctx.shadowColor='#ffd985';ctx.shadowBlur=12;
    for(const b of bullets){path(b.x-2,b.y-9,4,14,2);ctx.fill();}ctx.restore();}
  function drawParticles(){for(const p of particles){ctx.globalAlpha=clamp(p.life/.7,0,1);
    ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
  function drawShield(){if(!shield)return;ctx.save();ctx.strokeStyle='#ff897d';ctx.lineWidth=4;
    ctx.shadowColor='#ff897d';ctx.shadowBlur=18;ctx.beginPath();
    ctx.moveTo(WL+8,H-18);ctx.lineTo(W-WL-8,H-18);ctx.stroke();ctx.restore();}
  function render(){ctx.save();if(!reduced.matches&&shake>0)ctx.translate(rand(-shake,shake),rand(-shake,shake));
    background();drawBricks();drawShield();drawDrops();drawBullets();drawPaddles();drawBalls();drawParticles();
    if(flash>0){ctx.fillStyle='#e8fff4';ctx.globalAlpha=flash*.24;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;}ctx.restore();}
  function pointerPos(e){const r=ui.canvas.getBoundingClientRect();
    return{x:clamp((e.clientX-r.left)/r.width*W,WL,W-WL),y:clamp((e.clientY-r.top)/r.height*H,0,H)};}
  function pointerPad(x){return mode==='coop'&&x>=W/2?1:0;}
  function pointerMove(e){if(state!=='playing'||rankOpen())return;
    const active=activePointers.get(e.pointerId);
    if(e.pointerType==='mouse'||active){e.preventDefault();
      const pos=pointerPos(e);moveTarget(active?.pad??pointerPad(pos.x),pos.x);}}
  function pointerDown(e){if(state!=='playing'||rankOpen())return;e.preventDefault();
    const pos=pointerPos(e),pad=pointerPad(pos.x);moveTarget(pad,pos.x);
    activePointers.set(e.pointerId,{x:pos.x,y:pos.y,pad,when:performance.now()});
    try{ui.canvas.setPointerCapture(e.pointerId);}catch{}
    if(e.pointerType==='mouse')fire();}
  function pointerEnd(e,cancelled){const start=activePointers.get(e.pointerId);activePointers.delete(e.pointerId);
    if(!start)return;e.preventDefault();
    if(!cancelled&&e.pointerType!=='mouse'&&state==='playing'){
      const pos=pointerPos(e);if(Math.hypot(pos.x-start.x,pos.y-start.y)<17
        &&performance.now()-start.when<450)fire();}
    try{if(ui.canvas.hasPointerCapture(e.pointerId))ui.canvas.releasePointerCapture(e.pointerId);}catch{}}
  function keyDown(e){if(rankOpen()||/^(INPUT|TEXTAREA|SELECT|A)$/.test(e.target?.tagName)
      ||e.target?.isContentEditable)return;
    if(e.target?.tagName==='BUTTON'&&(e.code==='Space'||e.code==='Enter'))return;
    if(!['ArrowLeft','ArrowRight','KeyA','KeyD','Space','Enter','ShiftLeft','ShiftRight','KeyP','Escape','KeyR'].includes(e.code))return;
    e.preventDefault();const fresh=!keys.has(e.code);keys.add(e.code);if(!fresh)return;
    if(e.code==='Space'||e.code==='Enter')fire();
    else if(e.code==='ShiftLeft'||e.code==='ShiftRight')surge();
    else if(e.code==='KeyP'||e.code==='Escape')togglePause();
    else if(e.code==='KeyR'&&['playing','paused','transition'].includes(state))start();}
  function loop(ts){requestAnimationFrame(loop);if(!lastFrame)lastFrame=ts;
    const dt=clamp((ts-lastFrame)/1000,0,.033);lastFrame=ts;update(dt);render();
    if(state==='playing'&&clock<surgeUntil&&frame%10===0)sync();}
  document.querySelectorAll('.mode').forEach(b=>b.addEventListener('click',()=>selectMode(b.dataset.mode)));
  ui.start.addEventListener('click',start);ui.retry.addEventListener('click',start);
  ui.launch.addEventListener('click',fire);ui.surge.addEventListener('click',surge);
  ui.pauseBtn.addEventListener('click',togglePause);$('resumeBtn').addEventListener('click',resume);
  ui.restart.addEventListener('click',start);ui.rank.addEventListener('click',showRanking);
  ui.saveRank.addEventListener('click',showRanking);
  ui.sound.addEventListener('click',()=>{soundOn=!soundOn;ui.sound.setAttribute('aria-pressed',String(soundOn));
    ui.sound.setAttribute('aria-label',soundOn?'サウンドをオフにする':'サウンドをオンにする');
    ui.sound.querySelector('span').textContent=soundOn?'ON':'OFF';if(soundOn)beep(720,.1);});
  document.querySelectorAll('[data-pad][data-step]').forEach(b=>b.addEventListener('click',()=>{
    if(state!=='playing')return;const id=Number(b.dataset.pad),dir=Number(b.dataset.step),p=paddles[id];
    if(p){moveTarget(id,p.target+dir*46);beep(430,.045,'sine',.012);}}));
  ui.canvas.addEventListener('pointerdown',pointerDown);ui.canvas.addEventListener('pointermove',pointerMove);
  ui.canvas.addEventListener('pointerup',e=>pointerEnd(e,false));
  ui.canvas.addEventListener('pointercancel',e=>pointerEnd(e,true));
  ui.canvas.addEventListener('lostpointercapture',e=>activePointers.delete(e.pointerId));
  document.addEventListener('keydown',keyDown,{passive:false});
  document.addEventListener('keyup',e=>keys.delete(e.code));
  window.addEventListener('blur',()=>{keys.clear();activePointers.clear();});
  window.addEventListener('gamefullscreenchange',()=>{keys.clear();activePointers.clear();for(const paddle of paddles)paddle.target=paddle.x;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();activePointers.clear();pause();}});
  makePaddles();makeWave();attachBall();sync();requestAnimationFrame(loop);
})();
