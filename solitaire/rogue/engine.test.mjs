import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_STAGE, RELICS, chooseRelic, chooseRoute, createRun, drawCard, getMoves,
  isExposed, playCard, playWild, restoreRun,
} from "./engine.mjs";

// Solve only from the public board, using normal adjacent ranks and draws. No
// knowledge of the generation sequence, relics or wild cards is used here.
function solve(hand) {
  const board = hand.tableau;
  const blockers = board.map(card => card.covers.reduce((mask, id) => mask | (1 << id), 0));
  const complete = (1 << board.length) - 1;
  const visited = new Set();
  const path = [];
  function search(gone, stockLeft, wasteRank) {
    if (gone === complete) return true;
    const key = gone | (stockLeft << 18) | (wasteRank << 22);
    if (visited.has(key)) return false;
    visited.add(key);
    for (const card of board) {
      const bit = 1 << card.id;
      if (gone & bit || (gone & blockers[card.id]) !== blockers[card.id]) continue;
      const distance = Math.abs(wasteRank - card.rank);
      if (distance !== 1 && distance !== 12) continue;
      path.push(card.id);
      if (search(gone | bit, stockLeft, card.rank)) return true;
      path.pop();
    }
    if (stockLeft) {
      path.push("draw");
      if (search(gone, stockLeft - 1, hand.stock[stockLeft - 1].rank)) return true;
      path.pop();
    }
    return false;
  }
  return search(0, hand.stock.length, hand.waste.rank) ? path : null;
}

function clearBoard(state) {
  const path = solve(state);
  assert.ok(path, `no standard solution to seed ${state.seed}, stage ${state.stage}, route ${state.route.id}`);
  for (const move of path) {
    const next = move === "draw" ? drawCard(state) : playCard(state, move);
    assert.notEqual(next, state);
    state = next;
  }
  return state;
}

function advance(state, routeIndex = 0, relicIndex = 0) {
  const map = chooseRelic(state, state.rewardChoices[relicIndex].id);
  return chooseRoute(map, map.routeChoices[routeIndex].id);
}

function assertStandardDeck(hand) {
  const cards = [hand.waste, ...hand.stock, ...hand.tableau];
  for (const card of cards) {
    assert.ok(Number.isInteger(card.rank) && card.rank >= 1 && card.rank <= 13);
    assert.ok(Number.isInteger(card.suit) && card.suit >= 0 && card.suit <= 3);
  }
  assert.equal(new Set(cards.map(card => card.rank * 4 + card.suit)).size, cards.length);
}

test("same seed reproduces a legal, unique standard deck with the correct silhouette", () => {
  const a = createRun(0xffffffff);
  assert.deepEqual(a, createRun(0xffffffff));
  assert.notDeepEqual(createRun(0).tableau, a.tableau);
  assert.equal(a.phase, "play");
  assert.equal(a.stock.length, a.route.stockCount);
  assert.equal(a.wilds, 1);
  assertStandardDeck(a);
  assert.deepEqual([0, 1, 2].map(row => a.tableau.filter(card => card.row === row).length), [3, 6, 7]);
  assert.deepEqual(a.tableau.filter(card => isExposed(a, card.id)).map(card => card.id), [9, 10, 11, 12, 13, 14, 15]);
  for (const seed of [-1, 0x100000000, NaN, 1.5, "9"]) assert.throws(() => createRun(seed), RangeError);
});

test("front cards unlock a covered card only after both supporting cards are gone", () => {
  const start = { ...createRun(81), wilds: 2 };
  const first = playWild(start, 9);
  assert.equal(first.wilds, 1);
  assert.equal(isExposed(first, 3), false);
  assert.equal(playWild(first, 3), first);
  const second = playWild(first, 10);
  assert.equal(isExposed(second, 3), true);
  assert.equal(isExposed(start, 3), false);
  assert.equal(start.tableau[9].removed, false);
  assert.equal(playWild(second, 3), second);
  for (const id of [-1, 16, "9", 9.5, null]) assert.equal(playCard(start, id), start);
});

