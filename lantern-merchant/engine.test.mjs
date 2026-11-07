import test from 'node:test';
import assert from 'node:assert/strict';
import { newGame, act, validateSave, ITEMS, STOCKS, WEAPONS, BUILDINGS, rentTotal, landCost, upgradeCost } from './engine.mjs';

const copy = value => JSON.parse(JSON.stringify(value));
const count = (state, id, key = 'inventory') => state[key].find(item => item.id === id)?.qty || 0;
function perform(state, action) {
  const result = act(state, action);
  assert.equal(result.ok, true, `${JSON.stringify(action)}: ${result.message}`);
  return result.state;
}
function flood(map, start) {
  const reached = new Set([`${start.x},${start.y}`]);
  const queue = [{ ...start }];
  for (let index = 0; index < queue.length; index++) {
    const p = queue[index];
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = p.x + dx, y = p.y + dy, key = `${x},${y}`;
      if (map.tiles[y]?.[x] > 0 && !reached.has(key)) {
        reached.add(key);
        queue.push({ x, y });
      }
    }
  }
  return reached;
}
function funds(state) {
  return { gold: state.gold, inventory: state.inventory, stocks: state.stocks, plots: state.plots, day: state.day };
}

test('30 generated expeditions have connected passages, reachable stairs and valid occupants', () => {
  for (let seed = 1; seed <= 30; seed++) {
    const state = perform(newGame(seed), { type: 'enter' });
    const reached = flood(state.map, state.player);
    let stairs = 0, entrances = 0;
    for (let y = 0; y < state.map.height; y++) {
      assert.equal(state.map.tiles[y].length, state.map.width);
      for (let x = 0; x < state.map.width; x++) {
        const tile = state.map.tiles[y][x];
        if (tile > 0) assert(reached.has(`${x},${y}`), `seed ${seed}: unreachable ${x},${y}`);
        if (tile === 2) stairs++;
        if (tile === 3) entrances++;
      }
    }
    assert.equal(stairs, 1);
    assert.equal(entrances, 1);
    const occupied = new Set();
    for (const enemy of state.enemies) {
      const key = `${enemy.x},${enemy.y}`;
      assert(reached.has(key));
      assert(!occupied.has(key));
      assert(enemy.hp > 0);
      occupied.add(key);
    }
    for (const item of state.loot) assert(reached.has(`${item.x},${item.y}`));
  }
});

test('the same seed starts the same dungeon and actions preserve the input snapshot', () => {
  const original = newGame(1249), before = copy(original);
  const a = perform(original, { type: 'enter' });
  const b = perform(newGame(1249), { type: 'enter' });
  assert.deepEqual(a.map, b.map);
  assert.deepEqual(a.enemies, b.enemies);
  assert.deepEqual(original, before);
});

test('town and expedition saves survive a JSON round trip', () => {
  for (const state of [newGame(90), perform(newGame(90), { type: 'enter' })]) {
    const restored = validateSave(copy(state));
    assert.deepEqual(restored, state);
  }
});

test('malformed save files cannot create a broken or unbounded game', () => {
  const malformed = [null, [], {}, { version: 999 }];
  const negative = newGame(7); negative.gold = -1; malformed.push(negative);
  const invalidNumber = newGame(7); invalidNumber.hp = Infinity; malformed.push(invalidNumber);
  const tooMany = newGame(7); tooMany.inventory = Array.from({ length: 5000 }, () => ({ id: 'potion', qty: 1 })); malformed.push(tooMany);
  const badMap = perform(newGame(7), { type: 'enter' }); badMap.map.tiles = []; malformed.push(badMap);
  for (const value of malformed) assert.throws(() => validateSave(value));
});

