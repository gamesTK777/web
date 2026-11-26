import { WIDTH, HEIGHT, terrainAt, rank, TYPES } from './strategy.mjs';
import { drawMech } from './mechs.mjs';

// Centres use the same odd-row offset and east-positive axes as arena deployment.
const PITCH = 58;
const R = PITCH / Math.sqrt(3);
const OX = 48, OY = 44;
const BW = Math.ceil(OX + WIDTH * PITCH + 12);
const BH = Math.ceil(OY + (HEIGHT - 1) * R * 1.5 + R + 14);
const FRAME = '#101b27';
const INK = '#101923';
const BLUE = '#78eced', RED = '#ff9180', NEUTRAL = '#ffe39c';
const TEAM = { blue: BLUE, red: RED };
const terrainName = { plain: '月原', ridge: '岩稜', crater: 'クレーター', road: '採掘路' };
const position = (q,r) => ({ x: OX + PITCH * (q + (r & 1) * .5), y: OY + R * 1.5 * r });
const key = (q,r) => q + ',' + r;
const valid = (q,r) => q >= 0 && r >= 0 && q < WIDTH && r < HEIGHT;
const address = (q,r) => String.fromCharCode(65+q) + String(r+1).padStart(2,'0');
const cellList = (value) => new Set(Array.from(value || [], c => typeof c === 'string' ? c : key(c.q,c.r)));
function noise(q, r, salt = 0) {
  let n = Math.imul(q + 381, 1597334677) ^ Math.imul(r + 947, 3812015801) ^ Math.imul(salt + 75, 2654435761);
  n = Math.imul(n ^ n >>> 15, 2246822519);
  return ((n ^ n >>> 13) >>> 0) / 4294967296;
}
function poly(g, pts, color) {
  g.beginPath(); g.moveTo(pts[0][0],pts[0][1]);
  for (let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]);
  g.closePath(); g.fillStyle=color; g.fill();
}
function rect(g,x,y,w,h,color) {
  g.fillStyle=color; g.fillRect(Math.round(x),Math.round(y),w,h);
}
function stroke(g, pts, color, width=1) {
  g.beginPath(); g.moveTo(...pts[0]);
  for (let i=1;i<pts.length;i++) g.lineTo(...pts[i]);
  g.strokeStyle=color; g.lineWidth=width; g.stroke();
}
function hex(g,x,y,scale=1) {
  g.beginPath();
  for (let i=0;i<6;i++) {
    const a = (60*i-90)*Math.PI/180;
    const px = Math.round(x+R*scale*Math.cos(a)), py = Math.round(y+R*scale*Math.sin(a));
    if(i===0) g.moveTo(px,py); else g.lineTo(px,py);
  }
  g.closePath();
}
function cellAt(px,py) {
  const row = Math.round((py-OY)/(R*1.5));
  for(let r=row-1;r<=row+1;r++){
    const q0=Math.round((px-OX)/PITCH-(r&1)*.5);
    for(let q=q0-1;q<=q0+1;q++){
      if(!valid(q,r)) continue;
      const p=position(q,r), dx=Math.abs(px-p.x),dy=Math.abs(py-p.y);
      if(dx<=PITCH*.5 && dy<=R-dx/Math.sqrt(3)) return {q,r};
    }
  }
  return null;
}

