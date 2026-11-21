import type { Scene } from 'three'
import { FRONTIER_BOUNDS, FRONTIER_SPAWNS } from './frontier-world'
import { FrontierFire, frontierFireSpread, validFireRecords, type FireRecord } from './frontier-fire'
import { FrontierView, type Figure, type FrontierKind, type Trail } from './frontier-view'
import { cell, clearBody, distanceXZ, findPath, grounded, type Footprint, type Point } from './npc-path'
import { eyeHeight, overlapsPlayer, raycast, type Pose } from './physics'
import { HEIGHT, SIZE, isSolid, scatter, voxelIndex, type World } from './world'

type RaiderKind='bandit'|'gang'
type RaiderSave=Point & {kind:RaiderKind;yaw:number;hp:number}
export type FrontierState={health:number;raidIn:number;raiders:RaiderSave[];fires:FireRecord[];fireBudget:number}
type Actor=Figure & {
  name:string;home:Point;hp:number;path:Point[];goal:Point|null;ready:number;work:number;vy:number;
}
type Structure=Point & {id:number}
type Action={ok:boolean;message:string}

const actorShape:Record<FrontierKind,Footprint>={
  resident:{radius:.33,height:1.8},sheriff:{radius:.33,height:1.8},
  horse:{radius:.475,height:1.85},bandit:{radius:.33,height:1.8},gang:{radius:.33,height:1.8},
}
const roles:Record<FrontierKind,string>={resident:'町の住民',sheriff:'保安官',horse:'馬',bandit:'盗賊',gang:'ギャング'}
const horseColors=[0xa26947,0xe0be93]
const townsfolk=['エイダ','ルイス','ノラ']
const residentColors=[0x547d71,0xac6a44,0xa58556]
const loadout:Record<RaiderKind,{color:number;health:number;pace:number}>={
  bandit:{color:0xa65045,health:42,pace:2.55},gang:{color:0x745479,health:56,pace:2.27},
}
const healthy=100
const firstRaid=16
const nextRaid=58
const pace=(actor:Actor)=>actor.kind==='horse'?1.22:actor.kind==='sheriff'?2.65:hostile(actor)?loadout[actor.kind].pace:1.32
const hostile=(actor:Actor):actor is Actor & {kind:RaiderKind}=>actor.kind==='bandit'||actor.kind==='gang'
const stepPoints=[[1,0],[-1,0],[0,1],[0,-1]] as const
const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)
const center=(p:Point)=>({x:p.x+.5,y:p.y+.5,z:p.z+.5})

function validPoint(p:Partial<Point>){
  return typeof p.x==='number'&&Number.isFinite(p.x)&&p.x>=1&&p.x<SIZE-1&&
    typeof p.y==='number'&&Number.isFinite(p.y)&&p.y>=1&&p.y<HEIGHT-2&&
    typeof p.z==='number'&&Number.isFinite(p.z)&&p.z>=1&&p.z<SIZE-1
}

export function validFrontierState(value:unknown):value is FrontierState {
  if(!value||typeof value!=='object')return false
  const state=value as Partial<FrontierState>
  return Number.isInteger(state.health)&&state.health!>=0&&state.health!<=healthy&&
    Number.isInteger(state.fireBudget)&&state.fireBudget!>=0&&state.fireBudget!<=frontierFireSpread&&
    typeof state.raidIn==='number'&&Number.isFinite(state.raidIn)&&state.raidIn>=0&&state.raidIn<=nextRaid&&
    Array.isArray(state.raiders)&&state.raiders.length<=4&&state.raiders.every(actor=>
      actor&&(actor.kind==='bandit'||actor.kind==='gang')&&validPoint(actor)&&Number.isFinite(actor.yaw)&&
      Math.abs(actor.yaw)<=Math.PI*2&&Number.isInteger(actor.hp)&&actor.hp>0&&actor.hp<=loadout[actor.kind].health)&&
    validFireRecords(state.fires)
}

