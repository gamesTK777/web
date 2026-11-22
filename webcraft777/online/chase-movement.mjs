export const CHASE_WALK_SPEED = 4.2
export const STAMINA_RECOVERY_DELAY = 1.2

const maxEnergy = 100
const sprintDrain = 25
const recoveryRate = 22

export function chaseSprintSpeed(mode, isIt = false) {
  return mode === 'tag' && isIt ? 9 : 6.3
}

export function createStamina() {
  return {energy:maxEnergy, rest:0, exhausted:false}
}

export function advanceStamina(state, wantsSprint, elapsed) {
  if (!Number.isFinite(elapsed) || elapsed <= 0) return false
  if (wantsSprint && !state.exhausted && state.energy > 0) {
    state.energy = Math.max(0, state.energy - sprintDrain * elapsed)
    state.rest = 0
    state.exhausted = state.energy === 0
    return true
  }
  // Recover even if the button stays held. A held sprint never restarts itself.
  state.exhausted = wantsSprint && (state.exhausted || state.energy === 0)
  const rest = state.rest + elapsed
  const recovering = Math.max(0, rest - Math.max(state.rest, STAMINA_RECOVERY_DELAY))
  state.rest = Math.min(STAMINA_RECOVERY_DELAY, rest)
  state.energy = Math.min(maxEnergy, state.energy + recoveryRate * recovering)
  return false
}

export function botPace(previous, mode, isIt, wantsSprint, elapsed) {
  const fresh = () => ({...(previous ?? createStamina())})
  const stamina = fresh()
  // Wait for enough energy to make another useful dash, then release it.
  const request = wantsSprint && !(stamina.exhausted && stamina.energy >= 55)
  const sprinting = advanceStamina(stamina, request, elapsed)
  const travel = (sprinting ? chaseSprintSpeed(mode, isIt) : CHASE_WALK_SPEED) * elapsed
  return {
    travel,
    finish(pose) {
      if (pose.moving) return {...pose, stamina}
      const resting = fresh()
      advanceStamina(resting, false, elapsed)
      return {...pose, stamina:resting}
    },
  }
}
