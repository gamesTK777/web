/* Original pixel artwork. One logical pixel throughout every frame and direction.
 * The cache contains transparent, unscaled 64 × 72 frames, never game state. */
const P = Object.freeze({
  ink:'#172c35', deep:'#213e43', tealD:'#285c5a', teal:'#40877a', tealM:'#68a993', tealL:'#add0ad',
  clothD:'#98643c', cloth:'#c99451', clothM:'#e7bc75', clothL:'#ffe0a0',
  leatherD:'#463b36', leather:'#76503a', leatherM:'#aa7850', leatherL:'#d5aa70',
  skinD:'#a76d50', skin:'#db9d73', skinL:'#ffd2a1', hairD:'#403632', hair:'#70503b', hairL:'#a37649',
  metal:'#80a6a4', metalL:'#dcebd0', goldD:'#a16d36', gold:'#e3b867', goldL:'#fff0b5',
  bootD:'#25333c', boot:'#495357', bootL:'#8b8770'
});
const cache = new Map();
const R=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
// Scanline polygons keep diagonals on the same pixel grid as rectangular detail.
function S(c,points,color){
  const min=Math.floor(Math.min(...points.map(p=>p[1]))),max=Math.ceil(Math.max(...points.map(p=>p[1])));
  c.fillStyle=color;
  for(let y=min;y<max;y++){
    const scan=y+.5,intersections=[];
    for(let i=0,j=points.length-1;i<points.length;j=i++){
      const a=points[j],b=points[i];
      if((a[1]<=scan&&b[1]>scan)||(b[1]<=scan&&a[1]>scan))intersections.push(a[0]+(scan-a[1])*(b[0]-a[0])/(b[1]-a[1]));
    }
    intersections.sort((a,b)=>a-b);
    for(let i=0;i+1<intersections.length;i+=2){const x=Math.ceil(intersections[i]-.5),end=Math.ceil(intersections[i+1]-.5);c.fillRect(x,y,end-x,1);}
  }
}
function boot(c,x,y,front=true){
  R(c,x,y,7,8,P.bootD);R(c,x+1,y,5,5,P.boot);R(c,x+1,y+1,2,3,P.bootL);
  R(c,x-1,y+6,9,4,P.ink);R(c,x,y+6,7,2,front?P.leatherM:P.leather);R(c,x,y+9,8,1,P.leatherD);
  R(c,x+1,y+6,4,1,P.leatherL);R(c,x+1,y+2,5,1,P.leatherD);
}
function lantern(c,x,y,bright){
  // Iron arch, beveled brass lid, three glass planes, a tiny wick.
  R(c,x+3,y-5,5,1,P.ink);R(c,x+2,y-4,1,5,P.gold);R(c,x+7,y-4,1,5,P.goldD);
  S(c,[[x+1,y],[x+3,y-2],[x+7,y-2],[x+9,y],[x+10,y+2],[x,y+2]],P.ink);
  R(c,x+1,y,8,2,P.gold);R(c,x+2,y,5,1,P.goldL);R(c,x+1,y+2,8,9,P.goldD);
  R(c,x+2,y+3,6,7,'#e9a24b');R(c,x+3,y+3,4,6,bright?'#fff4bf':'#ffdb8a');
  R(c,x+4,y+4,2,4,'#fff9d7');R(c,x+2,y+3,1,7,P.goldL);R(c,x+7,y+3,1,7,P.leatherM);
  R(c,x,y+10,10,2,P.ink);R(c,x+1,y+10,8,1,P.gold);R(c,x+2,y+12,6,1,P.leatherD);
}
function sword(c,x,y,attack,direction){
  if(attack){
    const sign=direction==='left'?-1:1,reach=[0,8,14,5][attack-1]||0;
    S(c,[[x,y],[x+sign*(8+reach),y-17],[x+sign*(11+reach),y-18],[x+sign*(9+reach),y-13],[x+sign*3,y+2]],P.ink);
    S(c,[[x+sign,y-1],[x+sign*(9+reach),y-16],[x+sign*(9+reach),y-13],[x+sign*3,y]],P.metalL);
    R(c,x-4,y,9,2,P.gold);R(c,x-1,y+2,3,5,P.leatherM);R(c,x-2,y+6,5,2,P.goldD);
  }else{
    S(c,[[x-2,y],[x+2,y],[x+1,y+12],[x-1,y+15],[x-3,y+12]],P.ink);
    R(c,x-1,y+2,2,10,P.metal);R(c,x-1,y+2,1,10,P.metalL);R(c,x-4,y,7,2,P.gold);
    R(c,x-2,y-5,3,5,P.leather);R(c,x-2,y-5,2,1,P.gold);
  }
}
function bag(c,x,y,back=false){
  S(c,[[x+2,y],[x+11,y],[x+14,y+3],[x+14,y+13],[x+11,y+16],[x+1,y+15],[x-1,y+11],[x-1,y+3]],P.leatherD);
  R(c,x,y+3,12,10,P.leather);R(c,x+1,y+3,9,9,P.leatherM);R(c,x+2,y+4,2,7,P.leatherL);
  R(c,x,y+1,12,5,P.leatherM);R(c,x+1,y+1,10,2,P.leatherL);R(c,x+1,y+5,11,1,P.leatherD);
  R(c,x+5,y+4,3,7,P.leatherD);R(c,x+5,y+5,3,3,P.gold);R(c,x+6,y+6,1,1,P.leather);
  R(c,x+2,y+12,9,1,P.leatherL);R(c,x+1,y+14,10,1,P.leather);
  if(back){R(c,x-2,y+5,2,7,P.leatherM);R(c,x+12,y+5,3,8,P.leather);R(c,x+13,y+6,1,5,P.leatherL);}
}
function hood(c,back=false,blink=false){
  S(c,[[-11,-28],[-10,-37],[-6,-42],[3,-43],[9,-39],[12,-31],[10,-24],[4,-20],[-6,-21]],P.ink);
  S(c,[[-9,-29],[-8,-36],[-5,-40],[3,-41],[8,-37],[10,-30],[8,-25],[3,-22],[-5,-23]],P.tealD);
  S(c,[[-9,-30],[-7,-36],[-4,-40],[3,-40],[7,-37],[0,-37],[-5,-33],[-6,-28]],P.tealM);
  R(c,-4,-40,6,1,P.tealL);R(c,-7,-36,2,3,P.tealL);R(c,-8,-32,1,3,P.tealM);
  if(back){
    S(c,[[-5,-36],[0,-38],[6,-35],[8,-28],[3,-24],[-4,-25],[-6,-30]],P.teal);
    S(c,[[-5,-35],[-1,-37],[2,-35],[0,-26],[-4,-27]],P.tealM);
    R(c,2,-37,1,12,P.tealD);R(c,2,-26,4,1,P.tealM);R(c,-3,-25,7,1,P.tealD);
    R(c,-2,-23,5,2,P.hairD);R(c,-1,-23,3,1,P.hair);
  }else{
    S(c,[[-7,-33],[-3,-36],[5,-35],[8,-31],[7,-24],[3,-21],[-4,-23],[-7,-27]],P.hairD);
    R(c,-5,-32,11,8,P.skin);R(c,-4,-32,8,8,P.skinL);R(c,-3,-24,7,2,P.skin);R(c,5,-30,2,5,P.skinD);
    R(c,-6,-35,11,3,P.hair);R(c,-5,-35,6,1,P.hairL);R(c,-6,-32,3,5,P.hair);R(c,3,-33,3,2,P.hairD);
    R(c,-4,-29,2,blink?1:3,P.ink);R(c,3,-29,2,blink?1:3,P.ink);
    if(!blink){R(c,-4,-29,1,1,'#fff2d3');R(c,3,-29,1,1,'#fff2d3');}
    R(c,0,-27,2,2,P.skin);R(c,0,-23,3,1,P.skinD);R(c,-5,-25,2,1,'#e8ad83');
  }
}
function frontBack(c,direction,step,bob,sway,blink,attack,bright,unarmed=false){
  const back=direction==='up',legL=Math.round(step*3),legR=-legL,armL=-Math.round(step*2),armR=Math.round(step*2);
  // Grounded boots stay below the torso's breathing offset.
  boot(c,-8,2+legL,!back);boot(c,2,2+legR,!back);
  c.save();c.translate(0,bob);
  S(c,[[-10,-22],[8,-22],[12+sway,5],[7+sway,8],[-4,7],[-13+sway,5]],P.ink);
  S(c,[[-9,-21],[7,-21],[10+sway,4],[5+sway,6],[-3,5],[-11+sway,4]],P.tealD);
  S(c,[[-8,-20],[-3,-22],[0,4],[-8+sway,5]],P.teal);
  R(c,-10+sway,4,7,1,P.gold);R(c,3+sway,5,7,1,P.goldD);R(c,-8,-18,2,14,P.tealM);
  // Visible far equipment makes silhouettes different from all four directions.
  if(!unarmed)sword(c,-12,-2+armL,attack,direction);
  S(c,[[-8,-23],[7,-23],[10,-16],[9,0],[-9,0],[-10,-15]],P.ink);
  S(c,[[-6,-21],[5,-21],[7,-15],[7,-1],[-7,-1],[-7,-15]],back?P.teal:P.cloth);
  S(c,[[-6,-20],[-2,-20],[-1,-2],[-7,-2]],back?P.tealM:P.clothM);
  R(c,-5,-18,2,10,back?P.tealL:P.clothL);R(c,4,-18,3,16,back?P.tealD:P.clothD);
  R(c,-7,-1,15,3,P.leatherD);R(c,-6,-1,13,1,P.leatherM);R(c,-1,-1,4,3,P.gold);R(c,0,0,2,1,P.leatherD);
  // Sleeves, cuffs and fingers read clearly at the overview's smallest size.
  R(c,-12,-18+armL,5,10,P.ink);R(c,-11,-17+armL,4,7,P.teal);R(c,-11,-17+armL,2,5,P.tealM);
  R(c,-11,-10+armL,4,2,P.clothM);R(c,-11,-8+armL,4,4,P.skin);R(c,-10,-8+armL,2,3,P.skinL);
  if(unarmed&&attack){const reach=[0,3,7,2][attack-1]||0,dy=back?-reach:reach;R(c,-11,-8,4,Math.abs(dy)+4,P.skin);R(c,-12,-7+dy,6,5,P.skin);R(c,-11,-7+dy,4,2,P.skinL);}
  R(c,8,-18+armR,5,10,P.ink);R(c,9,-17+armR,3,7,P.tealD);R(c,9,-17+armR,1,6,P.tealM);
  R(c,9,-10+armR,4,2,P.cloth);R(c,10,-8+armR,4,4,P.skinD);R(c,10,-8+armR,2,3,P.skinL);
  if(back){
    R(c,-7,-18,2,13,P.leatherD);R(c,5,-18,2,13,P.leatherD);bag(c,-6,-17,true);
    // Rolled bed linen over the pack, with leather securing straps.
    R(c,-8,-21,16,5,P.ink);R(c,-7,-21,14,3,'#b3b29a');R(c,-6,-21,11,1,'#e7d7ac');
    R(c,-4,-21,2,4,P.leather);R(c,4,-21,2,4,P.leather);R(c,7,-20,2,2,'#7d9084');
  }else{
    S(c,[[-6,-21],[-3,-21],[7,-1],[4,1]],P.leatherD);S(c,[[-5,-21],[-3,-21],[6,-1],[5,0]],P.leatherM);
    R(c,-2,-15,2,2,P.gold);bag(c,2,-1,false);
  }
  R(c,-3,-25,6,4,P.skinD);R(c,-2,-25,4,4,P.skin);
  hood(c,back,blink);
  // A cream-lined collar separates the face from the dark cloak.
  S(c,[[-9,-23],[-5,-21],[4,-21],[9,-23],[8,-19],[2,-18],[-6,-19]],P.ink);
  R(c,-7,-21,13,2,P.tealM);R(c,-5,-21,8,1,P.tealL);R(c,5,-20,3,6,P.tealD);
  R(c,5,-19,3,2,P.gold);R(c,6,-19,1,1,P.goldL);
  lantern(c,12,-3+armR,bright);c.restore();
}
function profile(c,direction,step,bob,sway,blink,attack,bright,unarmed=false){
  const left=direction==='left',d=left?-1:1,leg=Math.round(step*4),arm=-Math.round(step*3);
  // Profiles are drawn independently of final-canvas mirroring: highlights stay upper-left.
  boot(c,-5-leg,2,false);boot(c,-3+leg,3,true);
  c.save();c.translate(0,bob);
  S(c,[[-d*6,-24],[-d*12,-19],[-d*(14+sway),5],[-d*5,8],[d*6,3],[d*5,-17]],P.ink);
  S(c,[[-d*6,-22],[-d*10,-18],[-d*(12+sway),4],[-d*5,6],[d*3,2],[d*3,-17]],P.tealD);
  S(c,[[-d*7,-21],[-d*9,-16],[-d*(10+sway),3],[-d*5,4],[-d*3,-16]],left?P.tealD:P.teal);
  R(c,-8,-17,2,15,P.tealM);R(c,-d*(10+sway),4,6,1,P.goldD);
  if(!unarmed)sword(c,-d*11,-3+arm,attack,direction);
  S(c,[[-7,-23],[5,-23],[9,-17],[7,1],[-7,1],[-9,-15]],P.ink);
  R(c,-5,-21,10,20,P.cloth);R(c,-4,-20,4,15,P.clothM);R(c,-4,-19,2,10,P.clothL);R(c,4,-17,3,17,P.clothD);
  R(c,-7,0,14,3,P.leatherD);R(c,-6,0,11,1,P.leatherM);R(c,left?-6:4,0,3,3,P.gold);
  if(left){bag(c,1,-14,true);}else{bag(c,-11,-14,true);}
  // Near shoulder and swinging forearm cross the bag strap.
  R(c,-3,-20+arm,7,12,P.ink);R(c,-2,-19+arm,5,9,P.teal);R(c,-2,-19+arm,2,7,P.tealM);
  R(c,-1,-10+arm,5,2,P.clothM);R(c,-1,-8+arm,5,4,P.skin);R(c,-1,-8+arm,3,3,P.skinL);
  if(unarmed&&attack){const reach=[0,4,8,3][attack-1]||0;R(c,Math.min(0,d*reach),-8,Math.abs(reach)+4,4,P.skin);R(c,d*reach-1,-9,6,5,P.skin);R(c,d*reach,-9,4,2,P.skinL);}
  S(c,[[-9,-29],[-9,-37],[-5,-42],[3,-43],[8,-39],[11,-32],[9,-24],[3,-21],[-6,-23]],P.ink);
  S(c,[[-7,-30],[-7,-36],[-4,-40],[3,-41],[7,-37],[9,-31],[7,-25],[2,-23],[-5,-25]],P.tealD);
  S(c,[[-7,-31],[-5,-37],[-2,-40],[3,-40],[5,-38],[-1,-36],[-4,-29]],P.tealM);
  R(c,-3,-40,5,1,P.tealL);R(c,-6,-35,1,4,P.tealL);
  const faceX=left?-9:0;
  S(c,[[faceX,-34],[faceX+8,-34],[faceX+10,-30],[faceX+9,-24],[faceX+5,-22],[faceX,-24]],P.hairD);
  R(c,faceX+1,-32,8,8,P.skin);R(c,faceX+1,-31,6,6,P.skinL);
  R(c,faceX+(left?-2:8),-28,3,3,P.skin);R(c,faceX+(left?-2:9),-28,2,1,P.skinL);
  R(c,faceX,-34,8,3,P.hair);R(c,faceX+1,-34,5,1,P.hairL);R(c,faceX+(left?6:0),-32,3,6,P.hairD);
  const eye=faceX+(left?1:6);R(c,eye,-29,2,blink?1:3,P.ink);if(!blink)R(c,eye,-29,1,1,'#fff2d3');
  R(c,faceX+3,-24,4,1,P.skinD);R(c,left?1:-2,-24,4,3,P.skinD);
  R(c,-6,-22,13,4,P.ink);R(c,-5,-21,11,2,P.tealM);R(c,-5,-21,6,1,P.tealL);
  R(c,-d*6,-19,4,6,P.tealD);R(c,left?-5:5,-20,3,2,P.gold);
  lantern(c,d*6-3,-3+arm,bright);c.restore();
}
function frameArtwork(c,direction,kind,frame,unarmed=false){
  const walk=kind==='walk',step=walk?[0,.7,1,.7,0,-.7,-1,-.7][frame]:0;
  const bob=walk?(frame%4===2?-1:0):kind==='idle'&&(frame===1||frame===2)?-1:0;
  const sway=walk?Math.round(step*2):kind==='idle'&&frame===2?1:0;
  const blink=kind==='idle'&&frame===3,attack=kind==='attack'?frame+1:0,bright=frame%2===0;
  c.save();c.translate(32,49);
  if(direction==='left'||direction==='right')profile(c,direction,step,bob,sway,blink,attack,bright,unarmed);
  else frontBack(c,direction,step,bob,sway,blink,attack,bright,unarmed);
  c.restore();
}
function sprite(direction,kind,frame,unarmed=false){
  const key=`${direction}:${kind}:${frame}:${unarmed?'unarmed':'armed'}`;if(cache.has(key))return cache.get(key);
  const canvas=typeof OffscreenCanvas!=='undefined'?new OffscreenCanvas(64,72):typeof document!=='undefined'?document.createElement('canvas'):null;
  if(!canvas)return null;canvas.width=64;canvas.height=72;
  const c=canvas.getContext('2d');if(!c)return null;c.imageSmoothingEnabled=false;frameArtwork(c,direction,kind,frame,unarmed);cache.set(key,canvas);return canvas;
}

