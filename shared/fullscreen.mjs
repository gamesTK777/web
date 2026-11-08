// One fullscreen presentation layer for all games. Game state, saves and DOM
// ownership stay with each game; html is the native fullscreen element so that
// dialogs continue to work above the game on browsers with the Fullscreen API.
const initialized = new WeakMap();

export function createGameFullscreen({document = globalThis.document, window = globalThis.window, buttons, target} = {}) {
  if (!document?.body || !window) return null;
  const controls = Array.from(buttons ?? document.querySelectorAll('[data-game-fullscreen]'));
  const root = document.documentElement;
  let active = false, native = false, disposed = false, activeTarget = null;
  let savedView = null, requestPending = null, exitPending = null, generation = 0;
  const listeners = [];
  const exitButton = document.createElement('button');
  exitButton.type = 'button'; exitButton.className = 'game-fullscreen-exit'; exitButton.hidden = true;
  exitButton.textContent = '⛶ 元に戻す'; exitButton.setAttribute('aria-label', '全画面表示を終了');
  document.body.append(exitButton);
  const announcement = document.createElement('span');
  announcement.className = 'game-fullscreen-announcement'; announcement.setAttribute('role', 'status'); announcement.setAttribute('aria-live', 'polite');
  document.body.append(announcement);

  function listen(node, name, fn, options) { node?.addEventListener?.(name, fn, options); listeners.push(() => node?.removeEventListener?.(name, fn, options)); }
  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;
  const nativeIsOurs = () => fullscreenElement() === root;
  function syncControls() {
    for (const button of controls) {
      button.textContent = active ? '⛶ 元に戻す' : button.dataset?.fullscreenLabel || '⛶ 全画面';
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? '全画面表示を終了' : 'ゲームを全画面で表示');
      button.setAttribute('aria-busy', String(!!requestPending || !!exitPending));
    }
    exitButton.hidden = !active;
  }
  function viewport() {
    if (!active) return;
    const height = Number(window.visualViewport?.height || window.innerHeight);
    const width = Number(window.innerWidth);
    if (Number.isFinite(height) && height > 0) root.style.setProperty('--game-fullscreen-height', Math.round(height) + 'px');
    if (Number.isFinite(width) && width > 0) root.style.setProperty('--game-fullscreen-width', Math.round(width) + 'px');
  }
  function emit() {
    syncControls(); viewport();
    const detail = {active, native: active && native, target: activeTarget};
    if (typeof window.CustomEvent === 'function') window.dispatchEvent(new window.CustomEvent('gamefullscreenchange', {detail}));
    if (typeof window.Event === 'function') window.dispatchEvent(new window.Event('resize'));
  }
  function resolveTarget(button) {
    let value = typeof target === 'function' ? target(button) : target;
    if (!value) value = button?.dataset?.fullscreenTarget;
    if (typeof value === 'string') { try { value = document.querySelector(value); } catch { value = null; } }
    return value && value.nodeType === 1 && value.isConnected !== false ? value : document.body;
  }
  function restoreView(view) {
    if (!view) return;
    try { if (view.focus?.isConnected !== false) view.focus?.focus?.({preventScroll: true}); } catch {}
    try { window.scrollTo(view.x, view.y); } catch {}
  }
  function focusGame(button) {
    if (!active || document.querySelector('dialog[open]')) return;
    let node = null;
    try {
      const selector = button?.dataset?.fullscreenFocus;
      node = selector ? document.querySelector(selector) : activeTarget.querySelector?.('canvas[tabindex], [role="grid"] [tabindex="0"]');
    } catch {}
    node ||= activeTarget;
    if (!node?.focus || node.isConnected === false) return;
    if (node.getAttribute?.('tabindex') === null) {
      savedView.focusProperties.push([node, null]); node.setAttribute('tabindex', '-1');
    }
    try { node.focus({preventScroll: true}); } catch {}
  }
  function removePresentation() {
    if (!active) return null;
    const view = savedView; savedView = null; active = false; native = false;
    activeTarget?.classList.remove('game-fullscreen-target'); activeTarget = null;
    document.body.classList.remove('game-fullscreen');
    for (const [node, value] of view.focusProperties) {
      if (value === null) node.removeAttribute('tabindex'); else node.setAttribute('tabindex', value);
    }
    for (const [name, value, priority] of view.properties) {
      if (value) root.style.setProperty(name, value, priority); else root.style.removeProperty(name);
    }
    announcement.textContent = '通常の画面表示に戻しました。'; emit(); restoreView(view);
    return view;
  }
  function exitNative() {
    if (!nativeIsOurs()) return Promise.resolve(false);
    if (exitPending) return exitPending;
    const fn = document.exitFullscreen || document.webkitExitFullscreen;
    if (typeof fn !== 'function') return Promise.resolve(false);
    try {
      const task = Promise.resolve(fn.call(document)).catch(() => false);
      exitPending = task;
      task.finally(() => { if (exitPending === task) { exitPending = null; syncControls(); } });
      return task;
    } catch { return Promise.resolve(false); }
  }
  async function enter(button = controls[0]) {
    if (disposed || active || requestPending || exitPending) return false;
    const token = ++generation;
    savedView = {x: window.scrollX || 0, y: window.scrollY || 0, focus: document.activeElement, focusProperties: [],
      properties: ['--game-fullscreen-height', '--game-fullscreen-width'].map(name => [name, root.style.getPropertyValue(name), root.style.getPropertyPriority(name)])};
    activeTarget = resolveTarget(button); active = true; native = false;
    document.body.classList.add('game-fullscreen'); activeTarget.classList.add('game-fullscreen-target');
    announcement.textContent = 'ゲームを画面いっぱいに表示しました。元に戻すボタンで終了できます。'; emit(); focusGame(button);
    const request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (typeof request !== 'function') return true;
    const operation = {token}; requestPending = operation; syncControls();
    try {
      if (root.requestFullscreen) await request.call(root, {navigationUI: 'hide'});
      else await request.call(root);
    } catch { /* iPhone and denied native requests keep the viewport fallback. */ }
    finally { if (requestPending === operation) { requestPending = null; syncControls(); } }
    if (disposed || token !== generation || !active) { if (!active) await exitNative(); return false; }
    native = nativeIsOurs(); emit(); focusGame(button); return true;
  }
  async function exit() {
    if (disposed || !active && !requestPending && !nativeIsOurs()) return false;
    ++generation;
    const view = removePresentation();
    await exitNative(); restoreView(view); return true;
  }
  const toggle = button => active ? exit() : enter(button);
  function changed() {
    if (disposed) return;
    if (nativeIsOurs()) {
      if (!active) { if (requestPending) void exitNative(); return; }
      if (!native) { native = true; emit(); }
    } else if (active && native) { ++generation; removePresentation(); }
  }
  for (const button of controls) listen(button, 'click', () => { void toggle(button); });
  listen(exitButton, 'click', () => { void exit(); });
  listen(document, 'fullscreenchange', changed); listen(document, 'webkitfullscreenchange', changed);
  listen(document, 'keydown', event => {
    if (!active || native || event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
    event.preventDefault(); event.stopPropagation(); void exit();
  }, true);
  listen(window, 'resize', viewport);
  listen(window.visualViewport, 'resize', () => {
    viewport();
    if (active && typeof window.Event === 'function') window.dispatchEvent(new window.Event('resize'));
  });
  syncControls();
  return {
    enter, exit, toggle,
    state: () => ({active, native, busy: !!requestPending || !!exitPending, target: activeTarget}),
    dispose() {
      if (disposed) return; ++generation; removePresentation(); disposed = true;
      for (const cleanup of listeners) cleanup(); exitButton.remove(); announcement.remove(); void exitNative();
    },
  };
}

export function initGameFullscreen(document = globalThis.document, window = globalThis.window) {
  if (!document || initialized.has(document)) return initialized.get(document) || null;
  const buttons = document.querySelectorAll('[data-game-fullscreen]');
  if (!buttons.length) return null;
  const controller = createGameFullscreen({document, window, buttons}); initialized.set(document, controller); return controller;
}

if (globalThis.document && globalThis.window) initGameFullscreen();
