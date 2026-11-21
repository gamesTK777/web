import * as T from 'three'
import { firePosition, type FireRecord } from './frontier-fire'
import type { Point } from './npc-path'
import { isSolid, type World } from './world'

export type FrontierKind='resident'|'sheriff'|'horse'|'bandit'|'gang'
export type Figure = Point & {kind:FrontierKind;yaw:number;color:number;stride:number;moving:boolean}
export type Trail = {from:Point;to:Point;until:number;color:number}
type Part = readonly [number,number,number,number,number,number,color:number,leg?:number]
const coat=-1, dark=0x333037, skin=0xd1a27f, shoe=0x4a3633, brass=0xf4cc65
const western:Part[]=[
  [0,1.06,0,.42,.49,.26,coat],[0,.79,0,.42,.12,.25,dark],
  [-.255,1.09,0,.10,.40,.16,coat],[.255,1.09,0,.10,.40,.16,coat],
  [-.258,.885,-.015,.10,.108,.14,skin],[.258,.885,-.015,.10,.108,.14,skin],
  [0,1.43,0,.30,.31,.29,skin],[0,1.49,.13,.29,.19,.074,0x584037],
  [-.068,1.463,-.148,.039,.043,.021,dark],[.068,1.463,-.148,.039,.043,.021,dark],
  [0,1.61,0,.51,.045,.44,0x583c30],[0,1.69,.01,.28,.15,.26,0x704832],
  [0,1.638,-.01,.29,.034,.275,0xb19052],[0,1.294,-.138,.27,.08,.041,0xddc596],
  [-.113,.45,0,.168,.62,.18,0x5b4a44,-1],[.113,.45,0,.168,.62,.18,0x5b4a44,1],
  [-.113,.094,-.04,.182,.16,.24,shoe,-1],[.113,.094,-.04,.182,.16,.24,shoe,1],
]
const horse:Part[]=[
  [0,.94,.02,.62,.52,1.26,coat],[0,.747,.09,.53,.21,.88,0x87593a],
  [0,1.21,-.42,.38,.57,.48,coat],[0,1.51,-.61,.33,.29,.46,coat],
  [0,1.444,-.854,.31,.175,.13,0xbe8e64],[0,1.367,-.839,.26,.092,.18,0x936044],
  [-.138,1.68,-.495,.089,.18,.093,coat],[.138,1.68,-.495,.089,.18,.093,coat],
  [-.167,1.541,-.73,.033,.068,.061,dark],[.167,1.541,-.73,.033,.068,.061,dark],
  [0,1.55,-.451,.09,.25,.23,dark],[0,1.33,-.252,.09,.27,.22,dark],
  [0,.755,.669,.12,.42,.11,dark],
  [-.228,.41,-.425,.12,.67,.147,coat,-1],[.228,.41,-.425,.12,.67,.147,coat,1],
  [-.228,.41,.42,.12,.67,.147,coat,1],[.228,.41,.42,.12,.67,.147,coat,-1],
  [-.228,.075,-.425,.145,.15,.157,shoe,-1],[.228,.075,-.425,.145,.15,.157,shoe,1],
  [-.228,.075,.42,.145,.15,.157,shoe,1],[.228,.075,.42,.145,.15,.157,shoe,-1],
]
const badges:Record<FrontierKind,Part[]>={
  resident:[],horse:[],
  sheriff:[[.126,1.18,-.137,.083,.029,.024,brass],[.126,1.18,-.139,.029,.087,.03,brass],
    [0,1.618,0,.518,.055,.449,0x31426a],[0,1.697,.01,.294,.155,.268,0x40577f]],
  bandit:[[0,1.322,-.156,.309,.129,.06,0xb34c47],[0,1.664,.015,.26,.18,.247,dark]],
  gang:[[0,1.36,-.161,.31,.104,.052,0x9052ae],[0,1.625,0,.514,.048,.45,0x48314c],
    [0,1.697,.01,.294,.155,.268,0x623f69]],
}
const parts:Record<FrontierKind,Part[]>={horse,resident:western,sheriff:[...western,...badges.sheriff],
  bandit:[...western,...badges.bandit],gang:[...western,...badges.gang]}
const flameFaces=[[0,1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,-1,0]] as const
const fireColors=[0xffb65a,0xffe89a,0xf46c36]

export class FrontierView {
  private readonly geometry=new T.BoxGeometry()
  private readonly material=new T.MeshBasicMaterial({vertexColors:true})
  private readonly mesh=new T.InstancedMesh(this.geometry,this.material,1152)
  private readonly root=new T.Object3D()
  private readonly local=new T.Object3D()
  private readonly matrix=new T.Matrix4()
  private readonly color=new T.Color()
  private readonly direction=new T.Vector3()
  private readonly up=new T.Vector3(0,1,0)
  private cursor=0

