import { face as tileFace } from './tiles.mjs?v=20261119-table-3d';

const TILE_WIDTH = 128;
const TILE_HEIGHT = 176;

function canvasContext(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('牌の絵を用意できませんでした。');
  return context;
}

function roundedRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  const path = new Path2D();
  path.moveTo(x + r, y);
  path.arcTo(x + width, y, x + width, y + height, r);
  path.arcTo(x + width, y + height, x, y + height, r);
  path.arcTo(x, y + height, x, y, r);
  path.arcTo(x, y, x + width, y, r);
  path.closePath();
  return path;
}

// Rasterize the same small SVG vocabulary used by the accessible DOM tiles.
// Path2D keeps this synchronous so a first dealt hand always has all its faces.
function paintTileGlyph(context, parser, id) {
  const drawing = parser.parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg">' + tileFace(id) + '</svg>', 'image/svg+xml'
  );
  for (const shape of drawing.documentElement.children) {
    const read = (key) => shape.getAttribute(key);
    const number = (key) => Number(read(key));
    if (shape.localName === 'text') {
      context.font = `${read('font-weight')} ${number('font-size')}px "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", serif`;
      context.textAlign = 'center';
      context.textBaseline = 'alphabetic';
      context.fillStyle = read('fill');
      context.fillText(shape.textContent, number('x'), number('y'));
      continue;
    }
    let path;
    if (shape.localName === 'path') {
      path = new Path2D(read('d'));
    } else if (shape.localName === 'circle') {
      path = new Path2D();
      path.arc(number('cx'), number('cy'), number('r'), 0, Math.PI * 2);
    } else if (shape.localName === 'rect') {
      path = roundedRect(number('x'), number('y'), number('width'), number('height'), number('rx'));
    } else {
      continue;
    }
    const fill = read('fill') || '#172f38';
    if (fill !== 'none') {
      context.fillStyle = fill;
      context.fill(path);
    }
    const stroke = read('stroke');
    if (stroke && stroke !== 'none') {
      context.strokeStyle = stroke;
      context.lineWidth = number('stroke-width') || 1;
      context.lineCap = read('stroke-linecap') || 'butt';
      context.lineJoin = 'round';
      context.stroke(path);
    }
  }
}

function tileFront(parser, id) {
  const ctx = canvasContext(TILE_WIDTH, TILE_HEIGHT);
  const glaze = ctx.createLinearGradient(0, 0, TILE_WIDTH, TILE_HEIGHT);
  glaze.addColorStop(0, '#fffaf0');
  glaze.addColorStop(0.52, '#fff5df');
  glaze.addColorStop(1, '#efdfbd');
  ctx.fillStyle = glaze;
  ctx.fillRect(0, 0, TILE_WIDTH, TILE_HEIGHT);
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = '#fcf6e7';
  ctx.stroke(roundedRect(2, 2, TILE_WIDTH - 4, TILE_HEIGHT - 4, 10));
  const scale = TILE_WIDTH / 50;
  ctx.translate(0, (TILE_HEIGHT - 56 * scale) / 2);
  ctx.scale(scale, scale);
  paintTileGlyph(ctx, parser, id);
  return ctx.canvas;
}

function tileBack() {
  const ctx = canvasContext(TILE_WIDTH, TILE_HEIGHT);
  const body = ctx.createLinearGradient(0, 0, TILE_WIDTH, TILE_HEIGHT);
  body.addColorStop(0, '#d39b56');
  body.addColorStop(0.48, '#b97934');
  body.addColorStop(1, '#98612e');
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, TILE_WIDTH, TILE_HEIGHT);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#a96e33';
  ctx.stroke(roundedRect(7, 7, TILE_WIDTH - 14, TILE_HEIGHT - 14, 8));
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#efd09a';
  ctx.stroke(roundedRect(9, 9, TILE_WIDTH - 18, TILE_HEIGHT - 18, 7));
  ctx.translate(TILE_WIDTH / 2, TILE_HEIGHT / 2);
  ctx.scale(1, 1.18);
  ctx.lineWidth = 2.3;
  ctx.strokeStyle = '#e8b978';
  for (const size of [20, 14]) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size, 0);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.quadraticCurveTo(1, -1, 8, 0);
  ctx.quadraticCurveTo(1, 1, 0, 8);
  ctx.quadraticCurveTo(-1, 1, -8, 0);
  ctx.quadraticCurveTo(-1, -1, 0, -8);
  ctx.fillStyle = '#efc68b';
  ctx.fill();
  return ctx.canvas;
}

function surfaceGrain(wood) {
  const size = 256;
  const ctx = canvasContext(size, size);
  const pixels = ctx.createImageData(size, size);
  let seed = wood ? 149 : 307;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const noise = seed / 4294967296 - 0.5;
      let r, g, b;
      if (wood) {
        const angle = x / size * Math.PI * 2;
        const grain = y / size * 12 * Math.PI * 2 + Math.sin(angle) * 1.4 + Math.sin(angle * 2 + y / size * Math.PI * 2) * 0.75;
        const grainLight = Math.sin(grain) * 5 + Math.sin(grain * 2) * 3 + Math.sin(grain * 5) * 1.3 + noise * 7;
        r = 92 + grainLight;
        g = 51 + grainLight * 0.78;
        b = 34 + grainLight * 0.55;
      } else {
        const warp = (x + y) % 4 === 0 ? 2.6 : 0;
        const weft = (x - y) % 8 === 0 ? 1.3 : 0;
        const fibre = noise * 9 + warp - weft;
        r = 26 + fibre * 0.65;
        g = 91 + fibre;
        b = 83 + fibre * 0.9;
      }
      const index = (x + y * size) * 4;
      pixels.data[index] = r;
      pixels.data[index + 1] = g;
      pixels.data[index + 2] = b;
      pixels.data[index + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  return ctx.canvas;
}

export function makeTableArt(THREE) {
  const textures = [];
  const materials = [];
  const parser = new DOMParser();
  function material(parameters) {
    const mat = new THREE.MeshStandardMaterial(parameters);
    materials.push(mat);
    return mat;
  }
  function map(canvas, repeatX = 1, repeatY = 1) {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    if (repeatX !== 1 || repeatY !== 1) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
    }
    textures.push(texture);
    return texture;
  }
  const faces = Array.from({ length: 34 }, (_, id) =>
    material({ map: map(tileFront(parser, id)), roughness: 0.40 })
  );
  const back = material({ map: map(tileBack()), roughness: 0.36 });
  const ivory = material({ color: 0xf3e5c6, roughness: 0.43 });
  const felt = material({ map: map(surfaceGrain(false), 6, 5), roughness: 0.99 });
  const wood = material({ map: map(surfaceGrain(true), 3, 1), roughness: 0.49 });
  function dispose() {
    for (const mat of materials) mat.dispose();
    for (const texture of textures) texture.dispose();
  }
  return { faces, back, ivory, felt, wood, dispose };
}
