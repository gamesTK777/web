export type Mode = "creative" | "explore";
export type Amount = { id: number; count: number };
export type Stack = Amount & { durability?: number };
export type Bag = { slots: Stack[]; hotbar: number[] };
export type Outcome = { ok: boolean; message: string };
export type CraftContext = { bench: boolean; generator: 1 | 2; frontier?:boolean };
export type Recipe = { id: string; name: string; inputs: Amount[]; output: Amount; bench?: boolean; legacy?: boolean; frontier?:boolean };
type Kind = { name: string; color: string; block: boolean; maxDurability?: number };

export const CAPACITY = 27;
export const STACK_LIMIT = 64;
export const SLIDE_ITEM = 30;
export const FRONTIER_ITEMS={revolver:34,fireArrow:35,torch:36,rounds:37,bow:38} as const;
export function isFrontierEquipment(id:number):boolean {
  return id===FRONTIER_ITEMS.revolver||id===FRONTIER_ITEMS.torch||id===FRONTIER_ITEMS.bow||id===FRONTIER_ITEMS.fireArrow;
}
const slidePart = { name: "滑り台パーツ", color: "#e5ab52", block: true };
export const blockItemId = (id:number) => id>=31&&id<=33 ? SLIDE_ITEM : id;
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
  21: { name: "作業台", color: "#bc905c", block: true },
  22: { name: "収納チェスト", color: "#ba793e", block: true },
  23: { name: "潮晶鉱石", color: "#58c2bf", block: true },
  24: { name: "潮晶のかけら", color: "#6ce5db", block: false },
  25: { name: "青磁のランタン", color: "#75e8d9", block: true },
  26: { name: "潮晶の象眼タイル", color: "#72bfb0", block: true },
  27: { name: "ジャンプ台（小）", color: "#62c8a2", block: true },
  28: { name: "ジャンプ台（中）", color: "#6eaee8", block: true },
  29: { name: "ジャンプ台（大）", color: "#d892dd", block: true },
  30: slidePart, 31: slidePart, 32: slidePart, 33: slidePart,
  34: { name: "リボルバー", color: "#65747e", block: false },
  35: { name: "火矢", color: "#ed8243", block: false },
  36: { name: "たいまつ", color: "#fdb35a", block: false },
  37: { name: "リボルバーの弾", color: "#d8ab66", block: false },
  38: { name: "弓", color: "#a86943", block: false },
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
  recipe("bench", amount(21, 1), amount(7, 4)),
  recipe("chest", amount(22, 1), amount(7, 6)),
  recipe("jump-small", amount(27, 1), amount(7, 4), amount(16, 2)),
  recipe("jump-medium", amount(28, 1), amount(7, 5), amount(8, 4)),
  recipe("jump-large", amount(29, 1), amount(7, 6), amount(8, 8)),
  recipe("slide-part", amount(30, 3), amount(7, 6)),
  { ...recipe("crystal-lamp", amount(25, 2), amount(24, 1), amount(12, 1)), bench: true },
  { ...recipe("inlaid-tile", amount(26, 8), amount(24, 1), amount(8, 4)), bench: true },
  { ...recipe("crystal-cut", amount(24, 2), amount(10, 2), amount(15, 1)), bench: true, legacy: true },
  { ...recipe("frontier-revolver", amount(34,1), amount(8,5), amount(7,3)), bench:true, frontier:true },
  { ...recipe("frontier-rounds", amount(37,10), amount(8,2), amount(15,1)), bench:true, frontier:true },
  { ...recipe("frontier-torch", amount(36,4), amount(16,2), amount(15,1)), frontier:true },
  { ...recipe("frontier-arrow", amount(35,6), amount(16,3), amount(15,1)), frontier:true },
  { ...recipe("frontier-bow", amount(38,1), amount(16,4), amount(7,2)), frontier:true },
];

