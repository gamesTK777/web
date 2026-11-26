import { drawMech, mechName } from './mechs.mjs';

const W=600,H=328,LIMIT=35,TAU=2*Math.PI;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const angle=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
const angleDiff=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
const turn=(a,b,step)=>a+clamp(angleDiff(a,b),-step,step);
const profiles={
  scout:{speed:65,turn:6.6,damage:7,reload:.51,reach:155,beam:170,wind:.07,melee:17,slash:.2,boost:2.1,r:8,size:32},
  line:{speed:51,turn:5.1,damage:9,reload:.47,reach:205,beam:182,wind:.08,melee:21,slash:.2,boost:3,r:9,size:35},
  heavy:{speed:34,turn:1.29,damage:30,reload:2.15,reach:345,beam:221,wind:.94,melee:14,slash:.43,boost:4.2,r:10,size:39},
  carrier:{speed:25,turn:1.85,damage:13,reload:1.03,reach:244,beam:160,wind:.47,melee:23,slash:.5,boost:4.6,r:13,size:49}
};
const arenaNames={hq:'月面造船所',factory:'採鉱プラント',road:'南採掘路',ridge:'玄武岩の尾根',crater:'影のクレーター',plain:'静海の平原'};
const center={x:W/2,y:H/2};
function terrainCover(terrain){
  // The six entry bearings and central pad are kept clear. Real walls block
  // both locomotion and fire, leaving several routes through the plant.
  const types={
    factory:[[195,62,56,24],[350,53,51,32],[193,232,47,34],[350,236,61,25],[244,112,31,23],[327,181,29,26]],
    hq:[[167,51,58,36],[367,48,57,39],[175,242,54,34],[370,242,56,36],[244,94,29,38],[328,192,30,40]],
    road:[[125,56,45,22],[391,210,39,26]],
    ridge:[[170,52,53,30],[251,94,30,23],[348,207,47,22],[422,261,44,23]],
    crater:[[220,53,42,23],[362,237,38,21]],
    plain:[]
  };
  return (types[terrain]||[]).map(([x,y,w,h])=>({x,y,w,h}));
}
function inCover(x,y,r,o){
  const dx=x-clamp(x,o.x,o.x+o.w),dy=y-clamp(y,o.y,o.y+o.h);
  return dx*dx+dy*dy<r*r;
}
function clearAt(s,x,y,r){return x>=12+r&&y>=12+r&&x<=W-12-r&&y<=H-12-r&&!s.cover.some(o=>inCover(x,y,r,o))}
function rayBox(ax,ay,bx,by,o,pad=0){
  let u=0,v=1;
  for(const [a,d,lo,hi] of [[ax,bx-ax,o.x-pad,o.x+o.w+pad],[ay,by-ay,o.y-pad,o.y+o.h+pad]]){
    if(Math.abs(d)<.00001){if(a<lo||a>hi)return false;continue}
    const a1=(lo-a)/d,a2=(hi-a)/d;
    u=Math.max(u,Math.min(a1,a2));v=Math.min(v,Math.max(a1,a2));
    if(u>v)return false;
  }
  return true;
}
function visible(s,a,b,padding=0){return !s.cover.some(o=>rayBox(a.x,a.y,b.x,b.y,o,padding))}
function nearValid(s,x,y,r){
  if(clearAt(s,x,y,r))return {x,y};
  for(let d=4;d<=60;d+=4)for(let i=0;i<12;i++){
    const a=i*TAU/12,tx=x+d*Math.cos(a),ty=y+d*Math.sin(a);
    if(clearAt(s,tx,ty,r))return {x:tx,y:ty};
  }
  return {...center};
}
function emit(s,type,unit){s.events.push({type,id:unit?.id});if(s.events.length>90)s.events.shift()}
function particle(s,x,y,tone,count,scale=1){
  for(let i=0;i<count;i++){
    const a=(i/count)*TAU+Math.random()*.4,vel=(12+Math.random()*42)*scale,life=.15+Math.random()*.28;
    s.particles.push({x,y,vx:Math.cos(a)*vel,vy:Math.sin(a)*vel,life,total:life,tone});
  }
  if(s.particles.length>160)s.particles.splice(0,s.particles.length-160);
}
export function createBattle(battle,pilotId){
  const s={terrain:battle.terrain,attackerId:battle.attackerId,defenderId:battle.defenderId,
    cover:terrainCover(battle.terrain),fighters:[],bolts:[],particles:[],events:[],elapsed:0,tick:0,
    pilotId,targetId:null,reason:null,banner:'',bannerTime:0};
  s.fighters=battle.fighters.map((src,index)=>{
    const p=profiles[src.kind],d=Math.hypot(src.dx,src.dy);
    const nx=d?src.dx/d:0,ny=d?src.dy/d:0;
    const radius=Math.min(173/Math.max(.001,Math.abs(nx)),124/Math.max(.001,Math.abs(ny)));
    const position=nearValid(s,center.x+nx*radius,center.y+ny*radius,p.r);
    return {...src,...position,startX:position.x,startY:position.y,p,
      heading:0,turret:0,index,focus:null,aiTime:.2+(index%3)*.09,
      sideStep:index%2?1:-1,aiMove:{x:0,y:0},aiShot:false,aiSlash:false,
      cool:.24+index*.045,meleeCool:0,boostCool:0,boostTime:0,boostDir:0,
      phase:null,phaseTime:0,phaseTotal:0,recoil:0,flash:0,kills:0,step:0,travel:false};
  });
  const attacker=s.fighters.find(f=>f.id===s.attackerId),defender=s.fighters.find(f=>f.id===s.defenderId);
  for(const f of s.fighters){
    const target=f.side===defender?.side?attacker:defender;
    f.turret=f.heading=target?angle(f,target):-Math.PI/2;f.focus=target?.id;
  }
  if(!s.fighters.some(f=>f.id===pilotId&&f.side==='blue'&&f.hp>0))s.pilotId=s.fighters.find(f=>f.side==='blue'&&f.hp>0)?.id;
  const pilot=s.fighters.find(f=>f.id===s.pilotId);
  s.targetId=pilot?.focus;
  return s;
}
function getEnemy(s,f,id){return s.fighters.find(t=>t.id===id&&t.side!==f.side&&t.hp>0)}
function closestEnemy(s,f){
  const enemies=s.fighters.filter(t=>t.side!==f.side&&t.hp>0);
  const score=t=>dist(f,t)+(visible(s,f,t)?0:86)+(t.id===f.focus?-15:0);
  return enemies.sort((a,b)=>score(a)-score(b))[0];
}
function setTarget(s,id){
  const p=s.fighters.find(f=>f.id===s.pilotId);
  if(!p)return;
  const enemies=s.fighters.filter(t=>t.hp>0&&t.side!==p.side);
  const next=id?enemies.find(e=>e.id===id):enemies[(enemies.findIndex(t=>t.id===s.targetId)+1)%enemies.length];
  if(next){s.targetId=next.id;emit(s,'target',p)}
}
// Visibility graph around inflated obstacle corners. At most six buildings
// and twenty-six nodes, evaluated only on the unit's reaction tick.
function steerAround(s,f,goal){
  const r=f.p.r+2, end=nearValid(s,goal.x,goal.y,r);
  if(visible(s,f,end,r))return end;
  const nodes=[f,end];
  for(const o of s.cover)for(const x of [o.x-r-1,o.x+o.w+r+1])for(const y of [o.y-r-1,o.y+o.h+r+1]){
    if(clearAt(s,x,y,f.p.r))nodes.push({x,y});
  }
  const cost=nodes.map(()=>Infinity),first=nodes.map(()=>-1),done=new Set();
  cost[0]=0;
  for(let n=0;n<nodes.length;n++){
    let best=-1;
    for(let i=0;i<nodes.length;i++)if(!done.has(i)&&cost[i]<Infinity&&(best<0||cost[i]<cost[best]))best=i;
    if(best<0||best===1)break;
    done.add(best);
    for(let j=1;j<nodes.length;j++){
      if(done.has(j))continue;
      const v=cost[best]+dist(nodes[best],nodes[j]);
      if(v>=cost[j]||!visible(s,nodes[best],nodes[j],r))continue;
      cost[j]=v;first[j]=best===0?j:first[best];
    }
  }
  return nodes[first[1]]||f;
}
function planAi(s,f){
  const t=closestEnemy(s,f);if(!t)return;
  f.focus=t.id;
  const a=angle(t,f),range=dist(t,f),seen=visible(s,f,t);
  const prefer={scout:85,line:121,heavy:184,carrier:151}[f.kind];
  let da=0;
  if(f.kind==='scout')da=f.sideStep*(range<135?.48:.25);
  else if(f.kind==='line')da=f.sideStep*.16;
  else if(!seen)da=f.sideStep*.52;
  let gx=t.x+Math.cos(a+da)*prefer,gy=t.y+Math.sin(a+da)*prefer;
  if(f.kind==='heavy'){
    const friend=s.fighters.find(v=>v.side===f.side&&v.id!==f.id&&v.hp>0&&dist(v,t)<range);
    if(friend&&Math.abs(angleDiff(a,angle(t,friend)))<.9){
      gx=friend.x+Math.cos(a)*49-Math.sin(a)*27*f.sideStep;
      gy=friend.y+Math.sin(a)*49+Math.cos(a)*27*f.sideStep;
    }
  }
  if(!seen&&Math.abs(da)<.2){gx=t.x+Math.cos(a+f.sideStep*.68)*prefer;gy=t.y+Math.sin(a+f.sideStep*.68)*prefer}
  const goal=steerAround(s,f,{x:clamp(gx,25,W-25),y:clamp(gy,25,H-25)});
  const len=dist(f,goal);f.aiMove=len>7?{x:(goal.x-f.x)/len,y:(goal.y-f.y)/len}:{x:0,y:0};
  f.aiShot=seen&&range<f.p.reach*.98;f.aiSlash=range<28&&seen;
  if(f.kind==='scout'&&f.boostCool<=0&&len>40&&t.phase==='shot'&&t.phaseTime>.13){
    initiateBoost(s,f,f.aiMove.x,f.aiMove.y);
  }
}
function slide(s,f,dx,dy){
  if(clearAt(s,f.x+dx,f.y,f.p.r))f.x+=dx;
  if(clearAt(s,f.x,f.y+dy,f.p.r))f.y+=dy;
}
function initiateBoost(s,f,x,y){
  if(f.boostCool>0||f.phase)return;
  f.boostDir=Math.hypot(x,y)>.1?Math.atan2(y,x):f.heading;f.boostTime=.21;f.boostCool=f.p.boost;emit(s,'boost',f);
}
function startPhase(f,type){
  f.phase=type;f.phaseTime=f.phaseTotal=type==='slash'?f.p.slash:f.p.wind;
}
function hurt(s,f,damage,source){
  if(f.hp<=0)return;
  f.hp=Math.max(0,f.hp-damage);f.flash=.14;
  particle(s,f.x,f.y,f.side==='blue'?'#8bf5ea':'#ffa47e',4);
  emit(s,'hit',f);
  if(f.hp===0){source.kills++;particle(s,f.x,f.y,'#ffcc7d',18,1.5);emit(s,'down',f)}
}
function attack(s,f){
  const damageScale=.65*(1+Math.min(.12,(f.xp||0)*.025));
  if(f.phase==='slash'){
    f.slashFx=.22;f.meleeCool=f.kind==='carrier'?1.8:1.15;f.cool=Math.max(f.cool,.32);
    emit(s,'slash',f);
    for(const t of s.fighters){
      if(t.side===f.side||t.hp<=0||dist(f,t)>28+t.p.r||Math.abs(angleDiff(f.turret,angle(f,t)))>1.2||!visible(s,f,t))continue;
      hurt(s,t,Math.round(f.p.melee*damageScale),f);
    }
  }else{
    const a=f.turret,dx=Math.cos(a),dy=Math.sin(a),origin=f.p.r+4;
    s.bolts.push({x:f.x,y:f.y,dx,dy,speed:f.p.beam,left:f.p.reach+origin,
      damage:Math.round(f.p.damage*damageScale),source:f.id,side:f.side,heavy:f.kind==='heavy'});
    f.cool=f.p.reload;f.recoil=1;emit(s,f.kind==='heavy'?'heavy':'shot',f);
  }
  f.phase=null;
}
function moveBolts(s,dt){
  s.bolts=s.bolts.filter(b=>{
    const length=Math.min(b.speed*dt,b.left),bx=b.x+b.dx*length,by=b.y+b.dy*length;
    const source=s.fighters.find(f=>f.id===b.source);
    if(s.cover.some(o=>rayBox(b.x,b.y,bx,by,o))){particle(s,bx,by,'#dbc994',3);return false}
    let hit=null,first=Infinity;
    for(const t of s.fighters){
      if(t.side===b.side||t.hp<=0)continue;
      const along=clamp((t.x-b.x)*b.dx+(t.y-b.y)*b.dy,0,length);
      if(Math.hypot(t.x-(b.x+b.dx*along),t.y-(b.y+b.dy*along))<t.p.r+1.5&&along<first){hit=t;first=along}
    }
    if(hit){hurt(s,hit,b.damage,source);return false}
    b.x=bx;b.y=by;b.left-=length;
    return b.left>.01&&bx>=3&&by>=3&&bx<=W-3&&by<=H-3;
  });
}
export function stepBattle(s,input={},dt=1/60){
  if(s.reason)return;
  dt=clamp(Number.isFinite(dt)?dt:0,0,.05);
  s.elapsed=Math.min(LIMIT,s.elapsed+dt);s.tick++;s.bannerTime=Math.max(0,s.bannerTime-dt);
  if(input.target)setTarget(s,input.target===true?null:input.target);
  for(const f of s.fighters){
    if(f.hp<=0)continue;
    const human=f.id===s.pilotId;
    f.aiTime-=dt;
    if(!human&&f.aiTime<=0){planAi(s,f);f.aiTime=.24+(f.index%4)*.04}
    const t=getEnemy(s,f,human?s.targetId:f.focus)||closestEnemy(s,f);
    if(t&&human)s.targetId=t.id;
    const mx=human?(input.x||0):f.aiMove.x,my=human?(input.y||0):f.aiMove.y;
    f.cool=Math.max(0,f.cool-dt);f.meleeCool=Math.max(0,f.meleeCool-dt);f.boostCool=Math.max(0,f.boostCool-dt);
    f.recoil=Math.max(0,f.recoil-dt*4);f.flash=Math.max(0,f.flash-dt);f.slashFx=Math.max(0,(f.slashFx||0)-dt);
    if(human&&input.boost)initiateBoost(s,f,mx,my);
    const len=Math.hypot(mx,my),speed=f.p.speed*(f.phase?(f.kind==='heavy'?.22:.7):1);
    f.travel=len>.05||f.boostTime>0;
    if(f.boostTime>0){
      slide(s,f,Math.cos(f.boostDir)*dt*210,Math.sin(f.boostDir)*dt*210);f.boostTime=Math.max(0,f.boostTime-dt);
    }else if(len>.05)slide(s,f,mx/Math.max(1,len)*speed*dt,my/Math.max(1,len)*speed*dt);
    if(f.travel){f.step+=dt*14;f.heading=turn(f.heading,f.boostTime>0?f.boostDir:Math.atan2(my,mx),dt*5)}
    // The heavy gun commits to its bearing during the last two thirds of the flash.
    const winding=f.phase==='shot'&&f.kind==='heavy'&&f.phaseTime<f.p.wind*.68;
    if(t&&!winding){
      f.turret=turn(f.turret,angle(f,t),dt*f.p.turn*(f.phase==='slash'?.65:1));
      if(!f.travel)f.heading=turn(f.heading,f.turret,dt*2.2);
    }
    if(f.phase){f.phaseTime-=dt;if(f.phaseTime<=0)attack(s,f)}
    else if(!f.boostTime&&t){
      if((human?input.slash:f.aiSlash)&&f.meleeCool<=0)startPhase(f,'slash');
      else if((human?input.fire:f.aiShot)&&f.cool<=0&&(human||Math.abs(angleDiff(f.turret,angle(f,t)))<.25))startPhase(f,'shot');
    }
  }
  for(let i=1;i<s.fighters.length;i++)for(let j=0;j<i;j++){
    const a=s.fighters[i],b=s.fighters[j];
    if(a.hp<=0||b.hp<=0)continue;
    const d=dist(a,b),min=a.p.r+b.p.r;
    if(d>=min)continue;
    const nx=d>.001?(a.x-b.x)/d:1,ny=d>.001?(a.y-b.y)/d:0,push=(min-d)*.5;
    slide(s,a,nx*push,ny*push);slide(s,b,-nx*push,-ny*push);
  }
  moveBolts(s,dt);
  s.particles=s.particles.filter(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;return p.life>0});
  const alive=s.fighters.filter(f=>f.hp>0);
  if(!alive.some(f=>f.side==='red')||!alive.some(f=>f.side==='blue'))s.reason='elimination';
  else if(s.elapsed>=LIMIT)s.reason='timeout';
  else if(!alive.some(f=>f.id===s.pilotId)){
    const next=alive.find(f=>f.side==='blue');s.pilotId=next.id;s.targetId=closestEnemy(s,next)?.id;
    s.banner='操縦引き継ぎ　'+mechName(next.kind);s.bannerTime=2;emit(s,'handover',next);
  }
}
export const battleResults=s=>s.fighters.map(({id,hp,kills})=>({id,hp:Math.max(0,Math.round(hp)),kills}));

