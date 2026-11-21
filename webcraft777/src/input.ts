import { InputDiagnostics, pitchWithinView, yawWithinTurn, type Aim, type InputMode } from './input-diagnostics'

export interface Controls {
  pause(): void; inventory(): void; fly(): void; debug(): void; select(index:number): void
  cycle(direction:number): void; place(): void; beginMine():void; look(dx:number,dy:number): void
  dragChanged(drag:boolean): void; background(): void; recovery?(reason:string):void
  pick?(): void; undo?(): void; rotate?(): void; home?(): void; guide?(): void; interact?(): void
  viewMode?(): void
}

type Contact = { id:number; element:HTMLElement; role:'look'|'mine'; x:number; y:number }
const movableKeys = new Set(['KeyW','KeyA','KeyS','KeyD','KeyC','Space','ShiftLeft','ShiftRight',
  'ControlLeft','ControlRight','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'])
const maxDiscontinuousTurn = 2 * Math.PI / 3
const screenSpan = () => Math.max(1024,window.screen?.width||0,window.screen?.height||0,window.innerWidth||0,window.innerHeight||0)

export class InputController {
  readonly keys = new Set<string>()
  mining = false
  private mode:InputMode = 'idle'
  get pending(){return this.mode==='pending'}
  get active(){return this.pending || this.mode==='locked' || this.mode==='drag'}
  get drag(){return this.mode==='drag'}
  private contact:Contact|null = null
  private ticket = 0
  private hasRequestPromise = false
  private jumpEdge = false
  private wheelSum = 0
  private lastWheel = -Infinity
  private nextWheel = -Infinity
  private yaw = 0
  private pitch = 0
  private sensitivity = 1
  private readonly trace = new InputDiagnostics()

