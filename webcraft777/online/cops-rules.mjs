export const copsStages = new Set(['park', 'crossing'])
export const jailSpawn = {x:128.5, y:33, z:184.5}
const rescuePad = {x:128.5, y:33, z:177.5}
const rescueReach = 2.3
const hideTime = 20_000
const rescueGrace = 2_000
const sampleWindow = 750

const inRescueZone = pose => Math.abs(pose.y-rescuePad.y)<=1.7 &&
  Math.hypot(pose.x-rescuePad.x,pose.z-rescuePad.z)<=rescueReach
const identity = ({id,nickname}) => ({id,nickname})

export function readCops(row) {
  return {
    phase:row.phase, hideUntil:row.hide_until, endsAt:row.ends_at, seq:row.seq, protectedUntil:row.protected_until,
    roster:JSON.parse(row.roster), policeIds:JSON.parse(row.police), jailedIds:JSON.parse(row.jailed),
    event:row.event===null?null:JSON.parse(row.event), winner:row.winner
  }
}

export function publicCops(state, serverNow) {
  const {phase, hideUntil, endsAt, seq, policeIds, jailedIds, event, winner, roster} = state
  return {
    phase, hideUntil, endsAt, serverNow, seq, policeIds, jailedIds, event, winner,
    enrolledIds:roster.map(player=>player.id),
    winnerIds:winner?roster.filter(player=>policeIds.includes(player.id)===(winner==='police')).map(player=>player.id):[],
    results:winner?roster:[]
  }
}

export function advanceCopsState(state, room, players, members, now, touches) {
  if (state.phase==='finished') return null

  if (state.phase==='waiting') {
    if (players.length<2) return null
    const captain = players.find(player=>player.id===room.creator) ?? players[0]
    const firstRunner = players.find(player=>player.id!==captain.id)
    const secondOfficer = members.length>=4 && members.find(player=>player.id!==captain.id&&player.id!==firstRunner.id)
    const policeIds = secondOfficer?[captain.id,secondOfficer.id]:[captain.id]
    const hideUntil = now+hideTime
    return {...state,phase:'hiding',hideUntil,endsAt:hideUntil+room.cops_minutes*60_000,
      roster:players.map(identity),policeIds}
  }

  const police = new Set(state.policeIds)
  const memberIds = new Set(members.map(player=>player.id))
  const stillHere = state.roster.filter(player=>memberIds.has(player.id))

  if (state.phase==='hiding') {
    // A prejoined player can finish loading during hiding without flipping roles.
    const roster = members.filter(player=>player.pose_at>0&&player.pose_at<state.hideUntil).map(identity)
    const nextRoster = [...new Map([...state.roster,...roster].map(player=>[player.id,player])).values()]
    if (now>=state.endsAt) return {...state,phase:'finished',roster:nextRoster,winner:'robbers'}
    if (now>=state.hideUntil) return {...state,phase:'playing',roster:nextRoster}
    if (nextRoster.length!==state.roster.length) return {...state,roster:nextRoster}
    return null
  }

  if (!stillHere.some(player=>police.has(player.id))) return {...state,phase:'finished',winner:'robbers'}
  if (now>=state.endsAt) return {...state,phase:'finished',winner:'robbers'}
  const robbers = stillHere.filter(player=>!police.has(player.id))
  const jailed = new Set(state.jailedIds)
  if (robbers.every(player=>jailed.has(player.id))) return {...state,phase:'finished',winner:'police'}
  if (now<state.protectedUntil) return null

  const enrolled = new Set(stillHere.map(player=>player.id))
  const officers = players.filter(player=>enrolled.has(player.id)&&police.has(player.id))
  const runners = players.filter(player=>enrolled.has(player.id)&&!police.has(player.id)&&!jailed.has(player.id))
  const rescuer = jailed.size>0 && runners.find(player=>inRescueZone(player.current)&&
    (!player.previous_pose||!inRescueZone(JSON.parse(player.previous_pose))))
  if (rescuer) return {...state,jailedIds:[],protectedUntil:now+rescueGrace,
    event:{kind:'rescue',ids:state.jailedIds,by:rescuer.id}}

  const earliest = Math.max(now-sampleWindow,state.hideUntil,state.protectedUntil)
  const captured=[]
  let by
  for (const runner of runners) {
    const officer=officers.find(player=>touches(player,runner,earliest))
    if (officer) {captured.push(runner.id);by??=officer.id}
  }
  if (!captured.length) return null
  const jailedIds=[...state.jailedIds,...captured]
  const won=robbers.every(player=>jailedIds.includes(player.id))
  return {...state,jailedIds,phase:won?'finished':state.phase,winner:won?'police':null,
    event:{kind:'capture',ids:captured,by}}
}