function rect(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),w,h)}
function line(c,x,y,tx,ty,col){
  c.strokeStyle=col;c.beginPath();c.moveTo(Math.round(x)+.5,Math.round(y)+.5);c.lineTo(Math.round(tx)+.5,Math.round(ty)+.5);c.stroke();
}
function oval(c,x,y,rx,ry,col){
  c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,-.12,0,TAU);c.fill();
}
function poly(c,col,pts){
  c.fillStyle=col;c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath();c.fill();
}
function pipe(c,x,y,w){
  rect(c,x,y+2,w,3,'#36414d');rect(c,x,y,w,3,'#657481');rect(c,x+1,y,w-2,1,'#a6a5a0');
  for(let i=3;i<w-1;i+=9){rect(c,x+i,y-1,2,5,'#454d58');rect(c,x+i,y-1,1,2,'#979a98')}
}
function hatches(c,x,y,w){
  rect(c,x,y,w,3,'#464a51');
  for(let step=1;step<w-2;step+=5){rect(c,x+step,y+1,2,2,'#b19c70');rect(c,x+step+1,y,2,1,'#b19c70')}
}
function building(c,o,i,type){
  const {x,y,w,h}=o,wide=w>=40,bottom=y+h,edge=x+w;
  // The foot of the walls matches the collision rectangle. Roofs rise toward
  // the top of the screen, casting a short southeast contact shadow.
  poly(c,'#424955',[x+2,bottom-2,edge-2,y+3,edge+9,y+10,edge+9,bottom+4,edge+5,bottom+9,x+10,bottom+7]);
  poly(c,'#343e4a',[x+1,bottom-2,edge-1,y+1,edge+4,y+6,edge+4,bottom+2,edge,bottom+5,x+4,bottom+4]);
  rect(c,x-2,y+3,w+3,h-1,'#899197');rect(c,x,y+4,w,h-3,'#333d46');
  poly(c,'#394751',[x,y-1,x+4,y-5,edge-4,y-5,edge,y-1,edge,bottom-4,edge-4,bottom,x+4,bottom,x,bottom-4]);
  rect(c,x+3,bottom-7,w-6,6,'#4b5b62');rect(c,edge-4,y,3,h-4,'#303e4b');
  rect(c,x+4,bottom-5,2,3,'#839196');rect(c,edge-7,bottom-5,2,3,'#849396');
  // A recessed roof rim with two sunlit bevels.
  const deck=bottom-9;
  poly(c,'#abb0a9',[x-1,y+1,x+4,y-5,edge-5,y-5,edge-1,y-1,edge-1,deck-2,edge-5,deck+1,x+3,deck+1,x-1,deck-2]);
  poly(c,'#727d82',[x+1,y+1,x+4,y-3,edge-6,y-3,edge-3,y,edge-3,deck-2,edge-6,deck-1,x+4,deck-1,x+1,deck-3]);
  line(c,x+4,deck,edge-5,deck,'#4a5966');line(c,edge-3,y,edge-3,deck-3,'#52636a');
  for(let ix=x+7;ix<edge-4;ix+=10){rect(c,ix,y-3,2,1,'#c8c7b8');rect(c,ix,deck-1,1,1,'#b3b8ae')}
  const design=type==='hq'?(i+1)%4:i%4;
  if(wide&&design===0){
    // Ore crusher: laddered belt housing and a row of circular extractors.
    rect(c,x+5,y+1,w-10,8,'#3d4953');rect(c,x+6,y+1,w-12,1,'#b6aaa1');
    for(let xx=x+7;xx<edge-8;xx+=7){rect(c,xx,y+3,4,5,'#75868b');rect(c,xx,y+3,3,1,'#b5b9ac');rect(c,xx+1,y+5,3,2,'#556774')}
    pipe(c,x+5,deck-5,w-20);
    rect(c,edge-15,deck-8,9,7,'#394a57');rect(c,edge-14,deck-7,7,2,'#8baead');rect(c,edge-14,deck-7,3,1,'#c9dcbd');
  }else if(wide&&design===1){
    // Pressure vessels show a rim, the upper light, an inset and a feed line.
    const cy=y+Math.floor((deck-y)/2);
    for(let j=0;j<2;j++){
      const cx=x+Math.floor(w*(j?.64:.29)),rr=Math.min(8,Math.floor((deck-y+3)/2));
      oval(c,cx+1,cy+2,rr,rr*.69,'#475564');oval(c,cx,cy,rr,rr*.72,'#bdc1b7');
      oval(c,cx+1,cy,rr-1,rr*.61,'#788b91');oval(c,cx,cy-1,rr*.48,rr*.30,'#556976');
      rect(c,cx-2,cy-2,3,1,'#aab5af');rect(c,cx-1,cy,3,1,'#47535f');
    }
    pipe(c,x+7,deck-3,w-14);
  }else if(wide&&design===2){
    // Photovoltaic rack, separated by copper-colored bus bars.
    rect(c,x+5,y+1,w-13,Math.max(8,deck-y-3),'#384d61');
    for(let yy=y+2;yy<deck-3;yy+=4)for(let xx=x+6;xx<edge-11;xx+=7){
      rect(c,xx,yy,5,3,'#587587');rect(c,xx,yy,4,1,'#7d9aa6');
    }
    rect(c,edge-7,y+2,2,deck-y-3,'#aa9b78');rect(c,edge-7,y+5,2,2,'#514940');
  }else{
    // Compact roof hood with lit windows and cross-slatted radiator.
    const rw=Math.min(22,w-12),rh=Math.min(12,deck-y);
    rect(c,x+5,y+2,rw+2,rh,'#515e68');rect(c,x+4,y,rw+1,rh,'#aaada1');
    rect(c,x+5,y+1,rw-1,rh-2,'#485962');
    for(let dx=1;dx<rw-4;dx+=4){rect(c,x+6+dx,y+2,2,rh-4,'#778991');rect(c,x+6+dx,y+2,1,rh-5,'#91a09f')}
    if(wide)pipe(c,x+rw+8,y+3,w-rw-14);
  }
  if(wide){
    const bay=x+Math.floor(w*.34),bw=wide?14:8;
    rect(c,bay,bottom-9,bw+2,8,'#263844');rect(c,bay+1,bottom-8,bw,6,'#6e797a');
    for(let yy=bottom-7;yy<bottom-2;yy+=2)line(c,bay+1,yy,bay+bw,yy,'#47545e');
    rect(c,bay-3,bottom-6,1,3,'#e3b479');rect(c,bay+bw+3,bottom-6,1,3,'#e3b479');
    rect(c,bay-2,bottom+1,bw+5,2,'#85898b');hatches(c,x+4,bottom-7,Math.max(6,bay-x-7));
    rect(c,edge-15,bottom-7,7,4,'#303f49');rect(c,edge-14,bottom-6,5,2,'#b2c5ac');
    rect(c,edge-11,bottom-6,1,2,'#4e6265');
  }else{
    rect(c,x+6,bottom-7,w-13,4,'#3b4753');
    for(let xx=x+7;xx<edge-8;xx+=4)rect(c,xx,bottom-6,3,2,i%2?'#d2ae7c':'#9cbab7');
    hatches(c,x+3,bottom+1,9);
  }
}
function makeTerrain(s){
  const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
  const c=canvas.getContext('2d'),built=['hq','factory'].includes(s.terrain);
  c.imageSmoothingEnabled=false;
  let seed=182+11*s.terrain.length;
  function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
  rect(c,0,0,W,H,built?'#535966':'#5b5b68');
  for(let i=0;i<3500;i++){
    const x=rand()*W,y=rand()*H,n=rand();
    rect(c,x,y,n>.94?4:1+Math.floor(rand()*2),1,n>.57?'#626674':'#4e5261');
  }
  for(let i=0;i<(built?28:56);i++){
    const x=rand()*W,y=rand()*H,r=3+rand()*(built?9:20),h=r*(.38+rand()*.1);
    oval(c,x+1,y+2,r,h,'#737380');oval(c,x,y,r,h,'#404755');
    oval(c,x+1,y+1,r*.82,h*.73,'#505461');
    for(let j=0;j<r*.65;j++)rect(c,x+(rand()-.5)*r*1.25,y+(rand()-.5)*h,1,1,'#5e606a');
  }
  if(built||s.terrain==='road'){
    const road=s.terrain==='road';
    rect(c,0,141,W,49,road?'#56525c':'#454e5a');
    for(const y of [141,143,187,190])line(c,0,y,W,y,y%2?'#767780':'#363e49');
    for(let x=0;x<W;x+=31){
      line(c,x,144,x,187,'#3e4651');line(c,x+1,145,x+1,186,'#515864');
      rect(c,x+2,147,1,2,'#77818b');rect(c,x+2,182,1,2,'#78818a');
      rect(c,x+6,164,8,1,road?'#aca07c':'#697380');
    }
    if(built){
      for(const x of [85,499]){
        rect(c,x,0,16,H,'#474e5b');rect(c,x+3,0,1,H,'#86858a');rect(c,x+12,0,1,H,'#363e49');
        for(let y=0;y<H;y+=10)rect(c,x+4,y,8,2,'#5f626b');
      }
      c.strokeStyle='#7b7e84';c.setLineDash([4,6]);c.strokeRect(267.5,131.5,65,66);c.setLineDash([]);
      for(let x=0;x<W;x+=64){rect(c,x,16,25,1,'#616977');rect(c,x+16,H-20,21,1,'#616977')}
    }
  }
  if(built){
    // Ground-level service ducts extend from the loading aprons to the two supply trunks.
    for(const [i,o] of s.cover.entries()){
      const x=o.x+Math.floor(o.w*.5),y=o.y+o.h+5;
      c.strokeStyle='#3e4954';c.lineWidth=3;c.beginPath();c.moveTo(x,y);c.lineTo(x,Math.min(H-14,y+13));
      const outlet=x<W/2?99:499;c.lineTo(outlet,Math.min(H-14,y+13));c.stroke();c.lineWidth=1;
      line(c,Math.min(x,outlet),y+12,Math.max(x,outlet),y+12,'#6b737a');
      for(let xx=Math.min(x,outlet)+8;xx<Math.max(x,outlet);xx+=19)rect(c,xx,y+11,2,5,'#5c6770');
      for(let j=0;j<3;j++){
        const tx=x-10+j*7;rect(c,tx,y+2,2,1,'#a79a7f');rect(c,tx+1,y+1,2,1,'#a79a7f');
      }
      if(i%2===0){line(c,o.x-7,o.y-8,o.x+8,o.y-8,'#98988d');line(c,o.x-7,o.y-8,o.x-7,o.y+1,'#98988d')}
    }
    for(let x=30;x<W-20;x+=66){
      hatches(c,x,136,14);rect(c,x+1,191,12,2,'#3b4855');rect(c,x+2,191,3,1,'#afc5bb');
      rect(c,x+9,191,2,1,'#8e9aa2');
    }
  }
  for(let i=0;i<s.cover.length;i++){
    const o=s.cover[i],{x,y,w,h}=o;
    if(built){
      building(c,o,i,s.terrain);
    }else{
      oval(c,x+w/2+3,y+h/2+4,w*.57,h*.58,'#404450');
      c.fillStyle='#333c4a';c.beginPath();c.moveTo(x,y+5);c.lineTo(x+7,y);c.lineTo(x+w-6,y);c.lineTo(x+w,y+4);c.lineTo(x+w,y+h-3);c.lineTo(x+w-6,y+h);c.lineTo(x+3,y+h);c.closePath();c.fill();
      rect(c,x+4,y+3,w-8,h-9,'#696a76');
      for(let n=0;n<w;n++){const xx=x+5+rand()*(w-10),yy=y+4+rand()*(h-11);rect(c,xx,yy,1+Math.floor(rand()*3),1,rand()>.55?'#8a8990':'#565865')}
      line(c,x+5,y+2,x+w-8,y+2,'#96939b');line(c,x+w-9,y+4,x+w-14,y+h-6,'#474d5a');
    }
  }
  for(const yy of [7,H-8]){
    line(c,8,yy,W-8,yy,'#7c7a78');
    for(let x=12;x<W-12;x+=18)rect(c,x,yy-1,3,3,'#89887e');
  }
  line(c,7,8,7,H-8,'#7c7a78');line(c,W-8,8,W-8,H-8,'#7c7a78');
  return canvas;
}
function tracking(c,x,y,r,col){
  const d=5;c.strokeStyle=col;
  for(const sx of [-1,1])for(const sy of [-1,1]){
    c.beginPath();c.moveTo(x+sx*(r-d),y+sy*r);c.lineTo(x+sx*r,y+sy*r);c.lineTo(x+sx*r,y+sy*(r-d));c.stroke();
  }
}
function drawFrame(c,s,back){
  c.clearRect(0,0,W,H);c.drawImage(back,0,0);
  for(const f of s.fighters){
    const own=f.side==='blue',col=own?'#93f4e4':'#ffb58f';
    if(s.elapsed<2.5){
      c.save();c.globalAlpha=.55*Math.min(1,2.5-s.elapsed);
      c.strokeStyle=col;c.setLineDash([3,4]);c.beginPath();c.arc(f.startX,f.startY,f.p.r+8,0,TAU);c.stroke();
      if(f.id!==s.defenderId){
        const a=angle(center,{x:f.startX,y:f.startY});
        const px=f.startX+Math.cos(a)*22,py=f.startY+Math.sin(a)*22;
        line(c,px,py,px+Math.cos(a)*24,py+Math.sin(a)*24,col);
      }
      c.restore();
    }
  }
  for(const b of s.bolts){
    const n=b.heavy?11:6;
    c.lineWidth=b.heavy?4:2;line(c,b.x,b.y,b.x-b.dx*n,b.y-b.dy*n,b.side==='blue'?'#5bdfe5':'#ff815f');
    c.lineWidth=1;line(c,b.x,b.y,b.x-b.dx*(n-1),b.y-b.dy*(n-1),b.side==='blue'?'#deffff':'#fff0a5');
  }
  const sorted=s.fighters.slice().sort((a,b)=>a.y-b.y);
  for(const f of sorted){
    if(f.hp<=0)continue;
    const x=Math.round(f.x),y=Math.round(f.y),own=f.side==='blue',pilot=f.id===s.pilotId,target=f.id===s.targetId;
    const team=own?'#75f3d8':'#ff9c77',r=f.p.r+6;
    if(pilot){
      c.strokeStyle='#a4efde';c.setLineDash([4,4]);c.beginPath();c.ellipse(x,y+4,r+1,r*.72,0,0,TAU);c.stroke();c.setLineDash([]);
      c.fillStyle='#e6fff4';c.beginPath();c.moveTo(x-3,y-r-8);c.lineTo(x+3,y-r-8);c.lineTo(x,y-r-4);c.fill();
    }
    if(f.phase==='shot'&&f.p.wind>.3){
      c.save();const a=f.turret,t=1-f.phaseTime/f.phaseTotal;
      c.setLineDash([3,5]);c.globalAlpha=.5+.4*t;
      line(c,f.x+Math.cos(a)*14,f.y+Math.sin(a)*14,f.x+Math.cos(a)*(35+62*t),f.y+Math.sin(a)*(35+62*t),own?'#a2f9dc':'#ffbf82');c.restore();
    }
    drawMech(c,f.kind,f.side,x,y,f.p.size,{heading:f.heading,turretHeading:f.turret,step:f.travel?f.step:0,
      recoil:f.recoil,boost:f.boostTime/.21,charge:f.phase==='shot'?1-f.phaseTime/f.phaseTotal:0});
    if(f.slashFx>0||f.phase==='slash'){
      c.lineWidth=f.slashFx>0?3:1;c.strokeStyle=f.slashFx>0?'#fff1b5':'#e6b68b';
      c.beginPath();c.arc(x,y,r+5,f.turret-.93,f.turret+.93);c.stroke();c.lineWidth=1;
    }
    if(f.flash>.075){tracking(c,x,y,r,'#fff6bd')}
    if(target)tracking(c,x,y,r+1+(s.elapsed%1<.5?1:0),'#ffcb82');
    const w=f.kind==='carrier'?30:22;
    rect(c,x-w/2-1,y+r+1,w+2,4,'#1c2936');rect(c,x-w/2,y+r+2,Math.ceil(w*f.hp/f.maxHp),2,team);
    if(own)rect(c,x-w/2-4,y+r+1,2,2,team);
    else {rect(c,x-w/2-5,y+r,1,3,team);rect(c,x-w/2-3,y+r,1,3,team)}
  }
  for(const p of s.particles){c.globalAlpha=Math.min(1,p.life*6);rect(c,p.x,p.y,p.life>.19?3:1,2,p.tone)}c.globalAlpha=1;
  if(s.elapsed<2.5){
    c.save();
    c.font='bold 9px system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';
    c.globalAlpha=Math.min(1,(2.5-s.elapsed)*2);
    for(const f of s.fighters.filter(f=>f.hp>0)){
      const role=f.id===s.pilotId?'自機':f.side==='blue'?'僚機':'敵機';
      const label=role+' '+mechName(f.kind),w=Math.ceil(c.measureText(label).width)+8;
      const x=clamp(Math.round(f.x),w/2+2,W-w/2-2),y=Math.max(7,Math.round(f.y)-f.p.r-23);
      rect(c,x-w/2,y-6,w,12,'#14232e');
      c.fillStyle=f.side==='blue'?'#a5f1df':'#ffc29c';c.fillText(label,x,y);
    }
    c.restore();
  }
}

