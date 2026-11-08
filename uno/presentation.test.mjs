import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame, applyAction, publicView} from './engine.mjs';
import {snapshotPublicGame, diffPublicSnapshots} from './presentation.mjs';

let sequence = 0;
const card = (color, value) => ({id: 'fx-' + sequence++, color, value});
function seeded(seed = 1) { return () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296; }
function fixture({count = 3, hand = [card('red', '7'), card('blue', '2'), card('green', '3')], deck = [card('blue', '4'), card('green', '5'), card('yellow', '8'), card('blue', '1'), card('green', '2')], current = 0} = {}) {
  return {players: Array.from({length: count}, (_, i) => ({id: 'p' + i, name: 'プレイヤー' + i, hand: i ? [card('red', '9'), card('green', '7'), card('blue', '4')] : hand})), deck, discard: [card('red', '5')], current, direction: 1, color: 'red', phase: 'playing', winnerId: null, drawnCardId: null, turnStartedAt: 1000, log: []};
}
const act = (game, action, now = 2000) => applyAction(game, game.players[game.current].id, action, {rng: seeded(), now});
const snap = (game, id = 'p0') => snapshotPublicGame(publicView(game, id));

test('snapshot retains only public presentation fields and cannot leak private hands or mutate its input', () => {
  const game = fixture(), view = publicView(game, 'p0');
  view.deck = game.deck; view.players[1].hand = game.players[1].hand; view.secret = 'not visible';
  const source = JSON.stringify(view), snapshot = snapshotPublicGame(view);
  assert.deepEqual(snapshot.handIds, game.players[0].hand.map(card => card.id));
  assert.equal(JSON.stringify(snapshot).includes('secret'), false);
  assert.equal(JSON.stringify(snapshot).includes(game.players[1].hand[0].id), false);
  assert.equal('hand' in snapshot.players[1], false);
  snapshot.players[0].name = 'changed'; snapshot.log.push({text: 'changed', at: 0});
  assert.equal(JSON.stringify(view), source);
  assert.equal(snapshotPublicGame(null), null);
});

test('explicit new deals include all seven self cards and player counts while reconnects establish a silent baseline', () => {
  const game = createGame([{id: 'p0', name: 'あなた'}, {id: 'p1', name: '相手'}], {rng: seeded(4), now: 10}), next = snap(game);
  assert.equal(diffPublicSnapshots(null, next).initial, false);
  assert.equal(diffPublicSnapshots(null, next).played, null);
  const effects = diffPublicSnapshots(null, next, {initial: true});
  assert.equal(effects.initial, true); assert.equal(effects.newRound, true);
  assert.equal(effects.addedHandIds.length, 7);
  assert.deepEqual(effects.received, [{playerId: 'p0', count: 7}, {playerId: 'p1', count: 7}]);
  assert.equal(effects.unoCount, 0); assert.equal(effects.played, null);
});

test('playable and unplayable draws both identify only the new self card without a fake discard', () => {
  for (const color of ['red', 'yellow']) {
    const drawn = card(color, '8'), before = fixture({deck: [drawn]}), after = act(before, {type: 'draw'});
    const effect = diffPublicSnapshots(snap(before), snap(after));
    assert.deepEqual(effect.addedHandIds, [drawn.id]);
    assert.deepEqual(effect.received, [{playerId: 'p0', count: 1}]);
    assert.equal(effect.played, null); assert.equal(effect.unoCount, 0);
  }
});

test('a public play reports its actor and card, and +2 / +4 report received self IDs using the victim view', () => {
  for (const [value, color, count] of [['draw2', 'red', 2], ['wild4', null, 4]]) {
    const before = fixture({hand: [card(color, value), card('blue', '2'), card('green', '3')]}), played = before.players[0].hand[0];
    const after = act(before, {type: 'play', cardId: played.id, color: 'blue'});
    const effect = diffPublicSnapshots(snap(before, 'p1'), snap(after, 'p1'));
    assert.equal(effect.played.actorId, 'p0'); assert.deepEqual(effect.played.card, played);
    assert.equal(effect.addedHandIds.length, count);
    assert.deepEqual(effect.received, [{playerId: 'p1', count}]);
  }
});

test('confirmed UNO is voiced once; missing UNO keeps the penalty cards but never creates a declaration', () => {
  const before = fixture({hand: [card('red', '7'), card('blue', '2')]}), cardId = before.players[0].hand[0].id;
  const declared = act(before, {type: 'play', cardId, uno: true});
  const first = diffPublicSnapshots(snap(before), snap(declared));
  assert.equal(first.unoCount, 1); assert.equal(first.addedHandIds.length, 0);
  const repeated = diffPublicSnapshots(snap(declared), snap(structuredClone(declared)));
  assert.equal(repeated.unoCount, 0); assert.equal(repeated.played, null); assert.deepEqual(repeated.received, []);
  const missed = act(before, {type: 'play', cardId});
  const penalty = diffPublicSnapshots(snap(before), snap(missed));
  assert.equal(penalty.unoCount, 0); assert.equal(penalty.addedHandIds.length, 2);
  // Positive player count changes are net changes. The caller uses addedHandIds
  // for its own hand, rather than treating this net +1 as the number drawn.
  assert.deepEqual(penalty.received, [{playerId: 'p0', count: 1}]);
});

