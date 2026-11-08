// Presentation reads the same limited view sent to a player. It never receives
// the server deck or another player's concealed cards.
const startEntry = entry => typeof entry?.text === 'string' && entry.text.startsWith('対戦スタート。');
const stamp = entry => entry ? JSON.stringify([entry.at, entry.text]) : null;
const sameEntry = (a, b) => a.text === b.text && a.at === b.at;
const visibleCard = card => card && typeof card.id === 'string'
  ? {id: card.id, color: typeof card.color === 'string' ? card.color : null, value: String(card.value ?? '')}
  : null;

export function snapshotPublicGame(game) {
  if (!game || typeof game !== 'object') return null;
  const log = (Array.isArray(game.log) ? game.log : []).map(entry => typeof entry === 'string'
    ? {text: entry, at: null}
    : {text: typeof entry?.text === 'string' ? entry.text : '', at: Number.isFinite(entry?.at) ? entry.at : null});
  return {
    handIds: [...new Set((Array.isArray(game.hand) ? game.hand : []).map(card => card?.id).filter(id => typeof id === 'string'))],
    players: (Array.isArray(game.players) ? game.players : []).map(player => ({
      id: String(player.id), name: typeof player.name === 'string' ? player.name : '',
      count: Number.isSafeInteger(player.count) && player.count >= 0 ? player.count : 0,
    })),
    topCard: visibleCard(game.topCard),
    phase: typeof game.phase === 'string' ? game.phase : null,
    currentPlayerId: typeof game.currentPlayerId === 'string' ? game.currentPlayerId : null,
    winnerId: typeof game.winnerId === 'string' ? game.winnerId : null,
    turnStartedAt: Number.isFinite(game.turnStartedAt) ? game.turnStartedAt : null,
    log,
    gameStartStamp: stamp(log.find(startEntry)) || (typeof game.gameStartStamp === 'string' ? game.gameStartStamp : null),
  };
}

function appendedLog(previous, next) {
  // Logs are capped at twenty entries. Sequence overlap retains distinct
  // repeated lines, including entries written in the same millisecond.
  for (let length = Math.min(previous.length, next.length); length > 0; length--) {
    const offset = previous.length - length;
    if (next.slice(0, length).every((entry, i) => sameEntry(entry, previous[offset + i]))) return next.slice(length);
  }
  return next;
}

const playEntry = entry => /を出しました(?:。|$)/u.test(entry.text);
const primaryAction = entry => playEntry(entry) || /さんが(?:カードを(?:1枚引きました|引けなかったためパスしました)|パスしました)。$/u.test(entry.text);
const emptyEffects = () => ({initial: false, addedHandIds: [], received: [], played: null, unoCount: 0, winner: null, newRound: false});

export function diffPublicSnapshots(previous, next, {initial = false} = {}) {
  const result = emptyEffects();
  if (!next) return result;
  const freshStart = !!previous && next.log.some(startEntry) && !!next.gameStartStamp && next.gameStartStamp !== previous.gameStartStamp;
  const newRound = !!initial || !!previous && (previous.phase === 'finished' && next.phase === 'playing' || freshStart);
  if (newRound) return {
    ...result, initial: true, newRound: true, addedHandIds: [...next.handIds],
    received: next.players.filter(player => player.count > 0).map(player => ({playerId: player.id, count: player.count})),
  };
  // A newly opened/reconnected client establishes a baseline. It must not replay
  // a previous player's declaration or a round's already-completed deal.
  if (!previous) return result;
  const oldHand = new Set(previous.handIds), oldCounts = new Map(previous.players.map(player => [player.id, player.count]));
  result.addedHandIds = next.handIds.filter(id => !oldHand.has(id));
  result.received = next.players.flatMap(player => {
    const before = oldCounts.get(player.id), amount = before === undefined ? 0 : player.count - before;
    return amount > 0 ? [{playerId: player.id, count: amount}] : [];
  });
  const newLog = appendedLog(previous.log, next.log);
  if (next.topCard && next.topCard.id !== previous.topCard?.id) {
    const lastPlay = newLog.filter(playEntry).at(-1);
    const matches = lastPlay ? next.players.filter(player => lastPlay.text.startsWith(player.name + 'さんが')) : [];
    const oneAction = newLog.filter(primaryAction).length === 1;
    const actorId = matches.length === 1 ? matches[0].id
      : oneAction && previous.currentPlayerId && next.players.some(player => player.id === previous.currentPlayerId) ? previous.currentPlayerId : null;
    result.played = {card: {...next.topCard}, actorId};
  }
  result.unoCount = Number(newLog.some(entry => next.players.some(player => entry.text === player.name + 'さんがUNO！')));
  if (next.phase === 'finished' && next.winnerId && (previous.phase !== 'finished' || previous.winnerId !== next.winnerId)) result.winner = next.winnerId;
  return result;
}
