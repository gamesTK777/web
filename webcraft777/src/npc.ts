import { HEIGHT,SIZE,scatter,isSolid, type World } from './world.ts';
import { eyeHeight,raycast,type Pose } from './physics.ts';
import { cell,clearBody,distanceXZ,findPath,grounded,navKey,stepsFrom,type Footprint,type Point } from './npc-path.ts';

export type NpcKind='sheep'|'cow'|'villager';
export type NpcRecord=Point & {
  id:string;kind:NpcKind;name:string;color:number;yaw:number;home:Point;
};
export const npcShape:Record<NpcKind,Footprint>={
  sheep:{radius:.43,height:1.22},cow:{radius:.48,height:1.43},villager:{radius:.32,height:1.81}
};
function pointValid({x,y,z}:Point):boolean {
  return [x,y,z].every(Number.isFinite)&&x>=0&&x<SIZE&&z>=0&&z<SIZE&&y>=1&&y<HEIGHT;
}

type Activity='idle'|'walk'|'eat'|'talk';
type Motion={mode:Activity;path:Point[];due:number;seq:number;vy:number;stride:number;grazing:number};
const appearance:[NpcKind,string,number,number,number][]=[
  ['villager','ナギ',0x4d8d84,.6,-4],['sheep','わたげ',0xf4ead2,-2,-5],['cow','もみじ',0x7c4536,4,-5],
  ['villager','コハク',0xc28543,5,-2],['sheep','ミルク',0xe7e0cf,-5,-5],['cow','カカオ',0x5f4a42,6,1],
  ['villager','スミレ',0x9b779d,-4,2],['sheep','ゆき',0xf2e1c5,-6,-1],['cow','くるみ',0x525661,7,3],
  ['villager','ハル',0xa26450,2,5],['sheep','こむぎ',0xeac899,-2,6],['cow','あずき',0x9b5940,5,7]
];
type Ground = Pick<World,'get'|'salt'|'onEdit'>;

function nearFloor(w:Ground,p:Point,shape:Footprint):Point|null {
  const c=cell(p);
  for(const dy of [0,-1,1,-2,2,-3,3]){
    const q={...c,y:c.y+dy};
    if(clearBody(w,q,shape,true)&&grounded(w,q,shape))return q;
  }
  return null;
}

// Find naturally surfaced, open-air spots connected by ordinary walking to the
// bell. Never edit a voxel to make room for the flock.
function paddock(w:Ground,near:Point):Point[] {
  const b={radius:.48,height:1.81},start=nearFloor(w,near,b);
  if(!start)return [];
  const visited=new Set<string>(),queue=[start],open:Point[]=[];
  const key=(p:Point)=>p.x+'/'+p.y+'/'+p.z;
  visited.add(key(start));
  for(let i=0;i<queue.length&&i<440;i++){
    const p=queue[i],x=Math.floor(p.x),z=Math.floor(p.z);
    if(distanceXZ(p,near)>=2.8 && [1,2,3,4,8].includes(w.get(x,p.y-1,z))){
      let roof=false;
      for(let y=p.y+2;y<HEIGHT;y++)if(isSolid(w.get(x,y,z))){roof=true;break;}
      if(!roof)open.push(p);
    }
    for(const n of stepsFrom(w,p,b)){
      const k=key(n);
      if(Math.abs(n.x-start.x)>11||Math.abs(n.z-start.z)>11||visited.has(k))continue;
      visited.add(k);queue.push(n);
    }
  }
  return open;
}

