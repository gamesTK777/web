import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { Player } from './physics';

type Box = readonly [
  x: number, y: number, z: number,
  width: number, height: number, depth: number, color: number,
];

const plum = 0x593ba5;
const lilac = 0x9783e8;
const canvas = 0xffbd67;
const cream = 0xffe9bf;
const pool = 0x36aca3;
const navy = 0x344568;
const coral = 0xfb7869;
const skin = 0xf3b792;
const ink = 0x382b4e;
const faceLight = [.79, .67, 1, .51, .72, .88];

// One mesh per articulated part. Per-face color matches the game's shaded voxel faces.
function sculpt(boxes: Box[], material: T.MeshBasicMaterial) {
  const parts = boxes.map(([x, y, z, width, height, depth, rgb]) => {
    const geometry = new T.BoxGeometry(width, height, depth);
    geometry.translate(x, y, z);
    const color = new T.Color(rgb);
    const vertices = new Float32Array(geometry.attributes.position.count * 3);
    for (let index = 0; index < vertices.length / 3; index++) {
      const brightness = faceLight[Math.floor(index / 4)];
      color.multiplyScalar(brightness).toArray(vertices, index * 3);
      color.setHex(rgb);
    }
    geometry.setAttribute('color', new T.BufferAttribute(vertices, 3));
    return geometry;
  });
  const combined = mergeGeometries(parts);
  for (const part of parts) part.dispose();
  return new T.Mesh(combined, material);
}

export class KidsAvatar {
  readonly group = new T.Group();
  private readonly body = new T.Group();
  private readonly material = new T.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  private readonly head: T.Mesh;
  private readonly arms: T.Mesh[] = [];
  private readonly legs: T.Mesh[] = [];
  private readonly shadow = new T.Mesh(
    new T.PlaneGeometry(.76, .76),
    new T.ShaderMaterial({
      transparent: true, depthWrite: false,
      vertexShader: `
        varying vec2 texel;
        void main() {
          texel = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }`,
      fragmentShader: `
        varying vec2 texel;
        void main() {
          float opacity = .33 * (1. - smoothstep(.09, .49, length(texel - .5)));
          gl_FragColor = vec4(.09, .13, .17, opacity);
        }`,
    }),
  );
  private phase = 0;
  private idle = 0;
  private gait = 0;
  private actionPhase = 0;
  private actionBlend = 0;

  constructor() {
    this.group.name = 'kids-avatar';
    this.group.visible = false;
    this.group.add(this.body, this.shadow);
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = .012;
    this.shadow.renderOrder = 1;

    const coat = sculpt([
      [0, .796, 0, .39, .53, .29, canvas],
      [0, .57, 0, .40, .095, .30, plum],
      [0, .789, -.149, .034, .38, .015, cream],
      [0, 1.044, .005, .39, .094, .32, coral],
      [-.102, .962, -.15, .087, .15, .025, coral],
      [0, .832, .174, .326, .385, .224, navy],
      [0, .878, .237, .303, .28, .102, pool],
      [0, .972, .244, .303, .098, .106, 0x78d6be],
      [0, .849, .299, .086, .086, .025, cream],
      [0, .849, .315, .031, .031, .013, coral],
      [0, .686, .233, .22, .078, .108, 0x288a83],
    ], this.material);
    coat.name = 'explorer-coat-and-pack';
    this.body.add(coat);

    this.head = sculpt([
      [0, .223, 0, .426, .446, .405, skin],
      [0, .270, .123, .428, .31, .158, plum],
      [0, .446, .003, .494, .143, .451, plum],
      [0, .534, .013, .444, .086, .417, lilac],
      [0, .579, .026, .302, .038, .287, lilac],
      [0, .421, -.181, .456, .056, .163, lilac],
      [0, .498, .007, .194, .027, .125, cream],
      [-.102, .233, -.203, .039, .055, .011, ink],
      [.102, .233, -.203, .039, .055, .011, ink],
      [-.141, .167, -.203, .063, .018, .011, coral],
      [.141, .167, -.203, .063, .018, .011, coral],
      [0, .146, -.204, .054, .022, .011, 0x914c60],
    ], this.material);
    this.head.name = 'explorer-head';
    this.head.position.y = 1.08;
    this.body.add(this.head);

    for (const side of [-1, 1]) {
      const arm = sculpt([
        [0, -.127, 0, .122, .318, .182, canvas],
        [0, -.269, 0, .126, .084, .185, plum],
        [0, -.343, -.012, .113, .086, .129, skin],
      ], this.material);
      arm.name = 'explorer-arm';
      arm.position.set(.232 * side, .969, .01);
      this.arms.push(arm);
      this.body.add(arm);

      const leg = sculpt([
        [0, -.146, .01, .158, .319, .168, navy],
        [0, -.346, -.037, .173, .143, .247, plum],
        [0, -.415, -.031, .176, .048, .251, 0x262a49],
      ], this.material);
      leg.name = 'explorer-boot';
      leg.position.set(.112 * side, .441, .008);
      this.legs.push(leg);
      this.body.add(leg);
    }
  }

  update(player: Player, dt: number, acting = false, daylight = 1) {
    const elapsed = Math.min(.05, Math.max(0, dt));
    const speed = Math.hypot(player.vx, player.vz);
    const airborne = !player.grounded && !player.inWater && !player.flying;
    const gaitTarget = player.grounded || player.inWater ? Math.min(1, speed / 3.1) : 0;
    this.gait = T.MathUtils.damp(this.gait, gaitTarget, 17, elapsed);
    this.phase = (this.phase + elapsed * (4 + Math.min(6.4, speed) * 1.65)) % (Math.PI * 2);
    this.idle = (this.idle + elapsed * 3) % (Math.PI * 2);
    this.actionPhase = acting ? (this.actionPhase + elapsed * 20) % (Math.PI * 2) : 0;
    this.actionBlend = T.MathUtils.damp(this.actionBlend, acting ? 1 : 0, 21, elapsed);
    const step = Math.sin(this.phase) * this.gait;
    const pump = (.52 + .35 * Math.sin(this.actionPhase)) * this.actionBlend;

    this.group.position.set(player.x, player.y, player.z);
    this.group.rotation.y = player.yaw;
    this.body.position.y = .004 +
      (player.grounded ? .028 * this.gait * Math.abs(step) : 0) + .006 * (1 + Math.sin(this.idle));
    this.body.scale.y = player.crouched ? .54 : 1;
    this.head.rotation.x = T.MathUtils.clamp(player.pitch * .28, -.22, .21);
    this.head.rotation.z = .037 * step;
    this.legs[0].rotation.x = .5 * step + (airborne ? .18 : 0);
    this.legs[1].rotation.x = -.5 * step - (airborne ? .21 : 0);
    this.arms[0].rotation.x = -.49 * step + (airborne ? .24 : 0);
    this.arms[1].rotation.x = .49 * step + pump + (airborne ? .24 : 0);
    this.arms[0].rotation.z = player.flying ? -.38 : -.035;
    this.arms[1].rotation.z = player.flying ? .38 : .035;
    this.shadow.visible = player.grounded && !player.inWater && !player.flying;
    const light = T.MathUtils.clamp(daylight, 0, 1);
    this.material.color.setRGB(.58 + light * .42, .66 + light * .34, .80 + light * .20);
  }

  dispose() {
    this.group.removeFromParent();
    for (const part of this.body.children) {
      if (part instanceof T.Mesh) part.geometry.dispose();
    }
    this.material.dispose();
    this.shadow.geometry.dispose();
    this.shadow.material.dispose();
  }
}
