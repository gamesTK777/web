type Sound = 'step'|'mine'|'place'|'craft'|'break'
export class Soundscape {
  private ctx?: AudioContext
  private bus?: GainNode
  private noise?: AudioBuffer
  private vol=.45
  private muted=false
  configure(volume:number,muted:boolean) {
    this.vol=volume; this.muted=muted
    if(this.ctx && this.bus) this.bus.gain.setTargetAtTime(muted?0:volume*.37,this.ctx.currentTime,.02)
  }
  unlock() {
    try {
      if(!this.ctx){
        this.ctx=new AudioContext()
        this.bus=this.ctx.createGain(); this.bus.connect(this.ctx.destination)
        this.noise=this.ctx.createBuffer(1,Math.ceil(this.ctx.sampleRate*.3),this.ctx.sampleRate)
        const values=this.noise.getChannelData(0)
        for(let i=0;i<values.length;i++) values[i]=Math.random()*2-1
        this.configure(this.vol,this.muted)
      }
      void this.ctx.resume().catch(()=>{})
    } catch { /* Graphics and input remain available on devices without an audio output. */ }
  }
  sound(kind:Sound,block=1) {
    const c=this.ctx,b=this.bus
    if(!c || !b || this.muted || !this.vol || c.state!=='running') return
    const tone = (hz:number,after:number,duration:number,level:number,type:OscillatorType) => {
      const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+after
      o.type=type; o.frequency.setValueAtTime(hz,t); o.frequency.exponentialRampToValueAtTime(hz*.81,t+duration)
      g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(level,t+.009);g.gain.exponentialRampToValueAtTime(.001,t+duration)
      o.connect(g); g.connect(b); o.start(t); o.stop(t+duration+.01); o.onended=()=>{o.disconnect();g.disconnect()}
    }
    if(kind==='craft'){ [440,554.37,740].forEach((n,i)=>tone(n,i*.065,.15,.3,'sine')); return }
    if(kind==='break'){tone(243,0,.13,.4,'triangle');tone(137,.09,.18,.4,'triangle');return}
    const woody=[5,6,7].includes(block),stone=[3,8,9,11,14].includes(block)
    const duration=kind==='step'?.085:kind==='mine'?.19:.105
    const src=c.createBufferSource(),g=c.createGain(),filter=c.createBiquadFilter(),t=c.currentTime
    src.buffer=this.noise!;filter.type='lowpass';filter.frequency.value=stone?2700:woody?1400:950
    g.gain.setValueAtTime(kind==='step'?.14:.32,t);g.gain.exponentialRampToValueAtTime(.001,t+duration)
    src.connect(filter);filter.connect(g);g.connect(b);src.start(t);src.stop(t+duration)
    src.onended=()=>{src.disconnect();filter.disconnect();g.disconnect()}
    tone(kind==='place'?171:stone?190:woody?121:86,0,duration,.25,'triangle')
  }
}