function direction(pose:Pose):Point{
  const horizontal=Math.cos(pose.pitch)
  return {x:-Math.sin(pose.yaw)*horizontal,y:Math.sin(pose.pitch),z:-Math.cos(pose.yaw)*horizontal}
}
const eye=(pose:Pose):Point=>({x:pose.x,y:pose.y+eyeHeight(pose),z:pose.z})
const head=(actor:Actor):Point=>({x:actor.x,y:actor.y+1.36,z:actor.z})
const along=(point:Point,direction:Point,distance:number):Point=>({
  x:point.x+direction.x*distance,y:point.y+direction.y*distance,z:point.z+direction.z*distance,
})

function rayToBlock(world:World,pose:Pose,reach:number){
  const forward=direction(pose)
  // Reuse the normal five-block ray query in short overlapping segments.
  for(let traveled=0;traveled<reach;traveled+=4.9){
    const start={...pose,...along(pose,forward,traveled)}
    const hit=raycast(world,start,Math.min(5,reach-traveled))
    if(hit)return {...hit,distance:hit.distance+traveled}
  }
  return null
}

function rayToActor(origin:Point,forward:Point,actor:Actor,max:number){
  const {radius,height}=actorShape[actor.kind]
  let enter=0,exit=max
  for(const axis of ['x','y','z'] as const){
    const low=actor[axis]-(axis==='y'?0:radius),high=actor[axis]+(axis==='y'?height:radius)
    const v=forward[axis]
    if(Math.abs(v)<1e-9){
      if(origin[axis]<low||origin[axis]>high)return Infinity
    }else{
      const a=(low-origin[axis])/v,b=(high-origin[axis])/v
      enter=Math.max(enter,Math.min(a,b));exit=Math.min(exit,Math.max(a,b))
      if(exit<enter)return Infinity
    }
  }
  return enter
}

function clearLine(world:World,from:Point,to:Point,allowEnd=false){
  const samples=Math.max(1,Math.ceil(distance(from,to)*5))
  const x0=Math.floor(to.x),y0=Math.floor(to.y),z0=Math.floor(to.z)
  for(let i=1;i<=samples;i++){
    const t=i/samples
    const x=Math.floor(from.x+(to.x-from.x)*t),y=Math.floor(from.y+(to.y-from.y)*t),z=Math.floor(from.z+(to.z-from.z)*t)
    if(allowEnd&&x===x0&&y===y0&&z===z0)return true
    if(isSolid(world.get(x,y,z)))return false
  }
  return true
}

function openFoot(world:World,anchor:Point,shape:Footprint,range=2){
  for(let r=0;r<=range;r++)for(let z=-r;z<=r;z++)for(let x=-r;x<=r;x++){
    if(Math.max(Math.abs(x),Math.abs(z))!==r)continue
    const tile=cell({x:anchor.x+x,y:anchor.y,z:anchor.z+z})
    for(const lift of [0,1,-1,2,-2]){
      const p={...tile,y:tile.y+lift}
      if(clearBody(world,p,shape,true)&&grounded(world,p,shape))return p
    }
  }
  return null
}

export class FrontierLife{
  health=healthy
  readonly fire:FrontierFire
  private readonly view:FrontierView
  private readonly town=new Map<number,Structure>()
  private readonly damage=new Set<number>()
  private readonly raidTargets:Structure[]=[]
  private readonly actors:Actor[]=[]
  private readonly trails:Trail[]=[]
  private readonly events:string[]=[]
  private readonly unsubscribe:()=>void
  private clock=0
  private raidAt=firstRaid
  private warned=false
  private round=0
  private nextPlan=0
  private cursor=0
  private damageReady=0
  private actionReady=0
  private townFire=false

