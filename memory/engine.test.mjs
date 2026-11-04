import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,selectCard,resolvePair} from './engine.mjs';

function seeded(seed=1) {
  return () => { seed = (Math.imul(seed,1664525)+1013904223) >>> 0; return seed / 0x100000000; };
}
function pair(state) {
  const first=state.cards.find(card=>!card.matched);
  return [first,state.cards.find(card=>!card.matched&&card.id!==first.id&&card.pairId===first.pairId)].map(card=>card.id);
}
function miss(state) {
  const first=state.cards.find(card=>!card.matched);
  const second=state.cards.find(card=>!card.matched&&card.pairId!==first.pairId);
  assert(second,'a miss needs at least two remaining pairs');
  return [first.id,second.id];
}
function play(state,ids) { return resolvePair(selectCard(selectCard(state,ids[0]),ids[1])); }
function freeze(value) {
  if (value && typeof value==='object') { for(const child of Object.values(value))freeze(child);Object.freeze(value); }
  return value;
}
function invariant(state) {
  assert.equal(state.cards.length,state.pairs*2);
  assert.equal(new Set(state.cards.map(card=>card.id)).size,state.cards.length);
  assert.equal(state.cards.filter(card=>card.matched).length,state.matchedPairs*2);
  assert.equal(state.scores[0]+state.scores[1],state.matchedPairs);
  assert(state.currentPlayer===0||state.currentPlayer===1);
  assert.equal(state.selected.length,new Set(state.selected).size);
  assert(state.selected.every(id=>state.cards.some(card=>card.id===id&&!card.matched)));
  assert.equal(state.selected.length,{ready:0,one:1,resolving:2,finished:0}[state.phase]);
  if(state.phase==='finished')assert.equal(state.matchedPairs,state.pairs);
}

test('all board sizes contain distinct card ids and exactly two of each chosen animal',()=>{
  for(const pairs of [6,10,18]){
    const state=createGame({pairs,rng:seeded(pairs)}),counts=new Map();
    state.cards.forEach(card=>counts.set(card.pairId,(counts.get(card.pairId)||0)+1));
    assert.equal(counts.size,pairs);assert([...counts.values()].every(count=>count===2));
    assert([...counts.keys()].every(id=>Number(id)>=0&&Number(id)<18));
    assert.equal(state.phase,'ready');assert.equal(state.winner,null);invariant(state);
  }
});

test('dealing is deterministic with an injected random source and player names are normalized',()=>{
  assert.deepEqual(createGame({rng:seeded(42)}),createGame({rng:seeded(42)}));
  const state=createGame({playerNames:['  ひとりめ  ','  ']});
  assert.deepEqual(state.playerNames,['ひとりめ','プレイヤー2']);
  assert.equal(createGame({playerNames:['12345678901234567890','B']}).playerNames[0].length,16);
});

test('invalid board options and random values are rejected before play',()=>{
  for(const pairs of [0,5,7,19,'6',NaN,6.5])assert.throws(()=>createGame({pairs}));
  for(const value of [-.1,1,NaN,Infinity])assert.throws(()=>createGame({rng:()=>value}));
  assert.throws(()=>createGame({rng:null}));
  for(const playerNames of [null,[],['A'],['A','B','C'],['A',42]])assert.throws(()=>createGame({playerNames}));
});

test('duplicate, unknown and third taps cannot corrupt the pending pair',()=>{
  let state=createGame({rng:seeded()});
  assert.equal(selectCard(state,'unknown'),state);
  state=selectCard(state,state.cards[0].id);
  assert.equal(state.phase,'one');assert.equal(selectCard(state,state.selected[0]),state);
  state=selectCard(state,state.cards[1].id);
  assert.equal(state.phase,'resolving');assert.equal(state.moves,1);
  assert.equal(selectCard(state,state.cards[2].id),state);invariant(state);
});

test('a match immediately releases selection and keeps the same player for the next match',()=>{
  let state=createGame({rng:seeded(7)});
  for(let i=1;i<=3;i++){
    const ids=pair(state);state=play(state,ids);
    assert.equal(state.phase,'ready');assert.equal(state.currentPlayer,0);
    assert.deepEqual(state.selected,[]);assert.deepEqual(state.scores,[i,0]);
    assert.deepEqual(state.lastResult,{type:'match',cardIds:ids,playerIndex:0});
    assert(ids.every(id=>state.cards.find(card=>card.id===id).matched));
    assert.equal(selectCard(state,ids[0]),state);invariant(state);
  }
  const next=selectCard(state,pair(state)[0]);assert.equal(next.phase,'one');
});

