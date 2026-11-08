import {MISSIONS,buildMission} from './maps.mjs';
export {MISSIONS};
export const SAVE_VERSION=1,MAX_UNITS=40,MAX_UNITS_PER_TEAM=20;
const freeze=Object.freeze;
export const UNIT_TYPES=freeze({
  infantry:freeze({name:'歩兵',short:'歩',cost:1000,move:3,movement:'foot',range:[1,1],domain:'ground',capture:true,description:'拠点を占領できる唯一の兵科。森や山も越えられる。'}),
  recon:freeze({name:'偵察車',short:'偵',cost:3000,move:6,movement:'wheel',range:[1,1],domain:'ground',description:'道路を素早く進み、歩兵を狙う軽車両。'}),
  tank:freeze({name:'戦車',short:'戦',cost:7000,move:5,movement:'tread',range:[1,1],domain:'ground',description:'攻守のバランスに優れた地上部隊の主力。'}),
  heavy:freeze({name:'重戦車',short:'重',cost:12000,move:4,movement:'tread',range:[1,1],domain:'ground',description:'強い装甲と火力を持つが、移動はゆっくり。'}),
  artillery:freeze({name:'砲兵',short:'砲',cost:6000,move:4,movement:'tread',range:[2,3],domain:'ground',indirect:true,description:'2〜3マス先を砲撃。移動した日は攻撃できない。'}),
  antiair:freeze({name:'対空車',short:'空',cost:6500,move:5,movement:'tread',range:[1,1],domain:'ground',description:'航空部隊や歩兵に強い。戦車との正面戦闘は苦手。'}),
  fighter:freeze({name:'戦闘機',short:'翼',cost:14000,move:8,movement:'air',range:[1,1],domain:'air',description:'航空部隊のみ攻撃できる高速の制空部隊。'}),
  helicopter:freeze({name:'攻撃ヘリ',short:'ヘ',cost:10000,move:6,movement:'air',range:[1,1],domain:'air',description:'地上の戦車に強い航空部隊。戦闘機と対空車に注意。'})
});
export const TERRAIN=freeze({
  plain:freeze({name:'草原',defense:0}),road:freeze({name:'道路',defense:0}),forest:freeze({name:'森',defense:.2}),mountain:freeze({name:'山',defense:.35}),river:freeze({name:'川',defense:0}),bridge:freeze({name:'橋',defense:0}),sea:freeze({name:'海',defense:0})
});
export const BUILDINGS=freeze({
  city:freeze({name:'都市',income:1000,defense:.25}),factory:freeze({name:'工場',income:1000,defense:.2}),hq:freeze({name:'本部',income:1500,defense:.3}),airfield:freeze({name:'飛行場',income:1000,defense:.15})
});
const COSTS=freeze({foot:{plain:1,road:1,forest:1,mountain:2,river:2,bridge:1,sea:Infinity},wheel:{plain:2,road:1,forest:3,mountain:Infinity,river:Infinity,bridge:1,sea:Infinity},tread:{plain:1,road:1,forest:2,mountain:Infinity,river:Infinity,bridge:1,sea:Infinity},air:{plain:1,road:1,forest:1,mountain:1,river:1,bridge:1,sea:1}});
// Base damage in HP, before attacker strength and defender cover (10 HP is full strength).
const DAMAGE=freeze({
  infantry:{infantry:5,recon:2,tank:1,heavy:1,artillery:3,antiair:1,fighter:0,helicopter:1},
  recon:{infantry:7,recon:4,tank:1,heavy:1,artillery:4,antiair:2,fighter:0,helicopter:1},
  tank:{infantry:7,recon:8,tank:5,heavy:2,artillery:7,antiair:7,fighter:0,helicopter:0},
  heavy:{infantry:9,recon:9,tank:8,heavy:5,artillery:9,antiair:9,fighter:0,helicopter:0},
  artillery:{infantry:8,recon:8,tank:7,heavy:5,artillery:7,antiair:7,fighter:0,helicopter:0},
  antiair:{infantry:9,recon:5,tank:2,heavy:1,artillery:5,antiair:4,fighter:6,helicopter:9},
  fighter:{infantry:0,recon:0,tank:0,heavy:0,artillery:0,antiair:0,fighter:7,helicopter:10},
  helicopter:{infantry:7,recon:7,tank:7,heavy:5,artillery:8,antiair:2,fighter:0,helicopter:5}
});
const DIRECTIONS=[[1,0],[-1,0],[0,1],[0,-1]];
const PRODUCTION={factory:['infantry','recon','tank','heavy','artillery','antiair'],airfield:['fighter','helicopter']};
const clone=value=>JSON.parse(JSON.stringify(value));
const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
const enemy=team=>1-team;
const inside=(s,x,y)=>Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&y>=0&&x<s.width&&y<s.height;
const unitById=(s,id)=>s.units.find(u=>u.id===id)||null;
export const currentTeam=state=>state.turn;
export const tileAt=(state,x,y)=>inside(state,x,y)?state.tiles[y*state.width+x]:null;
export const unitAt=(state,x,y)=>state.units.find(u=>u.x===x&&u.y===y)||null;
export const getMission=state=>MISSIONS.find(m=>m.id===state.missionId);
export const defenseAt=(state,x,y,unitType)=>UNIT_TYPES[unitType]?.domain==='air'?0:(BUILDINGS[tileAt(state,x,y)?.building]?.defense??TERRAIN[tileAt(state,x,y)?.terrain]?.defense??0);
export function incomeFor(state,team){return state.tiles.reduce((sum,t)=>sum+(t.owner===team?(BUILDINGS[t.building]?.income||0):0),0);}
export const getIncome=incomeFor;
export function createGame({missionId=1,difficulty='normal',mode='cpu'}={}){
  const map=buildMission(missionId);
  return {version:SAVE_VERSION,missionId:map.meta.id,width:map.width,height:map.height,tiles:map.tiles,units:map.units,funds:[map.meta.funds,map.meta.funds],day:1,turn:0,turnNumber:1,difficulty:['easy','normal','hard'].includes(difficulty)?difficulty:'normal',mode:mode==='local'?'local':'cpu',winner:null,victoryReason:null,idSeq:map.units.length+1,stats:[{lost:0,destroyed:0,captured:0,spent:0,income:0},{lost:0,destroyed:0,captured:0,spent:0,income:0}],log:[`作戦「${map.meta.name}」開始。あなたのターンです。`],lastEvent:null};
}

