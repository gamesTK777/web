import test from 'node:test';
import assert from 'node:assert/strict';
import { COLORS, createGame, applyAction, publicView, chooseCpuAction } from './engine.mjs';

function seeded(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let value = Math.imul(seed ^ seed >>> 15, 1 | seed);
    value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}
let sequence = 0;
function card(color, value) { return { id: `test-${sequence++}`, color, value }; }
function fixture({ count = 3, hand, top, deck, direction = 1, current = 0 } = {}) {
  return {
    players: Array.from({ length: count }, (_, i) => ({ id: `p${i}`, name: `プレイヤー${i}`, hand: i === 0 && hand ? hand : [card('red', '9'), card('green', '7'), card('blue', '2')] })),
    deck: deck || [card('blue', '4'), card('yellow', '8'), card('green', '2'), card('blue', '6'), card('green', '0'), card('yellow', '6')],
    discard: [top || card('red', '5')], current, direction, color: (top && top.color) || 'red',
    phase: 'playing', winnerId: null, drawnCardId: null, turnStartedAt: 1000, log: [],
  };
}
const act = (game, action, actor = `p${game.current}`) => applyAction(game, actor, action, { rng: seeded(7), now: 2000 });
const allCards = game => [...game.deck, ...game.discard, ...game.players.flatMap(player => player.hand)];
function play(game, value, color) {
  return act(game, { type: 'play', cardId: game.players[game.current].hand.find(c => c.value === value).id, color, uno: true });
}

test('108-card deck is unique, seven cards are dealt and the first discard is numeric', () => {
  for (let count = 2; count <= 6; count++) {
    const players = Array.from({ length: count }, (_, i) => ({ id: `p${i}`, name: `P${i}` }));
    const game = createGame(players, { rng: seeded(12), now: 10 });
    assert.equal(allCards(game).length, 108);
    assert.equal(new Set(allCards(game).map(c => c.id)).size, 108);
    for (const player of game.players) assert.equal(player.hand.length, 7);
    for (const color of COLORS) assert.equal(allCards(game).filter(c => c.color === color).length, 25);
    assert.equal(allCards(game).filter(c => c.value === 'wild').length, 4);
    assert.equal(allCards(game).filter(c => c.value === 'wild4').length, 4);
    assert.match(game.discard[0].value, /^[0-9]$/);
    assert.equal(game.turnStartedAt, 10);
  }
});

test('production shuffle uses crypto and invalid players or random values are rejected', () => {
  assert.equal(allCards(createGame([{ id: 'a' }, { id: 'b' }])).length, 108);
  assert.throws(() => createGame([{ id: 'a' }]), /2〜6/);
  assert.throws(() => createGame([{ id: 'a' }, { id: 'a' }]), /プレイヤー/);
  assert.throws(() => createGame([{ id: 'a' }, { id: 'b' }], { rng: () => 1 }), /乱数/);
});

test('public view never exposes opponents hands, the deck, or the complete discard pile', () => {
  const game = createGame([{ id: 'p0', name: 'A' }, { id: 'p1', name: 'B' }], { rng: seeded(4) });
  const view = publicView(game, 'p0'), serialized = JSON.stringify(view);
  assert.equal(view.hand.length, 7);
  assert.deepEqual(view.players[1], { id: 'p1', name: 'B', count: 7 });
  for (const secret of [...game.deck, ...game.players[1].hand]) assert.equal(serialized.includes(`"${secret.id}"`), false);
  assert.equal('deck' in view, false);
  assert.equal('discard' in view, false);
  assert.equal(publicView(game, 'stranger').hand.length, 0);
  view.hand[0].value = 'tampered';
  assert.notEqual(game.players[0].hand[0].value, 'tampered');
});

test('only the current player can play their own matching card and input stays immutable', () => {
  const game = fixture(), original = JSON.stringify(game);
  assert.throws(() => act(game, { type: 'draw' }, 'p1'), /あなたの番/);
  assert.throws(() => act(game, { type: 'play', cardId: 'not-owned' }), /手札/);
  assert.throws(() => play(game, '7'), /同じ色/);
  assert.throws(() => act(game, { type: 'pass' }), /1枚引いて/);
  assert.throws(() => act(game, { type: 'other' }), /操作/);
  const next = play(game, '9');
  assert.equal(next.current, 1);
  assert.equal(next.players[0].hand.length, 2);
  assert.equal(JSON.stringify(game), original);
  const sameNumber = fixture({ hand: [card('blue', '5'), card('green', '2'), card('yellow', '9')] });
  assert.equal(play(sameNumber, '5').color, 'blue');
});

test('wild requires a selected color and +4 cannot be used while holding the current color', () => {
  const wild = fixture({ hand: [card(null, 'wild'), card('blue', '2'), card('green', '3')] });
  assert.throws(() => play(wild, 'wild'), /色を選んで/);
  assert.equal(play(wild, 'wild', 'yellow').color, 'yellow');
  assert.throws(() => play(wild, 'wild', 'pink'), /色を選んで/);
  const blocked = fixture({ hand: [card(null, 'wild4'), card('red', '2'), card('blue', '3')] });
  assert.throws(() => play(blocked, 'wild4', 'blue'), /同じ色/);
  const legal = fixture({ hand: [card(null, 'wild4'), card('blue', '5'), card('green', '3')] });
  const next = play(legal, 'wild4', 'green');
  assert.equal(next.players[1].hand.length, legal.players[1].hand.length + 4);
  assert.equal(next.current, 2);
  assert.equal(next.color, 'green');
});

