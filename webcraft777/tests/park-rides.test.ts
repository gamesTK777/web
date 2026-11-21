import test from 'node:test'
import assert from 'node:assert/strict'
import { Scene, Vector3 } from 'three'
import { PARK_RIDES, ParkRides, parkRideSeatPose, type ParkRideSeat } from '../src/park-rides.ts'

function cycle(rides:ParkRides, seats:ParkRideSeat[], seconds:number) {
  for(let elapsed=0;elapsed<=seconds*1000;elapsed+=16)rides.update(seats,elapsed)
}

test('swings pick the nearest empty seat and pumping visibly extends the arc',()=>{
  const scene=new Scene(), slow=new ParkRides(scene), lively=new ParkRides(scene)
  const anchor=PARK_RIDES.swings
  assert.equal(slow.target({...anchor,x:anchor.x+2})?.seat,1)
  assert.equal(slow.target({...anchor,z:anchor.z-6}),null)
  const seat:ParkRideSeat={id:'swings',seat:1,memberId:'player',pump:0}
  let slowArc=0, livelyArc=0
  for(let ms=0;ms<=4000;ms+=16){
    slow.update([seat],ms)
    lively.update([{...seat,pump:1}],ms)
    slowArc=Math.max(slowArc,Math.abs(slow.playerPose('player')!.z-anchor.z))
    livelyArc=Math.max(livelyArc,Math.abs(lively.playerPose('player')!.z-anchor.z))
  }
  assert(livelyArc>slowArc*2.5)
  assert.equal(slow.target({...anchor,x:anchor.x+2})?.seat,0)
  assert.equal(slow.exit('player')?.y,anchor.y+.03)
  assert(Math.abs(slow.exit('player')!.z-anchor.z)>livelyArc)
  slow.dispose();lively.dispose()
  assert.equal(scene.children.length,0)
})

test('four seesaw seats share a rigid tilt, face the center and dismount separately',()=>{
  const scene=new Scene(), rides=new ParkRides(scene),anchor=PARK_RIDES.seesaw
  const seats:ParkRideSeat[]=Array.from({length:4},(_,seat)=>({id:'seesaw',seat,memberId:'u'+seat,pump:seat<2?1:0}))
  cycle(rides,seats,1.26)
  const deck=rides.group.getObjectByName('park-seesaw-deck')!
  assert(Math.abs(deck.rotation.z)>.04)
  assert.equal(rides.target(anchor)?.seat,undefined)
  assert.match(rides.target(anchor)!.label,/満席/)
  const places=seats.map(({memberId})=>rides.playerPose(memberId)!)
  assert.equal(places[0].y,places[1].y)
  assert.equal(places[2].y,places[3].y)
  assert.notEqual(places[1].y,places[2].y)
  assert.equal(places[0].yaw,-Math.PI/2)
  assert.equal(places[3].yaw,Math.PI/2)
  assert.deepEqual(places[3],parkRideSeatPose('seesaw',3,deck.rotation.z))
  const rendered=deck.localToWorld(new Vector3(3.52,.18,.55))
  assert(Math.abs(rendered.x-places[3].x)<1e-9)
  assert(Math.abs(rendered.y-.43-places[3].y)<1e-9)
  assert(Math.abs(rendered.z-places[3].z)<1e-9)
  const exits=seats.map(({memberId})=>rides.exit(memberId)!)
  assert.equal(new Set(exits.map(({x,z})=>x+','+z)).size,4)
  assert(exits.every(({x,y,z})=>Math.abs(x-anchor.x)<7&&Math.abs(z-anchor.z)<7&&y===anchor.y+.03))
  rides.update([],1400)
  assert.equal(rides.playerPose('u0'),undefined)
  assert.equal(rides.target(anchor)?.seat,0)
  rides.dispose()
})
