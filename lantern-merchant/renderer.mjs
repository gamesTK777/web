import {drawTown} from './town-art.mjs?v=20261106-art';
import {drawExplorer as pixelPlayer} from './hero-art.mjs?v=20261106-art';
import {drawAnimeExplorer,drawAnimeMonster} from './anime-characters.mjs?v=20261107-enemies15';
import {drawExtraMonsterFallback} from './monster-art.mjs?v=20261107-enemies15';
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
function player(c,x,y,size,time,motion){
  if(!drawAnimeExplorer(c,x,y,size,time,motion))pixelPlayer(c,x,y,size,time,motion);
}
function monster(c,e,x,y,size,time,options){
  if(drawAnimeMonster(c,e,x,y,size,time,options))return;
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
  for(const actor of actors){if(actor.hero)player(c,playerScreen.x,playerScreen.y,tile*.78,time,{...motion,progress,reducedMotion:!!options.reducedMotion});else{const e=actor.enemy;monster(c,e,px(e.x)+tile*.5,py(e.y)+tile*.66,tile*(e.kind==='boss'?.98:.78),time,{reducedMotion:!!options.reducedMotion});}}
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
  return drawTown(c,w,h,state,time,options,(ctx,x,y,size,clock,motion)=>player(ctx,x,y,size,clock,{...motion,reducedMotion:!!options.reducedMotion}),drawIcon);
}
