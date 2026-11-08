// Original turn-based adventure and town economy. No network or real-money transactions.
import {ENEMY_BY_ID,enemiesForFloor,enemyStats,MAX_FLOOR} from './enemies.mjs?v=20261108-equipment';
export {MAX_FLOOR};
import {BUILDINGS,DAY_TURNS,DAY_WAIT_COST,landCost,rentTotal,landIncome,dividendTotal,dailyIncome,upgradeCost} from './economy.mjs?v=20261108-equipment';
export {BUILDINGS,DAY_TURNS,DAY_WAIT_COST,landCost,rentTotal,landIncome,dividendTotal,dailyIncome,upgradeCost};
export const RETURN_FLOORS = Object.freeze([3,6,9]);
export const BAG_UPGRADES = Object.freeze([
  {id:'satchel',name:'旅人の拡張袋',capacity:40,cost:200},
  {id:'rucksack',name:'採集家の拡張袋',capacity:50,cost:500},
  {id:'caravan',name:'大商人の拡張袋',capacity:60,cost:1000}
]);
export const bagCapacity = state => BAG_UPGRADES[(state.bagTier??0)-1]?.capacity??30;
export const normalEnemyCount=floor=>Math.min(12,3+floor);
export const swarmEnemyCount=floor=>floor>=2&&floor<=4?floor+4:floor>=6&&floor<=9?8:0;
export const ITEMS = Object.freeze([
  {id:'potion',name:'若葉の薬',icon:'✚',kind:'consumable',buy:32,sell:12,description:'HPを24回復。迷宮では1ターン使います。'},
  {id:'ration',name:'旅人のパン',icon:'◒',kind:'consumable',buy:22,sell:8,description:'満腹度を45回復。'},
  {id:'recall',name:'帰灯石',icon:'◇',kind:'consumable',buy:90,sell:35,description:'どこからでも持ち物を持って帰還。'},
  {id:'bomb',name:'閃光の実',icon:'✦',kind:'consumable',buy:65,sell:25,description:'周囲3マスの敵に18ダメージ。'},
  {id:'herb',name:'銀露草',icon:'❧',kind:'loot',buy:null,sell:25,description:'街の薬師に人気の香草。'},
  {id:'ore',name:'燐鉄鉱',icon:'⬡',kind:'loot',buy:null,sell:40,description:'淡い光を含む加工用の鉱石。'},
  {id:'amber',name:'夕映え琥珀',icon:'◆',kind:'loot',buy:null,sell:85,description:'装飾職人が求める透明な琥珀。'},
  {id:'prism',name:'星彩結晶',icon:'✧',kind:'loot',buy:null,sell:150,description:'深層で育つ貴重な結晶。'},
  {id:'relic',name:'暁の種',icon:'☀',kind:'loot',buy:null,sell:500,description:'深層の番人が守る、街に光をもたらす宝。'}
]);
export const WEAPONS = Object.freeze([
  {id:'starter',name:'採集ナイフ',price:0,attack:0,description:'旅の始まりを支える小さな刃。'},
  {id:'copper',name:'燐鉄の短剣',price:180,attack:3,description:'攻撃力 +3。浅い階層の探索が楽に。'},
  {id:'steel',name:'鋼輪の剣',price:360,attack:5,description:'攻撃力 +5。浅層から中層へ進むための堅実な一振り。'},
  {id:'moon',name:'月紋の長剣',price:650,attack:7,description:'攻撃力 +7。中層へ進むための確かな力。'},
  {id:'gale',name:'疾風の刃',price:1000,attack:9,description:'攻撃力 +9。中層の硬い魔物にも鋭く切り込む。'},
  {id:'solar',name:'暁光の槍',price:1600,attack:12,description:'攻撃力 +12。深層の番人にも届く一撃。'},
  {id:'crystal',name:'灯晶の大剣',price:2800,attack:17,description:'攻撃力 +17。地下7階以降の強敵に備える重厚な剣。'},
  {id:'comet',name:'星渡りの剣',price:4600,attack:23,description:'攻撃力 +23。深層の分厚い守りを打ち破る星の刃。'},
  {id:'dawn',name:'黎明の聖剣',price:7200,attack:30,description:'攻撃力 +30。最深部へ挑む採集商のための最高級武器。'},
  {id:'unarmed',name:'素手',price:0,attack:0,description:'武器を失った状態。街で新しい武器を購入できます。'}
]);
export const SHIELDS = Object.freeze([
  {id:'none',name:'盾なし',price:0,defense:0,description:'盾を装備していない状態。'},
  {id:'wood',name:'若木の盾',price:140,defense:2,description:'防御力 +2。最初の探索を支える軽い木の盾。'},
  {id:'iron',name:'燐鉄の盾',price:420,defense:4,description:'防御力 +4。中層の攻撃を受け止める金属の盾。'},
  {id:'moon',name:'月紋の盾',price:1000,defense:7,description:'防御力 +7。月の紋様を刻んだ丈夫な盾。'},
  {id:'crystal',name:'灯晶の大盾',price:2400,defense:10,description:'防御力 +10。地下7階以降の強敵に備える大盾。'},
  {id:'aurora',name:'暁光の守護盾',price:4800,defense:14,description:'防御力 +14。最深部の強烈な一撃から身を守る最高級の盾。'}
]);
export const STOCKS = Object.freeze([
  {id:'loom',name:'風織工房',ticker:'KAZE',base:32,description:'織物を届ける穏やかな商会。'},
  {id:'guild',name:'燐鉱運輸',ticker:'RINK',base:65,description:'迷宮の鉱石を運ぶ成長株。'},
  {id:'beacon',name:'灯晶研究所',ticker:'LAMP',base:110,description:'値動きの大きな光の研究所。'}
]);
const itemById = Object.assign(Object.create(null),Object.fromEntries(ITEMS.map(v=>[v.id,v])));
const weaponById = Object.assign(Object.create(null),Object.fromEntries(WEAPONS.map(v=>[v.id,v])));
const shieldById = Object.assign(Object.create(null),Object.fromEntries(SHIELDS.map(v=>[v.id,v])));
const buildingById = Object.assign(Object.create(null),Object.fromEntries(BUILDINGS.map(v=>[v.id,v])));
const stockById = Object.assign(Object.create(null),Object.fromEntries(STOCKS.map(v=>[v.id,v])));
const W=31,H=23,MAXSTACK=999,MAXGOLD=999999999;
const clone = value => JSON.parse(JSON.stringify(value));
const dist = (a,b) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
export const xpNeeded = level => 12+level*10;
function rand(s) { s.rng=(Math.imul(s.rng,1664525)+1013904223)>>>0; return s.rng/4294967296; }
function between(s,a,b) { return a+Math.floor(rand(s)*(b-a+1)); }
function log(s,text) { s.log.push(text); if(s.log.length>40)s.log.shift(); return text; }
function quantity(list,id) { return list.find(v=>v.id===id)?.qty??0; }
function add(list,id,qty) { const e=list.find(v=>v.id===id); if(e)e.qty=Math.min(MAXSTACK,e.qty+qty); else list.push({id,qty:Math.min(MAXSTACK,qty)}); }
function remove(list,id,qty) { const e=list.find(v=>v.id===id); if(!e||e.qty<qty)return false; e.qty-=qty; if(!e.qty)list.splice(list.indexOf(e),1); return true; }
function consume(s,id) { return remove(s.runLoot,id,1)||remove(s.inventory,id,1); }
function awardGold(s,n) { s.gold=Math.min(MAXGOLD,s.gold+n); s.stats.earned=Math.min(MAXGOLD,s.stats.earned+n); }
function recalc(s) { s.maxHp=36+(s.level-1)*5; s.attack=5+(s.level-1)+weaponById[s.weaponId].attack; s.defense=Math.floor((s.level-1)/4)+shieldById[s.shieldId??'none'].defense; }
function gainXp(s,n) { s.xp+=n; while(s.level<30&&s.xp>=xpNeeded(s.level)){s.xp-=xpNeeded(s.level); s.level++; recalc(s); s.hp=Math.min(s.maxHp,s.hp+12);log(s,`レベル${s.level}！ 最大HPと攻撃力が上がった。`);} if(s.level===30)s.xp=Math.min(s.xp,xpNeeded(30)); }
function walkable(s,x,y) {return x>=0&&x<W&&y>=0&&y<H&&s.map.tiles[y][x]!==0;}
function occupied(s,x,y) {return s.enemies.some(e=>e.x===x&&e.y===y&&e.hp>0);}
const inRoom=(p,r)=>!!r&&p.x>=r.x&&p.x<r.x+r.width&&p.y>=r.y&&p.y<r.y+r.height;
const swarmStartMessage='魔物だまり！ 眠っていた魔物が目覚めた。この魔物たちは次の行動から動き出す！';
const swarmClearMessage=floor=>`魔物だまりを制圧！ 探索金 ${floor*40}G を手に入れた。`;
function roomDoor(s,p,room){return [[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>{const next={x:p.x+dx,y:p.y+dy};return !inRoom(next,room)&&walkable(s,next.x,next.y);});}
function reveal(s) {
  if(!s.map)return;
  const {x:px,y:py}=s.player;
  s.map.visible=Array.from({length:H},()=>Array(W).fill(false));
  for(let y=Math.max(0,py-6);y<=Math.min(H-1,py+6);y++)for(let x=Math.max(0,px-6);x<=Math.min(W-1,px+6);x++){
    if(Math.hypot(x-px,y-py)>6.5)continue;
    let x0=px,y0=py,dx=Math.abs(x-px),dy=-Math.abs(y-py),sx=px<x?1:-1,sy=py<y?1:-1,err=dx+dy,visible=true;
    while(x0!==x||y0!==y){if((x0!==px||y0!==py)&&s.map.tiles[y0][x0]===0){visible=false;break;} const twice=2*err;if(twice>=dy){err+=dy;x0+=sx;}if(twice<=dx){err+=dx;y0+=sy;}}
    if(visible)s.map.visible[y][x]=s.map.seen[y][x]=true;
  }
  const swarm=s.map.swarm,room=swarm&&s.map.rooms[swarm.roomIndex];
  // The first surprise reveals the whole room; retreat restores normal sight.
  if(swarm&&swarm.status!=='dormant'&&inRoom(s.player,room))for(let y=room.y;y<room.y+room.height;y++)for(let x=room.x;x<room.x+room.width;x++)s.map.visible[y][x]=s.map.seen[y][x]=true;
}
function randomFloorPoint(s,avoidStart=true,clearance=null) {
  for(let attempt=0;attempt<2000;attempt++){const x=between(s,1,W-2),y=between(s,1,H-2); if(s.map.tiles[y][x]===1&&!occupied(s,x,y)&&!s.loot.some(l=>l.x===x&&l.y===y)&&(!avoidStart||dist({x,y},s.player)>5)&&(!clearance||dist({x,y},clearance)>1))return{x,y};}
  return null;
}
function generateSwarm(s){
  const count=swarmEnemyCount(s.floor);if(!count||rand(s)>=.35)return;
  const blocked=new Set([...s.enemies,...s.loot,s.player].map(p=>`${p.x},${p.y}`));
  const freeCells=room=>{const cells=[];for(let y=room.y;y<room.y+room.height;y++)for(let x=room.x;x<room.x+room.width;x++)if(s.map.tiles[y][x]===1&&!blocked.has(`${x},${y}`))cells.push({x,y});return cells;};
  const candidates=[1,2,3,4].map(roomIndex=>({roomIndex,room:s.map.rooms[roomIndex]})).filter(({room})=>{const free=freeCells(room);return free.length>=count+5&&free.filter(p=>!roomDoor(s,p,room)).length>=count;});
  if(!candidates.length)return;
  const {roomIndex,room}=candidates[between(s,0,candidates.length-1)],shuffle=list=>{const out=[...list];for(let i=out.length-1;i>0;i--){const j=between(s,0,i);[out[i],out[j]]=[out[j],out[i]];}return out;};
  const spots=shuffle(freeCells(room).filter(p=>!roomDoor(s,p,room))),kinds=shuffle(enemiesForFloor(s.floor)),enemyIds=[];
  for(let i=0;i<count;i++){
    const p=spots[i],type=kinds[i%kinds.length],stats=enemyStats(type.id,s.floor),id=`swarm-${s.stats.runs}-${s.floor}-${roomIndex}-${i}`;
    s.enemies.push({id,kind:type.id,name:type.name,...p,...stats,maxHp:stats.hp});enemyIds.push(id);blocked.add(`${p.x},${p.y}`);
  }
  const rewards=shuffle(freeCells(room));for(const [i,id]of ['potion','bomb','ration','amber','prism'].entries())s.loot.push({id,...rewards[i]});
  s.map.swarm={roomIndex,status:'dormant',enemyIds};
}
function activateSwarm(s){
  const swarm=s.map?.swarm;
  if(!swarm||swarm.status!=='dormant'||!inRoom(s.player,s.map.rooms[swarm.roomIndex]))return false;
  swarm.status='active';log(s,swarmStartMessage);return true;
}
function clearSwarm(s){
  const swarm=s.map?.swarm;if(!swarm||swarm.status==='cleared'||s.enemies.some(e=>swarm.enemyIds.includes(e.id)))return;
  swarm.status='cleared';s.runGold=Math.min(MAXGOLD,s.runGold+s.floor*40);log(s,swarmClearMessage(s.floor));
}
function generateFloor(s) {
  const tiles=Array.from({length:H},()=>Array(W).fill(0)),rooms=[];
  for(let row=0;row<2;row++)for(let col=0;col<3;col++){
    const width=between(s,5,7),height=between(s,5,7),x=1+col*10+between(s,0,2),y=1+row*11+between(s,0,2);
    const room={x,y,width,height,cx:x+Math.floor(width/2),cy:y+Math.floor(height/2)};rooms.push(room);
    for(let yy=y;yy<y+height;yy++)for(let xx=x;xx<x+width;xx++)tiles[yy][xx]=1;
  }
  // A spanning path always connects every room. Extra links offer alternative routes.
  for(const [a,b] of [[0,1],[1,2],[2,5],[5,4],[4,3],[0,3],[1,4]]){
    let x=rooms[a].cx,y=rooms[a].cy; const target=rooms[b];
    while(x!==target.cx){tiles[y][x]=1;x+=Math.sign(target.cx-x);}while(y!==target.cy){tiles[y][x]=1;y+=Math.sign(target.cy-y);}tiles[y][x]=1;
  }
  s.map={width:W,height:H,tiles,rooms,seen:Array.from({length:H},()=>Array(W).fill(false)),visible:Array.from({length:H},()=>Array(W).fill(false))};
  s.player={x:rooms[0].cx,y:rooms[0].cy};s.enemies=[];s.loot=[];
  tiles[s.player.y][s.player.x]=3;
  tiles[rooms[5].cy][rooms[5].cx]=2;
  // Milestone exits sit beside the onward stairs; the original entrance stays usable.
  if(RETURN_FLOORS.includes(s.floor))tiles[rooms[5].cy][rooms[5].cx-1]=4;
  const f=s.floor;
  // Show the newly introduced species first, then vary familiar creatures.
  // The count of creatures is unchanged; extra species do not crowd the map.
  const shuffle=list=>{const result=[...list];for(let i=result.length-1;i>0;i--){const j=between(s,0,i);[result[i],result[j]]=[result[j],result[i]];}return result;};
  const pool=enemiesForFloor(f),roster=[...shuffle(pool.filter(type=>type.firstFloor===f)),...shuffle(pool.filter(type=>type.firstFloor<f))];
  const bossPoint=f===MAX_FLOOR?{x:rooms[5].cx,y:rooms[5].cy-1}:null;
  for(let i=0;i<normalEnemyCount(f);i++){
    const p=randomFloorPoint(s,true,bossPoint);if(!p)continue;const type=roster[i%roster.length],stats=enemyStats(type.id,f);
    s.enemies.push({id:`${s.stats.runs}-${f}-${i}`,kind:type.id,name:type.name,...p,...stats,maxHp:stats.hp});
  }
  if(f===MAX_FLOOR){const stats=enemyStats('boss',f);s.enemies.push({id:`boss-${s.stats.runs}`,kind:'boss',name:ENEMY_BY_ID.boss.name,...bossPoint,...stats,maxHp:stats.hp});}
  for(let i=0;i<8+f;i++){
    const p=randomFloorPoint(s,false);if(!p)continue;let id=i<2?'ration':i===2?'potion':f>=3&&rand(s)<(f>=6?.5:.35)?'prism':rand(s)<(f>=6?.36:.28)?'amber':rand(s)<.5?'ore':'herb';
    s.loot.push({id,...p});
  }
  // An immediately visible find teaches collection on the first expedition.
  if(f===1){const x=s.player.x+1,y=s.player.y;if(tiles[y][x]===1&&!s.loot.some(l=>l.x===x&&l.y===y))s.loot.push({id:'herb',x,y});}
  generateSwarm(s);
  s.maxFloor=Math.max(s.maxFloor,f);reveal(s);
}
function collect(s) {
  const here=s.loot.filter(l=>l.x===s.player.x&&l.y===s.player.y);
  for(const l of here){if(s.runLoot.reduce((n,v)=>n+v.qty,0)>=bagCapacity(s)){log(s,`探索袋がいっぱい（${bagCapacity(s)}個）。帰還して品物を整理しよう。`);break;}add(s.runLoot,l.id,1);s.loot.splice(s.loot.indexOf(l),1);log(s,`${itemById[l.id].name}を見つけた。`);}
}
function kill(s,e) {s.enemies.splice(s.enemies.indexOf(e),1);s.stats.kills++;s.runGold+=8+s.floor*5;gainXp(s,e.xp);log(s,`${e.name}を倒した！`);if(e.kind==='boss'){s.runRelic=true;add(s.runLoot,'relic',1);log(s,s.floor===MAX_FLOOR?'暁の種を手に入れた！ 階段から帰還しよう。':'暁の種を守り抜いた。さらに下層へ進めます。帰灯石で街に戻ることもできます。');}clearSwarm(s);}
function advanceDay(s){
  s.day++;const income=dailyIncome(s);for(const spec of STOCKS){const volatility={loom:.10,guild:.17,beacon:.25}[spec.id];const drift=(spec.base-s.prices[spec.id])*.04;s.prices[spec.id]=clamp(Math.round(s.prices[spec.id]*(1+(rand(s)*2-1)*volatility)+drift),Math.ceil(spec.base*.35),spec.base*4);s.priceHistory[spec.id].push(s.prices[spec.id]);if(s.priceHistory[spec.id].length>24)s.priceHistory[spec.id].shift();}awardGold(s,income.total);log(s,`${s.day}日目。家賃 ${income.rent}G・空き地利用料 ${income.land}G・配当 ${income.dividend}G（計${income.total}G）を受け取った。`);
}
function advanceClock(s){s.dayTurns=(s.dayTurns??0)+1;if(s.dayTurns>=DAY_TURNS){s.dayTurns=0;advanceDay(s);}}
function endRun(s,defeat=false){
  const clear=s.runRelic&&s.floor===MAX_FLOOR&&!s.enemies.some(enemy=>enemy.kind==='boss')&&!defeat,earned=defeat?Math.floor(s.runGold/2):s.runGold;
  if(!defeat)for(const i of s.runLoot){
    const kept=Math.min(i.qty,MAXSTACK-quantity(s.inventory,i.id));
    if(kept)add(s.inventory,i.id,kept);
    if(kept<i.qty){const excess=i.qty-kept;awardGold(s,excess*itemById[i.id].sell);log(s,`倉庫の上限を超えた${itemById[i.id].name}${excess}個を自動売却した。`);}
  }
  awardGold(s,earned+(clear?500:0));
  s.mode='town';if(clear)s.stats.clears++;
  if(defeat){
    // A fallen explorer starts over personally; the town economy remains theirs.
    s.level=1;s.xp=0;s.inventory=[];s.weaponId='unarmed';s.shieldId='none';recalc(s);
    s.hp=Math.ceil(s.maxHp*.4);s.hunger=60;
    log(s,`救助隊が街へ運んでくれた。レベル1に戻り、武器・盾とすべての持ち物を失った。土地・建物・株と所持金は残り、探索金${earned}Gを持ち帰った。`);
  }else log(s,clear?'暁の種を持ち帰った！ 街の謝礼500Gを獲得。':`無事に帰還！ ${earned}Gと探索品を持ち帰った。`);
  s.runLoot=[];s.runGold=0;s.runRelic=false;s.enemies=[];s.loot=[];s.map=null;s.player={x:0,y:0};
  return defeat?'defeat':clear?'victory':'return';
}
function enemyTurn(s,{justAwakened=false}={}){
  let distances=null;
  const swarm=s.map.swarm,members=new Set(swarm?.enemyIds||[]),widePursuit=swarm?.status==='active';
  const hit=(e,ranged=false)=>{const damage=Math.max(1,e.attack-s.defense+between(s,-1,1));s.hp-=damage;log(s,`${e.name}の${ranged?'遠隔':'攻撃'}。${damage}ダメージ。`);return s.hp<=0?endRun(s,true):null;};
  for(const e of [...s.enemies]){
    if(s.mode!=='dungeon')break;
    const member=members.has(e.id);
    if(member&&(swarm.status==='dormant'||justAwakened))continue;
    const distance=dist(e,s.player),behavior=ENEMY_BY_ID[e.kind]?.behavior||'hunter';
    // Cadence uses existing saved turn/ID data rather than adding timers or statuses.
    const phase=[...e.id].reduce((value,c)=>value+c.charCodeAt(0),0);
    if(distance===1){const event=hit(e);if(event)return event;continue;}
    const radius=behavior==='ambush'?3:behavior==='shy'?6:behavior==='watcher'?10:8;
    if(distance>radius&&!(member&&widePursuit))continue;
    if(behavior==='glimmer'&&distance===2&&(e.x===s.player.x||e.y===s.player.y)&&(s.turn+phase)%2===0){
      const x=(e.x+s.player.x)/2,y=(e.y+s.player.y)/2;
      if(walkable(s,x,y)&&!occupied(s,x,y)){const event=hit(e,true);if(event)return event;continue;}
    }
    if(behavior==='slow'&&(s.turn+phase)%2===0)continue;
    // Breadth-first distances avoid enemies getting stuck on corridor corners.
    if(!distances){
      const queue=[{...s.player}];distances=new Map([[`${s.player.x},${s.player.y}`,0]]);
      for(let i=0;i<queue.length&&i<(widePursuit?W*H:300);i++){const p=queue[i];const n=distances.get(`${p.x},${p.y}`);if(!widePursuit&&n>=12)continue;for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+dx,y=p.y+dy,key=`${x},${y}`;if(walkable(s,x,y)&&!distances.has(key)){distances.set(key,n+1);queue.push({x,y});}}}
    }
    const steps=behavior==='charge'&&(s.turn+phase)%3===0?2:1;let moved=0;
    for(let step=0;step<steps&&dist(e,s.player)>1;step++){
      const horizontalFirst=behavior==='sideways'||['moss','moth','golem','boss'].includes(e.kind);
      const directions=horizontalFirst?[[1,0],[-1,0],[0,1],[0,-1]]:[[0,1],[0,-1],[1,0],[-1,0]];
      const moves=directions.map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).filter(p=>walkable(s,p.x,p.y)&&!occupied(s,p.x,p.y)&&dist(p,s.player)>0).sort((a,b)=>(distances.get(`${a.x},${a.y}`)??999)-(distances.get(`${b.x},${b.y}`)??999));
      if(!moves.length||(distances.get(`${moves[0].x},${moves[0].y}`)??999)>=(distances.get(`${e.x},${e.y}`)??999))break;
      e.x=moves[0].x;e.y=moves[0].y;moved++;
    }
    if(moved===2)log(s,`${e.name}が勢いよく近づいた。`);
  }
  return null;
}
function tick(s){s.turn++;s.runTurns++;advanceClock(s);s.hunger=Math.max(0,Math.round((s.hunger-.25)*100)/100);if(s.hunger===0){s.hp-=2;if(s.hp<=0)return endRun(s,true);}else if(s.turn%12===0)s.hp=Math.min(s.maxHp,s.hp+1);const justAwakened=activateSwarm(s),event=enemyTurn(s,{justAwakened});if(s.mode==='dungeon')reveal(s);return event||(justAwakened?'swarm-start':null);}
export function newGame(seed=Date.now()){
  const n=(Number(seed)>>>0)||1;
  const s={version:1,seed:n,rng:n,day:1,dayTurns:0,gold:180,level:1,xp:0,hp:36,maxHp:36,hunger:100,attack:5,defense:0,weaponId:'starter',shieldId:'none',bagTier:0,inventory:[{id:'potion',qty:3},{id:'ration',qty:2},{id:'recall',qty:1}],stocks:Object.fromEntries(STOCKS.map(v=>[v.id,0])),prices:Object.fromEntries(STOCKS.map(v=>[v.id,v.base])),priceHistory:Object.fromEntries(STOCKS.map(v=>[v.id,[v.base]])),plots:[{building:null,level:1}],mode:'town',floor:1,maxFloor:0,turn:0,player:{x:0,y:0},map:null,enemies:[],loot:[],runLoot:[],runGold:0,runTurns:0,runRelic:false,log:['灯都へようこそ。迷宮の品を持ち帰り、あなたの街を育てよう。'],stats:{runs:0,clears:0,kills:0,earned:0}};
  return s;
}
export function act(state,action){
  if(!action||typeof action.type!=='string')return{state,ok:false,message:'操作を選んでください。'};
  const s=clone(state);let message='',event='';
  const fail=text=>({state,ok:false,message:text});
  const finish=()=>{
    if(!['defeat','return','victory'].includes(event)&&s.map?.swarm?.status==='cleared'&&state.map?.swarm?.status!=='cleared')event='swarm-clear';
    if(event==='swarm-start')message=swarmStartMessage;else if(event==='swarm-clear')message=swarmClearMessage(s.floor);else if(message)log(s,message);
    return{state:s,ok:true,message:message||s.log.at(-1)||'',event};
  };
  const qty=action.qty??1;
  if(['sell','buyItem','buyStock','sellStock'].includes(action.type)&&(!Number.isInteger(qty)||qty<1||qty>999))return fail('数量は1〜999の整数で指定してください。');
  if(action.type==='enter'){
    if(s.mode!=='town')return fail('すでに探索中です。');if(s.hp<1)return fail('宿で休んでから出発しましょう。');
    s.mode='dungeon';s.floor=1;s.runTurns=0;s.runGold=0;s.runLoot=[];s.runRelic=false;s.stats.runs++;generateFloor(s);message='翠灯の迷宮 B1。歩く・攻撃する・道具を使うと敵も動きます。';event='enter';return finish();
  }
  if(['move','wait','stairs','return'].includes(action.type)&&s.mode!=='dungeon')return fail('街では探索の操作はできません。');
  if(action.type==='move'){
    if(!Number.isInteger(action.dx)||!Number.isInteger(action.dy)||Math.abs(action.dx)+Math.abs(action.dy)!==1)return fail('上下左右に1マスずつ移動できます。');
    const x=s.player.x+action.dx,y=s.player.y+action.dy;if(!walkable(s,x,y))return fail('壁があり、進めません。');
    const enemy=s.enemies.find(e=>e.x===x&&e.y===y);if(enemy){const damage=Math.max(1,s.attack-enemy.defense+between(s,-1,1));enemy.hp-=damage;log(s,`${enemy.name}に${damage}ダメージ。`);if(enemy.hp<=0)kill(s,enemy);event='attack';}else{s.player={x,y};collect(s);event='move';}
    event=tick(s)||event;return finish();
  }
  if(action.type==='wait'){log(s,'周囲の気配をうかがった。');event=tick(s)||'wait';return finish();}
  if(action.type==='stairs'){
    if(s.map.tiles[s.player.y][s.player.x]!==2)return fail('光る階段の上で使ってください。');
    if(s.floor===MAX_FLOOR){if(!s.runRelic||s.enemies.some(enemy=>enemy.kind==='boss'))return fail('地下10階の灯晶の番人を倒し、暁の種を手に入れよう。');event=endRun(s);return finish();}
    s.floor++;s.turn++;s.runTurns++;advanceClock(s);generateFloor(s);message=`B${s.floor}へ降りた。${RETURN_FLOORS.includes(s.floor)?'下り階段の隣に街へ戻る出口があります。':'入口の帰還門か帰灯石で街へ戻れます。'}`;event='stairs';return finish();
  }
  if(action.type==='return'){
    if(![3,4].includes(s.map.tiles[s.player.y][s.player.x])&&!consume(s,'recall'))return fail('帰還口へ戻るか、帰灯石を使ってください。');event=endRun(s);return finish();
  }
  if(action.type==='use'){
    const item=itemById[action.id];if(!item||item.kind!=='consumable')return fail('使える道具を選んでください。');
    if(action.id==='recall'&&s.mode!=='dungeon')return fail('帰灯石は迷宮の中で使えます。');
    if(action.id==='bomb'&&s.mode!=='dungeon')return fail('閃光の実は迷宮の中で使えます。');
    if(action.id==='potion'&&s.hp===s.maxHp)return fail('HPは満タンです。');if(action.id==='ration'&&s.hunger===100)return fail('満腹度は満タンです。');
    if(!consume(s,action.id))return fail(`${item.name}を持っていません。`);
    if(action.id==='recall'){event=endRun(s);return finish();}
    if(action.id==='potion'){s.hp=Math.min(s.maxHp,s.hp+24);log(s,'若葉の薬でHPを24回復。');}
    if(action.id==='ration'){s.hunger=Math.min(100,s.hunger+45);log(s,'旅人のパンで満腹度を45回復。');}
    if(action.id==='bomb'){for(const e of [...s.enemies])if(dist(e,s.player)<=3){e.hp-=18;if(e.hp<=0)kill(s,e);}log(s,'閃光の実が周囲を照らした！');}
    event=s.mode==='dungeon'?(tick(s)||'use'):'use';return finish();
  }
  if(s.mode!=='town')return fail('取引や建築は帰還後に行えます。');
  if(action.type==='nextDay'){
    if(s.gold<DAY_WAIT_COST)return fail(`翌日まで過ごすには生活費${DAY_WAIT_COST}Gが必要です。探索中は費用なしで日が進みます。`);
    s.gold-=DAY_WAIT_COST;s.dayTurns=0;advanceDay(s);message=`街で翌日まで過ごした。生活費${DAY_WAIT_COST}G。HP・満腹度は変わりません。`;event='day';return finish();
  }
  if(action.type==='sell'){
    const item=itemById[action.id];if(!item||quantity(s.inventory,item.id)<qty)return fail('売却する品物が足りません。');remove(s.inventory,item.id,qty);awardGold(s,item.sell*qty);message=`${item.name}を${qty}個売却。${item.sell*qty}Gを受け取った。`;event='sale';return finish();
  }
  if(action.type==='buyItem'){
    const item=itemById[action.id];if(!item||!item.buy)return fail('その品物はお店にありません。');const cost=item.buy*qty;if(s.gold<cost)return fail('所持金が足りません。');if(quantity(s.inventory,item.id)+qty>MAXSTACK)return fail('これ以上は持てません。');s.gold-=cost;add(s.inventory,item.id,qty);message=`${item.name}を${qty}個購入した。`;return finish();
  }
  if(action.type==='buyBag'){
    const tier=s.bagTier??0,next=BAG_UPGRADES[tier];
    if(!next)return fail('探索袋は最大まで拡張されています。');
    if(action.id!==next.id||qty!==1)return fail('袋は1段階ずつ拡張できます。');
    if(s.gold<next.cost)return fail('所持金が足りません。');
    s.gold-=next.cost;s.bagTier=tier+1;message=`${next.name}を購入。探索袋の上限が${next.capacity}個になった。拡張した容量は倒れても失いません。`;event='equip';return finish();
  }
  if(action.type==='buyWeapon'){
    const weapon=weaponById[action.id];if(!weapon)return fail('装備を選んでください。');if(weapon.attack<=weaponById[s.weaponId].attack)return fail('すでに同等以上の装備を持っています。');if(s.gold<weapon.price)return fail('所持金が足りません。');s.gold-=weapon.price;s.weaponId=weapon.id;recalc(s);message=`${weapon.name}を購入・装備した。`;event='equip';return finish();
  }
  if(action.type==='buyShield'){
    const shield=typeof action.id==='string'?shieldById[action.id]:null;
    if(!shield||qty!==1)return fail('購入する盾を1つ選んでください。');
    if(shield.defense<=shieldById[s.shieldId??'none'].defense)return fail('すでに同等以上の盾を装備しています。');
    if(s.gold<shield.price)return fail('所持金が足りません。');
    s.gold-=shield.price;s.shieldId=shield.id;recalc(s);message=`${shield.name}を購入・装備した。防御力が${s.defense}になった。`;event='equip';return finish();
  }
  if(action.type==='buyStock'||action.type==='sellStock'){
    const stock=stockById[action.id];if(!stock)return fail('銘柄を選んでください。');const value=s.prices[stock.id]*qty;
    if(action.type==='buyStock'){if(s.gold<value)return fail('所持金が足りません。');if(s.stocks[stock.id]+qty>99999)return fail('保有上限です。');s.gold-=value;s.stocks[stock.id]+=qty;message=`${stock.name}を${qty}株購入。`;}else{if(s.stocks[stock.id]<qty)return fail('保有株数が足りません。');s.stocks[stock.id]-=qty;awardGold(s,value);message=`${stock.name}を${qty}株売却。${value}Gを受け取った。`;}event='trade';return finish();
  }
  if(action.type==='buyLand'){if(s.plots.length>=12)return fail('敷地は最大12区画です。');const cost=landCost(s);if(s.gold<cost)return fail('所持金が足りません。');s.gold-=cost;s.plots.push({building:null,level:1});message='土地を1区画購入した。建物を建てて家賃を増やそう。';event='build';return finish();}
  if(action.type==='build'||action.type==='upgrade'){
    if(!Number.isInteger(action.index)||action.index<0||action.index>=s.plots.length)return fail('所有する区画を選んでください。');const p=s.plots[action.index];
    if(action.type==='build'){const building=buildingById[action.id];if(!building)return fail('建物を選んでください。');if(p.building)return fail('すでに建物があります。');if(s.gold<building.cost)return fail('所持金が足りません。');s.gold-=building.cost;p.building=building.id;p.level=1;message=`${building.name}が完成！ 次のゲーム内の日付更新から毎日家賃が入ります。`;}
    else{if(!p.building)return fail('先に建物を建ててください。');if(p.level>=3)return fail('これ以上の増築はできません。');const cost=upgradeCost(s,action.index);if(s.gold<cost)return fail('所持金が足りません。');s.gold-=cost;p.level++;message=`${buildingById[p.building].name}をレベル${p.level}に増築した。`;}
    event='build';return finish();
  }
  if(action.type==='rest'){if(s.hp===s.maxHp&&s.hunger===100)return fail('すでに元気いっぱいです。');if(s.gold<20){s.hp=Math.max(s.hp,Math.ceil(s.maxHp*.6));s.hunger=Math.max(s.hunger,60);message='街の救護所で応急手当を受けた。HPと満腹度が60%まで回復。';}else{s.gold-=20;s.hp=s.maxHp;s.hunger=100;message='宿でひと休み。20GでHPと満腹度が全回復。';}event='rest';return finish();}
  return fail('その操作は見つかりません。');
}

