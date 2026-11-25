import {drawFloorChart} from './expedition-map.mjs?v=20261125-expedition';

// Original materials and graphic relief for the harbor's underground ruins.
const SIZE = 112;
const MATERIALS = [
  {floor:'#394c4a', slab:'#56645a', grit:'#878476', seam:'#222f32', upper:'#596b61', rock:'#49554f', face:'#374740', base:'#131f29', rim:'#8c9c81', accent:'#a4ad75', ember:'#ffe1a8', lamp:'255,174,90'},
  {floor:'#2c4852', slab:'#416470', grit:'#6c8b8c', seam:'#203740', upper:'#52757b', rock:'#435f66', face:'#294852', base:'#102331', rim:'#88a8a7', accent:'#91d2c9', ember:'#d6fff0', lamp:'111,217,209'},
  {floor:'#48463f', slab:'#655449', grit:'#9b7c62', seam:'#302f32', upper:'#796658', rock:'#6c574e', face:'#523f3c', base:'#271f27', rim:'#ad8d69', accent:'#eab982', ember:'#ffdfae', lamp:'255,157,87'},
  {floor:'#494151', slab:'#64536d', grit:'#977a91', seam:'#312838', upper:'#725774', rock:'#635069', face:'#46364e', base:'#251a30', rim:'#a285a0', accent:'#eca8af', ember:'#ffe5c8', lamp:'241,149,170'},
  {floor:'#313e55', slab:'#4b546e', grit:'#8391a8', seam:'#1c2c40', upper:'#5a6781', rock:'#494d70', face:'#303c5d', base:'#121e36', rim:'#949bb7', accent:'#ddd0a7', ember:'#fff1cf', lamp:'193,174,255'}
];
const TILE_CACHE = new Map();
let stoneTexture;
if (typeof Image !== 'undefined') {
  const image = new Image();
  image.decoding = 'async';
  image.onload = () => { stoneTexture = image; TILE_CACHE.clear(); };
  image.src = new URL('./assets/environment/underharbor-stone.webp', import.meta.url).href;
}