// A sunken crater has a dark northwest lip and a light southeast inner wall.
function crater(g,x,y,s,rock=false) {
  g.save(); g.translate(Math.round(x),Math.round(y)); g.scale(s,s);
  poly(g,[[-14,-2],[-10,-6],[-4,-8],[5,-8],[12,-5],[16,0],[12,5],[4,8],[-5,7],[-12,4]],'#565768');
  poly(g,[[-13,-3],[-9,-7],[-4,-9],[4,-9],[12,-6],[15,-2],[9,-4],[4,-5],[-4,-5],[-9,-3]],rock?'#a3978d':'#99939a');
  poly(g,[[-12,-2],[-7,-6],[4,-6],[10,-4],[13,-1],[10,3],[2,5],[-7,4],[-11,2]],rock?'#504d57':'#464d60');
  poly(g,[[-10,1],[-4,-2],[3,-3],[9,-2],[11,0],[7,3],[0,4],[-6,3]],rock?'#74696a':'#747788');
  rect(g,-6,-1,5,1,'#626575'); rect(g,5,2,4,1,'#858395');
  stroke(g,[[-10,4],[-5,6],[2,7],[9,5]],'#ada6a5'); g.restore();
}
function ridge(g,x,y,variant) {
  const dz = Math.floor(variant*5);
  g.save(); g.translate(Math.round(x),Math.round(y));
  g.scale(.86+.18*variant,.70+.42*variant);
  poly(g,[[-28,10],[-13,-9],[3,-18],[22,-4],[28,11],[18,19],[-9,23]],'#504f5f');
  poly(g,[[-27,9],[-21,1],[-17,-10],[-10,-12],[-3,-20],[2,-19],[6,-27+dz],[12,-26+dz],[17,-15],[22,-11],[25,1],[18,12],[1,19],[-11,18]],'#635e6a');
  poly(g,[[-27,8],[-19,-1],[-15,-10],[-9,-11],[-3,-19],[1,-18],[7,-26+dz],[11,-25+dz],[5,-14],[0,-9],[-4,1],[-13,7],[-17,13]],'#989098');
  poly(g,[[6,-24+dz],[12,-23+dz],[14,-13],[18,-10],[20,-3],[12,-7],[6,-6],[9,-13]],'#7f7580');
  poly(g,[[-20,9],[-12,4],[-9,-1],[-3,-2],[1,-10],[6,-12],[2,-4],[0,3],[-8,9],[-10,13],[-17,15]],'#b1a39e');
  poly(g,[[0,16],[4,8],[9,5],[13,-2],[17,-1],[15,6],[8,13]],'#8e8388');
  for(let i=0;i<14;i++){
    const dx=-23+noise(i,dz,8)*45,dy=8+noise(i,dz,3)*11;
    rect(g,dx,dy,2+i%3,1,i%2?'#837d87':'#57525c');
  }
  g.restore();
}
function rockNeedle(g,x,y,h){
  poly(g,[[x-6,y+1],[x-4,y-5],[x-1,y-h],[x+2,y-h-1],[x+4,y-4],[x+6,y+1],[x+1,y+4]],'#655e6a');
  poly(g,[[x-6,y+1],[x-4,y-5],[x-1,y-h],[x+1,y-h],[x,y-4],[x-2,y]],'#a99d98');
  stroke(g,[[x+1,y+3],[x+7,y+3],[x+11,y+1]],'#545563',2);
}
function basaltRidge(g,x,y,seed){
  const type=Math.floor(seed*4);
  if(type===0){ridge(g,x,y,seed);return;}
  g.save();g.translate(Math.round(x),Math.round(y));
  if(type===1){
    // A long, saw-cut face with three separate high points.
    poly(g,[[-26,9],[-20,-2],[-12,-4],[-8,-14],[-3,-17],[1,-13],[7,-16],[12,-13],[17,-13],[24,-3],[22,9],[10,16],[-10,18]],'#514f60');
    poly(g,[[-26,7],[-20,-3],[-14,-5],[-8,-15],[-3,-18],[0,-13],[-5,-8],[-6,-2],[-14,5],[-18,11]],'#a99c97');
    poly(g,[[-12,8],[-5,-3],[2,-8],[7,-17],[12,-13],[11,-8],[7,-6],[5,0],[0,5],[-4,11]],'#90878d');
    poly(g,[[3,10],[9,1],[12,-1],[16,-12],[20,-9],[23,-4],[19,-5],[17,1],[10,9],[8,13]],'#aaa09c');
    poly(g,[[-26,8],[-18,6],[-13,4],[-17,10],[-15,13],[-22,14]],'#76717e');
    stroke(g,[[-11,15],[-6,13],[-1,13],[4,11]],'#9a9092',2);
    rockNeedle(g,18,12,6);
  }else if(type===2){
    // Flat-topped uplift with horizontal strata on its shaded flank.
    poly(g,[[-25,9],[-19,-6],[-13,-14],[1,-20],[12,-17],[18,-12],[21,-1],[25,5],[19,14],[3,20],[-14,15]],'#504e5d');
    poly(g,[[-23,6],[-19,-6],[-13,-15],[1,-20],[12,-17],[17,-12],[8,-7],[-7,-5],[-15,1]],'#9d9698');
    poly(g,[[-16,-6],[-12,-12],[1,-17],[11,-14],[8,-11],[-5,-8]],'#b2a5a0');
    poly(g,[[-16,1],[-7,-4],[8,-6],[17,-11],[17,-5],[9,0],[-6,4],[-16,8]],'#7a707b');
    poly(g,[[-11,11],[-3,6],[10,3],[20,-3],[21,1],[12,8],[-4,12]],'#9e9393');
    stroke(g,[[-7,15],[1,13],[11,12],[17,8]],'#746e7a',2);
    rockNeedle(g,-18,11,5);
  }else{
    // A broken spine of narrow pinnacles leading into a rubble fan.
    poly(g,[[-26,4],[-16,-5],[-2,-11],[15,-7],[23,4],[24,11],[9,17],[-8,14]],'#585360');
    for(const [dx,dy,h] of [[-13,-1,12],[-3,-5,18],[7,-7,9],[5,5,16],[16,8,9],[-14,10,6]])
      rockNeedle(g,dx,dy,h);
    stroke(g,[[-16,12],[-11,13],[-6,12]],'#979094',2);
  }
  for(let i=0;i<10;i++){
    const px=-24+Math.round(noise(i,type,62)*48),py=13+Math.round(noise(i,type,77)*6);
    rect(g,px,py,2+i%3,1,i%3===0?'#a49e9e':'#605c69');
  }g.restore();
}
// The outlying cargo, pipes and yard equipment are low relief, below standing pieces.
function outpost(g,x,y,kind){
  g.save();g.translate(Math.round(x),Math.round(y));
  if(kind===0){
    for(const [a,b] of [[-9,0],[-3,-4],[4,1]]){
      rect(g,a+2,b+1,10,5,'#555660');rect(g,a,b-2,9,6,'#5f666c');
      rect(g,a,b-3,8,3,'#ada492');rect(g,a,b-3,8,1,'#c2b8a8');
      for(const i of [1,4,7])rect(g,a+i,b,1,3,'#968e81');
    }
  }else if(kind===1){
    for(const a of [-8,1]){
      rect(g,a+2,4,9,3,'#565663');rect(g,a,-6,8,11,'#687682');
      poly(g,[[a,-6],[a+2,-9],[a+6,-9],[a+8,-6],[a+5,-4],[a+2,-4]],'#bcbdb0');
      rect(g,a,-4,2,8,'#9ea6a3');rect(g,a,-1,8,1,'#c1a077');rect(g,a+6,-4,2,8,'#58616d');
    }
    rect(g,-9,5,21,2,'#899294');
  }else{
    for(const a of [-8,0,8]){
      poly(g,[[a-2,4],[a+2,-5],[a+9,-5],[a+5,4]],'#465364');
      stroke(g,[[a-1,4],[a+3,-4],[a+8,-4]],'#9fa9aa');
      stroke(g,[[a,1],[a+5,1]],'#758e9c');
      rect(g,a+1,5,2,2,'#555866');
    }
  }
  g.restore();
}
function utilityLine(g,points){
  stroke(g,points.map(([x,y])=>[x+1,y+2]),'#545764',3);
  stroke(g,points,'#a3a4a1',2);stroke(g,points,'#82868d',1);
  for(const [x,y] of points) {rect(g,x-1,y-1,4,3,'#555c69');rect(g,x-1,y-2,3,2,'#b7af9e');}
}
const allCells = [];
for(let r=0;r<HEIGHT;r++) for(let q=0;q<WIDTH;q++) allCells.push({q,r,...position(q,r)});
function buildTerrain() {
  const surface=document.createElement('canvas'); surface.width=BW; surface.height=BH;
  const g=surface.getContext('2d',{alpha:false});
  g.imageSmoothingEnabled=false; g.fillStyle=FRAME; g.fillRect(0,0,BW,BH);
  // Plate markings outside the surveyed area.
  for(let y=8;y<BH;y+=10) for(let x=(y%4?4:9);x<BW;x+=12) rect(g,x,y,1,1,'#2b3c4a');
  g.font='9px monospace'; g.textAlign='center'; g.fillStyle='#92a5af';
  for(let q=0;q<WIDTH;q++) g.fillText(String.fromCharCode(65+q),position(q,0).x,9);
  g.textAlign='left';
  for(let r=0;r<HEIGHT;r++) g.fillText(String(r+1).padStart(2,'0'),2,position(0,r).y+3);
  const plains=['#797983','#777985','#7b7a85','#737582','#7e7c86'];
  for(const {q,r,x,y} of allCells) {
    const t=terrainAt(q,r);
    hex(g,x,y); g.fillStyle=t==='road'?'#766f75':t==='crater'?'#777482':plains[Math.floor(noise(q,r)*plains.length)]; g.fill();
    g.save(); g.clip();
    // Broken seams of regolith and gravel. Stable under redraw.
    for(let i=0;i<54;i++) {
      const dx=Math.floor(noise(q,r,3*i)*62-31),dy=Math.floor(noise(q,r,3*i+1)*68-34);
      const v=noise(q,r,i+11);
      rect(g,x+dx,y+dy,v>.80?4:v>.44?2:1,1,
        v>.82?'#8f8b93':v>.60?'#85828d':v>.23?'#6a6b79':'#646777');
      if(i%17===0){rect(g,x+dx+1,y+dy-1,3,1,'#969198');rect(g,x+dx+3,y+dy+1,2,1,'#616374');}
    }
    if(t==='plain' && noise(q,r,87)>.58) crater(g,x+8*noise(q,r,12)-4,y+9, .28+noise(q,r,88)*.25);
    if(t==='crater'){
      const v=noise(q,r,19), mirror=v>.53?1:-1;
      g.save();g.translate(x,y);g.rotate((noise(q,r,27)-.5)*.73);
      g.scale(.84+.28*noise(q,r,29),.81+.25*noise(q,r,30));
      const twin=noise(q,r,33)>.60;
      crater(g,mirror*(twin?8:3),-2,twin?.68:.79+v*.42);
      crater(g,-mirror*(twin?9:15),twin?3:10,twin?.65:.26+v*.35);
      crater(g,mirror*14,15,.21+v*.1);
      g.restore();
    }
    g.restore();
  }
  // Rails cross tile boundaries with continuous ties and a subdued copper rail.
  for(const cell of allCells.filter(c=>terrainAt(c.q,c.r)==='road')) {
    const others=allCells.filter(c=>terrainAt(c.q,c.r)==='road' && Math.abs(Math.hypot(c.x-cell.x,c.y-cell.y)-PITCH)<1 && (c.r>cell.r || c.r===cell.r && c.q>cell.q));
    for(const c of others) {
      const dx=(c.x-cell.x)/PITCH,dy=(c.y-cell.y)/PITCH, lo=[cell.x,cell.y],hi=[c.x,c.y];
      stroke(g,[lo,hi],'#5c5763',11);
      for(let j=0;j<PITCH;j+=6){
        const xx=cell.x+dx*j,yy=cell.y+dy*j;
        stroke(g,[[xx-dy*5,yy+dx*5],[xx+dy*5,yy-dx*5]],'#95857d',1.5);
      }
      for(const side of [-3,3]){
        stroke(g,[[cell.x+dy*side,cell.y-dx*side],[c.x+dy*side,c.y-dx*side]],'#c0a28b',1);
      }
    }
  }
  // Small service yards leave the centre of passable cells free for units.
  for(const [q,r,kind,dx,dy] of [[0,4,0,8,-12],[1,3,2,7,13],[2,4,1,0,-13],[4,4,0,-8,15],
    [5,4,2,1,-14],[6,3,1,-9,14],[7,4,0,-6,13],[9,4,2,4,15],[10,3,1,-6,13],
    [11,4,0,4,-13],[2,7,0,0,13],[5,7,1,0,-13],[7,7,2,1,-12],[9,7,0,4,14]]){
    const p=position(q,r);
    utilityLine(g,[[p.x+dx-12,p.y+dy+3],[p.x+dx-17,p.y+dy+3],[p.x+dx-20,p.y+dy+7],[p.x+dx-25,p.y+dy+7]]);
    outpost(g,p.x+dx,p.y+dy,kind);
  }
  for(const {q,r,x,y} of allCells){
    if(terrainAt(q,r)==='ridge'){
      const v=noise(q,r,82);
      if(v>.6){rockNeedle(g,x-15,y-6,9+Math.round(v*6));}
      basaltRidge(g,x,y,v);
      if(v<.55){rockNeedle(g,x+15,y+13,6+Math.round(7*v));rockNeedle(g,x+19,y+16,4);}
    }
    hex(g,x,y);g.strokeStyle='rgba(31,36,52,.56)';g.lineWidth=1;g.stroke();
  }
  return surface;
}

