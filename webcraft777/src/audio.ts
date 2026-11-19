type Sound = 'step'|'tap'|'mine'|'pickup'|'place'|'craft'|'break'
type Environment = 'meadow'|'forest'|'shore'|'cave'
type Grid = {get(x:number,y:number,z:number):number}
type Position = {x:number;y:number;z:number;inWater?:boolean}

const clamp = (v:number) => Math.max(0,Math.min(1,v))
const areas:Environment[] = ['meadow','forest','shore','cave']

/** Sample the blocks themselves so an excavated room and a planted grove sound right too. */
export function classifyEnvironment(world:Grid,position:Position):Environment {
  const x=Math.floor(position.x), y=Math.floor(position.y), z=Math.floor(position.z)
  if(position.inWater) return 'shore'
  let ceilings=0, leaves=0, water=0
  for(const dx of [-3,0,3]) for(const dz of [-3,0,3]) {
    let covered=false, leafy=false, wet=false
    for(let dy=1;dy<=8;dy++){
      const id=world.get(x+dx,y+dy,z+dz)
      if(id===6) leafy=true
      if([2,3,4,8,9,11,14,23].includes(id)) covered=true
    }
    for(let dy=-3;dy<=1;dy++) if(world.get(x+dx,y+dy,z+dz)===13) wet=true
    ceilings+=Number(covered); leaves+=Number(leafy); water+=Number(wet)
  }
  if(ceilings>=5) return 'cave'
  if(water>=2) return 'shore'
  if(leaves>=2) return 'forest'
  return 'meadow'
}

const profiles = {
  earth:   {cut:960, pitch:85, width:1.05},
  stone:   {cut:3200,pitch:181,width:.85},
  wood:    {cut:1540,pitch:118,width:.95},
  sand:    {cut:2400,pitch:72,width:1.30},
  foliage: {cut:3500,pitch:78,width:1.20},
  glass:   {cut:5100,pitch:650,width:.74},
  water:   {cut:1100,pitch:280,width:1.35}
}
function profile(id:number) {
  if(id===4) return profiles.sand
  if(id===6) return profiles.foliage
  if(id===13) return profiles.water
  if([5,7,21,22].includes(id)) return profiles.wood
  if([10,12,23,25,26].includes(id)) return profiles.glass
  if([3,8,9,11,14].includes(id)) return profiles.stone
  return profiles.earth
}

// Original looping sound beds synthesized once per biome.
function ambienceBuffer(c:AudioContext,area:Environment) {
  const rate=16000, duration=8, buffer=c.createBuffer(1,rate*duration,rate)
  const channel=buffer.getChannelData(0)
  let low=0, mid=0
  for(let i=0;i<channel.length;i++){
    const t=i/rate, noise=Math.random()*2-1
    low+=.035*(noise-low); mid+=.16*(noise-mid)
    const cycle=t/duration*Math.PI*2
    const breeze=(.73+.19*Math.sin(cycle)+.08*Math.sin(cycle*3+.7))
    let sample=low*breeze
    if(area==='forest'){
      sample+=mid*breeze*.36
      for(const start of [1.1,1.33,5.4]){
        const a=t-start
        if(a>0 && a<.22) sample+=.073*Math.sin(Math.PI*a/.22)**2*Math.sin(2*Math.PI*(1600*a+1050*a*a))
      }
    }else if(area==='shore'){
      sample=low*.65+mid*(.24+.30*(.5+.5*Math.sin(2*cycle))**3)
    }else if(area==='cave'){
      sample=low*.26+.022*Math.sin(cycle*448)
      for(const start of [1.7,4.8,5.08]){
        const a=t-start
        if(a>0 && a<.34) sample+=.060*Math.min(1,a*200)*Math.exp(-16*a)*Math.sin(2*Math.PI*(835*a-180*a*a))
      }
    }
    channel[i]=sample
  }
  // Crossfade the final samples into the beginning to avoid a discontinuity at the loop seam.
  const fade=160
  for(let i=0;i<fade;i++) {
    const k=i/fade, end=channel.length-fade+i
    channel[end]=channel[end]*(1-k)+channel[0]*k
  }
  return buffer
}

export class Soundscape {
  private ctx?: AudioContext
  private master?: GainNode
  private effects?: GainNode
  private ambient?: GainNode
  private noise?: AudioBuffer
  private vol=.45
  private muted=false
  private effectsLevel=1
  private ambientLevel=.55
  private playing=false
  private activeVoices=new Set<AudioScheduledSourceNode>()
  private ambienceCache=new Map<Environment,AudioBuffer>()
  private layers=new Map<Environment,{gain:GainNode;source:AudioBufferSourceNode}>()
  private area:Environment='meadow'
  private sampleIn=0

