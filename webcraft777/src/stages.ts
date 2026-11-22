export type TerrainPreset = 'classic' | 'flat' | 'lake' | 'school' | 'frontier' | 'park' | 'crossing'

export const TERRAIN_PRESETS = [
  {id:'classic', name:'森と湖', detail:'森や洞窟を探検できる、にぎやかなワールド。', thumbnail:'./art/stage-classic.webp'},
  {id:'flat', name:'まっさらな平地', detail:'木や建物のない草原。自由な建築に。', thumbnail:'./art/stage-flat.webp'},
  {id:'lake', name:'湖だけ', detail:'小さな砂島から出発。湖の中で魚に出会えます。', thumbnail:'./art/stage-lake.webp'},
  {id:'school', name:'学校', detail:'教室や階段に隠れ、廊下を回り込んで逃げよう。', thumbnail:'./art/stage-school.webp'},
  {id:'frontier', name:'西部の町', detail:'荒野と湖に囲まれた町。家を建て、保安官と町を守ろう。', thumbnail:'./art/stage-frontier.webp'},
  {id:'park', name:'みどりの大公園', detail:'大滑り台、ブランコ、巨大アスレチック、4人乗りシーソー。', thumbnail:'./art/stage-park.webp'},
  {id:'crossing', name:'渋谷スクランブル', detail:'大きな交差点と路地。広場からビルの間へ逃げ込もう。', thumbnail:'./art/stage-crossing.webp'},
] as const satisfies readonly {id:TerrainPreset;name:string;detail:string;thumbnail:string}[]

export function validTerrainPreset(value:unknown):value is TerrainPreset {
  return TERRAIN_PRESETS.some(stage=>stage.id===value)
}

export function stageSupportsBots(mode:unknown,stage:unknown):boolean {
  return mode==='cops'?(stage==='park'||stage==='crossing'):mode==='tag'&&(stage==='flat'||stage==='school')
}
