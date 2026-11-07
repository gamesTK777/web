/* Approved anime illustrations are loaded once and drawn in presentation space.
 * These functions never change saved coordinates, combat, collision or inventory. */
export const MONSTER_ART=Object.freeze({
  moss:{height:.95,motion:'sway'},moth:{height:1.10,motion:'flutter',float:.075},
  golem:{height:1.20,motion:'heavy'},boss:{height:1.50,motion:'heavy',glow:'205,156,243'},
  sprout:{height:1.08,motion:'sway'},cap:{height:1.04,motion:'breathe',glow:'247,190,99'},
  bat:{height:.98,motion:'flutter',float:.09},shell:{height:.93,motion:'slow'},
  wisp:{height:1.12,motion:'hover',float:.12,glow:'113,229,203'},thorn:{height:1.04,motion:'breathe'},
  crab:{height:.94,motion:'scuttle'},owl:{height:1.12,motion:'sway'},
  mimic:{height:1.04,motion:'breathe'},lizard:{height:1.02,motion:'sway',glow:'248,149,83'},
  knight:{height:1.35,motion:'heavy',glow:'225,193,123'}
});
const BASE_IDS=Object.freeze(['explorer',...Object.keys(MONSTER_ART)]);
const DIRECTIONS=Object.freeze(['up','left','right']);
const DEFAULT_ANCHORS=Object.freeze({explorer:.991525,'explorer-up':.990183,'explorer-left':.980984,'explorer-right':.995376,moss:.94148,moth:.850041,golem:.991007,boss:.989684,sprout:.96875,cap:.96875,bat:.90234375,shell:.955078125,wisp:.96875,thorn:.96875,crab:.955078125,owl:.96875,mimic:.96875,lizard:.94921875,knight:.96875});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function browserLoadImage(url){
  return new Promise((resolve,reject)=>{
    if(typeof Image==='undefined'){reject(new Error('Image decoding is unavailable.'));return;}
    const image=new Image();image.decoding='async';
    image.onload=async()=>{
      try{if(typeof image.decode==='function')await image.decode();}
      catch(error){if(!image.naturalWidth){reject(error);return;}}
      if(image.naturalWidth&&image.naturalHeight)resolve(image);else reject(new Error('Empty character image.'));
    };
    image.onerror=()=>reject(new Error('Character image could not be loaded.'));
    image.src=url;
  });
}

function shadow(c,x,y,size,alpha=.28){
  c.fillStyle=`rgba(7,22,27,${alpha})`;c.beginPath();c.ellipse(x+size*.06,y+size*.025,size*.27,size*.085,.08,0,Math.PI*2);c.fill();
  c.fillStyle='rgba(5,20,25,.20)';c.beginPath();c.ellipse(x,y,size*.15,size*.045,0,0,Math.PI*2);c.fill();
}