/** Same ground anchor as the original renderer: boots end approximately y + 12.
 * No mutations to motion/state and no canvas reads or per-frame sprite generation. */
export function drawExplorer(c,x,y,size=40,time=0,motion={}){
  const facing=['up','down','left','right'].includes(motion.facing)?motion.facing:'down';
  const progress=Math.max(0,Math.min(1,motion.progress??1));
  const walking=motion.kind==='move'&&progress<1,attacking=motion.kind==='attack'&&progress<1;
  const kind=walking?'walk':attacking?'attack':'idle';
  const cycle=((time%6000)+6000)%6000;
  const frame=walking?Math.min(7,Math.floor(progress*8)):attacking?Math.min(3,Math.floor(progress*4)):cycle>5770?3:Math.floor(cycle/900)%3;
  const scale=size/40,px=Math.round(x),py=Math.round(y),unarmed=!!motion.unarmed,art=sprite(facing,kind,frame,unarmed);
  c.save();c.imageSmoothingEnabled=false;
  // A short lower-right cast shadow shares the town's upper-left light direction.
  c.fillStyle='#142a3266';c.beginPath();c.ellipse(px+4*scale,py+11*scale,14*scale,4*scale,.12,0,Math.PI*2);c.fill();
  c.fillStyle='#0b1b3545';c.beginPath();c.ellipse(px,py+10*scale,8*scale,2.5*scale,0,0,Math.PI*2);c.fill();
  if(art)c.drawImage(art,Math.round(px-32*scale),Math.round(py-49*scale),64*scale,72*scale);
  else{c.translate(px-32*scale,py-49*scale);c.scale(scale,scale);frameArtwork(c,facing,kind,frame,unarmed);}
  c.restore();
}
