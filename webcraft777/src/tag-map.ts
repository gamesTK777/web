import { SEA_LEVEL, SIZE, type World } from './world'

const ZONES = 8
const ZONE_SIZE = SIZE / ZONES
type Point = {x:number;z:number}
type Peer = {pose:Point}
type RGB = readonly [number,number,number]

function zoneAt({x,z}:Point) {
  if (!Number.isFinite(x) || !Number.isFinite(z) || x<0 || z<0 || x>=SIZE || z>=SIZE) return -1
  return Math.floor(x/ZONE_SIZE)+ZONES*Math.floor(z/ZONE_SIZE)
}

function terrainColor(world:World, startX:number, startZ:number) {
  const color=[0,0,0]
  const sampleStep=ZONE_SIZE/4
  for(let dz=sampleStep/2;dz<ZONE_SIZE;dz+=sampleStep){
    for(let dx=sampleStep/2;dx<ZONE_SIZE;dx+=sampleStep){
      const x=startX+dx,z=startZ+dz,y=world.highest[x+z*SIZE],id=world.get(x,y,z)
      const water=world.get(x,SEA_LEVEL,z)===13
      const colors:RGB=water?[63,126,140]:id===4?[177,157,101]:id===5||id===6?[55,101,70]:[102,132,76]
      const heightShade=water?0:Math.ceil((y-30)*.9)
      for(let c=0;c<3;c++)color[c]+=colors[c]+heightShade
    }
  }
  return 'rgb('+color.map(channel=>Math.round(channel/16)).join(',')+')'
}

export class TagMap {
  private readonly terrain:HTMLCanvasElement
  private readonly context:CanvasRenderingContext2D|null
  private readonly counts=new Uint8Array(ZONES*ZONES)
  private readonly drawnCounts=new Uint8Array(ZONES*ZONES)
  private drawnSelf=-2

  constructor(private readonly canvas:HTMLCanvasElement, world:World) {
    this.context=canvas.getContext('2d')
    this.terrain=canvas.ownerDocument.createElement('canvas')
    this.terrain.width=canvas.width;this.terrain.height=canvas.height
    const painter=this.terrain.getContext('2d')
    if(!painter)return
    const w=canvas.width/ZONES,h=canvas.height/ZONES
    for(let z=0;z<ZONES;z++){
      for(let x=0;x<ZONES;x++){
        painter.fillStyle=terrainColor(world,x*ZONE_SIZE,z*ZONE_SIZE)
        painter.fillRect(x*w,z*h,w,h)
      }
    }
    painter.strokeStyle='#153b3666';painter.lineWidth=1
    painter.beginPath()
    for(let step=1;step<ZONES;step++){
      painter.moveTo(step*w+.5,0);painter.lineTo(step*w+.5,canvas.height)
      painter.moveTo(0,step*h+.5);painter.lineTo(canvas.width,step*h+.5)
    }
    painter.stroke()
  }

  update(peers:readonly Peer[], self:Point, showPeers:boolean) {
    const ctx=this.context
    if(!ctx)return
    const own=zoneAt(self)
    this.counts.fill(0)
    if(showPeers){
      for(const {pose} of peers){
        const zone=zoneAt(pose)
        if(zone>=0)this.counts[zone]++
      }
    }
    if(own===this.drawnSelf&&this.counts.every((count,zone)=>count===this.drawnCounts[zone]))return
    this.drawnSelf=own;this.drawnCounts.set(this.counts)
    const w=this.canvas.width/ZONES,h=this.canvas.height/ZONES
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    ctx.globalAlpha=.53
    ctx.drawImage(this.terrain,0,0)
    ctx.globalAlpha=1
    if(own>=0){
      const x=(own%ZONES)*w,z=Math.floor(own/ZONES)*h
      ctx.fillStyle='#cef9ff4d';ctx.fillRect(x,z,w,h)
      ctx.strokeStyle='#d7f9ff';ctx.lineWidth=3
      ctx.strokeRect(x+2,z+2,w-4,h-4)
    }
    ctx.font='800 24px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle'
    this.counts.forEach((count,zone)=>{
      if(!count)return
      const x=(zone%ZONES+.5)*w,z=(Math.floor(zone/ZONES)+.5)*h
      ctx.beginPath();ctx.arc(x,z,Math.min(w,h)*.34,0,Math.PI*2)
      ctx.fillStyle='#ffe292';ctx.fill()
      ctx.strokeStyle='#4b4225';ctx.lineWidth=2;ctx.stroke()
      ctx.fillStyle='#263025';ctx.fillText(String(count),x,z+1)
    })
  }
}
