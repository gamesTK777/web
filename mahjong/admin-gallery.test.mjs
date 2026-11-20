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
const mp4={name:'stage-clear.mp4',type:'video/mp4',size:100};
async function harness({decodeFailure='',uploadFailureAt=0,rateLimit=false,pauseFirstUpload=false,realLoad=false,realVideoPreparation=false,videoFailure='',videoMetadata={width:640,height:360,duration:3},serverValue=config(),existing=[]}={}){
 const [html,source]=await Promise.all(['admin.html','admin.mjs'].map(name=>readFile(new URL('./'+name,import.meta.url),'utf8')));
 const ids=new Map([...html.matchAll(/<([a-z][\w:-]*)\b[^>]*\bid="([^"]+)"/gi)].map(([,tag,id])=>[id,new Node(tag)])),tabs=Array.from({length:7},(_,i)=>Object.assign(new Node('button'),{dataset:{stage:String(i+1)}}));
 const fileInputs=[...html.matchAll(/<input[^>]+id="([^"]+)"[^>]+type="file"/g)].map(([,id])=>ids.get(id));
 const validationVideos=[],objectUrls=[],revoked=[],timerDelays=[],documentEvents=new Map();
 ids.get('configFields').append(ids.get('stageRewardPreview'));
 const document={hidden:false,getElementById:id=>{assert.ok(ids.has(id),'Missing HTML node '+id);return ids.get(id);},createElement:tag=>{
  const node=new Node(tag);if(tag==='video'){
   node.canPlayType=()=>videoFailure==='unsupported'?'':'maybe';
   node.load=function(){this.loads=(this.loads||0)+1;if(!this.src||!this.onloadeddata)return;validationVideos.push(this);queueMicrotask(()=>{if(videoFailure==='corrupt'){this.onerror?.();return;}this.videoWidth=videoMetadata.width;this.videoHeight=videoMetadata.height;this.duration=videoMetadata.duration;this.onloadedmetadata?.();this.onloadeddata?.();});};
  }return node;
 },querySelectorAll:selector=>selector==='[data-stage]'?tabs:selector==='input[type=file]'?fileInputs:selector==='video'?[...new Set([...ids.values()].flatMap(n=>[...(n.tagName==='VIDEO'?[n]:[]),...n.querySelectorAll('video')]))]:[],addEventListener:(name,fn)=>documentEvents.set(name,fn)};
 const requests=[],prepared=[],uploaded=[],putRequests=[];let releaseFirst,serverConfig=serverValue;
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
  return{ok:true,status:200,json:async()=>({images:[...existing,...uploaded],limit:200})};
 };
 const events=new Map(),context=vm.createContext({document,window:{addEventListener:(name,handler)=>events.set(name,handler)},Image:Node,__cast:cast,URL:{createObjectURL(blob){const url='blob:test-'+objectUrls.length;objectUrls.push({url,blob});return url;},revokeObjectURL:url=>revoked.push(url)},Blob,AbortController,console,setTimeout:(fn,delay)=>{timerDelays.push(delay);return setTimeout(fn,delay);},clearTimeout,confirm:()=>true,fetch,__useRealVideo:realVideoPreparation,__prepare:async file=>{prepared.push(file.name);if(file.name===decodeFailure)throw Error('画像を読み込めません。');return{type:'image/webp',filename:file.name};},__prepareVideo:async file=>{prepared.push(file.name);if(file.name===decodeFailure)throw Error('MP4を再生できません。');return{type:'video/mp4',filename:file.name};}});
 const hooks=`prepareImage=__prepare;if(!__useRealVideo)prepareVideo=__prepareVideo;globalThis.qa={configure(value){config=value;draft=draftConfig(value);allowed=true;dirty=false;stageId=1;render();lock(false);},select(id){stageId=id;render();},dirty(){changed();},state(){return{draft,dirty,busy,stageId};},upload:file=>upload(file,'reward'),uploadPortrait:file=>upload(file,'portrait'),reload:load,video:prepareVideo,fileError:rewardFileError,isVideoFile,save(){return $('configForm').onsubmit({preventDefault(){}});}};`;
 vm.runInContext('const {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL}=__cast;\n'+source.replace(/^import .*;\r?$/gm,'')+'\n'+hooks,context);
 await new Promise(setImmediate);if(!realLoad)context.qa.configure(serverValue);
 return{qa:context.qa,node:id=>document.getElementById(id),requests,prepared,uploaded,releaseFirst,events,document,documentEvents,validationVideos,objectUrls,revoked,timerDelays,putRequests};
}


