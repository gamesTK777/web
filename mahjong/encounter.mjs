import { encounterLines } from './cast.mjs?v=20261108-cast';

export function createEncounter(stageId, battle = 1, options = {}) {
  return { stageId, battle, lines: encounterLines(stageId, battle, options), index: 0, complete: false };
}

export function advanceEncounter(source) {
  if (!source || source.complete) return source;
  if (source.index + 1 >= source.lines.length) return { ...source, complete: true };
  return { ...source, index: source.index + 1 };
}

export function skipEncounter(source) {
  return source && !source.complete ? { ...source, complete: true } : source;
}
