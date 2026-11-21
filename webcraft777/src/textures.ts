import * as THREE from "three";
import {scatter} from "./world";

// Each native 32px painting has 16 repeated edge pixels on each side. The
// power-of-two cells keep the complete visible mip chain inside its own tile.
const CELL=64, ART=32, PAD=16, GRID=8, SIZE=CELL*GRID;
export const FLOWERS=18, BLADES=19;
export const TILE_COUNT=47;
export type Axis='x'|'y'|'z';
export function tileFor(id:number, ny:number, nx=0, nz=0, axis:Axis='y', variation=0) {
  if(id===1) return ny>0?[0,20,21][variation]:ny<0?[2,24,25][variation]:[1,22,23][variation];
  if(id===2) return [2,24,25][variation];
  if(id===3) return [3,26,27][variation];
  if(id===5) return (axis==='x'?nx:axis==='z'?nz:ny)!==0?6:5;
  if(id===21) return ny>0?28:ny<0?8:nz===1?30:29;
  if(id===22) return ny>0?31:ny<0?8:nz===1?33:32;
  if(id===23) return 34;
  if(id===25) return ny===0?35:36;
  if(id===26) return ny===0?38:37;
  if(id>=27&&id<=29)return (ny>0?39:42)+id-27;
  if(id>=30&&id<=33)return ny>0?45:46;
  return [0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][id] ?? 3;
}
export function tileUV(tile:number, u:number, v:number) {
  return [((tile%GRID)*CELL+PAD+.12+u*(ART-.24))/SIZE,
    (Math.floor(tile/GRID)*CELL+PAD+.12+v*(ART-.24))/SIZE];
}
const mod=(v:number,d:number)=>((v%d)+d)%d;
function pigment(tile:number,x:number,y:number):[number,number,number,number] {
  // Paint the grass, loam and granite from three fixed, coordinate-selected plates.
  const originalTile=tile;
  if(tile>=20 && tile<=27) {
    const variants=[0,0,1,1,2,2,3,3];
    tile=variants[tile-20];
    x=mod(x+((originalTile&1)?9:17),ART);
    if(tile!==1)y=mod(y+((originalTile&1)?13:7),ART);
  }
  const grain=scatter(x,y,tile*877);
  const fleck=scatter(Math.floor((x+3)/3),Math.floor(y/2),tile*571);
  let rgb=0, alpha=255, shade=(grain-.5)*10+(fleck-.5)*8;
  const grass=()=> {
    const tuft=mod(x+Math.floor(y/3)*3,9);
    rgb=fleck>.77?0x96b766:fleck<.19?0x72965a:0x83a75b;
    if((tuft<2 && y%4===1 && fleck>.45)||grain>.981) rgb=0xa9c976;
    if(tuft===3 && y%4===0) shade-=9;
  };
  const earth=()=> {
    rgb=fleck>.82?0xac8056:fleck<.19?0x886346:0x99714e;
    if(grain>.966) rgb=0xc69a6b;
    if(x%9===Math.floor(y/3)%7 && (y+1)%5<3) shade+=13;
  };
  const stone=()=>{
    const seam=mod(2*x+y+Math.floor(y/4)*2,41);
    rgb=fleck>.72?0xa2a6a0:fleck<.22?0x929c9a:0x9ba39f;
    if(seam<2 && fleck>.35) shade-=19;
    if(seam===2 && fleck>.47) shade+=7;
    if(grain>.95) shade+=12;
  };
  switch(tile) {
    case 0: grass(); break;
    case 1: {
      const fringe=4+Math.floor(scatter(Math.floor(x/2),0,31)*4);
      if(y>=ART-fringe){ grass(); if(y===ART-fringe)shade-=17; }
      else {earth(); if(y===ART-fringe-1) shade-=14;}
      break;
    }
    case 2: earth(); break;
    case 3: stone(); break;
    case 4: {
      rgb=0xe4c993;
      if(mod(x+Math.floor(y*.6)+Math.floor(y/5)*2,17)<2 && y%4<2) shade+=11;
      if(grain>.93) rgb=0xc4ab77;
      break;
    }
    case 5: {
      const groove=mod(x+Math.round(Math.sin(y*.25+x*.26)*1.5),7);
      rgb=groove===0?0x604933:groove<3?0x786044:groove===3?0xa58a5b:0x916e49;
      if(Math.abs(x-17)+Math.abs(y-8)*.65<2) rgb=0x5b4436;
      break;
    }
    case 6: {
      const ax=Math.abs(x-15),ay=Math.abs(y-16);
      const ring=Math.max(ax*.98,ay)+.20*Math.min(ax,ay);
      rgb=Math.min(x,y,31-x,31-y)<2?0x78583e:Math.floor(ring)%4===0?0xb68957:0xe0b77b;
      if(x>19 && y===16-Math.floor((x-18)/3))rgb=0x956d45;
      break;
    }
    case 7: {
      const v=scatter(Math.floor(x/3),Math.floor((y+Math.floor(x/5))/2),931);
      rgb=v<.16?0x337957:v<.42?0x52944e:v<.73?0x6ca748:0x8bbe56;
      if(v>.82 && y%3===1) rgb=0xa1c86a;
      if(v<.16 && grain<.30) alpha=0;
      break;
    }
    case 8: {
      const row=Math.floor(y/8), seam=mod(x+(row%2?16:0),32);
      rgb=y%8===0||seam===0?0x946b48:y%8===7?0xe2bd81:0xcda16b;
      if(y%8===3 && (Math.floor(x/4)+row)%3!==0) shade-=9;
      if(seam===2 && y%8===2) rgb=0x7a6552;
      break;
    }
    case 9: {
      const row=Math.floor(y/7), stoneX=mod(x+row*5+(y%7<2?1:0),12);
      rgb=(y%7===0 || stoneX===0)?0x68766e:y%7===1||stoneX===1?0xb4b6a2:0x949e91;
      break;
    }
    case 10: {
      const seam=mod(x+(Math.floor(y/8)%2)*8,16);
      rgb=y%8===0||seam===0?0x657774:y%8===7||seam===1?0xb1b8aa:0x8b9d98;
      break;
    }
    case 11: {
      const rim=x===0||y===0||x===ART-1||y===ART-1;
      const shine=(x+y===22 || x+y===25) && x>4 && x<16;
      rgb=rim?0x8bcbc9:shine?0xe1fff5:0xacddd4; alpha=rim?182:shine?175:49; shade=0; break;
    }
    case 12: {
      stone();
      for(const [cx,cy,r] of [[5,6,3],[16,13,4],[10,20,2],[21,3,2]]) {
        if(Math.abs(x-cx)+Math.abs(y-cy)*.85<r) rgb=y>cy?0x59615e:0x3e4444;
      }
      break;
    }
    case 13: {
      const edge=Math.min(x,y,31-x,31-y),d=Math.abs(x-15.5)+Math.abs(y-15.5);
      rgb=edge<2?0x526665:edge<4?0xbb985f:Math.abs(d-13)<1.3?0xaf8956:d<8?0xffe9a1:0xf4c469;
      break;
    }
    case 14:
      rgb=0x429eaa; shade=(fleck-.5)*3;
      if((y===6 || y===17) && mod(x+2*y,19)<5)shade+=9;
      alpha=163; break;
    case 15: rgb=fleck>.62?0x657571:0x485956; break;
    case 16: rgb=0xffffff;shade=0;break;
    case FLOWERS: case BLADES: {
      alpha=0; rgb=0x619047;
      for(const [bx,bh,lean] of [[3,12,-2],[8,19,3],[15,10,2],[21,15,-3],[26,7,1]]) {
        const stem=bx+Math.round(lean*y/bh);
        if(y<=bh && x===stem){alpha=255;rgb=y<=2?0x538242:0x79a34c;}
        if(tile===FLOWERS && (bx===8||bx===21)){
          const d=Math.abs(x-(bx+lean))+Math.abs(y-(bh+1));
          if(d<=2){alpha=255;rgb=d===0?0xe5a12d:bx===8?0xf5dfa6:0xf3b347;}
        }
      }
      break;
    }
    case 28: case 29: case 30: {
      const edge=Math.min(x,31-x), frame=edge<3||y<3||y>28;
      rgb=frame?0x76563a:y%8===0?0x9b7047:0xc39c67;
      if(tile===28){
        if(x>4&&x<27&&y>4&&y<26)rgb=0x556f6c;
        if(x>6&&x<25&&y>6&&y<24 && (x%5===2||y%5===2))rgb=0x899b86;
        if(y>20&&y<23&&x>9&&x<25)rgb=0xe4bf72;
      } else if(tile===30){
        if(y>12&&y<23&&x>4&&x<27)rgb=(y===13||x===5)?0x5f4837:0xab8255;
        if(y===18&&x>12&&x<20)rgb=0xf0ca7d;
        if(y<10&&edge>5)rgb=0x534b3d;
      }else if(y<10&&edge>4)rgb=0x68583e;
      break;
    }
    case 31: case 32: case 33: {
      const band=x<4||x>27||y<3||y>28;
      rgb=band?0x506668:y%8===2?0x896144:0xba8750;
      if(x%24===3&&band&&y%8===4)rgb=0xbcba8d;
      if(tile!==31&&y===20)rgb=0x503f34;
      if(tile===33&&x>=13&&x<=18&&y>=13&&y<=22)rgb=x===13||y===22?0xf4d188:0xb58a46;
      if(tile===33&&Math.abs(x-15.5)<1.5&&y>=15&&y<=17)rgb=0x5c513e;
      break;
    }
    case 34:{
      stone();
      for(const [cx,cy,r] of [[8,12,6],[21,23,6],[24,6,3],[4,27,3]]){
        const d=Math.abs(x-cx)*1.55+Math.abs(y-cy);
        if(d<r+1.6)rgb=0x566b73;
        if(d<r)rgb=x<cx?0x9be5d7:x===cx?0xdefff0:0x509faf;
      }
      break;
    }
    case 35: case 36:{
      const rim=Math.min(x,y,31-x,31-y),d=Math.abs(x-15.5)+Math.abs(y-15.5);
      rgb=rim<2?0x3a565e:rim<4?0xc29765:rim===4?0x3e787f:0x76c9c2;
      if(rim>5)rgb=d<7?0xe4fff1:d<12?0xb2f1d9:Math.abs(x-15.5)<2||Math.abs(y-15.5)<2?0x589c9b:0x86d5cd;
      break;
    }
    case 37:case 38:{
      const rim=Math.min(x,y,31-x,31-y),d=Math.abs(x-15.5)+Math.abs(y-15.5);
      rgb=rim<1?0x4c6469:rim<3?0x879892:0x718587;
      if(tile===37 && Math.abs(d-13)<2.1)rgb=0xd0ab74;
      if(tile===37 && d<6)rgb=x<15?0xa7d5bd:0x73bcb1;
      if(tile===38 && (y===8||y===23))rgb=0xc2a169;
      break;
    }
    case 39:case 40:case 41:{
      const tier=tile-39, edge=Math.min(x,y,31-x,31-y);
      rgb=edge<2?0x3f5359:edge<4?0xc5d7c0:[0x57c7a4,0x6fb5e1,0xcf85dc][tier];
      if(edge>5&&(x%4===0||y%4===0))shade-=9;
      for(let arrow=0;arrow<=tier;arrow++){
        const v=y-(7+arrow*7), center=7-Math.abs(x-15.5);
        if(Math.abs(x-15.5)<7&&v>=center-2&&v<=center)rgb=0xfff5c4;
      }
      break;
    }
    case 42:case 43:case 44:{
      const tier=tile-42, edge=Math.min(x,31-x);
      const tread=[0x3f927b,0x467fb4,0x9a61aa][tier];
      rgb=y<5||y>27?0x43565c:edge<3?0x6f858b:(y===12||y===20)?0x405260:tread;
      if((edge===5||edge===6)&&(y===9||y===24))rgb=0xc9d5c7;
      break;
    }
    case 45:{
      const edge=Math.min(x,31-x), arrow=9-Math.abs(x-15.5);
      rgb=edge<2?0xb17c46:edge<5?0xffe59a:0xeeb256;
      if(edge>=5&&y%8===0)shade-=15;
      if(Math.abs(x-15.5)<6&&Math.abs(y%16-arrow)<1.2)rgb=0xffebbd;
      break;
    }
    case 46:{
      const edge=Math.min(x,31-x);
      rgb=y<=2||y>28?0x744f39:edge<3?0xb0784c:0xd69a56;
      if(y%7===0)shade-=19;
      break;
    }
    default: rgb=0x979d92;
  }
  return [((rgb>>>16)&255)+shade,((rgb>>>8)&255)+shade,(rgb&255)+shade,alpha];
}
export function makeAtlas() {
  const bytes=new Uint8ClampedArray(SIZE*SIZE*4);
  const painting=new Uint8ClampedArray(ART*ART*4);
  for(let tile=0;tile<TILE_COUNT;tile++) {
    for(let y=0;y<ART;y++)for(let x=0;x<ART;x++)painting.set(pigment(tile,x,y),(x+ART*y)*4);
    for(let y=0;y<CELL;y++) for(let x=0;x<CELL;x++){
      const ix=(tile%GRID)*CELL+x, iy=Math.floor(tile/GRID)*CELL+y;
      const off=(Math.min(31,Math.max(0,x-PAD))+ART*Math.min(31,Math.max(0,y-PAD)))*4;
      for(let c=0;c<4;c++)bytes[(ix+SIZE*iy)*4+c]=painting[off+c];
    }
  }
  const atlas=new THREE.DataTexture(new Uint8Array(bytes.buffer),SIZE,SIZE);
  atlas.colorSpace=THREE.SRGBColorSpace;
  atlas.magFilter=THREE.NearestFilter;
  atlas.minFilter=THREE.NearestMipmapLinearFilter;
  atlas.generateMipmaps=true;
  atlas.needsUpdate=true;
  return atlas;
}
