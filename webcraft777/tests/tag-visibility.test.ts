import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PerspectiveCamera, Vector3 } from 'three'
import { tagNameVisible } from '../src/tag-visibility'

test('tag names are limited to the visible body and respect solid cover and the view direction',()=>{
  const camera=new PerspectiveCamera(65,1,.05,90)
  camera.position.set(.5,2.6,.5)
  camera.updateMatrixWorld()
  const sample=new Vector3(),player={x:.5,y:1,z:-7,yaw:0,pitch:0}
  const empty={get:()=>0}, wall={get:(_x:number,y:number,z:number)=>z===-3&&y<=2?3:0}
  const glass={get:(_x:number,_y:number,z:number)=>z===-3?10:0}
  assert.equal(tagNameVisible(empty,camera,player,sample),true)
  assert.equal(tagNameVisible(wall,camera,player,sample),false)
  assert.equal(tagNameVisible(glass,camera,player,sample),true)
  assert.equal(tagNameVisible(empty,camera,{...player,x:18},sample),false)
  assert.equal(tagNameVisible(empty,camera,{...player,z:8},sample),false)
  assert.equal(tagNameVisible(empty,camera,{...player,z:-30},sample),false)
})
