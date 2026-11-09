import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as cast from './cast.mjs';

class Node {
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.hidden=false;this.disabled=false;this.value='';this.open=false;this.classes=new Map();this.classList={toggle:(key,value)=>this.classes.set(key,value)};}
 append(...children){this.children.push(...children);}
 replaceChildren(...children){this.children=children;}
 setAttribute(key,value){this[key]=String(value);}
 removeAttribute(key){delete this[key];}
 querySelectorAll(selector){return this.children.flatMap(child=>[...(child.tagName===selector.toUpperCase()?[child]:[]),...child.querySelectorAll(selector)]);}
 pause(){this.pauses=(this.pauses||0)+1;}
 load(){this.loads=(this.loads||0)+1;}
 click(){this.clicks=(this.clicks||0)+1;this.onclick?.({target:this});}
}
const copy=value=>JSON.parse(JSON.stringify(value));
const config=()=>({version:7,stages:cast.CAST.map(profile=>({id:profile.id,name:profile.name,portrait:null,rewards:[null,null,null],gallery:Array.from({length:10},(_,i)=>`old-${profile.id}-${i+1}`),accent:'#e89cae',difficulty:profile.id}))});
const files=()=>[10,2,8,1,4,3,9,6,5,7].map(n=>({name:`reward-${n}.png`,type:'image/png',size:100}));
async function harness({decodeFailure='',uploadFailureAt=0,rateLimit=false,pauseFirstUpload=false,realLoad=false,realVideoPreparation=false,videoFailure='',videoMetadata={width:640,height:360,duration:3}}={}){
 const [html,source]=await Promise.all(['admin.html','admin.mjs'].map(name=>readFile(new URL('./'+name,import.meta.url),'utf8')));
 const ids=new Map([...html.matchAll(/<([a-z][\w:-]*)\b[^>]*\bid="([^"]+)"/gi)].map(([,tag,id])=>[id,new Node(tag)])),tabs=Array.from({length:7},(_,i)=>Object.assign(new Node('button'),{dataset:{stage:String(i+1)}}));
 const fileInputs=[...html.matchAll(/<input[^>]+id="([^"]+)"[^>]+type="file"/g)].map(([,id])=>ids.get(id));
 const validationVideos=[],objectUrls=[],revoked=[],timerDelays=[],documentEvents=new Map();
 ids.get('configFields').append(...[1,2,3].map(i=>ids.get('rewardVideo'+i)),ids.get('gallerySlots'));
 const document={hidden:false,getElementById:id=>{assert.ok(ids.has(id),'Missing HTML node '+id);return ids.get(id);},createElement:tag=>{
  const node=new Node(tag);if(tag==='video'){
   node.canPlayType=()=>videoFailure==='unsupported'?'':'maybe';
   node.load=function(){this.loads=(this.loads||0)+1;if(!this.src||!this.onloadeddata)return;validationVideos.push(this);queueMicrotask(()=>{if(videoFailure==='corrupt'){this.onerror?.();return;}this.videoWidth=videoMetadata.width;this.videoHeight=videoMetadata.height;this.duration=videoMetadata.duration;this.onloadedmetadata?.();this.onloadeddata?.();});};
  }return node;
 },querySelectorAll:selector=>selector==='[data-stage]'?tabs:selector==='input[type=file]'?fileInputs:selector==='video'?[...new Set([...ids.values()].flatMap(n=>[...(n.tagName==='VIDEO'?[n]:[]),...n.querySelectorAll('video')]))]:[],addEventListener:(name,fn)=>documentEvents.set(name,fn)};
 const requests=[],prepared=[],uploaded=[],putRequests=[];let releaseFirst,serverConfig=config();
 const gate=new Promise(resolve=>releaseFirst=resolve);
 const fetch=async(url,options={})=>{
  if(url.endsWith('/admin'))return{ok:true,status:200,json:async()=>({canManage:realLoad,authenticated:realLoad})};
  if(url.endsWith('/config')&&options.method==='GET')return{ok:true,status:200,json:async()=>serverConfig};
  if(url.endsWith('/config')&&options.method==='PUT'){const value=JSON.parse(options.body);putRequests.push(value);serverConfig={...value,version:value.version+1,mediaTypes:{...serverConfig.mediaTypes,...Object.fromEntries(uploaded.map(asset=>[asset.id,asset.mime]))}};return{ok:true,status:200,json:async()=>serverConfig};}
  if(options.method==='POST'){
   requests.push({url,body:options.body,headers:options.headers,preparedCount:prepared.length});if(pauseFirstUpload&&requests.length===1)await gate;
   if(requests.length===uploadFailureAt)return{ok:false,status:rateLimit?429:500,headers:{get:()=>rateLimit?'17':null},json:async()=>({error:rateLimit?'通信回数の上限です。':'画像の保存に失敗しました。'})};
   const image={id:`new-${requests.length}`,mime:options.body.type,bytes:90,width:100,height:200,url:`/api/mahjong/assets/new-${requests.length}`,inUse:false};uploaded.push(image);return{ok:true,status:201,json:async()=>image};
  }
  return{ok:true,status:200,json:async()=>({images:uploaded,limit:200})};
 };
 const events=new Map(),context=vm.createContext({document,window:{addEventListener:(name,handler)=>events.set(name,handler)},Image:Node,__cast:cast,URL:{createObjectURL(blob){const url='blob:test-'+objectUrls.length;objectUrls.push({url,blob});return url;},revokeObjectURL:url=>revoked.push(url)},Blob,AbortController,console,setTimeout:(fn,delay)=>{timerDelays.push(delay);return setTimeout(fn,delay);},clearTimeout,confirm:()=>true,fetch,__useRealVideo:realVideoPreparation,__prepare:async file=>{prepared.push(file.name);if(file.name===decodeFailure)throw Error('画像を読み込めません。');return{type:'image/webp',filename:file.name};},__prepareVideo:async file=>{prepared.push(file.name);if(file.name===decodeFailure)throw Error('MP4を再生できません。');return{type:'video/mp4',filename:file.name};}});
 const hooks=`prepareImage=__prepare;if(!__useRealVideo)prepareVideo=__prepareVideo;globalThis.qa={configure(value){config=value;draft=draftConfig(value);allowed=true;dirty=false;stageId=1;render();lock(false);},select(id){stageId=id;render();},dirty(){changed();},state(){return{draft,dirty,busy,stageId};},upload:uploadGalleryBatch,slot:uploadGallerySlot,uploadReward:upload,move:moveGallerySlot,reload:load,video:prepareVideo,media:prepareMedia,fileError:galleryFileError,isVideoFile,save(){return $('configForm').onsubmit({preventDefault(){}});}};`;
 vm.runInContext('const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast;\n'+source.replace(/^import .*;\r?$/gm,'')+'\n'+hooks,context);
 await new Promise(setImmediate);if(!realLoad)context.qa.configure(config());
 return{qa:context.qa,node:id=>document.getElementById(id),requests,prepared,uploaded,releaseFirst,events,document,documentEvents,validationVideos,objectUrls,revoked,timerDelays,putRequests};
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
 assert.equal(f.qa.state().draft.stages[0].gallery.length,10);assert(f.qa.state().draft.stages[0].gallery.every(v=>v===null));assert.equal(f.node('galleryCount').textContent,'登録 0 / 10件');
 assert.equal(f.node('gallerySlots').children.length,10);assert.deepEqual(copy(f.qa.state().draft.stages[0].rewards),[null,null,null]);assert.equal(JSON.stringify(value),before);
});

