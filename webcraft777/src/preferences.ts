export type QualityName = 'low'|'standard'|'high'|'legacy'
export const presets = {
  low: {distance:2,scale:.7,shadows:false,vegetation:false,effects:false},
  standard: {distance:3,scale:1,shadows:true,vegetation:true,effects:true},
  high: {distance:5,scale:1.2,shadows:true,vegetation:true,effects:true},
} as const
export const defaults = {...presets.standard,quality:'standard' as QualityName, sensitivity:1, volume:.45, muted:false,
  effectsVolume:.85,ambientVolume:.4,invertY:false,bob:true,sprintFov:true}
export interface Settings {
  distance:number; scale:number; shadows:boolean; quality:QualityName; vegetation:boolean; effects:boolean;
  sensitivity:number; volume:number; muted:boolean; effectsVolume:number; ambientVolume:number;
  invertY:boolean; bob:boolean; sprintFov:boolean
}
const within=(n:unknown,a:number,b:number)=>typeof n==='number'&&Number.isFinite(n)&&n>=a&&n<=b
export function validSettings(value:unknown):value is Settings {
  if(!value||typeof value!=='object')return false
  const s=value as Settings
  return (s.quality==='legacy'||Object.hasOwn(presets,s.quality))&&Number.isInteger(s.distance)&&within(s.distance,2,6)&&within(s.scale,.5,1.5)&&
    within(s.sensitivity,.3,2.5)&&[s.volume,s.effectsVolume,s.ambientVolume].every(v=>within(v,0,1))&&
    [s.shadows,s.vegetation,s.effects,s.muted,s.invertY,s.bob,s.sprintFov].every(v=>typeof v==='boolean')
}
export function upgradeSettings(value:unknown):Settings {
  if (!value || typeof value!=='object') throw Error('保存された設定を読み込めません。')
  // Saved scale 1 used a 1.2 MP reference in release 1. Keep its fill cost until the player chooses a new preset.
  const s={...defaults,quality:'legacy' as QualityName,...value}
  if(!validSettings(s))throw Error('保存された設定の値が正しくありません。')
  return s
}
