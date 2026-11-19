import {runJourney} from "./journey-scenario.ts";
import {World} from "../src/world.ts";
import {SaveStore,backupText,parseBackup,defaults} from "../src/storage.ts";
import {SceneView} from "../src/renderer.ts";
import {createPlayer} from "../src/physics.ts";
declare global {interface Window {journeyResult:Record<string,unknown>}}
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const assert=(value:unknown,reason:string)=>{if(!value)throw new Error(reason);};
async function verify(){
  const s=runJourney(new URLSearchParams(location.search).get("seed")||"潮だまり・777");
  // This dedicated database is independent of the player's world list.
  const dbName="tk777.webcraft777.test.expedition",store=new SaveStore(dbName);
  const id="quality-case",previous=await store.get(id);
  const {x,y,z,yaw,pitch}=s.player;
  const saved=await store.write({format:"webcraft777",version:2,generator:2,name:"探索・収納検証",id,
    revision:0,updatedAt:0,mode:"explore",seed:s.seed,edits:s.world.exportEdits(),fixtures:s.world.exportFixtures(),
    pose:{x,y,z,yaw,pitch},flying:false,bag:s.bag,selected:0,guideSeen:true,journey:s.journey,day:.39,settings:defaults},previous?.revision??null);
  const loaded=await new SaveStore(dbName).get(id);
  assert(loaded,"保存したワールドがありません。");
  const backup=parseBackup(backupText(loaded!));
  const w=await World.generate(backup.seed,undefined,backup.generator);
  w.loadEdits(backup.edits);w.loadFixtures(backup.fixtures);
  assert(saved.revision===loaded!.revision,"保存履歴が異なります。");
  assert(w.get(s.ore.x,s.ore.y,s.ore.z)===0,"採取した鉱石が復活しました。");
  assert(JSON.stringify(w.chestAt(s.chest.x,s.chest.y,s.chest.z))===JSON.stringify(s.chestContents),"収納物が一致しません。");
  assert(w.benchUses(s.bench.x,s.bench.y,s.bench.z)===1,"作業台の回数が一致しません。");
  assert(w.get(s.decoration.x,s.decoration.y,s.decoration.z)===25,"設置したランタンがありません。");
  assert(JSON.stringify(backup.bag)===JSON.stringify(s.bag) && JSON.stringify(backup.journey)===JSON.stringify(s.journey),"所持品か探索目標が一致しません。");
  s.observations.push("IndexedDBを別の接続で開き直し、バックアップも復元。消耗した道具、鉱石の採掘跡、作業台、旅の達成状態、設置した灯りが一致");
  window.journeyResult={ok:true,seed:s.seed,walked:s.walked,mined:s.mined,placed:s.placed,benchUses:1,chest:s.chestContents,
    observations:s.observations,landmarks:w.landmarks};
  for(const line of s.observations){const li=document.createElement("li");li.textContent=line;$("observations").append(li);}
  $("status").textContent="全項目を確認しました。";
  $("detail").textContent=s.seed+"　歩行 "+s.walked+" m　採掘 "+s.mined+" 回　設置 "+s.placed+" 回";
  const canvas=$<HTMLCanvasElement>("scene");canvas.hidden=false;
  try{
    const view=new SceneView(canvas,w);view.configure(defaults);
    const p=createPlayer(w.spawn());
    function show(place:string){
      const mark=w.landmarks.find(m=>m.kind===place);
      const t=mark??s.decoration;
      const aimY=t.y+(place==="grove"?6:place==="ruin"?2:1);
      const x=t.x+(place==="cave"?-5:place==="grove"?12:6),z=t.z+(place==="cave"?0:place==="grove"?12:7);
      const foot=place==="cave"?t.y+.4:Math.max(t.y+2,w.highest[Math.floor(x)+256*Math.floor(z)]+1);
      Object.assign(p,{x:x+.5,y:foot,z:z+.5,yaw:Math.atan2(x-t.x,z-t.z),
        pitch:Math.atan2(aimY-foot-1.62,Math.hypot(x-t.x,z-t.z))});
    }
    $("views").hidden=false;show("home");
    $<HTMLSelectElement>("view").onchange=e=>show((e.target as HTMLSelectElement).value);
    function frame(){view.update(p,null,.39,0);if(view.stats.queued)requestAnimationFrame(frame);}
    function repaint(){requestAnimationFrame(frame);}
    $<HTMLSelectElement>("view").addEventListener("change",repaint);window.addEventListener("resize",repaint);frame();
    window.addEventListener("pagehide",()=>view.dispose(),{once:true});
  }catch(e){canvas.hidden=true;$("detail").textContent+="　プレビューを表示できません。"+String(e);}
}
verify().catch(e=>{window.journeyResult={ok:false,error:String(e)};$("status").textContent=String(e);console.error(e);});
