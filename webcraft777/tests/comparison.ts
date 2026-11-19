// A fixed generator-1 save and camera route, shared by both revisions.
import { World } from '../src/world'
import { SceneView } from '../src/renderer'
import { raycast, mineAt, placeAt } from '../src/physics'
import { createBag } from '../src/inventory'
import { aimFrom, cabinCamera } from './scenario-world'
const q=new URLSearchParams(location.search), canvas=document.querySelector('canvas')!, status=document.querySelector('output')!
const fixture=await (await fetch('../examples/lakeside.json')).json()
const t0=performance.now(), world=new World(fixture.seed);world.loadEdits(fixture.edits)
const spawn=world.spawn()
// The same excavated test gallery and two lamps provide a reproducible indoor exposure reference.
for(let z=130;z<=145;z++)for(let x=120;x<=124;x++)for(let y=17;y<=20;y++)world.set(x,y,z,0)
for(const z of [132,139])world.set(120,18,z,12)
// Keep the measured routes stable when composing the reference photographs.
const routes={
 forest:{pose:aimFrom({x:133.5,y:37,z:143.5},{x:120,y:34,z:108}),day:.45},
 shore:{pose:aimFrom({x:131.5,y:30.3,z:126.5},{x:121,y:30,z:83}),day:.52},
 cave:{pose:aimFrom({x:122.4,y:17,z:143.8},{x:121.3,y:18.3,z:130}),day:.45},
 cottage:{pose:cabinCamera,day:.735}}
const shots={...routes,
 forest:{pose:aimFrom({x:98.5,y:36.2,z:106.5},{x:75.5,y:36.5,z:106.5}),day:.45},
 shore:{pose:aimFrom({x:106.45,y:29.02,z:115.5},{x:139,y:30,z:94}),day:.52}}
const generationMs=performance.now()-t0, setup=performance.now()
const settings=q.get('preset')==='low' ?
 {quality:'low' as const,distance:2,scale:.7,shadows:false,vegetation:false,effects:false} :
 q.get('shadows')==='1' ? {quality:'standard' as const,distance:3,scale:1,shadows:true} :
 {distance:3,scale:1,shadows:false}
