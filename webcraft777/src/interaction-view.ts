import * as T from 'three'
import { tileFor, tileUV, type Axis } from './textures'
import { isSlide, slideHeight } from './playground'

interface Position { x:number; y:number; z:number }
export interface PlacementGhost extends Position { id:number; valid:boolean; axis?:Axis }
export interface Presentation {
  held:number; mining:number; active?:boolean; moving?:boolean; sprinting?:boolean; preview?:PlacementGhost|null
}

const normals=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]
function cubeUV(face:number,u:number,v:number,id:number,axis:Axis) {
  const [x,y,z]=normals[face]
  const tile=tileFor(id,y,x,z,axis)
  // On a BoxGeometry, u runs along Z on the two X faces, and along X elsewhere.
  if(tile===5 && (axis==='x' && !x || axis==='z' && x!==0)) [u,v]=[v,1-u]
  if(tile===45)for(let turn=0;turn<id-30;turn++)[u,v]=[1-v,u]
  return tileUV(tile,u,v)
}

// Share one mesh per held item. The finger, cuff and tool facets use the
// atlas's white swatch, so a textured block and a coloured grip take one draw.
function handMesh(template:T.BoxGeometry,id:number) {
  const pos:number[]=[], uv:number[]=[], colors:number[]=[], indices:number[]=[]
  const original=template.getAttribute('position'), mapping=template.getAttribute('uv')
  function box(x:number,y:number,z:number,w:number,h:number,d:number,rgb:number,block=0) {
    const base=pos.length/3, col=new T.Color(rgb)
    for(let i=0;i<original.count;i++) {
      const face=Math.floor(i/4), [nx,ny,nz]=normals[face]
      const shade=.80+.15*ny+.065*nx+.05*nz
      const px=original.getX(i),py=original.getY(i),pz=original.getZ(i)
      const height=isSlide(block)&&py>0?slideHeight(block,px+.5,pz+.5)-.5:py
      pos.push(x+px*w,y+height*h,z+pz*d)
      const u=mapping.getX(i),v=mapping.getY(i)
      uv.push(...(block?cubeUV(face,u,v,block,'y'):tileUV(16,u,v)))
      colors.push(col.r*shade,col.g*shade,col.b*shade)
    }
    for(let i=0;i<template.index!.count;i++)indices.push(base+template.index!.getX(i))
  }
  // Indigo work shirt, brass stitching, leather palm and thumb.
  box(.10,-.54,.02,.57,.64,.61,0x376465)
  box(.10,-.24,-.01,.60,.17,.62,0xc09a66)
  box(.08,-.07,-.06,.52,.43,.53,0xae704a)
  box(-.16,.015,-.23,.20,.20,.33,0xdea575)
  if(id>=17 && id<=20){
    const head=(id===18||id===20)?0x96acaa:0xcba36f
    box(-.08,.35,-.12,.14,1.18,.15,0x99653f)
    box(-.08,.72,-.12,.20,.16,.20,0x5c6555)
    if(id<=18){
      box(-.08,.91,-.12,.88,.20,.20,head)
      box(-.55,.78,-.12,.15,.27,.19,head)
      box(.37,.80,-.12,.15,.19,.18,head)
    }else{
      box(-.19,.91,-.12,.49,.22,.22,head)
      box(-.44,.75,-.12,.28,.46,.23,head)
      box(-.53,.61,-.12,.13,.19,.24,0xc5cbb5)
    }
  } else if(id===34){
    box(-.07,.16,-.19,.18,.38,.20,0x79472e)
    box(-.07,.39,-.32,.27,.20,.36,0x65757f)
    box(-.07,.43,-.57,.16,.13,.32,0x91a0a5)
  }else if(id===35||id===36){
    box(-.08,.36,-.14,.14,.98,.15,0x9f6741)
    box(-.08,.81,-.14,.23,.23,.22,0xe57331)
    box(-.08,.94,-.14,.13,.18,.13,0xffc46c)
  }else if(id===38){
    box(-.12,.38,-.27,.14,1.00,.14,0xa96d41)
    box(-.12,.79,-.43,.12,.17,.34,0xc38955)
    box(-.12,-.07,-.43,.12,.16,.34,0xc38955)
    box(-.12,.35,-.55,.025,.96,.025,0xeed5a0)
  }else if(id===37)box(-.08,.26,-.18,.17,.35,.17,0xd5a357)
  else if(id===16)box(-.06,.36,-.18,.16,1.05,.16,0xc09366)
  else if(id===15||id===24){
    box(-.10,.29,-.22,.40,.40,.36,id===24?0x84dfc7:0x58615f)
    box(-.10,.54,-.22,.22,.16,.24,id===24?0xd4f6db:0x707976)
  }else if(id)box(-.11,.30,-.26,.66,.66,.66,0xffffff,id)
  const g=new T.BufferGeometry()
  g.setAttribute('position',new T.Float32BufferAttribute(pos,3))
  g.setAttribute('uv',new T.Float32BufferAttribute(uv,2))
  g.setAttribute('color',new T.Float32BufferAttribute(colors,3))
  g.setIndex(indices)
  return g
}

