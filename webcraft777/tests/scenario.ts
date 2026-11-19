import { World } from "../src/world.ts";
import { SceneView } from "../src/renderer.ts";
import { defaults, SaveStore, backupText, parseBackup, type WorldSave } from "../src/storage.ts";
import { safeSpawn } from "../src/physics.ts";
import type { Pose } from "../src/physics.ts";
import { activeStack, quantity } from "../src/inventory.ts";
import { runScenario, SCENE_SEED, cabinCamera, aimFrom } from "./scenario-world.ts";

const byId=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T;
const go=byId<HTMLButtonElement>("go"), shots=byId("shots"), status=byId("status");
const meter=byId("meter"), details=byId<HTMLDetailsElement>("details");
const canvas=byId<HTMLCanvasElement>("view");
let view:SceneView|undefined;
let current="start";
let scenes:Record<string,{world:World,pose:Pose,day:number,label:string}>={};
let downloadUrl="";
let frameId=0, prev=0, frames=0, interval=0;
const expect=(check:boolean,message:string)=>{if(!check)throw Error(message);};
const tick=(now:number)=>{
  const scene=scenes[current];
  if(!view || !scene)return;
  const dt=prev ? Math.min(.12,(now-prev)/1000) : .016;
  prev=now;frames++;interval+=dt;
  view.update(scene.pose,null,scene.day,dt);
  if(interval>=.5){
    meter.textContent=canvas.width+" × "+canvas.height+" ／ "+view.stats.draws+" 描画 ／ "+view.stats.chunks+" チャンク";
    interval=0;frames=0;
  }
  frameId=requestAnimationFrame(tick);
};
function select(id:string){
  const scene=scenes[id];
  if(!scene)return;
  cancelAnimationFrame(frameId);
  view?.dispose();
  view=new SceneView(canvas,scene.world);
  view.configure(defaults);
  current=id;
  for(const button of document.querySelectorAll<HTMLButtonElement>("[data-shot]"))button.setAttribute("aria-pressed",String(button.dataset.shot===id));
  status.textContent=scene.label;
  prev=0;frames=0;interval=0;
  frameId=requestAnimationFrame(tick);
}
async function prepare(){
  go.disabled=true;
  status.textContent="地形と建物を作成して復元を検証しています…";
  await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
  try{
    const source=new World(SCENE_SEED);
    const result=runScenario(source);
    const origin=new World(SCENE_SEED), partial=new World(SCENE_SEED);
    partial.loadEdits(result.partial);
    const x=136,z=149;
    const eye={x:x+.5,y:source.highest[x+256*z]+1.001,z:z+.5};
    const pose=safeSpawn(source,aimFrom(eye,{x:128.5,y:35.7,z:143.5}));
    const snapshot:WorldSave={
      format:"webcraft777",version:1,generator:1,id:"integration-cottage",name:"湖畔の小屋・検証",seed:SCENE_SEED,
      mode:"explore",revision:0,updatedAt:Date.now(),pose,bag:result.explore,selected:0,
      flying:false,edits:source.exportEdits(),day:.735,settings:{...defaults},guideSeen:true,
    };
    // Use separate databases so running the test cannot change a player's worlds.
    const originalDB=new SaveStore("webcraft777.test.cottage.source.v1");
    const importedDB=new SaveStore("webcraft777.test.cottage.import.v1");
    const prior=await originalDB.get(snapshot.id);
    await originalDB.write(snapshot,prior?.revision??null);
    const loaded=await originalDB.get(snapshot.id);
    if(!loaded) throw Error("保存後にワールドが見つかりません。");
    const file=backupText(loaded), reparsed=parseBackup(file);
    const previous=await importedDB.get(reparsed.id);
    await importedDB.write(reparsed,previous?.revision??null);
    const imported=await importedDB.get(reparsed.id);
    if(!imported) throw Error("再読み込み後にワールドが見つかりません。");
    const restored=new World(imported.seed);
    restored.loadEdits(imported.edits);
    expect(JSON.stringify(imported.bag)===JSON.stringify(snapshot.bag),"所持品が一致しません。");
    expect(JSON.stringify(imported.pose)===JSON.stringify(snapshot.pose),"位置と向きが一致しません。");
    expect(JSON.stringify(restored.exportEdits())===JSON.stringify(snapshot.edits),"ブロック変更が一致しません。");
    const {hole}=result;
    expect(restored.get(hole.x,hole.y,hole.z)===0,"穴が復元されていません。");
    for(const t of result.plan)expect(restored.get(t.x,t.y,t.z)===t.id,"建材が復元されていません。");
    if(downloadUrl)URL.revokeObjectURL(downloadUrl);
    downloadUrl=URL.createObjectURL(new Blob([file],{type:"application/json"}));
    byId<HTMLAnchorElement>("backup").href=downloadUrl;
    scenes={
      start:{world:origin,pose:origin.spawn(),day:.45,label:"開始地点 ／ 林と湖のある草地"},
      construction:{world:partial,pose:cabinCamera,day:.57,label:"建築中 ／ 157ブロック設置済み"},
      evening:{world:restored,pose:cabinCamera,day:snapshot.day,label:"完成・夕方 ／ ファイルから復元した小屋"},
    };
    byId("proof").textContent="歩行・ダッシュ・ジャンプ、7ブロック採掘、木のツルハシ制作、丸石4個から石レンガ"+
      quantity(imported.bag,9)+"個制作、耐久値"+activeStack(imported.bag,17)?.durability+
      "を確認。5ブロック以内の面への設置で"+result.placed+"個の建材を組み、X=128・Z=144の境界を通過。"+
      "実際の IndexedDB に保存後、JSONファイル内容を別の検証用データベースに読み込み、建物・掘った穴・所持品・位置と向きが一致しました。";
    details.hidden=false;shots.hidden=false;go.hidden=true;
    select("start");
  }catch(error){
    status.textContent="検証失敗 ／ "+(error instanceof Error?error.message:String(error));
    go.disabled=false;
  }
}
go.addEventListener("click",()=>void prepare());
shots.addEventListener("click",e=>{
  const button=(e.target as Element).closest<HTMLButtonElement>("[data-shot]");
  if(button?.dataset.shot)select(button.dataset.shot);
});
