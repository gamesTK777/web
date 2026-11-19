import * as THREE from "three";
import {World, SIZE, HEIGHT, chunkKey, inside, isOpaque, scatter, voxelIndex} from "./world";
import {BLADES, FLOWERS, tileFor, tileUV} from "./textures";

type Vec = [number,number,number];
type Face = {n:Vec; u:Vec; v:Vec; o:Vec};
const faces:Face[]=[
  {n:[1,0,0],u:[0,0,-1],v:[0,1,0],o:[1,0,1]},
  {n:[-1,0,0],u:[0,0,1],v:[0,1,0],o:[0,0,0]},
  {n:[0,1,0],u:[1,0,0],v:[0,0,-1],o:[0,1,1]},
  {n:[0,-1,0],u:[1,0,0],v:[0,0,1],o:[0,0,0]},
  {n:[0,0,1],u:[1,0,0],v:[0,1,0],o:[0,0,1]},
  {n:[0,0,-1],u:[-1,0,0],v:[0,1,0],o:[1,0,0]},
];
const corners=[[0,0],[1,0],[1,1],[0,1]];
const uvs=Array.from({length:20},(_,tile)=>corners.map(([u,v])=>tileUV(tile,u,v)));
export function faceVisible(id:number, neighbor:number) {
  if(!id || isOpaque(neighbor)) return false;
  if(id===neighbor) return false;
  if(id===13 && neighbor===10) return false;
  return true;
}
class Surface {
  position:number[]=[]; normal:number[]=[]; uv:number[]=[]; detail:number[]=[]; indices:number[]=[];
  quad(double=false) {
    const i=this.position.length/3-4;
    this.indices.push(i,i+1,i+2,i,i+2,i+3);
    if(double) this.indices.push(i+2,i+1,i,i+3,i+2,i);
  }
  finish() {
    if(!this.indices.length) return null;
    const g=new THREE.BufferGeometry();
    g.setAttribute("position",new THREE.Float32BufferAttribute(this.position,3));
    g.setAttribute("normal",new THREE.Float32BufferAttribute(this.normal,3));
    g.setAttribute("uv",new THREE.Float32BufferAttribute(this.uv,2));
    g.setAttribute("surface",new THREE.Float32BufferAttribute(this.detail,3));
    g.setIndex(this.indices); g.computeBoundingSphere();
    return g;
  }
}
function sprig(s:Surface,x:number,y:number,z:number,variant:number,flower:boolean) {
  const tile=flower?FLOWERS:BLADES;
  for(let plane=0;plane<2;plane++){
    const wx=.27, wz=plane===0?.24:-.24;
    for(let j=0;j<4;j++){
      const [u,v]=corners[j], q=u*2-1;
      s.position.push(x+.5+wx*q,y+v*.85,z+.5+wz*q);
      s.normal.push(0,1,0);s.uv.push(...uvs[tile][j]);
      s.detail.push(1,variant,20+v);
    }
    s.quad(true);
  }
}
// World coordinates are stored directly in the mesh, so texture features and
// the small wind offset agree at the edge of separately rebuilt chunks.
export function meshChunk(world:World,cx:number,cy:number,cz:number) {
  const key=chunkKey(cx,cy,cz);
  const solid=new Surface(), clear=new Surface();
  if(!world.occupied[key]) return [null,null] as const;
  if(world.dense[key]===4096 && cx>0 && cx<15 && cz>0 && cz<15 &&
    [key-1,key+1,key-16,key+16,key+256,...(cy>0?[key-256]:[])].every(k=>world.dense[k]===4096))
    return [null,null] as const;
  const read=(x:number,y:number,z:number)=>inside(x,y,z)?world.data[voxelIndex(x,y,z)]:0;
  const occludes=(x:number,y:number,z:number)=>isOpaque(read(x,y,z))?1:0;
  const sx=cx*16,sy=cy*16,sz=cz*16;
  for(let y=sy;y<sy+16;y++) for(let z=sz;z<sz+16;z++){
    let index=voxelIndex(sx,y,z);
    for(let x=sx;x<sx+16;x++,index++){
      const id=world.data[index]; if(!id) continue;
      const s=(id===13 || id===10)?clear:solid;
      for(const f of faces) {
        const [nx,ny,nz]=f.n, a=x+nx,b=y+ny,c=z+nz;
        if(b<0 || !faceVisible(id,read(a,b,c))) continue;
        const tile=tileFor(id,ny), uv=uvs[tile];
        const variant=.965+.065*scatter(x+y*13,z,world.salt^17);
        const waterTop=id===13 && read(x,y+1,z)!==13;
        for(let i=0;i<4;i++){
          const [u,v]=corners[i], px=f.o[0]+f.u[0]*u+f.v[0]*v,py=f.o[1]+f.u[1]*u+f.v[1]*v,pz=f.o[2]+f.u[2]*u+f.v[2]*v;
          s.position.push(x+px,y+py-(waterTop && py===1?.105:0),z+pz);
          s.normal.push(nx,ny,nz);s.uv.push(...uv[i]);
          const su=u?1:-1,sv=v?1:-1;
          const ux=f.u[0]*su,uy=f.u[1]*su,uz=f.u[2]*su;
          const vx=f.v[0]*sv,vy=f.v[1]*sv,vz=f.v[2]*sv;
          let ao=1;
          if(s===solid){
            const side1=occludes(a+ux,b+uy,c+uz),side2=occludes(a+vx,b+vy,c+vz);
            const corner=side1&&side2?1:occludes(a+ux+vx,b+uy+vy,c+uz+vz);
            ao=1-(side1+side2+corner)*.068;
          }
          s.detail.push(ao,variant,id);
        }
        s.quad(id===13 && (ny===1 || x===0 || z===0 || x===SIZE-1 || z===SIZE-1));
        if(id===1&&ny===1&&world.highest[x+SIZE*z]===y && scatter(x,z,world.salt^2534)<.105) {
          const flower=scatter(x>>2,z>>2,world.salt^75)>.72;
          sprig(solid,x,y+1,z,variant,flower);
        }
      }
    }
  }
  return [solid.finish(),clear.finish()] as const;
}
