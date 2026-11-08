import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,MISSIONS,UNIT_TYPES,getReachable} from './engine.mjs';
import {renderBoard,drawUnitIcon,cellFromPointer} from './renderer.mjs';

// A numeric guard, not a visual Canvas implementation. Browser screenshots are
// still required for art quality. This detects exceptions, NaN/Infinity, invalid
// radii, leaked save/restore scopes and accidental state writes during rendering.
function checkNumbers(value,label){
  if(typeof value==='number')assert.ok(Number.isFinite(value),`${label}: non-finite number ${value}`);
  else if(Array.isArray(value))value.forEach(item=>checkNumbers(item,label));
}
function numericContext(canvas){
  const data={canvas,calls:0,depth:0};
  const methods=['beginPath','closePath','moveTo','lineTo','arcTo','arc','ellipse','fill','stroke','fillRect','strokeRect','clearRect','translate','rotate','scale','bezierCurveTo','quadraticCurveTo','setLineDash','fillText','strokeText','rect','clip','transform','setTransform','resetTransform'];
  for(const name of methods)data[name]=(...args)=>{
    data.calls++;args.forEach(arg=>checkNumbers(arg,name));
    if(name==='ellipse')assert.ok(args[2]>=0&&args[3]>=0,'ellipse radii must be non-negative');
    if(name==='arc')assert.ok(args[2]>=0,'arc radius must be non-negative');
    if(name==='arcTo')assert.ok(args[4]>=0,'arcTo radius must be non-negative');
  };
  data.save=()=>{data.calls++;data.depth++;};
  data.restore=()=>{data.calls++;assert.ok(data.depth>0,'restore without save');data.depth--;};
  data.drawImage=(image,...coordinates)=>{data.calls++;assert.ok(image&&Number.isFinite(image.width)&&Number.isFinite(image.height),'drawImage requires a canvas with finite dimensions');coordinates.forEach(n=>checkNumbers(n,'drawImage'));};
  data.measureText=value=>({width:String(value).length*7});
  data.getLineDash=()=>[];
  const gradient=(...coordinates)=>{data.calls++;coordinates.forEach(n=>checkNumbers(n,'gradient'));return {addColorStop(offset,color){assert.ok(Number.isFinite(offset)&&offset>=0&&offset<=1);assert.equal(typeof color,'string');assert.doesNotMatch(color,/NaN|Infinity/);}};};
  data.createLinearGradient=gradient;data.createRadialGradient=gradient;
  return new Proxy(data,{set(object,key,value){checkNumbers(value,String(key));if(typeof value==='string')assert.doesNotMatch(value,/NaN|Infinity/,`invalid Canvas style ${String(key)}`);object[key]=value;return true;}});
}
class NumericCanvas {
  constructor(width=96,height=96){this.width=width;this.height=height;this.context=numericContext(this);this.rect=null;}
  getContext(kind){assert.equal(kind,'2d');return this.context;}
  getBoundingClientRect(){return this.rect||{left:0,top:0,width:this.width,height:this.height};}
}
function withNumericOffscreen(run){const had=Object.hasOwn(globalThis,'OffscreenCanvas'),previous=globalThis.OffscreenCanvas;globalThis.OffscreenCanvas=NumericCanvas;try{return run();}finally{if(had)globalThis.OffscreenCanvas=previous;else delete globalThis.OffscreenCanvas;}}
function freezeTree(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);for(const child of Object.values(value))freezeTree(child);}return value;}

test('all five missions render animated overlays without invalid coordinates or changing state',()=>withNumericOffscreen(()=>{
  for(const mission of MISSIONS){
    const state=createGame({missionId:mission.id}),before=JSON.stringify(state),selected=state.units[0],moves=getReachable(state,selected.id),cursor=moves.at(-1)||selected;
    freezeTree(state);const canvas=new NumericCanvas();
    for(const time of [0,220,1600])renderBoard(canvas,state,{time,selectedId:selected.id,moves,targets:[{x:state.width-2,y:state.height-2}],cursor,showCoordinates:true,selectedBuilding:{x:1,y:1}});
    assert.equal(JSON.stringify(state),before);assert.equal(canvas.context.depth,0);assert.ok(canvas.context.calls>0);assert.ok(canvas.width>0&&canvas.height>0);
  }
}));

