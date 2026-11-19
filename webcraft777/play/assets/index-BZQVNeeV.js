(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Br=27,Hn=64,je={1:{name:"草地",color:"#89ac57",block:!0},2:{name:"土",color:"#9a6e4a",block:!0},3:{name:"石",color:"#889594",block:!0},4:{name:"砂",color:"#e5cf91",block:!0},5:{name:"原木",color:"#926541",block:!0},6:{name:"葉",color:"#659650",block:!0},7:{name:"木材",color:"#c69562",block:!0},8:{name:"丸石",color:"#839593",block:!0},9:{name:"石レンガ",color:"#a1aaa0",block:!0},10:{name:"朝霧ガラス",color:"#b7e3db",block:!0},11:{name:"石炭鉱石",color:"#666e74",block:!0},12:{name:"灯晶ブロック",color:"#ffce68",block:!0},13:{name:"水",color:"#65b4cb",block:!1},14:{name:"岩盤",color:"#404b4c",block:!1},15:{name:"石炭",color:"#47545c",block:!1},16:{name:"棒",color:"#b28a60",block:!1},17:{name:"木のツルハシ",color:"#bd9265",block:!1,maxDurability:36},18:{name:"石のツルハシ",color:"#839fa7",block:!1,maxDurability:90},19:{name:"木の斧",color:"#c58e61",block:!1,maxDurability:36},20:{name:"石の斧",color:"#8ba39b",block:!1,maxDurability:90},21:{name:"作業台",color:"#bc905c",block:!0},22:{name:"収納チェスト",color:"#ba793e",block:!0},23:{name:"潮晶鉱石",color:"#58c2bf",block:!0},24:{name:"潮晶のかけら",color:"#6ce5db",block:!1},25:{name:"青磁のランタン",color:"#75e8d9",block:!0},26:{name:"潮晶の象眼タイル",color:"#72bfb0",block:!0}},ke=(i,e)=>({id:i,count:e});function kt(i,e,...t){return{id:i,name:je[e.id].name,inputs:t,output:e}}const Sl=[kt("boards",ke(7,4),ke(5,1)),kt("sticks",ke(16,4),ke(7,2)),kt("wood-pick",ke(17,1),ke(7,3),ke(16,2)),kt("wood-axe",ke(19,1),ke(7,3),ke(16,2)),kt("stone-pick",ke(18,1),ke(8,3),ke(16,2)),kt("stone-axe",ke(20,1),ke(8,3),ke(16,2)),kt("bricks",ke(9,4),ke(8,4)),kt("glass",ke(10,4),ke(4,3),ke(15,1)),kt("lamp",ke(12,2),ke(7,2),ke(15,1)),kt("bench",ke(21,1),ke(7,4)),kt("chest",ke(22,1),ke(7,6)),{...kt("crystal-lamp",ke(25,2),ke(24,1),ke(12,1)),bench:!0},{...kt("inlaid-tile",ke(26,8),ke(24,1),ke(8,4)),bench:!0},{...kt("crystal-cut",ke(24,2),ke(10,2),ke(15,1)),bench:!0,legacy:!0}];function No(i){return typeof i=="number"&&Number.isInteger(i)&&Object.hasOwn(je,i)&&i!==13&&i!==14}function Fu(i){if(!i||typeof i!="object")return!1;const{slots:e,hotbar:t}=i;return!Array.isArray(t)||t.length!==9||!Array.from(t).every(n=>n===0||No(n))?!1:yl(e)}function yl(i){return!Array.isArray(i)||i.length>Br?!1:Array.from(i).every(e=>{if(!e||!No(e.id)||!Number.isInteger(e.count)||e.count<1||e.count>Hn)return!1;const t=je[e.id].maxDurability;return t===void 0?e.durability===void 0:e.count===1&&Number.isInteger(e.durability)&&e.durability>=1&&e.durability<=t})}function Ou(i){return{slots:[],hotbar:i==="creative"?[1,2,3,5,7,8,9,10,12]:Array(9).fill(0)}}function vn(i,e){return i.slots.find(t=>t.id===e)}function ys(i,e){return i.slots.reduce((t,n)=>t+(n.id===e?n.count:0),0)}function El(i,e,t,n){if(!Number.isInteger(e)||e<0||e>=9||!No(t)||(n==="creative"?!je[t].block:!vn(i,t)))return!1;const s=i.hotbar.indexOf(t);return s>=0&&(i.hotbar[s]=i.hotbar[e]),i.hotbar[e]=t,!0}const zr=i=>({slots:i.slots.map(e=>({...e})),hotbar:[...i.hotbar]});function bl(i,e){if(i.hotbar.includes(e))return;let t=i.hotbar.indexOf(0);t<0&&(t=i.hotbar.findIndex(n=>!vn(i,n))),t>=0&&(i.hotbar[t]=e)}function Fo(i,e,t){const n=je[e].maxDurability;if(!n)for(const s of i.slots){if(s.id!==e)continue;const r=Math.min(t,Hn-s.count);if(s.count+=r,t-=r,!t)break}for(;t>0;){if(i.slots.length>=Br)return!1;const s=n?1:Math.min(t,Hn);i.slots.push(n?{id:e,count:1,durability:n}:{id:e,count:s}),t-=s}return bl(i,e),!0}function Tl(i,e,t){const n=i.slots.filter(s=>s.id===e).sort((s,r)=>s.count-r.count);for(const s of n){const r=Math.min(s.count,t);if(s.count-=r,t-=r,!t)break}i.slots=i.slots.filter(s=>s.count>0)}function Oo(i,e){return Math.min(...e.inputs.map(t=>Math.floor(ys(i,t.id)/t.count)))}function Al(i,e){for(const t of e.inputs)Tl(i,t.id,t.count);return Fo(i,e.output.id,e.output.count)}function Bo(i,e,t){return e.legacy&&t?.generator!==1?"旧ワールド専用の加工です。":wl(e,t?.generator??1)&&!t?.bench?"作業台を右クリックして作ります。":Oo(i,e)?"":"材料が足りません。"}function wl(i,e){return!!(i.bench||e===2&&["stone-pick","stone-axe","bricks","glass"].includes(i.id))}function Bu(i,e,t){if(Bo(i,e,t))return 0;const n=Oo(i,e);if(!n)return 0;const s=zr(i);let r=0;for(;r<n&&Al(s,e);)r++;return r}function zu(i,e,t=1,n){const s=Sl.find(o=>o.id===e);if(!s||!Number.isSafeInteger(t)||t<1)return{ok:!1,message:"レシピか制作数を確認してください。"};const r=Bo(i,s,n);if(r)return{ok:!1,message:r};if(Oo(i,s)<t)return{ok:!1,message:"材料が足りません。"};const a=zr(i);for(let o=0;o<t;o++)if(!Al(a,s))return{ok:!1,message:"所持品に空きがありません。"};return Object.assign(i,a),{ok:!0,message:s.name+"を"+s.output.count*t+"個作りました。"}}function ku(i,e,t){return je[i]?.block?t==="creative"?.12:i===23&&e!==17&&e!==18?1/0:[3,8,9,11,23,26].includes(i)?(i===11?2.6:1.85)*(e===18?.19:e===17?.34:1):[5,7,21,22].includes(i)?e===20?.29:e===19?.48:1.12:i===6||i===10?.24:.48:1/0}function Hu(i,e,t){if(!je[e]?.block)return{message:"この素材は採取できません。"};if(e===23&&(![17,18].includes(t)||!vn(i,t)))return{message:"潮晶鉱石には木か石のツルハシが必要です。"};const n=zr(i),s=vn(n,t);let r=!1;s?.durability&&--s.durability<=0&&(n.slots.splice(n.slots.indexOf(s),1),r=!0);const a=e===3?8:e===11?15:e===23?24:e,o=e===11||e===23?2:1;return Fo(n,a,o)?{draft:n,message:je[a].name+" +"+o+(r?" ／ "+je[t].name+"が壊れました。":"")}:{message:"所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。"}}function Vu(i,e){return!je[e]?.block||!vn(i,e)?!1:(Tl(i,e,1),!0)}function Gu(i,e){const t=i[e];if(!t||t.count<2)return{ok:!1,message:"2個以上の束を選んでください。"};if(i.length>=Br)return{ok:!1,message:"分割するための空き枠がありません。"};const n=Math.floor(t.count/2);return t.count-=n,i.splice(e+1,0,{id:t.id,count:n}),{ok:!0,message:"束を2つに分けました。"}}function Wu(i){const e=[...i].sort((n,s)=>n.id-s.id||(n.durability??0)-(s.durability??0)),t=[];for(const n of e){const s=t.at(-1);let r=n.count;if(!n.durability&&s?.id===n.id){const a=Math.min(r,Hn-s.count);s.count+=a,r-=a}r&&t.push({...n,count:r})}return i.splice(0,i.length,...t),{ok:!0,message:"同じ素材をまとめて整頓しました。"}}function Xu(i,e,t,n){const s=i[t];if(!s||n<=0||n>s.count)return!1;const r=!!s.durability,a=Br-e.length,o=r?0:e.reduce((l,u)=>l+(u.id===s.id?Hn-u.count:0),0);if(a*(r?1:Hn)+o<n)return!1;let c=n;if(!r)for(const l of e){if(l.id!==s.id)continue;const u=Math.min(Hn-l.count,c);if(l.count+=u,c-=u,!c)break}return c&&e.push({...s,count:c}),s.count-=n,s.count||i.splice(t,1),!0}function Rl(i,e,t,n,s=!1){const[r,a]=t==="bag"?[i.slots,e]:[e,i.slots],o=r[n];if(!o)return{ok:!1,message:"移す束を選んでください。"};const c=s?Math.ceil(o.count/2):o.count;return Xu(r,a,n,c)?(t==="chest"&&bl(i,o.id),{ok:!0,message:je[o.id].name+"を"+c+"個移しました。"}):{ok:!1,message:"移動先の空きが足りません。"}}function qu(i,e,t,n){if(e!=="creative"||!je[t]?.block||![1,Hn].includes(n))return{ok:!1,message:"建材と個数を確認してください。"};const s=zr(i);return Fo(s,t,n)?(Object.assign(i,s),{ok:!0,message:je[t].name+"を"+n+"個補充しました。"}):{ok:!1,message:"所持品の空きが足りません。"}}function Yu(i,e,t){const n=t==="bag"?i.slots:e;let s=0;for(let r=n.length-1;r>=0;r--)Rl(i,e,t,r).ok&&s++;return{ok:s>0,message:s?s+"束を移しました。"+(n.length?"空き不足で残った束があります。":""):"移動できる束がありません。"}}function Ku(i){const e=r=>Math.floor(i.noise(r,777)*9)-4,n=[{kind:"grove",name:"風待ちの大樹",x:91+e(1),z:150+e(2)},{kind:"cave",name:"潮晶の岩窟",x:163+e(3),z:151+e(4)},{kind:"ruin",name:"潮見の回廊",x:117+e(5),z:188+e(6)}].map(r=>({...r,y:Math.max(31,Math.min(48,i.ground(r.x,r.z)))+1})),s=(r,a,o,c,l)=>{const u=i.ground(r,a);for(let f=Math.min(u,o)-3;f<=o;f++)i.put(r,f,a,f===o?c:f>=o-2?2:3);for(let f=o+1;f<=Math.max(l,u+10);f++)i.put(r,f,a,0)};for(const r of n){const a=r.y-1,o=r.kind==="cave"?r.x-3:r.x,c=r.kind==="grove"?r.z-3:r.kind==="ruin"?r.z-5:r.z,l=Math.max(Math.abs(o-128),Math.abs(c-139));for(let u=2;u<=l;u++){const f=u/l,h=Math.round(128+(o-128)*f),d=Math.round(139+(c-139)*f),g=Math.min(1,Math.max(0,u-5)/(l-12)),_=32+Math.round((a-32)*g);for(let m=-1;m<=1;m++)for(let p=-1;p<=1;p++){const T=m===0&&p===0&&i.noise(h,d)>.68?8:1;s(h+m,d+p,_,T,_+3)}}if(r.kind==="grove"){for(let u=-6;u<=6;u++)for(let f=-6;f<=6;f++)u*u+f*f<38&&s(r.x+u,r.z+f,a,1,a+13);for(let u=0;u<2;u++)for(let f=0;f<2;f++)for(let h=1;h<=12;h++)i.put(r.x+u,a+h,r.z+f,5);for(const[u,f,h,d]of[[-3,0,4,10],[3,0,4,11],[0,-3,3,11],[0,3,4,12],[0,0,4,14]]){for(let g=1;g<=3;g++)i.put(r.x+Math.round(u*g/3),a+d-3+g,r.z+Math.round(f*g/3),5);for(let g=-h;g<=h;g++)for(let _=-h;_<=h;_++)for(let m=-2;m<=2;m++)(g*g+_*_)/(h*h)+m*m/5>1.12+i.noise(g+r.x,_+r.z)*.12||i.get(r.x+u+g,a+d+m,r.z+f+_)||i.put(r.x+u+g,a+d+m,r.z+f+_,6)}for(const[u,f]of[[-1,0],[2,1],[0,-1],[1,2]])i.put(r.x+u,a+1,r.z+f,5)}else if(r.kind==="cave"){for(let u=-3;u<=20;u++)for(let f=-9;f<=9;f++){const h=r.x+u,d=r.z+f,g=Math.max(0,1-((u-8)/13)**2-(f/9)**2);if(!g&&(u>2||Math.abs(f)>3))continue;const _=a+Math.round(g*8);s(h,d,_,1,_+4);for(let m=a-2;m<_;m++)i.put(h,m,d,3);if(u>=-3&&u<=15){const m=u<4?1:u<13?3:2;if(Math.abs(f)<=m){i.put(h,a,d,i.noise(h,d)>.72?8:3);for(let p=1;p<=(m===3?4:3);p++)i.put(h,a+p,d,0)}}}for(const[u,f,h]of[[5,1,-4],[6,2,-4],[7,2,-4],[9,1,4],[10,2,4],[11,1,4],[14,1,-3],[16,2,0]])i.put(r.x+u,a+f,r.z+h,23);for(const[u,f,h]of[[1,1,-2],[2,2,-2],[3,1,2]])i.put(r.x+u,a+f,r.z+h,11)}else{for(let u=-5;u<=5;u++)for(let f=-5;f<=5;f++){const h=r.x+u,d=r.z+f,_=Math.max(Math.abs(u),Math.abs(f))===5&&i.noise(h,d)<.45?8:Math.abs(u)<2&&f%3===0?26:9;s(h,d,a,_,a+9)}for(const u of[-4,4])for(const f of[-3,0,3]){const h=f===3?5:2+Math.floor(i.noise(r.x+u,r.z+f)*3);for(let d=1;d<=h;d++)i.put(r.x+u,a+d,r.z+f,d===1?8:9)}for(let u=-4;u<=4;u++)i.put(r.x+u,a+5,r.z+3,u===0?26:9)}}return n}const ot=256,Bn=96,ju=16,Vs=28,li=ot*ot,uc=Bn/ju,Rr=li*Bn,Xt=128,qt=139,Cl=()=>({axes:[],chests:[],benches:[]});function za(i){return typeof i=="number"&&Number.isInteger(i)&&(i>=0&&i<=13||[21,22,23,25,26].includes(i))}function Pl(i){if(!i||typeof i!="object")return!1;const e=i,t=(n,s)=>{if(!Array.isArray(n)||n.length>Rr-li)return!1;const r=new Set;for(const a of n){if(!Array.isArray(a)||a.length!==2||!Number.isInteger(a[0])||a[0]<li||a[0]>=Rr||r.has(a[0])||!s(a[1]))return!1;r.add(a[0])}return!0};return t(e.axes,n=>n==="x"||n==="z")&&t(e.chests,yl)&&t(e.benches,n=>Number.isSafeInteger(n)&&Number(n)>=0)}const It=(i,e,t)=>i+ot*t+li*e,Es=(i,e,t)=>i+16*t+256*e;function Ii(i,e,t){return i>=0&&e>=0&&t>=0&&i<ot&&e<Bn&&t<ot}function gs(i){return i!==0&&i!==6&&i!==10&&i!==13}function Gs(i){return i!==0&&i!==13}function $u(i,e,t){const n=[];for(let s=Math.max(0,e-1>>4);s<=Math.min(5,e+1>>4);s++)for(let r=Math.max(0,t-1>>4);r<=Math.min(15,t+1>>4);r++)for(let a=Math.max(0,i-1>>4);a<=Math.min(15,i+1>>4);a++)n.push(Es(a,s,r));return n}function Zu(i){let e=2166136261;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),16777619);return e>>>0}function rt(i,e,t=0){let n=Math.imul(i^t,2654435761)^Math.imul(e,2246822519);return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),((n^n>>>16)>>>0)/4294967296}function ts(i,e,t,n){i/=t,e/=t;const s=Math.floor(i),r=Math.floor(e);let a=i-s,o=e-r;a=a*a*(3-2*a),o=o*o*(3-2*o);const c=rt(s,r,n),l=rt(s+1,r,n),u=rt(s,r+1,n),f=rt(s+1,r+1,n);return c+(l-c)*a+(u-c)*o+(c-l-u+f)*a*o}const fs=(i,e=0,t=1)=>Math.min(t,Math.max(e,i));function Ws(i,e,t){const n=fs((t-i)/(t-e));return n*n*(3-2*n)}class kr{data=new Uint8Array(Rr);highest=new Int16Array(li);occupied=new Uint16Array(256*uc);dense=new Uint16Array(256*uc);lamps=new Set;salt;generator;landmarks=[];axes=new Map;chests=new Map;benches=new Map;history=[];heights=new Uint8Array(li);edits=new Map;listeners=new Set;constructor(e,t=!1,n=1){if(this.salt=Zu(e),this.generator=n,!t)for(const s of this.generateTerrain());}static async generate(e,t,n=1){const s=new kr(e,!0,n);let r=performance.now();for(const a of s.generateTerrain())performance.now()-r<7&&a<1||(t?.(a),await new Promise(o=>setTimeout(o,0)),r=performance.now());return s}get(e,t,n){return Ii(e,t,n)&&Number.isInteger(e)&&Number.isInteger(t)&&Number.isInteger(n)?this.data[It(e,t,n)]:0}write(e,t,n,s){Ii(e,t,n)&&(this.data[It(e,t,n)]=s)}heightAt(e,t){const n=ts(e,t,47,this.salt),s=ts(e,t,31,this.salt^109),r=ts(e,t,11,this.salt^51);let a=22+n*18+Math.max(0,s-.47)*47+r*3;const o=Math.hypot((e-131)/1.55,t-111),c=Ws(o+(r-.5)*5,12,24);a=a*(1-c)+(25+r*2)*c;const l=Ws(Math.hypot(e-Xt,t-qt),5.4,14);a=a*(1-l)+(32+.3*r)*l;const u=qt-t;if(u>4&&u<27){const h=Ws(Math.abs(e-(Xt+2)),4,12),d=32-fs((u-4)/15)*6+.15*r;a-=Math.max(0,a-d)*h}const f=Ws(Math.hypot((e-118)/1.6,t-75),5,28);return a+=f*(8+7*r),fs(Math.floor(a),6,Bn-14)}*generateTerrain(){for(let s=0;s<ot;s++){for(let r=0;r<ot;r++){const a=this.heightAt(r,s),o=a<=Vs+1||a<Vs+4&&ts(r,s,17,this.salt^311)>.65,c=r===0||s===0||r===ot-1||s===ot-1;this.heights[r+ot*s]=a;for(let l=0;l<=Math.max(a,Vs);l++){const u=l===0||c&&l===a?14:l>a?13:l===a?o?4:1:l>=a-3?o?4:2:3;this.data[It(r,l,s)]=u}}s%4===3&&(yield .46*(s+1)/ot)}let e=0;const t=()=>rt(++e,319,this.salt),n=(s,r,a,o,c)=>{for(let l=-Math.ceil(c);l<=c;l++)for(let u=-Math.ceil(o);u<=o;u++)for(let f=-Math.ceil(o);f<=o;f++){if((f*f+u*u)/(o*o)+l*l/(c*c)>1)continue;const h=Math.floor(s)+f,d=Math.floor(r)+l,g=Math.floor(a)+u;if(d<2||h<=0||g<=0||h>=255||g>=255||!Ii(h,d,g))continue;const _=this.heights[h+ot*g];_<=Vs&&d>=_-2||Math.abs(h-Xt)<5&&Math.abs(g-qt)<5&&d>27||this.write(h,d,g,0)}};for(let s=0;s<108;s++){let r=5+t()*246,a=5+t()*246,o=5+t()*(this.heights[(r|0)+ot*(a|0)]-5),c=t()*Math.PI*2,l=(t()-.5)*.6;const u=17+Math.floor(t()*40);for(let f=0;f<u;f++){const h=1.65+1.15*Math.sin(Math.PI*f/u);n(r,o,a,h,h*.7),c+=(t()-.5)*.56,l=fs(l+(t()-.5)*.17,-.45,.45),r+=Math.cos(c),a+=Math.sin(c),o+=l}s%4===3&&(yield .46+.12*(s+1)/108)}for(let s=0;s<13;s++){const r=Xt+12+s,a=qt-2;n(r,this.heights[Xt+12+ot*a]+1-s*.4,a,2.5,2.2)}for(let s=0;s<1800;s++){const r=2+Math.floor(t()*252),a=2+Math.floor(t()*252),o=2+Math.floor(t()*(this.heights[r+ot*a]-3));for(let c=0;c<8;c++){const l=r+Math.floor(t()*3)-1,u=a+Math.floor(t()*3)-1,f=o+Math.floor(t()*3)-1;this.get(l,f,u)===3&&this.write(l,f,u,11)}s%160===0&&(yield .59+.06*s/1800)}for(let s=-3;s<=3;s++)for(let r=-2;r<=2;r++){if(s*s*.55+r*r>4.8)continue;const a=Xt+6+s,o=qt-4+r,c=this.heights[a+ot*o],l=s*s+r*r<3?2:1;for(let u=c-2;u<c+l;u++)this.write(a,u,o,3);s===0&&r===0&&this.write(a,c+1,o,11)}for(let s=0;s<51;s++){for(let r=0;r<51;r++){const a=r*5+1+Math.floor(rt(r,s,this.salt^134)*3),o=s*5+1+Math.floor(rt(r,s,this.salt^854)*3);if(Math.hypot(a-Xt,o-qt)<10||o<qt&&o>qt-26&&Math.abs(a-(Xt+2))<5)continue;const c=ts(a,o,35,this.salt^482),l=.026+.75*fs((c-.38)*3.6);rt(r,s,this.salt^723)<l&&this.tree(a,o)}s%3===2&&(yield .65+.13*(s+1)/51)}this.tree(Xt-2,qt-3,!0),this.tree(Xt-7,qt-7,!0),this.tree(Xt+12,qt-10,!0),this.generator===2&&(this.landmarks=Ku({ground:(s,r)=>this.heights[s+ot*r],noise:(s,r)=>rt(s,r,this.salt^1911),get:(s,r,a)=>this.get(s,r,a),put:(s,r,a,o)=>this.write(s,r,a,o)})),this.highest.fill(-1);for(let s=0;s<Bn;s++){for(let r=0;r<ot;r++)for(let a=0;a<ot;a++){const o=this.data[It(a,s,r)];if(!o)continue;const c=Es(a>>4,s>>4,r>>4);this.occupied[c]++,gs(o)&&this.dense[c]++,Gs(o)&&o!==10&&(this.highest[a+ot*r]=s)}s%4===3&&(yield .78+.22*(s+1)/Bn)}}tree(e,t,n=!1){const s=this.heights[e+ot*t];if(this.get(e,s,t)!==1||this.get(e,s+1,t)!==0)return;const r=rt(e,t,this.salt^813),a=!n&&r>.68,o=(a?6:4)+Math.floor(rt(e,t,this.salt^102)*3);for(let u=1;u<=o;u++)this.write(e,s+u,t,5);const c=a?3:o-1,l=o+2;for(let u=c;u<=l;u++){const f=a?Math.min(2,Math.ceil((l-u)*.43)):u===l?1:2;for(let h=-f;h<=f;h++)for(let d=-f;d<=f;d++)Math.abs(h)===f&&Math.abs(d)===f&&f>0&&(a||rt(e+h,t+d,this.salt^u)<.72)||!Ii(e+h,s+u,t+d)||this.get(e+h,s+u,t+d)!==0||this.write(e+h,s+u,t+d,6)}}spawn(){for(let e=0;e<32;e++)for(let t=-e;t<=e;t++)for(let n=-e;n<=e;n++){if(Math.max(Math.abs(n),Math.abs(t))!==e)continue;const s=Xt+n,r=qt+t;for(let a=Bn-3;a>0;a--){const o=this.get(s,a,r);if(!(!Gs(o)||o===6||o===5||this.get(s,a+1,r)!==0||this.get(s,a+2,r)!==0))return{x:s+.5,y:a+1.001,z:r+.5,yaw:-.075,pitch:-.085}}}return{x:Xt+.5,y:Bn+.01,z:qt+.5,yaw:0,pitch:0}}onEdit(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}set(e,t,n,s){if(!Number.isInteger(e)||!Number.isInteger(t)||!Number.isInteger(n)||!Ii(e,t,n)||!za(s)||t===0)return!1;const r=It(e,t,n),a=this.data[r];if(a===s||a===14||a===22&&this.chests.get(r)?.length)return!1;const o=this.edits.get(r)?.base??a;return s===o?this.edits.delete(r):this.edits.set(r,{id:s,base:o}),this.replace(e,t,n,s),!0}replace(e,t,n,s){const r=It(e,t,n),a=this.data[r],o=Es(e>>4,t>>4,n>>4);this.data[r]=s,this.axes.delete(r),this.chests.delete(r),this.benches.delete(r),this.occupied[o]+=+(s!==0)-+(a!==0),this.dense[o]+=Number(gs(s))-Number(gs(a)),(a===12||a===25)&&this.lamps.delete(r),(s===12||s===25)&&this.lamps.add(r);const c=e+ot*n;if(t>=this.highest[c]){let l=Math.max(t,this.highest[c]);for(;l>=0&&(!Gs(this.data[It(e,l,n)])||this.data[It(e,l,n)]===10);)l--;this.highest[c]=l}for(const l of this.listeners)l(e,t,n)}exportEdits(){return Array.from(this.edits,([e,{id:t}])=>[e,t])}loadEdits(e){const t=new Set;for(const[n,s]of e){if(!Number.isInteger(n)||n<li||n>=Rr||!za(s)||t.has(n)||(this.edits.get(n)?.base??this.data[n])===14)throw new Error("地形の変更データが不正です。");t.add(n)}this.history=[],this.axes.clear(),this.benches.clear(),this.chests.clear();for(const[n,{base:s}]of this.edits)this.replace(n%256,n>>>16,n>>>8&255,s);this.edits.clear();for(const[n,s]of e)this.set(n%256,n>>>16,n>>>8&255,s)}axisAt(e,t,n){return this.axes.get(It(e,t,n))??"y"}setAxis(e,t,n,s){if(this.get(e,t,n)!==5||!["x","y","z"].includes(s))return!1;if(this.axisAt(e,t,n)===s)return!0;const r=It(e,t,n);s==="y"?this.axes.delete(r):this.axes.set(r,s);for(const a of this.listeners)a(e,t,n);return!0}chestAt(e,t,n){if(this.get(e,t,n)!==22)return;const s=It(e,t,n),r=this.chests.get(s)??[];return this.chests.set(s,r),r}benchUses(e,t,n){return this.benches.get(It(e,t,n))??0}useBench(e,t,n,s=1){this.get(e,t,n)!==21||!Number.isSafeInteger(s)||s<1||this.benches.set(It(e,t,n),Math.min(Number.MAX_SAFE_INTEGER,this.benchUses(e,t,n)+s))}exportFixtures(){return{axes:[...this.axes],benches:[...this.benches],chests:[...this.chests].filter(([,e])=>e.length).map(([e,t])=>[e,t.map(n=>({...n}))])}}loadFixtures(e){if(!Pl(e)||e.axes.some(([n])=>this.data[n]!==5)||e.chests.some(([n])=>this.data[n]!==22)||e.benches.some(([n])=>this.data[n]!==21))throw new Error("建具と地形の保存内容が一致しません。元のバックアップを確認してください。");const t=new Set([...this.axes.keys(),...e.axes.map(([n])=>n)]);this.axes=new Map(e.axes),this.benches=new Map(e.benches),this.chests=new Map(e.chests.map(([n,s])=>[n,s.map(r=>({...r}))]));for(const n of t)for(const s of this.listeners)s(n%256,n>>>16,n>>>8&255)}capture(e,t,n){return{x:e,y:t,z:n,id:this.get(e,t,n),axis:this.axisAt(e,t,n)}}remember(e){const t=this.capture(e.x,e.y,e.z);e.id===21||e.id===22||t.id===21||t.id===22||e.id===t.id&&e.axis===t.axis||(this.history.push({before:e,after:t}),this.history.length>20&&this.history.shift())}undo(e){const t=this.history.at(-1);if(!t)return{ok:!1,message:"戻せる通常ブロックの編集がありません。作業台・チェストは対象外です。"};const{before:n,after:s}=t,{x:r,y:a,z:o}=n;return this.get(r,a,o)!==s.id||this.axisAt(r,a,o)!==s.axis?(this.history.pop(),{ok:!1,message:"この場所はすでに変化したため、戻せません。"}):Gs(n.id)&&e(r,a,o)?{ok:!1,message:"体と重なります。少し離れてから戻してください。"}:n.id!==s.id&&!this.set(r,a,o,n.id)?{ok:!1,message:"この編集は戻せません。"}:(n.id===5&&this.setAxis(r,a,o,n.axis),this.history.pop(),{ok:!0,message:"直前のブロック編集を戻しました。"})}}function Dl(){return{toolMade:!1,caveVisited:!1,decorated:!1,hidden:!1,home:null}}function Ju(i){if(!i||typeof i!="object")return!1;const e=i;if(![e.toolMade,e.caveVisited,e.decorated,e.hidden].every(n=>typeof n=="boolean")||e.caveVisited&&!e.toolMade||e.decorated&&!e.caveVisited)return!1;const t=e.home;return t===null||!!t&&[t.x,t.y,t.z].every(Number.isFinite)&&t.x>=0&&t.x<256&&t.z>=0&&t.z<256&&t.y>=0&&t.y<96}function Qu(i,e){["wood-pick","wood-axe","stone-pick","stone-axe"].includes(e)&&(i.toolMade=!0)}function eh(i,e,t,n){if(!i.toolMade||i.caveVisited||!(ys(n,12)||ys(n,25)))return!1;const s=e.landmarks.find(r=>r.kind==="cave");if(s){if(t.x<s.x+2||t.x>s.x+16||Math.abs(t.z-s.z-.5)>3.8||Math.abs(t.y-s.y)>2.1)return!1}else{const r=Math.floor(t.x),a=Math.floor(t.z),o=Math.floor(t.y);let c=!1;for(let l=o+2;l<=Math.min(o+9,95);l++)if([2,3,8,11].includes(e.get(r,l,a))){c=!0;break}if(!c)return!1}return i.caveVisited=!0,!0}function th(i,e,t){return!i.caveVisited||i.decorated||!i.home||e!==25&&e!==26||Math.hypot(t.x-i.home.x,t.y-i.home.y,t.z-i.home.z)>18?!1:(i.decorated=!0,!0)}function nh(i,e){return i.toolMade?i.caveVisited?i.decorated?"3/3 達成　拠点に潮晶の飾りが加わりました":e===2?"3/3　潮晶を持ち帰り、作業台で作った灯りかタイルを拠点に飾ろう":"3/3　作業台でガラスと石炭を潮晶に加工し、灯りかタイルを拠点に飾ろう":e===2?"2/3　灯晶ブロックを持って、潮晶の岩窟へ":"2/3　灯晶ブロックを持って、岩天井の洞窟へ":"1/3　原木を集め、木材と棒で木の道具を作ろう"}function Ll(i,e){const t=i.x-e.x,n=i.z-e.z,s=Math.round(Math.hypot(t,n));if(s<2)return"足元";const r=Math.atan2(t,-n)+e.yaw;return["↑","↗","→","↘","↓","↙","←","↖"][(Math.round(r/(Math.PI/4))%8+8)%8]+" 約"+s+"m"}function ih(i,e){return i.home?"拠点 "+Ll(i.home,e):""}const Cr={low:{distance:2,scale:.7,shadows:!1,vegetation:!1,effects:!1},standard:{distance:3,scale:1,shadows:!0,vegetation:!0,effects:!0},high:{distance:5,scale:1.2,shadows:!0,vegetation:!0,effects:!0}},Il={...Cr.standard,quality:"standard",sensitivity:1,volume:.45,muted:!1,effectsVolume:.85,ambientVolume:.4,invertY:!1,bob:!0,sprintFov:!0},Xs=(i,e,t)=>typeof i=="number"&&Number.isFinite(i)&&i>=e&&i<=t;function zo(i){if(!i||typeof i!="object")return!1;const e=i;return(e.quality==="legacy"||Object.hasOwn(Cr,e.quality))&&Number.isInteger(e.distance)&&Xs(e.distance,2,6)&&Xs(e.scale,.5,1.5)&&Xs(e.sensitivity,.3,2.5)&&[e.volume,e.effectsVolume,e.ambientVolume].every(t=>Xs(t,0,1))&&[e.shadows,e.vegetation,e.effects,e.muted,e.invertY,e.bob,e.sprintFov].every(t=>typeof t=="boolean")}function Ul(i){if(!i||typeof i!="object")throw Error("保存された設定を読み込めません。");const e={...Il,quality:"legacy",...i};if(!zo(e))throw Error("保存された設定の値が正しくありません。");return e}const ko="180",sh=0,hc=1,rh=2,Nl=1,ah=2,Tn=3,Gn=0,Ot=1,on=2,Vn=0,Bi=1,fc=2,dc=3,pc=4,oh=5,ni=100,ch=101,lh=102,uh=103,hh=104,fh=200,dh=201,ph=202,mh=203,ka=204,Ha=205,gh=206,_h=207,vh=208,xh=209,Mh=210,Sh=211,yh=212,Eh=213,bh=214,Va=0,Ga=1,Wa=2,Hi=3,Xa=4,qa=5,Ya=6,Ka=7,Fl=0,Th=1,Ah=2,An=0,wh=1,Rh=2,Ch=3,Ph=4,Dh=5,Lh=6,Ih=7,Ol=300,Vi=301,Gi=302,ja=303,$a=304,Hr=306,Za=1e3,ri=1001,Ja=1002,bt=1003,Uh=1004,ds=1005,pn=1006,Jr=1007,ai=1008,Rn=1009,Bl=1010,zl=1011,bs=1012,Ho=1013,ui=1014,mn=1015,Ns=1016,Vo=1017,Go=1018,Ts=1020,kl=35902,Hl=35899,Vl=1021,Gl=1022,cn=1023,As=1026,ws=1027,Fs=1028,Wo=1029,Wl=1030,Xo=1031,qo=1033,xr=33776,Mr=33777,Sr=33778,yr=33779,Qa=35840,eo=35841,to=35842,no=35843,io=36196,so=37492,ro=37496,ao=37808,oo=37809,co=37810,lo=37811,uo=37812,ho=37813,fo=37814,po=37815,mo=37816,go=37817,_o=37818,vo=37819,xo=37820,Mo=37821,So=36492,yo=36494,Eo=36495,bo=36283,To=36284,Ao=36285,wo=36286,Nh=3200,Fh=3201,Oh=0,Bh=1,zn="",Nt="srgb",Wi="srgb-linear",Pr="linear",Je="srgb",_i=7680,mc=519,zh=512,kh=513,Hh=514,Xl=515,Vh=516,Gh=517,Wh=518,Xh=519,gc=35044,_c="300 es",gn=2e3,Dr=2001;class Ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vc=1234567;const zi=Math.PI/180,Rs=180/Math.PI;function ji(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]).toLowerCase()}function Ve(i,e,t){return Math.max(e,Math.min(t,i))}function Yo(i,e){return(i%e+e)%e}function qh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Yh(i,e,t){return i!==e?(t-i)/(e-i):0}function _s(i,e,t){return(1-t)*i+t*e}function Kh(i,e,t,n){return _s(i,e,1-Math.exp(-t*n))}function jh(i,e=1){return e-Math.abs(Yo(i,e*2)-e)}function $h(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Zh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Jh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Qh(i,e){return i+Math.random()*(e-i)}function ef(i){return i*(.5-Math.random())}function tf(i){i!==void 0&&(vc=i);let e=vc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function nf(i){return i*zi}function sf(i){return i*Rs}function rf(i){return(i&i-1)===0&&i!==0}function af(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function of(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cf(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),f=r((e-n)/2),h=a((e-n)/2),d=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*f,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*f,o*l);break;case"ZXZ":i.set(c*f,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*d,o*l);break;case"YXY":i.set(c*d,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*d,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ui(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const lf={DEG2RAD:zi,RAD2DEG:Rs,generateUUID:ji,clamp:Ve,euclideanModulo:Yo,mapLinear:qh,inverseLerp:Yh,lerp:_s,damp:Kh,pingpong:jh,smoothstep:$h,smootherstep:Zh,randInt:Jh,randFloat:Qh,randFloatSpread:ef,seededRandom:tf,degToRad:nf,radToDeg:sf,isPowerOfTwo:rf,ceilPowerOfTwo:af,floorPowerOfTwo:of,setQuaternionFromProperEuler:cf,normalize:Lt,denormalize:Ui};class Qe{constructor(e=0,t=0){Qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Os{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3];const h=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(o===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||c!==h||l!==d||u!==g){let m=1-o;const p=c*h+l*d+u*g+f*_,T=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const A=Math.sqrt(b),R=Math.atan2(A,p*T);m=Math.sin(m*R)/A,o=Math.sin(o*R)/A}const M=o*T;if(c=c*m+h*M,l=l*m+d*M,u=u*m+g*M,f=f*m+_*M,m===1-o){const A=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=A,l*=A,u*=A,f*=A}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+u*f+c*d-l*h,e[t+1]=c*g+u*h+l*f-o*d,e[t+2]=l*g+u*d+o*h-c*f,e[t+3]=u*g-o*f-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),h=c(n/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=n+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(u-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),f=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=a*f+this._w*h,this._x=n*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qr.copy(this).projectOnVector(e),this.sub(Qr)}reflect(e){return this.sub(Qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new F,xc=new Os;class Fe{constructor(e,t,n,s,r,a,o,c,l){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],T=s[1],b=s[4],M=s[7],A=s[2],R=s[5],C=s[8];return r[0]=a*_+o*T+c*A,r[3]=a*m+o*b+c*R,r[6]=a*p+o*M+c*C,r[1]=l*_+u*T+f*A,r[4]=l*m+u*b+f*R,r[7]=l*p+u*M+f*C,r[2]=h*_+d*T+g*A,r[5]=h*m+d*b+g*R,r[8]=h*p+d*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,h=o*c-u*r,d=l*r-a*c,g=t*f+n*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=h*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ea.makeScale(e,t)),this}rotate(e){return this.premultiply(ea.makeRotation(-e)),this}translate(e,t){return this.premultiply(ea.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new Fe;function ql(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function uf(){const i=Lr("canvas");return i.style.display="block",i}const Mc={};function Cs(i){i in Mc||(Mc[i]=!0,console.warn(i))}function hf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Sc=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yc=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ff(){const i={enabled:!0,workingColorSpace:Wi,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Je&&(s.r=wn(s.r),s.g=wn(s.g),s.b=wn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?Pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Cs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Cs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wi]:{primaries:e,whitePoint:n,transfer:Pr,toXYZ:Sc,fromXYZ:yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:Sc,fromXYZ:yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}const qe=ff();function wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class df{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vi===void 0&&(vi=Lr("canvas")),vi.width=e.width,vi.height=e.height;const s=vi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=wn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(wn(t[n]/255)*255):t[n]=wn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let pf=0;class Ko{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ta(s[a].image)):r.push(ta(s[a]))}else r=ta(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ta(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?df.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let mf=0;const na=new F;class Bt extends Ki{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=ri,s=ri,r=pn,a=ai,o=cn,c=Rn,l=Bt.DEFAULT_ANISOTROPY,u=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:mf++}),this.uuid=ji(),this.name="",this.source=new Ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(na).x}get height(){return this.source.getSize(na).y}get depth(){return this.source.getSize(na).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ol)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Za:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case Ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Za:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case Ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Ol;Bt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,s=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,M=(d+1)/2,A=(p+1)/2,R=(u+h)/4,C=(f+_)/4,U=(g+m)/4;return b>M&&b>A?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=R/n,r=C/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=R/s,r=U/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=U/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(f-_)/T,this.z=(h-u)/T,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gf extends Ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new Bt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ko(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends gf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yl extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _f extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pi{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(e.matrixWorld),this.union(qs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ns),Ys.subVectors(this.max,ns),xi.subVectors(e.a,ns),Mi.subVectors(e.b,ns),Si.subVectors(e.c,ns),Dn.subVectors(Mi,xi),Ln.subVectors(Si,Mi),Yn.subVectors(xi,Si);let t=[0,-Dn.z,Dn.y,0,-Ln.z,Ln.y,0,-Yn.z,Yn.y,Dn.z,0,-Dn.x,Ln.z,0,-Ln.x,Yn.z,0,-Yn.x,-Dn.y,Dn.x,0,-Ln.y,Ln.x,0,-Yn.y,Yn.x,0];return!ia(t,xi,Mi,Si,Ys)||(t=[1,0,0,0,1,0,0,0,1],!ia(t,xi,Mi,Si,Ys))?!1:(Ks.crossVectors(Dn,Ln),t=[Ks.x,Ks.y,Ks.z],ia(t,xi,Mi,Si,Ys))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mn=[new F,new F,new F,new F,new F,new F,new F,new F],sn=new F,qs=new pi,xi=new F,Mi=new F,Si=new F,Dn=new F,Ln=new F,Yn=new F,ns=new F,Ys=new F,Ks=new F,Kn=new F;function ia(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),c=e.dot(Kn),l=t.dot(Kn),u=n.dot(Kn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const vf=new pi,is=new F,sa=new F;class $i{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):vf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;is.subVectors(e,this.center);const t=is.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(is,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(is.copy(e.center).add(sa)),this.expandByPoint(is.copy(e.center).sub(sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Sn=new F,ra=new F,js=new F,In=new F,aa=new F,$s=new F,oa=new F;class Kl{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ra.copy(e).add(t).multiplyScalar(.5),js.copy(t).sub(e).normalize(),In.copy(this.origin).sub(ra);const r=e.distanceTo(t)*.5,a=-this.direction.dot(js),o=In.dot(this.direction),c=-In.dot(js),l=In.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*c-o,h=a*o-c,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),d=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ra).addScaledVector(js,h),d}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,s,r){aa.subVectors(t,e),$s.subVectors(n,e),oa.crossVectors(aa,$s);let a=this.direction.dot(oa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;In.subVectors(this.origin,e);const c=o*this.direction.dot($s.crossVectors(In,$s));if(c<0)return null;const l=o*this.direction.dot(aa.cross(In));if(l<0||c+l>a)return null;const u=-o*In.dot(oa);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,n,s,r,a,o,c,l,u,f,h,d,g,_,m){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,f,h,d,g,_,m)}set(e,t,n,s,r,a,o,c,l,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/yi.setFromMatrixColumn(e,0).length(),r=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,d=a*f,g=o*u,_=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=d+g*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h-_*o,t[4]=-a*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,d=a*f,g=o*u,_=o*f;t[0]=c*u,t[4]=g*l-d,t[8]=h*l+_,t[1]=c*f,t[5]=_*l+h,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+_,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xf,e,Mf)}lookAt(e,t,n){const s=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Un.crossVectors(n,Yt),Un.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Un.crossVectors(n,Yt)),Un.normalize(),Zs.crossVectors(Yt,Un),s[0]=Un.x,s[4]=Zs.x,s[8]=Yt.x,s[1]=Un.y,s[5]=Zs.y,s[9]=Yt.y,s[2]=Un.z,s[6]=Zs.z,s[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],T=n[3],b=n[7],M=n[11],A=n[15],R=s[0],C=s[4],U=s[8],y=s[12],S=s[1],P=s[5],O=s[9],k=s[13],K=s[2],W=s[6],q=s[10],$=s[14],H=s[3],ae=s[7],oe=s[11],ve=s[15];return r[0]=a*R+o*S+c*K+l*H,r[4]=a*C+o*P+c*W+l*ae,r[8]=a*U+o*O+c*q+l*oe,r[12]=a*y+o*k+c*$+l*ve,r[1]=u*R+f*S+h*K+d*H,r[5]=u*C+f*P+h*W+d*ae,r[9]=u*U+f*O+h*q+d*oe,r[13]=u*y+f*k+h*$+d*ve,r[2]=g*R+_*S+m*K+p*H,r[6]=g*C+_*P+m*W+p*ae,r[10]=g*U+_*O+m*q+p*oe,r[14]=g*y+_*k+m*$+p*ve,r[3]=T*R+b*S+M*K+A*H,r[7]=T*C+b*P+M*W+A*ae,r[11]=T*U+b*O+M*q+A*oe,r[15]=T*y+b*k+M*$+A*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*f-s*l*f-r*o*h+n*l*h+s*o*d-n*c*d)+_*(+t*c*d-t*l*h+r*a*h-s*a*d+s*l*u-r*c*u)+m*(+t*l*f-t*o*d-r*a*f+n*a*d+r*o*u-n*l*u)+p*(-s*o*u-t*c*f+t*o*h+s*a*f-n*a*h+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],T=f*m*l-_*h*l+_*c*d-o*m*d-f*c*p+o*h*p,b=g*h*l-u*m*l-g*c*d+a*m*d+u*c*p-a*h*p,M=u*_*l-g*f*l+g*o*d-a*_*d-u*o*p+a*f*p,A=g*f*c-u*_*c-g*o*h+a*_*h+u*o*m-a*f*m,R=t*T+n*b+s*M+r*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return e[0]=T*C,e[1]=(_*h*r-f*m*r-_*s*d+n*m*d+f*s*p-n*h*p)*C,e[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*C,e[3]=(f*c*r-o*h*r-f*s*l+n*h*l+o*s*d-n*c*d)*C,e[4]=b*C,e[5]=(u*m*r-g*h*r+g*s*d-t*m*d-u*s*p+t*h*p)*C,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*C,e[7]=(a*h*r-u*c*r+u*s*l-t*h*l-a*s*d+t*c*d)*C,e[8]=M*C,e[9]=(g*f*r-u*_*r-g*n*d+t*_*d+u*n*p-t*f*p)*C,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*C,e[11]=(u*o*r-a*f*r-u*n*l+t*f*l+a*n*d-t*o*d)*C,e[12]=A*C,e[13]=(u*_*s-g*f*s+g*n*h-t*_*h-u*n*m+t*f*m)*C,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*C,e[15]=(a*f*s-u*o*s+u*n*c-t*f*c-a*n*h+t*o*h)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,f=o+o,h=r*l,d=r*u,g=r*f,_=a*u,m=a*f,p=o*f,T=c*l,b=c*u,M=c*f,A=n.x,R=n.y,C=n.z;return s[0]=(1-(_+p))*A,s[1]=(d+M)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(d-M)*R,s[5]=(1-(h+p))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+b)*C,s[9]=(m-T)*C,s[10]=(1-(h+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=yi.set(s[0],s[1],s[2]).length();const a=yi.set(s[4],s[5],s[6]).length(),o=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],rn.copy(this);const l=1/r,u=1/a,f=1/o;return rn.elements[0]*=l,rn.elements[1]*=l,rn.elements[2]*=l,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=f,rn.elements[9]*=f,rn.elements[10]*=f,t.setFromRotationMatrix(rn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=gn,c=!1){const l=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===gn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Dr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=gn,c=!1){const l=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===gn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Dr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const yi=new F,rn=new ht,xf=new F(0,0,0),Mf=new F(1,1,1),Un=new F,Zs=new F,Yt=new F,Ec=new ht,bc=new Os;class Cn{constructor(e=0,t=0,n=0,s=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ve(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ec,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bc.setFromEuler(this),this.setFromQuaternion(bc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sf=0;const Tc=new F,Ei=new Os,yn=new ht,Js=new F,ss=new F,yf=new F,Ef=new Os,Ac=new F(1,0,0),wc=new F(0,1,0),Rc=new F(0,0,1),Cc={type:"added"},bf={type:"removed"},bi={type:"childadded",child:null},ca={type:"childremoved",child:null};class Pt extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new F,t=new Cn,n=new Os,s=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ht},normalMatrix:{value:new Fe}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.premultiply(Ei),this}rotateX(e){return this.rotateOnAxis(Ac,e)}rotateY(e){return this.rotateOnAxis(wc,e)}rotateZ(e){return this.rotateOnAxis(Rc,e)}translateOnAxis(e,t){return Tc.copy(e).applyQuaternion(this.quaternion),this.position.add(Tc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ac,e)}translateY(e){return this.translateOnAxis(wc,e)}translateZ(e){return this.translateOnAxis(Rc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(ss,Js,this.up):yn.lookAt(Js,ss,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(yn),this.quaternion.premultiply(Ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cc),bi.child=e,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bf),ca.child=e,this.dispatchEvent(ca),ca.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cc),bi.child=e,this.dispatchEvent(bi),bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,e,yf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,Ef,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new F(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new F,En=new F,la=new F,bn=new F,Ti=new F,Ai=new F,Pc=new F,ua=new F,ha=new F,fa=new F,da=new gt,pa=new gt,ma=new gt;class tn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),an.subVectors(e,t),s.cross(an);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){an.subVectors(s,t),En.subVectors(n,t),la.subVectors(e,t);const a=an.dot(an),o=an.dot(En),c=an.dot(la),l=En.dot(En),u=En.dot(la),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bn.x),c.addScaledVector(a,bn.y),c.addScaledVector(o,bn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return da.setScalar(0),pa.setScalar(0),ma.setScalar(0),da.fromBufferAttribute(e,t),pa.fromBufferAttribute(e,n),ma.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(da,r.x),a.addScaledVector(pa,r.y),a.addScaledVector(ma,r.z),a}static isFrontFacing(e,t,n,s){return an.subVectors(n,t),En.subVectors(e,t),an.cross(En).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),En.subVectors(this.a,this.b),an.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ti.subVectors(s,n),Ai.subVectors(r,n),ua.subVectors(e,n);const c=Ti.dot(ua),l=Ai.dot(ua);if(c<=0&&l<=0)return t.copy(n);ha.subVectors(e,s);const u=Ti.dot(ha),f=Ai.dot(ha);if(u>=0&&f<=u)return t.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ti,a);fa.subVectors(e,r);const d=Ti.dot(fa),g=Ai.dot(fa);if(g>=0&&d<=g)return t.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ai,o);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Pc.subVectors(r,s),o=(f-u)/(f-u+(d-g)),t.copy(s).addScaledVector(Pc,o);const p=1/(m+_+h);return a=_*p,o=h*p,t.copy(n).addScaledVector(Ti,a).addScaledVector(Ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function ga(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=Yo(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ga(a,r,e+1/3),this.g=ga(a,r,e),this.b=ga(a,r,e-1/3)}return qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){const n=$l[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wn(e.r),this.g=wn(e.g),this.b=wn(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return qe.workingToColorSpace(wt.copy(this),e),Math.round(Ve(wt.r*255,0,255))*65536+Math.round(Ve(wt.g*255,0,255))*256+Math.round(Ve(wt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(wt.copy(this),t);const n=wt.r,s=wt.g,r=wt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=Nt){qe.workingToColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,s=wt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Qs);const n=_s(Nn.h,Qs.h,t),s=_s(Nn.s,Qs.s,t),r=_s(Nn.l,Qs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ye;Ye.NAMES=$l;let Tf=0;class Bs extends Ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=Bi,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Ha,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ka&&(n.blendSrc=this.blendSrc),this.blendDst!==Ha&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Vr extends Bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new F,er=new Qe;let Af=0;class ln{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Af++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gc,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.applyMatrix3(e),this.setXY(t,er.x,er.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ui(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ui(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ui(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ui(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ui(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gc&&(e.usage=this.usage),e}}class Zl extends ln{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jl extends ln{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends ln{constructor(e,t,n){super(new Float32Array(e),t,n)}}let wf=0;const Jt=new ht,_a=new Pt,wi=new F,Kt=new pi,rs=new pi,yt=new F;class Vt extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ql(e)?Jl:Zl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return _a.lookAt(e),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Kt.setFromBufferAttribute(r),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rs.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Kt.min,rs.min),Kt.expandByPoint(yt),yt.addVectors(Kt.max,rs.max),Kt.expandByPoint(yt)):(Kt.expandByPoint(rs.min),Kt.expandByPoint(rs.max))}Kt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(yt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)yt.fromBufferAttribute(o,l),c&&(wi.fromBufferAttribute(e,l),yt.add(wi)),s=Math.max(s,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<n.count;U++)o[U]=new F,c[U]=new F;const l=new F,u=new F,f=new F,h=new Qe,d=new Qe,g=new Qe,_=new F,m=new F;function p(U,y,S){l.fromBufferAttribute(n,U),u.fromBufferAttribute(n,y),f.fromBufferAttribute(n,S),h.fromBufferAttribute(r,U),d.fromBufferAttribute(r,y),g.fromBufferAttribute(r,S),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),o[U].add(_),o[y].add(_),o[S].add(_),c[U].add(m),c[y].add(m),c[S].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let U=0,y=T.length;U<y;++U){const S=T[U],P=S.start,O=S.count;for(let k=P,K=P+O;k<K;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new F,M=new F,A=new F,R=new F;function C(U){A.fromBufferAttribute(s,U),R.copy(A);const y=o[U];b.copy(y),b.sub(A.multiplyScalar(A.dot(y))).normalize(),M.crossVectors(R,y);const P=M.dot(c[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,P)}for(let U=0,y=T.length;U<y;++U){const S=T[U],P=S.start,O=S.count;for(let k=P,K=P+O;k<K;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,u=new F,f=new F;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new ln(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=e(h,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dc=new ht,jn=new Kl,tr=new $i,Lc=new F,nr=new F,ir=new F,sr=new F,va=new F,rr=new F,Ic=new F,ar=new F;class Tt extends Pt{constructor(e=new Vt,t=new Vr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){rr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],f=r[c];u!==0&&(va.fromBufferAttribute(f,e),a?rr.addScaledVector(va,u):rr.addScaledVector(va.sub(t),u))}t.add(rr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(r),jn.copy(e.ray).recast(e.near),!(tr.containsPoint(jn.origin)===!1&&(jn.intersectSphere(tr,Lc)===null||jn.origin.distanceToSquared(Lc)>(e.far-e.near)**2))&&(Dc.copy(r).invert(),jn.copy(e.ray).applyMatrix4(Dc),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],T=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=T,A=b;M<A;M+=3){const R=o.getX(M),C=o.getX(M+1),U=o.getX(M+2);s=or(this,p,e,n,l,u,f,R,C,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const T=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);s=or(this,a,e,n,l,u,f,T,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],T=Math.max(m.start,d.start),b=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=T,A=b;M<A;M+=3){const R=M,C=M+1,U=M+2;s=or(this,p,e,n,l,u,f,R,C,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const T=m,b=m+1,M=m+2;s=or(this,a,e,n,l,u,f,T,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Rf(i,e,t,n,s,r,a,o){let c;if(e.side===Ot?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Gn,o),c===null)return null;ar.copy(o),ar.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ar);return l<t.near||l>t.far?null:{distance:l,point:ar.clone(),object:i}}function or(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,nr),i.getVertexPosition(c,ir),i.getVertexPosition(l,sr);const u=Rf(i,e,t,n,nr,ir,sr,Ic);if(u){const f=new F;tn.getBarycoord(Ic,nr,ir,sr,f),s&&(u.uv=tn.getInterpolatedAttribute(s,o,c,l,f,new Qe)),r&&(u.uv1=tn.getInterpolatedAttribute(r,o,c,l,f,new Qe)),a&&(u.normal=tn.getInterpolatedAttribute(a,o,c,l,f,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new F,materialIndex:0};tn.getNormal(nr,ir,sr,h.normal),u.face=h,u.barycoord=f}return u}class Pn extends Vt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(u,3)),this.setAttribute("uv",new pt(f,2));function g(_,m,p,T,b,M,A,R,C,U,y){const S=M/C,P=A/U,O=M/2,k=A/2,K=R/2,W=C+1,q=U+1;let $=0,H=0;const ae=new F;for(let oe=0;oe<q;oe++){const ve=oe*P-k;for(let Ue=0;Ue<W;Ue++){const $e=Ue*S-O;ae[_]=$e*T,ae[m]=ve*b,ae[p]=K,l.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[p]=R>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(Ue/C),f.push(1-oe/U),$+=1}}for(let oe=0;oe<U;oe++)for(let ve=0;ve<C;ve++){const Ue=h+ve+W*oe,$e=h+ve+W*(oe+1),et=h+(ve+1)+W*(oe+1),Ge=h+(ve+1)+W*oe;c.push(Ue,$e,Ge),c.push($e,et,Ge),H+=6}o.addGroup(d,H,y),d+=H,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ut(i){const e={};for(let t=0;t<i.length;t++){const n=Xi(i[t]);for(const s in n)e[s]=n[s]}return e}function Cf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ql(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Pf={clone:Xi,merge:Ut};var Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends Bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=Lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xi(e.uniforms),this.uniformsGroups=Cf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class eu extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new F,Uc=new Qe,Nc=new Qe;class en extends eu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,Uc,Nc),t.subVectors(Nc,Uc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ri=-90,Ci=1;class If extends Pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new en(Ri,Ci,e,t);s.layers=this.layers,this.add(s);const r=new en(Ri,Ci,e,t);r.layers=this.layers,this.add(r);const a=new en(Ri,Ci,e,t);a.layers=this.layers,this.add(a);const o=new en(Ri,Ci,e,t);o.layers=this.layers,this.add(o);const c=new en(Ri,Ci,e,t);c.layers=this.layers,this.add(c);const l=new en(Ri,Ci,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tu extends Bt{constructor(e=[],t=Vi,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Uf extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new tu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),r=new Ht({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:Vn});r.uniforms.tEquirect.value=t;const a=new Tt(s,r),o=t.minFilter;return t.minFilter===ai&&(t.minFilter=pn),new If(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class cr extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nf={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nf)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new cr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Ff extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gr extends Bt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=bt,u=bt,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fc extends ln{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Pi=new ht,Oc=new ht,lr=[],Bc=new pi,Of=new ht,as=new Tt,os=new $i;class nu extends Tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Of)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new pi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),Bc.copy(e.boundingBox).applyMatrix4(Pi),this.boundingBox.union(Bc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new $i),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),os.copy(e.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(os)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(as.geometry=this.geometry,as.material=this.material,as.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),os.copy(this.boundingSphere),os.applyMatrix4(n),e.ray.intersectsSphere(os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Pi),Oc.multiplyMatrices(n,Pi),as.matrixWorld=Oc,as.raycast(e,lr);for(let a=0,o=lr.length;a<o;a++){const c=lr[a];c.instanceId=r,c.object=this,t.push(c)}lr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gr(new Float32Array(s*this.count),s,this.count,Fs,mn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ma=new F,Bf=new F,zf=new Fe;class Qn{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ma.subVectors(n,t).cross(Bf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ma),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zf.getNormalMatrix(e),s=this.coplanarPoint(Ma).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $n=new $i,kf=new Qe(.5,.5),ur=new F;class iu{constructor(e=new Qn,t=new Qn,n=new Qn,s=new Qn,r=new Qn,a=new Qn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],T=r[12],b=r[13],M=r[14],A=r[15];if(s[0].setComponents(l-a,d-u,p-g,A-T).normalize(),s[1].setComponents(l+a,d+u,p+g,A+T).normalize(),s[2].setComponents(l+o,d+f,p+_,A+b).normalize(),s[3].setComponents(l-o,d-f,p-_,A-b).normalize(),n)s[4].setComponents(c,h,m,M).normalize(),s[5].setComponents(l-c,d-h,p-m,A-M).normalize();else if(s[4].setComponents(l-c,d-h,p-m,A-M).normalize(),t===gn)s[5].setComponents(l+c,d+h,p+m,A+M).normalize();else if(t===Dr)s[5].setComponents(c,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(e){$n.center.set(0,0,0);const t=kf.distanceTo(e.center);return $n.radius=.7071067811865476+t,$n.applyMatrix4(e.matrixWorld),this.intersectsSphere($n)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ur.x=s.normal.x>0?e.max.x:e.min.x,ur.y=s.normal.y>0?e.max.y:e.min.y,ur.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class su extends Bs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ir=new F,Ur=new F,zc=new ht,cs=new Kl,hr=new $i,Sa=new F,kc=new F;class Hf extends Pt{constructor(e=new Vt,t=new su){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ir.fromBufferAttribute(t,s-1),Ur.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ir.distanceTo(Ur);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(s),hr.radius+=r,e.ray.intersectsSphere(hr)===!1)return;zc.copy(s).invert(),cs.copy(e.ray).applyMatrix4(zc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),T=u.getX(_+1),b=fr(this,e,cs,c,p,T,_);b&&t.push(b)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=fr(this,e,cs,c,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=fr(this,e,cs,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=fr(this,e,cs,c,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function fr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Ir.fromBufferAttribute(o,s),Ur.fromBufferAttribute(o,r),t.distanceSqToSegment(Ir,Ur,Sa,kc)>n)return;Sa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Sa);if(!(l<e.near||l>e.far))return{distance:l,point:kc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Hc=new F,Vc=new F;class Vf extends Hf{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Hc.fromBufferAttribute(t,s),Vc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hc.distanceTo(Vc);e.setAttribute("lineDistance",new pt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ru extends Bt{constructor(e,t,n=ui,s,r,a,o=bt,c=bt,l,u=As,f=1){if(u!==As&&u!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class au extends Bt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}const dr=new F,pr=new F,ya=new F,mr=new tn;class Gf extends Vt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(zi*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],u=["a","b","c"],f=new Array(3),h={},d=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=mr;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),mr.getNormal(ya),f[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let T=0;T<3;T++){const b=(T+1)%3,M=f[T],A=f[b],R=mr[u[T]],C=mr[u[b]],U=`${M}_${A}`,y=`${A}_${M}`;y in h&&h[y]?(ya.dot(h[y].normal)<=r&&(d.push(R.x,R.y,R.z),d.push(C.x,C.y,C.z)),h[y]=null):U in h||(h[U]={index0:l[T],index1:l[b],normal:ya.clone()})}}for(const g in h)if(h[g]){const{index0:_,index1:m}=h[g];dr.fromBufferAttribute(o,_),pr.fromBufferAttribute(o,m),d.push(dr.x,dr.y,dr.z),d.push(pr.x,pr.y,pr.z)}this.setAttribute("position",new pt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Wr extends Vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=e/o,h=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const T=p*h-a;for(let b=0;b<l;b++){const M=b*f-r;g.push(M,-T,0),_.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let T=0;T<o;T++){const b=T+l*p,M=T+l*(p+1),A=T+1+l*(p+1),R=T+1+l*p;d.push(b,M,R),d.push(M,A,R)}this.setIndex(d),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.width,e.height,e.widthSegments,e.heightSegments)}}class jo extends Vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],f=new F,h=new F,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const T=[],b=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&c===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const R=A/t;f.x=-e*Math.cos(s+R*r)*Math.sin(a+b*o),f.y=e*Math.cos(a+b*o),f.z=e*Math.sin(s+R*r)*Math.sin(a+b*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(R+M,1-b),T.push(l++)}u.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){const b=u[p][T+1],M=u[p][T],A=u[p+1][T],R=u[p+1][T+1];(p!==0||a>0)&&d.push(b,M,R),(p!==n-1||c<Math.PI)&&d.push(M,A,R)}this.setIndex(d),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wf extends Bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xf extends Bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class qf extends eu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yf extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Gc(i,e,t,n){const s=Kf(n);switch(t){case Vl:return i*e;case Fs:return i*e/s.components*s.byteLength;case Wo:return i*e/s.components*s.byteLength;case Wl:return i*e*2/s.components*s.byteLength;case Xo:return i*e*2/s.components*s.byteLength;case Gl:return i*e*3/s.components*s.byteLength;case cn:return i*e*4/s.components*s.byteLength;case qo:return i*e*4/s.components*s.byteLength;case xr:case Mr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Sr:case yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case eo:case no:return Math.max(i,16)*Math.max(e,8)/4;case Qa:case to:return Math.max(i,8)*Math.max(e,8)/2;case io:case so:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case co:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case uo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case po:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case _o:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Mo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case So:case yo:case Eo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case bo:case To:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ao:case wo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kf(i){switch(i){case Rn:case Bl:return{byteLength:1,components:1};case bs:case zl:case Ns:return{byteLength:2,components:1};case Vo:case Go:return{byteLength:2,components:4};case ui:case Ho:case mn:return{byteLength:4,components:1};case kl:case Hl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ko);function ou(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function jf(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var $f=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ed=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,id=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,rd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ad=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ld=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ud=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_d=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,xd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Md=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Sd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ed=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ad="gl_FragColor = linearToOutputTexel( gl_FragColor );",wd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Dd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Id=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ud=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Od=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Bd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Kd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$d=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ep=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,np=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ip=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,op=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ap=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Lp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ip=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Up=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Np=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Op=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$p=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,em=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,nm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,im=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,um=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_m=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Mm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ym=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Am=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:$f,alphahash_pars_fragment:Zf,alphamap_fragment:Jf,alphamap_pars_fragment:Qf,alphatest_fragment:ed,alphatest_pars_fragment:td,aomap_fragment:nd,aomap_pars_fragment:id,batching_pars_vertex:sd,batching_vertex:rd,begin_vertex:ad,beginnormal_vertex:od,bsdfs:cd,iridescence_fragment:ld,bumpmap_pars_fragment:ud,clipping_planes_fragment:hd,clipping_planes_pars_fragment:fd,clipping_planes_pars_vertex:dd,clipping_planes_vertex:pd,color_fragment:md,color_pars_fragment:gd,color_pars_vertex:_d,color_vertex:vd,common:xd,cube_uv_reflection_fragment:Md,defaultnormal_vertex:Sd,displacementmap_pars_vertex:yd,displacementmap_vertex:Ed,emissivemap_fragment:bd,emissivemap_pars_fragment:Td,colorspace_fragment:Ad,colorspace_pars_fragment:wd,envmap_fragment:Rd,envmap_common_pars_fragment:Cd,envmap_pars_fragment:Pd,envmap_pars_vertex:Dd,envmap_physical_pars_fragment:Vd,envmap_vertex:Ld,fog_vertex:Id,fog_pars_vertex:Ud,fog_fragment:Nd,fog_pars_fragment:Fd,gradientmap_pars_fragment:Od,lightmap_pars_fragment:Bd,lights_lambert_fragment:zd,lights_lambert_pars_fragment:kd,lights_pars_begin:Hd,lights_toon_fragment:Gd,lights_toon_pars_fragment:Wd,lights_phong_fragment:Xd,lights_phong_pars_fragment:qd,lights_physical_fragment:Yd,lights_physical_pars_fragment:Kd,lights_fragment_begin:jd,lights_fragment_maps:$d,lights_fragment_end:Zd,logdepthbuf_fragment:Jd,logdepthbuf_pars_fragment:Qd,logdepthbuf_pars_vertex:ep,logdepthbuf_vertex:tp,map_fragment:np,map_pars_fragment:ip,map_particle_fragment:sp,map_particle_pars_fragment:rp,metalnessmap_fragment:ap,metalnessmap_pars_fragment:op,morphinstance_vertex:cp,morphcolor_vertex:lp,morphnormal_vertex:up,morphtarget_pars_vertex:hp,morphtarget_vertex:fp,normal_fragment_begin:dp,normal_fragment_maps:pp,normal_pars_fragment:mp,normal_pars_vertex:gp,normal_vertex:_p,normalmap_pars_fragment:vp,clearcoat_normal_fragment_begin:xp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:Sp,iridescence_pars_fragment:yp,opaque_fragment:Ep,packing:bp,premultiplied_alpha_fragment:Tp,project_vertex:Ap,dithering_fragment:wp,dithering_pars_fragment:Rp,roughnessmap_fragment:Cp,roughnessmap_pars_fragment:Pp,shadowmap_pars_fragment:Dp,shadowmap_pars_vertex:Lp,shadowmap_vertex:Ip,shadowmask_pars_fragment:Up,skinbase_vertex:Np,skinning_pars_vertex:Fp,skinning_vertex:Op,skinnormal_vertex:Bp,specularmap_fragment:zp,specularmap_pars_fragment:kp,tonemapping_fragment:Hp,tonemapping_pars_fragment:Vp,transmission_fragment:Gp,transmission_pars_fragment:Wp,uv_pars_fragment:Xp,uv_pars_vertex:qp,uv_vertex:Yp,worldpos_vertex:Kp,background_vert:jp,background_frag:$p,backgroundCube_vert:Zp,backgroundCube_frag:Jp,cube_vert:Qp,cube_frag:em,depth_vert:tm,depth_frag:nm,distanceRGBA_vert:im,distanceRGBA_frag:sm,equirect_vert:rm,equirect_frag:am,linedashed_vert:om,linedashed_frag:cm,meshbasic_vert:lm,meshbasic_frag:um,meshlambert_vert:hm,meshlambert_frag:fm,meshmatcap_vert:dm,meshmatcap_frag:pm,meshnormal_vert:mm,meshnormal_frag:gm,meshphong_vert:_m,meshphong_frag:vm,meshphysical_vert:xm,meshphysical_frag:Mm,meshtoon_vert:Sm,meshtoon_frag:ym,points_vert:Em,points_frag:bm,shadow_vert:Tm,shadow_frag:Am,sprite_vert:wm,sprite_frag:Rm},ce={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},fn={basic:{uniforms:Ut([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Ut([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Ut([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Ut([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Ut([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Ut([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Ut([ce.points,ce.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Ut([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Ut([ce.common,ce.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Ut([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Ut([ce.sprite,ce.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:Ut([ce.common,ce.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:Ut([ce.lights,ce.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};fn.physical={uniforms:Ut([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const gr={r:0,b:0,g:0},Zn=new Cn,Cm=new ht;function Pm(i,e,t,n,s,r,a){const o=new Ye(0);let c=r===!0?0:1,l,u,f=null,h=0,d=null;function g(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?t:e).get(M)),M}function _(b){let M=!1;const A=g(b);A===null?p(o,c):A&&A.isColor&&(p(A,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,M){const A=g(M);A&&(A.isCubeTexture||A.mapping===Hr)?(u===void 0&&(u=new Tt(new Pn(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:Xi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,C,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Zn.copy(M.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Cm.makeRotationFromEuler(Zn)),u.material.toneMapped=qe.getTransfer(A.colorSpace)!==Je,(f!==A||h!==A.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=A,h=A.version,d=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Tt(new Wr(2,2),new Ht({name:"BackgroundMaterial",uniforms:Xi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=qe.getTransfer(A.colorSpace)!==Je,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(f!==A||h!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=A,h=A.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,M){b.getRGB(gr,Ql(i)),n.buffers.color.setClear(gr.r,gr.g,gr.b,M,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,M=1){o.set(b),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:_,addToRenderList:m,dispose:T}}function Dm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(S,P,O,k,K){let W=!1;const q=f(k,O,P);r!==q&&(r=q,l(r.object)),W=d(S,k,O,K),W&&g(S,k,O,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,M(S,P,O,k),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function f(S,P,O){const k=O.wireframe===!0;let K=n[S.id];K===void 0&&(K={},n[S.id]=K);let W=K[P.id];W===void 0&&(W={},K[P.id]=W);let q=W[k];return q===void 0&&(q=h(c()),W[k]=q),q}function h(S){const P=[],O=[],k=[];for(let K=0;K<t;K++)P[K]=0,O[K]=0,k[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:k,object:S,attributes:{},index:null}}function d(S,P,O,k){const K=r.attributes,W=P.attributes;let q=0;const $=O.getAttributes();for(const H in $)if($[H].location>=0){const oe=K[H];let ve=W[H];if(ve===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ve=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ve=S.instanceColor)),oe===void 0||oe.attribute!==ve||ve&&oe.data!==ve.data)return!0;q++}return r.attributesNum!==q||r.index!==k}function g(S,P,O,k){const K={},W=P.attributes;let q=0;const $=O.getAttributes();for(const H in $)if($[H].location>=0){let oe=W[H];oe===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(oe=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(oe=S.instanceColor));const ve={};ve.attribute=oe,oe&&oe.data&&(ve.data=oe.data),K[H]=ve,q++}r.attributes=K,r.attributesNum=q,r.index=k}function _(){const S=r.newAttributes;for(let P=0,O=S.length;P<O;P++)S[P]=0}function m(S){p(S,0)}function p(S,P){const O=r.newAttributes,k=r.enabledAttributes,K=r.attributeDivisors;O[S]=1,k[S]===0&&(i.enableVertexAttribArray(S),k[S]=1),K[S]!==P&&(i.vertexAttribDivisor(S,P),K[S]=P)}function T(){const S=r.newAttributes,P=r.enabledAttributes;for(let O=0,k=P.length;O<k;O++)P[O]!==S[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function b(S,P,O,k,K,W,q){q===!0?i.vertexAttribIPointer(S,P,O,K,W):i.vertexAttribPointer(S,P,O,k,K,W)}function M(S,P,O,k){_();const K=k.attributes,W=O.getAttributes(),q=P.defaultAttributeValues;for(const $ in W){const H=W[$];if(H.location>=0){let ae=K[$];if(ae===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor)),ae!==void 0){const oe=ae.normalized,ve=ae.itemSize,Ue=e.get(ae);if(Ue===void 0)continue;const $e=Ue.buffer,et=Ue.type,Ge=Ue.bytesPerElement,X=et===i.INT||et===i.UNSIGNED_INT||ae.gpuType===Ho;if(ae.isInterleavedBufferAttribute){const j=ae.data,de=j.stride,Ce=ae.offset;if(j.isInstancedInterleavedBuffer){for(let Me=0;Me<H.locationSize;Me++)p(H.location+Me,j.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Me=0;Me<H.locationSize;Me++)m(H.location+Me);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let Me=0;Me<H.locationSize;Me++)b(H.location+Me,ve/H.locationSize,et,oe,de*Ge,(Ce+ve/H.locationSize*Me)*Ge,X)}else{if(ae.isInstancedBufferAttribute){for(let j=0;j<H.locationSize;j++)p(H.location+j,ae.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let j=0;j<H.locationSize;j++)m(H.location+j);i.bindBuffer(i.ARRAY_BUFFER,$e);for(let j=0;j<H.locationSize;j++)b(H.location+j,ve/H.locationSize,et,oe,ve*Ge,ve/H.locationSize*j*Ge,X)}}else if(q!==void 0){const oe=q[$];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(H.location,oe);break;case 3:i.vertexAttrib3fv(H.location,oe);break;case 4:i.vertexAttrib4fv(H.location,oe);break;default:i.vertexAttrib1fv(H.location,oe)}}}}T()}function A(){U();for(const S in n){const P=n[S];for(const O in P){const k=P[O];for(const K in k)u(k[K].object),delete k[K];delete P[O]}delete n[S]}}function R(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const O in P){const k=P[O];for(const K in k)u(k[K].object),delete k[K];delete P[O]}delete n[S.id]}function C(S){for(const P in n){const O=n[P];if(O[S.id]===void 0)continue;const k=O[S.id];for(const K in k)u(k[K].object),delete k[K];delete O[S.id]}}function U(){y(),a=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T}}function Lm(i,e,t){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,f){f!==0&&(i.drawArraysInstanced(n,l,u,f),t.update(u,n,f))}function o(l,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function c(l,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Im(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==cn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const U=C===Ns&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Rn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==mn&&!U)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:A,maxSamples:R}}function Um(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Qn,o=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||s;return s=h,n=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const T=r?0:n,b=T*4;let M=p.clippingState||null;c.value=M,M=u(g,h,b,d);for(let A=0;A!==b;++A)M[A]=t[A];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,M=d;b!==_;++b,M+=4)a.copy(f[b]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Nm(i){let e=new WeakMap;function t(a,o){return o===ja?a.mapping=Vi:o===$a&&(a.mapping=Gi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ja||o===$a)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Uf(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Fi=4,Wc=[.125,.215,.35,.446,.526,.582],ii=20,Ea=new qf,Xc=new Ye;let ba=null,Ta=0,Aa=0,wa=!1;const ei=(1+Math.sqrt(5))/2,Di=1/ei,qc=[new F(-ei,Di,0),new F(ei,Di,0),new F(-Di,0,ei),new F(Di,0,ei),new F(0,ei,-Di),new F(0,ei,Di),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],Fm=new F;class Yc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Fm}=r;ba=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,Ta,Aa),this._renderer.xr.enabled=wa,e.scissorTest=!1,_r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vi||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Ns,format:cn,colorSpace:Wi,depthBuffer:!1},s=Kc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Om(r)),this._blurMaterial=Bm(r,e,t)}return s}_compileMaterial(e){const t=new Tt(this._lodPlanes[0],e);this._renderer.compile(t,Ea)}_sceneToCubeUV(e,t,n,s,r){const c=new en(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Xc),f.toneMapping=An,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null));const _=new Vr({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),m=new Tt(new Pn,_);let p=!1;const T=e.background;T?T.isColor&&(_.color.copy(T),e.background=null,p=!0):(_.color.copy(Xc),p=!0);for(let b=0;b<6;b++){const M=b%3;M===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):M===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const A=this._cubeSize;_r(s,M*A,b>2?A:0,A,A),f.setRenderTarget(s),p&&f.render(m,c),f.render(e,c)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=d,f.autoClear=h,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Vi||e.mapping===Gi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;_r(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Ea)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=qc[(s-r-1)%qc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Tt(this._lodPlanes[s],l),h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ii-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):ii;m>ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);const p=[];let T=0;for(let C=0;C<ii;++C){const U=C/_,y=Math.exp(-U*U/2);p.push(y),C===0?T+=y:C<m&&(T+=2*y)}for(let C=0;C<p.length;C++)p[C]=p[C]/T;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-n;const M=this._sizeLods[s],A=3*M*(s>b-Fi?s-b+Fi:0),R=4*(this._cubeSize-M);_r(t,A,R,3*M,2*M),c.setRenderTarget(t),c.render(f,Ea)}}function Om(i){const e=[],t=[],n=[];let s=i;const r=i-Fi+1+Wc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Fi?c=Wc[a-i+Fi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,T=new Float32Array(_*g*d),b=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let R=0;R<d;R++){const C=R%3*2/3-1,U=R>2?0:-1,y=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];T.set(y,_*g*R),b.set(h,m*g*R);const S=[R,R,R,R,R,R];M.set(S,p*g*R)}const A=new Vt;A.setAttribute("position",new ln(T,_)),A.setAttribute("uv",new ln(b,m)),A.setAttribute("faceIndex",new ln(M,p)),e.push(A),s>Fi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Kc(i,e,t){const n=new hi(i,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _r(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Bm(i,e,t){const n=new Float32Array(ii),s=new F(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function jc(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function $c(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function $o(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===ja||c===$a,u=c===Vi||c===Gi;if(l||u){let f=e.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Yc(i)),f=l?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return l&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Yc(i)),f=l?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function km(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Cs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Hm(i,e,t,n){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const d=r.get(h);d&&(e.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const T=d.array;_=d.version;for(let b=0,M=T.length;b<M;b+=3){const A=T[b+0],R=T[b+1],C=T[b+2];h.push(A,R,R,C,C,A)}}else if(g!==void 0){const T=g.array;_=g.version;for(let b=0,M=T.length/3-1;b<M;b+=3){const A=b+0,R=b+1,C=b+2;h.push(A,R,R,C,C,A)}}else return;const m=new(ql(h)?Jl:Zl)(h,1);m.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Vm(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,d){i.drawElements(n,d,r,h*a),t.update(d,n,1)}function l(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,h*a,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/a,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,h,0,_,0,g);let p=0;for(let T=0;T<g;T++)p+=d[T]*_[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Gm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Wm(i,e,t){const n=new WeakMap,s=new gt;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==f){let S=function(){U.dispose(),n.delete(o),o.removeEventListener("dispose",S)};var d=S;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let A=o.attributes.position.count*M,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const C=new Float32Array(A*R*4*f),U=new Yl(C,A,R,f);U.type=mn,U.needsUpdate=!0;const y=M*4;for(let P=0;P<f;P++){const O=p[P],k=T[P],K=b[P],W=A*R*4*P;for(let q=0;q<O.count;q++){const $=q*y;g===!0&&(s.fromBufferAttribute(O,q),C[W+$+0]=s.x,C[W+$+1]=s.y,C[W+$+2]=s.z,C[W+$+3]=0),_===!0&&(s.fromBufferAttribute(k,q),C[W+$+4]=s.x,C[W+$+5]=s.y,C[W+$+6]=s.z,C[W+$+7]=0),m===!0&&(s.fromBufferAttribute(K,q),C[W+$+8]=s.x,C[W+$+9]=s.y,C[W+$+10]=s.z,C[W+$+11]=K.itemSize===4?s.w:1)}}h={count:f,texture:U,size:new Qe(A,R)},n.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Xm(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,f=e.get(c,u);if(s.get(f)!==l&&(e.update(f),s.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==l&&(h.update(),s.set(h,l))}return f}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const cu=new Bt,Zc=new ru(1,1),lu=new Yl,uu=new _f,hu=new tu,Jc=[],Qc=[],el=new Float32Array(16),tl=new Float32Array(9),nl=new Float32Array(4);function Zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Jc[s];if(r===void 0&&(r=new Float32Array(s),Jc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Xr(i,e){let t=Qc[e];t===void 0&&(t=new Int32Array(e),Qc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function qm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),Mt(t,e)}}function Km(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),Mt(t,e)}}function jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),Mt(t,e)}}function $m(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;nl.set(n),i.uniformMatrix2fv(this.addr,!1,nl),Mt(t,n)}}function Zm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;tl.set(n),i.uniformMatrix3fv(this.addr,!1,tl),Mt(t,n)}}function Jm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Mt(t,e)}else{if(xt(t,n))return;el.set(n),i.uniformMatrix4fv(this.addr,!1,el),Mt(t,n)}}function Qm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),Mt(t,e)}}function tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),Mt(t,e)}}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),Mt(t,e)}}function ig(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),Mt(t,e)}}function rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),Mt(t,e)}}function ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),Mt(t,e)}}function og(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Zc.compareFunction=Xl,r=Zc):r=cu,t.setTexture2D(e||r,s)}function cg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||uu,s)}function lg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||hu,s)}function ug(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||lu,s)}function hg(i){switch(i){case 5126:return qm;case 35664:return Ym;case 35665:return Km;case 35666:return jm;case 35674:return $m;case 35675:return Zm;case 35676:return Jm;case 5124:case 35670:return Qm;case 35667:case 35671:return eg;case 35668:case 35672:return tg;case 35669:case 35673:return ng;case 5125:return ig;case 36294:return sg;case 36295:return rg;case 36296:return ag;case 35678:case 36198:case 36298:case 36306:case 35682:return og;case 35679:case 36299:case 36307:return cg;case 35680:case 36300:case 36308:case 36293:return lg;case 36289:case 36303:case 36311:case 36292:return ug}}function fg(i,e){i.uniform1fv(this.addr,e)}function dg(i,e){const t=Zi(e,this.size,2);i.uniform2fv(this.addr,t)}function pg(i,e){const t=Zi(e,this.size,3);i.uniform3fv(this.addr,t)}function mg(i,e){const t=Zi(e,this.size,4);i.uniform4fv(this.addr,t)}function gg(i,e){const t=Zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _g(i,e){const t=Zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function vg(i,e){const t=Zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function xg(i,e){i.uniform1iv(this.addr,e)}function Mg(i,e){i.uniform2iv(this.addr,e)}function Sg(i,e){i.uniform3iv(this.addr,e)}function yg(i,e){i.uniform4iv(this.addr,e)}function Eg(i,e){i.uniform1uiv(this.addr,e)}function bg(i,e){i.uniform2uiv(this.addr,e)}function Tg(i,e){i.uniform3uiv(this.addr,e)}function Ag(i,e){i.uniform4uiv(this.addr,e)}function wg(i,e,t){const n=this.cache,s=e.length,r=Xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||cu,r[a])}function Rg(i,e,t){const n=this.cache,s=e.length,r=Xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||uu,r[a])}function Cg(i,e,t){const n=this.cache,s=e.length,r=Xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hu,r[a])}function Pg(i,e,t){const n=this.cache,s=e.length,r=Xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),Mt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||lu,r[a])}function Dg(i){switch(i){case 5126:return fg;case 35664:return dg;case 35665:return pg;case 35666:return mg;case 35674:return gg;case 35675:return _g;case 35676:return vg;case 5124:case 35670:return xg;case 35667:case 35671:return Mg;case 35668:case 35672:return Sg;case 35669:case 35673:return yg;case 5125:return Eg;case 36294:return bg;case 36295:return Tg;case 36296:return Ag;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Rg;case 35680:case 36300:case 36308:case 36293:return Cg;case 36289:case 36303:case 36311:case 36292:return Pg}}class Lg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=hg(t.type)}}class Ig{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dg(t.type)}}class Ug{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function il(i,e){i.seq.push(e),i.map[e.id]=e}function Ng(i,e,t){const n=i.name,s=n.length;for(Ra.lastIndex=0;;){const r=Ra.exec(n),a=Ra.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){il(t,l===void 0?new Lg(o,i,e):new Ig(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Ug(o),il(t,f)),t=f}}}class Er{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Ng(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function sl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Fg=37297;let Og=0;function Bg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const rl=new Fe;function zg(i){qe._getMatrix(rl,qe.workingColorSpace,i);const e=`mat3( ${rl.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Pr:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function al(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Bg(i.getShaderSource(e),o)}else return r}function kg(i,e){const t=zg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Hg(i,e){let t;switch(e){case wh:t="Linear";break;case Rh:t="Reinhard";break;case Ch:t="Cineon";break;case Ph:t="ACESFilmic";break;case Lh:t="AgX";break;case Ih:t="Neutral";break;case Dh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vr=new F;function Vg(){qe.getLuminanceCoefficients(vr);const i=vr.x.toFixed(4),e=vr.y.toFixed(4),t=vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function Wg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ps(i){return i!==""}function ol(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ro(i){return i.replace(qg,Kg)}const Yg=new Map;function Kg(i,e){let t=Be[e];if(t===void 0){const n=Yg.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ro(t)}const jg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ll(i){return i.replace(jg,$g)}function $g(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ul(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ah?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(e="SHADOWMAP_TYPE_VSM"),e}function Jg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Vi:case Gi:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qg(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Gi&&(e="ENVMAP_MODE_REFRACTION"),e}function e0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Fl:e="ENVMAP_BLENDING_MULTIPLY";break;case Th:e="ENVMAP_BLENDING_MIX";break;case Ah:e="ENVMAP_BLENDING_ADD";break}return e}function t0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function n0(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Zg(t),l=Jg(t),u=Qg(t),f=e0(t),h=t0(t),d=Gg(t),g=Wg(r),_=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ps).join(`
`),p.length>0&&(p+=`
`)):(m=[ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),p=[ul(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Be.tonemapping_pars_fragment:"",t.toneMapping!==An?Hg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,kg("linearToOutputTexel",t.outputColorSpace),Vg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ps).join(`
`)),a=Ro(a),a=ol(a,t),a=cl(a,t),o=Ro(o),o=ol(o,t),o=cl(o,t),a=ll(a),o=ll(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===_c?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=T+m+a,M=T+p+o,A=sl(s,s.VERTEX_SHADER,b),R=sl(s,s.FRAGMENT_SHADER,M);s.attachShader(_,A),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(A)||"",K=s.getShaderInfoLog(R)||"",W=O.trim(),q=k.trim(),$=K.trim();let H=!0,ae=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,R);else{const oe=al(s,A,"vertex"),ve=al(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+W+`
`+oe+`
`+ve)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(q===""||$==="")&&(ae=!1);ae&&(P.diagnostics={runnable:H,programLog:W,vertexShader:{log:q,prefix:m},fragmentShader:{log:$,prefix:p}})}s.deleteShader(A),s.deleteShader(R),U=new Er(s,_),y=Xg(s,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,Fg)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Og++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=R,this}let i0=0;class s0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new r0(e),t.set(e,n)),n}}class r0{constructor(e){this.id=i0++,this.code=e,this.usedTimes=0}}function a0(i,e,t,n,s,r,a){const o=new jl,c=new s0,l=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,S,P,O,k){const K=O.fog,W=k.geometry,q=y.isMeshStandardMaterial?O.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||q),H=$&&$.mapping===Hr?$.image.height:null,ae=g[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const oe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ve=oe!==void 0?oe.length:0;let Ue=0;W.morphAttributes.position!==void 0&&(Ue=1),W.morphAttributes.normal!==void 0&&(Ue=2),W.morphAttributes.color!==void 0&&(Ue=3);let $e,et,Ge,X;if(ae){const Ke=fn[ae];$e=Ke.vertexShader,et=Ke.fragmentShader}else $e=y.vertexShader,et=y.fragmentShader,c.update(y),Ge=c.getVertexShaderID(y),X=c.getFragmentShaderID(y);const j=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Ce=k.isInstancedMesh===!0,Me=k.isBatchedMesh===!0,ze=!!y.map,vt=!!y.matcap,w=!!$,tt=!!y.aoMap,Le=!!y.lightMap,we=!!y.bumpMap,me=!!y.normalMap,ct=!!y.displacementMap,xe=!!y.emissiveMap,Oe=!!y.metalnessMap,St=!!y.roughnessMap,mt=y.anisotropy>0,E=y.clearcoat>0,v=y.dispersion>0,N=y.iridescence>0,G=y.sheen>0,Z=y.transmission>0,V=mt&&!!y.anisotropyMap,be=E&&!!y.clearcoatMap,ne=E&&!!y.clearcoatNormalMap,Se=E&&!!y.clearcoatRoughnessMap,ye=N&&!!y.iridescenceMap,ee=N&&!!y.iridescenceThicknessMap,he=G&&!!y.sheenColorMap,Pe=G&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,le=!!y.specularColorMap,Ne=!!y.specularIntensityMap,D=Z&&!!y.transmissionMap,te=Z&&!!y.thicknessMap,se=!!y.gradientMap,pe=!!y.alphaMap,J=y.alphaTest>0,Y=!!y.alphaHash,_e=!!y.extensions;let Ie=An;y.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const st={shaderID:ae,shaderType:y.type,shaderName:y.name,vertexShader:$e,fragmentShader:et,defines:y.defines,customVertexShaderID:Ge,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Me,batchingColor:Me&&k._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&k.instanceColor!==null,instancingMorph:Ce&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Wi,alphaToCoverage:!!y.alphaToCoverage,map:ze,matcap:vt,envMap:w,envMapMode:w&&$.mapping,envMapCubeUVHeight:H,aoMap:tt,lightMap:Le,bumpMap:we,normalMap:me,displacementMap:h&&ct,emissiveMap:xe,normalMapObjectSpace:me&&y.normalMapType===Bh,normalMapTangentSpace:me&&y.normalMapType===Oh,metalnessMap:Oe,roughnessMap:St,anisotropy:mt,anisotropyMap:V,clearcoat:E,clearcoatMap:be,clearcoatNormalMap:ne,clearcoatRoughnessMap:Se,dispersion:v,iridescence:N,iridescenceMap:ye,iridescenceThicknessMap:ee,sheen:G,sheenColorMap:he,sheenRoughnessMap:Pe,specularMap:Ee,specularColorMap:le,specularIntensityMap:Ne,transmission:Z,transmissionMap:D,thicknessMap:te,gradientMap:se,opaque:y.transparent===!1&&y.blending===Bi&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:J,alphaHash:Y,combine:y.combine,mapUv:ze&&_(y.map.channel),aoMapUv:tt&&_(y.aoMap.channel),lightMapUv:Le&&_(y.lightMap.channel),bumpMapUv:we&&_(y.bumpMap.channel),normalMapUv:me&&_(y.normalMap.channel),displacementMapUv:ct&&_(y.displacementMap.channel),emissiveMapUv:xe&&_(y.emissiveMap.channel),metalnessMapUv:Oe&&_(y.metalnessMap.channel),roughnessMapUv:St&&_(y.roughnessMap.channel),anisotropyMapUv:V&&_(y.anisotropyMap.channel),clearcoatMapUv:be&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ne&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:he&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(y.sheenRoughnessMap.channel),specularMapUv:Ee&&_(y.specularMap.channel),specularColorMapUv:le&&_(y.specularColorMap.channel),specularIntensityMapUv:Ne&&_(y.specularIntensityMap.channel),transmissionMapUv:D&&_(y.transmissionMap.channel),thicknessMapUv:te&&_(y.thicknessMap.channel),alphaMapUv:pe&&_(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(me||mt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(ze||pe),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:de,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Ue,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:ze&&y.map.isVideoTexture===!0&&qe.getTransfer(y.map.colorSpace)===Je,decodeVideoTextureEmissive:xe&&y.emissiveMap.isVideoTexture===!0&&qe.getTransfer(y.emissiveMap.colorSpace)===Je,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===on,flipSided:y.side===Ot,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:_e&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&y.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return st.vertexUv1s=l.has(1),st.vertexUv2s=l.has(2),st.vertexUv3s=l.has(3),l.clear(),st}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)S.push(P),S.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(T(S,y),b(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function T(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function b(y,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),y.push(o.mask)}function M(y){const S=g[y.type];let P;if(S){const O=fn[S];P=Pf.clone(O.uniforms)}else P=y.uniforms;return P}function A(y,S){let P;for(let O=0,k=u.length;O<k;O++){const K=u[O];if(K.cacheKey===S){P=K,++P.usedTimes;break}}return P===void 0&&(P=new n0(i,S,y,r),u.push(P)),P}function R(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function C(y){c.remove(y)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:A,releaseProgram:R,releaseShaderCache:C,programs:u,dispose:U}}function o0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function c0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function fl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f,h,d,g,_,m){let p=i[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function o(f,h,d,g,_,m){const p=a(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(f,h,d,g,_,m){const p=a(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(f,h){t.length>1&&t.sort(f||c0),n.length>1&&n.sort(h||hl),s.length>1&&s.sort(h||hl)}function u(){for(let f=e,h=i.length;f<h;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function l0(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new fl,i.set(n,[a])):s>=r.length?(a=new fl,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function u0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ye};break;case"SpotLight":t={position:new F,direction:new F,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function h0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let f0=0;function d0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function p0(i){const e=new u0,t=h0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new ht,a=new ht;function o(l){let u=0,f=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,T=0,b=0,M=0,A=0,R=0,C=0;l.sort(d0);for(let y=0,S=l.length;y<S;y++){const P=l[y],O=P.color,k=P.intensity,K=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*k,f+=O.g*k,h+=O.b*k;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],k);C++}else if(P.isDirectionalLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,H=t.get(P);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=P.shadow.matrix,T++}n.directional[d]=q,d++}else if(P.isSpotLight){const q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(O).multiplyScalar(k),q.distance=K,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[_]=q;const $=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,$.updateMatrices(P),P.castShadow&&R++),n.spotLightMatrix[_]=$.matrix,P.castShadow){const H=t.get(P);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=W,M++}_++}else if(P.isRectAreaLight){const q=e.get(P);q.color.copy(O).multiplyScalar(k),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=q,m++}else if(P.isPointLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const $=P.shadow,H=t.get(P);H.shadowIntensity=$.intensity,H.shadowBias=$.bias,H.shadowNormalBias=$.normalBias,H.shadowRadius=$.radius,H.shadowMapSize=$.mapSize,H.shadowCameraNear=$.camera.near,H.shadowCameraFar=$.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=q,g++}else if(P.isHemisphereLight){const q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(k),q.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const U=n.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==T||U.numPointShadows!==b||U.numSpotShadows!==M||U.numSpotMaps!==A||U.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+A-R,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=T,U.numPointShadows=b,U.numSpotShadows=M,U.numSpotMaps=A,U.numLightProbes=C,n.version=f0++)}function c(l,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,T=l.length;p<T;p++){const b=l[p];if(b.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(b.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(b.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function dl(i){const e=new p0(i),t=[],n=[];function s(u){l.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function m0(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new dl(i),e.set(s,[o])):r>=a.length?(o=new dl(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const g0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function v0(i,e,t){let n=new iu;const s=new Qe,r=new Qe,a=new gt,o=new Wf({depthPacking:Fh}),c=new Xf,l={},u=t.maxTextureSize,f={[Gn]:Ot,[Ot]:Gn,[on]:on},h=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:g0,fragmentShader:_0}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Vt;g.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Tt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nl;let p=this.type;this.render=function(R,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Vn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const k=p!==Tn&&this.type===Tn,K=p===Tn&&this.type!==Tn;for(let W=0,q=R.length;W<q;W++){const $=R[W],H=$.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ae=H.getFrameExtents();if(s.multiply(ae),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ae.x),s.x=r.x*ae.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ae.y),s.y=r.y*ae.y,H.mapSize.y=r.y)),H.map===null||k===!0||K===!0){const ve=this.type!==Tn?{minFilter:bt,magFilter:bt}:{};H.map!==null&&H.map.dispose(),H.map=new hi(s.x,s.y,ve),H.map.texture.name=$.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const oe=H.getViewportCount();for(let ve=0;ve<oe;ve++){const Ue=H.getViewport(ve);a.set(r.x*Ue.x,r.y*Ue.y,r.x*Ue.z,r.y*Ue.w),O.viewport(a),H.updateMatrices($,ve),n=H.getFrustum(),M(C,U,H.camera,$,this.type)}H.isPointLightShadow!==!0&&this.type===Tn&&T(H,U),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,S,P)};function T(R,C){const U=e.update(_);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new hi(s.x,s.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(C,null,U,h,_,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(C,null,U,d,_,null)}function b(R,C,U,y){let S=null;const P=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)S=P;else if(S=U.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=S.uuid,k=C.uuid;let K=l[O];K===void 0&&(K={},l[O]=K);let W=K[k];W===void 0&&(W=S.clone(),K[k]=W,C.addEventListener("dispose",A)),S=W}if(S.visible=C.visible,S.wireframe=C.wireframe,y===Tn?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:f[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,U.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=i.properties.get(S);O.light=U}return S}function M(R,C,U,y,S){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===Tn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);const k=e.update(R),K=R.material;if(Array.isArray(K)){const W=k.groups;for(let q=0,$=W.length;q<$;q++){const H=W[q],ae=K[H.materialIndex];if(ae&&ae.visible){const oe=b(R,ae,y,S);R.onBeforeShadow(i,R,C,U,k,oe,H),i.renderBufferDirect(U,null,k,oe,R,H),R.onAfterShadow(i,R,C,U,k,oe,H)}}}else if(K.visible){const W=b(R,K,y,S);R.onBeforeShadow(i,R,C,U,k,W,null),i.renderBufferDirect(U,null,k,W,R,null),R.onAfterShadow(i,R,C,U,k,W,null)}}const O=R.children;for(let k=0,K=O.length;k<K;k++)M(O[k],C,U,y,S)}function A(R){R.target.removeEventListener("dispose",A);for(const U in l){const y=l[U],S=R.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const x0={[Va]:Ga,[Wa]:Ya,[Xa]:Ka,[Hi]:qa,[Ga]:Va,[Ya]:Wa,[Ka]:Xa,[qa]:Hi};function M0(i,e){function t(){let D=!1;const te=new gt;let se=null;const pe=new gt(0,0,0,0);return{setMask:function(J){se!==J&&!D&&(i.colorMask(J,J,J,J),se=J)},setLocked:function(J){D=J},setClear:function(J,Y,_e,Ie,st){st===!0&&(J*=Ie,Y*=Ie,_e*=Ie),te.set(J,Y,_e,Ie),pe.equals(te)===!1&&(i.clearColor(J,Y,_e,Ie),pe.copy(te))},reset:function(){D=!1,se=null,pe.set(-1,0,0,0)}}}function n(){let D=!1,te=!1,se=null,pe=null,J=null;return{setReversed:function(Y){if(te!==Y){const _e=e.get("EXT_clip_control");Y?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),te=Y;const Ie=J;J=null,this.setClear(Ie)}},getReversed:function(){return te},setTest:function(Y){Y?j(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(Y){se!==Y&&!D&&(i.depthMask(Y),se=Y)},setFunc:function(Y){if(te&&(Y=x0[Y]),pe!==Y){switch(Y){case Va:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Wa:i.depthFunc(i.LESS);break;case Hi:i.depthFunc(i.LEQUAL);break;case Xa:i.depthFunc(i.EQUAL);break;case qa:i.depthFunc(i.GEQUAL);break;case Ya:i.depthFunc(i.GREATER);break;case Ka:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=Y}},setLocked:function(Y){D=Y},setClear:function(Y){J!==Y&&(te&&(Y=1-Y),i.clearDepth(Y),J=Y)},reset:function(){D=!1,se=null,pe=null,J=null,te=!1}}}function s(){let D=!1,te=null,se=null,pe=null,J=null,Y=null,_e=null,Ie=null,st=null;return{setTest:function(Ke){D||(Ke?j(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(Ke){te!==Ke&&!D&&(i.stencilMask(Ke),te=Ke)},setFunc:function(Ke,xn,un){(se!==Ke||pe!==xn||J!==un)&&(i.stencilFunc(Ke,xn,un),se=Ke,pe=xn,J=un)},setOp:function(Ke,xn,un){(Y!==Ke||_e!==xn||Ie!==un)&&(i.stencilOp(Ke,xn,un),Y=Ke,_e=xn,Ie=un)},setLocked:function(Ke){D=Ke},setClear:function(Ke){st!==Ke&&(i.clearStencil(Ke),st=Ke)},reset:function(){D=!1,te=null,se=null,pe=null,J=null,Y=null,_e=null,Ie=null,st=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,T=null,b=null,M=null,A=null,R=null,C=new Ye(0,0,0),U=0,y=!1,S=null,P=null,O=null,k=null,K=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,$=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(H)[1]),q=$>=1):H.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),q=$>=2);let ae=null,oe={};const ve=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),$e=new gt().fromArray(ve),et=new gt().fromArray(Ue);function Ge(D,te,se,pe){const J=new Uint8Array(4),Y=i.createTexture();i.bindTexture(D,Y),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<se;_e++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(te,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(te+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return Y}const X={};X[i.TEXTURE_2D]=Ge(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=Ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=Ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=Ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(Hi),we(!1),me(hc),j(i.CULL_FACE),tt(Vn);function j(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function de(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Ce(D,te){return f[D]!==te?(i.bindFramebuffer(D,te),f[D]=te,D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=te),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=te),!0):!1}function Me(D,te){let se=d,pe=!1;if(D){se=h.get(te),se===void 0&&(se=[],h.set(te,se));const J=D.textures;if(se.length!==J.length||se[0]!==i.COLOR_ATTACHMENT0){for(let Y=0,_e=J.length;Y<_e;Y++)se[Y]=i.COLOR_ATTACHMENT0+Y;se.length=J.length,pe=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,pe=!0);pe&&i.drawBuffers(se)}function ze(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const vt={[ni]:i.FUNC_ADD,[ch]:i.FUNC_SUBTRACT,[lh]:i.FUNC_REVERSE_SUBTRACT};vt[uh]=i.MIN,vt[hh]=i.MAX;const w={[fh]:i.ZERO,[dh]:i.ONE,[ph]:i.SRC_COLOR,[ka]:i.SRC_ALPHA,[Mh]:i.SRC_ALPHA_SATURATE,[vh]:i.DST_COLOR,[gh]:i.DST_ALPHA,[mh]:i.ONE_MINUS_SRC_COLOR,[Ha]:i.ONE_MINUS_SRC_ALPHA,[xh]:i.ONE_MINUS_DST_COLOR,[_h]:i.ONE_MINUS_DST_ALPHA,[Sh]:i.CONSTANT_COLOR,[yh]:i.ONE_MINUS_CONSTANT_COLOR,[Eh]:i.CONSTANT_ALPHA,[bh]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(D,te,se,pe,J,Y,_e,Ie,st,Ke){if(D===Vn){_===!0&&(de(i.BLEND),_=!1);return}if(_===!1&&(j(i.BLEND),_=!0),D!==oh){if(D!==m||Ke!==y){if((p!==ni||M!==ni)&&(i.blendEquation(i.FUNC_ADD),p=ni,M=ni),Ke)switch(D){case Bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fc:i.blendFunc(i.ONE,i.ONE);break;case dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case dc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}T=null,b=null,A=null,R=null,C.set(0,0,0),U=0,m=D,y=Ke}return}J=J||te,Y=Y||se,_e=_e||pe,(te!==p||J!==M)&&(i.blendEquationSeparate(vt[te],vt[J]),p=te,M=J),(se!==T||pe!==b||Y!==A||_e!==R)&&(i.blendFuncSeparate(w[se],w[pe],w[Y],w[_e]),T=se,b=pe,A=Y,R=_e),(Ie.equals(C)===!1||st!==U)&&(i.blendColor(Ie.r,Ie.g,Ie.b,st),C.copy(Ie),U=st),m=D,y=!1}function Le(D,te){D.side===on?de(i.CULL_FACE):j(i.CULL_FACE);let se=D.side===Ot;te&&(se=!se),we(se),D.blending===Bi&&D.transparent===!1?tt(Vn):tt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const pe=D.stencilWrite;o.setTest(pe),pe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),xe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(D){S!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),S=D)}function me(D){D!==sh?(j(i.CULL_FACE),D!==P&&(D===hc?i.cullFace(i.BACK):D===rh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),P=D}function ct(D){D!==O&&(q&&i.lineWidth(D),O=D)}function xe(D,te,se){D?(j(i.POLYGON_OFFSET_FILL),(k!==te||K!==se)&&(i.polygonOffset(te,se),k=te,K=se)):de(i.POLYGON_OFFSET_FILL)}function Oe(D){D?j(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function St(D){D===void 0&&(D=i.TEXTURE0+W-1),ae!==D&&(i.activeTexture(D),ae=D)}function mt(D,te,se){se===void 0&&(ae===null?se=i.TEXTURE0+W-1:se=ae);let pe=oe[se];pe===void 0&&(pe={type:void 0,texture:void 0},oe[se]=pe),(pe.type!==D||pe.texture!==te)&&(ae!==se&&(i.activeTexture(se),ae=se),i.bindTexture(D,te||X[D]),pe.type=D,pe.texture=te)}function E(){const D=oe[ae];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function N(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(D){$e.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),$e.copy(D))}function Pe(D){et.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),et.copy(D))}function Ee(D,te){let se=l.get(te);se===void 0&&(se=new WeakMap,l.set(te,se));let pe=se.get(D);pe===void 0&&(pe=i.getUniformBlockIndex(te,D.name),se.set(D,pe))}function le(D,te){const pe=l.get(te).get(D);c.get(te)!==pe&&(i.uniformBlockBinding(te,pe,D.__bindingPointIndex),c.set(te,pe))}function Ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ae=null,oe={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,T=null,b=null,M=null,A=null,R=null,C=new Ye(0,0,0),U=0,y=!1,S=null,P=null,O=null,k=null,K=null,$e.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:j,disable:de,bindFramebuffer:Ce,drawBuffers:Me,useProgram:ze,setBlending:tt,setMaterial:Le,setFlipSided:we,setCullFace:me,setLineWidth:ct,setPolygonOffset:xe,setScissorTest:Oe,activeTexture:St,bindTexture:mt,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:ye,texImage3D:ee,updateUBOMapping:Ee,uniformBlockBinding:le,texStorage2D:ne,texStorage3D:Se,texSubImage2D:G,texSubImage3D:Z,compressedTexSubImage2D:V,compressedTexSubImage3D:be,scissor:he,viewport:Pe,reset:Ne}}function S0(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Qe,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return d?new OffscreenCanvas(E,v):Lr("canvas")}function _(E,v,N){let G=1;const Z=mt(E);if((Z.width>N||Z.height>N)&&(G=N/Math.max(Z.width,Z.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const V=Math.floor(G*Z.width),be=Math.floor(G*Z.height);f===void 0&&(f=g(V,be));const ne=v?g(V,be):f;return ne.width=V,ne.height=be,ne.getContext("2d").drawImage(E,0,0,V,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+V+"x"+be+")."),ne}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,v,N,G,Z=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let V=v;if(v===i.RED&&(N===i.FLOAT&&(V=i.R32F),N===i.HALF_FLOAT&&(V=i.R16F),N===i.UNSIGNED_BYTE&&(V=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.R8UI),N===i.UNSIGNED_SHORT&&(V=i.R16UI),N===i.UNSIGNED_INT&&(V=i.R32UI),N===i.BYTE&&(V=i.R8I),N===i.SHORT&&(V=i.R16I),N===i.INT&&(V=i.R32I)),v===i.RG&&(N===i.FLOAT&&(V=i.RG32F),N===i.HALF_FLOAT&&(V=i.RG16F),N===i.UNSIGNED_BYTE&&(V=i.RG8)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.RG8UI),N===i.UNSIGNED_SHORT&&(V=i.RG16UI),N===i.UNSIGNED_INT&&(V=i.RG32UI),N===i.BYTE&&(V=i.RG8I),N===i.SHORT&&(V=i.RG16I),N===i.INT&&(V=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.RGB8UI),N===i.UNSIGNED_SHORT&&(V=i.RGB16UI),N===i.UNSIGNED_INT&&(V=i.RGB32UI),N===i.BYTE&&(V=i.RGB8I),N===i.SHORT&&(V=i.RGB16I),N===i.INT&&(V=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(V=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(V=i.RGBA16UI),N===i.UNSIGNED_INT&&(V=i.RGBA32UI),N===i.BYTE&&(V=i.RGBA8I),N===i.SHORT&&(V=i.RGBA16I),N===i.INT&&(V=i.RGBA32I)),v===i.RGB&&(N===i.UNSIGNED_INT_5_9_9_9_REV&&(V=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(V=i.R11F_G11F_B10F)),v===i.RGBA){const be=Z?Pr:qe.getTransfer(G);N===i.FLOAT&&(V=i.RGBA32F),N===i.HALF_FLOAT&&(V=i.RGBA16F),N===i.UNSIGNED_BYTE&&(V=be===Je?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(V=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(V=i.RGB5_A1)}return(V===i.R16F||V===i.R32F||V===i.RG16F||V===i.RG32F||V===i.RGBA16F||V===i.RGBA32F)&&e.get("EXT_color_buffer_float"),V}function M(E,v){let N;return E?v===null||v===ui||v===Ts?N=i.DEPTH24_STENCIL8:v===mn?N=i.DEPTH32F_STENCIL8:v===bs&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ui||v===Ts?N=i.DEPTH_COMPONENT24:v===mn?N=i.DEPTH_COMPONENT32F:v===bs&&(N=i.DEPTH_COMPONENT16),N}function A(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==bt&&E.minFilter!==pn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function R(E){const v=E.target;v.removeEventListener("dispose",R),U(v),v.isVideoTexture&&u.delete(v)}function C(E){const v=E.target;v.removeEventListener("dispose",C),S(v)}function U(E){const v=n.get(E);if(v.__webglInit===void 0)return;const N=E.source,G=h.get(N);if(G){const Z=G[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&y(E),Object.keys(G).length===0&&h.delete(N)}n.remove(E)}function y(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const N=E.source,G=h.get(N);delete G[v.__cacheKey],a.memory.textures--}function S(E){const v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let Z=0;Z<v.__webglFramebuffer[G].length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[G][Z]);else i.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)i.deleteFramebuffer(v.__webglFramebuffer[G]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=E.textures;for(let G=0,Z=N.length;G<Z;G++){const V=n.get(N[G]);V.__webglTexture&&(i.deleteTexture(V.__webglTexture),a.memory.textures--),n.remove(N[G])}n.remove(E)}let P=0;function O(){P=0}function k(){const E=P;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function K(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function W(E,v){const N=n.get(E);if(E.isVideoTexture&&Oe(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&N.__version!==E.version){const G=E.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,E,v);return}}else E.isExternalTexture&&(N.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function q(E,v){const N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function $(E,v){const N=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){X(N,E,v);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function H(E,v){const N=n.get(E);if(E.version>0&&N.__version!==E.version){j(N,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const ae={[Za]:i.REPEAT,[ri]:i.CLAMP_TO_EDGE,[Ja]:i.MIRRORED_REPEAT},oe={[bt]:i.NEAREST,[Uh]:i.NEAREST_MIPMAP_NEAREST,[ds]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[Jr]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},ve={[zh]:i.NEVER,[Xh]:i.ALWAYS,[kh]:i.LESS,[Xl]:i.LEQUAL,[Hh]:i.EQUAL,[Wh]:i.GEQUAL,[Vh]:i.GREATER,[Gh]:i.NOTEQUAL};function Ue(E,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===pn||v.magFilter===Jr||v.magFilter===ds||v.magFilter===ai||v.minFilter===pn||v.minFilter===Jr||v.minFilter===ds||v.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,ae[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,ae[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,ae[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,oe[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,oe[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ve[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===bt||v.minFilter!==ds&&v.minFilter!==ai||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function $e(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",R));const G=v.source;let Z=h.get(G);Z===void 0&&(Z={},h.set(G,Z));const V=K(v);if(V!==E.__cacheKey){Z[V]===void 0&&(Z[V]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Z[V].usedTimes++;const be=Z[E.__cacheKey];be!==void 0&&(Z[E.__cacheKey].usedTimes--,be.usedTimes===0&&y(v)),E.__cacheKey=V,E.__webglTexture=Z[V].texture}return N}function et(E,v,N){return Math.floor(Math.floor(E/N)/v)}function Ge(E,v,N,G){const V=E.updateRanges;if(V.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,N,G,v.data);else{V.sort((ee,he)=>ee.start-he.start);let be=0;for(let ee=1;ee<V.length;ee++){const he=V[be],Pe=V[ee],Ee=he.start+he.count,le=et(Pe.start,v.width,4),Ne=et(he.start,v.width,4);Pe.start<=Ee+1&&le===Ne&&et(Pe.start+Pe.count-1,v.width,4)===le?he.count=Math.max(he.count,Pe.start+Pe.count-he.start):(++be,V[be]=Pe)}V.length=be+1;const ne=i.getParameter(i.UNPACK_ROW_LENGTH),Se=i.getParameter(i.UNPACK_SKIP_PIXELS),ye=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ee=0,he=V.length;ee<he;ee++){const Pe=V[ee],Ee=Math.floor(Pe.start/4),le=Math.ceil(Pe.count/4),Ne=Ee%v.width,D=Math.floor(Ee/v.width),te=le,se=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ne,D,te,se,N,G,v.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Se),i.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function X(E,v,N){let G=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=i.TEXTURE_3D);const Z=$e(E,v),V=v.source;t.bindTexture(G,E.__webglTexture,i.TEXTURE0+N);const be=n.get(V);if(V.version!==be.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const ne=qe.getPrimaries(qe.workingColorSpace),Se=v.colorSpace===zn?null:qe.getPrimaries(v.colorSpace),ye=v.colorSpace===zn||ne===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let ee=_(v.image,!1,s.maxTextureSize);ee=St(v,ee);const he=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type);let Ee=b(v.internalFormat,he,Pe,v.colorSpace,v.isVideoTexture);Ue(G,v);let le;const Ne=v.mipmaps,D=v.isVideoTexture!==!0,te=be.__version===void 0||Z===!0,se=V.dataReady,pe=A(v,ee);if(v.isDepthTexture)Ee=M(v.format===ws,v.type),te&&(D?t.texStorage2D(i.TEXTURE_2D,1,Ee,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Ee,ee.width,ee.height,0,he,Pe,null));else if(v.isDataTexture)if(Ne.length>0){D&&te&&t.texStorage2D(i.TEXTURE_2D,pe,Ee,Ne[0].width,Ne[0].height);for(let J=0,Y=Ne.length;J<Y;J++)le=Ne[J],D?se&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,he,Pe,le.data):t.texImage2D(i.TEXTURE_2D,J,Ee,le.width,le.height,0,he,Pe,le.data);v.generateMipmaps=!1}else D?(te&&t.texStorage2D(i.TEXTURE_2D,pe,Ee,ee.width,ee.height),se&&Ge(v,ee,he,Pe)):t.texImage2D(i.TEXTURE_2D,0,Ee,ee.width,ee.height,0,he,Pe,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&te&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Ee,Ne[0].width,Ne[0].height,ee.depth);for(let J=0,Y=Ne.length;J<Y;J++)if(le=Ne[J],v.format!==cn)if(he!==null)if(D){if(se)if(v.layerUpdates.size>0){const _e=Gc(le.width,le.height,v.format,v.type);for(const Ie of v.layerUpdates){const st=le.data.subarray(Ie*_e/le.data.BYTES_PER_ELEMENT,(Ie+1)*_e/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,Ie,le.width,le.height,1,he,st)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,ee.depth,he,le.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Ee,le.width,le.height,ee.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?se&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,ee.depth,he,Pe,le.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Ee,le.width,le.height,ee.depth,0,he,Pe,le.data)}else{D&&te&&t.texStorage2D(i.TEXTURE_2D,pe,Ee,Ne[0].width,Ne[0].height);for(let J=0,Y=Ne.length;J<Y;J++)le=Ne[J],v.format!==cn?he!==null?D?se&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,he,le.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Ee,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?se&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,le.width,le.height,he,Pe,le.data):t.texImage2D(i.TEXTURE_2D,J,Ee,le.width,le.height,0,he,Pe,le.data)}else if(v.isDataArrayTexture)if(D){if(te&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,Ee,ee.width,ee.height,ee.depth),se)if(v.layerUpdates.size>0){const J=Gc(ee.width,ee.height,v.format,v.type);for(const Y of v.layerUpdates){const _e=ee.data.subarray(Y*J/ee.data.BYTES_PER_ELEMENT,(Y+1)*J/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,ee.width,ee.height,1,he,Pe,_e)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,he,Pe,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,ee.width,ee.height,ee.depth,0,he,Pe,ee.data);else if(v.isData3DTexture)D?(te&&t.texStorage3D(i.TEXTURE_3D,pe,Ee,ee.width,ee.height,ee.depth),se&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,he,Pe,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,ee.width,ee.height,ee.depth,0,he,Pe,ee.data);else if(v.isFramebufferTexture){if(te)if(D)t.texStorage2D(i.TEXTURE_2D,pe,Ee,ee.width,ee.height);else{let J=ee.width,Y=ee.height;for(let _e=0;_e<pe;_e++)t.texImage2D(i.TEXTURE_2D,_e,Ee,J,Y,0,he,Pe,null),J>>=1,Y>>=1}}else if(Ne.length>0){if(D&&te){const J=mt(Ne[0]);t.texStorage2D(i.TEXTURE_2D,pe,Ee,J.width,J.height)}for(let J=0,Y=Ne.length;J<Y;J++)le=Ne[J],D?se&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,he,Pe,le):t.texImage2D(i.TEXTURE_2D,J,Ee,he,Pe,le);v.generateMipmaps=!1}else if(D){if(te){const J=mt(ee);t.texStorage2D(i.TEXTURE_2D,pe,Ee,J.width,J.height)}se&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Pe,ee)}else t.texImage2D(i.TEXTURE_2D,0,Ee,he,Pe,ee);m(v)&&p(G),be.__version=V.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function j(E,v,N){if(v.image.length!==6)return;const G=$e(E,v),Z=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const V=n.get(Z);if(Z.version!==V.__version||G===!0){t.activeTexture(i.TEXTURE0+N);const be=qe.getPrimaries(qe.workingColorSpace),ne=v.colorSpace===zn?null:qe.getPrimaries(v.colorSpace),Se=v.colorSpace===zn||be===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const ye=v.isCompressedTexture||v.image[0].isCompressedTexture,ee=v.image[0]&&v.image[0].isDataTexture,he=[];for(let Y=0;Y<6;Y++)!ye&&!ee?he[Y]=_(v.image[Y],!0,s.maxCubemapSize):he[Y]=ee?v.image[Y].image:v.image[Y],he[Y]=St(v,he[Y]);const Pe=he[0],Ee=r.convert(v.format,v.colorSpace),le=r.convert(v.type),Ne=b(v.internalFormat,Ee,le,v.colorSpace),D=v.isVideoTexture!==!0,te=V.__version===void 0||G===!0,se=Z.dataReady;let pe=A(v,Pe);Ue(i.TEXTURE_CUBE_MAP,v);let J;if(ye){D&&te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ne,Pe.width,Pe.height);for(let Y=0;Y<6;Y++){J=he[Y].mipmaps;for(let _e=0;_e<J.length;_e++){const Ie=J[_e];v.format!==cn?Ee!==null?D?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,0,0,Ie.width,Ie.height,Ee,Ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,Ne,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,0,0,Ie.width,Ie.height,Ee,le,Ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e,Ne,Ie.width,Ie.height,0,Ee,le,Ie.data)}}}else{if(J=v.mipmaps,D&&te){J.length>0&&pe++;const Y=mt(he[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ne,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(ee){D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,he[Y].width,he[Y].height,Ee,le,he[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ne,he[Y].width,he[Y].height,0,Ee,le,he[Y].data);for(let _e=0;_e<J.length;_e++){const st=J[_e].image[Y].image;D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,0,0,st.width,st.height,Ee,le,st.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,Ne,st.width,st.height,0,Ee,le,st.data)}}else{D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ee,le,he[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Ne,Ee,le,he[Y]);for(let _e=0;_e<J.length;_e++){const Ie=J[_e];D?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,0,0,Ee,le,Ie.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,_e+1,Ne,Ee,le,Ie.image[Y])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),V.__version=Z.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function de(E,v,N,G,Z,V){const be=r.convert(N.format,N.colorSpace),ne=r.convert(N.type),Se=b(N.internalFormat,be,ne,N.colorSpace),ye=n.get(v),ee=n.get(N);if(ee.__renderTarget=v,!ye.__hasExternalTextures){const he=Math.max(1,v.width>>V),Pe=Math.max(1,v.height>>V);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,V,Se,he,Pe,v.depth,0,be,ne,null):t.texImage2D(Z,V,Se,he,Pe,0,be,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),xe(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,Z,ee.__webglTexture,0,ct(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,Z,ee.__webglTexture,V),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(E,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){const G=v.depthTexture,Z=G&&G.isDepthTexture?G.type:null,V=M(v.stencilBuffer,Z),be=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=ct(v);xe(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ne,V,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,ne,V,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,V,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,E)}else{const G=v.textures;for(let Z=0;Z<G.length;Z++){const V=G[Z],be=r.convert(V.format,V.colorSpace),ne=r.convert(V.type),Se=b(V.internalFormat,be,ne,V.colorSpace),ye=ct(v);N&&xe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,Se,v.width,v.height):xe(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,Se,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Se,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const G=n.get(v.depthTexture);G.__renderTarget=v,(!G.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const Z=G.__webglTexture,V=ct(v);if(v.depthTexture.format===As)xe(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(v.depthTexture.format===ws)xe(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,V):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function ze(E){const v=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const G=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",Z)};G.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=G}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const G=E.texture.mipmaps;G&&G.length>0?Me(v.__webglFramebuffer[0],E):Me(v.__webglFramebuffer,E)}else if(N){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=i.createRenderbuffer(),Ce(v.__webglDepthbuffer[G],E,!1);else{const Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,V)}}else{const G=E.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ce(v.__webglDepthbuffer,E,!1);else{const Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,V),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,V)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function vt(E,v,N){const G=n.get(E);v!==void 0&&de(G.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&ze(E)}function w(E){const v=E.texture,N=n.get(E),G=n.get(v);E.addEventListener("dispose",C);const Z=E.textures,V=E.isWebGLCubeRenderTarget===!0,be=Z.length>1;if(be||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=v.version,a.memory.textures++),V){N.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[ne]=[];for(let Se=0;Se<v.mipmaps.length;Se++)N.__webglFramebuffer[ne][Se]=i.createFramebuffer()}else N.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let ne=0;ne<v.mipmaps.length;ne++)N.__webglFramebuffer[ne]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(be)for(let ne=0,Se=Z.length;ne<Se;ne++){const ye=n.get(Z[ne]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&xe(E)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ne=0;ne<Z.length;ne++){const Se=Z[ne];N.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ne]);const ye=r.convert(Se.format,Se.colorSpace),ee=r.convert(Se.type),he=b(Se.internalFormat,ye,ee,Se.colorSpace,E.isXRRenderTarget===!0),Pe=ct(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,he,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,N.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Ce(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(V){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,v);for(let ne=0;ne<6;ne++)if(v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)de(N.__webglFramebuffer[ne][Se],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Se);else de(N.__webglFramebuffer[ne],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ne=0,Se=Z.length;ne<Se;ne++){const ye=Z[ne],ee=n.get(ye);let he=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(he=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,ee.__webglTexture),Ue(he,ye),de(N.__webglFramebuffer,E,ye,i.COLOR_ATTACHMENT0+ne,he,0),m(ye)&&p(he)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ne=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,G.__webglTexture),Ue(ne,v),v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)de(N.__webglFramebuffer[Se],E,v,i.COLOR_ATTACHMENT0,ne,Se);else de(N.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,ne,0);m(v)&&p(ne),t.unbindTexture()}E.depthBuffer&&ze(E)}function tt(E){const v=E.textures;for(let N=0,G=v.length;N<G;N++){const Z=v[N];if(m(Z)){const V=T(E),be=n.get(Z).__webglTexture;t.bindTexture(V,be),p(V),t.unbindTexture()}}}const Le=[],we=[];function me(E){if(E.samples>0){if(xe(E)===!1){const v=E.textures,N=E.width,G=E.height;let Z=i.COLOR_BUFFER_BIT;const V=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(E),ne=v.length>1;if(ne)for(let ye=0;ye<v.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const Se=E.texture.mipmaps;Se&&Se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ye=0;ye<v.length;ye++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);const ee=n.get(v[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,N,G,0,0,N,G,Z,i.NEAREST),c===!0&&(Le.length=0,we.length=0,Le.push(i.COLOR_ATTACHMENT0+ye),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Le.push(V),we.push(V),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,we)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Le))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let ye=0;ye<v.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);const ee=n.get(v[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ct(E){return Math.min(s.maxSamples,E.samples)}function xe(E){const v=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Oe(E){const v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function St(E,v){const N=E.colorSpace,G=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==Wi&&N!==zn&&(qe.getTransfer(N)===Je?(G!==cn||Z!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}function mt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=H,this.rebindTextures=vt,this.setupRenderTarget=w,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=de,this.useMultisampledRTT=xe}function y0(i,e){function t(n,s=zn){let r;const a=qe.getTransfer(s);if(n===Rn)return i.UNSIGNED_BYTE;if(n===Vo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===kl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Hl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bl)return i.BYTE;if(n===zl)return i.SHORT;if(n===bs)return i.UNSIGNED_SHORT;if(n===Ho)return i.INT;if(n===ui)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Ns)return i.HALF_FLOAT;if(n===Vl)return i.ALPHA;if(n===Gl)return i.RGB;if(n===cn)return i.RGBA;if(n===As)return i.DEPTH_COMPONENT;if(n===ws)return i.DEPTH_STENCIL;if(n===Fs)return i.RED;if(n===Wo)return i.RED_INTEGER;if(n===Wl)return i.RG;if(n===Xo)return i.RG_INTEGER;if(n===qo)return i.RGBA_INTEGER;if(n===xr||n===Mr||n===Sr||n===yr)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qa||n===eo||n===to||n===no)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===so||n===ro)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===io||n===so)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ro)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ao||n===oo||n===co||n===lo||n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===_o||n===vo||n===xo||n===Mo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ao)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===co)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ho)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===po)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===go)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_o)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mo)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===yo||n===Eo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===So)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bo||n===To||n===Ao||n===wo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===bo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===To)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class T0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new au(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ht({vertexShader:E0,fragmentShader:b0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Tt(new Wr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A0 extends Ki{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new T0,p={},T=t.getContextAttributes();let b=null,M=null;const A=[],R=[],C=new Qe;let U=null;const y=new en;y.viewport=new gt;const S=new en;S.viewport=new gt;const P=[y,S],O=new Yf;let k=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let j=A[X];return j===void 0&&(j=new xa,A[X]=j),j.getTargetRaySpace()},this.getControllerGrip=function(X){let j=A[X];return j===void 0&&(j=new xa,A[X]=j),j.getGripSpace()},this.getHand=function(X){let j=A[X];return j===void 0&&(j=new xa,A[X]=j),j.getHandSpace()};function W(X){const j=R.indexOf(X.inputSource);if(j===-1)return;const de=A[j];de!==void 0&&(de.update(X.inputSource,X.frame,l||a),de.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",$);for(let X=0;X<A.length;X++){const j=R[X];j!==null&&(R[X]=null,A[X].disconnect(j))}k=null,K=null,m.reset();for(const X in p)delete p[X];e.setRenderTarget(b),d=null,h=null,f=null,s=null,M=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",q),s.addEventListener("inputsourceschange",$),T.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Ce=null,Me=null;T.depth&&(Me=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=T.stencil?ws:As,Ce=T.stencil?Ts:ui);const ze={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(ze),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new hi(h.textureWidth,h.textureHeight,{format:cn,type:Rn,depthTexture:new ru(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const de={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new hi(d.framebufferWidth,d.framebufferHeight,{format:cn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ge.setContext(s),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(X){for(let j=0;j<X.removed.length;j++){const de=X.removed[j],Ce=R.indexOf(de);Ce>=0&&(R[Ce]=null,A[Ce].disconnect(de))}for(let j=0;j<X.added.length;j++){const de=X.added[j];let Ce=R.indexOf(de);if(Ce===-1){for(let ze=0;ze<A.length;ze++)if(ze>=R.length){R.push(de),Ce=ze;break}else if(R[ze]===null){R[ze]=de,Ce=ze;break}if(Ce===-1)break}const Me=A[Ce];Me&&Me.connect(de)}}const H=new F,ae=new F;function oe(X,j,de){H.setFromMatrixPosition(j.matrixWorld),ae.setFromMatrixPosition(de.matrixWorld);const Ce=H.distanceTo(ae),Me=j.projectionMatrix.elements,ze=de.projectionMatrix.elements,vt=Me[14]/(Me[10]-1),w=Me[14]/(Me[10]+1),tt=(Me[9]+1)/Me[5],Le=(Me[9]-1)/Me[5],we=(Me[8]-1)/Me[0],me=(ze[8]+1)/ze[0],ct=vt*we,xe=vt*me,Oe=Ce/(-we+me),St=Oe*-we;if(j.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(St),X.translateZ(Oe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Me[10]===-1)X.projectionMatrix.copy(j.projectionMatrix),X.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const mt=vt+Oe,E=w+Oe,v=ct-St,N=xe+(Ce-St),G=tt*w/E*mt,Z=Le*w/E*mt;X.projectionMatrix.makePerspective(v,N,G,Z,mt,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ve(X,j){j===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(j.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let j=X.near,de=X.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(de=m.depthFar)),O.near=S.near=y.near=j,O.far=S.far=y.far=de,(k!==O.near||K!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,K=O.far),O.layers.mask=X.layers.mask|6,y.layers.mask=O.layers.mask&3,S.layers.mask=O.layers.mask&5;const Ce=X.parent,Me=O.cameras;ve(O,Ce);for(let ze=0;ze<Me.length;ze++)ve(Me[ze],Ce);Me.length===2?oe(O,y,S):O.projectionMatrix.copy(y.projectionMatrix),Ue(X,O,Ce)};function Ue(X,j,de){de===null?X.matrix.copy(j.matrixWorld):(X.matrix.copy(de.matrixWorld),X.matrix.invert(),X.matrix.multiply(j.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(j.projectionMatrix),X.projectionMatrixInverse.copy(j.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Rs*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(X){c=X,h!==null&&(h.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(X){return p[X]};let $e=null;function et(X,j){if(u=j.getViewerPose(l||a),g=j,u!==null){const de=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Ce=!1;de.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let w=0;w<de.length;w++){const tt=de[w];let Le=null;if(d!==null)Le=d.getViewport(tt);else{const me=f.getViewSubImage(h,tt);Le=me.viewport,w===0&&(e.setRenderTargetTextures(M,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(M))}let we=P[w];we===void 0&&(we=new en,we.layers.enable(w),we.viewport=new gt,P[w]=we),we.matrix.fromArray(tt.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(tt.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Le.x,Le.y,Le.width,Le.height),w===0&&(O.matrix.copy(we.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(we)}const Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const w=f.getDepthInformation(de[0]);w&&w.isValid&&w.texture&&m.init(w,s.renderState)}if(Me&&Me.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let w=0;w<de.length;w++){const tt=de[w].camera;if(tt){let Le=p[tt];Le||(Le=new au,p[tt]=Le);const we=f.getCameraImage(tt);Le.sourceTexture=we}}}}for(let de=0;de<A.length;de++){const Ce=R[de],Me=A[de];Ce!==null&&Me!==void 0&&Me.update(Ce,j,l||a)}$e&&$e(X,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const Ge=new ou;Ge.setAnimationLoop(et),this.setAnimationLoop=function(X){$e=X},this.dispose=function(){}}}const Jn=new Cn,w0=new ht;function R0(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ql(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,b,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,T,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ot&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ot&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),b=T.envMap,M=T.envMapRotation;b&&(m.envMap.value=b,Jn.copy(M),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),m.envMapRotation.value.setFromMatrix4(w0.makeRotationFromEuler(Jn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,T,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ot&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function C0(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,b){const M=b.program;n.uniformBlockBinding(T,M)}function l(T,b){let M=s[T.id];M===void 0&&(g(T),M=u(T),s[T.id]=M,T.addEventListener("dispose",m));const A=b.program;n.updateUBOMapping(T,A);const R=e.render.frame;r[T.id]!==R&&(h(T),r[T.id]=R)}function u(T){const b=f();T.__bindingPointIndex=b;const M=i.createBuffer(),A=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function f(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const b=s[T.id],M=T.uniforms,A=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let R=0,C=M.length;R<C;R++){const U=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,S=U.length;y<S;y++){const P=U[y];if(d(P,R,y,A)===!0){const O=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let K=0;for(let W=0;W<k.length;W++){const q=k[W],$=_(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,O+K,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,K),K+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(T,b,M,A){const R=T.value,C=b+"_"+M;if(A[C]===void 0)return typeof R=="number"||typeof R=="boolean"?A[C]=R:A[C]=R.clone(),!0;{const U=A[C];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return A[C]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function g(T){const b=T.uniforms;let M=0;const A=16;for(let C=0,U=b.length;C<U;C++){const y=Array.isArray(b[C])?b[C]:[b[C]];for(let S=0,P=y.length;S<P;S++){const O=y[S],k=Array.isArray(O.value)?O.value:[O.value];for(let K=0,W=k.length;K<W;K++){const q=k[K],$=_(q),H=M%A,ae=H%$.boundary,oe=H+ae;M+=ae,oe!==0&&A-oe<$.storage&&(M+=A-oe),O.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=$.storage}}}const R=M%A;return R>0&&(M+=A-R),T.__size=M,T.__cache={},this}function _(T){const b={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(b.boundary=4,b.storage=4):T.isVector2?(b.boundary=8,b.storage=8):T.isVector3||T.isColor?(b.boundary=16,b.storage=12):T.isVector4?(b.boundary=16,b.storage=16):T.isMatrix3?(b.boundary=48,b.storage=48):T.isMatrix4?(b.boundary=64,b.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),b}function m(T){const b=T.target;b.removeEventListener("dispose",m);const M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class P0{constructor(e={}){const{canvas:t=uf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const T=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let A=!1;this._outputColorSpace=Nt;let R=0,C=0,U=null,y=-1,S=null;const P=new gt,O=new gt;let k=null;const K=new Ye(0);let W=0,q=t.width,$=t.height,H=1,ae=null,oe=null;const ve=new gt(0,0,q,$),Ue=new gt(0,0,q,$);let $e=!1;const et=new iu;let Ge=!1,X=!1;const j=new ht,de=new F,Ce=new gt,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function vt(){return U===null?H:1}let w=n;function tt(x,L){return t.getContext(x,L)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ko}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",J,!1),w===null){const L="webgl2";if(w=tt(L,x),w===null)throw tt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Le,we,me,ct,xe,Oe,St,mt,E,v,N,G,Z,V,be,ne,Se,ye,ee,he,Pe,Ee,le,Ne;function D(){Le=new km(w),Le.init(),Ee=new y0(w,Le),we=new Im(w,Le,e,Ee),me=new M0(w,Le),we.reversedDepthBuffer&&h&&me.buffers.depth.setReversed(!0),ct=new Gm(w),xe=new o0,Oe=new S0(w,Le,me,xe,we,Ee,ct),St=new Nm(M),mt=new zm(M),E=new jf(w),le=new Dm(w,E),v=new Hm(w,E,ct,le),N=new Xm(w,v,E,ct),ee=new Wm(w,we,Oe),ne=new Um(xe),G=new a0(M,St,mt,Le,we,le,ne),Z=new R0(M,xe),V=new l0,be=new m0(Le),ye=new Pm(M,St,mt,me,N,d,c),Se=new v0(M,N,we),Ne=new C0(w,ct,we,me),he=new Lm(w,Le,ct),Pe=new Vm(w,Le,ct),ct.programs=G.programs,M.capabilities=we,M.extensions=Le,M.properties=xe,M.renderLists=V,M.shadowMap=Se,M.state=me,M.info=ct}D();const te=new A0(M,w);this.xr=te,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const x=Le.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Le.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(q,$,!1))},this.getSize=function(x){return x.set(q,$)},this.setSize=function(x,L,B=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=x,$=L,t.width=Math.floor(x*H),t.height=Math.floor(L*H),B===!0&&(t.style.width=x+"px",t.style.height=L+"px"),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(q*H,$*H).floor()},this.setDrawingBufferSize=function(x,L,B){q=x,$=L,H=B,t.width=Math.floor(x*B),t.height=Math.floor(L*B),this.setViewport(0,0,x,L)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(ve)},this.setViewport=function(x,L,B,z){x.isVector4?ve.set(x.x,x.y,x.z,x.w):ve.set(x,L,B,z),me.viewport(P.copy(ve).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(Ue)},this.setScissor=function(x,L,B,z){x.isVector4?Ue.set(x.x,x.y,x.z,x.w):Ue.set(x,L,B,z),me.scissor(O.copy(Ue).multiplyScalar(H).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(x){me.setScissorTest($e=x)},this.setOpaqueSort=function(x){ae=x},this.setTransparentSort=function(x){oe=x},this.getClearColor=function(x){return x.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(x=!0,L=!0,B=!0){let z=0;if(x){let I=!1;if(U!==null){const Q=U.texture.format;I=Q===qo||Q===Xo||Q===Wo}if(I){const Q=U.texture.type,ue=Q===Rn||Q===ui||Q===bs||Q===Ts||Q===Vo||Q===Go,ge=ye.getClearColor(),fe=ye.getClearAlpha(),Re=ge.r,De=ge.g,Te=ge.b;ue?(g[0]=Re,g[1]=De,g[2]=Te,g[3]=fe,w.clearBufferuiv(w.COLOR,0,g)):(_[0]=Re,_[1]=De,_[2]=Te,_[3]=fe,w.clearBufferiv(w.COLOR,0,_))}else z|=w.COLOR_BUFFER_BIT}L&&(z|=w.DEPTH_BUFFER_BIT),B&&(z|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",J,!1),ye.dispose(),V.dispose(),be.dispose(),xe.dispose(),St.dispose(),mt.dispose(),N.dispose(),le.dispose(),Ne.dispose(),G.dispose(),te.dispose(),te.removeEventListener("sessionstart",un),te.removeEventListener("sessionend",sc),Xn.stop()};function se(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const x=ct.autoReset,L=Se.enabled,B=Se.autoUpdate,z=Se.needsUpdate,I=Se.type;D(),ct.autoReset=x,Se.enabled=L,Se.autoUpdate=B,Se.needsUpdate=z,Se.type=I}function J(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Y(x){const L=x.target;L.removeEventListener("dispose",Y),_e(L)}function _e(x){Ie(x),xe.remove(x)}function Ie(x){const L=xe.get(x).programs;L!==void 0&&(L.forEach(function(B){G.releaseProgram(B)}),x.isShaderMaterial&&G.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,B,z,I,Q){L===null&&(L=Me);const ue=I.isMesh&&I.matrixWorld.determinant()<0,ge=Pu(x,L,B,z,I);me.setMaterial(z,ue);let fe=B.index,Re=1;if(z.wireframe===!0){if(fe=v.getWireframeAttribute(B),fe===void 0)return;Re=2}const De=B.drawRange,Te=B.attributes.position;let He=De.start*Re,Ze=(De.start+De.count)*Re;Q!==null&&(He=Math.max(He,Q.start*Re),Ze=Math.min(Ze,(Q.start+Q.count)*Re)),fe!==null?(He=Math.max(He,0),Ze=Math.min(Ze,fe.count)):Te!=null&&(He=Math.max(He,0),Ze=Math.min(Ze,Te.count));const ft=Ze-He;if(ft<0||ft===1/0)return;le.setup(I,z,ge,B,fe);let at,nt=he;if(fe!==null&&(at=E.get(fe),nt=Pe,nt.setIndex(at)),I.isMesh)z.wireframe===!0?(me.setLineWidth(z.wireframeLinewidth*vt()),nt.setMode(w.LINES)):nt.setMode(w.TRIANGLES);else if(I.isLine){let Ae=z.linewidth;Ae===void 0&&(Ae=1),me.setLineWidth(Ae*vt()),I.isLineSegments?nt.setMode(w.LINES):I.isLineLoop?nt.setMode(w.LINE_LOOP):nt.setMode(w.LINE_STRIP)}else I.isPoints?nt.setMode(w.POINTS):I.isSprite&&nt.setMode(w.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)Cs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Le.get("WEBGL_multi_draw"))nt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Ae=I._multiDrawStarts,lt=I._multiDrawCounts,We=I._multiDrawCount,Gt=fe?E.get(fe).bytesPerElement:1,gi=xe.get(z).currentProgram.getUniforms();for(let Wt=0;Wt<We;Wt++)gi.setValue(w,"_gl_DrawID",Wt),nt.render(Ae[Wt]/Gt,lt[Wt])}else if(I.isInstancedMesh)nt.renderInstances(He,ft,I.count);else if(B.isInstancedBufferGeometry){const Ae=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,lt=Math.min(B.instanceCount,Ae);nt.renderInstances(He,ft,lt)}else nt.render(He,ft)};function st(x,L,B){x.transparent===!0&&x.side===on&&x.forceSinglePass===!1?(x.side=Ot,x.needsUpdate=!0,Hs(x,L,B),x.side=Gn,x.needsUpdate=!0,Hs(x,L,B),x.side=on):Hs(x,L,B)}this.compile=function(x,L,B=null){B===null&&(B=x),p=be.get(B),p.init(L),b.push(p),B.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),x!==B&&x.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights();const z=new Set;return x.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const Q=I.material;if(Q)if(Array.isArray(Q))for(let ue=0;ue<Q.length;ue++){const ge=Q[ue];st(ge,B,I),z.add(ge)}else st(Q,B,I),z.add(Q)}),p=b.pop(),z},this.compileAsync=function(x,L,B=null){const z=this.compile(x,L,B);return new Promise(I=>{function Q(){if(z.forEach(function(ue){xe.get(ue).currentProgram.isReady()&&z.delete(ue)}),z.size===0){I(x);return}setTimeout(Q,10)}Le.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ke=null;function xn(x){Ke&&Ke(x)}function un(){Xn.stop()}function sc(){Xn.start()}const Xn=new ou;Xn.setAnimationLoop(xn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(x){Ke=x,te.setAnimationLoop(x),x===null?Xn.stop():Xn.start()},te.addEventListener("sessionstart",un),te.addEventListener("sessionend",sc),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(L),L=te.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,L,U),p=be.get(x,b.length),p.init(L),b.push(p),j.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),et.setFromProjectionMatrix(j,gn,L.reversedDepth),X=this.localClippingEnabled,Ge=ne.init(this.clippingPlanes,X),m=V.get(x,T.length),m.init(),T.push(m),te.enabled===!0&&te.isPresenting===!0){const Q=M.xr.getDepthSensingMesh();Q!==null&&$r(Q,L,-1/0,M.sortObjects)}$r(x,L,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(ae,oe),ze=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,ze&&ye.addToRenderList(m,x),this.info.render.frame++,Ge===!0&&ne.beginShadows();const B=p.state.shadowsArray;Se.render(B,x,L),Ge===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,I=m.transmissive;if(p.setupLights(),L.isArrayCamera){const Q=L.cameras;if(I.length>0)for(let ue=0,ge=Q.length;ue<ge;ue++){const fe=Q[ue];ac(z,I,x,fe)}ze&&ye.render(x);for(let ue=0,ge=Q.length;ue<ge;ue++){const fe=Q[ue];rc(m,x,fe,fe.viewport)}}else I.length>0&&ac(z,I,x,L),ze&&ye.render(x),rc(m,x,L);U!==null&&C===0&&(Oe.updateMultisampleRenderTarget(U),Oe.updateRenderTargetMipmap(U)),x.isScene===!0&&x.onAfterRender(M,x,L),le.resetDefaultState(),y=-1,S=null,b.pop(),b.length>0?(p=b[b.length-1],Ge===!0&&ne.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function $r(x,L,B,z){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)B=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||et.intersectsSprite(x)){z&&Ce.setFromMatrixPosition(x.matrixWorld).applyMatrix4(j);const ue=N.update(x),ge=x.material;ge.visible&&m.push(x,ue,ge,B,Ce.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||et.intersectsObject(x))){const ue=N.update(x),ge=x.material;if(z&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ce.copy(x.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Ce.copy(ue.boundingSphere.center)),Ce.applyMatrix4(x.matrixWorld).applyMatrix4(j)),Array.isArray(ge)){const fe=ue.groups;for(let Re=0,De=fe.length;Re<De;Re++){const Te=fe[Re],He=ge[Te.materialIndex];He&&He.visible&&m.push(x,ue,He,B,Ce.z,Te)}}else ge.visible&&m.push(x,ue,ge,B,Ce.z,null)}}const Q=x.children;for(let ue=0,ge=Q.length;ue<ge;ue++)$r(Q[ue],L,B,z)}function rc(x,L,B,z){const I=x.opaque,Q=x.transmissive,ue=x.transparent;p.setupLightsView(B),Ge===!0&&ne.setGlobalState(M.clippingPlanes,B),z&&me.viewport(P.copy(z)),I.length>0&&ks(I,L,B),Q.length>0&&ks(Q,L,B),ue.length>0&&ks(ue,L,B),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function ac(x,L,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new hi(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")||Le.has("EXT_color_buffer_float")?Ns:Rn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const Q=p.state.transmissionRenderTarget[z.id],ue=z.viewport||P;Q.setSize(ue.z*M.transmissionResolutionScale,ue.w*M.transmissionResolutionScale);const ge=M.getRenderTarget(),fe=M.getActiveCubeFace(),Re=M.getActiveMipmapLevel();M.setRenderTarget(Q),M.getClearColor(K),W=M.getClearAlpha(),W<1&&M.setClearColor(16777215,.5),M.clear(),ze&&ye.render(B);const De=M.toneMapping;M.toneMapping=An;const Te=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Ge===!0&&ne.setGlobalState(M.clippingPlanes,z),ks(x,B,z),Oe.updateMultisampleRenderTarget(Q),Oe.updateRenderTargetMipmap(Q),Le.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Ze=0,ft=L.length;Ze<ft;Ze++){const at=L[Ze],nt=at.object,Ae=at.geometry,lt=at.material,We=at.group;if(lt.side===on&&nt.layers.test(z.layers)){const Gt=lt.side;lt.side=Ot,lt.needsUpdate=!0,oc(nt,B,z,Ae,lt,We),lt.side=Gt,lt.needsUpdate=!0,He=!0}}He===!0&&(Oe.updateMultisampleRenderTarget(Q),Oe.updateRenderTargetMipmap(Q))}M.setRenderTarget(ge,fe,Re),M.setClearColor(K,W),Te!==void 0&&(z.viewport=Te),M.toneMapping=De}function ks(x,L,B){const z=L.isScene===!0?L.overrideMaterial:null;for(let I=0,Q=x.length;I<Q;I++){const ue=x[I],ge=ue.object,fe=ue.geometry,Re=ue.group;let De=ue.material;De.allowOverride===!0&&z!==null&&(De=z),ge.layers.test(B.layers)&&oc(ge,L,B,fe,De,Re)}}function oc(x,L,B,z,I,Q){x.onBeforeRender(M,L,B,z,I,Q),x.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),I.onBeforeRender(M,L,B,z,x,Q),I.transparent===!0&&I.side===on&&I.forceSinglePass===!1?(I.side=Ot,I.needsUpdate=!0,M.renderBufferDirect(B,L,z,I,x,Q),I.side=Gn,I.needsUpdate=!0,M.renderBufferDirect(B,L,z,I,x,Q),I.side=on):M.renderBufferDirect(B,L,z,I,x,Q),x.onAfterRender(M,L,B,z,I,Q)}function Hs(x,L,B){L.isScene!==!0&&(L=Me);const z=xe.get(x),I=p.state.lights,Q=p.state.shadowsArray,ue=I.state.version,ge=G.getParameters(x,I.state,Q,L,B),fe=G.getProgramCacheKey(ge);let Re=z.programs;z.environment=x.isMeshStandardMaterial?L.environment:null,z.fog=L.fog,z.envMap=(x.isMeshStandardMaterial?mt:St).get(x.envMap||z.environment),z.envMapRotation=z.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,Re===void 0&&(x.addEventListener("dispose",Y),Re=new Map,z.programs=Re);let De=Re.get(fe);if(De!==void 0){if(z.currentProgram===De&&z.lightsStateVersion===ue)return lc(x,ge),De}else ge.uniforms=G.getUniforms(x),x.onBeforeCompile(ge,M),De=G.acquireProgram(ge,fe),Re.set(fe,De),z.uniforms=ge.uniforms;const Te=z.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Te.clippingPlanes=ne.uniform),lc(x,ge),z.needsLights=Lu(x),z.lightsStateVersion=ue,z.needsLights&&(Te.ambientLightColor.value=I.state.ambient,Te.lightProbe.value=I.state.probe,Te.directionalLights.value=I.state.directional,Te.directionalLightShadows.value=I.state.directionalShadow,Te.spotLights.value=I.state.spot,Te.spotLightShadows.value=I.state.spotShadow,Te.rectAreaLights.value=I.state.rectArea,Te.ltc_1.value=I.state.rectAreaLTC1,Te.ltc_2.value=I.state.rectAreaLTC2,Te.pointLights.value=I.state.point,Te.pointLightShadows.value=I.state.pointShadow,Te.hemisphereLights.value=I.state.hemi,Te.directionalShadowMap.value=I.state.directionalShadowMap,Te.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Te.spotShadowMap.value=I.state.spotShadowMap,Te.spotLightMatrix.value=I.state.spotLightMatrix,Te.spotLightMap.value=I.state.spotLightMap,Te.pointShadowMap.value=I.state.pointShadowMap,Te.pointShadowMatrix.value=I.state.pointShadowMatrix),z.currentProgram=De,z.uniformsList=null,De}function cc(x){if(x.uniformsList===null){const L=x.currentProgram.getUniforms();x.uniformsList=Er.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function lc(x,L){const B=xe.get(x);B.outputColorSpace=L.outputColorSpace,B.batching=L.batching,B.batchingColor=L.batchingColor,B.instancing=L.instancing,B.instancingColor=L.instancingColor,B.instancingMorph=L.instancingMorph,B.skinning=L.skinning,B.morphTargets=L.morphTargets,B.morphNormals=L.morphNormals,B.morphColors=L.morphColors,B.morphTargetsCount=L.morphTargetsCount,B.numClippingPlanes=L.numClippingPlanes,B.numIntersection=L.numClipIntersection,B.vertexAlphas=L.vertexAlphas,B.vertexTangents=L.vertexTangents,B.toneMapping=L.toneMapping}function Pu(x,L,B,z,I){L.isScene!==!0&&(L=Me),Oe.resetTextureUnits();const Q=L.fog,ue=z.isMeshStandardMaterial?L.environment:null,ge=U===null?M.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Wi,fe=(z.isMeshStandardMaterial?mt:St).get(z.envMap||ue),Re=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,De=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Te=!!B.morphAttributes.position,He=!!B.morphAttributes.normal,Ze=!!B.morphAttributes.color;let ft=An;z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ft=M.toneMapping);const at=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,nt=at!==void 0?at.length:0,Ae=xe.get(z),lt=p.state.lights;if(Ge===!0&&(X===!0||x!==S)){const Dt=x===S&&z.id===y;ne.setState(z,x,Dt)}let We=!1;z.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==lt.state.version||Ae.outputColorSpace!==ge||I.isBatchedMesh&&Ae.batching===!1||!I.isBatchedMesh&&Ae.batching===!0||I.isBatchedMesh&&Ae.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Ae.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Ae.instancing===!1||!I.isInstancedMesh&&Ae.instancing===!0||I.isSkinnedMesh&&Ae.skinning===!1||!I.isSkinnedMesh&&Ae.skinning===!0||I.isInstancedMesh&&Ae.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Ae.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Ae.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Ae.instancingMorph===!1&&I.morphTexture!==null||Ae.envMap!==fe||z.fog===!0&&Ae.fog!==Q||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ne.numPlanes||Ae.numIntersection!==ne.numIntersection)||Ae.vertexAlphas!==Re||Ae.vertexTangents!==De||Ae.morphTargets!==Te||Ae.morphNormals!==He||Ae.morphColors!==Ze||Ae.toneMapping!==ft||Ae.morphTargetsCount!==nt)&&(We=!0):(We=!0,Ae.__version=z.version);let Gt=Ae.currentProgram;We===!0&&(Gt=Hs(z,L,I));let gi=!1,Wt=!1,es=!1;const ut=Gt.getUniforms(),$t=Ae.uniforms;if(me.useProgram(Gt.program)&&(gi=!0,Wt=!0,es=!0),z.id!==y&&(y=z.id,Wt=!0),gi||S!==x){me.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ut.setValue(w,"projectionMatrix",x.projectionMatrix),ut.setValue(w,"viewMatrix",x.matrixWorldInverse);const zt=ut.map.cameraPosition;zt!==void 0&&zt.setValue(w,de.setFromMatrixPosition(x.matrixWorld)),we.logarithmicDepthBuffer&&ut.setValue(w,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ut.setValue(w,"isOrthographic",x.isOrthographicCamera===!0),S!==x&&(S=x,Wt=!0,es=!0)}if(I.isSkinnedMesh){ut.setOptional(w,I,"bindMatrix"),ut.setOptional(w,I,"bindMatrixInverse");const Dt=I.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),ut.setValue(w,"boneTexture",Dt.boneTexture,Oe))}I.isBatchedMesh&&(ut.setOptional(w,I,"batchingTexture"),ut.setValue(w,"batchingTexture",I._matricesTexture,Oe),ut.setOptional(w,I,"batchingIdTexture"),ut.setValue(w,"batchingIdTexture",I._indirectTexture,Oe),ut.setOptional(w,I,"batchingColorTexture"),I._colorsTexture!==null&&ut.setValue(w,"batchingColorTexture",I._colorsTexture,Oe));const Zt=B.morphAttributes;if((Zt.position!==void 0||Zt.normal!==void 0||Zt.color!==void 0)&&ee.update(I,B,Gt),(Wt||Ae.receiveShadow!==I.receiveShadow)&&(Ae.receiveShadow=I.receiveShadow,ut.setValue(w,"receiveShadow",I.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&($t.envMap.value=fe,$t.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&L.environment!==null&&($t.envMapIntensity.value=L.environmentIntensity),Wt&&(ut.setValue(w,"toneMappingExposure",M.toneMappingExposure),Ae.needsLights&&Du($t,es),Q&&z.fog===!0&&Z.refreshFogUniforms($t,Q),Z.refreshMaterialUniforms($t,z,H,$,p.state.transmissionRenderTarget[x.id]),Er.upload(w,cc(Ae),$t,Oe)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Er.upload(w,cc(Ae),$t,Oe),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ut.setValue(w,"center",I.center),ut.setValue(w,"modelViewMatrix",I.modelViewMatrix),ut.setValue(w,"normalMatrix",I.normalMatrix),ut.setValue(w,"modelMatrix",I.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Dt=z.uniformsGroups;for(let zt=0,Zr=Dt.length;zt<Zr;zt++){const qn=Dt[zt];Ne.update(qn,Gt),Ne.bind(qn,Gt)}}return Gt}function Du(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Lu(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(x,L,B){const z=xe.get(x);z.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),xe.get(x.texture).__webglTexture=L,xe.get(x.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,L){const B=xe.get(x);B.__webglFramebuffer=L,B.__useDefaultFramebuffer=L===void 0};const Iu=w.createFramebuffer();this.setRenderTarget=function(x,L=0,B=0){U=x,R=L,C=B;let z=!0,I=null,Q=!1,ue=!1;if(x){const fe=xe.get(x);if(fe.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(w.FRAMEBUFFER,null),z=!1;else if(fe.__webglFramebuffer===void 0)Oe.setupRenderTarget(x);else if(fe.__hasExternalTextures)Oe.rebindTextures(x,xe.get(x.texture).__webglTexture,xe.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Te=x.depthTexture;if(fe.__boundDepthTexture!==Te){if(Te!==null&&xe.has(Te)&&(x.width!==Te.image.width||x.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Oe.setupDepthRenderbuffer(x)}}const Re=x.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ue=!0);const De=xe.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(De[L])?I=De[L][B]:I=De[L],Q=!0):x.samples>0&&Oe.useMultisampledRTT(x)===!1?I=xe.get(x).__webglMultisampledFramebuffer:Array.isArray(De)?I=De[B]:I=De,P.copy(x.viewport),O.copy(x.scissor),k=x.scissorTest}else P.copy(ve).multiplyScalar(H).floor(),O.copy(Ue).multiplyScalar(H).floor(),k=$e;if(B!==0&&(I=Iu),me.bindFramebuffer(w.FRAMEBUFFER,I)&&z&&me.drawBuffers(x,I),me.viewport(P),me.scissor(O),me.setScissorTest(k),Q){const fe=xe.get(x.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+L,fe.__webglTexture,B)}else if(ue){const fe=L;for(let Re=0;Re<x.textures.length;Re++){const De=xe.get(x.textures[Re]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Re,De.__webglTexture,B,fe)}}else if(x!==null&&B!==0){const fe=xe.get(x.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,fe.__webglTexture,B)}y=-1},this.readRenderTargetPixels=function(x,L,B,z,I,Q,ue,ge=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=xe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){me.bindFramebuffer(w.FRAMEBUFFER,fe);try{const Re=x.textures[ge],De=Re.format,Te=Re.type;if(!we.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!we.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-z&&B>=0&&B<=x.height-I&&(x.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ge),w.readPixels(L,B,z,I,Ee.convert(De),Ee.convert(Te),Q))}finally{const Re=U!==null?xe.get(U).__webglFramebuffer:null;me.bindFramebuffer(w.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(x,L,B,z,I,Q,ue,ge=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=xe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(L>=0&&L<=x.width-z&&B>=0&&B<=x.height-I){me.bindFramebuffer(w.FRAMEBUFFER,fe);const Re=x.textures[ge],De=Re.format,Te=Re.type;if(!we.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const He=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,He),w.bufferData(w.PIXEL_PACK_BUFFER,Q.byteLength,w.STREAM_READ),x.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ge),w.readPixels(L,B,z,I,Ee.convert(De),Ee.convert(Te),0);const Ze=U!==null?xe.get(U).__webglFramebuffer:null;me.bindFramebuffer(w.FRAMEBUFFER,Ze);const ft=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await hf(w,ft,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,He),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,Q),w.deleteBuffer(He),w.deleteSync(ft),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,L=null,B=0){const z=Math.pow(2,-B),I=Math.floor(x.image.width*z),Q=Math.floor(x.image.height*z),ue=L!==null?L.x:0,ge=L!==null?L.y:0;Oe.setTexture2D(x,0),w.copyTexSubImage2D(w.TEXTURE_2D,B,0,0,ue,ge,I,Q),me.unbindTexture()};const Uu=w.createFramebuffer(),Nu=w.createFramebuffer();this.copyTextureToTexture=function(x,L,B=null,z=null,I=0,Q=null){Q===null&&(I!==0?(Cs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=I,I=0):Q=0);let ue,ge,fe,Re,De,Te,He,Ze,ft;const at=x.isCompressedTexture?x.mipmaps[Q]:x.image;if(B!==null)ue=B.max.x-B.min.x,ge=B.max.y-B.min.y,fe=B.isBox3?B.max.z-B.min.z:1,Re=B.min.x,De=B.min.y,Te=B.isBox3?B.min.z:0;else{const Zt=Math.pow(2,-I);ue=Math.floor(at.width*Zt),ge=Math.floor(at.height*Zt),x.isDataArrayTexture?fe=at.depth:x.isData3DTexture?fe=Math.floor(at.depth*Zt):fe=1,Re=0,De=0,Te=0}z!==null?(He=z.x,Ze=z.y,ft=z.z):(He=0,Ze=0,ft=0);const nt=Ee.convert(L.format),Ae=Ee.convert(L.type);let lt;L.isData3DTexture?(Oe.setTexture3D(L,0),lt=w.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Oe.setTexture2DArray(L,0),lt=w.TEXTURE_2D_ARRAY):(Oe.setTexture2D(L,0),lt=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,L.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,L.unpackAlignment);const We=w.getParameter(w.UNPACK_ROW_LENGTH),Gt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),gi=w.getParameter(w.UNPACK_SKIP_PIXELS),Wt=w.getParameter(w.UNPACK_SKIP_ROWS),es=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,at.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,at.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Re),w.pixelStorei(w.UNPACK_SKIP_ROWS,De),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Te);const ut=x.isDataArrayTexture||x.isData3DTexture,$t=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){const Zt=xe.get(x),Dt=xe.get(L),zt=xe.get(Zt.__renderTarget),Zr=xe.get(Dt.__renderTarget);me.bindFramebuffer(w.READ_FRAMEBUFFER,zt.__webglFramebuffer),me.bindFramebuffer(w.DRAW_FRAMEBUFFER,Zr.__webglFramebuffer);for(let qn=0;qn<fe;qn++)ut&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xe.get(x).__webglTexture,I,Te+qn),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xe.get(L).__webglTexture,Q,ft+qn)),w.blitFramebuffer(Re,De,ue,ge,He,Ze,ue,ge,w.DEPTH_BUFFER_BIT,w.NEAREST);me.bindFramebuffer(w.READ_FRAMEBUFFER,null),me.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(I!==0||x.isRenderTargetTexture||xe.has(x)){const Zt=xe.get(x),Dt=xe.get(L);me.bindFramebuffer(w.READ_FRAMEBUFFER,Uu),me.bindFramebuffer(w.DRAW_FRAMEBUFFER,Nu);for(let zt=0;zt<fe;zt++)ut?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Zt.__webglTexture,I,Te+zt):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Zt.__webglTexture,I),$t?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Dt.__webglTexture,Q,ft+zt):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Dt.__webglTexture,Q),I!==0?w.blitFramebuffer(Re,De,ue,ge,He,Ze,ue,ge,w.COLOR_BUFFER_BIT,w.NEAREST):$t?w.copyTexSubImage3D(lt,Q,He,Ze,ft+zt,Re,De,ue,ge):w.copyTexSubImage2D(lt,Q,He,Ze,Re,De,ue,ge);me.bindFramebuffer(w.READ_FRAMEBUFFER,null),me.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else $t?x.isDataTexture||x.isData3DTexture?w.texSubImage3D(lt,Q,He,Ze,ft,ue,ge,fe,nt,Ae,at.data):L.isCompressedArrayTexture?w.compressedTexSubImage3D(lt,Q,He,Ze,ft,ue,ge,fe,nt,at.data):w.texSubImage3D(lt,Q,He,Ze,ft,ue,ge,fe,nt,Ae,at):x.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,Q,He,Ze,ue,ge,nt,Ae,at.data):x.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,Q,He,Ze,at.width,at.height,nt,at.data):w.texSubImage2D(w.TEXTURE_2D,Q,He,Ze,ue,ge,nt,Ae,at);w.pixelStorei(w.UNPACK_ROW_LENGTH,We),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Gt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,gi),w.pixelStorei(w.UNPACK_SKIP_ROWS,Wt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,es),Q===0&&L.generateMipmaps&&w.generateMipmap(lt),me.unbindTexture()},this.initRenderTarget=function(x){xe.get(x).__webglFramebuffer===void 0&&Oe.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Oe.setTextureCube(x,0):x.isData3DTexture?Oe.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Oe.setTexture2DArray(x,0):Oe.setTexture2D(x,0),me.unbindTexture()},this.resetState=function(){R=0,C=0,U=null,me.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const oi=64,Ft=32,Nr=16,Ps=8,si=oi*Ps,Co=18,fu=19,du=39;function pu(i,e,t=0,n=0,s="y",r=0){return i===1?e>0?[0,20,21][r]:e<0?[2,24,25][r]:[1,22,23][r]:i===2?[2,24,25][r]:i===3?[3,26,27][r]:i===5?(s==="x"?t:s==="z"?n:e)!==0?6:5:i===21?e>0?28:e<0?8:n===1?30:29:i===22?e>0?31:e<0?8:n===1?33:32:i===23?34:i===25?e===0?35:36:i===26?e===0?38:37:[0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][i]??3}function Zo(i,e,t){return[(i%Ps*oi+Nr+.12+e*(Ft-.24))/si,(Math.floor(i/Ps)*oi+Nr+.12+t*(Ft-.24))/si]}const hn=(i,e)=>(i%e+e)%e;function D0(i,e,t){const n=i;i>=20&&i<=27&&(i=[0,0,1,1,2,2,3,3][i-20],e=hn(e+(n&1?9:17),Ft),i!==1&&(t=hn(t+(n&1?13:7),Ft)));const s=rt(e,t,i*877),r=rt(Math.floor((e+3)/3),Math.floor(t/2),i*571);let a=0,o=255,c=(s-.5)*10+(r-.5)*8;const l=()=>{const h=hn(e+Math.floor(t/3)*3,9);a=r>.77?9877350:r<.19?7509594:8628059,(h<2&&t%4===1&&r>.45||s>.981)&&(a=11127158),h===3&&t%4===0&&(c-=9)},u=()=>{a=r>.82?11305046:r<.19?8938310:10056014,s>.966&&(a=13015659),e%9===Math.floor(t/3)%7&&(t+1)%5<3&&(c+=13)},f=()=>{const h=hn(2*e+t+Math.floor(t/4)*2,41);a=r>.72?10659488:r<.22?9608346:10199967,h<2&&r>.35&&(c-=19),h===2&&r>.47&&(c+=7),s>.95&&(c+=12)};switch(i){case 0:l();break;case 1:{const h=4+Math.floor(rt(Math.floor(e/2),0,31)*4);t>=Ft-h?(l(),t===Ft-h&&(c-=17)):(u(),t===Ft-h-1&&(c-=14));break}case 2:u();break;case 3:f();break;case 4:{a=14993811,hn(e+Math.floor(t*.6)+Math.floor(t/5)*2,17)<2&&t%4<2&&(c+=11),s>.93&&(a=12888951);break}case 5:{const h=hn(e+Math.round(Math.sin(t*.25+e*.26)*1.5),7);a=h===0?6310195:h<3?7888964:h===3?10848859:9530953,Math.abs(e-17)+Math.abs(t-8)*.65<2&&(a=5981238);break}case 6:{const h=Math.abs(e-15),d=Math.abs(t-16),g=Math.max(h*.98,d)+.2*Math.min(h,d);a=Math.min(e,t,31-e,31-t)<2?7886910:Math.floor(g)%4===0?11962711:14727035,e>19&&t===16-Math.floor((e-18)/3)&&(a=9792837);break}case 7:{const h=rt(Math.floor(e/3),Math.floor((t+Math.floor(e/5))/2),931);a=h<.16?3373399:h<.42?5411918:h<.73?7120712:9158230,h>.82&&t%3===1&&(a=10602602),h<.16&&s<.3&&(o=0);break}case 8:{const h=Math.floor(t/8),d=hn(e+(h%2?16:0),32);a=t%8===0||d===0?9726792:t%8===7?14859649:13476203,t%8===3&&(Math.floor(e/4)+h)%3!==0&&(c-=9),d===2&&t%8===2&&(a=8021330);break}case 9:{const h=Math.floor(t/7),d=hn(e+h*5+(t%7<2?1:0),12);a=t%7===0||d===0?6846062:t%7===1||d===1?11843234:9739921;break}case 10:{const h=hn(e+Math.floor(t/8)%2*8,16);a=t%8===0||h===0?6649716:t%8===7||h===1?11647146:9149848;break}case 11:{const h=e===0||t===0||e===Ft-1||t===Ft-1,d=(e+t===22||e+t===25)&&e>4&&e<16;a=h?9161673:d?14811125:11328980,o=h?182:d?175:49,c=0;break}case 12:{f();for(const[h,d,g]of[[5,6,3],[16,13,4],[10,20,2],[21,3,2]])Math.abs(e-h)+Math.abs(t-d)*.85<g&&(a=t>d?5857630:4080708);break}case 13:{const h=Math.min(e,t,31-e,31-t),d=Math.abs(e-15.5)+Math.abs(t-15.5);a=h<2?5400165:h<4?12294239:Math.abs(d-13)<1.3?11503958:d<8?16771489:16041065;break}case 14:a=4365994,c=(r-.5)*3,(t===6||t===17)&&hn(e+2*t,19)<5&&(c+=9),o=163;break;case 15:a=r>.62?6649201:4741462;break;case 16:a=16777215,c=0;break;case Co:case fu:{o=0,a=6393927;for(const[h,d,g]of[[3,12,-2],[8,19,3],[15,10,2],[21,15,-3],[26,7,1]]){const _=h+Math.round(g*t/d);if(t<=d&&e===_&&(o=255,a=t<=2?5472834:7971660),i===Co&&(h===8||h===21)){const m=Math.abs(e-(h+g))+Math.abs(t-(d+1));m<=2&&(o=255,a=m===0?15049005:h===8?16113574:15971143)}}break}case 28:case 29:case 30:{const h=Math.min(e,31-e);a=h<3||t<3||t>28?7755322:t%8===0?10186823:12819559,i===28?(e>4&&e<27&&t>4&&t<26&&(a=5599084),e>6&&e<25&&t>6&&t<24&&(e%5===2||t%5===2)&&(a=9018246),t>20&&t<23&&e>9&&e<25&&(a=14991218)):i===30?(t>12&&t<23&&e>4&&e<27&&(a=t===13||e===5?6244407:11240021),t===18&&e>12&&e<20&&(a=15780477),t<10&&h>5&&(a=5458749)):t<10&&h>4&&(a=6838334);break}case 31:case 32:case 33:{const h=e<4||e>27||t<3||t>28;a=h?5269096:t%8===2?9003332:12224336,e%24===3&&h&&t%8===4&&(a=12368525),i!==31&&t===20&&(a=5259060),i===33&&e>=13&&e<=18&&t>=13&&t<=22&&(a=e===13||t===22?16044424:11897414),i===33&&Math.abs(e-15.5)<1.5&&t>=15&&t<=17&&(a=6050110);break}case 34:{f();for(const[h,d,g]of[[8,12,6],[21,23,6],[24,6,3],[4,27,3]]){const _=Math.abs(e-h)*1.55+Math.abs(t-d);_<g+1.6&&(a=5663603),_<g&&(a=e<h?10216919:e===h?14614512:5283759)}break}case 35:case 36:{const h=Math.min(e,t,31-e,31-t),d=Math.abs(e-15.5)+Math.abs(t-15.5);a=h<2?3823198:h<4?12752741:h===4?4094079:7784898,h>5&&(a=d<7?15007729:d<12?11727321:Math.abs(e-15.5)<2||Math.abs(t-15.5)<2?5807259:8836557);break}case 37:case 38:{const h=Math.min(e,t,31-e,31-t),d=Math.abs(e-15.5)+Math.abs(t-15.5);a=h<1?5006441:h<3?8886418:7439751,i===37&&Math.abs(d-13)<2.1&&(a=13675380),i===37&&d<6&&(a=e<15?10999229:7584945),i===38&&(t===8||t===23)&&(a=12755305);break}default:a=9936274}return[(a>>>16&255)+c,(a>>>8&255)+c,(a&255)+c,o]}function L0(){const i=new Uint8ClampedArray(si*si*4),e=new Uint8ClampedArray(Ft*Ft*4);for(let n=0;n<du;n++){for(let s=0;s<Ft;s++)for(let r=0;r<Ft;r++)e.set(D0(n,r,s),(r+Ft*s)*4);for(let s=0;s<oi;s++)for(let r=0;r<oi;r++){const a=n%Ps*oi+r,o=Math.floor(n/Ps)*oi+s,c=(Math.min(31,Math.max(0,r-Nr))+Ft*Math.min(31,Math.max(0,s-Nr)))*4;for(let l=0;l<4;l++)i[(a+si*o)*4+l]=e[c+l]}}const t=new Gr(new Uint8Array(i.buffer),si,si);return t.colorSpace=Nt,t.magFilter=bt,t.minFilter=ds,t.generateMipmaps=!0,t.needsUpdate=!0,t}const I0=[{n:[1,0,0],u:[0,0,-1],v:[0,1,0],o:[1,0,1]},{n:[-1,0,0],u:[0,0,1],v:[0,1,0],o:[0,0,0]},{n:[0,1,0],u:[1,0,0],v:[0,0,-1],o:[0,1,1]},{n:[0,-1,0],u:[1,0,0],v:[0,0,1],o:[0,0,0]},{n:[0,0,1],u:[1,0,0],v:[0,1,0],o:[0,0,1]},{n:[0,0,-1],u:[-1,0,0],v:[0,1,0],o:[1,0,0]}],Jo=[[0,0],[1,0],[1,1],[0,1]],mu=Array.from({length:du},(i,e)=>Jo.map(([t,n])=>Zo(e,t,n)));function U0(i,e){return!(!i||gs(e)||i===e||i===13&&e===10)}class Ca{position=[];normal=[];uv=[];detail=[];indices=[];quad(e=!1,t=!1){const n=this.position.length/3-4;t?this.indices.push(n,n+1,n+3,n+1,n+2,n+3):this.indices.push(n,n+1,n+2,n,n+2,n+3),e&&this.indices.push(n+2,n+1,n,n+3,n+2,n)}finish(){if(!this.indices.length)return null;const e=new Vt;return e.setAttribute("position",new pt(this.position,3)),e.setAttribute("normal",new pt(this.normal,3)),e.setAttribute("uv",new pt(this.uv,2)),e.setAttribute("surface",new pt(this.detail,3)),e.setIndex(this.indices),e.computeBoundingSphere(),e}}function N0(i,e,t,n,s,r){const a=r?Co:fu;for(let o=0;o<2;o++){const l=o===0?.24:-.24;for(let u=0;u<4;u++){const[f,h]=Jo[u],d=f*2-1;i.position.push(e+.5+.27*d,t+h*.74,n+.5+l*d),i.normal.push(0,1,0),i.uv.push(...mu[a][u]),i.detail.push(1,s,40+h)}i.quad(!0)}}function F0(i,e,t,n,s=1){const r=Es(e,t,n),a=new Ca,o=new Ca,c=new Ca;if(!i.occupied[r])return[null,null,null];if(i.dense[r]===4096&&e>0&&e<15&&n>0&&n<15&&[r-1,r+1,r-16,r+16,r+256,...t>0?[r-256]:[]].every(g=>i.dense[g]===4096))return[null,null,null];const l=(g,_,m)=>Ii(g,_,m)?i.data[It(g,_,m)]:0,u=(g,_,m)=>gs(l(g,_,m))?1:0,f=e*16,h=t*16,d=n*16;for(let g=h;g<h+16;g++)for(let _=d;_<d+16;_++){let m=It(f,g,_);for(let p=f;p<f+16;p++,m++){const T=i.data[m];if(!T)continue;const b=T===13?o:T===10?c:a;let M=-1;for(const A of I0){const[R,C,U]=A.n,y=p+R,S=g+C,P=_+U;if(S<0||!U0(T,l(y,S,P)))continue;M===-1&&(M=rt(p+g*13,_,i.salt^17));const O=T===5?i.axisAt(p,g,_):"y",k=pu(T,C,R,U,O,Math.floor(M*3)),K=mu[k],W=k===5&&(O==="x"&&A.u[0]!==0||O==="z"&&A.u[2]!==0)?1:0,q=.94+.11*M,$=T===13&&l(p,g+1,_)!==13;for(let oe=0;oe<4;oe++){const[ve,Ue]=Jo[oe],$e=A.o[0]+A.u[0]*ve+A.v[0]*Ue,et=A.o[1]+A.u[1]*ve+A.v[1]*Ue,Ge=A.o[2]+A.u[2]*ve+A.v[2]*Ue;b.position.push(p+$e,g+et-($&&et===1?.105:0),_+Ge),b.normal.push(R,C,U),b.uv.push(...K[(oe+W)%4]);const X=ve?1:-1,j=Ue?1:-1,de=A.u[0]*X,Ce=A.u[1]*X,Me=A.u[2]*X,ze=A.v[0]*j,vt=A.v[1]*j,w=A.v[2]*j;let tt=1;if(b===a){const Le=u(y+de,S+Ce,P+Me),we=u(y+ze,S+vt,P+w),me=Le&&we?1:u(y+de+ze,S+Ce+vt,P+Me+w);tt=1-(Le+we+me)*.103}b.detail.push(tt,q,T)}const H=b.detail.length,ae=b===a&&b.detail[H-12]+b.detail[H-6]>b.detail[H-9]+b.detail[H-3];if(b.quad(T===13&&(C===1||p===0||_===0||p===ot-1||_===ot-1),ae),s&&T===1&&C===1&&i.highest[p+ot*_]===g){const oe=rt(p>>3,_>>3,i.salt^75);rt(p,_,i.salt^2534)<(.023+oe*oe*.21)*s&&N0(a,p,g+1,_,q,oe>.72)}}}}return[a.finish(),o.finish(),c.finish()]}const Pa=(i,e,t)=>new F(i,e,t);class O0{sun={value:Pa(0,1,0)};horizon={value:Pa(.78,.87,.83)};zenith={value:Pa(.23,.64,.8)};day={value:1};warm={value:0};linearColor=new Ye;sky;clouds;constructor(e,t){const n={sun:this.sun,horizon:this.horizon,zenith:this.zenith,lightness:this.day,sunset:this.warm},s=new Ht({uniforms:n,side:Ot,depthWrite:!1,depthTest:!0,vertexShader:`varying vec3 direction;varying vec3 skyColor;
        uniform vec3 sun,horizon,zenith;
        void main(){
          direction=normalize(position);
          float h=clamp(direction.y,0.,1.);
          skyColor=mix(horizon,zenith,smoothstep(-.07,.85,h));
          skyColor+=vec3(1.,.56,.20)*pow(max(dot(direction,sun),0.),20.)*.22;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
          gl_Position.z=gl_Position.w;
        }`,fragmentShader:`varying vec3 direction,skyColor;uniform vec3 sun;uniform float lightness;
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
        }`});this.sky=new Tt(new jo(270,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=2,e.add(this.sky);const r=new Ht({uniforms:n,vertexShader:`varying float shade;varying float dist;
        void main(){vec4 pos=modelMatrix*instanceMatrix*vec4(position,1.);shade=.90+.1*normal.y;dist=length(pos.xyz-cameraPosition);
        gl_Position=projectionMatrix*viewMatrix*pos;}`,fragmentShader:`varying float shade;varying float dist;uniform float lightness,sunset;uniform vec3 horizon;
        void main(){vec3 col=mix(vec3(.085,.135,.22),vec3(.98,.968,.88),lightness)*shade;
          col=mix(col,vec3(1.,.65,.40)*shade,sunset*.64);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);
          #include <colorspace_fragment>
        }`}),a=66,o=4;this.clouds=new nu(new Pn,r,a*o);const c=new Pt;for(let l=0;l<a;l++){const u=rt(l,11,t)*480-112,f=rt(l,12,t)*480-112,h=66+rt(l,13,t)*17;for(let d=0;d<o;d++)c.position.set(u+d*4.6,h+Math.sin(Math.PI*d/3)*1.5,f+rt(l,d,t)*4),c.scale.set(6+rt(l+7,d,t)*7,1.6+rt(l+12,d,t)*2.6,5+rt(l+77,d,t)*7),c.updateMatrix(),this.clouds.setMatrixAt(l*o+d,c.matrix)}this.clouds.computeBoundingSphere(),e.add(this.clouds)}update(e,t,n){const s=(e-.25)*Math.PI*2;this.sun.value.set(Math.cos(s)*.8,Math.sin(s),Math.cos(s)*.6).normalize();const r=this.sun.value.y,a=lf.smoothstep(r,-.27,.32),o=Math.exp(-Math.pow((r-.065)/.25,2));this.day.value=a,this.warm.value=o;const c=(l,u,f,h)=>{this.linearColor.setRGB(Math.min(1,u),Math.min(1,f),Math.min(1,h),Nt),l.set(this.linearColor.r,this.linearColor.g,this.linearColor.b)};c(this.zenith.value,.095+a*.23+o*.14,.14+a*.52-o*.15,.24+a*.6-o*.13),c(this.horizon.value,.25+a*.57+o*.29,.32+a*.57-o*.13,.44+a*.45-o*.25),this.sky.position.copy(t.position),this.clouds.position.x=Math.sin(n/190)*10}dispose(e){e.remove(this.sky,this.clouds),this.sky.geometry.dispose(),this.sky.material.dispose(),this.clouds.geometry.dispose(),this.clouds.material.dispose(),this.clouds.dispose()}}function pl(i,e,t,n,s){return new Ht({transparent:s,depthWrite:!s,uniforms:{...n,atlas:{value:i},columnHeights:{value:e},sun:t.sun,lightness:t.day,sunset:t.warm,horizon:t.horizon},vertexShader:`
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
      }`,fragmentShader:`
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
      }`})}const gu=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function _u(i,e,t,n,s){const[r,a,o]=gu[i],c=pu(n,a,r,o,s);return c===5&&(s==="x"&&!r||s==="z"&&r!==0)&&([e,t]=[t,1-e]),Zo(c,e,t)}function B0(i,e){const t=[],n=[],s=[],r=[],a=i.getAttribute("position"),o=i.getAttribute("uv");function c(u,f,h,d,g,_,m,p=0){const T=t.length/3,b=new Ye(m);for(let M=0;M<a.count;M++){const A=Math.floor(M/4),[R,C,U]=gu[A],y=.8+.15*C+.065*R+.05*U;t.push(u+a.getX(M)*d,f+a.getY(M)*g,h+a.getZ(M)*_);const S=o.getX(M),P=o.getY(M);n.push(...p?_u(A,S,P,p,"y"):Zo(16,S,P)),s.push(b.r*y,b.g*y,b.b*y)}for(let M=0;M<i.index.count;M++)r.push(T+i.index.getX(M))}if(c(.1,-.54,.02,.57,.64,.61,3630181),c(.1,-.24,-.01,.6,.17,.62,12622438),c(.08,-.07,-.06,.52,.43,.53,11432010),c(-.16,.015,-.23,.2,.2,.33,14591349),e>=17&&e<=20){const u=e===18||e===20?9874602:13345647;c(-.08,.35,-.12,.14,1.18,.15,10052927),c(-.08,.72,-.12,.2,.16,.2,6055253),e<=18?(c(-.08,.91,-.12,.88,.2,.2,u),c(-.55,.78,-.12,.15,.27,.19,u),c(.37,.8,-.12,.15,.19,.18,u)):(c(-.19,.91,-.12,.49,.22,.22,u),c(-.44,.75,-.12,.28,.46,.23,u),c(-.53,.61,-.12,.13,.19,.24,12962741))}else e===16?c(-.06,.36,-.18,.16,1.05,.16,12620646):e===15||e===24?(c(-.1,.29,-.22,.4,.4,.36,e===24?8708039:5792095),c(-.1,.54,-.22,.22,.16,.24,e===24?13956827:7371126)):e&&c(-.11,.3,-.26,.66,.66,.66,16777215,e);const l=new Vt;return l.setAttribute("position",new pt(t,3)),l.setAttribute("uv",new pt(n,2)),l.setAttribute("color",new pt(s,3)),l.setIndex(r),l}function z0(){const e=new Uint8Array(1024).fill(255);function t(r,a,o,c,l,u){const f=Math.max(Math.abs(o-r),Math.abs(c-a));for(let h=0;h<=f;h++){const d=h/f,g=Math.round(r+(o-r)*d),_=Math.round(a+(c-a)*d);if(g<0||_<0||g>=32||_>=32)continue;const m=g+_*32;e[m]=Math.min(e[m],Math.round(245*(l+(u-l)*d)))}}[[[15,17],[12,19],[11,23],[7,25],[6,29],[2,32]],[[15,17],[16,13],[20,11],[19,7],[23,3],[23,0]],[[15,17],[18,18],[21,22],[26,22],[30,26],[32,27]],[[15,17],[11,15],[7,15],[6,12],[2,10],[-1,8]],[[11,23],[14,24],[15,28],[18,29]],[[20,11],[23,13],[26,11],[30,11]],[[7,15],[7,19],[4,22]],[[21,22],[19,25],[20,29]]].forEach((r,a)=>{const o=a<4?.02+a*.035:.51,c=a<4?.93:.98;for(let l=1;l<r.length;l++)t(r[l-1][0],r[l-1][1],r[l][0],r[l][1],o+(c-o)*(l-1)/(r.length-1),o+(c-o)*l/(r.length-1))});const s=new Gr(e,32,32,Fs);return s.magFilter=bt,s.minFilter=bt,s.needsUpdate=!0,s}class k0{cube=new Pn;mask=z0();hand;cracking;ghost;lastItem=-1;ghostTile="";recoil=0;phase=0;clock=0;constructor(e,t,n){this.hand=new Tt(new Vt,new Vr({map:n,vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.hand.visible=!1,this.hand.renderOrder=12,this.hand.frustumCulled=!1,t.add(this.hand),e.add(t);const s="varying vec2 face;void main(){face=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";this.cracking=new Tt(this.cube,new Ht({uniforms:{stages:{value:this.mask},progress:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,vertexShader:s,fragmentShader:`uniform sampler2D stages;uniform float progress;varying vec2 face;
        void main(){float crack=step(texture2D(stages,face).r,min(.985,progress));
          float lip=step(texture2D(stages,face+vec2(.03125,-.03125)).r,min(.985,progress));
          if(crack+lip<.2)discard;
          gl_FragColor=mix(vec4(.92,.74,.46,.27),vec4(.025,.031,.032,.87),crack);
          #include <colorspace_fragment>
        }`})),this.cracking.scale.setScalar(1.002),this.cracking.visible=!1,this.cracking.renderOrder=3,e.add(this.cracking);const r=this.cube.clone();r.setAttribute("plate",new pt(new Float32Array(r.getAttribute("uv").count*2),2)),this.ghost=new Tt(r,new Ht({uniforms:{atlas:{value:n},allowed:{value:1}},transparent:!0,depthWrite:!1,side:on,forceSinglePass:!0,vertexShader:`attribute vec2 plate;varying vec2 uvPlate,face;varying float range;
        void main(){face=uv;uvPlate=plate;vec4 mv=modelViewMatrix*vec4(position,1.);range=-mv.z;gl_Position=projectionMatrix*mv;}`,fragmentShader:`uniform sampler2D atlas;uniform float allowed;varying vec2 uvPlate,face;varying float range;
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
        }`})),this.ghost.scale.setScalar(.993),this.ghost.visible=!1,this.ghost.renderOrder=4,e.add(this.ghost)}swing(){this.recoil=1}update(e,t,n,s,r,a){const o=!!n&&n.active!==!1;this.hand.visible=o,this.cracking.visible=o&&!!t&&n.mining>0,this.cracking.visible&&t&&n&&(this.cracking.position.set(t.x+.5,t.y+.5,t.z+.5),this.cracking.material.uniforms.progress.value=n.mining);const c=n?.preview;if(this.ghost.visible=o&&!!c&&!this.cracking.visible,c&&this.ghost.visible){this.ghost.position.set(c.x+.5,c.y+.5,c.z+.5),this.ghost.material.uniforms.allowed.value=Number(c.valid);const h=c.id+"/"+c.axis;if(h!==this.ghostTile){this.ghostTile=h;const d=this.ghost.geometry.getAttribute("uv"),g=this.ghost.geometry.getAttribute("plate");for(let _=0;_<d.count;_++){const m=_u(_>>2,d.getX(_),d.getY(_),c.id,c.axis??"y");g.setXY(_,m[0],m[1])}g.needsUpdate=!0}}if(!n||!o)return;n.held!==this.lastItem&&(this.hand.geometry.dispose(),this.hand.geometry=B0(this.cube,n.held),this.lastItem=n.held),this.clock+=s,this.phase=n.mining>0?this.phase+s*16:0,this.recoil=Math.max(0,this.recoil-s*4.8);const l=a?Math.max(Math.sin(this.phase*.5)**2,Math.sin(this.recoil*Math.PI)):0,u=n.moving&&a?Math.sin(this.clock*(n.sprinting?13:9))*.006:0,f=.54*Math.tan(e.fov*Math.PI/360);this.hand.position.set(f*e.aspect*.66-l*.046,-f*.8+u+l*.042,-.54-l*.045),this.hand.rotation.set(.15-l*.74,-.55+l*.15,-.31+l*.19),this.hand.scale.setScalar(.235),this.hand.material.color.setScalar(r)}dispose(){this.hand.removeFromParent(),this.hand.geometry.dispose(),this.hand.material.dispose(),this.cracking.removeFromParent(),this.cracking.material.dispose(),this.mask.dispose(),this.ghost.removeFromParent(),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.cube.dispose()}}const vs=256,vu=96,Qo=1.62,Ds=1.8,nn=.3,Ls=.96,ml=5,Ct=1e-7,fi=(i,e,t)=>i>=0&&i<vs&&t>=0&&t<vs&&e>=0&&e<vu,qr=i=>i!==0&&i!==13,Da=(i,e,t)=>Math.min(t,Math.max(e,i));function H0(i){return{...i,grounded:!1,vx:0,vy:0,vz:0,inWater:!1,flying:!1,wasJump:!1,crouched:!!i.crouched,coyote:0,jumpBuffer:0,eye:i.crouched?.79:Qo,stride:0,bobOffset:0,fovOffset:0}}function V0(i){i.wasJump=!1,i.jumpBuffer=0,i.coyote=0,i.vx=0,i.vz=0,i.bobOffset=0,i.fovOffset=0}function xu(i){return(i.eye??(i.crouched?.79:Qo))+(i.bobOffset??0)}function Fr(i,e,t,n,s=Ds){const r=Math.floor(e-nn+Ct),a=Math.floor(e+nn-Ct),o=Math.floor(t+Ct),c=Math.floor(t+s-Ct),l=Math.floor(n-nn+Ct),u=Math.floor(n+nn-Ct);if(!fi(r,o,l)||!fi(a,c,u))return!0;for(let f=o;f<=c;f++)for(let h=l;h<=u;h++)for(let d=r;d<=a;d++)if(qr(i.get(d,f,h)))return!0;return!1}function Po(i,e,t,n){return i.get(Math.floor(e),Math.floor(t+.12),Math.floor(n))===13||i.get(Math.floor(e),Math.floor(t+1),Math.floor(n))===13}function G0(i,e,t=!1){const n={yaw:Number.isFinite(e.yaw)?e.yaw:0,pitch:Number.isFinite(e.pitch)?Da(e.pitch,-1.55,1.55):0},s=(f,h,d,g=Ds,_=!1)=>Number.isFinite(f)&&Number.isFinite(h)&&Number.isFinite(d)&&!Fr(i,f,h,d,g)&&(_||!Po(i,f,h,d));if(s(e.x,e.y,e.z,e.crouched?Ls:Ds,t))return{x:e.x,y:e.y,z:e.z,...n,...e.crouched?{crouched:!0}:{}};const r=i.spawn?.()??{x:128.5,y:60,z:128.5,...n},a=Number.isFinite(e.x)&&Number.isFinite(e.z)?e:r,o=Da(Math.floor(a.x),0,vs-1),c=Da(Math.floor(a.z),0,vs-1);function l(f,h){if(fi(f,0,h))for(let d=vu-1;d>=0;d--){const g=i.get(f,d,h);if(g!==0)return g!==13&&s(f+.5,d+1,h+.5)?{x:f+.5,y:d+1,z:h+.5,...n}:void 0}}const u=l(o,c);if(u)return u;if(s(r.x,r.y,r.z))return{...r,...n};for(let f=1;f<vs;f++)for(let h=-f;h<=f;h++){const d=l(o+h,c-f)??l(o+h,c+f);if(d)return d;if(Math.abs(h)<f){const g=l(o-f,c+h)??l(o+f,c+h);if(g)return g}}throw new Error("立てる場所が見つかりません。別のワールドかバックアップを開いてください。")}function La(i,e,t,n){if(!n)return!1;const s=e[t];e[t]=s+n;const r=e.crouched?Ls:Ds;if(!Fr(i,e.x,e.y,e.z,r))return!1;const a=t==="y"?n>0?r:0:n>0?nn:-nn,o=s+n+a;return e[t]=(n>0?Math.floor(o-Ct):Math.ceil(o+Ct))-a,!0}function Li(i,e,t,n,s=nn-Ct){if(Math.abs(t-Math.round(t))>.002)return!1;const r=Math.round(t)-1;for(let a=Math.floor(n-s);a<=Math.floor(n+s);a++)for(let o=Math.floor(e-s);o<=Math.floor(e+s);o++)if(fi(o,r,a)&&qr(i.get(o,r,a)))return!0;return!1}function W0(i,e,t,n,s={}){if(!(n>0)||!Number.isFinite(n))return;const r=Math.min(n,.25),a=Math.ceil(r*100),o=r/a,c=Math.max(1,Math.hypot(t.forward,t.right)),l=t.forward/c,u=t.right/c,f=Math.sin(e.yaw),h=Math.cos(e.yaw),d=u*h-l*f,g=-u*f-l*h;(t.jumpPressed||t.jump&&!e.wasJump)&&(e.jumpBuffer=.105);for(let _=0;_<a;_++){const m=e.x,p=e.z;e.inWater=Po(i,e.x,e.y,e.z);const T=e.vy<=0&&Li(i,m,e.y,p);T&&(e.y=Math.round(e.y)),e.crouched=!e.flying&&!e.inWater&&t.down&&(T||e.crouched)||e.crouched&&Fr(i,m,e.y,p);const b=e.flying?t.sprint?13:8:e.inWater?2:e.crouched?1.65:t.sprint?6.4:4.2;if(e.flying||e.inWater)e.vx=d*b,e.vz=g*b;else{const O=d*b-e.vx,k=g*b-e.vz,W=Math.min(1,(T?d||g?53:72:d||g?17:5)*o/(Math.hypot(O,k)||1));e.vx+=O*W,e.vz+=k*W}const M=T&&e.crouched&&!e.flying,A=M&&Li(i,m,e.y,p,.1)?.1:nn-Ct,R=e.vx*o,C=e.vz*o;(M&&!Li(i,m+R,e.y,p,A)||La(i,e,"x",R))&&(e.vx=0),(M&&!Li(i,e.x,e.y,p+C,A)||La(i,e,"z",C))&&(e.vz=0),T&&(e.coyote=.08),e.flying?(e.coyote=e.jumpBuffer=0,e.vy=(Number(t.jump)-Number(t.down))*b):e.inWater?(e.coyote=e.jumpBuffer=0,e.vy=t.jump?4.9:Math.max(-2.1,e.vy-7*o)):(e.jumpBuffer>0&&e.coyote>0&&(e.vy=8.35,e.jumpBuffer=e.coyote=0),e.vy>0||!Li(i,e.x,e.y,e.z)?e.vy=Math.max(-30,e.vy-24*o):e.vy=0),La(i,e,"y",e.vy*o)&&(e.vy=0),e.grounded=e.vy<=0&&Li(i,e.x,e.y,e.z),e.jumpBuffer=Math.max(0,e.jumpBuffer-o),e.coyote=Math.max(0,e.coyote-o);const U=Math.hypot(e.x-m,e.z-p);e.stride=(e.stride+U*4.2)%(Math.PI*2);const y=e.grounded&&!e.flying&&U>0&&s.bob!==!1?Math.sin(e.stride)*(e.crouched?.006:.021):0;e.bobOffset+=(y-e.bobOffset)*Math.min(1,18*o);const S=e.crouched?.79:Qo;e.eye+=(S-e.eye)*Math.min(1,18*o),e.crouched&&e.eye>Ls-.07&&Fr(i,e.x,e.y,e.z,e.eye+.07)&&(e.eye=Ls-.07);const P=t.sprint&&!e.crouched&&U/o>4.2&&s.sprintFov!==!1?4:0;e.fovOffset+=(P-e.fovOffset)*Math.min(1,10*o)}e.inWater=Po(i,e.x,e.y,e.z),e.wasJump=t.jump}function Ji(i,e,t=ml){if(!Number.isFinite(t)||t<0)return null;const n=e.x,s=e.y+xu(e),r=e.z,a=Math.cos(e.pitch),o=-Math.sin(e.yaw)*a,c=Math.sin(e.pitch),l=-Math.cos(e.yaw)*a;let u=Math.floor(n),f=Math.floor(s),h=Math.floor(r);const d=Math.sign(o),g=Math.sign(c),_=Math.sign(l),m=o?Math.abs(1/o):1/0,p=c?Math.abs(1/c):1/0,T=l?Math.abs(1/l):1/0,b=(P,O,k)=>k===0?1/0:Math.max(0,((k>0?O+1:O)-P)/k);let M=b(n,u,o),A=b(s,f,c),R=b(r,h,l),C=0,U=0,y=0,S=0;for(;S<=Math.min(ml,t)&&fi(u,f,h);){const P=i.get(u,f,h);if(qr(P))return{x:u,y:f,z:h,id:P,nx:C,ny:U,nz:y,distance:S};C=U=y=0,S=Math.min(M,A,R);const O=M<=S+1e-10,k=A<=S+1e-10,K=R<=S+1e-10;O&&(M+=m,u+=d),k&&(A+=p,f+=g),K&&(R+=T,h+=_),O?C=-d:k?U=-g:y=-_}return null}function ec(i,e,t,n){return e<i.x+nn-Ct&&e+1>i.x-nn+Ct&&n<i.z+nn-Ct&&n+1>i.z-nn+Ct&&t<i.y+(i.crouched?Ls:Ds)-Ct&&t+1>i.y+Ct}function X0(i,e,t){if(!t||Math.abs(t.nx)+Math.abs(t.ny)+Math.abs(t.nz)!==1)return!1;const n=t.x+t.nx,s=t.y+t.ny,r=t.z+t.nz;return!fi(n,s,r)||qr(i.get(n,s,r))?!1:!ec(e,n,s,r)}function Mu(i,e,t){if(!t)return!1;const n=Ji(i,e);return!!n&&n.x===t.x&&n.y===t.y&&n.z===t.z&&n.id===t.id&&n.nx===t.nx&&n.ny===t.ny&&n.nz===t.nz}function q0(i,e,t,n,s,r){if(!Mu(i,e,r))return{ok:!1,message:"5ブロック以内の素材に照準を合わせてください。"};if(r.id===22&&i.chestAt?.(r.x,r.y,r.z)?.length)return{ok:!1,message:"先にチェストの中身を取り出してください。"};if(!je[r.id]?.block)return{ok:!1,message:"岩盤は掘れません。"};if(n==="creative")return i.set(r.x,r.y,r.z,0)?{ok:!0,message:je[r.id].name+"を取り除きました。"}:{ok:!1,message:"ここは掘れません。"};const a=Hu(t,r.id,t.hotbar[s]);return a.draft?i.set(r.x,r.y,r.z,0)?(Object.assign(t,a.draft),{ok:!0,message:a.message}):{ok:!1,message:"ここは掘れません。"}:{ok:!1,message:a.message}}function Su(i,e,t,n,s,r){const a=t.hotbar[s];if(!je[a]?.block)return"ホットバーから建材を選んでください。";if(n==="explore"&&!vn(t,a))return je[a].name+"を持っていません。";if(!r)return"5ブロック以内の面に照準を合わせてください。";const o=r.x+r.nx,c=r.y+r.ny,l=r.z+r.nz;return fi(o,c,l)?ec(e,o,c,l)?"自分の体に重なる場所です。":X0(i,e,r)?null:"ここにはすでにブロックがあります。":"ワールドの外には置けません。"}function Y0(i,e,t,n,s,r){const a=Su(i,e,t,n,s,r);if(a)return{ok:!1,message:a};if(!Mu(i,e,r))return{ok:!1,message:"5ブロック以内の面に照準を合わせてください。"};const o=t.hotbar[s];return i.set(r.x+r.nx,r.y+r.ny,r.z+r.nz,o)?(n==="explore"&&Vu(t,o),{ok:!0,message:je[o].name+"を置きました。"}):{ok:!1,message:"ここには置けません。"}}const K0=[0,8629330,11041876,9608594,14663561,9861198,6528082,13080411,9608078,9084310,10344399,6647915,15975794,6932679,5857887];class j0{constructor(e,t){this.canvas=e,this.world=t;const n=e.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"high-performance"});if(!n)throw new Error("WebGL 2を利用できません。ChromeまたはEdgeの設定でグラフィック アクセラレーションを有効にして再起動してください。");this.gl=new P0({canvas:e,context:n,antialias:!1,alpha:!1}),this.gl.outputColorSpace=Nt,this.gl.toneMapping=An,this.atlas.anisotropy=Math.min(4,this.gl.capabilities.getMaxAnisotropy()),this.gl.setClearColor(12376013),this.sky=new O0(this.scene,t.salt);for(let r=0;r<this.heights.length;r++)this.heights[r]=Math.max(0,t.highest[r]);this.heightTexture=new Gr(this.heights,256,256,Fs),this.heightTexture.magFilter=bt,this.heightTexture.minFilter=bt,this.heightTexture.needsUpdate=!0,this.materials=[pl(this.atlas,this.heightTexture,this.sky,this.uniforms,!1),pl(this.atlas,this.heightTexture,this.sky,this.uniforms,!0)],this.tools=new k0(this.scene,this.camera,this.atlas);const s=new Pn(1.008,1.008,1.008);this.selection=new Vf(new Gf(s),new su({color:16772533,toneMapped:!1})),s.dispose(),this.selection.visible=!1,this.selection.renderOrder=4,this.scene.add(this.selection),this.chips=new nu(new Pn(.1,.1,.1),new Vr({color:16777215}),64),this.chips.count=0,this.chips.frustumCulled=!1,this.chips.visible=!1,this.scene.add(this.chips),this.border=this.makeBorder(),this.scene.add(this.border),this.unsubscribe=t.onEdit((r,a,o)=>{for(const u of $u(r,a,o))this.wanted.has(u)&&this.dirty.add(u);const c=r+256*o,l=Math.max(0,t.highest[c]);this.heights[c]!==l&&(this.heights[c]=l,this.heightTexture.needsUpdate=!0),this.lampDue=0})}canvas;world;scene=new Ff;camera=new en(67,1,.06,320);stats={draws:0,chunks:0,geometries:0,textures:0,fps:0,queued:0,triangles:0,chunkMs:0,rebuilt:0};gl;sky;atlas=L0();heightTexture;heights=new Uint8Array(256*256);uniforms={lampPositions:{value:Array.from({length:4},()=>new F)},lampCount:{value:0},lampColors:{value:Array.from({length:4},()=>new F)},fogEnd:{value:75},clock:{value:0},shadows:{value:1},extras:{value:1},submerged:{value:0}};tools;materials;batches=new Map;pending=[];wanted=new Set;dirty=new Set;unsubscribe;selection;border;chips;particles=[];dummy=new Pt;chipColor=new Ye;quality={distance:4,scale:1,shadows:!0};cx=-100;cz=-100;cy=-100;t=0;wt=0;ht=0;lampDue=0;elapsed=0;frameCount=0;totalFrames=0;lampCamera=new F(1/0,1/0,1/0);vegetation=1;visibleChunks=new Set;configure(e){const t=Math.max(2,Math.min(8,Math.round(e.distance)));t!==this.quality.distance&&(this.cx=-100);const n=e.vegetation===!1?0:e.quality==="high"?1.4:e.quality==="low"?.42:1;if(n!==this.vegetation){this.vegetation=n;for(const s of this.batches.keys())this.world.occupied[s]&&this.dirty.add(s)}this.quality={...e,distance:t,scale:Math.max(.45,Math.min(1.5,e.scale))},this.uniforms.shadows.value=e.shadows?e.quality==="high"?2:1:0,this.uniforms.extras.value=e.effects===!1?0:1,this.uniforms.fogEnd.value=(t+.45)*16,this.wt=0}makeBorder(){const e=[];for(const[r,a,o,c]of[[0,0,256,0],[256,0,256,256],[256,256,0,256],[0,256,0,0]])e.push(r,0,a,o,0,c,o,96,c,r,0,a,o,96,c,r,96,a);const t=new Vt;t.setAttribute("position",new pt(e,3));const n=new Ht({side:on,transparent:!0,depthWrite:!1,vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 p;void main(){
        float limit=1.-smoothstep(1.,12.,distance(cameraPosition,p));if(limit<=0.)discard;
        vec2 grid=fract(vec2(p.x+p.z,p.y)*.5);float line=step(min(grid.x,grid.y),.022);
        gl_FragColor=vec4(.95,.79,.45,limit*(.06+.49*line));}`}),s=new Tt(t,n);return s.visible=!1,s}schedule(e){const t=Math.floor(e.x/16),n=Math.floor(e.z/16),s=Math.floor(e.y/16);if(t===this.cx&&n===this.cz&&s===this.cy)return;this.cx=t,this.cz=n,this.cy=s,this.wanted.clear(),this.pending.length=0;const r=this.quality.distance,a=-Math.sin(e.yaw),o=-Math.cos(e.yaw);for(let c=Math.max(0,n-r);c<=Math.min(15,n+r);c++)for(let l=Math.max(0,t-r);l<=Math.min(15,t+r);l++){const u=l-t,f=c-n,h=Math.hypot(u,f);if(h>r+.65)continue;const d=this.world.highest[l*16+8+256*(c*16+8)]>>4;for(let g=0;g<6;g++){const _=Es(l,g,c);if(this.wanted.add(_),this.batches.has(_)||!this.world.occupied[_])continue;const m=u*a+f*o,p=Math.min(Math.abs(g-d)*2,Math.abs(g-s)*2);this.pending.push({key:_,priority:h*2.2+p+.2*Math.abs(g-s)-m*.55+(g+1<Math.min(s,d)?8:0)})}}this.pending.sort((c,l)=>l.priority-c.priority);for(const[c,l]of this.batches)this.wanted.has(c)||(this.removeMeshes(l),this.batches.delete(c));for(const c of this.dirty)this.wanted.has(c)||this.dirty.delete(c)}removeMeshes(e){for(const t of e)this.scene.remove(t),t.geometry.dispose()}rebuild(e){const t=this.batches.get(e);t&&this.removeMeshes(t);const n=[],s=F0(this.world,e&15,e>>>8,e>>>4&15,this.vegetation);for(let r=0;r<s.length;r++){const a=s[r];if(!a)continue;const o=new Tt(a,this.materials[r===0?0:1]);o.renderOrder=r===0?0:1,o.onBeforeRender=()=>{this.visibleChunks.add(e)},n.push(o),this.scene.add(o)}this.batches.set(e,n)}pump(){const e=performance.now(),t=this.totalFrames<4?8:3.5;let n=0;do{let s;if(this.dirty.size)s=this.dirty.values().next().value,this.dirty.delete(s);else if(this.pending.length){if(s=this.pending.pop().key,this.batches.has(s))continue}else break;this.rebuild(s),n++}while(n<9&&performance.now()-e<t);this.stats.chunkMs=n?performance.now()-e:0,this.stats.rebuilt=n}lamps(e){const t=[];for(const n of this.world.lamps){const s=(n&255)+.5,r=(n>>>16)+.5,a=(n>>>8&255)+.5,o=(s-e.x)**2+(a-e.z)**2+(r-e.y)**2;o>676||t.length===4&&o>=t[3].d||(t.push({key:n,d:o}),t.sort((c,l)=>c.d-l.d),t.length>4&&t.pop())}this.uniforms.lampCount.value=t.length,t.forEach(({key:n},s)=>{this.uniforms.lampPositions.value[s].set((n&255)+.5,(n>>>16)+.5,(n>>>8&255)+.5);const r=this.world.data[n]===25;this.uniforms.lampColors.value[s].set(r?.36:1.86,r?1.57:1.09,r?1.4:.43)})}effect(e,t,n,s,r="mine"){this.tools.swing();const a=this.quality.effects===!1?0:r==="place"?3:7;for(let o=0;o<a;o++)this.particles.length>=64&&this.particles.shift(),this.particles.push({x:e+.5+(Math.random()-.5)*.65,y:t+.55+Math.random()*.38,z:n+.5+(Math.random()-.5)*.65,vx:(Math.random()-.5)*2.1,vy:1+Math.random()*1.7,vz:(Math.random()-.5)*2.1,life:.32+Math.random()*.17,id:s})}updateParticles(e){for(let t=this.particles.length-1;t>=0;t--){const n=this.particles[t];if(n.life-=e,n.life<=0){this.particles.splice(t,1);continue}n.vy-=8*e,n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e}this.chips.count=this.particles.length,this.chips.visible=this.chips.count>0;for(let t=0;t<this.chips.count;t++){const n=this.particles[t];this.dummy.position.set(n.x,n.y,n.z),this.dummy.rotation.set(n.life*4,t+n.life*5,t*.8),this.dummy.scale.setScalar(Math.min(1,n.life*5)),this.dummy.updateMatrix(),this.chips.setMatrixAt(t,this.dummy.matrix),this.chips.setColorAt(t,this.chipColor.setHex(K0[n.id]??(n.id===23||n.id===25||n.id===26?9554109:11837559)))}this.chips.count&&(this.chips.instanceMatrix.needsUpdate=!0,this.chips.instanceColor&&(this.chips.instanceColor.needsUpdate=!0))}update(e,t,n,s,r){const a=Math.max(1,this.canvas.clientWidth),o=Math.max(1,this.canvas.clientHeight);if(a!==this.wt||o!==this.ht){this.wt=a,this.ht=o;const h=Math.min(window.devicePixelRatio||1,1.5),d=this.quality.quality==="standard"||this.quality.quality==="high"?2073600:12e5,g=Math.sqrt(d/(a*o));this.gl.setPixelRatio(Math.min(h,g)*this.quality.scale),this.gl.setSize(a,o,!1),this.camera.aspect=a/o,this.camera.updateProjectionMatrix()}this.t+=s,this.uniforms.clock.value=this.t;const c=xu(e),l=67+(e.fovOffset??0);Math.abs(l-this.camera.fov)>.01&&(this.camera.fov=l,this.camera.updateProjectionMatrix()),this.camera.position.set(e.x,e.y+c,e.z),this.camera.rotation.set(e.pitch,e.yaw,0,"YXZ"),this.sky.update(n,this.camera,this.t),this.selection.visible=!!t,t&&this.selection.position.set(t.x+.5,t.y+.5,t.z+.5),this.uniforms.submerged.value=+(this.world.get(e.x|0,e.y+c|0,e.z|0)===13),this.border.visible=Math.min(e.x,e.z,256-e.x,256-e.z)<12,this.schedule(e),this.pump(),this.lampDue-=s,(this.lampDue<=0||this.lampCamera.distanceToSquared(this.camera.position)>4)&&(this.lamps(e),this.lampDue=.23,this.lampCamera.copy(this.camera.position)),this.updateParticles(s);const u=this.world.highest[(e.x|0)+(e.z|0)*256]>e.y+c+1.5;this.tools.update(this.camera,t,r,s,(u?.57:.7)+this.sky.day.value*(u?.13:.3),this.uniforms.extras.value>0),this.visibleChunks.clear(),this.gl.render(this.scene,this.camera);const f=this.gl.info;this.stats.draws=f.render.calls,this.stats.triangles=f.render.triangles,this.stats.geometries=f.memory.geometries,this.stats.chunks=this.visibleChunks.size,this.stats.textures=f.memory.textures,this.stats.queued=this.pending.length+this.dirty.size,this.totalFrames++,this.frameCount++,this.elapsed+=s,this.elapsed>=.6&&(this.stats.fps=Math.round(this.frameCount/this.elapsed),this.frameCount=0,this.elapsed=0)}dispose(){this.unsubscribe();for(const e of this.batches.values())this.removeMeshes(e);this.batches.clear(),this.dirty.clear(),this.wanted.clear(),this.pending.length=0,this.selection.geometry.dispose(),this.selection.material.dispose(),this.border.geometry.dispose(),this.border.material.dispose(),this.chips.geometry.dispose(),this.chips.material.dispose(),this.chips.dispose(),this.sky.dispose(this.scene),this.materials.forEach(e=>e.dispose()),this.tools.dispose(),this.atlas.dispose(),this.heightTexture.dispose(),this.scene.clear(),this.gl.dispose()}}function $0(i,e,t,n){const s=e==="creative";function r(c){const l=je[c];return l?{id:c,name:l.name,count:s?1/0:ys(i,c),durability:s?void 0:vn(i,c)?.durability,maxDurability:l.maxDurability}:null}const a=s?Object.keys(je).map(Number).filter(c=>je[c].block).map(r).filter(c=>!!c):i.slots.map(c=>({id:c.id,name:je[c.id].name,count:c.count,durability:c.durability,maxDurability:je[c.id].maxDurability})),o=s?[]:Sl.filter(c=>!c.legacy||n.generator===1).map(c=>({id:c.id,name:c.name,itemId:c.output.id,ingredients:c.inputs.map(l=>je[l.id].name+" "+ys(i,l.id)+"/"+l.count).join(" ・ "),outputs:je[c.output.id].name+" ×"+c.output.count,craftable:Bu(i,c,n),reason:Bo(i,c,n),equipment:wl(c,n.generator)?"作業台":"手作り"}));return{items:a,bar:i.hotbar.map(r),recipes:o,mode:e,selected:t}}const Qt=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),gl=i=>i==="creative"?"クリエイティブ":"探索",Xe=i=>document.getElementById(i),Rt=(i,e,t="")=>'<button type="button" class="'+t+'" data-action="'+i+'">'+e+"</button>",Z0=()=>Rt("back",'<span aria-hidden="true">‹</span> 戻る',"back"),ls=i=>'<header class="panel-head"><h1>'+i+"</h1>"+Z0()+"</header>",Ia=i=>Number.isFinite(i)?String(i):"∞",_l=new Map,vl={17:"石や鉱石を素早く掘り、潮晶を採取",18:"石や鉱石をさらに速く掘り、潮晶を採取",19:"原木・木材の採掘を短縮",20:"原木・木材をさらに速く採掘"};function J0(i){const e=_l.get(i);if(e)return e;const t=document.createElement("canvas");t.width=t.height=32;const n=t.getContext("2d");if(!n)return"";const s=(o,c)=>{n.fillStyle=o,n.beginPath(),n.moveTo(c[0][0],c[0][1]);for(const[l,u]of c.slice(1))n.lineTo(l,u);n.closePath(),n.fill()},r={1:["#86bc59","#916742","#705637"],2:["#bf9165","#9b704c","#77563d"],3:["#b4bac1","#828e98","#646d79"],4:["#f1d9a0","#ccb17e","#b79565"],5:["#d1ad75","#926645","#684630"],6:["#71ac63","#538959","#386c47"],7:["#e6ba82","#bf8c53","#9d7044"],8:["#b4b7b4","#8e9392","#6f797a"],9:["#b9bfc5","#89939e","#647483"],10:["#d8f3f0","#8db8bf","#69a7ae"],11:["#a0aaa9","#7b8486","#69777a"],12:["#ffe3a2","#eeb756","#bf893c"],21:["#eac98f","#a97651","#755040"],22:["#e2ac58","#aa793c","#876137"],23:["#9fc6bd","#689a96","#536f79"],25:["#c2fff1","#6dc7c7","#5aafaf"],26:["#a1c8c1","#668c89","#4e7176"]};if(r[i]){const o=r[i];s(o[1],[[2,9],[16,16],[16,31],[2,24]]),s(o[2],[[16,16],[30,9],[30,24],[16,31]]),s(o[0],[[2,9],[16,2],[30,9],[16,16]]);const c=(l,u,f,h,d)=>{n.strokeStyle=l,n.lineWidth=1.2,n.beginPath(),n.moveTo(u,f),n.lineTo(h,d),n.stroke()};if((i===22||i===21)&&(c("#573b34",3,15,16,22),c("#543c34",16,22,29,15),n.fillStyle="#ffe2a0",n.fillRect(9,16,3,5)),[23,25,26].includes(i)&&s("#c7fff1",[[6,15],[9,14],[12,20],[9,23]]),i===1&&(s("#6b9e4c",[[2,9],[16,16],[16,19],[11,17],[10,19],[8,15],[6,16],[2,13]]),s("#598340",[[16,16],[30,9],[30,12],[26,15],[23,15],[21,18],[16,19]])),[7,9,12].includes(i)){for(const l of[14,19])c("#533f3970",2,l,16,l+7),c("#493c4266",16,l+7,30,l);i===9&&(c("#56646b",8,12,8,17),c("#53616c",12,19,12,24))}else if(i===5){for(const l of[5,9,13])c("#5e422f",l,10+(l-2)/2,l,23+(l-2)/2);s("#99784c",[[8,9],[16,5],[24,9],[16,13]]),s("#d2ab76",[[11,9],[16,7],[21,9],[16,11]])}else if(i===10)c("#e0ffff",4,13,9,22),c("#c3eeee",18,17,22,23);else{n.fillStyle=i===11?"#35434a":"#ffffff38";for(const[l,u]of[[5,13],[9,19],[12,16],[19,21],[25,15],[16,7]])n.fillRect(l,u,i===11?3:2,i===11?3:1)}}else if(i===24)s("#438c9a",[[7,16],[17,2],[25,13],[17,30],[10,26]]),s("#a6fff0",[[7,16],[17,2],[15,18],[10,26]]),s("#74ddd4",[[15,18],[17,2],[23,13]]);else if(i===15)s("#25323d",[[4,17],[9,8],[20,5],[28,12],[25,23],[14,27],[6,24]]),s("#53626c",[[5,16],[11,9],[20,7],[18,14],[10,20]]),s("#36454d",[[12,23],[19,16],[25,14],[24,21],[15,25]]);else if(s("#754e34",[[5,27],[8,29],[25,8],[22,5]]),s("#ca965f",[[5,25],[7,27],[24,6],[22,4]]),i>=17){const o=i===18||i===20,c=o?"#c3ccd0":"#e5c195",l=o?"#869398":"#b78a59";i<=18?(s(l,[[11,4],[17,3],[26,10],[29,16],[27,17],[23,12],[16,7],[10,7]]),s(c,[[9,4],[16,2],[23,5],[27,10],[25,12],[21,8],[15,5],[9,6]])):(s(l,[[17,5],[23,6],[28,10],[26,17],[19,17],[15,12]]),s(c,[[15,4],[22,4],[27,8],[24,14],[19,15],[13,10]]))}const a=t.toDataURL();return _l.set(i,a),a}function us(i){return'<img class="stamp" src="'+J0(i)+'" alt="" draggable="false">'}class Q0{constructor(e){this.send=e;const t=new URL(location.href),n=t.pathname.indexOf("/webcraft777/");this.portal=n<0?"../index.html":t.pathname.slice(0,n+1)+"index.html",Xe("game").style.setProperty("--cover",'url("'+new URL("./art/panorama.webp",document.baseURI).href+'")'),Xe("game").addEventListener("click",r=>this.click(r)),this.panel.addEventListener("submit",r=>this.submit(r)),this.panel.addEventListener("change",r=>this.change(r)),this.panel.addEventListener("input",r=>this.settingOutput(r.target));const s=r=>{const a=r.target;!a.closest('[data-hold="mine"]')||this.screen!=="play"||(r.preventDefault(),a.setPointerCapture?.(r.pointerId),this.startMining())};Xe("fallback").addEventListener("pointerdown",s),Xe("fallback").addEventListener("lostpointercapture",()=>this.stopMining()),window.addEventListener("pointerup",()=>this.stopMining()),window.addEventListener("pointercancel",()=>this.stopMining()),window.addEventListener("blur",()=>this.stopMining()),Xe("fallback").addEventListener("keydown",r=>{r.target.closest("[data-hold]")&&["Enter"," "].includes(r.key)&&(r.preventDefault(),this.startMining())}),Xe("fallback").addEventListener("keyup",()=>this.stopMining())}send;screen="title";panel=Xe("overlay");guideSeen=!1;guideTimer=0;inventoryState=null;noticeTimer=0;saveTimer=0;holding=!1;worldName="";portal;startMining(){this.holding||(this.holding=!0,this.send("mine-down"))}stopMining(){this.holding&&(this.holding=!1,this.send("mine-up"))}show(e,t,n=!1){this.stopMining(),window.clearTimeout(this.guideTimer);const s=["pause","ready","inventory"].includes(e)||["settings","help"].includes(e)&&!Xe("game").classList.contains("home");["title","create","worlds","error"].includes(e)?Xe("game").classList.add("home"):s&&Xe("game").classList.remove("home"),this.screen=e,Xe("game").dataset.screen=e,this.panel.hidden=!1,this.panel.className="overlay "+(e==="title"?"title-overlay":"panel-overlay"),this.panel.innerHTML=e==="title"?t:'<div class="panel'+(n?" wide":"")+'">'+t+"</div>",Xe("hud").hidden=!0,Xe("debug").hidden=!0,this.mining(0),this.panel.scrollTop=0}click(e){const t=e.target.closest("[data-action]");if(!t||t.disabled)return;const n=t.dataset.action;if(n==="select"){this.send(n,Number(t.dataset.slot));return}const s=Number(t.dataset.index),r=t.dataset.side??"bag";if(n==="assign"){if(e.shiftKey&&(this.inventoryState?.mode==="explore"||this.inventoryState?.chest)){const a=this.inventoryState.chest!==void 0;this.send(a?"transfer":"split",{side:r,index:s,half:!1})}else this.send(n,{id:Number(t.dataset.id),slot:this.inventoryState?.selected??0});return}if(["split","sort","transfer","transfer-all"].includes(n)){this.send(n,{index:s,side:r,half:t.dataset.half==="yes"});return}if(n==="supply"){this.send(n,{id:Number(t.dataset.id),count:e.shiftKey?64:1});return}if(n==="craft"){this.send(n,{id:t.dataset.id,count:Number(t.dataset.count??1)});return}if(["load","export","original","preset"].includes(n)){this.send(n,t.dataset.id);return}if(n==="dismiss-guide"){Xe("guide").hidden=!0,this.guideSeen=!0,this.send(n);return}this.send(n)}submit(e){e.preventDefault();const t=e.target;if(t.id!=="world-form")return;const n=new FormData(t),s=String(n.get("name")??"").trim();if(!s){this.toast("ワールド名を入力してください。"),t.querySelector("input")?.focus();return}this.send("start",{name:s,seed:String(n.get("seed")??"").trim(),mode:n.get("mode")==="creative"?"creative":"explore"})}change(e){const t=e.target;if(t.id==="world-import"){const n=t.files?.[0];n&&this.send("import",n),t.value="";return}if(t.closest("#setting-form")){const n=new FormData(Xe("setting-form"));this.send("settings-change",{distance:Number(n.get("distance")),scale:Number(n.get("scale")),shadows:n.has("shadows"),sensitivity:Number(n.get("sensitivity")),volume:Number(n.get("volume")),muted:n.has("muted"),quality:n.get("quality"),vegetation:n.has("vegetation"),effects:n.has("effects"),invertY:n.has("invertY"),bob:n.has("bob"),sprintFov:n.has("sprintFov"),ambientVolume:Number(n.get("ambientVolume")),effectsVolume:Number(n.get("effectsVolume"))})}}settingOutput(e){if(!(e instanceof HTMLInputElement)||e.type!=="range")return;const t=e.parentElement?.querySelector("output");t&&(t.textContent=this.valueLabel(e.name,Number(e.value)))}valueLabel(e,t){return e==="distance"?t+" チャンク":e==="sensitivity"?t.toFixed(1)+" 倍":Math.round(t*100)+"%"}setWorld(e){this.worldName=e}title(e){this.worldName="";const t='<a class="portal" href="'+Qt(this.portal)+'"><span aria-hidden="true">‹</span> TK777 ARCADE</a>';this.show("title",'<div class="title-stage">'+t+'<div class="title-main"><h1 aria-label="ウェブクラフト777"><span>ウェブクラフト</span><strong>777</strong></h1><div class="start-actions">'+Rt("goto-create",'<span>新しく始める</span><b aria-hidden="true">＋</b>',"primary")+Rt("goto-worlds",'<span>つづきから</span><b aria-hidden="true">›</b>')+'</div><div class="title-sub">'+Rt("goto-settings","設定")+Rt("goto-help","操作説明")+"</div></div></div>"),this.panel.querySelector('[data-action="goto-worlds"]')?.setAttribute("title",e?"保存したワールドを開く":"ワールド一覧とバックアップの読み込み")}create(){this.show("create",ls("ワールドを作る")+'<form id="world-form"><label class="entry">ワールド名<input name="name" value="はじまりの谷" required maxlength="64" autocomplete="off"></label><label class="entry">地形のシード<input name="seed" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label><fieldset><legend>ゲームモード</legend><div class="modes"><label><input type="radio" name="mode" value="explore" checked><span><b>探索</b><small>木や石を集め、道具と建材を作る。</small></span></label><label><input type="radio" name="mode" value="creative"><span><b>クリエイティブ</b><small>素材は無制限。空を飛んで建築する。</small></span></label></div></fieldset><button type="submit" class="primary full">ワールドを作成</button></form>')}worlds(e){const t=e.map(n=>{const s=new Date(n.updatedAt),r=Number.isFinite(s.getTime())?s.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",a=Qt(n.id),o=n.hasOriginal?'<button data-action="original" data-id="'+a+'">旧版の原本</button>':"";return"<li><div><strong>"+Qt(n.name)+"</strong><small>"+gl(n.mode)+"　"+r+'</small></div><div class="row-actions"><button class="primary" data-action="load" data-id="'+a+'">開く</button><button data-action="export" data-id="'+a+'">書き出す</button>'+o+"</div></li>"}).join("");this.show("worlds",ls("ワールド一覧")+(e.length?'<ul class="worlds">'+t+"</ul>":'<p class="empty">このブラウザーには保存したワールドがありません。</p>')+'<div class="actions">'+Rt("goto-create","新しく始める")+'<label class="file-btn">ファイルを読み込む<input id="world-import" type="file" accept=".json,application/json"></label></div>')}async confirmImport(e){const t=Xe("confirm-import");return Xe("confirm-body").textContent="保存済みの「"+e+"」を、読み込むファイルの状態で置き換えます。",t.returnValue="cancel",new Promise(n=>{t.addEventListener("close",()=>n(t.returnValue==="replace"),{once:!0}),t.showModal()})}loading(e){this.show("loading",'<div class="loading-mark" aria-hidden="true"></div><h1>読み込み中</h1><p role="status">'+Qt(e)+"</p>")}error(e){this.show("error",ls("ゲームを開始できません")+'<p class="error-message">'+Qt(e)+"</p>"+Rt("title","タイトルへ戻る","primary"))}pause(e=!1){this.show(e?"ready":"pause","<h1>"+(e?"ワールドの準備ができました":"一時停止")+'</h1><div class="pause-actions">'+Rt("resume",e?"プレイ開始":"再開","primary")+Rt("resume-drag","ドラッグ操作でプレイ")+(e?"":Rt("save","手動保存")+Rt("export","ファイルへ書き出す")+Rt("goto-settings","設定")+Rt("goto-help","操作説明"))+Rt("title","タイトルへ戻る")+"</div>")}play(e,t=!1){this.stopMining(),window.clearTimeout(this.guideTimer),this.screen="play",Xe("game").dataset.screen="play",Xe("game").classList.remove("home"),this.panel.hidden=!0,this.panel.replaceChildren(),Xe("hud").hidden=!1,Xe("fallback").hidden=!e;const n=Xe("guide");t&&(this.guideSeen=!1),n.hidden=!(t||e&&!this.guideSeen),n.innerHTML="<div><b>"+(e?"ドラッグ操作":"はじめの操作")+"</b>"+Rt("dismiss-guide","閉じる","guide-close")+"</div><p><kbd>WASD</kbd> 移動　<kbd>Space</kbd> ジャンプ　<kbd>E</kbd> 持ち物</p><p>"+(e?"画面をドラッグして見回します。「採掘」は長押し、「設置」はクリック。":"左クリック長押しで採掘、右クリックで設置。")+"</p>"+(e?'<a href="'+Qt(location.href)+'" target="_blank" rel="noopener">独立したタブで開く ↗</a>':""),!e&&t&&(this.guideTimer=window.setTimeout(()=>{this.screen==="play"&&!n.hidden&&(n.hidden=!0,this.guideSeen=!0,this.send("dismiss-guide"))},1e4))}help(){this.show("help",ls("操作説明")+'<dl class="keylist">'+[["W / A / S / D","移動"],["マウス / 矢印キー","視点を変える"],["Space / Shift","ジャンプ・水中で浮上 ／ ダッシュ"],["左クリック長押し","照準のブロックを採掘"],["右クリック","手に持っているブロックを設置"],["1 ～ 9 / ホイール","ホットバーを切り替える"],["C 長押し","しゃがむ。足場の端で踏みとどまり、低い坑道を通れる"],["Q / 中クリック","照準の建材を選ぶ"],["R","原木を縦・東西・南北に切り替える"],["右クリック / V","作業台・チェストを開く。しゃがんで右クリックすると隣に設置"],["Ctrl + Z","クリエイティブの通常ブロックを最大20回戻す。作業台とチェストは対象外"],["B / G","現在地を拠点に登録 ／ 探索目標の表示切り替え"],["E","持ち物・クラフトを開閉"],["Esc","一時停止"],["F","クリエイティブで飛行を切り替える"],["Space / Ctrl","飛行中に上昇 ／ 下降"],["F3","FPS・描画回数・チャンク数を表示"]].map(([e,t])=>"<div><dt>"+e+"</dt><dd>"+t+"</dd></div>").join("")+"</dl><h2>探索のはじめ方</h2><p>木の幹に近づいて採掘し、持ち物を開いて原木から木材と棒を作ります。木のツルハシで石を掘り、石の道具や建材を作りましょう。持ち物のアイコンを選ぶと、選択中のホットバー枠に登録できます。</p><h2>拠点と遠征</h2><p>木材4個で作業台、6個でチェストを作れます。床に置き、照準を合わせて右クリックで開きます。木の道具と灯晶ブロックを用意したら、拠点をBで登録して岩窟へ。潮晶を持ち帰ると、作業台で青緑色のランタンや象眼タイルを作れます。旧ワールドでは朝霧ガラスと石炭から潮晶を作れます。</p><h2>視点を固定できないとき</h2><p>画面をドラッグして見回し、画面上の採掘・設置ボタンを使えます。マウスによる自由な視点操作はゲームを独立したタブで開き、「再開」を押してください。</p><h2>保存とバックアップ</h2><p>進行はこのブラウザーに自動保存されます。一時停止から手動保存もできます。ブラウザーのデータ削除前や別のPCに移すときは、タイトルの「つづきから」でワールドを「書き出す」を選びます。復元は同じ一覧の「ファイルを読み込む」から行えます。</p>")}expedition(e,t,n){const s=Xe("journey"),r=Xe("bearing");s.hidden=!e,s.textContent!==e&&(s.textContent=e);const a=[t,n].filter(Boolean).join("　·　");r.textContent!==a&&(r.textContent=a)}target(e){const t=Xe("target-hint");t.textContent!==e&&(t.textContent=e),t.hidden=!e||this.screen!=="play"}settings(e){const t=(s,r,a,o,c,l)=>'<label class="range"><span>'+r+"</span><output>"+this.valueLabel(s,a)+'</output><input type="range" name="'+s+'" min="'+o+'" max="'+c+'" step="'+l+'" value="'+a+'"></label>',n=(s,r,a)=>'<label class="check"><input type="checkbox" name="'+s+'" '+(a?"checked":"")+">"+r+"</label>";this.show("settings",ls("設定")+'<form id="setting-form"><fieldset><legend>画面</legend><input type="hidden" name="quality" value="'+e.quality+'"><div class="quality-presets">'+Object.entries({low:"低",standard:"標準",high:"高"}).map(([s,r])=>'<button type="button" data-action="preset" data-id="'+s+'" aria-pressed="'+(e.quality===s)+'">'+r+"</button>").join("")+"</div>"+(e.quality==="legacy"?"<p>旧版の描画倍率を使用中です。プリセットを選ぶと新しい画質に切り替わります。</p>":"")+t("distance","描画距離",e.distance,2,6,1)+t("scale","解像度倍率",e.scale,.5,1.5,.05)+n("shadows","影を表示する",e.shadows)+"</fieldset><fieldset><legend>景色と動き</legend>"+n("vegetation","草花を表示する",e.vegetation)+n("effects","水面・葉の追加演出",e.effects)+n("bob","歩行時に視点を揺らす",e.bob)+n("sprintFov","ダッシュ時に視野を広げる",e.sprintFov)+"</fieldset><fieldset><legend>操作と音</legend>"+n("invertY","マウスの上下を反転する",e.invertY)+t("effectsVolume","効果音",e.effectsVolume,0,1,.05)+t("ambientVolume","環境音",e.ambientVolume,0,1,.05)+t("sensitivity","マウス感度",e.sensitivity,.3,2.5,.1)+t("volume","主音量",e.volume,0,1,.05)+n("muted","ミュート",e.muted)+"</fieldset></form>")}slots(e){return e.bar.map((t,n)=>'<button class="slot'+(e.selected===n?" selected":"")+'" data-action="select" data-slot="'+n+'" aria-pressed="'+(e.selected===n)+'" aria-label="'+(n+1)+"番 "+Qt(t?.name??"空き")+'"><small>'+(n+1)+"</small>"+(t?us(t.id)+"<em>"+Ia(t.count)+"</em>"+this.wear(t):"")+"</button>").join("")}wear(e){return e.durability!==void 0&&e.maxDurability?'<i class="wear" title="耐久 '+e.durability+" / "+e.maxDurability+'"><b style="width:'+Math.min(100,100*e.durability/e.maxDurability)+'%"></b></i>':""}hud(e){this.inventoryState=e;const t=e.bar[e.selected];Xe("hud-bar").innerHTML=this.slots(e),Xe("mode-tag").textContent=(this.worldName?this.worldName+"　／　":"")+gl(e.mode),Xe("equipped").textContent=t?t.name+"　"+Ia(t.count)+(t.durability!==void 0?"　耐久 "+t.durability+"/"+t.maxDurability:""):"素手"}inventory(e){const t=this.screen==="inventory",s=(t?this.panel.querySelector(".panel"):null)?.scrollTop??0,r=document.activeElement,a=t&&r?.dataset.action?Object.entries(r.dataset):null,o=!!this.panel.querySelector("details[open]");this.inventoryState=e;const c=m=>'<div class="storage-tools"><button data-action="sort" data-side="'+m+'">整理</button>'+(e.chest?'<button data-action="transfer-all" data-side="'+m+'">'+(m==="bag"?"すべて預ける":"すべて取り出す")+"</button>":"")+"</div>",l=(m,p)=>{const T=' data-index="'+m+'" data-side="'+p+'"';return'<div class="stack-actions">'+(e.chest?'<button data-action="transfer"'+T+">"+(p==="bag"?"預ける":"取る")+'</button><button data-action="transfer" data-half="yes"'+T+">半分</button>":'<button data-action="split"'+T+">分割</button>")+"</div>"},u=e.chest?"チェスト":e.benchUses!==void 0?"作業台":e.mode==="creative"?"ブロック一覧":"持ち物とクラフト",f=e.chest?"<section><h2>チェスト　"+e.chest.length+" / 27 枠</h2>"+c("chest")+(e.chest.length?'<div class="bag-grid">'+e.chest.map((m,p)=>'<div class="stack"><span>'+us(m.id)+" "+Qt(je[m.id].name)+" ×"+m.count+(m.durability?"　耐久 "+m.durability:"")+"</span>"+l(p,"chest")+"</div>").join("")+"</div>":'<p class="empty">まだ空です。所持品から預けられます。</p>')+"</section>":"",h=e.palette?'<details class="supply" '+(o?"open":"")+'><summary>建材を補充</summary><p>クリックで1個、Shift＋クリックで64個を所持品に加えます。</p><div class="bag-grid">'+e.palette.map(m=>'<button class="bag-item" data-action="supply" data-id="'+m.id+'">'+us(m.id)+Qt(m.name)+"</button>").join("")+"</div></details>":"",d=e.items.map((m,p)=>'<div class="stack"><button class="bag-item" type="button" data-index="'+p+'" data-action="assign" data-id="'+m.id+'">'+us(m.id)+"<b>"+Qt(m.name)+"</b><small>"+(m.durability!==void 0?"耐久 "+m.durability+"/"+m.maxDurability:"× "+Ia(m.count))+"</small>"+(vl[m.id]?"<small>"+vl[m.id]+"</small>":"")+this.wear(m)+"</button>"+(e.mode==="explore"||e.chest?l(p,"bag"):"")+"</div>").join(""),g=e.recipes.map(m=>"<li>"+us(m.itemId)+"<div><strong>"+Qt(m.outputs)+"</strong><small>"+Qt(m.ingredients)+"</small><small>"+m.equipment+"　"+(m.reason||(m.craftable?"制作可能 "+m.craftable+" 回":"所持品に空きがありません。"))+'</small></div><div class="craft-actions"><button data-action="craft" data-id="'+m.id+'" '+(m.craftable<1?"disabled":"")+">作る</button>"+(m.craftable>1?'<button data-action="craft" data-id="'+m.id+'" data-count="'+m.craftable+'">まとめて ×'+m.craftable+"</button>":"")+"</div></li>").join("");this.show("inventory",'<header class="panel-head"><h1>'+u+"</h1>"+Rt("back","閉じる <kbd>E</kbd>","back")+'</header><div class="inventory-bar"><h2>ホットバー</h2><div class="hotbar">'+this.slots(e)+"</div><p>数字1〜9かクリックで枠を選び、アイコンを押すと登録。"+(e.mode==="explore"?" Shift＋クリックで"+(e.chest?"移動":"分割")+"。":"")+(e.benchUses!==void 0?"　この作業台で制作 "+e.benchUses+" 回":"")+"</p></div>"+h+'<div class="inventory-columns'+(e.mode==="creative"&&!e.chest?" palette":"")+'"><section><h2>'+(e.mode==="creative"&&!e.chest?"建築ブロック":"所持品")+"</h2>"+(e.mode==="explore"||e.chest?c("bag"):"")+(d?'<div class="bag-grid">'+d+"</div>":'<p class="empty">'+(e.palette?"「建材を補充」を開くと、ここに素材を用意できます。":"まだ何も持っていません。木や土を採掘して集めましょう。")+"</p>")+"</section>"+(f||(e.mode==="creative"?"":'<section><h2>クラフト</h2><p class="ingredient-key">材料は所持数 / 必要数で表示します。</p><ul class="recipes">'+g+"</ul></section>"))+"</div>",!0);const _=this.panel.querySelector(".panel");_&&(_.scrollTop=s),a&&Array.from(this.panel.querySelectorAll("[data-action]")).find(m=>a.every(([p,T])=>m.dataset[p]===T))?.focus({preventScroll:!0})}mining(e){const t=Xe("mine-meter"),n=Math.round(Math.max(0,Math.min(1,Number.isFinite(e)?e:0))*100);t.hidden=n===0||this.screen!=="play",t.dataset.percent!==String(n)&&(t.dataset.percent=String(n),t.setAttribute("aria-valuenow",String(n)),t.style.setProperty("--progress",n+"%"))}debug(e){const t=Xe("debug");t.hidden=!e||this.screen!=="play",t.textContent!==e&&(t.textContent=e)}toast(e){const t=Xe("notice");t.textContent=e,t.hidden=!e,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{t.hidden=!0},2e3)}status(e){const t=Xe("save-status");t.textContent=e,t.hidden=!e,window.clearTimeout(this.saveTimer),!e.includes("中")&&!/失敗|できません/.test(e)&&(this.saveTimer=window.setTimeout(()=>{t.hidden=!0},3500))}}class e_{constructor(e,t){this.canvas=e,this.controls=t,document.addEventListener("pointerlockchange",()=>{const s=document.pointerLockElement===e,r=this.locked&&!s;if(this.locked=s,s&&!this.active){document.exitPointerLock();return}s?(this.drag=!1,this.controls.dragChanged(!1)):r&&this.active&&this.controls.pause()}),document.addEventListener("pointerlockerror",()=>this.fallback()),document.addEventListener("mousemove",s=>{this.active&&!this.drag&&document.pointerLockElement===e&&t.look(s.movementX,s.movementY)}),e.addEventListener("contextmenu",s=>s.preventDefault()),e.addEventListener("auxclick",s=>{this.active&&s.button===1&&s.preventDefault()}),e.addEventListener("pointerdown",s=>{if(this.active){if(s.preventDefault(),s.button===2){t.place();return}if(s.button===1){t.pick?.();return}if(s.button===0){if(!this.drag){this.mining=!0,t.beginMine();return}this.pointer=s.pointerId,this.last={x:s.clientX,y:s.clientY},e.setPointerCapture?.(s.pointerId)}}}),e.addEventListener("pointermove",s=>{!this.active||!this.drag||this.pointer!==s.pointerId||(t.look(s.clientX-this.last.x,s.clientY-this.last.y),this.last={x:s.clientX,y:s.clientY})});const n=s=>{s.button>0&&s.type==="pointerup"||this.pointer!==null&&s.pointerId!==void 0&&s.pointerId!==this.pointer||(this.mining=!1,this.pointer=null)};window.addEventListener("pointerup",n),window.addEventListener("pointercancel",n),e.addEventListener("lostpointercapture",n),e.addEventListener("wheel",s=>{!this.active||!s.deltaY||(s.preventDefault(),t.cycle(Math.sign(s.deltaY)))},{passive:!1}),window.addEventListener("keydown",s=>{if(!this.active||s.defaultPrevented)return;if(s.code==="KeyZ"&&(s.ctrlKey||s.metaKey)&&!s.altKey&&!s.shiftKey){s.preventDefault(),s.repeat||t.undo?.();return}if(s.altKey||s.metaKey||s.ctrlKey&&s.code!=="ControlLeft"&&s.code!=="ControlRight"&&!this.keys.has("ControlLeft")&&!this.keys.has("ControlRight"))return;if(["KeyW","KeyA","KeyS","KeyD","KeyC","Space","ShiftLeft","ShiftRight","ControlLeft","ControlRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(s.code)){s.preventDefault(),!s.repeat&&!this.keys.has(s.code)&&s.code==="Space"&&(this.jumpEdge=!0),s.repeat||this.keys.add(s.code);return}const r=/^Digit([1-9])$/.exec(s.code);!["Escape","KeyE","KeyF","F3","KeyQ","KeyR","KeyB","KeyG","KeyV"].includes(s.code)&&!r||(s.preventDefault(),!s.repeat&&(r?t.select(Number(r[1])-1):s.code==="Escape"?t.pause():s.code==="KeyE"?t.inventory():s.code==="KeyF"?t.fly():s.code==="KeyQ"?t.pick?.():s.code==="KeyR"?t.rotate?.():s.code==="KeyB"?t.home?.():s.code==="KeyG"?t.guide?.():s.code==="KeyV"?t.interact?.():t.debug()))}),window.addEventListener("keyup",s=>this.keys.delete(s.code)),window.addEventListener("blur",()=>{this.active&&t.pause(),this.reset()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.active&&t.pause(),this.reset(),t.background())})}canvas;controls;keys=new Set;active=!1;mining=!1;drag=!0;pointer=null;locked=!1;last={x:0,y:0};ticket=0;jumpEdge=!1;fallback(){!this.active||document.pointerLockElement===this.canvas||(this.drag=!0,this.controls.dragChanged(!0))}start(e){this.reset(),this.active=!0,this.drag=!0;const t=++this.ticket;if(this.canvas.focus({preventScroll:!0}),e||!this.canvas.requestPointerLock){this.fallback();return}try{const n=this.canvas.requestPointerLock();n&&typeof n.catch=="function"&&n.catch(()=>{t===this.ticket&&this.fallback()})}catch{this.fallback()}window.setTimeout(()=>{t===this.ticket&&!this.locked&&this.fallback()},700)}reset(){this.keys.clear(),this.mining=!1,this.pointer=null,this.jumpEdge=!1}stop(){this.active=!1,this.ticket++,this.reset(),document.pointerLockElement===this.canvas&&document.exitPointerLock()}movement(){const e=this.keys,t=this.jumpEdge;return this.jumpEdge=!1,{forward:Number(e.has("KeyW"))-Number(e.has("KeyS")),right:Number(e.has("KeyD"))-Number(e.has("KeyA")),jump:e.has("Space"),jumpPressed:t,sprint:e.has("ShiftLeft")||e.has("ShiftRight"),down:e.has("KeyC")||e.has("ControlLeft")||e.has("ControlRight")}}}const Ua=i=>Math.max(0,Math.min(1,i)),t_=["meadow","forest","shore","cave"];function n_(i,e){const t=Math.floor(e.x),n=Math.floor(e.y),s=Math.floor(e.z);if(e.inWater)return"shore";let r=0,a=0,o=0;for(const c of[-3,0,3])for(const l of[-3,0,3]){let u=!1,f=!1,h=!1;for(let d=1;d<=8;d++){const g=i.get(t+c,n+d,s+l);g===6&&(f=!0),[2,3,4,8,9,11,14,23].includes(g)&&(u=!0)}for(let d=-3;d<=1;d++)i.get(t+c,n+d,s+l)===13&&(h=!0);r+=Number(u),a+=Number(f),o+=Number(h)}return r>=5?"cave":o>=2?"shore":a>=2?"forest":"meadow"}const On={earth:{cut:960,pitch:85,width:1.05},stone:{cut:3200,pitch:181,width:.85},wood:{cut:1540,pitch:118,width:.95},sand:{cut:2400,pitch:72,width:1.3},foliage:{cut:3500,pitch:78,width:1.2},glass:{cut:5100,pitch:650,width:.74},water:{cut:1100,pitch:280,width:1.35}};function i_(i){return i===4?On.sand:i===6?On.foliage:i===13?On.water:[5,7,21,22].includes(i)?On.wood:[10,12,23,25,26].includes(i)?On.glass:[3,8,9,11,14].includes(i)?On.stone:On.earth}function s_(i,e){const s=i.createBuffer(1,128e3,16e3),r=s.getChannelData(0);let a=0,o=0;for(let l=0;l<r.length;l++){const u=l/16e3,f=Math.random()*2-1;a+=.035*(f-a),o+=.16*(f-o);const h=u/8*Math.PI*2,d=.73+.19*Math.sin(h)+.08*Math.sin(h*3+.7);let g=a*d;if(e==="forest"){g+=o*d*.36;for(const _ of[1.1,1.33,5.4]){const m=u-_;m>0&&m<.22&&(g+=.073*Math.sin(Math.PI*m/.22)**2*Math.sin(2*Math.PI*(1600*m+1050*m*m)))}}else if(e==="shore")g=a*.65+o*(.24+.3*(.5+.5*Math.sin(2*h))**3);else if(e==="cave"){g=a*.26+.022*Math.sin(h*448);for(const _ of[1.7,4.8,5.08]){const m=u-_;m>0&&m<.34&&(g+=.06*Math.min(1,m*200)*Math.exp(-16*m)*Math.sin(2*Math.PI*(835*m-180*m*m)))}}r[l]=g}const c=160;for(let l=0;l<c;l++){const u=l/c,f=r.length-c+l;r[f]=r[f]*(1-u)+r[0]*u}return s}class r_{ctx;master;effects;ambient;noise;vol=.45;muted=!1;effectsLevel=1;ambientLevel=.55;playing=!1;activeVoices=new Set;ambienceCache=new Map;layers=new Map;area="meadow";sampleIn=0;configure(e,t,n=1,s=.55){this.vol=Ua(e),this.muted=t,this.effectsLevel=Ua(n),this.ambientLevel=Ua(s);const r=this.ctx?.currentTime??0;this.master?.gain.setTargetAtTime(t?0:this.vol*.52,r,.025),this.effects?.gain.setTargetAtTime(this.effectsLevel,r,.025),this.ambient?.gain.setTargetAtTime(this.playing?this.ambientLevel*.7:0,r,.07)}unlock(){try{if(!this.ctx){const e=this.ctx=new AudioContext;this.master=e.createGain(),this.master.connect(e.destination),this.effects=e.createGain(),this.effects.connect(this.master),this.ambient=e.createGain(),this.ambient.gain.value=0,this.ambient.connect(this.master),this.noise=e.createBuffer(1,Math.ceil(e.sampleRate*.4),e.sampleRate);const t=this.noise.getChannelData(0);for(let n=0;n<t.length;n++)t[n]=Math.random()*2-1;this.configure(this.vol,this.muted,this.effectsLevel,this.ambientLevel)}this.ctx.resume().catch(()=>{})}catch{}}setPlaying(e){if(this.playing=e,this.sampleIn=0,!e){for(const n of this.activeVoices)try{n.stop()}catch{}this.activeVoices.clear();const t=this.ctx?.currentTime??0;for(const{gain:n,source:s}of this.layers.values())n.gain.cancelScheduledValues(t),n.gain.setTargetAtTime(0,t,.015),s.onended=()=>{s.disconnect(),n.disconnect()},s.stop(t+.09);this.layers.clear()}this.ctx&&this.ambient&&this.ambient.gain.setTargetAtTime(e?this.ambientLevel*.7:0,this.ctx.currentTime,.045)}environment(e,t,n){if(!this.playing||this.muted||!this.vol||!this.ambientLevel||this.ctx?.state!=="running"||!this.ambient||(this.sampleIn-=n,this.sampleIn>0))return;this.sampleIn=.36,this.area=n_(e,t);const s=this.ctx,r=s.currentTime;if(!this.layers.has(this.area)){const a=s.createBufferSource(),o=s.createGain();let c=this.ambienceCache.get(this.area);c||(c=s_(s,this.area),this.ambienceCache.set(this.area,c)),a.buffer=c,a.loop=!0,o.gain.value=0,a.connect(o),o.connect(this.ambient),a.start(),this.layers.set(this.area,{source:a,gain:o})}for(const a of t_)this.layers.get(a)?.gain.gain.setTargetAtTime(a===this.area?1:0,r,.32)}track(e,t){this.activeVoices.add(e),e.onended=()=>{this.activeVoices.delete(e),e.disconnect();for(const n of t)n.disconnect()}}sound(e,t=1){const n=this.ctx,s=this.effects;if(!n||!s||this.muted||!this.vol||!this.effectsLevel||n.state!=="running"||!this.playing&&e!=="craft")return;const r=e==="craft"?3:2;if(this.activeVoices.size+r>12)return;const a=.935+.13*Math.random(),o=(g,_,m,p,T,b=.81)=>{const M=n.createOscillator(),A=n.createGain(),R=n.currentTime+_;M.type=T,M.frequency.setValueAtTime(g,R),M.frequency.exponentialRampToValueAtTime(g*b,R+m),A.gain.setValueAtTime(1e-4,R),A.gain.linearRampToValueAtTime(p,R+.006),A.gain.exponentialRampToValueAtTime(1e-4,R+m),M.connect(A),A.connect(s),this.track(M,[A]),M.start(R),M.stop(R+m+.01)};if(e==="craft"){[440,554.37,740].forEach((g,_)=>o(g,_*.055,.15,.19,"sine",1));return}if(e==="pickup"){o(590,0,.09,.105,"sine",1.45);return}if(e==="break"){o(243*a,0,.13,.27,"triangle"),o(137,.08,.17,.23,"triangle");return}const c=i_(t),l=(e==="step"?.095:e==="tap"?.075:e==="mine"?.17:.105)*c.width,u=n.createBufferSource(),f=n.createGain(),h=n.createBiquadFilter(),d=n.currentTime;u.buffer=this.noise,u.playbackRate.value=a,h.type="lowpass",h.frequency.value=c.cut*a,f.gain.setValueAtTime(1e-4,d),f.gain.linearRampToValueAtTime(e==="step"||e==="tap"?.15:.3,d+.004),f.gain.exponentialRampToValueAtTime(1e-4,d+l),u.connect(h),h.connect(f),f.connect(s),this.track(u,[h,f]),u.start(d,.06*Math.random()),u.stop(d+l),o(c.pitch*a*(e==="place"?1.17:1),0,l,e==="step"?.13:.21,c===On.glass?"sine":"triangle")}}const ti=(i,e,t)=>typeof i=="number"&&Number.isFinite(i)&&i>=e&&i<=t,hs=(i,e,t)=>ti(i,e,t)&&Number.isInteger(i),Na=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),Fa=(i,e)=>typeof i=="string"&&i.trim().length>0&&i.length<=e;function a_(){try{return Ul(JSON.parse(localStorage.getItem("tk777.webcraft.settings")||"null"))}catch{}return{...Il}}function o_(i){try{localStorage.setItem("tk777.webcraft.settings",JSON.stringify(i))}catch{}}function Do(i){if(!Na(i)||i.format!=="webcraft777")throw new Error("ウェブクラフト777のワールドファイルを選んでください。");const e=i.version===1&&i.generator===1;if(!e&&(i.version!==2||i.generator!==1&&i.generator!==2))throw new Error("この保存形式または地形バージョンには対応していません。");if(e&&(!Na(i.settings)||!["distance","scale","shadows","sensitivity","volume","muted"].every(o=>Object.hasOwn(i.settings,o))))throw new Error("旧ワールドの設定が欠けています。元のバックアップを確認してください。");const t=e?Ul(i.settings):i.settings,n=e?Cl():i.fixtures,s=e?Dl():i.journey;if(!Pl(n)||!Ju(s))throw Error("設備または探検記録を読めません。元のバックアップを確認してください。");const r=i.pose;if(!Fa(i.id,64)||!/^[a-zA-Z0-9-]+$/.test(i.id)||!Fa(i.name,64)||!Fa(i.seed,128)||i.mode!=="creative"&&i.mode!=="explore"||!hs(i.revision,0,Number.MAX_SAFE_INTEGER)||!hs(i.updatedAt,0,864e13)||!Na(r)||!ti(r.x,0,256)||!ti(r.z,0,256)||!ti(r.y,-10,130)||!ti(r.yaw,-1e7,1e7)||!ti(r.pitch,-Math.PI/2,Math.PI/2)||!ti(i.day,0,1)||typeof i.guideSeen!="boolean"||typeof i.flying!="boolean"||r.crouched!==void 0&&typeof r.crouched!="boolean"||!hs(i.selected,0,8)||!zo(t)||!Fu(i.bag))throw new Error("ワールド情報・設定または所持品のデータが正しくありません。");if(e&&(i.bag.hotbar.some(o=>o>20)||i.bag.slots.some(o=>o.id>20)))throw new Error("旧ワールドの所持品に未対応の素材があります。");if(!Array.isArray(i.edits)||i.edits.length>256*256*95)throw new Error("ブロック変更のデータが正しくありません。");const a=new Map;for(const o of i.edits){if(!Array.isArray(o)||o.length!==2||!hs(o[0],65536,256*256*96-1)||!(e?hs(o[1],0,13):za(o[1]))||a.has(o[0]))throw new Error("ブロック変更に範囲外または重複した座標があります。");a.set(o[0],o[1])}if(n.chests.some(([o])=>a.get(o)!==22)||n.benches.some(([o])=>a.get(o)!==21)||n.axes.some(([o])=>a.has(o)&&a.get(o)!==5))throw Error("設備と建築記録が一致しません。");return{...i,version:2,settings:t,fixtures:n,journey:s}}function c_(i){let e;try{e=JSON.parse(i)}catch{throw new Error("ファイルを読めません。書き出したJSONファイルを選んでください。")}return{save:Do(e),original:e.version===1?e:void 0}}const l_=i=>JSON.stringify(i);class u_{constructor(e="tk777.webcraft777.v1"){this.database=e}database;connection;open(){return this.connection?this.connection:(this.connection=new Promise((e,t)=>{const n=indexedDB.open(this.database,2);n.onupgradeneeded=()=>{for(const s of["worlds","directory","originals"])n.result.objectStoreNames.contains(s)||n.result.createObjectStore(s,{keyPath:"id"})},n.onsuccess=()=>{n.result.onversionchange=()=>{n.result.close(),this.connection=void 0},e(n.result)},n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("ほかのタブのゲームを閉じてから、もう一度お試しください。"))}).catch(e=>{throw this.connection=void 0,e}),this.connection)}async list(){const e=await this.open();return new Promise((t,n)=>{const s=e.transaction(["directory","originals"]),r=s.objectStore("directory").getAll(),a=s.objectStore("originals").getAllKeys();s.oncomplete=()=>{const o=new Set(a.result);t(r.result.map(c=>({...c,hasOriginal:c.schemaVersion!==2||o.has(c.id)})).sort((c,l)=>l.updatedAt-c.updatedAt))},s.onabort=()=>n(s.error)})}async original(e){const t=await this.open();return new Promise((n,s)=>{const r=t.transaction(["originals","worlds"]).objectStore("originals").get(e);r.onsuccess=()=>{if(r.result){n(r.result);return}const a=r.transaction.objectStore("worlds").get(e);a.onsuccess=()=>n(a.result?.version===1?a.result:void 0),a.onerror=()=>s(a.error)},r.onerror=()=>s(r.error)})}async get(e){const t=await this.open(),n=await new Promise((s,r)=>{const a=t.transaction("worlds").objectStore("worlds").get(e);a.onsuccess=()=>s(a.result),a.onerror=()=>r(a.error)});if(n!==void 0)return Do(n)}async write(e,t){const n=Do(e),s=await this.open();return new Promise((r,a)=>{const o=s.transaction(["directory","worlds","originals"],"readwrite"),c=o.objectStore("directory"),l=c.get(e.id);let u,f=!1;l.onsuccess=()=>{if((l.result?.revision??null)!==t){f=!0,o.abort();return}const h=o.objectStore("worlds"),d=h.get(e.id);d.onsuccess=()=>{const M=d.result?.version===1?d.result:e.version===1?e:null;if(M){const A=o.objectStore("originals"),R=A.getKey(e.id);R.onsuccess=()=>{R.result===void 0&&A.add(M)}}},u={...n,revision:(t??0)+1,updatedAt:Date.now()};const{id:g,name:_,seed:m,mode:p,updatedAt:T,revision:b}=u;o.objectStore("worlds").put(u),c.put({id:g,name:_,seed:m,mode:p,updatedAt:T,revision:b,schemaVersion:2})},o.oncomplete=()=>r(u),o.onabort=()=>a(f?new Error("別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。"):o.error??new Error("保存が中断されました。"))})}}const di=document.querySelector("#scene");di.tabIndex=-1;const Wn=new u_,jt=new r_,re=new Q0((i,e)=>{ic(i,e).catch(t=>re.toast(Qi(t)))});let dt=null,ci="y",xs=0,Oa=0,br=0,Lo="";const tc=()=>jt.configure(Et.volume,Et.muted,Et.effectsVolume,Et.ambientVolume);let ie=null,Et=a_(),_n=!1,Ms=!1,Yr=!1,Or=!1,Tr="",Ar=0,Is=0,wr=0,Ba=Promise.resolve(!0),Oi=0,Ni=0,ms=0,Ss="",zs=!1;try{zs=!!di.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"})}catch{}const yu="WebGL 2を利用できません。ChromeまたはEdgeのハードウェア アクセラレーションを有効にして、ブラウザーを再起動してください。";function Qi(i){return i instanceof DOMException?i.name==="QuotaExceededError"?"ブラウザーの保存容量が不足しています。ファイルへ書き出してバックアップしてください。":i.name==="SecurityError"||i.name==="NotAllowedError"?"ブラウザーのサイト設定で、このページのローカル保存を許可してください。":"保存領域にアクセスできませんでした。他のタブを閉じ、空き容量を確認してください。":i instanceof Error&&/[ぁ-龯]/u.test(i.message)?i.message:"処理を完了できませんでした。ページを開き直してお試しください。"}function Eu(i){return{generator:i.world.generator,bench:dt?.id===21}}function qi(){const i=ie,e=$0(i.data.bag,i.data.mode,i.data.selected,Eu(i));return dt?.id===21&&(e.benchUses=i.world.benchUses(dt.x,dt.y,dt.z)),dt?.id===22&&(e.chest=i.world.chestAt(dt.x,dt.y,dt.z),i.data.mode==="creative"&&(e.palette=e.items,e.items=i.data.bag.slots.map(t=>({...t,name:je[t.id].name,maxDurability:je[t.id].maxDurability})))),e}function Yi(){if(!ie)return;const{world:i,data:e,player:t}=ie,n=e.journey,s=i.landmarks.find(a=>a.kind==="cave"),r=i.landmarks.find(a=>Math.hypot(a.x-t.x,a.z-t.z)<12);r&&r.kind!==Lo&&it.active&&re.toast(r.name+"　"+{grove:"大樹の根元で建築用の原木を採れます。",cave:"坑道の壁に潮晶の鉱脈があります。",ruin:"回廊の床には持ち帰れる象眼タイルがあります。"}[r.kind]),Lo=r?.kind??"",re.expedition(e.mode==="explore"&&!n.hidden?nh(n,i.generator):"",ih(n,t),e.mode==="explore"&&!n.hidden&&n.toolMade&&!n.caveVisited&&s?"岩窟 "+Ll(s,t):"")}function bu(i,e=!1){return!ie||!it.active?!1:!i||![21,22].includes(i.id)?(e&&re.toast("作業台かチェストに照準を合わせてください。"),!1):(dt=i,Kr(),re.inventory(qi()),!0)}function h_(){if(!ie)return;const{world:i,player:e,data:t}=ie,n=Ji(i,e);if(!n){re.toast("選びたい建材に照準を合わせてください。");return}const s=t.bag.hotbar.indexOf(n.id);if(t.mode==="explore"&&!vn(t.bag,n.id)){re.toast("この建材は所持品にありません。");return}if(s>=0){Us(s);return}El(t.bag,t.selected,n.id,t.mode)?(kn(),re.toast(je[n.id].name+"を選びました。")):re.toast("このブロックは選択できません。")}function f_(){if(!ie)return;if(ie.data.mode!=="creative"){re.toast("元に戻す操作はクリエイティブで使えます。");return}const i=ie,e=i.world.undo((t,n,s)=>ec(i.player,t,n,s));dn(),re.toast(e.message)}function kn(){ie&&(re.screen==="inventory"?re.inventory(qi()):re.screen==="play"&&re.hud(qi()))}function dn(){Tr="",Ar=0,xs=0,br=0,re.mining(0)}function Us(i){!ie||!Number.isInteger(i)||i<0||i>8||(ie.data.selected=i,dn(),kn())}function Kr(){it.stop(),ie&&V0(ie.player),jt.setPlaying(!1),dn(),Is=0,wr=0,Oi=0}function jr(){!ie||!it.active||(Kr(),re.pause())}function Tu(){!ie||!it.active||(dt=null,Kr(),re.inventory(qi()))}function d_(i){!ie||!it.active||(re.play(i,Or),re.hud(qi()),Yi())}function Io(i){!ie||!["ready","pause","inventory"].includes(re.screen)||(dt=null,Or=!ie.data.guideSeen,Yr=i,Oi=0,Ni=0,ms=0,re.play(i,Or),re.hud(qi()),Yi(),jt.unlock(),jt.setPlaying(!0),it.start(i))}function p_(i,e){if(!ie)return;const t=ie.player,n=.00235*Et.sensitivity;t.yaw=(t.yaw-i*n)%(2*Math.PI),t.pitch=Math.max(-1.55,Math.min(1.55,t.pitch-e*n*(Et.invertY?-1:1)))}function Au(){if(!ie||!it.active)return;const{world:i,player:e,data:t,view:n}=ie,s=Ji(i,e);if(!e.crouched&&bu(s))return;const r=s&&t.mode==="creative"?i.capture(s.x+s.nx,s.y+s.ny,s.z+s.nz):null,a=t.bag.hotbar[t.selected],o=Y0(i,e,t.bag,t.mode,t.selected,s);if(o.ok&&s){const c=s.x+s.nx,l=s.y+s.ny,u=s.z+s.nz;a===5&&i.setAxis(c,l,u,ci),r&&i.remember(r),t.mode==="explore"&&th(t.journey,a,{x:c,y:l,z:u})&&Yi(),n.effect(c,l,u,a,"place"),jt.sound("place",a),kn(),dn()}re.toast(o.message)}function nc(i){if(!ie||!it.active)return;const{world:e,player:t,data:n,view:s}=ie,r=Ji(e,t);if(!it.mining||!r){Tr&&dn();return}if(Is>0)return;const a=[r.x,r.y,r.z,r.id,n.selected].join("/");if(a!==Tr&&(dn(),Tr=a),r.id===14){re.toast("岩盤は掘れません。"),it.mining=!1,dn();return}const o=n.bag.hotbar[n.selected],c=n.mode==="creative"||vn(n.bag,o)?o:0,l=ku(r.id,c,n.mode);if(!Number.isFinite(l)){re.toast("この素材にはツルハシが必要です。"),it.mining=!1,dn();return}if(Ar+=i,xs=Math.min(1,Ar/l),re.mining(xs),br-=i,br<=0&&i>0&&xs<.96&&(jt.sound("tap",r.id),br=.32),Ar<l&&!(n.mode==="creative"&&i===0))return;const u=n.mode==="creative"?e.capture(r.x,r.y,r.z):null,f=q0(e,t,n.bag,n.mode,n.selected,r);f.ok?(u&&e.remember(u),s.effect(r.x,r.y,r.z,r.id,"mine"),jt.sound(f.message.includes("壊れ")?"break":"mine",r.id),n.mode==="explore"&&jt.sound("pickup"),kn()):it.mining=!1,re.toast(f.message),dn(),Is=n.mode==="creative"?.15:.11}const it=new e_(di,{pause:jr,inventory:Tu,place:Au,select:Us,look:p_,beginMine:()=>nc(0),pick:h_,undo:f_,rotate:()=>{ci=ci==="y"?"x":ci==="x"?"z":"y",re.toast("原木の向き　"+{x:"東西",y:"縦",z:"南北"}[ci])},interact:()=>{ie&&bu(Ji(ie.world,ie.player),!0)},home:()=>{if(ie){const{x:i,y:e,z:t}=ie.player;ie.data.journey.home={x:i,y:e,z:t},Yi(),re.toast("現在地を拠点に登録しました。")}},guide:()=>{ie&&(ie.data.journey.hidden=!ie.data.journey.hidden,Yi())},cycle:i=>{ie&&Us((ie.data.selected+i+9)%9)},fly:()=>{if(!ie)return;const{player:i,data:e}=ie;if(e.mode!=="creative"){re.toast("飛行はクリエイティブモードで使えます。");return}i.flying=!i.flying,i.vy=0,re.toast(i.flying?"飛行中：Spaceで上昇、Ctrlで下降":"飛行を終了しました。")},debug:()=>{Ms=!Ms,Ms||re.debug("")},dragChanged:d_,background:()=>{ie&&mi(ie)}});function wu(i){const{x:e,y:t,z:n,yaw:s,pitch:r}=i.player;return{...i.data,pose:{x:e,y:t,z:n,yaw:s,pitch:r,crouched:i.player.crouched},flying:i.player.flying,edits:i.world.exportEdits(),fixtures:i.world.exportFixtures(),journey:structuredClone(i.data.journey),settings:{...Et},bag:structuredClone(i.data.bag)}}function mi(i){return Ba=Ba.then(async()=>{if(i!==ie)return!0;re.status("保存中…");try{const e=await Wn.write(wu(i),i.data.revision||null);return i.data.revision=e.revision,i.data.updatedAt=e.updatedAt,re.status("保存済み"),!0}catch(e){return re.status("保存失敗："+Qi(e)),!1}}),Ba}async function Uo(){if(ie){const i=ie;if(Kr(),!await mi(i)&&!window.confirm("保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？")){re.pause();return}i.view.dispose(),ie=null}re.title(!1);try{const i=await Wn.list();re.screen==="title"&&re.title(!!i.length)}catch(i){re.screen==="title"&&re.status("保存領域："+Qi(i))}}async function xl(i,e){if(!(ie||_n)){if(!zs){re.error(yu);return}_n=!0;try{re.loading("森と湖を準備しています…");const t=i?await Wn.get(i):void 0;if(i&&!t)throw new Error("ワールドが見つかりません。一覧を開き直してください。");const n=t?.seed||e?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8);let s=-1;const r=await kr.generate(n,u=>{const f=Math.min(10,Math.floor(u*10));s!==f&&(re.loading("地形を生成中　"+f*10+"%"),s=f)},t?.generator??2);t&&(r.loadEdits(t.edits),r.loadFixtures(t.fixtures));const a=r.spawn(),o=t??{format:"webcraft777",version:2,generator:2,id:crypto.randomUUID(),fixtures:Cl(),journey:Dl(),revision:0,updatedAt:Date.now(),name:e.name.trim().slice(0,64)||"新しいワールド",seed:n,mode:e.mode,pose:a,flying:!1,bag:Ou(e.mode),selected:0,edits:[],day:.39,settings:{...Et},guideSeen:!1};if(!o.journey.home){const{x:u,y:f,z:h}=a;o.journey.home={x:u,y:f,z:h}}dt=null,ci="y",Lo="",Et={...o.settings},tc();const c=H0(G0(r,o.pose,!!t));c.flying=o.mode==="creative"&&o.flying;const l=new j0(di,r);ie={world:r,data:o,player:c,view:l},l.configure(Et),Ss="",re.setWorld(o.name),re.pause(!0),t||await mi(ie),Yr=!1,Ms=!1}catch(t){ie?.view.dispose(),ie=null,console.error(t),re.error(Qi(t))}finally{_n=!1}}}async function Ru(){try{const i=await Wn.list();re.worlds(i)}catch(i){re.worlds([]),re.status("保存失敗："+Qi(i))}}async function m_(i){if(!(!i||_n)){_n=!0;try{if(i.size>128*1024*1024)throw new Error("バックアップは128 MBまで読み込めます。");const{save:e,original:t}=c_(await i.text()),n=await kr.generate(e.seed,void 0,e.generator);n.loadEdits(e.edits),n.loadFixtures(e.fixtures);const s=(await Wn.list()).find(r=>r.id===e.id);if(s&&!await re.confirmImport(s.name))return;await Wn.write(t??e,s?.revision??null),await Ru(),re.status("読み込み・保存が完了しました。")}catch(e){re.status("読み込み失敗："+Qi(e))}finally{_n=!1}}}async function Ml(i,e=!1){const t=i?e?await Wn.original(i):await Wn.get(i):ie?wu(ie):void 0;if(e&&!t){re.toast("このワールドには旧版の保管データがありません。");return}if(!t)throw new Error("書き出すワールドが見つかりません。");const n=URL.createObjectURL(new Blob([l_(t)],{type:"application/json"})),s=document.createElement("a");s.href=n,s.download="ウェブクラフト777-"+t.name.replace(/[\\/:*?"<>|]/g,"_")+".json",document.body.append(s),s.click(),s.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),6e4),re.status("バックアップファイルを書き出しました。")}async function ic(i,e){if(!(_n&&!["resume","resume-drag","dismiss-guide"].includes(i)))switch(i){case"goto-create":re.create();break;case"goto-worlds":await Ru();break;case"goto-help":re.help();break;case"goto-settings":re.settings(Et);break;case"back":ie?re.screen==="inventory"?Io(Yr):re.pause():await Uo();break;case"title":if(!_n){_n=!0;try{await Uo()}finally{_n=!1}}break;case"start":jt.unlock(),await xl(null,e);break;case"load":jt.unlock(),await xl(e);break;case"resume":case"resume-drag":Io(i==="resume-drag");break;case"pause":jr();break;case"inventory":Tu();break;case"select":Us(e);break;case"assign":ie&&El(ie.data.bag,e.slot,e.id,ie.data.mode)&&(kn(),re.toast("ホットバーに登録しました。"));break;case"craft":if(ie&&ie.data.mode==="explore"&&re.screen==="inventory"){const t=e.count??1,n=e.id??e,s=zu(ie.data.bag,n,t,Eu(ie));s.ok&&(dt?.id===21&&ie.world.useBench(dt.x,dt.y,dt.z,t),Qu(ie.data.journey,n),jt.sound("craft"),kn()),re.toast(s.message)}break;case"mine-down":it.active&&(it.mining=!0,nc(0));break;case"mine-up":it.mining=!1,dn();break;case"place":Au();break;case"supply":{if(ie&&re.screen==="inventory"&&dt?.id===22){const t=qu(ie.data.bag,ie.data.mode,e.id,e.count);re.toast(t.message),t.ok&&kn()}break}case"split":case"sort":case"transfer":case"transfer-all":{if(!ie||re.screen!=="inventory")break;const t=ie.data.bag,n=dt?.id===22?ie.world.chestAt(dt.x,dt.y,dt.z):void 0,s=e?.side==="chest"?"chest":"bag",r=s==="bag"?t.slots:n;if(!r)break;const a=i==="sort"?Wu(r):i==="split"?Gu(r,e.index):n?i==="transfer-all"?Yu(t,n,s):Rl(t,n,s,e.index,e.half):void 0;a&&(re.toast(a.message),a.ok&&kn());break}case"preset":{if(Object.hasOwn(Cr,e)){const t=e;await ic("settings-change",{...Et,...Cr[t],quality:t}),re.settings(Et)}break}case"original":await Ml(e,!0);break;case"save":ie&&await mi(ie);break;case"settings-change":zo(e)&&(Et={...e},o_(Et),ie?.view.configure(Et),Ss="",tc());break;case"dismiss-guide":ie&&(ie.data.guideSeen=!0),Or=!1;break;case"import":await m_(e);break;case"export":await Ml(e);break}}document.addEventListener("keydown",i=>{if(i.repeat||i.defaultPrevented||it.active||document.querySelector("dialog[open]"))return;const e=/^Digit([1-9])$/.exec(i.code);if(re.screen==="inventory"&&e){i.preventDefault(),Us(Number(e[1])-1);return}re.screen==="inventory"&&(i.code==="KeyE"||i.code==="Escape")?(i.preventDefault(),i.code==="Escape"?re.pause():Io(Yr)):i.code==="Escape"&&["settings","help","create","worlds"].includes(re.screen)&&(i.preventDefault(),ic("back"))});di.addEventListener("webglcontextlost",i=>{i.preventDefault(),zs=!1,jr(),ie&&mi(ie),re.error("3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。")});window.addEventListener("pagehide",()=>{ie&&(it.active&&jr(),mi(ie))});window.setInterval(()=>{ie&&!document.hidden&&mi(ie)},25e3);function Cu(i){if(requestAnimationFrame(Cu),!ie||!zs||document.hidden){Oi=0;return}const e=ie,t=Oi?(i-Oi)/1e3:0,n=Math.min(t,.1);if(Oi=i,it.active){const u=e.player,f=it.movement(),h=u.x,d=u.z,g=it.keys;(g.has("ArrowRight")||g.has("ArrowLeft"))&&(u.yaw=(u.yaw+(Number(g.has("ArrowLeft"))-Number(g.has("ArrowRight")))*n*1.65)%(2*Math.PI)),(g.has("ArrowUp")||g.has("ArrowDown"))&&(u.pitch=Math.min(1.55,Math.max(-1.55,u.pitch+(Number(g.has("ArrowUp"))-Number(g.has("ArrowDown")))*n*1.3))),W0(e.world,u,f,n,Et),jt.environment(e.world,u,n),Oa-=n,Oa<=0&&(Oa=.24,e.data.mode==="explore"&&eh(e.data.journey,e.world,u,e.data.bag),Yi()),wr+=Math.hypot(h-u.x,d-u.z),wr>1.8&&(wr=0,u.grounded&&!u.flying&&jt.sound("step",e.world.get(Math.floor(u.x),Math.floor(u.y-.05),Math.floor(u.z)))),e.data.day=(e.data.day+n/600)%1,Is=Math.max(0,Is-n),nc(n)}const s=it.active?Ji(e.world,e.player):null;if(it.active)Ss="";else{const u=di.clientWidth+"/"+di.clientHeight+"/"+e.data.id;if(Ss===u&&!e.view.stats.queued)return;Ss=u}const r=e.data.bag.hotbar[e.data.selected],a=s&&[21,22].includes(s.id)&&!e.player.crouched,o=s&&!a&&je[r]?.block&&!it.mining?{x:s.x+s.nx,y:s.y+s.ny,z:s.z+s.nz,id:r,axis:ci,valid:!Su(e.world,e.player,e.data.bag,e.data.mode,e.data.selected,s)}:null;re.target(a?s.id===21?"右クリックで作業台":"右クリックでチェスト":"");const c=Math.hypot(e.player.vx,e.player.vz),l=e.data.mode==="creative"||vn(e.data.bag,r)?r:0;if(e.view.update(e.player,s,e.data.day,it.active?n:0,{active:it.active,held:l,mining:xs,preview:o,moving:Et.bob&&e.player.grounded&&c>.15,sprinting:c>4.5}),it.active&&Ms){if(ms++,!Ni)Ni=i,ms=0;else if(i-Ni>600){const{x:u,y:f,z:h}=e.player,d=e.view.stats;re.debug(Math.round(ms*1e3/(i-Ni))+" FPS　描画 "+d.draws+" 回　チャンク "+d.chunks+`
三角形 `+d.triangles.toLocaleString("ja-JP")+"　更新 "+d.chunkMs.toFixed(1)+" ms　待ち "+d.queued+`
形状 `+d.geometries+" 個　テクスチャ "+d.textures+` 個
座標 `+[u,f,h].map(g=>g.toFixed(1)).join(" / ")),ms=0,Ni=i}}}tc();Uo().then(()=>{zs||re.error(yu)});requestAnimationFrame(Cu);