  constructor(private readonly world:World,scene:Scene){
    this.fire=new FrontierFire(world)
    this.view=new FrontierView(scene,world)
    for(const block of world.frontierStructures){
      const key=voxelIndex(block.x,block.y,block.z)
      this.town.set(key,block)
      if(world.get(block.x,block.y,block.z)===0)this.damage.add(key)
      if((block.id===5||block.id===7)&&block.y>=33&&block.y<=34&&
        stepPoints.some(([dx,dz])=>world.get(block.x+dx,block.y,block.z+dz)===0))this.raidTargets.push(block)
    }
    this.add('sheriff','保安官クレイ',0x486f9a,FRONTIER_SPAWNS.sheriff)
    for(const [i,spot] of FRONTIER_SPAWNS.residents.entries())
      this.add('resident',townsfolk[i]??'町の住民',residentColors[i]??residentColors[0],spot)
    for(const [i,spot] of FRONTIER_SPAWNS.horses.entries())
      this.add('horse',i===0?'栗毛の馬':'白たてがみの馬',horseColors[i]??horseColors[0],spot)
    this.unsubscribe=world.onEdit((x,y,z)=>{
      const key=voxelIndex(x,y,z)
      if(this.town.has(key)){
        if(world.get(x,y,z)===0)this.damage.add(key)
        else this.damage.delete(key)
      }
      for(const actor of this.actors){
        if(actor.path.some(step=>Math.abs(step.x-(x+.5))<1.25&&Math.abs(step.z-(z+.5))<1.25&&Math.abs(step.y-y)<2.1)){
          actor.path=[];actor.ready=0
        }
      }
    })
  }

  private add(kind:FrontierKind,name:string,color:number,home:Point,record?:RaiderSave){
    const shape=actorShape[kind],spot=openFoot(this.world,record??home,shape,4)
    if(!spot)return
    const actor:Actor={...spot,kind,name,color,home:{...home},yaw:record?.yaw??Math.PI*.96,
      moving:false,stride:0,hp:record?.hp??(kind==='bandit'||kind==='gang'?loadout[kind].health:healthy),
      path:[],goal:null,ready:this.clock+.12+this.actors.length*.085,work:this.clock+.7,vy:0}
    this.actors.push(actor)
  }

  private inform(message:string){
    if(this.events.length<5)this.events.push(message)
  }
  consumeEvent(){return this.events.shift()}

  restoreHealth(){
    this.health=healthy
    this.damageReady=this.clock+2.5
    this.events.length=0
  }

  save():FrontierState{
    return {health:this.health,raidIn:Math.min(nextRaid,Math.max(0,this.raidAt-this.clock)),fires:this.fire.save(),fireBudget:this.fire.budget,
      raiders:this.actors.filter(hostile).map(({kind,x,y,z,yaw,hp})=>({kind,x,y,z,yaw,hp}))}
  }

  restore(state:FrontierState){
    if(!validFrontierState(state))return
    for(let i=this.actors.length-1;i>=0;i--)if(hostile(this.actors[i]))this.actors.splice(i,1)
    this.health=state.health
    this.raidAt=this.clock+state.raidIn
    this.warned=state.raidIn<=5
    this.fire.restore(state.fires,state.fireBudget)
    for(const actor of state.raiders)this.add(actor.kind,roles[actor.kind],loadout[actor.kind].color,actor,actor)
  }

  private aimedActor(pose:Pose,reach:number,limit:number){
    const from=eye(pose),forward=direction(pose)
    let actor:Actor|undefined,nearest=Math.min(reach,limit)
    for(const candidate of this.actors){
      const entry=rayToActor(from,forward,candidate,nearest)
      if(entry>=nearest)continue
      nearest=entry;actor=candidate
    }
    return actor?{actor,distance:nearest}:null
  }

  targetLabel(pose:Pose){
    const hit=raycast(this.world,pose)
    if(hit&&this.fire.has(hit.x,hit.y,hit.z))return '燃えているブロック　操作で消火'
    const target=this.aimedActor(pose,5,hit?.distance??Infinity)?.actor
    return target?target.name+(target.kind==='resident'?'（修理）':''):null
  }

  interact(pose:Pose):string|null{
    const hit=raycast(this.world,pose)
    if(hit&&this.fire.extinguish(hit.x,hit.y,hit.z))return '火を消しました。'
    const target=this.aimedActor(pose,5,hit?.distance??Infinity)?.actor
    if(!target)return null
    if(hostile(target))return '町を襲う'+roles[target.kind]+'です。'
    target.yaw=Math.atan2(target.x-pose.x,target.z-pose.z)
    switch(target.kind){
      case 'sheriff':return 'クレイ「襲撃には私も応戦する。建物にも気をつけてくれ。」'
      case 'horse':return target.name+'が耳をぴくりと動かした。'
      default:return target.name+'「壊れた町の建物は私たちで直すよ。建築区画は君が自由に使っていい。」'
    }
  }

