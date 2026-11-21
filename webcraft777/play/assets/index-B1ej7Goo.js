(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Xa=27,Ni=64,_i=30,Kn={revolver:34,fireArrow:35,torch:36,rounds:37,bow:38};function po(i){return i===Kn.revolver||i===Kn.torch||i===Kn.bow||i===Kn.fireArrow}const So={name:"滑り台パーツ",color:"#e5ab52",block:!0},qa=i=>i>=31&&i<=33?_i:i,Jt={1:{name:"草地",color:"#89ac57",block:!0},2:{name:"土",color:"#9a6e4a",block:!0},3:{name:"石",color:"#889594",block:!0},4:{name:"砂",color:"#e5cf91",block:!0},5:{name:"原木",color:"#926541",block:!0},6:{name:"葉",color:"#659650",block:!0},7:{name:"木材",color:"#c69562",block:!0},8:{name:"丸石",color:"#839593",block:!0},9:{name:"石レンガ",color:"#a1aaa0",block:!0},10:{name:"朝霧ガラス",color:"#b7e3db",block:!0},11:{name:"石炭鉱石",color:"#666e74",block:!0},12:{name:"灯晶ブロック",color:"#ffce68",block:!0},13:{name:"水",color:"#65b4cb",block:!1},14:{name:"岩盤",color:"#404b4c",block:!1},15:{name:"石炭",color:"#47545c",block:!1},16:{name:"棒",color:"#b28a60",block:!1},17:{name:"木のツルハシ",color:"#bd9265",block:!1,maxDurability:36},18:{name:"石のツルハシ",color:"#839fa7",block:!1,maxDurability:90},19:{name:"木の斧",color:"#c58e61",block:!1,maxDurability:36},20:{name:"石の斧",color:"#8ba39b",block:!1,maxDurability:90},21:{name:"作業台",color:"#bc905c",block:!0},22:{name:"収納チェスト",color:"#ba793e",block:!0},23:{name:"潮晶鉱石",color:"#58c2bf",block:!0},24:{name:"潮晶のかけら",color:"#6ce5db",block:!1},25:{name:"青磁のランタン",color:"#75e8d9",block:!0},26:{name:"潮晶の象眼タイル",color:"#72bfb0",block:!0},27:{name:"ジャンプ台（小）",color:"#62c8a2",block:!0},28:{name:"ジャンプ台（中）",color:"#6eaee8",block:!0},29:{name:"ジャンプ台（大）",color:"#d892dd",block:!0},30:So,31:So,32:So,33:So,34:{name:"リボルバー",color:"#65747e",block:!1},35:{name:"火矢",color:"#ed8243",block:!1},36:{name:"たいまつ",color:"#fdb35a",block:!1},37:{name:"リボルバーの弾",color:"#d8ab66",block:!1},38:{name:"弓",color:"#a86943",block:!1}},vt=(i,t)=>({id:i,count:t});function Se(i,t,...e){return{id:i,name:Jt[t.id].name,inputs:e,output:t}}const Kf=[Se("boards",vt(7,4),vt(5,1)),Se("sticks",vt(16,4),vt(7,2)),Se("wood-pick",vt(17,1),vt(7,3),vt(16,2)),Se("wood-axe",vt(19,1),vt(7,3),vt(16,2)),Se("stone-pick",vt(18,1),vt(8,3),vt(16,2)),Se("stone-axe",vt(20,1),vt(8,3),vt(16,2)),Se("bricks",vt(9,4),vt(8,4)),Se("glass",vt(10,4),vt(4,3),vt(15,1)),Se("lamp",vt(12,2),vt(7,2),vt(15,1)),Se("bench",vt(21,1),vt(7,4)),Se("chest",vt(22,1),vt(7,6)),Se("jump-small",vt(27,1),vt(7,4),vt(16,2)),Se("jump-medium",vt(28,1),vt(7,5),vt(8,4)),Se("jump-large",vt(29,1),vt(7,6),vt(8,8)),Se("slide-part",vt(30,3),vt(7,6)),{...Se("crystal-lamp",vt(25,2),vt(24,1),vt(12,1)),bench:!0},{...Se("inlaid-tile",vt(26,8),vt(24,1),vt(8,4)),bench:!0},{...Se("crystal-cut",vt(24,2),vt(10,2),vt(15,1)),bench:!0,legacy:!0},{...Se("frontier-revolver",vt(34,1),vt(8,5),vt(7,3)),bench:!0,frontier:!0},{...Se("frontier-rounds",vt(37,10),vt(8,2),vt(15,1)),bench:!0,frontier:!0},{...Se("frontier-torch",vt(36,4),vt(16,2),vt(15,1)),frontier:!0},{...Se("frontier-arrow",vt(35,6),vt(16,3),vt(15,1)),frontier:!0},{...Se("frontier-bow",vt(38,1),vt(16,4),vt(7,2)),frontier:!0}];function Ya(i){return typeof i=="number"&&Number.isInteger(i)&&Object.hasOwn(Jt,i)&&i!==13&&i!==14&&qa(i)===i}function dh(i){if(!i||typeof i!="object")return!1;const{slots:t,hotbar:e}=i;return!Array.isArray(e)||e.length!==9||!Array.from(e).every(n=>n===0||Ya(n))?!1:Zf(t)}function Zf(i){return!Array.isArray(i)||i.length>Xa?!1:Array.from(i).every(t=>{if(!t||!Ya(t.id)||!Number.isInteger(t.count)||t.count<1||t.count>Ni)return!1;const e=Jt[t.id].maxDurability;return e===void 0?t.durability===void 0:t.count===1&&Number.isInteger(t.durability)&&t.durability>=1&&t.durability<=e})}function $f(i){return{slots:[],hotbar:i==="creative"?[1,2,3,5,7,8,9,10,12]:Array(9).fill(0)}}function bn(i,t){return i.slots.find(e=>e.id===t)}function rr(i,t){return i.slots.reduce((e,n)=>e+(n.id===t?n.count:0),0)}function Jf(i,t,e,n,s=!1){if(!Number.isInteger(t)||t<0||t>=9||!Ya(e)||(n==="creative"?!Jt[e].block&&!(s&&po(e)):!bn(i,e)))return!1;const r=i.hotbar.indexOf(e);return r>=0&&(i.hotbar[r]=i.hotbar[t]),i.hotbar[t]=e,!0}const ja=i=>({slots:i.slots.map(t=>({...t})),hotbar:[...i.hotbar]});function Qf(i,t){if(i.hotbar.includes(t))return;let e=i.hotbar.indexOf(0);e<0&&(e=i.hotbar.findIndex(n=>!bn(i,n))),e>=0&&(i.hotbar[e]=t)}function ph(i,t,e){const n=Jt[t].maxDurability;if(!n)for(const s of i.slots){if(s.id!==t)continue;const r=Math.min(e,Ni-s.count);if(s.count+=r,e-=r,!e)break}for(;e>0;){if(i.slots.length>=Xa)return!1;const s=n?1:Math.min(e,Ni);i.slots.push(n?{id:t,count:1,durability:n}:{id:t,count:s}),e-=s}return Qf(i,t),!0}function td(i,t,e){const n=i.slots.filter(s=>s.id===t).sort((s,r)=>s.count-r.count);for(const s of n){const r=Math.min(s.count,e);if(s.count-=r,e-=r,!e)break}i.slots=i.slots.filter(s=>s.count>0)}function mh(i,t){return Math.min(...t.inputs.map(e=>Math.floor(rr(i,e.id)/e.count)))}function ed(i,t){for(const e of t.inputs)td(i,e.id,e.count);return ph(i,t.output.id,t.output.count)}function gh(i,t,e){return t.frontier&&!e?.frontier?"西部の町で作れます。":t.legacy&&e?.generator!==1?"旧ワールド専用の加工です。":nd(t,e?.generator??1)&&!e?.bench?"作業台を右クリックして作ります。":mh(i,t)?"":"材料が足りません。"}function nd(i,t){return!!(i.bench||t===2&&["stone-pick","stone-axe","bricks","glass"].includes(i.id))}function jp(i,t,e){if(gh(i,t,e))return 0;const n=mh(i,t);if(!n)return 0;const s=ja(i);let r=0;for(;r<n&&ed(s,t);)r++;return r}function Kp(i,t,e=1,n){const s=Kf.find(a=>a.id===t);if(!s||!Number.isSafeInteger(e)||e<1)return{ok:!1,message:"レシピか制作数を確認してください。"};const r=gh(i,s,n);if(r)return{ok:!1,message:r};if(mh(i,s)<e)return{ok:!1,message:"材料が足りません。"};const o=ja(i);for(let a=0;a<e;a++)if(!ed(o,s))return{ok:!1,message:"所持品に空きがありません。"};return Object.assign(i,o),{ok:!0,message:s.name+"を"+s.output.count*e+"個作りました。"}}function Zp(i,t,e){return Jt[i]?.block?e==="creative"?.12:i===23&&t!==17&&t!==18?1/0:[3,8,9,11,23,26].includes(i)?(i===11?2.6:1.85)*(t===18?.19:t===17?.34:1):[5,7,21,22].includes(i)?t===20?.29:t===19?.48:1.12:i===6||i===10?.24:.48:1/0}function id(i,t,e){if(!Jt[t]?.block)return{message:"この素材は採取できません。"};if(t===23&&(![17,18].includes(e)||!bn(i,e)))return{message:"潮晶鉱石には木か石のツルハシが必要です。"};const n=ja(i),s=bn(n,e);let r=!1;s?.durability&&--s.durability<=0&&(n.slots.splice(n.slots.indexOf(s),1),r=!0);const o=t===3?8:t===11?15:t===23?24:qa(t),a=t===11||t===23?2:1;return ph(n,o,a)?{draft:n,message:Jt[o].name+" +"+a+(r?" ／ "+Jt[e].name+"が壊れました。":"")}:{message:"所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。"}}function sd(i,t){return!!Jt[t]?.block&&rd(i,t)}function rd(i,t){return bn(i,t)?(td(i,t,1),!0):!1}function $p(i,t){const e=i[t];if(!e||e.count<2)return{ok:!1,message:"2個以上の束を選んでください。"};if(i.length>=Xa)return{ok:!1,message:"分割するための空き枠がありません。"};const n=Math.floor(e.count/2);return e.count-=n,i.splice(t+1,0,{id:e.id,count:n}),{ok:!0,message:"束を2つに分けました。"}}function Jp(i){const t=[...i].sort((n,s)=>n.id-s.id||(n.durability??0)-(s.durability??0)),e=[];for(const n of t){const s=e.at(-1);let r=n.count;if(!n.durability&&s?.id===n.id){const o=Math.min(r,Ni-s.count);s.count+=o,r-=o}r&&e.push({...n,count:r})}return i.splice(0,i.length,...e),{ok:!0,message:"同じ素材をまとめて整頓しました。"}}function Qp(i,t,e,n){const s=i[e];if(!s||n<=0||n>s.count)return!1;const r=!!s.durability,o=Xa-t.length,a=r?0:t.reduce((l,h)=>l+(h.id===s.id?Ni-h.count:0),0);if(o*(r?1:Ni)+a<n)return!1;let c=n;if(!r)for(const l of t){if(l.id!==s.id)continue;const h=Math.min(Ni-l.count,c);if(l.count+=h,c-=h,!c)break}return c&&t.push({...s,count:c}),s.count-=n,s.count||i.splice(e,1),!0}function od(i,t,e,n,s=!1){const[r,o]=e==="bag"?[i.slots,t]:[t,i.slots],a=r[n];if(!a)return{ok:!1,message:"移す束を選んでください。"};const c=s?Math.ceil(a.count/2):a.count;return Qp(r,o,n,c)?(e==="chest"&&Qf(i,a.id),{ok:!0,message:Jt[a.id].name+"を"+c+"個移しました。"}):{ok:!1,message:"移動先の空きが足りません。"}}function tm(i,t,e,n){if(t!=="creative"||!Ya(e)||!Jt[e].block||![1,Ni].includes(n))return{ok:!1,message:"建材と個数を確認してください。"};const s=ja(i);return ph(s,e,n)?(Object.assign(i,s),{ok:!0,message:Jt[e].name+"を"+n+"個補充しました。"}):{ok:!1,message:"所持品の空きが足りません。"}}function em(i,t,e){const n=e==="bag"?i.slots:t;let s=0;for(let r=n.length-1;r>=0;r--)od(i,t,e,r).ok&&s++;return{ok:s>0,message:s?s+"束を移しました。"+(n.length?"空き不足で残った束があります。":""):"移動できる束がありません。"}}function nm(i){const t=r=>Math.floor(i.noise(r,777)*9)-4,n=[{kind:"grove",name:"風待ちの大樹",x:91+t(1),z:150+t(2)},{kind:"cave",name:"潮晶の岩窟",x:163+t(3),z:151+t(4)},{kind:"ruin",name:"潮見の回廊",x:117+t(5),z:188+t(6)}].map(r=>({...r,y:Math.max(31,Math.min(48,i.ground(r.x,r.z)))+1})),s=(r,o,a,c,l)=>{const h=i.ground(r,o);for(let u=Math.min(h,a)-3;u<=a;u++)i.put(r,u,o,u===a?c:u>=a-2?2:3);for(let u=a+1;u<=Math.max(l,h+10);u++)i.put(r,u,o,0)};for(const r of n){const o=r.y-1,a=r.kind==="cave"?r.x-3:r.x,c=r.kind==="grove"?r.z-3:r.kind==="ruin"?r.z-5:r.z,l=Math.max(Math.abs(a-128),Math.abs(c-139));for(let h=2;h<=l;h++){const u=h/l,f=Math.round(128+(a-128)*u),d=Math.round(139+(c-139)*u),g=Math.min(1,Math.max(0,h-5)/(l-12)),v=32+Math.round((o-32)*g);for(let p=-1;p<=1;p++)for(let m=-1;m<=1;m++){const _=p===0&&m===0&&i.noise(f,d)>.68?8:1;s(f+p,d+m,v,_,v+3)}}if(r.kind==="grove"){for(let h=-6;h<=6;h++)for(let u=-6;u<=6;u++)h*h+u*u<38&&s(r.x+h,r.z+u,o,1,o+13);for(let h=0;h<2;h++)for(let u=0;u<2;u++)for(let f=1;f<=12;f++)i.put(r.x+h,o+f,r.z+u,5);for(const[h,u,f,d]of[[-3,0,4,10],[3,0,4,11],[0,-3,3,11],[0,3,4,12],[0,0,4,14]]){for(let g=1;g<=3;g++)i.put(r.x+Math.round(h*g/3),o+d-3+g,r.z+Math.round(u*g/3),5);for(let g=-f;g<=f;g++)for(let v=-f;v<=f;v++)for(let p=-2;p<=2;p++)(g*g+v*v)/(f*f)+p*p/5>1.12+i.noise(g+r.x,v+r.z)*.12||i.get(r.x+h+g,o+d+p,r.z+u+v)||i.put(r.x+h+g,o+d+p,r.z+u+v,6)}for(const[h,u]of[[-1,0],[2,1],[0,-1],[1,2]])i.put(r.x+h,o+1,r.z+u,5)}else if(r.kind==="cave"){for(let h=-3;h<=20;h++)for(let u=-9;u<=9;u++){const f=r.x+h,d=r.z+u,g=Math.max(0,1-((h-8)/13)**2-(u/9)**2);if(!g&&(h>2||Math.abs(u)>3))continue;const v=o+Math.round(g*8);s(f,d,v,1,v+4);for(let p=o-2;p<v;p++)i.put(f,p,d,3);if(h>=-3&&h<=15){const p=h<4?1:h<13?3:2;if(Math.abs(u)<=p){i.put(f,o,d,i.noise(f,d)>.72?8:3);for(let m=1;m<=(p===3?4:3);m++)i.put(f,o+m,d,0)}}}for(const[h,u,f]of[[5,1,-4],[6,2,-4],[7,2,-4],[9,1,4],[10,2,4],[11,1,4],[14,1,-3],[16,2,0]])i.put(r.x+h,o+u,r.z+f,23);for(const[h,u,f]of[[1,1,-2],[2,2,-2],[3,1,2]])i.put(r.x+h,o+u,r.z+f,11)}else{for(let h=-5;h<=5;h++)for(let u=-5;u<=5;u++){const f=r.x+h,d=r.z+u,v=Math.max(Math.abs(h),Math.abs(u))===5&&i.noise(f,d)<.45?8:Math.abs(h)<2&&u%3===0?26:9;s(f,d,o,v,o+9)}for(const h of[-4,4])for(const u of[-3,0,3]){const f=u===3?5:2+Math.floor(i.noise(r.x+h,r.z+u)*3);for(let d=1;d<=f;d++)i.put(r.x+h,o+d,r.z+u,d===1?8:9)}for(let h=-4;h<=4;h++)i.put(r.x+h,o+5,r.z+3,h===0?26:9)}}return n}const ad={minX:98,maxX:158,minZ:106,maxZ:158},ms=[33,40],im={x:128.5,y:33.001,z:149.5,yaw:0,pitch:-.04},Pt=ms[0],Qt=ms[1],Ss=Qt+6,en=7,Xn=5,pn=9,sm=4,si=10,ri=12,ji=26,cd=[{x:101,baseZ:146,direction:-1},{x:151,baseZ:127,direction:1}],Ci=3;function Qh(i,t){for(const{x:e,baseZ:n,direction:s}of cd){const r=(t-n)*s;if(i>=e&&i<e+Ci&&r>=0&&r<Qt-Pt)return Pt+r+1}}function rm(i){const{minX:t,maxX:e,minZ:n,maxZ:s}=ad,r=(h,u,f,d,g,v,p)=>{for(let m=f;m<=v;m++)for(let _=u;_<=g;_++)for(let b=h;b<=d;b++)i(b,_,m,p)},o=(h,u)=>i(h,Pt-1,u,sm);r(t,Pt-1,n,e-1,Pt-1,s-1,en),r(t,Qt-1,n,e-1,Qt-1,s-1,en),r(t,Ss,n,e-1,Ss,s-1,pn);for(const h of[Pt,Qt]){for(let u=t;u<e;u++){const f=(u-t)%6>=2&&(u-t)%6<=4&&u<e-1;for(const d of[n,s-1])r(u,h,d,u,h+5,d,pn),f&&r(u,h+2,d,u,h+4,d,si)}for(let u=n+1;u<s-1;u++){const f=(u-n)%6>=2&&(u-n)%6<=4;for(const d of[t,e-1])r(d,h,u,d,h+5,u,pn),f&&r(d,h+2,u,d,h+4,u,si)}}for(const h of[112,123,137,149])r(126,Ss,h,129,Ss,h+2,si);for(const h of[109,119,136,148])r(h,Ss,135,h+2,Ss,138,si);const a=(h,u,f,d,g,v)=>{const p=u===d;for(let m=u;m<=d;m++)for(let _=h;_<=f;_++)r(_,g,m,_,g+5,m,pn),i(_,g,m,en),v.some(b=>(p?_:m)>=b&&(p?_:m)<b+3)&&(r(_,g,m,_,g+2,m,0),i(_,g+3,m,ji))};for(const h of ms){for(const u of[124,131])a(u,107,u,132,h,[112,123]),a(u,141,u,156,h,[146,152]);a(99,132,123,132,h,[105,118]),a(132,132,156,132,h,[134,148,151]),a(99,141,123,141,h,[101,105,118]),a(132,141,156,141,h,[134,148]);for(const u of[111,144])a(u,142,u,156,h,[146,152]);r(125,h-1,107,130,h-1,156,pn),r(99,h-1,133,156,h-1,140,pn);for(let u=108;u<=156;u+=4)i(125,h-1,u,ji),i(130,h-1,u,ji);for(let u=100;u<=156;u+=4)i(u,h-1,133,ji),i(u,h-1,140,ji),u%8===4&&i(u,h+5,136,ri);for(let u=110;u<=154;u+=6)i(128,h+5,u,ri)}a(111,107,111,131,Pt,[113,126]),r(134,Pt-1,109,154,Pt-1,127,en);for(let h=134;h<=154;h++)o(h,110),o(h,125);for(let h=110;h<=125;h++)o(134,h),o(144,h),o(154,h);r(146,Qt-1,110,155,Qt-1,124,0),r(145,Qt,110,145,Qt+1,124,si),r(156,Qt,110,156,Qt+1,124,si),r(146,Qt,109,155,Qt+1,109,si),r(146,Qt,125,155,Qt+1,125,si);for(const h of[136,151])r(h,Pt+2,107,h+1,Pt+3,107,ji),r(h,Pt+2,108,h+1,Pt+2,108,en);for(const h of[113,120])r(155,Pt,h,156,Pt,h+4,en);r(134,Pt,127,137,Pt+1,129,Xn),r(139,Pt,128,141,Pt+2,130,en);for(const h of[136,144,152])i(h,Qt+5,117,ri);const c=(h,u,f)=>{r(h+1,f+1,u,h+7,f+3,u,ji),r(h+3,f,u+2,h+5,f,u+3,Xn);for(const d of[1,5])for(const g of[6,10])r(h+d,f+1,u+g,h+d+1,f+1,u+g,en),i(h+d,f,u+g,Xn),i(h+d+1,f,u+g+2,en);i(h+4,f+5,u+6,ri)};c(101,108,Pt),c(113,108,Pt),c(113,142,Pt),c(133,142,Pt),c(113,142,Qt),c(133,142,Qt);const l=(h,u,f,d)=>{for(let g=0;g<d;g++)r(h,f,u+g,h,f+2,u+g,g%3===1?en:Xn),i(h,f+3,u+g,en)};for(const h of[102,108,114,120])l(h,112,Qt,5),l(h,121,Qt,5),i(h+1,Qt+5,119,ri);for(const h of[106,118])r(h,Qt,128,h+2,Qt,129,en);for(const h of ms)l(147,145,h,5),l(152,147,h,6),r(148,h,143,150,h+1,143,Xn),r(105,h,149,108,h+1,151,Xn),r(106,h,153,109,h+2,154,en),i(108,h+5,147,ri),i(150,h+5,150,ri);r(147,Pt+1,151,150,Pt+1,153,en),r(147,Pt,153,150,Pt,153,Xn),r(147,Pt,151,147,Pt,152,Xn),r(150,Pt,151,150,Pt,152,Xn);for(const{x:h,baseZ:u,direction:f}of cd){for(let v=0;v<Qt-Pt;v++){const p=u+v*f;r(h,Pt,p,h+Ci-1,Qt+2,p,0),r(h,Pt,p,h+Ci-1,Pt+v,p,v%2===0?pn:en),r(h-1,Pt,p,h-1,Qt+1,p,pn),r(h+Ci,Pt,p,h+Ci,Qt+1,p,pn)}const d=u-f,g=u+(Qt-Pt)*f;r(h,Pt,d,h+Ci-1,Pt+2,d,0),r(h,Qt,d,h+Ci-1,Qt+1,d,si),r(h,Qt,g,h+Ci-1,Qt+2,g,0),i(h+1,Pt+5,d,ri),i(h+1,Qt+5,g,ri)}r(95,Pt-1,103,160,Pt-1,105,pn),r(95,Pt-1,158,160,Pt-1,160,pn),r(95,Pt-1,106,97,Pt-1,157,pn),r(158,Pt-1,106,160,Pt-1,157,pn);for(const[h,u]of[[93,113],[93,126],[93,145],[162,112],[162,133],[162,149],[107,101],[146,101],[112,162],[145,162]])r(h,Pt,u,h,Pt+3,u,Xn),r(h-1,Pt+2,u-1,h+1,Pt+4,u+1,6),i(h,Pt+5,u,6)}const kr={minX:92,maxX:164,minZ:99,maxZ:175},ld=32,om={x:128.5,y:33.001,z:147.5,yaw:-.04,pitch:-.045},hd=[{minX:102,maxX:116,minZ:147,maxZ:158},{minX:142,maxX:157,minZ:147,maxZ:160},{minX:103,maxX:116,minZ:162,maxZ:173},{minX:142,maxX:156,minZ:163,maxZ:174}],Eo={sheriff:{x:136.5,y:33,z:135.5},residents:[{x:119.5,y:33,z:130.5},{x:118.5,y:33,z:147.5},{x:140.5,y:33,z:118.5}],horses:[{x:150.5,y:33,z:139.5},{x:148.5,y:33,z:138.5}],raidSpawns:[{x:118.5,y:33,z:105.5},{x:129.5,y:33,z:105.5},{x:139.5,y:33,z:105.5},{x:127.5,y:33,z:172.5}]},pa={workbench:{x:119,y:33,z:141}},tu=3,Js=4,In=5,Xe=7,eu=8,nu=9,iu=10,su=11,Un=12,am=26,Re=ld,dt=Re+1,ru=(i,t,e)=>i+(t-i)*e,cm=i=>Math.min(1,Math.max(0,i));function Es(i,t,e){const n=cm((e-i)/(e-t));return n*n*(3-2*n)}const lm=[{x:62,z:53,rx:36,rz:29,rise:38},{x:96,z:63,rx:25,rz:24,rise:24},{x:131,z:36,rx:28,rz:25,rise:34},{x:222,z:73,rx:29,rz:33,rise:34},{x:204,z:167,rx:32,rz:28,rise:27},{x:51,z:184,rx:32,rz:43,rise:25},{x:169,z:218,rx:32,rz:24,rise:31}];function*hm(i){const{size:t,seaLevel:e,seed:n,heights:s,write:r,noise:o,scatter:a,tree:c}=i,{minX:l,maxX:h,minZ:u,maxZ:f}=kr;for(let d=0;d<t;d++){for(let g=0;g<t;g++){const v=o(g,d,42,n),p=o(g,d,12,n^173);let m=0;for(const F of lm){const O=Math.hypot((g-F.x)/F.rx,(d-F.z)/F.rz)+(p-.5)*.21;if(O>=1.28)continue;const q=.56*Es(O,.54,1.23)+.28*Es(O,.42,.6)+.16*Es(O,.22,.32);m=Math.max(m,q*F.rise)}const _=Math.hypot((g-183)/35,(d-89)/33)+(p-.5)*.15,b=Es(_,.62,1.3),y=Math.hypot(Math.max(l-g,0,g-h+1),Math.max(u-d,0,d-f+1)),w=Es(y,2,18),T=30+8*v+2.7*p+m,R=Math.floor(ru(ru(T,20+3*p,b),Re+.1,w)),D=o(g,d,32,n^772),E=R<=e+1,P=R<43&&w<.98&&!E&&(D>.57||b>.1&&D>.4)?1:E||p>.33?Js:2;s[g+d*t]=R,r(g,0,d,14);for(let F=1;F<=R;F++){const O=m>11&&F>=R-17&&F>36&&((F+2)%9<2||F%13===2),q=F===R?P:F>=R-2?E?Js:2:O?(F+2)%9<2?Js:2:tu;r(g,F,d,q)}for(let F=R+1;F<=e;F++)r(g,F,d,13)}d%4===3&&(yield .67*(d+1)/t)}for(let d=5;d<t-4;d+=5){for(let g=5;g<t-4;g+=5){const v=g+Math.floor(3*a(g,d,n^91)),p=d+Math.floor(3*a(g,d,n^66));v>=l-3&&v<h+3&&p>=u-3&&p<f+3||a(g,d,n^65)>.38||c(v,p)}d%20===5&&(yield .67+.055*d/t)}for(const[d,g]of[[85,136],[83,142],[86,150],[84,159],[88,155],[91,180],[98,183],[161,180],[166,174],[169,178]]){const v=s[d+g*t];r(d,v,g,1),c(d,g,!0)}for(let d=126;d<=145;d++)for(let g=167;g<=178;g++){const v=Es(Math.hypot((g-172)/1.1,d-135),3,9);if(v<=.12)continue;const p=s[g+d*t],m=Math.max(p,33+Math.floor(4*v));for(let _=Math.max(2,p-5);_<=m;_++){const b=g===167&&(d===134||d===135||d===137)&&_>=33&&_<=34,y=a(g+_*17,d-_*9,n^515)>.79&&_<m;r(g,_,d,b||y?su:tu)}}for(let d=0;d<390;d++){const g=3+Math.floor(a(d,15,n)*(t-6)),v=3+Math.floor(a(d,21,n)*(t-6)),p=s[g+v*t],m=3+Math.floor(a(d,83,n)*Math.max(1,p-7));for(const[_,b,y]of[[0,0,0],[1,0,0],[0,1,0],[0,0,1],[-1,-1,0]])r(g+_,m+b,v+y,su)}yield .78}function um(i){const t=new Map,e=(l,h,u,f)=>{i(l,h,u,f);const d=l+u*256+h*65536;f?t.set(d,{x:l,y:h,z:u,id:f}):t.delete(d)},n=(l,h,u,f,d,g,v,p)=>{for(let m=u;m<=g;m++)for(let _=f;_<=v;_++)for(let b=h;b<=d;b++)l(b,m,_,p)},s=(l,h,u,f,d,g,v)=>n(e,l,h,u,f,d,g,v);n(i,122,Re,99,134,Re,174,2),n(i,124,Re,99,132,Re,174,Js),n(i,117,Re,104,120,Re,145,Xe),n(i,135,Re,109,137,Re,145,Xe),n(i,133,Re,143,164,Re,145,Js);for(let l=103;l<=172;l+=5)i(128,Re,l,2);for(const{minX:l,maxX:h,minZ:u,maxZ:f}of hd){n(i,l,Re,u,h-1,Re,f-1,2),n(i,l+1,Re,u+1,h-2,Re,f-2,1);for(const[d,g]of[[l,u],[h-1,u],[l,f-1],[h-1,f-1]])i(d,Re,g,nu)}const r=({x0:l,x1:h,z0:u,z1:f,facing:d,wall:g,trim:v,height:p,porch:m})=>{const _=d==="east"?h:l,b=d==="east"?l:h,y=d==="east"?1:-1,w=Math.floor((u+f)/2);s(l,Re,u,h,Re,f,Xe);for(const R of[l,h])s(R,dt,u,R,dt+p-1,f,g);for(const R of[u,f]){s(l,dt,R,h,dt+p-1,R,g);for(const D of[l,h])s(D,dt,R,D,dt+p,R,In);for(let D=l+3;D<=h-3;D+=5)s(D,dt+2,R,D+1,dt+3,R,iu)}for(const R of[u+2,f-3])s(_,dt+2,R,_,dt+3,R+1,iu);s(_,dt,w-1,_,dt+2,w+1,0),s(b,dt,w-1,b,dt+2,w,0),s(l-1,dt+p,u-1,h+1,dt+p,f+1,In),s(l,dt+p+1,u+2,h,dt+p+1,f-2,v),s(_,dt+p+1,u,_,dt+p+1,f,g),s(_,dt+p+2,u+2,_,dt+p+2,f-2,g),s(_,dt+p+3,w-2,_,dt+p+3,w+2,In);const T=_+y;if(s(T,dt+p,u+2,T,dt+p+1,f-2,v),m){s(Math.min(_,_+y*3),Re,u-1,Math.max(_,_+y*3),Re,f+1,Xe),s(Math.min(T,_+y*3),dt+3,u-1,Math.max(T,_+y*3),dt+3,f+1,Xe);for(const R of[u,f])s(_+y*3,dt,R,_+y*3,dt+2,R,In)}return e(T,dt+2,w-2,Un),e(T,dt+2,w+2,Un),e(_-y,dt+p-1,w,Un),{x:T,z:w,signY:dt+p+1}},o=r({x0:104,x1:117,z0:109,z1:122,facing:"east",wall:Xe,trim:2,height:4,porch:!0}),a=r({x0:100,x1:117,z0:126,z1:142,facing:"east",wall:Xe,trim:Js,height:6,porch:!0}),c=r({x0:137,x1:153,z0:111,z1:126,facing:"west",wall:nu,trim:am,height:5,porch:!1});r({x0:140,x1:157,z0:130,z1:143,facing:"west",wall:Xe,trim:eu,height:5,porch:!0});for(const[l,h,u,f]of[[o.x,o.signY,o.z,Un],[a.x,a.signY,a.z,Un],[a.x,a.signY,a.z-2,Xe],[a.x,a.signY,a.z+2,Xe],[c.x,c.signY,c.z,Un],[c.x,c.signY,c.z-1,Un],[c.x,c.signY,c.z+1,Un],[c.x,c.signY-1,c.z,Un],[c.x,c.signY+1,c.z,Un]])e(l,h,u,f);s(103,dt,129,104,dt,138,In),s(102,dt+1,128,104,dt+1,139,Xe);for(const[l,h]of[[108,130],[111,137],[114,130]])e(l,dt,h,In),s(l-1,dt+1,h,l+1,dt+1,h,Xe),e(l,dt,h+2,Xe);s(150,dt,114,151,dt,121,In),s(149,dt+1,114,151,dt+1,121,Xe);for(const l of[143,151])s(l,dt,131,l+2,dt,132,In);for(const l of[140,141])s(l,dt,135,l,dt+2,139,0);s(146,dt,143,153,dt+2,143,0),e(pa.workbench.x,pa.workbench.y,pa.workbench.z,21),e(114,dt,118,21);for(const l of[103,108])for(const h of[101,106])s(l,dt,h,l,dt+7,h,In);s(102,dt+7,100,109,dt+7,107,Xe),s(103,dt+8,101,108,dt+11,106,Xe),s(102,dt+10,100,109,dt+10,107,In),s(104,dt+12,102,107,dt+12,105,eu);for(const l of[121,135])for(const h of[111,123,137,151,165])s(l,dt,h,l,dt+1,h,In),e(l,dt+2,h,Un);return[...t.values()].sort((l,h)=>l.y-h.y)}const St=256,We=96,fm=16,Rn=28,_n=St*St,ou=We/fm,La=_n*We,ln=128,hn=139,ud=()=>({axes:[],chests:[],benches:[]});function Qr(i){return typeof i=="number"&&Number.isInteger(i)&&(i>=0&&i<=13||[21,22,23].includes(i)||i>=25&&i<=33)}function fd(i){if(!i||typeof i!="object")return!1;const t=i,e=(n,s)=>{if(!Array.isArray(n)||n.length>La-_n)return!1;const r=new Set;for(const o of n){if(!Array.isArray(o)||o.length!==2||!Number.isInteger(o[0])||o[0]<_n||o[0]>=La||r.has(o[0])||!s(o[1]))return!1;r.add(o[0])}return!0};return e(t.axes,n=>n==="x"||n==="z")&&e(t.chests,Zf)&&e(t.benches,n=>Number.isSafeInteger(n)&&Number(n)>=0)}const we=(i,t,e)=>i+St*e+_n*t,to=(i,t,e)=>i+16*e+256*t;function Li(i,t,e){return i>=0&&t>=0&&e>=0&&i<St&&t<We&&e<St}function Gr(i){return i!==0&&i!==6&&i!==10&&i!==13&&!(i>=30&&i<=33)}function Zn(i){return i!==0&&i!==13}function dm(i,t,e){const n=[];for(let s=Math.max(0,t-1>>4);s<=Math.min(5,t+1>>4);s++)for(let r=Math.max(0,e-1>>4);r<=Math.min(15,e+1>>4);r++)for(let o=Math.max(0,i-1>>4);o<=Math.min(15,i+1>>4);o++)n.push(to(o,s,r));return n}function pm(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function Yt(i,t,e=0){let n=Math.imul(i^e,2654435761)^Math.imul(t,2246822519);return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),((n^n>>>16)>>>0)/4294967296}function Ki(i,t,e,n){i/=e,t/=e;const s=Math.floor(i),r=Math.floor(t);let o=i-s,a=t-r;o=o*o*(3-2*o),a=a*a*(3-2*a);const c=Yt(s,r,n),l=Yt(s+1,r,n),h=Yt(s,r+1,n),u=Yt(s+1,r+1,n);return c+(l-c)*o+(h-c)*a+(c-l-h+u)*o*a}const zr=(i,t=0,e=1)=>Math.min(e,Math.max(t,i));function Zi(i,t,e){const n=zr((e-i)/(e-t));return n*n*(3-2*n)}class Ka{constructor(t,e=!1,n=1,s="classic"){if(this.stage=s,this.salt=pm(t),this.generator=n,!e)for(const r of this.generateTerrain());}stage;data=new Uint8Array(La);highest=new Int16Array(_n);occupied=new Uint16Array(256*ou);dense=new Uint16Array(256*ou);lamps=new Set;salt;generator;landmarks=[];frontierStructures=[];axes=new Map;chests=new Map;benches=new Map;history=[];heights=new Uint8Array(_n);edits=new Map;listeners=new Set;static async generate(t,e,n=1,s="classic"){const r=new Ka(t,!0,n,s);let o=performance.now();for(const a of r.generateTerrain())performance.now()-o<7&&a<1||(e?.(a),await new Promise(c=>setTimeout(c,0)),o=performance.now());return r}get(t,e,n){return Li(t,e,n)&&Number.isInteger(t)&&Number.isInteger(e)&&Number.isInteger(n)?this.data[we(t,e,n)]:0}write(t,e,n,s){Li(t,e,n)&&(this.data[we(t,e,n)]=s)}heightAt(t,e){const n=Ki(t,e,47,this.salt),s=Ki(t,e,31,this.salt^109),r=Ki(t,e,11,this.salt^51);let o=22+n*18+Math.max(0,s-.47)*47+r*3;const a=Math.hypot((t-131)/1.55,e-111),c=Zi(a+(r-.5)*5,12,24);o=o*(1-c)+(25+r*2)*c;const l=Zi(Math.hypot(t-ln,e-hn),5.4,14);o=o*(1-l)+(32+.3*r)*l;const h=hn-e;if(h>4&&h<27){const f=Zi(Math.abs(t-(ln+2)),4,12),d=32-zr((h-4)/15)*6+.15*r;o-=Math.max(0,o-d)*f}const u=Zi(Math.hypot((t-118)/1.6,e-75),5,28);return o+=u*(8+7*r),zr(Math.floor(o),6,We-14)}lakeHeight(t,e){const n=11+Ki(t,e,25,this.salt^3140)*4,s=Zi(Math.hypot((t-ln)/1.2,e-hn),4,24),r=Zi(Math.hypot((t-92)/1.65,e-113),2,16),o=Zi(Math.hypot(t-154,(e-110)/1.75),2,13);return Math.floor(Math.max(n+(32-n)*s,n+(30-n)*Math.max(r,o)))}*generatePresetTerrain(){const t=this.stage==="flat";this.data.fill(14,0,_n);for(let e=0;e<St;e++){for(let n=0;n<St;n++){const s=t?32:this.lakeHeight(n,e);for(let r=1;r<=s;r++)this.data[we(n,r,e)]=r<s-3?3:t?r===s?1:2:4;if(!t)for(let r=s+1;r<=Rn;r++)this.data[we(n,r,e)]=13}e%4===3&&(yield .78*(e+1)/St)}yield*this.indexTerrain()}*generateTerrain(){if(this.stage==="school"){this.data.fill(14,0,_n),this.data.fill(3,30*_n,32*_n),this.data.fill(1,32*_n,33*_n),rm((s,r,o,a)=>this.write(s,r,o,a)),yield*this.indexTerrain();return}if(this.stage==="frontier"){yield*hm({size:St,seaLevel:Rn,seed:this.salt,heights:this.heights,noise:Ki,scatter:Yt,write:(s,r,o,a)=>this.write(s,r,o,a),tree:(s,r,o)=>this.tree(s,r,o)}),this.frontierStructures=um((s,r,o,a)=>this.write(s,r,o,a)),yield*this.indexTerrain();return}if(this.stage!=="classic"){yield*this.generatePresetTerrain();return}for(let s=0;s<St;s++){for(let r=0;r<St;r++){const o=this.heightAt(r,s),a=o<=Rn+1||o<Rn+4&&Ki(r,s,17,this.salt^311)>.65,c=r===0||s===0||r===St-1||s===St-1;this.heights[r+St*s]=o;for(let l=0;l<=Math.max(o,Rn);l++){const h=l===0||c&&l===o?14:l>o?13:l===o?a?4:1:l>=o-3?a?4:2:3;this.data[we(r,l,s)]=h}}s%4===3&&(yield .46*(s+1)/St)}let t=0;const e=()=>Yt(++t,319,this.salt),n=(s,r,o,a,c)=>{for(let l=-Math.ceil(c);l<=c;l++)for(let h=-Math.ceil(a);h<=a;h++)for(let u=-Math.ceil(a);u<=a;u++){if((u*u+h*h)/(a*a)+l*l/(c*c)>1)continue;const f=Math.floor(s)+u,d=Math.floor(r)+l,g=Math.floor(o)+h;if(d<2||f<=0||g<=0||f>=255||g>=255||!Li(f,d,g))continue;const v=this.heights[f+St*g];v<=Rn&&d>=v-2||Math.abs(f-ln)<5&&Math.abs(g-hn)<5&&d>27||this.write(f,d,g,0)}};for(let s=0;s<108;s++){let r=5+e()*246,o=5+e()*246,a=5+e()*(this.heights[(r|0)+St*(o|0)]-5),c=e()*Math.PI*2,l=(e()-.5)*.6;const h=17+Math.floor(e()*40);for(let u=0;u<h;u++){const f=1.65+1.15*Math.sin(Math.PI*u/h);n(r,a,o,f,f*.7),c+=(e()-.5)*.56,l=zr(l+(e()-.5)*.17,-.45,.45),r+=Math.cos(c),o+=Math.sin(c),a+=l}s%4===3&&(yield .46+.12*(s+1)/108)}for(let s=0;s<13;s++){const r=ln+12+s,o=hn-2;n(r,this.heights[ln+12+St*o]+1-s*.4,o,2.5,2.2)}for(let s=0;s<1800;s++){const r=2+Math.floor(e()*252),o=2+Math.floor(e()*252),a=2+Math.floor(e()*(this.heights[r+St*o]-3));for(let c=0;c<8;c++){const l=r+Math.floor(e()*3)-1,h=o+Math.floor(e()*3)-1,u=a+Math.floor(e()*3)-1;this.get(l,u,h)===3&&this.write(l,u,h,11)}s%160===0&&(yield .59+.06*s/1800)}for(let s=-3;s<=3;s++)for(let r=-2;r<=2;r++){if(s*s*.55+r*r>4.8)continue;const o=ln+6+s,a=hn-4+r,c=this.heights[o+St*a],l=s*s+r*r<3?2:1;for(let h=c-2;h<c+l;h++)this.write(o,h,a,3);s===0&&r===0&&this.write(o,c+1,a,11)}for(let s=0;s<51;s++){for(let r=0;r<51;r++){const o=r*5+1+Math.floor(Yt(r,s,this.salt^134)*3),a=s*5+1+Math.floor(Yt(r,s,this.salt^854)*3);if(Math.hypot(o-ln,a-hn)<10||a<hn&&a>hn-26&&Math.abs(o-(ln+2))<5)continue;const c=Ki(o,a,35,this.salt^482),l=.026+.75*zr((c-.38)*3.6);Yt(r,s,this.salt^723)<l&&this.tree(o,a)}s%3===2&&(yield .65+.13*(s+1)/51)}this.tree(ln-2,hn-3,!0),this.tree(ln-7,hn-7,!0),this.tree(ln+12,hn-10,!0),this.generator===2&&(this.landmarks=nm({ground:(s,r)=>this.heights[s+St*r],noise:(s,r)=>Yt(s,r,this.salt^1911),get:(s,r,o)=>this.get(s,r,o),put:(s,r,o,a)=>this.write(s,r,o,a)})),yield*this.indexTerrain()}*indexTerrain(){this.highest.fill(-1);const t=this.stage==="school"||this.stage==="frontier";for(let e=0;e<We;e++){for(let n=0;n<St;n++)for(let s=0;s<St;s++){const r=we(s,e,n),o=this.data[r];if(!o)continue;const a=to(s>>4,e>>4,n>>4);this.occupied[a]++,Gr(o)&&this.dense[a]++,Zn(o)&&o!==10&&(this.highest[s+St*n]=e),t&&(o===12||o===25)&&this.lamps.add(r)}e%4===3&&(yield .78+.22*(e+1)/We)}}tree(t,e,n=!1){const s=this.heights[t+St*e];if(this.get(t,s,e)!==1||this.get(t,s+1,e)!==0)return;const r=Yt(t,e,this.salt^813),o=!n&&r>.68,a=(o?6:4)+Math.floor(Yt(t,e,this.salt^102)*3);for(let h=1;h<=a;h++)this.write(t,s+h,e,5);const c=o?3:a-1,l=a+2;for(let h=c;h<=l;h++){const u=o?Math.min(2,Math.ceil((l-h)*.43)):h===l?1:2;for(let f=-u;f<=u;f++)for(let d=-u;d<=u;d++)Math.abs(f)===u&&Math.abs(d)===u&&u>0&&(o||Yt(t+f,e+d,this.salt^h)<.72)||!Li(t+f,s+h,e+d)||this.get(t+f,s+h,e+d)!==0||this.write(t+f,s+h,e+d,6)}}spawn(){if(this.stage==="school")return{...im};if(this.stage==="frontier")return{...om};for(let t=0;t<32;t++)for(let e=-t;e<=t;e++)for(let n=-t;n<=t;n++){if(Math.max(Math.abs(n),Math.abs(e))!==t)continue;const s=ln+n,r=hn+e;for(let o=We-3;o>0;o--){const a=this.get(s,o,r);if(!(!Zn(a)||a===6||a===5||this.get(s,o+1,r)!==0||this.get(s,o+2,r)!==0))return{x:s+.5,y:o+1.001,z:r+.5,yaw:-.075,pitch:-.085}}}return{x:ln+.5,y:We+.01,z:hn+.5,yaw:0,pitch:0}}onEdit(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}set(t,e,n,s){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(n)||!Li(t,e,n)||!Qr(s)||e===0)return!1;const r=we(t,e,n),o=this.data[r];if(o===s||o===14||o===22&&this.chests.get(r)?.length)return!1;const a=this.edits.get(r)?.base??o;return s===a?this.edits.delete(r):this.edits.set(r,{id:s,base:a}),this.replace(t,e,n,s),!0}replace(t,e,n,s){const r=we(t,e,n),o=this.data[r],a=to(t>>4,e>>4,n>>4);this.data[r]=s,this.axes.delete(r),this.chests.delete(r),this.benches.delete(r),this.occupied[a]+=+(s!==0)-+(o!==0),this.dense[a]+=Number(Gr(s))-Number(Gr(o)),(o===12||o===25)&&this.lamps.delete(r),(s===12||s===25)&&this.lamps.add(r);const c=t+St*n;if(e>=this.highest[c]){let l=Math.max(e,this.highest[c]);for(;l>=0&&(!Zn(this.data[we(t,l,n)])||this.data[we(t,l,n)]===10);)l--;this.highest[c]=l}for(const l of this.listeners)l(t,e,n)}exportEdits(){return Array.from(this.edits,([t,{id:e}])=>[t,e])}loadEdits(t){const e=new Set;for(const[n,s]of t){if(!Number.isInteger(n)||n<_n||n>=La||!Qr(s)||e.has(n)||(this.edits.get(n)?.base??this.data[n])===14)throw new Error("地形の変更データが不正です。");e.add(n)}this.history=[],this.axes.clear(),this.benches.clear(),this.chests.clear();for(const[n,{base:s}]of this.edits)this.replace(n%256,n>>>16,n>>>8&255,s);this.edits.clear();for(const[n,s]of t)this.set(n%256,n>>>16,n>>>8&255,s)}axisAt(t,e,n){return this.axes.get(we(t,e,n))??"y"}setAxis(t,e,n,s){if(this.get(t,e,n)!==5||!["x","y","z"].includes(s))return!1;if(this.axisAt(t,e,n)===s)return!0;const r=we(t,e,n);s==="y"?this.axes.delete(r):this.axes.set(r,s);for(const o of this.listeners)o(t,e,n);return!0}chestAt(t,e,n){if(this.get(t,e,n)!==22)return;const s=we(t,e,n),r=this.chests.get(s)??[];return this.chests.set(s,r),r}benchUses(t,e,n){return this.benches.get(we(t,e,n))??0}useBench(t,e,n,s=1){if(this.get(t,e,n)!==21||!Number.isSafeInteger(s)||s<1)return;const r=we(t,e,n);this.stage==="frontier"&&!this.edits.has(r)||this.benches.set(r,Math.min(Number.MAX_SAFE_INTEGER,this.benchUses(t,e,n)+s))}exportFixtures(){return{axes:[...this.axes],benches:[...this.benches],chests:[...this.chests].filter(([,t])=>t.length).map(([t,e])=>[t,e.map(n=>({...n}))])}}loadFixtures(t){if(!fd(t)||t.axes.some(([n])=>this.data[n]!==5)||t.chests.some(([n])=>this.data[n]!==22)||t.benches.some(([n])=>this.data[n]!==21))throw new Error("建具と地形の保存内容が一致しません。元のバックアップを確認してください。");const e=new Set([...this.axes.keys(),...t.axes.map(([n])=>n)]);this.axes=new Map(t.axes),this.benches=new Map(t.benches),this.chests=new Map(t.chests.map(([n,s])=>[n,s.map(r=>({...r}))]));for(const n of e)for(const s of this.listeners)s(n%256,n>>>16,n>>>8&255)}capture(t,e,n){return{x:t,y:e,z:n,id:this.get(t,e,n),axis:this.axisAt(t,e,n)}}remember(t){const e=this.capture(t.x,t.y,t.z);t.id===21||t.id===22||e.id===21||e.id===22||t.id===e.id&&t.axis===e.axis||(this.history.push({before:t,after:e}),this.history.length>20&&this.history.shift())}undo(t){const e=this.history.at(-1);if(!e)return{ok:!1,message:"戻せる通常ブロックの編集がありません。作業台・チェストは対象外です。"};const{before:n,after:s}=e,{x:r,y:o,z:a}=n;return this.get(r,o,a)!==s.id||this.axisAt(r,o,a)!==s.axis?(this.history.pop(),{ok:!1,message:"この場所はすでに変化したため、戻せません。"}):Zn(n.id)&&t(r,o,a)?{ok:!1,message:"体と重なります。少し離れてから戻してください。"}:n.id!==s.id&&!this.set(r,o,a,n.id)?{ok:!1,message:"この編集は戻せません。"}:(n.id===5&&this.setAxis(r,o,a,n.axis),this.history.pop(),{ok:!0,message:"直前のブロック編集を戻しました。"})}}function dd(){return{toolMade:!1,caveVisited:!1,decorated:!1,hidden:!1,home:null}}function pd(i){if(!i||typeof i!="object")return!1;const t=i;if(![t.toolMade,t.caveVisited,t.decorated,t.hidden].every(n=>typeof n=="boolean")||t.caveVisited&&!t.toolMade||t.decorated&&!t.caveVisited)return!1;const e=t.home;return e===null||!!e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=0&&e.x<256&&e.z>=0&&e.z<256&&e.y>=0&&e.y<96}function mm(i,t){["wood-pick","wood-axe","stone-pick","stone-axe"].includes(t)&&(i.toolMade=!0)}function gm(i,t,e,n){if(!i.toolMade||i.caveVisited||!(rr(n,12)||rr(n,25)))return!1;const s=t.landmarks.find(r=>r.kind==="cave");if(s){if(e.x<s.x+2||e.x>s.x+16||Math.abs(e.z-s.z-.5)>3.8||Math.abs(e.y-s.y)>2.1)return!1}else{const r=Math.floor(e.x),o=Math.floor(e.z),a=Math.floor(e.y);let c=!1;for(let l=a+2;l<=Math.min(a+9,95);l++)if([2,3,8,11].includes(t.get(r,l,o))){c=!0;break}if(!c)return!1}return i.caveVisited=!0,!0}function md(i,t,e){return!i.caveVisited||i.decorated||!i.home||t!==25&&t!==26||Math.hypot(e.x-i.home.x,e.y-i.home.y,e.z-i.home.z)>18?!1:(i.decorated=!0,!0)}function vm(i,t){return i.toolMade?i.caveVisited?i.decorated?"3/3 達成　拠点に潮晶の飾りが加わりました":t===2?"3/3　潮晶を持ち帰り、作業台で作った灯りかタイルを拠点に飾ろう":"3/3　作業台でガラスと石炭を潮晶に加工し、灯りかタイルを拠点に飾ろう":t===2?"2/3　灯晶ブロックを持って、潮晶の岩窟へ":"2/3　灯晶ブロックを持って、岩天井の洞窟へ":"1/3　原木を集め、木材と棒で木の道具を作ろう"}function hl(i,t){const e=i.x-t.x,n=i.z-t.z,s=Math.round(Math.hypot(e,n));if(s<2)return"足元";const r=Math.atan2(e,-n)+t.yaw;return["↑","↗","→","↘","↓","↙","←","↖"][(Math.round(r/(Math.PI/4))%8+8)%8]+" 約"+s+"m"}function rc(i,t){return i.home?"拠点 "+hl(i.home,t):""}const Da={low:{distance:2,scale:.7,shadows:!1,vegetation:!1,effects:!1},standard:{distance:3,scale:1,shadows:!0,vegetation:!0,effects:!0},high:{distance:5,scale:1.2,shadows:!0,vegetation:!0,effects:!0}},gd={...Da.standard,quality:"standard",sensitivity:1,volume:.45,muted:!1,effectsVolume:.85,ambientVolume:.4,invertY:!1,bob:!0,sprintFov:!0},wo=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e;function vh(i){if(!i||typeof i!="object")return!1;const t=i;return(t.quality==="legacy"||Object.hasOwn(Da,t.quality))&&Number.isInteger(t.distance)&&wo(t.distance,2,6)&&wo(t.scale,.5,1.5)&&wo(t.sensitivity,.3,2.5)&&[t.volume,t.effectsVolume,t.ambientVolume].every(e=>wo(e,0,1))&&[t.shadows,t.vegetation,t.effects,t.muted,t.invertY,t.bob,t.sprintFov].every(e=>typeof e=="boolean")}function vd(i){if(!i||typeof i!="object")throw Error("保存された設定を読み込めません。");const t={...gd,quality:"legacy",...i};if(!vh(t))throw Error("保存された設定の値が正しくありません。");return t}const _h="180",_m=0,au=1,xm=2,_d=1,ym=2,ui=3,Hi=0,on=1,zn=2,Fi=0,Qs=1,cu=2,lu=3,hu=4,Mm=5,cs=100,bm=101,Sm=102,Em=103,wm=104,Tm=200,Am=201,Rm=202,Cm=203,ul=204,fl=205,Pm=206,Lm=207,Dm=208,Im=209,Um=210,Nm=211,Fm=212,km=213,zm=214,dl=0,pl=1,ml=2,or=3,gl=4,vl=5,_l=6,xl=7,xd=0,Om=1,Bm=2,pi=0,Hm=1,Vm=2,Gm=3,Wm=4,Xm=5,qm=6,Ym=7,yd=300,ar=301,cr=302,yl=303,Ml=304,Za=306,bl=1e3,us=1001,Sl=1002,ke=1003,jm=1004,Or=1005,$n=1006,oc=1007,Ii=1008,xi=1009,Md=1010,bd=1011,eo=1012,xh=1013,gs=1014,Jn=1015,mo=1016,yh=1017,Mh=1018,no=1020,Sd=35902,Ed=35899,wd=1021,Td=1022,Bn=1023,io=1026,so=1027,go=1028,bh=1029,Ad=1030,Sh=1031,Eh=1033,ma=33776,ga=33777,va=33778,_a=33779,El=35840,wl=35841,Tl=35842,Al=35843,Rl=36196,Cl=37492,Pl=37496,Ll=37808,Dl=37809,Il=37810,Ul=37811,Nl=37812,Fl=37813,kl=37814,zl=37815,Ol=37816,Bl=37817,Hl=37818,Vl=37819,Gl=37820,Wl=37821,Xl=36492,ql=36494,Yl=36495,jl=36283,Kl=36284,Zl=36285,$l=36286,Km=3200,Zm=3201,$m=0,Jm=1,Di="",je="srgb",lr="srgb-linear",Ia="linear",le="srgb",ws=7680,uu=519,Qm=512,t0=513,e0=514,Rd=515,n0=516,i0=517,s0=518,r0=519,Jl=35044,Cd=35048,fu="300 es",Qn=2e3,Ua=2001;class pr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let du=1234567;const tr=Math.PI/180,ro=180/Math.PI;function mi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qe[i&255]+qe[i>>8&255]+qe[i>>16&255]+qe[i>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]).toLowerCase()}function Zt(i,t,e){return Math.max(t,Math.min(e,i))}function wh(i,t){return(i%t+t)%t}function o0(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function a0(i,t,e){return i!==t?(e-i)/(t-i):0}function Wr(i,t,e){return(1-e)*i+e*t}function c0(i,t,e,n){return Wr(i,t,1-Math.exp(-e*n))}function l0(i,t=1){return t-Math.abs(wh(i,t*2)-t)}function h0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function u0(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function f0(i,t){return i+Math.floor(Math.random()*(t-i+1))}function d0(i,t){return i+Math.random()*(t-i)}function p0(i){return i*(.5-Math.random())}function m0(i){i!==void 0&&(du=i);let t=du+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function g0(i){return i*tr}function v0(i){return i*ro}function _0(i){return(i&i-1)===0&&i!==0}function x0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function y0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function M0(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function On(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Br={DEG2RAD:tr,RAD2DEG:ro,generateUUID:mi,clamp:Zt,euclideanModulo:wh,mapLinear:o0,inverseLerp:a0,lerp:Wr,damp:c0,pingpong:l0,smoothstep:h0,smootherstep:u0,randInt:f0,randFloat:d0,randFloatSpread:p0,seededRandom:m0,degToRad:g0,radToDeg:v0,isPowerOfTwo:_0,ceilPowerOfTwo:x0,floorPowerOfTwo:y0,setQuaternionFromProperEuler:M0,normalize:ae,denormalize:On};class $t{constructor(t=0,e=0){$t.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vo{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||c!==f||l!==d||h!==g){let p=1-a;const m=c*f+l*d+h*g+u*v,_=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const w=Math.sqrt(b),T=Math.atan2(w,m*_);p=Math.sin(p*T)/w,a=Math.sin(a*T)/w}const y=a*_;if(c=c*p+f*y,l=l*p+d*y,h=h*p+g*y,u=u*p+v*y,p===1-a){const w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-a*d,t[e+2]=l*g+h*d+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,n=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ac.copy(this).projectOnVector(t),this.sub(ac)}reflect(t){return this.sub(ac.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ac=new U,pu=new vo;class Vt{constructor(t,e,n,s,r,o,a,c,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],p=s[3],m=s[6],_=s[1],b=s[4],y=s[7],w=s[2],T=s[5],R=s[8];return r[0]=o*v+a*_+c*w,r[3]=o*p+a*b+c*T,r[6]=o*m+a*y+c*R,r[1]=l*v+h*_+u*w,r[4]=l*p+h*b+u*T,r[7]=l*m+h*y+u*R,r[2]=f*v+d*_+g*w,r[5]=f*p+d*b+g*T,r[8]=f*m+d*y+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(cc.makeScale(t,e)),this}rotate(t){return this.premultiply(cc.makeRotation(-t)),this}translate(t,e){return this.premultiply(cc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const cc=new Vt;function Pd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Na(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function b0(){const i=Na("canvas");return i.style.display="block",i}const mu={};function oo(i){i in mu||(mu[i]=!0,console.warn(i))}function S0(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const gu=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vu=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function E0(){const i={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=gi(s.r),s.g=gi(s.g),s.b=gi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=er(s.r),s.g=er(s.g),s.b=er(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Di?Ia:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return oo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return oo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[lr]:{primaries:t,whitePoint:n,transfer:Ia,toXYZ:gu,fromXYZ:vu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:je},outputColorSpaceConfig:{drawingBufferColorSpace:je}},[je]:{primaries:t,whitePoint:n,transfer:le,toXYZ:gu,fromXYZ:vu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:je}}}),i}const ne=E0();function gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function er(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ts;class w0{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ts===void 0&&(Ts=Na("canvas")),Ts.width=t.width,Ts.height=t.height;const s=Ts.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ts}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Na("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=gi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gi(e[n]/255)*255):e[n]=gi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let T0=0;class Th{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=mi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(lc(s[o].image)):r.push(lc(s[o]))}else r=lc(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function lc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?w0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let A0=0;const hc=new U;class Ze extends pr{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,n=us,s=us,r=$n,o=Ii,a=Bn,c=xi,l=Ze.DEFAULT_ANISOTROPY,h=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=mi(),this.name="",this.source=new Th(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hc).x}get height(){return this.source.getSize(hc).y}get depth(){return this.source.getSize(hc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==yd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bl:t.x=t.x-Math.floor(t.x);break;case us:t.x=t.x<0?0:1;break;case Sl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bl:t.y=t.y-Math.floor(t.y);break;case us:t.y=t.y<0?0:1;break;case Sl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=yd;Ze.DEFAULT_ANISOTROPY=1;class De{constructor(t=0,e=0,n=0,s=1){De.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,y=(d+1)/2,w=(m+1)/2,T=(h+f)/4,R=(u+v)/4,D=(g+p)/4;return b>y&&b>w?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=R/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=D/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=R/r,s=D/r),this.set(n,s,r,e),this}let _=Math.sqrt((p-g)*(p-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(u-v)/_,this.z=(f-h)/_,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class R0 extends pr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Ze(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:$n,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Th(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends R0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ld extends Ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class C0 extends Ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=us,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gi{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Nn):Nn.fromBufferAttribute(r,o),Nn.applyMatrix4(t.matrixWorld),this.expandByPoint(Nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),To.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),To.copy(n.boundingBox)),To.applyMatrix4(t.matrixWorld),this.union(To)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Nn),Nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(yr),Ao.subVectors(this.max,yr),As.subVectors(t.a,yr),Rs.subVectors(t.b,yr),Cs.subVectors(t.c,yr),Si.subVectors(Rs,As),Ei.subVectors(Cs,Rs),$i.subVectors(As,Cs);let e=[0,-Si.z,Si.y,0,-Ei.z,Ei.y,0,-$i.z,$i.y,Si.z,0,-Si.x,Ei.z,0,-Ei.x,$i.z,0,-$i.x,-Si.y,Si.x,0,-Ei.y,Ei.x,0,-$i.y,$i.x,0];return!uc(e,As,Rs,Cs,Ao)||(e=[1,0,0,0,1,0,0,0,1],!uc(e,As,Rs,Cs,Ao))?!1:(Ro.crossVectors(Si,Ei),e=[Ro.x,Ro.y,Ro.z],uc(e,As,Rs,Cs,Ao))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const oi=[new U,new U,new U,new U,new U,new U,new U,new U],Nn=new U,To=new Gi,As=new U,Rs=new U,Cs=new U,Si=new U,Ei=new U,$i=new U,yr=new U,Ao=new U,Ro=new U,Ji=new U;function uc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ji.fromArray(i,r);const a=s.x*Math.abs(Ji.x)+s.y*Math.abs(Ji.y)+s.z*Math.abs(Ji.z),c=t.dot(Ji),l=e.dot(Ji),h=n.dot(Ji);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const P0=new Gi,Mr=new U,fc=new U;class mr{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):P0.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Mr.subVectors(t,this.center);const e=Mr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Mr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Mr.copy(t.center).add(fc)),this.expandByPoint(Mr.copy(t.center).sub(fc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ai=new U,dc=new U,Co=new U,wi=new U,pc=new U,Po=new U,mc=new U;class Ah{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){dc.copy(t).add(e).multiplyScalar(.5),Co.copy(e).sub(t).normalize(),wi.copy(this.origin).sub(dc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Co),a=wi.dot(this.direction),c=-wi.dot(Co),l=wi.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(dc).addScaledVector(Co,f),d}intersectSphere(t,e){ai.subVectors(t.center,this.origin);const n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,n,s,r){pc.subVectors(e,t),Po.subVectors(n,t),mc.crossVectors(pc,Po);let o=this.direction.dot(mc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wi.subVectors(this.origin,t);const c=a*this.direction.dot(Po.crossVectors(wi,Po));if(c<0)return null;const l=a*this.direction.dot(pc.cross(wi));if(l<0||c+l>o)return null;const h=-a*wi.dot(mc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ge{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,g,v,p){ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,v,p)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,g,v,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ge().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ps.setFromMatrixColumn(t,0).length(),r=1/Ps.setFromMatrixColumn(t,1).length(),o=1/Ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f+v*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,g=l*h,v=l*u;e[0]=f-v*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,v=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-v*u}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(L0,t,D0)}lookAt(t,e,n){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Ti.crossVectors(n,mn),Ti.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Ti.crossVectors(n,mn)),Ti.normalize(),Lo.crossVectors(mn,Ti),s[0]=Ti.x,s[4]=Lo.x,s[8]=mn.x,s[1]=Ti.y,s[5]=Lo.y,s[9]=mn.y,s[2]=Ti.z,s[6]=Lo.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],p=n[10],m=n[14],_=n[3],b=n[7],y=n[11],w=n[15],T=s[0],R=s[4],D=s[8],E=s[12],S=s[1],P=s[5],F=s[9],O=s[13],q=s[2],W=s[6],K=s[10],$=s[14],G=s[3],st=s[7],ct=s[11],ft=s[15];return r[0]=o*T+a*S+c*q+l*G,r[4]=o*R+a*P+c*W+l*st,r[8]=o*D+a*F+c*K+l*ct,r[12]=o*E+a*O+c*$+l*ft,r[1]=h*T+u*S+f*q+d*G,r[5]=h*R+u*P+f*W+d*st,r[9]=h*D+u*F+f*K+d*ct,r[13]=h*E+u*O+f*$+d*ft,r[2]=g*T+v*S+p*q+m*G,r[6]=g*R+v*P+p*W+m*st,r[10]=g*D+v*F+p*K+m*ct,r[14]=g*E+v*O+p*$+m*ft,r[3]=_*T+b*S+y*q+w*G,r[7]=_*R+b*P+y*W+w*st,r[11]=_*D+b*F+y*K+w*ct,r[15]=_*E+b*O+y*$+w*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],v=t[7],p=t[11],m=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+v*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+p*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+m*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],v=t[13],p=t[14],m=t[15],_=u*p*l-v*f*l+v*c*d-a*p*d-u*c*m+a*f*m,b=g*f*l-h*p*l-g*c*d+o*p*d+h*c*m-o*f*m,y=h*v*l-g*u*l+g*a*d-o*v*d-h*a*m+o*u*m,w=g*u*c-h*v*c-g*a*f+o*v*f+h*a*p-o*u*p,T=e*_+n*b+s*y+r*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/T;return t[0]=_*R,t[1]=(v*f*r-u*p*r-v*s*d+n*p*d+u*s*m-n*f*m)*R,t[2]=(a*p*r-v*c*r+v*s*l-n*p*l-a*s*m+n*c*m)*R,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*R,t[4]=b*R,t[5]=(h*p*r-g*f*r+g*s*d-e*p*d-h*s*m+e*f*m)*R,t[6]=(g*c*r-o*p*r-g*s*l+e*p*l+o*s*m-e*c*m)*R,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*R,t[8]=y*R,t[9]=(g*u*r-h*v*r-g*n*d+e*v*d+h*n*m-e*u*m)*R,t[10]=(o*v*r-g*a*r+g*n*l-e*v*l-o*n*m+e*a*m)*R,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*R,t[12]=w*R,t[13]=(h*v*s-g*u*s+g*n*f-e*v*f-h*n*p+e*u*p)*R,t[14]=(g*a*s-o*v*s-g*n*c+e*v*c+o*n*p-e*a*p)*R,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,g=r*u,v=o*h,p=o*u,m=a*u,_=c*l,b=c*h,y=c*u,w=n.x,T=n.y,R=n.z;return s[0]=(1-(v+m))*w,s[1]=(d+y)*w,s[2]=(g-b)*w,s[3]=0,s[4]=(d-y)*T,s[5]=(1-(f+m))*T,s[6]=(p+_)*T,s[7]=0,s[8]=(g+b)*R,s[9]=(p-_)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ps.set(s[0],s[1],s[2]).length();const o=Ps.set(s[4],s[5],s[6]).length(),a=Ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Fn.copy(this);const l=1/r,h=1/o,u=1/a;return Fn.elements[0]*=l,Fn.elements[1]*=l,Fn.elements[2]*=l,Fn.elements[4]*=h,Fn.elements[5]*=h,Fn.elements[6]*=h,Fn.elements[8]*=u,Fn.elements[9]*=u,Fn.elements[10]*=u,e.setFromRotationMatrix(Fn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Qn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,v;if(c)g=r/(o-r),v=o*r/(o-r);else if(a===Qn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Ua)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Qn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,v;if(c)g=1/(o-r),v=o/(o-r);else if(a===Qn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Ua)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ps=new U,Fn=new ge,L0=new U(0,0,0),D0=new U(1,1,1),Ti=new U,Lo=new U,mn=new U,_u=new ge,xu=new vo;class yi{constructor(t=0,e=0,n=0,s=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _u.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_u,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xu.setFromEuler(this),this.setFromQuaternion(xu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class Dd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let I0=0;const yu=new U,Ls=new vo,ci=new ge,Do=new U,br=new U,U0=new U,N0=new vo,Mu=new U(1,0,0),bu=new U(0,1,0),Su=new U(0,0,1),Eu={type:"added"},F0={type:"removed"},Ds={type:"childadded",child:null},gc={type:"childremoved",child:null};class Pe extends pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new U,e=new yi,n=new vo,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new Vt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ls.setFromAxisAngle(t,e),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(t,e){return Ls.setFromAxisAngle(t,e),this.quaternion.premultiply(Ls),this}rotateX(t){return this.rotateOnAxis(Mu,t)}rotateY(t){return this.rotateOnAxis(bu,t)}rotateZ(t){return this.rotateOnAxis(Su,t)}translateOnAxis(t,e){return yu.copy(t).applyQuaternion(this.quaternion),this.position.add(yu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mu,t)}translateY(t){return this.translateOnAxis(bu,t)}translateZ(t){return this.translateOnAxis(Su,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Do.copy(t):Do.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(br,Do,this.up):ci.lookAt(Do,br,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),Ls.setFromRotationMatrix(ci),this.quaternion.premultiply(Ls.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Eu),Ds.child=t,this.dispatchEvent(Ds),Ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(F0),gc.child=t,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Eu),Ds.child=t,this.dispatchEvent(Ds),Ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,t,U0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,N0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new U(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new U,li=new U,vc=new U,hi=new U,Is=new U,Us=new U,wu=new U,_c=new U,xc=new U,yc=new U,Mc=new De,bc=new De,Sc=new De;class Mn{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),kn.subVectors(t,e),s.cross(kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){kn.subVectors(s,e),li.subVectors(n,e),vc.subVectors(t,e);const o=kn.dot(kn),a=kn.dot(li),c=kn.dot(vc),l=li.dot(li),h=li.dot(vc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,hi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,hi.x),c.addScaledVector(o,hi.y),c.addScaledVector(a,hi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Mc.setScalar(0),bc.setScalar(0),Sc.setScalar(0),Mc.fromBufferAttribute(t,e),bc.fromBufferAttribute(t,n),Sc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Mc,r.x),o.addScaledVector(bc,r.y),o.addScaledVector(Sc,r.z),o}static isFrontFacing(t,e,n,s){return kn.subVectors(n,e),li.subVectors(t,e),kn.cross(li).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),kn.cross(li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Is.subVectors(s,n),Us.subVectors(r,n),_c.subVectors(t,n);const c=Is.dot(_c),l=Us.dot(_c);if(c<=0&&l<=0)return e.copy(n);xc.subVectors(t,s);const h=Is.dot(xc),u=Us.dot(xc);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Is,o);yc.subVectors(t,r);const d=Is.dot(yc),g=Us.dot(yc);if(g>=0&&d<=g)return e.copy(r);const v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Us,a);const p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return wu.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(wu,a);const m=1/(p+v+f);return o=v*m,a=f*m,e.copy(n).addScaledVector(Is,o).addScaledVector(Us,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Io={h:0,s:0,l:0};function Ec(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ne.workingColorSpace){if(t=wh(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ec(o,r,t+1/3),this.g=Ec(o,r,t),this.b=Ec(o,r,t-1/3)}return ne.colorSpaceToWorking(this,s),this}setStyle(t,e=je){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=je){const n=Id[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}copyLinearToSRGB(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=je){return ne.workingToColorSpace(Ye.copy(this),t),Math.round(Zt(Ye.r*255,0,255))*65536+Math.round(Zt(Ye.g*255,0,255))*256+Math.round(Zt(Ye.b*255,0,255))}getHexString(t=je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(Ye.copy(this),e);const n=Ye.r,s=Ye.g,r=Ye.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=je){ne.workingToColorSpace(Ye.copy(this),t);const e=Ye.r,n=Ye.g,s=Ye.b;return t!==je?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ai),this.setHSL(Ai.h+t,Ai.s+e,Ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ai),t.getHSL(Io);const n=Wr(Ai.h,Io.h,e),s=Wr(Ai.s,Io.s,e),r=Wr(Ai.l,Io.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ye=new qt;qt.NAMES=Id;let k0=0;class gr extends pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=mi(),this.name="",this.type="Material",this.blending=Qs,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ul,this.blendDst=fl,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(n.blending=this.blending),this.side!==Hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ul&&(n.blendSrc=this.blendSrc),this.blendDst!==fl&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==or&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Wi extends gr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=xd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new U,Uo=new $t;let z0=0;class an{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:z0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jl,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Uo.fromBufferAttribute(this,e),Uo.applyMatrix3(t),this.setXY(e,Uo.x,Uo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=On(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=On(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=On(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=On(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=On(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jl&&(t.usage=this.usage),t}}class Ud extends an{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Nd extends an{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ye extends an{constructor(t,e,n){super(new Float32Array(t),e,n)}}let O0=0;const Tn=new ge,wc=new Pe,Ns=new U,gn=new Gi,Sr=new Gi,Be=new U;class Qe extends pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pd(t)?Nd:Ud)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,n){return Tn.makeTranslation(t,e,n),this.applyMatrix4(Tn),this}scale(t,e,n){return Tn.makeScale(t,e,n),this.applyMatrix4(Tn),this}lookAt(t){return wc.lookAt(t),wc.updateMatrix(),this.applyMatrix4(wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ye(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(gn.min,Sr.min),gn.expandByPoint(Be),Be.addVectors(gn.max,Sr.max),gn.expandByPoint(Be)):(gn.expandByPoint(Sr.min),gn.expandByPoint(Sr.max))}gn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Be.fromBufferAttribute(a,l),c&&(Ns.fromBufferAttribute(t,l),Be.add(Ns)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new U,c[D]=new U;const l=new U,h=new U,u=new U,f=new $t,d=new $t,g=new $t,v=new U,p=new U;function m(D,E,S){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,D),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),a[D].add(v),a[E].add(v),a[S].add(v),c[D].add(p),c[E].add(p),c[S].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let D=0,E=_.length;D<E;++D){const S=_[D],P=S.start,F=S.count;for(let O=P,q=P+F;O<q;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const b=new U,y=new U,w=new U,T=new U;function R(D){w.fromBufferAttribute(s,D),T.copy(w);const E=a[D];b.copy(E),b.sub(w.multiplyScalar(w.dot(E))).normalize(),y.crossVectors(T,E);const P=y.dot(c[D])<0?-1:1;o.setXYZW(D,b.x,b.y,b.z,P)}for(let D=0,E=_.length;D<E;++D){const S=_[D],P=S.start,F=S.count;for(let O=P,q=P+F;O<q;O+=3)R(t.getX(O+0)),R(t.getX(O+1)),R(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),v=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let m=0;m<h;m++)f[g++]=l[d++]}return new an(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Qe,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tu=new ge,Qi=new Ah,No=new mr,Au=new U,Fo=new U,ko=new U,zo=new U,Tc=new U,Oo=new U,Ru=new U,Bo=new U;class Ce extends Pe{constructor(t=new Qe,e=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Oo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Tc.fromBufferAttribute(u,t),o?Oo.addScaledVector(Tc,h):Oo.addScaledVector(Tc.sub(e),h))}e.add(Oo)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(r),Qi.copy(t.ray).recast(t.near),!(No.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(No,Au)===null||Qi.origin.distanceToSquared(Au)>(t.far-t.near)**2))&&(Tu.copy(r).invert(),Qi.copy(t.ray).applyMatrix4(Tu),!(n.boundingBox!==null&&Qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Qi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],m=o[p.materialIndex],_=Math.max(p.start,d.start),b=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let y=_,w=b;y<w;y+=3){const T=a.getX(y),R=a.getX(y+1),D=a.getX(y+2);s=Ho(this,m,t,n,l,h,u,T,R,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){const _=a.getX(p),b=a.getX(p+1),y=a.getX(p+2);s=Ho(this,o,t,n,l,h,u,_,b,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],m=o[p.materialIndex],_=Math.max(p.start,d.start),b=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let y=_,w=b;y<w;y+=3){const T=y,R=y+1,D=y+2;s=Ho(this,m,t,n,l,h,u,T,R,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){const _=p,b=p+1,y=p+2;s=Ho(this,o,t,n,l,h,u,_,b,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function B0(i,t,e,n,s,r,o,a){let c;if(t.side===on?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Hi,a),c===null)return null;Bo.copy(a),Bo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Bo);return l<e.near||l>e.far?null:{distance:l,point:Bo.clone(),object:i}}function Ho(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Fo),i.getVertexPosition(c,ko),i.getVertexPosition(l,zo);const h=B0(i,t,e,n,Fo,ko,zo,Ru);if(h){const u=new U;Mn.getBarycoord(Ru,Fo,ko,zo,u),s&&(h.uv=Mn.getInterpolatedAttribute(s,a,c,l,u,new $t)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,a,c,l,u,new $t)),o&&(h.normal=Mn.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new U,materialIndex:0};Mn.getNormal(Fo,ko,zo,f.normal),h.face=f,h.barycoord=u}return h}class Sn extends Qe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ye(l,3)),this.setAttribute("normal",new ye(h,3)),this.setAttribute("uv",new ye(u,2));function g(v,p,m,_,b,y,w,T,R,D,E){const S=y/R,P=w/D,F=y/2,O=w/2,q=T/2,W=R+1,K=D+1;let $=0,G=0;const st=new U;for(let ct=0;ct<K;ct++){const ft=ct*P-O;for(let Wt=0;Wt<W;Wt++){const ie=Wt*S-F;st[v]=ie*_,st[p]=ft*b,st[m]=q,l.push(st.x,st.y,st.z),st[v]=0,st[p]=0,st[m]=T>0?1:-1,h.push(st.x,st.y,st.z),u.push(Wt/R),u.push(1-ct/D),$+=1}}for(let ct=0;ct<D;ct++)for(let ft=0;ft<R;ft++){const Wt=f+ft+W*ct,ie=f+ft+W*(ct+1),pe=f+(ft+1)+W*(ct+1),Xt=f+(ft+1)+W*ct;c.push(Wt,ie,Xt),c.push(ie,pe,Xt),G+=6}a.addGroup(d,G,E),d+=G,f+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function hr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function sn(i){const t={};for(let e=0;e<i.length;e++){const n=hr(i[e]);for(const s in n)t[s]=n[s]}return t}function H0(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const V0={clone:hr,merge:sn};var G0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,W0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Je extends gr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=G0,this.fragmentShader=W0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hr(t.uniforms),this.uniformsGroups=H0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class kd extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new U,Cu=new $t,Pu=new $t;class Cn extends kd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ro*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ro*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z)}getViewSize(t,e){return this.getViewBounds(t,Cu,Pu),e.subVectors(Pu,Cu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(tr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fs=-90,ks=1;class X0 extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Cn(Fs,ks,t,e);s.layers=this.layers,this.add(s);const r=new Cn(Fs,ks,t,e);r.layers=this.layers,this.add(r);const o=new Cn(Fs,ks,t,e);o.layers=this.layers,this.add(o);const a=new Cn(Fs,ks,t,e);a.layers=this.layers,this.add(a);const c=new Cn(Fs,ks,t,e);c.layers=this.layers,this.add(c);const l=new Cn(Fs,ks,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ua)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class zd extends Ze{constructor(t=[],e=ar,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class q0 extends vs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new zd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Sn(5,5,5),r=new Je({name:"CubemapFromEquirect",uniforms:hr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:Fi});r.uniforms.tEquirect.value=e;const o=new Ce(s,r),a=e.minFilter;return e.minFilter===Ii&&(e.minFilter=$n),new X0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class fs extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Y0={type:"move"};class Ac{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Y0)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new fs;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class j0 extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class K0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Jl,this.updateRanges=[],this.version=0,this.uuid=mi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new U;class Fa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix4(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyNormalMatrix(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.transformDirection(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=On(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=On(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=On(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=On(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=On(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new an(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Fa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Od extends gr{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let zs;const Er=new U,Os=new U,Bs=new U,Hs=new $t,wr=new $t,Bd=new ge,Vo=new U,Tr=new U,Go=new U,Lu=new $t,Rc=new $t,Du=new $t;class Z0 extends Pe{constructor(t=new Od){if(super(),this.isSprite=!0,this.type="Sprite",zs===void 0){zs=new Qe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new K0(e,5);zs.setIndex([0,1,2,0,2,3]),zs.setAttribute("position",new Fa(n,3,0,!1)),zs.setAttribute("uv",new Fa(n,2,3,!1))}this.geometry=zs,this.material=t,this.center=new $t(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Os.setFromMatrixScale(this.matrixWorld),Bd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Bs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Os.multiplyScalar(-Bs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Wo(Vo.set(-.5,-.5,0),Bs,o,Os,s,r),Wo(Tr.set(.5,-.5,0),Bs,o,Os,s,r),Wo(Go.set(.5,.5,0),Bs,o,Os,s,r),Lu.set(0,0),Rc.set(1,0),Du.set(1,1);let a=t.ray.intersectTriangle(Vo,Tr,Go,!1,Er);if(a===null&&(Wo(Tr.set(-.5,.5,0),Bs,o,Os,s,r),Rc.set(0,1),a=t.ray.intersectTriangle(Vo,Go,Tr,!1,Er),a===null))return;const c=t.ray.origin.distanceTo(Er);c<t.near||c>t.far||e.push({distance:c,point:Er.clone(),uv:Mn.getInterpolation(Er,Vo,Tr,Go,Lu,Rc,Du,new $t),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Wo(i,t,e,n,s,r){Hs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(wr.x=r*Hs.x-s*Hs.y,wr.y=s*Hs.x+r*Hs.y):wr.copy(Hs),i.copy(t),i.x+=wr.x,i.y+=wr.y,i.applyMatrix4(Bd)}class _o extends Ze{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ke,h=ke,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Iu extends an{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Vs=new ge,Uu=new ge,Xo=[],Nu=new Gi,$0=new ge,Ar=new Ce,Rr=new mr;class ao extends Ce{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Iu(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,$0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Gi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Vs),Nu.copy(t.boundingBox).applyMatrix4(Vs),this.boundingBox.union(Nu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Vs),Rr.copy(t.boundingSphere).applyMatrix4(Vs),this.boundingSphere.union(Rr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ar.geometry=this.geometry,Ar.material=this.material,Ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rr.copy(this.boundingSphere),Rr.applyMatrix4(n),t.ray.intersectsSphere(Rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Vs),Uu.multiplyMatrices(n,Vs),Ar.matrixWorld=Uu,Ar.raycast(t,Xo);for(let o=0,a=Xo.length;o<a;o++){const c=Xo[o];c.instanceId=r,c.object=this,e.push(c)}Xo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Iu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new _o(new Float32Array(s*this.count),s,this.count,go,Jn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Cc=new U,J0=new U,Q0=new Vt;class ss{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Cc.subVectors(n,e).cross(J0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Cc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Q0.getNormalMatrix(t),s=this.coplanarPoint(Cc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ts=new mr,tg=new $t(.5,.5),qo=new U;class Hd{constructor(t=new ss,e=new ss,n=new ss,s=new ss,r=new ss,o=new ss){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],p=r[10],m=r[11],_=r[12],b=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-o,d-h,m-g,w-_).normalize(),s[1].setComponents(l+o,d+h,m+g,w+_).normalize(),s[2].setComponents(l+a,d+u,m+v,w+b).normalize(),s[3].setComponents(l-a,d-u,m-v,w-b).normalize(),n)s[4].setComponents(c,f,p,y).normalize(),s[5].setComponents(l-c,d-f,m-p,w-y).normalize();else if(s[4].setComponents(l-c,d-f,m-p,w-y).normalize(),e===Qn)s[5].setComponents(l+c,d+f,m+p,w+y).normalize();else if(e===Ua)s[5].setComponents(c,f,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ts.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ts.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ts)}intersectsSprite(t){ts.center.set(0,0,0);const e=tg.distanceTo(t.center);return ts.radius=.7071067811865476+e,ts.applyMatrix4(t.matrixWorld),this.intersectsSphere(ts)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(qo.x=s.normal.x>0?t.max.x:t.min.x,qo.y=s.normal.y>0?t.max.y:t.min.y,qo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vd extends gr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ka=new U,za=new U,Fu=new ge,Cr=new Ah,Yo=new mr,Pc=new U,ku=new U;class eg extends Pe{constructor(t=new Qe,e=new Vd){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ka.fromBufferAttribute(e,s-1),za.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ka.distanceTo(za);t.setAttribute("lineDistance",new ye(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(s),Yo.radius+=r,t.ray.intersectsSphere(Yo)===!1)return;Fu.copy(s).invert(),Cr.copy(t.ray).applyMatrix4(Fu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=d,p=g-1;v<p;v+=l){const m=h.getX(v),_=h.getX(v+1),b=jo(this,t,Cr,c,m,_,v);b&&e.push(b)}if(this.isLineLoop){const v=h.getX(g-1),p=h.getX(d),m=jo(this,t,Cr,c,v,p,g-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=d,p=g-1;v<p;v+=l){const m=jo(this,t,Cr,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=jo(this,t,Cr,c,g-1,d,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function jo(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(ka.fromBufferAttribute(a,s),za.fromBufferAttribute(a,r),e.distanceSqToSegment(ka,za,Pc,ku)>n)return;Pc.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Pc);if(!(l<t.near||l>t.far))return{distance:l,point:ku.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const zu=new U,Ou=new U;class ng extends eg{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)zu.fromBufferAttribute(e,s),Ou.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zu.distanceTo(Ou);t.setAttribute("lineDistance",new ye(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ig extends Ze{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gd extends Ze{constructor(t,e,n=gs,s,r,o,a=ke,c=ke,l,h=io,u=1){if(h!==io&&h!==so)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Th(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Wd extends Ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const Ko=new U,Zo=new U,Lc=new U,$o=new Mn;class sg extends Qe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(tr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:v,b:p,c:m}=$o;if(v.fromBufferAttribute(a,l[0]),p.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),$o.getNormal(Lc),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let _=0;_<3;_++){const b=(_+1)%3,y=u[_],w=u[b],T=$o[h[_]],R=$o[h[b]],D=`${y}_${w}`,E=`${w}_${y}`;E in f&&f[E]?(Lc.dot(f[E].normal)<=r&&(d.push(T.x,T.y,T.z),d.push(R.x,R.y,R.z)),f[E]=null):D in f||(f[D]={index0:l[_],index1:l[b],normal:Lc.clone()})}}for(const g in f)if(f[g]){const{index0:v,index1:p}=f[g];Ko.fromBufferAttribute(a,v),Zo.fromBufferAttribute(a,p),d.push(Ko.x,Ko.y,Ko.z),d.push(Zo.x,Zo.y,Zo.z)}this.setAttribute("position",new ye(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class vr extends Qe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const _=m*f-o;for(let b=0;b<l;b++){const y=b*u-r;g.push(y,-_,0),v.push(0,0,1),p.push(b/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<a;_++){const b=_+l*m,y=_+l*(m+1),w=_+1+l*(m+1),T=_+1+l*m;d.push(b,y,T),d.push(y,w,T)}this.setIndex(d),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(v,3)),this.setAttribute("uv",new ye(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vr(t.width,t.height,t.widthSegments,t.heightSegments)}}class Rh extends Qe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new U,f=new U,d=[],g=[],v=[],p=[];for(let m=0;m<=n;m++){const _=[],b=m/n;let y=0;m===0&&o===0?y=.5/e:m===n&&c===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){const T=w/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+b*a),u.y=t*Math.cos(o+b*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+b*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),p.push(T+y,1-b),_.push(l++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){const b=h[m][_+1],y=h[m][_],w=h[m+1][_],T=h[m+1][_+1];(m!==0||o>0)&&d.push(b,y,T),(m!==n-1||c<Math.PI)&&d.push(y,w,T)}this.setIndex(d),this.setAttribute("position",new ye(g,3)),this.setAttribute("normal",new ye(v,3)),this.setAttribute("uv",new ye(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rh(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class rg extends gr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Km,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class og extends gr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ag extends kd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class cg extends Cn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Bu(i,t,e,n){const s=lg(n);switch(e){case wd:return i*t;case go:return i*t/s.components*s.byteLength;case bh:return i*t/s.components*s.byteLength;case Ad:return i*t*2/s.components*s.byteLength;case Sh:return i*t*2/s.components*s.byteLength;case Td:return i*t*3/s.components*s.byteLength;case Bn:return i*t*4/s.components*s.byteLength;case Eh:return i*t*4/s.components*s.byteLength;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case va:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wl:case Al:return Math.max(i,16)*Math.max(t,8)/4;case El:case Tl:return Math.max(i,8)*Math.max(t,8)/2;case Rl:case Cl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ll:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Il:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ul:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Nl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Fl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case kl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case zl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ol:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Bl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Hl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Vl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Gl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Xl:case ql:case Yl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case jl:case Kl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Zl:case $l:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function lg(i){switch(i){case xi:case Md:return{byteLength:1,components:1};case eo:case bd:case mo:return{byteLength:2,components:1};case yh:case Mh:return{byteLength:2,components:4};case gs:case xh:case Jn:return{byteLength:4,components:1};case Sd:case Ed:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_h}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_h);function Xd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function hg(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ug=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fg=`#ifdef USE_ALPHAHASH
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
#endif`,dg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vg=`#ifdef USE_AOMAP
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
#endif`,_g=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xg=`#ifdef USE_BATCHING
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
#endif`,yg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Eg=`#ifdef USE_IRIDESCENCE
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
#endif`,wg=`#ifdef USE_BUMPMAP
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
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ig=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ug=`#define PI 3.141592653589793
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
} // validated`,Ng=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fg=`vec3 transformedNormal = objectNormal;
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
#endif`,kg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Og=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gg=`#ifdef USE_ENVMAP
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
#endif`,Wg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xg=`#ifdef USE_ENVMAP
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
#endif`,qg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yg=`#ifdef USE_ENVMAP
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
#endif`,jg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$g=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jg=`#ifdef USE_GRADIENTMAP
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
}`,Qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,t1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,e1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n1=`uniform bool receiveShadow;
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
#endif`,i1=`#ifdef USE_ENVMAP
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
#endif`,s1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,c1=`PhysicalMaterial material;
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
#endif`,l1=`struct PhysicalMaterial {
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
}`,h1=`
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
#endif`,u1=`#if defined( RE_IndirectDiffuse )
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
#endif`,f1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,d1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,x1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,y1=`#if defined( USE_POINTS_UV )
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
#endif`,M1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,b1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,S1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,E1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,w1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T1=`#ifdef USE_MORPHTARGETS
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
#endif`,A1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,C1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,P1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,I1=`#ifdef USE_NORMALMAP
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
#endif`,U1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,N1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,F1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,z1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,O1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,B1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,H1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,G1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,W1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,X1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,q1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Y1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,j1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,K1=`float getShadowMask() {
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
}`,Z1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$1=`#ifdef USE_SKINNING
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
#endif`,J1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q1=`#ifdef USE_SKINNING
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
#endif`,tv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ev=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sv=`#ifdef USE_TRANSMISSION
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
#endif`,rv=`#ifdef USE_TRANSMISSION
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
#endif`,ov=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uv=`uniform sampler2D t2D;
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
}`,fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gv=`#include <common>
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
}`,vv=`#if DEPTH_PACKING == 3200
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
}`,_v=`#define DISTANCE
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
}`,xv=`#define DISTANCE
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
}`,yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bv=`uniform float scale;
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
}`,Sv=`uniform vec3 diffuse;
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
}`,Ev=`#include <common>
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
}`,wv=`uniform vec3 diffuse;
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
}`,Tv=`#define LAMBERT
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
}`,Av=`#define LAMBERT
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
}`,Rv=`#define MATCAP
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
}`,Cv=`#define MATCAP
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
}`,Pv=`#define NORMAL
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
}`,Lv=`#define NORMAL
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
}`,Dv=`#define PHONG
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
}`,Iv=`#define PHONG
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
}`,Uv=`#define STANDARD
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
}`,Nv=`#define STANDARD
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
}`,Fv=`#define TOON
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
}`,kv=`#define TOON
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
}`,zv=`uniform float size;
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
}`,Ov=`uniform vec3 diffuse;
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
}`,Bv=`#include <common>
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
}`,Hv=`uniform vec3 color;
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
}`,Vv=`uniform float rotation;
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
}`,Gv=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:ug,alphahash_pars_fragment:fg,alphamap_fragment:dg,alphamap_pars_fragment:pg,alphatest_fragment:mg,alphatest_pars_fragment:gg,aomap_fragment:vg,aomap_pars_fragment:_g,batching_pars_vertex:xg,batching_vertex:yg,begin_vertex:Mg,beginnormal_vertex:bg,bsdfs:Sg,iridescence_fragment:Eg,bumpmap_pars_fragment:wg,clipping_planes_fragment:Tg,clipping_planes_pars_fragment:Ag,clipping_planes_pars_vertex:Rg,clipping_planes_vertex:Cg,color_fragment:Pg,color_pars_fragment:Lg,color_pars_vertex:Dg,color_vertex:Ig,common:Ug,cube_uv_reflection_fragment:Ng,defaultnormal_vertex:Fg,displacementmap_pars_vertex:kg,displacementmap_vertex:zg,emissivemap_fragment:Og,emissivemap_pars_fragment:Bg,colorspace_fragment:Hg,colorspace_pars_fragment:Vg,envmap_fragment:Gg,envmap_common_pars_fragment:Wg,envmap_pars_fragment:Xg,envmap_pars_vertex:qg,envmap_physical_pars_fragment:i1,envmap_vertex:Yg,fog_vertex:jg,fog_pars_vertex:Kg,fog_fragment:Zg,fog_pars_fragment:$g,gradientmap_pars_fragment:Jg,lightmap_pars_fragment:Qg,lights_lambert_fragment:t1,lights_lambert_pars_fragment:e1,lights_pars_begin:n1,lights_toon_fragment:s1,lights_toon_pars_fragment:r1,lights_phong_fragment:o1,lights_phong_pars_fragment:a1,lights_physical_fragment:c1,lights_physical_pars_fragment:l1,lights_fragment_begin:h1,lights_fragment_maps:u1,lights_fragment_end:f1,logdepthbuf_fragment:d1,logdepthbuf_pars_fragment:p1,logdepthbuf_pars_vertex:m1,logdepthbuf_vertex:g1,map_fragment:v1,map_pars_fragment:_1,map_particle_fragment:x1,map_particle_pars_fragment:y1,metalnessmap_fragment:M1,metalnessmap_pars_fragment:b1,morphinstance_vertex:S1,morphcolor_vertex:E1,morphnormal_vertex:w1,morphtarget_pars_vertex:T1,morphtarget_vertex:A1,normal_fragment_begin:R1,normal_fragment_maps:C1,normal_pars_fragment:P1,normal_pars_vertex:L1,normal_vertex:D1,normalmap_pars_fragment:I1,clearcoat_normal_fragment_begin:U1,clearcoat_normal_fragment_maps:N1,clearcoat_pars_fragment:F1,iridescence_pars_fragment:k1,opaque_fragment:z1,packing:O1,premultiplied_alpha_fragment:B1,project_vertex:H1,dithering_fragment:V1,dithering_pars_fragment:G1,roughnessmap_fragment:W1,roughnessmap_pars_fragment:X1,shadowmap_pars_fragment:q1,shadowmap_pars_vertex:Y1,shadowmap_vertex:j1,shadowmask_pars_fragment:K1,skinbase_vertex:Z1,skinning_pars_vertex:$1,skinning_vertex:J1,skinnormal_vertex:Q1,specularmap_fragment:tv,specularmap_pars_fragment:ev,tonemapping_fragment:nv,tonemapping_pars_fragment:iv,transmission_fragment:sv,transmission_pars_fragment:rv,uv_pars_fragment:ov,uv_pars_vertex:av,uv_vertex:cv,worldpos_vertex:lv,background_vert:hv,background_frag:uv,backgroundCube_vert:fv,backgroundCube_frag:dv,cube_vert:pv,cube_frag:mv,depth_vert:gv,depth_frag:vv,distanceRGBA_vert:_v,distanceRGBA_frag:xv,equirect_vert:yv,equirect_frag:Mv,linedashed_vert:bv,linedashed_frag:Sv,meshbasic_vert:Ev,meshbasic_frag:wv,meshlambert_vert:Tv,meshlambert_frag:Av,meshmatcap_vert:Rv,meshmatcap_frag:Cv,meshnormal_vert:Pv,meshnormal_frag:Lv,meshphong_vert:Dv,meshphong_frag:Iv,meshphysical_vert:Uv,meshphysical_frag:Nv,meshtoon_vert:Fv,meshtoon_frag:kv,points_vert:zv,points_frag:Ov,shadow_vert:Bv,shadow_frag:Hv,sprite_vert:Vv,sprite_frag:Gv},at={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},jn={basic:{uniforms:sn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:sn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new qt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:sn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:sn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:sn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new qt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:sn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:sn([at.points,at.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:sn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:sn([at.common,at.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:sn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:sn([at.sprite,at.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:sn([at.common,at.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:sn([at.lights,at.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};jn.physical={uniforms:sn([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Jo={r:0,b:0,g:0},es=new yi,Wv=new ge;function Xv(i,t,e,n,s,r,o){const a=new qt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?e:t).get(y)),y}function v(b){let y=!1;const w=g(b);w===null?m(a,c):w&&w.isColor&&(m(w,1),y=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(b,y){const w=g(y);w&&(w.isCubeTexture||w.mapping===Za)?(h===void 0&&(h=new Ce(new Sn(1,1,1),new Je({name:"BackgroundCubeMaterial",uniforms:hr(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),es.copy(y.backgroundRotation),es.x*=-1,es.y*=-1,es.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Wv.makeRotationFromEuler(es)),h.material.toneMapped=ne.getTransfer(w.colorSpace)!==le,(u!==w||f!==w.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new Ce(new vr(2,2),new Je({name:"BackgroundMaterial",uniforms:hr(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ne.getTransfer(w.colorSpace)!==le,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||f!==w.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=w,f=w.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,y){b.getRGB(Jo,Fd(i)),n.buffers.color.setClear(Jo.r,Jo.g,Jo.b,y,o)}function _(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,m(a,c)},render:v,addToRenderList:p,dispose:_}}function qv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,P,F,O,q){let W=!1;const K=u(O,F,P);r!==K&&(r=K,l(r.object)),W=d(S,O,F,q),W&&g(S,O,F,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,y(S,P,F,O),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,P,F){const O=F.wireframe===!0;let q=n[S.id];q===void 0&&(q={},n[S.id]=q);let W=q[P.id];W===void 0&&(W={},q[P.id]=W);let K=W[O];return K===void 0&&(K=f(c()),W[O]=K),K}function f(S){const P=[],F=[],O=[];for(let q=0;q<e;q++)P[q]=0,F[q]=0,O[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:O,object:S,attributes:{},index:null}}function d(S,P,F,O){const q=r.attributes,W=P.attributes;let K=0;const $=F.getAttributes();for(const G in $)if($[G].location>=0){const ct=q[G];let ft=W[G];if(ft===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(ft=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(ft=S.instanceColor)),ct===void 0||ct.attribute!==ft||ft&&ct.data!==ft.data)return!0;K++}return r.attributesNum!==K||r.index!==O}function g(S,P,F,O){const q={},W=P.attributes;let K=0;const $=F.getAttributes();for(const G in $)if($[G].location>=0){let ct=W[G];ct===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(ct=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(ct=S.instanceColor));const ft={};ft.attribute=ct,ct&&ct.data&&(ft.data=ct.data),q[G]=ft,K++}r.attributes=q,r.attributesNum=K,r.index=O}function v(){const S=r.newAttributes;for(let P=0,F=S.length;P<F;P++)S[P]=0}function p(S){m(S,0)}function m(S,P){const F=r.newAttributes,O=r.enabledAttributes,q=r.attributeDivisors;F[S]=1,O[S]===0&&(i.enableVertexAttribArray(S),O[S]=1),q[S]!==P&&(i.vertexAttribDivisor(S,P),q[S]=P)}function _(){const S=r.newAttributes,P=r.enabledAttributes;for(let F=0,O=P.length;F<O;F++)P[F]!==S[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function b(S,P,F,O,q,W,K){K===!0?i.vertexAttribIPointer(S,P,F,q,W):i.vertexAttribPointer(S,P,F,O,q,W)}function y(S,P,F,O){v();const q=O.attributes,W=F.getAttributes(),K=P.defaultAttributeValues;for(const $ in W){const G=W[$];if(G.location>=0){let st=q[$];if(st===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(st=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(st=S.instanceColor)),st!==void 0){const ct=st.normalized,ft=st.itemSize,Wt=t.get(st);if(Wt===void 0)continue;const ie=Wt.buffer,pe=Wt.type,Xt=Wt.bytesPerElement,j=pe===i.INT||pe===i.UNSIGNED_INT||st.gpuType===xh;if(st.isInterleavedBufferAttribute){const J=st.data,mt=J.stride,Ut=st.offset;if(J.isInstancedInterleavedBuffer){for(let Et=0;Et<G.locationSize;Et++)m(G.location+Et,J.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Et=0;Et<G.locationSize;Et++)p(G.location+Et);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Et=0;Et<G.locationSize;Et++)b(G.location+Et,ft/G.locationSize,pe,ct,mt*Xt,(Ut+ft/G.locationSize*Et)*Xt,j)}else{if(st.isInstancedBufferAttribute){for(let J=0;J<G.locationSize;J++)m(G.location+J,st.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let J=0;J<G.locationSize;J++)p(G.location+J);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let J=0;J<G.locationSize;J++)b(G.location+J,ft/G.locationSize,pe,ct,ft*Xt,ft/G.locationSize*J*Xt,j)}}else if(K!==void 0){const ct=K[$];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(G.location,ct);break;case 3:i.vertexAttrib3fv(G.location,ct);break;case 4:i.vertexAttrib4fv(G.location,ct);break;default:i.vertexAttrib1fv(G.location,ct)}}}}_()}function w(){D();for(const S in n){const P=n[S];for(const F in P){const O=P[F];for(const q in O)h(O[q].object),delete O[q];delete P[F]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const F in P){const O=P[F];for(const q in O)h(O[q].object),delete O[q];delete P[F]}delete n[S.id]}function R(S){for(const P in n){const F=n[P];if(F[S.id]===void 0)continue;const O=F[S.id];for(const q in O)h(O[q].object),delete O[q];delete F[S.id]}}function D(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:_}}function Yv(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function jv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Bn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===mo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==xi&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Jn&&!D)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:w,maxSamples:T}}function Kv(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ss,a=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const _=r?0:n,b=_*4;let y=m.clippingState||null;c.value=y,y=h(g,f,b,d);for(let w=0;w!==b;++w)y[w]=e[w];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,y=d;b!==v;++b,y+=4)o.copy(u[b]).applyMatrix4(_,a),o.normal.toArray(p,y),p[y+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Zv(i){let t=new WeakMap;function e(o,a){return a===yl?o.mapping=ar:a===Ml&&(o.mapping=cr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yl||a===Ml)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new q0(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const js=4,Hu=[.125,.215,.35,.446,.526,.582],ls=20,Dc=new ag,Vu=new qt;let Ic=null,Uc=0,Nc=0,Fc=!1;const rs=(1+Math.sqrt(5))/2,Gs=1/rs,Gu=[new U(-rs,Gs,0),new U(rs,Gs,0),new U(-Gs,0,rs),new U(Gs,0,rs),new U(0,rs,-Gs),new U(0,rs,Gs),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],$v=new U;class Wu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=$v}=r;Ic=this._renderer.getRenderTarget(),Uc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Fc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ic,Uc,Nc),this._renderer.xr.enabled=Fc,t.scissorTest=!1,Qo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ar||t.mapping===cr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ic=this._renderer.getRenderTarget(),Uc=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Fc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:mo,format:Bn,colorSpace:lr,depthBuffer:!1},s=Xu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jv(r)),this._blurMaterial=Qv(r,t,e)}return s}_compileMaterial(t){const e=new Ce(this._lodPlanes[0],t);this._renderer.compile(e,Dc)}_sceneToCubeUV(t,e,n,s,r){const c=new Cn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Vu),u.toneMapping=pi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new Wi({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),p=new Ce(new Sn,v);let m=!1;const _=t.background;_?_.isColor&&(v.color.copy(_),t.background=null,m=!0):(v.color.copy(Vu),m=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):y===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const w=this._cubeSize;Qo(s,y*w,b>2?w:0,w,w),u.setRenderTarget(s),m&&u.render(p,c),u.render(t,c)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ar||t.mapping===cr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ce(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Qo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Dc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gu[(s-r-1)%Gu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ce(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ls-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):ls;p>ls&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ls}`);const m=[];let _=0;for(let R=0;R<ls;++R){const D=R/v,E=Math.exp(-D*D/2);m.push(E),R===0?_+=E:R<p&&(_+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/_;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-n;const y=this._sizeLods[s],w=3*y*(s>b-js?s-b+js:0),T=4*(this._cubeSize-y);Qo(e,w,T,3*y,2*y),c.setRenderTarget(e),c.render(u,Dc)}}function Jv(i){const t=[],e=[],n=[];let s=i;const r=i-js+1+Hu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-js?c=Hu[o-i+js-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,p=2,m=1,_=new Float32Array(v*g*d),b=new Float32Array(p*g*d),y=new Float32Array(m*g*d);for(let T=0;T<d;T++){const R=T%3*2/3-1,D=T>2?0:-1,E=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];_.set(E,v*g*T),b.set(f,p*g*T);const S=[T,T,T,T,T,T];y.set(S,m*g*T)}const w=new Qe;w.setAttribute("position",new an(_,v)),w.setAttribute("uv",new an(b,p)),w.setAttribute("faceIndex",new an(y,m)),t.push(w),s>js&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Xu(i,t,e){const n=new vs(i,t,e);return n.texture.mapping=Za,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qo(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Qv(i,t,e){const n=new Float32Array(ls),s=new U(0,1,0);return new Je({name:"SphericalGaussianBlur",defines:{n:ls,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ch(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function qu(){return new Je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ch(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Yu(){return new Je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Ch(){return`

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
	`}function t_(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===yl||c===Ml,h=c===ar||c===cr;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Wu(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Wu(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function e_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&oo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function n_(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(d!==null){const _=d.array;v=d.version;for(let b=0,y=_.length;b<y;b+=3){const w=_[b+0],T=_[b+1],R=_[b+2];f.push(w,T,T,R,R,w)}}else if(g!==void 0){const _=g.array;v=g.version;for(let b=0,y=_.length/3-1;b<y;b+=3){const w=b+0,T=b+1,R=b+2;f.push(w,T,T,R,R,w)}}else return;const p=new(Pd(f)?Nd:Ud)(f,1);p.version=v;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function i_(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function u(f,d,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,g);let m=0;for(let _=0;_<g;_++)m+=d[_]*v[_];e.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function s_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function r_(i,t,e){const n=new WeakMap,s=new De;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let S=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),v===!0&&(y=2),p===!0&&(y=3);let w=a.attributes.position.count*y,T=1;w>t.maxTextureSize&&(T=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const R=new Float32Array(w*T*4*u),D=new Ld(R,w,T,u);D.type=Jn,D.needsUpdate=!0;const E=y*4;for(let P=0;P<u;P++){const F=m[P],O=_[P],q=b[P],W=w*T*4*P;for(let K=0;K<F.count;K++){const $=K*E;g===!0&&(s.fromBufferAttribute(F,K),R[W+$+0]=s.x,R[W+$+1]=s.y,R[W+$+2]=s.z,R[W+$+3]=0),v===!0&&(s.fromBufferAttribute(O,K),R[W+$+4]=s.x,R[W+$+5]=s.y,R[W+$+6]=s.z,R[W+$+7]=0),p===!0&&(s.fromBufferAttribute(q,K),R[W+$+8]=s.x,R[W+$+9]=s.y,R[W+$+10]=s.z,R[W+$+11]=q.itemSize===4?s.w:1)}}f={count:u,texture:D,size:new $t(w,T)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function o_(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const qd=new Ze,ju=new Gd(1,1),Yd=new Ld,jd=new C0,Kd=new zd,Ku=[],Zu=[],$u=new Float32Array(16),Ju=new Float32Array(9),Qu=new Float32Array(4);function _r(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ku[s];if(r===void 0&&(r=new Float32Array(s),Ku[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ze(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function $a(i,t){let e=Zu[t];e===void 0&&(e=new Int32Array(t),Zu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function a_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function c_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function l_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function h_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function u_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(ze(e,n))return;Qu.set(n),i.uniformMatrix2fv(this.addr,!1,Qu),Oe(e,n)}}function f_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(ze(e,n))return;Ju.set(n),i.uniformMatrix3fv(this.addr,!1,Ju),Oe(e,n)}}function d_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(ze(e,n))return;$u.set(n),i.uniformMatrix4fv(this.addr,!1,$u),Oe(e,n)}}function p_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function m_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function g_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function v_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function __(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function x_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function y_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function M_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function b_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ju.compareFunction=Rd,r=ju):r=qd,e.setTexture2D(t||r,s)}function S_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||jd,s)}function E_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kd,s)}function w_(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yd,s)}function T_(i){switch(i){case 5126:return a_;case 35664:return c_;case 35665:return l_;case 35666:return h_;case 35674:return u_;case 35675:return f_;case 35676:return d_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return v_;case 5125:return __;case 36294:return x_;case 36295:return y_;case 36296:return M_;case 35678:case 36198:case 36298:case 36306:case 35682:return b_;case 35679:case 36299:case 36307:return S_;case 35680:case 36300:case 36308:case 36293:return E_;case 36289:case 36303:case 36311:case 36292:return w_}}function A_(i,t){i.uniform1fv(this.addr,t)}function R_(i,t){const e=_r(t,this.size,2);i.uniform2fv(this.addr,e)}function C_(i,t){const e=_r(t,this.size,3);i.uniform3fv(this.addr,e)}function P_(i,t){const e=_r(t,this.size,4);i.uniform4fv(this.addr,e)}function L_(i,t){const e=_r(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function D_(i,t){const e=_r(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function I_(i,t){const e=_r(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function U_(i,t){i.uniform1iv(this.addr,t)}function N_(i,t){i.uniform2iv(this.addr,t)}function F_(i,t){i.uniform3iv(this.addr,t)}function k_(i,t){i.uniform4iv(this.addr,t)}function z_(i,t){i.uniform1uiv(this.addr,t)}function O_(i,t){i.uniform2uiv(this.addr,t)}function B_(i,t){i.uniform3uiv(this.addr,t)}function H_(i,t){i.uniform4uiv(this.addr,t)}function V_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);ze(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||qd,r[o])}function G_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);ze(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||jd,r[o])}function W_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);ze(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Kd,r[o])}function X_(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);ze(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Yd,r[o])}function q_(i){switch(i){case 5126:return A_;case 35664:return R_;case 35665:return C_;case 35666:return P_;case 35674:return L_;case 35675:return D_;case 35676:return I_;case 5124:case 35670:return U_;case 35667:case 35671:return N_;case 35668:case 35672:return F_;case 35669:case 35673:return k_;case 5125:return z_;case 36294:return O_;case 36295:return B_;case 36296:return H_;case 35678:case 36198:case 36298:case 36306:case 35682:return V_;case 35679:case 36299:case 36307:return G_;case 35680:case 36300:case 36308:case 36293:return W_;case 36289:case 36303:case 36311:case 36292:return X_}}class Y_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=T_(e.type)}}class j_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=q_(e.type)}}class K_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const kc=/(\w+)(\])?(\[|\.)?/g;function tf(i,t){i.seq.push(t),i.map[t.id]=t}function Z_(i,t,e){const n=i.name,s=n.length;for(kc.lastIndex=0;;){const r=kc.exec(n),o=kc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){tf(e,l===void 0?new Y_(a,i,t):new j_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new K_(a),tf(e,u)),e=u}}}class xa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Z_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function ef(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const $_=37297;let J_=0;function Q_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const nf=new Vt;function tx(i){ne._getMatrix(nf,ne.workingColorSpace,i);const t=`mat3( ${nf.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(i)){case Ia:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function sf(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Q_(i.getShaderSource(t),a)}else return r}function ex(i,t){const e=tx(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nx(i,t){let e;switch(t){case Hm:e="Linear";break;case Vm:e="Reinhard";break;case Gm:e="Cineon";break;case Wm:e="ACESFilmic";break;case qm:e="AgX";break;case Ym:e="Neutral";break;case Xm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ta=new U;function ix(){ne.getLuminanceCoefficients(ta);const i=ta.x.toFixed(4),t=ta.y.toFixed(4),e=ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function rx(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ox(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Hr(i){return i!==""}function rf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function of(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ax=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(i){return i.replace(ax,lx)}const cx=new Map;function lx(i,t){let e=Gt[t];if(e===void 0){const n=cx.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ql(e)}const hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function af(i){return i.replace(hx,ux)}function ux(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function fx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===_d?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ym?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ui&&(t="SHADOWMAP_TYPE_VSM"),t}function dx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ar:case cr:t="ENVMAP_TYPE_CUBE";break;case Za:t="ENVMAP_TYPE_CUBE_UV";break}return t}function px(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===cr&&(t="ENVMAP_MODE_REFRACTION"),t}function mx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case xd:t="ENVMAP_BLENDING_MULTIPLY";break;case Om:t="ENVMAP_BLENDING_MIX";break;case Bm:t="ENVMAP_BLENDING_ADD";break}return t}function gx(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function vx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=fx(e),l=dx(e),h=px(e),u=mx(e),f=gx(e),d=sx(e),g=rx(r),v=s.createProgram();let p,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hr).join(`
`),m.length>0&&(m+=`
`)):(p=[cf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),m=[cf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pi?"#define TONE_MAPPING":"",e.toneMapping!==pi?Gt.tonemapping_pars_fragment:"",e.toneMapping!==pi?nx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,ex("linearToOutputTexel",e.outputColorSpace),ix(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hr).join(`
`)),o=Ql(o),o=rf(o,e),o=of(o,e),a=Ql(a),a=rf(a,e),a=of(a,e),o=af(o),a=af(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=_+p+o,y=_+m+a,w=ef(s,s.VERTEX_SHADER,b),T=ef(s,s.FRAGMENT_SHADER,y);s.attachShader(v,w),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(P){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",O=s.getShaderInfoLog(w)||"",q=s.getShaderInfoLog(T)||"",W=F.trim(),K=O.trim(),$=q.trim();let G=!0,st=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,w,T);else{const ct=sf(s,w,"vertex"),ft=sf(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+W+`
`+ct+`
`+ft)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(K===""||$==="")&&(st=!1);st&&(P.diagnostics={runnable:G,programLog:W,vertexShader:{log:K,prefix:p},fragmentShader:{log:$,prefix:m}})}s.deleteShader(w),s.deleteShader(T),D=new xa(s,v),E=ox(s,v)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,$_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=J_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=T,this}let _x=0;class xx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new yx(t),e.set(t,n)),n}}class yx{constructor(t){this.id=_x++,this.code=t,this.usedTimes=0}}function Mx(i,t,e,n,s,r,o){const a=new Dd,c=new xx,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function p(E,S,P,F,O){const q=F.fog,W=O.geometry,K=E.isMeshStandardMaterial?F.environment:null,$=(E.isMeshStandardMaterial?e:t).get(E.envMap||K),G=$&&$.mapping===Za?$.image.height:null,st=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ft=ct!==void 0?ct.length:0;let Wt=0;W.morphAttributes.position!==void 0&&(Wt=1),W.morphAttributes.normal!==void 0&&(Wt=2),W.morphAttributes.color!==void 0&&(Wt=3);let ie,pe,Xt,j;if(st){const se=jn[st];ie=se.vertexShader,pe=se.fragmentShader}else ie=E.vertexShader,pe=E.fragmentShader,c.update(E),Xt=c.getVertexShaderID(E),j=c.getFragmentShaderID(E);const J=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Ut=O.isInstancedMesh===!0,Et=O.isBatchedMesh===!0,jt=!!E.map,Ie=!!E.matcap,C=!!$,he=!!E.aoMap,zt=!!E.lightMap,It=!!E.bumpMap,_t=!!E.normalMap,ue=!!E.displacementMap,xt=!!E.emissiveMap,Ot=!!E.metalnessMap,Le=!!E.roughnessMap,_e=E.anisotropy>0,A=E.clearcoat>0,x=E.dispersion>0,z=E.iridescence>0,Y=E.sheen>0,Q=E.transmission>0,X=_e&&!!E.anisotropyMap,Ct=A&&!!E.clearcoatMap,rt=A&&!!E.clearcoatNormalMap,wt=A&&!!E.clearcoatRoughnessMap,At=z&&!!E.iridescenceMap,nt=z&&!!E.iridescenceThicknessMap,ut=Y&&!!E.sheenColorMap,Ft=Y&&!!E.sheenRoughnessMap,Rt=!!E.specularMap,lt=!!E.specularColorMap,Ht=!!E.specularIntensityMap,L=Q&&!!E.transmissionMap,it=Q&&!!E.thicknessMap,ot=!!E.gradientMap,gt=!!E.alphaMap,tt=E.alphaTest>0,Z=!!E.alphaHash,bt=!!E.extensions;let Bt=pi;E.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Bt=i.toneMapping);const me={shaderID:st,shaderType:E.type,shaderName:E.name,vertexShader:ie,fragmentShader:pe,defines:E.defines,customVertexShaderID:Xt,customFragmentShaderID:j,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:Et,batchingColor:Et&&O._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&O.instanceColor!==null,instancingMorph:Ut&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:lr,alphaToCoverage:!!E.alphaToCoverage,map:jt,matcap:Ie,envMap:C,envMapMode:C&&$.mapping,envMapCubeUVHeight:G,aoMap:he,lightMap:zt,bumpMap:It,normalMap:_t,displacementMap:f&&ue,emissiveMap:xt,normalMapObjectSpace:_t&&E.normalMapType===Jm,normalMapTangentSpace:_t&&E.normalMapType===$m,metalnessMap:Ot,roughnessMap:Le,anisotropy:_e,anisotropyMap:X,clearcoat:A,clearcoatMap:Ct,clearcoatNormalMap:rt,clearcoatRoughnessMap:wt,dispersion:x,iridescence:z,iridescenceMap:At,iridescenceThicknessMap:nt,sheen:Y,sheenColorMap:ut,sheenRoughnessMap:Ft,specularMap:Rt,specularColorMap:lt,specularIntensityMap:Ht,transmission:Q,transmissionMap:L,thicknessMap:it,gradientMap:ot,opaque:E.transparent===!1&&E.blending===Qs&&E.alphaToCoverage===!1,alphaMap:gt,alphaTest:tt,alphaHash:Z,combine:E.combine,mapUv:jt&&v(E.map.channel),aoMapUv:he&&v(E.aoMap.channel),lightMapUv:zt&&v(E.lightMap.channel),bumpMapUv:It&&v(E.bumpMap.channel),normalMapUv:_t&&v(E.normalMap.channel),displacementMapUv:ue&&v(E.displacementMap.channel),emissiveMapUv:xt&&v(E.emissiveMap.channel),metalnessMapUv:Ot&&v(E.metalnessMap.channel),roughnessMapUv:Le&&v(E.roughnessMap.channel),anisotropyMapUv:X&&v(E.anisotropyMap.channel),clearcoatMapUv:Ct&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:rt&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&v(E.sheenRoughnessMap.channel),specularMapUv:Rt&&v(E.specularMap.channel),specularColorMapUv:lt&&v(E.specularColorMap.channel),specularIntensityMapUv:Ht&&v(E.specularIntensityMap.channel),transmissionMapUv:L&&v(E.transmissionMap.channel),thicknessMapUv:it&&v(E.thicknessMap.channel),alphaMapUv:gt&&v(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(_t||_e),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(jt||gt),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:mt,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Wt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Bt,decodeVideoTexture:jt&&E.map.isVideoTexture===!0&&ne.getTransfer(E.map.colorSpace)===le,decodeVideoTextureEmissive:xt&&E.emissiveMap.isVideoTexture===!0&&ne.getTransfer(E.emissiveMap.colorSpace)===le,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===zn,flipSided:E.side===on,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:bt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&E.extensions.multiDraw===!0||Et)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return me.vertexUv1s=l.has(1),me.vertexUv2s=l.has(2),me.vertexUv3s=l.has(3),l.clear(),me}function m(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)S.push(P),S.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(_(S,E),b(S,E),S.push(i.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function _(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function b(E,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),E.push(a.mask)}function y(E){const S=g[E.type];let P;if(S){const F=jn[S];P=V0.clone(F.uniforms)}else P=E.uniforms;return P}function w(E,S){let P;for(let F=0,O=h.length;F<O;F++){const q=h[F];if(q.cacheKey===S){P=q,++P.usedTimes;break}}return P===void 0&&(P=new vx(i,S,E,r),h.push(P)),P}function T(E){if(--E.usedTimes===0){const S=h.indexOf(E);h[S]=h[h.length-1],h.pop(),E.destroy()}}function R(E){c.remove(E)}function D(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:y,acquireProgram:w,releaseProgram:T,releaseShaderCache:R,programs:h,dispose:D}}function bx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Sx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function lf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function hf(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,v,p){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:p},i[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=v,m.group=p),t++,m}function a(u,f,d,g,v,p){const m=o(u,f,d,g,v,p);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):e.push(m)}function c(u,f,d,g,v,p){const m=o(u,f,d,g,v,p);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,f){e.length>1&&e.sort(u||Sx),n.length>1&&n.sort(f||lf),s.length>1&&s.sort(f||lf)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Ex(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new hf,i.set(n,[o])):s>=r.length?(o=new hf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function wx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new qt};break;case"SpotLight":e={position:new U,direction:new U,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function Tx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Ax=0;function Rx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Cx(i){const t=new wx,e=Tx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);const s=new U,r=new ge,o=new ge;function a(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,v=0,p=0,m=0,_=0,b=0,y=0,w=0,T=0,R=0;l.sort(Rx);for(let E=0,S=l.length;E<S;E++){const P=l[E],F=P.color,O=P.intensity,q=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*O,u+=F.g*O,f+=F.b*O;else if(P.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(P.sh.coefficients[K],O);R++}else if(P.isDirectionalLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const $=P.shadow,G=e.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=P.shadow.matrix,_++}n.directional[d]=K,d++}else if(P.isSpotLight){const K=t.get(P);K.position.setFromMatrixPosition(P.matrixWorld),K.color.copy(F).multiplyScalar(O),K.distance=q,K.coneCos=Math.cos(P.angle),K.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),K.decay=P.decay,n.spot[v]=K;const $=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,$.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[v]=$.matrix,P.castShadow){const G=e.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=W,y++}v++}else if(P.isRectAreaLight){const K=t.get(P);K.color.copy(F).multiplyScalar(O),K.halfWidth.set(P.width*.5,0,0),K.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=K,p++}else if(P.isPointLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),K.distance=P.distance,K.decay=P.decay,P.castShadow){const $=P.shadow,G=e.get(P);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,G.shadowCameraNear=$.camera.near,G.shadowCameraFar=$.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=K,g++}else if(P.isHemisphereLight){const K=t.get(P);K.skyColor.copy(P.color).multiplyScalar(O),K.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[m]=K,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==p||D.hemiLength!==m||D.numDirectionalShadows!==_||D.numPointShadows!==b||D.numSpotShadows!==y||D.numSpotMaps!==w||D.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,D.directionalLength=d,D.pointLength=g,D.spotLength=v,D.rectAreaLength=p,D.hemiLength=m,D.numDirectionalShadows=_,D.numPointShadows=b,D.numSpotShadows=y,D.numSpotMaps=w,D.numLightProbes=R,n.version=Ax++)}function c(l,h){let u=0,f=0,d=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,_=l.length;m<_;m++){const b=l[m];if(b.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(b.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),d++}else if(b.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),o.identity(),r.copy(b.matrixWorld),r.premultiply(p),o.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:n}}function uf(i){const t=new Cx(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Px(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new uf(i),t.set(s,[a])):r>=o.length?(a=new uf(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Lx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dx=`uniform sampler2D shadow_pass;
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
}`;function Ix(i,t,e){let n=new Hd;const s=new $t,r=new $t,o=new De,a=new rg({depthPacking:Zm}),c=new og,l={},h=e.maxTextureSize,u={[Hi]:on,[on]:Hi,[zn]:zn},f=new Je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:Lx,fragmentShader:Dx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Qe;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ce(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_d;let m=this.type;this.render=function(T,R,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const E=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Fi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==ui&&this.type===ui,q=m===ui&&this.type!==ui;for(let W=0,K=T.length;W<K;W++){const $=T[W],G=$.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const st=G.getFrameExtents();if(s.multiply(st),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,G.mapSize.y=r.y)),G.map===null||O===!0||q===!0){const ft=this.type!==ui?{minFilter:ke,magFilter:ke}:{};G.map!==null&&G.map.dispose(),G.map=new vs(s.x,s.y,ft),G.map.texture.name=$.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const ct=G.getViewportCount();for(let ft=0;ft<ct;ft++){const Wt=G.getViewport(ft);o.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),F.viewport(o),G.updateMatrices($,ft),n=G.getFrustum(),y(R,D,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===ui&&_(G,D),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(E,S,P)};function _(T,R){const D=t.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new vs(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,D,f,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,D,d,v,null)}function b(T,R,D,E){let S=null;const P=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)S=P;else if(S=D.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=S.uuid,O=R.uuid;let q=l[F];q===void 0&&(q={},l[F]=q);let W=q[O];W===void 0&&(W=S.clone(),q[O]=W,R.addEventListener("dispose",w)),S=W}if(S.visible=R.visible,S.wireframe=R.wireframe,E===ui?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:u[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=i.properties.get(S);F.light=D}return S}function y(T,R,D,E,S){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===ui)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const O=t.update(T),q=T.material;if(Array.isArray(q)){const W=O.groups;for(let K=0,$=W.length;K<$;K++){const G=W[K],st=q[G.materialIndex];if(st&&st.visible){const ct=b(T,st,E,S);T.onBeforeShadow(i,T,R,D,O,ct,G),i.renderBufferDirect(D,null,O,ct,T,G),T.onAfterShadow(i,T,R,D,O,ct,G)}}}else if(q.visible){const W=b(T,q,E,S);T.onBeforeShadow(i,T,R,D,O,W,null),i.renderBufferDirect(D,null,O,W,T,null),T.onAfterShadow(i,T,R,D,O,W,null)}}const F=T.children;for(let O=0,q=F.length;O<q;O++)y(F[O],R,D,E,S)}function w(T){T.target.removeEventListener("dispose",w);for(const D in l){const E=l[D],S=T.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}const Ux={[dl]:pl,[ml]:_l,[gl]:xl,[or]:vl,[pl]:dl,[_l]:ml,[xl]:gl,[vl]:or};function Nx(i,t){function e(){let L=!1;const it=new De;let ot=null;const gt=new De(0,0,0,0);return{setMask:function(tt){ot!==tt&&!L&&(i.colorMask(tt,tt,tt,tt),ot=tt)},setLocked:function(tt){L=tt},setClear:function(tt,Z,bt,Bt,me){me===!0&&(tt*=Bt,Z*=Bt,bt*=Bt),it.set(tt,Z,bt,Bt),gt.equals(it)===!1&&(i.clearColor(tt,Z,bt,Bt),gt.copy(it))},reset:function(){L=!1,ot=null,gt.set(-1,0,0,0)}}}function n(){let L=!1,it=!1,ot=null,gt=null,tt=null;return{setReversed:function(Z){if(it!==Z){const bt=t.get("EXT_clip_control");Z?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),it=Z;const Bt=tt;tt=null,this.setClear(Bt)}},getReversed:function(){return it},setTest:function(Z){Z?J(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(Z){ot!==Z&&!L&&(i.depthMask(Z),ot=Z)},setFunc:function(Z){if(it&&(Z=Ux[Z]),gt!==Z){switch(Z){case dl:i.depthFunc(i.NEVER);break;case pl:i.depthFunc(i.ALWAYS);break;case ml:i.depthFunc(i.LESS);break;case or:i.depthFunc(i.LEQUAL);break;case gl:i.depthFunc(i.EQUAL);break;case vl:i.depthFunc(i.GEQUAL);break;case _l:i.depthFunc(i.GREATER);break;case xl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=Z}},setLocked:function(Z){L=Z},setClear:function(Z){tt!==Z&&(it&&(Z=1-Z),i.clearDepth(Z),tt=Z)},reset:function(){L=!1,ot=null,gt=null,tt=null,it=!1}}}function s(){let L=!1,it=null,ot=null,gt=null,tt=null,Z=null,bt=null,Bt=null,me=null;return{setTest:function(se){L||(se?J(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(se){it!==se&&!L&&(i.stencilMask(se),it=se)},setFunc:function(se,ii,Wn){(ot!==se||gt!==ii||tt!==Wn)&&(i.stencilFunc(se,ii,Wn),ot=se,gt=ii,tt=Wn)},setOp:function(se,ii,Wn){(Z!==se||bt!==ii||Bt!==Wn)&&(i.stencilOp(se,ii,Wn),Z=se,bt=ii,Bt=Wn)},setLocked:function(se){L=se},setClear:function(se){me!==se&&(i.clearStencil(se),me=se)},reset:function(){L=!1,it=null,ot=null,gt=null,tt=null,Z=null,bt=null,Bt=null,me=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,v=!1,p=null,m=null,_=null,b=null,y=null,w=null,T=null,R=new qt(0,0,0),D=0,E=!1,S=null,P=null,F=null,O=null,q=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,$=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(G)[1]),K=$>=1):G.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),K=$>=2);let st=null,ct={};const ft=i.getParameter(i.SCISSOR_BOX),Wt=i.getParameter(i.VIEWPORT),ie=new De().fromArray(ft),pe=new De().fromArray(Wt);function Xt(L,it,ot,gt){const tt=new Uint8Array(4),Z=i.createTexture();i.bindTexture(L,Z),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<ot;bt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,gt,0,i.RGBA,i.UNSIGNED_BYTE,tt):i.texImage2D(it+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,tt);return Z}const j={};j[i.TEXTURE_2D]=Xt(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(i.DEPTH_TEST),o.setFunc(or),It(!1),_t(au),J(i.CULL_FACE),he(Fi);function J(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function mt(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Ut(L,it){return u[L]!==it?(i.bindFramebuffer(L,it),u[L]=it,L===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=it),L===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=it),!0):!1}function Et(L,it){let ot=d,gt=!1;if(L){ot=f.get(it),ot===void 0&&(ot=[],f.set(it,ot));const tt=L.textures;if(ot.length!==tt.length||ot[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,bt=tt.length;Z<bt;Z++)ot[Z]=i.COLOR_ATTACHMENT0+Z;ot.length=tt.length,gt=!0}}else ot[0]!==i.BACK&&(ot[0]=i.BACK,gt=!0);gt&&i.drawBuffers(ot)}function jt(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const Ie={[cs]:i.FUNC_ADD,[bm]:i.FUNC_SUBTRACT,[Sm]:i.FUNC_REVERSE_SUBTRACT};Ie[Em]=i.MIN,Ie[wm]=i.MAX;const C={[Tm]:i.ZERO,[Am]:i.ONE,[Rm]:i.SRC_COLOR,[ul]:i.SRC_ALPHA,[Um]:i.SRC_ALPHA_SATURATE,[Dm]:i.DST_COLOR,[Pm]:i.DST_ALPHA,[Cm]:i.ONE_MINUS_SRC_COLOR,[fl]:i.ONE_MINUS_SRC_ALPHA,[Im]:i.ONE_MINUS_DST_COLOR,[Lm]:i.ONE_MINUS_DST_ALPHA,[Nm]:i.CONSTANT_COLOR,[Fm]:i.ONE_MINUS_CONSTANT_COLOR,[km]:i.CONSTANT_ALPHA,[zm]:i.ONE_MINUS_CONSTANT_ALPHA};function he(L,it,ot,gt,tt,Z,bt,Bt,me,se){if(L===Fi){v===!0&&(mt(i.BLEND),v=!1);return}if(v===!1&&(J(i.BLEND),v=!0),L!==Mm){if(L!==p||se!==E){if((m!==cs||y!==cs)&&(i.blendEquation(i.FUNC_ADD),m=cs,y=cs),se)switch(L){case Qs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cu:i.blendFunc(i.ONE,i.ONE);break;case lu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case hu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case lu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}_=null,b=null,w=null,T=null,R.set(0,0,0),D=0,p=L,E=se}return}tt=tt||it,Z=Z||ot,bt=bt||gt,(it!==m||tt!==y)&&(i.blendEquationSeparate(Ie[it],Ie[tt]),m=it,y=tt),(ot!==_||gt!==b||Z!==w||bt!==T)&&(i.blendFuncSeparate(C[ot],C[gt],C[Z],C[bt]),_=ot,b=gt,w=Z,T=bt),(Bt.equals(R)===!1||me!==D)&&(i.blendColor(Bt.r,Bt.g,Bt.b,me),R.copy(Bt),D=me),p=L,E=!1}function zt(L,it){L.side===zn?mt(i.CULL_FACE):J(i.CULL_FACE);let ot=L.side===on;it&&(ot=!ot),It(ot),L.blending===Qs&&L.transparent===!1?he(Fi):he(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const gt=L.stencilWrite;a.setTest(gt),gt&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),xt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function It(L){S!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),S=L)}function _t(L){L!==_m?(J(i.CULL_FACE),L!==P&&(L===au?i.cullFace(i.BACK):L===xm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),P=L}function ue(L){L!==F&&(K&&i.lineWidth(L),F=L)}function xt(L,it,ot){L?(J(i.POLYGON_OFFSET_FILL),(O!==it||q!==ot)&&(i.polygonOffset(it,ot),O=it,q=ot)):mt(i.POLYGON_OFFSET_FILL)}function Ot(L){L?J(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function Le(L){L===void 0&&(L=i.TEXTURE0+W-1),st!==L&&(i.activeTexture(L),st=L)}function _e(L,it,ot){ot===void 0&&(st===null?ot=i.TEXTURE0+W-1:ot=st);let gt=ct[ot];gt===void 0&&(gt={type:void 0,texture:void 0},ct[ot]=gt),(gt.type!==L||gt.texture!==it)&&(st!==ot&&(i.activeTexture(ot),st=ot),i.bindTexture(L,it||j[L]),gt.type=L,gt.texture=it)}function A(){const L=ct[st];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{i.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ct(){try{i.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function rt(){try{i.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function wt(){try{i.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function At(){try{i.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function nt(){try{i.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(L){ie.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ie.copy(L))}function Ft(L){pe.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),pe.copy(L))}function Rt(L,it){let ot=l.get(it);ot===void 0&&(ot=new WeakMap,l.set(it,ot));let gt=ot.get(L);gt===void 0&&(gt=i.getUniformBlockIndex(it,L.name),ot.set(L,gt))}function lt(L,it){const gt=l.get(it).get(L);c.get(it)!==gt&&(i.uniformBlockBinding(it,gt,L.__bindingPointIndex),c.set(it,gt))}function Ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ct={},u={},f=new WeakMap,d=[],g=null,v=!1,p=null,m=null,_=null,b=null,y=null,w=null,T=null,R=new qt(0,0,0),D=0,E=!1,S=null,P=null,F=null,O=null,q=null,ie.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:J,disable:mt,bindFramebuffer:Ut,drawBuffers:Et,useProgram:jt,setBlending:he,setMaterial:zt,setFlipSided:It,setCullFace:_t,setLineWidth:ue,setPolygonOffset:xt,setScissorTest:Ot,activeTexture:Le,bindTexture:_e,unbindTexture:A,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:At,texImage3D:nt,updateUBOMapping:Rt,uniformBlockBinding:lt,texStorage2D:rt,texStorage3D:wt,texSubImage2D:Y,texSubImage3D:Q,compressedTexSubImage2D:X,compressedTexSubImage3D:Ct,scissor:ut,viewport:Ft,reset:Ht}}function Fx(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $t,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,x){return d?new OffscreenCanvas(A,x):Na("canvas")}function v(A,x,z){let Y=1;const Q=_e(A);if((Q.width>z||Q.height>z)&&(Y=z/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(Y*Q.width),Ct=Math.floor(Y*Q.height);u===void 0&&(u=g(X,Ct));const rt=x?g(X,Ct):u;return rt.width=X,rt.height=Ct,rt.getContext("2d").drawImage(A,0,0,X,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+X+"x"+Ct+")."),rt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function p(A){return A.generateMipmaps}function m(A){i.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(A,x,z,Y,Q=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=x;if(x===i.RED&&(z===i.FLOAT&&(X=i.R32F),z===i.HALF_FLOAT&&(X=i.R16F),z===i.UNSIGNED_BYTE&&(X=i.R8)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.R8UI),z===i.UNSIGNED_SHORT&&(X=i.R16UI),z===i.UNSIGNED_INT&&(X=i.R32UI),z===i.BYTE&&(X=i.R8I),z===i.SHORT&&(X=i.R16I),z===i.INT&&(X=i.R32I)),x===i.RG&&(z===i.FLOAT&&(X=i.RG32F),z===i.HALF_FLOAT&&(X=i.RG16F),z===i.UNSIGNED_BYTE&&(X=i.RG8)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RG8UI),z===i.UNSIGNED_SHORT&&(X=i.RG16UI),z===i.UNSIGNED_INT&&(X=i.RG32UI),z===i.BYTE&&(X=i.RG8I),z===i.SHORT&&(X=i.RG16I),z===i.INT&&(X=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RGB8UI),z===i.UNSIGNED_SHORT&&(X=i.RGB16UI),z===i.UNSIGNED_INT&&(X=i.RGB32UI),z===i.BYTE&&(X=i.RGB8I),z===i.SHORT&&(X=i.RGB16I),z===i.INT&&(X=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),z===i.UNSIGNED_INT&&(X=i.RGBA32UI),z===i.BYTE&&(X=i.RGBA8I),z===i.SHORT&&(X=i.RGBA16I),z===i.INT&&(X=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),x===i.RGBA){const Ct=Q?Ia:ne.getTransfer(Y);z===i.FLOAT&&(X=i.RGBA32F),z===i.HALF_FLOAT&&(X=i.RGBA16F),z===i.UNSIGNED_BYTE&&(X=Ct===le?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(A,x){let z;return A?x===null||x===gs||x===no?z=i.DEPTH24_STENCIL8:x===Jn?z=i.DEPTH32F_STENCIL8:x===eo&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===gs||x===no?z=i.DEPTH_COMPONENT24:x===Jn?z=i.DEPTH_COMPONENT32F:x===eo&&(z=i.DEPTH_COMPONENT16),z}function w(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==ke&&A.minFilter!==$n?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function T(A){const x=A.target;x.removeEventListener("dispose",T),D(x),x.isVideoTexture&&h.delete(x)}function R(A){const x=A.target;x.removeEventListener("dispose",R),S(x)}function D(A){const x=n.get(A);if(x.__webglInit===void 0)return;const z=A.source,Y=f.get(z);if(Y){const Q=Y[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(A),Object.keys(Y).length===0&&f.delete(z)}n.remove(A)}function E(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const z=A.source,Y=f.get(z);delete Y[x.__cacheKey],o.memory.textures--}function S(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let Q=0;Q<x.__webglFramebuffer[Y].length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[Y][Q]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=A.textures;for(let Y=0,Q=z.length;Y<Q;Y++){const X=n.get(z[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(z[Y])}n.remove(A)}let P=0;function F(){P=0}function O(){const A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function q(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function W(A,x){const z=n.get(A);if(A.isVideoTexture&&Ot(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const Y=A.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(z,A,x);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function K(A,x){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){j(z,A,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function $(A,x){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){j(z,A,x);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function G(A,x){const z=n.get(A);if(A.version>0&&z.__version!==A.version){J(z,A,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}const st={[bl]:i.REPEAT,[us]:i.CLAMP_TO_EDGE,[Sl]:i.MIRRORED_REPEAT},ct={[ke]:i.NEAREST,[jm]:i.NEAREST_MIPMAP_NEAREST,[Or]:i.NEAREST_MIPMAP_LINEAR,[$n]:i.LINEAR,[oc]:i.LINEAR_MIPMAP_NEAREST,[Ii]:i.LINEAR_MIPMAP_LINEAR},ft={[Qm]:i.NEVER,[r0]:i.ALWAYS,[t0]:i.LESS,[Rd]:i.LEQUAL,[e0]:i.EQUAL,[s0]:i.GEQUAL,[n0]:i.GREATER,[i0]:i.NOTEQUAL};function Wt(A,x){if(x.type===Jn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===$n||x.magFilter===oc||x.magFilter===Or||x.magFilter===Ii||x.minFilter===$n||x.minFilter===oc||x.minFilter===Or||x.minFilter===Ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,st[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,st[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,st[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ct[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ct[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ft[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ke||x.minFilter!==Or&&x.minFilter!==Ii||x.type===Jn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ie(A,x){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",T));const Y=x.source;let Q=f.get(Y);Q===void 0&&(Q={},f.set(Y,Q));const X=q(x);if(X!==A.__cacheKey){Q[X]===void 0&&(Q[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[X].usedTimes++;const Ct=Q[A.__cacheKey];Ct!==void 0&&(Q[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&E(x)),A.__cacheKey=X,A.__webglTexture=Q[X].texture}return z}function pe(A,x,z){return Math.floor(Math.floor(A/z)/x)}function Xt(A,x,z,Y){const X=A.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{X.sort((nt,ut)=>nt.start-ut.start);let Ct=0;for(let nt=1;nt<X.length;nt++){const ut=X[Ct],Ft=X[nt],Rt=ut.start+ut.count,lt=pe(Ft.start,x.width,4),Ht=pe(ut.start,x.width,4);Ft.start<=Rt+1&&lt===Ht&&pe(Ft.start+Ft.count-1,x.width,4)===lt?ut.count=Math.max(ut.count,Ft.start+Ft.count-ut.start):(++Ct,X[Ct]=Ft)}X.length=Ct+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),wt=i.getParameter(i.UNPACK_SKIP_PIXELS),At=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let nt=0,ut=X.length;nt<ut;nt++){const Ft=X[nt],Rt=Math.floor(Ft.start/4),lt=Math.ceil(Ft.count/4),Ht=Rt%x.width,L=Math.floor(Rt/x.width),it=lt,ot=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ht),i.pixelStorei(i.UNPACK_SKIP_ROWS,L),e.texSubImage2D(i.TEXTURE_2D,0,Ht,L,it,ot,z,Y,x.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function j(A,x,z){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);const Q=ie(A,x),X=x.source;e.bindTexture(Y,A.__webglTexture,i.TEXTURE0+z);const Ct=n.get(X);if(X.version!==Ct.__version||Q===!0){e.activeTexture(i.TEXTURE0+z);const rt=ne.getPrimaries(ne.workingColorSpace),wt=x.colorSpace===Di?null:ne.getPrimaries(x.colorSpace),At=x.colorSpace===Di||rt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let nt=v(x.image,!1,s.maxTextureSize);nt=Le(x,nt);const ut=r.convert(x.format,x.colorSpace),Ft=r.convert(x.type);let Rt=b(x.internalFormat,ut,Ft,x.colorSpace,x.isVideoTexture);Wt(Y,x);let lt;const Ht=x.mipmaps,L=x.isVideoTexture!==!0,it=Ct.__version===void 0||Q===!0,ot=X.dataReady,gt=w(x,nt);if(x.isDepthTexture)Rt=y(x.format===so,x.type),it&&(L?e.texStorage2D(i.TEXTURE_2D,1,Rt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Rt,nt.width,nt.height,0,ut,Ft,null));else if(x.isDataTexture)if(Ht.length>0){L&&it&&e.texStorage2D(i.TEXTURE_2D,gt,Rt,Ht[0].width,Ht[0].height);for(let tt=0,Z=Ht.length;tt<Z;tt++)lt=Ht[tt],L?ot&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Ft,lt.data):e.texImage2D(i.TEXTURE_2D,tt,Rt,lt.width,lt.height,0,ut,Ft,lt.data);x.generateMipmaps=!1}else L?(it&&e.texStorage2D(i.TEXTURE_2D,gt,Rt,nt.width,nt.height),ot&&Xt(x,nt,ut,Ft)):e.texImage2D(i.TEXTURE_2D,0,Rt,nt.width,nt.height,0,ut,Ft,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){L&&it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Rt,Ht[0].width,Ht[0].height,nt.depth);for(let tt=0,Z=Ht.length;tt<Z;tt++)if(lt=Ht[tt],x.format!==Bn)if(ut!==null)if(L){if(ot)if(x.layerUpdates.size>0){const bt=Bu(lt.width,lt.height,x.format,x.type);for(const Bt of x.layerUpdates){const me=lt.data.subarray(Bt*bt/lt.data.BYTES_PER_ELEMENT,(Bt+1)*bt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Bt,lt.width,lt.height,1,ut,me)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Rt,lt.width,lt.height,nt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ot&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,Ft,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Rt,lt.width,lt.height,nt.depth,0,ut,Ft,lt.data)}else{L&&it&&e.texStorage2D(i.TEXTURE_2D,gt,Rt,Ht[0].width,Ht[0].height);for(let tt=0,Z=Ht.length;tt<Z;tt++)lt=Ht[tt],x.format!==Bn?ut!==null?L?ot&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Rt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ot&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Ft,lt.data):e.texImage2D(i.TEXTURE_2D,tt,Rt,lt.width,lt.height,0,ut,Ft,lt.data)}else if(x.isDataArrayTexture)if(L){if(it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,Rt,nt.width,nt.height,nt.depth),ot)if(x.layerUpdates.size>0){const tt=Bu(nt.width,nt.height,x.format,x.type);for(const Z of x.layerUpdates){const bt=nt.data.subarray(Z*tt/nt.data.BYTES_PER_ELEMENT,(Z+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,ut,Ft,bt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,Ft,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,nt.width,nt.height,nt.depth,0,ut,Ft,nt.data);else if(x.isData3DTexture)L?(it&&e.texStorage3D(i.TEXTURE_3D,gt,Rt,nt.width,nt.height,nt.depth),ot&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,Ft,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,nt.width,nt.height,nt.depth,0,ut,Ft,nt.data);else if(x.isFramebufferTexture){if(it)if(L)e.texStorage2D(i.TEXTURE_2D,gt,Rt,nt.width,nt.height);else{let tt=nt.width,Z=nt.height;for(let bt=0;bt<gt;bt++)e.texImage2D(i.TEXTURE_2D,bt,Rt,tt,Z,0,ut,Ft,null),tt>>=1,Z>>=1}}else if(Ht.length>0){if(L&&it){const tt=_e(Ht[0]);e.texStorage2D(i.TEXTURE_2D,gt,Rt,tt.width,tt.height)}for(let tt=0,Z=Ht.length;tt<Z;tt++)lt=Ht[tt],L?ot&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ut,Ft,lt):e.texImage2D(i.TEXTURE_2D,tt,Rt,ut,Ft,lt);x.generateMipmaps=!1}else if(L){if(it){const tt=_e(nt);e.texStorage2D(i.TEXTURE_2D,gt,Rt,tt.width,tt.height)}ot&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Ft,nt)}else e.texImage2D(i.TEXTURE_2D,0,Rt,ut,Ft,nt);p(x)&&m(Y),Ct.__version=X.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function J(A,x,z){if(x.image.length!==6)return;const Y=ie(A,x),Q=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+z);const X=n.get(Q);if(Q.version!==X.__version||Y===!0){e.activeTexture(i.TEXTURE0+z);const Ct=ne.getPrimaries(ne.workingColorSpace),rt=x.colorSpace===Di?null:ne.getPrimaries(x.colorSpace),wt=x.colorSpace===Di||Ct===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const At=x.isCompressedTexture||x.image[0].isCompressedTexture,nt=x.image[0]&&x.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!At&&!nt?ut[Z]=v(x.image[Z],!0,s.maxCubemapSize):ut[Z]=nt?x.image[Z].image:x.image[Z],ut[Z]=Le(x,ut[Z]);const Ft=ut[0],Rt=r.convert(x.format,x.colorSpace),lt=r.convert(x.type),Ht=b(x.internalFormat,Rt,lt,x.colorSpace),L=x.isVideoTexture!==!0,it=X.__version===void 0||Y===!0,ot=Q.dataReady;let gt=w(x,Ft);Wt(i.TEXTURE_CUBE_MAP,x);let tt;if(At){L&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Ht,Ft.width,Ft.height);for(let Z=0;Z<6;Z++){tt=ut[Z].mipmaps;for(let bt=0;bt<tt.length;bt++){const Bt=tt[bt];x.format!==Bn?Rt!==null?L?ot&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,0,0,Bt.width,Bt.height,Rt,Bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,Ht,Bt.width,Bt.height,0,Bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,0,0,Bt.width,Bt.height,Rt,lt,Bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt,Ht,Bt.width,Bt.height,0,Rt,lt,Bt.data)}}}else{if(tt=x.mipmaps,L&&it){tt.length>0&&gt++;const Z=_e(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,Ht,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){L?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,Rt,lt,ut[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,ut[Z].width,ut[Z].height,0,Rt,lt,ut[Z].data);for(let bt=0;bt<tt.length;bt++){const me=tt[bt].image[Z].image;L?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,0,0,me.width,me.height,Rt,lt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,Ht,me.width,me.height,0,Rt,lt,me.data)}}else{L?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Rt,lt,ut[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ht,Rt,lt,ut[Z]);for(let bt=0;bt<tt.length;bt++){const Bt=tt[bt];L?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,0,0,Rt,lt,Bt.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,bt+1,Ht,Rt,lt,Bt.image[Z])}}}p(x)&&m(i.TEXTURE_CUBE_MAP),X.__version=Q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function mt(A,x,z,Y,Q,X){const Ct=r.convert(z.format,z.colorSpace),rt=r.convert(z.type),wt=b(z.internalFormat,Ct,rt,z.colorSpace),At=n.get(x),nt=n.get(z);if(nt.__renderTarget=x,!At.__hasExternalTextures){const ut=Math.max(1,x.width>>X),Ft=Math.max(1,x.height>>X);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,X,wt,ut,Ft,x.depth,0,Ct,rt,null):e.texImage2D(Q,X,wt,ut,Ft,0,Ct,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),xt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Q,nt.__webglTexture,0,ue(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Q,nt.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(A,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const Y=x.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,X=y(x.stencilBuffer,Q),Ct=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=ue(x);xt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,X,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,X,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,X,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,A)}else{const Y=x.textures;for(let Q=0;Q<Y.length;Q++){const X=Y[Q],Ct=r.convert(X.format,X.colorSpace),rt=r.convert(X.type),wt=b(X.internalFormat,Ct,rt,X.colorSpace),At=ue(x);z&&xt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,wt,x.width,x.height):xt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,wt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,wt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Et(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const Q=Y.__webglTexture,X=ue(x);if(x.depthTexture.format===io)xt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(x.depthTexture.format===so)xt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function jt(A){const x=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=Y}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const Y=A.texture.mipmaps;Y&&Y.length>0?Et(x.__webglFramebuffer[0],A):Et(x.__webglFramebuffer,A)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),Ut(x.__webglDepthbuffer[Y],A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,X)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Ut(x.__webglDepthbuffer,A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(A,x,z){const Y=n.get(A);x!==void 0&&mt(Y.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&jt(A)}function C(A){const x=A.texture,z=n.get(A),Y=n.get(x);A.addEventListener("dispose",R);const Q=A.textures,X=A.isWebGLCubeRenderTarget===!0,Ct=Q.length>1;if(Ct||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,o.memory.textures++),X){z.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[rt]=[];for(let wt=0;wt<x.mipmaps.length;wt++)z.__webglFramebuffer[rt][wt]=i.createFramebuffer()}else z.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let rt=0;rt<x.mipmaps.length;rt++)z.__webglFramebuffer[rt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let rt=0,wt=Q.length;rt<wt;rt++){const At=n.get(Q[rt]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&xt(A)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const wt=Q[rt];z.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[rt]);const At=r.convert(wt.format,wt.colorSpace),nt=r.convert(wt.type),ut=b(wt.internalFormat,At,nt,wt.colorSpace,A.isXRRenderTarget===!0),Ft=ue(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,ut,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,z.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(z.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Wt(i.TEXTURE_CUBE_MAP,x);for(let rt=0;rt<6;rt++)if(x.mipmaps&&x.mipmaps.length>0)for(let wt=0;wt<x.mipmaps.length;wt++)mt(z.__webglFramebuffer[rt][wt],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,wt);else mt(z.__webglFramebuffer[rt],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);p(x)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let rt=0,wt=Q.length;rt<wt;rt++){const At=Q[rt],nt=n.get(At);let ut=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,nt.__webglTexture),Wt(ut,At),mt(z.__webglFramebuffer,A,At,i.COLOR_ATTACHMENT0+rt,ut,0),p(At)&&m(ut)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(rt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,Y.__webglTexture),Wt(rt,x),x.mipmaps&&x.mipmaps.length>0)for(let wt=0;wt<x.mipmaps.length;wt++)mt(z.__webglFramebuffer[wt],A,x,i.COLOR_ATTACHMENT0,rt,wt);else mt(z.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,rt,0);p(x)&&m(rt),e.unbindTexture()}A.depthBuffer&&jt(A)}function he(A){const x=A.textures;for(let z=0,Y=x.length;z<Y;z++){const Q=x[z];if(p(Q)){const X=_(A),Ct=n.get(Q).__webglTexture;e.bindTexture(X,Ct),m(X),e.unbindTexture()}}}const zt=[],It=[];function _t(A){if(A.samples>0){if(xt(A)===!1){const x=A.textures,z=A.width,Y=A.height;let Q=i.COLOR_BUFFER_BIT;const X=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(A),rt=x.length>1;if(rt)for(let At=0;At<x.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const wt=A.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<x.length;At++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const nt=n.get(x[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,z,Y,0,0,z,Y,Q,i.NEAREST),c===!0&&(zt.length=0,It.length=0,zt.push(i.COLOR_ATTACHMENT0+At),A.depthBuffer&&A.resolveDepthBuffer===!1&&(zt.push(X),It.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,It)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let At=0;At<x.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const nt=n.get(x[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ue(A){return Math.min(s.maxSamples,A.samples)}function xt(A){const x=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ot(A){const x=o.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function Le(A,x){const z=A.colorSpace,Y=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==lr&&z!==Di&&(ne.getTransfer(z)===le?(Y!==Bn||Q!==xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function _e(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=W,this.setTexture2DArray=K,this.setTexture3D=$,this.setTextureCube=G,this.rebindTextures=Ie,this.setupRenderTarget=C,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=xt}function kx(i,t){function e(n,s=Di){let r;const o=ne.getTransfer(s);if(n===xi)return i.UNSIGNED_BYTE;if(n===yh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Mh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ed)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Md)return i.BYTE;if(n===bd)return i.SHORT;if(n===eo)return i.UNSIGNED_SHORT;if(n===xh)return i.INT;if(n===gs)return i.UNSIGNED_INT;if(n===Jn)return i.FLOAT;if(n===mo)return i.HALF_FLOAT;if(n===wd)return i.ALPHA;if(n===Td)return i.RGB;if(n===Bn)return i.RGBA;if(n===io)return i.DEPTH_COMPONENT;if(n===so)return i.DEPTH_STENCIL;if(n===go)return i.RED;if(n===bh)return i.RED_INTEGER;if(n===Ad)return i.RG;if(n===Sh)return i.RG_INTEGER;if(n===Eh)return i.RGBA_INTEGER;if(n===ma||n===ga||n===va||n===_a)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===El||n===wl||n===Tl||n===Al)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===El)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Tl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Al)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Rl||n===Cl||n===Pl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Rl||n===Cl)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ll||n===Dl||n===Il||n===Ul||n===Nl||n===Fl||n===kl||n===zl||n===Ol||n===Bl||n===Hl||n===Vl||n===Gl||n===Wl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ll)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Dl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Il)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ul)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===kl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ol)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Hl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Gl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wl)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xl||n===ql||n===Yl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Xl)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ql)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jl||n===Kl||n===Zl||n===$l)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===jl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Kl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Zl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$l)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===no?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const zx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ox=`
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

}`;class Bx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Wd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Je({vertexShader:zx,fragmentShader:Ox,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ce(new vr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hx extends pr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",p=new Bx,m={},_=e.getContextAttributes();let b=null,y=null;const w=[],T=[],R=new $t;let D=null;const E=new Cn;E.viewport=new De;const S=new Cn;S.viewport=new De;const P=[E,S],F=new cg;let O=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let J=w[j];return J===void 0&&(J=new Ac,w[j]=J),J.getTargetRaySpace()},this.getControllerGrip=function(j){let J=w[j];return J===void 0&&(J=new Ac,w[j]=J),J.getGripSpace()},this.getHand=function(j){let J=w[j];return J===void 0&&(J=new Ac,w[j]=J),J.getHandSpace()};function W(j){const J=T.indexOf(j.inputSource);if(J===-1)return;const mt=w[J];mt!==void 0&&(mt.update(j.inputSource,j.frame,l||o),mt.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",$);for(let j=0;j<w.length;j++){const J=T[j];J!==null&&(T[j]=null,w[j].disconnect(J))}O=null,q=null,p.reset();for(const j in m)delete m[j];t.setRenderTarget(b),d=null,f=null,u=null,s=null,y=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",K),s.addEventListener("inputsourceschange",$),_.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Ut=null,Et=null;_.depth&&(Et=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=_.stencil?so:io,Ut=_.stencil?no:gs);const jt={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(jt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new vs(f.textureWidth,f.textureHeight,{format:Bn,type:xi,depthTexture:new Gd(f.textureWidth,f.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const mt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vs(d.framebufferWidth,d.framebufferHeight,{format:Bn,type:xi,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function $(j){for(let J=0;J<j.removed.length;J++){const mt=j.removed[J],Ut=T.indexOf(mt);Ut>=0&&(T[Ut]=null,w[Ut].disconnect(mt))}for(let J=0;J<j.added.length;J++){const mt=j.added[J];let Ut=T.indexOf(mt);if(Ut===-1){for(let jt=0;jt<w.length;jt++)if(jt>=T.length){T.push(mt),Ut=jt;break}else if(T[jt]===null){T[jt]=mt,Ut=jt;break}if(Ut===-1)break}const Et=w[Ut];Et&&Et.connect(mt)}}const G=new U,st=new U;function ct(j,J,mt){G.setFromMatrixPosition(J.matrixWorld),st.setFromMatrixPosition(mt.matrixWorld);const Ut=G.distanceTo(st),Et=J.projectionMatrix.elements,jt=mt.projectionMatrix.elements,Ie=Et[14]/(Et[10]-1),C=Et[14]/(Et[10]+1),he=(Et[9]+1)/Et[5],zt=(Et[9]-1)/Et[5],It=(Et[8]-1)/Et[0],_t=(jt[8]+1)/jt[0],ue=Ie*It,xt=Ie*_t,Ot=Ut/(-It+_t),Le=Ot*-It;if(J.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Le),j.translateZ(Ot),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Et[10]===-1)j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const _e=Ie+Ot,A=C+Ot,x=ue-Le,z=xt+(Ut-Le),Y=he*C/A*_e,Q=zt*C/A*_e;j.projectionMatrix.makePerspective(x,z,Y,Q,_e,A),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ft(j,J){J===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(J.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let J=j.near,mt=j.far;p.texture!==null&&(p.depthNear>0&&(J=p.depthNear),p.depthFar>0&&(mt=p.depthFar)),F.near=S.near=E.near=J,F.far=S.far=E.far=mt,(O!==F.near||q!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),O=F.near,q=F.far),F.layers.mask=j.layers.mask|6,E.layers.mask=F.layers.mask&3,S.layers.mask=F.layers.mask&5;const Ut=j.parent,Et=F.cameras;ft(F,Ut);for(let jt=0;jt<Et.length;jt++)ft(Et[jt],Ut);Et.length===2?ct(F,E,S):F.projectionMatrix.copy(E.projectionMatrix),Wt(j,F,Ut)};function Wt(j,J,mt){mt===null?j.matrix.copy(J.matrixWorld):(j.matrix.copy(mt.matrixWorld),j.matrix.invert(),j.matrix.multiply(J.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(J.projectionMatrix),j.projectionMatrixInverse.copy(J.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ro*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(j){return m[j]};let ie=null;function pe(j,J){if(h=J.getViewerPose(l||o),g=J,h!==null){const mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Ut=!1;mt.length!==F.cameras.length&&(F.cameras.length=0,Ut=!0);for(let C=0;C<mt.length;C++){const he=mt[C];let zt=null;if(d!==null)zt=d.getViewport(he);else{const _t=u.getViewSubImage(f,he);zt=_t.viewport,C===0&&(t.setRenderTargetTextures(y,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(y))}let It=P[C];It===void 0&&(It=new Cn,It.layers.enable(C),It.viewport=new De,P[C]=It),It.matrix.fromArray(he.transform.matrix),It.matrix.decompose(It.position,It.quaternion,It.scale),It.projectionMatrix.fromArray(he.projectionMatrix),It.projectionMatrixInverse.copy(It.projectionMatrix).invert(),It.viewport.set(zt.x,zt.y,zt.width,zt.height),C===0&&(F.matrix.copy(It.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ut===!0&&F.cameras.push(It)}const Et=s.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const C=u.getDepthInformation(mt[0]);C&&C.isValid&&C.texture&&p.init(C,s.renderState)}if(Et&&Et.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let C=0;C<mt.length;C++){const he=mt[C].camera;if(he){let zt=m[he];zt||(zt=new Wd,m[he]=zt);const It=u.getCameraImage(he);zt.sourceTexture=It}}}}for(let mt=0;mt<w.length;mt++){const Ut=T[mt],Et=w[mt];Ut!==null&&Et!==void 0&&Et.update(Ut,J,l||o)}ie&&ie(j,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Xt=new Xd;Xt.setAnimationLoop(pe),this.setAnimationLoop=function(j){ie=j},this.dispose=function(){}}}const ns=new yi,Vx=new ge;function Gx(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Fd(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,_,b,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,_,b):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===on&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===on&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const _=t.get(m),b=_.envMap,y=_.envMapRotation;b&&(p.envMap.value=b,ns.copy(y),ns.x*=-1,ns.y*=-1,ns.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),p.envMapRotation.value.setFromMatrix4(Vx.makeRotationFromEuler(ns)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,_,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=b*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const _=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Wx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,b){const y=b.program;n.uniformBlockBinding(_,y)}function l(_,b){let y=s[_.id];y===void 0&&(g(_),y=h(_),s[_.id]=y,_.addEventListener("dispose",p));const w=b.program;n.updateUBOMapping(_,w);const T=t.render.frame;r[_.id]!==T&&(f(_),r[_.id]=T)}function h(_){const b=u();_.__bindingPointIndex=b;const y=i.createBuffer(),w=_.__size,T=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,w,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const b=s[_.id],y=_.uniforms,w=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,R=y.length;T<R;T++){const D=Array.isArray(y[T])?y[T]:[y[T]];for(let E=0,S=D.length;E<S;E++){const P=D[E];if(d(P,T,E,w)===!0){const F=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let W=0;W<O.length;W++){const K=O[W],$=v(K);typeof K=="number"||typeof K=="boolean"?(P.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,F+q,P.__data)):K.isMatrix3?(P.__data[0]=K.elements[0],P.__data[1]=K.elements[1],P.__data[2]=K.elements[2],P.__data[3]=0,P.__data[4]=K.elements[3],P.__data[5]=K.elements[4],P.__data[6]=K.elements[5],P.__data[7]=0,P.__data[8]=K.elements[6],P.__data[9]=K.elements[7],P.__data[10]=K.elements[8],P.__data[11]=0):(K.toArray(P.__data,q),q+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,b,y,w){const T=_.value,R=b+"_"+y;if(w[R]===void 0)return typeof T=="number"||typeof T=="boolean"?w[R]=T:w[R]=T.clone(),!0;{const D=w[R];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return w[R]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function g(_){const b=_.uniforms;let y=0;const w=16;for(let R=0,D=b.length;R<D;R++){const E=Array.isArray(b[R])?b[R]:[b[R]];for(let S=0,P=E.length;S<P;S++){const F=E[S],O=Array.isArray(F.value)?F.value:[F.value];for(let q=0,W=O.length;q<W;q++){const K=O[q],$=v(K),G=y%w,st=G%$.boundary,ct=G+st;y+=st,ct!==0&&w-ct<$.storage&&(y+=w-ct),F.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=$.storage}}}const T=y%w;return T>0&&(y+=w-T),_.__size=y,_.__cache={},this}function v(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),b}function p(_){const b=_.target;b.removeEventListener("dispose",p);const y=o.indexOf(b.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}class Xx{constructor(t={}){const{canvas:e=b0(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,m=null;const _=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let w=!1;this._outputColorSpace=je;let T=0,R=0,D=null,E=-1,S=null;const P=new De,F=new De;let O=null;const q=new qt(0);let W=0,K=e.width,$=e.height,G=1,st=null,ct=null;const ft=new De(0,0,K,$),Wt=new De(0,0,K,$);let ie=!1;const pe=new Hd;let Xt=!1,j=!1;const J=new ge,mt=new U,Ut=new De,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function Ie(){return D===null?G:1}let C=n;function he(M,N){return e.getContext(M,N)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_h}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",tt,!1),C===null){const N="webgl2";if(C=he(N,M),C===null)throw he(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let zt,It,_t,ue,xt,Ot,Le,_e,A,x,z,Y,Q,X,Ct,rt,wt,At,nt,ut,Ft,Rt,lt,Ht;function L(){zt=new e_(C),zt.init(),Rt=new kx(C,zt),It=new jv(C,zt,t,Rt),_t=new Nx(C,zt),It.reversedDepthBuffer&&f&&_t.buffers.depth.setReversed(!0),ue=new s_(C),xt=new bx,Ot=new Fx(C,zt,_t,xt,It,Rt,ue),Le=new Zv(y),_e=new t_(y),A=new hg(C),lt=new qv(C,A),x=new n_(C,A,ue,lt),z=new o_(C,x,A,ue),nt=new r_(C,It,Ot),rt=new Kv(xt),Y=new Mx(y,Le,_e,zt,It,lt,rt),Q=new Gx(y,xt),X=new Ex,Ct=new Px(zt),At=new Xv(y,Le,_e,_t,z,d,c),wt=new Ix(y,z,It),Ht=new Wx(C,ue,It,_t),ut=new Yv(C,zt,ue),Ft=new i_(C,zt,ue),ue.programs=Y.programs,y.capabilities=It,y.extensions=zt,y.properties=xt,y.renderLists=X,y.shadowMap=wt,y.state=_t,y.info=ue}L();const it=new Hx(y,C);this.xr=it,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const M=zt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=zt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(M){M!==void 0&&(G=M,this.setSize(K,$,!1))},this.getSize=function(M){return M.set(K,$)},this.setSize=function(M,N,B=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=M,$=N,e.width=Math.floor(M*G),e.height=Math.floor(N*G),B===!0&&(e.style.width=M+"px",e.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(K*G,$*G).floor()},this.setDrawingBufferSize=function(M,N,B){K=M,$=N,G=B,e.width=Math.floor(M*B),e.height=Math.floor(N*B),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(P)},this.getViewport=function(M){return M.copy(ft)},this.setViewport=function(M,N,B,H){M.isVector4?ft.set(M.x,M.y,M.z,M.w):ft.set(M,N,B,H),_t.viewport(P.copy(ft).multiplyScalar(G).round())},this.getScissor=function(M){return M.copy(Wt)},this.setScissor=function(M,N,B,H){M.isVector4?Wt.set(M.x,M.y,M.z,M.w):Wt.set(M,N,B,H),_t.scissor(F.copy(Wt).multiplyScalar(G).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(M){_t.setScissorTest(ie=M)},this.setOpaqueSort=function(M){st=M},this.setTransparentSort=function(M){ct=M},this.getClearColor=function(M){return M.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor(...arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,B=!0){let H=0;if(M){let k=!1;if(D!==null){const et=D.texture.format;k=et===Eh||et===Sh||et===bh}if(k){const et=D.texture.type,ht=et===xi||et===gs||et===eo||et===no||et===yh||et===Mh,Mt=At.getClearColor(),pt=At.getClearAlpha(),Nt=Mt.r,kt=Mt.g,Lt=Mt.b;ht?(g[0]=Nt,g[1]=kt,g[2]=Lt,g[3]=pt,C.clearBufferuiv(C.COLOR,0,g)):(v[0]=Nt,v[1]=kt,v[2]=Lt,v[3]=pt,C.clearBufferiv(C.COLOR,0,v))}else H|=C.COLOR_BUFFER_BIT}N&&(H|=C.DEPTH_BUFFER_BIT),B&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),At.dispose(),X.dispose(),Ct.dispose(),xt.dispose(),Le.dispose(),_e.dispose(),z.dispose(),lt.dispose(),Ht.dispose(),Y.dispose(),it.dispose(),it.removeEventListener("sessionstart",Wn),it.removeEventListener("sessionend",Yh),qi.stop()};function ot(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=ue.autoReset,N=wt.enabled,B=wt.autoUpdate,H=wt.needsUpdate,k=wt.type;L(),ue.autoReset=M,wt.enabled=N,wt.autoUpdate=B,wt.needsUpdate=H,wt.type=k}function tt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Z(M){const N=M.target;N.removeEventListener("dispose",Z),bt(N)}function bt(M){Bt(M),xt.remove(M)}function Bt(M){const N=xt.get(M).programs;N!==void 0&&(N.forEach(function(B){Y.releaseProgram(B)}),M.isShaderMaterial&&Y.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,B,H,k,et){N===null&&(N=Et);const ht=k.isMesh&&k.matrixWorld.determinant()<0,Mt=Vp(M,N,B,H,k);_t.setMaterial(H,ht);let pt=B.index,Nt=1;if(H.wireframe===!0){if(pt=x.getWireframeAttribute(B),pt===void 0)return;Nt=2}const kt=B.drawRange,Lt=B.attributes.position;let Kt=kt.start*Nt,ce=(kt.start+kt.count)*Nt;et!==null&&(Kt=Math.max(Kt,et.start*Nt),ce=Math.min(ce,(et.start+et.count)*Nt)),pt!==null?(Kt=Math.max(Kt,0),ce=Math.min(ce,pt.count)):Lt!=null&&(Kt=Math.max(Kt,0),ce=Math.min(ce,Lt.count));const Ae=ce-Kt;if(Ae<0||Ae===1/0)return;lt.setup(k,H,Mt,B,pt);let ve,fe=ut;if(pt!==null&&(ve=A.get(pt),fe=Ft,fe.setIndex(ve)),k.isMesh)H.wireframe===!0?(_t.setLineWidth(H.wireframeLinewidth*Ie()),fe.setMode(C.LINES)):fe.setMode(C.TRIANGLES);else if(k.isLine){let Dt=H.linewidth;Dt===void 0&&(Dt=1),_t.setLineWidth(Dt*Ie()),k.isLineSegments?fe.setMode(C.LINES):k.isLineLoop?fe.setMode(C.LINE_LOOP):fe.setMode(C.LINE_STRIP)}else k.isPoints?fe.setMode(C.POINTS):k.isSprite&&fe.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)oo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))fe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Dt=k._multiDrawStarts,Me=k._multiDrawCounts,te=k._multiDrawCount,fn=pt?A.get(pt).bytesPerElement:1,bs=xt.get(H).currentProgram.getUniforms();for(let dn=0;dn<te;dn++)bs.setValue(C,"_gl_DrawID",dn),fe.render(Dt[dn]/fn,Me[dn])}else if(k.isInstancedMesh)fe.renderInstances(Kt,Ae,k.count);else if(B.isInstancedBufferGeometry){const Dt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Me=Math.min(B.instanceCount,Dt);fe.renderInstances(Kt,Ae,Me)}else fe.render(Kt,Ae)};function me(M,N,B){M.transparent===!0&&M.side===zn&&M.forceSinglePass===!1?(M.side=on,M.needsUpdate=!0,bo(M,N,B),M.side=Hi,M.needsUpdate=!0,bo(M,N,B),M.side=zn):bo(M,N,B)}this.compile=function(M,N,B=null){B===null&&(B=M),m=Ct.get(B),m.init(N),b.push(m),B.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),M!==B&&M.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const H=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const et=k.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const Mt=et[ht];me(Mt,B,k),H.add(Mt)}else me(et,B,k),H.add(et)}),m=b.pop(),H},this.compileAsync=function(M,N,B=null){const H=this.compile(M,N,B);return new Promise(k=>{function et(){if(H.forEach(function(ht){xt.get(ht).currentProgram.isReady()&&H.delete(ht)}),H.size===0){k(M);return}setTimeout(et,10)}zt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let se=null;function ii(M){se&&se(M)}function Wn(){qi.stop()}function Yh(){qi.start()}const qi=new Xd;qi.setAnimationLoop(ii),typeof self<"u"&&qi.setContext(self),this.setAnimationLoop=function(M){se=M,it.setAnimationLoop(M),M===null?qi.stop():qi.start()},it.addEventListener("sessionstart",Wn),it.addEventListener("sessionend",Yh),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(N),N=it.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,N,D),m=Ct.get(M,b.length),m.init(N),b.push(m),J.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),pe.setFromProjectionMatrix(J,Qn,N.reversedDepth),j=this.localClippingEnabled,Xt=rt.init(this.clippingPlanes,j),p=X.get(M,_.length),p.init(),_.push(p),it.enabled===!0&&it.isPresenting===!0){const et=y.xr.getDepthSensingMesh();et!==null&&ic(et,N,-1/0,y.sortObjects)}ic(M,N,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(st,ct),jt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,jt&&At.addToRenderList(p,M),this.info.render.frame++,Xt===!0&&rt.beginShadows();const B=m.state.shadowsArray;wt.render(B,M,N),Xt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=p.opaque,k=p.transmissive;if(m.setupLights(),N.isArrayCamera){const et=N.cameras;if(k.length>0)for(let ht=0,Mt=et.length;ht<Mt;ht++){const pt=et[ht];Kh(H,k,M,pt)}jt&&At.render(M);for(let ht=0,Mt=et.length;ht<Mt;ht++){const pt=et[ht];jh(p,M,pt,pt.viewport)}}else k.length>0&&Kh(H,k,M,N),jt&&At.render(M),jh(p,M,N);D!==null&&R===0&&(Ot.updateMultisampleRenderTarget(D),Ot.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(y,M,N),lt.resetDefaultState(),E=-1,S=null,b.pop(),b.length>0?(m=b[b.length-1],Xt===!0&&rt.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?p=_[_.length-1]:p=null};function ic(M,N,B,H){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||pe.intersectsSprite(M)){H&&Ut.setFromMatrixPosition(M.matrixWorld).applyMatrix4(J);const ht=z.update(M),Mt=M.material;Mt.visible&&p.push(M,ht,Mt,B,Ut.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||pe.intersectsObject(M))){const ht=z.update(M),Mt=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ut.copy(M.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ut.copy(ht.boundingSphere.center)),Ut.applyMatrix4(M.matrixWorld).applyMatrix4(J)),Array.isArray(Mt)){const pt=ht.groups;for(let Nt=0,kt=pt.length;Nt<kt;Nt++){const Lt=pt[Nt],Kt=Mt[Lt.materialIndex];Kt&&Kt.visible&&p.push(M,ht,Kt,B,Ut.z,Lt)}}else Mt.visible&&p.push(M,ht,Mt,B,Ut.z,null)}}const et=M.children;for(let ht=0,Mt=et.length;ht<Mt;ht++)ic(et[ht],N,B,H)}function jh(M,N,B,H){const k=M.opaque,et=M.transmissive,ht=M.transparent;m.setupLightsView(B),Xt===!0&&rt.setGlobalState(y.clippingPlanes,B),H&&_t.viewport(P.copy(H)),k.length>0&&Mo(k,N,B),et.length>0&&Mo(et,N,B),ht.length>0&&Mo(ht,N,B),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Kh(M,N,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[H.id]===void 0&&(m.state.transmissionRenderTarget[H.id]=new vs(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?mo:xi,minFilter:Ii,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const et=m.state.transmissionRenderTarget[H.id],ht=H.viewport||P;et.setSize(ht.z*y.transmissionResolutionScale,ht.w*y.transmissionResolutionScale);const Mt=y.getRenderTarget(),pt=y.getActiveCubeFace(),Nt=y.getActiveMipmapLevel();y.setRenderTarget(et),y.getClearColor(q),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),jt&&At.render(B);const kt=y.toneMapping;y.toneMapping=pi;const Lt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),m.setupLightsView(H),Xt===!0&&rt.setGlobalState(y.clippingPlanes,H),Mo(M,B,H),Ot.updateMultisampleRenderTarget(et),Ot.updateRenderTargetMipmap(et),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let ce=0,Ae=N.length;ce<Ae;ce++){const ve=N[ce],fe=ve.object,Dt=ve.geometry,Me=ve.material,te=ve.group;if(Me.side===zn&&fe.layers.test(H.layers)){const fn=Me.side;Me.side=on,Me.needsUpdate=!0,Zh(fe,B,H,Dt,Me,te),Me.side=fn,Me.needsUpdate=!0,Kt=!0}}Kt===!0&&(Ot.updateMultisampleRenderTarget(et),Ot.updateRenderTargetMipmap(et))}y.setRenderTarget(Mt,pt,Nt),y.setClearColor(q,W),Lt!==void 0&&(H.viewport=Lt),y.toneMapping=kt}function Mo(M,N,B){const H=N.isScene===!0?N.overrideMaterial:null;for(let k=0,et=M.length;k<et;k++){const ht=M[k],Mt=ht.object,pt=ht.geometry,Nt=ht.group;let kt=ht.material;kt.allowOverride===!0&&H!==null&&(kt=H),Mt.layers.test(B.layers)&&Zh(Mt,N,B,pt,kt,Nt)}}function Zh(M,N,B,H,k,et){M.onBeforeRender(y,N,B,H,k,et),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(y,N,B,H,M,et),k.transparent===!0&&k.side===zn&&k.forceSinglePass===!1?(k.side=on,k.needsUpdate=!0,y.renderBufferDirect(B,N,H,k,M,et),k.side=Hi,k.needsUpdate=!0,y.renderBufferDirect(B,N,H,k,M,et),k.side=zn):y.renderBufferDirect(B,N,H,k,M,et),M.onAfterRender(y,N,B,H,k,et)}function bo(M,N,B){N.isScene!==!0&&(N=Et);const H=xt.get(M),k=m.state.lights,et=m.state.shadowsArray,ht=k.state.version,Mt=Y.getParameters(M,k.state,et,N,B),pt=Y.getProgramCacheKey(Mt);let Nt=H.programs;H.environment=M.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(M.isMeshStandardMaterial?_e:Le).get(M.envMap||H.environment),H.envMapRotation=H.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Nt===void 0&&(M.addEventListener("dispose",Z),Nt=new Map,H.programs=Nt);let kt=Nt.get(pt);if(kt!==void 0){if(H.currentProgram===kt&&H.lightsStateVersion===ht)return Jh(M,Mt),kt}else Mt.uniforms=Y.getUniforms(M),M.onBeforeCompile(Mt,y),kt=Y.acquireProgram(Mt,pt),Nt.set(pt,kt),H.uniforms=Mt.uniforms;const Lt=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Lt.clippingPlanes=rt.uniform),Jh(M,Mt),H.needsLights=Wp(M),H.lightsStateVersion=ht,H.needsLights&&(Lt.ambientLightColor.value=k.state.ambient,Lt.lightProbe.value=k.state.probe,Lt.directionalLights.value=k.state.directional,Lt.directionalLightShadows.value=k.state.directionalShadow,Lt.spotLights.value=k.state.spot,Lt.spotLightShadows.value=k.state.spotShadow,Lt.rectAreaLights.value=k.state.rectArea,Lt.ltc_1.value=k.state.rectAreaLTC1,Lt.ltc_2.value=k.state.rectAreaLTC2,Lt.pointLights.value=k.state.point,Lt.pointLightShadows.value=k.state.pointShadow,Lt.hemisphereLights.value=k.state.hemi,Lt.directionalShadowMap.value=k.state.directionalShadowMap,Lt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Lt.spotShadowMap.value=k.state.spotShadowMap,Lt.spotLightMatrix.value=k.state.spotLightMatrix,Lt.spotLightMap.value=k.state.spotLightMap,Lt.pointShadowMap.value=k.state.pointShadowMap,Lt.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=kt,H.uniformsList=null,kt}function $h(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=xa.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Jh(M,N){const B=xt.get(M);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function Vp(M,N,B,H,k){N.isScene!==!0&&(N=Et),Ot.resetTextureUnits();const et=N.fog,ht=H.isMeshStandardMaterial?N.environment:null,Mt=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:lr,pt=(H.isMeshStandardMaterial?_e:Le).get(H.envMap||ht),Nt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,kt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Lt=!!B.morphAttributes.position,Kt=!!B.morphAttributes.normal,ce=!!B.morphAttributes.color;let Ae=pi;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Ae=y.toneMapping);const ve=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,fe=ve!==void 0?ve.length:0,Dt=xt.get(H),Me=m.state.lights;if(Xt===!0&&(j===!0||M!==S)){const tn=M===S&&H.id===E;rt.setState(H,M,tn)}let te=!1;H.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==Me.state.version||Dt.outputColorSpace!==Mt||k.isBatchedMesh&&Dt.batching===!1||!k.isBatchedMesh&&Dt.batching===!0||k.isBatchedMesh&&Dt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Dt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Dt.instancing===!1||!k.isInstancedMesh&&Dt.instancing===!0||k.isSkinnedMesh&&Dt.skinning===!1||!k.isSkinnedMesh&&Dt.skinning===!0||k.isInstancedMesh&&Dt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Dt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Dt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Dt.instancingMorph===!1&&k.morphTexture!==null||Dt.envMap!==pt||H.fog===!0&&Dt.fog!==et||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==rt.numPlanes||Dt.numIntersection!==rt.numIntersection)||Dt.vertexAlphas!==Nt||Dt.vertexTangents!==kt||Dt.morphTargets!==Lt||Dt.morphNormals!==Kt||Dt.morphColors!==ce||Dt.toneMapping!==Ae||Dt.morphTargetsCount!==fe)&&(te=!0):(te=!0,Dt.__version=H.version);let fn=Dt.currentProgram;te===!0&&(fn=bo(H,N,k));let bs=!1,dn=!1,xr=!1;const be=fn.getUniforms(),En=Dt.uniforms;if(_t.useProgram(fn.program)&&(bs=!0,dn=!0,xr=!0),H.id!==E&&(E=H.id,dn=!0),bs||S!==M){_t.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),be.setValue(C,"projectionMatrix",M.projectionMatrix),be.setValue(C,"viewMatrix",M.matrixWorldInverse);const cn=be.map.cameraPosition;cn!==void 0&&cn.setValue(C,mt.setFromMatrixPosition(M.matrixWorld)),It.logarithmicDepthBuffer&&be.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&be.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,dn=!0,xr=!0)}if(k.isSkinnedMesh){be.setOptional(C,k,"bindMatrix"),be.setOptional(C,k,"bindMatrixInverse");const tn=k.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),be.setValue(C,"boneTexture",tn.boneTexture,Ot))}k.isBatchedMesh&&(be.setOptional(C,k,"batchingTexture"),be.setValue(C,"batchingTexture",k._matricesTexture,Ot),be.setOptional(C,k,"batchingIdTexture"),be.setValue(C,"batchingIdTexture",k._indirectTexture,Ot),be.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&be.setValue(C,"batchingColorTexture",k._colorsTexture,Ot));const wn=B.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&nt.update(k,B,fn),(dn||Dt.receiveShadow!==k.receiveShadow)&&(Dt.receiveShadow=k.receiveShadow,be.setValue(C,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(En.envMap.value=pt,En.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(En.envMapIntensity.value=N.environmentIntensity),dn&&(be.setValue(C,"toneMappingExposure",y.toneMappingExposure),Dt.needsLights&&Gp(En,xr),et&&H.fog===!0&&Q.refreshFogUniforms(En,et),Q.refreshMaterialUniforms(En,H,G,$,m.state.transmissionRenderTarget[M.id]),xa.upload(C,$h(Dt),En,Ot)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(xa.upload(C,$h(Dt),En,Ot),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&be.setValue(C,"center",k.center),be.setValue(C,"modelViewMatrix",k.modelViewMatrix),be.setValue(C,"normalMatrix",k.normalMatrix),be.setValue(C,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const tn=H.uniformsGroups;for(let cn=0,sc=tn.length;cn<sc;cn++){const Yi=tn[cn];Ht.update(Yi,fn),Ht.bind(Yi,fn)}}return fn}function Gp(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Wp(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,N,B){const H=xt.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),xt.get(M.texture).__webglTexture=N,xt.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:B,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const B=xt.get(M);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0};const Xp=C.createFramebuffer();this.setRenderTarget=function(M,N=0,B=0){D=M,T=N,R=B;let H=!0,k=null,et=!1,ht=!1;if(M){const pt=xt.get(M);if(pt.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(C.FRAMEBUFFER,null),H=!1;else if(pt.__webglFramebuffer===void 0)Ot.setupRenderTarget(M);else if(pt.__hasExternalTextures)Ot.rebindTextures(M,xt.get(M.texture).__webglTexture,xt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Lt=M.depthTexture;if(pt.__boundDepthTexture!==Lt){if(Lt!==null&&xt.has(Lt)&&(M.width!==Lt.image.width||M.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(M)}}const Nt=M.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(ht=!0);const kt=xt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(kt[N])?k=kt[N][B]:k=kt[N],et=!0):M.samples>0&&Ot.useMultisampledRTT(M)===!1?k=xt.get(M).__webglMultisampledFramebuffer:Array.isArray(kt)?k=kt[B]:k=kt,P.copy(M.viewport),F.copy(M.scissor),O=M.scissorTest}else P.copy(ft).multiplyScalar(G).floor(),F.copy(Wt).multiplyScalar(G).floor(),O=ie;if(B!==0&&(k=Xp),_t.bindFramebuffer(C.FRAMEBUFFER,k)&&H&&_t.drawBuffers(M,k),_t.viewport(P),_t.scissor(F),_t.setScissorTest(O),et){const pt=xt.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,B)}else if(ht){const pt=N;for(let Nt=0;Nt<M.textures.length;Nt++){const kt=xt.get(M.textures[Nt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Nt,kt.__webglTexture,B,pt)}}else if(M!==null&&B!==0){const pt=xt.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,pt.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(M,N,B,H,k,et,ht,Mt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=xt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(pt=pt[ht]),pt){_t.bindFramebuffer(C.FRAMEBUFFER,pt);try{const Nt=M.textures[Mt],kt=Nt.format,Lt=Nt.type;if(!It.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!It.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-H&&B>=0&&B<=M.height-k&&(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Mt),C.readPixels(N,B,H,k,Rt.convert(kt),Rt.convert(Lt),et))}finally{const Nt=D!==null?xt.get(D).__webglFramebuffer:null;_t.bindFramebuffer(C.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(M,N,B,H,k,et,ht,Mt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=xt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(pt=pt[ht]),pt)if(N>=0&&N<=M.width-H&&B>=0&&B<=M.height-k){_t.bindFramebuffer(C.FRAMEBUFFER,pt);const Nt=M.textures[Mt],kt=Nt.format,Lt=Nt.type;if(!It.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!It.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Kt),C.bufferData(C.PIXEL_PACK_BUFFER,et.byteLength,C.STREAM_READ),M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Mt),C.readPixels(N,B,H,k,Rt.convert(kt),Rt.convert(Lt),0);const ce=D!==null?xt.get(D).__webglFramebuffer:null;_t.bindFramebuffer(C.FRAMEBUFFER,ce);const Ae=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await S0(C,Ae,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Kt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,et),C.deleteBuffer(Kt),C.deleteSync(Ae),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,B=0){const H=Math.pow(2,-B),k=Math.floor(M.image.width*H),et=Math.floor(M.image.height*H),ht=N!==null?N.x:0,Mt=N!==null?N.y:0;Ot.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,B,0,0,ht,Mt,k,et),_t.unbindTexture()};const qp=C.createFramebuffer(),Yp=C.createFramebuffer();this.copyTextureToTexture=function(M,N,B=null,H=null,k=0,et=null){et===null&&(k!==0?(oo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=k,k=0):et=0);let ht,Mt,pt,Nt,kt,Lt,Kt,ce,Ae;const ve=M.isCompressedTexture?M.mipmaps[et]:M.image;if(B!==null)ht=B.max.x-B.min.x,Mt=B.max.y-B.min.y,pt=B.isBox3?B.max.z-B.min.z:1,Nt=B.min.x,kt=B.min.y,Lt=B.isBox3?B.min.z:0;else{const wn=Math.pow(2,-k);ht=Math.floor(ve.width*wn),Mt=Math.floor(ve.height*wn),M.isDataArrayTexture?pt=ve.depth:M.isData3DTexture?pt=Math.floor(ve.depth*wn):pt=1,Nt=0,kt=0,Lt=0}H!==null?(Kt=H.x,ce=H.y,Ae=H.z):(Kt=0,ce=0,Ae=0);const fe=Rt.convert(N.format),Dt=Rt.convert(N.type);let Me;N.isData3DTexture?(Ot.setTexture3D(N,0),Me=C.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Ot.setTexture2DArray(N,0),Me=C.TEXTURE_2D_ARRAY):(Ot.setTexture2D(N,0),Me=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const te=C.getParameter(C.UNPACK_ROW_LENGTH),fn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),bs=C.getParameter(C.UNPACK_SKIP_PIXELS),dn=C.getParameter(C.UNPACK_SKIP_ROWS),xr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ve.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ve.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Nt),C.pixelStorei(C.UNPACK_SKIP_ROWS,kt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Lt);const be=M.isDataArrayTexture||M.isData3DTexture,En=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const wn=xt.get(M),tn=xt.get(N),cn=xt.get(wn.__renderTarget),sc=xt.get(tn.__renderTarget);_t.bindFramebuffer(C.READ_FRAMEBUFFER,cn.__webglFramebuffer),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,sc.__webglFramebuffer);for(let Yi=0;Yi<pt;Yi++)be&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,xt.get(M).__webglTexture,k,Lt+Yi),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,xt.get(N).__webglTexture,et,Ae+Yi)),C.blitFramebuffer(Nt,kt,ht,Mt,Kt,ce,ht,Mt,C.DEPTH_BUFFER_BIT,C.NEAREST);_t.bindFramebuffer(C.READ_FRAMEBUFFER,null),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||xt.has(M)){const wn=xt.get(M),tn=xt.get(N);_t.bindFramebuffer(C.READ_FRAMEBUFFER,qp),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,Yp);for(let cn=0;cn<pt;cn++)be?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,wn.__webglTexture,k,Lt+cn):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,wn.__webglTexture,k),En?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,tn.__webglTexture,et,Ae+cn):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,tn.__webglTexture,et),k!==0?C.blitFramebuffer(Nt,kt,ht,Mt,Kt,ce,ht,Mt,C.COLOR_BUFFER_BIT,C.NEAREST):En?C.copyTexSubImage3D(Me,et,Kt,ce,Ae+cn,Nt,kt,ht,Mt):C.copyTexSubImage2D(Me,et,Kt,ce,Nt,kt,ht,Mt);_t.bindFramebuffer(C.READ_FRAMEBUFFER,null),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else En?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(Me,et,Kt,ce,Ae,ht,Mt,pt,fe,Dt,ve.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(Me,et,Kt,ce,Ae,ht,Mt,pt,fe,ve.data):C.texSubImage3D(Me,et,Kt,ce,Ae,ht,Mt,pt,fe,Dt,ve):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,et,Kt,ce,ht,Mt,fe,Dt,ve.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,et,Kt,ce,ve.width,ve.height,fe,ve.data):C.texSubImage2D(C.TEXTURE_2D,et,Kt,ce,ht,Mt,fe,Dt,ve);C.pixelStorei(C.UNPACK_ROW_LENGTH,te),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,fn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,bs),C.pixelStorei(C.UNPACK_SKIP_ROWS,dn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,xr),et===0&&N.generateMipmaps&&C.generateMipmap(Me),_t.unbindTexture()},this.initRenderTarget=function(M){xt.get(M).__webglFramebuffer===void 0&&Ot.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ot.setTextureCube(M,0):M.isData3DTexture?Ot.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ot.setTexture2DArray(M,0):Ot.setTexture2D(M,0),_t.unbindTexture()},this.resetState=function(){T=0,R=0,D=null,_t.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}const ds=64,rn=32,Oa=16,co=8,hs=ds*co,th=18,Zd=19,$d=47;function Jd(i,t,e=0,n=0,s="y",r=0){return i===1?t>0?[0,20,21][r]:t<0?[2,24,25][r]:[1,22,23][r]:i===2?[2,24,25][r]:i===3?[3,26,27][r]:i===5?(s==="x"?e:s==="z"?n:t)!==0?6:5:i===21?t>0?28:t<0?8:n===1?30:29:i===22?t>0?31:t<0?8:n===1?33:32:i===23?34:i===25?t===0?35:36:i===26?t===0?38:37:i>=27&&i<=29?(t>0?39:42)+i-27:i>=30&&i<=33?t>0?45:46:[0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][i]??3}function Ph(i,t,e){return[(i%co*ds+Oa+.12+t*(rn-.24))/hs,(Math.floor(i/co)*ds+Oa+.12+e*(rn-.24))/hs]}const qn=(i,t)=>(i%t+t)%t;function qx(i,t,e){const n=i;i>=20&&i<=27&&(i=[0,0,1,1,2,2,3,3][i-20],t=qn(t+(n&1?9:17),rn),i!==1&&(e=qn(e+(n&1?13:7),rn)));const s=Yt(t,e,i*877),r=Yt(Math.floor((t+3)/3),Math.floor(e/2),i*571);let o=0,a=255,c=(s-.5)*10+(r-.5)*8;const l=()=>{const f=qn(t+Math.floor(e/3)*3,9);o=r>.77?9877350:r<.19?7509594:8628059,(f<2&&e%4===1&&r>.45||s>.981)&&(o=11127158),f===3&&e%4===0&&(c-=9)},h=()=>{o=r>.82?11305046:r<.19?8938310:10056014,s>.966&&(o=13015659),t%9===Math.floor(e/3)%7&&(e+1)%5<3&&(c+=13)},u=()=>{const f=qn(2*t+e+Math.floor(e/4)*2,41);o=r>.72?10659488:r<.22?9608346:10199967,f<2&&r>.35&&(c-=19),f===2&&r>.47&&(c+=7),s>.95&&(c+=12)};switch(i){case 0:l();break;case 1:{const f=4+Math.floor(Yt(Math.floor(t/2),0,31)*4);e>=rn-f?(l(),e===rn-f&&(c-=17)):(h(),e===rn-f-1&&(c-=14));break}case 2:h();break;case 3:u();break;case 4:{o=14993811,qn(t+Math.floor(e*.6)+Math.floor(e/5)*2,17)<2&&e%4<2&&(c+=11),s>.93&&(o=12888951);break}case 5:{const f=qn(t+Math.round(Math.sin(e*.25+t*.26)*1.5),7);o=f===0?6310195:f<3?7888964:f===3?10848859:9530953,Math.abs(t-17)+Math.abs(e-8)*.65<2&&(o=5981238);break}case 6:{const f=Math.abs(t-15),d=Math.abs(e-16),g=Math.max(f*.98,d)+.2*Math.min(f,d);o=Math.min(t,e,31-t,31-e)<2?7886910:Math.floor(g)%4===0?11962711:14727035,t>19&&e===16-Math.floor((t-18)/3)&&(o=9792837);break}case 7:{const f=Yt(Math.floor(t/3),Math.floor((e+Math.floor(t/5))/2),931);o=f<.16?3373399:f<.42?5411918:f<.73?7120712:9158230,f>.82&&e%3===1&&(o=10602602),f<.16&&s<.3&&(a=0);break}case 8:{const f=Math.floor(e/8),d=qn(t+(f%2?16:0),32);o=e%8===0||d===0?9726792:e%8===7?14859649:13476203,e%8===3&&(Math.floor(t/4)+f)%3!==0&&(c-=9),d===2&&e%8===2&&(o=8021330);break}case 9:{const f=Math.floor(e/7),d=qn(t+f*5+(e%7<2?1:0),12);o=e%7===0||d===0?6846062:e%7===1||d===1?11843234:9739921;break}case 10:{const f=qn(t+Math.floor(e/8)%2*8,16);o=e%8===0||f===0?6649716:e%8===7||f===1?11647146:9149848;break}case 11:{const f=t===0||e===0||t===rn-1||e===rn-1,d=(t+e===22||t+e===25)&&t>4&&t<16;o=f?9161673:d?14811125:11328980,a=f?182:d?175:49,c=0;break}case 12:{u();for(const[f,d,g]of[[5,6,3],[16,13,4],[10,20,2],[21,3,2]])Math.abs(t-f)+Math.abs(e-d)*.85<g&&(o=e>d?5857630:4080708);break}case 13:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);o=f<2?5400165:f<4?12294239:Math.abs(d-13)<1.3?11503958:d<8?16771489:16041065;break}case 14:o=4365994,c=(r-.5)*3,(e===6||e===17)&&qn(t+2*e,19)<5&&(c+=9),a=163;break;case 15:o=r>.62?6649201:4741462;break;case 16:o=16777215,c=0;break;case th:case Zd:{a=0,o=6393927;for(const[f,d,g]of[[3,12,-2],[8,19,3],[15,10,2],[21,15,-3],[26,7,1]]){const v=f+Math.round(g*e/d);if(e<=d&&t===v&&(a=255,o=e<=2?5472834:7971660),i===th&&(f===8||f===21)){const p=Math.abs(t-(f+g))+Math.abs(e-(d+1));p<=2&&(a=255,o=p===0?15049005:f===8?16113574:15971143)}}break}case 28:case 29:case 30:{const f=Math.min(t,31-t);o=f<3||e<3||e>28?7755322:e%8===0?10186823:12819559,i===28?(t>4&&t<27&&e>4&&e<26&&(o=5599084),t>6&&t<25&&e>6&&e<24&&(t%5===2||e%5===2)&&(o=9018246),e>20&&e<23&&t>9&&t<25&&(o=14991218)):i===30?(e>12&&e<23&&t>4&&t<27&&(o=e===13||t===5?6244407:11240021),e===18&&t>12&&t<20&&(o=15780477),e<10&&f>5&&(o=5458749)):e<10&&f>4&&(o=6838334);break}case 31:case 32:case 33:{const f=t<4||t>27||e<3||e>28;o=f?5269096:e%8===2?9003332:12224336,t%24===3&&f&&e%8===4&&(o=12368525),i!==31&&e===20&&(o=5259060),i===33&&t>=13&&t<=18&&e>=13&&e<=22&&(o=t===13||e===22?16044424:11897414),i===33&&Math.abs(t-15.5)<1.5&&e>=15&&e<=17&&(o=6050110);break}case 34:{u();for(const[f,d,g]of[[8,12,6],[21,23,6],[24,6,3],[4,27,3]]){const v=Math.abs(t-f)*1.55+Math.abs(e-d);v<g+1.6&&(o=5663603),v<g&&(o=t<f?10216919:t===f?14614512:5283759)}break}case 35:case 36:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);o=f<2?3823198:f<4?12752741:f===4?4094079:7784898,f>5&&(o=d<7?15007729:d<12?11727321:Math.abs(t-15.5)<2||Math.abs(e-15.5)<2?5807259:8836557);break}case 37:case 38:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);o=f<1?5006441:f<3?8886418:7439751,i===37&&Math.abs(d-13)<2.1&&(o=13675380),i===37&&d<6&&(o=t<15?10999229:7584945),i===38&&(e===8||e===23)&&(o=12755305);break}case 39:case 40:case 41:{const f=i-39,d=Math.min(t,e,31-t,31-e);o=d<2?4150105:d<4?12965824:[5752740,7321057,13600220][f],d>5&&(t%4===0||e%4===0)&&(c-=9);for(let g=0;g<=f;g++){const v=e-(7+g*7),p=7-Math.abs(t-15.5);Math.abs(t-15.5)<7&&v>=p-2&&v<=p&&(o=16774596)}break}case 42:case 43:case 44:{const f=i-42,d=Math.min(t,31-t),g=[4166267,4620212,10117546][f];o=e<5||e>27?4413020:d<3?7308683:e===12||e===20?4215392:g,(d===5||d===6)&&(e===9||e===24)&&(o=13227463);break}case 45:{const f=Math.min(t,31-t),d=9-Math.abs(t-15.5);o=f<2?11631686:f<5?16770458:15643222,f>=5&&e%8===0&&(c-=15),Math.abs(t-15.5)<6&&Math.abs(e%16-d)<1.2&&(o=16772029);break}case 46:{const f=Math.min(t,31-t);o=e<=2||e>28?7622457:f<3?11565132:14064214,e%7===0&&(c-=19);break}default:o=9936274}return[(o>>>16&255)+c,(o>>>8&255)+c,(o&255)+c,a]}function Yx(){const i=new Uint8ClampedArray(hs*hs*4),t=new Uint8ClampedArray(rn*rn*4);for(let n=0;n<$d;n++){for(let s=0;s<rn;s++)for(let r=0;r<rn;r++)t.set(qx(n,r,s),(r+rn*s)*4);for(let s=0;s<ds;s++)for(let r=0;r<ds;r++){const o=n%co*ds+r,a=Math.floor(n/co)*ds+s,c=(Math.min(31,Math.max(0,r-Oa))+rn*Math.min(31,Math.max(0,s-Oa)))*4;for(let l=0;l<4;l++)i[(o+hs*a)*4+l]=t[c+l]}}const e=new _o(new Uint8Array(i.buffer),hs,hs);return e.colorSpace=je,e.magFilter=ke,e.minFilter=Or,e.generateMipmaps=!0,e.needsUpdate=!0,e}const jx=Object.freeze([Object.freeze({x:0,z:-1}),Object.freeze({x:1,z:0}),Object.freeze({x:0,z:1}),Object.freeze({x:-1,z:0})]),Kx=Object.freeze({x:0,z:0});function Dn(i){return i>=30&&i<=33&&Number.isInteger(i)}function Qd(i){return jx[i-30]??Kx}function fi(i,t,e){const n=i===30?1-e:i===31?t:i===32?e:1-t;return 1-.96*Math.max(0,Math.min(1,n))}function Zx(i){return i===27?3:i===28?6:i===29?10:0}const $x=[{n:[1,0,0],u:[0,0,-1],v:[0,1,0],o:[1,0,1]},{n:[-1,0,0],u:[0,0,1],v:[0,1,0],o:[0,0,0]},{n:[0,1,0],u:[1,0,0],v:[0,0,-1],o:[0,1,1]},{n:[0,-1,0],u:[1,0,0],v:[0,0,1],o:[0,0,0]},{n:[0,0,1],u:[1,0,0],v:[0,1,0],o:[0,0,1]},{n:[0,0,-1],u:[-1,0,0],v:[0,1,0],o:[1,0,0]}],Lh=[[0,0],[1,0],[1,1],[0,1]],tp=Array.from({length:$d},(i,t)=>Lh.map(([e,n])=>Ph(t,e,n)));function Jx(i,t){return!(!i||Gr(t)||i===t&&!Dn(i)||i===13&&t===10)}class zc{position=[];normal=[];uv=[];detail=[];indices=[];quad(t=!1,e=!1){const n=this.position.length/3-4;e?this.indices.push(n,n+1,n+3,n+1,n+2,n+3):this.indices.push(n,n+1,n+2,n,n+2,n+3),t&&this.indices.push(n+2,n+1,n,n+3,n+2,n)}finish(){if(!this.indices.length)return null;const t=new Qe;return t.setAttribute("position",new ye(this.position,3)),t.setAttribute("normal",new ye(this.normal,3)),t.setAttribute("uv",new ye(this.uv,2)),t.setAttribute("surface",new ye(this.detail,3)),t.setIndex(this.indices),t.computeBoundingSphere(),t}}function Qx(i,t,e,n,s,r){const o=r?th:Zd;for(let a=0;a<2;a++){const l=a===0?.24:-.24;for(let h=0;h<4;h++){const[u,f]=Lh[h],d=u*2-1;i.position.push(t+.5+.27*d,e+f*.74,n+.5+l*d),i.normal.push(0,1,0),i.uv.push(...tp[o][h]),i.detail.push(1,s,40+f)}i.quad(!0)}}function ty(i,t,e,n,s=1){const r=to(t,e,n),o=new zc,a=new zc,c=new zc;if(!i.occupied[r])return[null,null,null];if(i.dense[r]===4096&&t>0&&t<15&&n>0&&n<15&&[r-1,r+1,r-16,r+16,r+256,...e>0?[r-256]:[]].every(g=>i.dense[g]===4096))return[null,null,null];const l=(g,v,p)=>Li(g,v,p)?i.data[we(g,v,p)]:0,h=(g,v,p)=>Gr(l(g,v,p))?1:0,u=t*16,f=e*16,d=n*16;for(let g=f;g<f+16;g++)for(let v=d;v<d+16;v++){let p=we(u,g,v);for(let m=u;m<u+16;m++,p++){const _=i.data[p];if(!_)continue;const b=_===13?a:_===10?c:o,y=Dn(_);let w=-1;for(const T of $x){const[R,D,E]=T.n,S=m+R,P=g+D,F=v+E;if(P<0||!Jx(_,l(S,P,F)))continue;w===-1&&(w=Yt(m+g*13,v,i.salt^17));const O=_===5?i.axisAt(m,g,v):"y",q=Jd(_,D,R,E,O,Math.floor(w*3)),W=tp[q],K=y&&D===1?_-30:q===5&&(O==="x"&&T.u[0]!==0||O==="z"&&T.u[2]!==0)?1:0,$=y&&D===1,G=$?fi(_,0,0)-fi(_,1,0):R,st=$?fi(_,0,0)-fi(_,0,1):E,ct=$?Math.hypot(G,1,st):1,ft=.94+.11*w,Wt=_===13&&l(m,g+1,v)!==13;for(let Xt=0;Xt<4;Xt++){const[j,J]=Lh[Xt],mt=T.o[0]+T.u[0]*j+T.v[0]*J,Ut=T.o[1]+T.u[1]*j+T.v[1]*J,Et=T.o[2]+T.u[2]*j+T.v[2]*J,jt=y&&Ut===1?fi(_,mt,Et):Ut-(Wt&&Ut===1?.105:0);b.position.push(m+mt,g+jt,v+Et),b.normal.push(G/ct,D/ct,st/ct),b.uv.push(...W[(Xt+K)%4]);const Ie=j?1:-1,C=J?1:-1,he=T.u[0]*Ie,zt=T.u[1]*Ie,It=T.u[2]*Ie,_t=T.v[0]*C,ue=T.v[1]*C,xt=T.v[2]*C;let Ot=1;if(b===o){const Le=h(S+he,P+zt,F+It),_e=h(S+_t,P+ue,F+xt),A=Le&&_e?1:h(S+he+_t,P+zt+ue,F+It+xt);Ot=1-(Le+_e+A)*.103}b.detail.push(Ot,ft,_)}const ie=b.detail.length,pe=b===o&&b.detail[ie-12]+b.detail[ie-6]>b.detail[ie-9]+b.detail[ie-3];if(b.quad(_===13&&(D===1||m===0||v===0||m===St-1||v===St-1),pe),s&&i.stage!=="flat"&&_===1&&D===1&&i.highest[m+St*v]===g){const Xt=Yt(m>>3,v>>3,i.salt^75);Yt(m,v,i.salt^2534)<(.023+Xt*Xt*.21)*s&&Qx(o,m,g+1,v,ft,Xt>.72)}}}}return[o.finish(),a.finish(),c.finish()]}const Oc=(i,t,e)=>new U(i,t,e);class ey{sun={value:Oc(0,1,0)};horizon={value:Oc(.78,.87,.83)};zenith={value:Oc(.23,.64,.8)};day={value:1};warm={value:0};linearColor=new qt;sky;clouds;constructor(t,e){const n={sun:this.sun,horizon:this.horizon,zenith:this.zenith,lightness:this.day,sunset:this.warm},s=new Je({uniforms:n,side:on,depthWrite:!1,depthTest:!0,vertexShader:`varying vec3 direction;varying vec3 skyColor;
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
        }`});this.sky=new Ce(new Rh(270,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=2,t.add(this.sky);const r=new Je({uniforms:n,vertexShader:`varying float shade;varying float dist;
        void main(){vec4 pos=modelMatrix*instanceMatrix*vec4(position,1.);shade=.90+.1*normal.y;dist=length(pos.xyz-cameraPosition);
        gl_Position=projectionMatrix*viewMatrix*pos;}`,fragmentShader:`varying float shade;varying float dist;uniform float lightness,sunset;uniform vec3 horizon;
        void main(){vec3 col=mix(vec3(.085,.135,.22),vec3(.98,.968,.88),lightness)*shade;
          col=mix(col,vec3(1.,.65,.40)*shade,sunset*.64);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);
          #include <colorspace_fragment>
        }`}),o=66,a=4;this.clouds=new ao(new Sn,r,o*a);const c=new Pe;for(let l=0;l<o;l++){const h=Yt(l,11,e)*480-112,u=Yt(l,12,e)*480-112,f=66+Yt(l,13,e)*17;for(let d=0;d<a;d++)c.position.set(h+d*4.6,f+Math.sin(Math.PI*d/3)*1.5,u+Yt(l,d,e)*4),c.scale.set(6+Yt(l+7,d,e)*7,1.6+Yt(l+12,d,e)*2.6,5+Yt(l+77,d,e)*7),c.updateMatrix(),this.clouds.setMatrixAt(l*a+d,c.matrix)}this.clouds.computeBoundingSphere(),t.add(this.clouds)}update(t,e,n){const s=(t-.25)*Math.PI*2;this.sun.value.set(Math.cos(s)*.8,Math.sin(s),Math.cos(s)*.6).normalize();const r=this.sun.value.y,o=Br.smoothstep(r,-.27,.32),a=Math.exp(-Math.pow((r-.065)/.25,2));this.day.value=o,this.warm.value=a;const c=(l,h,u,f)=>{this.linearColor.setRGB(Math.min(1,h),Math.min(1,u),Math.min(1,f),je),l.set(this.linearColor.r,this.linearColor.g,this.linearColor.b)};c(this.zenith.value,.095+o*.23+a*.14,.14+o*.52-a*.15,.24+o*.6-a*.13),c(this.horizon.value,.25+o*.57+a*.29,.32+o*.57-a*.13,.44+o*.45-a*.25),this.sky.position.copy(e.position),this.clouds.position.x=Math.sin(n/190)*10}dispose(t){t.remove(this.sky,this.clouds),this.sky.geometry.dispose(),this.sky.material.dispose(),this.clouds.geometry.dispose(),this.clouds.material.dispose(),this.clouds.dispose()}}function ff(i,t,e,n,s){return new Je({transparent:s,depthWrite:!s,uniforms:{...n,atlas:{value:i},columnHeights:{value:t},sun:e.sun,lightness:e.day,sunset:e.warm,horizon:e.horizon},vertexShader:`
      attribute vec3 surface;
      uniform sampler2D columnHeights;uniform vec3 sun;uniform vec3 lampPositions[4],lampColors[4];
      uniform float clock,lightness,sunset,shadows,extras,schoolLight;uniform int lampCount;
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
        vec3 ambientLight=max(ambient*mix(1.,.30,cover),schoolLight*vec3(.38,.43,.46));
        lighting=(ambientLight+sunlight*diffuse*lightness*shade*(1.-cover))*
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
      }`})}const ep=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function np(i,t,e,n,s){const[r,o,a]=ep[i],c=Jd(n,o,r,a,s);if(c===5&&(s==="x"&&!r||s==="z"&&r!==0)&&([t,e]=[e,1-t]),c===45)for(let l=0;l<n-30;l++)[t,e]=[1-e,t];return Ph(c,t,e)}function ny(i,t){const e=[],n=[],s=[],r=[],o=i.getAttribute("position"),a=i.getAttribute("uv");function c(h,u,f,d,g,v,p,m=0){const _=e.length/3,b=new qt(p);for(let y=0;y<o.count;y++){const w=Math.floor(y/4),[T,R,D]=ep[w],E=.8+.15*R+.065*T+.05*D,S=o.getX(y),P=o.getY(y),F=o.getZ(y),O=Dn(m)&&P>0?fi(m,S+.5,F+.5)-.5:P;e.push(h+S*d,u+O*g,f+F*v);const q=a.getX(y),W=a.getY(y);n.push(...m?np(w,q,W,m,"y"):Ph(16,q,W)),s.push(b.r*E,b.g*E,b.b*E)}for(let y=0;y<i.index.count;y++)r.push(_+i.index.getX(y))}if(c(.1,-.54,.02,.57,.64,.61,3630181),c(.1,-.24,-.01,.6,.17,.62,12622438),c(.08,-.07,-.06,.52,.43,.53,11432010),c(-.16,.015,-.23,.2,.2,.33,14591349),t>=17&&t<=20){const h=t===18||t===20?9874602:13345647;c(-.08,.35,-.12,.14,1.18,.15,10052927),c(-.08,.72,-.12,.2,.16,.2,6055253),t<=18?(c(-.08,.91,-.12,.88,.2,.2,h),c(-.55,.78,-.12,.15,.27,.19,h),c(.37,.8,-.12,.15,.19,.18,h)):(c(-.19,.91,-.12,.49,.22,.22,h),c(-.44,.75,-.12,.28,.46,.23,h),c(-.53,.61,-.12,.13,.19,.24,12962741))}else t===34?(c(-.07,.16,-.19,.18,.38,.2,7948078),c(-.07,.39,-.32,.27,.2,.36,6649215),c(-.07,.43,-.57,.16,.13,.32,9543845)):t===35||t===36?(c(-.08,.36,-.14,.14,.98,.15,10446657),c(-.08,.81,-.14,.23,.23,.22,15037233),c(-.08,.94,-.14,.13,.18,.13,16761964)):t===38?(c(-.12,.38,-.27,.14,1,.14,11103553),c(-.12,.79,-.43,.12,.17,.34,12814677),c(-.12,-.07,-.43,.12,.16,.34,12814677),c(-.12,.35,-.55,.025,.96,.025,15652256)):t===37?c(-.08,.26,-.18,.17,.35,.17,14000983):t===16?c(-.06,.36,-.18,.16,1.05,.16,12620646):t===15||t===24?(c(-.1,.29,-.22,.4,.4,.36,t===24?8708039:5792095),c(-.1,.54,-.22,.22,.16,.24,t===24?13956827:7371126)):t&&c(-.11,.3,-.26,.66,.66,.66,16777215,t);const l=new Qe;return l.setAttribute("position",new ye(e,3)),l.setAttribute("uv",new ye(n,2)),l.setAttribute("color",new ye(s,3)),l.setIndex(r),l}function iy(){const t=new Uint8Array(1024).fill(255);function e(r,o,a,c,l,h){const u=Math.max(Math.abs(a-r),Math.abs(c-o));for(let f=0;f<=u;f++){const d=f/u,g=Math.round(r+(a-r)*d),v=Math.round(o+(c-o)*d);if(g<0||v<0||g>=32||v>=32)continue;const p=g+v*32;t[p]=Math.min(t[p],Math.round(245*(l+(h-l)*d)))}}[[[15,17],[12,19],[11,23],[7,25],[6,29],[2,32]],[[15,17],[16,13],[20,11],[19,7],[23,3],[23,0]],[[15,17],[18,18],[21,22],[26,22],[30,26],[32,27]],[[15,17],[11,15],[7,15],[6,12],[2,10],[-1,8]],[[11,23],[14,24],[15,28],[18,29]],[[20,11],[23,13],[26,11],[30,11]],[[7,15],[7,19],[4,22]],[[21,22],[19,25],[20,29]]].forEach((r,o)=>{const a=o<4?.02+o*.035:.51,c=o<4?.93:.98;for(let l=1;l<r.length;l++)e(r[l-1][0],r[l-1][1],r[l][0],r[l][1],a+(c-a)*(l-1)/(r.length-1),a+(c-a)*l/(r.length-1))});const s=new _o(t,32,32,go);return s.magFilter=ke,s.minFilter=ke,s.needsUpdate=!0,s}class sy{cube=new Sn;mask=iy();hand;cracking;ghost;lastItem=-1;ghostTile="";recoil=0;phase=0;clock=0;constructor(t,e,n){this.hand=new Ce(new Qe,new Wi({map:n,vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.hand.visible=!1,this.hand.renderOrder=12,this.hand.frustumCulled=!1,e.add(this.hand),t.add(e);const s="varying vec2 face;void main(){face=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";this.cracking=new Ce(this.cube,new Je({uniforms:{stages:{value:this.mask},progress:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,vertexShader:s,fragmentShader:`uniform sampler2D stages;uniform float progress;varying vec2 face;
        void main(){float crack=step(texture2D(stages,face).r,min(.985,progress));
          float lip=step(texture2D(stages,face+vec2(.03125,-.03125)).r,min(.985,progress));
          if(crack+lip<.2)discard;
          gl_FragColor=mix(vec4(.92,.74,.46,.27),vec4(.025,.031,.032,.87),crack);
          #include <colorspace_fragment>
        }`})),this.cracking.scale.setScalar(1.002),this.cracking.visible=!1,this.cracking.renderOrder=3,t.add(this.cracking);const r=this.cube.clone();r.setAttribute("plate",new ye(new Float32Array(r.getAttribute("uv").count*2),2)),this.ghost=new Ce(r,new Je({uniforms:{atlas:{value:n},allowed:{value:1}},transparent:!0,depthWrite:!1,side:zn,forceSinglePass:!0,vertexShader:`attribute vec2 plate;varying vec2 uvPlate,face;varying float range;
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
        }`})),this.ghost.scale.setScalar(.993),this.ghost.visible=!1,this.ghost.renderOrder=4,t.add(this.ghost)}swing(){this.recoil=1}update(t,e,n,s,r,o,a=!0){const c=!!n&&n.active!==!1;this.hand.visible=c&&a,this.cracking.visible=c&&!!e&&n.mining>0,this.cracking.visible&&e&&n&&(this.cracking.position.set(e.x+.5,e.y+.5,e.z+.5),this.cracking.material.uniforms.progress.value=n.mining);const l=n?.preview;if(this.ghost.visible=c&&!!l&&!this.cracking.visible,l&&this.ghost.visible){this.ghost.position.set(l.x+.5,l.y+.5,l.z+.5),this.ghost.material.uniforms.allowed.value=Number(l.valid);const d=l.id+"/"+l.axis;if(d!==this.ghostTile){this.ghostTile=d;const g=this.ghost.geometry.getAttribute("uv"),v=this.ghost.geometry.getAttribute("plate"),p=this.cube.getAttribute("position"),m=this.ghost.geometry.getAttribute("position");for(let _=0;_<g.count;_++){const b=np(_>>2,g.getX(_),g.getY(_),l.id,l.axis??"y");v.setXY(_,b[0],b[1]);const y=p.getX(_),w=p.getY(_),T=p.getZ(_);m.setXYZ(_,y,Dn(l.id)&&w>0?fi(l.id,y+.5,T+.5)-.5:w,T)}v.needsUpdate=!0,m.needsUpdate=!0}}if(!n||!c)return;if(this.recoil=Math.max(0,this.recoil-s*4.8),!a){this.phase=0;return}n.held!==this.lastItem&&(this.hand.geometry.dispose(),this.hand.geometry=ny(this.cube,n.held),this.lastItem=n.held),this.clock+=s,this.phase=n.mining>0?this.phase+s*16:0;const h=o?Math.max(Math.sin(this.phase*.5)**2,Math.sin(this.recoil*Math.PI)):0,u=n.moving&&o?Math.sin(this.clock*(n.sprinting?13:9))*.006:0,f=.54*Math.tan(t.fov*Math.PI/360);this.hand.position.set(f*t.aspect*.66-h*.046,-f*.8+u+h*.042,-.54-h*.045),this.hand.rotation.set(.15-h*.74,-.55+h*.15,-.31+h*.19),this.hand.scale.setScalar(.235),this.hand.material.color.setScalar(r)}dispose(){this.hand.removeFromParent(),this.hand.geometry.dispose(),this.hand.material.dispose(),this.cracking.removeFromParent(),this.cracking.material.dispose(),this.mask.dispose(),this.ghost.removeFromParent(),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.cube.dispose()}}const vi=256,Dh=96,Ih=1.62,_s=1.8,Ke=.3,xs=.96,eh=5,de=1e-7,ur=(i,t,e)=>i>=0&&i<vi&&e>=0&&e<vi&&t>=0&&t<Dh,Ja=i=>i!==0&&i!==13,Bc=(i,t,e)=>Math.min(e,Math.max(t,i));function Uh(i){return{...i,grounded:!1,vx:0,vy:0,vz:0,inWater:!1,flying:!1,wasJump:!1,crouched:!!i.crouched,coyote:0,jumpBuffer:0,eye:i.crouched?.79:Ih,stride:0,bobOffset:0,fovOffset:0}}function nh(i){i.wasJump=!1,i.jumpBuffer=0,i.coyote=0,i.vx=0,i.vz=0,i.bobOffset=0,i.fovOffset=0}function Ms(i){return(i.eye??(i.crouched?.79:Ih))+(i.bobOffset??0)}function ip(i,t,e,n,s,r,o){const{x:a,z:c}=Qd(i);return e+fi(i,s-t-a*o,r-n-c*o)}function ki(i,t,e,n,s=_s){const r=Math.floor(t-Ke+de),o=Math.floor(t+Ke-de),a=Math.floor(e+de),c=Math.floor(e+s-de),l=Math.floor(n-Ke+de),h=Math.floor(n+Ke-de);if(!ur(r,a,l)||!ur(o,c,h))return!0;for(let u=a;u<=c;u++)for(let f=l;f<=h;f++)for(let d=r;d<=o;d++){const g=i.get(d,u,f);if(Ja(g)&&(!Dn(g)||e<ip(g,d,u,f,t,n,Ke-de)-de))return!0}return!1}function ih(i,t,e,n){return i.get(Math.floor(t),Math.floor(e+.12),Math.floor(n))===13||i.get(Math.floor(t),Math.floor(e+1),Math.floor(n))===13}function lo(i,t,e=!1){const n={yaw:Number.isFinite(t.yaw)?t.yaw:0,pitch:Number.isFinite(t.pitch)?Bc(t.pitch,-1.55,1.55):0},s=(u,f,d,g=_s,v=!1)=>Number.isFinite(u)&&Number.isFinite(f)&&Number.isFinite(d)&&!ki(i,u,f,d,g)&&(v||!ih(i,u,f,d));if(s(t.x,t.y,t.z,t.crouched?xs:_s,e))return{x:t.x,y:t.y,z:t.z,...n,...t.crouched?{crouched:!0}:{}};const r=i.spawn?.()??{x:128.5,y:60,z:128.5,...n},o=Number.isFinite(t.x)&&Number.isFinite(t.z)?t:r,a=Bc(Math.floor(o.x),0,vi-1),c=Bc(Math.floor(o.z),0,vi-1);function l(u,f){if(ur(u,0,f))for(let d=Dh-1;d>=0;d--){const g=i.get(u,d,f);if(g!==0)return g!==13&&s(u+.5,d+1,f+.5)?{x:u+.5,y:d+1,z:f+.5,...n}:void 0}}const h=l(a,c);if(h)return h;if(s(r.x,r.y,r.z))return{...r,...n};for(let u=1;u<vi;u++)for(let f=-u;f<=u;f++){const d=l(a+f,c-u)??l(a+f,c+u);if(d)return d;if(Math.abs(f)<u){const g=l(a-u,c+f)??l(a+u,c+f);if(g)return g}}throw new Error("立てる場所が見つかりません。別のワールドかバックアップを開いてください。")}function sp(i,t,e,n){if(!n)return!1;const s=t[e];t[e]=s+n;const r=t.crouched?xs:_s;if(!ki(i,t.x,t.y,t.z,r))return!1;if(e==="y"&&n<0){const l=Xr(i,t.x,t.z,t.y-de,s+de);if(l)return t.y=l.y,!0}const o=e==="y"?n>0?r:0:n>0?Ke:-Ke,a=s+n+o,c=(n>0?Math.floor(a-de):Math.ceil(a+de))-o;if(e!=="y"&&Math.abs(c-s)>Math.abs(n)+de){let l=0,h=1;for(let u=0;u<9;u++){const f=(l+h)/2;t[e]=s+n*f,ki(i,t.x,t.y,t.z,r)?h=f:l=f}t[e]=s+n*l}else t[e]=c;return!0}function Xr(i,t,e,n,s,r=Ke-de){let o=null;const a=Math.max(0,Math.ceil(n-1)),c=Math.min(Dh-1,Math.floor(s)),l=Math.max(0,Math.floor(t-r)),h=Math.min(vi-1,Math.floor(t+r)),u=Math.max(0,Math.floor(e-r)),f=Math.min(vi-1,Math.floor(e+r));for(let d=a;d<=c;d++)for(let g=u;g<=f;g++)for(let v=l;v<=h;v++){const p=i.get(v,d,g);if(!Ja(p))continue;const m=Dn(p),_=m?ip(p,v,d,g,t,e,r):d+1;_<n||_>s||(!o||_>o.y+de||!m&&Dn(o.id)&&Math.abs(_-o.y)<=de)&&(o={y:_,id:p})}return o}function Ks(i,t,e,n,s=Ke-de){return Xr(i,t,n,e-.002,e+.002,s)}function df(i,t,e,n,s,r,o){if(!n)return!1;const a=t.x+(e==="x"?n:0),c=t.z+(e==="z"?n:0);if(s&&i.stage==="school"){const l=Math.sign(n)*(Ke-de),h=e==="x"?l:0,u=e==="z"?l:0,f=Qh(Math.floor(a+h),Math.floor(c+u)),d=Qh(Math.floor(a-h),Math.floor(c-u)),g=t.crouched?xs:_s;if(f!==void 0&&Math.abs(f-t.y-1)<.003&&!ki(i,a,f,c,g))return t[e]+=n,t.y=f,!1;if(f!==void 0||d!==void 0)if(Ks(i,a,t.y,c))r&&(o=Ke-de);else{const p=Xr(i,a,c,t.y-1.003,t.y-.997);if(p&&!ki(i,a,p.y,c,g))return t[e]+=n,t.y=p.y,!1}}if(s){const l=Math.abs(n)+.054,h=Xr(i,a,c,t.y-l,t.y+l);if(h&&(Dn(h.id)||Dn(s.id))){if(r&&!Xr(i,a,c,t.y-l,t.y+l,o))return!0;if(!ki(i,a,h.y,c,t.crouched?xs:_s))return t[e]+=n,t.y=h.y,!1}}return r&&!Ks(i,a,t.y,c,o)?!0:sp(i,t,e,n)}function ry(i,t,e,n,s={}){if(!(n>0)||!Number.isFinite(n))return;const r=Math.min(n,.25),o=Math.ceil(r*100),a=r/o,c=Math.max(1,Math.hypot(e.forward,e.right)),l=e.forward/c,h=e.right/c,u=Math.sin(t.yaw),f=Math.cos(t.yaw),d=h*f-l*u,g=-h*u-l*f,v=s.sprintMultiplier??1,p=Number.isFinite(v)?Math.min(1.4,Math.max(1,v)):1;(e.jumpPressed||e.jump&&!t.wasJump)&&(t.jumpBuffer=.105);for(let m=0;m<o;m++){const _=t.x,b=t.z;t.inWater=ih(i,t.x,t.y,t.z);const y=t.vy<=0?Ks(i,_,t.y,b):null;y&&(t.y=y.y),t.crouched=!t.flying&&!t.inWater&&e.down&&(!!y||t.crouched)||t.crouched&&ki(i,_,t.y,b);const w=t.flying?e.sprint?13:8:t.inWater?2*(e.sprint?p:1):t.crouched?1.65:e.sprint?6.4*p:4.2;if(t.flying||t.inWater)t.vx=d*w,t.vz=g*w;else{const W=y&&Dn(y.id)?Qd(y.id):null,K=W?t.crouched?2.4:6.4:0,$=W?w*.48:w,G=d*$+(W?.x??0)*K-t.vx,st=g*$+(W?.z??0)*K-t.vz,ft=Math.min(1,(W?13:y?d||g?53:72:d||g?17:5)*a/(Math.hypot(G,st)||1));t.vx+=G*ft,t.vz+=st*ft}const T=!!y&&t.crouched&&!t.flying,R=T&&Ks(i,_,t.y,b,.1)?.1:Ke-de,D=t.vx*a,E=t.vz*a,S=t.flying||t.inWater?null:y;if(df(i,t,"x",D,S,T,R)&&(t.vx=0),df(i,t,"z",E,S,T,R)&&(t.vz=0),y&&(t.coyote=.08),t.flying)t.coyote=t.jumpBuffer=0,t.vy=(Number(e.jump)-Number(e.down))*w;else if(t.inWater)t.coyote=t.jumpBuffer=0,t.vy=e.jump?4.9:Math.max(-2.1,t.vy-7*a);else{const W=y&&Math.abs(t.y-Math.round(t.y))<.002?Zx(i.get(Math.floor(t.x),Math.round(t.y)-1,Math.floor(t.z))):0;(W||t.jumpBuffer>0&&t.coyote>0)&&(t.vy=W?Math.sqrt(48*W)+.12:8.35,t.jumpBuffer=t.coyote=0),t.vy>0||!Ks(i,t.x,t.y,t.z)?t.vy=Math.max(-30,t.vy-24*a):t.vy=0}sp(i,t,"y",t.vy*a)&&(t.vy=0),t.grounded=t.vy<=0&&!!Ks(i,t.x,t.y,t.z),t.jumpBuffer=Math.max(0,t.jumpBuffer-a),t.coyote=Math.max(0,t.coyote-a);const P=Math.hypot(t.x-_,t.z-b);t.stride=(t.stride+P*4.2)%(Math.PI*2);const F=t.grounded&&!t.flying&&P>0&&s.bob!==!1?Math.sin(t.stride)*(t.crouched?.006:.021):0;t.bobOffset+=(F-t.bobOffset)*Math.min(1,18*a);const O=t.crouched?.79:Ih;t.eye+=(O-t.eye)*Math.min(1,18*a),t.crouched&&t.eye>xs-.07&&ki(i,t.x,t.y,t.z,t.eye+.07)&&(t.eye=xs-.07);const q=e.sprint&&!t.crouched&&P/a>4.2&&s.sprintFov!==!1?4:0;t.fovOffset+=(q-t.fovOffset)*Math.min(1,10*a)}t.inWater=ih(i,t.x,t.y,t.z),t.wasJump=e.jump}function Gn(i,t,e=eh){if(!Number.isFinite(e)||e<0||![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=t.x,s=t.y+Ms(t),r=t.z,o=Math.cos(t.pitch),a=-Math.sin(t.yaw)*o,c=Math.sin(t.pitch),l=-Math.cos(t.yaw)*o;let h=Math.floor(n),u=Math.floor(s),f=Math.floor(r);const d=Math.sign(a),g=Math.sign(c),v=Math.sign(l),p=a?Math.abs(1/a):1/0,m=c?Math.abs(1/c):1/0,_=l?Math.abs(1/l):1/0,b=(F,O,q)=>q===0?1/0:Math.max(0,((q>0?O+1:O)-F)/q);let y=b(n,h,a),w=b(s,u,c),T=b(r,f,l),R=0,D=0,E=0,S=0;const P=Math.min(eh,e);for(let F=0;F<=3*Math.ceil(P)+1&&S<=P&&ur(h,u,f);F++){const O=i.get(h,u,f);if(Dn(O)){const $=Math.min(P,y,w,T),G=ft=>s+c*ft-u-fi(O,n+a*ft-h,r+l*ft-f),st=G(S),ct=G($);if(st<=de)return{x:h,y:u,z:f,id:O,nx:R,ny:D,nz:E,distance:S};if(ct<=0){const ft=S+($-S)*st/(st-ct);return{x:h,y:u,z:f,id:O,nx:0,ny:1,nz:0,distance:ft}}}else if(Ja(O))return{x:h,y:u,z:f,id:O,nx:R,ny:D,nz:E,distance:S};R=D=E=0,S=Math.min(y,w,T);const q=y<=S+1e-10,W=w<=S+1e-10,K=T<=S+1e-10;q&&(y+=p,h+=d),W&&(w+=m,u+=g),K&&(T+=_,f+=v),q?R=-d:W?D=-g:E=-v}return null}function xo(i,t,e,n){return t<i.x+Ke-de&&t+1>i.x-Ke+de&&n<i.z+Ke-de&&n+1>i.z-Ke+de&&e<i.y+(i.crouched?xs:_s)-de&&e+1>i.y+de}function oy(i,t,e){if(!e||Math.abs(e.nx)+Math.abs(e.ny)+Math.abs(e.nz)!==1)return!1;const n=e.x+e.nx,s=e.y+e.ny,r=e.z+e.nz;return!ur(n,s,r)||Ja(i.get(n,s,r))?!1:!xo(t,n,s,r)}function rp(i,t,e){if(!e)return!1;const n=Gn(i,t);return!!n&&n.x===e.x&&n.y===e.y&&n.z===e.z&&n.id===e.id&&n.nx===e.nx&&n.ny===e.ny&&n.nz===e.nz}function ay(i,t,e,n,s,r){if(!rp(i,t,r))return{ok:!1,message:"5ブロック以内の素材に照準を合わせてください。"};if(r.id===22&&i.chestAt?.(r.x,r.y,r.z)?.length)return{ok:!1,message:"先にチェストの中身を取り出してください。"};if(!Jt[r.id]?.block)return{ok:!1,message:"岩盤は掘れません。"};if(n==="creative")return i.set(r.x,r.y,r.z,0)?{ok:!0,message:Jt[r.id].name+"を取り除きました。"}:{ok:!1,message:"ここは掘れません。"};const o=id(e,r.id,e.hotbar[s]);return o.draft?i.set(r.x,r.y,r.z,0)?(Object.assign(e,o.draft),{ok:!0,message:o.message}):{ok:!1,message:"ここは掘れません。"}:{ok:!1,message:o.message}}function Nh(i,t,e,n,s,r){const o=e.hotbar[s];if(!Jt[o]?.block)return"ホットバーから建材を選んでください。";if(n==="explore"&&!bn(e,o))return Jt[o].name+"を持っていません。";if(!r)return"5ブロック以内の面に照準を合わせてください。";const a=r.x+r.nx,c=r.y+r.ny,l=r.z+r.nz;return ur(a,c,l)?xo(t,a,c,l)?"自分の体に重なる場所です。":oy(i,t,r)?null:"ここにはすでにブロックがあります。":"ワールドの外には置けません。"}function cy(i,t,e,n,s,r,o){const a=Nh(i,t,e,n,s,r);if(a)return{ok:!1,message:a};if(!rp(i,t,r))return{ok:!1,message:"5ブロック以内の面に照準を合わせてください。"};const c=e.hotbar[s];return o!==void 0&&(c!==30||!Dn(o))?{ok:!1,message:"この建材の向きは変更できません。"}:i.set(r.x+r.nx,r.y+r.ny,r.z+r.nz,o??c)?(n==="explore"&&sd(e,c),{ok:!0,message:Jt[c].name+"を置きました。"}):{ok:!1,message:"ここには置けません。"}}const ly=.17;function hy(i,t,e,n,s){if(t-s<0||n-s<0||t+s>=vi||n+s>=vi||e-s<0)return!0;for(let r=Math.floor(e-s);r<=Math.floor(e+s);r++)for(let o=Math.floor(n-s);o<=Math.floor(n+s);o++)for(let a=Math.floor(t-s);a<=Math.floor(t+s);a++){const c=i.get(a,r,o);if(c!==0&&c!==13)return!0}return!1}function pf(i,t,e,n){const s=Math.max(1,Math.ceil(t.distanceTo(e)/.14));for(let r=1;r<=s;r++){const o=r/s;if(hy(i,t.x+(e.x-t.x)*o,t.y+(e.y-t.y)*o,t.z+(e.z-t.z)*o,n))return(r-1)/s}return 1}function op(i,t){ap(i,67+(t.fovOffset??0)),i.position.set(t.x,t.y+Ms(t),t.z),i.rotation.set(t.pitch,t.yaw,0,"YXZ")}function ap(i,t){Math.abs(t-i.fov)<=.01||(i.fov=t,i.updateProjectionMatrix())}class uy{eye=new U;raised=new U;aim=new U;screen=new U;boom=1;next=!1;reticle={x:50,y:50};reset(){this.boom=1,this.next=!1,this.reticle.x=this.reticle.y=50}update(t,e,n,s,r,o=!1){const a=Math.sin(n.yaw),c=Math.cos(n.yaw),l=Math.cos(n.pitch);this.eye.set(n.x,n.y+Ms(n),n.z);const h=s?Math.max(0,s.distance-.035):eh;this.aim.set(n.x-a*l*h,this.eye.y+Math.sin(n.pitch)*h,n.z-c*l*h);const u=o?4.2:7.4,f=o?2.6:5.6;this.raised.set(n.x+a*u,this.eye.y+f,n.z+c*u);let d=pf(e,this.eye,this.raised,ly);if(s&&(d=this.visibleFraction(t,e,d)),this.boom=this.next?Math.min(d,this.boom+(d-this.boom)*(1-Math.exp(-11*r))):d,this.next=!0,s&&this.boom!==d&&(this.boom=this.visibleFraction(t,e,this.boom)),t.position.lerpVectors(this.eye,this.raised,this.boom),this.boom<.23)return op(t,n),this.reticle.x=this.reticle.y=50,!1;const g=53;ap(t,g);const v=Math.min(1.65,this.boom*2.5),p=Math.atan2(n.y+1.03-t.position.y,u*this.boom+v),m=Math.atan2(this.aim.y-t.position.y,u*this.boom+l*h),_=g*Math.PI/180*.35;return t.rotation.set(Math.min(m+_,Math.max(m-_,p)),n.yaw,0,"YXZ"),t.updateMatrixWorld(),this.screen.copy(this.aim).project(t),this.reticle.x=(1+this.screen.x)*50,this.reticle.y=(1-this.screen.y)*50,!0}visibleFraction(t,e,n){for(;n>=.23&&(t.position.lerpVectors(this.eye,this.raised,n),pf(e,t.position,this.aim,0)!==1);)n*=.61;return n}}function cp(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Qe;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=mf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let v=0;v<o[h].length;++v)d.push(o[h][v][f]);const g=mf(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function mf(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new an(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const v=h.getComponent(f,g);a.setComponent(f+u,g,v)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const Pr=5847973,Hc=9929704,gf=16760167,Vc=16771519,fy=3583139,vf=3425640,Lr=16480361,_f=15972242,xf=3681102,dy=[.79,.67,1,.51,.72,.88];function ea(i,t){const e=i.map(([s,r,o,a,c,l,h])=>{const u=new Sn(a,c,l);u.translate(s,r,o);const f=new qt(h),d=new Float32Array(u.attributes.position.count*3);for(let g=0;g<d.length/3;g++){const v=dy[Math.floor(g/4)];f.multiplyScalar(v).toArray(d,g*3),f.setHex(h)}return u.setAttribute("color",new an(d,3)),u}),n=cp(e);for(const s of e)s.dispose();return new Ce(n,t)}class lp{group=new fs;body=new fs;material=new Wi({vertexColors:!0,toneMapped:!1});head;arms=[];legs=[];shadow=new Ce(new vr(.76,.76),new Je({transparent:!0,depthWrite:!1,vertexShader:`
        varying vec2 texel;
        void main() {
          texel = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }`,fragmentShader:`
        varying vec2 texel;
        void main() {
          float opacity = .33 * (1. - smoothstep(.09, .49, length(texel - .5)));
          gl_FragColor = vec4(.09, .13, .17, opacity);
        }`}));phase=0;idle=0;gait=0;actionPhase=0;actionBlend=0;constructor(){this.group.name="kids-avatar",this.group.visible=!1,this.group.add(this.body,this.shadow),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.012,this.shadow.renderOrder=1;const t=ea([[0,.796,0,.39,.53,.29,gf],[0,.57,0,.4,.095,.3,Pr],[0,.789,-.149,.034,.38,.015,Vc],[0,1.044,.005,.39,.094,.32,Lr],[-.102,.962,-.15,.087,.15,.025,Lr],[0,.832,.174,.326,.385,.224,vf],[0,.878,.237,.303,.28,.102,fy],[0,.972,.244,.303,.098,.106,7919294],[0,.849,.299,.086,.086,.025,Vc],[0,.849,.315,.031,.031,.013,Lr],[0,.686,.233,.22,.078,.108,2656899]],this.material);t.name="explorer-coat-and-pack",this.body.add(t),this.head=ea([[0,.223,0,.426,.446,.405,_f],[0,.27,.123,.428,.31,.158,Pr],[0,.446,.003,.494,.143,.451,Pr],[0,.534,.013,.444,.086,.417,Hc],[0,.579,.026,.302,.038,.287,Hc],[0,.421,-.181,.456,.056,.163,Hc],[0,.498,.007,.194,.027,.125,Vc],[-.102,.233,-.203,.039,.055,.011,xf],[.102,.233,-.203,.039,.055,.011,xf],[-.141,.167,-.203,.063,.018,.011,Lr],[.141,.167,-.203,.063,.018,.011,Lr],[0,.146,-.204,.054,.022,.011,9522272]],this.material),this.head.name="explorer-head",this.head.position.y=1.08,this.body.add(this.head);for(const e of[-1,1]){const n=ea([[0,-.127,0,.122,.318,.182,gf],[0,-.269,0,.126,.084,.185,Pr],[0,-.343,-.012,.113,.086,.129,_f]],this.material);n.name="explorer-arm",n.position.set(.232*e,.969,.01),this.arms.push(n),this.body.add(n);const s=ea([[0,-.146,.01,.158,.319,.168,vf],[0,-.346,-.037,.173,.143,.247,Pr],[0,-.415,-.031,.176,.048,.251,2501193]],this.material);s.name="explorer-boot",s.position.set(.112*e,.441,.008),this.legs.push(s),this.body.add(s)}}update(t,e,n=!1,s=1){const r=Math.min(.05,Math.max(0,e)),o=Math.hypot(t.vx,t.vz),a=!t.grounded&&!t.inWater&&!t.flying,c=t.grounded||t.inWater?Math.min(1,o/3.1):0;this.gait=Br.damp(this.gait,c,17,r),this.phase=(this.phase+r*(4+Math.min(6.4,o)*1.65))%(Math.PI*2),this.idle=(this.idle+r*3)%(Math.PI*2),this.actionPhase=n?(this.actionPhase+r*20)%(Math.PI*2):0,this.actionBlend=Br.damp(this.actionBlend,n?1:0,21,r);const l=Math.sin(this.phase)*this.gait,h=(.52+.35*Math.sin(this.actionPhase))*this.actionBlend;this.group.position.set(t.x,t.y,t.z),this.group.rotation.y=t.yaw,this.body.position.y=.004+(t.grounded?.028*this.gait*Math.abs(l):0)+.006*(1+Math.sin(this.idle)),this.body.scale.y=t.crouched?.54:1,this.head.rotation.x=Br.clamp(t.pitch*.28,-.22,.21),this.head.rotation.z=.037*l,this.legs[0].rotation.x=.5*l+(a?.18:0),this.legs[1].rotation.x=-.5*l-(a?.21:0),this.arms[0].rotation.x=-.49*l+(a?.24:0),this.arms[1].rotation.x=.49*l+h+(a?.24:0),this.arms[0].rotation.z=t.flying?-.38:-.035,this.arms[1].rotation.z=t.flying?.38:.035,this.shadow.visible=t.grounded&&!t.inWater&&!t.flying;const u=Br.clamp(s,0,1);this.material.color.setRGB(.58+u*.42,.66+u*.34,.8+u*.2)}dispose(){this.group.removeFromParent();for(const t of this.body.children)t instanceof Ce&&t.geometry.dispose();this.material.dispose(),this.shadow.geometry.dispose(),this.shadow.material.dispose()}}function py(i,t,e,n){const s=t.position;if(Math.hypot(e.x-s.x,e.y-s.y,e.z-s.z)>28)return!1;for(const r of e.crouched?[.56,.88]:[.88,1.55]){const o=e.x,a=e.y+r,c=e.z;if(n.set(o,a,c).project(t),Math.abs(n.x)>.99||Math.abs(n.y)>.99||n.z<=-1||n.z>=1)continue;const l=Math.max(1,Math.ceil(Math.hypot(o-s.x,a-s.y,c-s.z)/.19));let h=!0;for(let u=1;u<l;u++){const f=u/l,d=i.get(Math.floor(s.x+(o-s.x)*f),Math.floor(s.y+(a-s.y)*f),Math.floor(s.z+(c-s.z)*f));if(d!==0&&d!==10&&d!==13){h=!1;break}}if(h)return!0}return!1}function yf(i){const t=document.createElement("canvas");t.width=512,t.height=96;const e=t.getContext("2d");e.font="bold 46px system-ui, sans-serif";const n=Math.min(490,Math.ceil(e.measureText(i).width)+50),s=(t.width-n)/2;e.fillStyle="#142e29eb",e.beginPath(),e.roundRect?e.roundRect(s,12,n,72,22):e.rect(s,12,n,72),e.fill(),e.strokeStyle="#eec983",e.lineWidth=3,e.stroke(),e.fillStyle="#fff6d9",e.textAlign="center",e.textBaseline="middle",e.fillText(i,256,49,n-34);const r=new ig(t);r.colorSpace=je;const o=new Z0(new Od({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}));return o.scale.set(3.35,.63,1),o}class my{constructor(t){this.scene=t}scene;actors=new Map;sample=new U;setPlayers(t,e=null){const n=new Set;for(const s of t){n.add(s.id);const r=s.id===e?"鬼 "+s.nickname:s.nickname;let o=this.actors.get(s.id);if(o)o.caption!==r&&(this.releaseLabel(o.label),o.label=yf(r),o.caption=r,o.avatar.group.add(o.label));else{const a=new lp,c=yf(r);a.group.visible=!0,a.group.name="online-player",a.group.add(c),this.scene.add(a.group),o={avatar:a,label:c,caption:r,body:Uh({...s.pose,pitch:0}),goal:s.pose},this.actors.set(s.id,o)}o.goal=s.pose}for(const[s,r]of this.actors)n.has(s)||this.release(s,r)}animate(t,e,n,s){for(const{body:r,goal:o,avatar:a,label:c}of this.actors.values()){const h=Math.hypot(o.x-r.x,o.y-r.y,o.z-r.z)>12||t===0?1:1-Math.exp(-6*t);r.x+=(o.x-r.x)*h,r.y+=(o.y-r.y)*h,r.z+=(o.z-r.z)*h;const u=o.yaw-r.yaw;r.yaw+=Math.atan2(Math.sin(u),Math.cos(u))*h,r.crouched=o.crouched,r.flying=o.flying,r.grounded=!o.flying,r.vx=o.moving?3.3:0,c.position.y=o.crouched?1.23:2.02,a.update(r,t,!1,e),c.visible=!s||py(n,s,r,this.sample)}}dispose(){for(const[t,e]of this.actors)this.release(t,e)}release(t,{avatar:e,label:n}){this.releaseLabel(n),e.dispose(),this.actors.delete(t)}releaseLabel(t){t.removeFromParent(),t.material.map?.dispose(),t.material.dispose()}}const gy=[0,8629330,11041876,9608594,14663561,9861198,6528082,13080411,9608078,9084310,10344399,6647915,15975794,6932679,5857887];class vy{constructor(t,e){this.canvas=t,this.world=e;const n=t.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"high-performance"});if(!n)throw new Error("WebGL 2を利用できません。ChromeまたはEdgeの設定でグラフィック アクセラレーションを有効にして再起動してください。");this.gl=new Xx({canvas:t,context:n,antialias:!1,alpha:!1}),this.gl.outputColorSpace=je,this.gl.toneMapping=pi,this.atlas.anisotropy=Math.min(4,this.gl.capabilities.getMaxAnisotropy()),this.gl.setClearColor(12376013),this.sky=new ey(this.scene,e.salt),this.uniforms.schoolLight.value=+(e.stage==="school");for(let r=0;r<this.heights.length;r++)this.heights[r]=Math.max(0,e.highest[r]);this.heightTexture=new _o(this.heights,256,256,go),this.heightTexture.magFilter=ke,this.heightTexture.minFilter=ke,this.heightTexture.needsUpdate=!0,this.materials=[ff(this.atlas,this.heightTexture,this.sky,this.uniforms,!1),ff(this.atlas,this.heightTexture,this.sky,this.uniforms,!0)],this.tools=new sy(this.scene,this.camera,this.atlas);const s=new Sn(1.008,1.008,1.008);this.selection=new ng(new sg(s),new Vd({color:16772533,toneMapped:!1})),s.dispose(),this.selection.visible=!1,this.selection.renderOrder=4,this.scene.add(this.selection),this.chips=new ao(new Sn(.1,.1,.1),new Wi({color:16777215}),64),this.chips.count=0,this.chips.frustumCulled=!1,this.chips.visible=!1,this.scene.add(this.chips),this.border=this.makeBorder(),this.scene.add(this.border),this.unsubscribe=e.onEdit((r,o,a)=>{for(const h of dm(r,o,a))this.wanted.has(h)&&this.dirty.add(h);const c=r+256*a,l=Math.max(0,e.highest[c]);this.heights[c]!==l&&(this.heights[c]=l,this.heightTexture.needsUpdate=!0),this.lampDue=0})}canvas;world;scene=new j0;actors=new my(this.scene);camera=new Cn(67,1,.06,320);stats={draws:0,chunks:0,geometries:0,textures:0,fps:0,queued:0,triangles:0,chunkMs:0,rebuilt:0};gl;sky;atlas=Yx();heightTexture;heights=new Uint8Array(256*256);uniforms={lampPositions:{value:Array.from({length:4},()=>new U)},lampCount:{value:0},lampColors:{value:Array.from({length:4},()=>new U)},fogEnd:{value:75},clock:{value:0},shadows:{value:1},extras:{value:1},submerged:{value:0},schoolLight:{value:0}};tools;kidsCamera=new uy;avatar;actionTime=0;materials;batches=new Map;pending=[];wanted=new Set;dirty=new Set;unsubscribe;selection;border;chips;particles=[];dummy=new Pe;chipColor=new qt;quality={distance:4,scale:1,shadows:!0};cx=-100;cz=-100;cy=-100;t=0;wt=0;ht=0;lampDue=0;elapsed=0;frameCount=0;totalFrames=0;lampCamera=new U(1/0,1/0,1/0);vegetation=1;visibleChunks=new Set;configure(t){const e=Math.max(2,Math.min(8,Math.round(t.distance)));e!==this.quality.distance&&(this.cx=-100);const n=t.vegetation===!1?0:t.quality==="high"?1.4:t.quality==="low"?.42:1;if(n!==this.vegetation){this.vegetation=n;for(const s of this.batches.keys())this.world.occupied[s]&&this.dirty.add(s)}this.quality={...t,distance:e,scale:Math.max(.45,Math.min(1.5,t.scale))},this.uniforms.shadows.value=t.shadows?t.quality==="high"?2:1:0,this.uniforms.extras.value=t.effects===!1?0:1,this.uniforms.fogEnd.value=(e+.45)*16,this.wt=0}makeBorder(){const t=[];for(const[r,o,a,c]of[[0,0,256,0],[256,0,256,256],[256,256,0,256],[0,256,0,0]])t.push(r,0,o,a,0,c,a,96,c,r,0,o,a,96,c,r,96,o);const e=new Qe;e.setAttribute("position",new ye(t,3));const n=new Je({side:zn,transparent:!0,depthWrite:!1,vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 p;void main(){
        float limit=1.-smoothstep(1.,12.,distance(cameraPosition,p));if(limit<=0.)discard;
        vec2 grid=fract(vec2(p.x+p.z,p.y)*.5);float line=step(min(grid.x,grid.y),.022);
        gl_FragColor=vec4(.95,.79,.45,limit*(.06+.49*line));}`}),s=new Ce(e,n);return s.visible=!1,s}schedule(t){const e=Math.floor(t.x/16),n=Math.floor(t.z/16),s=Math.floor(t.y/16);if(e===this.cx&&n===this.cz&&s===this.cy)return;this.cx=e,this.cz=n,this.cy=s,this.wanted.clear(),this.pending.length=0;const r=this.quality.distance,o=-Math.sin(t.yaw),a=-Math.cos(t.yaw);for(let c=Math.max(0,n-r);c<=Math.min(15,n+r);c++)for(let l=Math.max(0,e-r);l<=Math.min(15,e+r);l++){const h=l-e,u=c-n,f=Math.hypot(h,u);if(f>r+.65)continue;const d=this.world.highest[l*16+8+256*(c*16+8)]>>4;for(let g=0;g<6;g++){const v=to(l,g,c);if(this.wanted.add(v),this.batches.has(v)||!this.world.occupied[v])continue;const p=h*o+u*a,m=Math.min(Math.abs(g-d)*2,Math.abs(g-s)*2);this.pending.push({key:v,priority:f*2.2+m+.2*Math.abs(g-s)-p*.55+(g+1<Math.min(s,d)?8:0)})}}this.pending.sort((c,l)=>l.priority-c.priority);for(const[c,l]of this.batches)this.wanted.has(c)||(this.removeMeshes(l),this.batches.delete(c));for(const c of this.dirty)this.wanted.has(c)||this.dirty.delete(c)}removeMeshes(t){for(const e of t)this.scene.remove(e),e.geometry.dispose()}rebuild(t){const e=this.batches.get(t);e&&this.removeMeshes(e);const n=[],s=ty(this.world,t&15,t>>>8,t>>>4&15,this.vegetation);for(let r=0;r<s.length;r++){const o=s[r];if(!o)continue;const a=new Ce(o,this.materials[r===0?0:1]);a.renderOrder=r===0?0:1,a.onBeforeRender=()=>{this.visibleChunks.add(t)},n.push(a),this.scene.add(a)}this.batches.set(t,n)}pump(){const t=performance.now(),e=this.totalFrames<4?8:3.5;let n=0;do{let s;if(this.dirty.size)s=this.dirty.values().next().value,this.dirty.delete(s);else if(this.pending.length){if(s=this.pending.pop().key,this.batches.has(s))continue}else break;this.rebuild(s),n++}while(n<9&&performance.now()-t<e);this.stats.chunkMs=n?performance.now()-t:0,this.stats.rebuilt=n}lamps(t){const e=[];for(const n of this.world.lamps){const s=(n&255)+.5,r=(n>>>16)+.5,o=(n>>>8&255)+.5,a=(s-t.x)**2+(o-t.z)**2+(r-t.y)**2;a>676||e.length===4&&a>=e[3].d||(e.push({key:n,d:a}),e.sort((c,l)=>c.d-l.d),e.length>4&&e.pop())}this.uniforms.lampCount.value=e.length,e.forEach(({key:n},s)=>{this.uniforms.lampPositions.value[s].set((n&255)+.5,(n>>>16)+.5,(n>>>8&255)+.5);const r=this.world.data[n]===25;this.uniforms.lampColors.value[s].set(r?.36:1.86,r?1.57:1.09,r?1.4:.43)})}effect(t,e,n,s,r="mine"){this.tools.swing(),this.actionTime=.26;const o=this.quality.effects===!1?0:r==="place"?3:7;for(let a=0;a<o;a++)this.particles.length>=64&&this.particles.shift(),this.particles.push({x:t+.5+(Math.random()-.5)*.65,y:e+.55+Math.random()*.38,z:n+.5+(Math.random()-.5)*.65,vx:(Math.random()-.5)*2.1,vy:1+Math.random()*1.7,vz:(Math.random()-.5)*2.1,life:.32+Math.random()*.17,id:s})}updateParticles(t){for(let e=this.particles.length-1;e>=0;e--){const n=this.particles[e];if(n.life-=t,n.life<=0){this.particles.splice(e,1);continue}n.vy-=8*t,n.x+=n.vx*t,n.y+=n.vy*t,n.z+=n.vz*t}this.chips.count=this.particles.length,this.chips.visible=this.chips.count>0;for(let e=0;e<this.chips.count;e++){const n=this.particles[e];this.dummy.position.set(n.x,n.y,n.z),this.dummy.rotation.set(n.life*4,e+n.life*5,e*.8),this.dummy.scale.setScalar(Math.min(1,n.life*5)),this.dummy.updateMatrix(),this.chips.setMatrixAt(e,this.dummy.matrix),this.chips.setColorAt(e,this.chipColor.setHex(gy[n.id]??(n.id===23||n.id===25||n.id===26?9554109:11837559)))}this.chips.count&&(this.chips.instanceMatrix.needsUpdate=!0,this.chips.instanceColor&&(this.chips.instanceColor.needsUpdate=!0))}update(t,e,n,s,r,o,a=!1){const c=Math.max(1,this.canvas.clientWidth),l=Math.max(1,this.canvas.clientHeight);if(c!==this.wt||l!==this.ht){this.wt=c,this.ht=l;const v=Math.min(window.devicePixelRatio||1,1.5),p=this.quality.quality==="standard"||this.quality.quality==="high"?2073600:12e5,m=Math.sqrt(p/(c*l));this.gl.setPixelRatio(Math.min(v,m)*this.quality.scale),this.gl.setSize(c,l,!1),this.camera.aspect=c/l,this.camera.updateProjectionMatrix()}this.t+=s,this.uniforms.clock.value=this.t;const h=Ms(t),u=o?this.kidsCamera.update(this.camera,this.world,o.player,o.hit,s,this.world.stage==="school"):!1;o||op(this.camera,t),this.sky.update(n,this.camera,this.t),a&&this.camera.updateMatrixWorld(),this.actors.animate(s,.52+.48*this.sky.day.value,this.world,a?this.camera:void 0),this.actionTime=Math.max(0,this.actionTime-s),u&&o&&(this.avatar||(this.avatar=new lp,this.scene.add(this.avatar.group)),this.avatar.update(o.player,s,this.actionTime>0||!!r?.mining,.52+.48*this.sky.day.value)),this.avatar&&(this.avatar.group.visible=u),this.selection.visible=!!e,e&&this.selection.position.set(e.x+.5,e.y+.5,e.z+.5);const f=this.camera.position;this.uniforms.submerged.value=+(this.world.get(Math.floor(f.x),Math.floor(f.y),Math.floor(f.z))===13),this.border.visible=Math.min(t.x,t.z,256-t.x,256-t.z)<12,this.schedule(t),this.pump(),this.lampDue-=s,(this.lampDue<=0||this.lampCamera.distanceToSquared(this.camera.position)>4)&&(this.lamps(t),this.lampDue=.23,this.lampCamera.copy(this.camera.position)),this.updateParticles(s);const d=this.world.highest[(t.x|0)+(t.z|0)*256]>t.y+h+1.5;this.tools.update(this.camera,e,r,s,(d?.57:.7)+this.sky.day.value*(d?.13:.3),this.uniforms.extras.value>0,!u),this.visibleChunks.clear(),this.gl.render(this.scene,this.camera);const g=this.gl.info;this.stats.draws=g.render.calls,this.stats.triangles=g.render.triangles,this.stats.geometries=g.memory.geometries,this.stats.chunks=this.visibleChunks.size,this.stats.textures=g.memory.textures,this.stats.queued=this.pending.length+this.dirty.size,this.totalFrames++,this.frameCount++,this.elapsed+=s,this.elapsed>=.6&&(this.stats.fps=Math.round(this.frameCount/this.elapsed),this.frameCount=0,this.elapsed=0)}dispose(){this.unsubscribe(),this.actors.dispose(),this.avatar?.dispose();for(const t of this.batches.values())this.removeMeshes(t);this.batches.clear(),this.dirty.clear(),this.wanted.clear(),this.pending.length=0,this.selection.geometry.dispose(),this.selection.material.dispose(),this.border.geometry.dispose(),this.border.material.dispose(),this.chips.geometry.dispose(),this.chips.material.dispose(),this.chips.dispose(),this.sky.dispose(this.scene),this.materials.forEach(t=>t.dispose()),this.tools.dispose(),this.atlas.dispose(),this.heightTexture.dispose(),this.scene.clear(),this.gl.dispose()}}const Qa=[{id:"classic",name:"森と湖",detail:"森や洞窟を探検できる、にぎやかなワールド。",thumbnail:"./art/stage-classic.webp"},{id:"flat",name:"まっさらな平地",detail:"木や建物のない草原。自由な建築に。",thumbnail:"./art/stage-flat.webp"},{id:"lake",name:"湖だけ",detail:"小さな砂島から出発。湖の中で魚に出会えます。",thumbnail:"./art/stage-lake.webp"},{id:"school",name:"学校",detail:"教室や階段に隠れ、廊下を回り込んで逃げよう。",thumbnail:"./art/stage-school.webp"},{id:"frontier",name:"西部の町",detail:"荒野と湖に囲まれた町。家を建て、保安官と町を守ろう。",thumbnail:"./art/stage-frontier.webp"}];function ho(i){return Qa.some(t=>t.id===i)}function Fh(i){return ho(i)&&i!=="school"}function Ba(i){return i==="classic"||i==="frontier"}function ya(i){return i==="flat"||i==="school"}const Gc=[1,3,5,10,15],Wc=5,_y={classic:"森や丘、洞窟と湖が広がる地形。",flat:"見晴らしのよい、木や建物のない草原。",lake:"小さな砂島と、その周りに広がる大きな湖。"};function xy(i,t,e,n){const s=t==="creative";function r(c){const l=Jt[c];return l?{id:c,name:l.name,count:s?1/0:rr(i,c),durability:s?void 0:bn(i,c)?.durability,maxDurability:l.maxDurability}:null}const o=s?Object.keys(Jt).map(Number).filter(c=>Jt[c].block&&qa(c)===c||n.frontier&&po(c)).map(r).filter(c=>!!c):i.slots.map(c=>({id:c.id,name:Jt[c.id].name,count:c.count,durability:c.durability,maxDurability:Jt[c.id].maxDurability})),a=s?[]:Kf.filter(c=>(!c.legacy||n.generator===1)&&(!c.frontier||n.frontier)).map(c=>({id:c.id,name:c.name,itemId:c.output.id,ingredients:c.inputs.map(l=>Jt[l.id].name+" "+rr(i,l.id)+"/"+l.count).join(" ・ "),outputs:Jt[c.output.id].name+" ×"+c.output.count,craftable:jp(i,c,n),reason:gh(i,c,n),equipment:nd(c,n.generator)?"作業台":"手作り"}));return{items:o,bar:i.hotbar.map(r),recipes:a,mode:t,selected:e,frontier:n.frontier}}const xe=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Xc=i=>i==="creative"?"クリエイティブ":"探索",Mf={lock:{name:"マウス固定",label:"視点を固定してプレイ"},drag:{name:"ドラッグ操作",label:"ドラッグ操作でプレイ"},tablet:{name:"タブレットモード",label:"タブレットモードでプレイ"}},Tt=i=>document.getElementById(i),Ee=(i,t,e="")=>'<button type="button" class="'+e+'" data-action="'+i+'">'+t+"</button>",yy=()=>Ee("back",'<span aria-hidden="true">‹</span> 戻る',"back"),is=i=>'<header class="panel-head"><h1>'+i+"</h1>"+yy()+"</header>",My=i=>Qa.find(t=>t.id===i)?.name??"";function bf(i,t){const e=Qa.filter(({id:n})=>t===void 0?n!=="school":n!=="frontier").map(({id:n,name:s,detail:r,thumbnail:o})=>{const a=n==="school"&&t!=="tag";return'<label class="stage-card"'+(a?" hidden":"")+'><input type="radio" name="stage" value="'+n+'"'+(a?" disabled":n===i?" checked":"")+'><img src="'+xe(new URL(o,document.baseURI).href)+'" width="560" height="315" alt="" draggable="false"><span><b>'+s+"</b><small>"+(t?_y[n]??r:r)+"</small></span></label>"}).join("");return'<fieldset class="stage-picker"'+(t==="tag"?" data-school-choice":"")+'><legend>ステージ</legend><div class="stage-grid">'+e+"</div></fieldset>"}const qc=i=>Number.isFinite(i)?String(i):"∞",Sf=new Map,Ef={17:"石や鉱石を素早く掘り、潮晶を採取",18:"石や鉱石をさらに速く掘り、潮晶を採取",19:"原木・木材の採掘を短縮",20:"原木・木材をさらに速く採掘",27:"約3ブロック跳び上がる",28:"約6ブロック跳び上がる",29:"約10ブロック跳び上がる",30:"1ブロックずつ高さを変えてつなぐ"};function by(i){const t=Sf.get(i);if(t)return t;const e=document.createElement("canvas");e.width=e.height=32;const n=e.getContext("2d");if(!n)return"";const s=(a,c)=>{n.fillStyle=a,n.beginPath(),n.moveTo(c[0][0],c[0][1]);for(const[l,h]of c.slice(1))n.lineTo(l,h);n.closePath(),n.fill()},r={1:["#86bc59","#916742","#705637"],2:["#bf9165","#9b704c","#77563d"],3:["#b4bac1","#828e98","#646d79"],4:["#f1d9a0","#ccb17e","#b79565"],5:["#d1ad75","#926645","#684630"],6:["#71ac63","#538959","#386c47"],7:["#e6ba82","#bf8c53","#9d7044"],8:["#b4b7b4","#8e9392","#6f797a"],9:["#b9bfc5","#89939e","#647483"],10:["#d8f3f0","#8db8bf","#69a7ae"],11:["#a0aaa9","#7b8486","#69777a"],12:["#ffe3a2","#eeb756","#bf893c"],21:["#eac98f","#a97651","#755040"],22:["#e2ac58","#aa793c","#876137"],23:["#9fc6bd","#689a96","#536f79"],25:["#c2fff1","#6dc7c7","#5aafaf"],26:["#a1c8c1","#668c89","#4e7176"],27:["#66d6a9","#338775","#266259"],28:["#7fc9ee","#4e88b8","#325e96"],29:["#d897e5","#9a67ad","#765183"]};if(r[i]){const a=r[i];s(a[1],[[2,9],[16,16],[16,31],[2,24]]),s(a[2],[[16,16],[30,9],[30,24],[16,31]]),s(a[0],[[2,9],[16,2],[30,9],[16,16]]);const c=(l,h,u,f,d)=>{n.strokeStyle=l,n.lineWidth=1.2,n.beginPath(),n.moveTo(h,u),n.lineTo(f,d),n.stroke()};if(i>=27&&i<=29)for(let l=0;l<i-26;l++){const h=14+l*4;s("#fff4c8",[[6,h+3],[9,h],[12,h+3],[12,h+5],[9,h+3],[6,h+5]])}if((i===22||i===21)&&(c("#573b34",3,15,16,22),c("#543c34",16,22,29,15),n.fillStyle="#ffe2a0",n.fillRect(9,16,3,5)),[23,25,26].includes(i)&&s("#c7fff1",[[6,15],[9,14],[12,20],[9,23]]),i===1&&(s("#6b9e4c",[[2,9],[16,16],[16,19],[11,17],[10,19],[8,15],[6,16],[2,13]]),s("#598340",[[16,16],[30,9],[30,12],[26,15],[23,15],[21,18],[16,19]])),[7,9,12].includes(i)){for(const l of[14,19])c("#533f3970",2,l,16,l+7),c("#493c4266",16,l+7,30,l);i===9&&(c("#56646b",8,12,8,17),c("#53616c",12,19,12,24))}else if(i===5){for(const l of[5,9,13])c("#5e422f",l,10+(l-2)/2,l,23+(l-2)/2);s("#99784c",[[8,9],[16,5],[24,9],[16,13]]),s("#d2ab76",[[11,9],[16,7],[21,9],[16,11]])}else if(i===10)c("#e0ffff",4,13,9,22),c("#c3eeee",18,17,22,23);else{n.fillStyle=i===11?"#35434a":"#ffffff38";for(const[l,h]of[[5,13],[9,19],[12,16],[19,21],[25,15],[16,7]])n.fillRect(l,h,i===11?3:2,i===11?3:1)}}else if(i===30)s("#9d6642",[[3,12],[16,5],[16,24],[3,29]]),s("#c88946",[[3,12],[16,5],[29,12],[16,28],[3,29]]),s("#f5ca70",[[3,12],[16,5],[29,12],[16,28]]),s("#e5f2ca",[[5,12],[9,10],[19,25],[16,28]]),s("#e5f2ca",[[14,6],[16,5],[29,12],[27,15]]);else if(i===34)s("#45362c",[[7,15],[15,14],[13,26],[6,29],[4,26]]),s("#4b5b63",[[6,10],[28,10],[28,15],[17,15],[14,19],[6,18]]),s("#b9ced1",[[8,9],[29,9],[29,12],[8,12]]);else if(i===35||i===36)s("#bc834b",[[6,29],[2,25],[19,8],[23,12]]),s("#e45631",[[15,13],[16,6],[25,2],[23,8],[29,7],[25,15],[19,18]]),s("#ffd681",[[17,14],[20,8],[24,7],[23,13],[20,16]]);else if(i===37)s("#5c4428",[[4,24],[11,6],[16,7],[11,27],[7,29]]),s("#e1ad54",[[13,27],[20,7],[25,8],[21,28],[17,30]]);else if(i===38)s("#a4643a",[[6,5],[14,2],[22,7],[27,15],[23,25],[15,30],[8,28],[17,25],[22,16],[18,8]]),s("#e9d8b8",[[6,5],[8,28],[10,28],[8,5]]);else if(i===24)s("#438c9a",[[7,16],[17,2],[25,13],[17,30],[10,26]]),s("#a6fff0",[[7,16],[17,2],[15,18],[10,26]]),s("#74ddd4",[[15,18],[17,2],[23,13]]);else if(i===15)s("#25323d",[[4,17],[9,8],[20,5],[28,12],[25,23],[14,27],[6,24]]),s("#53626c",[[5,16],[11,9],[20,7],[18,14],[10,20]]),s("#36454d",[[12,23],[19,16],[25,14],[24,21],[15,25]]);else if(s("#754e34",[[5,27],[8,29],[25,8],[22,5]]),s("#ca965f",[[5,25],[7,27],[24,6],[22,4]]),i>=17){const a=i===18||i===20,c=a?"#c3ccd0":"#e5c195",l=a?"#869398":"#b78a59";i<=18?(s(l,[[11,4],[17,3],[26,10],[29,16],[27,17],[23,12],[16,7],[10,7]]),s(c,[[9,4],[16,2],[23,5],[27,10],[25,12],[21,8],[15,5],[9,6]])):(s(l,[[17,5],[23,6],[28,10],[26,17],[19,17],[15,12]]),s(c,[[15,4],[22,4],[27,8],[24,14],[19,15],[13,10]]))}const o=e.toDataURL();return Sf.set(i,o),o}function Dr(i){return'<img class="stamp" src="'+by(i)+'" alt="" draggable="false">'}class Sy{constructor(t){this.send=t;const e=new URL(location.href),n=e.pathname.indexOf("/webcraft777/");this.portal=n<0?"../index.html":e.pathname.slice(0,n+1)+"index.html",Tt("game").style.setProperty("--cover",'url("'+new URL("./art/panorama.webp",document.baseURI).href+'")'),Tt("game").addEventListener("click",s=>this.click(s)),this.panel.addEventListener("submit",s=>this.submit(s)),this.panel.addEventListener("change",s=>this.change(s)),this.panel.addEventListener("input",s=>this.settingOutput(s.target)),Tt("fallback").addEventListener("keydown",s=>{s.target.closest("[data-hold]")&&["Enter"," "].includes(s.key)&&(s.preventDefault(),this.startMining())}),Tt("fallback").addEventListener("keyup",()=>this.stopMining()),Tt("view-mode").addEventListener("keydown",s=>{s.code==="Space"&&s.stopPropagation()})}send;screen="title";panel=Tt("overlay");guideSeen=!1;guideTimer=0;inventoryState=null;noticeTimer=0;saveTimer=0;holding=!1;worldName="";kidsView=!1;room=null;onlineDraft={name:"みんなの建築ワールド",seed:"",nickname:"",code:"",mode:"creative",stage:"classic",tagMinutes:Wc,tagBots:0};portal;startMining(){this.holding||(this.holding=!0,this.send("mine-down"))}stopMining(){this.holding&&(this.holding=!1,this.send("mine-up"))}show(t,e,n=!1){this.stopMining(),window.clearTimeout(this.guideTimer);const s=["pause","ready","inventory","diagnostics","tag-result"].includes(t)||["settings","help"].includes(t)&&!Tt("game").classList.contains("home");["title","create","worlds","online","error"].includes(t)?Tt("game").classList.add("home"):s&&Tt("game").classList.remove("home"),this.screen=t,Tt("game").dataset.screen=t,this.panel.hidden=!1,this.panel.className="overlay "+(t==="title"?"title-overlay":"panel-overlay"),this.panel.innerHTML=t==="title"?e:'<div class="panel'+(n?" wide":"")+'">'+e+"</div>",Tt("hud").hidden=!0,Tt("debug").hidden=!0,this.mining(0),this.panel.scrollTop=0}click(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(n==="view-mode"&&e.id==="view-mode"&&t.detail>0&&Tt("scene").focus({preventScroll:!0}),n==="select"){this.send(n,Number(e.dataset.slot));return}const s=Number(e.dataset.index),r=e.dataset.side??"bag";if(n==="assign"){if(t.shiftKey&&(this.inventoryState?.mode==="explore"||this.inventoryState?.chest)){const o=this.inventoryState.chest!==void 0;this.send(o?"transfer":"split",{side:r,index:s,half:!1})}else this.send(n,{id:Number(e.dataset.id),slot:this.inventoryState?.selected??0});return}if(["split","sort","transfer","transfer-all"].includes(n)){this.send(n,{index:s,side:r,half:e.dataset.half==="yes"});return}if(n==="supply"){this.send(n,{id:Number(e.dataset.id),count:t.shiftKey?64:1});return}if(n==="craft"){this.send(n,{id:e.dataset.id,count:Number(e.dataset.count??1)});return}if(["load","export","original","preset"].includes(n)){this.send(n,e.dataset.id);return}if(n==="dismiss-guide"){Tt("guide").hidden=!0,this.guideSeen=!0,this.send(n);return}this.send(n)}submit(t){t.preventDefault();const e=t.target;if(e.id==="online-create-form"||e.id==="online-join-form"){const a=new FormData(e),c=String(a.get("nickname")??"").trim();if(this.onlineDraft.nickname=c,!c){this.toast("プレイヤー名を入力してください。"),e.querySelector("input")?.focus();return}if(e.id==="online-create-form"){const l=String(a.get("name")??"").trim(),h=String(a.get("seed")??"").trim(),u=a.get("mode"),f=u==="tag"||u==="explore"?u:"creative",d=a.get("stage"),g=ho(d)&&d!=="frontier"&&(d!=="school"||f==="tag")?d:"classic",v=Number(a.get("tagMinutes")),p=Gc.find(b=>b===v)??Wc,m=Number(a.get("tagBots")),_=ya(g)&&Number.isInteger(m)&&m>=0&&m<=4?m:0;if(Object.assign(this.onlineDraft,{name:l,seed:h,mode:f,stage:g,...f==="tag"?{tagMinutes:p,tagBots:_}:{}}),!l){this.toast("ワールド名を入力してください。"),e.querySelector('[name="name"]')?.focus();return}this.send("online-create",{name:l,seed:h,nickname:c,mode:f,stage:g,...f==="tag"?{tagMinutes:p,..._?{tagBots:_}:{}}:{}})}else{const l=String(a.get("code")??"").trim().toUpperCase();this.onlineDraft.code=l,this.send("online-join",{code:l,nickname:c})}return}if(e.id!=="world-form")return;const n=new FormData(e),s=String(n.get("name")??"").trim();if(!s){this.toast("ワールド名を入力してください。"),e.querySelector("input")?.focus();return}const r=n.get("stage"),o=Fh(r)?r:"classic";this.send("start",{name:s,seed:String(n.get("seed")??"").trim(),mode:!Ba(o)||n.get("mode")==="creative"?"creative":"explore",stage:o})}change(t){const e=t.target;if(e instanceof HTMLSelectElement&&e.id==="tag-minutes"){this.onlineDraft.tagMinutes=Gc.find(n=>n===Number(e.value))??Wc;return}if(e instanceof HTMLSelectElement&&e.id==="tag-bots"){this.onlineDraft.tagBots=Number(e.value);return}if(e instanceof HTMLInputElement){if(e.name==="stage"&&e.form?.id==="online-create-form"&&e.checked&&ho(e.value)){this.onlineDraft.stage=e.value,this.updateBotSelector();return}if(e.name==="mode"&&e.form?.id==="online-create-form"&&e.checked){const n=e.value==="tag",s=Tt("tag-minutes");this.onlineDraft.mode=n?"tag":e.value==="explore"?"explore":"creative",Tt("tag-time-option").hidden=s.disabled=!n;const r=e.form.querySelector(".stage-picker"),o=r.querySelector('[name="stage"][value="school"]');!n&&o.checked&&(r.querySelector('[name="stage"][value="classic"]').checked=!0,this.onlineDraft.stage="classic"),o.closest("label").hidden=o.disabled=!n,r.toggleAttribute("data-school-choice",n),this.updateBotSelector();return}if(e.name==="stage"&&e.form?.id==="world-form"&&e.checked){const n=e.form,s=!Ba(e.value),r=n.querySelector('[name="mode"][value="explore"]'),o=n.querySelector('[name="mode"][value="creative"]');s&&r.checked&&(o.checked=!0),r.disabled=s,n.querySelector("#stage-mode-hint").hidden=!s;return}if(e.id==="world-import"){const n=e.files?.[0];n&&this.send("import",n),e.value="";return}if(e.closest("#setting-form")){const n=new FormData(Tt("setting-form"));this.send("settings-change",{distance:Number(n.get("distance")),scale:Number(n.get("scale")),shadows:n.has("shadows"),sensitivity:Number(n.get("sensitivity")),volume:Number(n.get("volume")),muted:n.has("muted"),quality:n.get("quality"),vegetation:n.has("vegetation"),effects:n.has("effects"),invertY:n.has("invertY"),bob:n.has("bob"),sprintFov:n.has("sprintFov"),ambientVolume:Number(n.get("ambientVolume")),effectsVolume:Number(n.get("effectsVolume"))})}}}updateBotSelector(){const t=this.onlineDraft.mode!=="tag"||!ya(this.onlineDraft.stage);Tt("tag-bot-option").hidden=Tt("tag-bots").disabled=t}settingOutput(t){if(!(t instanceof HTMLInputElement)||t.type!=="range")return;const e=t.parentElement?.querySelector("output");e&&(e.textContent=this.valueLabel(t.name,Number(t.value)))}valueLabel(t,e){return t==="distance"?e+" チャンク":t==="sensitivity"?e.toFixed(1)+" 倍":Math.round(e*100)+"%"}setWorld(t){this.worldName=t}title(t){this.worldName="",this.onlineSession(null),this.tagMode(null);const e='<a class="portal" href="'+xe(this.portal)+'"><span aria-hidden="true">‹</span> TK777 ARCADE</a>';this.show("title",'<div class="title-stage">'+e+'<div class="title-main"><h1 aria-label="ウェブクラフト777"><span>ウェブクラフト</span><strong>777</strong></h1><div class="start-actions">'+Ee("goto-create",'<span>新しく始める</span><b aria-hidden="true">＋</b>',"primary")+Ee("goto-worlds",'<span>つづきから</span><b aria-hidden="true">›</b>')+Ee("online-menu","<span>マルチプレイ</span><small>最大6人</small>")+'</div><div class="title-sub">'+Ee("goto-settings","設定")+Ee("goto-help","操作説明")+"</div></div></div>"),this.panel.querySelector('[data-action="goto-worlds"]')?.setAttribute("title",t?"保存したワールドを開く":"ワールド一覧とバックアップの読み込み")}create(){this.show("create",is("ワールドを作る")+'<form id="world-form">'+bf("classic")+'<div class="stage-fields"><label class="entry">ワールド名<input name="name" value="はじまりの谷" required maxlength="64" autocomplete="off"></label><label class="entry">地形のシード<input name="seed" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label></div><fieldset><legend>ゲームモード</legend><div class="modes"><label><input type="radio" name="mode" value="explore" checked aria-describedby="stage-mode-hint"><span><b>探索</b><small>木や石を集め、道具と建材を作る。</small></span></label><label><input type="radio" name="mode" value="creative"><span><b>クリエイティブ</b><small>素材は無制限。空を飛んで建築する。</small></span></label></div><p id="stage-mode-hint" hidden>このステージではクリエイティブで遊べます。</p></fieldset><button type="submit" class="primary full">ワールドを作成</button></form>',!0)}onlineMenu(t="",e=""){t&&(this.onlineDraft.code=t.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8));const n=this.onlineDraft,s='<label class="entry">プレイヤー名<input name="nickname" value="'+xe(n.nickname)+'" placeholder="ワールド内に表示される名前" maxlength="24" required autocomplete="nickname"></label>',r=[["creative","建材を自由に使って建築する。"],["explore","素材を集めて道具や建材を作る。"],["tag","仲間と追いかけっこをする。"]].map(([u,f])=>'<label><input type="radio" name="mode" value="'+u+'"'+(n.mode===u?" checked":"")+"><span><b>"+(u==="tag"?"鬼ごっこ":Xc(u))+"</b><small>"+f+"</small></span></label>").join(""),o='<div id="tag-time-option" class="entry"'+(n.mode==="tag"?"":" hidden")+'><label for="tag-minutes">制限時間</label><select name="tagMinutes" id="tag-minutes" aria-describedby="tag-time-help"'+(n.mode==="tag"?"":" disabled")+">"+Gc.map(u=>'<option value="'+u+'"'+(n.tagMinutes===u?" selected":"")+">"+u+"分</option>").join("")+'</select><small id="tag-time-help">鬼が追いかけている間だけ時間が進みます。</small></div>',a=n.mode==="tag"&&ya(n.stage),c='<div id="tag-bot-option" class="entry"'+(a?"":" hidden")+'><label for="tag-bots">CPUの人数</label><select id="tag-bots" name="tagBots" aria-describedby="tag-bot-help"'+(a?"":" disabled")+">"+[0,1,2,3,4].map(u=>'<option value="'+u+'"'+(n.tagBots===u?" selected":"")+">"+u+"人</option>").join("")+'</select><small id="tag-bot-help">CPUを加えると、プレイヤー1人でも対戦を始められます。合計6人まで。</small></div>',l='<form id="online-create-form" class="online-card" aria-labelledby="online-create-label"><h2 id="online-create-label">ルームを作る</h2>'+s+'<label class="entry">ワールド名<input name="name" value="'+xe(n.name)+'" required maxlength="64" autocomplete="off"></label><label class="entry"><span>地形のシード <small>任意</small></span><input name="seed" value="'+xe(n.seed)+'" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label><fieldset class="online-room-modes"><legend>ゲームモード</legend><div class="modes">'+r+"</div></fieldset>"+bf(n.stage,n.mode)+o+c+'<button type="submit" class="primary full">ルームを作成</button></form>',h='<form id="online-join-form" class="online-card" aria-labelledby="online-join-label"><h2 id="online-join-label">ルームに参加する</h2>'+s+'<label class="entry">ルームコード<input id="online-code" name="code" value="'+xe(n.code)+'" placeholder="8文字の英数字" minlength="8" maxlength="8" pattern="[A-Za-z0-9]{8}" title="8文字の英数字" required autocapitalize="characters" autocorrect="off" autocomplete="off" spellcheck="false"></label><button type="submit" class="full">ルームに参加</button></form>';this.show("online",is("マルチプレイ")+'<p class="online-description">最大6人が同じワールドで遊べます。探索では持ち物を各自で管理し、掘った場所や設置した作業台は仲間と共有されます。</p>'+(e?'<p class="online-error" role="alert">'+xe(e)+"</p>":"")+'<div class="online-forms"'+(t?" data-invited":"")+">"+(t?h+l:l+h)+"</div>",!0)}onlineSession(t){this.room=t;const e=Tt("online-hud"),n=t?t.state==="connecting"?"接続中":t.state==="reconnecting"?"再接続中":t.count+" / 6人"+(t.tagBots?"（CPU "+t.tagBots+"）":""):"";e.hidden=!t,Tt("game").toggleAttribute("data-online",!!t);const s=Tt("online-hud-code");s.textContent!==(t?.code??"")&&(s.textContent=t?.code??"");const r=Tt("online-hud-status");r.textContent!==n&&(r.textContent=n);const o=My(t?.stage),a=Tt("online-hud-stage");a.hidden=!o,a.textContent!==o&&(a.textContent=o);const c=this.panel.querySelector("[data-online-status]");c&&c.textContent!==n&&(c.textContent=n);const l=this.panel.querySelector("[data-online-stage]");l&&(l.hidden=!o,l.textContent!==o&&(l.textContent=o))}tagMode(t){Tt("game").toggleAttribute("data-tag-play",!!t);const e=Tt("tag-status"),n=Tt("tag-map-toggle"),s=Tt("tag-map");e.hidden=n.hidden=!t,s.hidden=!t?.mapOpen,n.setAttribute("aria-pressed",String(!!t?.mapOpen)),e.toggleAttribute("data-it",!!t?.it);const r=Tt("tag-role"),o=Tt("tag-hint");r.textContent!==(t?.label??"")&&(r.textContent=t?.label??""),o.textContent!==(t?.hint??"")&&(o.textContent=t?.hint??"");const a=Tt("tag-clock"),c=Tt("tag-clock-value"),l=t?.remaining;if(a.hidden=l===void 0,a.toggleAttribute("data-urgent",l!==void 0&&l<=10),l!==void 0){const f=Math.floor(l/60)+":"+String(l%60).padStart(2,"0");c.textContent!==f&&(c.textContent=f,c.dateTime="PT"+l+"S")}const h=t?.hide,u=Tt("tag-hide");if(u.hidden=!h,u.toggleAttribute("data-it",!!h&&!!t?.it),h){const f=Tt("tag-hide-count"),d=Tt("tag-hide-title"),g=Tt("tag-hide-detail"),v=String(h.remaining);f.textContent!==v&&(f.textContent=v,f.dateTime="PT"+v+"S"),d.textContent!==h.title&&(d.textContent=h.title),g.textContent!==h.detail&&(g.textContent=h.detail)}}tagResult({outcome:t,loser:e,winners:n,minutes:s}){const r={win:"勝利",lose:"敗北",spectator:"試合終了"}[t],o={win:"時間切れまで逃げ切りました。",lose:"時間切れの時点であなたが鬼でした。",spectator:"制限時間に達しました。"}[t],a=n.length?'<ul id="tag-result-winners">'+n.map(c=>"<li>"+xe(c)+"</li>").join("")+"</ul>":"<span>なし</span>";this.show("tag-result",'<section class="tag-result" data-outcome="'+t+'" aria-labelledby="tag-result-title"><header><div><h1 id="tag-result-title" tabindex="-1">'+r+"</h1><p>"+o+'</p></div><div class="tag-result-time"><small>制限 '+s+'分</small><time datetime="PT0S">0:00</time></div></header><dl class="tag-result-players"><div><dt>負け・時間切れ時の鬼</dt><dd id="tag-result-loser">'+xe(e)+"</dd></div><div><dt>勝ち・逃げ切った人</dt><dd>"+a+"</dd></div></dl>"+Ee("online-leave","退出してタイトルへ","primary full")+"</section>"),Tt("tag-result-title").focus({preventScroll:!0})}worlds(t){const e=t.map(n=>{const s=new Date(n.updatedAt),r=Number.isFinite(s.getTime())?s.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",o=xe(n.id),a=Qa.find(l=>l.id===(n.stage??"classic"))?.name,c=n.hasOriginal?'<button data-action="original" data-id="'+o+'">旧版の原本</button>':"";return"<li><div><strong>"+xe(n.name)+"</strong><small>"+[Xc(n.mode),a,r].filter(Boolean).join("　")+'</small></div><div class="row-actions"><button class="primary" data-action="load" data-id="'+o+'">開く</button><button data-action="export" data-id="'+o+'">書き出す</button>'+c+"</div></li>"}).join("");this.show("worlds",is("ワールド一覧")+(t.length?'<ul class="worlds">'+e+"</ul>":'<p class="empty">このブラウザーには保存したワールドがありません。</p>')+'<div class="actions">'+Ee("goto-create","新しく始める")+'<label class="file-btn">ファイルを読み込む<input id="world-import" type="file" accept=".json,application/json"></label></div>')}async confirmImport(t){const e=Tt("confirm-import");return Tt("confirm-body").textContent="保存済みの「"+t+"」を、読み込むファイルの状態で置き換えます。",e.returnValue="cancel",new Promise(n=>{e.addEventListener("close",()=>n(e.returnValue==="replace"),{once:!0}),e.showModal()})}loading(t){this.show("loading",'<div class="loading-mark" aria-hidden="true"></div><h1>読み込み中</h1><p role="status">'+xe(t)+"</p>")}error(t){this.show("error",is("ゲームを開始できません")+'<p class="error-message">'+xe(t)+"</p>"+Ee("title","タイトルへ戻る","primary"))}pause(t=!1,e="lock",n=""){const s=this.room,o=t&&Tt("game").hasAttribute("data-tag-play")?s?.tagBots?"「プレイ開始」を押すとCPUも参加します。":"遊ぶ人がそろってから「プレイ開始」を押してください。":"",a=Object.entries(Mf).filter(([c])=>c!==e).map(([c,{label:l}])=>Ee("resume-"+c,l)).join("");this.show(t?"ready":"pause","<h1>"+(t?"ワールドの準備ができました":"一時停止")+"</h1>"+(n?'<p class="input-message" role="status">'+xe(n)+"</p>":"")+(s?'<div class="room-actions"><p>ルーム <strong>'+xe(s.code)+'</strong> <span data-online-status role="status"></span><small data-online-stage hidden></small></p>'+Ee("online-copy","招待リンクをコピー")+(o?"<p>"+o+"</p>":"")+"</div>":"")+'<div class="pause-actions">'+Ee("resume",t?"プレイ開始":"再開","primary")+'<p class="control-mode">操作方法　<strong>'+Mf[e].name+"</strong></p>"+a+'<button type="button" data-action="view-mode" aria-label="オリジナルモードとキッズモードの切り替え" aria-pressed="false"></button>'+(t?"":(s?"":Ee("save","手動保存")+Ee("export","ファイルへ書き出す"))+Ee("goto-settings","設定")+Ee("goto-help","操作説明")+Ee("diagnostics","入力の診断・復旧"))+(s?Ee("online-leave","退出してタイトルへ","danger"):Ee("title","タイトルへ戻る"))+"</div>"),this.showViewMode(this.kidsView),s&&this.onlineSession(s)}diagnostics(t,e){this.show("diagnostics",is("入力の診断・復旧")+'<p class="input-message">'+xe(t)+'</p><div class="pause-actions">'+Ee("reset-input","入力をリセット","primary")+Ee("export-diagnostics","診断をファイルに書き出す")+'</div><details class="input-trace"><summary>直近の入力記録</summary><pre>'+xe(e)+"</pre></details>")}play(t,e=!1,n=!1,s=!1){this.stopMining(),window.clearTimeout(this.guideTimer),this.screen="play",Tt("game").dataset.screen="play",Tt("game").dataset.playInput=n?"pending":t?"drag":"lock",Tt("game").classList.remove("home"),this.panel.hidden=!0,this.panel.replaceChildren(),Tt("hud").hidden=!1,Tt("fallback").hidden=!t;const r=Tt("guide");e&&(this.guideSeen=!1),r.hidden=!(e||t&&!this.guideSeen),r.innerHTML="<div><b>"+(s?"タッチ操作":t?"ドラッグ操作":"はじめの操作")+"</b>"+Ee("dismiss-guide","閉じる","guide-close")+"</div>"+(s?"<p>左下のスティックで移動し、景色をドラッグして見回します。</p><p>照準を合わせて画面をタップすると設置。「採掘」は長押しします。</p>":"<p><kbd>WASD</kbd> 移動　<kbd>Space</kbd> ジャンプ　<kbd>E</kbd> 持ち物</p><p>"+(t?"画面をドラッグして見回します。「採掘」は長押し、「設置」はクリック。":"左クリック長押しで採掘、右クリックで設置。")+"</p>"+(t?'<a href="'+xe(location.href)+'" target="_blank" rel="noopener">独立したタブで開く ↗</a>':"")),!t&&e&&(this.guideTimer=window.setTimeout(()=>{this.screen==="play"&&!r.hidden&&(r.hidden=!0,this.guideSeen=!0,this.send("dismiss-guide"))},1e4))}help(){this.show("help",is("操作説明")+'<dl class="keylist">'+[["W / A / S / D","移動"],["マウス / 矢印キー","視点を変える"],["K / 画面上のモードボタン","オリジナルモードと見下ろし視点のキッズモードを切り替える"],["Space / Shift","ジャンプ・水中で浮上 ／ ダッシュ"],["左クリック長押し","照準のブロックを採掘"],["右クリック","手に持っているブロックを設置"],["1 ～ 9 / ホイール","ホットバーを切り替える"],["C 長押し","しゃがむ。足場の端で踏みとどまり、低い坑道を通れる"],["Q / 中クリック","照準の建材を選ぶ"],["R / 向きボタン","原木や滑り台パーツの向きを切り替える"],["右クリック / V","住民と話す、または作業台・チェストを開く。しゃがんで右クリックすると設備の隣に設置"],["左クリック / X","照準を合わせたサメを攻撃。タッチ操作では画面の「攻撃」ボタン"],["Ctrl + Z","クリエイティブの通常ブロックを最大20回戻す。作業台とチェストは対象外"],["B / G","現在地を拠点に登録 ／ 探索目標の表示切り替え"],["E","持ち物・クラフトを開閉"],["Esc","一時停止"],["F","クリエイティブで飛行を切り替える"],["Space / Ctrl","飛行中に上昇 ／ 下降"],["F3","FPS・描画回数・チャンク数を表示"]].map(([t,e])=>"<div><dt>"+t+"</dt><dd>"+e+"</dd></div>").join("")+"</dl><h2>タブレットモード</h2><p>一時停止画面の「タブレットモードでプレイ」から、PCでも画面のスティックやボタンを使えます。左下のスティックで移動し、景色をドラッグして見回します。照準を合わせて画面を短くタップすると、選択中のブロックを設置できます。右下のボタンからも設置・採掘・ジャンプ・しゃがみができます。クリエイティブでは「飛行」で切り替え、上昇・下降ボタンを長押しします。</p><h2>ジャンプ台と滑り台</h2><p>ジャンプ台に乗ると、小・中・大の高さに合わせて跳び上がります。滑り台は、下りたい方向に坂のパーツを1ブロックずつ低くしてつなぎ、高い方から乗ります。</p><h2>探索のはじめ方</h2><p>木の幹に近づいて採掘し、持ち物を開いて原木から木材と棒を作ります。木のツルハシで石を掘り、石の道具や建材を作りましょう。持ち物のアイコンを選ぶと、選択中のホットバー枠に登録できます。</p><h2>西部の町</h2><p>案内に沿って作業場や建築区画に行けます。道具をホットバーで選び、左クリック、X、または画面の「使う」で使用します。探索でリボルバーを使うには弾、弓を使うには火矢が必要です。Vで町の人に話しかけたり、狙った炎を消したりできます。</p><h2>マルチプレイ</h2><p>ルームを作るときにステージと遊び方を選び、ルームコードを仲間に知らせます。探索では持ち物はプレイヤーごとに管理され、掘った場所や建物、設置した作業台は仲間と共有されます。</p><h2>鬼ごっこ</h2><p>最初と鬼が交代するたびに、20秒の隠れる時間が始まります。鬼はその場で待機し、逃げ役は移動できます。画面のカウントダウンが終わると追跡が始まり、制限時間の計測も進みます。時間切れのときに鬼だった人が負けです。</p><p>Mキーや画面上の「地図」で、地形とエリアごとの人数を確認できます。学校では、自分がいる階の地図を表示します。</p><h2>拠点と遠征</h2><p>木材4個で作業台、6個でチェストを作れます。床に置き、照準を合わせて右クリックで開きます。木の道具と灯晶ブロックを用意したら、拠点をBで登録して岩窟へ。潮晶を持ち帰ると、作業台で青緑色のランタンや象眼タイルを作れます。旧ワールドでは朝霧ガラスと石炭から潮晶を作れます。</p><h2>トラックパッドと視点操作</h2><p>Macでは、トラックパッドを押したまま指を動かすと見回せます。画面上の「採掘」「設置」を使います。クリックせずに見回したいときは、一時停止から「視点を固定してプレイ」を選んでください。</p><p>視点が動かなくなったら、Esc または「一時停止」から「入力の診断・復旧」を開きます。「入力をリセット」でドラッグ操作に戻れます。診断記録は端末に保存・書き出しできます。</p><h2>保存とバックアップ</h2><p>進行はこのブラウザーに自動保存されます。一時停止から手動保存もできます。ブラウザーのデータ削除前や別のPCに移すときは、タイトルの「つづきから」でワールドを「書き出す」を選びます。復元は同じ一覧の「ファイルを読み込む」から行えます。</p>")}showViewMode(t){this.kidsView=t;const e=t?"キッズモード":"オリジナルモード",n=Tt("view-mode");n.setAttribute("aria-pressed",String(t)),n.querySelector("span").textContent=e;const s=this.panel.querySelector('[data-action="view-mode"]');s&&(s.setAttribute("aria-pressed",String(t)),s.textContent="視点切替　現在は"+e)}expedition(t,e,n){const s=Tt("journey"),r=Tt("bearing");s.hidden=!t,s.textContent!==t&&(s.textContent=t);const o=[e,n].filter(Boolean).join("　·　");r.textContent!==o&&(r.textContent=o)}target(t){const e=Tt("target-hint");e.textContent!==t&&(e.textContent=t),e.hidden=!t||this.screen!=="play"}settings(t){const e=(s,r,o,a,c,l)=>'<label class="range"><span>'+r+"</span><output>"+this.valueLabel(s,o)+'</output><input type="range" name="'+s+'" min="'+a+'" max="'+c+'" step="'+l+'" value="'+o+'"></label>',n=(s,r,o)=>'<label class="check"><input type="checkbox" name="'+s+'" '+(o?"checked":"")+">"+r+"</label>";this.show("settings",is("設定")+'<form id="setting-form"><fieldset><legend>画面</legend><input type="hidden" name="quality" value="'+t.quality+'"><div class="quality-presets">'+Object.entries({low:"低",standard:"標準",high:"高"}).map(([s,r])=>'<button type="button" data-action="preset" data-id="'+s+'" aria-pressed="'+(t.quality===s)+'">'+r+"</button>").join("")+"</div>"+(t.quality==="legacy"?"<p>旧版の描画倍率を使用中です。プリセットを選ぶと新しい画質に切り替わります。</p>":"")+e("distance","描画距離",t.distance,2,6,1)+e("scale","解像度倍率",t.scale,.5,1.5,.05)+n("shadows","影を表示する",t.shadows)+"</fieldset><fieldset><legend>景色と動き</legend>"+n("vegetation","草花を表示する",t.vegetation)+n("effects","水面・葉の追加演出",t.effects)+n("bob","歩行時に視点を揺らす",t.bob)+n("sprintFov","ダッシュ時に視野を広げる",t.sprintFov)+"</fieldset><fieldset><legend>操作と音</legend>"+n("invertY","マウスの上下を反転する",t.invertY)+e("effectsVolume","効果音",t.effectsVolume,0,1,.05)+e("ambientVolume","環境音",t.ambientVolume,0,1,.05)+e("sensitivity","マウス感度",t.sensitivity,.3,2.5,.1)+e("volume","主音量",t.volume,0,1,.05)+n("muted","ミュート",t.muted)+"</fieldset></form>")}slots(t){return t.bar.map((e,n)=>'<button class="slot'+(t.selected===n?" selected":"")+'" data-action="select" data-slot="'+n+'" aria-pressed="'+(t.selected===n)+'" aria-label="'+(n+1)+"番 "+xe(e?.name??"空き")+'"><small>'+(n+1)+"</small>"+(e?Dr(e.id)+"<em>"+qc(e.count)+"</em>"+this.wear(e):"")+"</button>").join("")}wear(t){return t.durability!==void 0&&t.maxDurability?'<i class="wear" title="耐久 '+t.durability+" / "+t.maxDurability+'"><b style="width:'+Math.min(100,100*t.durability/t.maxDurability)+'%"></b></i>':""}hud(t){this.inventoryState=t;const e=t.bar[t.selected];Tt("hud-bar").innerHTML=this.slots(t);const n=Tt("game").hasAttribute("data-tag-play")?"鬼ごっこ":Xc(t.mode);Tt("mode-tag").textContent=(this.worldName?this.worldName+"　／　":"")+n,Tt("equipped").textContent=e?e.name+"　"+qc(e.count)+(e.durability!==void 0?"　耐久 "+e.durability+"/"+e.maxDurability:""):"素手"}inventory(t){const e=this.screen==="inventory",s=(e?this.panel.querySelector(".panel"):null)?.scrollTop??0,r=document.activeElement,o=e&&r?.dataset.action?Object.entries(r.dataset):null,a=!!this.panel.querySelector("details[open]");this.inventoryState=t;const c=p=>'<div class="storage-tools"><button data-action="sort" data-side="'+p+'">整理</button>'+(t.chest?'<button data-action="transfer-all" data-side="'+p+'">'+(p==="bag"?"すべて預ける":"すべて取り出す")+"</button>":"")+"</div>",l=(p,m)=>{const _=' data-index="'+p+'" data-side="'+m+'"';return'<div class="stack-actions">'+(t.chest?'<button data-action="transfer"'+_+">"+(m==="bag"?"預ける":"取る")+'</button><button data-action="transfer" data-half="yes"'+_+">半分</button>":'<button data-action="split"'+_+">分割</button>")+"</div>"},h=t.chest?"チェスト":t.benchUses!==void 0?"作業台":t.mode==="creative"?t.frontier?"建材と道具":"ブロック一覧":"持ち物とクラフト",u=t.chest?"<section><h2>チェスト　"+t.chest.length+" / 27 枠</h2>"+c("chest")+(t.chest.length?'<div class="bag-grid">'+t.chest.map((p,m)=>'<div class="stack"><span>'+Dr(p.id)+" "+xe(Jt[p.id].name)+" ×"+p.count+(p.durability?"　耐久 "+p.durability:"")+"</span>"+l(m,"chest")+"</div>").join("")+"</div>":'<p class="empty">まだ空です。所持品から預けられます。</p>')+"</section>":"",f=t.palette?'<details class="supply" '+(a?"open":"")+'><summary>建材を補充</summary><p>クリックで1個、Shift＋クリックで64個を所持品に加えます。</p><div class="bag-grid">'+t.palette.map(p=>'<button class="bag-item" data-action="supply" data-id="'+p.id+'">'+Dr(p.id)+xe(p.name)+"</button>").join("")+"</div></details>":"",d=t.items.map((p,m)=>'<div class="stack"><button class="bag-item" type="button" data-index="'+m+'" data-action="assign" data-id="'+p.id+'">'+Dr(p.id)+"<b>"+xe(p.name)+"</b><small>"+(p.durability!==void 0?"耐久 "+p.durability+"/"+p.maxDurability:"× "+qc(p.count))+"</small>"+(Ef[p.id]?"<small>"+Ef[p.id]+"</small>":"")+this.wear(p)+"</button>"+(t.mode==="explore"||t.chest?l(m,"bag"):"")+"</div>").join(""),g=t.recipes.map(p=>"<li>"+Dr(p.itemId)+"<div><strong>"+xe(p.outputs)+"</strong><small>"+xe(p.ingredients)+"</small><small>"+p.equipment+"　"+(p.reason||(p.craftable?"制作可能 "+p.craftable+" 回":"所持品に空きがありません。"))+'</small></div><div class="craft-actions"><button data-action="craft" data-id="'+p.id+'" '+(p.craftable<1?"disabled":"")+">作る</button>"+(p.craftable>1?'<button data-action="craft" data-id="'+p.id+'" data-count="'+p.craftable+'">まとめて ×'+p.craftable+"</button>":"")+"</div></li>").join("");this.show("inventory",'<header class="panel-head"><h1>'+h+"</h1>"+Ee("back","閉じる <kbd>E</kbd>","back")+'</header><div class="inventory-bar"><h2>ホットバー</h2><div class="hotbar">'+this.slots(t)+"</div><p>数字1〜9かクリックで枠を選び、アイコンを押すと登録。"+(t.mode==="explore"?" Shift＋クリックで"+(t.chest?"移動":"分割")+"。":"")+(t.benchUses!==void 0?"　この作業台で制作 "+t.benchUses+" 回":"")+"</p></div>"+f+'<div class="inventory-columns'+(t.mode==="creative"&&!t.chest?" palette":"")+'"><section><h2>'+(t.mode==="creative"&&!t.chest?t.frontier?"建材と道具":"建築ブロック":"所持品")+"</h2>"+(t.mode==="explore"||t.chest?c("bag"):"")+(d?'<div class="bag-grid">'+d+"</div>":'<p class="empty">'+(t.palette?"「建材を補充」を開くと、ここに素材を用意できます。":"まだ何も持っていません。木や土を採掘して集めましょう。")+"</p>")+"</section>"+(u||(t.mode==="creative"?"":'<section><h2>クラフト</h2><p class="ingredient-key">材料は所持数 / 必要数で表示します。</p><ul class="recipes">'+g+"</ul></section>"))+"</div>",!0);const v=this.panel.querySelector(".panel");v&&(v.scrollTop=s),o&&Array.from(this.panel.querySelectorAll("[data-action]")).find(p=>o.every(([m,_])=>p.dataset[m]===_))?.focus({preventScroll:!0})}mining(t){const e=Tt("mine-meter"),n=Math.round(Math.max(0,Math.min(1,Number.isFinite(t)?t:0))*100);e.hidden=n===0||this.screen!=="play",e.dataset.percent!==String(n)&&(e.dataset.percent=String(n),e.setAttribute("aria-valuenow",String(n)),e.style.setProperty("--progress",n+"%"))}debug(t){const e=Tt("debug");e.hidden=!t||this.screen!=="play",e.textContent!==t&&(e.textContent=t)}toast(t){const e=Tt("notice");e.textContent=t,e.hidden=!t,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{e.hidden=!0},2e3)}status(t){const e=Tt("save-status");e.textContent=t,e.hidden=!t,window.clearTimeout(this.saveTimer),!t.includes("中")&&!/失敗|できません/.test(t)&&(this.saveTimer=window.setTimeout(()=>{e.hidden=!0},3500))}}const Yc=192;class Ey{samples=[];cursor=0;nextLook=0;nextFrame=0;nextIssue=0;frames=0;moves=0;faults=0;lastIssue="";detailed=!1;enable(t){this.detailed=t}add(t,e,n,s={},r=!1){const o=performance.now();if(r&&(this.faults++,this.lastIssue=String(s.reason??e),e==="look-limited"||e==="discontinuity")){if(o<this.nextIssue)return;this.nextIssue=o+65}if(e==="look"){if(this.moves++,o<this.nextLook)return;this.nextLook=o+(this.detailed?12:65)}if(e==="frame"){if(this.frames++,o<this.nextFrame)return;this.nextFrame=o+(this.detailed?100:500)}this.samples[this.cursor]={timeMs:Math.round(o),mode:t,event:e,lock:n,...s},this.cursor=(this.cursor+1)%Yc}report(){const t=this.samples.length<Yc?this.samples.slice():[...this.samples.slice(this.cursor),...this.samples.slice(0,this.cursor)];return{game:"ウェブクラフト777",generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,viewport:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio||1,embedded:window.self!==window.top,capacity:Yc,frames:this.frames,lookEvents:this.moves,anomalies:this.faults,lastIssue:this.lastIssue,events:t}}}const jc=Math.PI*2;function Kc(i){const t=i%jc;return t>Math.PI?t-jc:t<-Math.PI?t+jc:t}function Zc(i){return Math.max(-1.55,Math.min(1.55,i))}function wf(i,t,e){return i==="lock"||i==="drag"||i==="tablet"?i:t==="lock"?"lock":t==="drag"?e.touch?"tablet":"drag":e.coarse?"tablet":e.mac?"drag":"lock"}const wy=new Set(["KeyW","KeyA","KeyS","KeyD","KeyC","Space","ShiftLeft","ShiftRight","ControlLeft","ControlRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),Tf=2*Math.PI/3,Af=9,Ty=360,Rf=()=>Math.max(1024,window.screen?.width||0,window.screen?.height||0,window.innerWidth||0,window.innerHeight||0);class Ay{constructor(t,e,n){if(this.canvas=t,this.controls=e,document.addEventListener("pointerlockchange",()=>this.reconcileLock()),document.addEventListener("pointerlockerror",()=>{this.hasRequestPromise||this.fallback("pointerlockerror")}),document.addEventListener("mousemove",s=>{if(this.mode==="locked"){if(!this.ownsLock()){this.reconcileLock();return}this.checkButtons(s),this.look(s.movementX,s.movementY)}}),t.addEventListener("contextmenu",s=>{this.active&&s.preventDefault()}),t.addEventListener("auxclick",s=>{this.active&&s.button===1&&s.preventDefault()}),t.addEventListener("pointerdown",s=>this.startView(s)),t.addEventListener("pointermove",s=>this.movePointer(s)),t.addEventListener("lostpointercapture",s=>this.release(s)),document.addEventListener("pointerdown",s=>{const r=s.target?.closest?.('[data-hold="mine"]');!this.drag||!r||r.disabled||s.button!==0||(s.pointerType!=="mouse"&&s.preventDefault(),this.grab(s,r,"mine")&&(this.mining=!0,this.controls.beginMine()))}),document.addEventListener("pointermove",s=>{s.target!==t&&this.movePointer(s)}),document.addEventListener("lostpointercapture",s=>this.release(s)),window.addEventListener("pointerup",s=>this.release(s)),window.addEventListener("pointercancel",s=>this.release(s)),window.addEventListener("mouseup",s=>{s.button===0&&this.dropMouseContact()}),t.addEventListener("wheel",s=>this.wheel(s),{passive:!1}),window.addEventListener("keydown",s=>this.keydown(s)),window.addEventListener("keyup",s=>this.keys.delete(s.code)),window.addEventListener("blur",()=>this.interrupt("blur")),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.interrupt("hidden"),this.controls.background())}),n){this.bindTouch(n.stick,"stick"),this.bindTouch(n.jump,"jump"),this.bindTouch(n.down,"down");const s=()=>{this.drag&&this.reset()};window.addEventListener("orientationchange",s),window.screen?.orientation?.addEventListener?.("change",s)}}canvas;controls;keys=new Set;mining=!1;mode="idle";get pending(){return this.mode==="pending"}get active(){return this.pending||this.mode==="locked"||this.mode==="drag"}get drag(){return this.mode==="drag"}contacts=new Map;stickForward=0;stickRight=0;ticket=0;hasRequestPromise=!1;jumpEdge=!1;touchJumpEdge=!1;wheelSum=0;lastWheel=-1/0;nextWheel=-1/0;yaw=0;pitch=0;sensitivity=1;trace=new Ey;ownsLock(){return document.pointerLockElement===this.canvas}record(t,e={},n=!1){this.trace.add(this.mode,t,this.ownsLock(),e,n)}setDiagnostics(t){this.trace.enable(t)}report(){return{...this.trace.report(),mode:this.mode,pointerLock:this.ownsLock(),sensitivity:this.sensitivity,yaw:this.yaw,pitch:this.pitch}}rememberView(t){Number.isFinite(t.yaw)&&Number.isFinite(t.pitch)&&(this.yaw=Kc(t.yaw),this.pitch=Zc(t.pitch)),t.yaw=this.yaw,t.pitch=this.pitch}restoreAngles(t){t.yaw=this.yaw,t.pitch=this.pitch}applyLook(t,e,n,s,r=!1){if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(s)||s<=0||!Number.isFinite(e)||!Number.isFinite(n)){this.restoreAngles(t),this.fail("視点または感度に無効な数値が届きました。");return}this.sensitivity=s;let o=.00235*s;const a=Math.hypot(e,n),c=a*o;this.mode==="locked"&&c>Tf&&a>Rf()&&(o*=Tf/c,this.record("look-limited",{dx:e,dy:n,reason:"単発の大きな視点移動を抑えました。"},!0));const l=Kc(t.yaw-e*o),h=Zc(t.pitch+(r?1:-1)*n*o);if(!Number.isFinite(l)||!Number.isFinite(h)){this.restoreAngles(t),this.fail("視点の計算を復旧しました。");return}t.yaw=this.yaw=l,t.pitch=this.pitch=h}frame(t,e){if(this.mode==="locked"&&!this.ownsLock())return this.reconcileLock(),!1;if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(e))return this.restoreAngles(t),this.fail("前回の正常な視点に戻しました。"),!1;if(!this.active)return!1;const n=Math.min(.1,Math.max(0,e));return t.yaw=this.yaw=Kc(t.yaw+(Number(this.keys.has("ArrowLeft"))-Number(this.keys.has("ArrowRight")))*n*1.65),t.pitch=this.pitch=Zc(t.pitch+(Number(this.keys.has("ArrowUp"))-Number(this.keys.has("ArrowDown")))*n*1.3),this.record("frame",{yaw:this.yaw,pitch:this.pitch,frameMs:Math.round(e*1e4)/10}),!0}fail(t){const e=typeof t=="string"?t:"ゲーム処理を中断しました。";this.record("recovery",{reason:e},!0),this.active&&this.controls.pause(),this.active&&this.stop(),this.controls.recovery?.("操作を中断しました。「再開」でドラッグ操作に切り替わります。")}look(t,e){if(!Number.isFinite(t)||!Number.isFinite(e)){this.fail("ブラウザーから無効な視点移動量が届きました。");return}if(!t&&!e)return;const n=Rf();if(Math.abs(t)>n*16||Math.abs(e)>n*16){this.record("discontinuity",{reason:"単一イベントの不連続な移動量を除外しました。"},!0);return}this.controls.look(t,e),this.record("look",{dx:t,dy:e,yaw:this.yaw,pitch:this.pitch})}change(t){this.reset(),this.mode=t,this.record("mode")}interrupt(t){this.record(t),this.active&&this.controls.pause(),this.active?this.stop():this.reset()}reconcileLock(){if(this.ownsLock()){if(this.mode==="locked")return;if(!this.pending){document.exitPointerLock();return}this.change("locked"),this.controls.dragChanged(!1)}else this.mode==="locked"&&(this.interrupt("lock-lost"),this.controls.recovery?.("マウス固定が解除されました。「再開」でドラッグ操作に切り替わります。"))}fallback(t){if(this.pending){if(this.ownsLock()){this.reconcileLock();return}this.change("drag"),this.record("fallback",{reason:t}),this.controls.dragChanged(!0)}}start(t){if(!t&&(this.pending||this.mode==="locked"&&this.ownsLock()))return;this.stop();const e=++this.ticket;if(this.hasRequestPromise=!1,this.change(t?"drag":"pending"),this.canvas.focus({preventScroll:!0}),t){this.controls.dragChanged(!0);return}if(!this.canvas.requestPointerLock){this.fallback("unsupported");return}try{const n=this.canvas.requestPointerLock();n&&typeof n.then=="function"&&(this.hasRequestPromise=!0,n.then(()=>{e===this.ticket&&this.ownsLock()&&this.reconcileLock()},()=>{e===this.ticket&&this.fallback("rejected")}))}catch{this.fallback("sync-error")}window.setTimeout(()=>{e===this.ticket&&this.fallback("timeout")},750)}stop(){this.ticket++,this.change("paused"),this.ownsLock()&&document.exitPointerLock()}reset(){this.keys.clear();for(const t of this.contacts.values())this.dropContact(t);this.mining=!1,this.jumpEdge=!1,this.touchJumpEdge=!1,this.wheelSum=0,this.nextWheel=this.lastWheel=-1/0}cancelPlacementTap(){const t=this.findRole("look");t&&(t.tapStartedAt=void 0)}startView(t){if(!this.active||this.pending)return;if(this.mode==="locked"&&!this.ownsLock()){this.reconcileLock();return}if(t.pointerType!=="mouse"&&t.preventDefault(),t.button===2){this.controls.place();return}if(t.button===1){this.controls.pick?.();return}if(t.button!==0)return;if(this.mode==="locked"){if(!this.grab(t,this.canvas,"mine",!1))return;this.mining=!0,this.controls.beginMine();return}const e=this.grab(t,this.canvas,"look");e&&t.pointerType==="touch"&&(e.tapStartedAt=t.timeStamp)}findRole(t){for(const e of this.contacts.values())if(e.role===t)return e}grab(t,e,n,s=!0){if(this.contacts.has(t.pointerId)||this.findRole(n))return;const r={id:t.pointerId,element:e,role:n,pointerType:t.pointerType||"mouse",x:t.clientX,y:t.clientY};this.contacts.set(t.pointerId,r);try{s&&e.setPointerCapture?.(t.pointerId)}catch{this.contacts.delete(t.pointerId);return}return r}bindTouch(t,e){t.addEventListener("contextmenu",n=>n.preventDefault()),e==="jump"&&t.addEventListener("click",n=>{this.drag&&n.detail===0&&(this.touchJumpEdge=!0)}),t.addEventListener("pointerdown",n=>{!this.drag||n.button!==0||!this.grab(n,t,e)||(n.preventDefault(),t.dataset.held="",e==="stick"&&this.updateStick(t,n.clientX,n.clientY),e==="jump"&&(this.touchJumpEdge=!0))})}updateStick(t,e,n){const s=t.getBoundingClientRect(),r=Math.min(s.width,s.height)*.29,o=e-(s.left+s.width/2),a=n-(s.top+s.height/2),c=Math.hypot(o,a);if(!(r>0)||!Number.isFinite(c))return;const l=Math.min(1,r/(c||1));t.style.setProperty("--stick-x",o*l+"px"),t.style.setProperty("--stick-y",a*l+"px");const h=Math.max(0,(Math.min(1,c/r)-.16)/.84)/(c||1);this.stickForward=-a*h||0,this.stickRight=o*h||0}dropMouseContact(){for(const t of this.contacts.values())t.pointerType==="mouse"&&this.dropContact(t)}checkButtons(t){Number.isInteger(t.buttons)&&!(t.buttons&1)&&this.dropMouseContact()}movePointer(t){const e=this.contacts.get(t.pointerId);if(!this.drag||!e)return;if(e.pointerType==="mouse"&&Number.isInteger(t.buttons)&&!(t.buttons&1)){this.dropContact(e);return}if(e.role==="stick"){this.updateStick(e.element,t.clientX,t.clientY);return}if(e.role!=="look")return;const n=t.clientX-e.x,s=t.clientY-e.y;if(e.tapStartedAt!==void 0){if(Math.hypot(n,s)<=Af)return;e.tapStartedAt=void 0}e.x=t.clientX,e.y=t.clientY,this.look(n,s)}dropContact(t){this.contacts.delete(t.id),t.role==="mine"&&(this.mining=!1),t.role==="stick"&&(this.stickForward=this.stickRight=0,t.element.style.removeProperty("--stick-x"),t.element.style.removeProperty("--stick-y")),(t.role==="stick"||t.role==="jump"||t.role==="down")&&delete t.element.dataset.held;try{t.element.hasPointerCapture?.(t.id)&&t.element.releasePointerCapture(t.id)}catch{}}release(t){const e=this.contacts.get(t.pointerId);if(!e||t.type==="lostpointercapture"&&t.target!==e.element&&e.element.isConnected!==!1||t.type==="pointerup"&&e.pointerType==="mouse"&&(Number.isInteger(t.buttons)?t.buttons&1:t.button>0))return;e.role==="jump"&&t.type!=="pointerup"&&(this.touchJumpEdge=!1);const n=t.timeStamp-(e.tapStartedAt??1/0),s=this.drag&&t.type==="pointerup"&&n>=0&&n<=Ty&&Math.hypot(t.clientX-e.x,t.clientY-e.y)<=Af&&document.elementFromPoint(t.clientX,t.clientY)===this.canvas;this.dropContact(e),s&&this.controls.place()}wheel(t){if(!this.active||(t.preventDefault(),this.pending||t.ctrlKey||t.metaKey))return;const e=t.deltaMode,n=t.deltaX,s=t.deltaY;if(!Number.isFinite(s)||!s||Math.abs(n)>Math.abs(s))return;const r=performance.now();(r-this.lastWheel>220||Math.sign(s)!==Math.sign(this.wheelSum))&&(this.wheelSum=0),this.lastWheel=r,!(r<this.nextWheel)&&(this.wheelSum+=s*(e===1?16:e===2?Math.max(window.innerHeight||0,100):1),!(Math.abs(this.wheelSum)<48)&&(this.controls.cycle(Math.sign(this.wheelSum)),this.wheelSum=0,this.nextWheel=r+120,this.record("wheel-step")))}keydown(t){if(!this.active||t.defaultPrevented)return;if(t.code==="KeyZ"&&(t.ctrlKey||t.metaKey)&&!t.altKey&&!t.shiftKey){t.preventDefault(),t.repeat||this.controls.undo?.();return}if(t.altKey||t.metaKey||t.ctrlKey&&!t.code.startsWith("Control")&&!this.keys.has("ControlLeft")&&!this.keys.has("ControlRight"))return;if(wy.has(t.code)){t.preventDefault(),!t.repeat&&!this.keys.has(t.code)&&t.code==="Space"&&(this.jumpEdge=!0),t.repeat||this.keys.add(t.code);return}const e=/^Digit([1-9])$/.exec(t.code);if(!(!["Escape","KeyE","KeyF","F3","KeyQ","KeyR","KeyB","KeyG","KeyV","KeyK","KeyX","KeyM"].includes(t.code)&&!e)&&(t.preventDefault(),!t.repeat))if(e)this.controls.select(Number(e[1])-1);else switch(t.code){case"Escape":this.controls.pause();break;case"KeyE":this.controls.inventory();break;case"KeyF":this.controls.fly();break;case"KeyQ":this.controls.pick?.();break;case"KeyR":this.controls.rotate?.();break;case"KeyB":this.controls.home?.();break;case"KeyG":this.controls.guide?.();break;case"KeyV":this.controls.interact?.();break;case"KeyK":this.controls.viewMode?.();break;case"KeyX":this.controls.attack?.();break;case"KeyM":this.controls.tagMap?.();break;default:this.controls.debug()}}movement(){const t=this.keys,e=this.jumpEdge||this.touchJumpEdge;this.jumpEdge=this.touchJumpEdge=!1;const n=Number(t.has("KeyW"))-Number(t.has("KeyS")),s=Number(t.has("KeyD"))-Number(t.has("KeyA")),r=!!(n||s);return{forward:r?n:this.stickForward,right:r?s:this.stickRight,jump:t.has("Space")||!!this.findRole("jump"),jumpPressed:e,sprint:t.has("ShiftLeft")||t.has("ShiftRight"),down:t.has("KeyC")||t.has("ControlLeft")||t.has("ControlRight")||!!this.findRole("down")}}}const $c=i=>Math.max(0,Math.min(1,i)),Ry=["meadow","forest","shore","cave"];function Cy(i,t){const e=Math.floor(t.x),n=Math.floor(t.y),s=Math.floor(t.z);if(t.inWater)return"shore";let r=0,o=0,a=0;for(const c of[-3,0,3])for(const l of[-3,0,3]){let h=!1,u=!1,f=!1;for(let d=1;d<=8;d++){const g=i.get(e+c,n+d,s+l);g===6&&(u=!0),[2,3,4,8,9,11,14,23].includes(g)&&(h=!0)}for(let d=-3;d<=1;d++)i.get(e+c,n+d,s+l)===13&&(f=!0);r+=Number(h),o+=Number(u),a+=Number(f)}return r>=5?"cave":a>=2?"shore":o>=2?"forest":"meadow"}const Pi={earth:{cut:960,pitch:85,width:1.05},stone:{cut:3200,pitch:181,width:.85},wood:{cut:1540,pitch:118,width:.95},sand:{cut:2400,pitch:72,width:1.3},foliage:{cut:3500,pitch:78,width:1.2},glass:{cut:5100,pitch:650,width:.74},water:{cut:1100,pitch:280,width:1.35}};function Py(i){return i===4?Pi.sand:i===6?Pi.foliage:i===13?Pi.water:[5,7,21,22].includes(i)?Pi.wood:[10,12,23,25,26].includes(i)?Pi.glass:[3,8,9,11,14].includes(i)?Pi.stone:Pi.earth}function Ly(i,t){const s=i.createBuffer(1,128e3,16e3),r=s.getChannelData(0);let o=0,a=0;for(let l=0;l<r.length;l++){const h=l/16e3,u=Math.random()*2-1;o+=.035*(u-o),a+=.16*(u-a);const f=h/8*Math.PI*2,d=.73+.19*Math.sin(f)+.08*Math.sin(f*3+.7);let g=o*d;if(t==="forest"){g+=a*d*.36;for(const v of[1.1,1.33,5.4]){const p=h-v;p>0&&p<.22&&(g+=.073*Math.sin(Math.PI*p/.22)**2*Math.sin(2*Math.PI*(1600*p+1050*p*p)))}}else if(t==="shore")g=o*.65+a*(.24+.3*(.5+.5*Math.sin(2*f))**3);else if(t==="cave"){g=o*.26+.022*Math.sin(f*448);for(const v of[1.7,4.8,5.08]){const p=h-v;p>0&&p<.34&&(g+=.06*Math.min(1,p*200)*Math.exp(-16*p)*Math.sin(2*Math.PI*(835*p-180*p*p)))}}r[l]=g}const c=160;for(let l=0;l<c;l++){const h=l/c,u=r.length-c+l;r[u]=r[u]*(1-h)+r[0]*h}return s}class Dy{ctx;master;effects;ambient;noise;vol=.45;muted=!1;effectsLevel=1;ambientLevel=.55;playing=!1;activeVoices=new Set;ambienceCache=new Map;layers=new Map;area="meadow";sampleIn=0;configure(t,e,n=1,s=.55){this.vol=$c(t),this.muted=e,this.effectsLevel=$c(n),this.ambientLevel=$c(s);const r=this.ctx?.currentTime??0;this.master?.gain.setTargetAtTime(e?0:this.vol*.52,r,.025),this.effects?.gain.setTargetAtTime(this.effectsLevel,r,.025),this.ambient?.gain.setTargetAtTime(this.playing?this.ambientLevel*.7:0,r,.07)}unlock(){try{if(!this.ctx){const t=this.ctx=new AudioContext;this.master=t.createGain(),this.master.connect(t.destination),this.effects=t.createGain(),this.effects.connect(this.master),this.ambient=t.createGain(),this.ambient.gain.value=0,this.ambient.connect(this.master),this.noise=t.createBuffer(1,Math.ceil(t.sampleRate*.4),t.sampleRate);const e=this.noise.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1;this.configure(this.vol,this.muted,this.effectsLevel,this.ambientLevel)}this.ctx.resume().catch(()=>{})}catch{}}setPlaying(t){if(this.playing=t,this.sampleIn=0,!t){for(const n of this.activeVoices)try{n.stop()}catch{}this.activeVoices.clear();const e=this.ctx?.currentTime??0;for(const{gain:n,source:s}of this.layers.values())n.gain.cancelScheduledValues(e),n.gain.setTargetAtTime(0,e,.015),s.onended=()=>{s.disconnect(),n.disconnect()},s.stop(e+.09);this.layers.clear()}this.ctx&&this.ambient&&this.ambient.gain.setTargetAtTime(t?this.ambientLevel*.7:0,this.ctx.currentTime,.045)}environment(t,e,n){if(!this.playing||this.muted||!this.vol||!this.ambientLevel||this.ctx?.state!=="running"||!this.ambient||(this.sampleIn-=n,this.sampleIn>0))return;this.sampleIn=.36,this.area=Cy(t,e);const s=this.ctx,r=s.currentTime;if(!this.layers.has(this.area)){const o=s.createBufferSource(),a=s.createGain();let c=this.ambienceCache.get(this.area);c||(c=Ly(s,this.area),this.ambienceCache.set(this.area,c)),o.buffer=c,o.loop=!0,a.gain.value=0,o.connect(a),a.connect(this.ambient),o.start(),this.layers.set(this.area,{source:o,gain:a})}for(const o of Ry)this.layers.get(o)?.gain.gain.setTargetAtTime(o===this.area?1:0,r,.32)}track(t,e){this.activeVoices.add(t),t.onended=()=>{this.activeVoices.delete(t),t.disconnect();for(const n of e)n.disconnect()}}sound(t,e=1){const n=this.ctx,s=this.effects;if(!n||!s||this.muted||!this.vol||!this.effectsLevel||n.state!=="running"||!this.playing&&t!=="craft")return;const r=t==="craft"?3:2;if(this.activeVoices.size+r>12)return;const o=.935+.13*Math.random(),a=(g,v,p,m,_,b=.81)=>{const y=n.createOscillator(),w=n.createGain(),T=n.currentTime+v;y.type=_,y.frequency.setValueAtTime(g,T),y.frequency.exponentialRampToValueAtTime(g*b,T+p),w.gain.setValueAtTime(1e-4,T),w.gain.linearRampToValueAtTime(m,T+.006),w.gain.exponentialRampToValueAtTime(1e-4,T+p),y.connect(w),w.connect(s),this.track(y,[w]),y.start(T),y.stop(T+p+.01)};if(t==="craft"){[440,554.37,740].forEach((g,v)=>a(g,v*.055,.15,.19,"sine",1));return}if(t==="pickup"){a(590,0,.09,.105,"sine",1.45);return}if(t==="break"){a(243*o,0,.13,.27,"triangle"),a(137,.08,.17,.23,"triangle");return}const c=Py(e),l=(t==="step"?.095:t==="tap"?.075:t==="mine"?.17:.105)*c.width,h=n.createBufferSource(),u=n.createGain(),f=n.createBiquadFilter(),d=n.currentTime;h.buffer=this.noise,h.playbackRate.value=o,f.type="lowpass",f.frequency.value=c.cut*o,u.gain.setValueAtTime(1e-4,d),u.gain.linearRampToValueAtTime(t==="step"||t==="tap"?.15:.3,d+.004),u.gain.exponentialRampToValueAtTime(1e-4,d+l),h.connect(f),f.connect(u),u.connect(s),this.track(h,[f,u]),h.start(d,.06*Math.random()),h.stop(d+l),a(c.pitch*o*(t==="place"?1.17:1),0,l,t==="step"?.13:.21,c===Pi.glass?"sine":"triangle")}}const Ma=180,hp=96,Cf=new Set([5,6,7]),na=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],Jc=.2,Iy=i=>i===6?3.4:4.8;function sh(i){return{x:i%St,y:i>>>16,z:(i>>>8)%St}}function Uy(i){if(!Array.isArray(i)||i.length>hp)return!1;const t=new Set;for(const e of i){if(!e||!Number.isInteger(e.key)||e.key<St*St||e.key>=St*St*We||t.has(e.key)||!Number.isInteger(e.material)||e.material<1||e.material>33||e.material===13||!Number.isFinite(e.age)||e.age<0||e.age>=5||typeof e.spread!="boolean")return!1;t.add(e.key)}return!0}class Ny{constructor(t){this.world=t}world;flames=new Map;pending=0;spreadLeft=Ma;get count(){return this.flames.size}get budget(){return this.spreadLeft}records(){return this.flames.values()}has(t,e,n){return this.flames.has(we(t,e,n))}ignite(t,e,n,s=!0){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(n)||e<1||!Li(t,e,n))return!1;const r=we(t,e,n),o=this.world.get(t,e,n);return this.flames.has(r)||this.flames.size>=hp||!o||o===13||!s&&!Cf.has(o)?!1:(this.flames.size||(this.spreadLeft=Ma),this.flames.set(r,{key:r,material:o,age:0,spread:!1}),!0)}extinguish(t,e,n){return this.flames.delete(we(t,e,n))}step(t){if(!(!Number.isFinite(t)||t<=0))for(this.pending+=Math.min(t,.25);this.pending>=Jc;){this.pending-=Jc;const e=[...this.flames.values()];let n=Math.min(this.spreadLeft,9);for(const s of e){const{x:r,y:o,z:a}=sh(s.key);if(this.world.get(r,o,a)!==s.material){this.flames.delete(s.key);continue}s.age+=Jc;const c=Cf.has(s.material);if(c&&!s.spread&&s.age>=1.2&&n>0){s.spread=!0;const l=((s.key^this.world.salt)>>>0)%na.length;for(let h=0;h<na.length&&n>0;h++){const[u,f,d]=na[(l+h)%na.length];this.ignite(r+u,o+f,a+d,!1)&&(n--,this.spreadLeft--)}}s.age>=(c?Iy(s.material):2.2)&&(this.flames.delete(s.key),c&&this.world.set(r,o,a,0))}}}save(){return Array.from(this.flames.values(),t=>({...t}))}restore(t,e=Ma){this.pending=0,this.spreadLeft=e,this.flames.clear();for(const n of t){const{x:s,y:r,z:o}=sh(n.key);this.world.get(s,r,o)===n.material&&this.flames.set(n.key,{...n})}}}const xn=-1,di=3354679,Qc=13738623,Zs=4863539,Pf=16043109,ia=[[0,1.06,0,.42,.49,.26,xn],[0,.79,0,.42,.12,.25,di],[-.255,1.09,0,.1,.4,.16,xn],[.255,1.09,0,.1,.4,.16,xn],[-.258,.885,-.015,.1,.108,.14,Qc],[.258,.885,-.015,.1,.108,.14,Qc],[0,1.43,0,.3,.31,.29,Qc],[0,1.49,.13,.29,.19,.074,5783607],[-.068,1.463,-.148,.039,.043,.021,di],[.068,1.463,-.148,.039,.043,.021,di],[0,1.61,0,.51,.045,.44,5782576],[0,1.69,.01,.28,.15,.26,7358514],[0,1.638,-.01,.29,.034,.275,11636818],[0,1.294,-.138,.27,.08,.041,14534038],[-.113,.45,0,.168,.62,.18,5982788,-1],[.113,.45,0,.168,.62,.18,5982788,1],[-.113,.094,-.04,.182,.16,.24,Zs,-1],[.113,.094,-.04,.182,.16,.24,Zs,1]],Fy=[[0,.94,.02,.62,.52,1.26,xn],[0,.747,.09,.53,.21,.88,8870202],[0,1.21,-.42,.38,.57,.48,xn],[0,1.51,-.61,.33,.29,.46,xn],[0,1.444,-.854,.31,.175,.13,12488292],[0,1.367,-.839,.26,.092,.18,9658436],[-.138,1.68,-.495,.089,.18,.093,xn],[.138,1.68,-.495,.089,.18,.093,xn],[-.167,1.541,-.73,.033,.068,.061,di],[.167,1.541,-.73,.033,.068,.061,di],[0,1.55,-.451,.09,.25,.23,di],[0,1.33,-.252,.09,.27,.22,di],[0,.755,.669,.12,.42,.11,di],[-.228,.41,-.425,.12,.67,.147,xn,-1],[.228,.41,-.425,.12,.67,.147,xn,1],[-.228,.41,.42,.12,.67,.147,xn,1],[.228,.41,.42,.12,.67,.147,xn,-1],[-.228,.075,-.425,.145,.15,.157,Zs,-1],[.228,.075,-.425,.145,.15,.157,Zs,1],[-.228,.075,.42,.145,.15,.157,Zs,1],[.228,.075,.42,.145,.15,.157,Zs,-1]],tl={sheriff:[[.126,1.18,-.137,.083,.029,.024,Pf],[.126,1.18,-.139,.029,.087,.03,Pf],[0,1.618,0,.518,.055,.449,3228266],[0,1.697,.01,.294,.155,.268,4216703]],bandit:[[0,1.322,-.156,.309,.129,.06,11750471],[0,1.664,.015,.26,.18,.247,di]],gang:[[0,1.36,-.161,.31,.104,.052,9458350],[0,1.625,0,.514,.048,.45,4731212],[0,1.697,.01,.294,.155,.268,6438761]]},ky={horse:Fy,resident:ia,sheriff:[...ia,...tl.sheriff],bandit:[...ia,...tl.bandit],gang:[...ia,...tl.gang]},zy=[[0,1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,-1,0]],Oy=[16758362,16771226,16018486];class By{constructor(t,e){this.scene=t,this.world=e;const n=this.geometry.getAttribute("normal"),s=[];for(let r=0;r<n.count;r++){const o=.76+n.getY(r)*.2+n.getX(r)*.067+n.getZ(r)*.035;s.push(o,o,o)}this.geometry.setAttribute("color",new ye(s,3)),this.mesh.instanceMatrix.setUsage(Cd),this.mesh.frustumCulled=!1,this.mesh.count=0,this.mesh.name="西部の町の住民・馬・火",this.scene.add(this.mesh)}scene;world;geometry=new Sn;material=new Wi({vertexColors:!0});mesh=new ao(this.geometry,this.material,1152);root=new Pe;local=new Pe;matrix=new ge;color=new qt;direction=new U;up=new U(0,1,0);cursor=0;put(t,e,n=1){this.mesh.setMatrixAt(this.cursor,t.matrix),this.mesh.setColorAt(this.cursor++,this.color.setHex(e).multiplyScalar(n))}figure(t,e){const n=t.moving?Math.sin(t.stride):0;this.root.position.set(t.x,t.y+Math.abs(n)*.035,t.z),this.root.rotation.set(0,t.yaw,0),this.root.updateMatrix();for(const[s,r,o,a,c,l,h,u]of ky[t.kind])this.local.position.set(s,r,o+(u??0)*n*.14),this.local.rotation.set((u??0)*n*.35,0,0),this.local.scale.set(a,c,l),this.local.updateMatrix(),this.matrix.multiplyMatrices(this.root.matrix,this.local.matrix),this.mesh.setMatrixAt(this.cursor,this.matrix),this.mesh.setColorAt(this.cursor++,this.color.setHex(h===xn?t.color:h).multiplyScalar(e))}fireOrigin(t,e,n,s){let r={x:t+.5,y:e+1,z:n+.5},o=1/0;for(const[a,c,l]of zy){if(Zn(this.world.get(t+a,e+c,n+l)))continue;const h={x:t+.5+a*.59,y:e+.55+c*.49,z:n+.5+l*.59},u=Math.hypot(h.x-s.x,h.y-s.y,h.z-s.z)-(c===1?.18:0);u<o&&(o=u,r=h)}return r}update(t,e,n,s,r,o){this.cursor=0;const a=.65+.35*Math.max(0,Math.sin((o-.25)*Math.PI*2));for(const c of t)Math.hypot(c.x-s.x,c.y-s.y,c.z-s.z)<60&&this.figure(c,a);for(const c of e){const{x:l,y:h,z:u}=sh(c.key);if(Math.hypot(l-s.x,h-s.y,u-s.z)>64)continue;const f=this.fireOrigin(l,h,u,s),d=Math.sin(r*13+c.key)*.1;this.local.rotation.set(0,r*.8+c.key,0);for(let v=0;v<3;v++)this.local.position.set(f.x+(v-1)*.21,f.y+v%2*.2+d,f.z),this.local.scale.set(.35+v*.08,.6+d*2-v*.055,.29+v*.09),this.local.updateMatrix(),this.put(this.local,Oy[v]);const g=(r*1.5+c.key)%1;this.local.position.set(f.x-.06+g*.32,f.y+.57+g*.7,f.z-.02),this.local.scale.setScalar(.21+g*.22),this.local.updateMatrix(),this.put(this.local,6509645)}for(const c of n){this.direction.set(c.to.x-c.from.x,c.to.y-c.from.y,c.to.z-c.from.z);const l=this.direction.length();l<.05||(this.local.position.set((c.from.x+c.to.x)/2,(c.from.y+c.to.y)/2,(c.from.z+c.to.z)/2),this.local.quaternion.setFromUnitVectors(this.up,this.direction.multiplyScalar(1/l)),this.local.scale.set(.032,l,.032),this.local.updateMatrix(),this.put(this.local,c.color))}this.mesh.count=this.cursor,this.mesh.visible=this.cursor>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.mesh),this.mesh.dispose(),this.geometry.dispose(),this.material.dispose()}}const Ha=i=>({x:Math.floor(i.x)+.5,y:Math.round(i.y),z:Math.floor(i.z)+.5}),Ne=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Ws=1e-5,ba=i=>Math.floor(i.x)+St*(Math.floor(i.z)+St*Math.round(i.y)),Hy=[[1,0],[0,1],[-1,0],[0,-1]];function Ve(i,t,e,n=!1){const s=Math.floor(t.x-e.radius+Ws),r=Math.floor(t.x+e.radius-Ws),o=Math.floor(t.z-e.radius+Ws),a=Math.floor(t.z+e.radius-Ws),c=Math.floor(t.y+Ws),l=Math.floor(t.y+e.height-Ws);if(s<0||o<0||c<1||r>=St||a>=St||l>=We)return!1;for(let h=c;h<=l;h++)for(let u=o;u<=a;u++)for(let f=s;f<=r;f++){const d=i.get(f,h,u);if(Zn(d)||n&&d===13)return!1}return!0}function ys(i,t,e){return Math.abs(t.y-Math.round(t.y))<.002&&!Ve(i,{...t,y:t.y-.003},e)}function up(i,t,e){const n=[];for(const[s,r]of Hy){const o={x:t.x+s,y:t.y,z:t.z+r};for(const a of[0,1,-1])if(o.y=t.y+a,!(!Ve(i,o,e,!0)||!ys(i,o,e))&&!(a===1&&!Ve(i,{...t,y:o.y},e,!0))&&!(a===-1&&!Ve(i,{...o,y:t.y},e,!0))){n.push({...o});break}}return n}function fp(i,t,e,n,s,r){const o=Ha(t),a=Ha(e);if(!Ve(i,o,n,!0)||!ys(i,o,n))return[];const c=g=>Math.abs(g.x-a.x)+Math.abs(g.z-a.z)+.6*Math.abs(g.y-a.y),l={p:o,g:0,h:c(o),parent:null},h=[l],u=new Map([[ba(o),0]]);let f=l;for(let g=0;h.length&&g<96&&!(performance.now()>=s);g++){let v=0;for(let m=1;m<h.length;m++){const _=h[m],b=h[v];(_.g+_.h<b.g+b.h||_.g+_.h===b.g+b.h&&_.h<b.h)&&(v=m)}const[p]=h.splice(v,1);if(p.g===u.get(ba(p.p))){if(p.h<f.h&&(f=p),p.h<.01)break;for(const m of up(i,p.p,n)){if(Math.abs(m.x-o.x)>14||Math.abs(m.z-o.z)>14)continue;const _=ba(m),b=p.g+1+.25*Math.abs(m.y-p.p.y);r?.has(_)||b>=(u.get(_)??1/0)||(u.set(_,b),h.push({p:m,g:b,h:c(m),parent:p}))}}}const d=[];for(let g=f;g?.parent;g=g.parent)d.push(g.p);return d.reverse()}const qs={resident:{radius:.33,height:1.8},sheriff:{radius:.33,height:1.8},horse:{radius:.475,height:1.85},bandit:{radius:.33,height:1.8},gang:{radius:.33,height:1.8}},el={resident:"町の住民",sheriff:"保安官",horse:"馬",bandit:"盗賊",gang:"ギャング"},Lf=[10643783,14728851],Vy=["エイダ","ルイス","ノラ"],Df=[5537137,11299396,10847574],qr={bandit:{color:10899525,health:42,pace:2.55},gang:{color:7623801,health:56,pace:2.27}},Sa=100,Gy=16,Ea=58,If=i=>i.kind==="horse"?1.22:i.kind==="sheriff"?2.65:An(i)?qr[i.kind].pace:1.32,An=i=>i.kind==="bandit"||i.kind==="gang",Uf=[[1,0],[-1,0],[0,1],[0,-1]],vn=(i,t)=>Math.hypot(i.x-t.x,i.y-t.y,i.z-t.z),sa=i=>({x:i.x+.5,y:i.y+.5,z:i.z+.5});function Wy(i){return typeof i.x=="number"&&Number.isFinite(i.x)&&i.x>=1&&i.x<St-1&&typeof i.y=="number"&&Number.isFinite(i.y)&&i.y>=1&&i.y<We-2&&typeof i.z=="number"&&Number.isFinite(i.z)&&i.z>=1&&i.z<St-1}function dp(i){if(!i||typeof i!="object")return!1;const t=i;return Number.isInteger(t.health)&&t.health>=0&&t.health<=Sa&&Number.isInteger(t.fireBudget)&&t.fireBudget>=0&&t.fireBudget<=Ma&&typeof t.raidIn=="number"&&Number.isFinite(t.raidIn)&&t.raidIn>=0&&t.raidIn<=Ea&&Array.isArray(t.raiders)&&t.raiders.length<=4&&t.raiders.every(e=>e&&(e.kind==="bandit"||e.kind==="gang")&&Wy(e)&&Number.isFinite(e.yaw)&&Math.abs(e.yaw)<=Math.PI*2&&Number.isInteger(e.hp)&&e.hp>0&&e.hp<=qr[e.kind].health)&&Uy(t.fires)}function rh(i){const t=Math.cos(i.pitch);return{x:-Math.sin(i.yaw)*t,y:Math.sin(i.pitch),z:-Math.cos(i.yaw)*t}}const ra=i=>({x:i.x,y:i.y+Ms(i),z:i.z}),Yn=i=>({x:i.x,y:i.y+1.36,z:i.z}),pp=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function Xy(i,t,e){const n=rh(t);for(let s=0;s<e;s+=4.9){const r={...t,...pp(t,n,s)},o=Gn(i,r,Math.min(5,e-s));if(o)return{...o,distance:o.distance+s}}return null}function qy(i,t,e,n){const{radius:s,height:r}=qs[e.kind];let o=0,a=n;for(const c of["x","y","z"]){const l=e[c]-(c==="y"?0:s),h=e[c]+(c==="y"?r:s),u=t[c];if(Math.abs(u)<1e-9){if(i[c]<l||i[c]>h)return 1/0}else{const f=(l-i[c])/u,d=(h-i[c])/u;if(o=Math.max(o,Math.min(f,d)),a=Math.min(a,Math.max(f,d)),a<o)return 1/0}}return o}function Ir(i,t,e,n=!1){const s=Math.max(1,Math.ceil(vn(t,e)*5)),r=Math.floor(e.x),o=Math.floor(e.y),a=Math.floor(e.z);for(let c=1;c<=s;c++){const l=c/s,h=Math.floor(t.x+(e.x-t.x)*l),u=Math.floor(t.y+(e.y-t.y)*l),f=Math.floor(t.z+(e.z-t.z)*l);if(n&&h===r&&u===o&&f===a)return!0;if(Zn(i.get(h,u,f)))return!1}return!0}function Nf(i,t,e,n=2){for(let s=0;s<=n;s++)for(let r=-s;r<=s;r++)for(let o=-s;o<=s;o++){if(Math.max(Math.abs(o),Math.abs(r))!==s)continue;const a=Ha({x:t.x+o,y:t.y,z:t.z+r});for(const c of[0,1,-1,2,-2]){const l={...a,y:a.y+c};if(Ve(i,l,e,!0)&&ys(i,l,e))return l}}return null}class Yy{constructor(t,e){this.world=t,this.fire=new Ny(t),this.view=new By(e,t);for(const n of t.frontierStructures){const s=we(n.x,n.y,n.z);this.town.set(s,n),t.get(n.x,n.y,n.z)===0&&this.damage.add(s),(n.id===5||n.id===7)&&n.y>=33&&n.y<=34&&Uf.some(([r,o])=>t.get(n.x+r,n.y,n.z+o)===0)&&this.raidTargets.push(n)}this.add("sheriff","保安官クレイ",4747162,Eo.sheriff);for(const[n,s]of Eo.residents.entries())this.add("resident",Vy[n]??"町の住民",Df[n]??Df[0],s);for(const[n,s]of Eo.horses.entries())this.add("horse",n===0?"栗毛の馬":"白たてがみの馬",Lf[n]??Lf[0],s);this.unsubscribe=t.onEdit((n,s,r)=>{const o=we(n,s,r);this.town.has(o)&&(t.get(n,s,r)===0?this.damage.add(o):this.damage.delete(o));for(const a of this.actors)a.path.some(c=>Math.abs(c.x-(n+.5))<1.25&&Math.abs(c.z-(r+.5))<1.25&&Math.abs(c.y-s)<2.1)&&(a.path=[],a.ready=0)})}world;health=Sa;fire;view;town=new Map;damage=new Set;raidTargets=[];actors=[];trails=[];events=[];unsubscribe;clock=0;raidAt=Gy;warned=!1;round=0;nextPlan=0;cursor=0;damageReady=0;actionReady=0;townFire=!1;add(t,e,n,s,r){const o=qs[t],a=Nf(this.world,r??s,o,4);if(!a)return;const c={...a,kind:t,name:e,color:n,home:{...s},yaw:r?.yaw??Math.PI*.96,moving:!1,stride:0,hp:r?.hp??(t==="bandit"||t==="gang"?qr[t].health:Sa),path:[],goal:null,ready:this.clock+.12+this.actors.length*.085,work:this.clock+.7,vy:0};this.actors.push(c)}inform(t){this.events.length<5&&this.events.push(t)}consumeEvent(){return this.events.shift()}restoreHealth(){this.health=Sa,this.damageReady=this.clock+2.5,this.events.length=0}save(){return{health:this.health,raidIn:Math.min(Ea,Math.max(0,this.raidAt-this.clock)),fires:this.fire.save(),fireBudget:this.fire.budget,raiders:this.actors.filter(An).map(({kind:t,x:e,y:n,z:s,yaw:r,hp:o})=>({kind:t,x:e,y:n,z:s,yaw:r,hp:o}))}}restore(t){if(dp(t)){for(let e=this.actors.length-1;e>=0;e--)An(this.actors[e])&&this.actors.splice(e,1);this.health=t.health,this.raidAt=this.clock+t.raidIn,this.warned=t.raidIn<=5,this.fire.restore(t.fires,t.fireBudget);for(const e of t.raiders)this.add(e.kind,el[e.kind],qr[e.kind].color,e,e)}}aimedActor(t,e,n){const s=ra(t),r=rh(t);let o,a=Math.min(e,n);for(const c of this.actors){const l=qy(s,r,c,a);l>=a||(a=l,o=c)}return o?{actor:o,distance:a}:null}targetLabel(t){const e=Gn(this.world,t);if(e&&this.fire.has(e.x,e.y,e.z))return"燃えているブロック　操作で消火";const n=this.aimedActor(t,5,e?.distance??1/0)?.actor;return n?n.name+(n.kind==="resident"?"（修理）":""):null}interact(t){const e=Gn(this.world,t);if(e&&this.fire.extinguish(e.x,e.y,e.z))return"火を消しました。";const n=this.aimedActor(t,5,e?.distance??1/0)?.actor;if(!n)return null;if(An(n))return"町を襲う"+el[n.kind]+"です。";switch(n.yaw=Math.atan2(n.x-t.x,n.z-t.z),n.kind){case"sheriff":return"クレイ「襲撃には私も応戦する。建物にも気をつけてくれ。」";case"horse":return n.name+"が耳をぴくりと動かした。";default:return n.name+"「壊れた町の建物は私たちで直すよ。建築区画は君が自由に使っていい。」"}}occupies(t,e,n){return this.actors.some(s=>{const r=qs[s.kind];return t<s.x+r.radius&&t+1>s.x-r.radius&&n<s.z+r.radius&&n+1>s.z-r.radius&&e<s.y+r.height&&e+1>s.y+1e-5})}trail(t,e,n){this.trails.length>=12&&this.trails.shift(),this.trails.push({from:t,to:e,color:n,until:this.clock+.19})}defeat(t){this.actors.splice(this.actors.indexOf(t),1),this.actors.some(An)||(this.inform("襲撃をしのいだ！ 住民たちが町の修理を始めます。"),this.raidAt=this.clock+Ea,this.warned=!1)}action(t,e){const n=e===36,s=e===35||e===38;if(!n&&!s&&e!==34)return{ok:!1,message:"装備を選んでください。"};if(this.clock<this.actionReady)return{ok:!1,message:""};const r=n?5:s?16:20,o=Xy(this.world,t,r),a=this.aimedActor(t,r,o?.distance??1/0);if(n&&(!o||a))return{ok:!1,message:"たいまつを当てるブロックに照準を合わせてください。"};const c=ra(t),l=a?.distance??o?.distance??r,h=pp(c,rh(t),l),u={x:c.x+.24*Math.cos(t.yaw),y:c.y-.22,z:c.z-.24*Math.sin(t.yaw)};if(n&&o)return this.fire.ignite(o.x,o.y,o.z)?(this.actionReady=this.clock+.28,this.trail(u,h,16756060),{ok:!0,message:"たいまつを当てました。木や葉に火が広がります。"}):{ok:!1,message:"ここには火をつけられません。"};if(this.actionReady=this.clock+(s?.53:.34),this.trail(u,h,s?16750671:16768661),a){if(!An(a.actor))return{ok:!0,message:"発射しました。味方と馬にダメージは入りません。"};a.actor.hp-=s?27:23;const f=a.actor.name,d=a.actor.hp<=0;return d&&this.defeat(a.actor),{ok:!0,message:d?f+"を追い払った！":f+"に命中！"}}return s&&o&&this.fire.ignite(o.x,o.y,o.z)?{ok:!0,message:"火矢が着弾しました。"}:{ok:!0,message:s?"火矢を放ちました。":"リボルバーを発射しました。"}}raid(t){if(!(this.actors.some(An)||t.x<kr.minX-22||t.x>kr.maxX+22||t.z<kr.minZ-22||t.z>kr.maxZ+22)&&(!this.warned&&this.clock>=this.raidAt-5&&(this.warned=!0,this.inform("町に盗賊とギャングが近づいています。")),!(this.clock<this.raidAt))){this.round++;for(const[e,n]of Eo.raidSpawns.entries()){const s=(e+this.round)%3===0?"gang":"bandit";this.add(s,el[s],qr[s].color,n)}this.raidAt=this.clock+Ea,this.actors.some(An)?this.inform("襲撃開始！ 保安官が町を守っています。"):this.warned=!1}}damagedNear(t,e=26,n){let s,r=1/0;for(const o of this.damage){const a=this.town.get(o),c=Math.hypot(a.x+.5-t.x,a.z+.5-t.z),l=c+Math.max(0,a.y-t.y)*.035;c>e||l>=r||n&&!n(a)||(r=l,s=a)}return s}attackNear(t){let e,n=1/0;for(const s of this.raidTargets){const r=Ne(t,sa(s));r>=n||this.world.get(s.x,s.y,s.z)!==s.id||this.fire.has(s.x,s.y,s.z)||(n=r,e=s)}return e}approach(t,e){let n,s=1/0;for(const[r,o]of Uf){const a={x:e.x+r+.5,y:t.y,z:e.z+o+.5},c=Nf(this.world,a,qs[t.kind],0);if(!c)continue;const l=Ne(t,c);l<s&&(s=l,n=c)}return n??{x:e.x+.5,y:t.y,z:e.z+.5}}wander(t){const e=Math.floor(this.clock/3)+this.actors.indexOf(t)*33,n=Yt(e,37,this.world.salt)*Math.PI*2,s=2+Yt(e,93,this.world.salt)*6;return{x:t.home.x+Math.cos(n)*s,z:t.home.z+Math.sin(n)*s,y:t.home.y}}plan(t,e,n){const s=this.world;let r;if(t.ready=this.clock+(An(t)?.69:1.1),An(t))if(vn(t,e)<10&&Ir(s,Yn(t),ra(e)))r=e;else{const o=this.attackNear(t);r=o?this.approach(t,o):{...s.spawn(),z:s.spawn().z-10}}else if(t.kind==="sheriff"&&n.length){const o=n.reduce((a,c)=>vn(t,a)<=vn(t,c)?a:c);if(vn(t,o)<=13&&Ir(s,Yn(t),Yn(o))){t.path=[],t.goal=null;return}r=o}else if(t.kind==="resident"){const o=!this.townFire&&!n.some(a=>vn(a,t)<9)&&this.damagedNear(t);r=o?this.approach(t,o):this.wander(t)}else r=this.wander(t);t.goal={...r},t.path=fp(s,t,r,qs[t.kind],performance.now()+1.2)}walk(t,e,n){t.moving=!1;const s=qs[t.kind],r=this.world;if(!Ve(r,t,s))return;if(!ys(r,t,s)){t.vy=Math.max(-13,t.vy-20*e);const h={...t,y:t.y+t.vy*e};Ve(r,h,s)?t.y=h.y:(t.y=Math.ceil(h.y-1e-5),t.vy=0);return}t.y=Math.round(t.y),t.vy=0;const o=t.path[0];if(!o)return;const a=Ne(t,o);if(a<.03){t.path.shift();return}const c=Math.min(1,If(t)*e/a),l={x:t.x+(o.x-t.x)*c,y:t.y,z:t.z+(o.z-t.z)*c};if(!Ve(r,l,s,!0)){const h={...l,y:t.y+1};if(o.y!==h.y||!Ve(r,{...t,y:h.y},s,!0)||!Ve(r,h,s,!0)){t.path=[],t.ready=0;return}l.y=h.y}Math.abs(l.y-n.y)<1.7&&Ne(l,n)<s.radius+.27&&Ne(l,n)<Ne(t,n)||Ve(r,l,s,!0)&&(t.yaw=Math.atan2(t.x-o.x,t.z-o.z),Object.assign(t,l),t.moving=!0,t.stride=(t.stride+If(t)*e*7)%(Math.PI*2))}acts(t,e,n){if(!(t.work>this.clock)){if(t.work=this.clock+.18,An(t)){if(vn(t,e)<1.65&&Ir(this.world,Yn(t),ra(e))){this.damageReady<=this.clock&&this.health>0&&(this.damageReady=this.clock+1.35,this.health=Math.max(0,this.health-(t.kind==="bandit"?11:14)),this.inform(this.health===0?"町へ退避しました。":t.name+"の攻撃！ 体力 "+this.health),t.work=this.clock+.72);return}const s=this.attackNear(t);if(!s||Ne(t,sa(s))>2.25||!Ir(this.world,Yn(t),sa(s),!0))return;t.yaw=Math.atan2(t.x-s.x-.5,t.z-s.z-.5),t.kind==="gang"?(this.fire.ignite(s.x,s.y,s.z,!1)&&(this.trail(Yn(t),sa(s),16749914),this.inform("ギャングが木の建物に火をつけた！")),t.work=this.clock+2.7):(this.world.set(s.x,s.y,s.z,0),t.work=this.clock+1.65),t.path=[]}else if(t.kind==="sheriff"){const s=n.filter(o=>o.hp>0&&vn(o,t)<=13&&Ir(this.world,Yn(t),Yn(o)));if(!s.length)return;const r=s.reduce((o,a)=>vn(t,o)<=vn(t,a)?o:a);t.yaw=Math.atan2(t.x-r.x,t.z-r.z),this.trail(Yn(t),Yn(r),16767121),r.hp-=13,r.hp<=0&&this.defeat(r),t.work=this.clock+.73}else if(t.kind==="resident"&&!this.townFire&&!n.some(s=>s.hp>0&&vn(s,t)<9)){const s=this.damagedNear(t,3.7,r=>Math.abs(t.y-r.y)<=8&&!xo(e,r.x,r.y,r.z)&&!this.occupies(r.x,r.y,r.z));if(!s)return;this.world.set(s.x,s.y,s.z,s.id),t.work=this.clock+.42}}}update(t,e,n=.4){if(!Number.isFinite(e)||e<=0)return;const s=Math.min(.12,e);this.clock+=s,this.fire.step(s),this.townFire=!1;for(const o of this.fire.records())if(this.town.has(o.key)){this.townFire=!0;break}this.raid(t);const r=this.actors.filter(An);if(this.actors.length&&this.clock>=this.nextPlan){this.nextPlan=this.clock+.05;for(let o=0;o<this.actors.length;o++){const a=this.actors[this.cursor++%this.actors.length];if(!(a.ready>this.clock||vn(a,t)>88)){this.plan(a,t,r);break}}}for(const o of[...this.actors])o.hp>0&&vn(o,t)<88&&(this.walk(o,s,t),this.acts(o,t,r));for(;this.trails.length&&this.trails[0].until<=this.clock;)this.trails.shift();this.view.update(this.actors,this.fire.records(),this.trails,t,this.clock,n)}dispose(){this.unsubscribe(),this.view.dispose()}}const os=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,Ur=(i,t,e)=>os(i,t,e)&&Number.isInteger(i),nl=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),il=(i,t)=>typeof i=="string"&&i.trim().length>0&&i.length<=t;function jy(){try{return vd(JSON.parse(localStorage.getItem("tk777.webcraft.settings")||"null"))}catch{}return{...gd}}function Ky(i){try{localStorage.setItem("tk777.webcraft.settings",JSON.stringify(i))}catch{}}function oh(i){if(!nl(i)||i.format!=="webcraft777")throw new Error("ウェブクラフト777のワールドファイルを選んでください。");const t=i.version===1&&i.generator===1;if(!t&&(i.version!==2||i.generator!==1&&i.generator!==2))throw new Error("この保存形式または地形バージョンには対応していません。");const e=i.stage===void 0?"classic":i.stage;if(!Fh(e)||e!=="classic"&&(i.generator!==2||!Ba(e)&&i.mode!=="creative")||i.frontier!==void 0&&(e!=="frontier"||!dp(i.frontier))||i.sharkDefeated!==void 0&&typeof i.sharkDefeated!="boolean")throw new Error("ステージまたは生き物の保存情報が正しくありません。");if(t&&(!nl(i.settings)||!["distance","scale","shadows","sensitivity","volume","muted"].every(c=>Object.hasOwn(i.settings,c))))throw new Error("旧ワールドの設定が欠けています。元のバックアップを確認してください。");const n=t?vd(i.settings):i.settings,s=t?ud():i.fixtures,r=t?dd():i.journey;if(!fd(s)||!pd(r))throw Error("設備または探検記録を読めません。元のバックアップを確認してください。");const o=i.pose;if(!il(i.id,64)||!/^[a-zA-Z0-9-]+$/.test(i.id)||!il(i.name,64)||!il(i.seed,128)||i.mode!=="creative"&&i.mode!=="explore"||!Ur(i.revision,0,Number.MAX_SAFE_INTEGER)||!Ur(i.updatedAt,0,864e13)||!nl(o)||!os(o.x,0,256)||!os(o.z,0,256)||!os(o.y,-10,130)||!os(o.yaw,-1e7,1e7)||!os(o.pitch,-Math.PI/2,Math.PI/2)||!os(i.day,0,1)||typeof i.guideSeen!="boolean"||typeof i.flying!="boolean"||o.crouched!==void 0&&typeof o.crouched!="boolean"||!Ur(i.selected,0,8)||!vh(n)||!dh(i.bag))throw new Error("ワールド情報・設定または所持品のデータが正しくありません。");if(t&&(i.bag.hotbar.some(c=>c>20)||i.bag.slots.some(c=>c.id>20)))throw new Error("旧ワールドの所持品に未対応の素材があります。");if(!Array.isArray(i.edits)||i.edits.length>256*256*95)throw new Error("ブロック変更のデータが正しくありません。");const a=new Map;for(const c of i.edits){if(!Array.isArray(c)||c.length!==2||!Ur(c[0],65536,256*256*96-1)||!(t?Ur(c[1],0,13):Qr(c[1]))||a.has(c[0]))throw new Error("ブロック変更に範囲外または重複した座標があります。");a.set(c[0],c[1])}if(s.chests.some(([c])=>a.get(c)!==22)||s.benches.some(([c])=>a.get(c)!==21)||s.axes.some(([c])=>a.has(c)&&a.get(c)!==5))throw Error("設備と建築記録が一致しません。");return{...i,version:2,stage:e,settings:n,fixtures:s,journey:r}}function Zy(i){let t;try{t=JSON.parse(i)}catch{throw new Error("ファイルを読めません。書き出したJSONファイルを選んでください。")}return{save:oh(t),original:t.version===1?t:void 0}}const $y=i=>JSON.stringify(i);class Jy{constructor(t="tk777.webcraft777.v1"){this.database=t}database;connection;open(){return this.connection?this.connection:(this.connection=new Promise((t,e)=>{const n=indexedDB.open(this.database,2);n.onupgradeneeded=()=>{for(const s of["worlds","directory","originals"])n.result.objectStoreNames.contains(s)||n.result.createObjectStore(s,{keyPath:"id"})},n.onsuccess=()=>{n.result.onversionchange=()=>{n.result.close(),this.connection=void 0},t(n.result)},n.onerror=()=>e(n.error),n.onblocked=()=>e(new Error("ほかのタブのゲームを閉じてから、もう一度お試しください。"))}).catch(t=>{throw this.connection=void 0,t}),this.connection)}async list(){const t=await this.open();return new Promise((e,n)=>{const s=t.transaction(["directory","originals"]),r=s.objectStore("directory").getAll(),o=s.objectStore("originals").getAllKeys();s.oncomplete=()=>{const a=new Set(o.result);e(r.result.map(c=>({...c,hasOriginal:c.schemaVersion!==2||a.has(c.id)})).sort((c,l)=>l.updatedAt-c.updatedAt))},s.onabort=()=>n(s.error)})}async original(t){const e=await this.open();return new Promise((n,s)=>{const r=e.transaction(["originals","worlds"]).objectStore("originals").get(t);r.onsuccess=()=>{if(r.result){n(r.result);return}const o=r.transaction.objectStore("worlds").get(t);o.onsuccess=()=>n(o.result?.version===1?o.result:void 0),o.onerror=()=>s(o.error)},r.onerror=()=>s(r.error)})}async get(t){const e=await this.open(),n=await new Promise((s,r)=>{const o=e.transaction("worlds").objectStore("worlds").get(t);o.onsuccess=()=>s(o.result),o.onerror=()=>r(o.error)});if(n!==void 0)return oh(n)}async write(t,e){const n=oh(t),s=await this.open();return new Promise((r,o)=>{const a=s.transaction(["directory","worlds","originals"],"readwrite"),c=a.objectStore("directory"),l=c.get(t.id);let h,u=!1;l.onsuccess=()=>{if((l.result?.revision??null)!==e){u=!0,a.abort();return}const f=a.objectStore("worlds"),d=f.get(t.id);d.onsuccess=()=>{const w=d.result?.version===1?d.result:t.version===1?t:null;if(w){const T=a.objectStore("originals"),R=T.getKey(t.id);R.onsuccess=()=>{R.result===void 0&&T.add(w)}}},h={...n,revision:(e??0)+1,updatedAt:Date.now()};const{id:g,name:v,seed:p,mode:m,stage:_,updatedAt:b,revision:y}=h;a.objectStore("worlds").put(h),c.put({id:g,name:v,seed:p,mode:m,stage:_,updatedAt:b,revision:y,schemaVersion:2})},a.oncomplete=()=>r(h),a.onabort=()=>o(u?new Error("別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。"):a.error??new Error("保存が中断されました。"))})}}const Ff=900,kf=260,Qy=300,tM=7e3,eM=12e3,nM=1e4,ah=7,iM={400:"部屋名・ニックネーム・合言葉を確認してください。",401:"部屋との接続が切れました。合言葉を入れて参加し直してください。",403:"このページからは部屋に接続できません。",404:"部屋が見つかりません。合言葉を確認してください。",409:"部屋が現在いっぱいです。",410:"部屋の有効期限が切れました。新しい部屋を作ってください。",426:"ゲームを再読み込みして、最新版でルームに入り直してください。",429:"通信が集中しています。少し待ってからお試しください。"};class ps extends Error{constructor(t,e,n=0){super(e==="invalid-response"?"部屋から正しい応答を受け取れませんでした。":e==="round-started"?"この鬼ごっこは始まっています。次のルームに参加してください。":e==="room-finished"?"この鬼ごっこは終了しました。新しいルームに参加してください。":iM[t]??"マルチプレイに接続できませんでした。通信環境を確認してください。"),this.status=t,this.code=e,this.retryAfter=n,this.name="OnlineError"}status;code;retryAfter}function Ln(){throw new ps(0,"invalid-response")}function ei(i){return i&&typeof i=="object"&&!Array.isArray(i)?i:void 0}function nr(i,t){return typeof i=="string"&&i.length>0&&i.length<=t}function Hn(i,t,e){return typeof i=="number"&&Number.isSafeInteger(i)&&i>=t&&i<=e}function oa(i,t,e){return typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e}function ir(i){return nr(i,64)&&/^[a-z0-9_-]+$/i.test(i)}function aa(i){return i===1||i===3||i===5||i===10||i===15}function zf(i){const t=ei(i),e=ei(t?.room);return!t||!e||typeof e.code!="string"||!/^[A-Z0-9]{8}$/.test(e.code)||!nr(e.name,120)||!nr(e.seed,128)||e.generator!==2||e.mode!==void 0&&e.mode!=="explore"&&e.mode!=="creative"&&e.mode!=="tag"||e.stage!==void 0&&!ho(e.stage)||e.stage==="frontier"||e.stage==="school"&&(e.mode!=="tag"||!aa(e.tagMinutes))||e.tagMinutes!==void 0&&(e.mode!=="tag"||!aa(e.tagMinutes))||e.tagBots!==void 0&&(!Hn(e.tagBots,0,4)||e.tagBots>0&&(e.mode!=="tag"||!aa(e.tagMinutes)||!ya(e.stage)))||!Hn(e.createdAt,1,Number.MAX_SAFE_INTEGER)||!ir(t.id)||!nr(t.token,256)||t.token.length<16||!/^[a-z0-9_.-]+$/i.test(t.token)?Ln():{id:t.id,token:t.token,room:{code:e.code,name:e.name,seed:e.seed,generator:e.generator,createdAt:e.createdAt,mode:e.mode==="explore"||e.mode==="tag"?e.mode:"creative",stage:ho(e.stage)?e.stage:"classic",...aa(e.tagMinutes)?{tagMinutes:e.tagMinutes}:{},...Hn(e.tagBots,1,4)?{tagBots:e.tagBots}:{}}}}function sM(i){const t=ei(i),e=ei(t?.pose);if(!t||!e||!ir(t.id)||!nr(t.nickname,80)||!oa(e.x,0,St)||!oa(e.y,0,We)||!oa(e.z,0,St)||!oa(e.yaw,-Math.PI*2,Math.PI*2)||typeof e.moving!="boolean"||typeof e.crouched!="boolean"||typeof e.flying!="boolean")return;const{x:n,y:s,z:r,yaw:o,moving:a,crouched:c,flying:l}=e;return{id:t.id,nickname:t.nickname,pose:{x:n,y:s,z:r,yaw:o,moving:a,crouched:c,flying:l},...t.cpu===!0?{cpu:!0}:{}}}function rM(i,t,e){const n=ei(i);return!n||!Hn(n.key,St*St,St*St*We-1)||!Hn(n.block,0,33)||n.block>12&&n.block!==21&&n.block!==23&&n.block<25||n.axis!=="y"&&!(n.block===5&&(n.axis==="x"||n.axis==="z"))||!Hn(n.revision,t+1,e)?Ln():{key:n.key,block:n.block,axis:n.axis,revision:n.revision}}function Of(i){return!Array.isArray(i)||i.length>6||!i.every(ir)||new Set(i).size!==i.length?Ln():i}function oM(i,t){const e=ei(i);if(!e||e.it!==null&&!ir(e.it)||e.previousIt!==null&&!ir(e.previousIt)||e.phase!=="waiting"&&e.phase!=="hiding"&&e.phase!=="playing"&&e.phase!=="finished"||!Hn(e.hideUntil,0,Number.MAX_SAFE_INTEGER)||!Hn(e.seq,0,Number.MAX_SAFE_INTEGER))return Ln();const n=Hn(e.endsAt,0,Number.MAX_SAFE_INTEGER)?e.endsAt:void 0,s=Hn(e.serverNow,1,Number.MAX_SAFE_INTEGER)?e.serverNow:void 0;if(t&&(n===void 0||s===void 0||e.phase!=="waiting"&&(!e.it||n<=e.hideUntil)))return Ln();const r=e.enrolledIds===void 0?void 0:Of(e.enrolledIds),o=e.winnerIds===void 0?[]:Of(e.winnerIds),a=[];if(e.results!==void 0){if(!Array.isArray(e.results)||e.results.length>6)return Ln();for(const c of e.results){const l=ei(c);if(!l||!ir(l.id)||!nr(l.nickname,80))return Ln();a.push({id:l.id,nickname:l.nickname})}}if(e.phase==="finished"){const c=new Set(a.map(l=>l.id));if(!t||e.it===null||o.includes(e.it)||!c.has(e.it)||!o.every(l=>c.has(l))||c.size!==o.length+1||a.length!==c.size)return Ln()}return{it:e.it,previousIt:e.previousIt,phase:e.phase,hideUntil:e.hideUntil,seq:e.seq,endsAt:n??0,serverNow:s,enrolledIds:r,winnerIds:o,results:a}}function aM(i,t,e,n,s){const r=ei(i);if(!r||!Hn(r.revision,t,Number.MAX_SAFE_INTEGER)||!Array.isArray(r.cells)||r.cells.length>nM||!Array.isArray(r.players)||r.players.length>6)return Ln();const o=r.revision,a=r.cells.map(u=>rM(u,t,o));if(new Set(a.map(u=>u.key)).size!==a.length||o>t&&!a.some(u=>u.revision===o))return Ln();const c=new Set([e]),l=[];for(const u of r.players){const f=sM(u);!f||c.has(f.id)||(c.add(f.id),l.push(f))}let h;if(n){const u=ei(r.result);if(!u||typeof u.ok!="boolean")return Ln();const f=typeof u.reason=="string"&&/^[a-z-]{1,32}$/.test(u.reason)?u.reason:void 0;h={ok:u.ok,...f?{reason:f}:{}}}return{frame:{revision:o,cells:a,players:l,...s.mode==="tag"?{tag:oM(r.tag,!!s.tagMinutes)}:{}},result:h}}function cM(i){if(!i)return 0;const t=/^\d+$/.test(i)?Number(i)*1e3:Date.parse(i)-Date.now();return Number.isFinite(t)?Math.min(Math.max(t,0),6e4):0}class lM{constructor(t,e=globalThis.fetch.bind(globalThis)){this.fetcher=e;const n=new URL(t),s=["127.0.0.1","localhost","[::1]"].includes(n.hostname);if(n.username||n.password||n.protocol!=="https:"&&!(s&&n.protocol==="http:"))throw new Error("安全なマルチプレイ接続先を指定してください。");this.origin=n.origin}fetcher;origin;async create(t){const e=t.mode==="tag",n=zf(await this.request("rooms",{...t,protocol:ah}));if(t.mode&&n.room.mode!==t.mode||e&&n.room.tagMinutes!==(t.tagMinutes??5)||t.stage&&n.room.stage!==t.stage||(t.tagBots??0)!==(n.room.tagBots??0))throw this.leave(n),new ps(426,"mode-unavailable");return n}async join(t){return zf(await this.request("join",{...t,protocol:ah}))}start(t,e){return new hM(t,e,(n,s)=>this.request("sync",n,s),()=>this.leave(t))}async leave(t){try{await this.request("leave",{code:t.room.code,token:t.token},void 0,!0)}catch{}}async request(t,e,n,s=!1){const r=new AbortController,o=()=>r.abort();n?.aborted&&o();const a=setTimeout(o,tM);n?.addEventListener("abort",o,{once:!0});try{const c=await this.fetcher(this.origin+"/api/webcraft/"+t,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},signal:r.signal,cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer",redirect:"error",keepalive:s});if(!c.ok){const l=ei(await c.json().catch(()=>{})),h=typeof l?.error=="string"&&/^[a-z0-9_-]{1,40}$/i.test(l.error)?l.error:"http";throw new ps(c.status,h,cM(c.headers.get("Retry-After")))}return await c.json().catch(()=>Ln())}catch(c){throw c instanceof ps?c:new ps(0,"network")}finally{clearTimeout(a),n?.removeEventListener("abort",o)}}}const ca=()=>typeof document<"u"&&document.hidden;class hM{constructor(t,e,n,s){this.connection=t,this.hooks=e,this.send=n,this.leave=s,typeof document<"u"&&document.addEventListener("visibilitychange",this.visibility),this.schedule(0)}connection;hooks;send;leave;currentState="connecting";revision=0;lastStart=-1/0;retryAt=0;failures=0;timer;running;pending;sent;closed=!1;finished=!1;get state(){return this.currentState}edit(t){return this.closed||this.state!=="connected"||ca()?Promise.resolve({ok:!1,reason:"offline"}):this.pending?Promise.resolve({ok:!1,reason:"busy"}):new Promise(e=>{this.pending={edit:{...t},resolve:e},this.schedule(0)})}close(){this.closed||(this.stop(),this.leave())}visibility=()=>{if(!ca()){this.schedule(0);return}clearTimeout(this.timer),this.timer=void 0,this.pending&&this.pending!==this.sent&&this.finishEdit({ok:!1,reason:"interrupted"})};updateState(t){this.currentState!==t&&(this.currentState=t,this.hooks.onState(t))}schedule(t){if(this.closed||this.finished||this.running||ca())return;clearTimeout(this.timer);const e=performance.now(),n=this.connection.room.mode==="tag"?kf:Qy,s=Math.max(e+t,this.lastStart+n,this.retryAt);this.timer=setTimeout(()=>{this.tick()},s-e)}finishEdit(t){const e=this.pending;this.pending=void 0,this.sent=void 0,e?.resolve(t)}stop(){this.closed=!0,clearTimeout(this.timer),this.timer=void 0,this.running?.abort(),this.finishEdit({ok:!1,reason:"closed"}),typeof document<"u"&&document.removeEventListener("visibilitychange",this.visibility)}async tick(){if(this.timer=void 0,this.closed||this.finished||this.running||ca())return;const t=new AbortController;this.running=t,this.lastStart=performance.now(),this.sent=this.pending;const e=this.sent,{room:n,token:s,id:r}=this.connection;let o=!1;try{const a=this.hooks.pose();o=!!(e&&a),e&&!o&&this.finishEdit({ok:!1,reason:"offline"});const c=await this.send({protocol:ah,code:n.code,token:s,since:this.revision,pose:a,...e&&a?{edit:e.edit}:{}},t.signal);if(this.closed)return;const{frame:l,result:h}=aM(c,this.revision,r,o,n);this.finished=l.tag?.phase==="finished",this.hooks.onFrame(l),this.revision=l.revision,this.failures=this.retryAt=0,this.updateState("connected"),e&&h&&this.finishEdit(h)}catch(a){if(this.closed)return;const c=a instanceof ps?a:new ps(0,"invalid-response");if(c.status===400&&o&&e?.edit.actionId){this.finishEdit({ok:!1,reason:"invalid"});return}if([400,401,403,404,409,410,426].includes(c.status)){this.stop(),this.hooks.onEnd?.(c);return}this.pending&&this.finishEdit({ok:!1,reason:o?"uncertain":"offline"}),this.updateState("reconnecting"),this.failures=Math.min(this.failures+1,5),this.retryAt=performance.now()+Math.max(c.retryAfter,Math.min(eM,Ff*2**(this.failures-1)))}finally{this.running=void 0;const a=n.mode==="tag"?kf:Ff;this.closed||this.schedule(this.pending?0:Math.max(0,this.lastStart+a-performance.now()))}}}function uM(i){const t=$f("explore");return i!=="classic"&&(t.slots=[{id:5,count:16},{id:15,count:8}],t.hotbar[0]=5),t}const mp=(i,t)=>"tk777.webcraft.exploration."+JSON.stringify([i,t.trim()]),Nr=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,fM=i=>i&&Nr(i.x,0,St)&&Nr(i.y,0,We)&&Nr(i.z,0,St)&&Nr(i.pitch,-Math.PI/2,Math.PI/2)&&Nr(i.yaw,-Math.PI*2,Math.PI*2)&&(i.crouched===void 0||typeof i.crouched=="boolean");function dM(i){const t=i?.edit;return t&&dh(i?.after)&&typeof t.actionId=="string"&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(t.actionId)&&(i?.message===void 0||typeof i.message=="string"&&i.message.length<=150)&&Number.isSafeInteger(t.key)&&t.key>=St*St&&t.key<St*St*We&&Number.isSafeInteger(t.fromRevision)&&t.fromRevision>=0&&Qr(t.before)&&Qr(t.block)&&(t.axis==="x"||t.axis==="y"||t.axis==="z")}function pM(i,t){try{const e=JSON.parse(sessionStorage.getItem(mp(i,t))??"null");if(e&&dh(e.bag)&&Number.isInteger(e.selected)&&e.selected>=0&&e.selected<=8&&pd(e.journey)&&fM(e.pose)&&(e.pending===void 0||dM(e.pending)))return e}catch{}}function mM(i,t,e){try{sessionStorage.setItem(mp(i,t),JSON.stringify(e))}catch{}}const as={sheep:{radius:.43,height:1.22},cow:{radius:.48,height:1.43},villager:{radius:.32,height:1.81}};function gM({x:i,y:t,z:e}){return[i,t,e].every(Number.isFinite)&&i>=0&&i<St&&e>=0&&e<St&&t>=1&&t<We}const vM=[["villager","ナギ",5082500,.6,-4],["sheep","わたげ",16050898,-2,-5],["cow","もみじ",8144182,4,-5],["villager","コハク",12748099,5,-2],["sheep","ミルク",15196367,-5,-5],["cow","カカオ",6244930,6,1],["villager","スミレ",10188701,-4,2],["sheep","ゆき",15917509,-6,-1],["cow","くるみ",5396065,7,3],["villager","ハル",10642512,2,5],["sheep","こむぎ",15386777,-2,6],["cow","あずき",10180928,5,7]];function gp(i,t,e){const n=Ha(t);for(const s of[0,-1,1,-2,2,-3,3]){const r={...n,y:n.y+s};if(Ve(i,r,e,!0)&&ys(i,r,e))return r}return null}function _M(i,t){const e={radius:.48,height:1.81},n=gp(i,t,e);if(!n)return[];const s=new Set,r=[n],o=[],a=c=>c.x+"/"+c.y+"/"+c.z;s.add(a(n));for(let c=0;c<r.length&&c<440;c++){const l=r[c],h=Math.floor(l.x),u=Math.floor(l.z);if(Ne(l,t)>=2.8&&[1,2,3,4,8].includes(i.get(h,l.y-1,u))){let f=!1;for(let d=l.y+2;d<We;d++)if(Zn(i.get(h,d,u))){f=!0;break}f||o.push(l)}for(const f of up(i,l,e)){const d=a(f);Math.abs(f.x-n.x)>11||Math.abs(f.z-n.z)>11||s.has(d)||(s.add(d),r.push(f))}}return o}function Fr(i,t){return Math.atan2(i.x-t.x,i.z-t.z)}function xM(i,t,e){const{radius:n,height:s}=as[e.kind];let r=0,o=4.25;for(const a of["x","y","z"]){const c=e[a]-(a==="y"?0:n),l=e[a]+(a==="y"?s:n);if(Math.abs(t[a])<1e-9){if(i[a]<c||i[a]>l)return 1/0}else{const h=(c-i[a])/t[a],u=(l-i[a])/t[a];if(r=Math.max(r,Math.min(h,u)),o=Math.min(o,Math.max(h,u)),o<r)return 1/0}}return r}class yM{constructor(t){this.world=t,this.unsubscribe=t.onEdit((e,n,s)=>{for(const r of this.entities){const o=this.motions.get(r.id),a=c=>Math.abs(c.x-(e+.5))<1.51&&Math.abs(c.z-(s+.5))<1.51&&n>=Math.floor(c.y)-2&&n<Math.ceil(c.y+as[r.kind].height)+1;!a(r)&&!o.path.some(a)||(o.path=[],o.due=0)}})}world;active=[];entities=[];clock=0;visualRevision=0;motions=new Map;unsubscribe;nextList=0;lastViewer=null;nextPlan=0;cursor=0;talking=null;lastMobile;track(t){this.motions.set(t.id,{mode:"idle",path:[],due:this.clock+1.8+this.motions.size*.31,seq:this.motions.size*57+1,vy:0,stride:0,grazing:0})}introduce(t){if(this.entities.length||!gM(t))return!1;const e=_M(this.world,t),n=[],s=Number.isFinite(t.yaw)?t.yaw:0,r=Math.cos(s),o=Math.sin(s);for(const[a,[c,l,h,u,f]]of vM.entries()){const d=a===0?.7:2.8,g=u+(Yt(a,12,this.world.salt)-.5)*d,v=f+(Yt(a,73,this.world.salt)-.5)*d,p=t.x+g*r+v*o,m=t.z-g*o+v*r;let _,b=1/0;for(const w of e){if(n.some(R=>Ne(R,w)<1.75))continue;let T=(p-w.x)**2+(m-w.z)**2+3*(t.y-w.y)**2;if(a===0){const R=w.x-t.x,D=w.z-t.z,E=-o*R-r*D,S=Math.abs(r*R-o*D);(E<2.8||S>E*.26)&&(T+=75)}T<b&&(b=T,_=w)}if(!_)return!1;const y=Fr(_,t)+.48*(a%2?-1:1);n.push({..._,id:c+"-"+this.world.salt.toString(36)+"-"+a,name:l,kind:c,color:h,yaw:Math.atan2(Math.sin(y),Math.cos(y)),home:{..._}})}this.entities.push(...n),this.visualRevision++;for(const a of n)this.track(a);return this.refreshActive(t,!1),!0}refreshActive(t,e){const n=e?27:43,s=this.entities.filter(a=>Math.hypot(a.x-t.x,a.z-t.z,a.y-t.y)<n).sort((a,c)=>Ne(a,t)-Ne(c,t));this.active.length=0;let r=0,o=0;for(const a of s){if(a.kind==="villager"){if(o>=4)continue;o++}else{if(r>=8)continue;r++}this.active.push(a)}this.lastMobile=e,this.lastViewer={...t},this.nextList=this.clock+.35}talk(t,e){if(this.talking=t,this.visualRevision++,!t)return;const n=this.entities.find(s=>s.id===t&&s.kind==="villager");if(n){const s=this.motions.get(t);s.mode="talk",s.path=[],e&&(n.yaw=Fr(n,e))}}overlapsBlock(t,e,n){return this.entities.some(s=>{const r=as[s.kind];return t<s.x+r.radius&&t+1>s.x-r.radius&&n<s.z+r.radius&&n+1>s.z-r.radius&&e<s.y+r.height&&e+1>s.y+1e-5})}target(t,e){if(![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=e??Gn(this.world,t,4.25)?.distance??1/0;let s=Math.min(4.250001,n-1e-4),r=null;const o=Math.cos(t.pitch),a={x:-Math.sin(t.yaw)*o,y:Math.sin(t.pitch),z:-Math.cos(t.yaw)*o},c={x:t.x,y:t.y+Ms(t),z:t.z};for(const l of this.entities){const h=xM(c,a,l);h<s&&(s=h,r=l)}return r}motion(t){return this.motions.get(t.id)}castsContactShadow(t){if(Math.abs(t.y-Math.round(t.y))>.003)return!1;const e=as[t.kind].radius*.82,n=Math.round(t.y)-1;return[-e,e].every(s=>[-e,e].every(r=>Zn(this.world.get(Math.floor(t.x+s),n,Math.floor(t.z+r)))))}plan(t,e,n,s){e.seq++;const r=Yt(e.seq,42,this.world.salt),o=Yt(e.seq,81,this.world.salt);e.due=this.clock+2.5+r*3;const a=Ne(t,n)<1.05&&Math.abs(t.y-n.y)<1.8;if(!a&&o<.28){e.path=[],e.mode=this.grazes(t)?"eat":"idle",e.grazing=this.clock+.9+r,t.yaw=Math.atan2(Math.sin(t.yaw+(r-.5)*.55),Math.cos(t.yaw+(r-.5)*.55));return}let c;if(a){const h=Fr(n,t);c={x:t.x-Math.sin(h)*2.5,y:t.y,z:t.z-Math.cos(h)*2.5}}else{const h=t.kind==="villager"?4.2:5.5;c={x:t.home.x+Math.cos(r*6.28)*(.9+o*h),y:t.home.y,z:t.home.z+Math.sin(r*6.28)*(.9+o*h)}}const l=new Set;for(const h of this.active)h!==t&&l.add(ba(h));e.path=fp(this.world,t,c,as[t.kind],s,l),e.mode=e.path.length?"walk":"idle"}grazes(t){return t.kind!=="villager"&&this.world.get(Math.floor(t.x),Math.floor(t.y-.01),Math.floor(t.z))===1}move(t,e,n,s){const r=as[t.kind],o=this.world;if(!Ve(o,t,r))return;if(ys(o,t,r))t.y=Math.round(t.y),e.vy=0;else{e.vy=Math.max(-15,e.vy-22*n);const v={x:t.x,z:t.z,y:t.y+e.vy*n};Ve(o,v,r)?t.y=v.y:(t.y=Math.ceil(v.y-1e-5),e.vy=0)}if(!ys(o,t,r)||!e.path.length)return;const a=e.path[0],c=Ne(t,a);if(c<.025){e.path.shift(),e.path.length||(e.mode="idle");return}const l=t.kind==="villager"?.95:1.12,h=Math.min(1,l*n/c),u={x:t.x+(a.x-t.x)*h,y:t.y,z:t.z+(a.z-t.z)*h};if((v=>Math.abs(v.y-s.y)<1.75&&Ne(v,s)<r.radius+.31)(u)&&Ne(u,s)<=Ne(t,s))return;if(this.active.some(v=>v!==t&&Math.abs(v.y-t.y)<1.4&&Ne(v,u)<as[v.kind].radius+r.radius&&Ne(v,u)<Ne(v,t)-1e-6)){e.path=[],e.mode="idle",e.due=this.clock+.5;return}if(!Ve(o,u,r,!0)){const v={...u,y:t.y+1};if(a.y!==t.y+1||!Ve(o,{...t,y:t.y+1},r,!0)||!Ve(o,v,r,!0)){e.path=[],e.mode="idle";return}u.y=v.y}const g=gp(o,u,r);if(!g||g.y<u.y-1){e.path=[],e.mode="idle";return}t.yaw=Fr(t,a),Object.assign(t,u),e.stride=(e.stride+l*n*6)%(Math.PI*2)}step(t,e,n){if(!Number.isFinite(t)||t<=0||![e.x,e.y,e.z].every(Number.isFinite))return;const s=Math.min(.1,t);this.clock+=s,(this.clock>=this.nextList||this.lastMobile!==n||!this.lastViewer||Ne(e,this.lastViewer)>3)&&this.refreshActive(e,n);const r=this.clock,o=this.active.length;if(!o)return;const a=performance.now()+(n?1:1.8);let c=r>=this.nextPlan?n?1:2:0;const l=Math.ceil(s*60);for(let h=0;h<o;h++){const u=this.active[(h+this.cursor)%o],f=this.motions.get(u.id);this.talking===u.id?(f.path=[],f.mode="talk",u.yaw=Fr(u,e)):f.grazing>r?(f.path=[],f.mode=this.grazes(u)?"eat":"idle"):(f.path.length||(f.mode="idle"),c>0&&r>=f.due&&performance.now()<a&&!f.path.length&&(this.plan(u,f,e,a),c--,this.nextPlan=r+(n?.07:.045)));for(let d=0;d<l;d++)this.move(u,f,s/l,e)}this.cursor=(this.cursor+1)%o}dispose(){this.unsubscribe(),this.active.length=0,this.motions.clear()}}const ti=(i,t,e,n,s,r,o,a)=>({joint:i,x:t,y:e,z:n,w:s,h:r,d:o,color:a}),ee=(i,t,e,n,s,r,o)=>ti("body",i,t,e,n,s,r,o),re=(i,t,e,n,s,r,o)=>ti("head",i,t,e,n,s,r,o),$s=3157042,la=16771268,Bf=12553580,Va=["leftFront","rightFront","leftRear","rightRear"];function Hf(i){const t=i==="sheep",e=[ee(0,.67,.035,.6,.47,.68,t?13087134:"coat"),...t?[ee(0,.73,.045,.73,.59,.77,"coat"),ee(-.31,.65,.02,.15,.34,.56,14668990),ee(.32,.67,.08,.14,.32,.49,15853259),ee(0,.98,.04,.56,.13,.64,16773852),ee(0,.69,.42,.5,.38,.13,15128509),ee(-.23,.72,-.32,.2,.26,.12,14932157),ee(.22,.74,-.32,.2,.27,.12,15984074),ee(.11,.96,-.17,.22,.14,.23,16248022)]:[ee(-.306,.7,.06,.035,.33,.25,16179136),ee(.306,.66,-.1,.035,.26,.21,15062201),ee(.081,.915,.09,.3,.04,.22,16575444),ee(-.03,.51,.27,.4,.14,.18,13213579),ee(-.19,.63,-.31,.16,.22,.03,15128247),ee(.314,.85,.12,.045,.17,.24,15853003),ee(-.25,.9,-.09,.15,.035,.18,13614488),ti("tail",0,-.12,0,.065,.29,.055,12097917),ti("tail",0,-.28,0,.088,.11,.08,5061686)],re(0,.02,-.035,t?.34:.4,.36,.29,t?11899773:"coat"),re(0,-.07,-.188,t?.28:.35,.15,.11,t?14136730:14002072),re(-.102,.068,-.186,.062,.066,.02,$s),re(.102,.068,-.186,.062,.066,.02,$s),re(-.108,.082,-.198,.018,.021,.008,la),re(.108,.082,-.198,.018,.021,.008,la),re(-.215,.06,.014,.14,.078,.14,t?14466992:"coat"),re(.215,.06,.014,.14,.078,.14,t?14466992:"coat"),re(-.074,-.06,-.246,.036,.025,.01,$s),re(.074,-.06,-.246,.036,.025,.01,$s)];t?e.push(re(0,.197,-.03,.37,.105,.33,15524297)):e.push(re(-.15,.23,.04,.07,.16,.08,la),re(.15,.23,.04,.07,.16,.08,la),re(0,.055,-.182,.1,.23,.018,15917005),re(0,.215,-.015,.21,.075,.23,5520694));for(const[n,s]of Va.entries())e.push(ti(s,0,-.11,0,.136,.43,.14,t?12557181:n===2?15983303:8481111),ti(s,0,-.337,-.006,.146,.09,.156,5523522));return e}const MM=[ee(0,1.05,0,.46,.54,.28,"coat"),ee(0,.73,0,.43,.17,.27,8413004),ee(0,1.13,-.15,.22,.36,.035,15323038),ee(0,.855,-.145,.44,.09,.048,6441015),ee(0,1.3,-.135,.36,.11,.064,13273928),ee(.13,1.19,-.16,.067,.16,.047,14986853),ee(-.077,.983,-.174,.14,.085,.023,11045476),ee(.078,1.095,-.173,.04,.031,.014,12230523),ee(-.27,.98,0,.111,.05,.185,13346417),ee(.27,.98,0,.111,.05,.185,13346417),ee(.085,.855,-.176,.07,.063,.025,14726755),ee(-.22,.84,-.015,.13,.19,.15,10121806),ee(-.265,1.08,0,.105,.34,.18,"coat"),ee(.265,1.08,0,.105,.34,.18,"coat"),ee(-.265,.89,0,.103,.12,.15,Bf),ee(.265,.89,0,.103,.12,.15,Bf),re(0,.005,0,.333,.34,.286,14198654),re(0,.16,.008,.345,.1,.303,6638398),re(0,.217,.022,.38,.072,.345,"coat"),re(0,.254,.034,.29,.061,.255,"coat"),re(0,.191,-.086,.35,.031,.245,4734776),re(.132,.219,-.153,.046,.037,.026,15124352),re(-.094,.117,-.145,.12,.048,.023,6638398),re(-.168,-.007,.017,.04,.07,.088,13077613),re(.168,-.007,.017,.04,.07,.088,13077613),re(-.143,.069,.02,.063,.13,.24,6441533),re(.143,.069,.02,.063,.13,.24,6441533),re(-.067,.033,-.148,.043,.051,.012,$s),re(.067,.033,-.148,.043,.051,.012,$s),re(0,-.018,-.17,.067,.064,.057,12749163),re(0,-.094,-.146,.073,.018,.013,11103576),ti("leftFront",0,-.27,0,.17,.55,.2,4541521),ti("rightFront",0,-.27,0,.17,.55,.2,4541521),ti("leftFront",0,-.602,-.023,.18,.13,.246,6310972),ti("rightFront",0,-.602,-.023,.18,.13,.246,6310972)],sl={sheep:Hf("sheep"),cow:Hf("cow"),villager:MM},bM=["body","head",...Va,"tail"];function SM(){const t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){const r=(s+n*32)*4,o=(Math.imul((s>>1)+17,191)^Math.imul((n>>1)+9,127))&31,a=(s+n*3)%19===0||n%9===0&&s%7<3?12:0,c=Math.min(255,220+o+((s^n)&3)-a);t[r]=c,t[r+1]=c,t[r+2]=c,t[r+3]=255}const e=new _o(t,32,32);return e.generateMipmaps=!0,e.magFilter=ke,e.minFilter=Ii,e.needsUpdate=!0,e}function EM(){return new Je({transparent:!0,depthWrite:!1,vertexShader:"varying vec2 pos;void main(){pos=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 pos;void main(){vec2 p=floor(pos*20.+.5)/20.;
      float a=(1.-smoothstep(.2,1.,dot(p,p)))*.31;gl_FragColor=vec4(.065,.105,.069,a);
      #include <colorspace_fragment>
    }`})}class wM{constructor(t){this.scene=t;const e=[],n=this.geometry.getAttribute("normal");for(let s=0;s<n.count;s++){const r=.76+n.getY(s)*.19+n.getX(s)*.075+n.getZ(s)*.035;e.push(r,r,r*.99)}this.geometry.setAttribute("color",new ye(e,3)),this.mesh=new ao(this.geometry,this.material,1152),this.mesh.instanceMatrix.setUsage(Cd),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.name="羊・牛・村人",t.add(this.mesh),this.shade.name="足元の影",this.shade.frustumCulled=!1,this.shade.count=0,this.shade.renderOrder=.5,t.add(this.shade);for(const s of bM){const r=new Pe;this.joints.set(s,r),this.root.add(r)}for(const s of Object.keys(sl))for(const r of sl[s])typeof r.color=="number"&&!this.palette.has(r.color)&&this.palette.set(r.color,new qt(r.color))}scene;geometry=new Sn(1,1,1);texture=SM();material=new Wi({vertexColors:!0,map:this.texture});shade=new ao(new vr(1,1).rotateX(-Math.PI/2),EM(),24);mesh;root=new Pe;joints=new Map;local=new Pe;out=new ge;color=new qt;palette=new Map;previousClock=-1;previousRevision=-1;previousCenter=new U(1/0,0,0);previousDay=-1;previousMobile;pose(t,e,n){const s=e.motion(t),r=t.kind==="villager",o=t.kind==="cow",a=n?0:e.clock,c=t.id.charCodeAt(t.id.length-1),l=s.mode==="walk",h=n||!l?0:Math.sin(s.stride)*.48,u=n?0:Math.sin(a*2.2+c)*.009;this.root.position.set(t.x,t.y+u+(l?Math.abs(h)*.042:0),t.z),this.root.rotation.y=t.yaw,this.root.scale.setScalar(o?1.1:1),this.joints.get("body").position.set(0,0,0);const f=this.joints.get("head"),d=s.mode==="eat"&&!r&&!n,g=d?.5+.5*Math.sin(a*5):0;f.position.set(0,r?1.48:o?.88:.93,r?0:-.271),f.rotation.set(d?-.56-.25*g:u,!l&&!n&&s.mode!=="talk"?Math.sin(a*.9+c)*.15:0,0),d&&(f.position.y-=.23+.06*g);for(let p=0;p<Va.length;p++){const m=this.joints.get(Va[p]);m.position.set((p%2?1:-1)*(r?.115:.212),r?.667:.383,r?0:p<2?-.213:.247),m.rotation.x=h*([0,3].includes(p)?1:-1)}const v=this.joints.get("tail");v.position.set(0,.88,.37),v.rotation.z=n?0:Math.sin(a*2.1+c)*.2,this.root.updateMatrixWorld(!0)}update(t,e,n,s){const r=t.clock,o=r===this.previousClock;this.viewerVector.set(e.x,e.y,e.z);const a=this.previousCenter.distanceToSquared(this.viewerVector);if(this.previousRevision===t.visualRevision&&this.previousMobile===s&&a<.01&&Math.abs(n-this.previousDay)<.003&&(o||s&&r>=this.previousClock&&r-this.previousClock<1/30))return;this.previousClock=r,this.previousCenter.set(e.x,e.y,e.z),this.previousDay=n,this.previousMobile=s,this.previousRevision=t.visualRevision;const c=Math.sin((n-.25)*Math.PI*2),l=.48+.5*Math.max(0,Math.min(1,c*2+.25));let h=0,u=0;for(const f of t.entities){const d=Math.hypot(f.x-e.x,f.y-e.y,f.z-e.z);if(!(d>(s?28:44))){!s&&d<22&&t.castsContactShadow(f)&&(this.local.position.set(f.x,f.y+.006,f.z),this.local.rotation.y=f.yaw,this.local.scale.set(f.kind==="villager"?.58:.88,1,f.kind==="villager"?.52:.95),this.local.updateMatrix(),this.shade.setMatrixAt(u++,this.local.matrix),this.local.rotation.y=0),this.pose(f,t,d>21);for(const g of sl[f.kind])this.local.position.set(g.x,g.y,g.z),this.local.scale.set(g.w,g.h,g.d),this.local.updateMatrix(),this.out.multiplyMatrices(this.joints.get(g.joint).matrixWorld,this.local.matrix),this.mesh.setMatrixAt(h,this.out),g.color==="coat"?this.color.setHex(f.color):this.color.copy(this.palette.get(g.color)),this.mesh.setColorAt(h++,this.color.multiplyScalar(l))}}this.shade.count=u,this.shade.visible=u>0,u&&(this.shade.instanceMatrix.needsUpdate=!0),this.mesh.count=h,this.mesh.visible=h>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}viewerVector=new U;dispose(){this.scene.remove(this.mesh,this.shade),this.mesh.dispose(),this.geometry.dispose(),this.material.dispose(),this.texture.dispose(),this.shade.dispose(),this.shade.geometry.dispose(),this.shade.material.dispose()}}const TM={ナギ:"こんにちは。この坂を下りた先が湖だよ。浅瀬から水の中をのぞいてみて。",コハク:"石や木材を集めたら、湖を眺められる小さな家を建ててみない？",スミレ:"わたげたちは、草の多い場所がお気に入り。少し待つと草を食べるよ。",ハル:"湖で大きな背びれを見かけたら気をつけて。岸に上がれば追ってこないよ。"};class AM{simulation;view;talkUntil=0;mobile=globalThis.matchMedia?.("(pointer: coarse)").matches??!1;constructor(t,e,n=t.spawn()){if(this.simulation=new yM(t),!this.simulation.introduce(n)){const s=t.spawn();if(!this.simulation.introduce(s))for(const[r,o]of[[-10,-6],[10,-6],[-12,6],[12,6],[0,16],[0,-21]]){const a=Math.floor(s.x)+r,c=Math.floor(s.z)+o;if(!Li(a,1,c))continue;const l=t.highest[a+St*c]+1;if(this.simulation.introduce({x:a+.5,y:l,z:c+.5}))break}}this.view=this.simulation.entities.length?new wM(e):null}update(t,e,n=.36){this.talkUntil&&this.simulation.clock>=this.talkUntil&&(this.simulation.talk(null),this.talkUntil=0),this.simulation.step(e,t,this.mobile),this.view?.update(this.simulation,t,n,this.mobile)}targetLabel(t,e){const n=this.simulation.target(t,e);if(!n)return null;const s=n.kind==="villager"?"住民":n.kind==="sheep"?"羊":"牛";return n.name+"（"+s+"）"}interact(t){const e=this.simulation.target(t);return e?e.kind==="villager"?(this.simulation.talk(e.id,t),this.talkUntil=this.simulation.clock+3.5,e.name+"「"+(TM[e.name]??"こんにちは。いい天気だね。")+"」"):e.name+(e.kind==="sheep"?"「メェー」":"「モー」"):null}occupies(t,e,n){return this.simulation.overlapsBlock(t,e,n)}dispose(){this.view?.dispose(),this.simulation.dispose()}}const kh=13,ha=100,rl=4.5,RM=1.52,CM=8.2,PM=[.79,.69,1,.63,.91,.75],Xs=2110791,ua=15792378,vp={jade:{radius:.55,vertical:.23,speed:1.33},amber:{radius:.5,vertical:.28,speed:1.04},shark:{radius:1.13,vertical:.44,speed:1.25}},LM={jade:"ヒスイフィッシュ",amber:"アンバーフィッシュ",shark:"サメ"},DM={jade:{body:[[0,0,.06,.21,.27,.46,4448177],[0,.09,-.03,.16,.17,.4,1674386],[0,-.09,.08,.2,.09,.37,12122280],[0,0,.27,.15,.18,.1,7662017],[0,.08,-.06,.027,.23,.26,3304615],[0,-.075,.05,.31,.034,.12,4241611],[-.108,.044,.2,.023,.062,.058,Xs],[.108,.044,.2,.023,.062,.058,Xs],[-.121,.057,.221,.009,.018,.018,ua],[.121,.057,.221,.009,.018,.018,ua]],tail:[[0,0,-.052,.115,.105,.12,5561532],[0,0,-.157,.047,.24,.115,3574715],[0,.106,-.208,.026,.095,.095,3781327],[0,-.106,-.208,.026,.095,.095,3781327]],tailOffset:-.215},amber:{body:[[0,0,.055,.245,.285,.36,15366194],[0,.085,.035,.195,.168,.29,16560459],[0,-.083,.025,.19,.13,.32,16765548],[0,-.006,.246,.17,.2,.13,16750140],[0,0,.109,.25,.283,.069,16773073],[0,.169,-.01,.052,.146,.201,15647836],[0,-.035,.045,.33,.04,.16,16165948],[-.091,.047,.238,.027,.067,.058,Xs],[.091,.047,.238,.027,.067,.058,Xs],[-.107,.061,.26,.008,.019,.015,ua],[.107,.061,.26,.008,.019,.015,ua]],tail:[[0,0,-.049,.12,.126,.16,15901246],[0,0,-.142,.055,.257,.135,16566610],[0,.094,-.208,.032,.086,.082,16769168],[0,-.094,-.208,.032,.086,.082,16769168]],tailOffset:-.19},shark:{body:[[0,-.025,.18,.65,.41,1.1,5404820],[0,.092,.17,.58,.24,1.05,3166064],[0,-.204,.23,.54,.13,.98,13821919],[0,-.037,.725,.51,.317,.32,6654623],[0,-.027,.876,.366,.229,.18,7442341],[0,-.189,.712,.48,.054,.31,15135455],[0,-.138,.791,.45,.028,.27,2702165],[0,-.043,-.406,.52,.31,.34,5010832],[0,.265,.065,.105,.2,.37,4351108],[0,.381,-.011,.078,.114,.23,4550288],[-.41,-.111,.176,.225,.078,.34,4154241],[.41,-.111,.176,.225,.078,.34,4154241],[-.55,-.135,.108,.12,.057,.217,5405585],[.55,-.135,.108,.12,.057,.217,5405585],[-.249,.032,.772,.039,.106,.112,15332843],[.249,.032,.772,.039,.106,.112,15332843],[-.271,.03,.801,.025,.063,.064,Xs],[.271,.03,.801,.025,.063,.064,Xs],[-.326,-.033,.329,.018,.099,.043,3890809],[.326,-.033,.329,.018,.099,.043,3890809],[-.329,-.027,.416,.017,.106,.042,3890809],[.329,-.027,.416,.017,.106,.042,3890809]],tail:[[0,-.026,-.09,.3,.235,.34,5470869],[0,-.018,-.222,.09,.43,.18,4615563],[0,.177,-.281,.076,.227,.154,5405850],[0,.306,-.337,.065,.073,.106,7641003],[0,-.185,-.282,.073,.13,.12,5537175]],tailOffset:-.58}};function Vf(i){const t=i.map(([n,s,r,o,a,c,l])=>{const h=new Sn(o,a,c);h.translate(n,s,r);const u=new qt(l),f=new Float32Array(h.attributes.position.count*3);for(let d=0;d<f.length/3;d+=1)u.setHex(l).multiplyScalar(PM[Math.floor(d/4)]).toArray(f,d*3);return h.setAttribute("color",new an(f,3)),h}),e=cp(t);for(const n of t)n.dispose();return e}function ol(i,t,e,n){return i.get(Math.floor(t),Math.floor(e),Math.floor(n))===kh}function yn(i,t,e){const{radius:n,vertical:s}=vp[e],r=Math.floor(t.y+s+.14);for(let o=Math.floor(t.y-s);o<=r;o+=1)for(let a=Math.floor(t.z-n);a<=Math.floor(t.z+n);a+=1)for(let c=Math.floor(t.x-n);c<=Math.floor(t.x+n);c+=1)if(i.get(c,o,a)!==kh)return!1;return!0}function IM(i){const{x:t,z:e}=i.spawn(),n=Math.floor(t),s=Math.floor(e),r=[],o=new U,a=[Rn-.5,Rn+.44,Rn-1.5,Rn-2.5],c=(l,h)=>{if((l+h)%2!==0)return;const u=n+l,f=s+h;for(const d of a)if(i.get(u,Math.floor(d),f)===kh&&(o.set(u+.5,d,f+.5),!(!yn(i,o,"jade")&&!yn(i,o,"amber")))){r.push(o.clone());return}};for(let l=2;l<=61;l+=1){for(let h=-l;h<=l;h+=1)c(h,-l),c(h,l),Math.abs(h)!==l&&(c(-l,h),c(l,h));if(r.length>=96&&r.some(h=>yn(i,h,"shark")))break}return r.sort((l,h)=>Math.hypot(l.x-t,l.z-e)-Math.hypot(h.x-t,h.z-e)),r}function Gf(i,t,e,n){const s=e.filter(c=>yn(i,c,t)),r=s.find(c=>n.every(l=>l.distanceToSquared(c)>5))??s[0];if(!r)return[];const o=s.filter(c=>c.distanceToSquared(r)<=85);o.sort((c,l)=>c.distanceToSquared(r)-l.distanceToSquared(r));const a=[];for(const c of o)if(!n.some(l=>l.distanceToSquared(c)<1.3)&&(n.push(c),a.push(c),a.length===5))break;return a}class UM{constructor(t,e,n=!1){if(this.world=t,this.scene=e,this.defeated=n,t.stage==="flat")return;const s=IM(t),r=[],o=s.find(a=>yn(t,a,"shark"));o&&r.push(o),o&&!this.defeated&&(this.shark=this.addSchool("shark",[o])[0],this.sharkMaterial=this.shark.model.children[0].material),this.addSchool("jade",Gf(t,"jade",s,r)),this.addSchool("amber",Gf(t,"amber",s,r))}world;scene;fish=[];materials=new Set;geometries=new Set;events=[];target=new U;step=new U;ray=new Ah;bitePoint=new U;rayHit=new U;sharkBox=new Gi(new U(-.61,-.27,-1.03),new U(.61,.45,1));shark;sharkMaterial;playerHealth=ha;enemyHealth=ha;biteCooldown=0;attackCooldown=0;immunity=0;hitFlash=0;timeSinceBite=0;fade=0;chasing=!1;defeated;get health(){return Math.ceil(this.playerHealth)}get sharkHealth(){return this.defeated?0:this.shark?this.enemyHealth:null}get sharkDefeated(){return this.defeated}get hasAquaticLife(){return this.fish.length>0}addSchool(t,e){if(!e.length)return[];const n=DM[t],s=Vf(n.body),r=Vf(n.tail),o=new Wi({vertexColors:!0,toneMapped:!1});return this.geometries.add(s).add(r),this.materials.add(o),e.map((a,c)=>{const l=Yt(Math.floor(a.x),Math.floor(a.z),this.world.salt^(c+1)*213)*Math.PI*2,h=new fs;h.name="aquatic-"+t,h.userData.species=LM[t],h.position.copy(a),h.rotation.y=l;const u=new Ce(r,o);u.position.z=n.tailOffset,h.add(new Ce(s,o),u),this.scene.add(h);const f={kind:t,model:h,tail:u,home:a,destination:a.clone(),phase:l,waypoint:c,nextTurn:0};return this.fish.push(f),f})}consumeEvent(){return this.events.shift()??null}resetHealth(){this.playerHealth=ha,this.immunity=3,this.timeSinceBite=0,this.chasing=!1,this.events.length=0}swimmerPoint(t){return this.bitePoint.set(t.x,t.y+.18,t.z),ol(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)||(this.bitePoint.y=t.y+1),ol(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)}openWaterLine(t,e){const n=Math.ceil(t.distanceTo(e)/.22);for(let s=1;s<n;s+=1)if(this.step.lerpVectors(t,e,s/n),!ol(this.world,this.step.x,this.step.y,this.step.z))return!1;return!0}canAttack(t){const e=this.shark;if(!e||this.defeated||!e.model.visible||this.health<=0||!this.swimmerPoint(t))return!1;const n=e.model.position,s=this.ray.origin.set(t.x,t.y+Ms(t),t.z).sub(n);if(s.lengthSq()>(rl+1.2)**2)return!1;const r=this.ray.direction.set(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch)),o=-e.model.rotation.y,a=(f,d)=>f*Math.cos(o)+d*Math.sin(o),c=(f,d)=>-f*Math.sin(o)+d*Math.cos(o);s.set(a(s.x,s.z),s.y,c(s.x,s.z)),r.set(a(r.x,r.z),r.y,c(r.x,r.z));const l=this.ray.intersectBox(this.sharkBox,this.rayHit);if(!l)return!1;const h=this.sharkBox.containsPoint(s)?0:l.distanceTo(s);if(h>rl)return!1;const u=Gn(this.world,t,rl);return!u||u.distance>h+.055}attack(t){return this.canAttack(t)?(this.attackCooldown>0||(this.attackCooldown=.34,this.hitFlash=.22,this.enemyHealth=Math.max(0,this.enemyHealth-25),this.enemyHealth===0?(this.defeated=!0,this.fade=.7,this.events.push("サメを倒しました！")):this.events.push("サメにヒット！ 残り体力 "+this.enemyHealth)),!0):!1}update(t,e){const n=Math.min(.1,e);if(!Number.isFinite(n)||n<=0)return;this.attackCooldown=Math.max(0,this.attackCooldown-n),this.biteCooldown=Math.max(0,this.biteCooldown-n),this.immunity=Math.max(0,this.immunity-n),this.hitFlash=Math.max(0,this.hitFlash-n),this.timeSinceBite+=n;const s=this.swimmerPoint(t);!s&&this.timeSinceBite>=3&&this.playerHealth>0&&(this.playerHealth=Math.min(ha,this.playerHealth+20*n)),this.sharkMaterial&&this.sharkMaterial.color.setHex(this.hitFlash>.01?16756823:16777215);for(const r of this.fish){if(r===this.shark&&this.defeated){this.fade=Math.max(0,this.fade-n),r.model.visible=this.fade>0,r.model.scale.setScalar(this.fade/.7),r.model.rotation.z=(1-this.fade/.7)*1.8;continue}const o=r.model.position;if(r.model.visible=o.distanceToSquared(this.target.set(t.x,t.y,t.z))<62**2&&yn(this.world,o,r.kind),!r.model.visible){yn(this.world,r.home,r.kind)&&o.copy(r.home);continue}const a=r===this.shark&&s&&this.health>0&&this.immunity<=0&&o.distanceToSquared(this.bitePoint)<CM**2&&r.home.distanceToSquared(this.bitePoint)<19**2&&this.openWaterLine(o,this.bitePoint);r===this.shark&&(a&&!this.chasing&&this.events.push("サメがこちらに向かっています！"),this.chasing=a,a&&o.distanceToSquared(this.bitePoint)<RM**2&&this.biteCooldown<=0&&(this.biteCooldown=1.4,this.timeSinceBite=0,this.playerHealth=Math.max(0,this.playerHealth-20),this.events.push(this.health>0?"サメにかまれた！ 体力 "+this.health:"体力がなくなりました。"))),r.nextTurn-=n,a?(this.target.copy(this.bitePoint),yn(this.world,this.target,r.kind)||(this.target.y=o.y)):((r.nextTurn<=0||o.distanceToSquared(r.destination)<.2)&&this.swimWaypoint(r),this.target.copy(r.destination)),this.swim(r,this.target,n,a?2.7:vp[r.kind].speed),r.phase+=n*(a?9.3:5.8),r.tail.rotation.y=Math.sin(r.phase)*(a?.37:.27),r.model.rotation.z=Math.sin(r.phase*.57)*.035}}swimWaypoint(t){t.nextTurn=1.4+t.waypoint%5*.23;for(let e=0;e<8;e+=1){const n=this.world.salt^Math.floor(t.home.x*276+t.home.z*61),s=++t.waypoint,r=Yt(s,939,n)*Math.PI*2,o=1+Yt(s,817,n)*(t.kind==="shark"?5:3.5);if(this.step.set(t.home.x+Math.cos(r)*o,t.home.y+(Yt(s,794,n)-.5)*.84,t.home.z+Math.sin(r)*o),yn(this.world,this.step,t.kind)){t.destination.copy(this.step);return}}t.destination.copy(t.home)}swim(t,e,n,s){const r=t.model.position,o=e.x-r.x,a=e.y-r.y,c=e.z-r.z,l=Math.hypot(o,a,c);if(l<.075)return;const h=Math.min(1,n*s/l);if(this.step.set(r.x+o*h,r.y+a*h,r.z+c*h),!yn(this.world,this.step,t.kind)&&(this.step.y=r.y,!yn(this.world,this.step,t.kind)&&(this.step.x=r.x,!yn(this.world,this.step,t.kind)&&(this.step.x=r.x+o*h,this.step.z=r.z,!yn(this.world,this.step,t.kind)))))return;const u=Math.atan2(this.step.x-r.x,this.step.z-r.z)-t.model.rotation.y;t.model.rotation.y+=Math.atan2(Math.sin(u),Math.cos(u))*Math.min(1,n*7),r.copy(this.step)}dispose(){for(const t of this.fish)t.model.removeFromParent();for(const t of this.geometries)t.dispose();for(const t of this.materials)t.dispose()}}const ch=8,Yr=St/ch,NM={minX:0,maxX:St,minZ:0,maxZ:St};function FM(i,t,e){const n=[0,0,0],s=Yr/4;for(let r=s/2;r<Yr;r+=s)for(let o=s/2;o<Yr;o+=s){const a=t+o,c=e+r,l=i.highest[a+c*St],h=i.get(a,l,c),u=i.get(a,Rn,c)===13,f=u?[63,126,140]:h===4?[177,157,101]:h===5||h===6?[55,101,70]:[102,132,76],d=u?0:Math.ceil((l-30)*.9);for(let g=0;g<3;g++)n[g]+=f[g]+d}return"rgb("+n.map(r=>Math.round(r/16)).join(",")+")"}function kM(i,t,e,n){const s=i.get(t,e-1,n),r=i.get(t,e+1,n),o=i.get(t,e,n);return r&&r!==10?"#29444e":r===10?"#66b6c1":o?"#8b6b51":s?s===5||s===7?"#d9ad72":s===1||s===6?"#8baa70":"#b8b7a3":"#263f46"}class zM{constructor(t,e,n){this.canvas=t,this.levelLabel=n,this.context=t.getContext("2d"),this.school=e.stage==="school",this.bounds=this.school?ad:NM,this.columns=this.school?6:ch,this.rows=this.school?5:ch,this.counts=new Uint8Array(this.columns*this.rows),this.drawnCounts=new Uint8Array(this.counts.length),this.terrain=this.school?ms.map(s=>this.drawBase(e,s)):[this.drawBase(e)],n&&(n.hidden=!this.school)}canvas;levelLabel;terrain;context;bounds;columns;rows;school;counts;drawnCounts;drawnSelf=-2;drawnFloor=-1;drawBase(t,e){const n=this.canvas.ownerDocument.createElement("canvas");n.width=this.canvas.width,n.height=this.canvas.height;const s=n.getContext("2d");if(!s)return n;const r=n.width/this.columns,o=n.height/this.rows;if(e!==void 0){const{minX:a,maxX:c,minZ:l,maxZ:h}=this.bounds,u=n.width/(c-a),f=n.height/(h-l);for(let d=l;d<h;d++)for(let g=a;g<c;g++){const v=Math.round((g-a)*u),p=Math.round((d-l)*f);s.fillStyle=kM(t,g,e,d),s.fillRect(v,p,Math.round((g+1-a)*u)-v,Math.round((d+1-l)*f)-p)}}else for(let a=0;a<this.rows;a++)for(let c=0;c<this.columns;c++)s.fillStyle=FM(t,c*Yr,a*Yr),s.fillRect(c*r,a*o,r,o);s.strokeStyle=this.school?"#e8f4ce65":"#153b3666",s.lineWidth=1,s.beginPath();for(let a=1;a<this.columns;a++)s.moveTo(a*r+.5,0),s.lineTo(a*r+.5,n.height);for(let a=1;a<this.rows;a++)s.moveTo(0,a*o+.5),s.lineTo(n.width,a*o+.5);return s.stroke(),n}zoneAt({x:t,z:e}){const{minX:n,maxX:s,minZ:r,maxZ:o}=this.bounds;return!Number.isFinite(t)||!Number.isFinite(e)||t<n||e<r||t>=s||e>=o?-1:Math.floor((t-n)*this.columns/(s-n))+this.columns*Math.floor((e-r)*this.rows/(o-r))}floorAt({y:t}){return this.school&&t>=(ms[0]+ms[1])/2?1:0}update(t,e,n){const s=this.context;if(!s)return;const r=this.zoneAt(e),o=this.floorAt(e);let a=0;if(this.counts.fill(0),n)for(const{pose:h}of t){if(this.floorAt(h)!==o){a++;continue}const u=this.zoneAt(h);u>=0&&this.counts[u]++}if(this.school&&this.levelLabel){const h="校舎 "+(o+1)+"階"+(a?"　別の階に "+a+"人":"");this.levelLabel.textContent!==h&&(this.levelLabel.textContent=h)}if(r===this.drawnSelf&&o===this.drawnFloor&&this.counts.every((h,u)=>h===this.drawnCounts[u]))return;this.drawnSelf=r,this.drawnFloor=o,this.drawnCounts.set(this.counts);const c=this.canvas.width/this.columns,l=this.canvas.height/this.rows;if(s.clearRect(0,0,this.canvas.width,this.canvas.height),s.globalAlpha=this.school?.72:.53,s.drawImage(this.terrain[o],0,0),s.globalAlpha=1,r>=0){const h=r%this.columns*c,u=Math.floor(r/this.columns)*l;s.fillStyle="#cef9ff4d",s.fillRect(h,u,c,l),s.strokeStyle="#d7f9ff",s.lineWidth=3,s.strokeRect(h+2,u+2,c-4,l-4)}s.font="800 24px system-ui,sans-serif",s.textAlign="center",s.textBaseline="middle",this.counts.forEach((h,u)=>{if(!h)return;const f=(u%this.columns+.5)*c,d=(Math.floor(u/this.columns)+.5)*l;s.beginPath(),s.arc(f,d,Math.min(c,l)*.34,0,Math.PI*2),s.fillStyle="#ffe292",s.fill(),s.strokeStyle="#4b4225",s.lineWidth=2,s.stroke(),s.fillStyle="#263025",s.fillText(String(h),f,d+1)})}}const Mi=document.querySelector("#scene"),$e=document.querySelector("#hud"),OM=$e.querySelector("#tag-map-canvas"),BM=$e.querySelector("#tag-map-level"),zh=$e.querySelector("#touch-controls"),Wf=$e.querySelector("#touch-fly"),HM=$e.querySelector("#life-status"),VM=$e.querySelector("#shark-status"),Xf=$e.querySelector("#life-health"),qf=$e.querySelector("#shark-health"),GM=$e.querySelector("#life-health-number"),WM=$e.querySelector("#shark-health-number"),al=$e.querySelector("#touch-attack"),fa=$e.querySelector("#touch-rotate"),lh={stick:$e.querySelector("#move-stick"),jump:$e.querySelector("#touch-jump"),down:$e.querySelector("#touch-down")};Mi.tabIndex=-1;const Vi=new Jy,Ge=new Dy,V=new Sy((i,t)=>{qh(i,t).catch(e=>V.toast(ni(e)))}),XM=["localhost","127.0.0.1","[::1]"].includes(location.hostname),Ga=new lM(XM?location.origin:"https://tk777-neonshift-scores.takesuke.chatgpt.site"),hh=(new URLSearchParams(location.search).get("room")??"").trim().toUpperCase();let oe=null,Ui="y",zi=0,jr=0,cl=0,wa=0;const _p=["北","東","南","西"];let uh="";const Oh=()=>Ge.configure(Fe.volume,Fe.muted,Fe.effectsVolume,Fe.ambientVolume);let I=null,Fe=jy();const qM="tk777.webcraft.look",xp="tk777.webcraft.controls",yp="tk777.webcraft.view";function YM(){try{return localStorage.getItem(yp)==="kids"}catch{return!1}}function Mp(){const i=window.matchMedia("(pointer: coarse)").matches;return{coarse:i,touch:i||navigator.maxTouchPoints>0,mac:/^Mac/i.test(navigator.platform)}}function bp(){const i=Mp();try{return wf(localStorage.getItem(xp),localStorage.getItem(qM),i)}catch{}return wf(null,null,i)}let Pn=!1,Kr=!1,Te=bp(),Bh=!1;function Hh(){return Te==="lock"?Mp().touch?"tablet":"drag":Te}let Ta="",Aa=0,Oi=0,Zr=0,ll=Promise.resolve(!0),sr=0,Ys=0,Vr=0,Bi="",Yf=50,Xi=!1,fr=!1;try{Xi=!!Mi.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"})}catch{}const Vh="WebGL 2を利用できません。ChromeまたはEdgeのハードウェア アクセラレーションを有効にして、ブラウザーを再起動してください。";function ni(i){return i instanceof DOMException?i.name==="QuotaExceededError"?"ブラウザーの保存容量が不足しています。ファイルへ書き出してバックアップしてください。":i.name==="SecurityError"||i.name==="NotAllowedError"?"ブラウザーのサイト設定で、このページのローカル保存を許可してください。":"保存領域にアクセスできませんでした。他のタブを閉じ、空き容量を確認してください。":i instanceof Error&&/[ぁ-龯]/u.test(i.message)?i.message:"処理を完了できませんでした。ページを開き直してお試しください。"}function Sp(i){return{generator:i.world.generator,bench:oe?.id===21&&i.world.get(oe.x,oe.y,oe.z)===21,frontier:!!i.frontier}}function yo(i,t){return!!Jt[i]?.block&&i!==22&&(i!==21||t==="explore")}function tc(i){return!!i.online?.pendingExplore}function uo(){const i=I,t=xy(i.data.bag,i.data.mode,i.data.selected,Sp(i));return i.online&&i.data.mode==="creative"&&(t.items=t.items.filter(e=>yo(e.id,"creative"))),i.online&&i.data.mode==="explore"&&(t.recipes=t.recipes.filter(e=>e.id!=="chest")),oe?.id===21&&(t.benchUses=i.world.benchUses(oe.x,oe.y,oe.z)),oe?.id===22&&(t.chest=i.world.chestAt(oe.x,oe.y,oe.z),i.data.mode==="creative"&&(t.palette=t.items,t.items=i.data.bag.slots.map(e=>({...e,name:Jt[e.id].name,maxDurability:Jt[e.id].maxDurability})))),t}function dr(){if(!I)return;if(I.online?.tagGame){V.expedition("","","");return}const{world:i,data:t,player:e}=I,n=t.journey,s=i.landmarks.find(o=>o.kind==="cave");if(I.frontier){const o=!n.toolMade&&t.mode==="explore",a=o?"林で原木を集め、町の作業台で道具を作れます。":"空き区画に家を建てられます。",l=hd.map(u=>({x:(u.minX+u.maxX)/2,y:ld+1,z:(u.minZ+u.maxZ)/2})).reduce((u,f)=>Math.hypot(u.x-e.x,u.z-e.z)<=Math.hypot(f.x-e.x,f.z-e.z)?u:f),h=(o?"作業場 ":"建築区画 ")+hl(o?pa.workbench:l,e);V.expedition(n.hidden?"":a,rc(n,e),n.hidden?"":h);return}if(i.stage!=="classic"){const o=n.toolMade?"石を集め、作業台で石の道具や建材を作ろう":"支給された原木で、木材と棒を作って道具を作ろう";V.expedition(t.mode==="explore"&&!n.hidden?o:"",rc(n,e),"");return}const r=i.landmarks.find(o=>Math.hypot(o.x-e.x,o.z-e.z)<12);r&&r.kind!==uh&&yt.active&&V.toast(r.name+"　"+{grove:"大樹の根元で建築用の原木を採れます。",cave:"坑道の壁に潮晶の鉱脈があります。",ruin:"回廊の床には持ち帰れる象眼タイルがあります。"}[r.kind]),uh=r?.kind??"",V.expedition(t.mode==="explore"&&!n.hidden?vm(n,i.generator):"",rc(n,e),t.mode==="explore"&&!n.hidden&&n.toolMade&&!n.caveVisited&&s?"岩窟 "+hl(s,e):"")}function Ep(i,t=!1){if(!I||!yt.active||I.online?.tagGame)return!1;if(I.online&&I.data.mode==="creative")return t&&V.toast("共同建築ルームでは、建材を自由に選んで建築できます。"),!1;const e=I.frontier?.interact(I.player)??I.land?.interact(I.player);return e?(V.toast(e),!0):!i||!(i.id===21||i.id===22&&!I.online)?(t&&V.toast(I.online?"作業台に照準を合わせてください。":I.land?"住民・動物・作業台・チェストに照準を合わせてください。":"作業台かチェストに照準を合わせてください。"),!1):(oe=i,bi(),V.inventory(uo()),!0)}function jM(){if(!I||I.online?.tagGame)return;if(tc(I)){V.toast("素材の変更を確認しています。少し待ってください。");return}const{world:i,player:t,data:e}=I,n=Gn(i,t);if(!n){V.toast("選びたい建材に照準を合わせてください。");return}if(I.online&&!yo(n.id,e.mode)){V.toast("このブロックは共有ワールドで使えません。");return}const s=qa(n.id),r=e.bag.hotbar.indexOf(s);if(e.mode==="explore"&&!bn(e.bag,s)){V.toast("この建材は所持品にありません。");return}if(s===_i&&(zi=n.id-_i),r>=0){fo(r);return}Jf(e.bag,e.selected,s,e.mode)?(Vn(),V.toast(Jt[s].name+"を選びました。")):V.toast("このブロックは選択できません。")}function KM(){if(!I||I.online?.tagGame)return;if(I.online){V.toast("共同建築では、置いたブロックを採掘して取り除けます。");return}if(I.data.mode!=="creative"){V.toast("元に戻す操作はクリエイティブで使えます。");return}const i=I,t=i.world.undo((e,n,s)=>xo(i.player,e,n,s));He(),V.toast(t.message)}function Vn(){I&&(V.screen==="inventory"?V.inventory(uo()):V.screen==="play"&&V.hud(uo()))}function He(){Ta="",Aa=0,jr=0,wa=0,V.mining(0)}function Gh(i){i!==Yf&&(Yf=i,$e.style.setProperty("--aim-y",i+"%"))}function wp(){const i=I;if(!(!i||!["play","pause","ready"].includes(V.screen))){i.kids?(i.kidsPitch=i.player.pitch,i.player.pitch=i.originalPitch):(i.originalPitch=i.player.pitch,i.player.pitch=i.kidsPitch),i.kids=!i.kids,yt.rememberView(i.player),yt.mining=!1,yt.cancelPlacementTap(),He(),Oi=0,i.view.kidsCamera.reset(),Gh(50),Bi="",V.showViewMode(i.kids);try{localStorage.setItem(yp,i.kids?"kids":"original")}catch{}}}function fo(i){!I||I.online?.tagGame||!Number.isInteger(i)||i<0||i>8||(I.data.selected=i,He(),Vn(),Ca(I))}function bi(){yt.stop(),I&&nh(I.player),Ge.setPlaying(!1),He(),Oi=0,Zr=0,sr=0}function ec(){!I||!yt.active||(bi(),V.pause(!1,Te))}function Tp(){!I||!yt.active||I.online?.tagGame||(oe=null,bi(),V.inventory(uo()))}function Ap(i){const t=i&&Te==="tablet";zh.hidden=!t,Wf.hidden=I?.data.mode!=="creative"||!!I.online?.tagGame;const e=!!I?.player.flying;return Wf.setAttribute("aria-pressed",String(e)),lh.jump.textContent=e?"上昇":"ジャンプ",lh.down.textContent=e?"下降":"しゃがむ",t}function Rp(i){if(!I||!yt.active)return;i&&Te==="lock"&&(Te=Hh());const t=I.online?.tagGame;if(t&&!t.started){const{x:e,z:n}=I.player;t.peers.some(({pose:s})=>Math.hypot(e-s.x,n-s.z)<=1.2)&&zp(I,t.peers),t.started=!0}V.play(i,Bh,yt.pending,Ap(i)),V.hud(uo()),dr()}function Ra(i){if(!(!I||!["ready","pause","inventory"].includes(V.screen))){if(!Xi){V.pause(!1,Te,"描画の復旧を待っています。ワールドを書き出すこともできます。");return}if(I.online&&(!I.online.ready||I.online.ended)){V.toast(I.online.ended?"退出してルームに参加し直してください。":"共有ワールドの読み込みが完了するまでお待ちください。");return}oe=null,Bh=!I.data.guideSeen&&!I.online?.tagGame,Te=i,fr=!1,sr=0,Ys=0,Vr=0,Ge.unlock(),Ge.setPlaying(!0),yt.start(i!=="lock"),yt.pending&&Rp(!1)}}function ZM(i,t){I&&yt.applyLook(I.player,i,t,Fe.sensitivity,Fe.invertY)}const $r={conflict:"ほかの人が先にこの場所を変更しました。照準を合わせ直してください。",range:"ブロックにもう少し近づいてください。",blocked:"ここは設置・採掘できません。建材や人が重なっていない場所を選んでください。",limit:"このルームで共有できるブロック変更数に達しました。",uncertain:"通信を確認しています。建築の結果が画面に反映されるまでお待ちください。",offline:"接続が戻ると建築できます。",invalid:"編集内容を共有できませんでした。照準を合わせ直してください。"};function Cp(i,t,e){const{key:n,block:s,before:r}=t,o=n&255,a=n>>>16,c=n>>>8&255,l=s===0,h=l?r:s;i.view.effect(o,a,c,h,l?"mine":"place"),Ge.sound(l?"mine":"place",h),l&&i.data.mode==="explore"&&Ge.sound("pickup"),!l&&i.data.mode==="explore"&&md(i.data.journey,h,{x:o,y:a,z:c})&&dr(),V.toast(e??Jt[h].name+(l?"を取り除きました。":"を置きました。"))}function Wh(i){const t=i.online,e=t?.pendingExplore;!t?.sync||!e||t.editing||t.ended||t.state!=="connected"||(t.editing=!0,t.sync.edit(e.edit).then(n=>{if(I===i){if(!n.ok&&!["conflict","range","blocked","limit","invalid"].includes(n.reason??"")){n.reason==="uncertain"&&V.toast($r.uncertain);return}t.pendingExplore=void 0,n.ok?(i.data.bag=e.after,Cp(i,e.edit,e.message),Vn()):V.toast($r[n.reason??""]??$r.invalid),un(i)}}).catch(n=>{I===i&&V.toast(ni(n))}).finally(()=>{t.editing=!1}))}function Pp(i,t,e,n,s,r="y",o,a){const c=i.online;if(!c?.ready||c.ended||c.state!=="connected"||!c.sync){V.toast($r.offline);return}if(c.editing||c.pendingExplore)return;const l=i.world.get(t,e,n),h=we(t,e,n),u={key:h,before:l,fromRevision:c.versions.get(h)??0,block:s,axis:r};if(o){c.pendingExplore={edit:{...u,actionId:crypto.randomUUID()},after:o,message:a},un(i),Wh(i);return}c.editing=!0,c.sync.edit(u).then(f=>{if(I===i){if(!f.ok){V.toast($r[f.reason??""]??"共同建築の変更を確認できませんでした。");return}Cp(i,u)}}).catch(f=>{I===i&&V.toast(ni(f))}).finally(()=>{c.editing=!1})}function Lp(){if(!I||!yt.active||I.online?.tagGame)return;const{world:i,player:t,data:e,view:n}=I,s=Gn(i,t);if(Wa()||!t.crouched&&Ep(s))return;if(s&&(I.land?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz)||I.frontier?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz))){V.toast("住民や動物がいる場所には置けません。");return}const r=s&&e.mode==="creative"?i.capture(s.x+s.nx,s.y+s.ny,s.z+s.nz):null,o=e.bag.hotbar[e.selected],a=o===_i?_i+zi:o;if(I.online){if(tc(I))return;const l=Nh(i,t,e.bag,e.mode,e.selected,s);if(l||!s){V.toast(l??"設置したい面に照準を合わせてください。");return}if(!yo(o,e.mode)){V.toast("共有ワールドで使える建材を選んでください。");return}const h=e.mode==="explore"?structuredClone(e.bag):void 0;if(h&&!sd(h,o))return;Pp(I,s.x+s.nx,s.y+s.ny,s.z+s.nz,a,o===5?Ui:"y",h),He();return}const c=cy(i,t,e.bag,e.mode,e.selected,s,a);if(c.ok&&s){const l=s.x+s.nx,h=s.y+s.ny,u=s.z+s.nz;o===5&&i.setAxis(l,h,u,Ui),r&&i.remember(r),e.mode==="explore"&&md(e.journey,o,{x:l,y:h,z:u})&&dr(),n.effect(l,h,u,o,"place"),Ge.sound("place",o),Vn(),He()}V.toast(c.message)}function Dp(){!I||!yt.active||I.online?.tagGame||(I.data.bag.hotbar[I.data.selected]===_i?(zi=(zi+1)%4,V.toast("滑り台の下り方向　"+_p[zi])):(Ui=Ui==="y"?"x":Ui==="x"?"z":"y",V.toast("原木の向き　"+{x:"東西",y:"縦",z:"南北"}[Ui])))}function Xh(i){if(!I||!yt.active||I.online?.tagGame)return;const{world:t,player:e,data:n,view:s}=I,r=Gn(t,e);if(!yt.mining||!r){Ta&&He();return}if(Oi>0||I.online?.editing||tc(I))return;const o=[r.x,r.y,r.z,r.id,n.selected].join("/");if(o!==Ta&&(He(),Ta=o),r.id===14){V.toast("岩盤は掘れません。"),yt.mining=!1,He();return}const a=n.bag.hotbar[n.selected],c=n.mode==="creative"||bn(n.bag,a)?a:0,l=Zp(r.id,c,n.mode);if(!Number.isFinite(l)){V.toast("この素材にはツルハシが必要です。"),yt.mining=!1,He();return}if(Aa+=i,jr=Math.min(1,Aa/l),V.mining(jr),wa-=i,wa<=0&&i>0&&jr<.96&&(Ge.sound("tap",r.id),wa=.32),Aa<l&&!(n.mode==="creative"&&i===0))return;if(I.online){if(!yo(r.id,n.mode)){V.toast("このブロックは共有ワールドで取り除けません。"),yt.mining=!1,He();return}const f=n.mode==="explore"?id(n.bag,r.id,c):void 0;if(f&&!f.draft){V.toast(f.message),yt.mining=!1,He();return}I.online.state!=="connected"&&(yt.mining=!1),Pp(I,r.x,r.y,r.z,0,"y",f?.draft,f?.message),He(),Oi=.15;return}const h=n.mode==="creative"?t.capture(r.x,r.y,r.z):null,u=ay(t,e,n.bag,n.mode,n.selected,r);u.ok?(h&&t.remember(h),s.effect(r.x,r.y,r.z,r.id,"mine"),Ge.sound(u.message.includes("壊れ")?"break":"mine",r.id),n.mode==="explore"&&Ge.sound("pickup"),Vn()):yt.mining=!1,V.toast(u.message),He(),Oi=n.mode==="creative"?.15:.11}function Ip(){if(!I||!yt.active||I.online?.tagGame)return;const{player:i,data:t}=I;if(t.mode!=="creative"){V.toast("飛行はクリエイティブモードで使えます。");return}i.flying=!i.flying,i.vy=0;const e=Ap(yt.drag);V.toast(i.flying?e?"飛行中：上昇・下降ボタンで高さを変えられます。":"飛行中：Spaceで上昇、Ctrlで下降":"飛行を終了しました。")}function fh(){const i=I,t=i?.aquatic;return!i||!t||!yt.active||!t.attack(i.player)?!1:(yt.mining=!1,He(),t.sharkDefeated&&!i.data.sharkDefeated&&(i.data.sharkDefeated=!0,un(i)),!0)}function Wa(){const i=I,t=i?.frontier;if(!i||!t||!yt.active)return!1;const{player:e,data:n}=i,s=n.bag.hotbar[n.selected],r=Kn;if(!po(s))return!1;yt.mining=!1,He();const o=s===r.revolver?r.rounds:s===r.torch?r.torch:r.fireArrow;if(n.mode==="explore"){if(!bn(n.bag,s))return V.toast("道具を持っていません。"),!0;if(o===r.fireArrow&&!bn(n.bag,r.bow))return V.toast("火矢を使うには弓が必要です。"),!0;if(!bn(n.bag,o))return V.toast(Jt[o].name+"がありません。"),!0}const a=t.action(e,s===r.bow?r.fireArrow:s);return a.ok&&(n.mode==="explore"&&rd(n.bag,o),Ge.sound(s===r.revolver?"break":"place"),Vn(),un(i)),a.message&&V.toast(a.message),!0}function $M(i){const t=i.world.spawn();let e;try{e=lo(i.world,t)}catch{e=lo(i.world,{...t,y:Rn+3})}Object.assign(i.player,Uh({...e,pitch:i.kids?i.kidsPitch:e.pitch})),i.kids||(i.originalPitch=i.player.pitch),yt.reset(),yt.rememberView(i.player),He(),Oi=0,i.view.kidsCamera.reset(),i.aquatic?.resetHealth(),i.frontier?.restoreHealth(),V.toast((i.frontier?"町の入口":"岸")+"に戻りました。持ち物は引き継がれています。")}function Up(i,t){const e=i.aquatic,n=i.frontier?.health??e?.health??100,s=e?.sharkHealth??100,r=!!i.frontier||!!e?.hasAquaticLife&&(i.player.inWater||n<100);HM.hidden=!r&&!t,VM.hidden=!t;const o=!!i.frontier&&po(i.data.bag.hotbar[i.data.selected]);al.hidden=!yt.active||!yt.drag||!t&&!o;const a=o?"使う":"攻撃";al.textContent!==a&&(al.textContent=a),Xf.value!==n&&(Xf.value=n,GM.textContent=String(n)),qf.value!==s&&(qf.value=s,WM.textContent=String(s))}const yt=new Ay(Mi,{pause:ec,inventory:Tp,place:Lp,select:fo,look:ZM,beginMine:()=>{!Wa()&&!fh()&&Xh(0)},pick:jM,undo:KM,viewMode:wp,tagMap:kp,attack:()=>{!Wa()&&!fh()&&I?.aquatic&&V.toast("近くのサメに照準を合わせてください。")},rotate:Dp,interact:()=>{I&&Ep(Gn(I.world,I.player),!0)},home:()=>{if(I){const{x:i,y:t,z:e}=I.player;I.data.journey.home={x:i,y:t,z:e},dr(),V.toast("現在地を拠点に登録しました。")}},guide:()=>{I&&(I.data.journey.hidden=!I.data.journey.hidden,dr())},cycle:i=>{I&&fo((I.data.selected+i+9)%9)},fly:Ip,debug:()=>{Kr=!Kr,Kr||V.debug("")},dragChanged:Rp,background:()=>{I&&un(I)},recovery:i=>{I&&(bi(),Te=Hh(),V.pause(!1,Te,i))}},lh);function Np(i){const{x:t,y:e,z:n,yaw:s,pitch:r}=i.player;return{...i.data,sharkDefeated:i.aquatic?.sharkDefeated??i.data.sharkDefeated,frontier:i.frontier?.save()??i.data.frontier,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:i.player.crouched},flying:i.player.flying,edits:i.world.exportEdits(),fixtures:i.world.exportFixtures(),journey:structuredClone(i.data.journey),settings:{...Fe},bag:structuredClone(i.data.bag)}}function un(i){if(i.online){if(i.data.mode==="explore"){const{x:t,y:e,z:n,yaw:s,pitch:r,crouched:o}=i.player;mM(i.online.connection.room.code,i.online.nickname,{bag:i.data.bag,selected:i.data.selected,journey:i.data.journey,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:o},pending:i.online.pendingExplore})}return Promise.resolve(!0)}return ll=ll.then(async()=>{if(i!==I)return!0;V.status("保存中…");try{const t=await Vi.write(Np(i),i.data.revision||null);return i.data.revision=t.revision,i.data.updatedAt=t.updatedAt,V.status("保存済み"),!0}catch(t){return V.status("保存失敗："+ni(t)),!1}}),ll}function Ca(i){if(i.online&&i.data.mode==="explore")return un(i)}async function Jr(){if(I){const i=I;if(bi(),i.online?.sync?.close(),!await un(i)&&!window.confirm("保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？")){V.pause(!1,Te);return}Fp(i),i.view.dispose(),I=null}V.onlineSession(null),V.title(!1);try{const i=await Vi.list();V.screen==="title"&&V.title(!!i.length)}catch(i){V.screen==="title"&&V.status("保存領域："+ni(i))}}function Fp(i){i.land?.dispose(),i.aquatic?.dispose(),i.frontier?.dispose()}function Pa(i){V.onlineSession({code:i.connection.room.code,count:i.count,state:i.state,stage:i.connection.room.stage,tagBots:i.connection.room.tagBots})}function nc(i,t=performance.now()){const e=i.online,n=e?.tagGame;if(!e||!n)return;const s=n.status,r=e.connection.id,o=s?.it===r,a=s?.phase==="hiding",c=s?.phase==="playing",l=s?.phase==="finished",h=(c||a&&!!s.previousIt)&&!!e.connection.room.tagMinutes&&s.enrolledIds&&!s.enrolledIds.includes(r),u=l?"試合終了":c||a?o?"鬼":h?"観戦中":"逃げ役":"参加者を待っています",f=s?.serverNow===void 0?Date.now():s.serverNow+Math.max(0,t-n.receivedAt);let d;if(a){const p=Math.max(0,Math.ceil((s.hideUntil-f)/1e3)),m=n.hideRemaining=Math.min(n.hideRemaining??p,p),_=!!s.previousIt,b=o?_?"タッチされた！ あなたが鬼":"あなたが鬼":s.previousIt===r?"タッチ成功！":_?"鬼が交代！":"あなたは逃げ役",y=o?"カウントが終わるまでその場で待とう。":h?"追いかけっこの再開を待っています。":s.previousIt===r?"逃げ役になりました。すぐに逃げて隠れよう。":"鬼が動き出す前に隠れよう。";d={remaining:m,title:b,detail:y}}if(l)n.remaining=0;else if((c||a)&&s.endsAt>0){const p=Math.max(0,Math.ceil((s.endsAt-(a?s.hideUntil:f))/1e3));n.remaining=a?p:Math.min(n.remaining??p,p)}const g=l||a?"":h?"結果を待っています":c?o?"逃げ役にぶつかるとタッチ":"鬼から逃げて隠れよう":e.connection.room.tagBots?"プレイ開始を押すとCPUと対戦できます":"2人以上で開始",v=[u,g,n.open,n.remaining,d?.remaining,d?.title].join("/");n.uiKey!==v&&(V.tagMode({label:u,hint:g,it:o,mapOpen:n.open,remaining:n.remaining,hide:d}),n.uiKey=v),n.open&&t>=n.mapDue&&(n.map.update(n.peers,i.player,c),n.mapDue=t+240)}function kp(){const i=I,t=i?.online?.tagGame;!i||!t||!yt.active||(t.open=!t.open,t.mapDue=0,nc(i))}function zp({world:i,player:t},e){for(const[n,s]of[[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,2],[2,-2]]){const r=lo(i,{...t,x:t.x+n,z:t.z+s});if(e.every(({pose:o})=>Math.hypot(r.x-o.x,r.z-o.z)>1.2)){Object.assign(t,{x:r.x,y:r.y,z:r.z});return}}}function JM(i,t,e){const{player:n,world:s}=i;let r=!1;for(const l of e.cells){const{key:h,block:u,axis:f,revision:d}=l;if((t.versions.get(h)??0)>=d)continue;const g=h&255,v=h>>>16,p=h>>>8&255;s.get(g,v,p)!==u&&s.set(g,v,p,u)&&Zn(u)&&xo(n,g,v,p)&&(r=!0),u===5&&s.setAxis(g,v,p,f),t.versions.set(h,d)}if(r){const{x:l,y:h,z:u}=lo(s,n,!0);Object.assign(n,{x:l,y:h,z:u,vy:0}),nh(n)}const o=e.players.filter(l=>l.id!==t.connection.id),a=t.tagGame;if(!t.ready&&!t.restoring&&!a&&o.length&&zp(i,o),a&&e.tag){const l=a.status,h=e.tag,u=t.connection.id;if(h.phase==="waiting"&&(a.remaining=void 0),(l?.phase!==h.phase||l.hideUntil!==h.hideUntil)&&(a.hideRemaining=void 0,a.mapDue=0),h.phase==="hiding"&&h.it===u&&(l?.phase!=="hiding"||l.it!==u)&&(nh(n),n.vy=0,Zr=0),a.status=h,a.receivedAt=performance.now(),a.peers=o,h.phase==="finished"&&l?.phase!=="finished"){a.open=!1,bi();const f=h.results.find(g=>g.id===h.it),d=h.results.filter(g=>g.id!==h.it).map(g=>g.nickname);V.tagResult({outcome:u===h.it?"lose":h.winnerIds.includes(u)?"win":"spectator",loser:f.nickname,winners:d,minutes:t.connection.room.tagMinutes})}else h.phase==="playing"&&l?.it!==h.it&&h.previousIt&&(h.it===u?V.toast("タッチされました！ あなたが鬼です。"):h.previousIt===u&&V.toast("タッチ成功！ 逃げ役になりました。"));nc(i)}const c=a?.status?.phase==="hiding"&&a.status.it===t.connection.id;i.view.actors.setPlayers(c?[]:o,a?.status?.it),t.count!==o.length+1&&(t.count=o.length+1,Pa(t)),t.ready=!0,Bi="",oe?.id===21&&s.get(oe.x,oe.y,oe.z)!==21&&(oe=null,Vn(),V.toast("作業台が取り除かれました。")),Wh(i)}function QM(i,t){Pa(t),t.sync=Ga.start(t.connection,{pose:()=>{if(I!==i||t.tagGame&&!t.tagGame.started)return null;const{x:e,y:n,z:s,yaw:r,crouched:o,flying:a,vx:c,vz:l}=i.player;return{x:e,y:n,z:s,yaw:r,crouched:o,flying:a,moving:Math.hypot(c,l)>.18}},onFrame:e=>{I===i&&JM(i,t,e)},onState:e=>{I===i&&(t.state=e,Pa(t),Wh(i))},onEnd:e=>{I!==i||t.tagGame?.status?.phase==="finished"||(t.ended=!0,t.state="reconnecting",Pa(t),bi(),V.pause(!1,Te,ni(e)))}})}async function da(i,t,e,n="",s=""){if(I||Pn)return;if(!Xi){V.error(Vh);return}Pn=!0;let r;try{e&&(V.loading("ルームに接続中…"),r=await e()),V.loading("ワールドを準備しています…");const o=i?await Vi.get(i):void 0;if(i&&!o)throw new Error("ワールドが見つかりません。一覧を開き直してください。");const a=r?.room.seed||o?.seed||t?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8),c=t?.stage,l=r?.room.stage??o?.stage??(Fh(c)?c:"classic");let h=-1;const u=await Ka.generate(a,y=>{const w=Math.min(10,Math.floor(y*10));h!==w&&(V.loading("地形を生成中　"+w*10+"%"),h=w)},r?.room.generator??o?.generator??2,l);o&&(u.loadEdits(o.edits),u.loadFixtures(o.fixtures));const f=u.spawn(),d=r?.room.mode==="tag",g=r?r.room.mode==="explore"?"explore":"creative":Ba(l)?t?.mode??o?.mode??"creative":"creative",v=r&&g==="explore"?pM(r.room.code,s):void 0,p=()=>r&&g==="explore"?uM(l):$f(d?"explore":g),m=o??{format:"webcraft777",version:2,generator:2,id:crypto.randomUUID(),fixtures:ud(),journey:v?.journey??dd(),revision:0,updatedAt:Date.now(),name:r?.room.name||t?.name.trim().slice(0,64)||"新しいワールド",seed:a,mode:g,stage:l,pose:v?.pose??f,flying:!1,bag:v?.bag??p(),selected:v?.selected??0,edits:[],day:.39,settings:{...Fe},guideSeen:!1};if(!o&&!d&&g==="creative"&&l!=="classic"&&(m.bag.hotbar=l==="frontier"?[7,8,10,5,9,12,38,36,34]:[7,8,10,27,28,29,_i,9,12]),!m.journey.home){const{x:y,y:w,z:T}=f;m.journey.home={x:y,y:w,z:T}}oe=null,Ui="y",zi=0,uh="",Fe={...m.settings},Oh();const _=Uh(lo(u,m.pose,!!(o||v)));_.flying=m.mode==="creative"&&m.flying;const b=new vy(Mi,u);if(I={world:u,data:m,player:_,view:b,kids:YM(),originalPitch:_.pitch,kidsPitch:-.43},I.kids&&(_.pitch=I.kidsPitch),b.configure(Fe),Bi="",Gh(50),yt.rememberView(_),fr=!1,Te=bp(),r){const y={connection:r,state:"connecting",count:1,ready:!1,ended:!1,editing:!1,versions:new Map,nickname:s,restoring:!!v,pendingExplore:v?.pending};I.online=y,d&&(y.tagGame={map:new zM(OM,u,BM),receivedAt:0,peers:[],started:!1,open:!1,mapDue:0,uiKey:""},nc(I)),QM(I,y)}else l==="frontier"?(I.frontier=new Yy(u,b.scene),m.frontier&&I.frontier.restore(m.frontier)):l!=="flat"&&(l==="classic"&&(I.land=new AM(u,b.scene,_)),I.aquatic=new UM(u,b.scene,m.sharkDefeated));Up(I,!1),V.setWorld(m.name),V.showViewMode(I.kids),V.pause(!0,Te),!o&&!r&&await un(I),Kr=!1}catch(o){I?.online?.sync?I.online.sync.close():r&&Ga.leave(r),I&&(Fp(I),I.view.dispose(),I=null),V.onlineSession(null),V.tagMode(null),e?V.onlineMenu(n,ni(o)):(console.error(o),V.error(ni(o)))}finally{Pn=!1}}async function tb(){const i=I?.online?.connection.room.code;if(!i)return;const t=new URL(location.href);t.searchParams.set("room",i);try{await navigator.clipboard.writeText(t.href),V.toast("招待リンクをコピーしました。")}catch{window.prompt("招待リンクをコピーしてください。",t.href)}}async function Op(){try{const i=await Vi.list();V.worlds(i)}catch(i){V.worlds([]),V.status("保存失敗："+ni(i))}}async function eb(i){if(!(!i||Pn)){Pn=!0;try{if(i.size>128*1024*1024)throw new Error("バックアップは128 MBまで読み込めます。");const{save:t,original:e}=Zy(await i.text()),n=await Ka.generate(t.seed,void 0,t.generator,t.stage);n.loadEdits(t.edits),n.loadFixtures(t.fixtures);const s=(await Vi.list()).find(r=>r.id===t.id);if(s&&!await V.confirmImport(s.name))return;await Vi.write(e??t,s?.revision??null),await Op(),V.status("読み込み・保存が完了しました。")}catch(t){V.status("読み込み失敗："+ni(t))}finally{Pn=!1}}}async function jf(i,t=!1){const e=i?t?await Vi.original(i):await Vi.get(i):I?Np(I):void 0;if(t&&!e){V.toast("このワールドには旧版の保管データがありません。");return}if(!e)throw new Error("書き出すワールドが見つかりません。");Bp("ウェブクラフト777-"+e.name.replace(/[\\/:*?"<>|]/g,"_")+".json",$y(e)),V.status("バックアップファイルを書き出しました。")}function Bp(i,t){const e=URL.createObjectURL(new Blob([t],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=i,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),6e4)}async function qh(i,t){if(!(Pn&&!["resume","resume-drag","resume-lock","resume-tablet","dismiss-guide"].includes(i))&&!(V.screen==="tag-result"&&i!=="online-leave")){if(I&&tc(I)&&["assign","craft","split","sort"].includes(i)){V.toast("素材の変更を確認しています。少し待ってください。");return}switch(i){case"goto-create":V.create();break;case"online-menu":V.onlineMenu(hh);break;case"online-create":Ge.unlock(),await da(null,void 0,()=>Ga.create(t),"",t.nickname);break;case"online-join":Ge.unlock(),await da(null,void 0,()=>Ga.join(t),t.code,t.nickname);break;case"online-copy":await tb();break;case"tag-map":kp();break;case"online-leave":if(I?.online){Pn=!0;try{await Jr()}finally{Pn=!1}}break;case"goto-worlds":await Op();break;case"goto-help":V.help();break;case"goto-settings":V.settings(Fe);break;case"back":I?V.screen==="inventory"?Ra(Te):V.pause(!1,Te):await Jr();break;case"title":if(!Pn){Pn=!0;try{await Jr()}finally{Pn=!1}}break;case"start":Ge.unlock(),await da(null,t);break;case"load":Ge.unlock(),await da(t);break;case"resume":Ra(Te);break;case"resume-drag":case"resume-lock":case"resume-tablet":{const e=i==="resume-tablet"?"tablet":i==="resume-drag"?"drag":"lock";try{localStorage.setItem(xp,e)}catch{}Ra(e);break}case"diagnostics":if(I){yt.setDiagnostics(!0);const e=yt.report(),n="視点入力 "+e.lookEvents+" 回　フレーム "+e.frames+" 回　異常 "+e.anomalies+" 件";V.diagnostics(e.lastIssue?n+`
`+e.lastIssue:n,JSON.stringify(e,null,2))}break;case"export-diagnostics":I&&Bp("ウェブクラフト777-入力診断.json",JSON.stringify(yt.report(),null,2));break;case"reset-input":I&&(bi(),yt.rememberView(I.player),Te=Hh(),V.pause(!1,Te,"入力をリセットしました。「再開」から操作できます。"));break;case"pause":ec();break;case"attack-shark":Wa()||fh();break;case"rotate-material":Dp();break;case"view-mode":wp();break;case"touch-fly":zh.hidden||Ip();break;case"inventory":Tp();break;case"select":fo(t);break;case"assign":I&&(!I.online||yo(t.id,I.data.mode))&&Jf(I.data.bag,t.slot,t.id,I.data.mode,!!I.frontier)&&(Vn(),Ca(I),V.toast("ホットバーに登録しました。"));break;case"craft":if(I&&I.data.mode==="explore"&&V.screen==="inventory"){const e=t.count??1,n=t.id??t;if(I.online&&n==="chest"){V.toast("共有ワールドでは作業台を使えます。");break}const s=Kp(I.data.bag,n,e,Sp(I));s.ok&&(oe?.id===21&&I.world.useBench(oe.x,oe.y,oe.z,e),mm(I.data.journey,n),Ge.sound("craft"),Vn(),Ca(I)),V.toast(s.message)}break;case"mine-down":yt.active&&(yt.mining=!0,Xh(0));break;case"mine-up":yt.mining=!1,He();break;case"place":Lp();break;case"supply":{if(I&&V.screen==="inventory"&&oe?.id===22){const e=tm(I.data.bag,I.data.mode,t.id,t.count);V.toast(e.message),e.ok&&Vn()}break}case"split":case"sort":case"transfer":case"transfer-all":{if(!I||V.screen!=="inventory")break;const e=I.data.bag,n=oe?.id===22?I.world.chestAt(oe.x,oe.y,oe.z):void 0,s=t?.side==="chest"?"chest":"bag",r=s==="bag"?e.slots:n;if(!r)break;const o=i==="sort"?Jp(r):i==="split"?$p(r,t.index):n?i==="transfer-all"?em(e,n,s):od(e,n,s,t.index,t.half):void 0;o&&(V.toast(o.message),o.ok&&(Vn(),Ca(I)));break}case"preset":{if(Object.hasOwn(Da,t)){const e=t;await qh("settings-change",{...Fe,...Da[e],quality:e}),I?.online?.tagGame?.status?.phase!=="finished"&&V.settings(Fe)}break}case"original":await jf(t,!0);break;case"save":I&&await un(I);break;case"settings-change":vh(t)&&(Fe={...t},Ky(Fe),I?.view.configure(Fe),Bi="",Oh());break;case"dismiss-guide":I&&(I.data.guideSeen=!0),Bh=!1;break;case"import":await eb(t);break;case"export":await jf(t);break}}}document.addEventListener("keydown",i=>{if(i.repeat||i.defaultPrevented||yt.active||document.querySelector("dialog[open]"))return;const t=/^Digit([1-9])$/.exec(i.code);if(V.screen==="inventory"&&t){i.preventDefault(),fo(Number(t[1])-1);return}V.screen==="inventory"&&(i.code==="KeyE"||i.code==="Escape")?(i.preventDefault(),i.code==="Escape"?V.pause(!1,Te):Ra(Te)):i.code==="Escape"&&["settings","help","create","worlds","diagnostics","online"].includes(V.screen)&&(i.preventDefault(),qh("back"))});Mi.addEventListener("webglcontextlost",i=>{i.preventDefault(),Xi=!1,ec(),I&&un(I),V.screen!=="tag-result"&&V.error("3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。")});Mi.addEventListener("webglcontextlost",i=>{i.preventDefault(),Xi=!1,fr=!0,bi(),V.screen!=="tag-result"&&(I?(V.pause(!1,Te,"3D描画を中断しました。復旧後に再開できます。"),un(I)):V.error(Vh))});Mi.addEventListener("webglcontextrestored",()=>{Xi=!0,fr=!1,Bi="",I?(I.view.configure(Fe),V.screen!=="tag-result"&&V.pause(!1,Te,"3D描画が復旧しました。操作を再開できます。")):Jr()});window.addEventListener("pagehide",i=>{I&&(yt.active&&ec(),I.online?(un(I),i.persisted||I.online.sync?.close()):un(I))});window.setInterval(()=>{I&&!document.hidden&&un(I)},25e3);function Hp(i){if(requestAnimationFrame(Hp),!I||!Xi||fr||document.hidden){sr=0;return}try{nb(i)}catch(t){fr=!0,yt.fail(t),console.error(t)}}function nb(i){if(!I)return;const t=I,e=sr?(i-sr)/1e3:0,n=Math.min(e,.1);sr=i;const s=t.online?.tagGame;if(s?.status?.phase==="finished")return;if(s&&nc(t,i),yt.active){const _=t.player,b=yt.movement(),y=_.x,w=_.z;if(!yt.frame(_,e))return;const T=!!s?.status?.it&&s.status.it===t.online?.connection.id;s&&(b.sprint=!0),(!T||s?.status?.phase!=="hiding")&&ry(t.world,_,b,n,T?{...Fe,sprintMultiplier:1.25}:Fe),Ge.environment(t.world,_,n),t.land?.update(_,n,t.data.day);const R=t.aquatic;R?.update(_,n),t.frontier?.update(_,n,t.data.day);const D=t.frontier?.consumeEvent()??R?.consumeEvent();D&&V.toast(D),(R&&R.health<=0||t.frontier&&t.frontier.health<=0)&&$M(t),cl-=n,cl<=0&&(cl=.24,t.data.mode==="explore"&&t.world.stage==="classic"&&gm(t.data.journey,t.world,_,t.data.bag),dr()),Zr+=Math.hypot(y-_.x,w-_.z),Zr>1.8&&(Zr=0,_.grounded&&!_.flying&&Ge.sound("step",t.world.get(Math.floor(_.x),Math.floor(_.y-.05),Math.floor(_.z)))),t.data.day=t.online?(.39+Math.max(0,Date.now()-t.online.connection.room.createdAt)/6e5)%1:(t.data.day+n/600)%1,Oi=Math.max(0,Oi-n),Xh(n)}const r=yt.active&&!s?Gn(t.world,t.player):null;if(yt.active)Bi="";else{const _=Mi.clientWidth+"/"+Mi.clientHeight+"/"+t.data.id;if(Bi===_&&!t.view.stats.queued)return;Bi=_}const o=yt.active&&!!t.aquatic?.canAttack(t.player),a=yt.active&&!o?t.frontier?.targetLabel(t.player)??t.land?.targetLabel(t.player,r?.distance):null;yt.active&&Up(t,o);const c=s?0:t.data.bag.hotbar[t.data.selected],l=r&&!t.player.crouched&&(t.online?t.data.mode==="explore"&&r.id===21:[21,22].includes(r.id)),h=c===_i;fa.hidden=!yt.active||!yt.drag||!h||o;const u="向き "+_p[zi];!fa.hidden&&fa.textContent!==u&&(fa.textContent=u);const f=r&&!l&&!o&&!a&&Jt[c]?.block&&!yt.mining?{x:r.x+r.nx,y:r.y+r.ny,z:r.z+r.nz,id:h?_i+zi:c,axis:Ui,valid:!Nh(t.world,t.player,t.data.bag,t.data.mode,t.data.selected,r)&&!t.land?.occupies(r.x+r.nx,r.y+r.ny,r.z+r.nz)}:null,d=zh.hidden?"右クリック":"タップ",g=c===Kn.revolver?Kn.rounds:c===Kn.torch?Kn.torch:Kn.fireArrow,v=yt.active&&t.frontier&&po(c)?Jt[c].name+" ×"+(t.data.mode==="creative"?"∞":rr(t.data.bag,g))+"　"+(yt.drag?"使うボタン / X":"左クリック / X"):"";V.target(o?yt.drag?"サメ　攻撃ボタン / X":"サメ　左クリック / X":v||(a?a+"　"+(t.frontier?"V / "+d:d+"で話す"):l?d+(r.id===21?"で作業台":"でチェスト"):""));const p=Math.hypot(t.player.vx,t.player.vz),m=t.data.mode==="creative"||bn(t.data.bag,c)?c:0;if(t.view.update(t.player,r,t.data.day,yt.active?n:0,{active:yt.active,held:m,mining:jr,preview:f,moving:Fe.bob&&t.player.grounded&&p>.15,sprinting:p>4.5},t.kids?{player:t.player,hit:r}:void 0,!!s),t.kids&&Gh(Math.round(t.view.kidsCamera.reticle.y*20)/20),yt.active&&Kr){if(Vr++,!Ys)Ys=i,Vr=0;else if(i-Ys>600){const{x:_,y:b,z:y}=t.player,w=t.view.stats;V.debug(Math.round(Vr*1e3/(i-Ys))+" FPS　描画 "+w.draws+" 回　チャンク "+w.chunks+`
三角形 `+w.triangles.toLocaleString("ja-JP")+"　更新 "+w.chunkMs.toFixed(1)+" ms　待ち "+w.queued+`
形状 `+w.geometries+" 個　テクスチャ "+w.textures+` 個
座標 `+[_,b,y].map(T=>T.toFixed(1)).join(" / ")),Vr=0,Ys=i}}}Oh();Jr().then(()=>{Xi?/^[A-HJ-NP-Z2-9]{8}$/.test(hh)&&V.screen==="title"&&V.onlineMenu(hh):V.error(Vh)});requestAnimationFrame(Hp);
