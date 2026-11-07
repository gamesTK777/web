// Shared, presentation-only anime scenery. Assets never participate in collision
// or saved state; decoded images replace smooth vector fallbacks independently.
export const ENVIRONMENT_IDS=Object.freeze(['trade','inn','gate','cottage','workshop','tree','grass','stone-floor','stone-wall']);
export const DUNGEON_THEMES=Object.freeze([
  {name:'翠緑の石廊',floor:'#78928a',floor2:'#627d77',edge:'#344b50',wall:'#789288',shade:'#3c5d5b',highlight:'#bed1b3',wash:'#5b866d'},
  {name:'青水の遺構',floor:'#77999e',floor2:'#5b808d',edge:'#314758',wall:'#7f9da4',shade:'#375c70',highlight:'#c4dbcf',wash:'#438999'},
  {name:'琥珀の回廊',floor:'#a39783',floor2:'#817c73',edge:'#4f4750',wall:'#a89583',shade:'#655966',highlight:'#e2cfaa',wash:'#a77753'},
  {name:'紫晶の深殿',floor:'#8e8ba3',floor2:'#696d8d',edge:'#393e5b',wall:'#9a95b2',shade:'#4f5277',highlight:'#d4c9e7',wash:'#8271b0'},
  {name:'暁の聖域',floor:'#b0ad99',floor2:'#858d8d',edge:'#49515f',wall:'#b4b6b6',shade:'#63778d',highlight:'#f0dfb2',wash:'#b99a5d'}
]);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hash=(a,b)=>{let n=Math.imul(a+17,374761393)^Math.imul(b+29,668265263);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;};
function browserLoad(url){return new Promise((resolve,reject)=>{if(typeof Image==='undefined'){reject(Error('Image decoding unavailable'));return;}const i=new Image();i.decoding='async';i.onload=async()=>{try{if(i.decode)await i.decode();}catch{}if((i.naturalWidth||i.width)>0)resolve(i);else reject(Error('Empty scenery image'));};i.onerror=()=>reject(Error('Scenery image unavailable'));i.src=url;});}
function rounded(c,x,y,w,h,r=5){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);c.closePath();}
function gradient(c,x,y,w,h,a,b){const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g;}
function canvas(w,h){const cv=typeof OffscreenCanvas!=='undefined'?new OffscreenCanvas(w,h):typeof document!=='undefined'?document.createElement('canvas'):null;if(cv){cv.width=w;cv.height=h;}return cv;}
export function createEnvironmentRenderer({loadImage=browserLoad,baseUrl=new URL('./assets/environment/',import.meta.url)}={}){
  const entries=new Map(),tileCache=new Map();let revision=0;
  function begin(id,retry){const old=entries.get(id);if(old&&(!retry||old.phase!=='failed'))return old.promise;const item={phase:'loading',image:null};entries.set(id,item);item.promise=Promise.resolve().then(()=>loadImage(new URL(id+'.webp',baseUrl).href)).then(image=>{if(!(Number(image.naturalWidth||image.width)>0&&Number(image.naturalHeight||image.height)>0))throw Error('Invalid scenery dimensions');item.image=image;item.phase='ready';revision++;tileCache.clear();}).catch(()=>{item.phase='failed';});return item.promise;}
  function getEnvironmentAssetStatus(){const result={ready:[],failed:[],loading:[],complete:entries.size===ENVIRONMENT_IDS.length,revision};for(const[id,item]of entries)result[item.phase==='ready'?'ready':item.phase==='failed'?'failed':'loading'].push(id);result.complete=result.complete&&result.loading.length===0;return result;}
  async function preloadEnvironment({retryFailed=false}={}){await Promise.all(ENVIRONMENT_IDS.map(id=>begin(id,retryFailed)));return getEnvironmentAssetStatus();}
  const image=id=>entries.get(id)?.phase==='ready'?entries.get(id).image:null;
  function drawEnvironmentSprite(c,id,{x,y,width,height,flip=false}){const i=image(id);if(!i)return false;c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(flip){c.translate(x+width,y);c.scale(-1,1);c.drawImage(i,0,0,width,height);}else c.drawImage(i,x,y,width,height);c.restore();return true;}
  function drawEnvironmentTexture(c,id,{x,y,width,height,tileSize=192,alpha=1}){const i=image(id);if(!i||!(width>0&&height>0))return false;const iw=i.naturalWidth||i.width,ih=i.naturalHeight||i.height;c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';c.globalAlpha*=alpha;const startX=Math.floor(x/tileSize)*tileSize,startY=Math.floor(y/tileSize)*tileSize;c.beginPath();c.rect(x,y,width,height);c.clip();for(let yy=startY;yy<y+height;yy+=tileSize)for(let xx=startX;xx<x+width;xx+=tileSize)c.drawImage(i,0,0,iw,ih,xx,yy,tileSize,tileSize);c.restore();return true;}
  function paintTile(c,value,variant,theme){
    const n=128,p=DUNGEON_THEMES[theme];c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    c.fillStyle=gradient(c,0,0,n,n,p.floor,p.floor2);c.fillRect(0,0,n,n);
    const tex=image(value===0?'stone-wall':'stone-floor');
    if(tex){c.globalAlpha=.72;c.drawImage(tex,0,0,n,n);c.globalAlpha=1;c.globalCompositeOperation='multiply';c.fillStyle=p.wash;c.globalAlpha=.22;c.fillRect(0,0,n,n);c.globalCompositeOperation='source-over';c.globalAlpha=1;}
    if(value===0){
      c.fillStyle=gradient(c,0,0,0,n,p.wall,p.shade);c.globalAlpha=tex?.48:1;c.fillRect(0,0,n,n);c.globalAlpha=1;
      for(let row=0;row<3;row++){const yy=3+row*37,shift=row%2?-33:0;for(let x=shift;x<n;x+=65){rounded(c,x+2,yy,62,33,5);c.fillStyle=gradient(c,x,yy,63,33,p.wall,p.shade);c.globalAlpha=tex?.25:1;c.fill();c.globalAlpha=1;c.strokeStyle=p.edge;c.lineWidth=2;c.stroke();c.beginPath();c.moveTo(x+7,yy+4);c.lineTo(x+57,yy+4);c.strokeStyle=p.highlight;c.globalAlpha=.52;c.lineWidth=1.6;c.stroke();c.globalAlpha=1;}}
      c.fillStyle=gradient(c,0,110,0,18,'#172c3d00','#14212dcc');c.fillRect(0,110,n,18);
      if(variant%5===0){c.strokeStyle=p.edge;c.lineWidth=1.7;c.beginPath();c.moveTo(91,15);c.lineTo(86,26);c.lineTo(93,36);c.lineTo(88,43);c.stroke();}
    }else{
      if(!tex){for(let row=0;row<2;row++)for(let col=0;col<2;col++){const xx=col*64+2,yy=row*64+2;rounded(c,xx,yy,60,60,7);c.fillStyle=gradient(c,xx,yy,60,60,(row+col+variant)%2?p.floor:p.floor2,p.floor2);c.fill();c.strokeStyle=p.edge;c.lineWidth=2;c.stroke();c.beginPath();c.moveTo(xx+7,yy+3);c.lineTo(xx+51,yy+3);c.strokeStyle=p.highlight;c.globalAlpha=.42;c.lineWidth=1.5;c.stroke();c.globalAlpha=1;}}
      c.strokeStyle=p.edge;c.globalAlpha=.32;c.lineWidth=1.3;if(variant%4===0){c.beginPath();c.moveTo(19,12);c.lineTo(22,30);c.lineTo(17,42);c.lineTo(24,51);c.stroke();}c.globalAlpha=1;
      if(variant===7){c.fillStyle=p.highlight;c.globalAlpha=.11;c.beginPath();c.ellipse(93,95,20,11,-.25,0,Math.PI*2);c.fill();c.globalAlpha=1;}
      if(value===2){rounded(c,18,12,92,101,9);c.fillStyle='#1a2939';c.fill();c.strokeStyle=p.highlight;c.lineWidth=3;c.stroke();for(let i=0;i<6;i++){const x=24+i*2,y=22+i*14,w=80-i*4;c.fillStyle=gradient(c,x,y,w,10,p.wall,p.shade);rounded(c,x,y,w,12,2);c.fill();c.strokeStyle=p.highlight;c.globalAlpha=.7;c.lineWidth=1.7;c.beginPath();c.moveTo(x+2,y+1);c.lineTo(x+w-2,y+1);c.stroke();c.globalAlpha=1;}c.fillStyle='#edd49c';rounded(c,16,112,96,5,2);c.fill();}
      if(value===3){const g=c.createRadialGradient(64,65,4,64,65,61);g.addColorStop(0,'#c8f9df88');g.addColorStop(1,'#75d1cb00');c.fillStyle=g;c.fillRect(0,0,n,n);for(const r of [46,36]){c.beginPath();c.ellipse(64,69,r,r*.8,0,0,Math.PI*2);c.strokeStyle=r===46?'#e7cc8f':'#8ae4d9';c.lineWidth=r===46?3:2;c.stroke();}c.beginPath();c.moveTo(64,30);c.lineTo(81,65);c.lineTo(64,95);c.lineTo(47,65);c.closePath();c.fillStyle=gradient(c,48,32,30,60,'#eaffda','#55c2be');c.fill();c.strokeStyle='#b8f9da';c.lineWidth=2;c.stroke();}
    }
    c.restore();
  }
  function drawAnimeDungeonTile(c,x,y,size,value,variant=0,themeIndex=0){const theme=clamp(Math.trunc(themeIndex)||0,0,DUNGEON_THEMES.length-1),v=clamp(Math.trunc(value)||0,0,3),key=`${theme}:${v}:${variant%16}`;let cv=tileCache.get(key);if(cv===undefined){cv=canvas(128,128);if(cv)paintTile(cv.getContext('2d'),v,variant%16,theme);tileCache.set(key,cv);}c.save();c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';if(cv)c.drawImage(cv,x,y,size,size);else{c.translate(x,y);c.scale(size/128,size/128);paintTile(c,v,variant%16,theme);}c.restore();return true;}
  return{preloadEnvironment,getEnvironmentAssetStatus,getEnvironmentRevision:()=>revision,drawEnvironmentSprite,drawEnvironmentTexture,drawAnimeDungeonTile};
}
const environment=createEnvironmentRenderer();
export const preloadEnvironment=environment.preloadEnvironment;
export const getEnvironmentAssetStatus=environment.getEnvironmentAssetStatus;
export const getEnvironmentRevision=environment.getEnvironmentRevision;
export const drawEnvironmentSprite=environment.drawEnvironmentSprite;
export const drawEnvironmentTexture=environment.drawEnvironmentTexture;
export const drawAnimeDungeonTile=environment.drawAnimeDungeonTile;
