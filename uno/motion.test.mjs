import test from 'node:test';
import assert from 'node:assert/strict';
import {UnoMotion} from './motion.mjs';

class Events {
  constructor(){this.listeners=new Map();}
  addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(fn);}
  removeEventListener(type,fn){this.listeners.get(type)?.delete(fn);}
  dispatch(type){for(const fn of this.listeners.get(type)||[])fn();}
}
class Element extends Events {
  constructor(tag='div',{rect={x:0,y:0,width:70,height:104},animated=true}={}){super();this.tagName=tag.toUpperCase();this.rect=rect;this.children=[];this.style={};this.attributes={};this.className='';this.textContent='';this.isConnected=true;this.disabled=false;this.animations=[];if(!animated)this.animate=undefined;}
  setAttribute(name,value){this.attributes[name]=String(value);}
  append(node){node.parentElement=this;node.isConnected=true;this.children.push(node);}
  remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(node=>node!==this);this.parentElement=null;this.isConnected=false;}
  getBoundingClientRect(){return this.rect;}
  querySelector(selector){return this.children.find(node=>node.className.split(' ').includes(selector.slice(1)))||null;}
  closest(selector){return selector==='.hand'?this.hand||null:null;}
  animate(frames,options){const animation={frames,options,canceled:false,cancel(){this.canceled=true;this.oncancel?.();},finish(){this.onfinish?.();}};this.animations.push(animation);return animation;}
}
function fixture({reduced=false,animated=true}={}){
  const document=new Events(),window=new Events(),media=new Events(),timers=new Map();let timerId=0;
  document.hidden=false;document.body=new Element('body');document.documentElement={clientWidth:390,clientHeight:844};
  document.created=[];document.createElement=tag=>{const node=new Element(tag,{animated});document.created.push(node);return node;};
  const deck=new Element('button',{rect:{x:110,y:210,width:70,height:130}}),back=new Element('span',{rect:{x:110,y:210,width:70,height:104}});back.className='deck-back';deck.append(back);
  const discard=new Element('div',{rect:{x:205,y:210,width:70,height:104}}),face=new Element('div',{rect:{x:205,y:210,width:70,height:104}});face.className='playing-card red';discard.append(face);
  document.getElementById=id=>id==='drawPile'?deck:id==='discardCard'?discard:null;
  window.innerWidth=390;window.innerHeight=844;media.matches=reduced;window.matchMedia=()=>media;
  const motion=new UnoMotion({document,window,setTimer(fn,delay){assert.equal(this,undefined);const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimer(id){assert.equal(this,undefined);timers.delete(id);}});
  const card=(x=30)=>{const node=new Element('button',{rect:{x,y:615,width:62,height:92}});node.className='playing-card red';node.textContent='PRIVATE CARD';return node;};
  const ghosts=()=>document.created.filter(node=>node.className.includes('uno-flying-card')&&node.parentElement);
  return {motion,document,window,media,timers,deck,discard,face,card,ghosts};
}

test('seven dealt backs travel from the deck into the hand while actual card inputs remain untouched',()=>{
  const f=fixture(),cards=Array.from({length:7},(_,i)=>f.card(8+i*68));
  const duration=f.motion.receive({targets:cards,initial:true});
  assert.equal(f.ghosts().length,7);assert.ok(duration>400&&duration<800);
  for(const [i,ghost]of f.ghosts().entries()){
    assert.equal(ghost.attributes['aria-hidden'],'true');assert.ok(ghost.className.includes('uno-flight-back'));
    assert.equal(ghost.children[0].textContent,'UNO');assert.equal(ghost.children.some(node=>node.textContent.includes('PRIVATE')),false);
    assert.equal(ghost.animations[0].options.delay,i*32);
    assert.ok(ghost.animations[0].frames[0].transform.includes('translate3d('));
    assert.ok(ghost.animations[0].frames.at(-1).transform.includes('rotateY(88deg)'));
    assert.equal(cards[i].disabled,false);assert.deepEqual(cards[i].style,{});assert.equal(cards[i].textContent,'PRIVATE CARD');
  }
  f.motion.stop();assert.equal(f.document.body.children.length,0);assert.equal(f.timers.size,0);
});

test('opponent receives always show only the card back and bursts have at most twelve bounded flights',()=>{
  const f=fixture(),roster=new Element('div',{rect:{x:12,y:70,width:150,height:50}});
  roster.textContent='OPPONENT HAND MUST STAY PRIVATE';
  const duration=f.motion.receive({targets:Array(50).fill(roster),initial:true});
  assert.equal(f.ghosts().length,12);assert.ok(duration<=800);
  f.motion.receive({targets:[roster]});assert.equal(f.ghosts().length,12,'new flights replace old decoration instead of accumulating');
  for(const ghost of f.ghosts())assert.equal(ghost.children[0].textContent,'UNO');
  f.motion.dispose();
});

test('offscreen hand cards arrive at the visible hand edge and never widen the document',()=>{
  const f=fixture(),target=f.card(1800),hand=new Element('div',{rect:{x:12,y:600,width:350,height:120}});target.hand=hand;
  f.motion.receive({targets:[target]});
  const ghost=f.ghosts()[0],end=ghost.animations[0].frames.at(-1).transform;
  const [,x,y]=end.match(/translate3d\(([-.\d]+)px, ([-.\d]+)px/);
  assert.ok(Number(x)>=12);assert.ok(Number(x)+62<=362);assert.ok(Number(y)>=600);assert.ok(Number(y)+92<=720);
  assert.equal(f.motion.layer.className,'uno-motion-layer');
  f.motion.dispose();
});

test('a public discard can fly face up, and invalid or private card data cannot become markup',()=>{
  const f=fixture();f.motion.play({from:{x:40,y:615,width:62,height:92},card:{color:'blue',value:'7',id:'secret-id'}});
  let ghost=f.ghosts()[0];assert.ok(ghost.className.includes('playing-card blue'));assert.deepEqual(ghost.children.map(node=>node.textContent),['7','7','7']);assert.equal(JSON.stringify(ghost.attributes).includes('secret-id'),false);
  f.motion.play({from:f.deck,card:{color:'<script>',value:'<img onerror=x>'}});
  ghost=f.ghosts().at(-1);assert.ok(ghost.className.includes('uno-flight-back'));assert.equal(ghost.children[0].textContent,'UNO');
  f.motion.dispose();
});

test('reduced motion uses a stationary highlight and never creates a traveling overlay',()=>{
  const f=fixture({reduced:true}),target=f.card();
  assert.equal(f.motion.receive({targets:[target]}),180);assert.equal(f.ghosts().length,0);assert.equal(f.document.body.children.length,0);
  assert.equal(target.animations.length,1);assert.equal(target.animations[0].frames.some(frame=>'transform'in frame),false);
  f.motion.play({from:f.deck});assert.equal(f.ghosts().length,0);assert.equal(f.face.animations.length,1);
  f.motion.dispose();
});

test('completion, fallback cleanup and stop remove only decorative nodes, including after cancellation',()=>{
  const f=fixture(),target=f.card();f.motion.receive({targets:[target]});
  const ghost=f.ghosts()[0],animation=ghost.animations[0];animation.finish();
  assert.equal(f.ghosts().length,0);assert.equal(target.isConnected,true);
  for(const {fn}of [...f.timers.values()])fn();assert.equal(f.motion.records.size,0);
  f.motion.receive({targets:[target]});const stale=f.ghosts()[0].animations[0];f.motion.stop();stale.finish();
  assert.equal(f.document.body.children.length,0);assert.equal(f.timers.size,0);assert.equal(f.motion.records.size,0);
});

test('visibility, resize, page exit and preference changes cancel ongoing flights and disposal removes listeners',()=>{
  const f=fixture(),target=f.card();
  for(const [events,event,change]of [[f.document,'visibilitychange',()=>{f.document.hidden=true;}],[f.window,'resize',()=>{}],[f.window,'pagehide',()=>{}],[f.media,'change',()=>{f.media.matches=true;}]]){
    f.document.hidden=false;f.media.matches=false;f.motion.receive({targets:[target]});assert.equal(f.ghosts().length,1);change();events.dispatch(event);assert.equal(f.ghosts().length,0);
  }
  f.motion.dispose();f.document.hidden=false;f.media.matches=false;assert.equal(f.motion.receive({targets:[target]}),0);
  assert.equal([...f.window.listeners.values()].reduce((n,set)=>n+set.size,0),0);
});

test('missing animation APIs, hidden screens and invalid rectangles never block gameplay or leak overlays',()=>{
  const f=fixture({animated:false}),target=f.card();assert.equal(f.motion.receive({targets:[target]}),0);assert.equal(f.document.body.children.length,0);
  assert.equal(f.motion.play({from:{x:NaN,y:0,width:50,height:50}}),0);
  f.document.hidden=true;assert.equal(f.motion.receive({targets:[target]}),0);
  f.motion.dispose();
  const absent=new UnoMotion({document:null,window:null});assert.equal(absent.receive(),0);assert.equal(absent.play(),0);absent.dispose();
});
