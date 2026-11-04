import { createGame, applyAction, publicView, chooseCpuAction, COLORS } from './engine.mjs';

const API = 'https://tk777-neonshift-scores.takesuke.chatgpt.site/api/uno';
const SESSION_KEY = 'tk777-uno-session';
const NAME_KEY = 'tk777-uno-name';
const $ = id => document.getElementById(id);
const colorNames = { red: '赤', yellow: '黄', green: '緑', blue: '青' };
const colorSymbols = { red: '●', yellow: '◆', green: '▲', blue: '■' };
const valueNames = { skip: 'スキップ', reverse: 'リバース', draw2: 'ドロー2', wild: 'ワイルド', wild4: 'ワイルド・ドロー4' };
const valueSymbols = { skip: '⊘', reverse: '⇄', draw2: '+2', wild: '✦', wild4: '+4' };
const avatars = ['#d7f86b', '#84b7ff', '#f898ad', '#ffcf72', '#72ddb8', '#c9a4ff'];
let mode = 'home', session = null, room = null, localGame = null, selfId = 'you';
let busy = false, pollTimer = null, cpuTimer = null, pollRunning = false, generation = 0;
let unoArmed = false, pendingWild = null, handIds = '', toastTimer = null, selectedMode = 'solo';
let lastConnectionError = '', setupBusy = false, soloPlayers = 4, currentScreen = 'home';
let handGesture = null, suppressHandClick = false;
const resumeButton = document.createElement('button');
resumeButton.type = 'button'; resumeButton.className = 'secondary-button resume-button'; resumeButton.hidden = true;
resumeButton.textContent = '前のルームへ再接続';
$('setupStatus').after(resumeButton);

function stored(key) { try { return localStorage.getItem(key); } catch { return null; } }
function save(key, value) { try { localStorage.setItem(key, value); } catch {} }
function remove(key) { try { localStorage.removeItem(key); } catch {} }
function nickname() { const name = $('nickname').value.trim().slice(0, 16) || 'ゲスト'; save(NAME_KEY, name); return name; }
function toast(message) { clearTimeout(toastTimer); $('toast').textContent = message; $('toast').hidden = false; toastTimer = setTimeout(() => { $('toast').hidden = true; }, 4000); }
function uuid() { return crypto.randomUUID ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(16)), x => x.toString(16).padStart(2, '0')).join(''); }
function showScreen(screen) { for (const id of ['home', 'lobby', 'game']) $(id + 'Screen').hidden = id !== screen; document.body.classList.toggle('in-game', screen === 'game'); if (screen !== currentScreen) { currentScreen = screen; window.scrollTo(0, 0); } }
function stopTimers() { clearTimeout(pollTimer); clearTimeout(cpuTimer); pollTimer = cpuTimer = null; }
function setSetupBusy(value, text) { setupBusy = value; for (const id of ['soloStart', 'createRoom', 'joinRoom']) $(id).disabled = value; resumeButton.disabled = value; if (typeof text === 'string') $('setupStatus').textContent = text; }
function setSetupMode(next) { selectedMode = next; for (const button of document.querySelectorAll('[data-mode]')) { const active = button.dataset.mode === next; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); } $('soloSetup').hidden = next !== 'solo'; $('onlineSetup').hidden = next !== 'online'; }
function setRoomMode(next) { for (const button of document.querySelectorAll('[data-room-mode]')) { const active = button.dataset.roomMode === next; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); } $('createSetup').hidden = next !== 'create'; $('joinSetup').hidden = next !== 'join'; }
function resetHand() { handIds = ''; $('hand').replaceChildren(); }
function closeWild() { pendingWild = null; if ($('colorDialog').open) $('colorDialog').close(); }
function clearOnline() { session = null; room = null; remove(SESSION_KEY); resumeButton.hidden = true; }
function goHome() { generation++; stopTimers(); closeWild(); if ($('leaveDialog').open) $('leaveDialog').close(); mode = 'home'; room = null; localGame = null; busy = false; unoArmed = false; resetHand(); showScreen('home'); connectionRestored(); setSetupBusy(false, ''); }

