export interface Controls {
  pause(): void; inventory(): void; fly(): void; debug(): void; select(index:number): void
  cycle(direction:number): void; place(): void; beginMine():void; look(dx:number,dy:number): void
  dragChanged(drag:boolean): void; background(): void
  pick?(): void; undo?(): void; rotate?(): void; home?(): void; guide?(): void; interact?(): void
}
export class InputController {
  keys = new Set<string>()
  active = false
  mining = false
  drag = true
  private pointer: number|null = null
  private locked = false
  private last = {x:0,y:0}
  private ticket = 0
  private jumpEdge = false
  constructor(private canvas: HTMLCanvasElement, private controls: Controls) {
    document.addEventListener('pointerlockchange', () => {
      const now = document.pointerLockElement===canvas
      const exited = this.locked && !now
      this.locked = now
      if (now && !this.active) { document.exitPointerLock(); return }
      if (now) { this.drag = false; this.controls.dragChanged(false) }
      else if (exited && this.active) this.controls.pause()
    })
    document.addEventListener('pointerlockerror', () => this.fallback())
    document.addEventListener('mousemove', e => {
      if (this.active && !this.drag && document.pointerLockElement===canvas)
        controls.look(e.movementX,e.movementY)
    })
    canvas.addEventListener('contextmenu', e => e.preventDefault())
    canvas.addEventListener('auxclick', e => { if (this.active && e.button===1) e.preventDefault() })
    canvas.addEventListener('pointerdown', e => {
      if (!this.active) return
      e.preventDefault()
      if (e.button===2) { controls.place(); return }
      if (e.button===1) { controls.pick?.(); return }
      if (e.button!==0) return
      if (!this.drag) { this.mining = true; controls.beginMine(); return }
      this.pointer = e.pointerId
      this.last = {x:e.clientX,y:e.clientY}
      canvas.setPointerCapture?.(e.pointerId)
    })
    canvas.addEventListener('pointermove', e => {
      if (!this.active || !this.drag || this.pointer!==e.pointerId) return
      controls.look(e.clientX-this.last.x,e.clientY-this.last.y)
      this.last = {x:e.clientX,y:e.clientY}
    })
    const release = (e:PointerEvent) => {
      if (e.button>0 && e.type==='pointerup') return
      if (this.pointer!==null && e.pointerId!==undefined && e.pointerId!==this.pointer) return
      this.mining=false; this.pointer=null
    }
    window.addEventListener('pointerup',release)
    window.addEventListener('pointercancel',release)
    canvas.addEventListener('lostpointercapture',release)
    canvas.addEventListener('wheel', e => {
      if (!this.active || !e.deltaY) return
      e.preventDefault(); controls.cycle(Math.sign(e.deltaY))
    },{passive:false})
    window.addEventListener('keydown',e=>{
      if (!this.active || e.defaultPrevented) return
      if (e.code==='KeyZ' && (e.ctrlKey||e.metaKey) && !e.altKey && !e.shiftKey) {
        e.preventDefault()
        if (!e.repeat) controls.undo?.()
        return
      }
      if (e.altKey || e.metaKey || (e.ctrlKey && e.code!=='ControlLeft' && e.code!=='ControlRight' && !this.keys.has('ControlLeft') && !this.keys.has('ControlRight'))) return
      if (['KeyW','KeyA','KeyS','KeyD','KeyC','Space','ShiftLeft','ShiftRight','ControlLeft','ControlRight','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) {
        e.preventDefault()
        if (!e.repeat && !this.keys.has(e.code) && e.code==='Space') this.jumpEdge=true
        if (!e.repeat) this.keys.add(e.code)
        return
      }
      const number = /^Digit([1-9])$/.exec(e.code)
      if (!['Escape','KeyE','KeyF','F3','KeyQ','KeyR','KeyB','KeyG','KeyV'].includes(e.code) && !number) return
      e.preventDefault()
      if (e.repeat) return
      if (number) controls.select(Number(number[1])-1)
      else if (e.code==='Escape') controls.pause()
      else if (e.code==='KeyE') controls.inventory()
      else if (e.code==='KeyF') controls.fly()
      else if (e.code==='KeyQ') controls.pick?.()
      else if (e.code==='KeyR') controls.rotate?.()
      else if (e.code==='KeyB') controls.home?.()
      else if (e.code==='KeyG') controls.guide?.()
      else if (e.code==='KeyV') controls.interact?.()
      else controls.debug()
    })
    window.addEventListener('keyup',e=>this.keys.delete(e.code))
    window.addEventListener('blur',()=>{ if(this.active) controls.pause(); this.reset() })
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden){ if(this.active) controls.pause(); this.reset(); controls.background() }
    })
  }
  private fallback() {
    if(!this.active || document.pointerLockElement===this.canvas) return
    this.drag = true; this.controls.dragChanged(true)
  }
  start(forceDrag:boolean) {
    this.reset()
    this.active=true
    this.drag=true
    const ticket = ++this.ticket
    this.canvas.focus({preventScroll:true})
    if(forceDrag || !this.canvas.requestPointerLock){ this.fallback(); return }
    try {
      const result = this.canvas.requestPointerLock()
      if(result && typeof result.catch === 'function') result.catch(()=>{ if(ticket===this.ticket)this.fallback() })
    } catch { this.fallback() }
    window.setTimeout(()=>{ if(ticket===this.ticket && !this.locked)this.fallback() },700)
  }
  reset() { this.keys.clear(); this.mining=false; this.pointer=null; this.jumpEdge=false }
  stop() {
    this.active=false; this.ticket++; this.reset()
    if(document.pointerLockElement===this.canvas) document.exitPointerLock()
  }
  movement() {
    const k = this.keys
    const jumpPressed=this.jumpEdge
    this.jumpEdge=false
    return {forward:Number(k.has('KeyW'))-Number(k.has('KeyS')),right:Number(k.has('KeyD'))-Number(k.has('KeyA')),
      jump:k.has('Space'),jumpPressed,sprint:k.has('ShiftLeft')||k.has('ShiftRight'),down:k.has('KeyC')||k.has('ControlLeft')||k.has('ControlRight')}
  }
}