test('a batch naturally sorts ten filenames and prepares every image before sequential uploads',async()=>{
 const f=await harness(),original=copy(f.qa.state().draft);await f.qa.upload(files());
 const expected=Array.from({length:10},(_,i)=>`reward-${i+1}.png`);assert.deepEqual(f.prepared,expected);assert.deepEqual(f.requests.map(r=>r.body.filename),expected);
 assert.deepEqual(copy(f.qa.state().draft.stages[0].gallery),Array.from({length:10},(_,i)=>`new-${i+1}`));
 assert.deepEqual(copy(f.qa.state().draft.stages.slice(1)),original.stages.slice(1));assert.deepEqual(copy(f.qa.state().draft.stages[0].rewards),original.stages[0].rewards);
 assert.equal(f.qa.state().draft.version,7);assert.equal(f.qa.state().dirty,true);assert.equal(f.qa.state().busy,false);assert.equal(f.node('galleryProgress').value,10);assert.equal(f.node('galleryCount').textContent,'登録 10 / 10件');
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
 assert.match(f.node('galleryUploadStatus').textContent,/17秒/);assert.match(f.node('galleryUploadStatus').textContent,/3件は未使用素材/);assert.equal(f.node('assetInventory').children.length,3);
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

const mixedFiles=()=>files().map((file,i)=>i%2?{...file,name:file.name.replace('.png','.mp4'),type:'video/mp4'}:file);

test('ten mixed image and MP4 rewards are prepared first, naturally sorted and saved with read-only media types',async()=>{
 const f=await harness();await f.qa.upload(mixedFiles());
 const expected=mixedFiles().map(file=>file.name).sort((a,b)=>a.localeCompare(b,'ja',{numeric:true}));
 assert.deepEqual(f.prepared,expected);assert.deepEqual(f.requests.map(r=>r.body.filename),expected);
 assert(f.requests.every(r=>r.preparedCount===10));assert.equal(f.requests.filter(r=>r.headers['Content-Type']==='video/mp4').length,5);
 const stage=f.qa.state().draft.stages[0],types=f.qa.state().draft.mediaTypes;
 stage.gallery.forEach((id,index)=>{const video=expected[index].endsWith('.mp4'),node=f.node('gallerySlots').children[index].children[1].children[0];assert.equal(types[id],video?'video/mp4':'image/webp');assert.equal(node.tagName,video?'VIDEO':'DIV');if(video){assert.equal(node.controls,true);assert.equal(node.playsInline,true);assert.equal(node.preload,'metadata');assert.equal(node.autoplay,false);}});
 await f.qa.save();assert.deepEqual(Object.keys(f.putRequests[0]).sort(),['stages','version']);assert.equal(f.putRequests[0].mediaTypes,undefined);
 await f.qa.reload();assert.equal(Object.values(f.qa.state().draft.mediaTypes).filter(mime=>mime==='video/mp4').length,5);
 assert.equal(f.node('gallerySlots').children.filter(card=>card.children[1].children[0].tagName==='VIDEO').length,5);
});

test('oversized or unplayable MP4s never begin a batch upload or alter a previous gallery',async()=>{
 const invalid=mixedFiles();invalid[0]={name:'oversize.mp4',type:'video/mp4',size:25*1024*1024+1};
 const f=await harness(),before=copy(f.qa.state().draft);await f.qa.upload(invalid);assert.equal(f.requests.length,0);assert.deepEqual(copy(f.qa.state().draft),before);assert.match(f.node('galleryUploadStatus').textContent,/25MB/);
 const video=mixedFiles().find(file=>file.type==='video/mp4'),g=await harness({decodeFailure:video.name}),unchanged=copy(g.qa.state().draft);await g.qa.upload(mixedFiles());assert.equal(g.requests.length,0);assert.deepEqual(copy(g.qa.state().draft),unchanged);assert.equal(g.qa.state().dirty,false);
 const interrupted=await harness({uploadFailureAt:6}),old=copy(interrupted.qa.state().draft);await interrupted.qa.upload(mixedFiles());assert.deepEqual(copy(interrupted.qa.state().draft),old,'failed mixed uploads must not add partial gallery IDs or MIME entries');
});

test('MP4 MIME normalization preserves original bytes and releases validation media resources',async()=>{
 for(const type of ['', 'application/octet-stream','video/mp4']){
  const f=await harness({realVideoPreparation:true}),bytes=Uint8Array.from([0,1,2,3,244,255]),file=Object.assign(new Blob([bytes],{type}),{name:'resort.MP4'});
  const blob=await f.qa.video(file);assert.equal(blob.type,'video/mp4');assert.deepEqual(new Uint8Array(await blob.arrayBuffer()),bytes);if(type==='video/mp4')assert.equal(blob,file);
  assert.equal(f.objectUrls.length,1);assert.deepEqual(f.revoked,[f.objectUrls[0].url]);assert.equal(f.validationVideos[0].autoplay,false);assert.equal(f.validationVideos[0].src,undefined);assert(f.validationVideos[0].pauses>0);
 }
});

test('MP4 validation rejects unsupported playback, corrupt data and audio-only files with cleanup',async()=>{
 const file=Object.assign(new Blob(['fixture'],{type:'video/mp4'}),{name:'clip.mp4'});
 for(const options of [{videoFailure:'unsupported'},{videoFailure:'corrupt'},{videoMetadata:{width:0,height:0,duration:2}},{videoMetadata:{width:640,height:360,duration:Infinity}}]){
  const f=await harness({realVideoPreparation:true,...options});await assert.rejects(f.qa.video(file),/MP4/);assert.equal(f.objectUrls.length,f.revoked.length);
 }
 const f=await harness();assert.equal(f.qa.fileError({name:'clip.mp4',type:'application/octet-stream',size:25*1024*1024}),'');assert.notEqual(f.qa.fileError({name:'clip.mov',type:'video/quicktime',size:100}),'');
});

test('single victory and gallery videos preview correctly while the portrait remains still-image-only',async()=>{
 const f=await harness(),mp4={name:'win.mp4',type:'video/mp4',size:100};
 await f.qa.uploadReward(mp4,'portrait');assert.equal(f.requests.length,0);assert.equal(f.qa.state().draft.stages[0].portrait,null);assert.match(f.node('uploadStatus').textContent,/静止画/);
 await f.qa.uploadReward(mp4,1);assert.equal(f.qa.state().draft.stages[0].rewards[1],'new-1');assert.equal(f.node('rewardPreview2').hidden,true);assert.equal(f.node('rewardVideo2').hidden,false);assert.equal(f.node('rewardVideo2').src,'/api/mahjong/assets/new-1');assert.equal(f.node('rewardVideo2').autoplay,false);
 await f.qa.slot(mp4,4);const old=f.node('gallerySlots').children[4].children[1].children[0];assert.equal(old.tagName,'VIDEO');
 await f.qa.slot({name:'still.png',type:'image/png',size:100},4);assert.equal(old.src,undefined);assert(old.pauses>0);assert.equal(f.qa.state().draft.mediaTypes['new-3'],'image/webp');assert.equal(f.node('gallerySlots').children[4].children[1].children[0].tagName,'DIV');
});

test('stage navigation, hidden pages and closed inventory detach video sources without losing saved selections',async()=>{
 const f=await harness(),value=config();value.stages[0].rewards[0]='reward-video';value.mediaTypes={'reward-video':'video/mp4','old-1-1':'video/mp4','old-2-1':'video/mp4'};f.qa.configure(value);
 const oldGallery=f.node('gallerySlots').children[0].children[1].children[0];f.qa.select(2);assert.equal(oldGallery.src,undefined);assert(oldGallery.pauses>0);assert.equal(f.node('rewardVideo1').src,undefined);
 const active=f.node('gallerySlots').children[0].children[1].children[0];f.document.hidden=true;f.documentEvents.get('visibilitychange')();assert.equal(active.src,undefined);assert(active.pauses>0);
 await f.qa.slot({name:'hidden.mp4',type:'video/mp4',size:100},1);assert.equal(f.node('gallerySlots').children[1].children[1].children[0].src,undefined,'completion in a hidden page must not reload video sources');
 f.document.hidden=false;f.documentEvents.get('visibilitychange')();assert.equal(f.node('gallerySlots').children[1].children[1].children[0].src,'/api/mahjong/assets/new-1');
 const closed=f.node('assetInventory').children[0].children[0];assert.equal(closed.tagName,'VIDEO');assert.equal(closed.src,undefined);assert.equal(f.node('assetInventory').children[0].children[2].disabled,true);
 f.node('assetLibrary').open=true;f.node('assetLibrary').ontoggle();const opened=f.node('assetInventory').children[0].children[0];assert.equal(opened.src,'/api/mahjong/assets/new-1');assert.match(f.node('assetInventory').children[0].children[1].textContent,/MP4動画/);
 f.node('assetLibrary').open=false;f.node('assetLibrary').ontoggle();assert.equal(opened.src,undefined);assert(opened.pauses>0);
});

test('raw video requests have 120-second uploads while images retain the existing 30-second timeout',async()=>{
 const f=await harness();await f.qa.slot({name:'clip.mp4',type:'video/mp4',size:100},0);assert(f.timerDelays.includes(120000));
 f.timerDelays.length=0;await f.qa.slot({name:'still.png',type:'image/png',size:100},1);assert(f.timerDelays.length>0);assert(f.timerDelays.every(delay=>delay===30000));
});
