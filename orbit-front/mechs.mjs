// All four hulls are drawn on the same 52-pixel grid. The nose points north.
const schemes = {
  blue: { ink:'#112432', dark:'#254754', steel:'#567788', light:'#a4c4ce', rim:'#dbe9e6',
    paint:'#188b91', bright:'#68ede0', glass:'#325265', glare:'#c6fff5', badge:'#7bffde' },
  red: { ink:'#302533', dark:'#544154', steel:'#806369', light:'#c6a9a0', rim:'#f1dbb8',
    paint:'#a6493f', bright:'#ff9a68', glass:'#594356', glare:'#fff1a6', badge:'#ffd278' }
};
const names={scout:'ピケット',line:'リベット',heavy:'バサルト',carrier:'キャラベル'};
export const mechName = kind => names[kind] || kind;
const cache = new Map();
function shape(c, fill, points){
  c.fillStyle=fill; c.beginPath(); c.moveTo(points[0],points[1]);
  for(let n=2;n<points.length;n+=2)c.lineTo(points[n],points[n+1]);
  c.closePath(); c.fill();
}
function rect(c,fill,x,y,w,h){c.fillStyle=fill;c.fillRect(x,y,w,h)}
function bevel(c,p,outline,inside,cap){
  shape(c,p.ink,outline);shape(c,p.steel,inside);
  if(cap)shape(c,p.light,cap);
}
function paintBadge(c,p,side,x,y){
  if(side==='red'){
    shape(c,p.badge,[x,y-3,x+3,y+2,x+1,y+2,x,y,x-1,y+2,x-3,y+2]);
  }else{
    shape(c,p.badge,[x,y-3,x+3,y,x,y+3,x-3,y]);rect(c,p.paint,x-1,y-1,2,2);
  }
}
function cabin(c,p,x,y){
  shape(c,p.ink,[x-5,y+4,x-5,y-3,x-2,y-6,x+3,y-6,x+5,y-3,x+5,y+3,x+2,y+5]);
  shape(c,p.light,[x-4,y,x-4,y-3,x-2,y-5,x+2,y-5,x+4,y-2,x+3,y+2,x,y+3]);
  rect(c,p.glass,x-4,y-2,8,3);rect(c,p.bright,x-3,y-2,5,1);rect(c,p.glare,x-3,y-2,2,1);
  rect(c,p.steel,x-1,y+2,3,2);
}
function double(c,fn){fn();c.save();c.scale(-1,1);fn();c.restore()}
function scout(c,p,side,gait){
  // High hip, thin staggered lower limbs and two swept-back propulsion pods.
  for(const sign of [-1,1]){
    c.save();c.scale(sign,1);const a=gait*sign;
    shape(c,p.ink,[2,2,8,3,9,9+a,8,13+a,12,20+a,11,23+a,7,21+a,5,15+a,3,12]);
    shape(c,p.steel,[4,4,7,5,7,10+a,6,13+a,10,20+a,8,19+a,5,14+a]);
    rect(c,p.rim,5,9+a,3,2);rect(c,p.paint,7,17+a,2,4);
    bevel(c,p,[6,-8,11,-6,14,0,18,13,17,15,13,14,7,5,4,-2],[7,-6,10,-5,13,1,16,11,13,9,7,2],[7,-6,10,-5,14,4,12,4,8,0]);
    shape(c,p.paint,[11,0,13,1,16,9,14,8]);rect(c,p.bright,14,10,2,2);
    c.restore();
  }
  bevel(c,p,[-7,-6,-3,-11,4,-11,8,-6,6,4,1,9,-5,6],[-5,-6,-2,-9,3,-9,6,-5,4,3,0,6,-4,4],[-5,-6,0,-9,1,-3,-2,0,-5,-1]);
  paintBadge(c,p,side,0,4);cabin(c,p,0,-8);
}
function line(c,p,side,gait){
  for(const sign of [-1,1]){
    c.save();c.scale(sign,1);const a=gait*sign;
    bevel(c,p,[2,4,9,4,11,9+a,9,14+a,12,16+a,11,19+a,4,18+a,3,12+a],[4,6,8,6,9,9+a,7,14+a,9,16+a,5,16+a],[4,6,8,6,8,9+a,5,11+a]);
    bevel(c,p,[6,-10,12,-12,16,-9,16,-3,19,0,18,7,14,9,9,6,9,2,6,-1],[7,-8,12,-10,14,-8,14,-3,17,0,16,5,12,6,10,2],[7,-8,12,-10,14,-8,13,-5,7,-4]);
    rect(c,p.paint,11,-1,5,4);rect(c,p.bright,11,-1,5,1);rect(c,p.steel,13,5,3,2);
    c.restore();
  }
  bevel(c,p,[-8,-8,-4,-12,5,-12,9,-8,8,1,5,7,-5,7,-8,2],[-6,-7,-3,-10,4,-10,7,-6,6,0,3,5,-3,5,-6,1],[-6,-7,-1,-10,0,-4,-4,-1,-6,-2]);
  shape(c,p.paint,[-5,-1,0,1,5,-1,4,3,0,5,-4,3]);paintBadge(c,p,side,0,1);
  cabin(c,p,0,-9);
}
function heavy(c,p,side,gait){
  for(const sign of [-1,1]){
    c.save();c.scale(sign,1);
    for(const end of [-1,1]){
      const v=gait*sign*end;
      c.save();c.scale(1,end);
      bevel(c,p,[4,0,10,1,15,6,18,11+v,18,16+v,12,15+v,10,10,5,8],[6,2,10,3,14,7,16,12+v,16,14+v,13,13+v,12,9,6,6],[6,2,10,3,14,7,12,8,8,5]);
      rect(c,p.paint,13,10+v,3,4);rect(c,p.rim,14,10+v,2,1);c.restore();
    }
    c.restore();
  }
  bevel(c,p,[-10,-6,-6,-11,6,-10,11,-5,11,5,6,10,-8,8,-11,3],[-8,-5,-5,-9,5,-8,9,-4,8,4,5,8,-6,6,-9,2],[-8,-5,-4,-9,4,-8,3,-4,-3,-2,-8,0]);
  rect(c,p.dark,-6,0,5,5);rect(c,p.light,-6,0,5,1);rect(c,p.steel,-6,3,5,1);paintBadge(c,p,side,-5,-4);
  cabin(c,p,-3,-4);
}
function carrier(c,p,side){
  // A broad double-hangar silhouette, with a recessed bay at the stern.
  double(c,()=>{
    bevel(c,p,[6,-11,12,-14,19,-12,21,-6,21,10,18,18,11,19,8,15,8,6,4,4],[8,-9,13,-12,17,-10,19,-5,19,9,16,16,12,17,10,14,10,5,7,3],[9,-8,13,-11,17,-9,18,-5,18,0,11,-3]);
    rect(c,p.dark,12,2,7,11);rect(c,p.ink,13,4,5,8);
    for(let y=5;y<13;y+=3)rect(c,p.steel,13,y,5,1);
    rect(c,p.paint,16,-8,2,8);rect(c,p.bright,16,-8,2,2);
    rect(c,'#ffd089',13,14,4,2);
  });
  bevel(c,p,[-9,7,-8,-13,-4,-19,1,-22,6,-16,9,-9,8,10,4,14,-4,14],[-7,6,-6,-12,-3,-17,1,-19,4,-15,7,-8,6,9,3,12,-3,12],[-6,-9,-4,-14,0,-18,1,-11,-2,-6]);
  rect(c,p.dark,-4,-5,8,9);rect(c,p.glass,-3,-5,6,3);rect(c,p.glare,-3,-5,5,1);
  paintBadge(c,p,side,0,7);
}
function turret(c,p,kind,recoil=0){
  c.translate(0,recoil);
  if(kind==='heavy'){
    shape(c,p.ink,[0,2,0,-9,3,-12,3,-22,5,-24,9,-24,11,-21,10,-10,12,-7,11,3,8,7,4,7]);
    shape(c,p.steel,[2,1,2,-8,5,-11,5,-20,9,-21,8,-9,10,-6,9,2,7,5,4,4]);
    rect(c,p.light,4,-20,2,11);rect(c,p.dark,8,-19,2,10);rect(c,p.rim,4,-22,6,2);rect(c,p.glass,5,-22,3,1);
    rect(c,p.paint,3,-6,6,4);rect(c,p.bright,3,-6,4,1);rect(c,p.rim,3,0,2,3);
  }else if(kind==='carrier'){
    shape(c,p.ink,[-4,0,-4,-6,-3,-8,-3,-16,0,-16,0,-9,2,-9,2,-16,5,-16,5,-5,6,-3,4,1]);
    rect(c,p.light,-3,-15,2,8);rect(c,p.light,2,-15,2,8);
    rect(c,p.steel,-2,-7,6,6);rect(c,p.rim,-2,-6,5,1);
  }else{
    const x=kind==='line'?10:6,y=kind==='line'?-19:-17;
    rect(c,p.ink,x-2,y,5,16);rect(c,p.steel,x-1,y+1,3,10);rect(c,p.rim,x-1,y+1,1,8);rect(c,p.paint,x-2,y+10,5,3);
  }
}
const painters={scout,line,heavy,carrier};
function sprite(kind,side,phase,layer){
  const key=[kind,side,phase,layer].join('-');
  if(cache.has(key))return cache.get(key);
  const node=document.createElement('canvas');node.width=node.height=56;
  const c=node.getContext('2d');c.translate(28,28);
  if(layer==='hull')painters[kind](c,schemes[side],side,phase);
  else turret(c,schemes[side],kind);
  cache.set(key,node);return node;
}
export function drawMech(ctx,kind,side,x,y,size,opts={}){
  if(!painters[kind]||!schemes[side])return;
  const heading=opts.heading??-Math.PI/2;
  const turn=opts.turretHeading??heading;
  const phase=opts.step?Math.round(1.6*Math.sin(opts.step)):0;
  ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(size/51,size/51);
  ctx.imageSmoothingEnabled=false;
  if(opts.shadow!==false){ctx.fillStyle='rgba(5,12,23,.48)';ctx.beginPath();ctx.ellipse(3,7,kind==='carrier'?21:16,kind==='carrier'?13:9,0,0,2*Math.PI);ctx.fill()}
  ctx.save();ctx.rotate(heading+Math.PI/2);
  if(opts.boost>0){
    const len=7+Math.round(11*opts.boost);
    for(const i of [-1,1]){
      const a=i*(kind==='carrier'?14:7);
      shape(ctx,'#3b9bc0',[a-3,9,a+3,10,a+2,15,a,15+len,a-2,16]);
      shape(ctx,'#c7ffec',[a-2,10,a+2,10,a,17+len*.4]);
    }
  }
  ctx.drawImage(sprite(kind,side,phase,'hull'),-28,-28);ctx.restore();
  ctx.rotate(turn+Math.PI/2);
  const rec=opts.recoil||0;
  ctx.drawImage(sprite(kind,side,0,'turret'),-28,-28+Math.round(3*rec));
  if(opts.charge>0){
    const tx=kind==='heavy'?7:kind==='line'?10:kind==='scout'?6:1,ty=kind==='heavy'?-23:-17;
    const r=1+Math.round(opts.charge*3);rect(ctx,'#ffba67',tx-r,ty-1,2*r+1,3);rect(ctx,'#fff5bd',tx-1,ty-r,3,r*2+1);
  }
  ctx.restore();
}