async function api(path, payload, auth = session) {
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const headers = {};
    if (auth && auth.token) headers.Authorization = 'Bearer ' + auth.token;
    if (payload !== undefined) headers['Content-Type'] = 'application/json';
    const response = await fetch(API + path, { method: payload === undefined ? 'GET' : 'POST', headers, body: payload === undefined ? undefined : JSON.stringify(payload), signal: controller.signal, credentials: 'omit', cache: 'no-store' });
    let body;
    try { body = await response.json(); } catch { throw new Error('サーバーから正しい応答が届きませんでした。'); }
    if (!response.ok) { const error = new Error(body.error || '接続できませんでした。'); error.status = response.status; error.body = body; throw error; }
    return body;
  } catch (error) { if (error.name === 'AbortError') throw new Error('接続に時間がかかっています。通信状況を確認して再接続してください。'); throw error; }
  finally { clearTimeout(timeout); }
}

function connectionError(error) {
  lastConnectionError = error.message || '接続が切れました。';
  $('connectionText').textContent = '同期を確認できません。' + lastConnectionError;
  $('connectionBanner').hidden = false;
  $('retryLobby').hidden = false;
  if (mode === 'online' && room && room.status === 'lobby') $('lobbyStatus').textContent = '再接続中… ' + lastConnectionError;
  renderControls();
}
function connectionRestored() { lastConnectionError = ''; $('connectionBanner').hidden = true; $('retryLobby').hidden = true; }
function acceptView(view, expectedGeneration = generation) {
  if (!view || expectedGeneration !== generation || mode !== 'online' || !session || view.roomId !== session.roomId) return;
  if (room && view.version < room.version) return;
  const turnChanged = room && room.game && view.game && room.game.currentPlayerId !== view.game.currentPlayerId;
  room = view; selfId = view.selfId || session.playerId;
  if (turnChanged || !view.game || view.game.currentPlayerId !== selfId) unoArmed = false;
  connectionRestored(); render();
}
function schedulePoll(delay) {
  clearTimeout(pollTimer);
  if (mode !== 'online' || !session) return;
  const interval = room && room.status === 'lobby' ? 2500 : 1000;
  pollTimer = setTimeout(poll, delay === undefined ? (document.hidden ? 3500 : interval) : delay);
}
async function syncRoom() {
  if (!session || mode !== 'online' || pollRunning) return;
  const currentGeneration = generation, auth = session;
  pollRunning = true;
  try { const result = await api('/rooms/' + encodeURIComponent(auth.roomId), undefined, auth); acceptView(result.view, currentGeneration); }
  catch (error) {
    if (currentGeneration !== generation) return;
    if ([401, 404, 410].includes(error.status)) { clearOnline(); goHome(); setSetupMode('online'); setSetupBusy(false, '前のルームは終了しました。新しいルームを作るか、合言葉で参加してください。'); }
    else connectionError(error);
  } finally { pollRunning = false; }
}
async function poll() { if (busy || pollRunning) { schedulePoll(500); return; } await syncRoom(); schedulePoll(); }