function stepCost(state,unit,x,y){const tile=tileAt(state,x,y);if(!tile)return Infinity;if(tile.building&&UNIT_TYPES[unit.type].domain!=='air')return 1;return COSTS[UNIT_TYPES[unit.type].movement][tile.terrain]??Infinity;}
function searchMovement(state,unit,budget=UNIT_TYPES[unit.type].move,{ignoreOccupancy=false}={}){
  const key=(x,y)=>y*state.width+x,start=key(unit.x,unit.y),best=new Map([[start,0]]),paths=new Map([[start,[{x:unit.x,y:unit.y}]]]),queue=[{x:unit.x,y:unit.y,cost:0}],reached=[];
  const occupied=new Map(state.units.filter(u=>u.id!==unit.id).map(u=>[key(u.x,u.y),u]));
  while(queue.length){
    let lowest=0;for(let i=1;i<queue.length;i++)if(queue[i].cost<queue[lowest].cost)lowest=i;
    const node=queue.splice(lowest,1)[0],k=key(node.x,node.y);if(node.cost!==best.get(k))continue;
    const occupant=occupied.get(k);if(ignoreOccupancy||!occupant)reached.push({...node,path:paths.get(k)});
    for(const [dx,dy] of DIRECTIONS){const x=node.x+dx,y=node.y+dy;if(!inside(state,x,y))continue;const nextKey=key(x,y),other=occupied.get(nextKey);if(!ignoreOccupancy&&other?.team!==unit.team&&other&&UNIT_TYPES[unit.type].domain!=='air')continue;const next=node.cost+stepCost(state,unit,x,y);if(next>budget||next>=(best.get(nextKey)??Infinity))continue;best.set(nextKey,next);paths.set(nextKey,[...paths.get(k),{x,y}]);queue.push({x,y,cost:next});}
  }
  return reached;
}
export function getReachable(state,unitId){const unit=unitById(state,unitId);if(!unit||state.winner!==null||unit.team!==state.turn||unit.acted)return [];if(unit.moved)return [{x:unit.x,y:unit.y,cost:0,path:[{x:unit.x,y:unit.y}]}];return searchMovement(state,unit);}
function attackDamage(state,attacker,defender){const base=DAMAGE[attacker.type]?.[defender.type]||0;if(!base)return 0;const cover=defenseAt(state,defender.x,defender.y,defender.type)*(defender.hp/10);return Math.min(defender.hp,Math.max(1,Math.round(base*(attacker.hp/10)*(1-cover))));}
export function damagePreview(state,attackerId,targetId,{from=null,moved=null}={}){
  const original=unitById(state,attackerId),target=unitById(state,targetId);if(!original||!target||original.team===target.team)return {damage:0,counter:0,canAttack:false};
  const attacker={...original,...(from||{})},definition=UNIT_TYPES[attacker.type],movedNow=moved??attacker.moved,d=distance(attacker,target);
  if((definition.indirect&&movedNow)||d<definition.range[0]||d>definition.range[1]||!DAMAGE[attacker.type][target.type])return {damage:0,counter:0,canAttack:false};
  const damage=attackDamage(state,attacker,target),survivor={...target,hp:target.hp-damage},defenderDef=UNIT_TYPES[target.type];
  const counter=survivor.hp>0&&!defenderDef.indirect&&d>=defenderDef.range[0]&&d<=defenderDef.range[1]?attackDamage(state,survivor,attacker):0;
  return {damage,counter,canAttack:true,defeated:damage>=target.hp};
}
export function getAttackTargets(state,unitId,options={}){
  const unit=unitById(state,unitId);if(!unit||unit.acted||unit.team!==state.turn||state.winner!==null)return [];
  return state.units.filter(u=>u.team!==unit.team).map(target=>({id:target.id,targetId:target.id,x:target.x,y:target.y,type:target.type,hp:target.hp,...damagePreview(state,unitId,target.id,options)})).filter(t=>t.canAttack);
}
export function canCapture(state,unitId){const unit=unitById(state,unitId);if(!unit||unit.acted||unit.team!==state.turn||state.winner!==null||!UNIT_TYPES[unit.type].capture)return false;const tile=tileAt(state,unit.x,unit.y);return Boolean(tile?.building&&tile.owner!==unit.team);}
export function getProduction(state,x,y){
  const tile=tileAt(state,x,y),all=PRODUCTION[tile?.building]||[],allowed=getMission(state)?.allowedUnits||[];
  return all.filter(type=>allowed.includes(type)).map(type=>{
    const def=UNIT_TYPES[type];let reason='';if(state.winner!==null)reason='作戦は終了しています';else if(tile.owner!==state.turn)reason='自軍の施設ではありません';else if(unitAt(state,x,y))reason='このマスに部隊がいます';else if(state.units.length>=MAX_UNITS||state.units.filter(u=>u.team===state.turn).length>=MAX_UNITS_PER_TEAM)reason='部隊数の上限です';else if(state.funds[state.turn]<def.cost)reason='資金が足りません';
    return {type,...def,available:!reason,affordable:state.funds[state.turn]>=def.cost,blocked:Boolean(unitAt(state,x,y)),reason};
  });
}
export function getLegalActions(state,unitId){
  const unit=unitById(state,unitId);if(!unit||unit.acted||unit.team!==state.turn||state.winner!==null)return [];
  const actions=[];if(!unit.moved)for(const p of getReachable(state,unitId))if(p.x!==unit.x||p.y!==unit.y)actions.push({type:'move',unitId,x:p.x,y:p.y});
  for(const target of getAttackTargets(state,unitId))actions.push({type:'attack',unitId,targetId:target.id});
  if(canCapture(state,unitId))actions.push({type:'capture',unitId});actions.push({type:'wait',unitId});return actions;
}
function appendLog(state,message){state.log.push(message);if(state.log.length>70)state.log.splice(0,state.log.length-70);}
function clearAbandonedCaptures(state){for(let i=0;i<state.tiles.length;i++){const tile=state.tiles[i];if(!tile.capturingUnitId)continue;const unit=unitById(state,tile.capturingUnitId),x=i%state.width,y=Math.floor(i/state.width);if(!unit||unit.x!==x||unit.y!==y||unit.team!==tile.capturingTeam){tile.capture=20;tile.capturingTeam=null;tile.capturingUnitId=null;}}}
function canReturnToBattle(state,team){if(state.units.some(u=>u.team===team))return true;return state.tiles.some((t,i)=>{if(t.owner!==team||!PRODUCTION[t.building]?.some(type=>getMission(state).allowedUnits.includes(type)))return false;const occupant=unitAt(state,i%state.width,Math.floor(i/state.width));return !occupant||occupant.team===team;});}
function resolveVictory(state){if(state.winner!==null)return;for(const team of [0,1])if(!canReturnToBattle(state,team)){state.winner=enemy(team);state.victoryReason='敵の戦力と生産能力を制圧';appendLog(state,`${state.winner===0?'コーラル隊':'タイド隊'}が戦線を制圧しました。`);break;}}
function countDestroyed(state,unit){state.stats[unit.team].lost++;state.stats[enemy(unit.team)].destroyed++;}
function resultError(state,error){return {ok:false,state,error,event:null};}
export function applyAction(state,action){
  if(!state||!action||typeof action!=='object')return resultError(state,'操作が正しくありません。');
  if(state.winner!==null)return resultError(state,'この作戦は終了しています。');
  if(action.type==='endTurn')return changeTurn(state);
  if(action.type==='produce'){
    if(!inside(state,action.x,action.y))return resultError(state,'施設を選択してください。');
    const option=getProduction(state,action.x,action.y).find(p=>p.type===action.unitType);if(!option?.available)return resultError(state,option?.reason||'この施設では生産できません。');
    const next=clone(state),unit={id:`u${next.idSeq++}`,type:action.unitType,team:state.turn,x:action.x,y:action.y,hp:10,moved:true,acted:true};next.units.push(unit);next.funds[state.turn]-=option.cost;next.stats[state.turn].spent+=option.cost;appendLog(next,`${option.name}を生産。次の自軍ターンから行動できます。`);const event={type:'produce',unitId:unit.id,unitType:unit.type,team:unit.team,x:unit.x,y:unit.y,cost:option.cost};next.lastEvent=event;return {ok:true,state:next,event,error:null};
  }
  const unit=unitById(state,action.unitId);if(!unit)return resultError(state,'部隊を選択してください。');if(unit.team!==state.turn)return resultError(state,'今の手番の部隊ではありません。');if(unit.acted)return resultError(state,'この部隊は行動済みです。');
  if(action.type==='move'){
    if(unit.moved)return resultError(state,'1日に移動できるのは1回です。');
    if(unit.x===action.x&&unit.y===action.y)return resultError(state,'移動先を選択してください。');
    const dest=getReachable(state,unit.id).find(p=>p.x===action.x&&p.y===action.y);if(!dest)return resultError(state,'そのマスへは移動できません。');
    const next=clone(state),moving=unitById(next,unit.id),from={x:unit.x,y:unit.y};moving.x=dest.x;moving.y=dest.y;moving.moved=true;clearAbandonedCaptures(next);const event={type:'move',team:unit.team,unitId:unit.id,from,to:{x:dest.x,y:dest.y},path:dest.path};next.lastEvent=event;return {ok:true,state:next,event,error:null};
  }
  if(action.type==='attack'){
    const target=getAttackTargets(state,unit.id).find(t=>t.id===action.targetId);if(!target)return resultError(state,'その敵へは攻撃できません。');
    const next=clone(state),attacker=unitById(next,unit.id),defender=unitById(next,target.id),from={x:attacker.x,y:attacker.y},to={x:defender.x,y:defender.y};attacker.acted=true;attacker.moved=true;defender.hp-=target.damage;attacker.hp-=target.counter;const destroyed=[];if(defender.hp<=0){countDestroyed(next,defender);destroyed.push(defender.id);}if(attacker.hp<=0){countDestroyed(next,attacker);destroyed.push(attacker.id);}next.units=next.units.filter(u=>u.hp>0);clearAbandonedCaptures(next);appendLog(next,`${UNIT_TYPES[unit.type].name}が${UNIT_TYPES[defender.type].name}へ ${target.damage} ダメージ${target.counter?`（反撃 ${target.counter}）`:''}。`);resolveVictory(next);const event={type:'attack',team:unit.team,unitId:unit.id,targetId:target.id,from,to,damage:target.damage,counter:target.counter,destroyed,winner:next.winner};next.lastEvent=event;return {ok:true,state:next,event,error:null};
  }
  if(action.type==='capture'){
    if(!canCapture(state,unit.id))return resultError(state,'占領できる拠点に歩兵を移動してください。');
    const next=clone(state),capturer=unitById(next,unit.id),tile=tileAt(next,unit.x,unit.y);if(tile.capturingUnitId!==unit.id){tile.capture=20;tile.capturingTeam=unit.team;tile.capturingUnitId=unit.id;}const amount=Math.ceil(unit.hp);tile.capture=Math.max(0,tile.capture-amount);capturer.acted=true;capturer.moved=true;const captured=tile.capture===0,oldOwner=tile.owner;
    if(captured){tile.owner=unit.team;tile.capture=20;tile.capturingTeam=null;tile.capturingUnitId=null;next.stats[unit.team].captured++;if(tile.building==='hq'&&oldOwner!==unit.team){next.winner=unit.team;next.victoryReason='敵本部を占領';}appendLog(next,`${BUILDINGS[tile.building].name}を占領しました。`);}else appendLog(next,`${BUILDINGS[tile.building].name}を占領中。残り ${tile.capture}。`);
    const event={type:'capture',team:unit.team,unitId:unit.id,x:unit.x,y:unit.y,amount,remaining:captured?0:tile.capture,captured,building:tile.building,winner:next.winner};next.lastEvent=event;return {ok:true,state:next,event,error:null};
  }
  if(action.type==='wait'){const next=clone(state),waiting=unitById(next,unit.id);waiting.acted=true;waiting.moved=true;const event={type:'wait',team:unit.team,unitId:unit.id,x:unit.x,y:unit.y};next.lastEvent=event;return {ok:true,state:next,event,error:null};}
  return resultError(state,'その操作はできません。');
}
function changeTurn(state){
  const next=clone(state),from=state.turn,to=enemy(from);next.turn=to;next.turnNumber++;if(to===0)next.day++;const income=incomeFor(next,to);next.funds[to]+=income;next.stats[to].income+=income;const repairs=[];
  for(const unit of next.units){if(unit.team!==to)continue;unit.moved=false;unit.acted=false;const tile=tileAt(next,unit.x,unit.y),def=UNIT_TYPES[unit.type],repairSite=tile.owner===to&&(def.domain==='air'?tile.building==='airfield':Boolean(tile.building&&tile.building!=='airfield'));if(!repairSite||unit.hp>=10)continue;const price=Math.ceil(def.cost/10),amount=Math.min(2,10-unit.hp,Math.floor(next.funds[to]/price));if(amount>0){next.funds[to]-=amount*price;unit.hp+=amount;repairs.push({unitId:unit.id,amount,cost:amount*price});}}
  clearAbandonedCaptures(next);resolveVictory(next);appendLog(next,`${next.day}日目・${to===0?'コーラル隊':'タイド隊'}のターン。収入 +${income.toLocaleString('ja-JP')}。`);const event={type:'endTurn',from,to,team:to,day:next.day,income,repairs,winner:next.winner};next.lastEvent=event;return {ok:true,state:next,event,error:null};
}
export const endTurn=state=>applyAction(state,{type:'endTurn'});

