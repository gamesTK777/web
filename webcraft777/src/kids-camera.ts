import { PerspectiveCamera, Vector3 } from 'three'
import { eyeHeight, REACH, WORLD_WIDTH, type Hit, type Player } from './physics'

type Terrain = { get(x: number, y: number, z: number): number }
const clearance = .17

function blocked(world: Terrain, x: number, y: number, z: number, radius: number) {
  if (x-radius<0 || z-radius<0 || x+radius>=WORLD_WIDTH || z+radius>=WORLD_WIDTH || y-radius<0) return true
  for (let by=Math.floor(y-radius); by<=Math.floor(y+radius); by++)
    for (let bz=Math.floor(z-radius); bz<=Math.floor(z+radius); bz++)
      for (let bx=Math.floor(x-radius); bx<=Math.floor(x+radius); bx++) {
        const id=world.get(bx,by,bz)
        if (id!==0 && id!==13) return true
      }
  return false
}

// Trace the boom in short steps with a padded camera body, so tightening a room
// or standing under an overhang cannot push the camera through a voxel face.
function clearFraction(world: Terrain, from: Vector3, to: Vector3, radius: number) {
  const steps=Math.max(1,Math.ceil(from.distanceTo(to)/.14))
  for (let i=1; i<=steps; i++) {
    const t=i/steps
    if (blocked(world,from.x+(to.x-from.x)*t,from.y+(to.y-from.y)*t,from.z+(to.z-from.z)*t,radius))
      return (i-1)/steps
  }
  return 1
}

export function firstPerson(camera: PerspectiveCamera, p: Pick<Player,'x'|'y'|'z'|'yaw'|'pitch'> & Partial<Player>) {
  setFov(camera,67+(p.fovOffset??0))
  camera.position.set(p.x,p.y+eyeHeight(p),p.z)
  camera.rotation.set(p.pitch,p.yaw,0,'YXZ')
}

function setFov(camera: PerspectiveCamera, fov: number) {
  if (Math.abs(fov-camera.fov)<=.01) return
  camera.fov=fov
  camera.updateProjectionMatrix()
}

export class KidsCamera {
  private readonly eye=new Vector3()
  private readonly raised=new Vector3()
  private readonly aim=new Vector3()
  private readonly screen=new Vector3()
  private boom=1
  private next=false
  readonly reticle={ x:50, y:50 }

  reset() {
    this.boom=1
    this.next=false
    this.reticle.x=this.reticle.y=50
  }

  /** Returns whether there is room to show the avatar. The player remains the source of all edits. */
  update(camera: PerspectiveCamera, world: Terrain, p: Player, hit: Hit|null, dt: number, indoors=false) {
    const sin=Math.sin(p.yaw), cos=Math.cos(p.yaw), flat=Math.cos(p.pitch)
    this.eye.set(p.x,p.y+eyeHeight(p),p.z)
    const reach=hit ? Math.max(0,hit.distance-.035) : REACH
    this.aim.set(p.x-sin*flat*reach,this.eye.y+Math.sin(p.pitch)*reach,p.z-cos*flat*reach)
    const distance=indoors?4.2:7.4, rise=indoors?2.6:5.6
    this.raised.set(p.x+sin*distance,this.eye.y+rise,p.z+cos*distance)
    let limit=clearFraction(world,this.eye,this.raised,clearance)
    if(hit)limit=this.visibleFraction(camera,world,limit)
    this.boom=this.next ? Math.min(limit,this.boom+(limit-this.boom)*(1-Math.exp(-11*dt))) : limit
    this.next=true
    if(hit && this.boom!==limit)this.boom=this.visibleFraction(camera,world,this.boom)
    camera.position.lerpVectors(this.eye,this.raised,this.boom)
    if (this.boom<.23) {
      firstPerson(camera,p)
      this.reticle.x=this.reticle.y=50
      return false
    }

    const fov=53
    setFov(camera,fov)
    const ahead=Math.min(1.65,this.boom*2.5)
    const preferred=Math.atan2(p.y+1.03-camera.position.y,distance*this.boom+ahead)
    const aimAngle=Math.atan2(this.aim.y-camera.position.y,distance*this.boom+flat*reach)
    const edge=fov*Math.PI/180*.35
    camera.rotation.set(Math.min(aimAngle+edge,Math.max(aimAngle-edge,preferred)),p.yaw,0,'YXZ')
    camera.updateMatrixWorld()
    this.screen.copy(this.aim).project(camera)
    this.reticle.x=(1+this.screen.x)*50
    this.reticle.y=(1-this.screen.y)*50
    return true
  }

  private visibleFraction(camera: PerspectiveCamera, world: Terrain, fraction: number) {
    // Pull closer if a roof hides the aimed face from above, even when the
    // boom itself fits. Computing the limit before easing avoids repeated jumps.
    while(fraction>=.23) {
      camera.position.lerpVectors(this.eye,this.raised,fraction)
      if(clearFraction(world,camera.position,this.aim,0)===1)break
      fraction*=.61
    }
    return fraction
  }
}
