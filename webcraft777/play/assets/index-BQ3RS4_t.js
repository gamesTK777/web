(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const $a=27,hi=64,jn=30,zr={name:"滑り台パーツ",color:"#e5ab52",block:!0},Za=i=>i>=31&&i<=33?jn:i,Qt={1:{name:"草地",color:"#89ac57",block:!0},2:{name:"土",color:"#9a6e4a",block:!0},3:{name:"石",color:"#889594",block:!0},4:{name:"砂",color:"#e5cf91",block:!0},5:{name:"原木",color:"#926541",block:!0},6:{name:"葉",color:"#659650",block:!0},7:{name:"木材",color:"#c69562",block:!0},8:{name:"丸石",color:"#839593",block:!0},9:{name:"石レンガ",color:"#a1aaa0",block:!0},10:{name:"朝霧ガラス",color:"#b7e3db",block:!0},11:{name:"石炭鉱石",color:"#666e74",block:!0},12:{name:"灯晶ブロック",color:"#ffce68",block:!0},13:{name:"水",color:"#65b4cb",block:!1},14:{name:"岩盤",color:"#404b4c",block:!1},15:{name:"石炭",color:"#47545c",block:!1},16:{name:"棒",color:"#b28a60",block:!1},17:{name:"木のツルハシ",color:"#bd9265",block:!1,maxDurability:36},18:{name:"石のツルハシ",color:"#839fa7",block:!1,maxDurability:90},19:{name:"木の斧",color:"#c58e61",block:!1,maxDurability:36},20:{name:"石の斧",color:"#8ba39b",block:!1,maxDurability:90},21:{name:"作業台",color:"#bc905c",block:!0},22:{name:"収納チェスト",color:"#ba793e",block:!0},23:{name:"潮晶鉱石",color:"#58c2bf",block:!0},24:{name:"潮晶のかけら",color:"#6ce5db",block:!1},25:{name:"青磁のランタン",color:"#75e8d9",block:!0},26:{name:"潮晶の象眼タイル",color:"#72bfb0",block:!0},27:{name:"ジャンプ台（小）",color:"#62c8a2",block:!0},28:{name:"ジャンプ台（中）",color:"#6eaee8",block:!0},29:{name:"ジャンプ台（大）",color:"#d892dd",block:!0},30:zr,31:zr,32:zr,33:zr},Lt=(i,t)=>({id:i,count:t});function Ie(i,t,...e){return{id:i,name:Qt[t.id].name,inputs:e,output:t}}const Su=[Ie("boards",Lt(7,4),Lt(5,1)),Ie("sticks",Lt(16,4),Lt(7,2)),Ie("wood-pick",Lt(17,1),Lt(7,3),Lt(16,2)),Ie("wood-axe",Lt(19,1),Lt(7,3),Lt(16,2)),Ie("stone-pick",Lt(18,1),Lt(8,3),Lt(16,2)),Ie("stone-axe",Lt(20,1),Lt(8,3),Lt(16,2)),Ie("bricks",Lt(9,4),Lt(8,4)),Ie("glass",Lt(10,4),Lt(4,3),Lt(15,1)),Ie("lamp",Lt(12,2),Lt(7,2),Lt(15,1)),Ie("bench",Lt(21,1),Lt(7,4)),Ie("chest",Lt(22,1),Lt(7,6)),Ie("jump-small",Lt(27,1),Lt(7,4),Lt(16,2)),Ie("jump-medium",Lt(28,1),Lt(7,5),Lt(8,4)),Ie("jump-large",Lt(29,1),Lt(7,6),Lt(8,8)),Ie("slide-part",Lt(30,3),Lt(7,6)),{...Ie("crystal-lamp",Lt(25,2),Lt(24,1),Lt(12,1)),bench:!0},{...Ie("inlaid-tile",Lt(26,8),Lt(24,1),Lt(8,4)),bench:!0},{...Ie("crystal-cut",Lt(24,2),Lt(10,2),Lt(15,1)),bench:!0,legacy:!0}];function Ja(i){return typeof i=="number"&&Number.isInteger(i)&&Object.hasOwn(Qt,i)&&i!==13&&i!==14&&Za(i)===i}function al(i){if(!i||typeof i!="object")return!1;const{slots:t,hotbar:e}=i;return!Array.isArray(e)||e.length!==9||!Array.from(e).every(n=>n===0||Ja(n))?!1:Eu(t)}function Eu(i){return!Array.isArray(i)||i.length>$a?!1:Array.from(i).every(t=>{if(!t||!Ja(t.id)||!Number.isInteger(t.count)||t.count<1||t.count>hi)return!1;const e=Qt[t.id].maxDurability;return e===void 0?t.durability===void 0:t.count===1&&Number.isInteger(t.durability)&&t.durability>=1&&t.durability<=e})}function ff(i){return{slots:[],hotbar:i==="creative"?[1,2,3,5,7,8,9,10,12]:Array(9).fill(0)}}function Un(i,t){return i.slots.find(e=>e.id===t)}function vr(i,t){return i.slots.reduce((e,n)=>e+(n.id===t?n.count:0),0)}function wu(i,t,e,n){if(!Number.isInteger(t)||t<0||t>=9||!Ja(e)||(n==="creative"?!Qt[e].block:!Un(i,e)))return!1;const s=i.hotbar.indexOf(e);return s>=0&&(i.hotbar[s]=i.hotbar[t]),i.hotbar[t]=e,!0}const Qa=i=>({slots:i.slots.map(t=>({...t})),hotbar:[...i.hotbar]});function Tu(i,t){if(i.hotbar.includes(t))return;let e=i.hotbar.indexOf(0);e<0&&(e=i.hotbar.findIndex(n=>!Un(i,n))),e>=0&&(i.hotbar[e]=t)}function ol(i,t,e){const n=Qt[t].maxDurability;if(!n)for(const s of i.slots){if(s.id!==t)continue;const r=Math.min(e,hi-s.count);if(s.count+=r,e-=r,!e)break}for(;e>0;){if(i.slots.length>=$a)return!1;const s=n?1:Math.min(e,hi);i.slots.push(n?{id:t,count:1,durability:n}:{id:t,count:s}),e-=s}return Tu(i,t),!0}function Au(i,t,e){const n=i.slots.filter(s=>s.id===t).sort((s,r)=>s.count-r.count);for(const s of n){const r=Math.min(s.count,e);if(s.count-=r,e-=r,!e)break}i.slots=i.slots.filter(s=>s.count>0)}function cl(i,t){return Math.min(...t.inputs.map(e=>Math.floor(vr(i,e.id)/e.count)))}function Ru(i,t){for(const e of t.inputs)Au(i,e.id,e.count);return ol(i,t.output.id,t.output.count)}function ll(i,t,e){return t.legacy&&e?.generator!==1?"旧ワールド専用の加工です。":Cu(t,e?.generator??1)&&!e?.bench?"作業台を右クリックして作ります。":cl(i,t)?"":"材料が足りません。"}function Cu(i,t){return!!(i.bench||t===2&&["stone-pick","stone-axe","bricks","glass"].includes(i.id))}function pf(i,t,e){if(ll(i,t,e))return 0;const n=cl(i,t);if(!n)return 0;const s=Qa(i);let r=0;for(;r<n&&Ru(s,t);)r++;return r}function mf(i,t,e=1,n){const s=Su.find(o=>o.id===t);if(!s||!Number.isSafeInteger(e)||e<1)return{ok:!1,message:"レシピか制作数を確認してください。"};const r=ll(i,s,n);if(r)return{ok:!1,message:r};if(cl(i,s)<e)return{ok:!1,message:"材料が足りません。"};const a=Qa(i);for(let o=0;o<e;o++)if(!Ru(a,s))return{ok:!1,message:"所持品に空きがありません。"};return Object.assign(i,a),{ok:!0,message:s.name+"を"+s.output.count*e+"個作りました。"}}function gf(i,t,e){return Qt[i]?.block?e==="creative"?.12:i===23&&t!==17&&t!==18?1/0:[3,8,9,11,23,26].includes(i)?(i===11?2.6:1.85)*(t===18?.19:t===17?.34:1):[5,7,21,22].includes(i)?t===20?.29:t===19?.48:1.12:i===6||i===10?.24:.48:1/0}function Pu(i,t,e){if(!Qt[t]?.block)return{message:"この素材は採取できません。"};if(t===23&&(![17,18].includes(e)||!Un(i,e)))return{message:"潮晶鉱石には木か石のツルハシが必要です。"};const n=Qa(i),s=Un(n,e);let r=!1;s?.durability&&--s.durability<=0&&(n.slots.splice(n.slots.indexOf(s),1),r=!0);const a=t===3?8:t===11?15:t===23?24:Za(t),o=t===11||t===23?2:1;return ol(n,a,o)?{draft:n,message:Qt[a].name+" +"+o+(r?" ／ "+Qt[e].name+"が壊れました。":"")}:{message:"所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。"}}function Du(i,t){return!Qt[t]?.block||!Un(i,t)?!1:(Au(i,t,1),!0)}function _f(i,t){const e=i[t];if(!e||e.count<2)return{ok:!1,message:"2個以上の束を選んでください。"};if(i.length>=$a)return{ok:!1,message:"分割するための空き枠がありません。"};const n=Math.floor(e.count/2);return e.count-=n,i.splice(t+1,0,{id:e.id,count:n}),{ok:!0,message:"束を2つに分けました。"}}function vf(i){const t=[...i].sort((n,s)=>n.id-s.id||(n.durability??0)-(s.durability??0)),e=[];for(const n of t){const s=e.at(-1);let r=n.count;if(!n.durability&&s?.id===n.id){const a=Math.min(r,hi-s.count);s.count+=a,r-=a}r&&e.push({...n,count:r})}return i.splice(0,i.length,...e),{ok:!0,message:"同じ素材をまとめて整頓しました。"}}function xf(i,t,e,n){const s=i[e];if(!s||n<=0||n>s.count)return!1;const r=!!s.durability,a=$a-t.length,o=r?0:t.reduce((l,h)=>l+(h.id===s.id?hi-h.count:0),0);if(a*(r?1:hi)+o<n)return!1;let c=n;if(!r)for(const l of t){if(l.id!==s.id)continue;const h=Math.min(hi-l.count,c);if(l.count+=h,c-=h,!c)break}return c&&t.push({...s,count:c}),s.count-=n,s.count||i.splice(e,1),!0}function Lu(i,t,e,n,s=!1){const[r,a]=e==="bag"?[i.slots,t]:[t,i.slots],o=r[n];if(!o)return{ok:!1,message:"移す束を選んでください。"};const c=s?Math.ceil(o.count/2):o.count;return xf(r,a,n,c)?(e==="chest"&&Tu(i,o.id),{ok:!0,message:Qt[o.id].name+"を"+c+"個移しました。"}):{ok:!1,message:"移動先の空きが足りません。"}}function Mf(i,t,e,n){if(t!=="creative"||!Ja(e)||!Qt[e].block||![1,hi].includes(n))return{ok:!1,message:"建材と個数を確認してください。"};const s=Qa(i);return ol(s,e,n)?(Object.assign(i,s),{ok:!0,message:Qt[e].name+"を"+n+"個補充しました。"}):{ok:!1,message:"所持品の空きが足りません。"}}function yf(i,t,e){const n=e==="bag"?i.slots:t;let s=0;for(let r=n.length-1;r>=0;r--)Lu(i,t,e,r).ok&&s++;return{ok:s>0,message:s?s+"束を移しました。"+(n.length?"空き不足で残った束があります。":""):"移動できる束がありません。"}}function bf(i){const t=r=>Math.floor(i.noise(r,777)*9)-4,n=[{kind:"grove",name:"風待ちの大樹",x:91+t(1),z:150+t(2)},{kind:"cave",name:"潮晶の岩窟",x:163+t(3),z:151+t(4)},{kind:"ruin",name:"潮見の回廊",x:117+t(5),z:188+t(6)}].map(r=>({...r,y:Math.max(31,Math.min(48,i.ground(r.x,r.z)))+1})),s=(r,a,o,c,l)=>{const h=i.ground(r,a);for(let d=Math.min(h,o)-3;d<=o;d++)i.put(r,d,a,d===o?c:d>=o-2?2:3);for(let d=o+1;d<=Math.max(l,h+10);d++)i.put(r,d,a,0)};for(const r of n){const a=r.y-1,o=r.kind==="cave"?r.x-3:r.x,c=r.kind==="grove"?r.z-3:r.kind==="ruin"?r.z-5:r.z,l=Math.max(Math.abs(o-128),Math.abs(c-139));for(let h=2;h<=l;h++){const d=h/l,u=Math.round(128+(o-128)*d),f=Math.round(139+(c-139)*d),g=Math.min(1,Math.max(0,h-5)/(l-12)),_=32+Math.round((a-32)*g);for(let m=-1;m<=1;m++)for(let p=-1;p<=1;p++){const M=m===0&&p===0&&i.noise(u,f)>.68?8:1;s(u+m,f+p,_,M,_+3)}}if(r.kind==="grove"){for(let h=-6;h<=6;h++)for(let d=-6;d<=6;d++)h*h+d*d<38&&s(r.x+h,r.z+d,a,1,a+13);for(let h=0;h<2;h++)for(let d=0;d<2;d++)for(let u=1;u<=12;u++)i.put(r.x+h,a+u,r.z+d,5);for(const[h,d,u,f]of[[-3,0,4,10],[3,0,4,11],[0,-3,3,11],[0,3,4,12],[0,0,4,14]]){for(let g=1;g<=3;g++)i.put(r.x+Math.round(h*g/3),a+f-3+g,r.z+Math.round(d*g/3),5);for(let g=-u;g<=u;g++)for(let _=-u;_<=u;_++)for(let m=-2;m<=2;m++)(g*g+_*_)/(u*u)+m*m/5>1.12+i.noise(g+r.x,_+r.z)*.12||i.get(r.x+h+g,a+f+m,r.z+d+_)||i.put(r.x+h+g,a+f+m,r.z+d+_,6)}for(const[h,d]of[[-1,0],[2,1],[0,-1],[1,2]])i.put(r.x+h,a+1,r.z+d,5)}else if(r.kind==="cave"){for(let h=-3;h<=20;h++)for(let d=-9;d<=9;d++){const u=r.x+h,f=r.z+d,g=Math.max(0,1-((h-8)/13)**2-(d/9)**2);if(!g&&(h>2||Math.abs(d)>3))continue;const _=a+Math.round(g*8);s(u,f,_,1,_+4);for(let m=a-2;m<_;m++)i.put(u,m,f,3);if(h>=-3&&h<=15){const m=h<4?1:h<13?3:2;if(Math.abs(d)<=m){i.put(u,a,f,i.noise(u,f)>.72?8:3);for(let p=1;p<=(m===3?4:3);p++)i.put(u,a+p,f,0)}}}for(const[h,d,u]of[[5,1,-4],[6,2,-4],[7,2,-4],[9,1,4],[10,2,4],[11,1,4],[14,1,-3],[16,2,0]])i.put(r.x+h,a+d,r.z+u,23);for(const[h,d,u]of[[1,1,-2],[2,2,-2],[3,1,2]])i.put(r.x+h,a+d,r.z+u,11)}else{for(let h=-5;h<=5;h++)for(let d=-5;d<=5;d++){const u=r.x+h,f=r.z+d,_=Math.max(Math.abs(h),Math.abs(d))===5&&i.noise(u,f)<.45?8:Math.abs(h)<2&&d%3===0?26:9;s(u,f,a,_,a+9)}for(const h of[-4,4])for(const d of[-3,0,3]){const u=d===3?5:2+Math.floor(i.noise(r.x+h,r.z+d)*3);for(let f=1;f<=u;f++)i.put(r.x+h,a+f,r.z+d,f===1?8:9)}for(let h=-4;h<=4;h++)i.put(r.x+h,a+5,r.z+3,h===0?26:9)}}return n}const Ut=256,je=96,Sf=16,Rn=28,ai=Ut*Ut,ql=je/Sf,ka=ai*je,Je=128,Qe=139,Iu=()=>({axes:[],chests:[],benches:[]});function xr(i){return typeof i=="number"&&Number.isInteger(i)&&(i>=0&&i<=13||[21,22,23].includes(i)||i>=25&&i<=33)}function Uu(i){if(!i||typeof i!="object")return!1;const t=i,e=(n,s)=>{if(!Array.isArray(n)||n.length>ka-ai)return!1;const r=new Set;for(const a of n){if(!Array.isArray(a)||a.length!==2||!Number.isInteger(a[0])||a[0]<ai||a[0]>=ka||r.has(a[0])||!s(a[1]))return!1;r.add(a[0])}return!0};return e(t.axes,n=>n==="x"||n==="z")&&e(t.chests,Eu)&&e(t.benches,n=>Number.isSafeInteger(n)&&Number(n)>=0)}const Ne=(i,t,e)=>i+Ut*e+ai*t,Mr=(i,t,e)=>i+16*e+256*t;function Fi(i,t,e){return i>=0&&t>=0&&e>=0&&i<Ut&&t<je&&e<Ut}function hr(i){return i!==0&&i!==6&&i!==10&&i!==13&&!(i>=30&&i<=33)}function oi(i){return i!==0&&i!==13}function Ef(i,t,e){const n=[];for(let s=Math.max(0,t-1>>4);s<=Math.min(5,t+1>>4);s++)for(let r=Math.max(0,e-1>>4);r<=Math.min(15,e+1>>4);r++)for(let a=Math.max(0,i-1>>4);a<=Math.min(15,i+1>>4);a++)n.push(Mr(a,s,r));return n}function wf(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function Kt(i,t,e=0){let n=Math.imul(i^e,2654435761)^Math.imul(t,2246822519);return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),((n^n>>>16)>>>0)/4294967296}function ji(i,t,e,n){i/=e,t/=e;const s=Math.floor(i),r=Math.floor(t);let a=i-s,o=t-r;a=a*a*(3-2*a),o=o*o*(3-2*o);const c=Kt(s,r,n),l=Kt(s+1,r,n),h=Kt(s,r+1,n),d=Kt(s+1,r+1,n);return c+(l-c)*a+(h-c)*o+(c-l-h+d)*a*o}const sr=(i,t=0,e=1)=>Math.min(e,Math.max(t,i));function Ei(i,t,e){const n=sr((e-i)/(e-t));return n*n*(3-2*n)}class to{constructor(t,e=!1,n=1,s="classic"){if(this.stage=s,this.salt=wf(t),this.generator=n,!e)for(const r of this.generateTerrain());}stage;data=new Uint8Array(ka);highest=new Int16Array(ai);occupied=new Uint16Array(256*ql);dense=new Uint16Array(256*ql);lamps=new Set;salt;generator;landmarks=[];axes=new Map;chests=new Map;benches=new Map;history=[];heights=new Uint8Array(ai);edits=new Map;listeners=new Set;static async generate(t,e,n=1,s="classic"){const r=new to(t,!0,n,s);let a=performance.now();for(const o of r.generateTerrain())performance.now()-a<7&&o<1||(e?.(o),await new Promise(c=>setTimeout(c,0)),a=performance.now());return r}get(t,e,n){return Fi(t,e,n)&&Number.isInteger(t)&&Number.isInteger(e)&&Number.isInteger(n)?this.data[Ne(t,e,n)]:0}write(t,e,n,s){Fi(t,e,n)&&(this.data[Ne(t,e,n)]=s)}heightAt(t,e){const n=ji(t,e,47,this.salt),s=ji(t,e,31,this.salt^109),r=ji(t,e,11,this.salt^51);let a=22+n*18+Math.max(0,s-.47)*47+r*3;const o=Math.hypot((t-131)/1.55,e-111),c=Ei(o+(r-.5)*5,12,24);a=a*(1-c)+(25+r*2)*c;const l=Ei(Math.hypot(t-Je,e-Qe),5.4,14);a=a*(1-l)+(32+.3*r)*l;const h=Qe-e;if(h>4&&h<27){const u=Ei(Math.abs(t-(Je+2)),4,12),f=32-sr((h-4)/15)*6+.15*r;a-=Math.max(0,a-f)*u}const d=Ei(Math.hypot((t-118)/1.6,e-75),5,28);return a+=d*(8+7*r),sr(Math.floor(a),6,je-14)}lakeHeight(t,e){const n=11+ji(t,e,25,this.salt^3140)*4,s=Ei(Math.hypot((t-Je)/1.2,e-Qe),4,24),r=Ei(Math.hypot((t-92)/1.65,e-113),2,16),a=Ei(Math.hypot(t-154,(e-110)/1.75),2,13);return Math.floor(Math.max(n+(32-n)*s,n+(30-n)*Math.max(r,a)))}*generatePresetTerrain(){const t=this.stage==="flat";this.data.fill(14,0,ai);for(let e=0;e<Ut;e++){for(let n=0;n<Ut;n++){const s=t?32:this.lakeHeight(n,e);for(let r=1;r<=s;r++)this.data[Ne(n,r,e)]=r<s-3?3:t?r===s?1:2:4;if(!t)for(let r=s+1;r<=Rn;r++)this.data[Ne(n,r,e)]=13}e%4===3&&(yield .78*(e+1)/Ut)}yield*this.indexTerrain()}*generateTerrain(){if(this.stage!=="classic"){yield*this.generatePresetTerrain();return}for(let s=0;s<Ut;s++){for(let r=0;r<Ut;r++){const a=this.heightAt(r,s),o=a<=Rn+1||a<Rn+4&&ji(r,s,17,this.salt^311)>.65,c=r===0||s===0||r===Ut-1||s===Ut-1;this.heights[r+Ut*s]=a;for(let l=0;l<=Math.max(a,Rn);l++){const h=l===0||c&&l===a?14:l>a?13:l===a?o?4:1:l>=a-3?o?4:2:3;this.data[Ne(r,l,s)]=h}}s%4===3&&(yield .46*(s+1)/Ut)}let t=0;const e=()=>Kt(++t,319,this.salt),n=(s,r,a,o,c)=>{for(let l=-Math.ceil(c);l<=c;l++)for(let h=-Math.ceil(o);h<=o;h++)for(let d=-Math.ceil(o);d<=o;d++){if((d*d+h*h)/(o*o)+l*l/(c*c)>1)continue;const u=Math.floor(s)+d,f=Math.floor(r)+l,g=Math.floor(a)+h;if(f<2||u<=0||g<=0||u>=255||g>=255||!Fi(u,f,g))continue;const _=this.heights[u+Ut*g];_<=Rn&&f>=_-2||Math.abs(u-Je)<5&&Math.abs(g-Qe)<5&&f>27||this.write(u,f,g,0)}};for(let s=0;s<108;s++){let r=5+e()*246,a=5+e()*246,o=5+e()*(this.heights[(r|0)+Ut*(a|0)]-5),c=e()*Math.PI*2,l=(e()-.5)*.6;const h=17+Math.floor(e()*40);for(let d=0;d<h;d++){const u=1.65+1.15*Math.sin(Math.PI*d/h);n(r,o,a,u,u*.7),c+=(e()-.5)*.56,l=sr(l+(e()-.5)*.17,-.45,.45),r+=Math.cos(c),a+=Math.sin(c),o+=l}s%4===3&&(yield .46+.12*(s+1)/108)}for(let s=0;s<13;s++){const r=Je+12+s,a=Qe-2;n(r,this.heights[Je+12+Ut*a]+1-s*.4,a,2.5,2.2)}for(let s=0;s<1800;s++){const r=2+Math.floor(e()*252),a=2+Math.floor(e()*252),o=2+Math.floor(e()*(this.heights[r+Ut*a]-3));for(let c=0;c<8;c++){const l=r+Math.floor(e()*3)-1,h=a+Math.floor(e()*3)-1,d=o+Math.floor(e()*3)-1;this.get(l,d,h)===3&&this.write(l,d,h,11)}s%160===0&&(yield .59+.06*s/1800)}for(let s=-3;s<=3;s++)for(let r=-2;r<=2;r++){if(s*s*.55+r*r>4.8)continue;const a=Je+6+s,o=Qe-4+r,c=this.heights[a+Ut*o],l=s*s+r*r<3?2:1;for(let h=c-2;h<c+l;h++)this.write(a,h,o,3);s===0&&r===0&&this.write(a,c+1,o,11)}for(let s=0;s<51;s++){for(let r=0;r<51;r++){const a=r*5+1+Math.floor(Kt(r,s,this.salt^134)*3),o=s*5+1+Math.floor(Kt(r,s,this.salt^854)*3);if(Math.hypot(a-Je,o-Qe)<10||o<Qe&&o>Qe-26&&Math.abs(a-(Je+2))<5)continue;const c=ji(a,o,35,this.salt^482),l=.026+.75*sr((c-.38)*3.6);Kt(r,s,this.salt^723)<l&&this.tree(a,o)}s%3===2&&(yield .65+.13*(s+1)/51)}this.tree(Je-2,Qe-3,!0),this.tree(Je-7,Qe-7,!0),this.tree(Je+12,Qe-10,!0),this.generator===2&&(this.landmarks=bf({ground:(s,r)=>this.heights[s+Ut*r],noise:(s,r)=>Kt(s,r,this.salt^1911),get:(s,r,a)=>this.get(s,r,a),put:(s,r,a,o)=>this.write(s,r,a,o)})),yield*this.indexTerrain()}*indexTerrain(){this.highest.fill(-1);for(let t=0;t<je;t++){for(let e=0;e<Ut;e++)for(let n=0;n<Ut;n++){const s=this.data[Ne(n,t,e)];if(!s)continue;const r=Mr(n>>4,t>>4,e>>4);this.occupied[r]++,hr(s)&&this.dense[r]++,oi(s)&&s!==10&&(this.highest[n+Ut*e]=t)}t%4===3&&(yield .78+.22*(t+1)/je)}}tree(t,e,n=!1){const s=this.heights[t+Ut*e];if(this.get(t,s,e)!==1||this.get(t,s+1,e)!==0)return;const r=Kt(t,e,this.salt^813),a=!n&&r>.68,o=(a?6:4)+Math.floor(Kt(t,e,this.salt^102)*3);for(let h=1;h<=o;h++)this.write(t,s+h,e,5);const c=a?3:o-1,l=o+2;for(let h=c;h<=l;h++){const d=a?Math.min(2,Math.ceil((l-h)*.43)):h===l?1:2;for(let u=-d;u<=d;u++)for(let f=-d;f<=d;f++)Math.abs(u)===d&&Math.abs(f)===d&&d>0&&(a||Kt(t+u,e+f,this.salt^h)<.72)||!Fi(t+u,s+h,e+f)||this.get(t+u,s+h,e+f)!==0||this.write(t+u,s+h,e+f,6)}}spawn(){for(let t=0;t<32;t++)for(let e=-t;e<=t;e++)for(let n=-t;n<=t;n++){if(Math.max(Math.abs(n),Math.abs(e))!==t)continue;const s=Je+n,r=Qe+e;for(let a=je-3;a>0;a--){const o=this.get(s,a,r);if(!(!oi(o)||o===6||o===5||this.get(s,a+1,r)!==0||this.get(s,a+2,r)!==0))return{x:s+.5,y:a+1.001,z:r+.5,yaw:-.075,pitch:-.085}}}return{x:Je+.5,y:je+.01,z:Qe+.5,yaw:0,pitch:0}}onEdit(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}set(t,e,n,s){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(n)||!Fi(t,e,n)||!xr(s)||e===0)return!1;const r=Ne(t,e,n),a=this.data[r];if(a===s||a===14||a===22&&this.chests.get(r)?.length)return!1;const o=this.edits.get(r)?.base??a;return s===o?this.edits.delete(r):this.edits.set(r,{id:s,base:o}),this.replace(t,e,n,s),!0}replace(t,e,n,s){const r=Ne(t,e,n),a=this.data[r],o=Mr(t>>4,e>>4,n>>4);this.data[r]=s,this.axes.delete(r),this.chests.delete(r),this.benches.delete(r),this.occupied[o]+=+(s!==0)-+(a!==0),this.dense[o]+=Number(hr(s))-Number(hr(a)),(a===12||a===25)&&this.lamps.delete(r),(s===12||s===25)&&this.lamps.add(r);const c=t+Ut*n;if(e>=this.highest[c]){let l=Math.max(e,this.highest[c]);for(;l>=0&&(!oi(this.data[Ne(t,l,n)])||this.data[Ne(t,l,n)]===10);)l--;this.highest[c]=l}for(const l of this.listeners)l(t,e,n)}exportEdits(){return Array.from(this.edits,([t,{id:e}])=>[t,e])}loadEdits(t){const e=new Set;for(const[n,s]of t){if(!Number.isInteger(n)||n<ai||n>=ka||!xr(s)||e.has(n)||(this.edits.get(n)?.base??this.data[n])===14)throw new Error("地形の変更データが不正です。");e.add(n)}this.history=[],this.axes.clear(),this.benches.clear(),this.chests.clear();for(const[n,{base:s}]of this.edits)this.replace(n%256,n>>>16,n>>>8&255,s);this.edits.clear();for(const[n,s]of t)this.set(n%256,n>>>16,n>>>8&255,s)}axisAt(t,e,n){return this.axes.get(Ne(t,e,n))??"y"}setAxis(t,e,n,s){if(this.get(t,e,n)!==5||!["x","y","z"].includes(s))return!1;if(this.axisAt(t,e,n)===s)return!0;const r=Ne(t,e,n);s==="y"?this.axes.delete(r):this.axes.set(r,s);for(const a of this.listeners)a(t,e,n);return!0}chestAt(t,e,n){if(this.get(t,e,n)!==22)return;const s=Ne(t,e,n),r=this.chests.get(s)??[];return this.chests.set(s,r),r}benchUses(t,e,n){return this.benches.get(Ne(t,e,n))??0}useBench(t,e,n,s=1){this.get(t,e,n)!==21||!Number.isSafeInteger(s)||s<1||this.benches.set(Ne(t,e,n),Math.min(Number.MAX_SAFE_INTEGER,this.benchUses(t,e,n)+s))}exportFixtures(){return{axes:[...this.axes],benches:[...this.benches],chests:[...this.chests].filter(([,t])=>t.length).map(([t,e])=>[t,e.map(n=>({...n}))])}}loadFixtures(t){if(!Uu(t)||t.axes.some(([n])=>this.data[n]!==5)||t.chests.some(([n])=>this.data[n]!==22)||t.benches.some(([n])=>this.data[n]!==21))throw new Error("建具と地形の保存内容が一致しません。元のバックアップを確認してください。");const e=new Set([...this.axes.keys(),...t.axes.map(([n])=>n)]);this.axes=new Map(t.axes),this.benches=new Map(t.benches),this.chests=new Map(t.chests.map(([n,s])=>[n,s.map(r=>({...r}))]));for(const n of e)for(const s of this.listeners)s(n%256,n>>>16,n>>>8&255)}capture(t,e,n){return{x:t,y:e,z:n,id:this.get(t,e,n),axis:this.axisAt(t,e,n)}}remember(t){const e=this.capture(t.x,t.y,t.z);t.id===21||t.id===22||e.id===21||e.id===22||t.id===e.id&&t.axis===e.axis||(this.history.push({before:t,after:e}),this.history.length>20&&this.history.shift())}undo(t){const e=this.history.at(-1);if(!e)return{ok:!1,message:"戻せる通常ブロックの編集がありません。作業台・チェストは対象外です。"};const{before:n,after:s}=e,{x:r,y:a,z:o}=n;return this.get(r,a,o)!==s.id||this.axisAt(r,a,o)!==s.axis?(this.history.pop(),{ok:!1,message:"この場所はすでに変化したため、戻せません。"}):oi(n.id)&&t(r,a,o)?{ok:!1,message:"体と重なります。少し離れてから戻してください。"}:n.id!==s.id&&!this.set(r,a,o,n.id)?{ok:!1,message:"この編集は戻せません。"}:(n.id===5&&this.setAxis(r,a,o,n.axis),this.history.pop(),{ok:!0,message:"直前のブロック編集を戻しました。"})}}function Nu(){return{toolMade:!1,caveVisited:!1,decorated:!1,hidden:!1,home:null}}function Fu(i){if(!i||typeof i!="object")return!1;const t=i;if(![t.toolMade,t.caveVisited,t.decorated,t.hidden].every(n=>typeof n=="boolean")||t.caveVisited&&!t.toolMade||t.decorated&&!t.caveVisited)return!1;const e=t.home;return e===null||!!e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=0&&e.x<256&&e.z>=0&&e.z<256&&e.y>=0&&e.y<96}function Tf(i,t){["wood-pick","wood-axe","stone-pick","stone-axe"].includes(t)&&(i.toolMade=!0)}function Af(i,t,e,n){if(!i.toolMade||i.caveVisited||!(vr(n,12)||vr(n,25)))return!1;const s=t.landmarks.find(r=>r.kind==="cave");if(s){if(e.x<s.x+2||e.x>s.x+16||Math.abs(e.z-s.z-.5)>3.8||Math.abs(e.y-s.y)>2.1)return!1}else{const r=Math.floor(e.x),a=Math.floor(e.z),o=Math.floor(e.y);let c=!1;for(let l=o+2;l<=Math.min(o+9,95);l++)if([2,3,8,11].includes(t.get(r,l,a))){c=!0;break}if(!c)return!1}return i.caveVisited=!0,!0}function ku(i,t,e){return!i.caveVisited||i.decorated||!i.home||t!==25&&t!==26||Math.hypot(e.x-i.home.x,e.y-i.home.y,e.z-i.home.z)>18?!1:(i.decorated=!0,!0)}function Rf(i,t){return i.toolMade?i.caveVisited?i.decorated?"3/3 達成　拠点に潮晶の飾りが加わりました":t===2?"3/3　潮晶を持ち帰り、作業台で作った灯りかタイルを拠点に飾ろう":"3/3　作業台でガラスと石炭を潮晶に加工し、灯りかタイルを拠点に飾ろう":t===2?"2/3　灯晶ブロックを持って、潮晶の岩窟へ":"2/3　灯晶ブロックを持って、岩天井の洞窟へ":"1/3　原木を集め、木材と棒で木の道具を作ろう"}function Ou(i,t){const e=i.x-t.x,n=i.z-t.z,s=Math.round(Math.hypot(e,n));if(s<2)return"足元";const r=Math.atan2(e,-n)+t.yaw;return["↑","↗","→","↘","↓","↙","←","↖"][(Math.round(r/(Math.PI/4))%8+8)%8]+" 約"+s+"m"}function Cf(i,t){return i.home?"拠点 "+Ou(i.home,t):""}const Oa={low:{distance:2,scale:.7,shadows:!1,vegetation:!1,effects:!1},standard:{distance:3,scale:1,shadows:!0,vegetation:!0,effects:!0},high:{distance:5,scale:1.2,shadows:!0,vegetation:!0,effects:!0}},zu={...Oa.standard,quality:"standard",sensitivity:1,volume:.45,muted:!1,effectsVolume:.85,ambientVolume:.4,invertY:!1,bob:!0,sprintFov:!0},Br=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e;function hl(i){if(!i||typeof i!="object")return!1;const t=i;return(t.quality==="legacy"||Object.hasOwn(Oa,t.quality))&&Number.isInteger(t.distance)&&Br(t.distance,2,6)&&Br(t.scale,.5,1.5)&&Br(t.sensitivity,.3,2.5)&&[t.volume,t.effectsVolume,t.ambientVolume].every(e=>Br(e,0,1))&&[t.shadows,t.vegetation,t.effects,t.muted,t.invertY,t.bob,t.sprintFov].every(e=>typeof e=="boolean")}function Bu(i){if(!i||typeof i!="object")throw Error("保存された設定を読み込めません。");const t={...zu,quality:"legacy",...i};if(!hl(t))throw Error("保存された設定の値が正しくありません。");return t}const ul="180",Pf=0,Yl=1,Df=2,Hu=1,Lf=2,Vn=3,mi=0,Ke=1,yn=2,ui=0,xs=1,jl=2,Kl=3,$l=4,If=5,ki=100,Uf=101,Nf=102,Ff=103,kf=104,Of=200,zf=201,Bf=202,Hf=203,oc=204,cc=205,Vf=206,Gf=207,Wf=208,Xf=209,qf=210,Yf=211,jf=212,Kf=213,$f=214,lc=0,hc=1,uc=2,Es=3,dc=4,fc=5,pc=6,mc=7,Vu=0,Zf=1,Jf=2,Wn=0,Qf=1,tp=2,ep=3,np=4,ip=5,sp=6,rp=7,Gu=300,ws=301,Ts=302,gc=303,_c=304,eo=306,vc=1e3,Bi=1001,xc=1002,Pe=1003,ap=1004,rr=1005,Cn=1006,lo=1007,ci=1008,Kn=1009,Wu=1010,Xu=1011,yr=1012,dl=1013,Wi=1014,Pn=1015,Lr=1016,fl=1017,pl=1018,br=1020,qu=35902,Yu=35899,ju=1021,Ku=1022,En=1023,Sr=1026,Er=1027,Ir=1028,ml=1029,$u=1030,gl=1031,_l=1033,Ea=33776,wa=33777,Ta=33778,Aa=33779,Mc=35840,yc=35841,bc=35842,Sc=35843,Ec=36196,wc=37492,Tc=37496,Ac=37808,Rc=37809,Cc=37810,Pc=37811,Dc=37812,Lc=37813,Ic=37814,Uc=37815,Nc=37816,Fc=37817,kc=37818,Oc=37819,zc=37820,Bc=37821,Hc=36492,Vc=36494,Gc=36495,Wc=36283,Xc=36284,qc=36285,Yc=36286,op=3200,cp=3201,lp=0,hp=1,ri="",Be="srgb",As="srgb-linear",za="linear",ae="srgb",Ki=7680,Zl=519,up=512,dp=513,fp=514,Zu=515,pp=516,mp=517,gp=518,_p=519,jc=35044,vp=35048,Jl="300 es",Dn=2e3,Ba=2001;class Ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ql=1234567;const Ms=Math.PI/180,wr=180/Math.PI;function Xn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function vl(i,t){return(i%t+t)%t}function xp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Mp(i,t,e){return i!==t?(e-i)/(t-i):0}function ur(i,t,e){return(1-e)*i+e*t}function yp(i,t,e,n){return ur(i,t,1-Math.exp(-e*n))}function bp(i,t=1){return t-Math.abs(vl(i,t*2)-t)}function Sp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ep(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function wp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Tp(i,t){return i+Math.random()*(t-i)}function Ap(i){return i*(.5-Math.random())}function Rp(i){i!==void 0&&(Ql=i);let t=Ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Cp(i){return i*Ms}function Pp(i){return i*wr}function Dp(i){return(i&i-1)===0&&i!==0}function Lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ip(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Up(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function bn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ar={DEG2RAD:Ms,RAD2DEG:wr,generateUUID:Xn,clamp:Yt,euclideanModulo:vl,mapLinear:xp,inverseLerp:Mp,lerp:ur,damp:yp,pingpong:bp,smoothstep:Sp,smootherstep:Ep,randInt:wp,randFloat:Tp,randFloatSpread:Ap,seededRandom:Rp,degToRad:Cp,radToDeg:Pp,isPowerOfTwo:Dp,ceilPowerOfTwo:Lp,floorPowerOfTwo:Ip,setQuaternionFromProperEuler:Up,normalize:se,denormalize:bn};class jt{constructor(t=0,e=0){jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ur{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||c!==u||l!==f||h!==g){let m=1-o;const p=c*u+l*f+h*g+d*_,M=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const A=Math.sqrt(E),T=Math.atan2(A,p*M);m=Math.sin(m*T)/A,o=Math.sin(o*T)/A}const y=o*M;if(c=c*m+u*y,l=l*m+f*y,h=h*m+g*y,d=d*m+_*y,m===1-o){const A=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=A,l*=A,h*=A,d*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-o*f,t[e+2]=l*g+h*f+o*u-c*d,t[e+3]=h*g-o*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(th.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ho.copy(this).projectOnVector(t),this.sub(ho)}reflect(t){return this.sub(ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ho=new I,th=new Ur;class zt{constructor(t,e,n,s,r,a,o,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],E=s[4],y=s[7],A=s[2],T=s[5],C=s[8];return r[0]=a*_+o*M+c*A,r[3]=a*m+o*E+c*T,r[6]=a*p+o*y+c*C,r[1]=l*_+h*M+d*A,r[4]=l*m+h*E+d*T,r[7]=l*p+h*y+d*C,r[2]=u*_+f*M+g*A,r[5]=u*m+f*E+g*T,r[8]=u*p+f*y+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(s*l-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=u*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(uo.makeScale(t,e)),this}rotate(t){return this.premultiply(uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const uo=new zt;function Ju(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ha(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Np(){const i=Ha("canvas");return i.style.display="block",i}const eh={};function Tr(i){i in eh||(eh[i]=!0,console.warn(i))}function Fp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const nh=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ih=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kp(){const i={enabled:!0,workingColorSpace:As,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=ys(s.r),s.g=ys(s.g),s.b=ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?za:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Tr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Tr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[As]:{primaries:t,whitePoint:n,transfer:za,toXYZ:nh,fromXYZ:ih,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:nh,fromXYZ:ih,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}}),i}const Jt=kp();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let $i;class Op{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{$i===void 0&&($i=Ha("canvas")),$i.width=t.width,$i.height=t.height;const s=$i.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=$i}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ha("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qn(e[n]/255)*255):e[n]=qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let zp=0;class xl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=Xn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(fo(s[a].image)):r.push(fo(s[a]))}else r=fo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function fo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Op.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bp=0;const po=new I;class He extends Ns{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,n=Bi,s=Bi,r=Cn,a=ci,o=En,c=Kn,l=He.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Xn(),this.name="",this.source=new xl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(po).x}get height(){return this.source.getSize(po).y}get depth(){return this.source.getSize(po).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vc:t.x=t.x-Math.floor(t.x);break;case Bi:t.x=t.x<0?0:1;break;case xc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vc:t.y=t.y-Math.floor(t.y);break;case Bi:t.y=t.y<0?0:1;break;case xc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=Gu;He.DEFAULT_ANISOTROPY=1;class we{constructor(t=0,e=0,n=0,s=1){we.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,y=(f+1)/2,A=(p+1)/2,T=(h+u)/4,C=(d+_)/4,L=(g+m)/4;return E>y&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=C/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=L/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=L/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hp extends Ns{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new He(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new xl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xi extends Hp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Qu extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vp extends He{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(t.matrixWorld),this.expandByPoint(vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hr.copy(n.boundingBox)),Hr.applyMatrix4(t.matrixWorld),this.union(Hr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vn),vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vs),Vr.subVectors(this.max,Vs),Zi.subVectors(t.a,Vs),Ji.subVectors(t.b,Vs),Qi.subVectors(t.c,Vs),Jn.subVectors(Ji,Zi),Qn.subVectors(Qi,Ji),wi.subVectors(Zi,Qi);let e=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-wi.z,wi.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,wi.z,0,-wi.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-wi.y,wi.x,0];return!mo(e,Zi,Ji,Qi,Vr)||(e=[1,0,0,0,1,0,0,0,1],!mo(e,Zi,Ji,Qi,Vr))?!1:(Gr.crossVectors(Jn,Qn),e=[Gr.x,Gr.y,Gr.z],mo(e,Zi,Ji,Qi,Vr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const kn=[new I,new I,new I,new I,new I,new I,new I,new I],vn=new I,Hr=new vi,Zi=new I,Ji=new I,Qi=new I,Jn=new I,Qn=new I,wi=new I,Vs=new I,Vr=new I,Gr=new I,Ti=new I;function mo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ti.fromArray(i,r);const o=s.x*Math.abs(Ti.x)+s.y*Math.abs(Ti.y)+s.z*Math.abs(Ti.z),c=t.dot(Ti),l=e.dot(Ti),h=n.dot(Ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Gp=new vi,Gs=new I,go=new I;class Fs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Gp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gs.subVectors(t,this.center);const e=Gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Gs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(go.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gs.copy(t.center).add(go)),this.expandByPoint(Gs.copy(t.center).sub(go))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const On=new I,_o=new I,Wr=new I,ti=new I,vo=new I,Xr=new I,xo=new I;class Ml{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,On)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=On.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(On.copy(this.origin).addScaledVector(this.direction,e),On.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){_o.copy(t).add(e).multiplyScalar(.5),Wr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(_o);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Wr),o=ti.dot(this.direction),c=-ti.dot(Wr),l=ti.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_o).addScaledVector(Wr,u),f}intersectSphere(t,e){On.subVectors(t.center,this.origin);const n=On.dot(this.direction),s=On.dot(On)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,On)!==null}intersectTriangle(t,e,n,s,r){vo.subVectors(e,t),Xr.subVectors(n,t),xo.crossVectors(vo,Xr);let a=this.direction.dot(xo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ti.subVectors(this.origin,t);const c=o*this.direction.dot(Xr.crossVectors(ti,Xr));if(c<0)return null;const l=o*this.direction.dot(vo.cross(ti));if(l<0||c+l>a)return null;const h=-o*ti.dot(xo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,n,s,r,a,o,c,l,h,d,u,f,g,_,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,u,f,g,_,m)}set(t,e,n,s,r,a,o,c,l,h,d,u,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ts.setFromMatrixColumn(t,0).length(),r=1/ts.setFromMatrixColumn(t,1).length(),a=1/ts.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-_*l,e[9]=-o*c,e[2]=_-u*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,_=l*d;e[0]=u+_*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,_=l*d;e[0]=u-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=o*h,_=o*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+_,e[1]=c*d,e[5]=_*l+u,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-u*d,e[8]=g*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+_,e[5]=a*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wp,t,Xp)}lookAt(t,e,n){const s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ei.crossVectors(n,rn),ei.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ei.crossVectors(n,rn)),ei.normalize(),qr.crossVectors(rn,ei),s[0]=ei.x,s[4]=qr.x,s[8]=rn.x,s[1]=ei.y,s[5]=qr.y,s[9]=rn.y,s[2]=ei.z,s[6]=qr.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],E=n[7],y=n[11],A=n[15],T=s[0],C=s[4],L=s[8],S=s[12],b=s[1],P=s[5],O=s[9],z=s[13],Y=s[2],W=s[6],K=s[10],Z=s[14],V=s[3],st=s[7],ct=s[11],pt=s[15];return r[0]=a*T+o*b+c*Y+l*V,r[4]=a*C+o*P+c*W+l*st,r[8]=a*L+o*O+c*K+l*ct,r[12]=a*S+o*z+c*Z+l*pt,r[1]=h*T+d*b+u*Y+f*V,r[5]=h*C+d*P+u*W+f*st,r[9]=h*L+d*O+u*K+f*ct,r[13]=h*S+d*z+u*Z+f*pt,r[2]=g*T+_*b+m*Y+p*V,r[6]=g*C+_*P+m*W+p*st,r[10]=g*L+_*O+m*K+p*ct,r[14]=g*S+_*z+m*Z+p*pt,r[3]=M*T+E*b+y*Y+A*V,r[7]=M*C+E*P+y*W+A*st,r[11]=M*L+E*O+y*K+A*ct,r[15]=M*S+E*z+y*Z+A*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*d-s*l*d-r*o*u+n*l*u+s*o*f-n*c*f)+_*(+e*c*f-e*l*u+r*a*u-s*a*f+s*l*h-r*c*h)+m*(+e*l*d-e*o*f-r*a*d+n*a*f+r*o*h-n*l*h)+p*(-s*o*h-e*c*d+e*o*u+s*a*d-n*a*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=d*m*l-_*u*l+_*c*f-o*m*f-d*c*p+o*u*p,E=g*u*l-h*m*l-g*c*f+a*m*f+h*c*p-a*u*p,y=h*_*l-g*d*l+g*o*f-a*_*f-h*o*p+a*d*p,A=g*d*c-h*_*c-g*o*u+a*_*u+h*o*m-a*d*m,T=e*M+n*E+s*y+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=M*C,t[1]=(_*u*r-d*m*r-_*s*f+n*m*f+d*s*p-n*u*p)*C,t[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*C,t[3]=(d*c*r-o*u*r-d*s*l+n*u*l+o*s*f-n*c*f)*C,t[4]=E*C,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*C,t[6]=(g*c*r-a*m*r-g*s*l+e*m*l+a*s*p-e*c*p)*C,t[7]=(a*u*r-h*c*r+h*s*l-e*u*l-a*s*f+e*c*f)*C,t[8]=y*C,t[9]=(g*d*r-h*_*r-g*n*f+e*_*f+h*n*p-e*d*p)*C,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*p+e*o*p)*C,t[11]=(h*o*r-a*d*r-h*n*l+e*d*l+a*n*f-e*o*f)*C,t[12]=A*C,t[13]=(h*_*s-g*d*s+g*n*u-e*_*u-h*n*m+e*d*m)*C,t[14]=(g*o*s-a*_*s-g*n*c+e*_*c+a*n*m-e*o*m)*C,t[15]=(a*d*s-h*o*s+h*n*c-e*d*c-a*n*u+e*o*u)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,_=a*h,m=a*d,p=o*d,M=c*l,E=c*h,y=c*d,A=n.x,T=n.y,C=n.z;return s[0]=(1-(_+p))*A,s[1]=(f+y)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(f-y)*T,s[5]=(1-(u+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+E)*C,s[9]=(m-M)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ts.set(s[0],s[1],s[2]).length();const a=ts.set(s[4],s[5],s[6]).length(),o=ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],xn.copy(this);const l=1/r,h=1/a,d=1/o;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,e.setFromRotationMatrix(xn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Dn,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Dn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Ba)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Dn,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Dn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Ba)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ts=new I,xn=new pe,Wp=new I(0,0,0),Xp=new I(1,1,1),ei=new I,qr=new I,rn=new I,sh=new pe,rh=new Ur;class $n{constructor(t=0,e=0,n=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Yt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return sh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rh.setFromEuler(this),this.setFromQuaternion(rh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class td{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let qp=0;const ah=new I,es=new Ur,zn=new pe,Yr=new I,Ws=new I,Yp=new I,jp=new Ur,oh=new I(1,0,0),ch=new I(0,1,0),lh=new I(0,0,1),hh={type:"added"},Kp={type:"removed"},ns={type:"childadded",child:null},Mo={type:"childremoved",child:null};class Re extends Ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new I,e=new $n,n=new Ur,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new zt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new td,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.multiply(es),this}rotateOnWorldAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.premultiply(es),this}rotateX(t){return this.rotateOnAxis(oh,t)}rotateY(t){return this.rotateOnAxis(ch,t)}rotateZ(t){return this.rotateOnAxis(lh,t)}translateOnAxis(t,e){return ah.copy(t).applyQuaternion(this.quaternion),this.position.add(ah.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oh,t)}translateY(t){return this.translateOnAxis(ch,t)}translateZ(t){return this.translateOnAxis(lh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Yr.copy(t):Yr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Ws,Yr,this.up):zn.lookAt(Yr,Ws,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),es.setFromRotationMatrix(zn),this.quaternion.premultiply(es.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hh),ns.child=t,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kp),Mo.child=t,this.dispatchEvent(Mo),Mo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hh),ns.child=t,this.dispatchEvent(ns),ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,t,Yp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,jp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Re.DEFAULT_UP=new I(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new I,Bn=new I,yo=new I,Hn=new I,is=new I,ss=new I,uh=new I,bo=new I,So=new I,Eo=new I,wo=new we,To=new we,Ao=new we;class ln{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Mn.subVectors(t,e),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Mn.subVectors(s,e),Bn.subVectors(n,e),yo.subVectors(t,e);const a=Mn.dot(Mn),o=Mn.dot(Bn),c=Mn.dot(yo),l=Bn.dot(Bn),h=Bn.dot(yo),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Hn.x),c.addScaledVector(a,Hn.y),c.addScaledVector(o,Hn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return wo.setScalar(0),To.setScalar(0),Ao.setScalar(0),wo.fromBufferAttribute(t,e),To.fromBufferAttribute(t,n),Ao.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(wo,r.x),a.addScaledVector(To,r.y),a.addScaledVector(Ao,r.z),a}static isFrontFacing(t,e,n,s){return Mn.subVectors(n,e),Bn.subVectors(t,e),Mn.cross(Bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),Mn.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;is.subVectors(s,n),ss.subVectors(r,n),bo.subVectors(t,n);const c=is.dot(bo),l=ss.dot(bo);if(c<=0&&l<=0)return e.copy(n);So.subVectors(t,s);const h=is.dot(So),d=ss.dot(So);if(h>=0&&d<=h)return e.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(is,a);Eo.subVectors(t,r);const f=is.dot(Eo),g=ss.dot(Eo);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(ss,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return uh.subVectors(r,s),o=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(uh,o);const p=1/(m+_+u);return a=_*p,o=u*p,e.copy(n).addScaledVector(is,a).addScaledVector(ss,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Ro(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=vl(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ro(a,r,t+1/3),this.g=Ro(a,r,t),this.b=Ro(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,s),this}setStyle(t,e=Be){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const n=ed[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qn(t.r),this.g=qn(t.g),this.b=qn(t.b),this}copyLinearToSRGB(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return Jt.workingToColorSpace(ze.copy(this),t),Math.round(Yt(ze.r*255,0,255))*65536+Math.round(Yt(ze.g*255,0,255))*256+Math.round(Yt(ze.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(ze.copy(this),e);const n=ze.r,s=ze.g,r=ze.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Be){Jt.workingToColorSpace(ze.copy(this),t);const e=ze.r,n=ze.g,s=ze.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(jr);const n=ur(ni.h,jr.h,e),s=ur(ni.s,jr.s,e),r=ur(ni.l,jr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new Wt;Wt.NAMES=ed;let $p=0;class ks extends Ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=xs,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oc,this.blendDst=cc,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xs&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oc&&(n.blendSrc=this.blendSrc),this.blendDst!==cc&&(n.blendDst=this.blendDst),this.blendEquation!==ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class qi extends ks{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Vu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new I,Kr=new jt;let Zp=0;class $e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Kr.fromBufferAttribute(this,e),Kr.applyMatrix3(t),this.setXY(e,Kr.x,Kr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=bn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=bn(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=bn(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=bn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=bn(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jc&&(t.usage=this.usage),t}}class nd extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class id extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class xe extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Jp=0;const fn=new pe,Co=new Re,rs=new I,an=new vi,Xs=new vi,Ue=new I;class Ge extends Ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ju(t)?id:nd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return Co.lookAt(t),Co.updateMatrix(),this.applyMatrix4(Co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ue.addVectors(an.min,Xs.min),an.expandByPoint(Ue),Ue.addVectors(an.max,Xs.max),an.expandByPoint(Ue)):(an.expandByPoint(Xs.min),an.expandByPoint(Xs.max))}an.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ue.fromBufferAttribute(o,l),c&&(rs.fromBufferAttribute(t,l),Ue.add(rs)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let L=0;L<n.count;L++)o[L]=new I,c[L]=new I;const l=new I,h=new I,d=new I,u=new jt,f=new jt,g=new jt,_=new I,m=new I;function p(L,S,b){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,b),u.fromBufferAttribute(r,L),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,b),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[L].add(_),o[S].add(_),o[b].add(_),c[L].add(m),c[S].add(m),c[b].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,S=M.length;L<S;++L){const b=M[L],P=b.start,O=b.count;for(let z=P,Y=P+O;z<Y;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const E=new I,y=new I,A=new I,T=new I;function C(L){A.fromBufferAttribute(s,L),T.copy(A);const S=o[L];E.copy(S),E.sub(A.multiplyScalar(A.dot(S))).normalize(),y.crossVectors(T,S);const P=y.dot(c[L])<0?-1:1;a.setXYZW(L,E.x,E.y,E.z,P)}for(let L=0,S=M.length;L<S;++L){const b=M[L],P=b.start,O=b.count;for(let z=P,Y=P+O;z<Y;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new I,r=new I,a=new I,o=new I,c=new I,l=new I,h=new I,d=new I;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new $e(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dh=new pe,Ai=new Ml,$r=new Fs,fh=new I,Zr=new I,Jr=new I,Qr=new I,Po=new I,ta=new I,ph=new I,ea=new I;class Se extends Re{constructor(t=new Ge,e=new qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ta.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Po.fromBufferAttribute(d,t),a?ta.addScaledVector(Po,h):ta.addScaledVector(Po.sub(e),h))}e.add(ta)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),Ai.copy(t.ray).recast(t.near),!($r.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere($r,fh)===null||Ai.origin.distanceToSquared(fh)>(t.far-t.near)**2))&&(dh.copy(r).invert(),Ai.copy(t.ray).applyMatrix4(dh),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ai)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=M,A=E;y<A;y+=3){const T=o.getX(y),C=o.getX(y+1),L=o.getX(y+2);s=na(this,p,t,n,l,h,d,T,C,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);s=na(this,a,t,n,l,h,d,M,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),E=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=M,A=E;y<A;y+=3){const T=y,C=y+1,L=y+2;s=na(this,p,t,n,l,h,d,T,C,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,E=m+1,y=m+2;s=na(this,a,t,n,l,h,d,M,E,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Qp(i,t,e,n,s,r,a,o){let c;if(t.side===Ke?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===mi,o),c===null)return null;ea.copy(o),ea.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ea);return l<e.near||l>e.far?null:{distance:l,point:ea.clone(),object:i}}function na(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Zr),i.getVertexPosition(c,Jr),i.getVertexPosition(l,Qr);const h=Qp(i,t,e,n,Zr,Jr,Qr,ph);if(h){const d=new I;ln.getBarycoord(ph,Zr,Jr,Qr,d),s&&(h.uv=ln.getInterpolatedAttribute(s,o,c,l,d,new jt)),r&&(h.uv1=ln.getInterpolatedAttribute(r,o,c,l,d,new jt)),a&&(h.normal=ln.getInterpolatedAttribute(a,o,c,l,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new I,materialIndex:0};ln.getNormal(Zr,Jr,Qr,u.normal),h.face=u,h.barycoord=d}return h}class gn extends Ge{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new xe(l,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(d,2));function g(_,m,p,M,E,y,A,T,C,L,S){const b=y/C,P=A/L,O=y/2,z=A/2,Y=T/2,W=C+1,K=L+1;let Z=0,V=0;const st=new I;for(let ct=0;ct<K;ct++){const pt=ct*P-z;for(let Ht=0;Ht<W;Ht++){const te=Ht*b-O;st[_]=te*M,st[m]=pt*E,st[p]=Y,l.push(st.x,st.y,st.z),st[_]=0,st[m]=0,st[p]=T>0?1:-1,h.push(st.x,st.y,st.z),d.push(Ht/C),d.push(1-ct/L),Z+=1}}for(let ct=0;ct<L;ct++)for(let pt=0;pt<C;pt++){const Ht=u+pt+W*ct,te=u+pt+W*(ct+1),he=u+(pt+1)+W*(ct+1),Vt=u+(pt+1)+W*ct;c.push(Ht,te,Vt),c.push(te,he,Vt),V+=6}o.addGroup(f,V,S),f+=V,u+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function qe(i){const t={};for(let e=0;e<i.length;e++){const n=Rs(i[e]);for(const s in n)t[s]=n[s]}return t}function tm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function sd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const em={clone:Rs,merge:qe};var nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ve extends ks{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nm,this.fragmentShader=im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=tm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class rd extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new I,mh=new jt,gh=new jt;class pn extends rd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ms*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wr*2*Math.atan(Math.tan(Ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,mh,gh),e.subVectors(gh,mh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ms*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const as=-90,os=1;class sm extends Re{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(as,os,t,e);s.layers=this.layers,this.add(s);const r=new pn(as,os,t,e);r.layers=this.layers,this.add(r);const a=new pn(as,os,t,e);a.layers=this.layers,this.add(a);const o=new pn(as,os,t,e);o.layers=this.layers,this.add(o);const c=new pn(as,os,t,e);c.layers=this.layers,this.add(c);const l=new pn(as,os,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ba)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ad extends He{constructor(t=[],e=ws,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class rm extends Xi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ad(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new gn(5,5,5),r=new Ve({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:ui});r.uniforms.tEquirect.value=e;const a=new Se(s,r),o=e.minFilter;return e.minFilter===ci&&(e.minFilter=Cn),new sm(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Hi extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}const am={type:"move"};class Do{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(am)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Hi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class om extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class cm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jc,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xe=new I;class Va{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=bn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=bn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=bn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=bn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=bn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new $e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Va(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class od extends ks{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let cs;const qs=new I,ls=new I,hs=new I,us=new jt,Ys=new jt,cd=new pe,ia=new I,js=new I,sa=new I,_h=new jt,Lo=new jt,vh=new jt;class lm extends Re{constructor(t=new od){if(super(),this.isSprite=!0,this.type="Sprite",cs===void 0){cs=new Ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new cm(e,5);cs.setIndex([0,1,2,0,2,3]),cs.setAttribute("position",new Va(n,3,0,!1)),cs.setAttribute("uv",new Va(n,2,3,!1))}this.geometry=cs,this.material=t,this.center=new jt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ls.setFromMatrixScale(this.matrixWorld),cd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),hs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ls.multiplyScalar(-hs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ra(ia.set(-.5,-.5,0),hs,a,ls,s,r),ra(js.set(.5,-.5,0),hs,a,ls,s,r),ra(sa.set(.5,.5,0),hs,a,ls,s,r),_h.set(0,0),Lo.set(1,0),vh.set(1,1);let o=t.ray.intersectTriangle(ia,js,sa,!1,qs);if(o===null&&(ra(js.set(-.5,.5,0),hs,a,ls,s,r),Lo.set(0,1),o=t.ray.intersectTriangle(ia,sa,js,!1,qs),o===null))return;const c=t.ray.origin.distanceTo(qs);c<t.near||c>t.far||e.push({distance:c,point:qs.clone(),uv:ln.getInterpolation(qs,ia,js,sa,_h,Lo,vh,new jt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ra(i,t,e,n,s,r){us.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ys.x=r*us.x-s*us.y,Ys.y=s*us.x+r*us.y):Ys.copy(us),i.copy(t),i.x+=Ys.x,i.y+=Ys.y,i.applyMatrix4(cd)}class Nr extends He{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Pe,h=Pe,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xh extends $e{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ds=new pe,Mh=new pe,aa=[],yh=new vi,hm=new pe,Ks=new Se,$s=new Fs;class Ga extends Se{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new xh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,hm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new vi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ds),yh.copy(t.boundingBox).applyMatrix4(ds),this.boundingBox.union(yh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ds),$s.copy(t.boundingSphere).applyMatrix4(ds),this.boundingSphere.union($s)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ks.geometry=this.geometry,Ks.material=this.material,Ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$s.copy(this.boundingSphere),$s.applyMatrix4(n),t.ray.intersectsSphere($s)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ds),Mh.multiplyMatrices(n,ds),Ks.matrixWorld=Mh,Ks.raycast(t,aa);for(let a=0,o=aa.length;a<o;a++){const c=aa[a];c.instanceId=r,c.object=this,e.push(c)}aa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new xh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nr(new Float32Array(s*this.count),s,this.count,Ir,Pn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Io=new I,um=new I,dm=new zt;class Li{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Io.subVectors(n,e).cross(um.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Io),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||dm.getNormalMatrix(t),s=this.coplanarPoint(Io).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new Fs,fm=new jt(.5,.5),oa=new I;class ld{constructor(t=new Li,e=new Li,n=new Li,s=new Li,r=new Li,a=new Li){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],E=r[13],y=r[14],A=r[15];if(s[0].setComponents(l-a,f-h,p-g,A-M).normalize(),s[1].setComponents(l+a,f+h,p+g,A+M).normalize(),s[2].setComponents(l+o,f+d,p+_,A+E).normalize(),s[3].setComponents(l-o,f-d,p-_,A-E).normalize(),n)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,f-u,p-m,A-y).normalize();else if(s[4].setComponents(l-c,f-u,p-m,A-y).normalize(),e===Dn)s[5].setComponents(l+c,f+u,p+m,A+y).normalize();else if(e===Ba)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(t){Ri.center.set(0,0,0);const e=fm.distanceTo(t.center);return Ri.radius=.7071067811865476+e,Ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(oa.x=s.normal.x>0?t.max.x:t.min.x,oa.y=s.normal.y>0?t.max.y:t.min.y,oa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(oa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hd extends ks{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Wa=new I,Xa=new I,bh=new pe,Zs=new Ml,ca=new Fs,Uo=new I,Sh=new I;class pm extends Re{constructor(t=new Ge,e=new hd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Wa.fromBufferAttribute(e,s-1),Xa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Wa.distanceTo(Xa);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(s),ca.radius+=r,t.ray.intersectsSphere(ca)===!1)return;bh.copy(s).invert(),Zs.copy(t.ray).applyMatrix4(bh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),E=la(this,t,Zs,c,p,M,_);E&&e.push(E)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=la(this,t,Zs,c,_,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=la(this,t,Zs,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=la(this,t,Zs,c,g-1,f,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function la(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Wa.fromBufferAttribute(o,s),Xa.fromBufferAttribute(o,r),e.distanceSqToSegment(Wa,Xa,Uo,Sh)>n)return;Uo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Uo);if(!(l<t.near||l>t.far))return{distance:l,point:Sh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Eh=new I,wh=new I;class mm extends pm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Eh.fromBufferAttribute(e,s),wh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Eh.distanceTo(wh);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gm extends He{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ud extends He{constructor(t,e,n=Wi,s,r,a,o=Pe,c=Pe,l,h=Sr,d=1){if(h!==Sr&&h!==Er)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new xl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class dd extends He{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const ha=new I,ua=new I,No=new I,da=new ln;class _m extends Ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Ms*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=da;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),da.getNormal(No),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){const E=(M+1)%3,y=d[M],A=d[E],T=da[h[M]],C=da[h[E]],L=`${y}_${A}`,S=`${A}_${y}`;S in u&&u[S]?(No.dot(u[S].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(C.x,C.y,C.z)),u[S]=null):L in u||(u[L]={index0:l[M],index1:l[E],normal:No.clone()})}}for(const g in u)if(u[g]){const{index0:_,index1:m}=u[g];ha.fromBufferAttribute(o,_),ua.fromBufferAttribute(o,m),f.push(ha.x,ha.y,ha.z),f.push(ua.x,ua.y,ua.z)}this.setAttribute("position",new xe(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Os extends Ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,u=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*u-a;for(let E=0;E<l;E++){const y=E*d-r;g.push(y,-M,0),_.push(0,0,1),m.push(E/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const E=M+l*p,y=M+l*(p+1),A=M+1+l*(p+1),T=M+1+l*p;f.push(E,y,T),f.push(y,A,T)}this.setIndex(f),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Os(t.width,t.height,t.widthSegments,t.heightSegments)}}class yl extends Ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new I,u=new I,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],E=p/n;let y=0;p===0&&a===0?y=.5/e:p===n&&c===Math.PI&&(y=-.5/e);for(let A=0;A<=e;A++){const T=A/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+E*o),d.y=t*Math.cos(a+E*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+E*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(T+y,1-E),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const E=h[p][M+1],y=h[p][M],A=h[p+1][M],T=h[p+1][M+1];(p!==0||a>0)&&f.push(E,y,T),(p!==n-1||c<Math.PI)&&f.push(y,A,T)}this.setIndex(f),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class vm extends ks{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=op,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xm extends ks{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Mm extends rd{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ym extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Th(i,t,e,n){const s=bm(n);switch(e){case ju:return i*t;case Ir:return i*t/s.components*s.byteLength;case ml:return i*t/s.components*s.byteLength;case $u:return i*t*2/s.components*s.byteLength;case gl:return i*t*2/s.components*s.byteLength;case Ku:return i*t*3/s.components*s.byteLength;case En:return i*t*4/s.components*s.byteLength;case _l:return i*t*4/s.components*s.byteLength;case Ea:case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yc:case Sc:return Math.max(i,16)*Math.max(t,8)/4;case Mc:case bc:return Math.max(i,8)*Math.max(t,8)/2;case Ec:case wc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Rc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Cc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Lc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Uc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case kc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Oc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case zc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Bc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Hc:case Vc:case Gc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Wc:case Xc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case qc:case Yc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function bm(i){switch(i){case Kn:case Wu:return{byteLength:1,components:1};case yr:case Xu:case Lr:return{byteLength:2,components:1};case fl:case pl:return{byteLength:2,components:4};case Wi:case dl:case Pn:return{byteLength:4,components:1};case qu:case Yu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ul}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ul);function fd(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Sm(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Em=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wm=`#ifdef USE_ALPHAHASH
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
#endif`,Tm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Am=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pm=`#ifdef USE_AOMAP
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
#endif`,Dm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lm=`#ifdef USE_BATCHING
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
#endif`,Im=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Um=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,km=`#ifdef USE_IRIDESCENCE
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
#endif`,Om=`#ifdef USE_BUMPMAP
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
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ym=`#define PI 3.141592653589793
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
} // validated`,jm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Km=`vec3 transformedNormal = objectNormal;
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
#endif`,$m=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t0="gl_FragColor = linearToOutputTexel( gl_FragColor );",e0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,n0=`#ifdef USE_ENVMAP
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
#endif`,i0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,s0=`#ifdef USE_ENVMAP
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
#endif`,r0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,a0=`#ifdef USE_ENVMAP
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
#endif`,o0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,c0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,l0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,h0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,u0=`#ifdef USE_GRADIENTMAP
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
}`,d0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,f0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,p0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,m0=`uniform bool receiveShadow;
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
#endif`,g0=`#ifdef USE_ENVMAP
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
#endif`,_0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,v0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,x0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,M0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,y0=`PhysicalMaterial material;
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
#endif`,b0=`struct PhysicalMaterial {
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
}`,S0=`
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
#endif`,E0=`#if defined( RE_IndirectDiffuse )
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
#endif`,w0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,T0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,A0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,R0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,P0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,L0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,I0=`#if defined( USE_POINTS_UV )
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
#endif`,U0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,N0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,F0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,O0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,z0=`#ifdef USE_MORPHTARGETS
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
#endif`,B0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,V0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,G0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,W0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,q0=`#ifdef USE_NORMALMAP
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
#endif`,Y0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Z0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,J0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Q0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,eg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ng=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ig=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ag=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,og=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cg=`float getShadowMask() {
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
}`,lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hg=`#ifdef USE_SKINNING
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
#endif`,ug=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dg=`#ifdef USE_SKINNING
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
#endif`,fg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_g=`#ifdef USE_TRANSMISSION
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
#endif`,vg=`#ifdef USE_TRANSMISSION
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
#endif`,xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Eg=`uniform sampler2D t2D;
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
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`#include <common>
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
}`,Pg=`#if DEPTH_PACKING == 3200
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
}`,Dg=`#define DISTANCE
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
}`,Lg=`#define DISTANCE
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
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ug=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ng=`uniform float scale;
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
}`,Fg=`uniform vec3 diffuse;
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
}`,kg=`#include <common>
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
}`,Og=`uniform vec3 diffuse;
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
}`,zg=`#define LAMBERT
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
}`,Bg=`#define LAMBERT
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
}`,Hg=`#define MATCAP
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
}`,Vg=`#define MATCAP
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
}`,Gg=`#define NORMAL
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
}`,Wg=`#define NORMAL
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
}`,Xg=`#define PHONG
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
}`,qg=`#define PHONG
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
}`,Yg=`#define STANDARD
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
}`,jg=`#define STANDARD
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
}`,Kg=`#define TOON
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
}`,$g=`#define TOON
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
}`,Zg=`uniform float size;
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
}`,Jg=`uniform vec3 diffuse;
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
}`,Qg=`#include <common>
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
}`,t_=`uniform vec3 color;
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
}`,e_=`uniform float rotation;
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
}`,n_=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:Em,alphahash_pars_fragment:wm,alphamap_fragment:Tm,alphamap_pars_fragment:Am,alphatest_fragment:Rm,alphatest_pars_fragment:Cm,aomap_fragment:Pm,aomap_pars_fragment:Dm,batching_pars_vertex:Lm,batching_vertex:Im,begin_vertex:Um,beginnormal_vertex:Nm,bsdfs:Fm,iridescence_fragment:km,bumpmap_pars_fragment:Om,clipping_planes_fragment:zm,clipping_planes_pars_fragment:Bm,clipping_planes_pars_vertex:Hm,clipping_planes_vertex:Vm,color_fragment:Gm,color_pars_fragment:Wm,color_pars_vertex:Xm,color_vertex:qm,common:Ym,cube_uv_reflection_fragment:jm,defaultnormal_vertex:Km,displacementmap_pars_vertex:$m,displacementmap_vertex:Zm,emissivemap_fragment:Jm,emissivemap_pars_fragment:Qm,colorspace_fragment:t0,colorspace_pars_fragment:e0,envmap_fragment:n0,envmap_common_pars_fragment:i0,envmap_pars_fragment:s0,envmap_pars_vertex:r0,envmap_physical_pars_fragment:g0,envmap_vertex:a0,fog_vertex:o0,fog_pars_vertex:c0,fog_fragment:l0,fog_pars_fragment:h0,gradientmap_pars_fragment:u0,lightmap_pars_fragment:d0,lights_lambert_fragment:f0,lights_lambert_pars_fragment:p0,lights_pars_begin:m0,lights_toon_fragment:_0,lights_toon_pars_fragment:v0,lights_phong_fragment:x0,lights_phong_pars_fragment:M0,lights_physical_fragment:y0,lights_physical_pars_fragment:b0,lights_fragment_begin:S0,lights_fragment_maps:E0,lights_fragment_end:w0,logdepthbuf_fragment:T0,logdepthbuf_pars_fragment:A0,logdepthbuf_pars_vertex:R0,logdepthbuf_vertex:C0,map_fragment:P0,map_pars_fragment:D0,map_particle_fragment:L0,map_particle_pars_fragment:I0,metalnessmap_fragment:U0,metalnessmap_pars_fragment:N0,morphinstance_vertex:F0,morphcolor_vertex:k0,morphnormal_vertex:O0,morphtarget_pars_vertex:z0,morphtarget_vertex:B0,normal_fragment_begin:H0,normal_fragment_maps:V0,normal_pars_fragment:G0,normal_pars_vertex:W0,normal_vertex:X0,normalmap_pars_fragment:q0,clearcoat_normal_fragment_begin:Y0,clearcoat_normal_fragment_maps:j0,clearcoat_pars_fragment:K0,iridescence_pars_fragment:$0,opaque_fragment:Z0,packing:J0,premultiplied_alpha_fragment:Q0,project_vertex:tg,dithering_fragment:eg,dithering_pars_fragment:ng,roughnessmap_fragment:ig,roughnessmap_pars_fragment:sg,shadowmap_pars_fragment:rg,shadowmap_pars_vertex:ag,shadowmap_vertex:og,shadowmask_pars_fragment:cg,skinbase_vertex:lg,skinning_pars_vertex:hg,skinning_vertex:ug,skinnormal_vertex:dg,specularmap_fragment:fg,specularmap_pars_fragment:pg,tonemapping_fragment:mg,tonemapping_pars_fragment:gg,transmission_fragment:_g,transmission_pars_fragment:vg,uv_pars_fragment:xg,uv_pars_vertex:Mg,uv_vertex:yg,worldpos_vertex:bg,background_vert:Sg,background_frag:Eg,backgroundCube_vert:wg,backgroundCube_frag:Tg,cube_vert:Ag,cube_frag:Rg,depth_vert:Cg,depth_frag:Pg,distanceRGBA_vert:Dg,distanceRGBA_frag:Lg,equirect_vert:Ig,equirect_frag:Ug,linedashed_vert:Ng,linedashed_frag:Fg,meshbasic_vert:kg,meshbasic_frag:Og,meshlambert_vert:zg,meshlambert_frag:Bg,meshmatcap_vert:Hg,meshmatcap_frag:Vg,meshnormal_vert:Gg,meshnormal_frag:Wg,meshphong_vert:Xg,meshphong_frag:qg,meshphysical_vert:Yg,meshphysical_frag:jg,meshtoon_vert:Kg,meshtoon_frag:$g,points_vert:Zg,points_frag:Jg,shadow_vert:Qg,shadow_frag:t_,sprite_vert:e_,sprite_frag:n_},ot={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},An={basic:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:qe([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:qe([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:qe([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:qe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:qe([ot.points,ot.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:qe([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:qe([ot.common,ot.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:qe([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:qe([ot.sprite,ot.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:qe([ot.common,ot.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:qe([ot.lights,ot.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};An.physical={uniforms:qe([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const fa={r:0,b:0,g:0},Ci=new $n,i_=new pe;function s_(i,t,e,n,s,r,a){const o=new Wt(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(E){let y=E.isScene===!0?E.background:null;return y&&y.isTexture&&(y=(E.backgroundBlurriness>0?e:t).get(y)),y}function _(E){let y=!1;const A=g(E);A===null?p(o,c):A&&A.isColor&&(p(A,1),y=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,y){const A=g(y);A&&(A.isCubeTexture||A.mapping===eo)?(h===void 0&&(h=new Se(new gn(1,1,1),new Ve({name:"BackgroundCubeMaterial",uniforms:Rs(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ci.copy(y.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(i_.makeRotationFromEuler(Ci)),h.material.toneMapped=Jt.getTransfer(A.colorSpace)!==ae,(d!==A||u!==A.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=A,u=A.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Se(new Os(2,2),new Ve({name:"BackgroundMaterial",uniforms:Rs(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(A.colorSpace)!==ae,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||u!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=A,u=A.version,f=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,y){E.getRGB(fa,sd(i)),n.buffers.color.setClear(fa.r,fa.g,fa.b,y,a)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,y=1){o.set(E),c=y,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(o,c)},render:_,addToRenderList:m,dispose:M}}function r_(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(b,P,O,z,Y){let W=!1;const K=d(z,O,P);r!==K&&(r=K,l(r.object)),W=f(b,z,O,Y),W&&g(b,z,O,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(b,P,O,z),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function d(b,P,O){const z=O.wireframe===!0;let Y=n[b.id];Y===void 0&&(Y={},n[b.id]=Y);let W=Y[P.id];W===void 0&&(W={},Y[P.id]=W);let K=W[z];return K===void 0&&(K=u(c()),W[z]=K),K}function u(b){const P=[],O=[],z=[];for(let Y=0;Y<e;Y++)P[Y]=0,O[Y]=0,z[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:b,attributes:{},index:null}}function f(b,P,O,z){const Y=r.attributes,W=P.attributes;let K=0;const Z=O.getAttributes();for(const V in Z)if(Z[V].location>=0){const ct=Y[V];let pt=W[V];if(pt===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(pt=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(pt=b.instanceColor)),ct===void 0||ct.attribute!==pt||pt&&ct.data!==pt.data)return!0;K++}return r.attributesNum!==K||r.index!==z}function g(b,P,O,z){const Y={},W=P.attributes;let K=0;const Z=O.getAttributes();for(const V in Z)if(Z[V].location>=0){let ct=W[V];ct===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(ct=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(ct=b.instanceColor));const pt={};pt.attribute=ct,ct&&ct.data&&(pt.data=ct.data),Y[V]=pt,K++}r.attributes=Y,r.attributesNum=K,r.index=z}function _(){const b=r.newAttributes;for(let P=0,O=b.length;P<O;P++)b[P]=0}function m(b){p(b,0)}function p(b,P){const O=r.newAttributes,z=r.enabledAttributes,Y=r.attributeDivisors;O[b]=1,z[b]===0&&(i.enableVertexAttribArray(b),z[b]=1),Y[b]!==P&&(i.vertexAttribDivisor(b,P),Y[b]=P)}function M(){const b=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==b[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function E(b,P,O,z,Y,W,K){K===!0?i.vertexAttribIPointer(b,P,O,Y,W):i.vertexAttribPointer(b,P,O,z,Y,W)}function y(b,P,O,z){_();const Y=z.attributes,W=O.getAttributes(),K=P.defaultAttributeValues;for(const Z in W){const V=W[Z];if(V.location>=0){let st=Y[Z];if(st===void 0&&(Z==="instanceMatrix"&&b.instanceMatrix&&(st=b.instanceMatrix),Z==="instanceColor"&&b.instanceColor&&(st=b.instanceColor)),st!==void 0){const ct=st.normalized,pt=st.itemSize,Ht=t.get(st);if(Ht===void 0)continue;const te=Ht.buffer,he=Ht.type,Vt=Ht.bytesPerElement,j=he===i.INT||he===i.UNSIGNED_INT||st.gpuType===dl;if(st.isInterleavedBufferAttribute){const J=st.data,ft=J.stride,Ct=st.offset;if(J.isInstancedInterleavedBuffer){for(let Mt=0;Mt<V.locationSize;Mt++)p(V.location+Mt,J.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Mt=0;Mt<V.locationSize;Mt++)m(V.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Mt=0;Mt<V.locationSize;Mt++)E(V.location+Mt,pt/V.locationSize,he,ct,ft*Vt,(Ct+pt/V.locationSize*Mt)*Vt,j)}else{if(st.isInstancedBufferAttribute){for(let J=0;J<V.locationSize;J++)p(V.location+J,st.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let J=0;J<V.locationSize;J++)m(V.location+J);i.bindBuffer(i.ARRAY_BUFFER,te);for(let J=0;J<V.locationSize;J++)E(V.location+J,pt/V.locationSize,he,ct,pt*Vt,pt/V.locationSize*J*Vt,j)}}else if(K!==void 0){const ct=K[Z];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(V.location,ct);break;case 3:i.vertexAttrib3fv(V.location,ct);break;case 4:i.vertexAttrib4fv(V.location,ct);break;default:i.vertexAttrib1fv(V.location,ct)}}}}M()}function A(){L();for(const b in n){const P=n[b];for(const O in P){const z=P[O];for(const Y in z)h(z[Y].object),delete z[Y];delete P[O]}delete n[b]}}function T(b){if(n[b.id]===void 0)return;const P=n[b.id];for(const O in P){const z=P[O];for(const Y in z)h(z[Y].object),delete z[Y];delete P[O]}delete n[b.id]}function C(b){for(const P in n){const O=n[P];if(O[b.id]===void 0)continue;const z=O[b.id];for(const Y in z)h(z[Y].object),delete z[Y];delete O[b.id]}}function L(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function a_(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function o_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==En&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const L=C===Lr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Kn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Pn&&!L)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:y,vertexTextures:A,maxSamples:T}}function c_(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Li,o=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,E=M*4;let y=p.clippingState||null;c.value=y,y=h(g,u,E,f);for(let A=0;A!==E;++A)y[A]=e[A];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,y=f;E!==_;++E,y+=4)a.copy(d[E]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function l_(i){let t=new WeakMap;function e(a,o){return o===gc?a.mapping=ws:o===_c&&(a.mapping=Ts),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===gc||o===_c)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new rm(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const _s=4,Ah=[.125,.215,.35,.446,.526,.582],Oi=20,Fo=new Mm,Rh=new Wt;let ko=null,Oo=0,zo=0,Bo=!1;const Ii=(1+Math.sqrt(5))/2,fs=1/Ii,Ch=[new I(-Ii,fs,0),new I(Ii,fs,0),new I(-fs,0,Ii),new I(fs,0,Ii),new I(0,Ii,-fs),new I(0,Ii,fs),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],h_=new I;class Ph{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=h_}=r;ko=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ko,Oo,zo),this._renderer.xr.enabled=Bo,t.scissorTest=!1,pa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ws||t.mapping===Ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ko=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:Lr,format:En,colorSpace:As,depthBuffer:!1},s=Dh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=u_(r)),this._blurMaterial=d_(r,t,e)}return s}_compileMaterial(t){const e=new Se(this._lodPlanes[0],t);this._renderer.compile(e,Fo)}_sceneToCubeUV(t,e,n,s,r){const c=new pn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Rh),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new qi({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),m=new Se(new gn,_);let p=!1;const M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,p=!0):(_.color.copy(Rh),p=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):y===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));const A=this._cubeSize;pa(s,y*A,E>2?A:0,A,A),d.setRenderTarget(s),p&&d.render(m,c),d.render(t,c)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ws||t.mapping===Ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Se(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;pa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Fo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ch[(s-r-1)%Ch.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Se(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Oi;m>Oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const p=[];let M=0;for(let C=0;C<Oi;++C){const L=C/_,S=Math.exp(-L*L/2);p.push(S),C===0?M+=S:C<m&&(M+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-n;const y=this._sizeLods[s],A=3*y*(s>E-_s?s-E+_s:0),T=4*(this._cubeSize-y);pa(e,A,T,3*y,2*y),c.setRenderTarget(e),c.render(d,Fo)}}function u_(i){const t=[],e=[],n=[];let s=i;const r=i-_s+1+Ah.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-_s?c=Ah[a-i+_s-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),E=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let T=0;T<f;T++){const C=T%3*2/3-1,L=T>2?0:-1,S=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];M.set(S,_*g*T),E.set(u,m*g*T);const b=[T,T,T,T,T,T];y.set(b,p*g*T)}const A=new Ge;A.setAttribute("position",new $e(M,_)),A.setAttribute("uv",new $e(E,m)),A.setAttribute("faceIndex",new $e(y,p)),t.push(A),s>_s&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dh(i,t,e){const n=new Xi(i,t,e);return n.texture.mapping=eo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function d_(i,t,e){const n=new Float32Array(Oi),s=new I(0,1,0);return new Ve({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bl(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Lh(){return new Ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bl(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Ih(){return new Ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function bl(){return`

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
	`}function f_(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===gc||c===_c,h=c===ws||c===Ts;if(l||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new Ph(i)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Ph(i)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function p_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Tr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function m_(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let E=0,y=M.length;E<y;E+=3){const A=M[E+0],T=M[E+1],C=M[E+2];u.push(A,T,T,C,C,A)}}else if(g!==void 0){const M=g.array;_=g.version;for(let E=0,y=M.length/3-1;E<y;E+=3){const A=E+0,T=E+1,C=E+2;u.push(A,T,T,C,C,A)}}else return;const m=new(Ju(u)?id:nd)(u,1);m.version=_;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function g_(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function l(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*a,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function __(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function v_(i,t,e){const n=new WeakMap,s=new we;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let b=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",b)};var f=b;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let A=o.attributes.position.count*y,T=1;A>t.maxTextureSize&&(T=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const C=new Float32Array(A*T*4*d),L=new Qu(C,A,T,d);L.type=Pn,L.needsUpdate=!0;const S=y*4;for(let P=0;P<d;P++){const O=p[P],z=M[P],Y=E[P],W=A*T*4*P;for(let K=0;K<O.count;K++){const Z=K*S;g===!0&&(s.fromBufferAttribute(O,K),C[W+Z+0]=s.x,C[W+Z+1]=s.y,C[W+Z+2]=s.z,C[W+Z+3]=0),_===!0&&(s.fromBufferAttribute(z,K),C[W+Z+4]=s.x,C[W+Z+5]=s.y,C[W+Z+6]=s.z,C[W+Z+7]=0),m===!0&&(s.fromBufferAttribute(Y,K),C[W+Z+8]=s.x,C[W+Z+9]=s.y,C[W+Z+10]=s.z,C[W+Z+11]=Y.itemSize===4?s.w:1)}}u={count:d,texture:L,size:new jt(A,T)},n.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function x_(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const pd=new He,Uh=new ud(1,1),md=new Qu,gd=new Vp,_d=new ad,Nh=[],Fh=[],kh=new Float32Array(16),Oh=new Float32Array(9),zh=new Float32Array(4);function zs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Nh[s];if(r===void 0&&(r=new Float32Array(s),Nh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function De(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function no(i,t){let e=Fh[t];e===void 0&&(e=new Int32Array(t),Fh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function M_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function y_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function b_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function S_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function E_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;zh.set(n),i.uniformMatrix2fv(this.addr,!1,zh),Le(e,n)}}function w_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;Oh.set(n),i.uniformMatrix3fv(this.addr,!1,Oh),Le(e,n)}}function T_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;kh.set(n),i.uniformMatrix4fv(this.addr,!1,kh),Le(e,n)}}function A_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function R_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function C_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function P_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function D_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function L_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function I_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function U_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function N_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Uh.compareFunction=Zu,r=Uh):r=pd,e.setTexture2D(t||r,s)}function F_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||gd,s)}function k_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||_d,s)}function O_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||md,s)}function z_(i){switch(i){case 5126:return M_;case 35664:return y_;case 35665:return b_;case 35666:return S_;case 35674:return E_;case 35675:return w_;case 35676:return T_;case 5124:case 35670:return A_;case 35667:case 35671:return R_;case 35668:case 35672:return C_;case 35669:case 35673:return P_;case 5125:return D_;case 36294:return L_;case 36295:return I_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return N_;case 35679:case 36299:case 36307:return F_;case 35680:case 36300:case 36308:case 36293:return k_;case 36289:case 36303:case 36311:case 36292:return O_}}function B_(i,t){i.uniform1fv(this.addr,t)}function H_(i,t){const e=zs(t,this.size,2);i.uniform2fv(this.addr,e)}function V_(i,t){const e=zs(t,this.size,3);i.uniform3fv(this.addr,e)}function G_(i,t){const e=zs(t,this.size,4);i.uniform4fv(this.addr,e)}function W_(i,t){const e=zs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function X_(i,t){const e=zs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function q_(i,t){const e=zs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Y_(i,t){i.uniform1iv(this.addr,t)}function j_(i,t){i.uniform2iv(this.addr,t)}function K_(i,t){i.uniform3iv(this.addr,t)}function $_(i,t){i.uniform4iv(this.addr,t)}function Z_(i,t){i.uniform1uiv(this.addr,t)}function J_(i,t){i.uniform2uiv(this.addr,t)}function Q_(i,t){i.uniform3uiv(this.addr,t)}function tv(i,t){i.uniform4uiv(this.addr,t)}function ev(i,t,e){const n=this.cache,s=t.length,r=no(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||pd,r[a])}function nv(i,t,e){const n=this.cache,s=t.length,r=no(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||gd,r[a])}function iv(i,t,e){const n=this.cache,s=t.length,r=no(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||_d,r[a])}function sv(i,t,e){const n=this.cache,s=t.length,r=no(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||md,r[a])}function rv(i){switch(i){case 5126:return B_;case 35664:return H_;case 35665:return V_;case 35666:return G_;case 35674:return W_;case 35675:return X_;case 35676:return q_;case 5124:case 35670:return Y_;case 35667:case 35671:return j_;case 35668:case 35672:return K_;case 35669:case 35673:return $_;case 5125:return Z_;case 36294:return J_;case 36295:return Q_;case 36296:return tv;case 35678:case 36198:case 36298:case 36306:case 35682:return ev;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return iv;case 36289:case 36303:case 36311:case 36292:return sv}}class av{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=z_(e.type)}}class ov{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rv(e.type)}}class cv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ho=/(\w+)(\])?(\[|\.)?/g;function Bh(i,t){i.seq.push(t),i.map[t.id]=t}function lv(i,t,e){const n=i.name,s=n.length;for(Ho.lastIndex=0;;){const r=Ho.exec(n),a=Ho.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Bh(e,l===void 0?new av(o,i,t):new ov(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new cv(o),Bh(e,d)),e=d}}}class Ra{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);lv(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Hh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const hv=37297;let uv=0;function dv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Vh=new zt;function fv(i){Jt._getMatrix(Vh,Jt.workingColorSpace,i);const t=`mat3( ${Vh.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case za:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Gh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+dv(i.getShaderSource(t),o)}else return r}function pv(i,t){const e=fv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function mv(i,t){let e;switch(t){case Qf:e="Linear";break;case tp:e="Reinhard";break;case ep:e="Cineon";break;case np:e="ACESFilmic";break;case sp:e="AgX";break;case rp:e="Neutral";break;case ip:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ma=new I;function gv(){Jt.getLuminanceCoefficients(ma);const i=ma.x.toFixed(4),t=ma.y.toFixed(4),e=ma.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _v(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(or).join(`
`)}function vv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function xv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function or(i){return i!==""}function Wh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Mv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kc(i){return i.replace(Mv,bv)}const yv=new Map;function bv(i,t){let e=Bt[t];if(e===void 0){const n=yv.get(t);if(n!==void 0)e=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Kc(e)}const Sv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qh(i){return i.replace(Sv,Ev)}function Ev(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yh(i){let t=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Hu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Vn&&(t="SHADOWMAP_TYPE_VSM"),t}function Tv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ws:case Ts:t="ENVMAP_TYPE_CUBE";break;case eo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Av(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ts&&(t="ENVMAP_MODE_REFRACTION"),t}function Rv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vu:t="ENVMAP_BLENDING_MULTIPLY";break;case Zf:t="ENVMAP_BLENDING_MIX";break;case Jf:t="ENVMAP_BLENDING_ADD";break}return t}function Cv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Pv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=wv(e),l=Tv(e),h=Av(e),d=Rv(e),u=Cv(e),f=_v(e),g=vv(r),_=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(or).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(or).join(`
`),p.length>0&&(p+=`
`)):(m=[Yh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),p=[Yh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==Wn?mv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,pv("linearToOutputTexel",e.outputColorSpace),gv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(or).join(`
`)),a=Kc(a),a=Wh(a,e),a=Xh(a,e),o=Kc(o),o=Wh(o,e),o=Xh(o,e),a=qh(a),o=qh(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=M+m+a,y=M+p+o,A=Hh(s,s.VERTEX_SHADER,E),T=Hh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,A),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(A)||"",Y=s.getShaderInfoLog(T)||"",W=O.trim(),K=z.trim(),Z=Y.trim();let V=!0,st=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,T);else{const ct=Gh(s,A,"vertex"),pt=Gh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+W+`
`+ct+`
`+pt)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(K===""||Z==="")&&(st=!1);st&&(P.diagnostics={runnable:V,programLog:W,vertexShader:{log:K,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(A),s.deleteShader(T),L=new Ra(s,_),S=xv(s,_)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,hv)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=uv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let Dv=0;class Lv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Iv(t),e.set(t,n)),n}}class Iv{constructor(t){this.id=Dv++,this.code=t,this.usedTimes=0}}function Uv(i,t,e,n,s,r,a){const o=new td,c=new Lv,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,b,P,O,z){const Y=O.fog,W=z.geometry,K=S.isMeshStandardMaterial?O.environment:null,Z=(S.isMeshStandardMaterial?e:t).get(S.envMap||K),V=Z&&Z.mapping===eo?Z.image.height:null,st=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,pt=ct!==void 0?ct.length:0;let Ht=0;W.morphAttributes.position!==void 0&&(Ht=1),W.morphAttributes.normal!==void 0&&(Ht=2),W.morphAttributes.color!==void 0&&(Ht=3);let te,he,Vt,j;if(st){const ee=An[st];te=ee.vertexShader,he=ee.fragmentShader}else te=S.vertexShader,he=S.fragmentShader,c.update(S),Vt=c.getVertexShaderID(S),j=c.getFragmentShaderID(S);const J=i.getRenderTarget(),ft=i.state.buffers.depth.getReversed(),Ct=z.isInstancedMesh===!0,Mt=z.isBatchedMesh===!0,Xt=!!S.map,Te=!!S.matcap,R=!!Z,oe=!!S.aoMap,Nt=!!S.lightMap,Rt=!!S.bumpMap,gt=!!S.normalMap,ce=!!S.displacementMap,_t=!!S.emissiveMap,Ft=!!S.metalnessMap,Ee=!!S.roughnessMap,me=S.anisotropy>0,w=S.clearcoat>0,v=S.dispersion>0,F=S.iridescence>0,q=S.sheen>0,Q=S.transmission>0,G=me&&!!S.anisotropyMap,Et=w&&!!S.clearcoatMap,rt=w&&!!S.clearcoatNormalMap,yt=w&&!!S.clearcoatRoughnessMap,bt=F&&!!S.iridescenceMap,nt=F&&!!S.iridescenceThicknessMap,ut=q&&!!S.sheenColorMap,Dt=q&&!!S.sheenRoughnessMap,St=!!S.specularMap,lt=!!S.specularColorMap,Ot=!!S.specularIntensityMap,D=Q&&!!S.transmissionMap,it=Q&&!!S.thicknessMap,at=!!S.gradientMap,mt=!!S.alphaMap,tt=S.alphaTest>0,$=!!S.alphaHash,xt=!!S.extensions;let kt=Wn;S.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(kt=i.toneMapping);const ue={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:te,fragmentShader:he,defines:S.defines,customVertexShaderID:Vt,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Mt,batchingColor:Mt&&z._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&z.instanceColor!==null,instancingMorph:Ct&&z.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:As,alphaToCoverage:!!S.alphaToCoverage,map:Xt,matcap:Te,envMap:R,envMapMode:R&&Z.mapping,envMapCubeUVHeight:V,aoMap:oe,lightMap:Nt,bumpMap:Rt,normalMap:gt,displacementMap:u&&ce,emissiveMap:_t,normalMapObjectSpace:gt&&S.normalMapType===hp,normalMapTangentSpace:gt&&S.normalMapType===lp,metalnessMap:Ft,roughnessMap:Ee,anisotropy:me,anisotropyMap:G,clearcoat:w,clearcoatMap:Et,clearcoatNormalMap:rt,clearcoatRoughnessMap:yt,dispersion:v,iridescence:F,iridescenceMap:bt,iridescenceThicknessMap:nt,sheen:q,sheenColorMap:ut,sheenRoughnessMap:Dt,specularMap:St,specularColorMap:lt,specularIntensityMap:Ot,transmission:Q,transmissionMap:D,thicknessMap:it,gradientMap:at,opaque:S.transparent===!1&&S.blending===xs&&S.alphaToCoverage===!1,alphaMap:mt,alphaTest:tt,alphaHash:$,combine:S.combine,mapUv:Xt&&_(S.map.channel),aoMapUv:oe&&_(S.aoMap.channel),lightMapUv:Nt&&_(S.lightMap.channel),bumpMapUv:Rt&&_(S.bumpMap.channel),normalMapUv:gt&&_(S.normalMap.channel),displacementMapUv:ce&&_(S.displacementMap.channel),emissiveMapUv:_t&&_(S.emissiveMap.channel),metalnessMapUv:Ft&&_(S.metalnessMap.channel),roughnessMapUv:Ee&&_(S.roughnessMap.channel),anisotropyMapUv:G&&_(S.anisotropyMap.channel),clearcoatMapUv:Et&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:rt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(S.sheenRoughnessMap.channel),specularMapUv:St&&_(S.specularMap.channel),specularColorMapUv:lt&&_(S.specularColorMap.channel),specularIntensityMapUv:Ot&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:it&&_(S.thicknessMap.channel),alphaMapUv:mt&&_(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(gt||me),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!W.attributes.uv&&(Xt||mt),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ft,skinning:z.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:Ht,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:kt,decodeVideoTexture:Xt&&S.map.isVideoTexture===!0&&Jt.getTransfer(S.map.colorSpace)===ae,decodeVideoTextureEmissive:_t&&S.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(S.emissiveMap.colorSpace)===ae,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===yn,flipSided:S.side===Ke,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:xt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&S.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ue.vertexUv1s=l.has(1),ue.vertexUv2s=l.has(2),ue.vertexUv3s=l.has(3),l.clear(),ue}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)b.push(P),b.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(M(b,S),E(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function E(S,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),S.push(o.mask)}function y(S){const b=g[S.type];let P;if(b){const O=An[b];P=em.clone(O.uniforms)}else P=S.uniforms;return P}function A(S,b){let P;for(let O=0,z=h.length;O<z;O++){const Y=h[O];if(Y.cacheKey===b){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new Pv(i,b,S,r),h.push(P)),P}function T(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function C(S){c.remove(S)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:A,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:L}}function Nv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Fv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function jh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Kh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,f,g,_,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function o(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||Fv),n.length>1&&n.sort(u||jh),s.length>1&&s.sort(u||jh)}function h(){for(let d=t,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function kv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Kh,i.set(n,[a])):s>=r.length?(a=new Kh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Ov(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Wt};break;case"SpotLight":e={position:new I,direction:new I,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function zv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Bv=0;function Hv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Vv(i){const t=new Ov,e=zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new pe,a=new pe;function o(l){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,E=0,y=0,A=0,T=0,C=0;l.sort(Hv);for(let S=0,b=l.length;S<b;S++){const P=l[S],O=P.color,z=P.intensity,Y=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*z,d+=O.g*z,u+=O.b*z;else if(P.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(P.sh.coefficients[K],z);C++}else if(P.isDirectionalLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Z=P.shadow,V=e.get(P);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=P.shadow.matrix,M++}n.directional[f]=K,f++}else if(P.isSpotLight){const K=t.get(P);K.position.setFromMatrixPosition(P.matrixWorld),K.color.copy(O).multiplyScalar(z),K.distance=Y,K.coneCos=Math.cos(P.angle),K.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),K.decay=P.decay,n.spot[_]=K;const Z=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,Z.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=Z.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=W,y++}_++}else if(P.isRectAreaLight){const K=t.get(P);K.color.copy(O).multiplyScalar(z),K.halfWidth.set(P.width*.5,0,0),K.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=K,m++}else if(P.isPointLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),K.distance=P.distance,K.decay=P.decay,P.castShadow){const Z=P.shadow,V=e.get(P);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=K,g++}else if(P.isHemisphereLight){const K=t.get(P);K.skyColor.copy(P.color).multiplyScalar(z),K.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[p]=K,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const L=n.hash;(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==E||L.numSpotShadows!==y||L.numSpotMaps!==A||L.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=y+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,L.directionalLength=f,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=E,L.numSpotShadows=y,L.numSpotMaps=A,L.numLightProbes=C,n.version=Bv++)}function c(l,h){let d=0,u=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const E=l[p];if(E.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(E.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function $h(i){const t=new Vv(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Gv(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new $h(i),t.set(s,[o])):r>=a.length?(o=new $h(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Wv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xv=`uniform sampler2D shadow_pass;
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
}`;function qv(i,t,e){let n=new ld;const s=new jt,r=new jt,a=new we,o=new vm({depthPacking:cp}),c=new xm,l={},h=e.maxTextureSize,d={[mi]:Ke,[Ke]:mi,[yn]:yn},u=new Ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:Wv,fragmentShader:Xv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ge;g.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Se(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let p=this.type;this.render=function(T,C,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ui),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==Vn&&this.type===Vn,Y=p===Vn&&this.type!==Vn;for(let W=0,K=T.length;W<K;W++){const Z=T[W],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const st=V.getFrameExtents();if(s.multiply(st),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,V.mapSize.y=r.y)),V.map===null||z===!0||Y===!0){const pt=this.type!==Vn?{minFilter:Pe,magFilter:Pe}:{};V.map!==null&&V.map.dispose(),V.map=new Xi(s.x,s.y,pt),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ct=V.getViewportCount();for(let pt=0;pt<ct;pt++){const Ht=V.getViewport(pt);a.set(r.x*Ht.x,r.y*Ht.y,r.x*Ht.z,r.y*Ht.w),O.viewport(a),V.updateMatrices(Z,pt),n=V.getFrustum(),y(C,L,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===Vn&&M(V,L),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,b,P)};function M(T,C){const L=t.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Xi(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,L,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,L,f,_,null)}function E(T,C,L,S){let b=null;const P=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)b=P;else if(b=L.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=b.uuid,z=C.uuid;let Y=l[O];Y===void 0&&(Y={},l[O]=Y);let W=Y[z];W===void 0&&(W=b.clone(),Y[z]=W,C.addEventListener("dispose",A)),b=W}if(b.visible=C.visible,b.wireframe=C.wireframe,S===Vn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:d[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,L.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const O=i.properties.get(b);O.light=L}return b}function y(T,C,L,S,b){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Vn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const z=t.update(T),Y=T.material;if(Array.isArray(Y)){const W=z.groups;for(let K=0,Z=W.length;K<Z;K++){const V=W[K],st=Y[V.materialIndex];if(st&&st.visible){const ct=E(T,st,S,b);T.onBeforeShadow(i,T,C,L,z,ct,V),i.renderBufferDirect(L,null,z,ct,T,V),T.onAfterShadow(i,T,C,L,z,ct,V)}}}else if(Y.visible){const W=E(T,Y,S,b);T.onBeforeShadow(i,T,C,L,z,W,null),i.renderBufferDirect(L,null,z,W,T,null),T.onAfterShadow(i,T,C,L,z,W,null)}}const O=T.children;for(let z=0,Y=O.length;z<Y;z++)y(O[z],C,L,S,b)}function A(T){T.target.removeEventListener("dispose",A);for(const L in l){const S=l[L],b=T.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const Yv={[lc]:hc,[uc]:pc,[dc]:mc,[Es]:fc,[hc]:lc,[pc]:uc,[mc]:dc,[fc]:Es};function jv(i,t){function e(){let D=!1;const it=new we;let at=null;const mt=new we(0,0,0,0);return{setMask:function(tt){at!==tt&&!D&&(i.colorMask(tt,tt,tt,tt),at=tt)},setLocked:function(tt){D=tt},setClear:function(tt,$,xt,kt,ue){ue===!0&&(tt*=kt,$*=kt,xt*=kt),it.set(tt,$,xt,kt),mt.equals(it)===!1&&(i.clearColor(tt,$,xt,kt),mt.copy(it))},reset:function(){D=!1,at=null,mt.set(-1,0,0,0)}}}function n(){let D=!1,it=!1,at=null,mt=null,tt=null;return{setReversed:function($){if(it!==$){const xt=t.get("EXT_clip_control");$?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),it=$;const kt=tt;tt=null,this.setClear(kt)}},getReversed:function(){return it},setTest:function($){$?J(i.DEPTH_TEST):ft(i.DEPTH_TEST)},setMask:function($){at!==$&&!D&&(i.depthMask($),at=$)},setFunc:function($){if(it&&($=Yv[$]),mt!==$){switch($){case lc:i.depthFunc(i.NEVER);break;case hc:i.depthFunc(i.ALWAYS);break;case uc:i.depthFunc(i.LESS);break;case Es:i.depthFunc(i.LEQUAL);break;case dc:i.depthFunc(i.EQUAL);break;case fc:i.depthFunc(i.GEQUAL);break;case pc:i.depthFunc(i.GREATER);break;case mc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=$}},setLocked:function($){D=$},setClear:function($){tt!==$&&(it&&($=1-$),i.clearDepth($),tt=$)},reset:function(){D=!1,at=null,mt=null,tt=null,it=!1}}}function s(){let D=!1,it=null,at=null,mt=null,tt=null,$=null,xt=null,kt=null,ue=null;return{setTest:function(ee){D||(ee?J(i.STENCIL_TEST):ft(i.STENCIL_TEST))},setMask:function(ee){it!==ee&&!D&&(i.stencilMask(ee),it=ee)},setFunc:function(ee,Fn,wn){(at!==ee||mt!==Fn||tt!==wn)&&(i.stencilFunc(ee,Fn,wn),at=ee,mt=Fn,tt=wn)},setOp:function(ee,Fn,wn){($!==ee||xt!==Fn||kt!==wn)&&(i.stencilOp(ee,Fn,wn),$=ee,xt=Fn,kt=wn)},setLocked:function(ee){D=ee},setClear:function(ee){ue!==ee&&(i.clearStencil(ee),ue=ee)},reset:function(){D=!1,it=null,at=null,mt=null,tt=null,$=null,xt=null,kt=null,ue=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,E=null,y=null,A=null,T=null,C=new Wt(0,0,0),L=0,S=!1,b=null,P=null,O=null,z=null,Y=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,Z=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),K=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),K=Z>=2);let st=null,ct={};const pt=i.getParameter(i.SCISSOR_BOX),Ht=i.getParameter(i.VIEWPORT),te=new we().fromArray(pt),he=new we().fromArray(Ht);function Vt(D,it,at,mt){const tt=new Uint8Array(4),$=i.createTexture();i.bindTexture(D,$),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<at;xt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,tt):i.texImage2D(it+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,tt);return $}const j={};j[i.TEXTURE_2D]=Vt(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(Es),Rt(!1),gt(Yl),J(i.CULL_FACE),oe(ui);function J(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function ft(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Ct(D,it){return d[D]!==it?(i.bindFramebuffer(D,it),d[D]=it,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=it),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=it),!0):!1}function Mt(D,it){let at=f,mt=!1;if(D){at=u.get(it),at===void 0&&(at=[],u.set(it,at));const tt=D.textures;if(at.length!==tt.length||at[0]!==i.COLOR_ATTACHMENT0){for(let $=0,xt=tt.length;$<xt;$++)at[$]=i.COLOR_ATTACHMENT0+$;at.length=tt.length,mt=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,mt=!0);mt&&i.drawBuffers(at)}function Xt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const Te={[ki]:i.FUNC_ADD,[Uf]:i.FUNC_SUBTRACT,[Nf]:i.FUNC_REVERSE_SUBTRACT};Te[Ff]=i.MIN,Te[kf]=i.MAX;const R={[Of]:i.ZERO,[zf]:i.ONE,[Bf]:i.SRC_COLOR,[oc]:i.SRC_ALPHA,[qf]:i.SRC_ALPHA_SATURATE,[Wf]:i.DST_COLOR,[Vf]:i.DST_ALPHA,[Hf]:i.ONE_MINUS_SRC_COLOR,[cc]:i.ONE_MINUS_SRC_ALPHA,[Xf]:i.ONE_MINUS_DST_COLOR,[Gf]:i.ONE_MINUS_DST_ALPHA,[Yf]:i.CONSTANT_COLOR,[jf]:i.ONE_MINUS_CONSTANT_COLOR,[Kf]:i.CONSTANT_ALPHA,[$f]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(D,it,at,mt,tt,$,xt,kt,ue,ee){if(D===ui){_===!0&&(ft(i.BLEND),_=!1);return}if(_===!1&&(J(i.BLEND),_=!0),D!==If){if(D!==m||ee!==S){if((p!==ki||y!==ki)&&(i.blendEquation(i.FUNC_ADD),p=ki,y=ki),ee)switch(D){case xs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jl:i.blendFunc(i.ONE,i.ONE);break;case Kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Kl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $l:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,E=null,A=null,T=null,C.set(0,0,0),L=0,m=D,S=ee}return}tt=tt||it,$=$||at,xt=xt||mt,(it!==p||tt!==y)&&(i.blendEquationSeparate(Te[it],Te[tt]),p=it,y=tt),(at!==M||mt!==E||$!==A||xt!==T)&&(i.blendFuncSeparate(R[at],R[mt],R[$],R[xt]),M=at,E=mt,A=$,T=xt),(kt.equals(C)===!1||ue!==L)&&(i.blendColor(kt.r,kt.g,kt.b,ue),C.copy(kt),L=ue),m=D,S=!1}function Nt(D,it){D.side===yn?ft(i.CULL_FACE):J(i.CULL_FACE);let at=D.side===Ke;it&&(at=!at),Rt(at),D.blending===xs&&D.transparent===!1?oe(ui):oe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const mt=D.stencilWrite;o.setTest(mt),mt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_t(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(D){b!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),b=D)}function gt(D){D!==Pf?(J(i.CULL_FACE),D!==P&&(D===Yl?i.cullFace(i.BACK):D===Df?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ft(i.CULL_FACE),P=D}function ce(D){D!==O&&(K&&i.lineWidth(D),O=D)}function _t(D,it,at){D?(J(i.POLYGON_OFFSET_FILL),(z!==it||Y!==at)&&(i.polygonOffset(it,at),z=it,Y=at)):ft(i.POLYGON_OFFSET_FILL)}function Ft(D){D?J(i.SCISSOR_TEST):ft(i.SCISSOR_TEST)}function Ee(D){D===void 0&&(D=i.TEXTURE0+W-1),st!==D&&(i.activeTexture(D),st=D)}function me(D,it,at){at===void 0&&(st===null?at=i.TEXTURE0+W-1:at=st);let mt=ct[at];mt===void 0&&(mt={type:void 0,texture:void 0},ct[at]=mt),(mt.type!==D||mt.texture!==it)&&(st!==at&&(i.activeTexture(at),st=at),i.bindTexture(D,it||j[D]),mt.type=D,mt.texture=it)}function w(){const D=ct[st];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function rt(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(D){te.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),te.copy(D))}function Dt(D){he.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),he.copy(D))}function St(D,it){let at=l.get(it);at===void 0&&(at=new WeakMap,l.set(it,at));let mt=at.get(D);mt===void 0&&(mt=i.getUniformBlockIndex(it,D.name),at.set(D,mt))}function lt(D,it){const mt=l.get(it).get(D);c.get(it)!==mt&&(i.uniformBlockBinding(it,mt,D.__bindingPointIndex),c.set(it,mt))}function Ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ct={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,M=null,E=null,y=null,A=null,T=null,C=new Wt(0,0,0),L=0,S=!1,b=null,P=null,O=null,z=null,Y=null,te.set(0,0,i.canvas.width,i.canvas.height),he.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ft,bindFramebuffer:Ct,drawBuffers:Mt,useProgram:Xt,setBlending:oe,setMaterial:Nt,setFlipSided:Rt,setCullFace:gt,setLineWidth:ce,setPolygonOffset:_t,setScissorTest:Ft,activeTexture:Ee,bindTexture:me,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:bt,texImage3D:nt,updateUBOMapping:St,uniformBlockBinding:lt,texStorage2D:rt,texStorage3D:yt,texSubImage2D:q,texSubImage3D:Q,compressedTexSubImage2D:G,compressedTexSubImage3D:Et,scissor:ut,viewport:Dt,reset:Ot}}function Kv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new jt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return f?new OffscreenCanvas(w,v):Ha("canvas")}function _(w,v,F){let q=1;const Q=me(w);if((Q.width>F||Q.height>F)&&(q=F/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const G=Math.floor(q*Q.width),Et=Math.floor(q*Q.height);d===void 0&&(d=g(G,Et));const rt=v?g(G,Et):d;return rt.width=G,rt.height=Et,rt.getContext("2d").drawImage(w,0,0,G,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+G+"x"+Et+")."),rt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,v,F,q,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let G=v;if(v===i.RED&&(F===i.FLOAT&&(G=i.R32F),F===i.HALF_FLOAT&&(G=i.R16F),F===i.UNSIGNED_BYTE&&(G=i.R8)),v===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.R8UI),F===i.UNSIGNED_SHORT&&(G=i.R16UI),F===i.UNSIGNED_INT&&(G=i.R32UI),F===i.BYTE&&(G=i.R8I),F===i.SHORT&&(G=i.R16I),F===i.INT&&(G=i.R32I)),v===i.RG&&(F===i.FLOAT&&(G=i.RG32F),F===i.HALF_FLOAT&&(G=i.RG16F),F===i.UNSIGNED_BYTE&&(G=i.RG8)),v===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RG8UI),F===i.UNSIGNED_SHORT&&(G=i.RG16UI),F===i.UNSIGNED_INT&&(G=i.RG32UI),F===i.BYTE&&(G=i.RG8I),F===i.SHORT&&(G=i.RG16I),F===i.INT&&(G=i.RG32I)),v===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGB8UI),F===i.UNSIGNED_SHORT&&(G=i.RGB16UI),F===i.UNSIGNED_INT&&(G=i.RGB32UI),F===i.BYTE&&(G=i.RGB8I),F===i.SHORT&&(G=i.RGB16I),F===i.INT&&(G=i.RGB32I)),v===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),F===i.UNSIGNED_INT&&(G=i.RGBA32UI),F===i.BYTE&&(G=i.RGBA8I),F===i.SHORT&&(G=i.RGBA16I),F===i.INT&&(G=i.RGBA32I)),v===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),v===i.RGBA){const Et=Q?za:Jt.getTransfer(q);F===i.FLOAT&&(G=i.RGBA32F),F===i.HALF_FLOAT&&(G=i.RGBA16F),F===i.UNSIGNED_BYTE&&(G=Et===ae?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function y(w,v){let F;return w?v===null||v===Wi||v===br?F=i.DEPTH24_STENCIL8:v===Pn?F=i.DEPTH32F_STENCIL8:v===yr&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Wi||v===br?F=i.DEPTH_COMPONENT24:v===Pn?F=i.DEPTH_COMPONENT32F:v===yr&&(F=i.DEPTH_COMPONENT16),F}function A(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Pe&&w.minFilter!==Cn?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function T(w){const v=w.target;v.removeEventListener("dispose",T),L(v),v.isVideoTexture&&h.delete(v)}function C(w){const v=w.target;v.removeEventListener("dispose",C),b(v)}function L(w){const v=n.get(w);if(v.__webglInit===void 0)return;const F=w.source,q=u.get(F);if(q){const Q=q[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(w),Object.keys(q).length===0&&u.delete(F)}n.remove(w)}function S(w){const v=n.get(w);i.deleteTexture(v.__webglTexture);const F=w.source,q=u.get(F);delete q[v.__cacheKey],a.memory.textures--}function b(w){const v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Q=0;Q<v.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=w.textures;for(let q=0,Q=F.length;q<Q;q++){const G=n.get(F[q]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(w)}let P=0;function O(){P=0}function z(){const w=P;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),P+=1,w}function Y(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function W(w,v){const F=n.get(w);if(w.isVideoTexture&&Ft(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&F.__version!==w.version){const q=w.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(F,w,v);return}}else w.isExternalTexture&&(F.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+v)}function K(w,v){const F=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){j(F,w,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+v)}function Z(w,v){const F=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){j(F,w,v);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+v)}function V(w,v){const F=n.get(w);if(w.version>0&&F.__version!==w.version){J(F,w,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+v)}const st={[vc]:i.REPEAT,[Bi]:i.CLAMP_TO_EDGE,[xc]:i.MIRRORED_REPEAT},ct={[Pe]:i.NEAREST,[ap]:i.NEAREST_MIPMAP_NEAREST,[rr]:i.NEAREST_MIPMAP_LINEAR,[Cn]:i.LINEAR,[lo]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},pt={[up]:i.NEVER,[_p]:i.ALWAYS,[dp]:i.LESS,[Zu]:i.LEQUAL,[fp]:i.EQUAL,[gp]:i.GEQUAL,[pp]:i.GREATER,[mp]:i.NOTEQUAL};function Ht(w,v){if(v.type===Pn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Cn||v.magFilter===lo||v.magFilter===rr||v.magFilter===ci||v.minFilter===Cn||v.minFilter===lo||v.minFilter===rr||v.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,st[v.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,st[v.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,st[v.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ct[v.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ct[v.minFilter]),v.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,pt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Pe||v.minFilter!==rr&&v.minFilter!==ci||v.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function te(w,v){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",T));const q=v.source;let Q=u.get(q);Q===void 0&&(Q={},u.set(q,Q));const G=Y(v);if(G!==w.__cacheKey){Q[G]===void 0&&(Q[G]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[G].usedTimes++;const Et=Q[w.__cacheKey];Et!==void 0&&(Q[w.__cacheKey].usedTimes--,Et.usedTimes===0&&S(v)),w.__cacheKey=G,w.__webglTexture=Q[G].texture}return F}function he(w,v,F){return Math.floor(Math.floor(w/F)/v)}function Vt(w,v,F,q){const G=w.updateRanges;if(G.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,F,q,v.data);else{G.sort((nt,ut)=>nt.start-ut.start);let Et=0;for(let nt=1;nt<G.length;nt++){const ut=G[Et],Dt=G[nt],St=ut.start+ut.count,lt=he(Dt.start,v.width,4),Ot=he(ut.start,v.width,4);Dt.start<=St+1&&lt===Ot&&he(Dt.start+Dt.count-1,v.width,4)===lt?ut.count=Math.max(ut.count,Dt.start+Dt.count-ut.start):(++Et,G[Et]=Dt)}G.length=Et+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),yt=i.getParameter(i.UNPACK_SKIP_PIXELS),bt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let nt=0,ut=G.length;nt<ut;nt++){const Dt=G[nt],St=Math.floor(Dt.start/4),lt=Math.ceil(Dt.count/4),Ot=St%v.width,D=Math.floor(St/v.width),it=lt,at=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ot),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Ot,D,it,at,F,q,v.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,bt)}}function j(w,v,F){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const Q=te(w,v),G=v.source;e.bindTexture(q,w.__webglTexture,i.TEXTURE0+F);const Et=n.get(G);if(G.version!==Et.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);const rt=Jt.getPrimaries(Jt.workingColorSpace),yt=v.colorSpace===ri?null:Jt.getPrimaries(v.colorSpace),bt=v.colorSpace===ri||rt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let nt=_(v.image,!1,s.maxTextureSize);nt=Ee(v,nt);const ut=r.convert(v.format,v.colorSpace),Dt=r.convert(v.type);let St=E(v.internalFormat,ut,Dt,v.colorSpace,v.isVideoTexture);Ht(q,v);let lt;const Ot=v.mipmaps,D=v.isVideoTexture!==!0,it=Et.__version===void 0||Q===!0,at=G.dataReady,mt=A(v,nt);if(v.isDepthTexture)St=y(v.format===Er,v.type),it&&(D?e.texStorage2D(i.TEXTURE_2D,1,St,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,St,nt.width,nt.height,0,ut,Dt,null));else if(v.isDataTexture)if(Ot.length>0){D&&it&&e.texStorage2D(i.TEXTURE_2D,mt,St,Ot[0].width,Ot[0].height);for(let tt=0,$=Ot.length;tt<$;tt++)lt=Ot[tt],D?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Dt,lt.data):e.texImage2D(i.TEXTURE_2D,tt,St,lt.width,lt.height,0,ut,Dt,lt.data);v.generateMipmaps=!1}else D?(it&&e.texStorage2D(i.TEXTURE_2D,mt,St,nt.width,nt.height),at&&Vt(v,nt,ut,Dt)):e.texImage2D(i.TEXTURE_2D,0,St,nt.width,nt.height,0,ut,Dt,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,St,Ot[0].width,Ot[0].height,nt.depth);for(let tt=0,$=Ot.length;tt<$;tt++)if(lt=Ot[tt],v.format!==En)if(ut!==null)if(D){if(at)if(v.layerUpdates.size>0){const xt=Th(lt.width,lt.height,v.format,v.type);for(const kt of v.layerUpdates){const ue=lt.data.subarray(kt*xt/lt.data.BYTES_PER_ELEMENT,(kt+1)*xt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,kt,lt.width,lt.height,1,ut,ue)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,St,lt.width,lt.height,nt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?at&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,Dt,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,St,lt.width,lt.height,nt.depth,0,ut,Dt,lt.data)}else{D&&it&&e.texStorage2D(i.TEXTURE_2D,mt,St,Ot[0].width,Ot[0].height);for(let tt=0,$=Ot.length;tt<$;tt++)lt=Ot[tt],v.format!==En?ut!==null?D?at&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,St,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Dt,lt.data):e.texImage2D(i.TEXTURE_2D,tt,St,lt.width,lt.height,0,ut,Dt,lt.data)}else if(v.isDataArrayTexture)if(D){if(it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,St,nt.width,nt.height,nt.depth),at)if(v.layerUpdates.size>0){const tt=Th(nt.width,nt.height,v.format,v.type);for(const $ of v.layerUpdates){const xt=nt.data.subarray($*tt/nt.data.BYTES_PER_ELEMENT,($+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,nt.width,nt.height,1,ut,Dt,xt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,Dt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,St,nt.width,nt.height,nt.depth,0,ut,Dt,nt.data);else if(v.isData3DTexture)D?(it&&e.texStorage3D(i.TEXTURE_3D,mt,St,nt.width,nt.height,nt.depth),at&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,Dt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,St,nt.width,nt.height,nt.depth,0,ut,Dt,nt.data);else if(v.isFramebufferTexture){if(it)if(D)e.texStorage2D(i.TEXTURE_2D,mt,St,nt.width,nt.height);else{let tt=nt.width,$=nt.height;for(let xt=0;xt<mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,St,tt,$,0,ut,Dt,null),tt>>=1,$>>=1}}else if(Ot.length>0){if(D&&it){const tt=me(Ot[0]);e.texStorage2D(i.TEXTURE_2D,mt,St,tt.width,tt.height)}for(let tt=0,$=Ot.length;tt<$;tt++)lt=Ot[tt],D?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ut,Dt,lt):e.texImage2D(i.TEXTURE_2D,tt,St,ut,Dt,lt);v.generateMipmaps=!1}else if(D){if(it){const tt=me(nt);e.texStorage2D(i.TEXTURE_2D,mt,St,tt.width,tt.height)}at&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Dt,nt)}else e.texImage2D(i.TEXTURE_2D,0,St,ut,Dt,nt);m(v)&&p(q),Et.__version=G.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function J(w,v,F){if(v.image.length!==6)return;const q=te(w,v),Q=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+F);const G=n.get(Q);if(Q.version!==G.__version||q===!0){e.activeTexture(i.TEXTURE0+F);const Et=Jt.getPrimaries(Jt.workingColorSpace),rt=v.colorSpace===ri?null:Jt.getPrimaries(v.colorSpace),yt=v.colorSpace===ri||Et===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const bt=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,ut=[];for(let $=0;$<6;$++)!bt&&!nt?ut[$]=_(v.image[$],!0,s.maxCubemapSize):ut[$]=nt?v.image[$].image:v.image[$],ut[$]=Ee(v,ut[$]);const Dt=ut[0],St=r.convert(v.format,v.colorSpace),lt=r.convert(v.type),Ot=E(v.internalFormat,St,lt,v.colorSpace),D=v.isVideoTexture!==!0,it=G.__version===void 0||q===!0,at=Q.dataReady;let mt=A(v,Dt);Ht(i.TEXTURE_CUBE_MAP,v);let tt;if(bt){D&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Ot,Dt.width,Dt.height);for(let $=0;$<6;$++){tt=ut[$].mipmaps;for(let xt=0;xt<tt.length;xt++){const kt=tt[xt];v.format!==En?St!==null?D?at&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt,0,0,kt.width,kt.height,St,kt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt,Ot,kt.width,kt.height,0,kt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt,0,0,kt.width,kt.height,St,lt,kt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt,Ot,kt.width,kt.height,0,St,lt,kt.data)}}}else{if(tt=v.mipmaps,D&&it){tt.length>0&&mt++;const $=me(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Ot,$.width,$.height)}for(let $=0;$<6;$++)if(nt){D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ut[$].width,ut[$].height,St,lt,ut[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ot,ut[$].width,ut[$].height,0,St,lt,ut[$].data);for(let xt=0;xt<tt.length;xt++){const ue=tt[xt].image[$].image;D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt+1,0,0,ue.width,ue.height,St,lt,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt+1,Ot,ue.width,ue.height,0,St,lt,ue.data)}}else{D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,St,lt,ut[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ot,St,lt,ut[$]);for(let xt=0;xt<tt.length;xt++){const kt=tt[xt];D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt+1,0,0,St,lt,kt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,xt+1,Ot,St,lt,kt.image[$])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),G.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ft(w,v,F,q,Q,G){const Et=r.convert(F.format,F.colorSpace),rt=r.convert(F.type),yt=E(F.internalFormat,Et,rt,F.colorSpace),bt=n.get(v),nt=n.get(F);if(nt.__renderTarget=v,!bt.__hasExternalTextures){const ut=Math.max(1,v.width>>G),Dt=Math.max(1,v.height>>G);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,G,yt,ut,Dt,v.depth,0,Et,rt,null):e.texImage2D(Q,G,yt,ut,Dt,0,Et,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),_t(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,nt.__webglTexture,0,ce(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,nt.__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ct(w,v,F){if(i.bindRenderbuffer(i.RENDERBUFFER,w),v.depthBuffer){const q=v.depthTexture,Q=q&&q.isDepthTexture?q.type:null,G=y(v.stencilBuffer,Q),Et=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=ce(v);_t(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,G,v.width,v.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,G,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,G,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,w)}else{const q=v.textures;for(let Q=0;Q<q.length;Q++){const G=q[Q],Et=r.convert(G.format,G.colorSpace),rt=r.convert(G.type),yt=E(G.internalFormat,Et,rt,G.colorSpace),bt=ce(v);F&&_t(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,yt,v.width,v.height):_t(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,yt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,yt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Mt(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const Q=q.__webglTexture,G=ce(v);if(v.depthTexture.format===Sr)_t(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Er)_t(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Xt(w){const v=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const q=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=q}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const q=w.texture.mipmaps;q&&q.length>0?Mt(v.__webglFramebuffer[0],w):Mt(v.__webglFramebuffer,w)}else if(F){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),Ct(v.__webglDepthbuffer[q],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,G)}}else{const q=w.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ct(v.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,G)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(w,v,F){const q=n.get(w);v!==void 0&&ft(q.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Xt(w)}function R(w){const v=w.texture,F=n.get(w),q=n.get(v);w.addEventListener("dispose",C);const Q=w.textures,G=w.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,a.memory.textures++),G){F.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[rt]=[];for(let yt=0;yt<v.mipmaps.length;yt++)F.__webglFramebuffer[rt][yt]=i.createFramebuffer()}else F.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let rt=0;rt<v.mipmaps.length;rt++)F.__webglFramebuffer[rt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Et)for(let rt=0,yt=Q.length;rt<yt;rt++){const bt=n.get(Q[rt]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&_t(w)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const yt=Q[rt];F.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[rt]);const bt=r.convert(yt.format,yt.colorSpace),nt=r.convert(yt.type),ut=E(yt.internalFormat,bt,nt,yt.colorSpace,w.isXRRenderTarget===!0),Dt=ce(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,ut,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,F.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Ct(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ht(i.TEXTURE_CUBE_MAP,v);for(let rt=0;rt<6;rt++)if(v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)ft(F.__webglFramebuffer[rt][yt],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,yt);else ft(F.__webglFramebuffer[rt],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let rt=0,yt=Q.length;rt<yt;rt++){const bt=Q[rt],nt=n.get(bt);let ut=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ut=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,nt.__webglTexture),Ht(ut,bt),ft(F.__webglFramebuffer,w,bt,i.COLOR_ATTACHMENT0+rt,ut,0),m(bt)&&p(ut)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(rt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,q.__webglTexture),Ht(rt,v),v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)ft(F.__webglFramebuffer[yt],w,v,i.COLOR_ATTACHMENT0,rt,yt);else ft(F.__webglFramebuffer,w,v,i.COLOR_ATTACHMENT0,rt,0);m(v)&&p(rt),e.unbindTexture()}w.depthBuffer&&Xt(w)}function oe(w){const v=w.textures;for(let F=0,q=v.length;F<q;F++){const Q=v[F];if(m(Q)){const G=M(w),Et=n.get(Q).__webglTexture;e.bindTexture(G,Et),p(G),e.unbindTexture()}}}const Nt=[],Rt=[];function gt(w){if(w.samples>0){if(_t(w)===!1){const v=w.textures,F=w.width,q=w.height;let Q=i.COLOR_BUFFER_BIT;const G=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(w),rt=v.length>1;if(rt)for(let bt=0;bt<v.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer);const yt=w.texture.mipmaps;yt&&yt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let bt=0;bt<v.length;bt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[bt]);const nt=n.get(v[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,F,q,0,0,F,q,Q,i.NEAREST),c===!0&&(Nt.length=0,Rt.length=0,Nt.push(i.COLOR_ATTACHMENT0+bt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Nt.push(G),Rt.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Nt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let bt=0;bt<v.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,Et.__webglColorRenderbuffer[bt]);const nt=n.get(v[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ce(w){return Math.min(s.maxSamples,w.samples)}function _t(w){const v=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ft(w){const v=a.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function Ee(w,v){const F=w.colorSpace,q=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==As&&F!==ri&&(Jt.getTransfer(F)===ae?(q!==En||Q!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function me(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=K,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=Te,this.setupRenderTarget=R,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=_t}function $v(i,t){function e(n,s=ri){let r;const a=Jt.getTransfer(s);if(n===Kn)return i.UNSIGNED_BYTE;if(n===fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wu)return i.BYTE;if(n===Xu)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===dl)return i.INT;if(n===Wi)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===Lr)return i.HALF_FLOAT;if(n===ju)return i.ALPHA;if(n===Ku)return i.RGB;if(n===En)return i.RGBA;if(n===Sr)return i.DEPTH_COMPONENT;if(n===Er)return i.DEPTH_STENCIL;if(n===Ir)return i.RED;if(n===ml)return i.RED_INTEGER;if(n===$u)return i.RG;if(n===gl)return i.RG_INTEGER;if(n===_l)return i.RGBA_INTEGER;if(n===Ea||n===wa||n===Ta||n===Aa)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mc||n===yc||n===bc||n===Sc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ec||n===wc||n===Tc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ec||n===wc)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Tc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ac||n===Rc||n===Cc||n===Pc||n===Dc||n===Lc||n===Ic||n===Uc||n===Nc||n===Fc||n===kc||n===Oc||n===zc||n===Bc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ac)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Rc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Cc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Dc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ic)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Hc||n===Vc||n===Gc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Hc)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Gc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wc||n===Xc||n===qc||n===Yc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===br?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Zv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jv=`
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

}`;class Qv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new dd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ve({vertexShader:Zv,fragmentShader:Jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Se(new Os(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tx extends Ns{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Qv,p={},M=e.getContextAttributes();let E=null,y=null;const A=[],T=[],C=new jt;let L=null;const S=new pn;S.viewport=new we;const b=new pn;b.viewport=new we;const P=[S,b],O=new ym;let z=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=A[j];return J===void 0&&(J=new Do,A[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=A[j];return J===void 0&&(J=new Do,A[j]=J),J.getGripSpace()},this.getHand=function(j){let J=A[j];return J===void 0&&(J=new Do,A[j]=J),J.getHandSpace()};function W(j){const J=T.indexOf(j.inputSource);if(J===-1)return;const ft=A[J];ft!==void 0&&(ft.update(j.inputSource,j.frame,l||a),ft.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",Z);for(let j=0;j<A.length;j++){const J=T[j];J!==null&&(T[j]=null,A[j].disconnect(J))}z=null,Y=null,m.reset();for(const j in p)delete p[j];t.setRenderTarget(E),f=null,u=null,d=null,s=null,y=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",K),s.addEventListener("inputsourceschange",Z),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,Ct=null,Mt=null;M.depth&&(Mt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=M.stencil?Er:Sr,Ct=M.stencil?br:Wi);const Xt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Xt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Xi(u.textureWidth,u.textureHeight,{format:En,type:Kn,depthTexture:new ud(u.textureWidth,u.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ft={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ft),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xi(f.framebufferWidth,f.framebufferHeight,{format:En,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Vt.setContext(s),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(j){for(let J=0;J<j.removed.length;J++){const ft=j.removed[J],Ct=T.indexOf(ft);Ct>=0&&(T[Ct]=null,A[Ct].disconnect(ft))}for(let J=0;J<j.added.length;J++){const ft=j.added[J];let Ct=T.indexOf(ft);if(Ct===-1){for(let Xt=0;Xt<A.length;Xt++)if(Xt>=T.length){T.push(ft),Ct=Xt;break}else if(T[Xt]===null){T[Xt]=ft,Ct=Xt;break}if(Ct===-1)break}const Mt=A[Ct];Mt&&Mt.connect(ft)}}const V=new I,st=new I;function ct(j,J,ft){V.setFromMatrixPosition(J.matrixWorld),st.setFromMatrixPosition(ft.matrixWorld);const Ct=V.distanceTo(st),Mt=J.projectionMatrix.elements,Xt=ft.projectionMatrix.elements,Te=Mt[14]/(Mt[10]-1),R=Mt[14]/(Mt[10]+1),oe=(Mt[9]+1)/Mt[5],Nt=(Mt[9]-1)/Mt[5],Rt=(Mt[8]-1)/Mt[0],gt=(Xt[8]+1)/Xt[0],ce=Te*Rt,_t=Te*gt,Ft=Ct/(-Rt+gt),Ee=Ft*-Rt;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ee),j.translateZ(Ft),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Mt[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const me=Te+Ft,w=R+Ft,v=ce-Ee,F=_t+(Ct-Ee),q=oe*R/w*me,Q=Nt*R/w*me;j.projectionMatrix.makePerspective(v,F,q,Q,me,w),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function pt(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let J=j.near,ft=j.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ft=m.depthFar)),O.near=b.near=S.near=J,O.far=b.far=S.far=ft,(z!==O.near||Y!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),z=O.near,Y=O.far),O.layers.mask=j.layers.mask|6,S.layers.mask=O.layers.mask&3,b.layers.mask=O.layers.mask&5;const Ct=j.parent,Mt=O.cameras;pt(O,Ct);for(let Xt=0;Xt<Mt.length;Xt++)pt(Mt[Xt],Ct);Mt.length===2?ct(O,S,b):O.projectionMatrix.copy(S.projectionMatrix),Ht(j,O,Ct)};function Ht(j,J,ft){ft===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(ft.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=wr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(j){c=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(j){return p[j]};let te=null;function he(j,J){if(h=J.getViewerPose(l||a),g=J,h!==null){const ft=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Ct=!1;ft.length!==O.cameras.length&&(O.cameras.length=0,Ct=!0);for(let R=0;R<ft.length;R++){const oe=ft[R];let Nt=null;if(f!==null)Nt=f.getViewport(oe);else{const gt=d.getViewSubImage(u,oe);Nt=gt.viewport,R===0&&(t.setRenderTargetTextures(y,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(y))}let Rt=P[R];Rt===void 0&&(Rt=new pn,Rt.layers.enable(R),Rt.viewport=new we,P[R]=Rt),Rt.matrix.fromArray(oe.transform.matrix),Rt.matrix.decompose(Rt.position,Rt.quaternion,Rt.scale),Rt.projectionMatrix.fromArray(oe.projectionMatrix),Rt.projectionMatrixInverse.copy(Rt.projectionMatrix).invert(),Rt.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),R===0&&(O.matrix.copy(Rt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ct===!0&&O.cameras.push(Rt)}const Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const R=d.getDepthInformation(ft[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let R=0;R<ft.length;R++){const oe=ft[R].camera;if(oe){let Nt=p[oe];Nt||(Nt=new dd,p[oe]=Nt);const Rt=d.getCameraImage(oe);Nt.sourceTexture=Rt}}}}for(let ft=0;ft<A.length;ft++){const Ct=T[ft],Mt=A[ft];Ct!==null&&Mt!==void 0&&Mt.update(Ct,J,l||a)}te&&te(j,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Vt=new fd;Vt.setAnimationLoop(he),this.setAnimationLoop=function(j){te=j},this.dispose=function(){}}}const Pi=new $n,ex=new pe;function nx(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,sd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,E,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,M,E):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),E=M.envMap,y=M.envMapRotation;E&&(m.envMap.value=E,Pi.copy(y),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),m.envMapRotation.value.setFromMatrix4(ex.makeRotationFromEuler(Pi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ix(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){const y=E.program;n.uniformBlockBinding(M,y)}function l(M,E){let y=s[M.id];y===void 0&&(g(M),y=h(M),s[M.id]=y,M.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(M,A);const T=t.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function h(M){const E=d();M.__bindingPointIndex=E;const y=i.createBuffer(),A=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,y),y}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const E=s[M.id],y=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,C=y.length;T<C;T++){const L=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,b=L.length;S<b;S++){const P=L[S];if(f(P,T,S,A)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let W=0;W<z.length;W++){const K=z[W],Z=_(K);typeof K=="number"||typeof K=="boolean"?(P.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,O+Y,P.__data)):K.isMatrix3?(P.__data[0]=K.elements[0],P.__data[1]=K.elements[1],P.__data[2]=K.elements[2],P.__data[3]=0,P.__data[4]=K.elements[3],P.__data[5]=K.elements[4],P.__data[6]=K.elements[5],P.__data[7]=0,P.__data[8]=K.elements[6],P.__data[9]=K.elements[7],P.__data[10]=K.elements[8],P.__data[11]=0):(K.toArray(P.__data,Y),Y+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,E,y,A){const T=M.value,C=E+"_"+y;if(A[C]===void 0)return typeof T=="number"||typeof T=="boolean"?A[C]=T:A[C]=T.clone(),!0;{const L=A[C];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return A[C]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(M){const E=M.uniforms;let y=0;const A=16;for(let C=0,L=E.length;C<L;C++){const S=Array.isArray(E[C])?E[C]:[E[C]];for(let b=0,P=S.length;b<P;b++){const O=S[b],z=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,W=z.length;Y<W;Y++){const K=z[Y],Z=_(K),V=y%A,st=V%Z.boundary,ct=V+st;y+=st,ct!==0&&A-ct<Z.storage&&(y+=A-ct),O.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=Z.storage}}}const T=y%A;return T>0&&(y+=A-T),M.__size=y,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function m(M){const E=M.target;E.removeEventListener("dispose",m);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class sx{constructor(t={}){const{canvas:e=Np(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let A=!1;this._outputColorSpace=Be;let T=0,C=0,L=null,S=-1,b=null;const P=new we,O=new we;let z=null;const Y=new Wt(0);let W=0,K=e.width,Z=e.height,V=1,st=null,ct=null;const pt=new we(0,0,K,Z),Ht=new we(0,0,K,Z);let te=!1;const he=new ld;let Vt=!1,j=!1;const J=new pe,ft=new I,Ct=new we,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function Te(){return L===null?V:1}let R=n;function oe(x,U){return e.getContext(x,U)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ul}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",tt,!1),R===null){const U="webgl2";if(R=oe(U,x),R===null)throw oe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Nt,Rt,gt,ce,_t,Ft,Ee,me,w,v,F,q,Q,G,Et,rt,yt,bt,nt,ut,Dt,St,lt,Ot;function D(){Nt=new p_(R),Nt.init(),St=new $v(R,Nt),Rt=new o_(R,Nt,t,St),gt=new jv(R,Nt),Rt.reversedDepthBuffer&&u&&gt.buffers.depth.setReversed(!0),ce=new __(R),_t=new Nv,Ft=new Kv(R,Nt,gt,_t,Rt,St,ce),Ee=new l_(y),me=new f_(y),w=new Sm(R),lt=new r_(R,w),v=new m_(R,w,ce,lt),F=new x_(R,v,w,ce),nt=new v_(R,Rt,Ft),rt=new c_(_t),q=new Uv(y,Ee,me,Nt,Rt,lt,rt),Q=new nx(y,_t),G=new kv,Et=new Gv(Nt),bt=new s_(y,Ee,me,gt,F,f,c),yt=new qv(y,F,Rt),Ot=new ix(R,ce,Rt,gt),ut=new a_(R,Nt,ce),Dt=new g_(R,Nt,ce),ce.programs=q.programs,y.capabilities=Rt,y.extensions=Nt,y.properties=_t,y.renderLists=G,y.shadowMap=yt,y.state=gt,y.info=ce}D();const it=new tx(y,R);this.xr=it,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const x=Nt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Nt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(x){x!==void 0&&(V=x,this.setSize(K,Z,!1))},this.getSize=function(x){return x.set(K,Z)},this.setSize=function(x,U,B=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=x,Z=U,e.width=Math.floor(x*V),e.height=Math.floor(U*V),B===!0&&(e.style.width=x+"px",e.style.height=U+"px"),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(K*V,Z*V).floor()},this.setDrawingBufferSize=function(x,U,B){K=x,Z=U,V=B,e.width=Math.floor(x*B),e.height=Math.floor(U*B),this.setViewport(0,0,x,U)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(pt)},this.setViewport=function(x,U,B,H){x.isVector4?pt.set(x.x,x.y,x.z,x.w):pt.set(x,U,B,H),gt.viewport(P.copy(pt).multiplyScalar(V).round())},this.getScissor=function(x){return x.copy(Ht)},this.setScissor=function(x,U,B,H){x.isVector4?Ht.set(x.x,x.y,x.z,x.w):Ht.set(x,U,B,H),gt.scissor(O.copy(Ht).multiplyScalar(V).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(x){gt.setScissorTest(te=x)},this.setOpaqueSort=function(x){st=x},this.setTransparentSort=function(x){ct=x},this.getClearColor=function(x){return x.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,B=!0){let H=0;if(x){let N=!1;if(L!==null){const et=L.texture.format;N=et===_l||et===gl||et===ml}if(N){const et=L.texture.type,ht=et===Kn||et===Wi||et===yr||et===br||et===fl||et===pl,vt=bt.getClearColor(),dt=bt.getClearAlpha(),Pt=vt.r,It=vt.g,Tt=vt.b;ht?(g[0]=Pt,g[1]=It,g[2]=Tt,g[3]=dt,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=Pt,_[1]=It,_[2]=Tt,_[3]=dt,R.clearBufferiv(R.COLOR,0,_))}else H|=R.COLOR_BUFFER_BIT}U&&(H|=R.DEPTH_BUFFER_BIT),B&&(H|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),bt.dispose(),G.dispose(),Et.dispose(),_t.dispose(),Ee.dispose(),me.dispose(),F.dispose(),lt.dispose(),Ot.dispose(),q.dispose(),it.dispose(),it.removeEventListener("sessionstart",wn),it.removeEventListener("sessionend",Bl),bi.stop()};function at(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const x=ce.autoReset,U=yt.enabled,B=yt.autoUpdate,H=yt.needsUpdate,N=yt.type;D(),ce.autoReset=x,yt.enabled=U,yt.autoUpdate=B,yt.needsUpdate=H,yt.type=N}function tt(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function $(x){const U=x.target;U.removeEventListener("dispose",$),xt(U)}function xt(x){kt(x),_t.remove(x)}function kt(x){const U=_t.get(x).programs;U!==void 0&&(U.forEach(function(B){q.releaseProgram(B)}),x.isShaderMaterial&&q.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,B,H,N,et){U===null&&(U=Mt);const ht=N.isMesh&&N.matrixWorld.determinant()<0,vt=of(x,U,B,H,N);gt.setMaterial(H,ht);let dt=B.index,Pt=1;if(H.wireframe===!0){if(dt=v.getWireframeAttribute(B),dt===void 0)return;Pt=2}const It=B.drawRange,Tt=B.attributes.position;let qt=It.start*Pt,re=(It.start+It.count)*Pt;et!==null&&(qt=Math.max(qt,et.start*Pt),re=Math.min(re,(et.start+et.count)*Pt)),dt!==null?(qt=Math.max(qt,0),re=Math.min(re,dt.count)):Tt!=null&&(qt=Math.max(qt,0),re=Math.min(re,Tt.count));const Me=re-qt;if(Me<0||Me===1/0)return;lt.setup(N,H,vt,B,dt);let de,le=ut;if(dt!==null&&(de=w.get(dt),le=Dt,le.setIndex(de)),N.isMesh)H.wireframe===!0?(gt.setLineWidth(H.wireframeLinewidth*Te()),le.setMode(R.LINES)):le.setMode(R.TRIANGLES);else if(N.isLine){let At=H.linewidth;At===void 0&&(At=1),gt.setLineWidth(At*Te()),N.isLineSegments?le.setMode(R.LINES):N.isLineLoop?le.setMode(R.LINE_LOOP):le.setMode(R.LINE_STRIP)}else N.isPoints?le.setMode(R.POINTS):N.isSprite&&le.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Tr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Nt.get("WEBGL_multi_draw"))le.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const At=N._multiDrawStarts,ge=N._multiDrawCounts,$t=N._multiDrawCount,nn=dt?w.get(dt).bytesPerElement:1,Yi=_t.get(H).currentProgram.getUniforms();for(let sn=0;sn<$t;sn++)Yi.setValue(R,"_gl_DrawID",sn),le.render(At[sn]/nn,ge[sn])}else if(N.isInstancedMesh)le.renderInstances(qt,Me,N.count);else if(B.isInstancedBufferGeometry){const At=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ge=Math.min(B.instanceCount,At);le.renderInstances(qt,Me,ge)}else le.render(qt,Me)};function ue(x,U,B){x.transparent===!0&&x.side===yn&&x.forceSinglePass===!1?(x.side=Ke,x.needsUpdate=!0,Or(x,U,B),x.side=mi,x.needsUpdate=!0,Or(x,U,B),x.side=yn):Or(x,U,B)}this.compile=function(x,U,B=null){B===null&&(B=x),p=Et.get(B),p.init(U),E.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),x!==B&&x.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return x.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const et=N.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const vt=et[ht];ue(vt,B,N),H.add(vt)}else ue(et,B,N),H.add(et)}),p=E.pop(),H},this.compileAsync=function(x,U,B=null){const H=this.compile(x,U,B);return new Promise(N=>{function et(){if(H.forEach(function(ht){_t.get(ht).currentProgram.isReady()&&H.delete(ht)}),H.size===0){N(x);return}setTimeout(et,10)}Nt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let ee=null;function Fn(x){ee&&ee(x)}function wn(){bi.stop()}function Bl(){bi.start()}const bi=new fd;bi.setAnimationLoop(Fn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(x){ee=x,it.setAnimationLoop(x),x===null?bi.stop():bi.start()},it.addEventListener("sessionstart",wn),it.addEventListener("sessionend",Bl),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(U),U=it.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,U,L),p=Et.get(x,E.length),p.init(U),E.push(p),J.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),he.setFromProjectionMatrix(J,Dn,U.reversedDepth),j=this.localClippingEnabled,Vt=rt.init(this.clippingPlanes,j),m=G.get(x,M.length),m.init(),M.push(m),it.enabled===!0&&it.isPresenting===!0){const et=y.xr.getDepthSensingMesh();et!==null&&oo(et,U,-1/0,y.sortObjects)}oo(x,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(st,ct),Xt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Xt&&bt.addToRenderList(m,x),this.info.render.frame++,Vt===!0&&rt.beginShadows();const B=p.state.shadowsArray;yt.render(B,x,U),Vt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const et=U.cameras;if(N.length>0)for(let ht=0,vt=et.length;ht<vt;ht++){const dt=et[ht];Vl(H,N,x,dt)}Xt&&bt.render(x);for(let ht=0,vt=et.length;ht<vt;ht++){const dt=et[ht];Hl(m,x,dt,dt.viewport)}}else N.length>0&&Vl(H,N,x,U),Xt&&bt.render(x),Hl(m,x,U);L!==null&&C===0&&(Ft.updateMultisampleRenderTarget(L),Ft.updateRenderTargetMipmap(L)),x.isScene===!0&&x.onAfterRender(y,x,U),lt.resetDefaultState(),S=-1,b=null,E.pop(),E.length>0?(p=E[E.length-1],Vt===!0&&rt.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function oo(x,U,B,H){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)B=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||he.intersectsSprite(x)){H&&Ct.setFromMatrixPosition(x.matrixWorld).applyMatrix4(J);const ht=F.update(x),vt=x.material;vt.visible&&m.push(x,ht,vt,B,Ct.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||he.intersectsObject(x))){const ht=F.update(x),vt=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ct.copy(x.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ct.copy(ht.boundingSphere.center)),Ct.applyMatrix4(x.matrixWorld).applyMatrix4(J)),Array.isArray(vt)){const dt=ht.groups;for(let Pt=0,It=dt.length;Pt<It;Pt++){const Tt=dt[Pt],qt=vt[Tt.materialIndex];qt&&qt.visible&&m.push(x,ht,qt,B,Ct.z,Tt)}}else vt.visible&&m.push(x,ht,vt,B,Ct.z,null)}}const et=x.children;for(let ht=0,vt=et.length;ht<vt;ht++)oo(et[ht],U,B,H)}function Hl(x,U,B,H){const N=x.opaque,et=x.transmissive,ht=x.transparent;p.setupLightsView(B),Vt===!0&&rt.setGlobalState(y.clippingPlanes,B),H&&gt.viewport(P.copy(H)),N.length>0&&kr(N,U,B),et.length>0&&kr(et,U,B),ht.length>0&&kr(ht,U,B),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function Vl(x,U,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Xi(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?Lr:Kn,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const et=p.state.transmissionRenderTarget[H.id],ht=H.viewport||P;et.setSize(ht.z*y.transmissionResolutionScale,ht.w*y.transmissionResolutionScale);const vt=y.getRenderTarget(),dt=y.getActiveCubeFace(),Pt=y.getActiveMipmapLevel();y.setRenderTarget(et),y.getClearColor(Y),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),Xt&&bt.render(B);const It=y.toneMapping;y.toneMapping=Wn;const Tt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),Vt===!0&&rt.setGlobalState(y.clippingPlanes,H),kr(x,B,H),Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let re=0,Me=U.length;re<Me;re++){const de=U[re],le=de.object,At=de.geometry,ge=de.material,$t=de.group;if(ge.side===yn&&le.layers.test(H.layers)){const nn=ge.side;ge.side=Ke,ge.needsUpdate=!0,Gl(le,B,H,At,ge,$t),ge.side=nn,ge.needsUpdate=!0,qt=!0}}qt===!0&&(Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et))}y.setRenderTarget(vt,dt,Pt),y.setClearColor(Y,W),Tt!==void 0&&(H.viewport=Tt),y.toneMapping=It}function kr(x,U,B){const H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,et=x.length;N<et;N++){const ht=x[N],vt=ht.object,dt=ht.geometry,Pt=ht.group;let It=ht.material;It.allowOverride===!0&&H!==null&&(It=H),vt.layers.test(B.layers)&&Gl(vt,U,B,dt,It,Pt)}}function Gl(x,U,B,H,N,et){x.onBeforeRender(y,U,B,H,N,et),x.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),N.onBeforeRender(y,U,B,H,x,et),N.transparent===!0&&N.side===yn&&N.forceSinglePass===!1?(N.side=Ke,N.needsUpdate=!0,y.renderBufferDirect(B,U,H,N,x,et),N.side=mi,N.needsUpdate=!0,y.renderBufferDirect(B,U,H,N,x,et),N.side=yn):y.renderBufferDirect(B,U,H,N,x,et),x.onAfterRender(y,U,B,H,N,et)}function Or(x,U,B){U.isScene!==!0&&(U=Mt);const H=_t.get(x),N=p.state.lights,et=p.state.shadowsArray,ht=N.state.version,vt=q.getParameters(x,N.state,et,U,B),dt=q.getProgramCacheKey(vt);let Pt=H.programs;H.environment=x.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(x.isMeshStandardMaterial?me:Ee).get(x.envMap||H.environment),H.envMapRotation=H.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Pt===void 0&&(x.addEventListener("dispose",$),Pt=new Map,H.programs=Pt);let It=Pt.get(dt);if(It!==void 0){if(H.currentProgram===It&&H.lightsStateVersion===ht)return Xl(x,vt),It}else vt.uniforms=q.getUniforms(x),x.onBeforeCompile(vt,y),It=q.acquireProgram(vt,dt),Pt.set(dt,It),H.uniforms=vt.uniforms;const Tt=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Tt.clippingPlanes=rt.uniform),Xl(x,vt),H.needsLights=lf(x),H.lightsStateVersion=ht,H.needsLights&&(Tt.ambientLightColor.value=N.state.ambient,Tt.lightProbe.value=N.state.probe,Tt.directionalLights.value=N.state.directional,Tt.directionalLightShadows.value=N.state.directionalShadow,Tt.spotLights.value=N.state.spot,Tt.spotLightShadows.value=N.state.spotShadow,Tt.rectAreaLights.value=N.state.rectArea,Tt.ltc_1.value=N.state.rectAreaLTC1,Tt.ltc_2.value=N.state.rectAreaLTC2,Tt.pointLights.value=N.state.point,Tt.pointLightShadows.value=N.state.pointShadow,Tt.hemisphereLights.value=N.state.hemi,Tt.directionalShadowMap.value=N.state.directionalShadowMap,Tt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Tt.spotShadowMap.value=N.state.spotShadowMap,Tt.spotLightMatrix.value=N.state.spotLightMatrix,Tt.spotLightMap.value=N.state.spotLightMap,Tt.pointShadowMap.value=N.state.pointShadowMap,Tt.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=It,H.uniformsList=null,It}function Wl(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=Ra.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function Xl(x,U){const B=_t.get(x);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function of(x,U,B,H,N){U.isScene!==!0&&(U=Mt),Ft.resetTextureUnits();const et=U.fog,ht=H.isMeshStandardMaterial?U.environment:null,vt=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:As,dt=(H.isMeshStandardMaterial?me:Ee).get(H.envMap||ht),Pt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,It=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Tt=!!B.morphAttributes.position,qt=!!B.morphAttributes.normal,re=!!B.morphAttributes.color;let Me=Wn;H.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Me=y.toneMapping);const de=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,le=de!==void 0?de.length:0,At=_t.get(H),ge=p.state.lights;if(Vt===!0&&(j===!0||x!==b)){const We=x===b&&H.id===S;rt.setState(H,x,We)}let $t=!1;H.version===At.__version?(At.needsLights&&At.lightsStateVersion!==ge.state.version||At.outputColorSpace!==vt||N.isBatchedMesh&&At.batching===!1||!N.isBatchedMesh&&At.batching===!0||N.isBatchedMesh&&At.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&At.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&At.instancing===!1||!N.isInstancedMesh&&At.instancing===!0||N.isSkinnedMesh&&At.skinning===!1||!N.isSkinnedMesh&&At.skinning===!0||N.isInstancedMesh&&At.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&At.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&At.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&At.instancingMorph===!1&&N.morphTexture!==null||At.envMap!==dt||H.fog===!0&&At.fog!==et||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==rt.numPlanes||At.numIntersection!==rt.numIntersection)||At.vertexAlphas!==Pt||At.vertexTangents!==It||At.morphTargets!==Tt||At.morphNormals!==qt||At.morphColors!==re||At.toneMapping!==Me||At.morphTargetsCount!==le)&&($t=!0):($t=!0,At.__version=H.version);let nn=At.currentProgram;$t===!0&&(nn=Or(H,U,N));let Yi=!1,sn=!1,Hs=!1;const _e=nn.getUniforms(),un=At.uniforms;if(gt.useProgram(nn.program)&&(Yi=!0,sn=!0,Hs=!0),H.id!==S&&(S=H.id,sn=!0),Yi||b!==x){gt.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),_e.setValue(R,"projectionMatrix",x.projectionMatrix),_e.setValue(R,"viewMatrix",x.matrixWorldInverse);const Ze=_e.map.cameraPosition;Ze!==void 0&&Ze.setValue(R,ft.setFromMatrixPosition(x.matrixWorld)),Rt.logarithmicDepthBuffer&&_e.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&_e.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),b!==x&&(b=x,sn=!0,Hs=!0)}if(N.isSkinnedMesh){_e.setOptional(R,N,"bindMatrix"),_e.setOptional(R,N,"bindMatrixInverse");const We=N.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),_e.setValue(R,"boneTexture",We.boneTexture,Ft))}N.isBatchedMesh&&(_e.setOptional(R,N,"batchingTexture"),_e.setValue(R,"batchingTexture",N._matricesTexture,Ft),_e.setOptional(R,N,"batchingIdTexture"),_e.setValue(R,"batchingIdTexture",N._indirectTexture,Ft),_e.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&_e.setValue(R,"batchingColorTexture",N._colorsTexture,Ft));const dn=B.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&nt.update(N,B,nn),(sn||At.receiveShadow!==N.receiveShadow)&&(At.receiveShadow=N.receiveShadow,_e.setValue(R,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(un.envMap.value=dt,un.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(un.envMapIntensity.value=U.environmentIntensity),sn&&(_e.setValue(R,"toneMappingExposure",y.toneMappingExposure),At.needsLights&&cf(un,Hs),et&&H.fog===!0&&Q.refreshFogUniforms(un,et),Q.refreshMaterialUniforms(un,H,V,Z,p.state.transmissionRenderTarget[x.id]),Ra.upload(R,Wl(At),un,Ft)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ra.upload(R,Wl(At),un,Ft),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&_e.setValue(R,"center",N.center),_e.setValue(R,"modelViewMatrix",N.modelViewMatrix),_e.setValue(R,"normalMatrix",N.normalMatrix),_e.setValue(R,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const We=H.uniformsGroups;for(let Ze=0,co=We.length;Ze<co;Ze++){const Si=We[Ze];Ot.update(Si,nn),Ot.bind(Si,nn)}}return nn}function cf(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function lf(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(x,U,B){const H=_t.get(x);H.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),_t.get(x.texture).__webglTexture=U,_t.get(x.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:B,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){const B=_t.get(x);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const hf=R.createFramebuffer();this.setRenderTarget=function(x,U=0,B=0){L=x,T=U,C=B;let H=!0,N=null,et=!1,ht=!1;if(x){const dt=_t.get(x);if(dt.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(R.FRAMEBUFFER,null),H=!1;else if(dt.__webglFramebuffer===void 0)Ft.setupRenderTarget(x);else if(dt.__hasExternalTextures)Ft.rebindTextures(x,_t.get(x.texture).__webglTexture,_t.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Tt=x.depthTexture;if(dt.__boundDepthTexture!==Tt){if(Tt!==null&&_t.has(Tt)&&(x.width!==Tt.image.width||x.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(x)}}const Pt=x.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ht=!0);const It=_t.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(It[U])?N=It[U][B]:N=It[U],et=!0):x.samples>0&&Ft.useMultisampledRTT(x)===!1?N=_t.get(x).__webglMultisampledFramebuffer:Array.isArray(It)?N=It[B]:N=It,P.copy(x.viewport),O.copy(x.scissor),z=x.scissorTest}else P.copy(pt).multiplyScalar(V).floor(),O.copy(Ht).multiplyScalar(V).floor(),z=te;if(B!==0&&(N=hf),gt.bindFramebuffer(R.FRAMEBUFFER,N)&&H&&gt.drawBuffers(x,N),gt.viewport(P),gt.scissor(O),gt.setScissorTest(z),et){const dt=_t.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,dt.__webglTexture,B)}else if(ht){const dt=U;for(let Pt=0;Pt<x.textures.length;Pt++){const It=_t.get(x.textures[Pt]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Pt,It.__webglTexture,B,dt)}}else if(x!==null&&B!==0){const dt=_t.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,dt.__webglTexture,B)}S=-1},this.readRenderTargetPixels=function(x,U,B,H,N,et,ht,vt=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt){gt.bindFramebuffer(R.FRAMEBUFFER,dt);try{const Pt=x.textures[vt],It=Pt.format,Tt=Pt.type;if(!Rt.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Rt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-H&&B>=0&&B<=x.height-N&&(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+vt),R.readPixels(U,B,H,N,St.convert(It),St.convert(Tt),et))}finally{const Pt=L!==null?_t.get(L).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(x,U,B,H,N,et,ht,vt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt)if(U>=0&&U<=x.width-H&&B>=0&&B<=x.height-N){gt.bindFramebuffer(R.FRAMEBUFFER,dt);const Pt=x.textures[vt],It=Pt.format,Tt=Pt.type;if(!Rt.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Rt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.bufferData(R.PIXEL_PACK_BUFFER,et.byteLength,R.STREAM_READ),x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+vt),R.readPixels(U,B,H,N,St.convert(It),St.convert(Tt),0);const re=L!==null?_t.get(L).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,re);const Me=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Fp(R,Me,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,et),R.deleteBuffer(qt),R.deleteSync(Me),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,B=0){const H=Math.pow(2,-B),N=Math.floor(x.image.width*H),et=Math.floor(x.image.height*H),ht=U!==null?U.x:0,vt=U!==null?U.y:0;Ft.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,B,0,0,ht,vt,N,et),gt.unbindTexture()};const uf=R.createFramebuffer(),df=R.createFramebuffer();this.copyTextureToTexture=function(x,U,B=null,H=null,N=0,et=null){et===null&&(N!==0?(Tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=N,N=0):et=0);let ht,vt,dt,Pt,It,Tt,qt,re,Me;const de=x.isCompressedTexture?x.mipmaps[et]:x.image;if(B!==null)ht=B.max.x-B.min.x,vt=B.max.y-B.min.y,dt=B.isBox3?B.max.z-B.min.z:1,Pt=B.min.x,It=B.min.y,Tt=B.isBox3?B.min.z:0;else{const dn=Math.pow(2,-N);ht=Math.floor(de.width*dn),vt=Math.floor(de.height*dn),x.isDataArrayTexture?dt=de.depth:x.isData3DTexture?dt=Math.floor(de.depth*dn):dt=1,Pt=0,It=0,Tt=0}H!==null?(qt=H.x,re=H.y,Me=H.z):(qt=0,re=0,Me=0);const le=St.convert(U.format),At=St.convert(U.type);let ge;U.isData3DTexture?(Ft.setTexture3D(U,0),ge=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ft.setTexture2DArray(U,0),ge=R.TEXTURE_2D_ARRAY):(Ft.setTexture2D(U,0),ge=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const $t=R.getParameter(R.UNPACK_ROW_LENGTH),nn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Yi=R.getParameter(R.UNPACK_SKIP_PIXELS),sn=R.getParameter(R.UNPACK_SKIP_ROWS),Hs=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,de.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,de.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Pt),R.pixelStorei(R.UNPACK_SKIP_ROWS,It),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Tt);const _e=x.isDataArrayTexture||x.isData3DTexture,un=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){const dn=_t.get(x),We=_t.get(U),Ze=_t.get(dn.__renderTarget),co=_t.get(We.__renderTarget);gt.bindFramebuffer(R.READ_FRAMEBUFFER,Ze.__webglFramebuffer),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,co.__webglFramebuffer);for(let Si=0;Si<dt;Si++)_e&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.get(x).__webglTexture,N,Tt+Si),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,et,Me+Si)),R.blitFramebuffer(Pt,It,ht,vt,qt,re,ht,vt,R.DEPTH_BUFFER_BIT,R.NEAREST);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(N!==0||x.isRenderTargetTexture||_t.has(x)){const dn=_t.get(x),We=_t.get(U);gt.bindFramebuffer(R.READ_FRAMEBUFFER,uf),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,df);for(let Ze=0;Ze<dt;Ze++)_e?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,dn.__webglTexture,N,Tt+Ze):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,dn.__webglTexture,N),un?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,We.__webglTexture,et,Me+Ze):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,We.__webglTexture,et),N!==0?R.blitFramebuffer(Pt,It,ht,vt,qt,re,ht,vt,R.COLOR_BUFFER_BIT,R.NEAREST):un?R.copyTexSubImage3D(ge,et,qt,re,Me+Ze,Pt,It,ht,vt):R.copyTexSubImage2D(ge,et,qt,re,Pt,It,ht,vt);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else un?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(ge,et,qt,re,Me,ht,vt,dt,le,At,de.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(ge,et,qt,re,Me,ht,vt,dt,le,de.data):R.texSubImage3D(ge,et,qt,re,Me,ht,vt,dt,le,At,de):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,et,qt,re,ht,vt,le,At,de.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,et,qt,re,de.width,de.height,le,de.data):R.texSubImage2D(R.TEXTURE_2D,et,qt,re,ht,vt,le,At,de);R.pixelStorei(R.UNPACK_ROW_LENGTH,$t),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,nn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Yi),R.pixelStorei(R.UNPACK_SKIP_ROWS,sn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Hs),et===0&&U.generateMipmaps&&R.generateMipmap(ge),gt.unbindTexture()},this.initRenderTarget=function(x){_t.get(x).__webglFramebuffer===void 0&&Ft.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Ft.setTextureCube(x,0):x.isData3DTexture?Ft.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Ft.setTexture2DArray(x,0):Ft.setTexture2D(x,0),gt.unbindTexture()},this.resetState=function(){T=0,C=0,L=null,gt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}const Vi=64,Ye=32,qa=16,Ar=8,zi=Vi*Ar,$c=18,vd=19,xd=47;function Md(i,t,e=0,n=0,s="y",r=0){return i===1?t>0?[0,20,21][r]:t<0?[2,24,25][r]:[1,22,23][r]:i===2?[2,24,25][r]:i===3?[3,26,27][r]:i===5?(s==="x"?e:s==="z"?n:t)!==0?6:5:i===21?t>0?28:t<0?8:n===1?30:29:i===22?t>0?31:t<0?8:n===1?33:32:i===23?34:i===25?t===0?35:36:i===26?t===0?38:37:i>=27&&i<=29?(t>0?39:42)+i-27:i>=30&&i<=33?t>0?45:46:[0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][i]??3}function Sl(i,t,e){return[(i%Ar*Vi+qa+.12+t*(Ye-.24))/zi,(Math.floor(i/Ar)*Vi+qa+.12+e*(Ye-.24))/zi]}const Tn=(i,t)=>(i%t+t)%t;function rx(i,t,e){const n=i;i>=20&&i<=27&&(i=[0,0,1,1,2,2,3,3][i-20],t=Tn(t+(n&1?9:17),Ye),i!==1&&(e=Tn(e+(n&1?13:7),Ye)));const s=Kt(t,e,i*877),r=Kt(Math.floor((t+3)/3),Math.floor(e/2),i*571);let a=0,o=255,c=(s-.5)*10+(r-.5)*8;const l=()=>{const u=Tn(t+Math.floor(e/3)*3,9);a=r>.77?9877350:r<.19?7509594:8628059,(u<2&&e%4===1&&r>.45||s>.981)&&(a=11127158),u===3&&e%4===0&&(c-=9)},h=()=>{a=r>.82?11305046:r<.19?8938310:10056014,s>.966&&(a=13015659),t%9===Math.floor(e/3)%7&&(e+1)%5<3&&(c+=13)},d=()=>{const u=Tn(2*t+e+Math.floor(e/4)*2,41);a=r>.72?10659488:r<.22?9608346:10199967,u<2&&r>.35&&(c-=19),u===2&&r>.47&&(c+=7),s>.95&&(c+=12)};switch(i){case 0:l();break;case 1:{const u=4+Math.floor(Kt(Math.floor(t/2),0,31)*4);e>=Ye-u?(l(),e===Ye-u&&(c-=17)):(h(),e===Ye-u-1&&(c-=14));break}case 2:h();break;case 3:d();break;case 4:{a=14993811,Tn(t+Math.floor(e*.6)+Math.floor(e/5)*2,17)<2&&e%4<2&&(c+=11),s>.93&&(a=12888951);break}case 5:{const u=Tn(t+Math.round(Math.sin(e*.25+t*.26)*1.5),7);a=u===0?6310195:u<3?7888964:u===3?10848859:9530953,Math.abs(t-17)+Math.abs(e-8)*.65<2&&(a=5981238);break}case 6:{const u=Math.abs(t-15),f=Math.abs(e-16),g=Math.max(u*.98,f)+.2*Math.min(u,f);a=Math.min(t,e,31-t,31-e)<2?7886910:Math.floor(g)%4===0?11962711:14727035,t>19&&e===16-Math.floor((t-18)/3)&&(a=9792837);break}case 7:{const u=Kt(Math.floor(t/3),Math.floor((e+Math.floor(t/5))/2),931);a=u<.16?3373399:u<.42?5411918:u<.73?7120712:9158230,u>.82&&e%3===1&&(a=10602602),u<.16&&s<.3&&(o=0);break}case 8:{const u=Math.floor(e/8),f=Tn(t+(u%2?16:0),32);a=e%8===0||f===0?9726792:e%8===7?14859649:13476203,e%8===3&&(Math.floor(t/4)+u)%3!==0&&(c-=9),f===2&&e%8===2&&(a=8021330);break}case 9:{const u=Math.floor(e/7),f=Tn(t+u*5+(e%7<2?1:0),12);a=e%7===0||f===0?6846062:e%7===1||f===1?11843234:9739921;break}case 10:{const u=Tn(t+Math.floor(e/8)%2*8,16);a=e%8===0||u===0?6649716:e%8===7||u===1?11647146:9149848;break}case 11:{const u=t===0||e===0||t===Ye-1||e===Ye-1,f=(t+e===22||t+e===25)&&t>4&&t<16;a=u?9161673:f?14811125:11328980,o=u?182:f?175:49,c=0;break}case 12:{d();for(const[u,f,g]of[[5,6,3],[16,13,4],[10,20,2],[21,3,2]])Math.abs(t-u)+Math.abs(e-f)*.85<g&&(a=e>f?5857630:4080708);break}case 13:{const u=Math.min(t,e,31-t,31-e),f=Math.abs(t-15.5)+Math.abs(e-15.5);a=u<2?5400165:u<4?12294239:Math.abs(f-13)<1.3?11503958:f<8?16771489:16041065;break}case 14:a=4365994,c=(r-.5)*3,(e===6||e===17)&&Tn(t+2*e,19)<5&&(c+=9),o=163;break;case 15:a=r>.62?6649201:4741462;break;case 16:a=16777215,c=0;break;case $c:case vd:{o=0,a=6393927;for(const[u,f,g]of[[3,12,-2],[8,19,3],[15,10,2],[21,15,-3],[26,7,1]]){const _=u+Math.round(g*e/f);if(e<=f&&t===_&&(o=255,a=e<=2?5472834:7971660),i===$c&&(u===8||u===21)){const m=Math.abs(t-(u+g))+Math.abs(e-(f+1));m<=2&&(o=255,a=m===0?15049005:u===8?16113574:15971143)}}break}case 28:case 29:case 30:{const u=Math.min(t,31-t);a=u<3||e<3||e>28?7755322:e%8===0?10186823:12819559,i===28?(t>4&&t<27&&e>4&&e<26&&(a=5599084),t>6&&t<25&&e>6&&e<24&&(t%5===2||e%5===2)&&(a=9018246),e>20&&e<23&&t>9&&t<25&&(a=14991218)):i===30?(e>12&&e<23&&t>4&&t<27&&(a=e===13||t===5?6244407:11240021),e===18&&t>12&&t<20&&(a=15780477),e<10&&u>5&&(a=5458749)):e<10&&u>4&&(a=6838334);break}case 31:case 32:case 33:{const u=t<4||t>27||e<3||e>28;a=u?5269096:e%8===2?9003332:12224336,t%24===3&&u&&e%8===4&&(a=12368525),i!==31&&e===20&&(a=5259060),i===33&&t>=13&&t<=18&&e>=13&&e<=22&&(a=t===13||e===22?16044424:11897414),i===33&&Math.abs(t-15.5)<1.5&&e>=15&&e<=17&&(a=6050110);break}case 34:{d();for(const[u,f,g]of[[8,12,6],[21,23,6],[24,6,3],[4,27,3]]){const _=Math.abs(t-u)*1.55+Math.abs(e-f);_<g+1.6&&(a=5663603),_<g&&(a=t<u?10216919:t===u?14614512:5283759)}break}case 35:case 36:{const u=Math.min(t,e,31-t,31-e),f=Math.abs(t-15.5)+Math.abs(e-15.5);a=u<2?3823198:u<4?12752741:u===4?4094079:7784898,u>5&&(a=f<7?15007729:f<12?11727321:Math.abs(t-15.5)<2||Math.abs(e-15.5)<2?5807259:8836557);break}case 37:case 38:{const u=Math.min(t,e,31-t,31-e),f=Math.abs(t-15.5)+Math.abs(e-15.5);a=u<1?5006441:u<3?8886418:7439751,i===37&&Math.abs(f-13)<2.1&&(a=13675380),i===37&&f<6&&(a=t<15?10999229:7584945),i===38&&(e===8||e===23)&&(a=12755305);break}case 39:case 40:case 41:{const u=i-39,f=Math.min(t,e,31-t,31-e);a=f<2?4150105:f<4?12965824:[5752740,7321057,13600220][u],f>5&&(t%4===0||e%4===0)&&(c-=9);for(let g=0;g<=u;g++){const _=e-(7+g*7),m=7-Math.abs(t-15.5);Math.abs(t-15.5)<7&&_>=m-2&&_<=m&&(a=16774596)}break}case 42:case 43:case 44:{const u=i-42,f=Math.min(t,31-t),g=[4166267,4620212,10117546][u];a=e<5||e>27?4413020:f<3?7308683:e===12||e===20?4215392:g,(f===5||f===6)&&(e===9||e===24)&&(a=13227463);break}case 45:{const u=Math.min(t,31-t),f=9-Math.abs(t-15.5);a=u<2?11631686:u<5?16770458:15643222,u>=5&&e%8===0&&(c-=15),Math.abs(t-15.5)<6&&Math.abs(e%16-f)<1.2&&(a=16772029);break}case 46:{const u=Math.min(t,31-t);a=e<=2||e>28?7622457:u<3?11565132:14064214,e%7===0&&(c-=19);break}default:a=9936274}return[(a>>>16&255)+c,(a>>>8&255)+c,(a&255)+c,o]}function ax(){const i=new Uint8ClampedArray(zi*zi*4),t=new Uint8ClampedArray(Ye*Ye*4);for(let n=0;n<xd;n++){for(let s=0;s<Ye;s++)for(let r=0;r<Ye;r++)t.set(rx(n,r,s),(r+Ye*s)*4);for(let s=0;s<Vi;s++)for(let r=0;r<Vi;r++){const a=n%Ar*Vi+r,o=Math.floor(n/Ar)*Vi+s,c=(Math.min(31,Math.max(0,r-qa))+Ye*Math.min(31,Math.max(0,s-qa)))*4;for(let l=0;l<4;l++)i[(a+zi*o)*4+l]=t[c+l]}}const e=new Nr(new Uint8Array(i.buffer),zi,zi);return e.colorSpace=Be,e.magFilter=Pe,e.minFilter=rr,e.generateMipmaps=!0,e.needsUpdate=!0,e}const ox=Object.freeze([Object.freeze({x:0,z:-1}),Object.freeze({x:1,z:0}),Object.freeze({x:0,z:1}),Object.freeze({x:-1,z:0})]),cx=Object.freeze({x:0,z:0});function _n(i){return i>=30&&i<=33&&Number.isInteger(i)}function yd(i){return ox[i-30]??cx}function Gn(i,t,e){const n=i===30?1-e:i===31?t:i===32?e:1-t;return 1-.96*Math.max(0,Math.min(1,n))}function lx(i){return i===27?3:i===28?6:i===29?10:0}const hx=[{n:[1,0,0],u:[0,0,-1],v:[0,1,0],o:[1,0,1]},{n:[-1,0,0],u:[0,0,1],v:[0,1,0],o:[0,0,0]},{n:[0,1,0],u:[1,0,0],v:[0,0,-1],o:[0,1,1]},{n:[0,-1,0],u:[1,0,0],v:[0,0,1],o:[0,0,0]},{n:[0,0,1],u:[1,0,0],v:[0,1,0],o:[0,0,1]},{n:[0,0,-1],u:[-1,0,0],v:[0,1,0],o:[1,0,0]}],El=[[0,0],[1,0],[1,1],[0,1]],bd=Array.from({length:xd},(i,t)=>El.map(([e,n])=>Sl(t,e,n)));function ux(i,t){return!(!i||hr(t)||i===t&&!_n(i)||i===13&&t===10)}class Vo{position=[];normal=[];uv=[];detail=[];indices=[];quad(t=!1,e=!1){const n=this.position.length/3-4;e?this.indices.push(n,n+1,n+3,n+1,n+2,n+3):this.indices.push(n,n+1,n+2,n,n+2,n+3),t&&this.indices.push(n+2,n+1,n,n+3,n+2,n)}finish(){if(!this.indices.length)return null;const t=new Ge;return t.setAttribute("position",new xe(this.position,3)),t.setAttribute("normal",new xe(this.normal,3)),t.setAttribute("uv",new xe(this.uv,2)),t.setAttribute("surface",new xe(this.detail,3)),t.setIndex(this.indices),t.computeBoundingSphere(),t}}function dx(i,t,e,n,s,r){const a=r?$c:vd;for(let o=0;o<2;o++){const l=o===0?.24:-.24;for(let h=0;h<4;h++){const[d,u]=El[h],f=d*2-1;i.position.push(t+.5+.27*f,e+u*.74,n+.5+l*f),i.normal.push(0,1,0),i.uv.push(...bd[a][h]),i.detail.push(1,s,40+u)}i.quad(!0)}}function fx(i,t,e,n,s=1){const r=Mr(t,e,n),a=new Vo,o=new Vo,c=new Vo;if(!i.occupied[r])return[null,null,null];if(i.dense[r]===4096&&t>0&&t<15&&n>0&&n<15&&[r-1,r+1,r-16,r+16,r+256,...e>0?[r-256]:[]].every(g=>i.dense[g]===4096))return[null,null,null];const l=(g,_,m)=>Fi(g,_,m)?i.data[Ne(g,_,m)]:0,h=(g,_,m)=>hr(l(g,_,m))?1:0,d=t*16,u=e*16,f=n*16;for(let g=u;g<u+16;g++)for(let _=f;_<f+16;_++){let m=Ne(d,g,_);for(let p=d;p<d+16;p++,m++){const M=i.data[m];if(!M)continue;const E=M===13?o:M===10?c:a,y=_n(M);let A=-1;for(const T of hx){const[C,L,S]=T.n,b=p+C,P=g+L,O=_+S;if(P<0||!ux(M,l(b,P,O)))continue;A===-1&&(A=Kt(p+g*13,_,i.salt^17));const z=M===5?i.axisAt(p,g,_):"y",Y=Md(M,L,C,S,z,Math.floor(A*3)),W=bd[Y],K=y&&L===1?M-30:Y===5&&(z==="x"&&T.u[0]!==0||z==="z"&&T.u[2]!==0)?1:0,Z=y&&L===1,V=Z?Gn(M,0,0)-Gn(M,1,0):C,st=Z?Gn(M,0,0)-Gn(M,0,1):S,ct=Z?Math.hypot(V,1,st):1,pt=.94+.11*A,Ht=M===13&&l(p,g+1,_)!==13;for(let Vt=0;Vt<4;Vt++){const[j,J]=El[Vt],ft=T.o[0]+T.u[0]*j+T.v[0]*J,Ct=T.o[1]+T.u[1]*j+T.v[1]*J,Mt=T.o[2]+T.u[2]*j+T.v[2]*J,Xt=y&&Ct===1?Gn(M,ft,Mt):Ct-(Ht&&Ct===1?.105:0);E.position.push(p+ft,g+Xt,_+Mt),E.normal.push(V/ct,L/ct,st/ct),E.uv.push(...W[(Vt+K)%4]);const Te=j?1:-1,R=J?1:-1,oe=T.u[0]*Te,Nt=T.u[1]*Te,Rt=T.u[2]*Te,gt=T.v[0]*R,ce=T.v[1]*R,_t=T.v[2]*R;let Ft=1;if(E===a){const Ee=h(b+oe,P+Nt,O+Rt),me=h(b+gt,P+ce,O+_t),w=Ee&&me?1:h(b+oe+gt,P+Nt+ce,O+Rt+_t);Ft=1-(Ee+me+w)*.103}E.detail.push(Ft,pt,M)}const te=E.detail.length,he=E===a&&E.detail[te-12]+E.detail[te-6]>E.detail[te-9]+E.detail[te-3];if(E.quad(M===13&&(L===1||p===0||_===0||p===Ut-1||_===Ut-1),he),s&&i.stage!=="flat"&&M===1&&L===1&&i.highest[p+Ut*_]===g){const Vt=Kt(p>>3,_>>3,i.salt^75);Kt(p,_,i.salt^2534)<(.023+Vt*Vt*.21)*s&&dx(a,p,g+1,_,pt,Vt>.72)}}}}return[a.finish(),o.finish(),c.finish()]}const Go=(i,t,e)=>new I(i,t,e);class px{sun={value:Go(0,1,0)};horizon={value:Go(.78,.87,.83)};zenith={value:Go(.23,.64,.8)};day={value:1};warm={value:0};linearColor=new Wt;sky;clouds;constructor(t,e){const n={sun:this.sun,horizon:this.horizon,zenith:this.zenith,lightness:this.day,sunset:this.warm},s=new Ve({uniforms:n,side:Ke,depthWrite:!1,depthTest:!0,vertexShader:`varying vec3 direction;varying vec3 skyColor;
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
        }`});this.sky=new Se(new yl(270,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=2,t.add(this.sky);const r=new Ve({uniforms:n,vertexShader:`varying float shade;varying float dist;
        void main(){vec4 pos=modelMatrix*instanceMatrix*vec4(position,1.);shade=.90+.1*normal.y;dist=length(pos.xyz-cameraPosition);
        gl_Position=projectionMatrix*viewMatrix*pos;}`,fragmentShader:`varying float shade;varying float dist;uniform float lightness,sunset;uniform vec3 horizon;
        void main(){vec3 col=mix(vec3(.085,.135,.22),vec3(.98,.968,.88),lightness)*shade;
          col=mix(col,vec3(1.,.65,.40)*shade,sunset*.64);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);
          #include <colorspace_fragment>
        }`}),a=66,o=4;this.clouds=new Ga(new gn,r,a*o);const c=new Re;for(let l=0;l<a;l++){const h=Kt(l,11,e)*480-112,d=Kt(l,12,e)*480-112,u=66+Kt(l,13,e)*17;for(let f=0;f<o;f++)c.position.set(h+f*4.6,u+Math.sin(Math.PI*f/3)*1.5,d+Kt(l,f,e)*4),c.scale.set(6+Kt(l+7,f,e)*7,1.6+Kt(l+12,f,e)*2.6,5+Kt(l+77,f,e)*7),c.updateMatrix(),this.clouds.setMatrixAt(l*o+f,c.matrix)}this.clouds.computeBoundingSphere(),t.add(this.clouds)}update(t,e,n){const s=(t-.25)*Math.PI*2;this.sun.value.set(Math.cos(s)*.8,Math.sin(s),Math.cos(s)*.6).normalize();const r=this.sun.value.y,a=ar.smoothstep(r,-.27,.32),o=Math.exp(-Math.pow((r-.065)/.25,2));this.day.value=a,this.warm.value=o;const c=(l,h,d,u)=>{this.linearColor.setRGB(Math.min(1,h),Math.min(1,d),Math.min(1,u),Be),l.set(this.linearColor.r,this.linearColor.g,this.linearColor.b)};c(this.zenith.value,.095+a*.23+o*.14,.14+a*.52-o*.15,.24+a*.6-o*.13),c(this.horizon.value,.25+a*.57+o*.29,.32+a*.57-o*.13,.44+a*.45-o*.25),this.sky.position.copy(e.position),this.clouds.position.x=Math.sin(n/190)*10}dispose(t){t.remove(this.sky,this.clouds),this.sky.geometry.dispose(),this.sky.material.dispose(),this.clouds.geometry.dispose(),this.clouds.material.dispose(),this.clouds.dispose()}}function Zh(i,t,e,n,s){return new Ve({transparent:s,depthWrite:!s,uniforms:{...n,atlas:{value:i},columnHeights:{value:t},sun:e.sun,lightness:e.day,sunset:e.warm,horizon:e.horizon},vertexShader:`
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
      }`})}const Sd=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function Ed(i,t,e,n,s){const[r,a,o]=Sd[i],c=Md(n,a,r,o,s);if(c===5&&(s==="x"&&!r||s==="z"&&r!==0)&&([t,e]=[e,1-t]),c===45)for(let l=0;l<n-30;l++)[t,e]=[1-e,t];return Sl(c,t,e)}function mx(i,t){const e=[],n=[],s=[],r=[],a=i.getAttribute("position"),o=i.getAttribute("uv");function c(h,d,u,f,g,_,m,p=0){const M=e.length/3,E=new Wt(m);for(let y=0;y<a.count;y++){const A=Math.floor(y/4),[T,C,L]=Sd[A],S=.8+.15*C+.065*T+.05*L,b=a.getX(y),P=a.getY(y),O=a.getZ(y),z=_n(p)&&P>0?Gn(p,b+.5,O+.5)-.5:P;e.push(h+b*f,d+z*g,u+O*_);const Y=o.getX(y),W=o.getY(y);n.push(...p?Ed(A,Y,W,p,"y"):Sl(16,Y,W)),s.push(E.r*S,E.g*S,E.b*S)}for(let y=0;y<i.index.count;y++)r.push(M+i.index.getX(y))}if(c(.1,-.54,.02,.57,.64,.61,3630181),c(.1,-.24,-.01,.6,.17,.62,12622438),c(.08,-.07,-.06,.52,.43,.53,11432010),c(-.16,.015,-.23,.2,.2,.33,14591349),t>=17&&t<=20){const h=t===18||t===20?9874602:13345647;c(-.08,.35,-.12,.14,1.18,.15,10052927),c(-.08,.72,-.12,.2,.16,.2,6055253),t<=18?(c(-.08,.91,-.12,.88,.2,.2,h),c(-.55,.78,-.12,.15,.27,.19,h),c(.37,.8,-.12,.15,.19,.18,h)):(c(-.19,.91,-.12,.49,.22,.22,h),c(-.44,.75,-.12,.28,.46,.23,h),c(-.53,.61,-.12,.13,.19,.24,12962741))}else t===16?c(-.06,.36,-.18,.16,1.05,.16,12620646):t===15||t===24?(c(-.1,.29,-.22,.4,.4,.36,t===24?8708039:5792095),c(-.1,.54,-.22,.22,.16,.24,t===24?13956827:7371126)):t&&c(-.11,.3,-.26,.66,.66,.66,16777215,t);const l=new Ge;return l.setAttribute("position",new xe(e,3)),l.setAttribute("uv",new xe(n,2)),l.setAttribute("color",new xe(s,3)),l.setIndex(r),l}function gx(){const t=new Uint8Array(1024).fill(255);function e(r,a,o,c,l,h){const d=Math.max(Math.abs(o-r),Math.abs(c-a));for(let u=0;u<=d;u++){const f=u/d,g=Math.round(r+(o-r)*f),_=Math.round(a+(c-a)*f);if(g<0||_<0||g>=32||_>=32)continue;const m=g+_*32;t[m]=Math.min(t[m],Math.round(245*(l+(h-l)*f)))}}[[[15,17],[12,19],[11,23],[7,25],[6,29],[2,32]],[[15,17],[16,13],[20,11],[19,7],[23,3],[23,0]],[[15,17],[18,18],[21,22],[26,22],[30,26],[32,27]],[[15,17],[11,15],[7,15],[6,12],[2,10],[-1,8]],[[11,23],[14,24],[15,28],[18,29]],[[20,11],[23,13],[26,11],[30,11]],[[7,15],[7,19],[4,22]],[[21,22],[19,25],[20,29]]].forEach((r,a)=>{const o=a<4?.02+a*.035:.51,c=a<4?.93:.98;for(let l=1;l<r.length;l++)e(r[l-1][0],r[l-1][1],r[l][0],r[l][1],o+(c-o)*(l-1)/(r.length-1),o+(c-o)*l/(r.length-1))});const s=new Nr(t,32,32,Ir);return s.magFilter=Pe,s.minFilter=Pe,s.needsUpdate=!0,s}class _x{cube=new gn;mask=gx();hand;cracking;ghost;lastItem=-1;ghostTile="";recoil=0;phase=0;clock=0;constructor(t,e,n){this.hand=new Se(new Ge,new qi({map:n,vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.hand.visible=!1,this.hand.renderOrder=12,this.hand.frustumCulled=!1,e.add(this.hand),t.add(e);const s="varying vec2 face;void main(){face=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";this.cracking=new Se(this.cube,new Ve({uniforms:{stages:{value:this.mask},progress:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,vertexShader:s,fragmentShader:`uniform sampler2D stages;uniform float progress;varying vec2 face;
        void main(){float crack=step(texture2D(stages,face).r,min(.985,progress));
          float lip=step(texture2D(stages,face+vec2(.03125,-.03125)).r,min(.985,progress));
          if(crack+lip<.2)discard;
          gl_FragColor=mix(vec4(.92,.74,.46,.27),vec4(.025,.031,.032,.87),crack);
          #include <colorspace_fragment>
        }`})),this.cracking.scale.setScalar(1.002),this.cracking.visible=!1,this.cracking.renderOrder=3,t.add(this.cracking);const r=this.cube.clone();r.setAttribute("plate",new xe(new Float32Array(r.getAttribute("uv").count*2),2)),this.ghost=new Se(r,new Ve({uniforms:{atlas:{value:n},allowed:{value:1}},transparent:!0,depthWrite:!1,side:yn,forceSinglePass:!0,vertexShader:`attribute vec2 plate;varying vec2 uvPlate,face;varying float range;
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
        }`})),this.ghost.scale.setScalar(.993),this.ghost.visible=!1,this.ghost.renderOrder=4,t.add(this.ghost)}swing(){this.recoil=1}update(t,e,n,s,r,a,o=!0){const c=!!n&&n.active!==!1;this.hand.visible=c&&o,this.cracking.visible=c&&!!e&&n.mining>0,this.cracking.visible&&e&&n&&(this.cracking.position.set(e.x+.5,e.y+.5,e.z+.5),this.cracking.material.uniforms.progress.value=n.mining);const l=n?.preview;if(this.ghost.visible=c&&!!l&&!this.cracking.visible,l&&this.ghost.visible){this.ghost.position.set(l.x+.5,l.y+.5,l.z+.5),this.ghost.material.uniforms.allowed.value=Number(l.valid);const f=l.id+"/"+l.axis;if(f!==this.ghostTile){this.ghostTile=f;const g=this.ghost.geometry.getAttribute("uv"),_=this.ghost.geometry.getAttribute("plate"),m=this.cube.getAttribute("position"),p=this.ghost.geometry.getAttribute("position");for(let M=0;M<g.count;M++){const E=Ed(M>>2,g.getX(M),g.getY(M),l.id,l.axis??"y");_.setXY(M,E[0],E[1]);const y=m.getX(M),A=m.getY(M),T=m.getZ(M);p.setXYZ(M,y,_n(l.id)&&A>0?Gn(l.id,y+.5,T+.5)-.5:A,T)}_.needsUpdate=!0,p.needsUpdate=!0}}if(!n||!c)return;if(this.recoil=Math.max(0,this.recoil-s*4.8),!o){this.phase=0;return}n.held!==this.lastItem&&(this.hand.geometry.dispose(),this.hand.geometry=mx(this.cube,n.held),this.lastItem=n.held),this.clock+=s,this.phase=n.mining>0?this.phase+s*16:0;const h=a?Math.max(Math.sin(this.phase*.5)**2,Math.sin(this.recoil*Math.PI)):0,d=n.moving&&a?Math.sin(this.clock*(n.sprinting?13:9))*.006:0,u=.54*Math.tan(t.fov*Math.PI/360);this.hand.position.set(u*t.aspect*.66-h*.046,-u*.8+d+h*.042,-.54-h*.045),this.hand.rotation.set(.15-h*.74,-.55+h*.15,-.31+h*.19),this.hand.scale.setScalar(.235),this.hand.material.color.setScalar(r)}dispose(){this.hand.removeFromParent(),this.hand.geometry.dispose(),this.hand.material.dispose(),this.cracking.removeFromParent(),this.cracking.material.dispose(),this.mask.dispose(),this.ghost.removeFromParent(),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.cube.dispose()}}const Yn=256,wl=96,Tl=1.62,Cs=1.8,tn=.3,Ps=.96,Zc=5,fe=1e-7,Ds=(i,t,e)=>i>=0&&i<Yn&&e>=0&&e<Yn&&t>=0&&t<wl,io=i=>i!==0&&i!==13,Wo=(i,t,e)=>Math.min(e,Math.max(t,i));function Al(i){return{...i,grounded:!1,vx:0,vy:0,vz:0,inWater:!1,flying:!1,wasJump:!1,crouched:!!i.crouched,coyote:0,jumpBuffer:0,eye:i.crouched?.79:Tl,stride:0,bobOffset:0,fovOffset:0}}function wd(i){i.wasJump=!1,i.jumpBuffer=0,i.coyote=0,i.vx=0,i.vz=0,i.bobOffset=0,i.fovOffset=0}function Bs(i){return(i.eye??(i.crouched?.79:Tl))+(i.bobOffset??0)}function Td(i,t,e,n,s,r,a){const{x:o,z:c}=yd(i);return e+Gn(i,s-t-o*a,r-n-c*a)}function Ls(i,t,e,n,s=Cs){const r=Math.floor(t-tn+fe),a=Math.floor(t+tn-fe),o=Math.floor(e+fe),c=Math.floor(e+s-fe),l=Math.floor(n-tn+fe),h=Math.floor(n+tn-fe);if(!Ds(r,o,l)||!Ds(a,c,h))return!0;for(let d=o;d<=c;d++)for(let u=l;u<=h;u++)for(let f=r;f<=a;f++){const g=i.get(f,d,u);if(io(g)&&(!_n(g)||e<Td(g,f,d,u,t,n,tn-fe)-fe))return!0}return!1}function Jc(i,t,e,n){return i.get(Math.floor(t),Math.floor(e+.12),Math.floor(n))===13||i.get(Math.floor(t),Math.floor(e+1),Math.floor(n))===13}function Rr(i,t,e=!1){const n={yaw:Number.isFinite(t.yaw)?t.yaw:0,pitch:Number.isFinite(t.pitch)?Wo(t.pitch,-1.55,1.55):0},s=(d,u,f,g=Cs,_=!1)=>Number.isFinite(d)&&Number.isFinite(u)&&Number.isFinite(f)&&!Ls(i,d,u,f,g)&&(_||!Jc(i,d,u,f));if(s(t.x,t.y,t.z,t.crouched?Ps:Cs,e))return{x:t.x,y:t.y,z:t.z,...n,...t.crouched?{crouched:!0}:{}};const r=i.spawn?.()??{x:128.5,y:60,z:128.5,...n},a=Number.isFinite(t.x)&&Number.isFinite(t.z)?t:r,o=Wo(Math.floor(a.x),0,Yn-1),c=Wo(Math.floor(a.z),0,Yn-1);function l(d,u){if(Ds(d,0,u))for(let f=wl-1;f>=0;f--){const g=i.get(d,f,u);if(g!==0)return g!==13&&s(d+.5,f+1,u+.5)?{x:d+.5,y:f+1,z:u+.5,...n}:void 0}}const h=l(o,c);if(h)return h;if(s(r.x,r.y,r.z))return{...r,...n};for(let d=1;d<Yn;d++)for(let u=-d;u<=d;u++){const f=l(o+u,c-d)??l(o+u,c+d);if(f)return f;if(Math.abs(u)<d){const g=l(o-d,c+u)??l(o+d,c+u);if(g)return g}}throw new Error("立てる場所が見つかりません。別のワールドかバックアップを開いてください。")}function Ad(i,t,e,n){if(!n)return!1;const s=t[e];t[e]=s+n;const r=t.crouched?Ps:Cs;if(!Ls(i,t.x,t.y,t.z,r))return!1;if(e==="y"&&n<0){const l=Ya(i,t.x,t.z,t.y-fe,s+fe);if(l)return t.y=l.y,!0}const a=e==="y"?n>0?r:0:n>0?tn:-tn,o=s+n+a,c=(n>0?Math.floor(o-fe):Math.ceil(o+fe))-a;if(e!=="y"&&Math.abs(c-s)>Math.abs(n)+fe){let l=0,h=1;for(let d=0;d<9;d++){const u=(l+h)/2;t[e]=s+n*u,Ls(i,t.x,t.y,t.z,r)?h=u:l=u}t[e]=s+n*l}else t[e]=c;return!0}function Ya(i,t,e,n,s,r=tn-fe){let a=null;const o=Math.max(0,Math.ceil(n-1)),c=Math.min(wl-1,Math.floor(s)),l=Math.max(0,Math.floor(t-r)),h=Math.min(Yn-1,Math.floor(t+r)),d=Math.max(0,Math.floor(e-r)),u=Math.min(Yn-1,Math.floor(e+r));for(let f=o;f<=c;f++)for(let g=d;g<=u;g++)for(let _=l;_<=h;_++){const m=i.get(_,f,g);if(!io(m))continue;const p=_n(m),M=p?Td(m,_,f,g,t,e,r):f+1;M<n||M>s||(!a||M>a.y+fe||!p&&_n(a.id)&&Math.abs(M-a.y)<=fe)&&(a={y:M,id:m})}return a}function cr(i,t,e,n,s=tn-fe){return Ya(i,t,n,e-.002,e+.002,s)}function Jh(i,t,e,n,s,r,a){if(!n)return!1;const o=t.x+(e==="x"?n:0),c=t.z+(e==="z"?n:0);if(s){const l=Math.abs(n)+.054,h=Ya(i,o,c,t.y-l,t.y+l);if(h&&(_n(h.id)||_n(s.id))){if(r&&!Ya(i,o,c,t.y-l,t.y+l,a))return!0;if(!Ls(i,o,h.y,c,t.crouched?Ps:Cs))return t[e]+=n,t.y=h.y,!1}}return r&&!cr(i,o,t.y,c,a)?!0:Ad(i,t,e,n)}function vx(i,t,e,n,s={}){if(!(n>0)||!Number.isFinite(n))return;const r=Math.min(n,.25),a=Math.ceil(r*100),o=r/a,c=Math.max(1,Math.hypot(e.forward,e.right)),l=e.forward/c,h=e.right/c,d=Math.sin(t.yaw),u=Math.cos(t.yaw),f=h*u-l*d,g=-h*d-l*u;(e.jumpPressed||e.jump&&!t.wasJump)&&(t.jumpBuffer=.105);for(let _=0;_<a;_++){const m=t.x,p=t.z;t.inWater=Jc(i,t.x,t.y,t.z);const M=t.vy<=0?cr(i,m,t.y,p):null;M&&(t.y=M.y),t.crouched=!t.flying&&!t.inWater&&e.down&&(!!M||t.crouched)||t.crouched&&Ls(i,m,t.y,p);const E=t.flying?e.sprint?13:8:t.inWater?2:t.crouched?1.65:e.sprint?6.4:4.2;if(t.flying||t.inWater)t.vx=f*E,t.vz=g*E;else{const z=M&&_n(M.id)?yd(M.id):null,Y=z?t.crouched?2.4:6.4:0,W=z?E*.48:E,K=f*W+(z?.x??0)*Y-t.vx,Z=g*W+(z?.z??0)*Y-t.vz,st=Math.min(1,(z?13:M?f||g?53:72:f||g?17:5)*o/(Math.hypot(K,Z)||1));t.vx+=K*st,t.vz+=Z*st}const y=!!M&&t.crouched&&!t.flying,A=y&&cr(i,m,t.y,p,.1)?.1:tn-fe,T=t.vx*o,C=t.vz*o,L=t.flying||t.inWater?null:M;if(Jh(i,t,"x",T,L,y,A)&&(t.vx=0),Jh(i,t,"z",C,L,y,A)&&(t.vz=0),M&&(t.coyote=.08),t.flying)t.coyote=t.jumpBuffer=0,t.vy=(Number(e.jump)-Number(e.down))*E;else if(t.inWater)t.coyote=t.jumpBuffer=0,t.vy=e.jump?4.9:Math.max(-2.1,t.vy-7*o);else{const z=M&&Math.abs(t.y-Math.round(t.y))<.002?lx(i.get(Math.floor(t.x),Math.round(t.y)-1,Math.floor(t.z))):0;(z||t.jumpBuffer>0&&t.coyote>0)&&(t.vy=z?Math.sqrt(48*z)+.12:8.35,t.jumpBuffer=t.coyote=0),t.vy>0||!cr(i,t.x,t.y,t.z)?t.vy=Math.max(-30,t.vy-24*o):t.vy=0}Ad(i,t,"y",t.vy*o)&&(t.vy=0),t.grounded=t.vy<=0&&!!cr(i,t.x,t.y,t.z),t.jumpBuffer=Math.max(0,t.jumpBuffer-o),t.coyote=Math.max(0,t.coyote-o);const S=Math.hypot(t.x-m,t.z-p);t.stride=(t.stride+S*4.2)%(Math.PI*2);const b=t.grounded&&!t.flying&&S>0&&s.bob!==!1?Math.sin(t.stride)*(t.crouched?.006:.021):0;t.bobOffset+=(b-t.bobOffset)*Math.min(1,18*o);const P=t.crouched?.79:Tl;t.eye+=(P-t.eye)*Math.min(1,18*o),t.crouched&&t.eye>Ps-.07&&Ls(i,t.x,t.y,t.z,t.eye+.07)&&(t.eye=Ps-.07);const O=e.sprint&&!t.crouched&&S/o>4.2&&s.sprintFov!==!1?4:0;t.fovOffset+=(O-t.fovOffset)*Math.min(1,10*o)}t.inWater=Jc(i,t.x,t.y,t.z),t.wasJump=e.jump}function xi(i,t,e=Zc){if(!Number.isFinite(e)||e<0||![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=t.x,s=t.y+Bs(t),r=t.z,a=Math.cos(t.pitch),o=-Math.sin(t.yaw)*a,c=Math.sin(t.pitch),l=-Math.cos(t.yaw)*a;let h=Math.floor(n),d=Math.floor(s),u=Math.floor(r);const f=Math.sign(o),g=Math.sign(c),_=Math.sign(l),m=o?Math.abs(1/o):1/0,p=c?Math.abs(1/c):1/0,M=l?Math.abs(1/l):1/0,E=(O,z,Y)=>Y===0?1/0:Math.max(0,((Y>0?z+1:z)-O)/Y);let y=E(n,h,o),A=E(s,d,c),T=E(r,u,l),C=0,L=0,S=0,b=0;const P=Math.min(Zc,e);for(let O=0;O<=3*Math.ceil(P)+1&&b<=P&&Ds(h,d,u);O++){const z=i.get(h,d,u);if(_n(z)){const Z=Math.min(P,y,A,T),V=pt=>s+c*pt-d-Gn(z,n+o*pt-h,r+l*pt-u),st=V(b),ct=V(Z);if(st<=fe)return{x:h,y:d,z:u,id:z,nx:C,ny:L,nz:S,distance:b};if(ct<=0){const pt=b+(Z-b)*st/(st-ct);return{x:h,y:d,z:u,id:z,nx:0,ny:1,nz:0,distance:pt}}}else if(io(z))return{x:h,y:d,z:u,id:z,nx:C,ny:L,nz:S,distance:b};C=L=S=0,b=Math.min(y,A,T);const Y=y<=b+1e-10,W=A<=b+1e-10,K=T<=b+1e-10;Y&&(y+=m,h+=f),W&&(A+=p,d+=g),K&&(T+=M,u+=_),Y?C=-f:W?L=-g:S=-_}return null}function so(i,t,e,n){return t<i.x+tn-fe&&t+1>i.x-tn+fe&&n<i.z+tn-fe&&n+1>i.z-tn+fe&&e<i.y+(i.crouched?Ps:Cs)-fe&&e+1>i.y+fe}function xx(i,t,e){if(!e||Math.abs(e.nx)+Math.abs(e.ny)+Math.abs(e.nz)!==1)return!1;const n=e.x+e.nx,s=e.y+e.ny,r=e.z+e.nz;return!Ds(n,s,r)||io(i.get(n,s,r))?!1:!so(t,n,s,r)}function Rd(i,t,e){if(!e)return!1;const n=xi(i,t);return!!n&&n.x===e.x&&n.y===e.y&&n.z===e.z&&n.id===e.id&&n.nx===e.nx&&n.ny===e.ny&&n.nz===e.nz}function Mx(i,t,e,n,s,r){if(!Rd(i,t,r))return{ok:!1,message:"5ブロック以内の素材に照準を合わせてください。"};if(r.id===22&&i.chestAt?.(r.x,r.y,r.z)?.length)return{ok:!1,message:"先にチェストの中身を取り出してください。"};if(!Qt[r.id]?.block)return{ok:!1,message:"岩盤は掘れません。"};if(n==="creative")return i.set(r.x,r.y,r.z,0)?{ok:!0,message:Qt[r.id].name+"を取り除きました。"}:{ok:!1,message:"ここは掘れません。"};const a=Pu(e,r.id,e.hotbar[s]);return a.draft?i.set(r.x,r.y,r.z,0)?(Object.assign(e,a.draft),{ok:!0,message:a.message}):{ok:!1,message:"ここは掘れません。"}:{ok:!1,message:a.message}}function Rl(i,t,e,n,s,r){const a=e.hotbar[s];if(!Qt[a]?.block)return"ホットバーから建材を選んでください。";if(n==="explore"&&!Un(e,a))return Qt[a].name+"を持っていません。";if(!r)return"5ブロック以内の面に照準を合わせてください。";const o=r.x+r.nx,c=r.y+r.ny,l=r.z+r.nz;return Ds(o,c,l)?so(t,o,c,l)?"自分の体に重なる場所です。":xx(i,t,r)?null:"ここにはすでにブロックがあります。":"ワールドの外には置けません。"}function yx(i,t,e,n,s,r,a){const o=Rl(i,t,e,n,s,r);if(o)return{ok:!1,message:o};if(!Rd(i,t,r))return{ok:!1,message:"5ブロック以内の面に照準を合わせてください。"};const c=e.hotbar[s];return a!==void 0&&(c!==30||!_n(a))?{ok:!1,message:"この建材の向きは変更できません。"}:i.set(r.x+r.nx,r.y+r.ny,r.z+r.nz,a??c)?(n==="explore"&&Du(e,c),{ok:!0,message:Qt[c].name+"を置きました。"}):{ok:!1,message:"ここには置けません。"}}const bx=.17;function Sx(i,t,e,n,s){if(t-s<0||n-s<0||t+s>=Yn||n+s>=Yn||e-s<0)return!0;for(let r=Math.floor(e-s);r<=Math.floor(e+s);r++)for(let a=Math.floor(n-s);a<=Math.floor(n+s);a++)for(let o=Math.floor(t-s);o<=Math.floor(t+s);o++){const c=i.get(o,r,a);if(c!==0&&c!==13)return!0}return!1}function Qh(i,t,e,n){const s=Math.max(1,Math.ceil(t.distanceTo(e)/.14));for(let r=1;r<=s;r++){const a=r/s;if(Sx(i,t.x+(e.x-t.x)*a,t.y+(e.y-t.y)*a,t.z+(e.z-t.z)*a,n))return(r-1)/s}return 1}function Cd(i,t){Pd(i,67+(t.fovOffset??0)),i.position.set(t.x,t.y+Bs(t),t.z),i.rotation.set(t.pitch,t.yaw,0,"YXZ")}function Pd(i,t){Math.abs(t-i.fov)<=.01||(i.fov=t,i.updateProjectionMatrix())}class Ex{eye=new I;raised=new I;aim=new I;screen=new I;boom=1;next=!1;reticle={x:50,y:50};reset(){this.boom=1,this.next=!1,this.reticle.x=this.reticle.y=50}update(t,e,n,s,r){const a=Math.sin(n.yaw),o=Math.cos(n.yaw),c=Math.cos(n.pitch);this.eye.set(n.x,n.y+Bs(n),n.z);const l=s?Math.max(0,s.distance-.035):Zc;this.aim.set(n.x-a*c*l,this.eye.y+Math.sin(n.pitch)*l,n.z-o*c*l),this.raised.set(n.x+a*7.4,this.eye.y+5.6,n.z+o*7.4);let h=Qh(e,this.eye,this.raised,bx);if(s&&(h=this.visibleFraction(t,e,h)),this.boom=this.next?Math.min(h,this.boom+(h-this.boom)*(1-Math.exp(-11*r))):h,this.next=!0,s&&this.boom!==h&&(this.boom=this.visibleFraction(t,e,this.boom)),t.position.lerpVectors(this.eye,this.raised,this.boom),this.boom<.23)return Cd(t,n),this.reticle.x=this.reticle.y=50,!1;const d=53;Pd(t,d);const u=Math.min(1.65,this.boom*2.5),f=Math.atan2(n.y+1.03-t.position.y,7.4*this.boom+u),g=Math.atan2(this.aim.y-t.position.y,7.4*this.boom+c*l),_=d*Math.PI/180*.35;return t.rotation.set(Math.min(g+_,Math.max(g-_,f)),n.yaw,0,"YXZ"),t.updateMatrixWorld(),this.screen.copy(this.aim).project(t),this.reticle.x=(1+this.screen.x)*50,this.reticle.y=(1-this.screen.y)*50,!0}visibleFraction(t,e,n){for(;n>=.23&&(t.position.lerpVectors(this.eye,this.raised,n),Qh(e,t.position,this.aim,0)!==1);)n*=.61;return n}}function Dd(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Ge;let l=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}c.setIndex(d)}for(const h in r){const d=tu(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let _=0;_<a[h].length;++_)f.push(a[h][_][u]);const g=tu(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function tu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new $e(a,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const d=c/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){const _=h.getComponent(u,g);o.setComponent(u+d,g,_)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const Js=5847973,Xo=9929704,eu=16760167,qo=16771519,wx=3583139,nu=3425640,Qs=16480361,iu=15972242,su=3681102,Tx=[.79,.67,1,.51,.72,.88];function ga(i,t){const e=i.map(([s,r,a,o,c,l,h])=>{const d=new gn(o,c,l);d.translate(s,r,a);const u=new Wt(h),f=new Float32Array(d.attributes.position.count*3);for(let g=0;g<f.length/3;g++){const _=Tx[Math.floor(g/4)];u.multiplyScalar(_).toArray(f,g*3),u.setHex(h)}return d.setAttribute("color",new $e(f,3)),d}),n=Dd(e);for(const s of e)s.dispose();return new Se(n,t)}class Ld{group=new Hi;body=new Hi;material=new qi({vertexColors:!0,toneMapped:!1});head;arms=[];legs=[];shadow=new Se(new Os(.76,.76),new Ve({transparent:!0,depthWrite:!1,vertexShader:`
        varying vec2 texel;
        void main() {
          texel = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }`,fragmentShader:`
        varying vec2 texel;
        void main() {
          float opacity = .33 * (1. - smoothstep(.09, .49, length(texel - .5)));
          gl_FragColor = vec4(.09, .13, .17, opacity);
        }`}));phase=0;idle=0;gait=0;actionPhase=0;actionBlend=0;constructor(){this.group.name="kids-avatar",this.group.visible=!1,this.group.add(this.body,this.shadow),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.012,this.shadow.renderOrder=1;const t=ga([[0,.796,0,.39,.53,.29,eu],[0,.57,0,.4,.095,.3,Js],[0,.789,-.149,.034,.38,.015,qo],[0,1.044,.005,.39,.094,.32,Qs],[-.102,.962,-.15,.087,.15,.025,Qs],[0,.832,.174,.326,.385,.224,nu],[0,.878,.237,.303,.28,.102,wx],[0,.972,.244,.303,.098,.106,7919294],[0,.849,.299,.086,.086,.025,qo],[0,.849,.315,.031,.031,.013,Qs],[0,.686,.233,.22,.078,.108,2656899]],this.material);t.name="explorer-coat-and-pack",this.body.add(t),this.head=ga([[0,.223,0,.426,.446,.405,iu],[0,.27,.123,.428,.31,.158,Js],[0,.446,.003,.494,.143,.451,Js],[0,.534,.013,.444,.086,.417,Xo],[0,.579,.026,.302,.038,.287,Xo],[0,.421,-.181,.456,.056,.163,Xo],[0,.498,.007,.194,.027,.125,qo],[-.102,.233,-.203,.039,.055,.011,su],[.102,.233,-.203,.039,.055,.011,su],[-.141,.167,-.203,.063,.018,.011,Qs],[.141,.167,-.203,.063,.018,.011,Qs],[0,.146,-.204,.054,.022,.011,9522272]],this.material),this.head.name="explorer-head",this.head.position.y=1.08,this.body.add(this.head);for(const e of[-1,1]){const n=ga([[0,-.127,0,.122,.318,.182,eu],[0,-.269,0,.126,.084,.185,Js],[0,-.343,-.012,.113,.086,.129,iu]],this.material);n.name="explorer-arm",n.position.set(.232*e,.969,.01),this.arms.push(n),this.body.add(n);const s=ga([[0,-.146,.01,.158,.319,.168,nu],[0,-.346,-.037,.173,.143,.247,Js],[0,-.415,-.031,.176,.048,.251,2501193]],this.material);s.name="explorer-boot",s.position.set(.112*e,.441,.008),this.legs.push(s),this.body.add(s)}}update(t,e,n=!1,s=1){const r=Math.min(.05,Math.max(0,e)),a=Math.hypot(t.vx,t.vz),o=!t.grounded&&!t.inWater&&!t.flying,c=t.grounded||t.inWater?Math.min(1,a/3.1):0;this.gait=ar.damp(this.gait,c,17,r),this.phase=(this.phase+r*(4+Math.min(6.4,a)*1.65))%(Math.PI*2),this.idle=(this.idle+r*3)%(Math.PI*2),this.actionPhase=n?(this.actionPhase+r*20)%(Math.PI*2):0,this.actionBlend=ar.damp(this.actionBlend,n?1:0,21,r);const l=Math.sin(this.phase)*this.gait,h=(.52+.35*Math.sin(this.actionPhase))*this.actionBlend;this.group.position.set(t.x,t.y,t.z),this.group.rotation.y=t.yaw,this.body.position.y=.004+(t.grounded?.028*this.gait*Math.abs(l):0)+.006*(1+Math.sin(this.idle)),this.body.scale.y=t.crouched?.54:1,this.head.rotation.x=ar.clamp(t.pitch*.28,-.22,.21),this.head.rotation.z=.037*l,this.legs[0].rotation.x=.5*l+(o?.18:0),this.legs[1].rotation.x=-.5*l-(o?.21:0),this.arms[0].rotation.x=-.49*l+(o?.24:0),this.arms[1].rotation.x=.49*l+h+(o?.24:0),this.arms[0].rotation.z=t.flying?-.38:-.035,this.arms[1].rotation.z=t.flying?.38:.035,this.shadow.visible=t.grounded&&!t.inWater&&!t.flying;const d=ar.clamp(s,0,1);this.material.color.setRGB(.58+d*.42,.66+d*.34,.8+d*.2)}dispose(){this.group.removeFromParent();for(const t of this.body.children)t instanceof Se&&t.geometry.dispose();this.material.dispose(),this.shadow.geometry.dispose(),this.shadow.material.dispose()}}function Ax(i){const t=document.createElement("canvas");t.width=512,t.height=96;const e=t.getContext("2d");e.font="bold 46px system-ui, sans-serif";const n=Math.min(490,Math.ceil(e.measureText(i).width)+50),s=(t.width-n)/2;e.fillStyle="#142e29eb",e.beginPath(),e.roundRect?e.roundRect(s,12,n,72,22):e.rect(s,12,n,72),e.fill(),e.strokeStyle="#eec983",e.lineWidth=3,e.stroke(),e.fillStyle="#fff6d9",e.textAlign="center",e.textBaseline="middle",e.fillText(i,256,49,n-34);const r=new gm(t);r.colorSpace=Be;const a=new lm(new od({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}));return a.scale.set(3.35,.63,1),a}class Rx{constructor(t){this.scene=t}scene;actors=new Map;setPlayers(t){const e=new Set;for(const n of t){e.add(n.id);let s=this.actors.get(n.id);if(!s){const r=new Ld,a=Ax(n.nickname);r.group.visible=!0,r.group.name="online-player",r.group.add(a),this.scene.add(r.group),s={avatar:r,label:a,body:Al({...n.pose,pitch:0}),goal:n.pose},this.actors.set(n.id,s)}s.goal=n.pose}for(const[n,s]of this.actors)e.has(n)||this.release(n,s)}animate(t,e){for(const{body:n,goal:s,avatar:r,label:a}of this.actors.values()){const c=Math.hypot(s.x-n.x,s.y-n.y,s.z-n.z)>12||t===0?1:1-Math.exp(-6*t);n.x+=(s.x-n.x)*c,n.y+=(s.y-n.y)*c,n.z+=(s.z-n.z)*c;const l=s.yaw-n.yaw;n.yaw+=Math.atan2(Math.sin(l),Math.cos(l))*c,n.crouched=s.crouched,n.flying=s.flying,n.grounded=!s.flying,n.vx=s.moving?3.3:0,a.position.y=s.crouched?1.23:2.02,r.update(n,t,!1,e)}}dispose(){for(const[t,e]of this.actors)this.release(t,e)}release(t,{avatar:e,label:n}){n.material.map?.dispose(),n.material.dispose(),e.dispose(),this.actors.delete(t)}}const Cx=[0,8629330,11041876,9608594,14663561,9861198,6528082,13080411,9608078,9084310,10344399,6647915,15975794,6932679,5857887];class Px{constructor(t,e){this.canvas=t,this.world=e;const n=t.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"high-performance"});if(!n)throw new Error("WebGL 2を利用できません。ChromeまたはEdgeの設定でグラフィック アクセラレーションを有効にして再起動してください。");this.gl=new sx({canvas:t,context:n,antialias:!1,alpha:!1}),this.gl.outputColorSpace=Be,this.gl.toneMapping=Wn,this.atlas.anisotropy=Math.min(4,this.gl.capabilities.getMaxAnisotropy()),this.gl.setClearColor(12376013),this.sky=new px(this.scene,e.salt);for(let r=0;r<this.heights.length;r++)this.heights[r]=Math.max(0,e.highest[r]);this.heightTexture=new Nr(this.heights,256,256,Ir),this.heightTexture.magFilter=Pe,this.heightTexture.minFilter=Pe,this.heightTexture.needsUpdate=!0,this.materials=[Zh(this.atlas,this.heightTexture,this.sky,this.uniforms,!1),Zh(this.atlas,this.heightTexture,this.sky,this.uniforms,!0)],this.tools=new _x(this.scene,this.camera,this.atlas);const s=new gn(1.008,1.008,1.008);this.selection=new mm(new _m(s),new hd({color:16772533,toneMapped:!1})),s.dispose(),this.selection.visible=!1,this.selection.renderOrder=4,this.scene.add(this.selection),this.chips=new Ga(new gn(.1,.1,.1),new qi({color:16777215}),64),this.chips.count=0,this.chips.frustumCulled=!1,this.chips.visible=!1,this.scene.add(this.chips),this.border=this.makeBorder(),this.scene.add(this.border),this.unsubscribe=e.onEdit((r,a,o)=>{for(const h of Ef(r,a,o))this.wanted.has(h)&&this.dirty.add(h);const c=r+256*o,l=Math.max(0,e.highest[c]);this.heights[c]!==l&&(this.heights[c]=l,this.heightTexture.needsUpdate=!0),this.lampDue=0})}canvas;world;scene=new om;actors=new Rx(this.scene);camera=new pn(67,1,.06,320);stats={draws:0,chunks:0,geometries:0,textures:0,fps:0,queued:0,triangles:0,chunkMs:0,rebuilt:0};gl;sky;atlas=ax();heightTexture;heights=new Uint8Array(256*256);uniforms={lampPositions:{value:Array.from({length:4},()=>new I)},lampCount:{value:0},lampColors:{value:Array.from({length:4},()=>new I)},fogEnd:{value:75},clock:{value:0},shadows:{value:1},extras:{value:1},submerged:{value:0}};tools;kidsCamera=new Ex;avatar;actionTime=0;materials;batches=new Map;pending=[];wanted=new Set;dirty=new Set;unsubscribe;selection;border;chips;particles=[];dummy=new Re;chipColor=new Wt;quality={distance:4,scale:1,shadows:!0};cx=-100;cz=-100;cy=-100;t=0;wt=0;ht=0;lampDue=0;elapsed=0;frameCount=0;totalFrames=0;lampCamera=new I(1/0,1/0,1/0);vegetation=1;visibleChunks=new Set;configure(t){const e=Math.max(2,Math.min(8,Math.round(t.distance)));e!==this.quality.distance&&(this.cx=-100);const n=t.vegetation===!1?0:t.quality==="high"?1.4:t.quality==="low"?.42:1;if(n!==this.vegetation){this.vegetation=n;for(const s of this.batches.keys())this.world.occupied[s]&&this.dirty.add(s)}this.quality={...t,distance:e,scale:Math.max(.45,Math.min(1.5,t.scale))},this.uniforms.shadows.value=t.shadows?t.quality==="high"?2:1:0,this.uniforms.extras.value=t.effects===!1?0:1,this.uniforms.fogEnd.value=(e+.45)*16,this.wt=0}makeBorder(){const t=[];for(const[r,a,o,c]of[[0,0,256,0],[256,0,256,256],[256,256,0,256],[0,256,0,0]])t.push(r,0,a,o,0,c,o,96,c,r,0,a,o,96,c,r,96,a);const e=new Ge;e.setAttribute("position",new xe(t,3));const n=new Ve({side:yn,transparent:!0,depthWrite:!1,vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 p;void main(){
        float limit=1.-smoothstep(1.,12.,distance(cameraPosition,p));if(limit<=0.)discard;
        vec2 grid=fract(vec2(p.x+p.z,p.y)*.5);float line=step(min(grid.x,grid.y),.022);
        gl_FragColor=vec4(.95,.79,.45,limit*(.06+.49*line));}`}),s=new Se(e,n);return s.visible=!1,s}schedule(t){const e=Math.floor(t.x/16),n=Math.floor(t.z/16),s=Math.floor(t.y/16);if(e===this.cx&&n===this.cz&&s===this.cy)return;this.cx=e,this.cz=n,this.cy=s,this.wanted.clear(),this.pending.length=0;const r=this.quality.distance,a=-Math.sin(t.yaw),o=-Math.cos(t.yaw);for(let c=Math.max(0,n-r);c<=Math.min(15,n+r);c++)for(let l=Math.max(0,e-r);l<=Math.min(15,e+r);l++){const h=l-e,d=c-n,u=Math.hypot(h,d);if(u>r+.65)continue;const f=this.world.highest[l*16+8+256*(c*16+8)]>>4;for(let g=0;g<6;g++){const _=Mr(l,g,c);if(this.wanted.add(_),this.batches.has(_)||!this.world.occupied[_])continue;const m=h*a+d*o,p=Math.min(Math.abs(g-f)*2,Math.abs(g-s)*2);this.pending.push({key:_,priority:u*2.2+p+.2*Math.abs(g-s)-m*.55+(g+1<Math.min(s,f)?8:0)})}}this.pending.sort((c,l)=>l.priority-c.priority);for(const[c,l]of this.batches)this.wanted.has(c)||(this.removeMeshes(l),this.batches.delete(c));for(const c of this.dirty)this.wanted.has(c)||this.dirty.delete(c)}removeMeshes(t){for(const e of t)this.scene.remove(e),e.geometry.dispose()}rebuild(t){const e=this.batches.get(t);e&&this.removeMeshes(e);const n=[],s=fx(this.world,t&15,t>>>8,t>>>4&15,this.vegetation);for(let r=0;r<s.length;r++){const a=s[r];if(!a)continue;const o=new Se(a,this.materials[r===0?0:1]);o.renderOrder=r===0?0:1,o.onBeforeRender=()=>{this.visibleChunks.add(t)},n.push(o),this.scene.add(o)}this.batches.set(t,n)}pump(){const t=performance.now(),e=this.totalFrames<4?8:3.5;let n=0;do{let s;if(this.dirty.size)s=this.dirty.values().next().value,this.dirty.delete(s);else if(this.pending.length){if(s=this.pending.pop().key,this.batches.has(s))continue}else break;this.rebuild(s),n++}while(n<9&&performance.now()-t<e);this.stats.chunkMs=n?performance.now()-t:0,this.stats.rebuilt=n}lamps(t){const e=[];for(const n of this.world.lamps){const s=(n&255)+.5,r=(n>>>16)+.5,a=(n>>>8&255)+.5,o=(s-t.x)**2+(a-t.z)**2+(r-t.y)**2;o>676||e.length===4&&o>=e[3].d||(e.push({key:n,d:o}),e.sort((c,l)=>c.d-l.d),e.length>4&&e.pop())}this.uniforms.lampCount.value=e.length,e.forEach(({key:n},s)=>{this.uniforms.lampPositions.value[s].set((n&255)+.5,(n>>>16)+.5,(n>>>8&255)+.5);const r=this.world.data[n]===25;this.uniforms.lampColors.value[s].set(r?.36:1.86,r?1.57:1.09,r?1.4:.43)})}effect(t,e,n,s,r="mine"){this.tools.swing(),this.actionTime=.26;const a=this.quality.effects===!1?0:r==="place"?3:7;for(let o=0;o<a;o++)this.particles.length>=64&&this.particles.shift(),this.particles.push({x:t+.5+(Math.random()-.5)*.65,y:e+.55+Math.random()*.38,z:n+.5+(Math.random()-.5)*.65,vx:(Math.random()-.5)*2.1,vy:1+Math.random()*1.7,vz:(Math.random()-.5)*2.1,life:.32+Math.random()*.17,id:s})}updateParticles(t){for(let e=this.particles.length-1;e>=0;e--){const n=this.particles[e];if(n.life-=t,n.life<=0){this.particles.splice(e,1);continue}n.vy-=8*t,n.x+=n.vx*t,n.y+=n.vy*t,n.z+=n.vz*t}this.chips.count=this.particles.length,this.chips.visible=this.chips.count>0;for(let e=0;e<this.chips.count;e++){const n=this.particles[e];this.dummy.position.set(n.x,n.y,n.z),this.dummy.rotation.set(n.life*4,e+n.life*5,e*.8),this.dummy.scale.setScalar(Math.min(1,n.life*5)),this.dummy.updateMatrix(),this.chips.setMatrixAt(e,this.dummy.matrix),this.chips.setColorAt(e,this.chipColor.setHex(Cx[n.id]??(n.id===23||n.id===25||n.id===26?9554109:11837559)))}this.chips.count&&(this.chips.instanceMatrix.needsUpdate=!0,this.chips.instanceColor&&(this.chips.instanceColor.needsUpdate=!0))}update(t,e,n,s,r,a){const o=Math.max(1,this.canvas.clientWidth),c=Math.max(1,this.canvas.clientHeight);if(o!==this.wt||c!==this.ht){this.wt=o,this.ht=c;const g=Math.min(window.devicePixelRatio||1,1.5),_=this.quality.quality==="standard"||this.quality.quality==="high"?2073600:12e5,m=Math.sqrt(_/(o*c));this.gl.setPixelRatio(Math.min(g,m)*this.quality.scale),this.gl.setSize(o,c,!1),this.camera.aspect=o/c,this.camera.updateProjectionMatrix()}this.t+=s,this.uniforms.clock.value=this.t;const l=Bs(t),h=a?this.kidsCamera.update(this.camera,this.world,a.player,a.hit,s):!1;a||Cd(this.camera,t),this.sky.update(n,this.camera,this.t),this.actors.animate(s,.52+.48*this.sky.day.value),this.actionTime=Math.max(0,this.actionTime-s),h&&a&&(this.avatar||(this.avatar=new Ld,this.scene.add(this.avatar.group)),this.avatar.update(a.player,s,this.actionTime>0||!!r?.mining,.52+.48*this.sky.day.value)),this.avatar&&(this.avatar.group.visible=h),this.selection.visible=!!e,e&&this.selection.position.set(e.x+.5,e.y+.5,e.z+.5);const d=this.camera.position;this.uniforms.submerged.value=+(this.world.get(Math.floor(d.x),Math.floor(d.y),Math.floor(d.z))===13),this.border.visible=Math.min(t.x,t.z,256-t.x,256-t.z)<12,this.schedule(t),this.pump(),this.lampDue-=s,(this.lampDue<=0||this.lampCamera.distanceToSquared(this.camera.position)>4)&&(this.lamps(t),this.lampDue=.23,this.lampCamera.copy(this.camera.position)),this.updateParticles(s);const u=this.world.highest[(t.x|0)+(t.z|0)*256]>t.y+l+1.5;this.tools.update(this.camera,e,r,s,(u?.57:.7)+this.sky.day.value*(u?.13:.3),this.uniforms.extras.value>0,!h),this.visibleChunks.clear(),this.gl.render(this.scene,this.camera);const f=this.gl.info;this.stats.draws=f.render.calls,this.stats.triangles=f.render.triangles,this.stats.geometries=f.memory.geometries,this.stats.chunks=this.visibleChunks.size,this.stats.textures=f.memory.textures,this.stats.queued=this.pending.length+this.dirty.size,this.totalFrames++,this.frameCount++,this.elapsed+=s,this.elapsed>=.6&&(this.stats.fps=Math.round(this.frameCount/this.elapsed),this.frameCount=0,this.elapsed=0)}dispose(){this.unsubscribe(),this.actors.dispose(),this.avatar?.dispose();for(const t of this.batches.values())this.removeMeshes(t);this.batches.clear(),this.dirty.clear(),this.wanted.clear(),this.pending.length=0,this.selection.geometry.dispose(),this.selection.material.dispose(),this.border.geometry.dispose(),this.border.material.dispose(),this.chips.geometry.dispose(),this.chips.material.dispose(),this.chips.dispose(),this.sky.dispose(this.scene),this.materials.forEach(t=>t.dispose()),this.tools.dispose(),this.atlas.dispose(),this.heightTexture.dispose(),this.scene.clear(),this.gl.dispose()}}const Qc=[{id:"classic",name:"森と湖",detail:"森や洞窟を探検できる、にぎやかなワールド。",thumbnail:"./art/stage-classic.webp"},{id:"flat",name:"まっさらな平地",detail:"木や建物のない草原。自由な建築に。",thumbnail:"./art/stage-flat.webp"},{id:"lake",name:"湖だけ",detail:"小さな砂島から出発。湖の中で魚に出会えます。",thumbnail:"./art/stage-lake.webp"}];function Cl(i){return Qc.some(t=>t.id===i)}function Dx(i,t,e,n){const s=t==="creative";function r(c){const l=Qt[c];return l?{id:c,name:l.name,count:s?1/0:vr(i,c),durability:s?void 0:Un(i,c)?.durability,maxDurability:l.maxDurability}:null}const a=s?Object.keys(Qt).map(Number).filter(c=>Qt[c].block&&Za(c)===c).map(r).filter(c=>!!c):i.slots.map(c=>({id:c.id,name:Qt[c.id].name,count:c.count,durability:c.durability,maxDurability:Qt[c.id].maxDurability})),o=s?[]:Su.filter(c=>!c.legacy||n.generator===1).map(c=>({id:c.id,name:c.name,itemId:c.output.id,ingredients:c.inputs.map(l=>Qt[l.id].name+" "+vr(i,l.id)+"/"+l.count).join(" ・ "),outputs:Qt[c.output.id].name+" ×"+c.output.count,craftable:pf(i,c,n),reason:ll(i,c,n),equipment:Cu(c,n.generator)?"作業台":"手作り"}));return{items:a,bar:i.hotbar.map(r),recipes:o,mode:t,selected:e}}const ye=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Yo=i=>i==="creative"?"クリエイティブ":"探索",ru={lock:{name:"マウス固定",label:"視点を固定してプレイ"},drag:{name:"ドラッグ操作",label:"ドラッグ操作でプレイ"},tablet:{name:"タブレットモード",label:"タブレットモードでプレイ"}},Gt=i=>document.getElementById(i),be=(i,t,e="")=>'<button type="button" class="'+e+'" data-action="'+i+'">'+t+"</button>",Lx=()=>be("back",'<span aria-hidden="true">‹</span> 戻る',"back"),Di=i=>'<header class="panel-head"><h1>'+i+"</h1>"+Lx()+"</header>",jo=i=>Number.isFinite(i)?String(i):"∞",au=new Map,ou={17:"石や鉱石を素早く掘り、潮晶を採取",18:"石や鉱石をさらに速く掘り、潮晶を採取",19:"原木・木材の採掘を短縮",20:"原木・木材をさらに速く採掘",27:"約3ブロック跳び上がる",28:"約6ブロック跳び上がる",29:"約10ブロック跳び上がる",30:"1ブロックずつ高さを変えてつなぐ"};function Ix(i){const t=au.get(i);if(t)return t;const e=document.createElement("canvas");e.width=e.height=32;const n=e.getContext("2d");if(!n)return"";const s=(o,c)=>{n.fillStyle=o,n.beginPath(),n.moveTo(c[0][0],c[0][1]);for(const[l,h]of c.slice(1))n.lineTo(l,h);n.closePath(),n.fill()},r={1:["#86bc59","#916742","#705637"],2:["#bf9165","#9b704c","#77563d"],3:["#b4bac1","#828e98","#646d79"],4:["#f1d9a0","#ccb17e","#b79565"],5:["#d1ad75","#926645","#684630"],6:["#71ac63","#538959","#386c47"],7:["#e6ba82","#bf8c53","#9d7044"],8:["#b4b7b4","#8e9392","#6f797a"],9:["#b9bfc5","#89939e","#647483"],10:["#d8f3f0","#8db8bf","#69a7ae"],11:["#a0aaa9","#7b8486","#69777a"],12:["#ffe3a2","#eeb756","#bf893c"],21:["#eac98f","#a97651","#755040"],22:["#e2ac58","#aa793c","#876137"],23:["#9fc6bd","#689a96","#536f79"],25:["#c2fff1","#6dc7c7","#5aafaf"],26:["#a1c8c1","#668c89","#4e7176"],27:["#66d6a9","#338775","#266259"],28:["#7fc9ee","#4e88b8","#325e96"],29:["#d897e5","#9a67ad","#765183"]};if(r[i]){const o=r[i];s(o[1],[[2,9],[16,16],[16,31],[2,24]]),s(o[2],[[16,16],[30,9],[30,24],[16,31]]),s(o[0],[[2,9],[16,2],[30,9],[16,16]]);const c=(l,h,d,u,f)=>{n.strokeStyle=l,n.lineWidth=1.2,n.beginPath(),n.moveTo(h,d),n.lineTo(u,f),n.stroke()};if(i>=27&&i<=29)for(let l=0;l<i-26;l++){const h=14+l*4;s("#fff4c8",[[6,h+3],[9,h],[12,h+3],[12,h+5],[9,h+3],[6,h+5]])}if((i===22||i===21)&&(c("#573b34",3,15,16,22),c("#543c34",16,22,29,15),n.fillStyle="#ffe2a0",n.fillRect(9,16,3,5)),[23,25,26].includes(i)&&s("#c7fff1",[[6,15],[9,14],[12,20],[9,23]]),i===1&&(s("#6b9e4c",[[2,9],[16,16],[16,19],[11,17],[10,19],[8,15],[6,16],[2,13]]),s("#598340",[[16,16],[30,9],[30,12],[26,15],[23,15],[21,18],[16,19]])),[7,9,12].includes(i)){for(const l of[14,19])c("#533f3970",2,l,16,l+7),c("#493c4266",16,l+7,30,l);i===9&&(c("#56646b",8,12,8,17),c("#53616c",12,19,12,24))}else if(i===5){for(const l of[5,9,13])c("#5e422f",l,10+(l-2)/2,l,23+(l-2)/2);s("#99784c",[[8,9],[16,5],[24,9],[16,13]]),s("#d2ab76",[[11,9],[16,7],[21,9],[16,11]])}else if(i===10)c("#e0ffff",4,13,9,22),c("#c3eeee",18,17,22,23);else{n.fillStyle=i===11?"#35434a":"#ffffff38";for(const[l,h]of[[5,13],[9,19],[12,16],[19,21],[25,15],[16,7]])n.fillRect(l,h,i===11?3:2,i===11?3:1)}}else if(i===30)s("#9d6642",[[3,12],[16,5],[16,24],[3,29]]),s("#c88946",[[3,12],[16,5],[29,12],[16,28],[3,29]]),s("#f5ca70",[[3,12],[16,5],[29,12],[16,28]]),s("#e5f2ca",[[5,12],[9,10],[19,25],[16,28]]),s("#e5f2ca",[[14,6],[16,5],[29,12],[27,15]]);else if(i===24)s("#438c9a",[[7,16],[17,2],[25,13],[17,30],[10,26]]),s("#a6fff0",[[7,16],[17,2],[15,18],[10,26]]),s("#74ddd4",[[15,18],[17,2],[23,13]]);else if(i===15)s("#25323d",[[4,17],[9,8],[20,5],[28,12],[25,23],[14,27],[6,24]]),s("#53626c",[[5,16],[11,9],[20,7],[18,14],[10,20]]),s("#36454d",[[12,23],[19,16],[25,14],[24,21],[15,25]]);else if(s("#754e34",[[5,27],[8,29],[25,8],[22,5]]),s("#ca965f",[[5,25],[7,27],[24,6],[22,4]]),i>=17){const o=i===18||i===20,c=o?"#c3ccd0":"#e5c195",l=o?"#869398":"#b78a59";i<=18?(s(l,[[11,4],[17,3],[26,10],[29,16],[27,17],[23,12],[16,7],[10,7]]),s(c,[[9,4],[16,2],[23,5],[27,10],[25,12],[21,8],[15,5],[9,6]])):(s(l,[[17,5],[23,6],[28,10],[26,17],[19,17],[15,12]]),s(c,[[15,4],[22,4],[27,8],[24,14],[19,15],[13,10]]))}const a=e.toDataURL();return au.set(i,a),a}function tr(i){return'<img class="stamp" src="'+Ix(i)+'" alt="" draggable="false">'}class Ux{constructor(t){this.send=t;const e=new URL(location.href),n=e.pathname.indexOf("/webcraft777/");this.portal=n<0?"../index.html":e.pathname.slice(0,n+1)+"index.html",Gt("game").style.setProperty("--cover",'url("'+new URL("./art/panorama.webp",document.baseURI).href+'")'),Gt("game").addEventListener("click",s=>this.click(s)),this.panel.addEventListener("submit",s=>this.submit(s)),this.panel.addEventListener("change",s=>this.change(s)),this.panel.addEventListener("input",s=>this.settingOutput(s.target)),Gt("fallback").addEventListener("keydown",s=>{s.target.closest("[data-hold]")&&["Enter"," "].includes(s.key)&&(s.preventDefault(),this.startMining())}),Gt("fallback").addEventListener("keyup",()=>this.stopMining()),Gt("view-mode").addEventListener("keydown",s=>{s.code==="Space"&&s.stopPropagation()})}send;screen="title";panel=Gt("overlay");guideSeen=!1;guideTimer=0;inventoryState=null;noticeTimer=0;saveTimer=0;holding=!1;worldName="";kidsView=!1;room=null;onlineDraft={name:"みんなの建築ワールド",seed:"",nickname:"",code:"",mode:"creative"};portal;startMining(){this.holding||(this.holding=!0,this.send("mine-down"))}stopMining(){this.holding&&(this.holding=!1,this.send("mine-up"))}show(t,e,n=!1){this.stopMining(),window.clearTimeout(this.guideTimer);const s=["pause","ready","inventory","diagnostics"].includes(t)||["settings","help"].includes(t)&&!Gt("game").classList.contains("home");["title","create","worlds","online","error"].includes(t)?Gt("game").classList.add("home"):s&&Gt("game").classList.remove("home"),this.screen=t,Gt("game").dataset.screen=t,this.panel.hidden=!1,this.panel.className="overlay "+(t==="title"?"title-overlay":"panel-overlay"),this.panel.innerHTML=t==="title"?e:'<div class="panel'+(n?" wide":"")+'">'+e+"</div>",Gt("hud").hidden=!0,Gt("debug").hidden=!0,this.mining(0),this.panel.scrollTop=0}click(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(n==="view-mode"&&e.id==="view-mode"&&t.detail>0&&Gt("scene").focus({preventScroll:!0}),n==="select"){this.send(n,Number(e.dataset.slot));return}const s=Number(e.dataset.index),r=e.dataset.side??"bag";if(n==="assign"){if(t.shiftKey&&(this.inventoryState?.mode==="explore"||this.inventoryState?.chest)){const a=this.inventoryState.chest!==void 0;this.send(a?"transfer":"split",{side:r,index:s,half:!1})}else this.send(n,{id:Number(e.dataset.id),slot:this.inventoryState?.selected??0});return}if(["split","sort","transfer","transfer-all"].includes(n)){this.send(n,{index:s,side:r,half:e.dataset.half==="yes"});return}if(n==="supply"){this.send(n,{id:Number(e.dataset.id),count:t.shiftKey?64:1});return}if(n==="craft"){this.send(n,{id:e.dataset.id,count:Number(e.dataset.count??1)});return}if(["load","export","original","preset"].includes(n)){this.send(n,e.dataset.id);return}if(n==="dismiss-guide"){Gt("guide").hidden=!0,this.guideSeen=!0,this.send(n);return}this.send(n)}submit(t){t.preventDefault();const e=t.target;if(e.id==="online-create-form"||e.id==="online-join-form"){const o=new FormData(e),c=String(o.get("nickname")??"").trim();if(this.onlineDraft.nickname=c,!c){this.toast("プレイヤー名を入力してください。"),e.querySelector("input")?.focus();return}if(e.id==="online-create-form"){const l=String(o.get("name")??"").trim(),h=String(o.get("seed")??"").trim(),d=o.get("mode")==="explore"?"explore":"creative";if(Object.assign(this.onlineDraft,{name:l,seed:h,mode:d}),!l){this.toast("ワールド名を入力してください。"),e.querySelector('[name="name"]')?.focus();return}this.send("online-create",{name:l,seed:h,nickname:c,mode:d})}else{const l=String(o.get("code")??"").trim().toUpperCase();this.onlineDraft.code=l,this.send("online-join",{code:l,nickname:c})}return}if(e.id!=="world-form")return;const n=new FormData(e),s=String(n.get("name")??"").trim();if(!s){this.toast("ワールド名を入力してください。"),e.querySelector("input")?.focus();return}const r=n.get("stage"),a=Cl(r)?r:"classic";this.send("start",{name:s,seed:String(n.get("seed")??"").trim(),mode:a!=="classic"||n.get("mode")==="creative"?"creative":"explore",stage:a})}change(t){const e=t.target;if(e.name==="stage"&&e.form?.id==="world-form"&&e.checked){const n=e.form,s=e.value!=="classic",r=n.querySelector('[name="mode"][value="explore"]'),a=n.querySelector('[name="mode"][value="creative"]');s&&r.checked&&(a.checked=!0),r.disabled=s,n.querySelector("#stage-mode-hint").hidden=!s;return}if(e.id==="world-import"){const n=e.files?.[0];n&&this.send("import",n),e.value="";return}if(e.closest("#setting-form")){const n=new FormData(Gt("setting-form"));this.send("settings-change",{distance:Number(n.get("distance")),scale:Number(n.get("scale")),shadows:n.has("shadows"),sensitivity:Number(n.get("sensitivity")),volume:Number(n.get("volume")),muted:n.has("muted"),quality:n.get("quality"),vegetation:n.has("vegetation"),effects:n.has("effects"),invertY:n.has("invertY"),bob:n.has("bob"),sprintFov:n.has("sprintFov"),ambientVolume:Number(n.get("ambientVolume")),effectsVolume:Number(n.get("effectsVolume"))})}}settingOutput(t){if(!(t instanceof HTMLInputElement)||t.type!=="range")return;const e=t.parentElement?.querySelector("output");e&&(e.textContent=this.valueLabel(t.name,Number(t.value)))}valueLabel(t,e){return t==="distance"?e+" チャンク":t==="sensitivity"?e.toFixed(1)+" 倍":Math.round(e*100)+"%"}setWorld(t){this.worldName=t}title(t){this.worldName="",this.onlineSession(null);const e='<a class="portal" href="'+ye(this.portal)+'"><span aria-hidden="true">‹</span> TK777 ARCADE</a>';this.show("title",'<div class="title-stage">'+e+'<div class="title-main"><h1 aria-label="ウェブクラフト777"><span>ウェブクラフト</span><strong>777</strong></h1><div class="start-actions">'+be("goto-create",'<span>新しく始める</span><b aria-hidden="true">＋</b>',"primary")+be("goto-worlds",'<span>つづきから</span><b aria-hidden="true">›</b>')+be("online-menu","<span>マルチプレイ</span><small>最大6人</small>")+'</div><div class="title-sub">'+be("goto-settings","設定")+be("goto-help","操作説明")+"</div></div></div>"),this.panel.querySelector('[data-action="goto-worlds"]')?.setAttribute("title",t?"保存したワールドを開く":"ワールド一覧とバックアップの読み込み")}create(){const t=Qc.map(({id:e,name:n,detail:s,thumbnail:r})=>'<label class="stage-card"><input type="radio" name="stage" value="'+e+'"'+(e==="classic"?" checked":"")+'><img src="'+ye(new URL(r,document.baseURI).href)+'" width="560" height="315" alt="" draggable="false"><span><b>'+n+"</b><small>"+s+"</small></span></label>").join("");this.show("create",Di("ワールドを作る")+'<form id="world-form"><fieldset class="stage-picker"><legend>ステージ</legend><div class="stage-grid">'+t+'</div></fieldset><div class="stage-fields"><label class="entry">ワールド名<input name="name" value="はじまりの谷" required maxlength="64" autocomplete="off"></label><label class="entry">地形のシード<input name="seed" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label></div><fieldset><legend>ゲームモード</legend><div class="modes"><label><input type="radio" name="mode" value="explore" checked aria-describedby="stage-mode-hint"><span><b>探索</b><small>木や石を集め、道具と建材を作る。</small></span></label><label><input type="radio" name="mode" value="creative"><span><b>クリエイティブ</b><small>素材は無制限。空を飛んで建築する。</small></span></label></div><p id="stage-mode-hint" hidden>このステージではクリエイティブで遊べます。</p></fieldset><button type="submit" class="primary full">ワールドを作成</button></form>',!0)}onlineMenu(t="",e=""){t&&(this.onlineDraft.code=t.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8));const n=this.onlineDraft,s='<label class="entry">プレイヤー名<input name="nickname" value="'+ye(n.nickname)+'" placeholder="ワールド内に表示される名前" maxlength="24" required autocomplete="nickname"></label>',r=[["creative","建材を自由に使って建築する。"],["explore","素材を集めて道具や建材を作る。"]].map(([c,l])=>'<label><input type="radio" name="mode" value="'+c+'"'+(n.mode===c?" checked":"")+"><span><b>"+Yo(c)+"</b><small>"+l+"</small></span></label>").join(""),a='<form id="online-create-form" class="online-card" aria-labelledby="online-create-label"><h2 id="online-create-label">ルームを作る</h2>'+s+'<label class="entry">ワールド名<input name="name" value="'+ye(n.name)+'" required maxlength="64" autocomplete="off"></label><label class="entry"><span>地形のシード <small>任意</small></span><input name="seed" value="'+ye(n.seed)+'" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label><fieldset class="online-room-modes"><legend>ゲームモード</legend><div class="modes">'+r+'</div></fieldset><button type="submit" class="primary full">ルームを作成</button></form>',o='<form id="online-join-form" class="online-card" aria-labelledby="online-join-label"><h2 id="online-join-label">ルームに参加する</h2>'+s+'<label class="entry">ルームコード<input id="online-code" name="code" value="'+ye(n.code)+'" placeholder="8文字の英数字" minlength="8" maxlength="8" pattern="[A-Za-z0-9]{8}" title="8文字の英数字" required autocapitalize="characters" autocorrect="off" autocomplete="off" spellcheck="false"></label><button type="submit" class="full">ルームに参加</button></form>';this.show("online",Di("マルチプレイ")+'<p class="online-description">最大6人が同じワールドで遊べます。探索では持ち物を各自で管理し、掘った場所や設置した作業台は仲間と共有されます。</p>'+(e?'<p class="online-error" role="alert">'+ye(e)+"</p>":"")+'<div class="online-forms">'+(t?o+a:a+o)+"</div>",!0)}onlineSession(t){this.room=t;const e=Gt("online-hud"),n=t?t.state==="connecting"?"接続中":t.state==="reconnecting"?"再接続中":t.count+" / 6人":"";e.hidden=!t,Gt("game").toggleAttribute("data-online",!!t);const s=Gt("online-hud-code");s.textContent!==(t?.code??"")&&(s.textContent=t?.code??"");const r=Gt("online-hud-status");r.textContent!==n&&(r.textContent=n);const a=this.panel.querySelector("[data-online-status]");a&&a.textContent!==n&&(a.textContent=n)}worlds(t){const e=t.map(n=>{const s=new Date(n.updatedAt),r=Number.isFinite(s.getTime())?s.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",a=ye(n.id),o=Qc.find(l=>l.id===(n.stage??"classic"))?.name,c=n.hasOriginal?'<button data-action="original" data-id="'+a+'">旧版の原本</button>':"";return"<li><div><strong>"+ye(n.name)+"</strong><small>"+[Yo(n.mode),o,r].filter(Boolean).join("　")+'</small></div><div class="row-actions"><button class="primary" data-action="load" data-id="'+a+'">開く</button><button data-action="export" data-id="'+a+'">書き出す</button>'+c+"</div></li>"}).join("");this.show("worlds",Di("ワールド一覧")+(t.length?'<ul class="worlds">'+e+"</ul>":'<p class="empty">このブラウザーには保存したワールドがありません。</p>')+'<div class="actions">'+be("goto-create","新しく始める")+'<label class="file-btn">ファイルを読み込む<input id="world-import" type="file" accept=".json,application/json"></label></div>')}async confirmImport(t){const e=Gt("confirm-import");return Gt("confirm-body").textContent="保存済みの「"+t+"」を、読み込むファイルの状態で置き換えます。",e.returnValue="cancel",new Promise(n=>{e.addEventListener("close",()=>n(e.returnValue==="replace"),{once:!0}),e.showModal()})}loading(t){this.show("loading",'<div class="loading-mark" aria-hidden="true"></div><h1>読み込み中</h1><p role="status">'+ye(t)+"</p>")}error(t){this.show("error",Di("ゲームを開始できません")+'<p class="error-message">'+ye(t)+"</p>"+be("title","タイトルへ戻る","primary"))}pause(t=!1,e="lock",n=""){const s=this.room,r=Object.entries(ru).filter(([a])=>a!==e).map(([a,{label:o}])=>be("resume-"+a,o)).join("");this.show(t?"ready":"pause","<h1>"+(t?"ワールドの準備ができました":"一時停止")+"</h1>"+(n?'<p class="input-message" role="status">'+ye(n)+"</p>":"")+(s?'<div class="room-actions"><p>ルーム <strong>'+ye(s.code)+'</strong> <span data-online-status role="status"></span></p>'+be("online-copy","招待リンクをコピー")+"</div>":"")+'<div class="pause-actions">'+be("resume",t?"プレイ開始":"再開","primary")+'<p class="control-mode">操作方法　<strong>'+ru[e].name+"</strong></p>"+r+'<button type="button" data-action="view-mode" aria-label="オリジナルモードとキッズモードの切り替え" aria-pressed="false"></button>'+(t?"":(s?"":be("save","手動保存")+be("export","ファイルへ書き出す"))+be("goto-settings","設定")+be("goto-help","操作説明")+be("diagnostics","入力の診断・復旧"))+(s?be("online-leave","退出してタイトルへ","danger"):be("title","タイトルへ戻る"))+"</div>"),this.showViewMode(this.kidsView),s&&this.onlineSession(s)}diagnostics(t,e){this.show("diagnostics",Di("入力の診断・復旧")+'<p class="input-message">'+ye(t)+'</p><div class="pause-actions">'+be("reset-input","入力をリセット","primary")+be("export-diagnostics","診断をファイルに書き出す")+'</div><details class="input-trace"><summary>直近の入力記録</summary><pre>'+ye(e)+"</pre></details>")}play(t,e=!1,n=!1,s=!1){this.stopMining(),window.clearTimeout(this.guideTimer),this.screen="play",Gt("game").dataset.screen="play",Gt("game").dataset.playInput=n?"pending":t?"drag":"lock",Gt("game").classList.remove("home"),this.panel.hidden=!0,this.panel.replaceChildren(),Gt("hud").hidden=!1,Gt("fallback").hidden=!t;const r=Gt("guide");e&&(this.guideSeen=!1),r.hidden=!(e||t&&!this.guideSeen),r.innerHTML="<div><b>"+(s?"タッチ操作":t?"ドラッグ操作":"はじめの操作")+"</b>"+be("dismiss-guide","閉じる","guide-close")+"</div>"+(s?"<p>左下のスティックで移動し、景色をドラッグして見回します。</p><p>照準を合わせて画面をタップすると設置。「採掘」は長押しします。</p>":"<p><kbd>WASD</kbd> 移動　<kbd>Space</kbd> ジャンプ　<kbd>E</kbd> 持ち物</p><p>"+(t?"画面をドラッグして見回します。「採掘」は長押し、「設置」はクリック。":"左クリック長押しで採掘、右クリックで設置。")+"</p>"+(t?'<a href="'+ye(location.href)+'" target="_blank" rel="noopener">独立したタブで開く ↗</a>':"")),!t&&e&&(this.guideTimer=window.setTimeout(()=>{this.screen==="play"&&!r.hidden&&(r.hidden=!0,this.guideSeen=!0,this.send("dismiss-guide"))},1e4))}help(){this.show("help",Di("操作説明")+'<dl class="keylist">'+[["W / A / S / D","移動"],["マウス / 矢印キー","視点を変える"],["K / 画面上のモードボタン","オリジナルモードと見下ろし視点のキッズモードを切り替える"],["Space / Shift","ジャンプ・水中で浮上 ／ ダッシュ"],["左クリック長押し","照準のブロックを採掘"],["右クリック","手に持っているブロックを設置"],["1 ～ 9 / ホイール","ホットバーを切り替える"],["C 長押し","しゃがむ。足場の端で踏みとどまり、低い坑道を通れる"],["Q / 中クリック","照準の建材を選ぶ"],["R / 向きボタン","原木や滑り台パーツの向きを切り替える"],["右クリック / V","住民と話す、または作業台・チェストを開く。しゃがんで右クリックすると設備の隣に設置"],["左クリック / X","照準を合わせたサメを攻撃。タッチ操作では画面の「攻撃」ボタン"],["Ctrl + Z","クリエイティブの通常ブロックを最大20回戻す。作業台とチェストは対象外"],["B / G","現在地を拠点に登録 ／ 探索目標の表示切り替え"],["E","持ち物・クラフトを開閉"],["Esc","一時停止"],["F","クリエイティブで飛行を切り替える"],["Space / Ctrl","飛行中に上昇 ／ 下降"],["F3","FPS・描画回数・チャンク数を表示"]].map(([t,e])=>"<div><dt>"+t+"</dt><dd>"+e+"</dd></div>").join("")+"</dl><h2>タブレットモード</h2><p>一時停止画面の「タブレットモードでプレイ」から、PCでも画面のスティックやボタンを使えます。左下のスティックで移動し、景色をドラッグして見回します。照準を合わせて画面を短くタップすると、選択中のブロックを設置できます。右下のボタンからも設置・採掘・ジャンプ・しゃがみができます。クリエイティブでは「飛行」で切り替え、上昇・下降ボタンを長押しします。</p><h2>ジャンプ台と滑り台</h2><p>ジャンプ台に乗ると、小・中・大の高さに合わせて跳び上がります。滑り台は、下りたい方向に坂のパーツを1ブロックずつ低くしてつなぎ、高い方から乗ります。</p><h2>探索のはじめ方</h2><p>木の幹に近づいて採掘し、持ち物を開いて原木から木材と棒を作ります。木のツルハシで石を掘り、石の道具や建材を作りましょう。持ち物のアイコンを選ぶと、選択中のホットバー枠に登録できます。</p><h2>マルチプレイ</h2><p>ルームを作るときにクリエイティブか探索を選び、ルームコードを仲間に知らせます。探索では持ち物はプレイヤーごとに管理され、掘った場所や建物、設置した作業台は仲間と共有されます。</p><h2>拠点と遠征</h2><p>木材4個で作業台、6個でチェストを作れます。床に置き、照準を合わせて右クリックで開きます。木の道具と灯晶ブロックを用意したら、拠点をBで登録して岩窟へ。潮晶を持ち帰ると、作業台で青緑色のランタンや象眼タイルを作れます。旧ワールドでは朝霧ガラスと石炭から潮晶を作れます。</p><h2>トラックパッドと視点操作</h2><p>Macでは、トラックパッドを押したまま指を動かすと見回せます。画面上の「採掘」「設置」を使います。クリックせずに見回したいときは、一時停止から「視点を固定してプレイ」を選んでください。</p><p>視点が動かなくなったら、Esc または「一時停止」から「入力の診断・復旧」を開きます。「入力をリセット」でドラッグ操作に戻れます。診断記録は端末に保存・書き出しできます。</p><h2>保存とバックアップ</h2><p>進行はこのブラウザーに自動保存されます。一時停止から手動保存もできます。ブラウザーのデータ削除前や別のPCに移すときは、タイトルの「つづきから」でワールドを「書き出す」を選びます。復元は同じ一覧の「ファイルを読み込む」から行えます。</p>")}showViewMode(t){this.kidsView=t;const e=t?"キッズモード":"オリジナルモード",n=Gt("view-mode");n.setAttribute("aria-pressed",String(t)),n.querySelector("span").textContent=e;const s=this.panel.querySelector('[data-action="view-mode"]');s&&(s.setAttribute("aria-pressed",String(t)),s.textContent="視点切替　現在は"+e)}expedition(t,e,n){const s=Gt("journey"),r=Gt("bearing");s.hidden=!t,s.textContent!==t&&(s.textContent=t);const a=[e,n].filter(Boolean).join("　·　");r.textContent!==a&&(r.textContent=a)}target(t){const e=Gt("target-hint");e.textContent!==t&&(e.textContent=t),e.hidden=!t||this.screen!=="play"}settings(t){const e=(s,r,a,o,c,l)=>'<label class="range"><span>'+r+"</span><output>"+this.valueLabel(s,a)+'</output><input type="range" name="'+s+'" min="'+o+'" max="'+c+'" step="'+l+'" value="'+a+'"></label>',n=(s,r,a)=>'<label class="check"><input type="checkbox" name="'+s+'" '+(a?"checked":"")+">"+r+"</label>";this.show("settings",Di("設定")+'<form id="setting-form"><fieldset><legend>画面</legend><input type="hidden" name="quality" value="'+t.quality+'"><div class="quality-presets">'+Object.entries({low:"低",standard:"標準",high:"高"}).map(([s,r])=>'<button type="button" data-action="preset" data-id="'+s+'" aria-pressed="'+(t.quality===s)+'">'+r+"</button>").join("")+"</div>"+(t.quality==="legacy"?"<p>旧版の描画倍率を使用中です。プリセットを選ぶと新しい画質に切り替わります。</p>":"")+e("distance","描画距離",t.distance,2,6,1)+e("scale","解像度倍率",t.scale,.5,1.5,.05)+n("shadows","影を表示する",t.shadows)+"</fieldset><fieldset><legend>景色と動き</legend>"+n("vegetation","草花を表示する",t.vegetation)+n("effects","水面・葉の追加演出",t.effects)+n("bob","歩行時に視点を揺らす",t.bob)+n("sprintFov","ダッシュ時に視野を広げる",t.sprintFov)+"</fieldset><fieldset><legend>操作と音</legend>"+n("invertY","マウスの上下を反転する",t.invertY)+e("effectsVolume","効果音",t.effectsVolume,0,1,.05)+e("ambientVolume","環境音",t.ambientVolume,0,1,.05)+e("sensitivity","マウス感度",t.sensitivity,.3,2.5,.1)+e("volume","主音量",t.volume,0,1,.05)+n("muted","ミュート",t.muted)+"</fieldset></form>")}slots(t){return t.bar.map((e,n)=>'<button class="slot'+(t.selected===n?" selected":"")+'" data-action="select" data-slot="'+n+'" aria-pressed="'+(t.selected===n)+'" aria-label="'+(n+1)+"番 "+ye(e?.name??"空き")+'"><small>'+(n+1)+"</small>"+(e?tr(e.id)+"<em>"+jo(e.count)+"</em>"+this.wear(e):"")+"</button>").join("")}wear(t){return t.durability!==void 0&&t.maxDurability?'<i class="wear" title="耐久 '+t.durability+" / "+t.maxDurability+'"><b style="width:'+Math.min(100,100*t.durability/t.maxDurability)+'%"></b></i>':""}hud(t){this.inventoryState=t;const e=t.bar[t.selected];Gt("hud-bar").innerHTML=this.slots(t),Gt("mode-tag").textContent=(this.worldName?this.worldName+"　／　":"")+Yo(t.mode),Gt("equipped").textContent=e?e.name+"　"+jo(e.count)+(e.durability!==void 0?"　耐久 "+e.durability+"/"+e.maxDurability:""):"素手"}inventory(t){const e=this.screen==="inventory",s=(e?this.panel.querySelector(".panel"):null)?.scrollTop??0,r=document.activeElement,a=e&&r?.dataset.action?Object.entries(r.dataset):null,o=!!this.panel.querySelector("details[open]");this.inventoryState=t;const c=m=>'<div class="storage-tools"><button data-action="sort" data-side="'+m+'">整理</button>'+(t.chest?'<button data-action="transfer-all" data-side="'+m+'">'+(m==="bag"?"すべて預ける":"すべて取り出す")+"</button>":"")+"</div>",l=(m,p)=>{const M=' data-index="'+m+'" data-side="'+p+'"';return'<div class="stack-actions">'+(t.chest?'<button data-action="transfer"'+M+">"+(p==="bag"?"預ける":"取る")+'</button><button data-action="transfer" data-half="yes"'+M+">半分</button>":'<button data-action="split"'+M+">分割</button>")+"</div>"},h=t.chest?"チェスト":t.benchUses!==void 0?"作業台":t.mode==="creative"?"ブロック一覧":"持ち物とクラフト",d=t.chest?"<section><h2>チェスト　"+t.chest.length+" / 27 枠</h2>"+c("chest")+(t.chest.length?'<div class="bag-grid">'+t.chest.map((m,p)=>'<div class="stack"><span>'+tr(m.id)+" "+ye(Qt[m.id].name)+" ×"+m.count+(m.durability?"　耐久 "+m.durability:"")+"</span>"+l(p,"chest")+"</div>").join("")+"</div>":'<p class="empty">まだ空です。所持品から預けられます。</p>')+"</section>":"",u=t.palette?'<details class="supply" '+(o?"open":"")+'><summary>建材を補充</summary><p>クリックで1個、Shift＋クリックで64個を所持品に加えます。</p><div class="bag-grid">'+t.palette.map(m=>'<button class="bag-item" data-action="supply" data-id="'+m.id+'">'+tr(m.id)+ye(m.name)+"</button>").join("")+"</div></details>":"",f=t.items.map((m,p)=>'<div class="stack"><button class="bag-item" type="button" data-index="'+p+'" data-action="assign" data-id="'+m.id+'">'+tr(m.id)+"<b>"+ye(m.name)+"</b><small>"+(m.durability!==void 0?"耐久 "+m.durability+"/"+m.maxDurability:"× "+jo(m.count))+"</small>"+(ou[m.id]?"<small>"+ou[m.id]+"</small>":"")+this.wear(m)+"</button>"+(t.mode==="explore"||t.chest?l(p,"bag"):"")+"</div>").join(""),g=t.recipes.map(m=>"<li>"+tr(m.itemId)+"<div><strong>"+ye(m.outputs)+"</strong><small>"+ye(m.ingredients)+"</small><small>"+m.equipment+"　"+(m.reason||(m.craftable?"制作可能 "+m.craftable+" 回":"所持品に空きがありません。"))+'</small></div><div class="craft-actions"><button data-action="craft" data-id="'+m.id+'" '+(m.craftable<1?"disabled":"")+">作る</button>"+(m.craftable>1?'<button data-action="craft" data-id="'+m.id+'" data-count="'+m.craftable+'">まとめて ×'+m.craftable+"</button>":"")+"</div></li>").join("");this.show("inventory",'<header class="panel-head"><h1>'+h+"</h1>"+be("back","閉じる <kbd>E</kbd>","back")+'</header><div class="inventory-bar"><h2>ホットバー</h2><div class="hotbar">'+this.slots(t)+"</div><p>数字1〜9かクリックで枠を選び、アイコンを押すと登録。"+(t.mode==="explore"?" Shift＋クリックで"+(t.chest?"移動":"分割")+"。":"")+(t.benchUses!==void 0?"　この作業台で制作 "+t.benchUses+" 回":"")+"</p></div>"+u+'<div class="inventory-columns'+(t.mode==="creative"&&!t.chest?" palette":"")+'"><section><h2>'+(t.mode==="creative"&&!t.chest?"建築ブロック":"所持品")+"</h2>"+(t.mode==="explore"||t.chest?c("bag"):"")+(f?'<div class="bag-grid">'+f+"</div>":'<p class="empty">'+(t.palette?"「建材を補充」を開くと、ここに素材を用意できます。":"まだ何も持っていません。木や土を採掘して集めましょう。")+"</p>")+"</section>"+(d||(t.mode==="creative"?"":'<section><h2>クラフト</h2><p class="ingredient-key">材料は所持数 / 必要数で表示します。</p><ul class="recipes">'+g+"</ul></section>"))+"</div>",!0);const _=this.panel.querySelector(".panel");_&&(_.scrollTop=s),a&&Array.from(this.panel.querySelectorAll("[data-action]")).find(m=>a.every(([p,M])=>m.dataset[p]===M))?.focus({preventScroll:!0})}mining(t){const e=Gt("mine-meter"),n=Math.round(Math.max(0,Math.min(1,Number.isFinite(t)?t:0))*100);e.hidden=n===0||this.screen!=="play",e.dataset.percent!==String(n)&&(e.dataset.percent=String(n),e.setAttribute("aria-valuenow",String(n)),e.style.setProperty("--progress",n+"%"))}debug(t){const e=Gt("debug");e.hidden=!t||this.screen!=="play",e.textContent!==t&&(e.textContent=t)}toast(t){const e=Gt("notice");e.textContent=t,e.hidden=!t,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{e.hidden=!0},2e3)}status(t){const e=Gt("save-status");e.textContent=t,e.hidden=!t,window.clearTimeout(this.saveTimer),!t.includes("中")&&!/失敗|できません/.test(t)&&(this.saveTimer=window.setTimeout(()=>{e.hidden=!0},3500))}}const Ko=192;class Nx{samples=[];cursor=0;nextLook=0;nextFrame=0;nextIssue=0;frames=0;moves=0;faults=0;lastIssue="";detailed=!1;enable(t){this.detailed=t}add(t,e,n,s={},r=!1){const a=performance.now();if(r&&(this.faults++,this.lastIssue=String(s.reason??e),e==="look-limited"||e==="discontinuity")){if(a<this.nextIssue)return;this.nextIssue=a+65}if(e==="look"){if(this.moves++,a<this.nextLook)return;this.nextLook=a+(this.detailed?12:65)}if(e==="frame"){if(this.frames++,a<this.nextFrame)return;this.nextFrame=a+(this.detailed?100:500)}this.samples[this.cursor]={timeMs:Math.round(a),mode:t,event:e,lock:n,...s},this.cursor=(this.cursor+1)%Ko}report(){const t=this.samples.length<Ko?this.samples.slice():[...this.samples.slice(this.cursor),...this.samples.slice(0,this.cursor)];return{game:"ウェブクラフト777",generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,viewport:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio||1,embedded:window.self!==window.top,capacity:Ko,frames:this.frames,lookEvents:this.moves,anomalies:this.faults,lastIssue:this.lastIssue,events:t}}}const $o=Math.PI*2;function Zo(i){const t=i%$o;return t>Math.PI?t-$o:t<-Math.PI?t+$o:t}function Jo(i){return Math.max(-1.55,Math.min(1.55,i))}function cu(i,t,e){return i==="lock"||i==="drag"||i==="tablet"?i:t==="lock"?"lock":t==="drag"?e.touch?"tablet":"drag":e.coarse?"tablet":e.mac?"drag":"lock"}const Fx=new Set(["KeyW","KeyA","KeyS","KeyD","KeyC","Space","ShiftLeft","ShiftRight","ControlLeft","ControlRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),lu=2*Math.PI/3,hu=9,kx=360,uu=()=>Math.max(1024,window.screen?.width||0,window.screen?.height||0,window.innerWidth||0,window.innerHeight||0);class Ox{constructor(t,e,n){if(this.canvas=t,this.controls=e,document.addEventListener("pointerlockchange",()=>this.reconcileLock()),document.addEventListener("pointerlockerror",()=>{this.hasRequestPromise||this.fallback("pointerlockerror")}),document.addEventListener("mousemove",s=>{if(this.mode==="locked"){if(!this.ownsLock()){this.reconcileLock();return}this.checkButtons(s),this.look(s.movementX,s.movementY)}}),t.addEventListener("contextmenu",s=>{this.active&&s.preventDefault()}),t.addEventListener("auxclick",s=>{this.active&&s.button===1&&s.preventDefault()}),t.addEventListener("pointerdown",s=>this.startView(s)),t.addEventListener("pointermove",s=>this.movePointer(s)),t.addEventListener("lostpointercapture",s=>this.release(s)),document.addEventListener("pointerdown",s=>{const r=s.target?.closest?.('[data-hold="mine"]');!this.drag||!r||r.disabled||s.button!==0||(s.pointerType!=="mouse"&&s.preventDefault(),this.grab(s,r,"mine")&&(this.mining=!0,this.controls.beginMine()))}),document.addEventListener("pointermove",s=>{s.target!==t&&this.movePointer(s)}),document.addEventListener("lostpointercapture",s=>this.release(s)),window.addEventListener("pointerup",s=>this.release(s)),window.addEventListener("pointercancel",s=>this.release(s)),window.addEventListener("mouseup",s=>{s.button===0&&this.dropMouseContact()}),t.addEventListener("wheel",s=>this.wheel(s),{passive:!1}),window.addEventListener("keydown",s=>this.keydown(s)),window.addEventListener("keyup",s=>this.keys.delete(s.code)),window.addEventListener("blur",()=>this.interrupt("blur")),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.interrupt("hidden"),this.controls.background())}),n){this.bindTouch(n.stick,"stick"),this.bindTouch(n.jump,"jump"),this.bindTouch(n.down,"down");const s=()=>{this.drag&&this.reset()};window.addEventListener("orientationchange",s),window.screen?.orientation?.addEventListener?.("change",s)}}canvas;controls;keys=new Set;mining=!1;mode="idle";get pending(){return this.mode==="pending"}get active(){return this.pending||this.mode==="locked"||this.mode==="drag"}get drag(){return this.mode==="drag"}contacts=new Map;stickForward=0;stickRight=0;ticket=0;hasRequestPromise=!1;jumpEdge=!1;touchJumpEdge=!1;wheelSum=0;lastWheel=-1/0;nextWheel=-1/0;yaw=0;pitch=0;sensitivity=1;trace=new Nx;ownsLock(){return document.pointerLockElement===this.canvas}record(t,e={},n=!1){this.trace.add(this.mode,t,this.ownsLock(),e,n)}setDiagnostics(t){this.trace.enable(t)}report(){return{...this.trace.report(),mode:this.mode,pointerLock:this.ownsLock(),sensitivity:this.sensitivity,yaw:this.yaw,pitch:this.pitch}}rememberView(t){Number.isFinite(t.yaw)&&Number.isFinite(t.pitch)&&(this.yaw=Zo(t.yaw),this.pitch=Jo(t.pitch)),t.yaw=this.yaw,t.pitch=this.pitch}restoreAngles(t){t.yaw=this.yaw,t.pitch=this.pitch}applyLook(t,e,n,s,r=!1){if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(s)||s<=0||!Number.isFinite(e)||!Number.isFinite(n)){this.restoreAngles(t),this.fail("視点または感度に無効な数値が届きました。");return}this.sensitivity=s;let a=.00235*s;const o=Math.hypot(e,n),c=o*a;this.mode==="locked"&&c>lu&&o>uu()&&(a*=lu/c,this.record("look-limited",{dx:e,dy:n,reason:"単発の大きな視点移動を抑えました。"},!0));const l=Zo(t.yaw-e*a),h=Jo(t.pitch+(r?1:-1)*n*a);if(!Number.isFinite(l)||!Number.isFinite(h)){this.restoreAngles(t),this.fail("視点の計算を復旧しました。");return}t.yaw=this.yaw=l,t.pitch=this.pitch=h}frame(t,e){if(this.mode==="locked"&&!this.ownsLock())return this.reconcileLock(),!1;if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(e))return this.restoreAngles(t),this.fail("前回の正常な視点に戻しました。"),!1;if(!this.active)return!1;const n=Math.min(.1,Math.max(0,e));return t.yaw=this.yaw=Zo(t.yaw+(Number(this.keys.has("ArrowLeft"))-Number(this.keys.has("ArrowRight")))*n*1.65),t.pitch=this.pitch=Jo(t.pitch+(Number(this.keys.has("ArrowUp"))-Number(this.keys.has("ArrowDown")))*n*1.3),this.record("frame",{yaw:this.yaw,pitch:this.pitch,frameMs:Math.round(e*1e4)/10}),!0}fail(t){const e=typeof t=="string"?t:"ゲーム処理を中断しました。";this.record("recovery",{reason:e},!0),this.active&&this.controls.pause(),this.active&&this.stop(),this.controls.recovery?.("操作を中断しました。「再開」でドラッグ操作に切り替わります。")}look(t,e){if(!Number.isFinite(t)||!Number.isFinite(e)){this.fail("ブラウザーから無効な視点移動量が届きました。");return}if(!t&&!e)return;const n=uu();if(Math.abs(t)>n*16||Math.abs(e)>n*16){this.record("discontinuity",{reason:"単一イベントの不連続な移動量を除外しました。"},!0);return}this.controls.look(t,e),this.record("look",{dx:t,dy:e,yaw:this.yaw,pitch:this.pitch})}change(t){this.reset(),this.mode=t,this.record("mode")}interrupt(t){this.record(t),this.active&&this.controls.pause(),this.active?this.stop():this.reset()}reconcileLock(){if(this.ownsLock()){if(this.mode==="locked")return;if(!this.pending){document.exitPointerLock();return}this.change("locked"),this.controls.dragChanged(!1)}else this.mode==="locked"&&(this.interrupt("lock-lost"),this.controls.recovery?.("マウス固定が解除されました。「再開」でドラッグ操作に切り替わります。"))}fallback(t){if(this.pending){if(this.ownsLock()){this.reconcileLock();return}this.change("drag"),this.record("fallback",{reason:t}),this.controls.dragChanged(!0)}}start(t){if(!t&&(this.pending||this.mode==="locked"&&this.ownsLock()))return;this.stop();const e=++this.ticket;if(this.hasRequestPromise=!1,this.change(t?"drag":"pending"),this.canvas.focus({preventScroll:!0}),t){this.controls.dragChanged(!0);return}if(!this.canvas.requestPointerLock){this.fallback("unsupported");return}try{const n=this.canvas.requestPointerLock();n&&typeof n.then=="function"&&(this.hasRequestPromise=!0,n.then(()=>{e===this.ticket&&this.ownsLock()&&this.reconcileLock()},()=>{e===this.ticket&&this.fallback("rejected")}))}catch{this.fallback("sync-error")}window.setTimeout(()=>{e===this.ticket&&this.fallback("timeout")},750)}stop(){this.ticket++,this.change("paused"),this.ownsLock()&&document.exitPointerLock()}reset(){this.keys.clear();for(const t of this.contacts.values())this.dropContact(t);this.mining=!1,this.jumpEdge=!1,this.touchJumpEdge=!1,this.wheelSum=0,this.nextWheel=this.lastWheel=-1/0}cancelPlacementTap(){const t=this.findRole("look");t&&(t.tapStartedAt=void 0)}startView(t){if(!this.active||this.pending)return;if(this.mode==="locked"&&!this.ownsLock()){this.reconcileLock();return}if(t.pointerType!=="mouse"&&t.preventDefault(),t.button===2){this.controls.place();return}if(t.button===1){this.controls.pick?.();return}if(t.button!==0)return;if(this.mode==="locked"){if(!this.grab(t,this.canvas,"mine",!1))return;this.mining=!0,this.controls.beginMine();return}const e=this.grab(t,this.canvas,"look");e&&t.pointerType==="touch"&&(e.tapStartedAt=t.timeStamp)}findRole(t){for(const e of this.contacts.values())if(e.role===t)return e}grab(t,e,n,s=!0){if(this.contacts.has(t.pointerId)||this.findRole(n))return;const r={id:t.pointerId,element:e,role:n,pointerType:t.pointerType||"mouse",x:t.clientX,y:t.clientY};this.contacts.set(t.pointerId,r);try{s&&e.setPointerCapture?.(t.pointerId)}catch{this.contacts.delete(t.pointerId);return}return r}bindTouch(t,e){t.addEventListener("contextmenu",n=>n.preventDefault()),e==="jump"&&t.addEventListener("click",n=>{this.drag&&n.detail===0&&(this.touchJumpEdge=!0)}),t.addEventListener("pointerdown",n=>{!this.drag||n.button!==0||!this.grab(n,t,e)||(n.preventDefault(),t.dataset.held="",e==="stick"&&this.updateStick(t,n.clientX,n.clientY),e==="jump"&&(this.touchJumpEdge=!0))})}updateStick(t,e,n){const s=t.getBoundingClientRect(),r=Math.min(s.width,s.height)*.29,a=e-(s.left+s.width/2),o=n-(s.top+s.height/2),c=Math.hypot(a,o);if(!(r>0)||!Number.isFinite(c))return;const l=Math.min(1,r/(c||1));t.style.setProperty("--stick-x",a*l+"px"),t.style.setProperty("--stick-y",o*l+"px");const h=Math.max(0,(Math.min(1,c/r)-.16)/.84)/(c||1);this.stickForward=-o*h||0,this.stickRight=a*h||0}dropMouseContact(){for(const t of this.contacts.values())t.pointerType==="mouse"&&this.dropContact(t)}checkButtons(t){Number.isInteger(t.buttons)&&!(t.buttons&1)&&this.dropMouseContact()}movePointer(t){const e=this.contacts.get(t.pointerId);if(!this.drag||!e)return;if(e.pointerType==="mouse"&&Number.isInteger(t.buttons)&&!(t.buttons&1)){this.dropContact(e);return}if(e.role==="stick"){this.updateStick(e.element,t.clientX,t.clientY);return}if(e.role!=="look")return;const n=t.clientX-e.x,s=t.clientY-e.y;if(e.tapStartedAt!==void 0){if(Math.hypot(n,s)<=hu)return;e.tapStartedAt=void 0}e.x=t.clientX,e.y=t.clientY,this.look(n,s)}dropContact(t){this.contacts.delete(t.id),t.role==="mine"&&(this.mining=!1),t.role==="stick"&&(this.stickForward=this.stickRight=0,t.element.style.removeProperty("--stick-x"),t.element.style.removeProperty("--stick-y")),(t.role==="stick"||t.role==="jump"||t.role==="down")&&delete t.element.dataset.held;try{t.element.hasPointerCapture?.(t.id)&&t.element.releasePointerCapture(t.id)}catch{}}release(t){const e=this.contacts.get(t.pointerId);if(!e||t.type==="lostpointercapture"&&t.target!==e.element&&e.element.isConnected!==!1||t.type==="pointerup"&&e.pointerType==="mouse"&&(Number.isInteger(t.buttons)?t.buttons&1:t.button>0))return;e.role==="jump"&&t.type!=="pointerup"&&(this.touchJumpEdge=!1);const n=t.timeStamp-(e.tapStartedAt??1/0),s=this.drag&&t.type==="pointerup"&&n>=0&&n<=kx&&Math.hypot(t.clientX-e.x,t.clientY-e.y)<=hu&&document.elementFromPoint(t.clientX,t.clientY)===this.canvas;this.dropContact(e),s&&this.controls.place()}wheel(t){if(!this.active||(t.preventDefault(),this.pending||t.ctrlKey||t.metaKey))return;const e=t.deltaMode,n=t.deltaX,s=t.deltaY;if(!Number.isFinite(s)||!s||Math.abs(n)>Math.abs(s))return;const r=performance.now();(r-this.lastWheel>220||Math.sign(s)!==Math.sign(this.wheelSum))&&(this.wheelSum=0),this.lastWheel=r,!(r<this.nextWheel)&&(this.wheelSum+=s*(e===1?16:e===2?Math.max(window.innerHeight||0,100):1),!(Math.abs(this.wheelSum)<48)&&(this.controls.cycle(Math.sign(this.wheelSum)),this.wheelSum=0,this.nextWheel=r+120,this.record("wheel-step")))}keydown(t){if(!this.active||t.defaultPrevented)return;if(t.code==="KeyZ"&&(t.ctrlKey||t.metaKey)&&!t.altKey&&!t.shiftKey){t.preventDefault(),t.repeat||this.controls.undo?.();return}if(t.altKey||t.metaKey||t.ctrlKey&&!t.code.startsWith("Control")&&!this.keys.has("ControlLeft")&&!this.keys.has("ControlRight"))return;if(Fx.has(t.code)){t.preventDefault(),!t.repeat&&!this.keys.has(t.code)&&t.code==="Space"&&(this.jumpEdge=!0),t.repeat||this.keys.add(t.code);return}const e=/^Digit([1-9])$/.exec(t.code);if(!(!["Escape","KeyE","KeyF","F3","KeyQ","KeyR","KeyB","KeyG","KeyV","KeyK","KeyX"].includes(t.code)&&!e)&&(t.preventDefault(),!t.repeat))if(e)this.controls.select(Number(e[1])-1);else switch(t.code){case"Escape":this.controls.pause();break;case"KeyE":this.controls.inventory();break;case"KeyF":this.controls.fly();break;case"KeyQ":this.controls.pick?.();break;case"KeyR":this.controls.rotate?.();break;case"KeyB":this.controls.home?.();break;case"KeyG":this.controls.guide?.();break;case"KeyV":this.controls.interact?.();break;case"KeyK":this.controls.viewMode?.();break;case"KeyX":this.controls.attack?.();break;default:this.controls.debug()}}movement(){const t=this.keys,e=this.jumpEdge||this.touchJumpEdge;this.jumpEdge=this.touchJumpEdge=!1;const n=Number(t.has("KeyW"))-Number(t.has("KeyS")),s=Number(t.has("KeyD"))-Number(t.has("KeyA")),r=!!(n||s);return{forward:r?n:this.stickForward,right:r?s:this.stickRight,jump:t.has("Space")||!!this.findRole("jump"),jumpPressed:e,sprint:t.has("ShiftLeft")||t.has("ShiftRight"),down:t.has("KeyC")||t.has("ControlLeft")||t.has("ControlRight")||!!this.findRole("down")}}}const Qo=i=>Math.max(0,Math.min(1,i)),zx=["meadow","forest","shore","cave"];function Bx(i,t){const e=Math.floor(t.x),n=Math.floor(t.y),s=Math.floor(t.z);if(t.inWater)return"shore";let r=0,a=0,o=0;for(const c of[-3,0,3])for(const l of[-3,0,3]){let h=!1,d=!1,u=!1;for(let f=1;f<=8;f++){const g=i.get(e+c,n+f,s+l);g===6&&(d=!0),[2,3,4,8,9,11,14,23].includes(g)&&(h=!0)}for(let f=-3;f<=1;f++)i.get(e+c,n+f,s+l)===13&&(u=!0);r+=Number(h),a+=Number(d),o+=Number(u)}return r>=5?"cave":o>=2?"shore":a>=2?"forest":"meadow"}const si={earth:{cut:960,pitch:85,width:1.05},stone:{cut:3200,pitch:181,width:.85},wood:{cut:1540,pitch:118,width:.95},sand:{cut:2400,pitch:72,width:1.3},foliage:{cut:3500,pitch:78,width:1.2},glass:{cut:5100,pitch:650,width:.74},water:{cut:1100,pitch:280,width:1.35}};function Hx(i){return i===4?si.sand:i===6?si.foliage:i===13?si.water:[5,7,21,22].includes(i)?si.wood:[10,12,23,25,26].includes(i)?si.glass:[3,8,9,11,14].includes(i)?si.stone:si.earth}function Vx(i,t){const s=i.createBuffer(1,128e3,16e3),r=s.getChannelData(0);let a=0,o=0;for(let l=0;l<r.length;l++){const h=l/16e3,d=Math.random()*2-1;a+=.035*(d-a),o+=.16*(d-o);const u=h/8*Math.PI*2,f=.73+.19*Math.sin(u)+.08*Math.sin(u*3+.7);let g=a*f;if(t==="forest"){g+=o*f*.36;for(const _ of[1.1,1.33,5.4]){const m=h-_;m>0&&m<.22&&(g+=.073*Math.sin(Math.PI*m/.22)**2*Math.sin(2*Math.PI*(1600*m+1050*m*m)))}}else if(t==="shore")g=a*.65+o*(.24+.3*(.5+.5*Math.sin(2*u))**3);else if(t==="cave"){g=a*.26+.022*Math.sin(u*448);for(const _ of[1.7,4.8,5.08]){const m=h-_;m>0&&m<.34&&(g+=.06*Math.min(1,m*200)*Math.exp(-16*m)*Math.sin(2*Math.PI*(835*m-180*m*m)))}}r[l]=g}const c=160;for(let l=0;l<c;l++){const h=l/c,d=r.length-c+l;r[d]=r[d]*(1-h)+r[0]*h}return s}class Gx{ctx;master;effects;ambient;noise;vol=.45;muted=!1;effectsLevel=1;ambientLevel=.55;playing=!1;activeVoices=new Set;ambienceCache=new Map;layers=new Map;area="meadow";sampleIn=0;configure(t,e,n=1,s=.55){this.vol=Qo(t),this.muted=e,this.effectsLevel=Qo(n),this.ambientLevel=Qo(s);const r=this.ctx?.currentTime??0;this.master?.gain.setTargetAtTime(e?0:this.vol*.52,r,.025),this.effects?.gain.setTargetAtTime(this.effectsLevel,r,.025),this.ambient?.gain.setTargetAtTime(this.playing?this.ambientLevel*.7:0,r,.07)}unlock(){try{if(!this.ctx){const t=this.ctx=new AudioContext;this.master=t.createGain(),this.master.connect(t.destination),this.effects=t.createGain(),this.effects.connect(this.master),this.ambient=t.createGain(),this.ambient.gain.value=0,this.ambient.connect(this.master),this.noise=t.createBuffer(1,Math.ceil(t.sampleRate*.4),t.sampleRate);const e=this.noise.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1;this.configure(this.vol,this.muted,this.effectsLevel,this.ambientLevel)}this.ctx.resume().catch(()=>{})}catch{}}setPlaying(t){if(this.playing=t,this.sampleIn=0,!t){for(const n of this.activeVoices)try{n.stop()}catch{}this.activeVoices.clear();const e=this.ctx?.currentTime??0;for(const{gain:n,source:s}of this.layers.values())n.gain.cancelScheduledValues(e),n.gain.setTargetAtTime(0,e,.015),s.onended=()=>{s.disconnect(),n.disconnect()},s.stop(e+.09);this.layers.clear()}this.ctx&&this.ambient&&this.ambient.gain.setTargetAtTime(t?this.ambientLevel*.7:0,this.ctx.currentTime,.045)}environment(t,e,n){if(!this.playing||this.muted||!this.vol||!this.ambientLevel||this.ctx?.state!=="running"||!this.ambient||(this.sampleIn-=n,this.sampleIn>0))return;this.sampleIn=.36,this.area=Bx(t,e);const s=this.ctx,r=s.currentTime;if(!this.layers.has(this.area)){const a=s.createBufferSource(),o=s.createGain();let c=this.ambienceCache.get(this.area);c||(c=Vx(s,this.area),this.ambienceCache.set(this.area,c)),a.buffer=c,a.loop=!0,o.gain.value=0,a.connect(o),o.connect(this.ambient),a.start(),this.layers.set(this.area,{source:a,gain:o})}for(const a of zx)this.layers.get(a)?.gain.gain.setTargetAtTime(a===this.area?1:0,r,.32)}track(t,e){this.activeVoices.add(t),t.onended=()=>{this.activeVoices.delete(t),t.disconnect();for(const n of e)n.disconnect()}}sound(t,e=1){const n=this.ctx,s=this.effects;if(!n||!s||this.muted||!this.vol||!this.effectsLevel||n.state!=="running"||!this.playing&&t!=="craft")return;const r=t==="craft"?3:2;if(this.activeVoices.size+r>12)return;const a=.935+.13*Math.random(),o=(g,_,m,p,M,E=.81)=>{const y=n.createOscillator(),A=n.createGain(),T=n.currentTime+_;y.type=M,y.frequency.setValueAtTime(g,T),y.frequency.exponentialRampToValueAtTime(g*E,T+m),A.gain.setValueAtTime(1e-4,T),A.gain.linearRampToValueAtTime(p,T+.006),A.gain.exponentialRampToValueAtTime(1e-4,T+m),y.connect(A),A.connect(s),this.track(y,[A]),y.start(T),y.stop(T+m+.01)};if(t==="craft"){[440,554.37,740].forEach((g,_)=>o(g,_*.055,.15,.19,"sine",1));return}if(t==="pickup"){o(590,0,.09,.105,"sine",1.45);return}if(t==="break"){o(243*a,0,.13,.27,"triangle"),o(137,.08,.17,.23,"triangle");return}const c=Hx(e),l=(t==="step"?.095:t==="tap"?.075:t==="mine"?.17:.105)*c.width,h=n.createBufferSource(),d=n.createGain(),u=n.createBiquadFilter(),f=n.currentTime;h.buffer=this.noise,h.playbackRate.value=a,u.type="lowpass",u.frequency.value=c.cut*a,d.gain.setValueAtTime(1e-4,f),d.gain.linearRampToValueAtTime(t==="step"||t==="tap"?.15:.3,f+.004),d.gain.exponentialRampToValueAtTime(1e-4,f+l),h.connect(u),u.connect(d),d.connect(s),this.track(h,[u,d]),h.start(f,.06*Math.random()),h.stop(f+l),o(c.pitch*a*(t==="place"?1.17:1),0,l,t==="step"?.13:.21,c===si.glass?"sine":"triangle")}}const Ui=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,er=(i,t,e)=>Ui(i,t,e)&&Number.isInteger(i),tc=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),ec=(i,t)=>typeof i=="string"&&i.trim().length>0&&i.length<=t;function Wx(){try{return Bu(JSON.parse(localStorage.getItem("tk777.webcraft.settings")||"null"))}catch{}return{...zu}}function Xx(i){try{localStorage.setItem("tk777.webcraft.settings",JSON.stringify(i))}catch{}}function tl(i){if(!tc(i)||i.format!=="webcraft777")throw new Error("ウェブクラフト777のワールドファイルを選んでください。");const t=i.version===1&&i.generator===1;if(!t&&(i.version!==2||i.generator!==1&&i.generator!==2))throw new Error("この保存形式または地形バージョンには対応していません。");const e=i.stage===void 0?"classic":i.stage;if(!Cl(e)||e!=="classic"&&(i.generator!==2||i.mode!=="creative")||i.sharkDefeated!==void 0&&typeof i.sharkDefeated!="boolean")throw new Error("ステージまたは生き物の保存情報が正しくありません。");if(t&&(!tc(i.settings)||!["distance","scale","shadows","sensitivity","volume","muted"].every(c=>Object.hasOwn(i.settings,c))))throw new Error("旧ワールドの設定が欠けています。元のバックアップを確認してください。");const n=t?Bu(i.settings):i.settings,s=t?Iu():i.fixtures,r=t?Nu():i.journey;if(!Uu(s)||!Fu(r))throw Error("設備または探検記録を読めません。元のバックアップを確認してください。");const a=i.pose;if(!ec(i.id,64)||!/^[a-zA-Z0-9-]+$/.test(i.id)||!ec(i.name,64)||!ec(i.seed,128)||i.mode!=="creative"&&i.mode!=="explore"||!er(i.revision,0,Number.MAX_SAFE_INTEGER)||!er(i.updatedAt,0,864e13)||!tc(a)||!Ui(a.x,0,256)||!Ui(a.z,0,256)||!Ui(a.y,-10,130)||!Ui(a.yaw,-1e7,1e7)||!Ui(a.pitch,-Math.PI/2,Math.PI/2)||!Ui(i.day,0,1)||typeof i.guideSeen!="boolean"||typeof i.flying!="boolean"||a.crouched!==void 0&&typeof a.crouched!="boolean"||!er(i.selected,0,8)||!hl(n)||!al(i.bag))throw new Error("ワールド情報・設定または所持品のデータが正しくありません。");if(t&&(i.bag.hotbar.some(c=>c>20)||i.bag.slots.some(c=>c.id>20)))throw new Error("旧ワールドの所持品に未対応の素材があります。");if(!Array.isArray(i.edits)||i.edits.length>256*256*95)throw new Error("ブロック変更のデータが正しくありません。");const o=new Map;for(const c of i.edits){if(!Array.isArray(c)||c.length!==2||!er(c[0],65536,256*256*96-1)||!(t?er(c[1],0,13):xr(c[1]))||o.has(c[0]))throw new Error("ブロック変更に範囲外または重複した座標があります。");o.set(c[0],c[1])}if(s.chests.some(([c])=>o.get(c)!==22)||s.benches.some(([c])=>o.get(c)!==21)||s.axes.some(([c])=>o.has(c)&&o.get(c)!==5))throw Error("設備と建築記録が一致しません。");return{...i,version:2,stage:e,settings:n,fixtures:s,journey:r}}function qx(i){let t;try{t=JSON.parse(i)}catch{throw new Error("ファイルを読めません。書き出したJSONファイルを選んでください。")}return{save:tl(t),original:t.version===1?t:void 0}}const Yx=i=>JSON.stringify(i);class jx{constructor(t="tk777.webcraft777.v1"){this.database=t}database;connection;open(){return this.connection?this.connection:(this.connection=new Promise((t,e)=>{const n=indexedDB.open(this.database,2);n.onupgradeneeded=()=>{for(const s of["worlds","directory","originals"])n.result.objectStoreNames.contains(s)||n.result.createObjectStore(s,{keyPath:"id"})},n.onsuccess=()=>{n.result.onversionchange=()=>{n.result.close(),this.connection=void 0},t(n.result)},n.onerror=()=>e(n.error),n.onblocked=()=>e(new Error("ほかのタブのゲームを閉じてから、もう一度お試しください。"))}).catch(t=>{throw this.connection=void 0,t}),this.connection)}async list(){const t=await this.open();return new Promise((e,n)=>{const s=t.transaction(["directory","originals"]),r=s.objectStore("directory").getAll(),a=s.objectStore("originals").getAllKeys();s.oncomplete=()=>{const o=new Set(a.result);e(r.result.map(c=>({...c,hasOriginal:c.schemaVersion!==2||o.has(c.id)})).sort((c,l)=>l.updatedAt-c.updatedAt))},s.onabort=()=>n(s.error)})}async original(t){const e=await this.open();return new Promise((n,s)=>{const r=e.transaction(["originals","worlds"]).objectStore("originals").get(t);r.onsuccess=()=>{if(r.result){n(r.result);return}const a=r.transaction.objectStore("worlds").get(t);a.onsuccess=()=>n(a.result?.version===1?a.result:void 0),a.onerror=()=>s(a.error)},r.onerror=()=>s(r.error)})}async get(t){const e=await this.open(),n=await new Promise((s,r)=>{const a=e.transaction("worlds").objectStore("worlds").get(t);a.onsuccess=()=>s(a.result),a.onerror=()=>r(a.error)});if(n!==void 0)return tl(n)}async write(t,e){const n=tl(t),s=await this.open();return new Promise((r,a)=>{const o=s.transaction(["directory","worlds","originals"],"readwrite"),c=o.objectStore("directory"),l=c.get(t.id);let h,d=!1;l.onsuccess=()=>{if((l.result?.revision??null)!==e){d=!0,o.abort();return}const u=o.objectStore("worlds"),f=u.get(t.id);f.onsuccess=()=>{const A=f.result?.version===1?f.result:t.version===1?t:null;if(A){const T=o.objectStore("originals"),C=T.getKey(t.id);C.onsuccess=()=>{C.result===void 0&&T.add(A)}}},h={...n,revision:(e??0)+1,updatedAt:Date.now()};const{id:g,name:_,seed:m,mode:p,stage:M,updatedAt:E,revision:y}=h;o.objectStore("worlds").put(h),c.put({id:g,name:_,seed:m,mode:p,stage:M,updatedAt:E,revision:y,schemaVersion:2})},o.oncomplete=()=>r(h),o.onabort=()=>a(d?new Error("別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。"):o.error??new Error("保存が中断されました。"))})}}const du=900,Kx=300,$x=7e3,Zx=12e3,Jx=1e4,Qx={400:"部屋名・ニックネーム・合言葉を確認してください。",401:"部屋との接続が切れました。合言葉を入れて参加し直してください。",403:"このページからは部屋に接続できません。",404:"部屋が見つかりません。合言葉を確認してください。",409:"部屋が現在いっぱいです。",410:"部屋の有効期限が切れました。新しい部屋を作ってください。",426:"ゲームを再読み込みして、最新版で探索ルームに入り直してください。",429:"通信が集中しています。少し待ってからお試しください。"};class Gi extends Error{constructor(t,e,n=0){super(e==="invalid-response"?"部屋から正しい応答を受け取れませんでした。":Qx[t]??"マルチプレイに接続できませんでした。通信環境を確認してください。"),this.status=t,this.code=e,this.retryAfter=n,this.name="OnlineError"}status;code;retryAfter}function bs(){throw new Gi(0,"invalid-response")}function gi(i){return i&&typeof i=="object"&&!Array.isArray(i)?i:void 0}function dr(i,t){return typeof i=="string"&&i.length>0&&i.length<=t}function fr(i,t,e){return typeof i=="number"&&Number.isSafeInteger(i)&&i>=t&&i<=e}function _a(i,t,e){return typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e}function Id(i){return dr(i,64)&&/^[a-z0-9_-]+$/i.test(i)}function fu(i){const t=gi(i),e=gi(t?.room);return!t||!e||typeof e.code!="string"||!/^[A-Z0-9]{8}$/.test(e.code)||!dr(e.name,120)||!dr(e.seed,128)||e.generator!==2||e.mode!==void 0&&e.mode!=="explore"&&e.mode!=="creative"||!fr(e.createdAt,1,Number.MAX_SAFE_INTEGER)||!Id(t.id)||!dr(t.token,256)||t.token.length<16||!/^[a-z0-9_.-]+$/i.test(t.token)?bs():{id:t.id,token:t.token,room:{code:e.code,name:e.name,seed:e.seed,generator:e.generator,createdAt:e.createdAt,mode:e.mode==="explore"?"explore":"creative"}}}function t1(i){const t=gi(i),e=gi(t?.pose);if(!t||!e||!Id(t.id)||!dr(t.nickname,80)||!_a(e.x,0,Ut)||!_a(e.y,0,je)||!_a(e.z,0,Ut)||!_a(e.yaw,-Math.PI*2,Math.PI*2)||typeof e.moving!="boolean"||typeof e.crouched!="boolean"||typeof e.flying!="boolean")return;const{x:n,y:s,z:r,yaw:a,moving:o,crouched:c,flying:l}=e;return{id:t.id,nickname:t.nickname,pose:{x:n,y:s,z:r,yaw:a,moving:o,crouched:c,flying:l}}}function e1(i,t,e){const n=gi(i);return!n||!fr(n.key,Ut*Ut,Ut*Ut*je-1)||!fr(n.block,0,33)||n.block>12&&n.block!==21&&n.block!==23&&n.block<25||n.axis!=="y"&&!(n.block===5&&(n.axis==="x"||n.axis==="z"))||!fr(n.revision,t+1,e)?bs():{key:n.key,block:n.block,axis:n.axis,revision:n.revision}}function n1(i,t,e,n){const s=gi(i);if(!s||!fr(s.revision,t,Number.MAX_SAFE_INTEGER)||!Array.isArray(s.cells)||s.cells.length>Jx||!Array.isArray(s.players)||s.players.length>6)return bs();const r=s.revision,a=s.cells.map(h=>e1(h,t,r));if(new Set(a.map(h=>h.key)).size!==a.length||r>t&&!a.some(h=>h.revision===r))return bs();const o=new Set([e]),c=[];for(const h of s.players){const d=t1(h);!d||o.has(d.id)||(o.add(d.id),c.push(d))}let l;if(n){const h=gi(s.result);if(!h||typeof h.ok!="boolean")return bs();const d=typeof h.reason=="string"&&/^[a-z-]{1,32}$/.test(h.reason)?h.reason:void 0;l={ok:h.ok,...d?{reason:d}:{}}}return{frame:{revision:r,cells:a,players:c},result:l}}function i1(i){if(!i)return 0;const t=/^\d+$/.test(i)?Number(i)*1e3:Date.parse(i)-Date.now();return Number.isFinite(t)?Math.min(Math.max(t,0),6e4):0}class s1{constructor(t,e=globalThis.fetch.bind(globalThis)){this.fetcher=e;const n=new URL(t),s=["127.0.0.1","localhost","[::1]"].includes(n.hostname);if(n.username||n.password||n.protocol!=="https:"&&!(s&&n.protocol==="http:"))throw new Error("安全なマルチプレイ接続先を指定してください。");this.origin=n.origin}fetcher;origin;async create(t){const e=fu(await this.request("rooms",t));if(t.mode==="explore"&&e.room.mode!=="explore")throw this.leave(e),new Gi(426,"mode-unavailable");return e}async join(t){return fu(await this.request("join",{...t,protocol:2}))}start(t,e){return new r1(t,e,(n,s)=>this.request("sync",n,s),()=>this.leave(t))}async leave(t){try{await this.request("leave",{code:t.room.code,token:t.token},void 0,!0)}catch{}}async request(t,e,n,s=!1){const r=new AbortController,a=()=>r.abort();n?.aborted&&a();const o=setTimeout(a,$x);n?.addEventListener("abort",a,{once:!0});try{const c=await this.fetcher(this.origin+"/api/webcraft/"+t,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},signal:r.signal,cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer",redirect:"error",keepalive:s});if(!c.ok){const l=gi(await c.json().catch(()=>{})),h=typeof l?.error=="string"&&/^[a-z0-9_-]{1,40}$/i.test(l.error)?l.error:"http";throw new Gi(c.status,h,i1(c.headers.get("Retry-After")))}return await c.json().catch(()=>bs())}catch(c){throw c instanceof Gi?c:new Gi(0,"network")}finally{clearTimeout(o),n?.removeEventListener("abort",a)}}}const va=()=>typeof document<"u"&&document.hidden;class r1{constructor(t,e,n,s){this.connection=t,this.hooks=e,this.send=n,this.leave=s,typeof document<"u"&&document.addEventListener("visibilitychange",this.visibility),this.schedule(0)}connection;hooks;send;leave;currentState="connecting";revision=0;lastStart=-1/0;retryAt=0;failures=0;timer;running;pending;sent;closed=!1;get state(){return this.currentState}edit(t){return this.closed||this.state!=="connected"||va()?Promise.resolve({ok:!1,reason:"offline"}):this.pending?Promise.resolve({ok:!1,reason:"busy"}):new Promise(e=>{this.pending={edit:{...t},resolve:e},this.schedule(0)})}close(){this.closed||(this.stop(),this.leave())}visibility=()=>{if(!va()){this.schedule(0);return}clearTimeout(this.timer),this.timer=void 0,this.pending&&this.pending!==this.sent&&this.finishEdit({ok:!1,reason:"interrupted"})};updateState(t){this.currentState!==t&&(this.currentState=t,this.hooks.onState(t))}schedule(t){if(this.closed||this.running||va())return;clearTimeout(this.timer);const e=performance.now(),n=Math.max(e+t,this.lastStart+Kx,this.retryAt);this.timer=setTimeout(()=>{this.tick()},n-e)}finishEdit(t){const e=this.pending;this.pending=void 0,this.sent=void 0,e?.resolve(t)}stop(){this.closed=!0,clearTimeout(this.timer),this.timer=void 0,this.running?.abort(),this.finishEdit({ok:!1,reason:"closed"}),typeof document<"u"&&document.removeEventListener("visibilitychange",this.visibility)}async tick(){if(this.timer=void 0,this.closed||this.running||va())return;const t=new AbortController;this.running=t,this.lastStart=performance.now(),this.sent=this.pending;const e=this.sent,{room:n,token:s,id:r}=this.connection;let a=!1;try{const o=this.hooks.pose();a=!!(e&&o),e&&!a&&this.finishEdit({ok:!1,reason:"offline"});const c=await this.send({protocol:2,code:n.code,token:s,since:this.revision,pose:o,...e&&o?{edit:e.edit}:{}},t.signal);if(this.closed)return;const{frame:l,result:h}=n1(c,this.revision,r,a);this.hooks.onFrame(l),this.revision=l.revision,this.failures=this.retryAt=0,this.updateState("connected"),e&&h&&this.finishEdit(h)}catch(o){if(this.closed)return;const c=o instanceof Gi?o:new Gi(0,"invalid-response");if(c.status===400&&a&&e?.edit.actionId){this.finishEdit({ok:!1,reason:"invalid"});return}if([400,401,403,404,409,410,426].includes(c.status)){this.stop(),this.hooks.onEnd?.(c);return}this.pending&&this.finishEdit({ok:!1,reason:a?"uncertain":"offline"}),this.updateState("reconnecting"),this.failures=Math.min(this.failures+1,5),this.retryAt=performance.now()+Math.max(c.retryAfter,Math.min(Zx,du*2**(this.failures-1)))}finally{this.running=void 0,this.closed||this.schedule(this.pending?0:Math.max(0,this.lastStart+du-performance.now()))}}}const Ud=(i,t)=>"tk777.webcraft.exploration."+JSON.stringify([i,t.trim()]),nr=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,a1=i=>i&&nr(i.x,0,Ut)&&nr(i.y,0,je)&&nr(i.z,0,Ut)&&nr(i.pitch,-Math.PI/2,Math.PI/2)&&nr(i.yaw,-Math.PI*2,Math.PI*2)&&(i.crouched===void 0||typeof i.crouched=="boolean");function o1(i){const t=i?.edit;return t&&al(i?.after)&&typeof t.actionId=="string"&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(t.actionId)&&(i?.message===void 0||typeof i.message=="string"&&i.message.length<=150)&&Number.isSafeInteger(t.key)&&t.key>=Ut*Ut&&t.key<Ut*Ut*je&&Number.isSafeInteger(t.fromRevision)&&t.fromRevision>=0&&xr(t.before)&&xr(t.block)&&(t.axis==="x"||t.axis==="y"||t.axis==="z")}function c1(i,t){try{const e=JSON.parse(sessionStorage.getItem(Ud(i,t))??"null");if(e&&al(e.bag)&&Number.isInteger(e.selected)&&e.selected>=0&&e.selected<=8&&Fu(e.journey)&&a1(e.pose)&&(e.pending===void 0||o1(e.pending)))return e}catch{}}function l1(i,t,e){try{sessionStorage.setItem(Ud(i,t),JSON.stringify(e))}catch{}}const el=i=>({x:Math.floor(i.x)+.5,y:Math.round(i.y),z:Math.floor(i.z)+.5}),on=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),ps=1e-5,Ca=i=>Math.floor(i.x)+Ut*(Math.floor(i.z)+Ut*Math.round(i.y)),h1=[[1,0],[0,1],[-1,0],[0,-1]];function Sn(i,t,e,n=!1){const s=Math.floor(t.x-e.radius+ps),r=Math.floor(t.x+e.radius-ps),a=Math.floor(t.z-e.radius+ps),o=Math.floor(t.z+e.radius-ps),c=Math.floor(t.y+ps),l=Math.floor(t.y+e.height-ps);if(s<0||a<0||c<1||r>=Ut||o>=Ut||l>=je)return!1;for(let h=c;h<=l;h++)for(let d=a;d<=o;d++)for(let u=s;u<=r;u++){const f=i.get(u,h,d);if(oi(f)||n&&f===13)return!1}return!0}function Cr(i,t,e){return Math.abs(t.y-Math.round(t.y))<.002&&!Sn(i,{...t,y:t.y-.003},e)}function Nd(i,t,e){const n=[];for(const[s,r]of h1){const a={x:t.x+s,y:t.y,z:t.z+r};for(const o of[0,1,-1])if(a.y=t.y+o,!(!Sn(i,a,e,!0)||!Cr(i,a,e))&&!(o===1&&!Sn(i,{...t,y:a.y},e,!0))&&!(o===-1&&!Sn(i,{...a,y:t.y},e,!0))){n.push({...a});break}}return n}function u1(i,t,e,n,s,r){const a=el(t),o=el(e);if(!Sn(i,a,n,!0)||!Cr(i,a,n))return[];const c=g=>Math.abs(g.x-o.x)+Math.abs(g.z-o.z)+.6*Math.abs(g.y-o.y),l={p:a,g:0,h:c(a),parent:null},h=[l],d=new Map([[Ca(a),0]]);let u=l;for(let g=0;h.length&&g<96&&!(performance.now()>=s);g++){let _=0;for(let p=1;p<h.length;p++){const M=h[p],E=h[_];(M.g+M.h<E.g+E.h||M.g+M.h===E.g+E.h&&M.h<E.h)&&(_=p)}const[m]=h.splice(_,1);if(m.g===d.get(Ca(m.p))){if(m.h<u.h&&(u=m),m.h<.01)break;for(const p of Nd(i,m.p,n)){if(Math.abs(p.x-a.x)>14||Math.abs(p.z-a.z)>14)continue;const M=Ca(p),E=m.g+1+.25*Math.abs(p.y-m.p.y);r?.has(M)||E>=(d.get(M)??1/0)||(d.set(M,E),h.push({p,g:E,h:c(p),parent:m}))}}}const f=[];for(let g=u;g?.parent;g=g.parent)f.push(g.p);return f.reverse()}const Ni={sheep:{radius:.43,height:1.22},cow:{radius:.48,height:1.43},villager:{radius:.32,height:1.81}};function d1({x:i,y:t,z:e}){return[i,t,e].every(Number.isFinite)&&i>=0&&i<Ut&&e>=0&&e<Ut&&t>=1&&t<je}const f1=[["villager","ナギ",5082500,.6,-4],["sheep","わたげ",16050898,-2,-5],["cow","もみじ",8144182,4,-5],["villager","コハク",12748099,5,-2],["sheep","ミルク",15196367,-5,-5],["cow","カカオ",6244930,6,1],["villager","スミレ",10188701,-4,2],["sheep","ゆき",15917509,-6,-1],["cow","くるみ",5396065,7,3],["villager","ハル",10642512,2,5],["sheep","こむぎ",15386777,-2,6],["cow","あずき",10180928,5,7]];function Fd(i,t,e){const n=el(t);for(const s of[0,-1,1,-2,2,-3,3]){const r={...n,y:n.y+s};if(Sn(i,r,e,!0)&&Cr(i,r,e))return r}return null}function p1(i,t){const e={radius:.48,height:1.81},n=Fd(i,t,e);if(!n)return[];const s=new Set,r=[n],a=[],o=c=>c.x+"/"+c.y+"/"+c.z;s.add(o(n));for(let c=0;c<r.length&&c<440;c++){const l=r[c],h=Math.floor(l.x),d=Math.floor(l.z);if(on(l,t)>=2.8&&[1,2,3,4,8].includes(i.get(h,l.y-1,d))){let u=!1;for(let f=l.y+2;f<je;f++)if(oi(i.get(h,f,d))){u=!0;break}u||a.push(l)}for(const u of Nd(i,l,e)){const f=o(u);Math.abs(u.x-n.x)>11||Math.abs(u.z-n.z)>11||s.has(f)||(s.add(f),r.push(u))}}return a}function ir(i,t){return Math.atan2(i.x-t.x,i.z-t.z)}function m1(i,t,e){const{radius:n,height:s}=Ni[e.kind];let r=0,a=4.25;for(const o of["x","y","z"]){const c=e[o]-(o==="y"?0:n),l=e[o]+(o==="y"?s:n);if(Math.abs(t[o])<1e-9){if(i[o]<c||i[o]>l)return 1/0}else{const h=(c-i[o])/t[o],d=(l-i[o])/t[o];if(r=Math.max(r,Math.min(h,d)),a=Math.min(a,Math.max(h,d)),a<r)return 1/0}}return r}class g1{constructor(t){this.world=t,this.unsubscribe=t.onEdit((e,n,s)=>{for(const r of this.entities){const a=this.motions.get(r.id),o=c=>Math.abs(c.x-(e+.5))<1.51&&Math.abs(c.z-(s+.5))<1.51&&n>=Math.floor(c.y)-2&&n<Math.ceil(c.y+Ni[r.kind].height)+1;!o(r)&&!a.path.some(o)||(a.path=[],a.due=0)}})}world;active=[];entities=[];clock=0;visualRevision=0;motions=new Map;unsubscribe;nextList=0;lastViewer=null;nextPlan=0;cursor=0;talking=null;lastMobile;track(t){this.motions.set(t.id,{mode:"idle",path:[],due:this.clock+1.8+this.motions.size*.31,seq:this.motions.size*57+1,vy:0,stride:0,grazing:0})}introduce(t){if(this.entities.length||!d1(t))return!1;const e=p1(this.world,t),n=[],s=Number.isFinite(t.yaw)?t.yaw:0,r=Math.cos(s),a=Math.sin(s);for(const[o,[c,l,h,d,u]]of f1.entries()){const f=o===0?.7:2.8,g=d+(Kt(o,12,this.world.salt)-.5)*f,_=u+(Kt(o,73,this.world.salt)-.5)*f,m=t.x+g*r+_*a,p=t.z-g*a+_*r;let M,E=1/0;for(const A of e){if(n.some(C=>on(C,A)<1.75))continue;let T=(m-A.x)**2+(p-A.z)**2+3*(t.y-A.y)**2;if(o===0){const C=A.x-t.x,L=A.z-t.z,S=-a*C-r*L,b=Math.abs(r*C-a*L);(S<2.8||b>S*.26)&&(T+=75)}T<E&&(E=T,M=A)}if(!M)return!1;const y=ir(M,t)+.48*(o%2?-1:1);n.push({...M,id:c+"-"+this.world.salt.toString(36)+"-"+o,name:l,kind:c,color:h,yaw:Math.atan2(Math.sin(y),Math.cos(y)),home:{...M}})}this.entities.push(...n),this.visualRevision++;for(const o of n)this.track(o);return this.refreshActive(t,!1),!0}refreshActive(t,e){const n=e?27:43,s=this.entities.filter(o=>Math.hypot(o.x-t.x,o.z-t.z,o.y-t.y)<n).sort((o,c)=>on(o,t)-on(c,t));this.active.length=0;let r=0,a=0;for(const o of s){if(o.kind==="villager"){if(a>=4)continue;a++}else{if(r>=8)continue;r++}this.active.push(o)}this.lastMobile=e,this.lastViewer={...t},this.nextList=this.clock+.35}talk(t,e){if(this.talking=t,this.visualRevision++,!t)return;const n=this.entities.find(s=>s.id===t&&s.kind==="villager");if(n){const s=this.motions.get(t);s.mode="talk",s.path=[],e&&(n.yaw=ir(n,e))}}overlapsBlock(t,e,n){return this.entities.some(s=>{const r=Ni[s.kind];return t<s.x+r.radius&&t+1>s.x-r.radius&&n<s.z+r.radius&&n+1>s.z-r.radius&&e<s.y+r.height&&e+1>s.y+1e-5})}target(t,e){if(![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=e??xi(this.world,t,4.25)?.distance??1/0;let s=Math.min(4.250001,n-1e-4),r=null;const a=Math.cos(t.pitch),o={x:-Math.sin(t.yaw)*a,y:Math.sin(t.pitch),z:-Math.cos(t.yaw)*a},c={x:t.x,y:t.y+Bs(t),z:t.z};for(const l of this.entities){const h=m1(c,o,l);h<s&&(s=h,r=l)}return r}motion(t){return this.motions.get(t.id)}castsContactShadow(t){if(Math.abs(t.y-Math.round(t.y))>.003)return!1;const e=Ni[t.kind].radius*.82,n=Math.round(t.y)-1;return[-e,e].every(s=>[-e,e].every(r=>oi(this.world.get(Math.floor(t.x+s),n,Math.floor(t.z+r)))))}plan(t,e,n,s){e.seq++;const r=Kt(e.seq,42,this.world.salt),a=Kt(e.seq,81,this.world.salt);e.due=this.clock+2.5+r*3;const o=on(t,n)<1.05&&Math.abs(t.y-n.y)<1.8;if(!o&&a<.28){e.path=[],e.mode=this.grazes(t)?"eat":"idle",e.grazing=this.clock+.9+r,t.yaw=Math.atan2(Math.sin(t.yaw+(r-.5)*.55),Math.cos(t.yaw+(r-.5)*.55));return}let c;if(o){const h=ir(n,t);c={x:t.x-Math.sin(h)*2.5,y:t.y,z:t.z-Math.cos(h)*2.5}}else{const h=t.kind==="villager"?4.2:5.5;c={x:t.home.x+Math.cos(r*6.28)*(.9+a*h),y:t.home.y,z:t.home.z+Math.sin(r*6.28)*(.9+a*h)}}const l=new Set;for(const h of this.active)h!==t&&l.add(Ca(h));e.path=u1(this.world,t,c,Ni[t.kind],s,l),e.mode=e.path.length?"walk":"idle"}grazes(t){return t.kind!=="villager"&&this.world.get(Math.floor(t.x),Math.floor(t.y-.01),Math.floor(t.z))===1}move(t,e,n,s){const r=Ni[t.kind],a=this.world;if(!Sn(a,t,r))return;if(Cr(a,t,r))t.y=Math.round(t.y),e.vy=0;else{e.vy=Math.max(-15,e.vy-22*n);const _={x:t.x,z:t.z,y:t.y+e.vy*n};Sn(a,_,r)?t.y=_.y:(t.y=Math.ceil(_.y-1e-5),e.vy=0)}if(!Cr(a,t,r)||!e.path.length)return;const o=e.path[0],c=on(t,o);if(c<.025){e.path.shift(),e.path.length||(e.mode="idle");return}const l=t.kind==="villager"?.95:1.12,h=Math.min(1,l*n/c),d={x:t.x+(o.x-t.x)*h,y:t.y,z:t.z+(o.z-t.z)*h};if((_=>Math.abs(_.y-s.y)<1.75&&on(_,s)<r.radius+.31)(d)&&on(d,s)<=on(t,s))return;if(this.active.some(_=>_!==t&&Math.abs(_.y-t.y)<1.4&&on(_,d)<Ni[_.kind].radius+r.radius&&on(_,d)<on(_,t)-1e-6)){e.path=[],e.mode="idle",e.due=this.clock+.5;return}if(!Sn(a,d,r,!0)){const _={...d,y:t.y+1};if(o.y!==t.y+1||!Sn(a,{...t,y:t.y+1},r,!0)||!Sn(a,_,r,!0)){e.path=[],e.mode="idle";return}d.y=_.y}const g=Fd(a,d,r);if(!g||g.y<d.y-1){e.path=[],e.mode="idle";return}t.yaw=ir(t,o),Object.assign(t,d),e.stride=(e.stride+l*n*6)%(Math.PI*2)}step(t,e,n){if(!Number.isFinite(t)||t<=0||![e.x,e.y,e.z].every(Number.isFinite))return;const s=Math.min(.1,t);this.clock+=s,(this.clock>=this.nextList||this.lastMobile!==n||!this.lastViewer||on(e,this.lastViewer)>3)&&this.refreshActive(e,n);const r=this.clock,a=this.active.length;if(!a)return;const o=performance.now()+(n?1:1.8);let c=r>=this.nextPlan?n?1:2:0;const l=Math.ceil(s*60);for(let h=0;h<a;h++){const d=this.active[(h+this.cursor)%a],u=this.motions.get(d.id);this.talking===d.id?(u.path=[],u.mode="talk",d.yaw=ir(d,e)):u.grazing>r?(u.path=[],u.mode=this.grazes(d)?"eat":"idle"):(u.path.length||(u.mode="idle"),c>0&&r>=u.due&&performance.now()<o&&!u.path.length&&(this.plan(d,u,e,o),c--,this.nextPlan=r+(n?.07:.045)));for(let f=0;f<l;f++)this.move(d,u,s/l,e)}this.cursor=(this.cursor+1)%a}dispose(){this.unsubscribe(),this.active.length=0,this.motions.clear()}}const Ln=(i,t,e,n,s,r,a,o)=>({joint:i,x:t,y:e,z:n,w:s,h:r,d:a,color:o}),Zt=(i,t,e,n,s,r,a)=>Ln("body",i,t,e,n,s,r,a),ne=(i,t,e,n,s,r,a)=>Ln("head",i,t,e,n,s,r,a),vs=3157042,xa=16771268,pu=12553580,ja=["leftFront","rightFront","leftRear","rightRear"];function mu(i){const t=i==="sheep",e=[Zt(0,.67,.035,.6,.47,.68,t?13087134:"coat"),...t?[Zt(0,.73,.045,.73,.59,.77,"coat"),Zt(-.31,.65,.02,.15,.34,.56,14668990),Zt(.32,.67,.08,.14,.32,.49,15853259),Zt(0,.98,.04,.56,.13,.64,16773852),Zt(0,.69,.42,.5,.38,.13,15128509),Zt(-.23,.72,-.32,.2,.26,.12,14932157),Zt(.22,.74,-.32,.2,.27,.12,15984074),Zt(.11,.96,-.17,.22,.14,.23,16248022)]:[Zt(-.306,.7,.06,.035,.33,.25,16179136),Zt(.306,.66,-.1,.035,.26,.21,15062201),Zt(.081,.915,.09,.3,.04,.22,16575444),Zt(-.03,.51,.27,.4,.14,.18,13213579),Zt(-.19,.63,-.31,.16,.22,.03,15128247),Zt(.314,.85,.12,.045,.17,.24,15853003),Zt(-.25,.9,-.09,.15,.035,.18,13614488),Ln("tail",0,-.12,0,.065,.29,.055,12097917),Ln("tail",0,-.28,0,.088,.11,.08,5061686)],ne(0,.02,-.035,t?.34:.4,.36,.29,t?11899773:"coat"),ne(0,-.07,-.188,t?.28:.35,.15,.11,t?14136730:14002072),ne(-.102,.068,-.186,.062,.066,.02,vs),ne(.102,.068,-.186,.062,.066,.02,vs),ne(-.108,.082,-.198,.018,.021,.008,xa),ne(.108,.082,-.198,.018,.021,.008,xa),ne(-.215,.06,.014,.14,.078,.14,t?14466992:"coat"),ne(.215,.06,.014,.14,.078,.14,t?14466992:"coat"),ne(-.074,-.06,-.246,.036,.025,.01,vs),ne(.074,-.06,-.246,.036,.025,.01,vs)];t?e.push(ne(0,.197,-.03,.37,.105,.33,15524297)):e.push(ne(-.15,.23,.04,.07,.16,.08,xa),ne(.15,.23,.04,.07,.16,.08,xa),ne(0,.055,-.182,.1,.23,.018,15917005),ne(0,.215,-.015,.21,.075,.23,5520694));for(const[n,s]of ja.entries())e.push(Ln(s,0,-.11,0,.136,.43,.14,t?12557181:n===2?15983303:8481111),Ln(s,0,-.337,-.006,.146,.09,.156,5523522));return e}const _1=[Zt(0,1.05,0,.46,.54,.28,"coat"),Zt(0,.73,0,.43,.17,.27,8413004),Zt(0,1.13,-.15,.22,.36,.035,15323038),Zt(0,.855,-.145,.44,.09,.048,6441015),Zt(0,1.3,-.135,.36,.11,.064,13273928),Zt(.13,1.19,-.16,.067,.16,.047,14986853),Zt(-.077,.983,-.174,.14,.085,.023,11045476),Zt(.078,1.095,-.173,.04,.031,.014,12230523),Zt(-.27,.98,0,.111,.05,.185,13346417),Zt(.27,.98,0,.111,.05,.185,13346417),Zt(.085,.855,-.176,.07,.063,.025,14726755),Zt(-.22,.84,-.015,.13,.19,.15,10121806),Zt(-.265,1.08,0,.105,.34,.18,"coat"),Zt(.265,1.08,0,.105,.34,.18,"coat"),Zt(-.265,.89,0,.103,.12,.15,pu),Zt(.265,.89,0,.103,.12,.15,pu),ne(0,.005,0,.333,.34,.286,14198654),ne(0,.16,.008,.345,.1,.303,6638398),ne(0,.217,.022,.38,.072,.345,"coat"),ne(0,.254,.034,.29,.061,.255,"coat"),ne(0,.191,-.086,.35,.031,.245,4734776),ne(.132,.219,-.153,.046,.037,.026,15124352),ne(-.094,.117,-.145,.12,.048,.023,6638398),ne(-.168,-.007,.017,.04,.07,.088,13077613),ne(.168,-.007,.017,.04,.07,.088,13077613),ne(-.143,.069,.02,.063,.13,.24,6441533),ne(.143,.069,.02,.063,.13,.24,6441533),ne(-.067,.033,-.148,.043,.051,.012,vs),ne(.067,.033,-.148,.043,.051,.012,vs),ne(0,-.018,-.17,.067,.064,.057,12749163),ne(0,-.094,-.146,.073,.018,.013,11103576),Ln("leftFront",0,-.27,0,.17,.55,.2,4541521),Ln("rightFront",0,-.27,0,.17,.55,.2,4541521),Ln("leftFront",0,-.602,-.023,.18,.13,.246,6310972),Ln("rightFront",0,-.602,-.023,.18,.13,.246,6310972)],nc={sheep:mu("sheep"),cow:mu("cow"),villager:_1},v1=["body","head",...ja,"tail"];function x1(){const t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){const r=(s+n*32)*4,a=(Math.imul((s>>1)+17,191)^Math.imul((n>>1)+9,127))&31,o=(s+n*3)%19===0||n%9===0&&s%7<3?12:0,c=Math.min(255,220+a+((s^n)&3)-o);t[r]=c,t[r+1]=c,t[r+2]=c,t[r+3]=255}const e=new Nr(t,32,32);return e.generateMipmaps=!0,e.magFilter=Pe,e.minFilter=ci,e.needsUpdate=!0,e}function M1(){return new Ve({transparent:!0,depthWrite:!1,vertexShader:"varying vec2 pos;void main(){pos=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 pos;void main(){vec2 p=floor(pos*20.+.5)/20.;
      float a=(1.-smoothstep(.2,1.,dot(p,p)))*.31;gl_FragColor=vec4(.065,.105,.069,a);
      #include <colorspace_fragment>
    }`})}class y1{constructor(t){this.scene=t;const e=[],n=this.geometry.getAttribute("normal");for(let s=0;s<n.count;s++){const r=.76+n.getY(s)*.19+n.getX(s)*.075+n.getZ(s)*.035;e.push(r,r,r*.99)}this.geometry.setAttribute("color",new xe(e,3)),this.mesh=new Ga(this.geometry,this.material,1152),this.mesh.instanceMatrix.setUsage(vp),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.name="羊・牛・村人",t.add(this.mesh),this.shade.name="足元の影",this.shade.frustumCulled=!1,this.shade.count=0,this.shade.renderOrder=.5,t.add(this.shade);for(const s of v1){const r=new Re;this.joints.set(s,r),this.root.add(r)}for(const s of Object.keys(nc))for(const r of nc[s])typeof r.color=="number"&&!this.palette.has(r.color)&&this.palette.set(r.color,new Wt(r.color))}scene;geometry=new gn(1,1,1);texture=x1();material=new qi({vertexColors:!0,map:this.texture});shade=new Ga(new Os(1,1).rotateX(-Math.PI/2),M1(),24);mesh;root=new Re;joints=new Map;local=new Re;out=new pe;color=new Wt;palette=new Map;previousClock=-1;previousRevision=-1;previousCenter=new I(1/0,0,0);previousDay=-1;previousMobile;pose(t,e,n){const s=e.motion(t),r=t.kind==="villager",a=t.kind==="cow",o=n?0:e.clock,c=t.id.charCodeAt(t.id.length-1),l=s.mode==="walk",h=n||!l?0:Math.sin(s.stride)*.48,d=n?0:Math.sin(o*2.2+c)*.009;this.root.position.set(t.x,t.y+d+(l?Math.abs(h)*.042:0),t.z),this.root.rotation.y=t.yaw,this.root.scale.setScalar(a?1.1:1),this.joints.get("body").position.set(0,0,0);const u=this.joints.get("head"),f=s.mode==="eat"&&!r&&!n,g=f?.5+.5*Math.sin(o*5):0;u.position.set(0,r?1.48:a?.88:.93,r?0:-.271),u.rotation.set(f?-.56-.25*g:d,!l&&!n&&s.mode!=="talk"?Math.sin(o*.9+c)*.15:0,0),f&&(u.position.y-=.23+.06*g);for(let m=0;m<ja.length;m++){const p=this.joints.get(ja[m]);p.position.set((m%2?1:-1)*(r?.115:.212),r?.667:.383,r?0:m<2?-.213:.247),p.rotation.x=h*([0,3].includes(m)?1:-1)}const _=this.joints.get("tail");_.position.set(0,.88,.37),_.rotation.z=n?0:Math.sin(o*2.1+c)*.2,this.root.updateMatrixWorld(!0)}update(t,e,n,s){const r=t.clock,a=r===this.previousClock;this.viewerVector.set(e.x,e.y,e.z);const o=this.previousCenter.distanceToSquared(this.viewerVector);if(this.previousRevision===t.visualRevision&&this.previousMobile===s&&o<.01&&Math.abs(n-this.previousDay)<.003&&(a||s&&r>=this.previousClock&&r-this.previousClock<1/30))return;this.previousClock=r,this.previousCenter.set(e.x,e.y,e.z),this.previousDay=n,this.previousMobile=s,this.previousRevision=t.visualRevision;const c=Math.sin((n-.25)*Math.PI*2),l=.48+.5*Math.max(0,Math.min(1,c*2+.25));let h=0,d=0;for(const u of t.entities){const f=Math.hypot(u.x-e.x,u.y-e.y,u.z-e.z);if(!(f>(s?28:44))){!s&&f<22&&t.castsContactShadow(u)&&(this.local.position.set(u.x,u.y+.006,u.z),this.local.rotation.y=u.yaw,this.local.scale.set(u.kind==="villager"?.58:.88,1,u.kind==="villager"?.52:.95),this.local.updateMatrix(),this.shade.setMatrixAt(d++,this.local.matrix),this.local.rotation.y=0),this.pose(u,t,f>21);for(const g of nc[u.kind])this.local.position.set(g.x,g.y,g.z),this.local.scale.set(g.w,g.h,g.d),this.local.updateMatrix(),this.out.multiplyMatrices(this.joints.get(g.joint).matrixWorld,this.local.matrix),this.mesh.setMatrixAt(h,this.out),g.color==="coat"?this.color.setHex(u.color):this.color.copy(this.palette.get(g.color)),this.mesh.setColorAt(h++,this.color.multiplyScalar(l))}}this.shade.count=d,this.shade.visible=d>0,d&&(this.shade.instanceMatrix.needsUpdate=!0),this.mesh.count=h,this.mesh.visible=h>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}viewerVector=new I;dispose(){this.scene.remove(this.mesh,this.shade),this.mesh.dispose(),this.geometry.dispose(),this.material.dispose(),this.texture.dispose(),this.shade.dispose(),this.shade.geometry.dispose(),this.shade.material.dispose()}}const b1={ナギ:"こんにちは。この坂を下りた先が湖だよ。浅瀬から水の中をのぞいてみて。",コハク:"石や木材を集めたら、湖を眺められる小さな家を建ててみない？",スミレ:"わたげたちは、草の多い場所がお気に入り。少し待つと草を食べるよ。",ハル:"湖で大きな背びれを見かけたら気をつけて。岸に上がれば追ってこないよ。"};class S1{simulation;view;talkUntil=0;mobile=globalThis.matchMedia?.("(pointer: coarse)").matches??!1;constructor(t,e,n=t.spawn()){if(this.simulation=new g1(t),!this.simulation.introduce(n)){const s=t.spawn();if(!this.simulation.introduce(s))for(const[r,a]of[[-10,-6],[10,-6],[-12,6],[12,6],[0,16],[0,-21]]){const o=Math.floor(s.x)+r,c=Math.floor(s.z)+a;if(!Fi(o,1,c))continue;const l=t.highest[o+Ut*c]+1;if(this.simulation.introduce({x:o+.5,y:l,z:c+.5}))break}}this.view=this.simulation.entities.length?new y1(e):null}update(t,e,n=.36){this.talkUntil&&this.simulation.clock>=this.talkUntil&&(this.simulation.talk(null),this.talkUntil=0),this.simulation.step(e,t,this.mobile),this.view?.update(this.simulation,t,n,this.mobile)}targetLabel(t,e){const n=this.simulation.target(t,e);if(!n)return null;const s=n.kind==="villager"?"住民":n.kind==="sheep"?"羊":"牛";return n.name+"（"+s+"）"}interact(t){const e=this.simulation.target(t);return e?e.kind==="villager"?(this.simulation.talk(e.id,t),this.talkUntil=this.simulation.clock+3.5,e.name+"「"+(b1[e.name]??"こんにちは。いい天気だね。")+"」"):e.name+(e.kind==="sheep"?"「メェー」":"「モー」"):null}occupies(t,e,n){return this.simulation.overlapsBlock(t,e,n)}dispose(){this.view?.dispose(),this.simulation.dispose()}}const Pl=13,Ma=100,ic=4.5,E1=1.52,w1=8.2,T1=[.79,.69,1,.63,.91,.75],ms=2110791,ya=15792378,kd={jade:{radius:.55,vertical:.23,speed:1.33},amber:{radius:.5,vertical:.28,speed:1.04},shark:{radius:1.13,vertical:.44,speed:1.25}},A1={jade:"ヒスイフィッシュ",amber:"アンバーフィッシュ",shark:"サメ"},R1={jade:{body:[[0,0,.06,.21,.27,.46,4448177],[0,.09,-.03,.16,.17,.4,1674386],[0,-.09,.08,.2,.09,.37,12122280],[0,0,.27,.15,.18,.1,7662017],[0,.08,-.06,.027,.23,.26,3304615],[0,-.075,.05,.31,.034,.12,4241611],[-.108,.044,.2,.023,.062,.058,ms],[.108,.044,.2,.023,.062,.058,ms],[-.121,.057,.221,.009,.018,.018,ya],[.121,.057,.221,.009,.018,.018,ya]],tail:[[0,0,-.052,.115,.105,.12,5561532],[0,0,-.157,.047,.24,.115,3574715],[0,.106,-.208,.026,.095,.095,3781327],[0,-.106,-.208,.026,.095,.095,3781327]],tailOffset:-.215},amber:{body:[[0,0,.055,.245,.285,.36,15366194],[0,.085,.035,.195,.168,.29,16560459],[0,-.083,.025,.19,.13,.32,16765548],[0,-.006,.246,.17,.2,.13,16750140],[0,0,.109,.25,.283,.069,16773073],[0,.169,-.01,.052,.146,.201,15647836],[0,-.035,.045,.33,.04,.16,16165948],[-.091,.047,.238,.027,.067,.058,ms],[.091,.047,.238,.027,.067,.058,ms],[-.107,.061,.26,.008,.019,.015,ya],[.107,.061,.26,.008,.019,.015,ya]],tail:[[0,0,-.049,.12,.126,.16,15901246],[0,0,-.142,.055,.257,.135,16566610],[0,.094,-.208,.032,.086,.082,16769168],[0,-.094,-.208,.032,.086,.082,16769168]],tailOffset:-.19},shark:{body:[[0,-.025,.18,.65,.41,1.1,5404820],[0,.092,.17,.58,.24,1.05,3166064],[0,-.204,.23,.54,.13,.98,13821919],[0,-.037,.725,.51,.317,.32,6654623],[0,-.027,.876,.366,.229,.18,7442341],[0,-.189,.712,.48,.054,.31,15135455],[0,-.138,.791,.45,.028,.27,2702165],[0,-.043,-.406,.52,.31,.34,5010832],[0,.265,.065,.105,.2,.37,4351108],[0,.381,-.011,.078,.114,.23,4550288],[-.41,-.111,.176,.225,.078,.34,4154241],[.41,-.111,.176,.225,.078,.34,4154241],[-.55,-.135,.108,.12,.057,.217,5405585],[.55,-.135,.108,.12,.057,.217,5405585],[-.249,.032,.772,.039,.106,.112,15332843],[.249,.032,.772,.039,.106,.112,15332843],[-.271,.03,.801,.025,.063,.064,ms],[.271,.03,.801,.025,.063,.064,ms],[-.326,-.033,.329,.018,.099,.043,3890809],[.326,-.033,.329,.018,.099,.043,3890809],[-.329,-.027,.416,.017,.106,.042,3890809],[.329,-.027,.416,.017,.106,.042,3890809]],tail:[[0,-.026,-.09,.3,.235,.34,5470869],[0,-.018,-.222,.09,.43,.18,4615563],[0,.177,-.281,.076,.227,.154,5405850],[0,.306,-.337,.065,.073,.106,7641003],[0,-.185,-.282,.073,.13,.12,5537175]],tailOffset:-.58}};function gu(i){const t=i.map(([n,s,r,a,o,c,l])=>{const h=new gn(a,o,c);h.translate(n,s,r);const d=new Wt(l),u=new Float32Array(h.attributes.position.count*3);for(let f=0;f<u.length/3;f+=1)d.setHex(l).multiplyScalar(T1[Math.floor(f/4)]).toArray(u,f*3);return h.setAttribute("color",new $e(u,3)),h}),e=Dd(t);for(const n of t)n.dispose();return e}function sc(i,t,e,n){return i.get(Math.floor(t),Math.floor(e),Math.floor(n))===Pl}function cn(i,t,e){const{radius:n,vertical:s}=kd[e],r=Math.floor(t.y+s+.14);for(let a=Math.floor(t.y-s);a<=r;a+=1)for(let o=Math.floor(t.z-n);o<=Math.floor(t.z+n);o+=1)for(let c=Math.floor(t.x-n);c<=Math.floor(t.x+n);c+=1)if(i.get(c,a,o)!==Pl)return!1;return!0}function C1(i){const{x:t,z:e}=i.spawn(),n=Math.floor(t),s=Math.floor(e),r=[],a=new I,o=[Rn-.5,Rn+.44,Rn-1.5,Rn-2.5],c=(l,h)=>{if((l+h)%2!==0)return;const d=n+l,u=s+h;for(const f of o)if(i.get(d,Math.floor(f),u)===Pl&&(a.set(d+.5,f,u+.5),!(!cn(i,a,"jade")&&!cn(i,a,"amber")))){r.push(a.clone());return}};for(let l=2;l<=61;l+=1){for(let h=-l;h<=l;h+=1)c(h,-l),c(h,l),Math.abs(h)!==l&&(c(-l,h),c(l,h));if(r.length>=96&&r.some(h=>cn(i,h,"shark")))break}return r.sort((l,h)=>Math.hypot(l.x-t,l.z-e)-Math.hypot(h.x-t,h.z-e)),r}function _u(i,t,e,n){const s=e.filter(c=>cn(i,c,t)),r=s.find(c=>n.every(l=>l.distanceToSquared(c)>5))??s[0];if(!r)return[];const a=s.filter(c=>c.distanceToSquared(r)<=85);a.sort((c,l)=>c.distanceToSquared(r)-l.distanceToSquared(r));const o=[];for(const c of a)if(!n.some(l=>l.distanceToSquared(c)<1.3)&&(n.push(c),o.push(c),o.length===5))break;return o}class P1{constructor(t,e,n=!1){if(this.world=t,this.scene=e,this.defeated=n,t.stage==="flat")return;const s=C1(t),r=[],a=s.find(o=>cn(t,o,"shark"));a&&r.push(a),a&&!this.defeated&&(this.shark=this.addSchool("shark",[a])[0],this.sharkMaterial=this.shark.model.children[0].material),this.addSchool("jade",_u(t,"jade",s,r)),this.addSchool("amber",_u(t,"amber",s,r))}world;scene;fish=[];materials=new Set;geometries=new Set;events=[];target=new I;step=new I;ray=new Ml;bitePoint=new I;rayHit=new I;sharkBox=new vi(new I(-.61,-.27,-1.03),new I(.61,.45,1));shark;sharkMaterial;playerHealth=Ma;enemyHealth=Ma;biteCooldown=0;attackCooldown=0;immunity=0;hitFlash=0;timeSinceBite=0;fade=0;chasing=!1;defeated;get health(){return Math.ceil(this.playerHealth)}get sharkHealth(){return this.defeated?0:this.shark?this.enemyHealth:null}get sharkDefeated(){return this.defeated}get hasAquaticLife(){return this.fish.length>0}addSchool(t,e){if(!e.length)return[];const n=R1[t],s=gu(n.body),r=gu(n.tail),a=new qi({vertexColors:!0,toneMapped:!1});return this.geometries.add(s).add(r),this.materials.add(a),e.map((o,c)=>{const l=Kt(Math.floor(o.x),Math.floor(o.z),this.world.salt^(c+1)*213)*Math.PI*2,h=new Hi;h.name="aquatic-"+t,h.userData.species=A1[t],h.position.copy(o),h.rotation.y=l;const d=new Se(r,a);d.position.z=n.tailOffset,h.add(new Se(s,a),d),this.scene.add(h);const u={kind:t,model:h,tail:d,home:o,destination:o.clone(),phase:l,waypoint:c,nextTurn:0};return this.fish.push(u),u})}consumeEvent(){return this.events.shift()??null}resetHealth(){this.playerHealth=Ma,this.immunity=3,this.timeSinceBite=0,this.chasing=!1,this.events.length=0}swimmerPoint(t){return this.bitePoint.set(t.x,t.y+.18,t.z),sc(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)||(this.bitePoint.y=t.y+1),sc(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)}openWaterLine(t,e){const n=Math.ceil(t.distanceTo(e)/.22);for(let s=1;s<n;s+=1)if(this.step.lerpVectors(t,e,s/n),!sc(this.world,this.step.x,this.step.y,this.step.z))return!1;return!0}canAttack(t){const e=this.shark;if(!e||this.defeated||!e.model.visible||this.health<=0||!this.swimmerPoint(t))return!1;const n=e.model.position,s=this.ray.origin.set(t.x,t.y+Bs(t),t.z).sub(n);if(s.lengthSq()>(ic+1.2)**2)return!1;const r=this.ray.direction.set(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch)),a=-e.model.rotation.y,o=(u,f)=>u*Math.cos(a)+f*Math.sin(a),c=(u,f)=>-u*Math.sin(a)+f*Math.cos(a);s.set(o(s.x,s.z),s.y,c(s.x,s.z)),r.set(o(r.x,r.z),r.y,c(r.x,r.z));const l=this.ray.intersectBox(this.sharkBox,this.rayHit);if(!l)return!1;const h=this.sharkBox.containsPoint(s)?0:l.distanceTo(s);if(h>ic)return!1;const d=xi(this.world,t,ic);return!d||d.distance>h+.055}attack(t){return this.canAttack(t)?(this.attackCooldown>0||(this.attackCooldown=.34,this.hitFlash=.22,this.enemyHealth=Math.max(0,this.enemyHealth-25),this.enemyHealth===0?(this.defeated=!0,this.fade=.7,this.events.push("サメを倒しました！")):this.events.push("サメにヒット！ 残り体力 "+this.enemyHealth)),!0):!1}update(t,e){const n=Math.min(.1,e);if(!Number.isFinite(n)||n<=0)return;this.attackCooldown=Math.max(0,this.attackCooldown-n),this.biteCooldown=Math.max(0,this.biteCooldown-n),this.immunity=Math.max(0,this.immunity-n),this.hitFlash=Math.max(0,this.hitFlash-n),this.timeSinceBite+=n;const s=this.swimmerPoint(t);!s&&this.timeSinceBite>=3&&this.playerHealth>0&&(this.playerHealth=Math.min(Ma,this.playerHealth+20*n)),this.sharkMaterial&&this.sharkMaterial.color.setHex(this.hitFlash>.01?16756823:16777215);for(const r of this.fish){if(r===this.shark&&this.defeated){this.fade=Math.max(0,this.fade-n),r.model.visible=this.fade>0,r.model.scale.setScalar(this.fade/.7),r.model.rotation.z=(1-this.fade/.7)*1.8;continue}const a=r.model.position;if(r.model.visible=a.distanceToSquared(this.target.set(t.x,t.y,t.z))<62**2&&cn(this.world,a,r.kind),!r.model.visible){cn(this.world,r.home,r.kind)&&a.copy(r.home);continue}const o=r===this.shark&&s&&this.health>0&&this.immunity<=0&&a.distanceToSquared(this.bitePoint)<w1**2&&r.home.distanceToSquared(this.bitePoint)<19**2&&this.openWaterLine(a,this.bitePoint);r===this.shark&&(o&&!this.chasing&&this.events.push("サメがこちらに向かっています！"),this.chasing=o,o&&a.distanceToSquared(this.bitePoint)<E1**2&&this.biteCooldown<=0&&(this.biteCooldown=1.4,this.timeSinceBite=0,this.playerHealth=Math.max(0,this.playerHealth-20),this.events.push(this.health>0?"サメにかまれた！ 体力 "+this.health:"体力がなくなりました。"))),r.nextTurn-=n,o?(this.target.copy(this.bitePoint),cn(this.world,this.target,r.kind)||(this.target.y=a.y)):((r.nextTurn<=0||a.distanceToSquared(r.destination)<.2)&&this.swimWaypoint(r),this.target.copy(r.destination)),this.swim(r,this.target,n,o?2.7:kd[r.kind].speed),r.phase+=n*(o?9.3:5.8),r.tail.rotation.y=Math.sin(r.phase)*(o?.37:.27),r.model.rotation.z=Math.sin(r.phase*.57)*.035}}swimWaypoint(t){t.nextTurn=1.4+t.waypoint%5*.23;for(let e=0;e<8;e+=1){const n=this.world.salt^Math.floor(t.home.x*276+t.home.z*61),s=++t.waypoint,r=Kt(s,939,n)*Math.PI*2,a=1+Kt(s,817,n)*(t.kind==="shark"?5:3.5);if(this.step.set(t.home.x+Math.cos(r)*a,t.home.y+(Kt(s,794,n)-.5)*.84,t.home.z+Math.sin(r)*a),cn(this.world,this.step,t.kind)){t.destination.copy(this.step);return}}t.destination.copy(t.home)}swim(t,e,n,s){const r=t.model.position,a=e.x-r.x,o=e.y-r.y,c=e.z-r.z,l=Math.hypot(a,o,c);if(l<.075)return;const h=Math.min(1,n*s/l);if(this.step.set(r.x+a*h,r.y+o*h,r.z+c*h),!cn(this.world,this.step,t.kind)&&(this.step.y=r.y,!cn(this.world,this.step,t.kind)&&(this.step.x=r.x,!cn(this.world,this.step,t.kind)&&(this.step.x=r.x+a*h,this.step.z=r.z,!cn(this.world,this.step,t.kind)))))return;const d=Math.atan2(this.step.x-r.x,this.step.z-r.z)-t.model.rotation.y;t.model.rotation.y+=Math.atan2(Math.sin(d),Math.cos(d))*Math.min(1,n*7),r.copy(this.step)}dispose(){for(const t of this.fish)t.model.removeFromParent();for(const t of this.geometries)t.dispose();for(const t of this.materials)t.dispose()}}const Zn=document.querySelector("#scene"),en=document.querySelector("#hud"),Dl=en.querySelector("#touch-controls"),vu=en.querySelector("#touch-fly"),D1=en.querySelector("#life-status"),L1=en.querySelector("#shark-status"),xu=en.querySelector("#life-health"),Mu=en.querySelector("#shark-health"),I1=en.querySelector("#life-health-number"),U1=en.querySelector("#shark-health-number"),N1=en.querySelector("#touch-attack"),ba=en.querySelector("#touch-rotate"),nl={stick:en.querySelector("#move-stick"),jump:en.querySelector("#touch-jump"),down:en.querySelector("#touch-down")};Zn.tabIndex=-1;const _i=new jx,ke=new Gx,X=new Ux((i,t)=>{zl(i,t).catch(e=>X.toast(Nn(e)))}),F1=["localhost","127.0.0.1","[::1]"].includes(location.hostname),Ka=new s1(F1?location.origin:"https://tk777-neonshift-scores.takesuke.chatgpt.site"),il=(new URLSearchParams(location.search).get("room")??"").trim().toUpperCase();let ie=null,li="y",di=0,pr=0,rc=0,Pa=0;const Od=["北","東","南","西"];let sl="";const Ll=()=>ke.configure(Ce.volume,Ce.muted,Ce.effectsVolume,Ce.ambientVolume);let k=null,Ce=Wx();const k1="tk777.webcraft.look",zd="tk777.webcraft.controls",Bd="tk777.webcraft.view";function O1(){try{return localStorage.getItem(Bd)==="kids"}catch{return!1}}function Hd(){const i=window.matchMedia("(pointer: coarse)").matches;return{coarse:i,touch:i||navigator.maxTouchPoints>0,mac:/^Mac/i.test(navigator.platform)}}function Vd(){const i=Hd();try{return cu(localStorage.getItem(zd),localStorage.getItem(k1),i)}catch{}return cu(null,null,i)}let mn=!1,mr=!1,ve=Vd(),Il=!1;function Ul(){return ve==="lock"?Hd().touch?"tablet":"drag":ve}let Da="",La=0,fi=0,Ia=0,ac=Promise.resolve(!0),Ss=0,gs=0,lr=0,pi="",yu=50,Mi=!1,Is=!1;try{Mi=!!Zn.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"})}catch{}const Nl="WebGL 2を利用できません。ChromeまたはEdgeのハードウェア アクセラレーションを有効にして、ブラウザーを再起動してください。";function Nn(i){return i instanceof DOMException?i.name==="QuotaExceededError"?"ブラウザーの保存容量が不足しています。ファイルへ書き出してバックアップしてください。":i.name==="SecurityError"||i.name==="NotAllowedError"?"ブラウザーのサイト設定で、このページのローカル保存を許可してください。":"保存領域にアクセスできませんでした。他のタブを閉じ、空き容量を確認してください。":i instanceof Error&&/[ぁ-龯]/u.test(i.message)?i.message:"処理を完了できませんでした。ページを開き直してお試しください。"}function Gd(i){return{generator:i.world.generator,bench:ie?.id===21&&i.world.get(ie.x,ie.y,ie.z)===21}}function Fr(i,t){return!!Qt[i]?.block&&i!==22&&(i!==21||t==="explore")}function ro(i){return!!i.online?.pendingExplore}function Pr(){const i=k,t=Dx(i.data.bag,i.data.mode,i.data.selected,Gd(i));return i.online&&i.data.mode==="creative"&&(t.items=t.items.filter(e=>Fr(e.id,"creative"))),i.online&&i.data.mode==="explore"&&(t.recipes=t.recipes.filter(e=>e.id!=="chest")),ie?.id===21&&(t.benchUses=i.world.benchUses(ie.x,ie.y,ie.z)),ie?.id===22&&(t.chest=i.world.chestAt(ie.x,ie.y,ie.z),i.data.mode==="creative"&&(t.palette=t.items,t.items=i.data.bag.slots.map(e=>({...e,name:Qt[e.id].name,maxDurability:Qt[e.id].maxDurability})))),t}function Us(){if(!k)return;const{world:i,data:t,player:e}=k,n=t.journey,s=i.landmarks.find(a=>a.kind==="cave"),r=i.landmarks.find(a=>Math.hypot(a.x-e.x,a.z-e.z)<12);r&&r.kind!==sl&&wt.active&&X.toast(r.name+"　"+{grove:"大樹の根元で建築用の原木を採れます。",cave:"坑道の壁に潮晶の鉱脈があります。",ruin:"回廊の床には持ち帰れる象眼タイルがあります。"}[r.kind]),sl=r?.kind??"",X.expedition(t.mode==="explore"&&!n.hidden?Rf(n,i.generator):"",Cf(n,e),t.mode==="explore"&&!n.hidden&&n.toolMade&&!n.caveVisited&&s?"岩窟 "+Ou(s,e):"")}function Wd(i,t=!1){if(!k||!wt.active)return!1;if(k.online&&k.data.mode==="creative")return t&&X.toast("共同建築ルームでは、建材を自由に選んで建築できます。"),!1;const e=k.land?.interact(k.player);return e?(X.toast(e),!0):!i||!(i.id===21||i.id===22&&!k.online)?(t&&X.toast(k.online?"作業台に照準を合わせてください。":k.land?"住民・動物・作業台・チェストに照準を合わせてください。":"作業台かチェストに照準を合わせてください。"),!1):(ie=i,yi(),X.inventory(Pr()),!0)}function z1(){if(!k)return;if(ro(k)){X.toast("素材の変更を確認しています。少し待ってください。");return}const{world:i,player:t,data:e}=k,n=xi(i,t);if(!n){X.toast("選びたい建材に照準を合わせてください。");return}if(k.online&&!Fr(n.id,e.mode)){X.toast("このブロックは共有ワールドで使えません。");return}const s=Za(n.id),r=e.bag.hotbar.indexOf(s);if(e.mode==="explore"&&!Un(e.bag,s)){X.toast("この建材は所持品にありません。");return}if(s===jn&&(di=n.id-jn),r>=0){Dr(r);return}wu(e.bag,e.selected,s,e.mode)?(In(),X.toast(Qt[s].name+"を選びました。")):X.toast("このブロックは選択できません。")}function B1(){if(!k)return;if(k.online){X.toast("共同建築では、置いたブロックを採掘して取り除けます。");return}if(k.data.mode!=="creative"){X.toast("元に戻す操作はクリエイティブで使えます。");return}const i=k,t=i.world.undo((e,n,s)=>so(i.player,e,n,s));Fe(),X.toast(t.message)}function In(){k&&(X.screen==="inventory"?X.inventory(Pr()):X.screen==="play"&&X.hud(Pr()))}function Fe(){Da="",La=0,pr=0,Pa=0,X.mining(0)}function Fl(i){i!==yu&&(yu=i,en.style.setProperty("--aim-y",i+"%"))}function Xd(){const i=k;if(!(!i||!["play","pause","ready"].includes(X.screen))){i.kids?(i.kidsPitch=i.player.pitch,i.player.pitch=i.originalPitch):(i.originalPitch=i.player.pitch,i.player.pitch=i.kidsPitch),i.kids=!i.kids,wt.rememberView(i.player),wt.mining=!1,wt.cancelPlacementTap(),Fe(),fi=0,i.view.kidsCamera.reset(),Fl(50),pi="",X.showViewMode(i.kids);try{localStorage.setItem(Bd,i.kids?"kids":"original")}catch{}}}function Dr(i){!k||!Number.isInteger(i)||i<0||i>8||(k.data.selected=i,Fe(),In(),Na(k))}function yi(){wt.stop(),k&&wd(k.player),ke.setPlaying(!1),Fe(),fi=0,Ia=0,Ss=0}function ao(){!k||!wt.active||(yi(),X.pause(!1,ve))}function qd(){!k||!wt.active||(ie=null,yi(),X.inventory(Pr()))}function Yd(i){const t=i&&ve==="tablet";Dl.hidden=!t,vu.hidden=k?.data.mode!=="creative";const e=!!k?.player.flying;return vu.setAttribute("aria-pressed",String(e)),nl.jump.textContent=e?"上昇":"ジャンプ",nl.down.textContent=e?"下降":"しゃがむ",t}function jd(i){!k||!wt.active||(i&&ve==="lock"&&(ve=Ul()),X.play(i,Il,wt.pending,Yd(i)),X.hud(Pr()),Us())}function Ua(i){if(!(!k||!["ready","pause","inventory"].includes(X.screen))){if(!Mi){X.pause(!1,ve,"描画の復旧を待っています。ワールドを書き出すこともできます。");return}if(k.online&&(!k.online.ready||k.online.ended)){X.toast(k.online.ended?"退出してルームに参加し直してください。":"共有ワールドの読み込みが完了するまでお待ちください。");return}ie=null,Il=!k.data.guideSeen,ve=i,Is=!1,Ss=0,gs=0,lr=0,ke.unlock(),ke.setPlaying(!0),wt.start(i!=="lock"),wt.pending&&jd(!1)}}function H1(i,t){k&&wt.applyLook(k.player,i,t,Ce.sensitivity,Ce.invertY)}const gr={conflict:"ほかの人が先にこの場所を変更しました。照準を合わせ直してください。",range:"ブロックにもう少し近づいてください。",blocked:"ここは設置・採掘できません。建材や人が重なっていない場所を選んでください。",limit:"このルームで共有できるブロック変更数に達しました。",uncertain:"通信を確認しています。建築の結果が画面に反映されるまでお待ちください。",offline:"接続が戻ると建築できます。",invalid:"編集内容を共有できませんでした。照準を合わせ直してください。"};function Kd(i,t,e){const{key:n,block:s,before:r}=t,a=n&255,o=n>>>16,c=n>>>8&255,l=s===0,h=l?r:s;i.view.effect(a,o,c,h,l?"mine":"place"),ke.sound(l?"mine":"place",h),l&&i.data.mode==="explore"&&ke.sound("pickup"),!l&&i.data.mode==="explore"&&ku(i.data.journey,h,{x:a,y:o,z:c})&&Us(),X.toast(e??Qt[h].name+(l?"を取り除きました。":"を置きました。"))}function kl(i){const t=i.online,e=t?.pendingExplore;!t?.sync||!e||t.editing||t.ended||t.state!=="connected"||(t.editing=!0,t.sync.edit(e.edit).then(n=>{if(k===i){if(!n.ok&&!["conflict","range","blocked","limit","invalid"].includes(n.reason??"")){n.reason==="uncertain"&&X.toast(gr.uncertain);return}t.pendingExplore=void 0,n.ok?(i.data.bag=e.after,Kd(i,e.edit,e.message),In()):X.toast(gr[n.reason??""]??gr.invalid),hn(i)}}).catch(n=>{k===i&&X.toast(Nn(n))}).finally(()=>{t.editing=!1}))}function $d(i,t,e,n,s,r="y",a,o){const c=i.online;if(!c?.ready||c.ended||c.state!=="connected"||!c.sync){X.toast(gr.offline);return}if(c.editing||c.pendingExplore)return;const l=i.world.get(t,e,n),h=Ne(t,e,n),d={key:h,before:l,fromRevision:c.versions.get(h)??0,block:s,axis:r};if(a){c.pendingExplore={edit:{...d,actionId:crypto.randomUUID()},after:a,message:o},hn(i),kl(i);return}c.editing=!0,c.sync.edit(d).then(u=>{if(k===i){if(!u.ok){X.toast(gr[u.reason??""]??"共同建築の変更を確認できませんでした。");return}Kd(i,d)}}).catch(u=>{k===i&&X.toast(Nn(u))}).finally(()=>{c.editing=!1})}function Zd(){if(!k||!wt.active)return;const{world:i,player:t,data:e,view:n}=k,s=xi(i,t);if(!t.crouched&&Wd(s))return;if(s&&k.land?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz)){X.toast("住民や動物がいる場所には置けません。");return}const r=s&&e.mode==="creative"?i.capture(s.x+s.nx,s.y+s.ny,s.z+s.nz):null,a=e.bag.hotbar[e.selected],o=a===jn?jn+di:a;if(k.online){if(ro(k))return;const l=Rl(i,t,e.bag,e.mode,e.selected,s);if(l||!s){X.toast(l??"設置したい面に照準を合わせてください。");return}if(!Fr(a,e.mode)){X.toast("共有ワールドで使える建材を選んでください。");return}const h=e.mode==="explore"?structuredClone(e.bag):void 0;if(h&&!Du(h,a))return;$d(k,s.x+s.nx,s.y+s.ny,s.z+s.nz,o,a===5?li:"y",h),Fe();return}const c=yx(i,t,e.bag,e.mode,e.selected,s,o);if(c.ok&&s){const l=s.x+s.nx,h=s.y+s.ny,d=s.z+s.nz;a===5&&i.setAxis(l,h,d,li),r&&i.remember(r),e.mode==="explore"&&ku(e.journey,a,{x:l,y:h,z:d})&&Us(),n.effect(l,h,d,a,"place"),ke.sound("place",a),In(),Fe()}X.toast(c.message)}function Jd(){!k||!wt.active||(k.data.bag.hotbar[k.data.selected]===jn?(di=(di+1)%4,X.toast("滑り台の下り方向　"+Od[di])):(li=li==="y"?"x":li==="x"?"z":"y",X.toast("原木の向き　"+{x:"東西",y:"縦",z:"南北"}[li])))}function Ol(i){if(!k||!wt.active)return;const{world:t,player:e,data:n,view:s}=k,r=xi(t,e);if(!wt.mining||!r){Da&&Fe();return}if(fi>0||k.online?.editing||ro(k))return;const a=[r.x,r.y,r.z,r.id,n.selected].join("/");if(a!==Da&&(Fe(),Da=a),r.id===14){X.toast("岩盤は掘れません。"),wt.mining=!1,Fe();return}const o=n.bag.hotbar[n.selected],c=n.mode==="creative"||Un(n.bag,o)?o:0,l=gf(r.id,c,n.mode);if(!Number.isFinite(l)){X.toast("この素材にはツルハシが必要です。"),wt.mining=!1,Fe();return}if(La+=i,pr=Math.min(1,La/l),X.mining(pr),Pa-=i,Pa<=0&&i>0&&pr<.96&&(ke.sound("tap",r.id),Pa=.32),La<l&&!(n.mode==="creative"&&i===0))return;if(k.online){if(!Fr(r.id,n.mode)){X.toast("このブロックは共有ワールドで取り除けません。"),wt.mining=!1,Fe();return}const u=n.mode==="explore"?Pu(n.bag,r.id,c):void 0;if(u&&!u.draft){X.toast(u.message),wt.mining=!1,Fe();return}k.online.state!=="connected"&&(wt.mining=!1),$d(k,r.x,r.y,r.z,0,"y",u?.draft,u?.message),Fe(),fi=.15;return}const h=n.mode==="creative"?t.capture(r.x,r.y,r.z):null,d=Mx(t,e,n.bag,n.mode,n.selected,r);d.ok?(h&&t.remember(h),s.effect(r.x,r.y,r.z,r.id,"mine"),ke.sound(d.message.includes("壊れ")?"break":"mine",r.id),n.mode==="explore"&&ke.sound("pickup"),In()):wt.mining=!1,X.toast(d.message),Fe(),fi=n.mode==="creative"?.15:.11}function Qd(){if(!k||!wt.active)return;const{player:i,data:t}=k;if(t.mode!=="creative"){X.toast("飛行はクリエイティブモードで使えます。");return}i.flying=!i.flying,i.vy=0;const e=Yd(wt.drag);X.toast(i.flying?e?"飛行中：上昇・下降ボタンで高さを変えられます。":"飛行中：Spaceで上昇、Ctrlで下降":"飛行を終了しました。")}function rl(){const i=k,t=i?.aquatic;return!i||!t||!wt.active||!t.attack(i.player)?!1:(wt.mining=!1,Fe(),t.sharkDefeated&&!i.data.sharkDefeated&&(i.data.sharkDefeated=!0,hn(i)),!0)}function V1(i){const t=i.world.spawn();let e;try{e=Rr(i.world,t)}catch{e=Rr(i.world,{...t,y:Rn+3})}Object.assign(i.player,Al({...e,pitch:i.kids?i.kidsPitch:e.pitch})),i.kids||(i.originalPitch=i.player.pitch),wt.reset(),wt.rememberView(i.player),Fe(),fi=0,i.view.kidsCamera.reset(),i.aquatic?.resetHealth(),X.toast("岸に戻りました。持ち物は引き継がれています。")}function tf(i,t){const e=i.aquatic,n=e?.health??100,s=e?.sharkHealth??100,r=!!e?.hasAquaticLife&&(i.player.inWater||n<100);D1.hidden=!r&&!t,L1.hidden=!t,N1.hidden=!t||!wt.drag,xu.value!==n&&(xu.value=n,I1.textContent=String(n)),Mu.value!==s&&(Mu.value=s,U1.textContent=String(s))}const wt=new Ox(Zn,{pause:ao,inventory:qd,place:Zd,select:Dr,look:H1,beginMine:()=>{rl()||Ol(0)},pick:z1,undo:B1,viewMode:Xd,attack:()=>{!rl()&&k?.aquatic&&X.toast("近くのサメに照準を合わせてください。")},rotate:Jd,interact:()=>{k&&Wd(xi(k.world,k.player),!0)},home:()=>{if(k){const{x:i,y:t,z:e}=k.player;k.data.journey.home={x:i,y:t,z:e},Us(),X.toast("現在地を拠点に登録しました。")}},guide:()=>{k&&(k.data.journey.hidden=!k.data.journey.hidden,Us())},cycle:i=>{k&&Dr((k.data.selected+i+9)%9)},fly:Qd,debug:()=>{mr=!mr,mr||X.debug("")},dragChanged:jd,background:()=>{k&&hn(k)},recovery:i=>{k&&(yi(),ve=Ul(),X.pause(!1,ve,i))}},nl);function ef(i){const{x:t,y:e,z:n,yaw:s,pitch:r}=i.player;return{...i.data,sharkDefeated:i.aquatic?.sharkDefeated??i.data.sharkDefeated,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:i.player.crouched},flying:i.player.flying,edits:i.world.exportEdits(),fixtures:i.world.exportFixtures(),journey:structuredClone(i.data.journey),settings:{...Ce},bag:structuredClone(i.data.bag)}}function hn(i){if(i.online){if(i.data.mode==="explore"){const{x:t,y:e,z:n,yaw:s,pitch:r,crouched:a}=i.player;l1(i.online.connection.room.code,i.online.nickname,{bag:i.data.bag,selected:i.data.selected,journey:i.data.journey,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:a},pending:i.online.pendingExplore})}return Promise.resolve(!0)}return ac=ac.then(async()=>{if(i!==k)return!0;X.status("保存中…");try{const t=await _i.write(ef(i),i.data.revision||null);return i.data.revision=t.revision,i.data.updatedAt=t.updatedAt,X.status("保存済み"),!0}catch(t){return X.status("保存失敗："+Nn(t)),!1}}),ac}function Na(i){if(i.online&&i.data.mode==="explore")return hn(i)}async function _r(){if(k){const i=k;if(yi(),i.online?.sync?.close(),!await hn(i)&&!window.confirm("保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？")){X.pause(!1,ve);return}nf(i),i.view.dispose(),k=null}X.onlineSession(null),X.title(!1);try{const i=await _i.list();X.screen==="title"&&X.title(!!i.length)}catch(i){X.screen==="title"&&X.status("保存領域："+Nn(i))}}function nf(i){i.land?.dispose(),i.aquatic?.dispose()}function Fa(i){X.onlineSession({code:i.connection.room.code,count:i.count,state:i.state})}function G1(i,t,e){const{player:n,world:s}=i;let r=!1;for(const o of e.cells){const{key:c,block:l,axis:h,revision:d}=o;if((t.versions.get(c)??0)>=d)continue;const u=c&255,f=c>>>16,g=c>>>8&255;s.get(u,f,g)!==l&&s.set(u,f,g,l)&&oi(l)&&so(n,u,f,g)&&(r=!0),l===5&&s.setAxis(u,f,g,h),t.versions.set(c,d)}if(r){const{x:o,y:c,z:l}=Rr(s,n,!0);Object.assign(n,{x:o,y:c,z:l,vy:0}),wd(n)}const a=e.players.filter(o=>o.id!==t.connection.id);if(!t.ready&&!t.restoring&&a.length)for(const[o,c]of[[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,2],[2,-2]]){const l=Rr(s,{...n,x:n.x+o,z:n.z+c});if(a.every(({pose:h})=>Math.hypot(l.x-h.x,l.z-h.z)>1.2)){Object.assign(n,{x:l.x,y:l.y,z:l.z});break}}i.view.actors.setPlayers(a),t.count!==a.length+1&&(t.count=a.length+1,Fa(t)),t.ready=!0,pi="",ie?.id===21&&s.get(ie.x,ie.y,ie.z)!==21&&(ie=null,In(),X.toast("作業台が取り除かれました。")),kl(i)}function W1(i,t){Fa(t),t.sync=Ka.start(t.connection,{pose:()=>{if(k!==i)return null;const{x:e,y:n,z:s,yaw:r,crouched:a,flying:o,vx:c,vz:l}=i.player;return{x:e,y:n,z:s,yaw:r,crouched:a,flying:o,moving:Math.hypot(c,l)>.18}},onFrame:e=>{k===i&&G1(i,t,e)},onState:e=>{k===i&&(t.state=e,Fa(t),kl(i))},onEnd:e=>{k===i&&(t.ended=!0,t.state="reconnecting",Fa(t),yi(),X.pause(!1,ve,Nn(e)))}})}async function Sa(i,t,e,n="",s=""){if(k||mn)return;if(!Mi){X.error(Nl);return}mn=!0;let r;try{e&&(X.loading("ルームに接続中…"),r=await e()),X.loading("森と湖を準備しています…");const a=i?await _i.get(i):void 0;if(i&&!a)throw new Error("ワールドが見つかりません。一覧を開き直してください。");const o=r?.room.seed||a?.seed||t?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8),c=t?.stage,l=r?"classic":a?.stage??(Cl(c)?c:"classic");let h=-1;const d=await to.generate(o,M=>{const E=Math.min(10,Math.floor(M*10));h!==E&&(X.loading("地形を生成中　"+E*10+"%"),h=E)},r?.room.generator??a?.generator??2,l);a&&(d.loadEdits(a.edits),d.loadFixtures(a.fixtures));const u=d.spawn(),f=r?.room.mode??(l!=="classic"?"creative":t?.mode??a?.mode??"creative"),g=r&&f==="explore"?c1(r.room.code,s):void 0,_=a??{format:"webcraft777",version:2,generator:2,id:crypto.randomUUID(),fixtures:Iu(),journey:g?.journey??Nu(),revision:0,updatedAt:Date.now(),name:r?.room.name||t?.name.trim().slice(0,64)||"新しいワールド",seed:o,mode:f,stage:l,pose:g?.pose??u,flying:!1,bag:g?.bag??ff(f),selected:g?.selected??0,edits:[],day:.39,settings:{...Ce},guideSeen:!1};if(!a&&l!=="classic"&&(_.bag.hotbar=[7,8,10,27,28,29,jn,9,12]),!_.journey.home){const{x:M,y:E,z:y}=u;_.journey.home={x:M,y:E,z:y}}ie=null,li="y",di=0,sl="",Ce={..._.settings},Ll();const m=Al(Rr(d,_.pose,!!(a||g)));m.flying=_.mode==="creative"&&_.flying;const p=new Px(Zn,d);if(k={world:d,data:_,player:m,view:p,kids:O1(),originalPitch:m.pitch,kidsPitch:-.43},k.kids&&(m.pitch=k.kidsPitch),p.configure(Ce),pi="",Fl(50),wt.rememberView(m),Is=!1,ve=Vd(),r){const M={connection:r,state:"connecting",count:1,ready:!1,ended:!1,editing:!1,versions:new Map,nickname:s,restoring:!!g,pendingExplore:g?.pending};k.online=M,W1(k,M)}else l!=="flat"&&(l==="classic"&&(k.land=new S1(d,p.scene,m)),k.aquatic=new P1(d,p.scene,_.sharkDefeated));tf(k,!1),X.setWorld(_.name),X.showViewMode(k.kids),X.pause(!0,ve),!a&&!r&&await hn(k),mr=!1}catch(a){k?.online?.sync?k.online.sync.close():r&&Ka.leave(r),k&&(nf(k),k.view.dispose(),k=null),X.onlineSession(null),e?X.onlineMenu(n,Nn(a)):(console.error(a),X.error(Nn(a)))}finally{mn=!1}}async function X1(){const i=k?.online?.connection.room.code;if(!i)return;const t=new URL(location.href);t.searchParams.set("room",i);try{await navigator.clipboard.writeText(t.href),X.toast("招待リンクをコピーしました。")}catch{window.prompt("招待リンクをコピーしてください。",t.href)}}async function sf(){try{const i=await _i.list();X.worlds(i)}catch(i){X.worlds([]),X.status("保存失敗："+Nn(i))}}async function q1(i){if(!(!i||mn)){mn=!0;try{if(i.size>128*1024*1024)throw new Error("バックアップは128 MBまで読み込めます。");const{save:t,original:e}=qx(await i.text()),n=await to.generate(t.seed,void 0,t.generator,t.stage);n.loadEdits(t.edits),n.loadFixtures(t.fixtures);const s=(await _i.list()).find(r=>r.id===t.id);if(s&&!await X.confirmImport(s.name))return;await _i.write(e??t,s?.revision??null),await sf(),X.status("読み込み・保存が完了しました。")}catch(t){X.status("読み込み失敗："+Nn(t))}finally{mn=!1}}}async function bu(i,t=!1){const e=i?t?await _i.original(i):await _i.get(i):k?ef(k):void 0;if(t&&!e){X.toast("このワールドには旧版の保管データがありません。");return}if(!e)throw new Error("書き出すワールドが見つかりません。");rf("ウェブクラフト777-"+e.name.replace(/[\\/:*?"<>|]/g,"_")+".json",Yx(e)),X.status("バックアップファイルを書き出しました。")}function rf(i,t){const e=URL.createObjectURL(new Blob([t],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=i,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),6e4)}async function zl(i,t){if(!(mn&&!["resume","resume-drag","resume-lock","resume-tablet","dismiss-guide"].includes(i))){if(k&&ro(k)&&["assign","craft","split","sort"].includes(i)){X.toast("素材の変更を確認しています。少し待ってください。");return}switch(i){case"goto-create":X.create();break;case"online-menu":X.onlineMenu(il);break;case"online-create":ke.unlock(),await Sa(null,void 0,()=>Ka.create(t),"",t.nickname);break;case"online-join":ke.unlock(),await Sa(null,void 0,()=>Ka.join(t),t.code,t.nickname);break;case"online-copy":await X1();break;case"online-leave":if(k?.online){mn=!0;try{await _r()}finally{mn=!1}}break;case"goto-worlds":await sf();break;case"goto-help":X.help();break;case"goto-settings":X.settings(Ce);break;case"back":k?X.screen==="inventory"?Ua(ve):X.pause(!1,ve):await _r();break;case"title":if(!mn){mn=!0;try{await _r()}finally{mn=!1}}break;case"start":ke.unlock(),await Sa(null,t);break;case"load":ke.unlock(),await Sa(t);break;case"resume":Ua(ve);break;case"resume-drag":case"resume-lock":case"resume-tablet":{const e=i==="resume-tablet"?"tablet":i==="resume-drag"?"drag":"lock";try{localStorage.setItem(zd,e)}catch{}Ua(e);break}case"diagnostics":if(k){wt.setDiagnostics(!0);const e=wt.report(),n="視点入力 "+e.lookEvents+" 回　フレーム "+e.frames+" 回　異常 "+e.anomalies+" 件";X.diagnostics(e.lastIssue?n+`
`+e.lastIssue:n,JSON.stringify(e,null,2))}break;case"export-diagnostics":k&&rf("ウェブクラフト777-入力診断.json",JSON.stringify(wt.report(),null,2));break;case"reset-input":k&&(yi(),wt.rememberView(k.player),ve=Ul(),X.pause(!1,ve,"入力をリセットしました。「再開」から操作できます。"));break;case"pause":ao();break;case"attack-shark":rl();break;case"rotate-material":Jd();break;case"view-mode":Xd();break;case"touch-fly":Dl.hidden||Qd();break;case"inventory":qd();break;case"select":Dr(t);break;case"assign":k&&(!k.online||Fr(t.id,k.data.mode))&&wu(k.data.bag,t.slot,t.id,k.data.mode)&&(In(),Na(k),X.toast("ホットバーに登録しました。"));break;case"craft":if(k&&k.data.mode==="explore"&&X.screen==="inventory"){const e=t.count??1,n=t.id??t;if(k.online&&n==="chest"){X.toast("共有ワールドでは作業台を使えます。");break}const s=mf(k.data.bag,n,e,Gd(k));s.ok&&(ie?.id===21&&k.world.useBench(ie.x,ie.y,ie.z,e),Tf(k.data.journey,n),ke.sound("craft"),In(),Na(k)),X.toast(s.message)}break;case"mine-down":wt.active&&(wt.mining=!0,Ol(0));break;case"mine-up":wt.mining=!1,Fe();break;case"place":Zd();break;case"supply":{if(k&&X.screen==="inventory"&&ie?.id===22){const e=Mf(k.data.bag,k.data.mode,t.id,t.count);X.toast(e.message),e.ok&&In()}break}case"split":case"sort":case"transfer":case"transfer-all":{if(!k||X.screen!=="inventory")break;const e=k.data.bag,n=ie?.id===22?k.world.chestAt(ie.x,ie.y,ie.z):void 0,s=t?.side==="chest"?"chest":"bag",r=s==="bag"?e.slots:n;if(!r)break;const a=i==="sort"?vf(r):i==="split"?_f(r,t.index):n?i==="transfer-all"?yf(e,n,s):Lu(e,n,s,t.index,t.half):void 0;a&&(X.toast(a.message),a.ok&&(In(),Na(k)));break}case"preset":{if(Object.hasOwn(Oa,t)){const e=t;await zl("settings-change",{...Ce,...Oa[e],quality:e}),X.settings(Ce)}break}case"original":await bu(t,!0);break;case"save":k&&await hn(k);break;case"settings-change":hl(t)&&(Ce={...t},Xx(Ce),k?.view.configure(Ce),pi="",Ll());break;case"dismiss-guide":k&&(k.data.guideSeen=!0),Il=!1;break;case"import":await q1(t);break;case"export":await bu(t);break}}}document.addEventListener("keydown",i=>{if(i.repeat||i.defaultPrevented||wt.active||document.querySelector("dialog[open]"))return;const t=/^Digit([1-9])$/.exec(i.code);if(X.screen==="inventory"&&t){i.preventDefault(),Dr(Number(t[1])-1);return}X.screen==="inventory"&&(i.code==="KeyE"||i.code==="Escape")?(i.preventDefault(),i.code==="Escape"?X.pause(!1,ve):Ua(ve)):i.code==="Escape"&&["settings","help","create","worlds","diagnostics","online"].includes(X.screen)&&(i.preventDefault(),zl("back"))});Zn.addEventListener("webglcontextlost",i=>{i.preventDefault(),Mi=!1,ao(),k&&hn(k),X.error("3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。")});Zn.addEventListener("webglcontextlost",i=>{i.preventDefault(),Mi=!1,Is=!0,yi(),k?(X.pause(!1,ve,"3D描画を中断しました。復旧後に再開できます。"),hn(k)):X.error(Nl)});Zn.addEventListener("webglcontextrestored",()=>{Mi=!0,Is=!1,pi="",k?(k.view.configure(Ce),X.pause(!1,ve,"3D描画が復旧しました。操作を再開できます。")):_r()});window.addEventListener("pagehide",i=>{k&&(wt.active&&ao(),k.online?(hn(k),i.persisted||k.online.sync?.close()):hn(k))});window.setInterval(()=>{k&&!document.hidden&&hn(k)},25e3);function af(i){if(requestAnimationFrame(af),!k||!Mi||Is||document.hidden){Ss=0;return}try{Y1(i)}catch(t){Is=!0,wt.fail(t),console.error(t)}}function Y1(i){if(!k)return;const t=k,e=Ss?(i-Ss)/1e3:0,n=Math.min(e,.1);if(Ss=i,wt.active){const _=t.player,m=wt.movement(),p=_.x,M=_.z;if(!wt.frame(_,e))return;vx(t.world,_,m,n,Ce),ke.environment(t.world,_,n),t.land?.update(_,n,t.data.day);const E=t.aquatic;E?.update(_,n);const y=E?.consumeEvent();y&&X.toast(y),E&&E.health<=0&&V1(t),rc-=n,rc<=0&&(rc=.24,t.data.mode==="explore"&&Af(t.data.journey,t.world,_,t.data.bag),Us()),Ia+=Math.hypot(p-_.x,M-_.z),Ia>1.8&&(Ia=0,_.grounded&&!_.flying&&ke.sound("step",t.world.get(Math.floor(_.x),Math.floor(_.y-.05),Math.floor(_.z)))),t.data.day=t.online?(.39+Math.max(0,Date.now()-t.online.connection.room.createdAt)/6e5)%1:(t.data.day+n/600)%1,fi=Math.max(0,fi-n),Ol(n)}const s=wt.active?xi(t.world,t.player):null;if(wt.active)pi="";else{const _=Zn.clientWidth+"/"+Zn.clientHeight+"/"+t.data.id;if(pi===_&&!t.view.stats.queued)return;pi=_}const r=wt.active&&!!t.aquatic?.canAttack(t.player),a=wt.active&&!r?t.land?.targetLabel(t.player,s?.distance):null;wt.active&&tf(t,r);const o=t.data.bag.hotbar[t.data.selected],c=s&&!t.player.crouched&&(t.online?t.data.mode==="explore"&&s.id===21:[21,22].includes(s.id)),l=o===jn;ba.hidden=!wt.active||!wt.drag||!l||r;const h="向き "+Od[di];!ba.hidden&&ba.textContent!==h&&(ba.textContent=h);const d=s&&!c&&!r&&!a&&Qt[o]?.block&&!wt.mining?{x:s.x+s.nx,y:s.y+s.ny,z:s.z+s.nz,id:l?jn+di:o,axis:li,valid:!Rl(t.world,t.player,t.data.bag,t.data.mode,t.data.selected,s)&&!t.land?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz)}:null,u=Dl.hidden?"右クリック":"タップ";X.target(r?wt.drag?"サメ　攻撃ボタン / X":"サメ　左クリック / X":a?a+"　"+u+"で話す":c?u+(s.id===21?"で作業台":"でチェスト"):"");const f=Math.hypot(t.player.vx,t.player.vz),g=t.data.mode==="creative"||Un(t.data.bag,o)?o:0;if(t.view.update(t.player,s,t.data.day,wt.active?n:0,{active:wt.active,held:g,mining:pr,preview:d,moving:Ce.bob&&t.player.grounded&&f>.15,sprinting:f>4.5},t.kids?{player:t.player,hit:s}:void 0),t.kids&&Fl(Math.round(t.view.kidsCamera.reticle.y*20)/20),wt.active&&mr){if(lr++,!gs)gs=i,lr=0;else if(i-gs>600){const{x:_,y:m,z:p}=t.player,M=t.view.stats;X.debug(Math.round(lr*1e3/(i-gs))+" FPS　描画 "+M.draws+" 回　チャンク "+M.chunks+`
三角形 `+M.triangles.toLocaleString("ja-JP")+"　更新 "+M.chunkMs.toFixed(1)+" ms　待ち "+M.queued+`
形状 `+M.geometries+" 個　テクスチャ "+M.textures+` 個
座標 `+[_,m,p].map(E=>E.toFixed(1)).join(" / ")),lr=0,gs=i}}}Ll();_r().then(()=>{Mi?/^[A-HJ-NP-Z2-9]{8}$/.test(il)&&X.screen==="title"&&X.onlineMenu(il):X.error(Nl)});requestAnimationFrame(af);
