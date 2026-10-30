import test from 'node:test';
import assert from 'node:assert/strict';
import {Game} from './engine.mjs';
const make=(opts={})=>new Game({random:()=>.42,...opts});
const clearSetup=(g,n=4)=>{
  g.board=Array.from({length:20},()=>Array(10).fill(null));
  for(let y=20-n;y<20;y++)g.board[y]=Array.from({length:10},(_,x)=>x===4?null:'J');
  g.piece={t:'I',r:1,x:2,y:0};
};

test('seven-bag contains each shape exactly once and maintains five previews',()=>{
  const g=make(); const first=[g.piece.t];
  for(let i=0;i<6;i++){g.spawn();first.push(g.piece.t);assert.ok(g.queue.length>=5);}
  assert.equal(new Set(first).size,7);
});
test('hold can only be used once between locks, including an empty hold',()=>{
  const g=make(),first=g.piece.t;assert.equal(g.holdPiece(),true);
  const second=g.piece.t;assert.equal(g.hold,first);assert.equal(g.holdPiece(),false);assert.equal(g.piece.t,second);
  g.hardDrop();assert.equal(g.holdPiece(),true);assert.equal(g.piece.t,first);
});
test('hard drop locks at ghost, scores distance, and spawns a valid next piece',()=>{
  const g=make(),distance=g.ghost().y-g.piece.y;g.hardDrop();
  assert.equal(g.board.flat().filter(Boolean).length,4);assert.equal(g.score,distance*2);assert.ok(g.valid(g.piece));
});
test('four-line clear, combo, back-to-back, energy cap, and level advance',()=>{
  const events=[],g=make({onEvent:e=>events.push(e)});
  for(let i=0;i<3;i++){clearSetup(g);g.hardDrop();}
  assert.equal(g.lines,12);assert.equal(g.level,2);assert.equal(g.energy,200);assert.equal(g.combo,2);
  assert.equal(g.board.flat().filter(Boolean).length,0);
  assert.equal(events.filter(e=>e.type==='clear')[1].b2b,true);
  assert.equal(events.filter(e=>e.type==='clear')[2].points,1300);
});
test('nonadjacent full rows clear without shifting the wrong row',()=>{
  const g=make();g.board[19]=Array(10).fill('J');g.board[17]=Array(10).fill('L');g.board[18][0]='S';
  g.piece={t:'O',r:0,x:3,y:8};g.lock();assert.equal(g.lines,2);assert.equal(g.board[19][0],'S');
});
test('SRS rotates near the wall and floor, and invalid moves stay inside bounds',()=>{
  const g=make();g.piece={t:'T',r:1,x:-1,y:5};assert.ok(g.valid(g.piece));assert.equal(g.rotate(-1),true);assert.ok(g.valid(g.piece));
  g.piece={t:'I',r:0,x:3,y:18};assert.equal(g.rotate(),true);assert.ok(g.valid(g.piece));
  for(let i=0;i<20;i++)g.move(-1);assert.ok(g.cells().every(c=>c.x>=0));
});
test('grounded piece locks after delay; resets are capped',()=>{
  const g=make();g.piece=g.ghost();g.update(499);assert.equal(g.board.flat().filter(Boolean).length,0);
  g.move(1);assert.equal(g.lockTime,0);g.update(499);g.lockResets=15;g.move(-1);g.update(1);
  assert.equal(g.board.flat().filter(Boolean).length,4);
});
test('pulse removes lowest occupied band, preserves upper rows, and gives no clear credit',()=>{
  const g=make();g.energy=100;g.board[19][0]='J';g.board[18][1]='L';g.board[17][2]='S';g.board[16][3]='T';
  assert.equal(g.useSkill('pulse'),true);assert.equal(g.energy,40);assert.equal(g.lines,0);assert.equal(g.score,0);
  assert.equal(g.board[19][3],'T');assert.equal(g.board.flat().filter(Boolean).length,1);assert.ok(g.valid(g.piece));
  assert.equal(g.board.length,20);
});
test('unavailable skill never spends energy',()=>{
  const g=make();g.energy=100;assert.equal(g.useSkill('pulse'),false);assert.equal(g.energy,100);
  g.piece={t:'I',r:0,x:3,y:0};assert.equal(g.useSkill('prism'),false);assert.equal(g.energy,100);
  g.energy=34;assert.equal(g.useSkill('prism'),false);assert.equal(g.useSkill('unknown'),false);
});
const settle=g=>{let steps=0;while(g.cascade&&steps++<200)g.update(100);assert.equal(g.cascade,null);};
test('avalanche costs exactly 200, fills every hole, and freezes active piece inputs',()=>{
  const g=make();g.board[10][0]='J';g.board[14][0]='L';g.board[8][2]='S';
  g.energy=199;assert.equal(g.useSkill('avalanche'),false);assert.equal(g.energy,199);
  g.energy=200;assert.equal(g.useSkill('avalanche'),true);assert.equal(g.energy,0);
  const piece={...g.piece};g.move(1);g.rotate();g.hardDrop();g.holdPiece();g.softDrop();g.lock();assert.deepEqual(g.piece,piece);
  g.state='paused';const board=JSON.stringify(g.board);g.update(1000);assert.equal(JSON.stringify(g.board),board);g.state='playing';
  settle(g);assert.equal(g.board[19][0],'L');assert.equal(g.board[18][0],'J');assert.equal(g.board[19][2],'S');assert.equal(g.board.flat().filter(Boolean).length,3);assert.ok(g.valid(g.piece));
  assert.equal(g.useSkill('freeze'),false);
});
test('avalanche triggers successive clears with increasing chain points',()=>{
  const events=[],g=make({onEvent:e=>events.push(e)});g.energy=200;
  for(let x=0;x<10;x++){g.board[x%2?18:19][x]='J';g.board[x%2?10:14][x]='L';}
  assert.equal(g.useSkill('avalanche'),true);settle(g);
  const clears=events.filter(e=>e.type==='cascadeClear');assert.deepEqual(clears.map(e=>e.chain),[1,2]);assert.deepEqual(clears.map(e=>e.points),[150,300]);assert.equal(g.score,450);assert.equal(g.lines,2);assert.equal(g.energy,36);assert.equal(g.board.flat().filter(Boolean).length,0);
});
test('avalanche restores a valid active piece after blocks fall into its position',()=>{
  const g=make();g.piece={t:'O',r:0,x:3,y:17};g.board[10][4]='J';g.energy=200;
  g.useSkill('avalanche');settle(g);assert.ok(g.valid(g.piece));assert.equal(g.piece.y,0);
});
test('prism replaces current type, resolves floor collision, and costs 35',()=>{
  const g=make();g.piece={t:'T',r:2,x:3,y:17};g.energy=80;assert.equal(g.useSkill('prism'),true);
  assert.equal(g.piece.t,'I');assert.equal(g.energy,45);assert.ok(g.valid(g.piece));
});
test('sprint disables skills, stays at constant speed, and finishes at 40 lines',()=>{
  const g=make({mode:'sprint'});g.energy=100;assert.equal(g.useSkill('avalanche'),false);g.lines=36;clearSetup(g);g.hardDrop();
  assert.equal(g.state,'won');assert.equal(g.lines,40);assert.equal(g.level,1);assert.equal(g.interval,800);
});
test('spawn collision and locking above ceiling end the game',()=>{
  const g=make();g.board[0]=Array(10).fill('O');g.spawn('I');assert.equal(g.state,'over');
  const h=make();h.piece={t:'I',r:1,x:2,y:-2};h.lock();assert.equal(h.state,'over');
});
test('paused and finished games ignore game actions and timer updates',()=>{
  for(const state of ['paused','over','won']){const g=make();g.state=state;const before=JSON.stringify(g);
    g.move(1);g.rotate();g.softDrop();g.hardDrop();g.holdPiece();g.useSkill('prism');g.update(1000);assert.equal(JSON.stringify(g),before);}
});
test('seeded mixed-input runs keep board dimensions, valid active pieces and energy bounds',()=>{
  let seed=219;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let run=0;run<30;run++){
    const g=new Game({random});
    for(let i=0;i<700&&g.state==='playing';i++){
      const n=Math.floor(random()*10);
      if(n<2)g.move(n===0?-1:1);else if(n<4)g.rotate(n===2?1:-1);else if(n===4)g.holdPiece();else if(n===5)g.hardDrop();else if(n===6)g.softDrop();else g.useSkill(['pulse','avalanche','prism'][n-7]);
      g.update(30);assert.equal(g.board.length,20);assert.ok(g.board.every(row=>row.length===10));assert.ok(g.energy>=0&&g.energy<=200);
      if(g.state==='playing'&&!g.cascade)assert.ok(g.valid(g.piece));
    }
  }
});