async function openRoom(join) {
  if (setupBusy) return;
  const code = $('roomCodeInput').value.trim().toUpperCase();
  if (join && !/^[A-Z0-9]{8}$/.test(code)) { setSetupBusy(false, '8文字の合言葉を入力してください。'); $('roomCodeInput').focus(); return; }
  setSetupBusy(true, join ? 'ルームに参加しています…' : 'ルームを作っています…');
  const currentGeneration = ++generation;
  try {
    const result = await api(join ? '/rooms/' + encodeURIComponent(code) + '/join' : '/rooms', join ? { nickname: nickname() } : { nickname: nickname(), maxPlayers: Number($('roomCapacity').value) }, null);
    if (currentGeneration !== generation) return;
    stopTimers(); mode = 'online'; localGame = null; room = null; resetHand(); unoArmed = false;
    session = { roomId: result.roomId, playerId: result.playerId, token: result.token };
    save(SESSION_KEY, JSON.stringify(session)); resumeButton.hidden = true;
    acceptView(result.view, currentGeneration); schedulePoll();
    if (!result.view) await syncRoom();
  } catch (error) { if (currentGeneration === generation) setSetupBusy(false, error.message); }
  finally { if (currentGeneration === generation) setSetupBusy(false); }
}
async function resumeRoom() {
  if (!session || setupBusy) return;
  setSetupBusy(true, '前のルームへ再接続しています…');
  const currentGeneration = ++generation, auth = session;
  try {
    const result = await api('/rooms/' + encodeURIComponent(auth.roomId), undefined, auth);
    if (currentGeneration !== generation) return;
    stopTimers(); mode = 'online'; room = null; resetHand(); selfId = session.playerId;
    acceptView(result.view, currentGeneration); resumeButton.hidden = true; schedulePoll();
  } catch (error) {
    if (currentGeneration !== generation) return;
    if ([401, 404, 410].includes(error.status)) { clearOnline(); setSetupBusy(false, '前のルームは終了しました。'); }
    else { setSetupBusy(false, error.message); resumeButton.hidden = false; }
  } finally { if (currentGeneration === generation) { setupBusy = false; for (const id of ['soloStart', 'createRoom', 'joinRoom']) $(id).disabled = false; resumeButton.disabled = false; } }
}

function startSolo() {
  generation++; stopTimers(); closeWild(); mode = 'solo'; localGame = null; room = null; busy = false; unoArmed = false; selfId = 'you';
  connectionRestored();
  soloPlayers = Number($('soloCount').value); const players = [{ id: selfId, name: nickname() }];
  for (let i = 1; i < soloPlayers; i++) players.push({ id: 'cpu-' + i, name: ['CPU アオ', 'CPU モモ', 'CPU キイ', 'CPU ミドリ', 'CPU スミレ'][i - 1] });
  localGame = createGame(players); resetHand(); render(); scheduleCpu();
}
function viewGame() { return mode === 'solo' ? (localGame ? publicView(localGame, selfId) : null) : room && room.game; }
function onlinePlayers() { return room && Array.isArray(room.players) ? room.players : []; }
function isOurTurn(game = viewGame()) { return Boolean(game && game.phase === 'playing' && game.currentPlayerId === selfId); }
function isHost() { return Boolean(room && room.hostId === selfId); }
function playerName(id, game = viewGame()) { const person = game && game.players.find(player => player.id === id); return person ? person.name : 'プレイヤー'; }
function scheduleCpu() {
  clearTimeout(cpuTimer);
  if (mode !== 'solo' || !localGame || localGame.phase !== 'playing') return;
  const game = publicView(localGame, selfId);
  if (game.currentPlayerId === selfId) return;
  const currentGeneration = generation;
  cpuTimer = setTimeout(() => {
    if (currentGeneration !== generation || mode !== 'solo') return;
    try { const action = chooseCpuAction(localGame, game.currentPlayerId); localGame = applyAction(localGame, game.currentPlayerId, action); render(); scheduleCpu(); }
    catch (error) { toast('CPUの操作を続けられませんでした。はじめから再戦できます。'); console.error(error); }
  }, 650 + Math.random() * 450);
}
async function perform(action) {
  if (busy) return;
  const currentGeneration = generation;
  if (mode === 'solo') {
    try { localGame = applyAction(localGame, selfId, action); unoArmed = false; render(); scheduleCpu(); }
    catch (error) { toast(error.message); }
    return;
  }
  if (mode !== 'online' || !session || !room) return;
  busy = true; renderControls();
  try {
    const result = await api('/rooms/' + encodeURIComponent(session.roomId) + '/actions', { actionId: uuid(), version: room.version, action });
    if (currentGeneration !== generation) return;
    unoArmed = false; acceptView(result.view, currentGeneration);
  } catch (error) {
    if (currentGeneration !== generation) return;
    if (error.body && error.body.view) acceptView(error.body.view, currentGeneration);
    if (error.status === 409) toast('テーブルが更新されました。最新の状態で操作してください。');
    else if (error.status && error.status < 500) toast(error.message);
    else { connectionError(error); await syncRoom(); }
  } finally { if (currentGeneration === generation) { busy = false; renderControls(); schedulePoll(); } }
}

