import assert from 'node:assert/strict'
import {test} from 'node:test'
import {COPS_BOUNDS,COPS_JAIL,COPS_POLICE_SPAWN,COPS_RELEASE,COPS_RESCUE,COPS_ROBBER_SPAWN,COPS_WALK_Y,parkStairTop,PARK_SLIDE} from '../src/cops-stages'
import {createPlayer,playerPoseClear,stepPlayer,type Input} from '../src/physics'
import {SCHOOL_BOUNDS} from '../src/school'
import {TagMap} from '../src/tag-map'
import {isSolid,World} from '../src/world'

const park=new World('test-park',false,2,'park')
const crossing=new World('test-crossing',false,2,'crossing')
const walking:Input={forward:1,right:0,jump:false,sprint:false,down:false}
const coast:Input={...walking,forward:0}

function walkable(world:World,x:number,z:number) {
  return isSolid(world.get(x,COPS_WALK_Y-1,z))&&world.get(x,COPS_WALK_Y,z)===0&&world.get(x,COPS_WALK_Y+1,z)===0
}

function connected(world:World) {
  const ready:[number,number][]=[[Math.floor(COPS_ROBBER_SPAWN.x),Math.floor(COPS_ROBBER_SPAWN.z)]]
  const seen=new Set<number>()
  for(let i=0;i<ready.length;i++){
    const [x,z]=ready[i],key=z*256+x
    if(x<=COPS_BOUNDS.minX||x>=COPS_BOUNDS.maxX-1||z<=COPS_BOUNDS.minZ||z>=COPS_BOUNDS.maxZ-1||
      seen.has(key)||!walkable(world,x,z))continue
    seen.add(key)
    ready.push([x+1,z],[x-1,z],[x,z+1],[x,z-1])
  }
  return (x:number,z:number)=>seen.has(Math.floor(z)*256+Math.floor(x))
}

test('両方のアリーナで開始地点、牢屋と救出区画へ歩ける',()=>{
  for(const world of [park,crossing]){
    const reaches=connected(world)
    assert.deepEqual(world.spawn(),COPS_ROBBER_SPAWN)
    for(const {x,z} of [COPS_POLICE_SPAWN,COPS_JAIL,COPS_RELEASE,COPS_RESCUE]){
      assert(reaches(x,z))
      assert(walkable(world,Math.floor(x),Math.floor(z)))
    }
    for(let z=COPS_BOUNDS.minZ;z<COPS_BOUNDS.maxZ;z++)
      for(const x of [COPS_BOUNDS.minX,COPS_BOUNDS.maxX-1])
        assert(isSolid(world.get(x,COPS_WALK_Y+5,z)))
    for(let x=COPS_BOUNDS.minX;x<COPS_BOUNDS.maxX;x++)
      for(const z of [COPS_BOUNDS.minZ,COPS_BOUNDS.maxZ-1])
        assert(isSolid(world.get(x,COPS_WALK_Y+5,z)))
  }
})

test('遊具広場に乗り降りのための空間があり、アスレチックの高台へ歩いて登れる',()=>{
  const reaches=connected(park)
  for(const x of [106,146]) {
    assert(reaches(x,141))
    for(let dx=-7;dx<=7;dx++)for(let dz=-7;dz<=7;dz++){
      assert(walkable(park,x+dx,141+dz))
      for(let y=35;y<41;y++)assert.equal(park.get(x+dx,y,141+dz),0)
    }
  }
  for(const [x,z,feet] of [[85.5,125.7,40],[114.5,127.7,42]]) {
    assert(reaches(x,z))
    const player=createPlayer({x,y:33,z,yaw:0,pitch:0})
    for(let i=0;i<130;i++)stepPlayer(park,player,walking,1/60)
    assert.equal(player.y,feet,JSON.stringify(player))
    assert(player.z<z-7)
  }
})

test('大滑り台は歩いて最上部へ入り、継ぎ目で立ち止まらず地上へ滑れる',()=>{
  const player=createPlayer({x:178.5,y:33,z:131.5,yaw:0,pitch:0})
  for(let i=0;i<206;i++)stepPlayer(park,player,walking,1/60)
  assert.equal(player.y,PARK_SLIDE.topY,JSON.stringify(player))
  assert(player.z<118,JSON.stringify(player))
  assert.equal(parkStairTop(178,119),PARK_SLIDE.topY)
  const slider=createPlayer({x:PARK_SLIDE.minX+1.5,y:PARK_SLIDE.topY,z:PARK_SLIDE.firstZ-.45,yaw:Math.PI,pitch:0})
  for(let i=0;i<22;i++)stepPlayer(park,slider,walking,1/60)
  assert(slider.vz>0)
  const started=slider.z
  for(let i=0;i<240;i++)stepPlayer(park,slider,coast,1/60)
  assert(slider.z>started+9,JSON.stringify(slider))
  assert.equal(Math.round(slider.y),COPS_WALK_Y)
})