test('invalid trade quantities and unaffordable purchases preserve all holdings', () => {
  const state = newGame(42);
  for (const type of ['buyItem', 'sell', 'buyStock', 'sellStock']) {
    const id = type.includes('Stock') ? STOCKS[0].id : 'potion';
    for (const qty of [-1, 0, 0.5, NaN, Infinity, 1e12]) {
      const result = act(state, { type, id, qty });
      assert.equal(result.ok, false, `${type} must reject ${qty}`);
      assert.deepEqual(funds(result.state), funds(state));
    }
  }
  const empty = copy(state); empty.gold = 0;
  for (const action of [{ type: 'buyLand' }, { type: 'buyItem', id: 'potion', qty: 1 }, { type: 'buyStock', id: STOCKS[0].id, qty: 1 }]) {
    const result = act(empty, action);
    assert.equal(result.ok, false);
    assert.deepEqual(funds(result.state), funds(empty));
  }
});

test('buying and selling supplies cannot manufacture coins', () => {
  let state = newGame(51);
  const beforeGold = state.gold, beforeItems = count(state, 'potion');
  const potion = ITEMS.find(item => item.id === 'potion');
  state = perform(state, { type: 'buyItem', id: 'potion', qty: 2 });
  assert.equal(count(state, 'potion'), beforeItems + 2);
  assert.equal(state.gold, beforeGold - potion.buy * 2);
  state = perform(state, { type: 'sell', id: 'potion', qty: 2 });
  assert.equal(count(state, 'potion'), beforeItems);
  assert.equal(state.gold, beforeGold - (potion.buy - potion.sell) * 2);
});

test('stock transactions conserve value at one quote and reject over-selling', () => {
  let state = newGame(52); state.gold = 2000;
  const stock = STOCKS[0], beforeGold = state.gold, quote = state.prices[stock.id];
  state = perform(state, { type: 'buyStock', id: stock.id, qty: 5 });
  assert.equal(state.stocks[stock.id], 5);
  assert.equal(state.gold, beforeGold - 5 * quote);
  const rejected = act(state, { type: 'sellStock', id: stock.id, qty: 6 });
  assert.equal(rejected.ok, false);
  assert.deepEqual(funds(rejected.state), funds(state));
  state = perform(state, { type: 'sellStock', id: stock.id, qty: 5 });
  assert.equal(state.stocks[stock.id] || 0, 0);
  assert.equal(state.gold, beforeGold);
});

test('property construction and upgrades spend coins and increase rent', () => {
  let state = newGame(53); state.gold = 10000;
  const firstCost = landCost(state), firstCount = state.plots.length;
  state = perform(state, { type: 'buyLand' });
  assert.equal(state.plots.length, firstCount + 1);
  assert.equal(state.gold, 10000 - firstCost);
  const building = BUILDINGS.find(item => item.id === 'cottage');
  state = perform(state, { type: 'build', index: 0, id: building.id });
  assert.equal(rentTotal(state), building.rent);
  const oldGold = state.gold, cost = upgradeCost(state, 0);
  state = perform(state, { type: 'upgrade', index: 0 });
  assert.equal(state.gold, oldGold - cost);
  assert.equal(rentTotal(state), building.rent * 2);
  const bad = act(state, { type: 'build', index: 0, id: building.id });
  assert.equal(bad.ok, false);
});

test('rest heals without advancing the market or paying rent repeatedly', () => {
  let state = newGame(54); state.gold = 500; state.hp = 1;
  state = perform(state, { type: 'build', index: 0, id: 'cottage' });
  const oldGold = state.gold, oldDay = state.day, oldPrices = copy(state.prices);
  state = perform(state, { type: 'rest' });
  assert.equal(state.hp, state.maxHp);
  assert(state.gold < oldGold);
  assert.equal(state.day, oldDay);
  assert.deepEqual(state.prices, oldPrices);
});

test('returning after exploration keeps found goods and pays one day of rent', () => {
  let state = newGame(55); state.gold = 600;
  state = perform(state, { type: 'build', index: 0, id: 'cottage' });
  state = perform(state, { type: 'enter' });
  state.enemies = [];
  const oldDay = state.day, oldGold = state.gold, expectedRent = rentTotal(state);
  for (let i = 0; i < 12; i++) state = perform(state, { type: 'wait' });
  state.runLoot = [{ id: 'ore', qty: 2 }]; state.runGold = 37;
  state = perform(state, { type: 'return' });
  assert.equal(state.mode, 'town');
  assert.equal(count(state, 'ore'), 2);
  assert.equal(state.day, oldDay + 1);
  assert.equal(state.gold, oldGold + 37 + expectedRent);
  const secondReturn = act(state, { type: 'return' });
  assert.equal(secondReturn.ok, false);
  assert.equal(secondReturn.state.gold, state.gold);
});

