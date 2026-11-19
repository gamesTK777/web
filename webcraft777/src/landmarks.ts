export type Landmark = {kind:"grove"|"cave"|"ruin";name:string;x:number;y:number;z:number};
type TerrainTools = {
  ground(x:number,z:number):number;
  get(x:number,y:number,z:number):number;
  put(x:number,y:number,z:number,id:number):void;
  noise(x:number,z:number):number;
};

// All construction is baked into generator 2 before chunk occupancy is indexed.
export function makeLandmarks(t: TerrainTools): Landmark[] {
  const vary = (i:number) => Math.floor(t.noise(i,777)*9)-4;
  const sites = [
    {kind:"grove",name:"風待ちの大樹",x:91+vary(1),z:150+vary(2)},
    {kind:"cave",name:"潮晶の岩窟",x:163+vary(3),z:151+vary(4)},
    {kind:"ruin",name:"潮見の回廊",x:117+vary(5),z:188+vary(6)},
  ] as const;
  const landmarks = sites.map(s=>({...s,y:Math.max(31,Math.min(48,t.ground(s.x,s.z)))+1}));
  const surface = (x:number,z:number,top:number,cap:number,clear:number) => {
    const old = t.ground(x,z);
    for (let y=Math.min(old,top)-3; y<=top; y++) t.put(x,y,z,y===top ? cap : y>=top-2 ? 2 : 3);
    for (let y=top+1; y<=Math.max(clear,old+10); y++) t.put(x,y,z,0);
  };
  for (const s of landmarks) {
    const floor=s.y-1;
    const destX = s.kind==="cave" ? s.x-3 : s.x;
    const destZ = s.kind==="grove" ? s.z-3 : s.kind==="ruin" ? s.z-5 : s.z;
    // A continuous, gently graded trail leaves the initial terrace intact.
    const steps=Math.max(Math.abs(destX-128),Math.abs(destZ-139));
    for (let i=2;i<=steps;i++) {
      const u=i/steps;
      const x=Math.round(128+(destX-128)*u), z=Math.round(139+(destZ-139)*u);
      // Taper into both level aprons so the landmark's wider footprint cannot
      // overwrite the last steps with a two-block lip on very high hills.
      const grade=Math.min(1,Math.max(0,i-5)/(steps-12));
      const y=32+Math.round((floor-32)*grade);
      for (let dx=-1;dx<=1;dx++) for (let dz=-1;dz<=1;dz++) {
        const cap=dx===0 && dz===0 && t.noise(x,z)>.68 ? 8 : 1;
        surface(x+dx,z+dz,y,cap,y+3);
      }
    }
    if (s.kind==="grove") {
      for (let dx=-6;dx<=6;dx++) for (let dz=-6;dz<=6;dz++)
        if (dx*dx+dz*dz<38) surface(s.x+dx,s.z+dz,floor,1,floor+13);
      for (let dx=0;dx<2;dx++) for (let dz=0;dz<2;dz++)
        for (let y=1;y<=12;y++) t.put(s.x+dx,floor+y,s.z+dz,5);
      for (const [dx,dz,r,h] of [[-3,0,4,10],[3,0,4,11],[0,-3,3,11],[0,3,4,12],[0,0,4,14]]) {
        for (let b=1;b<=3;b++) t.put(s.x+Math.round(dx*b/3),floor+h-3+b,s.z+Math.round(dz*b/3),5);
        for (let x=-r;x<=r;x++) for (let z=-r;z<=r;z++) for (let y=-2;y<=2;y++) {
          if ((x*x+z*z)/(r*r)+y*y/5>1.12+t.noise(x+s.x,z+s.z)*.12) continue;
          if (!t.get(s.x+dx+x,floor+h+y,s.z+dz+z)) t.put(s.x+dx+x,floor+h+y,s.z+dz+z,6);
        }
      }
      for (const [dx,dz] of [[-1,0],[2,1],[0,-1],[1,2]]) t.put(s.x+dx,floor+1,s.z+dz,5);
    } else if (s.kind==="cave") {
      for (let dx=-3;dx<=20;dx++) for (let dz=-9;dz<=9;dz++) {
        const x=s.x+dx,z=s.z+dz;
        const dome=Math.max(0,1-((dx-8)/13)**2-(dz/9)**2);
        if (!dome && (dx>2||Math.abs(dz)>3)) continue;
        const height=floor+Math.round(dome*8);
        surface(x,z,height,1,height+4);
        for (let y=floor-2;y<height;y++) t.put(x,y,z,3);
        if (dx>=-3 && dx<=15) {
          const width = dx<4 ? 1 : dx<13 ? 3 : 2;
          if (Math.abs(dz)<=width) {
            t.put(x,floor,z,t.noise(x,z)>.72 ? 8 : 3);
            for (let h=1;h<=(width===3 ? 4 : 3);h++) t.put(x,floor+h,z,0);
          }
        }
      }
      // Exposed veins sit one cell outside the walkable gallery.
      for (const [dx,dy,dz] of [[5,1,-4],[6,2,-4],[7,2,-4],[9,1,4],[10,2,4],[11,1,4],[14,1,-3],[16,2,0]])
        t.put(s.x+dx,floor+dy,s.z+dz,23);
      for (const [dx,dy,dz] of [[1,1,-2],[2,2,-2],[3,1,2]]) t.put(s.x+dx,floor+dy,s.z+dz,11);
    } else {
      for (let dx=-5;dx<=5;dx++) for (let dz=-5;dz<=5;dz++) {
        const x=s.x+dx,z=s.z+dz;
        const rim=Math.max(Math.abs(dx),Math.abs(dz))===5;
        const cap=rim && t.noise(x,z)<.45 ? 8 : Math.abs(dx)<2 && dz%3===0 ? 26 : 9;
        surface(x,z,floor,cap,floor+9);
      }
      for (const dx of [-4,4]) for (const dz of [-3,0,3]) {
        const height=dz===3 ? 5 : 2+Math.floor(t.noise(s.x+dx,s.z+dz)*3);
        for (let h=1;h<=height;h++) t.put(s.x+dx,floor+h,s.z+dz,h===1 ? 8 : 9);
      }
      for (let dx=-4;dx<=4;dx++) t.put(s.x+dx,floor+5,s.z+3,dx===0 ? 26 : 9);
    }
  }
  return landmarks;
}
