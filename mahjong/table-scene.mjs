import * as THREE from './vendor/three-table.mjs';
import { makeTableArt } from './table-art.mjs';

// Local +Z is the printed face of a standing tile. Table +Z is the player's seat.
const W = 1.02, H = 1.43, D = .64;
const OWN = 1.14, CPU = .94, WARE = .64, RIVER = .70, CPU_RIVER = .79;
// After two 13-tile hands are dealt, 96 live tiles and the 14-tile dead wall remain.
const NEAR_STACKS = 27, FAR_LIVE_STACKS = 21, DEAD_STACKS = 7;
const WALL_CAPACITY = (NEAR_STACKS + FAR_LIVE_STACKS) * 2;
const WALL_STEP = .70, DEAD_GAP = .28, WALL_Z = 4.64;
const FAR_START = -((FAR_LIVE_STACKS + DEAD_STACKS - 1) * WALL_STEP + DEAD_GAP) / 2;
const UP = new THREE.Vector3(0, 1, 0), X = new THREE.Vector3(1, 0, 0);
const validTile = id => Number.isInteger(id) && id >= 0 && id < 34;
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function rotation(tilt = 0, yaw = 0) {
  return new THREE.Quaternion().setFromAxisAngle(UP, yaw)
    .multiply(new THREE.Quaternion().setFromAxisAngle(X, tilt));
}
function tile(key, id, x, y, z, tilt, yaw, scale, shade = 1) {
  return { key, id, p: new THREE.Vector3(x,y,z), q: rotation(tilt,yaw), scale, shade };
}
function facePlate() {
  const w = W/2-.038, h = H/2-.038, r = .08;
  const s = new THREE.Shape();
  s.moveTo(-w+r,-h); s.lineTo(w-r,-h); s.quadraticCurveTo(w,-h,w,-h+r);
  s.lineTo(w,h-r); s.quadraticCurveTo(w,h,w-r,h); s.lineTo(-w+r,h);
  s.quadraticCurveTo(-w,h,-w,h-r); s.lineTo(-w,-h+r); s.quadraticCurveTo(-w,-h,-w+r,-h);
  const geometry = new THREE.ShapeGeometry(s,4);
  const uv = geometry.attributes.uv, pt = geometry.attributes.position;
  for(let i=0;i<uv.count;i++) uv.setXY(i,(pt.getX(i)/w+1)/2,(pt.getY(i)/h+1)/2);
  return geometry;
}

