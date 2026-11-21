import { SEA_LEVEL, SIZE, type World } from './world'
import { SCHOOL_BOUNDS, SCHOOL_LEVELS } from './school'
import { COPS_BOUNDS, COPS_RESCUE } from './cops-stages'

const outdoorZones = 8
const worldBounds={minX:0,maxX:SIZE,minZ:0,maxZ:SIZE}
type Point = {x:number;y:number;z:number}
type Peer = {pose:Point}
type RGB = readonly [number,number,number]

function terrainColor(world:World,startX:number,startZ:number,width:number,depth:number) {
  const color=[0,0,0]
  for(let row=0;row<4;row++){
    for(let column=0;column<4;column++){
      const x=Math.floor(startX+(column+.5)*width/4),z=Math.floor(startZ+(row+.5)*depth/4)
      const y=world.highest[x+z*SIZE],id=world.get(x,y,z)
      const water=world.get(x,SEA_LEVEL,z)===13
      const city=world.stage==='crossing'
      const colors:RGB=water?[63,126,140]:id===4?[177,157,101]:id===5||id===6?[55,101,70]:
        city?(y>33?[100,128,148]:[66,81,89]):[102,132,76]
      const heightShade=water?0:Math.ceil((y-30)*.9)
      for(let c=0;c<3;c++)color[c]+=colors[c]+heightShade
    }
  }
  return 'rgb('+color.map(channel=>Math.round(channel/16)).join(',')+')'
}

function schoolColor(world:World,x:number,y:number,z:number) {
  const below=world.get(x,y-1,z), eye=world.get(x,y+1,z), low=world.get(x,y,z)
  if(eye&&eye!==10)return '#29444e'
  if(eye===10)return '#66b6c1'
  if(low)return '#8b6b51'
  if(!below)return '#263f46'
  if(below===5||below===7)return '#d9ad72'
  if(below===1||below===6)return '#8baa70'
  return '#b8b7a3'
}

export class TagMap {
  private readonly terrain:HTMLCanvasElement[]
  private readonly context:CanvasRenderingContext2D|null
  private readonly bounds:typeof worldBounds
  private readonly columns:number
  private readonly rows:number
  private readonly school:boolean
  private readonly cops:boolean
  private readonly counts:Uint8Array
  private readonly drawnCounts:Uint8Array
  private drawnSelf=-2
  private drawnFloor=-1

  constructor(private readonly canvas:HTMLCanvasElement, world:World, private readonly levelLabel?:HTMLElement) {
    this.context=canvas.getContext('2d')
    this.school=world.stage==='school'
    this.cops=world.stage==='park'||world.stage==='crossing'
    this.bounds=this.school?SCHOOL_BOUNDS:this.cops?COPS_BOUNDS:worldBounds
    this.columns=this.school?6:outdoorZones
    this.rows=this.school?5:outdoorZones
    this.counts=new Uint8Array(this.columns*this.rows)
    this.drawnCounts=new Uint8Array(this.counts.length)
    this.terrain=this.school?SCHOOL_LEVELS.map(y=>this.drawBase(world,y)):[this.drawBase(world)]
    if(levelLabel)levelLabel.hidden=!this.school
  }

  private drawBase(world:World,floor?:number){
    const canvas=this.canvas.ownerDocument.createElement('canvas')
    canvas.width=this.canvas.width;canvas.height=this.canvas.height
    const painter=canvas.getContext('2d')
    if(!painter)return canvas
    const w=canvas.width/this.columns,h=canvas.height/this.rows
    if(floor!==undefined){
      const {minX,maxX,minZ,maxZ}=this.bounds
      const cellW=canvas.width/(maxX-minX),cellH=canvas.height/(maxZ-minZ)
      for(let z=minZ;z<maxZ;z++)for(let x=minX;x<maxX;x++){
        const left=Math.round((x-minX)*cellW),top=Math.round((z-minZ)*cellH)
        painter.fillStyle=schoolColor(world,x,floor,z)
        painter.fillRect(left,top,Math.round((x+1-minX)*cellW)-left,Math.round((z+1-minZ)*cellH)-top)
      }
    }else{
      const {minX,maxX,minZ,maxZ}=this.bounds
      const width=(maxX-minX)/this.columns,depth=(maxZ-minZ)/this.rows
      for(let z=0;z<this.rows;z++)for(let x=0;x<this.columns;x++){
        painter.fillStyle=terrainColor(world,minX+x*width,minZ+z*depth,width,depth)
        painter.fillRect(x*w,z*h,w,h)
      }
    }
    painter.strokeStyle=this.school?'#e8f4ce65':'#153b3666';painter.lineWidth=1
    painter.beginPath()
    for(let step=1;step<this.columns;step++){painter.moveTo(step*w+.5,0);painter.lineTo(step*w+.5,canvas.height)}
    for(let step=1;step<this.rows;step++){painter.moveTo(0,step*h+.5);painter.lineTo(canvas.width,step*h+.5)}
    painter.stroke()
    return canvas
  }