function facing(n:Point,p:Point){return Math.atan2(n.x-p.x,n.z-p.z);}
function rayBox(origin:Point,dir:Point,n:NpcRecord):number {
  const {radius,height}=npcShape[n.kind];
  let enter=0,exit=4.25;
  for(const axis of ['x','y','z'] as const){
    const lo=n[axis]-(axis==='y'?0:radius),hi=n[axis]+(axis==='y'?height:radius);
    if(Math.abs(dir[axis])<1e-9){
      if(origin[axis]<lo||origin[axis]>hi)return Infinity;
    }else{
      const a=(lo-origin[axis])/dir[axis],b=(hi-origin[axis])/dir[axis];
      enter=Math.max(enter,Math.min(a,b));exit=Math.min(exit,Math.max(a,b));
      if(exit<enter)return Infinity;
    }
  }
  return enter;
}

export class NpcWorld {
  readonly active:NpcRecord[]=[];
  readonly entities:NpcRecord[]=[];
  clock=0;
  visualRevision=0;
  private readonly motions=new Map<string,Motion>();
  private readonly unsubscribe:()=>void;
  private nextList=0;
  private lastViewer:Point|null=null;
  private nextPlan=0;
  private cursor=0;
  private talking:string|null=null;
  private lastMobile:boolean|undefined;
  constructor(private world:Ground){
    this.unsubscribe=world.onEdit((x,y,z)=>{
      for(const n of this.entities){
        const m=this.motions.get(n.id)!;
        const near=(p:Point)=>Math.abs(p.x-(x+.5))<1.51 && Math.abs(p.z-(z+.5))<1.51 &&
          y>=Math.floor(p.y)-2 && y<Math.ceil(p.y+npcShape[n.kind].height)+1;
        if(!near(n)&&!m.path.some(near))continue;
        m.path=[];m.due=0;
      }
    });
  }
  private track(n:NpcRecord){
    this.motions.set(n.id,{mode:'idle',path:[],due:this.clock+1.8+this.motions.size*.31,seq:this.motions.size*57+1,
      vy:0,stride:0,grazing:0});
  }
  introduce(near:Point & {yaw?:number}):boolean {
    if(this.entities.length||!pointValid(near))return false;
    const choices=paddock(this.world,near),group:NpcRecord[]=[];
    const yaw=Number.isFinite(near.yaw)?near.yaw!:0,cos=Math.cos(yaw),sin=Math.sin(yaw);
    for(const [index,[kind,name,color,dx,dz]] of appearance.entries()){
      const width=index===0?.7:2.8;
      const a=dx+(scatter(index,12,this.world.salt)-.5)*width;
      const b=dz+(scatter(index,73,this.world.salt)-.5)*width;
      const gx=near.x+a*cos+b*sin,gz=near.z-a*sin+b*cos;
      let best:Point|undefined,score=Infinity;
      for(const p of choices){
        if(group.some(n=>distanceXZ(n,p)<1.75))continue;
        let d=(gx-p.x)**2+(gz-p.z)**2+3*(near.y-p.y)**2;
        if(index===0){
          const vx=p.x-near.x,vz=p.z-near.z;
          const forward=-sin*vx-cos*vz,lateral=Math.abs(cos*vx-sin*vz);
          // Put the first resident inside even a narrow portrait viewport.
          if(forward<2.8||lateral>forward*.26)d+=75;
        }
        if(d<score){score=d;best=p;}
      }
      if(!best)return false;
      const angle=facing(best,near)+.48*(index%2?-1:1);
      group.push({...best,id:kind+'-'+this.world.salt.toString(36)+'-'+index,name,kind,color,
        yaw:Math.atan2(Math.sin(angle),Math.cos(angle)),
        home:{...best}});
    }
    this.entities.push(...group);this.visualRevision++;
    for(const n of group)this.track(n);
    this.refreshActive(near,false);
    return true;
  }
  private refreshActive(p:Point,mobile:boolean){
    const maxRange=mobile?27:43,near=this.entities.filter(n=>Math.hypot(n.x-p.x,n.z-p.z,n.y-p.y)<maxRange)
      .sort((a,b)=>distanceXZ(a,p)-distanceXZ(b,p));
    this.active.length=0;
    let animals=0,residents=0;
    for(const n of near){
      if(n.kind==='villager'){if(residents>=4)continue;residents++;}
      else{if(animals>=8)continue;animals++;}
      this.active.push(n);
    }
    this.lastMobile=mobile;this.lastViewer={...p};this.nextList=this.clock+.35;
  }
  talk(id:string|null,player?:Point){
    this.talking=id;this.visualRevision++;
    if(!id)return;
    const n=this.entities.find(s=>s.id===id&&s.kind==='villager');
    if(n){const m=this.motions.get(id)!;m.mode='talk';m.path=[];if(player)n.yaw=facing(n,player);}
  }
  overlapsBlock(x:number,y:number,z:number):boolean {
    return this.entities.some(n=>{
      const b=npcShape[n.kind];
      return x<n.x+b.radius && x+1>n.x-b.radius && z<n.z+b.radius && z+1>n.z-b.radius &&
        y<n.y+b.height && y+1>n.y+.00001;
    });
  }
  target(p:Pose,blockDistance?:number):NpcRecord|null {
    if(![p.x,p.y,p.z,p.yaw,p.pitch].every(Number.isFinite))return null;
    const occluder=blockDistance??raycast(this.world,p,4.25)?.distance??Infinity;
    let distance=Math.min(4.250001,occluder-.0001),next:NpcRecord|null=null;
    const c=Math.cos(p.pitch),dir={x:-Math.sin(p.yaw)*c,y:Math.sin(p.pitch),z:-Math.cos(p.yaw)*c};
    const eye={x:p.x,y:p.y+eyeHeight(p),z:p.z};
    for(const n of this.entities){
      const t=rayBox(eye,dir,n);
      if(t<distance){distance=t;next=n;}
    }
    return next;
  }
  motion(n:NpcRecord){return this.motions.get(n.id)!;}
  castsContactShadow(n:NpcRecord){
    if(Math.abs(n.y-Math.round(n.y))>.003)return false;
    const r=npcShape[n.kind].radius*.82,y=Math.round(n.y)-1;
    return [-r,r].every(dx=>[-r,r].every(dz=>isSolid(this.world.get(Math.floor(n.x+dx),y,Math.floor(n.z+dz)))));
  }

