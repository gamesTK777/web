import {drawCombatUnit,RENDER_PALETTE} from './renderer.mjs?v=20261108-combat';

// Original cel-anime battle cut-ins. One drawn body always means one remaining HP.
const W=1280,H=520,P=W/2,INK=RENDER_PALETTE.ink||'#244456',TAU=Math.PI*2;
const PALETTES=[{body:'#ff805d',light:'#ffe2a5',dark:'#ab4d58'},{body:'#41b2dc',light:'#b6edf0',dark:'#356d91'}];
const NAMES={infantry:'歩兵',recon:'偵察車',tank:'戦車',heavy:'重戦車',artillery:'砲兵',antiair:'対空車',fighter:'戦闘機',helicopter:'攻撃ヘリ'};
const AIR=new Set(['fighter','helicopter']);
const backgroundCaches=new WeakMap();
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const lerp=(a,b,t)=>a+(b-a)*t;
const finite=(n,fallback=0)=>Number.isFinite(n)?n:fallback;
const count=n=>clamp(Math.round(finite(n)),0,10);
function poly(c,pts,fill,stroke=null,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function ell(c,x,y,rx,ry,fill,stroke=null,width=2){c.beginPath();c.ellipse(x,y,Math.max(0,rx),Math.max(0,ry),0,0,TAU);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function rr(c,x,y,w,h,r,fill,stroke=null,width=2){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function line(c,x1,y1,x2,y2,color,width=2){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function text(c,value,x,y,size,color=INK,align='left',weight=700){c.font=`${weight} ${size}px system-ui,-apple-system,"Yu Gothic",sans-serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(value,x,y);}
function seed(n){let v=(n*374761393+668265263)|0;v=(v^(v>>>13))*1274126177;return ((v^(v>>>16))>>>0)/4294967295;}
function cloud(c,x,y,s,alpha=.8){c.save();c.globalAlpha=alpha;c.beginPath();c.moveTo(x-s*.6,y);c.bezierCurveTo(x-s*.82,y-s*.12,x-s*.57,y-s*.39,x-s*.35,y-s*.28);c.bezierCurveTo(x-s*.3,y-s*.64,x+s*.22,y-s*.6,x+s*.28,y-s*.28);c.bezierCurveTo(x+s*.59,y-s*.4,x+s*.79,y-s*.08,x+s*.58,y);c.closePath();c.fillStyle='#f5ffef';c.fill();line(c,x-s*.42,y+s*.015,x+s*.35,y+s*.015,'#d2f1df',s*.035);c.restore();}
function tree(c,x,y,s){
  rr(c,x-s*.045,y-s*.45,s*.095,s*.46,s*.025,'#9b7251',INK,s*.018);line(c,x-s*.023,y-s*.28,x-s*.023,y-s*.04,'#e0b97b',s*.023);
  c.beginPath();c.moveTo(x-s*.34,y-s*.29);c.bezierCurveTo(x-s*.6,y-s*.48,x-s*.48,y-s*.8,x-s*.25,y-s*.8);c.bezierCurveTo(x-s*.23,y-s*1.11,x+s*.24,y-s*1.08,x+s*.3,y-s*.83);c.bezierCurveTo(x+s*.58,y-s*.87,x+s*.65,y-s*.49,x+s*.39,y-s*.38);c.bezierCurveTo(x+s*.3,y-s*.13,x-s*.11,y-s*.16,x-s*.18,y-s*.34);c.closePath();c.fillStyle='#369968';c.fill();c.strokeStyle=INK;c.lineWidth=s*.02;c.stroke();
  c.beginPath();c.moveTo(x-s*.4,y-s*.65);c.bezierCurveTo(x-s*.45,y-s*.79,x-s*.23,y-s*.87,x-s*.15,y-s*.82);c.bezierCurveTo(x-s*.09,y-s*1.02,x+s*.21,y-s*.99,x+s*.24,y-s*.78);c.bezierCurveTo(x+s*.46,y-s*.72,x+s*.35,y-s*.51,x+s*.16,y-s*.56);c.bezierCurveTo(x+s*.07,y-s*.39,x-s*.13,y-s*.5,x-s*.16,y-s*.6);c.closePath();c.fillStyle='#8bd779';c.fill();
  c.beginPath();c.moveTo(x-s*.26,y-s*.83);c.quadraticCurveTo(x-s*.16,y-s*.98,x-s*.015,y-s*.89);c.moveTo(x+s*.15,y-s*.7);c.quadraticCurveTo(x+s*.29,y-s*.77,x+s*.32,y-s*.67);c.strokeStyle='#b8ed96';c.lineWidth=s*.03;c.stroke();
}
function rock(c,x,y,s){poly(c,[[x-s*.6,y],[x-s*.35,y-s*.32],[x-s*.1,y-s*.5],[x+s*.3,y-s*.43],[x+s*.58,y-s*.04],[x+s*.42,y+s*.11],[x-s*.32,y+s*.12]],'#6f92a3',INK,s*.025);poly(c,[[x-s*.6,y],[x-s*.35,y-s*.32],[x-s*.1,y-s*.5],[x+s*.13,y-s*.29],[x-s*.13,y+s*.05]],'#b9cebd');line(c,x-s*.33,y-s*.23,x-s*.12,y-s*.36,'#eef0c6',s*.04);}
function house(c,x,y,s,p){rr(c,x-s*.37,y-s*.42,s*.74,s*.42,s*.025,'#ffefc8',INK,s*.021);poly(c,[[x+s*.13,y-s*.39],[x+s*.37,y-s*.32],[x+s*.37,y],[x+s*.13,y]],'#abc6bd');poly(c,[[x-s*.45,y-s*.42],[x-s*.06,y-s*.76],[x+s*.45,y-s*.45],[x+s*.15,y-s*.24]],p.body,INK,s*.026);poly(c,[[x-s*.425,y-s*.425],[x-s*.06,y-s*.725],[x+s*.13,y-s*.27]],p.light);line(c,x-s*.06,y-s*.76,x+s*.45,y-s*.45,p.light,s*.025);rr(c,x-s*.24,y-s*.29,s*.16,s*.15,s*.015,'#66b5cc',INK,s*.015);line(c,x-s*.22,y-s*.26,x-s*.14,y-s*.26,'#cff8ec',s*.02);rr(c,x+s*.025,y-s*.22,s*.14,s*.22,s*.015,'#718f9c',INK,s*.015);poly(c,[[x-.005*s,y-s*.25],[x+s*.21,y-s*.25],[x+s*.25,y-s*.16],[x-s*.03,y-s*.16]],p.light,INK,s*.012);}
function mountains(c){poly(c,[[-35,225],[105,80],[202,218]],'#9bbfc3');poly(c,[[-35,225],[105,80],[70,225]],'#cde0c9');poly(c,[[230,235],[400,65],[615,235]],'#81a8b9');poly(c,[[230,235],[400,65],[375,235]],'#b6cdbd');poly(c,[[400,65],[354,112],[390,105],[407,126],[433,108],[460,120]],'#f2f6df');poly(c,[[400,65],[407,126],[433,108],[460,120]],'#c1e1df');}
function sky(c){const g=c.createLinearGradient(0,0,0,H*.65);g.addColorStop(0,'#98dcee');g.addColorStop(1,'#dbefd5');c.fillStyle=g;c.fillRect(0,0,P,H);cloud(c,130,114,109,.75);cloud(c,466,80,89,.65);poly(c,[[-20,215],[110,150],[220,210],[315,160],[460,217],[560,159],[675,218],[675,300],[-20,300]],'#91c7ad');poly(c,[[-20,235],[145,185],[290,230],[405,187],[555,230],[675,192],[675,300],[-20,300]],'#79b394');}
function meadow(c,terrain){const g=c.createLinearGradient(0,190,0,H);g.addColorStop(0,'#a0d37b');g.addColorStop(1,'#75b962');c.fillStyle=g;c.fillRect(0,205,P,H-205);poly(c,[[0,333],[210,269],[420,305],[640,260],[640,520],[0,520]],'#85c66b');
  if(terrain==='road'||terrain==='bridge'){poly(c,[[235,205],[286,205],[640,425],[640,520],[520,520]],'#cbad7f');poly(c,[[245,205],[274,205],[640,444],[640,493]],'#f0d09b');}
  for(let i=0;i<53;i++){const x=seed(i+17)*P,y=225+seed(i+91)*290,s=2+seed(i+131)*4;line(c,x-s,y,x,y-s*1.2,'#4e9e6060',1.6);line(c,x,y,x+s*.9,y-s*.6,'#b4dd86',1.4);if(i%13===0){ell(c,x,y-s,3,2,'#fff5ca');ell(c,x+3,y-s-2,2,3,'#fff5ca');ell(c,x+1,y-s,1.5,1.5,'#ffd15f');}}
}
function sea(c){const g=c.createLinearGradient(0,190,0,H);g.addColorStop(0,'#6dd7d9');g.addColorStop(.3,'#3cb4d0');g.addColorStop(1,'#247fb1');c.fillStyle=g;c.fillRect(0,205,P,H-205);line(c,0,206,P,206,'#e3f8d9',3);for(let i=0;i<10;i++){const x=seed(i+35)*P,y=235+seed(i+71)*260;line(c,x,y,x+27,y,'#8fe8dd66',2);}}
function airfield(c,p){poly(c,[[0,236],[640,236],[640,520],[0,520]],'#9bb6a6');poly(c,[[165,236],[245,236],[460,520],[36,520]],'#5f8291');line(c,181,248,63,500,'#f5eccb',3);line(c,237,247,441,500,'#f5eccb',3);for(let i=0;i<5;i++){const t=i/5;line(c,lerp(203,233,t),lerp(250,480,t),lerp(206,237,t+.065),lerp(250,480,t+.065),'#fff1c8',5);}rr(c,472,150,52,95,6,'#f3e6c8',INK,2);rr(c,457,129,82,45,7,p.body,INK,3);rr(c,465,137,66,21,3,'#9ee1e3',INK,2);line(c,495,127,495,95,INK,3);}
function city(c,building,p){
  if(building==='factory'){
    rr(c,65,165,202,82,5,'#f0e6c5',INK,3);poly(c,[[55,171],[110,123],[110,151],[165,112],[165,145],[272,144],[276,181]],p.body,INK,3);line(c,71,164,108,130,p.light,4);line(c,128,149,163,120,p.light,4);rr(c,115,185,67,62,3,'#4d7b8d',INK,2);for(let i=0;i<3;i++)line(c,119,197+i*14,177,197+i*14,'#b2cdbb',3);rr(c,231,108,21,48,2,'#e5d6b4',INK,2);rr(c,227,102,29,12,2,p.dark,INK,2);ell(c,246,84,22,10,'#d8ebdc');ell(c,266,64,27,13,'#e4f3df');
  }else{
    house(c,110,252,127,p);house(c,480,241,103,p);house(c,267,218,95,{body:'#9cadbf',light:'#d7dfd9',dark:'#62798f'});
    if(building==='hq'){rr(c,237,133,46,94,4,'#fff0c7',INK,3);poly(c,[[226,140],[260,104],[294,139]],p.body,INK,3);ell(c,260,167,14,14,p.dark,INK,2);text(c,'★',260,167,18,'#ffe29d','center');line(c,320,210,320,96,INK,4);poly(c,[[322,97],[379,102],[367,117],[382,132],[322,128]],p.body,INK,2);text(c,'★',344,115,19,'#fff0c5','center');}
  }
}
function terrainName(role){return typeof role?.terrain==='string'?role.terrain:role?.terrain?.terrain||'plain';}
function drawScene(c,role){const t=terrainName(role),p=PALETTES[role.team]||PALETTES[0],air=AIR.has(role.type);sky(c);
  if(t==='mountain')mountains(c);
  if(t==='sea'){sea(c);}else meadow(c,t);
  if(role.building==='airfield')airfield(c,p);else if(role.building)city(c,role.building,p);
  if(t==='forest'){tree(c,36,298,176);tree(c,570,277,160);tree(c,338,243,102);tree(c,203,258,118);}
  if(t==='mountain'){rock(c,34,339,90);rock(c,570,283,88);rock(c,352,243,42);}
  if(t==='river'||t==='bridge'){poly(c,[[0,247],[145,236],[640,290],[640,334],[145,267],[0,281]],'#eedaa2');poly(c,[[0,255],[145,245],[640,301],[640,322],[145,260],[0,272]],'#4cb9cd');line(c,13,261,80,256,'#d0fae8',3);}
  if(air){c.fillStyle='#c8ede1a6';c.fillRect(0,205,P,180);cloud(c,42,365,115,.75);cloud(c,569,432,138,.65);}
  // Quiet graphic vignette, never a full-frame flash.
  const shade=c.createLinearGradient(0,0,0,H);shade.addColorStop(0,'#24445612');shade.addColorStop(.3,'#24445600');shade.addColorStop(1,'#24445610');c.fillStyle=shade;c.fillRect(0,0,P,H);
}
function offscreen(w,h){if(typeof OffscreenCanvas!=='undefined')return new OffscreenCanvas(w,h);const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function roles(report){return [{role:report.attacker,key:'attacker'},{role:report.defender,key:'defender'}].sort((a,b)=>a.role.team-b.role.team);}
function backgrounds(canvas,report){const rs=roles(report),key=rs.map(({role:r})=>`${r.team}/${r.type}/${terrainName(r)}/${r.building||''}`).join('|');let cache=backgroundCaches.get(canvas);if(cache?.key===key)return cache.scenes;const scenes=rs.map(({role})=>{const layer=offscreen(P,H);drawScene(layer.getContext('2d'),role);return layer;});backgroundCaches.set(canvas,{key,scenes});return scenes;}
function roleCount(frame,role,key){return count(frame?.[`${key}Count`]??role.hpBefore);}
function positions(role){const air=AIR.has(role.type),infantry=role.type==='infantry',size=infantry?112:air?103:94;return Array.from({length:10},(_,i)=>{const col=i%5,row=Math.floor(i/5);const localX=63+col*123+(row?13:0),x=role.team===0?localX:W-localX;return {x,y:air?(row?365:250):(row?431:325),size,facing:role.team===0?1:-1,index:i};});}
function muzzle(role,position){const {x,y,size:s,facing:d}=position;if(role.type==='infantry')return{x:x+d*s*.235,y:y-s*.18};if(role.type==='artillery')return{x:x+d*s*.32,y:y-s*.46};if(role.type==='antiair')return{x:x+d*s*.23,y:y-s*.46};if(role.type==='fighter')return{x:x+d*s*.5,y:y-s*.25};if(role.type==='helicopter')return{x:x+d*s*.29,y:y-s*.13};if(role.type==='recon')return{x:x+d*s*.4,y:y-s*.13};return{x:x+d*s*.46,y:y-s*.25};}
function shotLocal(progress,index,reducedMotion){return reducedMotion?.56:clamp((progress-index*.018)/.74,0,1);}
function recoilFor(role,key,frame,index,reducedMotion){if(reducedMotion||AIR.has(role.type)||frame.shootingRole!==key||!['attack','counter'].includes(frame.stage))return 0;const p=shotLocal(frame.phaseProgress,index,false);return p>.03&&p<.25?Math.sin((p-.03)/.22*Math.PI)*.045:0;}
function animateSea(c,role,time){if(terrainName(role)!=='sea')return;const ox=role.team===0?0:P;for(let i=0;i<9;i++){const x=ox+seed(i+57)*P,y=250+seed(i+93)*240,a=(Math.sin(time/900+i)+1)*.16+.16;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+12,y-4,x+24,y);c.strokeStyle=`rgba(221,255,244,${a})`;c.lineWidth=2;c.stroke();}}
function unitFormation(c,role,key,frame,time,reducedMotion){const current=roleCount(frame,role,key),list=positions(role);for(let i=0;i<current;i++){const pos=list[i],intro=frame.stage==='intro'&&!reducedMotion?(1-frame.phaseProgress)*30:0,bob=AIR.has(role.type)&&!reducedMotion?Math.sin(time/360+i)*2.2:0;ell(c,pos.x+9,pos.y+(AIR.has(role.type)?65:20),pos.size*.33,pos.size*.105,AIR.has(role.type)?'#254e7134':'#254e713c');drawCombatUnit(c,role.type,role.team,pos.x-pos.facing*intro,pos.y+bob,pos.size,{facing:pos.facing,time:reducedMotion?0:time,recoil:recoilFor(role,key,frame,i,reducedMotion)});}}
function muzzleFlash(c,x,y,d,size,p,reducedMotion){if(p<.015||p>.23)return;const a=reducedMotion?.65:1-(p-.015)/.215;c.save();c.globalAlpha=clamp(a,0,1);poly(c,[[x,y],[x+d*size*.21,y-size*.13],[x+d*size*.15,y-size*.025],[x+d*size*.32,y],[x+d*size*.15,y+size*.04],[x+d*size*.2,y+size*.12]],'#ffd16c','#d38355',1.4);ell(c,x+d*size*.07,y,size*.07,size*.055,'#fff9d7');c.restore();}
function projectile(c,from,to,role,p,reducedMotion,index){if(p<=.025||p>=.99)return;const d=role.team===0?1:-1,ballistic=role.type==='artillery',missile=AIR.has(role.type),t=clamp((p-.08)/.8,0,1),arc=ballistic?Math.sin(t*Math.PI)*100:missile?Math.sin(t*Math.PI)*22:0,x=lerp(from.x,to.x,t),y=lerp(from.y,to.y-12,t)-arc;
  const lastT=Math.max(0,t-.045),lastX=lerp(from.x,to.x,lastT),lastY=lerp(from.y,to.y-12,lastT)-(ballistic?Math.sin(lastT*Math.PI)*100:missile?Math.sin(lastT*Math.PI)*22:0);
  c.save();c.globalAlpha=reducedMotion?.8:Math.min(1,t*8);
  if(missile){line(c,lastX-d*22,lastY,lastX,lastY,'#f5f9de9a',3);c.translate(x,y);c.rotate(Math.atan2(y-lastY,x-lastX));poly(c,[[-11,-3],[6,-3],[12,0],[6,3],[-11,3]],'#eef7df',INK,1.6);poly(c,[[-11,-3],[-17,-7],[-13,0],[-18,6],[-10,3]],'#ffd777');}
  else if(role.type==='infantry'||role.type==='antiair'){line(c,lastX,lastY,x,y,role.type==='antiair'?'#defaff':'#ffe6a8',role.type==='antiair'?3.5:2.5);ell(c,x,y,role.type==='antiair'?3.8:2.8,2,'#fffce6');}
  else{line(c,lastX,lastY,x,y,'#fff0bc99',4);ell(c,x,y,ballistic?7:6,ballistic?5:4,'#ffd26c',INK,1.6);line(c,x-d*3,y-2,x+d*2,y-2,'#fffad3',1.8);}
  c.restore();
}
function shooting(c,report,frame,time,reducedMotion){if(!['attack','counter'].includes(frame.stage)||!frame.shootingRole)return;const shooter=report[frame.shootingRole],targetKey=frame.shootingRole==='attacker'?'defender':'attacker',target=report[targetKey],amount=roleCount(frame,shooter,frame.shootingRole),targets=positions(target),targetCount=Math.max(1,roleCount(frame,target,targetKey));if(amount===0)return;
  const shooters=positions(shooter);for(let i=0;i<amount;i++){const from=muzzle(shooter,shooters[i]),to=targets[(i*3)%targetCount],p=shotLocal(frame.phaseProgress,i,reducedMotion);from.x-=shooters[i].facing*shooters[i].size*recoilFor(shooter,frame.shootingRole,frame,i,reducedMotion);muzzleFlash(c,from.x,from.y,shooter.team===0?1:-1,shooters[i].size,p,reducedMotion);projectile(c,from,to,shooter,p,reducedMotion,i);}
}
function smoke(c,x,y,age,seedIndex,reducedMotion){const t=clamp(age/650,0,1),rise=reducedMotion?6:t*30;c.save();c.globalAlpha=(1-t)*.53;for(let i=0;i<3;i++){const dx=(i-1)*12+Math.sin(seedIndex+i)*4,dy=-(i%2)*11;ell(c,x+dx,y+dy-rise,13+t*12,12+t*10,i%2?'#8c9fac':'#b5c0bf');}c.restore();}
function blast(c,pos,age,reducedMotion){if(age<0||age>700)return;const t=clamp(age/300,0,1),x=pos.x,y=pos.y-8;c.save();if(age<330){c.globalAlpha=(1-t)*.9;const r=reducedMotion?24:18+t*34;const pts=Array.from({length:16},(_,i)=>{const a=i/16*TAU,rr=r*(i%2?.43:1);return[x+Math.cos(a)*rr,y+Math.sin(a)*rr];});poly(c,pts,'#ffc875','#bf6958',2);poly(c,[[x-10,y],[x-2,y-20],[x+4,y-7],[x+20,y-5],[x+6,y+5],[x+7,y+20],[x-5,y+7]],'#fff8ce');}
  c.restore();smoke(c,x,y,Math.max(0,age-80),pos.index,reducedMotion);
  if(!reducedMotion&&age<350){const p=age/350;c.save();c.globalAlpha=1-p;for(let i=0;i<4;i++){const a=(i+.2)/4*TAU;rr(c,x+Math.cos(a)*p*39,y+Math.sin(a)*p*25-p*13,5,3,1,i%2?'#e5bd79':'#56758b');}c.restore();}
}
function casualties(c,report,frame,reducedMotion){
  const keys=Array.isArray(frame.casualtyRoles)?frame.casualtyRoles:frame.stage==='damage'?['defender']:frame.stage==='counterDamage'?['attacker']:[];
  for(const key of keys){
    const role=report[key];if(!role)continue;const data=frame.casualties?.[key],current=roleCount(frame,role,key),before=count(role.hpBefore),lost=count(data?.lost??(before-current)),list=positions(role);if(lost===0)continue;
    const latest=Number.isInteger(data?.latestIndex)?data.latestIndex:current,age=finite(data?.ageSinceLatestLoss,frame.phaseProgress*230);blast(c,list[clamp(latest,0,9)],age,reducedMotion);
    const indices=Array.isArray(data?.lostIndices)?data.lostIndices:Array.from({length:lost},(_,i)=>before-1-i);for(const index of indices){if(index===latest||!list[index])continue;smoke(c,list[index].x,list[index].y-7,Math.min(600,age+160+(index-latest)*35),index,reducedMotion);}
  }
}
function header(c,role,key,frame){const side=role.team===0?0:1,x=side?W-26:26,p=PALETTES[role.team]||PALETTES[0],align=side?'right':'left',n=roleCount(frame,role,key),suffix=role.type==='infantry'?'人':AIR.has(role.type)?'機':'両';
  c.save();rr(c,side?P+14:14,14,P-28,67,14,'#163b51eb','#d7eadd77',1.5);const textX=side?W-36:36;text(c,role.team===0?'CORAL FORCE':'AZURE FORCE',textX,32,11,p.light,align,800);text(c,NAMES[role.type]||role.type,textX,57,20,'#fff3d8',align,800);
  const nx=side?P+44:P-44;text(c,String(n),nx,46,39,p.light,'center',900);text(c,suffix,side?nx+22:nx-22,54,12,'#fff3d8',side?'left':'right',700);
  if(frame.shootingRole===key&&['attack','counter'].includes(frame.stage)){const cx=side?P+176:P-176;rr(c,cx-56,30,112,30,15,p.body,INK,1.5);text(c,frame.stage==='counter'?'反撃':'攻撃',cx,45,15,'#fff9e4','center',900);}
  c.restore();
}

/** Render a read-only combat timeline frame. Army positions always follow team. */
export function renderCombat(canvas,report,frame,options={}){
  if(!canvas||!report?.attacker||!report?.defender||!frame)return;
  if(canvas.width!==W)canvas.width=W;if(canvas.height!==H)canvas.height=H;const c=canvas.getContext('2d');if(!c)return;
  const time=finite(options.time,typeof performance!=='undefined'?performance.now():0),reducedMotion=!!options.reducedMotion,rs=roles(report),scenes=backgrounds(canvas,report);
  c.clearRect(0,0,W,H);c.lineCap='round';c.lineJoin='round';c.imageSmoothingEnabled=true;
  rs.forEach(({role},i)=>{c.drawImage(scenes[i],i*P,0);animateSea(c,role,reducedMotion?0:time);});
  for(const {role,key} of rs){c.save();c.beginPath();c.rect(role.team===0?0:P,0,P,H);c.clip();unitFormation(c,role,key,frame,time,reducedMotion);c.restore();}
  line(c,P,0,P,H,'#163b51',6);line(c,P-3,0,P-3,H,'#e6efcf',1);line(c,P+3,0,P+3,H,'#e6efcf',1);
  shooting(c,report,frame,time,reducedMotion);casualties(c,report,frame,reducedMotion);rs.forEach(({role,key})=>header(c,role,key,frame));
  if(frame.stage==='intro'){const fade=options.reducedMotion?0:clamp((.18-frame.phaseProgress)/.18,0,1);if(fade>0){c.fillStyle=`rgba(20,50,68,${fade*.55})`;c.fillRect(0,0,W,H);}}
}

export const COMBAT_CANVAS_SIZE=Object.freeze({width:W,height:H});
