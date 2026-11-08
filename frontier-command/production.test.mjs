import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,tileAt,unitAt,getReachable,applyAction,UNIT_TYPES,MAX_UNITS_PER_TEAM} from './engine.mjs';
import {getPlayerProduction,createProductionController} from './production.mjs';

const troop=(id,type,team,x,y)=>({id,type,team,x,y,hp:10,moved:false,acted:false});
function sandbox(){
  const state=createGame({missionId:5});
  state.tiles.forEach(tile=>Object.assign(tile,{terrain:'plain',building:null,owner:null,capture:20,capturingTeam:null,capturingUnitId:null}));
  state.units=[troop('u1','infantry',0,1,1),troop('u2','infantry',1,16,11)];
  state.idSeq=100;state.funds=[50000,700];return state;
}
function facility(state,x,y,building,owner=0){Object.assign(tileAt(state,x,y),{building,owner});return `${x},${y}`;}
function freezeTree(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);Object.values(value).forEach(freezeTree);}return value;}

// A small DOM for controller events and content, not a browser or a Canvas stub.
class FakeElement {
  constructor(tag,owner){this.tagName=tag.toUpperCase();this.ownerDocument=owner;this.children=[];this.dataset={};this.attributes=new Map();this.listeners=new Map();this.disabled=false;this.open=false;this.value='';this._text='';}
  set textContent(value){this._text=String(value);this.children=[];}
  get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this._text='';this.children=[...nodes];}
  setAttribute(name,value){this.attributes.set(name,String(value));}
  getAttribute(name){return this.attributes.get(name)??null;}
  addEventListener(type,listener){const listeners=this.listeners.get(type)||[];listeners.push(listener);this.listeners.set(type,listeners);}
  emit(type){for(const listener of this.listeners.get(type)||[])listener({type,target:this,currentTarget:this});}
  click(){if(!this.disabled)this.emit('click');}
  focus(){this.ownerDocument.activeElement=this;}
  showModal(){this.open=true;}
  close(){if(!this.open)return;this.open=false;this.emit('close');}
}
function fakeDocument(){
  const nodes=new Map(),document={activeElement:null,getElementById:id=>nodes.get(id)||null,createElement:tag=>new FakeElement(tag,document)};
  for(const id of ['productionDialog','productionFunds','productionSiteSelect','productionSiteStatus','productionUnitList','productionPreview','productionMessage','confirmProductionButton','locateProductionButton','closeProductionButton'])nodes.set(id,document.createElement(id==='productionDialog'?'dialog':id==='productionSiteSelect'?'select':id.endsWith('Button')?'button':'div'));
  return document;
}
function card(document,name){const element=document.getElementById('productionUnitList').children.find(node=>node.textContent.includes(name));assert.ok(element,`catalogue contains ${name}`);return element;}
function rig(initial,{enabled=true,onProduce,onLocate,onOpen,onClose}={}){
  let state=initial;const document=fakeDocument(),actions=[],located=[],opened=[],closed=[];
  const controller=createProductionController({document,getState:()=>state,isEnabled:()=>enabled,onProduce:action=>{actions.push(action);if(onProduce)return onProduce(action,{get state(){return state;},set state(value){state=value;},controller});const result=applyAction(state,action);if(result.ok)state=result.state;return result.ok;},onLocate:site=>{located.push(site);onLocate?.(site);},onOpen:()=>{opened.push(true);onOpen?.();},onClose:()=>{closed.push(true);onClose?.();},drawIcon:()=>{}});
  return {document,controller,actions,located,opened,closed,get state(){return state;},set state(value){state=value;}};
}

test('stage one exposes the owned headquarters with exact affordable mission prices and no state mutation',()=>{
  const state=createGame({missionId:1}),before=JSON.stringify(state);freezeTree(state);
  const model=getPlayerProduction(state,'1,5','recon');
  assert.equal(model.sites.length,1);assert.equal(model.site.building,'hq');assert.equal(model.site.key,'1,5');
  assert.deepEqual(model.options.map(option=>option.type),['infantry','recon']);
  assert.deepEqual(model.options.map(option=>option.cost),[1000,3000]);
  assert.equal(model.funds,3000);assert.equal(model.option.type,'recon');assert.equal(model.canPurchase,true);assert.equal(model.afterFunds,0);
  assert.equal(model.count,3);assert.equal(model.limit,MAX_UNITS_PER_TEAM);assert.equal(JSON.stringify(state),before);
});

