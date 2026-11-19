import { World,voxelIndex } from "../src/world.ts";
import { createPlayer,eyeHeight,raycast,stepPlayer,canPlaceAt,placeAt,mineAt,type Player } from "../src/physics.ts";
import { createBag,craft,assignHotbar,transferStack,quantity,type Stack } from "../src/inventory.ts";
import { createJourney,recipeCrafted,visitCave,placedDecor } from "../src/expedition.ts";

type Cell={x:number;y:number;z:number};
function expect(ok:unknown,why:string):asserts ok { if(!ok) throw new Error(why); }
const free=(world:World,x:number,y:number,z:number)=>world.get(x,y,z)===0 && world.get(x,y+1,z)===0;
function route(world:World,p:Player,to:Cell):Cell[] {
  const origin={x:Math.floor(p.x),y:Math.floor(p.y+.01),z:Math.floor(p.z)};
  const key=(v:Cell)=>voxelIndex(v.x,v.y,v.z);
  const start=key(origin);
  const open=[origin];
  const nodes=new Map<number,{cell:Cell;prev:number}>([[start,{cell:origin,prev:-1}]]);
  for(let n=0;n<open.length;n++) {
    const cur=open[n];
    if(key(cur)===key(to)){
      const path:Cell[]=[];let here=key(cur);
      while(here!==start){const node=nodes.get(here)!;path.push(node.cell);here=node.prev;}
      return path.reverse();
    }
    for(const [dx,dz] of [[1,0],[0,1],[-1,0],[0,-1]]){
      const x=cur.x+dx,z=cur.z+dz;
      if(x<77||x>190||z<120||z>204)continue;
      for(const dy of [0,1,-1]){
        const y=cur.y+dy;
        if(y<9||y>75||!free(world,x,y,z)||[0,13].includes(world.get(x,y-1,z))) continue;
        if(dy>0 && world.get(cur.x,cur.y+2,cur.z)!==0 || dy<0 && world.get(x,cur.y+1,z)!==0)continue;
        const next={x,y,z},k=key(next);
        if(nodes.has(k))continue;
        nodes.set(k,{cell:next,prev:key(cur)});open.push(next);
      }
    }
  }
  throw new Error("徒歩経路がありません "+JSON.stringify({origin,to}));
}
function walk(world:World,p:Player,to:Cell) {
  const path=route(world,p,to);
  let distance=0;
  for(const cell of path) {
    const cx=cell.x+.5,cz=cell.z+.5;
    let arrived=false;
    for(let tick=0;tick<180;tick++) {
      const dx=cx-p.x,dz=cz-p.z,length=Math.hypot(dx,dz);
      if(length<.10 && Math.abs(p.y-cell.y)<.025 && p.grounded){arrived=true;break;}
      p.yaw=Math.atan2(-dx,-dz);
      const jump=cell.y>p.y+.6 && p.grounded && !p.wasJump;
      const ox=p.x,oz=p.z;
      stepPlayer(world,p,{forward:Math.min(1,length*2),right:0,sprint:false,down:false,jump},1/60,{bob:false});
      distance+=Math.hypot(p.x-ox,p.z-oz);
    }
    expect(arrived,"歩行中に立ち往生 "+JSON.stringify({cell,p:[p.x,p.y,p.z]}));
  }
  return distance;
}
function face(p:Player,x:number,y:number,z:number) {
  const dx=x-p.x,dz=z-p.z;
  p.yaw=Math.atan2(-dx,-dz);p.pitch=Math.atan2(y-p.y-eyeHeight(p),Math.hypot(dx,dz));
}
export function runJourney(seed="潮だまり・777") {
  const world=new World(seed,false,2),player=createPlayer(world.spawn()),bag=createBag("explore");
  const journey=createJourney();
  const home=world.spawn();journey.home={x:home.x,y:home.y,z:home.z};
  const observations:string[]=[];
  const grove=world.landmarks.find(m=>m.kind==="grove")!;
  const cave=world.landmarks.find(m=>m.kind==="cave")!;
  const ruin=world.landmarks.find(m=>m.kind==="ruin")!;
  let walked=0,mined=0,placed=0;
  function travel(c:Cell) {walked+=walk(world,player,c);}
  function mineNearby(id:number,held=0){
    const fx=Math.floor(player.x),fy=Math.floor(player.y),fz=Math.floor(player.z);
    if(held)expect(assignHotbar(bag,0,held,"explore"),"必要な道具を持っていません。");
    const targets:Cell[]=[];
    for(let y=fy-3;y<=fy+6;y++)for(let z=fz-5;z<=fz+5;z++)for(let x=fx-5;x<=fx+5;x++)
      if(world.get(x,y,z)===id)targets.push({x,y,z});
    const dist=(a:Cell)=>Math.hypot(a.x+.5-player.x,a.z+.5-player.z,a.y+.5-player.y-eyeHeight(player));
    targets.sort((a,b)=>dist(a)-dist(b));
    for(const t of targets){
      face(player,t.x+.5,t.y+.5,t.z+.5);
      const hit=raycast(world,player);
      if(!hit || hit.x!==t.x||hit.y!==t.y||hit.z!==t.z)continue;
      const result=mineAt(world,player,bag,"explore",0,hit);
      expect(result.ok,result.message);mined++;return t;
    }
    throw new Error("視線の届く素材がありません "+JSON.stringify({id,p:[fx,fy,fz]}));
  }
  function make(id:string,n=1,bench?:Cell){
    if(bench){
      face(player,bench.x+.5,bench.y+.5,bench.z+.5);
      const hit=raycast(world,player);
      expect(hit?.id===21 && hit.x===bench.x && hit.z===bench.z,"作業台に手が届きません。");
    }
    const r=craft(bag,id,n,{bench:!!bench,generator:2});expect(r.ok,id+" "+r.message);
    if(bench)world.useBench(bench.x,bench.y,bench.z,n);
    recipeCrafted(journey,id);
  }
  function put(id:number):Cell{
    expect(assignHotbar(bag,0,id,"explore"),"設置する素材がありません。");
    for(const [dx,dz] of [[2,0],[-2,0],[0,2],[0,-2],[-2,-2],[2,2]]){
      const x=Math.floor(player.x)+dx,z=Math.floor(player.z)+dz,y=Math.floor(player.y+.01)-1;
      if(world.get(x,y+1,z)!==0)continue;
      face(player,x+.5,y+.99,z+.5);
      const hit=raycast(world,player);
      if(!hit || hit.x!==x||hit.y!==y||hit.z!==z||hit.ny!==1||!canPlaceAt(world,player,hit))continue;
      const result=placeAt(world,player,bag,"explore",0,hit);expect(result.ok,result.message);
      placedDecor(journey,id,{x,y:y+1,z});placed++;return {x,y:y+1,z};
    }
    throw new Error("周囲に建てられる面がありません。");
  }
  mineNearby(5);
  travel({x:grove.x-2,y:grove.y,z:grove.z-1});
  while(quantity(bag,5)<6)mineNearby(5);
  observations.push("徒歩で風待ちの大樹へ行き、原木6個を採取");
  make("boards",6);make("sticks");make("wood-pick");make("bench");make("chest");
  const landing={x:Math.floor(home.x),y:Math.floor(home.y),z:Math.floor(home.z)};
  travel(landing);const bench=put(21),chest=put(22);
  travel({x:cave.x+1,y:cave.y,z:cave.z});
  mineNearby(11,17);make("lamp");
  travel({x:cave.x+7,y:cave.y,z:cave.z});expect(visitCave(journey,world,player,bag),"灯火を携えた入洞を検出できません。");
  const ore=mineNearby(23,17);
  expect(quantity(bag,24)===2,"潮晶のかけらは2個のはずです。");
  observations.push("作業台・チェストを設置し、灯晶を携えて鉱石洞窟を歩き、潮晶鉱石を採掘");
  travel({x:ruin.x,y:ruin.y,z:ruin.z});
  observations.push("潮見の回廊へ徒歩で到達");
  travel(landing);make("crystal-lamp",1,bench);const decoration=put(25);
  expect(journey.decorated,"拠点の飾りを検出できません。");
  const slots=world.chestAt(chest.x,chest.y,chest.z)!;
  face(player,chest.x+.5,chest.y+.5,chest.z+.5);
  expect(raycast(world,player)?.id===22,"チェストを開ける距離ではありません。");
  for (const id of [17,24]) expect(transferStack(bag,slots,"bag",bag.slots.findIndex(s=>s.id===id)).ok,"チェストに保管できません。");
  expect(!world.set(chest.x,chest.y,chest.z,0),"収納物のあるチェストが壊れました。");
  observations.push("拠点で青磁のランタンを製作・設置、消耗した道具と余った潮晶を収納");
  return {seed,world,bag,player,journey,observations,walked:Math.round(walked),mined,placed,bench,chest,ore,decoration,
    chestContents:structuredClone(slots) as Stack[]};
}