function crackMask() {
  const size=32, pixels=new Uint8Array(size*size).fill(255)
  function line(x0:number,y0:number,x1:number,y1:number,start:number,end:number) {
    const steps=Math.max(Math.abs(x1-x0),Math.abs(y1-y0))
    for(let i=0;i<=steps;i++){
      const t=i/steps, x=Math.round(x0+(x1-x0)*t),y=Math.round(y0+(y1-y0)*t)
      if(x<0||y<0||x>=size||y>=size)continue
      const at=x+y*size
      pixels[at]=Math.min(pixels[at],Math.round(245*(start+(end-start)*t)))
    }
  }
  const paths=[
    [[15,17],[12,19],[11,23],[7,25],[6,29],[2,32]],
    [[15,17],[16,13],[20,11],[19,7],[23,3],[23,0]],
    [[15,17],[18,18],[21,22],[26,22],[30,26],[32,27]],
    [[15,17],[11,15],[7,15],[6,12],[2,10],[-1,8]],
    [[11,23],[14,24],[15,28],[18,29]],[[20,11],[23,13],[26,11],[30,11]],
    [[7,15],[7,19],[4,22]],[[21,22],[19,25],[20,29]],
  ]
  paths.forEach((p,n)=>{
    const from=n<4?.02+n*.035:.51, to=n<4?.93: .98
    for(let i=1;i<p.length;i++)line(p[i-1][0],p[i-1][1],p[i][0],p[i][1],
      from+(to-from)*(i-1)/(p.length-1), from+(to-from)*i/(p.length-1))
  })
  const tex=new T.DataTexture(pixels,size,size,T.RedFormat)
  tex.magFilter=T.NearestFilter;tex.minFilter=T.NearestFilter;tex.needsUpdate=true
  return tex
}