test('catalogues distinguish ground and air sites and exclude enemy, neutral and non-production buildings',()=>{
  const state=sandbox();facility(state,2,2,'hq');facility(state,3,2,'factory');facility(state,4,2,'airfield');facility(state,5,2,'factory',1);facility(state,6,2,'hq',null);facility(state,7,2,'city');
  const hq=getPlayerProduction(state,'2,2'),factory=getPlayerProduction(state,'3,2'),air=getPlayerProduction(state,'4,2','helicopter');
  assert.deepEqual(hq.sites.map(site=>site.key),['2,2','3,2','4,2']);
  const ground=['infantry','recon','tank','heavy','artillery','antiair'];
  assert.deepEqual(hq.options.map(option=>option.type),ground);assert.deepEqual(factory.options.map(option=>option.type),ground);
  assert.deepEqual(air.options.map(option=>option.type),['fighter','helicopter']);assert.equal(air.option.cost,UNIT_TYPES.helicopter.cost);assert.equal(air.afterFunds,40000);
  const none=sandbox();facility(none,5,2,'factory',1);facility(none,6,2,'airfield',null);facility(none,7,2,'city');
  const empty=getPlayerProduction(none);assert.equal(empty.site,null);assert.deepEqual(empty.options,[]);assert.equal(empty.canPurchase,false);assert.equal(empty.afterFunds,none.funds[0]);assert.match(empty.reason,/味方の拠点/);
});

test('CPU turn, disabled operation and finished games gate every purchase while retaining player gold',()=>{
  for(const entry of [{alter:s=>s.turn=1,enabled:true,reason:/CPU/},{alter:()=>{},enabled:false,reason:/作戦開始後/},{alter:s=>s.winner=0,enabled:true,reason:/終了/},{alter:s=>s.winner=1,enabled:true,reason:/終了/}]){
    const state=sandbox();facility(state,2,2,'hq');entry.alter(state);const before=JSON.stringify(state);
    const model=getPlayerProduction(state,'2,2','infantry',{enabled:entry.enabled});
    assert.equal(model.funds,50000);assert.equal(model.site.key,'2,2');assert.equal(model.canPurchase,false);assert.ok(model.options.length>0);assert.ok(model.options.every(option=>!option.available));assert.match(model.reason,entry.reason);assert.equal(JSON.stringify(state),before);
  }
});

test('occupancy, insufficient gold and the army cap explain unavailable choices without silently switching the selected facility',()=>{
  const occupied=sandbox();facility(occupied,2,2,'factory');facility(occupied,3,2,'factory');occupied.units.push(troop('u3','tank',0,2,2));
  const blocked=getPlayerProduction(occupied,'2,2','infantry');assert.equal(blocked.site.key,'2,2');assert.equal(blocked.site.occupant.id,'u3');assert.equal(blocked.canPurchase,false);assert.match(blocked.reason,/部隊がいます/);
  const fallback=getPlayerProduction(occupied);assert.equal(fallback.site.key,'3,2');assert.equal(fallback.canPurchase,true);
  const poor=sandbox();facility(poor,2,2,'factory');poor.funds[0]=999;const unaffordable=getPlayerProduction(poor,'2,2','infantry');assert.equal(unaffordable.canPurchase,false);assert.equal(unaffordable.afterFunds,-1);assert.match(unaffordable.reason,/資金/);
  const full=sandbox();facility(full,2,2,'hq');full.units=Array.from({length:MAX_UNITS_PER_TEAM},(_,i)=>troop(`u${i+1}`,'infantry',0,i%full.width,Math.floor(i/full.width)));full.units.push(troop('u99','infantry',1,16,11));
  const capped=getPlayerProduction(full,'2,2','infantry');assert.equal(capped.count,20);assert.equal(capped.canPurchase,false);assert.match(capped.reason,/上限/);
});

test('controller selection delegates one exact engine purchase, creates HP10 waiting units and blocks reentrant and repeated purchases',()=>{
  const initial=createGame({missionId:1}),before=JSON.stringify(initial);let nestedResult;
  const r=rig(initial,{onProduce(action,context){nestedResult=context.controller.purchase();const result=applyAction(context.state,action);assert.equal(result.ok,true,result.error);context.state=result.state;return result.ok;}});
  assert.equal(r.controller.open({x:1,y:5}),true);card(r.document,'偵察車').click();
  assert.match(r.document.getElementById('productionPreview').textContent,/3,000 G/);assert.match(r.document.getElementById('productionPreview').textContent,/0 G/);
  assert.equal(r.controller.purchase(),true);assert.equal(nestedResult,false);
  assert.deepEqual(r.actions,[{type:'produce',x:1,y:5,unitType:'recon'}]);
  const bought=unitAt(r.state,1,5);assert.equal(bought.type,'recon');assert.equal(bought.team,0);assert.equal(bought.hp,10);assert.equal(bought.acted,true);assert.equal(bought.moved,true);assert.deepEqual(getReachable(r.state,bought.id),[]);
  assert.equal(r.state.units.length,initial.units.length+1);assert.equal(r.state.funds[0],0);assert.equal(r.state.funds[1],3000);assert.equal(r.state.stats[0].spent,3000);assert.equal(JSON.stringify(initial),before);
  assert.equal(r.controller.purchase(),false);r.document.getElementById('confirmProductionButton').click();assert.equal(r.actions.length,1);assert.equal(r.state.funds[0],0);assert.equal(r.document.getElementById('confirmProductionButton').disabled,true);
});