  constructor(private readonly scene:T.Scene,private readonly world:Pick<World,'get'>){
    const normal=this.geometry.getAttribute('normal'),colors:number[]=[]
    for(let i=0;i<normal.count;i++){
      const light=.76+normal.getY(i)*.20+normal.getX(i)*.067+normal.getZ(i)*.035
      colors.push(light,light,light)
    }
    this.geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3))
    this.mesh.instanceMatrix.setUsage(T.DynamicDrawUsage)
    this.mesh.frustumCulled=false
    this.mesh.count=0
    this.mesh.name='西部の町の住民・馬・火'
    this.scene.add(this.mesh)
  }

  private put(object:T.Object3D,tint:number,brightness=1){
    this.mesh.setMatrixAt(this.cursor,object.matrix)
    this.mesh.setColorAt(this.cursor++,this.color.setHex(tint).multiplyScalar(brightness))
  }

  private figure(figure:Figure,brightness:number){
    const hopping=figure.moving?Math.sin(figure.stride):0
    this.root.position.set(figure.x,figure.y+Math.abs(hopping)*.035,figure.z)
    this.root.rotation.set(0,figure.yaw,0)
    this.root.updateMatrix()
    for(const [x,y,z,w,h,d,tint,leg] of parts[figure.kind]){
      this.local.position.set(x,y,z+(leg??0)*hopping*.14)
      this.local.rotation.set((leg??0)*hopping*.35,0,0)
      this.local.scale.set(w,h,d)
      this.local.updateMatrix()
      this.matrix.multiplyMatrices(this.root.matrix,this.local.matrix)
      this.mesh.setMatrixAt(this.cursor,this.matrix)
      this.mesh.setColorAt(this.cursor++,this.color.setHex(tint===coat?figure.color:tint).multiplyScalar(brightness))
    }
  }

  private fireOrigin(x:number,y:number,z:number,viewer:Point){
    let origin={x:x+.5,y:y+1,z:z+.5},nearest=Infinity
    for(const [dx,dy,dz] of flameFaces){
      if(isSolid(this.world.get(x+dx,y+dy,z+dz)))continue
      const side={x:x+.5+dx*.59,y:y+.55+dy*.49,z:z+.5+dz*.59}
      const score=Math.hypot(side.x-viewer.x,side.y-viewer.y,side.z-viewer.z)-(dy===1?.18:0)
      if(score<nearest){nearest=score;origin=side}
    }
    return origin
  }

  update(figures:readonly Figure[],fires:Iterable<FireRecord>,trails:readonly Trail[],viewer:Point,clock:number,day:number){
    this.cursor=0
    const brightness=.65+.35*Math.max(0,Math.sin((day-.25)*Math.PI*2))
    for(const figure of figures)
      if(Math.hypot(figure.x-viewer.x,figure.y-viewer.y,figure.z-viewer.z)<60)this.figure(figure,brightness)
    for(const flame of fires){
      const {x,y,z}=firePosition(flame.key)
      if(Math.hypot(x-viewer.x,y-viewer.y,z-viewer.z)>64)continue
      const origin=this.fireOrigin(x,y,z,viewer)
      const pulse=Math.sin(clock*13+flame.key)*.1
      this.local.rotation.set(0,clock*.8+flame.key,0)
      for(let n=0;n<3;n++){
        this.local.position.set(origin.x+(n-1)*.21,origin.y+(n%2)*.2+pulse,origin.z)
        this.local.scale.set(.35+n*.08,.6+pulse*2-n*.055,.29+n*.09)
        this.local.updateMatrix()
        this.put(this.local,fireColors[n])
      }
      const drift=(clock*1.5+flame.key)%1
      this.local.position.set(origin.x-.06+drift*.32,origin.y+.57+drift*.7,origin.z-.02)
      this.local.scale.setScalar(.21+drift*.22)
      this.local.updateMatrix();this.put(this.local,0x63544d)
    }
    for(const trail of trails){
      this.direction.set(trail.to.x-trail.from.x,trail.to.y-trail.from.y,trail.to.z-trail.from.z)
      const length=this.direction.length()
      if(length<.05)continue
      this.local.position.set((trail.from.x+trail.to.x)/2,(trail.from.y+trail.to.y)/2,(trail.from.z+trail.to.z)/2)
      this.local.quaternion.setFromUnitVectors(this.up,this.direction.multiplyScalar(1/length))
      this.local.scale.set(.032,length,.032)
      this.local.updateMatrix();this.put(this.local,trail.color)
    }
    this.mesh.count=this.cursor
    this.mesh.visible=this.cursor>0
    this.mesh.instanceMatrix.needsUpdate=true
    if(this.mesh.instanceColor)this.mesh.instanceColor.needsUpdate=true
  }

  dispose(){
    this.scene.remove(this.mesh);this.mesh.dispose();this.geometry.dispose();this.material.dispose()
  }
}
