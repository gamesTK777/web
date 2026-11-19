import {
  createRun, restoreRun, drawCard, playCard, playWild, chooseRelic, chooseRoute,
  getMoves, isExposed, RANKS, SUITS, RELICS, MAX_STAGE,
} from "./engine.mjs";

const SAVE_KEY = "tk777.solitaire.starchart.v1";
const BEST_KEY = "tk777.solitaire.starchart.best.v1";
const suitNames = ["スペード", "ハート", "ダイヤ", "クラブ"];
const courtArt = {11: "jack", 12: "queen", 13: "king"};
const $ = id => document.getElementById(id);
const field = $("field");
const help = $("help");
const restart = $("restart");
const number = new Intl.NumberFormat("ja-JP");
let state;
let wildMode = false;
let saveBlocked = false;
let record = 0;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function readSave() {
  try { return restoreRun(localStorage.getItem(SAVE_KEY)); }
  catch { saveBlocked = true; return null; }
}

function save() {
  try {
    const { version, seed, actions } = state;
    localStorage.setItem(SAVE_KEY, JSON.stringify({version, seed, actions}));
    const stored = Number(localStorage.getItem(BEST_KEY));
    if (Number.isSafeInteger(stored)) record = Math.max(record, stored);
    if (["won","lost"].includes(state.phase) && state.score > record) {
      record = state.score;
      localStorage.setItem(BEST_KEY, String(record));
    }
    saveBlocked = false;
  } catch { saveBlocked = true; }
  $("storage").textContent = saveBlocked ? "このブラウザーでは進行を保存できません。" : "この端末に自動保存";
  $("record").textContent = record ? format(record) : "―";
}

const rankText = rank => RANKS[rank - 1];
const suitText = suit => SUITS[suit] + "\uFE0E";
const color = suit => suit === 1 || suit === 2 ? "red" : "black";
const cardName = card => suitNames[card.suit] + "の" + rankText(card.rank);
const format = value => number.format(value);

function targetRanks() {
  const offsets = [-1, 1];
  if (state.relics.includes("twins")) offsets.push(0);
  if (state.afterDraw && state.relics.includes("compass")) offsets.push(-2, 2);
  return offsets.sort((a,b) => a - b).map(n => RANKS[(state.waste.rank - 1 + n + 13) % 13]);
}

function defaultNote() {
  switch (state.phase) {
    case "reward": return "星の遺物を1つ選んでください。効果はこの冒険の終わりまで続きます。";
    case "route": return "行き先を1つ選んでください。山札が少ない星域ほど、場札の得点が高くなります。";
    case "won": return "すべての航路を踏破しました。新しい星図でもう一度遊べます。";
    case "lost": return "取れる札と助けが尽きました。新しい星図でまた出航できます。";
  }
  if (wildMode) return "流れ星を使う表の札を選んでください。もう一度「流れ星」を押すと取り消せます。";
  if (!getMoves(state).length) {
    if (!state.stock.length) return "山札が尽きました。「流れ星」で表の札を1枚選べます。";
    return "つながる場札がありません。山札を1枚引くと、新しい数字につなげます。";
  }
  return "捨て札の数字につながる場札を選びましょう。Aは2とKのどちらにもつながります。";
}

function cardCorner(card, bottom) {
  const corner = element("span", bottom ? "corner corner-bottom" : "corner");
  corner.append(element("b", "", rankText(card.rank)));
  if (!bottom || courtArt[card.rank]) corner.append(element("span", "mini-suit", suitText(card.suit)));
  return corner;
}

function renderCards(old) {
  const moves = new Set(getMoves(state));
  const fragment = document.createDocumentFragment();
  for (const card of state.tableau) {
    if (card.removed) continue;
    const exposed = isExposed(state, card.id);
    const face = exposed || state.relics.includes("lens");
    const view = element("button", "card");
    view.type = "button";
    view.dataset.card = card.id;
    view.dataset.tone = color(card.suit);
    view.style.setProperty("--x", card.x);
    view.style.setProperty("--row", card.row);
    view.style.zIndex = card.row + 1;
    view.disabled = !exposed;
    if (face) {
      view.classList.add("face");
      const pip = element("span", "pip", suitText(card.suit));
      if (courtArt[card.rank]) {
        view.classList.add("court");
        const art = element("img");
        art.alt = "";
        art.draggable = false;
        art.addEventListener("error", () => pip.replaceChildren(suitText(card.suit)), {once: true});
        art.src = "../../assets/solitaire-rogue/" + courtArt[card.rank] + ".webp";
        pip.replaceChildren(art);
      }
      view.append(cardCorner(card, false), pip, cardCorner(card, true));
    } else {
      view.classList.add("playing-back");
      view.append(element("span", "back-star", "✦"));
    }
    if (!exposed) view.classList.add("locked");
    if (exposed && wildMode) view.classList.add("spell-target");
    else if (moves.has(card.id)) view.classList.add("playable");
    const revealed = exposed && old?.phase === "play" && old.stage === state.stage && !isExposed(old, card.id);
    if (revealed) view.classList.add("turn-up");
    const action = !exposed ? "手前の札を取ると開く" : wildMode ? "流れ星で取れる" : moves.has(card.id) ? "取れる" : "今はつながらない";
    view.setAttribute("aria-label", (face ? cardName(card) : "裏向きの札") + "、" + action);
    fragment.append(view);
  }
  field.replaceChildren(fragment);
  const waste = $("wasteFace");
  waste.dataset.tone = color(state.waste.suit);
  waste.setAttribute("aria-label", cardName(state.waste));
  waste.replaceChildren(element("b", "", rankText(state.waste.rank)), element("em", "", suitText(state.waste.suit)));
  $("targets").textContent = "つなぐ " + targetRanks().join("・");
  $("draw").disabled = !state.stock.length;
  $("stockCount").textContent = "残り " + state.stock.length + " 枚";
  $("wild").disabled = !state.wilds;
  $("wild").setAttribute("aria-pressed", String(wildMode));
  $("wildCount").textContent = wildMode ? "選択を取消" : "残り " + state.wilds + " 回";
  $("combo").hidden = state.streak < 2;
  $("combo").textContent = state.streak + " 連鎖";
  $("remaining").textContent = "場札　" + state.tableau.filter(card => !card.removed).length + " 枚";
}

