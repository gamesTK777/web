import test from 'node:test';
import assert from 'node:assert/strict';
import {newGame,act,validateSave,SHIELDS,WEAPONS} from './engine.mjs';

const copy=value=>JSON.parse(JSON.stringify(value));
function perform(state,action){const result=act(state,action);assert.equal(result.ok,true,result.message);return result.state;}
function richTown(){const state=newGame(83);state.gold=50000;return state;}

test('weapon catalog preserves old equipment while adding five progressively stronger choices',()=>{
  for(const [id,price,attack]of [['starter',0,0],['copper',180,3],['moon',650,7],['solar',1600,12],['unarmed',0,0]]){
    const item=WEAPONS.find(weapon=>weapon.id===id);assert.equal(item.price,price);assert.equal(item.attack,attack);
  }
  assert.equal(WEAPONS[0].id,'starter');
  const additions=WEAPONS.filter(weapon=>['steel','gale','crystal','comet','dawn'].includes(weapon.id));
  assert.equal(additions.length,5);assert.equal(WEAPONS.find(weapon=>weapon.id==='dawn').attack,30);
  let state=richTown();
  for(const weapon of WEAPONS.filter(weapon=>weapon.price)){
    const before=copy(state);state=perform(state,{type:'buyWeapon',id:weapon.id});
    assert.equal(state.gold,before.gold-weapon.price);assert.equal(state.attack,5+weapon.attack);
    assert.equal(state.weaponId,weapon.id);assert.deepEqual(validateSave(copy(state)),state);
  }
  const before=copy(state);const duplicate=act(state,{type:'buyWeapon',id:'dawn'});
  assert.equal(duplicate.ok,false);assert.strictEqual(duplicate.state,state);assert.deepEqual(state,before);
  const poor=newGame(84),unaffordable=act(poor,{type:'buyWeapon',id:'dawn'});
  assert.equal(unaffordable.ok,false);assert.strictEqual(unaffordable.state,poor);
});

test('five shields charge their price and add protection to the level-based defense on purchase and reload',()=>{
  let state=richTown();state.level=9;state=validateSave(state);
  assert.equal(state.shieldId,'none');assert.equal(state.defense,2);
  assert.equal(SHIELDS.filter(shield=>shield.price).length,5);
  for(const shield of SHIELDS.filter(shield=>shield.price)){
    const before=copy(state);state=perform(state,{type:'buyShield',id:shield.id});
    assert.equal(state.gold,before.gold-shield.price);assert.equal(state.shieldId,shield.id);
    assert.equal(state.defense,2+shield.defense);assert.deepEqual(state.inventory,before.inventory);
    assert.deepEqual(validateSave(copy(state)),state);
  }
  assert.equal(state.defense,16);
});

test('shield shop rejects duplicate, weaker, forged, bulk and unaffordable purchases without mutation',()=>{
  const equipped=perform(richTown(),{type:'buyShield',id:'moon'}),before=copy(equipped);
  for(const action of [{type:'buyShield',id:'moon'},{type:'buyShield',id:'wood'},{type:'buyShield',id:'none'},{type:'buyShield',id:'__proto__'},{type:'buyShield',id:'constructor'},{type:'buyShield',id:null},{type:'buyShield',id:'aurora',qty:2}]){
    const result=act(equipped,action);assert.equal(result.ok,false);assert.strictEqual(result.state,equipped);assert.deepEqual(equipped,before);
  }
  const poor=newGame(85),result=act(poor,{type:'buyShield',id:'aurora'});
  assert.equal(result.ok,false);assert.strictEqual(result.state,poor);
  const dungeon=perform(richTown(),{type:'enter'}),blocked=act(dungeon,{type:'buyShield',id:'wood'});
  assert.equal(blocked.ok,false);assert.strictEqual(blocked.state,dungeon);
});

test('legacy saves load shieldless and malformed explicit shield values cannot create defense',()=>{
  for(const original of [richTown(),perform(richTown(),{type:'enter'})]){
    const legacy=copy(original);delete legacy.shieldId;
    assert.equal(validateSave(legacy).shieldId,'none');assert.equal(validateSave(legacy).defense,0);
    for(const value of [null,undefined,0,true,{},[],['wood'],'__proto__','constructor','unknown']){
      const malformed=copy(original);malformed.shieldId=value;assert.throws(()=>validateSave(malformed));
    }
  }
});

test('equipped shields reduce actual enemy damage by their defense bonus with the same combat roll',()=>{
  const enemy={id:'shield-combat',kind:'moss',name:'苔玉',hp:100,maxHp:100,attack:20,defense:0,xp:1};
  let reference=null;
  for(const shield of SHIELDS){
    let state=richTown();if(shield.price)state=perform(state,{type:'buyShield',id:shield.id});
    state=perform(state,{type:'enter'});state.enemies=[{...enemy,x:state.player.x+1,y:state.player.y}];
    const before=copy(state);state=perform(state,{type:'wait'});const damage=before.hp-state.hp;
    if(reference===null)reference=damage;
    assert.equal(damage,reference-shield.defense);assert.equal(state.mode,'dungeon');
  }
});

test('level increases preserve shield defense while recalculating base defense',()=>{
  let state=perform(richTown(),{type:'buyShield',id:'iron'});state.level=4;state.xp=51;state=validateSave(state);
  state=perform(state,{type:'enter'});state.enemies=[{id:'shield-level',kind:'moss',name:'苔玉',x:state.player.x+1,y:state.player.y,hp:1,maxHp:1,attack:1,defense:0,xp:1}];
  state=perform(state,{type:'move',dx:1,dy:0});
  assert.equal(state.level,5);assert.equal(state.defense,5);assert.equal(state.shieldId,'iron');
});

test('defeat removes new weapon and shield but preserves permanent bag and town assets',()=>{
  let state=richTown();state=perform(state,{type:'buyWeapon',id:'dawn'});state=perform(state,{type:'buyShield',id:'aurora'});
  state=perform(state,{type:'build',index:0,id:'cottage'});state=perform(state,{type:'buyStock',id:'loom',qty:10});state.bagTier=3;
  const assets=copy({gold:state.gold,stocks:state.stocks,plots:state.plots,bagTier:state.bagTier});
  state=perform(state,{type:'enter'});state.hp=1;state.enemies=[{id:'shield-defeat',kind:'golem',name:'鉱殻',x:state.player.x+1,y:state.player.y,hp:100,maxHp:100,attack:99,defense:1,xp:1}];
  const result=act(state,{type:'wait'});assert.equal(result.ok,true);assert.equal(result.event,'defeat');state=result.state;
  assert.equal(state.shieldId,'none');assert.equal(state.weaponId,'unarmed');assert.equal(state.defense,0);assert.equal(state.level,1);
  assert.deepEqual({gold:state.gold,stocks:state.stocks,plots:state.plots,bagTier:state.bagTier},assets);
  assert.deepEqual(state.inventory,[]);assert.deepEqual(validateSave(copy(state)),state);
});

test('safe return and save reload keep the strongest weapon and shield equipped',()=>{
  let state=richTown();state=perform(state,{type:'buyWeapon',id:'dawn'});state=perform(state,{type:'buyShield',id:'aurora'});
  state=perform(state,{type:'enter'});state=perform(state,{type:'return'});state=validateSave(JSON.stringify(state));
  assert.equal(state.weaponId,'dawn');assert.equal(state.shieldId,'aurora');assert.equal(state.attack,35);assert.equal(state.defense,14);
});
