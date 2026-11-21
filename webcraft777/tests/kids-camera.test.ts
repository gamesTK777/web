import assert from 'node:assert/strict'
import { test } from 'node:test'
import { PerspectiveCamera, Vector3 } from 'three'
import { firstPerson, KidsCamera } from '../src/kids-camera'
import { createPlayer, eyeHeight, raycast } from '../src/physics'

const player = () => createPlayer({ x:128.5, y:2, z:128.5, yaw:.92, pitch:-.43 })

test('見下ろし視点の照準は、同じプレイヤー位置から届く採掘面に重なる', () => {
  const p=player(), state={...p}
  const world={ get: (_x:number, y:number, _z:number) => y<=1 ? 1 : 0 }
  const hit=raycast(world,p)
  assert.ok(hit && hit.ny===1)
  const cam=new PerspectiveCamera(67,16/9,.06,320)
  const kids=new KidsCamera()

  assert.equal(kids.update(cam,world,p,hit,1/60),true)
  assert.ok(cam.position.y>p.y+4)
  assert.ok(cam.position.distanceTo(new Vector3(p.x,p.y,p.z))>7)
  assert.ok(Math.abs(kids.reticle.x-50)<.0001)
  const d=hit.distance-.035
  const aimed=new Vector3(p.x-Math.sin(p.yaw)*Math.cos(p.pitch)*d,
    p.y+eyeHeight(p)+Math.sin(p.pitch)*d,p.z-Math.cos(p.yaw)*Math.cos(p.pitch)*d).project(cam)
  assert.ok(Math.abs(kids.reticle.y-(1-aimed.y)*50)<.0001)
  assert.ok(kids.reticle.y>0 && kids.reticle.y<100)
  assert.deepEqual(p,state)
})

test('低い天井でカメラが引き込まれ、天井を外すと見下ろし視点に戻る', () => {
  const p=player(), cam=new PerspectiveCamera(67,16/9,.06,320), kids=new KidsCamera()
  let roof=true
  const world={ get: (_x:number, y:number, _z:number) => y<=1 || roof && y===4 ? 1 : 0 }
  assert.equal(kids.update(cam,world,p,raycast(world,p),1/60),false)
  assert.equal(cam.position.y,p.y+eyeHeight(p))
  assert.deepEqual(kids.reticle,{x:50,y:50})

  roof=false
  for(let i=0;i<30;i++)kids.update(cam,world,p,raycast(world,p),1/60)
  assert.ok(cam.position.y>p.y+4)
  firstPerson(cam,p)
  assert.deepEqual(cam.position.toArray(),[p.x,p.y+eyeHeight(p),p.z])
  assert.equal(cam.rotation.x,p.pitch)
  assert.equal(cam.rotation.y,p.yaw)
})
