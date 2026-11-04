// The complete deck and all hands belong on the server. Send publicView() only.
export const COLORS = Object.freeze(['red', 'yellow', 'green', 'blue']);
const COLOR_NAMES = { red: '赤', yellow: '黄', green: '緑', blue: '青' };
const VALUE_NAMES = { skip: 'スキップ', reverse: 'リバース', draw2: '+2', wild: 'ワイルド', wild4: '+4' };

function timestamp(now) {
  const value = typeof now === 'function' ? now() : now === undefined ? Date.now() : now;
  if (!Number.isFinite(value)) throw new Error('時刻が正しくありません。');
  return value;
}

function secureRandom() {
  if (!globalThis.crypto || !globalThis.crypto.getRandomValues) throw new Error('安全な乱数を利用できません。');
  const value = new Uint32Array(1);
  globalThis.crypto.getRandomValues(value);
  return value[0] / 0x100000000;
}

function shuffle(cards, rng = secureRandom) {
  for (let i = cards.length - 1; i > 0; i--) {
    const value = rng();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new Error('乱数が正しくありません。');
    const j = Math.floor(value * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function deck108() {
  const cards = [];
  for (const color of COLORS) {
    cards.push({ id: `${color}-0-0`, color, value: '0' });
    for (const value of ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2']) {
      for (let copy = 0; copy < 2; copy++) cards.push({ id: `${color}-${value}-${copy}`, color, value });
    }
  }
  for (const value of ['wild', 'wild4']) {
    for (let copy = 0; copy < 4; copy++) cards.push({ id: `${value}-${copy}`, color: null, value });
  }
  return cards;
}

function topCard(game) { return game.discard[game.discard.length - 1]; }
function nextIndex(game, steps = 1) {
  return ((game.current + game.direction * steps) % game.players.length + game.players.length) % game.players.length;
}
function addLog(game, text, at) {
  game.log.push({ text, at });
  if (game.log.length > 20) game.log.splice(0, game.log.length - 20);
}
function cardName(card) { return `${card.color ? COLOR_NAMES[card.color] + 'の' : ''}${VALUE_NAMES[card.value] || card.value}`; }
function mayPlay(game, player, card) {
  if (game.drawnCardId && card.id !== game.drawnCardId) return false;
  if (card.value === 'wild') return true;
  if (card.value === 'wild4') return !player.hand.some(other => other.color === game.color);
  return card.color === game.color || card.value === topCard(game).value;
}

function takeCards(game, player, count, rng) {
  const taken = [];
  for (let i = 0; i < count; i++) {
    if (!game.deck.length && game.discard.length > 1) {
      const top = game.discard.pop();
      game.deck = shuffle(game.discard, rng);
      game.discard = [top];
    }
    if (!game.deck.length) break;
    const card = game.deck.pop();
    player.hand.push(card);
    taken.push(card);
  }
  return taken;
}

function advance(game, steps, now) {
  game.current = nextIndex(game, steps);
  game.drawnCardId = null;
  game.turnStartedAt = now;
}

export function createGame(players, { rng = secureRandom, now } = {}) {
  if (!Array.isArray(players) || players.length < 2 || players.length > 6) throw new Error('対戦人数は2〜6人です。');
  const ids = new Set();
  const seats = players.map(player => {
    if (!player || typeof player.id !== 'string' || !player.id || player.id.length > 128 || ids.has(player.id)) throw new Error('プレイヤーが正しくありません。');
    ids.add(player.id);
    const name = typeof player.name === 'string' ? player.name.trim().slice(0, 24) : '';
    return { id: player.id, name: name || `プレイヤー${ids.size}`, hand: [] };
  });
  const at = timestamp(now), deck = shuffle(deck108(), rng);
  for (let round = 0; round < 7; round++) for (const seat of seats) seat.hand.push(deck.pop());
  let first = deck.length - 1;
  while (first >= 0 && !/^[0-9]$/.test(deck[first].value)) first--;
  const top = deck.splice(first, 1)[0];
  return {
    players: seats, deck, discard: [top], current: 0, direction: 1, color: top.color,
    phase: 'playing', winnerId: null, drawnCardId: null, turnStartedAt: at,
    log: [{ text: `対戦スタート。${seats[0].name}さんからです。`, at }],
  };
}

export function applyAction(game, actorId, action, { rng = secureRandom, now } = {}) {
  if (!game || game.phase !== 'playing') throw new Error('この対戦は終了しています。');
  if (game.players[game.current].id !== actorId) throw new Error('あなたの番ではありません。');
  if (!action || !['play', 'draw', 'pass'].includes(action.type)) throw new Error('操作が正しくありません。');
  const next = JSON.parse(JSON.stringify(game)), player = next.players[next.current], at = timestamp(now);

  if (action.type === 'draw') {
    if (next.drawnCardId) throw new Error('引いたカードを出すか、パスしてください。');
    const drawn = takeCards(next, player, 1, rng)[0];
    addLog(next, `${player.name}さんがカードを${drawn ? '1枚引きました' : '引けなかったためパスしました'}。`, at);
    if (drawn && mayPlay(next, player, drawn)) {
      next.drawnCardId = drawn.id;
      next.turnStartedAt = at;
    } else advance(next, 1, at);
    return next;
  }

  if (action.type === 'pass') {
    if (!next.drawnCardId) throw new Error('パスする前に山札から1枚引いてください。');
    addLog(next, `${player.name}さんがパスしました。`, at);
    advance(next, 1, at);
    return next;
  }

  const cardIndex = player.hand.findIndex(card => card.id === action.cardId);
  if (cardIndex < 0) throw new Error('そのカードは手札にありません。');
  const card = player.hand[cardIndex];
  if (!mayPlay(next, player, card)) throw new Error(card.value === 'wild4' ? '同じ色のカードがあるため、+4は出せません。' : '同じ色・数字・記号のカードを選んでください。');
  if (card.color === null && !COLORS.includes(action.color)) throw new Error('次の色を選んでください。');
  player.hand.splice(cardIndex, 1);
  next.discard.push(card);
  next.color = card.color || action.color;
  next.drawnCardId = null;
  addLog(next, `${player.name}さんが${cardName(card)}を出しました${card.color === null ? `。次は${COLOR_NAMES[next.color]}` : ''}。`, at);

  // This table uses an explicit, immediate UNO penalty rather than a reaction race.
  if (player.hand.length === 1) {
    if (action.uno === true) addLog(next, `${player.name}さんがUNO！`, at);
    else {
      const penalty = takeCards(next, player, 2, rng).length;
      addLog(next, `${player.name}さんはUNO宣言忘れで${penalty}枚追加。`, at);
    }
  }

  let steps = 1;
  if (card.value === 'reverse') {
    next.direction *= -1;
    if (next.players.length === 2) steps = 2;
  } else if (card.value === 'skip') steps = 2;
  else if (card.value === 'draw2' || card.value === 'wild4') {
    const recipient = next.players[nextIndex(next)];
    const amount = takeCards(next, recipient, card.value === 'draw2' ? 2 : 4, rng).length;
    addLog(next, `${recipient.name}さんが${amount}枚引いて、1回お休み。`, at);
    steps = 2;
  }
  advance(next, steps, at);
  if (player.hand.length === 0) {
    next.phase = 'finished';
    next.winnerId = player.id;
    addLog(next, `${player.name}さんの勝ち！`, at);
  }
  return next;
}

export function publicView(game, viewerId) {
  const player = game.players.find(seat => seat.id === viewerId);
  const ownTurn = game.phase === 'playing' && game.players[game.current].id === viewerId;
  return {
    players: game.players.map(seat => ({ id: seat.id, name: seat.name, count: seat.hand.length })),
    hand: player ? player.hand.map(card => ({ ...card })) : [],
    topCard: { ...topCard(game) }, color: game.color,
    currentPlayerId: game.phase === 'playing' ? game.players[game.current].id : null,
    direction: game.direction, phase: game.phase, winnerId: game.winnerId,
    drawnCardId: ownTurn ? game.drawnCardId : null,
    turnStartedAt: game.turnStartedAt, deckCount: game.deck.length,
    log: game.log.map(entry => ({ text: entry.text, at: entry.at })),
    legalCardIds: ownTurn ? player.hand.filter(card => mayPlay(game, player, card)).map(card => card.id) : [],
    canDraw: ownTurn && !game.drawnCardId,
    canPass: ownTurn && Boolean(game.drawnCardId),
  };
}

export function chooseCpuAction(game, actorId) {
  if (game.phase !== 'playing') return null;
  const player = game.players[game.current];
  if (player.id !== actorId) throw new Error('CPUの番ではありません。');
  const legal = player.hand.filter(card => mayPlay(game, player, card));
  if (!legal.length) return { type: game.drawnCardId ? 'pass' : 'draw' };
  const colorCount = color => player.hand.filter(card => card.color === color).length;
  const danger = game.players[nextIndex(game)].hand.length <= 2;
  function score(card) {
    const action = ['skip', 'reverse', 'draw2'].includes(card.value);
    return (card.color ? 20 + colorCount(card.color) * 3 : card.value === 'wild' ? 2 : 0) +
      (action ? (danger ? 18 : 5) : Number(card.value) || 0);
  }
  legal.sort((a, b) => score(b) - score(a));
  const card = legal[0], result = { type: 'play', cardId: card.id, uno: true };
  if (card.color === null) {
    const colors = [...COLORS].sort((a, b) => colorCount(b) - colorCount(a));
    result.color = colors[0];
  }
  return result;
}
