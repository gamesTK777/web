import * as T from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { eyeHeight, raycast, type Player } from './physics'
import { SEA_LEVEL, scatter, type World } from './world'

type WaterWorld = Pick<World, 'get' | 'spawn' | 'salt'> & Partial<Pick<World,'stage'>>
type FishKind = 'jade' | 'amber' | 'shark'
type Fish = {
  kind: FishKind
  model: T.Group
  tail: T.Mesh
  home: T.Vector3
  destination: T.Vector3
  phase: number
  waypoint: number
  nextTurn: number
}
type Box = readonly [x: number, y: number, z: number, width: number, height: number, depth: number, color: number]
type Sculpture = { body: Box[]; tail: Box[]; tailOffset: number }

const water = 13
const fullHealth = 100
const playerReach = 4.5
const biteRange = 1.52
const noticeRange = 8.2
const lightFace = [.79, .69, 1, .63, .91, .75]
const eye = 0x203547
const glint = 0xf0f8fa
const sizes = {
  jade: {radius:.55, vertical:.23, speed:1.33},
  amber:{radius:.50, vertical:.28, speed:1.04},
  shark:{radius:1.13, vertical:.44, speed:1.25},
}
const names: Record<FishKind, string> = {
  jade:'ヒスイフィッシュ', amber:'アンバーフィッシュ', shark:'サメ',
}

const figures: Record<FishKind, Sculpture> = {
  jade:{
    body:[
      [0,0,.06,.21,.27,.46,0x43dfb1], [0,.09,-.03,.16,.17,.40,0x198c92],
      [0,-.09,.08,.20,.09,.37,0xb8f8a8], [0,0,.27,.15,.18,.10,0x74e9c1],
      [0,.08,-.06,.027,.23,.26,0x326ca7], [0,-.075,.05,.31,.034,.12,0x40b8cb],
      [-.108,.044,.20,.023,.062,.058,eye], [.108,.044,.20,.023,.062,.058,eye],
      [-.121,.057,.221,.009,.018,.018,glint], [.121,.057,.221,.009,.018,.018,glint],
    ],
    tail:[[0,0,-.052,.115,.105,.12,0x54dcbc],[0,0,-.157,.047,.24,.115,0x368bbb],[0,.106,-.208,.026,.095,.095,0x39b2cf],[0,-.106,-.208,.026,.095,.095,0x39b2cf]],
    tailOffset:-.215,
  },
  amber:{
    body:[
      [0,0,.055,.245,.285,.36,0xea7832], [0,.085,.035,.195,.168,.29,0xfcb14b],
      [0,-.083,.025,.19,.13,.32,0xffd26c], [0,-.006,.246,.17,.20,.13,0xff963c],
      [0,0,.109,.25,.283,.069,0xffefd1], [0,.169,-.01,.052,.146,.201,0xeec45c],
      [0,-.035,.045,.33,.040,.16,0xf6ac3c], [-.091,.047,.238,.027,.067,.058,eye],
      [.091,.047,.238,.027,.067,.058,eye], [-.107,.061,.260,.008,.019,.015,glint],
      [.107,.061,.260,.008,.019,.015,glint],
    ],
    tail:[[0,0,-.049,.12,.126,.16,0xf2a23e],[0,0,-.142,.055,.257,.135,0xfcc952],[0,.094,-.208,.032,.086,.082,0xffe090],[0,-.094,-.208,.032,.086,.082,0xffe090]],
    tailOffset:-.19,
  },
  shark:{
    body:[
      [0,-.025,.18,.65,.41,1.10,0x527894], [0,.092,.17,.58,.24,1.05,0x304f70],
      [0,-.204,.23,.54,.13,.98,0xd2e7df], [0,-.037,.725,.51,.317,.32,0x658a9f],
      [0,-.027,.876,.366,.229,.18,0x718fa5], [0,-.189,.712,.48,.054,.31,0xe6f2df],
      [0,-.138,.791,.45,.028,.27,0x293b55], [0,-.043,-.406,.52,.31,.34,0x4c7590],
      [0,.265,.065,.105,.20,.37,0x426484], [0,.381,-.011,.078,.114,.23,0x456e90],
      [-.41,-.111,.176,.225,.078,.34,0x3f6381], [.41,-.111,.176,.225,.078,.34,0x3f6381],
      [-.55,-.135,.108,.12,.057,.217,0x527b91], [.55,-.135,.108,.12,.057,.217,0x527b91],
      [-.249,.032,.772,.039,.106,.112,0xe9f5eb], [.249,.032,.772,.039,.106,.112,0xe9f5eb],
      [-.271,.030,.801,.025,.063,.064,eye], [.271,.030,.801,.025,.063,.064,eye],
      [-.326,-.033,.329,.018,.099,.043,0x3b5e79], [.326,-.033,.329,.018,.099,.043,0x3b5e79],
      [-.329,-.027,.416,.017,.106,.042,0x3b5e79], [.329,-.027,.416,.017,.106,.042,0x3b5e79],
    ],
    tail:[
      [0,-.026,-.09,.30,.235,.34,0x537a95], [0,-.018,-.222,.090,.43,.18,0x466d8b],
      [0,.177,-.281,.076,.227,.154,0x527c9a], [0,.306,-.337,.065,.073,.106,0x7497ab],
      [0,-.185,-.282,.073,.13,.12,0x547d97],
    ],
    tailOffset:-.58,
  },
}

