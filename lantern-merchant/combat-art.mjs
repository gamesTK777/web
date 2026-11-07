// Presentation-only sword choreography; damage and turn timing stay in engine.mjs.
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);
export const ATTACK_DURATION=320;
export function swordPose(progress=0){
  const p=clamp(progress);
  if(p<.22)return{phase:'raise',cut:0,raise:smooth(p/.22),recover:0};
  if(p<.46)return{phase:'cut',cut:((p-.22)/.24)**1.5,raise:1,recover:0};
  if(p<.59)return{phase:'impact',cut:1,raise:1,recover:0};
  return{phase:'recover',cut:1,raise:1,recover:smooth((p-.59)/.41)};
}
const poly=(c,points,color)=>{c.fillStyle=color;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
const circle=(c,x,y,r,color)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();};
const VIEWS={
  down:{shoulder:[.34,.31],mask:[[.26,.27],[.42,.31],[.38,.47],[.37,.60],[.23,.72],[.12,.68],[.21,.46]],raise:[-.10,-.28],hit:[.15,.24],angles:[-2.05,1.18]},
  right:{shoulder:[.43,.32],mask:[[.31,.28],[.50,.30],[.52,.47],[.53,.61],[.43,.77],[.29,.74],[.35,.51]],raise:[-.13,-.27],hit:[.32,.10],angles:[-1.85,.20]},
  left:{shoulder:[.62,.32],mask:[[.52,.29],[.72,.31],[.78,.49],[.77,.62],[.58,.76],[.43,.72],[.59,.51]],raise:[.13,-.27],hit:[-.32,.10],angles:[-1.29,2.94]},
  up:{shoulder:[.22,.34],mask:[[.14,.29],[.30,.32],[.31,.49],[.30,.65],[.15,.78],[.02,.72],[.10,.50]],raise:[-.13,-.29],hit:[-.12,-.04],angles:[-2.05,-1.54]}
};
/** Hide only the resting sword arm and replace it with a jointed moving arm. */
export function drawSwordExplorer(c,image,g,facing,size,progress){
  const v=VIEWS[facing]||VIEWS.down,pose=swordPose(progress),left=-g.width/2,top=-g.height*g.anchor;
  const point=([x,y])=>[left+x*g.width,top+y*g.height],mask=v.mask.map(point),shoulder=point(v.shoulder);
  // Cloth behind the arm closes the small sleeve gap, while the original head,
  // pack, lantern, torso and boots remain in their original image coordinates.
  poly(c,v.mask.filter(([,y])=>y<.54).map(point),'#284e49');
  c.save();c.beginPath();c.rect(left,top,g.width,g.height);
  mask.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.clip('evenodd');
  c.drawImage(image,left,top,g.width,g.height);c.restore();
  const raise=pose.raise,cut=pose.cut,recover=pose.recover;
  const resting=[-.04,.32],held=v.raise,hit=v.hit;
  const offset=[0,1].map(i=>lerp(lerp(resting[i],held[i],raise),hit[i],cut));
  const hand=[shoulder[0]+lerp(offset[0],resting[0],recover*.65)*size,shoulder[1]+lerp(offset[1],resting[1],recover*.65)*size];
  const elbow=[lerp(shoulder[0],hand[0],.52)+(facing==='left'?1:-1)*size*.09,lerp(shoulder[1],hand[1],.52)+size*.035];
  c.save();c.lineCap='round';c.lineJoin='round';
  for(const [a,b,width,color]of [[shoulder,elbow,.17,'#122e32'],[elbow,hand,.135,'#122e32'],[shoulder,elbow,.125,'#386c61'],[elbow,hand,.09,'#e0c394']]){
    c.strokeStyle=color;c.lineWidth=Math.max(1,width*size);c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke();
  }
  const cuffAngle=Math.atan2(hand[1]-elbow[1],hand[0]-elbow[0])+Math.PI/2;
  c.strokeStyle='#d4a75c';c.lineWidth=size*.042;c.beginPath();c.moveTo(elbow[0]-Math.cos(cuffAngle)*size*.065,elbow[1]-Math.sin(cuffAngle)*size*.065);c.lineTo(elbow[0]+Math.cos(cuffAngle)*size*.065,elbow[1]+Math.sin(cuffAngle)*size*.065);c.stroke();
  const angle=lerp(lerp(1.8,v.angles[0],raise),v.angles[1],cut);
  c.translate(...hand);c.rotate(angle+recover*.16);c.globalAlpha*=1-clamp((recover-.65)/.35)*.4;
  // Long blade, two differently lit steel planes, brass guard and wrapped grip.
  poly(c,[[-size*.18,-size*.033],[size*.05,-size*.033],[size*.05,size*.033],[-size*.18,size*.033]],'#5c4034');
  poly(c,[[size*.01,-size*.046],[size*.98,-size*.032],[size*1.12,0],[size*.98,size*.038],[size*.01,size*.046]],'#183a44');
  poly(c,[[size*.06,-size*.032],[size*.97,-size*.020],[size*1.08,0],[size*.08,0]],'#f8ffed');
  poly(c,[[size*.08,0],[size*1.08,0],[size*.97,size*.024],[size*.06,size*.031]],'#89c5c5');
  poly(c,[[-size*.014,-size*.115],[size*.05,-size*.115],[size*.06,size*.115],[-size*.014,size*.115]],'#d6ad65');
  circle(c,-size*.095,0,size*.046,'#e1bc8e');c.restore();
}

export function drawSwordImpact(c,{x,y,size=72,progress=0,facing='down',damage=0,reducedMotion=false}){
  const p=clamp(progress);if(p<.38||p>=1)return;
  const strike=clamp((p-.38)/.10),fade=1-clamp((p-.59)/.41);
  c.save();c.translate(x,y);c.rotate(facing==='left'||facing==='up'?.64:-.64);
  c.globalAlpha=fade;c.lineCap='round';
  const length=size*(.35+.95*strike),width=size*(.035+.06*Math.sin(strike*Math.PI));
  c.strokeStyle='#50bdb8';c.lineWidth=width*2.1;c.beginPath();c.moveTo(-length*.46,-length*.64);c.quadraticCurveTo(-size*.06,size*.02,length*.42,length*.55);c.stroke();
  c.strokeStyle='#fff9d2';c.lineWidth=width;c.beginPath();c.moveTo(-length*.46,-length*.64);c.quadraticCurveTo(-size*.06,size*.02,length*.42,length*.55);c.stroke();
  c.strokeStyle='#fff';c.lineWidth=Math.max(1,width*.25);c.beginPath();c.moveTo(-length*.34,-length*.48);c.lineTo(length*.30,length*.38);c.stroke();
  if(!reducedMotion)for(let i=0;i<10;i++){
    const a=i*2.399,r=size*(.08+clamp((p-.28)/.65)*.60),xx=Math.cos(a)*r,yy=Math.sin(a)*r;
    c.strokeStyle=i%2?'#ffdfa0':'#c9fff0';c.lineWidth=1.5;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+Math.cos(a)*size*.06,yy+Math.sin(a)*size*.06);c.stroke();
  }
  c.restore();
  if(damage){c.save();c.globalAlpha=fade;c.textAlign='center';c.font=`800 ${Math.max(13,size*.24)}px sans-serif`;c.strokeStyle='#17343c';c.lineWidth=3;c.fillStyle='#fff3bf';const yy=y-size*(.46+p*.22);c.strokeText(`−${damage}`,x,yy);c.fillText(`−${damage}`,x,yy);c.restore();}
}
