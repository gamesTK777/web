import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as cast from './cast.mjs';

class Node {
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.hidden=false;this.disabled=false;this.value='';this.classes=new Map();this.classList={toggle:(key,value)=>this.classes.set(key,value)};}
 append(...children){this.children.push(...children);}
 replaceChildren(...children){this.children=children;}
 setAttribute(key,value){this[key]=String(value);}
 click(){this.clicks=(this.clicks||0)+1;this.onclick?.({target:this});}
}
const copy=value=>JSON.parse(JSON.stringify(value));
const config=()=>({version:7,stages:cast.CAST.map(profile=>({id:profile.id,name:profile.name,portrait:null,rewards:[null,null,null],gallery:Array.from({length:10},(_,i)=>`old-${profile.id}-${i+1}`),accent:'#e89cae',difficulty:profile.id}))});
const files=()=>[10,2,8,1,4,3,9,6,5,7].map(n=>({name:`reward-${n}.png`,type:'image/png',size:100}));
async function harness({decodeFailure='',uploadFailureAt=0,rateLimit=false,pauseFirstUpload=false,realLoad=false}={}){
 const [html,source]=await Promise.all(['admin.html','admin.mjs'].map(name=>readFile(new URL('./'+name,import.meta.url),'utf8')));
 const ids=new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(([,id])=>[id,new Node()])),tabs=Array.from({length:7},(_,i)=>Object.assign(new Node('button'),{dataset:{stage:String(i+1)}}));
 const fileInputs=[...html.matchAll(/<input[^>]+id="([^"]+)"[^>]+type="file"/g)].map(([,id])=>ids.get(id));
 const document={getElementById:id=>{assert.ok(ids.has(id),'Missing HTML node '+id);return ids.get(id);},createElement:tag=>new Node(tag),querySelectorAll:selector=>selector==='[data-stage]'?tabs:selector==='input[type=file]'?fileInputs:[]};
 const requests=[],prepared=[],uploaded=[];let releaseFirst;
 const gate=new Promise(resolve=>releaseFirst=resolve);
 const fetch=async(url,options={})=>{
  if(url.endsWith('/admin'))return{ok:true,status:200,json:async()=>({canManage:realLoad,authenticated:realLoad})};
  if(url.endsWith('/config')&&options.method==='GET')return{ok:true,status:200,json:async()=>config()};
  if(options.method==='POST'){
   requests.push({url,body:options.body});if(pauseFirstUpload&&requests.length===1)await gate;
   if(requests.length===uploadFailureAt)return{ok:false,status:rateLimit?429:500,headers:{get:()=>rateLimit?'17':null},json:async()=>({error:rateLimit?'通信回数の上限です。':'画像の保存に失敗しました。'})};
   const image={id:`new-${requests.length}`,bytes:90,width:100,height:200,url:`/api/mahjong/assets/new-${requests.length}`,inUse:false};uploaded.push(image);return{ok:true,status:201,json:async()=>image};
  }
  return{ok:true,status:200,json:async()=>({images:uploaded,limit:200})};
 };
 const events=new Map(),context=vm.createContext({document,window:{addEventListener:(name,handler)=>events.set(name,handler)},Image:Node,__cast:cast,URL,AbortController,console,setTimeout,clearTimeout,confirm:()=>true,fetch,__prepare:async file=>{prepared.push(file.name);if(file.name===decodeFailure)throw Error('画像を読み込めません。');return{type:'image/webp',filename:file.name};}});
 const hooks=`prepareImage=__prepare;globalThis.qa={configure(value){config=value;draft=draftConfig(value);allowed=true;dirty=false;stageId=1;render();lock(false);},select(id){stageId=id;render();},dirty(){changed();},state(){return{draft,dirty,busy,stageId};},upload:uploadGalleryBatch,slot:uploadGallerySlot,move:moveGallerySlot,reload:load};`;
 vm.runInContext('const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast;\n'+source.replace(/^import .*;\r?$/gm,'')+'\n'+hooks,context);
 await new Promise(setImmediate);if(!realLoad)context.qa.configure(config());
 return{qa:context.qa,node:id=>document.getElementById(id),requests,prepared,uploaded,releaseFirst,events};
}

