import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];

function game(){
  let now=0,nextTimer=0;
  const timers=new Map(),nodes=new Map(),listeners=new Map();
  class Element {
    children=[];style={setProperty(){}};attributes={};textContent='';value='';
    classes=new Set();
    classList={add:(...names)=>names.forEach(n=>this.classes.add(n)),remove:(...names)=>names.forEach(n=>this.classes.delete(n)),contains:n=>this.classes.has(n),toggle:(n,force)=>{if(force===undefined? !this.classes.has(n):force)this.classes.add(n);else this.classes.delete(n);}};
    set id(value){this._id=value;nodes.set(value,this);}get id(){return this._id;}
    set innerHTML(value){this._html=value;this.children=[];}get innerHTML(){return this._html||'';}
    appendChild(node){this.children.push(node);return node;}
    setAttribute(name,value){this.attributes[name]=value;}
    addEventListener(name,fn){(this.events??={})[name]=fn;}
    querySelectorAll(){return [];}
    getBoundingClientRect(){return {left:0,top:0,width:94,height:132};}
  }
  const document={
    hidden:false,body:new Element(),documentElement:new Element(),
    createElement:()=>new Element(),
    getElementById:id=>nodes.get(id)||new Element(),
    querySelectorAll:()=>[],
    addEventListener:(name,fn)=>listeners.set(name,fn)
  };
  for(const id of ['sparkles','board','p1-score','p2-score','p1-panel','p2-panel','s-moves','s-time','s-pairs','s-total','overlay','praise-popup','praise-art','praise-text','praise-inner','p1-name','p2-name']){const el=new Element();el.id=id;}
  const context={document,window:{innerWidth:390,addEventListener(){}},Math,Date:{now:()=>now},
    setTimeout:(fn,ms)=>{const id=++nextTimer;timers.set(id,{fn,at:now+ms});return id;},
    clearTimeout:id=>timers.delete(id),setInterval:()=>++nextTimer,clearInterval:()=>{}};
  runInNewContext(script+'\nglobalThis.qa={cards:()=>cards,flipCard,newGame,state:()=>({flipped:[...flipped],matched,moves,canFlip,currentPlayer,scores:[...scores],pendingTurn})};',context);
  const advance=ms=>{now+=ms;for(const [id,timer] of [...timers])if(timer.at<=now){timers.delete(id);timer.fn();}};
  const el=id=>nodes.get(id);
  const pair=(same=false)=>{const cards=context.qa.cards(),a=0,b=cards.findIndex((c,i)=>i>0&&(same?c.id===cards[a].id:c.id!==cards[a].id));return [a,b];};
  return {qa:context.qa,advance,el,pair,document,advanceClock:ms=>{now+=ms;},emit:name=>listeners.get(name)?.()};
}

test('a wrong pair closes, changes turn and allows the next card',()=>{
  const g=game(),[a,b]=g.pair();g.qa.flipCard(a);g.qa.flipCard(b);
  assert.equal(g.qa.state().canFlip,false);assert.equal(g.el('s-moves').textContent,1);
  g.advance(1000);
  assert.equal(g.qa.state().flipped.length,0);assert.equal(g.qa.state().canFlip,true);
  assert.equal(g.qa.state().currentPlayer,1);
  assert.equal(g.el(`card-${a}`).classList.contains('flipped'),false);
  assert.equal(g.el(`card-${b}`).classList.contains('flipped'),false);
  g.qa.flipCard(a);assert.equal(g.qa.state().flipped[0],a);
});

test('a match scores for the current player and remains visible',()=>{
  const g=game(),[a,b]=g.pair(true);g.qa.flipCard(a);g.qa.flipCard(b);g.advance(1000);
  assert.equal(g.qa.state().matched,1);assert.equal(g.qa.state().scores[0],1);
  assert.equal(g.qa.state().currentPlayer,0);assert.equal(g.qa.state().canFlip,true);
  assert.equal(g.el(`card-${a}`).classList.contains('matched'),true);
  assert.equal(g.el(`card-${b}`).classList.contains('matched'),true);
});

test('reset cancels the previous pair resolution',()=>{
  const g=game(),[a,b]=g.pair();g.qa.flipCard(a);g.qa.flipCard(b);
  g.qa.newGame();g.advance(1000);
  assert.equal(g.qa.state().currentPlayer,0);assert.equal(g.qa.state().moves,0);
  assert.equal(g.qa.state().canFlip,true);
});

test('an overdue turn resumes after a mobile browser delayed its timer',()=>{
  const g=game(),[a,b]=g.pair();g.qa.flipCard(a);g.qa.flipCard(b);
  g.advanceClock(1100);g.qa.flipCard(a);
  assert.equal(g.qa.state().currentPlayer,1);assert.equal(g.qa.state().canFlip,true);
  assert.equal(g.qa.state().flipped[0],a);
});

test('returning to the page resolves an overdue pair',()=>{
  const g=game(),[a,b]=g.pair();g.qa.flipCard(a);g.qa.flipCard(b);
  g.advanceClock(1100);g.emit('visibilitychange');
  assert.equal(g.qa.state().currentPlayer,1);assert.equal(g.qa.state().canFlip,true);
});

