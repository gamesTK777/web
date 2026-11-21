import { HEIGHT, SIZE, isSolid } from './world.ts';

export type Point = { x:number; y:number; z:number };
export type Footprint = { radius:number; height:number };
export type Terrain = { get(x:number,y:number,z:number):number };
export const cell = (p:Point):Point => ({x:Math.floor(p.x)+.5,y:Math.round(p.y),z:Math.floor(p.z)+.5});
export const distanceXZ = (a:Point,b:Point) => Math.hypot(a.x-b.x,a.z-b.z);
const epsilon=.00001;
export const navKey = (p:Point) => Math.floor(p.x)+SIZE*(Math.floor(p.z)+SIZE*Math.round(p.y));
const directions=[[1,0],[0,1],[-1,0],[0,-1]];

export function clearBody(w:Terrain,p:Point,body:Footprint,dry=false):boolean {
  const x0=Math.floor(p.x-body.radius+epsilon),x1=Math.floor(p.x+body.radius-epsilon);
  const z0=Math.floor(p.z-body.radius+epsilon),z1=Math.floor(p.z+body.radius-epsilon);
  const y0=Math.floor(p.y+epsilon),y1=Math.floor(p.y+body.height-epsilon);
  if(x0<0 || z0<0 || y0<1 || x1>=SIZE || z1>=SIZE || y1>=HEIGHT) return false;
  for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++) {
    const id=w.get(x,y,z);
    if(isSolid(id)||(dry&&id===13))return false;
  }
  return true;
}

export function grounded(w:Terrain,p:Point,b:Footprint):boolean {
  return Math.abs(p.y-Math.round(p.y))<.002 && !clearBody(w,{...p,y:p.y-.003},b);
}

export function stepsFrom(w:Terrain,p:Point,b:Footprint):Point[] {
  const options:Point[]=[];
  for(const [dx,dz] of directions){
    const dest={x:p.x+dx,y:p.y,z:p.z+dz};
    for(const offset of [0,1,-1]){
      dest.y=p.y+offset;
      if(!clearBody(w,dest,b,true)||!grounded(w,dest,b))continue;
      // Check headroom on both sides of a rise or descent, including low lintels.
      if(offset===1&&!clearBody(w,{...p,y:dest.y},b,true))continue;
      if(offset===-1&&!clearBody(w,{...dest,y:p.y},b,true))continue;
      options.push({...dest});break;
    }
  }
  return options;
}

// Local A*: cardinal steps fit inside a voxel, including a one-block doorway.
// Each search shares a caller-supplied frame deadline and also has a hard node limit.
export function findPath(w:Terrain,start:Point,goal:Point,b:Footprint,deadline:number,occupied?:ReadonlySet<number>):Point[] {
  const origin=cell(start), target=cell(goal);
  if(!clearBody(w,origin,b,true)||!grounded(w,origin,b))return [];
  type Node = {p:Point;g:number;h:number;parent:Node|null};
  const estimate=(p:Point)=>Math.abs(p.x-target.x)+Math.abs(p.z-target.z)+.6*Math.abs(p.y-target.y);
  const first:Node={p:origin,g:0,h:estimate(origin),parent:null};
  const open=[first], costs=new Map([[navKey(origin),0]]);
  let nearest=first;
  for(let n=0;open.length&&n<96;n++){
    if(performance.now()>=deadline)break;
    let index=0;
    for(let i=1;i<open.length;i++){
      const a=open[i],b=open[index];
      if(a.g+a.h<b.g+b.h || a.g+a.h===b.g+b.h&&a.h<b.h)index=i;
    }
    const [current]=open.splice(index,1);
    if(current.g!==costs.get(navKey(current.p)))continue;
    if(current.h<nearest.h)nearest=current;
    if(current.h<.01)break;
    for(const p of stepsFrom(w,current.p,b)){
      if(Math.abs(p.x-origin.x)>14||Math.abs(p.z-origin.z)>14)continue;
      const k=navKey(p),g=current.g+1+.25*Math.abs(p.y-current.p.y);
      if(occupied?.has(k)||g>=(costs.get(k)??Infinity))continue;
      costs.set(k,g);open.push({p,g,h:estimate(p),parent:current});
    }
  }
  const path:Point[]=[];
  for(let n:Node|null=nearest;n?.parent;n=n.parent)path.push(n.p);
  return path.reverse();
}
