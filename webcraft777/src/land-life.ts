import type { Scene } from 'three';
import { NpcWorld } from './npc';
import { NpcView } from './npc-view';
import type { Pose } from './physics';
import { inside,SIZE,type World } from './world';

const replies:Record<string,string> = {
  ナギ:'こんにちは。この坂を下りた先が湖だよ。浅瀬から水の中をのぞいてみて。',
  コハク:'石や木材を集めたら、湖を眺められる小さな家を建ててみない？',
  スミレ:'わたげたちは、草の多い場所がお気に入り。少し待つと草を食べるよ。',
  ハル:'湖で大きな背びれを見かけたら気をつけて。岸に上がれば追ってこないよ。',
};

export class LandLife {
  private readonly simulation:NpcWorld;
  private readonly view:NpcView | null;
  private talkUntil=0;
  private readonly mobile=globalThis.matchMedia?.('(pointer: coarse)').matches??false;

  constructor(world:World,scene:Scene,origin:Pose=world.spawn()){
    this.simulation=new NpcWorld(world);
    if(!this.simulation.introduce(origin)){
      const spawn=world.spawn();
      if(!this.simulation.introduce(spawn)){
        // Existing houses can cover the original clearing. Look for nearby
        // exposed ground without clearing structures or moving the player.
        for(const [dx,dz] of [[-10,-6],[10,-6],[-12,6],[12,6],[0,16],[0,-21]]){
          const x=Math.floor(spawn.x)+dx,z=Math.floor(spawn.z)+dz;
          if(!inside(x,1,z))continue;
          const y=world.highest[x+SIZE*z]+1;
          if(this.simulation.introduce({x:x+.5,y,z:z+.5}))break;
        }
      }
    }
    this.view=this.simulation.entities.length?new NpcView(scene):null;
  }

  update(player:Pose,dt:number,day=.36){
    if(this.talkUntil&&this.simulation.clock>=this.talkUntil){
      this.simulation.talk(null);
      this.talkUntil=0;
    }
    this.simulation.step(dt,player,this.mobile);
    this.view?.update(this.simulation,player,day,this.mobile);
  }

  targetLabel(player:Pose,blockDistance?:number){
    const target=this.simulation.target(player,blockDistance);
    if(!target)return null;
    const kind=target.kind==='villager'?'住民':target.kind==='sheep'?'羊':'牛';
    return target.name+'（'+kind+'）';
  }

  interact(player:Pose){
    const target=this.simulation.target(player);
    if(!target)return null;
    if(target.kind==='villager'){
      this.simulation.talk(target.id,player);
      this.talkUntil=this.simulation.clock+3.5;
      return target.name+'「'+(replies[target.name]??'こんにちは。いい天気だね。')+'」';
    }
    return target.name+(target.kind==='sheep'?'「メェー」':'「モー」');
  }

  occupies(x:number,y:number,z:number){return this.simulation.overlapsBlock(x,y,z);}

  dispose(){
    this.view?.dispose();
    this.simulation.dispose();
  }
}