  occupies(x:number,y:number,z:number){
    return this.actors.some(actor=>{
      const size=actorShape[actor.kind]
      return x<actor.x+size.radius&&x+1>actor.x-size.radius&&z<actor.z+size.radius&&z+1>actor.z-size.radius&&
        y<actor.y+size.height&&y+1>actor.y+.00001
    })
  }

  private trail(from:Point,to:Point,color:number){
    if(this.trails.length>=12)this.trails.shift()
    this.trails.push({from,to,color,until:this.clock+.19})
  }

  private defeat(actor:Actor){
    this.actors.splice(this.actors.indexOf(actor),1)
    if(!this.actors.some(hostile)){
      this.inform('襲撃をしのいだ！ 住民たちが町の修理を始めます。')
      this.raidAt=this.clock+nextRaid
      this.warned=false
    }
  }

  action(pose:Pose,itemId:number):Action{
    const torch=itemId===36,arrow=itemId===35||itemId===38
    if(!torch&&!arrow&&itemId!==34)return {ok:false,message:'装備を選んでください。'}
    if(this.clock<this.actionReady)return {ok:false,message:''}
    const reach=torch?5:arrow?16:20
    const terrain=rayToBlock(this.world,pose,reach)
    const actor=this.aimedActor(pose,reach,terrain?.distance??Infinity)
    if(torch&&(!terrain||actor))return {ok:false,message:'たいまつを当てるブロックに照準を合わせてください。'}
    const from=eye(pose),range=actor?.distance??terrain?.distance??reach
    const goal=along(from,direction(pose),range)
    const visibleStart={x:from.x+.24*Math.cos(pose.yaw),y:from.y-.22,z:from.z-.24*Math.sin(pose.yaw)}
    if(torch&&terrain){
      if(!this.fire.ignite(terrain.x,terrain.y,terrain.z))return {ok:false,message:'ここには火をつけられません。'}
      this.actionReady=this.clock+.28
      this.trail(visibleStart,goal,0xffad5c)
      return {ok:true,message:'たいまつを当てました。木や葉に火が広がります。'}
    }
    this.actionReady=this.clock+(arrow?.53:.34)
    this.trail(visibleStart,goal,arrow?0xff984f:0xffde95)
    if(actor){
      if(!hostile(actor.actor))return {ok:true,message:'発射しました。味方と馬にダメージは入りません。'}
      actor.actor.hp-=arrow?27:23
      const name=actor.actor.name,defeated=actor.actor.hp<=0
      if(defeated)this.defeat(actor.actor)
      return {ok:true,message:defeated?name+'を追い払った！':name+'に命中！'}
    }
    if(arrow&&terrain&&this.fire.ignite(terrain.x,terrain.y,terrain.z))return {ok:true,message:'火矢が着弾しました。'}
    return {ok:true,message:arrow?'火矢を放ちました。':'リボルバーを発射しました。'}
  }

  private raid(player:Point){
    if(this.actors.some(hostile)||player.x<FRONTIER_BOUNDS.minX-22||player.x>FRONTIER_BOUNDS.maxX+22||
      player.z<FRONTIER_BOUNDS.minZ-22||player.z>FRONTIER_BOUNDS.maxZ+22)return
    if(!this.warned&&this.clock>=this.raidAt-5){
      this.warned=true
      this.inform('町に盗賊とギャングが近づいています。')
    }
    if(this.clock<this.raidAt)return
    this.round++
    for(const [i,spot] of FRONTIER_SPAWNS.raidSpawns.entries()){
      const kind=(i+this.round)%3===0?'gang':'bandit'
      this.add(kind,roles[kind],loadout[kind].color,spot)
    }
    this.raidAt=this.clock+nextRaid
    if(this.actors.some(hostile))this.inform('襲撃開始！ 保安官が町を守っています。')
    else this.warned=false
  }