test('街の中心に斜めの横断歩道があり、各方向の道から広場と裏通りへつながる',()=>{
  const reaches=connected(crossing)
  for(const [x,z] of [[73,128],[182,128],[127,67],[128,194],[100,173],[90,91],[171,90],[174,171]])
    assert(reaches(x,z),[x,z].join(','))
  assert.equal(crossing.get(128,32,128),9)
  assert.equal(crossing.get(131,32,131),14)
  assert.equal(crossing.get(138,32,128),14)
  assert(crossing.lamps.size>150)
})

test('追加した5ステージでは、開始地点から救出区画へ実際に歩ける',()=>{
  for(const stage of ['classic','flat','lake','school','frontier'] as const){
    const world=new World('outpost-route',false,2,stage,true)
    for(const point of [COPS_POLICE_SPAWN,COPS_JAIL,COPS_RELEASE,COPS_RESCUE]){
      assert(playerPoseClear(world,point),`${stage} ${point.z} clearance`)
      assert(walkable(world,Math.floor(point.x),Math.floor(point.z)),`${stage} ${point.z} floor`)
    }
    const player=createPlayer({...world.spawn(),yaw:Math.PI})
    for(let i=0;i<800&&player.z<COPS_RESCUE.z;i++)stepPlayer(world,player,walking,1/60)
    assert(Math.abs(player.z-COPS_RESCUE.z)<.10 && player.grounded,`${stage}: ${JSON.stringify(player)}`)
    assert(world.lamps.size>0)
  }
})

test('湖の牢屋には水中から登れる段があり、学校の出口と牢屋はドロケイでだけ加わる',()=>{
  const lake=new World('outpost-modes',false,2,'lake',true)
  const plainLake=new World('outpost-modes',false,2,'lake')
  assert.equal(plainLake.get(128,32,184),0)
  assert.equal(lake.get(117,28,171),13)
  const player=createPlayer({x:111.5,y:28.4,z:171.5,yaw:0,pitch:0})
  for(let i=0;i<180&&player.x<112.45;i++)stepPlayer(lake,player,{...coast,right:1,jump:true},1/60)
  assert(player.x>=112.45&&player.y>=29,JSON.stringify(player))
  for(const x of [112,113,114,115]){
    assert.equal(lake.get(x,28+x-112,171),7)
  }
  const school=new World('outpost-modes',false,2,'school',true)
  const plainSchool=new World('outpost-modes',false,2,'school')
  for(const gate of [SCHOOL_BOUNDS.minZ,SCHOOL_BOUNDS.maxZ-1]){
    assert.equal(school.get(128,33,gate),0)
    assert(isSolid(plainSchool.get(128,33,gate)))
  }
  assert(!isSolid(plainSchool.get(118,33,184)))
  assert(isSolid(school.get(118,33,184)))
})

test('エリア地図は遊び方で牢屋を表示し、通常の公園では外側も含める',()=>{
  const captions:string[]=[]
  const noop=()=>{}
  const ctx={fillText:(text:string)=>captions.push(text),fillRect:noop,strokeRect:noop,clearRect:noop,
    drawImage:noop,beginPath:noop,moveTo:noop,lineTo:noop,stroke:noop,arc:noop,fill:noop}
  const surface={width:384,height:384,getContext:()=>ctx}
  const canvas={...surface,ownerDocument:{createElement:()=>({...surface})}} as unknown as HTMLCanvasElement
  const outsidePark={x:52,y:33,z:52}
  new TagMap(canvas,park).update([{pose:outsidePark}],park.spawn(),true)
  assert.deepEqual(captions,['1'])
  captions.length=0
  const school=new World('outpost-map',false,2,'school',true)
  const map=new TagMap(canvas,school,undefined,true)
  map.update([],school.spawn(),false)
  assert.deepEqual(captions,['牢屋'])
  captions.length=0
  map.update([],{...school.spawn(),y:40},false)
  assert.deepEqual(captions,[])
})