function sculpt(parts: Box[]): T.BufferGeometry {
  const boxes = parts.map(([x,y,z,width,height,depth,tint])=>{
    const geometry = new T.BoxGeometry(width,height,depth)
    geometry.translate(x,y,z)
    const color = new T.Color(tint)
    const colors = new Float32Array(geometry.attributes.position.count * 3)
    for (let index=0;index<colors.length/3;index+=1) {
      color.setHex(tint).multiplyScalar(lightFace[Math.floor(index/4)]).toArray(colors,index*3)
    }
    geometry.setAttribute('color',new T.BufferAttribute(colors,3))
    return geometry
  })
  const geometry = mergeGeometries(boxes)
  for (const box of boxes) box.dispose()
  return geometry
}

function submerged(world: WaterWorld, x: number, y: number, z: number) {
  return world.get(Math.floor(x),Math.floor(y),Math.floor(z))===water
}

function fits(world: WaterWorld, point: T.Vector3, kind: FishKind) {
  const {radius,vertical}=sizes[kind]
  // Allow room above the fins for the slightly lowered, animated water surface.
  const top=Math.floor(point.y+vertical+.14)
  for(let y=Math.floor(point.y-vertical);y<=top;y+=1) {
    for(let z=Math.floor(point.z-radius);z<=Math.floor(point.z+radius);z+=1) {
      for(let x=Math.floor(point.x-radius);x<=Math.floor(point.x+radius);x+=1) {
        if(world.get(x,y,z)!==water)return false
      }
    }
  }
  return true
}

function waterCandidates(world: WaterWorld) {
  const {x,z}=world.spawn(), centerX=Math.floor(x), centerZ=Math.floor(z)
  const points: T.Vector3[]=[]
  const probe=new T.Vector3()
  // The configured stages share a waterline. Try both shallows and the deeper
  // layer so that even the generated one-block coves can support small fish.
  const layers=[SEA_LEVEL-.50,SEA_LEVEL+.44,SEA_LEVEL-1.5,SEA_LEVEL-2.5]
  const sample=(dx: number,dz: number)=>{
    if((dx+dz)%2!==0)return
    const bx=centerX+dx,bz=centerZ+dz
    for(const by of layers) {
      if(world.get(bx,Math.floor(by),bz)!==water)continue
      probe.set(bx+.5,by,bz+.5)
      if(!fits(world,probe,'jade')&&!fits(world,probe,'amber'))continue
      points.push(probe.clone())
      return
    }
  }
  for(let radius=2;radius<=61;radius+=1) {
    for(let offset=-radius;offset<=radius;offset+=1) {
      sample(offset,-radius)
      sample(offset,radius)
      if(Math.abs(offset)===radius)continue
      sample(-radius,offset)
      sample(radius,offset)
    }
    // Stop once there is enough water for both schools and a full-size shark.
    if(points.length>=96&&points.some(p=>fits(world,p,'shark')))break
  }
  points.sort((a,b)=>Math.hypot(a.x-x,a.z-z)-Math.hypot(b.x-x,b.z-z))
  return points
}