const random = (variant, index) => {
  const n = Math.imul(variant + 17, 374761393) ^ Math.imul(index + 29, 668265263);
  const mixed = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((mixed ^ (mixed >>> 16)) >>> 0) / 4294967296;
};
function fill(c, color, x, y, w, h) {
  c.fillStyle = color;
  c.fillRect(x, y, w, h);
}
function shade(c, x1, y1, x2, y2, from, to) {
  const gradient = c.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  return gradient;
}
function polygon(c, points) {
  c.beginPath();
  c.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) c.lineTo(...points[i]);
  c.closePath();
}
function gridSlab(c, p, variant, x, y, w, h) {
  const bevel = 3 + random(variant, x + y) * 3;
  const shape = [
    [x + bevel, y], [x + w - bevel, y + 1], [x + w - 1, y + bevel],
    [x + w - 2, y + h - bevel], [x + w - bevel - 2, y + h - 1],
    [x + bevel, y + h], [x + 1, y + h - bevel], [x, y + bevel]
  ];
  polygon(c, shape);
  const randomWash = random(variant, x * 13 + y);
  c.fillStyle = shade(c, x, y, x + w, y + h, randomWash > .4 ? p.slab : p.floor, p.floor);
  c.fill();
  c.beginPath();
  c.moveTo(x + 2, y + h * .58);
  c.lineTo(x + 2, y + bevel + 1);
  c.lineTo(x + bevel, y + 2);
  c.lineTo(x + w - bevel, y + 3);
  c.strokeStyle = p.grit;
  c.globalAlpha = .46;
  c.lineWidth = 1.35;
  c.stroke();
  c.globalAlpha = 1;
}
function stoneGrain(c, p, variant, level, startY=0) {
  if (stoneTexture) {
    const iw = stoneTexture.naturalWidth, ih = stoneTexture.naturalHeight;
    const width = iw * .52, height = ih * .52;
    const sx = random(variant, 99) * (iw - width), sy = random(variant, 101) * (ih - height);
    c.globalAlpha = level === 2 ? .14 : .35;
    c.globalCompositeOperation = 'soft-light';
    c.drawImage(stoneTexture, sx, sy, width, height, 0, startY, SIZE, SIZE - startY);
    c.globalCompositeOperation = 'source-over';
  }
  c.globalAlpha = .22;
  for (let i = 0; i < 100; i++) {
    const x = random(variant, i * 2) * SIZE;
    const y = startY + random(variant, i * 2 + 1) * (SIZE - startY);
    fill(c, i % 3 === 0 ? p.grit : p.seam, x, y, .6 + random(variant, i * 3) * 2.6, .7 + i % 3 * .4);
  }
  c.globalAlpha = 1;
}
function paintFloor(c, p, variant, level) {
  fill(c, p.seam, 0, 0, SIZE, SIZE);
  if (level === 2) {
    for (let row = 0; row < 4; row++) {
      const y = row * 28, joint = 22 + random(variant, row) * 68;
      [[-4, joint + 2], [joint, SIZE - joint + 4]].forEach(([x,w],i) => {
        fill(c, shade(c, 0, y, 0, y + 26, i === row % 2 ? p.slab : p.floor, p.floor), x, y + 1, w - 1, 26);
        fill(c, p.grit, x, y + 2, w - 2, 1);
        for (let streak = 0; streak < 5; streak++) {
          const xs = x + random(variant, row * 19 + streak) * w;
          fill(c, streak % 2 ? '#c8a47928' : '#251b2580', xs, y + 4 + streak * 4,
            Math.min(w * .33, x + w - xs), 1);
        }
      });
      fill(c, '#47352f', joint - 1, y + 8, 2.9, 11);
      fill(c, '#c39368b4', joint, y + 7, 1.5, 13);
      fill(c, '#e5b783af', joint - 2, y + 8, 2, 2);
    }
  } else {
    for (let row = 0; row < 3; row++) {
      const y = row * 37.5 + 1, joint = 29 + random(variant, row * 7) * 51;
      gridSlab(c, p, variant * 7 + row, -4, y, joint + 3, 35.5);
      gridSlab(c, p, variant * 7 + row + 31, joint + 1, y - .5, SIZE - joint + 3, 36);
    }
  }
  stoneGrain(c, p, variant, level);
  if (variant % 5 === 0 && level !== 2) {
    const x = 32 + random(variant, 499) * 47, y = 21 + random(variant, 536) * 68;
    c.beginPath();
    c.moveTo(x + 7, y - 6);
    c.lineTo(x + 1, y);
    c.lineTo(x, y + 5);
    c.lineTo(x - 5, y + 7);
    c.lineTo(x - 8, y + 12);
    c.strokeStyle = p.seam; c.lineWidth = 2; c.stroke();
    c.beginPath(); c.moveTo(x - 1, y + 1); c.lineTo(x - 5, y + 3); c.lineTo(x - 11, y + 2);
    c.lineWidth = 1; c.stroke();
  }
  if (level === 1 || level === 4) {
    c.globalAlpha = .20;
    c.strokeStyle = p.accent;
    c.lineWidth = 1.15;
    for (let i = 0; i < 4; i++) {
      const x = 9 + random(variant, i + 331) * 67, y = 9 + random(variant, i + 411) * 89;
      c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 14, y - 3, x + 24, y); c.stroke();
    }
    c.globalAlpha = 1;
  }
}
function paintWall(c, p, variant, level, front) {
  fill(c, shade(c, 0, 0, 9, SIZE, p.upper, p.rock), 0, 0, SIZE, SIZE);
  for (let i = 0; i < 18; i++) {
    const x = random(variant, i * 4) * SIZE, y = random(variant, i * 4 + 1) * SIZE;
    const width = 12 + random(variant, i * 4 + 2) * 28;
    const height = 4 + random(variant, i * 4 + 3) * 13;
    polygon(c, [[x, y], [x + width * .4, y - height], [x + width, y - height * .28], [x + width * .82, y + height], [x + width * .17, y + height * .73]]);
    c.fillStyle = i % 3 === 1 ? p.rim : p.face;
    c.globalAlpha = .16 + i % 4 * .04;
    c.fill();
  }
  c.globalAlpha = 1;
  stoneGrain(c, p, variant + 12, level);
  if (level === 3 && variant % 3 === 0) {
    const x = 9 + random(variant, 225) * 69, y = 26;
    c.beginPath(); c.moveTo(x, y + 7); c.lineTo(x + 6, y - 3); c.lineTo(x + 3, y - 15);
    c.moveTo(x + 6, y - 2); c.lineTo(x + 17, y - 6); c.lineTo(x + 19, y - 14);
    c.moveTo(x + 2, y + 3); c.lineTo(x - 7, y - 5); c.lineTo(x - 7, y - 11);
    c.strokeStyle = '#322639'; c.lineWidth = 5.5; c.stroke();
    c.strokeStyle = '#d09799'; c.lineWidth = 2.3; c.stroke();
    fill(c, '#eed1b6', x + 17, y - 16, 3, 4);
  }
  if (level === 4 && variant % 3 === 2) {
    const x = 15 + random(variant, 501) * 66;
    for (const [shift, top, height] of [[-7,19,11],[0,8,24],[8,16,16]]) {
      polygon(c, [[x + shift - 4, top + height], [x + shift - 5, top + 4], [x + shift, top], [x + shift + 4, top + 8], [x + shift + 5, top + height]]);
      c.fillStyle = shade(c, x + shift - 4, top, x + shift + 5, top + height, '#c9d9fa', '#466384'); c.fill();
    }
  }
  if (!front) return;
  const ledge = 39 + Math.floor(random(variant, 115) * 8);
  // A bright cap faces up, while the staggered masonry steps down to the floor.
  fill(c, p.base, 0, ledge, SIZE, SIZE - ledge);
  fill(c, shade(c, 0, ledge, 0, SIZE, p.rock, p.base), 0, ledge + 3, SIZE, SIZE - ledge - 3);
  for (let row = 0; row < 3; row++) {
    const y = ledge + 4 + row * 21;
    const cut = -20 * (row % 2) - 4;
    for (let x = cut, index = 0; x < SIZE; x += 37, index++) {
      const dip = Math.ceil(random(variant, row * 12 + index) * 4);
      const bottom = Math.min(SIZE - 1, y + 20 - dip);
      polygon(c, [[x + 1, y + dip], [x + 33, y + 1], [x + 36, y + 6], [x + 34, bottom], [x + 6, bottom - 1], [x, bottom - 4]]);
      c.fillStyle = shade(c, x, y, x, bottom, row === 0 ? p.rock : p.face, p.base);
      c.fill();
      fill(c, '#ffffff19', x + 5, y + dip + 1, 26, 1);
      fill(c, '#131b2394', x + 29, y + 6, 3, Math.max(3, bottom - y - 10));
    }
  }
  stoneGrain(c, p, variant + 145, level, ledge + 1);
  if (level === 2) {
    // Copper strapping and timber beams distinguish the former dock route.
    if (variant % 3 === 0) {
      const x = 13 + random(variant, 986) * 69;
      fill(c, '#352b2a', x, ledge - 1, 13, SIZE - ledge - 5);
      fill(c, '#8f6d50', x + 2, ledge + 2, 3, SIZE - ledge - 9);
      for (const y of [ledge + 5, SIZE - 19]) {
        fill(c, '#b4805b', x - 3, y, 19, 5);
        fill(c, '#e5ac7d', x + 4, y + 1, 3, 2);
      }
    }
  } else if (variant % 3 === 1) {
    c.globalAlpha = .27;
    for (let i = 0; i < 10; i++) {
      const x = 4 + random(variant, 310 + i) * (SIZE - 9), y = ledge + random(variant, 331 + i) * 9;
      fill(c, p.accent, x, y, 4 + i % 3, 1.9 + (i * i % 6) * .7);
    }
    c.globalAlpha = 1;
  }
  c.beginPath();
  c.moveTo(0, ledge - 1);
  c.lineTo(26, ledge - 2);
  c.lineTo(35, ledge + 2);
  c.lineTo(66, ledge);
  c.lineTo(97, ledge + 3);
  c.lineTo(SIZE, ledge);
  c.strokeStyle = p.rim;
  c.lineWidth = 2.8;
  c.stroke();
  fill(c, '#020b14b3', 0, SIZE - 6, SIZE, 6);
}
function tileImage(material, variant, theme) {
  const key = `${theme}:${material}:${variant}`;
  if (TILE_CACHE.has(key)) return TILE_CACHE.get(key);
  const canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(SIZE, SIZE) :
    typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return null;
  canvas.width = canvas.height = SIZE;
  const c = canvas.getContext('2d');
  if (!c) return null;
  paintTile(c, material, variant, theme);
  TILE_CACHE.set(key, canvas);
  return canvas;
}
function paintTile(c, material, variant, theme) {
  const p = MATERIALS[theme];
  if (material === 'floor') paintFloor(c, p, variant, theme);
  else paintWall(c, p, variant, theme, material === 'front');
}
function sideFacing(c, xx, yy, size, exposed, left) {
  if (!exposed) return;
  const width = size * .22, start = left ? xx : xx + size - width;
  const dark = '#101d2fb5', fade = '#0b172d00';
  fill(c, shade(c, start, yy, start + width, yy, left ? dark : fade, left ? fade : dark), start, yy, width, size);
  for (let i = 1; i < 4; i++) fill(c, '#122334a6', start, yy + size * i / 4, width * (i % 2 ? .72 : .9), Math.max(1, size * .018));
}

