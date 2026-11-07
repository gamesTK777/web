import test from 'node:test';
import assert from 'node:assert/strict';
import {TILES,createRound,legalActions,actRound,publicView,tilesFromString,shanten,winningTiles,evaluateWin,isFuriten,cpuDecisionView,chooseCpuDiscard,analyzeHand} from './engine.mjs';

function freeze(v){if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.freeze(v);Object.values(v).forEach(freeze);}return v;}
function conservation(s){
  const counts=Array(34).fill(0);for(const t of [...s.wall,...s.deadWall,...s.hands.flat(),...s.discards.flat()]){assert.ok(Number.isInteger(t)&&t>=0&&t<34);counts[t]++;}
  assert.deepEqual(counts,Array(34).fill(4));
  assert.equal(s.points[0]+s.points[1]+s.riichiPot,50000);
}
function fixture(human,cpu=null,{phase='human-discard',stage=4,river=[[],[]],last=null,riichi=[false,false]}={}){
  const s=createRound({seed:44,stage});s.hands=[tilesFromString(human),cpu?tilesFromString(cpu):[]];s.discards=river.map(a=>[...a]);
  const counts=Array(34).fill(4);for(const t of [...s.hands.flat(),...s.discards.flat()])counts[t]--;
  if(!cpu)for(let t=0;t<34&&s.hands[1].length<13;t++)while(counts[t]>0&&s.hands[1].length<13){s.hands[1].push(t);counts[t]--;}
  assert.ok(counts.every(n=>n>=0),'fixture does not invent fifth copies');
  const dead=[];for(let i=0;i<2;i++){assert.ok(counts[32]>0);dead.push(32);counts[32]--;}
  for(let t=0;t<34&&dead.length<14;t++)while(counts[t]>0&&dead.length<14){dead.push(t);counts[t]--;}
  [dead[0],dead[4]]=[dead[4],dead[0]];[dead[1],dead[5]]=[dead[5],dead[1]];
  s.deadWall=dead;s.doraIndicator=32;s.uraIndicator=32;s.wall=counts.flatMap((n,t)=>Array(n).fill(t));
  s.drawn=s.hands.map(h=>h.length===14?h.at(-1):null);s.phase=phase;s.turn=phase==='cpu'?1:0;s.lastDiscard=last;
  s.riichi=[...riichi];s.doubleRiichi=[false,false];s.ippatsu=[false,false];s.points=riichi.map(r=>r?24000:25000);s.riichiPot=riichi.filter(Boolean).length*1000;
  return s;
}
const READY='m123456p789s12z11';

test('34 tiles and seeded deals retain every physical tile, including both dealer options',()=>{
  assert.equal(TILES.length,34);assert.equal(new Set(TILES.map(t=>t.code)).size,34);
  for(const dealer of [0,1])for(const stage of [1,7]){
    const s=createRound({seed:20261107,dealer,stage});conservation(s);
    assert.deepEqual(s,createRound({seed:20261107,dealer,stage}));
    assert.equal(s.deadWall.length,14);assert.equal(s.hands[0].length,dealer===0?14:13);
    assert.equal(s.phase,dealer===0?'human-discard':'cpu');
  }
});

test('regular hands, seven pairs and thirteen orphans complete and return scored yaku',()=>{
  for(const [hand,expected]of [
    ['m123456p789s123z11','門前ツモ'],
    ['m1122p3344s5566z77','七対子'],
    ['m19p19s19z1234567m1','国士無双']
  ]){
    assert.equal(shanten(tilesFromString(hand)),-1);
    const s=fixture(hand),before=JSON.stringify(s),score=evaluateWin(freeze(s),0);
    assert.ok(score&&score.points>=1000,hand);assert.ok(score.yaku.some(y=>y.name.includes(expected)),JSON.stringify(score));
    assert.equal(score.winningHand.length,14);assert.equal(JSON.stringify(s),before);
  }
});

