import test from 'node:test'
import assert from 'node:assert/strict'
import * as T from 'three'
import {World,affectedChunks,chunkKey} from '../src/world'
import {meshChunk} from '../src/mesher'
import {makeAtlas,tileFor,tileUV} from '../src/textures'

test('32画素の地表を固定の三柄から選び、アトラスの余白は周囲の色を保つ',()=>{
  const texture=makeAtlas(), image=texture.image
  assert.equal(texture.colorSpace,T.SRGBColorSpace)
  for(const id of [1,2,3]){
    assert.equal(new Set([0,1,2].map(v=>tileFor(id,1,0,0,'y',v))).size,3)
  }
  const {width,height,data}=image
  function rgba(x:number,y:number){return Array.from(data.subarray((y*width+x)*4,(y*width+x)*4+4))}
  for(const tile of [0,3,5,8,13,22,28,30,32,34,35,38]){
    const [u0,v0]=tileUV(tile,0,0),[u1,v1]=tileUV(tile,1,1)
    const x0=Math.floor(u0*width),x1=Math.floor(u1*width),y0=Math.floor(v0*height),y1=Math.floor(v1*height)
    assert.equal(x1-x0+1,32);assert.equal(y1-y0+1,32)
    for(let n=0;n<32;n++){
      assert.deepEqual(rgba(x0-15,y0+n),rgba(x0,y0+n))
      assert.deepEqual(rgba(x1+15,y0+n),rgba(x1,y0+n))
      assert.deepEqual(rgba(x0+n,y0-15),rgba(x0+n,y0))
      assert.deepEqual(rgba(x0+n,y1+15),rgba(x0+n,y1))
    }
  }
  texture.dispose()
})

test('原木の六面から指定した軸の二つだけが年輪になる',()=>{
  const axes=['x','y','z'] as const
  for(const axis of axes){
    const results=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(([x,y,z])=>tileFor(5,y,x,z,axis))
    assert.equal(results.filter(t=>t===6).length,2)
    assert.equal(results[axes.indexOf(axis)*2],6)
  }
})

test('別チャンクの斜めの石を取り除くと角のAOが元の明るさに戻る',()=>{
  const world=new World('角の陰影'),x=31,y=79,z=31
  world.set(x,y,z,3)
  const brightness=()=>{
    const [g]=meshChunk(world,x>>4,y>>4,z>>4,0)
    assert(g)
    try{
      const positions=g.getAttribute('position'),normals=g.getAttribute('normal'),surface=g.getAttribute('surface')
      for(let i=0;i<positions.count;i++){
        if(positions.getX(i)===x+1&&positions.getY(i)===y+1&&positions.getZ(i)===z+1&&normals.getY(i)===1)
          return surface.getX(i)
      }
      throw Error('対象の石の上面がありません')
    } finally {g.dispose()}
  }
  const clear=brightness()
  world.set(x+1,y+1,z+1,3)
  assert(affectedChunks(x+1,y+1,z+1).includes(chunkKey(x>>4,y>>4,z>>4)))
  assert(brightness()<clear)
  world.set(x+1,y+1,z+1,0)
  assert.equal(brightness(),clear)
})

test('同じチャンクの水とガラスは別々の透明メッシュでソートされる',()=>{
  const world=new World('川辺の窓')
  world.set(39,81,33,13);world.set(37,81,36,10)
  const [solid,water,glass]=meshChunk(world,2,5,2)
  assert.equal(solid,null);assert(water&&glass)
  assert(water.boundingSphere && glass.boundingSphere)
  assert.notDeepEqual(water.boundingSphere.center,glass.boundingSphere.center)
  water.dispose();glass.dispose()
})
