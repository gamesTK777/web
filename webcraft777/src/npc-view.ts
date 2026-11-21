import * as T from 'three';
import type { NpcWorld,NpcRecord,NpcKind } from './npc';
import type { Point } from './npc-path';

// All residents share a cube mesh, one instanced draw, and one vertex-coloured
// material. The rig is assembled from a body, a nodding head and swinging legs.
type Attachment='body'|'head'|'leftFront'|'rightFront'|'leftRear'|'rightRear'|'tail';
type Part={joint:Attachment;x:number;y:number;z:number;w:number;h:number;d:number;color:number|'coat'};
const part=(joint:Attachment,x:number,y:number,z:number,w:number,h:number,d:number,color:Part['color']):Part=>
  ({joint,x,y,z,w,h,d,color});
const base=(x:number,y:number,z:number,w:number,h:number,d:number,c:Part['color'])=>part('body',x,y,z,w,h,d,c);
const face=(x:number,y:number,z:number,w:number,h:number,d:number,c:Part['color'])=>part('head',x,y,z,w,h,d,c);
const ink=0x302c32, cream=0xffe8c4, tan=0xbf8d6c;
const feet:Attachment[]=['leftFront','rightFront','leftRear','rightRear'];

function livestock(kind:'sheep'|'cow'):Part[]{
  const sheep=kind==='sheep';
  const pieces:Part[]=[
    base(0,.67,.035,.60,.47,.68,sheep?0xc7b19e:'coat'),
    ...(sheep?[
      base(0,.73,.045,.73,.59,.77,'coat'),base(-.31,.65,.02,.15,.34,.56,0xdfd4be),
      base(.32,.67,.08,.14,.32,.49,0xf1e6cb),base(0,.98,.04,.56,.13,.64,0xfff2dc),
      base(0,.69,.42,.50,.38,.13,0xe6d7bd),base(-.23,.72,-.32,.2,.26,.12,0xe3d8bd),
      base(.22,.74,-.32,.20,.27,.12,0xf3e5ca),base(.11,.96,-.17,.22,.14,.23,0xf7ecd6),
    ]:[
      base(-.306,.70,.06,.035,.33,.25,0xf6dfc0),base(.306,.66,-.1,.035,.26,.21,0xe5d4b9),
      base(.081,.915,.09,.30,.04,.22,0xfcebd4),base(-.03,.51,.27,.4,.14,.18,0xc99f8b),
      base(-.19,.63,-.31,.16,.22,.03,0xe6d6b7),base(.314,.85,.12,.045,.17,.24,0xf1e5cb),
      base(-.25,.9,-.09,.15,.035,.18,0xcfbd98),
      part('tail',0,-.12,.00,.065,.29,.055,0xb8997d),part('tail',0,-.28,0,.088,.11,.08,0x4d3c36)
    ]),
    face(0,.02,-.035,sheep?.34:.40,.36,.29,sheep?0xb5937d:'coat'),
    face(0,-.07,-.188,sheep?.28:.35,.15,.11,sheep?0xd7b59a:0xd5a798),
    face(-.102,.068,-.186,.062,.066,.02,ink),face(.102,.068,-.186,.062,.066,.02,ink),
    face(-.108,.082,-.198,.018,.021,.008,cream),face(.108,.082,-.198,.018,.021,.008,cream),
    face(-.215,.06,.014,.14,.078,.14,sheep?0xdcbfb0:'coat'),face(.215,.06,.014,.14,.078,.14,sheep?0xdcbfb0:'coat'),
    face(-.074,-.06,-.246,.036,.025,.01,ink),face(.074,-.06,-.246,.036,.025,.01,ink)
  ];
  if(sheep)pieces.push(face(0,.197,-.03,.37,.105,.33,0xece1c9));
  else pieces.push(face(-.15,.23,.04,.07,.16,.08,cream),face(.15,.23,.04,.07,.16,.08,cream),
    face(0,.055,-.182,.10,.23,.018,0xf2dfcd),face(0,.215,-.015,.21,.075,.23,0x543d36));
  for(const [i,joint] of feet.entries()){
    pieces.push(part(joint,0,-.11,0,.136,.43,.14,sheep?0xbf9b7d:i===2?0xf3e2c7:0x816957),
      part(joint,0,-.337,-.006,.146,.09,.156,0x544842));
  }
  return pieces;
}
const resident:Part[]=[
  base(0,1.05,0,.46,.54,.28,'coat'),base(0,.73,0,.43,.17,.27,0x805f4c),
  base(0,1.13,-.15,.22,.36,.035,0xe9cf9e),base(0,.855,-.145,.44,.09,.048,0x624837),
  base(0,1.30,-.135,.36,.11,.064,0xca8b48),base(.13,1.19,-.16,.067,.16,.047,0xe4ae65),
  base(-.077,.983,-.174,.14,.085,.023,0xa88a64),base(.078,1.095,-.173,.04,.031,.014,0xba9f7b),
  base(-.27,.98,0,.111,.05,.185,0xcba671),base(.27,.98,0,.111,.05,.185,0xcba671),
  base(.085,.855,-.176,.07,.063,.025,0xe0b663),base(-.22,.84,-.015,.13,.19,.15,0x9a724e),
  base(-.265,1.08,0,.105,.34,.18,'coat'),base(.265,1.08,0,.105,.34,.18,'coat'),
  base(-.265,.89,0,.103,.12,.15,tan),base(.265,.89,0,.103,.12,.15,tan),
  face(0,.005,0,.333,.34,.286,0xd8a77e),face(0,.16,.008,.345,.10,.303,0x654b3e),
  face(0,.217,.022,.38,.072,.345,'coat'),face(0,.254,.034,.29,.061,.255,'coat'),
  face(0,.191,-.086,.35,.031,.245,0x483f38),face(.132,.219,-.153,.046,.037,.026,0xe6c780),
  face(-.094,.117,-.145,.12,.048,.023,0x654b3e),face(-.168,-.007,.017,.04,.070,.088,0xc78c6d),
  face(.168,-.007,.017,.04,.070,.088,0xc78c6d),
  face(-.143,.069,.02,.063,.13,.24,0x624a3d),face(.143,.069,.02,.063,.13,.24,0x624a3d),
  face(-.067,.033,-.148,.043,.051,.012,ink),face(.067,.033,-.148,.043,.051,.012,ink),
  face(0,-.018,-.17,.067,.064,.057,0xc2896b),face(0,-.094,-.146,.073,.018,.013,0xa96d58),
  part('leftFront',0,-.27,0,.17,.55,.20,0x454c51),part('rightFront',0,-.27,0,.17,.55,.20,0x454c51),
  part('leftFront',0,-.602,-.023,.18,.13,.246,0x604c3c),part('rightFront',0,-.602,-.023,.18,.13,.246,0x604c3c)
];