function renderJournal() {
  $("journeyCount").textContent = state.stage + " / " + MAX_STAGE;
  const steps = [];
  for (let n = 1; n <= MAX_STAGE; n++) {
    const past = n < state.stage || (n === state.stage && ["won", "reward", "route"].includes(state.phase));
    const here = !past && n === state.stage;
    const stop = state.history[n - 1];
    const row = element("li", past ? "done" : here ? "here" : "");
    if (here) row.setAttribute("aria-current", "step");
    const mark = element("span", "node", past ? "✓" : String(n));
    mark.setAttribute("aria-hidden", "true");
    row.append(mark, element("span", "", stop ? stop.name : n === MAX_STAGE ? "最後の天文台" : "第" + n + "航路"));
    steps.push(row);
  }
  $("itinerary").replaceChildren(...steps);
  const relicIds = state.relics.join("/");
  if ($("relics").dataset.list !== relicIds) {
    $("relics").dataset.list = relicIds;
    const relicNodes = state.relics.map(id => {
      const item = RELICS[id];
      const details = element("details");
      details.append(element("summary", "", item.icon + " " + item.name), element("p", "", item.description));
      return details;
    });
    if (!relicNodes.length) relicNodes.push(element("p", "relic-empty", "航路を突破すると、遺物を1つ獲得できます。"));
    $("relics").replaceChildren(...relicNodes);
  }
  $("relicCount").textContent = state.relics.length + " 個";
}

function renderChoices() {
  const phase = state.phase;
  const title = $("choiceTitle");
  const items = phase === "reward" ? state.rewardChoices : state.routeChoices;
  $("phaseMark").textContent = phase === "reward" ? "✦" : phase === "route" ? "✥" : phase === "won" ? "♛" : "☽";
  title.textContent = {reward:"星の遺物を選ぶ", route:"次の航路を選ぶ", won:"五つの航路を踏破！", lost:"航海の終わり"}[phase];
  if (phase === "reward") $("choiceText").textContent = state.route.name + "を突破。持ち帰る遺物を1つ選びましょう。";
  else if (phase === "route") $("choiceText").textContent = "第" + (state.stage + 1) + "航路へ。行き先によって山札と得点が変わります。";
  else $("choiceText").textContent = "第" + state.stage + "航路「" + state.route.name + "」　最終スコア " + format(state.score) + " 点 ／ 最長 " + state.bestStreak + " 連鎖";
  const choices = $("choices");
  choices.replaceChildren();
  for (const item of items) {
    const option = element("button", "choice");
    option.type = "button";
    option.dataset.choice = item.id;
    const mark = element("i", "", item.icon);
    mark.setAttribute("aria-hidden", "true");
    option.append(mark, element("strong", "", item.name), element("small", "", item.description),
      element("small", "choice-cta", item.difficulty || "選択 ›"));
    choices.append(option);
  }
  if (phase === "won" || phase === "lost") {
    const again = element("button", "primary", "新しい航海へ");
    again.type = "button";
    again.dataset.newRun = "true";
    const menu = element("a", "secondary", "ゲーム選択に戻る");
    menu.href = "../menu.html";
    choices.append(again, menu);
  }
}

function render(old, notice = "") {
  $("stageLabel").textContent = "第 " + state.stage + " 航路　／　" + state.route.difficulty;
  $("routeName").textContent = state.route.name;
  $("score").textContent = format(state.score);
  const playing = state.phase === "play";
  $("playView").hidden = !playing;
  $("choiceView").hidden = playing;
  if (playing) renderCards(old);
  else renderChoices();
  renderJournal();
  $("note").textContent = notice || defaultNote();
}

