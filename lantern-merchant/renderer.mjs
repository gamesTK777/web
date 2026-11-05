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
  c.globalAlpha=.22;poly(c,[[-18,6],[7,12],[24,7],[0,0]],'#000');c.globalAlpha=1;
  rect(c,-3,-14,7,20,'#5b5941');rect(c,1,-14,3,20,'#867552');
  poly(c,[[-22,-16],[-15,-30],[-7,-30],[-5,-43],[6,-47],[15,-35],[14,-29],[24,-22],[21,-9],[7,-5],[-8,-7]],'#294c41');
  poly(c,[[-21,-20],[-13,-34],[-4,-34],[-1,-45],[8,-43],[14,-33],[11,-26],[20,-22],[10,-16],[-3,-12]],'#42664d');
  rect(c,-11,-30,8,5,'#5b7957');rect(c,0,-40,6,5,'#71885e');rect(c,6,-24,7,4,'#547a52');c.restore();
}
function lamp(c,x,y,time,scale=1){
  c.save();c.translate(x,y);c.scale(scale,scale);glow(c,0,-24,34,'rgba(242,188,100,.18)');
  rect(c,-2,-28,4,31,'#303e36');rect(c,-5,2,10,3,'#263a32');rect(c,-8,-33,16,3,C.woodDark);
  rect(c,-6,-30,12,14,C.amber);rect(c,-4,-29,8,11,C.gold);rect(c,-2,-27,4,7,C.light);
  rect(c,-8,-18,16,3,C.woodDark);rect(c,-2,-37,4,4,C.gold);
  c.globalAlpha=.4+Math.sin(time/450+x)*.13;rect(c,-3,-27,6,6,'#fff6c6');c.globalAlpha=1;c.restore();
}
function roof(c,x,y,w,h,color,light,trim){
  poly(c,[[x-9,y],[x+w*.5,y-h],[x+w+9,y],[x+w,y+7],[x,y+7]],color);
  poly(c,[[x-9,y],[x+w*.5,y-h],[x+w*.5,y+5],[x,y+7]],light);
  for(let k=1;k<5;k++){
    let yy=y-h+k*h/5,xx=x+w*.5-(w*.5+9)*k/5;
    rect(c,xx,yy,(w+18)*k/5,2,trim);
  }
  rect(c,x-10,y,w+20,5,trim);rect(c,x-7,y+5,w+14,3,'#293e35');
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
function player(c,x,y,s,time=0){
  c.save();c.translate(x,y);c.scale(s/24,s/24);
  c.globalAlpha=.3;rect(c,-7,8,17,4,'#021514');c.globalAlpha=1;
  const bob=Math.sin(time/450)*.5;c.translate(0,bob);
  rect(c,-5,5,4,5,'#413c35');rect(c,3,5,4,5,'#413c35');
  poly(c,[[-5,-6],[5,-6],[9,7],[-9,7]],'#bf7b41');rect(c,-4,-4,8,11,'#e9b260');
  rect(c,-7,-13,14,10,'#365a55');rect(c,-5,-16,10,5,'#496c5c');rect(c,-3,-11,8,7,'#ebc59b');
  rect(c,3,-9,2,2,'#243c35');rect(c,-6,-5,12,3,'#e0b65e');rect(c,-8,-2,3,7,'#466a59');
  rect(c,6,-2,6,3,'#e4bb8e');rect(c,11,-3,2,5,'#4c4f35');rect(c,9,1,7,7,'#ba873f');rect(c,11,2,3,4,'#ffe2a0');
  rect(c,-9,-2,3,6,'#a59b73');c.restore();
}
function monster(c,e,x,y,s,time){
  c.save();c.translate(x,y);c.scale(s/24,s/24);
  const kind=String(e.kind||e.id||'').toLowerCase();
  c.globalAlpha=.3;rect(c,-8,7,17,4,'#031715');c.globalAlpha=1;
  if(/boss|guardian|sentinel|golem/.test(kind)){
    rect(c,-10,-7,20,14,'#566775');rect(c,-7,-14,14,9,'#829e9b');rect(c,-13,-4,5,13,'#91aaa0');rect(c,9,-4,5,13,'#91aaa0');
    rect(c,-8,6,6,6,'#456261');rect(c,3,6,6,6,'#456261');poly(c,[[0,-15],[5,-7],[0,0],[-5,-7]],C.gold);
    rect(c,-5,-7,3,2,'#e9d795');rect(c,3,-7,3,2,'#e9d795');rect(c,-4,1,9,5,'#374b50');
  }else if(/wisp|moth|spark|ghost/.test(kind)){
    c.translate(0,Math.sin(time/300+x)*2);poly(c,[[0,-13],[7,-5],[6,5],[2,9],[0,6],[-5,8],[-8,1],[-6,-7]],'#8d80a3');
    poly(c,[[0,-10],[4,-3],[3,4],[-4,5],[-5,-2]],'#d0c4d5');rect(c,-4,-3,2,3,'#4b4563');rect(c,2,-3,2,3,'#4b4563');
    rect(c,8,-8,3,3,'#c1afd1');
  }else if(/crab|crawler|stone|shell/.test(kind)){
    rect(c,-10,4,4,5,'#725b4d');rect(c,7,4,4,5,'#725b4d');rect(c,-12,-1,4,5,'#927760');rect(c,9,-1,4,5,'#927760');
    poly(c,[[-8,5],[-10,-4],[-4,-10],[5,-10],[10,-3],[8,5]],'#8c8b75');rect(c,-5,-7,10,8,'#b0aa87');
    rect(c,-5,2,3,3,'#dbb273');rect(c,3,2,3,3,'#dbb273');rect(c,0,-8,2,9,'#626c5e');
  }else{
    rect(c,-10,1,4,3,'#52855a');rect(c,7,1,4,3,'#52855a');rect(c,-9,6,4,3,'#52855a');rect(c,6,6,4,3,'#52855a');
    poly(c,[[-7,6],[-9,-3],[-5,-9],[5,-9],[9,-3],[7,7]],'#507d53');rect(c,-5,-7,10,11,'#81a264');
    rect(c,0,-7,2,10,'#416c4c');rect(c,-5,3,3,3,C.gold);rect(c,4,3,3,3,C.gold);rect(c,-7,-11,2,4,'#a7bd77');rect(c,6,-11,2,4,'#a7bd77');
  }
  c.restore();
  if(Number.isFinite(e.hp)&&Number.isFinite(e.maxHp)&&e.hp<e.maxHp){
    rect(c,x-s*.37,y-s*.7,s*.74,3,'#182d29');rect(c,x-s*.37,y-s*.7,s*.74*Math.max(0,e.hp/e.maxHp),3,'#d79069');
  }
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
  const scale=Math.min(w/1000,h/620),ox=(w-1000*scale)/2,oy=(h-620*scale)/2;
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
  for(let y=167;y<425;y+=17)for(let x=445;x<510;x+=19)rect(c,x+(y%2)*4,y,15,1,'#717c68');
  for(let x=190;x<820;x+=25){rect(c,x,289,20,1,'#6d7763');rect(c,x+6,309,16,1,'#a0a18a');}
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
  glow(c,484,329,48,'rgba(237,188,104,.11)');player(c,477,317,33,time);
  label(c,'帰る場所が、少しずつ大きくなる。',500,546,13,'#80988a');
  c.restore();
}

function dungeon(c,w,h,state,time){
  rect(c,0,0,w,h,'#071819');
  const map=state.map||{},tiles=map.tiles||[],rows=map.height||tiles.length||23,cols=map.width||tiles[0]?.length||31;
  const p=state.player||{x:1,y:1};
  const tile=Math.max(18,Math.min(32,Math.floor(Math.min((w-24)/cols,(h-24)/rows))));
  const viewCols=Math.min(cols,Math.max(1,Math.floor((w-16)/tile))),viewRows=Math.min(rows,Math.max(1,Math.floor((h-16)/tile)));
  const cameraX=clamp(Math.floor(p.x-viewCols/2),0,cols-viewCols),cameraY=clamp(Math.floor(p.y-viewRows/2),0,rows-viewRows);
  const offsetX=Math.floor((w-viewCols*tile)/2),offsetY=Math.floor((h-viewRows*tile)/2);
  const px=x=>offsetX+(x-cameraX)*tile,py=y=>offsetY+(y-cameraY)*tile;
  c.save();c.beginPath();c.rect(offsetX,offsetY,viewCols*tile,viewRows*tile);c.clip();
  for(let y=cameraY;y<cameraY+viewRows;y++)for(let x=cameraX;x<cameraX+viewCols;x++){
    const v=tiles[y]?.[x]??0,seen=map.seen?.[y]?.[x]??false,vis=map.visible?.[y]?.[x]??seen;
    if(!seen&&!vis){rect(c,px(x),py(y),tile,tile,'#0b1e20');if(hash(x,y)>.85)rect(c,px(x)+tile/2,py(y)+tile/2,1,1,'#183233');continue;}
    const xx=px(x),yy=py(y),t=tile;
    if(v===0){
      rect(c,xx,yy,t,t,'#203d37');rect(c,xx+1,yy+1,t-2,t*.64,'#3d5a4d');rect(c,xx+2,yy+2,t-4,2,'#58715c');
      rect(c,xx+1,yy+t*.67,t-2,t*.28,'#2b443b');rect(c,xx+t*.5,yy+2,1,t*.55,'#304d42');
      if(hash(x,y)>.77){rect(c,xx+3,yy+3,5,3,'#637954');rect(c,xx+3,yy+5,2,4,'#637954');}
    }else{
      rect(c,xx,yy,t,t,'#1a3633');rect(c,xx+1,yy+1,t-2,t-2,hash(x,y)>.5?'#25433c':'#29463d');
      if(hash(x+4,y)>.62)rect(c,xx+3,yy+t-5,t/4,1,'#3b5647');
      if(hash(x,y+4)>.85){rect(c,xx+t*.5,yy+3,1,4,'#19312e');rect(c,xx+t*.5,yy+7,4,1,'#19312e');}
      if(v===2){
        rect(c,xx+3,yy+3,t-6,t-6,'#102a2a');
        for(let i=0;i<4;i++)rect(c,xx+4+i*2,yy+5+i*(t-9)/4,t-8-i*3,2,'#8aa28a');
        rect(c,xx+t-5,yy+3,2,t-7,'#cebd78');
      }else if(v===3){
        rect(c,xx+3,yy+3,t-6,t-6,'#817b57');rect(c,xx+5,yy+5,t-10,t-10,'#b0aa70');
        poly(c,[[xx+t*.5,yy+4],[xx+t-5,yy+t*.5],[xx+t*.5,yy+t-4],[xx+5,yy+t*.5]],'#d6cf90');
        rect(c,xx+t*.5-1,yy+7,3,t-14,'#7c946e');
      }
    }
    if(!vis){c.fillStyle='rgba(3,15,17,.63)';c.fillRect(xx,yy,t,t);}
  }
  const visible=(x,y)=>x>=cameraX&&x<cameraX+viewCols&&y>=cameraY&&y<cameraY+viewRows&&(map.visible?.[y]?.[x]??map.seen?.[y]?.[x]);
  for(const item of state.loot||[]){if(visible(item.x,item.y)){const x=px(item.x)+tile/2,y=py(item.y)+tile/2;drawIcon(c,item.itemId||item.id||item.type,x,y,Math.min(23,tile*.73));if(Math.sin(time/800+item.x)>0.7)rect(c,x+tile*.25,y-tile*.3,2,2,C.light);}}
  for(const e of state.enemies||[]){if(visible(e.x,e.y)&&e.hp>0)monster(c,e,px(e.x)+tile/2,py(e.y)+tile*.6,tile*.85,time);}
  glow(c,px(p.x)+tile/2,py(p.y)+tile/2,tile*2.3,'rgba(228,194,113,.12)');
  const playerScreen={x:px(p.x)+tile/2,y:py(p.y)+tile*.62};
  player(c,playerScreen.x,playerScreen.y,tile*.88,time);
  c.restore();
  const edge=c.createRadialGradient(w/2,h/2,Math.min(w,h)*.23,w/2,h/2,Math.max(w,h)*.65);edge.addColorStop(0,'rgba(0,0,0,0)');edge.addColorStop(1,'rgba(0,8,12,.5)');c.fillStyle=edge;c.fillRect(0,0,w,h);
  return {tileSize:tile,offsetX,offsetY,cameraX,cameraY,viewCols,viewRows,playerScreen};
}

/** Responsive, high-density canvas scene. Rendering never mutates game state. */
export function drawScene(canvas,state,{time=typeof performance!=='undefined'?performance.now():0,selectedPlot=-1}={}){
  const w=Math.max(1,Math.round(canvas.clientWidth||960)),h=Math.max(1,Math.round(canvas.clientHeight||540));
  const dpr=Math.min(2,typeof window!=='undefined'?window.devicePixelRatio||1:1);
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
  const c=canvas.getContext('2d');if(!c)return null;c.setTransform(dpr,0,0,dpr,0,0);c.imageSmoothingEnabled=false;
  if(state.mode==='dungeon')return dungeon(c,w,h,state,time);
  town(c,w,h,state,time,selectedPlot);return null;
}
