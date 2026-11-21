import assert from 'node:assert/strict'
import {test} from 'node:test'
import {copsBotPose,copsBotSpawn} from '../online/cops-bots.mjs'
import {COPS_POLICE_SPAWN,COPS_RESCUE,COPS_ROBBER_SPAWN,type CopsStage} from '../src/cops-stages'
import {BODY_RADIUS} from '../src/physics'
import {World,isSolid} from '../src/world'

const flat=(x:number,z:number,y=33)=>({x,y,z,yaw:0,pitch:0,moving:false,crouched:false,flying:false})
const distance=(a:{x:number;z:number},b:{x:number;z:number})=>Math.hypot(a.x-b.x,a.z-b.z)

function clear(world:World,pose:ReturnType<typeof flat>){
  for(const dx of [-BODY_RADIUS,BODY_RADIUS])for(const dz of [-BODY_RADIUS,BODY_RADIUS]){
    for(const dy of [0,1]){
      const x=Math.floor(pose.x+dx), y=pose.y+dy, z=Math.floor(pose.z+dz)
      assert.equal(isSolid(world.get(x,y,z)),false,`CPU inside block at ${x},${y},${z}`)
    }
  }
}

function simulate(stage:CopsStage,start:ReturnType<typeof flat>,policeIds:string[],jailedIds:string[],
    players:{id:string;pose:ReturnType<typeof flat>}[],reached:(p:ReturnType<typeof flat>)=>boolean,count=220){
  const world=new World('cops-bot-paths',false,2,stage)
  let pose=start
  for(let i=0;i<count;i++){
    const next=copsBotPose({stage,id:'cpu-1',pose,elapsed:.26,now:1_000_000+i*260,policeIds,jailedIds,players})
    assert([next.x,next.y,next.z,next.yaw].every(Number.isFinite))
    assert(distance(pose,next)<=7.2*.26+.00001)
    clear(world,next)
    if(pose.y===next.y)for(let j=1;j<=4;j++){
      clear(world,{...next,x:pose.x+(next.x-pose.x)*j/5,z:pose.z+(next.z-pose.z)*j/5})
    }
    if(reached(next))return next
    pose=next
  }
  assert.fail(`${stage} route failed from ${JSON.stringify(start)} at ${JSON.stringify(pose)}`)
}

for (const stage of ['park','crossing'] as const){
  test(`${stage} のCPU出現地点は重ならず、安全な地上にある`,()=>{
    const world=new World('cops-bot-spawns',false,2,stage)
    const poses=Array.from({length:7},(_,i)=>copsBotSpawn(stage,i))
    assert.equal(new Set(poses.map(pose=>`${pose.x}:${pose.z}`)).size,poses.length)
    for(const pose of poses){
      assert(distance(pose,COPS_ROBBER_SPAWN)>1)
      assert(isSolid(world.get(Math.floor(pose.x),pose.y-1,Math.floor(pose.z))))
      clear(world,pose)
    }
  })

  test(`${stage} のケイCPUは壁を迂回してドロに接近する`,()=>{
    const start=stage==='park'?flat(80.5,154.5):flat(74.5,98.5)
    const target=stage==='park'?flat(80.5,159.5):flat(78.5,98.5)
    simulate(stage,start,['cpu-1'],[],[{id:'runner',pose:target}],pose=>distance(pose,target)<.68)
  })

  test(`${stage} のドロCPUは離れた場所から救出エリアに入る`,()=>{
    const players=[{id:'officer',pose:flat(COPS_POLICE_SPAWN.x,110.5)}]
    simulate(stage,copsBotSpawn(stage,0),['officer'],['jailed'],players,
      pose=>distance(pose,COPS_RESCUE)<=COPS_RESCUE.radius&&pose.y===COPS_RESCUE.y)
  })
}

test('公園のケイCPUは階段を使って高台まで追跡できる',()=>{
  const target=flat(85.5,117.5,40)
  simulate('park',flat(85.5,126.5),['cpu-1'],[],[{id:'runner',pose:target}],
    pose=>pose.y===target.y&&distance(pose,target)<.68)
})

test('待機・隠れ時間のケイと捕まったドロは停止する',()=>{
  const request={stage:'park',id:'cpu-1',pose:flat(128.5,168.5),elapsed:.26,now:1_000_000,
    players:[{id:'runner',pose:flat(128.5,167.5)}],policeIds:['cpu-1'],jailedIds:[]}
  for(const phase of ['waiting','hiding','finished']){
    const pose=copsBotPose({...request,phase})
    assert.equal(distance(pose,request.pose),0)
    assert.equal(pose.moving,false)
  }
  assert.equal(copsBotPose({...request,policeIds:[],jailedIds:['cpu-1']}).moving,false)
})
