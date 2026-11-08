// Game-calendar income only. No wall clock, networking, or game-state mutation.
export const DAY_TURNS=60;
export const DAY_WAIT_COST=20;
export const BUILDINGS=Object.freeze([
  Object.freeze({id:'cottage',name:'庭付き貸家',cost:160,rent:6,description:'1日6Gの家賃。増築で最大18G。'}),
  Object.freeze({id:'workshop',name:'職人の工房',cost:340,rent:12,description:'1日12Gの家賃。増築で最大36G。'})
]);
const buildings=Object.assign(Object.create(null),Object.fromEntries(BUILDINGS.map(building=>[building.id,building])));
export const landCost=state=>120+80*state.plots.length;
export const rentTotal=state=>state.plots.reduce((total,plot)=>total+(buildings[plot.building]?.rent??0)*plot.level,0);
// The starting plot is free. Only purchased, unbuilt plots earn land income;
// a built plot pays its building rent instead, never both kinds of income.
export const landIncome=state=>state.plots.slice(1).filter(plot=>!plot.building).length;
export const dividendTotal=state=>Object.values(state.stocks).reduce((total,shares)=>total+Math.floor(shares/10),0);
export function dailyIncome(state){
  const rent=rentTotal(state),land=landIncome(state),dividend=dividendTotal(state);
  return{rent,land,dividend,total:rent+land+dividend};
}
export function upgradeCost(state,index){
  const plot=state.plots[index],building=buildings[plot?.building];
  return building?Math.round(building.cost*.8*plot.level):0;
}
