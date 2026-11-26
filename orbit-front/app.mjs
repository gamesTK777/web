import * as S from './strategy.mjs';
import {createBoard} from './board.mjs';
import {drawMech} from './mechs.mjs';
import {startBattle} from './battle.mjs';
import {createSound} from './sound.mjs';

const $ = id => document.getElementById(id);
const SAVE = 'tk777-orbit-front-campaign-v1', PREF = 'tk777-orbit-front-sound';
const terrain = {plain:'月原', road:'採掘路', crater:'クレーター', ridge:'岩稜', factory:'月面工場', hq:'本拠地'};
const forces = {blue:'環潮同盟', red:'赤環機構'};
const sideName = s => s==='blue'?'自軍':s==='red'?'敵軍':'中立';
const addr = ({q,r}) => String.fromCharCode(65+q)+String(r+1).padStart(2,'0');
const lookup = id => state.units.find(u=>u.id===id);
const sound = createSound();
let levels = [.34,.68];
try { const a=JSON.parse(localStorage.getItem(PREF)); if(Array.isArray(a)&&a.length===2&&a.every(n=>Number.isFinite(n)&&n>=0&&n<=1)) levels=a; } catch {}
sound.volume(...levels);
let state=null, scene='title', selected=null, destination=null, target=null, inspected=null, placement=null;
let cpuTimer, arena, dismissible=true, showThreat=false, saveText='';
const board=createBoard($('board'),{onCell:clickCell});