test('a winning draw card reports both the opponent receipt and exactly one winner event', () => {
  const before = fixture({hand: [card('red', 'draw2')]}), after = act(before, {type: 'play', cardId: before.players[0].hand[0].id, uno: true});
  const effect = diffPublicSnapshots(snap(before), snap(after));
  assert.equal(effect.winner, 'p0'); assert.equal(effect.played.actorId, 'p0');
  assert.deepEqual(effect.received, [{playerId: 'p1', count: 2}]);
  assert.equal(diffPublicSnapshots(snap(after), snap(after)).winner, null);
  assert.equal(diffPublicSnapshots(null, snap(after)).winner, null);
});

test('sequence overlap preserves repeated same-millisecond UNO entries and caps a backlog to one voice', () => {
  const snapshot = snap(fixture()), uno = {text: 'プレイヤー0さんがUNO！', at: 5};
  snapshot.log = [{text: 'earlier action', at: 5}, uno];
  const next = structuredClone(snapshot); next.log.push({...uno});
  assert.equal(diffPublicSnapshots(snapshot, next).unoCount, 1);
  assert.equal(diffPublicSnapshots(next, structuredClone(next)).unoCount, 0);
  const many = structuredClone(snapshot); many.log.push({...uno}, {text: 'プレイヤー1さんがUNO！', at: 5});
  assert.equal(diffPublicSnapshots(snapshot, many).unoCount, 1);
});

test('twenty-entry rollover finds new declarations without replaying old ones', () => {
  const before = snap(fixture()); before.log = Array.from({length: 20}, (_, i) => ({text: 'action ' + i, at: i}));
  before.log[10] = {text: 'プレイヤー0さんがUNO！', at: 10};
  const after = structuredClone(before); after.log = [...before.log.slice(2), {text: 'action 20', at: 20}, {text: 'プレイヤー1さんがUNO！', at: 21}];
  assert.equal(diffPublicSnapshots(before, after).unoCount, 1);
  assert.equal(diffPublicSnapshots(after, structuredClone(after)).unoCount, 0);
  const noNew = structuredClone(before); noNew.log = [...before.log.slice(1), {text: 'action 20', at: 20}];
  assert.equal(diffPublicSnapshots(before, noNew).unoCount, 0);
});

test('a fresh startup stamp or finished-to-playing transition means deal, not historical plays or declarations', () => {
  const players = [{id: 'p0', name: 'あなた'}, {id: 'p1', name: '相手'}];
  const before = snap(createGame(players, {rng: seeded(2), now: 10})), next = snap(createGame(players, {rng: seeded(3), now: 20}));
  const effect = diffPublicSnapshots(before, next);
  assert.equal(effect.initial, true); assert.equal(effect.newRound, true); assert.equal(effect.played, null); assert.equal(effect.unoCount, 0);
  assert.equal(effect.addedHandIds.length, 7);
  const finished = {...before, phase: 'finished', winnerId: 'p0', gameStartStamp: null};
  const unmarked = {...next, log: [], gameStartStamp: null};
  assert.equal(diffPublicSnapshots(finished, unmarked).initial, true);
  const capped = {...before, log: [{text: 'later action', at: 100}], gameStartStamp: before.gameStartStamp};
  const carried = snapshotPublicGame({...publicView(createGame(players, {rng: seeded(3), now: 20}), 'p0'), log: [], gameStartStamp: capped.gameStartStamp});
  assert.equal(carried.gameStartStamp, capped.gameStartStamp);
  assert.equal(diffPublicSnapshots(capped, carried).newRound, false);
});

test('multiple observed actions use the last uniquely named actor and avoid guessing when names collide', () => {
  const before = snap(fixture()), after = structuredClone(before);
  after.topCard = card('blue', '7');
  after.log = [{text: 'プレイヤー0さんがカードを1枚引きました。', at: 2}, {text: 'プレイヤー1さんが青の7を出しました。', at: 3}];
  assert.equal(diffPublicSnapshots(before, after).played.actorId, 'p1');
  before.players[0].name = before.players[1].name = '同名';
  after.players[0].name = after.players[1].name = '同名';
  after.log = [{text: '同名さんがカードを1枚引きました。', at: 2}, {text: '同名さんが青の7を出しました。', at: 3}];
  assert.equal(diffPublicSnapshots(before, after).played.actorId, null);
  after.log = [{text: '同名さんが青の7を出しました。', at: 3}];
  assert.equal(diffPublicSnapshots(before, after).played.actorId, before.currentPlayerId);
});