function attackValue(state,unit,target,difficulty){const preview=target.damage!==undefined?target:damagePreview(state,unit.id,target.id),defender=unitById(state,target.id);if(!preview.canAttack)return -Infinity;const worth=UNIT_TYPES[defender.type].cost/1000,own=UNIT_TYPES[unit.type].cost/1000;return preview.damage*(difficulty==='hard'?9+worth*3:13+worth)+(preview.defeated?100+worth*8:0)-preview.counter*(difficulty==='easy'?4:8+own*2);}
function buildingPriority(tile){return tile.building==='hq'?150:tile.building==='factory'?78:tile.building==='airfield'?65:53;}
function objectivesFor(state,unit){
  const goals=[];
  if(UNIT_TYPES[unit.type].capture){for(let i=0;i<state.tiles.length;i++){const tile=state.tiles[i];if(tile.building&&tile.owner!==unit.team)goals.push({x:i%state.width,y:Math.floor(i/state.width),weight:buildingPriority(tile),capture:true});}}
  for(const target of state.units)if(target.team!==unit.team&&(DAMAGE[unit.type][target.type]||0)>0)goals.push({x:target.x,y:target.y,weight:20+(UNIT_TYPES[target.type].capture&&tileAt(state,target.x,target.y).owner===unit.team?60:0)+UNIT_TYPES[target.type].cost/1500,capture:false});
  if(!goals.length)for(let i=0;i<state.tiles.length;i++){const t=state.tiles[i];if(t.building==='hq'&&t.owner!==unit.team)goals.push({x:i%state.width,y:Math.floor(i/state.width),weight:22,capture:false});}
  return goals;
}
function objectiveDistanceMap(state,unit,goal){
  // Reverse movement costs give real route distances around rivers and mountains.
  const distances=Array(state.tiles.length).fill(Infinity),queue=[];
  const range=goal.capture?[0,0]:UNIT_TYPES[unit.type].range;
  for(let y=Math.max(0,goal.y-range[1]);y<=Math.min(state.height-1,goal.y+range[1]);y++)for(let x=Math.max(0,goal.x-range[1]);x<=Math.min(state.width-1,goal.x+range[1]);x++){const d=distance({x,y},goal);if(d<range[0]||d>range[1]||!Number.isFinite(stepCost(state,unit,x,y)))continue;distances[y*state.width+x]=0;queue.push({x,y,cost:0});}
  while(queue.length){let lowest=0;for(let i=1;i<queue.length;i++)if(queue[i].cost<queue[lowest].cost)lowest=i;const node=queue.splice(lowest,1)[0],idx=node.y*state.width+node.x;if(node.cost!==distances[idx])continue;for(const [dx,dy] of DIRECTIONS){const x=node.x+dx,y=node.y+dy;if(!inside(state,x,y)||!Number.isFinite(stepCost(state,unit,x,y)))continue;const key=y*state.width+x,cost=node.cost+stepCost(state,unit,node.x,node.y);if(cost>=distances[key])continue;distances[key]=cost;queue.push({x,y,cost});}}
  return distances;
}
function bestMove(state,unit,difficulty){
  const reachable=getReachable(state,unit.id),goals=objectivesFor(state,unit);if(reachable.length<2)return null;
  // Keep the expensive path fields bounded even on the final map.
  const sortedGoals=goals.sort((a,b)=>(b.weight/(distance(unit,b)+2))-(a.weight/(distance(unit,a)+2))).slice(0,6),maps=sortedGoals.map(goal=>({goal,dist:objectiveDistanceMap(state,unit,goal)}));
  const enemies=state.units.filter(u=>u.team!==unit.team),definition=UNIT_TYPES[unit.type];let best=null;
  const positionValue=position=>{
    let value=-Infinity;for(const field of maps){const d=field.dist[position.y*state.width+position.x];if(Number.isFinite(d))value=Math.max(value,field.goal.weight/(1+d/Math.max(1,definition.move))-.6*d);}
    if(!Number.isFinite(value))value=-20;
    const tile=tileAt(state,position.x,position.y);value+=defenseAt(state,position.x,position.y,unit.type)*(difficulty==='hard'?18:8);
    if(tile.building&&tile.owner===unit.team&&unit.hp<8)value+=(8-unit.hp)*4;
    if(tile.building&&tile.owner!==unit.team&&definition.capture)value+=buildingPriority(tile)+35;
    if(tile.owner===unit.team&&(tile.building==='factory'||tile.building==='airfield')&&!definition.capture)value-=12;
    if(difficulty!=='easy')for(const opposing of enemies){const opposition=UNIT_TYPES[opposing.type],d=distance(position,opposing);if(d>=opposition.range[0]&&d<=opposition.range[1]&&(DAMAGE[opposing.type][unit.type]||0)>0)value-=(DAMAGE[opposing.type][unit.type]||0)*(opposing.hp/10)*(unit.hp<5?2.2:.8);}
    return value;
  };
  const originValue=positionValue(unit);
  for(const dest of reachable){if(dest.x===unit.x&&dest.y===unit.y)continue;let value=positionValue(dest),attack=0;
    if(!definition.indirect)for(const opposing of enemies){const p=damagePreview(state,unit.id,opposing.id,{from:dest,moved:true});if(p.canAttack)attack=Math.max(attack,attackValue(state,unit,{...opposing,...p},difficulty));}
    value+=Math.max(0,attack)*.72;const score=value-originValue+9;
    if(!best||score>best.score+.001||(Math.abs(score-best.score)<.001&&dest.cost<best.cost))best={action:{type:'move',unitId:unit.id,x:dest.x,y:dest.y},score,cost:dest.cost};
  }
  return best&&best.score>1?best:null;
}
function productionChoice(state,difficulty){
  const army=state.units.filter(u=>u.team===state.turn),opponents=state.units.filter(u=>u.team!==state.turn),infantryCount=army.filter(u=>u.type==='infantry').length,enemyAir=opponents.filter(u=>UNIT_TYPES[u.type].domain==='air').length,antiAir=army.filter(u=>['antiair','fighter'].includes(u.type)).length,candidates=[];
  for(let i=0;i<state.tiles.length;i++){const tile=state.tiles[i];if(tile.owner!==state.turn||!PRODUCTION[tile.building])continue;const x=i%state.width,y=Math.floor(i/state.width);for(const option of getProduction(state,x,y)){if(!option.available)continue;let score=0;const count=army.filter(u=>u.type===option.type).length;
      if(option.type==='infantry')score=infantryCount<2?115:infantryCount<4?60:12;
      if(option.type==='recon')score=28-count*14;
      if(option.type==='tank')score=65-count*13;
      if(option.type==='heavy')score=(difficulty==='hard'?77:56)-count*25;
      if(option.type==='artillery')score=50-count*25;
      if(option.type==='antiair')score=enemyAir>antiAir?100:35-count*20;
      if(option.type==='fighter')score=enemyAir>antiAir?110:18-count*25;
      if(option.type==='helicopter')score=62-count*25;
      score+=Math.min(15,option.cost/1500);if(difficulty==='easy'&&option.type==='infantry')score+=15;
      // Strong armies save for a heavier reinforcement rather than spending every last coin on infantry.
      if(army.length>=5&&infantryCount>=3&&option.type==='infantry'&&state.funds[state.turn]<6000)score=-20;
      if(score>0)candidates.push({score,action:{type:'produce',x,y,unitType:option.type}});
  }}
  return candidates.sort((a,b)=>b.score-a.score)[0]||null;
}
export function planAIAction(state,difficulty=state.difficulty){
  if(!state||state.winner!==null)return null;difficulty=['easy','normal','hard'].includes(difficulty)?difficulty:'normal';const candidates=[];
  for(const unit of state.units){if(unit.team!==state.turn||unit.acted)continue;
    if(canCapture(state,unit.id)){const t=tileAt(state,unit.x,unit.y);candidates.push({score:300+buildingPriority(t)+(t.capture<=unit.hp?180:0),action:{type:'capture',unitId:unit.id}});}
    for(const target of getAttackTargets(state,unit.id)){const score=attackValue(state,unit,target,difficulty)+80;if(score>20)candidates.push({score,action:{type:'attack',unitId:unit.id,targetId:target.id}});}
    if(!unit.moved){const move=bestMove(state,unit,difficulty);if(move)candidates.push(move);}
    candidates.push({score:-100,action:{type:'wait',unitId:unit.id}});
  }
  const production=productionChoice(state,difficulty);if(production)candidates.push({...production,score:production.score*.45});
  if(!candidates.length)return {type:'endTurn'};
  candidates.sort((a,b)=>b.score-a.score);return candidates[0].action;
}
export function scoreFor(state,team=0){const stats=state.stats[team],victory=state.winner===team;return Math.max(0,(victory?5000:0)+stats.destroyed*300+stats.captured*400+state.units.filter(u=>u.team===team).reduce((n,u)=>n+u.hp*10,0)+Math.max(0,(getMission(state).parDays-state.day))*100);}

