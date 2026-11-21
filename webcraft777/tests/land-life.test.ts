import test from 'node:test';
import assert from 'node:assert/strict';
import {Scene,type InstancedMesh} from 'three';
import {World} from '../src/world.ts';
import {eyeHeight,type Pose} from '../src/physics.ts';
import {clearBody,grounded} from '../src/npc-path.ts';
import {NpcWorld,npcShape} from '../src/npc.ts';
import {LandLife} from '../src/land-life.ts';

test('旧地形と現行地形の地上に12体を再現でき、建物や採掘の差分を書き換えない',()=>{
  for(const generator of [1,2] as const)for(const seed of ['777','丘の牧場','雨の岬']){
    const world=new World(seed,false,generator),start=world.spawn();
    world.set(start.x|0,(start.y|0)+4,start.z|0,7);
    const edits=world.exportEdits();
    const first=new NpcWorld(world),second=new NpcWorld(world);
    assert.equal(first.introduce(start),true,seed);
    assert.equal(second.introduce(start),true,seed);
    assert.deepEqual(first.entities,second.entities);
    assert.equal(first.introduce(start),false);
    assert.deepEqual(world.exportEdits(),edits);
    assert.equal(first.entities.filter(n=>n.kind==='villager').length,4);
    assert.equal(first.entities.filter(n=>n.kind==='sheep').length,4);
    assert.equal(first.entities.filter(n=>n.kind==='cow').length,4);
    for(const n of first.entities){
      assert(clearBody(world,n,npcShape[n.kind],true),n.name);
      assert(grounded(world,n,npcShape[n.kind]),n.name);
    }
    first.dispose();second.dispose();
  }
});

test('住民と動物が歩き出し、歩行中も水やブロックに入り込まない',()=>{
  const world=new World('丘の牧場',false,2),start=world.spawn();
  const sim=new NpcWorld(world);
  assert(sim.introduce(start));
  const initial=sim.entities.map(n=>[n.x,n.y,n.z]);
  for(let i=0;i<350;i++){
    sim.step(.05,start,true);
    for(const n of sim.entities)assert(clearBody(world,n,npcShape[n.kind],true),n.name);
  }
  const walked=sim.entities.filter((n,i)=>Math.hypot(n.x-initial[i][0],n.z-initial[i][2])>.3);
  assert(walked.some(n=>n.kind==='villager'));
  assert(walked.some(n=>n.kind!=='villager'));
  sim.dispose();
});

test('地形と視線を用いて住民を識別し、話しかけられる。表示の破棄でモデルも外れる',()=>{
  const world=new World('777',false,2),start=world.spawn(),scene=new Scene();
  const sim=new NpcWorld(world),land=new LandLife(world,scene,start);
  assert(sim.introduce(start));
  const n=sim.entities[0];
  const pose:Pose={...start,yaw:Math.atan2(start.x-n.x,start.z-n.z),
    pitch:Math.atan2(n.y+1.3-(start.y+eyeHeight(start)),Math.hypot(n.x-start.x,n.z-start.z))};
  land.update(pose,0,.39);
  const actors=scene.getObjectByName('羊・牛・村人') as InstancedMesh;
  assert(actors.visible&&actors.count>=12*20);
  assert.equal(land.targetLabel(pose),'ナギ（住民）');
  assert.match(land.interact(pose)??'',/^ナギ「こんにちは/);
  assert.equal(land.interact({...pose,yaw:pose.yaw+Math.PI}),null);
  assert(land.occupies(n.x|0,n.y,n.z|0));
  land.dispose();sim.dispose();
  assert.equal(scene.children.length,0);
});
