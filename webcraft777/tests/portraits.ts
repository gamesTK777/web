// A synthetic photo world. All landscapes, roofs, glazing and lamps use real game voxels.
import {runJourney} from "./journey-scenario";
import {SceneView} from "../src/renderer";
import {aimFrom} from "./scenario-world";
const run=runJourney(),w=run.world;
const grove=w.landmarks.find(l=>l.kind==="grove")!,cave=w.landmarks.find(l=>l.kind==="cave")!,ruin=w.landmarks.find(l=>l.kind==="ruin")!;
const put=(x:number,y:number,z:number,id:number)=>w.set(x,y,z,id);
// A glass-fronted fishing lodge at the south shore; its deck sits on grounded piers.
for(let z=119;z<=128;z++)for(let x=132;x<=145;x++){
  for(let y=30;y<41;y++)put(x,y,z,0);
  const frame=(x===133||x===143)&&(z===121||z===127);
  if(frame)for(let y=24;y<=34;y++)put(x,y,z,5);
  if(x>=133&&x<=143&&z>=121&&z<=127){
    put(x,30,z,7);
    if(x===133||x===143||z===121||z===127)for(let y=31;y<=33;y++)
      put(x,y,z,frame?5:y===31?9:10);
  }
  if(x>=133&&x<=143&&z<121){put(x,30,z,7);if(x===133||x===143)for(let y=25;y<30;y++)put(x,y,z,5);}
  const roof=34+Math.max(0,4-Math.abs(124-z));
  if(x<=144)put(x,roof,z,z===124?5:8);
  if((x===133||x===143)&&z>=121&&z<=127)for(let y=34;y<roof;y++)put(x,y,z,7);
}
for(const [x,z,id] of [[133,119,25],[143,119,12],[138,122,25],[141,126,12]]){
  put(x,31,z,id);
}
for(let x=135;x<=140;x+=2)put(x,30,120,26);
put(138,31,121,0);put(138,32,121,0);put(135,31,126,21);put(136,31,126,22);
// A small lookout window sits in the lake, with water and glass in one sightline.
for(let x=125;x<=129;x++)for(let y=26;y<=29;y++)put(x,y,116,y===26?9:10);
// Opposite shaded walls display the two craftable lamp colours and their falloff.
put(cave.x+8,cave.y+1,cave.z-3,25);put(cave.x+12,cave.y+1,cave.z+3,12);
for(let x=5;x<=14;x+=2)put(cave.x+x,cave.y-1,cave.z,26);
const c=document.querySelector("canvas")!,view=new SceneView(c,w);
view.configure({distance:5,scale:1.25,quality:"high",effects:true,shadows:true,vegetation:true});
type Shot={title:string;pose:ReturnType<typeof aimFrom>;day:number};
const frame=(title:string,p:number[],a:number[],day:number):Shot=>({title,pose:aimFrom({x:p[0],y:p[1],z:p[2]},{x:a[0],y:a[1],z:a[2]}),day});
const g=grove,f=grove.y,r=ruin,m=cave;
const shots:Record<string,Shot>={
  panorama:frame("大樹と入江",[g.x-20,f+7,g.z+4],[g.x+8,f+4,g.z-10],.39),
  highgrove:frame("風待ちの大樹",[g.x-15,f+7,g.z+9],[g.x+5,f+7,g.z-4],.42),
  outlook:frame("森と湖の展望",[g.x-22,f+15,g.z+4],[g.x+5,f+6,g.z-11],.41),
  meadow:frame("湖畔の木組みの家",[120.5,32,104.5],[141,32,127],.40),
  lodge:frame("潮晶で飾った湖畔の拠点",[129.5,33,111.5],[138.5,32,124.5],.40),
  dusk:frame("拠点の宵灯り",[129.5,32,109.5],[138.5,32,124.5],.745),
  night:frame("星明かりの水辺",[126.5,31.5,111.5],[138.5,32,124.5],.96),
  gallery:frame("潮晶の岩窟の二色灯",[m.x+4.1,m.y+.06,m.z+.45],[m.x+12,m.y+1.6,m.z+.1],.42),
  underwater:frame("浅瀬から見る朝霧ガラス",[122.5,26.30,111.5],[128,28.5,116],.46),
  window:frame("窓ガラス越しの入江",[134.5,31.1,124.5],[132.5,29,110],.41),
  ruin:frame("潮見の回廊",[r.x-6,r.y+3,r.z-10],[r.x,r.y+2,r.z+3],.69)
};
const sleepFrame=()=>new Promise<void>(r=>requestAnimationFrame(()=>r()));
async function photo(key:string){
  const s=shots[key];if(!s)throw Error("不明な場面");
  // A camera move may bring a different set of four nearby lights into range.
  view.update(s.pose,null,s.day,.25);
  for(let i=0;i<320 && view.stats.queued;i++){view.update(s.pose,null,s.day,0);if(i%9===0)await sleepFrame();}
  view.update(s.pose,null,s.day,0);c.getContext("webgl2")!.finish();
  return {title:s.title,pose:s.pose,day:s.day,seed:run.seed,width:c.width,height:c.height};
}
if(new URLSearchParams(location.search).has("photo"))document.body.classList.add("photo");
const select=document.querySelector("select")!;
for(const [id,s] of Object.entries(shots)){const o=document.createElement("option");o.text=s.title;o.value=id;select.add(o);}
select.onchange=()=>{void photo(select.value)};
document.querySelector("button")!.onclick=async()=>{
  await photo(select.value);const a=document.createElement("a");a.href=c.toDataURL("image/webp",.92);a.download=select.value+".webp";a.click();
};
Object.assign(window,{photoWorld:{photo,keys:Object.keys(shots)}});
await photo("panorama");
