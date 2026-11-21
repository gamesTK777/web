import test from 'node:test';
import assert from 'node:assert/strict';
import {createBag} from '../src/inventory.ts';
import {createPlayer,placeAt,raycast,stepPlayer,type Input} from '../src/physics.ts';
import {jumpPadHeight,slideDirection,slideHeight} from '../src/playground.ts';

const idle:Input={forward:0,right:0,jump:false,down:false,sprint:false};
const ground={x:30.5,y:5,z:30.5,yaw:0,pitch:0};
function fixture(){
  const changed=new Map<string,number>();
  return {
    get(x:number,y:number,z:number){return changed.get([x,y,z].join(','))??(y>=0&&y<4?3:0);},
    set(x:number,y:number,z:number,id:number){changed.set([x,y,z].join(','),id);return true;},
  };
}

test('S・M・Lのジャンプ台は踏むだけで約3・6・10ブロック上に跳ねる',()=>{
  for(const id of [27,28,29]){
    const world=fixture(),p=createPlayer(ground);
    world.set(30,4,30,id);
    let apex=p.y;
    for(let i=0;i<200;i++){
      stepPlayer(world,p,idle,.01);
      apex=Math.max(apex,p.y);
      if(p.vy<0)break;
    }
    assert.ok(Math.abs(apex-ground.y-jumpPadHeight(id))<.18,`${id}: ${apex-ground.y}`);
  }
});

test('4方向のスライダーを無操作で滑り、4つの継ぎ目を通って安全に地面へ出る',()=>{
  for(const id of [30,31,32,33]){
    const world=fixture(),d=slideDirection(id);
    for(let i=0;i<5;i++)world.set(30+d.x*i,8-i,30+d.z*i,id);
    const p=createPlayer({x:30.5-.23*d.x,y:9,z:30.5-.23*d.z,yaw:0,pitch:0});
    assert.ok(Math.abs(slideHeight(id,.5-.5*d.x,.5-.5*d.z)-1)<1e-8);
    assert.ok(Math.abs(slideHeight(id,.5+.5*d.x,.5+.5*d.z)-.04)<1e-8);
    const sx=p.x,sz=p.z;
    for(let i=0;i<220;i++){
      const old=p.y;
      stepPlayer(world,p,idle,.01);
      assert.ok(old-p.y<.16,`スライダー${id}の段差: ${old-p.y}`);
    }
    assert.ok((p.x-sx)*d.x+(p.z-sz)*d.z>4.7,`スライダー${id}: ${JSON.stringify(p)}`);
    assert.ok(Math.abs(p.y-4)<.002,`スライダー${id}の着地点: ${p.y}`);
    assert.ok(p.grounded);
  }
});

test('スライダーの傾斜面を照準で拾い、実際に空いている上側は通過する',()=>{
  const world=fixture();
  world.set(30,4,30,30);
  const front=raycast(world,{x:30.5,y:3.18,z:29.2,yaw:Math.PI,pitch:0});
  assert.equal(front?.id,30);assert.equal(front?.ny,1);
  assert.ok(front&&Math.abs(front.distance-(.80+(.8-.04)/.96))<.001);
  world.set(32,4,30,7);
  const side=raycast(world,{x:28.5,y:3.18,z:30.1,yaw:-Math.PI/2,pitch:0});
  assert.equal(side?.id,7);
});

test('向きを選んだスライダーを置いても共通の所持枠を消費する',()=>{
  const world=fixture(),p={x:30.5,y:4,z:30.5,yaw:0,pitch:-.68};
  const hit=raycast(world,p);
  assert.ok(hit&&hit.ny===1);
  const bag=createBag('explore');
  bag.hotbar[0]=30;bag.slots=[{id:30,count:2}];
  assert.equal(placeAt(world,p,bag,'explore',0,hit,29).ok,false);
  assert.equal(placeAt(world,p,bag,'explore',0,hit,32).ok,true);
  assert.equal(world.get(hit.x,hit.y+1,hit.z),32);
  assert.equal(bag.slots[0].count,1);
});