function chooseSchool(world: WaterWorld, kind: 'jade' | 'amber', points: T.Vector3[], taken: T.Vector3[]) {
  const candidates=points.filter(p=>fits(world,p,kind))
  const anchor=candidates.find(p=>taken.every(peer=>peer.distanceToSquared(p)>5)) ?? candidates[0]
  if(!anchor)return []
  const neighbors=candidates.filter(p=>p.distanceToSquared(anchor)<=85)
  neighbors.sort((a,b)=>a.distanceToSquared(anchor)-b.distanceToSquared(anchor))
  const group: T.Vector3[]=[]
  for(const point of neighbors) {
    if(taken.some(peer=>peer.distanceToSquared(point)<1.30))continue
    taken.push(point)
    group.push(point)
    if(group.length===5)break
  }
  return group
}

export class AquaticLife {
  private readonly fish: Fish[]=[]
  private readonly materials=new Set<T.Material>()
  private readonly geometries=new Set<T.BufferGeometry>()
  private readonly events: string[]=[]
  private readonly target=new T.Vector3()
  private readonly step=new T.Vector3()
  private readonly ray=new T.Ray()
  private readonly bitePoint=new T.Vector3()
  private readonly rayHit=new T.Vector3()
  private readonly sharkBox=new T.Box3(new T.Vector3(-.61,-.27,-1.03),new T.Vector3(.61,.45,1.0))
  private readonly shark?: Fish
  private sharkMaterial?: T.MeshBasicMaterial
  private playerHealth=fullHealth
  private enemyHealth=fullHealth
  private biteCooldown=0
  private attackCooldown=0
  private immunity=0
  private hitFlash=0
  private timeSinceBite=0
  private fade=0
  private chasing=false
  private defeated: boolean

  constructor(private readonly world: WaterWorld, private readonly scene: T.Scene, sharkDefeated=false) {
    this.defeated=sharkDefeated
    if(world.stage==='flat')return
    const candidates=waterCandidates(world)
    const taken: T.Vector3[]=[]
    const sharkHome=candidates.find(p=>fits(world,p,'shark'))
    if(sharkHome)taken.push(sharkHome)
    if(sharkHome&&!this.defeated) {
      this.shark=this.addSchool('shark',[sharkHome])[0]
      this.sharkMaterial=(this.shark.model.children[0] as T.Mesh<T.BufferGeometry,T.MeshBasicMaterial>).material
    }
    this.addSchool('jade',chooseSchool(world,'jade',candidates,taken))
    this.addSchool('amber',chooseSchool(world,'amber',candidates,taken))
  }

  get health() { return Math.ceil(this.playerHealth) }
  get sharkHealth() { return this.defeated?0:this.shark?this.enemyHealth:null }
  get sharkDefeated() { return this.defeated }
  get hasAquaticLife() { return this.fish.length>0 }

  private addSchool(kind: FishKind, homes: T.Vector3[]) {
    if(!homes.length)return []
    const figure=figures[kind]
    const bodyGeometry=sculpt(figure.body), tailGeometry=sculpt(figure.tail)
    const material=new T.MeshBasicMaterial({vertexColors:true,toneMapped:false})
    this.geometries.add(bodyGeometry).add(tailGeometry)
    this.materials.add(material)
    return homes.map((home,index)=>{
      const phase=scatter(Math.floor(home.x),Math.floor(home.z),this.world.salt^((index+1)*213))*Math.PI*2
      const model=new T.Group()
      model.name='aquatic-'+kind
      model.userData.species=names[kind]
      model.position.copy(home)
      model.rotation.y=phase
      const tail=new T.Mesh(tailGeometry,material)
      tail.position.z=figure.tailOffset
      model.add(new T.Mesh(bodyGeometry,material),tail)
      this.scene.add(model)
      const fish: Fish={kind,model,tail,home,destination:home.clone(),phase,waypoint:index,nextTurn:0}
      this.fish.push(fish)
      return fish
    })
  }

