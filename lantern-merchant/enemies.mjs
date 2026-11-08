// Original creatures of the Lantern Labyrinth. Stable IDs keep version-1 saves valid.
export const MAX_FLOOR=10;
const definitions = [
  {id:'moss',name:'苔玉',firstFloor:1,behavior:'hunter',baseHp:5,hpPerFloor:3,baseAttack:1,defense:0,baseXp:5,description:'苔をまとった丸い魔物。近づくと1歩ずつ追ってくる。'},
  {id:'sprout',name:'芽狐',firstFloor:1,behavior:'shy',baseHp:4,hpPerFloor:2,baseAttack:1,defense:0,baseXp:4,description:'若葉の尾を持つ小さな狐。6マス以内でこちらに気づく。'},
  {id:'cap',name:'灯茸',firstFloor:1,behavior:'slow',baseHp:6,hpPerFloor:3,baseAttack:1,defense:0,baseXp:6,description:'傘の灯りが目印のきのこ。移動は1ターンおき。'},
  {id:'moth',name:'夜羽',firstFloor:1,behavior:'hunter',baseHp:5,hpPerFloor:3,baseAttack:1,defense:0,baseXp:5,description:'夜色の羽で漂う魔物。地形に沿って近づいてくる。'},
  {id:'bat',name:'月蝙蝠',firstFloor:2,behavior:'watcher',baseHp:3,hpPerFloor:3,baseAttack:1,defense:0,baseXp:5,description:'月模様の耳を持つ蝙蝠。10マス先の足音も聞きつける。'},
  {id:'shell',name:'潮殻',firstFloor:2,behavior:'slow',baseHp:7,hpPerFloor:3,baseAttack:1,defense:1,baseXp:6,description:'水色の硬い殻を背負う魔物。守りが堅く、移動は1ターンおき。'},
  {id:'wisp',name:'迷い灯',firstFloor:2,behavior:'glimmer',baseHp:4,hpPerFloor:2,baseAttack:0,defense:0,baseXp:6,description:'迷宮を漂う小さな灯火。1ターンおきに、直線2マス先へ淡い光を放つ。'},
  {id:'golem',name:'鉱殻',firstFloor:3,behavior:'hunter',baseHp:10,hpPerFloor:3,baseAttack:2,defense:1,baseXp:5,description:'鉱石で体を守る重い魔物。高い体力と硬い殻を持つ。'},
  {id:'thorn',name:'茨猪',firstFloor:3,behavior:'charge',baseHp:8,hpPerFloor:3,baseAttack:2,defense:0,baseXp:7,description:'茨の背を持つ猪。3ターンに1度、2歩近づく。移動した直後には攻撃しない。'},
  {id:'crab',name:'銅鋏',firstFloor:3,behavior:'sideways',baseHp:6,hpPerFloor:3,baseAttack:1,defense:2,baseXp:7,description:'銅の鋏で身を守る蟹。横歩きを好み、硬い甲羅で攻撃を受け止める。'},
  {id:'owl',name:'書梟',firstFloor:4,behavior:'glimmer',baseHp:5,hpPerFloor:3,baseAttack:1,defense:0,baseXp:7,description:'古い書を抱える梟。1ターンおきに、直線2マス先へ紙の羽を飛ばす。'},
  {id:'mimic',name:'宝箱もどき',firstFloor:4,behavior:'ambush',baseHp:11,hpPerFloor:3,baseAttack:2,defense:1,baseXp:10,description:'宝箱の姿に潜む魔物。3マス以内に近づくまではじっと待つ。'},
  {id:'lizard',name:'熾蜥蜴',firstFloor:4,behavior:'hunter',baseHp:7,hpPerFloor:3,baseAttack:2,defense:0,baseXp:8,description:'熾火の尾を持つ蜥蜴。炎のような勢いで1歩ずつ追ってくる。'},
  {id:'knight',name:'空鎧',firstFloor:5,behavior:'slow',baseHp:14,hpPerFloor:3,baseAttack:3,defense:2,baseXp:12,description:'誰も着ていない古い鎧。移動は1ターンおきだが、接近戦では強敵。'},
  {id:'boss',name:'灯晶の番人',firstFloor:MAX_FLOOR,behavior:'guardian',baseHp:65,hpPerFloor:0,baseAttack:11,defense:3,baseXp:100,boss:true,description:'地下10階で暁の種を守る番人。結晶の鎧と強い一撃に備えよう。'},
];
export const ENEMY_TYPES=Object.freeze(definitions.map(definition=>Object.freeze({...definition})));
export const ENEMY_BY_ID=Object.freeze(Object.assign(Object.create(null),Object.fromEntries(ENEMY_TYPES.map(type=>[type.id,type]))));
export function enemiesForFloor(floor){return ENEMY_TYPES.filter(type=>!type.boss&&type.firstFloor<=floor);}
export function enemyStats(kind,floor){
  const type=ENEMY_BY_ID[kind];if(!type)throw new Error('Unknown creature kind');
  const f=Math.max(1,Math.min(MAX_FLOOR,Math.trunc(floor)||1));
  // Apply the deep-floor curve only when creatures are generated. Loading an
  // expedition retains each saved enemy's serialized combat values.
  if(type.boss&&f===MAX_FLOOR)return{hp:180,attack:30,defense:8,xp:300};
  const depthRank=type.boss?0:Math.max(0,f-6);
  return{hp:type.baseHp+type.hpPerFloor*f+depthRank*8,attack:type.baseAttack+(type.boss?0:f)+depthRank*3,defense:type.defense+depthRank,xp:type.baseXp+(type.boss?0:f*3)+depthRank*5};
}