export class InteractionView {
  private readonly cube=new T.BoxGeometry()
  private readonly mask=crackMask()
  private readonly hand:T.Mesh<T.BufferGeometry,T.MeshBasicMaterial>
  private readonly cracking:T.Mesh<T.BoxGeometry,T.ShaderMaterial>
  private readonly ghost:T.Mesh<T.BoxGeometry,T.ShaderMaterial>
  private lastItem=-1
  private ghostTile=''
  private recoil=0
  private phase=0
  private clock=0
  constructor(scene:T.Scene,camera:T.Camera,atlas:T.DataTexture) {
    this.hand=new T.Mesh(new T.BufferGeometry(),new T.MeshBasicMaterial({map:atlas,vertexColors:true,
      depthTest:false,depthWrite:false,transparent:true,toneMapped:false}))
    this.hand.visible=false;this.hand.renderOrder=12;this.hand.frustumCulled=false;camera.add(this.hand);scene.add(camera)
    const vs=`varying vec2 face;void main(){face=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`
    this.cracking=new T.Mesh(this.cube,new T.ShaderMaterial({uniforms:{stages:{value:this.mask},progress:{value:0}},
      transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,vertexShader:vs,
      fragmentShader:`uniform sampler2D stages;uniform float progress;varying vec2 face;
        void main(){float crack=step(texture2D(stages,face).r,min(.985,progress));
          float lip=step(texture2D(stages,face+vec2(.03125,-.03125)).r,min(.985,progress));
          if(crack+lip<.2)discard;
          gl_FragColor=mix(vec4(.92,.74,.46,.27),vec4(.025,.031,.032,.87),crack);
          #include <colorspace_fragment>
        }`}))
    this.cracking.scale.setScalar(1.002);this.cracking.visible=false;this.cracking.renderOrder=3;scene.add(this.cracking)
    const shape=this.cube.clone()
    shape.setAttribute('plate',new T.Float32BufferAttribute(new Float32Array(shape.getAttribute('uv').count*2),2))
    this.ghost=new T.Mesh(shape,new T.ShaderMaterial({uniforms:{atlas:{value:atlas},allowed:{value:1}},
      transparent:true,depthWrite:false,side:T.DoubleSide,forceSinglePass:true,
      vertexShader:`attribute vec2 plate;varying vec2 uvPlate,face;varying float range;
        void main(){face=uv;uvPlate=plate;vec4 mv=modelViewMatrix*vec4(position,1.);range=-mv.z;gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`uniform sampler2D atlas;uniform float allowed;varying vec2 uvPlate,face;varying float range;
        void main(){vec2 edge=min(face,1.-face);float width=clamp(max(fwidth(face.x),fwidth(face.y))*1.3,.011,.045);
          float rim=1.-smoothstep(width*.4,width,min(edge.x,edge.y));
          float bracket=step(max(edge.x,edge.y),.20)*rim;
          float crossMark=1.-smoothstep(width*.5,width*1.45,min(abs(face.x-face.y),abs(1.-face.x-face.y)));
          float stroke=mix(max(rim*.64,crossMark*.86),max(rim*.50,bracket),allowed);
          vec3 pigment=texture2D(atlas,uvPlate).rgb;
          vec3 ink=mix(vec3(.93,.16,.07),vec3(.31,.91,.67),allowed);
          float opacity=mix(.115,.87,stroke)*smoothstep(.07,.34,range);
          gl_FragColor=vec4(mix(pigment,ink,.44+.56*stroke),opacity);
          #include <colorspace_fragment>
        }`}))
    this.ghost.scale.setScalar(.993);this.ghost.visible=false;this.ghost.renderOrder=4;scene.add(this.ghost)
  }
  swing(){this.recoil=1}
  update(camera:T.PerspectiveCamera,target:Position|null,p:Presentation|undefined,dt:number,bright:number,extras:boolean,showHand=true){
    const active=!!p && p.active!==false
    this.hand.visible=active && showHand
    this.cracking.visible=active && !!target && p.mining>0
    if(this.cracking.visible && target && p){
      this.cracking.position.set(target.x+.5,target.y+.5,target.z+.5)
      this.cracking.material.uniforms.progress.value=p.mining
    }
    const g=p?.preview
    this.ghost.visible=active && !!g && !this.cracking.visible
    if(g && this.ghost.visible){
      this.ghost.position.set(g.x+.5,g.y+.5,g.z+.5)
      this.ghost.material.uniforms.allowed.value=Number(g.valid)
      const key=g.id+'/'+g.axis
      if(key!==this.ghostTile){
        this.ghostTile=key
        const old=this.ghost.geometry.getAttribute('uv'),out=this.ghost.geometry.getAttribute('plate')
        const original=this.cube.getAttribute('position'),position=this.ghost.geometry.getAttribute('position')
        for(let i=0;i<old.count;i++){
          const xy=cubeUV(i>>2,old.getX(i),old.getY(i),g.id,g.axis??'y')
          out.setXY(i,xy[0],xy[1])
          const x=original.getX(i),y=original.getY(i),z=original.getZ(i)
          position.setXYZ(i,x,isSlide(g.id)&&y>0?slideHeight(g.id,x+.5,z+.5)-.5:y,z)
        }
        out.needsUpdate=true;position.needsUpdate=true
      }
    }
    if(!p||!active)return
    this.recoil=Math.max(0,this.recoil-dt*4.8)
    if(!showHand){this.phase=0;return}
    if(p.held!==this.lastItem){
      this.hand.geometry.dispose();this.hand.geometry=handMesh(this.cube,p.held);this.lastItem=p.held
    }
    this.clock+=dt
    this.phase=p.mining>0?this.phase+dt*16:0
    const swing=extras?Math.max(Math.sin(this.phase*.5)**2,Math.sin(this.recoil*Math.PI)):0
    const bob=p.moving&&extras?Math.sin(this.clock*(p.sprinting?13:9))*.006:0
    const extent=.54*Math.tan(camera.fov*Math.PI/360)
    this.hand.position.set(extent*camera.aspect*.66-swing*.046,-extent*.80+bob+swing*.042,-.54-swing*.045)
    this.hand.rotation.set(.15-swing*.74,-.55+swing*.15,-.31+swing*.19)
    this.hand.scale.setScalar(.235)
    this.hand.material.color.setScalar(bright)
  }
  dispose(){
    this.hand.removeFromParent();this.hand.geometry.dispose();this.hand.material.dispose()
    this.cracking.removeFromParent();this.cracking.material.dispose();this.mask.dispose()
    this.ghost.removeFromParent();this.ghost.geometry.dispose();this.ghost.material.dispose();this.cube.dispose()
  }
}
