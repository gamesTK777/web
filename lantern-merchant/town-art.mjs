/* Anime scenery uses the existing logical island and interaction geometry.
 * Painted image layers and smooth fallbacks share the same ground contact points. */
import {drawEnvironmentSprite,drawEnvironmentTexture,getEnvironmentRevision} from './anime-environment.mjs?v=20261108-anime10';
export const TOWN_SIZE = Object.freeze({width:1040,height:640});
export const TOWN_SPAWN = Object.freeze({x:467,y:352});
export const TOWN_LANDMARKS = Object.freeze([
  {id:'trade',name:'交易所',bounds:{x:163,y:139,width:180,height:165},entry:{x:245,y:307},foot:286},
  {id:'inn',name:'旅人の宿',bounds:{x:206,y:334,width:166,height:151},entry:{x:278,y:486},foot:466},
  {id:'dungeon',name:'翠灯の迷宮',bounds:{x:417,y:77,width:120,height:145},entry:{x:477,y:226},foot:204}
]);
const P = {ink:'#142b30',deep:'#10353f',sea:'#194b55',shallow:'#306c70',foam:'#8db4a4',grass:'#547251',moss:'#77905b',grassDark:'#375941',grassLight:'#94a271',dirt:'#817b58',stone:'#9ca68b',stoneLight:'#c3c5a3',wood:'#805d42',woodDark:'#463b32',gold:'#e8ba69',cream:'#e6d4a5',light:'#ffe8ac'};
const ISLAND=[[85,245],[105,164],[178,119],[296,105],[354,130],[405,87],[486,73],[548,109],[680,100],[832,124],[922,182],[949,277],[942,433],[893,519],[786,554],[676,543],[585,564],[471,538],[363,556],[263,525],[161,486],[95,415],[75,328]];
const TREES=[[112,228,0,1.05],[145,162,1,.95],[189,132,2,.8],[325,144,0,.9],[367,176,1,.95],[397,121,2,.75],[566,159,0,.83],[596,127,2,.82],[706,133,1,.8],[805,156,0,.9],[888,213,1,1.0],[925,330,2,.78],[931,432,0,.6],[911,478,1,.5],[580,541,2,.5],[547,479,1,.88],[150,438,0,.9],[117,362,1,.86],[178,394,2,.7],[377,498,0,.76]];
const LAMPS=[[409,288],[538,288],[408,412],[538,412],[585,336],[892,336],[582,503]];
const r=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));};
const poly=(c,points,col)=>{c.fillStyle=col;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(Math.round(x),Math.round(y)):c.moveTo(Math.round(x),Math.round(y)));c.closePath();c.fill();};
const line=(c,points,col,width=1)=>{c.strokeStyle=col;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();};
const hash=(x,y)=>{let n=(x*374761393+y*668265263)|0;n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const inside=(x,y,points=ISLAND)=>{let hit=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const [a,b]=points[i],[d,e]=points[j];if(((b>y)!==(e>y))&&x<(d-a)*(y-b)/(e-b)+a)hit=!hit;}return hit;};
function path(c,points){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();}
function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function light(c,x,y,rx,ry,alpha=.2){c.save();c.translate(x,y);c.scale(1,ry/rx);const g=c.createRadialGradient(0,0,0,0,0,rx);g.addColorStop(0,`rgba(255,202,116,${alpha})`);g.addColorStop(.35,`rgba(245,170,78,${alpha*.45})`);g.addColorStop(1,'rgba(245,170,78,0)');c.fillStyle=g;c.fillRect(-rx,-rx,rx*2,rx*2);c.restore();}
function makeCanvas(w,h){const cv=typeof OffscreenCanvas!=='undefined'?new OffscreenCanvas(w,h):typeof document!=='undefined'?document.createElement('canvas'):null;if(cv){cv.width=w;cv.height=h;}return cv;}
const sprites=new Map();
function sprite(key,w,h,paint){let cv=sprites.get(key);if(!cv){cv=makeCanvas(w,h);if(cv){const ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';paint(ctx);sprites.set(key,cv);}}return cv;}
function spriteAt(c,key,w,h,x,y,paint,scale=1){
  const id=key.startsWith('tree:')?'tree':key.startsWith('parcel:')?key.split(':')[1]:key;
  if(drawEnvironmentSprite(c,id,{x,y,width:w*scale,height:h*scale}))return;
  const cv=sprite(key,w,h,paint);if(cv)c.drawImage(cv,x,y,w*scale,h*scale);else{c.save();c.translate(x,y);c.scale(scale,scale);paint(c);c.restore();}
}
export function getTownPlot(index){const x=603+(index%3)*98,y=213+Math.floor(index/3)*79;return{x,y,width:90,height:72,bounds:{x,y,width:90,height:72},foot:{x:x+45,y:y+51},entry:{x:x+45,y:y+70},index};}
function collisionRects(state){const objects=[{x:367,y:180,width:33,height:25},{x:179,y:247,width:130,height:40},{x:221,y:427,width:122,height:40},{x:433,y:161,width:88,height:43}];for(let i=0;i<(state.plots?.length||0);i++)if(state.plots[i]?.building){const p=getTownPlot(i);objects.push({x:p.x+15,y:p.y+26,width:60,height:28});}for(const [x,y,,scale]of TREES)objects.push({x:x-7*scale,y:y-7*scale,width:14*scale,height:13*scale});return objects;}
export function isTownWalkable(x,y,state){if(!Number.isFinite(x)||!Number.isFinite(y))return false;const dock=x>=451&&x<=497&&y>=521&&y<=574;if(!dock&&(!inside(x,y)||!inside(x-8,y)||!inside(x+8,y+5)||!inside(x,y-4)))return false;return !collisionRects(state).some(b=>x>b.x-5&&x<b.x+b.width+5&&y>b.y-3&&y<b.y+b.height+4);}
function stone(c,x,y,w,h,seed=0){r(c,x,y,w,h,'#6f7e69');r(c,x+1,y+1,w-2,h-3,hash(x,seed)>.5?'#a1aa8d':'#8e9d80');r(c,x+1,y+1,w-2,1,'#c5c8a3');r(c,x+1,y+2,1,h-4,'#b0bc96');r(c,x+w-2,y+3,1,h-4,'#778870');if(w>10)r(c,x+3+hash(seed,x)*(w-7),y+3,2,1,'#cad0a8');}
function softBox(c,x,y,w,h,radius=5){c.beginPath();c.moveTo(x+radius,y);c.lineTo(x+w-radius,y);c.quadraticCurveTo(x+w,y,x+w,y+radius);c.lineTo(x+w,y+h-radius);c.quadraticCurveTo(x+w,y+h,x+w-radius,y+h);c.lineTo(x+radius,y+h);c.quadraticCurveTo(x,y+h,x,y+h-radius);c.lineTo(x,y+radius);c.quadraticCurveTo(x,y,x+radius,y);c.closePath();}
function paving(c,x,y,w,h,seed=1){
  c.save();softBox(c,x-4,y-4,w+8,h+8,Math.min(8,h/2));c.fillStyle='#4c6959';c.fill();softBox(c,x-1,y-1,w+2,h+2,Math.min(6,h/2));c.fillStyle='#a9ae91';c.fill();c.beginPath();c.rect(x,y,w,h);c.clip();
  const stepY=Math.min(18,h),stepX=31;
  for(let yy=-stepY;yy<h;yy+=stepY)for(let xx=-stepX;xx<w;xx+=stepX){const px=x+xx+(Math.floor(yy/stepY)%2)*stepX/2,py=y+yy,g=c.createLinearGradient(px,py,px+stepX,py+stepY);g.addColorStop(0,hash(xx,yy+seed)>.5?'#bbc4aa':'#aab89c');g.addColorStop(1,'#819b87');softBox(c,px+.7,py+.7,stepX-1.4,stepY-1.4,3);c.fillStyle=g;c.fill();c.strokeStyle='#647e6e';c.lineWidth=.6;c.stroke();}
  drawEnvironmentTexture(c,'stone-floor',{x,y,width:w,height:h,tileSize:160,alpha:.16});c.restore();
}
function grass(c,x,y,seed,dense=false){
  c.save();c.lineCap='round';c.lineWidth=1.25;for(let i=0;i<(dense?5:3);i++){const dx=(i-1)*2.5,height=4+hash(seed+i,4)*5;c.strokeStyle=i%2?'#a2bf80':'#719c67';c.beginPath();c.moveTo(x+dx,y+3);c.quadraticCurveTo(x+dx-2,y-height*.6,x+dx-3,y-height);c.stroke();}c.restore();
}
function flowers(c,x,y,variant=0){c.save();ellipse(c,x,y+4,10,3,'#2f594633');for(let i=0;i<4;i++){const px=x-7+i*4.5,py=y+(i%2)*2;c.strokeStyle='#719562';c.lineWidth=1;c.beginPath();c.moveTo(px,py+6);c.quadraticCurveTo(px-1,py+1,px,py-2);c.stroke();for(let k=0;k<4;k++)ellipse(c,px+Math.cos(k*Math.PI/2)*2,py-2+Math.sin(k*Math.PI/2)*1.8,2,1.7,variant?'#e0a498':'#ead99a');ellipse(c,px,py-2,1.1,1.1,'#fff0bd');}c.restore();}
function rock(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,3,2,15,5,'#142f3455');poly(c,[[-14,0],[-10,-11],[-2,-15],[10,-12],[15,-4],[10,3],[-7,4]],'#4c706a');poly(c,[[-12,-1],[-9,-10],[-2,-13],[8,-10],[10,-4],[2,0]],'#8b9f84');poly(c,[[-9,-10],[-2,-13],[8,-10],[2,-8]],'#b1b998');r(c,-10,-1,9,2,'#637f68');c.restore();}
function barrel(c,x,y){ellipse(c,x+8,y+18,10,3,'#102b2d66');poly(c,[[x+2,y],[x+14,y],[x+17,y+5],[x+17,y+16],[x+13,y+20],[x+3,y+20],[x,y+15],[x,y+5]],'#463c31');r(c,x+2,y+3,13,14,'#a27a48');r(c,x+3,y+4,3,13,'#c09859');r(c,x+10,y+3,3,14,'#755737');r(c,x+1,y+5,15,3,'#52665b');r(c,x+1,y+14,15,3,'#52665b');r(c,x+2,y+5,12,1,'#a1ad88');ellipse(c,x+8,y+2,7,3,'#ccb17b');r(c,x+3,y+2,10,1,'#836a46');}
function crate(c,x,y,w=19){r(c,x+2,y+3,w,w,'#243c2f55');r(c,x,y,w,w,'#6d5139');r(c,x+2,y+2,w-4,w-4,'#a47f4e');for(let i=4;i<w-2;i+=5)r(c,x+i,y+2,1,w-4,'#765a3c');r(c,x,y,w,2,'#ceb27a');r(c,x,y+2,2,w-2,'#ba985d');line(c,[[x+3,y+w-4],[x+w-4,y+3]],'#d0ad72',2);r(c,x+w-2,y+2,2,w-2,'#4b4435');}
function pot(c,x,y){r(c,x-6,y,12,3,'#c59360');poly(c,[[x-5,y+3],[x+5,y+3],[x+3,y+10],[x-3,y+10]],'#93624a');r(c,x-3,y+3,3,6,'#b67c51');for(let i=0;i<5;i++){const xx=x-6+i*3;poly(c,[[xx,y],[xx-3,y-8],[xx,y-6],[xx+2,y-13],[xx+3,y-3]],i%2?'#7b9b5f':'#a6b978');}r(c,x-3,y-8,5,3,'#e6bb80');r(c,x+3,y-6,4,3,'#cf8b79');}
function bush(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,3,4,19,5,'#1c423544');for(const [xx,yy,z]of [[-10,0,9],[0,-5,11],[11,-1,9]]){const g=c.createRadialGradient(xx-3,yy-4,1,xx,yy,z);g.addColorStop(0,'#9bb975');g.addColorStop(.55,'#66925f');g.addColorStop(1,'#365e49');ellipse(c,xx,yy,z,z*.75,g);}c.restore();}
function treeArtwork(c,kind){const x=51,y=116;c.save();ellipse(c,x+7,y+3,34,9,'#18372b22');c.strokeStyle='#52614b';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+4,y-22,x-3,y-43,x,y-64);c.stroke();c.strokeStyle='#b5a578';c.lineWidth=4;c.beginPath();c.moveTo(x-2,y-2);c.quadraticCurveTo(x-1,y-31,x-5,y-51);c.stroke();const clusters=kind===2?[[-13,-40,22],[13,-47,23],[0,-70,26],[0,-94,17]]:[[-24,-49,23],[18,-44,25],[-25,-72,23],[2,-68,31],[24,-79,23],[-9,-96,25],[11,-103,20]];for(const [xx,yy,z]of clusters){const a=x+xx,b=y+yy,g=c.createRadialGradient(a-z*.25,b-z*.4,z*.05,a,b,z);g.addColorStop(0,kind===1?'#c6d18e':'#b2ca8e');g.addColorStop(.43,kind===1?'#8fac6c':'#7bab70');g.addColorStop(.80,'#4f805d');g.addColorStop(1,'#305c4c');ellipse(c,a,b,z,z*.81,g);for(let k=0;k<4;k++){const lx=a+(hash(k,xx)-.5)*z,ly=b+(hash(yy,k)-.5)*z;ellipse(c,lx,ly,4.5,2.6,'#c5d69b33');}}c.restore();}
function shadow(c,x,y,w,h=22){poly(c,[[x,y-3],[x+w,y-3],[x+w+25,y+h],[x+22,y+h]],'#102d2b45');}
function masonry(c,x,y,w,h,color='#a1a78b'){r(c,x,y,w,h,'#526b5d');for(let yy=0;yy<h;yy+=8)for(let xx=0;xx<w;xx+=16){const left=x+xx+(yy/8%2?4:0),ww=Math.min(15,x+w-left);if(ww<1)continue;r(c,left,y+yy,ww,7,color);r(c,left,y+yy,ww,1,'#ced0a6');r(c,left,y+yy+6,ww,1,'#7f8d70');}}
function windowPane(c,x,y,w=19,h=25){r(c,x-3,y-3,w+6,h+6,'#7c6d50');r(c,x-1,y-1,w+2,h+2,'#283c36');r(c,x+2,y+2,w-4,h-4,'#bd873f');r(c,x+3,y+3,w-6,h-8,'#f4c56d');r(c,x+4,y+4,w-8,5,'#ffe5a3');r(c,x+Math.floor(w/2)-1,y,2,h,'#68553d');r(c,x,y+Math.floor(h*.48),w,2,'#68553d');r(c,x-4,y+h+1,w+8,3,'#d0bc87');r(c,x-3,y+h+4,w+8,2,'#4c5c44');}
function roof(c,x,y,w,h,kind='red'){const cols=kind==='blue'?['#3c5861','#597983','#8ca1a0','#b9bca3']:['#704c40','#a76a48','#ca9160','#e4b77c'];poly(c,[[x-8,y+7],[x+w+11,y+7],[x+w+5,y-1],[x+w*.6,y-h],[x-4,y-12]],'#243c35');poly(c,[[x-7,y],[x+w*.53,y-h],[x+w+9,y],[x+w+4,y+5],[x-1,y+5]],cols[0]);poly(c,[[x-7,y-1],[x+w*.53,y-h],[x+w*.53,y+1],[x,y+3]],cols[2]);poly(c,[[x+w*.53,y-h],[x+w+8,y-1],[x+w+4,y+3],[x+w*.53,y+1]],cols[1]);
  c.save();path(c,[[x-6,y-1],[x+w*.53,y-h+1],[x+w+7,y-1],[x+w+3,y+2],[x,y+2]]);c.clip();for(let row=0;row<Math.ceil(h/7);row++){const yy=y-h+row*7;for(let xx=x-10+(row%2)*7;xx<x+w+12;xx+=14){r(c,xx,yy,13,6,hash(xx,row)>.6?cols[2]:cols[1]);r(c,xx,yy,13,1,cols[3]);r(c,xx+12,yy+1,1,5,cols[0]);r(c,xx,yy+5,13,1,cols[0]);}}c.restore();line(c,[[x-8,y],[x+w*.53,y-h],[x+w+9,y]],cols[3],2);r(c,x-9,y+2,w+20,3,cols[0]);r(c,x-8,y+2,w+18,1,cols[3]);r(c,x-5,y+5,w+13,5,'#293b32');r(c,x-4,y+5,w+11,2,'#735c40');
}
function door(c,x,y,w=22,h=35){r(c,x-3,y-3,w+6,h+5,'#aa956c');r(c,x-1,y-1,w+2,h+1,'#2a3730');r(c,x+1,y+1,w-2,h-1,'#725438');r(c,x+3,y+2,w-6,9,'#b79b62');for(let k=4;k<w-2;k+=5)r(c,x+k,y+13,1,h-14,'#aa8651');r(c,x+2,y+11,w-4,3,'#443f30');r(c,x+w-6,y+h*.6,3,3,'#f5d080');r(c,x-5,y+h,w+10,4,'#c2b993');r(c,x-8,y+h+4,w+16,4,'#83927a');r(c,x-7,y+h+4,w+14,1,'#bdc2a0');}
function sign(c,x,y,w,kind){r(c,x-2,y-12,3,15,'#4a4534');r(c,x-2,y-12,w+8,3,'#a29365');r(c,x+3,y-7,1,8,'#cec38f');r(c,x+w-2,y-7,1,8,'#cec38f');r(c,x,y,w,18,'#493d30');r(c,x+2,y+2,w-4,14,'#b18a4d');r(c,x+2,y+2,w-4,1,'#e5bd77');if(kind==='inn'){poly(c,[[x+8,y+6],[x+13,y+5],[x+17,y+8],[x+12,y+11]],'#ffdf8f');r(c,x+7,y+5,3,8,'#fbdf9a');r(c,x+6,y+12,15,2,'#e5cc8a');}else{ellipse(c,x+w/2,y+9,5,5,'#f4d587');r(c,x+w/2-1,y+5,2,8,'#9b6c3b');}}
function tradeArtwork(c){const x=19,y=147,w=126;r(c,27,105,119,40,'#342f2940');masonry(c,x-2,y-10,w+5,12);r(c,x,y-72,w,62,'#cebd92');r(c,x+w-25,y-72,25,62,'#a7aa85');r(c,x+5,y-68,4,56,'#8c7250');r(c,x+61,y-68,4,56,'#8c7250');r(c,x+w-30,y-67,4,55,'#6a6548');r(c,x+7,y-45,w-35,3,'#a68b60');r(c,x+7,y-21,w-35,3,'#ab9062');door(c,x+48,y-43,26,36);windowPane(c,x+16,y-57,23,24);windowPane(c,x+85,y-56,23,25);r(c,x+88,y-29,30,10,'#475e3d');for(let i=0;i<8;i++)r(c,x+90+i*3,y-31+(i%3),3,4,i%3?'#b7be76':'#e2bb7b');
  r(c,113,17,14,50,'#767b67');masonry(c,114,16,14,35,'#8f9980');r(c,110,14,22,5,'#c7bc96');roof(c,x-2,y-74,w+5,48,'blue');
  // Dormer and projecting loading canopy identify the trading house.
  r(c,62,51,35,27,'#dccba0');windowPane(c,71,55,16,17);roof(c,58,51,42,23,'blue');
  r(c,8,121,35,4,'#bba06a');r(c,10,124,3,20,'#63563c');r(c,37,124,3,20,'#63563c');poly(c,[[5,109],[36,109],[45,122],[3,122]],'#d9ba76');for(let k=0;k<5;k++)poly(c,[[7+k*7,109],[11+k*7,109],[14+k*7,122],[9+k*7,122]],k%2?'#759882':'#edcf8b');r(c,4,122,40,3,'#9b7548');crate(c,5,133,18);crate(c,134,131,18);barrel(c,148,128);sign(c,108,98,27,'trade');pot(c,49,140);
  // Finely edged fabric and a warm recessed upper transom.
  r(c,74,17,3,20,'#b19a68');poly(c,[[77,18],[103,21],[96,29],[77,28]],'#9abca3');r(c,79,21,12,2,'#e0d4a2');}
