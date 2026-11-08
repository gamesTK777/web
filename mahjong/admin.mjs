import {CAST,getCast,displayStageName,defaultPortraitURL,defaultRewardURL} from './cast.mjs?v=20261108-cast';
const $=id=>document.getElementById(id),clone=value=>JSON.parse(JSON.stringify(value));
let config=null,draft=null,stageId=1,busy=false,dirty=false,allowed=false;
const endpoint='/api/mahjong/';
const bundledBase='https://gamestk777.github.io/web/mahjong/assets/cast/';
const draftConfig=value=>({...clone(value),stages:value.stages.map(stage=>({...clone(stage),name:displayStageName(stage)}))});
function status(message,error=false){$('adminStatus').textContent=message;$('adminStatus').classList.toggle('error',error);}
async function request(path,{method='GET',body,raw=false}={}){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
 try{const response=await fetch(endpoint+path,{method,credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:body?{'Content-Type':raw?body.type:'application/json'}:{},body:body?(raw?body:JSON.stringify(body)):undefined});const value=await response.json();if(!response.ok){const error=new Error(value.error||'通信に失敗しました。');error.status=response.status;throw error;}return value;}
 finally{clearTimeout(timer);}
}
function lock(value){busy=value;$('configFields').disabled=value||!allowed;$('stageSelect').disabled=value;document.querySelectorAll('[data-stage]').forEach(b=>b.disabled=value);}
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
 document.querySelectorAll('input[type=file]').forEach(el=>el.value='');
}
async function load(){lock(true);try{config=await request('config');draft=draftConfig(config);dirty=false;render();$('saveState').textContent=`保存済みの設定 · バージョン ${config.version}`;status('管理者として接続しました。初期キャストの画像は設定済みです。登録画像で差し替え、保存すると新しく始める対局へ反映されます。');await inventory();}catch(error){status(error.message,true);}finally{lock(false);}}
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
  panel.replaceChildren(...images.map(image=>{const row=document.createElement('div');row.className='asset-row';const img=new Image();img.src=image.url;img.alt='登録画像';img.loading='lazy';const info=document.createElement('span');const locallyUsed=draft.stages.some(s=>s.portrait===image.id||s.rewards.includes(image.id));info.textContent=`${image.width}×${image.height} · ${Math.ceil(image.bytes/1024)}KB · ${image.inUse?'公開中':locallyUsed?'編集中の設定で使用':'未使用'}`;const button=document.createElement('button');button.type='button';button.className='quiet';button.textContent='完全に削除';button.disabled=image.inUse||locallyUsed;button.onclick=async()=>{if(busy||!confirm('この未使用画像を完全に削除します。元に戻せません。よろしいですか？'))return;lock(true);try{await request('admin/images/'+image.id,{method:'DELETE'});await inventory();status('未使用画像を削除しました。');}catch(error){status(error.message,true);}finally{lock(false);}};row.append(img,info,button);return row;}));
 }catch(error){panel.textContent=error.message;}
}
$('stageSelect').onchange=event=>{stageId=Number(event.target.value);render();};
$('stageTabs').onclick=event=>{const b=event.target.closest('[data-stage]');if(b&&!busy){stageId=Number(b.dataset.stage);render();}};
$('characterName').oninput=event=>{draft.stages[stageId-1].name=event.target.value;changed();};$('stageAccent').oninput=event=>{draft.stages[stageId-1].accent=event.target.value;changed();};
$('portraitFile').onchange=event=>void upload(event.target.files[0],'portrait');$('removePortraitButton').onclick=()=>{draft.stages[stageId-1].portrait=null;changed();render();void inventory();};
for(let i=1;i<=3;i++){$('rewardFile'+i).onchange=event=>void upload(event.target.files[0],i-1);$('removeReward'+i).onclick=()=>{draft.stages[stageId-1].rewards[i-1]=null;changed();render();void inventory();};}
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