const skin=`
.orbit-duel{display:grid;grid-template-rows:auto minmax(0,1fr) auto;width:100%;height:100%;min-height:0;position:relative;overflow:hidden;background:#0d181f;color:#e9f2f3;font-family:system-ui,sans-serif;box-sizing:border-box;isolation:isolate;user-select:none;-webkit-user-select:none}
.orbit-duel *{box-sizing:border-box}.orbit-duel button{touch-action:manipulation;cursor:pointer;font:inherit}
.od-hud{display:flex;align-items:center;justify-content:space-between;min-height:42px;padding:5px max(12px,env(safe-area-inset-left));gap:8px;background:#14232d;border-bottom:1px solid #435660}
.od-status{min-width:0;flex:1;font-size:12px;line-height:1.35}.od-status strong{display:block;font-size:clamp(12px,1.5vw,17px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.od-hptext{color:#a0eee0;font-variant-numeric:tabular-nums}.od-status.enemy{text-align:right}.enemy small{color:#f9b899}.od-timer{text-align:center;white-space:nowrap;color:#b2c5c6;font-size:10px;line-height:1.1}.od-clock{display:block;color:#f7dfa4;font-size:clamp(18px,2.8vw,29px);font-weight:750;font-variant-numeric:tabular-nums;letter-spacing:.04em}
.od-pausebtn{flex:0 0 44px;width:44px;height:36px;background:#253741;color:#e4ede7;border:1px solid #61757f;border-radius:4px}.od-field{position:relative;min-width:0;min-height:0;overflow:hidden;background:#101b24}.od-field canvas{display:block;position:absolute;inset:0;width:100%;height:100%;min-width:0;min-height:0;object-fit:contain;touch-action:none;image-rendering:pixelated}
.od-tag{position:absolute;top:6px;left:max(8px,env(safe-area-inset-left));padding:3px 7px;border-left:2px solid #d4b078;background:#15212ccf;font-size:11px;color:#f3e1bd;pointer-events:none}.od-banner{position:absolute;top:23%;left:50%;transform:translateX(-50%);background:#102632ed;border:1px solid #8bdfd2;padding:6px 14px;font-size:14px;white-space:nowrap;color:#edfff8}.orbit-duel [hidden]{display:none!important}
.od-footer{min-height:30px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#bacbd1;padding:5px max(12px,env(safe-area-inset-right));font-size:12px;border-top:1px solid #344954;background:#14212a}.od-footer b{color:#fcdda8}.od-mode{font-variant-numeric:tabular-nums;color:#a4eadc}
.od-touch{display:none;position:absolute;inset:0;pointer-events:none}.od-touch-on .od-touch{display:block}.od-stick,.od-acts button{pointer-events:auto;touch-action:none;-webkit-touch-callout:none;color:#f4fff9;border:1px solid #acc9c8b0;background:#182b36c9;box-shadow:inset 0 0 0 2px #1a2b3380,0 2px 5px #0005}
.od-stick{position:absolute;left:max(11px,env(safe-area-inset-left));bottom:13px;width:clamp(68px,14vmin,96px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;font-size:11px;color:#bfd2d8}.od-stick:after{content:'';position:absolute;width:34%;height:34%;pointer-events:none;border:1px solid #afdad2;background:#58767a;border-radius:50%;transform:translate(var(--sx,0),var(--sy,0))}.od-stick span{align-self:end;margin-bottom:6px}
.od-acts{position:absolute;right:max(10px,env(safe-area-inset-right));bottom:10px;display:flex;align-items:flex-end;gap:6px}.od-acts button{position:relative;min-width:46px;min-height:46px;padding:3px 6px;border-radius:9px;font-size:12px;font-weight:750;line-height:1.15}.od-acts button[data-op=fire]{width:58px;height:58px;border-radius:50%;border-color:#93e5d4;color:#e0fff0}.od-acts button.held{background:#396a66;border-color:#ebfff5}.od-touch-on .od-keyhelp{display:none}
.od-cover{position:absolute;inset:0;display:grid;place-items:center;z-index:4;background:#0b1823c9}.od-cover div{background:#192a35;padding:17px 26px;text-align:center;border:1px solid #647781;border-radius:5px}.od-cover strong{display:block;margin-bottom:10px}.od-cover button{color:#0a2528;background:#a2ecdc;border:0;border-radius:4px;min-height:44px;padding:4px 23px;font-weight:700}
@media(pointer:coarse),(max-width:700px){.od-pausebtn{height:44px}.od-status strong{font-size:13px}.od-footer{font-size:11px;padding-block:3px;min-height:22px}.od-tag{font-size:10px}}
@media(max-height:420px){.od-hud{min-height:31px;padding-block:1px}.od-pausebtn{height:34px}.od-clock{font-size:21px}.od-footer{min-height:20px;padding-block:1px}.od-tag{top:2px}}
`;
const shell=`<div class="od-hud"><div class="od-status"><strong data-pilot></strong><small class="od-hptext" data-hp></small></div>
<div class="od-timer">戦闘残り<strong class="od-clock"></strong></div><div class="od-status enemy"><strong data-target></strong><small data-target-hp></small></div>
<button type="button" class="od-pausebtn" aria-label="戦闘を一時停止">Ⅱ</button></div>
<div class="od-field"><canvas width="600" height="328" aria-label="戦闘エリア　敵をタップすると照準を切り替えます"></canvas><div class="od-tag"></div>
<div class="od-banner" role="status" hidden></div><div class="od-touch"><div class="od-stick" role="group" aria-label="移動スティック"><span>移動</span></div><div class="od-acts">
<button type="button" data-op="boost">急加速</button><button type="button" data-op="slash">近接</button><button type="button" data-op="fire">射撃</button>
</div></div></div><div class="od-footer"><span class="od-keyhelp"><b>WASD / 矢印</b> 移動　<b>J</b> 射撃　<b>K</b> 近接　<b>L</b> 急加速　<b>Q</b> 照準</span>
<span class="od-mode"></span></div><div class="od-cover" hidden><div><strong>戦闘を一時停止</strong><button type="button">操縦を再開</button></div></div>`;
export function startBattle(host,battle,{pilotId,onFinish,onSound,onPauseChange}={}){
  const s=createBattle(battle,pilotId),root=document.createElement('section');root.className='orbit-duel';
  const style=document.createElement('style');style.textContent=skin;
  root.innerHTML=shell;root.prepend(style);host.replaceChildren(root);
  const el=sel=>root.querySelector(sel),canvas=el('canvas'),ctx=canvas.getContext('2d'),terrain=makeTerrain(s);
  const clock=el('.od-clock'),hp=el('[data-hp]'),enemyHp=el('[data-target-hp]'),pilotName=el('[data-pilot]'),lockName=el('[data-target]'),banner=el('.od-banner'),ready=el('.od-mode');
  const cover=el('.od-cover'),stick=el('.od-stick'),buttons=[...root.querySelectorAll('[data-op]')];
  el('.od-tag').textContent=arenaNames[s.terrain]||arenaNames.plain;
  const touch=window.matchMedia('(any-pointer:coarse)').matches||navigator.maxTouchPoints>0;
  root.classList.toggle('od-touch-on',touch);
  ctx.imageSmoothingEnabled=false;
  const keys=new Set(),holders=new Map(),abort=new AbortController(),opts={signal:abort.signal};
  let joy=null,jx=0,jy=0,boost=false,target=false,raf=0,last=0,acc=0,paused=false,ended=false;
  const moveKeys=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyJ','KeyK','KeyL','KeyQ','Escape']);
  function clearInput(){
    keys.clear();holders.clear();joy=null;jx=0;jy=0;boost=false;target=false;
    stick.style.removeProperty('--sx');stick.style.removeProperty('--sy');
    for(const b of buttons)b.classList.remove('held');
  }
  function pause(){
    if(ended||paused)return;paused=true;clearInput();last=0;acc=0;cover.hidden=false;
    cancelAnimationFrame(raf);onPauseChange?.(true);el('.od-cover button').focus({preventScroll:true});
  }
  function resume(){
    if(ended||!paused||document.hidden)return;paused=false;clearInput();last=0;acc=0;cover.hidden=true;
    onPauseChange?.(false);raf=requestAnimationFrame(frame);
  }
  const listen=(target,evt,cb,opt={})=>target.addEventListener(evt,cb,{...opts,...opt});
  listen(window,'keydown',e=>{
    if(!moveKeys.has(e.code)||e.ctrlKey||e.metaKey||e.altKey||ended)return;
    e.preventDefault();
    if(e.code==='Escape'&&!e.repeat){if(paused)resume();else pause();return}
    if(paused)return;
    if(!e.repeat&&e.code==='KeyL')boost=true;
    if(!e.repeat&&e.code==='KeyQ')target=true;
    keys.add(e.code);
  });
  listen(window,'keyup',e=>{keys.delete(e.code)});
  listen(window,'blur',pause);listen(document,'visibilitychange',()=>{if(document.hidden)pause()});
  listen(window,'orientationchange',pause);
  if(screen.orientation?.addEventListener)listen(screen.orientation,'change',pause);
  listen(el('.od-pausebtn'),'click',pause);listen(el('.od-cover button'),'click',resume);
  listen(root,'contextmenu',e=>e.preventDefault());
  function bindPointer(node,down,move,up){
    listen(node,'pointerdown',e=>{
      if(ended||paused||e.button!==0)return;e.preventDefault();
      if(!down(e))return;
      try{node.setPointerCapture(e.pointerId)}catch{/* The OS already cancelled the contact. */up(e)}
    });
    if(move)listen(node,'pointermove',move);
    for(const event of ['pointerup','pointercancel','lostpointercapture'])listen(node,event,up);
  }
  function shiftStick(e){
    if(e.pointerId!==joy||paused)return;
    const r=stick.getBoundingClientRect(),range=r.width*.36,dx=e.clientX-r.x-r.width/2,dy=e.clientY-r.y-r.height/2;
    const den=Math.max(range,Math.hypot(dx,dy));jx=dx/den;jy=dy/den;
    stick.style.setProperty('--sx',jx*range*.88+'px');stick.style.setProperty('--sy',jy*range*.88+'px');
  }
  bindPointer(stick,e=>{if(joy!==null)return false;joy=e.pointerId;shiftStick(e);return true},shiftStick,e=>{
    if(e.pointerId!==joy)return;joy=null;jx=0;jy=0;
    stick.style.removeProperty('--sx');stick.style.removeProperty('--sy');
  });
  for(const b of buttons){
    bindPointer(b,e=>{
      holders.set(e.pointerId,b.dataset.op);b.classList.add('held');if(b.dataset.op==='boost')boost=true;return true;
    },null,e=>{
      if(holders.get(e.pointerId)!==b.dataset.op)return;
      holders.delete(e.pointerId);if(![...holders.values()].includes(b.dataset.op))b.classList.remove('held');
    });
  }
  listen(canvas,'pointerdown',e=>{
    if(paused||ended||e.button!==0)return;
    e.preventDefault();
    if(e.pointerType==='touch')root.classList.add('od-touch-on');
    const r=canvas.getBoundingClientRect(),scale=Math.min(r.width/W,r.height/H);
    const x=(e.clientX-r.left-(r.width-W*scale)/2)/scale,y=(e.clientY-r.top-(r.height-H*scale)/2)/scale;
    const enemies=s.fighters.filter(f=>f.side==='red'&&f.hp>0).sort((a,b)=>dist(a,{x,y})-dist(b,{x,y}));
    if(enemies[0]&&dist(enemies[0],{x,y})<=Math.max(22,21/scale))target=enemies[0].id;
  });
  function stateInput(){
    const held=[...holders.values()],dir=(a,b)=>keys.has(a)||keys.has(b);
    const input={x:Number(dir('KeyD','ArrowRight'))-Number(dir('KeyA','ArrowLeft'))+jx,
      y:Number(dir('KeyS','ArrowDown'))-Number(dir('KeyW','ArrowUp'))+jy,
      fire:keys.has('KeyJ')||held.includes('fire'),slash:keys.has('KeyK')||held.includes('slash'),boost,target};
    boost=false;target=false;return input;
  }
  function write(node,value){if(node.textContent!==value)node.textContent=value}
  function hud(){
    const f=s.fighters.find(f=>f.id===s.pilotId),t=s.fighters.find(f=>f.id===s.targetId);
    write(clock,Math.ceil(Math.max(0,LIMIT-s.elapsed)).toString().padStart(2,'0')+' 秒');
    if(f){
      write(pilotName,'操縦　'+mechName(f.kind));write(hp,'HP '+f.hp+' / '+f.maxHp);
      write(ready,f.boostCool<=0?'ブースト使用可':'ブースト充填　'+f.boostCool.toFixed(1)+' 秒');
    }
    if(t){write(lockName,'照準　'+mechName(t.kind));write(enemyHp,'HP '+t.hp+' / '+t.maxHp)}
    banner.hidden=s.bannerTime<=0;if(s.bannerTime>0)write(banner,s.banner);
  }
  function frame(ms){
    if(ended||paused)return;
    acc+=last?Math.min(.10,Math.max(0,(ms-last)/1000)):0;last=ms;
    while(acc>=1/60&&!s.reason){stepBattle(s,stateInput(),1/60);acc-=1/60}
    for(const e of s.events)onSound?.(e.type);s.events.length=0;
    drawFrame(ctx,s,terrain);hud();
    if(s.reason){
      ended=true;clearInput();abort.abort();
      onFinish?.(battleResults(s),{reason:s.reason,elapsed:s.elapsed});
    }else raf=requestAnimationFrame(frame);
  }
  function destroy(){ended=true;cancelAnimationFrame(raf);clearInput();abort.abort();root.remove()}
  drawFrame(ctx,s,terrain);hud();raf=requestAnimationFrame(frame);
  return {model:s,pause,resume,destroy};
}
