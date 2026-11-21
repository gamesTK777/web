import { Vector3, type PerspectiveCamera } from 'three'
import type { Pose } from './physics'
type Terrain = {get(x:number,y:number,z:number):number}

export function tagNameVisible(world:Terrain,camera:PerspectiveCamera,body:Pose,sample:Vector3):boolean {
  const from=camera.position
  if(Math.hypot(body.x-from.x,body.y-from.y,body.z-from.z)>28)return false
  // Test the player's body, so a label cannot peek over cover by itself.
  for(const h of body.crouched ? [.56,.88] : [.88,1.55]){
    const x=body.x,y=body.y+h,z=body.z
    sample.set(x,y,z).project(camera)
    if(Math.abs(sample.x)>.99||Math.abs(sample.y)>.99||sample.z<=-1||sample.z>=1)continue
    const steps=Math.max(1,Math.ceil(Math.hypot(x-from.x,y-from.y,z-from.z)/.19))
    let clear=true
    for(let i=1;i<steps;i++){
      const t=i/steps
      const id=world.get(Math.floor(from.x+(x-from.x)*t),Math.floor(from.y+(y-from.y)*t),Math.floor(from.z+(z-from.z)*t))
      if(id!==0&&id!==10&&id!==13){clear=false;break}
    }
    if(clear)return true
  }
  return false
}
