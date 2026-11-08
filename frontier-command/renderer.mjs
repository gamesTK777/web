/* Original cel-anime battlefield art. No downloaded art, runtime dependencies or fonts. */
const INK='#244456';
const TEAM = [
  {main:'#ee795b',light:'#ffd39a',dark:'#b84e54',flag:'#ff805d',ink:INK},
  {main:'#429ec4',light:'#a4e3ef',dark:'#37698f',flag:'#41b2dc',ink:INK}
];
const NEUTRAL = {main:'#9ba6bd',light:'#dbe2e4',dark:'#66788f',flag:'#f4e1a3',ink:INK};
const caches = new WeakMap();
const TAU = Math.PI * 2;
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
const mix = (a,b,t) => a+(b-a)*t;
const tileKey = (x,y) => `${x},${y}`;
function terrain(t) { const v=typeof t==='string'?t:t?.terrain;return ({plains:'grass',plain:'grass',woods:'forest',water:'sea'})[v]||v||'grass'; }
function tileAt(state,x,y) { return x<0||y<0||x>=state.width||y>=state.height?null:state.tiles[y*state.width+x]; }
function hash(x,y,s=0) {let n=((x+41)*374761393+(y+73)*668265263+s*1442695041)|0;n=(n^(n>>>13))*1274126177;return ((n^(n>>>16))>>>0)/4294967295;}
function polygon(c,points,fill,stroke=null,width=1) {c.beginPath();points.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function roundRect(c,x,y,w,h,r,fill,stroke=null,width=1) {r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}}
function ellipse(c,x,y,rx,ry,fill) {c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=fill;c.fill();}
function celEllipse(c,x,y,rx,ry,fill,width=1.8) {c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=fill;c.fill();c.strokeStyle=INK;c.lineWidth=width;c.stroke();}
function line(c,x1,y1,x2,y2,color,width=1) {c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function text(c,value,x,y,size,color,align='center',weight=700) {c.font=`${weight} ${size}px system-ui, -apple-system, "Yu Gothic", sans-serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(value,x,y);}

function grass(c,x,y,s,gx,gy) {
  c.fillStyle=['#8ac96f','#90cd73','#85c56b','#94cf75'][Math.floor(hash(gx,gy)*4)];c.fillRect(x,y,s,s);
  c.beginPath();c.moveTo(x,y+s*.72);c.bezierCurveTo(x+s*.25,y+s*.48,x+s*.55,y+s*.96,x+s,y+s*.6);c.lineTo(x+s,y+s);c.lineTo(x,y+s);c.closePath();c.fillStyle='#71b96624';c.fill();
  for(let i=0;i<11;i++){
    const px=x+s*(.08+hash(gx,gy,i+3)*.84),py=y+s*(.07+hash(gx,gy,i+33)*.86);
    const k=hash(gx,gy,i+101);
    if(k>.79){line(c,px-s*.03,py,px-s*.015,py-s*.055,'#5b9e62',s*.017);line(c,px-s*.015,py-s*.055,px,py,'#5b9e62',s*.017);line(c,px,py,px+s*.025,py-s*.035,'#5b9e62',s*.017);line(c,px,py,px+s*.008,py-s*.038,'#b2e48b',s*.014);}
    else if(k>.73){ellipse(c,px-s*.015,py,s*.022,s*.016,'#fff5d2');ellipse(c,px+s*.018,py,s*.022,s*.016,'#fff5d2');ellipse(c,px,py-s*.017,s*.017,s*.022,'#fff5d2');ellipse(c,px,py,s*.012,s*.012,'#ffd365');}
    else{c.fillStyle=k>.4?'#78b963':'#a7d97d';c.fillRect(Math.round(px),Math.round(py),s*.025,s*.014);}
  }
}
function connected(state,x,y,types) { return [[0,-1],[1,0],[0,1],[-1,0]].map(([dx,dy])=>types.includes(terrain(tileAt(state,x+dx,y+dy)))); }
function road(c,x,y,s,state,gx,gy) {
  const ns=connected(state,gx,gy,['road','bridge']);
  if(!ns.some(Boolean)){ns[1]=ns[3]=true;}
  c.lineCap='butt';c.lineJoin='round';
  for(const [width,color] of [[.5,'#639569'],[.445,'#aeaa78'],[.38,'#e5c692']]){
    c.beginPath();for(let i=0;i<4;i++)if(ns[i]){c.moveTo(x+s*.5,y+s*.5);c.lineTo(x+s*([.5,1,.5,0][i]),y+s*([0,.5,1,.5][i]));}c.strokeStyle=color;c.lineWidth=s*width;c.stroke();
  }
  ellipse(c,x+s*.5,y+s*.5,s*.19,s*.19,'#e5c692');
  for(let i=0;i<4;i++)if(ns[i]){
    const dx=[0,1,0,-1][i],dy=[-1,0,1,0][i];
    line(c,x+s*(.5+dx*.24),y+s*(.5+dy*.24),x+s*(.5+dx*.38),y+s*(.5+dy*.38),'#fff2c9',s*.029);
  }
}
function river(c,x,y,s,state,gx,gy) {
  const ns=connected(state,gx,gy,['river','sea','bridge']);if(!ns.some(Boolean)){ns[0]=ns[2]=true;}
  c.lineCap='butt';c.lineJoin='round';
  for(const [width,color] of [[.63,'#548f76'],[.57,'#e1d89f'],[.49,'#78d3c6'],[.37,'#42afd0']]){
    c.beginPath();for(let i=0;i<4;i++)if(ns[i]){c.moveTo(x+s*.5,y+s*.5);c.lineTo(x+s*([.5,1,.5,0][i]),y+s*([0,.5,1,.5][i]));}c.strokeStyle=color;c.lineWidth=s*width;c.stroke();
    ellipse(c,x+s*.5,y+s*.5,s*width/2,s*width/2,color);
  }
  const horiz=ns[1]||ns[3];for(let i=0;i<2;i++)line(c,x+s*(horiz?.24:.43+i*.13),y+s*(horiz?.44+i*.12:.21),x+s*(horiz?.4:.43+i*.13),y+s*(horiz?.44+i*.12:.39),'#c7f3df',s*.022);
}
function bridge(c,x,y,s,state,gx,gy) {
  river(c,x,y,s,state,gx,gy);
  const n=connected(state,gx,gy,['road','bridge']);const vertical=n[0]||n[2];
  c.save();c.translate(x+s/2,y+s/2);if(vertical)c.rotate(Math.PI/2);
  roundRect(c,-s*.52,-s*.25,s*1.04,s*.57,s*.025,'#355e69');
  roundRect(c,-s*.51,-s*.25,s*1.02,s*.48,s*.02,'#a7764e',INK,s*.025);
  for(let i=0;i<9;i++){const xx=-s*.49+i*s*.12;roundRect(c,xx,-s*.23,s*.105,s*.43,s*.008,i%2?'#edc58b':'#ddb376');line(c,xx+s*.025,-s*.17,xx+s*.08,-s*.17,'#ffe4b0',s*.02);line(c,xx+s*.025,s*.08,xx+s*.065,s*.08,'#bd8d5f',s*.012);}
  line(c,-s*.52,-s*.27,s*.52,-s*.27,INK,s*.07);line(c,-s*.52,-s*.29,s*.52,-s*.29,'#dfb47d',s*.035);line(c,-s*.52,s*.23,s*.52,s*.23,INK,s*.07);line(c,-s*.52,s*.21,s*.52,s*.21,'#ffe0a6',s*.035);
  for(const xx of [-.43,.43])for(const yy of [-.28,.22])roundRect(c,s*xx,s*yy,s*.055,s*.09,s*.01,'#c29164',INK,s*.018);c.restore();
}
function pine(c,x,y,s,variant=0) {
  ellipse(c,x+s*.09,y+s*.08,s*.3,s*.13,'#315a6540');
  roundRect(c,x-s*.04,y-s*.13,s*.085,s*.27,s*.02,'#9b714d',INK,s*.023);
  for(let i=0;i<3;i++){
    const w=s*(.35-i*.065),yy=y-s*(.13+i*.2);
    polygon(c,[[x-w,yy+s*.09],[x-w*.58,yy-s*.04],[x-w*.69,yy-s*.08],[x,yy-s*.4],[x+w*.66,yy-s*.08],[x+w*.56,yy-s*.04],[x+w,yy+s*.09]],['#358f69','#419d65','#50ab67'][(variant+i)%3],INK,s*.023);
    polygon(c,[[x-w*.83,yy+s*.045],[x,yy-s*.36],[x-s*.01,yy+s*.015]],i===2?'#a5dc79':'#7bc86d');
    line(c,x-w*.58,yy+s*.025,x-w*.2,yy-s*.035,'#b8e58c',s*.022);
  }
}
function broadTree(c,x,y,s,variant=0) {
  ellipse(c,x+s*.1,y+s*.1,s*.34,s*.13,'#315a653d');
  roundRect(c,x-s*.045,y-s*.28,s*.1,s*.42,s*.025,'#a1784e',INK,s*.023);
  line(c,x-s*.025,y-s*.14,x-s*.025,y+s*.065,'#d7b577',s*.025);
  // One hand-drawn scalloped silhouette, followed by two clearly separated cel planes.
  c.beginPath();c.moveTo(x-s*.31,y-s*.24);c.bezierCurveTo(x-s*.46,y-s*.31,x-s*.42,y-s*.55,x-s*.27,y-s*.56);c.bezierCurveTo(x-s*.31,y-s*.77,x-s*.02,y-s*.86,x+s*.08,y-s*.72);c.bezierCurveTo(x+s*.23,y-s*.83,x+s*.42,y-s*.63,x+s*.31,y-s*.5);c.bezierCurveTo(x+s*.47,y-s*.38,x+s*.34,y-s*.13,x+s*.19,y-s*.19);c.bezierCurveTo(x+s*.07,y-s*.05,x-s*.16,y-s*.13,x-s*.21,y-s*.22);c.closePath();c.fillStyle=variant?'#328e66':'#36996a';c.fill();c.strokeStyle=INK;c.lineWidth=s*.026;c.stroke();
  c.beginPath();c.moveTo(x-s*.34,y-s*.45);c.bezierCurveTo(x-s*.43,y-s*.58,x-s*.25,y-s*.63,x-s*.18,y-s*.6);c.bezierCurveTo(x-s*.18,y-s*.79,x+s*.03,y-s*.77,x+s*.09,y-s*.65);c.bezierCurveTo(x+s*.29,y-s*.69,x+s*.33,y-s*.48,x+s*.18,y-s*.46);c.bezierCurveTo(x+s*.15,y-s*.31,x-s*.05,y-s*.3,x-s*.12,y-s*.41);c.bezierCurveTo(x-s*.23,y-s*.35,x-s*.28,y-s*.39,x-s*.34,y-s*.45);c.closePath();c.fillStyle=variant?'#75c66d':'#8bd575';c.fill();
  c.beginPath();c.moveTo(x-s*.24,y-s*.6);c.quadraticCurveTo(x-s*.23,y-s*.72,x-s*.09,y-s*.69);c.moveTo(x+s*.06,y-s*.57);c.quadraticCurveTo(x+s*.14,y-s*.62,x+s*.19,y-s*.55);c.strokeStyle='#b5ea91';c.lineWidth=s*.035;c.lineCap='round';c.stroke();
  line(c,x-s*.1,y-s*.12,x+s*.08,y-s*.28,'#785f47',s*.032);
}
function forest(c,x,y,s,gx,gy) {
  ellipse(c,x+s*.43,y+s*.65,s*.38,s*.2,'#6bad65');
  if(hash(gx,gy)>.45){pine(c,x+s*.28,y+s*.63,s*.63);broadTree(c,x+s*.69,y+s*.62,s*.62,1);}
  else{broadTree(c,x+s*.29,y+s*.62,s*.62);pine(c,x+s*.7,y+s*.61,s*.68,1);}
  celEllipse(c,x+s*.14,y+s*.81,s*.11,s*.07,'#3f9e65',s*.018);ellipse(c,x+s*.17,y+s*.785,s*.075,s*.035,'#92d578');celEllipse(c,x+s*.86,y+s*.82,s*.075,s*.05,'#65b96e',s*.015);
}
function mountain(c,x,y,s) {
  ellipse(c,x+s*.53,y+s*.83,s*.4,s*.13,'#31556b3b');
  polygon(c,[[x+s*.035,y+s*.79],[x+s*.16,y+s*.52],[x+s*.28,y+s*.3],[x+s*.41,y+s*.54],[x+s*.58,y+s*.82]],'#6e9398',INK,s*.021);
  polygon(c,[[x+s*.035,y+s*.79],[x+s*.16,y+s*.52],[x+s*.28,y+s*.3],[x+s*.25,y+s*.74]],'#b6cdb3');
  polygon(c,[[x+s*.23,y+s*.85],[x+s*.41,y+s*.47],[x+s*.46,y+s*.44],[x+s*.59,y+s*.1],[x+s*.76,y+s*.42],[x+s*.82,y+s*.48],[x+s*.97,y+s*.85]],'#6b8d9d',INK,s*.024);
  polygon(c,[[x+s*.23,y+s*.85],[x+s*.41,y+s*.47],[x+s*.46,y+s*.44],[x+s*.59,y+s*.1],[x+s*.55,y+s*.7],[x+s*.64,y+s*.82]],'#b8d0ba');
  polygon(c,[[x+s*.59,y+s*.1],[x+s*.46,y+s*.44],[x+s*.55,y+s*.38],[x+s*.59,y+s*.46],[x+s*.65,y+s*.35],[x+s*.75,y+s*.41]],'#fff6d9');
  polygon(c,[[x+s*.59,y+s*.1],[x+s*.59,y+s*.46],[x+s*.65,y+s*.35],[x+s*.75,y+s*.41]],'#bfe3e0');
  polygon(c,[[x+s*.65,y+s*.49],[x+s*.78,y+s*.55],[x+s*.86,y+s*.77],[x+s*.73,y+s*.68]],'#4e728b');
  line(c,x+s*.34,y+s*.73,x+s*.46,y+s*.55,'#e8e8bd',s*.032);line(c,x+s*.71,y+s*.64,x+s*.76,y+s*.72,'#abc5bf',s*.019);
  celEllipse(c,x+s*.16,y+s*.85,s*.09,s*.045,'#9ab3a2',s*.016);celEllipse(c,x+s*.79,y+s*.87,s*.12,s*.05,'#adbfaa',s*.016);
}
function sea(c,x,y,s,state,gx,gy) {
  const ocean=c.createLinearGradient(0,0,0,state.height*s);ocean.addColorStop(0,'#58c5d7');ocean.addColorStop(1,'#2787b8');c.fillStyle=ocean;c.fillRect(x,y,s,s);
  const ns=[[0,-1],[1,0],[0,1],[-1,0]].map(([dx,dy])=>{const t=tileAt(state,gx+dx,gy+dy);return t&& !['sea','river'].includes(terrain(t));});
  for(let i=0;i<4;i++)if(ns[i]){
    c.save();c.translate(x+s*.5,y+s*.5);c.rotate(i*Math.PI/2);
    c.beginPath();c.moveTo(-s*.5,-s*.5);c.lineTo(s*.5,-s*.5);c.lineTo(s*.5,-s*.26);c.bezierCurveTo(s*.22,-s*.32,s*.15,-s*.14,0,-s*.23);c.bezierCurveTo(-s*.18,-s*.28,-s*.32,-s*.15,-s*.5,-s*.24);c.closePath();c.fillStyle='#6fdbc7';c.fill();
    c.beginPath();c.moveTo(-s*.5,-s*.5);c.lineTo(s*.5,-s*.5);c.lineTo(s*.5,-s*.42);c.bezierCurveTo(s*.15,-s*.34,-s*.18,-s*.43,-s*.5,-s*.37);c.closePath();c.fillStyle='#f3dd9c';c.fill();
    c.beginPath();c.moveTo(-s*.5,-s*.4);c.bezierCurveTo(-s*.18,-s*.45,s*.16,-s*.34,s*.5,-s*.43);c.strokeStyle='#47867a';c.lineWidth=s*.02;c.stroke();
    c.beginPath();c.moveTo(-s*.47,-s*.25);c.bezierCurveTo(-s*.13,-s*.15,s*.1,-s*.25,s*.4,-s*.25);c.strokeStyle='#e7fff0';c.lineWidth=s*.025;c.stroke();c.restore();
  }
  if(hash(gx,gy)> .91){ellipse(c,x+s*.63,y+s*.74,s*.13,s*.065,'#236e9d');celEllipse(c,x+s*.59,y+s*.7,s*.11,s*.065,'#799da9',s*.017);ellipse(c,x+s*.56,y+s*.68,s*.07,s*.035,'#b9d5ca');}
}

function makeCanvas(w,h) { if(typeof OffscreenCanvas!=='undefined')return new OffscreenCanvas(w,h);const c=document.createElement('canvas');c.width=w;c.height=h;return c; }
function staticMap(canvas,state,s) {
  const key=`${state.width}/${state.height}/${s}/`+state.tiles.map(t=>terrain(t)).join(',');let cache=caches.get(canvas);if(cache?.key===key)return cache.canvas;
  const layer=makeCanvas(state.width*s,state.height*s),c=layer.getContext('2d');c.lineJoin='round';c.lineCap='round';
  for(let y=0;y<state.height;y++)for(let x=0;x<state.width;x++){
    const t=terrain(tileAt(state,x,y)),xx=x*s,yy=y*s;grass(c,xx,yy,s,x,y);
    if(t==='sea')sea(c,xx,yy,s,state,x,y);else if(t==='road')road(c,xx,yy,s,state,x,y);else if(t==='river')river(c,xx,yy,s,state,x,y);else if(t==='bridge')bridge(c,xx,yy,s,state,x,y);else if(t==='forest')forest(c,xx,yy,s,x,y);else if(t==='mountain')mountain(c,xx,yy,s);
  }
  c.lineWidth=.8;c.strokeStyle='#305d5b21';c.beginPath();for(let x=1;x<state.width;x++){c.moveTo(x*s,.5);c.lineTo(x*s,state.height*s);}for(let y=1;y<state.height;y++){c.moveTo(.5,y*s);c.lineTo(state.width*s,y*s);}c.stroke();
  caches.set(canvas,{key,canvas:layer});return layer;
}
function animateWater(c,state,s,time) {
  for(let y=0;y<state.height;y++)for(let x=0;x<state.width;x++)if(['sea','river'].includes(terrain(tileAt(state,x,y)))){
    const isSea=terrain(tileAt(state,x,y))==='sea',phase=time/1800+hash(x,y)*TAU;
    for(let i=0;i<(isSea?2:1);i++){
      const xx=x*s+s*(.18+hash(x,y,i+21)*.4),yy=y*s+s*(isSea?.28+i*.37:.5);
      c.beginPath();c.moveTo(xx,yy);c.quadraticCurveTo(xx+s*.045,yy-Math.sin(phase+i)*s*.025,xx+s*.09,yy);c.quadraticCurveTo(xx+s*.145,yy+s*.022,xx+s*.2,yy);c.strokeStyle=`rgba(231,255,244,${.38+Math.sin(phase+i)*.17})`;c.lineWidth=s*.022;c.stroke();
      if(isSea&&hash(x,y,i+13)>.8){const a=.15+Math.max(0,Math.sin(phase*1.4))*.4;line(c,xx+s*.25,yy-s*.06,xx+s*.25,yy+s*.015,`rgba(255,254,225,${a})`,s*.018);line(c,xx+s*.22,yy-s*.022,xx+s*.28,yy-s*.022,`rgba(255,254,225,${a})`,s*.018);}
    }
  }
}
function house(c,x,y,s,p,small=false) {
  const w=s*(small?.37:.61),h=s*(small?.29:.43);ellipse(c,x+w*.63,y+h*1.02,w*.61,h*.23,'#294f6936');
  roundRect(c,x,y+h*.18,w,h*.82,s*.018,'#fff1c9',INK,s*.022);polygon(c,[[x+w*.73,y+h*.2],[x+w,y+h*.26],[x+w,y+h],[x+w*.73,y+h*.93]],'#a5c2bd');
  polygon(c,[[x-s*.035,y+h*.28],[x+w*.42,y-h*.18],[x+w+s*.045,y+h*.24],[x+w*.65,y+h*.51]],p.dark,INK,s*.027);
  polygon(c,[[x-s*.035,y+h*.16],[x+w*.4,y-h*.24],[x+w+s*.045,y+h*.12],[x+w*.65,y+h*.4]],p.main,INK,s*.025);
  polygon(c,[[x-s*.015,y+h*.145],[x+w*.4,y-h*.21],[x+w*.63,y+h*.36]],p.light);
  for(let i=1;i<=3;i++){const t=i/4;line(c,mix(x+w*.4,x+w*.65,t),mix(y-h*.24,y+h*.4,t),mix(x+w*.4,x+w+s*.045,t),mix(y-h*.24,y+h*.12,t),p.dark,s*.012);}
  line(c,x+w*.4,y-h*.24,x+w+s*.045,y+h*.12,'#fff0cb',s*.021);
  roundRect(c,x+w*.17,y+h*.53,w*.2,h*.26,s*.012,'#54aaca',INK,s*.016);line(c,x+w*.18,y+h*.56,x+w*.29,y+h*.56,'#cff7ef',s*.025);line(c,x+w*.27,y+h*.55,x+w*.27,y+h*.78,'#fff1cd',s*.013);
  roundRect(c,x+w*.5,y+h*.6,w*.16,h*.33,s*.01,'#7c9aa0',INK,s*.015);ellipse(c,x+w*.61,y+h*.77,s*.012,s*.012,'#ffd987');
  polygon(c,[[x+w*.46,y+h*.54],[x+w*.69,y+h*.54],[x+w*.74,y+h*.65],[x+w*.44,y+h*.65]],p.light,INK,s*.013);
  line(c,x+w*.46,y+h*.96,x+w*.74,y+h*.96,'#b9bfa3',s*.04);
}
function flag(c,x,y,s,p,time=0) {
  line(c,x,y,x,y-s*.44,INK,s*.035);line(c,x-s*.005,y-s*.02,x-s*.005,y-s*.44,'#e9f0d0',s*.013);ellipse(c,x,y+s*.01,s*.065,s*.024,'#597e67');
  const w=s*.27,top=y-s*.44,bend=Math.sin(time/600+x)*s*.018;c.beginPath();c.moveTo(x,top);c.quadraticCurveTo(x+w*.4,top-s*.035,x+w,top+bend);c.lineTo(x+w,top+s*.15+bend);c.quadraticCurveTo(x+w*.4,top+s*.12,x,top+s*.16);c.closePath();c.fillStyle=p.flag;c.fill();c.strokeStyle=INK;c.lineWidth=s*.014;c.stroke();
  text(c,'★',x+w*.44,top+s*.067,s*.09,'#fff4c9');
}
function building(c,t,x,y,s,time) {
  const p=Number.isInteger(t.owner)?TEAM[t.owner]||NEUTRAL:NEUTRAL;
  roundRect(c,x+s*.08,y+s*.18,s*.84,s*.71,s*.06,'#619870');roundRect(c,x+s*.11,y+s*.19,s*.78,s*.66,s*.04,'#e5d8b3','#67877c',s*.014);
  for(const [xx,yy] of [[.15,.75],[.4,.77],[.7,.8]])line(c,x+s*xx,y+s*yy,x+s*(xx+.1),y+s*yy,'#f8ebca',s*.02);
  if(t.building==='city'){
    house(c,x+s*.17,y+s*.29,s,p,true);house(c,x+s*.5,y+s*.46,s,p,true);
    celEllipse(c,x+s*.18,y+s*.75,s*.09,s*.045,'#5cb567',s*.012);ellipse(c,x+s*.17,y+s*.73,s*.06,s*.024,'#a1dc78');flag(c,x+s*.72,y+s*.45,s*.65,p,time);
  }else if(t.building==='factory'){
    ellipse(c,x+s*.54,y+s*.77,s*.39,s*.12,'#294f6938');roundRect(c,x+s*.18,y+s*.36,s*.64,s*.37,s*.025,'#f1edcf',INK,s*.021);
    polygon(c,[[x+s*.15,y+s*.38],[x+s*.34,y+s*.22],[x+s*.34,y+s*.32],[x+s*.54,y+s*.2],[x+s*.54,y+s*.32],[x+s*.83,y+s*.3],[x+s*.85,y+s*.45]],p.dark,INK,s*.019);
    polygon(c,[[x+s*.15,y+s*.33],[x+s*.34,y+s*.17],[x+s*.34,y+s*.28],[x+s*.54,y+s*.15],[x+s*.54,y+s*.28],[x+s*.82,y+s*.26],[x+s*.85,y+s*.39]],p.main,INK,s*.023);
    line(c,x+s*.22,y+s*.31,x+s*.33,y+s*.21,p.light,s*.03);line(c,x+s*.42,y+s*.28,x+s*.53,y+s*.18,p.light,s*.03);
    roundRect(c,x+s*.3,y+s*.45,s*.3,s*.27,s*.008,'#4a7581',INK,s*.018);for(let i=0;i<3;i++)line(c,x+s*.31,y+s*(.5+i*.062),x+s*.59,y+s*(.5+i*.062),'#a6c8b7',s*.023);
    roundRect(c,x+s*.65,y+s*.43,s*.1,s*.105,s*.008,'#57b7d4',INK,s*.016);line(c,x+s*.665,y+s*.46,x+s*.715,y+s*.46,'#c3f8ef',s*.022);roundRect(c,x+s*.7,y+s*.14,s*.08,s*.18,s*.006,'#e2d6b8',INK,s*.015);roundRect(c,x+s*.69,y+s*.12,s*.1,s*.04,s*.009,p.dark);flag(c,x+s*.15,y+s*.66,s*.55,p,time);
    for(let i=0;i<2;i++){const f=(time/1800+i*.45)%1;ellipse(c,x+s*(.74+f*.07),y+s*(.09-f*.17),s*(.035+f*.04),s*(.025+f*.025),`rgba(246,246,219,${(1-f)*.43})`);}
  }else if(t.building==='airfield'){
    roundRect(c,x+s*.15,y+s*.28,s*.7,s*.45,s*.055,'#afc9b6',INK,s*.02);roundRect(c,x+s*.19,y+s*.34,s*.62,s*.31,s*.025,'#547d8d');
    for(let i=0;i<3;i++)roundRect(c,x+s*(.24+i*.2),y+s*.475,s*.11,s*.018,s*.007,'#e6dfbb');
    for(const xx of [.2,.77])line(c,x+s*xx,y+s*.36,x+s*xx,y+s*.61,'#d8dcbb',s*.025);
    roundRect(c,x+s*.19,y+s*.16,s*.15,s*.22,s*.01,'#fff0c9',INK,s*.018);roundRect(c,x+s*.17,y+s*.12,s*.19,s*.1,s*.018,p.main,INK,s*.018);roundRect(c,x+s*.2,y+s*.14,s*.13,s*.04,s*.005,'#b4f3ec');flag(c,x+s*.68,y+s*.3,s*.68,p,time);
  }else{
    house(c,x+s*.19,y+s*.32,s,p);roundRect(c,x+s*.43,y+s*.11,s*.19,s*.36,s*.018,'#ffedc2',INK,s*.021);polygon(c,[[x+s*.38,y+s*.14],[x+s*.52,y+s*.02],[x+s*.67,y+s*.15]],p.main,INK,s*.025);polygon(c,[[x+s*.4,y+s*.13],[x+s*.52,y+s*.035],[x+s*.53,y+s*.13]],p.light);celEllipse(c,x+s*.525,y+s*.23,s*.055,s*.055,p.dark,s*.014);text(c,'★',x+s*.525,y+s*.23,s*.085,'#ffe89f');flag(c,x+s*.77,y+s*.35,s*.78,p,time);
  }
  const label={city:'都',factory:'工',hq:'本',airfield:'飛'}[t.building]||'';
  roundRect(c,x+s*.075,y+s*.72,s*.22,s*.2,s*.035,p.dark,INK,s*.018);text(c,label,x+s*.185,y+s*.825,s*.115,'#fff5d5');
  if(t.capture<20&&t.capture>0){roundRect(c,x+s*.31,y+s*.86,s*.53,s*.045,s*.02,'#5c6a5599');roundRect(c,x+s*.31,y+s*.86,s*.53*(1-t.capture/20),s*.045,s*.02,TEAM[t.capturingTeam]?.light||'#f4e4ac');}
}

function soldier(c,x,y,s,p) {
  ellipse(c,x+s*.035,y+s*.2,s*.16,s*.06,'#254d633b');
  // Deliberately oversized head and short limbs: readable original chibi soldiers.
  roundRect(c,x-s*.1,y+s*.02,s*.082,s*.16,s*.025,p.dark,INK,s*.024);roundRect(c,x+s*.018,y+s*.015,s*.082,s*.16,s*.025,p.main,INK,s*.024);
  roundRect(c,x-s*.128,y+s*.14,s*.12,s*.066,s*.025,INK);roundRect(c,x+s*.01,y+s*.14,s*.13,s*.066,s*.025,INK);
  roundRect(c,x-s*.115,y-s*.12,s*.23,s*.2,s*.05,p.main,INK,s*.027);polygon(c,[[x-s*.085,y-s*.095],[x-s*.02,y-s*.11],[x+s*.055,y+s*.035],[x+s*.01,y+s*.045]],p.light);
  roundRect(c,x-s*.175,y-s*.09,s*.085,s*.155,s*.035,p.main,INK,s*.02);celEllipse(c,x-s*.13,y+s*.045,s*.045,s*.042,'#ffd4b1',s*.016);
  roundRect(c,x+s*.09,y-s*.1,s*.085,s*.145,s*.035,p.light,INK,s*.02);
  line(c,x+s*.15,y+s*.07,x+s*.255,y-s*.205,INK,s*.055);line(c,x+s*.155,y+s*.04,x+s*.22,y-s*.12,'#a8815c',s*.041);line(c,x+s*.225,y-s*.18,x+s*.265,y-s*.2,'#8eafbb',s*.025);celEllipse(c,x+s*.15,y-s*.02,s*.045,s*.041,'#ffd4b1',s*.016);
  celEllipse(c,x,y-s*.23,s*.144,s*.14,'#ffd4b1',s*.027);polygon(c,[[x+s*.075,y-s*.33],[x+s*.126,y-s*.25],[x+s*.114,y-s*.16],[x+s*.04,y-s*.105],[x+s*.068,y-s*.235]],'#e8a880');
  celEllipse(c,x-s*.005,y-s*.335,s*.174,s*.119,p.main,s*.028);ellipse(c,x-s*.061,y-s*.379,s*.085,s*.025,p.light);roundRect(c,x-s*.177,y-s*.329,s*.35,s*.062,s*.023,p.dark,INK,s*.022);
  roundRect(c,x-s*.04,y-s*.383,s*.074,s*.066,s*.016,p.light,INK,s*.014);text(c,'★',x-s*.003,y-s*.35,s*.05,'#fff4ce');
  celEllipse(c,x-s*.058,y-s*.205,s*.025,s*.035,'#fcf9ed',s*.008);celEllipse(c,x+s*.06,y-s*.205,s*.025,s*.035,'#fcf9ed',s*.008);ellipse(c,x-s*.052,y-s*.2,s*.012,s*.023,INK);ellipse(c,x+s*.066,y-s*.2,s*.012,s*.023,INK);ellipse(c,x-s*.056,y-s*.215,s*.006,s*.007,'#ffffff');ellipse(c,x+s*.062,y-s*.215,s*.006,s*.007,'#ffffff');
  c.beginPath();c.moveTo(x-s*.028,y-s*.135);c.quadraticCurveTo(x+s*.004,y-s*.11,x+s*.037,y-s*.139);c.strokeStyle='#a86453';c.lineWidth=s*.013;c.stroke();
  line(c,x-s*.106,y+s*.036,x+s*.095,y+s*.036,p.dark,s*.036);roundRect(c,x-s*.021,y+s*.015,s*.047,s*.041,s*.008,'#ffe4a0',INK,s*.009);
}
function tracks(c,w,h,p,heavy=false) {
  roundRect(c,-w*.52,-h*.46,w*1.04,h*.92,7,INK);
  for(const yy of [-h*.48,h*.21]){
    roundRect(c,-w*.55,yy,w*1.1,h*.3,4,'#394f65',INK,w*.035);
    for(let i=0;i<5;i++){celEllipse(c,-w*.42+i*w*.21,yy+h*.155,w*.071,h*.1,'#74939d',w*.018);ellipse(c,-w*.42+i*w*.21,yy+h*.155,w*.024,h*.038,'#c5d3c5');}
  }
  polygon(c,[[-w*.49,-h*.24],[w*.36,-h*.24],[w*.54,-h*.04],[w*.46,h*.38],[-w*.46,h*.38]],p.dark,INK,w*.032);
  polygon(c,[[-w*.49,-h*.35],[w*.34,-h*.35],[w*.54,-h*.16],[w*.46,h*.2],[-w*.46,h*.2]],p.main,INK,w*.031);
  polygon(c,[[-w*.46,-h*.325],[w*.33,-h*.325],[w*.42,-h*.225],[-w*.38,-h*.225]],p.light);
  line(c,-w*.4,h*.12,w*.37,h*.12,p.light,w*.028);for(const xx of [-.3,-.12,.06])line(c,w*xx,h*.015,w*(xx+.1),h*.015,p.dark,w*.023);
  if(heavy)for(const yy of [-h*.37,h*.16])roundRect(c,-w*.46,yy,w*.73,h*.16,2,p.light,INK,w*.018);
}
function tank(c,s,p,heavy=false) {
  c.save();c.rotate(-.24);tracks(c,s*(heavy?.73:.64),s*(heavy?.52:.44),p,heavy);
  const tw=s*(heavy?.43:.37);roundRect(c,-tw*.52,-s*.215,tw,s*.285,s*.065,p.dark,INK,s*.028);roundRect(c,-tw*.52,-s*.28,tw,s*.275,s*.065,p.main,INK,s*.028);
  polygon(c,[[-tw*.46,-s*.25],[tw*.27,-s*.25],[tw*.42,-s*.17],[-tw*.44,-s*.13]],p.light);celEllipse(c,-s*.055,-s*.175,s*.07,s*.048,p.dark,s*.015);line(c,-s*.095,-s*.19,-s*.025,-s*.19,p.light,s*.02);
  const bars=heavy?[-.15,-.045]:[-.09];for(const yy of bars){line(c,s*.09,s*yy,s*.465,s*yy-s*.05,INK,s*(heavy?.085:.081));line(c,s*.09,s*yy-s*.012,s*.46,s*yy-s*.063,p.main,s*.055);line(c,s*.11,s*yy-s*.025,s*.45,s*yy-s*.075,p.light,s*.02);polygon(c,[[s*.4,s*yy-s*.085],[s*.49,s*yy-s*.093],[s*.505,s*yy-s*.007],[s*.415,s*yy+s*.005]],p.dark,INK,s*.018);}
  line(c,-s*.235,-s*.205,-s*.285,-s*.4,INK,s*.017);ellipse(c,-s*.285,-s*.4,s*.017,s*.017,'#ffe49a');
  text(c,heavy?'★':'›',-s*.15,s*.09,s*.12,'#fff0b8');if(heavy){roundRect(c,-s*.34,-s*.115,s*.12,s*.14,s*.025,p.dark,INK,s*.016);line(c,-s*.32,-s*.1,-s*.26,-s*.1,'#ffe5a2',s*.025);}c.restore();
}
function jeep(c,s,p) {
  c.save();c.rotate(-.22);
  for(const yy of [-.23,.13])for(const xx of [-.27,.25]){roundRect(c,s*(xx-.075),s*yy,s*.155,s*.18,s*.045,'#334d61',INK,s*.024);celEllipse(c,s*xx,s*(yy+.1),s*.046,s*.054,'#92acb3',s*.012);}
  polygon(c,[[-s*.38,-s*.11],[s*.33,-s*.11],[s*.44,s*.02],[s*.37,s*.24],[-s*.37,s*.24]],p.dark,INK,s*.027);
  polygon(c,[[-s*.38,-s*.18],[s*.31,-s*.18],[s*.44,-s*.05],[s*.37,s*.14],[-s*.37,s*.14]],p.main,INK,s*.027);
  roundRect(c,-s*.2,-s*.32,s*.39,s*.34,s*.07,p.light,INK,s*.027);polygon(c,[[-s*.11,-s*.275],[s*.13,-s*.275],[s*.17,-s*.115],[-s*.1,-s*.115]],'#5c9db4',INK,s*.018);polygon(c,[[-s*.09,-s*.26],[s*.04,-s*.26],[-s*.075,-s*.14]],'#d7f8f2');line(c,-s*.15,-s*.27,-s*.15,-s*.035,p.main,s*.035);
  roundRect(c,s*.22,-s*.16,s*.16,s*.17,s*.035,p.light,INK,s*.018);line(c,s*.31,-s*.09,s*.385,-s*.025,'#fff7cc',s*.045);line(c,s*.35,s*.09,s*.4,s*.09,INK,s*.024);
  roundRect(c,-s*.41,-s*.13,s*.075,s*.23,s*.028,'#668795',INK,s*.018);line(c,-s*.3,-s*.19,-s*.355,-s*.44,INK,s*.016);ellipse(c,-s*.355,-s*.44,s*.014,s*.014,'#ffe39d');c.restore();
}
function artillery(c,s,p,antiair=false) {
  c.save();c.rotate(-.18);tracks(c,s*.61,s*.4,p,false);
  roundRect(c,-s*.25,-s*.22,s*.38,s*.27,s*.04,p.dark,INK,s*.025);polygon(c,[[-s*.25,-s*.24],[s*.02,-s*.28],[s*.18,-s*.13],[-s*.18,-s*.04]],p.main,INK,s*.025);polygon(c,[[-s*.22,-s*.22],[-s*.04,-s*.25],[s*.08,-s*.17],[-s*.17,-s*.09]],p.light);
  if(antiair){
    roundRect(c,-s*.105,-s*.265,s*.3,s*.21,s*.05,p.light,INK,s*.025);for(const off of [-.07,.05]){line(c,s*.05+s*off,-s*.18,s*.25+s*off,-s*.41,INK,s*.075);line(c,s*.045+s*off,-s*.195,s*.24+s*off,-s*.425,p.main,s*.044);line(c,s*.045+s*off,-s*.21,s*.235+s*off,-s*.44,p.light,s*.018);}
    line(c,-s*.245,-s*.13,-s*.26,-s*.395,INK,s*.025);c.beginPath();c.ellipse(-s*.26,-s*.4,s*.13,s*.06,-.5,0,TAU);c.fillStyle=p.main;c.fill();c.strokeStyle=INK;c.lineWidth=s*.022;c.stroke();line(c,-s*.34,-s*.36,-s*.18,-s*.44,p.light,s*.024);line(c,-s*.25,-s*.45,-s*.28,-s*.34,INK,s*.014);text(c,'+',-s*.12,s*.1,s*.135,'#fff0be');
  }else{
    celEllipse(c,-s*.025,-s*.14,s*.145,s*.115,p.light,s*.024);line(c,-s*.015,-s*.16,s*.29,-s*.425,INK,s*.132);line(c,-s*.023,-s*.175,s*.285,-s*.44,p.main,s*.089);line(c,-s*.04,-s*.19,s*.27,-s*.46,p.light,s*.03);polygon(c,[[s*.22,-s*.405],[s*.31,-s*.49],[s*.395,-s*.405],[s*.3,-s*.32]],p.dark,INK,s*.023);line(c,s*.28,-s*.43,s*.34,-s*.38,p.light,s*.022);line(c,-s*.045,-s*.09,s*.12,-s*.01,INK,s*.032);text(c,'Ⅱ',-s*.18,s*.1,s*.115,'#fff0be');
  }c.restore();
}
function helicopter(c,s,p,time=0) {
  c.save();c.rotate(-.22);line(c,-s*.26,s*.18,s*.23,s*.18,INK,s*.035);line(c,-s*.22,s*.09,-s*.23,s*.18,INK,s*.03);line(c,s*.13,s*.08,s*.15,s*.18,INK,s*.03);line(c,-s*.23,s*.16,s*.21,s*.16,'#b9d7da',s*.014);
  polygon(c,[[-s*.08,-s*.1],[-s*.46,-s*.17],[-s*.49,-s*.09],[-s*.19,s*.04]],p.dark,INK,s*.024);polygon(c,[[-s*.43,-s*.17],[-s*.48,-s*.34],[-s*.55,-s*.3],[-s*.49,-s*.1]],p.main,INK,s*.023);line(c,-s*.46,-s*.18,-s*.1,-s*.08,p.light,s*.026);
  celEllipse(c,s*.055,-s*.015,s*.285,s*.16,p.dark,s*.025);celEllipse(c,s*.035,-s*.085,s*.285,s*.17,p.main,s*.026);ellipse(c,-s*.05,-s*.17,s*.13,s*.041,p.light);
  c.beginPath();c.moveTo(s*.09,-s*.22);c.bezierCurveTo(s*.23,-s*.25,s*.37,-s*.12,s*.3,-s*.025);c.lineTo(s*.1,-s*.035);c.closePath();c.fillStyle='#376e9b';c.fill();c.strokeStyle=INK;c.lineWidth=s*.02;c.stroke();polygon(c,[[s*.13,-s*.205],[s*.24,-s*.17],[s*.13,-s*.075]],'#b9f1ed');line(c,s*.21,-s*.19,s*.18,-s*.035,INK,s*.016);
  roundRect(c,-s*.17,-s*.065,s*.1,s*.065,s*.02,p.light,INK,s*.012);line(c,-s*.07,-s*.23,-s*.07,-s*.3,INK,s*.042);
  c.save();c.translate(-s*.07,-s*.31);c.rotate(Math.sin(time/120)*.24);line(c,-s*.45,0,s*.45,0,INK,s*.032);line(c,-s*.39,-s*.012,s*.38,-s*.012,'#cce9dd',s*.014);line(c,0,-s*.23,0,s*.23,INK,s*.022);celEllipse(c,0,0,s*.045,s*.029,p.light,s*.014);c.restore();line(c,-s*.545,-s*.18,-s*.4,-s*.115,INK,s*.022);line(c,-s*.49,-s*.225,-s*.46,-s*.075,INK,s*.018);c.restore();
}
function fighter(c,s,p) {
  c.save();c.rotate(-.37);
  polygon(c,[[-s*.5,s*.035],[-s*.2,-s*.06],[-s*.29,-s*.38],[-s*.16,-s*.4],[s*.13,-s*.12],[s*.44,-s*.075],[s*.56,-s*.015],[s*.4,s*.08],[s*.12,s*.1],[-s*.15,s*.34],[-s*.29,s*.33],[-s*.19,s*.075]],p.dark,INK,s*.027);
  polygon(c,[[-s*.5,-s*.005],[-s*.2,-s*.105],[-s*.29,-s*.4],[-s*.16,-s*.43],[s*.13,-s*.16],[s*.44,-s*.115],[s*.56,-s*.055],[s*.4,s*.04],[s*.12,s*.065],[-s*.15,s*.3],[-s*.29,s*.29],[-s*.19,s*.035]],p.main,INK,s*.027);
  polygon(c,[[-s*.48,-s*.01],[s*.535,-s*.055],[s*.41,-s*.09],[s*.11,-s*.13],[-s*.19,-s*.08]],p.light);polygon(c,[[s*.105,-s*.135],[-s*.17,-s*.39],[-s*.24,-s*.38],[-s*.04,-s*.14]],p.light);
  polygon(c,[[s*.14,-s*.145],[s*.35,-s*.09],[s*.27,-s*.035],[s*.095,-s*.045]],'#397294',INK,s*.019);line(c,s*.16,-s*.124,s*.27,-s*.094,'#d8faf1',s*.023);line(c,-s*.2,-s*.32,-s*.12,-s*.25,'#fff1c5',s*.047);line(c,-s*.19,s*.21,-s*.1,s*.14,'#fff1c5',s*.047);
  polygon(c,[[-s*.44,-s*.012],[-s*.37,-s*.245],[-s*.27,-s*.205],[-s*.3,-s*.01]],p.main,INK,s*.022);polygon(c,[[-s*.405,-s*.035],[-s*.36,-s*.2],[-s*.325,-s*.165],[-s*.34,-s*.035]],p.light);roundRect(c,-s*.49,-s*.033,s*.07,s*.067,s*.015,INK);c.restore();
}
function unitSprite(c,unit,x,y,s,time,selected=false,badge=true) {
  const original=TEAM[unit.team]||TEAM[0],p=unit.acted?{...original,main:unit.team?'#7fa3b4':'#bc9386',light:unit.team?'#bad2d6':'#e2c6ab',dark:unit.team?'#5f7d94':'#916c70'}:original;
  const air=['fighter','helicopter'].includes(unit.type),bob=air?Math.sin(time/470+String(unit.id).length)*s*.018:0;
  ellipse(c,x+s*.04,y+s*.17,s*(air?.29:.31),s*.105,air?'#254e7146':'#3055683b');
  c.save();c.translate(x,y+(air?-s*.085+bob:0));
  if(unit.acted)c.globalAlpha=.82;
  if(unit.type==='infantry'){
    soldier(c,-s*.15,-s*.045,s*.71,p);soldier(c,s*.12,s*.065,s*.79,p);
  }else if(unit.type==='recon')jeep(c,s,p);else if(unit.type==='heavy')tank(c,s,p,true);else if(unit.type==='artillery')artillery(c,s,p);else if(unit.type==='antiair')artillery(c,s,p,true);else if(unit.type==='fighter')fighter(c,s,p);else if(unit.type==='helicopter'){c.scale(.86,.86);helicopter(c,s,p,time);}else tank(c,s,p);
  c.restore();
  if(!badge)return;
  const bx=x+s*.22,by=y+s*.3;
  roundRect(c,bx-s*.12,by-s*.08,s*.27,s*.19,s*.055,unit.hp<=3?'#b74752':'#fff4d8',INK,s*.019);roundRect(c,bx-s*.115,by-s*.075,s*.045,s*.18,s*.018,original.flag);text(c,String(Math.ceil(unit.hp)),bx+s*.03,by+s*.016,s*.13,unit.hp<=3?'#fff4d7':INK);
  if(unit.acted){celEllipse(c,x-s*.26,y+s*.3,s*.073,s*.073,'#ebf1d4',s*.013);c.beginPath();c.moveTo(x-s*.297,y+s*.3);c.lineTo(x-s*.27,y+s*.326);c.lineTo(x-s*.228,y+s*.274);c.strokeStyle='#507d79';c.lineWidth=s*.025;c.stroke();}
  if(selected){ellipse(c,x-s*.28,y-s*.27,s*.035,s*.035,'#fff3c9');}
}

/** Paint a reusable portrait icon into either a canvas or a 2D context. */
export function drawUnitIcon(canvasOrCtx,type,team=0,options={}) {
  const canvas=canvasOrCtx?.getContext?canvasOrCtx:canvasOrCtx?.canvas;
  const c=canvasOrCtx?.getContext?canvasOrCtx.getContext('2d'):canvasOrCtx;if(!canvas||!c)return;
  const width=options.width||canvas.width||96,height=options.height||canvas.height||96,s=Math.min(width,height)*.85;
  c.save();if(options.clear!==false)c.clearRect(0,0,width,height);c.lineCap='round';c.lineJoin='round';
  if(options.background!==false){roundRect(c,0,0,width,height,Math.min(width,height)*.15,'#c4e8e9');ellipse(c,width*.5,height*.63,width*.34,height*.16,'#8ec67e');}
  unitSprite(c,{type,team,hp:options.hp??10,acted:!!options.acted,id:'icon'},width*.5,height*.5,s,options.time||0,false,!!options.badge);c.restore();
}

/** One combatant, never an HP-scaled group. Infantry is exactly one person. */
export function drawCombatUnit(c,type,team,x,y,size,options={}) {
  if(!c||!Number.isFinite(x)||!Number.isFinite(y)||!Number.isFinite(size)||size<=0)return;
  const p=TEAM[team]||TEAM[0],facing=options.facing===-1?-1:1,time=Number.isFinite(options.time)?options.time:0;
  const recoil=Number.isFinite(options.recoil)?clamp(options.recoil,0,.1):0;
  c.save();c.translate(x,y);c.scale(facing,1);c.translate(-size*recoil,0);c.lineCap='round';c.lineJoin='round';
  if(Number.isFinite(options.alpha))c.globalAlpha=clamp(options.alpha,0,1);
  if(type==='infantry')soldier(c,0,0,size,p);
  else if(type==='recon')jeep(c,size,p);
  else if(type==='heavy')tank(c,size,p,true);
  else if(type==='artillery')artillery(c,size,p,false);
  else if(type==='antiair')artillery(c,size,p,true);
  else if(type==='fighter')fighter(c,size,p);
  else if(type==='helicopter'){c.scale(.86,.86);helicopter(c,size,p,time);}
  else tank(c,size,p,false);
  c.restore();
}
function brackets(c,x,y,s,color,width=3) {
  c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';const p=s*.08,l=s*.19;
  for(const [xx,yy,dx,dy] of [[x+p,y+p,1,1],[x+s-p,y+p,-1,1],[x+p,y+s-p,1,-1],[x+s-p,y+s-p,-1,-1]]){c.beginPath();c.moveTo(xx,yy+dy*l);c.lineTo(xx,yy);c.lineTo(xx+dx*l,yy);c.stroke();}
}
function overlays(c,state,view,s,time) {
  const moves=Array.isArray(view.moves)?view.moves:[],targets=Array.isArray(view.targets)?view.targets:[];
  for(const move of moves){if(!Number.isFinite(move.x)||!Number.isFinite(move.y))continue;const x=move.x*s,y=move.y*s;roundRect(c,x+s*.055,y+s*.055,s*.89,s*.89,s*.08,'#d9ffff3b','#236d9799',s*.021);ellipse(c,x+s*.5,y+s*.79,s*.032,s*.02,'#fffbe0d0');}
  for(const target of targets){const x=target.x*s,y=target.y*s;roundRect(c,x+s*.07,y+s*.07,s*.86,s*.86,s*.08,'#ef665747','#ac4057c0',s*.027);brackets(c,x+s*.06,y+s*.06,s*.88,'#fff1be',s*.03);}
  const cursor=view.cursor;const selected=state.units.find(u=>u.id===view.selectedId);
  const cursorMove=cursor&&moves.find(m=>m.x===cursor.x&&m.y===cursor.y);
  const path=view.path||cursorMove?.path;
  if(Array.isArray(path)&&path.length){
    c.save();c.beginPath();const pts=path.map(p=>Array.isArray(p)?{x:p[0],y:p[1]}:p).filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
    pts.forEach((p,i)=>i?c.lineTo((p.x+.5)*s,(p.y+.5)*s):c.moveTo((p.x+.5)*s,(p.y+.5)*s));c.strokeStyle='#315c5b88';c.lineWidth=s*.085;c.lineJoin='round';c.stroke();c.setLineDash([s*.08,s*.07]);c.strokeStyle='#fff3c7';c.lineWidth=s*.035;c.stroke();c.restore();
  }
  if(selected){const x=selected.x*s,y=selected.y*s;roundRect(c,x+s*.06,y+s*.06,s*.88,s*.88,s*.1,'#fff6b821');brackets(c,x,y,s,'#fff3bc',s*.045);brackets(c,x+s*.025,y+s*.025,s*.95,TEAM[selected.team]?.dark||'#435e50',s*.016);}
  if(cursor&&cursor.x>=0&&cursor.y>=0&&cursor.x<state.width&&cursor.y<state.height){const x=cursor.x*s,y=cursor.y*s;c.save();c.setLineDash([s*.065,s*.045]);roundRect(c,x+s*.025,y+s*.025,s*.95,s*.95,s*.055,null,'#314f49c7',s*.02);c.restore();}
  if(view.selectedBuilding){const b=view.selectedBuilding;brackets(c,b.x*s,b.y*s,s,'#fff3bc',s*.035);}
}
function effect(c,e,s,time) {
  if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return;
  const elapsed=Math.max(0,time-(e.startedAt??time)),life=e.type==='attack'?720:950,t=clamp(elapsed/life,0,1);if(t>=1)return;
  const x=(e.x+.5)*s,y=(e.y+.5)*s;c.save();c.globalAlpha=1-t;
  if(e.type==='attack'){
    if(Number.isFinite(e.fromX)&&Number.isFinite(e.fromY)&&t<.4){const k=clamp(t/.25,0,1),xx=mix((e.fromX+.5)*s,x,k),yy=mix((e.fromY+.5)*s,y,k);line(c,xx-s*.13,yy+s*.05,xx,yy,'#ffe8a8',s*.045);ellipse(c,xx,yy,s*.047,s*.03,'#fff8d7');}
    const k=clamp((t-.08)/.6,0,1);ellipse(c,x,y,s*(.06+k*.45),s*(.035+k*.25),`rgba(255,236,171,${.5*(1-k)})`);
    c.beginPath();for(let i=0;i<16;i++){const a=i/16*TAU,r=s*(i%2?.16:.3)*(1+k*.9);const xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;i?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.closePath();c.fillStyle=k<.4?'#fff5b8':'#ffad63';c.fill();c.strokeStyle='#b6535b';c.lineWidth=s*.025;c.stroke();
    polygon(c,[[x-s*.12,y],[x-s*.02,y-s*.18],[x+s*.025,y-s*.04],[x+s*.16,y-s*.085],[x+s*.055,y+s*.045],[x+s*.075,y+s*.16],[x-s*.035,y+s*.065]],'#fffbe1');
    for(let i=0;i<9;i++){const a=i/9*TAU+hash(i,e.x)*.5,r=s*(.15+k*.65);ellipse(c,x+Math.cos(a)*r,y+Math.sin(a)*r,s*.025*(1-k*.6),s*.025*(1-k*.6),i%2?'#fff3be':'#d66d4e');}
  }else if(e.type==='capture'||e.type==='produce'){
    c.beginPath();c.ellipse(x,y+s*.14,s*(.12+t*.48),s*(.07+t*.27),0,0,TAU);c.strokeStyle=e.type==='capture'?'#fff3bf':'#d3f3d2';c.lineWidth=s*.045*(1-t);c.stroke();
    for(let i=0;i<6;i++){const a=i/6*TAU,xx=x+Math.cos(a)*s*(.25+t*.15),yy=y+Math.sin(a)*s*.2-t*s*.35;line(c,xx-s*.025,yy,xx+s*.025,yy,'#fff4c4',s*.022);line(c,xx,yy-s*.025,xx,yy+s*.025,'#fff4c4',s*.022);}
  }else if(e.type==='move'){c.beginPath();c.ellipse(x,y+s*.15,s*(.15+t*.25),s*(.08+t*.12),0,0,TAU);c.strokeStyle='#f4edc095';c.lineWidth=s*.03;c.stroke();}c.restore();
}

/** Render a complete board. State remains untouched. All positions use map cells. */
export function renderBoard(canvas,state,view={}) {
  if(!canvas||!state||!state.width||!state.height||!state.tiles)return;
  const s=Math.max(24,Math.floor(Math.min(80,1600/state.width,1200/state.height))),w=s*state.width,h=s*state.height;
  if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;
  const c=canvas.getContext('2d');if(!c)return;c.clearRect(0,0,w,h);c.lineJoin='round';c.lineCap='round';c.imageSmoothingEnabled=true;
  const time=Number.isFinite(view.time)?view.time:(typeof performance!=='undefined'?performance.now():Date.now());
  c.drawImage(staticMap(canvas,state,s),0,0);animateWater(c,state,s,time);
  for(let y=0;y<state.height;y++)for(let x=0;x<state.width;x++){const t=tileAt(state,x,y);if(t?.building)building(c,t,x*s,y*s,s,time);}
  overlays(c,state,view,s,time);
  const e=view.effect,elapsed=e?time-(e.startedAt??time):Infinity;
  for(const unit of [...state.units].sort((a,b)=>a.y-b.y||a.x-b.x)){
    let ux=unit.x,uy=unit.y;
    const effectUnit=e&&(e.unitId===unit.id||e.id===unit.id||(e.unitId==null&&e.id==null&&e.x===unit.x&&e.y===unit.y&&(e.team==null||e.team===unit.team)));
    if(e?.type==='move'&&effectUnit&&Number.isFinite(e.fromX)&&Number.isFinite(e.fromY)&&elapsed>=0&&elapsed<360){const k=1-Math.pow(1-elapsed/360,3);ux=mix(e.fromX,unit.x,k);uy=mix(e.fromY,unit.y,k);}
    unitSprite(c,unit,(ux+.5)*s,(uy+.52)*s,s,time,unit.id===view.selectedId,true);
  }
  effect(c,e,s,time);
  if(view.cursor&&view.showCoordinates){text(c,`${String.fromCharCode(65+view.cursor.x)}${view.cursor.y+1}`,s*.16,s*.16,s*.14,'#284c43','left');}
}

/** Convert mouse / PointerEvent client coordinates to an in-bounds map cell. */
export function cellFromPointer(canvas,event,state) {
  if(!canvas||!event||!state)return null;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return null;
  const clientX=event.clientX??event.touches?.[0]?.clientX??event.changedTouches?.[0]?.clientX,clientY=event.clientY??event.touches?.[0]?.clientY??event.changedTouches?.[0]?.clientY;
  if(!Number.isFinite(clientX)||!Number.isFinite(clientY))return null;
  const x=Math.floor((clientX-rect.left)/rect.width*state.width),y=Math.floor((clientY-rect.top)/rect.height*state.height);
  return x>=0&&y>=0&&x<state.width&&y<state.height?{x,y}:null;
}

export const RENDER_PALETTE=Object.freeze({player:TEAM[0].flag,cpu:TEAM[1].flag,grass:'#8ac96f',sea:'#42afd0',ink:INK});