const pieces:Record<NpcKind,Part[]>={sheep:livestock('sheep'),cow:livestock('cow'),villager:resident};
const jointNames:Attachment[]=['body','head',...feet,'tail'];
function fabric(){
  const size=32,bytes=new Uint8Array(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const index=(x+y*size)*4;
    const speck=(Math.imul((x>>1)+17,191)^Math.imul((y>>1)+9,127))&31;
    const stitch=((x+y*3)%19===0 || (y%9===0 && x%7<3))?12:0;
    const tint=Math.min(255,220+speck+((x^y)&3)-stitch);
    bytes[index]=tint;bytes[index+1]=tint;bytes[index+2]=tint;bytes[index+3]=255;
  }
  const texture=new T.DataTexture(bytes,size,size);
  texture.generateMipmaps=true;texture.magFilter=T.NearestFilter;texture.minFilter=T.LinearMipmapLinearFilter;
  texture.needsUpdate=true;return texture;
}
function contactMaterial(){
  return new T.ShaderMaterial({transparent:true,depthWrite:false,
    vertexShader:`varying vec2 pos;void main(){pos=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}`,
    fragmentShader:`varying vec2 pos;void main(){vec2 p=floor(pos*20.+.5)/20.;
      float a=(1.-smoothstep(.2,1.,dot(p,p)))*.31;gl_FragColor=vec4(.065,.105,.069,a);
      #include <colorspace_fragment>
    }`});
}
export class NpcView {
  private geometry=new T.BoxGeometry(1,1,1);
  private texture=fabric();
  private material=new T.MeshBasicMaterial({vertexColors:true,map:this.texture});
  private shade=new T.InstancedMesh(new T.PlaneGeometry(1,1).rotateX(-Math.PI/2),contactMaterial(),24);
  private mesh:T.InstancedMesh<T.BoxGeometry,T.MeshBasicMaterial>;
  private root=new T.Object3D();
  private joints=new Map<Attachment,T.Object3D>();
  private local=new T.Object3D();
  private out=new T.Matrix4();
  private color=new T.Color();
  private palette=new Map<number,T.Color>();
  private previousClock=-1;
  private previousRevision=-1;
  private previousCenter=new T.Vector3(Infinity,0,0);
  private previousDay=-1;
  private previousMobile:boolean|undefined;
  constructor(private scene:T.Scene){
    const colors:number[]=[],normal=this.geometry.getAttribute('normal');
    for(let i=0;i<normal.count;i++){
      const l=.76+normal.getY(i)*.19+normal.getX(i)*.075+normal.getZ(i)*.035;
      colors.push(l,l,l*.99);
    }
    this.geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));
    this.mesh=new T.InstancedMesh(this.geometry,this.material,24*48);
    this.mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);this.mesh.count=0;this.mesh.frustumCulled=false;
    this.mesh.name='羊・牛・村人';scene.add(this.mesh);
    this.shade.name='足元の影';this.shade.frustumCulled=false;this.shade.count=0;this.shade.renderOrder=.5;scene.add(this.shade);
    for(const k of jointNames){const obj=new T.Object3D();this.joints.set(k,obj);this.root.add(obj);}
    for(const k of Object.keys(pieces) as NpcKind[])for(const p of pieces[k]){
      if(typeof p.color==='number'&&!this.palette.has(p.color))this.palette.set(p.color,new T.Color(p.color));
    }
  }
  private pose(n:NpcRecord,sim:NpcWorld,far:boolean){
    const m=sim.motion(n),human=n.kind==='villager',cow=n.kind==='cow';
    const phase=far?0:sim.clock,phaseId=n.id.charCodeAt(n.id.length-1);
    const moving=m.mode==='walk';
    const swing=far||!moving?0:Math.sin(m.stride)*.48;
    const breathing=far?0:Math.sin(phase*2.2+phaseId)*.009;
    this.root.position.set(n.x,n.y+breathing+(moving?Math.abs(swing)*.042:0),n.z);
    this.root.rotation.y=n.yaw;
    this.root.scale.setScalar(cow?1.10:1);
    this.joints.get('body')!.position.set(0,0,0);
    const head=this.joints.get('head')!;
    const eating=m.mode==='eat'&&!human&&!far,lower=eating?.5+.5*Math.sin(phase*5):0;
    head.position.set(0,human?1.48:cow?.88:.93,human?0:-.271);
    head.rotation.set(eating?-.56-.25*lower:breathing,(!moving&&!far&&m.mode!=='talk'?Math.sin(phase*.9+phaseId)*.15:0),0);
    if(eating)head.position.y-=.23+.06*lower;
    for(let i=0;i<feet.length;i++){
      const j=this.joints.get(feet[i])!;
      j.position.set((i%2?1:-1)*(human?.115:.212),human?.667:.383,human?0:(i<2?-.213:.247));
      j.rotation.x=swing*([0,3].includes(i)?1:-1);
    }
    const tail=this.joints.get('tail')!;
    tail.position.set(0,.88,.37);tail.rotation.z=far?0:Math.sin(phase*2.1+phaseId)*.20;
    this.root.updateMatrixWorld(true);
  }
  update(sim:NpcWorld,viewer:Point,day:number,mobile:boolean){
    const clock=sim.clock;
    const sameTime=clock===this.previousClock;
    this.viewerVector.set(viewer.x,viewer.y,viewer.z);
    const lookDistance=this.previousCenter.distanceToSquared(this.viewerVector);
    if(this.previousRevision===sim.visualRevision&&this.previousMobile===mobile&&lookDistance<.01&&Math.abs(day-this.previousDay)<.003&&
        (sameTime||mobile&&clock>=this.previousClock&&clock-this.previousClock<1/30))return;
    this.previousClock=clock;this.previousCenter.set(viewer.x,viewer.y,viewer.z);
    this.previousDay=day;this.previousMobile=mobile;this.previousRevision=sim.visualRevision;
    const sun=Math.sin((day-.25)*Math.PI*2);
    const daylight=.48+.5*Math.max(0,Math.min(1,sun*2+.25));
    let i=0,shadows=0;
    for(const n of sim.entities){
      const distance=Math.hypot(n.x-viewer.x,n.y-viewer.y,n.z-viewer.z);
      if(distance>(mobile?28:44))continue;
      if(!mobile&&distance<22&&sim.castsContactShadow(n)){
        this.local.position.set(n.x,n.y+.006,n.z);this.local.rotation.y=n.yaw;
        this.local.scale.set(n.kind==='villager'?.58:.88,1,n.kind==='villager'?.52:.95);this.local.updateMatrix();
        this.shade.setMatrixAt(shadows++,this.local.matrix);this.local.rotation.y=0;
      }
      this.pose(n,sim,distance>21);
      for(const p of pieces[n.kind]){
        this.local.position.set(p.x,p.y,p.z);this.local.scale.set(p.w,p.h,p.d);this.local.updateMatrix();
        this.out.multiplyMatrices(this.joints.get(p.joint)!.matrixWorld,this.local.matrix);
        this.mesh.setMatrixAt(i,this.out);
        if(p.color==='coat')this.color.setHex(n.color);else this.color.copy(this.palette.get(p.color)!);
        this.mesh.setColorAt(i++,this.color.multiplyScalar(daylight));
      }
    }
    this.shade.count=shadows;this.shade.visible=shadows>0;
    if(shadows)this.shade.instanceMatrix.needsUpdate=true;
    this.mesh.count=i;this.mesh.visible=i>0;
    this.mesh.instanceMatrix.needsUpdate=true;if(this.mesh.instanceColor)this.mesh.instanceColor.needsUpdate=true;
  }
  private viewerVector=new T.Vector3();

  dispose(){
    this.scene.remove(this.mesh,this.shade);this.mesh.dispose();this.geometry.dispose();this.material.dispose();this.texture.dispose();
    this.shade.dispose();this.shade.geometry.dispose();this.shade.material.dispose();
  }
}
