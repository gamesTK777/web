export type Mode = "creative" | "explore";
export type Amount = { id: number; count: number };
export type Stack = Amount & { durability?: number };
export type Bag = { slots: Stack[]; hotbar: number[] };
export type Outcome = { ok: boolean; message: string };
export type Recipe = { id: string; name: string; inputs: Amount[]; output: Amount };
type Kind = { name: string; color: string; block: boolean; maxDurability?: number };

export const CAPACITY = 27;
export const STACK_LIMIT = 64;
export const ITEMS: Record<number, Kind> = {
  1: { name: "草地", color: "#89ac57", block: true },
  2: { name: "土", color: "#9a6e4a", block: true },
  3: { name: "石", color: "#889594", block: true },
  4: { name: "砂", color: "#e5cf91", block: true },
  5: { name: "原木", color: "#926541", block: true },
  6: { name: "葉", color: "#659650", block: true },
  7: { name: "木材", color: "#c69562", block: true },
  8: { name: "丸石", color: "#839593", block: true },
  9: { name: "石レンガ", color: "#a1aaa0", block: true },
  10: { name: "朝霧ガラス", color: "#b7e3db", block: true },
  11: { name: "石炭鉱石", color: "#666e74", block: true },
  12: { name: "灯晶ブロック", color: "#ffce68", block: true },
  13: { name: "水", color: "#65b4cb", block: false },
  14: { name: "岩盤", color: "#404b4c", block: false },
  15: { name: "石炭", color: "#47545c", block: false },
  16: { name: "棒", color: "#b28a60", block: false },
  17: { name: "木のツルハシ", color: "#bd9265", block: false, maxDurability: 36 },
  18: { name: "石のツルハシ", color: "#839fa7", block: false, maxDurability: 90 },
  19: { name: "木の斧", color: "#c58e61", block: false, maxDurability: 36 },
  20: { name: "石の斧", color: "#8ba39b", block: false, maxDurability: 90 },
};

const amount = (id: number, count: number): Amount => ({ id, count });
function recipe(id: string, output: Amount, ...inputs: Amount[]): Recipe {
  return { id, name: ITEMS[output.id].name, inputs, output };
}
export const RECIPES: Recipe[] = [
  recipe("boards", amount(7, 4), amount(5, 1)),
  recipe("sticks", amount(16, 4), amount(7, 2)),
  recipe("wood-pick", amount(17, 1), amount(7, 3), amount(16, 2)),
  recipe("wood-axe", amount(19, 1), amount(7, 3), amount(16, 2)),
  recipe("stone-pick", amount(18, 1), amount(8, 3), amount(16, 2)),
  recipe("stone-axe", amount(20, 1), amount(8, 3), amount(16, 2)),
  recipe("bricks", amount(9, 4), amount(8, 4)),
  recipe("glass", amount(10, 4), amount(4, 3), amount(15, 1)),
  recipe("lamp", amount(12, 2), amount(7, 2), amount(15, 1)),
];

