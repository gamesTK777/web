import * as THREE from "three";
import {scatter} from "./world";

// Each illustration is drawn at its native pixel density. A repeated four-pixel
// gutter around every tile keeps the low mip levels free from neighbouring tiles.
const CELL=32, ART=24, PAD=4, GRID=8, SIZE=CELL*GRID;
export const FLOWERS=18, BLADES=19;
export function tileFor(id:number, ny:number) {
  if (id===1) return ny>0?0:ny<0?2:1;
  if (id===5) return ny===0?5:6;
  return [0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][id] ?? 3;
}
export function tileUV(tile:number, u:number, v:number) {
  return [((tile%GRID)*CELL+PAD+.12+u*(ART-.24))/SIZE,
    (Math.floor(tile/GRID)*CELL+PAD+.12+v*(ART-.24))/SIZE];
}
const mod=(v:number,d:number)=>((v%d)+d)%d;
function pigment(tile:number,x:number,y:number):[number,number,number,number] {
  // y grows upward in this atlas.
  const grain=scatter(x,y,tile*877);
  const fleck=scatter(Math.floor((x+3)/3),Math.floor(y/2),tile*571);
  let rgb=0, alpha=255, shade=(grain-.5)*10+(fleck-.5)*8;
  const grass=()=> {
    const tuft=mod(x+Math.floor(y/3)*3,9);
    rgb=fleck>.77?0x92b956:fleck<.19?0x79a64e:0x87b350;
    if((tuft<2 && y%4===1 && fleck>.45)||grain>.981) rgb=0xaccc72;
    if(tuft===3 && y%4===0) shade-=9;
  };
  const earth=()=> {
    rgb=fleck>.82?0xac8056:fleck<.19?0x886346:0x99714e;
    if(grain>.966) rgb=0xc69a6b;
    if(x%9===Math.floor(y/3)%7 && (y+1)%5<3) shade+=13;
  };
  const stone=()=>{
    const seam=mod(2*x+y+Math.floor(y/4)*2,27);
    rgb=fleck>.72?0x9b9e92:fleck<.22?0x838e88:0x929a92;
    if(seam<2 && fleck>.48) shade-=12;
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
      const ring=Math.max(Math.abs(x-10)*.98,Math.abs(y-12))+.19*Math.min(Math.abs(x-10),Math.abs(y-12));
      rgb=ring>10.8?0x71573d:Math.floor(ring)%3===0?0xaa8551:0xd2ad70;
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
      const row=Math.floor(y/6), seam=mod(x+(row%2?13:0)+3*row,24);
      rgb=y%6===0||seam===0?0x956e48:y%6===5?0xe2bd81:0xc99c61;
      if(y%6===2 && (Math.floor(x/4)+row)%3!==0) shade-=9;
      if(seam===2 && y%6===1) rgb=0x7a6552;
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
      const rim=x===0||y===0||x===23||y===23;
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
      const edge=Math.min(x,y,23-x,23-y),d=Math.abs(x-11.5)+Math.abs(y-11.5);
      rgb=edge<2?0x526665:edge<3?0xbb985f:Math.abs(d-10)<1.3?0xaf8956:d<6?0xffe9a1:0xf4c469;
      break;
    }
    case 14:
      rgb=0x54b9bb; shade=(fleck-.5)*3;
      if((y===6 || y===17) && mod(x+2*y,19)<5)shade+=9;
      alpha=178; break;
    case 15: rgb=fleck>.62?0x657571:0x485956; break;
    case FLOWERS: case BLADES: {
      alpha=0; rgb=0x619047;
      for(const [bx,bh,lean] of [[4,9,-2],[8,13,3],[13,7,2],[17,11,-3],[20,5,1]]) {
        const stem=bx+Math.round(lean*y/bh);
        if(y<=bh && x===stem){alpha=255;rgb=y<=2?0x538242:0x79a34c;}
        if(tile===FLOWERS && (bx===8||bx===17)){
          const d=Math.abs(x-(bx+lean))+Math.abs(y-(bh+1));
          if(d<=2){alpha=255;rgb=d===0?0xe5a12d:bx===8?0xf5dfa6:0xf3b347;}
        }
      }
      break;
    }
    default: rgb=0x979d92;
  }
  return [((rgb>>>16)&255)+shade,((rgb>>>8)&255)+shade,(rgb&255)+shade,alpha];
}
export function makeAtlas() {
  const bytes=new Uint8ClampedArray(SIZE*SIZE*4);
  for(let tile=0;tile<=BLADES;tile++) for(let y=0;y<CELL;y++) for(let x=0;x<CELL;x++){
    const ix=(tile%GRID)*CELL+x, iy=Math.floor(tile/GRID)*CELL+y;
    const p=pigment(tile,Math.min(ART-1,Math.max(0,x-PAD)),Math.min(ART-1,Math.max(0,y-PAD)));
    bytes.set(p,(ix+SIZE*iy)*4);
  }
  const atlas=new THREE.DataTexture(new Uint8Array(bytes.buffer),SIZE,SIZE);
  atlas.magFilter=THREE.NearestFilter;
  atlas.minFilter=THREE.NearestMipmapLinearFilter;
  atlas.generateMipmaps=true;
  atlas.needsUpdate=true;
  return atlas;
}