test('a short retreat does not advance the economy and remote return consumes a recall item', () => {
  let state = perform(newGame(56), { type: 'enter' });
  state.enemies = [];
  const startDay = state.day, startRecall = count(state, 'recall');
  const step = [[1, 0], [-1, 0], [0, 1], [0, -1]].find(([dx, dy]) => state.map.tiles[state.player.y + dy]?.[state.player.x + dx] > 0);
  state = perform(state, { type: 'move', dx: step[0], dy: step[1] });
  state = perform(state, { type: 'return' });
  assert.equal(state.mode, 'town');
  assert.equal(state.day, startDay);
  assert.equal(count(state, 'recall'), startRecall - 1);
});

test('the town economy is unavailable inside a dungeon', () => {
  const state = perform(newGame(57), { type: 'enter' });
  for (const action of [{ type: 'sell', id: 'potion', qty: 1 }, { type: 'buyItem', id: 'potion', qty: 1 }, { type: 'buyStock', id: STOCKS[0].id, qty: 1 }, { type: 'buyLand' }, { type: 'rest' }]) {
    const result = act(state, action);
    assert.equal(result.ok, false);
    assert.deepEqual(funds(result.state), funds(state));
  }
});

test('weapons are durable upgrades and duplicate purchases do not waste gold', () => {
  let state = newGame(58); state.gold = 5000;
  const weapon = WEAPONS.find(item => item.price > 0);
  const oldAttack = state.attack, oldGold = state.gold;
  state = perform(state, { type: 'buyWeapon', id: weapon.id });
  assert.equal(state.weaponId, weapon.id);
  assert(state.attack > oldAttack);
  assert.equal(state.gold, oldGold - weapon.price);
  const duplicate = act(state, { type: 'buyWeapon', id: weapon.id });
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.state.gold, state.gold);
});

test('bumping a creature attacks, awards experience, and increases permanent level', () => {
  let state = perform(newGame(59), { type: 'enter' });
  const playerBefore = copy(state.player), levelBefore = state.level;
  state.enemies = [{ id: 'combat-fixture', kind: 'moss', name: '苔玉', x: state.player.x + 1, y: state.player.y, hp: 1, maxHp: 8, attack: 2, defense: 0, xp: 22 }];
  state = perform(state, { type: 'move', dx: 1, dy: 0 });
  assert.equal(state.enemies.length, 0);
  assert.deepEqual(state.player, playerBefore, 'attacking does not also move into the defeated enemy square');
  assert.equal(state.level, levelBefore + 1);
  assert.equal(state.stats.kills, 1);
  assert(state.runGold > 0);
  assert(state.maxHp > 36);
  state = perform(state, { type: 'return' });
  assert.equal(state.level, levelBefore + 1);
});

test('defeat discards expedition finds while protecting town equipment and assets', () => {
  let state = newGame(60); state.gold = 3000;
  state = perform(state, { type: 'buyWeapon', id: 'copper' });
  state = perform(state, { type: 'build', id: 'cottage', index: 0 });
  state = perform(state, { type: 'buyStock', id: STOCKS[0].id, qty: 5 });
  const permanent = copy(state);
  state = perform(state, { type: 'enter' });
  state.hp = 1; state.runLoot = [{ id: 'prism', qty: 3 }]; state.runGold = 31;
  state.enemies = [{ id: 'defeat-fixture', kind: 'golem', name: '鉱殻', x: state.player.x + 1, y: state.player.y, hp: 20, maxHp: 20, attack: 99, defense: 0, xp: 20 }];
  const result = act(state, { type: 'wait' });
  assert.equal(result.ok, true);
  assert.equal(result.event, 'defeat');
  state = result.state;
  assert.equal(state.mode, 'town');
  assert.equal(state.gold, permanent.gold + Math.floor(31 / 2));
  assert.equal(count(state, 'prism'), 0);
  assert.deepEqual(state.stocks, permanent.stocks);
  assert.deepEqual(state.plots, permanent.plots);
  assert.equal(state.weaponId, permanent.weaponId);
  assert(state.hp > 0);
  assert.deepEqual(validateSave(copy(state)), state);
});

