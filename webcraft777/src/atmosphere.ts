import * as T from "three";
import {scatter} from "./world";

type Uniform<TValue>={value:TValue};
export const vector=(r:number,g:number,b:number)=>new T.Vector3(r,g,b);
export class Atmosphere {
  readonly sun={value:vector(0,1,0)};
  readonly horizon={value:vector(.78,.87,.83)};
  readonly zenith={value:vector(.23,.64,.8)};
  readonly day={value:1};
  readonly warm={value:0};
  readonly sky:T.Mesh<T.SphereGeometry,T.ShaderMaterial>;
  readonly clouds:T.InstancedMesh<T.BoxGeometry,T.ShaderMaterial>;
  constructor(scene:T.Scene,seed:number) {
    const uniforms={sun:this.sun,horizon:this.horizon,zenith:this.zenith,lightness:this.day,sunset:this.warm};
    const skyMat=new T.ShaderMaterial({ uniforms,side:T.BackSide,depthWrite:false,depthTest:true,
      vertexShader:`varying vec3 direction;varying vec3 skyColor;
        uniform vec3 sun,horizon,zenith;
        void main(){
          direction=normalize(position);
          float h=clamp(direction.y,0.,1.);
          skyColor=mix(horizon,zenith,smoothstep(-.07,.85,h));
          skyColor+=vec3(1.,.69,.32)*pow(max(dot(direction,sun),0.),32.)*.21;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
          gl_Position.z=gl_Position.w;
        }`,
      fragmentShader:`varying vec3 direction,skyColor;uniform vec3 sun;uniform float lightness;
        void main(){
          vec3 d=normalize(direction),col=skyColor;
          float sd=dot(d,sun),moon=dot(d,-sun);
          col=mix(col,vec3(1.,.93,.67),smoothstep(.9978,.9989,sd));
          col=mix(col,vec3(.83,.91,.94),smoothstep(.9990,.9995,moon)*.85);
          if(lightness<.98 && d.y>.03){
            vec2 skyGrid=d.xz/(1.+d.y)*280.;
            vec3 hash=fract(vec3(floor(skyGrid).xyx)*vec3(.1031,.1030,.0973));
            hash+=dot(hash,hash.yzx+33.33);
            float seed=fract((hash.x+hash.y)*hash.z);
            float star=step(.985,seed)*(1.-smoothstep(.06,.26,length(fract(skyGrid)-.5)));
            col+=vec3(.69,.83,.91)*star*(1.-lightness)*smoothstep(.03,.26,d.y);
          }
          gl_FragColor=vec4(col,1.);
        }`
    });
    this.sky=new T.Mesh(new T.SphereGeometry(270,32,16),skyMat);
    // Opaque chunks go first. The far-depth sky now shades only visible sky
    // pixels; transparent water and glass still composite over it afterwards.
    this.sky.frustumCulled=false;this.sky.renderOrder=2;
    scene.add(this.sky);
    const cloudMat=new T.ShaderMaterial({uniforms,
      vertexShader:`varying float shade;varying float dist;
        void main(){vec4 pos=modelMatrix*instanceMatrix*vec4(position,1.);shade=.90+.1*normal.y;dist=length(pos.xyz-cameraPosition);
        gl_Position=projectionMatrix*viewMatrix*pos;}`,
      fragmentShader:`varying float shade;varying float dist;uniform float lightness,sunset;uniform vec3 horizon;
        void main(){vec3 col=mix(vec3(.34,.43,.53),vec3(.98,.985,.936),lightness)*shade;
          col=mix(col,vec3(1.,.80,.65)*shade,sunset*.5);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);}`
    });
    const clusters=66, parts=4;
    this.clouds=new T.InstancedMesh(new T.BoxGeometry(),cloudMat,clusters*parts);
    const dummy=new T.Object3D();
    for(let i=0;i<clusters;i++) {
      const x=scatter(i,11,seed)*480-112,z=scatter(i,12,seed)*480-112;
      const y=66+scatter(i,13,seed)*17;
      for(let j=0;j<parts;j++){
        dummy.position.set(x+j*4.6,y+Math.sin(Math.PI*j/3)*1.5,z+scatter(i,j,seed)*4);
        dummy.scale.set(6+scatter(i+7,j,seed)*7,1.6+scatter(i+12,j,seed)*2.6,5+scatter(i+77,j,seed)*7);
        dummy.updateMatrix();this.clouds.setMatrixAt(i*parts+j,dummy.matrix);
      }
    }
    this.clouds.computeBoundingSphere();scene.add(this.clouds);
  }
  update(t:number,camera:T.Camera,elapsed:number) {
    const a=(t-.25)*Math.PI*2;
    // Sunset sits across the inlet. Cloud colours and haze follow the same sun.
    this.sun.value.set(Math.cos(a)*.80,Math.sin(a),Math.cos(a)*.60).normalize();
    const e=this.sun.value.y, light=T.MathUtils.smoothstep(e,-.27,.32);
    const warm=Math.exp(-Math.pow((e-.065)/.25,2));
    this.day.value=light;this.warm.value=warm;
    this.zenith.value.set(.105+light*.225+warm*.10,.18+light*.48-warm*.09,.29+light*.53-warm*.10);
    this.horizon.value.set(.27+light*.55+warm*.18,.355+light*.53-warm*.12,.42+light*.43-warm*.22);
    this.sky.position.copy(camera.position);
    this.clouds.position.x=Math.sin(elapsed/190)*10;
  }
  dispose(scene:T.Scene) {
    scene.remove(this.sky,this.clouds);
    this.sky.geometry.dispose();this.sky.material.dispose();this.clouds.geometry.dispose();this.clouds.material.dispose();this.clouds.dispose();
  }
}
interface LightUniforms {
  lampPositions:Uniform<T.Vector3[]>; lampCount:Uniform<number>; fogEnd:Uniform<number>; clock:Uniform<number>;
  shadows:Uniform<number>; submerged:Uniform<number>;
}
export function terrainMaterial(atlas:T.DataTexture,heightMap:T.DataTexture,sky:Atmosphere,shared:LightUniforms,transparent:boolean) {
  return new T.ShaderMaterial({transparent,depthWrite:!transparent,uniforms:{
    ...shared, atlas:{value:atlas}, columnHeights:{value:heightMap},sun:sky.sun, lightness:sky.day,
    sunset:sky.warm,horizon:sky.horizon},
    vertexShader:`
      attribute vec3 surface;
      uniform sampler2D columnHeights;uniform vec3 sun;uniform vec3 lampPositions[4];
      uniform float clock,lightness,sunset,shadows;uniform int lampCount;
      varying vec2 tex;varying vec3 lighting;varying float depth;varying float kind;varying vec3 point;
      float heightAt(vec2 xz){return texture2D(columnHeights,(floor(xz)+.5)/256.).r*255.;}
      void main(){
        vec3 p=position;kind=surface.z;
        if(kind==6. || kind>20.) {float strength=kind==6.?.021:.067;
          p.x+=sin(clock*1.35+p.x*.66+p.z*.48+p.y*.32)*strength;
        }
        if(kind==13. && fract(p.y)>.5){p.y+=sin(clock*.82+p.x*.63+p.z*.48)*.019;}
        vec3 outside=p+normal*.09;
        float shade=1.;
        if(shadows>.5){
          // Sample a short directional height field. It updates in-place when a
          // roof or tree is edited, without invalidating distant chunk meshes.
          vec2 dir=sun.xz;
          float cover=step(outside.y+.55,heightAt(outside.xz));
          float castShade=0.;
          for(int i=1;i<=3;i++){
            float s=float(i)*1.8;
            castShade=max(castShade,step(outside.y+s*max(sun.y,.15)+.6,heightAt(outside.xz+dir*s)));
          }
          shade=(1.-.13*castShade*lightness-.11*cover)*surface.x;
        }
        float face=.90+.10*normal.y+.033*normal.x-.035*normal.z;
        float diffuse=max(0.,dot(normal,sun));
        vec3 tone=mix(vec3(.57,.66,.79),vec3(.91,.944,.93),lightness);
        lighting=(tone+vec3(.13,.112,.083)*lightness*diffuse+vec3(.105,.006,-.035)*sunset)*shade*face*surface.y;
        for(int i=0;i<4;i++){
          if(i>=lampCount)break;
          vec3 d=lampPositions[i]-p;float lengthD=length(d);
          float reach=max(0.,1.-lengthD/8.);
          lighting+=vec3(.95,.61,.245)*reach*reach*(.39+.61*max(0.,dot(normal,d/max(lengthD,.01))));
        }
        if(kind==12.)lighting=max(lighting,vec3(1.06,.99,.84));
        tex=uv;point=p;vec4 mv=viewMatrix*vec4(p,1.);depth=length(mv.xyz);gl_Position=projectionMatrix*mv;
      }`,
    fragmentShader:`
      uniform sampler2D atlas;uniform vec3 horizon,sun;uniform float fogEnd,clock,submerged;
      varying vec2 tex;varying vec3 lighting;varying float depth,kind;varying vec3 point;
      void main(){
        vec4 raw=texture2D(atlas,tex);
        if(raw.a<.1)discard;
        if((kind==6. || kind>=20.) && raw.a<.53)discard;
        vec3 col=raw.rgb*lighting;
        if(kind==13.){
          float wave=sin(point.x*1.6+point.z*.78+clock)*sin(point.x*.37-point.z*1.3+clock*.5);
          col+=vec3(.029,.061,.073)*smoothstep(.76,.99,wave);
          float fres=pow(1.-abs(normalize(cameraPosition-point).y),3.);
          col=mix(col,horizon,.28*fres);raw.a=mix(raw.a,.91,fres);
        }
        float f=smoothstep(fogEnd*.68,fogEnd,depth);
        col=mix(col,horizon,f);
        if(submerged>.5)col=mix(col,vec3(.17,.51,.53),.18+.78*smoothstep(1.,19.,depth));
        gl_FragColor=vec4(col,raw.a);
      }`});
}
