const TRACK_IDS = new Set(['town', 'dungeon-1-2', 'dungeon-3-4', 'dungeon-5-6', 'dungeon-7-8', 'dungeon-9-10', 'swarm']);

// Read existing game state only; no music choice is written into a save. Active
// swarm members pursue outside their room, so the encounter theme lasts until
// its living marked group is gone, the player changes floor, or returns home.
export function resolveMusicTrack(value) {
  if (typeof value === 'string') return value === 'dungeon' ? 'dungeon-1-2' : TRACK_IDS.has(value) ? value : 'town';
  if (!value || typeof value !== 'object' || value.mode !== 'dungeon') return 'town';
  const swarm = value.map?.swarm;
  if (swarm?.status === 'active' && Array.isArray(swarm.enemyIds) && Array.isArray(value.enemies)) {
    const members = new Set(swarm.enemyIds.filter(id => typeof id === 'string' && id.length > 0));
    if (value.enemies.some(enemy => enemy && members.has(enemy.id) && Number.isFinite(enemy.hp) && enemy.hp > 0)) return 'swarm';
  }
  const raw = typeof value.floor === 'number' || typeof value.floor === 'string' && value.floor.trim() !== '' ? Number(value.floor) : NaN;
  const floor = Number.isFinite(raw) ? Math.max(1, Math.min(10, Math.trunc(raw))) : 1;
  const lower = Math.floor((floor - 1) / 2) * 2 + 1;
  return `dungeon-${lower}-${lower + 1}`;
}
