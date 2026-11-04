import test from 'node:test';
import assert from 'node:assert/strict';
import {MemorySession} from './controller.mjs';

function seeded(seed=1){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/0x100000000;};}
function match(state){const a=state.cards.find(card=>!card.matched);return [a.id,state.cards.find(card=>!card.matched&&card.id!==a.id&&card.pairId===a.pairId).id];}
function miss(state){const a=state.cards.find(card=>!card.matched);return [a.id,state.cards.find(card=>!card.matched&&card.pairId!==a.pairId).id];}
function fixture(callbacks={}){
  let time=0,id=0;
  const timers=new Map(),allTimers=new Map(),events=[];
  const session=new MemorySession({
    now:()=>time,
    schedule:(fn,delay)=>{const handle=++id;timers.set(handle,{fn,at:time+delay});allTimers.set(handle,fn);return handle;},
    cancel:handle=>timers.delete(handle),
    onChange:state=>{events.push({type:'change',state});callbacks.onChange?.(state,session);},
    onResult:(result,state)=>{events.push({type:'result',result,state});callbacks.onResult?.(result,state,session);},
    onFinish:state=>{events.push({type:'finish',state});callbacks.onFinish?.(state,session);},
  });
  session.start({rng:seeded()});
  const advance=ms=>{
    time+=ms;
    let due;
    while((due=[...timers].find(([,timer])=>timer.at<=time))){timers.delete(due[0]);due[1].fn();}
  };
  return {session,events,timers,allTimers,advance,clock:ms=>{time+=ms;},early:handle=>{const timer=timers.get(handle);timers.delete(handle);timer.fn();}};
}
function choose(session,ids){assert.equal(session.select(ids[0]),true);assert.equal(session.select(ids[1]),true);}

test('a matching pair unlocks before effects and another card can open inside the effect callback',()=>{
  let selectedDuringEffect=false;
  const f=fixture({onResult:(result,state,session)=>{
    assert.equal(result.type,'match');assert.equal(state.phase,'ready');assert.deepEqual(state.selected,[]);
    selectedDuringEffect=session.select(match(state)[0]);
  }});
  choose(f.session,match(f.session.state));
  f.advance(449);assert.equal(f.session.state.phase,'resolving');
  f.advance(1);
  assert.equal(selectedDuringEffect,true);assert.equal(f.session.state.phase,'one');
  assert.equal(f.session.state.scores[0],1);
  const resultIndex=f.events.findIndex(event=>event.type==='result');
  assert.equal(f.events[resultIndex-1].type,'change');assert.equal(f.events[resultIndex-1].state.phase,'ready');
});

test('mismatches wait 850 milliseconds, close, switch player, and permit the next card',()=>{
  const f=fixture(),ids=miss(f.session.state);choose(f.session,ids);
  f.advance(849);assert.equal(f.session.state.phase,'resolving');
  f.advance(1);assert.equal(f.session.state.phase,'ready');assert.equal(f.session.state.currentPlayer,1);
  assert.deepEqual(f.session.state.selected,[]);assert.equal(f.session.state.lastResult.type,'miss');
  assert.equal(f.session.select(ids[0]),true);assert.equal(f.session.state.phase,'one');
});

test('an overdue suspended timer resolves on the next selection without requiring the timer to fire',()=>{
  const f=fixture(),ids=miss(f.session.state);choose(f.session,ids);
  f.clock(5000);
  assert.equal(f.session.select(ids[0]),true);
  assert.equal(f.session.state.currentPlayer,1);assert.equal(f.session.state.phase,'one');assert.deepEqual(f.session.state.selected,[ids[0]]);
  assert.equal(f.timers.size,0);
});

test('visibility or resume can flush an overdue pair exactly once',()=>{
  const f=fixture();choose(f.session,match(f.session.state));f.clock(1000);
  assert.equal(f.session.flushDue(),true);assert.equal(f.session.flushDue(),false);
  assert.equal(f.session.state.matchedPairs,1);assert.equal(f.events.filter(e=>e.type==='result').length,1);
  assert.equal(f.timers.size,0);
});

test('reset cancels pending work and an already queued stale callback cannot affect the new deck',()=>{
  const f=fixture();choose(f.session,match(f.session.state));
  const oldTimer=[...f.allTimers.values()][0],oldGeneration=f.session.generation;
  f.session.start({pairs:18,rng:seeded(2)});const state=f.session.state;
  f.clock(10000);oldTimer();
  assert.equal(f.session.state,state);assert.equal(f.session.state.moves,0);assert.equal(f.session.state.phase,'ready');
  assert.equal(f.session.generation,oldGeneration+1);assert.equal(f.events.filter(e=>e.type==='result').length,0);
});

