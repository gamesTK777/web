import * as T from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { PARK_RIDE_REACH, PARK_RIDES, type ParkRideId } from '../online/park-rides-config.mjs'

export { PARK_RIDES, type ParkRideId }

export type ParkRideSeat = {id:string; seat:number; memberId:string; pump:number}
export type ParkRidePose = {x:number; y:number; z:number; yaw:number}
type Place = Pick<ParkRidePose,'x'|'y'|'z'>
type Piece = [x:number,y:number,z:number,width:number,height:number,depth:number,color:number,tiltX?:number]

const sea = 0x238b80
const mint = 0x83ceb3
const gold = 0xf3b64b
const orange = 0xe17a47
const rust = 0xa84a37
const slate = 0x344c52
const chain = 0xadc7c4
const darkTeal = 0x225e58
const pivotHeight = 3.82
const chainLength = 2.91
const swingSpacing = 1.14
const seesawPivot = 1.56
const plankEnd = 3.52
const seatSpacing = .55
const rideIds = ['swings','seesaw'] as const
const rideNames = {swings:'ブランコ',seesaw:'シーソー'} as const

function swingOffset(seat:number) { return seat===0 ? -swingSpacing : swingSpacing }
function sideOf(seat:number) { return seat<2 ? -1 : 1 }
function laneOf(seat:number) { return seat%2===0 ? -1 : 1 }

function isRideId(value:string):value is ParkRideId {
  return value==='swings'||value==='seesaw'
}

function validSeat(id:ParkRideId, seat:number) {
  return Number.isInteger(seat)&&seat>=0&&seat<PARK_RIDES[id].capacity
}

export function parkRideSeatPose(id:ParkRideId,seat:number,angle:number):ParkRidePose|undefined {
  if(!validSeat(id,seat)||!Number.isFinite(angle))return
  const anchor=PARK_RIDES[id]
  const sin=Math.sin(angle),cos=Math.cos(angle)
  if(id==='swings'){
    return {x:anchor.x+swingOffset(seat),y:anchor.y+pivotHeight-chainLength*cos-.43,
      z:anchor.z-chainLength*sin,yaw:0}
  }
  const side=sideOf(seat),x=plankEnd*side
  return {x:anchor.x+x*cos-.18*sin,y:anchor.y+seesawPivot+x*sin+.18*cos-.43,
    z:anchor.z+laneOf(seat)*seatSpacing,yaw:side*Math.PI/2}
}

function sculpture(material:T.MeshBasicMaterial,pieces:Piece[]) {
  const brightness=[.82,.70,1,.59,.80,.88]
  const color=new T.Color()
  const parts=pieces.map(([x,y,z,w,h,d,tint,tilt])=>{
    const geometry=new T.BoxGeometry(w,h,d)
    if(tilt)geometry.rotateX(tilt)
    geometry.translate(x,y,z)
    const position=geometry.getAttribute('position'),colors=new Float32Array(position.count*3)
    for(let i=0;i<position.count;i++){
      color.setHex(tint).multiplyScalar(brightness[Math.floor(i/4)]).toArray(colors,i*3)
    }
    geometry.setAttribute('color',new T.BufferAttribute(colors,3))
    return geometry
  })
  const geometry=mergeGeometries(parts)
  parts.forEach(part=>part.dispose())
  return new T.Mesh(geometry,material)
}

function swingsFrame(material:T.MeshBasicMaterial){
  const pieces:Piece[]=[
    [0,pivotHeight,0,5.15,.26,.29,gold],
    [0,pivotHeight+.17,0,5.25,.08,.20,orange],
  ]
  for(const x of [-2.29,2.29]){
    for(const side of [-1,1]){
      const z=side*1.73
      pieces.push([x,.12,z,.51,.23,.50,slate])
      pieces.push([x,(pivotHeight+.12)/2,z/2,.27,Math.hypot(pivotHeight-.12,z),.27,sea,-side*Math.atan2(1.73,3.7)])
    }
    pieces.push([x,1.56,0,.24,.14,2.15,mint])
    pieces.push([x,pivotHeight,0,.41,.40,.42,slate])
  }
  return sculpture(material,pieces)
}