function cardLabel(card) { return (card.color ? colorNames[card.color] + 'の' : '') + (valueNames[card.value] || card.value); }
function makeCard(card, interactive = false) {
  const cardNode = document.createElement(interactive ? 'button' : 'div');
  cardNode.className = 'playing-card ' + (card.color || 'wild') + (valueNames[card.value] ? ' action-card' : '');
  if (interactive) { cardNode.type = 'button'; cardNode.dataset.cardId = card.id; cardNode.setAttribute('aria-label', cardLabel(card)); cardNode.addEventListener('click', () => selectCard(card.id)); }
  else { cardNode.setAttribute('role', 'img'); cardNode.setAttribute('aria-label', cardLabel(card)); }
  const symbol = valueSymbols[card.value] || card.value;
  for (const className of ['card-corner', 'card-main', 'card-corner bottom']) { const text = document.createElement(className === 'card-main' ? 'b' : 'span'); text.className = className; text.textContent = symbol; text.setAttribute('aria-hidden', 'true'); cardNode.append(text); }
  const name = document.createElement('span'); name.className = 'card-name'; name.textContent = card.color ? colorNames[card.color] : 'WILD'; name.setAttribute('aria-hidden', 'true'); cardNode.append(name);
  if (card.color) { const marker = document.createElement('span'); marker.className = 'card-symbol'; marker.textContent = colorSymbols[card.color]; marker.setAttribute('aria-hidden', 'true'); cardNode.append(marker); }
  return cardNode;
}
function selectCard(id) {
  const game = viewGame();
  if (!game || busy || !isOurTurn(game) || !game.legalCardIds.includes(id)) return;
  const card = game.hand.find(item => item.id === id); if (!card) return;
  if (!card.color) { pendingWild = { cardId: id, generation }; $('colorDialog').showModal(); }
  else perform({ type: 'play', cardId: id, uno: unoArmed });
}
function toggleUno() {
  const game = viewGame(); if (!game || !isOurTurn(game) || busy || game.hand.length !== 2) return;
  unoArmed = !unoArmed; renderControls(); if (unoArmed) toast('UNO宣言！ カードを出すと残り1枚を宣言します。');
}
function renderLobby() {
  showScreen('lobby'); $('lobbyRoomCode').textContent = room.roomId;
  const roster = $('lobbyRoster'); roster.replaceChildren();
  for (let i = 0; i < room.maxPlayers; i++) {
    const player = onlinePlayers()[i], row = document.createElement('div'); row.className = 'lobby-person';
    if (!player) { row.classList.add('empty'); row.textContent = '＋ 参加を待っています'; }
    else { const avatar = document.createElement('span'); avatar.className = 'avatar'; avatar.style.setProperty('--avatar', avatars[i]); avatar.textContent = String(player.name || 'G').slice(0, 1); const name = document.createElement('strong'); name.textContent = player.name + (player.id === selfId ? '（あなた）' : ''); const badge = document.createElement('small'); badge.textContent = player.id === room.hostId ? 'HOST' : player.connected === false ? '再接続待ち' : 'READY'; row.append(avatar, name, badge); }
    roster.append(row);
  }
  $('lobbyStatus').textContent = lastConnectionError ? '再接続中… ' + lastConnectionError : onlinePlayers().length + ' / ' + room.maxPlayers + ' 人が参加中';
  $('startOnline').hidden = !isHost(); $('startOnline').disabled = busy || onlinePlayers().length < 2 || Boolean(lastConnectionError);
  $('lobbyStartNote').textContent = isHost() ? (onlinePlayers().length < 2 ? '2人以上集まったら始められます。' : '定員になる前でも始められます。') : 'ホストがゲームを始めるのを待っています。';
}
function renderOpponents(game) {
  const node = $('opponents'); node.replaceChildren();
  game.players.forEach((player, index) => {
    const online = onlinePlayers().find(item => item.id === player.id), row = document.createElement('div');
    row.className = 'opponent' + (player.id === game.currentPlayerId && game.phase === 'playing' ? ' active' : '') + (player.id === selfId ? ' self' : '') + (player.count === 1 ? ' uno' : '');
    const avatar = document.createElement('span'); avatar.className = 'avatar'; avatar.style.setProperty('--avatar', avatars[index]); avatar.textContent = String(player.name || '?').slice(0, 1);
    const info = document.createElement('div'); info.className = 'opponent-info'; const name = document.createElement('strong'); name.textContent = player.name + (player.id === selfId ? ' · あなた' : ''); const status = document.createElement('small'); status.textContent = online && online.cpu ? 'CPUが代打中' : mode === 'solo' && player.id !== selfId ? 'CPU' : online && online.connected === false ? '再接続待ち' : player.id === selfId ? 'YOU' : 'PLAYER'; info.append(name, status);
    const count = document.createElement('span'); count.className = 'card-amount'; count.textContent = player.count === 1 ? 'UNO!' : String(player.count); count.setAttribute('aria-label', '手札 ' + player.count + '枚'); row.append(avatar, info, count); node.append(row);
  });
}
function renderHand(game) {
  const ids = game.hand.map(card => card.id).join('|');
  if (ids !== handIds) {
    const hand = $('hand'), previousScroll = hand.scrollLeft;
    const focused = document.activeElement && document.activeElement.dataset.cardId;
    hand.replaceChildren(...game.hand.map(card => makeCard(card, true))); handIds = ids;
    hand.scrollLeft = previousScroll;
    if (focused) { const next = [...hand.children].find(card => card.dataset.cardId === focused); if (next) next.focus({ preventScroll: true }); }
  }
  $('selfName').textContent = playerName(selfId, game); $('handCount').textContent = game.hand.length + '枚';
  updateHandNav();
  renderControls();
}
function handStep() { const first = $('hand').firstElementChild; return first ? first.getBoundingClientRect().width + (parseFloat(getComputedStyle($('hand')).gap) || 6) : 70; }
function updateHandNav() { const hand = $('hand'), max = Math.max(0, hand.scrollWidth - hand.clientWidth); $('previousHand').disabled = hand.scrollLeft < 2; $('nextHand').disabled = hand.scrollLeft >= max - 2; }
function moveHand(direction) { const hand = $('hand'), step = handStep(), amount = Math.max(step, Math.floor(hand.clientWidth * .7 / step) * step); hand.scrollLeft = Math.max(0, Math.min(hand.scrollWidth - hand.clientWidth, hand.scrollLeft + direction * amount)); updateHandNav(); }
function renderControls() {
  if (room && room.status === 'lobby') $('startOnline').disabled = busy || onlinePlayers().length < 2 || Boolean(lastConnectionError);
  const game = viewGame(); if (!game) return;
  const ownTurn = isOurTurn(game), canAct = ownTurn && !busy && !lastConnectionError;
  for (const card of $('hand').children) { const legal = game.legalCardIds.includes(card.dataset.cardId); card.disabled = !canAct || !legal; card.classList.toggle('playable', ownTurn && legal); }
  $('drawButton').disabled = !canAct || !game.canDraw; $('drawPile').disabled = !canAct || !game.canDraw;
  $('passButton').hidden = !game.canPass || !ownTurn; $('passButton').disabled = !canAct || !game.canPass;
  $('unoButton').disabled = !canAct || game.hand.length !== 2; $('unoButton').setAttribute('aria-pressed', String(unoArmed));
  $('unoButton').querySelector('span').textContent = unoArmed ? '宣言スタンバイ' : '残り1枚を宣言';
  $('handHelp').textContent = game.phase === 'finished' ? 'おつかれさまでした！' : busy ? 'テーブルを更新中…' : !ownTurn ? '相手の番を待っています' : game.canPass ? '引いた1枚を出すか、パス' : game.legalCardIds.length ? '光るカードを選択' : '山札から1枚引こう';
  $('rematchButton').hidden = mode === 'online' && !isHost(); $('rematchButton').disabled = busy || Boolean(lastConnectionError);
}
function renderGame(game) {
  showScreen('game'); $('sessionLabel').textContent = mode === 'solo' ? 'SOLO / VS CPU' : 'ONLINE / PRIVATE TABLE'; $('gameRoomCode').textContent = mode === 'online' && room ? room.roomId : '';
  renderOpponents(game);
  const ownTurn = isOurTurn(game); $('turnBanner').classList.toggle('your-turn', ownTurn);
  $('turnText').textContent = game.phase === 'finished' ? 'ゲーム終了' : ownTurn ? 'あなたの番。次の1枚を選ぼう。' : playerName(game.currentPlayerId, game) + ' の番';
  $('direction').textContent = game.direction === 1 ? '↻' : '↺'; $('direction').setAttribute('aria-label', game.direction === 1 ? '時計回り' : '反時計回り');
  if (game.topCard) $('discardCard').replaceChildren(makeCard(game.topCard));
  $('currentColor').replaceChildren(); const dot = document.createElement('span'); dot.className = 'color-dot'; dot.style.setProperty('--card-color', 'var(--' + game.color + ')'); const colorText = document.createElement('span'); colorText.textContent = (colorSymbols[game.color] || '') + ' ' + (colorNames[game.color] || '') + ' の番'; $('currentColor').append(dot, colorText);
  $('deckCount').textContent = game.deckCount;
  const latest = game.log && game.log[game.log.length - 1]; $('gameLog').textContent = latest ? (typeof latest === 'string' ? latest : latest.text) : '同じ色・数字・記号をつなげよう。';
  $('resultPanel').hidden = game.phase !== 'finished';
  if (game.phase === 'finished') { $('winnerText').textContent = game.winnerId === selfId ? 'あなたの勝ち！' : playerName(game.winnerId, game) + ' の勝ち！'; $('rematchNote').textContent = mode === 'online' && !isHost() ? 'ホストが再戦を始めるのを待っています。' : '同じメンバーでもう一勝負。'; }
  if (pendingWild && (!ownTurn || game.phase !== 'playing' || !game.legalCardIds.includes(pendingWild.cardId))) closeWild();
  renderHand(game);
}
function render() { if (mode === 'solo' && localGame) renderGame(publicView(localGame, selfId)); else if (mode === 'online' && room) { if (room.status === 'lobby') renderLobby(); else if (room.game) renderGame(room.game); } }