test('both factions, all eight unit types and action effects remain finite at animation boundaries',()=>withNumericOffscreen(()=>{
  const state=createGame({missionId:5}),before=JSON.stringify(state);freezeTree(state);
  for(const type of Object.keys(UNIT_TYPES))for(const team of [0,1])for(const acted of [false,true]){
    const canvas=new NumericCanvas(96,128);drawUnitIcon(canvas,type,team,{time:425,hp:acted?1:10,acted,badge:true});assert.ok(canvas.context.calls>0);assert.equal(canvas.context.depth,0);
  }
  const canvas=new NumericCanvas(),u=state.units[0];
  for(const type of ['move','attack','capture','produce'])for(const elapsed of [0,180,650,1200])renderBoard(canvas,state,{time:100+elapsed,effect:{type,unitId:u.id,team:u.team,x:u.x,y:u.y,fromX:u.x-1,fromY:u.y,startedAt:100}});
  assert.equal(canvas.context.depth,0);assert.equal(JSON.stringify(state),before);
}));

test('pointer conversion follows CSS scaling and scrolled rects at all corners and cell boundaries',()=>{
  for(const mission of MISSIONS)for(const scale of [.25,.75,2.5]){
    const state=createGame({missionId:mission.id}),canvas=new NumericCanvas(1440,1040),size=40*scale,rect={left:scale===.25?22:-237,top:scale===2.5?-419:83,width:state.width*size,height:state.height*size};canvas.rect=rect;
    const point=(x,y)=>({clientX:rect.left+x,clientY:rect.top+y}),cell=(x,y)=>cellFromPointer(canvas,point(x,y),state),epsilon=.001;
    assert.deepEqual(cell(epsilon,epsilon),{x:0,y:0});
    assert.deepEqual(cell(rect.width-epsilon,epsilon),{x:state.width-1,y:0});
    assert.deepEqual(cell(epsilon,rect.height-epsilon),{x:0,y:state.height-1});
    assert.deepEqual(cell(rect.width-epsilon,rect.height-epsilon),{x:state.width-1,y:state.height-1});
    assert.deepEqual(cell(size*4,size*3),{x:4,y:3});
    assert.deepEqual(cell(size*4-epsilon,size*3-epsilon),{x:3,y:2});
    assert.equal(cell(rect.width,rect.height/2),null);assert.equal(cell(rect.width/2,rect.height),null);assert.equal(cell(-epsilon,0),null);assert.equal(cell(0,-epsilon),null);
    assert.deepEqual(cellFromPointer(canvas,{touches:[point(size*2.5,size*4.5)]},state),{x:2,y:4});
    assert.deepEqual(cellFromPointer(canvas,{changedTouches:[point(size*2.5,size*4.5)]},state),{x:2,y:4});
  }
});

test('missing pointers, zero-sized canvases and out-of-board positions select no cell',()=>{
  const state=createGame(),canvas=new NumericCanvas();canvas.rect={left:10,top:20,width:0,height:100};assert.equal(cellFromPointer(canvas,{clientX:10,clientY:20},state),null);
  canvas.rect={left:10,top:20,width:120,height:100};for(const event of [{},{clientX:NaN,clientY:20},{clientX:10,clientY:Infinity},{clientX:9,clientY:20},{clientX:10,clientY:121}])assert.equal(cellFromPointer(canvas,event,state),null);
  assert.equal(cellFromPointer(null,{clientX:0,clientY:0},state),null);assert.equal(cellFromPointer(canvas,null,state),null);
});
