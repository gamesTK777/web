import {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL} from './cast.mjs?v=20261109-mp4';
const $=id=>document.getElementById(id),clone=value=>JSON.parse(JSON.stringify(value));
let config=null,draft=null,stageId=1,busy=false,dirty=false,allowed=false;
const galleryNames=new Map();let galleryDragDepth=0;
const endpoint='/api/mahjong/';
const bundledBase='https://gamestk777.github.io/web/mahjong/assets/cast/';
const MEDIA_ACCEPT='image/png,image/jpeg,image/webp,video/mp4,.mp4';
let inventoryItems=[],inventoryLimit=200,previewsSuspended=false;
const draftConfig=value=>({...clone(value),mediaTypes:{...(value.mediaTypes||{})},stages:value.stages.map(stage=>({...clone(stage),name:displayStageName(stage),gallery:Array.from({length:10},(_,i)=>stage.gallery?.[i]??null)}))});
function status(message,error=false){$('adminStatus').textContent=message;$('adminStatus').classList.toggle('error',error);}
async function request(path,{method='GET',body,raw=false}={}){
 const videoUpload=raw&&body?.type==='video/mp4',controller=new AbortController(),timer=setTimeout(()=>controller.abort(),videoUpload?120000:30000);
 try{const response=await fetch(endpoint+path,{method,credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:body?{'Content-Type':raw?body.type:'application/json'}:{},body:body?(raw?body:JSON.stringify(body)):undefined});const value=await response.json();if(!response.ok){const error=new Error(value.error||'通信に失敗しました。');error.status=response.status;const retry=Number(response.headers?.get('Retry-After'));error.retryAfter=Number.isFinite(retry)&&retry>0?Math.ceil(retry):null;throw error;}return value;}
 finally{clearTimeout(timer);}
}
function lock(value){busy=value;$('configFields').disabled=value||!allowed;$('stageSelect').disabled=value;document.querySelectorAll('[data-stage]').forEach(b=>b.disabled=value);$('galleryDropZone').setAttribute('aria-disabled',String(value||!allowed));}
function changed(){dirty=true;$('saveState').textContent='未保存の変更があります。';}
function isVideoFile(file){const type=String(file?.type||'').toLowerCase().split(';')[0].trim();return type==='video/mp4'||(['','application/octet-stream'].includes(type)&&/\.mp4$/i.test(file?.name||''));}
function mediaType(id){return draft?.mediaTypes?.[id]||'image/webp';}
function rememberMedia(asset,blob){draft.mediaTypes[asset.id]=asset.mime||blob?.type||'image/webp';}
function releaseVideo(video){if(!video)return;video.onerror=null;try{video.pause?.();}catch{}video.removeAttribute?.('src');try{video.load?.();}catch{}}
function releaseVideos(root=document){for(const video of root?.querySelectorAll?.('video')||[])releaseVideo(video);}
function configureVideo(video,label){video.controls=true;video.playsInline=true;video.preload='metadata';video.autoplay=false;video.setAttribute('playsinline','');video.setAttribute('aria-label',label);video.onplay=()=>{for(const other of document.querySelectorAll('video'))if(other!==video)try{other.pause();}catch{}};}
function createMediaNode({id,url,mime=mediaType(id),label,active=true,onError}){
 const video=mime==='video/mp4',node=video?document.createElement('video'):new Image();
 if(video)configureVideo(node,label);else{node.alt=label;node.decoding='async';node.loading='lazy';}
 node.onerror=()=>{if(video)releaseVideo(node);onError?.();};if(active)node.src=url||endpoint+'assets/'+encodeURIComponent(id);return node;
}
function preview(img,empty,id,fallback,videoId=null){
 const node=$(img),video=videoId?$(videoId):null,isVideo=!!video&&id&&mediaType(id)==='video/mp4';
 if(video){releaseVideo(video);video.hidden=true;}
 $(empty).hidden=true;node.hidden=!!isVideo;
 if(isVideo){node.removeAttribute?.('src');configureVideo(video,`${videoId.replace(/\D/g,'')}勝目の勝利動画`);video.hidden=false;video.onerror=()=>{releaseVideo(video);video.hidden=true;$(empty).hidden=false;};if(!document.hidden)video.src=endpoint+'assets/'+encodeURIComponent(id);}
 else{node.src=id?endpoint+'assets/'+encodeURIComponent(id):fallback;node.onerror=()=>{node.hidden=true;$(empty).hidden=false;};}
}
function renderInitialCast(){
 const gallery=$('initialCastGallery');if(!gallery)return;
 gallery.replaceChildren(...CAST.map(character=>{
  const stage=character.id,card=document.createElement('article'),title=document.createElement('h3'),grid=document.createElement('div');card.className='builtin-cast-card';grid.className='builtin-cast-images';
  title.textContent=`${String(stage).padStart(2,'0')} / ${character.name}`;card.append(title);
  for(let win=0;win<=3;win++){const figure=document.createElement('figure'),image=new Image(),caption=document.createElement('figcaption');image.loading='lazy';image.decoding='async';image.alt=character.name+'・'+(win?win+'勝目':'対戦画像');image.src=win?defaultRewardURL(stage,win,bundledBase):defaultPortraitURL(stage,bundledBase);caption.textContent=win?win+'勝目':'対戦画像';figure.append(image,caption);grid.append(figure);}
  card.append(grid);return card;
 }));
}
function render(){
 releaseVideos($('configFields'));
 if(document.hidden)previewsSuspended=true;
 const stage=draft.stages[stageId-1];$('stageSelect').value=String(stageId);$('adminStageNumber').textContent=String(stageId).padStart(2,'0');$('editorTitle').textContent=displayStageName(stage);$('adminDifficulty').textContent=`CPU LEVEL ${stageId}`;
 $('characterName').value=stage.name;$('stageAccent').value=stage.accent;
 document.querySelectorAll('[data-stage]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.stage)===stageId);b.setAttribute('aria-current',Number(b.dataset.stage)===stageId?'step':'false');});
 preview('portraitPreview','portraitEmpty',stage.portrait,defaultPortraitURL(stageId,bundledBase));$('removePortraitButton').disabled=!stage.portrait;
 $('portraitSource').textContent=stage.portrait?'登録した画像を使用中':'初期キャストの画像を使用中';
 for(let i=1;i<=3;i++){preview('rewardPreview'+i,'rewardEmpty'+i,stage.rewards[i-1],defaultRewardURL(stageId,i,bundledBase),'rewardVideo'+i);$('removeReward'+i).disabled=!stage.rewards[i-1];$('rewardSource'+i).textContent=stage.rewards[i-1]?(mediaType(stage.rewards[i-1])==='video/mp4'?'登録したMP4動画を使用中':'登録した画像を使用中'):'初期キャストの画像を使用中';}
 const character=getCast(stageId);$('initialCastName').textContent=character.name;
 renderGallery(stage);
 document.querySelectorAll('input[type=file]').forEach(el=>el.value='');
}
async function load(){lock(true);try{config=await request('config');draft=draftConfig(config);galleryNames.clear();dirty=false;render();$('saveState').textContent=`保存済みの設定 · バージョン ${config.version}`;status('管理者として接続しました。画像・動画を登録して設定を保存すると、ゲームのページを読み直した後に反映されます。');await inventory();}catch(error){status(error.message,true);}finally{lock(false);if(draft)render();}}
function galleryFileError(file,{allowVideo=true}={}){
 if(allowVideo&&isVideoFile(file)){if(!Number.isFinite(file.size)||file.size<=0||file.size>25*1024*1024)return'MP4動画は1件25MB以下にしてください。';return'';}
 if(!file||!['image/png','image/jpeg','image/webp'].includes(file.type))return allowVideo?'PNG・JPEG・WebPの画像、またはMP4動画を選んでください。':'対戦画像はPNG・JPEG・WebPの静止画を選んでください。';
 if(!Number.isFinite(file.size)||file.size<=0||file.size>20*1024*1024)return'元画像は1件20MB以下の画像を選んでください。';
 return'';
}
function orderedGalleryFiles(value){
 const files=Array.from(value||[]);if(files.length!==10)throw Error('まとめて登録するときは、画像・動画を合わせてちょうど10件選んでください。');
 for(const file of files){const error=galleryFileError(file);if(error)throw Error(`${file?.name||'選択したファイル'}：${error}`);}
 return files.map((file,index)=>({file,index})).sort((a,b)=>String(a.file.name).localeCompare(String(b.file.name),'ja',{numeric:true,sensitivity:'base'})||a.index-b.index).map(entry=>entry.file);
}
function galleryFailure(error,uploaded=0){
 const retry=error.status===429?` ${error.retryAfter?error.retryAfter+'秒ほど':'少し'}待ってから再試行してください。`:'';
 const unused=uploaded?` アップロード済み${uploaded}件は未使用素材として素材管理に残っています。`:'';
 return `${error.message}${retry} ご褒美10件の並びは変更していません。${unused}`;
}
function renderGallery(stage){
 const names=galleryNames.get(stage.id)||[];$('galleryCount').textContent=`登録 ${stage.gallery.filter(Boolean).length} / 10件`;
 $('galleryClearButton').disabled=busy||!allowed||!stage.gallery.some(Boolean);
 const cards=stage.gallery.map((id,index)=>{
  const card=document.createElement('article'),head=document.createElement('div'),number=document.createElement('b'),name=document.createElement('span'),frame=document.createElement('div'),controls=document.createElement('div');
  card.className='gallery-slot';head.className='gallery-slot-heading';number.textContent=String(index+1).padStart(2,'0');name.textContent=names[index]||(id?(mediaType(id)==='video/mp4'?'登録したMP4動画':'登録した画像'):'未登録');name.title=name.textContent;head.append(number,name);frame.className='gallery-slot-preview';
  if(id){const node=createMediaNode({id,label:`ご褒美 ${index+1}件目${mediaType(id)==='video/mp4'?'の動画':''}`,active:!document.hidden,onError:()=>{const note=document.createElement('p');note.textContent='画像・動画を読み込めません';frame.replaceChildren(note);}});frame.append(node);}else{const empty=document.createElement('p');empty.textContent='画像・動画を登録';frame.append(empty);}
  controls.className='gallery-slot-controls';
  const choose=document.createElement('label'),file=document.createElement('input');choose.className='upload-button';choose.textContent='差し替え';file.type='file';file.accept=MEDIA_ACCEPT;file.disabled=busy||!allowed;file.setAttribute('aria-label',`ご褒美${index+1}件目の画像・動画を選ぶ`);file.onchange=event=>void uploadGallerySlot(event.target.files[0],index);choose.append(file);
  const remove=document.createElement('button');remove.type='button';remove.textContent='外す';remove.disabled=busy||!allowed||!id;remove.setAttribute('aria-label',`ご褒美${index+1}件目を外す`);remove.onclick=()=>{if(busy||!allowed)return;stage.gallery[index]=null;const labels=galleryNames.get(stage.id);if(labels)labels[index]='';changed();render();void inventory();};
  const previous=document.createElement('button'),next=document.createElement('button');previous.type=next.type='button';previous.textContent='←';next.textContent='→';previous.setAttribute('aria-label',`ご褒美${index+1}件目を前へ`);next.setAttribute('aria-label',`ご褒美${index+1}件目を次へ`);previous.disabled=busy||!allowed||index===0;next.disabled=busy||!allowed||index===9;previous.onclick=()=>moveGallerySlot(index,-1);next.onclick=()=>moveGallerySlot(index,1);
  controls.append(choose,remove,previous,next);card.append(head,frame,controls);return card;
 });$('gallerySlots').replaceChildren(...cards);
}
function moveGallerySlot(index,direction){
 if(busy||!allowed||!Number.isInteger(index)||![-1,1].includes(direction))return;const to=index+direction;if(index<0||index>9||to<0||to>9)return;
 const stage=draft.stages[stageId-1],names=galleryNames.get(stage.id)||Array(10).fill('');[stage.gallery[index],stage.gallery[to]]=[stage.gallery[to],stage.gallery[index]];[names[index],names[to]]=[names[to],names[index]];galleryNames.set(stage.id,names);changed();render();
}
async function uploadGalleryBatch(value){
 if(busy||!allowed)return;let files;try{files=orderedGalleryFiles(value);}catch(error){$('galleryUploadStatus').textContent=error.message;return;}
 const target=draft.stages[stageId-1];lock(true);$('galleryProgress').hidden=false;$('galleryProgress').value=0;let uploaded=0;
 try{
  const prepared=[];for(let i=0;i<files.length;i++){$('galleryUploadStatus').textContent=`画像・動画を確認中 ${i+1} / 10：${files[i].name}`;prepared.push(await prepareMedia(files[i]));}
  const images=[];for(let i=0;i<prepared.length;i++){$('galleryUploadStatus').textContent=`アップロード中 ${i+1} / 10：${files[i].name}`;images.push(await request('admin/images',{method:'POST',body:prepared[i],raw:true}));uploaded++;$('galleryProgress').value=uploaded;}
  target.gallery=images.map(image=>image.id);images.forEach((image,i)=>rememberMedia(image,prepared[i]));galleryNames.set(target.id,files.map(file=>file.name));changed();render();$('galleryUploadStatus').textContent=`ステージ${target.id}のご褒美10件を登録しました。並びを確認して「設定を保存する」を押してください。`;status('ご褒美画像・動画10件を編集中の設定へ登録しました。まだ公開設定は変更していません。');
 }catch(error){$('galleryUploadStatus').textContent=galleryFailure(error,uploaded);status(error.message,true);}
 finally{await inventory();lock(false);render();}
}
async function uploadGallerySlot(file,index){
 if(!file||busy||!allowed)return;const error=galleryFileError(file);if(error){$('galleryUploadStatus').textContent=error;return;}
 const target=draft.stages[stageId-1];lock(true);$('galleryProgress').hidden=true;$('galleryUploadStatus').textContent=`${index+1}件目を確認・アップロードしています…`;
 try{const blob=await prepareMedia(file),image=await request('admin/images',{method:'POST',body:blob,raw:true});target.gallery[index]=image.id;rememberMedia(image,blob);const names=galleryNames.get(target.id)||Array(10).fill('');names[index]=file.name;galleryNames.set(target.id,names);changed();render();$('galleryUploadStatus').textContent=`${index+1}件目を差し替えました。「設定を保存する」で公開します。`;}
 catch(error){$('galleryUploadStatus').textContent=galleryFailure(error);status(error.message,true);}
 finally{await inventory();lock(false);render();}
}
async function prepareImage(file){
 const error=galleryFileError(file,{allowVideo:false});if(error)throw Error(error);
 const url=URL.createObjectURL(file),image=new Image();
 try{image.src=url;await image.decode();if(!(image.naturalWidth>0&&image.naturalHeight>0))throw Error('画像を読み込めませんでした。');if(image.naturalWidth>12000||image.naturalHeight>12000)throw Error('元画像が大きすぎます。縦横12000px以下にしてください。');
  const scale=Math.min(1,1400/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
  let blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.88));if(!blob)throw Error('画像を変換できませんでした。');
  if(blob.size>2*1024*1024)blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.65));
  if(!blob||blob.size>2*1024*1024)throw Error('画像を2MB以下にできませんでした。小さい画像で再試行してください。');return blob;
 }finally{URL.revokeObjectURL(url);}
}
async function prepareVideo(file){
 const error=galleryFileError(file);if(error)throw Error(error);if(!isVideoFile(file))throw Error('MP4動画を選んでください。');
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
async function prepareMedia(file){return isVideoFile(file)?prepareVideo(file):prepareImage(file);}
async function upload(file,slot){
 if(!file||busy||!allowed)return;const error=galleryFileError(file,{allowVideo:slot!=='portrait'});if(error){$('uploadStatus').textContent=error;return;}lock(true);const target=draft.stages[stageId-1];$('uploadStatus').textContent='画像・動画を確認・アップロードしています…';
 try{const blob=slot==='portrait'?await prepareImage(file):await prepareMedia(file),image=await request('admin/images',{method:'POST',body:blob,raw:true});if(slot==='portrait')target.portrait=image.id;else target.rewards[slot]=image.id;rememberMedia(image,blob);changed();render();$('uploadStatus').textContent=`${blob.type==='video/mp4'?'MP4動画':'画像'}を登録しました（${Math.ceil(image.bytes/1024)}KB）。設定を保存するとゲームへ反映されます。`;await inventory();}
 catch(error){$('uploadStatus').textContent=error.message;status(error.message,true);}finally{lock(false);render();}
}
async function inventory(){
 const panel=$('assetInventory');if(!panel)return;
 try{const {images,limit}=await request('admin/images');inventoryItems=images;inventoryLimit=limit;renderInventory();}
 catch(error){releaseVideos(panel);panel.textContent=error.message;}
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
$('stageSelect').onchange=event=>{if(!busy)stageId=Number(event.target.value);render();};
$('stageTabs').onclick=event=>{const b=event.target.closest('[data-stage]');if(b&&!busy){stageId=Number(b.dataset.stage);render();}};
$('characterName').oninput=event=>{draft.stages[stageId-1].name=event.target.value;changed();};$('stageAccent').oninput=event=>{draft.stages[stageId-1].accent=event.target.value;changed();};
$('portraitFile').onchange=event=>void upload(event.target.files[0],'portrait');$('removePortraitButton').onclick=()=>{draft.stages[stageId-1].portrait=null;changed();render();void inventory();};
for(let i=1;i<=3;i++){$('rewardFile'+i).onchange=event=>void upload(event.target.files[0],i-1);$('removeReward'+i).onclick=()=>{draft.stages[stageId-1].rewards[i-1]=null;changed();render();void inventory();};}
$('galleryFiles').onchange=event=>void uploadGalleryBatch(event.target.files);
$('galleryChooseButton').onclick=()=>{if(!busy&&allowed)$('galleryFiles').click();};
$('galleryClearButton').onclick=()=>{if(busy||!allowed)return;draft.stages[stageId-1].gallery=Array(10).fill(null);galleryNames.delete(stageId);changed();render();void inventory();};
const galleryZone=$('galleryDropZone'),hasDraggedFiles=event=>Array.from(event.dataTransfer?.types||[]).includes('Files');
galleryZone.ondragenter=event=>{if(!hasDraggedFiles(event))return;event.preventDefault();galleryDragDepth++;galleryZone.classList.toggle('is-dragging',!busy&&allowed);};
galleryZone.ondragover=event=>{if(!hasDraggedFiles(event))return;event.preventDefault();if(event.dataTransfer)event.dataTransfer.dropEffect=busy?'none':'copy';};
galleryZone.ondragleave=event=>{if(!hasDraggedFiles(event))return;event.preventDefault();galleryDragDepth=Math.max(0,galleryDragDepth-1);if(!galleryDragDepth)galleryZone.classList.toggle('is-dragging',false);};
galleryZone.ondrop=event=>{if(!hasDraggedFiles(event))return;event.preventDefault();galleryDragDepth=0;galleryZone.classList.toggle('is-dragging',false);void uploadGalleryBatch(event.dataTransfer.files);};
galleryZone.onclick=()=>{if(!busy&&allowed)$('galleryFiles').click();};
galleryZone.onkeydown=event=>{if(event.target===galleryZone&&['Enter',' '].includes(event.key)){event.preventDefault();if(!event.repeat&&!busy&&allowed)$('galleryFiles').click();}};
window.addEventListener('dragover',event=>{if(hasDraggedFiles(event))event.preventDefault();});
window.addEventListener('drop',event=>{if(hasDraggedFiles(event)){event.preventDefault();if(!event.target.closest?.('#galleryDropZone'))$('galleryUploadStatus').textContent='画像・動画は「10件をまとめてドロップ」の枠へ入れてください。';}});
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
