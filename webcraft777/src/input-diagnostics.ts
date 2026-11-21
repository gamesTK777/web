export type Aim = {yaw:number; pitch:number}
export type InputMode = 'idle'|'pending'|'locked'|'drag'|'paused'

type Value = number|string|boolean
type Sample = {timeMs:number; mode:InputMode; event:string; lock:boolean} & Record<string,Value>
const capacity = 192

export class InputDiagnostics {
  private samples:Sample[] = []
  private cursor = 0
  private nextLook = 0
  private nextFrame = 0
  private nextIssue = 0
  private frames = 0
  private moves = 0
  private faults = 0
  private lastIssue = ''
  private detailed = false

  enable(value:boolean){this.detailed=value}
  add(mode:InputMode,event:string,lock:boolean,values:Record<string,Value>={},issue=false){
    const now=performance.now()
    if(issue){
      this.faults++
      this.lastIssue=String(values.reason??event)
      if(event==='look-limited'||event==='discontinuity'){
        if(now<this.nextIssue)return
        this.nextIssue=now+65
      }
    }
    if(event==='look'){
      this.moves++
      if(now<this.nextLook)return
      this.nextLook=now+(this.detailed?12:65)
    }
    if(event==='frame'){
      this.frames++
      if(now<this.nextFrame)return
      this.nextFrame=now+(this.detailed?100:500)
    }
    this.samples[this.cursor]={timeMs:Math.round(now),mode,event,lock,...values}
    this.cursor=(this.cursor+1)%capacity
  }
  report(){
    const events=this.samples.length<capacity?this.samples.slice():
      [...this.samples.slice(this.cursor),...this.samples.slice(0,this.cursor)]
    return {
      game:'ウェブクラフト777',generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,
      viewport:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio||1,
      embedded:window.self!==window.top,capacity,frames:this.frames,lookEvents:this.moves,anomalies:this.faults,
      lastIssue:this.lastIssue,events
    }
  }
}

const turn = Math.PI*2
export function yawWithinTurn(radians:number){
  const angle=radians%turn
  return angle>Math.PI?angle-turn:angle< -Math.PI?angle+turn:angle
}
export function pitchWithinView(radians:number){return Math.max(-1.55,Math.min(1.55,radians))}
