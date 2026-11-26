// Pointy-topped, odd-row offset hexes. Arena bearings use this same projection.
export const WIDTH = 12, HEIGHT = 9;
export const TYPES = Object.freeze({
  scout: {name:'ピケット', hp:65, move:5, price:120, turns:1, role:'高速偵察・占領。クレーターを減速せずに越え、ブーストで側面へ。'},
  line: {name:'リベット', hp:100, move:4, price:180, turns:1, role:'前線護衛。連射砲と近接を両立。'},
  heavy: {name:'バサルト', hp:112, move:3, price:300, turns:2, role:'包囲支援。予備動作の長い強力な重砲。'},
  carrier: {name:'キャラベル', hp:180, move:3, price:0, turns:0, role:'補給母艦。僚機2機を収容・修理。'}
});
const SIDE = {blue:'環潮同盟',red:'赤環機構'};
const OTHER = {blue:'red',red:'blue'};
const ROUNDS = 30;
const terrainNames = {c:'crater','^':'ridge','=':'road','.':'plain'};
const rows = [
  '.c..^^..cc..',
  '..c...cc..^.',
  '.^..c...^...',
  '...^^...c...',
  '============',
  '..c.^..^^.c.',
  '..^..cc..^..',
  '.==========.',
  '...c..^..c..'
];
export const inside = (q,r) => Number.isInteger(q) && Number.isInteger(r) && q>=0 && q<WIDTH && r>=0 && r<HEIGHT;
export function terrainAt(q,r) {
  if (!inside(q,r)) return 'ridge';
  return terrainNames[rows[r][q]];
}
export const hexXY = (q,r) => ({x:q+(r&1)*0.5, y:r*Math.sqrt(3)/2});
export function hexDistance(q,r,s,t) {
  const dx=(q-Math.floor(r/2))-(s-Math.floor(t/2)), dz=r-t;
  return (Math.abs(dx)+Math.abs(dz)+Math.abs(dx+dz))/2;
}
export function neighbors(q,r) {
  const offset=r&1;
  return [[q-1,r],[q+1,r],[q-1+offset,r-1],[q+offset,r-1],[q-1+offset,r+1],[q+offset,r+1]]
    .filter(([x,y])=>inside(x,y)).map(([x,y])=>({q:x,r:y}));
}
export const rank = xp => xp>=5?'エース':xp>=2?'ベテラン':'一般';
export const at = (s,q,r) => s.units.find(u=>!u.carrierId && u.q===q && u.r===r);
export const siteAt = (s,q,r) => s.sites.find(p=>p.q===q && p.r===r);
const unit = (s,id) => s.units.find(u=>u.id===id);
const distance = (a,b) => hexDistance(a.q,a.r,b.q,b.r);
const indexOf = (q,r) => r*WIDTH+q;
const available = (s,q,r) => inside(q,r) && terrainAt(q,r)!=='ridge' && !at(s,q,r);
const freeAround = (s,q,r) => neighbors(q,r).filter(p=>available(s,p.q,p.r));
const addLog = (s,msg) => {s.log.push(msg); if(s.log.length>30)s.log.shift();};
const robot = (id,side,kind,q,r) => ({id,side,kind,q,r,hp:TYPES[kind].hp,xp:0,kills:0,battles:0,acted:false,carrierId:null});
const port = (q,r,type,owner) => ({q,r,type,owner,queue:null});
export const income = (s,side) => s.sites.filter(p=>p.owner===side).reduce((n,p)=>n+(p.type==='hq'?120:90),0);
export const cargoOf = (s,id) => s.units.filter(u=>u.carrierId===id);
export function newGame() {
  const s={version:1,round:1,turn:'blue',serial:0,funds:{blue:260,red:260},
    units:[robot('blue-scout','blue','scout',3,4),robot('blue-line','blue','line',3,6),
      robot('blue-heavy','blue','heavy',5,2),robot('blue-carrier','blue','carrier',1,5),
      robot('red-scout','red','scout',8,6),robot('red-line','red','line',8,4),
      robot('red-heavy','red','heavy',6,4),robot('red-carrier','red','carrier',10,5)],
    sites:[port(1,4,'hq','blue'),port(6,4,'factory',null),port(6,7,'factory',null),port(10,4,'hq','red')],
    log:[],pending:null,lastCpu:null,outcome:null};
  beginTurn(s);
  return s;
}
// Weighted flood fill. Occupied hexes block transit as well as the destination.
function reach(s,u,goalIfVacated=null) {
  if (!u || u.carrierId) return [];
  const best=new Map([[indexOf(u.q,u.r),0]]), work=[{q:u.q,r:u.r,cost:0}];
  for(let i=0;i<work.length;i++) {
    const current=work[i];
    if(current.cost!==best.get(indexOf(current.q,current.r)))continue;
    for(const p of neighbors(current.q,current.r)){
      const terminal=goalIfVacated && p.q===goalIfVacated.q && p.r===goalIfVacated.r;
      if(!available(s,p.q,p.r) && !terminal)continue;
      const cost=current.cost+(terrainAt(p.q,p.r)==='crater' && u.kind!=='scout'?2:1);
      const key=indexOf(p.q,p.r);
      if(cost>TYPES[u.kind].move || cost>=(best.get(key)??Infinity))continue;
      best.set(key,cost);
      if(!terminal)work.push({...p,cost});
    }
  }
  return [...best.keys()].map(k=>({q:k%WIDTH,r:Math.floor(k/WIDTH)}));
}
const canAct=(s,u)=>!!u && !s.outcome && !s.pending && u.side===s.turn && !u.acted && !u.carrierId;
export function reachable(s,id) {
  const u=unit(s,id);
  return canAct(s,u)?reach(s,u):[];
}
export function threats(s,side) {
  const cells=new Map();
  for(const u of s.units.filter(u=>u.side===side && !u.carrierId)){
    for(const p of reach(s,u))for(const n of neighbors(p.q,p.r))if(terrainAt(n.q,n.r)!=='ridge')cells.set(indexOf(n.q,n.r),n);
  }
  return [...cells.values()];
}
function optionsAt(s,u,q,r) {
  const adjacent=neighbors(q,r).map(p=>at(s,p.q,p.r)).filter(Boolean);
  return {
    attacks:adjacent.filter(v=>v.side!==u.side).map(v=>v.id),
    capture:u.kind!=='carrier' && !!s.sites.find(p=>p.q===q && p.r===r && p.owner!==u.side),
    wait:true,
    load:u.kind==='carrier'?[]:adjacent.filter(v=>v.side===u.side && v.kind==='carrier' && cargoOf(s,v.id).length<2).map(v=>v.id)
  };
}
export function commands(s,id,q,r) {
  return reachable(s,id).some(p=>p.q===q && p.r===r)? optionsAt(s,unit(s,id),q,r):{attacks:[],capture:false,wait:false,load:[]};
}
function assemble(s,lead,q,r,target) {
  const center=hexXY(target.q,target.r), mainPos=hexXY(q,r);
  const dx=mainPos.x-center.x, dy=mainPos.y-center.y;
  const nearby=s.units.filter(v=>v.id!==lead.id && v.id!==target.id && !v.carrierId && distance(target,v)===1);
  // Prefer the widest pincer when more than two allies qualify. Stable id resolves ties.
  const alignment=v=>{const pos=hexXY(v.q,v.r);return (pos.x-center.x)*dx+(pos.y-center.y)*dy;};
  nearby.sort((a,b)=>alignment(a)-alignment(b) || b.xp-a.xp || a.id.localeCompare(b.id));
  const roster=[{...lead,q,r},target,...nearby.filter(v=>v.side===lead.side).slice(0,2),...nearby.filter(v=>v.side===target.side).slice(0,2)];
  return {id:'battle-'+(s.serial+1),terrain:siteAt(s,target.q,target.r)?.type??terrainAt(target.q,target.r),
    attackerId:lead.id,defenderId:target.id,q:target.q,r:target.r,
    fighters:roster.map(v=>{const pos=hexXY(v.q,v.r);return {id:v.id,kind:v.kind,side:v.side,name:TYPES[v.kind].name,
      q:v.q,r:v.r,hp:v.hp,maxHp:TYPES[v.kind].hp,xp:v.xp,dx:pos.x-center.x,dy:pos.y-center.y};})};
}
export function previewBattle(s,id,q,r,targetId) {
  if(!commands(s,id,q,r).attacks.includes(targetId))return null;
  return assemble(s,unit(s,id),q,r,unit(s,targetId));
}
function scoredOutcome(s,winner,reason) {
  s.outcome={winner,reason}; addLog(s,winner?SIDE[winner]+'が戦域を確保。':'両軍の拠点数が並び、停戦。');
}
function position(s,u,q,r) {
  u.q=q;u.r=r;
  if(u.kind==='carrier')for(const c of cargoOf(s,u.id)){c.q=q;c.r=r;}
}
export function commit(s,id,q,r,action='wait',targetId=null) {
  const options=commands(s,id,q,r), u=unit(s,id);
  if(!options.wait)return false;
  if(action==='attack'){
    if(!options.attacks.includes(targetId))return false;
    const target=unit(s,targetId);
    s.pending=assemble(s,u,q,r,target);
    s.serial++;
    position(s,u,q,r);u.acted=true;
    addLog(s,TYPES[u.kind].name+'が'+TYPES[target.kind].name+'と交戦。');
  } else if(action==='capture' && options.capture){
    const p=siteAt(s,q,r);
    position(s,u,q,r);u.acted=true;p.owner=u.side;p.queue=null;
    addLog(s,SIDE[u.side]+'が'+(p.type==='hq'?'本拠地':'工場')+'を占領。');
    if(p.type==='hq')scoredOutcome(s,u.side,'capture');
  } else if(action==='load' && options.load.includes(targetId)){
    const c=unit(s,targetId);position(s,u,c.q,c.r);u.carrierId=c.id;u.acted=true;
    addLog(s,TYPES[u.kind].name+'を母艦へ収容。');
  } else if(action==='wait'){
    position(s,u,q,r);u.acted=true;addLog(s,TYPES[u.kind].name+'が配置についた。');
  } else return false;
  return true;
}
export function finishBattle(s,id,results) {
  const battle=s.pending;
  if(!battle || battle.id!==id || !Array.isArray(results) || results.length!==battle.fighters.length)return null;
  const report=[],dead=new Set(), parsed=new Map();
  for(const v of battle.fighters) {
    const t=results.find(t=>t && t.id===v.id);
    if(!t || !Number.isFinite(t.hp) || !Number.isInteger(t.kills??0) || (t.kills??0)<0)return null;
    parsed.set(v.id,{hp:Math.max(0,Math.min(v.hp,Math.ceil(t.hp))),kills:Math.min(t.kills??0,3)});
  }
  for(const v of battle.fighters){
    const u=unit(s,v.id), result=parsed.get(v.id), oldRank=rank(u.xp);
    u.hp=result.hp; u.kills+=result.kills;u.battles++;
    if(u.hp>0 && u.kind!=='carrier')u.xp+=1+result.kills;
    if(!u.hp){dead.add(u.id);for(const cargo of cargoOf(s,u.id))dead.add(cargo.id);}
    report.push({id:u.id,kind:u.kind,name:TYPES[u.kind].name,side:u.side,hp:u.hp,maxHp:TYPES[u.kind].hp,
      kills:result.kills,destroyed:u.hp===0,promoted:rank(u.xp)!==oldRank,rank:rank(u.xp)});
  }
  for(const u of s.units.filter(u=>u.carrierId && dead.has(u.id))) {
    report.push({id:u.id,kind:u.kind,name:TYPES[u.kind].name+'（搭載中）',side:u.side,hp:0,maxHp:TYPES[u.kind].hp,
      kills:0,destroyed:true,promoted:false,rank:rank(u.xp)});
  }
  s.units=s.units.filter(u=>!dead.has(u.id));s.pending=null;
  addLog(s,'交戦終了。撃破 '+dead.size+'機。');
  return report;
}
export function produce(s,q,r,kind) {
  const p=siteAt(s,q,r), type=TYPES[kind];
  if(s.pending || s.outcome || !type?.price || !p || p.queue || p.owner!==s.turn || s.funds[s.turn]<type.price)return false;
  s.funds[s.turn]-=type.price;p.queue={kind,remaining:type.turns};
  addLog(s,SIDE[s.turn]+'が'+type.name+'の生産を開始。');return true;
}
export function deployCells(s,q,r) {
  const p=siteAt(s,q,r);
  return !s.pending && !s.outcome && p && p.owner===s.turn && p.queue?.remaining===0?freeAround(s,q,r):[];
}
export function deploy(s,q,r,toQ,toR) {
  const p=siteAt(s,q,r);
  if(!deployCells(s,q,r).some(v=>v.q===toQ && v.r===toR))return false;
  const id=s.turn+'-new-'+(++s.serial), u=robot(id,s.turn,p.queue.kind,toQ,toR);
  p.queue=null;s.units.push(u);addLog(s,TYPES[u.kind].name+'が配備された。');return true;
}
export function unloadCells(s,id) {
  const c=unit(s,id);
  return canAct(s,c) && c.kind==='carrier' && cargoOf(s,id).length?freeAround(s,c.q,c.r):[];
}
export function unload(s,carrierId,cargoId,q,r) {
  const c=unit(s,carrierId),v=unit(s,cargoId);
  if(!v || v.carrierId!==carrierId || !unloadCells(s,carrierId).some(p=>p.q===q && p.r===r))return false;
  position(s,v,q,r);v.carrierId=null;v.acted=true;c.acted=true;
  addLog(s,TYPES[v.kind].name+'が母艦から再出撃。');return true;
}
function beginTurn(s) {
  s.funds[s.turn]+=income(s,s.turn);
  for(const u of s.units.filter(v=>v.side===s.turn)){
    u.acted=false;
    if(u.carrierId)u.hp=Math.min(TYPES[u.kind].hp,u.hp+Math.ceil(TYPES[u.kind].hp*.24));
  }
  for(const p of s.sites.filter(p=>p.owner===s.turn && p.queue)){
    p.queue.remaining=Math.max(0,p.queue.remaining-1);
    const [free]=deployCells(s,p.q,p.r);
    if(free)deploy(s,p.q,p.r,free.q,free.r);
  }
  addLog(s,'第'+s.round+'ラウンド・'+SIDE[s.turn]+'に収入 '+income(s,s.turn)+'。');
}
export function endTurn(s) {
  if(s.pending || s.outcome)return false;
  if(s.turn==='red' && s.round===ROUNDS){
    const count=side=>s.sites.filter(p=>p.owner===side).length,diff=count('blue')-count('red');
    scoredOutcome(s,diff>0?'blue':diff<0?'red':null,'rounds');return true;
  }
  if(s.turn==='red')s.round++;
  s.turn=OTHER[s.turn];beginTurn(s);return true;
}

