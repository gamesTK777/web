import { World } from "../src/world.ts";
import { activeStack, assignHotbar, craft, createBag, quantity } from "../src/inventory.ts";
import { createPlayer, EYE_HEIGHT, mineAt, placeAt, raycast, safeSpawn, stepPlayer } from "../src/physics.ts";
import type { Pose } from "../src/physics.ts";

export const SCENE_SEED = "777-SOAK";
type Cell = { x:number; y:number; z:number };
type Plan = Cell & { id:number };
export const aimFrom = (feet:Cell, target:Cell):Pose => {
  const dx=target.x-feet.x, dy=target.y-feet.y-EYE_HEIGHT, dz=target.z-feet.z;
  return { ...feet, yaw:Math.atan2(-dx,-dz), pitch:Math.atan2(dy,Math.hypot(dx,dz)) };
};
export const cabinCamera = aimFrom({x:139.6,y:40.7,z:154.5},{x:128.5,y:35.5,z:141.5});

function expect(condition: unknown, text: string): asserts condition {
  if(!condition) throw new Error(text);
}
function top(world:World,x:number,z:number){
  for(let y=94;y>0;y--)if(![0,13].includes(world.get(x,y,z)))return y;
  return 0;
}
const center=(cell:Cell)=>({x:cell.x+.5,y:cell.y+.5,z:cell.z+.5});

