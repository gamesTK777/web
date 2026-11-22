export const contactWindow = 750

const reach = .68
const bodyHeight = pose => pose.crouched ? 1 : 1.82
const mix = (from, to, part) => from + (to - from) * part
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)

export function contactTrack(row) {
  const samples = JSON.parse(row.pose_history)
  // Legacy rows have no corrected timestamps until their first new sample.
  if (!samples.length && row.previous_pose && row.previous_pose_at > 0)
    samples.push([row.previous_pose_at, JSON.parse(row.previous_pose)])
  const latest = row.sample_at || row.pose_at
  samples.push([latest, row.current])
  const legs = []
  for (let i = 1; i < samples.length; i++) {
    const [start, from] = samples[i - 1], [end, to] = samples[i], span = end - start
    if (span <= 0 || span > contactWindow || distance(from, to) > .5 + 22 * span / 1000) continue
    legs.push({from, to, start, end, span, height:Math.min(bodyHeight(from), bodyHeight(to))})
  }
  return {latest, legs}
}

function sampledPosition(track, time) {
  const part = (time - track.start) / track.span
  return {x:mix(track.from.x, track.to.x, part), y:mix(track.from.y, track.to.y, part),
    z:mix(track.from.z, track.to.z, part)}
}

function overlap(a, b, start, end) {
  const a0 = sampledPosition(a, start), b0 = sampledPosition(b, start)
  const a1 = sampledPosition(a, end), b1 = sampledPosition(b, end)
  const x = a0.x - b0.x, y = a0.y - b0.y, z = a0.z - b0.z
  const dx = a1.x - b1.x - x, dy = a1.y - b1.y - y, dz = a1.z - b1.z - z
  // Intersect the simultaneous body heights before minimizing horizontal separation.
  let low = 0, high = 1
  const yMin = -a.height + .001, yMax = b.height - .001
  if (dy) {
    const first = (yMin - y) / dy, second = (yMax - y) / dy
    low = Math.max(low, Math.min(first, second))
    high = Math.min(high, Math.max(first, second))
    if (low > high) return false
  } else if (y < yMin || y > yMax) return false
  const speedSquared = dx * dx + dz * dz
  const nearest = speedSquared ? -(x * dx + z * dz) / speedSquared : 0
  const at = Math.max(low, Math.min(high, nearest))
  return Math.hypot(x + dx * at, z + dz * at) <= reach
}

export function bodiesTouch(a, b, earliest) {
  if (a.pose_at < earliest || b.pose_at < earliest) return false
  const am = a.contactTrack, bm = b.contactTrack
  if (am.latest < earliest || bm.latest < earliest) return false
  const aLegs = am.legs, bLegs = bm.legs
  let i = 0, j = 0
  while (i < aLegs.length && j < bLegs.length) {
    const first = aLegs[i], second = bLegs[j]
    const start = Math.max(first.start, second.start, earliest), end = Math.min(first.end, second.end)
    if (start <= end && overlap(first, second, start, end)) return true
    if (first.end === second.end) { i++; j++ }
    else if (first.end < second.end) i++
    else j++
  }
  const aTail = aLegs.at(-1), bTail = bLegs.at(-1)
  // If both latest segments overlap, their simultaneous positions already decided contact.
  if (aTail?.end === am.latest && bTail?.end === bm.latest &&
      Math.max(aTail.start, bTail.start, earliest) <= Math.min(aTail.end, bTail.end)) return false
  // For participants without overlapping samples, only accept a close pair of fresh endpoints.
  return Math.abs(am.latest - bm.latest) <= 120 && a.current.y < b.current.y + bodyHeight(b.current) &&
    b.current.y < a.current.y + bodyHeight(a.current) &&
    Math.hypot(a.current.x - b.current.x, a.current.z - b.current.z) <= reach
}
