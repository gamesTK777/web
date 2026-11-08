// Original procedural score and small feedback sounds; no external audio files.
export class CommandAudio {
  constructor() { this.context=null; this.enabled=true; this.running=false; this.timer=null; this.nodes=new Set(); this.step=0; this.next=0; }
  unlock() {
    try {
      const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;
      if(!Audio)return false;
      this.context ||= new Audio();
      if(this.context.state==='suspended')void this.context.resume();
      return true;
    } catch { return false; }
  }
  tone(note,time,duration=.2,volume=.04,type='sine') {
    const ctx=this.context;if(!ctx||!this.enabled)return;
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type=type;osc.frequency.value=440*2**((note-69)/12);
    gain.gain.setValueAtTime(.0001,time);gain.gain.exponentialRampToValueAtTime(volume,time+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,time+duration);
    osc.connect(gain).connect(ctx.destination);this.nodes.add(osc);
    osc.onended=()=>{this.nodes.delete(osc);osc.disconnect();gain.disconnect();};
    osc.start(time);osc.stop(time+duration+.02);
  }
  drum(time,accent=false) {
    const ctx=this.context;if(!ctx||!this.enabled)return;
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.frequency.setValueAtTime(accent?110:260,time);osc.frequency.exponentialRampToValueAtTime(45,time+.1);
    gain.gain.setValueAtTime(accent?.035:.012,time);gain.gain.exponentialRampToValueAtTime(.0001,time+.11);
    osc.connect(gain).connect(ctx.destination);this.nodes.add(osc);osc.onended=()=>{this.nodes.delete(osc);osc.disconnect();gain.disconnect();};osc.start(time);osc.stop(time+.13);
  }
  schedule() {
    if(!this.running||!this.enabled||!this.context)return;
    const ctx=this.context,beat=60/96/2;
    while(this.next<ctx.currentTime+.22){
      const s=this.step%64,bar=Math.floor(s/8),root=[48,48,53,53,50,50,55,55][bar],within=s%8;
      if(within===0){for(const interval of [0,7,14])this.tone(root+12+interval,this.next,1.7,.009,'triangle');}
      if(within%2===0)this.tone(root+(within===4?7:0),this.next,.24,.028,'sine');
      const melody=[12,19,16,24,19,16,14,19];
      if(within!==3&&within!==7)this.tone(root+melody[(within+bar)%8]+12,this.next,.2,.013,'triangle');
      this.drum(this.next,within===0||within===4);this.next+=beat;this.step++;
    }
  }
  start(){if(!this.enabled||this.running||!this.unlock())return;this.running=true;this.step=0;this.next=this.context.currentTime+.06;this.schedule();this.timer=setInterval(()=>this.schedule(),90);}
  pause(){this.running=false;clearInterval(this.timer);this.timer=null;for(const node of this.nodes){try{node.stop();}catch{}}this.nodes.clear();}
  setEnabled(value){this.enabled=!!value;if(!this.enabled)this.pause();else this.unlock();}
  sfx(type){
    if(!this.enabled||!this.unlock())return;const t=this.context.currentTime;
    const notes={select:[72],move:[60,67],attack:[45,40],capture:[67,72,76,79],produce:[60,64,67],turn:[67,72],victory:[60,64,67,72,76],defeat:[60,57,53],error:[48,47],save:[72,79]};
    (notes[type]||notes.select).forEach((n,i)=>this.tone(n,t+i*.075,type==='attack'?.14:.17,type==='attack'?.045:.035,type==='attack'?'sawtooth':'triangle'));
  }
}