export function runScenario(world:World) {
  const explore=createBag("explore");
  let mined=0;
  function harvest(target:Cell,desired:number,tool=0) {
    const eye=center(target);
    const options:Cell[]=[
      {x:eye.x,y:target.y+1.05,z:eye.z},
      {x:eye.x+2.3,y:target.y,z:eye.z},{x:eye.x-2.3,y:target.y,z:eye.z},
      {x:eye.x,y:target.y,z:eye.z+2.3},{x:eye.x,y:target.y,z:eye.z-2.3},
      {x:eye.x+2.3,y:target.y-1,z:eye.z},{x:eye.x-2.3,y:target.y-1,z:eye.z},
      {x:eye.x,y:target.y-1,z:eye.z+2.3},{x:eye.x,y:target.y-1,z:eye.z-2.3},
    ];
    if(tool)expect(assignHotbar(explore,0,tool,"explore"),"採掘用の道具がありません。");
    for(const feet of options){
      const pose=aimFrom(feet,eye), corrected=safeSpawn(world,pose);
      if(corrected.x!==pose.x || corrected.y!==pose.y || corrected.z!==pose.z)continue;
      const hit=raycast(world,pose);
      if(!hit || hit.x!==target.x || hit.y!==target.y || hit.z!==target.z || hit.id!==desired)continue;
      const result=mineAt(world,pose,explore,"explore",0,hit);
      expect(result.ok,result.message);
      mined++;return;
    }
    throw new Error("届く位置から採掘できません "+JSON.stringify(target));
  }
  const p=createPlayer(world.spawn()), startZ=p.z;
  p.yaw=Math.PI;
  for(let n=0;n<20;n++)stepPlayer(world,p,{forward:1,right:0,jump:false,down:false,sprint:n>10},1/100);
  expect(p.z>startZ+.8,"歩行とダッシュを確認できません。");
  const ground=p.y;
  for(let n=0;n<15;n++)stepPlayer(world,p,{forward:0,right:0,jump:n===0,down:false,sprint:false},1/100);
  expect(p.y>ground+.8,"ジャンプができません。");
  const hole={x:127,y:top(world,127,145),z:145};
  harvest(hole,world.get(hole.x,hole.y,hole.z));
  harvest({x:126,y:33,z:136},5);
  harvest({x:126,y:34,z:136},5);
  for(const [id,count] of [["boards",2],["sticks",1],["wood-pick",1]] as const) {
    const result=craft(explore,id,count);expect(result.ok,result.message);
  }
  for(let dx=0;dx<2;dx++) for(let dz=0;dz<3;dz++){
    const x=133+dx,z=135+dz, y=top(world,x,z),id=world.get(x,y,z);
    if(id===3 && quantity(explore,8)<4)harvest({x,y,z},3,17);
  }
  expect(quantity(explore,8)===4,"丸石4個を採取できません。");
  expect(craft(explore,"bricks").ok,"石レンガの制作に失敗しました。");
  expect(activeStack(explore,17)?.durability===32,"木のツルハシの耐久値が一致しません。");

  const bag=createBag("creative");
  const plan:Plan[]=[];
  // Footprint crosses x=128 and z=144; the surrounded interior remains usable.
  for(let z=139;z<=144;z++)for(let x=125;x<=131;x++){
    plan.push({x,y:33,z,id:9});
    const side=x===125||x===131, front=z===144, back=z===139;
    if(!side&&!front&&!back)continue;
    const post=side&&(back||front);
    for(let y=34;y<=36;y++){
      if(front && x===128 && y<36)continue;
      const glass=y===35 && !post && ((side && (z===141||z===142))||(!side && (x===126||x===130)));
      const lantern=front&&x===128&&y===36;
      plan.push({x,y,z,id:post?5:glass?10:lantern?12:7});
    }
  }
  // Stepped roof with verges, two gable ends and a glass strip at the ridge.
  for(let z=138;z<=145;z++)for(let x=124;x<=132;x++){
    const rise=Math.min(3,4-Math.abs(128-x));
    const y=37+rise;
    plan.push({x,y,z,id:rise===3&&z===141?12:rise===3&&z===142?10:8});
    if((z===139||z===144) && x>=125 && x<=131)
      for(let h=37;h<y;h++)plan.push({x,y:h,z,id:h===38&&x===128?10:7});
  }
  const normals=[[0,1,0],[0,0,1],[0,0,-1],[1,0,0],[-1,0,0],[0,-1,0]];
  let placed=0, partial:ReturnType<World["exportEdits"]>=[];
  function tryPlace(t:Plan) {
    if(world.get(t.x,t.y,t.z)!==0)return false;
    for(const [nx,ny,nz] of normals){
      const bx=t.x-nx,by=t.y-ny,bz=t.z-nz,base=world.get(bx,by,bz);
      if(base===0||base===13)continue;
      for(const lift of [0,1.65,2.65,3.15,-.45]){
        const contact={x:bx+.5+nx*.5,y:by+.5+ny*.5+(ny===0?.28:0),z:bz+.5+nz*.5};
        const eye={x:contact.x+nx*3,y:contact.y+ny*3+lift,z:contact.z+nz*3};
        const pose=aimFrom({...eye,y:eye.y-EYE_HEIGHT},contact);
        // These are reachable camera angles, including overhead creative flight.
        const corrected=safeSpawn(world,pose);
        if(corrected.x!==pose.x||corrected.y!==pose.y||corrected.z!==pose.z)continue;
        const hit=raycast(world,pose);
        if(!hit||hit.x+hit.nx!==t.x||hit.y+hit.ny!==t.y||hit.z+hit.nz!==t.z)continue;
        assignHotbar(bag,0,t.id,"creative");
        if(placeAt(world,pose,bag,"creative",0,hit).ok){
          if(++placed===157)partial=world.exportEdits();
          return true;
        }
      }
    }
    return false;
  }
  let remaining=plan.slice().sort((a,b)=>a.y-b.y || Number(a.id===8)-Number(b.id===8));
  while(remaining.length){
    const missing=remaining.filter(t=>!tryPlace(t));
    expect(missing.length<remaining.length,"設置できない箇所 "+JSON.stringify(missing.slice(0,4)));
    remaining=missing;
  }
  expect(world.get(hole.x,hole.y,hole.z)===0,"採掘跡が埋まりました。");
  for(const t of plan)expect(world.get(t.x,t.y,t.z)===t.id,"建物の建材が一致しません。");
  return {plan,hole,explore,mined,placed,partial,tool:activeStack(explore,17)!.durability!};
}