test('empty and legacy stages show one slot and keep old images hidden',async()=>{
 const f=await harness({realLoad:true});
 assert.equal(f.node('stageRewardState').textContent,'未登録');
 assert.equal(f.node('stageRewardPreview').hidden,true);
 assert.equal(f.node('removeStageRewardButton').disabled,true);
 assert.equal(f.node('stageRewardFile').src,undefined);
 const after=f.qa.state().draft;
 assert.deepEqual(copy(after.stages[0].gallery),config().stages[0].gallery);
 await f.qa.reload();
 assert.equal(f.node('configFields').disabled,false);
});

test('upload is scoped to the selected stage and moves an old photo to a spare slot',async()=>{
 const input=config();
 input.stages[0].gallery[2]=null;
 const f=await harness({serverValue:input,pauseFirstUpload:true}),before=copy(f.qa.state().draft);
 const pending=f.qa.upload(mp4);
 for(let i=0;i<30&&f.requests.length===0;i++)await new Promise(setImmediate);
 assert.equal(f.qa.state().busy,true);
 assert.equal(f.node('configFields').disabled,true);
 f.node('stageSelect').onchange({target:{value:'2'}});
 assert.equal(f.qa.state().stageId,1);
 await f.qa.upload(mp4);assert.equal(f.requests.length,1);
 f.releaseFirst();await pending;

 const draft=f.qa.state().draft;
 assert.deepEqual(copy(draft.stages.slice(1)),before.stages.slice(1));
 assert.equal(draft.stages[0].gallery[0],'new-1');
 assert.equal(draft.stages[0].gallery[2],before.stages[0].gallery[0]);
 assert.deepEqual(copy(draft.stages[0].rewards),before.stages[0].rewards);
 assert.equal(draft.mediaTypes['new-1'],'video/mp4');
 assert.equal(f.putRequests.length,0);
 assert.equal(f.node('stageRewardPreview').src,'/api/mahjong/assets/new-1');
 assert.equal(f.node('stageRewardPreview').autoplay,false);
 assert.equal(f.node('stageRewardPreview').controls,true);
 assert.equal(f.node('configFields').disabled,false);
 await f.qa.save();
 assert.equal(f.putRequests[0].version,7);
 assert.equal(f.putRequests[0].stages[0].gallery[0],'new-1');
 assert.equal(f.qa.state().draft.version,8);
});

test('a full legacy album replaces its first reference only and never deletes uploaded assets',async()=>{
 const f=await harness(),before=copy(f.qa.state().draft.stages[0]);
 await f.qa.upload(mp4);
 const after=copy(f.qa.state().draft.stages[0]);
 assert.deepEqual(after,{...before,gallery:['new-1',...before.gallery.slice(1)]});
 assert.equal(f.requests.length,1);
 f.node('removeStageRewardButton').click();
 assert.deepEqual(copy(f.qa.state().draft.stages[0].gallery),[null,...before.gallery.slice(1)]);
 assert.equal(f.node('stageRewardPreview').hidden,true);
 assert.equal(f.node('stageRewardPreview').src,undefined);
 assert.equal(f.requests.length,1);
});