function swingSeat(material:T.MeshBasicMaterial,seat:number){
  const color=seat===0?orange:sea
  const pieces:Piece[]=[
    [0,-chainLength-.03,0,1.05,.16,.62,slate],
    [0,-chainLength+.06,-.02,.97,.10,.55,color],
    [0,-chainLength+.16,.29,.92,.17,.13,color],
    [0,-.04,0,1.07,.13,.15,slate],
  ]
  for(const side of [-1,1]){
    pieces.push([side*.43,-chainLength/2,0,.059,chainLength,.059,chain])
    pieces.push([side*.43,-chainLength+.36,0,.105,.59,.103,gold])
  }
  return sculpture(material,pieces)
}

function seesawFrame(material:T.MeshBasicMaterial){
  return sculpture(material,[
    [0,.09,0,1.99,.17,1.98,slate],
    [0,.44,0,1.1,.53,1.66,darkTeal],
    [0,.96,0,.70,.62,1.55,sea],
    [0,1.38,0,.59,.35,1.58,mint],
    [0,seesawPivot,0,.40,.40,2.02,slate],
    [0,seesawPivot,-1.01,.25,.22,.08,gold],
    [0,seesawPivot,1.01,.25,.22,.08,gold],
  ])
}

function seesawDeck(material:T.MeshBasicMaterial) {
  const pieces:Piece[]=[
    [0,0,0,8.48,.26,1.78,orange],
    [0,-.17,0,8.48,.15,.31,rust],
    [0,.14,0,8.62,.08,.15,gold],
  ]
  for(const side of [-1,1]){
    const color=side<0?sea:rust
    pieces.push([side*4.23,.02,0,.16,.32,1.80,gold])
    for(const lane of [-1,1]){
      const z=lane*seatSpacing
      pieces.push([side*plankEnd,.21,z,.84,.18,.60,color])
      pieces.push([side*3.93,.44,z,.12,.43,.59,color])
      pieces.push([side*2.89,.43,z,.10,.51,.10,slate])
      pieces.push([side*2.89,.70,z,.13,.12,.42,gold])
    }
  }
  return sculpture(material,pieces)
}

export class ParkRides {
  readonly group=new T.Group()
  private readonly material=new T.MeshBasicMaterial({vertexColors:true,toneMapped:false})
  private readonly swings:T.Mesh[]=[]
  private readonly seesaw:T.Mesh
  private readonly occupants=new Map<string,ParkRideSeat & {id:ParkRideId}>()
  private readonly seats:[(ParkRideSeat|undefined)[],(ParkRideSeat|undefined)[]]=[[],[]]
  private lastTime:number|undefined

  constructor(scene:T.Scene) {
    this.group.name='park-rides'
    const swingRoot=new T.Group(),seesawRoot=new T.Group()
    const {swings,seesaw}=PARK_RIDES
    swingRoot.name='park-swings';swingRoot.position.set(swings.x,swings.y,swings.z)
    seesawRoot.name='park-seesaw';seesawRoot.position.set(seesaw.x,seesaw.y,seesaw.z)
    swingRoot.add(swingsFrame(this.material))
    seesawRoot.add(seesawFrame(this.material))
    for(let seat=0;seat<swings.capacity;seat++){
      const hanger=swingSeat(this.material,seat)
      hanger.position.set(swingOffset(seat),pivotHeight,0)
      hanger.name='park-swing-seat'
      swingRoot.add(hanger);this.swings.push(hanger)
    }
    this.seesaw=seesawDeck(this.material)
    this.seesaw.name='park-seesaw-deck'
    this.seesaw.position.y=seesawPivot
    seesawRoot.add(this.seesaw)
    this.group.add(swingRoot,seesawRoot)
    scene.add(this.group)
  }