test("aces wrap to kings, suit is unrestricted, and a draw breaks a streak", () => {
  const start = createRun(281);
  const tableau = start.tableau.map(card => card.id === 9 ? { ...card, rank: 1, suit: 2 } : card);
  const king = { ...start, tableau, waste: { rank: 13, suit: 1 }, streak: 3 };
  assert.ok(getMoves(king).includes(9));
  const ace = playCard(king, 9);
  assert.equal(ace.waste.rank, 1);
  assert.equal(ace.streak, 4);
  assert.equal(ace.score, king.route.points + 75);
  assert.equal(ace.bestStreak, 4);
  const drawn = drawCard(ace);
  assert.deepEqual(drawn.waste, ace.stock.at(-1));
  assert.equal(drawn.stock.length, ace.stock.length - 1);
  assert.equal(drawn.streak, 0);
  assert.equal(drawn.bestStreak, 4);
  assert.equal(drawn.afterDraw, true);
  const empty = { ...drawn, stock: [] };
  assert.equal(drawCard(empty), empty);
});

test("pair and distance-two relics add their precise moves, with the compass only on draws", () => {
  const initial = createRun(52);
  const state = { ...initial, waste: { rank: 1, suit: 0 }, tableau: initial.tableau.map(card => ({
    ...card, rank: card.id === 9 ? 1 : card.id === 10 ? 12 : card.rank,
  })) };
  assert.equal(getMoves(state).includes(9), false);
  assert.equal(getMoves(state).includes(10), false);
  const twins = { ...state, relics: ["twins"] };
  assert.ok(getMoves(twins).includes(9));
  const compass = { ...state, relics: ["compass"] };
  assert.equal(getMoves(compass).includes(10), false);
  const drawn = { ...compass, afterDraw: true };
  assert.ok(getMoves(drawn).includes(10));
  assert.equal(playCard(drawn, 10).afterDraw, false);
});

test("a wild opens any exposed rank, resets the chain, and a comet rewards completed five-card chains", () => {
  const state = { ...createRun(37), streak: 4, relics: ["comet"], wilds: 1 };
  const validId = getMoves(state)[0];
  const natural = playCard(state, validId);
  assert.equal(natural.wilds, 2);
  assert.equal(natural.streak, 5);
  assert.equal(playCard({ ...state, wilds: 5 }, validId).wilds, 5);
  const wild = playWild(state, validId);
  assert.equal(wild.wilds, 0);
  assert.equal(wild.streak, 1);
  assert.equal(playCard(wild, validId), wild);
});

test("a stage clear grants exactly three new relic choices, then exactly two different routes", () => {
  let clear = clearBoard(createRun(63));
  const inventory = new Set();
  for (let stage = 1; stage < MAX_STAGE; stage++) {
    assert.equal(clear.phase, "reward");
    assert.equal(clear.stage, stage);
    assert.equal(clear.rewardChoices.length, 3);
    assert.equal(new Set(clear.rewardChoices.map(item => item.id)).size, 3);
    assert.ok(clear.rewardChoices.every(item => !inventory.has(item.id) && RELICS[item.id]));
    assert.equal(chooseRelic(clear, "unknown"), clear);
    assert.equal(drawCard(clear), clear);
    assert.equal(playCard(clear, 15), clear);
    const item = clear.rewardChoices[0].id;
    inventory.add(item);
    const map = chooseRelic(clear, item);
    assert.equal(map.phase, "route");
    assert.equal(map.routeChoices.length, 2);
    assert.notEqual(map.routeChoices[0].stockCount, map.routeChoices[1].stockCount);
    assert.notEqual(map.routeChoices[0].points, map.routeChoices[1].points);
    assert.equal(chooseRoute(map, "not offered"), map);
    assert.equal(chooseRelic(map, item), map);
    const next = chooseRoute(map, map.routeChoices[0].id);
    assert.equal(next.score, clear.score);
    assert.equal(next.history.length, next.stage);
    assert.equal(next.stock.length, next.route.stockCount);
    assert.equal(next.wilds, Math.min(clear.wilds + Number(inventory.has("ember")), 5));
    assert.ok(next.tableau.every(card => !card.removed));
    clear = clearBoard(next);
  }
  assert.equal(clear.phase, "won");
  assert.equal(clear.stage, 5);
  assert.deepEqual(clear.relics, [...inventory]);
  assert.equal(clear.history.length, 5);
  assert.deepEqual(restoreRun(JSON.stringify(clear)), clear);
  assert.equal(chooseRoute(clear, "calm"), clear);
});

