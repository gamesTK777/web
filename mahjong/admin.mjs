import {CAST,getCast,displayStageName,defaultPortraitURL} from './cast.mjs?v=20261120-stage-video';
const $=id=>document.getElementById(id),clone=value=>JSON.parse(JSON.stringify(value));
let config=null,draft=null,stageId=1,busy=false,dirty=false,allowed=false;
const endpoint='/api/mahjong/';
const bundledBase='https://gamestk777.github.io/web/mahjong/assets/cast/';
let inventoryItems=[],inventoryLimit=200,previewsSuspended=false;
const draftConfig=value=>({...clone(value),mediaTypes:{...(value.mediaTypes||{})},stages:value.stages.map(stage=>({...clone(stage),name:displayStageName(stage),gallery:Array.from({length:10},(_,i)=>stage.gallery?.[i]??null)}))});
function status(message,error=false){$('adminStatus').textContent=message;$('adminStatus').classList.toggle('error',error);}
async function request(path,{method='GET',body,raw=false}={}){
 const videoUpload=raw&&body?.type==='video/mp4',controller=new AbortController(),timer=setTimeout(()=>controller.abort(),videoUpload?120000:30000);
 try{const response=await fetch(endpoint+path,{method,credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:body?{'Content-Type':raw?body.type:'application/json'}:{},body:body?(raw?body:JSON.stringify(body)):undefined});const value=await response.json();if(!response.ok){const error=new Error(value.error||'通信に失敗しました。');error.status=response.status;const retry=Number(response.headers?.get('Retry-After'));error.retryAfter=Number.isFinite(retry)&&retry>0?Math.ceil(retry):null;throw error;}return value;}
 finally{clearTimeout(timer);}
}
function lock(value){busy=value;$('configFields').disabled=value||!allowed;$('stageSelect').disabled=value;document.querySelectorAll('[data-stage]').forEach(b=>b.disabled=value);refreshRewardActions();}
function changed(){dirty=true;$('saveState').textContent='未保存の変更があります。';}
function isVideoFile(file){const type=String(file?.type||'').toLowerCase().split(';')[0].trim();return type==='video/mp4'||(['','application/octet-stream'].includes(type)&&/\.mp4$/i.test(file?.name||''));}
function mediaType(id){return draft?.mediaTypes?.[id]||'image/webp';}
function rememberMedia(asset,blob){draft.mediaTypes[asset.id]=asset.mime||blob?.type||'image/webp';}
function releaseVideo(video){if(!video)return;video.onerror=null;delete video.dataset.rewardId;try{video.pause?.();}catch{}video.removeAttribute?.('src');try{video.load?.();}catch{}}
function releaseVideos(root=document){for(const video of root?.querySelectorAll?.('video')||[])releaseVideo(video);}
function configureVideo(video,label){video.controls=true;video.playsInline=true;video.preload='metadata';video.autoplay=false;video.setAttribute('playsinline','');video.setAttribute('aria-label',label);video.onplay=()=>{for(const other of document.querySelectorAll('video'))if(other!==video)try{other.pause();}catch{}};}
function createMediaNode({id,url,mime=mediaType(id),label,active=true,onError}){
 const video=mime==='video/mp4',node=video?document.createElement('video'):new Image();
 if(video)configureVideo(node,label);else{node.alt=label;node.decoding='async';node.loading='lazy';}
 node.onerror=()=>{if(video)releaseVideo(node);onError?.();};if(active)node.src=url||endpoint+'assets/'+encodeURIComponent(id);return node;
}
function renderPortrait(stage) {
 const image=$('portraitPreview'), empty=$('portraitEmpty');
 image.hidden=false;empty.hidden=true;
 const url=stage.portrait?endpoint+'assets/'+encodeURIComponent(stage.portrait):defaultPortraitURL(stageId,bundledBase);
 image.onerror=()=>{image.hidden=true;empty.hidden=false;};
 image.src=url;
 $('removePortraitButton').disabled=!stage.portrait;
 $('portraitSource').textContent=stage.portrait?'登録した画像を使用中':'初期キャストの画像を使用中';
}
function rewardId(stage) {
 const id=stage?.gallery[0];
 return id&&mediaType(id)==='video/mp4'?id:null;
}
function setRewardVideo(stage,id) {
 // Slot 0 can contain a legacy photo. Preserve its association whenever the album has room.
 const previous=stage.gallery[0];
 if(previous&&mediaType(previous)!=='video/mp4'&&!stage.gallery.slice(1).includes(previous)){
  const spare=stage.gallery.indexOf(null,1);
  if(spare!==-1)stage.gallery[spare]=previous;
 }
 stage.gallery[0]=id;
}
function refreshRewardActions() {
 const current=rewardId(draft?.stages[stageId-1]);
 const picker=$('stageRewardPicker'),candidate=picker.value;
 const available=inventoryItems.some(item=>item.id===candidate&&item.mime==='video/mp4');
 picker.disabled=busy||!allowed||!inventoryItems.some(item=>item.mime==='video/mp4');
 $('stageRewardUseButton').disabled=busy||!allowed||!available||candidate===current;
 $('removeStageRewardButton').disabled=busy||!allowed||!current;
}
function renderRewardPicker() {
 const picker=$('stageRewardPicker'),previous=picker.value;
 const placeholder=document.createElement('option');
 placeholder.value='';placeholder.textContent='動画を選ぶ';
 const videos=inventoryItems.filter(item=>item.mime==='video/mp4');
 picker.replaceChildren(placeholder,...videos.map(item=>{
  const option=document.createElement('option');
  const date=new Date(item.createdAt);
  const day=Number.isFinite(date.getTime())?date.toLocaleDateString('ja-JP')+' · ':'';
  option.value=item.id;
  option.textContent=day+item.width+'×'+item.height+' · '+(item.bytes/1048576).toFixed(1)+' MB · '+item.id.slice(-8);
  return option;
 }));
 picker.value=videos.some(item=>item.id===previous)?previous:'';
 refreshRewardActions();
}
function renderReward(stage) {
 const id=rewardId(stage),video=$('stageRewardPreview'),empty=$('stageRewardEmpty');
 $('stageRewardState').textContent=id?'登録あり':'未登録';
 refreshRewardActions();
 if(!id){
  if(video.dataset.rewardId)releaseVideo(video);
  video.hidden=true;empty.hidden=false;empty.textContent='ご褒美動画は未登録です。';
  return;
 }
 if(document.hidden||previewsSuspended||video.dataset.rewardId===id)return;
 if(video.dataset.rewardId)releaseVideo(video);
 video.hidden=false;empty.hidden=true;
 configureVideo(video,'ステージ'+stage.id+'のご褒美動画');
 video.dataset.rewardId=id;
 video.onerror=()=>{
  if(video.dataset.rewardId!==id)return;
  releaseVideo(video);video.hidden=true;empty.hidden=false;empty.textContent='プレビューを読み込めませんでした。';
 };
 video.src=endpoint+'assets/'+encodeURIComponent(id);
}
function renderInitialCast(){
 const gallery=$('initialCastGallery');if(!gallery)return;
 gallery.replaceChildren(...CAST.map(character=>{
  const stage=character.id,card=document.createElement('article'),title=document.createElement('h3'),grid=document.createElement('div');card.className='builtin-cast-card';grid.className='builtin-cast-images';
  title.textContent=`${String(stage).padStart(2,'0')} / ${character.name}`;card.append(title);
  const figure=document.createElement('figure'),image=new Image();image.loading='lazy';image.decoding='async';image.alt=character.name+'の対戦画像';image.src=defaultPortraitURL(stage,bundledBase);figure.append(image);grid.append(figure);
  card.append(grid);return card;
 }));
}
function render(){
 if(document.hidden)previewsSuspended=true;
 const stage=draft.stages[stageId-1];$('stageSelect').value=String(stageId);$('adminStageNumber').textContent=String(stageId).padStart(2,'0');$('editorTitle').textContent=displayStageName(stage);$('adminDifficulty').textContent=`CPU LEVEL ${stageId}`;
 $('characterName').value=stage.name;$('stageAccent').value=stage.accent;
 document.querySelectorAll('[data-stage]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.stage)===stageId);b.setAttribute('aria-current',Number(b.dataset.stage)===stageId?'step':'false');});
 renderPortrait(stage);
 $('initialCastName').textContent=getCast(stageId).name;
 renderReward(stage);
 document.querySelectorAll('input[type=file]').forEach(el=>el.value='');
}
async function load(){lock(true);try{config=await request('config');draft=draftConfig(config);dirty=false;$('stageRewardStatus').textContent='';render();$('saveState').textContent=`保存済みの設定 · バージョン ${config.version}`;status('対戦相手とご褒美動画を編集できます。設定を保存し、ゲームのページを開き直すと反映されます。');await inventory();}catch(error){status(error.message,true);}finally{lock(false);if(draft)render();}}
function portraitFileError(file) {
 if(!file||!['image/png','image/jpeg','image/webp'].includes(file.type))return '対戦画像はPNG・JPEG・WebPの静止画を選んでください。';
 if(!Number.isFinite(file.size)||file.size<=0||file.size>20*1024*1024)return '元画像は1件20MB以下の画像を選んでください。';
 return '';
}
function rewardFileError(file) {
 if(!isVideoFile(file))return 'ご褒美にはMP4動画を選んでください。';
 if(!Number.isFinite(file.size)||file.size<=0||file.size>25*1024*1024)return 'MP4動画は1件25MB以下にしてください。';
 return '';
}
async function prepareImage(file){
 const error=portraitFileError(file);if(error)throw Error(error);
 const url=URL.createObjectURL(file),image=new Image();
 try{image.src=url;await image.decode();if(!(image.naturalWidth>0&&image.naturalHeight>0))throw Error('画像を読み込めませんでした。');if(image.naturalWidth>12000||image.naturalHeight>12000)throw Error('元画像が大きすぎます。縦横12000px以下にしてください。');
  const scale=Math.min(1,1400/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
  let blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.88));if(!blob)throw Error('画像を変換できませんでした。');
  if(blob.size>2*1024*1024)blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.65));
  if(!blob||blob.size>2*1024*1024)throw Error('画像を2MB以下にできませんでした。小さい画像で再試行してください。');return blob;
 }finally{URL.revokeObjectURL(url);}
}
async function prepareVideo(file){
 const error=rewardFileError(file);if(error)throw Error(error);
 const video=document.createElement('video');
 if(video.canPlayType&&video.canPlayType('video/mp4')==='')throw Error('このブラウザーではMP4を再生できません。H.264/AAC形式のMP4をご使用ください。');
 // Blob wrapping changes only the MIME label; the original MP4 bytes are not
 // decoded to a canvas, resized, recompressed or re-encoded.
 const blob=file.type==='video/mp4'?file:new Blob([file],{type:'video/mp4'}),url=URL.createObjectURL(blob);
 try{
  video.muted=true;video.playsInline=true;video.preload='auto';video.autoplay=false;
  await new Promise((resolve,reject)=>{
   let settled=false;const finish=error=>{if(settled)return;settled=true;clearTimeout(timer);error?reject(error):resolve();};
   const timer=setTimeout(()=>finish(Error('MP4を読み込めませんでした。H.264/AAC形式の、破損していない動画をご使用ください。')),20000);
   const metadataError=()=>!(video.videoWidth>0&&video.videoHeight>0&&Number.isFinite(video.duration)&&video.duration>0);
   video.onerror=()=>finish(Error('MP4を再生できません。H.264/AAC形式の、破損していない動画をご使用ください。'));
   video.onloadedmetadata=()=>{if(metadataError())finish(Error('映像を含むMP4動画を選んでください。'));};
   video.onloadeddata=()=>finish(metadataError()?Error('MP4の映像情報を確認できませんでした。'):null);
   video.src=url;try{video.load();}catch{finish(Error('MP4を読み込めませんでした。'));}
  });
  return blob;
 }finally{video.onloadedmetadata=null;video.onloadeddata=null;releaseVideo(video);URL.revokeObjectURL(url);}
}
async function upload(file,kind) {
 if(!file||busy||!allowed)return;
 const portrait=kind==='portrait',feedback=$(portrait?'uploadStatus':'stageRewardStatus');
 const input=$(portrait?'portraitFile':'stageRewardFile');
 const error=portrait?portraitFileError(file):rewardFileError(file);
 if(error){feedback.textContent=error;input.value='';return;}
 const target=draft.stages[stageId-1];
 lock(true);
 feedback.textContent=portrait?'対戦画像をアップロードしています…':'MP4を確認してアップロードしています…';
 try{
  const blob=portrait?await prepareImage(file):await prepareVideo(file);
  const asset=await request('admin/images',{method:'POST',body:blob,raw:true});
  if(!portrait&&asset.mime!=='video/mp4')throw Error('MP4動画を登録できませんでした。');
  rememberMedia(asset,blob);
  if(portrait)target.portrait=asset.id;
  else setRewardVideo(target,asset.id);
  changed();
  render();
  feedback.textContent=portrait?'対戦画像を登録しました。「設定を保存する」で反映されます。':'MP4を登録しました。「設定を保存する」で反映されます。';
  await inventory();
 }catch(error){
  const retry=error.status===429?` ${error.retryAfter?error.retryAfter+'秒ほど':'少し'}待ってから再試行してください。`:'';
  feedback.textContent=error.message+retry;
 }finally{
  lock(false);
  input.value='';
 }
}
async function inventory(){
 const panel=$('assetInventory');if(!panel)return;
 try{const {images,limit}=await request('admin/images');inventoryItems=images;inventoryLimit=limit;renderRewardPicker();renderInventory();}
 catch(error){inventoryItems=[];renderRewardPicker();releaseVideos(panel);panel.textContent=error.message;}
}
function renderInventory(){
 const panel=$('assetInventory');if(!panel)return;releaseVideos(panel);$('assetCount').textContent=`登録素材 ${inventoryItems.length} / ${inventoryLimit}件`;
 panel.replaceChildren(...inventoryItems.map(image=>{
  const row=document.createElement('div');row.className='asset-row';const mime=image.mime||mediaType(image.id),video=mime==='video/mp4';
  const node=createMediaNode({id:image.id,url:image.url,mime,label:video?'登録したMP4動画':'登録した画像',active:!video||$('assetLibrary').open&&!document.hidden});
  const info=document.createElement('span'),locallyUsed=draft?.stages.some(s=>s.portrait===image.id||s.rewards.includes(image.id)||s.gallery.includes(image.id));
  info.textContent=`${video?'MP4動画':'画像'} · ${image.width}×${image.height} · ${image.bytes>=1024*1024?(image.bytes/1024/1024).toFixed(1)+'MB':Math.ceil(image.bytes/1024)+'KB'} · ${image.inUse?'公開中':locallyUsed?'編集中の設定で使用':'未使用'}`;
  const button=document.createElement('button');button.type='button';button.className='quiet';button.textContent='完全に削除';button.disabled=image.inUse||locallyUsed;
  button.onclick=async()=>{if(busy||!confirm('この未使用素材を完全に削除します。元に戻せません。よろしいですか？'))return;lock(true);try{await request('admin/images/'+image.id,{method:'DELETE'});await inventory();status('未使用素材を削除しました。');}catch(error){status(error.message,true);}finally{lock(false);}};
  row.append(node,info,button);return row;
 }));
}
function selectStage(id) {
 if(!allowed||busy||!Number.isInteger(id)||id<1||id>7)return;
 stageId=id;
 $('stageRewardStatus').textContent='';
 $('stageRewardPicker').value='';
 render();
}
$('stageSelect').onchange=event=>selectStage(Number(event.target.value));
$('stageTabs').onclick=event=>{const button=event.target.closest('[data-stage]');if(button)selectStage(Number(button.dataset.stage));};
$('characterName').oninput=event=>{if(!busy&&allowed){draft.stages[stageId-1].name=event.target.value;changed();}};
$('stageAccent').oninput=event=>{if(!busy&&allowed){draft.stages[stageId-1].accent=event.target.value;changed();}};
$('portraitFile').onchange=event=>void upload(event.target.files[0],'portrait');
$('removePortraitButton').onclick=()=>{if(busy||!allowed)return;draft.stages[stageId-1].portrait=null;changed();render();void inventory();};
$('stageRewardFile').onchange=event=>void upload(event.target.files[0],'reward');
$('stageRewardPicker').onchange=refreshRewardActions;
$('stageRewardUseButton').onclick=()=>{
 if(busy||!allowed)return;
 const id=$('stageRewardPicker').value,asset=inventoryItems.find(item=>item.id===id&&item.mime==='video/mp4');
 if(!asset||id===rewardId(draft.stages[stageId-1]))return;
 rememberMedia(asset,asset);
 setRewardVideo(draft.stages[stageId-1],id);
 changed();render();renderInventory();
 $('stageRewardStatus').textContent='選んだMP4を設定しました。「設定を保存する」で反映されます。';
};
$('removeStageRewardButton').onclick=()=>{
 if(busy||!allowed)return;
 const stage=draft.stages[stageId-1];
 if(!rewardId(stage))return;
 stage.gallery[0]=null;
 changed();render();renderInventory();
 $('stageRewardStatus').textContent='ご褒美動画を外しました。「設定を保存する」で反映されます。';
};
$('reloadConfigButton').onclick=()=>{if(!dirty||confirm('未保存の変更を破棄して、最新の設定を読み直しますか？'))void load();};
$('configForm').onsubmit=async event=>{event.preventDefault();if(busy||!allowed)return;lock(true);try{const saved=await request('admin/config',{method:'PUT',body:{version:draft.version,stages:draft.stages}});config=saved;draft=draftConfig(saved);dirty=false;$('saveState').textContent=`保存済みの設定 · バージョン ${saved.version}`;status('設定を保存しました。ゲームのページを読み直すと反映されます。');render();await inventory();}catch(error){status(error.status===409?error.message+' 未保存の内容は残しています。「読み直す」で最新設定を確認してください。':error.message,true);}finally{lock(false);render();}};
window.addEventListener('beforeunload',event=>{if(dirty||busy){event.preventDefault();event.returnValue='';}});
function suspendPreviews(){releaseVideos(document);previewsSuspended=true;}
function resumePreviews(){if(document.hidden||!previewsSuspended)return;previewsSuspended=false;if(draft)render();renderInventory();}
document.addEventListener?.('visibilitychange',()=>document.hidden?suspendPreviews():resumePreviews());
window.addEventListener('pagehide',suspendPreviews);window.addEventListener('pageshow',resumePreviews);
$('assetLibrary').ontoggle=()=>{if($('assetLibrary').open)renderInventory();else releaseVideos($('assetInventory'));};
async function init(){
 try{const auth=await request('admin');allowed=auth.canManage===true;$('loginPanel').hidden=allowed;$('adminEditor').hidden=!allowed;
  if(!allowed){status(auth.authenticated?'このアカウントには編集権限がありません。サイト所有者のアカウントでサインインしてください。':'画像・動画を登録するには、サイト所有者としてサインインしてください。');return;}
  await load();
 }catch(error){status('管理画面に接続できませんでした。'+error.message,true);}
}
renderInitialCast();void init();