const view=new SceneView(canvas,world);view.configure(settings)
const gl=canvas.getContext('webgl2')!, debug=gl.getExtension('WEBGL_debug_renderer_info')
const inner=view as any
let batch=0
if(typeof inner.pump==='function'){const pump=inner.pump.bind(view);inner.pump=()=>{const t=performance.now();pump();batch=performance.now()-t}}
const next=()=>new Promise<number>(r=>requestAnimationFrame(r))
const env={version:navigator.userAgent,gpu:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'未測定',width:innerWidth,height:innerHeight,generationMs,setupMs:performance.now()-setup}
let busy=false, visibilityEpoch=0
document.addEventListener('visibilitychange',()=>{visibilityEpoch++})
const gauge=(a:number[],f:number)=>a[Math.min(a.length-1,Math.ceil(a.length*f)-1)]
async function photo(name:keyof typeof shots,source=shots){
 const {pose,day}=source[name];let i=0
 // Wake nearby lights even in the old renderer whose refresh uses elapsed time.
 view.update(pose,null,day,.25)
 do{await next();view.update(pose,null,day,0);i++}while(view.stats.queued&&i<300)
 view.update(pose,null,day,0);gl.finish();status.textContent=name
 return {pose,day,frames:i}
}
async function run(seconds=60, laps=3){
 if(busy)throw Error('計測中');busy=true
 const editY=world.highest[137+256*142]+1, original=world.get(137,editY,142)
 try{
 const rows=[],bag=createBag('creative');let placed=false
 for(let phase=0;phase<laps;phase++){
 const idx=phase%3,scene=(['forest','cave','cottage'] as const)[idx]
 await photo(scene,routes)
 let prev=await next(),epoch=visibilityEpoch,total=0;const frames:number[]=[],build:number[]=[],target=routes[scene],ranges:Record<string,number[]>={}
 let edit=0,fail=0,nextEdit=0;const startGeometry=view.stats.geometries
 const range=(key:string,n:number)=>{const a=ranges[key]??=[Infinity,-Infinity];if(Number.isFinite(n)){a[0]=Math.min(a[0],n);a[1]=Math.max(a[1],n)}}
 while(total<seconds*1000){
 const now=await next(),delta=now-prev;prev=now
 if(document.hidden||epoch!==visibilityEpoch){epoch=visibilityEpoch;continue}
 total+=delta;frames.push(delta);const t=total/1000
 let p={...target.pose}
 if(idx===0){p.x=133.5+7*Math.sin(t*.16);p.z=143.5+4*Math.cos(t*.16);p.y=world.highest[Math.floor(p.x)+256*Math.floor(p.z)]+1.02}
 if(idx===1){p.z=137+5.4*Math.cos(t*.25);p.yaw+=.24*Math.sin(t*.21)}
 if(idx===2){p={...spawn,x:137.5,z:142.5,y:world.highest[137+256*142]+(placed?1.1:2.1),pitch:-1.535}
 if(t>=nextEdit){const hit=raycast(world,p),res=placed?mineAt(world,p,bag,'creative',0,hit):placeAt(world,p,bag,'creative',0,hit)
 if(res.ok){placed=!placed;edit++;if(hit)view.effect(hit.x,hit.y,hit.z,1)}else fail++;nextEdit=t+.28}}
 const hit=idx===2?raycast(world,p):null
 const showHand='quality' in settings
 const presentation=showHand?{active:true,held:idx===0?19:idx===1?12:1,moving:idx!==2,
  mining:idx===2&&placed?Math.min(1,Math.max(0,1-(nextEdit-t)/.28)):0,
  preview:idx===2&&hit&&!placed?{x:hit.x+hit.nx,y:hit.y+hit.ny,z:hit.z+hit.nz,id:1,valid:true}:null}:undefined
 view.update(p,hit,target.day,Math.min(.1,delta/1000),presentation)
 const s=view.stats as any;build.push(s.chunkMs??batch)
 for(const k of ['draws','triangles','queued','geometries','chunks'])range(k,s[k])
 range('textures',inner.gl.info.memory.textures)
 const heap=(performance as any).memory?.usedJSHeapSize;if(heap)range('heapMiB',heap/1048576)
 }
 frames.sort((a,b)=>a-b);build.sort((a,b)=>a-b)
 rows.push({scene,minute:phase+1,seconds:total/1000,avgFPS:frames.length*1000/total,p50:gauge(frames,.5),p95:gauge(frames,.95),p99:gauge(frames,.99),chunkP95:gauge(build,.95),chunkMax:build.at(-1),edit,fail,ranges,startGeometry,endGeometry:view.stats.geometries,endTextures:inner.gl.info.memory.textures})
 status.textContent=JSON.stringify(rows.at(-1))
 }
 return {...env,firstReadyMs,internal:[canvas.width,canvas.height],settings,rows}
 }finally{if(world.get(137,editY,142)!==original)world.set(137,editY,142,original);busy=false}
}
if(q.has('photo'))document.body.className='photo'
const start=performance.now();await photo('forest');const firstReadyMs=performance.now()-start
const api={photo,run,env,shots,firstReadyMs,get stats(){return view.stats}}
Object.assign(window,{comparison:api})
document.querySelector('select')!.onchange=e=>{if(!busy)void photo((e.target as HTMLSelectElement).value as keyof typeof shots)}
const sceneNames={forest:'森',shore:'水辺',cave:'坑道',cottage:'連続編集'}
let downloadUrl=''
async function measure(laps:number) {
 const buttons=[...document.querySelectorAll('button, select')] as (HTMLButtonElement|HTMLSelectElement)[]
 buttons.forEach(b=>b.disabled=true)
 const a=document.querySelector<HTMLAnchorElement>('#download')!,table=document.querySelector<HTMLTableElement>('#results')!
 const detail=document.querySelector<HTMLDetailsElement>('#detail')!
 table.replaceChildren();a.hidden=true;detail.hidden=true;detail.open=false
 try {
  const result=await run(60,laps)
  if(downloadUrl)URL.revokeObjectURL(downloadUrl)
  downloadUrl=URL.createObjectURL(new Blob([JSON.stringify(result,null,2)],{type:'application/json'}))
  a.href=downloadUrl;a.download='webcraft777-'+laps+'min.json';a.hidden=false
  table.innerHTML='<tr><th>区間</th><th>平均FPS</th><th>中央値 ms</th><th>P95 ms</th><th>P99 ms</th></tr>'+
    result.rows.map(r=>'<tr><td>'+r.minute+' '+sceneNames[r.scene]+'</td>'+[r.avgFPS,r.p50,r.p95,r.p99].map(n=>'<td>'+n.toFixed(1)+'</td>').join('')+'</tr>').join('')
  document.querySelector('#raw')!.textContent=JSON.stringify(result,null,2);detail.hidden=false
  status.textContent=result.internal.join(' × ')+'　／　計測完了'
 } catch(e){status.textContent=String(e)} finally{buttons.forEach(b=>b.disabled=false)}
}
document.querySelector<HTMLButtonElement>('#measure')!.onclick=()=>void measure(3)
document.querySelector<HTMLButtonElement>('#soak')!.onclick=()=>void measure(15)
