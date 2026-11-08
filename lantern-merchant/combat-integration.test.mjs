import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,validateSave} from './engine.mjs';
import {drawScene} from './renderer.mjs';
import {preloadCharacters} from './anime-characters.mjs?v=20261108-defeat';
import {ATTACK_DURATION} from './combat-art.mjs?v=20261108-defeat';

function canvas(width=640,height=480){
  const surface={clientWidth:width,clientHeight:height,width,height,paints:[]},stack=[];
  const state={globalAlpha:1,globalCompositeOperation:'source-over',filter:'none',imageSmoothingEnabled:false,imageSmoothingQuality:'low'};
  const c=new Proxy({canvas:surface,...state},{get(target,key){
    if(key in target)return target[key];
    if(key==='save')return()=>stack.push(Object.fromEntries(Object.keys(state).map(k=>[k,target[k]])));
    if(key==='restore')return()=>Object.assign(target,stack.pop());
    if(key==='createLinearGradient'||key==='createRadialGradient')return()=>({addColorStop(){}});
    if(key==='measureText')return text=>({width:String(text).length*7});
    return(...args)=>{for(const v of args)if(typeof v==='number')assert.ok(Number.isFinite(v),String(key));surface.paints.push({method:key,color:target.fillStyle,strokeColor:target.strokeStyle,alpha:target.globalAlpha,filter:target.filter,args});};
  },set(target,key,value){target[key]=value;return true;}});
  surface.getContext=()=>c;return surface;
}
globalThis.OffscreenCanvas=class{constructor(width,height){Object.assign(this,canvas(width,height));}};
function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);Object.values(value).forEach(freeze);}return value;}
function killedEnemy(){
  let state=act(newGame(73),{type:'enter'}).state;
  const enemy={id:'combat-fixture',kind:'moss',name:'苔玉',x:state.player.x+1,y:state.player.y,hp:1,maxHp:8,attack:2,defense:0,xp:8};
  state.enemies=[enemy];state.loot=[];state=validateSave(state);
  const result=act(state,{type:'move',dx:1,dy:0});assert.equal(result.ok,true);assert.equal(result.event,'attack');assert.equal(result.state.enemies.length,0);
  return{state:result.state,effect:{kind:'enemy-hit',enemy:{...enemy},x:enemy.x,y:enemy.y,facing:'right',killed:true,startedAt:1000,duration:ATTACK_DURATION}};
}
function renderFixture(state,effect,progress){const cv=canvas();drawScene(cv,freeze(state),{time:effect.startedAt+effect.duration*progress,zoom:3,effects:[freeze(effect)]});return cv;}

test('a real engine kill preserves a finite fallback impact silhouette only until its fade completes and only in visible terrain',()=>{
  const {state,effect}=killedEnemy(),before=JSON.stringify(state);
  const early=renderFixture(state,effect,.1),impact=renderFixture(state,effect,.5),late=renderFixture(state,effect,1.1);
  assert.ok(early.paints.some(p=>p.color==='#a0b777'),'the removed enemy remains briefly available for the blade contact');
  assert.ok(impact.paints.some(p=>p.color==='#a0b777'&&p.alpha>0&&p.alpha<1),'fallback silhouettes share the finite contact and fade');
  assert.ok(!late.paints.some(p=>p.color==='#a0b777'),'the temporary silhouette is not a persistent extra enemy');
  const hidden=JSON.parse(before);hidden.map.visible[effect.y][effect.x]=false;
  assert.ok(!renderFixture(hidden,effect,.5).paints.some(p=>p.color==='#a0b777'),'the effect cannot reveal an unseen enemy');
  assert.equal(JSON.stringify(state),before);
});

test('loaded illustrations use the same transient kill lifecycle and restore alpha and flash filters',async()=>{
  globalThis.Image=class{constructor(){this.naturalWidth=512;this.naturalHeight=512;}set src(value){this.url=value;queueMicrotask(()=>this.onload());}async decode(){}};
  await preloadCharacters();
  const {state,effect}=killedEnemy(),before=JSON.stringify(state),impact=renderFixture(state,effect,.5);
  const enemyDraw=impact.paints.find(p=>p.method==='drawImage'&&p.args[0]?.url?.endsWith('/moss.webp'));
  assert.ok(enemyDraw);assert.ok(enemyDraw.alpha>0&&enemyDraw.alpha<1);assert.match(enemyDraw.filter,/brightness/);
  const late=renderFixture(state,effect,1.1);assert.ok(!late.paints.some(p=>p.method==='drawImage'&&p.args[0]?.url?.endsWith('/moss.webp')));
  assert.equal(impact.getContext().globalAlpha,1);assert.equal(impact.getContext().filter,'none');assert.equal(JSON.stringify(state),before);
});

test('a saved unarmed explorer renders a fist contact while equipped explorers retain their blade effect',()=>{
  const base=killedEnemy().state,at={...base.player};base.map.visible[at.y][at.x]=true;
  const effect=Object.freeze({kind:'attack',...at,facing:'right',damage:5,startedAt:1000,duration:ATTACK_DURATION});
  for(const weaponId of ['starter','solar','unarmed']){
    const state=validateSave({...base,weaponId}),before=JSON.stringify(state),cv=renderFixture(state,effect,.5);
    assert.equal(JSON.stringify(state),before);
    // Probe geometry itself: a sword uses a long quadratic cut, while a fist
    // uses only circular contact and short radial marks.
    assert.equal(cv.paints.some(p=>p.method==='stroke'&&p.strokeColor==='#50bdb8'),weaponId!=='unarmed');
    assert.ok(cv.paints.some(p=>p.method==='fillText'&&p.args[0]==='−5'));
    assert.equal(cv.getContext().globalAlpha,1);assert.equal(cv.getContext().filter,'none');
  }
});