// Route estimates use the same immutable terrain, independent of transient occupied cells.
const routeCache = new Map();
function route(from,to) {
  const dest=indexOf(to.q,to.r);
  if(!routeCache.has(dest)){
    const values=new Float64Array(WIDTH*HEIGHT).fill(Infinity);
    values[dest]=0;
    const open=[to];
    for(let i=0;i<open.length;i++){
      const p=open[i],cost=values[indexOf(p.q,p.r)]+(terrainAt(p.q,p.r)==='crater'?2:1);
      for(const n of neighbors(p.q,p.r)){
        const key=indexOf(n.q,n.r);
        if(terrainAt(n.q,n.r)==='ridge' || values[key]<=cost)continue;
        values[key]=cost;open.push(n);
      }
    }
    routeCache.set(dest,values);
  }
  return routeCache.get(dest)[indexOf(from.q,from.r)];
}
const noteCpu=(s,id,q,r,text)=>{s.lastCpu={id,q,r,text};return true;};
function cpuIndustry(s) {
  const sites=s.sites.filter(p=>p.owner==='red');
  for(const p of sites){
    const [free]=deployCells(s,p.q,p.r);
    if(free && deploy(s,p.q,p.r,free.q,free.r))return noteCpu(s,null,free.q,free.r,'出撃待ちの機体を配備');
  }
  const active=s.units.filter(u=>u.side==='red');
  const count=kind=>active.filter(u=>u.kind===kind).length+sites.filter(p=>p.queue?.kind===kind).length;
  // A damaged front often needs a fresh scout immediately; otherwise keep a mixed detachment.
  const choices=['scout','line','heavy'].sort((a,b)=>{
    const weights={scout:1.1,line:1.5,heavy:.85};
    return count(a)/weights[a]-count(b)/weights[b];
  });
  const preferred=choices[0], target=s.sites.find(p=>p.type==='hq' && p.owner==='blue');
  if(!target)return false;
  const port=sites.filter(p=>!p.queue).sort((a,b)=>route(a,target)-route(b,target))[0];
  if(!port)return false;
  // Save toward a heavy gun instead of repeatedly buying the cheapest unit.
  const kind=active.length<=2?choices.find(k=>TYPES[k].price<=s.funds.red):preferred;
  if(kind && produce(s,port.q,port.r,kind))return noteCpu(s,null,port.q,port.r,TYPES[kind].name+'の生産を指示');
  return false;
}
function cpuCommand(s) {
  const active=s.units.filter(u=>u.side==='red' && !u.carrierId),enemies=s.units.filter(u=>u.side==='blue' && !u.carrierId);
  const home=s.sites.find(p=>p.type==='hq' && p.owner==='red');
  const enemyHome=s.sites.find(p=>p.type==='hq' && p.owner==='blue');
  const incoming=enemies.filter(v=>v.kind!=='carrier' && (v.kind==='scout'?distance(v,home):route(v,home))<=TYPES[v.kind].move+1);
  // The enemy acts next. Test actual paths through current traffic, treating
  // our HQ as a terminal square if its present guard chooses to vacate it.
  const immediate=incoming.filter(v=>reach(s,v,home).some(p=>p.q===home.q && p.r===home.r));
  const resident=at(s,home.q,home.r);
  const ports=s.sites.filter(p=>p.owner!=='red');
  const ownCarrier=active.find(u=>u.kind==='carrier');
  let best=null;
  const consider=(score,u,p,action,target=null,why='')=>{
    if(!best || score>best.score+.0001)best={score,u,p,action,target,why};
  };
  for(const u of active.filter(v=>!v.acted)){
    const isCarrier=u.kind==='carrier', injured=u.hp/TYPES[u.kind].hp;
    if(isCarrier){
      const ready=cargoOf(s,u.id).filter(c=>c.hp>=TYPES[c.kind].hp*.80 || incoming.length && c.hp>TYPES[c.kind].hp*.50);
      if(ready.length){
        const dest=unloadCells(s,u.id).sort((a,b)=>route(a,incoming[0]??enemyHome)-route(b,incoming[0]??enemyHome))[0];
        if(dest)consider(105,u,dest,'unload',ready[0].id,'修理を終えた機体を再出撃');
      }
    }
    for(const p of reach(s,u)){
      const options=optionsAt(s,u,p.q,p.r),site=siteAt(s,p.q,p.r);
      const allies=active.filter(v=>v.id!==u.id);
      const guard=incoming.length && (!resident || resident.id===u.id);
      const anchored=guard && distance(p,home)===0;
      // A factory sortie cannot justify handing the enemy this HQ next turn.
      if(immediate.length && resident?.id===u.id && !anchored && !(options.capture && site.type==='hq'))continue;
      if(options.capture)consider(site.type==='hq'?10000:139,u,p,'capture',null,site.type==='hq'?'本拠地の占領を狙う':'工場を占領');
      if(!isCarrier && options.load.length && injured<.55){
        consider(104+(1-injured)*28+Math.min(9,u.xp*2),u,p,'load',options.load[0],'損傷機を母艦へ退避');
      }
      for(const id of options.attacks){
        const target=unit(s,id),battle=assemble(s,u,p.q,p.r,target);
        const friends=battle.fighters.filter(v=>v.side===u.side),foes=battle.fighters.filter(v=>v.side!==u.side);
        const threat=target.kind!=='carrier' && incoming.some(v=>v.id===target.id);
        const base=57+(friends.length-foes.length)*16+(1-target.hp/TYPES[target.kind].hp)*26+(injured-.5)*13;
        const guardBonus=anchored?(immediate.length?160:70):threat?38:0;
        const poorCarrierFight=isCarrier && friends.length===1?32:0;
        const isolation=foes.length===1?7:0;
        consider(base+guardBonus+isolation-poorCarrierFight,u,p,'attack',id,threat?'本拠地に迫る敵を迎撃':friends.length>1?'僚機と連携して攻撃':'敵機に攻撃');
        // Take the far flank first if a fresh companion can initiate the fight this turn.
        if(!isCarrier && !threat && target.kind!=='scout' && friends.length===1){
          const partner=allies.find(v=>!v.acted && v.kind!=='carrier' && distance(v,target)>1 && distance(v,target)<=TYPES[v.kind].move+1);
          if(partner){
            const a=hexXY(p.q,p.r), b=hexXY(partner.q,partner.r),c=hexXY(target.q,target.r);
            const opposite=((a.x-c.x)*(b.x-c.x)+(a.y-c.y)*(b.y-c.y))/Math.max(.1,Math.hypot(b.x-c.x,b.y-c.y));
            if(opposite<-.55)consider(81-opposite,u,p,'wait',null,'僚機のために敵の背後へ展開');
          }
        }
      }
      let score=0,why='前線へ移動';
      if(anchored){score=immediate.length?194:122;why='本拠地に防衛線を敷く';}
      else if(isCarrier){
        const damaged=allies.filter(v=>v.kind!=='carrier').sort((a,b)=>(a.hp/TYPES[a.kind].hp)-(b.hp/TYPES[b.kind].hp))[0];
        const dest=damaged??home;
        score=17-Math.abs(route(p,dest)-2)*2-Math.max(0,4-Math.min(...enemies.map(e=>distance(p,e)),10))*3;
        why='前線へ補給線を延ばす';
      }else if(injured<.42 && ownCarrier && cargoOf(s,ownCarrier.id).length<2){
        score=48-route(p,ownCarrier)*3+Math.min(5,u.xp);why='修理に向かう';
      }else{
        score=Math.max(...ports.map(t=>(t.type==='hq'?32:35)-route(p,t)*3));
        if(incoming.length && !isCarrier && distance(u,home)<6){
          const defense=46-distance(p,home)*4;
          if(defense>score){score=defense;why='本拠地の側面を守る';}
        }
      }
      consider(score,u,p,'wait',null,why);
    }
  }
  if(!best)return false;
  const {u,p,action,target,why}=best;
  const ok=action==='unload'?unload(s,u.id,target,p.q,p.r):commit(s,u.id,p.q,p.r,action,target);
  const aim=action==='attack'?unit(s,target):p;
  return ok && noteCpu(s,u.id,aim.q,aim.r,TYPES[u.kind].name+'：'+why);
}
export function cpuStep(s) {
  if(s.turn!=='red' || s.pending || s.outcome)return false;
  if(cpuIndustry(s) || cpuCommand(s))return true;
  s.lastCpu=null;
  return endTurn(s);
}

