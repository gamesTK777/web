import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { NetPose } from '../src/online-client'
import { clearRemoteFraction, predictRemotePosition, remoteSampleAge, sampleRemoteMotion } from '../src/remote-motion'

const sample=(x:number,poseAt:number,moving=true,sampleAgeMs=0)=>({pose:{x,y:4,z:10.5,yaw:0,moving,crouched:false,flying:false} satisfies NetPose,poseAt,sampleAgeMs})
const empty={get:()=>0}

test('remote prediction uses server spacing rather than jitter between receipts and has a hard cap',()=>{
  const prior=sampleRemoteMotion(undefined,sample(9,1000),200)
  const current=sampleRemoteMotion(prior,sample(10.8,1200,true,45),550)
  assert.ok(Math.abs(current.vx-9)<1e-7)
  assert.ok(Math.abs(predictRemotePosition(empty,current,550).x-11.205)<1e-7)
  const fullLead=predictRemotePosition(empty,current,720).x
  assert.ok(Math.abs(fullLead-11.65)<1e-7)
  assert.equal(predictRemotePosition(empty,current,1100).x,current.pose.x)
})

test('duplicate and out-of-order snapshots do not rewind motion or renew its freshness',()=>{
  const prior=sampleRemoteMotion(undefined,sample(9,1000),200)
  const current=sampleRemoteMotion(prior,sample(10,1200),400)
  const duplicate=sampleRemoteMotion(current,sample(10,1200),550)
  assert.equal(duplicate,current)
  assert.equal(remoteSampleAge(duplicate,550),150)
  assert.equal(sampleRemoteMotion(current,sample(9.5,1100),600),current)
  const stopped=sampleRemoteMotion(current,sample(10,1400,false),600)
  assert.equal(stopped.vx,0)
  assert.equal(predictRemotePosition(empty,stopped,650).x,10)
})

test('jail transfers and resumed snapshot streams snap without predicting through the gap',()=>{
  const prior=sampleRemoteMotion(undefined,sample(9,1000),200)
  const jailed=sampleRemoteMotion(prior,sample(16.5,1200,false),400)
  assert.equal(jailed.snap,true)
  assert.equal(predictRemotePosition(empty,jailed,440).x,16.5)
  const resumed=sampleRemoteMotion(jailed,sample(17,2000),1220)
  assert.equal(resumed.snap,true)
  assert.equal(resumed.vx,0)
})

test('both extrapolation and visual corrections keep the body clear of voxel walls',()=>{
  const wall={get:(x:number,y:number)=>x===11&&y>=4?3:0}
  const prior=sampleRemoteMotion(undefined,sample(9,1000),200)
  const current=sampleRemoteMotion(prior,sample(10.5,1200,true,100),400)
  const drawn=predictRemotePosition(wall,current,400)
  assert.ok(drawn.x>10.5&&drawn.x<=10.7)
  assert.ok(clearRemoteFraction(wall,current.pose,{x:12.5,y:4,z:10.5})<1)
  assert.equal(clearRemoteFraction(wall,current.pose,{x:10.5,y:4,z:11.4}),1)
})
