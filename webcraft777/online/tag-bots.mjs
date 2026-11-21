import { schoolNavigation } from './school-navigation.mjs'

export const cpuTokenPrefix='cpu:'
export const tagBotStages=new Set(['flat','school'])
export const tagBotInterval=200
const flatCenter={x:128.5,y:33,z:139.5}
const starts=[[5,4],[-5,3],[4,-6],[-5,-5]]
const pose=(x,y,z)=>({x,y,z,yaw:0,moving:false,crouched:false,flying:false})
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n))

export function tagBotSeats(stage,count){
  const center=stage==='school'?schoolNavigation.spawn:flatCenter
  return starts.slice(0,count).map(([dx,dz],index)=>{
    const spawn=stage==='school'?schoolStarts[index]:pose(center.x+dx,center.y,center.z+dz)
    return {id:'cpu-'+(index+1),nickname:'CPU '+(index+1),hash:cpuTokenPrefix+(index+1),pose:spawn}
  })
}

// The mask is baked from the same geometry the browser loads. A graph edge can
// cross one block of elevation only on an actual stairway.
const {minX,minZ,width,depth,lower,upper,stairs,open}=schoolNavigation
const area=width*depth
const masks=Uint8Array.from(atob(open),char=>char.charCodeAt(0))
const stairColumns=new Set(stairs)
const neighbors=Array.from({length:area*(upper-lower+1)},()=>null)

function schoolKey(x,y,z){
  const dx=x-minX,dz=z-minZ,h=y-lower
  if(dx<0||dx>=width||dz<0||dz>=depth||h<0||h>upper-lower)return -1
  const column=dx+dz*width
  return (masks[column]&(1<<h))===0?-1:column+area*h
}

function schoolCell(key){
  const column=key%area
  return {x:minX+column%width+.5,y:lower+Math.floor(key/area),z:minZ+Math.floor(column/width)+.5}
}

for(let key=0;key<neighbors.length;key++){
  const cell=schoolCell(key),x=Math.floor(cell.x),z=Math.floor(cell.z),y=cell.y
  if(schoolKey(x,y,z)===-1)continue
  const edges=[]
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
    const nextColumn=x+dx-minX+(z+dz-minZ)*width
    const elevations=stairColumns.has(key%area)||stairColumns.has(nextColumn)?[y,y+1,y-1]:[y]
    for(const elevation of elevations){
      const next=schoolKey(x+dx,elevation,z+dz)
      if(next>=0)edges.push(next)
    }
  }
  neighbors[key]=edges
}

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z,(a.y-b.y)*1.7)
const schoolSafe=(position)=>{
  const x=Math.floor(position.x),z=Math.floor(position.z)
  let nearest=-1,best=Infinity
  for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)for(let y=lower;y<=upper;y++){
    const key=schoolKey(x+dx,y,z+dz)
    if(key<0)continue
    const d=distance(position,schoolCell(key))
    if(d>=best)continue
    best=d
    nearest=key
  }
  return nearest
}
const schoolPoint=(x,y,z)=>schoolCell(schoolSafe({x:x+.5,y,z:z+.5}))
const schoolStarts=[[126,33,145],[130,33,153],[129,33,142],[126,33,153]]
  .map(([x,y,z])=>schoolPoint(x,y,z)).map(({x,y,z})=>pose(x,y,z))
const schoolHidingPlaces=[
  [105,33,115],[118,33,119],[154,33,124],[115,33,151],[138,33,149],[146,33,145],
  [106,40,118],[117,40,128],[136,40,119],[145,40,134],[109,40,154],[153,40,154],
].map(([x,y,z])=>schoolPoint(x,y,z))

const queue=new Int32Array(neighbors.length)
const firstHop=new Int32Array(neighbors.length)
function schoolStep(start,goal){
  if(start<0||goal<0||start===goal)return -1
  firstHop.fill(-1)
  queue[0]=start
  firstHop[start]=start
  let count=1
  for(let i=0;i<count;i++){
    const current=queue[i]
    for(const next of neighbors[current]??[]){
      if(firstHop[next]!==-1)continue
      firstHop[next]=current===start?next:firstHop[current]
      if(next===goal)return firstHop[next]
      queue[count++]=next
    }
  }
  return -1
}

const flatHidingPlaces=[
  [-19,-24],[22,-25],[30,-5],[27,23],[3,37],[-22,25],[-33,-6],[-1,-40],
].map(([dx,dz])=>({...flatCenter,x:flatCenter.x+dx,z:flatCenter.z+dz}))

function hidingPlace(places,current,ghost,id,now){
  const index=Number(id.slice(-1))
  const turn=Math.floor(now/15000)
  const chased=ghost&&distance(current,ghost)<12
  let best=-Infinity,goal=places[0]
  for(let i=0;i<places.length;i++){
    const target=places[i]
    const variety=((i+index*3+turn*5)%places.length)*2.3
    const routeLength=distance(current,target)
    const score=(ghost?Math.min(70,distance(target,ghost))*(chased?1.6:.7):0)+variety-routeLength*.35
    if(score>best){best=score;goal=target}
  }
  return goal
}

function toward(current,target,travel,waypoint){
  const dx=target.x-current.x,dz=target.z-current.z
  const length=Math.hypot(dx,dz)
  if(length<.015)return {...current,y:target.y,moving:false,waypoint:undefined}
  const portion=Math.min(1,travel/length)
  const remaining=length*(1-portion)
  const y=remaining<=(target.y>current.y?.81:.19)?target.y:current.y
  return {x:current.x+dx*portion,y,z:current.z+dz*portion,
    yaw:Math.atan2(-dx,-dz),moving:true,crouched:false,flying:false,waypoint:portion===1?undefined:waypoint}
}

function moveSchool(current,target,travel,isIt){
  const settled=schoolSafe(current),goal=schoolSafe(target)
  // Finish a center-to-center step before turning, so the body cannot cut a
  // corner through a classroom wall or a stair rail.
  let waypoint=current.waypoint
  if(!Number.isInteger(waypoint)||!neighbors[waypoint])waypoint=schoolStep(settled,goal)
  if(waypoint!==-1)return toward(current,schoolCell(waypoint),travel,waypoint)
  if(settled<0||settled!==goal||!isIt)return {...current,moving:false,waypoint:undefined}
  const center=schoolCell(settled)
  return toward(current,{x:clamp(target.x,center.x-.17,center.x+.17),y:center.y,
    z:clamp(target.z,center.z-.17,center.z+.17)},travel)
}

export function tagBotPose(stage,bot,participants,tag,now){
  const current=bot.current
  if(tag.phase==='waiting'||(tag.phase==='hiding'&&tag.it===bot.id))
    return {...current,moving:false,waypoint:undefined}
  const ghost=participants.find(peer=>peer.id===tag.it)?.current
  const isIt=tag.it===bot.id
  let target
  if(isIt){
    let nearest=Infinity
    for(const peer of participants){
      if(peer.id===bot.id)continue
      const d=distance(current,peer.current)+(peer.cpu?6:0)
      if(d<nearest){nearest=d;target=peer.current}
    }
  }else target=hidingPlace(stage==='school'?schoolHidingPlaces:flatHidingPlaces,current,ghost,bot.id,now)
  if(!target)return {...current,moving:false,waypoint:undefined}
  const travel=(isIt?7.1:4.1)*clamp((now-bot.pose_at)/1000,.04,.32)
  if(stage==='school')return moveSchool(current,target,travel,isIt)
  return toward(current,{x:clamp(target.x,.35,255.65),y:33,z:clamp(target.z,.35,255.65)},travel)
}
