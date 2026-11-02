import test from 'node:test';
import assert from 'node:assert/strict';
import { BLACK, WHITE, SIZE, applyMove, at, initialState, legalMoves } from './engine.mjs';

function position(pieces, options = {}) {
  const board = Array(SIZE * SIZE).fill(0);
  for (const [index, player] of pieces) board[index] = player;
  return {
    board, turn: options.turn ?? BLACK,
    taken: { [BLACK]: options.blackTaken ?? 0, [WHITE]: options.whiteTaken ?? 0 },
    pendingLead: options.pendingLead ?? 0,
    winner: 0, reason: '', moveNumber: 0, lastMove: null,
  };
}

test('initial setup places nine pieces on each far rank and black moves first', () => {
  const state = initialState();
  assert.equal(state.turn, BLACK);
  assert.equal(state.board.filter(piece => piece === BLACK).length, 9);
  assert.equal(state.board.filter(piece => piece === WHITE).length, 9);
  assert.equal(state.board[at(0, 4)], WHITE);
  assert.equal(state.board[at(8, 4)], BLACK);
  assert.deepEqual(legalMoves(state.board, at(8, 4)).sort((a, b) => a - b),
    Array.from({ length: 7 }, (_, i) => at(i + 1, 4)));
});

test('pieces cannot jump other pieces or move diagonally', () => {
  const state = position([[40, BLACK], [31, WHITE], [41, BLACK], [80, WHITE]]);
  assert.equal(legalMoves(state.board, 40).includes(22), false);
  assert.equal(legalMoves(state.board, 40).includes(30), false);
  assert.equal(applyMove(state, 40, 30), null);
});

test('a move can capture one or several pieces between own pieces', () => {
  const single = position([[0, BLACK], [2, WHITE], [3, BLACK], [80, WHITE]]);
  const result = applyMove(single, 0, 1);
  assert.deepEqual(result.lastMove.captured, [2]);
  assert.equal(result.taken[BLACK], 1);

  const double = position([[22, BLACK], [11, BLACK], [12, WHITE], [14, WHITE], [15, BLACK], [80, WHITE]]);
  const next = applyMove(double, 22, 13);
  assert.deepEqual(next.lastMove.captured, [12, 14]);
  assert.equal(next.taken[BLACK], 2);
});

test('an enemy entering a bracket is not captured on its own turn', () => {
  const state = position([[10, BLACK], [0, WHITE], [2, WHITE], [80, WHITE]], { turn: BLACK });
  const next = applyMove(state, 10, 1);
  assert.equal(next.board[1], BLACK);
  assert.deepEqual(next.lastMove.captured, []);
});

test('corner and continuous edge groups are captured when every in-board exit is sealed', () => {
  const corner = position([[0, WHITE], [1, BLACK], [18, BLACK], [80, WHITE]]);
  assert.deepEqual(applyMove(corner, 18, 9).lastMove.captured, [0]);

  const group = position([
    [0, WHITE], [1, WHITE], [2, WHITE], [3, BLACK],
    [9, BLACK], [10, BLACK], [20, BLACK], [80, WHITE],
  ]);
  assert.deepEqual(applyMove(group, 20, 11).lastMove.captured, [0, 1, 2]);
});

test('an edge group with one empty adjacent square is not captured', () => {
  const state = position([
    [0, WHITE], [1, WHITE], [2, WHITE], [3, BLACK],
    [9, BLACK], [20, BLACK], [80, WHITE],
  ]);
  assert.deepEqual(applyMove(state, 20, 11).lastMove.captured, []);
});

test('an unrelated move cannot take a group the enemy enclosed on its own turn', () => {
  const state = position([[0, WHITE], [1, BLACK], [9, BLACK], [70, WHITE], [80, BLACK]]);
  const next = applyMove(state, 80, 71);
  assert.deepEqual(next.lastMove.captured, []);
  assert.equal(next.board[0], WHITE);
});

test('the fifth captured piece wins immediately', () => {
  const state = position([[0, BLACK], [2, WHITE], [3, BLACK], [80, WHITE]], { blackTaken: 4 });
  const next = applyMove(state, 0, 1);
  assert.equal(next.winner, BLACK);
  assert.equal(next.reason, 'five');
});

test('a three-piece lead grants one answering move before victory', () => {
  const state = position([[0, BLACK], [2, WHITE], [3, BLACK], [80, WHITE]], { blackTaken: 2 });
  const lead = applyMove(state, 0, 1);
  assert.equal(lead.taken[BLACK], 3);
  assert.equal(lead.winner, 0);
  assert.equal(lead.pendingLead, BLACK);
  const reply = applyMove(lead, 80, 71);
  assert.equal(reply.winner, BLACK);
  assert.equal(reply.reason, 'lead');
});

test('answering capture that reduces the lead cancels pending victory', () => {
  const state = position([[0, WHITE], [2, BLACK], [3, WHITE], [80, BLACK]], {
    turn: WHITE, blackTaken: 3, pendingLead: BLACK,
  });
  const reply = applyMove(state, 0, 1);
  assert.deepEqual(reply.lastMove.captured, [2]);
  assert.equal(reply.taken[WHITE], 1);
  assert.equal(reply.winner, 0);
  assert.equal(reply.pendingLead, 0);
});
