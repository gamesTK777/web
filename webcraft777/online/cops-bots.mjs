import { navBounds, navFloor, navSpawns, navMaps } from './cops-navigation.mjs'
import { botPace } from './chase-movement.mjs'

const {minX,maxX,minZ,maxZ}=navBounds
const width=maxX-minX, area=width*(maxZ-minZ)
const cardinal=[-width,-1,1,width]
const diagonals=[[0,1],[0,2],[1,3],[2,3]]
const searchLimit=900, routeLimit=28
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n))
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z)
const tile=(x,z)=>x-minX+width*(z-minZ)
const level=node=>Math.floor(node/area)
const point=node=>({x:minX+node%area%width+.5,y:navFloor+level(node),z:minZ+Math.floor(node%area/width)+.5})
const valid=(map,node)=>Boolean(map.columns[node%area]&1<<level(node))
const spawnOffsets=[[0,0],[-5,1],[5,3],[-7,-3],[6,-3],[-3,5],[8,1],[-9,4]]
const covers={
  park:[[85,100],[103,118],[149,85],[168,114],[180,140],[159,154],[115,174],[92,158],[74,137],[109,77]],
  crossing:[[79,97],[104,81],[160,91],[180,121],[178,153],[155,168],[110,170],[87,157],[77,126],[144,104]],
}

function decode({columns,steps}){
  const data=new Uint16Array(area), compact=atob(columns)
  let start=0
  for(let offset=0;offset<compact.length;offset+=3){
    const end=start+compact.charCodeAt(offset)
    data.fill(compact.charCodeAt(offset+1)|compact.charCodeAt(offset+2)<<8,start,end)
    start=end
  }
  return {columns:data,steps:new Map(steps.map(([node,direction,target])=>[node*4+direction,target]))}
}

const maps=Object.fromEntries(Object.entries(navMaps).map(([stage,data])=>[stage,decode(data)]))

function nearest(map,pose){
  const x=clamp(Math.floor(pose.x),minX+1,maxX-2), z=clamp(Math.floor(pose.z),minZ+1,maxZ-2)
  const y=clamp(Math.round(pose.y)-navFloor,0,15), cell=tile(x,z)
  if(map.columns[cell]&1<<y)return cell+y*area
  let best=-1, score=Infinity
  for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){
    if(x+dx<=minX||x+dx>=maxX-1||z+dz<=minZ||z+dz>=maxZ-1)continue
    const next=cell+dz*width+dx, mask=map.columns[next]
    for(let h=0;h<=15;h++){
      if(!(mask&1<<h))continue
      const cost=dx*dx+dz*dz+Math.abs(h-y)*2.5
      if(cost<score){score=cost;best=next+h*area}
    }
  }
  return best
}

function heuristic(node,goal){
  const dx=Math.abs(node%area%width-goal%area%width)
  const dz=Math.abs(Math.floor(node%area/width)-Math.floor(goal%area/width))
  return Math.max(dx,dz)+Math.min(dx,dz)*.414+Math.abs(level(node)-level(goal))*.3
}

function push(queue,item){
  let i=queue.length
  queue.push(item)
  while(i>0){
    const parent=(i-1)>>1
    if(queue[parent].rank<=item.rank)break
    queue[i]=queue[parent]; i=parent
  }
  queue[i]=item
}

function pop(queue){
  const first=queue[0], last=queue.pop()
  if(queue.length===0)return first
  let i=0
  while(i*2+1<queue.length){
    let next=i*2+1
    if(queue[next+1]?.rank<queue[next].rank)next++
    if(queue[next].rank>=last.rank)break
    queue[i]=queue[next]; i=next
  }
  queue[i]=last
  return first
}

function plan(map,start,goal,avoid){
  const first={node:start,rank:0,cost:0,parent:null}
  const queue=[first], visits=new Map([[start,first]])
  let closest=first, closestDistance=heuristic(start,goal)
  const visit=(parent,node,length)=>{
    const threat=avoid?distance(avoid,point(node)):Infinity
    const cost=parent.cost+length+(threat<7?(7-threat)*.45:0)
    if(cost>=(visits.get(node)?.cost??Infinity))return
    const record={node,cost,parent,rank:cost+heuristic(node,goal)*1.2}
    visits.set(node,record)
    push(queue,record)
  }
  for(let tried=0;tried<searchLimit&&queue.length;tried++){
    const current=pop(queue), {node}=current
    if(visits.get(node)!==current)continue
    const remaining=heuristic(node,goal)
    if(remaining<closestDistance){closest=current;closestDistance=remaining}
    if(node===goal)break
    const bit=1<<level(node), cell=node%area
    let clear=0
    for(let i=0;i<4;i++){
      const next=cardinal[i]
      if(map.columns[cell+next]&bit){clear|=1<<i;visit(current,node+next,1)}
      else{
        const stair=map.steps.get(node*4+i)
        if(stair!==undefined)visit(current,stair,1.5)
      }
    }
    for(const [i,j] of diagonals){
      const next=cardinal[i]+cardinal[j]
      if(clear&1<<i&&clear&1<<j&&map.columns[cell+next]&bit)visit(current,node+next,Math.SQRT2)
    }
  }
  const route=[]
  for(let cursor=closest;cursor.parent;cursor=cursor.parent)route.push(cursor.node)
  return route.reverse().slice(0,routeLimit)
}

