import { BLACK, WHITE, DRAW, SIZE, at, rowOf, colOf, initialState, legalMoves, allMoves, applyMove } from './engine.mjs';

const $ = id => document.getElementById(id);
const ui = {
  body: document.body, board: $('board'), actions: document.querySelector('.actions'), status: $('status'), moveCount: $('moveCount'),
  blackCard: $('blackCard'), whiteCard: $('whiteCard'), blackName: $('blackName'), whiteName: $('whiteName'),
  blackTaken: $('blackTaken'), whiteTaken: $('whiteTaken'), blackTrack: $('blackTrack'), whiteTrack: $('whiteTrack'),
  blackProgress: $('blackProgress'), whiteProgress: $('whiteProgress'), leadNote: $('leadNote'),
  moveLog: $('moveLog'), boardMode: $('boardMode'), start: $('startBtn'), undo: $('undoBtn'),
  hint: $('hintBtn'), newGame: $('newBtn'), mode: $('modeBtn'), rulesTop: $('rulesTop'), rules: $('rulesBtn'),
  rulesDialog: $('rulesDialog'), closeRules: $('closeRules'), resultDialog: $('resultDialog'),
  closeResult: $('closeResult'), resultTitle: $('resultTitle'), resultCopy: $('resultCopy'),
  again: $('againBtn'), resultMode: $('resultModeBtn'), sound: $('soundBtn'),
};

const rows = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const sideName = player => player === BLACK ? '先手' : '後手';
const coordinate = index => `${SIZE - colOf(index)}${rows[rowOf(index)]}`;
const buttons = [];
let game = initialState();
let mode = 'cpu';
let phase = 'setup';
let selected = null;
let cursor = at(8, 4);
let hint = null;
let history = [];
let moves = [];
let cpuTimer = null;
let serial = 0;
let soundOn = false;
let audio = null;

function beep(frequency, seconds = .09, type = 'sine', volume = .028) {
  if (!soundOn) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    if (!audio) audio = new Audio();
    if (audio.state === 'suspended') audio.resume();
    const oscillator = audio.createOscillator(), gain = audio.createGain(), time = audio.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * .72), time + seconds);
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(.0001, time + seconds);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(time); oscillator.stop(time + seconds + .01);
  } catch { /* Sound is optional. */ }
}

function makeBoard() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < SIZE * SIZE; index++) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'cell'; button.dataset.index = String(index);
    button.setAttribute('role', 'gridcell');
    button.addEventListener('click', () => handleCell(index));
    buttons.push(button); fragment.append(button);
  }
  ui.board.replaceChildren(fragment);
}