/** Draw geometry entirely within logical tile bounds. Unknown neighboring tiles never add detail. */
export function drawDungeonTile(c, map, x, y, xx, yy, size, variant, theme) {
  const value = map.tiles[y][x], vis = map.visible[y][x];
  const neighbor = (dx, dy) => map.seen[y + dy]?.[x + dx] ? map.tiles[y + dy][x + dx] : undefined;
  const material = value ? 'floor' : neighbor(0, 1) > 0 ? 'front' : 'wall';
  const image = tileImage(material, variant, theme);
  c.save();
  c.imageSmoothingEnabled = true;
  if (image) c.drawImage(image, xx, yy, size + .35, size + .35);
  else {
    c.translate(xx, yy);
    c.scale(size / SIZE, size / SIZE);
    paintTile(c, material, variant, theme);
  }
  c.restore();
  if (!value) {
    sideFacing(c, xx, yy, size, neighbor(-1, 0) > 0, true);
    sideFacing(c, xx, yy, size, neighbor(1, 0) > 0, false);
  } else {
    if (neighbor(0, -1) === 0) fill(c, shade(c, xx, yy, xx, yy + size * .4, '#081727cc', '#08172700'), xx, yy, size, size * .4);
    if (neighbor(-1, 0) === 0) fill(c, shade(c, xx, yy, xx + size * .17, yy, '#07162679', '#07162600'), xx, yy, size * .17, size);
    if (neighbor(1, 0) === 0) fill(c, shade(c, xx + size * .81, yy, xx + size, yy, '#07162600', '#071626a1'), xx + size * .81, yy, size * .19, size);
    if (neighbor(0, 1) === 0) fill(c, shade(c, xx, yy + size * .85, xx, yy + size, '#0b243600', '#0b243680'), xx, yy + size * .85, size, size * .15);
  }
  if (!vis) fill(c, '#07121bd6', xx, yy, size + .5, size + .5);
}