test('ten floors lead to a guarded finale and the recovered relic completes the expedition', () => {
  let state = perform(newGame(61), { type: 'enter' });
  for (let floor = 1; floor <= 10; floor++) {
    assert.equal(state.floor, floor);
    assert.equal(state.maxFloor, floor);
    const y = state.map.tiles.findIndex(row => row.includes(2));
    state.player = { x: state.map.tiles[y].indexOf(2), y };
    if (floor < 10) state = perform(state, { type: 'stairs' });
  }
  const blocked = act(state, { type: 'stairs' });
  assert.equal(blocked.ok, false);
  const boss = state.enemies.find(enemy => enemy.kind === 'boss');
  assert(boss, 'the last floor must have a guardian');
  boss.hp = 1;
  state.enemies = [boss];
  state = perform(state, { type: 'move', dx: 0, dy: -1 });
  assert.equal(state.runRelic, true);
  assert.equal(count(state, 'relic', 'runLoot'), 1);
  const result = act(state, { type: 'stairs' });
  assert.equal(result.ok, true);
  assert.equal(result.event, 'victory');
  state = result.state;
  assert.equal(state.mode, 'town');
  assert.equal(state.stats.clears, 1);
  assert.equal(count(state, 'relic'), 1);
  assert(state.gold >= 680);
  assert.deepEqual(validateSave(copy(state)), state);
});

function expeditionAt(floor,seed=73) {
  let state=perform(newGame(seed),{type:'enter'});
  while(state.floor<floor){const y=state.map.tiles.findIndex(row=>row.includes(2));state.player={x:state.map.tiles[y].indexOf(2),y};state=perform(state,{type:'stairs'});}
  return state;
}
function standOnStairs(state) {const y=state.map.tiles.findIndex(row=>row.includes(2));state.player={x:state.map.tiles[y].indexOf(2),y};return state;}

test('old fifth-floor guardian and recovered-relic saves retain their holdings and can continue to B6',()=>{
  for(const recovered of [false,true]){
    let state=expeditionAt(5);standOnStairs(state);
    const bossPoint={x:state.player.x,y:state.player.y-1};
    state.enemies=state.enemies.filter(e=>e.x!==bossPoint.x||e.y!==bossPoint.y);
    if(!recovered)state.enemies.push({id:'boss-1',kind:'boss',name:'灯晶の番人',...bossPoint,hp:31,maxHp:65,attack:11,defense:3,xp:100});
    state.gold=3210;state.plots=[{building:'cottage',level:2}];state.stocks.loom=10;state.stats.clears=2;
    state.runGold=71;state.runRelic=recovered;state.runLoot=[{id:recovered?'relic':'ore',qty:1}];
    state=validateSave(copy(state));const legacy=copy(state);
    assert.deepEqual(validateSave(JSON.stringify(state)),legacy);
    if(!recovered)assert.equal(state.enemies.find(e=>e.kind==='boss').maxHp,65,'loading never upgrades an old guardian');
    const next=perform(state,{type:'stairs'});
    assert.equal(next.floor,6);assert.equal(next.maxFloor,6);assert.equal(next.mode,'dungeon');
    for(const field of ['gold','inventory','plots','stocks','runLoot','runGold','runRelic'])assert.deepEqual(next[field],legacy[field],field);
    assert.equal(next.stats.clears,2);assert.deepEqual(validateSave(JSON.stringify(next)),next);
    if(recovered){const returned=perform(legacy,{type:'return'});assert.equal(returned.stats.clears,2);assert.equal(count(returned,'relic'),1);assert.equal(returned.gold,3210+71,'an old relic remains valuable but does not award a new B10 clear');}
  }
});