function el(tag,text,css) {
  const node=document.createElement(tag);
  if(text!==null && text!==undefined)node.textContent=text;
  if(css)node.className=css;
  return node;
}
function btn(text,action,css) {
  const b=el('button',text,css); b.type='button'; b.onclick=action; return b;
}
function sprite(unit,size=36) {
  const c=el('canvas',null,'sprites');
  c.width=c.height=size;c.setAttribute('aria-hidden','true');
  drawMech(c.getContext('2d'),unit.kind,unit.side,size/2,size/2,size*.96,{heading:unit.side==='blue'?-.58:Math.PI+.58});
  return c;
}
function readSave() {
  try{
    const raw=localStorage.getItem(SAVE);
    if(!raw)return {};
    const s=JSON.parse(raw);
    return S.validSave(s)?{s}:{error:'記録を読み込めません。新規作戦を選ぶと記録を作り直せます。'};
  }catch{return {error:'ブラウザの保存領域を読み込めません。'};}
}
function save() {
  try{localStorage.setItem(SAVE,JSON.stringify(state));saveText='このブラウザに保存済み';}
  catch{saveText='保存できませんでした。ブラウザの空き容量と保存設定を確認してください。';}
  $('saved').textContent=saveText;
}
function titleState() {
  scene='title'; clearTimeout(cpuTimer); sound.scene('silent');
  $('game').hidden=true;$('title').hidden=false;$('toTitle').hidden=true;
  const {s,error}=readSave(); $('continue').disabled=!s;
  $('saveInfo').textContent=error|| (s?'保存記録　ラウンド '+s.round+' ・ '+(s.outcome?'作戦終了':s.pending?'出撃直前':sideName(s.turn)+'ターン'):'作戦の進行は、このブラウザに自動保存されます。');
  $('continue').onclick=()=>{const fresh=readSave();if(fresh.s) enter(fresh.s);else titleState();};
}
function resetSelection(){ selected=null;destination=null;target=null;inspected=null;placement=null; }
function enter(s) {
  resetSelection();state=s;scene='strategy';showThreat=false;
  sound.unlock();sound.scene('strategy');$('title').hidden=true;$('game').hidden=false;$('toTitle').hidden=false;
  save();render(); advance();
}
function freshGame() { closeSheet();enter(S.newGame()); }
function dialog(title,closable=true){
  clearTimeout(cpuTimer); dismissible=closable;
  const section=el('section',null,'sheet');const h=el('h2',title);h.id='sheetTitle';section.append(h);
  $('sheet').replaceChildren(section);$('overlay').setAttribute('aria-labelledby','sheetTitle');
  if(!$('overlay').open)$('overlay').showModal();
  return section;
}
function closeSheet(){if($('overlay').open)$('overlay').close();}
function footer(sheet,...buttons){const f=el('div',null,'sheet-actions');f.append(...buttons);sheet.append(f);}
function doneSheet(){closeSheet();if(scene==='strategy')advance();}
$('overlay').addEventListener('cancel',e=>{e.preventDefault();if(dismissible)doneSheet();});
$('newGame').onclick=()=>{
  sound.unlock();
  const {s,error}=readSave();
  if(!s&&!error)return freshGame();
  const box=dialog('新しい作戦を開始しますか？');
  box.append(el('p','現在の作戦記録は、新しい作戦の初期配置に置き換わります。'));
  footer(box,btn('戻る',doneSheet),btn('新しい作戦を開始',freshGame,'primary'));
};
$('toTitle').onclick=()=>{
  const box=dialog('作戦を中断');
  save();box.append(el('p',saveText));footer(box,btn('作戦に戻る',doneSheet),btn('タイトルへ',()=>{closeSheet();titleState();},'primary'));
};
$('settings').onclick=()=>{
  sound.unlock();const box=dialog('音量設定');
  ['BGM','効果音'].forEach((label,i)=>{
    const row=el('label',label),slider=el('input'),value=el('output');
    slider.type='range';slider.min='0';slider.max='100';slider.value=Math.round(levels[i]*100);
    value.textContent=slider.value+'%'; slider.oninput=()=>{
      levels[i]=Number(slider.value)/100;value.textContent=slider.value+'%';sound.volume(...levels);
      try{localStorage.setItem(PREF,JSON.stringify(levels));}catch{}
    };
    if(i===1)slider.onchange=()=>sound.play('select');
    row.append(slider,value);box.append(row);
  });footer(box,btn('閉じる',doneSheet,'primary'));
};
function openingGuide(){
  const box=dialog('中央工場を挟み撃ちにする');
  box.append(el('p','最初のターンに試せる作戦です。盤面と戦闘画面は同じ方向を向いています。'));
  const steps=el('ol');
  for(const s of ['F03のバサルトを選び、中央工場の右隣 H05 へ移動して「待機」。','D05のピケットを選び、工場の左隣 F05 へ。G05の敵バサルトへの「攻撃」を選びます。','参戦線と「自軍2機 対 敵軍1機」を確認。ピケットで出撃すると、バサルトは敵の右側から援護します。'])steps.append(el('li',s));
  box.append(steps,el('p','バサルトを動かす前に同じ攻撃を選べば、単機での出撃になります。'));
  footer(box,btn('盤面に戻る',doneSheet,'primary'));
}
$('opening').onclick=openingGuide;
$('help').onclick=()=>{
  const box=dialog('遊び方');
  const info=[
    ['勝利条件','敵本拠地にロボットで進入し「占領」。30ラウンドが終わったら、工場と本拠地の合計が多い軍が勝ち、同数は引き分けです。'],
    ['盤面の操作','味方機を選び、点灯したマスを選んで命令します。命令確定までは移動先を選び直せます。水色の菱形は味方、朱色の山形は敵、チェックは行動済みです。'],
    ['包囲と戦闘','標的の隣にいる各軍最大2機が援護します。先に待機した味方も参戦。盤面での方角が出撃位置になり、行動終了になるのは攻撃を始めた機体です。'],
    ['機体の操縦','WASD・矢印で移動、Jで射撃、Kで近接、Lでブースト、Qで標的変更。タッチでは左スティックと右のボタンを同時に使えます。敵をタップすると照準が切り替わります。横画面推奨。'],
    ['工場・母艦・成長','自軍の拠点を選んで生産します。完成時に周囲が埋まっていたら空きマスを作って配備。母艦に隣接して「収容」すると、自軍ターンごとに最大HPの約24%を修理します。生還と撃破で経験を得て昇格します。'],
    ['中断と再開','確定した命令ごとに、このブラウザに保存します。交戦途中で閉じた場合は出撃直前から再開します。']
  ];const dl=el('dl');for(const [a,b] of info)dl.append(el('dt',a),el('dd',b));box.append(dl);footer(box,btn('閉じる',doneSheet,'primary'));
};
function chooseUnit(u){
  resetSelection(); selected=u.id;inspected={q:u.q,r:u.r};sound.play('select');render();
}
function placeCells(){
  if(!placement)return [];
  return placement.type==='deploy'?S.deployCells(state,placement.q,placement.r):S.unloadCells(state,placement.carrier);
}
const contains=(cells,q,r)=>cells.some(p=>p.q===q&&p.r===r);
function clickCell(q,r) {
  if(scene!=='strategy'||state.turn!=='blue'||state.pending||state.outcome||$('overlay').open)return;
  if(placement){
    if(!contains(placeCells(),q,r))return;
    const ok=placement.type==='deploy'?S.deploy(state,placement.q,placement.r,q,r):S.unload(state,placement.carrier,placement.cargo,q,r);
    if(ok)changed('deploy');return;
  }
  const u=S.at(state,q,r);
  if(u?.side==='blue' && u.id!==selected){chooseUnit(u);return;}
  if(selected && lookup(selected)?.side==='blue'){
    if(u?.side==='red' && destination && S.commands(state,selected,destination.q,destination.r).attacks.includes(u.id)){
      target=u.id;render();return;
    }
    if(contains(S.reachable(state,selected),q,r)){destination={q,r};inspected={q,r};target=null;sound.play('move');render();return;}
  }
  resetSelection();inspected={q,r};if(u)selected=u.id;render();
}
function command(kind,id){
  const u=lookup(selected),p=destination||u;
  if(!u||!p)return;
  if(S.commit(state,selected,p.q,p.r,kind,id))changed(kind==='wait'?'move':kind);
}
function changed(cue){
  sound.play(cue);resetSelection();save();render();advance();
}
function readiness(u){return u.carrierId?'搭載中':u.acted?'行動済み':'行動可能';}
function hpBlock(box,u){
  const type=S.TYPES[u.kind];
  const head=el('div',null,'row');
  head.append(sprite(u,48),el('h3',type.name));box.append(head,el('p',sideName(u.side)+' ・ '+readiness(u)+' ・ '+S.rank(u.xp)));
  const bar=el('div',null,'hp '+(u.side==='red'?'enemy-hp':'')),fill=el('i');fill.style.width=(100*u.hp/type.hp)+'%';bar.append(fill);
  box.append(bar,el('div','HP '+u.hp+' / '+type.hp+'　移動 '+type.move+'　交戦 '+u.battles+'　撃破 '+u.kills,'stats'));
}
function siteControls(box,site){
  const heading=site.type==='hq'?'本拠地':'工場';
  const s=el('div',null,'order-buttons');box.append(s);
  s.append(el('p',addr(site)+'　'+sideName(site.owner)+heading));
  if(site.owner!=='blue'||state.turn!=='blue')return;
  if(!site.queue){s.append(btn(heading+'で生産する',()=>industry(site)));return;}
  const type=S.TYPES[site.queue.kind];
  s.append(el('p',type.name+'　'+(site.queue.remaining?'完成まで '+site.queue.remaining+' ターン':'完成・出撃待ち')));
  if(!site.queue.remaining){
    const begin=btn('配備先を選ぶ',()=>{resetSelection();placement={type:'deploy',q:site.q,r:site.r};render();});
    begin.disabled=!S.deployCells(state,site.q,site.r).length;s.append(begin);
  }
}
function industry(p){
  const box=dialog(addr(p)+'　機体生産');box.append(el('p','保有資金 '+state.funds.blue+' G。完成した機体は施設の隣に配備されます。'));
  for(const kind of ['scout','line','heavy']){
    const t=S.TYPES[kind],row=el('div',null,'sheet-card'),head=el('div',null,'row');
    head.append(sprite({kind,side:'blue'}),el('b',t.name),el('small',t.price+' G ・ '+t.turns+' ターン'));row.append(head,el('p',t.role));
    const b=btn(state.funds.blue<t.price?'資金不足':t.name+'を生産',()=>{if(S.produce(state,p.q,p.r,kind)){closeSheet();changed('production');}});
    b.disabled=state.funds.blue<t.price;row.append(b);box.append(row);
  }
  footer(box,btn('戻る',doneSheet));
}
function countText(b){const blue=b.fighters.filter(v=>v.side==='blue').length;return '自軍'+blue+'機 対 敵軍'+(b.fighters.length-blue)+'機';}
function renderPanel(){
  const box=$('selection');box.replaceChildren();
  if(state.turn==='red'){box.append(el('h3','敵軍の作戦行動'),el('p',state.lastCpu?.text||'赤環機構が部隊を展開します。'));return;}
  if(placement){box.append(el('h3','出撃先を選択'),el('p','点灯している空きマスを選んでください。'),btn('取り消す',()=>{resetSelection();render();}));return;}
  const u=selected&&lookup(selected),p=inspected&&S.siteAt(state,inspected.q,inspected.r);
  if(!u){
    if(!inspected){box.append(el('h3','部隊を選択'),el('p','盤面の味方機か下の部隊一覧を選び、点灯したマスへ移動してください。'));if(state.round===1)box.append(btn('最初の挟み撃ちを試す',openingGuide));}
    else {box.append(el('h3',addr(inspected)+'　'+(p?terrain[p.type]:terrain[S.terrainAt(inspected.q,inspected.r)])));if(p)siteControls(box,p);}
    return;
  }
  hpBlock(box,u);
  if(u.side==='blue'&&!u.acted&&!u.carrierId){
    const list=el('div',null,'order-buttons');box.append(list);
    if(!destination){
      list.append(el('p','点灯したマスを選択。現在地でも命令できます。'),btn('現在地で命令',()=>{destination={q:u.q,r:u.r};target=null;render();}));
      if(u.kind==='carrier')for(const v of S.cargoOf(state,u.id)){
        const b=btn(S.TYPES[v.kind].name+'を再出撃　HP '+v.hp,()=>{placement={type:'unload',carrier:u.id,cargo:v.id};render();});
        b.disabled=!S.unloadCells(state,u.id).length;list.append(b);
      }
    }else{
      const ops=S.commands(state,u.id,destination.q,destination.r);
      list.append(el('p','移動先 '+addr(destination)+' ・ 命令を選択'));
      if(target){
        const preview=S.previewBattle(state,u.id,destination.q,destination.r,target);
        if(preview){list.append(el('strong',countText(preview),'contact'),btn('攻撃を確定 →',()=>command('attack',target),'primary'),btn('攻撃目標を選び直す',()=>{target=null;render();}));}
      }else{
        for(const id of ops.attacks){const enemy=lookup(id);list.append(btn('攻撃　'+S.TYPES[enemy.kind].name+'　'+addr(enemy),()=>{target=id;render();}));}
        if(ops.capture)list.append(btn('占領',()=>command('capture'),'primary'));
        for(const id of ops.load)list.append(btn('母艦に収容',()=>command('load',id)));
        if(ops.wait)list.append(btn('待機',()=>command('wait')));
      }
      list.append(btn('移動先を選び直す',()=>{destination=null;target=null;inspected={q:u.q,r:u.r};render();}));
    }
  }
  if(p)siteControls(box,p);
}
function renderRoster(){
  const box=$('roster');box.replaceChildren(el('h3','自軍部隊'));
  const list=el('div',null,'fleet');box.append(list);
  for(const u of state.units.filter(v=>v.side==='blue')){
    const b=btn('',()=>chooseUnit(u),'unitline'+(u.id===selected?' active':''));
    b.disabled=state.turn!=='blue';b.append(sprite(u,31),el('b',S.TYPES[u.kind].name),el('span',readiness(u)+' ・ '+u.hp+' HP'));list.append(b);
  }
  if(!list.children.length)list.append(el('p','稼働機なし。自軍拠点から機体を生産できます。'));
}
function render(){
  const player=state.turn==='blue';
  $('round').textContent=String(state.round).padStart(2,'0')+' / 30';
  $('funds').textContent=state.funds.blue+' G';$('income').textContent='+'+S.income(state,'blue')+' G';
  $('turn').textContent=player?'◆ 環潮同盟 ・ 自軍ターン':'▲ 赤環機構 ・ 敵軍ターン';$('turn').classList.toggle('enemy',!player);
  $('missionGoal').textContent='敵本拠地を占領　残り '+(31-state.round)+' ラウンド';
  $('endTurn').disabled=!player||!!state.pending||!!state.outcome;$('opening').disabled=!player;
  $('threat').setAttribute('aria-pressed',String(showThreat));
  const preview=target&&destination&&selected?S.previewBattle(state,selected,destination.q,destination.r,target):null;
  board.render(state,{selectedId:selected,destination,reachable:placement?placeCells():selected?S.reachable(state,selected):[],threats:showThreat?S.threats(state,'red'):[],targetId:target,participants:preview?.fighters,focus:player?inspected:state.lastCpu});
  renderPanel();renderRoster();$('log').replaceChildren(...state.log.slice(-9).reverse().map(s=>el('li',s)));$('saved').textContent=saveText;
}
$('threat').onclick=()=>{showThreat=!showThreat;render();};
$('endTurn').onclick=()=>{
  if(state.turn!=='blue'||state.pending||state.outcome)return;
  const n=state.units.filter(u=>u.side==='blue'&&!u.acted&&!u.carrierId).length;
  const end=()=>{closeSheet();if(S.endTurn(state))changed('move');};
  if(!n){end();return;}
  const box=dialog('自軍ターンを終了しますか？');
  box.append(el('p','まだ '+n+' 機が行動できます。'));footer(box,btn('盤面に戻る',doneSheet),btn('ターンを終了',end,'primary'));
};
function advance(){
  clearTimeout(cpuTimer);
  if(scene!=='strategy'||$('overlay').open||document.hidden)return;
  if(state.outcome){showOutcome();return;}
  if(state.pending){briefing();return;}
  if(state.turn==='red')cpuTimer=setTimeout(()=>{
    if(scene!=='strategy'||document.hidden||$('overlay').open)return;
    if(S.cpuStep(state)){save();render();advance();}
  },750);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(cpuTimer);else if(scene==='strategy')advance();});
