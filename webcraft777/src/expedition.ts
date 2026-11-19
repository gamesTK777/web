import { quantity, type Bag } from "./inventory.ts";
import type { World, GeneratorVersion } from "./world.ts";

type Point = {x:number;y:number;z:number};
export type Journey = {toolMade:boolean;caveVisited:boolean;decorated:boolean;hidden:boolean;home:Point|null};
export function createJourney():Journey {
  return {toolMade:false,caveVisited:false,decorated:false,hidden:false,home:null};
}
export function validJourney(value:unknown):value is Journey {
  if (!value || typeof value!=="object") return false;
  const j=value as Partial<Journey>;
  if (![j.toolMade,j.caveVisited,j.decorated,j.hidden].every(v=>typeof v==="boolean")) return false;
  if (j.caveVisited && !j.toolMade || j.decorated && !j.caveVisited) return false;
  const p=j.home;
  return p===null || !!p && [p.x,p.y,p.z].every(Number.isFinite) && p.x>=0 && p.x<256 &&
    p.z>=0 && p.z<256 && p.y>=0 && p.y<96;
}
export function recipeCrafted(j:Journey,recipeId:string) {
  if (["wood-pick","wood-axe","stone-pick","stone-axe"].includes(recipeId)) j.toolMade=true;
}
export function visitCave(j:Journey,world:World,p:Point,bag:Bag):boolean {
  if (!j.toolMade || j.caveVisited || !(quantity(bag,12)||quantity(bag,25))) return false;
  const mine=world.landmarks.find(s=>s.kind==="cave");
  if (mine) {
    if (p.x<mine.x+2 || p.x>mine.x+16 || Math.abs(p.z-mine.z-.5)>3.8 || Math.abs(p.y-mine.y)>2.1) return false;
  } else {
    const x=Math.floor(p.x),z=Math.floor(p.z),y=Math.floor(p.y);
    let roof=false;
    for(let h=y+2;h<=Math.min(y+9,95);h++) if ([2,3,8,11].includes(world.get(x,h,z))) {roof=true;break;}
    if(!roof) return false;
  }
  j.caveVisited=true;
  return true;
}
export function placedDecor(j:Journey,id:number,p:Point):boolean {
  if (!j.caveVisited || j.decorated || !j.home || (id!==25 && id!==26)) return false;
  if (Math.hypot(p.x-j.home.x,p.y-j.home.y,p.z-j.home.z)>18) return false;
  j.decorated=true;
  return true;
}
export function currentGoal(j:Journey,generator:GeneratorVersion):string {
  if (!j.toolMade) return "1/3　原木を集め、木材と棒で木の道具を作ろう";
  if (!j.caveVisited) return generator===2 ? "2/3　灯晶ブロックを持って、潮晶の岩窟へ" : "2/3　灯晶ブロックを持って、岩天井の洞窟へ";
  if (!j.decorated) return generator===2 ? "3/3　潮晶を持ち帰り、作業台で作った灯りかタイルを拠点に飾ろう" :
    "3/3　作業台でガラスと石炭を潮晶に加工し、灯りかタイルを拠点に飾ろう";
  return "3/3 達成　拠点に潮晶の飾りが加わりました";
}
export function bearing(to:Point,p:Point & {yaw:number}):string {
  const dx=to.x-p.x,dz=to.z-p.z;
  const distance=Math.round(Math.hypot(dx,dz));
  if (distance<2) return "足元";
  const angle=Math.atan2(dx,-dz)+p.yaw;
  const arrows=["↑","↗","→","↘","↓","↙","←","↖"];
  return arrows[((Math.round(angle/(Math.PI/4))%8)+8)%8]+" 約"+distance+"m";
}
export function homeBearing(j:Journey,p:Point & {yaw:number}):string {
  return j.home ? "拠点 "+bearing(j.home,p) : "";
}
