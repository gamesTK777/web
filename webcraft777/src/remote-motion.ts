import type { NetPose } from './online-client'
import { playerPoseClear, type Pose } from './physics'

type Position = Pick<Pose, 'x' | 'y' | 'z' | 'crouched'>
type Terrain = Parameters<typeof playerPoseClear>[0]
type RemoteSample = {pose:NetPose; poseAt?:number; sampleAgeMs?:number}

export interface RemoteMotion {
  pose:NetPose; poseAt?:number; receivedAt:number; ageAtReceipt:number
  vx:number; vz:number; snap:boolean
}

const maxProjectionMs=105
const maxProjectionDistance=.85
const staleMs=520

export function sampleRemoteMotion(previous:RemoteMotion|undefined,sample:RemoteSample,now:number):RemoteMotion {
  const {pose,poseAt,sampleAgeMs}=sample
  const ageAtReceipt=Math.max(0,sampleAgeMs??0)
  const state={pose,poseAt,receivedAt:now,ageAtReceipt,vx:0,vz:0,snap:false}
  if(!previous)return state

  const old=previous.pose
  const time=poseAt!==undefined&&previous.poseAt!==undefined ? poseAt-previous.poseAt : now-previous.receivedAt
  const dx=pose.x-old.x,dy=pose.y-old.y,dz=pose.z-old.z, distance=Math.hypot(dx,dz)
  if(time<0)return previous
  if((time===0||poseAt===undefined)&&dx===0&&dy===0&&dz===0&&pose.yaw===old.yaw&&
    pose.moving===old.moving&&pose.crouched===old.crouched&&pose.flying===old.flying)return previous

  // An unexpectedly long jump follows the server pose immediately. Inferring
  // a velocity across a jail transfer would sweep the avatar through walls.
  state.snap=time>650||distance>Math.max(2.3,time*.012+.5)||Math.abs(dy)>6
  if(!state.snap&&time>=40&&time<=550&&pose.moving&&Math.abs(dy)<.65){
    state.vx=dx*1000/time
    state.vz=dz*1000/time
  }
  return state
}

export function remoteSampleAge(motion:RemoteMotion,now:number):number {
  return motion.ageAtReceipt+Math.max(0,now-motion.receivedAt)
}

export function clearRemoteFraction(world:Terrain,from:Position,to:Position):number {
  const dx=to.x-from.x,dy=to.y-from.y,dz=to.z-from.z
  const steps=Math.ceil(Math.hypot(dx,dy,dz)/.15)
  for(let step=1;step<=steps;step++){
    const t=step/steps
    if(!playerPoseClear(world,{x:from.x+dx*t,y:from.y+dy*t,z:from.z+dz*t,crouched:to.crouched}))
      return (step-1)/steps
  }
  return 1
}

export function predictRemotePosition(world:Terrain,motion:RemoteMotion,now:number):Position {
  const {pose,vx,vz}=motion
  if(!vx&&!vz)return pose
  const age=remoteSampleAge(motion,now)
  // Briefly hold the capped lead between samples; a stalled connection
  // eventually eases back to the last confirmed location.
  const fade=Math.max(0,Math.min(1,(staleMs-age)/120))
  const seconds=Math.min(age,maxProjectionMs)/1000
  const span=Math.min(seconds,maxProjectionDistance/Math.hypot(vx,vz))*fade
  const next={x:pose.x+vx*span,y:pose.y,z:pose.z+vz*span,crouched:pose.crouched}
  const travel=clearRemoteFraction(world,pose,next)
  return travel===1?next:{...next,x:pose.x+vx*span*travel,z:pose.z+vz*span*travel}
}
