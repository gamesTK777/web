const MAX_FLIGHTS = 12;
const PULSE_DURATION = 180;
const COLORS = new Set(['red', 'yellow', 'green', 'blue']);
const SYMBOLS = { skip: '⊘', reverse: '⇄', draw2: '+2', wild: '✦', wild4: '+4' };
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const number = n => Number.isFinite(Number(n)) ? Number(n) : null;

function rectOf(value) {
  const r = typeof value?.getBoundingClientRect === 'function' ? value.getBoundingClientRect() : value;
  if (!r) return null;
  const x = number(r.x ?? r.left), y = number(r.y ?? r.top), width = number(r.width), height = number(r.height);
  return x === null || y === null || width === null || height === null || width <= 0 || height <= 0 ? null : { x, y, width, height };
}

// Decorative card flights use only backs or an explicitly supplied public
// discard. Actual hand buttons remain visible, focusable, and rule-controlled.
export class UnoMotion {
  constructor({ document = globalThis.document, window = globalThis.window,
    setTimer = (...args) => globalThis.setTimeout(...args), clearTimer = (...args) => globalThis.clearTimeout(...args) } = {}) {
    this.document = document; this.window = window;
    this.setTimer = (...args) => setTimer(...args); this.clearTimer = (...args) => clearTimer(...args);
    this.layer = null; this.records = new Set(); this.flights = new Set(); this.disposed = false;
    this.media = window?.matchMedia?.('(prefers-reduced-motion: reduce)');
    this.onHidden = () => { if (this.document?.hidden) this.stop(); };
    this.onViewport = () => this.stop();
    this.onReduced = () => { if (this.media?.matches) this.stop(); };
    document?.addEventListener?.('visibilitychange', this.onHidden);
    window?.addEventListener?.('pagehide', this.onViewport);
    window?.addEventListener?.('resize', this.onViewport);
    this.media?.addEventListener?.('change', this.onReduced);
  }

  _viewport() {
    return { width: Math.max(1, this.window?.innerWidth || this.document?.documentElement?.clientWidth || 1024),
      height: Math.max(1, this.window?.innerHeight || this.document?.documentElement?.clientHeight || 768) };
  }

  _bounds(target) {
    const view = this._viewport(), frame = rectOf(target?.closest?.('.hand'));
    const viewport = { left: 6, top: 6, right: Math.max(6, view.width - 6), bottom: Math.max(6, view.height - 6) };
    if (!frame) return viewport;
    const left = Math.max(viewport.left, frame.x), top = Math.max(viewport.top, frame.y);
    const right = Math.min(viewport.right, frame.x + frame.width), bottom = Math.min(viewport.bottom, frame.y + frame.height);
    return right > left && bottom > top ? { left, top, right, bottom } : viewport;
  }

  _point(rect, width, height, bounds = this._bounds()) {
    const halfW = Math.min(width / 2, (bounds.right - bounds.left) / 2);
    const halfH = Math.min(height / 2, (bounds.bottom - bounds.top) / 2);
    return { x: clamp(rect.x + rect.width / 2, bounds.left + halfW, bounds.right - halfW),
      y: clamp(rect.y + rect.height / 2, bounds.top + halfH, bounds.bottom - halfH) };
  }

  _layer() {
    if (this.layer) return this.layer;
    if (!this.document?.body || !this.document.createElement) return null;
    const layer = this.document.createElement('div'); layer.className = 'uno-motion-layer';
    layer.setAttribute('aria-hidden', 'true'); this.document.body.append(layer); this.layer = layer;
    return layer;
  }

  _card(card, width, height) {
    const node = this.document.createElement('div'); node.className = 'uno-flying-card';
    node.setAttribute('aria-hidden', 'true'); node.style.width = width + 'px'; node.style.height = height + 'px';
    const value = String(card?.value ?? ''), validValue = /^(?:[0-9]|skip|reverse|draw2|wild|wild4)$/.test(value);
    const validColor = COLORS.has(card?.color) || card?.color === null && ['wild', 'wild4'].includes(value);
    if (validValue && validColor) {
      node.className += ' playing-card ' + (card.color || 'wild') + (SYMBOLS[value] ? ' action-card' : '');
      for (const className of ['card-corner', 'card-main', 'card-corner bottom']) {
        const text = this.document.createElement(className === 'card-main' ? 'b' : 'span');
        text.className = className; text.textContent = SYMBOLS[value] || value; node.append(text);
      }
    } else {
      node.className += ' uno-flight-back';
      const brand = this.document.createElement('b'); brand.className = 'uno-flight-brand'; brand.textContent = 'UNO'; brand.style.fontSize = Math.round(width * .28) + 'px'; node.append(brand);
    }
    return node;
  }