function lightPool(c, x, y, radius, rgb, power) {
  const light = c.createRadialGradient(x, y, 0, x, y, radius);
  light.addColorStop(0, `rgba(${rgb},${power})`);
  light.addColorStop(.28, `rgba(${rgb},${power * .62})`);
  light.addColorStop(.68, `rgba(${rgb},${power * .2})`);
  light.addColorStop(1, `rgba(${rgb},0)`);
  fill(c, light, x - radius, y - radius, radius * 2, radius * 2);
}

export function drawDungeonLight(c, {startX, startY, endX, endY, visible, px, py, tile, player, lamps, time, theme, reducedMotion}) {
  c.save();
  c.beginPath();
  for (let y = startY; y < endY; y++) for (let x = startX; x < endX; x++) {
    if (visible(x, y)) c.rect(px(x), py(y), tile + .5, tile + .5);
  }
  c.clip();
  // Cool ambient shadows keep even unlit known floor texture distinguishable.
  fill(c, '#0712223f', px(startX), py(startY), (endX - startX) * tile, (endY - startY) * tile);
  c.globalCompositeOperation = 'screen';
  const nearest = lamps.map(lamp => ({...lamp, distance:Math.hypot(lamp.x - player.x, lamp.y - player.y)}));
  nearest.sort((a, b) => a.distance - b.distance);
  for (const lamp of nearest.slice(0, 7)) {
    const flicker = reducedMotion ? 0 : Math.sin(time / 187 + lamp.x * .008) * .026;
    lightPool(c, lamp.x, lamp.y + tile * .36, tile * 2.05, MATERIALS[theme].lamp, .58 + flicker);
  }
  lightPool(c, player.x + tile * .32, player.y - tile * .19, tile * 2.86, '255,198,107', .43);
  lightPool(c, player.x - tile * .7, player.y + tile * .18, tile * 4.2, '92,153,171', .15);
  c.restore();
}

export function dungeonLampColor(theme) { return MATERIALS[theme].ember; }