const bounded=(n,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n) && n>=0 && n<=max;
export function validSave(s) {
  if(!s || s.version!==1 || !['blue','red'].includes(s.turn) || !Number.isInteger(s.round) || s.round<1 || s.round>ROUNDS ||
    !bounded(s.serial) || !bounded(s.funds?.blue) || !bounded(s.funds?.red) || !Array.isArray(s.units) || s.units.length>200 ||
    !Array.isArray(s.sites) || s.sites.length!==4 || !Array.isArray(s.log) || !s.log.every(t=>typeof t==='string'))return false;
  const expected=[[1,4,'hq'],[6,4,'factory'],[6,7,'factory'],[10,4,'hq']];
  if(!expected.every(([q,r,type])=>s.sites.some(p=>p && p.q===q && p.r===r && p.type===type &&
    [null,'blue','red'].includes(p.owner) && (type!=='hq' || p.owner!==null) && (p.queue===null || (
      p.owner && ['scout','line','heavy'].includes(p.queue?.kind) && bounded(p.queue.remaining,TYPES[p.queue.kind].turns))))))return false;
  const locations=new Set(),ids=new Set();
  for(const u of s.units){
    if(!u || typeof u.id!=='string' || !u.id || ids.has(u.id) || !Object.hasOwn(TYPES,u.kind) || !['blue','red'].includes(u.side) ||
      !inside(u.q,u.r) || terrainAt(u.q,u.r)==='ridge' || !bounded(u.hp,TYPES[u.kind].hp) || !u.hp || typeof u.acted!=='boolean' ||
      !bounded(u.xp) || !bounded(u.kills) || !bounded(u.battles))return false;
    ids.add(u.id);
    const pos=indexOf(u.q,u.r);
    if(!u.carrierId && locations.has(pos))return false;
    if(!u.carrierId)locations.add(pos);
  }
  for(const u of s.units.filter(v=>v.carrierId)){
    const c=unit(s,u.carrierId);
    if(u.kind==='carrier' || c?.kind!=='carrier' || c.side!==u.side || distance(c,u)!==0 || cargoOf(s,c.id).length>2)return false;
  }
  if(s.outcome!==null && (!s.outcome || ![null,'blue','red'].includes(s.outcome.winner) || !['capture','rounds'].includes(s.outcome.reason)))return false;
  if(!s.outcome && !['red','blue'].every(side=>s.sites.some(p=>p.type==='hq' && p.owner===side)))return false;
  if(s.pending!==null){
    const b=s.pending, att=b && unit(s,b.attackerId),def=b && unit(s,b.defenderId);
    if(s.outcome || !att || !def || att.carrierId || def.carrierId || !att.acted || att.side!==s.turn ||
      def.side===att.side || distance(att,def)!==1 || !Array.isArray(b.fighters) || b.fighters.length>6)return false;
    const expected=assemble(s,att,att.q,att.r,def);
    if(b.id!=='battle-'+s.serial || b.q!==def.q || b.r!==def.r || b.terrain!==expected.terrain || b.fighters.length!==expected.fighters.length)return false;
    if(!expected.fighters.every(v=>b.fighters.some(f=>f && Object.keys(v).every(k=>v[k]===f[k]))))return false;
  }
  return true;
}