test('an incomplete or no-yaku ron is rejected while the same hand can self-draw',()=>{
  const s=fixture(READY,null,{phase:'human-ron',last:{player:1,tile:20}});
  assert.equal(evaluateWin(s,0,{type:'ron',tile:20}),null);
  assert.equal(legalActions(s).canRon,false);assert.equal(actRound(s,{type:'ron'}).ok,false);
  const tsumo=fixture(READY+'s3');assert.equal(legalActions(tsumo).canTsumo,true);
  const incomplete=fixture('m123456p789s12z11m9');assert.equal(evaluateWin(incomplete,0),null);
});

test('wait analysis and permanent/temporary/riichi furiten prevent improper ron but never tsumo',()=>{
  assert.deepEqual(winningTiles(tilesFromString(READY)),[20]);
  const base=fixture(READY,null,{phase:'human-ron',last:{player:1,tile:20},riichi:[true,false]});
  assert.equal(legalActions(base).canRon,true);
  for(const mutate of [s=>s.discards[0].push(20),s=>s.temporaryFuriten[0]=true,s=>s.riichiFuriten[0]=true]){
    const s=structuredClone(base);mutate(s);assert.equal(isFuriten(s,0),true);assert.equal(legalActions(s).canRon,false);
  }
  const tsumo=fixture(READY+'s3',null,{river:[[20],[]],riichi:[true,false]});
  tsumo.riichiFuriten[0]=true;assert.equal(legalActions(tsumo).canTsumo,true);
});

test('riichi declares only a tenpai discard, locks the drawn tile, and preserves every point',()=>{
  const s=fixture(READY+'m9','m999p111222s999z1',{stage:1}),before=JSON.stringify(s);
  const legal=legalActions(s);assert.ok(legal.riichiDiscards.includes(13));
  const declared=actRound(freeze(s),{type:'riichi',index:13});assert.equal(declared.ok,true);assert.equal(declared.event,'riichi');
  assert.equal(JSON.stringify(s),before);assert.equal(declared.state.points[0],24000);assert.equal(declared.state.riichiPot,1000);conservation(declared.state);
  const reply=actRound(declared.state,{type:'cpu'});assert.equal(reply.ok,true);assert.equal(reply.state.phase,'human-discard');
  assert.deepEqual(legalActions(reply.state).discardIndices,[13]);
  assert.equal(actRound(reply.state,{type:'discard',index:0}).ok,false);
  const locked=actRound(reply.state,{type:'discard',index:13});assert.equal(locked.ok,true);conservation(locked.state);
  assert.equal(locked.state.ippatsu[0],false);
  const notReady=createRound({seed:123});const bad=legalActions(notReady).discardIndices.find(i=>!legalActions(notReady).riichiDiscards.includes(i));
  assert.equal(actRound(notReady,{type:'riichi',index:bad}).ok,false);
});

test('declining ron after riichi is permanent furiten, and normal temporary furiten resets on draw',()=>{
  const s=fixture(READY,null,{phase:'human-ron',last:{player:1,tile:20},riichi:[true,false]});
  const skipped=actRound(s,{type:'pass'});assert.equal(skipped.ok,true);assert.equal(skipped.state.riichiFuriten[0],true);
  assert.equal(skipped.state.temporaryFuriten[0],false);assert.equal(skipped.state.hands[0].length,14);
});

test('a riichi announcement discard that is ronned does not lose an unaccepted stick',()=>{
  const s=fixture(READY+'m9','m78p123456s123z11',{stage:7,riichi:[false,true]});
  const declared=actRound(s,{type:'riichi',index:13});assert.equal(declared.ok,true);
  const response=actRound(declared.state,{type:'cpu'});assert.equal(response.ok,true);assert.equal(response.state.result.winner,1);assert.equal(response.state.result.type,'ron');
  assert.equal(response.state.riichi[0],false);assert.equal(response.state.result.riichiBonus,1000);conservation(response.state);
});

test('terminal scoring transfers the standard win total to the two-player opponent',()=>{
  const s=fixture(READY+'s3');const score=evaluateWin(s,0);
  const result=actRound(s,{type:'tsumo'});assert.equal(result.ok,true);assert.equal(result.state.phase,'finished');
  assert.equal(result.state.points[0],25000+score.points);assert.equal(result.state.points[1],25000-score.points);conservation(result.state);
  assert.equal(actRound(result.state,{type:'discard',index:0}).ok,false);
});

