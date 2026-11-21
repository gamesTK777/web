import test from 'node:test'
import assert from 'node:assert/strict'
import { Scene, type Object3D } from 'three'
import { AquaticLife } from '../src/aquatic-life.ts'
import { eyeHeight, createPlayer, type Player } from '../src/physics.ts'
import { World } from '../src/world.ts'

function pool() {
  let wallZ: number | undefined
  return {
    salt:958,
    spawn:()=>({x:30.5,y:33,z:48.5,yaw:0,pitch:0}),
    get:(x: number,y: number,z: number)=>{
      if(z===wallZ&&y<33)return 3
      const water=x>=18&&x<=48&&z>=10&&z<=42
      if(!water)return y<33?3:0
      return y<23?3:y<=28?13:0
    },
    wall:(z?: number)=>{wallZ=z},
  }
}

function aim(player: Player, shark: Object3D) {
  const dx=shark.position.x-player.x,dy=shark.position.y-player.y-eyeHeight(player),dz=shark.position.z-player.z
  player.yaw=Math.atan2(-dx,-dz)
  player.pitch=Math.atan2(dy,Math.hypot(dx,dz))
}
function swimmer(shark: Object3D, radius: number) {
  const player=createPlayer({x:shark.position.x,y:shark.position.y-1.62,z:shark.position.z-radius,yaw:0,pitch:0})
  aim(player,shark)
  return player
}

test('the generated lake near the spawn supplies two passive schools and a shark',()=>{
  for(const seed of ['first-cove','潮晶']) {
    const world=new World(seed,false,2), scene=new Scene(), life=new AquaticLife(world,scene)
    const {x,z}=world.spawn()
    assert.equal(scene.children.filter(child=>child.name==='aquatic-jade').length,5)
    assert.equal(scene.children.filter(child=>child.name==='aquatic-amber').length,5)
    assert.equal(scene.children.filter(child=>child.name==='aquatic-shark').length,1)
    for(const {position} of scene.children) {
      assert.equal(world.get(Math.floor(position.x),Math.floor(position.y),Math.floor(position.z)),13)
      assert.ok(Math.hypot(position.x-x,position.z-z)<32)
    }
    life.dispose()
    assert.equal(scene.children.length,0)
  }
})

test('sharks respect solid cover and bite swimmers at regulated intervals',()=>{
  const world=pool(), scene=new Scene(), life=new AquaticLife(world,scene)
  const shark=scene.getObjectByName('aquatic-shark')!
  const player=swimmer(shark,2.8)
  assert.ok(life.canAttack(player))
  world.wall(Math.floor(shark.position.z)-2)
  assert.ok(!life.canAttack(player))
  for(let step=0;step<17;step+=1)life.update(player,.1)
  assert.equal(life.health,100)
  world.wall()
  player.x=shark.position.x
  player.y=shark.position.y-.55
  player.z=shark.position.z-.92
  life.update(player,.04)
  assert.equal(life.health,80)
  for(let step=0;step<10;step+=1)life.update(player,.1)
  assert.equal(life.health,80)
  life.update(player,.1)
  assert.equal(life.health,80)
  player.y=36
  assert.ok(!life.attack(player))
  for(let step=0;step<60;step+=1)life.update(player,.1)
  assert.equal(life.health,100)
  life.dispose()
})

test('four aimed hits defeat a shark, with no double damage on the same swing',()=>{
  const world=pool(), scene=new Scene(), life=new AquaticLife(world,scene)
  const shark=scene.getObjectByName('aquatic-shark')!
  const player=swimmer(shark,2.8)
  for(let strike=1;strike<=4;strike+=1) {
    aim(player,shark)
    assert.ok(life.attack(player))
    assert.equal(life.sharkHealth,100-strike*25)
    if(strike===4)break
    assert.ok(life.attack(player))
    assert.equal(life.sharkHealth,100-strike*25)
    for(let step=0;step<4;step+=1)life.update(player,.1)
  }
  assert.equal(life.sharkDefeated,true)
  assert.equal(life.attack(player),false)
  assert.ok(Array.from({length:9},()=>life.consumeEvent()).includes('サメを倒しました！'))
  for(let step=0;step<8;step+=1)life.update(player,.1)
  assert.equal(shark.visible,false)
  life.dispose()
  const continued=new AquaticLife(world,scene,true)
  assert.equal(continued.sharkHealth,0)
  assert.equal(scene.getObjectByName('aquatic-shark'),undefined)
  assert.equal(scene.children.length,10)
  continued.dispose()
})

test('the flat building stage does not spawn aquatic life',()=>{
  const scene=new Scene()
  const life=new AquaticLife({...pool(),stage:'flat'},scene)
  assert.equal(life.hasAquaticLife,false)
  assert.equal(life.sharkHealth,null)
  assert.equal(scene.children.length,0)
})
