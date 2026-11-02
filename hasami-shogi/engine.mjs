export const SIZE = 9;
export const BLACK = 1;
export const WHITE = -1;
export const DRAW = 2;
const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export const rowOf = index => Math.floor(index / SIZE);
export const colOf = index => index % SIZE;
export const at = (row, col) => row * SIZE + col;
export const inBoard = (row, col) => row >= 0 && row < SIZE && col >= 0 && col < SIZE;

export function initialState() {
  const board = Array(SIZE * SIZE).fill(0);
  for (let col = 0; col < SIZE; col++) {
    board[at(0, col)] = WHITE;
    board[at(SIZE - 1, col)] = BLACK;
  }
  return {
    board, turn: BLACK, taken: { [BLACK]: 0, [WHITE]: 0 },
    pendingLead: 0, winner: 0, reason: '', moveNumber: 0, lastMove: null,
  };
}

export function legalMoves(board, from) {
  const player = board[from];
  if (!player) return [];
  const row = rowOf(from), col = colOf(from), moves = [];
  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr, c = col + dc;
    while (inBoard(r, c) && board[at(r, c)] === 0) {
      moves.push(at(r, c));
      r += dr; c += dc;
    }
  }
  return moves;
}

export function allMoves(board, player) {
  const moves = [];
  for (let from = 0; from < board.length; from++) {
    if (board[from] !== player) continue;
    for (const to of legalMoves(board, from)) moves.push({ from, to });
  }
  return moves;
}

function lineCaptures(board, to, player) {
  const found = new Set(), row = rowOf(to), col = colOf(to);
  for (const [dr, dc] of DIRECTIONS) {
    const run = [];
    let r = row + dr, c = col + dc;
    while (inBoard(r, c) && board[at(r, c)] === -player) {
      run.push(at(r, c)); r += dr; c += dc;
    }
    if (run.length && inBoard(r, c) && board[at(r, c)] === player) {
      run.forEach(index => found.add(index));
    }
  }
  return found;
}

// A connected enemy group touching the rim is taken only when every in-board
// orthogonal exit is blocked by the mover's pieces. Board boundaries are walls.
function edgeCaptures(board, player, to) {
  const found = new Set(), visited = new Set(), opponent = -player;
  for (let start = 0; start < board.length; start++) {
    if (board[start] !== opponent || visited.has(start)) continue;
    const group = [], queue = [start];
    visited.add(start);
    let touchesEdge = false, sealed = true, moveSealedGroup = false;
    for (let cursor = 0; cursor < queue.length; cursor++) {
      const index = queue[cursor], row = rowOf(index), col = colOf(index);
      group.push(index);
      if (row === 0 || row === SIZE - 1 || col === 0 || col === SIZE - 1) touchesEdge = true;
      for (const [dr, dc] of DIRECTIONS) {
        const r = row + dr, c = col + dc;
        if (!inBoard(r, c)) continue;
        const adjacent = at(r, c);
        if (adjacent === to) moveSealedGroup = true;
        if (board[adjacent] === 0) sealed = false;
        else if (board[adjacent] === opponent && !visited.has(adjacent)) {
          visited.add(adjacent); queue.push(adjacent);
        }
      }
    }
    if (touchesEdge && sealed && moveSealedGroup) group.forEach(index => found.add(index));
  }
  return found;
}

export function applyMove(state, from, to) {
  if (state.winner || state.board[from] !== state.turn || !legalMoves(state.board, from).includes(to)) return null;
  const board = state.board.slice(), mover = state.turn;
  board[from] = 0; board[to] = mover;
  const capturedSet = lineCaptures(board, to, mover);
  for (const index of edgeCaptures(board, mover, to)) capturedSet.add(index);
  const captured = [...capturedSet].sort((a, b) => a - b);
  captured.forEach(index => { board[index] = 0; });
  const taken = { ...state.taken, [mover]: state.taken[mover] + captured.length };
  let winner = 0, reason = '', pendingLead = 0;

  if (taken[mover] >= 5) {
    winner = mover; reason = 'five';
  } else if (state.pendingLead === -mover && taken[state.pendingLead] - taken[mover] >= 3) {
    winner = state.pendingLead; reason = 'lead';
  } else if (taken[mover] - taken[-mover] >= 3) {
    pendingLead = mover;
  }

  if (!winner && allMoves(board, -mover).length === 0) {
    winner = DRAW; reason = 'no-moves';
  }

  return {
    board, turn: winner ? mover : -mover, taken, pendingLead, winner, reason,
    moveNumber: state.moveNumber + 1,
    lastMove: { player: mover, from, to, captured },
  };
}
