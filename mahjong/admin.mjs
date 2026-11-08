import {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL} from './cast.mjs?v=20261108-gallery';
const $=id=>document.getElementById(id),clone=value=>JSON.parse(JSON.stringify(value));
let config=null,draft=null,stageId=1,busy=false,dirty=false,allowed=false;
const galleryNames=new Map();let galleryDragDepth=0;
const endpoint='/api/mahjong/';
const bundledBase='https://gamestk777.github.io/web/mahjong/assets/cast/';
const draftConfig=value=>({...clone(value),stages:value.stages.map(stage=>({...clone(stage),name:displayStageName(stage),gallery:Array.from({length:10},(_,i)=>stage.gallery?.[i]??null)}))});
function status(message,error=false){$('adminStatus').textContent=message;$('adminStatus').classList.toggle('error',error);}
async function request(path,{method='GET',body,raw=false}={}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
 try{const response=await fetch(endpoint+path,{method,credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:body?{'Content-Type':raw?body.type:'application/json'}:{},body:body?(raw?body:JSON.stringify(body)):undefined});const value=await response.json();if(!response.ok){const error=new Error(value.error||'通信に失敗しました。');error.status=response.status;const retry=Number(response.headers?.get('Retry-After'));error.retryAfter=Number.isFinite(retry)&&retry>0?Math.ceil(retry):null;throw error;}return value;}
 finally{clearTimeout(timer);}
}
function lock(value){busy=value;$('configFields').disabled=value||!allowed;$('stageSelect').disabled=value;document.querySelectorAll('[data-stage]').forEach(b=>b.disabled=value);$('galleryDropZone').setAttribute('aria-disabled',String(value||!allowed));}
function changed(){dirty=true;$('saveState').textContent='未保存の変更があります。';}
function preview(img,empty,id,fallback){
 const node=$(img);node.hidden=false;$(empty).hidden=true;node.src=id?endpoint+'assets/'+encodeURIComponent(id):fallback;
 node.onerror=()=>{node.hidden=true;$(empty).hidden=false;};
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
 const stage=draft.stages[stageId-1];$('stageSelect').value=String(stageId);$('adminStageNumber').textContent=String(stageId).padStart(2,'0');$('editorTitle').textContent=displayStageName(stage);$('adminDifficulty').textContent=`CPU LEVEL ${stageId}`;
 $('characterName').value=stage.name;$('stageAccent').value=stage.accent;
 document.querySelectorAll('[data-stage]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.stage)===stageId);b.setAttribute('aria-current',Number(b.dataset.stage)===stageId?'step':'false');});
 preview('portraitPreview','portraitEmpty',stage.portrait,defaultPortraitURL(stageId,bundledBase));$('removePortraitButton').disabled=!stage.portrait;
 $('portraitSource').textContent=stage.portrait?'登録した画像を使用中':'初期キャストの画像を使用中';
 for(let i=1;i<=3;i++){preview('rewardPreview'+i,'rewardEmpty'+i,stage.rewards[i-1],defaultRewardURL(stageId,i,bundledBase));$('removeReward'+i).disabled=!stage.rewards[i-1];$('rewardSource'+i).textContent=stage.rewards[i-1]?'登録した画像を使用中':'初期キャストの画像を使用中';}
 const character=getCast(stageId);$('initialCastName').textContent=character.name;
 renderGallery(stage);
 document.querySelectorAll('input[type=file]').forEach(el=>el.value='');
}
async function load(){lock(true);try{config=await request('config');draft=draftConfig(config);galleryNames.clear();dirty=false;render();$('saveState').textContent=`保存済みの設定 · バージョン ${config.version}`;status('管理者として接続しました。画像を登録して設定を保存すると、新しく始める対局へ反映されます。');await inventory();}catch(error){status(error.message,true);}finally{lock(false);if(draft)render();}}
function galleryFileError(file){
 if(!file||!['image/png','image/jpeg','image/webp'].includes(file.type))return'PNG・JPEG・WebPの静止画を選んでください。';
 if(!Number.isFinite(file.size)||file.size<=0||file.size>20*1024*1024)return'元画像は1枚20MB以下の画像を選んでください。';
 return'';
}
function orderedGalleryFiles(value){
 const files=Array.from(value||[]);if(files.length!==10)throw Error('まとめて登録するときは、画像をちょうど10枚選んでください。');
 for(const file of files){const error=galleryFileError(file);if(error)throw Error(`${file?.name||'選択したファイル'}：${error}`);}
 return files.map((file,index)=>({file,index})).sort((a,b)=>String(a.file.name).localeCompare(String(b.file.name),'ja',{numeric:true,sensitivity:'base'})||a.index-b.index).map(entry=>entry.file);
}
function galleryFailure(error,uploaded=0){
 const retry=error.status===429?` ${error.retryAfter?error.retryAfter+'秒ほど':'少し'}待ってから再試行してください。`:'';
 const unused=uploaded?` アップロード済み${uploaded}枚は未使用画像として画像管理に残っています。`:'';
 return `${error.message}${retry} ご褒美10枚の並びは変更していません。${unused}`;
}
function renderGallery(stage){
 const names=galleryNames.get(stage.id)||[];$('galleryCount').textContent=`登録 ${stage.gallery.filter(Boolean).length} / 10枚`;
 $('galleryClearButton').disabled=busy||!allowed||!stage.gallery.some(Boolean);
 const cards=stage.gallery.map((id,index)=>{
  const card=document.createElement('article'),head=document.createElement('div'),number=document.createElement('b'),name=document.createElement('span'),frame=document.createElement('div'),controls=document.createElement('div');
  card.className='gallery-slot';head.className='gallery-slot-heading';number.textContent=String(index+1).padStart(2,'0');name.textContent=names[index]||(id?'登録した画像':'未登録');name.title=name.textContent;head.append(number,name);frame.className='gallery-slot-preview';
  if(id){const img=new Image();img.alt=`ご褒美 ${index+1}枚目`;img.decoding='async';img.loading='lazy';img.src=endpoint+'assets/'+encodeURIComponent(id);img.onerror=()=>{const note=document.createElement('p');note.textContent='画像を読み込めません';frame.replaceChildren(note);};frame.append(img);}else{const empty=document.createElement('p');empty.textContent='画像を登録';frame.append(empty);}
  controls.className='gallery-slot-controls';
  const choose=document.createElement('label'),file=document.createElement('input');choose.className='upload-button';choose.textContent='差し替え';file.type='file';file.accept='image/png,image/jpeg,image/webp';file.disabled=busy||!allowed;file.setAttribute('aria-label',`ご褒美${index+1}枚目の画像を選ぶ`);file.onchange=event=>void uploadGallerySlot(event.target.files[0],index);choose.append(file);
  const remove=document.createElement('button');remove.type='button';remove.textContent='外す';remove.disabled=busy||!allowed||!id;remove.setAttribute('aria-label',`ご褒美${index+1}枚目を外す`);remove.onclick=()=>{if(busy||!allowed)return;stage.gallery[index]=null;const labels=galleryNames.get(stage.id);if(labels)labels[index]='';changed();render();void inventory();};
  const previous=document.createElement('button'),next=document.createElement('button');previous.type=next.type='button';previous.textContent='←';next.textContent='→';previous.setAttribute('aria-label',`ご褒美${index+1}枚目を前へ`);next.setAttribute('aria-label',`ご褒美${index+1}枚目を次へ`);previous.disabled=busy||!allowed||index===0;next.disabled=busy||!allowed||index===9;previous.onclick=()=>moveGallerySlot(index,-1);next.onclick=()=>moveGallerySlot(index,1);
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
  const prepared=[];for(let i=0;i<files.length;i++){$('galleryUploadStatus').textContent=`画像を確認・調整中 ${i+1} / 10：${files[i].name}`;prepared.push(await prepareImage(files[i]));}
  const images=[];for(let i=0;i<prepared.length;i++){$('galleryUploadStatus').textContent=`アップロード中 ${i+1} / 10：${files[i].name}`;images.push(await request('admin/images',{method:'POST',body:prepared[i],raw:true}));uploaded++;$('galleryProgress').value=uploaded;}
  target.gallery=images.map(image=>image.id);galleryNames.set(target.id,files.map(file=>file.name));changed();render();$('galleryUploadStatus').textContent=`ステージ${target.id}のご褒美10枚を登録しました。並びを確認して「設定を保存する」を押してください。`;status('ご褒美画像10枚を編集中の設定へ登録しました。まだ公開設定は変更していません。');
 }catch(error){$('galleryUploadStatus').textContent=galleryFailure(error,uploaded);status(error.message,true);}
 finally{await inventory();lock(false);render();}
}
async function uploadGallerySlot(file,index){
 if(!file||busy||!allowed)return;const error=galleryFileError(file);if(error){$('galleryUploadStatus').textContent=error;return;}
 const target=draft.stages[stageId-1];lock(true);$('galleryProgress').hidden=true;$('galleryUploadStatus').textContent=`${index+1}枚目を調整・アップロードしています…`;
 try{const blob=await prepareImage(file),image=await request('admin/images',{method:'POST',body:blob,raw:true});target.gallery[index]=image.id;const names=galleryNames.get(target.id)||Array(10).fill('');names[index]=file.name;galleryNames.set(target.id,names);changed();render();$('galleryUploadStatus').textContent=`${index+1}枚目を差し替えました。「設定を保存する」で公開します。`;}
 catch(error){$('galleryUploadStatus').textContent=galleryFailure(error);status(error.message,true);}
 finally{await inventory();lock(false);render();}
}
async function prepareImage(file){
 if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('PNG・JPEG・WebPの静止画を選んでください。');
 if(file.size>20*1024*1024)throw Error('元画像は20MB以下にしてください。');
 const url=URL.createObjectURL(file),image=new Image();
 try{image.src=url;await image.decode();if(image.naturalWidth>12000||image.naturalHeight>12000)throw Error('元画像が大きすぎます。縦横12000px以下にしてください。');
  const scale=Math.min(1,1400/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
  let blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.88));if(!blob)throw Error('画像を変換できませんでした。');
  if(blob.size>2*1024*1024)blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.65));
  if(!blob||blob.size>2*1024*1024)throw Error('画像を2MB以下にできませんでした。小さい画像で再試行してください。');return blob;
 }finally{URL.revokeObjectURL(url);}
}
async function upload(file,slot){
 if(!file||busy||!allowed)return;lock(true);const target=draft.stages[stageId-1];$('uploadStatus').textContent='画像を調整・アップロードしています…';
 try{const blob=await prepareImage(file),image=await request('admin/images',{method:'POST',body:blob,raw:true});if(slot==='portrait')target.portrait=image.id;else target.rewards[slot]=image.id;changed();render();$('uploadStatus').textContent=`画像を登録しました（${Math.ceil(image.bytes/1024)}KB）。設定を保存するとゲームへ反映されます。`;await inventory();}
 catch(error){$('uploadStatus').textContent=error.message;status(error.message,true);}finally{lock(false);render();}
}
async function inventory(){
 const panel=$('assetInventory');if(!panel)return;
 try{const {images,limit}=await request('admin/images');$('assetCount').textContent=`登録画像 ${images.length} / ${limit}枚`;
  panel.replaceChildren(...images.map(image=>{const row=document.createElement('div');row.className='asset-row';const img=new Image();img.src=image.url;img.alt='登録画像';img.loading='lazy';const info=document.createElement('span');const locallyUsed=draft.stages.some(s=>s.portrait===image.id||s.rewards.includes(image.id)||s.gallery.includes(image.id));info.textContent=`${image.width}×${image.height} · ${Math.ceil(image.bytes/1024)}KB · ${image.inUse?'公開中':locallyUsed?'編集中の設定で使用':'未使用'}`;const button=document.createElement('button');button.type='button';button.className='quiet';button.textContent='完全に削除';button.disabled=image.inUse||locallyUsed;button.onclick=async()=>{if(busy||!confirm('この未使用画像を完全に削除します。元に戻せません。よろしいですか？'))return;lock(true);try{await request('admin/images/'+image.id,{method:'DELETE'});await inventory();status('未使用画像を削除しました。');}catch(error){status(error.message,true);}finally{lock(false);}};row.append(img,info,button);return row;}));
 }catch(error){panel.textContent=error.message;}
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
window.addEventListener('drop',event=>{if(hasDraggedFiles(event)){event.preventDefault();if(!event.target.closest?.('#galleryDropZone'))$('galleryUploadStatus').textContent='画像は「10枚をまとめてドロップ」の枠へ入れてください。';}});
$('reloadConfigButton').onclick=()=>{if(!dirty||confirm('未保存の変更を破棄して、最新の設定を読み直しますか？'))void load();};
$('configForm').onsubmit=async event=>{event.preventDefault();if(busy||!allowed)return;lock(true);try{const saved=await request('admin/config',{method:'PUT',body:draft});config=saved;draft=draftConfig(saved);dirty=false;$('saveState').textContent=`保存済みの設定 · バージョン ${saved.version}`;status('設定を保存しました。ゲームを新しく始めると反映されます。');render();await inventory();}catch(error){status(error.status===409?error.message+' 未保存の内容は残しています。「読み直す」で最新設定を確認してください。':error.message,true);}finally{lock(false);render();}};
window.addEventListener('beforeunload',event=>{if(dirty||busy){event.preventDefault();event.returnValue='';}});
async function init(){
 try{const auth=await request('admin');allowed=auth.canManage===true;$('loginPanel').hidden=allowed;$('adminEditor').hidden=!allowed;
  if(!allowed){status(auth.authenticated?'このアカウントには編集権限がありません。サイト所有者のアカウントでサインインしてください。':'画像を登録するには、サイト所有者としてサインインしてください。');return;}
  await load();
 }catch(error){status('管理画面に接続できませんでした。'+error.message,true);}
}
renderInitialCast();void init();
