// Isolated, synchronized GPU-finish timings. This is a diagnostic, not an FPS benchmark.
import {World} from '../src/world'
import {SceneView} from '../src/renderer'
import {presets} from '../src/preferences'
import {aimFrom} from './scenario-world'
async function measure(){
 const canvas=document.querySelector('canvas')!,world=new World('777-SOAK')
 const p=aimFrom({x:106.45,y:29.02,z:115.5},{x:139,y:30,z:94})
 const view=new SceneView(canvas,world),gl=canvas.getContext('webgl2')!
 const variants=[['標準',{}],['影オフ',{shadows:false}],['草花オフ',{vegetation:false}],['水面・葉・手元の追加演出オフ',{effects:false}]] as const
 const next=()=>new Promise<void>(done=>requestAnimationFrame(()=>done()))
 const rows:Record<string,unknown>[]=[]
 for(const [name,override] of variants){
   view.configure({...presets.standard,quality:'standard',...override})
   do{await next();view.update(p,null,.52,.016)}while(view.stats.queued)
   const values:number[]=[]
   for(let i=0;i<52;i++){
     await next();const start=performance.now()
     view.update(p,null,.52,.016,{active:true,held:19,mining:0})
     gl.finish()
     if(i>=4)values.push(performance.now()-start)
   }
   values.sort((a,b)=>a-b);rows.push({name,frames:values.length,medianMs:values[23],p95Ms:values[45],draws:view.stats.draws,triangles:view.stats.triangles})
 }
 const dbg=gl.getExtension('WEBGL_debug_renderer_info')
 const result={ok:true,internal:[canvas.width,canvas.height],gpu:dbg?gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL):'未測定',rows}
 document.querySelector('pre')!.textContent=JSON.stringify(result,null,2)
 Object.assign(window,{effectsResult:result});view.dispose()
}
measure().catch(err=>{document.querySelector('pre')!.textContent=String(err);Object.assign(window,{effectsResult:{ok:false,error:String(err)}})})
