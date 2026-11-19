// Isolate shader preparation from chunk creation. Regular play uses lazy first-draw compilation.
import {World} from '../src/world'
import {SceneView} from '../src/renderer'
import type {WebGLRenderer} from 'three'
async function test(){
 const source=await (await fetch('../examples/lakeside.json')).json(),t0=performance.now()
 const world=new World(source.seed);world.loadEdits(source.edits)
 const generation=performance.now()-t0,canvas=document.querySelector('canvas')!,t1=performance.now()
 const scene=new SceneView(canvas,world), p=world.spawn()
 const engine=scene as unknown as {gl:WebGLRenderer; schedule(p:typeof source.pose):void;pump():void;pending:unknown[]}
 scene.configure({distance:3,scale:1,shadows:false});const setup=performance.now()-t1
 const t2=performance.now();engine.schedule(p)
 while(engine.pending.length)engine.pump()
 const mesh=performance.now()-t2, t3=performance.now()
 await engine.gl.compileAsync(scene.scene,scene.camera)
 const gl=engine.gl.getContext();gl.finish()
 const shader=performance.now()-t3, t4=performance.now()
 scene.update(p,null,.45,0);gl.finish()
 const result={ok:true,viewport:[innerWidth,innerHeight],internal:[canvas.width,canvas.height],terrainMs:generation,
   rendererMs:setup,initialMeshesMs:mesh,shaderWarmupMs:shader,firstWarmedDrawMs:performance.now()-t4,
   programs:engine.gl.info.programs?.length,parallelCompile:!!gl.getExtension('KHR_parallel_shader_compile')}
 document.querySelector('pre')!.textContent=JSON.stringify(result,null,2)
 Object.assign(window,{startupResult:result});scene.dispose()
}
test().catch(err=>{document.querySelector('pre')!.textContent=String(err);Object.assign(window,{startupResult:{ok:false,error:String(err)}})})