test('skip, reverse and draw-two advance correctly, including two-player reverse', () => {
  let game = fixture({ hand: [card('red', 'skip'), card('blue', '2'), card('green', '3')] });
  assert.equal(play(game, 'skip').current, 2);
  game = fixture({ hand: [card('red', 'reverse'), card('blue', '2'), card('green', '3')] });
  let next = play(game, 'reverse');
  assert.equal(next.direction, -1);
  assert.equal(next.current, 2);
  game = fixture({ count: 2, hand: [card('red', 'reverse'), card('blue', '2'), card('green', '3')] });
  next = play(game, 'reverse');
  assert.equal(next.current, 0);
  assert.equal(next.direction, -1);
  game = fixture({ hand: [card('red', 'draw2'), card('blue', '2'), card('green', '3')] });
  next = play(game, 'draw2');
  assert.equal(next.players[1].hand.length, game.players[1].hand.length + 2);
  assert.equal(next.current, 2);
  assert.equal(next.drawnCardId, null);
});

test('matching action symbols can be played across colors', () => {
  const game = fixture({ top: card('green', 'skip'), hand: [card('blue', 'skip'), card('yellow', '2'), card('red', '3')] });
  const next = play(game, 'skip');
  assert.equal(next.color, 'blue');
  assert.equal(next.current, 2);
});

test('drawn playable card gives exactly one play-or-pass choice and is private', () => {
  const drawnCard = card('red', '7');
  const game = fixture({ deck: [card('blue', '2'), drawnCard] });
  const drawn = act(game, { type: 'draw' });
  assert.equal(drawn.current, 0);
  assert.equal(drawn.drawnCardId, drawnCard.id);
  assert.equal(publicView(drawn, 'p0').canDraw, false);
  assert.equal(publicView(drawn, 'p0').canPass, true);
  assert.deepEqual(publicView(drawn, 'p0').legalCardIds, [drawnCard.id]);
  assert.equal(publicView(drawn, 'p1').drawnCardId, null);
  assert.throws(() => play(drawn, '9'), /同じ色/);
  assert.throws(() => act(drawn, { type: 'draw' }), /出すか/);
  const passed = act(drawn, { type: 'pass' });
  assert.equal(passed.current, 1);
  assert.equal(passed.drawnCardId, null);
  const played = act(drawn, { type: 'play', cardId: drawnCard.id });
  assert.equal(played.discard[played.discard.length - 1].id, drawnCard.id);
  assert.equal(played.current, 1);
});

test('unplayable draw advances automatically and a blocked drawn +4 cannot be used', () => {
  const game = fixture({ deck: [card('blue', '7')] });
  const next = act(game, { type: 'draw' });
  assert.equal(next.current, 1);
  assert.equal(next.players[0].hand.length, 4);
  const wild = fixture({ deck: [card(null, 'wild4')] });
  assert.equal(act(wild, { type: 'draw' }).current, 1);
});

test('UNO declaration prevents the explicit immediate two-card house-rule penalty', () => {
  const game = fixture({ hand: [card('red', '7'), card('blue', '2')] });
  const missed = act(game, { type: 'play', cardId: game.players[0].hand[0].id });
  assert.equal(missed.players[0].hand.length, 3);
  assert.match(missed.log.map(entry => entry.text).join(' '), /UNO宣言忘れ/);
  const declared = act(game, { type: 'play', cardId: game.players[0].hand[0].id, uno: true });
  assert.equal(declared.players[0].hand.length, 1);
  assert.match(declared.log.map(entry => entry.text).join(' '), /UNO！/);
});

test('winning on a draw card still applies its penalty before finishing', () => {
  const game = fixture({ hand: [card('red', 'draw2')] });
  const next = play(game, 'draw2');
  assert.equal(next.phase, 'finished');
  assert.equal(next.winnerId, 'p0');
  assert.equal(next.players[1].hand.length, game.players[1].hand.length + 2);
  assert.equal(publicView(next, 'p0').currentPlayerId, null);
  assert.equal(publicView(next, 'p0').canDraw, false);
  assert.deepEqual(publicView(next, 'p0').legalCardIds, []);
  assert.equal(chooseCpuAction(next, 'p0'), null);
  assert.throws(() => act(next, { type: 'draw' }), /終了/);
});

test('empty deck recycles every discard except the visible top without losing cards', () => {
  const top = card('red', '5'), game = fixture({ deck: [], top });
  game.discard.unshift(card('green', '2'), card('blue', '3'), card('yellow', '9'));
  const before = allCards(game).map(c => c.id).sort(), next = act(game, { type: 'draw' });
  assert.equal(next.discard.length, 1);
  assert.equal(next.discard[0].id, top.id);
  assert.deepEqual(allCards(next).map(c => c.id).sort(), before);
  assert.equal(new Set(allCards(next).map(c => c.id)).size, before.length);
});

test('seeded complete CPU games for every 2–6-player size finish and conserve all 108 cards', () => {
  let turns = 0;
  for (let count = 2; count <= 6; count++) {
    for (let seed = 1; seed <= 12; seed++) {
      const rng = seeded(count * 1000 + seed);
      let game = createGame(Array.from({ length: count }, (_, i) => ({ id: `p${i}`, name: `CPU${i}` })), { rng, now: 0 });
      let step = 0;
      while (game.phase === 'playing' && step < 5000) {
        const actor = game.players[game.current].id, action = chooseCpuAction(game, actor), view = publicView(game, actor);
        if (action.type === 'play') assert.ok(view.legalCardIds.includes(action.cardId));
        game = applyAction(game, actor, action, { rng, now: ++step });
        assert.equal(allCards(game).length, 108);
        assert.equal(new Set(allCards(game).map(card => card.id)).size, 108);
        turns++;
      }
      assert.equal(game.phase, 'finished', `${count} players, seed ${seed} stalled after ${step} actions`);
      assert.equal(game.players.find(player => player.id === game.winnerId).hand.length, 0);
    }
  }
  assert.ok(turns > 1000);
});
