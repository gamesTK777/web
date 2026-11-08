/* Original miniature battlefield art. No downloaded art, runtime dependencies or fonts. */
const TEAM = [
  {main:'#d97458',light:'#f3b28a',dark:'#984d43',flag:'#f18466',ink:'#552f32'},
  {main:'#477f94',light:'#8fc0c5',dark:'#305666',flag:'#639fb7',ink:'#203c4a'}
];
const NEUTRAL = {main:'#9ca68d',light:'#cdd2b0',dark:'#707e73',flag:'#d9d7b9',ink:'#41554d'};
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
function line(c,x1,y1,x2,y2,color,width=1) {c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function text(c,value,x,y,size,color,align='center',weight=700) {c.font=`${weight} ${size}px system-ui, -apple-system, "Yu Gothic", sans-serif`;c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(value,x,y);}

function grass(c,x,y,s,gx,gy) {
  c.fillStyle=['#b8ca8e','#bdce93','#b5c98e','#c0cf94'][Math.floor(hash(gx,gy)*4)];c.fillRect(x,y,s,s);
  for(let i=0;i<12;i++){
    const px=x+s*(.08+hash(gx,gy,i+3)*.84),py=y+s*(.07+hash(gx,gy,i+33)*.86);
    const k=hash(gx,gy,i+101);
    if(k>.82){ellipse(c,px,py,s*.018,s*.013,'#9aac78');line(c,px-s*.02,py,px,py-s*.045,'#99af70',s*.011);line(c,px+s*.025,py+s*.005,px+s*.015,py-s*.03,'#a1b679',s*.01);}
    else if(k>.72){ellipse(c,px,py,s*.018,s*.014,'#e5dfb6');ellipse(c,px+s*.023,py+s*.012,s*.012,s*.009,'#f5ecd1');}
    else{c.fillStyle=k>.4?'#adc183':'#c8d69b';c.fillRect(Math.round(px),Math.round(py),s*.025,s*.012);}
  }
}
function connected(state,x,y,types) { return [[0,-1],[1,0],[0,1],[-1,0]].map(([dx,dy])=>types.includes(terrain(tileAt(state,x+dx,y+dy)))); }
function road(c,x,y,s,state,gx,gy) {
  const ns=connected(state,gx,gy,['road','bridge']);
  if(!ns.some(Boolean)){ns[1]=ns[3]=true;}
  c.lineCap='butt';c.lineJoin='round';
  for(const [width,color] of [[.48,'#a6ae7e'],[.4,'#e0d2ad'],[.32,'#d9c9a7']]){
    c.beginPath();for(let i=0;i<4;i++)if(ns[i]){c.moveTo(x+s*.5,y+s*.5);c.lineTo(x+s*([.5,1,.5,0][i]),y+s*([0,.5,1,.5][i]));}c.strokeStyle=color;c.lineWidth=s*width;c.stroke();
  }
  ellipse(c,x+s*.5,y+s*.5,s*.2,s*.2,'#d9c9a7');
  for(let i=0;i<4;i++)if(ns[i]){
    const dx=[0,1,0,-1][i],dy=[-1,0,1,0][i];
    line(c,x+s*(.5+dx*.24),y+s*(.5+dy*.24),x+s*(.5+dx*.38),y+s*(.5+dy*.38),'#f3e8cb',s*.025);
  }
}
function river(c,x,y,s,state,gx,gy) {
  const ns=connected(state,gx,gy,['river','sea','bridge']);if(!ns.some(Boolean)){ns[0]=ns[2]=true;}
  c.lineCap='butt';c.lineJoin='round';
  for(const [width,color] of [[.59,'#94b786'],[.49,'#8bc1ad'],[.39,'#69aeb2']]){
    c.beginPath();for(let i=0;i<4;i++)if(ns[i]){c.moveTo(x+s*.5,y+s*.5);c.lineTo(x+s*([.5,1,.5,0][i]),y+s*([0,.5,1,.5][i]));}c.strokeStyle=color;c.lineWidth=s*width;c.stroke();
    ellipse(c,x+s*.5,y+s*.5,s*width/2,s*width/2,color);
  }
  const horiz=ns[1]||ns[3];for(let i=0;i<2;i++)line(c,x+s*(horiz?.24:.43+i*.13),y+s*(horiz?.44+i*.12:.21),x+s*(horiz?.4:.43+i*.13),y+s*(horiz?.44+i*.12:.39),'#a5d3c2',s*.017);
}
function bridge(c,x,y,s,state,gx,gy) {
  river(c,x,y,s,state,gx,gy);
  const n=connected(state,gx,gy,['road','bridge']);const vertical=n[0]||n[2];
  c.save();c.translate(x+s/2,y+s/2);if(vertical)c.rotate(Math.PI/2);
  roundRect(c,-s*.52,-s*.25,s*1.04,s*.57,s*.025,'#5a7769');
  roundRect(c,-s*.51,-s*.25,s*1.02,s*.48,s*.02,'#b4a27b');
  for(let i=0;i<9;i++){const xx=-s*.49+i*s*.12;roundRect(c,xx,-s*.23,s*.105,s*.43,s*.008,i%2?'#dfcea4':'#d3bf95');line(c,xx+s*.025,-s*.17,xx+s*.08,-s*.17,'#ecdfba',s*.014);}
  line(c,-s*.52,-s*.27,s*.52,-s*.27,'#7d8068',s*.06);line(c,-s*.52,s*.23,s*.52,s*.23,'#f0deaf',s*.05);
  for(const xx of [-.43,.43])for(const yy of [-.28,.22])roundRect(c,s*xx,s*yy,s*.05,s*.075,s*.01,'#707966');c.restore();
}
function pine(c,x,y,s,variant=0) {
  ellipse(c,x+s*.09,y+s*.08,s*.3,s*.13,'#627c5633');
  roundRect(c,x-s*.035,y-s*.11,s*.07,s*.24,s*.02,'#8c8059');
  for(let i=0;i<3;i++){
    const w=s*(.35-i*.065),yy=y-s*(.13+i*.2);
    polygon(c,[[x-w,yy+s*.09],[x,yy-s*.4],[x+w,yy+s*.09]],['#5d9467','#6d9d68','#79a96e'][(variant+i)%3]);
    polygon(c,[[x-w,yy+s*.09],[x,yy-s*.4],[x-s*.01,yy+s*.045]],i===2?'#a0bd7b':'#86ad73');
  }
}
function broadTree(c,x,y,s,variant=0) {
  ellipse(c,x+s*.1,y+s*.1,s*.34,s*.13,'#5d7b5430');
  roundRect(c,x-s*.04,y-s*.26,s*.09,s*.38,s*.025,'#8d8058');
  ellipse(c,x+s*.04,y-s*.37,s*.34,s*.31,'#609666');ellipse(c,x-s*.14,y-s*.43,s*.27,s*.25,variant?'#7aa26b':'#82aa6e');ellipse(c,x+s*.14,y-s*.53,s*.23,s*.22,'#75a36a');ellipse(c,x-s*.07,y-s*.59,s*.24,s*.2,'#9bbd79');
  line(c,x-s*.12,y-s*.14,x+s*.09,y-s*.32,'#8d8058',s*.034);
}
function forest(c,x,y,s,gx,gy) {
  ellipse(c,x+s*.43,y+s*.65,s*.38,s*.2,'#a0b882');
  if(hash(gx,gy)>.45){pine(c,x+s*.28,y+s*.63,s*.63);broadTree(c,x+s*.72,y+s*.6,s*.7,1);}
  else{broadTree(c,x+s*.27,y+s*.6,s*.67);pine(c,x+s*.7,y+s*.61,s*.68,1);}
  ellipse(c,x+s*.14,y+s*.81,s*.11,s*.07,'#729c67');ellipse(c,x+s*.22,y+s*.79,s*.1,s*.065,'#91af72');ellipse(c,x+s*.86,y+s*.82,s*.075,s*.05,'#8ea96d');
}
function mountain(c,x,y,s) {
  ellipse(c,x+s*.53,y+s*.83,s*.4,s*.13,'#7d967844');
  polygon(c,[[x+s*.04,y+s*.79],[x+s*.29,y+s*.29],[x+s*.58,y+s*.82]],'#85998b');
  polygon(c,[[x+s*.04,y+s*.79],[x+s*.29,y+s*.29],[x+s*.3,y+s*.77]],'#a2afa0');
  polygon(c,[[x+s*.23,y+s*.85],[x+s*.58,y+s*.12],[x+s*.97,y+s*.85]],'#7e948b');
  polygon(c,[[x+s*.23,y+s*.85],[x+s*.58,y+s*.12],[x+s*.57,y+s*.81]],'#a8b4a3');
  polygon(c,[[x+s*.58,y+s*.12],[x+s*.45,y+s*.39],[x+s*.56,y+s*.34],[x+s*.65,y+s*.44],[x+s*.71,y+s*.36]],'#e4e7cf');
  polygon(c,[[x+s*.58,y+s*.12],[x+s*.57,y+s*.34],[x+s*.65,y+s*.44],[x+s*.71,y+s*.36]],'#c6d2c3');
  line(c,x+s*.36,y+s*.74,x+s*.46,y+s*.57,'#c3c9b0',s*.025);
  ellipse(c,x+s*.16,y+s*.85,s*.09,s*.045,'#9ca991');ellipse(c,x+s*.79,y+s*.87,s*.12,s*.05,'#a6b29a');
}
function sea(c,x,y,s,state,gx,gy) {
  c.fillStyle='#64aeb1';c.fillRect(x,y,s,s);c.fillStyle='#69b2b3';c.fillRect(x,y,s,s*.5);
  const ns=[[0,-1],[1,0],[0,1],[-1,0]].map(([dx,dy])=>{const t=tileAt(state,gx+dx,gy+dy);return t&& !['sea','river'].includes(terrain(t));});
  for(let i=0;i<4;i++)if(ns[i]){
    c.save();c.translate(x+s*.5,y+s*.5);c.rotate(i*Math.PI/2);
    c.beginPath();c.moveTo(-s*.5,-s*.5);c.lineTo(s*.5,-s*.5);c.lineTo(s*.5,-s*.31);c.bezierCurveTo(s*.22,-s*.34,s*.15,-s*.22,0,-s*.26);c.bezierCurveTo(-s*.18,-s*.3,-s*.32,-s*.21,-s*.5,-s*.3);c.closePath();c.fillStyle='#8cc6b8';c.fill();
    c.beginPath();c.moveTo(-s*.5,-s*.5);c.lineTo(s*.5,-s*.5);c.lineTo(s*.5,-s*.43);c.bezierCurveTo(s*.15,-s*.38,-s*.18,-s*.45,-s*.5,-s*.4);c.closePath();c.fillStyle='#d7d7ae';c.fill();
    c.beginPath();c.moveTo(-s*.47,-s*.29);c.bezierCurveTo(-s*.13,-s*.22,s*.1,-s*.28,s*.4,-s*.3);c.strokeStyle='#c3e2cd';c.lineWidth=s*.018;c.stroke();c.restore();
  }
  if(hash(gx,gy)> .91){ellipse(c,x+s*.63,y+s*.74,s*.13,s*.065,'#4c8e91');ellipse(c,x+s*.59,y+s*.7,s*.11,s*.065,'#a6b9a8');ellipse(c,x+s*.56,y+s*.68,s*.07,s*.035,'#c9d4bb');}
}

function makeCanvas(w,h) { if(typeof OffscreenCanvas!=='undefined')return new OffscreenCanvas(w,h);const c=document.createElement('canvas');c.width=w;c.height=h;return c; }
function staticMap(canvas,state,s) {
  const key=`${state.width}/${state.height}/${s}/`+state.tiles.map(t=>terrain(t)).join(',');let cache=caches.get(canvas);if(cache?.key===key)return cache.canvas;
  const layer=makeCanvas(state.width*s,state.height*s),c=layer.getContext('2d');c.lineJoin='round';c.lineCap='round';
  for(let y=0;y<state.height;y++)for(let x=0;x<state.width;x++){
    const t=terrain(tileAt(state,x,y)),xx=x*s,yy=y*s;grass(c,xx,yy,s,x,y);
    if(t==='sea')sea(c,xx,yy,s,state,x,y);else if(t==='road')road(c,xx,yy,s,state,x,y);else if(t==='river')river(c,xx,yy,s,state,x,y);else if(t==='bridge')bridge(c,xx,yy,s,state,x,y);else if(t==='forest')forest(c,xx,yy,s,x,y);else if(t==='mountain')mountain(c,xx,yy,s);
  }
  c.lineWidth=.7;c.strokeStyle='#365c4d17';c.beginPath();for(let x=1;x<state.width;x++){c.moveTo(x*s,.5);c.lineTo(x*s,state.height*s);}for(let y=1;y<state.height;y++){c.moveTo(.5,y*s);c.lineTo(state.width*s,y*s);}c.stroke();
  caches.set(canvas,{key,canvas:layer});return layer;
}
function animateWater(c,state,s,time) {
  for(let y=0;y<state.height;y++)for(let x=0;x<state.width;x++)if(['sea','river'].includes(terrain(tileAt(state,x,y)))){
    const isSea=terrain(tileAt(state,x,y))==='sea',phase=time/1800+hash(x,y)*TAU;
    for(let i=0;i<(isSea?2:1);i++){
      const xx=x*s+s*(.18+hash(x,y,i+21)*.4),yy=y*s+s*(isSea?.28+i*.37:.5);
      c.beginPath();c.moveTo(xx,yy);c.quadraticCurveTo(xx+s*.09,yy+Math.sin(phase+i)*s*.025,xx+s*.2,yy);c.strokeStyle=`rgba(220,244,220,${.21+Math.sin(phase+i)*.1})`;c.lineWidth=s*.019;c.stroke();
    }
  }
}
function house(c,x,y,s,p,small=false) {
  const w=s*(small?.37:.61),h=s*(small?.26:.4);ellipse(c,x+w*.63,y+h*1.02,w*.61,h*.23,'#3d62532c');
  roundRect(c,x,y+h*.18,w,h*.82,s*.018,'#f3e8c4');polygon(c,[[x+w*.73,y+h*.2],[x+w,y+h*.26],[x+w,y+h],[x+w*.73,y+h*.93]],'#c5c5a6');
  polygon(c,[[x-s*.025,y+h*.27],[x+w*.44,y-h*.12],[x+w+s*.035,y+h*.29],[x+w*.66,y+h*.51]],p.dark);
  polygon(c,[[x-s*.025,y+h*.18],[x+w*.4,y-h*.18],[x+w+s*.035,y+h*.2],[x+w*.65,y+h*.42]],p.main);
  polygon(c,[[x-s*.025,y+h*.18],[x+w*.4,y-h*.18],[x+w*.65,y+h*.42]],p.light);
  line(c,x+w*.4,y-h*.18,x+w+s*.035,y+h*.2,p.light,s*.019);
  roundRect(c,x+w*.2,y+h*.51,w*.16,h*.24,s*.009,'#476879');roundRect(c,x+w*.49,y+h*.59,w*.15,h*.32,s*.006,'#8f8f73');
  line(c,x+w*.19,y+h*.52,x+w*.36,y+h*.52,'#fff4ce',s*.018);line(c,x+w*.51,y+h*.94,x+w*.7,y+h*.94,'#ded2ac',s*.036);
}
function flag(c,x,y,s,p,time=0) {
  line(c,x,y,x,y-s*.44,'#607166',s*.028);ellipse(c,x,y+s*.01,s*.065,s*.024,'#82956f');
  const w=s*.25,top=y-s*.44,bend=Math.sin(time/600+x)*s*.018;c.beginPath();c.moveTo(x,top);c.quadraticCurveTo(x+w*.4,top-s*.035,x+w,top+bend);c.lineTo(x+w,top+s*.15+bend);c.quadraticCurveTo(x+w*.4,top+s*.12,x,top+s*.16);c.closePath();c.fillStyle=p.flag;c.fill();
  ellipse(c,x+w*.45,top+s*.065,s*.027,s*.027,'#fff4d5');
}
function building(c,t,x,y,s,time) {
  const p=Number.isInteger(t.owner)?TEAM[t.owner]||NEUTRAL:NEUTRAL;
  roundRect(c,x+s*.08,y+s*.18,s*.84,s*.71,s*.06,'#b2b897');roundRect(c,x+s*.11,y+s*.19,s*.78,s*.66,s*.04,'#d7d1ac');
  if(t.building==='city'){
    house(c,x+s*.17,y+s*.29,s,p,true);house(c,x+s*.5,y+s*.46,s,p,true);
    ellipse(c,x+s*.18,y+s*.75,s*.09,s*.045,'#8aab71');flag(c,x+s*.72,y+s*.45,s*.65,p,time);
  }else if(t.building==='factory'){
    ellipse(c,x+s*.54,y+s*.77,s*.39,s*.12,'#4c6e5b35');roundRect(c,x+s*.18,y+s*.36,s*.64,s*.37,s*.025,'#d8ddbf');
    polygon(c,[[x+s*.15,y+s*.38],[x+s*.34,y+s*.22],[x+s*.34,y+s*.32],[x+s*.54,y+s*.2],[x+s*.54,y+s*.32],[x+s*.83,y+s*.3],[x+s*.85,y+s*.45]],p.dark);
    polygon(c,[[x+s*.15,y+s*.33],[x+s*.34,y+s*.17],[x+s*.34,y+s*.28],[x+s*.54,y+s*.15],[x+s*.54,y+s*.28],[x+s*.82,y+s*.26],[x+s*.85,y+s*.39]],p.main);
    roundRect(c,x+s*.3,y+s*.45,s*.3,s*.27,s*.008,'#5e756d');for(let i=0;i<3;i++)line(c,x+s*.3,y+s*(.5+i*.062),x+s*.6,y+s*(.5+i*.062),'#8eaa94',s*.018);
    roundRect(c,x+s*.65,y+s*.43,s*.1,s*.105,s*.008,'#7ca5a0');roundRect(c,x+s*.7,y+s*.14,s*.08,s*.18,s*.006,'#e2d6b8');roundRect(c,x+s*.69,y+s*.12,s*.1,s*.04,s*.009,p.dark);flag(c,x+s*.15,y+s*.66,s*.55,p,time);
    for(let i=0;i<2;i++){const f=(time/1800+i*.45)%1;ellipse(c,x+s*(.74+f*.07),y+s*(.09-f*.17),s*(.035+f*.04),s*(.025+f*.025),`rgba(246,246,219,${(1-f)*.43})`);}
  }else if(t.building==='airfield'){
    roundRect(c,x+s*.15,y+s*.28,s*.7,s*.45,s*.055,'#8a9a89');roundRect(c,x+s*.19,y+s*.34,s*.62,s*.31,s*.025,'#617f78');
    for(let i=0;i<3;i++)roundRect(c,x+s*(.24+i*.2),y+s*.475,s*.11,s*.018,s*.007,'#e6dfbb');
    for(const xx of [.2,.77])line(c,x+s*xx,y+s*.36,x+s*xx,y+s*.61,'#d8dcbb',s*.025);
    roundRect(c,x+s*.19,y+s*.16,s*.15,s*.22,s*.01,'#d6d9b9');roundRect(c,x+s*.17,y+s*.12,s*.19,s*.1,s*.018,p.main);roundRect(c,x+s*.2,y+s*.14,s*.13,s*.04,s*.005,'#b9d9ce');flag(c,x+s*.68,y+s*.3,s*.68,p,time);
  }else{
    house(c,x+s*.19,y+s*.32,s,p);roundRect(c,x+s*.43,y+s*.11,s*.19,s*.36,s*.018,'#e4e5c4');polygon(c,[[x+s*.38,y+s*.14],[x+s*.52,y+s*.02],[x+s*.67,y+s*.15]],p.main);ellipse(c,x+s*.525,y+s*.23,s*.048,s*.048,p.main);text(c,'★',x+s*.525,y+s*.23,s*.08,'#fff3cc');flag(c,x+s*.77,y+s*.35,s*.78,p,time);
  }
  const label={city:'都',factory:'工',hq:'本',airfield:'飛'}[t.building]||'';
  roundRect(c,x+s*.075,y+s*.72,s*.22,s*.2,s*.035,p.dark);text(c,label,x+s*.185,y+s*.825,s*.115,'#fff4da');
  if(t.capture<20&&t.capture>0){roundRect(c,x+s*.31,y+s*.86,s*.53,s*.045,s*.02,'#5c6a5599');roundRect(c,x+s*.31,y+s*.86,s*.53*(1-t.capture/20),s*.045,s*.02,TEAM[t.capturingTeam]?.light||'#f4e4ac');}
}

function soldier(c,x,y,s,p) {
  ellipse(c,x+s*.035,y+s*.18,s*.13,s*.055,'#3853453b');
  line(c,x-s*.045,y+s*.04,x-s*.055,y+s*.17,p.dark,s*.065);line(c,x+s*.045,y+s*.035,x+s*.08,y+s*.15,p.dark,s*.065);
  roundRect(c,x-s*.09,y-s*.12,s*.18,s*.19,s*.04,p.main,p.dark,s*.016);
  line(c,x-s*.1,y-s*.055,x-s*.15,y+s*.015,p.light,s*.055);line(c,x+s*.075,y-s*.045,x+s*.15,y-s*.09,p.light,s*.055);
  line(c,x+s*.12,y+s*.04,x+s*.22,y-s*.16,'#4b5c53',s*.036);line(c,x+s*.13,y+s*.02,x+s*.19,y-s*.09,'#9a8d6a',s*.045);
  ellipse(c,x,y-s*.2,s*.09,s*.102,'#edc3a0');ellipse(c,x-s*.005,y-s*.255,s*.124,s*.089,p.main);roundRect(c,x-s*.12,y-s*.255,s*.25,s*.06,s*.022,p.dark);ellipse(c,x-s*.045,y-s*.281,s*.062,s*.018,p.light);ellipse(c,x+s*.045,y-s*.18,s*.011,s*.012,'#4b4d43');
  roundRect(c,x-s*.043,y-s*.07,s*.083,s*.057,s*.01,p.light);
}
function tracks(c,w,h,p,heavy=false) {
  roundRect(c,-w*.52,-h*.46,w*1.04,h*.92,7,'#40534d');
  for(const yy of [-h*.48,h*.21]){
    roundRect(c,-w*.53,yy,w*1.06,h*.28,4,'#495e56');
    for(let i=0;i<6;i++)line(c,-w*.43+i*w*.17,yy+1,-w*.43+i*w*.17,yy+h*.25,'#839181',1.8);
  }
  polygon(c,[[-w*.47,-h*.25],[w*.36,-h*.25],[w*.51,-h*.08],[w*.46,h*.37],[-w*.46,h*.37]],p.dark);
  polygon(c,[[-w*.47,-h*.32],[w*.36,-h*.32],[w*.51,-h*.15],[w*.46,h*.22],[-w*.46,h*.22]],p.main);
  polygon(c,[[-w*.47,-h*.32],[w*.36,-h*.32],[w*.41,-h*.23],[-w*.38,-h*.23]],p.light);
  for(const xx of [-.3,-.12,.06])line(c,w*xx,h*.06,w*(xx+.1),h*.06,p.dark,1.8);
  if(heavy)for(const yy of [-h*.34,h*.17])roundRect(c,-w*.44,yy,w*.64,h*.12,2,p.light);
}
function tank(c,s,p,heavy=false) {
  c.save();c.rotate(-.24);tracks(c,s*(heavy?.68:.62),s*(heavy?.49:.44),p,heavy);
  roundRect(c,-s*.16,-s*.19,s*.35,s*.27,s*.07,p.dark);roundRect(c,-s*.16,-s*.23,s*.35,s*.24,s*.07,p.main);
  roundRect(c,-s*.105,-s*.21,s*.18,s*.12,s*.04,p.light);ellipse(c,-s*.03,-s*.14,s*.065,s*.043,p.dark);
  const bars=heavy?[-.1,-.035]:[-.07];for(const yy of bars){line(c,s*.09,s*yy,s*.46,s*yy-s*.04,'#3e554e',s*(heavy?.048:.047));line(c,s*.09,s*yy-s*.015,s*.45,s*yy-s*.055,p.light,s*.023);roundRect(c,s*.42,s*yy-s*.075,s*.08,s*.067,s*.012,p.dark);}
  line(c,-s*.22,-s*.19,-s*.27,-s*.38,'#4b6455',s*.012);ellipse(c,-s*.27,-s*.38,s*.013,s*.013,p.light);
  text(c,heavy?'◆':'•',-s*.16,s*.1,s*.1,'#fae9bf');c.restore();
}
function jeep(c,s,p) {
  c.save();c.rotate(-.22);
  for(const yy of [-.2,.15])for(const xx of [-.27,.25]){roundRect(c,s*(xx-.06),s*yy,s*.13,s*.15,s*.04,'#3f5149');roundRect(c,s*(xx-.027),s*(yy+.045),s*.065,s*.06,s*.02,'#889789');}
  polygon(c,[[-s*.37,-s*.1],[s*.33,-s*.1],[s*.41,s*.02],[s*.36,s*.24],[-s*.36,s*.24]],p.dark);
  polygon(c,[[-s*.37,-s*.17],[s*.31,-s*.17],[s*.41,-s*.05],[s*.36,s*.15],[-s*.36,s*.15]],p.main);
  roundRect(c,-s*.18,-s*.27,s*.34,s*.29,s*.05,p.light);roundRect(c,-s*.09,-s*.22,s*.23,s*.12,s*.023,'#507e83');line(c,-s*.14,-s*.25,-s*.14,-s*.01,p.main,s*.035);
  line(c,s*.32,-s*.115,s*.38,-s*.055,'#fff0c5',s*.045);roundRect(c,-s*.38,-s*.13,s*.07,s*.22,s*.025,'#65725c');line(c,-s*.31,-s*.15,-s*.36,-s*.41,'#4c6456',s*.012);c.restore();
}
function artillery(c,s,p,antiair=false) {
  c.save();c.rotate(-.18);tracks(c,s*.61,s*.4,p,false);
  roundRect(c,-s*.21,-s*.21,s*.32,s*.24,s*.04,p.dark);polygon(c,[[-s*.22,-s*.21],[s*.02,-s*.24],[s*.17,-s*.11],[-s*.15,-s*.04]],p.main);
  if(antiair){
    roundRect(c,-s*.1,-s*.23,s*.27,s*.17,s*.045,p.light);for(const off of [-.06,.045]){line(c,s*.04+s*off,-s*.15,s*.24+s*off,-s*.38,p.dark,s*.04);line(c,s*.045+s*off,-s*.17,s*.23+s*off,-s*.39,p.light,s*.017);}
    line(c,-s*.22,-s*.1,-s*.23,-s*.36,'#586b59',s*.016);c.beginPath();c.ellipse(-s*.23,-s*.37,s*.1,s*.042,-.5,0,TAU);c.fillStyle=p.light;c.fill();line(c,-s*.3,-s*.33,-s*.16,-s*.4,p.dark,s*.014);
  }else{
    ellipse(c,-s*.02,-s*.12,s*.13,s*.1,p.light);line(c,-s*.02,-s*.14,s*.28,-s*.4,p.dark,s*.09);line(c,-s*.03,-s*.17,s*.27,-s*.42,p.main,s*.057);line(c,s*.24,-s*.39,s*.32,-s*.46,p.dark,s*.105);line(c,-s*.04,-s*.09,s*.12,-s*.01,p.dark,s*.025);
  }c.restore();
}
function helicopter(c,s,p,time=0) {
  c.save();c.rotate(-.22);line(c,-s*.27,s*.17,s*.2,s*.17,'#455d55',s*.025);line(c,-s*.22,s*.09,-s*.23,s*.17,'#566b5c',s*.021);line(c,s*.12,s*.09,s*.13,s*.17,'#566b5c',s*.021);
  polygon(c,[[-s*.1,-s*.08],[-s*.45,-s*.16],[-s*.48,-s*.1],[-s*.2,s*.03]],p.dark);polygon(c,[[-s*.43,-s*.16],[-s*.47,-s*.31],[-s*.53,-s*.28],[-s*.48,-s*.1]],p.main);
  ellipse(c,s*.05,-s*.01,s*.25,s*.14,p.dark);ellipse(c,s*.035,-s*.065,s*.25,s*.14,p.main);ellipse(c,s*.19,-s*.08,s*.12,s*.092,'#46717c');ellipse(c,s*.17,-s*.11,s*.07,s*.037,'#b9d7cf');line(c,-s*.08,-s*.15,-s*.08,-s*.24,p.dark,s*.034);
  c.save();c.translate(-s*.08,-s*.25);c.rotate(Math.sin(time/120)*.24);line(c,-s*.44,0,s*.44,0,'#3a514c',s*.024);line(c,0,-s*.22,0,s*.22,'#3a514c',s*.017);ellipse(c,0,0,s*.04,s*.025,p.light);c.restore();line(c,-s*.53,-s*.18,-s*.39,-s*.12,'#49645a',s*.016);c.restore();
}
function fighter(c,s,p) {
  c.save();c.rotate(-.37);
  polygon(c,[[-s*.49,s*.035],[-s*.19,-s*.06],[-s*.26,-s*.33],[-s*.15,-s*.35],[s*.1,-s*.12],[s*.42,-s*.07],[s*.52,0],[s*.4,s*.075],[s*.11,s*.1],[-s*.15,s*.33],[-s*.26,s*.32],[-s*.19,s*.075]],p.dark);
  polygon(c,[[-s*.49,0],[-s*.19,-s*.1],[-s*.25,-s*.36],[-s*.15,-s*.38],[s*.1,-s*.15],[s*.42,-s*.1],[s*.52,-s*.035],[s*.4,s*.045],[s*.11,s*.07],[-s*.15,s*.3],[-s*.26,s*.29],[-s*.19,s*.04]],p.main);
  polygon(c,[[-s*.49,0],[s*.5,-s*.035],[s*.42,-s*.1],[s*.1,-s*.15],[-s*.19,-s*.1]],p.light);
  roundRect(c,s*.08,-s*.09,s*.2,s*.07,s*.028,'#4b7180');line(c,-s*.12,-s*.28,-s*.05,-s*.22,'#f6e9bb',s*.035);line(c,-s*.13,s*.2,-s*.04,s*.15,'#f6e9bb',s*.035);polygon(c,[[-s*.43,-s*.01],[-s*.36,-s*.2],[-s*.28,-s*.17],[-s*.29,-s*.01]],p.main);c.restore();
}
function unitSprite(c,unit,x,y,s,time,selected=false,badge=true) {
  const original=TEAM[unit.team]||TEAM[0],p=unit.acted?{...original,main:unit.team?'#778f91':'#ae9180',light:unit.team?'#a8beb5':'#d7bda0',dark:unit.team?'#506961':'#7b6b5b'}:original;
  const air=['fighter','helicopter'].includes(unit.type),bob=air?Math.sin(time/470+String(unit.id).length)*s*.018:0;
  ellipse(c,x+s*.04,y+s*.17,s*(air?.29:.31),s*.105,air?'#3b6e5740':'#395c4b36');
  c.save();c.translate(x,y+(air?-s*.085+bob:0));
  if(unit.acted)c.globalAlpha=.82;
  if(unit.type==='infantry'){
    soldier(c,-s*.15,-s*.045,s*.71,p);soldier(c,s*.12,s*.065,s*.79,p);
  }else if(unit.type==='recon')jeep(c,s,p);else if(unit.type==='heavy')tank(c,s,p,true);else if(unit.type==='artillery')artillery(c,s,p);else if(unit.type==='antiair')artillery(c,s,p,true);else if(unit.type==='fighter')fighter(c,s,p);else if(unit.type==='helicopter')helicopter(c,s,p,time);else tank(c,s,p);
  c.restore();
  if(!badge)return;
  const bx=x+s*.22,by=y+s*.3;
  roundRect(c,bx-s*.12,by-s*.08,s*.27,s*.19,s*.055,unit.hp<=3?'#a24640':'#f9f1d5','#506759',s*.012);roundRect(c,bx-s*.12,by-s*.08,s*.045,s*.19,s*.018,original.flag);text(c,String(Math.ceil(unit.hp)),bx+s*.03,by+s*.016,s*.13,unit.hp<=3?'#fff4d7':'#344c43');
  if(unit.acted){ellipse(c,x-s*.26,y+s*.3,s*.073,s*.073,'#eff0d4');c.beginPath();c.moveTo(x-s*.297,y+s*.3);c.lineTo(x-s*.27,y+s*.326);c.lineTo(x-s*.228,y+s*.274);c.strokeStyle='#68846a';c.lineWidth=s*.025;c.stroke();}
  if(selected){ellipse(c,x-s*.28,y-s*.27,s*.035,s*.035,'#fff3c9');}
}

/** Paint a reusable portrait icon into either a canvas or a 2D context. */
export function drawUnitIcon(canvasOrCtx,type,team=0,options={}) {
  const canvas=canvasOrCtx?.getContext?canvasOrCtx:canvasOrCtx?.canvas;
  const c=canvasOrCtx?.getContext?canvasOrCtx.getContext('2d'):canvasOrCtx;if(!canvas||!c)return;
  const width=options.width||canvas.width||96,height=options.height||canvas.height||96,s=Math.min(width,height)*.85;
  c.save();if(options.clear!==false)c.clearRect(0,0,width,height);c.lineCap='round';c.lineJoin='round';
  if(options.background!==false){roundRect(c,0,0,width,height,Math.min(width,height)*.15,'#e0e5c7');ellipse(c,width*.5,height*.63,width*.34,height*.16,'#c1d1a8');}
  unitSprite(c,{type,team,hp:options.hp??10,acted:!!options.acted,id:'icon'},width*.5,height*.5,s,options.time||0,false,!!options.badge);c.restore();
}
function brackets(c,x,y,s,color,width=3) {
  c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';const p=s*.08,l=s*.19;
  for(const [xx,yy,dx,dy] of [[x+p,y+p,1,1],[x+s-p,y+p,-1,1],[x+p,y+s-p,1,-1],[x+s-p,y+s-p,-1,-1]]){c.beginPath();c.moveTo(xx,yy+dy*l);c.lineTo(xx,yy);c.lineTo(xx+dx*l,yy);c.stroke();}
}
function overlays(c,state,view,s,time) {
  const moves=Array.isArray(view.moves)?view.moves:[],targets=Array.isArray(view.targets)?view.targets:[];
  for(const move of moves){if(!Number.isFinite(move.x)||!Number.isFinite(move.y))continue;const x=move.x*s,y=move.y*s;roundRect(c,x+s*.055,y+s*.055,s*.89,s*.89,s*.08,'#f2ffe539','#4a8f7b88',s*.018);ellipse(c,x+s*.5,y+s*.79,s*.032,s*.02,'#f8f8cfb0');}
  for(const target of targets){const x=target.x*s,y=target.y*s;roundRect(c,x+s*.07,y+s*.07,s*.86,s*.86,s*.08,'#ce60453c','#a8483ea8',s*.025);brackets(c,x+s*.06,y+s*.06,s*.88,'#ffe9b8',s*.027);}
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
    c.beginPath();for(let i=0;i<16;i++){const a=i/16*TAU,r=s*(i%2?.16:.3)*(1+k*.9);const xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;i?c.lineTo(xx,yy):c.moveTo(xx,yy);}c.closePath();c.fillStyle=k<.4?'#fff4bb':'#efaa6c';c.fill();
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

export const RENDER_PALETTE=Object.freeze({player:TEAM[0].flag,cpu:TEAM[1].flag,grass:'#b8ca8e',sea:'#64aeb1'});