test('initial owner loading and reloading unlock gallery replacements and valid reorder controls',async()=>{
 const f=await harness({realLoad:true});
 for(const reload of [false,true]){
  if(reload)await f.qa.reload();
  assert.equal(f.qa.state().busy,false);assert.equal(f.node('configFields').disabled,false);assert.equal(f.node('stageSelect').disabled,false);
  const cards=f.node('gallerySlots').children;assert.equal(cards.length,10);
  for(let i=0;i<10;i++){
   const controls=cards[i].children[2];assert.equal(controls.children[0].children[0].disabled,false,`slot ${i+1} replacement must be enabled after load`);
   assert.equal(controls.children[1].disabled,false,`registered slot ${i+1} can be removed`);
   assert.equal(controls.children[2].disabled,i===0);assert.equal(controls.children[3].disabled,i===9);
  }
  assert.equal(f.node('galleryClearButton').disabled,false);assert.equal(f.node('galleryDropZone')['aria-disabled'],'false');
 }
});

test('legacy management configs gain ten empty gallery slots without changing victory images or input',async()=>{
 const f=await harness(),value=config();for(const stage of value.stages)delete stage.gallery;const before=JSON.stringify(value);f.qa.configure(value);
 assert.equal(f.qa.state().draft.stages[0].gallery.length,10);assert(f.qa.state().draft.stages[0].gallery.every(v=>v===null));assert.equal(f.node('galleryCount').textContent,'登録 0 / 10枚');
 assert.equal(f.node('gallerySlots').children.length,10);assert.deepEqual(copy(f.qa.state().draft.stages[0].rewards),[null,null,null]);assert.equal(JSON.stringify(value),before);
});

test('a batch naturally sorts ten filenames and prepares every image before sequential uploads',async()=>{
 const f=await harness(),original=copy(f.qa.state().draft);await f.qa.upload(files());
 const expected=Array.from({length:10},(_,i)=>`reward-${i+1}.png`);assert.deepEqual(f.prepared,expected);assert.deepEqual(f.requests.map(r=>r.body.filename),expected);
 assert.deepEqual(copy(f.qa.state().draft.stages[0].gallery),Array.from({length:10},(_,i)=>`new-${i+1}`));
 assert.deepEqual(copy(f.qa.state().draft.stages.slice(1)),original.stages.slice(1));assert.deepEqual(copy(f.qa.state().draft.stages[0].rewards),original.stages[0].rewards);
 assert.equal(f.qa.state().draft.version,7);assert.equal(f.qa.state().dirty,true);assert.equal(f.qa.state().busy,false);assert.equal(f.node('galleryProgress').value,10);assert.equal(f.node('galleryCount').textContent,'登録 10 / 10枚');
 assert(f.requests.every(r=>r.url.endsWith('admin/images')),'batch does not publish configuration automatically');
 assert.equal(f.node('gallerySlots').children[9].children[0].children[1].textContent,'reward-10.png');
 assert(f.node('assetInventory').children.every(row=>row.children[2].disabled),'images referenced by an unsaved gallery cannot be deleted');
});

test('batch count, file type, size and image decoding failures leave old galleries and dirty state intact',async()=>{
 for(const invalid of [files().slice(0,9),[...files(),files()[0]],files().map((f,i)=>i===9?{...f,type:'image/svg+xml'}:f),files().map((f,i)=>i===9?{...f,size:21*1024*1024}:f)]){
  const f=await harness(),before=copy(f.qa.state().draft);await f.qa.upload(invalid);assert.deepEqual(copy(f.qa.state().draft),before);assert.equal(f.requests.length,0);assert.equal(f.qa.state().dirty,false);assert.equal(f.qa.state().busy,false);
 }
 const f=await harness({decodeFailure:'reward-8.png'}),before=copy(f.qa.state().draft);f.qa.dirty();await f.qa.upload(files());assert.equal(f.requests.length,0);assert.deepEqual(copy(f.qa.state().draft),before);assert.equal(f.qa.state().dirty,true);assert.match(f.node('galleryUploadStatus').textContent,/変更していません/);
});