test("route stock bonus and lantern charges affect actual new boards", () => {
  const clear = clearBoard(createRun(3));
  const demo = { ...clear, wilds: 0, rewardChoices: [RELICS.hourglass, RELICS.ember, RELICS.lens] };
  const hour = chooseRelic(demo, "hourglass");
  const ember = chooseRelic(demo, "ember");
  const lens = chooseRelic(demo, "lens");
  for (const choice of lens.routeChoices) {
    const longer = chooseRoute(hour, choice.id);
    const charged = chooseRoute(ember, choice.id);
    const plain = chooseRoute(lens, choice.id);
    assert.equal(longer.stock.length, plain.stock.length + 2);
    assert.equal(charged.wilds, 1);
    assert.equal(plain.wilds, 0);
    assert.equal(plain.relics.includes("lens"), true);
  }
});

test("a lost hand is final and records the score already earned", () => {
  // Spending the wild and burning all stock on this seed strands the remaining cards.
  let hand = createRun(7);
  hand = playWild(hand, 9);
  while (hand.stock.length) hand = drawCard(hand);
  while (hand.phase === "play") hand = playCard(hand, getMoves(hand)[0]);
  assert.equal(hand.phase, "lost");
  assert.ok(hand.score > 0 && hand.tableau.some(card => !card.removed));
  assert.equal(drawCard(hand), hand);
  assert.equal(playWild(hand, 15), hand);
  assert.deepEqual(restoreRun(hand), hand);
});

test("a charged wild keeps a blocked board playable; last removal earns the clear bonus", () => {
  const start = createRun(9);
  const board = start.tableau.map(card => ({ ...card, removed: card.id !== 0, rank: 3 }));
  const almost = { ...start, tableau: board, stock: [{ rank: 11, suit: 0 }], wilds: 1, waste: { rank: 8, suit: 0 } };
  const drawn = drawCard(almost);
  assert.equal(drawn.phase, "play");
  assert.deepEqual(getMoves(drawn), []);
  const win = playWild(drawn, 0);
  assert.equal(win.phase, "reward");
  assert.equal(win.score, start.route.points + 150);
  const stockBonus = playWild(almost, 0);
  assert.equal(stockBonus.score, win.score + 30);
});

test("legal action transcript restores all screens; tampered counters are rebuilt and illegal histories rejected", () => {
  let state = createRun(1234);
  state = playCard(state, getMoves(state)[0]);
  state = drawCard(state);
  state = playWild(state, state.tableau.find(card => isExposed(state, card.id)).id);
  assert.deepEqual(restoreRun({ version: 1, seed: state.seed, actions: state.actions }), state);
  assert.deepEqual(restoreRun({ ...state, score: -100, wilds: 500, phase: "won" }), state);
  const clear = clearBoard(createRun(0));
  assert.deepEqual(restoreRun(clear), clear);
  const map = chooseRelic(clear, clear.rewardChoices[0].id);
  assert.deepEqual(restoreRun(JSON.stringify(map)), map);
  const next = chooseRoute(map, map.routeChoices[0].id);
  assert.deepEqual(restoreRun(next), next);
  for (const broken of [null, "{", {}, { ...state, version: 0 }, { ...state, seed: -7 },
    { ...state, actions: [["play", 0]] }, { ...state, actions: [["route", "calm"]] },
    { ...state, actions: [["draw", 9]] }, { ...state, actions: [["play", "9"]] },
    { ...state, actions: [["unknown"]] }, { ...state, actions: Array(181).fill(["draw"]) }]) {
    assert.equal(restoreRun(broken), null);
  }
});

test("independent solver clears seeded boards on all five stages and all route types without spending a wild", () => {
  const routeTypes = new Set();
  for (let i = 0; i < 64; i++) {
    const seed = Math.imul(0x9e3779b1, i) >>> 0;
    let board = createRun(seed);
    for (let stage = 1; stage <= MAX_STAGE; stage++) {
      routeTypes.add(board.route.id);
      assert.equal(board.tableau.length, { calm: 16, astral: 17, rift: 18 }[board.route.id]);
      for (const card of board.tableau) {
        const blockers = board.tableau.filter(other => other.row === card.row + 1 && Math.abs(other.x - card.x) < 1);
        assert.deepEqual(card.covers, blockers.map(other => other.id));
        assert.ok(card.x >= 0 && card.x <= 6 && card.row >= 0 && card.row <= 2);
      }
      assertStandardDeck(board);
      assert.ok(getMoves(board).length, "each hand opens with a natural move");
      const cleared = clearBoard(board);
      assert.equal(cleared.phase, stage === MAX_STAGE ? "won" : "reward");
      if (stage < MAX_STAGE) board = advance(cleared, (i + stage) % 2, (i + stage) % 3);
    }
  }
  assert.equal(routeTypes.size, 3);
});
