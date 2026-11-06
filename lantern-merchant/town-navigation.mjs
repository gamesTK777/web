// The town stroll is a presentation state. Dungeon coordinates, turns and saves stay untouched.
const STEP = 18;
const DURATION = 165;
const SAMPLE = 3;
const clamp01 = value => Math.max(0, Math.min(1, value));

export function createTownNavigation({
  isWalkable,
  spawn,
  now = () => performance.now(),
  reducedMotion = false
} = {}) {
  if (typeof isWalkable !== 'function' || typeof now !== 'function') {
    throw new TypeError('Town navigation needs a walkability check and a clock.');
  }
  if (!spawn || !Number.isFinite(spawn.x) || !Number.isFinite(spawn.y)) {
    throw new TypeError('Town navigation needs a finite spawn position.');
  }
  const home = {x: spawn.x, y: spawn.y};
  let from = {...home}, to = {...home}, startedAt = -Infinity, facing = 'down';

  function getVisual(time = now()) {
    const progress = reducedMotion ? 1 : clamp01((time - startedAt) / DURATION);
    const moving = progress < 1 && (from.x !== to.x || from.y !== to.y);
    return {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
      motion: {kind: moving ? 'move' : 'idle', progress: moving ? progress : 1, facing}
    };
  }

  function reset() {
    from = {...home}; to = {...home}; startedAt = -Infinity; facing = 'down';
  }

  // Construction or loading another town may place a new footprint under the explorer.
  // Check both ends so an in-flight step cannot finish inside the new building.
  function ensurePosition(state) {
    const visual = getVisual();
    if (isWalkable(visual.x, visual.y, state) && isWalkable(to.x, to.y, state)) return false;
    reset();
    return true;
  }

  function move(dx, dy, state) {
    if (!Number.isInteger(dx) || !Number.isInteger(dy) || Math.abs(dx) + Math.abs(dy) !== 1) return false;
    const time = now();
    ensurePosition(state);
    const visual = getVisual(time);
    const start = {x: visual.x, y: visual.y};
    let destination = {...start};
    facing = dx < 0 ? 'left' : dx > 0 ? 'right' : dy < 0 ? 'up' : 'down';
    if (!isWalkable(start.x, start.y, state)) return false;
    // Swept samples stop a full step crossing a narrow trunk or a shoreline.
    for (let distance = SAMPLE; distance <= STEP; distance += SAMPLE) {
      const candidate = {x: start.x + dx * distance, y: start.y + dy * distance};
      if (!isWalkable(candidate.x, candidate.y, state)) break;
      destination = candidate;
    }
    from = start; to = destination; startedAt = time;
    return from.x !== to.x || from.y !== to.y;
  }

  return {
    getVisual,
    move,
    reset,
    ensurePosition,
    current() { const {x, y} = getVisual(); return {x, y}; }
  };
}