  target(player:Place):{id:ParkRideId;label:string;seat?:number}|null {
    const id=rideIds.find(ride=>{
      const anchor=PARK_RIDES[ride]
      return Math.abs(player.y-anchor.y)<2.2&&Math.hypot(player.x-anchor.x,player.z-anchor.z)<=PARK_RIDE_REACH
    })
    if(!id)return null
    const seats=this.seats[id==='swings'?0:1]
    let best:number|undefined,range=Infinity
    for(let seat=0;seat<PARK_RIDES[id].capacity;seat++){
      if(seats[seat])continue
      const place=parkRideSeatPose(id,seat,0)!
      const distance=Math.hypot(place.x-player.x,place.z-player.z)
      if(distance<range){range=distance;best=seat}
    }
    return {id,label:best===undefined?rideNames[id]+'は満席です':rideNames[id]+'に乗る',seat:best}
  }

  update(rides:readonly ParkRideSeat[],serverTime:number) {
    if(!Number.isFinite(serverTime))return
    this.occupants.clear()
    for(const row of this.seats)row.length=0
    for(const ride of rides){
      const {id,seat,memberId}=ride
      if(!isRideId(id)||!validSeat(id,seat)||this.occupants.has(memberId))continue
      const row=this.seats[id==='swings'?0:1]
      if(row[seat])continue
      const occupant={id,seat,memberId,pump:Number.isFinite(ride.pump)?T.MathUtils.clamp(ride.pump,-1,1):0}
      row[seat]=occupant
      this.occupants.set(memberId,occupant)
    }
    const dt=this.lastTime===undefined ? .12 : T.MathUtils.clamp((serverTime-this.lastTime)/1000,0,.12)
    this.lastTime=serverTime
    const seconds=(serverTime%600_000)/1000
    for(const [seat,hanger] of this.swings.entries()){
      const rider=this.seats[0][seat]
      const phase=seconds*2*Math.PI/2.5+seat*.64
      const angle=rider?Math.sin(phase)*(.20+.50*Math.abs(rider.pump))+.036*rider.pump:0
      hanger.rotation.x=T.MathUtils.damp(hanger.rotation.x,angle,10,dt)
    }
    let leverage=0,effort=0,count=0
    for(const rider of this.seats[1]){
      if(!rider)continue
      leverage+=sideOf(rider.seat)*(1+rider.pump*.72)
      effort+=Math.abs(rider.pump)
      count++
    }
    const tilt=count?T.MathUtils.clamp(-leverage*.088+Math.sin(seconds*2*Math.PI/2.4)*(.08+.19*effort/count),-.285,.285):0
    this.seesaw.rotation.z=T.MathUtils.damp(this.seesaw.rotation.z,tilt,9,dt)
  }

  playerPose(memberId:string):ParkRidePose|undefined {
    const occupant=this.occupants.get(memberId)
    if(!occupant)return
    const angle=occupant.id==='swings'?this.swings[occupant.seat].rotation.x:this.seesaw.rotation.z
    return parkRideSeatPose(occupant.id,occupant.seat,angle)
  }

  exit(memberId:string):ParkRidePose|undefined {
    const occupant=this.occupants.get(memberId)
    if(!occupant)return
    const {id,seat}=occupant,anchor=PARK_RIDES[id]
    return id==='swings'?{x:anchor.x+swingOffset(seat),y:anchor.y+.03,z:anchor.z+(seat===0?-3.62:3.62),yaw:0}:
      {x:anchor.x+plankEnd*sideOf(seat),y:anchor.y+.03,z:anchor.z+laneOf(seat)*2.28,yaw:sideOf(seat)*Math.PI/2}
  }

  dispose(){
    this.group.removeFromParent()
    this.group.traverse(child=>{if(child instanceof T.Mesh)child.geometry.dispose()})
    this.material.dispose()
    this.occupants.clear()
    for(const row of this.seats)row.length=0
  }
}
