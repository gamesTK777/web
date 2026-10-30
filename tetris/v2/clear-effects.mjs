export class ClearEffects {
  constructor(){this.reset();}
  reset(){this.waves=[];this.shards=[];}
  trigger(rows,cells,colors,reduced=false){
    const quad=rows.length>=4,cy=(rows.reduce((a,b)=>a+b,0)/rows.length+.5)*30;
    this.waves.push({rows,cy,quad,age:0,duration:quad?1.45:.85,reduced,color:quad?'#d5ff82':'#64ecff'});
    if(!reduced)for(const cell of cells)for(let i=0;i<(quad?7:4);i++){
      const angle=Math.random()*Math.PI*2,speed=(quad?100:60)+Math.random()*(quad?230:145);
      this.shards.push({x:cell.x*30+15,y:cell.y*30+15,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-65,age:0,life:.45+Math.random()*.65,size:1.5+Math.random()*3,angle,spin:(Math.random()-.5)*12,color:i%3===0?'#fff':colors[cell.t]});
    }
    this.waves=this.waves.slice(-8);this.shards=this.shards.slice(-500);
  }
  draw(ctx,dt){
    this.waves=this.waves.filter(w=>(w.age+=dt)<w.duration);
    this.shards=this.shards.filter(s=>(s.age+=dt)<s.life);
    ctx.save();ctx.globalCompositeOperation='lighter';
    for(const w of this.waves){
      const p=w.age/w.duration,fade=(1-p)**2;
      if(w.reduced){ctx.globalAlpha=fade*.3;ctx.fillStyle=w.color;for(const y of w.rows)ctx.fillRect(0,y*30,300,30);continue;}
      // The cleared row contracts into a hot core while two light fronts race out.
      for(const row of w.rows){
        const y=row*30+15,h=Math.max(1,26*(1-Math.min(1,w.age/.3)));
        const gradient=ctx.createLinearGradient(0,y-25,0,y+25);gradient.addColorStop(0,'transparent');gradient.addColorStop(.5,w.color);gradient.addColorStop(1,'transparent');
        ctx.globalAlpha=fade*.65;ctx.fillStyle=gradient;ctx.fillRect(0,y-25,300,50);
        ctx.globalAlpha=fade;ctx.fillStyle='#fff';ctx.fillRect(0,y-h/2,300,h);
        ctx.shadowColor=w.color;ctx.shadowBlur=16;ctx.lineWidth=2;ctx.strokeStyle=w.color;
        const spread=Math.min(165,w.age*700);for(const x of [150-spread,150+spread]){ctx.beginPath();ctx.moveTo(x,y-16);ctx.lineTo(x,y+16);ctx.stroke();}ctx.shadowBlur=0;
      }
      if(w.quad){
        // Two expanding shock rings, a vertical aurora, and a gold board outline.
        const glow=ctx.createLinearGradient(0,0,300,0);glow.addColorStop(0,'transparent');glow.addColorStop(.4,'#64ecff');glow.addColorStop(.5,'#ffffff');glow.addColorStop(.6,'#d5ff82');glow.addColorStop(1,'transparent');
        ctx.globalAlpha=fade*.18;ctx.fillStyle=glow;ctx.fillRect(0,0,300,600);
        for(let i=0;i<2;i++){const r=Math.max(0,(w.age-i*.13)*370);ctx.globalAlpha=fade*(i?.5:.85);ctx.strokeStyle=i?'#64ecff':w.color;ctx.lineWidth=3*(1-p)+.5;ctx.beginPath();ctx.ellipse(150,w.cy,r,r*.65,0,0,Math.PI*2);ctx.stroke();}
        ctx.globalAlpha=fade*.85;ctx.lineWidth=3;ctx.strokeStyle=w.color;ctx.strokeRect(2,2,296,596);
        // Fine upward streaks give a lift without repeated screen flashes.
        ctx.globalAlpha=fade*.65;ctx.lineWidth=1;for(let i=0;i<14;i++){const x=(i*67)%300,y=w.cy-w.age*(90+i*19);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-12-i*2);ctx.stroke();}
      }
    }
    for(const s of this.shards){
      s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=190*dt;s.angle+=s.spin*dt;
      ctx.globalAlpha=(1-s.age/s.life)**1.5;ctx.strokeStyle=s.color;ctx.lineWidth=s.size*.5;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*.035,s.y-s.vy*.035);ctx.stroke();
      ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.angle);ctx.fillStyle=s.color;ctx.fillRect(-s.size/2,-s.size/2,s.size,s.size);ctx.restore();
    }
    ctx.restore();
  }
}
