import {getProduction,MAX_UNITS_PER_TEAM} from './engine.mjs?v=20261109-production';
import {drawUnitIcon} from './renderer.mjs?v=20261108-combat';

const names={hq:'本部',factory:'工場',airfield:'飛行場'};
const money=value=>Number(value).toLocaleString('ja-JP');

// Derive the player's catalogue from the same validation used to spend gold.
// No new save fields, cached prices or separate purchasing rules are introduced.
export function getPlayerProduction(state,siteKey=null,unitType=null,{enabled=true}={}){
  const funds=state.funds[0],sites=[];
  for(let i=0;i<state.tiles.length;i++){
    const tile=state.tiles[i];if(tile.owner!==0||!names[tile.building])continue;
    const x=i%state.width,y=Math.floor(i/state.width),occupant=state.units.find(u=>u.x===x&&u.y===y);
    sites.push({key:`${x},${y}`,x,y,building:tile.building,occupant,label:`${names[tile.building]} · ${x+1}, ${y+1}`,options:getProduction(state,x,y)});
  }
  const site=sites.find(s=>s.key===siteKey)||sites.find(s=>s.options.some(o=>o.available))||sites.find(s=>!s.occupant)||sites[0]||null;
  const gate=state.winner!==null?'作戦は終了しています。':state.turn!==0?'CPUの行動中です。自分の番に生産できます。':!enabled?'作戦開始後、自分の番に生産できます。':'';
  const options=(site?.options||[]).map(o=>({...o,available:!gate&&o.available,reason:gate||o.reason}));
  const option=options.find(o=>o.type===unitType)||options.find(o=>o.available)||options[0]||null;
  const count=state.units.filter(u=>u.team===0).length;
  return {funds,sites,site,options,option,count,limit:MAX_UNITS_PER_TEAM,canPurchase:Boolean(option?.available),afterFunds:option?funds-option.cost:funds,reason:gate||option?.reason||(!site?'生産できる味方の拠点がありません。':'')};
}

export function createProductionController({document=globalThis.document,getState,isEnabled=()=>true,onProduce,onOpen=()=>{},onClose=()=>{},onLocate=()=>{},drawIcon=drawUnitIcon}={}){
  const $=id=>document.getElementById(id),dialog=$('productionDialog');
  let siteKey=null,unitType=null,purchasing=false,notice='';
  const el=(tag,text,className)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;};
  const view=()=>getPlayerProduction(getState(),siteKey,unitType,{enabled:isEnabled()});
  function render(){
    if(!dialog)return null;
    const model=view();siteKey=model.site?.key||null;unitType=model.option?.type||null;
    $('productionFunds').textContent=`${money(model.funds)} G`;
    const select=$('productionSiteSelect');select.replaceChildren(...model.sites.map(s=>{const node=el('option',`${s.label}${s.occupant?'（部隊あり）':''}`);node.value=s.key;return node;}));
    if(!model.sites.length){const node=el('option','味方の生産拠点がありません');node.value='';select.append(node);}
    select.value=siteKey||'';select.disabled=!model.sites.length;
    $('productionSiteStatus').textContent=model.site?`${model.site.building==='airfield'?'航空部隊':'地上部隊'}を生産 · 自軍 ${model.count} / ${model.limit} 部隊${model.site.occupant?' · 出撃先に部隊がいます。先に別のマスへ移動させてください。':' · 生産した部隊はこの拠点に出撃します。'}`:model.reason;
    const list=$('productionUnitList');list.replaceChildren();
    for(const option of model.options){
      const card=el('button',undefined,'production-unit-card');card.type='button';card.dataset.available=String(option.available);card.setAttribute('aria-pressed',String(option.type===unitType));
      const icon=el('canvas',undefined,'production-unit-icon');icon.width=96;icon.height=80;icon.setAttribute('aria-hidden','true');
      const copy=el('span',undefined,'production-unit-copy');copy.append(el('strong',option.name,'production-unit-name'),el('span',`${money(option.cost)} G`,'production-unit-price'),el('small',option.available?'生産できます':option.reason,'production-unit-state'));card.append(icon,copy);
      card.addEventListener('click',()=>{unitType=option.type;notice='';render();const current=[...list.children].find(c=>c.getAttribute('aria-pressed')==='true');current?.focus({preventScroll:true});});list.append(card);
      try{drawIcon(icon,option.type,0,{time:0});}catch{/* Text and prices remain usable if Canvas is unavailable. */}
    }
    const preview=$('productionPreview');preview.replaceChildren();
    if(model.option){
      preview.append(el('h3',model.option.name),el('p',model.option.description));
      const stats=el('dl',undefined,'production-preview-stats');
      for(const [title,value] of [['生産費用',`${money(model.option.cost)} G`],['生産後の残金',model.afterFunds>=0?`${money(model.afterFunds)} G`:`${money(-model.afterFunds)} G 不足`],['部隊のHP','10 / 10'],['行動開始','次の自分の番']]){const row=el('div');row.append(el('dt',title),el('dd',value));stats.append(row);}preview.append(stats);
    }else preview.append(el('p','この作戦で生産できる部隊がありません。'));
    const message=$('productionMessage');message.textContent=notice||model.reason||'部隊と出撃先を確認して、生産を確定してください。';if(!notice)message.dataset.kind=model.reason?'error':'info';
    $('confirmProductionButton').disabled=purchasing||!model.canPurchase;$('confirmProductionButton').textContent=model.option?`${model.option.name}を生産 · ${money(model.option.cost)} G`:'この部隊を生産';
    $('locateProductionButton').disabled=!model.site;
    return model;
  }
  function open(preferredSite=null){
    if(!dialog||!isEnabled())return false;
    siteKey=preferredSite?`${preferredSite.x},${preferredSite.y}`:null;unitType=null;notice='';render();if(!dialog.open)dialog.showModal();onOpen();return true;
  }
  function purchase(){
    if(purchasing||!dialog?.open)return false;
    const model=view();if(!model.canPurchase){notice='';render();return false;}
    purchasing=true;let ok=false;
    try{ok=onProduce({type:'produce',x:model.site.x,y:model.site.y,unitType:model.option.type})===true;}finally{purchasing=false;}
    notice=ok?`${model.option.name}を生産しました。${money(model.option.cost)} Gを使用。次の自分の番から行動できます。`:'生産できませんでした。拠点と残金を確認してください。';
    $('productionMessage').dataset.kind=ok?'success':'error';render();return ok;
  }
  $('confirmProductionButton')?.addEventListener('click',purchase);
  $('productionSiteSelect')?.addEventListener('change',()=>{siteKey=$('productionSiteSelect').value;unitType=null;notice='';render();});
  $('closeProductionButton')?.addEventListener('click',()=>dialog.close());
  $('locateProductionButton')?.addEventListener('click',()=>{const site=view().site;if(!site)return;dialog.close();onLocate({x:site.x,y:site.y});});
  dialog?.addEventListener('close',()=>{if(!dialog.open)onClose();});
  return {open,render,purchase,isOpen:()=>Boolean(dialog?.open)};
}
