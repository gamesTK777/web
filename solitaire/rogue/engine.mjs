export const MAX_STAGE = 5;
export const SUITS = Object.freeze(["♠", "♥", "♦", "♣"]);
export const RANKS = Object.freeze(["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]);

const gifts = [
  ["twins", "双星の指輪", "同じ数字の場札も取れる。", "♊"],
  ["compass", "銀の羅針盤", "山札を引いた直後は、数字が2つ離れた場札も取れる。", "✥"],
  ["hourglass", "星砂の時計", "これから訪れるすべての星域で山札が2枚増える。", "⌛"],
  ["ember", "灯火の小瓶", "次の星域に入るたび、流れ星が1回増える（最大5回）。", "✧"],
  ["comet", "彗星の羽根", "5連鎖ごとに流れ星を1回得る（最大5回）。", "☄"],
  ["lens", "星見のレンズ", "覆われた場札の数字と柄が見える。先の一手を読もう。", "◉"],
];

export const RELICS = Object.freeze(Object.fromEntries(gifts.map(([id, name, description, icon]) =>
  [id, Object.freeze({ id, name, description, icon })])));

const routes = {
  calm: { difficulty: "穏やか", icon: "☽", stock: 11, points: 85, groups: 3,
    names: ["星灯りの港", "月露の庭", "銀葉の森", "白夜の渡し場", "暁の天文台"] },
  astral: { difficulty: "標準", icon: "✧", stock: 9, points: 115, groups: 4,
    names: ["星灯りの港", "流星の水路", "星霜の書庫", "宵星の回廊", "星冠の天文台"] },
  rift: { difficulty: "険しい", icon: "✷", stock: 7, points: 155, groups: 5,
    names: ["星灯りの港", "紅星の裂け目", "黒曜の尖塔", "蝕影の門", "日蝕の天文台"] },
};

function layoutFromRows(back, middle) {
  const positions = [back, middle, [0, 1, 2, 3, 4, 5, 6]].flatMap((xs, row) =>
    xs.map(x => ({ x, row })));
  return positions.map(({ x, row }) => ({
    x, row, covers: positions.flatMap((other, id) =>
      other.row === row + 1 && Math.abs(other.x - x) < 1 ? [id] : []),
  }));
}

const layouts = {
  calm: layoutFromRows([1, 3, 5], [0.5, 1.5, 2.5, 3.5, 4.5, 5.5]),
  astral: layoutFromRows([0, 1, 2, 4, 5, 6], [0.5, 1.5, 4.5, 5.5]),
  rift: layoutFromRows([1, 2, 3, 4, 5], [0.5, 1.5, 2.5, 3.5, 4.5, 5.5]),
};

const rankAt = (index) => (index % 13 + 13) % 13 + 1;

function randomFrom(seed, stage, key) {
  let cursor = (seed ^ Math.imul(stage, 0x9e3779b1)) >>> 0;
  for (const char of key) cursor = Math.imul(cursor ^ char.charCodeAt(0), 0x01000193) >>> 0;
  return () => {
    cursor = (cursor + 0x6d2b79f5) >>> 0;
    let z = Math.imul(cursor ^ (cursor >>> 15), cursor | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(items, random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function routeAt(stage, id, relics) {
  const type = routes[id];
  const loss = Math.floor((stage - 1) / 2);
  const stockCount = (stage === 1 ? 10 : type.stock - loss) + (relics.includes("hourglass") ? 2 : 0);
  const points = stage === 1 ? 100 : type.points;
  return {
    id, name: type.names[stage - 1], difficulty: type.difficulty, icon: type.icon, stockCount, points,
    description: `場札${layouts[id].length}枚・山札${stockCount}枚 ／ 場札1枚につき${points}点`,
  };
}

function removalOrder(layout, random) {
  const gone = new Set();
  while (gone.size < layout.length) {
    const choices = layout.map((_, id) => id)
      .filter(id => !gone.has(id) && layout[id].covers.every(blocker => gone.has(blocker)));
    gone.add(choices[Math.floor(random() * choices.length)]);
  }
  return [...gone];
}

function planRuns(count, totalCards, random) {
  const lengths = Array(count).fill(2);
  for (let i = count * 2; i < totalCards; i++) lengths[Math.floor(random() * count)]++;
  const used = Array(14).fill(0);
  const runs = [];
  for (const length of lengths) {
    const offsets = [0];
    let direction = random() < 0.5 ? -1 : 1;
    for (let i = 0; i < length; i++) {
      if (random() < 0.24) direction *= -1;
      offsets.push(offsets.at(-1) + direction);
    }
    const starts = shuffled(RANKS.map((_, i) => i), random);
    let next = null;
    for (const start of starts) {
      const ranks = offsets.map(offset => rankAt(start + offset));
      const available = [...used];
      if (ranks.every(rank => ++available[rank] <= 4)) {
        next = ranks;
        break;
      }
    }
    if (!next) {
      // A continuous circuit never needs more than two copies of a rank.
      // Reversing individual segments preserves that bound and their adjacency.
      let cursor = Math.floor(random() * 13);
      return lengths.map(n => {
        const segment = Array.from({ length: n + 1 }, () => rankAt(cursor++));
        return random() < 0.5 ? segment : segment.reverse();
      });
    }
    for (const rank of next) used[rank]++;
    runs.push(next);
  }
  return runs;
}

function deal(seed, stage, route) {
  const random = randomFrom(seed, stage, route.id);
  const layout = layouts[route.id];
  const order = removalOrder(layout, random);
  const groups = Math.min(6, routes[route.id].groups + Math.floor((stage - 1) / 2));
  const runs = planRuns(groups, layout.length, random);
  const deck = shuffled(SUITS.flatMap((_, suit) => RANKS.map((_, i) => ({ rank: i + 1, suit }))), random);
  const takeRank = rank => deck.splice(deck.findIndex(card => card.rank === rank), 1)[0];
  const tableau = layout.map(({ x, row, covers }, id) => ({ id, x, row, covers: [...covers], removed: false }));

  // Each segment starts at the waste or an ordered stock checkpoint. The following
  // ranks walk ±1 along a topologically legal path, so a solution always exists.
  let position = 0;
  const starters = runs.map(([starter, ...ranks]) => {
    const head = takeRank(starter);
    for (const rank of ranks) Object.assign(tableau[order[position++]], takeRank(rank));
    return head;
  });
  const waste = starters.shift();
  const slots = shuffled(Array.from({ length: route.stockCount }, (_, i) => i), random)
    .slice(0, starters.length).sort((a, b) => a - b);
  const stock = Array.from({ length: route.stockCount }, (_, i) => slots.includes(i) ? starters.shift() : deck.pop());
  return { tableau, stock: stock.reverse(), waste };
}

export function createRun(seed) {
  if (seed === undefined) {
    seed = globalThis.crypto?.getRandomValues
      ? globalThis.crypto.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(Math.random() * 4294967296);
  }
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw new RangeError("Invalid expedition seed");
  const route = routeAt(1, "calm", []);
  return {
    version: 1, seed, actions: [], stage: 1, phase: "play", score: 0, streak: 0, bestStreak: 0,
    wilds: 1, afterDraw: false, relics: [], rewardChoices: [], routeChoices: [], route,
    history: [{ stage: 1, id: route.id, name: route.name }], ...deal(seed, 1, route),
  };
}

export function isExposed(state, id) {
  if (!Number.isInteger(id)) return false;
  const card = state.tableau[id];
  return Boolean(card && !card.removed && card.covers.every(other => state.tableau[other].removed));
}

function matches(state, rank) {
  const diff = Math.abs(state.waste.rank - rank);
  const distance = Math.min(diff, 13 - diff);
  return distance === 1 || (distance === 0 && state.relics.includes("twins")) ||
    (distance === 2 && state.afterDraw && state.relics.includes("compass"));
}

export function getMoves(state) {
  if (state.phase !== "play") return [];
  return state.tableau.filter(card => isExposed(state, card.id) && matches(state, card.rank)).map(card => card.id);
}

function updatePhase(state) {
  if (state.tableau.every(card => card.removed)) {
    const score = state.score + 150 * state.stage + 30 * state.stock.length;
    if (state.stage === MAX_STAGE) return { ...state, phase: "won", score };
    const random = randomFrom(state.seed, state.stage, `gifts/${state.route.id}`);
    const rewardChoices = shuffled(Object.values(RELICS).filter(gift => !state.relics.includes(gift.id)), random).slice(0, 3);
    return { ...state, phase: "reward", score, rewardChoices };
  }
  if (!state.stock.length && !state.wilds && !getMoves(state).length) return { ...state, phase: "lost" };
  return state;
}

function takeCard(state, id, wild) {
  if (state.phase !== "play" || !isExposed(state, id)) return state;
  const card = state.tableau[id];
  if (wild ? state.wilds < 1 : !matches(state, card.rank)) return state;
  const streak = wild ? 1 : state.streak + 1;
  let wilds = state.wilds - Number(wild);
  if (streak % 5 === 0 && state.relics.includes("comet")) wilds = Math.min(5, wilds + 1);
  const points = state.route.points + 25 * Math.min(streak - 1, 8);
  return updatePhase({
    ...state, wilds, streak, bestStreak: Math.max(streak, state.bestStreak), score: state.score + points,
    afterDraw: false, waste: { rank: card.rank, suit: card.suit },
    tableau: state.tableau.map(item => item.id === id ? { ...item, removed: true } : item),
    actions: [...state.actions, [wild ? "wild" : "play", id]],
  });
}

export const playCard = (state, id) => takeCard(state, id, false);
export const playWild = (state, id) => takeCard(state, id, true);

export function drawCard(state) {
  if (state.phase !== "play" || !state.stock.length) return state;
  return updatePhase({
    ...state, stock: state.stock.slice(0, -1), waste: state.stock.at(-1), afterDraw: true, streak: 0,
    actions: [...state.actions, ["draw"]],
  });
}

export function chooseRelic(state, id) {
  if (state.phase !== "reward" || !state.rewardChoices.some(choice => choice.id === id)) return state;
  const relics = [...state.relics, id];
  const stage = state.stage + 1;
  const random = randomFrom(state.seed, stage, `routes/${state.route.id}`);
  const ids = stage <= 2 ? ["calm", random() < 0.5 ? "astral" : "rift"] : shuffled(Object.keys(routes), random).slice(0, 2);
  const routeChoices = ids.map(routeId => routeAt(stage, routeId, relics));
  return { ...state, phase: "route", relics, rewardChoices: [], routeChoices,
    actions: [...state.actions, ["relic", id]] };
}

export function chooseRoute(state, id) {
  if (state.phase !== "route") return state;
  const route = state.routeChoices.find(choice => choice.id === id);
  if (!route) return state;
  const stage = state.stage + 1;
  const wilds = Math.min(5, state.wilds + Number(state.relics.includes("ember")));
  return {
    ...state, phase: "play", stage, route, wilds, afterDraw: false, streak: 0, routeChoices: [],
    history: [...state.history, { stage, id, name: route.name }], actions: [...state.actions, ["route", id]],
    ...deal(state.seed, stage, route),
  };
}

// Only the seed and legal actions are authoritative. Replaying the small bounded
// transcript reconstructs even a half-played hand without trusting saved counters.
export function restoreRun(value) {
  let data = value;
  if (typeof data === "string") {
    if (data.length > 120000) return null;
    try { data = JSON.parse(data); } catch { return null; }
  }
  if (!data || data.version !== 1 || !Number.isInteger(data.seed) || data.seed < 0 || data.seed > 0xffffffff ||
      !Array.isArray(data.actions) || data.actions.length > 180) return null;
  let state = createRun(data.seed);
  for (const step of data.actions) {
    if (!Array.isArray(step) || !step.length || step.length !== (step[0] === "draw" ? 1 : 2)) return null;
    let next;
    switch (step[0]) {
      case "play": next = playCard(state, step[1]); break;
      case "draw": next = drawCard(state); break;
      case "wild": next = playWild(state, step[1]); break;
      case "relic": next = chooseRelic(state, step[1]); break;
      case "route": next = chooseRoute(state, step[1]); break;
      default: return null;
    }
    if (next === state) return null;
    state = next;
  }
  return state;
}
