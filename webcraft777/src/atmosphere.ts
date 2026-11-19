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
  private readonly linearColor=new T.Color();
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
          skyColor+=vec3(1.,.56,.20)*pow(max(dot(direction,sun),0.),20.)*.22;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
          gl_Position.z=gl_Position.w;
        }`,
      fragmentShader:`varying vec3 direction,skyColor;uniform vec3 sun;uniform float lightness;
        void main(){
          vec3 d=normalize(direction),col=skyColor;
          float sd=dot(d,sun),moon=dot(d,-sun);
          col=mix(col,vec3(1.,.85,.54),smoothstep(.9978,.9989,sd));
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
          #include <colorspace_fragment>
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
        void main(){vec3 col=mix(vec3(.085,.135,.22),vec3(.98,.968,.88),lightness)*shade;
          col=mix(col,vec3(1.,.65,.40)*shade,sunset*.64);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);
          #include <colorspace_fragment>
        }`
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
    const skyColor=(out:T.Vector3,r:number,g:number,b:number)=>{
      this.linearColor.setRGB(Math.min(1,r),Math.min(1,g),Math.min(1,b),T.SRGBColorSpace);
      out.set(this.linearColor.r,this.linearColor.g,this.linearColor.b);
    };
    skyColor(this.zenith.value,.095+light*.23+warm*.14,.14+light*.52-warm*.15,.24+light*.60-warm*.13);
    skyColor(this.horizon.value,.25+light*.57+warm*.29,.32+light*.57-warm*.13,.44+light*.45-warm*.25);
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
  shadows:Uniform<number>; submerged:Uniform<number>; extras:Uniform<number>; lampColors:Uniform<T.Vector3[]>;
}
export function terrainMaterial(atlas:T.DataTexture,heightMap:T.DataTexture,sky:Atmosphere,shared:LightUniforms,transparent:boolean) {
  return new T.ShaderMaterial({transparent,depthWrite:!transparent,uniforms:{
    ...shared, atlas:{value:atlas}, columnHeights:{value:heightMap},sun:sky.sun, lightness:sky.day,
    sunset:sky.warm,horizon:sky.horizon},
    vertexShader:`
      attribute vec3 surface;
      uniform sampler2D columnHeights;uniform vec3 sun;uniform vec3 lampPositions[4],lampColors[4];
      uniform float clock,lightness,sunset,shadows,extras;uniform int lampCount;
      // Material IDs are categorical; perspective interpolation can turn 13
      // into 12.999999 and break the water branch halfway across a triangle.
      varying vec2 tex;varying vec3 lighting;varying float depth;flat varying float kind;varying vec3 point;varying float waterDepth;
      float heightAt(vec2 xz){return texture2D(columnHeights,(floor(xz)+.5)/256.).r*255.;}
      void main(){
        vec3 p=position;kind=surface.z;
        if(extras>.5 && (kind==6. || kind==41.)) {float strength=kind==6.?.012:.044;
          p.x+=sin(clock*1.35+p.x*.66+p.z*.48+p.y*.32)*strength;
        }
        if(extras>.5 && kind==13. && fract(p.y)>.5){p.y+=sin(clock*.82+p.x*.63+p.z*.48)*.016;}
        vec3 outside=p+normal*.055;
        vec2 uvh=outside.xz;
        // Four neighbouring columns blend at a corner. Sample cover even on
        // low quality so lanterns keep their purpose underground.
        vec2 offs=vec2(.19,.19);
        float overhead=heightAt(uvh+offs)-outside.y;
        waterDepth=kind==13.?max(0.,-overhead-.9):0.;
        float cover=smoothstep(.20,3.8,overhead);
        float shade=1.;
        if(shadows>.5){
          cover=.25*(cover+smoothstep(.20,3.8,heightAt(uvh-offs)-outside.y)
            +smoothstep(.20,3.8,heightAt(uvh+vec2(offs.x,-offs.y))-outside.y)
            +smoothstep(.20,3.8,heightAt(uvh+vec2(-offs.x,offs.y))-outside.y));
          vec2 dir=normalize(sun.xz+vec2(.00001));
          float castShade=0.;
          for(int i=1;i<=5;i++){
            if(i>3 && shadows<1.5)break;
            float s=float(i)*1.35;
            float delta=heightAt(uvh+dir*s)+.90-(outside.y+s*max(sun.y,.14)/max(length(sun.xz),.10));
            castShade=max(castShade,smoothstep(.25,1.65,delta));
          }
          float nearShade=1.-smoothstep(18.,shadows>1.5?50.:34.,distance(cameraPosition,p));
          shade=1.-.42*castShade*nearShade;
        }
        float face=.89+.11*normal.y+.027*normal.x-.026*normal.z;
        float diffuse=max(0.,dot(normal,sun));
        vec3 ambient=mix(vec3(.24,.32,.49),vec3(.61,.69,.70),lightness);
        vec3 sunlight=mix(vec3(.54,.47,.35),vec3(1.03,.36,.12),sunset);
        lighting=(ambient*mix(1.,.30,cover)+sunlight*diffuse*lightness*shade*(1.-cover))*
          surface.x*face*surface.y;
        for(int i=0;i<4;i++){
          if(i>=lampCount)break;
          vec3 d=lampPositions[i]-p;float lengthD=length(d);
          float reach=max(0.,1.-lengthD/8.);
          lighting+=lampColors[i]*reach*reach*(.45+.55*max(0.,dot(normal,d/max(lengthD,.01))));
        }
        if(kind==12. || kind==25.) lighting=max(lighting,vec3(1.10,1.04,.98));
        if(kind==23.)lighting=max(lighting,vec3(.25,.38,.40));
        tex=uv;point=p;vec4 mv=viewMatrix*vec4(p,1.);depth=length(mv.xyz);gl_Position=projectionMatrix*mv;
      }`,
    fragmentShader:`
      uniform sampler2D atlas;uniform vec3 horizon,sun;uniform float fogEnd,clock,submerged,extras;
      varying vec2 tex;varying vec3 lighting;varying float depth;flat varying float kind;varying vec3 point;varying float waterDepth;
      void main(){
        vec2 dx=dFdx(tex),dy=dFdy(tex);
        // No derivative may reach a mip containing colours from another cell.
        float lodCap=min(1.,.045/max(.00001,max(length(dx),length(dy))));
        vec4 raw=textureGrad(atlas,tex,dx*lodCap,dy*lodCap);
        if(raw.a<.1)discard;
        if((kind==6. || kind>=40.) && raw.a<.48)discard;
        vec3 col=raw.rgb*lighting;
        if(kind==13.){
          float wave=sin(point.x*1.6+point.z*.78+clock)*sin(point.x*.37-point.z*1.3+clock*.5);
          vec3 eye=normalize(cameraPosition-point);
          float fres=pow(1.-abs(eye.y),3.);
          float deep=smoothstep(.3,3.9,waterDepth);
          col=mix(col,vec3(.019,.18,.23)*lighting,deep*.58);
          col=mix(col,horizon,.42*fres);
          if(extras>.5){
            vec3 ripple=normalize(vec3(wave*.08,1.,cos(point.z*.8+clock)*.045));
            float sparkle=pow(max(0.,dot(reflect(-sun,ripple),eye)),72.);
            col+=vec3(.74,.55,.32)*sparkle + vec3(.016,.037,.031)*smoothstep(.80,.99,wave);
          }
          raw.a=mix(mix(raw.a,.85,deep),.93,fres);
        }
        float f=smoothstep(fogEnd*.68,fogEnd,depth);
        col=mix(col,horizon,f);
        if(submerged>.5)col=mix(col,vec3(.026,.19,.20),.18+.78*smoothstep(1.,19.,depth));
        gl_FragColor=vec4(col,raw.a);
        #include <colorspace_fragment>
      }`});
}