test('public views hide the CPU hand, wall and ura indicator until the result, without sharing mutable arrays',()=>{
  const s=createRound({seed:98});const view=publicView(s);assert.ok(view.hands[1].every(t=>t===null));
  assert.equal('wall'in view,false);assert.equal('deadWall'in view,false);assert.equal('uraIndicator'in view,false);assert.equal('rng'in view,false);
  view.hands[0].length=0;view.discards[0].push(1);assert.equal(s.hands[0].length,14);assert.equal(s.discards[0].length,0);
});

test('CPU choices cannot inspect opponent concealed tiles or future wall contents at any difficulty',()=>{
  const s=createRound({seed:111,dealer:1});const drawn=structuredClone(s);drawn.hands[1].push(drawn.wall.pop());
  const other=structuredClone(drawn);other.hands[0]=Array(13).fill(33);other.wall.reverse();other.deadWall.reverse();other.rng=0;
  assert.deepEqual(cpuDecisionView(drawn),cpuDecisionView(other));
  for(let stage=1;stage<=7;stage++)for(const random of [.1,.5,.9]){
    assert.equal(chooseCpuDiscard(cpuDecisionView(drawn),{stage,random}),chooseCpuDiscard(cpuDecisionView(other),{stage,random}));
  }
});

test('invalid actions do not spend points, consume tiles, or change the input',()=>{
  const s=freeze(createRound({seed:808})),before=JSON.stringify(s);
  for(const a of [{type:'cpu'},{type:'pass'},{type:'ron'},{type:'discard',index:-1},{type:'discard',index:999},{type:'discard',index:'0'},{type:'unknown'}]){
    const r=actRound(s,a);assert.equal(r.ok,false);assert.equal(r.state,s);assert.equal(JSON.stringify(s),before);
  }
});

test('an exhausted wall finishes as a draw, with thirteen concealed tiles on each side',()=>{
  let s=createRound({stage:1,seed:1,dealer:1}),steps=0;
  while(s.phase!=='finished'&&steps++<200){
    const a=legalActions(s);
    const action=a.canRon?{type:'ron'}:a.canTsumo?{type:'tsumo'}:a.needsCpu?{type:'cpu'}:{type:'discard',index:(1+steps)%14};
    const result=actRound(s,action);assert.equal(result.ok,true);s=result.state;conservation(s);
  }
  assert.equal(s.result.type,'draw');assert.equal(s.result.winner,null);assert.equal(s.result.points,0);
  assert.equal(s.wall.length,0);assert.deepEqual(s.hands.map(h=>h.length),[13,13]);
  assert.equal(s.result.tenpai.length,2);assert.equal(legalActions(s).canDiscard,false);
});

test('seven CPU difficulty settings and both dealers finish simulations with tile conservation',()=>{
  for(let stage=1;stage<=7;stage++)for(const dealer of [0,1]){
    let s=createRound({stage,dealer,seed:491+stage});let turns=0;
    while(s.phase!=='finished'&&turns++<250){
      const a=legalActions(s);let action;
      if(a.canTsumo)action={type:'tsumo'};else if(a.canRon)action={type:'ron'};else if(a.needsCpu)action={type:'cpu'};
      else{
        const info=analyzeHand(s.hands[0],{discards:s.discards,doraIndicator:s.doraIndicator});
        const index=s.riichi[0]?13:info.discardOptions[0].index;
        action={type:a.riichiDiscards.includes(index)?'riichi':'discard',index};
      }
      const before=JSON.stringify(s),result=actRound(freeze(s),action);assert.equal(result.ok,true,JSON.stringify({stage,dealer,action,result}));assert.equal(JSON.stringify(s),before);
      s=result.state;conservation(s);
    }
    assert.equal(s.phase,'finished');assert.ok(s.result);assert.ok(turns<=200);
  }
});