function requestLeave() { $('leaveExplanation').textContent = mode === 'online' ? '対戦中に退出すると、あなたの席はCPUが引き継ぎます。待機中ならルームから退出します。' : '現在のCPU対戦を終了して、スタート画面へ戻ります。'; $('leaveDialog').showModal(); }
async function leave() {
  if (busy) return;
  if (mode !== 'online') { goHome(); return; }
  if (!session || !room) return;
  const auth = session, currentGeneration = generation;
  const payload = { actionId: uuid(), version: room.version, action: { type: 'leave' } };
  busy = true; renderControls(); $('confirmLeave').disabled = $('stayButton').disabled = $('cancelLeave').disabled = true;
  $('confirmLeave').textContent = '退出を通知中…'; $('leaveExplanation').textContent = 'ルームへ退出を通知しています。この端末の参加情報は、完了するまで保持されます。';
  try {
    try { await api('/rooms/' + encodeURIComponent(auth.roomId) + '/actions', payload, auth); }
    catch (error) {
      if (error.status !== 409 || !error.body || !error.body.view) throw error;
      acceptView(error.body.view, currentGeneration); payload.version = error.body.view.version;
      await api('/rooms/' + encodeURIComponent(auth.roomId) + '/actions', payload, auth);
    }
    if (currentGeneration !== generation) return;
    clearOnline(); goHome();
  } catch (error) {
    if (currentGeneration !== generation) return;
    if ([401, 404, 410].includes(error.status)) { clearOnline(); goHome(); setSetupBusy(false, 'ルームへの参加は終了しています。'); }
    else {
      if (error.body && error.body.view) acceptView(error.body.view, currentGeneration);
      if (!error.status || error.status >= 500) connectionError(error);
      $('leaveExplanation').textContent = '退出を通知できませんでした。参加情報は保持しています。通信を確認してもう一度退出するか、対戦に戻ってください。';
      toast(error.message || '退出の通知を送れませんでした。');
    }
  } finally {
    busy = false; $('confirmLeave').disabled = $('stayButton').disabled = $('cancelLeave').disabled = false; $('confirmLeave').textContent = '退出する'; renderControls(); schedulePoll();
  }
}