function advance(next) {
  if (state === next) return false;
  const previous = state;
  state = next;
  wildMode = false;
  render(previous);
  save();
  if (next.score > previous.score && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const gain = $("scoreGain");
    gain.textContent = "+" + format(next.score - previous.score);
    gain.getAnimations?.().forEach(animation => animation.cancel());
    gain.animate?.([{opacity:1, transform:"translateY(4px)"},{opacity:0, transform:"translateY(-9px)"}], {duration:760});
  }
  if (previous.phase !== state.phase) {
    if (state.phase === "play") firstMove()?.focus({preventScroll:true});
    else $("choiceTitle").focus({preventScroll:true});
  }
  return true;
}

function firstMove() {
  return field.querySelector(".playable") || (!$("draw").disabled ? $("draw") : $("wild"));
}

function animateTake(source, card) {
  if (typeof source.animate !== "function" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const from = source.getBoundingClientRect();
  const to = $("wasteFace").getBoundingClientRect();
  if (!from.width || !to.width) return;
  const ghost = element("span", "flight");
  ghost.textContent = rankText(card.rank) + suitText(card.suit);
  ghost.dataset.tone = color(card.suit);
  ghost.setAttribute("aria-hidden", "true");
  Object.assign(ghost.style, {left: from.left + "px", top: from.top + "px", width: from.width + "px", height: from.height + "px"});
  document.body.append(ghost);
  const dx = to.left + to.width / 2 - from.left - from.width / 2;
  const dy = to.top + to.height / 2 - from.top - from.height / 2;
  const movement = ghost.animate([
    {transform:"translate(0,0) rotate(-3deg) scale(1)", opacity:.95},
    {transform:"translate(" + dx + "px," + dy + "px) rotate(6deg) scale(.36)", opacity:0},
  ], {duration:265, easing:"cubic-bezier(.18,.72,.35,1)"});
  movement.onfinish = movement.oncancel = () => ghost.remove();
}

field.addEventListener("click", event => {
  const button = event.target.closest("button[data-card]");
  if (!button || button.disabled || state.phase !== "play") return;
  const id = Number(button.dataset.card);
  const next = wildMode ? playWild(state, id) : playCard(state, id);
  if (next === state) {
    $("note").textContent = cardName(state.tableau[id]) + "は今の捨て札につながりません。" + defaultNote();
    return;
  }
  if (next.phase === "play") animateTake(button, state.tableau[id]);
  advance(next);
  if (event.detail === 0 && state.phase === "play") firstMove().focus({preventScroll:true});
});

field.addEventListener("keydown", event => {
  const direction = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
  if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
  const selected = event.target.closest("button[data-card]");
  event.preventDefault();
  if (!selected) { firstMove()?.focus(); return; }
  const current = state.tableau[Number(selected.dataset.card)];
  let best = null;
  let bestDistance = Infinity;
  for (const card of state.tableau) {
    if (!isExposed(state, card.id)) continue;
    const dx = card.x - current.x;
    const dy = card.row - current.row;
    const forward = dx * direction[0] + dy * direction[1];
    const sideways = Math.abs(dx * direction[1] - dy * direction[0]);
    const distance = forward + sideways * 4;
    if (forward > 0 && distance < bestDistance) { best = card; bestDistance = distance; }
  }
  if (best) field.querySelector('[data-card="' + best.id + '"]').focus({preventScroll:true});
});

$("draw").addEventListener("click", event => {
  if (!advance(drawCard(state)) || state.phase !== "play") return;
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
    $("wasteFace").animate?.([{transform:"translateX(-12px) rotate(-10deg)"},{transform:"none"}],{duration:200});
  if (event.detail === 0) firstMove()?.focus({preventScroll:true});
});
$("wild").addEventListener("click", event => {
  if (!state.wilds || state.phase !== "play") return;
  wildMode = !wildMode;
  render();
  if (event.detail === 0 && wildMode) field.querySelector(".spell-target")?.focus({preventScroll:true});
});
$("choices").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.newRun && ["won","lost"].includes(state.phase)) { newRun(); return; }
  if (state.phase === "reward") advance(chooseRelic(state, button.dataset.choice));
  else if (state.phase === "route") advance(chooseRoute(state, button.dataset.choice));
});

function newRun() {
  state = createRun();
  wildMode = false;
  save();
  render();
  firstMove()?.focus({preventScroll:true});
}
$("helpOpen").addEventListener("click", () => help.showModal());
$("restartOpen").addEventListener("click", () => restart.showModal());
$("restartConfirm").addEventListener("click", () => { restart.close(); newRun(); });
document.addEventListener("keydown", event => {
  if (wildMode && event.key === "Escape" && !document.querySelector("dialog[open]")) {
    wildMode = false;
    render();
    $("wild").focus({preventScroll:true});
  }
});
window.addEventListener("storage", event => {
  if (event.key === BEST_KEY) {
    const best = Number(event.newValue);
    if (Number.isSafeInteger(best) && best > record) {
      record = best;
      $("record").textContent = format(best);
    }
    return;
  }
  if (event.key !== SAVE_KEY || !event.newValue) return;
  const updated = restoreRun(event.newValue);
  if (!updated) return;
  state = updated;
  wildMode = false;
  render();
});

const saved = readSave();
state = saved || createRun();
save();
render(null, saved && state.phase === "play" ? "冒険の続きから再開しました。" + defaultNote() : "");