  configure(volume:number,muted:boolean,effectsVolume=1,ambientVolume=.55) {
    this.vol=clamp(volume);this.muted=muted;this.effectsLevel=clamp(effectsVolume);this.ambientLevel=clamp(ambientVolume)
    const t=this.ctx?.currentTime ?? 0
    this.master?.gain.setTargetAtTime(muted?0:this.vol*.52,t,.025)
    this.effects?.gain.setTargetAtTime(this.effectsLevel,t,.025)
    this.ambient?.gain.setTargetAtTime(this.playing?this.ambientLevel*.7:0,t,.07)
  }
  unlock(){
    try{
      if(!this.ctx){
        const c=this.ctx=new AudioContext()
        this.master=c.createGain();this.master.connect(c.destination)
        this.effects=c.createGain();this.effects.connect(this.master)
        this.ambient=c.createGain();this.ambient.gain.value=0;this.ambient.connect(this.master)
        this.noise=c.createBuffer(1,Math.ceil(c.sampleRate*.4),c.sampleRate)
        const samples=this.noise.getChannelData(0)
        for(let i=0;i<samples.length;i++) samples[i]=Math.random()*2-1
        this.configure(this.vol,this.muted,this.effectsLevel,this.ambientLevel)
      }
      void this.ctx.resume().catch(()=>{})
    }catch{ /* A missing audio output must not prevent play. */ }
  }
  setPlaying(playing:boolean) {
    this.playing=playing
    this.sampleIn=0
    if(!playing) {
      for(const voice of this.activeVoices){ try{voice.stop()}catch{} }
      this.activeVoices.clear()
      const now=this.ctx?.currentTime ?? 0
      for(const {gain,source} of this.layers.values()){
        gain.gain.cancelScheduledValues(now);gain.gain.setTargetAtTime(0,now,.015)
        source.onended=()=>{source.disconnect();gain.disconnect()}
        source.stop(now+.09)
      }
      this.layers.clear()
    }
    if(this.ctx && this.ambient) this.ambient.gain.setTargetAtTime(playing?this.ambientLevel*.7:0,this.ctx.currentTime,.045)
  }
  environment(world:Grid,position:Position,dt:number) {
    if(!this.playing||this.muted||!this.vol||!this.ambientLevel||this.ctx?.state!=='running'||!this.ambient) return
    this.sampleIn-=dt
    if(this.sampleIn>0) return
    this.sampleIn=.36; this.area=classifyEnvironment(world,position)
    const c=this.ctx, t=c.currentTime
    if(!this.layers.has(this.area)) {
      const source=c.createBufferSource(),gain=c.createGain()
      let buffer=this.ambienceCache.get(this.area)
      if(!buffer){buffer=ambienceBuffer(c,this.area);this.ambienceCache.set(this.area,buffer)}
      source.buffer=buffer;source.loop=true;gain.gain.value=0
      source.connect(gain);gain.connect(this.ambient);source.start()
      this.layers.set(this.area,{source,gain})
    }
    for(const area of areas) this.layers.get(area)?.gain.gain.setTargetAtTime(area===this.area?1:0,t,.32)
  }
  private track(source:AudioScheduledSourceNode,extras:AudioNode[]) {
    this.activeVoices.add(source)
    source.onended=()=>{this.activeVoices.delete(source);source.disconnect();for(const node of extras)node.disconnect()}
  }
  sound(kind:Sound,block=1) {
    const c=this.ctx,b=this.effects
    // Crafting can be heard while the inventory is open. Environment beds are silent in every menu.
    if(!c||!b||this.muted||!this.vol||!this.effectsLevel||c.state!=='running'||(!this.playing && kind!=='craft')) return
    const count=kind==='craft'?3:2
    if(this.activeVoices.size+count>12) return
    const variation=.935+.13*Math.random()
    const tone=(hz:number,after:number,duration:number,level:number,type:OscillatorType,fall=.81)=>{
      const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+after
      o.type=type;o.frequency.setValueAtTime(hz,t);o.frequency.exponentialRampToValueAtTime(hz*fall,t+duration)
      g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(level,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+duration)
      o.connect(g);g.connect(b);this.track(o,[g]);o.start(t);o.stop(t+duration+.01)
    }
    if(kind==='craft'){[440,554.37,740].forEach((n,i)=>tone(n,i*.055,.15,.19,'sine',1));return}
    if(kind==='pickup'){tone(590,0,.09,.105,'sine',1.45);return}
    if(kind==='break'){tone(243*variation,0,.13,.27,'triangle');tone(137,.08,.17,.23,'triangle');return}
    const material=profile(block)
    const duration=(kind==='step'?.095:kind==='tap'?.075:kind==='mine'?.17:.105)*material.width
    const src=c.createBufferSource(),g=c.createGain(),filter=c.createBiquadFilter(),t=c.currentTime
    src.buffer=this.noise!;src.playbackRate.value=variation;filter.type='lowpass';filter.frequency.value=material.cut*variation
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(kind==='step'?.15:kind==='tap'?.15:.30,t+.004)
    g.gain.exponentialRampToValueAtTime(.0001,t+duration)
    src.connect(filter);filter.connect(g);g.connect(b);this.track(src,[filter,g])
    src.start(t,.06*Math.random());src.stop(t+duration)
    tone(material.pitch*variation*(kind==='place'?1.17:1),0,duration,kind==='step'?.13:.21,material===profiles.glass?'sine':'triangle')
  }
}