function innArtwork(c){const x=17,y=132,w=118;masonry(c,x-2,y-8,w+4,10);r(c,x,y-68,w,60,'#dfc79a');r(c,x+w-25,y-67,25,59,'#a5a17c');for(const xx of [x+4,x+55,x+w-29])r(c,xx,y-65,4,56,'#775b43');r(c,x+5,y-38,w-31,3,'#9b7954');line(c,[[x+8,y-65],[x+53,y-39]],'#9b7954',3);line(c,[[x+53,y-65],[x+8,y-39]],'#9b7954',3);windowPane(c,x+13,y-33,20,22);windowPane(c,x+86,y-46,19,23);door(c,x+47,y-38,25,31);r(c,x+13,y-8,25,5,'#597148');flowers(c,x+24,y-13,1);r(c,110,27,12,30,'#a19b7d');r(c,107,26,18,5,'#dbcca3');roof(c,x-2,y-70,w+5,45);r(c,x+37,y-81,36,21,'#e7cda0');windowPane(c,x+47,y-81,16,17);roof(c,x+32,y-84,47,24);sign(c,110,95,28,'inn');pot(c,15,124);barrel(c,140,116);r(c,26,132,96,3,'#cbc29c');r(c,23,135,102,3,'#81937b');}
function gateArtwork(c){const x=8,y=127;poly(c,[[4,y],[5,57],[15,32],[39,12],[69,6],[94,22],[109,51],[111,y]],'#354a43');poly(c,[[10,y-6],[13,56],[28,30],[50,18],[79,19],[100,47],[103,y-6]],'#6d8270');poly(c,[[28,y-9],[29,63],[38,43],[59,34],[81,43],[91,62],[91,y-9]],'#132f32');poly(c,[[36,y-9],[37,64],[44,51],[60,43],[76,52],[83,67],[83,y-9]],'#183e43');for(let row=0;row<8;row++){masonry(c,12,y-65+row*8,16,8,'#91a38a');masonry(c,91,y-65+row*8,14,8,'#768d78');}for(let i=0;i<7;i++){const a=Math.PI+(i/6)*Math.PI,xx=60+Math.cos(a)*37,yy=65+Math.sin(a)*28;c.save();c.translate(xx,yy);c.rotate(a+Math.PI/2);r(c,-9,-7,18,13,'#9fae8d');r(c,-8,-6,16,2,'#d0cfa5');r(c,-8,5,16,1,'#617b68');c.restore();}r(c,9,y-4,101,6,'#bfbc94');r(c,4,y+2,111,6,'#849881');r(c,1,y+8,117,5,'#b2b897');r(c,3,y+8,112,1,'#e0d4a7');poly(c,[[60,56],[72,76],[60,101],[48,77]],'#2c776c');poly(c,[[60,61],[67,77],[60,93],[53,77]],'#a1dbc0');poly(c,[[60,66],[62,78],[60,87],[58,78]],'#e6f4c0');for(let i=0;i<3;i++){r(c,18,72+i*14,3,4,'#d2c58a');r(c,96,71+i*14,3,4,'#a4bb91');}for(const [a,b]of [[13,50],[26,31],[75,19],[96,42]]){r(c,a,b,11,3,'#809558');r(c,a+2,b+3,4,7,'#667f50');}bush(c,7,y-3,.65);bush(c,110,y-1,.7);}
function parcelHouse(c,kind,level){const w=65,x=12,y=82,work=kind==='workshop';masonry(c,x-2,y-6,w+4,8);r(c,x,y-37,w,31,'#dbca9c');r(c,x+w-15,y-37,15,31,'#a5aa83');r(c,x+4,y-35,3,27,'#92764d');r(c,x+w-19,y-35,3,27,'#7f704e');windowPane(c,x+10,y-32,13,16);door(c,x+31,y-27,15,21);if(work){r(c,65,18,10,31,'#8c9380');r(c,63,16,14,5,'#c4bea0');}roof(c,x-2,y-39,w+4,23,work?'blue':'red');if(level>1){r(c,x+4,y-38,w-8,2,'#e8c479');r(c,x+51,y-31,9,12,'#f1c975');r(c,x+54,y-31,2,12,'#8d7047');}if(level>2){roof(c,x+15,y-47,25,12,work?'blue':'red');r(c,x+23,y-45,10,10,'#e2c37c');}if(work){crate(c,0,y-12,15);barrel(c,77,y-13);}else{pot(c,8,y-4);flowers(c,70,y-5,level%2);}r(c,x+27,y+1,28,3,'#c0bd97');}
function lanternArtwork(c){r(c,12,15,4,37,'#3e4937');r(c,13,17,1,32,'#9c9768');r(c,8,51,12,4,'#34463a');r(c,9,50,10,2,'#9ca17a');poly(c,[[4,9],[9,5],[19,5],[24,9],[21,12],[7,12]],'#a18a55');r(c,7,12,14,18,'#3c3d2d');r(c,9,13,10,14,'#d99642');r(c,11,14,7,11,'#ffda80');r(c,12,15,4,8,'#fff0b6');r(c,8,12,2,17,'#9f7c42');r(c,18,12,2,17,'#675638');r(c,6,29,16,3,'#b19b65');r(c,12,0,4,6,'#948456');r(c,10,0,8,2,'#c6b478');}
function plotGround(c,p,owned){const {x,y,width:w,height:h}=p;c.save();softBox(c,x,y,w,h,6);const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,owned?'#b2ac7c':'#779866');g.addColorStop(1,owned?'#8a976e':'#5d8159');c.fillStyle=g;c.fill();c.strokeStyle=owned?'#d8cb96':'#9bb47e';c.lineWidth=1.2;c.setLineDash(owned?[]:[4,5]);c.stroke();c.setLineDash([]);for(const xx of [x+2,x+w-3])for(const yy of [y+2,y+h-7]){c.strokeStyle='#d7c590';c.lineWidth=2;c.beginPath();c.moveTo(xx,yy);c.lineTo(xx,yy+6);c.stroke();}c.restore();}
let baseCache=null,baseKey='';
function softIsland(c,points){const last=points.at(-1),first=points[0];c.beginPath();c.moveTo((last[0]+first[0])/2,(last[1]+first[1])/2);for(let i=0;i<points.length;i++){const p=points[i],q=points[(i+1)%points.length];c.quadraticCurveTo(p[0],p[1],(p[0]+q[0])/2,(p[1]+q[1])/2);}c.closePath();}
function paintTerrain(c,state){
  c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  const sea=c.createRadialGradient(500,300,80,520,320,650);sea.addColorStop(0,'#388d8e');sea.addColorStop(.65,'#236575');sea.addColorStop(1,'#123b53');c.fillStyle=sea;c.fillRect(0,0,1040,640);
  for(const [scale,col,shift]of [[1.13,'#3f9a9b30',12],[1.08,'#60b1a34d',12],[1.035,'#8fcbb66b',9]]){softIsland(c,ISLAND.map(([x,y])=>[520+(x-520)*scale,320+(y-320)*scale+shift]));c.fillStyle=col;c.fill();}
  softIsland(c,ISLAND.map(([x,y])=>[x+2,y+18]));c.fillStyle='#32594e';c.fill();softIsland(c,ISLAND.map(([x,y])=>[x+1,y+10]));c.fillStyle='#738c6c';c.fill();
  softIsland(c,ISLAND);const land=c.createLinearGradient(100,80,800,530);land.addColorStop(0,'#91ac77');land.addColorStop(.5,'#779b68');land.addColorStop(1,'#527d5a');c.fillStyle=land;c.fill();c.strokeStyle='#d1d2a18c';c.lineWidth=3;c.stroke();c.clip();
  drawEnvironmentTexture(c,'grass',{x:60,y:65,width:920,height:510,tileSize:250,alpha:.38});
  for(let i=0;i<65;i++){const x=80+hash(i,11)*875,y=80+hash(i,99)*490,z=18+hash(i,24)*34,g=c.createRadialGradient(x,y,2,x,y,z);g.addColorStop(0,i%3?'#bfd49a30':'#355f4133');g.addColorStop(1,'#456b4a00');ellipse(c,x,y,z,z*.55,g);}
  c.fillStyle='#7c876183';softBox(c,415,188,118,342,18);c.fill();softBox(c,168,302,731,65,17);c.fill();
  paving(c,442,199,65,326,1);paving(c,178,318,708,34,3);paving(c,421,303,107,66,5);paving(c,232,279,28,39,3);paving(c,264,351,29,133,7);
  ellipse(c,475,334,44,27,'#607e6c');ellipse(c,475,332,41,25,'#cbd0ad');ellipse(c,475,332,36,21,'#98b098');poly(c,[[475,309],[482,328],[505,332],[482,338],[475,354],[468,338],[445,332],[468,327]],'#d9cfa4');ellipse(c,475,332,6,4,'#f0d39b');
  paving(c,578,208,15,326,8);for(let row=0;row<4;row++)paving(c,592,285+row*79,303,8,9);
  for(let i=0;i<12;i++)plotGround(c,getTownPlot(i),i<(state.plots?.length||0));
  for(const [x,y,w,h]of [[357,227,35,54],[541,224,29,60],[355,386,36,69],[543,367,25,44]]){softBox(c,x,y,w,h,6);c.fillStyle='#b6b68a';c.fill();softBox(c,x+3,y+3,w-6,h-6,4);c.fillStyle='#3e634c';c.fill();for(let k=0;k<13;k++){const xx=x+6+hash(k,x)*(w-12),yy=y+7+hash(k,y)*(h-14);grass(c,xx,yy,k,true);if(k%4===0)flowers(c,xx,yy,k%2);}}
  for(const [x,y]of [[158,263],[340,304],[211,479],[387,472],[557,183],[914,393],[887,175],[145,302],[808,540]])bush(c,x,y,.6+hash(x,y)*.4);
  for(const [x,y,s]of [[86,375,1.2],[119,466,.9],[272,535,1.1],[598,571,.7],[930,451,1.1],[950,283,.9],[839,130,.7],[401,98,.75]])rock(c,x,y,s);
  for(let i=0;i<100;i++){const x=95+hash(i,40)*830,y=121+hash(i,41)*400;if((x>405&&x<577)||(x>590&&y>193)||(x>166&&x<350&&y>138&&y<488))continue;if(inside(x,y)){grass(c,x,y,i,i%7===0);if(i%11===0)flowers(c,x,y,i%2);}}
  c.restore();
  // Familiar small props keep their old footprints and leave all entrances open.
  for(const [x,y]of [[332,322],[368,355],[542,335]]){r(c,x,y,28,5,'#ad9766');r(c,x,y,28,1,'#e0c18a');r(c,x+2,y+5,3,9,'#4c523b');r(c,x+24,y+5,3,9,'#4c523b');r(c,x,y-6,28,3,'#8a8154');}
  ellipse(c,383,204,20,8,'#354d3e44');ellipse(c,383,201,16,8,'#a5ad8c');r(c,367,189,32,12,'#8f9c7b');ellipse(c,383,189,16,8,'#d5d3b0');ellipse(c,383,189,11,4,'#234448');r(c,368,175,3,17,'#6c6946');r(c,394,175,3,17,'#6c6946');r(c,366,173,33,4,'#c2b783');
  r(c,446,523,57,57,'#354d42');for(let i=0;i<7;i++){r(c,449,523+i*8,51,6,i%2?'#b3a175':'#a49267');r(c,450,523+i*8,49,1,'#d4be87');}for(const x of [443,501]){r(c,x,519,5,61,'#776b47');r(c,x,519,5,3,'#d1b879');}barrel(c,416,505);crate(c,513,504,21);
}
function getTerrain(state){const key=String(state.plots?.length||0)+':'+getEnvironmentRevision();if(!baseCache||baseKey!==key){baseCache=makeCanvas(1040,640);baseKey=key;if(baseCache)paintTerrain(baseCache.getContext('2d'),state);}return baseCache;}
export function townTransform(w,h,options={}){const zoom=clamp(Number(options.townZoom)||1,1,2.5),fit=Math.min(w/1010,h/590),scale=Math.max(.1,fit)*zoom;const focus=options.townCamera||options.townPlayer||TOWN_SPAWN;const centerX=zoom===1?520:clamp(focus.x,Math.min(520,w/(scale*2)),Math.max(520,1040-w/(scale*2))),centerY=zoom===1?319:clamp(focus.y,Math.min(320,h/(scale*2)),Math.max(320,640-h/(scale*2)));return{scale,offsetX:Math.round(w/2-centerX*scale),offsetY:Math.round(h/2-centerY*scale)};}
function paintWater(c,time){c.save();c.lineCap='round';for(let i=0;i<64;i++){const x=hash(i,83)*1040,y=hash(i,28)*640;if(inside(x,y)||inside(x-13,y-8))continue;const drift=Math.sin(time/1800+i)*3;c.globalAlpha=.13+.11*Math.sin(time/1900+i);c.strokeStyle='#b9e0cc';c.lineWidth=1.1;c.beginPath();c.moveTo(x+drift,y);c.quadraticCurveTo(x+10+drift,y-2,x+20+drift,y);c.stroke();}for(let i=0;i<ISLAND.length;i++){if(i%3===0)continue;const a=ISLAND[i],b=ISLAND[(i+1)%ISLAND.length],f=.3+(Math.sin(time/2600+i)+1)*.1,x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f,nx=(x-520)*.015,ny=(y-320)*.015+15;c.globalAlpha=.22+.1*Math.sin(time/1700+i);c.strokeStyle='#c4e5cf';c.lineWidth=1.4;c.beginPath();c.moveTo(x+nx,y+ny);c.quadraticCurveTo(x+nx+9,y+ny-2,x+nx+20,y+ny);c.stroke();}c.restore();}
function screenLabel(c,text,x,y,scale,{selected=false,muted=false,compact=false}={}){const font=Math.max(11,Math.min(13,11*scale));c.font=`600 ${font}px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif`;c.textAlign='center';c.textBaseline='middle';const tw=c.measureText(text).width+(compact?8:18),height=compact?17:21;const bx=Math.round(x-tw/2),by=Math.round(y-height/2);r(c,bx,by,tw,height,selected?'#4b5138ee':'#122e30de');r(c,bx,by,tw,1,selected?'#e7c37a':'#a1b48b66');if(selected)r(c,bx,by+height-1,tw,1,'#e7c37a');c.fillStyle=muted?'#a8ba96':selected?'#ffe0a1':'#ebdfb8';c.fillText(text,Math.round(x),Math.round(y+.5));return{x:bx,y:by,width:tw,height};}
function selection(c,b,time,reduced=false){const pulse=reduced?1:.75+Math.sin(time/250)*.25;c.globalAlpha=pulse;const x=b.x-3,y=b.y-3,w=b.width+6,h=b.height+6;for(const [xx,yy,dx,dy]of [[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]]){r(c,xx+(dx<0?-12:0),yy,12,2,'#f5d189');r(c,xx,yy+(dy<0?-10:0),2,10,'#f5d189');}c.globalAlpha=1;}
function buildEffect(c,e,time){const p=getTownPlot(e.index??0),life=clamp((time-e.startedAt)/(e.duration||1100),0,1);if(life>=1)return;const x=p.foot.x,y=p.foot.y;light(c,x,y,60,24,(1-life)*.4);c.globalAlpha=1-life;for(let i=0;i<12;i++){const xx=x+Math.sin(i*2.4)*(10+life*40),yy=y-12-Math.cos(i*1.8)*15-life*42;r(c,xx,yy,2,6,'#ffdfa1');r(c,xx-2,yy+2,6,2,'#ffdfa1');}c.strokeStyle='#f2d18a';c.lineWidth=2;c.beginPath();c.ellipse(x,y+4,20+life*35,7+life*12,0,0,Math.PI*2);c.stroke();c.globalAlpha=1;}
/** Paints a town without reading or changing persistence. Hitboxes share its camera transform. */
export function drawTown(c,w,h,state,time=0,options={},drawPlayer=()=>{},drawIcon=()=>{}){
  const tr=townTransform(w,h,options),{scale,offsetX,offsetY}=tr,hero=options.townPlayer||TOWN_SPAWN;
  const sea=c.createLinearGradient(0,0,w,h);sea.addColorStop(0,'#276c7b');sea.addColorStop(1,'#123c54');c.fillStyle=sea;c.fillRect(0,0,w,h);c.save();c.translate(offsetX,offsetY);c.scale(scale,scale);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  const base=getTerrain(state);if(base)c.drawImage(base,0,0);else paintTerrain(c,state);paintWater(c,time);
  // All shadows fall to the lower right; footprints, not roofs, decide collisions.
  shadow(c,180,282,127,24);shadow(c,222,463,119,22);shadow(c,433,201,88,22);
  for(const [x,y,,s]of TREES)ellipse(c,x+14*s,y+4,30*s,8*s,'#163c2d44');
  const actors=[];for(const [x,y,kind,s]of TREES)actors.push({depth:y,draw:()=>spriteAt(c,`tree:${kind}`,104,132,x-51*s,y-116*s,cc=>treeArtwork(cc,kind),s)});
  actors.push({depth:286,draw:()=>spriteAt(c,'trade',180,165,163,139,tradeArtwork)});
  actors.push({depth:466,draw:()=>spriteAt(c,'inn',166,151,206,334,innArtwork)});
  actors.push({depth:204,draw:()=>spriteAt(c,'gate',120,145,417,77,gateArtwork)});
  const plots=state.plots||[];for(let i=0;i<12;i++){const p=getTownPlot(i);if(i<plots.length){if(plots[i]?.building){shadow(c,p.x+15,p.foot.y,61,11);const b=plots[i];actors.push({depth:p.foot.y,draw:()=>spriteAt(c,`parcel:${b.building}:${b.level}`,96,96,p.x-3,p.y-31,cc=>parcelHouse(cc,b.building,b.level||1))});}else{actors.push({depth:p.y+40,draw:()=>{r(c,p.x+43,p.y+23,3,23,'#846b44');r(c,p.x+31,p.y+20,28,17,'#433e2c');r(c,p.x+33,p.y+22,24,13,'#c2b17a');r(c,p.x+43,p.y+25,3,7,'#4e6547');r(c,p.x+40,p.y+27,9,3,'#4e6547');r(c,p.x+34,p.y+22,22,1,'#ead49b');}});}}else if(i===plots.length){actors.push({depth:p.y+38,draw:()=>{r(c,p.x+42,p.y+27,3,18,'#68724c');r(c,p.x+29,p.y+23,31,15,'#879763');r(c,p.x+30,p.y+23,29,1,'#b2b883');r(c,p.x+37,p.y+28,15,2,'#506747');r(c,p.x+43,p.y+25,3,8,'#506747');}});}}
  for(const [x,y]of LAMPS)actors.push({depth:y,draw:()=>spriteAt(c,'lamp',28,58,x-14,y-54,lanternArtwork)});
  actors.push({depth:hero.y,draw:()=>{light(c,hero.x+16,hero.y-4,44,29,.17);const m=hero.motion||options.townMotion||{};drawPlayer(c,Math.round(hero.x),Math.round(hero.y-13),44,time,{facing:hero.facing||'down',...m});}});
  actors.sort((a,b)=>a.depth-b.depth);for(const actor of actors)actor.draw();
  // Warm glass lights paint the nearby paving; the scene itself stays readable.
  for(const [x,y]of LAMPS){const pulse=options.reducedMotion?1:.94+Math.sin(time/390+x)*.06;light(c,x,y-34,39,45,.23*pulse);light(c,x+8,y+2,36,12,.17*pulse);r(c,x-2,y-39,3,7,'#fff1c0');}
  for(const [x,y]of [[207,233],[277,232],[244,266],[245,437],[311,419]]){light(c,x,y,32,29,.13);poly(c,[[x-7,y+11],[x+7,y+11],[x+22,y+36],[x-2,y+36]],'#f4c2770b');}
  for(let i=0;i<plots.length;i++)if(plots[i]?.building){const p=getTownPlot(i);light(c,p.x+27,p.y+26,27,22,.12);}
  const gatePulse=options.reducedMotion?1:.83+Math.sin(time/800)*.17;light(c,477,153,43,44,.16*gatePulse);
  // A restrained chimney curl, drifting embers and insects supply idle life.
  if(!options.reducedMotion){for(let k=0;k<4;k++){const t=((time/1800+k*.25)%1),xx=282+Math.sin(t*5+k)*4,yy=157-t*30;c.globalAlpha=(1-t)*.17;r(c,xx,yy,4+t*5,3+t*2,'#c9ceb6');}c.globalAlpha=1;for(let i=0;i<9;i++){const x=350+hash(i,4)*225+Math.sin(time/2300+i)*5,y=160+hash(i,5)*320+Math.cos(time/1900+i)*4;c.globalAlpha=.2+.5*Math.max(0,Math.sin(time/1100+i));r(c,x,y,2,2,'#ecd99b');}c.globalAlpha=1;}
  if(Number.isInteger(options.selectedPlot)&&options.selectedPlot>=0&&options.selectedPlot<12)selection(c,getTownPlot(options.selectedPlot),time,options.reducedMotion);
  const selected=TOWN_LANDMARKS.find(b=>b.id===options.selectedBuilding);if(selected)selection(c,selected.bounds,time,options.reducedMotion);
  for(const e of options.townEffects||options.effects||[])if(['build','purchase','upgrade'].includes(e.kind))buildEffect(c,e,time);
  c.restore();
  const sx=x=>offsetX+x*scale,sy=y=>offsetY+y*scale;
  // Labels are composited at screen resolution instead of shrinking inside the pixel atlas.
  const groundHits=[],spriteHits=[],labelHits=[];
  const screenRect=b=>({x:sx(b.x),y:sy(b.y),width:b.width*scale,height:b.height*scale});
  for(const b of TOWN_LANDMARKS){
    const item={type:'building',id:b.id,name:b.name,worldBounds:b.bounds};
    spriteHits.push({...item,...screenRect(b.bounds),depth:b.foot});
    const box=screenLabel(c,b.name,sx(b.entry.x),sy(b.foot+17),scale,{selected:options.selectedBuilding===b.id});
    labelHits.push({...item,...box});
  }
  for(let i=0;i<12;i++){
    const p=getTownPlot(i),owned=i<plots.length,available=i===plots.length;
    const item={type:'plot',index:i,name:`第${i+1}区画`,owned,available,worldBounds:p};
    groundHits.push({...item,...screenRect(p)});
    if(plots[i]?.building){
      // Separate roof and wall bands follow visible shape instead of stealing the previous row's label.
      for(const box of [{x:p.x+27,y:p.y-13,width:34,height:18},{x:p.x+3,y:p.y+5,width:86,height:9},{x:p.x+10,y:p.y+14,width:70,height:43}])spriteHits.push({...item,...screenRect(box),depth:p.foot.y});
    }
    if(owned||available){
      const name=owned?(plots[i]?.building?`${i+1} · ${plots[i].building==='workshop'?'工房':'貸家'} Lv.${plots[i].level||1}`:`${i+1} · 建築できます`):'土地を広げる';
      const compact=scale<1.15;
      const box=screenLabel(c,compact?String(i+1):name,sx(p.x+(compact?8:p.width/2)),sy(p.y+(compact?59:57)),scale,{selected:options.selectedPlot===i,muted:!owned,compact});
      labelHits.push({...item,...box});
    }
  }
  const hits=[...groundHits,...spriteHits.sort((a,b)=>a.depth-b.depth),...labelHits];
  return{mode:'town',transform:tr,hitRegions:hits,playerScreen:{x:sx(hero.x),y:sy(hero.y)},playerWorld:{x:hero.x,y:hero.y},townZoom:options.townZoom||1};
}