  private zoneAt({x,z}:Point) {
    const {minX,maxX,minZ,maxZ}=this.bounds
    if(!Number.isFinite(x)||!Number.isFinite(z)||x<minX||z<minZ||x>=maxX||z>=maxZ)return -1
    return Math.floor((x-minX)*this.columns/(maxX-minX))+this.columns*Math.floor((z-minZ)*this.rows/(maxZ-minZ))
  }

  private floorAt({y}:Point){
    return this.school&&y>=(SCHOOL_LEVELS[0]+SCHOOL_LEVELS[1])/2?1:0
  }

  update(peers:readonly Peer[], self:Point, showPeers:boolean) {
    const ctx=this.context
    if(!ctx)return
    const own=this.zoneAt(self),floor=this.floorAt(self)
    let elsewhere=0
    this.counts.fill(0)
    if(showPeers){
      for(const {pose} of peers){
        if(this.floorAt(pose)!==floor){elsewhere++;continue}
        const zone=this.zoneAt(pose)
        if(zone>=0)this.counts[zone]++
      }
    }
    if(this.school&&this.levelLabel){
      const label='校舎 '+(floor+1)+'階'+(elsewhere?'　別の階に '+elsewhere+'人':'')
      if(this.levelLabel.textContent!==label)this.levelLabel.textContent=label
    }
    if(own===this.drawnSelf&&floor===this.drawnFloor&&this.counts.every((count,zone)=>count===this.drawnCounts[zone]))return
    this.drawnSelf=own;this.drawnFloor=floor;this.drawnCounts.set(this.counts)
    const w=this.canvas.width/this.columns,h=this.canvas.height/this.rows
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    ctx.globalAlpha=this.school ? .72 : .53
    ctx.drawImage(this.terrain[floor],0,0)
    ctx.globalAlpha=1
    if(own>=0){
      const x=(own%this.columns)*w,z=Math.floor(own/this.columns)*h
      ctx.fillStyle='#cef9ff4d';ctx.fillRect(x,z,w,h)
      ctx.strokeStyle='#d7f9ff';ctx.lineWidth=3
      ctx.strokeRect(x+2,z+2,w-4,h-4)
    }
    ctx.font='800 24px system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle'
    this.counts.forEach((count,zone)=>{
      if(!count)return
      const x=(zone%this.columns+.5)*w,z=(Math.floor(zone/this.columns)+.5)*h
      ctx.beginPath();ctx.arc(x,z,Math.min(w,h)*.34,0,Math.PI*2)
      ctx.fillStyle='#ffe292';ctx.fill()
      ctx.strokeStyle='#4b4225';ctx.lineWidth=2;ctx.stroke()
      ctx.fillStyle='#263025';ctx.fillText(String(count),x,z+1)
    })
    if(this.cops){
      const {minX,maxX,minZ,maxZ}=this.bounds
      const x=(COPS_RESCUE.x-minX)/(maxX-minX)*this.canvas.width
      const y=(COPS_RESCUE.z-minZ)/(maxZ-minZ)*this.canvas.height
      ctx.fillStyle='#45839a';ctx.fillRect(x-30,y-13,60,26)
      ctx.font='bold 18px system-ui, sans-serif';ctx.fillStyle='#fff7df';ctx.fillText('牢屋',x,y+1)
    }
  }
}
