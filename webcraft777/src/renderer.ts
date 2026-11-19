import * as T from "three";
import {World,affectedChunks,chunkKey} from "./world";
import {makeAtlas} from "./textures";
import {meshChunk} from "./mesher";
import {Atmosphere,terrainMaterial} from "./atmosphere";
import {InteractionView,type Presentation} from "./interaction-view";
import {eyeHeight} from "./physics";

interface Position {x:number;y:number;z:number}
interface CameraPose extends Position {yaw:number;pitch:number}
interface Quality {distance:number;scale:number;shadows:boolean;quality?:'low'|'standard'|'high'|'legacy';vegetation?:boolean;effects?:boolean}
type ChunkMeshes=T.Mesh<T.BufferGeometry,T.ShaderMaterial>[];
interface Task {key:number;priority:number}

const fragments=[0,0x83ac52,0xa87c54,0x929d92,0xdfbf89,0x96784e,0x639c52,0xc7975b,
  0x929b8e,0x8a9d96,0x9dd7cf,0x65706b,0xf3c572,0x69c8c7,0x59625f];

export class SceneView {
  readonly scene=new T.Scene();
  readonly camera=new T.PerspectiveCamera(67,1,.06,320);
  readonly stats={draws:0,chunks:0,geometries:0,textures:0,fps:0,queued:0,triangles:0,chunkMs:0,rebuilt:0};
  private readonly gl:T.WebGLRenderer;
  private readonly sky:Atmosphere;
  private readonly atlas=makeAtlas();
  private readonly heightTexture:T.DataTexture;
  private readonly heights=new Uint8Array(256*256);
  private readonly uniforms={
    lampPositions:{value:Array.from({length:4},()=>new T.Vector3())},lampCount:{value:0},
    lampColors:{value:Array.from({length:4},()=>new T.Vector3())},
    fogEnd:{value:75},clock:{value:0},shadows:{value:1},extras:{value:1},submerged:{value:0},
  };
  private readonly tools:InteractionView;
  private readonly materials:[T.ShaderMaterial,T.ShaderMaterial];
  private readonly batches=new Map<number,ChunkMeshes>();
  private readonly pending:Task[]=[];
  private readonly wanted=new Set<number>();
  private readonly dirty=new Set<number>();
  private readonly unsubscribe:()=>void;
  private readonly selection:T.LineSegments<T.EdgesGeometry,T.LineBasicMaterial>;
  private readonly border:T.Mesh<T.BufferGeometry,T.ShaderMaterial>;
  private readonly chips:T.InstancedMesh<T.BoxGeometry,T.MeshBasicMaterial>;
  private particles:{x:number;y:number;z:number;vx:number;vy:number;vz:number;life:number;id:number}[]=[];
  private readonly dummy=new T.Object3D();
  private readonly chipColor=new T.Color();
  private quality:Quality={distance:4,scale:1,shadows:true};
  private cx=-100;private cz=-100;private cy=-100;private t=0;
  private wt=0;private ht=0;private lampDue=0;private elapsed=0;private frameCount=0;private totalFrames=0;
  private lampCamera=new T.Vector3(Infinity,Infinity,Infinity);
  private vegetation=1;
  private visibleChunks=new Set<number>();
  constructor(private canvas:HTMLCanvasElement,private world:World) {
    const ctx=canvas.getContext("webgl2",{antialias:false,alpha:false,powerPreference:"high-performance"});
    if(!ctx) throw new Error("WebGL 2を利用できません。ChromeまたはEdgeの設定でグラフィック アクセラレーションを有効にして再起動してください。");
    this.gl=new T.WebGLRenderer({canvas,context:ctx,antialias:false,alpha:false});
    this.gl.outputColorSpace=T.SRGBColorSpace;
    this.gl.toneMapping=T.NoToneMapping;
    this.atlas.anisotropy=Math.min(4,this.gl.capabilities.getMaxAnisotropy());
    this.gl.setClearColor(0xbcd7cd);
    this.sky=new Atmosphere(this.scene,world.salt);
    for(let i=0;i<this.heights.length;i++)this.heights[i]=Math.max(0,world.highest[i]);
    this.heightTexture=new T.DataTexture(this.heights,256,256,T.RedFormat);
    this.heightTexture.magFilter=T.NearestFilter;this.heightTexture.minFilter=T.NearestFilter;
    this.heightTexture.needsUpdate=true;
    this.materials=[terrainMaterial(this.atlas,this.heightTexture,this.sky,this.uniforms,false),
      terrainMaterial(this.atlas,this.heightTexture,this.sky,this.uniforms,true)];
    this.tools=new InteractionView(this.scene,this.camera,this.atlas);
    const outlineBox=new T.BoxGeometry(1.008,1.008,1.008);
    this.selection=new T.LineSegments(new T.EdgesGeometry(outlineBox),new T.LineBasicMaterial({color:0xffedb5,toneMapped:false}));
    outlineBox.dispose();this.selection.visible=false;this.selection.renderOrder=4;this.scene.add(this.selection);
    this.chips=new T.InstancedMesh(new T.BoxGeometry(.1,.1,.1),new T.MeshBasicMaterial({color:0xffffff}),64);
    this.chips.count=0;this.chips.frustumCulled=false;this.chips.visible=false;this.scene.add(this.chips);
    this.border=this.makeBorder();this.scene.add(this.border);
    this.unsubscribe=world.onEdit((x,y,z)=>{
      for(const key of affectedChunks(x,y,z)) if(this.wanted.has(key))this.dirty.add(key);
      const col=x+256*z, h=Math.max(0,world.highest[col]);
      if(this.heights[col]!==h){this.heights[col]=h;this.heightTexture.needsUpdate=true;}
      this.lampDue=0;
    });
  }
  configure(q:Quality) {
    const distance=Math.max(2,Math.min(8,Math.round(q.distance)));
    if(distance!==this.quality.distance)this.cx=-100;
    const density=q.vegetation===false?0:q.quality==='high'?1.40:q.quality==='low'?.42:1;
    if(density!==this.vegetation){
      this.vegetation=density;
      for(const key of this.batches.keys()) if(this.world.occupied[key])this.dirty.add(key);
    }
    this.quality={...q,distance,scale:Math.max(.45,Math.min(1.5,q.scale))};
    this.uniforms.shadows.value=q.shadows?(q.quality==='high'?2:1):0;
    this.uniforms.extras.value=q.effects===false?0:1;
    this.uniforms.fogEnd.value=(distance+.45)*16;
    this.wt=0;
  }
  private makeBorder(){
    const positions:number[]=[];
    for(const [x0,z0,x1,z1] of [[0,0,256,0],[256,0,256,256],[256,256,0,256],[0,256,0,0]])
      positions.push(x0,0,z0,x1,0,z1,x1,96,z1,x0,0,z0,x1,96,z1,x0,96,z0);
    const g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(positions,3));
    const m=new T.ShaderMaterial({side:T.DoubleSide,transparent:true,depthWrite:false,
      vertexShader:`varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`varying vec3 p;void main(){
        float limit=1.-smoothstep(1.,12.,distance(cameraPosition,p));if(limit<=0.)discard;
        vec2 grid=fract(vec2(p.x+p.z,p.y)*.5);float line=step(min(grid.x,grid.y),.022);
        gl_FragColor=vec4(.95,.79,.45,limit*(.06+.49*line));}`});
    const edge=new T.Mesh(g,m);edge.visible=false;return edge;
  }
  private schedule(p:CameraPose) {
    const cx=Math.floor(p.x/16),cz=Math.floor(p.z/16),cy=Math.floor(p.y/16);
    if(cx===this.cx && cz===this.cz && cy===this.cy)return;
    this.cx=cx;this.cz=cz;this.cy=cy;this.wanted.clear();this.pending.length=0;
    const r=this.quality.distance, forwardX=-Math.sin(p.yaw),forwardZ=-Math.cos(p.yaw);
    for(let z=Math.max(0,cz-r);z<=Math.min(15,cz+r);z++)for(let x=Math.max(0,cx-r);x<=Math.min(15,cx+r);x++){
      const dx=x-cx,dz=z-cz,dist=Math.hypot(dx,dz);
      if(dist>r+.65)continue;
      const surfaceY=this.world.highest[(x*16+8)+256*(z*16+8)]>>4;
      for(let y=0;y<6;y++){
        const key=chunkKey(x,y,z);this.wanted.add(key);
        if(this.batches.has(key) || !this.world.occupied[key])continue;
        const lookBonus=dx*forwardX+dz*forwardZ;
        const surfacePriority=Math.min(Math.abs(y-surfaceY)*2,Math.abs(y-cy)*2);
        this.pending.push({key,priority:dist*2.2+surfacePriority+.20*Math.abs(y-cy)-lookBonus*.55+(y+1<Math.min(cy,surfaceY)?8:0)});
      }
    }
    this.pending.sort((a,b)=>b.priority-a.priority);
    for(const [key,meshes] of this.batches) if(!this.wanted.has(key)){
      this.removeMeshes(meshes);this.batches.delete(key);
    }
    for(const key of this.dirty)if(!this.wanted.has(key))this.dirty.delete(key);
  }
  private removeMeshes(meshes:ChunkMeshes) {
    for(const mesh of meshes){this.scene.remove(mesh);mesh.geometry.dispose();}
  }
  private rebuild(key:number) {
    const before=this.batches.get(key);if(before) this.removeMeshes(before);
    const result:ChunkMeshes=[];
    const geometries=meshChunk(this.world,key&15,key>>>8,(key>>>4)&15,this.vegetation);
    for(let i=0;i<geometries.length;i++) {
      const geom=geometries[i];if(!geom) continue;
      const mesh=new T.Mesh(geom,this.materials[i===0?0:1]);mesh.renderOrder=i===0?0:1;
      mesh.onBeforeRender=()=>{this.visibleChunks.add(key);};
      result.push(mesh);this.scene.add(mesh);
    }
    this.batches.set(key,result);
  }
  private pump() {
    const start=performance.now(),budget=this.totalFrames<4?8:3.5;
    let count=0;
    do{
      let key:number;
      if(this.dirty.size){key=this.dirty.values().next().value!;this.dirty.delete(key);}
      else if(this.pending.length){key=this.pending.pop()!.key;if(this.batches.has(key))continue;}
      else break;
      this.rebuild(key);count++;
    }while(count<9 && performance.now()-start<budget);
    this.stats.chunkMs=count?performance.now()-start:0;
    this.stats.rebuilt=count;
  }
  private lamps(p:Position) {
    const nearby:{key:number;d:number}[]=[];
    for(const key of this.world.lamps){
      const x=(key&255)+.5,y=(key>>>16)+.5,z=((key>>>8)&255)+.5;
      const d=(x-p.x)**2+(z-p.z)**2+(y-p.y)**2;
      if(d>26*26) continue;
      if(nearby.length===4&&d>=nearby[3].d)continue;
      nearby.push({key,d});nearby.sort((a,b)=>a.d-b.d);
      if(nearby.length>4)nearby.pop();
    }
    this.uniforms.lampCount.value=nearby.length;
    nearby.forEach(({key},i)=>{
      this.uniforms.lampPositions.value[i].set((key&255)+.5,(key>>>16)+.5,((key>>>8)&255)+.5);
      const aqua=this.world.data[key]===25;
      this.uniforms.lampColors.value[i].set(aqua?.36:1.86,aqua?1.57:1.09,aqua?1.40:.43);
    });
  }
  effect(x:number,y:number,z:number,id:number,kind:'mine'|'place'='mine') {
    this.tools.swing();
    const n=this.quality.effects===false?0:kind==='place'?3:7;
    for(let i=0;i<n;i++){
      if(this.particles.length>=64)this.particles.shift();
      this.particles.push({x:x+.5+(Math.random()-.5)*.65,y:y+.55+Math.random()*.38,z:z+.5+(Math.random()-.5)*.65,
        vx:(Math.random()-.5)*2.1,vy:1+Math.random()*1.7,vz:(Math.random()-.5)*2.1,life:.32+Math.random()*.17,id});
    }
  }
  private updateParticles(dt:number){
    for(let i=this.particles.length-1;i>=0;i--){
      const p=this.particles[i];p.life-=dt;
      if(p.life<=0){this.particles.splice(i,1);continue;}
      p.vy-=8*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
    }
    this.chips.count=this.particles.length;this.chips.visible=this.chips.count>0;
    for(let i=0;i<this.chips.count;i++) {
      const p=this.particles[i];
      this.dummy.position.set(p.x,p.y,p.z);this.dummy.rotation.set(p.life*4,i+p.life*5,i*.8);
      this.dummy.scale.setScalar(Math.min(1,p.life*5));this.dummy.updateMatrix();
      this.chips.setMatrixAt(i,this.dummy.matrix);this.chips.setColorAt(i,this.chipColor.setHex(fragments[p.id]??
        (p.id===23||p.id===25||p.id===26?0x91c8bd:0xb4a077)));
    }
    if(this.chips.count){this.chips.instanceMatrix.needsUpdate=true;if(this.chips.instanceColor)this.chips.instanceColor.needsUpdate=true;}
  }
  update(p:CameraPose & {fovOffset?:number},target:Position|null,day:number,dt:number,presentation?:Presentation) {
    const w=Math.max(1,this.canvas.clientWidth),h=Math.max(1,this.canvas.clientHeight);
    if(w!==this.wt || h!==this.ht){
      this.wt=w;this.ht=h;
      // Keep fill cost comparable on laptop and high-DPI displays. The chosen
      // resolution multiplier still scales up or down relative to this baseline.
      const nativeRatio=Math.min(window.devicePixelRatio||1,1.5);
      // Explicit standard/high presets render native 1080p at scale 1. The
      // legacy/custom benchmark and low preset retain the original pixel cap.
      const budget=this.quality.quality==='standard'||this.quality.quality==='high'?2_073_600:1_200_000;
      const budgetRatio=Math.sqrt(budget/(w*h));
      this.gl.setPixelRatio(Math.min(nativeRatio,budgetRatio)*this.quality.scale);
      this.gl.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();
    }
    this.t+=dt;this.uniforms.clock.value=this.t;
    const eye=eyeHeight(p), fov=67+(p.fovOffset??0);
    if(Math.abs(fov-this.camera.fov)>.01){this.camera.fov=fov;this.camera.updateProjectionMatrix();}
    this.camera.position.set(p.x,p.y+eye,p.z);this.camera.rotation.set(p.pitch,p.yaw,0,"YXZ");
    this.sky.update(day,this.camera,this.t);
    this.selection.visible=Boolean(target);
    if(target)this.selection.position.set(target.x+.5,target.y+.5,target.z+.5);
    this.uniforms.submerged.value=Number(this.world.get(p.x|0,(p.y+eye)|0,p.z|0)===13);
    this.border.visible=Math.min(p.x,p.z,256-p.x,256-p.z)<12;
    this.schedule(p);this.pump();
    this.lampDue-=dt;
    if(this.lampDue<=0||this.lampCamera.distanceToSquared(this.camera.position)>4){
      this.lamps(p);this.lampDue=.23;this.lampCamera.copy(this.camera.position);
    }
    this.updateParticles(dt);
    const indoors=this.world.highest[(p.x|0)+(p.z|0)*256]>p.y+eye+1.5;
    this.tools.update(this.camera,target,presentation,dt,
      (indoors?.57:.70)+this.sky.day.value*(indoors?.13:.30),this.uniforms.extras.value>0);
    this.visibleChunks.clear();this.gl.render(this.scene,this.camera);
    const info=this.gl.info;
    this.stats.draws=info.render.calls;this.stats.triangles=info.render.triangles;
    this.stats.geometries=info.memory.geometries;this.stats.chunks=this.visibleChunks.size;
    this.stats.textures=info.memory.textures;
    this.stats.queued=this.pending.length+this.dirty.size;
    this.totalFrames++;this.frameCount++;this.elapsed+=dt;
    if(this.elapsed>=.6){this.stats.fps=Math.round(this.frameCount/this.elapsed);this.frameCount=0;this.elapsed=0;}
  }
  dispose(){
    this.unsubscribe();
    for(const parts of this.batches.values())this.removeMeshes(parts);
    this.batches.clear();this.dirty.clear();this.wanted.clear();this.pending.length=0;
    this.selection.geometry.dispose();this.selection.material.dispose();
    this.border.geometry.dispose();this.border.material.dispose();
    this.chips.geometry.dispose();this.chips.material.dispose();this.chips.dispose();
    this.sky.dispose(this.scene);this.materials.forEach(m=>m.dispose());
    this.tools.dispose();
    this.atlas.dispose();this.heightTexture.dispose();this.scene.clear();this.gl.dispose();
  }
}