  consumeEvent() { return this.events.shift()??null }

  resetHealth() {
    this.playerHealth=fullHealth
    this.immunity=3
    this.timeSinceBite=0
    this.chasing=false
    this.events.length=0
  }

  private swimmerPoint(player: Player) {
    this.bitePoint.set(player.x,player.y+.18,player.z)
    if(!submerged(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z))this.bitePoint.y=player.y+1
    return submerged(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)
  }

  private openWaterLine(from: T.Vector3, to: T.Vector3) {
    const steps=Math.ceil(from.distanceTo(to)/.22)
    for(let index=1;index<steps;index+=1) {
      this.step.lerpVectors(from,to,index/steps)
      if(!submerged(this.world,this.step.x,this.step.y,this.step.z))return false
    }
    return true
  }

  canAttack(player: Player) {
    const shark=this.shark
    if(!shark||this.defeated||!shark.model.visible||this.health<=0||!this.swimmerPoint(player))return false
    const center=shark.model.position
    const origin=this.ray.origin.set(player.x,player.y+eyeHeight(player),player.z).sub(center)
    if(origin.lengthSq()>(playerReach+1.2)**2)return false
    const direction=this.ray.direction.set(
      -Math.sin(player.yaw)*Math.cos(player.pitch),Math.sin(player.pitch),-Math.cos(player.yaw)*Math.cos(player.pitch))
    const angle=-shark.model.rotation.y
    const turnX=(x: number,z: number)=>x*Math.cos(angle)+z*Math.sin(angle)
    const turnZ=(x: number,z: number)=>-x*Math.sin(angle)+z*Math.cos(angle)
    origin.set(turnX(origin.x,origin.z),origin.y,turnZ(origin.x,origin.z))
    direction.set(turnX(direction.x,direction.z),direction.y,turnZ(direction.x,direction.z))
    const hit=this.ray.intersectBox(this.sharkBox,this.rayHit)
    if(!hit)return false
    const distance=this.sharkBox.containsPoint(origin)?0:hit.distanceTo(origin)
    if(distance>playerReach)return false
    const wall=raycast(this.world,player,playerReach)
    return !wall||wall.distance>distance+.055
  }

  attack(player: Player) {
    if(!this.canAttack(player))return false
    if(this.attackCooldown>0)return true
    this.attackCooldown=.34
    this.hitFlash=.22
    this.enemyHealth=Math.max(0,this.enemyHealth-25)
    if(this.enemyHealth===0) {
      this.defeated=true
      this.fade=.7
      this.events.push('サメを倒しました！')
    } else {
      this.events.push('サメにヒット！ 残り体力 '+this.enemyHealth)
    }
    return true
  }

