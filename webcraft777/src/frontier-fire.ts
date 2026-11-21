import { HEIGHT, SIZE, inside, voxelIndex, type World } from './world.ts'

export type FireRecord = {key:number;material:number;age:number;spread:boolean}
export const frontierFireSpread=180
const limit=96
const fuel=new Set([5,6,7])
const neighbors=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]] as const
const interval=.2
const duration=(material:number)=>material===6?3.4:4.8

export function firePosition(key:number){
  return {x:key%SIZE,y:key>>>16,z:(key>>>8)%SIZE}
}

export function validFireRecords(value:unknown):value is FireRecord[]{
  if(!Array.isArray(value)||value.length>limit)return false
  const seen=new Set<number>()
  for(const flame of value){
    if(!flame||!Number.isInteger(flame.key)||flame.key<SIZE*SIZE||flame.key>=SIZE*SIZE*HEIGHT||
      seen.has(flame.key)||!Number.isInteger(flame.material)||flame.material<1||flame.material>33||
      flame.material===13||!Number.isFinite(flame.age)||flame.age<0||flame.age>=5||
      typeof flame.spread!=='boolean')return false
    seen.add(flame.key)
  }
  return true
}

type Terrain=Pick<World,'get'|'set'|'salt'>

export class FrontierFire{
  private readonly flames=new Map<number,FireRecord>()
  private pending=0
  private spreadLeft=frontierFireSpread

  constructor(private readonly world:Terrain){}

  get count(){return this.flames.size}
  get budget(){return this.spreadLeft}
  records(){return this.flames.values()}

  has(x:number,y:number,z:number){return this.flames.has(voxelIndex(x,y,z))}

  ignite(x:number,y:number,z:number,decorative=true){
    if(!Number.isInteger(x)||!Number.isInteger(y)||!Number.isInteger(z)||y<1||!inside(x,y,z))return false
    const key=voxelIndex(x,y,z),material=this.world.get(x,y,z)
    if(this.flames.has(key)||this.flames.size>=limit||!material||material===13||(!decorative&&!fuel.has(material)))return false
    if(!this.flames.size)this.spreadLeft=frontierFireSpread
    this.flames.set(key,{key,material,age:0,spread:false})
    return true
  }

  extinguish(x:number,y:number,z:number){return this.flames.delete(voxelIndex(x,y,z))}

  step(dt:number){
    if(!Number.isFinite(dt)||dt<=0)return
    this.pending+=Math.min(dt,.25)
    while(this.pending>=interval){
      this.pending-=interval
      const active=[...this.flames.values()]
      let spreadBudget=Math.min(this.spreadLeft,9)
      for(const record of active){
        const {x,y,z}=firePosition(record.key)
        if(this.world.get(x,y,z)!==record.material){this.flames.delete(record.key);continue}
        record.age+=interval
        const burns=fuel.has(record.material)
        if(burns&&!record.spread&&record.age>=1.2&&spreadBudget>0){
          record.spread=true
          const start=((record.key^this.world.salt)>>>0)%neighbors.length
          for(let i=0;i<neighbors.length&&spreadBudget>0;i++){
            const [dx,dy,dz]=neighbors[(start+i)%neighbors.length]
            if(this.ignite(x+dx,y+dy,z+dz,false)){spreadBudget--;this.spreadLeft--}
          }
        }
        if(record.age>=(burns?duration(record.material):2.2)){
          this.flames.delete(record.key)
          if(burns)this.world.set(x,y,z,0)
        }
      }
    }
  }

  save():FireRecord[]{return Array.from(this.flames.values(),record=>({...record}))}

  restore(records:readonly FireRecord[],budget=frontierFireSpread){
    this.pending=0
    this.spreadLeft=budget
    this.flames.clear()
    for(const record of records){
      const {x,y,z}=firePosition(record.key)
      if(this.world.get(x,y,z)===record.material)this.flames.set(record.key,{...record})
    }
  }
}