// Architecture sits to the north of the tile centre so an occupying robot can be read separately.
function facility(g,p,site,occupied) {
  const color=TEAM[site.owner] || NEUTRAL;
  g.save(); g.translate(Math.round(p.x),Math.round(p.y-(occupied?9:2)));
  const hq=site.type==='hq';
  poly(g,[[-24,6],[-16,-3],[12,-7],[24,1],[24,9],[15,14],[-13,14]],'#434c59');
  poly(g,[[-24,4],[-13,-4],[16,-4],[24,2],[15,9],[-15,9]],'#adb3ab');
  poly(g,[[-23,5],[-14,10],[15,10],[23,4],[23,8],[15,14],[-14,14],[-23,9]],'#535d66');
  rect(g,-18,7,6,2,'#e3ba72'); rect(g,11,7,6,2,'#e3ba72');
  if(hq){
    poly(g,[[-14,1],[-14,-11],[-6,-16],[10,-16],[15,-11],[15,1],[8,5],[-8,5]],'#3d4a58');
    poly(g,[[-14,-11],[-6,-17],[9,-17],[15,-11],[9,-7],[-8,-7]],'#d3d4bf');
    poly(g,[[-14,-10],[-8,-7],[9,-7],[9,-3],[-8,-3],[-14,-6]],'#99a5a3');
    rect(g,-9,-2,17,2,color); rect(g,-5,1,7,4,'#293442');
    rect(g,-20,-4,4,8,'#84979a'); rect(g,-20,-8,3,4,'#d3c6ab');
    rect(g,15,-5,4,9,'#6a777e'); rect(g,15,-3,4,2,color);
    rect(g,-3,-27,2,13,'#3b4856'); rect(g,-2,-27,1,13,'#bcc6bc');
    poly(g,[[-1,-26],[9,-26],[7,-23],[0,-23]],color);
    rect(g,-7,-14,14,2,'#738897');
  }else{
    rect(g,-16,-7,25,13,'#4e5964');rect(g,-15,-5,21,4,'#899894');
    poly(g,[[-18,-8],[-14,-13],[-9,-11],[-5,-15],[0,-13],[4,-16],[11,-13],[9,-7],[-16,-6]],'#cac6b7');
    stroke(g,[[-16,-6],[9,-7],[12,-11]],'#e9d7af');
    for(const a of [-12,-7,-2])rect(g,a,-4,2,2,color);
    rect(g,-5,1,10,5,'#2b3543');rect(g,-4,2,8,1,'#647581');
    rect(g,10,-19,5,22,'#535d66');rect(g,10,-18,2,16,'#bfc1ae');rect(g,9,-20,7,3,'#b8806f');
    rect(g,16,-12,3,15,'#384653');rect(g,16,-13,4,3,'#b6ada3');
    for(let i=0;i<3;i++)rect(g,9+i*3,4,2,2,'#b8a882');
  }
  // Separate owner plate remains visible under a parked machine.
  rect(g,-22,2,5,4,INK); rect(g,-21,3,3,2,color);
  if(site.queue){
    rect(g,15,-15,9,8,INK);
    g.font='bold 8px monospace';g.textAlign='center';g.fillStyle=NEUTRAL;
    g.fillText(site.queue.remaining || '✓',19.5,-8);
  }
  g.restore();
}
function unitPiece(g,u,p,selected) {
  const color=TEAM[u.side], ally=u.side==='blue';
  const y=Math.round(p.y+2),x=Math.round(p.x);
  // Broken-circle base for the crescent fleet, diamond for the rival assembly.
  if(ally){
    g.beginPath();g.ellipse(x,y+7,19,8,0,0,Math.PI*2);g.fillStyle='#263d4a';g.fill();g.strokeStyle='#72c7cd';g.lineWidth=1.5;g.stroke();
  }else{
    poly(g,[[x-20,y+6],[x,y-3],[x+20,y+6],[x,y+15]],'#613e47');
    stroke(g,[[x-20,y+6],[x,y-3],[x+20,y+6],[x,y+15],[x-20,y+6]],'#eb8b7c',1.5);
  }
  drawMech(g,u.kind,u.side,x,y-4,u.kind==='carrier'?44:39,{heading:ally?-Math.PI*.18:Math.PI*1.18,shadow:true});
  const hpRatio=Math.max(0,Math.min(1,u.hp/TYPES[u.kind].hp));
  rect(g,x-17,y+17,34,5,INK);
  rect(g,x-16,y+18,Math.ceil(32*hpRatio),3,hpRatio<.34?'#ff9c66':color);
  // Repeat the insignia stamped on each machine in a high-contrast plate.
  rect(g,x-22,y-15,10,10,INK);
  if(ally) poly(g,[[x-17,y-14],[x-14,y-11],[x-17,y-8],[x-20,y-11]],color);
  else poly(g,[[x-17,y-14],[x-13,y-8],[x-16,y-9],[x-17,y-11],[x-18,y-9],[x-21,y-8]],color);
  if(u.acted) {
    rect(g,x+11,y-15,10,9,INK);
    stroke(g,[[x+13,y-11],[x+15,y-9],[x+19,y-13]],'#c7d4d4',1.5);
  } else if(ally){
    rect(g,x+13,y-14,6,6,'#182b36'); rect(g,x+14,y-13,4,4,'#b4fff0');
  }
  if(rank(u.xp)!=='一般'){
    const n=rank(u.xp)==='エース'?2:1;
    for(let i=0;i<n;i++)stroke(g,[[x-20,y+9-i*3],[x-17,y+7-i*3],[x-14,y+9-i*3]],NEUTRAL,1.5);
  }
  if(selected) corners(g,x,y-1,23,'#fff5c0');
}
function corners(g,x,y,r,color) {
  for(const [sx,sy] of [[-1,-1],[1,-1],[-1,1],[1,1]]){
    stroke(g,[[x+sx*(r-6),y+sy*r],[x+sx*r,y+sy*r],[x+sx*r,y+sy*(r-6)]],INK,4);
    stroke(g,[[x+sx*(r-6),y+sy*r],[x+sx*r,y+sy*r],[x+sx*r,y+sy*(r-6)]],color,2);
  }
}
function link(g,a,b,color) {
  const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);
  if(len<1) return;
  const ux=dx/len,uy=dy/len,p0=[a.x+ux*17,a.y+uy*17],p1=[b.x-ux*19,b.y-uy*19];
  stroke(g,[p0,p1],INK,5); stroke(g,[p0,p1],color,2);
  poly(g,[p1,[p1[0]-ux*6-uy*3,p1[1]-uy*6+ux*3],[p1[0]-ux*6+uy*3,p1[1]-uy*6-ux*3]],color);
}
function cellDescription(state,q,r) {
  const unit=state.units.find(u=>!u.carrierId&&u.q===q&&u.r===r);
  const site=state.sites.find(s=>s.q===q&&s.r===r);
  const owner=s=>s==='blue'?'自軍':s==='red'?'敵軍':'中立';
  return [address(q,r),terrainName[terrainAt(q,r)],site && owner(site.owner)+(site.type==='hq'?'本拠地':'工場'),
    unit && owner(unit.side)+' '+TYPES[unit.kind].name+' HP '+unit.hp+'／'+TYPES[unit.kind].hp].filter(Boolean).join('　');
}
export function createBoard(host,{onCell}={}) {
  const outer=document.createElement('div'); outer.className='of-tactical';
  outer.innerHTML='<div class="of-map-viewport"><div class="of-map-stage"><canvas tabindex="0" aria-label="月面の戦略地図。矢印キーでマスを移動、Enterで選択"></canvas></div></div><div class="of-map-foot"><span class="of-coordinate" aria-live="polite"></span><button type="button" aria-label="地図を拡大" aria-pressed="false">拡大 ＋</button></div>';
  host.replaceChildren(outer);
  const viewport=outer.firstElementChild,stage=viewport.firstElementChild,canvas=stage.firstElementChild,info=outer.querySelector('.of-coordinate'),zoomButton=outer.querySelector('button');
  for(const [text,q,r] of [['中央工場',6,4],['南採掘路',3,7]]){
    const p=position(q,r),label=document.createElement('span');
    label.className='of-location';label.textContent=text;
    label.style.left=p.x/BW*100+'%';label.style.top=(p.y+26)/BH*100+'%';stage.append(label);
  }
  canvas.width=BW;canvas.height=BH;
  const g=canvas.getContext('2d',{alpha:false}), terrain=buildTerrain();
  let state=null,view={},cursor=null,keyboard=false,enlarged=false;
  const scrollToCell=()=>{
    if(!enlarged||!cursor) return;
    const p=position(cursor.q,cursor.r),factor=canvas.getBoundingClientRect().width/BW;
    viewport.scrollLeft=p.x*factor-viewport.clientWidth/2;
    viewport.scrollTop=p.y*factor-viewport.clientHeight/2;
  };
  function draw(){
    g.imageSmoothingEnabled=false;g.drawImage(terrain,0,0);
    if(!state) return;
    const reachable=cellList(view.reachable),threats=cellList(view.threats);
    const selected=state.units.find(u=>u.id===view.selectedId);
    const target=state.units.find(u=>u.id===view.targetId);
    const active=state.units.filter(u=>!u.carrierId&&u.hp>0);
    const dest=view.destination;
    const moving=selected&&dest&&(dest.q!==selected.q||dest.r!==selected.r);
    for(const c of allCells) {
      const id=key(c.q,c.r);
      if(reachable.has(id)){
        hex(g,c.x,c.y,.96);g.fillStyle='rgba(32,176,188,.17)';g.fill();g.strokeStyle='rgba(125,244,241,.78)';g.lineWidth=1;g.stroke();
        rect(g,c.x-2,c.y+23,4,2,'#8ee2dc');
      }
      if(threats.has(id)){
        hex(g,c.x,c.y,.83);g.lineWidth=1;g.setLineDash([3,4]);g.strokeStyle='#ffc0a9';g.stroke();g.setLineDash([]);
        poly(g,[[c.x+14,c.y-13],[c.x+20,c.y-13],[c.x+20,c.y-7]],'#ef9e86');
      }
    }
    for(const s of state.sites){
      facility(g,position(s.q,s.r),s,active.some(u=>u.q===s.q&&u.r===s.r));
    }
    const participants=new Set(Array.from(view.participants||[],x=>typeof x==='string'?x:x.id));
    if(moving && !target){
      const a=position(selected.q,selected.r),b=position(dest.q,dest.r);
      g.setLineDash([4,4]);stroke(g,[[a.x,a.y],[b.x,b.y]],'#fff1a9',2);g.setLineDash([]);
    }
    const at=u=>u===selected&&moving?position(dest.q,dest.r):position(u.q,u.r);
    if(target){
      const b=at(target);
      for(const u of active) if(u.id!==target.id && (participants.has(u.id)||u===selected))link(g,at(u),b,TEAM[u.side]);
    }
    for(const u of active) {
      if(u===selected&&moving){
        const origin=position(u.q,u.r);
        g.save();g.globalAlpha=.35;unitPiece(g,u,origin,false);g.restore();
      }
      const p=at(u);
      unitPiece(g,u,p,u===selected);
      if(u===target)corners(g,p.x,p.y,25,'#ffb69a');
      else if(participants.has(u.id)&&u!==selected){
        rect(g,p.x+12,p.y+8,12,9,INK);
        stroke(g,[[p.x+14,p.y+15],[p.x+17,p.y+11],[p.x+20,p.y+15]],TEAM[u.side],1.5);
      }
    }
    if(view.focus && valid(view.focus.q,view.focus.r)){
      const p=position(view.focus.q,view.focus.r);
      hex(g,p.x,p.y,.94);g.strokeStyle='#ffe1a0';g.lineWidth=2;g.stroke();
    }
    if(cursor && keyboard){
      const p=position(cursor.q,cursor.r);
      hex(g,p.x,p.y,.81);g.setLineDash([2,3]);g.strokeStyle='#fff';g.lineWidth=2;g.stroke();g.setLineDash([]);
    }
    const label=cursor||dest||selected||{q:5,r:4};
    info.textContent=cellDescription(state,label.q,label.r);
  }
  const pointerHit=e=>{
    const b=canvas.getBoundingClientRect();
    return cellAt((e.clientX-b.left)*BW/b.width,(e.clientY-b.top)*BH/b.height);
  };
  let press=null;
  canvas.addEventListener('pointerdown',e=>{if(e.button===0)press={id:e.pointerId,x:e.clientX,y:e.clientY};});
  canvas.addEventListener('pointercancel',()=>{press=null;});
  canvas.addEventListener('pointerup',e=>{
    if(!press||press.id!==e.pointerId)return;
    const tap=Math.hypot(e.clientX-press.x,e.clientY-press.y)<12;press=null;
    const c=tap&&pointerHit(e);
    if(!c||!state)return;
    cursor=c;keyboard=false;draw();onCell?.(c.q,c.r);
  });
  canvas.addEventListener('keydown',e=>{
    const arrows={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    if(!state || (!arrows[e.key]&&e.key!=='Enter'&&e.key!==' '))return;
    e.preventDefault(); keyboard=true;cursor??={q:3,r:4};
    if(arrows[e.key]){
      const [dx,dy]=arrows[e.key];
      cursor={q:Math.min(WIDTH-1,Math.max(0,cursor.q+dx)),r:Math.min(HEIGHT-1,Math.max(0,cursor.r+dy))};
      scrollToCell();draw();
    }else onCell?.(cursor.q,cursor.r);
  });
  zoomButton.onclick=()=>{
    enlarged=!enlarged; outer.classList.toggle('of-enlarged',enlarged);
    zoomButton.textContent=enlarged?'全景 －':'拡大 ＋';zoomButton.setAttribute('aria-label',enlarged?'地図全景に戻す':'地図を拡大');
    zoomButton.setAttribute('aria-pressed',String(enlarged));scrollToCell();
  };
  return {
    render(next,options={}) { state=next;view=options;draw(); },
    focus(q,r) { if(valid(q,r)){cursor={q,r};keyboard=true;canvas.focus({preventScroll:true});scrollToCell();draw();} },
    destroy() {outer.remove();state=null;}
  };
}
