(function () {
  'use strict';

  const API = 'https://tk777-neonshift-scores.takesuke.chatgpt.site';
  let dialog, ui, current, selectedMode, loadVersion = 0;
  const savedSessions = new Set(), savedIds = new Set();

  async function request(path, payload) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(API + path, {
        method: payload ? 'POST' : 'GET',
        headers: payload ? { 'Content-Type': 'application/json' } : {},
        body: payload ? JSON.stringify(payload) : undefined,
        cache: 'no-store',
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'ランキングに接続できませんでした。');
      return result;
    } finally {
      clearTimeout(timeout);
    }
  }

  function ensureDialog() {
    if (dialog) return;
    const style = document.createElement('style');
    style.textContent = `
      #tk-ranking-dialog, #tk-ranking-dialog * { box-sizing: border-box; }
      #tk-ranking-dialog { width: min(620px, calc(100vw - 24px)); max-height: min(88dvh, 760px); border: 1px solid #53717d; border-radius: 18px; padding: 0; color: #f2f7ff; background: #101e2b; box-shadow: 0 24px 80px #000b; font: 15px/1.5 system-ui, sans-serif; overflow: auto; }
      #tk-ranking-dialog::backdrop { background: #030c17c9; }
      #tk-ranking-dialog .tk-rank-inner { padding: 22px; }
      #tk-ranking-dialog .tk-rank-head { display: flex; gap: 12px; align-items: start; justify-content: space-between; }
      #tk-ranking-dialog h2 { margin: 0; font: 800 clamp(21px, 5vw, 28px)/1.2 system-ui, sans-serif; color: #fff; }
      #tk-ranking-dialog .tk-rank-kicker { margin: 0 0 5px; color: #63e9cf; font-size: 11px; font-weight: 800; letter-spacing: .15em; }
      #tk-ranking-dialog .tk-rank-note, #tk-ranking-dialog .tk-rank-status { color: #b9cbd6; margin: 11px 0; }
      #tk-ranking-dialog .tk-rank-close, #tk-ranking-dialog .tk-rank-refresh { border: 1px solid #52707d; border-radius: 9px; background: #1d3444; color: #fff; cursor: pointer; padding: 7px 12px; font: inherit; }
      #tk-ranking-dialog .tk-rank-close { font-size: 22px; line-height: 1; }
      #tk-ranking-dialog label { display: block; margin: 12px 0 5px; font-weight: 700; color: #dcebf3; }
      #tk-ranking-dialog select, #tk-ranking-dialog input { width: 100%; border: 1px solid #668091; border-radius: 9px; padding: 11px 12px; background: #0c1722; color: #fff; font: 16px system-ui, sans-serif; }
      #tk-ranking-dialog .tk-rank-result { margin: 14px 0 5px; color: #ffe188; font-weight: 800; }
      #tk-ranking-dialog .tk-rank-form { margin: 13px 0 18px; padding: 15px; border: 1px solid #456374; border-radius: 12px; background: #193044; }
      #tk-ranking-dialog .tk-rank-submit { width: 100%; margin-top: 12px; border: 0; border-radius: 9px; padding: 12px 14px; background: #63e9cf; color: #07232a; font: 800 15px system-ui, sans-serif; cursor: pointer; }
      #tk-ranking-dialog .tk-rank-submit:disabled { opacity: .6; cursor: default; }
      #tk-ranking-dialog .tk-rank-table-wrap { overflow-x: auto; border: 1px solid #456374; border-radius: 11px; }
      #tk-ranking-dialog table { width: 100%; border-collapse: collapse; font: inherit; }
      #tk-ranking-dialog th, #tk-ranking-dialog td { text-align: left; padding: 9px 8px; border-bottom: 1px solid #2b4555; white-space: nowrap; }
      #tk-ranking-dialog th { color: #89dacf; font-size: 11px; letter-spacing: .06em; }
      #tk-ranking-dialog tr:last-child td { border-bottom: 0; }
      #tk-ranking-dialog .tk-rank-mine { background: #235348; }
      #tk-ranking-dialog .tk-rank-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      #tk-ranking-dialog .tk-rank-small { color: #9fb4c0; font-size: 12px; margin: 10px 0 0; }
      #tk-ranking-dialog [hidden] { display: none !important; }
    `;
    document.head.append(style);
    dialog = document.createElement('dialog');
    dialog.id = 'tk-ranking-dialog';
    dialog.setAttribute('aria-labelledby', 'tk-rank-title');
    dialog.innerHTML = `
      <div class="tk-rank-inner">
        <div class="tk-rank-head"><div><p class="tk-rank-kicker">GLOBAL TOP 10</p><h2 id="tk-rank-title"></h2></div><button class="tk-rank-close" type="button" aria-label="ランキングを閉じる">×</button></div>
        <p class="tk-rank-note"></p>
        <label for="tk-rank-mode">ランキングの種類</label><select id="tk-rank-mode"></select>
        <p class="tk-rank-result"></p>
        <form class="tk-rank-form" hidden>
          <div class="tk-rank-run-wrap" hidden><label for="tk-rank-run">登録するプレイヤー</label><select id="tk-rank-run"></select></div>
          <label for="tk-rank-name">ニックネーム（任意・16文字まで）</label><input id="tk-rank-name" maxlength="16" placeholder="未入力ならゲスト" autocomplete="nickname">
          <button class="tk-rank-submit" type="submit">この記録を登録</button><p class="tk-rank-save-status" role="status"></p>
          <p class="tk-rank-small">登録すると名前と記録が全プレイヤーに公開されます。</p>
        </form>
        <div class="tk-rank-table-wrap"><table><thead><tr><th>順位</th><th>名前</th><th class="tk-rank-value-label">記録</th><th>日付</th></tr></thead><tbody class="tk-rank-rows"></tbody></table></div>
        <div class="tk-rank-foot"><p class="tk-rank-status" role="status"></p><button class="tk-rank-refresh" type="button">更新 ↻</button></div>
      </div>`;
    document.body.append(dialog);
    ui = {
      title: dialog.querySelector('#tk-rank-title'), note: dialog.querySelector('.tk-rank-note'),
      mode: dialog.querySelector('#tk-rank-mode'), result: dialog.querySelector('.tk-rank-result'),
      form: dialog.querySelector('.tk-rank-form'), runWrap: dialog.querySelector('.tk-rank-run-wrap'),
      run: dialog.querySelector('#tk-rank-run'), name: dialog.querySelector('#tk-rank-name'),
      submit: dialog.querySelector('.tk-rank-submit'), saveStatus: dialog.querySelector('.tk-rank-save-status'),
      valueLabel: dialog.querySelector('.tk-rank-value-label'), rows: dialog.querySelector('.tk-rank-rows'),
      status: dialog.querySelector('.tk-rank-status'), refresh: dialog.querySelector('.tk-rank-refresh'),
    };
    dialog.querySelector('.tk-rank-close').addEventListener('click', () => dialog.close());
    ui.mode.addEventListener('change', () => { selectedMode = ui.mode.value; renderRun(); load(); });
    ui.run.addEventListener('change', renderRun);
    ui.refresh.addEventListener('click', load);
    ui.form.addEventListener('submit', save);
  }

  function isTimeMode(mode) { return mode.startsWith('minesweeper:'); }
  function valueText(mode, record) {
    return isTimeMode(mode) ? `${(record.duration / 1000).toFixed(2)} 秒` : `${Number(record.score).toLocaleString('ja-JP')} 点`;
  }
  function activeRuns() { return current.runs.filter(run => (run.mode || current.mode) === selectedMode); }
  function selectedRun() { return activeRuns()[Number(ui.run.value) || 0]; }

  function renderRun() {
    const runs = activeRuns();
    ui.runWrap.hidden = runs.length < 2;
    const previousIndex = Number(ui.run.value) || 0;
    ui.run.replaceChildren();
    runs.forEach((run, index) => {
      const option = document.createElement('option');
      option.value = String(index); option.textContent = run.label || `プレイヤー ${index + 1}`;
      ui.run.append(option);
    });
    ui.run.value = String(Math.min(previousIndex, Math.max(0, runs.length - 1)));
    const run = selectedRun();
    ui.form.hidden = !run;
    ui.result.textContent = run ? `${run.label ? run.label + ' / ' : ''}あなたの記録: ${valueText(selectedMode, run)}` : '全プレイヤー共通の記録';
    ui.submit.disabled = Boolean(run?.saved);
    ui.submit.textContent = run?.saved ? '登録済み' : 'この記録を登録';
    ui.saveStatus.textContent = run?.saved ? '登録しました。上位10件に入ると一覧に表示されます。' : '';
  }

  async function load() {
    const version = ++loadVersion;
    const mode = selectedMode;
    ui.status.textContent = 'ランキングを読み込み中…';
    ui.rows.replaceChildren();
    ui.valueLabel.textContent = isTimeMode(mode) ? 'クリア時間' : 'スコア';
    try {
      const result = await request('/api/games/scores?mode=' + encodeURIComponent(mode));
      if (version !== loadVersion) return;
      if (!result.entries.length) {
        const row = document.createElement('tr'), cell = document.createElement('td');
        cell.colSpan = 4; cell.textContent = 'まだ記録がありません。'; row.append(cell); ui.rows.append(row);
      }
      for (const [index, entry] of result.entries.entries()) {
        const row = document.createElement('tr');
        if (savedIds.has(entry.id)) row.className = 'tk-rank-mine';
        const date = new Date(entry.created_at);
        for (const text of [String(index + 1), entry.nickname, valueText(mode, entry), Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('ja-JP')]) {
          const cell = document.createElement('td'); cell.textContent = text; row.append(cell);
        }
        ui.rows.append(row);
      }
      ui.status.textContent = result.entries.length ? 'すべての端末で共有される最新のTOP 10' : '最初の記録を残そう。';
    } catch {
      if (version === loadVersion) ui.status.textContent = '取得できませんでした。「更新」で再試行できます。';
    }
  }

  async function save(event) {
    event.preventDefault();
    const run = selectedRun();
    if (!run || run.saved || ui.submit.disabled) return;
    const mode = selectedMode;
    const displayed = current;
    ui.submit.disabled = true;
    ui.saveStatus.textContent = '記録を送信中…';
    try {
      const id = await run.session;
      if (!id) throw new Error('開始時に接続できなかったため、このプレイは登録できません。次のゲームでお試しください。');
      const nickname = ui.name.value.trim();
      await request('/api/games/scores', { id, mode, score: run.score, duration: run.duration, nickname });
      run.saved = true; run.savedId = id;
      savedSessions.add(run.session);
      savedIds.add(id);
      try { localStorage.setItem('tk777-arcade-nickname', nickname); } catch {}
      if (current === displayed && selectedMode === mode) { renderRun(); load(); }
    } catch (error) {
      if (current === displayed && selectedMode === mode) {
        ui.saveStatus.textContent = error.message || '保存できませんでした。';
        ui.submit.disabled = false;
      }
    }
  }

  function display(config, browseOnly) {
    ensureDialog();
    const mode = String(config.mode || '');
    const variants = (config.modeOptions || [{ value: mode, label: mode.split(':').at(-1) }])
      .map(option => ({ value: option.value || option.mode, label: option.label || option.value || option.mode }))
      .filter(option => option.value);
    if (!variants.some(option => option.value === mode)) variants.unshift({ value: mode, label: mode.split(':').at(-1) });
    const runs = browseOnly ? [] : (Array.isArray(config.runs) ? config.runs :
      (Number.isFinite(config.score) && Number.isFinite(config.duration) ? [config] : []));
    current = { mode, runs: runs.map(run => ({ ...run, saved: savedSessions.has(run.session) })) };
    selectedMode = mode;
    ui.title.textContent = (config.label || 'ゲーム') + ' / TOP 10';
    ui.note.textContent = config.note || '世界中のプレイヤーの記録';
    ui.mode.replaceChildren();
    for (const variant of variants) {
      const option = document.createElement('option');
      option.value = variant.value; option.textContent = variant.label; ui.mode.append(option);
    }
    ui.mode.value = mode;
    try { ui.name.value = localStorage.getItem('tk777-arcade-nickname') || ''; } catch { ui.name.value = ''; }
    renderRun();
    if (!dialog.open) dialog.showModal();
    load();
  }

  window.TKLeaderboard = {
    start(mode) { return request('/api/games/session', { mode }).then(result => result.id).catch(() => null); },
    open(config) { display(config, false); },
    show(config) { display(config, true); },
    isOpen() { return Boolean(dialog?.open); },
  };
})();
