// Pure game state: UI timers and animation callbacks never own the input lock.
const ALLOWED_PAIRS = new Set([6, 10, 18]);
const PAIR_IDS = Array.from({length:18}, (_, index) => String(index));

function shuffle(values, rng) {
  for (let i = values.length - 1; i > 0; i--) {
    const value = rng();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError('乱数は0以上1未満である必要があります。');
    const j = Math.floor(value * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

export function createGame({pairs=6, playerNames=['プレイヤー1','プレイヤー2'], rng=Math.random}={}) {
  if (!ALLOWED_PAIRS.has(pairs)) throw new RangeError('ペア数は6・10・18から選んでください。');
  if (typeof rng !== 'function') throw new TypeError('乱数関数が必要です。');
  if (!Array.isArray(playerNames) || playerNames.length !== 2 || playerNames.some(name => typeof name !== 'string')) {
    throw new TypeError('プレイヤー名を2人分指定してください。');
  }
  const names = playerNames.map((name, index) => name.trim().slice(0,16) || `プレイヤー${index+1}`);
  const chosen = shuffle([...PAIR_IDS], rng).slice(0,pairs);
  const deck = shuffle([...chosen, ...chosen], rng);
  return {
    phase:'ready',
    cards:deck.map((pairId, index) => ({id:`card-${index}`, pairId, matched:false})),
    selected:[], moves:0, matchedPairs:0, currentPlayer:0, scores:[0,0],
    playerNames:names, pairs, lastResult:null, winner:null,
  };
}

export function selectCard(state, id) {
  if (!state || (state.phase !== 'ready' && state.phase !== 'one')) return state;
  const card = state.cards.find(card => card.id === id);
  if (!card || card.matched || state.selected.includes(id)) return state;
  const selected = [...state.selected,id];
  return {
    ...state, selected, lastResult:null,
    phase:selected.length === 2 ? 'resolving' : 'one',
    moves:state.moves + (selected.length === 2 ? 1 : 0),
  };
}

export function resolvePair(state) {
  if (!state || state.phase !== 'resolving' || state.selected.length !== 2) return state;
  const [firstId,secondId] = state.selected;
  const first = state.cards.find(card => card.id === firstId);
  const second = state.cards.find(card => card.id === secondId);
  if (!first || !second || first.id === second.id || first.matched || second.matched) return state;

  const isMatch = first.pairId === second.pairId;
  const actor = state.currentPlayer;
  const matchedPairs = state.matchedPairs + (isMatch ? 1 : 0);
  const scores = [...state.scores];
  if (isMatch) scores[actor]++;
  const finished = matchedPairs === state.pairs;
  return {
    ...state,
    phase:finished ? 'finished' : 'ready', selected:[], matchedPairs, scores,
    cards:isMatch ? state.cards.map(card => card.id === firstId || card.id === secondId ? {...card,matched:true} : card) : state.cards,
    currentPlayer:isMatch ? actor : 1-actor,
    lastResult:{type:isMatch ? 'match' : 'miss',cardIds:[firstId,secondId],playerIndex:actor},
    winner:finished ? (scores[0] === scores[1] ? 'draw' : scores[0] > scores[1] ? 0 : 1) : null,
  };
}
