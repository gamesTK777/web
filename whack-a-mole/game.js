(() => {
  'use strict';

  const HOLES = 9;
  const config = {
    easy:   { spawn: [1.10, 1.45], life: [1.20, 1.65], max: 1, step: 250 },
    normal: { spawn: [.78, 1.08], life: [.92, 1.28], max: 2, step: 220 },
    hard:   { spawn: [.52, .76], life: [.67, .98], max: 3, step: 190 },
  };
  const modes = [
    { value: 'whack-a-mole:easy', label: 'EASY' },
    { value: 'whack-a-mole:normal', label: 'NORMAL' },
    { value: 'whack-a-mole:hard', label: 'HARD' },
  ];
  const names = ['左上', '上', '右上', '左', '中央', '右', '左下', '下', '右下'];
  const typeNames = { normal: 'モグラ', gold: '金のモグラ', clock: '時計モグラ', hazard: 'お邪魔キャラ' };
  const badges = { normal: '', gold: '★', clock: '◷', hazard: '!' };
  const $ = id => document.getElementById(id);
  const ui = {
    board: $('board'), effects: $('effects'), toast: $('toast'),
    score: $('scoreValue'), time: $('timeValue'), level: $('levelValue'), combo: $('comboValue'),
    status: $('statusText'), difficulty: $('difficultyText'), energy: $('energyNumber'),
    energyBar: $('energyBar'), energyTrack: $('energyTrack'), feverStatus: $('feverStatus'),
    power: $('powerStatus'), best: $('bestValue'),
    menu: $('menuOverlay'), pause: $('pauseOverlay'), result: $('resultOverlay'),
    resultTitle: $('resultTitle'), resultScore: $('finalScore'), resultCopy: $('resultCopy'),
    start: $('startBtn'), retry: $('retryBtn'), resume: $('resumeBtn'), resultMenu: $('resultMenuBtn'),
    fever: $('feverBtn'), pauseBtn: $('pauseBtn'), restart: $('restartBtn'),
    rank: $('rankBtn'), resultRank: $('resultRankBtn'), sound: $('soundBtn'),
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const rand = (min, max) => min + Math.random() * (max - min);
  const rankMode = () => 'whack-a-mole:' + difficulty;
  const rankOpen = () => Boolean(window.TKLeaderboard?.isOpen?.());
  let state = 'menu', difficulty = 'easy', score = 0, timeLeft = 60, level = 1;
  let combo = 0, bestCombo = 0, energy = 0, misses = 0, elapsed = 0, feverUntil = 0, spawnIn = .55;
  let moles = Array(HOLES).fill(null), hitUntil = Array(HOLES).fill(0), holes = [];
  let selected = 4, frameTime = 0, uiTick = 0, runId = 0;
  let session = null, startedAt = 0, lastResult = null, toastTimer = null;
  let soundOn = false, audio = null;

  function setBodyState(next) {
    document.body.classList.remove('state-menu', 'state-active', 'state-paused', 'state-over');
    document.body.classList.add('state-' + next);
  }
  function readBest() {
    try { return Number(localStorage.getItem('tk777-whack-best-' + difficulty)) || 0; }
    catch { return 0; }
  }
  function writeBest(value) {
    try { localStorage.setItem('tk777-whack-best-' + difficulty, String(value)); } catch {}
  }
  function sound(frequency, duration, type = 'sine', volume = .025) {
    if (!soundOn) return;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      if (!audio) audio = new Audio();
      if (audio.state === 'suspended') audio.resume();
      const oscillator = audio.createOscillator(), gain = audio.createGain(), now = audio.currentTime;
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * .68), now + duration);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + .01);
    } catch {}
  }
  function toast(message, duration = 1250) {
    ui.toast.textContent = message;
    ui.toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => ui.toast.classList.remove('show'), duration);
  }
  function pop(index, message, color) {
    if (reduced.matches) return;
    const hole = holes[index], rect = hole.getBoundingClientRect(), parent = ui.effects.getBoundingClientRect();
    const node = document.createElement('span');
    node.className = 'score-pop';
    node.textContent = message;
    node.style.left = rect.left - parent.left + rect.width / 2 + 'px';
    node.style.top = rect.top - parent.top + rect.height / 2 + 'px';
    node.style.color = color;
    ui.effects.append(node);
    setTimeout(() => node.remove(), 800);
  }
  function describe(index) {
    const mole = moles[index];
    holes[index].setAttribute('aria-label', `${names[index]}の穴。${mole ? typeNames[mole.type] : '空'}。${index + 1}キーで叩く`);
  }
  function buildBoard() {
    ui.board.replaceChildren();
    holes = Array.from({ length: HOLES }, (_, index) => {
      const hole = document.createElement('button');
      hole.type = 'button';
      hole.className = 'hole';
      hole.innerHTML = `<span class="hole-number" aria-hidden="true">${index + 1}</span><span class="mole" aria-hidden="true"><span class="mole-ear left"></span><span class="mole-ear right"></span><span class="mole-badge"></span></span>`;
      hole.addEventListener('click', () => whack(index));
      ui.board.append(hole);
      return hole;
    });
    holes.forEach((_, index) => describe(index));
    chooseHole(selected, false);
  }
  function chooseHole(index, focus) {
    selected = clamp(index, 0, HOLES - 1);
    holes.forEach((hole, i) => hole.classList.toggle('selected', i === selected));
    if (focus) holes[selected].focus({ preventScroll: true });
  }
  function clearMole(index, hit = false) {
    moles[index] = null;
    holes[index].classList.remove('active', 'normal', 'gold', 'clock', 'hazard');
    if (hit) {
      holes[index].classList.add('hit');
      hitUntil[index] = elapsed + .17;
    }
    describe(index);
  }
  function showMole(index, type) {
    moles[index] = { type, remaining: rand(...config[difficulty].life) * Math.max(.73, 1 - (level - 1) * .027) };
    holes[index].classList.remove('hit');
    holes[index].classList.add('active', type);
    holes[index].querySelector('.mole-badge').textContent = badges[type];
    describe(index);
  }
  function spawn(type = null, extra = false) {
    if (state !== 'playing') return false;
    const cap = config[difficulty].max + (elapsed < feverUntil ? 1 : 0);
    if (!extra && moles.filter(Boolean).length >= cap) return false;
    const available = holes.map((_, index) => index).filter(index => !moles[index] && !hitUntil[index]);
    if (!available.length) return false;
    const index = available[Math.floor(Math.random() * available.length)];
    if (!type) {
      const roll = Math.random();
      type = roll < .055 ? 'hazard' : roll < .125 ? 'clock' : roll < (elapsed < feverUntil ? .43 : .28) ? 'gold' : 'normal';
    }
    showMole(index, type);
    return true;
  }
  function nextSpawnDelay() {
    const speed = Math.max(.68, 1 - (level - 1) * .04);
    return rand(...config[difficulty].spawn) * speed * (elapsed < feverUntil ? .82 : 1);
  }
  function sync() {
    const boardEnabled = state === 'playing';
    ui.board.inert = !boardEnabled;
    holes.forEach(hole => { hole.tabIndex = boardEnabled ? 0 : -1; });
    ui.score.textContent = String(score).padStart(6, '0');
    ui.time.innerHTML = Math.ceil(timeLeft) + '<sup>s</sup>';
    ui.level.textContent = String(level).padStart(2, '0');
    ui.combo.textContent = '×' + Math.min(5, 1 + Math.floor((Math.max(combo, 1) - 1) / 4));
    ui.energy.textContent = energy + ' / 100';
    ui.energyBar.style.width = energy + '%';
    ui.energyTrack.setAttribute('aria-valuenow', String(energy));
    ui.best.textContent = readBest().toLocaleString('ja-JP') + ' PTS';
    const fever = elapsed < feverUntil;
    ui.fever.disabled = state !== 'playing' || energy < 100 || fever;
    ui.fever.classList.toggle('ready', state === 'playing' && energy >= 100 && !fever);
    ui.fever.classList.toggle('active', fever);
    ui.feverStatus.textContent = fever ? 'FEVER 発動中 · ' + Math.ceil(feverUntil - elapsed) + '秒' : energy >= 100 ? '発動できます！' : 'チャージ中';
    ui.pauseBtn.disabled = !['playing', 'paused'].includes(state);
    ui.pauseBtn.querySelector('span:last-child').textContent = state === 'paused' ? '再開' : '一時停止';
    ui.restart.disabled = !['playing', 'paused'].includes(state);
    document.querySelectorAll('.difficulty').forEach(button => button.disabled = state !== 'menu');
    ui.difficulty.textContent = difficulty.toUpperCase() + ' MODE';
  }
  function selectDifficulty(next) {
    if (state !== 'menu' || !config[next]) return;
    difficulty = next;
    document.querySelectorAll('.difficulty').forEach(button => {
      const active = button.dataset.difficulty === next;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    sync();
  }
  function start() {
    runId++;
    clearTimeout(toastTimer);
    ui.effects.replaceChildren();
    score = 0; timeLeft = 60; level = 1; combo = 0; bestCombo = 0; energy = 0; misses = 0;
    elapsed = 0; feverUntil = 0; spawnIn = .55; uiTick = 0;
    moles = Array(HOLES).fill(null); hitUntil = Array(HOLES).fill(0);
    holes.forEach((hole, index) => { hole.className = 'hole'; describe(index); });
    chooseHole(4, false);
    lastResult = null;
    startedAt = Date.now();
    session = window.TKLeaderboard ? window.TKLeaderboard.start(rankMode()) : Promise.resolve(null);
    state = 'playing'; setBodyState('active');
    ui.menu.hidden = true; ui.pause.hidden = true; ui.result.hidden = true;
    ui.status.textContent = 'GARDEN LIVE · モグラを叩こう';
    ui.power.textContent = '金のモグラと時計を見逃さないで！';
    sync(); toast('READY? GO!', 900); sound(620, .12);
    holes[selected].focus({ preventScroll: true });
    frameTime = performance.now();
    const current = runId;
    requestAnimationFrame(() => {
      if (current !== runId || state !== 'playing') return;
      if (matchMedia('(max-width: 620px)').matches) {
        const top = ui.board.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, Math.max(0, top - 72));
      } else if (innerHeight < 860) window.scrollTo(0, 0);
    });
  }
  function pause() {
    if (state !== 'playing') return;
    state = 'paused'; setBodyState('paused');
    ui.pause.hidden = false;
    ui.status.textContent = 'PAUSED';
    sync();
    ui.resume.focus({ preventScroll: true });
  }
  function resume() {
    if (state !== 'paused') return;
    state = 'playing'; setBodyState('active');
    ui.pause.hidden = true;
    ui.status.textContent = 'GARDEN LIVE · モグラを叩こう';
    frameTime = performance.now();
    sync();
    holes[selected].focus({ preventScroll: true });
  }
  function showMenu() {
    runId++;
    state = 'menu'; setBodyState('menu');
    moles.forEach((mole, index) => { if (mole) clearMole(index); });
    ui.menu.hidden = false; ui.pause.hidden = true; ui.result.hidden = true;
    ui.status.textContent = 'READY TO PLAY';
    ui.power.textContent = '9つの穴をよく見て叩こう。';
    sync();
    ui.start.focus({ preventScroll: true });
    if (matchMedia('(max-width: 620px)').matches) window.scrollTo(0, 0);
  }
  function feverBurst() {
    if (state !== 'playing' || energy < 100 || elapsed < feverUntil) return;
    energy = 0; feverUntil = elapsed + 8;
    spawn('gold', true);
    toast('✦ FEVER BURST! 8秒間スコア2倍', 2200);
    ui.power.textContent = 'FEVER中！金のモグラを狙おう。';
    sound(780, .25, 'sawtooth', .027); sync();
  }
  function whack(index) {
    if (state !== 'playing' || rankOpen()) return;
    chooseHole(index, false);
    const mole = moles[index];
    if (!mole) {
      combo = 0; misses++;
      pop(index, 'MISS', '#e2e8b7');
      sound(160, .09, 'triangle', .018);
      sync(); return;
    }
    const type = mole.type;
    clearMole(index, true);
    if (type === 'hazard') {
      score = Math.max(0, score - 25);
      combo = 0; misses++;
      pop(index, '−25', '#ff928c');
      toast('TRAP! コンボが途切れた', 900);
      sound(145, .23, 'sawtooth', .03);
      sync(); return;
    }
    combo++;
    bestCombo = Math.max(bestCombo, combo);
    if (type === 'clock') timeLeft = Math.min(75, timeLeft + 3);
    const base = (type === 'gold' ? 30 : type === 'clock' ? 8 : 10) * level;
    const multiplier = Math.min(5, 1 + Math.floor((combo - 1) / 4));
    const points = base * multiplier * (elapsed < feverUntil ? 2 : 1);
    score += points;
    const energyWasFull = energy >= 100;
    energy = clamp(energy + (type === 'gold' ? 19 : type === 'clock' ? 10 : 12), 0, 100);
    level = Math.min(10, Math.max(1, 1 + Math.floor(score / config[difficulty].step)));
    pop(index, (type === 'clock' ? '+3s  ' : '') + '+' + points, type === 'gold' ? '#ffe292' : type === 'clock' ? '#96f6e6' : '#c3ffbc');
    if ([5, 10, 20].includes(combo)) toast('COMBO ×' + multiplier + '!', 1000);
    if (!energyWasFull && energy === 100 && elapsed >= feverUntil) toast('FEVER READY!', 1200);
    sound(type === 'gold' ? 880 : type === 'clock' ? 720 : 450 + Math.min(combo * 28, 380), .11);
    sync();
  }
  function finish() {
    if (state !== 'playing') return;
    state = 'over'; setBodyState('over');
    moles.forEach((mole, index) => { if (mole) clearMole(index); });
    timeLeft = 0;
    ui.status.textContent = 'RUN COMPLETE';
    const previous = readBest();
    if (score > previous) writeBest(score);
    ui.resultTitle.textContent = score >= 700 ? 'GARDEN LEGEND!' : score >= 350 ? 'AMAZING RUN!' : score >= 150 ? 'NICE RUN!' : 'ONE MORE ROUND?';
    ui.resultScore.textContent = score.toLocaleString('ja-JP') + ' PTS';
    ui.resultCopy.textContent = `LEVEL ${level} · 最大コンボ ${bestCombo} · 空振り ${misses}${score > previous ? ' · 自己ベスト更新！' : ''}`;
    ui.result.hidden = false;
    lastResult = {
      mode: rankMode(), label: 'モグラ叩き', score: Math.round(score),
      duration: Math.max(1000, Date.now() - startedAt), session, modeOptions: modes,
      note: '難易度ごとに得点順。登録するとニックネームと記録が公開されます。',
    };
    sound(260, .35, 'triangle'); sync();
    if (window.TKLeaderboard) window.TKLeaderboard.open(lastResult);
  }
  function showRanking() {
    if (!window.TKLeaderboard) return;
    if (state === 'playing') pause();
    if (state === 'over' && lastResult) window.TKLeaderboard.open(lastResult);
    else window.TKLeaderboard.show({
      mode: rankMode(), label: 'モグラ叩き', modeOptions: modes,
      note: '難易度ごとに得点順。登録するとニックネームと記録が公開されます。',
    });
  }
  function update(dt) {
    elapsed += dt;
    timeLeft -= dt;
    if (timeLeft <= 0) { finish(); return; }
    moles.forEach((mole, index) => {
      if (hitUntil[index] && elapsed >= hitUntil[index]) {
        hitUntil[index] = 0;
        holes[index].classList.remove('hit');
      }
      if (!mole) return;
      mole.remaining -= dt * (elapsed < feverUntil ? .62 : 1);
      if (mole.remaining <= 0) {
        clearMole(index);
        combo = 0;
      }
    });
    spawnIn -= dt;
    if (spawnIn <= 0) spawnIn = spawn() ? nextSpawnDelay() : .18;
    uiTick += dt;
    if (uiTick >= .08) { uiTick = 0; sync(); }
  }
  function loop(now) {
    requestAnimationFrame(loop);
    if (!frameTime) frameTime = now;
    const dt = clamp((now - frameTime) / 1000, 0, .05);
    frameTime = now;
    if (state === 'playing' && !rankOpen()) update(dt);
  }
  function keyDown(event) {
    if (rankOpen() || /^(INPUT|TEXTAREA|SELECT|A)$/.test(event.target?.tagName) || event.target?.isContentEditable) return;
    const code = event.code;
    if (code === 'KeyP' || code === 'Escape') {
      event.preventDefault();
      if (!event.repeat) state === 'playing' ? pause() : resume();
      return;
    }
    if (state !== 'playing') return;
    if (code === 'KeyF') { event.preventDefault(); if (!event.repeat) feverBurst(); return; }
    const match = /^(?:Digit|Numpad)([1-9])$/.exec(code);
    if (match) {
      event.preventDefault();
      if (!event.repeat) whack(Number(match[1]) - 1);
      return;
    }
    const direction = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 }[code];
    if (direction) {
      event.preventDefault();
      if (!event.repeat) {
        let row = Math.floor(selected / 3), col = selected % 3;
        if (direction === -1) col = Math.max(0, col - 1);
        else if (direction === 1) col = Math.min(2, col + 1);
        else if (direction === -3) row = Math.max(0, row - 1);
        else row = Math.min(2, row + 1);
        chooseHole(row * 3 + col, true);
      }
      return;
    }
    if ((code === 'Space' || code === 'Enter') && (event.target?.classList?.contains('hole') || event.target === document.body)) {
      event.preventDefault();
      if (!event.repeat) whack(selected);
    }
  }

  document.querySelectorAll('.difficulty').forEach(button => button.addEventListener('click', () => selectDifficulty(button.dataset.difficulty)));
  ui.start.addEventListener('click', start);
  ui.retry.addEventListener('click', start);
  ui.resume.addEventListener('click', resume);
  ui.resultMenu.addEventListener('click', showMenu);
  ui.fever.addEventListener('click', feverBurst);
  ui.pauseBtn.addEventListener('click', () => state === 'paused' ? resume() : pause());
  ui.restart.addEventListener('click', start);
  ui.rank.addEventListener('click', showRanking);
  ui.resultRank.addEventListener('click', showRanking);
  ui.sound.addEventListener('click', () => {
    soundOn = !soundOn;
    ui.sound.setAttribute('aria-pressed', String(soundOn));
    ui.sound.setAttribute('aria-label', soundOn ? 'サウンドをオフにする' : 'サウンドをオンにする');
    ui.sound.querySelector('span').textContent = soundOn ? 'ON' : 'OFF';
    if (soundOn) sound(740, .12);
  });
  document.addEventListener('keydown', keyDown, { passive: false });
  window.addEventListener('blur', () => { if (state === 'playing') pause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing') pause(); });

  buildBoard(); sync(); requestAnimationFrame(loop);
})();