function itemId(id: unknown): id is number {
  return typeof id === "number" && Number.isInteger(id) && id > 0 && id <= 20 && id !== 13 && id !== 14;
}
export function validBag(value: unknown): value is Bag {
  if (!value || typeof value !== "object") return false;
  const { slots, hotbar } = value as Partial<Bag>;
  if (!Array.isArray(hotbar) || hotbar.length !== 9 || !Array.from(hotbar).every(id => id === 0 || itemId(id))) return false;
  if (!Array.isArray(slots) || slots.length > CAPACITY) return false;
  return Array.from(slots).every(slot => {
    if (!slot || !itemId(slot.id) || !Number.isInteger(slot.count) || slot.count < 1 || slot.count > STACK_LIMIT) return false;
    const max = ITEMS[slot.id].maxDurability;
    return max === undefined ? slot.durability === undefined :
      slot.count === 1 && Number.isInteger(slot.durability) && slot.durability! >= 1 && slot.durability! <= max;
  });
}
export function createBag(mode: Mode): Bag {
  return { slots: [], hotbar: mode === "creative" ? [1, 2, 3, 5, 7, 8, 9, 10, 12] : Array(9).fill(0) };
}
export function activeStack(bag: Bag, id: number): Stack | undefined {
  return bag.slots.find(stack => stack.id === id);
}
export function quantity(bag: Bag, id: number): number {
  return bag.slots.reduce((sum, item) => sum + (item.id === id ? item.count : 0), 0);
}
export function assignHotbar(bag: Bag, slot: number, id: number, mode: Mode): boolean {
  if (!Number.isInteger(slot) || slot < 0 || slot >= 9 || !itemId(id)) return false;
  if (mode === "creative" ? !ITEMS[id].block : !activeStack(bag, id)) return false;
  const prior = bag.hotbar.indexOf(id);
  if (prior >= 0) bag.hotbar[prior] = bag.hotbar[slot];
  bag.hotbar[slot] = id;
  return true;
}
const copyBag = (bag: Bag): Bag => ({ slots: bag.slots.map(stack => ({ ...stack })), hotbar: [...bag.hotbar] });
function autoAssign(bag: Bag, id: number) {
  if (bag.hotbar.includes(id)) return;
  let slot = bag.hotbar.indexOf(0);
  if (slot < 0) slot = bag.hotbar.findIndex(held => !activeStack(bag, held));
  if (slot >= 0) bag.hotbar[slot] = id;
}
// The staging bag can be discarded if the whole output does not fit.
function store(bag: Bag, id: number, count: number): boolean {
  const max = ITEMS[id].maxDurability;
  if (!max) {
    for (const stack of bag.slots) {
      if (stack.id !== id) continue;
      const add = Math.min(count, STACK_LIMIT - stack.count);
      stack.count += add;
      count -= add;
      if (!count) break;
    }
  }
  while (count > 0) {
    if (bag.slots.length >= CAPACITY) return false;
    const portion = max ? 1 : Math.min(count, STACK_LIMIT);
    bag.slots.push(max ? { id, count: 1, durability: max } : { id, count: portion });
    count -= portion;
  }
  autoAssign(bag, id);
  return true;
}
function spend(bag: Bag, id: number, count: number) {
  // Empty the smallest stacks first to free storage for the crafted item.
  const stacks = bag.slots.filter(stack => stack.id === id).sort((a, b) => a.count - b.count);
  for (const stack of stacks) {
    const used = Math.min(stack.count, count);
    stack.count -= used;
    count -= used;
    if (!count) break;
  }
  bag.slots = bag.slots.filter(stack => stack.count > 0);
}
function limitByMaterials(bag: Bag, rec: Recipe) {
  return Math.min(...rec.inputs.map(input => Math.floor(quantity(bag, input.id) / input.count)));
}
function makeOne(draft: Bag, rec: Recipe) {
  for (const input of rec.inputs) spend(draft, input.id, input.count);
  return store(draft, rec.output.id, rec.output.count);
}
export function craftable(bag: Bag, rec: Recipe): number {
  const max = limitByMaterials(bag, rec);
  if (!max) return 0;
  const draft = copyBag(bag);
  let made = 0;
  while (made < max && makeOne(draft, rec)) made++;
  return made;
}
export function craft(bag: Bag, recipeId: string, count = 1): Outcome {
  const rec = RECIPES.find(item => item.id === recipeId);
  if (!rec || !Number.isSafeInteger(count) || count < 1) return { ok: false, message: "レシピか制作数を確認してください。" };
  if (limitByMaterials(bag, rec) < count) return { ok: false, message: "材料が足りません。" };
  const draft = copyBag(bag);
  for (let i = 0; i < count; i++) {
    if (!makeOne(draft, rec)) return { ok: false, message: "所持品に空きがありません。" };
  }
  Object.assign(bag, draft);
  return { ok: true, message: rec.name + "を" + rec.output.count * count + "個作りました。" };
}

export function miningSeconds(blockId: number, heldItemId: number, mode: Mode): number {
  if (!ITEMS[blockId]?.block) return Infinity;
  if (mode === "creative") return 0.12;
  if ([3, 8, 9, 11].includes(blockId)) {
    const time = blockId === 11 ? 2.6 : 1.85;
    return time * (heldItemId === 18 ? 0.19 : heldItemId === 17 ? 0.34 : 1);
  }
  if (blockId === 5 || blockId === 7) return heldItemId === 20 ? .29 : heldItemId === 19 ? .48 : 1.12;
  return blockId === 6 || blockId === 10 ? .24 : .48;
}
export function stageMining(bag: Bag, block: number, tool: number): { draft?: Bag; message: string } {
  const draft = copyBag(bag);
  const held = activeStack(draft, tool);
  let broken = false;
  if (held?.durability) {
    if (--held.durability <= 0) {
      draft.slots.splice(draft.slots.indexOf(held), 1);
      broken = true;
    }
  }
  const drop = block === 3 ? 8 : block === 11 ? 15 : block;
  const count = block === 11 ? 2 : 1;
  if (!store(draft, drop, count)) return { message: "所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。" };
  return { draft, message: ITEMS[drop].name + " +" + count + (broken ? " ／ " + ITEMS[tool].name + "が壊れました。" : "") };
}
export function consumeBlock(bag: Bag, id: number): boolean {
  if (!ITEMS[id]?.block || !activeStack(bag, id)) return false;
  spend(bag, id, 1);
  return true;
}
