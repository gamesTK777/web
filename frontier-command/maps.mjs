// Original campaign maps. The terrain and building layer share one flat tile array.
export const MISSIONS=Object.freeze([
  {id:1,name:'はじまりの草原',subtitle:'FIRST CONTACT',width:12,height:10,briefing:'少数の部隊で前線へ。歩兵と偵察車を連携させ、敵本部を目指そう。',objective:'敵本部を占領、または敵部隊を全滅させる',hint:'森や都市で守り、弱った敵へ集中攻撃。歩兵だけが拠点を占領できます。',funds:3000,allowedUnits:['infantry','recon'],parDays:12},
  {id:2,name:'ふたつの橋',subtitle:'BRIDGEHEAD',width:14,height:11,briefing:'川向こうの工場を攻略する。中立都市を確保し、生産のための資金を増やそう。',objective:'占領と生産で戦線を広げ、敵本部を制圧する',hint:'工場を選ぶと生産できます。占領は通常2回必要。橋を塞ぐ部隊に注意。',funds:6000,allowedUnits:['infantry','recon','tank','artillery'],parDays:18},
  {id:3,name:'緑の峡谷',subtitle:'FOREST CORRIDOR',width:16,height:12,briefing:'山と森が進路を分ける峡谷。砲兵の射程と、地形の防御を使い分けよう。',objective:'地形を利用して敵の防衛線を突破する',hint:'砲兵は2〜3マス先へ攻撃できますが、移動した日は撃てません。',funds:8000,allowedUnits:['infantry','recon','tank','heavy','artillery','antiair'],parDays:22},
  {id:4,name:'群島の空',subtitle:'SKY OVER ISLANDS',width:16,height:12,briefing:'空から部隊が迫る。対空車と戦闘機で制空権を守り、橋を越えて進軍しよう。',objective:'陸と空の部隊を連携させ、敵本部を占領する',hint:'戦闘機は航空部隊専用。ヘリは地上に強く、対空車に弱い兵科です。',funds:10000,allowedUnits:['infantry','recon','tank','heavy','artillery','antiair','fighter','helicopter'],parDays:24},
  {id:5,name:'暁のフロンティア',subtitle:'THE FINAL FRONT',width:18,height:13,briefing:'すべての部隊が集う最後の作戦。街を守り、補給線を育て、自分だけの戦術で勝利を。',objective:'総力戦に勝利し、フロンティアに平和を取り戻す',hint:'敵の主力に相性の良い兵科を生産。占領中の歩兵をほかの部隊で守ろう。',funds:12000,allowedUnits:['infantry','recon','tank','heavy','artillery','antiair','fighter','helicopter'],parDays:28}
]);

function grid(width,height){return Array.from({length:width*height},()=>({terrain:'plain',building:null,owner:null,capture:20,capturingTeam:null,capturingUnitId:null}));}
function make(meta){
  const tiles=grid(meta.width,meta.height),units=[];
  const at=(x,y)=>tiles[y*meta.width+x];
  const set=(x,y,terrain)=>{if(x>=0&&y>=0&&x<meta.width&&y<meta.height)at(x,y).terrain=terrain;};
  const line=(x1,y1,x2,y2,terrain)=>{if(x1===x2){for(let y=Math.min(y1,y2);y<=Math.max(y1,y2);y++)set(x1,y,terrain);}else if(y1===y2){for(let x=Math.min(x1,x2);x<=Math.max(x1,x2);x++)set(x,y1,terrain);}};
  const grove=(points,terrain='forest')=>points.forEach(([x,y])=>set(x,y,terrain));
  const building=(x,y,type,owner=null)=>{const tile=at(x,y);tile.terrain='plain';tile.building=type;tile.owner=owner;};
  const unit=(team,type,x,y)=>units.push({id:`u${units.length+1}`,type,team,x,y,hp:10,moved:false,acted:false});
  return {meta,tiles,units,at,set,line,grove,building,unit};
}