export function validateGame(value){
  const errors=[],s=value;const fail=message=>errors.push(message);
  if(!s||typeof s!=='object'||Array.isArray(s))return {valid:false,errors:['セーブデータの形式が正しくありません。']};
  const mission=MISSIONS.find(m=>m.id===s.missionId);if(s.version!==SAVE_VERSION)fail('対応していないセーブ形式です。');if(!mission)fail('作戦番号が正しくありません。');
  if(!Number.isInteger(s.width)||!Number.isInteger(s.height)||s.width<1||s.width>18||s.height<1||s.height>13||s.width!==mission?.width||s.height!==mission?.height)fail('マップの大きさが正しくありません。');
  if(!Array.isArray(s.tiles)||s.tiles.length!==s.width*s.height)fail('地形データが正しくありません。');
  else for(const t of s.tiles){if(!t||!Object.hasOwn(TERRAIN,t.terrain)||(t.building!==null&&!Object.hasOwn(BUILDINGS,t.building))||![null,0,1].includes(t.owner)||(!t.building&&t.owner!==null)||!Number.isInteger(t.capture)||t.capture<1||t.capture>20||![null,0,1].includes(t.capturingTeam)||(t.capturingUnitId!==null&&typeof t.capturingUnitId!=='string')){fail('地形または拠点データが正しくありません。');break;}}
  if(!Array.isArray(s.units)||s.units.length>MAX_UNITS)fail('部隊データが正しくありません。');
  else{const ids=new Set(),positions=new Set();for(const u of s.units){if(!u||typeof u.id!=='string'||!/^u[1-9]\d*$/.test(u.id)||u.id.length>40||ids.has(u.id)||!Object.hasOwn(UNIT_TYPES,u.type)||![0,1].includes(u.team)||!inside(s,u.x,u.y)||!Number.isInteger(u.hp)||u.hp<1||u.hp>10||typeof u.moved!=='boolean'||typeof u.acted!=='boolean'||(u.acted&&!u.moved)||positions.has(`${u.x},${u.y}`)){fail('部隊の位置・種類・HPが正しくありません。');break;}ids.add(u.id);positions.add(`${u.x},${u.y}`);if(Array.isArray(s.tiles)&&s.tiles.length===s.width*s.height&&!Number.isFinite(stepCost(s,u,u.x,u.y))){fail('進入できない地形に部隊がいます。');break;}}if([0,1].some(t=>s.units.filter(u=>u?.team===t).length>MAX_UNITS_PER_TEAM))fail('部隊数の上限を超えています。');}
  if(![0,1].includes(s.turn)||!Number.isInteger(s.day)||s.day<1||s.day>100000||!Number.isInteger(s.turnNumber)||s.turnNumber<1)fail('手番データが正しくありません。');
  if(!Array.isArray(s.funds)||s.funds.length!==2||s.funds.some(v=>!Number.isSafeInteger(v)||v<0))fail('資金データが正しくありません。');
  if(![null,0,1].includes(s.winner)||!['easy','normal','hard'].includes(s.difficulty)||!['cpu','local'].includes(s.mode))fail('ゲーム設定が正しくありません。');
  if(!Number.isInteger(s.idSeq)||s.idSeq<1||s.idSeq>10000000||(Array.isArray(s.units)&&s.units.some(u=>typeof u?.id==='string'&&Number(u.id.replace(/^u/,''))>=s.idSeq)))fail('部隊番号が正しくありません。');
  if(!Array.isArray(s.stats)||s.stats.length!==2||s.stats.some(t=>!t||['lost','destroyed','captured','spent','income'].some(k=>!Number.isSafeInteger(t[k])||t[k]<0)))fail('戦績データが正しくありません。');
  if(!Array.isArray(s.log)||s.log.length>70||s.log.some(t=>typeof t!=='string'||t.length>500))fail('行動記録が正しくありません。');
  if(s.victoryReason!==null&&(typeof s.victoryReason!=='string'||s.victoryReason.length>120))fail('勝敗データが正しくありません。');
  if(errors.length===0)for(let i=0;i<s.tiles.length;i++){const t=s.tiles[i];if(t.capture===20){if(t.capturingTeam!==null||t.capturingUnitId!==null){fail('占領データが正しくありません。');break;}}else{const u=unitById(s,t.capturingUnitId);if(!t.building||!u||!UNIT_TYPES[u.type].capture||u.team!==t.capturingTeam||u.x!==i%s.width||u.y!==Math.floor(i/s.width)||t.owner===u.team){fail('占領データが正しくありません。');break;}}}
  return {valid:errors.length===0,errors};
}
export function serializeGame(state){const checked=validateGame(state);if(!checked.valid)throw Error(checked.errors[0]);return JSON.stringify({format:'frontier-command-save',version:SAVE_VERSION,state});}
export function deserializeGame(serialized){
  if(typeof serialized!=='string'||serialized.length>250000)throw Error('セーブデータが大きすぎるか、形式が正しくありません。');
  let data;try{data=JSON.parse(serialized);}catch{throw Error('セーブデータを読み込めませんでした。');}
  const state=data?.format==='frontier-command-save'?data.state:data,check=validateGame(state);if(!check.valid)throw Error(check.errors[0]);return clone(state);
}