test('only existing MP4 assets appear in the picker and a selected video can replace the current reward',async()=>{
 const current={id:'movie-one',mime:'video/mp4',width:640,height:360,bytes:1048576,inUse:true};
 const existing=[{id:'only-image',mime:'image/webp'},current,{id:'movie-two',mime:'video/mp4',width:320,height:240,bytes:200000}];
 const value=config();value.mediaTypes={'movie-one':'video/mp4'};value.stages[0].gallery[0]=current.id;
 const f=await harness({serverValue:value,existing,realLoad:true}),picker=f.node('stageRewardPicker');
 assert.equal(f.node('stageRewardPreview').src,'/api/mahjong/assets/movie-one');
 assert.deepEqual(Array.from(picker.children,child=>child.value),['','movie-one','movie-two']);
 picker.value='movie-one';picker.onchange();assert.equal(f.node('stageRewardUseButton').disabled,true);
 picker.value='movie-two';picker.onchange();assert.equal(f.node('stageRewardUseButton').disabled,false);
 f.node('stageRewardUseButton').click();
 assert.equal(f.node('stageRewardPreview').src,'/api/mahjong/assets/movie-two');
 assert.equal(f.qa.state().draft.stages[0].gallery[0],'movie-two');
 assert.equal(f.qa.state().draft.mediaTypes['movie-two'],'video/mp4');
 assert.equal(f.requests.length,0);
 assert.equal(f.putRequests.length,0);
});

test('unsupported, oversized and corrupt files preserve the existing video assignment',async()=>{
 const value=config();value.mediaTypes={'older-movie':'video/mp4'};value.stages[0].gallery[0]='older-movie';
 const fixtures=[
  [{...mp4,type:'image/webp',name:'photo.webp'}, {}, /MP4/],
  [{...mp4,size:25*1024*1024+1}, {}, /25MB/],
  [mp4,{decodeFailure:mp4.name},/再生できません/],
  [mp4,{realVideoPreparation:true,videoFailure:'corrupt'},/再生できません/],
  [mp4,{realVideoPreparation:true,videoMetadata:{width:0,height:0,duration:1}},/映像/],
  [mp4,{realVideoPreparation:true,videoFailure:'unsupported'},/ブラウザー/],
 ];
 for(const [file,options,message] of fixtures){
  const f=await harness({...options,serverValue:value});
  await f.qa.upload(file);
  assert.equal(f.qa.state().draft.stages[0].gallery[0],'older-movie');
  assert.equal(f.qa.state().dirty,false);
  assert.equal(f.requests.length,0);
  assert.match(f.node('stageRewardStatus').textContent,message);
 }
});

test('MP4 body is unchanged except for MIME normalization and video validation releases the object URL',async()=>{
 const f=await harness({realVideoPreparation:true});
 const file=new File([Uint8Array.of(1,2,3,4)],'clip.MP4',{type:'application/octet-stream'});
 await f.qa.upload(file);
 const body=f.requests[0].body;
 assert.equal(f.requests[0].headers['Content-Type'],'video/mp4');
 assert.deepEqual(new Uint8Array(await body.arrayBuffer()),Uint8Array.of(1,2,3,4));
 assert.ok(f.timerDelays.includes(120000));
 assert.equal(f.validationVideos.length,1);
 assert.equal(f.validationVideos[0].src,undefined);
 assert.deepEqual(f.revoked,f.objectUrls.map(item=>item.url));
});

test('a rate-limited upload leaves the previous draft available',async()=>{
 const f=await harness({uploadFailureAt:1,rateLimit:true}),before=copy(f.qa.state().draft);
 await f.qa.upload(mp4);
 assert.deepEqual(copy(f.qa.state().draft),before);
 assert.equal(f.qa.state().busy,false);
 assert.equal(f.qa.state().dirty,false);
 assert.match(f.node('stageRewardStatus').textContent,/17秒/);
});

test('backgrounding and stage changes release the MP4 preview without autoplay',async()=>{
 const value=config();value.mediaTypes={'older-movie':'video/mp4'};value.stages[0].gallery[0]='older-movie';
 const f=await harness({serverValue:value});
 const video=f.node('stageRewardPreview');
 assert.match(video.src,/older-movie$/);
 f.document.hidden=true;f.documentEvents.get('visibilitychange')();
 assert.equal(video.src,undefined);assert.ok(video.pauses>0);
 f.document.hidden=false;f.documentEvents.get('visibilitychange')();
 assert.match(video.src,/older-movie$/);assert.equal(video.autoplay,false);
 f.node('stageSelect').onchange({target:{value:'2'}});
 assert.equal(video.src,undefined);assert.equal(video.hidden,true);
});
