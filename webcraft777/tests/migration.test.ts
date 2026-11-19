import "fake-indexeddb/auto";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";
import {SaveStore,backupText,parseBackup,type WorldSave} from "../src/storage.ts";
import {World} from "../src/world.ts";
import {transferStack} from "../src/inventory.ts";

// Seed a real v1 database without invoking any v2 writer or migration helper.
function installOldDatabase(name:string,record:WorldSave):Promise<void>{
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open(name,1);
    request.onupgradeneeded=()=>{
      request.result.createObjectStore("directory",{keyPath:"id"});
      request.result.createObjectStore("worlds",{keyPath:"id"});
    };
    request.onerror=()=>reject(request.error);
    request.onsuccess=()=>{
      const db=request.result,tx=db.transaction(["worlds","directory"],"readwrite");
      const {id,name,seed,mode,updatedAt,revision}=record;
      tx.objectStore("worlds").put(record);
      tx.objectStore("directory").put({id,name,seed,mode,updatedAt,revision});
      tx.oncomplete=()=>{db.close();resolve();};
      tx.onabort=()=>{db.close();reject(tx.error);};
    };
  });
}
test("実物の旧版・湖畔の小屋を開き直し、初回更新前の原本と家・穴・装備を保護する",async()=>{
  const raw=JSON.parse(await readFile(new URL("../examples/lakeside.json",import.meta.url),"utf8")) as WorldSave;
  const rawText=JSON.stringify(raw),db="raw-v1-"+crypto.randomUUID();
  await installOldDatabase(db,raw);
  const store=new SaveStore(db),loaded=(await store.get(raw.id))!;
  assert.equal(loaded.version,2);assert.equal(loaded.generator,1);
  assert.equal(loaded.settings.quality,'legacy');assert.equal(loaded.settings.scale,raw.settings.scale);
  assert.deepEqual(loaded.pose,raw.pose);assert.deepEqual(loaded.bag,raw.bag);
  assert.equal(loaded.edits.filter(([,id])=>id===0).length,7);
  assert.equal(loaded.edits.filter(([,id])=>id!==0).length,208);
  assert.equal(JSON.stringify(await store.original(raw.id)),rawText);
  const world=new World(raw.seed,false,loaded.generator);
  world.loadEdits(loaded.edits);world.loadFixtures(loaded.fixtures);
  for(const [key,id] of raw.edits)assert.equal(world.data[key],id);
  assert.deepEqual(world.landmarks,[]);

  const x=141,y=75,z=149;
  assert.ok(world.set(x,y,z,22));assert.ok(world.set(x+1,y,z,21));assert.ok(world.set(x+2,y,z,5));
  world.useBench(x+1,y,z,3);world.setAxis(x+2,y,z,"z");
  const pick=loaded.bag.slots.findIndex(i=>i.id===17);
  assert.ok(transferStack(loaded.bag,world.chestAt(x,y,z)!,"bag",pick).ok);
  loaded.journey.home={x:141,y:35,z:149};
  const updated=await store.write({...loaded,edits:world.exportEdits(),fixtures:world.exportFixtures()},loaded.revision);
  const reopenedStore=new SaveStore(db),reopened=(await reopenedStore.get(raw.id))!;
  assert.equal(reopened.revision,raw.revision+1);assert.equal(reopened.generator,1);
  const fromBackup=parseBackup(backupText(reopened));
  const rebuilt=await World.generate(fromBackup.seed,undefined,fromBackup.generator);
  rebuilt.loadEdits(fromBackup.edits);rebuilt.loadFixtures(fromBackup.fixtures);
  assert.deepEqual(rebuilt.data,world.data);assert.deepEqual(rebuilt.exportFixtures(),world.exportFixtures());
  assert.deepEqual(rebuilt.chestAt(x,y,z),[{id:17,count:1,durability:32}]);
  assert.equal(rebuilt.axisAt(x+2,y,z),"z");assert.equal(rebuilt.benchUses(x+1,y,z),3);
  assert.deepEqual(fromBackup.journey.home,loaded.journey.home);
  assert.deepEqual(fromBackup.bag,loaded.bag);assert.equal(fromBackup.bag.slots.some(s=>s.id===17),false);
  assert.equal(JSON.stringify(await reopenedStore.original(raw.id)),rawText);
  const malformed=structuredClone(updated);malformed.fixtures!.chests[0][1][0].durability=999;
  await assert.rejects(reopenedStore.write(malformed,reopened.revision),/設備/);
  assert.deepEqual(await reopenedStore.get(raw.id),reopened);
  assert.equal(JSON.stringify(await reopenedStore.original(raw.id)),rawText);
});