test('throwing render and result callbacks do not hold the selection lock',()=>{
  const original=console.error,reports=[];console.error=(...args)=>reports.push(args);
  try{
    const f=fixture({onChange:()=>{throw new Error('render');},onResult:()=>{throw new Error('effect');}});
    choose(f.session,match(f.session.state));f.advance(450);
    assert.equal(f.session.state.phase,'ready');assert.equal(f.session.state.matchedPairs,1);
    assert.equal(f.session.select(match(f.session.state)[0]),true);assert.equal(f.session.state.phase,'one');
    assert(reports.length>=4);
  }finally{console.error=original;}
});

test('elapsed time starts with the first accepted card and stays fixed after finishing',()=>{
  const f=fixture();f.clock(1000);assert.equal(f.session.elapsedMs(),0);
  assert.equal(f.session.select('missing'),false);assert.equal(f.session.elapsedMs(),0);
  for(let i=0;i<6;i++){choose(f.session,match(f.session.state));f.advance(450);}
  assert.equal(f.session.state.phase,'finished');assert.equal(f.session.elapsedMs(),2700);
  f.advance(20000);assert.equal(f.session.elapsedMs(),2700);
  assert.equal(f.session.select(f.session.state.cards[0].id),false);
  assert.equal(f.events.filter(e=>e.type==='finish').length,1);
  f.session.flushDue();assert.equal(f.events.filter(e=>e.type==='finish').length,1);
  f.session.start({rng:seeded(3)});assert.equal(f.session.elapsedMs(),0);
});

test('throwing finish notification is contained and still runs only once',()=>{
  const original=console.error;console.error=()=>{};
  let finishes=0;
  try{
    const f=fixture({onFinish:()=>{finishes++;throw new Error('finish effect');}});
    for(let i=0;i<6;i++){choose(f.session,match(f.session.state));f.advance(450);}
    f.advance(5000);f.session.flushDue();assert.equal(finishes,1);assert.equal(f.session.state.phase,'finished');
  }finally{console.error=original;}
});

test('dispose cancels work, freezes elapsed, ignores old callbacks and can be restarted',()=>{
  const f=fixture();choose(f.session,match(f.session.state));f.clock(200);
  const stale=[...f.allTimers.values()][0],state=f.session.state;
  f.session.dispose();f.clock(2000);stale();
  assert.equal(f.session.state,state);assert.equal(f.session.select(match(state)[0]),false);
  assert.equal(f.session.elapsedMs(),200);assert.equal(f.timers.size,0);
  f.session.start({rng:seeded(4)});assert.equal(f.session.select(match(f.session.state)[0]),true);
});

test('a timer firing early is rescheduled for the remaining delay',()=>{
  const f=fixture();choose(f.session,match(f.session.state));const timer=[...f.timers.keys()][0];
  f.clock(200);f.early(timer);assert.equal(f.session.state.phase,'resolving');assert.equal(f.timers.size,1);
  f.advance(249);assert.equal(f.session.state.phase,'resolving');
  f.advance(1);assert.equal(f.session.state.phase,'ready');assert.equal(f.session.state.matchedPairs,1);
});

test('duplicate and third selections are ignored without scheduling multiple resolutions',()=>{
  const f=fixture(),ids=match(f.session.state);
  assert.equal(f.session.select(ids[0]),true);assert.equal(f.session.select(ids[0]),false);
  assert.equal(f.timers.size,0);assert.equal(f.session.select(ids[1]),true);
  const other=f.session.state.cards.find(card=>!ids.includes(card.id));
  assert.equal(f.session.select(other.id),false);assert.equal(f.timers.size,1);
  f.advance(450);assert.equal(f.session.state.moves,1);assert.equal(f.session.state.matchedPairs,1);
});

test('a reset during the unlock notification does not emit an old effect into the new game',()=>{
  let reset=false;
  const f=fixture({onChange:(state,session)=>{
    if(state.lastResult&&!reset){reset=true;session.start({pairs:10,rng:seeded(8)});}
  }});
  choose(f.session,match(f.session.state));f.advance(450);
  assert.equal(f.session.state.pairs,10);assert.equal(f.session.state.moves,0);
  assert.equal(f.events.filter(e=>e.type==='result').length,0);
});