  private plan(n:NpcRecord,m:Motion,p:Point,deadline:number){
    m.seq++;
    const a=scatter(m.seq,42,this.world.salt),b=scatter(m.seq,81,this.world.salt);
    m.due=this.clock+2.5+a*3;
    const playerClose=distanceXZ(n,p)<1.05&&Math.abs(n.y-p.y)<1.8;
    if(!playerClose&&b<.28){
      m.path=[];m.mode=this.grazes(n)?'eat':'idle';m.grazing=this.clock+.9+a;
      n.yaw=Math.atan2(Math.sin(n.yaw+(a-.5)*.55),Math.cos(n.yaw+(a-.5)*.55));return;
    }
    let goal:Point;
    if(playerClose){
      const theta=facing(p,n);
      goal={x:n.x-Math.sin(theta)*2.5,y:n.y,z:n.z-Math.cos(theta)*2.5};
    }else{
      const range=n.kind==='villager'?4.2:5.5;
      goal={x:n.home.x+Math.cos(a*6.28)*(.9+b*range),y:n.home.y,z:n.home.z+Math.sin(a*6.28)*(.9+b*range)};
    }
    const occupied=new Set<number>();
    for(const other of this.active)if(other!==n)occupied.add(navKey(other));
    m.path=findPath(this.world,n,goal,npcShape[n.kind],deadline,occupied);
    m.mode=m.path.length?'walk':'idle';
  }