export function createAnimeCharacterRenderer({loadImage=browserLoadImage,baseUrl=new URL('./assets/characters/',import.meta.url),sources={},anchors={}}={}){
  const entries=new Map();
  function source(id){return sources[id]||new URL(id+'.webp',baseUrl).href;}
  function start(id,retryFailed=false){
    const old=entries.get(id);if(old&&(!retryFailed||old.phase!=='failed'))return old.promise;
    const entry={phase:'loading',image:null,error:null,promise:null};entries.set(id,entry);
    entry.promise=Promise.resolve().then(()=>loadImage(source(id))).then(image=>{
      if(!(Number(image.naturalWidth||image.width)>0&&Number(image.naturalHeight||image.height)>0))throw new Error('Invalid image dimensions.');
      entry.image=image;entry.phase='ready';
    }).catch(error=>{entry.phase='failed';entry.error=String(error?.message||error);});
    return entry.promise;
  }
  function getCharacterAssetStatus(){
    const ready=[],failed=[],loading=[];
    for(const [id,e]of entries)(e.phase==='ready'?ready:e.phase==='failed'?failed:loading).push(id);
    return{ready,failed,loading,complete:entries.size>0&&loading.length===0,baseReady:BASE_IDS.every(id=>entries.get(id)?.phase==='ready')};
  }
  async function preloadCharacters({views=[],retryFailed=false}={}){
    const ids=[...BASE_IDS,...DIRECTIONS.filter(d=>views.includes(d)).map(d=>'explorer-'+d)];
    await Promise.all(ids.map(id=>start(id,retryFailed)));return getCharacterAssetStatus();
  }
  function imageFor(id){return entries.get(id)?.phase==='ready'?entries.get(id).image:null;}
  function geometry(image,id,size,heightFactor){
    const iw=image.naturalWidth||image.width,ih=image.naturalHeight||image.height;
    return{iw,ih,width:size*heightFactor*iw/ih,height:size*heightFactor,anchor:anchors[id]??DEFAULT_ANCHORS[id]??.97};
  }
  function fullImage(c,image,g){c.drawImage(image,-g.width/2,-g.height*g.anchor,g.width,g.height);}

  // A shallow overlap at the tunic hem conceals the leg joints. The two boot
  // regions alternate by less than two screen pixels instead of sliding a flat card.
  function walkingImage(c,image,g,step){
    const hip=.70,overlap=.025,split=.50;
    const top=-g.height*g.anchor,left=-g.width/2;
    for(const [side,phase]of [[0,1],[1,-1]]){
      const sx=side?g.iw*split:0,sw=side?g.iw*(1-split):g.iw*split;
      const sy=g.ih*(hip-overlap),sh=g.ih-sy,dx=left+(side?g.width*split:0),dw=g.width*(side?1-split:split);
      c.save();c.translate(dx+dw/2,top+g.height*(hip-overlap));c.rotate(step*phase*.035);
      c.drawImage(image,sx,sy,sw,sh,-dw/2,step*phase*g.height*.022,dw,g.height*(1-hip+overlap));c.restore();
    }
    c.drawImage(image,0,0,g.iw,g.ih*(hip+overlap),left,top-Math.abs(step)*g.height*.008,g.width,g.height*(hip+overlap));
  }

  function drawAnimeExplorer(c,x,y,size=40,time=0,motion={}){
    const facing=['up','down','left','right'].includes(motion.facing)?motion.facing:'down';
    const specific=facing==='down'?null:imageFor('explorer-'+facing),image=specific||imageFor('explorer');if(!image)return false;
    const key=specific?'explorer-'+facing:'explorer',g=geometry(image,key,size,1.42),reduced=!!motion.reducedMotion;
    const progress=clamp(Number(motion.progress??1),0,1),walking=!reduced&&motion.kind==='move'&&progress<1;
    const attacking=!reduced&&motion.kind==='attack'&&progress<1,step=walking?Math.sin(progress*Math.PI*4):0;
    const attack=attacking?Math.sin(progress*Math.PI):0,dir=facing==='left'?-1:facing==='right'?1:0;
    const foot=y+size*.3,breath=reduced||walking||attacking?0:Math.sin(time/650)*.005;
    c.save();shadow(c,x,foot,size);c.translate(x+dir*attack*size*.14,foot+(facing==='up'?-1:facing==='down'?1:0)*attack*size*.08);
    c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    c.rotate((walking?step*.012:0)+dir*attack*.10);c.scale(1,1+breath);
    if(walking)walkingImage(c,image,g,step);else fullImage(c,image,g);
    c.restore();return true;
  }

  function drawAnimeMonster(c,enemy,x,y,size=40,time=0,{reducedMotion=false}={}){
    const id=String(enemy.kind||'moss'),image=imageFor(id);if(!image)return false;
    const art=MONSTER_ART[id]||{height:1,motion:'heavy'},g=geometry(image,id,size,art.height);
    const period=art.motion==='flutter'?170:art.motion==='slow'?1100:650;
    const phase=reducedMotion?0:Math.sin(time/period+(Number(enemy.x)||0));
    const foot=y+size*.25,float=art.float?size*(art.float+phase*.025):0;
    c.save();shadow(c,x,foot,size,art.float?.16:.28);
    if(art.glow){
      const glow=c.createRadialGradient(x,foot-size*.35,0,x,foot-size*.35,size*.75);
      glow.addColorStop(0,`rgba(${art.glow},${.10+phase*.018})`);glow.addColorStop(1,`rgba(${art.glow},0)`);c.fillStyle=glow;c.fillRect(x-size*.75,foot-size*1.1,size*1.5,size*1.5);
    }
    c.translate(x,foot-float);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    if(art.motion==='flutter')c.scale(reducedMotion?1:.94+phase*.06,1);
    else if(art.motion==='sway')c.rotate(phase*.012);
    else if(art.motion==='scuttle')c.translate(phase*size*.014,0);
    else if(art.motion==='hover')c.rotate(phase*.018);
    else if(art.motion==='breathe')c.scale(1+phase*.006,1+phase*.014);
    else c.scale(1,1+phase*.006);
    fullImage(c,image,g);c.restore();
    if(Number.isFinite(enemy.hp)&&Number.isFinite(enemy.maxHp)&&enemy.maxHp>0&&enemy.hp<enemy.maxHp){
      const width=Math.max(24,size*.72),top=foot-float-g.height*g.anchor-8;
      c.save();c.fillStyle='#0e1d28';c.fillRect(x-width/2,top,width,5);c.fillStyle='#eca27c';c.fillRect(x-width/2+1,top+1,(width-2)*clamp(enemy.hp/enemy.maxHp,0,1),3);c.restore();
    }
    return true;
  }
  return{preloadCharacters,getCharacterAssetStatus,drawAnimeExplorer,drawAnimeMonster};
}

const renderer=createAnimeCharacterRenderer();
export const preloadCharacters=renderer.preloadCharacters;
export const getCharacterAssetStatus=renderer.getCharacterAssetStatus;
export const drawAnimeExplorer=renderer.drawAnimeExplorer;
export const drawAnimeMonster=renderer.drawAnimeMonster;