test('carrying a legacy relic cannot bypass the living B10 guardian or award a completion on recall',()=>{
  let state=expeditionAt(10);standOnStairs(state);state.runRelic=true;state.runLoot=[{id:'relic',qty:1}];state.stats.clears=2;
  const before=copy(state),blocked=act(state,{type:'stairs'});
  assert.equal(blocked.ok,false);assert.match(blocked.message,/地下10階/);assert.deepEqual(blocked.state,before);
  const recalled=act(state,{type:'use',id:'recall'});assert.equal(recalled.ok,true);assert.equal(recalled.event,'return');assert.equal(recalled.state.stats.clears,2);assert.equal(count(recalled.state,'relic'),1);
  const boss=state.enemies.find(e=>e.kind==='boss');boss.hp=1;state.enemies=[boss];
  state=perform(state,{type:'move',dx:0,dy:-1});assert.equal(count(state,'relic','runLoot'),2);
  const complete=act(state,{type:'stairs'});assert.equal(complete.ok,true);assert.equal(complete.event,'victory');assert.equal(complete.state.stats.clears,3);assert.equal(count(complete.state,'relic'),2);
});

test('deep floors and completed saves round-trip through version one while B11 remains invalid',()=>{
  for(let floor=6;floor<=10;floor++){
    const state=expeditionAt(floor);assert.deepEqual(validateSave(JSON.stringify(state)),state);assert.equal(state.version,1);
    const normal=state.enemies.filter(e=>!state.map.swarm?.enemyIds.includes(e.id)&&e.kind!=='boss');assert.ok(normal.length>=9&&normal.length<=12);
    assert.equal(state.enemies.filter(e=>e.kind==='boss').length,floor===10?1:0);
  }
  for(const key of ['floor','maxFloor']){const state=newGame(99);state[key]=11;assert.throws(()=>validateSave(state));}
  const town=newGame(99);town.floor=10;town.maxFloor=10;town.stats.clears=7;assert.deepEqual(validateSave(JSON.stringify(town)),town);
});

test('unknown and prototype-like catalog keys are rejected without mutating holdings', () => {
  let state = newGame(62); state.gold = 2000;
  for (const id of ['unknown', '__proto__', 'constructor', 'toString']) {
    for (const action of [{ type: 'buyWeapon', id }, { type: 'buyItem', id }, { type: 'sell', id }, { type: 'use', id }, { type: 'build', index: 0, id }, { type: 'buyStock', id }, { type: 'sellStock', id }]) {
      const result = act(state, action);
      assert.equal(result.ok, false, `${action.type} ${id}`);
      assert.deepEqual(funds(result.state), funds(state));
    }
    const save = copy(state); save.weaponId = id;
    assert.throws(() => validateSave(save));
  }
});

test('save validation rejects duplicate stacks, broken geography and overlapping creatures', () => {
  const duplicates = newGame(63);
  duplicates.inventory.push(copy(duplicates.inventory[0]));
  assert.throws(() => validateSave(duplicates));
  const broken = perform(newGame(63), { type: 'enter' });
  broken.map.tiles[0][0] = 1;
  assert.throws(() => validateSave(broken));
  const overlapping = perform(newGame(63), { type: 'enter' });
  overlapping.enemies[0].x = overlapping.player.x;
  overlapping.enemies[0].y = overlapping.player.y;
  assert.throws(() => validateSave(overlapping));
  const sanitized = newGame(63); sanitized.attack = 1e9; sanitized.maxHp = 1e9; sanitized.injected = '<script>alert(1)</script>';
  const restored = validateSave(sanitized);
  assert.equal(restored.attack, 5);
  assert.equal(restored.maxHp, 36);
  assert.equal(Object.hasOwn(restored, 'injected'), false);
});

test('returning with a full storage stack sells overflow instead of losing its value', () => {
  let state = newGame(64);
  state.inventory.push({ id: 'ore', qty: 999 });
  state = perform(state, { type: 'enter' });
  state.runLoot = [{ id: 'ore', qty: 2 }];
  const oldGold = state.gold, ore = ITEMS.find(item => item.id === 'ore');
  state = perform(state, { type: 'return' });
  assert.equal(count(state, 'ore'), 999);
  assert.equal(state.gold, oldGold + ore.sell * 2);
  assert.equal(state.runLoot.length, 0);
  assert.deepEqual(validateSave(copy(state)), state);
});