  private grazes(n:NpcRecord){
    return n.kind!=='villager'&&this.world.get(Math.floor(n.x),Math.floor(n.y-.01),Math.floor(n.z))===1;
  }
  private move(n:NpcRecord,m:Motion,dt:number,p:Point){
    const b=npcShape[n.kind],w=this.world;
    if(!clearBody(w,n,b))return;
    // Separate gravity from voluntary travel: a removed floor drops even a
    // stationary, eating or talking resident.
    if(!grounded(w,n,b)){
      m.vy=Math.max(-15,m.vy-22*dt);
      const landing={x:n.x,z:n.z,y:n.y+m.vy*dt};
      if(clearBody(w,landing,b))n.y=landing.y;
      else{n.y=Math.ceil(landing.y-.00001);m.vy=0;}
    }else{n.y=Math.round(n.y);m.vy=0;}
    if(!grounded(w,n,b)||!m.path.length)return;
    const step=m.path[0],dist=distanceXZ(n,step);
    if(dist<.025){m.path.shift();if(!m.path.length)m.mode='idle';return;}
    const speed=n.kind==='villager'?.95:1.12;
    const t=Math.min(1,speed*dt/dist),next={x:n.x+(step.x-n.x)*t,y:n.y,z:n.z+(step.z-n.z)*t};
    const nearPlayer=(q:Point)=>Math.abs(q.y-p.y)<1.75 && distanceXZ(q,p)<b.radius+.31;
    if(nearPlayer(next)&&distanceXZ(next,p)<=distanceXZ(n,p))return;
    const crowd=this.active.some(other=>other!==n && Math.abs(other.y-n.y)<1.4 &&
      distanceXZ(other,next)<npcShape[other.kind].radius+b.radius &&
      distanceXZ(other,next)<distanceXZ(other,n)-.000001);
    if(crowd){m.path=[];m.mode='idle';m.due=this.clock+.5;return;}
    if(!clearBody(w,next,b,true)){
      const raised={...next,y:n.y+1};
      if(step.y!==n.y+1||!clearBody(w,{...n,y:n.y+1},b,true)||!clearBody(w,raised,b,true)){
        m.path=[];m.mode='idle';return;
      }
      next.y=raised.y;
    }
    // Never voluntarily walk over a pit or into liquid. Falling after mining
    // follows the normal gravity branch above.
    const floor=nearFloor(w,next,b);
    if(!floor || floor.y<next.y-1){m.path=[];m.mode='idle';return;}
    n.yaw=facing(n,step);Object.assign(n,next);m.stride=(m.stride+speed*dt*6)%(Math.PI*2);
  }

  step(elapsed:number,p:Point,mobile:boolean){
    if(!Number.isFinite(elapsed)||elapsed<=0||![p.x,p.y,p.z].every(Number.isFinite))return;
    const dt=Math.min(.1,elapsed);
    this.clock+=dt;
    if(this.clock>=this.nextList||this.lastMobile!==mobile||!this.lastViewer||distanceXZ(p,this.lastViewer)>3)this.refreshActive(p,mobile);
    const now=this.clock,size=this.active.length;
    if(!size)return;
    const deadline=performance.now()+(mobile?1.0:1.8);
    let budget=now>=this.nextPlan?(mobile?1:2):0;
    const substeps=Math.ceil(dt*60);
    for(let j=0;j<size;j++){
      const n=this.active[(j+this.cursor)%size],m=this.motions.get(n.id)!;
      if(this.talking===n.id){m.path=[];m.mode='talk';n.yaw=facing(n,p);}
      else if(m.grazing>now){m.path=[];m.mode=this.grazes(n)?'eat':'idle';}
      else{
        if(!m.path.length)m.mode='idle';
        if(budget>0&&now>=m.due&&performance.now()<deadline && !m.path.length){
          this.plan(n,m,p,deadline);budget--;this.nextPlan=now+(mobile?.07:.045);
        }
      }
      for(let s=0;s<substeps;s++)this.move(n,m,dt/substeps,p);
    }
    this.cursor=(this.cursor+1)%size;
  }
  dispose(){this.unsubscribe();this.active.length=0;this.motions.clear();}
}