  update(player: Player, dt: number) {
    const elapsed=Math.min(.1,dt)
    if(!Number.isFinite(elapsed)||elapsed<=0)return
    this.attackCooldown=Math.max(0,this.attackCooldown-elapsed)
    this.biteCooldown=Math.max(0,this.biteCooldown-elapsed)
    this.immunity=Math.max(0,this.immunity-elapsed)
    this.hitFlash=Math.max(0,this.hitFlash-elapsed)
    this.timeSinceBite+=elapsed
    const playerWet=this.swimmerPoint(player)
    if(!playerWet&&this.timeSinceBite>=3&&this.playerHealth>0) {
      this.playerHealth=Math.min(fullHealth,this.playerHealth+20*elapsed)
    }
    if(this.sharkMaterial)this.sharkMaterial.color.setHex(this.hitFlash>.01?0xffb057:0xffffff)
    for(const fish of this.fish) {
      if(fish===this.shark&&this.defeated) {
        this.fade=Math.max(0,this.fade-elapsed)
        fish.model.visible=this.fade>0
        fish.model.scale.setScalar(this.fade/.7)
        fish.model.rotation.z=(1-this.fade/.7)*1.8
        continue
      }
      const position=fish.model.position
      fish.model.visible=position.distanceToSquared(this.target.set(player.x,player.y,player.z))<62**2&&fits(this.world,position,fish.kind)
      if(!fish.model.visible) {
        if(fits(this.world,fish.home,fish.kind))position.copy(fish.home)
        continue
      }
      const pursue=fish===this.shark&&playerWet&&this.health>0&&this.immunity<=0&&
        position.distanceToSquared(this.bitePoint)<noticeRange**2&&fish.home.distanceToSquared(this.bitePoint)<19**2&&
        this.openWaterLine(position,this.bitePoint)
      if(fish===this.shark) {
        if(pursue&&!this.chasing)this.events.push('サメがこちらに向かっています！')
        this.chasing=pursue
        if(pursue&&position.distanceToSquared(this.bitePoint)<biteRange**2&&this.biteCooldown<=0) {
          this.biteCooldown=1.4
          this.timeSinceBite=0
          this.playerHealth=Math.max(0,this.playerHealth-20)
          this.events.push(this.health>0?'サメにかまれた！ 体力 '+this.health:'体力がなくなりました。')
        }
      }
      fish.nextTurn-=elapsed
      if(pursue) {
        this.target.copy(this.bitePoint)
        // At the shoreline aim below the player while remaining fully submerged.
        if(!fits(this.world,this.target,fish.kind))this.target.y=position.y
      } else {
        if(fish.nextTurn<=0||position.distanceToSquared(fish.destination)<.2)this.swimWaypoint(fish)
        this.target.copy(fish.destination)
      }
      this.swim(fish,this.target,elapsed,pursue?2.7:sizes[fish.kind].speed)
      fish.phase+=elapsed*(pursue?9.3:5.8)
      fish.tail.rotation.y=Math.sin(fish.phase)*(pursue?.37:.27)
      fish.model.rotation.z=Math.sin(fish.phase*.57)*.035
    }
  }

  private swimWaypoint(fish: Fish) {
    fish.nextTurn=1.4+(fish.waypoint%5)*.23
    for(let attempt=0;attempt<8;attempt+=1) {
      const seed=this.world.salt^Math.floor(fish.home.x*276+fish.home.z*61)
      const index=++fish.waypoint
      const angle=scatter(index,939,seed)*Math.PI*2
      const radius=1+scatter(index,817,seed)*(fish.kind==='shark'?5:3.5)
      this.step.set(
        fish.home.x+Math.cos(angle)*radius,
        fish.home.y+(scatter(index,794,seed)-.5)*.84,
        fish.home.z+Math.sin(angle)*radius)
      if(fits(this.world,this.step,fish.kind)) {
        fish.destination.copy(this.step)
        return
      }
    }
    fish.destination.copy(fish.home)
  }

  private swim(fish: Fish, next: T.Vector3, dt: number, speed: number) {
    const position=fish.model.position
    const dx=next.x-position.x,dy=next.y-position.y,dz=next.z-position.z
    const distance=Math.hypot(dx,dy,dz)
    if(distance<.075)return
    const factor=Math.min(1,dt*speed/distance)
    this.step.set(position.x+dx*factor,position.y+dy*factor,position.z+dz*factor)
    if(!fits(this.world,this.step,fish.kind)) {
      this.step.y=position.y
      if(!fits(this.world,this.step,fish.kind)) {
        this.step.x=position.x
        if(!fits(this.world,this.step,fish.kind)) {
          this.step.x=position.x+dx*factor
          this.step.z=position.z
          if(!fits(this.world,this.step,fish.kind))return
        }
      }
    }
    const turn=Math.atan2(this.step.x-position.x,this.step.z-position.z)-fish.model.rotation.y
    fish.model.rotation.y+=Math.atan2(Math.sin(turn),Math.cos(turn))*Math.min(1,dt*7)
    position.copy(this.step)
  }

  dispose() {
    for(const fish of this.fish)fish.model.removeFromParent()
    for(const geometry of this.geometries)geometry.dispose()
    for(const material of this.materials)material.dispose()
  }
}