  constructor(private canvas:HTMLCanvasElement,private controls:Controls){
    document.addEventListener('pointerlockchange',()=>this.reconcileLock())
    document.addEventListener('pointerlockerror',()=>{
      if(!this.hasRequestPromise)this.fallback('pointerlockerror')
    })
    document.addEventListener('mousemove',e=>{
      if(this.mode!=='locked')return
      if(!this.ownsLock()){this.reconcileLock();return}
      this.checkButtons(e)
      this.look(e.movementX,e.movementY)
    })
    canvas.addEventListener('contextmenu',e=>{if(this.active)e.preventDefault()})
    canvas.addEventListener('auxclick',e=>{if(this.active&&e.button===1)e.preventDefault()})
    canvas.addEventListener('pointerdown',e=>this.startView(e))
    canvas.addEventListener('pointermove',e=>this.movePointer(e))
    canvas.addEventListener('lostpointercapture',e=>this.release(e))
    document.addEventListener('pointerdown',e=>{
      const button=(e.target as Element|null)?.closest?.<HTMLButtonElement>('[data-hold="mine"]')
      if(!this.drag||!button||button.disabled||e.button!==0||this.contact)return
      if(e.pointerType!=='mouse')e.preventDefault()
      if(!this.grab(e,button,'mine'))return
      this.mining=true
      this.controls.beginMine()
    })
    document.addEventListener('pointermove',e=>{if(e.target!==canvas)this.movePointer(e)})
    document.addEventListener('lostpointercapture',e=>this.release(e))
    window.addEventListener('pointerup',e=>this.release(e))
    window.addEventListener('pointercancel',e=>this.release(e))
    // pointerup reports the last button. mouseup reports each mouse button separately.
    window.addEventListener('mouseup',e=>{if(e.button===0)this.dropContact()})
    canvas.addEventListener('wheel',e=>this.wheel(e),{passive:false})
    window.addEventListener('keydown',e=>this.keydown(e))
    window.addEventListener('keyup',e=>this.keys.delete(e.code))
    window.addEventListener('blur',()=>this.interrupt('blur'))
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){this.interrupt('hidden');this.controls.background()}
    })
  }

  private ownsLock(){return document.pointerLockElement===this.canvas}
  private record(event:string,values:Record<string,string|number|boolean>={},issue=false){
    this.trace.add(this.mode,event,this.ownsLock(),values,issue)
  }
  setDiagnostics(enabled:boolean){this.trace.enable(enabled)}
  report(){return {...this.trace.report(),mode:this.mode,pointerLock:this.ownsLock(),sensitivity:this.sensitivity,yaw:this.yaw,pitch:this.pitch}}

  rememberView(view:Aim){
    if(Number.isFinite(view.yaw)&&Number.isFinite(view.pitch)){
      this.yaw=yawWithinTurn(view.yaw)
      this.pitch=pitchWithinView(view.pitch)
    }
    view.yaw=this.yaw
    view.pitch=this.pitch
  }
  private restoreAngles(view:Aim){view.yaw=this.yaw;view.pitch=this.pitch}
  applyLook(view:Aim,dx:number,dy:number,sensitivity:number,invertY=false){
    if(!Number.isFinite(view.yaw)||!Number.isFinite(view.pitch)||!Number.isFinite(sensitivity)||sensitivity<=0||
      !Number.isFinite(dx)||!Number.isFinite(dy)){
      this.restoreAngles(view)
      this.fail('視点または感度に無効な数値が届きました。')
      return
    }
    this.sensitivity=sensitivity
    let scale=.00235*sensitivity
    const distance=Math.hypot(dx,dy),turn=distance*scale
    // Preserve normal high-sensitivity input. Limit only unusually large relative jumps.
    if(this.mode==='locked'&&turn>maxDiscontinuousTurn&&distance>screenSpan()){
      scale*=maxDiscontinuousTurn/turn
      this.record('look-limited',{dx,dy,reason:'単発の大きな視点移動を抑えました。'},true)
    }
    const yaw=yawWithinTurn(view.yaw-dx*scale)
    const pitch=pitchWithinView(view.pitch+(invertY?1:-1)*dy*scale)
    if(!Number.isFinite(yaw)||!Number.isFinite(pitch)){
      this.restoreAngles(view)
      this.fail('視点の計算を復旧しました。')
      return
    }
    view.yaw=this.yaw=yaw
    view.pitch=this.pitch=pitch
  }
  frame(view:Aim,seconds:number){
    if(this.mode==='locked'&&!this.ownsLock()){this.reconcileLock();return false}
    if(!Number.isFinite(view.yaw)||!Number.isFinite(view.pitch)||!Number.isFinite(seconds)){
      this.restoreAngles(view)
      this.fail('前回の正常な視点に戻しました。')
      return false
    }
    if(!this.active)return false
    const dt=Math.min(.1,Math.max(0,seconds))
    view.yaw=this.yaw=yawWithinTurn(view.yaw+(Number(this.keys.has('ArrowLeft'))-Number(this.keys.has('ArrowRight')))*dt*1.65)
    view.pitch=this.pitch=pitchWithinView(view.pitch+(Number(this.keys.has('ArrowUp'))-Number(this.keys.has('ArrowDown')))*dt*1.3)
    this.record('frame',{yaw:this.yaw,pitch:this.pitch,frameMs:Math.round(seconds*10000)/10})
    return true
  }
  fail(error:unknown){
    // Avoid collecting file paths, the current URL or messages from browser extensions.
    const reason=typeof error==='string'?error:'ゲーム処理を中断しました。'
    this.record('recovery',{reason},true)
    if(this.active)this.controls.pause()
    if(this.active)this.stop()
    this.controls.recovery?.('操作を中断しました。「再開」でドラッグ操作に切り替わります。')
  }

  private look(dx:number,dy:number){
    if(!Number.isFinite(dx)||!Number.isFinite(dy)){
      this.fail('ブラウザーから無効な視点移動量が届きました。')
      return
    }
    if(!dx&&!dy)return
    const span=screenSpan()
    if(Math.abs(dx)>span*16||Math.abs(dy)>span*16){
      this.record('discontinuity',{reason:'単一イベントの不連続な移動量を除外しました。'},true)
      return
    }
    this.controls.look(dx,dy)
    this.record('look',{dx,dy,yaw:this.yaw,pitch:this.pitch})
  }
  private change(mode:InputMode){
    this.reset()
    this.mode=mode
    this.record('mode')
  }
  private interrupt(reason:string){
    this.record(reason)
    if(this.active)this.controls.pause()
    if(this.active)this.stop()
    else this.reset()
  }
  private reconcileLock(){
    if(this.ownsLock()){
      if(this.mode==='locked')return
      if(!this.pending){document.exitPointerLock();return}
      this.change('locked')
      this.controls.dragChanged(false)
    }else if(this.mode==='locked'){
      this.interrupt('lock-lost')
      this.controls.recovery?.('マウス固定が解除されました。「再開」でドラッグ操作に切り替わります。')
    }
  }
  private fallback(reason:string){
    if(!this.pending)return
    if(this.ownsLock()){this.reconcileLock();return}
    this.change('drag')
    this.record('fallback',{reason})
    this.controls.dragChanged(true)
  }

  start(forceDrag:boolean){
    if(!forceDrag&&(this.pending||(this.mode==='locked'&&this.ownsLock())))return
    this.stop()
    const ticket=++this.ticket
    this.hasRequestPromise=false
    this.change(forceDrag?'drag':'pending')
    this.canvas.focus({preventScroll:true})
    if(forceDrag){this.controls.dragChanged(true);return}
    if(!this.canvas.requestPointerLock){this.fallback('unsupported');return}
    try {
      const response=this.canvas.requestPointerLock()
      if(response&&typeof response.then==='function'){
        this.hasRequestPromise=true
        void response.then(
          ()=>{if(ticket===this.ticket&&this.ownsLock())this.reconcileLock()},
          ()=>{if(ticket===this.ticket)this.fallback('rejected')}
        )
      }
    }catch{this.fallback('sync-error')}
    window.setTimeout(()=>{if(ticket===this.ticket)this.fallback('timeout')},750)
  }
  stop(){
    this.ticket++
    this.change('paused')
    if(this.ownsLock())document.exitPointerLock()
  }
  reset(){
    this.keys.clear()
    this.dropContact()
    this.mining=false
    this.jumpEdge=false
    this.wheelSum=0
    this.nextWheel=this.lastWheel=-Infinity
  }

  private startView(e:PointerEvent){
    if(!this.active||this.pending)return
    if(this.mode==='locked'&&!this.ownsLock()){this.reconcileLock();return}
    if(e.pointerType!=='mouse')e.preventDefault()
    if(e.button===2){this.controls.place();return}
    if(e.button===1){this.controls.pick?.();return}
    if(e.button!==0||this.contact)return
    if(this.mode==='locked'){
      this.contact={id:e.pointerId,element:this.canvas,role:'mine',x:0,y:0}
      this.mining=true
      this.controls.beginMine()
      return
    }
    this.grab(e,this.canvas,'look')
  }
  private grab(e:PointerEvent,el:HTMLElement,role:Contact['role']){
    this.contact={id:e.pointerId,element:el,role,x:e.clientX,y:e.clientY}
    try{el.setPointerCapture?.(e.pointerId)}catch{this.contact=null;return false}
    return true
  }
  private checkButtons(e:MouseEvent){
    if(this.contact&&Number.isInteger(e.buttons)&&!(e.buttons&1))this.dropContact()
  }
  private movePointer(e:PointerEvent){
    const c=this.contact
    if(!this.drag||!c||c.id!==e.pointerId)return
    this.checkButtons(e)
    if(!this.contact||c.role!=='look')return
    const dx=e.clientX-c.x,dy=e.clientY-c.y
    c.x=e.clientX;c.y=e.clientY
    this.look(dx,dy)
  }
  private dropContact(){
    const c=this.contact
    if(!c)return
    this.contact=null
    if(c.role==='mine')this.mining=false
    try{if(c.element.hasPointerCapture?.(c.id))c.element.releasePointerCapture(c.id)}catch{/* Capture was already released. */}
  }
  private release(e:PointerEvent){
    const c=this.contact
    if(!c||(e.pointerId!==undefined&&e.pointerId!==c.id))return
    if(e.type==='lostpointercapture'&&e.target!==c.element&&c.element.isConnected!==false)return
    if(e.type==='pointerup'&&(Number.isInteger(e.buttons)?!!(e.buttons&1):e.button>0))return
    this.dropContact()
  }
  private wheel(e:WheelEvent){
    if(!this.active)return
    e.preventDefault()
    if(this.pending||e.ctrlKey||e.metaKey)return
    const mode=e.deltaMode,dx=e.deltaX,dy=e.deltaY
    if(!Number.isFinite(dy)||!dy||Math.abs(dx)>Math.abs(dy))return
    const now=performance.now()
    if(now-this.lastWheel>220||Math.sign(dy)!==Math.sign(this.wheelSum))this.wheelSum=0
    this.lastWheel=now
    if(now<this.nextWheel)return
    this.wheelSum+=dy*(mode===1?16:mode===2?Math.max(window.innerHeight||0,100):1)
    if(Math.abs(this.wheelSum)<48)return
    this.controls.cycle(Math.sign(this.wheelSum))
    this.wheelSum=0
    this.nextWheel=now+120
    this.record('wheel-step')
  }

  private keydown(e:KeyboardEvent){
    if(!this.active||e.defaultPrevented)return
    if(e.code==='KeyZ'&&(e.ctrlKey||e.metaKey)&&!e.altKey&&!e.shiftKey){
      e.preventDefault();if(!e.repeat)this.controls.undo?.();return
    }
    if(e.altKey||e.metaKey||(e.ctrlKey&&!e.code.startsWith('Control')&&!this.keys.has('ControlLeft')&&!this.keys.has('ControlRight')))return
    if(movableKeys.has(e.code)){
      e.preventDefault()
      if(!e.repeat&&!this.keys.has(e.code)&&e.code==='Space')this.jumpEdge=true
      if(!e.repeat)this.keys.add(e.code)
      return
    }
    const number=/^Digit([1-9])$/.exec(e.code)
    if(!['Escape','KeyE','KeyF','F3','KeyQ','KeyR','KeyB','KeyG','KeyV','KeyK'].includes(e.code)&&!number)return
    e.preventDefault();if(e.repeat)return
    if(number)this.controls.select(Number(number[1])-1)
    else switch(e.code){
      case 'Escape':this.controls.pause();break
      case 'KeyE':this.controls.inventory();break
      case 'KeyF':this.controls.fly();break
      case 'KeyQ':this.controls.pick?.();break
      case 'KeyR':this.controls.rotate?.();break
      case 'KeyB':this.controls.home?.();break
      case 'KeyG':this.controls.guide?.();break
      case 'KeyV':this.controls.interact?.();break
      case 'KeyK':this.controls.viewMode?.();break
      default:this.controls.debug()
    }
  }
  movement(){
    const k=this.keys,jumpPressed=this.jumpEdge
    this.jumpEdge=false
    return {forward:Number(k.has('KeyW'))-Number(k.has('KeyS')),right:Number(k.has('KeyD'))-Number(k.has('KeyA')),
      jump:k.has('Space'),jumpPressed,sprint:k.has('ShiftLeft')||k.has('ShiftRight'),down:k.has('KeyC')||k.has('ControlLeft')||k.has('ControlRight')}
  }
}
