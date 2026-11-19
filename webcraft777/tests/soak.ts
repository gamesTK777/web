// A repeatable foreground WebGL workload. It does not read or write player saves.
import { World } from "../src/world.ts";
import { SceneView } from "../src/renderer.ts";
import { createPlayer, raycast, mineAt, placeAt } from "../src/physics.ts";
import { createBag } from "../src/inventory.ts";

const canvas = document.querySelector<HTMLCanvasElement>("#view")!;
const start = document.querySelector<HTMLButtonElement>("#begin")!;
const progress = document.querySelector<HTMLElement>("#progress")!;
const conditions = document.querySelector<HTMLElement>("#conditions")!;
const table = document.querySelector<HTMLTableSectionElement>("#results")!;
const totals = document.querySelector<HTMLElement>("#totals")!;
let activeView: SceneView | undefined;
const SEED = "777-SOAK";
const SETTINGS = {distance:3,scale:1,shadows:false};

class Range {
  min = Infinity;
  max = -Infinity;
  add(n:number) {
    if(Number.isFinite(n)) { this.min=Math.min(this.min,n); this.max=Math.max(this.max,n); }
  }
  toString() { return !Number.isFinite(this.min) ? "―" : this.min === this.max ? String(this.max) : this.min+"–"+this.max; }
}
const makeBucket = () => ({frames:0, ms:0, draws:new Range(), chunks:new Range(), geometry:new Range(), heap:new Range()});
function surface(world:World,x:number,z:number) {
  for(let y=94;y>0;y--) {
    const id=world.get(Math.floor(x),y,Math.floor(z));
    if(id!==0 && id!==13) return y;
  }
  return 0;
}

function run() {
  start.disabled=true;
  table.replaceChildren();
  activeView?.dispose();
  let view:SceneView;
  const world=new World(SEED);
  try {
    view=new SceneView(canvas,world);
    view.configure(SETTINGS);
    activeView=view;
  } catch(error) {
    progress.textContent="WebGL 2 を開始できません。"+String(error);
    start.disabled=false;
    return;
  }
  const bag=createBag("creative");
  const gl=canvas.getContext('webgl2');
  const gpuInfo=gl?.getExtension('WEBGL_debug_renderer_info');
  const gpu=gl && gpuInfo ? String(gl.getParameter(gpuInfo.UNMASKED_RENDERER_WEBGL)) : '取得不可';
  const p=createPlayer(world.spawn());
  const center={x:Math.floor(p.x)+.5,z:Math.floor(p.z)+.5};
  const marker={x:Math.floor(center.x),y:0,z:Math.floor(center.z)};
  marker.y=surface(world,marker.x,marker.z);
  p.x=marker.x+.5; p.z=marker.z+.5; p.y=marker.y+2.2; p.pitch=-Math.PI/2;
  const initialHole=mineAt(world,p,bag,"creative",0,raycast(world,p)).ok;
  const visited=new Set<string>();
  let elapsed=0, previous:number|null=null, nextHUD=0, minute=0, bucket=makeBucket();
  let placed=0, mined=Number(initialHole), failed=0, lastPlacement=-1, lastRemoval=-1, focusedMs=0;
  let placedBlock:{x:number,y:number,z:number}|null=null;
  let active=true;
  const suspend=()=>{previous=null;};
  document.addEventListener("visibilitychange",suspend);
  function finish() {
    active=false;
    start.disabled=false;
    document.removeEventListener("visibilitychange",suspend);
    progress.textContent="計測完了 ／ タブの非表示時間を除き"+(elapsed/1000).toFixed(1)+"秒";
  }
  function frame(now:number) {
    if(!active) return;
    requestAnimationFrame(frame);
    if(document.hidden) {previous=null; return;}
    const ms=previous===null ? 0 : Math.max(0,now-previous);
    previous=now;
    elapsed+=ms;
    if(document.hasFocus())focusedMs+=ms;
    const seconds=elapsed/1000, leg=Math.floor(seconds/15), t=seconds-leg*15;
    // Four 12 s arcs with 3 s stops. Every minute revisits identical sections and mesh boundaries.
    const angle=(leg+Math.min(1,t/12))*Math.PI/2;
    p.x=center.x+Math.cos(angle)*22;
    p.z=center.z+Math.sin(angle)*22;
    const top=surface(world,p.x,p.z);
    p.y=top+2.2;
    p.yaw=angle-Math.PI; // Follow the tangent, looking against -Z at yaw=0.
    p.pitch=t<12 ? -.45 : -Math.PI/2;
    if(t>=12 && lastPlacement!==leg) {
      lastPlacement=leg;
      const aim=raycast(world,p);
      const result=placeAt(world,p,bag,"creative",8,aim);
      placedBlock=aim && result.ok ? {x:aim.x+aim.nx,y:aim.y+aim.ny,z:aim.z+aim.nz} : null;
      if(result.ok) placed++;
      else failed++;
    }
    if(t>=13 && lastRemoval!==leg) {
      lastRemoval=leg;
      const aim=raycast(world,p);
      if(aim && placedBlock && aim.x===placedBlock.x && aim.y===placedBlock.y && aim.z===placedBlock.z &&
         mineAt(world,p,bag,"creative",8,aim).ok) mined++;
      else failed++;
      placedBlock=null;
    }
    visited.add(Math.floor(p.x/16)+","+Math.floor(p.z/16));
    view.update(p,raycast(world,p),(.2+seconds/360)%1,Math.min(.1,ms/1000));
    if(ms>0) {bucket.frames++;bucket.ms+=ms;}
    bucket.draws.add(view.stats.draws);
    bucket.chunks.add(view.stats.chunks);
    bucket.geometry.add(view.stats.geometries);
    if(elapsed>=nextHUD) {
      nextHUD=elapsed+750;
      const heap=(performance as Performance & {memory?:{usedJSHeapSize:number}}).memory?.usedJSHeapSize;
      if(heap) bucket.heap.add(Math.round(heap/1048576));
      conditions.textContent="シード "+SEED+" ／ 描画距離3 ／ 解像度倍率1 ／ 影なし ／ "+canvas.width+" × "+canvas.height+" px ／ フォーカス "+Math.round(focusedMs/Math.max(1,elapsed)*100)+"% ／ "+gpu;
      progress.textContent="計測中 "+Math.floor(seconds/60)+"分"+Math.floor(seconds%60)+"秒 ／ 今の区間 "+(bucket.ms?bucket.frames*1000/bucket.ms:0).toFixed(1)+" FPS";
      totals.textContent="通過した水平チャンク "+visited.size+" ／ 設置 "+placed+" ／ 採掘 "+mined+" ／ 編集失敗 "+failed+
        " ／ 開始時の採掘跡 "+(initialHole && world.get(marker.x,marker.y,marker.z)===0?"維持":"未確認");
    }
    if(elapsed>=(minute+1)*60000) {
      const tr=table.insertRow();
      for(const value of [++minute,(bucket.frames*1000/bucket.ms).toFixed(1),bucket.draws,bucket.chunks,bucket.geometry,bucket.heap]) tr.insertCell().textContent=String(value);
      bucket=makeBucket();
      if(minute===10) finish();
    }
  }
  requestAnimationFrame(frame);
}
start.addEventListener("click",run);
