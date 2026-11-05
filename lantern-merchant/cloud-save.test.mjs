import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {createCloudSave} from './cloud-save.mjs';
import {newGame} from './engine.mjs';

const clone=v=>JSON.parse(JSON.stringify(v));
function harness(overrides={}){
  const slots=new Map(),archives=new Map(),requests=[],stored=new Map(),timers=new Map(),statuses=[];let clock=0,next=1,behavior=null;
  const storage={getItem:key=>stored.get(key)??null,setItem:(key,value)=>stored.set(key,value)};
  const response=(status,data,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json',...headers}});
  const fetch=async(url,init)=>{
    requests.push({url,method:init.method,headers:{...init.headers},body:init.body});
    if(behavior){const handled=await behavior(url,init);if(handled)return handled;}
    if(url.includes('raw.githubusercontent.com')){const id=url.split('/').at(-1).replace('.json','');return archives.has(id)?response(200,archives.get(id)):response(404,{});}
    const id=init.headers['X-Save-Id'],auth=init.headers.Authorization,old=slots.get(id);
    if(old&&old.auth!==auth)return response(401,{});
    if(init.method==='GET')return old?response(200,old.data):response(404,{});
    const data=JSON.parse(init.body);if(data.revision!==(old?.data.revision??0))return response(409,{});
    const saved={...data,revision:data.revision+1,updatedAt:new Date(clock).toISOString()};slots.set(id,{auth,data:saved});return response(200,{revision:saved.revision,updatedAt:saved.updatedAt});
  };
  const options={endpoint:'https://save.example/api/lantern-save',fetch,storage,crypto:webcrypto,now:()=>clock,setTimeout:(fn,ms)=>{const id=next++;timers.set(id,{fn,due:clock+ms});return id;},clearTimeout:id=>timers.delete(id),onStatus:s=>statuses.push(s),...overrides};
  const client=createCloudSave(options);
  return{client,options,slots,archives,requests,stored,timers,statuses,response,setTime:n=>clock=n,setBehavior:b=>behavior=b};
}

test('a new save stores ciphertext only; the recovery key never appears in requests',async()=>{
  const h=harness(),state=newGame(42);await h.client.newSlot(state);
  assert.match(h.client.getCode(),/^LANTERN-(?:[a-f0-9]{8}-){7}[a-f0-9]{8}$/);
  const secret=h.client.getCode().replace(/^LANTERN-/,'').replaceAll('-',''),r=h.requests[0],body=JSON.parse(r.body);
  assert.equal(r.url,'https://save.example/api/lantern-save');assert.match(r.headers['X-Save-Id'],/^[a-f0-9]{64}$/);assert.match(r.headers.Authorization,/^Bearer [a-f0-9]{64}$/);
  assert.ok(!JSON.stringify(r).includes(secret));assert.ok(!r.body.includes('gold'));assert.ok(!r.body.includes('seed'));assert.equal(body.schema,1);assert.equal(h.client.getStatus().revision,1);h.client.dispose();
});

test('another device decrypts the same save with the recovery code and no game state mutation',async()=>{
  const h=harness(),state=newGame(5);await h.client.newSlot(state);const before=clone(state);
  const other=createCloudSave({...h.options,storage:{getItem:()=>null,setItem(){}}});const result=await other.load(h.client.getCode());
  assert.deepEqual(result.state,state);assert.deepEqual(state,before);assert.equal(result.fromBackup,false);assert.equal(other.getStatus().connected,true);h.client.dispose();other.dispose();
});

test('stored identities cannot overwrite a remote save before the current version is fetched',async()=>{
  const h=harness();await h.client.newSlot(newGame(6));const other=createCloudSave(h.options),writes=h.requests.length;
  assert.equal(other.queue(newGame(7)),false);assert.equal((await other.flush()).needsRestore,true);assert.equal(h.requests.length,writes);
  const result=await other.enable(newGame(7));assert.equal(result.restored,true);assert.equal(result.previousRevision,1);assert.equal(result.previousSavedAt,new Date(0).toISOString());assert.equal(result.state.seed,6);assert.equal(other.queue(newGame(7)),true);h.client.dispose();other.dispose();
});

test('coalesced writes use the latest snapshot and enforce fifteen seconds between writes',async()=>{
  const h=harness();await h.client.newSlot(newGame(8));h.setTime(1000);h.client.queue(newGame(9));h.setTime(6000);h.client.queue(newGame(10));
  assert.equal((await h.client.flush()).queued,true);assert.equal(h.requests.length,1);h.setTime(15000);assert.equal((await h.client.flush()).ok,true);assert.equal(h.requests.length,2);
  const result=await h.client.load(h.client.getCode());assert.equal(result.state.seed,10);const first=JSON.parse(h.requests[0].body),second=JSON.parse(h.requests[1].body);assert.notEqual(first.iv,second.iv);assert.notEqual(first.ciphertext,second.ciphertext);h.client.dispose();
});

test('continuous movement cannot indefinitely postpone a queued save',async()=>{
  const h=harness();await h.client.newSlot(newGame(1));for(let ms=1000;ms<=15000;ms+=1000){h.setTime(ms);h.client.queue(newGame(ms));}
  assert.equal(h.timers.size,1);assert.equal([...h.timers.values()][0].due,16000);h.client.dispose();
});

test('a conflict stops all automatic writes until the remote record is reloaded',async()=>{
  const h=harness();await h.client.newSlot(newGame(2));[...h.slots.values()][0].data.revision=2;h.setTime(15000);h.client.queue(newGame(3));const result=await h.client.flush();
  assert.equal(result.conflict,true);assert.equal(h.client.getStatus().connected,false);assert.equal(h.client.queue(newGame(4)),false);assert.equal(h.timers.size,0);
  await h.client.load(h.client.getCode());assert.equal(h.client.getStatus().revision,2);assert.equal(h.client.queue(newGame(4)),true);h.client.dispose();
});

test('rate limiting keeps the newest pending state and waits for Retry-After',async()=>{
  const h=harness();await h.client.newSlot(newGame(2));h.setTime(15000);h.client.queue(newGame(3));let limited=true;h.setBehavior((url,init)=>limited&&init.method==='PUT'?h.response(429,{}, {'Retry-After':'45'}):null);
  assert.equal((await h.client.flush()).queued,true);h.setTime(30000);h.client.queue(newGame(4));assert.equal((await h.client.flush()).queued,true);assert.equal(h.requests.filter(r=>r.method==='PUT').length,2);
  limited=false;h.setTime(60000);assert.equal((await h.client.flush()).ok,true);assert.equal((await h.client.load(h.client.getCode())).state.seed,4);h.client.dispose();
});

test('a network outage retries without discarding the pending local snapshot',async()=>{
  const h=harness();await h.client.newSlot(newGame(5));h.setTime(15000);h.client.queue(newGame(6));h.setBehavior((url,init)=>{if(init.method==='PUT')throw Error('offline');});
  assert.equal((await h.client.flush()).error,'network');assert.equal(h.client.getStatus().connected,true);h.setBehavior(null);h.setTime(45000);assert.equal((await h.client.flush()).ok,true);assert.equal((await h.client.load(h.client.getCode())).state.seed,6);h.client.dispose();
});

test('GitHub fallback decrypts a backup but never enables writes using its possibly old version',async()=>{
  const h=harness();await h.client.newSlot(newGame(11));for(const [id,v]of h.slots)h.archives.set(id,clone(v.data));h.setBehavior((url)=>{if(!url.includes('raw.githubusercontent.com'))throw Error('offline');});
  const result=await h.client.load(h.client.getCode());assert.equal(result.state.seed,11);assert.equal(result.fromBackup,true);assert.equal(h.client.getStatus().connected,false);assert.equal(h.client.queue(newGame(12)),false);
  const backup=h.requests.at(-1);assert.match(backup.url,/\/saves\/[a-f0-9]{64}\.json$/);assert.equal(backup.headers.Authorization,undefined);assert.equal(backup.headers['X-Save-Id'],undefined);h.client.dispose();
});

test('authentication errors do not bypass the live server through a public backup',async()=>{
  const h=harness();await h.client.newSlot(newGame(12));h.setBehavior((url,init)=>init.method==='GET'?h.response(401,{}):null);
  await assert.rejects(h.client.load(h.client.getCode()));assert.equal(h.requests.filter(r=>r.url.includes('raw.githubusercontent.com')).length,0);h.client.dispose();
});

test('wrong keys and tampered ciphertext fail without changing the saved record',async()=>{
  const h=harness();await h.client.newSlot(newGame(13));const code=h.client.getCode(),entry=[...h.slots.values()][0],original=clone(entry.data);entry.data.ciphertext=entry.data.ciphertext.slice(0,-4)+'AAAA';
  await assert.rejects(h.client.load(code));assert.equal(h.client.getStatus().connected,false);entry.data=original;
  await assert.rejects(h.client.load('invalid'));assert.equal(h.client.getCode(),code);assert.deepEqual((await h.client.load(code)).state,newGame(13));h.client.dispose();
});

test('starting a fresh slot leaves the previous recovery code usable on another device',async()=>{
  const h=harness();await h.client.newSlot(newGame(14));const old=h.client.getCode();await h.client.newSlot(newGame(15));assert.notEqual(h.client.getCode(),old);assert.equal(h.slots.size,2);
  const other=createCloudSave({...h.options,storage:{getItem:()=>null,setItem(){}}});assert.equal((await other.load(old)).state.seed,14);h.client.dispose();other.dispose();
});

test('dispose cancels queued work and blocks future writes',async()=>{
  const h=harness();await h.client.newSlot(newGame(16));h.client.queue(newGame(17));assert.equal(h.timers.size,1);h.client.dispose();assert.equal(h.timers.size,0);assert.equal(h.client.queue(newGame(18)),false);assert.equal((await h.client.flush()).ok,false);await assert.rejects(h.client.newSlot(newGame(19)));
});

test('an older in-flight upload cannot replace the identity or version of a fresh slot',async()=>{
  const h=harness();await h.client.newSlot(newGame(20));const oldCode=h.client.getCode();let release,entered;const gate=new Promise(r=>release=r),arrived=new Promise(r=>entered=r);
  h.setBehavior(async(url,init)=>{if(init.method==='PUT'&&JSON.parse(init.body).revision===1){entered();await gate;return h.response(200,{revision:2,updatedAt:new Date(15000).toISOString()});}});
  h.setTime(15000);h.client.queue(newGame(21));const uploading=h.client.flush();await arrived;await h.client.newSlot(newGame(22));const currentCode=h.client.getCode();assert.notEqual(currentCode,oldCode);release();assert.equal((await uploading).stale,true);assert.equal(h.client.getCode(),currentCode);assert.equal(h.client.getStatus().revision,1);h.client.dispose();
});

test('a superseded slow key derivation cannot change the active slot',async()=>{
  let release,entered,digests=0;const gate=new Promise(r=>release=r),arrived=new Promise(r=>entered=r);
  const crypto={getRandomValues:webcrypto.getRandomValues.bind(webcrypto),subtle:{digest:async(...args)=>{if(++digests===1){entered();await gate;}return webcrypto.subtle.digest(...args);},importKey:webcrypto.subtle.importKey.bind(webcrypto.subtle),encrypt:webcrypto.subtle.encrypt.bind(webcrypto.subtle),decrypt:webcrypto.subtle.decrypt.bind(webcrypto.subtle)}};
  const h=harness({crypto});const old=h.client.newSlot(newGame(23)),oldRejected=assert.rejects(old);await arrived;await h.client.newSlot(newGame(24));const active=h.client.getCode();release();await oldRejected;assert.equal(h.client.getCode(),active);assert.equal((await h.client.load(active)).state.seed,24);h.client.dispose();
});