// Rebuild a known schema rather than trusting imported prototypes or extra properties.
export function validateSave(raw){
  const source=typeof raw==='string'?JSON.parse(raw):raw;
  const invalid=()=>{throw new Error('セーブデータの形式が正しくありません。');};
  const obj=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const num=(v,min,max,int=true)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max||(int&&!Number.isInteger(v)))invalid();return v;};
  const str=(v,max)=>{if(typeof v!=='string'||v.length>max)invalid();return v;};
  const bool=v=>{if(typeof v!=='boolean')invalid();return v;};
  const list=(v,max)=>{if(!Array.isArray(v)||v.length>max)invalid();return v;};
  if(!obj(source)||source.version!==1)invalid();
  const s=newGame(num(source.seed,1,4294967295));s.rng=num(source.rng,0,4294967295);
  for(const key of ['day','gold','level','xp','hp','hunger','floor','maxFloor','turn','runGold','runTurns']){
    const bounds={day:[1,1000000],gold:[0,MAXGOLD],level:[1,30],xp:[0,10000],hp:[1,181],hunger:[0,100],floor:[1,MAX_FLOOR],maxFloor:[0,MAX_FLOOR],turn:[0,100000000],runGold:[0,MAXGOLD],runTurns:[0,10000000]}[key];s[key]=num(source[key],...bounds,key!=='hunger');
  }
  s.dayTurns=Object.hasOwn(source,'dayTurns')?num(source.dayTurns,0,DAY_TURNS-1):0;
  s.bagTier=Object.hasOwn(source,'bagTier')?num(source.bagTier,0,BAG_UPGRADES.length):0;
  s.shieldId=Object.hasOwn(source,'shieldId')?source.shieldId:'none';if(typeof s.shieldId!=='string'||!Object.hasOwn(shieldById,s.shieldId))invalid();
  if(!['town','dungeon'].includes(source.mode)||!weaponById[source.weaponId])invalid();s.mode=source.mode;s.weaponId=source.weaponId;recalc(s);if(s.hp>s.maxHp)invalid();
  function inventory(v){const ids=new Set();return list(v,ITEMS.length).map(e=>{if(!obj(e)||!itemById[e.id]||ids.has(e.id))invalid();ids.add(e.id);return{id:e.id,qty:num(e.qty,1,MAXSTACK)};});}
  s.inventory=inventory(source.inventory);s.runLoot=inventory(source.runLoot);s.runRelic=bool(source.runRelic);
  if(!obj(source.stocks)||!obj(source.prices)||!obj(source.priceHistory))invalid();
  for(const spec of STOCKS){s.stocks[spec.id]=num(source.stocks[spec.id],0,99999);s.prices[spec.id]=num(source.prices[spec.id],Math.ceil(spec.base*.35),spec.base*4);s.priceHistory[spec.id]=list(source.priceHistory[spec.id],24).map(n=>num(n,Math.ceil(spec.base*.35),spec.base*4));if(!s.priceHistory[spec.id].length)invalid();}
  s.plots=list(source.plots,12).map(p=>{if(!obj(p)||(p.building!==null&&!buildingById[p.building]))invalid();return{building:p.building,level:num(p.level,1,3)};});if(!s.plots.length)invalid();
  if(!obj(source.stats))invalid();for(const key of ['runs','clears','kills','earned'])s.stats[key]=num(source.stats[key],0,MAXGOLD);
  s.log=list(source.log,40).map(v=>str(v,250));
  if(s.mode==='town'){if(source.map!==null||s.runLoot.length||s.runGold||s.runRelic)invalid();s.map=null;s.player={x:0,y:0};s.enemies=[];s.loot=[];return s;}
  const m=source.map;if(!obj(m)||m.width!==W||m.height!==H||!obj(source.player))invalid();
  const grid=(value,parse)=>{if(!Array.isArray(value)||value.length!==H)invalid();return value.map(row=>{if(!Array.isArray(row)||row.length!==W)invalid();return row.map(parse);});};
  s.map={width:W,height:H,tiles:grid(m.tiles,n=>num(n,0,4)),seen:grid(m.seen,bool),visible:grid(m.visible,bool),rooms:list(m.rooms,12).map(r=>{if(!obj(r))invalid();return{x:num(r.x,1,W-2),y:num(r.y,1,H-2),width:num(r.width,1,W-2),height:num(r.height,1,H-2),cx:num(r.cx,1,W-2),cy:num(r.cy,1,H-2)};})};
  const point=v=>{if(!obj(v))invalid();const p={x:num(v.x,0,W-1),y:num(v.y,0,H-1)};if(!walkable(s,p.x,p.y))invalid();return p;};
  s.player=point(source.player);const occupiedPositions=new Set([`${s.player.x},${s.player.y}`]),enemyIds=new Set();
  s.enemies=list(source.enemies,40).map(e=>{const p=point(e);if(typeof e.kind!=='string'||!Object.hasOwn(ENEMY_BY_ID,e.kind))invalid();const key=`${p.x},${p.y}`;if(occupiedPositions.has(key)||enemyIds.has(e.id))invalid();occupiedPositions.add(key);enemyIds.add(e.id);const maxHp=num(e.maxHp,1,1000),hp=num(e.hp,1,maxHp);return{id:str(e.id,80),kind:e.kind,name:str(e.name,40),...p,hp,maxHp,attack:num(e.attack,1,100),defense:num(e.defense,0,100),xp:num(e.xp,1,1000)};});
  s.loot=list(source.loot,100).map(e=>{if(!itemById[e.id])invalid();return{id:e.id,...point(e)};});
  // Optional encounter metadata extends version 1 without rewriting older maps.
  // Generated-only IDs prevent a forged room from putting ordinary enemies asleep.
  if(Object.hasOwn(m,'swarm')){
    const swarm=m.swarm;if(!obj(swarm)||!swarmEnemyCount(s.floor))invalid();
    const roomIndex=num(swarm.roomIndex,1,4),room=s.map.rooms[roomIndex];
    if(!room||room.width<5||room.width>7||room.height<5||room.height>7||room.x+room.width>W-1||room.y+room.height>H-1||room.cx!==room.x+Math.floor(room.width/2)||room.cy!==room.y+Math.floor(room.height/2))invalid();
    for(let y=room.y;y<room.y+room.height;y++)for(let x=room.x;x<room.x+room.width;x++)if(s.map.tiles[y][x]!==1)invalid();
    if(!['dormant','active','cleared'].includes(swarm.status))invalid();
    const ids=list(swarm.enemyIds,8);if(ids.length!==swarmEnemyCount(s.floor))invalid();
    const expectedPrefix=`swarm-${s.stats.runs}-${s.floor}-${roomIndex}-`;
    for(let i=0;i<ids.length;i++)if(ids[i]!==expectedPrefix+i)invalid();
    const members=s.enemies.filter(e=>ids.includes(e.id));
    if(members.some(e=>e.kind==='boss')||(swarm.status==='cleared'?members.length!==0:members.length===0))invalid();
    if(swarm.status==='dormant'&&members.some(e=>!inRoom(e,room)||roomDoor(s,e,room)))invalid();
    if(s.enemies.some(e=>e.id.startsWith('swarm-')&&!ids.includes(e.id)))invalid();
    s.map.swarm={roomIndex,status:swarm.status,enemyIds:[...ids]};
  }
  let exits=0,stairs=0,checkpoints=0;for(let y=0;y<H;y++)for(let x=0;x<W;x++){if((x===0||x===W-1||y===0||y===H-1)&&s.map.tiles[y][x]!==0)invalid();if(s.map.tiles[y][x]===2)stairs++;if(s.map.tiles[y][x]===3)exits++;if(s.map.tiles[y][x]===4)checkpoints++;}if(stairs!==1||exits!==1||checkpoints>1||(checkpoints&&!RETURN_FLOORS.includes(s.floor)))invalid();
  // Reject disconnected imported floors, so a valid save cannot strand the player.
  const queue=[s.player],reached=new Set([`${s.player.x},${s.player.y}`]);for(let i=0;i<queue.length;i++){const p=queue[i];for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+dx,y=p.y+dy,key=`${x},${y}`;if(walkable(s,x,y)&&!reached.has(key)){reached.add(key);queue.push({x,y});}}}
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(s.map.tiles[y][x]!==0&&!reached.has(`${x},${y}`))invalid();reveal(s);return s;
}
