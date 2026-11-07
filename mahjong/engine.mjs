import {Shoupai,Util,rule} from './vendor/majiang-core.mjs';

// Two-player, closed-hand arcade mahjong. Scoring and hand analysis use the
// MIT-licensed @kobalab/majiang-core; this module owns only the local round.
const SUITS=['m','p','s','z'],NUMBERS=['一','二','三','四','五','六','七','八','九'];
const HONORS=['東','南','西','北','白','發','中'];
export const TILES=Object.freeze(Array.from({length:34},(_,id)=>{
  const suit=id<27?SUITS[Math.floor(id/9)]:'z',rank=id<27?id%9+1:id-26;
  const suitName={m:'萬',p:'筒',s:'索',z:''}[suit],name=suit==='z'?HONORS[rank-1]:NUMBERS[rank-1]+suitName;
  const cp=suit==='m'?0x1f007+rank-1:suit==='s'?0x1f010+rank-1:suit==='p'?0x1f019+rank-1:[0x1f000,0x1f001,0x1f002,0x1f003,0x1f006,0x1f005,0x1f004][rank-1];
  return Object.freeze({id,suit,rank,name,label:name,short:suit==='z'?name:String(rank),suitName,code:suit+rank,unicode:String.fromCodePoint(cp)+'\uFE0E',terminal:suit!=='z'&&(rank===1||rank===9),honor:suit==='z'});
}));
export const TILE=TILES;
export const RULES=Object.freeze({players:2,tiles:136,closedHandOnly:true,redFives:false,kan:false,chi:false,pon:false,deadWall:14,riichiCost:1000,startingPoints:25000});
const CORE_RULE=rule({'赤牌':{m:0,p:0,s:0},'裏ドラあり':true,'カンドラあり':false,'カン裏あり':false,'場数':0});
const clone=value=>JSON.parse(JSON.stringify(value));
const validTile=id=>Number.isInteger(id)&&id>=0&&id<34;
const sorted=hand=>[...hand].sort((a,b)=>a-b);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const handCache=new Map();
function rand(s){s.rng=(Math.imul(s.rng,1664525)+1013904223)>>>0;return s.rng/4294967296;}
export const tileCode=id=>TILES[id]?.code??'';
export const tileLabel=id=>TILES[id]?.name??'';
export function tilesFromString(value){
  const out=[];for(const match of String(value).matchAll(/([mpsz])([1-9]+)/g))for(const n of match[2]){
    const rank=Number(n),id=match[1]==='z'?26+rank:SUITS.indexOf(match[1])*9+rank-1;
    if(!validTile(id)||match[1]==='z'&&rank>7)throw Error('Invalid tile string');out.push(id);
  }return out;
}
function asHand(tiles){return new Shoupai(tiles.map(tileCode));}
export function shanten(tiles){
  if(!Array.isArray(tiles)||tiles.some(t=>!validTile(t)))return 8;
  const key=sorted(tiles).join(',');let value=handCache.get(key);
  if(value===undefined){value=Util.xiangting(asHand(tiles));if(handCache.size>=4096)handCache.clear();handCache.set(key,value);}
  return value;
}
export function winningTiles(hand){
  if(hand.length!==13||shanten(hand)!==0)return[];
  const counts=Array(34).fill(0);for(const t of hand)counts[t]++;
  return TILES.filter(t=>counts[t.id]<4&&shanten([...hand,t.id])===-1).map(t=>t.id);
}
function doraOf(indicator){const t=TILES[indicator];if(!t)return-1;if(t.suit!=='z')return indicator%9===8?indicator-8:indicator+1;return indicator<31?(indicator===30?27:indicator+1):(indicator===33?31:indicator+1);}
function yakuName(name){return({'立直':'リーチ','一発':'一発','門前清自摸和':'門前ツモ','断幺九':'タンヤオ','役牌 白':'役牌・白','役牌 發':'役牌・發','役牌 中':'役牌・中','海底摸月':'海底ツモ','河底撈魚':'河底ロン','ドラ':'ドラ','裏ドラ':'裏ドラ'})[name]||name;}
/** Standard four-player win total, transferred by the single opponent here. */
export function evaluateWin(state,player,{type='tsumo',tile}={}){
  try{
    const hand=state.hands[player],isRon=type==='ron';
    if(isRon?(hand.length!==13||!validTile(tile)):(hand.length!==14))return null;
    let core;if(isRon)core=asHand(hand);else{core=asHand(hand.slice(0,-1));core.zimo(tileCode(hand.at(-1)));}
    const param=Util.hule_param({rule:CORE_RULE,zhuangfeng:0,menfeng:player===state.dealer?0:1,
      lizhi:state.riichi[player]?state.doubleRiichi?.[player]?2:1:0,yifa:!!state.ippatsu?.[player],
      haidi:state.wall.length===0?(isRon?2:1):0,baopai:[tileCode(state.doraIndicator)],
      fubaopai:state.riichi[player]?[tileCode(state.uraIndicator)]:null});
    const scored=Util.hule(core,isRon?tileCode(tile)+'+':null,param);
    if(!scored?.hupai?.length||!scored.defen)return null;
    const yaku=scored.hupai.map(y=>({name:yakuName(y.name),han:typeof y.fanshu==='number'?y.fanshu:13*String(y.fanshu).length,yakuman:typeof y.fanshu==='string'}));
    return{winner:player,type,han:scored.fanshu||13*(scored.damanguan||1),fu:scored.fu||0,points:scored.defen,yaku,
      winningTile:isRon?tile:hand.at(-1),winningHand:sorted(isRon?[...hand,tile]:hand),yakuman:scored.damanguan||0,
      message:`${player===0?'あなた':'CPU'}の${isRon?'ロン':'ツモ'}！ ${scored.defen.toLocaleString('ja-JP')}点`};
  }catch{return null;}
}
export function isFuriten(state,player){
  if(state.riichiFuriten?.[player]||state.temporaryFuriten?.[player])return true;
  const waits=winningTiles(state.hands[player]);return waits.some(t=>state.discards[player].includes(t));
}
function ronScore(state,player){
  const last=state.lastDiscard;if(!last||last.player===player||isFuriten(state,player))return null;
  return evaluateWin(state,player,{type:'ron',tile:last.tile});
}
function finishDraw(s){
  s.phase='finished';s.result={winner:null,type:'draw',han:0,fu:0,points:0,yaku:[],winningTile:null,
    tenpai:s.hands.map(h=>shanten(h)===0),message:'流局。山の牌がなくなりました。'};return'draw';
}
function cancelPendingRiichi(s){
  const p=s.pendingRiichi;if(p===null)return;s.points[p]+=1000;s.riichiPot-=1000;s.riichi[p]=false;s.doubleRiichi[p]=false;s.ippatsu[p]=false;s.riichiAt[p]=null;s.pendingRiichi=null;
}
function finishWin(s,result){
  if(result.type==='ron')cancelPendingRiichi(s);
  s.phase='finished';s.points[1-result.winner]-=result.points;s.points[result.winner]+=result.points+s.riichiPot;
  s.result={...result,riichiBonus:s.riichiPot,pointsBefore:[...s.points].map((n,i)=>n+(i===result.winner?-result.points-s.riichiPot:result.points))};s.riichiPot=0;return result.type;
}
function drawFor(s,player){
  if(!s.wall.length)return false;
  s.hands[player]=sorted(s.hands[player]);const tile=s.wall.pop();s.hands[player].push(tile);s.drawn[player]=tile;s.drawCount++;
  s.temporaryFuriten[player]=false;s.turn=player;s.phase=player===0?'human-discard':'cpu';return true;
}
export function createRound({stage=1,seed=Date.now(),dealer=0}={}){
  const n=(Number(seed)>>>0)||1;
  const s={version:1,stage:clamp(Math.floor(Number(stage)||1),1,7),seed:n,rng:n,dealer:dealer===1?1:0,
    wall:[],deadWall:[],hands:[[],[]],discards:[[],[]],drawn:[null,null],riichi:[false,false],doubleRiichi:[false,false],
    riichiAt:[null,null],ippatsu:[false,false],temporaryFuriten:[false,false],riichiFuriten:[false,false],pendingRiichi:null,
    points:[25000,25000],riichiPot:0,turn:0,turnCount:0,drawCount:0,lastDiscard:null,phase:'human-discard',result:null};
  const wall=Array.from({length:136},(_,i)=>Math.floor(i/4));
  for(let i=wall.length-1;i>0;i--){const j=Math.floor(rand(s)*(i+1));[wall[i],wall[j]]=[wall[j],wall[i]];}
  s.deadWall=wall.splice(-14);s.doraIndicator=s.deadWall[4];s.uraIndicator=s.deadWall[5];
  for(let i=0;i<13;i++)for(let p=0;p<2;p++)s.hands[p].push(wall.pop());s.hands=s.hands.map(sorted);s.wall=wall;
  if(s.dealer===0)drawFor(s,0);else{s.turn=1;s.phase='cpu';}
  return s;
}
function riichiIndices(state,player){
  const h=state.hands[player];if(h.length!==14||state.riichi[player]||state.points[player]<1000||state.wall.length<4)return[];
  return h.map((_,i)=>i).filter(i=>shanten(h.filter((_,j)=>j!==i))===0);
}
export function legalActions(state){
  const h=state.hands[0],discard=state.phase==='human-discard';
  const riichiDiscards=discard?riichiIndices(state,0):[];
  const indices=discard?(state.riichi[0]?[h.length-1]:h.map((_,i)=>i)):[];
  return{phase:state.phase,canDiscard:discard,discardIndices:indices,riichiDiscards,canRiichi:riichiDiscards.length>0,
    canTsumo:discard&&!!evaluateWin(state,0),canRon:state.phase==='human-ron'&&!!ronScore(state,0),
    canPass:state.phase==='human-ron',needsCpu:state.phase==='cpu',shanten:shanten(h),waits:h.length===13?winningTiles(h):[]};
}
function visibleCounts(view){const counts=Array(34).fill(0);for(const t of [...view.hand,...view.discards.flat(),view.doraIndicator])if(validTile(t))counts[t]++;return counts;}
function efficiency(hand,visible){
  const current=shanten(hand),counts=Array(34).fill(0);for(const t of hand)counts[t]++;
  let ukeire=0;const improving=[];
  for(let t=0;t<34;t++)if(counts[t]<4&&visible[t]<4&&shanten([...hand,t])<current){const left=Math.max(0,4-visible[t]);ukeire+=left;improving.push(t);}
  return{shanten:current,ukeire,improving};
}
function tileShape(tile,hand){
  const t=TILES[tile],same=hand.filter(x=>x===tile).length;
  if(t.honor)return same>=2?5+same*2:same===1?1:0;
  const rank=t.rank;let n=same*3;
  for(const [step,weight]of [[1,2.1],[2,.9]])for(const direction of [-1,1])if(rank+step*direction>=1&&rank+step*direction<=9&&hand.includes(tile+step*direction))n+=weight;
  return n+(rank>=3&&rank<=7?.6:0);
}
function danger(tile,view,seen){
  if(view.discards[0].includes(tile))return 0;
  const t=TILES[tile];if(t.honor)return Math.max(.05,.7-seen[tile]*.2);
  let value=t.terminal?.55:1;
  if((t.rank>3&&view.discards[0].includes(tile-3))||(t.rank<7&&view.discards[0].includes(tile+3)))value*=.52;
  for(const d of [-1,1])if(t.rank+d>=1&&t.rank+d<=9&&seen[tile+d]>=4)value*=.6;
  return value;
}
/** Only public table information and the CPU's own hand enter its decision. */
export function cpuDecisionView(state){return{hand:[...state.hands[1]],discards:state.discards.map(a=>[...a]),riichi:[...state.riichi],doraIndicator:state.doraIndicator,riichiAt:[...state.riichiAt],points:[...state.points]};}
export function chooseCpuDiscard(view,{stage=1,random=.5}={}){
  const level=clamp(Math.floor(Number(stage)||1),1,7),hand=view.hand;
  if(hand.length!==14)return -1;if(view.riichi[1])return 13;
  const indices=hand.map((_,i)=>i).filter((i,_,all)=>all.find(j=>hand[j]===hand[i])===i);
  const noise=clamp(Number(random)||0,0,.999999);
  if(level===1&&noise<.75)return indices[Math.floor(noise/.75*indices.length)];
  if(level===2&&noise<.34)return indices[Math.floor(noise/.34*indices.length)];
  const seen=visibleCounts(view),dora=doraOf(view.doraIndicator);
  const candidates=indices.map(index=>{
    const tile=hand[index],rest=hand.filter((_,i)=>i!==index),s=shanten(rest);
    const e=level>=4?efficiency(rest,seen):{ukeire:0};
    const keep=tileShape(tile,rest)+(tile===dora?4:0),risk=view.riichi[0]?danger(tile,view,seen):0;
    let value=-s*100+e.ukeire*(level>=7?1.6:1.0)-keep*(level>=5?.8:.3);
    if(level===2)value=-s*50-keep;
    if(level>=6&&view.riichi[0]&&s>0)value-=risk*(level===7?130:80);
    if(level>=7&&s===0){const waits=winningTiles(rest);value+=waits.length*1.5;}
    return{index,value};
  });
  candidates.sort((a,b)=>b.value-a.value||a.index-b.index);
  if(level===3&&noise<.15)return candidates[Math.min(2,candidates.length-1)].index;
  return candidates[0].index;
}
export function analyzeHand(hand,{discards=[[],[]],doraIndicator=0}={}){
  const seen=visibleCounts({hand,discards,doraIndicator});
  const discardOptions=hand.length===14?hand.map((tile,index)=>({index,tile,...efficiency(hand.filter((_,i)=>i!==index),seen)})):[];
  discardOptions.sort((a,b)=>a.shanten-b.shanten||b.ukeire-a.ukeire||a.index-b.index);
  return{shanten:shanten(hand),waits:winningTiles(hand),discardOptions};
}
function discard(s,player,index,declare=false){
  const hand=s.hands[player],tile=hand[index];
  if(declare){s.riichi[player]=true;s.doubleRiichi[player]=s.discards[player].length===0;s.ippatsu[player]=true;s.points[player]-=1000;s.riichiPot+=1000;s.pendingRiichi=player;s.riichiAt[player]=s.discards[player].length;}
  else if(s.riichi[player])s.ippatsu[player]=false;
  s.hands[player]=sorted(hand.filter((_,i)=>i!==index));s.discards[player].push(tile);s.drawn[player]=null;s.turnCount++;
  s.lastDiscard={player,tile,riichi:declare,turn:s.turnCount};s.turn=1-player;
  if(player===0){s.phase='cpu';return declare?'riichi':'discard';}
  if(ronScore(s,0)){s.phase='human-ron';return'ron-offer';}
  s.pendingRiichi=null;if(!drawFor(s,0))return finishDraw(s);return declare?'cpu-riichi':'cpu-discard';
}
export function actRound(state,action){
  const fail=message=>({ok:false,state,event:'invalid',message});
  if(!state||!action||typeof action.type!=='string')return fail('操作を選んでください。');
  if(state.phase==='finished')return fail('この対局は終了しました。');
  const legal=legalActions(state),s=clone(state);let event='',message='';
  if(action.type==='tsumo'){
    if(!legal.canTsumo)return fail('ツモできる手牌ではありません。');event=finishWin(s,evaluateWin(s,0));
  }else if(action.type==='ron'){
    if(!legal.canRon)return fail('ロンできません。役・待ち牌・フリテンを確認してください。');event=finishWin(s,ronScore(s,0));
  }else if(action.type==='pass'){
    if(!legal.canPass)return fail('今はロンを見送る場面ではありません。');s.temporaryFuriten[0]=true;if(s.riichi[0])s.riichiFuriten[0]=true;s.pendingRiichi=null;
    if(!drawFor(s,0))event=finishDraw(s);else event='pass';
  }else if(action.type==='discard'||action.type==='riichi'){
    const index=action.index??action.tileIndex,declare=action.type==='riichi'||action.riichi===true;
    if(!legal.canDiscard||!Number.isInteger(index)||!legal.discardIndices.includes(index))return fail('その牌は今は切れません。');
    if(declare&&!legal.riichiDiscards.includes(index))return fail('この牌ではリーチできません。');
    event=discard(s,0,index,declare);message=`${tileLabel(state.hands[0][index])}を切りました。${declare?'リーチ！':''}`;
  }else if(action.type==='cpu'){
    if(!legal.needsCpu)return fail('今はあなたの手番です。');
    const ron=ronScore(s,1);if(ron){event=finishWin(s,ron);}
    else{
      s.pendingRiichi=null;if(!drawFor(s,1))event=finishDraw(s);
      else{
        const tsumo=evaluateWin(s,1);if(tsumo)event=finishWin(s,tsumo);
        else{
          const index=chooseCpuDiscard(cpuDecisionView(s),{stage:s.stage,random:rand(s)}),ready=riichiIndices(s,1);
          const declare=ready.includes(index)&&(s.stage>=3||rand(s)<(s.stage===1?.2:.65));
          event=discard(s,1,index,declare);message=`CPUが${tileLabel(s.lastDiscard.tile)}を切りました。${declare?'リーチ！':''}`;
        }
      }
    }
  }else return fail('その操作には対応していません。');
  return{ok:true,state:s,event,message:s.result?.message||message||(event==='ron-offer'?'ロンできます。':'あなたの手番です。')};
}
export function publicView(state){
  const reveal=state.phase==='finished';
  return{stage:state.stage,dealer:state.dealer,phase:state.phase,turn:state.turn,turnCount:state.turnCount,drawCount:state.drawCount,
    hands:[[...state.hands[0]],reveal?[...state.hands[1]]:state.hands[1].map(()=>null)],hand:[...state.hands[0]],cpuHandCount:state.hands[1].length,
    drawn:[state.drawn[0],reveal?state.drawn[1]:null],drawnIndex:state.hands[0].length===14?13:null,
    discards:state.discards.map(a=>[...a]),riichi:[...state.riichi],riichiAt:[...state.riichiAt],points:[...state.points],
    riichiPot:state.riichiPot,doraIndicator:state.doraIndicator,doraTile:doraOf(state.doraIndicator),wallRemaining:state.wall.length,
    lastDiscard:state.lastDiscard?{...state.lastDiscard}:null,result:state.result?clone(state.result):null,legal:legalActions(state)};
}
