// Movement repeats use one controlled timer, independently of OS key-repeat speed.
const DIRECTIONS = Object.freeze({
  ArrowUp: [0, -1], KeyW: [0, -1],
  ArrowDown: [0, 1], KeyS: [0, 1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0],
  ArrowRight: [1, 0], KeyD: [1, 0]
});

export const isMovementKey = code => Object.hasOwn(DIRECTIONS, code);

export function createHoldInput({
  onMove,
  canMove = () => true,
  initialDelay = 260,
  repeatDelay = 170,
  setTimeout: schedule = (callback, delay) => setTimeout(callback, delay),
  clearTimeout: cancel = id => clearTimeout(id)
} = {}) {
  if (typeof onMove !== 'function') throw new TypeError('onMove is required');
  if (typeof canMove !== 'function') throw new TypeError('canMove must be a function');
  if (!Number.isFinite(initialDelay) || initialDelay < 16 || !Number.isFinite(repeatDelay) || repeatDelay < 16) {
    throw new RangeError('Movement delays must be at least 16 ms');
  }
  const held = new Map();
  let timer = null, generation = 0, disposed = false;
  const active = () => [...held.entries()].at(-1);

  function stopTimer() {
    generation++;
    if (timer !== null) cancel(timer);
    timer = null;
  }
  function clear() { stopTimer(); held.clear(); }
  function allowed() {
    if (disposed) return false;
    try { if (canMove()) return true; }
    catch { clear(); return false; }
    clear();
    return false;
  }
  function move(entry) {
    if (!entry || !allowed()) return false;
    try { onMove(...entry[1]); }
    catch (error) { clear(); throw error; }
    return true;
  }
  function repeatAfter(delay) {
    const token = generation;
    timer = schedule(() => {
      if (disposed || token !== generation) return;
      timer = null;
      const entry = active();
      if (!move(entry)) return;
      // A movement can open a modal or return to town and clear the controller.
      if (token === generation && held.has(entry[0])) repeatAfter(repeatDelay);
    }, delay);
  }
  function press(id, direction) {
    if (!allowed() || held.has(id)) return;
    stopTimer();
    held.set(id, direction);
    const token = generation;
    move([id, direction]);
    if (token === generation && held.has(id)) repeatAfter(initialDelay);
  }
  function release(id) {
    if (!held.has(id)) return;
    const wasActive = active()?.[0] === id;
    held.delete(id);
    if (!wasActive) return;
    stopTimer();
    const entry = active();
    if (!entry) return;
    const token = generation;
    move(entry);
    if (token === generation && held.has(entry[0])) repeatAfter(repeatDelay);
  }
  return {
    keyDown(code) {
      if (!isMovementKey(code)) return false;
      press(`key:${code}`, DIRECTIONS[code]);
      return true;
    },
    keyUp(code) {
      if (!isMovementKey(code)) return false;
      release(`key:${code}`);
      return true;
    },
    pointerDown(id, dx, dy) {
      if (!Number.isInteger(dx) || !Number.isInteger(dy) || Math.abs(dx) + Math.abs(dy) !== 1) return false;
      press(`pointer:${id}`, [dx, dy]);
      return true;
    },
    pointerUp(id) { release(`pointer:${id}`); },
    clear,
    dispose() { disposed = true; clear(); }
  };
}
