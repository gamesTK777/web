import { tileName } from './tiles.mjs?v=20261107-mahjong';

/** Connect the accessible buttons to the projected hand. All moves still go through app/engine. */
export function createTableControls(canvas, targets, onPick) {
  const table = canvas.closest('.mahjong-table');
  let model = null;
  let scene = null;
  let loading = false;
  let unavailable = false;
  let resizeFrame = 0;
  let observer;

  function fallback() {
    unavailable = true;
    table.classList.remove('has-3d');
    targets.replaceChildren();
    observer?.disconnect();
    window.removeEventListener('resize', resized);
    cancelAnimationFrame(resizeFrame);
    const previous = scene;
    scene = null;
    previous?.dispose();
  }

  function positionButtons() {
    const rects = scene.projectHand();
    for (let index = 0; index < model.hand.length; index++) {
      let button = targets.children[index];
      if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'table-hit';
        button.dataset.tileIndex = String(index);
        targets.append(button);
      }
      const rect = rects[index];
      button.hidden = !rect;
      if (!rect) continue;
      const name = tileName(model.hand[index]);
      button.setAttribute('aria-label', name);
      button.setAttribute('aria-pressed', String(model.selected === index));
      button.title = name;
      button.disabled = !model.active || !model.legal.includes(index);
      Object.assign(button.style, {
        left: rect.left * 100 + '%', top: rect.top * 100 + '%',
        width: rect.width * 100 + '%', height: rect.height * 100 + '%',
        zIndex: model.selected === index ? '2' : '1',
      });
    }
    while (targets.children.length > model.hand.length) targets.lastElementChild.remove();
  }

  function draw() {
    if (!scene || !model) return;
    try {
      scene.update(model);
      positionButtons();
    } catch (error) {
      console.warn('3D卓を描画できないため、通常の卓に切り替えました。', error);
      fallback();
    }
  }

  // Layout changes (including simulated fullscreen) need a fresh camera projection.
  function resized() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(draw);
  }

  async function openScene() {
    loading = true;
    try {
      const { createTableScene } = await import('./table-scene.mjs?v=20261120-duel');
      table.classList.add('has-3d');
      scene = createTableScene(canvas, { onUnavailable: fallback });
      if (!scene || unavailable) { fallback(); return; }
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(resized);
        observer.observe(canvas);
      }
      window.addEventListener('resize', resized);
      draw();
    } catch (error) {
      console.warn('3D卓を開始できないため、通常の卓で対局します。', error);
      fallback();
    } finally {
      loading = false;
    }
  }

  function choose(event) {
    // Touch/mouse events need the frontmost solid tile where projected buttons overlap.
    // Keyboard and screen-reader button activation already identify the intended tile.
    if (event.detail > 0 && scene && targets.getClientRects().length) {
      const index = scene.pickAt(event.clientX, event.clientY);
      if (model.active && model.legal.includes(index)) onPick(index);
      return;
    }
    const button = event.target.closest('button[data-tile-index]');
    if (button && !button.disabled) onPick(Number(button.dataset.tileIndex));
  }
  targets.addEventListener('click', choose);
  canvas.addEventListener('click', choose);

  return {
    update(next) {
      model = next;
      table.classList.toggle('is-live-table', next.active);
      if (unavailable) return;
      if (scene) draw();
      else if (!loading && next.active) void openScene();
    },
    focusTile(index) {
      const button = targets.children[index];
      if (!scene || !button || !targets.getClientRects().length) return false;
      button.focus({ preventScroll: true });
      return true;
    },
  };
}