  private damagedNear(actor:Actor,radius=26,allowed?:(block:Structure)=>boolean){
    let best:Structure|undefined,score=Infinity
    for(const key of this.damage){
      const block=this.town.get(key)!
      const d=Math.hypot(block.x+.5-actor.x,block.z+.5-actor.z)
      const priority=d+Math.max(0,block.y-actor.y)*.035
      if(d>radius||priority>=score||allowed&&!allowed(block))continue
      score=priority;best=block
    }
    return best
  }

  private attackNear(actor:Actor){
    let best:Structure|undefined,score=Infinity
    for(const block of this.raidTargets){
      const d=distanceXZ(actor,center(block))
      if(d>=score||this.world.get(block.x,block.y,block.z)!==block.id||this.fire.has(block.x,block.y,block.z))continue
      score=d;best=block
    }
    return best
  }

  private approach(actor:Actor,block:Structure){
    let best:Point|undefined,score=Infinity
    for(const [dx,dz] of stepPoints){
      const position={x:block.x+dx+.5,y:actor.y,z:block.z+dz+.5}
      const foot=openFoot(this.world,position,actorShape[actor.kind],0)
      if(!foot)continue
      const d=distanceXZ(actor,foot)
      if(d<score){score=d;best=foot}
    }
    return best??{x:block.x+.5,y:actor.y,z:block.z+.5}
  }

  private wander(actor:Actor){
    const tick=Math.floor(this.clock/3)+this.actors.indexOf(actor)*33
    const direction=scatter(tick,37,this.world.salt)*Math.PI*2
    const radius=2+scatter(tick,93,this.world.salt)*6
    return {x:actor.home.x+Math.cos(direction)*radius,z:actor.home.z+Math.sin(direction)*radius,y:actor.home.y}
  }

  private plan(actor:Actor,player:Pose,raiders:Actor[]){
    const w=this.world
    let goal:Point
    actor.ready=this.clock+(hostile(actor)?.69:1.1)
    if(hostile(actor)){
      if(distance(actor,player)<10&&clearLine(w,head(actor),eye(player)))goal=player
      else{
        const target=this.attackNear(actor)
        goal=target?this.approach(actor,target):{...w.spawn(),z:w.spawn().z-10}
      }
    }else if(actor.kind==='sheriff'&&raiders.length){
      const threat=raiders.reduce((a,b)=>distance(actor,a)<=distance(actor,b)?a:b)
      if(distance(actor,threat)<=13&&clearLine(w,head(actor),head(threat))){
        actor.path=[];actor.goal=null;return
      }
      goal=threat
    }else if(actor.kind==='resident'){
      const damaged=!this.townFire&&!raiders.some(n=>distance(n,actor)<9)&&this.damagedNear(actor)
      goal=damaged?this.approach(actor,damaged):this.wander(actor)
    }else goal=this.wander(actor)
    actor.goal={...goal}
    actor.path=findPath(w,actor,goal,actorShape[actor.kind],performance.now()+1.2)
  }

  private walk(actor:Actor,dt:number,player:Pose){
    actor.moving=false
    const body=actorShape[actor.kind],w=this.world
    if(!clearBody(w,actor,body))return
    if(!grounded(w,actor,body)){
      actor.vy=Math.max(-13,actor.vy-20*dt)
      const lower={...actor,y:actor.y+actor.vy*dt}
      if(clearBody(w,lower,body))actor.y=lower.y
      else{actor.y=Math.ceil(lower.y-.00001);actor.vy=0}
      return
    }
    actor.y=Math.round(actor.y);actor.vy=0
    const step=actor.path[0]
    if(!step)return
    const d=distanceXZ(actor,step)
    if(d<.03){actor.path.shift();return}
    const t=Math.min(1,pace(actor)*dt/d)
    const next={x:actor.x+(step.x-actor.x)*t,y:actor.y,z:actor.z+(step.z-actor.z)*t}
    if(!clearBody(w,next,body,true)){
      const raised={...next,y:actor.y+1}
      if(step.y!==raised.y||!clearBody(w,{...actor,y:raised.y},body,true)||!clearBody(w,raised,body,true)){
        actor.path=[];actor.ready=0;return
      }
      next.y=raised.y
    }
    if(Math.abs(next.y-player.y)<1.7&&distanceXZ(next,player)<body.radius+.27&&distanceXZ(next,player)<distanceXZ(actor,player))
      return
    if(!clearBody(w,next,body,true))return
    actor.yaw=Math.atan2(actor.x-step.x,actor.z-step.z)
    Object.assign(actor,next)
    actor.moving=true;actor.stride=(actor.stride+pace(actor)*dt*7)%(Math.PI*2)
  }