function formationCanvas(b){
  const c=el('canvas',null,'formation');c.width=540;c.height=144;c.setAttribute('aria-label','盤面での方角を保った部隊配置');
  const g=c.getContext('2d');
  const center={x:270,y:72};
  g.strokeStyle='#354951';for(let i=1;i<=3;i++){g.beginPath();g.ellipse(center.x,center.y,i*68,i*20,0,0,2*Math.PI);g.stroke();}
  const pos=v=>({x:center.x+v.dx*142,y:center.y+v.dy*57});
  for(const v of b.fighters){const p=pos(v);g.strokeStyle=v.side==='blue'?'#528888':'#98686c';g.setLineDash([3,3]);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(center.x,center.y);g.stroke();}
  g.setLineDash([]);for(const v of b.fighters){const p=pos(v);drawMech(g,v.kind,v.side,p.x,p.y,38,{heading:v.dx>0?Math.PI:0});}
  return c;
}
function briefing(){
  const b=state.pending, allies=b.fighters.filter(v=>v.side==='blue');
  let pilot=allies.find(v=>v.id===b.attackerId||v.id===b.defenderId)?.id||allies[0].id;
  const box=dialog((state.turn==='blue'?'出撃':'防衛出撃')+'　'+terrain[b.terrain],false);
  box.append(el('p',addr(b)+' 交戦　・　'+countText(b)),formationCanvas(b),el('h3','操縦する機体を選択'));
  const buttons=[];
  for(const v of allies){
    const choice=btn('',()=>{pilot=v.id;for(const [id,x] of buttons)x.setAttribute('aria-pressed',String(id===pilot));},'choice');
    const label=el('span',null,'row');label.append(sprite(v,34),el('b',v.name),el('small','HP '+v.hp+' / '+v.maxHp));
    choice.setAttribute('aria-pressed',String(v.id===pilot));choice.append(label);buttons.push([v.id,choice]);box.append(choice);
  }
  box.append(el('p','移動 WASD・矢印　射撃 J　近接 K　ブースト L　標的 Q','hint'));
  footer(box,btn('操縦を開始 →',()=>launch(b,pilot),'primary'));
}
function launch(b,pilotId){
  if(!state.pending||scene!=='strategy')return;
  closeSheet();scene='battle';document.body.classList.add('battle-open');document.querySelector('.topbar').inert=true;$('game').hidden=true;$('arena').hidden=false;
  sound.unlock();sound.scene('battle');sound.play('sortie');
  arena=startBattle($('arena'),b,{pilotId,onSound:cue=>sound.play(cue),onPauseChange:paused=>paused?sound.suspend():sound.resume(),onFinish:(results,detail)=>{
    const report=S.finishBattle(state,b.id,results);
    if(!report)throw new Error('戦闘結果を盤面に反映できませんでした。');
    arena?.destroy();arena=null;$('arena').replaceChildren();$('arena').hidden=true;$('game').hidden=false;document.querySelector('.topbar').inert=false;document.body.classList.remove('battle-open');
    scene='strategy';sound.scene('strategy');resetSelection();save();render();
    const box=dialog('交戦結果',false);box.append(el('p',(detail.reason==='timeout'?'時間切れ':'一方の部隊が全滅')+' ・ 生存機は残りHPを引き継ぎます。'));
    const table=el('table',null,'ledger');const header=table.createTHead().insertRow();for(const h of ['機体','残りHP','撃破数','戦歴'])header.append(el('th',h));
    for(const v of report){const row=table.insertRow();row.append(el('td',(v.side==='blue'?'◆ ':'▲ ')+v.name,v.side),el('td',v.hp+' / '+v.maxHp),el('td',v.kills),el('td',v.destroyed?'撃破された':(v.promoted?'昇格 ・ ':'')+v.rank));}
    box.append(table);footer(box,btn('戦略マップへ',doneSheet,'primary'));
  }});
}
function showOutcome(){
  const o=state.outcome,w=o.winner;
  const box=dialog(w==='blue'?'作戦勝利':w==='red'?'作戦敗北':'引き分け',false);
  sound.scene('silent');sound.play(w==='blue'?'victory':w==='red'?'defeat':'select');
  box.append(el('p',o.reason==='capture'?forces[w]+'が敵本拠地を占領しました。':'30ラウンドが終了しました。保有拠点数による判定です。'));
  for(const side of ['blue','red'])box.append(el('div',forces[side]+'　保有拠点 '+state.sites.filter(p=>p.owner===side).length+'　残存部隊 '+state.units.filter(u=>u.side===side).length,'sheet-card'));
  footer(box,btn('タイトルへ',()=>{closeSheet();titleState();}),btn('もう一度対戦',freshGame,'primary'));
}
titleState();