function hidingPlace(stage,id,pose,police,now){
  const hides=covers[stage]
  const diversifier=Array.from(id).reduce((code,char)=>(code*31+char.charCodeAt(0))>>>0,0)
  let best=-Infinity, goal
  for(const [i,[x,z]] of hides.entries()){
    const place={x:x+.5,y:navFloor,z:z+.5}
    const nearestPolice=Math.min(70,...police.map(peer=>distance(place,peer)))
    const rotation=(diversifier+i+Math.floor(now/16_000)*3)%hides.length
    const score=nearestPolice*1.18-distance(pose,place)*.52+rotation*1.7
    if(score>best){best=score;goal=place}
  }
  return goal
}

function toward(current,target,travel){
  const dx=target.x-current.x, dz=target.z-current.z, length=distance(current,target)
  if(length<.001)return {...current,...target,moving:false}
  const portion=Math.min(1,travel/length), remaining=length*(1-portion)
  // Rise before entering the next voxel and descend after the body clears the ledge.
  const y=remaining<=(target.y>current.y?.84:.16)?target.y:current.y
  return {...current,x:current.x+dx*portion,y,z:current.z+dz*portion,
    yaw:Math.atan2(-dx,-dz),moving:true,crouched:false,flying:false}
}

export function copsBotSpawn(stage,index){
  const spawn=navSpawns.robbers, [dx,dz]=spawnOffsets[(index+1)%spawnOffsets.length]??spawnOffsets[0]
  const requested={...spawn,x:spawn.x+dx,z:spawn.z+dz}
  const map=maps[stage], node=map?nearest(map,requested):-1
  return {...spawn,...(node===-1?{}:point(node)),moving:false,crouched:false,flying:false}
}

export function copsBotPose({stage,id,pose,elapsed,now,policeIds,jailedIds,players,phase='playing'}){
  const map=maps[stage], isPolice=policeIds.includes(id)
  const stepTime=clamp(elapsed,.04,.32)
  const stationary={...pose,moving:false,route:undefined,waypoint:undefined}
  if(!map||jailedIds.includes(id)||phase==='waiting'||phase==='finished'||phase==='hiding'&&isPolice){
    return botPace(pose.stamina,'cops',false,false,stepTime).finish(stationary)
  }
  const cops=[], runners=[]
  for(const peer of players){
    if(peer.id===id||!peer.pose||jailedIds.includes(peer.id))continue
    if(policeIds.includes(peer.id))cops.push(peer.pose)
    else runners.push(peer.pose)
  }
  const closest=peers=>peers.reduce((best,peer)=>!best||distance(pose,peer)<distance(pose,best)?peer:best,undefined)
  const officer=closest(cops), threat=officer?distance(pose,officer):Infinity
  const pad=navSpawns.rescue
  const canRescue=!isPolice&&phase==='playing'&&jailedIds.length>0&&threat>5.5
  // Entering from outside is what triggers a rescue. Step off if a teammate
  // was caught while this bot happened to be standing on the pad.
  const stepOff=canRescue&&distance(pose,pad)<=pad.radius
  const objective=isPolice?'pursue':canRescue?(stepOff?'leave-pad':'rescue'):'hide'
  const target=isPolice?closest(runners):canRescue?(stepOff?navSpawns.release:pad):hidingPlace(stage,id,pose,cops,now)
  const settled=nearest(map,pose), goal=target?nearest(map,target):-1
  const pace=botPace(pose.stamina,'cops',false,isPolice||canRescue||phase==='hiding'||threat<15,stepTime)
  if(settled<0||goal<0)return pace.finish(stationary)
  const {travel}=pace
  let route=pose.route??[], waypoint=pose.waypoint, replanAt=pose.replanAt??0
  let lastGoal=pose.goal, lastObjective=pose.objective
  // Complete the current center-to-center segment before switching direction.
  // This keeps interpolation on a clear segment, including at the inside of walls.
  if(!Number.isInteger(waypoint)||!valid(map,waypoint)){
    waypoint=undefined
    if(route.length===0||objective!==lastObjective||now>=replanAt&&(!Number.isInteger(lastGoal)||heuristic(lastGoal,goal)>3)){
      route=settled===goal?[]:plan(map,settled,goal,!isPolice&&threat<13?officer:undefined)
      lastGoal=goal
      lastObjective=objective
      replanAt=now+950
    }
    waypoint=route[0]
  }
  const state={...pose,route,goal:lastGoal,replanAt,objective:lastObjective,waypoint}
  if(waypoint===undefined){
    if(settled!==goal)return pace.finish({...state,moving:false})
    const center=point(goal)
    return pace.finish(toward(state,{x:clamp(target.x,center.x-.17,center.x+.17),y:center.y,
      z:clamp(target.z,center.z-.17,center.z+.17)},travel))
  }
  const next=point(waypoint)
  if(distance(pose,next)>travel)return pace.finish(toward(state,next,travel))
  // Use the remaining distance only on collinear segments. Even if the Worker
  // advances multiple cells in one tick, clients can render a straight blend.
  let remaining=travel-distance(pose,next), stop=next, used=1
  const dx=next.x-pose.x, dz=next.z-pose.z
  while(next.y===pose.y&&remaining>.01&&used<route.length){
    const after=point(route[used]), sx=after.x-stop.x, sz=after.z-stop.z
    if(after.y!==stop.y||Math.abs(dx*sz-dz*sx)>.001||dx*sx+dz*sz<=0)break
    const length=distance(stop,after)
    if(remaining<length)return pace.finish(toward({...state,...stop,route:route.slice(used),waypoint:route[used]},after,remaining))
    remaining-=length
    stop=after
    used++
  }
  return pace.finish(toward({...state,route:route.slice(used),waypoint:undefined},stop,travel))
}
