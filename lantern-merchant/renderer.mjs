import {drawTown} from './town-art.mjs?v=20261125-depths';
import {drawExplorer as pixelPlayer} from './hero-art.mjs?v=20261108-defeat';
import {drawAnimeExplorer,drawAnimeMonster,MONSTER_ART} from './anime-characters.mjs?v=20261108-defeat';
import {drawDungeonTile,drawDungeonLight,drawDungeonMap,drawDungeonPassage,drawDungeonTrap,dungeonLampColor} from './dungeon-art.mjs?v=20261125-expedition';
import {drawSwordImpact,drawUnarmedImpact} from './combat-art.mjs?v=20261108-defeat';
import {drawExtraMonsterFallback} from './monster-art.mjs?v=20261107-enemies15';
import {drawSwarmRoom,drawSwarmSleep,drawSwarmActive} from './swarm-art.mjs?v=20261107-swarm';
/* Original pixel environments with the approved anime character illustrations. */
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
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
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
function player(c,x,y,size,time,motion){
  if(!drawAnimeExplorer(c,x,y,size,time,motion))pixelPlayer(c,x,y,size,time,motion);
}
function monster(c,e,x,y,size,time,options){
  if(drawAnimeMonster(c,e,x,y,size,time,options))return true;
  c.save();c.translate(Math.round(x),Math.round(y));c.scale(size/40,size/40);
  const kind=String(e.kind||'moss'),pulse=options?.reducedMotion?0:Math.sin(time/420+e.x),step=options?.reducedMotion?0:Math.sin(time/180+e.y);
  c.fillStyle='#03141888';c.beginPath();c.ellipse(0,10,15,5,0,0,Math.PI*2);c.fill();
  if(drawExtraMonsterFallback(c,kind,{pulse,step})){
    // Each added species has its own silhouette even before images decode.
  }else if(kind==='boss'||kind==='golem'){
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
    const flap=options?.reducedMotion?1:.55+Math.abs(Math.sin(time/120+e.x))*.45;
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
  if(e.hp<e.maxHp){const headHeight=kind==='boss'?1.5:kind==='knight'?1.35:1.08;rect(c,x-size*.35,y-size*headHeight,size*.7,5,'#0e1d28');rect(c,x-size*.35+1,y-size*headHeight+1,(size*.7-2)*Math.max(0,e.hp/e.maxHp),3,'#eca27c');}
  return false;
}

/** Draw an original compact pixel icon into an existing 2D context. */
export function drawIcon(c,type,x,y,size=24){
  c.save();c.translate(x,y);c.scale(size/24,size/24);type=String(type||'');
  if(type==='sealed-cache'){
    poly(c,[[-11,-7],[6,-7],[10,-3],[10,8],[-10,8],[-11,3]],'#27313c');
    poly(c,[[-10,-6],[5,-6],[9,-2],[-9,-2]],'#be9472');
    rect(c,-9,-1,18,7,'#69493c');rect(c,-8,2,16,1,'#b77d5a');rect(c,-10,5,20,2,'#8e684e');
    rect(c,-7,-5,2,11,'#d1ad78');rect(c,4,-5,2,11,'#d1ad78');
    poly(c,[[0,-2],[4,0],[3,4],[0,6],[-3,4],[-4,0]],'#783a44');
    rect(c,-1,0,3,3,'#d58b8c');rect(c,0,1,1,1,'#ffceb5');
  }else if(type==='tideglass'){
    poly(c,[[0,-12],[8,-8],[10,1],[4,10],[-4,9],[-10,2],[-6,-8]],'#358c97');
    poly(c,[[0,-12],[8,-8],[2,-4],[-5,-7]],'#e6f6d0');
    poly(c,[[-5,-7],[2,-4],[-1,8],[-5,7],[-9,2]],'#8de3d2');
    poly(c,[[2,-4],[8,-8],[10,1],[4,10],[-1,8]],'#5db9d0');
    poly(c,[[2,-4],[10,1],[4,10],[-1,8]],'#a997d1');
    rect(c,-1,-6,2,3,'#e6ffec');rect(c,6,2,1,3,'#d2edf8');
  }else if(/herb/.test(type)){
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

function torch(c,x,y,size,time,paletteIndex){
  c.save();c.translate(x,y);c.scale(size/48,size/48);
  const flame=dungeonLampColor(paletteIndex),sway=Math.sin(time/160+x)*.8;
  glow(c,0,-11,17,`rgba(255,197,126,.28)`);
  rect(c,-7,1,14,3,'#101925a8');
  rect(c,-5,-5,10,8,'#293740');
  rect(c,-3,-6,6,9,'#865f43');
  rect(c,-5,-17,10,13,'#553a31');
  rect(c,-3,-15,6,9,flame);
  poly(c,[[-1,-7],[-2,-11],[sway,-16],[2,-10],[2,-7]],'#fff1cf');
  rect(c,-6,-18,12,2,'#d4ad77');
  rect(c,-6,-6,12,2,'#b88c63');
  rect(c,-1,-22,2,4,'#dcc191');
  c.restore();
}
function returnCheckpoint(c,x,y,size,time){
  const pulse=.72+Math.sin(time/720)*.12,cx=x+size*.5;
  c.save();
  glow(c,cx,y+size*.55,size*.78,`rgba(112,232,211,${pulse*.24})`);
  // A warm stone arch and a mint opening read as a doorway, rather than the
  // downward staircase or the diamond-shaped gate at each floor's entrance.
  c.fillStyle='#102f3a';c.beginPath();c.ellipse(cx,y+size*.77,size*.35,size*.13,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#e9c984';c.lineWidth=Math.max(1.5,size*.035);c.beginPath();c.ellipse(cx,y+size*.77,size*.32,size*.105,0,0,Math.PI*2);c.stroke();
  const light=c.createLinearGradient(cx,y+size*.28,cx,y+size*.78);light.addColorStop(0,'#c7fff0');light.addColorStop(.55,'#63cbbd');light.addColorStop(1,'#326f7888');
  c.beginPath();c.moveTo(x+size*.31,y+size*.76);c.lineTo(x+size*.31,y+size*.44);c.quadraticCurveTo(cx,y+size*.17,x+size*.69,y+size*.44);c.lineTo(x+size*.69,y+size*.76);c.closePath();c.fillStyle=light;c.fill();
  c.strokeStyle='#344955';c.lineWidth=size*.105;c.beginPath();c.moveTo(x+size*.25,y+size*.76);c.lineTo(x+size*.25,y+size*.43);c.quadraticCurveTo(cx,y+size*.03,x+size*.75,y+size*.43);c.lineTo(x+size*.75,y+size*.76);c.stroke();
  c.strokeStyle='#dfbd78';c.lineWidth=size*.047;c.stroke();
  for(const side of [-1,1]){const xx=cx+side*size*.25;rect(c,xx-size*.065,y+size*.72,size*.13,size*.075,'#f4db9a');rect(c,xx-size*.055,y+size*.40,size*.11,size*.045,'#ffe9b5');}
  const shimmer=(time/1700)%1;
  c.globalAlpha=.25+Math.sin(shimmer*Math.PI)*.45;
  rect(c,cx-size*.012,y+size*(.65-shimmer*.25),size*.025,size*.11,'#eaffdf');c.globalAlpha=1;
  rect(c,cx-size*.29,y+size*.82,size*.58,size*.16,'#102e37');
  c.strokeStyle='#e9c984';c.lineWidth=1;c.strokeRect(cx-size*.29,y+size*.82,size*.58,size*.16);
  label(c,'街へ',cx,y+size*.90,Math.max(9,size*.14),'#f9e5ae');
  c.restore();
}
function drawEffect(c,e,px,py,tile,time,unarmed=false){
  const life=clamp((time-e.startedAt)/(e.duration||650),0,1);if(life>=1)return;
  const x=px(e.x)+tile*.5,y=py(e.y)+tile*.55;c.save();c.globalAlpha=1-life;
  if(e.kind==='attack'){
    (unarmed?drawUnarmedImpact:drawSwordImpact)(c,{x,y:y-tile*.22,size:tile,progress:life,facing:e.facing,damage:e.damage,reducedMotion:!!e.reducedMotion});
  }else if(e.kind==='hurt'){
    for(let i=0;i<8;i++){const a=i*Math.PI/4,r=tile*(.1+life*.5);rect(c,x+Math.cos(a)*r,y+Math.sin(a)*r,3,3,'#ee9779');}
  }else if(e.kind==='swarm-start'||e.kind==='swarm-clear'){
    const clear=e.kind==='swarm-clear',color=clear?'#b9e6b9':'#ffc28b';
    c.strokeStyle=color;c.lineWidth=Math.max(2,tile*.035);c.beginPath();c.ellipse(x,y+tile*.18,tile*(.25+life*.85),tile*(.12+life*.40),0,0,Math.PI*2);c.stroke();
    for(let i=0;i<12;i++){
      const angle=i*Math.PI/6,radius=tile*(.25+life*.80),xx=x+Math.cos(angle)*radius,yy=y+Math.sin(angle)*radius*.48-life*tile*.30;
      rect(c,xx,yy,clear?2:3,clear?7:3,color);
      if(clear)rect(c,xx-2,yy+2,6,2,color);
    }
  }else if(e.kind==='survey'||e.kind==='trap'){
    const danger=e.kind==='trap',color=danger?'#efaa80':'#f9dc9e',radius=tile*(.13+life*.55);
    c.strokeStyle=color;c.lineWidth=Math.max(2,tile*.03);c.beginPath();
    c.ellipse(x,y+tile*.03,radius,radius*.49,0,0,Math.PI*2);c.stroke();
    for(let i=0;i<8;i++){
      const angle=i*Math.PI/4,xx=x+Math.cos(angle)*radius,yy=y+Math.sin(angle)*radius*.54;
      rect(c,xx,yy-life*tile*.19,danger?3:2,5,color);
    }
  }else if(e.kind==='pickup'||e.kind==='level'||e.kind==='heal'||e.kind==='stairs'){
    const color=e.kind==='heal'?'#a8e5ab':e.kind==='stairs'?'#b4ccf1':'#ffe6a3';
    for(let i=0;i<10;i++){const a=i*2.4,r=tile*(.15+life*.5);const xx=x+Math.sin(a)*r,yy=y+Math.cos(a)*r-life*tile*.4;rect(c,xx,yy,2,7,color);rect(c,xx-2,yy+2,6,2,color);}
    c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.ellipse(x,y+tile*.25,tile*(.2+life*.5),tile*(.1+life*.2),0,0,Math.PI*2);c.stroke();
  }
  c.restore();
  if(e.text){c.save();c.globalAlpha=1-life;label(c,e.text,x,y-tile*.6-life*tile*.5,Math.max(12,tile*.2),e.kind==='hurt'?'#ffb59d':'#fff2c3');c.restore();}
}
function dungeon(c,w,h,state,time,options){
  rect(c,0,0,w,h,'#080f1c');
  const map=state.map,tiles=map.tiles,rows=map.height,cols=map.width,p=state.player;
  const tile=Math.round(clamp(Number(options.zoom)||3,1.5,5)*24),paletteIndex=clamp(Math.floor(((state.floor||1)-1)/2),0,4);
  const motion=options.motion||{},duration=motion.duration||190,progress=options.reducedMotion?1:clamp((time-(motion.startedAt??-1000))/duration,0,1);
  const moving=motion.kind==='move'&&progress<1&&motion.from&&motion.to;
  const eased=progress*progress*(3-2*progress);
  const playerWorld=moving?{x:motion.from.x+(motion.to.x-motion.from.x)*eased,y:motion.from.y+(motion.to.y-motion.from.y)*eased}:{...p};
  const viewCols=Math.min(cols,w/tile),viewRows=Math.min(rows,h/tile);
  // At playable zoom, let the dark border use up to half the viewport so the
  // entrance rooms stay centered. A zoomed-out overview still fits the map.
  const cameraX=viewCols<cols?playerWorld.x+.5-viewCols*.5:0;
  const cameraY=viewRows<rows?playerWorld.y+.5-viewRows*.5:0;
  const offsetX=cols*tile<w?(w-cols*tile)/2:0,offsetY=rows*tile<h?(h-rows*tile)/2:0;
  const px=x=>offsetX+(x-cameraX)*tile,py=y=>offsetY+(y-cameraY)*tile;
  const startX=Math.max(0,Math.floor(cameraX)-1),endX=Math.min(cols,Math.ceil(cameraX+viewCols)+1),startY=Math.max(0,Math.floor(cameraY)-1),endY=Math.min(rows,Math.ceil(cameraY+viewRows)+1);
  const visible=(x,y)=>x>=startX&&x<endX&&y>=startY&&y<endY&&map.visible[y]?.[x];
  const torchPoints=[],passages=[];
  const playerScreen={x:px(playerWorld.x)+tile*.5,y:py(playerWorld.y)+tile*.63};
  c.save();c.beginPath();c.rect(0,0,w,h);c.clip();
  for(let y=startY;y<endY;y++)for(let x=startX;x<endX;x++){
    const v=tiles[y][x],seen=map.seen[y][x],vis=map.visible[y][x],xx=px(x),yy=py(y);
    if(!seen)continue;
    const variant=Math.floor(hash(x+state.floor*7,y)*12);
    drawDungeonTile(c,map,x,y,xx,yy,tile,variant,paletteIndex);
    if(vis&&v>=2)passages.push({tile:v,x:xx,y:yy});
    if(vis&&v===0&&map.seen[y+1]?.[x]&&tiles[y+1]?.[x]>0&&(x+2*y)%4===0){
      torchPoints.push({x:xx+tile*.5,y:yy+tile*.76});
    }
  }
  drawDungeonLight(c,{startX,startY,endX,endY,visible,px,py,tile,player:playerScreen,lamps:torchPoints,time,theme:paletteIndex,reducedMotion:!!options.reducedMotion});
  drawSwarmRoom(c,map,{visible,px,py,tile,time,reducedMotion:!!options.reducedMotion});
  for(const passage of passages) {
    if(passage.tile===4)returnCheckpoint(c,passage.x,passage.y,tile,time);
    else drawDungeonPassage(c,passage.tile,passage.x,passage.y,tile,time);
  }
  for(const t of torchPoints)torch(c,t.x,t.y,tile,time,paletteIndex);
  for(const trap of map.traps??[])if(visible(trap.x,trap.y))drawDungeonTrap(c,trap,px(trap.x),py(trap.y),tile);
  for(const item of state.loot||[])if(visible(item.x,item.y)){
    const x=px(item.x)+tile*.5,y=py(item.y)+tile*.55;
    c.fillStyle='#07171e50';c.beginPath();c.ellipse(x,y+tile*.17,tile*.23,tile*.08,0,0,Math.PI*2);c.fill();
    drawIcon(c,item.id,x,y-Math.sin(time/550+item.x)*1.5,tile*.52);
    const blink=Math.sin(time/450+item.x*2+item.y);if(blink>.65){rect(c,x+tile*.2,y-tile*.27,2,7,'#fff0b3');rect(c,x+tile*.2-2,y-tile*.27+2,6,2,'#fff0b3');}
  }
  const hits=(options.effects||[]).filter(e=>e.kind==='enemy-hit'&&time>=e.startedAt&&time-e.startedAt<e.duration);
  const ghosts=hits.filter(e=>e.killed&&!state.enemies.some(m=>m.id===e.enemy.id)).map(e=>e.enemy);
  const actors=[...(state.enemies||[]),...ghosts].filter(e=>visible(e.x,e.y)).map(e=>({y:e.y,enemy:e}));actors.push({y:playerWorld.y,hero:true});actors.sort((a,b)=>a.y-b.y);
  const eventMembers=['dormant','active'].includes(map.swarm?.status)?new Set(map.swarm.enemyIds):null;
  for(const actor of actors){if(actor.hero)player(c,playerScreen.x,playerScreen.y,tile*.78,time,{...motion,progress,reducedMotion:!!options.reducedMotion,unarmed:state.weaponId==='unarmed'});else{
    const e=actor.enemy,x=px(e.x)+tile*.5,y=py(e.y)+tile*.66,size=tile*(e.kind==='boss'?.98:.78);
    const hit=hits.findLast(h=>h.enemy.id===e.id),p=hit?clamp((time-hit.startedAt)/hit.duration,0,1):0;
    const recoil=hit&&!options.reducedMotion&&p>.38?Math.sin(clamp((p-.38)/.6)*Math.PI):0;
    const dir=hit?.facing==='left'?[-1,0]:hit?.facing==='right'?[1,0]:hit?.facing==='up'?[0,-1]:[0,1];
    c.save();if(hit){c.translate(dir[0]*tile*.13*recoil,dir[1]*tile*.10*recoil);if(hit.killed)c.globalAlpha=1-clamp((p-.48)/.52);if(p>.41&&p<.62)c.filter='brightness(1.85) saturate(.35)';}
    const illustrated=monster(c,e,x,y,size,time,{reducedMotion:!!options.reducedMotion});
    c.restore();
    if(eventMembers?.has(e.id)){
      const art=MONSTER_ART[e.kind]||{height:1},radius=Math.max(7,tile*.115);
      // Floating illustrations and loading fallbacks put their HP bars at
      // different heights. Keep the entire group badge above either bar.
      const barTop=illustrated?y+size*.25-size*(art.height+(art.float||0)+.025)-8:y-size*(e.kind==='boss'?1.5:e.kind==='knight'?1.35:1.08);
      (map.swarm.status==='active'?drawSwarmActive:drawSwarmSleep)(c,x+size*.34,barTop-radius-4,tile);
    }
  }}
  for(const e of options.effects||[])if(e.kind!=='enemy-hit'&&(!['swarm-start','swarm-clear','attack','survey','trap'].includes(e.kind)||visible(e.x,e.y)))drawEffect(c,e,px,py,tile,options.reducedMotion&&e.kind==='attack'?e.startedAt+e.duration*.48:time,state.weaponId==='unarmed');
  c.restore();
  const edge=c.createRadialGradient(playerScreen.x,playerScreen.y,Math.min(w,h)*.25,playerScreen.x,playerScreen.y,Math.max(w,h)*.8);edge.addColorStop(0,'rgba(2,10,22,0)');edge.addColorStop(1,'rgba(3,8,22,.32)');c.fillStyle=edge;c.fillRect(0,0,w,h);
  if(options.showMap!==false)drawDungeonMap(c,w,state,{cameraX,cameraY,viewCols,viewRows});
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
  return drawTown(c,w,h,state,time,options,(ctx,x,y,size,clock,motion)=>player(ctx,x,y,size,clock,{...motion,reducedMotion:!!options.reducedMotion,unarmed:state.weaponId==='unarmed'}),drawIcon);
}