function itemId(id: unknown): id is number {
  return typeof id === "number" && Number.isInteger(id) && Object.hasOwn(ITEMS,id) && id !== 13 && id !== 14 && blockItemId(id)===id;
}
export function validBag(value: unknown): value is Bag {
  if (!value || typeof value !== "object") return false;
  const { slots, hotbar } = value as Partial<Bag>;
  if (!Array.isArray(hotbar) || hotbar.length !== 9 || !Array.from(hotbar).every(id => id === 0 || itemId(id))) return false;
  return validStacks(slots);
}
export function validStacks(slots: unknown): slots is Stack[] {
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
export function assignHotbar(bag: Bag, slot: number, id: number, mode: Mode, frontier=false): boolean {
  if (!Number.isInteger(slot) || slot < 0 || slot >= 9 || !itemId(id)) return false;
  if (mode === "creative" ? !ITEMS[id].block&&!(frontier&&isFrontierEquipment(id)) : !activeStack(bag, id)) return false;
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
export function craftReason(bag: Bag, rec: Recipe, ctx?: CraftContext): string {
  if (rec.frontier && !ctx?.frontier) return "西部の町で作れます。";
  if (rec.legacy && ctx?.generator !== 1) return "旧ワールド専用の加工です。";
  // The old world's hand recipes are part of its original progression.
  if (needsBench(rec,ctx?.generator ?? 1) && !ctx?.bench) return "作業台を右クリックして作ります。";
  if (!limitByMaterials(bag,rec)) return "材料が足りません。";
  return "";
}
export function needsBench(rec: Recipe, generator: 1 | 2) {
  return Boolean(rec.bench || generator === 2 && ["stone-pick","stone-axe","bricks","glass"].includes(rec.id));
}
export function craftable(bag: Bag, rec: Recipe, ctx?: CraftContext): number {
  if (craftReason(bag,rec,ctx)) return 0;
  const max = limitByMaterials(bag, rec);
  if (!max) return 0;
  const draft = copyBag(bag);
  let made = 0;
  while (made < max && makeOne(draft, rec)) made++;
  return made;
}
export function craft(bag: Bag, recipeId: string, count = 1, ctx?: CraftContext): Outcome {
  const rec = RECIPES.find(item => item.id === recipeId);
  if (!rec || !Number.isSafeInteger(count) || count < 1) return { ok: false, message: "レシピか制作数を確認してください。" };
  const reason = craftReason(bag,rec,ctx);
  if (reason) return { ok: false, message: reason };
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
  if (blockId === 23 && heldItemId !== 17 && heldItemId !== 18) return Infinity;
  if ([3, 8, 9, 11, 23, 26].includes(blockId)) {
    const time = blockId === 11 ? 2.6 : 1.85;
    return time * (heldItemId === 18 ? 0.19 : heldItemId === 17 ? 0.34 : 1);
  }
  if ([5,7,21,22].includes(blockId)) return heldItemId === 20 ? .29 : heldItemId === 19 ? .48 : 1.12;
  return blockId === 6 || blockId === 10 ? .24 : .48;
}
export function stageMining(bag: Bag, block: number, tool: number): { draft?: Bag; message: string } {
  if (!ITEMS[block]?.block) return {message:"この素材は採取できません。"};
  if (block === 23 && (![17,18].includes(tool) || !activeStack(bag,tool))) return {message:"潮晶鉱石には木か石のツルハシが必要です。"};
  const draft = copyBag(bag);
  const held = activeStack(draft, tool);
  let broken = false;
  if (held?.durability) {
    if (--held.durability <= 0) {
      draft.slots.splice(draft.slots.indexOf(held), 1);
      broken = true;
    }
  }
  const drop = block === 3 ? 8 : block === 11 ? 15 : block === 23 ? 24 : blockItemId(block);
  const count = block === 11 || block === 23 ? 2 : 1;
  if (!store(draft, drop, count)) return { message: "所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。" };
  return { draft, message: ITEMS[drop].name + " +" + count + (broken ? " ／ " + ITEMS[tool].name + "が壊れました。" : "") };
}
export function consumeBlock(bag: Bag, id: number): boolean {
  return !!ITEMS[id]?.block&&consumeItem(bag,id);
}
export function consumeItem(bag:Bag,id:number):boolean {
  if (!activeStack(bag,id)) return false;
  spend(bag, id, 1);
  return true;
}

export function splitStack(slots: Stack[], index: number): Outcome {
  const stack = slots[index];
  if (!stack || stack.count < 2) return {ok:false,message:"2個以上の束を選んでください。"};
  if (slots.length >= CAPACITY) return {ok:false,message:"分割するための空き枠がありません。"};
  const half = Math.floor(stack.count / 2);
  stack.count -= half;
  slots.splice(index + 1, 0, {id:stack.id,count:half});
  return {ok:true,message:"束を2つに分けました。"};
}

export function sortSlots(slots: Stack[]): Outcome {
  const sorted = [...slots].sort((a,b)=>a.id-b.id || (a.durability ?? 0)-(b.durability ?? 0));
  const merged: Stack[] = [];
  for (const stack of sorted) {
    const last = merged.at(-1);
    let left = stack.count;
    if (!stack.durability && last?.id === stack.id) {
      const fill = Math.min(left,STACK_LIMIT-last.count);
      last.count += fill;
      left -= fill;
    }
    if (left) merged.push({...stack,count:left});
  }
  slots.splice(0,slots.length,...merged);
  return {ok:true,message:"同じ素材をまとめて整頓しました。"};
}

type ContainerSide = "bag"|"chest";
// Never partially transfer one selected stack. Worn tools keep their wear.
function moveCount(from: Stack[], to: Stack[], index: number, count: number): boolean {
  const item = from[index];
  if (!item || count <= 0 || count > item.count) return false;
  const tool = Boolean(item.durability);
  const vacant = CAPACITY-to.length;
  const spare = tool ? 0 : to.reduce((sum,s)=>sum+(s.id===item.id ? STACK_LIMIT-s.count : 0),0);
  if (vacant*(tool ? 1 : STACK_LIMIT)+spare < count) return false;
  let left = count;
  if (!tool) for (const target of to) {
    if (target.id !== item.id) continue;
    const fill = Math.min(STACK_LIMIT-target.count,left);
    target.count += fill;
    left -= fill;
    if (!left) break;
  }
  if (left) to.push({...item,count:left});
  item.count -= count;
  if (!item.count) from.splice(index,1);
  return true;
}
export function transferStack(bag: Bag, chest: Stack[], from: ContainerSide, index: number, half = false): Outcome {
  const [source,target] = from === "bag" ? [bag.slots,chest] : [chest,bag.slots];
  const item = source[index];
  if (!item) return {ok:false,message:"移す束を選んでください。"};
  const count = half ? Math.ceil(item.count/2) : item.count;
  if (!moveCount(source,target,index,count)) return {ok:false,message:"移動先の空きが足りません。"};
  if (from === "chest") autoAssign(bag,item.id);
  return {ok:true,message:ITEMS[item.id].name+"を"+count+"個移しました。"};
}
// Materialize one creative palette stack in the player's finite pouch for storage.
export function supplyCreative(bag:Bag,mode:Mode,id:number,count:number):Outcome {
  if(mode!=='creative'||!itemId(id)||!ITEMS[id].block||![1,STACK_LIMIT].includes(count))return {ok:false,message:'建材と個数を確認してください。'};
  const draft=copyBag(bag);
  if(!store(draft,id,count))return {ok:false,message:'所持品の空きが足りません。'};
  Object.assign(bag,draft);
  return {ok:true,message:ITEMS[id].name+'を'+count+'個補充しました。'};
}
export function transferAll(bag: Bag, chest: Stack[], from: ContainerSide): Outcome {
  const source = from === "bag" ? bag.slots : chest;
  let moved = 0;
  for (let i = source.length-1; i >= 0; i--) {
    if (transferStack(bag,chest,from,i).ok) moved++;
  }
  return {ok:moved>0,message:moved ? moved+"束を移しました。"+(source.length ? "空き不足で残った束があります。" : "") : "移動できる束がありません。"};
}
