/* Original, deterministic pixel artwork. One logical pixel is shared by terrain,
 * architecture and foliage. Static layers are cached; only water, fire and actors animate. */
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
function sprite(key,w,h,paint){let cv=sprites.get(key);if(!cv){cv=makeCanvas(w,h);if(cv){const ctx=cv.getContext('2d');ctx.imageSmoothingEnabled=false;paint(ctx);sprites.set(key,cv);}}return cv;}
function spriteAt(c,key,w,h,x,y,paint,scale=1){const cv=sprite(key,w,h,paint);if(cv)c.drawImage(cv,Math.round(x),Math.round(y),Math.round(w*scale),Math.round(h*scale));else{c.save();c.translate(x,y);c.scale(scale,scale);paint(c);c.restore();}}
export function getTownPlot(index){const x=603+(index%3)*98,y=213+Math.floor(index/3)*79;return{x,y,width:90,height:72,bounds:{x,y,width:90,height:72},foot:{x:x+45,y:y+51},entry:{x:x+45,y:y+70},index};}
function collisionRects(state){const objects=[{x:367,y:180,width:33,height:25},{x:179,y:247,width:130,height:40},{x:221,y:427,width:122,height:40},{x:433,y:161,width:88,height:43}];for(let i=0;i<(state.plots?.length||0);i++)if(state.plots[i]?.building){const p=getTownPlot(i);objects.push({x:p.x+15,y:p.y+26,width:60,height:28});}for(const [x,y,,scale]of TREES)objects.push({x:x-7*scale,y:y-7*scale,width:14*scale,height:13*scale});return objects;}
export function isTownWalkable(x,y,state){if(!Number.isFinite(x)||!Number.isFinite(y))return false;const dock=x>=451&&x<=497&&y>=521&&y<=574;if(!dock&&(!inside(x,y)||!inside(x-8,y)||!inside(x+8,y+5)||!inside(x,y-4)))return false;return !collisionRects(state).some(b=>x>b.x-5&&x<b.x+b.width+5&&y>b.y-3&&y<b.y+b.height+4);}
function stone(c,x,y,w,h,seed=0){r(c,x,y,w,h,'#6f7e69');r(c,x+1,y+1,w-2,h-3,hash(x,seed)>.5?'#a1aa8d':'#8e9d80');r(c,x+1,y+1,w-2,1,'#c5c8a3');r(c,x+1,y+2,1,h-4,'#b0bc96');r(c,x+w-2,y+3,1,h-4,'#778870');if(w>10)r(c,x+3+hash(seed,x)*(w-7),y+3,2,1,'#cad0a8');}
function paving(c,x,y,w,h,seed=1){r(c,x-4,y-4,w+8,h+8,'#59684c');r(c,x-2,y-2,w+4,h+4,'#b1ae80');r(c,x,y,w,h,'#71816a');c.save();c.beginPath();c.rect(x,y,w,h);c.clip();for(let yy=0;yy<h;yy+=12)for(let xx=-12;xx<w;xx+=24)stone(c,x+xx+(yy/12%2)*12,y+yy,23,11,seed+yy);c.restore();}
function grass(c,x,y,seed,dense=false){const col=hash(seed,4)>.5?'#8d9d69':'#6f8b58';r(c,x,y,1,4,col);r(c,x-2,y+1,1,3,col);r(c,x+2,y-1,1,5,col);r(c,x-3,y+4,6,1,'#3d5e41');if(dense){r(c,x+5,y+1,1,4,'#a5ae72');r(c,x+7,y+3,1,3,'#7e975e');}}
function flowers(c,x,y,variant=0){ellipse(c,x+2,y+3,11,3,'#39573d');for(let i=0;i<5;i++){const xx=x-8+i*4,yy=y+(i%2)*3;r(c,xx,yy,1,6,'#a2a774');r(c,xx-2,yy-2,5,3,variant?'#cf8d84':'#dfc783');r(c,xx,yy-3,1,5,variant?'#efb3a0':'#f6e0a0');r(c,xx,yy-1,1,1,'#fff0bd');}}
function rock(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);ellipse(c,3,2,15,5,'#142f3455');poly(c,[[-14,0],[-10,-11],[-2,-15],[10,-12],[15,-4],[10,3],[-7,4]],'#4c706a');poly(c,[[-12,-1],[-9,-10],[-2,-13],[8,-10],[10,-4],[2,0]],'#8b9f84');poly(c,[[-9,-10],[-2,-13],[8,-10],[2,-8]],'#b1b998');r(c,-10,-1,9,2,'#637f68');c.restore();}
function barrel(c,x,y){ellipse(c,x+8,y+18,10,3,'#102b2d66');poly(c,[[x+2,y],[x+14,y],[x+17,y+5],[x+17,y+16],[x+13,y+20],[x+3,y+20],[x,y+15],[x,y+5]],'#463c31');r(c,x+2,y+3,13,14,'#a27a48');r(c,x+3,y+4,3,13,'#c09859');r(c,x+10,y+3,3,14,'#755737');r(c,x+1,y+5,15,3,'#52665b');r(c,x+1,y+14,15,3,'#52665b');r(c,x+2,y+5,12,1,'#a1ad88');ellipse(c,x+8,y+2,7,3,'#ccb17b');r(c,x+3,y+2,10,1,'#836a46');}
function crate(c,x,y,w=19){r(c,x+2,y+3,w,w,'#243c2f55');r(c,x,y,w,w,'#6d5139');r(c,x+2,y+2,w-4,w-4,'#a47f4e');for(let i=4;i<w-2;i+=5)r(c,x+i,y+2,1,w-4,'#765a3c');r(c,x,y,w,2,'#ceb27a');r(c,x,y+2,2,w-2,'#ba985d');line(c,[[x+3,y+w-4],[x+w-4,y+3]],'#d0ad72',2);r(c,x+w-2,y+2,2,w-2,'#4b4435');}
function pot(c,x,y){r(c,x-6,y,12,3,'#c59360');poly(c,[[x-5,y+3],[x+5,y+3],[x+3,y+10],[x-3,y+10]],'#93624a');r(c,x-3,y+3,3,6,'#b67c51');for(let i=0;i<5;i++){const xx=x-6+i*3;poly(c,[[xx,y],[xx-3,y-8],[xx,y-6],[xx+2,y-13],[xx+3,y-3]],i%2?'#7b9b5f':'#a6b978');}r(c,x-3,y-8,5,3,'#e6bb80');r(c,x+3,y-6,4,3,'#cf8b79');}
function bush(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);poly(c,[[-15,3],[-17,-5],[-10,-11],[-3,-9],[3,-15],[12,-11],[16,-5],[14,4]],'#30533d');poly(c,[[-14,0],[-13,-6],[-7,-9],[-2,-6],[4,-12],[11,-9],[14,-3],[7,1]],'#70945c');for(let i=0;i<14;i++)r(c,-10+hash(i,9)*21,-10+hash(i,3)*10,3,2,i%3?'#91aa6b':'#b1b979');c.restore();}
function treeArtwork(c,kind){const x=51,y=116;ellipse(c,x+7,y+3,34,9,'#18372b44');poly(c,[[x-7,y],[x-4,y-42],[x+5,y-43],[x+8,y],[x+16,y+4],[x+6,y+6],[x,y+2],[x-13,y+5]],'#3e4732');r(c,x-3,y-43,6,44,'#8c7950');r(c,x-2,y-40,3,38,'#b7a068');r(c,x+4,y-38,3,37,'#635c3b');line(c,[[x+1,y-22],[x-12,y-37]],'#ab925b',4);line(c,[[x+4,y-29],[x+16,y-44]],'#716640',5);
  const clusters=kind===1?[[-19,-42,19],[18,-44,19],[-27,-61,18],[2,-62,27],[23,-68,19],[-11,-83,23],[11,-92,18]]:kind===2?[[-16,-29,20],[15,-36,20],[-8,-46,24],[7,-66,22],[2,-85,16]]:[[-24,-41,22],[16,-41,23],[-26,-65,20],[0,-60,28],[25,-64,20],[-13,-84,22],[12,-86,22],[0,-101,14]];
  const colors=kind===2?['#294f43','#466f50','#688b5b','#9baa6d']:kind===1?['#36513c','#5c7d49','#88a15d','#bec07a']:['#234e43','#43764f','#72945e','#a9b879'];
  for(let k=0;k<clusters.length;k++){const [xx,yy,z]=clusters[k],a=x+xx,b=y+yy;poly(c,[[a-z,b-1],[a-z+3,b-z*.5],[a-z*.6,b-z*.8],[a-3,b-z],[a+z*.6,b-z*.7],[a+z,b-z*.2],[a+z-2,b+z*.25],[a+z*.55,b+z*.6],[a-z*.5,b+z*.55]],colors[0]);poly(c,[[a-z+3,b-3],[a-z+7,b-z*.5],[a-z*.3,b-z*.8],[a+z*.5,b-z*.6],[a+z-4,b-z*.2],[a+z*.5,b+z*.24],[a-z*.55,b+z*.24]],colors[1]);for(let i=0;i<18;i++){const px=a+(hash(k*31+i,kind+7)-.5)*z*1.5,py=b-z*.7+hash(i,k+19)*z*.85;r(c,px,py,3+hash(i,k)*4,2,i%5?colors[2]:colors[3]);r(c,px+1,py+2,3,1,colors[1]);}r(c,a-z*.4,b-z*.65,5,2,colors[3]);}
  r(c,x-3,y-9,2,6,'#a6945d');grass(c,x-9,y+2,kind);grass(c,x+12,y+3,kind+1);
}
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
function plotGround(c,p,owned){const {x,y,width:w,height:h}=p;r(c,x,y,w,h,owned?'#8b8a61':'#4e6b48');r(c,x+2,y+2,w-4,h-4,owned?'#77835a':'#52734b');r(c,x+2,y+2,w-4,1,owned?'#c5b785':'#819661');for(let k=0;k<38;k++){const xx=x+5+hash(k,p.index+77)*(w-10),yy=y+5+hash(k+77,p.index)*(h-10);r(c,xx,yy,2,1,owned?'#a8a075':'#7b935e');}for(const xx of [x,x+w-3])for(const yy of [y,y+h-8]){r(c,xx,yy,3,8,'#5c5d3d');r(c,xx,yy,3,2,'#d0bd7e');}r(c,x+4,y+h-7,w-8,2,owned?'#b4a477':'#748559');}
let baseCache=null,baseKey='';
function paintTerrain(c,state){
  r(c,0,0,1040,640,'#123b46');
  // Broken broad bands outline the shallows without blurring the pixel shoreline.
  for(const [scale,col]of [[1.1,'#1b5057'],[1.06,'#245e62'],[1.025,'#367571']])poly(c,ISLAND.map(([x,y])=>[520+(x-520)*scale,320+(y-320)*scale+10]),col);
  for(let i=0;i<180;i++){const x=hash(i,92)*1040,y=hash(i,31)*640;if(!inside(x,y)){r(c,x,y,8+hash(i,7)*23,1,i%4?'#487d7a66':'#7d9c8c66');if(i%3===0)r(c,x+5,y+4,4,1,'#426f6e');}}
  poly(c,ISLAND.map(([x,y])=>[x+2,y+18]),'#203f3b');poly(c,ISLAND.map(([x,y])=>[x+1,y+11]),'#436453');poly(c,ISLAND,'#8d9970');poly(c,ISLAND.map(([x,y])=>[520+(x-520)*.986,320+(y-320)*.986-3]),P.grass);
  c.save();path(c,ISLAND.map(([x,y])=>[520+(x-520)*.982,320+(y-320)*.982-3]));c.clip();
  for(let i=0;i<185;i++){const x=80+hash(i,11)*875,y=80+hash(i,99)*490;ellipse(c,x,y,12+hash(i,24)*31,4+hash(i,3)*14,i%3?'#63805244':'#355f4133');}
  for(let i=0;i<1400;i++){const x=hash(i,13)*1040,y=hash(i,14)*640;r(c,x,y,2+hash(i,20)*3,1,i%4?'#7c925c55':'#b0ad6b66');}
  // Wide promenade and imperfect dirt edges keep walking space readable.
  poly(c,[[416,193],[523,193],[530,297],[896,297],[902,364],[530,364],[531,525],[416,525],[416,365],[172,365],[172,305],[416,305]],'#6e7750');
  for(let i=0;i<120;i++){const x=430+(hash(i,2)>.5?-18:91)+hash(i,3)*11,y=200+hash(i,25)*320;grass(c,x,y,i);}
  paving(c,442,199,65,326,1);paving(c,178,318,708,34,3);paving(c,421,303,107,66,5);
  paving(c,232,279,28,39,3);paving(c,264,351,29,133,7);
  // Circular inset at the heart of the promenade, with a small compass mosaic.
  ellipse(c,475,336,45,28,'#6b806b');ellipse(c,475,334,41,25,'#c2be91');ellipse(c,475,334,38,22,'#8f9f80');poly(c,[[475,310],[482,330],[507,334],[482,340],[475,357],[468,340],[443,334],[468,329]],'#bdc39b');poly(c,[[475,310],[475,334],[468,329]],'#e2d3a1');poly(c,[[475,357],[475,334],[482,340]],'#718d74');ellipse(c,475,334,7,4,'#d8c88e');ellipse(c,475,334,3,2,'#8b8460');
  // Estate paths remain distinct from the buildable parcels.
  paving(c,578,208,15,326,8);for(let row=0;row<4;row++)paving(c,592,285+row*79,303,8,9);
  for(let i=0;i<12;i++)plotGround(c,getTownPlot(i),i<(state.plots?.length||0));
  // Garden beds have real borders, soil, individual stems and intermittent blooms.
  for(const [x,y,w,h]of [[357,227,35,54],[541,224,29,60],[355,386,36,69],[543,367,25,44]]){r(c,x,y,w,h,'#a5a67c');r(c,x+3,y+3,w-6,h-6,'#3d5139');r(c,x+3,y+h-3,w-3,3,'#607e53');for(let k=0;k<20;k++){const xx=x+6+hash(k,x)*(w-12),yy=y+7+hash(k,y)*(h-14);grass(c,xx,yy,k,true);if(k%4===0)flowers(c,xx,yy,k%2);}}
  for(const [x,y]of [[158,263],[340,304],[211,479],[387,472],[557,183],[914,393],[887,175],[145,302],[808,540]])bush(c,x,y,.6+hash(x,y)*.4);
  for(const [x,y,s]of [[86,375,1.2],[119,466,.9],[272,535,1.1],[598,571,.7],[930,451,1.1],[950,283,.9],[839,130,.7],[401,98,.75]])rock(c,x,y,s);
  for(let i=0;i<160;i++){const x=95+hash(i,40)*830,y=121+hash(i,41)*400;if((x>405&&x<577)||(x>590&&y>193)||(x>166&&x<350&&y>138&&y<488))continue;if(inside(x,y)){grass(c,x,y,i,i%7===0);if(i%13===0)flowers(c,x,y,i%2);}}
  c.restore();
  // Grounded cargo, benches, a well and shoreline jetty add the scale of daily life.
  for(const [x,y]of [[332,322],[368,355],[542,335]]){r(c,x,y,28,5,'#ad9766');r(c,x,y,28,1,'#e0c18a');r(c,x+2,y+5,3,9,'#4c523b');r(c,x+24,y+5,3,9,'#4c523b');r(c,x,y-6,28,3,'#8a8154');}
  ellipse(c,386,205,20,8,'#354d3e');ellipse(c,383,201,16,8,'#a5ad8c');r(c,367,189,32,12,'#8f9c7b');ellipse(c,383,189,16,8,'#c4c4a0');ellipse(c,383,189,11,4,'#234448');r(c,368,175,3,17,'#6c6946');r(c,394,175,3,17,'#6c6946');r(c,366,173,33,4,'#b4a878');r(c,382,176,1,16,'#bba578');
  r(c,446,523,57,57,'#354d42');for(let i=0;i<7;i++){r(c,449,523+i*8,51,6,i%2?'#b3a175':'#a49267');r(c,450,523+i*8,49,1,'#d4be87');r(c,458,525+i*8,2,2,'#705d3e');r(c,488,525+i*8,2,2,'#705d3e');}for(const x of [443,501]){r(c,x,519,5,61,'#776b47');r(c,x,519,5,3,'#d1b879');}barrel(c,416,505);crate(c,513,504,21);
  for(const [x,y]of [[194,298],[348,454]]){ellipse(c,x,y,10,4,'#b7a275');r(c,x-9,y,18,9,'#6d6040');ellipse(c,x,y,9,3,'#c6b280');ellipse(c,x,y,5,2,'#957d50');r(c,x-1,y-3,2,5,'#7e734d');}
}
function getTerrain(state){const key=String(state.plots?.length||0);if(!baseCache||baseKey!==key){baseCache=makeCanvas(1040,640);baseKey=key;if(baseCache)paintTerrain(baseCache.getContext('2d'),state);}return baseCache;}
export function townTransform(w,h,options={}){const zoom=clamp(Number(options.townZoom)||1,1,2.5),fit=Math.min(w/1010,h/590),scale=Math.max(.1,fit)*zoom;const focus=options.townCamera||options.townPlayer||TOWN_SPAWN;const centerX=zoom===1?520:clamp(focus.x,Math.min(520,w/(scale*2)),Math.max(520,1040-w/(scale*2))),centerY=zoom===1?319:clamp(focus.y,Math.min(320,h/(scale*2)),Math.max(320,640-h/(scale*2)));return{scale,offsetX:Math.round(w/2-centerX*scale),offsetY:Math.round(h/2-centerY*scale)};}
function paintWater(c,time){for(let i=0;i<85;i++){const x=hash(i,83)*1040,y=hash(i,28)*640;if(inside(x,y)||inside(x-13,y-8))continue;const a=.2+.2*Math.sin(time/1900+i);c.globalAlpha=a;r(c,x+Math.round(Math.sin(time/1800+i)*4),y,6+hash(i,2)*21,1,'#a9bda0');if(i%4===0)r(c,x+6,y+4,7,1,'#8fb7a1');}c.globalAlpha=1;for(let i=0;i<ISLAND.length;i++){const a=ISLAND[i],b=ISLAND[(i+1)%ISLAND.length];if(i%3===0)continue;const f=.25+(Math.sin(time/2600+i)+1)*.12,x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f;const nx=(x-520)*.015,ny=(y-320)*.015+17;c.globalAlpha=.35+.14*Math.sin(time/1700+i);r(c,x+nx,y+ny,12+hash(i,9)*13,1,'#b6c9ac');r(c,x+nx+4,y+ny+3,9,1,'#709e8d');}c.globalAlpha=1;}
function screenLabel(c,text,x,y,scale,{selected=false,muted=false,compact=false}={}){const font=Math.max(11,Math.min(13,11*scale));c.font=`600 ${font}px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif`;c.textAlign='center';c.textBaseline='middle';const tw=c.measureText(text).width+(compact?8:18),height=compact?17:21;const bx=Math.round(x-tw/2),by=Math.round(y-height/2);r(c,bx,by,tw,height,selected?'#4b5138ee':'#122e30de');r(c,bx,by,tw,1,selected?'#e7c37a':'#a1b48b66');if(selected)r(c,bx,by+height-1,tw,1,'#e7c37a');c.fillStyle=muted?'#a8ba96':selected?'#ffe0a1':'#ebdfb8';c.fillText(text,Math.round(x),Math.round(y+.5));return{x:bx,y:by,width:tw,height};}
function selection(c,b,time,reduced=false){const pulse=reduced?1:.75+Math.sin(time/250)*.25;c.globalAlpha=pulse;const x=b.x-3,y=b.y-3,w=b.width+6,h=b.height+6;for(const [xx,yy,dx,dy]of [[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]]){r(c,xx+(dx<0?-12:0),yy,12,2,'#f5d189');r(c,xx,yy+(dy<0?-10:0),2,10,'#f5d189');}c.globalAlpha=1;}
function buildEffect(c,e,time){const p=getTownPlot(e.index??0),life=clamp((time-e.startedAt)/(e.duration||1100),0,1);if(life>=1)return;const x=p.foot.x,y=p.foot.y;light(c,x,y,60,24,(1-life)*.4);c.globalAlpha=1-life;for(let i=0;i<12;i++){const xx=x+Math.sin(i*2.4)*(10+life*40),yy=y-12-Math.cos(i*1.8)*15-life*42;r(c,xx,yy,2,6,'#ffdfa1');r(c,xx-2,yy+2,6,2,'#ffdfa1');}c.strokeStyle='#f2d18a';c.lineWidth=2;c.beginPath();c.ellipse(x,y+4,20+life*35,7+life*12,0,0,Math.PI*2);c.stroke();c.globalAlpha=1;}
/** Paints a town without reading or changing persistence. Hitboxes share its camera transform. */
export function drawTown(c,w,h,state,time=0,options={},drawPlayer=()=>{},drawIcon=()=>{}){
  const tr=townTransform(w,h,options),{scale,offsetX,offsetY}=tr,hero=options.townPlayer||TOWN_SPAWN;
  r(c,0,0,w,h,'#123b46');for(let i=0;i<70;i++){const xx=hash(i,178)*w,yy=hash(i,197)*h;c.globalAlpha=.11+hash(i,96)*.1;r(c,xx+Math.round(Math.sin(time/2200+i)*2),yy,5+hash(i,78)*14,1,'#90aea1');}c.globalAlpha=1;c.save();c.translate(offsetX,offsetY);c.scale(scale,scale);c.imageSmoothingEnabled=false;
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