  _track(animation, { node = null, duration = 0, flight = false } = {}) {
    if (!animation) { node?.remove?.(); return null; }
    const record = { animation, node, timer: null, done: false, finish: null };
    const finish = () => {
      if (record.done) return; record.done = true;
      if (record.timer !== null) this.clearTimer(record.timer);
      this.records.delete(record); this.flights.delete(record); node?.remove?.();
    };
    record.finish = finish; this.records.add(record); if (flight) this.flights.add(record);
    animation.onfinish = finish; animation.oncancel = finish;
    animation.finished?.then?.(finish, finish);
    record.timer = this.setTimer(finish, duration + 100);
    return record;
  }

  _pulse(target, delay = 0) {
    if (typeof target?.animate !== 'function' || target.isConnected === false) return;
    try {
      const animation = target.animate([{ boxShadow: '0 0 0 2px #e9ffaecc, 0 0 18px #d7f86b55' },
        { boxShadow: '0 0 0 0 #d7f86b00, 0 0 0 #d7f86b00' }], { duration: PULSE_DURATION, delay, easing: 'ease-out' });
      this._track(animation, { duration: PULSE_DURATION + delay });
    } catch { /* A presentation effect must never stop a card action. */ }
  }

  _flight({ from, to, target, card = null, delay = 0, duration = 410, receive = false, index = 0 }) {
    if (this.disposed || this.document?.hidden) return 0;
    const source = rectOf(from), destination = rectOf(to); if (!source || !destination) return 0;
    const width = clamp(destination.width, 42, 98), height = clamp(destination.height, 64, 146);
    const size = destination.width > destination.height * .9 ? { width: Math.min(66, width), height: Math.min(98, Math.min(66, width) * 1.48) } : { width, height };
    const start = this._point(source, size.width, size.height), end = this._point(destination, size.width, size.height, this._bounds(target));
    const layer = this._layer(); if (!layer) return 0;
    const node = this._card(card, size.width, size.height);
    if (typeof node.animate !== 'function') { if (!layer.children?.length) { layer.remove(); this.layer = null; } return 0; }
    while (this.flights.size >= MAX_FLIGHTS) {
      const oldest = this.flights.values().next().value; try { oldest.animation.cancel(); } catch {} oldest.finish();
    }
    layer.append(node);
    const tx = p => p.x - size.width / 2, ty = p => p.y - size.height / 2;
    const middle = { x: start.x + (end.x - start.x) * .58, y: start.y + (end.y - start.y) * .58 - Math.min(42, Math.abs(end.x - start.x) * .08 + 16) };
    const rotation = index % 2 ? 14 : -14;
    const transform = (point, angle, scale, flip = 0) => `perspective(700px) translate3d(${tx(point)}px, ${ty(point)}px, 0) rotate(${angle}deg) rotateY(${flip}deg) scale(${scale})`;
    const frames = [
      { transform: transform(start, rotation, .72), opacity: .2 },
      { transform: transform(middle, -rotation * .35, .96), opacity: 1, offset: .58 },
      { transform: transform(end, 0, 1, receive ? 72 : 0), opacity: .94, offset: .9 },
      { transform: transform(end, receive ? 0 : 7, 1, receive ? 88 : 0), opacity: 0 }
    ];
    try { this._track(node.animate(frames, { duration, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }), { node, duration: duration + delay, flight: true }); }
    catch { node.remove(); return 0; }
    const pulseDelay = delay + Math.round(duration * .72);
    this._pulse(target, pulseDelay);
    return Math.max(duration + delay, pulseDelay + PULSE_DURATION);
  }

  receive({ targets = [], source = this.document?.getElementById?.('drawPile'), initial = false } = {}) {
    if (this.disposed || this.document?.hidden) return 0;
    const destinationTargets = Array.from(targets || []).filter(target => target && target.isConnected !== false).slice(0, MAX_FLIGHTS);
    if (this.media?.matches) { destinationTargets.forEach(target => this._pulse(target)); return destinationTargets.length ? PULSE_DURATION : 0; }
    const origin = source?.querySelector?.('.deck-back') || source; if (!rectOf(origin)) return 0;
    let total = 0;
    destinationTargets.forEach((target, index) => {
      const delay = Math.min(index * (initial ? 32 : 42), 300);
      total = Math.max(total, this._flight({ from: origin, to: target, target, delay, duration: initial ? 430 : 390, receive: true, index }));
    });
    return total;
  }

  play({ from, to = this.document?.getElementById?.('discardCard'), card = null } = {}) {
    if (this.disposed || this.document?.hidden || !to || to.isConnected === false) return 0;
    const target = to.querySelector?.('.playing-card') || to;
    if (this.media?.matches) { this._pulse(target); return PULSE_DURATION; }
    return this._flight({ from, to: target, target, card, duration: 330 });
  }

  stop() {
    for (const record of [...this.records]) { try { record.animation.cancel(); } catch {} record.finish(); }
    this.layer?.remove?.(); this.layer = null;
  }

  dispose() {
    if (this.disposed) return; this.stop(); this.disposed = true;
    this.document?.removeEventListener?.('visibilitychange', this.onHidden);
    this.window?.removeEventListener?.('pagehide', this.onViewport);
    this.window?.removeEventListener?.('resize', this.onViewport);
    this.media?.removeEventListener?.('change', this.onReduced);
  }
}