export function buildMission(missionId=1){
  const meta=MISSIONS.find(m=>m.id===Number(missionId));
  if(!meta)throw Error('作戦が見つかりません。');
  const m=make(meta),{line,grove,building:b,unit:u,set}=m;
  if(meta.id===1){
    line(1,5,10,5,'road');line(5,3,5,6,'road');
    grove([[2,2],[3,2],[3,3],[4,7],[7,2],[8,2],[8,7],[9,7],[2,7],[9,3]]);
    grove([[0,0],[1,0],[0,1],[10,9],[11,9],[11,8]],'sea');
    b(1,5,'hq',0);b(10,4,'hq',1);b(2,5,'city',0);b(9,4,'city',1);b(5,3,'city');b(6,6,'city');
    u(0,'infantry',2,4);u(0,'infantry',2,6);u(0,'recon',3,5);
    u(1,'infantry',9,3);u(1,'infantry',9,5);u(1,'recon',8,4);
  }else if(meta.id===2){
    line(7,0,7,10,'river');line(1,8,12,8,'road');line(2,4,12,4,'road');line(12,2,12,8,'road');line(2,4,2,8,'road');set(7,4,'bridge');set(7,8,'bridge');
    grove([[4,2],[5,2],[4,3],[4,6],[5,6],[9,5],[10,5],[9,9],[10,9],[1,1],[2,1]]);
    grove([[5,0],[6,0],[8,10],[9,10]],'mountain');
    b(1,8,'hq',0);b(12,2,'hq',1);b(2,8,'factory',0);b(11,2,'factory',1);b(3,6,'city',0);b(10,4,'city',1);b(5,3,'city');b(8,7,'city');b(5,9,'city');b(9,1,'city');
    u(0,'infantry',3,8);u(0,'infantry',3,9);u(0,'tank',3,7);u(0,'artillery',2,7);
    u(1,'infantry',10,2);u(1,'infantry',10,1);u(1,'tank',11,3);u(1,'artillery',12,3);
  }else if(meta.id===3){
    line(8,0,8,11,'river');line(1,9,14,9,'road');line(1,5,14,5,'road');line(2,5,2,9,'road');line(13,2,13,9,'road');set(8,5,'bridge');set(8,9,'bridge');
    grove([[6,2],[6,3],[6,4],[6,7],[6,8],[9,2],[9,3],[9,4],[9,7],[9,8],[5,2],[10,8]],'mountain');
    grove([[3,3],[4,3],[4,4],[5,4],[3,7],[4,7],[10,5],[10,6],[11,6],[11,9],[12,9],[12,7],[13,7],[5,10],[6,10]]);
    b(1,9,'hq',0);b(14,2,'hq',1);b(2,9,'factory',0);b(13,2,'factory',1);b(3,8,'city',0);b(12,3,'city',1);b(3,5,'city');b(7,6,'city');b(10,9,'city');b(12,5,'city');b(6,5,'factory');
    u(0,'infantry',3,9);u(0,'infantry',2,8);u(0,'tank',4,9);u(0,'recon',4,8);u(0,'artillery',3,10);
    u(1,'infantry',12,2);u(1,'infantry',13,3);u(1,'tank',11,2);u(1,'recon',11,3);u(1,'artillery',12,1);
  }else if(meta.id===4){
    line(7,0,7,11,'sea');line(8,0,8,11,'sea');line(1,9,14,9,'road');line(2,5,13,5,'road');line(2,5,2,9,'road');line(13,2,13,9,'road');set(7,5,'bridge');set(8,5,'bridge');set(7,9,'bridge');set(8,9,'bridge');
    grove([[3,3],[4,3],[5,4],[4,7],[5,7],[10,3],[10,4],[11,7],[12,7],[11,9],[3,10],[12,1]]);
    grove([[5,0],[6,0],[5,1],[10,10],[9,11],[10,11]],'mountain');
    b(1,9,'hq',0);b(14,2,'hq',1);b(2,9,'factory',0);b(13,2,'factory',1);b(1,7,'airfield',0);b(14,4,'airfield',1);b(4,5,'city');b(11,5,'city');b(5,9,'city');b(10,9,'city');b(3,8,'city',0);b(12,3,'city',1);
    u(0,'infantry',3,9);u(0,'infantry',3,8);u(0,'tank',4,9);u(0,'antiair',3,7);u(0,'helicopter',2,6);u(0,'fighter',1,6);u(0,'artillery',2,10);
    u(1,'infantry',12,2);u(1,'infantry',12,3);u(1,'tank',11,2);u(1,'antiair',12,4);u(1,'helicopter',13,5);u(1,'fighter',14,5);u(1,'artillery',13,1);
  }else{
    line(8,0,8,12,'river');line(1,10,16,10,'road');line(2,6,15,6,'road');line(2,3,15,3,'road');line(2,3,2,11,'road');line(15,1,15,10,'road');set(8,3,'bridge');set(8,6,'bridge');set(8,10,'bridge');
    grove([[5,3],[6,3],[5,4],[6,4],[11,8],[12,8],[11,9],[12,9],[5,11],[6,11],[11,1],[12,1]],'mountain');
    grove([[3,2],[4,2],[4,5],[5,5],[6,7],[6,8],[10,4],[11,4],[12,5],[13,7],[14,8],[3,8],[3,11],[14,1]]);
    grove([[0,0],[1,0],[0,1],[17,12],[16,12],[17,11]],'sea');
    b(1,10,'hq',0);b(16,2,'hq',1);b(2,9,'factory',0);b(15,3,'factory',1);b(2,11,'airfield',0);b(15,1,'airfield',1);b(3,10,'city',0);b(14,2,'city',1);b(4,6,'city');b(7,3,'city');b(9,6,'city');b(12,3,'city');b(13,10,'city');b(5,10,'factory');b(10,2,'factory');
    u(0,'infantry',3,9);u(0,'infantry',3,10);u(0,'tank',4,9);u(0,'heavy',4,10);u(0,'recon',4,8);u(0,'artillery',3,11);u(0,'antiair',2,8);u(0,'helicopter',1,8);u(0,'fighter',2,7);
    u(1,'infantry',14,3);u(1,'infantry',14,2);u(1,'tank',13,3);u(1,'heavy',13,2);u(1,'recon',13,4);u(1,'artillery',14,1);u(1,'antiair',15,4);u(1,'helicopter',16,4);u(1,'fighter',15,5);
  }
  return {meta,width:meta.width,height:meta.height,tiles:m.tiles,units:m.units};
}
