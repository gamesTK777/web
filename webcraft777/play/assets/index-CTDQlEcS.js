(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Qa=27,fi=64,Kn=30,Hr={name:"滑り台パーツ",color:"#e5ab52",block:!0},to=i=>i>=31&&i<=33?Kn:i,Qt={1:{name:"草地",color:"#89ac57",block:!0},2:{name:"土",color:"#9a6e4a",block:!0},3:{name:"石",color:"#889594",block:!0},4:{name:"砂",color:"#e5cf91",block:!0},5:{name:"原木",color:"#926541",block:!0},6:{name:"葉",color:"#659650",block:!0},7:{name:"木材",color:"#c69562",block:!0},8:{name:"丸石",color:"#839593",block:!0},9:{name:"石レンガ",color:"#a1aaa0",block:!0},10:{name:"朝霧ガラス",color:"#b7e3db",block:!0},11:{name:"石炭鉱石",color:"#666e74",block:!0},12:{name:"灯晶ブロック",color:"#ffce68",block:!0},13:{name:"水",color:"#65b4cb",block:!1},14:{name:"岩盤",color:"#404b4c",block:!1},15:{name:"石炭",color:"#47545c",block:!1},16:{name:"棒",color:"#b28a60",block:!1},17:{name:"木のツルハシ",color:"#bd9265",block:!1,maxDurability:36},18:{name:"石のツルハシ",color:"#839fa7",block:!1,maxDurability:90},19:{name:"木の斧",color:"#c58e61",block:!1,maxDurability:36},20:{name:"石の斧",color:"#8ba39b",block:!1,maxDurability:90},21:{name:"作業台",color:"#bc905c",block:!0},22:{name:"収納チェスト",color:"#ba793e",block:!0},23:{name:"潮晶鉱石",color:"#58c2bf",block:!0},24:{name:"潮晶のかけら",color:"#6ce5db",block:!1},25:{name:"青磁のランタン",color:"#75e8d9",block:!0},26:{name:"潮晶の象眼タイル",color:"#72bfb0",block:!0},27:{name:"ジャンプ台（小）",color:"#62c8a2",block:!0},28:{name:"ジャンプ台（中）",color:"#6eaee8",block:!0},29:{name:"ジャンプ台（大）",color:"#d892dd",block:!0},30:Hr,31:Hr,32:Hr,33:Hr},It=(i,t)=>({id:i,count:t});function Ie(i,t,...e){return{id:i,name:Qt[t.id].name,inputs:e,output:t}}const Pu=[Ie("boards",It(7,4),It(5,1)),Ie("sticks",It(16,4),It(7,2)),Ie("wood-pick",It(17,1),It(7,3),It(16,2)),Ie("wood-axe",It(19,1),It(7,3),It(16,2)),Ie("stone-pick",It(18,1),It(8,3),It(16,2)),Ie("stone-axe",It(20,1),It(8,3),It(16,2)),Ie("bricks",It(9,4),It(8,4)),Ie("glass",It(10,4),It(4,3),It(15,1)),Ie("lamp",It(12,2),It(7,2),It(15,1)),Ie("bench",It(21,1),It(7,4)),Ie("chest",It(22,1),It(7,6)),Ie("jump-small",It(27,1),It(7,4),It(16,2)),Ie("jump-medium",It(28,1),It(7,5),It(8,4)),Ie("jump-large",It(29,1),It(7,6),It(8,8)),Ie("slide-part",It(30,3),It(7,6)),{...Ie("crystal-lamp",It(25,2),It(24,1),It(12,1)),bench:!0},{...Ie("inlaid-tile",It(26,8),It(24,1),It(8,4)),bench:!0},{...Ie("crystal-cut",It(24,2),It(10,2),It(15,1)),bench:!0,legacy:!0}];function eo(i){return typeof i=="number"&&Number.isInteger(i)&&Object.hasOwn(Qt,i)&&i!==13&&i!==14&&to(i)===i}function hl(i){if(!i||typeof i!="object")return!1;const{slots:t,hotbar:e}=i;return!Array.isArray(e)||e.length!==9||!Array.from(e).every(n=>n===0||eo(n))?!1:Du(t)}function Du(i){return!Array.isArray(i)||i.length>Qa?!1:Array.from(i).every(t=>{if(!t||!eo(t.id)||!Number.isInteger(t.count)||t.count<1||t.count>fi)return!1;const e=Qt[t.id].maxDurability;return e===void 0?t.durability===void 0:t.count===1&&Number.isInteger(t.durability)&&t.durability>=1&&t.durability<=e})}function yd(i){return{slots:[],hotbar:i==="creative"?[1,2,3,5,7,8,9,10,12]:Array(9).fill(0)}}function Nn(i,t){return i.slots.find(e=>e.id===t)}function Mr(i,t){return i.slots.reduce((e,n)=>e+(n.id===t?n.count:0),0)}function Lu(i,t,e,n){if(!Number.isInteger(t)||t<0||t>=9||!eo(e)||(n==="creative"?!Qt[e].block:!Nn(i,e)))return!1;const s=i.hotbar.indexOf(e);return s>=0&&(i.hotbar[s]=i.hotbar[t]),i.hotbar[t]=e,!0}const no=i=>({slots:i.slots.map(t=>({...t})),hotbar:[...i.hotbar]});function Iu(i,t){if(i.hotbar.includes(t))return;let e=i.hotbar.indexOf(0);e<0&&(e=i.hotbar.findIndex(n=>!Nn(i,n))),e>=0&&(i.hotbar[e]=t)}function ul(i,t,e){const n=Qt[t].maxDurability;if(!n)for(const s of i.slots){if(s.id!==t)continue;const r=Math.min(e,fi-s.count);if(s.count+=r,e-=r,!e)break}for(;e>0;){if(i.slots.length>=Qa)return!1;const s=n?1:Math.min(e,fi);i.slots.push(n?{id:t,count:1,durability:n}:{id:t,count:s}),e-=s}return Iu(i,t),!0}function Uu(i,t,e){const n=i.slots.filter(s=>s.id===t).sort((s,r)=>s.count-r.count);for(const s of n){const r=Math.min(s.count,e);if(s.count-=r,e-=r,!e)break}i.slots=i.slots.filter(s=>s.count>0)}function fl(i,t){return Math.min(...t.inputs.map(e=>Math.floor(Mr(i,e.id)/e.count)))}function Nu(i,t){for(const e of t.inputs)Uu(i,e.id,e.count);return ul(i,t.output.id,t.output.count)}function dl(i,t,e){return t.legacy&&e?.generator!==1?"旧ワールド専用の加工です。":Fu(t,e?.generator??1)&&!e?.bench?"作業台を右クリックして作ります。":fl(i,t)?"":"材料が足りません。"}function Fu(i,t){return!!(i.bench||t===2&&["stone-pick","stone-axe","bricks","glass"].includes(i.id))}function bd(i,t,e){if(dl(i,t,e))return 0;const n=fl(i,t);if(!n)return 0;const s=no(i);let r=0;for(;r<n&&Nu(s,t);)r++;return r}function Sd(i,t,e=1,n){const s=Pu.find(o=>o.id===t);if(!s||!Number.isSafeInteger(e)||e<1)return{ok:!1,message:"レシピか制作数を確認してください。"};const r=dl(i,s,n);if(r)return{ok:!1,message:r};if(fl(i,s)<e)return{ok:!1,message:"材料が足りません。"};const a=no(i);for(let o=0;o<e;o++)if(!Nu(a,s))return{ok:!1,message:"所持品に空きがありません。"};return Object.assign(i,a),{ok:!0,message:s.name+"を"+s.output.count*e+"個作りました。"}}function Ed(i,t,e){return Qt[i]?.block?e==="creative"?.12:i===23&&t!==17&&t!==18?1/0:[3,8,9,11,23,26].includes(i)?(i===11?2.6:1.85)*(t===18?.19:t===17?.34:1):[5,7,21,22].includes(i)?t===20?.29:t===19?.48:1.12:i===6||i===10?.24:.48:1/0}function ku(i,t,e){if(!Qt[t]?.block)return{message:"この素材は採取できません。"};if(t===23&&(![17,18].includes(e)||!Nn(i,e)))return{message:"潮晶鉱石には木か石のツルハシが必要です。"};const n=no(i),s=Nn(n,e);let r=!1;s?.durability&&--s.durability<=0&&(n.slots.splice(n.slots.indexOf(s),1),r=!0);const a=t===3?8:t===11?15:t===23?24:to(t),o=t===11||t===23?2:1;return ul(n,a,o)?{draft:n,message:Qt[a].name+" +"+o+(r?" ／ "+Qt[e].name+"が壊れました。":"")}:{message:"所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。"}}function Ou(i,t){return!Qt[t]?.block||!Nn(i,t)?!1:(Uu(i,t,1),!0)}function wd(i,t){const e=i[t];if(!e||e.count<2)return{ok:!1,message:"2個以上の束を選んでください。"};if(i.length>=Qa)return{ok:!1,message:"分割するための空き枠がありません。"};const n=Math.floor(e.count/2);return e.count-=n,i.splice(t+1,0,{id:e.id,count:n}),{ok:!0,message:"束を2つに分けました。"}}function Td(i){const t=[...i].sort((n,s)=>n.id-s.id||(n.durability??0)-(s.durability??0)),e=[];for(const n of t){const s=e.at(-1);let r=n.count;if(!n.durability&&s?.id===n.id){const a=Math.min(r,fi-s.count);s.count+=a,r-=a}r&&e.push({...n,count:r})}return i.splice(0,i.length,...e),{ok:!0,message:"同じ素材をまとめて整頓しました。"}}function Ad(i,t,e,n){const s=i[e];if(!s||n<=0||n>s.count)return!1;const r=!!s.durability,a=Qa-t.length,o=r?0:t.reduce((l,h)=>l+(h.id===s.id?fi-h.count:0),0);if(a*(r?1:fi)+o<n)return!1;let c=n;if(!r)for(const l of t){if(l.id!==s.id)continue;const h=Math.min(fi-l.count,c);if(l.count+=h,c-=h,!c)break}return c&&t.push({...s,count:c}),s.count-=n,s.count||i.splice(e,1),!0}function zu(i,t,e,n,s=!1){const[r,a]=e==="bag"?[i.slots,t]:[t,i.slots],o=r[n];if(!o)return{ok:!1,message:"移す束を選んでください。"};const c=s?Math.ceil(o.count/2):o.count;return Ad(r,a,n,c)?(e==="chest"&&Iu(i,o.id),{ok:!0,message:Qt[o.id].name+"を"+c+"個移しました。"}):{ok:!1,message:"移動先の空きが足りません。"}}function Rd(i,t,e,n){if(t!=="creative"||!eo(e)||!Qt[e].block||![1,fi].includes(n))return{ok:!1,message:"建材と個数を確認してください。"};const s=no(i);return ul(s,e,n)?(Object.assign(i,s),{ok:!0,message:Qt[e].name+"を"+n+"個補充しました。"}):{ok:!1,message:"所持品の空きが足りません。"}}function Cd(i,t,e){const n=e==="bag"?i.slots:t;let s=0;for(let r=n.length-1;r>=0;r--)zu(i,t,e,r).ok&&s++;return{ok:s>0,message:s?s+"束を移しました。"+(n.length?"空き不足で残った束があります。":""):"移動できる束がありません。"}}function Pd(i){const t=r=>Math.floor(i.noise(r,777)*9)-4,n=[{kind:"grove",name:"風待ちの大樹",x:91+t(1),z:150+t(2)},{kind:"cave",name:"潮晶の岩窟",x:163+t(3),z:151+t(4)},{kind:"ruin",name:"潮見の回廊",x:117+t(5),z:188+t(6)}].map(r=>({...r,y:Math.max(31,Math.min(48,i.ground(r.x,r.z)))+1})),s=(r,a,o,c,l)=>{const h=i.ground(r,a);for(let u=Math.min(h,o)-3;u<=o;u++)i.put(r,u,a,u===o?c:u>=o-2?2:3);for(let u=o+1;u<=Math.max(l,h+10);u++)i.put(r,u,a,0)};for(const r of n){const a=r.y-1,o=r.kind==="cave"?r.x-3:r.x,c=r.kind==="grove"?r.z-3:r.kind==="ruin"?r.z-5:r.z,l=Math.max(Math.abs(o-128),Math.abs(c-139));for(let h=2;h<=l;h++){const u=h/l,f=Math.round(128+(o-128)*u),d=Math.round(139+(c-139)*u),g=Math.min(1,Math.max(0,h-5)/(l-12)),_=32+Math.round((a-32)*g);for(let p=-1;p<=1;p++)for(let m=-1;m<=1;m++){const b=p===0&&m===0&&i.noise(f,d)>.68?8:1;s(f+p,d+m,_,b,_+3)}}if(r.kind==="grove"){for(let h=-6;h<=6;h++)for(let u=-6;u<=6;u++)h*h+u*u<38&&s(r.x+h,r.z+u,a,1,a+13);for(let h=0;h<2;h++)for(let u=0;u<2;u++)for(let f=1;f<=12;f++)i.put(r.x+h,a+f,r.z+u,5);for(const[h,u,f,d]of[[-3,0,4,10],[3,0,4,11],[0,-3,3,11],[0,3,4,12],[0,0,4,14]]){for(let g=1;g<=3;g++)i.put(r.x+Math.round(h*g/3),a+d-3+g,r.z+Math.round(u*g/3),5);for(let g=-f;g<=f;g++)for(let _=-f;_<=f;_++)for(let p=-2;p<=2;p++)(g*g+_*_)/(f*f)+p*p/5>1.12+i.noise(g+r.x,_+r.z)*.12||i.get(r.x+h+g,a+d+p,r.z+u+_)||i.put(r.x+h+g,a+d+p,r.z+u+_,6)}for(const[h,u]of[[-1,0],[2,1],[0,-1],[1,2]])i.put(r.x+h,a+1,r.z+u,5)}else if(r.kind==="cave"){for(let h=-3;h<=20;h++)for(let u=-9;u<=9;u++){const f=r.x+h,d=r.z+u,g=Math.max(0,1-((h-8)/13)**2-(u/9)**2);if(!g&&(h>2||Math.abs(u)>3))continue;const _=a+Math.round(g*8);s(f,d,_,1,_+4);for(let p=a-2;p<_;p++)i.put(f,p,d,3);if(h>=-3&&h<=15){const p=h<4?1:h<13?3:2;if(Math.abs(u)<=p){i.put(f,a,d,i.noise(f,d)>.72?8:3);for(let m=1;m<=(p===3?4:3);m++)i.put(f,a+m,d,0)}}}for(const[h,u,f]of[[5,1,-4],[6,2,-4],[7,2,-4],[9,1,4],[10,2,4],[11,1,4],[14,1,-3],[16,2,0]])i.put(r.x+h,a+u,r.z+f,23);for(const[h,u,f]of[[1,1,-2],[2,2,-2],[3,1,2]])i.put(r.x+h,a+u,r.z+f,11)}else{for(let h=-5;h<=5;h++)for(let u=-5;u<=5;u++){const f=r.x+h,d=r.z+u,_=Math.max(Math.abs(h),Math.abs(u))===5&&i.noise(f,d)<.45?8:Math.abs(h)<2&&u%3===0?26:9;s(f,d,a,_,a+9)}for(const h of[-4,4])for(const u of[-3,0,3]){const f=u===3?5:2+Math.floor(i.noise(r.x+h,r.z+u)*3);for(let d=1;d<=f;d++)i.put(r.x+h,a+d,r.z+u,d===1?8:9)}for(let h=-4;h<=4;h++)i.put(r.x+h,a+5,r.z+3,h===0?26:9)}}return n}const Rt=256,Ke=96,Dd=16,bn=28,ci=Rt*Rt,Zl=Ke/Dd,za=ci*Ke,tn=128,en=139,Bu=()=>({axes:[],chests:[],benches:[]});function yr(i){return typeof i=="number"&&Number.isInteger(i)&&(i>=0&&i<=13||[21,22,23].includes(i)||i>=25&&i<=33)}function Hu(i){if(!i||typeof i!="object")return!1;const t=i,e=(n,s)=>{if(!Array.isArray(n)||n.length>za-ci)return!1;const r=new Set;for(const a of n){if(!Array.isArray(a)||a.length!==2||!Number.isInteger(a[0])||a[0]<ci||a[0]>=za||r.has(a[0])||!s(a[1]))return!1;r.add(a[0])}return!0};return e(t.axes,n=>n==="x"||n==="z")&&e(t.chests,Du)&&e(t.benches,n=>Number.isSafeInteger(n)&&Number(n)>=0)}const Ne=(i,t,e)=>i+Rt*e+ci*t,br=(i,t,e)=>i+16*e+256*t;function ki(i,t,e){return i>=0&&t>=0&&e>=0&&i<Rt&&t<Ke&&e<Rt}function dr(i){return i!==0&&i!==6&&i!==10&&i!==13&&!(i>=30&&i<=33)}function li(i){return i!==0&&i!==13}function Ld(i,t,e){const n=[];for(let s=Math.max(0,t-1>>4);s<=Math.min(5,t+1>>4);s++)for(let r=Math.max(0,e-1>>4);r<=Math.min(15,e+1>>4);r++)for(let a=Math.max(0,i-1>>4);a<=Math.min(15,i+1>>4);a++)n.push(br(a,s,r));return n}function Id(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function Kt(i,t,e=0){let n=Math.imul(i^e,2654435761)^Math.imul(t,2246822519);return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),((n^n>>>16)>>>0)/4294967296}function Ji(i,t,e,n){i/=e,t/=e;const s=Math.floor(i),r=Math.floor(t);let a=i-s,o=t-r;a=a*a*(3-2*a),o=o*o*(3-2*o);const c=Kt(s,r,n),l=Kt(s+1,r,n),h=Kt(s,r+1,n),u=Kt(s+1,r+1,n);return c+(l-c)*a+(h-c)*o+(c-l-h+u)*a*o}const or=(i,t=0,e=1)=>Math.min(e,Math.max(t,i));function wi(i,t,e){const n=or((e-i)/(e-t));return n*n*(3-2*n)}class io{constructor(t,e=!1,n=1,s="classic"){if(this.stage=s,this.salt=Id(t),this.generator=n,!e)for(const r of this.generateTerrain());}stage;data=new Uint8Array(za);highest=new Int16Array(ci);occupied=new Uint16Array(256*Zl);dense=new Uint16Array(256*Zl);lamps=new Set;salt;generator;landmarks=[];axes=new Map;chests=new Map;benches=new Map;history=[];heights=new Uint8Array(ci);edits=new Map;listeners=new Set;static async generate(t,e,n=1,s="classic"){const r=new io(t,!0,n,s);let a=performance.now();for(const o of r.generateTerrain())performance.now()-a<7&&o<1||(e?.(o),await new Promise(c=>setTimeout(c,0)),a=performance.now());return r}get(t,e,n){return ki(t,e,n)&&Number.isInteger(t)&&Number.isInteger(e)&&Number.isInteger(n)?this.data[Ne(t,e,n)]:0}write(t,e,n,s){ki(t,e,n)&&(this.data[Ne(t,e,n)]=s)}heightAt(t,e){const n=Ji(t,e,47,this.salt),s=Ji(t,e,31,this.salt^109),r=Ji(t,e,11,this.salt^51);let a=22+n*18+Math.max(0,s-.47)*47+r*3;const o=Math.hypot((t-131)/1.55,e-111),c=wi(o+(r-.5)*5,12,24);a=a*(1-c)+(25+r*2)*c;const l=wi(Math.hypot(t-tn,e-en),5.4,14);a=a*(1-l)+(32+.3*r)*l;const h=en-e;if(h>4&&h<27){const f=wi(Math.abs(t-(tn+2)),4,12),d=32-or((h-4)/15)*6+.15*r;a-=Math.max(0,a-d)*f}const u=wi(Math.hypot((t-118)/1.6,e-75),5,28);return a+=u*(8+7*r),or(Math.floor(a),6,Ke-14)}lakeHeight(t,e){const n=11+Ji(t,e,25,this.salt^3140)*4,s=wi(Math.hypot((t-tn)/1.2,e-en),4,24),r=wi(Math.hypot((t-92)/1.65,e-113),2,16),a=wi(Math.hypot(t-154,(e-110)/1.75),2,13);return Math.floor(Math.max(n+(32-n)*s,n+(30-n)*Math.max(r,a)))}*generatePresetTerrain(){const t=this.stage==="flat";this.data.fill(14,0,ci);for(let e=0;e<Rt;e++){for(let n=0;n<Rt;n++){const s=t?32:this.lakeHeight(n,e);for(let r=1;r<=s;r++)this.data[Ne(n,r,e)]=r<s-3?3:t?r===s?1:2:4;if(!t)for(let r=s+1;r<=bn;r++)this.data[Ne(n,r,e)]=13}e%4===3&&(yield .78*(e+1)/Rt)}yield*this.indexTerrain()}*generateTerrain(){if(this.stage!=="classic"){yield*this.generatePresetTerrain();return}for(let s=0;s<Rt;s++){for(let r=0;r<Rt;r++){const a=this.heightAt(r,s),o=a<=bn+1||a<bn+4&&Ji(r,s,17,this.salt^311)>.65,c=r===0||s===0||r===Rt-1||s===Rt-1;this.heights[r+Rt*s]=a;for(let l=0;l<=Math.max(a,bn);l++){const h=l===0||c&&l===a?14:l>a?13:l===a?o?4:1:l>=a-3?o?4:2:3;this.data[Ne(r,l,s)]=h}}s%4===3&&(yield .46*(s+1)/Rt)}let t=0;const e=()=>Kt(++t,319,this.salt),n=(s,r,a,o,c)=>{for(let l=-Math.ceil(c);l<=c;l++)for(let h=-Math.ceil(o);h<=o;h++)for(let u=-Math.ceil(o);u<=o;u++){if((u*u+h*h)/(o*o)+l*l/(c*c)>1)continue;const f=Math.floor(s)+u,d=Math.floor(r)+l,g=Math.floor(a)+h;if(d<2||f<=0||g<=0||f>=255||g>=255||!ki(f,d,g))continue;const _=this.heights[f+Rt*g];_<=bn&&d>=_-2||Math.abs(f-tn)<5&&Math.abs(g-en)<5&&d>27||this.write(f,d,g,0)}};for(let s=0;s<108;s++){let r=5+e()*246,a=5+e()*246,o=5+e()*(this.heights[(r|0)+Rt*(a|0)]-5),c=e()*Math.PI*2,l=(e()-.5)*.6;const h=17+Math.floor(e()*40);for(let u=0;u<h;u++){const f=1.65+1.15*Math.sin(Math.PI*u/h);n(r,o,a,f,f*.7),c+=(e()-.5)*.56,l=or(l+(e()-.5)*.17,-.45,.45),r+=Math.cos(c),a+=Math.sin(c),o+=l}s%4===3&&(yield .46+.12*(s+1)/108)}for(let s=0;s<13;s++){const r=tn+12+s,a=en-2;n(r,this.heights[tn+12+Rt*a]+1-s*.4,a,2.5,2.2)}for(let s=0;s<1800;s++){const r=2+Math.floor(e()*252),a=2+Math.floor(e()*252),o=2+Math.floor(e()*(this.heights[r+Rt*a]-3));for(let c=0;c<8;c++){const l=r+Math.floor(e()*3)-1,h=a+Math.floor(e()*3)-1,u=o+Math.floor(e()*3)-1;this.get(l,u,h)===3&&this.write(l,u,h,11)}s%160===0&&(yield .59+.06*s/1800)}for(let s=-3;s<=3;s++)for(let r=-2;r<=2;r++){if(s*s*.55+r*r>4.8)continue;const a=tn+6+s,o=en-4+r,c=this.heights[a+Rt*o],l=s*s+r*r<3?2:1;for(let h=c-2;h<c+l;h++)this.write(a,h,o,3);s===0&&r===0&&this.write(a,c+1,o,11)}for(let s=0;s<51;s++){for(let r=0;r<51;r++){const a=r*5+1+Math.floor(Kt(r,s,this.salt^134)*3),o=s*5+1+Math.floor(Kt(r,s,this.salt^854)*3);if(Math.hypot(a-tn,o-en)<10||o<en&&o>en-26&&Math.abs(a-(tn+2))<5)continue;const c=Ji(a,o,35,this.salt^482),l=.026+.75*or((c-.38)*3.6);Kt(r,s,this.salt^723)<l&&this.tree(a,o)}s%3===2&&(yield .65+.13*(s+1)/51)}this.tree(tn-2,en-3,!0),this.tree(tn-7,en-7,!0),this.tree(tn+12,en-10,!0),this.generator===2&&(this.landmarks=Pd({ground:(s,r)=>this.heights[s+Rt*r],noise:(s,r)=>Kt(s,r,this.salt^1911),get:(s,r,a)=>this.get(s,r,a),put:(s,r,a,o)=>this.write(s,r,a,o)})),yield*this.indexTerrain()}*indexTerrain(){this.highest.fill(-1);for(let t=0;t<Ke;t++){for(let e=0;e<Rt;e++)for(let n=0;n<Rt;n++){const s=this.data[Ne(n,t,e)];if(!s)continue;const r=br(n>>4,t>>4,e>>4);this.occupied[r]++,dr(s)&&this.dense[r]++,li(s)&&s!==10&&(this.highest[n+Rt*e]=t)}t%4===3&&(yield .78+.22*(t+1)/Ke)}}tree(t,e,n=!1){const s=this.heights[t+Rt*e];if(this.get(t,s,e)!==1||this.get(t,s+1,e)!==0)return;const r=Kt(t,e,this.salt^813),a=!n&&r>.68,o=(a?6:4)+Math.floor(Kt(t,e,this.salt^102)*3);for(let h=1;h<=o;h++)this.write(t,s+h,e,5);const c=a?3:o-1,l=o+2;for(let h=c;h<=l;h++){const u=a?Math.min(2,Math.ceil((l-h)*.43)):h===l?1:2;for(let f=-u;f<=u;f++)for(let d=-u;d<=u;d++)Math.abs(f)===u&&Math.abs(d)===u&&u>0&&(a||Kt(t+f,e+d,this.salt^h)<.72)||!ki(t+f,s+h,e+d)||this.get(t+f,s+h,e+d)!==0||this.write(t+f,s+h,e+d,6)}}spawn(){for(let t=0;t<32;t++)for(let e=-t;e<=t;e++)for(let n=-t;n<=t;n++){if(Math.max(Math.abs(n),Math.abs(e))!==t)continue;const s=tn+n,r=en+e;for(let a=Ke-3;a>0;a--){const o=this.get(s,a,r);if(!(!li(o)||o===6||o===5||this.get(s,a+1,r)!==0||this.get(s,a+2,r)!==0))return{x:s+.5,y:a+1.001,z:r+.5,yaw:-.075,pitch:-.085}}}return{x:tn+.5,y:Ke+.01,z:en+.5,yaw:0,pitch:0}}onEdit(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}set(t,e,n,s){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(n)||!ki(t,e,n)||!yr(s)||e===0)return!1;const r=Ne(t,e,n),a=this.data[r];if(a===s||a===14||a===22&&this.chests.get(r)?.length)return!1;const o=this.edits.get(r)?.base??a;return s===o?this.edits.delete(r):this.edits.set(r,{id:s,base:o}),this.replace(t,e,n,s),!0}replace(t,e,n,s){const r=Ne(t,e,n),a=this.data[r],o=br(t>>4,e>>4,n>>4);this.data[r]=s,this.axes.delete(r),this.chests.delete(r),this.benches.delete(r),this.occupied[o]+=+(s!==0)-+(a!==0),this.dense[o]+=Number(dr(s))-Number(dr(a)),(a===12||a===25)&&this.lamps.delete(r),(s===12||s===25)&&this.lamps.add(r);const c=t+Rt*n;if(e>=this.highest[c]){let l=Math.max(e,this.highest[c]);for(;l>=0&&(!li(this.data[Ne(t,l,n)])||this.data[Ne(t,l,n)]===10);)l--;this.highest[c]=l}for(const l of this.listeners)l(t,e,n)}exportEdits(){return Array.from(this.edits,([t,{id:e}])=>[t,e])}loadEdits(t){const e=new Set;for(const[n,s]of t){if(!Number.isInteger(n)||n<ci||n>=za||!yr(s)||e.has(n)||(this.edits.get(n)?.base??this.data[n])===14)throw new Error("地形の変更データが不正です。");e.add(n)}this.history=[],this.axes.clear(),this.benches.clear(),this.chests.clear();for(const[n,{base:s}]of this.edits)this.replace(n%256,n>>>16,n>>>8&255,s);this.edits.clear();for(const[n,s]of t)this.set(n%256,n>>>16,n>>>8&255,s)}axisAt(t,e,n){return this.axes.get(Ne(t,e,n))??"y"}setAxis(t,e,n,s){if(this.get(t,e,n)!==5||!["x","y","z"].includes(s))return!1;if(this.axisAt(t,e,n)===s)return!0;const r=Ne(t,e,n);s==="y"?this.axes.delete(r):this.axes.set(r,s);for(const a of this.listeners)a(t,e,n);return!0}chestAt(t,e,n){if(this.get(t,e,n)!==22)return;const s=Ne(t,e,n),r=this.chests.get(s)??[];return this.chests.set(s,r),r}benchUses(t,e,n){return this.benches.get(Ne(t,e,n))??0}useBench(t,e,n,s=1){this.get(t,e,n)!==21||!Number.isSafeInteger(s)||s<1||this.benches.set(Ne(t,e,n),Math.min(Number.MAX_SAFE_INTEGER,this.benchUses(t,e,n)+s))}exportFixtures(){return{axes:[...this.axes],benches:[...this.benches],chests:[...this.chests].filter(([,t])=>t.length).map(([t,e])=>[t,e.map(n=>({...n}))])}}loadFixtures(t){if(!Hu(t)||t.axes.some(([n])=>this.data[n]!==5)||t.chests.some(([n])=>this.data[n]!==22)||t.benches.some(([n])=>this.data[n]!==21))throw new Error("建具と地形の保存内容が一致しません。元のバックアップを確認してください。");const e=new Set([...this.axes.keys(),...t.axes.map(([n])=>n)]);this.axes=new Map(t.axes),this.benches=new Map(t.benches),this.chests=new Map(t.chests.map(([n,s])=>[n,s.map(r=>({...r}))]));for(const n of e)for(const s of this.listeners)s(n%256,n>>>16,n>>>8&255)}capture(t,e,n){return{x:t,y:e,z:n,id:this.get(t,e,n),axis:this.axisAt(t,e,n)}}remember(t){const e=this.capture(t.x,t.y,t.z);t.id===21||t.id===22||e.id===21||e.id===22||t.id===e.id&&t.axis===e.axis||(this.history.push({before:t,after:e}),this.history.length>20&&this.history.shift())}undo(t){const e=this.history.at(-1);if(!e)return{ok:!1,message:"戻せる通常ブロックの編集がありません。作業台・チェストは対象外です。"};const{before:n,after:s}=e,{x:r,y:a,z:o}=n;return this.get(r,a,o)!==s.id||this.axisAt(r,a,o)!==s.axis?(this.history.pop(),{ok:!1,message:"この場所はすでに変化したため、戻せません。"}):li(n.id)&&t(r,a,o)?{ok:!1,message:"体と重なります。少し離れてから戻してください。"}:n.id!==s.id&&!this.set(r,a,o,n.id)?{ok:!1,message:"この編集は戻せません。"}:(n.id===5&&this.setAxis(r,a,o,n.axis),this.history.pop(),{ok:!0,message:"直前のブロック編集を戻しました。"})}}function Vu(){return{toolMade:!1,caveVisited:!1,decorated:!1,hidden:!1,home:null}}function Gu(i){if(!i||typeof i!="object")return!1;const t=i;if(![t.toolMade,t.caveVisited,t.decorated,t.hidden].every(n=>typeof n=="boolean")||t.caveVisited&&!t.toolMade||t.decorated&&!t.caveVisited)return!1;const e=t.home;return e===null||!!e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=0&&e.x<256&&e.z>=0&&e.z<256&&e.y>=0&&e.y<96}function Ud(i,t){["wood-pick","wood-axe","stone-pick","stone-axe"].includes(t)&&(i.toolMade=!0)}function Nd(i,t,e,n){if(!i.toolMade||i.caveVisited||!(Mr(n,12)||Mr(n,25)))return!1;const s=t.landmarks.find(r=>r.kind==="cave");if(s){if(e.x<s.x+2||e.x>s.x+16||Math.abs(e.z-s.z-.5)>3.8||Math.abs(e.y-s.y)>2.1)return!1}else{const r=Math.floor(e.x),a=Math.floor(e.z),o=Math.floor(e.y);let c=!1;for(let l=o+2;l<=Math.min(o+9,95);l++)if([2,3,8,11].includes(t.get(r,l,a))){c=!0;break}if(!c)return!1}return i.caveVisited=!0,!0}function Wu(i,t,e){return!i.caveVisited||i.decorated||!i.home||t!==25&&t!==26||Math.hypot(e.x-i.home.x,e.y-i.home.y,e.z-i.home.z)>18?!1:(i.decorated=!0,!0)}function Fd(i,t){return i.toolMade?i.caveVisited?i.decorated?"3/3 達成　拠点に潮晶の飾りが加わりました":t===2?"3/3　潮晶を持ち帰り、作業台で作った灯りかタイルを拠点に飾ろう":"3/3　作業台でガラスと石炭を潮晶に加工し、灯りかタイルを拠点に飾ろう":t===2?"2/3　灯晶ブロックを持って、潮晶の岩窟へ":"2/3　灯晶ブロックを持って、岩天井の洞窟へ":"1/3　原木を集め、木材と棒で木の道具を作ろう"}function Xu(i,t){const e=i.x-t.x,n=i.z-t.z,s=Math.round(Math.hypot(e,n));if(s<2)return"足元";const r=Math.atan2(e,-n)+t.yaw;return["↑","↗","→","↘","↓","↙","←","↖"][(Math.round(r/(Math.PI/4))%8+8)%8]+" 約"+s+"m"}function kd(i,t){return i.home?"拠点 "+Xu(i.home,t):""}const Ba={low:{distance:2,scale:.7,shadows:!1,vegetation:!1,effects:!1},standard:{distance:3,scale:1,shadows:!0,vegetation:!0,effects:!0},high:{distance:5,scale:1.2,shadows:!0,vegetation:!0,effects:!0}},qu={...Ba.standard,quality:"standard",sensitivity:1,volume:.45,muted:!1,effectsVolume:.85,ambientVolume:.4,invertY:!1,bob:!0,sprintFov:!0},Vr=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e;function pl(i){if(!i||typeof i!="object")return!1;const t=i;return(t.quality==="legacy"||Object.hasOwn(Ba,t.quality))&&Number.isInteger(t.distance)&&Vr(t.distance,2,6)&&Vr(t.scale,.5,1.5)&&Vr(t.sensitivity,.3,2.5)&&[t.volume,t.effectsVolume,t.ambientVolume].every(e=>Vr(e,0,1))&&[t.shadows,t.vegetation,t.effects,t.muted,t.invertY,t.bob,t.sprintFov].every(e=>typeof e=="boolean")}function Yu(i){if(!i||typeof i!="object")throw Error("保存された設定を読み込めません。");const t={...qu,quality:"legacy",...i};if(!pl(t))throw Error("保存された設定の値が正しくありません。");return t}const ml="180",Od=0,$l=1,zd=2,ju=1,Bd=2,Gn=3,_i=0,Ze=1,Sn=2,di=0,Ss=1,Jl=2,Ql=3,th=4,Hd=5,Oi=100,Vd=101,Gd=102,Wd=103,Xd=104,qd=200,Yd=201,jd=202,Kd=203,uc=204,fc=205,Zd=206,$d=207,Jd=208,Qd=209,tp=210,ep=211,np=212,ip=213,sp=214,dc=0,pc=1,mc=2,As=3,gc=4,_c=5,vc=6,xc=7,Ku=0,rp=1,ap=2,Xn=0,op=1,cp=2,lp=3,hp=4,up=5,fp=6,dp=7,Zu=300,Rs=301,Cs=302,Mc=303,yc=304,so=306,bc=1e3,Hi=1001,Sc=1002,Pe=1003,pp=1004,cr=1005,Pn=1006,po=1007,hi=1008,Zn=1009,$u=1010,Ju=1011,Sr=1012,gl=1013,ji=1014,Dn=1015,Ur=1016,_l=1017,vl=1018,Er=1020,Qu=35902,tf=35899,ef=1021,nf=1022,Tn=1023,wr=1026,Tr=1027,Nr=1028,xl=1029,sf=1030,Ml=1031,yl=1033,Ta=33776,Aa=33777,Ra=33778,Ca=33779,Ec=35840,wc=35841,Tc=35842,Ac=35843,Rc=36196,Cc=37492,Pc=37496,Dc=37808,Lc=37809,Ic=37810,Uc=37811,Nc=37812,Fc=37813,kc=37814,Oc=37815,zc=37816,Bc=37817,Hc=37818,Vc=37819,Gc=37820,Wc=37821,Xc=36492,qc=36494,Yc=36495,jc=36283,Kc=36284,Zc=36285,$c=36286,mp=3200,gp=3201,_p=0,vp=1,oi="",He="srgb",Ps="srgb-linear",Ha="linear",ae="srgb",Qi=7680,eh=519,xp=512,Mp=513,yp=514,rf=515,bp=516,Sp=517,Ep=518,wp=519,Jc=35044,Tp=35048,nh="300 es",Ln=2e3,Va=2001;class Os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ih=1234567;const Es=Math.PI/180,Ar=180/Math.PI;function qn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function bl(i,t){return(i%t+t)%t}function Ap(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Rp(i,t,e){return i!==t?(e-i)/(t-i):0}function pr(i,t,e){return(1-e)*i+e*t}function Cp(i,t,e,n){return pr(i,t,1-Math.exp(-e*n))}function Pp(i,t=1){return t-Math.abs(bl(i,t*2)-t)}function Dp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Lp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ip(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Up(i,t){return i+Math.random()*(t-i)}function Np(i){return i*(.5-Math.random())}function Fp(i){i!==void 0&&(ih=i);let t=ih+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function kp(i){return i*Es}function Op(i){return i*Ar}function zp(i){return(i&i-1)===0&&i!==0}function Bp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vp(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*d,o*l);break;case"YXY":i.set(c*d,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*d,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function En(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const lr={DEG2RAD:Es,RAD2DEG:Ar,generateUUID:qn,clamp:Yt,euclideanModulo:bl,mapLinear:Ap,inverseLerp:Rp,lerp:pr,damp:Cp,pingpong:Pp,smoothstep:Dp,smootherstep:Lp,randInt:Ip,randFloat:Up,randFloatSpread:Np,seededRandom:Fp,degToRad:kp,radToDeg:Op,isPowerOfTwo:zp,ceilPowerOfTwo:Bp,floorPowerOfTwo:Hp,setQuaternionFromProperEuler:Vp,normalize:se,denormalize:En};class jt{constructor(t=0,e=0){jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let p=1-o;const m=c*f+l*d+h*g+u*_,b=m>=0?1:-1,E=1-m*m;if(E>Number.EPSILON){const A=Math.sqrt(E),T=Math.atan2(A,m*b);p=Math.sin(p*T)/A,o=Math.sin(o*T)/A}const M=o*b;if(c=c*p+f*M,l=l*p+d*M,h=h*p+g*M,u=u*p+_*M,p===1-o){const A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-o*d,t[e+2]=l*g+h*d+o*f-c*u,t[e+3]=h*g-o*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return mo.copy(this).projectOnVector(t),this.sub(mo)}reflect(t){return this.sub(mo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mo=new L,sh=new Fr;class Bt{constructor(t,e,n,s,r,a,o,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],p=s[3],m=s[6],b=s[1],E=s[4],M=s[7],A=s[2],T=s[5],C=s[8];return r[0]=a*_+o*b+c*A,r[3]=a*p+o*E+c*T,r[6]=a*m+o*M+c*C,r[1]=l*_+h*b+u*A,r[4]=l*p+h*E+u*T,r[7]=l*m+h*M+u*C,r[2]=f*_+d*b+g*A,r[5]=f*p+d*E+g*T,r[8]=f*m+d*M+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(go.makeScale(t,e)),this}rotate(t){return this.premultiply(go.makeRotation(-t)),this}translate(t,e){return this.premultiply(go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const go=new Bt;function af(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ga(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gp(){const i=Ga("canvas");return i.style.display="block",i}const rh={};function Rr(i){i in rh||(rh[i]=!0,console.warn(i))}function Wp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ah=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),oh=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xp(){const i={enabled:!0,workingColorSpace:Ps,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=ws(s.r),s.g=ws(s.g),s.b=ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?Ha:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Rr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Rr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ps]:{primaries:t,whitePoint:n,transfer:Ha,toXYZ:ah,fromXYZ:oh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:ah,fromXYZ:oh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),i}const Jt=Xp();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ws(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ts;class qp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ts===void 0&&(ts=Ga("canvas")),ts.width=t.width,ts.height=t.height;const s=ts.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ts}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ga("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yn(e[n]/255)*255):e[n]=Yn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yp=0;class Sl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=qn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_o(s[a].image)):r.push(_o(s[a]))}else r=_o(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function _o(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jp=0;const vo=new L;class Ve extends Os{constructor(t=Ve.DEFAULT_IMAGE,e=Ve.DEFAULT_MAPPING,n=Hi,s=Hi,r=Pn,a=hi,o=Tn,c=Zn,l=Ve.DEFAULT_ANISOTROPY,h=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=qn(),this.name="",this.source=new Sl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bc:t.x=t.x-Math.floor(t.x);break;case Hi:t.x=t.x<0?0:1;break;case Sc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bc:t.y=t.y-Math.floor(t.y);break;case Hi:t.y=t.y<0?0:1;break;case Sc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=Zu;Ve.DEFAULT_ANISOTROPY=1;class we{constructor(t=0,e=0,n=0,s=1){we.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,M=(d+1)/2,A=(m+1)/2,T=(h+f)/4,C=(u+_)/4,I=(g+p)/4;return E>M&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=C/n):M>A?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=I/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=C/r,s=I/r),this.set(n,s,r,e),this}let b=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-_)/b,this.z=(f-h)/b,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kp extends Os{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Ve(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Pn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Sl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ki extends Kp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class of extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zp extends Ve{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xi{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(t.matrixWorld),this.union(Gr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xs),Wr.subVectors(this.max,Xs),es.subVectors(t.a,Xs),ns.subVectors(t.b,Xs),is.subVectors(t.c,Xs),ti.subVectors(ns,es),ei.subVectors(is,ns),Ti.subVectors(es,is);let e=[0,-ti.z,ti.y,0,-ei.z,ei.y,0,-Ti.z,Ti.y,ti.z,0,-ti.x,ei.z,0,-ei.x,Ti.z,0,-Ti.x,-ti.y,ti.x,0,-ei.y,ei.x,0,-Ti.y,Ti.x,0];return!xo(e,es,ns,is,Wr)||(e=[1,0,0,0,1,0,0,0,1],!xo(e,es,ns,is,Wr))?!1:(Xr.crossVectors(ti,ei),e=[Xr.x,Xr.y,Xr.z],xo(e,es,ns,is,Wr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const On=[new L,new L,new L,new L,new L,new L,new L,new L],xn=new L,Gr=new xi,es=new L,ns=new L,is=new L,ti=new L,ei=new L,Ti=new L,Xs=new L,Wr=new L,Xr=new L,Ai=new L;function xo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ai.fromArray(i,r);const o=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),c=t.dot(Ai),l=e.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const $p=new xi,qs=new L,Mo=new L;class zs{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):$p.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;qs.subVectors(t,this.center);const e=qs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(qs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Mo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(qs.copy(t.center).add(Mo)),this.expandByPoint(qs.copy(t.center).sub(Mo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const zn=new L,yo=new L,qr=new L,ni=new L,bo=new L,Yr=new L,So=new L;class El{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zn.copy(this.origin).addScaledVector(this.direction,e),zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){yo.copy(t).add(e).multiplyScalar(.5),qr.copy(e).sub(t).normalize(),ni.copy(this.origin).sub(yo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(qr),o=ni.dot(this.direction),c=-ni.dot(qr),l=ni.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(yo).addScaledVector(qr,f),d}intersectSphere(t,e){zn.subVectors(t.center,this.origin);const n=zn.dot(this.direction),s=zn.dot(zn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,zn)!==null}intersectTriangle(t,e,n,s,r){bo.subVectors(e,t),Yr.subVectors(n,t),So.crossVectors(bo,Yr);let a=this.direction.dot(So),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,t);const c=o*this.direction.dot(Yr.crossVectors(ni,Yr));if(c<0)return null;const l=o*this.direction.dot(bo.cross(ni));if(l<0||c+l>a)return null;const h=-o*ni.dot(So);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,n,s,r,a,o,c,l,h,u,f,d,g,_,p){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,f,d,g,_,p)}set(t,e,n,s,r,a,o,c,l,h,u,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ss.setFromMatrixColumn(t,0).length(),r=1/ss.setFromMatrixColumn(t,1).length(),a=1/ss.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*o,e[4]=g*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,d=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*c,d=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jp,t,Qp)}lookAt(t,e,n){const s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ii.crossVectors(n,an),ii.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ii.crossVectors(n,an)),ii.normalize(),jr.crossVectors(an,ii),s[0]=ii.x,s[4]=jr.x,s[8]=an.x,s[1]=ii.y,s[5]=jr.y,s[9]=an.y,s[2]=ii.z,s[6]=jr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],b=n[3],E=n[7],M=n[11],A=n[15],T=s[0],C=s[4],I=s[8],S=s[12],y=s[1],P=s[5],O=s[9],H=s[13],Y=s[2],G=s[6],K=s[10],$=s[14],V=s[3],st=s[7],ct=s[11],ft=s[15];return r[0]=a*T+o*y+c*Y+l*V,r[4]=a*C+o*P+c*G+l*st,r[8]=a*I+o*O+c*K+l*ct,r[12]=a*S+o*H+c*$+l*ft,r[1]=h*T+u*y+f*Y+d*V,r[5]=h*C+u*P+f*G+d*st,r[9]=h*I+u*O+f*K+d*ct,r[13]=h*S+u*H+f*$+d*ft,r[2]=g*T+_*y+p*Y+m*V,r[6]=g*C+_*P+p*G+m*st,r[10]=g*I+_*O+p*K+m*ct,r[14]=g*S+_*H+p*$+m*ft,r[3]=b*T+E*y+M*Y+A*V,r[7]=b*C+E*P+M*G+A*st,r[11]=b*I+E*O+M*K+A*ct,r[15]=b*S+E*H+M*$+A*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*c*u-s*l*u-r*o*f+n*l*f+s*o*d-n*c*d)+_*(+e*c*d-e*l*f+r*a*f-s*a*d+s*l*h-r*c*h)+p*(+e*l*u-e*o*d-r*a*u+n*a*d+r*o*h-n*l*h)+m*(-s*o*h-e*c*u+e*o*f+s*a*u-n*a*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],b=u*p*l-_*f*l+_*c*d-o*p*d-u*c*m+o*f*m,E=g*f*l-h*p*l-g*c*d+a*p*d+h*c*m-a*f*m,M=h*_*l-g*u*l+g*o*d-a*_*d-h*o*m+a*u*m,A=g*u*c-h*_*c-g*o*f+a*_*f+h*o*p-a*u*p,T=e*b+n*E+s*M+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/T;return t[0]=b*C,t[1]=(_*f*r-u*p*r-_*s*d+n*p*d+u*s*m-n*f*m)*C,t[2]=(o*p*r-_*c*r+_*s*l-n*p*l-o*s*m+n*c*m)*C,t[3]=(u*c*r-o*f*r-u*s*l+n*f*l+o*s*d-n*c*d)*C,t[4]=E*C,t[5]=(h*p*r-g*f*r+g*s*d-e*p*d-h*s*m+e*f*m)*C,t[6]=(g*c*r-a*p*r-g*s*l+e*p*l+a*s*m-e*c*m)*C,t[7]=(a*f*r-h*c*r+h*s*l-e*f*l-a*s*d+e*c*d)*C,t[8]=M*C,t[9]=(g*u*r-h*_*r-g*n*d+e*_*d+h*n*m-e*u*m)*C,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*m+e*o*m)*C,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*d-e*o*d)*C,t[12]=A*C,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*p+e*u*p)*C,t[14]=(g*o*s-a*_*s-g*n*c+e*_*c+a*n*p-e*o*p)*C,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*f+e*o*f)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,g=r*u,_=a*h,p=a*u,m=o*u,b=c*l,E=c*h,M=c*u,A=n.x,T=n.y,C=n.z;return s[0]=(1-(_+m))*A,s[1]=(d+M)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(d-M)*T,s[5]=(1-(f+m))*T,s[6]=(p+b)*T,s[7]=0,s[8]=(g+E)*C,s[9]=(p-b)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ss.set(s[0],s[1],s[2]).length();const a=ss.set(s[4],s[5],s[6]).length(),o=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Mn.copy(this);const l=1/r,h=1/a,u=1/o;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=u,Mn.elements[9]*=u,Mn.elements[10]*=u,e.setFromRotationMatrix(Mn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Ln,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Ln)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Va)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Ln,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Ln)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Va)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ss=new L,Mn=new pe,Jp=new L(0,0,0),Qp=new L(1,1,1),ii=new L,jr=new L,an=new L,ch=new pe,lh=new Fr;class $n{constructor(t=0,e=0,n=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ch.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ch,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lh.setFromEuler(this),this.setFromQuaternion(lh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class cf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tm=0;const hh=new L,rs=new Fr,Bn=new pe,Kr=new L,Ys=new L,em=new L,nm=new Fr,uh=new L(1,0,0),fh=new L(0,1,0),dh=new L(0,0,1),ph={type:"added"},im={type:"removed"},as={type:"childadded",child:null},Eo={type:"childremoved",child:null};class Ce extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new L,e=new $n,n=new Fr,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Bt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.multiply(rs),this}rotateOnWorldAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.premultiply(rs),this}rotateX(t){return this.rotateOnAxis(uh,t)}rotateY(t){return this.rotateOnAxis(fh,t)}rotateZ(t){return this.rotateOnAxis(dh,t)}translateOnAxis(t,e){return hh.copy(t).applyQuaternion(this.quaternion),this.position.add(hh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(uh,t)}translateY(t){return this.translateOnAxis(fh,t)}translateZ(t){return this.translateOnAxis(dh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Kr.copy(t):Kr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Ys,Kr,this.up):Bn.lookAt(Kr,Ys,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Bn),this.quaternion.premultiply(rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ph),as.child=t,this.dispatchEvent(as),as.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(im),Eo.child=t,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ph),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,t,em),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,nm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ce.DEFAULT_UP=new L(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new L,Hn=new L,wo=new L,Vn=new L,os=new L,cs=new L,mh=new L,To=new L,Ao=new L,Ro=new L,Co=new we,Po=new we,Do=new we;class hn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),Hn.subVectors(n,e),wo.subVectors(t,e);const a=yn.dot(yn),o=yn.dot(Hn),c=yn.dot(wo),l=Hn.dot(Hn),h=Hn.dot(wo),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Vn.x),c.addScaledVector(a,Vn.y),c.addScaledVector(o,Vn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Co.setScalar(0),Po.setScalar(0),Do.setScalar(0),Co.fromBufferAttribute(t,e),Po.fromBufferAttribute(t,n),Do.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Co,r.x),a.addScaledVector(Po,r.y),a.addScaledVector(Do,r.z),a}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),Hn.subVectors(t,e),yn.cross(Hn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),yn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;os.subVectors(s,n),cs.subVectors(r,n),To.subVectors(t,n);const c=os.dot(To),l=cs.dot(To);if(c<=0&&l<=0)return e.copy(n);Ao.subVectors(t,s);const h=os.dot(Ao),u=cs.dot(Ao);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(os,a);Ro.subVectors(t,r);const d=os.dot(Ro),g=cs.dot(Ro);if(g>=0&&d<=g)return e.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(cs,o);const p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return mh.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(mh,o);const m=1/(p+_+f);return a=_*m,o=f*m,e.copy(n).addScaledVector(os,a).addScaledVector(cs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const lf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function Lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=bl(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Lo(a,r,t+1/3),this.g=Lo(a,r,t),this.b=Lo(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=lf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Jt.workingToColorSpace(Be.copy(this),t),Math.round(Yt(Be.r*255,0,255))*65536+Math.round(Yt(Be.g*255,0,255))*256+Math.round(Yt(Be.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Be.copy(this),e);const n=Be.r,s=Be.g,r=Be.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=He){Jt.workingToColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,s=Be.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(si),this.setHSL(si.h+t,si.s+e,si.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(si),t.getHSL(Zr);const n=pr(si.h,Zr.h,e),s=pr(si.s,Zr.s,e),r=pr(si.l,Zr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Wt;Wt.NAMES=lf;let sm=0;class Bs extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=Ss,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uc,this.blendDst=fc,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ss&&(n.blending=this.blending),this.side!==_i&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==uc&&(n.blendSrc=this.blendSrc),this.blendDst!==fc&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==eh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Zi extends Bs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=Ku,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new L,$r=new jt;let rm=0;class $e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)$r.fromBufferAttribute(this,e),$r.applyMatrix3(t),this.setXY(e,$r.x,$r.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=En(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=En(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=En(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=En(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jc&&(t.usage=this.usage),t}}class hf extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class uf extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class xe extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let am=0;const pn=new pe,Io=new Ce,ls=new L,on=new xi,js=new xi,Ue=new L;class We extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(af(t)?uf:hf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,n){return pn.makeTranslation(t,e,n),this.applyMatrix4(pn),this}scale(t,e,n){return pn.makeScale(t,e,n),this.applyMatrix4(pn),this}lookAt(t){return Io.lookAt(t),Io.updateMatrix(),this.applyMatrix4(Io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];js.setFromBufferAttribute(o),this.morphTargetsRelative?(Ue.addVectors(on.min,js.min),on.expandByPoint(Ue),Ue.addVectors(on.max,js.max),on.expandByPoint(Ue)):(on.expandByPoint(js.min),on.expandByPoint(js.max))}on.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ue.fromBufferAttribute(o,l),c&&(ls.fromBufferAttribute(t,l),Ue.add(ls)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new L,c[I]=new L;const l=new L,h=new L,u=new L,f=new jt,d=new jt,g=new jt,_=new L,p=new L;function m(I,S,y){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),o[I].add(_),o[S].add(_),o[y].add(_),c[I].add(p),c[S].add(p),c[y].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,S=b.length;I<S;++I){const y=b[I],P=y.start,O=y.count;for(let H=P,Y=P+O;H<Y;H+=3)m(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const E=new L,M=new L,A=new L,T=new L;function C(I){A.fromBufferAttribute(s,I),T.copy(A);const S=o[I];E.copy(S),E.sub(A.multiplyScalar(A.dot(S))).normalize(),M.crossVectors(T,S);const P=M.dot(c[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,P)}for(let I=0,S=b.length;I<S;++I){const y=b[I],P=y.start,O=y.count;for(let H=P,Y=P+O;H<Y;H+=3)C(t.getX(H+0)),C(t.getX(H+1)),C(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let m=0;m<h;m++)f[g++]=l[d++]}return new $e(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new We,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gh=new pe,Ri=new El,Jr=new zs,_h=new L,Qr=new L,ta=new L,ea=new L,Uo=new L,na=new L,vh=new L,ia=new L;class Se extends Ce{constructor(t=new We,e=new Zi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Uo.fromBufferAttribute(u,t),a?na.addScaledVector(Uo,h):na.addScaledVector(Uo.sub(e),h))}e.add(na)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(r),Ri.copy(t.ray).recast(t.near),!(Jr.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Jr,_h)===null||Ri.origin.distanceToSquared(_h)>(t.far-t.near)**2))&&(gh.copy(r).invert(),Ri.copy(t.ray).applyMatrix4(gh),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=a[p.materialIndex],b=Math.max(p.start,d.start),E=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let M=b,A=E;M<A;M+=3){const T=o.getX(M),C=o.getX(M+1),I=o.getX(M+2);s=sa(this,m,t,n,l,h,u,T,C,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const b=o.getX(p),E=o.getX(p+1),M=o.getX(p+2);s=sa(this,a,t,n,l,h,u,b,E,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=a[p.materialIndex],b=Math.max(p.start,d.start),E=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let M=b,A=E;M<A;M+=3){const T=M,C=M+1,I=M+2;s=sa(this,m,t,n,l,h,u,T,C,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const b=p,E=p+1,M=p+2;s=sa(this,a,t,n,l,h,u,b,E,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function om(i,t,e,n,s,r,a,o){let c;if(t.side===Ze?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===_i,o),c===null)return null;ia.copy(o),ia.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ia);return l<e.near||l>e.far?null:{distance:l,point:ia.clone(),object:i}}function sa(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Qr),i.getVertexPosition(c,ta),i.getVertexPosition(l,ea);const h=om(i,t,e,n,Qr,ta,ea,vh);if(h){const u=new L;hn.getBarycoord(vh,Qr,ta,ea,u),s&&(h.uv=hn.getInterpolatedAttribute(s,o,c,l,u,new jt)),r&&(h.uv1=hn.getInterpolatedAttribute(r,o,c,l,u,new jt)),a&&(h.normal=hn.getInterpolatedAttribute(a,o,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new L,materialIndex:0};hn.getNormal(Qr,ta,ea,f.normal),h.face=f,h.barycoord=u}return h}class _n extends We{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new xe(l,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(u,2));function g(_,p,m,b,E,M,A,T,C,I,S){const y=M/C,P=A/I,O=M/2,H=A/2,Y=T/2,G=C+1,K=I+1;let $=0,V=0;const st=new L;for(let ct=0;ct<K;ct++){const ft=ct*P-H;for(let Vt=0;Vt<G;Vt++){const te=Vt*y-O;st[_]=te*b,st[p]=ft*E,st[m]=Y,l.push(st.x,st.y,st.z),st[_]=0,st[p]=0,st[m]=T>0?1:-1,h.push(st.x,st.y,st.z),u.push(Vt/C),u.push(1-ct/I),$+=1}}for(let ct=0;ct<I;ct++)for(let ft=0;ft<C;ft++){const Vt=f+ft+G*ct,te=f+ft+G*(ct+1),he=f+(ft+1)+G*(ct+1),Gt=f+(ft+1)+G*ct;c.push(Vt,te,Gt),c.push(te,he,Gt),V+=6}o.addGroup(d,V,S),d+=V,f+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ds(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ye(i){const t={};for(let e=0;e<i.length;e++){const n=Ds(i[e]);for(const s in n)t[s]=n[s]}return t}function cm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ff(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const lm={clone:Ds,merge:Ye};var hm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,um=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ge extends Bs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hm,this.fragmentShader=um,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ds(t.uniforms),this.uniformsGroups=cm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class df extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new L,xh=new jt,Mh=new jt;class mn extends df{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Es*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(Es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ri.x,ri.y).multiplyScalar(-t/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ri.x,ri.y).multiplyScalar(-t/ri.z)}getViewSize(t,e){return this.getViewBounds(t,xh,Mh),e.subVectors(Mh,xh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Es*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const hs=-90,us=1;class fm extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mn(hs,us,t,e);s.layers=this.layers,this.add(s);const r=new mn(hs,us,t,e);r.layers=this.layers,this.add(r);const a=new mn(hs,us,t,e);a.layers=this.layers,this.add(a);const o=new mn(hs,us,t,e);o.layers=this.layers,this.add(o);const c=new mn(hs,us,t,e);c.layers=this.layers,this.add(c);const l=new mn(hs,us,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Va)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pf extends Ve{constructor(t=[],e=Rs,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class dm extends Ki{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new pf(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _n(5,5,5),r=new Ge({name:"CubemapFromEquirect",uniforms:Ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:di});r.uniforms.tEquirect.value=e;const a=new Se(s,r),o=e.minFilter;return e.minFilter===hi&&(e.minFilter=Pn),new fm(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Vi extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pm={type:"move"};class No{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Vi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class mm extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class gm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Jc,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qe=new L;class Wa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=En(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=En(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=En(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=En(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=En(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new $e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Wa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class mf extends Bs{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let fs;const Ks=new L,ds=new L,ps=new L,ms=new jt,Zs=new jt,gf=new pe,ra=new L,$s=new L,aa=new L,yh=new jt,Fo=new jt,bh=new jt;class _m extends Ce{constructor(t=new mf){if(super(),this.isSprite=!0,this.type="Sprite",fs===void 0){fs=new We;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new gm(e,5);fs.setIndex([0,1,2,0,2,3]),fs.setAttribute("position",new Wa(n,3,0,!1)),fs.setAttribute("uv",new Wa(n,2,3,!1))}this.geometry=fs,this.material=t,this.center=new jt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ds.setFromMatrixScale(this.matrixWorld),gf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ps.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ds.multiplyScalar(-ps.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;oa(ra.set(-.5,-.5,0),ps,a,ds,s,r),oa($s.set(.5,-.5,0),ps,a,ds,s,r),oa(aa.set(.5,.5,0),ps,a,ds,s,r),yh.set(0,0),Fo.set(1,0),bh.set(1,1);let o=t.ray.intersectTriangle(ra,$s,aa,!1,Ks);if(o===null&&(oa($s.set(-.5,.5,0),ps,a,ds,s,r),Fo.set(0,1),o=t.ray.intersectTriangle(ra,aa,$s,!1,Ks),o===null))return;const c=t.ray.origin.distanceTo(Ks);c<t.near||c>t.far||e.push({distance:c,point:Ks.clone(),uv:hn.getInterpolation(Ks,ra,$s,aa,yh,Fo,bh,new jt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function oa(i,t,e,n,s,r){ms.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Zs.x=r*ms.x-s*ms.y,Zs.y=s*ms.x+r*ms.y):Zs.copy(ms),i.copy(t),i.x+=Zs.x,i.y+=Zs.y,i.applyMatrix4(gf)}class kr extends Ve{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Pe,h=Pe,u,f){super(null,a,o,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sh extends $e{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const gs=new pe,Eh=new pe,ca=[],wh=new xi,vm=new pe,Js=new Se,Qs=new zs;class Xa extends Se{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Sh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,vm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new xi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,gs),wh.copy(t.boundingBox).applyMatrix4(gs),this.boundingBox.union(wh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,gs),Qs.copy(t.boundingSphere).applyMatrix4(gs),this.boundingSphere.union(Qs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),t.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gs),Eh.multiplyMatrices(n,gs),Js.matrixWorld=Eh,Js.raycast(t,ca);for(let a=0,o=ca.length;a<o;a++){const c=ca[a];c.instanceId=r,c.object=this,e.push(c)}ca.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Sh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new kr(new Float32Array(s*this.count),s,this.count,Nr,Dn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ko=new L,xm=new L,Mm=new Bt;class Ii{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ko.subVectors(n,e).cross(xm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ko),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Mm.getNormalMatrix(t),s=this.coplanarPoint(ko).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new zs,ym=new jt(.5,.5),la=new L;class _f{constructor(t=new Ii,e=new Ii,n=new Ii,s=new Ii,r=new Ii,a=new Ii){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],_=r[9],p=r[10],m=r[11],b=r[12],E=r[13],M=r[14],A=r[15];if(s[0].setComponents(l-a,d-h,m-g,A-b).normalize(),s[1].setComponents(l+a,d+h,m+g,A+b).normalize(),s[2].setComponents(l+o,d+u,m+_,A+E).normalize(),s[3].setComponents(l-o,d-u,m-_,A-E).normalize(),n)s[4].setComponents(c,f,p,M).normalize(),s[5].setComponents(l-c,d-f,m-p,A-M).normalize();else if(s[4].setComponents(l-c,d-f,m-p,A-M).normalize(),e===Ln)s[5].setComponents(l+c,d+f,m+p,A+M).normalize();else if(e===Va)s[5].setComponents(c,f,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(t){Ci.center.set(0,0,0);const e=ym.distanceTo(t.center);return Ci.radius=.7071067811865476+e,Ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(la.x=s.normal.x>0?t.max.x:t.min.x,la.y=s.normal.y>0?t.max.y:t.min.y,la.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(la)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vf extends Bs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const qa=new L,Ya=new L,Th=new pe,tr=new El,ha=new zs,Oo=new L,Ah=new L;class bm extends Ce{constructor(t=new We,e=new vf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)qa.fromBufferAttribute(e,s-1),Ya.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=qa.distanceTo(Ya);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,t.ray.intersectsSphere(ha)===!1)return;Th.copy(s).invert(),tr.copy(t.ray).applyMatrix4(Th);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,p=g-1;_<p;_+=l){const m=h.getX(_),b=h.getX(_+1),E=ua(this,t,tr,c,m,b,_);E&&e.push(E)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(d),m=ua(this,t,tr,c,_,p,g-1);m&&e.push(m)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,p=g-1;_<p;_+=l){const m=ua(this,t,tr,c,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){const _=ua(this,t,tr,c,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ua(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(qa.fromBufferAttribute(o,s),Ya.fromBufferAttribute(o,r),e.distanceSqToSegment(qa,Ya,Oo,Ah)>n)return;Oo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Oo);if(!(l<t.near||l>t.far))return{distance:l,point:Ah.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Rh=new L,Ch=new L;class Sm extends bm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Rh.fromBufferAttribute(e,s),Ch.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Rh.distanceTo(Ch);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Em extends Ve{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xf extends Ve{constructor(t,e,n=ji,s,r,a,o=Pe,c=Pe,l,h=wr,u=1){if(h!==wr&&h!==Tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Sl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Mf extends Ve{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const fa=new L,da=new L,zo=new L,pa=new hn;class wm extends We{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Es*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:p,c:m}=pa;if(_.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),m.fromBufferAttribute(o,l[2]),pa.getNormal(zo),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){const E=(b+1)%3,M=u[b],A=u[E],T=pa[h[b]],C=pa[h[E]],I=`${M}_${A}`,S=`${A}_${M}`;S in f&&f[S]?(zo.dot(f[S].normal)<=r&&(d.push(T.x,T.y,T.z),d.push(C.x,C.y,C.z)),f[S]=null):I in f||(f[I]={index0:l[b],index1:l[E],normal:zo.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:p}=f[g];fa.fromBufferAttribute(o,_),da.fromBufferAttribute(o,p),d.push(fa.x,fa.y,fa.z),d.push(da.x,da.y,da.z)}this.setAttribute("position",new xe(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Hs extends We{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const b=m*f-a;for(let E=0;E<l;E++){const M=E*u-r;g.push(M,-b,0),_.push(0,0,1),p.push(E/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let b=0;b<o;b++){const E=b+l*m,M=b+l*(m+1),A=b+1+l*(m+1),T=b+1+l*m;d.push(E,M,T),d.push(M,A,T)}this.setIndex(d),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hs(t.width,t.height,t.widthSegments,t.heightSegments)}}class wl extends We{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new L,f=new L,d=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const b=[],E=m/n;let M=0;m===0&&a===0?M=.5/e:m===n&&c===Math.PI&&(M=-.5/e);for(let A=0;A<=e;A++){const T=A/e;u.x=-t*Math.cos(s+T*r)*Math.sin(a+E*o),u.y=t*Math.cos(a+E*o),u.z=t*Math.sin(s+T*r)*Math.sin(a+E*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(T+M,1-E),b.push(l++)}h.push(b)}for(let m=0;m<n;m++)for(let b=0;b<e;b++){const E=h[m][b+1],M=h[m][b],A=h[m+1][b],T=h[m+1][b+1];(m!==0||a>0)&&d.push(E,M,T),(m!==n-1||c<Math.PI)&&d.push(M,A,T)}this.setIndex(d),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(_,3)),this.setAttribute("uv",new xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Tm extends Bs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Am extends Bs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Rm extends df{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Cm extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Ph(i,t,e,n){const s=Pm(n);switch(e){case ef:return i*t;case Nr:return i*t/s.components*s.byteLength;case xl:return i*t/s.components*s.byteLength;case sf:return i*t*2/s.components*s.byteLength;case Ml:return i*t*2/s.components*s.byteLength;case nf:return i*t*3/s.components*s.byteLength;case Tn:return i*t*4/s.components*s.byteLength;case yl:return i*t*4/s.components*s.byteLength;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wc:case Ac:return Math.max(i,16)*Math.max(t,8)/4;case Ec:case Tc:return Math.max(i,8)*Math.max(t,8)/2;case Rc:case Cc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Dc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ic:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Uc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Fc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case kc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Oc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case zc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Bc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Gc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xc:case qc:case Yc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case jc:case Kc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Zc:case $c:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pm(i){switch(i){case Zn:case $u:return{byteLength:1,components:1};case Sr:case Ju:case Ur:return{byteLength:2,components:1};case _l:case vl:return{byteLength:2,components:4};case ji:case gl:case Dn:return{byteLength:4,components:1};case Qu:case tf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ml}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ml);function yf(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Dm(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Lm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Im=`#ifdef USE_ALPHAHASH
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
#endif`,Um=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Om=`#ifdef USE_AOMAP
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
#endif`,zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bm=`#ifdef USE_BATCHING
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
#endif`,Hm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xm=`#ifdef USE_IRIDESCENCE
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
#endif`,qm=`#ifdef USE_BUMPMAP
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
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,t0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,e0=`#define PI 3.141592653589793
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
} // validated`,n0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,i0=`vec3 transformedNormal = objectNormal;
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
#endif`,s0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,r0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c0="gl_FragColor = linearToOutputTexel( gl_FragColor );",l0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,h0=`#ifdef USE_ENVMAP
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
#endif`,u0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,f0=`#ifdef USE_ENVMAP
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
#endif`,d0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
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
#endif`,m0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,g0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,v0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,x0=`#ifdef USE_GRADIENTMAP
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
}`,M0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,S0=`uniform bool receiveShadow;
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
#endif`,E0=`#ifdef USE_ENVMAP
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
#endif`,w0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,T0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,A0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,R0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,C0=`PhysicalMaterial material;
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
#endif`,P0=`struct PhysicalMaterial {
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
}`,D0=`
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
#endif`,L0=`#if defined( RE_IndirectDiffuse )
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
#endif`,I0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,B0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,H0=`#if defined( USE_POINTS_UV )
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
#endif`,V0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,G0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y0=`#ifdef USE_MORPHTARGETS
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
#endif`,j0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tg=`#ifdef USE_NORMALMAP
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
#endif`,eg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ng=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ig=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ag=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,og=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gg=`float getShadowMask() {
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
}`,_g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vg=`#ifdef USE_SKINNING
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
#endif`,xg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mg=`#ifdef USE_SKINNING
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
#endif`,yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wg=`#ifdef USE_TRANSMISSION
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
#endif`,Tg=`#ifdef USE_TRANSMISSION
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
#endif`,Ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lg=`uniform sampler2D t2D;
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
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ug=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ng=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`#include <common>
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
}`,Og=`#if DEPTH_PACKING == 3200
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
}`,zg=`#define DISTANCE
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
}`,Bg=`#define DISTANCE
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
}`,Hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gg=`uniform float scale;
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
}`,Wg=`uniform vec3 diffuse;
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
}`,Xg=`#include <common>
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
}`,qg=`uniform vec3 diffuse;
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
}`,Yg=`#define LAMBERT
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
}`,jg=`#define LAMBERT
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
}`,Kg=`#define MATCAP
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
}`,Zg=`#define MATCAP
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
}`,$g=`#define NORMAL
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
}`,Jg=`#define NORMAL
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
}`,Qg=`#define PHONG
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
}`,t_=`#define PHONG
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
}`,e_=`#define STANDARD
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
}`,n_=`#define STANDARD
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
}`,i_=`#define TOON
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
}`,s_=`#define TOON
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
}`,r_=`uniform float size;
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
}`,a_=`uniform vec3 diffuse;
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
}`,o_=`#include <common>
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
}`,c_=`uniform vec3 color;
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
}`,l_=`uniform float rotation;
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
}`,h_=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:Lm,alphahash_pars_fragment:Im,alphamap_fragment:Um,alphamap_pars_fragment:Nm,alphatest_fragment:Fm,alphatest_pars_fragment:km,aomap_fragment:Om,aomap_pars_fragment:zm,batching_pars_vertex:Bm,batching_vertex:Hm,begin_vertex:Vm,beginnormal_vertex:Gm,bsdfs:Wm,iridescence_fragment:Xm,bumpmap_pars_fragment:qm,clipping_planes_fragment:Ym,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:Km,clipping_planes_vertex:Zm,color_fragment:$m,color_pars_fragment:Jm,color_pars_vertex:Qm,color_vertex:t0,common:e0,cube_uv_reflection_fragment:n0,defaultnormal_vertex:i0,displacementmap_pars_vertex:s0,displacementmap_vertex:r0,emissivemap_fragment:a0,emissivemap_pars_fragment:o0,colorspace_fragment:c0,colorspace_pars_fragment:l0,envmap_fragment:h0,envmap_common_pars_fragment:u0,envmap_pars_fragment:f0,envmap_pars_vertex:d0,envmap_physical_pars_fragment:E0,envmap_vertex:p0,fog_vertex:m0,fog_pars_vertex:g0,fog_fragment:_0,fog_pars_fragment:v0,gradientmap_pars_fragment:x0,lightmap_pars_fragment:M0,lights_lambert_fragment:y0,lights_lambert_pars_fragment:b0,lights_pars_begin:S0,lights_toon_fragment:w0,lights_toon_pars_fragment:T0,lights_phong_fragment:A0,lights_phong_pars_fragment:R0,lights_physical_fragment:C0,lights_physical_pars_fragment:P0,lights_fragment_begin:D0,lights_fragment_maps:L0,lights_fragment_end:I0,logdepthbuf_fragment:U0,logdepthbuf_pars_fragment:N0,logdepthbuf_pars_vertex:F0,logdepthbuf_vertex:k0,map_fragment:O0,map_pars_fragment:z0,map_particle_fragment:B0,map_particle_pars_fragment:H0,metalnessmap_fragment:V0,metalnessmap_pars_fragment:G0,morphinstance_vertex:W0,morphcolor_vertex:X0,morphnormal_vertex:q0,morphtarget_pars_vertex:Y0,morphtarget_vertex:j0,normal_fragment_begin:K0,normal_fragment_maps:Z0,normal_pars_fragment:$0,normal_pars_vertex:J0,normal_vertex:Q0,normalmap_pars_fragment:tg,clearcoat_normal_fragment_begin:eg,clearcoat_normal_fragment_maps:ng,clearcoat_pars_fragment:ig,iridescence_pars_fragment:sg,opaque_fragment:rg,packing:ag,premultiplied_alpha_fragment:og,project_vertex:cg,dithering_fragment:lg,dithering_pars_fragment:hg,roughnessmap_fragment:ug,roughnessmap_pars_fragment:fg,shadowmap_pars_fragment:dg,shadowmap_pars_vertex:pg,shadowmap_vertex:mg,shadowmask_pars_fragment:gg,skinbase_vertex:_g,skinning_pars_vertex:vg,skinning_vertex:xg,skinnormal_vertex:Mg,specularmap_fragment:yg,specularmap_pars_fragment:bg,tonemapping_fragment:Sg,tonemapping_pars_fragment:Eg,transmission_fragment:wg,transmission_pars_fragment:Tg,uv_pars_fragment:Ag,uv_pars_vertex:Rg,uv_vertex:Cg,worldpos_vertex:Pg,background_vert:Dg,background_frag:Lg,backgroundCube_vert:Ig,backgroundCube_frag:Ug,cube_vert:Ng,cube_frag:Fg,depth_vert:kg,depth_frag:Og,distanceRGBA_vert:zg,distanceRGBA_frag:Bg,equirect_vert:Hg,equirect_frag:Vg,linedashed_vert:Gg,linedashed_frag:Wg,meshbasic_vert:Xg,meshbasic_frag:qg,meshlambert_vert:Yg,meshlambert_frag:jg,meshmatcap_vert:Kg,meshmatcap_frag:Zg,meshnormal_vert:$g,meshnormal_frag:Jg,meshphong_vert:Qg,meshphong_frag:t_,meshphysical_vert:e_,meshphysical_frag:n_,meshtoon_vert:i_,meshtoon_frag:s_,points_vert:r_,points_frag:a_,shadow_vert:o_,shadow_frag:c_,sprite_vert:l_,sprite_frag:h_},ot={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Cn={basic:{uniforms:Ye([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Ye([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Ye([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Ye([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Ye([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Ye([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Ye([ot.points,ot.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Ye([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Ye([ot.common,ot.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Ye([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Ye([ot.sprite,ot.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Ye([ot.common,ot.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Ye([ot.lights,ot.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Cn.physical={uniforms:Ye([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const ma={r:0,b:0,g:0},Pi=new $n,u_=new pe;function f_(i,t,e,n,s,r,a){const o=new Wt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function _(E){let M=!1;const A=g(E);A===null?m(o,c):A&&A.isColor&&(m(A,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(E,M){const A=g(M);A&&(A.isCubeTexture||A.mapping===so)?(h===void 0&&(h=new Se(new _n(1,1,1),new Ge({name:"BackgroundCubeMaterial",uniforms:Ds(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Pi.copy(M.backgroundRotation),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(u_.makeRotationFromEuler(Pi)),h.material.toneMapped=Jt.getTransfer(A.colorSpace)!==ae,(u!==A||f!==A.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new Se(new Hs(2,2),new Ge({name:"BackgroundMaterial",uniforms:Ds(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(A.colorSpace)!==ae,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function m(E,M){E.getRGB(ma,ff(i)),n.buffers.color.setClear(ma.r,ma.g,ma.b,M,a)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,M=1){o.set(E),c=M,m(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,m(o,c)},render:_,addToRenderList:p,dispose:b}}function d_(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(y,P,O,H,Y){let G=!1;const K=u(H,O,P);r!==K&&(r=K,l(r.object)),G=d(y,H,O,Y),G&&g(y,H,O,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,M(y,P,O,H),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,P,O){const H=O.wireframe===!0;let Y=n[y.id];Y===void 0&&(Y={},n[y.id]=Y);let G=Y[P.id];G===void 0&&(G={},Y[P.id]=G);let K=G[H];return K===void 0&&(K=f(c()),G[H]=K),K}function f(y){const P=[],O=[],H=[];for(let Y=0;Y<e;Y++)P[Y]=0,O[Y]=0,H[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:H,object:y,attributes:{},index:null}}function d(y,P,O,H){const Y=r.attributes,G=P.attributes;let K=0;const $=O.getAttributes();for(const V in $)if($[V].location>=0){const ct=Y[V];let ft=G[V];if(ft===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),ct===void 0||ct.attribute!==ft||ft&&ct.data!==ft.data)return!0;K++}return r.attributesNum!==K||r.index!==H}function g(y,P,O,H){const Y={},G=P.attributes;let K=0;const $=O.getAttributes();for(const V in $)if($[V].location>=0){let ct=G[V];ct===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor));const ft={};ft.attribute=ct,ct&&ct.data&&(ft.data=ct.data),Y[V]=ft,K++}r.attributes=Y,r.attributesNum=K,r.index=H}function _(){const y=r.newAttributes;for(let P=0,O=y.length;P<O;P++)y[P]=0}function p(y){m(y,0)}function m(y,P){const O=r.newAttributes,H=r.enabledAttributes,Y=r.attributeDivisors;O[y]=1,H[y]===0&&(i.enableVertexAttribArray(y),H[y]=1),Y[y]!==P&&(i.vertexAttribDivisor(y,P),Y[y]=P)}function b(){const y=r.newAttributes,P=r.enabledAttributes;for(let O=0,H=P.length;O<H;O++)P[O]!==y[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function E(y,P,O,H,Y,G,K){K===!0?i.vertexAttribIPointer(y,P,O,Y,G):i.vertexAttribPointer(y,P,O,H,Y,G)}function M(y,P,O,H){_();const Y=H.attributes,G=O.getAttributes(),K=P.defaultAttributeValues;for(const $ in G){const V=G[$];if(V.location>=0){let st=Y[$];if(st===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(st=y.instanceColor)),st!==void 0){const ct=st.normalized,ft=st.itemSize,Vt=t.get(st);if(Vt===void 0)continue;const te=Vt.buffer,he=Vt.type,Gt=Vt.bytesPerElement,j=he===i.INT||he===i.UNSIGNED_INT||st.gpuType===gl;if(st.isInterleavedBufferAttribute){const J=st.data,pt=J.stride,Pt=st.offset;if(J.isInstancedInterleavedBuffer){for(let Mt=0;Mt<V.locationSize;Mt++)m(V.location+Mt,J.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Mt=0;Mt<V.locationSize;Mt++)p(V.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Mt=0;Mt<V.locationSize;Mt++)E(V.location+Mt,ft/V.locationSize,he,ct,pt*Gt,(Pt+ft/V.locationSize*Mt)*Gt,j)}else{if(st.isInstancedBufferAttribute){for(let J=0;J<V.locationSize;J++)m(V.location+J,st.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let J=0;J<V.locationSize;J++)p(V.location+J);i.bindBuffer(i.ARRAY_BUFFER,te);for(let J=0;J<V.locationSize;J++)E(V.location+J,ft/V.locationSize,he,ct,ft*Gt,ft/V.locationSize*J*Gt,j)}}else if(K!==void 0){const ct=K[$];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(V.location,ct);break;case 3:i.vertexAttrib3fv(V.location,ct);break;case 4:i.vertexAttrib4fv(V.location,ct);break;default:i.vertexAttrib1fv(V.location,ct)}}}}b()}function A(){I();for(const y in n){const P=n[y];for(const O in P){const H=P[O];for(const Y in H)h(H[Y].object),delete H[Y];delete P[O]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const O in P){const H=P[O];for(const Y in H)h(H[Y].object),delete H[Y];delete P[O]}delete n[y.id]}function C(y){for(const P in n){const O=n[P];if(O[y.id]===void 0)continue;const H=O[y.id];for(const Y in H)h(H[Y].object),delete H[Y];delete O[y.id]}}function I(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function p_(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function m_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Tn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const I=C===Ur&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Zn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Dn&&!I)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:M,vertexTextures:A,maxSamples:T}}function g_(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Ii,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const b=r?0:n,E=b*4;let M=m.clippingState||null;c.value=M,M=h(g,f,E,d);for(let A=0;A!==E;++A)M[A]=e[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=d+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<m)&&(p=new Float32Array(m));for(let E=0,M=d;E!==_;++E,M+=4)a.copy(u[E]).applyMatrix4(b,o),a.normal.toArray(p,M),p[M+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function __(i){let t=new WeakMap;function e(a,o){return o===Mc?a.mapping=Rs:o===yc&&(a.mapping=Cs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Mc||o===yc)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new dm(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ys=4,Dh=[.125,.215,.35,.446,.526,.582],zi=20,Bo=new Rm,Lh=new Wt;let Ho=null,Vo=0,Go=0,Wo=!1;const Ui=(1+Math.sqrt(5))/2,_s=1/Ui,Ih=[new L(-Ui,_s,0),new L(Ui,_s,0),new L(-_s,0,Ui),new L(_s,0,Ui),new L(0,Ui,-_s),new L(0,Ui,_s),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],v_=new L;class Uh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=v_}=r;Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ho,Vo,Go),this._renderer.xr.enabled=Wo,t.scissorTest=!1,ga(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rs||t.mapping===Cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:Ur,format:Tn,colorSpace:Ps,depthBuffer:!1},s=Nh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=x_(r)),this._blurMaterial=M_(r,t,e)}return s}_compileMaterial(t){const e=new Se(this._lodPlanes[0],t);this._renderer.compile(e,Bo)}_sceneToCubeUV(t,e,n,s,r){const c=new mn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Lh),u.toneMapping=Xn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new Zi({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),p=new Se(new _n,_);let m=!1;const b=t.background;b?b.isColor&&(_.color.copy(b),t.background=null,m=!0):(_.color.copy(Lh),m=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):M===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));const A=this._cubeSize;ga(s,M*A,E>2?A:0,A,A),u.setRenderTarget(s),m&&u.render(p,c),u.render(t,c)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Rs||t.mapping===Cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Se(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ga(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Bo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ih[(s-r-1)%Ih.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Se(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*zi-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):zi;p>zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zi}`);const m=[];let b=0;for(let C=0;C<zi;++C){const I=C/_,S=Math.exp(-I*I/2);m.push(S),C===0?b+=S:C<p&&(b+=2*S)}for(let C=0;C<m.length;C++)m[C]=m[C]/b;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-n;const M=this._sizeLods[s],A=3*M*(s>E-ys?s-E+ys:0),T=4*(this._cubeSize-M);ga(e,A,T,3*M,2*M),c.setRenderTarget(e),c.render(u,Bo)}}function x_(i){const t=[],e=[],n=[];let s=i;const r=i-ys+1+Dh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-ys?c=Dh[a-i+ys-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,p=2,m=1,b=new Float32Array(_*g*d),E=new Float32Array(p*g*d),M=new Float32Array(m*g*d);for(let T=0;T<d;T++){const C=T%3*2/3-1,I=T>2?0:-1,S=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];b.set(S,_*g*T),E.set(f,p*g*T);const y=[T,T,T,T,T,T];M.set(y,m*g*T)}const A=new We;A.setAttribute("position",new $e(b,_)),A.setAttribute("uv",new $e(E,p)),A.setAttribute("faceIndex",new $e(M,m)),t.push(A),s>ys&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Nh(i,t,e){const n=new Ki(i,t,e);return n.texture.mapping=so,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ga(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function M_(i,t,e){const n=new Float32Array(zi),s=new L(0,1,0);return new Ge({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function Fh(){return new Ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function kh(){return new Ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Tl(){return`

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
	`}function y_(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Mc||c===yc,h=c===Rs||c===Cs;if(l||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Uh(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Uh(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function b_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function S_(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const b=d.array;_=d.version;for(let E=0,M=b.length;E<M;E+=3){const A=b[E+0],T=b[E+1],C=b[E+2];f.push(A,T,T,C,C,A)}}else if(g!==void 0){const b=g.array;_=g.version;for(let E=0,M=b.length/3-1;E<M;E+=3){const A=E+0,T=E+1,C=E+2;f.push(A,T,T,C,C,A)}}else return;const p=new(af(f)?uf:hf)(f,1);p.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function E_(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function u(f,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/a,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let m=0;for(let b=0;b<g;b++)m+=d[b]*_[b];e.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function w_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function T_(i,t,e){const n=new WeakMap,s=new we;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let y=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),p===!0&&(M=3);let A=o.attributes.position.count*M,T=1;A>t.maxTextureSize&&(T=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const C=new Float32Array(A*T*4*u),I=new of(C,A,T,u);I.type=Dn,I.needsUpdate=!0;const S=M*4;for(let P=0;P<u;P++){const O=m[P],H=b[P],Y=E[P],G=A*T*4*P;for(let K=0;K<O.count;K++){const $=K*S;g===!0&&(s.fromBufferAttribute(O,K),C[G+$+0]=s.x,C[G+$+1]=s.y,C[G+$+2]=s.z,C[G+$+3]=0),_===!0&&(s.fromBufferAttribute(H,K),C[G+$+4]=s.x,C[G+$+5]=s.y,C[G+$+6]=s.z,C[G+$+7]=0),p===!0&&(s.fromBufferAttribute(Y,K),C[G+$+8]=s.x,C[G+$+9]=s.y,C[G+$+10]=s.z,C[G+$+11]=Y.itemSize===4?s.w:1)}}f={count:u,texture:I,size:new jt(A,T)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function A_(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const bf=new Ve,Oh=new xf(1,1),Sf=new of,Ef=new Zp,wf=new pf,zh=[],Bh=[],Hh=new Float32Array(16),Vh=new Float32Array(9),Gh=new Float32Array(4);function Vs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=zh[s];if(r===void 0&&(r=new Float32Array(s),zh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function De(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ro(i,t){let e=Bh[t];e===void 0&&(e=new Int32Array(t),Bh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function R_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function C_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function P_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function D_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function L_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;Gh.set(n),i.uniformMatrix2fv(this.addr,!1,Gh),Le(e,n)}}function I_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;Vh.set(n),i.uniformMatrix3fv(this.addr,!1,Vh),Le(e,n)}}function U_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(De(e,n))return;Hh.set(n),i.uniformMatrix4fv(this.addr,!1,Hh),Le(e,n)}}function N_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function F_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function k_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function O_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function z_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function B_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function H_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function V_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function G_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Oh.compareFunction=rf,r=Oh):r=bf,e.setTexture2D(t||r,s)}function W_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ef,s)}function X_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||wf,s)}function q_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Sf,s)}function Y_(i){switch(i){case 5126:return R_;case 35664:return C_;case 35665:return P_;case 35666:return D_;case 35674:return L_;case 35675:return I_;case 35676:return U_;case 5124:case 35670:return N_;case 35667:case 35671:return F_;case 35668:case 35672:return k_;case 35669:case 35673:return O_;case 5125:return z_;case 36294:return B_;case 36295:return H_;case 36296:return V_;case 35678:case 36198:case 36298:case 36306:case 35682:return G_;case 35679:case 36299:case 36307:return W_;case 35680:case 36300:case 36308:case 36293:return X_;case 36289:case 36303:case 36311:case 36292:return q_}}function j_(i,t){i.uniform1fv(this.addr,t)}function K_(i,t){const e=Vs(t,this.size,2);i.uniform2fv(this.addr,e)}function Z_(i,t){const e=Vs(t,this.size,3);i.uniform3fv(this.addr,e)}function $_(i,t){const e=Vs(t,this.size,4);i.uniform4fv(this.addr,e)}function J_(i,t){const e=Vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Q_(i,t){const e=Vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function tv(i,t){const e=Vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ev(i,t){i.uniform1iv(this.addr,t)}function nv(i,t){i.uniform2iv(this.addr,t)}function iv(i,t){i.uniform3iv(this.addr,t)}function sv(i,t){i.uniform4iv(this.addr,t)}function rv(i,t){i.uniform1uiv(this.addr,t)}function av(i,t){i.uniform2uiv(this.addr,t)}function ov(i,t){i.uniform3uiv(this.addr,t)}function cv(i,t){i.uniform4uiv(this.addr,t)}function lv(i,t,e){const n=this.cache,s=t.length,r=ro(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||bf,r[a])}function hv(i,t,e){const n=this.cache,s=t.length,r=ro(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Ef,r[a])}function uv(i,t,e){const n=this.cache,s=t.length,r=ro(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||wf,r[a])}function fv(i,t,e){const n=this.cache,s=t.length,r=ro(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Sf,r[a])}function dv(i){switch(i){case 5126:return j_;case 35664:return K_;case 35665:return Z_;case 35666:return $_;case 35674:return J_;case 35675:return Q_;case 35676:return tv;case 5124:case 35670:return ev;case 35667:case 35671:return nv;case 35668:case 35672:return iv;case 35669:case 35673:return sv;case 5125:return rv;case 36294:return av;case 36295:return ov;case 36296:return cv;case 35678:case 36198:case 36298:case 36306:case 35682:return lv;case 35679:case 36299:case 36307:return hv;case 35680:case 36300:case 36308:case 36293:return uv;case 36289:case 36303:case 36311:case 36292:return fv}}class pv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Y_(e.type)}}class mv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=dv(e.type)}}class gv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Xo=/(\w+)(\])?(\[|\.)?/g;function Wh(i,t){i.seq.push(t),i.map[t.id]=t}function _v(i,t,e){const n=i.name,s=n.length;for(Xo.lastIndex=0;;){const r=Xo.exec(n),a=Xo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Wh(e,l===void 0?new pv(o,i,t):new mv(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new gv(o),Wh(e,u)),e=u}}}class Pa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);_v(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Xh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const vv=37297;let xv=0;function Mv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const qh=new Bt;function yv(i){Jt._getMatrix(qh,Jt.workingColorSpace,i);const t=`mat3( ${qh.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case Ha:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Yh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Mv(i.getShaderSource(t),o)}else return r}function bv(i,t){const e=yv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Sv(i,t){let e;switch(t){case op:e="Linear";break;case cp:e="Reinhard";break;case lp:e="Cineon";break;case hp:e="ACESFilmic";break;case fp:e="AgX";break;case dp:e="Neutral";break;case up:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _a=new L;function Ev(){Jt.getLuminanceCoefficients(_a);const i=_a.x.toFixed(4),t=_a.y.toFixed(4),e=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hr).join(`
`)}function Tv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Av(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function hr(i){return i!==""}function jh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Rv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qc(i){return i.replace(Rv,Pv)}const Cv=new Map;function Pv(i,t){let e=Ht[t];if(e===void 0){const n=Cv.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qc(e)}const Dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zh(i){return i.replace(Dv,Lv)}function Lv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $h(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Iv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ju?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Bd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(t="SHADOWMAP_TYPE_VSM"),t}function Uv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Rs:case Cs:t="ENVMAP_TYPE_CUBE";break;case so:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Nv(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Cs&&(t="ENVMAP_MODE_REFRACTION"),t}function Fv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ku:t="ENVMAP_BLENDING_MULTIPLY";break;case rp:t="ENVMAP_BLENDING_MIX";break;case ap:t="ENVMAP_BLENDING_ADD";break}return t}function kv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Ov(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Iv(e),l=Uv(e),h=Nv(e),u=Fv(e),f=kv(e),d=wv(e),g=Tv(r),_=s.createProgram();let p,m,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(hr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(hr).join(`
`),m.length>0&&(m+=`
`)):(p=[$h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),m=[$h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Xn?Sv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,bv("linearToOutputTexel",e.outputColorSpace),Ev(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(hr).join(`
`)),a=Qc(a),a=jh(a,e),a=Kh(a,e),o=Qc(o),o=jh(o,e),o=Kh(o,e),a=Zh(a),o=Zh(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===nh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=b+p+a,M=b+m+o,A=Xh(s,s.VERTEX_SHADER,E),T=Xh(s,s.FRAGMENT_SHADER,M);s.attachShader(_,A),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",H=s.getShaderInfoLog(A)||"",Y=s.getShaderInfoLog(T)||"",G=O.trim(),K=H.trim(),$=Y.trim();let V=!0,st=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,T);else{const ct=Yh(s,A,"vertex"),ft=Yh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+G+`
`+ct+`
`+ft)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(K===""||$==="")&&(st=!1);st&&(P.diagnostics={runnable:V,programLog:G,vertexShader:{log:K,prefix:p},fragmentShader:{log:$,prefix:m}})}s.deleteShader(A),s.deleteShader(T),I=new Pa(s,_),S=Av(s,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,vv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xv++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let zv=0;class Bv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Hv(t),e.set(t,n)),n}}class Hv{constructor(t){this.id=zv++,this.code=t,this.usedTimes=0}}function Vv(i,t,e,n,s,r,a){const o=new cf,c=new Bv,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,y,P,O,H){const Y=O.fog,G=H.geometry,K=S.isMeshStandardMaterial?O.environment:null,$=(S.isMeshStandardMaterial?e:t).get(S.envMap||K),V=$&&$.mapping===so?$.image.height:null,st=g[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const ct=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ft=ct!==void 0?ct.length:0;let Vt=0;G.morphAttributes.position!==void 0&&(Vt=1),G.morphAttributes.normal!==void 0&&(Vt=2),G.morphAttributes.color!==void 0&&(Vt=3);let te,he,Gt,j;if(st){const ee=Cn[st];te=ee.vertexShader,he=ee.fragmentShader}else te=S.vertexShader,he=S.fragmentShader,c.update(S),Gt=c.getVertexShaderID(S),j=c.getFragmentShaderID(S);const J=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Pt=H.isInstancedMesh===!0,Mt=H.isBatchedMesh===!0,Xt=!!S.map,Te=!!S.matcap,R=!!$,oe=!!S.aoMap,Nt=!!S.lightMap,Ct=!!S.bumpMap,gt=!!S.normalMap,ce=!!S.displacementMap,_t=!!S.emissiveMap,kt=!!S.metalnessMap,Ee=!!S.roughnessMap,me=S.anisotropy>0,w=S.clearcoat>0,v=S.dispersion>0,k=S.iridescence>0,q=S.sheen>0,Q=S.transmission>0,X=me&&!!S.anisotropyMap,wt=w&&!!S.clearcoatMap,rt=w&&!!S.clearcoatNormalMap,yt=w&&!!S.clearcoatRoughnessMap,bt=k&&!!S.iridescenceMap,nt=k&&!!S.iridescenceThicknessMap,ut=q&&!!S.sheenColorMap,Lt=q&&!!S.sheenRoughnessMap,St=!!S.specularMap,lt=!!S.specularColorMap,zt=!!S.specularIntensityMap,D=Q&&!!S.transmissionMap,it=Q&&!!S.thicknessMap,at=!!S.gradientMap,mt=!!S.alphaMap,tt=S.alphaTest>0,Z=!!S.alphaHash,xt=!!S.extensions;let Ot=Xn;S.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const ue={shaderID:st,shaderType:S.type,shaderName:S.name,vertexShader:te,fragmentShader:he,defines:S.defines,customVertexShaderID:Gt,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Mt,batchingColor:Mt&&H._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&H.instanceColor!==null,instancingMorph:Pt&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ps,alphaToCoverage:!!S.alphaToCoverage,map:Xt,matcap:Te,envMap:R,envMapMode:R&&$.mapping,envMapCubeUVHeight:V,aoMap:oe,lightMap:Nt,bumpMap:Ct,normalMap:gt,displacementMap:f&&ce,emissiveMap:_t,normalMapObjectSpace:gt&&S.normalMapType===vp,normalMapTangentSpace:gt&&S.normalMapType===_p,metalnessMap:kt,roughnessMap:Ee,anisotropy:me,anisotropyMap:X,clearcoat:w,clearcoatMap:wt,clearcoatNormalMap:rt,clearcoatRoughnessMap:yt,dispersion:v,iridescence:k,iridescenceMap:bt,iridescenceThicknessMap:nt,sheen:q,sheenColorMap:ut,sheenRoughnessMap:Lt,specularMap:St,specularColorMap:lt,specularIntensityMap:zt,transmission:Q,transmissionMap:D,thicknessMap:it,gradientMap:at,opaque:S.transparent===!1&&S.blending===Ss&&S.alphaToCoverage===!1,alphaMap:mt,alphaTest:tt,alphaHash:Z,combine:S.combine,mapUv:Xt&&_(S.map.channel),aoMapUv:oe&&_(S.aoMap.channel),lightMapUv:Nt&&_(S.lightMap.channel),bumpMapUv:Ct&&_(S.bumpMap.channel),normalMapUv:gt&&_(S.normalMap.channel),displacementMapUv:ce&&_(S.displacementMap.channel),emissiveMapUv:_t&&_(S.emissiveMap.channel),metalnessMapUv:kt&&_(S.metalnessMap.channel),roughnessMapUv:Ee&&_(S.roughnessMap.channel),anisotropyMapUv:X&&_(S.anisotropyMap.channel),clearcoatMapUv:wt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:rt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&_(S.sheenRoughnessMap.channel),specularMapUv:St&&_(S.specularMap.channel),specularColorMapUv:lt&&_(S.specularColorMap.channel),specularIntensityMapUv:zt&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:it&&_(S.thicknessMap.channel),alphaMapUv:mt&&_(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(gt||me),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!G.attributes.uv&&(Xt||mt),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pt,skinning:H.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Vt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Xt&&S.map.isVideoTexture===!0&&Jt.getTransfer(S.map.colorSpace)===ae,decodeVideoTextureEmissive:_t&&S.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(S.emissiveMap.colorSpace)===ae,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Sn,flipSided:S.side===Ze,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:xt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&S.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ue.vertexUv1s=l.has(1),ue.vertexUv2s=l.has(2),ue.vertexUv3s=l.has(3),l.clear(),ue}function m(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)y.push(P),y.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(b(y,S),E(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function b(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function E(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function M(S){const y=g[S.type];let P;if(y){const O=Cn[y];P=lm.clone(O.uniforms)}else P=S.uniforms;return P}function A(S,y){let P;for(let O=0,H=h.length;O<H;O++){const Y=h[O];if(Y.cacheKey===y){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new Ov(i,y,S,r),h.push(P)),P}function T(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function C(S){c.remove(S)}function I(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:M,acquireProgram:A,releaseProgram:T,releaseShaderCache:C,programs:h,dispose:I}}function Gv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Wv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Jh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Qh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,g,_,p){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function o(u,f,d,g,_,p){const m=a(u,f,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):e.push(m)}function c(u,f,d,g,_,p){const m=a(u,f,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,f){e.length>1&&e.sort(u||Wv),n.length>1&&n.sort(f||Jh),s.length>1&&s.sort(f||Jh)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Xv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Qh,i.set(n,[a])):s>=r.length?(a=new Qh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function qv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Wt};break;case"SpotLight":e={position:new L,direction:new L,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Yv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let jv=0;function Kv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Zv(i){const t=new qv,e=Yv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new pe,a=new pe;function o(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,b=0,E=0,M=0,A=0,T=0,C=0;l.sort(Kv);for(let S=0,y=l.length;S<y;S++){const P=l[S],O=P.color,H=P.intensity,Y=P.distance,G=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*H,u+=O.g*H,f+=O.b*H;else if(P.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(P.sh.coefficients[K],H);C++}else if(P.isDirectionalLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,V=e.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=P.shadow.matrix,b++}n.directional[d]=K,d++}else if(P.isSpotLight){const K=t.get(P);K.position.setFromMatrixPosition(P.matrixWorld),K.color.copy(O).multiplyScalar(H),K.distance=Y,K.coneCos=Math.cos(P.angle),K.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),K.decay=P.decay,n.spot[_]=K;const $=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,$.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=$.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=G,M++}_++}else if(P.isRectAreaLight){const K=t.get(P);K.color.copy(O).multiplyScalar(H),K.halfWidth.set(P.width*.5,0,0),K.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=K,p++}else if(P.isPointLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),K.distance=P.distance,K.decay=P.decay,P.castShadow){const $=P.shadow,V=e.get(P);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,V.shadowCameraNear=$.camera.near,V.shadowCameraFar=$.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=P.shadow.matrix,E++}n.point[g]=K,g++}else if(P.isHemisphereLight){const K=t.get(P);K.skyColor.copy(P.color).multiplyScalar(H),K.groundColor.copy(P.groundColor).multiplyScalar(H),n.hemi[m]=K,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==d||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==m||I.numDirectionalShadows!==b||I.numPointShadows!==E||I.numSpotShadows!==M||I.numSpotMaps!==A||I.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=M+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,I.directionalLength=d,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=m,I.numDirectionalShadows=b,I.numPointShadows=E,I.numSpotShadows=M,I.numSpotMaps=A,I.numLightProbes=C,n.version=jv++)}function c(l,h){let u=0,f=0,d=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,b=l.length;m<b;m++){const E=l[m];if(E.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),u++}else if(E.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(E.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(E.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(p),_++}}}return{setup:o,setupView:c,state:n}}function tu(i){const t=new Zv(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function $v(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new tu(i),t.set(s,[o])):r>=a.length?(o=new tu(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Jv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qv=`uniform sampler2D shadow_pass;
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
}`;function tx(i,t,e){let n=new _f;const s=new jt,r=new jt,a=new we,o=new Tm({depthPacking:gp}),c=new Am,l={},h=e.maxTextureSize,u={[_i]:Ze,[Ze]:_i,[Sn]:Sn},f=new Ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:Jv,fragmentShader:Qv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new We;g.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Se(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ju;let m=this.type;this.render=function(T,C,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(di),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=m!==Gn&&this.type===Gn,Y=m===Gn&&this.type!==Gn;for(let G=0,K=T.length;G<K;G++){const $=T[G],V=$.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const st=V.getFrameExtents();if(s.multiply(st),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,V.mapSize.y=r.y)),V.map===null||H===!0||Y===!0){const ft=this.type!==Gn?{minFilter:Pe,magFilter:Pe}:{};V.map!==null&&V.map.dispose(),V.map=new Ki(s.x,s.y,ft),V.map.texture.name=$.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ct=V.getViewportCount();for(let ft=0;ft<ct;ft++){const Vt=V.getViewport(ft);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),O.viewport(a),V.updateMatrices($,ft),n=V.getFrustum(),M(C,I,V.camera,$,this.type)}V.isPointLightShadow!==!0&&this.type===Gn&&b(V,I),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(S,y,P)};function b(T,C){const I=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ki(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,I,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,I,d,_,null)}function E(T,C,I,S){let y=null;const P=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)y=P;else if(y=I.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=y.uuid,H=C.uuid;let Y=l[O];Y===void 0&&(Y={},l[O]=Y);let G=Y[H];G===void 0&&(G=y.clone(),Y[H]=G,C.addEventListener("dispose",A)),y=G}if(y.visible=C.visible,y.wireframe=C.wireframe,S===Gn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const O=i.properties.get(y);O.light=I}return y}function M(T,C,I,S,y){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===Gn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);const H=t.update(T),Y=T.material;if(Array.isArray(Y)){const G=H.groups;for(let K=0,$=G.length;K<$;K++){const V=G[K],st=Y[V.materialIndex];if(st&&st.visible){const ct=E(T,st,S,y);T.onBeforeShadow(i,T,C,I,H,ct,V),i.renderBufferDirect(I,null,H,ct,T,V),T.onAfterShadow(i,T,C,I,H,ct,V)}}}else if(Y.visible){const G=E(T,Y,S,y);T.onBeforeShadow(i,T,C,I,H,G,null),i.renderBufferDirect(I,null,H,G,T,null),T.onAfterShadow(i,T,C,I,H,G,null)}}const O=T.children;for(let H=0,Y=O.length;H<Y;H++)M(O[H],C,I,S,y)}function A(T){T.target.removeEventListener("dispose",A);for(const I in l){const S=l[I],y=T.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const ex={[dc]:pc,[mc]:vc,[gc]:xc,[As]:_c,[pc]:dc,[vc]:mc,[xc]:gc,[_c]:As};function nx(i,t){function e(){let D=!1;const it=new we;let at=null;const mt=new we(0,0,0,0);return{setMask:function(tt){at!==tt&&!D&&(i.colorMask(tt,tt,tt,tt),at=tt)},setLocked:function(tt){D=tt},setClear:function(tt,Z,xt,Ot,ue){ue===!0&&(tt*=Ot,Z*=Ot,xt*=Ot),it.set(tt,Z,xt,Ot),mt.equals(it)===!1&&(i.clearColor(tt,Z,xt,Ot),mt.copy(it))},reset:function(){D=!1,at=null,mt.set(-1,0,0,0)}}}function n(){let D=!1,it=!1,at=null,mt=null,tt=null;return{setReversed:function(Z){if(it!==Z){const xt=t.get("EXT_clip_control");Z?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),it=Z;const Ot=tt;tt=null,this.setClear(Ot)}},getReversed:function(){return it},setTest:function(Z){Z?J(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(Z){at!==Z&&!D&&(i.depthMask(Z),at=Z)},setFunc:function(Z){if(it&&(Z=ex[Z]),mt!==Z){switch(Z){case dc:i.depthFunc(i.NEVER);break;case pc:i.depthFunc(i.ALWAYS);break;case mc:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case gc:i.depthFunc(i.EQUAL);break;case _c:i.depthFunc(i.GEQUAL);break;case vc:i.depthFunc(i.GREATER);break;case xc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=Z}},setLocked:function(Z){D=Z},setClear:function(Z){tt!==Z&&(it&&(Z=1-Z),i.clearDepth(Z),tt=Z)},reset:function(){D=!1,at=null,mt=null,tt=null,it=!1}}}function s(){let D=!1,it=null,at=null,mt=null,tt=null,Z=null,xt=null,Ot=null,ue=null;return{setTest:function(ee){D||(ee?J(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(ee){it!==ee&&!D&&(i.stencilMask(ee),it=ee)},setFunc:function(ee,kn,An){(at!==ee||mt!==kn||tt!==An)&&(i.stencilFunc(ee,kn,An),at=ee,mt=kn,tt=An)},setOp:function(ee,kn,An){(Z!==ee||xt!==kn||Ot!==An)&&(i.stencilOp(ee,kn,An),Z=ee,xt=kn,Ot=An)},setLocked:function(ee){D=ee},setClear:function(ee){ue!==ee&&(i.clearStencil(ee),ue=ee)},reset:function(){D=!1,it=null,at=null,mt=null,tt=null,Z=null,xt=null,Ot=null,ue=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,p=null,m=null,b=null,E=null,M=null,A=null,T=null,C=new Wt(0,0,0),I=0,S=!1,y=null,P=null,O=null,H=null,Y=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,$=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(V)[1]),K=$>=1):V.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),K=$>=2);let st=null,ct={};const ft=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),te=new we().fromArray(ft),he=new we().fromArray(Vt);function Gt(D,it,at,mt){const tt=new Uint8Array(4),Z=i.createTexture();i.bindTexture(D,Z),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<at;xt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,tt):i.texImage2D(it+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,tt);return Z}const j={};j[i.TEXTURE_2D]=Gt(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Gt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Gt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Gt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(As),Ct(!1),gt($l),J(i.CULL_FACE),oe(di);function J(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function pt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Pt(D,it){return u[D]!==it?(i.bindFramebuffer(D,it),u[D]=it,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=it),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=it),!0):!1}function Mt(D,it){let at=d,mt=!1;if(D){at=f.get(it),at===void 0&&(at=[],f.set(it,at));const tt=D.textures;if(at.length!==tt.length||at[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,xt=tt.length;Z<xt;Z++)at[Z]=i.COLOR_ATTACHMENT0+Z;at.length=tt.length,mt=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,mt=!0);mt&&i.drawBuffers(at)}function Xt(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const Te={[Oi]:i.FUNC_ADD,[Vd]:i.FUNC_SUBTRACT,[Gd]:i.FUNC_REVERSE_SUBTRACT};Te[Wd]=i.MIN,Te[Xd]=i.MAX;const R={[qd]:i.ZERO,[Yd]:i.ONE,[jd]:i.SRC_COLOR,[uc]:i.SRC_ALPHA,[tp]:i.SRC_ALPHA_SATURATE,[Jd]:i.DST_COLOR,[Zd]:i.DST_ALPHA,[Kd]:i.ONE_MINUS_SRC_COLOR,[fc]:i.ONE_MINUS_SRC_ALPHA,[Qd]:i.ONE_MINUS_DST_COLOR,[$d]:i.ONE_MINUS_DST_ALPHA,[ep]:i.CONSTANT_COLOR,[np]:i.ONE_MINUS_CONSTANT_COLOR,[ip]:i.CONSTANT_ALPHA,[sp]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(D,it,at,mt,tt,Z,xt,Ot,ue,ee){if(D===di){_===!0&&(pt(i.BLEND),_=!1);return}if(_===!1&&(J(i.BLEND),_=!0),D!==Hd){if(D!==p||ee!==S){if((m!==Oi||M!==Oi)&&(i.blendEquation(i.FUNC_ADD),m=Oi,M=Oi),ee)switch(D){case Ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jl:i.blendFunc(i.ONE,i.ONE);break;case Ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case th:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Jl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ql:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case th:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,E=null,A=null,T=null,C.set(0,0,0),I=0,p=D,S=ee}return}tt=tt||it,Z=Z||at,xt=xt||mt,(it!==m||tt!==M)&&(i.blendEquationSeparate(Te[it],Te[tt]),m=it,M=tt),(at!==b||mt!==E||Z!==A||xt!==T)&&(i.blendFuncSeparate(R[at],R[mt],R[Z],R[xt]),b=at,E=mt,A=Z,T=xt),(Ot.equals(C)===!1||ue!==I)&&(i.blendColor(Ot.r,Ot.g,Ot.b,ue),C.copy(Ot),I=ue),p=D,S=!1}function Nt(D,it){D.side===Sn?pt(i.CULL_FACE):J(i.CULL_FACE);let at=D.side===Ze;it&&(at=!at),Ct(at),D.blending===Ss&&D.transparent===!1?oe(di):oe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const mt=D.stencilWrite;o.setTest(mt),mt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_t(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(D){y!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),y=D)}function gt(D){D!==Od?(J(i.CULL_FACE),D!==P&&(D===$l?i.cullFace(i.BACK):D===zd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),P=D}function ce(D){D!==O&&(K&&i.lineWidth(D),O=D)}function _t(D,it,at){D?(J(i.POLYGON_OFFSET_FILL),(H!==it||Y!==at)&&(i.polygonOffset(it,at),H=it,Y=at)):pt(i.POLYGON_OFFSET_FILL)}function kt(D){D?J(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function Ee(D){D===void 0&&(D=i.TEXTURE0+G-1),st!==D&&(i.activeTexture(D),st=D)}function me(D,it,at){at===void 0&&(st===null?at=i.TEXTURE0+G-1:at=st);let mt=ct[at];mt===void 0&&(mt={type:void 0,texture:void 0},ct[at]=mt),(mt.type!==D||mt.texture!==it)&&(st!==at&&(i.activeTexture(at),st=at),i.bindTexture(D,it||j[D]),mt.type=D,mt.texture=it)}function w(){const D=ct[st];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function wt(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function rt(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(D){te.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),te.copy(D))}function Lt(D){he.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),he.copy(D))}function St(D,it){let at=l.get(it);at===void 0&&(at=new WeakMap,l.set(it,at));let mt=at.get(D);mt===void 0&&(mt=i.getUniformBlockIndex(it,D.name),at.set(D,mt))}function lt(D,it){const mt=l.get(it).get(D);c.get(it)!==mt&&(i.uniformBlockBinding(it,mt,D.__bindingPointIndex),c.set(it,mt))}function zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ct={},u={},f=new WeakMap,d=[],g=null,_=!1,p=null,m=null,b=null,E=null,M=null,A=null,T=null,C=new Wt(0,0,0),I=0,S=!1,y=null,P=null,O=null,H=null,Y=null,te.set(0,0,i.canvas.width,i.canvas.height),he.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:pt,bindFramebuffer:Pt,drawBuffers:Mt,useProgram:Xt,setBlending:oe,setMaterial:Nt,setFlipSided:Ct,setCullFace:gt,setLineWidth:ce,setPolygonOffset:_t,setScissorTest:kt,activeTexture:Ee,bindTexture:me,unbindTexture:w,compressedTexImage2D:v,compressedTexImage3D:k,texImage2D:bt,texImage3D:nt,updateUBOMapping:St,uniformBlockBinding:lt,texStorage2D:rt,texStorage3D:yt,texSubImage2D:q,texSubImage3D:Q,compressedTexSubImage2D:X,compressedTexSubImage3D:wt,scissor:ut,viewport:Lt,reset:zt}}function ix(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new jt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return d?new OffscreenCanvas(w,v):Ga("canvas")}function _(w,v,k){let q=1;const Q=me(w);if((Q.width>k||Q.height>k)&&(q=k/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const X=Math.floor(q*Q.width),wt=Math.floor(q*Q.height);u===void 0&&(u=g(X,wt));const rt=v?g(X,wt):u;return rt.width=X,rt.height=wt,rt.getContext("2d").drawImage(w,0,0,X,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+X+"x"+wt+")."),rt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function p(w){return w.generateMipmaps}function m(w){i.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,v,k,q,Q=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let X=v;if(v===i.RED&&(k===i.FLOAT&&(X=i.R32F),k===i.HALF_FLOAT&&(X=i.R16F),k===i.UNSIGNED_BYTE&&(X=i.R8)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.R8UI),k===i.UNSIGNED_SHORT&&(X=i.R16UI),k===i.UNSIGNED_INT&&(X=i.R32UI),k===i.BYTE&&(X=i.R8I),k===i.SHORT&&(X=i.R16I),k===i.INT&&(X=i.R32I)),v===i.RG&&(k===i.FLOAT&&(X=i.RG32F),k===i.HALF_FLOAT&&(X=i.RG16F),k===i.UNSIGNED_BYTE&&(X=i.RG8)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RG8UI),k===i.UNSIGNED_SHORT&&(X=i.RG16UI),k===i.UNSIGNED_INT&&(X=i.RG32UI),k===i.BYTE&&(X=i.RG8I),k===i.SHORT&&(X=i.RG16I),k===i.INT&&(X=i.RG32I)),v===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGB8UI),k===i.UNSIGNED_SHORT&&(X=i.RGB16UI),k===i.UNSIGNED_INT&&(X=i.RGB32UI),k===i.BYTE&&(X=i.RGB8I),k===i.SHORT&&(X=i.RGB16I),k===i.INT&&(X=i.RGB32I)),v===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),k===i.UNSIGNED_INT&&(X=i.RGBA32UI),k===i.BYTE&&(X=i.RGBA8I),k===i.SHORT&&(X=i.RGBA16I),k===i.INT&&(X=i.RGBA32I)),v===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),v===i.RGBA){const wt=Q?Ha:Jt.getTransfer(q);k===i.FLOAT&&(X=i.RGBA32F),k===i.HALF_FLOAT&&(X=i.RGBA16F),k===i.UNSIGNED_BYTE&&(X=wt===ae?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function M(w,v){let k;return w?v===null||v===ji||v===Er?k=i.DEPTH24_STENCIL8:v===Dn?k=i.DEPTH32F_STENCIL8:v===Sr&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ji||v===Er?k=i.DEPTH_COMPONENT24:v===Dn?k=i.DEPTH_COMPONENT32F:v===Sr&&(k=i.DEPTH_COMPONENT16),k}function A(w,v){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Pe&&w.minFilter!==Pn?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function T(w){const v=w.target;v.removeEventListener("dispose",T),I(v),v.isVideoTexture&&h.delete(v)}function C(w){const v=w.target;v.removeEventListener("dispose",C),y(v)}function I(w){const v=n.get(w);if(v.__webglInit===void 0)return;const k=w.source,q=f.get(k);if(q){const Q=q[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(w),Object.keys(q).length===0&&f.delete(k)}n.remove(w)}function S(w){const v=n.get(w);i.deleteTexture(v.__webglTexture);const k=w.source,q=f.get(k);delete q[v.__cacheKey],a.memory.textures--}function y(w){const v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let Q=0;Q<v.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=w.textures;for(let q=0,Q=k.length;q<Q;q++){const X=n.get(k[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(k[q])}n.remove(w)}let P=0;function O(){P=0}function H(){const w=P;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),P+=1,w}function Y(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function G(w,v){const k=n.get(w);if(w.isVideoTexture&&kt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){const q=w.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,w,v);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function K(w,v){const k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){j(k,w,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function $(w,v){const k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){j(k,w,v);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function V(w,v){const k=n.get(w);if(w.version>0&&k.__version!==w.version){J(k,w,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}const st={[bc]:i.REPEAT,[Hi]:i.CLAMP_TO_EDGE,[Sc]:i.MIRRORED_REPEAT},ct={[Pe]:i.NEAREST,[pp]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[Pn]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[hi]:i.LINEAR_MIPMAP_LINEAR},ft={[xp]:i.NEVER,[wp]:i.ALWAYS,[Mp]:i.LESS,[rf]:i.LEQUAL,[yp]:i.EQUAL,[Ep]:i.GEQUAL,[bp]:i.GREATER,[Sp]:i.NOTEQUAL};function Vt(w,v){if(v.type===Dn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Pn||v.magFilter===po||v.magFilter===cr||v.magFilter===hi||v.minFilter===Pn||v.minFilter===po||v.minFilter===cr||v.minFilter===hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,st[v.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,st[v.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,st[v.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ct[v.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ct[v.minFilter]),v.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Pe||v.minFilter!==cr&&v.minFilter!==hi||v.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function te(w,v){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",T));const q=v.source;let Q=f.get(q);Q===void 0&&(Q={},f.set(q,Q));const X=Y(v);if(X!==w.__cacheKey){Q[X]===void 0&&(Q[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[X].usedTimes++;const wt=Q[w.__cacheKey];wt!==void 0&&(Q[w.__cacheKey].usedTimes--,wt.usedTimes===0&&S(v)),w.__cacheKey=X,w.__webglTexture=Q[X].texture}return k}function he(w,v,k){return Math.floor(Math.floor(w/k)/v)}function Gt(w,v,k,q){const X=w.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,k,q,v.data);else{X.sort((nt,ut)=>nt.start-ut.start);let wt=0;for(let nt=1;nt<X.length;nt++){const ut=X[wt],Lt=X[nt],St=ut.start+ut.count,lt=he(Lt.start,v.width,4),zt=he(ut.start,v.width,4);Lt.start<=St+1&&lt===zt&&he(Lt.start+Lt.count-1,v.width,4)===lt?ut.count=Math.max(ut.count,Lt.start+Lt.count-ut.start):(++wt,X[wt]=Lt)}X.length=wt+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),yt=i.getParameter(i.UNPACK_SKIP_PIXELS),bt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let nt=0,ut=X.length;nt<ut;nt++){const Lt=X[nt],St=Math.floor(Lt.start/4),lt=Math.ceil(Lt.count/4),zt=St%v.width,D=Math.floor(St/v.width),it=lt,at=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,zt),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,zt,D,it,at,k,q,v.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,bt)}}function j(w,v,k){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const Q=te(w,v),X=v.source;e.bindTexture(q,w.__webglTexture,i.TEXTURE0+k);const wt=n.get(X);if(X.version!==wt.__version||Q===!0){e.activeTexture(i.TEXTURE0+k);const rt=Jt.getPrimaries(Jt.workingColorSpace),yt=v.colorSpace===oi?null:Jt.getPrimaries(v.colorSpace),bt=v.colorSpace===oi||rt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let nt=_(v.image,!1,s.maxTextureSize);nt=Ee(v,nt);const ut=r.convert(v.format,v.colorSpace),Lt=r.convert(v.type);let St=E(v.internalFormat,ut,Lt,v.colorSpace,v.isVideoTexture);Vt(q,v);let lt;const zt=v.mipmaps,D=v.isVideoTexture!==!0,it=wt.__version===void 0||Q===!0,at=X.dataReady,mt=A(v,nt);if(v.isDepthTexture)St=M(v.format===Tr,v.type),it&&(D?e.texStorage2D(i.TEXTURE_2D,1,St,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,St,nt.width,nt.height,0,ut,Lt,null));else if(v.isDataTexture)if(zt.length>0){D&&it&&e.texStorage2D(i.TEXTURE_2D,mt,St,zt[0].width,zt[0].height);for(let tt=0,Z=zt.length;tt<Z;tt++)lt=zt[tt],D?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Lt,lt.data):e.texImage2D(i.TEXTURE_2D,tt,St,lt.width,lt.height,0,ut,Lt,lt.data);v.generateMipmaps=!1}else D?(it&&e.texStorage2D(i.TEXTURE_2D,mt,St,nt.width,nt.height),at&&Gt(v,nt,ut,Lt)):e.texImage2D(i.TEXTURE_2D,0,St,nt.width,nt.height,0,ut,Lt,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,St,zt[0].width,zt[0].height,nt.depth);for(let tt=0,Z=zt.length;tt<Z;tt++)if(lt=zt[tt],v.format!==Tn)if(ut!==null)if(D){if(at)if(v.layerUpdates.size>0){const xt=Ph(lt.width,lt.height,v.format,v.type);for(const Ot of v.layerUpdates){const ue=lt.data.subarray(Ot*xt/lt.data.BYTES_PER_ELEMENT,(Ot+1)*xt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Ot,lt.width,lt.height,1,ut,ue)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,St,lt.width,lt.height,nt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?at&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,Lt,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,St,lt.width,lt.height,nt.depth,0,ut,Lt,lt.data)}else{D&&it&&e.texStorage2D(i.TEXTURE_2D,mt,St,zt[0].width,zt[0].height);for(let tt=0,Z=zt.length;tt<Z;tt++)lt=zt[tt],v.format!==Tn?ut!==null?D?at&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,St,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Lt,lt.data):e.texImage2D(i.TEXTURE_2D,tt,St,lt.width,lt.height,0,ut,Lt,lt.data)}else if(v.isDataArrayTexture)if(D){if(it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,St,nt.width,nt.height,nt.depth),at)if(v.layerUpdates.size>0){const tt=Ph(nt.width,nt.height,v.format,v.type);for(const Z of v.layerUpdates){const xt=nt.data.subarray(Z*tt/nt.data.BYTES_PER_ELEMENT,(Z+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,ut,Lt,xt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,Lt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,St,nt.width,nt.height,nt.depth,0,ut,Lt,nt.data);else if(v.isData3DTexture)D?(it&&e.texStorage3D(i.TEXTURE_3D,mt,St,nt.width,nt.height,nt.depth),at&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,Lt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,St,nt.width,nt.height,nt.depth,0,ut,Lt,nt.data);else if(v.isFramebufferTexture){if(it)if(D)e.texStorage2D(i.TEXTURE_2D,mt,St,nt.width,nt.height);else{let tt=nt.width,Z=nt.height;for(let xt=0;xt<mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,St,tt,Z,0,ut,Lt,null),tt>>=1,Z>>=1}}else if(zt.length>0){if(D&&it){const tt=me(zt[0]);e.texStorage2D(i.TEXTURE_2D,mt,St,tt.width,tt.height)}for(let tt=0,Z=zt.length;tt<Z;tt++)lt=zt[tt],D?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ut,Lt,lt):e.texImage2D(i.TEXTURE_2D,tt,St,ut,Lt,lt);v.generateMipmaps=!1}else if(D){if(it){const tt=me(nt);e.texStorage2D(i.TEXTURE_2D,mt,St,tt.width,tt.height)}at&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Lt,nt)}else e.texImage2D(i.TEXTURE_2D,0,St,ut,Lt,nt);p(v)&&m(q),wt.__version=X.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function J(w,v,k){if(v.image.length!==6)return;const q=te(w,v),Q=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);const X=n.get(Q);if(Q.version!==X.__version||q===!0){e.activeTexture(i.TEXTURE0+k);const wt=Jt.getPrimaries(Jt.workingColorSpace),rt=v.colorSpace===oi?null:Jt.getPrimaries(v.colorSpace),yt=v.colorSpace===oi||wt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const bt=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!bt&&!nt?ut[Z]=_(v.image[Z],!0,s.maxCubemapSize):ut[Z]=nt?v.image[Z].image:v.image[Z],ut[Z]=Ee(v,ut[Z]);const Lt=ut[0],St=r.convert(v.format,v.colorSpace),lt=r.convert(v.type),zt=E(v.internalFormat,St,lt,v.colorSpace),D=v.isVideoTexture!==!0,it=X.__version===void 0||q===!0,at=Q.dataReady;let mt=A(v,Lt);Vt(i.TEXTURE_CUBE_MAP,v);let tt;if(bt){D&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,zt,Lt.width,Lt.height);for(let Z=0;Z<6;Z++){tt=ut[Z].mipmaps;for(let xt=0;xt<tt.length;xt++){const Ot=tt[xt];v.format!==Tn?St!==null?D?at&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,0,0,Ot.width,Ot.height,St,Ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,zt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,0,0,Ot.width,Ot.height,St,lt,Ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt,zt,Ot.width,Ot.height,0,St,lt,Ot.data)}}}else{if(tt=v.mipmaps,D&&it){tt.length>0&&mt++;const Z=me(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,zt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,St,lt,ut[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,zt,ut[Z].width,ut[Z].height,0,St,lt,ut[Z].data);for(let xt=0;xt<tt.length;xt++){const ue=tt[xt].image[Z].image;D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,0,0,ue.width,ue.height,St,lt,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,zt,ue.width,ue.height,0,St,lt,ue.data)}}else{D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,St,lt,ut[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,zt,St,lt,ut[Z]);for(let xt=0;xt<tt.length;xt++){const Ot=tt[xt];D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,0,0,St,lt,Ot.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,xt+1,zt,St,lt,Ot.image[Z])}}}p(v)&&m(i.TEXTURE_CUBE_MAP),X.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function pt(w,v,k,q,Q,X){const wt=r.convert(k.format,k.colorSpace),rt=r.convert(k.type),yt=E(k.internalFormat,wt,rt,k.colorSpace),bt=n.get(v),nt=n.get(k);if(nt.__renderTarget=v,!bt.__hasExternalTextures){const ut=Math.max(1,v.width>>X),Lt=Math.max(1,v.height>>X);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,X,yt,ut,Lt,v.depth,0,wt,rt,null):e.texImage2D(Q,X,yt,ut,Lt,0,wt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),_t(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,nt.__webglTexture,0,ce(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,nt.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(w,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),v.depthBuffer){const q=v.depthTexture,Q=q&&q.isDepthTexture?q.type:null,X=M(v.stencilBuffer,Q),wt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=ce(v);_t(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,X,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,X,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,X,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,w)}else{const q=v.textures;for(let Q=0;Q<q.length;Q++){const X=q[Q],wt=r.convert(X.format,X.colorSpace),rt=r.convert(X.type),yt=E(X.internalFormat,wt,rt,X.colorSpace),bt=ce(v);k&&_t(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,yt,v.width,v.height):_t(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,yt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,yt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Mt(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const Q=q.__webglTexture,X=ce(v);if(v.depthTexture.format===wr)_t(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Tr)_t(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Xt(w){const v=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const q=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=q}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const q=w.texture.mipmaps;q&&q.length>0?Mt(v.__webglFramebuffer[0],w):Mt(v.__webglFramebuffer,w)}else if(k){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),Pt(v.__webglDepthbuffer[q],w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,X)}}else{const q=w.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Pt(v.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(w,v,k){const q=n.get(w);v!==void 0&&pt(q.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Xt(w)}function R(w){const v=w.texture,k=n.get(w),q=n.get(v);w.addEventListener("dispose",C);const Q=w.textures,X=w.isWebGLCubeRenderTarget===!0,wt=Q.length>1;if(wt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,a.memory.textures++),X){k.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[rt]=[];for(let yt=0;yt<v.mipmaps.length;yt++)k.__webglFramebuffer[rt][yt]=i.createFramebuffer()}else k.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let rt=0;rt<v.mipmaps.length;rt++)k.__webglFramebuffer[rt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(wt)for(let rt=0,yt=Q.length;rt<yt;rt++){const bt=n.get(Q[rt]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&_t(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const yt=Q[rt];k.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[rt]);const bt=r.convert(yt.format,yt.colorSpace),nt=r.convert(yt.type),ut=E(yt.internalFormat,bt,nt,yt.colorSpace,w.isXRRenderTarget===!0),Lt=ce(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,ut,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,k.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Pt(k.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,v);for(let rt=0;rt<6;rt++)if(v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)pt(k.__webglFramebuffer[rt][yt],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,yt);else pt(k.__webglFramebuffer[rt],w,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);p(v)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let rt=0,yt=Q.length;rt<yt;rt++){const bt=Q[rt],nt=n.get(bt);let ut=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ut=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,nt.__webglTexture),Vt(ut,bt),pt(k.__webglFramebuffer,w,bt,i.COLOR_ATTACHMENT0+rt,ut,0),p(bt)&&m(ut)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(rt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,q.__webglTexture),Vt(rt,v),v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)pt(k.__webglFramebuffer[yt],w,v,i.COLOR_ATTACHMENT0,rt,yt);else pt(k.__webglFramebuffer,w,v,i.COLOR_ATTACHMENT0,rt,0);p(v)&&m(rt),e.unbindTexture()}w.depthBuffer&&Xt(w)}function oe(w){const v=w.textures;for(let k=0,q=v.length;k<q;k++){const Q=v[k];if(p(Q)){const X=b(w),wt=n.get(Q).__webglTexture;e.bindTexture(X,wt),m(X),e.unbindTexture()}}}const Nt=[],Ct=[];function gt(w){if(w.samples>0){if(_t(w)===!1){const v=w.textures,k=w.width,q=w.height;let Q=i.COLOR_BUFFER_BIT;const X=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(w),rt=v.length>1;if(rt)for(let bt=0;bt<v.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const yt=w.texture.mipmaps;yt&&yt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let bt=0;bt<v.length;bt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[bt]);const nt=n.get(v[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,k,q,0,0,k,q,Q,i.NEAREST),c===!0&&(Nt.length=0,Ct.length=0,Nt.push(i.COLOR_ATTACHMENT0+bt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Nt.push(X),Ct.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ct)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Nt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let bt=0;bt<v.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,wt.__webglColorRenderbuffer[bt]);const nt=n.get(v[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ce(w){return Math.min(s.maxSamples,w.samples)}function _t(w){const v=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function kt(w){const v=a.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function Ee(w,v){const k=w.colorSpace,q=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==Ps&&k!==oi&&(Jt.getTransfer(k)===ae?(q!==Tn||Q!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}function me(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=$,this.setTextureCube=V,this.rebindTextures=Te,this.setupRenderTarget=R,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=_t}function sx(i,t){function e(n,s=oi){let r;const a=Jt.getTransfer(s);if(n===Zn)return i.UNSIGNED_BYTE;if(n===_l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===tf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===$u)return i.BYTE;if(n===Ju)return i.SHORT;if(n===Sr)return i.UNSIGNED_SHORT;if(n===gl)return i.INT;if(n===ji)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===Ur)return i.HALF_FLOAT;if(n===ef)return i.ALPHA;if(n===nf)return i.RGB;if(n===Tn)return i.RGBA;if(n===wr)return i.DEPTH_COMPONENT;if(n===Tr)return i.DEPTH_STENCIL;if(n===Nr)return i.RED;if(n===xl)return i.RED_INTEGER;if(n===sf)return i.RG;if(n===Ml)return i.RG_INTEGER;if(n===yl)return i.RGBA_INTEGER;if(n===Ta||n===Aa||n===Ra||n===Ca)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ec||n===wc||n===Tc||n===Ac)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ec)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rc||n===Cc||n===Pc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Rc||n===Cc)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Dc||n===Lc||n===Ic||n===Uc||n===Nc||n===Fc||n===kc||n===Oc||n===zc||n===Bc||n===Hc||n===Vc||n===Gc||n===Wc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Dc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ic)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===kc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Hc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wc)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xc||n===qc||n===Yc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xc)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jc||n===Kc||n===Zc||n===$c)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===jc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$c)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Er?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ax=`
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

}`;class ox{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Mf(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ge({vertexShader:rx,fragmentShader:ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Se(new Hs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cx extends Os{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",p=new ox,m={},b=e.getContextAttributes();let E=null,M=null;const A=[],T=[],C=new jt;let I=null;const S=new mn;S.viewport=new we;const y=new mn;y.viewport=new we;const P=[S,y],O=new Cm;let H=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=A[j];return J===void 0&&(J=new No,A[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=A[j];return J===void 0&&(J=new No,A[j]=J),J.getGripSpace()},this.getHand=function(j){let J=A[j];return J===void 0&&(J=new No,A[j]=J),J.getHandSpace()};function G(j){const J=T.indexOf(j.inputSource);if(J===-1)return;const pt=A[J];pt!==void 0&&(pt.update(j.inputSource,j.frame,l||a),pt.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",$);for(let j=0;j<A.length;j++){const J=T[j];J!==null&&(T[j]=null,A[j].disconnect(J))}H=null,Y=null,p.reset();for(const j in m)delete m[j];t.setRenderTarget(E),d=null,f=null,u=null,s=null,M=null,Gt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",K),s.addEventListener("inputsourceschange",$),b.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Pt=null,Mt=null;b.depth&&(Mt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=b.stencil?Tr:wr,Pt=b.stencil?Er:ji);const Xt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Xt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new Ki(f.textureWidth,f.textureHeight,{format:Tn,type:Zn,depthTexture:new xf(f.textureWidth,f.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const pt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Ki(d.framebufferWidth,d.framebufferHeight,{format:Tn,type:Zn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Gt.setContext(s),Gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function $(j){for(let J=0;J<j.removed.length;J++){const pt=j.removed[J],Pt=T.indexOf(pt);Pt>=0&&(T[Pt]=null,A[Pt].disconnect(pt))}for(let J=0;J<j.added.length;J++){const pt=j.added[J];let Pt=T.indexOf(pt);if(Pt===-1){for(let Xt=0;Xt<A.length;Xt++)if(Xt>=T.length){T.push(pt),Pt=Xt;break}else if(T[Xt]===null){T[Xt]=pt,Pt=Xt;break}if(Pt===-1)break}const Mt=A[Pt];Mt&&Mt.connect(pt)}}const V=new L,st=new L;function ct(j,J,pt){V.setFromMatrixPosition(J.matrixWorld),st.setFromMatrixPosition(pt.matrixWorld);const Pt=V.distanceTo(st),Mt=J.projectionMatrix.elements,Xt=pt.projectionMatrix.elements,Te=Mt[14]/(Mt[10]-1),R=Mt[14]/(Mt[10]+1),oe=(Mt[9]+1)/Mt[5],Nt=(Mt[9]-1)/Mt[5],Ct=(Mt[8]-1)/Mt[0],gt=(Xt[8]+1)/Xt[0],ce=Te*Ct,_t=Te*gt,kt=Pt/(-Ct+gt),Ee=kt*-Ct;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ee),j.translateZ(kt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Mt[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const me=Te+kt,w=R+kt,v=ce-Ee,k=_t+(Pt-Ee),q=oe*R/w*me,Q=Nt*R/w*me;j.projectionMatrix.makePerspective(v,k,q,Q,me,w),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ft(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let J=j.near,pt=j.far;p.texture!==null&&(p.depthNear>0&&(J=p.depthNear),p.depthFar>0&&(pt=p.depthFar)),O.near=y.near=S.near=J,O.far=y.far=S.far=pt,(H!==O.near||Y!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,Y=O.far),O.layers.mask=j.layers.mask|6,S.layers.mask=O.layers.mask&3,y.layers.mask=O.layers.mask&5;const Pt=j.parent,Mt=O.cameras;ft(O,Pt);for(let Xt=0;Xt<Mt.length;Xt++)ft(Mt[Xt],Pt);Mt.length===2?ct(O,S,y):O.projectionMatrix.copy(S.projectionMatrix),Vt(j,O,Pt)};function Vt(j,J,pt){pt===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(pt.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ar*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(O)},this.getCameraTexture=function(j){return m[j]};let te=null;function he(j,J){if(h=J.getViewerPose(l||a),g=J,h!==null){const pt=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let Pt=!1;pt.length!==O.cameras.length&&(O.cameras.length=0,Pt=!0);for(let R=0;R<pt.length;R++){const oe=pt[R];let Nt=null;if(d!==null)Nt=d.getViewport(oe);else{const gt=u.getViewSubImage(f,oe);Nt=gt.viewport,R===0&&(t.setRenderTargetTextures(M,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(M))}let Ct=P[R];Ct===void 0&&(Ct=new mn,Ct.layers.enable(R),Ct.viewport=new we,P[R]=Ct),Ct.matrix.fromArray(oe.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(oe.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),R===0&&(O.matrix.copy(Ct.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Pt===!0&&O.cameras.push(Ct)}const Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const R=u.getDepthInformation(pt[0]);R&&R.isValid&&R.texture&&p.init(R,s.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let R=0;R<pt.length;R++){const oe=pt[R].camera;if(oe){let Nt=m[oe];Nt||(Nt=new Mf,m[oe]=Nt);const Ct=u.getCameraImage(oe);Nt.sourceTexture=Ct}}}}for(let pt=0;pt<A.length;pt++){const Pt=T[pt],Mt=A[pt];Pt!==null&&Mt!==void 0&&Mt.update(Pt,J,l||a)}te&&te(j,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Gt=new yf;Gt.setAnimationLoop(he),this.setAnimationLoop=function(j){te=j},this.dispose=function(){}}}const Di=new $n,lx=new pe;function hx(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,ff(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,b,E,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,b,E):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ze&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ze&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const b=t.get(m),E=b.envMap,M=b.envMapRotation;E&&(p.envMap.value=E,Di.copy(M),Di.x*=-1,Di.y*=-1,Di.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),p.envMapRotation.value.setFromMatrix4(lx.makeRotationFromEuler(Di)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,b,E){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*b,p.scale.value=E*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,b){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ze&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const b=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ux(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,E){const M=E.program;n.uniformBlockBinding(b,M)}function l(b,E){let M=s[b.id];M===void 0&&(g(b),M=h(b),s[b.id]=M,b.addEventListener("dispose",p));const A=E.program;n.updateUBOMapping(b,A);const T=t.render.frame;r[b.id]!==T&&(f(b),r[b.id]=T)}function h(b){const E=u();b.__bindingPointIndex=E;const M=i.createBuffer(),A=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,M),M}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const E=s[b.id],M=b.uniforms,A=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,C=M.length;T<C;T++){const I=Array.isArray(M[T])?M[T]:[M[T]];for(let S=0,y=I.length;S<y;S++){const P=I[S];if(d(P,T,S,A)===!0){const O=P.__offset,H=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let G=0;G<H.length;G++){const K=H[G],$=_(K);typeof K=="number"||typeof K=="boolean"?(P.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,O+Y,P.__data)):K.isMatrix3?(P.__data[0]=K.elements[0],P.__data[1]=K.elements[1],P.__data[2]=K.elements[2],P.__data[3]=0,P.__data[4]=K.elements[3],P.__data[5]=K.elements[4],P.__data[6]=K.elements[5],P.__data[7]=0,P.__data[8]=K.elements[6],P.__data[9]=K.elements[7],P.__data[10]=K.elements[8],P.__data[11]=0):(K.toArray(P.__data,Y),Y+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,E,M,A){const T=b.value,C=E+"_"+M;if(A[C]===void 0)return typeof T=="number"||typeof T=="boolean"?A[C]=T:A[C]=T.clone(),!0;{const I=A[C];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return A[C]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function g(b){const E=b.uniforms;let M=0;const A=16;for(let C=0,I=E.length;C<I;C++){const S=Array.isArray(E[C])?E[C]:[E[C]];for(let y=0,P=S.length;y<P;y++){const O=S[y],H=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,G=H.length;Y<G;Y++){const K=H[Y],$=_(K),V=M%A,st=V%$.boundary,ct=V+st;M+=st,ct!==0&&A-ct<$.storage&&(M+=A-ct),O.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=$.storage}}}const T=M%A;return T>0&&(M+=A-T),b.__size=M,b.__cache={},this}function _(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function p(b){const E=b.target;E.removeEventListener("dispose",p);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(const b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}class fx{constructor(t={}){const{canvas:e=Gp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,m=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let A=!1;this._outputColorSpace=He;let T=0,C=0,I=null,S=-1,y=null;const P=new we,O=new we;let H=null;const Y=new Wt(0);let G=0,K=e.width,$=e.height,V=1,st=null,ct=null;const ft=new we(0,0,K,$),Vt=new we(0,0,K,$);let te=!1;const he=new _f;let Gt=!1,j=!1;const J=new pe,pt=new L,Pt=new we,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function Te(){return I===null?V:1}let R=n;function oe(x,U){return e.getContext(x,U)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ml}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",tt,!1),R===null){const U="webgl2";if(R=oe(U,x),R===null)throw oe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Nt,Ct,gt,ce,_t,kt,Ee,me,w,v,k,q,Q,X,wt,rt,yt,bt,nt,ut,Lt,St,lt,zt;function D(){Nt=new b_(R),Nt.init(),St=new sx(R,Nt),Ct=new m_(R,Nt,t,St),gt=new nx(R,Nt),Ct.reversedDepthBuffer&&f&&gt.buffers.depth.setReversed(!0),ce=new w_(R),_t=new Gv,kt=new ix(R,Nt,gt,_t,Ct,St,ce),Ee=new __(M),me=new y_(M),w=new Dm(R),lt=new d_(R,w),v=new S_(R,w,ce,lt),k=new A_(R,v,w,ce),nt=new T_(R,Ct,kt),rt=new g_(_t),q=new Vv(M,Ee,me,Nt,Ct,lt,rt),Q=new hx(M,_t),X=new Xv,wt=new $v(Nt),bt=new f_(M,Ee,me,gt,k,d,c),yt=new tx(M,k,Ct),zt=new ux(R,ce,Ct,gt),ut=new p_(R,Nt,ce),Lt=new E_(R,Nt,ce),ce.programs=q.programs,M.capabilities=Ct,M.extensions=Nt,M.properties=_t,M.renderLists=X,M.shadowMap=yt,M.state=gt,M.info=ce}D();const it=new cx(M,R);this.xr=it,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const x=Nt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Nt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(x){x!==void 0&&(V=x,this.setSize(K,$,!1))},this.getSize=function(x){return x.set(K,$)},this.setSize=function(x,U,z=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=x,$=U,e.width=Math.floor(x*V),e.height=Math.floor(U*V),z===!0&&(e.style.width=x+"px",e.style.height=U+"px"),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(K*V,$*V).floor()},this.setDrawingBufferSize=function(x,U,z){K=x,$=U,V=z,e.width=Math.floor(x*z),e.height=Math.floor(U*z),this.setViewport(0,0,x,U)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(ft)},this.setViewport=function(x,U,z,B){x.isVector4?ft.set(x.x,x.y,x.z,x.w):ft.set(x,U,z,B),gt.viewport(P.copy(ft).multiplyScalar(V).round())},this.getScissor=function(x){return x.copy(Vt)},this.setScissor=function(x,U,z,B){x.isVector4?Vt.set(x.x,x.y,x.z,x.w):Vt.set(x,U,z,B),gt.scissor(O.copy(Vt).multiplyScalar(V).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(x){gt.setScissorTest(te=x)},this.setOpaqueSort=function(x){st=x},this.setTransparentSort=function(x){ct=x},this.getClearColor=function(x){return x.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,z=!0){let B=0;if(x){let F=!1;if(I!==null){const et=I.texture.format;F=et===yl||et===Ml||et===xl}if(F){const et=I.texture.type,ht=et===Zn||et===ji||et===Sr||et===Er||et===_l||et===vl,vt=bt.getClearColor(),dt=bt.getClearAlpha(),Dt=vt.r,Ut=vt.g,Tt=vt.b;ht?(g[0]=Dt,g[1]=Ut,g[2]=Tt,g[3]=dt,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=Dt,_[1]=Ut,_[2]=Tt,_[3]=dt,R.clearBufferiv(R.COLOR,0,_))}else B|=R.COLOR_BUFFER_BIT}U&&(B|=R.DEPTH_BUFFER_BIT),z&&(B|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),bt.dispose(),X.dispose(),wt.dispose(),_t.dispose(),Ee.dispose(),me.dispose(),k.dispose(),lt.dispose(),zt.dispose(),q.dispose(),it.dispose(),it.removeEventListener("sessionstart",An),it.removeEventListener("sessionend",Wl),Si.stop()};function at(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const x=ce.autoReset,U=yt.enabled,z=yt.autoUpdate,B=yt.needsUpdate,F=yt.type;D(),ce.autoReset=x,yt.enabled=U,yt.autoUpdate=z,yt.needsUpdate=B,yt.type=F}function tt(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Z(x){const U=x.target;U.removeEventListener("dispose",Z),xt(U)}function xt(x){Ot(x),_t.remove(x)}function Ot(x){const U=_t.get(x).programs;U!==void 0&&(U.forEach(function(z){q.releaseProgram(z)}),x.isShaderMaterial&&q.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,z,B,F,et){U===null&&(U=Mt);const ht=F.isMesh&&F.matrixWorld.determinant()<0,vt=md(x,U,z,B,F);gt.setMaterial(B,ht);let dt=z.index,Dt=1;if(B.wireframe===!0){if(dt=v.getWireframeAttribute(z),dt===void 0)return;Dt=2}const Ut=z.drawRange,Tt=z.attributes.position;let qt=Ut.start*Dt,re=(Ut.start+Ut.count)*Dt;et!==null&&(qt=Math.max(qt,et.start*Dt),re=Math.min(re,(et.start+et.count)*Dt)),dt!==null?(qt=Math.max(qt,0),re=Math.min(re,dt.count)):Tt!=null&&(qt=Math.max(qt,0),re=Math.min(re,Tt.count));const Me=re-qt;if(Me<0||Me===1/0)return;lt.setup(F,B,vt,z,dt);let fe,le=ut;if(dt!==null&&(fe=w.get(dt),le=Lt,le.setIndex(fe)),F.isMesh)B.wireframe===!0?(gt.setLineWidth(B.wireframeLinewidth*Te()),le.setMode(R.LINES)):le.setMode(R.TRIANGLES);else if(F.isLine){let At=B.linewidth;At===void 0&&(At=1),gt.setLineWidth(At*Te()),F.isLineSegments?le.setMode(R.LINES):F.isLineLoop?le.setMode(R.LINE_LOOP):le.setMode(R.LINE_STRIP)}else F.isPoints?le.setMode(R.POINTS):F.isSprite&&le.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Rr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Nt.get("WEBGL_multi_draw"))le.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const At=F._multiDrawStarts,ge=F._multiDrawCounts,Zt=F._multiDrawCount,sn=dt?w.get(dt).bytesPerElement:1,$i=_t.get(B).currentProgram.getUniforms();for(let rn=0;rn<Zt;rn++)$i.setValue(R,"_gl_DrawID",rn),le.render(At[rn]/sn,ge[rn])}else if(F.isInstancedMesh)le.renderInstances(qt,Me,F.count);else if(z.isInstancedBufferGeometry){const At=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,ge=Math.min(z.instanceCount,At);le.renderInstances(qt,Me,ge)}else le.render(qt,Me)};function ue(x,U,z){x.transparent===!0&&x.side===Sn&&x.forceSinglePass===!1?(x.side=Ze,x.needsUpdate=!0,Br(x,U,z),x.side=_i,x.needsUpdate=!0,Br(x,U,z),x.side=Sn):Br(x,U,z)}this.compile=function(x,U,z=null){z===null&&(z=x),m=wt.get(z),m.init(U),E.push(m),z.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),x!==z&&x.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const B=new Set;return x.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const et=F.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const vt=et[ht];ue(vt,z,F),B.add(vt)}else ue(et,z,F),B.add(et)}),m=E.pop(),B},this.compileAsync=function(x,U,z=null){const B=this.compile(x,U,z);return new Promise(F=>{function et(){if(B.forEach(function(ht){_t.get(ht).currentProgram.isReady()&&B.delete(ht)}),B.size===0){F(x);return}setTimeout(et,10)}Nt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let ee=null;function kn(x){ee&&ee(x)}function An(){Si.stop()}function Wl(){Si.start()}const Si=new yf;Si.setAnimationLoop(kn),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(x){ee=x,it.setAnimationLoop(x),x===null?Si.stop():Si.start()},it.addEventListener("sessionstart",An),it.addEventListener("sessionend",Wl),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(U),U=it.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,U,I),m=wt.get(x,E.length),m.init(U),E.push(m),J.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),he.setFromProjectionMatrix(J,Ln,U.reversedDepth),j=this.localClippingEnabled,Gt=rt.init(this.clippingPlanes,j),p=X.get(x,b.length),p.init(),b.push(p),it.enabled===!0&&it.isPresenting===!0){const et=M.xr.getDepthSensingMesh();et!==null&&uo(et,U,-1/0,M.sortObjects)}uo(x,U,0,M.sortObjects),p.finish(),M.sortObjects===!0&&p.sort(st,ct),Xt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Xt&&bt.addToRenderList(p,x),this.info.render.frame++,Gt===!0&&rt.beginShadows();const z=m.state.shadowsArray;yt.render(z,x,U),Gt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=p.opaque,F=p.transmissive;if(m.setupLights(),U.isArrayCamera){const et=U.cameras;if(F.length>0)for(let ht=0,vt=et.length;ht<vt;ht++){const dt=et[ht];ql(B,F,x,dt)}Xt&&bt.render(x);for(let ht=0,vt=et.length;ht<vt;ht++){const dt=et[ht];Xl(p,x,dt,dt.viewport)}}else F.length>0&&ql(B,F,x,U),Xt&&bt.render(x),Xl(p,x,U);I!==null&&C===0&&(kt.updateMultisampleRenderTarget(I),kt.updateRenderTargetMipmap(I)),x.isScene===!0&&x.onAfterRender(M,x,U),lt.resetDefaultState(),S=-1,y=null,E.pop(),E.length>0?(m=E[E.length-1],Gt===!0&&rt.setGlobalState(M.clippingPlanes,m.state.camera)):m=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function uo(x,U,z,B){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)z=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)m.pushLight(x),x.castShadow&&m.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||he.intersectsSprite(x)){B&&Pt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(J);const ht=k.update(x),vt=x.material;vt.visible&&p.push(x,ht,vt,z,Pt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||he.intersectsObject(x))){const ht=k.update(x),vt=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Pt.copy(x.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Pt.copy(ht.boundingSphere.center)),Pt.applyMatrix4(x.matrixWorld).applyMatrix4(J)),Array.isArray(vt)){const dt=ht.groups;for(let Dt=0,Ut=dt.length;Dt<Ut;Dt++){const Tt=dt[Dt],qt=vt[Tt.materialIndex];qt&&qt.visible&&p.push(x,ht,qt,z,Pt.z,Tt)}}else vt.visible&&p.push(x,ht,vt,z,Pt.z,null)}}const et=x.children;for(let ht=0,vt=et.length;ht<vt;ht++)uo(et[ht],U,z,B)}function Xl(x,U,z,B){const F=x.opaque,et=x.transmissive,ht=x.transparent;m.setupLightsView(z),Gt===!0&&rt.setGlobalState(M.clippingPlanes,z),B&&gt.viewport(P.copy(B)),F.length>0&&zr(F,U,z),et.length>0&&zr(et,U,z),ht.length>0&&zr(ht,U,z),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function ql(x,U,z,B){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[B.id]===void 0&&(m.state.transmissionRenderTarget[B.id]=new Ki(1,1,{generateMipmaps:!0,type:Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float")?Ur:Zn,minFilter:hi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const et=m.state.transmissionRenderTarget[B.id],ht=B.viewport||P;et.setSize(ht.z*M.transmissionResolutionScale,ht.w*M.transmissionResolutionScale);const vt=M.getRenderTarget(),dt=M.getActiveCubeFace(),Dt=M.getActiveMipmapLevel();M.setRenderTarget(et),M.getClearColor(Y),G=M.getClearAlpha(),G<1&&M.setClearColor(16777215,.5),M.clear(),Xt&&bt.render(z);const Ut=M.toneMapping;M.toneMapping=Xn;const Tt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),m.setupLightsView(B),Gt===!0&&rt.setGlobalState(M.clippingPlanes,B),zr(x,z,B),kt.updateMultisampleRenderTarget(et),kt.updateRenderTargetMipmap(et),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let re=0,Me=U.length;re<Me;re++){const fe=U[re],le=fe.object,At=fe.geometry,ge=fe.material,Zt=fe.group;if(ge.side===Sn&&le.layers.test(B.layers)){const sn=ge.side;ge.side=Ze,ge.needsUpdate=!0,Yl(le,z,B,At,ge,Zt),ge.side=sn,ge.needsUpdate=!0,qt=!0}}qt===!0&&(kt.updateMultisampleRenderTarget(et),kt.updateRenderTargetMipmap(et))}M.setRenderTarget(vt,dt,Dt),M.setClearColor(Y,G),Tt!==void 0&&(B.viewport=Tt),M.toneMapping=Ut}function zr(x,U,z){const B=U.isScene===!0?U.overrideMaterial:null;for(let F=0,et=x.length;F<et;F++){const ht=x[F],vt=ht.object,dt=ht.geometry,Dt=ht.group;let Ut=ht.material;Ut.allowOverride===!0&&B!==null&&(Ut=B),vt.layers.test(z.layers)&&Yl(vt,U,z,dt,Ut,Dt)}}function Yl(x,U,z,B,F,et){x.onBeforeRender(M,U,z,B,F,et),x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),F.onBeforeRender(M,U,z,B,x,et),F.transparent===!0&&F.side===Sn&&F.forceSinglePass===!1?(F.side=Ze,F.needsUpdate=!0,M.renderBufferDirect(z,U,B,F,x,et),F.side=_i,F.needsUpdate=!0,M.renderBufferDirect(z,U,B,F,x,et),F.side=Sn):M.renderBufferDirect(z,U,B,F,x,et),x.onAfterRender(M,U,z,B,F,et)}function Br(x,U,z){U.isScene!==!0&&(U=Mt);const B=_t.get(x),F=m.state.lights,et=m.state.shadowsArray,ht=F.state.version,vt=q.getParameters(x,F.state,et,U,z),dt=q.getProgramCacheKey(vt);let Dt=B.programs;B.environment=x.isMeshStandardMaterial?U.environment:null,B.fog=U.fog,B.envMap=(x.isMeshStandardMaterial?me:Ee).get(x.envMap||B.environment),B.envMapRotation=B.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Dt===void 0&&(x.addEventListener("dispose",Z),Dt=new Map,B.programs=Dt);let Ut=Dt.get(dt);if(Ut!==void 0){if(B.currentProgram===Ut&&B.lightsStateVersion===ht)return Kl(x,vt),Ut}else vt.uniforms=q.getUniforms(x),x.onBeforeCompile(vt,M),Ut=q.acquireProgram(vt,dt),Dt.set(dt,Ut),B.uniforms=vt.uniforms;const Tt=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Tt.clippingPlanes=rt.uniform),Kl(x,vt),B.needsLights=_d(x),B.lightsStateVersion=ht,B.needsLights&&(Tt.ambientLightColor.value=F.state.ambient,Tt.lightProbe.value=F.state.probe,Tt.directionalLights.value=F.state.directional,Tt.directionalLightShadows.value=F.state.directionalShadow,Tt.spotLights.value=F.state.spot,Tt.spotLightShadows.value=F.state.spotShadow,Tt.rectAreaLights.value=F.state.rectArea,Tt.ltc_1.value=F.state.rectAreaLTC1,Tt.ltc_2.value=F.state.rectAreaLTC2,Tt.pointLights.value=F.state.point,Tt.pointLightShadows.value=F.state.pointShadow,Tt.hemisphereLights.value=F.state.hemi,Tt.directionalShadowMap.value=F.state.directionalShadowMap,Tt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Tt.spotShadowMap.value=F.state.spotShadowMap,Tt.spotLightMatrix.value=F.state.spotLightMatrix,Tt.spotLightMap.value=F.state.spotLightMap,Tt.pointShadowMap.value=F.state.pointShadowMap,Tt.pointShadowMatrix.value=F.state.pointShadowMatrix),B.currentProgram=Ut,B.uniformsList=null,Ut}function jl(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=Pa.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function Kl(x,U){const z=_t.get(x);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function md(x,U,z,B,F){U.isScene!==!0&&(U=Mt),kt.resetTextureUnits();const et=U.fog,ht=B.isMeshStandardMaterial?U.environment:null,vt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ps,dt=(B.isMeshStandardMaterial?me:Ee).get(B.envMap||ht),Dt=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ut=!!z.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Tt=!!z.morphAttributes.position,qt=!!z.morphAttributes.normal,re=!!z.morphAttributes.color;let Me=Xn;B.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Me=M.toneMapping);const fe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,le=fe!==void 0?fe.length:0,At=_t.get(B),ge=m.state.lights;if(Gt===!0&&(j===!0||x!==y)){const Xe=x===y&&B.id===S;rt.setState(B,x,Xe)}let Zt=!1;B.version===At.__version?(At.needsLights&&At.lightsStateVersion!==ge.state.version||At.outputColorSpace!==vt||F.isBatchedMesh&&At.batching===!1||!F.isBatchedMesh&&At.batching===!0||F.isBatchedMesh&&At.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&At.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&At.instancing===!1||!F.isInstancedMesh&&At.instancing===!0||F.isSkinnedMesh&&At.skinning===!1||!F.isSkinnedMesh&&At.skinning===!0||F.isInstancedMesh&&At.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&At.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&At.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&At.instancingMorph===!1&&F.morphTexture!==null||At.envMap!==dt||B.fog===!0&&At.fog!==et||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==rt.numPlanes||At.numIntersection!==rt.numIntersection)||At.vertexAlphas!==Dt||At.vertexTangents!==Ut||At.morphTargets!==Tt||At.morphNormals!==qt||At.morphColors!==re||At.toneMapping!==Me||At.morphTargetsCount!==le)&&(Zt=!0):(Zt=!0,At.__version=B.version);let sn=At.currentProgram;Zt===!0&&(sn=Br(B,U,F));let $i=!1,rn=!1,Ws=!1;const _e=sn.getUniforms(),fn=At.uniforms;if(gt.useProgram(sn.program)&&($i=!0,rn=!0,Ws=!0),B.id!==S&&(S=B.id,rn=!0),$i||y!==x){gt.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),_e.setValue(R,"projectionMatrix",x.projectionMatrix),_e.setValue(R,"viewMatrix",x.matrixWorldInverse);const Qe=_e.map.cameraPosition;Qe!==void 0&&Qe.setValue(R,pt.setFromMatrixPosition(x.matrixWorld)),Ct.logarithmicDepthBuffer&&_e.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&_e.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),y!==x&&(y=x,rn=!0,Ws=!0)}if(F.isSkinnedMesh){_e.setOptional(R,F,"bindMatrix"),_e.setOptional(R,F,"bindMatrixInverse");const Xe=F.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),_e.setValue(R,"boneTexture",Xe.boneTexture,kt))}F.isBatchedMesh&&(_e.setOptional(R,F,"batchingTexture"),_e.setValue(R,"batchingTexture",F._matricesTexture,kt),_e.setOptional(R,F,"batchingIdTexture"),_e.setValue(R,"batchingIdTexture",F._indirectTexture,kt),_e.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&_e.setValue(R,"batchingColorTexture",F._colorsTexture,kt));const dn=z.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&nt.update(F,z,sn),(rn||At.receiveShadow!==F.receiveShadow)&&(At.receiveShadow=F.receiveShadow,_e.setValue(R,"receiveShadow",F.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(fn.envMap.value=dt,fn.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&U.environment!==null&&(fn.envMapIntensity.value=U.environmentIntensity),rn&&(_e.setValue(R,"toneMappingExposure",M.toneMappingExposure),At.needsLights&&gd(fn,Ws),et&&B.fog===!0&&Q.refreshFogUniforms(fn,et),Q.refreshMaterialUniforms(fn,B,V,$,m.state.transmissionRenderTarget[x.id]),Pa.upload(R,jl(At),fn,kt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Pa.upload(R,jl(At),fn,kt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&_e.setValue(R,"center",F.center),_e.setValue(R,"modelViewMatrix",F.modelViewMatrix),_e.setValue(R,"normalMatrix",F.normalMatrix),_e.setValue(R,"modelMatrix",F.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Xe=B.uniformsGroups;for(let Qe=0,fo=Xe.length;Qe<fo;Qe++){const Ei=Xe[Qe];zt.update(Ei,sn),zt.bind(Ei,sn)}}return sn}function gd(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function _d(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,U,z){const B=_t.get(x);B.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_t.get(x.texture).__webglTexture=U,_t.get(x.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:z,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){const z=_t.get(x);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};const vd=R.createFramebuffer();this.setRenderTarget=function(x,U=0,z=0){I=x,T=U,C=z;let B=!0,F=null,et=!1,ht=!1;if(x){const dt=_t.get(x);if(dt.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(R.FRAMEBUFFER,null),B=!1;else if(dt.__webglFramebuffer===void 0)kt.setupRenderTarget(x);else if(dt.__hasExternalTextures)kt.rebindTextures(x,_t.get(x.texture).__webglTexture,_t.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Tt=x.depthTexture;if(dt.__boundDepthTexture!==Tt){if(Tt!==null&&_t.has(Tt)&&(x.width!==Tt.image.width||x.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(x)}}const Dt=x.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(ht=!0);const Ut=_t.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ut[U])?F=Ut[U][z]:F=Ut[U],et=!0):x.samples>0&&kt.useMultisampledRTT(x)===!1?F=_t.get(x).__webglMultisampledFramebuffer:Array.isArray(Ut)?F=Ut[z]:F=Ut,P.copy(x.viewport),O.copy(x.scissor),H=x.scissorTest}else P.copy(ft).multiplyScalar(V).floor(),O.copy(Vt).multiplyScalar(V).floor(),H=te;if(z!==0&&(F=vd),gt.bindFramebuffer(R.FRAMEBUFFER,F)&&B&&gt.drawBuffers(x,F),gt.viewport(P),gt.scissor(O),gt.setScissorTest(H),et){const dt=_t.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,dt.__webglTexture,z)}else if(ht){const dt=U;for(let Dt=0;Dt<x.textures.length;Dt++){const Ut=_t.get(x.textures[Dt]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Dt,Ut.__webglTexture,z,dt)}}else if(x!==null&&z!==0){const dt=_t.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,dt.__webglTexture,z)}S=-1},this.readRenderTargetPixels=function(x,U,z,B,F,et,ht,vt=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt){gt.bindFramebuffer(R.FRAMEBUFFER,dt);try{const Dt=x.textures[vt],Ut=Dt.format,Tt=Dt.type;if(!Ct.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-B&&z>=0&&z<=x.height-F&&(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+vt),R.readPixels(U,z,B,F,St.convert(Ut),St.convert(Tt),et))}finally{const Dt=I!==null?_t.get(I).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(x,U,z,B,F,et,ht,vt=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=_t.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt)if(U>=0&&U<=x.width-B&&z>=0&&z<=x.height-F){gt.bindFramebuffer(R.FRAMEBUFFER,dt);const Dt=x.textures[vt],Ut=Dt.format,Tt=Dt.type;if(!Ct.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.bufferData(R.PIXEL_PACK_BUFFER,et.byteLength,R.STREAM_READ),x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+vt),R.readPixels(U,z,B,F,St.convert(Ut),St.convert(Tt),0);const re=I!==null?_t.get(I).__webglFramebuffer:null;gt.bindFramebuffer(R.FRAMEBUFFER,re);const Me=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Wp(R,Me,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,et),R.deleteBuffer(qt),R.deleteSync(Me),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,z=0){const B=Math.pow(2,-z),F=Math.floor(x.image.width*B),et=Math.floor(x.image.height*B),ht=U!==null?U.x:0,vt=U!==null?U.y:0;kt.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,ht,vt,F,et),gt.unbindTexture()};const xd=R.createFramebuffer(),Md=R.createFramebuffer();this.copyTextureToTexture=function(x,U,z=null,B=null,F=0,et=null){et===null&&(F!==0?(Rr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=F,F=0):et=0);let ht,vt,dt,Dt,Ut,Tt,qt,re,Me;const fe=x.isCompressedTexture?x.mipmaps[et]:x.image;if(z!==null)ht=z.max.x-z.min.x,vt=z.max.y-z.min.y,dt=z.isBox3?z.max.z-z.min.z:1,Dt=z.min.x,Ut=z.min.y,Tt=z.isBox3?z.min.z:0;else{const dn=Math.pow(2,-F);ht=Math.floor(fe.width*dn),vt=Math.floor(fe.height*dn),x.isDataArrayTexture?dt=fe.depth:x.isData3DTexture?dt=Math.floor(fe.depth*dn):dt=1,Dt=0,Ut=0,Tt=0}B!==null?(qt=B.x,re=B.y,Me=B.z):(qt=0,re=0,Me=0);const le=St.convert(U.format),At=St.convert(U.type);let ge;U.isData3DTexture?(kt.setTexture3D(U,0),ge=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(kt.setTexture2DArray(U,0),ge=R.TEXTURE_2D_ARRAY):(kt.setTexture2D(U,0),ge=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const Zt=R.getParameter(R.UNPACK_ROW_LENGTH),sn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),$i=R.getParameter(R.UNPACK_SKIP_PIXELS),rn=R.getParameter(R.UNPACK_SKIP_ROWS),Ws=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,fe.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,fe.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Dt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ut),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Tt);const _e=x.isDataArrayTexture||x.isData3DTexture,fn=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){const dn=_t.get(x),Xe=_t.get(U),Qe=_t.get(dn.__renderTarget),fo=_t.get(Xe.__renderTarget);gt.bindFramebuffer(R.READ_FRAMEBUFFER,Qe.__webglFramebuffer),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,fo.__webglFramebuffer);for(let Ei=0;Ei<dt;Ei++)_e&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.get(x).__webglTexture,F,Tt+Ei),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_t.get(U).__webglTexture,et,Me+Ei)),R.blitFramebuffer(Dt,Ut,ht,vt,qt,re,ht,vt,R.DEPTH_BUFFER_BIT,R.NEAREST);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||x.isRenderTargetTexture||_t.has(x)){const dn=_t.get(x),Xe=_t.get(U);gt.bindFramebuffer(R.READ_FRAMEBUFFER,xd),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Md);for(let Qe=0;Qe<dt;Qe++)_e?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,dn.__webglTexture,F,Tt+Qe):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,dn.__webglTexture,F),fn?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Xe.__webglTexture,et,Me+Qe):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Xe.__webglTexture,et),F!==0?R.blitFramebuffer(Dt,Ut,ht,vt,qt,re,ht,vt,R.COLOR_BUFFER_BIT,R.NEAREST):fn?R.copyTexSubImage3D(ge,et,qt,re,Me+Qe,Dt,Ut,ht,vt):R.copyTexSubImage2D(ge,et,qt,re,Dt,Ut,ht,vt);gt.bindFramebuffer(R.READ_FRAMEBUFFER,null),gt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else fn?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(ge,et,qt,re,Me,ht,vt,dt,le,At,fe.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(ge,et,qt,re,Me,ht,vt,dt,le,fe.data):R.texSubImage3D(ge,et,qt,re,Me,ht,vt,dt,le,At,fe):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,et,qt,re,ht,vt,le,At,fe.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,et,qt,re,fe.width,fe.height,le,fe.data):R.texSubImage2D(R.TEXTURE_2D,et,qt,re,ht,vt,le,At,fe);R.pixelStorei(R.UNPACK_ROW_LENGTH,Zt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,sn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,$i),R.pixelStorei(R.UNPACK_SKIP_ROWS,rn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ws),et===0&&U.generateMipmaps&&R.generateMipmap(ge),gt.unbindTexture()},this.initRenderTarget=function(x){_t.get(x).__webglFramebuffer===void 0&&kt.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?kt.setTextureCube(x,0):x.isData3DTexture?kt.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?kt.setTexture2DArray(x,0):kt.setTexture2D(x,0),gt.unbindTexture()},this.resetState=function(){T=0,C=0,I=null,gt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}const Gi=64,je=32,ja=16,Cr=8,Bi=Gi*Cr,tl=18,Tf=19,Af=47;function Rf(i,t,e=0,n=0,s="y",r=0){return i===1?t>0?[0,20,21][r]:t<0?[2,24,25][r]:[1,22,23][r]:i===2?[2,24,25][r]:i===3?[3,26,27][r]:i===5?(s==="x"?e:s==="z"?n:t)!==0?6:5:i===21?t>0?28:t<0?8:n===1?30:29:i===22?t>0?31:t<0?8:n===1?33:32:i===23?34:i===25?t===0?35:36:i===26?t===0?38:37:i>=27&&i<=29?(t>0?39:42)+i-27:i>=30&&i<=33?t>0?45:46:[0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][i]??3}function Al(i,t,e){return[(i%Cr*Gi+ja+.12+t*(je-.24))/Bi,(Math.floor(i/Cr)*Gi+ja+.12+e*(je-.24))/Bi]}const Rn=(i,t)=>(i%t+t)%t;function dx(i,t,e){const n=i;i>=20&&i<=27&&(i=[0,0,1,1,2,2,3,3][i-20],t=Rn(t+(n&1?9:17),je),i!==1&&(e=Rn(e+(n&1?13:7),je)));const s=Kt(t,e,i*877),r=Kt(Math.floor((t+3)/3),Math.floor(e/2),i*571);let a=0,o=255,c=(s-.5)*10+(r-.5)*8;const l=()=>{const f=Rn(t+Math.floor(e/3)*3,9);a=r>.77?9877350:r<.19?7509594:8628059,(f<2&&e%4===1&&r>.45||s>.981)&&(a=11127158),f===3&&e%4===0&&(c-=9)},h=()=>{a=r>.82?11305046:r<.19?8938310:10056014,s>.966&&(a=13015659),t%9===Math.floor(e/3)%7&&(e+1)%5<3&&(c+=13)},u=()=>{const f=Rn(2*t+e+Math.floor(e/4)*2,41);a=r>.72?10659488:r<.22?9608346:10199967,f<2&&r>.35&&(c-=19),f===2&&r>.47&&(c+=7),s>.95&&(c+=12)};switch(i){case 0:l();break;case 1:{const f=4+Math.floor(Kt(Math.floor(t/2),0,31)*4);e>=je-f?(l(),e===je-f&&(c-=17)):(h(),e===je-f-1&&(c-=14));break}case 2:h();break;case 3:u();break;case 4:{a=14993811,Rn(t+Math.floor(e*.6)+Math.floor(e/5)*2,17)<2&&e%4<2&&(c+=11),s>.93&&(a=12888951);break}case 5:{const f=Rn(t+Math.round(Math.sin(e*.25+t*.26)*1.5),7);a=f===0?6310195:f<3?7888964:f===3?10848859:9530953,Math.abs(t-17)+Math.abs(e-8)*.65<2&&(a=5981238);break}case 6:{const f=Math.abs(t-15),d=Math.abs(e-16),g=Math.max(f*.98,d)+.2*Math.min(f,d);a=Math.min(t,e,31-t,31-e)<2?7886910:Math.floor(g)%4===0?11962711:14727035,t>19&&e===16-Math.floor((t-18)/3)&&(a=9792837);break}case 7:{const f=Kt(Math.floor(t/3),Math.floor((e+Math.floor(t/5))/2),931);a=f<.16?3373399:f<.42?5411918:f<.73?7120712:9158230,f>.82&&e%3===1&&(a=10602602),f<.16&&s<.3&&(o=0);break}case 8:{const f=Math.floor(e/8),d=Rn(t+(f%2?16:0),32);a=e%8===0||d===0?9726792:e%8===7?14859649:13476203,e%8===3&&(Math.floor(t/4)+f)%3!==0&&(c-=9),d===2&&e%8===2&&(a=8021330);break}case 9:{const f=Math.floor(e/7),d=Rn(t+f*5+(e%7<2?1:0),12);a=e%7===0||d===0?6846062:e%7===1||d===1?11843234:9739921;break}case 10:{const f=Rn(t+Math.floor(e/8)%2*8,16);a=e%8===0||f===0?6649716:e%8===7||f===1?11647146:9149848;break}case 11:{const f=t===0||e===0||t===je-1||e===je-1,d=(t+e===22||t+e===25)&&t>4&&t<16;a=f?9161673:d?14811125:11328980,o=f?182:d?175:49,c=0;break}case 12:{u();for(const[f,d,g]of[[5,6,3],[16,13,4],[10,20,2],[21,3,2]])Math.abs(t-f)+Math.abs(e-d)*.85<g&&(a=e>d?5857630:4080708);break}case 13:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);a=f<2?5400165:f<4?12294239:Math.abs(d-13)<1.3?11503958:d<8?16771489:16041065;break}case 14:a=4365994,c=(r-.5)*3,(e===6||e===17)&&Rn(t+2*e,19)<5&&(c+=9),o=163;break;case 15:a=r>.62?6649201:4741462;break;case 16:a=16777215,c=0;break;case tl:case Tf:{o=0,a=6393927;for(const[f,d,g]of[[3,12,-2],[8,19,3],[15,10,2],[21,15,-3],[26,7,1]]){const _=f+Math.round(g*e/d);if(e<=d&&t===_&&(o=255,a=e<=2?5472834:7971660),i===tl&&(f===8||f===21)){const p=Math.abs(t-(f+g))+Math.abs(e-(d+1));p<=2&&(o=255,a=p===0?15049005:f===8?16113574:15971143)}}break}case 28:case 29:case 30:{const f=Math.min(t,31-t);a=f<3||e<3||e>28?7755322:e%8===0?10186823:12819559,i===28?(t>4&&t<27&&e>4&&e<26&&(a=5599084),t>6&&t<25&&e>6&&e<24&&(t%5===2||e%5===2)&&(a=9018246),e>20&&e<23&&t>9&&t<25&&(a=14991218)):i===30?(e>12&&e<23&&t>4&&t<27&&(a=e===13||t===5?6244407:11240021),e===18&&t>12&&t<20&&(a=15780477),e<10&&f>5&&(a=5458749)):e<10&&f>4&&(a=6838334);break}case 31:case 32:case 33:{const f=t<4||t>27||e<3||e>28;a=f?5269096:e%8===2?9003332:12224336,t%24===3&&f&&e%8===4&&(a=12368525),i!==31&&e===20&&(a=5259060),i===33&&t>=13&&t<=18&&e>=13&&e<=22&&(a=t===13||e===22?16044424:11897414),i===33&&Math.abs(t-15.5)<1.5&&e>=15&&e<=17&&(a=6050110);break}case 34:{u();for(const[f,d,g]of[[8,12,6],[21,23,6],[24,6,3],[4,27,3]]){const _=Math.abs(t-f)*1.55+Math.abs(e-d);_<g+1.6&&(a=5663603),_<g&&(a=t<f?10216919:t===f?14614512:5283759)}break}case 35:case 36:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);a=f<2?3823198:f<4?12752741:f===4?4094079:7784898,f>5&&(a=d<7?15007729:d<12?11727321:Math.abs(t-15.5)<2||Math.abs(e-15.5)<2?5807259:8836557);break}case 37:case 38:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);a=f<1?5006441:f<3?8886418:7439751,i===37&&Math.abs(d-13)<2.1&&(a=13675380),i===37&&d<6&&(a=t<15?10999229:7584945),i===38&&(e===8||e===23)&&(a=12755305);break}case 39:case 40:case 41:{const f=i-39,d=Math.min(t,e,31-t,31-e);a=d<2?4150105:d<4?12965824:[5752740,7321057,13600220][f],d>5&&(t%4===0||e%4===0)&&(c-=9);for(let g=0;g<=f;g++){const _=e-(7+g*7),p=7-Math.abs(t-15.5);Math.abs(t-15.5)<7&&_>=p-2&&_<=p&&(a=16774596)}break}case 42:case 43:case 44:{const f=i-42,d=Math.min(t,31-t),g=[4166267,4620212,10117546][f];a=e<5||e>27?4413020:d<3?7308683:e===12||e===20?4215392:g,(d===5||d===6)&&(e===9||e===24)&&(a=13227463);break}case 45:{const f=Math.min(t,31-t),d=9-Math.abs(t-15.5);a=f<2?11631686:f<5?16770458:15643222,f>=5&&e%8===0&&(c-=15),Math.abs(t-15.5)<6&&Math.abs(e%16-d)<1.2&&(a=16772029);break}case 46:{const f=Math.min(t,31-t);a=e<=2||e>28?7622457:f<3?11565132:14064214,e%7===0&&(c-=19);break}default:a=9936274}return[(a>>>16&255)+c,(a>>>8&255)+c,(a&255)+c,o]}function px(){const i=new Uint8ClampedArray(Bi*Bi*4),t=new Uint8ClampedArray(je*je*4);for(let n=0;n<Af;n++){for(let s=0;s<je;s++)for(let r=0;r<je;r++)t.set(dx(n,r,s),(r+je*s)*4);for(let s=0;s<Gi;s++)for(let r=0;r<Gi;r++){const a=n%Cr*Gi+r,o=Math.floor(n/Cr)*Gi+s,c=(Math.min(31,Math.max(0,r-ja))+je*Math.min(31,Math.max(0,s-ja)))*4;for(let l=0;l<4;l++)i[(a+Bi*o)*4+l]=t[c+l]}}const e=new kr(new Uint8Array(i.buffer),Bi,Bi);return e.colorSpace=He,e.magFilter=Pe,e.minFilter=cr,e.generateMipmaps=!0,e.needsUpdate=!0,e}const mx=Object.freeze([Object.freeze({x:0,z:-1}),Object.freeze({x:1,z:0}),Object.freeze({x:0,z:1}),Object.freeze({x:-1,z:0})]),gx=Object.freeze({x:0,z:0});function vn(i){return i>=30&&i<=33&&Number.isInteger(i)}function Cf(i){return mx[i-30]??gx}function Wn(i,t,e){const n=i===30?1-e:i===31?t:i===32?e:1-t;return 1-.96*Math.max(0,Math.min(1,n))}function _x(i){return i===27?3:i===28?6:i===29?10:0}const vx=[{n:[1,0,0],u:[0,0,-1],v:[0,1,0],o:[1,0,1]},{n:[-1,0,0],u:[0,0,1],v:[0,1,0],o:[0,0,0]},{n:[0,1,0],u:[1,0,0],v:[0,0,-1],o:[0,1,1]},{n:[0,-1,0],u:[1,0,0],v:[0,0,1],o:[0,0,0]},{n:[0,0,1],u:[1,0,0],v:[0,1,0],o:[0,0,1]},{n:[0,0,-1],u:[-1,0,0],v:[0,1,0],o:[1,0,0]}],Rl=[[0,0],[1,0],[1,1],[0,1]],Pf=Array.from({length:Af},(i,t)=>Rl.map(([e,n])=>Al(t,e,n)));function xx(i,t){return!(!i||dr(t)||i===t&&!vn(i)||i===13&&t===10)}class qo{position=[];normal=[];uv=[];detail=[];indices=[];quad(t=!1,e=!1){const n=this.position.length/3-4;e?this.indices.push(n,n+1,n+3,n+1,n+2,n+3):this.indices.push(n,n+1,n+2,n,n+2,n+3),t&&this.indices.push(n+2,n+1,n,n+3,n+2,n)}finish(){if(!this.indices.length)return null;const t=new We;return t.setAttribute("position",new xe(this.position,3)),t.setAttribute("normal",new xe(this.normal,3)),t.setAttribute("uv",new xe(this.uv,2)),t.setAttribute("surface",new xe(this.detail,3)),t.setIndex(this.indices),t.computeBoundingSphere(),t}}function Mx(i,t,e,n,s,r){const a=r?tl:Tf;for(let o=0;o<2;o++){const l=o===0?.24:-.24;for(let h=0;h<4;h++){const[u,f]=Rl[h],d=u*2-1;i.position.push(t+.5+.27*d,e+f*.74,n+.5+l*d),i.normal.push(0,1,0),i.uv.push(...Pf[a][h]),i.detail.push(1,s,40+f)}i.quad(!0)}}function yx(i,t,e,n,s=1){const r=br(t,e,n),a=new qo,o=new qo,c=new qo;if(!i.occupied[r])return[null,null,null];if(i.dense[r]===4096&&t>0&&t<15&&n>0&&n<15&&[r-1,r+1,r-16,r+16,r+256,...e>0?[r-256]:[]].every(g=>i.dense[g]===4096))return[null,null,null];const l=(g,_,p)=>ki(g,_,p)?i.data[Ne(g,_,p)]:0,h=(g,_,p)=>dr(l(g,_,p))?1:0,u=t*16,f=e*16,d=n*16;for(let g=f;g<f+16;g++)for(let _=d;_<d+16;_++){let p=Ne(u,g,_);for(let m=u;m<u+16;m++,p++){const b=i.data[p];if(!b)continue;const E=b===13?o:b===10?c:a,M=vn(b);let A=-1;for(const T of vx){const[C,I,S]=T.n,y=m+C,P=g+I,O=_+S;if(P<0||!xx(b,l(y,P,O)))continue;A===-1&&(A=Kt(m+g*13,_,i.salt^17));const H=b===5?i.axisAt(m,g,_):"y",Y=Rf(b,I,C,S,H,Math.floor(A*3)),G=Pf[Y],K=M&&I===1?b-30:Y===5&&(H==="x"&&T.u[0]!==0||H==="z"&&T.u[2]!==0)?1:0,$=M&&I===1,V=$?Wn(b,0,0)-Wn(b,1,0):C,st=$?Wn(b,0,0)-Wn(b,0,1):S,ct=$?Math.hypot(V,1,st):1,ft=.94+.11*A,Vt=b===13&&l(m,g+1,_)!==13;for(let Gt=0;Gt<4;Gt++){const[j,J]=Rl[Gt],pt=T.o[0]+T.u[0]*j+T.v[0]*J,Pt=T.o[1]+T.u[1]*j+T.v[1]*J,Mt=T.o[2]+T.u[2]*j+T.v[2]*J,Xt=M&&Pt===1?Wn(b,pt,Mt):Pt-(Vt&&Pt===1?.105:0);E.position.push(m+pt,g+Xt,_+Mt),E.normal.push(V/ct,I/ct,st/ct),E.uv.push(...G[(Gt+K)%4]);const Te=j?1:-1,R=J?1:-1,oe=T.u[0]*Te,Nt=T.u[1]*Te,Ct=T.u[2]*Te,gt=T.v[0]*R,ce=T.v[1]*R,_t=T.v[2]*R;let kt=1;if(E===a){const Ee=h(y+oe,P+Nt,O+Ct),me=h(y+gt,P+ce,O+_t),w=Ee&&me?1:h(y+oe+gt,P+Nt+ce,O+Ct+_t);kt=1-(Ee+me+w)*.103}E.detail.push(kt,ft,b)}const te=E.detail.length,he=E===a&&E.detail[te-12]+E.detail[te-6]>E.detail[te-9]+E.detail[te-3];if(E.quad(b===13&&(I===1||m===0||_===0||m===Rt-1||_===Rt-1),he),s&&i.stage!=="flat"&&b===1&&I===1&&i.highest[m+Rt*_]===g){const Gt=Kt(m>>3,_>>3,i.salt^75);Kt(m,_,i.salt^2534)<(.023+Gt*Gt*.21)*s&&Mx(a,m,g+1,_,ft,Gt>.72)}}}}return[a.finish(),o.finish(),c.finish()]}const Yo=(i,t,e)=>new L(i,t,e);class bx{sun={value:Yo(0,1,0)};horizon={value:Yo(.78,.87,.83)};zenith={value:Yo(.23,.64,.8)};day={value:1};warm={value:0};linearColor=new Wt;sky;clouds;constructor(t,e){const n={sun:this.sun,horizon:this.horizon,zenith:this.zenith,lightness:this.day,sunset:this.warm},s=new Ge({uniforms:n,side:Ze,depthWrite:!1,depthTest:!0,vertexShader:`varying vec3 direction;varying vec3 skyColor;
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
        }`});this.sky=new Se(new wl(270,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=2,t.add(this.sky);const r=new Ge({uniforms:n,vertexShader:`varying float shade;varying float dist;
        void main(){vec4 pos=modelMatrix*instanceMatrix*vec4(position,1.);shade=.90+.1*normal.y;dist=length(pos.xyz-cameraPosition);
        gl_Position=projectionMatrix*viewMatrix*pos;}`,fragmentShader:`varying float shade;varying float dist;uniform float lightness,sunset;uniform vec3 horizon;
        void main(){vec3 col=mix(vec3(.085,.135,.22),vec3(.98,.968,.88),lightness)*shade;
          col=mix(col,vec3(1.,.65,.40)*shade,sunset*.64);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);
          #include <colorspace_fragment>
        }`}),a=66,o=4;this.clouds=new Xa(new _n,r,a*o);const c=new Ce;for(let l=0;l<a;l++){const h=Kt(l,11,e)*480-112,u=Kt(l,12,e)*480-112,f=66+Kt(l,13,e)*17;for(let d=0;d<o;d++)c.position.set(h+d*4.6,f+Math.sin(Math.PI*d/3)*1.5,u+Kt(l,d,e)*4),c.scale.set(6+Kt(l+7,d,e)*7,1.6+Kt(l+12,d,e)*2.6,5+Kt(l+77,d,e)*7),c.updateMatrix(),this.clouds.setMatrixAt(l*o+d,c.matrix)}this.clouds.computeBoundingSphere(),t.add(this.clouds)}update(t,e,n){const s=(t-.25)*Math.PI*2;this.sun.value.set(Math.cos(s)*.8,Math.sin(s),Math.cos(s)*.6).normalize();const r=this.sun.value.y,a=lr.smoothstep(r,-.27,.32),o=Math.exp(-Math.pow((r-.065)/.25,2));this.day.value=a,this.warm.value=o;const c=(l,h,u,f)=>{this.linearColor.setRGB(Math.min(1,h),Math.min(1,u),Math.min(1,f),He),l.set(this.linearColor.r,this.linearColor.g,this.linearColor.b)};c(this.zenith.value,.095+a*.23+o*.14,.14+a*.52-o*.15,.24+a*.6-o*.13),c(this.horizon.value,.25+a*.57+o*.29,.32+a*.57-o*.13,.44+a*.45-o*.25),this.sky.position.copy(e.position),this.clouds.position.x=Math.sin(n/190)*10}dispose(t){t.remove(this.sky,this.clouds),this.sky.geometry.dispose(),this.sky.material.dispose(),this.clouds.geometry.dispose(),this.clouds.material.dispose(),this.clouds.dispose()}}function eu(i,t,e,n,s){return new Ge({transparent:s,depthWrite:!s,uniforms:{...n,atlas:{value:i},columnHeights:{value:t},sun:e.sun,lightness:e.day,sunset:e.warm,horizon:e.horizon},vertexShader:`
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
      }`})}const Df=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function Lf(i,t,e,n,s){const[r,a,o]=Df[i],c=Rf(n,a,r,o,s);if(c===5&&(s==="x"&&!r||s==="z"&&r!==0)&&([t,e]=[e,1-t]),c===45)for(let l=0;l<n-30;l++)[t,e]=[1-e,t];return Al(c,t,e)}function Sx(i,t){const e=[],n=[],s=[],r=[],a=i.getAttribute("position"),o=i.getAttribute("uv");function c(h,u,f,d,g,_,p,m=0){const b=e.length/3,E=new Wt(p);for(let M=0;M<a.count;M++){const A=Math.floor(M/4),[T,C,I]=Df[A],S=.8+.15*C+.065*T+.05*I,y=a.getX(M),P=a.getY(M),O=a.getZ(M),H=vn(m)&&P>0?Wn(m,y+.5,O+.5)-.5:P;e.push(h+y*d,u+H*g,f+O*_);const Y=o.getX(M),G=o.getY(M);n.push(...m?Lf(A,Y,G,m,"y"):Al(16,Y,G)),s.push(E.r*S,E.g*S,E.b*S)}for(let M=0;M<i.index.count;M++)r.push(b+i.index.getX(M))}if(c(.1,-.54,.02,.57,.64,.61,3630181),c(.1,-.24,-.01,.6,.17,.62,12622438),c(.08,-.07,-.06,.52,.43,.53,11432010),c(-.16,.015,-.23,.2,.2,.33,14591349),t>=17&&t<=20){const h=t===18||t===20?9874602:13345647;c(-.08,.35,-.12,.14,1.18,.15,10052927),c(-.08,.72,-.12,.2,.16,.2,6055253),t<=18?(c(-.08,.91,-.12,.88,.2,.2,h),c(-.55,.78,-.12,.15,.27,.19,h),c(.37,.8,-.12,.15,.19,.18,h)):(c(-.19,.91,-.12,.49,.22,.22,h),c(-.44,.75,-.12,.28,.46,.23,h),c(-.53,.61,-.12,.13,.19,.24,12962741))}else t===16?c(-.06,.36,-.18,.16,1.05,.16,12620646):t===15||t===24?(c(-.1,.29,-.22,.4,.4,.36,t===24?8708039:5792095),c(-.1,.54,-.22,.22,.16,.24,t===24?13956827:7371126)):t&&c(-.11,.3,-.26,.66,.66,.66,16777215,t);const l=new We;return l.setAttribute("position",new xe(e,3)),l.setAttribute("uv",new xe(n,2)),l.setAttribute("color",new xe(s,3)),l.setIndex(r),l}function Ex(){const t=new Uint8Array(1024).fill(255);function e(r,a,o,c,l,h){const u=Math.max(Math.abs(o-r),Math.abs(c-a));for(let f=0;f<=u;f++){const d=f/u,g=Math.round(r+(o-r)*d),_=Math.round(a+(c-a)*d);if(g<0||_<0||g>=32||_>=32)continue;const p=g+_*32;t[p]=Math.min(t[p],Math.round(245*(l+(h-l)*d)))}}[[[15,17],[12,19],[11,23],[7,25],[6,29],[2,32]],[[15,17],[16,13],[20,11],[19,7],[23,3],[23,0]],[[15,17],[18,18],[21,22],[26,22],[30,26],[32,27]],[[15,17],[11,15],[7,15],[6,12],[2,10],[-1,8]],[[11,23],[14,24],[15,28],[18,29]],[[20,11],[23,13],[26,11],[30,11]],[[7,15],[7,19],[4,22]],[[21,22],[19,25],[20,29]]].forEach((r,a)=>{const o=a<4?.02+a*.035:.51,c=a<4?.93:.98;for(let l=1;l<r.length;l++)e(r[l-1][0],r[l-1][1],r[l][0],r[l][1],o+(c-o)*(l-1)/(r.length-1),o+(c-o)*l/(r.length-1))});const s=new kr(t,32,32,Nr);return s.magFilter=Pe,s.minFilter=Pe,s.needsUpdate=!0,s}class wx{cube=new _n;mask=Ex();hand;cracking;ghost;lastItem=-1;ghostTile="";recoil=0;phase=0;clock=0;constructor(t,e,n){this.hand=new Se(new We,new Zi({map:n,vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.hand.visible=!1,this.hand.renderOrder=12,this.hand.frustumCulled=!1,e.add(this.hand),t.add(e);const s="varying vec2 face;void main(){face=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";this.cracking=new Se(this.cube,new Ge({uniforms:{stages:{value:this.mask},progress:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,vertexShader:s,fragmentShader:`uniform sampler2D stages;uniform float progress;varying vec2 face;
        void main(){float crack=step(texture2D(stages,face).r,min(.985,progress));
          float lip=step(texture2D(stages,face+vec2(.03125,-.03125)).r,min(.985,progress));
          if(crack+lip<.2)discard;
          gl_FragColor=mix(vec4(.92,.74,.46,.27),vec4(.025,.031,.032,.87),crack);
          #include <colorspace_fragment>
        }`})),this.cracking.scale.setScalar(1.002),this.cracking.visible=!1,this.cracking.renderOrder=3,t.add(this.cracking);const r=this.cube.clone();r.setAttribute("plate",new xe(new Float32Array(r.getAttribute("uv").count*2),2)),this.ghost=new Se(r,new Ge({uniforms:{atlas:{value:n},allowed:{value:1}},transparent:!0,depthWrite:!1,side:Sn,forceSinglePass:!0,vertexShader:`attribute vec2 plate;varying vec2 uvPlate,face;varying float range;
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
        }`})),this.ghost.scale.setScalar(.993),this.ghost.visible=!1,this.ghost.renderOrder=4,t.add(this.ghost)}swing(){this.recoil=1}update(t,e,n,s,r,a,o=!0){const c=!!n&&n.active!==!1;this.hand.visible=c&&o,this.cracking.visible=c&&!!e&&n.mining>0,this.cracking.visible&&e&&n&&(this.cracking.position.set(e.x+.5,e.y+.5,e.z+.5),this.cracking.material.uniforms.progress.value=n.mining);const l=n?.preview;if(this.ghost.visible=c&&!!l&&!this.cracking.visible,l&&this.ghost.visible){this.ghost.position.set(l.x+.5,l.y+.5,l.z+.5),this.ghost.material.uniforms.allowed.value=Number(l.valid);const d=l.id+"/"+l.axis;if(d!==this.ghostTile){this.ghostTile=d;const g=this.ghost.geometry.getAttribute("uv"),_=this.ghost.geometry.getAttribute("plate"),p=this.cube.getAttribute("position"),m=this.ghost.geometry.getAttribute("position");for(let b=0;b<g.count;b++){const E=Lf(b>>2,g.getX(b),g.getY(b),l.id,l.axis??"y");_.setXY(b,E[0],E[1]);const M=p.getX(b),A=p.getY(b),T=p.getZ(b);m.setXYZ(b,M,vn(l.id)&&A>0?Wn(l.id,M+.5,T+.5)-.5:A,T)}_.needsUpdate=!0,m.needsUpdate=!0}}if(!n||!c)return;if(this.recoil=Math.max(0,this.recoil-s*4.8),!o){this.phase=0;return}n.held!==this.lastItem&&(this.hand.geometry.dispose(),this.hand.geometry=Sx(this.cube,n.held),this.lastItem=n.held),this.clock+=s,this.phase=n.mining>0?this.phase+s*16:0;const h=a?Math.max(Math.sin(this.phase*.5)**2,Math.sin(this.recoil*Math.PI)):0,u=n.moving&&a?Math.sin(this.clock*(n.sprinting?13:9))*.006:0,f=.54*Math.tan(t.fov*Math.PI/360);this.hand.position.set(f*t.aspect*.66-h*.046,-f*.8+u+h*.042,-.54-h*.045),this.hand.rotation.set(.15-h*.74,-.55+h*.15,-.31+h*.19),this.hand.scale.setScalar(.235),this.hand.material.color.setScalar(r)}dispose(){this.hand.removeFromParent(),this.hand.geometry.dispose(),this.hand.material.dispose(),this.cracking.removeFromParent(),this.cracking.material.dispose(),this.mask.dispose(),this.ghost.removeFromParent(),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.cube.dispose()}}const jn=256,Cl=96,Pl=1.62,Ls=1.8,nn=.3,Is=.96,el=5,de=1e-7,Us=(i,t,e)=>i>=0&&i<jn&&e>=0&&e<jn&&t>=0&&t<Cl,ao=i=>i!==0&&i!==13,jo=(i,t,e)=>Math.min(e,Math.max(t,i));function Dl(i){return{...i,grounded:!1,vx:0,vy:0,vz:0,inWater:!1,flying:!1,wasJump:!1,crouched:!!i.crouched,coyote:0,jumpBuffer:0,eye:i.crouched?.79:Pl,stride:0,bobOffset:0,fovOffset:0}}function If(i){i.wasJump=!1,i.jumpBuffer=0,i.coyote=0,i.vx=0,i.vz=0,i.bobOffset=0,i.fovOffset=0}function Gs(i){return(i.eye??(i.crouched?.79:Pl))+(i.bobOffset??0)}function Uf(i,t,e,n,s,r,a){const{x:o,z:c}=Cf(i);return e+Wn(i,s-t-o*a,r-n-c*a)}function Ns(i,t,e,n,s=Ls){const r=Math.floor(t-nn+de),a=Math.floor(t+nn-de),o=Math.floor(e+de),c=Math.floor(e+s-de),l=Math.floor(n-nn+de),h=Math.floor(n+nn-de);if(!Us(r,o,l)||!Us(a,c,h))return!0;for(let u=o;u<=c;u++)for(let f=l;f<=h;f++)for(let d=r;d<=a;d++){const g=i.get(d,u,f);if(ao(g)&&(!vn(g)||e<Uf(g,d,u,f,t,n,nn-de)-de))return!0}return!1}function nl(i,t,e,n){return i.get(Math.floor(t),Math.floor(e+.12),Math.floor(n))===13||i.get(Math.floor(t),Math.floor(e+1),Math.floor(n))===13}function Pr(i,t,e=!1){const n={yaw:Number.isFinite(t.yaw)?t.yaw:0,pitch:Number.isFinite(t.pitch)?jo(t.pitch,-1.55,1.55):0},s=(u,f,d,g=Ls,_=!1)=>Number.isFinite(u)&&Number.isFinite(f)&&Number.isFinite(d)&&!Ns(i,u,f,d,g)&&(_||!nl(i,u,f,d));if(s(t.x,t.y,t.z,t.crouched?Is:Ls,e))return{x:t.x,y:t.y,z:t.z,...n,...t.crouched?{crouched:!0}:{}};const r=i.spawn?.()??{x:128.5,y:60,z:128.5,...n},a=Number.isFinite(t.x)&&Number.isFinite(t.z)?t:r,o=jo(Math.floor(a.x),0,jn-1),c=jo(Math.floor(a.z),0,jn-1);function l(u,f){if(Us(u,0,f))for(let d=Cl-1;d>=0;d--){const g=i.get(u,d,f);if(g!==0)return g!==13&&s(u+.5,d+1,f+.5)?{x:u+.5,y:d+1,z:f+.5,...n}:void 0}}const h=l(o,c);if(h)return h;if(s(r.x,r.y,r.z))return{...r,...n};for(let u=1;u<jn;u++)for(let f=-u;f<=u;f++){const d=l(o+f,c-u)??l(o+f,c+u);if(d)return d;if(Math.abs(f)<u){const g=l(o-u,c+f)??l(o+u,c+f);if(g)return g}}throw new Error("立てる場所が見つかりません。別のワールドかバックアップを開いてください。")}function Nf(i,t,e,n){if(!n)return!1;const s=t[e];t[e]=s+n;const r=t.crouched?Is:Ls;if(!Ns(i,t.x,t.y,t.z,r))return!1;if(e==="y"&&n<0){const l=Ka(i,t.x,t.z,t.y-de,s+de);if(l)return t.y=l.y,!0}const a=e==="y"?n>0?r:0:n>0?nn:-nn,o=s+n+a,c=(n>0?Math.floor(o-de):Math.ceil(o+de))-a;if(e!=="y"&&Math.abs(c-s)>Math.abs(n)+de){let l=0,h=1;for(let u=0;u<9;u++){const f=(l+h)/2;t[e]=s+n*f,Ns(i,t.x,t.y,t.z,r)?h=f:l=f}t[e]=s+n*l}else t[e]=c;return!0}function Ka(i,t,e,n,s,r=nn-de){let a=null;const o=Math.max(0,Math.ceil(n-1)),c=Math.min(Cl-1,Math.floor(s)),l=Math.max(0,Math.floor(t-r)),h=Math.min(jn-1,Math.floor(t+r)),u=Math.max(0,Math.floor(e-r)),f=Math.min(jn-1,Math.floor(e+r));for(let d=o;d<=c;d++)for(let g=u;g<=f;g++)for(let _=l;_<=h;_++){const p=i.get(_,d,g);if(!ao(p))continue;const m=vn(p),b=m?Uf(p,_,d,g,t,e,r):d+1;b<n||b>s||(!a||b>a.y+de||!m&&vn(a.id)&&Math.abs(b-a.y)<=de)&&(a={y:b,id:p})}return a}function ur(i,t,e,n,s=nn-de){return Ka(i,t,n,e-.002,e+.002,s)}function nu(i,t,e,n,s,r,a){if(!n)return!1;const o=t.x+(e==="x"?n:0),c=t.z+(e==="z"?n:0);if(s){const l=Math.abs(n)+.054,h=Ka(i,o,c,t.y-l,t.y+l);if(h&&(vn(h.id)||vn(s.id))){if(r&&!Ka(i,o,c,t.y-l,t.y+l,a))return!0;if(!Ns(i,o,h.y,c,t.crouched?Is:Ls))return t[e]+=n,t.y=h.y,!1}}return r&&!ur(i,o,t.y,c,a)?!0:Nf(i,t,e,n)}function Tx(i,t,e,n,s={}){if(!(n>0)||!Number.isFinite(n))return;const r=Math.min(n,.25),a=Math.ceil(r*100),o=r/a,c=Math.max(1,Math.hypot(e.forward,e.right)),l=e.forward/c,h=e.right/c,u=Math.sin(t.yaw),f=Math.cos(t.yaw),d=h*f-l*u,g=-h*u-l*f,_=s.sprintMultiplier??1,p=Number.isFinite(_)?Math.min(1.4,Math.max(1,_)):1;(e.jumpPressed||e.jump&&!t.wasJump)&&(t.jumpBuffer=.105);for(let m=0;m<a;m++){const b=t.x,E=t.z;t.inWater=nl(i,t.x,t.y,t.z);const M=t.vy<=0?ur(i,b,t.y,E):null;M&&(t.y=M.y),t.crouched=!t.flying&&!t.inWater&&e.down&&(!!M||t.crouched)||t.crouched&&Ns(i,b,t.y,E);const A=t.flying?e.sprint?13:8:t.inWater?2:t.crouched?1.65:e.sprint?6.4*p:4.2;if(t.flying||t.inWater)t.vx=d*A,t.vz=g*A;else{const G=M&&vn(M.id)?Cf(M.id):null,K=G?t.crouched?2.4:6.4:0,$=G?A*.48:A,V=d*$+(G?.x??0)*K-t.vx,st=g*$+(G?.z??0)*K-t.vz,ft=Math.min(1,(G?13:M?d||g?53:72:d||g?17:5)*o/(Math.hypot(V,st)||1));t.vx+=V*ft,t.vz+=st*ft}const T=!!M&&t.crouched&&!t.flying,C=T&&ur(i,b,t.y,E,.1)?.1:nn-de,I=t.vx*o,S=t.vz*o,y=t.flying||t.inWater?null:M;if(nu(i,t,"x",I,y,T,C)&&(t.vx=0),nu(i,t,"z",S,y,T,C)&&(t.vz=0),M&&(t.coyote=.08),t.flying)t.coyote=t.jumpBuffer=0,t.vy=(Number(e.jump)-Number(e.down))*A;else if(t.inWater)t.coyote=t.jumpBuffer=0,t.vy=e.jump?4.9:Math.max(-2.1,t.vy-7*o);else{const G=M&&Math.abs(t.y-Math.round(t.y))<.002?_x(i.get(Math.floor(t.x),Math.round(t.y)-1,Math.floor(t.z))):0;(G||t.jumpBuffer>0&&t.coyote>0)&&(t.vy=G?Math.sqrt(48*G)+.12:8.35,t.jumpBuffer=t.coyote=0),t.vy>0||!ur(i,t.x,t.y,t.z)?t.vy=Math.max(-30,t.vy-24*o):t.vy=0}Nf(i,t,"y",t.vy*o)&&(t.vy=0),t.grounded=t.vy<=0&&!!ur(i,t.x,t.y,t.z),t.jumpBuffer=Math.max(0,t.jumpBuffer-o),t.coyote=Math.max(0,t.coyote-o);const P=Math.hypot(t.x-b,t.z-E);t.stride=(t.stride+P*4.2)%(Math.PI*2);const O=t.grounded&&!t.flying&&P>0&&s.bob!==!1?Math.sin(t.stride)*(t.crouched?.006:.021):0;t.bobOffset+=(O-t.bobOffset)*Math.min(1,18*o);const H=t.crouched?.79:Pl;t.eye+=(H-t.eye)*Math.min(1,18*o),t.crouched&&t.eye>Is-.07&&Ns(i,t.x,t.y,t.z,t.eye+.07)&&(t.eye=Is-.07);const Y=e.sprint&&!t.crouched&&P/o>4.2&&s.sprintFov!==!1?4:0;t.fovOffset+=(Y-t.fovOffset)*Math.min(1,10*o)}t.inWater=nl(i,t.x,t.y,t.z),t.wasJump=e.jump}function Mi(i,t,e=el){if(!Number.isFinite(e)||e<0||![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=t.x,s=t.y+Gs(t),r=t.z,a=Math.cos(t.pitch),o=-Math.sin(t.yaw)*a,c=Math.sin(t.pitch),l=-Math.cos(t.yaw)*a;let h=Math.floor(n),u=Math.floor(s),f=Math.floor(r);const d=Math.sign(o),g=Math.sign(c),_=Math.sign(l),p=o?Math.abs(1/o):1/0,m=c?Math.abs(1/c):1/0,b=l?Math.abs(1/l):1/0,E=(O,H,Y)=>Y===0?1/0:Math.max(0,((Y>0?H+1:H)-O)/Y);let M=E(n,h,o),A=E(s,u,c),T=E(r,f,l),C=0,I=0,S=0,y=0;const P=Math.min(el,e);for(let O=0;O<=3*Math.ceil(P)+1&&y<=P&&Us(h,u,f);O++){const H=i.get(h,u,f);if(vn(H)){const $=Math.min(P,M,A,T),V=ft=>s+c*ft-u-Wn(H,n+o*ft-h,r+l*ft-f),st=V(y),ct=V($);if(st<=de)return{x:h,y:u,z:f,id:H,nx:C,ny:I,nz:S,distance:y};if(ct<=0){const ft=y+($-y)*st/(st-ct);return{x:h,y:u,z:f,id:H,nx:0,ny:1,nz:0,distance:ft}}}else if(ao(H))return{x:h,y:u,z:f,id:H,nx:C,ny:I,nz:S,distance:y};C=I=S=0,y=Math.min(M,A,T);const Y=M<=y+1e-10,G=A<=y+1e-10,K=T<=y+1e-10;Y&&(M+=p,h+=d),G&&(A+=m,u+=g),K&&(T+=b,f+=_),Y?C=-d:G?I=-g:S=-_}return null}function oo(i,t,e,n){return t<i.x+nn-de&&t+1>i.x-nn+de&&n<i.z+nn-de&&n+1>i.z-nn+de&&e<i.y+(i.crouched?Is:Ls)-de&&e+1>i.y+de}function Ax(i,t,e){if(!e||Math.abs(e.nx)+Math.abs(e.ny)+Math.abs(e.nz)!==1)return!1;const n=e.x+e.nx,s=e.y+e.ny,r=e.z+e.nz;return!Us(n,s,r)||ao(i.get(n,s,r))?!1:!oo(t,n,s,r)}function Ff(i,t,e){if(!e)return!1;const n=Mi(i,t);return!!n&&n.x===e.x&&n.y===e.y&&n.z===e.z&&n.id===e.id&&n.nx===e.nx&&n.ny===e.ny&&n.nz===e.nz}function Rx(i,t,e,n,s,r){if(!Ff(i,t,r))return{ok:!1,message:"5ブロック以内の素材に照準を合わせてください。"};if(r.id===22&&i.chestAt?.(r.x,r.y,r.z)?.length)return{ok:!1,message:"先にチェストの中身を取り出してください。"};if(!Qt[r.id]?.block)return{ok:!1,message:"岩盤は掘れません。"};if(n==="creative")return i.set(r.x,r.y,r.z,0)?{ok:!0,message:Qt[r.id].name+"を取り除きました。"}:{ok:!1,message:"ここは掘れません。"};const a=ku(e,r.id,e.hotbar[s]);return a.draft?i.set(r.x,r.y,r.z,0)?(Object.assign(e,a.draft),{ok:!0,message:a.message}):{ok:!1,message:"ここは掘れません。"}:{ok:!1,message:a.message}}function Ll(i,t,e,n,s,r){const a=e.hotbar[s];if(!Qt[a]?.block)return"ホットバーから建材を選んでください。";if(n==="explore"&&!Nn(e,a))return Qt[a].name+"を持っていません。";if(!r)return"5ブロック以内の面に照準を合わせてください。";const o=r.x+r.nx,c=r.y+r.ny,l=r.z+r.nz;return Us(o,c,l)?oo(t,o,c,l)?"自分の体に重なる場所です。":Ax(i,t,r)?null:"ここにはすでにブロックがあります。":"ワールドの外には置けません。"}function Cx(i,t,e,n,s,r,a){const o=Ll(i,t,e,n,s,r);if(o)return{ok:!1,message:o};if(!Ff(i,t,r))return{ok:!1,message:"5ブロック以内の面に照準を合わせてください。"};const c=e.hotbar[s];return a!==void 0&&(c!==30||!vn(a))?{ok:!1,message:"この建材の向きは変更できません。"}:i.set(r.x+r.nx,r.y+r.ny,r.z+r.nz,a??c)?(n==="explore"&&Ou(e,c),{ok:!0,message:Qt[c].name+"を置きました。"}):{ok:!1,message:"ここには置けません。"}}const Px=.17;function Dx(i,t,e,n,s){if(t-s<0||n-s<0||t+s>=jn||n+s>=jn||e-s<0)return!0;for(let r=Math.floor(e-s);r<=Math.floor(e+s);r++)for(let a=Math.floor(n-s);a<=Math.floor(n+s);a++)for(let o=Math.floor(t-s);o<=Math.floor(t+s);o++){const c=i.get(o,r,a);if(c!==0&&c!==13)return!0}return!1}function iu(i,t,e,n){const s=Math.max(1,Math.ceil(t.distanceTo(e)/.14));for(let r=1;r<=s;r++){const a=r/s;if(Dx(i,t.x+(e.x-t.x)*a,t.y+(e.y-t.y)*a,t.z+(e.z-t.z)*a,n))return(r-1)/s}return 1}function kf(i,t){Of(i,67+(t.fovOffset??0)),i.position.set(t.x,t.y+Gs(t),t.z),i.rotation.set(t.pitch,t.yaw,0,"YXZ")}function Of(i,t){Math.abs(t-i.fov)<=.01||(i.fov=t,i.updateProjectionMatrix())}class Lx{eye=new L;raised=new L;aim=new L;screen=new L;boom=1;next=!1;reticle={x:50,y:50};reset(){this.boom=1,this.next=!1,this.reticle.x=this.reticle.y=50}update(t,e,n,s,r){const a=Math.sin(n.yaw),o=Math.cos(n.yaw),c=Math.cos(n.pitch);this.eye.set(n.x,n.y+Gs(n),n.z);const l=s?Math.max(0,s.distance-.035):el;this.aim.set(n.x-a*c*l,this.eye.y+Math.sin(n.pitch)*l,n.z-o*c*l),this.raised.set(n.x+a*7.4,this.eye.y+5.6,n.z+o*7.4);let h=iu(e,this.eye,this.raised,Px);if(s&&(h=this.visibleFraction(t,e,h)),this.boom=this.next?Math.min(h,this.boom+(h-this.boom)*(1-Math.exp(-11*r))):h,this.next=!0,s&&this.boom!==h&&(this.boom=this.visibleFraction(t,e,this.boom)),t.position.lerpVectors(this.eye,this.raised,this.boom),this.boom<.23)return kf(t,n),this.reticle.x=this.reticle.y=50,!1;const u=53;Of(t,u);const f=Math.min(1.65,this.boom*2.5),d=Math.atan2(n.y+1.03-t.position.y,7.4*this.boom+f),g=Math.atan2(this.aim.y-t.position.y,7.4*this.boom+c*l),_=u*Math.PI/180*.35;return t.rotation.set(Math.min(g+_,Math.max(g-_,d)),n.yaw,0,"YXZ"),t.updateMatrixWorld(),this.screen.copy(this.aim).project(t),this.reticle.x=(1+this.screen.x)*50,this.reticle.y=(1-this.screen.y)*50,!0}visibleFraction(t,e,n){for(;n>=.23&&(t.position.lerpVectors(this.eye,this.raised,n),iu(e,t.position,this.aim,0)!==1);)n*=.61;return n}}function zf(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new We;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=su(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let _=0;_<a[h].length;++_)d.push(a[h][_][f]);const g=su(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function su(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new $e(a,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const _=h.getComponent(f,g);o.setComponent(f+u,g,_)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const er=5847973,Ko=9929704,ru=16760167,Zo=16771519,Ix=3583139,au=3425640,nr=16480361,ou=15972242,cu=3681102,Ux=[.79,.67,1,.51,.72,.88];function va(i,t){const e=i.map(([s,r,a,o,c,l,h])=>{const u=new _n(o,c,l);u.translate(s,r,a);const f=new Wt(h),d=new Float32Array(u.attributes.position.count*3);for(let g=0;g<d.length/3;g++){const _=Ux[Math.floor(g/4)];f.multiplyScalar(_).toArray(d,g*3),f.setHex(h)}return u.setAttribute("color",new $e(d,3)),u}),n=zf(e);for(const s of e)s.dispose();return new Se(n,t)}class Bf{group=new Vi;body=new Vi;material=new Zi({vertexColors:!0,toneMapped:!1});head;arms=[];legs=[];shadow=new Se(new Hs(.76,.76),new Ge({transparent:!0,depthWrite:!1,vertexShader:`
        varying vec2 texel;
        void main() {
          texel = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }`,fragmentShader:`
        varying vec2 texel;
        void main() {
          float opacity = .33 * (1. - smoothstep(.09, .49, length(texel - .5)));
          gl_FragColor = vec4(.09, .13, .17, opacity);
        }`}));phase=0;idle=0;gait=0;actionPhase=0;actionBlend=0;constructor(){this.group.name="kids-avatar",this.group.visible=!1,this.group.add(this.body,this.shadow),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.012,this.shadow.renderOrder=1;const t=va([[0,.796,0,.39,.53,.29,ru],[0,.57,0,.4,.095,.3,er],[0,.789,-.149,.034,.38,.015,Zo],[0,1.044,.005,.39,.094,.32,nr],[-.102,.962,-.15,.087,.15,.025,nr],[0,.832,.174,.326,.385,.224,au],[0,.878,.237,.303,.28,.102,Ix],[0,.972,.244,.303,.098,.106,7919294],[0,.849,.299,.086,.086,.025,Zo],[0,.849,.315,.031,.031,.013,nr],[0,.686,.233,.22,.078,.108,2656899]],this.material);t.name="explorer-coat-and-pack",this.body.add(t),this.head=va([[0,.223,0,.426,.446,.405,ou],[0,.27,.123,.428,.31,.158,er],[0,.446,.003,.494,.143,.451,er],[0,.534,.013,.444,.086,.417,Ko],[0,.579,.026,.302,.038,.287,Ko],[0,.421,-.181,.456,.056,.163,Ko],[0,.498,.007,.194,.027,.125,Zo],[-.102,.233,-.203,.039,.055,.011,cu],[.102,.233,-.203,.039,.055,.011,cu],[-.141,.167,-.203,.063,.018,.011,nr],[.141,.167,-.203,.063,.018,.011,nr],[0,.146,-.204,.054,.022,.011,9522272]],this.material),this.head.name="explorer-head",this.head.position.y=1.08,this.body.add(this.head);for(const e of[-1,1]){const n=va([[0,-.127,0,.122,.318,.182,ru],[0,-.269,0,.126,.084,.185,er],[0,-.343,-.012,.113,.086,.129,ou]],this.material);n.name="explorer-arm",n.position.set(.232*e,.969,.01),this.arms.push(n),this.body.add(n);const s=va([[0,-.146,.01,.158,.319,.168,au],[0,-.346,-.037,.173,.143,.247,er],[0,-.415,-.031,.176,.048,.251,2501193]],this.material);s.name="explorer-boot",s.position.set(.112*e,.441,.008),this.legs.push(s),this.body.add(s)}}update(t,e,n=!1,s=1){const r=Math.min(.05,Math.max(0,e)),a=Math.hypot(t.vx,t.vz),o=!t.grounded&&!t.inWater&&!t.flying,c=t.grounded||t.inWater?Math.min(1,a/3.1):0;this.gait=lr.damp(this.gait,c,17,r),this.phase=(this.phase+r*(4+Math.min(6.4,a)*1.65))%(Math.PI*2),this.idle=(this.idle+r*3)%(Math.PI*2),this.actionPhase=n?(this.actionPhase+r*20)%(Math.PI*2):0,this.actionBlend=lr.damp(this.actionBlend,n?1:0,21,r);const l=Math.sin(this.phase)*this.gait,h=(.52+.35*Math.sin(this.actionPhase))*this.actionBlend;this.group.position.set(t.x,t.y,t.z),this.group.rotation.y=t.yaw,this.body.position.y=.004+(t.grounded?.028*this.gait*Math.abs(l):0)+.006*(1+Math.sin(this.idle)),this.body.scale.y=t.crouched?.54:1,this.head.rotation.x=lr.clamp(t.pitch*.28,-.22,.21),this.head.rotation.z=.037*l,this.legs[0].rotation.x=.5*l+(o?.18:0),this.legs[1].rotation.x=-.5*l-(o?.21:0),this.arms[0].rotation.x=-.49*l+(o?.24:0),this.arms[1].rotation.x=.49*l+h+(o?.24:0),this.arms[0].rotation.z=t.flying?-.38:-.035,this.arms[1].rotation.z=t.flying?.38:.035,this.shadow.visible=t.grounded&&!t.inWater&&!t.flying;const u=lr.clamp(s,0,1);this.material.color.setRGB(.58+u*.42,.66+u*.34,.8+u*.2)}dispose(){this.group.removeFromParent();for(const t of this.body.children)t instanceof Se&&t.geometry.dispose();this.material.dispose(),this.shadow.geometry.dispose(),this.shadow.material.dispose()}}function Nx(i,t,e,n){const s=t.position;if(Math.hypot(e.x-s.x,e.y-s.y,e.z-s.z)>28)return!1;for(const r of e.crouched?[.56,.88]:[.88,1.55]){const a=e.x,o=e.y+r,c=e.z;if(n.set(a,o,c).project(t),Math.abs(n.x)>.99||Math.abs(n.y)>.99||n.z<=-1||n.z>=1)continue;const l=Math.max(1,Math.ceil(Math.hypot(a-s.x,o-s.y,c-s.z)/.19));let h=!0;for(let u=1;u<l;u++){const f=u/l,d=i.get(Math.floor(s.x+(a-s.x)*f),Math.floor(s.y+(o-s.y)*f),Math.floor(s.z+(c-s.z)*f));if(d!==0&&d!==10&&d!==13){h=!1;break}}if(h)return!0}return!1}function lu(i){const t=document.createElement("canvas");t.width=512,t.height=96;const e=t.getContext("2d");e.font="bold 46px system-ui, sans-serif";const n=Math.min(490,Math.ceil(e.measureText(i).width)+50),s=(t.width-n)/2;e.fillStyle="#142e29eb",e.beginPath(),e.roundRect?e.roundRect(s,12,n,72,22):e.rect(s,12,n,72),e.fill(),e.strokeStyle="#eec983",e.lineWidth=3,e.stroke(),e.fillStyle="#fff6d9",e.textAlign="center",e.textBaseline="middle",e.fillText(i,256,49,n-34);const r=new Em(t);r.colorSpace=He;const a=new _m(new mf({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}));return a.scale.set(3.35,.63,1),a}class Fx{constructor(t){this.scene=t}scene;actors=new Map;sample=new L;setPlayers(t,e=null){const n=new Set;for(const s of t){n.add(s.id);const r=s.id===e?"鬼 "+s.nickname:s.nickname;let a=this.actors.get(s.id);if(a)a.caption!==r&&(this.releaseLabel(a.label),a.label=lu(r),a.caption=r,a.avatar.group.add(a.label));else{const o=new Bf,c=lu(r);o.group.visible=!0,o.group.name="online-player",o.group.add(c),this.scene.add(o.group),a={avatar:o,label:c,caption:r,body:Dl({...s.pose,pitch:0}),goal:s.pose},this.actors.set(s.id,a)}a.goal=s.pose}for(const[s,r]of this.actors)n.has(s)||this.release(s,r)}animate(t,e,n,s){for(const{body:r,goal:a,avatar:o,label:c}of this.actors.values()){const h=Math.hypot(a.x-r.x,a.y-r.y,a.z-r.z)>12||t===0?1:1-Math.exp(-6*t);r.x+=(a.x-r.x)*h,r.y+=(a.y-r.y)*h,r.z+=(a.z-r.z)*h;const u=a.yaw-r.yaw;r.yaw+=Math.atan2(Math.sin(u),Math.cos(u))*h,r.crouched=a.crouched,r.flying=a.flying,r.grounded=!a.flying,r.vx=a.moving?3.3:0,c.position.y=a.crouched?1.23:2.02,o.update(r,t,!1,e),c.visible=!s||Nx(n,s,r,this.sample)}}dispose(){for(const[t,e]of this.actors)this.release(t,e)}release(t,{avatar:e,label:n}){this.releaseLabel(n),e.dispose(),this.actors.delete(t)}releaseLabel(t){t.removeFromParent(),t.material.map?.dispose(),t.material.dispose()}}const kx=[0,8629330,11041876,9608594,14663561,9861198,6528082,13080411,9608078,9084310,10344399,6647915,15975794,6932679,5857887];class Ox{constructor(t,e){this.canvas=t,this.world=e;const n=t.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"high-performance"});if(!n)throw new Error("WebGL 2を利用できません。ChromeまたはEdgeの設定でグラフィック アクセラレーションを有効にして再起動してください。");this.gl=new fx({canvas:t,context:n,antialias:!1,alpha:!1}),this.gl.outputColorSpace=He,this.gl.toneMapping=Xn,this.atlas.anisotropy=Math.min(4,this.gl.capabilities.getMaxAnisotropy()),this.gl.setClearColor(12376013),this.sky=new bx(this.scene,e.salt);for(let r=0;r<this.heights.length;r++)this.heights[r]=Math.max(0,e.highest[r]);this.heightTexture=new kr(this.heights,256,256,Nr),this.heightTexture.magFilter=Pe,this.heightTexture.minFilter=Pe,this.heightTexture.needsUpdate=!0,this.materials=[eu(this.atlas,this.heightTexture,this.sky,this.uniforms,!1),eu(this.atlas,this.heightTexture,this.sky,this.uniforms,!0)],this.tools=new wx(this.scene,this.camera,this.atlas);const s=new _n(1.008,1.008,1.008);this.selection=new Sm(new wm(s),new vf({color:16772533,toneMapped:!1})),s.dispose(),this.selection.visible=!1,this.selection.renderOrder=4,this.scene.add(this.selection),this.chips=new Xa(new _n(.1,.1,.1),new Zi({color:16777215}),64),this.chips.count=0,this.chips.frustumCulled=!1,this.chips.visible=!1,this.scene.add(this.chips),this.border=this.makeBorder(),this.scene.add(this.border),this.unsubscribe=e.onEdit((r,a,o)=>{for(const h of Ld(r,a,o))this.wanted.has(h)&&this.dirty.add(h);const c=r+256*o,l=Math.max(0,e.highest[c]);this.heights[c]!==l&&(this.heights[c]=l,this.heightTexture.needsUpdate=!0),this.lampDue=0})}canvas;world;scene=new mm;actors=new Fx(this.scene);camera=new mn(67,1,.06,320);stats={draws:0,chunks:0,geometries:0,textures:0,fps:0,queued:0,triangles:0,chunkMs:0,rebuilt:0};gl;sky;atlas=px();heightTexture;heights=new Uint8Array(256*256);uniforms={lampPositions:{value:Array.from({length:4},()=>new L)},lampCount:{value:0},lampColors:{value:Array.from({length:4},()=>new L)},fogEnd:{value:75},clock:{value:0},shadows:{value:1},extras:{value:1},submerged:{value:0}};tools;kidsCamera=new Lx;avatar;actionTime=0;materials;batches=new Map;pending=[];wanted=new Set;dirty=new Set;unsubscribe;selection;border;chips;particles=[];dummy=new Ce;chipColor=new Wt;quality={distance:4,scale:1,shadows:!0};cx=-100;cz=-100;cy=-100;t=0;wt=0;ht=0;lampDue=0;elapsed=0;frameCount=0;totalFrames=0;lampCamera=new L(1/0,1/0,1/0);vegetation=1;visibleChunks=new Set;configure(t){const e=Math.max(2,Math.min(8,Math.round(t.distance)));e!==this.quality.distance&&(this.cx=-100);const n=t.vegetation===!1?0:t.quality==="high"?1.4:t.quality==="low"?.42:1;if(n!==this.vegetation){this.vegetation=n;for(const s of this.batches.keys())this.world.occupied[s]&&this.dirty.add(s)}this.quality={...t,distance:e,scale:Math.max(.45,Math.min(1.5,t.scale))},this.uniforms.shadows.value=t.shadows?t.quality==="high"?2:1:0,this.uniforms.extras.value=t.effects===!1?0:1,this.uniforms.fogEnd.value=(e+.45)*16,this.wt=0}makeBorder(){const t=[];for(const[r,a,o,c]of[[0,0,256,0],[256,0,256,256],[256,256,0,256],[0,256,0,0]])t.push(r,0,a,o,0,c,o,96,c,r,0,a,o,96,c,r,96,a);const e=new We;e.setAttribute("position",new xe(t,3));const n=new Ge({side:Sn,transparent:!0,depthWrite:!1,vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 p;void main(){
        float limit=1.-smoothstep(1.,12.,distance(cameraPosition,p));if(limit<=0.)discard;
        vec2 grid=fract(vec2(p.x+p.z,p.y)*.5);float line=step(min(grid.x,grid.y),.022);
        gl_FragColor=vec4(.95,.79,.45,limit*(.06+.49*line));}`}),s=new Se(e,n);return s.visible=!1,s}schedule(t){const e=Math.floor(t.x/16),n=Math.floor(t.z/16),s=Math.floor(t.y/16);if(e===this.cx&&n===this.cz&&s===this.cy)return;this.cx=e,this.cz=n,this.cy=s,this.wanted.clear(),this.pending.length=0;const r=this.quality.distance,a=-Math.sin(t.yaw),o=-Math.cos(t.yaw);for(let c=Math.max(0,n-r);c<=Math.min(15,n+r);c++)for(let l=Math.max(0,e-r);l<=Math.min(15,e+r);l++){const h=l-e,u=c-n,f=Math.hypot(h,u);if(f>r+.65)continue;const d=this.world.highest[l*16+8+256*(c*16+8)]>>4;for(let g=0;g<6;g++){const _=br(l,g,c);if(this.wanted.add(_),this.batches.has(_)||!this.world.occupied[_])continue;const p=h*a+u*o,m=Math.min(Math.abs(g-d)*2,Math.abs(g-s)*2);this.pending.push({key:_,priority:f*2.2+m+.2*Math.abs(g-s)-p*.55+(g+1<Math.min(s,d)?8:0)})}}this.pending.sort((c,l)=>l.priority-c.priority);for(const[c,l]of this.batches)this.wanted.has(c)||(this.removeMeshes(l),this.batches.delete(c));for(const c of this.dirty)this.wanted.has(c)||this.dirty.delete(c)}removeMeshes(t){for(const e of t)this.scene.remove(e),e.geometry.dispose()}rebuild(t){const e=this.batches.get(t);e&&this.removeMeshes(e);const n=[],s=yx(this.world,t&15,t>>>8,t>>>4&15,this.vegetation);for(let r=0;r<s.length;r++){const a=s[r];if(!a)continue;const o=new Se(a,this.materials[r===0?0:1]);o.renderOrder=r===0?0:1,o.onBeforeRender=()=>{this.visibleChunks.add(t)},n.push(o),this.scene.add(o)}this.batches.set(t,n)}pump(){const t=performance.now(),e=this.totalFrames<4?8:3.5;let n=0;do{let s;if(this.dirty.size)s=this.dirty.values().next().value,this.dirty.delete(s);else if(this.pending.length){if(s=this.pending.pop().key,this.batches.has(s))continue}else break;this.rebuild(s),n++}while(n<9&&performance.now()-t<e);this.stats.chunkMs=n?performance.now()-t:0,this.stats.rebuilt=n}lamps(t){const e=[];for(const n of this.world.lamps){const s=(n&255)+.5,r=(n>>>16)+.5,a=(n>>>8&255)+.5,o=(s-t.x)**2+(a-t.z)**2+(r-t.y)**2;o>676||e.length===4&&o>=e[3].d||(e.push({key:n,d:o}),e.sort((c,l)=>c.d-l.d),e.length>4&&e.pop())}this.uniforms.lampCount.value=e.length,e.forEach(({key:n},s)=>{this.uniforms.lampPositions.value[s].set((n&255)+.5,(n>>>16)+.5,(n>>>8&255)+.5);const r=this.world.data[n]===25;this.uniforms.lampColors.value[s].set(r?.36:1.86,r?1.57:1.09,r?1.4:.43)})}effect(t,e,n,s,r="mine"){this.tools.swing(),this.actionTime=.26;const a=this.quality.effects===!1?0:r==="place"?3:7;for(let o=0;o<a;o++)this.particles.length>=64&&this.particles.shift(),this.particles.push({x:t+.5+(Math.random()-.5)*.65,y:e+.55+Math.random()*.38,z:n+.5+(Math.random()-.5)*.65,vx:(Math.random()-.5)*2.1,vy:1+Math.random()*1.7,vz:(Math.random()-.5)*2.1,life:.32+Math.random()*.17,id:s})}updateParticles(t){for(let e=this.particles.length-1;e>=0;e--){const n=this.particles[e];if(n.life-=t,n.life<=0){this.particles.splice(e,1);continue}n.vy-=8*t,n.x+=n.vx*t,n.y+=n.vy*t,n.z+=n.vz*t}this.chips.count=this.particles.length,this.chips.visible=this.chips.count>0;for(let e=0;e<this.chips.count;e++){const n=this.particles[e];this.dummy.position.set(n.x,n.y,n.z),this.dummy.rotation.set(n.life*4,e+n.life*5,e*.8),this.dummy.scale.setScalar(Math.min(1,n.life*5)),this.dummy.updateMatrix(),this.chips.setMatrixAt(e,this.dummy.matrix),this.chips.setColorAt(e,this.chipColor.setHex(kx[n.id]??(n.id===23||n.id===25||n.id===26?9554109:11837559)))}this.chips.count&&(this.chips.instanceMatrix.needsUpdate=!0,this.chips.instanceColor&&(this.chips.instanceColor.needsUpdate=!0))}update(t,e,n,s,r,a,o=!1){const c=Math.max(1,this.canvas.clientWidth),l=Math.max(1,this.canvas.clientHeight);if(c!==this.wt||l!==this.ht){this.wt=c,this.ht=l;const _=Math.min(window.devicePixelRatio||1,1.5),p=this.quality.quality==="standard"||this.quality.quality==="high"?2073600:12e5,m=Math.sqrt(p/(c*l));this.gl.setPixelRatio(Math.min(_,m)*this.quality.scale),this.gl.setSize(c,l,!1),this.camera.aspect=c/l,this.camera.updateProjectionMatrix()}this.t+=s,this.uniforms.clock.value=this.t;const h=Gs(t),u=a?this.kidsCamera.update(this.camera,this.world,a.player,a.hit,s):!1;a||kf(this.camera,t),this.sky.update(n,this.camera,this.t),o&&this.camera.updateMatrixWorld(),this.actors.animate(s,.52+.48*this.sky.day.value,this.world,o?this.camera:void 0),this.actionTime=Math.max(0,this.actionTime-s),u&&a&&(this.avatar||(this.avatar=new Bf,this.scene.add(this.avatar.group)),this.avatar.update(a.player,s,this.actionTime>0||!!r?.mining,.52+.48*this.sky.day.value)),this.avatar&&(this.avatar.group.visible=u),this.selection.visible=!!e,e&&this.selection.position.set(e.x+.5,e.y+.5,e.z+.5);const f=this.camera.position;this.uniforms.submerged.value=+(this.world.get(Math.floor(f.x),Math.floor(f.y),Math.floor(f.z))===13),this.border.visible=Math.min(t.x,t.z,256-t.x,256-t.z)<12,this.schedule(t),this.pump(),this.lampDue-=s,(this.lampDue<=0||this.lampCamera.distanceToSquared(this.camera.position)>4)&&(this.lamps(t),this.lampDue=.23,this.lampCamera.copy(this.camera.position)),this.updateParticles(s);const d=this.world.highest[(t.x|0)+(t.z|0)*256]>t.y+h+1.5;this.tools.update(this.camera,e,r,s,(d?.57:.7)+this.sky.day.value*(d?.13:.3),this.uniforms.extras.value>0,!u),this.visibleChunks.clear(),this.gl.render(this.scene,this.camera);const g=this.gl.info;this.stats.draws=g.render.calls,this.stats.triangles=g.render.triangles,this.stats.geometries=g.memory.geometries,this.stats.chunks=this.visibleChunks.size,this.stats.textures=g.memory.textures,this.stats.queued=this.pending.length+this.dirty.size,this.totalFrames++,this.frameCount++,this.elapsed+=s,this.elapsed>=.6&&(this.stats.fps=Math.round(this.frameCount/this.elapsed),this.frameCount=0,this.elapsed=0)}dispose(){this.unsubscribe(),this.actors.dispose(),this.avatar?.dispose();for(const t of this.batches.values())this.removeMeshes(t);this.batches.clear(),this.dirty.clear(),this.wanted.clear(),this.pending.length=0,this.selection.geometry.dispose(),this.selection.material.dispose(),this.border.geometry.dispose(),this.border.material.dispose(),this.chips.geometry.dispose(),this.chips.material.dispose(),this.chips.dispose(),this.sky.dispose(this.scene),this.materials.forEach(t=>t.dispose()),this.tools.dispose(),this.atlas.dispose(),this.heightTexture.dispose(),this.scene.clear(),this.gl.dispose()}}const il=[{id:"classic",name:"森と湖",detail:"森や洞窟を探検できる、にぎやかなワールド。",thumbnail:"./art/stage-classic.webp"},{id:"flat",name:"まっさらな平地",detail:"木や建物のない草原。自由な建築に。",thumbnail:"./art/stage-flat.webp"},{id:"lake",name:"湖だけ",detail:"小さな砂島から出発。湖の中で魚に出会えます。",thumbnail:"./art/stage-lake.webp"}];function Il(i){return il.some(t=>t.id===i)}function zx(i,t,e,n){const s=t==="creative";function r(c){const l=Qt[c];return l?{id:c,name:l.name,count:s?1/0:Mr(i,c),durability:s?void 0:Nn(i,c)?.durability,maxDurability:l.maxDurability}:null}const a=s?Object.keys(Qt).map(Number).filter(c=>Qt[c].block&&to(c)===c).map(r).filter(c=>!!c):i.slots.map(c=>({id:c.id,name:Qt[c.id].name,count:c.count,durability:c.durability,maxDurability:Qt[c.id].maxDurability})),o=s?[]:Pu.filter(c=>!c.legacy||n.generator===1).map(c=>({id:c.id,name:c.name,itemId:c.output.id,ingredients:c.inputs.map(l=>Qt[l.id].name+" "+Mr(i,l.id)+"/"+l.count).join(" ・ "),outputs:Qt[c.output.id].name+" ×"+c.output.count,craftable:bd(i,c,n),reason:dl(i,c,n),equipment:Fu(c,n.generator)?"作業台":"手作り"}));return{items:a,bar:i.hotbar.map(r),recipes:o,mode:t,selected:e}}const ye=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),$o=i=>i==="creative"?"クリエイティブ":"探索",hu={lock:{name:"マウス固定",label:"視点を固定してプレイ"},drag:{name:"ドラッグ操作",label:"ドラッグ操作でプレイ"},tablet:{name:"タブレットモード",label:"タブレットモードでプレイ"}},Ft=i=>document.getElementById(i),be=(i,t,e="")=>'<button type="button" class="'+e+'" data-action="'+i+'">'+t+"</button>",Bx=()=>be("back",'<span aria-hidden="true">‹</span> 戻る',"back"),Li=i=>'<header class="panel-head"><h1>'+i+"</h1>"+Bx()+"</header>",Jo=i=>Number.isFinite(i)?String(i):"∞",uu=new Map,fu={17:"石や鉱石を素早く掘り、潮晶を採取",18:"石や鉱石をさらに速く掘り、潮晶を採取",19:"原木・木材の採掘を短縮",20:"原木・木材をさらに速く採掘",27:"約3ブロック跳び上がる",28:"約6ブロック跳び上がる",29:"約10ブロック跳び上がる",30:"1ブロックずつ高さを変えてつなぐ"};function Hx(i){const t=uu.get(i);if(t)return t;const e=document.createElement("canvas");e.width=e.height=32;const n=e.getContext("2d");if(!n)return"";const s=(o,c)=>{n.fillStyle=o,n.beginPath(),n.moveTo(c[0][0],c[0][1]);for(const[l,h]of c.slice(1))n.lineTo(l,h);n.closePath(),n.fill()},r={1:["#86bc59","#916742","#705637"],2:["#bf9165","#9b704c","#77563d"],3:["#b4bac1","#828e98","#646d79"],4:["#f1d9a0","#ccb17e","#b79565"],5:["#d1ad75","#926645","#684630"],6:["#71ac63","#538959","#386c47"],7:["#e6ba82","#bf8c53","#9d7044"],8:["#b4b7b4","#8e9392","#6f797a"],9:["#b9bfc5","#89939e","#647483"],10:["#d8f3f0","#8db8bf","#69a7ae"],11:["#a0aaa9","#7b8486","#69777a"],12:["#ffe3a2","#eeb756","#bf893c"],21:["#eac98f","#a97651","#755040"],22:["#e2ac58","#aa793c","#876137"],23:["#9fc6bd","#689a96","#536f79"],25:["#c2fff1","#6dc7c7","#5aafaf"],26:["#a1c8c1","#668c89","#4e7176"],27:["#66d6a9","#338775","#266259"],28:["#7fc9ee","#4e88b8","#325e96"],29:["#d897e5","#9a67ad","#765183"]};if(r[i]){const o=r[i];s(o[1],[[2,9],[16,16],[16,31],[2,24]]),s(o[2],[[16,16],[30,9],[30,24],[16,31]]),s(o[0],[[2,9],[16,2],[30,9],[16,16]]);const c=(l,h,u,f,d)=>{n.strokeStyle=l,n.lineWidth=1.2,n.beginPath(),n.moveTo(h,u),n.lineTo(f,d),n.stroke()};if(i>=27&&i<=29)for(let l=0;l<i-26;l++){const h=14+l*4;s("#fff4c8",[[6,h+3],[9,h],[12,h+3],[12,h+5],[9,h+3],[6,h+5]])}if((i===22||i===21)&&(c("#573b34",3,15,16,22),c("#543c34",16,22,29,15),n.fillStyle="#ffe2a0",n.fillRect(9,16,3,5)),[23,25,26].includes(i)&&s("#c7fff1",[[6,15],[9,14],[12,20],[9,23]]),i===1&&(s("#6b9e4c",[[2,9],[16,16],[16,19],[11,17],[10,19],[8,15],[6,16],[2,13]]),s("#598340",[[16,16],[30,9],[30,12],[26,15],[23,15],[21,18],[16,19]])),[7,9,12].includes(i)){for(const l of[14,19])c("#533f3970",2,l,16,l+7),c("#493c4266",16,l+7,30,l);i===9&&(c("#56646b",8,12,8,17),c("#53616c",12,19,12,24))}else if(i===5){for(const l of[5,9,13])c("#5e422f",l,10+(l-2)/2,l,23+(l-2)/2);s("#99784c",[[8,9],[16,5],[24,9],[16,13]]),s("#d2ab76",[[11,9],[16,7],[21,9],[16,11]])}else if(i===10)c("#e0ffff",4,13,9,22),c("#c3eeee",18,17,22,23);else{n.fillStyle=i===11?"#35434a":"#ffffff38";for(const[l,h]of[[5,13],[9,19],[12,16],[19,21],[25,15],[16,7]])n.fillRect(l,h,i===11?3:2,i===11?3:1)}}else if(i===30)s("#9d6642",[[3,12],[16,5],[16,24],[3,29]]),s("#c88946",[[3,12],[16,5],[29,12],[16,28],[3,29]]),s("#f5ca70",[[3,12],[16,5],[29,12],[16,28]]),s("#e5f2ca",[[5,12],[9,10],[19,25],[16,28]]),s("#e5f2ca",[[14,6],[16,5],[29,12],[27,15]]);else if(i===24)s("#438c9a",[[7,16],[17,2],[25,13],[17,30],[10,26]]),s("#a6fff0",[[7,16],[17,2],[15,18],[10,26]]),s("#74ddd4",[[15,18],[17,2],[23,13]]);else if(i===15)s("#25323d",[[4,17],[9,8],[20,5],[28,12],[25,23],[14,27],[6,24]]),s("#53626c",[[5,16],[11,9],[20,7],[18,14],[10,20]]),s("#36454d",[[12,23],[19,16],[25,14],[24,21],[15,25]]);else if(s("#754e34",[[5,27],[8,29],[25,8],[22,5]]),s("#ca965f",[[5,25],[7,27],[24,6],[22,4]]),i>=17){const o=i===18||i===20,c=o?"#c3ccd0":"#e5c195",l=o?"#869398":"#b78a59";i<=18?(s(l,[[11,4],[17,3],[26,10],[29,16],[27,17],[23,12],[16,7],[10,7]]),s(c,[[9,4],[16,2],[23,5],[27,10],[25,12],[21,8],[15,5],[9,6]])):(s(l,[[17,5],[23,6],[28,10],[26,17],[19,17],[15,12]]),s(c,[[15,4],[22,4],[27,8],[24,14],[19,15],[13,10]]))}const a=e.toDataURL();return uu.set(i,a),a}function ir(i){return'<img class="stamp" src="'+Hx(i)+'" alt="" draggable="false">'}class Vx{constructor(t){this.send=t;const e=new URL(location.href),n=e.pathname.indexOf("/webcraft777/");this.portal=n<0?"../index.html":e.pathname.slice(0,n+1)+"index.html",Ft("game").style.setProperty("--cover",'url("'+new URL("./art/panorama.webp",document.baseURI).href+'")'),Ft("game").addEventListener("click",s=>this.click(s)),this.panel.addEventListener("submit",s=>this.submit(s)),this.panel.addEventListener("change",s=>this.change(s)),this.panel.addEventListener("input",s=>this.settingOutput(s.target)),Ft("fallback").addEventListener("keydown",s=>{s.target.closest("[data-hold]")&&["Enter"," "].includes(s.key)&&(s.preventDefault(),this.startMining())}),Ft("fallback").addEventListener("keyup",()=>this.stopMining()),Ft("view-mode").addEventListener("keydown",s=>{s.code==="Space"&&s.stopPropagation()})}send;screen="title";panel=Ft("overlay");guideSeen=!1;guideTimer=0;inventoryState=null;noticeTimer=0;saveTimer=0;holding=!1;worldName="";kidsView=!1;room=null;onlineDraft={name:"みんなの建築ワールド",seed:"",nickname:"",code:"",mode:"creative"};portal;startMining(){this.holding||(this.holding=!0,this.send("mine-down"))}stopMining(){this.holding&&(this.holding=!1,this.send("mine-up"))}show(t,e,n=!1){this.stopMining(),window.clearTimeout(this.guideTimer);const s=["pause","ready","inventory","diagnostics"].includes(t)||["settings","help"].includes(t)&&!Ft("game").classList.contains("home");["title","create","worlds","online","error"].includes(t)?Ft("game").classList.add("home"):s&&Ft("game").classList.remove("home"),this.screen=t,Ft("game").dataset.screen=t,this.panel.hidden=!1,this.panel.className="overlay "+(t==="title"?"title-overlay":"panel-overlay"),this.panel.innerHTML=t==="title"?e:'<div class="panel'+(n?" wide":"")+'">'+e+"</div>",Ft("hud").hidden=!0,Ft("debug").hidden=!0,this.mining(0),this.panel.scrollTop=0}click(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(n==="view-mode"&&e.id==="view-mode"&&t.detail>0&&Ft("scene").focus({preventScroll:!0}),n==="select"){this.send(n,Number(e.dataset.slot));return}const s=Number(e.dataset.index),r=e.dataset.side??"bag";if(n==="assign"){if(t.shiftKey&&(this.inventoryState?.mode==="explore"||this.inventoryState?.chest)){const a=this.inventoryState.chest!==void 0;this.send(a?"transfer":"split",{side:r,index:s,half:!1})}else this.send(n,{id:Number(e.dataset.id),slot:this.inventoryState?.selected??0});return}if(["split","sort","transfer","transfer-all"].includes(n)){this.send(n,{index:s,side:r,half:e.dataset.half==="yes"});return}if(n==="supply"){this.send(n,{id:Number(e.dataset.id),count:t.shiftKey?64:1});return}if(n==="craft"){this.send(n,{id:e.dataset.id,count:Number(e.dataset.count??1)});return}if(["load","export","original","preset"].includes(n)){this.send(n,e.dataset.id);return}if(n==="dismiss-guide"){Ft("guide").hidden=!0,this.guideSeen=!0,this.send(n);return}this.send(n)}submit(t){t.preventDefault();const e=t.target;if(e.id==="online-create-form"||e.id==="online-join-form"){const o=new FormData(e),c=String(o.get("nickname")??"").trim();if(this.onlineDraft.nickname=c,!c){this.toast("プレイヤー名を入力してください。"),e.querySelector("input")?.focus();return}if(e.id==="online-create-form"){const l=String(o.get("name")??"").trim(),h=String(o.get("seed")??"").trim(),u=o.get("mode"),f=u==="tag"||u==="explore"?u:"creative";if(Object.assign(this.onlineDraft,{name:l,seed:h,mode:f}),!l){this.toast("ワールド名を入力してください。"),e.querySelector('[name="name"]')?.focus();return}this.send("online-create",{name:l,seed:h,nickname:c,mode:f})}else{const l=String(o.get("code")??"").trim().toUpperCase();this.onlineDraft.code=l,this.send("online-join",{code:l,nickname:c})}return}if(e.id!=="world-form")return;const n=new FormData(e),s=String(n.get("name")??"").trim();if(!s){this.toast("ワールド名を入力してください。"),e.querySelector("input")?.focus();return}const r=n.get("stage"),a=Il(r)?r:"classic";this.send("start",{name:s,seed:String(n.get("seed")??"").trim(),mode:a!=="classic"||n.get("mode")==="creative"?"creative":"explore",stage:a})}change(t){const e=t.target;if(e.name==="stage"&&e.form?.id==="world-form"&&e.checked){const n=e.form,s=e.value!=="classic",r=n.querySelector('[name="mode"][value="explore"]'),a=n.querySelector('[name="mode"][value="creative"]');s&&r.checked&&(a.checked=!0),r.disabled=s,n.querySelector("#stage-mode-hint").hidden=!s;return}if(e.id==="world-import"){const n=e.files?.[0];n&&this.send("import",n),e.value="";return}if(e.closest("#setting-form")){const n=new FormData(Ft("setting-form"));this.send("settings-change",{distance:Number(n.get("distance")),scale:Number(n.get("scale")),shadows:n.has("shadows"),sensitivity:Number(n.get("sensitivity")),volume:Number(n.get("volume")),muted:n.has("muted"),quality:n.get("quality"),vegetation:n.has("vegetation"),effects:n.has("effects"),invertY:n.has("invertY"),bob:n.has("bob"),sprintFov:n.has("sprintFov"),ambientVolume:Number(n.get("ambientVolume")),effectsVolume:Number(n.get("effectsVolume"))})}}settingOutput(t){if(!(t instanceof HTMLInputElement)||t.type!=="range")return;const e=t.parentElement?.querySelector("output");e&&(e.textContent=this.valueLabel(t.name,Number(t.value)))}valueLabel(t,e){return t==="distance"?e+" チャンク":t==="sensitivity"?e.toFixed(1)+" 倍":Math.round(e*100)+"%"}setWorld(t){this.worldName=t}title(t){this.worldName="",this.onlineSession(null),this.tagMode(null);const e='<a class="portal" href="'+ye(this.portal)+'"><span aria-hidden="true">‹</span> TK777 ARCADE</a>';this.show("title",'<div class="title-stage">'+e+'<div class="title-main"><h1 aria-label="ウェブクラフト777"><span>ウェブクラフト</span><strong>777</strong></h1><div class="start-actions">'+be("goto-create",'<span>新しく始める</span><b aria-hidden="true">＋</b>',"primary")+be("goto-worlds",'<span>つづきから</span><b aria-hidden="true">›</b>')+be("online-menu","<span>マルチプレイ</span><small>最大6人</small>")+'</div><div class="title-sub">'+be("goto-settings","設定")+be("goto-help","操作説明")+"</div></div></div>"),this.panel.querySelector('[data-action="goto-worlds"]')?.setAttribute("title",t?"保存したワールドを開く":"ワールド一覧とバックアップの読み込み")}create(){const t=il.map(({id:e,name:n,detail:s,thumbnail:r})=>'<label class="stage-card"><input type="radio" name="stage" value="'+e+'"'+(e==="classic"?" checked":"")+'><img src="'+ye(new URL(r,document.baseURI).href)+'" width="560" height="315" alt="" draggable="false"><span><b>'+n+"</b><small>"+s+"</small></span></label>").join("");this.show("create",Li("ワールドを作る")+'<form id="world-form"><fieldset class="stage-picker"><legend>ステージ</legend><div class="stage-grid">'+t+'</div></fieldset><div class="stage-fields"><label class="entry">ワールド名<input name="name" value="はじまりの谷" required maxlength="64" autocomplete="off"></label><label class="entry">地形のシード<input name="seed" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label></div><fieldset><legend>ゲームモード</legend><div class="modes"><label><input type="radio" name="mode" value="explore" checked aria-describedby="stage-mode-hint"><span><b>探索</b><small>木や石を集め、道具と建材を作る。</small></span></label><label><input type="radio" name="mode" value="creative"><span><b>クリエイティブ</b><small>素材は無制限。空を飛んで建築する。</small></span></label></div><p id="stage-mode-hint" hidden>このステージではクリエイティブで遊べます。</p></fieldset><button type="submit" class="primary full">ワールドを作成</button></form>',!0)}onlineMenu(t="",e=""){t&&(this.onlineDraft.code=t.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8));const n=this.onlineDraft,s='<label class="entry">プレイヤー名<input name="nickname" value="'+ye(n.nickname)+'" placeholder="ワールド内に表示される名前" maxlength="24" required autocomplete="nickname"></label>',r=[["creative","建材を自由に使って建築する。"],["explore","素材を集めて道具や建材を作る。"],["tag","仲間と追いかけっこをする。"]].map(([c,l])=>'<label><input type="radio" name="mode" value="'+c+'"'+(n.mode===c?" checked":"")+"><span><b>"+(c==="tag"?"鬼ごっこ":$o(c))+"</b><small>"+l+"</small></span></label>").join(""),a='<form id="online-create-form" class="online-card" aria-labelledby="online-create-label"><h2 id="online-create-label">ルームを作る</h2>'+s+'<label class="entry">ワールド名<input name="name" value="'+ye(n.name)+'" required maxlength="64" autocomplete="off"></label><label class="entry"><span>地形のシード <small>任意</small></span><input name="seed" value="'+ye(n.seed)+'" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label><fieldset class="online-room-modes"><legend>ゲームモード</legend><div class="modes">'+r+'</div></fieldset><button type="submit" class="primary full">ルームを作成</button></form>',o='<form id="online-join-form" class="online-card" aria-labelledby="online-join-label"><h2 id="online-join-label">ルームに参加する</h2>'+s+'<label class="entry">ルームコード<input id="online-code" name="code" value="'+ye(n.code)+'" placeholder="8文字の英数字" minlength="8" maxlength="8" pattern="[A-Za-z0-9]{8}" title="8文字の英数字" required autocapitalize="characters" autocorrect="off" autocomplete="off" spellcheck="false"></label><button type="submit" class="full">ルームに参加</button></form>';this.show("online",Li("マルチプレイ")+'<p class="online-description">最大6人が同じワールドで遊べます。探索では持ち物を各自で管理し、掘った場所や設置した作業台は仲間と共有されます。</p>'+(e?'<p class="online-error" role="alert">'+ye(e)+"</p>":"")+'<div class="online-forms">'+(t?o+a:a+o)+"</div>",!0)}onlineSession(t){this.room=t;const e=Ft("online-hud"),n=t?t.state==="connecting"?"接続中":t.state==="reconnecting"?"再接続中":t.count+" / 6人":"";e.hidden=!t,Ft("game").toggleAttribute("data-online",!!t);const s=Ft("online-hud-code");s.textContent!==(t?.code??"")&&(s.textContent=t?.code??"");const r=Ft("online-hud-status");r.textContent!==n&&(r.textContent=n);const a=this.panel.querySelector("[data-online-status]");a&&a.textContent!==n&&(a.textContent=n)}tagMode(t){Ft("game").toggleAttribute("data-tag-play",!!t);const e=Ft("tag-status"),n=Ft("tag-map-toggle"),s=Ft("tag-map");e.hidden=n.hidden=!t,s.hidden=!t?.mapOpen,n.setAttribute("aria-pressed",String(!!t?.mapOpen)),e.toggleAttribute("data-it",!!t?.it);const r=Ft("tag-role"),a=Ft("tag-hint");r.textContent!==(t?.label??"")&&(r.textContent=t?.label??""),a.textContent!==(t?.hint??"")&&(a.textContent=t?.hint??"")}worlds(t){const e=t.map(n=>{const s=new Date(n.updatedAt),r=Number.isFinite(s.getTime())?s.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",a=ye(n.id),o=il.find(l=>l.id===(n.stage??"classic"))?.name,c=n.hasOriginal?'<button data-action="original" data-id="'+a+'">旧版の原本</button>':"";return"<li><div><strong>"+ye(n.name)+"</strong><small>"+[$o(n.mode),o,r].filter(Boolean).join("　")+'</small></div><div class="row-actions"><button class="primary" data-action="load" data-id="'+a+'">開く</button><button data-action="export" data-id="'+a+'">書き出す</button>'+c+"</div></li>"}).join("");this.show("worlds",Li("ワールド一覧")+(t.length?'<ul class="worlds">'+e+"</ul>":'<p class="empty">このブラウザーには保存したワールドがありません。</p>')+'<div class="actions">'+be("goto-create","新しく始める")+'<label class="file-btn">ファイルを読み込む<input id="world-import" type="file" accept=".json,application/json"></label></div>')}async confirmImport(t){const e=Ft("confirm-import");return Ft("confirm-body").textContent="保存済みの「"+t+"」を、読み込むファイルの状態で置き換えます。",e.returnValue="cancel",new Promise(n=>{e.addEventListener("close",()=>n(e.returnValue==="replace"),{once:!0}),e.showModal()})}loading(t){this.show("loading",'<div class="loading-mark" aria-hidden="true"></div><h1>読み込み中</h1><p role="status">'+ye(t)+"</p>")}error(t){this.show("error",Li("ゲームを開始できません")+'<p class="error-message">'+ye(t)+"</p>"+be("title","タイトルへ戻る","primary"))}pause(t=!1,e="lock",n=""){const s=this.room,r=Object.entries(hu).filter(([a])=>a!==e).map(([a,{label:o}])=>be("resume-"+a,o)).join("");this.show(t?"ready":"pause","<h1>"+(t?"ワールドの準備ができました":"一時停止")+"</h1>"+(n?'<p class="input-message" role="status">'+ye(n)+"</p>":"")+(s?'<div class="room-actions"><p>ルーム <strong>'+ye(s.code)+'</strong> <span data-online-status role="status"></span></p>'+be("online-copy","招待リンクをコピー")+"</div>":"")+'<div class="pause-actions">'+be("resume",t?"プレイ開始":"再開","primary")+'<p class="control-mode">操作方法　<strong>'+hu[e].name+"</strong></p>"+r+'<button type="button" data-action="view-mode" aria-label="オリジナルモードとキッズモードの切り替え" aria-pressed="false"></button>'+(t?"":(s?"":be("save","手動保存")+be("export","ファイルへ書き出す"))+be("goto-settings","設定")+be("goto-help","操作説明")+be("diagnostics","入力の診断・復旧"))+(s?be("online-leave","退出してタイトルへ","danger"):be("title","タイトルへ戻る"))+"</div>"),this.showViewMode(this.kidsView),s&&this.onlineSession(s)}diagnostics(t,e){this.show("diagnostics",Li("入力の診断・復旧")+'<p class="input-message">'+ye(t)+'</p><div class="pause-actions">'+be("reset-input","入力をリセット","primary")+be("export-diagnostics","診断をファイルに書き出す")+'</div><details class="input-trace"><summary>直近の入力記録</summary><pre>'+ye(e)+"</pre></details>")}play(t,e=!1,n=!1,s=!1){this.stopMining(),window.clearTimeout(this.guideTimer),this.screen="play",Ft("game").dataset.screen="play",Ft("game").dataset.playInput=n?"pending":t?"drag":"lock",Ft("game").classList.remove("home"),this.panel.hidden=!0,this.panel.replaceChildren(),Ft("hud").hidden=!1,Ft("fallback").hidden=!t;const r=Ft("guide");e&&(this.guideSeen=!1),r.hidden=!(e||t&&!this.guideSeen),r.innerHTML="<div><b>"+(s?"タッチ操作":t?"ドラッグ操作":"はじめの操作")+"</b>"+be("dismiss-guide","閉じる","guide-close")+"</div>"+(s?"<p>左下のスティックで移動し、景色をドラッグして見回します。</p><p>照準を合わせて画面をタップすると設置。「採掘」は長押しします。</p>":"<p><kbd>WASD</kbd> 移動　<kbd>Space</kbd> ジャンプ　<kbd>E</kbd> 持ち物</p><p>"+(t?"画面をドラッグして見回します。「採掘」は長押し、「設置」はクリック。":"左クリック長押しで採掘、右クリックで設置。")+"</p>"+(t?'<a href="'+ye(location.href)+'" target="_blank" rel="noopener">独立したタブで開く ↗</a>':"")),!t&&e&&(this.guideTimer=window.setTimeout(()=>{this.screen==="play"&&!r.hidden&&(r.hidden=!0,this.guideSeen=!0,this.send("dismiss-guide"))},1e4))}help(){this.show("help",Li("操作説明")+'<dl class="keylist">'+[["W / A / S / D","移動"],["マウス / 矢印キー","視点を変える"],["K / 画面上のモードボタン","オリジナルモードと見下ろし視点のキッズモードを切り替える"],["Space / Shift","ジャンプ・水中で浮上 ／ ダッシュ"],["左クリック長押し","照準のブロックを採掘"],["右クリック","手に持っているブロックを設置"],["1 ～ 9 / ホイール","ホットバーを切り替える"],["C 長押し","しゃがむ。足場の端で踏みとどまり、低い坑道を通れる"],["Q / 中クリック","照準の建材を選ぶ"],["R / 向きボタン","原木や滑り台パーツの向きを切り替える"],["右クリック / V","住民と話す、または作業台・チェストを開く。しゃがんで右クリックすると設備の隣に設置"],["左クリック / X","照準を合わせたサメを攻撃。タッチ操作では画面の「攻撃」ボタン"],["Ctrl + Z","クリエイティブの通常ブロックを最大20回戻す。作業台とチェストは対象外"],["B / G","現在地を拠点に登録 ／ 探索目標の表示切り替え"],["E","持ち物・クラフトを開閉"],["Esc","一時停止"],["F","クリエイティブで飛行を切り替える"],["Space / Ctrl","飛行中に上昇 ／ 下降"],["F3","FPS・描画回数・チャンク数を表示"]].map(([t,e])=>"<div><dt>"+t+"</dt><dd>"+e+"</dd></div>").join("")+"</dl><h2>タブレットモード</h2><p>一時停止画面の「タブレットモードでプレイ」から、PCでも画面のスティックやボタンを使えます。左下のスティックで移動し、景色をドラッグして見回します。照準を合わせて画面を短くタップすると、選択中のブロックを設置できます。右下のボタンからも設置・採掘・ジャンプ・しゃがみができます。クリエイティブでは「飛行」で切り替え、上昇・下降ボタンを長押しします。</p><h2>ジャンプ台と滑り台</h2><p>ジャンプ台に乗ると、小・中・大の高さに合わせて跳び上がります。滑り台は、下りたい方向に坂のパーツを1ブロックずつ低くしてつなぎ、高い方から乗ります。</p><h2>探索のはじめ方</h2><p>木の幹に近づいて採掘し、持ち物を開いて原木から木材と棒を作ります。木のツルハシで石を掘り、石の道具や建材を作りましょう。持ち物のアイコンを選ぶと、選択中のホットバー枠に登録できます。</p><h2>マルチプレイ</h2><p>ルームを作るときに遊び方を選び、ルームコードを仲間に知らせます。探索では持ち物はプレイヤーごとに管理され、掘った場所や建物、設置した作業台は仲間と共有されます。</p><h2>鬼ごっこ</h2><p>マルチプレイで「鬼ごっこ」を選び、仲間が参加したら、鬼は逃げ役を追いかけます。Mキーや画面上の「地図」で、地形とエリアごとの人数を確認できます。</p><h2>拠点と遠征</h2><p>木材4個で作業台、6個でチェストを作れます。床に置き、照準を合わせて右クリックで開きます。木の道具と灯晶ブロックを用意したら、拠点をBで登録して岩窟へ。潮晶を持ち帰ると、作業台で青緑色のランタンや象眼タイルを作れます。旧ワールドでは朝霧ガラスと石炭から潮晶を作れます。</p><h2>トラックパッドと視点操作</h2><p>Macでは、トラックパッドを押したまま指を動かすと見回せます。画面上の「採掘」「設置」を使います。クリックせずに見回したいときは、一時停止から「視点を固定してプレイ」を選んでください。</p><p>視点が動かなくなったら、Esc または「一時停止」から「入力の診断・復旧」を開きます。「入力をリセット」でドラッグ操作に戻れます。診断記録は端末に保存・書き出しできます。</p><h2>保存とバックアップ</h2><p>進行はこのブラウザーに自動保存されます。一時停止から手動保存もできます。ブラウザーのデータ削除前や別のPCに移すときは、タイトルの「つづきから」でワールドを「書き出す」を選びます。復元は同じ一覧の「ファイルを読み込む」から行えます。</p>")}showViewMode(t){this.kidsView=t;const e=t?"キッズモード":"オリジナルモード",n=Ft("view-mode");n.setAttribute("aria-pressed",String(t)),n.querySelector("span").textContent=e;const s=this.panel.querySelector('[data-action="view-mode"]');s&&(s.setAttribute("aria-pressed",String(t)),s.textContent="視点切替　現在は"+e)}expedition(t,e,n){const s=Ft("journey"),r=Ft("bearing");s.hidden=!t,s.textContent!==t&&(s.textContent=t);const a=[e,n].filter(Boolean).join("　·　");r.textContent!==a&&(r.textContent=a)}target(t){const e=Ft("target-hint");e.textContent!==t&&(e.textContent=t),e.hidden=!t||this.screen!=="play"}settings(t){const e=(s,r,a,o,c,l)=>'<label class="range"><span>'+r+"</span><output>"+this.valueLabel(s,a)+'</output><input type="range" name="'+s+'" min="'+o+'" max="'+c+'" step="'+l+'" value="'+a+'"></label>',n=(s,r,a)=>'<label class="check"><input type="checkbox" name="'+s+'" '+(a?"checked":"")+">"+r+"</label>";this.show("settings",Li("設定")+'<form id="setting-form"><fieldset><legend>画面</legend><input type="hidden" name="quality" value="'+t.quality+'"><div class="quality-presets">'+Object.entries({low:"低",standard:"標準",high:"高"}).map(([s,r])=>'<button type="button" data-action="preset" data-id="'+s+'" aria-pressed="'+(t.quality===s)+'">'+r+"</button>").join("")+"</div>"+(t.quality==="legacy"?"<p>旧版の描画倍率を使用中です。プリセットを選ぶと新しい画質に切り替わります。</p>":"")+e("distance","描画距離",t.distance,2,6,1)+e("scale","解像度倍率",t.scale,.5,1.5,.05)+n("shadows","影を表示する",t.shadows)+"</fieldset><fieldset><legend>景色と動き</legend>"+n("vegetation","草花を表示する",t.vegetation)+n("effects","水面・葉の追加演出",t.effects)+n("bob","歩行時に視点を揺らす",t.bob)+n("sprintFov","ダッシュ時に視野を広げる",t.sprintFov)+"</fieldset><fieldset><legend>操作と音</legend>"+n("invertY","マウスの上下を反転する",t.invertY)+e("effectsVolume","効果音",t.effectsVolume,0,1,.05)+e("ambientVolume","環境音",t.ambientVolume,0,1,.05)+e("sensitivity","マウス感度",t.sensitivity,.3,2.5,.1)+e("volume","主音量",t.volume,0,1,.05)+n("muted","ミュート",t.muted)+"</fieldset></form>")}slots(t){return t.bar.map((e,n)=>'<button class="slot'+(t.selected===n?" selected":"")+'" data-action="select" data-slot="'+n+'" aria-pressed="'+(t.selected===n)+'" aria-label="'+(n+1)+"番 "+ye(e?.name??"空き")+'"><small>'+(n+1)+"</small>"+(e?ir(e.id)+"<em>"+Jo(e.count)+"</em>"+this.wear(e):"")+"</button>").join("")}wear(t){return t.durability!==void 0&&t.maxDurability?'<i class="wear" title="耐久 '+t.durability+" / "+t.maxDurability+'"><b style="width:'+Math.min(100,100*t.durability/t.maxDurability)+'%"></b></i>':""}hud(t){this.inventoryState=t;const e=t.bar[t.selected];Ft("hud-bar").innerHTML=this.slots(t);const n=Ft("game").hasAttribute("data-tag-play")?"鬼ごっこ":$o(t.mode);Ft("mode-tag").textContent=(this.worldName?this.worldName+"　／　":"")+n,Ft("equipped").textContent=e?e.name+"　"+Jo(e.count)+(e.durability!==void 0?"　耐久 "+e.durability+"/"+e.maxDurability:""):"素手"}inventory(t){const e=this.screen==="inventory",s=(e?this.panel.querySelector(".panel"):null)?.scrollTop??0,r=document.activeElement,a=e&&r?.dataset.action?Object.entries(r.dataset):null,o=!!this.panel.querySelector("details[open]");this.inventoryState=t;const c=p=>'<div class="storage-tools"><button data-action="sort" data-side="'+p+'">整理</button>'+(t.chest?'<button data-action="transfer-all" data-side="'+p+'">'+(p==="bag"?"すべて預ける":"すべて取り出す")+"</button>":"")+"</div>",l=(p,m)=>{const b=' data-index="'+p+'" data-side="'+m+'"';return'<div class="stack-actions">'+(t.chest?'<button data-action="transfer"'+b+">"+(m==="bag"?"預ける":"取る")+'</button><button data-action="transfer" data-half="yes"'+b+">半分</button>":'<button data-action="split"'+b+">分割</button>")+"</div>"},h=t.chest?"チェスト":t.benchUses!==void 0?"作業台":t.mode==="creative"?"ブロック一覧":"持ち物とクラフト",u=t.chest?"<section><h2>チェスト　"+t.chest.length+" / 27 枠</h2>"+c("chest")+(t.chest.length?'<div class="bag-grid">'+t.chest.map((p,m)=>'<div class="stack"><span>'+ir(p.id)+" "+ye(Qt[p.id].name)+" ×"+p.count+(p.durability?"　耐久 "+p.durability:"")+"</span>"+l(m,"chest")+"</div>").join("")+"</div>":'<p class="empty">まだ空です。所持品から預けられます。</p>')+"</section>":"",f=t.palette?'<details class="supply" '+(o?"open":"")+'><summary>建材を補充</summary><p>クリックで1個、Shift＋クリックで64個を所持品に加えます。</p><div class="bag-grid">'+t.palette.map(p=>'<button class="bag-item" data-action="supply" data-id="'+p.id+'">'+ir(p.id)+ye(p.name)+"</button>").join("")+"</div></details>":"",d=t.items.map((p,m)=>'<div class="stack"><button class="bag-item" type="button" data-index="'+m+'" data-action="assign" data-id="'+p.id+'">'+ir(p.id)+"<b>"+ye(p.name)+"</b><small>"+(p.durability!==void 0?"耐久 "+p.durability+"/"+p.maxDurability:"× "+Jo(p.count))+"</small>"+(fu[p.id]?"<small>"+fu[p.id]+"</small>":"")+this.wear(p)+"</button>"+(t.mode==="explore"||t.chest?l(m,"bag"):"")+"</div>").join(""),g=t.recipes.map(p=>"<li>"+ir(p.itemId)+"<div><strong>"+ye(p.outputs)+"</strong><small>"+ye(p.ingredients)+"</small><small>"+p.equipment+"　"+(p.reason||(p.craftable?"制作可能 "+p.craftable+" 回":"所持品に空きがありません。"))+'</small></div><div class="craft-actions"><button data-action="craft" data-id="'+p.id+'" '+(p.craftable<1?"disabled":"")+">作る</button>"+(p.craftable>1?'<button data-action="craft" data-id="'+p.id+'" data-count="'+p.craftable+'">まとめて ×'+p.craftable+"</button>":"")+"</div></li>").join("");this.show("inventory",'<header class="panel-head"><h1>'+h+"</h1>"+be("back","閉じる <kbd>E</kbd>","back")+'</header><div class="inventory-bar"><h2>ホットバー</h2><div class="hotbar">'+this.slots(t)+"</div><p>数字1〜9かクリックで枠を選び、アイコンを押すと登録。"+(t.mode==="explore"?" Shift＋クリックで"+(t.chest?"移動":"分割")+"。":"")+(t.benchUses!==void 0?"　この作業台で制作 "+t.benchUses+" 回":"")+"</p></div>"+f+'<div class="inventory-columns'+(t.mode==="creative"&&!t.chest?" palette":"")+'"><section><h2>'+(t.mode==="creative"&&!t.chest?"建築ブロック":"所持品")+"</h2>"+(t.mode==="explore"||t.chest?c("bag"):"")+(d?'<div class="bag-grid">'+d+"</div>":'<p class="empty">'+(t.palette?"「建材を補充」を開くと、ここに素材を用意できます。":"まだ何も持っていません。木や土を採掘して集めましょう。")+"</p>")+"</section>"+(u||(t.mode==="creative"?"":'<section><h2>クラフト</h2><p class="ingredient-key">材料は所持数 / 必要数で表示します。</p><ul class="recipes">'+g+"</ul></section>"))+"</div>",!0);const _=this.panel.querySelector(".panel");_&&(_.scrollTop=s),a&&Array.from(this.panel.querySelectorAll("[data-action]")).find(p=>a.every(([m,b])=>p.dataset[m]===b))?.focus({preventScroll:!0})}mining(t){const e=Ft("mine-meter"),n=Math.round(Math.max(0,Math.min(1,Number.isFinite(t)?t:0))*100);e.hidden=n===0||this.screen!=="play",e.dataset.percent!==String(n)&&(e.dataset.percent=String(n),e.setAttribute("aria-valuenow",String(n)),e.style.setProperty("--progress",n+"%"))}debug(t){const e=Ft("debug");e.hidden=!t||this.screen!=="play",e.textContent!==t&&(e.textContent=t)}toast(t){const e=Ft("notice");e.textContent=t,e.hidden=!t,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{e.hidden=!0},2e3)}status(t){const e=Ft("save-status");e.textContent=t,e.hidden=!t,window.clearTimeout(this.saveTimer),!t.includes("中")&&!/失敗|できません/.test(t)&&(this.saveTimer=window.setTimeout(()=>{e.hidden=!0},3500))}}const Qo=192;class Gx{samples=[];cursor=0;nextLook=0;nextFrame=0;nextIssue=0;frames=0;moves=0;faults=0;lastIssue="";detailed=!1;enable(t){this.detailed=t}add(t,e,n,s={},r=!1){const a=performance.now();if(r&&(this.faults++,this.lastIssue=String(s.reason??e),e==="look-limited"||e==="discontinuity")){if(a<this.nextIssue)return;this.nextIssue=a+65}if(e==="look"){if(this.moves++,a<this.nextLook)return;this.nextLook=a+(this.detailed?12:65)}if(e==="frame"){if(this.frames++,a<this.nextFrame)return;this.nextFrame=a+(this.detailed?100:500)}this.samples[this.cursor]={timeMs:Math.round(a),mode:t,event:e,lock:n,...s},this.cursor=(this.cursor+1)%Qo}report(){const t=this.samples.length<Qo?this.samples.slice():[...this.samples.slice(this.cursor),...this.samples.slice(0,this.cursor)];return{game:"ウェブクラフト777",generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,viewport:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio||1,embedded:window.self!==window.top,capacity:Qo,frames:this.frames,lookEvents:this.moves,anomalies:this.faults,lastIssue:this.lastIssue,events:t}}}const tc=Math.PI*2;function ec(i){const t=i%tc;return t>Math.PI?t-tc:t<-Math.PI?t+tc:t}function nc(i){return Math.max(-1.55,Math.min(1.55,i))}function du(i,t,e){return i==="lock"||i==="drag"||i==="tablet"?i:t==="lock"?"lock":t==="drag"?e.touch?"tablet":"drag":e.coarse?"tablet":e.mac?"drag":"lock"}const Wx=new Set(["KeyW","KeyA","KeyS","KeyD","KeyC","Space","ShiftLeft","ShiftRight","ControlLeft","ControlRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),pu=2*Math.PI/3,mu=9,Xx=360,gu=()=>Math.max(1024,window.screen?.width||0,window.screen?.height||0,window.innerWidth||0,window.innerHeight||0);class qx{constructor(t,e,n){if(this.canvas=t,this.controls=e,document.addEventListener("pointerlockchange",()=>this.reconcileLock()),document.addEventListener("pointerlockerror",()=>{this.hasRequestPromise||this.fallback("pointerlockerror")}),document.addEventListener("mousemove",s=>{if(this.mode==="locked"){if(!this.ownsLock()){this.reconcileLock();return}this.checkButtons(s),this.look(s.movementX,s.movementY)}}),t.addEventListener("contextmenu",s=>{this.active&&s.preventDefault()}),t.addEventListener("auxclick",s=>{this.active&&s.button===1&&s.preventDefault()}),t.addEventListener("pointerdown",s=>this.startView(s)),t.addEventListener("pointermove",s=>this.movePointer(s)),t.addEventListener("lostpointercapture",s=>this.release(s)),document.addEventListener("pointerdown",s=>{const r=s.target?.closest?.('[data-hold="mine"]');!this.drag||!r||r.disabled||s.button!==0||(s.pointerType!=="mouse"&&s.preventDefault(),this.grab(s,r,"mine")&&(this.mining=!0,this.controls.beginMine()))}),document.addEventListener("pointermove",s=>{s.target!==t&&this.movePointer(s)}),document.addEventListener("lostpointercapture",s=>this.release(s)),window.addEventListener("pointerup",s=>this.release(s)),window.addEventListener("pointercancel",s=>this.release(s)),window.addEventListener("mouseup",s=>{s.button===0&&this.dropMouseContact()}),t.addEventListener("wheel",s=>this.wheel(s),{passive:!1}),window.addEventListener("keydown",s=>this.keydown(s)),window.addEventListener("keyup",s=>this.keys.delete(s.code)),window.addEventListener("blur",()=>this.interrupt("blur")),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.interrupt("hidden"),this.controls.background())}),n){this.bindTouch(n.stick,"stick"),this.bindTouch(n.jump,"jump"),this.bindTouch(n.down,"down");const s=()=>{this.drag&&this.reset()};window.addEventListener("orientationchange",s),window.screen?.orientation?.addEventListener?.("change",s)}}canvas;controls;keys=new Set;mining=!1;mode="idle";get pending(){return this.mode==="pending"}get active(){return this.pending||this.mode==="locked"||this.mode==="drag"}get drag(){return this.mode==="drag"}contacts=new Map;stickForward=0;stickRight=0;ticket=0;hasRequestPromise=!1;jumpEdge=!1;touchJumpEdge=!1;wheelSum=0;lastWheel=-1/0;nextWheel=-1/0;yaw=0;pitch=0;sensitivity=1;trace=new Gx;ownsLock(){return document.pointerLockElement===this.canvas}record(t,e={},n=!1){this.trace.add(this.mode,t,this.ownsLock(),e,n)}setDiagnostics(t){this.trace.enable(t)}report(){return{...this.trace.report(),mode:this.mode,pointerLock:this.ownsLock(),sensitivity:this.sensitivity,yaw:this.yaw,pitch:this.pitch}}rememberView(t){Number.isFinite(t.yaw)&&Number.isFinite(t.pitch)&&(this.yaw=ec(t.yaw),this.pitch=nc(t.pitch)),t.yaw=this.yaw,t.pitch=this.pitch}restoreAngles(t){t.yaw=this.yaw,t.pitch=this.pitch}applyLook(t,e,n,s,r=!1){if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(s)||s<=0||!Number.isFinite(e)||!Number.isFinite(n)){this.restoreAngles(t),this.fail("視点または感度に無効な数値が届きました。");return}this.sensitivity=s;let a=.00235*s;const o=Math.hypot(e,n),c=o*a;this.mode==="locked"&&c>pu&&o>gu()&&(a*=pu/c,this.record("look-limited",{dx:e,dy:n,reason:"単発の大きな視点移動を抑えました。"},!0));const l=ec(t.yaw-e*a),h=nc(t.pitch+(r?1:-1)*n*a);if(!Number.isFinite(l)||!Number.isFinite(h)){this.restoreAngles(t),this.fail("視点の計算を復旧しました。");return}t.yaw=this.yaw=l,t.pitch=this.pitch=h}frame(t,e){if(this.mode==="locked"&&!this.ownsLock())return this.reconcileLock(),!1;if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(e))return this.restoreAngles(t),this.fail("前回の正常な視点に戻しました。"),!1;if(!this.active)return!1;const n=Math.min(.1,Math.max(0,e));return t.yaw=this.yaw=ec(t.yaw+(Number(this.keys.has("ArrowLeft"))-Number(this.keys.has("ArrowRight")))*n*1.65),t.pitch=this.pitch=nc(t.pitch+(Number(this.keys.has("ArrowUp"))-Number(this.keys.has("ArrowDown")))*n*1.3),this.record("frame",{yaw:this.yaw,pitch:this.pitch,frameMs:Math.round(e*1e4)/10}),!0}fail(t){const e=typeof t=="string"?t:"ゲーム処理を中断しました。";this.record("recovery",{reason:e},!0),this.active&&this.controls.pause(),this.active&&this.stop(),this.controls.recovery?.("操作を中断しました。「再開」でドラッグ操作に切り替わります。")}look(t,e){if(!Number.isFinite(t)||!Number.isFinite(e)){this.fail("ブラウザーから無効な視点移動量が届きました。");return}if(!t&&!e)return;const n=gu();if(Math.abs(t)>n*16||Math.abs(e)>n*16){this.record("discontinuity",{reason:"単一イベントの不連続な移動量を除外しました。"},!0);return}this.controls.look(t,e),this.record("look",{dx:t,dy:e,yaw:this.yaw,pitch:this.pitch})}change(t){this.reset(),this.mode=t,this.record("mode")}interrupt(t){this.record(t),this.active&&this.controls.pause(),this.active?this.stop():this.reset()}reconcileLock(){if(this.ownsLock()){if(this.mode==="locked")return;if(!this.pending){document.exitPointerLock();return}this.change("locked"),this.controls.dragChanged(!1)}else this.mode==="locked"&&(this.interrupt("lock-lost"),this.controls.recovery?.("マウス固定が解除されました。「再開」でドラッグ操作に切り替わります。"))}fallback(t){if(this.pending){if(this.ownsLock()){this.reconcileLock();return}this.change("drag"),this.record("fallback",{reason:t}),this.controls.dragChanged(!0)}}start(t){if(!t&&(this.pending||this.mode==="locked"&&this.ownsLock()))return;this.stop();const e=++this.ticket;if(this.hasRequestPromise=!1,this.change(t?"drag":"pending"),this.canvas.focus({preventScroll:!0}),t){this.controls.dragChanged(!0);return}if(!this.canvas.requestPointerLock){this.fallback("unsupported");return}try{const n=this.canvas.requestPointerLock();n&&typeof n.then=="function"&&(this.hasRequestPromise=!0,n.then(()=>{e===this.ticket&&this.ownsLock()&&this.reconcileLock()},()=>{e===this.ticket&&this.fallback("rejected")}))}catch{this.fallback("sync-error")}window.setTimeout(()=>{e===this.ticket&&this.fallback("timeout")},750)}stop(){this.ticket++,this.change("paused"),this.ownsLock()&&document.exitPointerLock()}reset(){this.keys.clear();for(const t of this.contacts.values())this.dropContact(t);this.mining=!1,this.jumpEdge=!1,this.touchJumpEdge=!1,this.wheelSum=0,this.nextWheel=this.lastWheel=-1/0}cancelPlacementTap(){const t=this.findRole("look");t&&(t.tapStartedAt=void 0)}startView(t){if(!this.active||this.pending)return;if(this.mode==="locked"&&!this.ownsLock()){this.reconcileLock();return}if(t.pointerType!=="mouse"&&t.preventDefault(),t.button===2){this.controls.place();return}if(t.button===1){this.controls.pick?.();return}if(t.button!==0)return;if(this.mode==="locked"){if(!this.grab(t,this.canvas,"mine",!1))return;this.mining=!0,this.controls.beginMine();return}const e=this.grab(t,this.canvas,"look");e&&t.pointerType==="touch"&&(e.tapStartedAt=t.timeStamp)}findRole(t){for(const e of this.contacts.values())if(e.role===t)return e}grab(t,e,n,s=!0){if(this.contacts.has(t.pointerId)||this.findRole(n))return;const r={id:t.pointerId,element:e,role:n,pointerType:t.pointerType||"mouse",x:t.clientX,y:t.clientY};this.contacts.set(t.pointerId,r);try{s&&e.setPointerCapture?.(t.pointerId)}catch{this.contacts.delete(t.pointerId);return}return r}bindTouch(t,e){t.addEventListener("contextmenu",n=>n.preventDefault()),e==="jump"&&t.addEventListener("click",n=>{this.drag&&n.detail===0&&(this.touchJumpEdge=!0)}),t.addEventListener("pointerdown",n=>{!this.drag||n.button!==0||!this.grab(n,t,e)||(n.preventDefault(),t.dataset.held="",e==="stick"&&this.updateStick(t,n.clientX,n.clientY),e==="jump"&&(this.touchJumpEdge=!0))})}updateStick(t,e,n){const s=t.getBoundingClientRect(),r=Math.min(s.width,s.height)*.29,a=e-(s.left+s.width/2),o=n-(s.top+s.height/2),c=Math.hypot(a,o);if(!(r>0)||!Number.isFinite(c))return;const l=Math.min(1,r/(c||1));t.style.setProperty("--stick-x",a*l+"px"),t.style.setProperty("--stick-y",o*l+"px");const h=Math.max(0,(Math.min(1,c/r)-.16)/.84)/(c||1);this.stickForward=-o*h||0,this.stickRight=a*h||0}dropMouseContact(){for(const t of this.contacts.values())t.pointerType==="mouse"&&this.dropContact(t)}checkButtons(t){Number.isInteger(t.buttons)&&!(t.buttons&1)&&this.dropMouseContact()}movePointer(t){const e=this.contacts.get(t.pointerId);if(!this.drag||!e)return;if(e.pointerType==="mouse"&&Number.isInteger(t.buttons)&&!(t.buttons&1)){this.dropContact(e);return}if(e.role==="stick"){this.updateStick(e.element,t.clientX,t.clientY);return}if(e.role!=="look")return;const n=t.clientX-e.x,s=t.clientY-e.y;if(e.tapStartedAt!==void 0){if(Math.hypot(n,s)<=mu)return;e.tapStartedAt=void 0}e.x=t.clientX,e.y=t.clientY,this.look(n,s)}dropContact(t){this.contacts.delete(t.id),t.role==="mine"&&(this.mining=!1),t.role==="stick"&&(this.stickForward=this.stickRight=0,t.element.style.removeProperty("--stick-x"),t.element.style.removeProperty("--stick-y")),(t.role==="stick"||t.role==="jump"||t.role==="down")&&delete t.element.dataset.held;try{t.element.hasPointerCapture?.(t.id)&&t.element.releasePointerCapture(t.id)}catch{}}release(t){const e=this.contacts.get(t.pointerId);if(!e||t.type==="lostpointercapture"&&t.target!==e.element&&e.element.isConnected!==!1||t.type==="pointerup"&&e.pointerType==="mouse"&&(Number.isInteger(t.buttons)?t.buttons&1:t.button>0))return;e.role==="jump"&&t.type!=="pointerup"&&(this.touchJumpEdge=!1);const n=t.timeStamp-(e.tapStartedAt??1/0),s=this.drag&&t.type==="pointerup"&&n>=0&&n<=Xx&&Math.hypot(t.clientX-e.x,t.clientY-e.y)<=mu&&document.elementFromPoint(t.clientX,t.clientY)===this.canvas;this.dropContact(e),s&&this.controls.place()}wheel(t){if(!this.active||(t.preventDefault(),this.pending||t.ctrlKey||t.metaKey))return;const e=t.deltaMode,n=t.deltaX,s=t.deltaY;if(!Number.isFinite(s)||!s||Math.abs(n)>Math.abs(s))return;const r=performance.now();(r-this.lastWheel>220||Math.sign(s)!==Math.sign(this.wheelSum))&&(this.wheelSum=0),this.lastWheel=r,!(r<this.nextWheel)&&(this.wheelSum+=s*(e===1?16:e===2?Math.max(window.innerHeight||0,100):1),!(Math.abs(this.wheelSum)<48)&&(this.controls.cycle(Math.sign(this.wheelSum)),this.wheelSum=0,this.nextWheel=r+120,this.record("wheel-step")))}keydown(t){if(!this.active||t.defaultPrevented)return;if(t.code==="KeyZ"&&(t.ctrlKey||t.metaKey)&&!t.altKey&&!t.shiftKey){t.preventDefault(),t.repeat||this.controls.undo?.();return}if(t.altKey||t.metaKey||t.ctrlKey&&!t.code.startsWith("Control")&&!this.keys.has("ControlLeft")&&!this.keys.has("ControlRight"))return;if(Wx.has(t.code)){t.preventDefault(),!t.repeat&&!this.keys.has(t.code)&&t.code==="Space"&&(this.jumpEdge=!0),t.repeat||this.keys.add(t.code);return}const e=/^Digit([1-9])$/.exec(t.code);if(!(!["Escape","KeyE","KeyF","F3","KeyQ","KeyR","KeyB","KeyG","KeyV","KeyK","KeyX","KeyM"].includes(t.code)&&!e)&&(t.preventDefault(),!t.repeat))if(e)this.controls.select(Number(e[1])-1);else switch(t.code){case"Escape":this.controls.pause();break;case"KeyE":this.controls.inventory();break;case"KeyF":this.controls.fly();break;case"KeyQ":this.controls.pick?.();break;case"KeyR":this.controls.rotate?.();break;case"KeyB":this.controls.home?.();break;case"KeyG":this.controls.guide?.();break;case"KeyV":this.controls.interact?.();break;case"KeyK":this.controls.viewMode?.();break;case"KeyX":this.controls.attack?.();break;case"KeyM":this.controls.tagMap?.();break;default:this.controls.debug()}}movement(){const t=this.keys,e=this.jumpEdge||this.touchJumpEdge;this.jumpEdge=this.touchJumpEdge=!1;const n=Number(t.has("KeyW"))-Number(t.has("KeyS")),s=Number(t.has("KeyD"))-Number(t.has("KeyA")),r=!!(n||s);return{forward:r?n:this.stickForward,right:r?s:this.stickRight,jump:t.has("Space")||!!this.findRole("jump"),jumpPressed:e,sprint:t.has("ShiftLeft")||t.has("ShiftRight"),down:t.has("KeyC")||t.has("ControlLeft")||t.has("ControlRight")||!!this.findRole("down")}}}const ic=i=>Math.max(0,Math.min(1,i)),Yx=["meadow","forest","shore","cave"];function jx(i,t){const e=Math.floor(t.x),n=Math.floor(t.y),s=Math.floor(t.z);if(t.inWater)return"shore";let r=0,a=0,o=0;for(const c of[-3,0,3])for(const l of[-3,0,3]){let h=!1,u=!1,f=!1;for(let d=1;d<=8;d++){const g=i.get(e+c,n+d,s+l);g===6&&(u=!0),[2,3,4,8,9,11,14,23].includes(g)&&(h=!0)}for(let d=-3;d<=1;d++)i.get(e+c,n+d,s+l)===13&&(f=!0);r+=Number(h),a+=Number(u),o+=Number(f)}return r>=5?"cave":o>=2?"shore":a>=2?"forest":"meadow"}const ai={earth:{cut:960,pitch:85,width:1.05},stone:{cut:3200,pitch:181,width:.85},wood:{cut:1540,pitch:118,width:.95},sand:{cut:2400,pitch:72,width:1.3},foliage:{cut:3500,pitch:78,width:1.2},glass:{cut:5100,pitch:650,width:.74},water:{cut:1100,pitch:280,width:1.35}};function Kx(i){return i===4?ai.sand:i===6?ai.foliage:i===13?ai.water:[5,7,21,22].includes(i)?ai.wood:[10,12,23,25,26].includes(i)?ai.glass:[3,8,9,11,14].includes(i)?ai.stone:ai.earth}function Zx(i,t){const s=i.createBuffer(1,128e3,16e3),r=s.getChannelData(0);let a=0,o=0;for(let l=0;l<r.length;l++){const h=l/16e3,u=Math.random()*2-1;a+=.035*(u-a),o+=.16*(u-o);const f=h/8*Math.PI*2,d=.73+.19*Math.sin(f)+.08*Math.sin(f*3+.7);let g=a*d;if(t==="forest"){g+=o*d*.36;for(const _ of[1.1,1.33,5.4]){const p=h-_;p>0&&p<.22&&(g+=.073*Math.sin(Math.PI*p/.22)**2*Math.sin(2*Math.PI*(1600*p+1050*p*p)))}}else if(t==="shore")g=a*.65+o*(.24+.3*(.5+.5*Math.sin(2*f))**3);else if(t==="cave"){g=a*.26+.022*Math.sin(f*448);for(const _ of[1.7,4.8,5.08]){const p=h-_;p>0&&p<.34&&(g+=.06*Math.min(1,p*200)*Math.exp(-16*p)*Math.sin(2*Math.PI*(835*p-180*p*p)))}}r[l]=g}const c=160;for(let l=0;l<c;l++){const h=l/c,u=r.length-c+l;r[u]=r[u]*(1-h)+r[0]*h}return s}class $x{ctx;master;effects;ambient;noise;vol=.45;muted=!1;effectsLevel=1;ambientLevel=.55;playing=!1;activeVoices=new Set;ambienceCache=new Map;layers=new Map;area="meadow";sampleIn=0;configure(t,e,n=1,s=.55){this.vol=ic(t),this.muted=e,this.effectsLevel=ic(n),this.ambientLevel=ic(s);const r=this.ctx?.currentTime??0;this.master?.gain.setTargetAtTime(e?0:this.vol*.52,r,.025),this.effects?.gain.setTargetAtTime(this.effectsLevel,r,.025),this.ambient?.gain.setTargetAtTime(this.playing?this.ambientLevel*.7:0,r,.07)}unlock(){try{if(!this.ctx){const t=this.ctx=new AudioContext;this.master=t.createGain(),this.master.connect(t.destination),this.effects=t.createGain(),this.effects.connect(this.master),this.ambient=t.createGain(),this.ambient.gain.value=0,this.ambient.connect(this.master),this.noise=t.createBuffer(1,Math.ceil(t.sampleRate*.4),t.sampleRate);const e=this.noise.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1;this.configure(this.vol,this.muted,this.effectsLevel,this.ambientLevel)}this.ctx.resume().catch(()=>{})}catch{}}setPlaying(t){if(this.playing=t,this.sampleIn=0,!t){for(const n of this.activeVoices)try{n.stop()}catch{}this.activeVoices.clear();const e=this.ctx?.currentTime??0;for(const{gain:n,source:s}of this.layers.values())n.gain.cancelScheduledValues(e),n.gain.setTargetAtTime(0,e,.015),s.onended=()=>{s.disconnect(),n.disconnect()},s.stop(e+.09);this.layers.clear()}this.ctx&&this.ambient&&this.ambient.gain.setTargetAtTime(t?this.ambientLevel*.7:0,this.ctx.currentTime,.045)}environment(t,e,n){if(!this.playing||this.muted||!this.vol||!this.ambientLevel||this.ctx?.state!=="running"||!this.ambient||(this.sampleIn-=n,this.sampleIn>0))return;this.sampleIn=.36,this.area=jx(t,e);const s=this.ctx,r=s.currentTime;if(!this.layers.has(this.area)){const a=s.createBufferSource(),o=s.createGain();let c=this.ambienceCache.get(this.area);c||(c=Zx(s,this.area),this.ambienceCache.set(this.area,c)),a.buffer=c,a.loop=!0,o.gain.value=0,a.connect(o),o.connect(this.ambient),a.start(),this.layers.set(this.area,{source:a,gain:o})}for(const a of Yx)this.layers.get(a)?.gain.gain.setTargetAtTime(a===this.area?1:0,r,.32)}track(t,e){this.activeVoices.add(t),t.onended=()=>{this.activeVoices.delete(t),t.disconnect();for(const n of e)n.disconnect()}}sound(t,e=1){const n=this.ctx,s=this.effects;if(!n||!s||this.muted||!this.vol||!this.effectsLevel||n.state!=="running"||!this.playing&&t!=="craft")return;const r=t==="craft"?3:2;if(this.activeVoices.size+r>12)return;const a=.935+.13*Math.random(),o=(g,_,p,m,b,E=.81)=>{const M=n.createOscillator(),A=n.createGain(),T=n.currentTime+_;M.type=b,M.frequency.setValueAtTime(g,T),M.frequency.exponentialRampToValueAtTime(g*E,T+p),A.gain.setValueAtTime(1e-4,T),A.gain.linearRampToValueAtTime(m,T+.006),A.gain.exponentialRampToValueAtTime(1e-4,T+p),M.connect(A),A.connect(s),this.track(M,[A]),M.start(T),M.stop(T+p+.01)};if(t==="craft"){[440,554.37,740].forEach((g,_)=>o(g,_*.055,.15,.19,"sine",1));return}if(t==="pickup"){o(590,0,.09,.105,"sine",1.45);return}if(t==="break"){o(243*a,0,.13,.27,"triangle"),o(137,.08,.17,.23,"triangle");return}const c=Kx(e),l=(t==="step"?.095:t==="tap"?.075:t==="mine"?.17:.105)*c.width,h=n.createBufferSource(),u=n.createGain(),f=n.createBiquadFilter(),d=n.currentTime;h.buffer=this.noise,h.playbackRate.value=a,f.type="lowpass",f.frequency.value=c.cut*a,u.gain.setValueAtTime(1e-4,d),u.gain.linearRampToValueAtTime(t==="step"||t==="tap"?.15:.3,d+.004),u.gain.exponentialRampToValueAtTime(1e-4,d+l),h.connect(f),f.connect(u),u.connect(s),this.track(h,[f,u]),h.start(d,.06*Math.random()),h.stop(d+l),o(c.pitch*a*(t==="place"?1.17:1),0,l,t==="step"?.13:.21,c===ai.glass?"sine":"triangle")}}const Ni=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,sr=(i,t,e)=>Ni(i,t,e)&&Number.isInteger(i),sc=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),rc=(i,t)=>typeof i=="string"&&i.trim().length>0&&i.length<=t;function Jx(){try{return Yu(JSON.parse(localStorage.getItem("tk777.webcraft.settings")||"null"))}catch{}return{...qu}}function Qx(i){try{localStorage.setItem("tk777.webcraft.settings",JSON.stringify(i))}catch{}}function sl(i){if(!sc(i)||i.format!=="webcraft777")throw new Error("ウェブクラフト777のワールドファイルを選んでください。");const t=i.version===1&&i.generator===1;if(!t&&(i.version!==2||i.generator!==1&&i.generator!==2))throw new Error("この保存形式または地形バージョンには対応していません。");const e=i.stage===void 0?"classic":i.stage;if(!Il(e)||e!=="classic"&&(i.generator!==2||i.mode!=="creative")||i.sharkDefeated!==void 0&&typeof i.sharkDefeated!="boolean")throw new Error("ステージまたは生き物の保存情報が正しくありません。");if(t&&(!sc(i.settings)||!["distance","scale","shadows","sensitivity","volume","muted"].every(c=>Object.hasOwn(i.settings,c))))throw new Error("旧ワールドの設定が欠けています。元のバックアップを確認してください。");const n=t?Yu(i.settings):i.settings,s=t?Bu():i.fixtures,r=t?Vu():i.journey;if(!Hu(s)||!Gu(r))throw Error("設備または探検記録を読めません。元のバックアップを確認してください。");const a=i.pose;if(!rc(i.id,64)||!/^[a-zA-Z0-9-]+$/.test(i.id)||!rc(i.name,64)||!rc(i.seed,128)||i.mode!=="creative"&&i.mode!=="explore"||!sr(i.revision,0,Number.MAX_SAFE_INTEGER)||!sr(i.updatedAt,0,864e13)||!sc(a)||!Ni(a.x,0,256)||!Ni(a.z,0,256)||!Ni(a.y,-10,130)||!Ni(a.yaw,-1e7,1e7)||!Ni(a.pitch,-Math.PI/2,Math.PI/2)||!Ni(i.day,0,1)||typeof i.guideSeen!="boolean"||typeof i.flying!="boolean"||a.crouched!==void 0&&typeof a.crouched!="boolean"||!sr(i.selected,0,8)||!pl(n)||!hl(i.bag))throw new Error("ワールド情報・設定または所持品のデータが正しくありません。");if(t&&(i.bag.hotbar.some(c=>c>20)||i.bag.slots.some(c=>c.id>20)))throw new Error("旧ワールドの所持品に未対応の素材があります。");if(!Array.isArray(i.edits)||i.edits.length>256*256*95)throw new Error("ブロック変更のデータが正しくありません。");const o=new Map;for(const c of i.edits){if(!Array.isArray(c)||c.length!==2||!sr(c[0],65536,256*256*96-1)||!(t?sr(c[1],0,13):yr(c[1]))||o.has(c[0]))throw new Error("ブロック変更に範囲外または重複した座標があります。");o.set(c[0],c[1])}if(s.chests.some(([c])=>o.get(c)!==22)||s.benches.some(([c])=>o.get(c)!==21)||s.axes.some(([c])=>o.has(c)&&o.get(c)!==5))throw Error("設備と建築記録が一致しません。");return{...i,version:2,stage:e,settings:n,fixtures:s,journey:r}}function t1(i){let t;try{t=JSON.parse(i)}catch{throw new Error("ファイルを読めません。書き出したJSONファイルを選んでください。")}return{save:sl(t),original:t.version===1?t:void 0}}const e1=i=>JSON.stringify(i);class n1{constructor(t="tk777.webcraft777.v1"){this.database=t}database;connection;open(){return this.connection?this.connection:(this.connection=new Promise((t,e)=>{const n=indexedDB.open(this.database,2);n.onupgradeneeded=()=>{for(const s of["worlds","directory","originals"])n.result.objectStoreNames.contains(s)||n.result.createObjectStore(s,{keyPath:"id"})},n.onsuccess=()=>{n.result.onversionchange=()=>{n.result.close(),this.connection=void 0},t(n.result)},n.onerror=()=>e(n.error),n.onblocked=()=>e(new Error("ほかのタブのゲームを閉じてから、もう一度お試しください。"))}).catch(t=>{throw this.connection=void 0,t}),this.connection)}async list(){const t=await this.open();return new Promise((e,n)=>{const s=t.transaction(["directory","originals"]),r=s.objectStore("directory").getAll(),a=s.objectStore("originals").getAllKeys();s.oncomplete=()=>{const o=new Set(a.result);e(r.result.map(c=>({...c,hasOriginal:c.schemaVersion!==2||o.has(c.id)})).sort((c,l)=>l.updatedAt-c.updatedAt))},s.onabort=()=>n(s.error)})}async original(t){const e=await this.open();return new Promise((n,s)=>{const r=e.transaction(["originals","worlds"]).objectStore("originals").get(t);r.onsuccess=()=>{if(r.result){n(r.result);return}const a=r.transaction.objectStore("worlds").get(t);a.onsuccess=()=>n(a.result?.version===1?a.result:void 0),a.onerror=()=>s(a.error)},r.onerror=()=>s(r.error)})}async get(t){const e=await this.open(),n=await new Promise((s,r)=>{const a=e.transaction("worlds").objectStore("worlds").get(t);a.onsuccess=()=>s(a.result),a.onerror=()=>r(a.error)});if(n!==void 0)return sl(n)}async write(t,e){const n=sl(t),s=await this.open();return new Promise((r,a)=>{const o=s.transaction(["directory","worlds","originals"],"readwrite"),c=o.objectStore("directory"),l=c.get(t.id);let h,u=!1;l.onsuccess=()=>{if((l.result?.revision??null)!==e){u=!0,o.abort();return}const f=o.objectStore("worlds"),d=f.get(t.id);d.onsuccess=()=>{const A=d.result?.version===1?d.result:t.version===1?t:null;if(A){const T=o.objectStore("originals"),C=T.getKey(t.id);C.onsuccess=()=>{C.result===void 0&&T.add(A)}}},h={...n,revision:(e??0)+1,updatedAt:Date.now()};const{id:g,name:_,seed:p,mode:m,stage:b,updatedAt:E,revision:M}=h;o.objectStore("worlds").put(h),c.put({id:g,name:_,seed:p,mode:m,stage:b,updatedAt:E,revision:M,schemaVersion:2})},o.oncomplete=()=>r(h),o.onabort=()=>a(u?new Error("別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。"):o.error??new Error("保存が中断されました。"))})}}const _u=900,vu=260,i1=300,s1=7e3,r1=12e3,a1=1e4,o1={400:"部屋名・ニックネーム・合言葉を確認してください。",401:"部屋との接続が切れました。合言葉を入れて参加し直してください。",403:"このページからは部屋に接続できません。",404:"部屋が見つかりません。合言葉を確認してください。",409:"部屋が現在いっぱいです。",410:"部屋の有効期限が切れました。新しい部屋を作ってください。",426:"ゲームを再読み込みして、最新版でルームに入り直してください。",429:"通信が集中しています。少し待ってからお試しください。"};class Wi extends Error{constructor(t,e,n=0){super(e==="invalid-response"?"部屋から正しい応答を受け取れませんでした。":o1[t]??"マルチプレイに接続できませんでした。通信環境を確認してください。"),this.status=t,this.code=e,this.retryAfter=n,this.name="OnlineError"}status;code;retryAfter}function Xi(){throw new Wi(0,"invalid-response")}function Jn(i){return i&&typeof i=="object"&&!Array.isArray(i)?i:void 0}function mr(i,t){return typeof i=="string"&&i.length>0&&i.length<=t}function qi(i,t,e){return typeof i=="number"&&Number.isSafeInteger(i)&&i>=t&&i<=e}function xa(i,t,e){return typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e}function Za(i){return mr(i,64)&&/^[a-z0-9_-]+$/i.test(i)}function xu(i){const t=Jn(i),e=Jn(t?.room);return!t||!e||typeof e.code!="string"||!/^[A-Z0-9]{8}$/.test(e.code)||!mr(e.name,120)||!mr(e.seed,128)||e.generator!==2||e.mode!==void 0&&e.mode!=="explore"&&e.mode!=="creative"&&e.mode!=="tag"||!qi(e.createdAt,1,Number.MAX_SAFE_INTEGER)||!Za(t.id)||!mr(t.token,256)||t.token.length<16||!/^[a-z0-9_.-]+$/i.test(t.token)?Xi():{id:t.id,token:t.token,room:{code:e.code,name:e.name,seed:e.seed,generator:e.generator,createdAt:e.createdAt,mode:e.mode==="explore"||e.mode==="tag"?e.mode:"creative"}}}function c1(i){const t=Jn(i),e=Jn(t?.pose);if(!t||!e||!Za(t.id)||!mr(t.nickname,80)||!xa(e.x,0,Rt)||!xa(e.y,0,Ke)||!xa(e.z,0,Rt)||!xa(e.yaw,-Math.PI*2,Math.PI*2)||typeof e.moving!="boolean"||typeof e.crouched!="boolean"||typeof e.flying!="boolean")return;const{x:n,y:s,z:r,yaw:a,moving:o,crouched:c,flying:l}=e;return{id:t.id,nickname:t.nickname,pose:{x:n,y:s,z:r,yaw:a,moving:o,crouched:c,flying:l}}}function l1(i,t,e){const n=Jn(i);return!n||!qi(n.key,Rt*Rt,Rt*Rt*Ke-1)||!qi(n.block,0,33)||n.block>12&&n.block!==21&&n.block!==23&&n.block<25||n.axis!=="y"&&!(n.block===5&&(n.axis==="x"||n.axis==="z"))||!qi(n.revision,t+1,e)?Xi():{key:n.key,block:n.block,axis:n.axis,revision:n.revision}}function h1(i){const t=Jn(i);return!t||t.it!==null&&!Za(t.it)||t.previousIt!==null&&!Za(t.previousIt)||t.phase!=="waiting"&&t.phase!=="hiding"&&t.phase!=="playing"||!qi(t.hideUntil,0,Number.MAX_SAFE_INTEGER)||!qi(t.seq,0,Number.MAX_SAFE_INTEGER)?Xi():{it:t.it,previousIt:t.previousIt,phase:t.phase,hideUntil:t.hideUntil,seq:t.seq}}function u1(i,t,e,n,s=!1){const r=Jn(i);if(!r||!qi(r.revision,t,Number.MAX_SAFE_INTEGER)||!Array.isArray(r.cells)||r.cells.length>a1||!Array.isArray(r.players)||r.players.length>6)return Xi();const a=r.revision,o=r.cells.map(u=>l1(u,t,a));if(new Set(o.map(u=>u.key)).size!==o.length||a>t&&!o.some(u=>u.revision===a))return Xi();const c=new Set([e]),l=[];for(const u of r.players){const f=c1(u);!f||c.has(f.id)||(c.add(f.id),l.push(f))}let h;if(n){const u=Jn(r.result);if(!u||typeof u.ok!="boolean")return Xi();const f=typeof u.reason=="string"&&/^[a-z-]{1,32}$/.test(u.reason)?u.reason:void 0;h={ok:u.ok,...f?{reason:f}:{}}}return{frame:{revision:a,cells:o,players:l,...s?{tag:h1(r.tag)}:{}},result:h}}function f1(i){if(!i)return 0;const t=/^\d+$/.test(i)?Number(i)*1e3:Date.parse(i)-Date.now();return Number.isFinite(t)?Math.min(Math.max(t,0),6e4):0}class d1{constructor(t,e=globalThis.fetch.bind(globalThis)){this.fetcher=e;const n=new URL(t),s=["127.0.0.1","localhost","[::1]"].includes(n.hostname);if(n.username||n.password||n.protocol!=="https:"&&!(s&&n.protocol==="http:"))throw new Error("安全なマルチプレイ接続先を指定してください。");this.origin=n.origin}fetcher;origin;async create(t){const e=xu(await this.request("rooms",{...t,protocol:3}));if(t.mode&&e.room.mode!==t.mode)throw this.leave(e),new Wi(426,"mode-unavailable");return e}async join(t){return xu(await this.request("join",{...t,protocol:3}))}start(t,e){return new p1(t,e,(n,s)=>this.request("sync",n,s),()=>this.leave(t))}async leave(t){try{await this.request("leave",{code:t.room.code,token:t.token},void 0,!0)}catch{}}async request(t,e,n,s=!1){const r=new AbortController,a=()=>r.abort();n?.aborted&&a();const o=setTimeout(a,s1);n?.addEventListener("abort",a,{once:!0});try{const c=await this.fetcher(this.origin+"/api/webcraft/"+t,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},signal:r.signal,cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer",redirect:"error",keepalive:s});if(!c.ok){const l=Jn(await c.json().catch(()=>{})),h=typeof l?.error=="string"&&/^[a-z0-9_-]{1,40}$/i.test(l.error)?l.error:"http";throw new Wi(c.status,h,f1(c.headers.get("Retry-After")))}return await c.json().catch(()=>Xi())}catch(c){throw c instanceof Wi?c:new Wi(0,"network")}finally{clearTimeout(o),n?.removeEventListener("abort",a)}}}const Ma=()=>typeof document<"u"&&document.hidden;class p1{constructor(t,e,n,s){this.connection=t,this.hooks=e,this.send=n,this.leave=s,typeof document<"u"&&document.addEventListener("visibilitychange",this.visibility),this.schedule(0)}connection;hooks;send;leave;currentState="connecting";revision=0;lastStart=-1/0;retryAt=0;failures=0;timer;running;pending;sent;closed=!1;get state(){return this.currentState}edit(t){return this.closed||this.state!=="connected"||Ma()?Promise.resolve({ok:!1,reason:"offline"}):this.pending?Promise.resolve({ok:!1,reason:"busy"}):new Promise(e=>{this.pending={edit:{...t},resolve:e},this.schedule(0)})}close(){this.closed||(this.stop(),this.leave())}visibility=()=>{if(!Ma()){this.schedule(0);return}clearTimeout(this.timer),this.timer=void 0,this.pending&&this.pending!==this.sent&&this.finishEdit({ok:!1,reason:"interrupted"})};updateState(t){this.currentState!==t&&(this.currentState=t,this.hooks.onState(t))}schedule(t){if(this.closed||this.running||Ma())return;clearTimeout(this.timer);const e=performance.now(),n=this.connection.room.mode==="tag"?vu:i1,s=Math.max(e+t,this.lastStart+n,this.retryAt);this.timer=setTimeout(()=>{this.tick()},s-e)}finishEdit(t){const e=this.pending;this.pending=void 0,this.sent=void 0,e?.resolve(t)}stop(){this.closed=!0,clearTimeout(this.timer),this.timer=void 0,this.running?.abort(),this.finishEdit({ok:!1,reason:"closed"}),typeof document<"u"&&document.removeEventListener("visibilitychange",this.visibility)}async tick(){if(this.timer=void 0,this.closed||this.running||Ma())return;const t=new AbortController;this.running=t,this.lastStart=performance.now(),this.sent=this.pending;const e=this.sent,{room:n,token:s,id:r}=this.connection;let a=!1;try{const o=this.hooks.pose();a=!!(e&&o),e&&!a&&this.finishEdit({ok:!1,reason:"offline"});const c=await this.send({protocol:3,code:n.code,token:s,since:this.revision,pose:o,...e&&o?{edit:e.edit}:{}},t.signal);if(this.closed)return;const{frame:l,result:h}=u1(c,this.revision,r,a,n.mode==="tag");this.hooks.onFrame(l),this.revision=l.revision,this.failures=this.retryAt=0,this.updateState("connected"),e&&h&&this.finishEdit(h)}catch(o){if(this.closed)return;const c=o instanceof Wi?o:new Wi(0,"invalid-response");if(c.status===400&&a&&e?.edit.actionId){this.finishEdit({ok:!1,reason:"invalid"});return}if([400,401,403,404,409,410,426].includes(c.status)){this.stop(),this.hooks.onEnd?.(c);return}this.pending&&this.finishEdit({ok:!1,reason:a?"uncertain":"offline"}),this.updateState("reconnecting"),this.failures=Math.min(this.failures+1,5),this.retryAt=performance.now()+Math.max(c.retryAfter,Math.min(r1,_u*2**(this.failures-1)))}finally{this.running=void 0;const o=n.mode==="tag"?vu:_u;this.closed||this.schedule(this.pending?0:Math.max(0,this.lastStart+o-performance.now()))}}}const Hf=(i,t)=>"tk777.webcraft.exploration."+JSON.stringify([i,t.trim()]),rr=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,m1=i=>i&&rr(i.x,0,Rt)&&rr(i.y,0,Ke)&&rr(i.z,0,Rt)&&rr(i.pitch,-Math.PI/2,Math.PI/2)&&rr(i.yaw,-Math.PI*2,Math.PI*2)&&(i.crouched===void 0||typeof i.crouched=="boolean");function g1(i){const t=i?.edit;return t&&hl(i?.after)&&typeof t.actionId=="string"&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(t.actionId)&&(i?.message===void 0||typeof i.message=="string"&&i.message.length<=150)&&Number.isSafeInteger(t.key)&&t.key>=Rt*Rt&&t.key<Rt*Rt*Ke&&Number.isSafeInteger(t.fromRevision)&&t.fromRevision>=0&&yr(t.before)&&yr(t.block)&&(t.axis==="x"||t.axis==="y"||t.axis==="z")}function _1(i,t){try{const e=JSON.parse(sessionStorage.getItem(Hf(i,t))??"null");if(e&&hl(e.bag)&&Number.isInteger(e.selected)&&e.selected>=0&&e.selected<=8&&Gu(e.journey)&&m1(e.pose)&&(e.pending===void 0||g1(e.pending)))return e}catch{}}function v1(i,t,e){try{sessionStorage.setItem(Hf(i,t),JSON.stringify(e))}catch{}}const rl=i=>({x:Math.floor(i.x)+.5,y:Math.round(i.y),z:Math.floor(i.z)+.5}),cn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),vs=1e-5,Da=i=>Math.floor(i.x)+Rt*(Math.floor(i.z)+Rt*Math.round(i.y)),x1=[[1,0],[0,1],[-1,0],[0,-1]];function wn(i,t,e,n=!1){const s=Math.floor(t.x-e.radius+vs),r=Math.floor(t.x+e.radius-vs),a=Math.floor(t.z-e.radius+vs),o=Math.floor(t.z+e.radius-vs),c=Math.floor(t.y+vs),l=Math.floor(t.y+e.height-vs);if(s<0||a<0||c<1||r>=Rt||o>=Rt||l>=Ke)return!1;for(let h=c;h<=l;h++)for(let u=a;u<=o;u++)for(let f=s;f<=r;f++){const d=i.get(f,h,u);if(li(d)||n&&d===13)return!1}return!0}function Dr(i,t,e){return Math.abs(t.y-Math.round(t.y))<.002&&!wn(i,{...t,y:t.y-.003},e)}function Vf(i,t,e){const n=[];for(const[s,r]of x1){const a={x:t.x+s,y:t.y,z:t.z+r};for(const o of[0,1,-1])if(a.y=t.y+o,!(!wn(i,a,e,!0)||!Dr(i,a,e))&&!(o===1&&!wn(i,{...t,y:a.y},e,!0))&&!(o===-1&&!wn(i,{...a,y:t.y},e,!0))){n.push({...a});break}}return n}function M1(i,t,e,n,s,r){const a=rl(t),o=rl(e);if(!wn(i,a,n,!0)||!Dr(i,a,n))return[];const c=g=>Math.abs(g.x-o.x)+Math.abs(g.z-o.z)+.6*Math.abs(g.y-o.y),l={p:a,g:0,h:c(a),parent:null},h=[l],u=new Map([[Da(a),0]]);let f=l;for(let g=0;h.length&&g<96&&!(performance.now()>=s);g++){let _=0;for(let m=1;m<h.length;m++){const b=h[m],E=h[_];(b.g+b.h<E.g+E.h||b.g+b.h===E.g+E.h&&b.h<E.h)&&(_=m)}const[p]=h.splice(_,1);if(p.g===u.get(Da(p.p))){if(p.h<f.h&&(f=p),p.h<.01)break;for(const m of Vf(i,p.p,n)){if(Math.abs(m.x-a.x)>14||Math.abs(m.z-a.z)>14)continue;const b=Da(m),E=p.g+1+.25*Math.abs(m.y-p.p.y);r?.has(b)||E>=(u.get(b)??1/0)||(u.set(b,E),h.push({p:m,g:E,h:c(m),parent:p}))}}}const d=[];for(let g=f;g?.parent;g=g.parent)d.push(g.p);return d.reverse()}const Fi={sheep:{radius:.43,height:1.22},cow:{radius:.48,height:1.43},villager:{radius:.32,height:1.81}};function y1({x:i,y:t,z:e}){return[i,t,e].every(Number.isFinite)&&i>=0&&i<Rt&&e>=0&&e<Rt&&t>=1&&t<Ke}const b1=[["villager","ナギ",5082500,.6,-4],["sheep","わたげ",16050898,-2,-5],["cow","もみじ",8144182,4,-5],["villager","コハク",12748099,5,-2],["sheep","ミルク",15196367,-5,-5],["cow","カカオ",6244930,6,1],["villager","スミレ",10188701,-4,2],["sheep","ゆき",15917509,-6,-1],["cow","くるみ",5396065,7,3],["villager","ハル",10642512,2,5],["sheep","こむぎ",15386777,-2,6],["cow","あずき",10180928,5,7]];function Gf(i,t,e){const n=rl(t);for(const s of[0,-1,1,-2,2,-3,3]){const r={...n,y:n.y+s};if(wn(i,r,e,!0)&&Dr(i,r,e))return r}return null}function S1(i,t){const e={radius:.48,height:1.81},n=Gf(i,t,e);if(!n)return[];const s=new Set,r=[n],a=[],o=c=>c.x+"/"+c.y+"/"+c.z;s.add(o(n));for(let c=0;c<r.length&&c<440;c++){const l=r[c],h=Math.floor(l.x),u=Math.floor(l.z);if(cn(l,t)>=2.8&&[1,2,3,4,8].includes(i.get(h,l.y-1,u))){let f=!1;for(let d=l.y+2;d<Ke;d++)if(li(i.get(h,d,u))){f=!0;break}f||a.push(l)}for(const f of Vf(i,l,e)){const d=o(f);Math.abs(f.x-n.x)>11||Math.abs(f.z-n.z)>11||s.has(d)||(s.add(d),r.push(f))}}return a}function ar(i,t){return Math.atan2(i.x-t.x,i.z-t.z)}function E1(i,t,e){const{radius:n,height:s}=Fi[e.kind];let r=0,a=4.25;for(const o of["x","y","z"]){const c=e[o]-(o==="y"?0:n),l=e[o]+(o==="y"?s:n);if(Math.abs(t[o])<1e-9){if(i[o]<c||i[o]>l)return 1/0}else{const h=(c-i[o])/t[o],u=(l-i[o])/t[o];if(r=Math.max(r,Math.min(h,u)),a=Math.min(a,Math.max(h,u)),a<r)return 1/0}}return r}class w1{constructor(t){this.world=t,this.unsubscribe=t.onEdit((e,n,s)=>{for(const r of this.entities){const a=this.motions.get(r.id),o=c=>Math.abs(c.x-(e+.5))<1.51&&Math.abs(c.z-(s+.5))<1.51&&n>=Math.floor(c.y)-2&&n<Math.ceil(c.y+Fi[r.kind].height)+1;!o(r)&&!a.path.some(o)||(a.path=[],a.due=0)}})}world;active=[];entities=[];clock=0;visualRevision=0;motions=new Map;unsubscribe;nextList=0;lastViewer=null;nextPlan=0;cursor=0;talking=null;lastMobile;track(t){this.motions.set(t.id,{mode:"idle",path:[],due:this.clock+1.8+this.motions.size*.31,seq:this.motions.size*57+1,vy:0,stride:0,grazing:0})}introduce(t){if(this.entities.length||!y1(t))return!1;const e=S1(this.world,t),n=[],s=Number.isFinite(t.yaw)?t.yaw:0,r=Math.cos(s),a=Math.sin(s);for(const[o,[c,l,h,u,f]]of b1.entries()){const d=o===0?.7:2.8,g=u+(Kt(o,12,this.world.salt)-.5)*d,_=f+(Kt(o,73,this.world.salt)-.5)*d,p=t.x+g*r+_*a,m=t.z-g*a+_*r;let b,E=1/0;for(const A of e){if(n.some(C=>cn(C,A)<1.75))continue;let T=(p-A.x)**2+(m-A.z)**2+3*(t.y-A.y)**2;if(o===0){const C=A.x-t.x,I=A.z-t.z,S=-a*C-r*I,y=Math.abs(r*C-a*I);(S<2.8||y>S*.26)&&(T+=75)}T<E&&(E=T,b=A)}if(!b)return!1;const M=ar(b,t)+.48*(o%2?-1:1);n.push({...b,id:c+"-"+this.world.salt.toString(36)+"-"+o,name:l,kind:c,color:h,yaw:Math.atan2(Math.sin(M),Math.cos(M)),home:{...b}})}this.entities.push(...n),this.visualRevision++;for(const o of n)this.track(o);return this.refreshActive(t,!1),!0}refreshActive(t,e){const n=e?27:43,s=this.entities.filter(o=>Math.hypot(o.x-t.x,o.z-t.z,o.y-t.y)<n).sort((o,c)=>cn(o,t)-cn(c,t));this.active.length=0;let r=0,a=0;for(const o of s){if(o.kind==="villager"){if(a>=4)continue;a++}else{if(r>=8)continue;r++}this.active.push(o)}this.lastMobile=e,this.lastViewer={...t},this.nextList=this.clock+.35}talk(t,e){if(this.talking=t,this.visualRevision++,!t)return;const n=this.entities.find(s=>s.id===t&&s.kind==="villager");if(n){const s=this.motions.get(t);s.mode="talk",s.path=[],e&&(n.yaw=ar(n,e))}}overlapsBlock(t,e,n){return this.entities.some(s=>{const r=Fi[s.kind];return t<s.x+r.radius&&t+1>s.x-r.radius&&n<s.z+r.radius&&n+1>s.z-r.radius&&e<s.y+r.height&&e+1>s.y+1e-5})}target(t,e){if(![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=e??Mi(this.world,t,4.25)?.distance??1/0;let s=Math.min(4.250001,n-1e-4),r=null;const a=Math.cos(t.pitch),o={x:-Math.sin(t.yaw)*a,y:Math.sin(t.pitch),z:-Math.cos(t.yaw)*a},c={x:t.x,y:t.y+Gs(t),z:t.z};for(const l of this.entities){const h=E1(c,o,l);h<s&&(s=h,r=l)}return r}motion(t){return this.motions.get(t.id)}castsContactShadow(t){if(Math.abs(t.y-Math.round(t.y))>.003)return!1;const e=Fi[t.kind].radius*.82,n=Math.round(t.y)-1;return[-e,e].every(s=>[-e,e].every(r=>li(this.world.get(Math.floor(t.x+s),n,Math.floor(t.z+r)))))}plan(t,e,n,s){e.seq++;const r=Kt(e.seq,42,this.world.salt),a=Kt(e.seq,81,this.world.salt);e.due=this.clock+2.5+r*3;const o=cn(t,n)<1.05&&Math.abs(t.y-n.y)<1.8;if(!o&&a<.28){e.path=[],e.mode=this.grazes(t)?"eat":"idle",e.grazing=this.clock+.9+r,t.yaw=Math.atan2(Math.sin(t.yaw+(r-.5)*.55),Math.cos(t.yaw+(r-.5)*.55));return}let c;if(o){const h=ar(n,t);c={x:t.x-Math.sin(h)*2.5,y:t.y,z:t.z-Math.cos(h)*2.5}}else{const h=t.kind==="villager"?4.2:5.5;c={x:t.home.x+Math.cos(r*6.28)*(.9+a*h),y:t.home.y,z:t.home.z+Math.sin(r*6.28)*(.9+a*h)}}const l=new Set;for(const h of this.active)h!==t&&l.add(Da(h));e.path=M1(this.world,t,c,Fi[t.kind],s,l),e.mode=e.path.length?"walk":"idle"}grazes(t){return t.kind!=="villager"&&this.world.get(Math.floor(t.x),Math.floor(t.y-.01),Math.floor(t.z))===1}move(t,e,n,s){const r=Fi[t.kind],a=this.world;if(!wn(a,t,r))return;if(Dr(a,t,r))t.y=Math.round(t.y),e.vy=0;else{e.vy=Math.max(-15,e.vy-22*n);const _={x:t.x,z:t.z,y:t.y+e.vy*n};wn(a,_,r)?t.y=_.y:(t.y=Math.ceil(_.y-1e-5),e.vy=0)}if(!Dr(a,t,r)||!e.path.length)return;const o=e.path[0],c=cn(t,o);if(c<.025){e.path.shift(),e.path.length||(e.mode="idle");return}const l=t.kind==="villager"?.95:1.12,h=Math.min(1,l*n/c),u={x:t.x+(o.x-t.x)*h,y:t.y,z:t.z+(o.z-t.z)*h};if((_=>Math.abs(_.y-s.y)<1.75&&cn(_,s)<r.radius+.31)(u)&&cn(u,s)<=cn(t,s))return;if(this.active.some(_=>_!==t&&Math.abs(_.y-t.y)<1.4&&cn(_,u)<Fi[_.kind].radius+r.radius&&cn(_,u)<cn(_,t)-1e-6)){e.path=[],e.mode="idle",e.due=this.clock+.5;return}if(!wn(a,u,r,!0)){const _={...u,y:t.y+1};if(o.y!==t.y+1||!wn(a,{...t,y:t.y+1},r,!0)||!wn(a,_,r,!0)){e.path=[],e.mode="idle";return}u.y=_.y}const g=Gf(a,u,r);if(!g||g.y<u.y-1){e.path=[],e.mode="idle";return}t.yaw=ar(t,o),Object.assign(t,u),e.stride=(e.stride+l*n*6)%(Math.PI*2)}step(t,e,n){if(!Number.isFinite(t)||t<=0||![e.x,e.y,e.z].every(Number.isFinite))return;const s=Math.min(.1,t);this.clock+=s,(this.clock>=this.nextList||this.lastMobile!==n||!this.lastViewer||cn(e,this.lastViewer)>3)&&this.refreshActive(e,n);const r=this.clock,a=this.active.length;if(!a)return;const o=performance.now()+(n?1:1.8);let c=r>=this.nextPlan?n?1:2:0;const l=Math.ceil(s*60);for(let h=0;h<a;h++){const u=this.active[(h+this.cursor)%a],f=this.motions.get(u.id);this.talking===u.id?(f.path=[],f.mode="talk",u.yaw=ar(u,e)):f.grazing>r?(f.path=[],f.mode=this.grazes(u)?"eat":"idle"):(f.path.length||(f.mode="idle"),c>0&&r>=f.due&&performance.now()<o&&!f.path.length&&(this.plan(u,f,e,o),c--,this.nextPlan=r+(n?.07:.045)));for(let d=0;d<l;d++)this.move(u,f,s/l,e)}this.cursor=(this.cursor+1)%a}dispose(){this.unsubscribe(),this.active.length=0,this.motions.clear()}}const In=(i,t,e,n,s,r,a,o)=>({joint:i,x:t,y:e,z:n,w:s,h:r,d:a,color:o}),$t=(i,t,e,n,s,r,a)=>In("body",i,t,e,n,s,r,a),ne=(i,t,e,n,s,r,a)=>In("head",i,t,e,n,s,r,a),bs=3157042,ya=16771268,Mu=12553580,$a=["leftFront","rightFront","leftRear","rightRear"];function yu(i){const t=i==="sheep",e=[$t(0,.67,.035,.6,.47,.68,t?13087134:"coat"),...t?[$t(0,.73,.045,.73,.59,.77,"coat"),$t(-.31,.65,.02,.15,.34,.56,14668990),$t(.32,.67,.08,.14,.32,.49,15853259),$t(0,.98,.04,.56,.13,.64,16773852),$t(0,.69,.42,.5,.38,.13,15128509),$t(-.23,.72,-.32,.2,.26,.12,14932157),$t(.22,.74,-.32,.2,.27,.12,15984074),$t(.11,.96,-.17,.22,.14,.23,16248022)]:[$t(-.306,.7,.06,.035,.33,.25,16179136),$t(.306,.66,-.1,.035,.26,.21,15062201),$t(.081,.915,.09,.3,.04,.22,16575444),$t(-.03,.51,.27,.4,.14,.18,13213579),$t(-.19,.63,-.31,.16,.22,.03,15128247),$t(.314,.85,.12,.045,.17,.24,15853003),$t(-.25,.9,-.09,.15,.035,.18,13614488),In("tail",0,-.12,0,.065,.29,.055,12097917),In("tail",0,-.28,0,.088,.11,.08,5061686)],ne(0,.02,-.035,t?.34:.4,.36,.29,t?11899773:"coat"),ne(0,-.07,-.188,t?.28:.35,.15,.11,t?14136730:14002072),ne(-.102,.068,-.186,.062,.066,.02,bs),ne(.102,.068,-.186,.062,.066,.02,bs),ne(-.108,.082,-.198,.018,.021,.008,ya),ne(.108,.082,-.198,.018,.021,.008,ya),ne(-.215,.06,.014,.14,.078,.14,t?14466992:"coat"),ne(.215,.06,.014,.14,.078,.14,t?14466992:"coat"),ne(-.074,-.06,-.246,.036,.025,.01,bs),ne(.074,-.06,-.246,.036,.025,.01,bs)];t?e.push(ne(0,.197,-.03,.37,.105,.33,15524297)):e.push(ne(-.15,.23,.04,.07,.16,.08,ya),ne(.15,.23,.04,.07,.16,.08,ya),ne(0,.055,-.182,.1,.23,.018,15917005),ne(0,.215,-.015,.21,.075,.23,5520694));for(const[n,s]of $a.entries())e.push(In(s,0,-.11,0,.136,.43,.14,t?12557181:n===2?15983303:8481111),In(s,0,-.337,-.006,.146,.09,.156,5523522));return e}const T1=[$t(0,1.05,0,.46,.54,.28,"coat"),$t(0,.73,0,.43,.17,.27,8413004),$t(0,1.13,-.15,.22,.36,.035,15323038),$t(0,.855,-.145,.44,.09,.048,6441015),$t(0,1.3,-.135,.36,.11,.064,13273928),$t(.13,1.19,-.16,.067,.16,.047,14986853),$t(-.077,.983,-.174,.14,.085,.023,11045476),$t(.078,1.095,-.173,.04,.031,.014,12230523),$t(-.27,.98,0,.111,.05,.185,13346417),$t(.27,.98,0,.111,.05,.185,13346417),$t(.085,.855,-.176,.07,.063,.025,14726755),$t(-.22,.84,-.015,.13,.19,.15,10121806),$t(-.265,1.08,0,.105,.34,.18,"coat"),$t(.265,1.08,0,.105,.34,.18,"coat"),$t(-.265,.89,0,.103,.12,.15,Mu),$t(.265,.89,0,.103,.12,.15,Mu),ne(0,.005,0,.333,.34,.286,14198654),ne(0,.16,.008,.345,.1,.303,6638398),ne(0,.217,.022,.38,.072,.345,"coat"),ne(0,.254,.034,.29,.061,.255,"coat"),ne(0,.191,-.086,.35,.031,.245,4734776),ne(.132,.219,-.153,.046,.037,.026,15124352),ne(-.094,.117,-.145,.12,.048,.023,6638398),ne(-.168,-.007,.017,.04,.07,.088,13077613),ne(.168,-.007,.017,.04,.07,.088,13077613),ne(-.143,.069,.02,.063,.13,.24,6441533),ne(.143,.069,.02,.063,.13,.24,6441533),ne(-.067,.033,-.148,.043,.051,.012,bs),ne(.067,.033,-.148,.043,.051,.012,bs),ne(0,-.018,-.17,.067,.064,.057,12749163),ne(0,-.094,-.146,.073,.018,.013,11103576),In("leftFront",0,-.27,0,.17,.55,.2,4541521),In("rightFront",0,-.27,0,.17,.55,.2,4541521),In("leftFront",0,-.602,-.023,.18,.13,.246,6310972),In("rightFront",0,-.602,-.023,.18,.13,.246,6310972)],ac={sheep:yu("sheep"),cow:yu("cow"),villager:T1},A1=["body","head",...$a,"tail"];function R1(){const t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){const r=(s+n*32)*4,a=(Math.imul((s>>1)+17,191)^Math.imul((n>>1)+9,127))&31,o=(s+n*3)%19===0||n%9===0&&s%7<3?12:0,c=Math.min(255,220+a+((s^n)&3)-o);t[r]=c,t[r+1]=c,t[r+2]=c,t[r+3]=255}const e=new kr(t,32,32);return e.generateMipmaps=!0,e.magFilter=Pe,e.minFilter=hi,e.needsUpdate=!0,e}function C1(){return new Ge({transparent:!0,depthWrite:!1,vertexShader:"varying vec2 pos;void main(){pos=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 pos;void main(){vec2 p=floor(pos*20.+.5)/20.;
      float a=(1.-smoothstep(.2,1.,dot(p,p)))*.31;gl_FragColor=vec4(.065,.105,.069,a);
      #include <colorspace_fragment>
    }`})}class P1{constructor(t){this.scene=t;const e=[],n=this.geometry.getAttribute("normal");for(let s=0;s<n.count;s++){const r=.76+n.getY(s)*.19+n.getX(s)*.075+n.getZ(s)*.035;e.push(r,r,r*.99)}this.geometry.setAttribute("color",new xe(e,3)),this.mesh=new Xa(this.geometry,this.material,1152),this.mesh.instanceMatrix.setUsage(Tp),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.name="羊・牛・村人",t.add(this.mesh),this.shade.name="足元の影",this.shade.frustumCulled=!1,this.shade.count=0,this.shade.renderOrder=.5,t.add(this.shade);for(const s of A1){const r=new Ce;this.joints.set(s,r),this.root.add(r)}for(const s of Object.keys(ac))for(const r of ac[s])typeof r.color=="number"&&!this.palette.has(r.color)&&this.palette.set(r.color,new Wt(r.color))}scene;geometry=new _n(1,1,1);texture=R1();material=new Zi({vertexColors:!0,map:this.texture});shade=new Xa(new Hs(1,1).rotateX(-Math.PI/2),C1(),24);mesh;root=new Ce;joints=new Map;local=new Ce;out=new pe;color=new Wt;palette=new Map;previousClock=-1;previousRevision=-1;previousCenter=new L(1/0,0,0);previousDay=-1;previousMobile;pose(t,e,n){const s=e.motion(t),r=t.kind==="villager",a=t.kind==="cow",o=n?0:e.clock,c=t.id.charCodeAt(t.id.length-1),l=s.mode==="walk",h=n||!l?0:Math.sin(s.stride)*.48,u=n?0:Math.sin(o*2.2+c)*.009;this.root.position.set(t.x,t.y+u+(l?Math.abs(h)*.042:0),t.z),this.root.rotation.y=t.yaw,this.root.scale.setScalar(a?1.1:1),this.joints.get("body").position.set(0,0,0);const f=this.joints.get("head"),d=s.mode==="eat"&&!r&&!n,g=d?.5+.5*Math.sin(o*5):0;f.position.set(0,r?1.48:a?.88:.93,r?0:-.271),f.rotation.set(d?-.56-.25*g:u,!l&&!n&&s.mode!=="talk"?Math.sin(o*.9+c)*.15:0,0),d&&(f.position.y-=.23+.06*g);for(let p=0;p<$a.length;p++){const m=this.joints.get($a[p]);m.position.set((p%2?1:-1)*(r?.115:.212),r?.667:.383,r?0:p<2?-.213:.247),m.rotation.x=h*([0,3].includes(p)?1:-1)}const _=this.joints.get("tail");_.position.set(0,.88,.37),_.rotation.z=n?0:Math.sin(o*2.1+c)*.2,this.root.updateMatrixWorld(!0)}update(t,e,n,s){const r=t.clock,a=r===this.previousClock;this.viewerVector.set(e.x,e.y,e.z);const o=this.previousCenter.distanceToSquared(this.viewerVector);if(this.previousRevision===t.visualRevision&&this.previousMobile===s&&o<.01&&Math.abs(n-this.previousDay)<.003&&(a||s&&r>=this.previousClock&&r-this.previousClock<1/30))return;this.previousClock=r,this.previousCenter.set(e.x,e.y,e.z),this.previousDay=n,this.previousMobile=s,this.previousRevision=t.visualRevision;const c=Math.sin((n-.25)*Math.PI*2),l=.48+.5*Math.max(0,Math.min(1,c*2+.25));let h=0,u=0;for(const f of t.entities){const d=Math.hypot(f.x-e.x,f.y-e.y,f.z-e.z);if(!(d>(s?28:44))){!s&&d<22&&t.castsContactShadow(f)&&(this.local.position.set(f.x,f.y+.006,f.z),this.local.rotation.y=f.yaw,this.local.scale.set(f.kind==="villager"?.58:.88,1,f.kind==="villager"?.52:.95),this.local.updateMatrix(),this.shade.setMatrixAt(u++,this.local.matrix),this.local.rotation.y=0),this.pose(f,t,d>21);for(const g of ac[f.kind])this.local.position.set(g.x,g.y,g.z),this.local.scale.set(g.w,g.h,g.d),this.local.updateMatrix(),this.out.multiplyMatrices(this.joints.get(g.joint).matrixWorld,this.local.matrix),this.mesh.setMatrixAt(h,this.out),g.color==="coat"?this.color.setHex(f.color):this.color.copy(this.palette.get(g.color)),this.mesh.setColorAt(h++,this.color.multiplyScalar(l))}}this.shade.count=u,this.shade.visible=u>0,u&&(this.shade.instanceMatrix.needsUpdate=!0),this.mesh.count=h,this.mesh.visible=h>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}viewerVector=new L;dispose(){this.scene.remove(this.mesh,this.shade),this.mesh.dispose(),this.geometry.dispose(),this.material.dispose(),this.texture.dispose(),this.shade.dispose(),this.shade.geometry.dispose(),this.shade.material.dispose()}}const D1={ナギ:"こんにちは。この坂を下りた先が湖だよ。浅瀬から水の中をのぞいてみて。",コハク:"石や木材を集めたら、湖を眺められる小さな家を建ててみない？",スミレ:"わたげたちは、草の多い場所がお気に入り。少し待つと草を食べるよ。",ハル:"湖で大きな背びれを見かけたら気をつけて。岸に上がれば追ってこないよ。"};class L1{simulation;view;talkUntil=0;mobile=globalThis.matchMedia?.("(pointer: coarse)").matches??!1;constructor(t,e,n=t.spawn()){if(this.simulation=new w1(t),!this.simulation.introduce(n)){const s=t.spawn();if(!this.simulation.introduce(s))for(const[r,a]of[[-10,-6],[10,-6],[-12,6],[12,6],[0,16],[0,-21]]){const o=Math.floor(s.x)+r,c=Math.floor(s.z)+a;if(!ki(o,1,c))continue;const l=t.highest[o+Rt*c]+1;if(this.simulation.introduce({x:o+.5,y:l,z:c+.5}))break}}this.view=this.simulation.entities.length?new P1(e):null}update(t,e,n=.36){this.talkUntil&&this.simulation.clock>=this.talkUntil&&(this.simulation.talk(null),this.talkUntil=0),this.simulation.step(e,t,this.mobile),this.view?.update(this.simulation,t,n,this.mobile)}targetLabel(t,e){const n=this.simulation.target(t,e);if(!n)return null;const s=n.kind==="villager"?"住民":n.kind==="sheep"?"羊":"牛";return n.name+"（"+s+"）"}interact(t){const e=this.simulation.target(t);return e?e.kind==="villager"?(this.simulation.talk(e.id,t),this.talkUntil=this.simulation.clock+3.5,e.name+"「"+(D1[e.name]??"こんにちは。いい天気だね。")+"」"):e.name+(e.kind==="sheep"?"「メェー」":"「モー」"):null}occupies(t,e,n){return this.simulation.overlapsBlock(t,e,n)}dispose(){this.view?.dispose(),this.simulation.dispose()}}const Ul=13,ba=100,oc=4.5,I1=1.52,U1=8.2,N1=[.79,.69,1,.63,.91,.75],xs=2110791,Sa=15792378,Wf={jade:{radius:.55,vertical:.23,speed:1.33},amber:{radius:.5,vertical:.28,speed:1.04},shark:{radius:1.13,vertical:.44,speed:1.25}},F1={jade:"ヒスイフィッシュ",amber:"アンバーフィッシュ",shark:"サメ"},k1={jade:{body:[[0,0,.06,.21,.27,.46,4448177],[0,.09,-.03,.16,.17,.4,1674386],[0,-.09,.08,.2,.09,.37,12122280],[0,0,.27,.15,.18,.1,7662017],[0,.08,-.06,.027,.23,.26,3304615],[0,-.075,.05,.31,.034,.12,4241611],[-.108,.044,.2,.023,.062,.058,xs],[.108,.044,.2,.023,.062,.058,xs],[-.121,.057,.221,.009,.018,.018,Sa],[.121,.057,.221,.009,.018,.018,Sa]],tail:[[0,0,-.052,.115,.105,.12,5561532],[0,0,-.157,.047,.24,.115,3574715],[0,.106,-.208,.026,.095,.095,3781327],[0,-.106,-.208,.026,.095,.095,3781327]],tailOffset:-.215},amber:{body:[[0,0,.055,.245,.285,.36,15366194],[0,.085,.035,.195,.168,.29,16560459],[0,-.083,.025,.19,.13,.32,16765548],[0,-.006,.246,.17,.2,.13,16750140],[0,0,.109,.25,.283,.069,16773073],[0,.169,-.01,.052,.146,.201,15647836],[0,-.035,.045,.33,.04,.16,16165948],[-.091,.047,.238,.027,.067,.058,xs],[.091,.047,.238,.027,.067,.058,xs],[-.107,.061,.26,.008,.019,.015,Sa],[.107,.061,.26,.008,.019,.015,Sa]],tail:[[0,0,-.049,.12,.126,.16,15901246],[0,0,-.142,.055,.257,.135,16566610],[0,.094,-.208,.032,.086,.082,16769168],[0,-.094,-.208,.032,.086,.082,16769168]],tailOffset:-.19},shark:{body:[[0,-.025,.18,.65,.41,1.1,5404820],[0,.092,.17,.58,.24,1.05,3166064],[0,-.204,.23,.54,.13,.98,13821919],[0,-.037,.725,.51,.317,.32,6654623],[0,-.027,.876,.366,.229,.18,7442341],[0,-.189,.712,.48,.054,.31,15135455],[0,-.138,.791,.45,.028,.27,2702165],[0,-.043,-.406,.52,.31,.34,5010832],[0,.265,.065,.105,.2,.37,4351108],[0,.381,-.011,.078,.114,.23,4550288],[-.41,-.111,.176,.225,.078,.34,4154241],[.41,-.111,.176,.225,.078,.34,4154241],[-.55,-.135,.108,.12,.057,.217,5405585],[.55,-.135,.108,.12,.057,.217,5405585],[-.249,.032,.772,.039,.106,.112,15332843],[.249,.032,.772,.039,.106,.112,15332843],[-.271,.03,.801,.025,.063,.064,xs],[.271,.03,.801,.025,.063,.064,xs],[-.326,-.033,.329,.018,.099,.043,3890809],[.326,-.033,.329,.018,.099,.043,3890809],[-.329,-.027,.416,.017,.106,.042,3890809],[.329,-.027,.416,.017,.106,.042,3890809]],tail:[[0,-.026,-.09,.3,.235,.34,5470869],[0,-.018,-.222,.09,.43,.18,4615563],[0,.177,-.281,.076,.227,.154,5405850],[0,.306,-.337,.065,.073,.106,7641003],[0,-.185,-.282,.073,.13,.12,5537175]],tailOffset:-.58}};function bu(i){const t=i.map(([n,s,r,a,o,c,l])=>{const h=new _n(a,o,c);h.translate(n,s,r);const u=new Wt(l),f=new Float32Array(h.attributes.position.count*3);for(let d=0;d<f.length/3;d+=1)u.setHex(l).multiplyScalar(N1[Math.floor(d/4)]).toArray(f,d*3);return h.setAttribute("color",new $e(f,3)),h}),e=zf(t);for(const n of t)n.dispose();return e}function cc(i,t,e,n){return i.get(Math.floor(t),Math.floor(e),Math.floor(n))===Ul}function ln(i,t,e){const{radius:n,vertical:s}=Wf[e],r=Math.floor(t.y+s+.14);for(let a=Math.floor(t.y-s);a<=r;a+=1)for(let o=Math.floor(t.z-n);o<=Math.floor(t.z+n);o+=1)for(let c=Math.floor(t.x-n);c<=Math.floor(t.x+n);c+=1)if(i.get(c,a,o)!==Ul)return!1;return!0}function O1(i){const{x:t,z:e}=i.spawn(),n=Math.floor(t),s=Math.floor(e),r=[],a=new L,o=[bn-.5,bn+.44,bn-1.5,bn-2.5],c=(l,h)=>{if((l+h)%2!==0)return;const u=n+l,f=s+h;for(const d of o)if(i.get(u,Math.floor(d),f)===Ul&&(a.set(u+.5,d,f+.5),!(!ln(i,a,"jade")&&!ln(i,a,"amber")))){r.push(a.clone());return}};for(let l=2;l<=61;l+=1){for(let h=-l;h<=l;h+=1)c(h,-l),c(h,l),Math.abs(h)!==l&&(c(-l,h),c(l,h));if(r.length>=96&&r.some(h=>ln(i,h,"shark")))break}return r.sort((l,h)=>Math.hypot(l.x-t,l.z-e)-Math.hypot(h.x-t,h.z-e)),r}function Su(i,t,e,n){const s=e.filter(c=>ln(i,c,t)),r=s.find(c=>n.every(l=>l.distanceToSquared(c)>5))??s[0];if(!r)return[];const a=s.filter(c=>c.distanceToSquared(r)<=85);a.sort((c,l)=>c.distanceToSquared(r)-l.distanceToSquared(r));const o=[];for(const c of a)if(!n.some(l=>l.distanceToSquared(c)<1.3)&&(n.push(c),o.push(c),o.length===5))break;return o}class z1{constructor(t,e,n=!1){if(this.world=t,this.scene=e,this.defeated=n,t.stage==="flat")return;const s=O1(t),r=[],a=s.find(o=>ln(t,o,"shark"));a&&r.push(a),a&&!this.defeated&&(this.shark=this.addSchool("shark",[a])[0],this.sharkMaterial=this.shark.model.children[0].material),this.addSchool("jade",Su(t,"jade",s,r)),this.addSchool("amber",Su(t,"amber",s,r))}world;scene;fish=[];materials=new Set;geometries=new Set;events=[];target=new L;step=new L;ray=new El;bitePoint=new L;rayHit=new L;sharkBox=new xi(new L(-.61,-.27,-1.03),new L(.61,.45,1));shark;sharkMaterial;playerHealth=ba;enemyHealth=ba;biteCooldown=0;attackCooldown=0;immunity=0;hitFlash=0;timeSinceBite=0;fade=0;chasing=!1;defeated;get health(){return Math.ceil(this.playerHealth)}get sharkHealth(){return this.defeated?0:this.shark?this.enemyHealth:null}get sharkDefeated(){return this.defeated}get hasAquaticLife(){return this.fish.length>0}addSchool(t,e){if(!e.length)return[];const n=k1[t],s=bu(n.body),r=bu(n.tail),a=new Zi({vertexColors:!0,toneMapped:!1});return this.geometries.add(s).add(r),this.materials.add(a),e.map((o,c)=>{const l=Kt(Math.floor(o.x),Math.floor(o.z),this.world.salt^(c+1)*213)*Math.PI*2,h=new Vi;h.name="aquatic-"+t,h.userData.species=F1[t],h.position.copy(o),h.rotation.y=l;const u=new Se(r,a);u.position.z=n.tailOffset,h.add(new Se(s,a),u),this.scene.add(h);const f={kind:t,model:h,tail:u,home:o,destination:o.clone(),phase:l,waypoint:c,nextTurn:0};return this.fish.push(f),f})}consumeEvent(){return this.events.shift()??null}resetHealth(){this.playerHealth=ba,this.immunity=3,this.timeSinceBite=0,this.chasing=!1,this.events.length=0}swimmerPoint(t){return this.bitePoint.set(t.x,t.y+.18,t.z),cc(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)||(this.bitePoint.y=t.y+1),cc(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)}openWaterLine(t,e){const n=Math.ceil(t.distanceTo(e)/.22);for(let s=1;s<n;s+=1)if(this.step.lerpVectors(t,e,s/n),!cc(this.world,this.step.x,this.step.y,this.step.z))return!1;return!0}canAttack(t){const e=this.shark;if(!e||this.defeated||!e.model.visible||this.health<=0||!this.swimmerPoint(t))return!1;const n=e.model.position,s=this.ray.origin.set(t.x,t.y+Gs(t),t.z).sub(n);if(s.lengthSq()>(oc+1.2)**2)return!1;const r=this.ray.direction.set(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch)),a=-e.model.rotation.y,o=(f,d)=>f*Math.cos(a)+d*Math.sin(a),c=(f,d)=>-f*Math.sin(a)+d*Math.cos(a);s.set(o(s.x,s.z),s.y,c(s.x,s.z)),r.set(o(r.x,r.z),r.y,c(r.x,r.z));const l=this.ray.intersectBox(this.sharkBox,this.rayHit);if(!l)return!1;const h=this.sharkBox.containsPoint(s)?0:l.distanceTo(s);if(h>oc)return!1;const u=Mi(this.world,t,oc);return!u||u.distance>h+.055}attack(t){return this.canAttack(t)?(this.attackCooldown>0||(this.attackCooldown=.34,this.hitFlash=.22,this.enemyHealth=Math.max(0,this.enemyHealth-25),this.enemyHealth===0?(this.defeated=!0,this.fade=.7,this.events.push("サメを倒しました！")):this.events.push("サメにヒット！ 残り体力 "+this.enemyHealth)),!0):!1}update(t,e){const n=Math.min(.1,e);if(!Number.isFinite(n)||n<=0)return;this.attackCooldown=Math.max(0,this.attackCooldown-n),this.biteCooldown=Math.max(0,this.biteCooldown-n),this.immunity=Math.max(0,this.immunity-n),this.hitFlash=Math.max(0,this.hitFlash-n),this.timeSinceBite+=n;const s=this.swimmerPoint(t);!s&&this.timeSinceBite>=3&&this.playerHealth>0&&(this.playerHealth=Math.min(ba,this.playerHealth+20*n)),this.sharkMaterial&&this.sharkMaterial.color.setHex(this.hitFlash>.01?16756823:16777215);for(const r of this.fish){if(r===this.shark&&this.defeated){this.fade=Math.max(0,this.fade-n),r.model.visible=this.fade>0,r.model.scale.setScalar(this.fade/.7),r.model.rotation.z=(1-this.fade/.7)*1.8;continue}const a=r.model.position;if(r.model.visible=a.distanceToSquared(this.target.set(t.x,t.y,t.z))<62**2&&ln(this.world,a,r.kind),!r.model.visible){ln(this.world,r.home,r.kind)&&a.copy(r.home);continue}const o=r===this.shark&&s&&this.health>0&&this.immunity<=0&&a.distanceToSquared(this.bitePoint)<U1**2&&r.home.distanceToSquared(this.bitePoint)<19**2&&this.openWaterLine(a,this.bitePoint);r===this.shark&&(o&&!this.chasing&&this.events.push("サメがこちらに向かっています！"),this.chasing=o,o&&a.distanceToSquared(this.bitePoint)<I1**2&&this.biteCooldown<=0&&(this.biteCooldown=1.4,this.timeSinceBite=0,this.playerHealth=Math.max(0,this.playerHealth-20),this.events.push(this.health>0?"サメにかまれた！ 体力 "+this.health:"体力がなくなりました。"))),r.nextTurn-=n,o?(this.target.copy(this.bitePoint),ln(this.world,this.target,r.kind)||(this.target.y=a.y)):((r.nextTurn<=0||a.distanceToSquared(r.destination)<.2)&&this.swimWaypoint(r),this.target.copy(r.destination)),this.swim(r,this.target,n,o?2.7:Wf[r.kind].speed),r.phase+=n*(o?9.3:5.8),r.tail.rotation.y=Math.sin(r.phase)*(o?.37:.27),r.model.rotation.z=Math.sin(r.phase*.57)*.035}}swimWaypoint(t){t.nextTurn=1.4+t.waypoint%5*.23;for(let e=0;e<8;e+=1){const n=this.world.salt^Math.floor(t.home.x*276+t.home.z*61),s=++t.waypoint,r=Kt(s,939,n)*Math.PI*2,a=1+Kt(s,817,n)*(t.kind==="shark"?5:3.5);if(this.step.set(t.home.x+Math.cos(r)*a,t.home.y+(Kt(s,794,n)-.5)*.84,t.home.z+Math.sin(r)*a),ln(this.world,this.step,t.kind)){t.destination.copy(this.step);return}}t.destination.copy(t.home)}swim(t,e,n,s){const r=t.model.position,a=e.x-r.x,o=e.y-r.y,c=e.z-r.z,l=Math.hypot(a,o,c);if(l<.075)return;const h=Math.min(1,n*s/l);if(this.step.set(r.x+a*h,r.y+o*h,r.z+c*h),!ln(this.world,this.step,t.kind)&&(this.step.y=r.y,!ln(this.world,this.step,t.kind)&&(this.step.x=r.x,!ln(this.world,this.step,t.kind)&&(this.step.x=r.x+a*h,this.step.z=r.z,!ln(this.world,this.step,t.kind)))))return;const u=Math.atan2(this.step.x-r.x,this.step.z-r.z)-t.model.rotation.y;t.model.rotation.y+=Math.atan2(Math.sin(u),Math.cos(u))*Math.min(1,n*7),r.copy(this.step)}dispose(){for(const t of this.fish)t.model.removeFromParent();for(const t of this.geometries)t.dispose();for(const t of this.materials)t.dispose()}}const Fe=8,Yi=Rt/Fe;function Eu({x:i,z:t}){return!Number.isFinite(i)||!Number.isFinite(t)||i<0||t<0||i>=Rt||t>=Rt?-1:Math.floor(i/Yi)+Fe*Math.floor(t/Yi)}function B1(i,t,e){const n=[0,0,0],s=Yi/4;for(let r=s/2;r<Yi;r+=s)for(let a=s/2;a<Yi;a+=s){const o=t+a,c=e+r,l=i.highest[o+c*Rt],h=i.get(o,l,c),u=i.get(o,bn,c)===13,f=u?[63,126,140]:h===4?[177,157,101]:h===5||h===6?[55,101,70]:[102,132,76],d=u?0:Math.ceil((l-30)*.9);for(let g=0;g<3;g++)n[g]+=f[g]+d}return"rgb("+n.map(r=>Math.round(r/16)).join(",")+")"}class H1{constructor(t,e){this.canvas=t,this.context=t.getContext("2d"),this.terrain=t.ownerDocument.createElement("canvas"),this.terrain.width=t.width,this.terrain.height=t.height;const n=this.terrain.getContext("2d");if(!n)return;const s=t.width/Fe,r=t.height/Fe;for(let a=0;a<Fe;a++)for(let o=0;o<Fe;o++)n.fillStyle=B1(e,o*Yi,a*Yi),n.fillRect(o*s,a*r,s,r);n.strokeStyle="#153b3666",n.lineWidth=1,n.beginPath();for(let a=1;a<Fe;a++)n.moveTo(a*s+.5,0),n.lineTo(a*s+.5,t.height),n.moveTo(0,a*r+.5),n.lineTo(t.width,a*r+.5);n.stroke()}canvas;terrain;context;counts=new Uint8Array(Fe*Fe);drawnCounts=new Uint8Array(Fe*Fe);drawnSelf=-2;update(t,e,n){const s=this.context;if(!s)return;const r=Eu(e);if(this.counts.fill(0),n)for(const{pose:c}of t){const l=Eu(c);l>=0&&this.counts[l]++}if(r===this.drawnSelf&&this.counts.every((c,l)=>c===this.drawnCounts[l]))return;this.drawnSelf=r,this.drawnCounts.set(this.counts);const a=this.canvas.width/Fe,o=this.canvas.height/Fe;if(s.clearRect(0,0,this.canvas.width,this.canvas.height),s.globalAlpha=.53,s.drawImage(this.terrain,0,0),s.globalAlpha=1,r>=0){const c=r%Fe*a,l=Math.floor(r/Fe)*o;s.fillStyle="#cef9ff4d",s.fillRect(c,l,a,o),s.strokeStyle="#d7f9ff",s.lineWidth=3,s.strokeRect(c+2,l+2,a-4,o-4)}s.font="800 24px system-ui,sans-serif",s.textAlign="center",s.textBaseline="middle",this.counts.forEach((c,l)=>{if(!c)return;const h=(l%Fe+.5)*a,u=(Math.floor(l/Fe)+.5)*o;s.beginPath(),s.arc(h,u,Math.min(a,o)*.34,0,Math.PI*2),s.fillStyle="#ffe292",s.fill(),s.strokeStyle="#4b4225",s.lineWidth=2,s.stroke(),s.fillStyle="#263025",s.fillText(String(c),h,u+1)})}}const Qn=document.querySelector("#scene"),Je=document.querySelector("#hud"),V1=Je.querySelector("#tag-map-canvas"),Nl=Je.querySelector("#touch-controls"),wu=Je.querySelector("#touch-fly"),G1=Je.querySelector("#life-status"),W1=Je.querySelector("#shark-status"),Tu=Je.querySelector("#life-health"),Au=Je.querySelector("#shark-health"),X1=Je.querySelector("#life-health-number"),q1=Je.querySelector("#shark-health-number"),Y1=Je.querySelector("#touch-attack"),Ea=Je.querySelector("#touch-rotate"),al={stick:Je.querySelector("#move-stick"),jump:Je.querySelector("#touch-jump"),down:Je.querySelector("#touch-down")};Qn.tabIndex=-1;const vi=new n1,Oe=new $x,W=new Vx((i,t)=>{Gl(i,t).catch(e=>W.toast(Fn(e)))}),j1=["localhost","127.0.0.1","[::1]"].includes(location.hostname),Ja=new d1(j1?location.origin:"https://tk777-neonshift-scores.takesuke.chatgpt.site"),ol=(new URLSearchParams(location.search).get("room")??"").trim().toUpperCase();let ie=null,ui="y",pi=0,gr=0,lc=0,La=0;const Xf=["北","東","南","西"];let cl="";const Fl=()=>Oe.configure(Re.volume,Re.muted,Re.effectsVolume,Re.ambientVolume);let N=null,Re=Jx();const K1="tk777.webcraft.look",qf="tk777.webcraft.controls",Yf="tk777.webcraft.view";function Z1(){try{return localStorage.getItem(Yf)==="kids"}catch{return!1}}function jf(){const i=window.matchMedia("(pointer: coarse)").matches;return{coarse:i,touch:i||navigator.maxTouchPoints>0,mac:/^Mac/i.test(navigator.platform)}}function Kf(){const i=jf();try{return du(localStorage.getItem(qf),localStorage.getItem(K1),i)}catch{}return du(null,null,i)}let gn=!1,_r=!1,ve=Kf(),kl=!1;function Ol(){return ve==="lock"?jf().touch?"tablet":"drag":ve}let Ia="",Ua=0,mi=0,Na=0,hc=Promise.resolve(!0),Ts=0,Ms=0,fr=0,gi="",Ru=50,yi=!1,Fs=!1;try{yi=!!Qn.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"})}catch{}const zl="WebGL 2を利用できません。ChromeまたはEdgeのハードウェア アクセラレーションを有効にして、ブラウザーを再起動してください。";function Fn(i){return i instanceof DOMException?i.name==="QuotaExceededError"?"ブラウザーの保存容量が不足しています。ファイルへ書き出してバックアップしてください。":i.name==="SecurityError"||i.name==="NotAllowedError"?"ブラウザーのサイト設定で、このページのローカル保存を許可してください。":"保存領域にアクセスできませんでした。他のタブを閉じ、空き容量を確認してください。":i instanceof Error&&/[ぁ-龯]/u.test(i.message)?i.message:"処理を完了できませんでした。ページを開き直してお試しください。"}function Zf(i){return{generator:i.world.generator,bench:ie?.id===21&&i.world.get(ie.x,ie.y,ie.z)===21}}function Or(i,t){return!!Qt[i]?.block&&i!==22&&(i!==21||t==="explore")}function co(i){return!!i.online?.pendingExplore}function Lr(){const i=N,t=zx(i.data.bag,i.data.mode,i.data.selected,Zf(i));return i.online&&i.data.mode==="creative"&&(t.items=t.items.filter(e=>Or(e.id,"creative"))),i.online&&i.data.mode==="explore"&&(t.recipes=t.recipes.filter(e=>e.id!=="chest")),ie?.id===21&&(t.benchUses=i.world.benchUses(ie.x,ie.y,ie.z)),ie?.id===22&&(t.chest=i.world.chestAt(ie.x,ie.y,ie.z),i.data.mode==="creative"&&(t.palette=t.items,t.items=i.data.bag.slots.map(e=>({...e,name:Qt[e.id].name,maxDurability:Qt[e.id].maxDurability})))),t}function ks(){if(!N)return;if(N.online?.tagGame){W.expedition("","","");return}const{world:i,data:t,player:e}=N,n=t.journey,s=i.landmarks.find(a=>a.kind==="cave"),r=i.landmarks.find(a=>Math.hypot(a.x-e.x,a.z-e.z)<12);r&&r.kind!==cl&&Et.active&&W.toast(r.name+"　"+{grove:"大樹の根元で建築用の原木を採れます。",cave:"坑道の壁に潮晶の鉱脈があります。",ruin:"回廊の床には持ち帰れる象眼タイルがあります。"}[r.kind]),cl=r?.kind??"",W.expedition(t.mode==="explore"&&!n.hidden?Fd(n,i.generator):"",kd(n,e),t.mode==="explore"&&!n.hidden&&n.toolMade&&!n.caveVisited&&s?"岩窟 "+Xu(s,e):"")}function $f(i,t=!1){if(!N||!Et.active||N.online?.tagGame)return!1;if(N.online&&N.data.mode==="creative")return t&&W.toast("共同建築ルームでは、建材を自由に選んで建築できます。"),!1;const e=N.land?.interact(N.player);return e?(W.toast(e),!0):!i||!(i.id===21||i.id===22&&!N.online)?(t&&W.toast(N.online?"作業台に照準を合わせてください。":N.land?"住民・動物・作業台・チェストに照準を合わせてください。":"作業台かチェストに照準を合わせてください。"),!1):(ie=i,bi(),W.inventory(Lr()),!0)}function $1(){if(!N||N.online?.tagGame)return;if(co(N)){W.toast("素材の変更を確認しています。少し待ってください。");return}const{world:i,player:t,data:e}=N,n=Mi(i,t);if(!n){W.toast("選びたい建材に照準を合わせてください。");return}if(N.online&&!Or(n.id,e.mode)){W.toast("このブロックは共有ワールドで使えません。");return}const s=to(n.id),r=e.bag.hotbar.indexOf(s);if(e.mode==="explore"&&!Nn(e.bag,s)){W.toast("この建材は所持品にありません。");return}if(s===Kn&&(pi=n.id-Kn),r>=0){Ir(r);return}Lu(e.bag,e.selected,s,e.mode)?(Un(),W.toast(Qt[s].name+"を選びました。")):W.toast("このブロックは選択できません。")}function J1(){if(!N||N.online?.tagGame)return;if(N.online){W.toast("共同建築では、置いたブロックを採掘して取り除けます。");return}if(N.data.mode!=="creative"){W.toast("元に戻す操作はクリエイティブで使えます。");return}const i=N,t=i.world.undo((e,n,s)=>oo(i.player,e,n,s));ke(),W.toast(t.message)}function Un(){N&&(W.screen==="inventory"?W.inventory(Lr()):W.screen==="play"&&W.hud(Lr()))}function ke(){Ia="",Ua=0,gr=0,La=0,W.mining(0)}function Bl(i){i!==Ru&&(Ru=i,Je.style.setProperty("--aim-y",i+"%"))}function Jf(){const i=N;if(!(!i||!["play","pause","ready"].includes(W.screen))){i.kids?(i.kidsPitch=i.player.pitch,i.player.pitch=i.originalPitch):(i.originalPitch=i.player.pitch,i.player.pitch=i.kidsPitch),i.kids=!i.kids,Et.rememberView(i.player),Et.mining=!1,Et.cancelPlacementTap(),ke(),mi=0,i.view.kidsCamera.reset(),Bl(50),gi="",W.showViewMode(i.kids);try{localStorage.setItem(Yf,i.kids?"kids":"original")}catch{}}}function Ir(i){!N||N.online?.tagGame||!Number.isInteger(i)||i<0||i>8||(N.data.selected=i,ke(),Un(),ka(N))}function bi(){Et.stop(),N&&If(N.player),Oe.setPlaying(!1),ke(),mi=0,Na=0,Ts=0}function lo(){!N||!Et.active||(bi(),W.pause(!1,ve))}function Qf(){!N||!Et.active||N.online?.tagGame||(ie=null,bi(),W.inventory(Lr()))}function td(i){const t=i&&ve==="tablet";Nl.hidden=!t,wu.hidden=N?.data.mode!=="creative"||!!N.online?.tagGame;const e=!!N?.player.flying;return wu.setAttribute("aria-pressed",String(e)),al.jump.textContent=e?"上昇":"ジャンプ",al.down.textContent=e?"下降":"しゃがむ",t}function ed(i){if(!N||!Et.active)return;i&&ve==="lock"&&(ve=Ol());const t=N.online?.tagGame;if(t&&!t.started){const{x:e,z:n}=N.player;t.peers.some(({pose:s})=>Math.hypot(e-s.x,n-s.z)<=1.2)&&ud(N,t.peers),t.started=!0}W.play(i,kl,Et.pending,td(i)),W.hud(Lr()),ks()}function Fa(i){if(!(!N||!["ready","pause","inventory"].includes(W.screen))){if(!yi){W.pause(!1,ve,"描画の復旧を待っています。ワールドを書き出すこともできます。");return}if(N.online&&(!N.online.ready||N.online.ended)){W.toast(N.online.ended?"退出してルームに参加し直してください。":"共有ワールドの読み込みが完了するまでお待ちください。");return}ie=null,kl=!N.data.guideSeen&&!N.online?.tagGame,ve=i,Fs=!1,Ts=0,Ms=0,fr=0,Oe.unlock(),Oe.setPlaying(!0),Et.start(i!=="lock"),Et.pending&&ed(!1)}}function Q1(i,t){N&&Et.applyLook(N.player,i,t,Re.sensitivity,Re.invertY)}const vr={conflict:"ほかの人が先にこの場所を変更しました。照準を合わせ直してください。",range:"ブロックにもう少し近づいてください。",blocked:"ここは設置・採掘できません。建材や人が重なっていない場所を選んでください。",limit:"このルームで共有できるブロック変更数に達しました。",uncertain:"通信を確認しています。建築の結果が画面に反映されるまでお待ちください。",offline:"接続が戻ると建築できます。",invalid:"編集内容を共有できませんでした。照準を合わせ直してください。"};function nd(i,t,e){const{key:n,block:s,before:r}=t,a=n&255,o=n>>>16,c=n>>>8&255,l=s===0,h=l?r:s;i.view.effect(a,o,c,h,l?"mine":"place"),Oe.sound(l?"mine":"place",h),l&&i.data.mode==="explore"&&Oe.sound("pickup"),!l&&i.data.mode==="explore"&&Wu(i.data.journey,h,{x:a,y:o,z:c})&&ks(),W.toast(e??Qt[h].name+(l?"を取り除きました。":"を置きました。"))}function Hl(i){const t=i.online,e=t?.pendingExplore;!t?.sync||!e||t.editing||t.ended||t.state!=="connected"||(t.editing=!0,t.sync.edit(e.edit).then(n=>{if(N===i){if(!n.ok&&!["conflict","range","blocked","limit","invalid"].includes(n.reason??"")){n.reason==="uncertain"&&W.toast(vr.uncertain);return}t.pendingExplore=void 0,n.ok?(i.data.bag=e.after,nd(i,e.edit,e.message),Un()):W.toast(vr[n.reason??""]??vr.invalid),un(i)}}).catch(n=>{N===i&&W.toast(Fn(n))}).finally(()=>{t.editing=!1}))}function id(i,t,e,n,s,r="y",a,o){const c=i.online;if(!c?.ready||c.ended||c.state!=="connected"||!c.sync){W.toast(vr.offline);return}if(c.editing||c.pendingExplore)return;const l=i.world.get(t,e,n),h=Ne(t,e,n),u={key:h,before:l,fromRevision:c.versions.get(h)??0,block:s,axis:r};if(a){c.pendingExplore={edit:{...u,actionId:crypto.randomUUID()},after:a,message:o},un(i),Hl(i);return}c.editing=!0,c.sync.edit(u).then(f=>{if(N===i){if(!f.ok){W.toast(vr[f.reason??""]??"共同建築の変更を確認できませんでした。");return}nd(i,u)}}).catch(f=>{N===i&&W.toast(Fn(f))}).finally(()=>{c.editing=!1})}function sd(){if(!N||!Et.active||N.online?.tagGame)return;const{world:i,player:t,data:e,view:n}=N,s=Mi(i,t);if(!t.crouched&&$f(s))return;if(s&&N.land?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz)){W.toast("住民や動物がいる場所には置けません。");return}const r=s&&e.mode==="creative"?i.capture(s.x+s.nx,s.y+s.ny,s.z+s.nz):null,a=e.bag.hotbar[e.selected],o=a===Kn?Kn+pi:a;if(N.online){if(co(N))return;const l=Ll(i,t,e.bag,e.mode,e.selected,s);if(l||!s){W.toast(l??"設置したい面に照準を合わせてください。");return}if(!Or(a,e.mode)){W.toast("共有ワールドで使える建材を選んでください。");return}const h=e.mode==="explore"?structuredClone(e.bag):void 0;if(h&&!Ou(h,a))return;id(N,s.x+s.nx,s.y+s.ny,s.z+s.nz,o,a===5?ui:"y",h),ke();return}const c=Cx(i,t,e.bag,e.mode,e.selected,s,o);if(c.ok&&s){const l=s.x+s.nx,h=s.y+s.ny,u=s.z+s.nz;a===5&&i.setAxis(l,h,u,ui),r&&i.remember(r),e.mode==="explore"&&Wu(e.journey,a,{x:l,y:h,z:u})&&ks(),n.effect(l,h,u,a,"place"),Oe.sound("place",a),Un(),ke()}W.toast(c.message)}function rd(){!N||!Et.active||N.online?.tagGame||(N.data.bag.hotbar[N.data.selected]===Kn?(pi=(pi+1)%4,W.toast("滑り台の下り方向　"+Xf[pi])):(ui=ui==="y"?"x":ui==="x"?"z":"y",W.toast("原木の向き　"+{x:"東西",y:"縦",z:"南北"}[ui])))}function Vl(i){if(!N||!Et.active||N.online?.tagGame)return;const{world:t,player:e,data:n,view:s}=N,r=Mi(t,e);if(!Et.mining||!r){Ia&&ke();return}if(mi>0||N.online?.editing||co(N))return;const a=[r.x,r.y,r.z,r.id,n.selected].join("/");if(a!==Ia&&(ke(),Ia=a),r.id===14){W.toast("岩盤は掘れません。"),Et.mining=!1,ke();return}const o=n.bag.hotbar[n.selected],c=n.mode==="creative"||Nn(n.bag,o)?o:0,l=Ed(r.id,c,n.mode);if(!Number.isFinite(l)){W.toast("この素材にはツルハシが必要です。"),Et.mining=!1,ke();return}if(Ua+=i,gr=Math.min(1,Ua/l),W.mining(gr),La-=i,La<=0&&i>0&&gr<.96&&(Oe.sound("tap",r.id),La=.32),Ua<l&&!(n.mode==="creative"&&i===0))return;if(N.online){if(!Or(r.id,n.mode)){W.toast("このブロックは共有ワールドで取り除けません。"),Et.mining=!1,ke();return}const f=n.mode==="explore"?ku(n.bag,r.id,c):void 0;if(f&&!f.draft){W.toast(f.message),Et.mining=!1,ke();return}N.online.state!=="connected"&&(Et.mining=!1),id(N,r.x,r.y,r.z,0,"y",f?.draft,f?.message),ke(),mi=.15;return}const h=n.mode==="creative"?t.capture(r.x,r.y,r.z):null,u=Rx(t,e,n.bag,n.mode,n.selected,r);u.ok?(h&&t.remember(h),s.effect(r.x,r.y,r.z,r.id,"mine"),Oe.sound(u.message.includes("壊れ")?"break":"mine",r.id),n.mode==="explore"&&Oe.sound("pickup"),Un()):Et.mining=!1,W.toast(u.message),ke(),mi=n.mode==="creative"?.15:.11}function ad(){if(!N||!Et.active||N.online?.tagGame)return;const{player:i,data:t}=N;if(t.mode!=="creative"){W.toast("飛行はクリエイティブモードで使えます。");return}i.flying=!i.flying,i.vy=0;const e=td(Et.drag);W.toast(i.flying?e?"飛行中：上昇・下降ボタンで高さを変えられます。":"飛行中：Spaceで上昇、Ctrlで下降":"飛行を終了しました。")}function ll(){const i=N,t=i?.aquatic;return!i||!t||!Et.active||!t.attack(i.player)?!1:(Et.mining=!1,ke(),t.sharkDefeated&&!i.data.sharkDefeated&&(i.data.sharkDefeated=!0,un(i)),!0)}function tM(i){const t=i.world.spawn();let e;try{e=Pr(i.world,t)}catch{e=Pr(i.world,{...t,y:bn+3})}Object.assign(i.player,Dl({...e,pitch:i.kids?i.kidsPitch:e.pitch})),i.kids||(i.originalPitch=i.player.pitch),Et.reset(),Et.rememberView(i.player),ke(),mi=0,i.view.kidsCamera.reset(),i.aquatic?.resetHealth(),W.toast("岸に戻りました。持ち物は引き継がれています。")}function od(i,t){const e=i.aquatic,n=e?.health??100,s=e?.sharkHealth??100,r=!!e?.hasAquaticLife&&(i.player.inWater||n<100);G1.hidden=!r&&!t,W1.hidden=!t,Y1.hidden=!t||!Et.drag,Tu.value!==n&&(Tu.value=n,X1.textContent=String(n)),Au.value!==s&&(Au.value=s,q1.textContent=String(s))}const Et=new qx(Qn,{pause:lo,inventory:Qf,place:sd,select:Ir,look:Q1,beginMine:()=>{ll()||Vl(0)},pick:$1,undo:J1,viewMode:Jf,tagMap:hd,attack:()=>{!ll()&&N?.aquatic&&W.toast("近くのサメに照準を合わせてください。")},rotate:rd,interact:()=>{N&&$f(Mi(N.world,N.player),!0)},home:()=>{if(N){const{x:i,y:t,z:e}=N.player;N.data.journey.home={x:i,y:t,z:e},ks(),W.toast("現在地を拠点に登録しました。")}},guide:()=>{N&&(N.data.journey.hidden=!N.data.journey.hidden,ks())},cycle:i=>{N&&Ir((N.data.selected+i+9)%9)},fly:ad,debug:()=>{_r=!_r,_r||W.debug("")},dragChanged:ed,background:()=>{N&&un(N)},recovery:i=>{N&&(bi(),ve=Ol(),W.pause(!1,ve,i))}},al);function cd(i){const{x:t,y:e,z:n,yaw:s,pitch:r}=i.player;return{...i.data,sharkDefeated:i.aquatic?.sharkDefeated??i.data.sharkDefeated,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:i.player.crouched},flying:i.player.flying,edits:i.world.exportEdits(),fixtures:i.world.exportFixtures(),journey:structuredClone(i.data.journey),settings:{...Re},bag:structuredClone(i.data.bag)}}function un(i){if(i.online){if(i.data.mode==="explore"){const{x:t,y:e,z:n,yaw:s,pitch:r,crouched:a}=i.player;v1(i.online.connection.room.code,i.online.nickname,{bag:i.data.bag,selected:i.data.selected,journey:i.data.journey,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:a},pending:i.online.pendingExplore})}return Promise.resolve(!0)}return hc=hc.then(async()=>{if(i!==N)return!0;W.status("保存中…");try{const t=await vi.write(cd(i),i.data.revision||null);return i.data.revision=t.revision,i.data.updatedAt=t.updatedAt,W.status("保存済み"),!0}catch(t){return W.status("保存失敗："+Fn(t)),!1}}),hc}function ka(i){if(i.online&&i.data.mode==="explore")return un(i)}async function xr(){if(N){const i=N;if(bi(),i.online?.sync?.close(),!await un(i)&&!window.confirm("保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？")){W.pause(!1,ve);return}ld(i),i.view.dispose(),N=null}W.onlineSession(null),W.title(!1);try{const i=await vi.list();W.screen==="title"&&W.title(!!i.length)}catch(i){W.screen==="title"&&W.status("保存領域："+Fn(i))}}function ld(i){i.land?.dispose(),i.aquatic?.dispose()}function Oa(i){W.onlineSession({code:i.connection.room.code,count:i.count,state:i.state})}function ho(i,t=performance.now()){const e=i.online,n=e?.tagGame;if(!e||!n)return;const s=n.status,r=s?.it===e.connection.id,a=s?.phase==="hiding",o=s?.phase==="playing",c=o||a?r?"鬼":"逃げ役":"参加者を待っています",l=a?Math.max(0,Math.ceil((s.hideUntil-Date.now())/1e3)):0,h=a?(r?"鬼のスタートまで ":"隠れる時間 ")+l+"秒":o?r?"逃げ役にぶつかるとタッチ":"鬼から逃げて隠れよう":"2人以上で開始",u=[c,h,n.open].join("/");n.uiKey!==u&&(W.tagMode({label:c,hint:h,it:r,mapOpen:n.open}),n.uiKey=u),n.open&&t>=n.mapDue&&(n.map.update(n.peers,i.player,o),n.mapDue=t+240)}function hd(){const i=N,t=i?.online?.tagGame;!i||!t||!Et.active||(t.open=!t.open,t.mapDue=0,ho(i))}function ud({world:i,player:t},e){for(const[n,s]of[[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,2],[2,-2]]){const r=Pr(i,{...t,x:t.x+n,z:t.z+s});if(e.every(({pose:a})=>Math.hypot(r.x-a.x,r.z-a.z)>1.2)){Object.assign(t,{x:r.x,y:r.y,z:r.z});return}}}function eM(i,t,e){const{player:n,world:s}=i;let r=!1;for(const l of e.cells){const{key:h,block:u,axis:f,revision:d}=l;if((t.versions.get(h)??0)>=d)continue;const g=h&255,_=h>>>16,p=h>>>8&255;s.get(g,_,p)!==u&&s.set(g,_,p,u)&&li(u)&&oo(n,g,_,p)&&(r=!0),u===5&&s.setAxis(g,_,p,f),t.versions.set(h,d)}if(r){const{x:l,y:h,z:u}=Pr(s,n,!0);Object.assign(n,{x:l,y:h,z:u,vy:0}),If(n)}const a=e.players.filter(l=>l.id!==t.connection.id),o=t.tagGame;if(!t.ready&&!t.restoring&&!o&&a.length&&ud(i,a),o){const l=o.status;o.status=e.tag,o.peers=a,l&&e.tag?.previousIt&&e.tag.seq>l.seq&&(e.tag.it===t.connection.id?W.toast("タッチされました！ あなたが鬼です。"):e.tag.previousIt===t.connection.id&&W.toast("タッチ成功！ 逃げ役になりました。")),ho(i)}const c=o?.status?.phase==="hiding"&&o.status.it===t.connection.id;i.view.actors.setPlayers(c?[]:a,o?.status?.it),t.count!==a.length+1&&(t.count=a.length+1,Oa(t)),t.ready=!0,gi="",ie?.id===21&&s.get(ie.x,ie.y,ie.z)!==21&&(ie=null,Un(),W.toast("作業台が取り除かれました。")),Hl(i)}function nM(i,t){Oa(t),t.sync=Ja.start(t.connection,{pose:()=>{if(N!==i||t.tagGame&&!t.tagGame.started)return null;const{x:e,y:n,z:s,yaw:r,crouched:a,flying:o,vx:c,vz:l}=i.player;return{x:e,y:n,z:s,yaw:r,crouched:a,flying:o,moving:Math.hypot(c,l)>.18}},onFrame:e=>{N===i&&eM(i,t,e)},onState:e=>{N===i&&(t.state=e,Oa(t),Hl(i))},onEnd:e=>{N===i&&(t.ended=!0,t.state="reconnecting",Oa(t),bi(),W.pause(!1,ve,Fn(e)))}})}async function wa(i,t,e,n="",s=""){if(N||gn)return;if(!yi){W.error(zl);return}gn=!0;let r;try{e&&(W.loading("ルームに接続中…"),r=await e()),W.loading("森と湖を準備しています…");const a=i?await vi.get(i):void 0;if(i&&!a)throw new Error("ワールドが見つかりません。一覧を開き直してください。");const o=r?.room.seed||a?.seed||t?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8),c=t?.stage,l=r?"classic":a?.stage??(Il(c)?c:"classic");let h=-1;const u=await io.generate(o,E=>{const M=Math.min(10,Math.floor(E*10));h!==M&&(W.loading("地形を生成中　"+M*10+"%"),h=M)},r?.room.generator??a?.generator??2,l);a&&(u.loadEdits(a.edits),u.loadFixtures(a.fixtures));const f=u.spawn(),d=r?.room.mode==="tag",g=r?r.room.mode==="explore"?"explore":"creative":l!=="classic"?"creative":t?.mode??a?.mode??"creative",_=r&&g==="explore"?_1(r.room.code,s):void 0,p=a??{format:"webcraft777",version:2,generator:2,id:crypto.randomUUID(),fixtures:Bu(),journey:_?.journey??Vu(),revision:0,updatedAt:Date.now(),name:r?.room.name||t?.name.trim().slice(0,64)||"新しいワールド",seed:o,mode:g,stage:l,pose:_?.pose??f,flying:!1,bag:_?.bag??yd(d?"explore":g),selected:_?.selected??0,edits:[],day:.39,settings:{...Re},guideSeen:!1};if(!a&&l!=="classic"&&(p.bag.hotbar=[7,8,10,27,28,29,Kn,9,12]),!p.journey.home){const{x:E,y:M,z:A}=f;p.journey.home={x:E,y:M,z:A}}ie=null,ui="y",pi=0,cl="",Re={...p.settings},Fl();const m=Dl(Pr(u,p.pose,!!(a||_)));m.flying=p.mode==="creative"&&p.flying;const b=new Ox(Qn,u);if(N={world:u,data:p,player:m,view:b,kids:Z1(),originalPitch:m.pitch,kidsPitch:-.43},N.kids&&(m.pitch=N.kidsPitch),b.configure(Re),gi="",Bl(50),Et.rememberView(m),Fs=!1,ve=Kf(),r){const E={connection:r,state:"connecting",count:1,ready:!1,ended:!1,editing:!1,versions:new Map,nickname:s,restoring:!!_,pendingExplore:_?.pending};N.online=E,d&&(E.tagGame={map:new H1(V1,u),peers:[],started:!1,open:!1,mapDue:0,uiKey:""},ho(N)),nM(N,E)}else l!=="flat"&&(l==="classic"&&(N.land=new L1(u,b.scene,m)),N.aquatic=new z1(u,b.scene,p.sharkDefeated));od(N,!1),W.setWorld(p.name),W.showViewMode(N.kids),W.pause(!0,ve),!a&&!r&&await un(N),_r=!1}catch(a){N?.online?.sync?N.online.sync.close():r&&Ja.leave(r),N&&(ld(N),N.view.dispose(),N=null),W.onlineSession(null),W.tagMode(null),e?W.onlineMenu(n,Fn(a)):(console.error(a),W.error(Fn(a)))}finally{gn=!1}}async function iM(){const i=N?.online?.connection.room.code;if(!i)return;const t=new URL(location.href);t.searchParams.set("room",i);try{await navigator.clipboard.writeText(t.href),W.toast("招待リンクをコピーしました。")}catch{window.prompt("招待リンクをコピーしてください。",t.href)}}async function fd(){try{const i=await vi.list();W.worlds(i)}catch(i){W.worlds([]),W.status("保存失敗："+Fn(i))}}async function sM(i){if(!(!i||gn)){gn=!0;try{if(i.size>128*1024*1024)throw new Error("バックアップは128 MBまで読み込めます。");const{save:t,original:e}=t1(await i.text()),n=await io.generate(t.seed,void 0,t.generator,t.stage);n.loadEdits(t.edits),n.loadFixtures(t.fixtures);const s=(await vi.list()).find(r=>r.id===t.id);if(s&&!await W.confirmImport(s.name))return;await vi.write(e??t,s?.revision??null),await fd(),W.status("読み込み・保存が完了しました。")}catch(t){W.status("読み込み失敗："+Fn(t))}finally{gn=!1}}}async function Cu(i,t=!1){const e=i?t?await vi.original(i):await vi.get(i):N?cd(N):void 0;if(t&&!e){W.toast("このワールドには旧版の保管データがありません。");return}if(!e)throw new Error("書き出すワールドが見つかりません。");dd("ウェブクラフト777-"+e.name.replace(/[\\/:*?"<>|]/g,"_")+".json",e1(e)),W.status("バックアップファイルを書き出しました。")}function dd(i,t){const e=URL.createObjectURL(new Blob([t],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=i,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),6e4)}async function Gl(i,t){if(!(gn&&!["resume","resume-drag","resume-lock","resume-tablet","dismiss-guide"].includes(i))){if(N&&co(N)&&["assign","craft","split","sort"].includes(i)){W.toast("素材の変更を確認しています。少し待ってください。");return}switch(i){case"goto-create":W.create();break;case"online-menu":W.onlineMenu(ol);break;case"online-create":Oe.unlock(),await wa(null,void 0,()=>Ja.create(t),"",t.nickname);break;case"online-join":Oe.unlock(),await wa(null,void 0,()=>Ja.join(t),t.code,t.nickname);break;case"online-copy":await iM();break;case"tag-map":hd();break;case"online-leave":if(N?.online){gn=!0;try{await xr()}finally{gn=!1}}break;case"goto-worlds":await fd();break;case"goto-help":W.help();break;case"goto-settings":W.settings(Re);break;case"back":N?W.screen==="inventory"?Fa(ve):W.pause(!1,ve):await xr();break;case"title":if(!gn){gn=!0;try{await xr()}finally{gn=!1}}break;case"start":Oe.unlock(),await wa(null,t);break;case"load":Oe.unlock(),await wa(t);break;case"resume":Fa(ve);break;case"resume-drag":case"resume-lock":case"resume-tablet":{const e=i==="resume-tablet"?"tablet":i==="resume-drag"?"drag":"lock";try{localStorage.setItem(qf,e)}catch{}Fa(e);break}case"diagnostics":if(N){Et.setDiagnostics(!0);const e=Et.report(),n="視点入力 "+e.lookEvents+" 回　フレーム "+e.frames+" 回　異常 "+e.anomalies+" 件";W.diagnostics(e.lastIssue?n+`
`+e.lastIssue:n,JSON.stringify(e,null,2))}break;case"export-diagnostics":N&&dd("ウェブクラフト777-入力診断.json",JSON.stringify(Et.report(),null,2));break;case"reset-input":N&&(bi(),Et.rememberView(N.player),ve=Ol(),W.pause(!1,ve,"入力をリセットしました。「再開」から操作できます。"));break;case"pause":lo();break;case"attack-shark":ll();break;case"rotate-material":rd();break;case"view-mode":Jf();break;case"touch-fly":Nl.hidden||ad();break;case"inventory":Qf();break;case"select":Ir(t);break;case"assign":N&&(!N.online||Or(t.id,N.data.mode))&&Lu(N.data.bag,t.slot,t.id,N.data.mode)&&(Un(),ka(N),W.toast("ホットバーに登録しました。"));break;case"craft":if(N&&N.data.mode==="explore"&&W.screen==="inventory"){const e=t.count??1,n=t.id??t;if(N.online&&n==="chest"){W.toast("共有ワールドでは作業台を使えます。");break}const s=Sd(N.data.bag,n,e,Zf(N));s.ok&&(ie?.id===21&&N.world.useBench(ie.x,ie.y,ie.z,e),Ud(N.data.journey,n),Oe.sound("craft"),Un(),ka(N)),W.toast(s.message)}break;case"mine-down":Et.active&&(Et.mining=!0,Vl(0));break;case"mine-up":Et.mining=!1,ke();break;case"place":sd();break;case"supply":{if(N&&W.screen==="inventory"&&ie?.id===22){const e=Rd(N.data.bag,N.data.mode,t.id,t.count);W.toast(e.message),e.ok&&Un()}break}case"split":case"sort":case"transfer":case"transfer-all":{if(!N||W.screen!=="inventory")break;const e=N.data.bag,n=ie?.id===22?N.world.chestAt(ie.x,ie.y,ie.z):void 0,s=t?.side==="chest"?"chest":"bag",r=s==="bag"?e.slots:n;if(!r)break;const a=i==="sort"?Td(r):i==="split"?wd(r,t.index):n?i==="transfer-all"?Cd(e,n,s):zu(e,n,s,t.index,t.half):void 0;a&&(W.toast(a.message),a.ok&&(Un(),ka(N)));break}case"preset":{if(Object.hasOwn(Ba,t)){const e=t;await Gl("settings-change",{...Re,...Ba[e],quality:e}),W.settings(Re)}break}case"original":await Cu(t,!0);break;case"save":N&&await un(N);break;case"settings-change":pl(t)&&(Re={...t},Qx(Re),N?.view.configure(Re),gi="",Fl());break;case"dismiss-guide":N&&(N.data.guideSeen=!0),kl=!1;break;case"import":await sM(t);break;case"export":await Cu(t);break}}}document.addEventListener("keydown",i=>{if(i.repeat||i.defaultPrevented||Et.active||document.querySelector("dialog[open]"))return;const t=/^Digit([1-9])$/.exec(i.code);if(W.screen==="inventory"&&t){i.preventDefault(),Ir(Number(t[1])-1);return}W.screen==="inventory"&&(i.code==="KeyE"||i.code==="Escape")?(i.preventDefault(),i.code==="Escape"?W.pause(!1,ve):Fa(ve)):i.code==="Escape"&&["settings","help","create","worlds","diagnostics","online"].includes(W.screen)&&(i.preventDefault(),Gl("back"))});Qn.addEventListener("webglcontextlost",i=>{i.preventDefault(),yi=!1,lo(),N&&un(N),W.error("3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。")});Qn.addEventListener("webglcontextlost",i=>{i.preventDefault(),yi=!1,Fs=!0,bi(),N?(W.pause(!1,ve,"3D描画を中断しました。復旧後に再開できます。"),un(N)):W.error(zl)});Qn.addEventListener("webglcontextrestored",()=>{yi=!0,Fs=!1,gi="",N?(N.view.configure(Re),W.pause(!1,ve,"3D描画が復旧しました。操作を再開できます。")):xr()});window.addEventListener("pagehide",i=>{N&&(Et.active&&lo(),N.online?(un(N),i.persisted||N.online.sync?.close()):un(N))});window.setInterval(()=>{N&&!document.hidden&&un(N)},25e3);function pd(i){if(requestAnimationFrame(pd),!N||!yi||Fs||document.hidden){Ts=0;return}try{rM(i)}catch(t){Fs=!0,Et.fail(t),console.error(t)}}function rM(i){if(!N)return;const t=N,e=Ts?(i-Ts)/1e3:0,n=Math.min(e,.1);Ts=i;const s=t.online?.tagGame;if(Et.active){const p=t.player,m=Et.movement(),b=p.x,E=p.z;if(!Et.frame(p,e))return;const M=!!s?.status?.it&&s.status.it===t.online?.connection.id;s&&(m.sprint=!0,M&&s.status?.phase==="hiding"&&(m.forward=m.right=0,m.jump=m.jumpPressed=!1),ho(t,i)),Tx(t.world,p,m,n,M?{...Re,sprintMultiplier:1.25}:Re),Oe.environment(t.world,p,n),t.land?.update(p,n,t.data.day);const A=t.aquatic;A?.update(p,n);const T=A?.consumeEvent();T&&W.toast(T),A&&A.health<=0&&tM(t),lc-=n,lc<=0&&(lc=.24,t.data.mode==="explore"&&Nd(t.data.journey,t.world,p,t.data.bag),ks()),Na+=Math.hypot(b-p.x,E-p.z),Na>1.8&&(Na=0,p.grounded&&!p.flying&&Oe.sound("step",t.world.get(Math.floor(p.x),Math.floor(p.y-.05),Math.floor(p.z)))),t.data.day=t.online?(.39+Math.max(0,Date.now()-t.online.connection.room.createdAt)/6e5)%1:(t.data.day+n/600)%1,mi=Math.max(0,mi-n),Vl(n)}const r=Et.active&&!s?Mi(t.world,t.player):null;if(Et.active)gi="";else{const p=Qn.clientWidth+"/"+Qn.clientHeight+"/"+t.data.id;if(gi===p&&!t.view.stats.queued)return;gi=p}const a=Et.active&&!!t.aquatic?.canAttack(t.player),o=Et.active&&!a?t.land?.targetLabel(t.player,r?.distance):null;Et.active&&od(t,a);const c=s?0:t.data.bag.hotbar[t.data.selected],l=r&&!t.player.crouched&&(t.online?t.data.mode==="explore"&&r.id===21:[21,22].includes(r.id)),h=c===Kn;Ea.hidden=!Et.active||!Et.drag||!h||a;const u="向き "+Xf[pi];!Ea.hidden&&Ea.textContent!==u&&(Ea.textContent=u);const f=r&&!l&&!a&&!o&&Qt[c]?.block&&!Et.mining?{x:r.x+r.nx,y:r.y+r.ny,z:r.z+r.nz,id:h?Kn+pi:c,axis:ui,valid:!Ll(t.world,t.player,t.data.bag,t.data.mode,t.data.selected,r)&&!t.land?.occupies(r.x+r.nx,r.y+r.ny,r.z+r.nz)}:null,d=Nl.hidden?"右クリック":"タップ";W.target(a?Et.drag?"サメ　攻撃ボタン / X":"サメ　左クリック / X":o?o+"　"+d+"で話す":l?d+(r.id===21?"で作業台":"でチェスト"):"");const g=Math.hypot(t.player.vx,t.player.vz),_=t.data.mode==="creative"||Nn(t.data.bag,c)?c:0;if(t.view.update(t.player,r,t.data.day,Et.active?n:0,{active:Et.active,held:_,mining:gr,preview:f,moving:Re.bob&&t.player.grounded&&g>.15,sprinting:g>4.5},t.kids?{player:t.player,hit:r}:void 0,!!s),t.kids&&Bl(Math.round(t.view.kidsCamera.reticle.y*20)/20),Et.active&&_r){if(fr++,!Ms)Ms=i,fr=0;else if(i-Ms>600){const{x:p,y:m,z:b}=t.player,E=t.view.stats;W.debug(Math.round(fr*1e3/(i-Ms))+" FPS　描画 "+E.draws+" 回　チャンク "+E.chunks+`
三角形 `+E.triangles.toLocaleString("ja-JP")+"　更新 "+E.chunkMs.toFixed(1)+" ms　待ち "+E.queued+`
形状 `+E.geometries+" 個　テクスチャ "+E.textures+` 個
座標 `+[p,m,b].map(M=>M.toFixed(1)).join(" / ")),fr=0,Ms=i}}}Fl();xr().then(()=>{yi?/^[A-HJ-NP-Z2-9]{8}$/.test(ol)&&W.screen==="title"&&W.onlineMenu(ol):W.error(zl)});requestAnimationFrame(pd);