test('a mismatch closes both cards, changes the player and permits the next card',()=>{
  let state=createGame({rng:seeded(8)});const ids=miss(state);
  state=play(state,ids);
  assert.equal(state.phase,'ready');assert.equal(state.currentPlayer,1);
  assert.deepEqual(state.selected,[]);assert.deepEqual(state.scores,[0,0]);
  assert.deepEqual(state.lastResult,{type:'miss',cardIds:ids,playerIndex:0});
  assert.equal(state.cards.some(card=>card.matched),false);
  const next=selectCard(state,ids[0]);assert.equal(next.phase,'one');assert.equal(next.lastResult,null);
  const again=play(state,ids);assert.equal(again.currentPlayer,0);assert.equal(again.moves,2);invariant(again);
});

test('pair resolution is idempotent and cannot add points twice',()=>{
  const initial=createGame({rng:seeded(3)}),ids=pair(initial);
  assert.equal(resolvePair(initial),initial);
  const one=selectCard(initial,ids[0]);assert.equal(resolvePair(one),one);
  const pending=selectCard(one,ids[1]),done=resolvePair(pending);
  assert.equal(resolvePair(done),done);assert.equal(done.scores[0],1);assert.equal(done.moves,1);
});

test('every transition works with frozen prior states and leaves them unchanged',()=>{
  const initial=freeze(createGame({rng:seeded(9)})),snapshot=JSON.stringify(initial),ids=pair(initial);
  const one=freeze(selectCard(initial,ids[0])),two=freeze(selectCard(one,ids[1])),done=resolvePair(two);
  assert.equal(JSON.stringify(initial),snapshot);assert.equal(one.phase,'one');assert.equal(two.phase,'resolving');
  assert.notEqual(done,two);assert.notEqual(done.cards,two.cards);assert.equal(done.scores[0],1);
  assert.equal(initial.cards.some(card=>card.matched),false);invariant(done);
});

test('a new game has no shared mutable deck or selection with an old pending game',()=>{
  const initial=createGame({rng:seeded(1)}),ids=pair(initial),old=selectCard(selectCard(initial,ids[0]),ids[1]);
  const fresh=createGame({pairs:18,rng:seeded(2)}),freshSnapshot=JSON.stringify(fresh);
  resolvePair(old);
  assert.equal(JSON.stringify(fresh),freshSnapshot);assert.equal(fresh.phase,'ready');
  assert.notEqual(old.cards,fresh.cards);assert.notEqual(old.selected,fresh.selected);invariant(fresh);
});

test('all board sizes finish, conserve every card and reject later input',()=>{
  for(const pairs of [6,10,18]){
    let state=createGame({pairs,rng:seeded(pairs+10)});
    for(let i=0;i<pairs;i++){state=play(state,pair(state));invariant(state);}
    assert.equal(state.phase,'finished');assert.equal(state.winner,0);
    assert.deepEqual(state.scores,[pairs,0]);assert.equal(state.moves,pairs);
    assert.equal(selectCard(state,state.cards[0].id),state);assert.equal(resolvePair(state),state);
  }
});

test('the second player can win and equal pair totals produce a draw',()=>{
  let state=createGame({rng:seeded(4)});state=play(state,miss(state));
  while(state.phase!=='finished')state=play(state,pair(state));
  assert.equal(state.winner,1);assert.deepEqual(state.scores,[0,6]);
  state=createGame({rng:seeded(5)});
  for(let i=0;i<3;i++)state=play(state,pair(state));
  state=play(state,miss(state));
  while(state.phase!=='finished')state=play(state,pair(state));
  assert.equal(state.winner,'draw');assert.deepEqual(state.scores,[3,3]);invariant(state);
});

test('mixed rapid taps and repeated resolutions always retain valid state and can finish',()=>{
  for(const pairs of [6,10,18])for(let seed=1;seed<=20;seed++){
    const rng=seeded(seed),allMoves=[];let state=createGame({pairs,rng});
    for(let step=0;step<150&&state.phase!=='finished';step++){
      if(state.phase==='resolving'&&rng()<.6)state=resolvePair(state);
      else{
        const id=rng()<.1?'missing':state.cards[Math.floor(rng()*state.cards.length)].id;
        state=selectCard(state,id);allMoves.push(id);
      }
      invariant(state);
    }
    if(state.phase==='resolving')state=resolvePair(state);
    if(state.phase==='one'){
      const first=state.cards.find(card=>card.id===state.selected[0]);
      const second=state.cards.find(card=>!card.matched&&card.id!==first.id&&card.pairId===first.pairId);
      state=resolvePair(selectCard(state,second.id));
    }
    while(state.phase!=='finished'){state=play(state,pair(state));invariant(state);}
    assert.equal(state.matchedPairs,pairs);assert.equal(state.scores[0]+state.scores[1],pairs);
    assert(allMoves.length>0);
  }
});