for (const button of document.querySelectorAll('[data-mode]')) button.addEventListener('click', () => { if (!setupBusy) { setSetupMode(button.dataset.mode); $('setupStatus').textContent = ''; } });
for (const button of document.querySelectorAll('[data-room-mode]')) button.addEventListener('click', () => { if (!setupBusy) setRoomMode(button.dataset.roomMode); });
$('soloStart').addEventListener('click', startSolo); $('createRoom').addEventListener('click', () => openRoom(false)); $('joinRoom').addEventListener('click', () => openRoom(true)); resumeButton.addEventListener('click', resumeRoom);
$('roomCodeInput').addEventListener('input', () => { $('roomCodeInput').value = $('roomCodeInput').value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
$('roomCodeInput').addEventListener('keydown', event => { if (event.key === 'Enter') openRoom(true); });
$('startOnline').addEventListener('click', () => perform({ type: 'start' }));
$('copyInvite').addEventListener('click', async () => {
  if (!room) return;
  const url = new URL('./index.html', location.href); url.searchParams.set('room', room.roomId);
  try { await navigator.clipboard.writeText(url.href); toast('招待リンクをコピーしました。友だちに送ってください。'); }
  catch { toast('合言葉：' + room.roomId + '\nこの8文字を友だちに伝えてください。'); }
});
for (const id of ['drawPile', 'drawButton']) $(id).addEventListener('click', () => perform({ type: 'draw' }));
$('passButton').addEventListener('click', () => perform({ type: 'pass' })); $('unoButton').addEventListener('click', toggleUno);
$('previousHand').addEventListener('click', () => moveHand(-1)); $('nextHand').addEventListener('click', () => moveHand(1));
$('hand').addEventListener('scroll', updateHandNav, { passive: true }); window.addEventListener('resize', updateHandNav);
$('hand').addEventListener('touchstart', event => {
  suppressHandClick = false;
  if (event.touches.length !== 1) { handGesture = null; return; }
  const touch = event.touches[0]; handGesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY, left: $('hand').scrollLeft, axis: null, moved: false };
}, { passive: true });
$('hand').addEventListener('touchmove', event => {
  if (!handGesture || event.touches.length !== 1) { handGesture = null; return; }
  const touch = Array.from(event.changedTouches).find(item => item.identifier === handGesture.id); if (!touch) return;
  const dx = touch.clientX - handGesture.x, dy = touch.clientY - handGesture.y;
  if (Math.hypot(dx, dy) > 10) { handGesture.moved = true; if (!handGesture.axis) handGesture.axis = Math.abs(dx) > Math.abs(dy) * 1.1 ? 'x' : 'y'; }
  if (handGesture.axis === 'x') { if (event.cancelable) event.preventDefault(); $('hand').scrollLeft = handGesture.left - dx; updateHandNav(); }
}, { passive: false });
$('hand').addEventListener('touchend', event => {
  const gesture = handGesture; handGesture = null;
  if (!gesture) return;
  const touch = Array.from(event.changedTouches).find(item => item.identifier === gesture.id);
  const dx = touch ? touch.clientX - gesture.x : 0, dy = touch ? touch.clientY - gesture.y : 0;
  if (Math.hypot(dx, dy) > 10) { gesture.moved = true; if (!gesture.axis) gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.1 ? 'x' : 'y'; }
  if (!gesture.moved) return;
  suppressHandClick = true; if (event.cancelable) event.preventDefault();
  if (gesture.axis === 'x') {
    const hand = $('hand'), step = handStep();
    hand.scrollLeft = gesture.left - dx;
    let next = Math.round(hand.scrollLeft / step) * step;
    if (Math.abs(dx) > 16 && Math.abs(next - gesture.left) < step / 2) next = gesture.left - Math.sign(dx) * step;
    hand.scrollLeft = Math.max(0, Math.min(hand.scrollWidth - hand.clientWidth, next)); updateHandNav();
  }
}, { passive: false });
$('hand').addEventListener('touchcancel', () => { if (handGesture && handGesture.moved) suppressHandClick = true; handGesture = null; }, { passive: true });
$('hand').addEventListener('click', event => { if (suppressHandClick && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressHandClick = false; } }, true);
for (const button of document.querySelectorAll('[data-color]')) button.addEventListener('click', () => { const pending = pendingWild; closeWild(); if (pending && pending.generation === generation) perform({ type: 'play', cardId: pending.cardId, color: button.dataset.color, uno: unoArmed }); });
$('cancelColor').addEventListener('click', closeWild); $('colorDialog').addEventListener('cancel', () => { pendingWild = null; });
$('rulesButton').addEventListener('click', () => $('rulesDialog').showModal()); $('closeRules').addEventListener('click', () => $('rulesDialog').close());
for (const id of ['leaveGame', 'leaveLobby']) $(id).addEventListener('click', requestLeave);
for (const id of ['stayButton', 'cancelLeave']) $(id).addEventListener('click', () => $('leaveDialog').close()); $('confirmLeave').addEventListener('click', leave);
$('leaveDialog').addEventListener('cancel', event => { if (busy) event.preventDefault(); });
$('retryConnection').addEventListener('click', async () => { $('retryConnection').disabled = true; await syncRoom(); $('retryConnection').disabled = false; schedulePoll(); });
$('retryLobby').addEventListener('click', async () => { $('retryLobby').disabled = true; await syncRoom(); $('retryLobby').disabled = false; schedulePoll(); });
$('rematchButton').addEventListener('click', () => { if (mode === 'solo') startSolo(); else perform({ type: 'rematch' }); });
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || document.querySelector('dialog[open]') || event.target.closest('input,select,textarea')) return;
  if (mode !== 'solo' && mode !== 'online') return;
  const game = viewGame(); if (!game || game.phase !== 'playing') return;
  const key = event.key.toLowerCase();
  if (key === 'd' && !$('drawButton').disabled) { event.preventDefault(); perform({ type: 'draw' }); }
  else if (key === 'p' && !$('passButton').disabled && !$('passButton').hidden) { event.preventDefault(); perform({ type: 'pass' }); }
  else if (key === 'u') { event.preventDefault(); toggleUno(); }
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    const cards = [...$('hand').querySelectorAll('button:not(:disabled)')]; if (!cards.length) return;
    event.preventDefault(); const current = cards.indexOf(document.activeElement), step = event.key === 'ArrowLeft' ? -1 : 1;
    const next = cards[(current < 0 ? (step === 1 ? 0 : cards.length - 1) : (current + step + cards.length) % cards.length)]; next.focus({ preventScroll: true }); next.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
  }
});
document.addEventListener('visibilitychange', () => { if (!document.hidden && mode === 'online') { clearTimeout(pollTimer); syncRoom().finally(() => schedulePoll()); } });
window.addEventListener('pageshow', () => { if (mode === 'online') syncRoom().finally(() => schedulePoll()); });
window.addEventListener('online', () => { if (mode === 'online') syncRoom().finally(() => schedulePoll()); });

$('nickname').value = stored(NAME_KEY) || '';
try { const saved = JSON.parse(stored(SESSION_KEY)); if (saved && /^[A-Z0-9]{8}$/.test(saved.roomId) && typeof saved.token === 'string' && typeof saved.playerId === 'string') session = saved; } catch {}
const invite = new URL(location.href).searchParams.get('room');
if (invite) { setSetupMode('online'); setRoomMode('join'); $('roomCodeInput').value = invite.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8); }
showScreen('home');
if (session && (!invite || session.roomId === invite.toUpperCase())) resumeRoom();
else if (session) resumeButton.hidden = false;