test('opening, inspecting and closing or cancelling the catalogue never spends gold or produces a unit',()=>{
  const state=createGame({missionId:1}),before=JSON.stringify(state),r=rig(state);
  r.controller.open({x:1,y:5});card(r.document,'偵察車').click();assert.equal(r.controller.isOpen(),true);
  r.document.getElementById('closeProductionButton').click();assert.equal(r.controller.isOpen(),false);assert.equal(r.controller.purchase(),false);
  r.controller.open({x:1,y:5});r.document.getElementById('productionDialog').close();
  assert.equal(r.opened.length,2);assert.equal(r.closed.length,2);assert.equal(r.actions.length,0);assert.equal(JSON.stringify(r.state),before);
  const disabled=rig(state,{enabled:false});assert.equal(disabled.controller.open(),false);assert.equal(disabled.controller.isOpen(),false);assert.equal(disabled.actions.length,0);
});

test('facility changes, unit inspection and map locate navigation are free and locate the currently selected site',()=>{
  const state=sandbox();facility(state,2,2,'hq');facility(state,3,2,'factory');facility(state,4,2,'airfield');const before=JSON.stringify(state),r=rig(state);
  r.controller.open({x:2,y:2});const select=r.document.getElementById('productionSiteSelect');select.value='4,2';select.emit('change');
  assert.equal(r.document.getElementById('productionUnitList').children.length,2);card(r.document,'攻撃ヘリ').click();assert.match(r.document.getElementById('productionPreview').textContent,/40,000 G/);
  select.value='3,2';select.emit('change');card(r.document,'戦車').click();r.document.getElementById('locateProductionButton').click();
  assert.deepEqual(r.located,[{x:3,y:2}]);assert.equal(r.controller.isOpen(),false);assert.equal(r.closed.length,1);assert.equal(r.actions.length,0);assert.equal(JSON.stringify(r.state),before);
});

test('purchase rechecks live state so a stale affordable card cannot spend during CPU turn or after gold and occupancy change',()=>{
  for(const alter of [s=>s.turn=1,s=>s.funds[0]=0,s=>s.units.push(troop('u3','infantry',0,2,2)),s=>s.winner=1]){
    const state=sandbox();facility(state,2,2,'factory');const r=rig(state);r.controller.open({x:2,y:2});assert.equal(r.document.getElementById('confirmProductionButton').disabled,false);
    r.state=structuredClone(r.state);alter(r.state);const before=JSON.stringify(r.state);
    assert.equal(r.controller.purchase(),false);assert.equal(r.actions.length,0);assert.equal(r.document.getElementById('confirmProductionButton').disabled,true);assert.equal(JSON.stringify(r.state),before);
  }
});

test('an engine-rejected purchase leaves gold untouched and allows a later valid retry instead of locking the controller',()=>{
  const state=sandbox();facility(state,2,2,'factory');let reject=true;
  const r=rig(state,{onProduce(action,context){const candidate=structuredClone(context.state);if(reject)candidate.funds[0]=0;const result=applyAction(candidate,action);if(result.ok)context.state=result.state;return result.ok;}});
  r.controller.open({x:2,y:2});const before=JSON.stringify(r.state);assert.equal(r.controller.purchase(),false);assert.equal(JSON.stringify(r.state),before);assert.equal(r.document.getElementById('productionMessage').dataset.kind,'error');assert.match(r.document.getElementById('productionMessage').textContent,/生産できませんでした/);
  reject=false;assert.equal(r.controller.purchase(),true);assert.equal(r.actions.length,2);assert.equal(r.state.funds[0],49000);assert.equal(unitAt(r.state,2,2).type,'infantry');assert.equal(r.document.getElementById('productionMessage').dataset.kind,'success');
});