test('an interrupted upload never applies a partial gallery, preserves existing edits and reports unused uploads and retry timing',async()=>{
 const f=await harness({uploadFailureAt:4,rateLimit:true}),before=copy(f.qa.state().draft);f.qa.dirty();await f.qa.upload(files());
 assert.equal(f.requests.length,4);assert.equal(f.uploaded.length,3);assert.deepEqual(copy(f.qa.state().draft),before);assert.equal(f.qa.state().dirty,true);assert.equal(f.qa.state().busy,false);
 assert.match(f.node('galleryUploadStatus').textContent,/17秒/);assert.match(f.node('galleryUploadStatus').textContent,/3枚は未使用画像/);assert.equal(f.node('assetInventory').children.length,3);
});

test('upload locks navigation and saving, ignores concurrent work and assigns only the captured target stage',async()=>{
 const f=await harness({pauseFirstUpload:true}),before=copy(f.qa.state().draft),pending=f.qa.upload(files());
 for(let i=0;i<30&&f.requests.length===0;i++)await new Promise(setImmediate);
 assert.equal(f.qa.state().busy,true);assert.equal(f.node('configFields').disabled,true);assert.equal(f.node('stageSelect').disabled,true);assert.equal(f.prepared.length,10);
 f.node('stageSelect').onchange({target:{value:'2'}});assert.equal(f.qa.state().stageId,1);await f.qa.upload(files());assert.equal(f.requests.length,1);
 // Even a programmatic view change cannot redirect the in-flight upload.
 f.qa.select(2);f.releaseFirst();await pending;assert.equal(f.requests.length,10);assert.deepEqual(copy(f.qa.state().draft.stages[1]),before.stages[1]);assert.equal(f.qa.state().draft.stages[0].gallery[0],'new-1');assert.equal(f.node('configFields').disabled,false);
});

test('reordering, removing and individual replacement keep every other gallery slot and stage intact',async()=>{
 const f=await harness(),before=copy(f.qa.state().draft);f.qa.move(0,1);let stage=f.qa.state().draft.stages[0];assert.equal(stage.gallery[0],before.stages[0].gallery[1]);assert.equal(stage.gallery[1],before.stages[0].gallery[0]);
 f.node('gallerySlots').children[2].children[2].children[1].onclick();assert.equal(stage.gallery[2],null);assert.equal(stage.gallery[3],before.stages[0].gallery[3]);
 await f.qa.slot({name:'<script>portrait.png',type:'image/png',size:100},2);stage=f.qa.state().draft.stages[0];assert.equal(stage.gallery[2],'new-1');assert.equal(f.node('gallerySlots').children[2].children[0].children[1].textContent,'<script>portrait.png');assert.deepEqual(copy(f.qa.state().draft.stages.slice(1)),before.stages.slice(1));
 f.node('galleryClearButton').onclick();assert(f.qa.state().draft.stages[0].gallery.every(id=>id===null));assert.deepEqual(copy(f.qa.state().draft.stages[0].rewards),before.stages[0].rewards);
});

test('the file drop zone accepts files only, survives nested drag events and supports keyboard picking',async()=>{
 const f=await harness(),zone=f.node('galleryDropZone');let prevented=0;
 const event={dataTransfer:{types:['Files'],files:files()},preventDefault(){prevented++;},target:zone};
 zone.ondragenter(event);zone.ondragenter(event);zone.ondragleave(event);assert.equal(zone.classes.get('is-dragging'),true);zone.ondragleave(event);assert.equal(zone.classes.get('is-dragging'),false);
 zone.ondragover({dataTransfer:{types:['text/plain']},preventDefault(){throw Error('plain text is not intercepted');}});
 zone.onkeydown({key:'Enter',target:zone,preventDefault(){prevented++;},repeat:false});assert.equal(f.node('galleryFiles').clicks,1);
 zone.ondrop(event);for(let i=0;i<60&&(f.qa.state().busy||f.requests.length===0);i++)await new Promise(setImmediate);
 assert.equal(f.requests.length,10);assert.equal(f.qa.state().draft.stages[0].gallery[9],'new-10');assert(prevented>=6);assert.equal(zone.classes.get('is-dragging'),false);
});