export function drawDungeonPassage(c, tile, xx, yy, size, time) {
  c.save();
  c.translate(xx, yy);
  c.scale(size / SIZE, size / SIZE);
  if (tile === 2) {
    // Deep well of steps, with front-lit treads and paired brass brackets.
    polygon(c, [[23, 17], [89, 17], [101, 94], [11, 94]]);
    c.fillStyle = '#131e2a'; c.fill();
    c.strokeStyle = '#94816c'; c.lineWidth = 3; c.stroke();
    fill(c, '#e0b97d', 22, 19, 68, 3);
    for (let step = 0; step < 7; step++) {
      const width = 62 + step * 2, y = 25 + step * 9.4, x = (SIZE - width) / 2;
      fill(c, shade(c, 0, y, 0, y + 8, '#64717a', '#263442'), x, y, width, 8);
      fill(c, step < 3 ? '#a4b2a2b0' : '#9b9d86a8', x, y, width, 1.25);
    }
    for (const x of [19, 89]) {
      fill(c, '#453930', x, 83, 6, 8);
      fill(c, '#e9bc7f', x, 83, 6, 2);
    }
  } else {
    // A brass compass and turquoise lamplight mark the return point.
    const pulse = .19 + Math.sin(time / 1040) * .05;
    lightPool(c, 56, 59, 51, '115,236,215', pulse);
    c.beginPath(); c.ellipse(56, 60, 42, 33, 0, 0, Math.PI * 2);
    c.fillStyle = '#173f49'; c.fill();
    c.strokeStyle = '#bea676'; c.lineWidth = 2; c.stroke();
    c.beginPath(); c.ellipse(56, 60, 34, 26, 0, 0, Math.PI * 2);
    c.strokeStyle = '#73c8bbaa'; c.lineWidth = 1; c.stroke();
    polygon(c, [[56, 29], [74, 59], [56, 91], [39, 59]]);
    c.fillStyle = shade(c, 49, 29, 62, 90, '#d9f9d1', '#428a82'); c.fill();
    polygon(c, [[56, 49], [62, 59], [56, 72], [50, 59]]);
    c.fillStyle = '#eaffdc'; c.fill();
    for (const [x, y] of [[17,58],[93,58],[51,25],[51,92]]) fill(c, '#ffe9b4', x, y, 6, 3);
  }
  c.restore();
}

const TRAP_GLYPHS = {'steam-vent':'≋', 'salt-bed':'✧', 'bell-sigil':'⌘'};

export function drawDungeonTrap(c, trap, xx, yy, size) {
  if (!trap.discovered) return;
  const x = xx + size / 2, y = yy + size * .59;
  const color = trap.spent ? '#84a99a' : '#f2b577';
  c.save();
  c.globalAlpha = trap.spent ? .52 : 1;
  c.beginPath();
  c.ellipse(x, y, size * .26, size * .18, 0, 0, Math.PI * 2);
  c.fillStyle = '#17232be8'; c.fill();
  c.lineWidth = Math.max(1.5, size * .028); c.strokeStyle = color; c.stroke();
  c.fillStyle = color; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = `800 ${Math.max(13,size * .27)}px system-ui, sans-serif`;
  c.fillText(TRAP_GLYPHS[trap.kind] || '!', x, y - size * .015);
  c.restore();
}

/** The chart only shows terrain that's been seen and entities currently in sight. */
export function drawDungeonMap(c, w, state, {cameraX, cameraY, viewCols, viewRows}) {
  const map = state.map, compact = w < 550, scale = compact ? 2.4 : 3.65;
  const mw = map.width * scale, mh = map.height * scale, pad = compact ? 7 : 10;
  const x = w - mw - pad - (compact ? 9 : 16), y = compact ? 26 : 31;
  c.save();
  fill(c, '#071723d9', x - pad, y - 19, mw + pad * 2, mh + 27);
  c.strokeStyle = '#8fbcbaa0'; c.lineWidth = 1;
  c.strokeRect(x - pad + .5, y - 18.5, mw + pad * 2 - 1, mh + 26);
  c.font = `700 ${compact ? 9 : 10}px system-ui, sans-serif`;
  c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = '#c0e3da';
  c.fillText(`B${state.floor}  踏破図`, x, y - 9);
  drawFloorChart(c, state, x, y, scale);
  c.save();
  c.beginPath(); c.rect(x, y, mw, mh); c.clip();
  c.strokeStyle = '#c1d8bd42';
  c.strokeRect(x + cameraX * scale, y + cameraY * scale, viewCols * scale, viewRows * scale);
  c.restore();
  c.restore();
}