function setMode(next) {
  if (phase !== 'setup') return;
  mode = next === 'local' ? 'local' : 'cpu';
  document.querySelectorAll('.mode').forEach(button => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  render();
}

function stopCpu() {
  serial++;
  clearTimeout(cpuTimer);
  cpuTimer = null;
}

function startMatch() {
  stopCpu();
  if (ui.resultDialog.open) ui.resultDialog.close();
  game = initialState(); history = []; moves = [];
  selected = null; hint = null; cursor = at(8, 4);
  phase = 'playing';
  render();
  focusCursor();
  beep(520, .12);
  const version = serial;
  requestAnimationFrame(() => {
    if (version !== serial || phase !== 'playing' || innerWidth > 620) return;
    const viewportBottom = window.visualViewport
      ? window.visualViewport.offsetTop + window.visualViewport.height
      : innerHeight;
    const overflow = ui.actions.getBoundingClientRect().bottom + 16 - viewportBottom;
    if (overflow > 0) scrollBy(0, Math.ceil(overflow));
  });
}

function backToSetup() {
  stopCpu();
  if (ui.resultDialog.open) ui.resultDialog.close();
  game = initialState(); history = []; moves = [];
  selected = null; hint = null; cursor = at(8, 4);
  phase = 'setup';
  render();
  ui.start.focus({ preventScroll: true });
  if (innerWidth <= 620) scrollTo(0, 0);
}

function focusCursor() {
  if (phase === 'playing') buttons[cursor]?.focus({ preventScroll: true });
}

function statusText() {
  if (phase === 'setup') return 'モードを選んで対局を始めましょう';
  if (phase === 'thinking') return 'CPUが次の一手を考えています…';
  if (phase === 'over') {
    if (game.winner === DRAW) return '移動できる手がないため引き分け';
    return `${sideName(game.winner)}の勝ち！ ${game.reason === 'five' ? '5枚取り' : '3枚差を守り切りました'}`;
  }
  if (game.pendingLead) return `${sideName(game.pendingLead)}が3枚リード。${sideName(game.turn)}はこの手で差を縮めよう`;
  return `${sideName(game.turn)}の手番${mode === 'cpu' && game.turn === BLACK ? ' · あなたの番' : ''}`;
}

function renderBoard() {
  const legal = selected == null ? [] : legalMoves(game.board, selected);
  const capturesByDestination = new Map();
  for (const to of legal) {
    const preview = applyMove(game, selected, to);
    capturesByDestination.set(to, preview?.lastMove.captured.length || 0);
  }
  ui.board.inert = phase !== 'playing';
  buttons.forEach((button, index) => {
    const piece = game.board[index];
    button.replaceChildren();
    if (piece) {
      const shape = document.createElement('span'), glyph = document.createElement('span');
      shape.className = `piece ${piece === BLACK ? 'black' : 'white'}`;
      glyph.textContent = piece === BLACK ? '歩' : 'と';
      shape.append(glyph); button.append(shape);
    }
    button.className = 'cell';
    if (index === selected) button.classList.add('selected');
    if (game.lastMove?.from === index) button.classList.add('last-from');
    if (game.lastMove?.to === index) button.classList.add('last-to');
    if (legal.includes(index)) button.classList.add('legal');
    if (capturesByDestination.get(index)) button.classList.add('capture-target');
    if (hint?.from === index) button.classList.add('hint-from');
    if (hint?.to === index) button.classList.add('hint-to');
    const occupant = piece === BLACK ? '先手の歩' : piece === WHITE ? '後手のと金' : '空きマス';
    const capture = capturesByDestination.get(index);
    const moveText = legal.includes(index) ? `。移動可${capture ? `、${capture}枚取れる` : ''}` : '';
    button.setAttribute('aria-label', `${coordinate(index)}、${occupant}${moveText}`);
    button.setAttribute('aria-selected', String(index === selected));
    button.tabIndex = phase === 'playing' && index === cursor ? 0 : -1;
  });
}

function renderLog() {
  ui.moveLog.replaceChildren();
  if (!moves.length) {
    const item = document.createElement('li'); item.className = 'empty-log';
    item.textContent = 'まだ着手はありません'; ui.moveLog.append(item); return;
  }
  for (const move of moves.slice(-6).reverse()) {
    const item = document.createElement('li'), side = document.createElement('span');
    item.className = move.player === WHITE ? 'white' : '';
    side.textContent = `${String(move.number).padStart(2, '0')}  ${sideName(move.player)}`;
    item.append(side, document.createTextNode(`${coordinate(move.from)} → ${coordinate(move.to)}${move.captured ? `  +${move.captured}` : ''}`));
    ui.moveLog.append(item);
  }
}

function render() {
  ui.body.classList.remove('state-setup','state-playing','state-thinking','state-over');
  ui.body.classList.add(`state-${phase}`);
  ui.blackName.textContent = mode === 'cpu' ? 'あなた' : 'プレイヤー1';
  ui.whiteName.textContent = mode === 'cpu' ? 'CPU' : 'プレイヤー2';
  ui.blackCard.querySelector('small').textContent = `先手 / ${mode === 'cpu' ? 'あなた' : 'P1'}`;
  ui.whiteCard.querySelector('small').textContent = `後手 / ${mode === 'cpu' ? 'CPU' : 'P2'}`;
  ui.blackCard.classList.toggle('active', game.winner ? game.winner === BLACK : game.turn === BLACK);
  ui.whiteCard.classList.toggle('active', game.winner ? game.winner === WHITE : game.turn === WHITE);
  ui.blackTaken.textContent = String(game.taken[BLACK]);
  ui.whiteTaken.textContent = String(game.taken[WHITE]);
  ui.blackProgress.textContent = `${game.taken[BLACK]} / 5`;
  ui.whiteProgress.textContent = `${game.taken[WHITE]} / 5`;
  ui.blackTrack.style.width = `${Math.min(100, game.taken[BLACK] * 20)}%`;
  ui.whiteTrack.style.width = `${Math.min(100, game.taken[WHITE] * 20)}%`;
  ui.status.textContent = statusText();
  ui.moveCount.textContent = `TURN ${String(game.moveNumber).padStart(2, '0')}`;
  ui.boardMode.textContent = mode === 'cpu' ? 'VS CPU' : '2 PLAYERS';
  ui.leadNote.textContent = game.pendingLead
    ? `${sideName(game.pendingLead)}が3枚リード。相手は次の1手で差を縮められます。`
    : '先に5枚取るか、3枚差をつけて次の相手の手でも差を守れば勝ち。';
  ui.undo.disabled = !history.length || phase === 'setup';
  ui.hint.disabled = phase !== 'playing';
  ui.newGame.disabled = phase === 'setup';
  ui.mode.disabled = phase === 'setup';
  renderBoard(); renderLog();
}

function handleCell(index) {
  if (phase !== 'playing') return;
  cursor = index;
  const occupant = game.board[index];
  if (occupant === game.turn) {
    selected = selected === index ? null : index;
    hint = null; render(); focusCursor();
    beep(selected == null ? 250 : 470, .05); return;
  }
  if (selected != null && legalMoves(game.board, selected).includes(index)) {
    playMove(selected, index); return;
  }
  ui.status.textContent = selected == null ? '自分の駒を選んでください' : '光るマスへ移動できます';
  renderBoard(); focusCursor();
}

function playMove(from, to) {
  const next = applyMove(game, from, to);
  if (!next) return;
  history.push(game);
  game = next;
  moves.push({ number: next.moveNumber, player: next.lastMove.player, from, to, captured: next.lastMove.captured.length });
  selected = null; hint = null; cursor = to;
  beep(next.lastMove.captured.length ? 760 : 410, next.lastMove.captured.length ? .16 : .08, next.lastMove.captured.length ? 'triangle' : 'sine');
  if (game.winner) {
    phase = 'over'; render(); showResult(); return;
  }
  if (mode === 'cpu' && game.turn === WHITE) {
    phase = 'thinking'; render();
    const version = serial;
    cpuTimer = setTimeout(() => { if (version === serial && phase === 'thinking') cpuMove(); }, 420);
  } else {
    phase = 'playing'; render(); focusCursor();
  }
}

function quickScore(before, next, player, from, to) {
  if (next.winner === player) return 100000;
  const capture = next.lastMove.captured.length;
  const row = rowOf(to), col = colOf(to);
  const center = 4 - Math.abs(col - 4);
  const advance = player === WHITE ? row : 8 - row;
  const lead = next.taken[player] - next.taken[-player];
  const approach = Math.max(0, 4 - Math.abs(advance - 4));
  return capture * 350 + lead * 28 + center * 3 + approach * 2 + Math.random() * 6;
}

function bestMove(position, player) {
  const candidates = allMoves(position.board, player).map(({ from, to }) => {
    const next = applyMove(position, from, to);
    return { from, to, next, value: quickScore(position, next, player, from, to) };
  }).sort((a, b) => b.value - a.value).slice(0, 14);
  if (!candidates.length) return null;
  for (const candidate of candidates) {
    if (candidate.next.winner === player) return candidate;
    let danger = 0;
    const replies = allMoves(candidate.next.board, -player);
    for (const reply of replies) {
      const after = applyMove(candidate.next, reply.from, reply.to);
      if (after.winner === -player) { danger = 10000; break; }
      danger = Math.max(danger, after.lastMove.captured.length * 300);
    }
    candidate.value -= danger;
  }
  candidates.sort((a, b) => b.value - a.value);
  return candidates[0];
}

function cpuMove() {
  cpuTimer = null;
  const choice = bestMove(game, WHITE);
  if (!choice) {
    game = { ...game, winner: DRAW, reason: 'no-moves' };
    phase = 'over'; render(); showResult(); return;
  }
  playMove(choice.from, choice.to);
}

function undoMove() {
  if (!history.length || phase === 'setup') return;
  stopCpu();
  if (ui.resultDialog.open) ui.resultDialog.close();
  let count = 1;
  if (mode === 'cpu' && phase !== 'thinking' && history.length >= 2 && game.lastMove?.player === WHITE) count = 2;
  for (let step = 0; step < count; step++) {
    game = history.pop(); moves.pop();
  }
  selected = null; hint = null;
  cursor = game.turn === BLACK ? at(8, 4) : at(0, 4);
  phase = 'playing'; render(); focusCursor();
  beep(290, .09);
}

function showHint() {
  if (phase !== 'playing') return;
  const choice = bestMove(game, game.turn);
  if (!choice) return;
  hint = { from: choice.from, to: choice.to };
  ui.status.textContent = `ヒント：${coordinate(choice.from)} → ${coordinate(choice.to)}${choice.next.lastMove.captured.length ? `、${choice.next.lastMove.captured.length}枚取れます` : ''}`;
  renderBoard();
  beep(640, .09);
}

function showResult() {
  if (game.winner === DRAW) {
    ui.resultTitle.textContent = '引き分け';
    ui.resultCopy.textContent = '動ける手がなくなりました。本ゲーム独自の引き分け処理です。';
  } else {
    const name = mode === 'cpu' ? (game.winner === BLACK ? 'あなた' : 'CPU') : (game.winner === BLACK ? 'プレイヤー1' : 'プレイヤー2');
    ui.resultTitle.textContent = `${name}の勝ち！`;
    ui.resultCopy.textContent = game.reason === 'five'
      ? '先に5枚の駒を取りました。'
      : '3枚差をつけ、相手の取り返しの一手をしのぎました。';
  }
  ui.resultDialog.showModal();
  ui.again.focus({ preventScroll: true });
  beep(game.winner === BLACK ? 880 : 280, .22, 'triangle');
}

function handleKeyboard(event) {
  if (ui.rulesDialog.open || ui.resultDialog.open || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target?.tagName)) return;
  if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey || event.altKey)) return;
  if (event.code === 'KeyZ' && phase !== 'setup') { event.preventDefault(); if (!event.repeat) undoMove(); return; }
  if (event.code === 'KeyH' && phase === 'playing') { event.preventDefault(); if (!event.repeat) showHint(); return; }
  if (phase !== 'playing') return;
  if (!event.target?.classList?.contains('cell') && event.target !== document.body) return;
  const deltas = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
  if (deltas[event.code]) {
    event.preventDefault();
    const [dr, dc] = deltas[event.code];
    cursor = at(Math.max(0, Math.min(8, rowOf(cursor) + dr)), Math.max(0, Math.min(8, colOf(cursor) + dc)));
    renderBoard(); focusCursor(); return;
  }
  if (event.code === 'Escape') {
    event.preventDefault(); selected = null; hint = null; render(); focusCursor(); return;
  }
  if ((event.code === 'Enter' || event.code === 'Space') && !event.repeat) {
    event.preventDefault(); handleCell(cursor);
  }
}

document.querySelectorAll('.mode').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
ui.start.addEventListener('click', startMatch);
ui.undo.addEventListener('click', undoMove);
ui.hint.addEventListener('click', showHint);
ui.newGame.addEventListener('click', startMatch);
ui.mode.addEventListener('click', backToSetup);
ui.rulesTop.addEventListener('click', () => ui.rulesDialog.showModal());
ui.rules.addEventListener('click', () => ui.rulesDialog.showModal());
ui.closeRules.addEventListener('click', () => ui.rulesDialog.close());
ui.closeResult.addEventListener('click', () => ui.resultDialog.close());
ui.again.addEventListener('click', startMatch);
ui.resultMode.addEventListener('click', backToSetup);
ui.sound.addEventListener('click', () => {
  soundOn = !soundOn;
  ui.sound.setAttribute('aria-pressed', String(soundOn));
  ui.sound.setAttribute('aria-label', soundOn ? '効果音をオフにする' : '効果音をオンにする');
  ui.sound.querySelector('span').textContent = soundOn ? 'ON' : 'OFF';
  if (soundOn) beep(720, .11);
});
document.addEventListener('keydown', handleKeyboard, { passive: false });

makeBoard(); render();