export function createTableScene(canvas, {onPick,onHover,onReady,onUnavailable} = {}) {
  const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setClearColor(0x101c1d, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(36,1,.2,78);
  camera.position.set(0,16.8,17.5);
  camera.lookAt(0,.24,1.12);
  camera.updateMatrixWorld();
  const art = makeTableArt(THREE);
  const geometries = new Set(), materials = new Set(), textures = new Set(), batches = [];
  const keep = geometry => { geometries.add(geometry); return geometry; };
  function finish(color,roughness=.58,metalness=0) {
    const m = new THREE.MeshStandardMaterial({color,roughness,metalness});
    materials.add(m); return m;
  }
  const ink=finish(0x192a2b,.48), brass=finish(0xc89a50,.36,.52);
  const bronze=finish(0x6d4a29,.55,.27), enamel=finish(0x234745,.37);
  const honey=finish(0x9c602e,.44), bone=finish(0xe7d6a5,.5), red=finish(0x9c3631);
  const pip=finish(0x23343c), dieFace=finish(0xffeccb,.35);
  function solid(geometry,material,x,y,z) {
    const mesh=new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true;
    scene.add(mesh); return mesh;
  }
  function box(x,y,z,w,h,d,material,r=.045) {
    return solid(keep(new THREE.RoundedBoxGeometry(w,h,d,2,r)),material,x,y,z);
  }
  function disc(x,y,z,r,h,material,segments=18) {
    return solid(keep(new THREE.CylinderGeometry(r,r,h,segments)),material,x,y,z);
  }
  scene.add(new THREE.HemisphereLight(0xfff7e9,0x7b9a97,1.26));
  const key = new THREE.DirectionalLight(0xffefd9,2.07);
  key.position.set(-7,16,6); scene.add(key); key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);
  Object.assign(key.shadow.camera,{left:-15,right:15,top:13,bottom:-13,near:.5,far:45});
  key.shadow.normalBias=.018; key.shadow.bias=-.00035;
  const fill=new THREE.DirectionalLight(0xc0ebe7,.68);
  fill.position.set(7,7,-7); scene.add(fill);
  const ceilingLight=new THREE.PointLight(0xffebcf,38,24,2);
  ceilingLight.position.set(-3.3,6.3,1.1);
  scene.add(ceilingLight);

  // Behind the table, warm shoji lights and a low timber dado establish a room
  // without adding text or controls to the playing surface.
  scene.background=new THREE.Color(0x182221);
  const flooring=finish(0x182321,.90), panel=finish(0x23312d,.81);
  const timber=finish(0x372b24,.76), molding=finish(0x574030,.72);
  const floor=solid(keep(new THREE.PlaneGeometry(74,62)),flooring,0,-1.52,0);
  floor.rotation.x=-Math.PI/2;floor.castShadow=false;
  box(0,2.9,-9.6,58,9.3,.30,panel,.04);
  box(0,-1.29,-9.20,58,.50,.34,timber,.045);
  box(0,-1.02,-9.15,58,.08,.41,molding,.035);
  const lanternCanvas=document.createElement('canvas');
  lanternCanvas.width=256;lanternCanvas.height=96;
  const lc=lanternCanvas.getContext('2d');
  const light=lc.createRadialGradient(119,70,5,125,50,155);
  light.addColorStop(0,'#d5a061');light.addColorStop(.58,'#a0764c');light.addColorStop(1,'#5e4c3b');
  lc.fillStyle=light;lc.fillRect(0,0,256,96);
  lc.fillStyle='rgba(255,227,170,.04)';
  for(let y=0;y<96;y+=3)lc.fillRect(0,y,256,1);
  const glowMap=new THREE.CanvasTexture(lanternCanvas);
  glowMap.colorSpace=THREE.SRGBColorSpace;textures.add(glowMap);
  const paper=new THREE.MeshBasicMaterial({map:glowMap});materials.add(paper);
  const windowPane=keep(new THREE.PlaneGeometry(7.55,4.16));
  for(const x of [-9.4,9.4]){
    box(x,1.18,-9.33,7.94,4.50,.25,timber,.06);
    const pane=solid(windowPane,paper,x,1.18,-9.195);pane.castShadow=false;
    for(let i=-3;i<=3;i++)box(x+i*.98,1.18,-9.15,.085,4.19,.10,timber,.022);
    for(let i=-2;i<=2;i++)box(x,1.18+i*.78,-9.13,7.62,.07,.14,timber,.022);
  }
  for(let i=-4;i<=4;i++)box(i*1.03,2.54,-9.35,.10,7.22,.18,timber,.025);
  for(const x of [-9.4,9.4])for(const z of [-5.5,5.5])box(x,-1.20,z,1,.62,1,timber,.12);

  // Lacquered apron, brass piping and an inset upholstered playing surface.
  box(0,-.76,0,22.64,.58,14.75,ink,.24);
  box(0,-.57,0,22.72,.14,14.83,bronze,.065);
  box(0,-.32,0,22.80,.52,14.91,art.wood,.18);
  box(0,-.142,0,22.60,.13,14.70,brass,.064);
  box(0,-.083,0,22.48,.15,14.56,art.wood,.073);
  box(0,-.032,0,21.34,.108,13.46,bronze,.052);
  box(0,.003,0,21.20,.094,13.32,art.felt,.047);
  for(const x of [-10.97,10.97]) for(const z of [-7.05,7.05]){
    disc(x,.004,z,.082,.025,brass);
    box(x,.019,z,.081,.007,.012,bronze,.003).rotation.y=.65;
  }
  // Compact dice well, surrounded by a metal lip. The middle lane stays clear for the rivers.
  box(0,.089,0,2.65,.14,1.34,brass,.067);
  box(0,.146,0,2.54,.18,1.23,ink,.085);
  box(0,.217,0,2.30,.085,1.00,enamel,.04);
  const dotGeo=keep(new THREE.CircleGeometry(.033,10));
  function dots(x,y,z,offsets,normal,mat) {
    for(const [a,b] of offsets) {
      const d=solid(dotGeo,mat,x+(normal==='side'?0:a),y+(normal==='top'?0:b),z+(normal==='top'?b:normal==='side'?a:0));
      if(normal==='top') d.rotation.x=-Math.PI/2;
      if(normal==='side') d.rotation.y=Math.PI/2;
      d.castShadow=false;
    }
  }
  for(const [x,z,n] of [[-.28,.08,4],[.25,-.06,1]]) {
    const y=.445, a=.090;
    box(x,y,z,.355,.355,.355,dieFace,.065);
    dots(x,y+.179,z,n===1?[[0,0]]:[[-a,-a],[a,a],[a,-a],[-a,a]],'top',n===1?red:pip);
    dots(x,y,z+.179,[[-a,-a],[a,a]],'front',pip);
    dots(x+.179,y,z,[[-a,-a],[0,0],[a,a]],'side',pip);
  }
  // Short ivory scoring sticks rest in the two open corners.
  function stick(x,y,z,mark,angle=0) {
    const group = new THREE.Group();
    const rod=box(0,0,0,1.72,.080,.13,bone,.032); group.add(rod);
    const positions=mark===red?[0]:[-.24,-.12,0,.12,.24];
    for(const a of positions) group.add(disc(a,.041,0,.032,.009,mark,12));
    group.position.set(x,y,z);group.rotation.y=angle;scene.add(group);
    return group;
  }
  stick(-9.05,.116,5.98,pip,-.08); stick(-9.14,.118,6.20,red,.07);
  stick(9.03,.116,-5.86,pip,-.13); stick(9.07,.118,-6.10,red,.02);
  const deposits=[stick(0,.116,.82,red),stick(0,.116,-.82,red)];
  deposits.forEach(m=>{m.visible=false;});
  const discardMark = box(0,.055,0,CPU_RIVER*W+.08,.012,CPU_RIVER*H+.08,finish(0xffd479),.005);
  discardMark.castShadow = false;

  const plate=keep(facePlate());
  function batch(geo,material,capacity=170,cast=false,receive=true) {
    const mesh=new THREE.InstancedMesh(geo,material,capacity);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.count=0;mesh.frustumCulled=false;mesh.castShadow=cast;mesh.receiveShadow=receive;
    batches.push(mesh);scene.add(mesh);return mesh;
  }
  const body=batch(keep(new THREE.RoundedBoxGeometry(W,H,D-.115,2,.084)),art.ivory,200,true);
  const heel=batch(keep(new THREE.RoundedBoxGeometry(W-.014,H-.014,.185,2,.061)),honey,200,true);
  const backs=batch(plate,art.back,200);
  const faces=art.faces.map(m=>batch(plate,m,14));
  // A soft contact shadow anchors even the upright hand to the felt at low resolutions.
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=48;
  const context=shadowCanvas.getContext('2d'), wash=context.createRadialGradient(24,24,0,24,24,24);
  wash.addColorStop(0,'rgba(8,24,24,.44)');wash.addColorStop(.5,'rgba(8,24,24,.23)');wash.addColorStop(1,'rgba(8,24,24,0)');
  context.fillStyle=wash;context.fillRect(0,0,48,48);
  const smap=new THREE.CanvasTexture(shadowCanvas);textures.add(smap);
  const shadeMat=new THREE.MeshBasicMaterial({map:smap,transparent:true,depthWrite:false,toneMapped:false});
  materials.add(shadeMat);
  const shadows=batch(keep(new THREE.PlaneGeometry(1,1)),shadeMat,200,false,false);
  const shadowRotation=rotation(-Math.PI/2), backRotation=rotation(0,Math.PI);
  const matrix=new THREE.Matrix4(), poseMatrix=new THREE.Matrix4();
  const bodyLocal=new THREE.Matrix4().makeTranslation(0,0,.0575);
  const heelLocal=new THREE.Matrix4().makeTranslation(0,0,-D/2+.0925);
  const frontLocal=new THREE.Matrix4().makeTranslation(0,0,D/2+.001);
  const backLocal=new THREE.Matrix4().compose(new THREE.Vector3(0,0,-D/2-.001),backRotation,new THREE.Vector3(.975,.98,1));
  const color=new THREE.Color(), point=new THREE.Vector3(), scale=new THREE.Vector3(), spin=new THREE.Quaternion();
  function stamp(mesh,local,brightness=1) {
    const slot=mesh.count++;
    mesh.setMatrixAt(slot,matrix.multiplyMatrices(poseMatrix,local));
    mesh.setColorAt(slot,color.setRGB(brightness,brightness,brightness));
  }
  let model=null, tiles=[], hand=[], previous=null, motion=new Map();
  const renderedHand=[];
  let frame=0,dead=false, lost=false, width=0,height=0;
  function compose(m) {
    const output=[], own=[];
    for(const seat of [0,1]) {
      const ids=seat===0?m.hand:m.cpu;
      const size=seat===0?OWN:CPU, pitch=-.34;
      const drawn=ids.length===14, gap=drawn ? .30 : 0, spacing=(W+.035)*size;
      for(let i=0;i<ids.length;i++){
        const isOwn=seat===0, selected=isOwn&&i===m.selected;
        const x=(i-(ids.length-1)/2)*spacing+(drawn&&i===13?gap:0)-gap/2;
        // A revealed CPU hand is laid down facing the viewer at the end of a round.
        const faceUp=!isOwn&&validTile(ids[i]), tilt=faceUp?-Math.PI/2:isOwn?pitch:.10;
        const y=.057+size*(Math.abs(Math.cos(tilt))*H+Math.abs(Math.sin(tilt))*D)/2;
        const z=isOwn?5.67:-5.82;
        const restricted=isOwn&&m.active&&m.legal?.length&&!m.legal.includes(i);
        const t=tile((isOwn?'h':'c')+i,ids[i],isOwn?x:-x,y+(selected ? .23 : 0),z-(selected ? .27 : 0),tilt,isOwn||faceUp?0:Math.PI,size,
          restricted ? .66 : 1);
        if(isOwn)own.push(t);
        output.push(t);
      }
    }
    // Three banks of conventional six-by-three rivers leave room for all 53 discards per seat.
    for(const seat of [0,1]){
      const ids=m.rivers[seat], side=seat===0?1:-1;
      const size=seat===0?RIVER:CPU_RIVER;
      const bankGap=seat===0?4.92:5.5;
      for(let start=0;start<ids.length;start+=6){
        const bank=Math.floor(start/18), row=Math.floor(start/6)%3;
        const offset=[0,-bankGap,bankGap][bank]??0;
        const base=offset-(6*(W+.066)*size)/2;
        let edge=base;
        for(let i=start;i<Math.min(start+6,ids.length);i++){
          const sideways=m.riichiAt[seat]===i;
          const step=((sideways?H:W)+.066)*size;
          const x=side*(edge+step/2), z=seat===0?1.42+row*1.057:-(1.25+row*1.15);
          // Show both rivers upright from the player's seat. Riichi still turns a tile sideways.
          output.push(tile('r'+seat+'-'+i,ids[i],x,.056+D*size/2,z,-Math.PI/2,sideways?Math.PI/2:0,size));
          edge+=step;
        }
      }
    }
    // Keep both side rails clear. Draw through the near bank, then the far bank.
    const count=Math.min(WALL_CAPACITY,Math.max(0,m.wallCount));
    for(let n=WALL_CAPACITY-count;n<WALL_CAPACITY;n++){
      const column=Math.floor(n/2), near=column<NEAR_STACKS, upper=n%2===0;
      const x=near ? ((NEAR_STACKS-1)/2-column)*WALL_STEP : FAR_START+(column-NEAR_STACKS)*WALL_STEP;
      output.push(tile('w'+n,null,x,.053+WARE*D*(upper?1.5:.5),near?WALL_Z:-WALL_Z,Math.PI/2,near?Math.PI:0,WARE));
    }
    for(let n=0;n<DEAD_STACKS*2;n++){
      const upper=n%2===1, col=n>>1, dora=col===2&&upper&&validTile(m.dora);
      const x=FAR_START+(FAR_LIVE_STACKS+col)*WALL_STEP+DEAD_GAP;
      output.push(tile('d'+n,dora?m.dora:null,x,.053+WARE*D*(upper?1.5:.5),-WALL_Z,
        dora?-Math.PI/2:Math.PI/2,0,WARE));
    }
    return {output,own};
  }
  function scaleCamera(w,h) {
    camera.aspect=w/h;
    camera.fov=36;
    camera.zoom=1;
    camera.updateProjectionMatrix();
    // Keep the near rail and far seat visible, including portrait displays.
    const left=point.set(-11.42,-.7,7.45).project(camera);
    const horizontal=Math.abs(left.x);
    const top=point.set(0,1.57,-6.63).project(camera).y;
    const bottom=-point.set(0,-1.01,7.47).project(camera).y;
    camera.zoom=Math.min(1.46, .994/horizontal, .92/top, .977/bottom);
    camera.setViewOffset(w,h,0,Math.round(h*.045),w,h);
    camera.updateProjectionMatrix();
  }
  function resize(){
    if(dead||lost)return;
    const w=Math.round(canvas.clientWidth),h=Math.round(canvas.clientHeight);
    if(!w||!h||w===width&&h===height)return;
    width=w;height=h;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8,Math.sqrt(1850000/(w*h))));
    renderer.setSize(w,h,false);camera.clearViewOffset();scaleCamera(w,h);
    request();
  }
  function update(next){
    if(dead||lost||!next)return;
    resize();
    const now=performance.now(),same=previous?.roundKey===next.roundKey;
    const lastTiles=new Map(tiles.map(t=>[t.key,t]));
    const fresh=compose(next), animations=new Map();
    if(same&&!reducedMotion()){
      for(const t of fresh.output){
        const old=lastTiles.get(t.key), existing=motion.get(t.key);
        if(t.key.startsWith('r')&&!old){
          const from=t.p.clone();
          const player=t.key[1]==='0';
          const source=player?hand[previous.selected]:lastTiles.get('c'+(previous.cpu.length-1));
          if(source)from.copy(source.p);
          else from.z+=player?2.2:-2.2;
          animations.set(t.key,{from,orientation:source?.q||t.q,at:now,ms:310,arc:.70});
        } else if((t.key[0]==='h'||t.key[0]==='c')&&!old){
          const from=t.p.clone();from.x+=t.key[0]==='h' ? .85 : -.85;from.y+=.3;
          animations.set(t.key,{from,orientation:t.q,at:now,ms:195,arc:.13});
        } else if(old&&t.key[0]==='h'&&old.p.distanceToSquared(t.p)>.001) {
          animations.set(t.key,{from:old.p,orientation:t.q,at:now,ms:115,arc:0});
        } else if(existing&&now-existing.at<existing.ms)animations.set(t.key,existing);
      }
    }
    motion=animations; tiles=fresh.output;hand=fresh.own;previous=next;model=next;
    for(let s=0;s<2;s++)deposits[s].visible=Number.isInteger(next.riichiAt[s])&&next.riichiAt[s]>=0;
    request();
  }
  function draw(now) {
    frame=0;
    if(dead||lost||!model||!width||!height)return;
    for(const b of batches)b.count=0;
    let moving=false;
    const discardIndex = model.rivers[1].length-1;
    const latestCpuKey = 'r1-'+discardIndex;
    discardMark.visible = false;
    for(const t of tiles){
      point.copy(t.p);spin.copy(t.q);
      const anim=motion.get(t.key);
      if(anim){
        const u=Math.min(1,Math.max(0,(now-anim.at)/anim.ms));
        if(u<1){
          moving=true;
          const ease=1-(1-u)**3;
          point.lerpVectors(anim.from,t.p,ease);point.y+=Math.sin(u*Math.PI)*anim.arc;
          spin.slerpQuaternions(anim.orientation,t.q,ease);
        }else motion.delete(t.key);
      }
      const x=point.x,z=point.z;
      if(t.key===latestCpuKey && !motion.has(t.key)){
        discardMark.visible = true;
        discardMark.position.x = x;
        discardMark.position.z = z;
        discardMark.rotation.y = model.riichiAt[1]===discardIndex ? Math.PI/2 : 0;
      }
      poseMatrix.compose(point,spin,scale.setScalar(t.scale));
      if(t.key[0]==='h') {
        const index=Number(t.key.slice(1));
        (renderedHand[index]??=new THREE.Matrix4()).copy(poseMatrix);
      }
      stamp(body,bodyLocal,t.shade);stamp(heel,heelLocal,t.shade);
      if(validTile(t.id))stamp(faces[t.id],frontLocal,t.shade);
      stamp(backs,backLocal,t.shade);
      if(t.key[0]==='d'&&Number(t.key.slice(1))%2===1)continue;
      if(t.key[0]==='w'&&Number(t.key.slice(1))%2===0)continue;
      const n=shadows.count++, standing=t.key[0]==='h'||t.key[0]==='c';
      shadows.setMatrixAt(n,matrix.compose(point.set(x+.085,.057,z+.075),shadowRotation,
        scale.set(t.scale*(standing?1.42:1.55),t.scale*(standing?1.2:1.9),1)));
    }
    for(const b of batches){b.instanceMatrix.needsUpdate=true;if(b.instanceColor)b.instanceColor.needsUpdate=true;}
    renderer.render(scene,camera);
    if (onReady) {
      const ready = onReady;
      onReady = undefined;
      ready();
    }
    if(moving)request();
  }
  function request(){
    if(!dead&&!lost&&!frame)frame=requestAnimationFrame(now=>{
      try { draw(now); }
      catch (error) {
        console.warn('3D卓を描画できないため、通常の卓に切り替えました。',error);
        onUnavailable?.();
      }
    });
  }
  function projectHand(){
    resize();
    return hand.map(t=>{
      let left=1,right=0,top=1,bottom=0;
      for(const x of [-W/2,W/2])for(const y of [-H/2,H/2])for(const z of [-D/2,D/2]){
        point.set(x,y,z).multiplyScalar(t.scale).applyQuaternion(t.q).add(t.p).project(camera);
        const px=(point.x+1)/2,py=(1-point.y)/2;
        left=Math.min(left,px);right=Math.max(right,px);top=Math.min(top,py);bottom=Math.max(bottom,py);
      }
      return {left,top,width:right-left,height:bottom-top};
    });
  }
  const raycaster=new THREE.Raycaster(), mouse=new THREE.Vector2();
  const localRay=new THREE.Ray(), inverse=new THREE.Matrix4(), localHit=new THREE.Vector3();
  const localBounds=new THREE.Box3(new THREE.Vector3(-W/2,-H/2,-D/2),new THREE.Vector3(W/2,H/2,D/2));
  function pickAt(clientX,clientY) {
    if(dead||lost||!model?.active)return -1;
    resize();
    const rect=canvas.getBoundingClientRect();
    if(!rect.width||!rect.height||clientX<rect.left||clientX>rect.right||clientY<rect.top||clientY>rect.bottom)return -1;
    mouse.set(2*(clientX-rect.left)/rect.width-1,1-2*(clientY-rect.top)/rect.height);
    raycaster.setFromCamera(mouse,camera);
    let nearest=-1,depth=Infinity;
    for(let i=0;i<hand.length;i++) {
      const t=hand[i];
      const world=renderedHand[i]||poseMatrix.compose(t.p,t.q,scale.setScalar(t.scale));
      localRay.copy(raycaster.ray).applyMatrix4(inverse.copy(world).invert());
      if(!localRay.intersectBox(localBounds,localHit))continue;
      const d=raycaster.ray.origin.distanceToSquared(localHit.applyMatrix4(world));
      if(d<depth){nearest=i;depth=d;}
    }
    return nearest;
  }
  function pick(event){const i=pickAt(event.clientX,event.clientY);if(i>=0&&model.legal.includes(i))onPick?.(i);}
  function hover(event){const i=pickAt(event.clientX,event.clientY);onHover?.(i<0?null:i);}
  function leave(){onHover?.(null);}
  function contextLost(e){e.preventDefault();lost=true;cancelAnimationFrame(frame);frame=0;onUnavailable?.();}
  if(onPick)canvas.addEventListener('click',pick);
  if(onHover){canvas.addEventListener('pointermove',hover);canvas.addEventListener('pointerleave',leave);}
  canvas.addEventListener('webglcontextlost',contextLost);
  const observer=typeof ResizeObserver==='function'?new ResizeObserver(resize):null;
  observer?.observe(canvas);window.addEventListener('resize',resize);
  resize();
  function dispose(){
    if(dead)return;
    dead=true;cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',resize);
    canvas.removeEventListener('click',pick);canvas.removeEventListener('pointermove',hover);canvas.removeEventListener('pointerleave',leave);
    canvas.removeEventListener('webglcontextlost',contextLost);
    for(const batch of batches)batch.dispose();
    for(const g of geometries)g.dispose();
    for(const m of materials)m.dispose();
    for(const t of textures)t.dispose();
    key.shadow.dispose();art.dispose();renderer.dispose();
  }
  return {update,projectHand,pickAt,dispose};
}
