// Saves leave the browser only as AES-GCM ciphertext. The recovery key stays here.
const STORAGE_KEY='tk777-lantern-cloud-v1';
const encode=new TextEncoder(),decode=new TextDecoder();
const hex=bytes=>Array.from(bytes,v=>v.toString(16).padStart(2,'0')).join('');
const unhex=text=>Uint8Array.from(text.match(/../g)||[],v=>parseInt(v,16));
function normalizeCode(value){const code=String(value||'').trim().toLowerCase().replace(/^lantern[-\s]*/,'').replace(/[\s-]/g,'');if(!/^[0-9a-f]{64}$/.test(code))throw new Error('引き継ぎコードを確認してください。');return code;}
const displayCode=secret=>'LANTERN-'+secret.match(/.{8}/g).join('-');
function toBase64(bytes){let s='';for(let i=0;i<bytes.length;i++)s+=String.fromCharCode(bytes[i]);return btoa(s);}
function fromBase64(text){if(typeof text!=='string'||text.length>140000||!/^[A-Za-z0-9+/]*={0,2}$/.test(text)||text.length%4)throw new Error('保存データの形式が正しくありません。');return Uint8Array.from(atob(text),c=>c.charCodeAt(0));}

export function createCloudSave(options={}){
  const endpoint=options.endpoint,request=options.fetch??globalThis.fetch,crypto=options.crypto??globalThis.crypto;
  let storage=options.storage;try{storage??=globalThis.localStorage;}catch{}
  const now=options.now??(()=>Date.now());
  const later=options.setTimeout??((fn,ms)=>setTimeout(fn,ms)),cancel=options.clearTimeout??(id=>clearTimeout(id));
  let identity=null,revision=0,connected=false,needsRestore=false,disposed=false,epoch=0,timer=null,inFlight=null,pending=null;
  let lastWrite=-Infinity,nextAllowed=0,lastSavedAt=null,firstPendingAt=null,phase='idle',message='GitHub保存を有効にできます。';
  const controllers=new Set();
  try{const saved=JSON.parse(storage?.getItem(STORAGE_KEY)||'null');if(saved?.code){identity={secret:normalizeCode(saved.code)};revision=Number.isSafeInteger(saved.revision)?saved.revision:0;lastSavedAt=typeof saved.savedAt==='string'?saved.savedAt:null;needsRestore=true;phase='locked';message='保存先を確認してから同期を再開します。';}}catch{}
  function status(){return{phase,message,connected,needsRestore,revision,lastSavedAt,nextSaveAt:Math.max(nextAllowed,lastWrite+15000)};}
  function announce(next,text){phase=next;message=text;try{options.onStatus?.(status());}catch{}}
  function clearTimer(){if(timer!==null)cancel(timer);timer=null;}
  function persist(){try{storage?.setItem(STORAGE_KEY,JSON.stringify({code:getCode(),revision,savedAt:lastSavedAt}));}catch{announce('warning','引き継ぎコードをこの端末に保存できません。コードを控えてください。');}}
  async function derive(secret){if(!crypto?.subtle||!crypto?.getRandomValues)throw new Error('このブラウザーでは安全な保存を利用できません。');const digest=async prefix=>hex(new Uint8Array(await crypto.subtle.digest('SHA-256',encode.encode(prefix+secret))));return{secret,id:await digest('lantern:id:'),auth:await digest('lantern:auth:'),key:await crypto.subtle.importKey('raw',unhex(secret),'AES-GCM',false,['encrypt','decrypt'])};}
  async function prepared(){if(!identity)throw new Error('先に保存を有効にしてください。');if(identity.key)return identity;const secret=identity.secret,derived=await derive(secret);if(identity?.secret===secret)identity=derived;return derived;}
  function snapshot(state){const text=JSON.stringify({game:'lantern-ledger',schema:1,state});if(encode.encode(text).length>100000)throw new Error('保存データが大きすぎます。');return text;}
  async function encrypt(text,id){const iv=crypto.getRandomValues(new Uint8Array(12));const ciphertext=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},id.key,encode.encode(text)));return{schema:1,iv:hex(iv),ciphertext:toBase64(ciphertext)};}
  async function decrypt(data,id){if(data?.schema!==1||!Number.isSafeInteger(data.revision)||data.revision<1||typeof data.iv!=='string'||!/^[a-f0-9]{24}$/i.test(data.iv))throw new Error('保存データの形式が正しくありません。');const clear=await crypto.subtle.decrypt({name:'AES-GCM',iv:unhex(data.iv)},id.key,fromBase64(data.ciphertext));if(clear.byteLength>100000)throw new Error('保存データが大きすぎます。');const value=JSON.parse(decode.decode(clear));if(value.game!=='lantern-ledger'||value.schema!==1||!value.state||typeof value.state!=='object')throw new Error('保存データの形式が正しくありません。');return value.state;}
  async function network(url,init){
    const controller=new AbortController();controllers.add(controller);const deadline=later(()=>controller.abort(),12000);
    try{return await request(url,{...init,cache:'no-store',credentials:'omit',signal:controller.signal});}
    finally{cancel(deadline);controllers.delete(controller);}
  }
  async function api(method,id,body){return network(endpoint,{method,headers:{'Authorization':`Bearer ${id.auth}`,'X-Save-Id':id.id,'Accept':'application/json',...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});}
  function retryAfter(response){const text=response.headers?.get?.('Retry-After'),seconds=Number(text);if(Number.isFinite(seconds)&&seconds>0)return Math.min(300000,seconds*1000);const date=Date.parse(text);return Number.isFinite(date)?Math.max(15000,Math.min(300000,date-now())):30000;}
  function schedule(delay=10000){clearTimer();if(disposed||!connected||needsRestore||!pending)return;const bounded=firstPendingAt===null?delay:Math.min(delay,Math.max(0,firstPendingAt+15000-now()));const ms=Math.max(bounded,nextAllowed-now(),lastWrite+15000-now(),0);timer=later(()=>{timer=null;void flush();},ms);}
  function queue(state){if(disposed||!connected||needsRestore)return false;try{pending=snapshot(state);firstPendingAt??=now();schedule();announce('waiting','変更を保存待ちです。');return true;}catch(error){announce('error',error.message);return false;}}
  async function send(text,version,generation){
    const id=await prepared();if(generation!==epoch||disposed)return{ok:false,stale:true};
    const encrypted=await encrypt(text,id);if(generation!==epoch||disposed)return{ok:false,stale:true};
    announce('saving','暗号化した記録を保存しています。');
    let response;
    try{response=await api('PUT',id,{...encrypted,revision:version});}catch(error){if(generation!==epoch||disposed)return{ok:false,stale:true};nextAllowed=now()+30000;pending??=text;announce('error','通信できませんでした。端末内の記録を残し、後で再試行します。');schedule(30000);return{ok:false,error:'network'};}
    if(generation!==epoch||disposed)return{ok:false,stale:true};
    if(response.status===409){needsRestore=true;connected=false;pending=null;clearTimer();announce('conflict','別の端末の記録が更新されています。引き継ぎから読み込み直してください。');return{ok:false,conflict:true};}
    if(response.status===429){nextAllowed=now()+retryAfter(response);pending??=text;announce('waiting','保存が混み合っています。少し待って自動で再試行します。');schedule(0);return{ok:false,queued:true};}
    if(!response.ok){pending??=text;nextAllowed=now()+30000;announce('error','サーバーに保存できませんでした。後で再試行します。');schedule(30000);return{ok:false,error:'server'};}
    const data=await response.json();if(generation!==epoch||disposed)return{ok:false,stale:true};
    if(!Number.isSafeInteger(data.revision)||data.revision<=version)throw new Error('保存結果を確認できませんでした。');
    revision=data.revision;lastWrite=now();lastSavedAt=data.updatedAt??new Date(now()).toISOString();connected=true;needsRestore=false;persist();announce('saved','サーバーへ保存済み。GitHubへも定期保存されます。');if(pending)schedule(0);return{ok:true,revision,updatedAt:lastSavedAt};
  }
  async function flush(){
    if(disposed||!connected||needsRestore)return{ok:false,needsRestore};
    if(inFlight)return inFlight;
    if(!pending)return{ok:true,revision,updatedAt:lastSavedAt};
    clearTimer();if(now()<Math.max(nextAllowed,lastWrite+15000)){schedule(0);announce('waiting','変更を保存待ちです。');return{ok:false,queued:true};}
    const text=pending,generation=epoch;pending=null;firstPendingAt=null;const task=send(text,revision,generation).catch(()=>{if(generation===epoch&&!disposed){connected=false;needsRestore=true;pending=null;announce('error','保存結果を確認できません。引き継ぎから保存先を確認してください。');}return{ok:false,error:'invalid-response'};});inFlight=task;
    try{return await task;}finally{if(inFlight===task)inFlight=null;}
  }
  async function load(code=getCode()){
    if(disposed)throw new Error('保存機能は終了しています。');const secret=normalizeCode(code),generation=++epoch;clearTimer();pending=null;connected=false;needsRestore=true;announce('loading','記録を読み込んでいます。');
    try{
      const id=await derive(secret);let response,fromBackup=false;
      try{response=await api('GET',id);}catch{response=null;}
      if(generation!==epoch||disposed)throw new Error('読み込みが中断されました。');
      if(!response||response.status===404||response.status>=500){
        const base=options.archiveBase??'https://raw.githubusercontent.com/gamesTK777/web/main/lantern-merchant/data/saves/';
        response=await network(base+id.id+'.json',{method:'GET',headers:{'Accept':'application/json'}});fromBackup=true;
      }
      if(generation!==epoch||disposed)throw new Error('読み込みが中断されました。');
      if(!response.ok)throw new Error(response.status===404?'このコードの記録はまだありません。':response.status===429?'混み合っています。少し待ってから読み込んでください。':'記録を読み込めませんでした。');
      const data=await response.json(),state=await decrypt(data,id);if(generation!==epoch||disposed)throw new Error('読み込みが中断されました。');
      identity=id;revision=data.revision;lastSavedAt=data.updatedAt??null;lastWrite=now();nextAllowed=0;connected=!fromBackup;needsRestore=fromBackup;persist();announce(fromBackup?'backup':'saved',fromBackup?'GitHubのバックアップを読み込みました。サーバーへの同期は再接続後に再開してください。':'記録を読み込みました。GitHubにも定期保存されます。');return{state,revision,updatedAt:lastSavedAt,fromBackup};
    }
    catch(error){if(generation===epoch&&!disposed)announce('error',error.message||'記録を読み込めませんでした。');throw error;}
  }
  async function newSlot(state){
    if(disposed)throw new Error('保存機能は終了しています。');if(!crypto?.getRandomValues)throw new Error('安全な保存を利用できません。');const text=snapshot(state),secret=hex(crypto.getRandomValues(new Uint8Array(32))),generation=++epoch;clearTimer();pending=null;firstPendingAt=null;const derived=await derive(secret);if(generation!==epoch||disposed)throw new Error('保存が中断されました。');identity=derived;revision=0;connected=true;needsRestore=false;lastWrite=-Infinity;nextAllowed=0;lastSavedAt=null;persist();const task=send(text,0,generation).catch(()=>{if(generation===epoch&&!disposed){connected=false;needsRestore=true;announce('error','保存結果を確認できません。コードを控え、保存先を読み込み直してください。');}return{ok:false,error:'invalid-response'};});inFlight=task;let result;try{result=await task;}finally{if(inFlight===task)inFlight=null;}if(!result.ok)throw new Error('保存先の作成を完了できませんでした。通信を確認し、引き継ぎコードは保管してください。');return{...result,state,restored:false,code:getCode()};
  }
  async function enable(state){if(identity){const previousRevision=revision,previousSavedAt=lastSavedAt;return{...await load(getCode()),restored:true,code:getCode(),previousRevision,previousSavedAt};}return newSlot(state);}
  function getCode(){return identity?displayCode(identity.secret):'';}
  function dispose(){disposed=true;epoch++;clearTimer();pending=null;for(const c of controllers)c.abort();controllers.clear();}
  return{enable,newSlot,queue,flush,load,getCode,getStatus:status,dispose};
}
