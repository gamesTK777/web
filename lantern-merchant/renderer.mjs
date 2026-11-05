/* Original, code-drawn artwork for Lantern & Ledger. No external art assets. */
const C = {
  night:'#071719', deep:'#0b2328', water:'#163b49', ripple:'#2d5960', land:'#304c43',
  grass:'#47604b', grassHi:'#637855', path:'#7c7960', pathHi:'#969078',
  wall:'#36514c', wallTop:'#527065', floor:'#213d39', floorHi:'#2b4942',
  gold:'#edbc68', light:'#ffe0a0', amber:'#cb793c', cream:'#ecdfba',
  wood:'#71574a', woodDark:'#463b35', mint:'#8db9a0', red:'#ba6853'
};
const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
const poly=(c,points,color)=>{c.fillStyle=color;c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();};
const hash=(x,y)=>{let n=(x*374761393+y*668265263)|0;n=(n^(n>>>13))*1274126177;return ((n^(n>>>16))>>>0)/4294967295;};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function glow(c,x,y,r,color='rgba(237,188,104,.20)'){
  const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(237,188,104,0)');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);
}
function label(c,text,x,y,size=10,color='#afc0ac',align='center'){
  c.font=`600 ${size}px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(text,x,y);
}
function stars(c,w,h,time){
  for(let i=0;i<48;i++){
    const x=hash(i,7)*w,y=hash(i,13)*h;
    c.globalAlpha=.15+.2*Math.sin(time/2200+i)**2;rect(c,x,y,hash(i,9)>.8?2:1,1,'#bfd0a7');
  }c.globalAlpha=1;
}
function tree(c,x,y,s=1){
  c.save();c.translate(x,y);c.scale(s,s);
  c.fillStyle='#0b241f66';c.beginPath();c.ellipse(3,5,26,8,0,0,Math.PI*2);c.fill();
  poly(c,[[-7,8],[-3,-26],[5,-28],[8,8],[13,11],[1,8],[-9,11]],'#353e32');
  rect(c,-2,-27,5,34,'#8c7950');rect(c,2,-26,2,33,'#b09b64');rect(c,-4,-16,3,22,'#5b6240');
  poly(c,[[1,-15],[-11,-27],[-9,-29],[4,-20]],'#9c8755');
  const clusters=[[-12,-23,15], [10,-23,17], [-17,-36,14], [2,-39,19], [16,-38,14], [0,-52,13]];
  for(let k=0;k<clusters.length;k++){
    const [xx,yy,r]=clusters[k];
    poly(c,[[xx-r,yy],[xx-r+3,yy-r*.6],[xx-r*.5,yy-r*.8],[xx,yy-r],[xx+r*.7,yy-r*.6],[xx+r,yy-1],[xx+r*.6,yy+r*.5],[xx-r*.4,yy+r*.6]],'#264c40');
    poly(c,[[xx-r+3,yy-2],[xx-r+5,yy-r*.6],[xx,yy-r+2],[xx+r*.6,yy-r*.5],[xx+r-2,yy-2],[xx,yy+r*.3]],k%2?'#577c50':'#466e49');
    for(let i=0;i<10;i++){const px=xx+(hash(i,k)-.5)*r*1.4,py=yy-r*.7+hash(k,i)*r*.85;rect(c,px,py,3+hash(i,k+8)*3,2,i%3===0?'#a0ae6d':i%2?'#73935c':'#668955');}
  }
  rect(c,0,-62,4,2,'#c1c381');c.restore();
}

function lamp(c,x,y,time,scale=1){
  c.save();c.translate(x,y);c.scale(scale,scale);glow(c,0,-24,34,'rgba(242,188,100,.18)');
  rect(c,-2,-28,4,31,'#303e36');rect(c,-5,2,10,3,'#263a32');rect(c,-8,-33,16,3,C.woodDark);
  rect(c,-6,-30,12,14,C.amber);rect(c,-4,-29,8,11,C.gold);rect(c,-2,-27,4,7,C.light);
  rect(c,-8,-18,16,3,C.woodDark);rect(c,-2,-37,4,4,C.gold);
  c.globalAlpha=.4+Math.sin(time/450+x)*.13;rect(c,-3,-27,6,6,'#fff6c6');c.globalAlpha=1;c.restore();
}
function roof(c,x,y,w,h,color,light,trim){
  poly(c,[[x-9,y],[x+w*.5,y-h],[x+w+9,y],[x+w,y+7],[x,y+7]],'#2b3937');
  poly(c,[[x-8,y],[x+w*.5,y-h+1],[x+w+8,y],[x+w,y+5],[x,y+5]],color);
  poly(c,[[x-8,y],[x+w*.5,y-h+1],[x+w*.5,y+4],[x,y+5]],light);
  for(let k=1;k<7;k++){
    let yy=y-h+k*h/7,xx=x+w*.5-(w*.5+9)*k/7,ww=(w+18)*k/7;
    rect(c,xx,yy,ww,1,trim);rect(c,xx+1,yy+1,ww-2,1,'#dfc38a35');
    for(let sx=xx+4+(k%2)*4;sx<xx+ww-2;sx+=10)rect(c,sx,yy+2,1,h/7-2,trim);
  }
  rect(c,x-10,y,w+20,3,trim);rect(c,x-9,y, w+18,1,'#e1c48b');rect(c,x-7,y+4,w+14,3,'#293e35');
  rect(c,x+w*.5-2,y-h,4,h,'#bdad8240');
}

function house(c,x,y,type='cottage',level=1,scale=1){
  c.save();c.translate(x,y);c.scale(scale,scale);
  const workshop=type==='workshop',w=workshop?76:65,h=workshop?47:52;
  c.globalAlpha=.25;poly(c,[[-8,4],[w,6],[w+20,18],[8,18]],'#041511');c.globalAlpha=1;
  rect(c,0,-h,w,h,C.cream);rect(c,w-17,-h,17,h,'#b6b795');rect(c,-3,-5,w+6,9,'#89917a');
  rect(c,5,-h,4,h,'#8f775d');rect(c,w-22,-h,4,h,'#8f775d');
  rect(c,w/2-8,-26,16,27,C.woodDark);rect(c,w/2-5,-23,10,24,C.wood);rect(c,w/2+1,-14,3,3,C.gold);
  rect(c,12,-35,14,17,'#4b6051');rect(c,14,-33,10,13,C.gold);rect(c,18,-33,2,13,'#9e7747');rect(c,14,-27,10,2,'#9e7747');
  if(workshop){
    rect(c,51,-38,16,17,'#3c4c40');rect(c,53,-36,12,13,'#e4944d');rect(c,57,-36,3,13,C.woodDark);
    rect(c,55,-89,12,40,'#787d6c');rect(c,52,-90,17,7,'#adb09a');
    roof(c,0,-h,w,32,'#536776','#6d8387','#425861');
    rect(c,-8,-12,14,16,C.wood);rect(c,-10,-9,18,4,'#a98c65');
    rect(c,w+5,-6,16,11,'#827752');rect(c,w+7,-9,12,4,'#a59868');
  }else{
    roof(c,0,-h,w,35,level>1?'#9b6552':'#aa754d',level>1?'#c38b60':'#c9945b','#725343');
    rect(c,49,-78,10,20,'#ad9b7a');rect(c,47,-80,14,5,'#d1c1a2');
    rect(c,11,-13,15,7,'#537955');rect(c,14,-16,4,5,'#d6be78');rect(c,21,-15,4,5,'#bc7858');
  }
  if(level>1){rect(c,w-14,-35,8,10,C.gold);rect(c,-4,-h-1,w+8,4,C.gold);}
  c.restore();
}
// A 40×48 logical-pixel explorer with a four-direction gait and layered clothing.
function player(c,x,y,size,time=0,motion={}){
  const facing=motion.facing||'down',progress=motion.progress??1,walking=motion.kind==='move'&&progress<1;
  const step=walking?Math.sin(progress*Math.PI*4):0,lift=Math.abs(step),attack=motion.kind==='attack'&&progress<1?Math.sin(progress*Math.PI):0;
  const side=facing==='left'||facing==='right',back=facing==='up';
  c.save();c.translate(Math.round(x),Math.round(y));c.scale(size/40,size/40);
  c.fillStyle='#06121780';c.beginPath();c.ellipse(0,9,13,4,0,0,Math.PI*2);c.fill();
  if(facing==='left')c.scale(-1,1);
  c.translate(side?attack*4:0,Math.round(-lift*1.5));
  // The cloak swings opposite to the legs, with three shaded folds and gilt edging.
  const sway=Math.round(step*2);
  poly(c,[[-10,-17],[8,-18],[13+sway,7],[5,10],[-13+sway,7]],'#14272c');
  poly(c,[[-9,-17],[7,-17],[11+sway,6],[3,8],[-11+sway,6]],'#8d5141');
  poly(c,[[-7,-15],[1,-16],[4+sway,7],[-7+sway,5]],'#bd7550');
  rect(c,-9+sway,5,18,2,'#dab276');
  // Separate legs and shoes visibly alternate during a step.
  const legL=Math.round(step*3),legR=Math.round(-step*3);
  rect(c,-8,1+legL,7,8,'#1a2630');rect(c,2,1+legR,7,8,'#1a2630');
  rect(c,-7,2+legL,5,5,'#5a696d');rect(c,3,2+legR,4,5,'#72807e');
  rect(c,-9,7+legL,8,4,'#292b31');rect(c,2,7+legR,9,4,'#292b31');
  rect(c,-8,8+legL,6,1,'#b69b75');rect(c,3,8+legR,7,1,'#b69b75');
  // Tunic, seams, belt, satchel and metal buckle.
  poly(c,[[-8,-19],[7,-19],[10,1],[-10,1]],'#263d41');
  poly(c,[[-6,-18],[5,-18],[7,0],[-8,0]],back?'#3b6863':'#d1a05c');
  rect(c,-4,-15,4,12,back?'#629183':'#f2cf88');rect(c,3,-15,3,12,back?'#29534f':'#ae793f');
  rect(c,-9,-1,18,3,'#5d4437');rect(c,-1,-1,4,3,'#f3cf74');rect(c,0,0,2,1,'#674b3a');
  if(back){rect(c,-7,-16,14,13,'#563f33');rect(c,-6,-15,12,11,'#b88c52');rect(c,-5,-14,10,4,'#d9b675');rect(c,-1,-13,2,7,'#79613e');rect(c,-4,-3,8,2,'#826544');}
  else{rect(c,4,-13,3,14,'#855d3a');rect(c,3,0,7,5,'#806442');rect(c,4,1,5,2,'#d4ad6b');}
  // Arms swing independently. A small blade rests on the left and lantern on right.
  const armL=Math.round(-step*3),armR=Math.round(step*3);
  rect(c,-12,-15+armL,5,11,'#1b343b');rect(c,-11,-14+armL,3,8,'#609083');
  rect(c,-11,-6+armL,4,4,'#b67e58');rect(c,-10,-6+armL,2,3,'#f1c49a');
  rect(c,8,-15+armR,5,10,'#253d42');rect(c,9,-14+armR,3,7,'#82ab8d');
  rect(c,10,-6+armR,5,4,'#c68c61');rect(c,11,-6+armR,3,2,'#f8d2a6');
  if(attack){c.save();c.translate(-11,-3+armL);c.rotate(-attack*.8);poly(c,[[-2,0],[-2,-15],[0,-20],[2,-15],[2,0]],'#233d43');rect(c,-1,-15,2,15,'#e3f3dc');rect(c,-4,-1,8,3,'#e5b45f');c.restore();}
  else{rect(c,-13,-1+armL,3,8,'#9ba6a0');rect(c,-14,-3+armL,5,2,'#ddb56a');}
  // Neck, hair and rounded hood with readable facial features.
  rect(c,-3,-23,7,5,'#ab7553');rect(c,-2,-23,5,4,'#e8b98a');
  poly(c,[[-11,-26],[-10,-33],[-5,-37],[5,-37],[11,-32],[12,-24],[7,-19],[-7,-19]],'#162c36');
  poly(c,[[-9,-27],[-8,-32],[-4,-35],[5,-35],[9,-31],[10,-25],[5,-21],[-6,-21]],'#386c69');
  poly(c,[[-8,-30],[-4,-34],[5,-34],[7,-31],[-3,-31],[-7,-25]],'#76a69a');
  if(back){rect(c,-4,-30,8,9,'#487c73');rect(c,-2,-34,3,4,'#a4c4a3');rect(c,-3,-23,7,2,'#254c50');}
  else if(side){rect(c,0,-30,9,9,'#c58f65');rect(c,3,-29,7,7,'#f3cfa3');rect(c,9,-26,3,3,'#dba678');rect(c,6,-28,2,3,'#26343b');rect(c,6,-28,1,1,'#f8efe0');rect(c,0,-31,8,3,'#523e34');rect(c,-1,-29,4,5,'#684b37');}
  else{rect(c,-6,-29,13,9,'#c58f65');rect(c,-4,-28,9,8,'#f4cda0');rect(c,-6,-30,13,3,'#604539');rect(c,-6,-28,3,5,'#78533c');rect(c,-3,-26,2,3,'#27333a');rect(c,3,-26,2,3,'#27333a');rect(c,-3,-26,1,1,'#f7e9d0');rect(c,3,-26,1,1,'#f7e9d0');rect(c,-1,-21,4,1,'#a46b51');}
  // Teal scarf and golden clasp.
  rect(c,-8,-20,17,4,'#213c46');rect(c,-7,-19,14,2,'#8dc5b7');rect(c,4,-18,4,7,'#568c83');rect(c,4,-17,3,2,'#d8ca80');
  const lanternY=-1+armR;
  rect(c,14,lanternY-5,2,5,'#263d40');rect(c,12,lanternY-5,6,1,'#d3b277');
  rect(c,11,lanternY,9,10,'#332c28');rect(c,12,lanternY+1,7,7,'#c8873d');rect(c,13,lanternY+2,5,5,'#f6c66b');rect(c,14,lanternY+2,3,4,'#fff3be');
  rect(c,10,lanternY,11,2,'#a77742');rect(c,10,lanternY+9,11,2,'#b18d56');rect(c,12,lanternY+2,1,6,'#79552d');rect(c,18,lanternY+2,1,6,'#79552d');
  c.restore();
}

function monster(c,e,x,y,size,time){
  c.save();c.translate(Math.round(x),Math.round(y));c.scale(size/40,size/40);
  const kind=String(e.kind||'moss'),pulse=Math.sin(time/420+e.x),step=Math.sin(time/180+e.y);
  c.fillStyle='#03141888';c.beginPath();c.ellipse(0,10,15,5,0,0,Math.PI*2);c.fill();
  if(kind==='boss'||kind==='golem'){
    const boss=kind==='boss',base=boss?'#56557f':'#526d71',mid=boss?'#9995b9':'#8ca49e',hi=boss?'#d6cae2':'#c1d1b7';
    c.translate(0,Math.round(pulse));
    // Separate stone feet, knee joints and three-facet shoulders.
    for(const dir of [-1,1]){rect(c,dir<0?-12:4,4,9,9,'#263b46');rect(c,dir<0?-13:4,10,10,4,base);rect(c,dir<0?-12:5,10,8,2,mid);}
    poly(c,[[-14,-14],[-9,-20],[9,-20],[14,-14],[12,7],[-12,7]],'#20353f');
    poly(c,[[-12,-13],[-7,-18],[7,-18],[12,-12],[10,5],[-10,5]],base);
    rect(c,-9,-15,7,16,mid);rect(c,-7,-15,3,11,hi);rect(c,2,-15,7,16,base);rect(c,-9,3,18,3,'#384a59');
    for(const dir of [-1,1]){const xx=dir<0?-20:13,yy=-13+Math.round(pulse*dir);poly(c,[[xx,yy],[xx+6,yy-3],[xx+8,yy+4],[xx+6,yy+19],[xx,yy+18],[xx-2,yy+6]],base);rect(c,xx,yy+1,4,12,mid);rect(c,xx,yy+3,2,8,hi);rect(c,xx-1,yy+17,7,4,'#354553');}
    poly(c,[[-10,-29],[-5,-34],[5,-34],[11,-28],[9,-16],[-9,-16]],'#253946');
    poly(c,[[-8,-28],[-4,-32],[5,-32],[9,-27],[7,-18],[-7,-18]],mid);rect(c,-7,-27,5,3,hi);rect(c,1,-28,5,4,base);
    rect(c,-6,-23,5,3,'#1a3038');rect(c,2,-23,5,3,'#1a3038');rect(c,-5,-23,3,2,'#ffd185');rect(c,3,-23,3,2,'#ffd185');rect(c,-3,-18,7,2,'#5a636b');
    const crystal=boss?'#e5b4fc':'#9bede0';poly(c,[[0,-15],[6,-8],[0,2],[-6,-8]],'#233541');poly(c,[[0,-13],[4,-8],[0,-1],[-4,-8]],crystal);rect(c,-1,-11,2,5,'#fff6d7');
    if(boss){for(const [xx,yy]of [[-15,-24],[14,-24],[0,-39]]){poly(c,[[xx,yy-9],[xx+5,yy],[xx,yy+4],[xx-4,yy]],'#8c80b2');poly(c,[[xx,yy-8],[xx+1,yy+2],[xx-3,yy]],'#f2d6ed');}rect(c,-16,-15,32,2,'#d6b676');}
  }else if(kind==='moth'){
    c.translate(0,Math.round(pulse*3)-4);
    const flap=.55+Math.abs(Math.sin(time/120+e.x))*.45;
    for(const dir of [-1,1]){c.save();c.scale(dir*flap,1);poly(c,[[2,-13],[12,-27],[23,-23],[24,-12],[17,0],[20,9],[9,13],[3,3]],'#342d52');poly(c,[[4,-12],[13,-24],[21,-21],[21,-12],[13,-3],[17,7],[10,10],[5,1]],'#8676ac');poly(c,[[5,-11],[13,-21],[18,-18],[16,-11],[9,-7]],'#c4afd2');rect(c,12,-16,4,4,'#e4c78a');rect(c,13,-15,2,2,'#5b466e');poly(c,[[7,-1],[11,1],[13,7],[8,5]],'#aa97be');c.restore();}
    rect(c,-3,-18,7,20,'#564468');rect(c,-2,-17,4,16,'#c0b8d3');rect(c,-4,-19,8,8,'#a59abd');rect(c,-3,-16,2,3,'#ffe6a1');rect(c,2,-16,2,3,'#ffe6a1');rect(c,-5,-24,2,6,'#d4bdcf');rect(c,5,-24,2,6,'#d4bdcf');rect(c,-7,-26,3,3,'#f5d998');rect(c,5,-26,3,3,'#f5d998');
  }else{
    // A leaf-armoured beetle: six articulated legs, copper eyes and fern-shaped antennae.
    for(const dir of [-1,1])for(let i=0;i<3;i++){const yy=-9+i*7+Math.round(step*(i%2?1:-1));poly(c,[[dir*7,yy],[dir*15,yy-2],[dir*19,yy+3],[dir*17,yy+5],[dir*13,yy+1],[dir*7,yy+3]],'#203f3a');rect(c,dir<0?-17:13,yy,3,3,'#83a06b');}
    poly(c,[[-11,8],[-15,-2],[-13,-14],[-6,-22],[6,-22],[14,-14],[16,-2],[11,9]],'#183b36');
    poly(c,[[-10,6],[-12,-3],[-10,-13],[-5,-19],[5,-19],[11,-12],[13,-2],[9,6]],'#4b7955');
    poly(c,[[-10,-10],[-5,-17],[-1,-17],[-2,3],[-8,4]],'#a0b777');poly(c,[[1,-17],[6,-17],[11,-10],[9,4],[2,3]],'#789a61');
    rect(c,-1,-17,2,23,'#294e3c');for(let i=0;i<4;i++){rect(c,-9+i%2,-12+i*4,6,1,'#567c50');rect(c,3,-11+i*4,6,1,'#a6b87b');}
    rect(c,-8,5,16,7,'#365d43');rect(c,-7,6,5,4,'#e8b870');rect(c,3,6,5,4,'#e8b870');rect(c,-5,7,2,2,'#1c332f');rect(c,4,7,2,2,'#1c332f');
    for(const dir of [-1,1]){rect(c,dir<0?-9:8,-23,2,8,'#73915f');poly(c,[[dir*8,-22],[dir*14,-29],[dir*8,-28],[dir*6,-23]],'#aac580');}
  }
  c.restore();
  if(e.hp<e.maxHp){rect(c,x-size*.35,y-size*1.02,size*.7,5,'#0e1d28');rect(c,x-size*.35+1,y-size*1.02+1,(size*.7-2)*Math.max(0,e.hp/e.maxHp),3,'#eca27c');}
}

/** Draw an original compact pixel icon into an existing 2D context. */
export function drawIcon(c,type,x,y,size=24){
  c.save();c.translate(x,y);c.scale(size/24,size/24);type=String(type||'');
  if(/herb/.test(type)){
    rect(c,-1,-3,3,13,'#71965e');poly(c,[[-1,1],[-9,-1],[-10,-7],[-5,-7],[0,-2]],'#abc07a');poly(c,[[1,-2],[3,-9],[9,-11],[10,-5],[5,-1]],'#769e6a');rect(c,-3,8,7,2,'#496b4e');
  }else if(/bomb/.test(type)){
    poly(c,[[-7,-3],[-3,-7],[5,-7],[9,-2],[9,6],[4,10],[-4,10],[-8,5]],'#536569');rect(c,-4,-4,7,5,'#7b9291');rect(c,-1,-10,5,4,'#8a8062');rect(c,2,-12,5,3,'#d5b46f');rect(c,7,-13,3,3,'#ffe2a0');rect(c,-3,4,6,2,'#35494e');
  }else if(/potion|tonic|heal/.test(type)){
    rect(c,-3,-11,6,4,'#b99563');rect(c,-4,-7,8,4,'#b8c9af');rect(c,-7,-3,14,11,'#bb755f');rect(c,-5,-2,10,8,'#e6a380');rect(c,-3,-1,3,5,'#ffe2b9');rect(c,-5,8,10,2,'#825744');
  }else if(/ration|bread|food/.test(type)){
    poly(c,[[-9,5],[-9,-2],[-5,-7],[6,-7],[10,-2],[9,6]],'#ae7947');rect(c,-7,-5,14,10,'#e0b373');rect(c,-4,-4,2,6,'#fff0b4');rect(c,2,-4,2,6,'#fff0b4');rect(c,-7,5,14,2,'#99633b');
  }else if(/recall|scroll/.test(type)){
    rect(c,-7,-10,14,18,'#dfd5a8');rect(c,-9,-10,4,6,'#bba774');rect(c,5,5,4,6,'#baa777');rect(c,-4,-5,8,2,'#779b87');rect(c,-4,0,6,2,'#779b87');rect(c,-2,4,5,2,'#779b87');
  }else if(/weapon|sword|blade|saber|sabre/.test(type)){
    poly(c,[[5,-11],[10,-11],[10,-6],[-2,6],[-6,2]],'#b5d4ca');poly(c,[[7,-10],[10,-11],[10,-6],[-2,6],[-4,4]],'#6c9692');rect(c,-8,1,11,4,C.gold);rect(c,-7,5,4,6,C.wood);rect(c,-8,10,6,3,C.gold);
  }else if(/coin|gold/.test(type)){
    poly(c,[[-5,-9],[5,-9],[10,-4],[10,5],[5,10],[-5,10],[-10,5],[-10,-4]],'#a7793d');rect(c,-7,-6,14,13,C.gold);rect(c,-4,-4,8,9,'#f5d488');rect(c,-1,-3,3,7,'#b98742');
  }else if(/relic|core|heart|amber/.test(type)){
    poly(c,[[0,-12],[9,-4],[7,7],[0,11],[-7,7],[-9,-4]],'#b78b4b');poly(c,[[0,-10],[6,-3],[0,6],[-6,-3]],'#ffe1a0');poly(c,[[0,6],[6,-3],[5,6],[0,9]],'#dfad57');
  }else if(/crystal|gem|quartz|prism/.test(type)){
    poly(c,[[0,-11],[8,-4],[5,8],[-3,10],[-8,1],[-6,-7]],'#609ca0');poly(c,[[0,-11],[4,-4],[0,5],[-6,-7]],'#b9d7c6');poly(c,[[4,-4],[8,-4],[5,8],[0,5]],'#89bdb4');
  }else if(/wood|timber/.test(type)){
    rect(c,-9,-6,17,13,'#a57b50');rect(c,-8,-4,15,3,'#c09a60');rect(c,-8,3,15,3,'#745743');rect(c,5,-6,5,13,'#dfb57a');rect(c,6,-2,3,5,'#a9804c');
  }else{
    poly(c,[[-10,4],[-8,-5],[-2,-9],[6,-7],[10,1],[5,8],[-5,9]],'#87988b');poly(c,[[-8,-5],[-2,-9],[6,-7],[2,1],[-6,1]],'#b1be9e');rect(c,2,2,5,3,'#536e65');
  }c.restore();
}

function town(c,w,h,state,time,selectedPlot){
  rect(c,0,0,w,h,C.night);stars(c,w,h,time);
  const scale=Math.min(w/940,h/550),ox=(w-1000*scale)/2,oy=(h-590*scale)/2;
  c.save();c.translate(ox,oy);c.scale(scale,scale);
  // River surrounds the inhabited terrace; subtle strips make its surface legible.
  poly(c,[[0,390],[130,300],[220,325],[340,450],[540,410],[670,455],[830,390],[1000,420],[1000,620],[0,620]],'#112f39');
  for(let i=0;i<80;i++){
    let x=hash(i,8)*1000,y=390+hash(i,3)*220;
    c.globalAlpha=.15+hash(i,1)*.15;rect(c,x+Math.sin(time/2000+i)*2,y,8+hash(i,2)*20,2,'#65968c');
  }c.globalAlpha=1;
  poly(c,[[77,185],[147,122],[324,90],[462,120],[550,87],[741,119],[872,167],[918,257],[910,409],[835,464],[686,489],[562,452],[439,476],[292,453],[168,421],[91,340]],'#162f2b');
  poly(c,[[77,171],[147,108],[324,76],[462,106],[550,73],[741,105],[872,153],[918,243],[910,395],[835,450],[686,475],[562,438],[439,462],[292,439],[168,407],[91,326]],'#3a5144');
  poly(c,[[95,176],[154,117],[323,90],[461,120],[551,88],[733,118],[857,164],[904,247],[894,385],[824,434],[686,459],[563,422],[436,447],[301,424],[180,395],[108,320]],'#435c49');
  for(let i=0;i<110;i++){
    let x=120+hash(i,60)*750,y=140+hash(i,42)*240;
    rect(c,x,y,3,4,hash(i,4)>.5?'#587052':'#354e42');
  }
  // Central promenade, with split paths to the four kinds of town activity.
  rect(c,433,155,91,267,'#737761');rect(c,182,270,648,63,'#737761');
  rect(c,441,157,75,265,'#899079');rect(c,184,278,643,47,'#899079');
  for(let row=0;row<26;row++)for(let col=0;col<5;col++){const x=442+col*15+(row%2)*3,y=160+row*10;rect(c,x,y,12,8,hash(row,col)>.5?'#a2a58a':'#929983');rect(c,x,y,12,1,'#bec0a0');rect(c,x+1,y+7,11,1,'#6e7c6b');}
  for(let row=0;row<4;row++)for(let col=0;col<41;col++){const x=186+col*15+(row%2)*3,y=280+row*11;rect(c,x,y,12,9,hash(row+2,col)>.5?'#9fa38a':'#8a947d');rect(c,x,y,12,1,'#b8bca0');rect(c,x,y+8,12,1,'#6d7a67');}
  // A narrow canal and wooden footbridge.
  poly(c,[[115,349],[328,367],[417,417],[424,458],[391,450],[311,398],[132,380]],'#173d46');
  for(let i=0;i<15;i++)rect(c,140+i*13,365+i*.7,8,2,'#42696b');
  c.save();c.translate(321,376);c.rotate(.22);rect(c,-32,-23,64,44,'#5c5141');
  for(let i=-30;i<32;i+=9)rect(c,i,-21,7,40,'#b59b6a');rect(c,-35,-25,70,4,'#d3b67a');rect(c,-35,21,70,4,'#d3b67a');c.restore();
  // The archive and market are permanent landmarks.
  house(c,202,241,'workshop',2,1.35);label(c,'交易所',250,257,12,'#d0d0ae');
  house(c,278,388,'cottage',2,1.0);label(c,'旅人の宿',312,411,11,'#c1c7aa');
  rect(c,143,298,69,35,'#695341');rect(c,139,288,77,13,'#d6bd7f');
  for(let i=0;i<7;i++)rect(c,139+i*11,288,6,13,i%2?'#91a98a':'#e1c789');
  drawIcon(c,'potion',158,316,18);drawIcon(c,'ration',180,316,18);drawIcon(c,'crystal',201,316,18);
  // Curated gardens and small props add the density of a 16-bit town map.
  for(const [gx,gy] of [[376,190],[542,192],[373,344],[547,344]]){
    rect(c,gx,gy,29,35,'#314e3b');rect(c,gx,gy,29,3,'#829170');rect(c,gx,gy+32,29,3,'#a2a581');
    for(let k=0;k<12;k++){const xx=gx+3+hash(k,gx)*23,yy=gy+4+hash(k,gy)*25;rect(c,xx,yy+3,2,4,'#628257');rect(c,xx-1,yy,4,4,k%3?'#d8b17c':'#be8082');rect(c,xx,yy+1,1,1,'#ffdeb1');}
  }
  for(let k=0;k<22;k++){const xx=130+k*12,yy=379+k*.7;rect(c,xx+Math.sin(time/1300+k)*3,yy,6,1,'#7fada26b');}
  for(const [bx,by] of [[237,278],[298,279],[558,278]]){rect(c,bx,by,29,4,'#c8ad7c');rect(c,bx+2,by+4,3,9,'#615941');rect(c,bx+24,by+4,3,9,'#615941');rect(c,bx,by-5,29,3,'#9d875d');}
  // The original ancient gate, where the expedition begins.
  glow(c,478,145,85,'rgba(192,197,123,.13)');
  rect(c,437,107,82,65,'#263d38');rect(c,448,119,60,51,'#122927');
  rect(c,431,103,18,72,'#81917c');rect(c,507,103,18,72,'#627b6c');rect(c,438,91,80,18,'#a6af8b');rect(c,449,82,58,12,'#697f6c');
  rect(c,448,171,63,8,'#aaa98b');rect(c,443,179,72,6,'#7a8973');
  for(let i=0;i<5;i++)rect(c,455+i*11,104,3,5,C.gold);
  poly(c,[[477,112],[486,130],[478,151],[469,131]],'#788e72');poly(c,[[478,119],[482,131],[478,142],[474,131]],'#cdd29b');
  label(c,'翠灯の迷宮',478,64,13,'#d0cda7');
  // Owned parcels are part of the town scene, visibly changing as the estate grows.
  const plots=Array.isArray(state.plots)?state.plots:[];
  for(let i=0;i<12;i++){
    const col=i%3,row=Math.floor(i/3),x=586+col*91,y=178+row*69;
    const owned=i<plots.length,p=plots[i],selected=selectedPlot===i;
    rect(c,x-7,y-29,80,51,owned?'#526a50':'#3d5545');
    if(owned){
      rect(c,x-7,y+20,80,3,selected?C.gold:'#7d8c65');
      if(p?.building)house(c,x+10,y+12,p.building,p.level||1,.65);
      else{
        for(let q=0;q<3;q++)rect(c,x+8+q*19,y-12,12,2,'#7d8e66');
        rect(c,x+32,y-8,3,19,'#c7ad75');rect(c,x+22,y-11,23,12,'#a0ae80');
        label(c,'+',x+33,y-5,12,'#3e5a46');
      }
      if(selected){rect(c,x-7,y-29,80,2,C.gold);rect(c,x-7,y-29,2,51,C.gold);rect(c,x+71,y-29,2,51,C.gold);}
    }else{
      for(let q=0;q<4;q++)rect(c,x+q*22,y+8,3,13,'#728169');rect(c,x,y+11,69,2,'#728169');
      rect(c,x+20,y-9,2,6,'#637d57');rect(c,x+37,y-14,2,5,'#637d57');
    }
  }
  label(c,`あなたの敷地  ${plots.length} / 12`,713,468,12,'#c6c6a6');
  for(const t of [[114,185,1.25],[144,131,.9],[179,105,1],[332,103,.8],[365,145,1.1],[552,125,.7],[849,137,1],[893,214,.85],[899,365,.8],[856,428,.8],[563,414,.8],[194,391,.8],[112,307,.9]])tree(c,...t);
  lamp(c,420,258,time,1);lamp(c,536,258,time,1);lamp(c,413,380,time,1);lamp(c,545,386,time,1);lamp(c,365,298,time,.85);
  // Barrel stacks, flags and tiny flowers ground the pixel scene.
  for(const [x,y] of [[186,245],[182,354],[345,403]]){rect(c,x,y,10,12,'#8e7855');rect(c,x,y+3,10,2,'#c3a974');rect(c,x,y+9,10,2,'#c3a974');}
  for(const [x,y] of [[378,232],[552,350],[171,188],[843,334]]){rect(c,x,y,2,7,'#748b5b');rect(c,x-2,y-2,6,4,'#d7b578');}
  glow(c,493,329,58,'rgba(237,188,104,.17)');player(c,477,321,47,time,{facing:'down'});
  label(c,'帰る場所が、少しずつ大きくなる。',500,546,13,'#80988a');
  c.restore();
}

const PALETTES = [
  {floor:'#334e49',floor2:'#3d5a50',edge:'#182e31',light:'#647868',wall:'#45615a',wallHi:'#7b9380',wallShade:'#2a4242',moss:'#799769',accent:'#cfad67'},
  {floor:'#3d5056',floor2:'#455d61',edge:'#1e303b',light:'#74898b',wall:'#526b72',wallHi:'#95aba9',wallShade:'#2d4550',moss:'#648f83',accent:'#9ccfc4'},
  {floor:'#4e4b54',floor2:'#57535e',edge:'#282635',light:'#89818c',wall:'#685e70',wallHi:'#ab9bb1',wallShade:'#42384e',moss:'#899782',accent:'#b7a4df'},
  {floor:'#535547',floor2:'#60624f',edge:'#2c3029',light:'#929681',wall:'#727365',wallHi:'#b8b59b',wallShade:'#454b43',moss:'#a2ad77',accent:'#e3c788'},
  {floor:'#3c495d',floor2:'#4a566a',edge:'#222838',light:'#7e8fa9',wall:'#596883',wallHi:'#adb8cd',wallShade:'#34405b',moss:'#8d86af',accent:'#e0b3e5'}
];
const tileCache=new Map();
function tileArtwork(c,value,variant,p){
  const size=48,n=(a,b)=>hash(variant+a,b+variant*7);
  rect(c,0,0,size,size,p.edge);
  if(value===0){
    rect(c,0,0,48,46,p.wallShade);
    // Stonework has individual stones, offset grout and bright upper bevels.
    for(let row=0;row<3;row++){
      const yy=2+row*13,shift=row%2?-11:0;
      for(let xx=shift;xx<48;xx+=24){
        const width=23,height=12,col=n(xx,row)>.5?p.wall:p.wallShade;
        rect(c,xx,yy,width,height,col);rect(c,xx+1,yy+1,width-2,2,p.wallHi);
        rect(c,xx+1,yy+3,1,height-5,p.light);rect(c,xx+2,yy+height-2,width-3,1,p.edge);
        for(let i=0;i<5;i++)rect(c,xx+3+n(i+xx,row)*17,yy+4+n(i,row+5)*5,1,1,p.light);
      }
    }
    rect(c,0,40,48,8,p.wallShade);rect(c,0,40,48,2,p.edge);rect(c,0,45,48,3,'#07151999');
    if(variant%3===0){for(let k=0;k<14;k++){const xx=n(k,2)*44,yy=n(k,3)*17;rect(c,xx,yy,3+n(k,4)*4,2,p.moss);if(k%3===0)rect(c,xx+2,yy+2,2,5,p.moss);}}
    if(variant===4||variant===11){rect(c,34,7,1,8,p.edge);rect(c,30,14,5,1,p.edge);rect(c,30,14,1,8,p.edge);rect(c,26,21,5,1,p.edge);}
    return;
  }
  rect(c,1,1,46,46,variant%2?p.floor:p.floor2);
  // Uneven four-slab paving, worn edges and fine mineral flecks.
  const split=20+variant%6;
  for(const [xx,yy,ww,hh]of [[2,2,split-2,20],[split+1,2,46-split,20],[2,24,24,22],[28,24,18,22]]){
    rect(c,xx,yy,ww,hh,n(xx,yy)>.5?p.floor2:p.floor);rect(c,xx,yy,ww,1,p.light);rect(c,xx,yy,1,hh,p.light);rect(c,xx+1,yy+hh-1,ww,1,p.edge);
  }
  rect(c,1,22,46,2,p.edge);rect(c,split,2,1,20,p.edge);rect(c,26,24,2,22,p.edge);
  for(let k=0;k<15;k++){const x=3+n(k,1)*41,y=3+n(k,7)*41;rect(c,x,y,1+(k%5===0?1:0),1,k%2?p.light:p.edge);}
  if(variant%4===0){rect(c,12,6,1,7,p.edge);rect(c,12,12,5,1,p.edge);rect(c,16,12,1,5,p.edge);rect(c,11,6,1,6,p.light);}
  if(variant===7||variant===12){for(let i=0;i<7;i++){const xx=3+n(i,4)*13,yy=32+n(i,8)*13;rect(c,xx,yy,2,4,p.moss);rect(c,xx+1,yy-2,1,3,p.moss);}}
  if(variant===9){c.globalAlpha=.3;poly(c,[[29,28],[42,26],[46,34],[41,43],[28,44],[23,37]],'#7ca6ad');rect(c,29,34,10,1,'#bfddd7');rect(c,33,38,8,1,'#a1c8c9');c.globalAlpha=1;}
  if(value===2){
    rect(c,6,4,36,39,'#14212c');rect(c,5,4,38,3,p.wallHi);rect(c,5,4,3,39,p.wallHi);rect(c,40,4,3,39,p.wallShade);
    for(let i=0;i<6;i++){rect(c,9+i,8+i*5,30-i*2,4,p.wallShade);rect(c,9+i,8+i*5,30-i*2,1,p.wallHi);rect(c,10+i,9+i*5,28-i*2,1,p.wall);}
    rect(c,4,42,40,3,p.accent);rect(c,4,43,40,1,'#f3e2ab');
  }else if(value===3){
    poly(c,[[10,8],[36,8],[44,21],[40,39],[24,46],[8,38],[4,22]],'#203e49');
    poly(c,[[12,10],[34,10],[41,22],[37,36],[24,42],[11,35],[7,22]],'#64b6b0');
    poly(c,[[14,13],[32,13],[37,22],[34,33],[24,38],[14,32],[11,22]],'#2d6d76');
    poly(c,[[24,15],[31,24],[24,34],[17,24]],'#b4edda');poly(c,[[24,19],[28,24],[24,29],[20,24]],'#f1ffe0');
    for(const [x,y]of [[8,7],[38,7],[6,36],[39,36]]){rect(c,x,y,3,6,'#d4be7d');rect(c,x+1,y+1,1,3,'#fff0b6');}
  }
}
function drawTile(c,x,y,size,value,variant,paletteIndex){
  const key=`${paletteIndex}:${value}:${variant}`;let tile=tileCache.get(key);
  if(tile===undefined){
    tile=typeof OffscreenCanvas!=='undefined'?new OffscreenCanvas(48,48):typeof document!=='undefined'?document.createElement('canvas'):null;
    if(tile){tile.width=48;tile.height=48;const tc=tile.getContext('2d');tc.imageSmoothingEnabled=false;tileArtwork(tc,value,variant,PALETTES[paletteIndex]);}
    tileCache.set(key,tile);
  }
  if(tile)c.drawImage(tile,x,y,size,size);
  else{c.save();c.translate(x,y);c.scale(size/48,size/48);tileArtwork(c,value,variant,PALETTES[paletteIndex]);c.restore();}
}
function torch(c,x,y,size,time,paletteIndex){
  c.save();c.translate(x,y);c.scale(size/48,size/48);
  rect(c,-3,-6,6,17,'#1c282d');rect(c,-2,-5,3,13,'#97734a');rect(c,-5,-7,10,4,'#c7a265');
  const sway=Math.sin(time/110+x),flame=paletteIndex===4?'#c9a0f2':'#f7b84d';
  poly(c,[[-4,-6],[-6,-14],[-2,-21],[1+sway,-27],[3,-16],[6,-12],[4,-6]],paletteIndex===4?'#8663b4':'#bd6135');
  poly(c,[[-3,-7],[-3,-15],[1+sway,-21],[2,-13],[4,-10],[2,-6]],flame);rect(c,-1,-13,3,6,'#fff1bf');
  rect(c,-5,8,10,3,'#394a45');c.restore();
}
function minimap(c,w,h,state,cameraX,cameraY,viewCols,viewRows){
  const map=state.map,s=w<550?2.4:3.5,mw=map.width*s,mh=map.height*s,x=w-mw-22,y=23;
  c.fillStyle='#07141be6';c.fillRect(x-9,y-16,mw+18,mh+28);c.strokeStyle='#b8ac785e';c.lineWidth=1;c.strokeRect(x-9.5,y-16.5,mw+19,mh+29);
  label(c,`B${state.floor} · 探索図`,x+mw/2,y-7,8,'#cfcaab');
  for(let yy=0;yy<map.height;yy++)for(let xx=0;xx<map.width;xx++)if(map.seen[yy][xx]){
    const v=map.tiles[yy][xx];if(v===0){if(map.visible[yy][xx])rect(c,x+xx*s,y+yy*s,s,s,'#3e5d5d');}else rect(c,x+xx*s,y+yy*s,s,s,v===3?'#92e2d4':v===2?'#e9bd78':map.visible[yy][xx]?'#849a87':'#3e5856');
  }
  const px=x+(state.player.x+.5)*s,py=y+(state.player.y+.5)*s;rect(c,px-2,py-2,4,4,'#fff2b1');
  c.save();c.beginPath();c.rect(x,y,mw,mh);c.clip();c.strokeStyle='#e9c58070';c.strokeRect(x+cameraX*s,y+cameraY*s,viewCols*s,viewRows*s);c.restore();
}
function drawEffect(c,e,px,py,tile,time){
  const life=clamp((time-e.startedAt)/(e.duration||650),0,1);if(life>=1)return;
  const x=px(e.x)+tile*.5,y=py(e.y)+tile*.55;c.save();c.globalAlpha=1-life;
  if(e.kind==='attack'){
    c.translate(x,y);c.rotate(-.7+life*1.5);poly(c,[[-tile*.4,0],[-tile*.15,-tile*.15],[tile*.45,-tile*.22],[tile*.2,-tile*.03],[-tile*.15,tile*.07]],'#fff2cb');
    poly(c,[[-tile*.3,0],[tile*.42,-tile*.22],[tile*.18,-tile*.04]],'#e5b66b');
  }else if(e.kind==='hurt'){
    for(let i=0;i<8;i++){const a=i*Math.PI/4,r=tile*(.1+life*.5);rect(c,x+Math.cos(a)*r,y+Math.sin(a)*r,3,3,'#ee9779');}
  }else if(e.kind==='pickup'||e.kind==='level'||e.kind==='heal'||e.kind==='stairs'){
    const color=e.kind==='heal'?'#a8e5ab':e.kind==='stairs'?'#b4ccf1':'#ffe6a3';
    for(let i=0;i<10;i++){const a=i*2.4,r=tile*(.15+life*.5);const xx=x+Math.sin(a)*r,yy=y+Math.cos(a)*r-life*tile*.4;rect(c,xx,yy,2,7,color);rect(c,xx-2,yy+2,6,2,color);}
    c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.ellipse(x,y+tile*.25,tile*(.2+life*.5),tile*(.1+life*.2),0,0,Math.PI*2);c.stroke();
  }
  c.restore();
  if(e.text){c.save();c.globalAlpha=1-life;label(c,e.text,x,y-tile*.6-life*tile*.5,Math.max(12,tile*.2),e.kind==='hurt'?'#ffb59d':'#fff2c3');c.restore();}
}
function dungeon(c,w,h,state,time,options){
  rect(c,0,0,w,h,'#09171e');
  const map=state.map,tiles=map.tiles,rows=map.height,cols=map.width,p=state.player;
  const tile=Math.round(clamp(Number(options.zoom)||3,1.5,5)*24),paletteIndex=clamp((state.floor||1)-1,0,4);
  const motion=options.motion||{},duration=motion.duration||190,progress=options.reducedMotion?1:clamp((time-(motion.startedAt??-1000))/duration,0,1);
  const moving=motion.kind==='move'&&progress<1&&motion.from&&motion.to;
  const eased=progress*progress*(3-2*progress);
  const playerWorld=moving?{x:motion.from.x+(motion.to.x-motion.from.x)*eased,y:motion.from.y+(motion.to.y-motion.from.y)*eased}:{...p};
  const viewCols=Math.min(cols,w/tile),viewRows=Math.min(rows,h/tile);
  const cameraX=clamp(playerWorld.x+.5-viewCols/2,0,Math.max(0,cols-viewCols)),cameraY=clamp(playerWorld.y+.5-viewRows/2,0,Math.max(0,rows-viewRows));
  const offsetX=cols*tile<w?(w-cols*tile)/2:0,offsetY=rows*tile<h?(h-rows*tile)/2:0;
  const px=x=>offsetX+(x-cameraX)*tile,py=y=>offsetY+(y-cameraY)*tile;
  const startX=Math.max(0,Math.floor(cameraX)-1),endX=Math.min(cols,Math.ceil(cameraX+viewCols)+1),startY=Math.max(0,Math.floor(cameraY)-1),endY=Math.min(rows,Math.ceil(cameraY+viewRows)+1);
  const visible=(x,y)=>x>=startX&&x<endX&&y>=startY&&y<endY&&map.visible[y]?.[x];
  const torchPoints=[];c.save();c.beginPath();c.rect(0,0,w,h);c.clip();
  for(let y=startY;y<endY;y++)for(let x=startX;x<endX;x++){
    const v=tiles[y][x],seen=map.seen[y][x],vis=map.visible[y][x],xx=px(x),yy=py(y);
    if(!seen){rect(c,xx,yy,tile+1,tile+1,'#0b1b22');continue;}
    const variant=Math.floor(hash(x+state.floor*7,y)*16);
    drawTile(c,xx,yy,tile,v,variant,paletteIndex);
    if(v!==0){
      if(tiles[y-1]?.[x]===0){c.fillStyle='#06151d55';c.fillRect(xx,yy,tile,tile*.16);}
      if(tiles[y]?.[x-1]===0){c.fillStyle='#06151d33';c.fillRect(xx,yy,tile*.1,tile);}
      if(v===3&&vis)glow(c,xx+tile*.5,yy+tile*.5,tile*.8,'rgba(104,220,201,.18)');
      if(vis&&v===1&&variant===15&&tiles[y-1]?.[x]===0){drawIcon(c,'prism',xx+tile*.8,yy+tile*.19,tile*.3);}
    }else if(vis&&tiles[y+1]?.[x]&&((x+2*y)%5===0))torchPoints.push({x:xx+tile*.5,y:yy+tile*.65});
    if(!vis){c.fillStyle='rgba(5,15,23,.67)';c.fillRect(xx,yy,tile+1,tile+1);}
  }
  for(const t of torchPoints){glow(c,t.x,t.y-tile*.3,tile*1.7,paletteIndex===4?'rgba(170,133,232,.16)':'rgba(255,184,91,.15)');torch(c,t.x,t.y,tile,time,paletteIndex);}
  for(const item of state.loot||[])if(visible(item.x,item.y)){
    const x=px(item.x)+tile*.5,y=py(item.y)+tile*.55;
    c.fillStyle='#07171e50';c.beginPath();c.ellipse(x,y+tile*.17,tile*.23,tile*.08,0,0,Math.PI*2);c.fill();
    drawIcon(c,item.id,x,y-Math.sin(time/550+item.x)*1.5,tile*.52);
    const blink=Math.sin(time/450+item.x*2+item.y);if(blink>.65){rect(c,x+tile*.2,y-tile*.27,2,7,'#fff0b3');rect(c,x+tile*.2-2,y-tile*.27+2,6,2,'#fff0b3');}
  }
  const playerScreen={x:px(playerWorld.x)+tile*.5,y:py(playerWorld.y)+tile*.63};
  glow(c,playerScreen.x+tile*.25,playerScreen.y,tile*2.5,'rgba(232,183,95,.15)');
  const actors=(state.enemies||[]).filter(e=>visible(e.x,e.y)&&e.hp>0).map(e=>({y:e.y,enemy:e}));actors.push({y:playerWorld.y,hero:true});actors.sort((a,b)=>a.y-b.y);
  for(const actor of actors){if(actor.hero)player(c,playerScreen.x,playerScreen.y,tile*.78,time,{...motion,progress});else{const e=actor.enemy;monster(c,e,px(e.x)+tile*.5,py(e.y)+tile*.66,tile*(e.kind==='boss'?.98:.78),time);}}
  for(const e of options.effects||[])drawEffect(c,e,px,py,tile,time);
  c.restore();
  const edge=c.createRadialGradient(playerScreen.x,playerScreen.y,Math.min(w,h)*.18,playerScreen.x,playerScreen.y,Math.max(w,h)*.8);edge.addColorStop(0,'rgba(2,10,22,0)');edge.addColorStop(1,'rgba(3,8,22,.34)');c.fillStyle=edge;c.fillRect(0,0,w,h);
  minimap(c,w,h,state,cameraX,cameraY,viewCols,viewRows);
  return{tileSize:tile,offsetX,offsetY,cameraX,cameraY,viewCols,viewRows,playerScreen,playerWorld};
}

/** Responsive high-density original 16-bit scenes. Rendering never mutates game state. */
export function drawScene(canvas,state,options={}){
  const time=options.reducedMotion?0:options.time??(typeof performance!=='undefined'?performance.now():0);
  const w=Math.max(1,Math.round(canvas.clientWidth||960)),h=Math.max(1,Math.round(canvas.clientHeight||540));
  const dpr=Math.min(2,typeof window!=='undefined'?window.devicePixelRatio||1:1);
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  const c=canvas.getContext('2d');if(!c)return null;c.setTransform(dpr,0,0,dpr,0,0);c.imageSmoothingEnabled=false;
  if(state.mode==='dungeon')return dungeon(c,w,h,state,time,options);
  town(c,w,h,state,time,options.selectedPlot??-1);return null;
}
