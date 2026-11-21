export type TerrainPreset = 'classic' | 'flat' | 'lake'

export const TERRAIN_PRESETS = [
  {id:'classic', name:'森と湖', detail:'森や洞窟を探検できる、にぎやかなワールド。', thumbnail:'./art/stage-classic.webp'},
  {id:'flat', name:'まっさらな平地', detail:'木や建物のない草原。自由な建築に。', thumbnail:'./art/stage-flat.webp'},
  {id:'lake', name:'湖だけ', detail:'小さな砂島から出発。湖の中で魚に出会えます。', thumbnail:'./art/stage-lake.webp'},
] as const satisfies readonly {id:TerrainPreset;name:string;detail:string;thumbnail:string}[]

export function validTerrainPreset(value:unknown):value is TerrainPreset {
  return TERRAIN_PRESETS.some(stage=>stage.id===value)
}