  private acts(actor:Actor,player:Pose,raiders:Actor[]){
    if(actor.work>this.clock)return
    actor.work=this.clock+.18
    if(hostile(actor)){
      if(distance(actor,player)<1.65&&clearLine(this.world,head(actor),eye(player))){
        if(this.damageReady<=this.clock&&this.health>0){
          this.damageReady=this.clock+1.35
          this.health=Math.max(0,this.health-(actor.kind==='bandit'?11:14))
          this.inform(this.health===0?'町へ退避しました。':actor.name+'の攻撃！ 体力 '+this.health)
          actor.work=this.clock+.72
        }
        return
      }
      const block=this.attackNear(actor)
      if(!block||distanceXZ(actor,center(block))>2.25||!clearLine(this.world,head(actor),center(block),true))return
      actor.yaw=Math.atan2(actor.x-block.x-.5,actor.z-block.z-.5)
      if(actor.kind==='gang'){
        if(this.fire.ignite(block.x,block.y,block.z,false)){
          this.trail(head(actor),center(block),0xff955a)
          this.inform('ギャングが木の建物に火をつけた！')
        }
        actor.work=this.clock+2.7
      }else{
        this.world.set(block.x,block.y,block.z,0)
        actor.work=this.clock+1.65
      }
      actor.path=[]
    }else if(actor.kind==='sheriff'){
      const nearby=raiders.filter(n=>n.hp>0&&distance(n,actor)<=13&&clearLine(this.world,head(actor),head(n)))
      if(!nearby.length)return
      const target=nearby.reduce((a,b)=>distance(actor,a)<=distance(actor,b)?a:b)
      actor.yaw=Math.atan2(actor.x-target.x,actor.z-target.z)
      this.trail(head(actor),head(target),0xffd891)
      target.hp-=13
      if(target.hp<=0)this.defeat(target)
      actor.work=this.clock+.73
    }else if(actor.kind==='resident'&&!this.townFire&&!raiders.some(n=>n.hp>0&&distance(n,actor)<9)){
      const block=this.damagedNear(actor,3.7,b=>Math.abs(actor.y-b.y)<=8&&
        !overlapsPlayer(player,b.x,b.y,b.z)&&!this.occupies(b.x,b.y,b.z))
      if(!block)return
      this.world.set(block.x,block.y,block.z,block.id)
      actor.work=this.clock+.42
    }
  }

  update(player:Pose,elapsed:number,day=.4){
    if(!Number.isFinite(elapsed)||elapsed<=0)return
    const dt=Math.min(.12,elapsed)
    this.clock+=dt
    this.fire.step(dt)
    this.townFire=false
    for(const fire of this.fire.records())if(this.town.has(fire.key)){this.townFire=true;break}
    this.raid(player)
    const raiders=this.actors.filter(hostile)
    if(this.actors.length&&this.clock>=this.nextPlan){
      this.nextPlan=this.clock+.05
      for(let i=0;i<this.actors.length;i++){
        const actor=this.actors[this.cursor++%this.actors.length]
        if(actor.ready>this.clock||distance(actor,player)>88)continue
        this.plan(actor,player,raiders)
        break
      }
    }
    for(const actor of [...this.actors])if(actor.hp>0&&distance(actor,player)<88){
      this.walk(actor,dt,player)
      this.acts(actor,player,raiders)
    }
    while(this.trails.length&&this.trails[0].until<=this.clock)this.trails.shift()
    this.view.update(this.actors,this.fire.records(),this.trails,player,this.clock,day)
  }

  dispose(){
    this.unsubscribe()
    this.view.dispose()
  }
}
