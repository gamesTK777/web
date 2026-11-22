(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Mc=27,Ji=64,Li=30,ii={revolver:34,fireArrow:35,torch:36,rounds:37,bow:38};function zo(i){return i===ii.revolver||i===ii.torch||i===ii.bow||i===ii.fireArrow}const Ko={name:"滑り台パーツ",color:"#e5ab52",block:!0},bc=i=>i>=31&&i<=33?Li:i,te={1:{name:"草地",color:"#89ac57",block:!0},2:{name:"土",color:"#9a6e4a",block:!0},3:{name:"石",color:"#889594",block:!0},4:{name:"砂",color:"#e5cf91",block:!0},5:{name:"原木",color:"#926541",block:!0},6:{name:"葉",color:"#659650",block:!0},7:{name:"木材",color:"#c69562",block:!0},8:{name:"丸石",color:"#839593",block:!0},9:{name:"石レンガ",color:"#a1aaa0",block:!0},10:{name:"朝霧ガラス",color:"#b7e3db",block:!0},11:{name:"石炭鉱石",color:"#666e74",block:!0},12:{name:"灯晶ブロック",color:"#ffce68",block:!0},13:{name:"水",color:"#65b4cb",block:!1},14:{name:"岩盤",color:"#404b4c",block:!1},15:{name:"石炭",color:"#47545c",block:!1},16:{name:"棒",color:"#b28a60",block:!1},17:{name:"木のツルハシ",color:"#bd9265",block:!1,maxDurability:36},18:{name:"石のツルハシ",color:"#839fa7",block:!1,maxDurability:90},19:{name:"木の斧",color:"#c58e61",block:!1,maxDurability:36},20:{name:"石の斧",color:"#8ba39b",block:!1,maxDurability:90},21:{name:"作業台",color:"#bc905c",block:!0},22:{name:"収納チェスト",color:"#ba793e",block:!0},23:{name:"潮晶鉱石",color:"#58c2bf",block:!0},24:{name:"潮晶のかけら",color:"#6ce5db",block:!1},25:{name:"青磁のランタン",color:"#75e8d9",block:!0},26:{name:"潮晶の象眼タイル",color:"#72bfb0",block:!0},27:{name:"ジャンプ台（小）",color:"#62c8a2",block:!0},28:{name:"ジャンプ台（中）",color:"#6eaee8",block:!0},29:{name:"ジャンプ台（大）",color:"#d892dd",block:!0},30:Ko,31:Ko,32:Ko,33:Ko,34:{name:"リボルバー",color:"#65747e",block:!1},35:{name:"火矢",color:"#ed8243",block:!1},36:{name:"たいまつ",color:"#fdb35a",block:!1},37:{name:"リボルバーの弾",color:"#d8ab66",block:!1},38:{name:"弓",color:"#a86943",block:!1}},_t=(i,t)=>({id:i,count:t});function Re(i,t,...e){return{id:i,name:te[t.id].name,inputs:e,output:t}}const Hd=[Re("boards",_t(7,4),_t(5,1)),Re("sticks",_t(16,4),_t(7,2)),Re("wood-pick",_t(17,1),_t(7,3),_t(16,2)),Re("wood-axe",_t(19,1),_t(7,3),_t(16,2)),Re("stone-pick",_t(18,1),_t(8,3),_t(16,2)),Re("stone-axe",_t(20,1),_t(8,3),_t(16,2)),Re("bricks",_t(9,4),_t(8,4)),Re("glass",_t(10,4),_t(4,3),_t(15,1)),Re("lamp",_t(12,2),_t(7,2),_t(15,1)),Re("bench",_t(21,1),_t(7,4)),Re("chest",_t(22,1),_t(7,6)),Re("jump-small",_t(27,1),_t(7,4),_t(16,2)),Re("jump-medium",_t(28,1),_t(7,5),_t(8,4)),Re("jump-large",_t(29,1),_t(7,6),_t(8,8)),Re("slide-part",_t(30,3),_t(7,6)),{...Re("crystal-lamp",_t(25,2),_t(24,1),_t(12,1)),bench:!0},{...Re("inlaid-tile",_t(26,8),_t(24,1),_t(8,4)),bench:!0},{...Re("crystal-cut",_t(24,2),_t(10,2),_t(15,1)),bench:!0,legacy:!0},{...Re("frontier-revolver",_t(34,1),_t(8,5),_t(7,3)),bench:!0,frontier:!0},{...Re("frontier-rounds",_t(37,10),_t(8,2),_t(15,1)),bench:!0,frontier:!0},{...Re("frontier-torch",_t(36,4),_t(16,2),_t(15,1)),frontier:!0},{...Re("frontier-arrow",_t(35,6),_t(16,3),_t(15,1)),frontier:!0},{...Re("frontier-bow",_t(38,1),_t(16,4),_t(7,2)),frontier:!0}];function Sc(i){return typeof i=="number"&&Number.isInteger(i)&&Object.hasOwn(te,i)&&i!==13&&i!==14&&bc(i)===i}function qh(i){if(!i||typeof i!="object")return!1;const{slots:t,hotbar:e}=i;return!Array.isArray(e)||e.length!==9||!Array.from(e).every(n=>n===0||Sc(n))?!1:Vd(t)}function Vd(i){return!Array.isArray(i)||i.length>Mc?!1:Array.from(i).every(t=>{if(!t||!Sc(t.id)||!Number.isInteger(t.count)||t.count<1||t.count>Ji)return!1;const e=te[t.id].maxDurability;return e===void 0?t.durability===void 0:t.count===1&&Number.isInteger(t.durability)&&t.durability>=1&&t.durability<=e})}function Gd(i){return{slots:[],hotbar:i==="creative"?[1,2,3,5,7,8,9,10,12]:Array(9).fill(0)}}function In(i,t){return i.slots.find(e=>e.id===t)}function Cr(i,t){return i.slots.reduce((e,n)=>e+(n.id===t?n.count:0),0)}function Wd(i,t,e,n,s=!1){if(!Number.isInteger(t)||t<0||t>=9||!Sc(e)||(n==="creative"?!te[e].block&&!(s&&zo(e)):!In(i,e)))return!1;const r=i.hotbar.indexOf(e);return r>=0&&(i.hotbar[r]=i.hotbar[t]),i.hotbar[t]=e,!0}const Ec=i=>({slots:i.slots.map(t=>({...t})),hotbar:[...i.hotbar]});function Xd(i,t){if(i.hotbar.includes(t))return;let e=i.hotbar.indexOf(0);e<0&&(e=i.hotbar.findIndex(n=>!In(i,n))),e>=0&&(i.hotbar[e]=t)}function Yh(i,t,e){const n=te[t].maxDurability;if(!n)for(const s of i.slots){if(s.id!==t)continue;const r=Math.min(e,Ji-s.count);if(s.count+=r,e-=r,!e)break}for(;e>0;){if(i.slots.length>=Mc)return!1;const s=n?1:Math.min(e,Ji);i.slots.push(n?{id:t,count:1,durability:n}:{id:t,count:s}),e-=s}return Xd(i,t),!0}function qd(i,t,e){const n=i.slots.filter(s=>s.id===t).sort((s,r)=>s.count-r.count);for(const s of n){const r=Math.min(s.count,e);if(s.count-=r,e-=r,!e)break}i.slots=i.slots.filter(s=>s.count>0)}function jh(i,t){return Math.min(...t.inputs.map(e=>Math.floor(Cr(i,e.id)/e.count)))}function Yd(i,t){for(const e of t.inputs)qd(i,e.id,e.count);return Yh(i,t.output.id,t.output.count)}function Kh(i,t,e){return t.frontier&&!e?.frontier?"西部の町で作れます。":t.legacy&&e?.generator!==1?"旧ワールド専用の加工です。":jd(t,e?.generator??1)&&!e?.bench?"作業台を右クリックして作ります。":jh(i,t)?"":"材料が足りません。"}function jd(i,t){return!!(i.bench||t===2&&["stone-pick","stone-axe","bricks","glass"].includes(i.id))}function Km(i,t,e){if(Kh(i,t,e))return 0;const n=jh(i,t);if(!n)return 0;const s=Ec(i);let r=0;for(;r<n&&Yd(s,t);)r++;return r}function Zm(i,t,e=1,n){const s=Hd.find(c=>c.id===t);if(!s||!Number.isSafeInteger(e)||e<1)return{ok:!1,message:"レシピか制作数を確認してください。"};const r=Kh(i,s,n);if(r)return{ok:!1,message:r};if(jh(i,s)<e)return{ok:!1,message:"材料が足りません。"};const o=Ec(i);for(let c=0;c<e;c++)if(!Yd(o,s))return{ok:!1,message:"所持品に空きがありません。"};return Object.assign(i,o),{ok:!0,message:s.name+"を"+s.output.count*e+"個作りました。"}}function $m(i,t,e){return te[i]?.block?e==="creative"?.12:i===23&&t!==17&&t!==18?1/0:[3,8,9,11,23,26].includes(i)?(i===11?2.6:1.85)*(t===18?.19:t===17?.34:1):[5,7,21,22].includes(i)?t===20?.29:t===19?.48:1.12:i===6||i===10?.24:.48:1/0}function Kd(i,t,e){if(!te[t]?.block)return{message:"この素材は採取できません。"};if(t===23&&(![17,18].includes(e)||!In(i,e)))return{message:"潮晶鉱石には木か石のツルハシが必要です。"};const n=Ec(i),s=In(n,e);let r=!1;s?.durability&&--s.durability<=0&&(n.slots.splice(n.slots.indexOf(s),1),r=!0);const o=t===3?8:t===11?15:t===23?24:bc(t),c=t===11||t===23?2:1;return Yh(n,o,c)?{draft:n,message:te[o].name+" +"+c+(r?" ／ "+te[e].name+"が壊れました。":"")}:{message:"所持品が満杯です。ブロックを置くか、材料を使って空きを作ってください。"}}function Zd(i,t){return!!te[t]?.block&&$d(i,t)}function $d(i,t){return In(i,t)?(qd(i,t,1),!0):!1}function Jm(i,t){const e=i[t];if(!e||e.count<2)return{ok:!1,message:"2個以上の束を選んでください。"};if(i.length>=Mc)return{ok:!1,message:"分割するための空き枠がありません。"};const n=Math.floor(e.count/2);return e.count-=n,i.splice(t+1,0,{id:e.id,count:n}),{ok:!0,message:"束を2つに分けました。"}}function Qm(i){const t=[...i].sort((n,s)=>n.id-s.id||(n.durability??0)-(s.durability??0)),e=[];for(const n of t){const s=e.at(-1);let r=n.count;if(!n.durability&&s?.id===n.id){const o=Math.min(r,Ji-s.count);s.count+=o,r-=o}r&&e.push({...n,count:r})}return i.splice(0,i.length,...e),{ok:!0,message:"同じ素材をまとめて整頓しました。"}}function t0(i,t,e,n){const s=i[e];if(!s||n<=0||n>s.count)return!1;const r=!!s.durability,o=Mc-t.length,c=r?0:t.reduce((l,h)=>l+(h.id===s.id?Ji-h.count:0),0);if(o*(r?1:Ji)+c<n)return!1;let a=n;if(!r)for(const l of t){if(l.id!==s.id)continue;const h=Math.min(Ji-l.count,a);if(l.count+=h,a-=h,!a)break}return a&&t.push({...s,count:a}),s.count-=n,s.count||i.splice(e,1),!0}function Jd(i,t,e,n,s=!1){const[r,o]=e==="bag"?[i.slots,t]:[t,i.slots],c=r[n];if(!c)return{ok:!1,message:"移す束を選んでください。"};const a=s?Math.ceil(c.count/2):c.count;return t0(r,o,n,a)?(e==="chest"&&Xd(i,c.id),{ok:!0,message:te[c.id].name+"を"+a+"個移しました。"}):{ok:!1,message:"移動先の空きが足りません。"}}function e0(i,t,e,n){if(t!=="creative"||!Sc(e)||!te[e].block||![1,Ji].includes(n))return{ok:!1,message:"建材と個数を確認してください。"};const s=Ec(i);return Yh(s,e,n)?(Object.assign(i,s),{ok:!0,message:te[e].name+"を"+n+"個補充しました。"}):{ok:!1,message:"所持品の空きが足りません。"}}function n0(i,t,e){const n=e==="bag"?i.slots:t;let s=0;for(let r=n.length-1;r>=0;r--)Jd(i,t,e,r).ok&&s++;return{ok:s>0,message:s?s+"束を移しました。"+(n.length?"空き不足で残った束があります。":""):"移動できる束がありません。"}}function i0(i){const t=r=>Math.floor(i.noise(r,777)*9)-4,n=[{kind:"grove",name:"風待ちの大樹",x:91+t(1),z:150+t(2)},{kind:"cave",name:"潮晶の岩窟",x:163+t(3),z:151+t(4)},{kind:"ruin",name:"潮見の回廊",x:117+t(5),z:188+t(6)}].map(r=>({...r,y:Math.max(31,Math.min(48,i.ground(r.x,r.z)))+1})),s=(r,o,c,a,l)=>{const h=i.ground(r,o);for(let u=Math.min(h,c)-3;u<=c;u++)i.put(r,u,o,u===c?a:u>=c-2?2:3);for(let u=c+1;u<=Math.max(l,h+10);u++)i.put(r,u,o,0)};for(const r of n){const o=r.y-1,c=r.kind==="cave"?r.x-3:r.x,a=r.kind==="grove"?r.z-3:r.kind==="ruin"?r.z-5:r.z,l=Math.max(Math.abs(c-128),Math.abs(a-139));for(let h=2;h<=l;h++){const u=h/l,f=Math.round(128+(c-128)*u),d=Math.round(139+(a-139)*u),p=Math.min(1,Math.max(0,h-5)/(l-12)),v=32+Math.round((o-32)*p);for(let g=-1;g<=1;g++)for(let m=-1;m<=1;m++){const _=g===0&&m===0&&i.noise(f,d)>.68?8:1;s(f+g,d+m,v,_,v+3)}}if(r.kind==="grove"){for(let h=-6;h<=6;h++)for(let u=-6;u<=6;u++)h*h+u*u<38&&s(r.x+h,r.z+u,o,1,o+13);for(let h=0;h<2;h++)for(let u=0;u<2;u++)for(let f=1;f<=12;f++)i.put(r.x+h,o+f,r.z+u,5);for(const[h,u,f,d]of[[-3,0,4,10],[3,0,4,11],[0,-3,3,11],[0,3,4,12],[0,0,4,14]]){for(let p=1;p<=3;p++)i.put(r.x+Math.round(h*p/3),o+d-3+p,r.z+Math.round(u*p/3),5);for(let p=-f;p<=f;p++)for(let v=-f;v<=f;v++)for(let g=-2;g<=2;g++)(p*p+v*v)/(f*f)+g*g/5>1.12+i.noise(p+r.x,v+r.z)*.12||i.get(r.x+h+p,o+d+g,r.z+u+v)||i.put(r.x+h+p,o+d+g,r.z+u+v,6)}for(const[h,u]of[[-1,0],[2,1],[0,-1],[1,2]])i.put(r.x+h,o+1,r.z+u,5)}else if(r.kind==="cave"){for(let h=-3;h<=20;h++)for(let u=-9;u<=9;u++){const f=r.x+h,d=r.z+u,p=Math.max(0,1-((h-8)/13)**2-(u/9)**2);if(!p&&(h>2||Math.abs(u)>3))continue;const v=o+Math.round(p*8);s(f,d,v,1,v+4);for(let g=o-2;g<v;g++)i.put(f,g,d,3);if(h>=-3&&h<=15){const g=h<4?1:h<13?3:2;if(Math.abs(u)<=g){i.put(f,o,d,i.noise(f,d)>.72?8:3);for(let m=1;m<=(g===3?4:3);m++)i.put(f,o+m,d,0)}}}for(const[h,u,f]of[[5,1,-4],[6,2,-4],[7,2,-4],[9,1,4],[10,2,4],[11,1,4],[14,1,-3],[16,2,0]])i.put(r.x+h,o+u,r.z+f,23);for(const[h,u,f]of[[1,1,-2],[2,2,-2],[3,1,2]])i.put(r.x+h,o+u,r.z+f,11)}else{for(let h=-5;h<=5;h++)for(let u=-5;u<=5;u++){const f=r.x+h,d=r.z+u,v=Math.max(Math.abs(h),Math.abs(u))===5&&i.noise(f,d)<.45?8:Math.abs(h)<2&&u%3===0?26:9;s(f,d,o,v,o+9)}for(const h of[-4,4])for(const u of[-3,0,3]){const f=u===3?5:2+Math.floor(i.noise(r.x+h,r.z+u)*3);for(let d=1;d<=f;d++)i.put(r.x+h,o+d,r.z+u,d===1?8:9)}for(let h=-4;h<=4;h++)i.put(r.x+h,o+5,r.z+3,h===0?26:9)}}return n}const po={minX:98,maxX:158,minZ:106,maxZ:158},Ns=[33,40],s0={x:128.5,y:33.001,z:149.5,yaw:0,pitch:-.04},Pt=Ns[0],ee=Ns[1],qs=ee+6,un=7,Qn=5,En=9,r0=4,pi=10,mi=12,fs=26,Qd=[{x:101,baseZ:146,direction:-1},{x:151,baseZ:127,direction:1}],Gi=3;function o0(i,t){for(const{x:e,baseZ:n,direction:s}of Qd){const r=(t-n)*s;if(i>=e&&i<e+Gi&&r>=0&&r<ee-Pt)return Pt+r+1}}function a0(i){const{minX:t,maxX:e,minZ:n,maxZ:s}=po,r=(h,u,f,d,p,v,g)=>{for(let m=f;m<=v;m++)for(let _=u;_<=p;_++)for(let b=h;b<=d;b++)i(b,_,m,g)},o=(h,u)=>i(h,Pt-1,u,r0);r(t,Pt-1,n,e-1,Pt-1,s-1,un),r(t,ee-1,n,e-1,ee-1,s-1,un),r(t,qs,n,e-1,qs,s-1,En);for(const h of[Pt,ee]){for(let u=t;u<e;u++){const f=(u-t)%6>=2&&(u-t)%6<=4&&u<e-1;for(const d of[n,s-1])r(u,h,d,u,h+5,d,En),f&&r(u,h+2,d,u,h+4,d,pi)}for(let u=n+1;u<s-1;u++){const f=(u-n)%6>=2&&(u-n)%6<=4;for(const d of[t,e-1])r(d,h,u,d,h+5,u,En),f&&r(d,h+2,u,d,h+4,u,pi)}}for(const h of[112,123,137,149])r(126,qs,h,129,qs,h+2,pi);for(const h of[109,119,136,148])r(h,qs,135,h+2,qs,138,pi);const c=(h,u,f,d,p,v)=>{const g=u===d;for(let m=u;m<=d;m++)for(let _=h;_<=f;_++)r(_,p,m,_,p+5,m,En),i(_,p,m,un),v.some(b=>(g?_:m)>=b&&(g?_:m)<b+3)&&(r(_,p,m,_,p+2,m,0),i(_,p+3,m,fs))};for(const h of Ns){for(const u of[124,131])c(u,107,u,132,h,[112,123]),c(u,141,u,156,h,[146,152]);c(99,132,123,132,h,[105,118]),c(132,132,156,132,h,[134,148,151]),c(99,141,123,141,h,[101,105,118]),c(132,141,156,141,h,[134,148]);for(const u of[111,144])c(u,142,u,156,h,[146,152]);r(125,h-1,107,130,h-1,156,En),r(99,h-1,133,156,h-1,140,En);for(let u=108;u<=156;u+=4)i(125,h-1,u,fs),i(130,h-1,u,fs);for(let u=100;u<=156;u+=4)i(u,h-1,133,fs),i(u,h-1,140,fs),u%8===4&&i(u,h+5,136,mi);for(let u=110;u<=154;u+=6)i(128,h+5,u,mi)}c(111,107,111,131,Pt,[113,126]),r(134,Pt-1,109,154,Pt-1,127,un);for(let h=134;h<=154;h++)o(h,110),o(h,125);for(let h=110;h<=125;h++)o(134,h),o(144,h),o(154,h);r(146,ee-1,110,155,ee-1,124,0),r(145,ee,110,145,ee+1,124,pi),r(156,ee,110,156,ee+1,124,pi),r(146,ee,109,155,ee+1,109,pi),r(146,ee,125,155,ee+1,125,pi);for(const h of[136,151])r(h,Pt+2,107,h+1,Pt+3,107,fs),r(h,Pt+2,108,h+1,Pt+2,108,un);for(const h of[113,120])r(155,Pt,h,156,Pt,h+4,un);r(134,Pt,127,137,Pt+1,129,Qn),r(139,Pt,128,141,Pt+2,130,un);for(const h of[136,144,152])i(h,ee+5,117,mi);const a=(h,u,f)=>{r(h+1,f+1,u,h+7,f+3,u,fs),r(h+3,f,u+2,h+5,f,u+3,Qn);for(const d of[1,5])for(const p of[6,10])r(h+d,f+1,u+p,h+d+1,f+1,u+p,un),i(h+d,f,u+p,Qn),i(h+d+1,f,u+p+2,un);i(h+4,f+5,u+6,mi)};a(101,108,Pt),a(113,108,Pt),a(113,142,Pt),a(133,142,Pt),a(113,142,ee),a(133,142,ee);const l=(h,u,f,d)=>{for(let p=0;p<d;p++)r(h,f,u+p,h,f+2,u+p,p%3===1?un:Qn),i(h,f+3,u+p,un)};for(const h of[102,108,114,120])l(h,112,ee,5),l(h,121,ee,5),i(h+1,ee+5,119,mi);for(const h of[106,118])r(h,ee,128,h+2,ee,129,un);for(const h of Ns)l(147,145,h,5),l(152,147,h,6),r(148,h,143,150,h+1,143,Qn),r(105,h,149,108,h+1,151,Qn),r(106,h,153,109,h+2,154,un),i(108,h+5,147,mi),i(150,h+5,150,mi);r(147,Pt+1,151,150,Pt+1,153,un),r(147,Pt,153,150,Pt,153,Qn),r(147,Pt,151,147,Pt,152,Qn),r(150,Pt,151,150,Pt,152,Qn);for(const{x:h,baseZ:u,direction:f}of Qd){for(let v=0;v<ee-Pt;v++){const g=u+v*f;r(h,Pt,g,h+Gi-1,ee+2,g,0),r(h,Pt,g,h+Gi-1,Pt+v,g,v%2===0?En:un),r(h-1,Pt,g,h-1,ee+1,g,En),r(h+Gi,Pt,g,h+Gi,ee+1,g,En)}const d=u-f,p=u+(ee-Pt)*f;r(h,Pt,d,h+Gi-1,Pt+2,d,0),r(h,ee,d,h+Gi-1,ee+1,d,pi),r(h,ee,p,h+Gi-1,ee+2,p,0),i(h+1,Pt+5,d,mi),i(h+1,ee+5,p,mi)}r(95,Pt-1,103,160,Pt-1,105,En),r(95,Pt-1,158,160,Pt-1,160,En),r(95,Pt-1,106,97,Pt-1,157,En),r(158,Pt-1,106,160,Pt-1,157,En);for(const[h,u]of[[93,113],[93,126],[93,145],[162,112],[162,133],[162,149],[107,101],[146,101],[112,162],[145,162]])r(h,Pt,u,h,Pt+3,u,Qn),r(h-1,Pt+2,u-1,h+1,Pt+4,u+1,6),i(h,Pt+5,u,6)}const ao={minX:92,maxX:164,minZ:99,maxZ:175},tp=32,c0={x:128.5,y:33.001,z:147.5,yaw:-.04,pitch:-.045},ep=[{minX:102,maxX:116,minZ:147,maxZ:158},{minX:142,maxX:157,minZ:147,maxZ:160},{minX:103,maxX:116,minZ:162,maxZ:173},{minX:142,maxX:156,minZ:163,maxZ:174}],Zo={sheriff:{x:136.5,y:33,z:135.5},residents:[{x:119.5,y:33,z:130.5},{x:118.5,y:33,z:147.5},{x:140.5,y:33,z:118.5}],horses:[{x:150.5,y:33,z:139.5},{x:148.5,y:33,z:138.5}],raidSpawns:[{x:118.5,y:33,z:105.5},{x:129.5,y:33,z:105.5},{x:139.5,y:33,z:105.5},{x:127.5,y:33,z:172.5}]},Ba={workbench:{x:119,y:33,z:141}},Nu=3,Sr=4,Bn=5,tn=7,Fu=8,ku=9,zu=10,Ou=11,Hn=12,l0=26,Le=tp,dt=Le+1,Bu=(i,t,e)=>i+(t-i)*e,h0=i=>Math.min(1,Math.max(0,i));function Ys(i,t,e){const n=h0((e-i)/(e-t));return n*n*(3-2*n)}const u0=[{x:62,z:53,rx:36,rz:29,rise:38},{x:96,z:63,rx:25,rz:24,rise:24},{x:131,z:36,rx:28,rz:25,rise:34},{x:222,z:73,rx:29,rz:33,rise:34},{x:204,z:167,rx:32,rz:28,rise:27},{x:51,z:184,rx:32,rz:43,rise:25},{x:169,z:218,rx:32,rz:24,rise:31}];function*f0(i){const{size:t,seaLevel:e,seed:n,heights:s,write:r,noise:o,scatter:c,tree:a}=i,{minX:l,maxX:h,minZ:u,maxZ:f}=ao;for(let d=0;d<t;d++){for(let p=0;p<t;p++){const v=o(p,d,42,n),g=o(p,d,12,n^173);let m=0;for(const D of u0){const O=Math.hypot((p-D.x)/D.rx,(d-D.z)/D.rz)+(g-.5)*.21;if(O>=1.28)continue;const W=.56*Ys(O,.54,1.23)+.28*Ys(O,.42,.6)+.16*Ys(O,.22,.32);m=Math.max(m,W*D.rise)}const _=Math.hypot((p-183)/35,(d-89)/33)+(g-.5)*.15,b=Ys(_,.62,1.3),y=Math.hypot(Math.max(l-p,0,p-h+1),Math.max(u-d,0,d-f+1)),A=Ys(y,2,18),w=30+8*v+2.7*g+m,R=Math.floor(Bu(Bu(w,20+3*g,b),Le+.1,A)),L=o(p,d,32,n^772),E=R<=e+1,C=R<43&&A<.98&&!E&&(L>.57||b>.1&&L>.4)?1:E||g>.33?Sr:2;s[p+d*t]=R,r(p,0,d,14);for(let D=1;D<=R;D++){const O=m>11&&D>=R-17&&D>36&&((D+2)%9<2||D%13===2),W=D===R?C:D>=R-2?E?Sr:2:O?(D+2)%9<2?Sr:2:Nu;r(p,D,d,W)}for(let D=R+1;D<=e;D++)r(p,D,d,13)}d%4===3&&(yield .67*(d+1)/t)}for(let d=5;d<t-4;d+=5){for(let p=5;p<t-4;p+=5){const v=p+Math.floor(3*c(p,d,n^91)),g=d+Math.floor(3*c(p,d,n^66));v>=l-3&&v<h+3&&g>=u-3&&g<f+3||c(p,d,n^65)>.38||a(v,g)}d%20===5&&(yield .67+.055*d/t)}for(const[d,p]of[[85,136],[83,142],[86,150],[84,159],[88,155],[91,180],[98,183],[161,180],[166,174],[169,178]]){const v=s[d+p*t];r(d,v,p,1),a(d,p,!0)}for(let d=126;d<=145;d++)for(let p=167;p<=178;p++){const v=Ys(Math.hypot((p-172)/1.1,d-135),3,9);if(v<=.12)continue;const g=s[p+d*t],m=Math.max(g,33+Math.floor(4*v));for(let _=Math.max(2,g-5);_<=m;_++){const b=p===167&&(d===134||d===135||d===137)&&_>=33&&_<=34,y=c(p+_*17,d-_*9,n^515)>.79&&_<m;r(p,_,d,b||y?Ou:Nu)}}for(let d=0;d<390;d++){const p=3+Math.floor(c(d,15,n)*(t-6)),v=3+Math.floor(c(d,21,n)*(t-6)),g=s[p+v*t],m=3+Math.floor(c(d,83,n)*Math.max(1,g-7));for(const[_,b,y]of[[0,0,0],[1,0,0],[0,1,0],[0,0,1],[-1,-1,0]])r(p+_,m+b,v+y,Ou)}yield .78}function d0(i){const t=new Map,e=(l,h,u,f)=>{i(l,h,u,f);const d=l+u*256+h*65536;f?t.set(d,{x:l,y:h,z:u,id:f}):t.delete(d)},n=(l,h,u,f,d,p,v,g)=>{for(let m=u;m<=p;m++)for(let _=f;_<=v;_++)for(let b=h;b<=d;b++)l(b,m,_,g)},s=(l,h,u,f,d,p,v)=>n(e,l,h,u,f,d,p,v);n(i,122,Le,99,134,Le,174,2),n(i,124,Le,99,132,Le,174,Sr),n(i,117,Le,104,120,Le,145,tn),n(i,135,Le,109,137,Le,145,tn),n(i,133,Le,143,164,Le,145,Sr);for(let l=103;l<=172;l+=5)i(128,Le,l,2);for(const{minX:l,maxX:h,minZ:u,maxZ:f}of ep){n(i,l,Le,u,h-1,Le,f-1,2),n(i,l+1,Le,u+1,h-2,Le,f-2,1);for(const[d,p]of[[l,u],[h-1,u],[l,f-1],[h-1,f-1]])i(d,Le,p,ku)}const r=({x0:l,x1:h,z0:u,z1:f,facing:d,wall:p,trim:v,height:g,porch:m})=>{const _=d==="east"?h:l,b=d==="east"?l:h,y=d==="east"?1:-1,A=Math.floor((u+f)/2);s(l,Le,u,h,Le,f,tn);for(const R of[l,h])s(R,dt,u,R,dt+g-1,f,p);for(const R of[u,f]){s(l,dt,R,h,dt+g-1,R,p);for(const L of[l,h])s(L,dt,R,L,dt+g,R,Bn);for(let L=l+3;L<=h-3;L+=5)s(L,dt+2,R,L+1,dt+3,R,zu)}for(const R of[u+2,f-3])s(_,dt+2,R,_,dt+3,R+1,zu);s(_,dt,A-1,_,dt+2,A+1,0),s(b,dt,A-1,b,dt+2,A,0),s(l-1,dt+g,u-1,h+1,dt+g,f+1,Bn),s(l,dt+g+1,u+2,h,dt+g+1,f-2,v),s(_,dt+g+1,u,_,dt+g+1,f,p),s(_,dt+g+2,u+2,_,dt+g+2,f-2,p),s(_,dt+g+3,A-2,_,dt+g+3,A+2,Bn);const w=_+y;if(s(w,dt+g,u+2,w,dt+g+1,f-2,v),m){s(Math.min(_,_+y*3),Le,u-1,Math.max(_,_+y*3),Le,f+1,tn),s(Math.min(w,_+y*3),dt+3,u-1,Math.max(w,_+y*3),dt+3,f+1,tn);for(const R of[u,f])s(_+y*3,dt,R,_+y*3,dt+2,R,Bn)}return e(w,dt+2,A-2,Hn),e(w,dt+2,A+2,Hn),e(_-y,dt+g-1,A,Hn),{x:w,z:A,signY:dt+g+1}},o=r({x0:104,x1:117,z0:109,z1:122,facing:"east",wall:tn,trim:2,height:4,porch:!0}),c=r({x0:100,x1:117,z0:126,z1:142,facing:"east",wall:tn,trim:Sr,height:6,porch:!0}),a=r({x0:137,x1:153,z0:111,z1:126,facing:"west",wall:ku,trim:l0,height:5,porch:!1});r({x0:140,x1:157,z0:130,z1:143,facing:"west",wall:tn,trim:Fu,height:5,porch:!0});for(const[l,h,u,f]of[[o.x,o.signY,o.z,Hn],[c.x,c.signY,c.z,Hn],[c.x,c.signY,c.z-2,tn],[c.x,c.signY,c.z+2,tn],[a.x,a.signY,a.z,Hn],[a.x,a.signY,a.z-1,Hn],[a.x,a.signY,a.z+1,Hn],[a.x,a.signY-1,a.z,Hn],[a.x,a.signY+1,a.z,Hn]])e(l,h,u,f);s(103,dt,129,104,dt,138,Bn),s(102,dt+1,128,104,dt+1,139,tn);for(const[l,h]of[[108,130],[111,137],[114,130]])e(l,dt,h,Bn),s(l-1,dt+1,h,l+1,dt+1,h,tn),e(l,dt,h+2,tn);s(150,dt,114,151,dt,121,Bn),s(149,dt+1,114,151,dt+1,121,tn);for(const l of[143,151])s(l,dt,131,l+2,dt,132,Bn);for(const l of[140,141])s(l,dt,135,l,dt+2,139,0);s(146,dt,143,153,dt+2,143,0),e(Ba.workbench.x,Ba.workbench.y,Ba.workbench.z,21),e(114,dt,118,21);for(const l of[103,108])for(const h of[101,106])s(l,dt,h,l,dt+7,h,Bn);s(102,dt+7,100,109,dt+7,107,tn),s(103,dt+8,101,108,dt+11,106,tn),s(102,dt+10,100,109,dt+10,107,Bn),s(104,dt+12,102,107,dt+12,105,Fu);for(const l of[121,135])for(const h of[111,123,137,151,165])s(l,dt,h,l,dt+1,h,Bn),e(l,dt+2,h,Hn);return[...t.values()].sort((l,h)=>l.y-h.y)}const jn=33,np={minX:60,maxX:196,minZ:60,maxZ:196},p0={minX:87,maxX:170,minZ:94,maxZ:198},Os={police:{x:128.5,y:jn,z:169.5,yaw:0},robbers:{x:128.5,y:jn,z:87.5,yaw:Math.PI,pitch:-.04},jail:{x:128.5,y:jn,z:184.5,yaw:0},rescue:{x:128.5,z:177.5},release:{x:128.5,y:jn,z:171.5,yaw:0}},m0=Os.police,g0=Os.robbers,v0=Os.jail,Gl=Os.rescue,_0=Os.release,x0={minX:170,maxX:175,firstZ:118,length:12,topY:45},ip=[{x:177,z:130,dx:0,dz:-1,length:12,base:33,width:3},{x:84,z:124,dx:0,dz:-1,length:7,base:33,width:3},{x:99,z:107,dx:1,dz:0,length:5,base:35,width:3},{x:113,z:126,dx:0,dz:-1,length:9,base:33,width:3}];function y0(i,t,e){const n=(t-i.x)*i.dx+(e-i.z)*i.dz,s=(t-i.x)*Math.abs(i.dz)+(e-i.z)*Math.abs(i.dx);return n>=0&&n<i.length&&s>=0&&s<i.width?i.base+n+1:void 0}function M0(i,t){for(const e of ip){const n=y0(e,i,t);if(n!==void 0)return n}}const Zt=jn-1,sp=1,Fs=3,Ne=4,Xn=5,rc=6,Ye=7,bi=8,ve=9,vr=10,wi=12,Wl=13,Hu=14,Yi=25,_e=26;function Oo(i){const t=(r,o,c,a,l,h,u)=>{for(let f=o;f<=l;f++)for(let d=c;d<=h;d++)for(let p=r;p<=a;p++)i(p,f,d,u)},e=([r,o,c,a],l)=>t(r,Zt,o,c,Zt,a,l);function n(r,o,c=6,a=0){const l=Zt+c;t(r,Zt+1,o,r,l,o,Xn);for(let h=-3;h<=3;h++)for(let u=-3;u<=3;u++){const f=Math.abs(u)+Math.abs(h);if(f>4||f===4&&(r+o+u-h+a)%3===0)continue;const d=l+(f<=1?1:0);t(r+u,d-1,o+h,r+u,d+1,o+h,rc)}}function s(r,o,c=4){i(r,Zt+1,o,ve),t(r,Zt+2,o,r,Zt+c,o,Xn),i(r,Zt+c+1,o,wi),i(r,Zt+c+2,o,Ye)}return{box:t,ground:e,tree:n,lamp:s}}function b0(i,t){const{box:e}=Oo(i),{minX:n,maxX:s,minZ:r,maxZ:o}=np,c=s-1,a=o-1,l=t?Fs:bi,h=t?ve:rc;e(n,Zt+1,r,c,Zt+3,r,l),e(n,Zt+1,a,c,Zt+3,a,l),e(n,Zt+1,r,n,Zt+3,a,l),e(c,Zt+1,r,c,Zt+3,a,l),e(n,Zt+4,r,c,Zt+8,r,h),e(n,Zt+4,a,c,Zt+8,a,h),e(n,Zt+4,r,n,Zt+8,a,h),e(c,Zt+4,r,c,Zt+8,a,h);for(let u=66;u<194;u+=12)for(const[f,d]of[[u,r],[u,a],[n,u],[c,u]])e(f,Zt+4,d,f,Zt+8,d,t?_e:Xn),i(f,Zt+8,d,wi)}function rp(i,t){const{box:e,ground:n}=Oo(i),s=t?ve:_e;n([118,178,138,191],ve),e(118,33,178,138,37,178,s),e(118,33,191,138,37,191,s),e(118,33,178,118,37,191,s),e(138,33,178,138,37,191,s),e(117,38,177,139,38,192,t?bi:Ye);for(const r of[120,123,133,136])e(r,34,178,r+1,36,178,vr);for(const r of[181,185,188])for(const o of[118,138])e(o,34,r,o,36,r+1,vr);e(126,33,178,130,36,178,0),e(126,33,191,130,36,191,0);for(const r of[121,126,130,135])i(r,37,184,wi);i(128,37,178,Yi);for(let r=175;r<=177;r++)for(let o=125;o<=131;o++)Math.hypot(o+.5-Os.rescue.x,r+.5-Os.rescue.z)>2.4||i(o,Zt,r,(o+r)%3===0?Yi:_e)}function S0(i){const{box:t,ground:e,tree:n,lamp:s}=Oo(i);e([68,72,187,76],Ne),e([68,169,116,173],Ne),e([140,169,187,173],Ne),e([68,76,72,168],Ne),e([183,76,187,168],Ne),e([123,75,133,174],Ne),e([69,130,186,134],Ne),e([68,149,186,152],Ne),e([92,76,96,92],Ne),e([158,107,187,111],Ne),e([93,78,161,81],Ne),e([114,84,141,92],Ne),e([119,164,137,176],Ne);for(let a=77;a<=176;a+=14)s(121,a),s(135,a),a<164&&(s(a,128),s(a,153));for(const[a,l]of[[77,80],[112,76],[144,77],[77,97],[74,106],[75,143],[80,181],[104,181],[113,159],[144,157],[154,182],[168,182],[179,155],[189,118],[151,105],[149,98],[100,93]])n(a,l,5+(a+l)%4);for(let a=83;a<=108;a++)for(let l=150;l<=180;l++){const h=Math.hypot((l-165)/15.5,(a-95)/11.8);h<.94?t(l,Zt-2,a,l,Zt,a,Wl):h<1.13&&i(l,Zt,a,Ne)}e([149,94,160,96],Ye);for(const a of[151,155,159])for(const l of[94,96])i(a,33,l,Xn);for(const[a,l]of[[151,84],[176,83],[181,96],[173,108],[157,106]])n(a,l,6);e([121,111,135,123],ve),e([125,115,131,119],Wl),t(124,33,114,132,33,114,_e),t(124,33,120,132,33,120,_e),t(124,33,115,124,33,119,_e),t(132,33,115,132,33,119,_e),t(128,33,117,128,35,117,ve),i(128,36,117,Yi);for(const[a,l,h]of[[106,141,_e],[146,141,ve]])e([a-7,l-7,a+7,l+7],sp),e([a-5,l-5,a+5,l+5],h),e([a-4,l-4,a+4,l+4],Ne);const r=x0;e([166,114,183,135],ve);for(const a of[r.minX,r.maxX-1,178,180])t(a,33,114,a,r.topY-2,114,Xn);t(168,r.topY-1,113,180,r.topY-1,117,Ye),t(175,r.topY-1,118,179,r.topY-1,119,Ye),t(168,r.topY,113,180,r.topY,113,_e),t(168,r.topY,114,168,r.topY,117,_e);for(let a=0;a<r.length;a++){const l=r.firstZ+a,h=r.topY-a-1;t(r.minX,h,l,r.maxX-1,h,l,32),t(r.minX-1,h,l,r.minX-1,h+1,l,_e),t(r.maxX,h,l,r.maxX,h+1,l,_e),a%3===0&&(t(r.minX-1,33,l,r.minX-1,h-1,l,Xn),t(r.maxX,33,l,r.maxX,h-1,l,Xn))}e([168,130,176,134],Ne),e([78,100,119,127],Ne);const o=[{box:[80,103,91,117],top:39},{box:[102,105,108,114],top:39},{box:[109,109,118,117],top:41}];for(const{box:[a,l,h,u],top:f}of o){for(const[d,p]of[[a,l],[h,l],[a,u],[h,u]])t(d,33,p,d,f+2,p,Xn),i(d,f+3,p,wi);t(a,f,l,h,f,u,Ye),t(a,f+1,l,h,f+1,l,_e);for(let d=f+2;d<=f+3;d++)for(let p=a+1;p<h;p+=3)i(p,d,l,Xn)}t(91,39,108,102,39,111,Ye),t(91,40,108,102,40,108,_e),t(92,39,112,96,39,113,Ye),t(107,39,109,110,39,113,Ye),t(109,40,109,109,40,112,Fs),t(110,40,113,110,40,116,Fs),t(111,41,113,113,41,116,Ye),t(96,34,106,98,34,109,Ye),t(96,33,106,98,33,109,Ye);for(const a of ip)for(let l=0;l<a.length;l++)for(let h=0;h<a.width;h++){const u=a.x+a.dx*l+Math.abs(a.dz)*h,f=a.z+a.dz*l+Math.abs(a.dx)*h,d=a.base+l;t(u,33,f,u,d,f,h===0?_e:Ye),t(u,d+1,f,u,d+2,f,0)}for(const[a,l]of[[80,124],[92,123],[97,121],[101,123],[106,123]])t(a,33,l,a+1,34,l+1,Xn);const c=[[75,156,87,156],[91,155,106,155],[78,162,78,167],[84,161,96,161],[100,160,110,160],[86,166,103,166],[106,165,106,174],[113,156,113,164],[144,158,154,158],[158,158,173,158],[145,163,145,173],[151,163,166,163],[157,167,157,176],[165,169,176,169],[175,157,175,165]];for(const[a,l,h,u]of c)t(a,33,l,h,34,u,rc);for(const[a,l]of[[76,118],[106,88],[146,120],[78,173],[175,176]])t(a,33,l,a+2,33,l,Ye),i(a,34,l,_e),i(a+2,34,l,_e);for(const[a,l]of[[82,82],[110,88],[149,115],[181,141],[81,151],[175,148]]){e([a-2,l-1,a+2,l+1],ve);for(let h=-1;h<=1;h++)i(a+h,33,l,h===0?wi:rc)}}const E0={シ:["11000","00101","11001","00110","11100"],ブ:["00101","11000","00101","00010","01100"],ヤ:["00100","11111","00101","00110","00010"],ト:["01000","01000","01110","01001","01000"],キ:["00100","11111","00100","11111","00010"],コ:["11111","00001","00001","00001","11111"],ラ:["01110","00000","11111","00010","01100"],ボ:["01001","11110","01001","11010","01100"]};function w0(i){const{box:t,ground:e,tree:n,lamp:s}=Oo(i);e([61,61,194,194],bi);for(const a of[[64,64,109,112],[147,64,191,112],[64,145,110,191],[147,145,191,191]])e(a,Fs);e([61,115,194,142],Hu),e([115,61,142,194],Hu);for(const[a,l,h,u]of[[61,112,194,114],[61,143,194,145],[112,61,114,194],[143,61,145,194]])e([a,l,h,u],ve);for(let a=115;a<=142;a++)for(let l=115;l<=142;l++){const h=l-a,u=l+a-256,f=Math.abs(h)<=4&&Math.abs(u)<=27&&(Math.abs(u)+1)%4<2,d=Math.abs(u)<=4&&Math.abs(h)<=27&&(Math.abs(h)+1)%4<2;(f||d)&&i(l,Zt,a,ve)}for(let a=117;a<=139;a+=4)e([a,110,a+1,114],ve),e([a,143,a+1,147],ve),e([110,a,114,a+1],ve),e([143,a,147,a+1],ve);for(let a=64;a<=192;a+=6)Math.abs(a-128)>22&&(e([127,a,127,a+2],Ne),e([a,127,a+2,127],Ne));const r=[{r:[67,67,89,90],h:15,id:ve},{r:[93,67,108,81],h:21,id:Fs},{r:[75,94,108,108],h:15,id:_e},{r:[147,67,167,87],h:23,id:_e},{r:[172,69,189,92],h:12,id:ve},{r:[149,93,182,108],h:17,id:bi},{r:[67,149,89,168],h:13,id:_e},{r:[93,150,109,167],h:19,id:bi},{r:[69,174,91,190],h:16,id:ve},{r:[148,148,170,163],h:21,id:ve},{r:[176,148,189,169],h:17,id:Fs},{r:[150,172,173,188],h:11,id:_e},{r:[179,175,189,188],h:15,id:ve}];function o([a,l,h,u],f,d){const p=Zt+f;e([a-1,l-1,h+1,u+1],ve);for(const m of[a,h])t(m,33,l,m,p,u,d);for(const m of[l,u])t(a,33,m,h,p,m,d);t(a,p,l,h,p,u,d);for(let m=38;m<p;m+=5){t(a+1,m,l+1,h-1,m,u-1,ve);for(const _ of[l,u])for(let b=a+2;b+1<h;b+=4)t(b,m-3,_,b+1,m-1,_,vr);for(const _ of[a,h])for(let b=l+2;b+1<u;b+=4)t(_,m-3,b,_,m-1,b+1,vr)}const v=Math.floor((a+h)/2),g=Math.floor((l+u)/2);for(const m of[l,u])t(v-2,33,m,v+1,36,m,0),t(v-3,37,m,v+2,37,m,wi);for(const m of[a,h])t(m,33,g-1,m,35,g+1,0);for(const m of[a+2,h-2])for(const _ of[l+2,u-2])i(m,37,_,wi),t(m,33,_,m+1,33,_+1,Ye);t(a+1,p+1,l+1,h-1,p+1,u-1,bi),i(v,p+2,g,Yi)}for(const{r:a,h:l,id:h}of r)o(a,l,h);function c(a,l,h,u,f,d){const p=u.length*6+1;t(a,h,l,a+p,h+7,l,f);for(const[v,g]of u.entries())for(const[m,_]of E0[g].entries())for(let b=0;b<_.length;b++)_[b]==="1"&&i(a+1+6*v+b,h+6-m,l,d);for(let v=1;v<p;v+=3)i(a+v,h,l,wi)}c(152,109,42,["シ","ブ","ヤ"],bi,Yi),c(81,109,39,["コ","ラ","ボ"],_e,Ne),c(150,147,41,["ト","キ"],bi,Yi),c(94,149,41,["ヤ","コ"],_e,ve);for(const[a,l]of[[70,113],[92,112],[106,111],[149,112],[168,111],[186,113],[72,145],[91,146],[106,145],[149,145],[170,145],[186,145],[113,71],[145,71],[113,88],[145,88],[113,104],[145,104],[113,163],[145,164]])s(a,l,5);for(const[a,l]of[[113,112],[143,112],[113,143],[143,143]])t(a,33,l,a,38,l,bi),i(a,39,l,wi),i(a,40,l,Yi),i(a,41,l,_e);e([93,172,111,191],ve);for(const[a,l]of[[97,175],[108,178],[98,186],[144,151],[165,169],[171,188],[77,171]])e([a-2,l-2,a+2,l+2],_e),e([a-1,l-1,a+1,l+1],sp),n(a,l,5);t(101,37,175,108,37,180,vr);for(const[a,l]of[[101,175],[108,175],[101,180],[108,180]])t(a,33,l,a,36,l,ve);for(const[a,l]of[[75,147],[86,147],[149,146],[170,146],[108,95],[150,95],[96,91],[169,91]])i(a,33,l,_e),t(a,34,l,a,35,l,Yi),i(a,36,l,vr);for(const[a,l]of[[102,176],[105,184],[152,167],[161,167],[174,137],[80,138],[97,87]])t(a,33,l,a+2,33,l,Ye)}function T0(i,t){i==="park"?S0(t):w0(t),b0(t,i==="crossing"),rp(t,i==="crossing")}function A0(i,t,e,n){const s=i==="lake",{box:r}=Oo(e),o=([a,l,h,u],f,d=Zt)=>{for(let p=l;p<=u;p++)for(let v=a;v<=h;v++){if(s?v%6===2&&p%6===1:!0)for(let m=d-1;m>0;m--){const _=t(v,m,p);if(_!==0&&_!==Wl)break;e(v,m,p,s?Xn:Fs)}e(v,d,p,f);for(let m=d+1;m<n;m++)t(v,m,p)&&e(v,m,p,0)}},c=i==="frontier"?Ne:s?Ye:ve;if(i==="school"){for(const a of[po.minZ,po.maxZ-1])r(126,jn,a,130,jn+3,a,0);o([126,po.maxZ,130,166],c)}else o([126,i==="frontier"?147:139,130,166],c);if(o([116,166,140,193],c),s)for(const a of[116,140]){const l=a===116?-1:1;for(let h=1;h<=4;h++){const u=a+l*h;o([u,170,u,174],Ye,Zt-h)}}rp(e,!1)}const Et=256,Ke=96,R0=16,Fn=28,qe=Et*Et,Vu=Ke/R0,oc=qe*Ke,vn=128,_n=139,op=()=>({axes:[],chests:[],benches:[]});function wo(i){return typeof i=="number"&&Number.isInteger(i)&&(i>=0&&i<=13||[21,22,23].includes(i)||i>=25&&i<=33)}function ap(i){if(!i||typeof i!="object")return!1;const t=i,e=(n,s)=>{if(!Array.isArray(n)||n.length>oc-qe)return!1;const r=new Set;for(const o of n){if(!Array.isArray(o)||o.length!==2||!Number.isInteger(o[0])||o[0]<qe||o[0]>=oc||r.has(o[0])||!s(o[1]))return!1;r.add(o[0])}return!0};return e(t.axes,n=>n==="x"||n==="z")&&e(t.chests,Vd)&&e(t.benches,n=>Number.isSafeInteger(n)&&Number(n)>=0)}const Ce=(i,t,e)=>i+Et*e+qe*t,To=(i,t,e)=>i+16*e+256*t;function ji(i,t,e){return i>=0&&t>=0&&e>=0&&i<Et&&t<Ke&&e<Et}function mo(i){return i!==0&&i!==6&&i!==10&&i!==13&&!(i>=30&&i<=33)}function ri(i){return i!==0&&i!==13}function C0(i,t,e){const n=[];for(let s=Math.max(0,t-1>>4);s<=Math.min(5,t+1>>4);s++)for(let r=Math.max(0,e-1>>4);r<=Math.min(15,e+1>>4);r++)for(let o=Math.max(0,i-1>>4);o<=Math.min(15,i+1>>4);o++)n.push(To(o,s,r));return n}function P0(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function Yt(i,t,e=0){let n=Math.imul(i^e,2654435761)^Math.imul(t,2246822519);return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),((n^n>>>16)>>>0)/4294967296}function ds(i,t,e,n){i/=e,t/=e;const s=Math.floor(i),r=Math.floor(t);let o=i-s,c=t-r;o=o*o*(3-2*o),c=c*c*(3-2*c);const a=Yt(s,r,n),l=Yt(s+1,r,n),h=Yt(s,r+1,n),u=Yt(s+1,r+1,n);return a+(l-a)*o+(h-a)*c+(a-l-h+u)*o*c}const co=(i,t=0,e=1)=>Math.min(e,Math.max(t,i));function ps(i,t,e){const n=co((e-i)/(e-t));return n*n*(3-2*n)}class wc{constructor(t,e=!1,n=1,s="classic",r=!1){if(this.stage=s,this.cops=r,this.salt=P0(t),this.generator=n,!e)for(const o of this.generateTerrain());}stage;cops;data=new Uint8Array(oc);highest=new Int16Array(qe);occupied=new Uint16Array(256*Vu);dense=new Uint16Array(256*Vu);lamps=new Set;salt;generator;landmarks=[];frontierStructures=[];axes=new Map;chests=new Map;benches=new Map;history=[];heights=new Uint8Array(qe);edits=new Map;listeners=new Set;static async generate(t,e,n=1,s="classic",r=!1){const o=new wc(t,!0,n,s,r);let c=performance.now();for(const a of o.generateTerrain())performance.now()-c<7&&a<1||(e?.(a),await new Promise(l=>setTimeout(l,0)),c=performance.now());return o}get(t,e,n){return ji(t,e,n)&&Number.isInteger(t)&&Number.isInteger(e)&&Number.isInteger(n)?this.data[Ce(t,e,n)]:0}write(t,e,n,s){ji(t,e,n)&&(this.data[Ce(t,e,n)]=s)}heightAt(t,e){const n=ds(t,e,47,this.salt),s=ds(t,e,31,this.salt^109),r=ds(t,e,11,this.salt^51);let o=22+n*18+Math.max(0,s-.47)*47+r*3;const c=Math.hypot((t-131)/1.55,e-111),a=ps(c+(r-.5)*5,12,24);o=o*(1-a)+(25+r*2)*a;const l=ps(Math.hypot(t-vn,e-_n),5.4,14);o=o*(1-l)+(32+.3*r)*l;const h=_n-e;if(h>4&&h<27){const f=ps(Math.abs(t-(vn+2)),4,12),d=32-co((h-4)/15)*6+.15*r;o-=Math.max(0,o-d)*f}const u=ps(Math.hypot((t-118)/1.6,e-75),5,28);return o+=u*(8+7*r),co(Math.floor(o),6,Ke-14)}lakeHeight(t,e){const n=11+ds(t,e,25,this.salt^3140)*4,s=ps(Math.hypot((t-vn)/1.2,e-_n),4,24),r=ps(Math.hypot((t-92)/1.65,e-113),2,16),o=ps(Math.hypot(t-154,(e-110)/1.75),2,13);return Math.floor(Math.max(n+(32-n)*s,n+(30-n)*Math.max(r,o)))}*generatePresetTerrain(){const t=this.stage==="flat";this.data.fill(14,0,qe);for(let e=0;e<Et;e++){for(let n=0;n<Et;n++){const s=t?32:this.lakeHeight(n,e);for(let r=1;r<=s;r++)this.data[Ce(n,r,e)]=r<s-3?3:t?r===s?1:2:4;if(!t)for(let r=s+1;r<=Fn;r++)this.data[Ce(n,r,e)]=13}e%4===3&&(yield .78*(e+1)/Et)}yield*this.finishTerrain()}*generateTerrain(){if(this.stage==="park"||this.stage==="crossing"){this.data.fill(14,0,qe),this.data.fill(3,(jn-5)*qe,(jn-1)*qe),this.data.fill(1,(jn-1)*qe,jn*qe),T0(this.stage,(s,r,o,c)=>this.write(s,r,o,c)),yield*this.finishTerrain();return}if(this.stage==="school"){this.data.fill(14,0,qe),this.data.fill(3,30*qe,32*qe),this.data.fill(1,32*qe,33*qe),a0((s,r,o,c)=>this.write(s,r,o,c)),yield*this.finishTerrain();return}if(this.stage==="frontier"){yield*f0({size:Et,seaLevel:Fn,seed:this.salt,heights:this.heights,noise:ds,scatter:Yt,write:(s,r,o,c)=>this.write(s,r,o,c),tree:(s,r,o)=>this.tree(s,r,o)}),this.frontierStructures=d0((s,r,o,c)=>this.write(s,r,o,c)),yield*this.finishTerrain();return}if(this.stage!=="classic"){yield*this.generatePresetTerrain();return}for(let s=0;s<Et;s++){for(let r=0;r<Et;r++){const o=this.heightAt(r,s),c=o<=Fn+1||o<Fn+4&&ds(r,s,17,this.salt^311)>.65,a=r===0||s===0||r===Et-1||s===Et-1;this.heights[r+Et*s]=o;for(let l=0;l<=Math.max(o,Fn);l++){const h=l===0||a&&l===o?14:l>o?13:l===o?c?4:1:l>=o-3?c?4:2:3;this.data[Ce(r,l,s)]=h}}s%4===3&&(yield .46*(s+1)/Et)}let t=0;const e=()=>Yt(++t,319,this.salt),n=(s,r,o,c,a)=>{for(let l=-Math.ceil(a);l<=a;l++)for(let h=-Math.ceil(c);h<=c;h++)for(let u=-Math.ceil(c);u<=c;u++){if((u*u+h*h)/(c*c)+l*l/(a*a)>1)continue;const f=Math.floor(s)+u,d=Math.floor(r)+l,p=Math.floor(o)+h;if(d<2||f<=0||p<=0||f>=255||p>=255||!ji(f,d,p))continue;const v=this.heights[f+Et*p];v<=Fn&&d>=v-2||Math.abs(f-vn)<5&&Math.abs(p-_n)<5&&d>27||this.write(f,d,p,0)}};for(let s=0;s<108;s++){let r=5+e()*246,o=5+e()*246,c=5+e()*(this.heights[(r|0)+Et*(o|0)]-5),a=e()*Math.PI*2,l=(e()-.5)*.6;const h=17+Math.floor(e()*40);for(let u=0;u<h;u++){const f=1.65+1.15*Math.sin(Math.PI*u/h);n(r,c,o,f,f*.7),a+=(e()-.5)*.56,l=co(l+(e()-.5)*.17,-.45,.45),r+=Math.cos(a),o+=Math.sin(a),c+=l}s%4===3&&(yield .46+.12*(s+1)/108)}for(let s=0;s<13;s++){const r=vn+12+s,o=_n-2;n(r,this.heights[vn+12+Et*o]+1-s*.4,o,2.5,2.2)}for(let s=0;s<1800;s++){const r=2+Math.floor(e()*252),o=2+Math.floor(e()*252),c=2+Math.floor(e()*(this.heights[r+Et*o]-3));for(let a=0;a<8;a++){const l=r+Math.floor(e()*3)-1,h=o+Math.floor(e()*3)-1,u=c+Math.floor(e()*3)-1;this.get(l,u,h)===3&&this.write(l,u,h,11)}s%160===0&&(yield .59+.06*s/1800)}for(let s=-3;s<=3;s++)for(let r=-2;r<=2;r++){if(s*s*.55+r*r>4.8)continue;const o=vn+6+s,c=_n-4+r,a=this.heights[o+Et*c],l=s*s+r*r<3?2:1;for(let h=a-2;h<a+l;h++)this.write(o,h,c,3);s===0&&r===0&&this.write(o,a+1,c,11)}for(let s=0;s<51;s++){for(let r=0;r<51;r++){const o=r*5+1+Math.floor(Yt(r,s,this.salt^134)*3),c=s*5+1+Math.floor(Yt(r,s,this.salt^854)*3);if(Math.hypot(o-vn,c-_n)<10||c<_n&&c>_n-26&&Math.abs(o-(vn+2))<5)continue;const a=ds(o,c,35,this.salt^482),l=.026+.75*co((a-.38)*3.6);Yt(r,s,this.salt^723)<l&&this.tree(o,c)}s%3===2&&(yield .65+.13*(s+1)/51)}this.tree(vn-2,_n-3,!0),this.tree(vn-7,_n-7,!0),this.tree(vn+12,_n-10,!0),this.generator===2&&(this.landmarks=i0({ground:(s,r)=>this.heights[s+Et*r],noise:(s,r)=>Yt(s,r,this.salt^1911),get:(s,r,o)=>this.get(s,r,o),put:(s,r,o,c)=>this.write(s,r,o,c)})),yield*this.finishTerrain()}*finishTerrain(){this.cops&&this.stage!=="park"&&this.stage!=="crossing"&&A0(this.stage,(e,n,s)=>this.get(e,n,s),(e,n,s,r)=>this.write(e,n,s,r),Ke),this.highest.fill(-1);const t=this.cops||this.stage==="school"||this.stage==="frontier"||this.stage==="park"||this.stage==="crossing";for(let e=0;e<Ke;e++){for(let n=0;n<Et;n++)for(let s=0;s<Et;s++){const r=Ce(s,e,n),o=this.data[r];if(!o)continue;const c=To(s>>4,e>>4,n>>4);this.occupied[c]++,mo(o)&&this.dense[c]++,ri(o)&&o!==10&&(this.highest[s+Et*n]=e),t&&(o===12||o===25)&&this.lamps.add(r)}e%4===3&&(yield .78+.22*(e+1)/Ke)}}tree(t,e,n=!1){const s=this.heights[t+Et*e];if(this.get(t,s,e)!==1||this.get(t,s+1,e)!==0)return;const r=Yt(t,e,this.salt^813),o=!n&&r>.68,c=(o?6:4)+Math.floor(Yt(t,e,this.salt^102)*3);for(let h=1;h<=c;h++)this.write(t,s+h,e,5);const a=o?3:c-1,l=c+2;for(let h=a;h<=l;h++){const u=o?Math.min(2,Math.ceil((l-h)*.43)):h===l?1:2;for(let f=-u;f<=u;f++)for(let d=-u;d<=u;d++)Math.abs(f)===u&&Math.abs(d)===u&&u>0&&(o||Yt(t+f,e+d,this.salt^h)<.72)||!ji(t+f,s+h,e+d)||this.get(t+f,s+h,e+d)!==0||this.write(t+f,s+h,e+d,6)}}spawn(){if(this.stage==="park"||this.stage==="crossing")return{...g0};if(this.stage==="school")return{...s0};if(this.stage==="frontier")return{...c0};for(let t=0;t<32;t++)for(let e=-t;e<=t;e++)for(let n=-t;n<=t;n++){if(Math.max(Math.abs(n),Math.abs(e))!==t)continue;const s=vn+n,r=_n+e;for(let o=Ke-3;o>0;o--){const c=this.get(s,o,r);if(!(!ri(c)||c===6||c===5||this.get(s,o+1,r)!==0||this.get(s,o+2,r)!==0))return{x:s+.5,y:o+1.001,z:r+.5,yaw:-.075,pitch:-.085}}}return{x:vn+.5,y:Ke+.01,z:_n+.5,yaw:0,pitch:0}}onEdit(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}set(t,e,n,s){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(n)||!ji(t,e,n)||!wo(s)||e===0)return!1;const r=Ce(t,e,n),o=this.data[r];if(o===s||o===14||o===22&&this.chests.get(r)?.length)return!1;const c=this.edits.get(r)?.base??o;return s===c?this.edits.delete(r):this.edits.set(r,{id:s,base:c}),this.replace(t,e,n,s),!0}replace(t,e,n,s){const r=Ce(t,e,n),o=this.data[r],c=To(t>>4,e>>4,n>>4);this.data[r]=s,this.axes.delete(r),this.chests.delete(r),this.benches.delete(r),this.occupied[c]+=+(s!==0)-+(o!==0),this.dense[c]+=Number(mo(s))-Number(mo(o)),(o===12||o===25)&&this.lamps.delete(r),(s===12||s===25)&&this.lamps.add(r);const a=t+Et*n;if(e>=this.highest[a]){let l=Math.max(e,this.highest[a]);for(;l>=0&&(!ri(this.data[Ce(t,l,n)])||this.data[Ce(t,l,n)]===10);)l--;this.highest[a]=l}for(const l of this.listeners)l(t,e,n)}exportEdits(){return Array.from(this.edits,([t,{id:e}])=>[t,e])}loadEdits(t){const e=new Set;for(const[n,s]of t){if(!Number.isInteger(n)||n<qe||n>=oc||!wo(s)||e.has(n)||(this.edits.get(n)?.base??this.data[n])===14)throw new Error("地形の変更データが不正です。");e.add(n)}this.history=[],this.axes.clear(),this.benches.clear(),this.chests.clear();for(const[n,{base:s}]of this.edits)this.replace(n%256,n>>>16,n>>>8&255,s);this.edits.clear();for(const[n,s]of t)this.set(n%256,n>>>16,n>>>8&255,s)}axisAt(t,e,n){return this.axes.get(Ce(t,e,n))??"y"}setAxis(t,e,n,s){if(this.get(t,e,n)!==5||!["x","y","z"].includes(s))return!1;if(this.axisAt(t,e,n)===s)return!0;const r=Ce(t,e,n);s==="y"?this.axes.delete(r):this.axes.set(r,s);for(const o of this.listeners)o(t,e,n);return!0}chestAt(t,e,n){if(this.get(t,e,n)!==22)return;const s=Ce(t,e,n),r=this.chests.get(s)??[];return this.chests.set(s,r),r}benchUses(t,e,n){return this.benches.get(Ce(t,e,n))??0}useBench(t,e,n,s=1){if(this.get(t,e,n)!==21||!Number.isSafeInteger(s)||s<1)return;const r=Ce(t,e,n);this.stage==="frontier"&&!this.edits.has(r)||this.benches.set(r,Math.min(Number.MAX_SAFE_INTEGER,this.benchUses(t,e,n)+s))}exportFixtures(){return{axes:[...this.axes],benches:[...this.benches],chests:[...this.chests].filter(([,t])=>t.length).map(([t,e])=>[t,e.map(n=>({...n}))])}}loadFixtures(t){if(!ap(t)||t.axes.some(([n])=>this.data[n]!==5)||t.chests.some(([n])=>this.data[n]!==22)||t.benches.some(([n])=>this.data[n]!==21))throw new Error("建具と地形の保存内容が一致しません。元のバックアップを確認してください。");const e=new Set([...this.axes.keys(),...t.axes.map(([n])=>n)]);this.axes=new Map(t.axes),this.benches=new Map(t.benches),this.chests=new Map(t.chests.map(([n,s])=>[n,s.map(r=>({...r}))]));for(const n of e)for(const s of this.listeners)s(n%256,n>>>16,n>>>8&255)}capture(t,e,n){return{x:t,y:e,z:n,id:this.get(t,e,n),axis:this.axisAt(t,e,n)}}remember(t){const e=this.capture(t.x,t.y,t.z);t.id===21||t.id===22||e.id===21||e.id===22||t.id===e.id&&t.axis===e.axis||(this.history.push({before:t,after:e}),this.history.length>20&&this.history.shift())}undo(t){const e=this.history.at(-1);if(!e)return{ok:!1,message:"戻せる通常ブロックの編集がありません。作業台・チェストは対象外です。"};const{before:n,after:s}=e,{x:r,y:o,z:c}=n;return this.get(r,o,c)!==s.id||this.axisAt(r,o,c)!==s.axis?(this.history.pop(),{ok:!1,message:"この場所はすでに変化したため、戻せません。"}):ri(n.id)&&t(r,o,c)?{ok:!1,message:"体と重なります。少し離れてから戻してください。"}:n.id!==s.id&&!this.set(r,o,c,n.id)?{ok:!1,message:"この編集は戻せません。"}:(n.id===5&&this.setAxis(r,o,c,n.axis),this.history.pop(),{ok:!0,message:"直前のブロック編集を戻しました。"})}}function cp(){return{toolMade:!1,caveVisited:!1,decorated:!1,hidden:!1,home:null}}function lp(i){if(!i||typeof i!="object")return!1;const t=i;if(![t.toolMade,t.caveVisited,t.decorated,t.hidden].every(n=>typeof n=="boolean")||t.caveVisited&&!t.toolMade||t.decorated&&!t.caveVisited)return!1;const e=t.home;return e===null||!!e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=0&&e.x<256&&e.z>=0&&e.z<256&&e.y>=0&&e.y<96}function I0(i,t){["wood-pick","wood-axe","stone-pick","stone-axe"].includes(t)&&(i.toolMade=!0)}function L0(i,t,e,n){if(!i.toolMade||i.caveVisited||!(Cr(n,12)||Cr(n,25)))return!1;const s=t.landmarks.find(r=>r.kind==="cave");if(s){if(e.x<s.x+2||e.x>s.x+16||Math.abs(e.z-s.z-.5)>3.8||Math.abs(e.y-s.y)>2.1)return!1}else{const r=Math.floor(e.x),o=Math.floor(e.z),c=Math.floor(e.y);let a=!1;for(let l=c+2;l<=Math.min(c+9,95);l++)if([2,3,8,11].includes(t.get(r,l,o))){a=!0;break}if(!a)return!1}return i.caveVisited=!0,!0}function hp(i,t,e){return!i.caveVisited||i.decorated||!i.home||t!==25&&t!==26||Math.hypot(e.x-i.home.x,e.y-i.home.y,e.z-i.home.z)>18?!1:(i.decorated=!0,!0)}function D0(i,t){return i.toolMade?i.caveVisited?i.decorated?"3/3 達成　拠点に潮晶の飾りが加わりました":t===2?"3/3　潮晶を持ち帰り、作業台で作った灯りかタイルを拠点に飾ろう":"3/3　作業台でガラスと石炭を潮晶に加工し、灯りかタイルを拠点に飾ろう":t===2?"2/3　灯晶ブロックを持って、潮晶の岩窟へ":"2/3　灯晶ブロックを持って、岩天井の洞窟へ":"1/3　原木を集め、木材と棒で木の道具を作ろう"}function ac(i,t){const e=i.x-t.x,n=i.z-t.z,s=Math.round(Math.hypot(e,n));if(s<2)return"足元";const r=Math.atan2(e,-n)+t.yaw;return["↑","↗","→","↘","↓","↙","←","↖"][(Math.round(r/(Math.PI/4))%8+8)%8]+" 約"+s+"m"}function kc(i,t){return i.home?"拠点 "+ac(i.home,t):""}const cc={low:{distance:2,scale:.7,shadows:!1,vegetation:!1,effects:!1},standard:{distance:3,scale:1,shadows:!0,vegetation:!0,effects:!0},high:{distance:5,scale:1.2,shadows:!0,vegetation:!0,effects:!0}},up={...cc.standard,quality:"standard",sensitivity:1,volume:.45,muted:!1,effectsVolume:.85,ambientVolume:.4,invertY:!1,bob:!0,sprintFov:!0},$o=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e;function Zh(i){if(!i||typeof i!="object")return!1;const t=i;return(t.quality==="legacy"||Object.hasOwn(cc,t.quality))&&Number.isInteger(t.distance)&&$o(t.distance,2,6)&&$o(t.scale,.5,1.5)&&$o(t.sensitivity,.3,2.5)&&[t.volume,t.effectsVolume,t.ambientVolume].every(e=>$o(e,0,1))&&[t.shadows,t.vegetation,t.effects,t.muted,t.invertY,t.bob,t.sprintFov].every(e=>typeof e=="boolean")}function fp(i){if(!i||typeof i!="object")throw Error("保存された設定を読み込めません。");const t={...up,quality:"legacy",...i};if(!Zh(t))throw Error("保存された設定の値が正しくありません。");return t}const $h="180",U0=0,Gu=1,N0=2,dp=1,F0=2,Mi=3,ss=0,mn=1,qn=2,Qi=0,Er=1,Wu=2,Xu=3,qu=4,k0=5,As=100,z0=101,O0=102,B0=103,H0=104,V0=200,G0=201,W0=202,X0=203,Xl=204,ql=205,q0=206,Y0=207,j0=208,K0=209,Z0=210,$0=211,J0=212,Q0=213,tg=214,Yl=0,jl=1,Kl=2,Pr=3,Zl=4,$l=5,Jl=6,Ql=7,pp=0,eg=1,ng=2,Ti=0,ig=1,sg=2,rg=3,og=4,ag=5,cg=6,lg=7,mp=300,Ir=301,Lr=302,th=303,eh=304,Tc=306,nh=1e3,Ls=1001,ih=1002,Ve=1003,hg=1004,lo=1005,oi=1006,zc=1007,Zi=1008,Di=1009,gp=1010,vp=1011,Ao=1012,Jh=1013,Bs=1014,ai=1015,Bo=1016,Qh=1017,tu=1018,Ro=1020,_p=35902,xp=35899,yp=1021,Mp=1022,Kn=1023,Co=1026,Po=1027,Ho=1028,eu=1029,bp=1030,nu=1031,iu=1033,Ha=33776,Va=33777,Ga=33778,Wa=33779,sh=35840,rh=35841,oh=35842,ah=35843,ch=36196,lh=37492,hh=37496,uh=37808,fh=37809,dh=37810,ph=37811,mh=37812,gh=37813,vh=37814,_h=37815,xh=37816,yh=37817,Mh=37818,bh=37819,Sh=37820,Eh=37821,wh=36492,Th=36494,Ah=36495,Rh=36283,Ch=36284,Ph=36285,Ih=36286,ug=3200,fg=3201,dg=0,pg=1,Ki="",sn="srgb",Dr="srgb-linear",lc="linear",he="srgb",js=7680,Yu=519,mg=512,gg=513,vg=514,Sp=515,_g=516,xg=517,yg=518,Mg=519,Lh=35044,Ep=35048,ju="300 es",ci=2e3,hc=2001;class zr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ku=1234567;const wr=Math.PI/180,Io=180/Math.PI;function Ai(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function su(i,t){return(i%t+t)%t}function bg(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Sg(i,t,e){return i!==t?(e-i)/(t-i):0}function go(i,t,e){return(1-e)*i+e*t}function Eg(i,t,e,n){return go(i,t,1-Math.exp(-e*n))}function wg(i,t=1){return t-Math.abs(su(i,t*2)-t)}function Tg(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ag(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Rg(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Cg(i,t){return i+Math.random()*(t-i)}function Pg(i){return i*(.5-Math.random())}function Ig(i){i!==void 0&&(Ku=i);let t=Ku+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lg(i){return i*wr}function Dg(i){return i*Io}function Ug(i){return(i&i-1)===0&&i!==0}function Ng(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Fg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function kg(i,t,e,n,s){const r=Math.cos,o=Math.sin,c=r(e/2),a=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),p=o((n-t)/2);switch(s){case"XYX":i.set(c*h,a*u,a*f,c*l);break;case"YZY":i.set(a*f,c*h,a*u,c*l);break;case"ZXZ":i.set(a*u,a*f,c*h,c*l);break;case"XZX":i.set(c*h,a*p,a*d,c*l);break;case"YXY":i.set(a*d,c*h,a*p,c*l);break;case"ZYZ":i.set(a*p,a*d,c*h,c*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Yn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ce(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const si={DEG2RAD:wr,RAD2DEG:Io,generateUUID:Ai,clamp:$t,euclideanModulo:su,mapLinear:bg,inverseLerp:Sg,lerp:go,damp:Eg,pingpong:wg,smoothstep:Tg,smootherstep:Ag,randInt:Rg,randFloat:Cg,randFloatSpread:Pg,seededRandom:Ig,degToRad:Lg,radToDeg:Dg,isPowerOfTwo:Ug,ceilPowerOfTwo:Ng,floorPowerOfTwo:Fg,setQuaternionFromProperEuler:kg,normalize:ce,denormalize:Yn};class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vo{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,c){let a=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],p=r[o+2],v=r[o+3];if(c===0){t[e+0]=a,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(c===1){t[e+0]=f,t[e+1]=d,t[e+2]=p,t[e+3]=v;return}if(u!==v||a!==f||l!==d||h!==p){let g=1-c;const m=a*f+l*d+h*p+u*v,_=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const A=Math.sqrt(b),w=Math.atan2(A,m*_);g=Math.sin(g*w)/A,c=Math.sin(c*w)/A}const y=c*_;if(a=a*g+f*y,l=l*g+d*y,h=h*g+p*y,u=u*g+v*y,g===1-c){const A=1/Math.sqrt(a*a+l*l+h*h+u*u);a*=A,l*=A,h*=A,u*=A}}t[e]=a,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const c=n[s],a=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return t[e]=c*p+h*u+a*d-l*f,t[e+1]=a*p+h*f+l*u-c*d,t[e+2]=l*p+h*d+c*f-a*u,t[e+3]=h*p-c*u-a*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,c=Math.cos,a=Math.sin,l=c(n/2),h=c(s/2),u=c(r/2),f=a(n/2),d=a(s/2),p=a(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"YZX":this._x=f*h*u+l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u-f*d*p;break;case"XZY":this._x=f*h*u-l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],c=e[5],a=e[9],l=e[2],h=e[6],u=e[10],f=n+c+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-a)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>c&&n>u){const d=2*Math.sqrt(1+n-c-u);this._w=(h-a)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(c>u){const d=2*Math.sqrt(1+c-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(a+h)/d}else{const d=2*Math.sqrt(1+u-n-c);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(a+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,c=e._x,a=e._y,l=e._z,h=e._w;return this._x=n*h+o*c+s*l-r*a,this._y=s*h+o*a+r*c-n*l,this._z=r*h+o*l+n*a-s*c,this._w=o*h-n*c-s*a-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let c=o*t._w+n*t._x+s*t._y+r*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const a=1-c*c;if(a<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(a),h=Math.atan2(l,c),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,c=t.z,a=t.w,l=2*(o*s-c*n),h=2*(c*e-r*s),u=2*(r*n-o*e);return this.x=e+a*l+o*u-c*h,this.y=n+a*h+c*l-r*u,this.z=s+a*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,c=e.y,a=e.z;return this.x=s*a-r*c,this.y=r*o-n*a,this.z=n*c-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oc.copy(this).projectOnVector(t),this.sub(Oc)}reflect(t){return this.sub(Oc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oc=new N,Zu=new Vo;class Vt{constructor(t,e,n,s,r,o,c,a,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,c,a,l)}set(t,e,n,s,r,o,c,a,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=c,h[3]=e,h[4]=r,h[5]=a,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],c=n[3],a=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],v=s[0],g=s[3],m=s[6],_=s[1],b=s[4],y=s[7],A=s[2],w=s[5],R=s[8];return r[0]=o*v+c*_+a*A,r[3]=o*g+c*b+a*w,r[6]=o*m+c*y+a*R,r[1]=l*v+h*_+u*A,r[4]=l*g+h*b+u*w,r[7]=l*m+h*y+u*R,r[2]=f*v+d*_+p*A,r[5]=f*g+d*b+p*w,r[8]=f*m+d*y+p*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],c=t[5],a=t[6],l=t[7],h=t[8];return e*o*h-e*c*l-n*r*h+n*c*a+s*r*l-s*o*a}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],c=t[5],a=t[6],l=t[7],h=t[8],u=h*o-c*l,f=c*a-h*r,d=l*r-o*a,p=e*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(c*n-s*o)*v,t[3]=f*v,t[4]=(h*e-s*a)*v,t[5]=(s*r-c*e)*v,t[6]=d*v,t[7]=(n*a-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,c){const a=Math.cos(r),l=Math.sin(r);return this.set(n*a,n*l,-n*(a*o+l*c)+o+t,-s*l,s*a,-s*(-l*o+a*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Bc.makeScale(t,e)),this}rotate(t){return this.premultiply(Bc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bc=new Vt;function wp(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function uc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zg(){const i=uc("canvas");return i.style.display="block",i}const $u={};function Lo(i){i in $u||($u[i]=!0,console.warn(i))}function Og(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ju=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bg(){const i={enabled:!0,workingColorSpace:Dr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(s.r=Tr(s.r),s.g=Tr(s.g),s.b=Tr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ki?lc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Lo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Lo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Dr]:{primaries:t,whitePoint:n,transfer:lc,toXYZ:Ju,fromXYZ:Qu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:t,whitePoint:n,transfer:he,toXYZ:Ju,fromXYZ:Qu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),i}const se=Bg();function Ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Tr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ks;class Hg{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ks===void 0&&(Ks=uc("canvas")),Ks.width=t.width,Ks.height=t.height;const s=Ks.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ks}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=uc("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ri(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ri(e[n]/255)*255):e[n]=Ri(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Vg=0;class ru{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=Ai(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,c=s.length;o<c;o++)s[o].isDataTexture?r.push(Hc(s[o].image)):r.push(Hc(s[o]))}else r=Hc(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Hc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gg=0;const Vc=new N;class on extends zr{constructor(t=on.DEFAULT_IMAGE,e=on.DEFAULT_MAPPING,n=Ls,s=Ls,r=oi,o=Zi,c=Kn,a=Di,l=on.DEFAULT_ANISOTROPY,h=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=Ai(),this.name="",this.source=new ru(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=a,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Vc).x}get height(){return this.source.getSize(Vc).y}get depth(){return this.source.getSize(Vc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case nh:t.x=t.x-Math.floor(t.x);break;case Ls:t.x=t.x<0?0:1;break;case ih:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case nh:t.y=t.y-Math.floor(t.y);break;case Ls:t.y=t.y<0?0:1;break;case ih:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=mp;on.DEFAULT_ANISOTROPY=1;class Fe{constructor(t=0,e=0,n=0,s=1){Fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const a=t.elements,l=a[0],h=a[4],u=a[8],f=a[1],d=a[5],p=a[9],v=a[2],g=a[6],m=a[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,y=(d+1)/2,A=(m+1)/2,w=(h+f)/4,R=(u+v)/4,L=(p+g)/4;return b>y&&b>A?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=w/n,r=R/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=L/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=L/r),this.set(n,s,r,e),this}let _=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(u-v)/_,this.z=(f-h)/_,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wg extends zr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:oi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Fe(0,0,t,e),this.scissorTest=!1,this.viewport=new Fe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new on(s);this.textures=[];const o=n.count;for(let c=0;c<o;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:oi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ru(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hs extends Wg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Tp extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xg extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cs{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,c=r.count;o<c;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Jo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jo.copy(n.boundingBox)),Jo.applyMatrix4(t.matrixWorld),this.union(Jo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Wr),Qo.subVectors(this.max,Wr),Zs.subVectors(t.a,Wr),$s.subVectors(t.b,Wr),Js.subVectors(t.c,Wr),ki.subVectors($s,Zs),zi.subVectors(Js,$s),ms.subVectors(Zs,Js);let e=[0,-ki.z,ki.y,0,-zi.z,zi.y,0,-ms.z,ms.y,ki.z,0,-ki.x,zi.z,0,-zi.x,ms.z,0,-ms.x,-ki.y,ki.x,0,-zi.y,zi.x,0,-ms.y,ms.x,0];return!Gc(e,Zs,$s,Js,Qo)||(e=[1,0,0,0,1,0,0,0,1],!Gc(e,Zs,$s,Js,Qo))?!1:(ta.crossVectors(ki,zi),e=[ta.x,ta.y,ta.z],Gc(e,Zs,$s,Js,Qo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const gi=[new N,new N,new N,new N,new N,new N,new N,new N],Vn=new N,Jo=new cs,Zs=new N,$s=new N,Js=new N,ki=new N,zi=new N,ms=new N,Wr=new N,Qo=new N,ta=new N,gs=new N;function Gc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){gs.fromArray(i,r);const c=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),a=t.dot(gs),l=e.dot(gs),h=n.dot(gs);if(Math.max(-Math.max(a,l,h),Math.min(a,l,h))>c)return!1}return!0}const qg=new cs,Xr=new N,Wc=new N;class Or{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):qg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xr.subVectors(t,this.center);const e=Xr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Xr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xr.copy(t.center).add(Wc)),this.expandByPoint(Xr.copy(t.center).sub(Wc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const vi=new N,Xc=new N,ea=new N,Oi=new N,qc=new N,na=new N,Yc=new N;class ou{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xc.copy(t).add(e).multiplyScalar(.5),ea.copy(e).sub(t).normalize(),Oi.copy(this.origin).sub(Xc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ea),c=Oi.dot(this.direction),a=-Oi.dot(ea),l=Oi.lengthSq(),h=Math.abs(1-o*o);let u,f,d,p;if(h>0)if(u=o*a-c,f=o*c-a,p=r*h,u>=0)if(f>=-p)if(f<=p){const v=1/h;u*=v,f*=v,d=u*(u+o*f+2*c)+f*(o*u+f+2*a)+l}else f=r,u=Math.max(0,-(o*f+c)),d=-u*u+f*(f+2*a)+l;else f=-r,u=Math.max(0,-(o*f+c)),d=-u*u+f*(f+2*a)+l;else f<=-p?(u=Math.max(0,-(-o*r+c)),f=u>0?-r:Math.min(Math.max(-r,-a),r),d=-u*u+f*(f+2*a)+l):f<=p?(u=0,f=Math.min(Math.max(-r,-a),r),d=f*(f+2*a)+l):(u=Math.max(0,-(o*r+c)),f=u>0?r:Math.min(Math.max(-r,-a),r),d=-u*u+f*(f+2*a)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+c)),d=-u*u+f*(f+2*a)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xc).addScaledVector(ea,f),d}intersectSphere(t,e){vi.subVectors(t.center,this.origin);const n=vi.dot(this.direction),s=vi.dot(vi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),c=n-o,a=n+o;return a<0?null:c<0?this.at(a,e):this.at(c,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,c,a;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(c=(t.min.z-f.z)*u,a=(t.max.z-f.z)*u):(c=(t.max.z-f.z)*u,a=(t.min.z-f.z)*u),n>a||c>s)||((c>n||n!==n)&&(n=c),(a<s||s!==s)&&(s=a),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,n,s,r){qc.subVectors(e,t),na.subVectors(n,t),Yc.crossVectors(qc,na);let o=this.direction.dot(Yc),c;if(o>0){if(s)return null;c=1}else if(o<0)c=-1,o=-o;else return null;Oi.subVectors(this.origin,t);const a=c*this.direction.dot(na.crossVectors(Oi,na));if(a<0)return null;const l=c*this.direction.dot(qc.cross(Oi));if(l<0||a+l>o)return null;const h=-c*Oi.dot(Yc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,s,r,o,c,a,l,h,u,f,d,p,v,g){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,c,a,l,h,u,f,d,p,v,g)}set(t,e,n,s,r,o,c,a,l,h,u,f,d,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=c,m[13]=a,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Qs.setFromMatrixColumn(t,0).length(),r=1/Qs.setFromMatrixColumn(t,1).length(),o=1/Qs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),c=Math.sin(n),a=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,p=c*h,v=c*u;e[0]=a*h,e[4]=-a*u,e[8]=l,e[1]=d+p*l,e[5]=f-v*l,e[9]=-c*a,e[2]=v-f*l,e[6]=p+d*l,e[10]=o*a}else if(t.order==="YXZ"){const f=a*h,d=a*u,p=l*h,v=l*u;e[0]=f+v*c,e[4]=p*c-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-c,e[2]=d*c-p,e[6]=v+f*c,e[10]=o*a}else if(t.order==="ZXY"){const f=a*h,d=a*u,p=l*h,v=l*u;e[0]=f-v*c,e[4]=-o*u,e[8]=p+d*c,e[1]=d+p*c,e[5]=o*h,e[9]=v-f*c,e[2]=-o*l,e[6]=c,e[10]=o*a}else if(t.order==="ZYX"){const f=o*h,d=o*u,p=c*h,v=c*u;e[0]=a*h,e[4]=p*l-d,e[8]=f*l+v,e[1]=a*u,e[5]=v*l+f,e[9]=d*l-p,e[2]=-l,e[6]=c*a,e[10]=o*a}else if(t.order==="YZX"){const f=o*a,d=o*l,p=c*a,v=c*l;e[0]=a*h,e[4]=v-f*u,e[8]=p*u+d,e[1]=u,e[5]=o*h,e[9]=-c*h,e[2]=-l*h,e[6]=d*u+p,e[10]=f-v*u}else if(t.order==="XZY"){const f=o*a,d=o*l,p=c*a,v=c*l;e[0]=a*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=c*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yg,t,jg)}lookAt(t,e,n){const s=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Bi.crossVectors(n,wn),Bi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Bi.crossVectors(n,wn)),Bi.normalize(),ia.crossVectors(wn,Bi),s[0]=Bi.x,s[4]=ia.x,s[8]=wn.x,s[1]=Bi.y,s[5]=ia.y,s[9]=wn.y,s[2]=Bi.z,s[6]=ia.z,s[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],c=n[4],a=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],v=n[6],g=n[10],m=n[14],_=n[3],b=n[7],y=n[11],A=n[15],w=s[0],R=s[4],L=s[8],E=s[12],S=s[1],C=s[5],D=s[9],O=s[13],W=s[2],X=s[6],j=s[10],K=s[14],H=s[3],st=s[7],ot=s[11],ft=s[15];return r[0]=o*w+c*S+a*W+l*H,r[4]=o*R+c*C+a*X+l*st,r[8]=o*L+c*D+a*j+l*ot,r[12]=o*E+c*O+a*K+l*ft,r[1]=h*w+u*S+f*W+d*H,r[5]=h*R+u*C+f*X+d*st,r[9]=h*L+u*D+f*j+d*ot,r[13]=h*E+u*O+f*K+d*ft,r[2]=p*w+v*S+g*W+m*H,r[6]=p*R+v*C+g*X+m*st,r[10]=p*L+v*D+g*j+m*ot,r[14]=p*E+v*O+g*K+m*ft,r[3]=_*w+b*S+y*W+A*H,r[7]=_*R+b*C+y*X+A*st,r[11]=_*L+b*D+y*j+A*ot,r[15]=_*E+b*O+y*K+A*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],c=t[5],a=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+r*a*u-s*l*u-r*c*f+n*l*f+s*c*d-n*a*d)+v*(+e*a*d-e*l*f+r*o*f-s*o*d+s*l*h-r*a*h)+g*(+e*l*u-e*c*d-r*o*u+n*o*d+r*c*h-n*l*h)+m*(-s*c*h-e*a*u+e*c*f+s*o*u-n*o*f+n*a*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],c=t[5],a=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],v=t[13],g=t[14],m=t[15],_=u*g*l-v*f*l+v*a*d-c*g*d-u*a*m+c*f*m,b=p*f*l-h*g*l-p*a*d+o*g*d+h*a*m-o*f*m,y=h*v*l-p*u*l+p*c*d-o*v*d-h*c*m+o*u*m,A=p*u*a-h*v*a-p*c*f+o*v*f+h*c*g-o*u*g,w=e*_+n*b+s*y+r*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=_*R,t[1]=(v*f*r-u*g*r-v*s*d+n*g*d+u*s*m-n*f*m)*R,t[2]=(c*g*r-v*a*r+v*s*l-n*g*l-c*s*m+n*a*m)*R,t[3]=(u*a*r-c*f*r-u*s*l+n*f*l+c*s*d-n*a*d)*R,t[4]=b*R,t[5]=(h*g*r-p*f*r+p*s*d-e*g*d-h*s*m+e*f*m)*R,t[6]=(p*a*r-o*g*r-p*s*l+e*g*l+o*s*m-e*a*m)*R,t[7]=(o*f*r-h*a*r+h*s*l-e*f*l-o*s*d+e*a*d)*R,t[8]=y*R,t[9]=(p*u*r-h*v*r-p*n*d+e*v*d+h*n*m-e*u*m)*R,t[10]=(o*v*r-p*c*r+p*n*l-e*v*l-o*n*m+e*c*m)*R,t[11]=(h*c*r-o*u*r-h*n*l+e*u*l+o*n*d-e*c*d)*R,t[12]=A*R,t[13]=(h*v*s-p*u*s+p*n*f-e*v*f-h*n*g+e*u*g)*R,t[14]=(p*c*s-o*v*s-p*n*a+e*v*a+o*n*g-e*c*g)*R,t[15]=(o*u*s-h*c*s+h*n*a-e*u*a-o*n*f+e*c*f)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,c=t.y,a=t.z,l=r*o,h=r*c;return this.set(l*o+n,l*c-s*a,l*a+s*c,0,l*c+s*a,h*c+n,h*a-s*o,0,l*a-s*c,h*a+s*o,r*a*a+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,c=e._z,a=e._w,l=r+r,h=o+o,u=c+c,f=r*l,d=r*h,p=r*u,v=o*h,g=o*u,m=c*u,_=a*l,b=a*h,y=a*u,A=n.x,w=n.y,R=n.z;return s[0]=(1-(v+m))*A,s[1]=(d+y)*A,s[2]=(p-b)*A,s[3]=0,s[4]=(d-y)*w,s[5]=(1-(f+m))*w,s[6]=(g+_)*w,s[7]=0,s[8]=(p+b)*R,s[9]=(g-_)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Qs.set(s[0],s[1],s[2]).length();const o=Qs.set(s[4],s[5],s[6]).length(),c=Qs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Gn.copy(this);const l=1/r,h=1/o,u=1/c;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,e.setFromRotationMatrix(Gn),n.x=r,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,o,c=ci,a=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let p,v;if(a)p=r/(o-r),v=o*r/(o-r);else if(c===ci)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(c===hc)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,c=ci,a=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let p,v;if(a)p=1/(o-r),v=o/(o-r);else if(c===ci)p=-2/(o-r),v=-(o+r)/(o-r);else if(c===hc)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Qs=new N,Gn=new xe,Yg=new N(0,0,0),jg=new N(1,1,1),Bi=new N,ia=new N,wn=new N,tf=new xe,ef=new Vo;class Ui{constructor(t=0,e=0,n=0,s=Ui.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],c=s[8],a=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin($t(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(a,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(a,r));break;case"ZYX":this._y=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(a,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin($t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-$t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ef.setFromEuler(this),this.setFromQuaternion(ef,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ui.DEFAULT_ORDER="XYZ";class Ap{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kg=0;const nf=new N,tr=new Vo,_i=new xe,sa=new N,qr=new N,Zg=new N,$g=new Vo,sf=new N(1,0,0),rf=new N(0,1,0),of=new N(0,0,1),af={type:"added"},Jg={type:"removed"},er={type:"childadded",child:null},jc={type:"childremoved",child:null};class De extends zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new N,e=new Ui,n=new Vo,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xe},normalMatrix:{value:new Vt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ap,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return tr.setFromAxisAngle(t,e),this.quaternion.multiply(tr),this}rotateOnWorldAxis(t,e){return tr.setFromAxisAngle(t,e),this.quaternion.premultiply(tr),this}rotateX(t){return this.rotateOnAxis(sf,t)}rotateY(t){return this.rotateOnAxis(rf,t)}rotateZ(t){return this.rotateOnAxis(of,t)}translateOnAxis(t,e){return nf.copy(t).applyQuaternion(this.quaternion),this.position.add(nf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sf,t)}translateY(t){return this.translateOnAxis(rf,t)}translateZ(t){return this.translateOnAxis(of,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?sa.copy(t):sa.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(qr,sa,this.up):_i.lookAt(sa,qr,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),tr.setFromRotationMatrix(_i),this.quaternion.premultiply(tr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(af),er.child=t,this.dispatchEvent(er),er.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jg),jc.child=t,this.dispatchEvent(jc),jc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(af),er.child=t,this.dispatchEvent(er),er.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,t,Zg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,$g,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,a){return c[a.uuid]===void 0&&(c[a.uuid]=a.toJSON(t)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const a=c.shapes;if(Array.isArray(a))for(let l=0,h=a.length;l<h;l++){const u=a[l];r(t.shapes,u)}else r(t.shapes,a)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let a=0,l=this.material.length;a<l;a++)c.push(r(t.materials,this.material[a]));s.material=c}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const a=this.animations[c];s.animations.push(r(t.animations,a))}}if(e){const c=o(t.geometries),a=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),p=o(t.nodes);c.length>0&&(n.geometries=c),a.length>0&&(n.materials=a),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(c){const a=[];for(const l in c){const h=c[l];delete h.metadata,a.push(h)}return a}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}De.DEFAULT_UP=new N(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new N,xi=new N,Kc=new N,yi=new N,nr=new N,ir=new N,cf=new N,Zc=new N,$c=new N,Jc=new N,Qc=new Fe,tl=new Fe,el=new Fe;class Pn{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Wn.subVectors(t,e),s.cross(Wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Wn.subVectors(s,e),xi.subVectors(n,e),Kc.subVectors(t,e);const o=Wn.dot(Wn),c=Wn.dot(xi),a=Wn.dot(Kc),l=xi.dot(xi),h=xi.dot(Kc),u=o*l-c*c;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*a-c*h)*f,p=(o*h-c*a)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(t,e,n,s,r,o,c,a){return this.getBarycoord(t,e,n,s,yi)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(r,yi.x),a.addScaledVector(o,yi.y),a.addScaledVector(c,yi.z),a)}static getInterpolatedAttribute(t,e,n,s,r,o){return Qc.setScalar(0),tl.setScalar(0),el.setScalar(0),Qc.fromBufferAttribute(t,e),tl.fromBufferAttribute(t,n),el.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Qc,r.x),o.addScaledVector(tl,r.y),o.addScaledVector(el,r.z),o}static isFrontFacing(t,e,n,s){return Wn.subVectors(n,e),xi.subVectors(t,e),Wn.cross(xi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Wn.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Pn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Pn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Pn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,c;nr.subVectors(s,n),ir.subVectors(r,n),Zc.subVectors(t,n);const a=nr.dot(Zc),l=ir.dot(Zc);if(a<=0&&l<=0)return e.copy(n);$c.subVectors(t,s);const h=nr.dot($c),u=ir.dot($c);if(h>=0&&u<=h)return e.copy(s);const f=a*u-h*l;if(f<=0&&a>=0&&h<=0)return o=a/(a-h),e.copy(n).addScaledVector(nr,o);Jc.subVectors(t,r);const d=nr.dot(Jc),p=ir.dot(Jc);if(p>=0&&d<=p)return e.copy(r);const v=d*l-a*p;if(v<=0&&l>=0&&p<=0)return c=l/(l-p),e.copy(n).addScaledVector(ir,c);const g=h*p-d*u;if(g<=0&&u-h>=0&&d-p>=0)return cf.subVectors(r,s),c=(u-h)/(u-h+(d-p)),e.copy(s).addScaledVector(cf,c);const m=1/(g+v+f);return o=v*m,c=f*m,e.copy(n).addScaledVector(nr,o).addScaledVector(ir,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Rp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},ra={h:0,s:0,l:0};function nl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=su(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=nl(o,r,t+1/3),this.g=nl(o,r,t),this.b=nl(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],c=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const n=Rp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}copyLinearToSRGB(t){return this.r=Tr(t.r),this.g=Tr(t.g),this.b=Tr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return se.workingToColorSpace(nn.copy(this),t),Math.round($t(nn.r*255,0,255))*65536+Math.round($t(nn.g*255,0,255))*256+Math.round($t(nn.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(nn.copy(this),e);const n=nn.r,s=nn.g,r=nn.b,o=Math.max(n,s,r),c=Math.min(n,s,r);let a,l;const h=(c+o)/2;if(c===o)a=0,l=0;else{const u=o-c;switch(l=h<=.5?u/(o+c):u/(2-o-c),o){case n:a=(s-r)/u+(s<r?6:0);break;case s:a=(r-n)/u+2;break;case r:a=(n-s)/u+4;break}a/=6}return t.h=a,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=sn){se.workingToColorSpace(nn.copy(this),t);const e=nn.r,n=nn.g,s=nn.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Hi),this.setHSL(Hi.h+t,Hi.s+e,Hi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hi),t.getHSL(ra);const n=go(Hi.h,ra.h,e),s=go(Hi.s,ra.s,e),r=go(Hi.l,ra.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new qt;qt.NAMES=Rp;let Qg=0;class Br extends zr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=Er,this.side=ss,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xl,this.blendDst=ql,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Er&&(n.blending=this.blending),this.side!==ss&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xl&&(n.blendSrc=this.blendSrc),this.blendDst!==ql&&(n.blendDst=this.blendDst),this.blendEquation!==As&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==js&&(n.stencilFail=this.stencilFail),this.stencilZFail!==js&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==js&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const c in r){const a=r[c];delete a.metadata,o.push(a)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Fi extends Br{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.combine=pp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Oe=new N,oa=new Jt;let t1=0;class an{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:t1++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Lh,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)oa.fromBufferAttribute(this,e),oa.applyMatrix3(t),this.setXY(e,oa.x,oa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array),r=ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Lh&&(t.usage=this.usage),t}}class Cp extends an{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Pp extends an{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ee extends an{constructor(t,e,n){super(new Float32Array(t),e,n)}}let e1=0;const Un=new xe,il=new De,sr=new N,Tn=new cs,Yr=new cs,Xe=new N;class ln extends zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wp(t)?Pp:Cp)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Un.makeRotationFromQuaternion(t),this.applyMatrix4(Un),this}rotateX(t){return Un.makeRotationX(t),this.applyMatrix4(Un),this}rotateY(t){return Un.makeRotationY(t),this.applyMatrix4(Un),this}rotateZ(t){return Un.makeRotationZ(t),this.applyMatrix4(Un),this}translate(t,e,n){return Un.makeTranslation(t,e,n),this.applyMatrix4(Un),this}scale(t,e,n){return Un.makeScale(t,e,n),this.applyMatrix4(Un),this}lookAt(t){return il.lookAt(t),il.updateMatrix(),this.applyMatrix4(il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(sr).negate(),this.translate(sr.x,sr.y,sr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ee(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const c=e[r];Yr.setFromBufferAttribute(c),this.morphTargetsRelative?(Xe.addVectors(Tn.min,Yr.min),Tn.expandByPoint(Xe),Xe.addVectors(Tn.max,Yr.max),Tn.expandByPoint(Xe)):(Tn.expandByPoint(Yr.min),Tn.expandByPoint(Yr.max))}Tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Xe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Xe));if(e)for(let r=0,o=e.length;r<o;r++){const c=e[r],a=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)Xe.fromBufferAttribute(c,l),a&&(sr.fromBufferAttribute(t,l),Xe.add(sr)),s=Math.max(s,n.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),c=[],a=[];for(let L=0;L<n.count;L++)c[L]=new N,a[L]=new N;const l=new N,h=new N,u=new N,f=new Jt,d=new Jt,p=new Jt,v=new N,g=new N;function m(L,E,S){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,S),h.sub(l),u.sub(l),d.sub(f),p.sub(f);const C=1/(d.x*p.y-p.x*d.y);isFinite(C)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(C),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(C),c[L].add(v),c[E].add(v),c[S].add(v),a[L].add(g),a[E].add(g),a[S].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let L=0,E=_.length;L<E;++L){const S=_[L],C=S.start,D=S.count;for(let O=C,W=C+D;O<W;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const b=new N,y=new N,A=new N,w=new N;function R(L){A.fromBufferAttribute(s,L),w.copy(A);const E=c[L];b.copy(E),b.sub(A.multiplyScalar(A.dot(E))).normalize(),y.crossVectors(w,E);const C=y.dot(a[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,C)}for(let L=0,E=_.length;L<E;++L){const S=_[L],C=S.start,D=S.count;for(let O=C,W=C+D;O<W;O+=3)R(t.getX(O+0)),R(t.getX(O+1)),R(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new N,r=new N,o=new N,c=new N,a=new N,l=new N,h=new N,u=new N;if(t)for(let f=0,d=t.count;f<d;f+=3){const p=t.getX(f+0),v=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),c.fromBufferAttribute(n,p),a.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),c.add(h),a.add(h),l.add(h),n.setXYZ(p,c.x,c.y,c.z),n.setXYZ(v,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(c,a){const l=c.array,h=c.itemSize,u=c.normalized,f=new l.constructor(a.length*h);let d=0,p=0;for(let v=0,g=a.length;v<g;v++){c.isInterleavedBufferAttribute?d=a[v]*c.data.stride+c.offset:d=a[v]*h;for(let m=0;m<h;m++)f[p++]=l[d++]}return new an(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ln,n=this.index.array,s=this.attributes;for(const c in s){const a=s[c],l=t(a,n);e.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const a=[],l=r[c];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);a.push(d)}e.morphAttributes[c]=a}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let c=0,a=o.length;c<a;c++){const l=o[c];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const a=this.parameters;for(const l in a)a[l]!==void 0&&(t[l]=a[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const a in n){const l=n[a];t.data.attributes[a]=l.toJSON(t.data)}const s={};let r=!1;for(const a in this.morphAttributes){const l=this.morphAttributes[a],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[a]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere=c.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const a=t.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lf=new xe,vs=new ou,aa=new Or,hf=new N,ca=new N,la=new N,ha=new N,sl=new N,ua=new N,uf=new N,fa=new N;class we extends De{constructor(t=new ln,e=new Fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(r&&c){ua.set(0,0,0);for(let a=0,l=r.length;a<l;a++){const h=c[a],u=r[a];h!==0&&(sl.fromBufferAttribute(u,t),o?ua.addScaledVector(sl,h):ua.addScaledVector(sl.sub(e),h))}e.add(ua)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(r),vs.copy(t.ray).recast(t.near),!(aa.containsPoint(vs.origin)===!1&&(vs.intersectSphere(aa,hf)===null||vs.origin.distanceToSquared(hf)>(t.far-t.near)**2))&&(lf.copy(r).invert(),vs.copy(t.ray).applyMatrix4(lf),!(n.boundingBox!==null&&vs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,vs)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,c=r.index,a=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],_=Math.max(g.start,d.start),b=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let y=_,A=b;y<A;y+=3){const w=c.getX(y),R=c.getX(y+1),L=c.getX(y+2);s=da(this,m,t,n,l,h,u,w,R,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const _=c.getX(g),b=c.getX(g+1),y=c.getX(g+2);s=da(this,o,t,n,l,h,u,_,b,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(a!==void 0)if(Array.isArray(o))for(let p=0,v=f.length;p<v;p++){const g=f[p],m=o[g.materialIndex],_=Math.max(g.start,d.start),b=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let y=_,A=b;y<A;y+=3){const w=y,R=y+1,L=y+2;s=da(this,m,t,n,l,h,u,w,R,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const _=g,b=g+1,y=g+2;s=da(this,o,t,n,l,h,u,_,b,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function n1(i,t,e,n,s,r,o,c){let a;if(t.side===mn?a=n.intersectTriangle(o,r,s,!0,c):a=n.intersectTriangle(s,r,o,t.side===ss,c),a===null)return null;fa.copy(c),fa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(fa);return l<e.near||l>e.far?null:{distance:l,point:fa.clone(),object:i}}function da(i,t,e,n,s,r,o,c,a,l){i.getVertexPosition(c,ca),i.getVertexPosition(a,la),i.getVertexPosition(l,ha);const h=n1(i,t,e,n,ca,la,ha,uf);if(h){const u=new N;Pn.getBarycoord(uf,ca,la,ha,u),s&&(h.uv=Pn.getInterpolatedAttribute(s,c,a,l,u,new Jt)),r&&(h.uv1=Pn.getInterpolatedAttribute(r,c,a,l,u,new Jt)),o&&(h.normal=Pn.getInterpolatedAttribute(o,c,a,l,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:a,c:l,normal:new N,materialIndex:0};Pn.getNormal(ca,la,ha,f.normal),h.face=f,h.barycoord=u}return h}class yn extends ln{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const c=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const a=[],l=[],h=[],u=[];let f=0,d=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(a),this.setAttribute("position",new Ee(l,3)),this.setAttribute("normal",new Ee(h,3)),this.setAttribute("uv",new Ee(u,2));function p(v,g,m,_,b,y,A,w,R,L,E){const S=y/R,C=A/L,D=y/2,O=A/2,W=w/2,X=R+1,j=L+1;let K=0,H=0;const st=new N;for(let ot=0;ot<j;ot++){const ft=ot*C-O;for(let Gt=0;Gt<X;Gt++){const Qt=Gt*S-D;st[v]=Qt*_,st[g]=ft*b,st[m]=W,l.push(st.x,st.y,st.z),st[v]=0,st[g]=0,st[m]=w>0?1:-1,h.push(st.x,st.y,st.z),u.push(Gt/R),u.push(1-ot/L),K+=1}}for(let ot=0;ot<L;ot++)for(let ft=0;ft<R;ft++){const Gt=f+ft+X*ot,Qt=f+ft+X*(ot+1),me=f+(ft+1)+X*(ot+1),Xt=f+(ft+1)+X*ot;a.push(Gt,Qt,Xt),a.push(Qt,me,Xt),H+=6}c.addGroup(d,H,E),d+=H,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ur(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function dn(i){const t={};for(let e=0;e<i.length;e++){const n=Ur(i[e]);for(const s in n)t[s]=n[s]}return t}function i1(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ip(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const s1={clone:Ur,merge:dn};var r1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cn extends Br{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r1,this.fragmentShader=o1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ur(t.uniforms),this.uniformsGroups=i1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lp extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new N,ff=new Jt,df=new Jt;class kn extends Lp{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Io*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Io*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vi.x,Vi.y).multiplyScalar(-t/Vi.z)}getViewSize(t,e){return this.getViewBounds(t,ff,df),e.subVectors(df,ff)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(wr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const a=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/a,e-=o.offsetY*n/l,s*=o.width/a,n*=o.height/l}const c=this.filmOffset;c!==0&&(r+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const rr=-90,or=1;class a1 extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kn(rr,or,t,e);s.layers=this.layers,this.add(s);const r=new kn(rr,or,t,e);r.layers=this.layers,this.add(r);const o=new kn(rr,or,t,e);o.layers=this.layers,this.add(o);const c=new kn(rr,or,t,e);c.layers=this.layers,this.add(c);const a=new kn(rr,or,t,e);a.layers=this.layers,this.add(a);const l=new kn(rr,or,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,c,a]=e;for(const l of e)this.remove(l);if(t===ci)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(t===hc)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,c,a,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,a),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Dp extends on{constructor(t=[],e=Ir,n,s,r,o,c,a,l,h){super(t,e,n,s,r,o,c,a,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class c1 extends Hs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Dp(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new yn(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:Ur(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:mn,blending:Qi});r.uniforms.tEquirect.value=e;const o=new we(s,r),c=e.minFilter;return e.minFilter===Zi&&(e.minFilter=oi),new a1(1,10,this).update(t,o),e.minFilter=c,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class li extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const l1={type:"move"};class rl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const c=this._targetRay,a=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;l.inputState.pinching&&f>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else a!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(l1)))}return c!==null&&(c.visible=s!==null),a!==null&&(a.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new li;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class h1 extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ui,this.environmentIntensity=1,this.environmentRotation=new Ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class u1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Lh,this.updateRanges=[],this.version=0,this.uuid=Ai()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const fn=new N;class fc{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)fn.fromBufferAttribute(this,e),fn.applyMatrix4(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)fn.fromBufferAttribute(this,e),fn.applyNormalMatrix(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)fn.fromBufferAttribute(this,e),fn.transformDirection(t),this.setXYZ(e,fn.x,fn.y,fn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array),r=ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new an(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Up extends Br{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ar;const jr=new N,cr=new N,lr=new N,hr=new Jt,Kr=new Jt,Np=new xe,pa=new N,Zr=new N,ma=new N,pf=new Jt,ol=new Jt,mf=new Jt;class f1 extends De{constructor(t=new Up){if(super(),this.isSprite=!0,this.type="Sprite",ar===void 0){ar=new ln;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new u1(e,5);ar.setIndex([0,1,2,0,2,3]),ar.setAttribute("position",new fc(n,3,0,!1)),ar.setAttribute("uv",new fc(n,2,3,!1))}this.geometry=ar,this.material=t,this.center=new Jt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cr.setFromMatrixScale(this.matrixWorld),Np.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),lr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cr.multiplyScalar(-lr.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;ga(pa.set(-.5,-.5,0),lr,o,cr,s,r),ga(Zr.set(.5,-.5,0),lr,o,cr,s,r),ga(ma.set(.5,.5,0),lr,o,cr,s,r),pf.set(0,0),ol.set(1,0),mf.set(1,1);let c=t.ray.intersectTriangle(pa,Zr,ma,!1,jr);if(c===null&&(ga(Zr.set(-.5,.5,0),lr,o,cr,s,r),ol.set(0,1),c=t.ray.intersectTriangle(pa,ma,Zr,!1,jr),c===null))return;const a=t.ray.origin.distanceTo(jr);a<t.near||a>t.far||e.push({distance:a,point:jr.clone(),uv:Pn.getInterpolation(jr,pa,Zr,ma,pf,ol,mf,new Jt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ga(i,t,e,n,s,r){hr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Kr.x=r*hr.x-s*hr.y,Kr.y=s*hr.x+r*hr.y):Kr.copy(hr),i.copy(t),i.x+=Kr.x,i.y+=Kr.y,i.applyMatrix4(Np)}class Go extends on{constructor(t=null,e=1,n=1,s,r,o,c,a,l=Ve,h=Ve,u,f){super(null,o,c,a,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gf extends an{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ur=new xe,vf=new xe,va=[],_f=new cs,d1=new xe,$r=new we,Jr=new Or;class Do extends we{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new gf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,d1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new cs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ur),_f.copy(t.boundingBox).applyMatrix4(ur),this.boundingBox.union(_f)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Or),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ur),Jr.copy(t.boundingSphere).applyMatrix4(ur),this.boundingSphere.union(Jr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let c=0;c<n.length;c++)n[c]=s[o+c]}raycast(t,e){const n=this.matrixWorld,s=this.count;if($r.geometry=this.geometry,$r.material=this.material,$r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(n),t.ray.intersectsSphere(Jr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ur),vf.multiplyMatrices(n,ur),$r.matrixWorld=vf,$r.raycast(t,va);for(let o=0,c=va.length;o<c;o++){const a=va[o];a.instanceId=r,a.object=this,e.push(a)}va.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new gf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Go(new Float32Array(s*this.count),s,this.count,Ho,ai));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const c=this.geometry.morphTargetsRelative?1:1-o,a=s*t;r[a]=c,r.set(n,a+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const al=new N,p1=new N,m1=new Vt;class Ss{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=al.subVectors(n,e).cross(p1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(al),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||m1.getNormalMatrix(t),s=this.coplanarPoint(al).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _s=new Or,g1=new Jt(.5,.5),_a=new N;class Fp{constructor(t=new Ss,e=new Ss,n=new Ss,s=new Ss,r=new Ss,o=new Ss){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ci,n=!1){const s=this.planes,r=t.elements,o=r[0],c=r[1],a=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],_=r[12],b=r[13],y=r[14],A=r[15];if(s[0].setComponents(l-o,d-h,m-p,A-_).normalize(),s[1].setComponents(l+o,d+h,m+p,A+_).normalize(),s[2].setComponents(l+c,d+u,m+v,A+b).normalize(),s[3].setComponents(l-c,d-u,m-v,A-b).normalize(),n)s[4].setComponents(a,f,g,y).normalize(),s[5].setComponents(l-a,d-f,m-g,A-y).normalize();else if(s[4].setComponents(l-a,d-f,m-g,A-y).normalize(),e===ci)s[5].setComponents(l+a,d+f,m+g,A+y).normalize();else if(e===hc)s[5].setComponents(a,f,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(t){_s.center.set(0,0,0);const e=g1.distanceTo(t.center);return _s.radius=.7071067811865476+e,_s.applyMatrix4(t.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(_a.x=s.normal.x>0?t.max.x:t.min.x,_a.y=s.normal.y>0?t.max.y:t.min.y,_a.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_a)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class kp extends Br{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const dc=new N,pc=new N,xf=new xe,Qr=new ou,xa=new Or,cl=new N,yf=new N;class v1 extends De{constructor(t=new ln,e=new kp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)dc.fromBufferAttribute(e,s-1),pc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=dc.distanceTo(pc);t.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(s),xa.radius+=r,t.ray.intersectsSphere(xa)===!1)return;xf.copy(s).invert(),Qr.copy(t.ray).applyMatrix4(xf);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),a=c*c,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=h.getX(v),_=h.getX(v+1),b=ya(this,t,Qr,a,m,_,v);b&&e.push(b)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(d),m=ya(this,t,Qr,a,v,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let v=d,g=p-1;v<g;v+=l){const m=ya(this,t,Qr,a,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=ya(this,t,Qr,a,p-1,d,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function ya(i,t,e,n,s,r,o){const c=i.geometry.attributes.position;if(dc.fromBufferAttribute(c,s),pc.fromBufferAttribute(c,r),e.distanceSqToSegment(dc,pc,cl,yf)>n)return;cl.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(cl);if(!(l<t.near||l>t.far))return{distance:l,point:yf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Mf=new N,bf=new N;class _1 extends v1{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Mf.fromBufferAttribute(e,s),bf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Mf.distanceTo(bf);t.setAttribute("lineDistance",new Ee(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class x1 extends on{constructor(t,e,n,s,r,o,c,a,l){super(t,e,n,s,r,o,c,a,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zp extends on{constructor(t,e,n=Bs,s,r,o,c=Ve,a=Ve,l,h=Co,u=1){if(h!==Co&&h!==Po)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,c,a,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ru(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Op extends on{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const Ma=new N,ba=new N,ll=new N,Sa=new Pn;class y1 extends ln{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(wr*e),o=t.getIndex(),c=t.getAttribute("position"),a=o?o.count:c.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let p=0;p<a;p+=3){o?(l[0]=o.getX(p),l[1]=o.getX(p+1),l[2]=o.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);const{a:v,b:g,c:m}=Sa;if(v.fromBufferAttribute(c,l[0]),g.fromBufferAttribute(c,l[1]),m.fromBufferAttribute(c,l[2]),Sa.getNormal(ll),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let _=0;_<3;_++){const b=(_+1)%3,y=u[_],A=u[b],w=Sa[h[_]],R=Sa[h[b]],L=`${y}_${A}`,E=`${A}_${y}`;E in f&&f[E]?(ll.dot(f[E].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(R.x,R.y,R.z)),f[E]=null):L in f||(f[L]={index0:l[_],index1:l[b],normal:ll.clone()})}}for(const p in f)if(f[p]){const{index0:v,index1:g}=f[p];Ma.fromBufferAttribute(c,v),ba.fromBufferAttribute(c,g),d.push(Ma.x,Ma.y,Ma.z),d.push(ba.x,ba.y,ba.z)}this.setAttribute("position",new Ee(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Hr extends ln{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,c=Math.floor(n),a=Math.floor(s),l=c+1,h=a+1,u=t/c,f=e/a,d=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const _=m*f-o;for(let b=0;b<l;b++){const y=b*u-r;p.push(y,-_,0),v.push(0,0,1),g.push(b/c),g.push(1-m/a)}}for(let m=0;m<a;m++)for(let _=0;_<c;_++){const b=_+l*m,y=_+l*(m+1),A=_+1+l*(m+1),w=_+1+l*m;d.push(b,y,w),d.push(y,A,w)}this.setIndex(d),this.setAttribute("position",new Ee(p,3)),this.setAttribute("normal",new Ee(v,3)),this.setAttribute("uv",new Ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.width,t.height,t.widthSegments,t.heightSegments)}}class au extends ln{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:c},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const a=Math.min(o+c,Math.PI);let l=0;const h=[],u=new N,f=new N,d=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const _=[],b=m/n;let y=0;m===0&&o===0?y=.5/e:m===n&&a===Math.PI&&(y=-.5/e);for(let A=0;A<=e;A++){const w=A/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+b*c),u.y=t*Math.cos(o+b*c),u.z=t*Math.sin(s+w*r)*Math.sin(o+b*c),p.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),g.push(w+y,1-b),_.push(l++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){const b=h[m][_+1],y=h[m][_],A=h[m+1][_],w=h[m+1][_+1];(m!==0||o>0)&&d.push(b,y,w),(m!==n-1||a<Math.PI)&&d.push(y,A,w)}this.setIndex(d),this.setAttribute("position",new Ee(p,3)),this.setAttribute("normal",new Ee(v,3)),this.setAttribute("uv",new Ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new au(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class M1 extends Br{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ug,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class b1 extends Br{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class S1 extends Lp{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,c=s+e,a=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,c-=h*this.view.offsetY,a=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,c,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class E1 extends kn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Sf(i,t,e,n){const s=w1(n);switch(e){case yp:return i*t;case Ho:return i*t/s.components*s.byteLength;case eu:return i*t/s.components*s.byteLength;case bp:return i*t*2/s.components*s.byteLength;case nu:return i*t*2/s.components*s.byteLength;case Mp:return i*t*3/s.components*s.byteLength;case Kn:return i*t*4/s.components*s.byteLength;case iu:return i*t*4/s.components*s.byteLength;case Ha:case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ga:case Wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rh:case ah:return Math.max(i,16)*Math.max(t,8)/4;case sh:case oh:return Math.max(i,8)*Math.max(t,8)/2;case ch:case lh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case hh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fh:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case dh:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ph:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case mh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case gh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case vh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case _h:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case xh:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case yh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Mh:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case bh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Sh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Eh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case wh:case Th:case Ah:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Rh:case Ch:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ph:case Ih:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function w1(i){switch(i){case Di:case gp:return{byteLength:1,components:1};case Ao:case vp:case Bo:return{byteLength:2,components:1};case Qh:case tu:return{byteLength:2,components:4};case Bs:case Jh:case ai:return{byteLength:4,components:1};case _p:case xp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$h}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$h);function Bp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function T1(i){const t=new WeakMap;function e(c,a){const l=c.array,h=c.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(a,f),i.bufferData(a,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,a,l){const h=a.array,u=a.updateRanges;if(i.bindBuffer(l,c),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){const p=u[f],v=u[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}a.clearUpdateRanges()}a.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const a=t.get(c);a&&(i.deleteBuffer(a.buffer),t.delete(c))}function o(c,a){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=t.get(c);(!h||h.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=t.get(c);if(l===void 0)t.set(c,e(c,a));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,a),l.version=c.version}}return{get:s,remove:r,update:o}}var A1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,R1=`#ifdef USE_ALPHAHASH
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
#endif`,C1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,P1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,L1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,D1=`#ifdef USE_AOMAP
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
#endif`,U1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,N1=`#ifdef USE_BATCHING
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
#endif`,F1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,k1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,z1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,B1=`#ifdef USE_IRIDESCENCE
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
#endif`,H1=`#ifdef USE_BUMPMAP
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
#endif`,V1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,G1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,W1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,X1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,q1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Y1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,j1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,K1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Z1=`#define PI 3.141592653589793
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
} // validated`,$1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,J1=`vec3 transformedNormal = objectNormal;
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
#endif`,Q1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ev=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iv="gl_FragColor = linearToOutputTexel( gl_FragColor );",sv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rv=`#ifdef USE_ENVMAP
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
#endif`,ov=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,av=`#ifdef USE_ENVMAP
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
#endif`,cv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lv=`#ifdef USE_ENVMAP
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
#endif`,hv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pv=`#ifdef USE_GRADIENTMAP
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
}`,mv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_v=`uniform bool receiveShadow;
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
#endif`,xv=`#ifdef USE_ENVMAP
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
#endif`,yv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ev=`PhysicalMaterial material;
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
#endif`,wv=`struct PhysicalMaterial {
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
}`,Tv=`
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
#endif`,Av=`#if defined( RE_IndirectDiffuse )
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
#endif`,Rv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Iv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Uv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fv=`#if defined( USE_POINTS_UV )
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
#endif`,kv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ov=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vv=`#ifdef USE_MORPHTARGETS
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
#endif`,Gv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kv=`#ifdef USE_NORMALMAP
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
#endif`,Zv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$v=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,t_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,n_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,o_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,a_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,c_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,u_=`float getShadowMask() {
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
}`,f_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,d_=`#ifdef USE_SKINNING
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
#endif`,p_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,m_=`#ifdef USE_SKINNING
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
#endif`,g_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,__=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,x_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,y_=`#ifdef USE_TRANSMISSION
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
#endif`,M_=`#ifdef USE_TRANSMISSION
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
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const T_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,A_=`uniform sampler2D t2D;
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
}`,R_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`#include <common>
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
}`,D_=`#if DEPTH_PACKING == 3200
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
}`,U_=`#define DISTANCE
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
}`,N_=`#define DISTANCE
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
}`,F_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
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
}`,O_=`uniform vec3 diffuse;
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
}`,B_=`#include <common>
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
}`,H_=`uniform vec3 diffuse;
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
}`,V_=`#define LAMBERT
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
}`,G_=`#define LAMBERT
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
}`,W_=`#define MATCAP
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
}`,X_=`#define MATCAP
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
}`,q_=`#define NORMAL
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
}`,Y_=`#define NORMAL
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
}`,j_=`#define PHONG
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
}`,K_=`#define PHONG
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
}`,Z_=`#define STANDARD
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
}`,$_=`#define STANDARD
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
}`,J_=`#define TOON
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
}`,Q_=`#define TOON
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
}`,tx=`uniform float size;
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
}`,ex=`uniform vec3 diffuse;
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
}`,nx=`#include <common>
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
}`,ix=`uniform vec3 color;
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
}`,sx=`uniform float rotation;
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
}`,rx=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:A1,alphahash_pars_fragment:R1,alphamap_fragment:C1,alphamap_pars_fragment:P1,alphatest_fragment:I1,alphatest_pars_fragment:L1,aomap_fragment:D1,aomap_pars_fragment:U1,batching_pars_vertex:N1,batching_vertex:F1,begin_vertex:k1,beginnormal_vertex:z1,bsdfs:O1,iridescence_fragment:B1,bumpmap_pars_fragment:H1,clipping_planes_fragment:V1,clipping_planes_pars_fragment:G1,clipping_planes_pars_vertex:W1,clipping_planes_vertex:X1,color_fragment:q1,color_pars_fragment:Y1,color_pars_vertex:j1,color_vertex:K1,common:Z1,cube_uv_reflection_fragment:$1,defaultnormal_vertex:J1,displacementmap_pars_vertex:Q1,displacementmap_vertex:tv,emissivemap_fragment:ev,emissivemap_pars_fragment:nv,colorspace_fragment:iv,colorspace_pars_fragment:sv,envmap_fragment:rv,envmap_common_pars_fragment:ov,envmap_pars_fragment:av,envmap_pars_vertex:cv,envmap_physical_pars_fragment:xv,envmap_vertex:lv,fog_vertex:hv,fog_pars_vertex:uv,fog_fragment:fv,fog_pars_fragment:dv,gradientmap_pars_fragment:pv,lightmap_pars_fragment:mv,lights_lambert_fragment:gv,lights_lambert_pars_fragment:vv,lights_pars_begin:_v,lights_toon_fragment:yv,lights_toon_pars_fragment:Mv,lights_phong_fragment:bv,lights_phong_pars_fragment:Sv,lights_physical_fragment:Ev,lights_physical_pars_fragment:wv,lights_fragment_begin:Tv,lights_fragment_maps:Av,lights_fragment_end:Rv,logdepthbuf_fragment:Cv,logdepthbuf_pars_fragment:Pv,logdepthbuf_pars_vertex:Iv,logdepthbuf_vertex:Lv,map_fragment:Dv,map_pars_fragment:Uv,map_particle_fragment:Nv,map_particle_pars_fragment:Fv,metalnessmap_fragment:kv,metalnessmap_pars_fragment:zv,morphinstance_vertex:Ov,morphcolor_vertex:Bv,morphnormal_vertex:Hv,morphtarget_pars_vertex:Vv,morphtarget_vertex:Gv,normal_fragment_begin:Wv,normal_fragment_maps:Xv,normal_pars_fragment:qv,normal_pars_vertex:Yv,normal_vertex:jv,normalmap_pars_fragment:Kv,clearcoat_normal_fragment_begin:Zv,clearcoat_normal_fragment_maps:$v,clearcoat_pars_fragment:Jv,iridescence_pars_fragment:Qv,opaque_fragment:t_,packing:e_,premultiplied_alpha_fragment:n_,project_vertex:i_,dithering_fragment:s_,dithering_pars_fragment:r_,roughnessmap_fragment:o_,roughnessmap_pars_fragment:a_,shadowmap_pars_fragment:c_,shadowmap_pars_vertex:l_,shadowmap_vertex:h_,shadowmask_pars_fragment:u_,skinbase_vertex:f_,skinning_pars_vertex:d_,skinning_vertex:p_,skinnormal_vertex:m_,specularmap_fragment:g_,specularmap_pars_fragment:v_,tonemapping_fragment:__,tonemapping_pars_fragment:x_,transmission_fragment:y_,transmission_pars_fragment:M_,uv_pars_fragment:b_,uv_pars_vertex:S_,uv_vertex:E_,worldpos_vertex:w_,background_vert:T_,background_frag:A_,backgroundCube_vert:R_,backgroundCube_frag:C_,cube_vert:P_,cube_frag:I_,depth_vert:L_,depth_frag:D_,distanceRGBA_vert:U_,distanceRGBA_frag:N_,equirect_vert:F_,equirect_frag:k_,linedashed_vert:z_,linedashed_frag:O_,meshbasic_vert:B_,meshbasic_frag:H_,meshlambert_vert:V_,meshlambert_frag:G_,meshmatcap_vert:W_,meshmatcap_frag:X_,meshnormal_vert:q_,meshnormal_frag:Y_,meshphong_vert:j_,meshphong_frag:K_,meshphysical_vert:Z_,meshphysical_frag:$_,meshtoon_vert:J_,meshtoon_frag:Q_,points_vert:tx,points_frag:ex,shadow_vert:nx,shadow_frag:ix,sprite_vert:sx,sprite_frag:rx},ct={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},ni={basic:{uniforms:dn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:dn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:dn([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:dn([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:dn([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new qt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:dn([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:dn([ct.points,ct.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:dn([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:dn([ct.common,ct.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:dn([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:dn([ct.sprite,ct.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:dn([ct.common,ct.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:dn([ct.lights,ct.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};ni.physical={uniforms:dn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const Ea={r:0,b:0,g:0},xs=new Ui,ox=new xe;function ax(i,t,e,n,s,r,o){const c=new qt(0);let a=r===!0?0:1,l,h,u=null,f=0,d=null;function p(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?e:t).get(y)),y}function v(b){let y=!1;const A=p(b);A===null?m(c,a):A&&A.isColor&&(m(A,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,y){const A=p(y);A&&(A.isCubeTexture||A.mapping===Tc)?(h===void 0&&(h=new we(new yn(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Ur(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),xs.copy(y.backgroundRotation),xs.x*=-1,xs.y*=-1,xs.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ox.makeRotationFromEuler(xs)),h.material.toneMapped=se.getTransfer(A.colorSpace)!==he,(u!==A||f!==A.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new we(new Hr(2,2),new cn({name:"BackgroundMaterial",uniforms:Ur(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:ss,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=se.getTransfer(A.colorSpace)!==he,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||f!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,f=A.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,y){b.getRGB(Ea,Ip(i)),n.buffers.color.setClear(Ea.r,Ea.g,Ea.b,y,o)}function _(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return c},setClearColor:function(b,y=1){c.set(b),a=y,m(c,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,m(c,a)},render:v,addToRenderList:g,dispose:_}}function cx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function c(S,C,D,O,W){let X=!1;const j=u(O,D,C);r!==j&&(r=j,l(r.object)),X=d(S,O,D,W),X&&p(S,O,D,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,y(S,C,D,O),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function a(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,C,D){const O=D.wireframe===!0;let W=n[S.id];W===void 0&&(W={},n[S.id]=W);let X=W[C.id];X===void 0&&(X={},W[C.id]=X);let j=X[O];return j===void 0&&(j=f(a()),X[O]=j),j}function f(S){const C=[],D=[],O=[];for(let W=0;W<e;W++)C[W]=0,D[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:O,object:S,attributes:{},index:null}}function d(S,C,D,O){const W=r.attributes,X=C.attributes;let j=0;const K=D.getAttributes();for(const H in K)if(K[H].location>=0){const ot=W[H];let ft=X[H];if(ft===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ft=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ft=S.instanceColor)),ot===void 0||ot.attribute!==ft||ft&&ot.data!==ft.data)return!0;j++}return r.attributesNum!==j||r.index!==O}function p(S,C,D,O){const W={},X=C.attributes;let j=0;const K=D.getAttributes();for(const H in K)if(K[H].location>=0){let ot=X[H];ot===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor));const ft={};ft.attribute=ot,ot&&ot.data&&(ft.data=ot.data),W[H]=ft,j++}r.attributes=W,r.attributesNum=j,r.index=O}function v(){const S=r.newAttributes;for(let C=0,D=S.length;C<D;C++)S[C]=0}function g(S){m(S,0)}function m(S,C){const D=r.newAttributes,O=r.enabledAttributes,W=r.attributeDivisors;D[S]=1,O[S]===0&&(i.enableVertexAttribArray(S),O[S]=1),W[S]!==C&&(i.vertexAttribDivisor(S,C),W[S]=C)}function _(){const S=r.newAttributes,C=r.enabledAttributes;for(let D=0,O=C.length;D<O;D++)C[D]!==S[D]&&(i.disableVertexAttribArray(D),C[D]=0)}function b(S,C,D,O,W,X,j){j===!0?i.vertexAttribIPointer(S,C,D,W,X):i.vertexAttribPointer(S,C,D,O,W,X)}function y(S,C,D,O){v();const W=O.attributes,X=D.getAttributes(),j=C.defaultAttributeValues;for(const K in X){const H=X[K];if(H.location>=0){let st=W[K];if(st===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(st=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(st=S.instanceColor)),st!==void 0){const ot=st.normalized,ft=st.itemSize,Gt=t.get(st);if(Gt===void 0)continue;const Qt=Gt.buffer,me=Gt.type,Xt=Gt.bytesPerElement,Z=me===i.INT||me===i.UNSIGNED_INT||st.gpuType===Jh;if(st.isInterleavedBufferAttribute){const J=st.data,gt=J.stride,Ut=st.offset;if(J.isInstancedInterleavedBuffer){for(let wt=0;wt<H.locationSize;wt++)m(H.location+wt,J.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let wt=0;wt<H.locationSize;wt++)g(H.location+wt);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let wt=0;wt<H.locationSize;wt++)b(H.location+wt,ft/H.locationSize,me,ot,gt*Xt,(Ut+ft/H.locationSize*wt)*Xt,Z)}else{if(st.isInstancedBufferAttribute){for(let J=0;J<H.locationSize;J++)m(H.location+J,st.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let J=0;J<H.locationSize;J++)g(H.location+J);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let J=0;J<H.locationSize;J++)b(H.location+J,ft/H.locationSize,me,ot,ft*Xt,ft/H.locationSize*J*Xt,Z)}}else if(j!==void 0){const ot=j[K];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(H.location,ot);break;case 3:i.vertexAttrib3fv(H.location,ot);break;case 4:i.vertexAttrib4fv(H.location,ot);break;default:i.vertexAttrib1fv(H.location,ot)}}}}_()}function A(){L();for(const S in n){const C=n[S];for(const D in C){const O=C[D];for(const W in O)h(O[W].object),delete O[W];delete C[D]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const D in C){const O=C[D];for(const W in O)h(O[W].object),delete O[W];delete C[D]}delete n[S.id]}function R(S){for(const C in n){const D=n[C];if(D[S.id]===void 0)continue;const O=D[S.id];for(const W in O)h(O[W].object),delete O[W];delete D[S.id]}}function L(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:L,resetDefaultState:E,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function lx(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function c(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let p=0;p<u;p++)d+=h[p];e.update(d,n,1)}function a(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<l.length;p++)o(l[p],h[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*f[v];e.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=c,this.renderMultiDrawInstances=a}function hx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Kn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const L=R===Bo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Di&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ai&&!L)}function a(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=a(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=p>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,textureFormatReadable:o,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:A,maxSamples:w}}function ux(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Ss,c=new Vt,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{const _=r?0:n,b=_*4;let y=m.clippingState||null;a.value=y,y=h(p,f,b,d);for(let A=0;A!==b;++A)y[A]=e[A];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){a.value!==e&&(a.value=e,a.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=a.value,p!==!0||g===null){const m=d+v*4,_=f.matrixWorldInverse;c.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,y=d;b!==v;++b,y+=4)o.copy(u[b]).applyMatrix4(_,c),o.normal.toArray(g,y),g[y+3]=o.constant}a.value=g,a.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function fx(i){let t=new WeakMap;function e(o,c){return c===th?o.mapping=Ir:c===eh&&(o.mapping=Lr),o}function n(o){if(o&&o.isTexture){const c=o.mapping;if(c===th||c===eh)if(t.has(o)){const a=t.get(o).texture;return e(a,o.mapping)}else{const a=o.image;if(a&&a.height>0){const l=new c1(a.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const c=o.target;c.removeEventListener("dispose",s);const a=t.get(c);a!==void 0&&(t.delete(c),a.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const _r=4,Ef=[.125,.215,.35,.446,.526,.582],Rs=20,hl=new S1,wf=new qt;let ul=null,fl=0,dl=0,pl=!1;const Es=(1+Math.sqrt(5))/2,fr=1/Es,Tf=[new N(-Es,fr,0),new N(Es,fr,0),new N(-fr,0,Es),new N(fr,0,Es),new N(0,Es,-fr),new N(0,Es,fr),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],dx=new N;class Af{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:c=dx}=r;ul=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),dl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,s,a,c),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ul,fl,dl),this._renderer.xr.enabled=pl,t.scissorTest=!1,wa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ir||t.mapping===Lr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ul=this._renderer.getRenderTarget(),fl=this._renderer.getActiveCubeFace(),dl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:oi,minFilter:oi,generateMipmaps:!1,type:Bo,format:Kn,colorSpace:Dr,depthBuffer:!1},s=Rf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rf(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=px(r)),this._blurMaterial=mx(r,t,e)}return s}_compileMaterial(t){const e=new we(this._lodPlanes[0],t);this._renderer.compile(e,hl)}_sceneToCubeUV(t,e,n,s,r){const a=new kn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(wf),u.toneMapping=Ti,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new Fi({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new we(new yn,v);let m=!1;const _=t.background;_?_.isColor&&(v.color.copy(_),t.background=null,m=!0):(v.color.copy(wf),m=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(a.up.set(0,l[b],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x+h[b],r.y,r.z)):y===1?(a.up.set(0,0,l[b]),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y+h[b],r.z)):(a.up.set(0,l[b],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y,r.z+h[b]));const A=this._cubeSize;wa(s,y*A,b>2?A:0,A,A),u.setRenderTarget(s),m&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ir||t.mapping===Lr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cf());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),c=r.uniforms;c.envMap.value=t;const a=this._cubeSize;wa(e,0,0,3*a,2*a),n.setRenderTarget(e),n.render(o,hl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=Tf[(s-r-1)%Tf.length];this._blur(t,r-1,r,o,c)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,c){const a=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new we(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Rs-1),v=r/p,g=isFinite(r)?1+Math.floor(h*v):Rs;g>Rs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Rs}`);const m=[];let _=0;for(let R=0;R<Rs;++R){const L=R/v,E=Math.exp(-L*L/2);m.push(E),R===0?_+=E:R<g&&(_+=2*E)}for(let R=0;R<m.length;R++)m[R]=m[R]/_;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=o==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:b}=this;f.dTheta.value=p,f.mipInt.value=b-n;const y=this._sizeLods[s],A=3*y*(s>b-_r?s-b+_r:0),w=4*(this._cubeSize-y);wa(e,A,w,3*y,2*y),a.setRenderTarget(e),a.render(u,hl)}}function px(i){const t=[],e=[],n=[];let s=i;const r=i-_r+1+Ef.length;for(let o=0;o<r;o++){const c=Math.pow(2,s);e.push(c);let a=1/c;o>i-_r?a=Ef[o-i+_r-1]:o===0&&(a=0),n.push(a);const l=1/(c-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,p=6,v=3,g=2,m=1,_=new Float32Array(v*p*d),b=new Float32Array(g*p*d),y=new Float32Array(m*p*d);for(let w=0;w<d;w++){const R=w%3*2/3-1,L=w>2?0:-1,E=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];_.set(E,v*p*w),b.set(f,g*p*w);const S=[w,w,w,w,w,w];y.set(S,m*p*w)}const A=new ln;A.setAttribute("position",new an(_,v)),A.setAttribute("uv",new an(b,g)),A.setAttribute("faceIndex",new an(y,m)),t.push(A),s>_r&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Rf(i,t,e){const n=new Hs(i,t,e);return n.texture.mapping=Tc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function mx(i,t,e){const n=new Float32Array(Rs),s=new N(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cu(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function Cf(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cu(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function Pf(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function cu(){return`

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
	`}function gx(i){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const a=c.mapping,l=a===th||a===eh,h=a===Ir||a===Lr;if(l||h){let u=t.get(c);const f=u!==void 0?u.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==f)return e===null&&(e=new Af(i)),u=l?e.fromEquirectangular(c,u):e.fromCubemap(c,u),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),u.texture;if(u!==void 0)return u.texture;{const d=c.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Af(i)),u=l?e.fromEquirectangular(c):e.fromCubemap(c),u.texture.pmremVersion=c.pmremVersion,t.set(c,u),c.addEventListener("dispose",r),u.texture):null}}}return c}function s(c){let a=0;const l=6;for(let h=0;h<l;h++)c[h]!==void 0&&a++;return a===l}function r(c){const a=c.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function vx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Lo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function _x(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function c(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function a(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,p=u.attributes.position;let v=0;if(d!==null){const _=d.array;v=d.version;for(let b=0,y=_.length;b<y;b+=3){const A=_[b+0],w=_[b+1],R=_[b+2];f.push(A,w,w,R,R,A)}}else if(p!==void 0){const _=p.array;v=p.version;for(let b=0,y=_.length/3-1;b<y;b+=3){const A=b+0,w=b+1,R=b+2;f.push(A,w,w,R,R,A)}}else return;const g=new(wp(f)?Pp:Cp)(f,1);g.version=v;const m=r.get(u);m&&t.remove(m),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:c,update:a,getWireframeAttribute:h}}function xx(i,t,e){let n;function s(f){n=f}let r,o;function c(f){r=f.type,o=f.bytesPerElement}function a(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,p){p!==0&&(i.drawElementsInstanced(n,d,r,f*o,p),e.update(d,n,p))}function h(f,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];e.update(g,n,1)}function u(f,d,p,v){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,p);let m=0;for(let _=0;_<p;_++)m+=d[_]*v[_];e.update(m,n,1)}}this.setMode=s,this.setIndex=c,this.render=a,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function yx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,c){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=c*(r/3);break;case i.LINES:e.lines+=c*(r/2);break;case i.LINE_STRIP:e.lines+=c*(r-1);break;case i.LINE_LOOP:e.lines+=c*r;break;case i.POINTS:e.points+=c*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Mx(i,t,e){const n=new WeakMap,s=new Fe;function r(o,c,a){const l=o.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let S=function(){L.dispose(),n.delete(c),c.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const p=c.morphAttributes.position!==void 0,v=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],_=c.morphAttributes.normal||[],b=c.morphAttributes.color||[];let y=0;p===!0&&(y=1),v===!0&&(y=2),g===!0&&(y=3);let A=c.attributes.position.count*y,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const R=new Float32Array(A*w*4*u),L=new Tp(R,A,w,u);L.type=ai,L.needsUpdate=!0;const E=y*4;for(let C=0;C<u;C++){const D=m[C],O=_[C],W=b[C],X=A*w*4*C;for(let j=0;j<D.count;j++){const K=j*E;p===!0&&(s.fromBufferAttribute(D,j),R[X+K+0]=s.x,R[X+K+1]=s.y,R[X+K+2]=s.z,R[X+K+3]=0),v===!0&&(s.fromBufferAttribute(O,j),R[X+K+4]=s.x,R[X+K+5]=s.y,R[X+K+6]=s.z,R[X+K+7]=0),g===!0&&(s.fromBufferAttribute(W,j),R[X+K+8]=s.x,R[X+K+9]=s.y,R[X+K+10]=s.z,R[X+K+11]=W.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new Jt(A,w)},n.set(c,f),c.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)a.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const v=c.morphTargetsRelative?1:1-p;a.getUniforms().setValue(i,"morphTargetBaseInfluence",v),a.getUniforms().setValue(i,"morphTargetInfluences",l)}a.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),a.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function bx(i,t,e,n){let s=new WeakMap;function r(a){const l=n.render.frame,h=a.geometry,u=t.get(a,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),a.isInstancedMesh&&(a.hasEventListener("dispose",c)===!1&&a.addEventListener("dispose",c),s.get(a)!==l&&(e.update(a.instanceMatrix,i.ARRAY_BUFFER),a.instanceColor!==null&&e.update(a.instanceColor,i.ARRAY_BUFFER),s.set(a,l))),a.isSkinnedMesh){const f=a.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function c(a){const l=a.target;l.removeEventListener("dispose",c),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Hp=new on,If=new zp(1,1),Vp=new Tp,Gp=new Xg,Wp=new Dp,Lf=[],Df=[],Uf=new Float32Array(16),Nf=new Float32Array(9),Ff=new Float32Array(4);function Vr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Lf[s];if(r===void 0&&(r=new Float32Array(s),Lf[s]=r),t!==0){n.toArray(r,0);for(let o=1,c=0;o!==t;++o)c+=e,i[o].toArray(r,c)}return r}function Ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ac(i,t){let e=Df[t];e===void 0&&(e=new Int32Array(t),Df[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Sx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ex(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function wx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function Tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function Ax(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Ff.set(n),i.uniformMatrix2fv(this.addr,!1,Ff),We(e,n)}}function Rx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Nf.set(n),i.uniformMatrix3fv(this.addr,!1,Nf),We(e,n)}}function Cx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Uf.set(n),i.uniformMatrix4fv(this.addr,!1,Uf),We(e,n)}}function Px(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ix(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function Lx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function Dx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function Ux(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Nx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function zx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(If.compareFunction=Sp,r=If):r=Hp,e.setTexture2D(t||r,s)}function Ox(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Gp,s)}function Bx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wp,s)}function Hx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Vp,s)}function Vx(i){switch(i){case 5126:return Sx;case 35664:return Ex;case 35665:return wx;case 35666:return Tx;case 35674:return Ax;case 35675:return Rx;case 35676:return Cx;case 5124:case 35670:return Px;case 35667:case 35671:return Ix;case 35668:case 35672:return Lx;case 35669:case 35673:return Dx;case 5125:return Ux;case 36294:return Nx;case 36295:return Fx;case 36296:return kx;case 35678:case 36198:case 36298:case 36306:case 35682:return zx;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Bx;case 36289:case 36303:case 36311:case 36292:return Hx}}function Gx(i,t){i.uniform1fv(this.addr,t)}function Wx(i,t){const e=Vr(t,this.size,2);i.uniform2fv(this.addr,e)}function Xx(i,t){const e=Vr(t,this.size,3);i.uniform3fv(this.addr,e)}function qx(i,t){const e=Vr(t,this.size,4);i.uniform4fv(this.addr,e)}function Yx(i,t){const e=Vr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function jx(i,t){const e=Vr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Kx(i,t){const e=Vr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Zx(i,t){i.uniform1iv(this.addr,t)}function $x(i,t){i.uniform2iv(this.addr,t)}function Jx(i,t){i.uniform3iv(this.addr,t)}function Qx(i,t){i.uniform4iv(this.addr,t)}function ty(i,t){i.uniform1uiv(this.addr,t)}function ey(i,t){i.uniform2uiv(this.addr,t)}function ny(i,t){i.uniform3uiv(this.addr,t)}function iy(i,t){i.uniform4uiv(this.addr,t)}function sy(i,t,e){const n=this.cache,s=t.length,r=Ac(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Hp,r[o])}function ry(i,t,e){const n=this.cache,s=t.length,r=Ac(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Gp,r[o])}function oy(i,t,e){const n=this.cache,s=t.length,r=Ac(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wp,r[o])}function ay(i,t,e){const n=this.cache,s=t.length,r=Ac(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Vp,r[o])}function cy(i){switch(i){case 5126:return Gx;case 35664:return Wx;case 35665:return Xx;case 35666:return qx;case 35674:return Yx;case 35675:return jx;case 35676:return Kx;case 5124:case 35670:return Zx;case 35667:case 35671:return $x;case 35668:case 35672:return Jx;case 35669:case 35673:return Qx;case 5125:return ty;case 36294:return ey;case 36295:return ny;case 36296:return iy;case 35678:case 36198:case 36298:case 36306:case 35682:return sy;case 35679:case 36299:case 36307:return ry;case 35680:case 36300:case 36308:case 36293:return oy;case 36289:case 36303:case 36311:case 36292:return ay}}class ly{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vx(e.type)}}class hy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cy(e.type)}}class uy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const c=s[r];c.setValue(t,e[c.id],n)}}}const ml=/(\w+)(\])?(\[|\.)?/g;function kf(i,t){i.seq.push(t),i.map[t.id]=t}function fy(i,t,e){const n=i.name,s=n.length;for(ml.lastIndex=0;;){const r=ml.exec(n),o=ml.lastIndex;let c=r[1];const a=r[2]==="]",l=r[3];if(a&&(c=c|0),l===void 0||l==="["&&o+2===s){kf(e,l===void 0?new ly(c,i,t):new hy(c,i,t));break}else{let u=e.map[c];u===void 0&&(u=new uy(c),kf(e,u)),e=u}}}class Xa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);fy(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const c=e[r],a=n[c.id];a.needsUpdate!==!1&&c.setValue(t,a.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function zf(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const dy=37297;let py=0;function my(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const c=o+1;n.push(`${c===t?">":" "} ${c}: ${e[o]}`)}return n.join(`
`)}const Of=new Vt;function gy(i){se._getMatrix(Of,se.workingColorSpace,i);const t=`mat3( ${Of.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case lc:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Bf(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const c=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+my(i.getShaderSource(t),c)}else return r}function vy(i,t){const e=gy(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function _y(i,t){let e;switch(t){case ig:e="Linear";break;case sg:e="Reinhard";break;case rg:e="Cineon";break;case og:e="ACESFilmic";break;case cg:e="AgX";break;case lg:e="Neutral";break;case ag:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ta=new N;function xy(){se.getLuminanceCoefficients(Ta);const i=Ta.x.toFixed(4),t=Ta.y.toFixed(4),e=Ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ho).join(`
`)}function My(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function by(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:c}}return e}function ho(i){return i!==""}function Hf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Sy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dh(i){return i.replace(Sy,wy)}const Ey=new Map;function wy(i,t){let e=Wt[t];if(e===void 0){const n=Ey.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Dh(e)}const Ty=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gf(i){return i.replace(Ty,Ay)}function Ay(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Ry(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===dp?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===F0?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mi&&(t="SHADOWMAP_TYPE_VSM"),t}function Cy(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ir:case Lr:t="ENVMAP_TYPE_CUBE";break;case Tc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Py(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Lr&&(t="ENVMAP_MODE_REFRACTION"),t}function Iy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case pp:t="ENVMAP_BLENDING_MULTIPLY";break;case eg:t="ENVMAP_BLENDING_MIX";break;case ng:t="ENVMAP_BLENDING_ADD";break}return t}function Ly(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Dy(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,c=e.fragmentShader;const a=Ry(e),l=Cy(e),h=Py(e),u=Iy(e),f=Ly(e),d=yy(e),p=My(r),v=s.createProgram();let g,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ho).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ho).join(`
`),m.length>0&&(m+=`
`)):(g=[Wf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+a:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ho).join(`
`),m=[Wf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+a:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ti?"#define TONE_MAPPING":"",e.toneMapping!==Ti?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Ti?_y("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,vy("linearToOutputTexel",e.outputColorSpace),xy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ho).join(`
`)),o=Dh(o),o=Hf(o,e),o=Vf(o,e),c=Dh(c),c=Hf(c,e),c=Vf(c,e),o=Gf(o),c=Gf(c),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===ju?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ju?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=_+g+o,y=_+m+c,A=zf(s,s.VERTEX_SHADER,b),w=zf(s,s.FRAGMENT_SHADER,y);s.attachShader(v,A),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(v)||"",O=s.getShaderInfoLog(A)||"",W=s.getShaderInfoLog(w)||"",X=D.trim(),j=O.trim(),K=W.trim();let H=!0,st=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,w);else{const ot=Bf(s,A,"vertex"),ft=Bf(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+X+`
`+ot+`
`+ft)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(j===""||K==="")&&(st=!1);st&&(C.diagnostics={runnable:H,programLog:X,vertexShader:{log:j,prefix:g},fragmentShader:{log:K,prefix:m}})}s.deleteShader(A),s.deleteShader(w),L=new Xa(s,v),E=by(s,v)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,dy)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=py++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=w,this}let Uy=0;class Ny{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Fy(t),e.set(t,n)),n}}class Fy{constructor(t){this.id=Uy++,this.code=t,this.usedTimes=0}}function ky(i,t,e,n,s,r,o){const c=new Ap,a=new Ny,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return l.add(E),E===0?"uv":`uv${E}`}function g(E,S,C,D,O){const W=D.fog,X=O.geometry,j=E.isMeshStandardMaterial?D.environment:null,K=(E.isMeshStandardMaterial?e:t).get(E.envMap||j),H=K&&K.mapping===Tc?K.image.height:null,st=p[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const ot=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=ot!==void 0?ot.length:0;let Gt=0;X.morphAttributes.position!==void 0&&(Gt=1),X.morphAttributes.normal!==void 0&&(Gt=2),X.morphAttributes.color!==void 0&&(Gt=3);let Qt,me,Xt,Z;if(st){const re=ni[st];Qt=re.vertexShader,me=re.fragmentShader}else Qt=E.vertexShader,me=E.fragmentShader,a.update(E),Xt=a.getVertexShaderID(E),Z=a.getFragmentShaderID(E);const J=i.getRenderTarget(),gt=i.state.buffers.depth.getReversed(),Ut=O.isInstancedMesh===!0,wt=O.isBatchedMesh===!0,jt=!!E.map,ze=!!E.matcap,P=!!K,ue=!!E.aoMap,zt=!!E.lightMap,Dt=!!E.bumpMap,xt=!!E.normalMap,fe=!!E.displacementMap,yt=!!E.emissiveMap,Ot=!!E.metalnessMap,Ue=!!E.roughnessMap,be=E.anisotropy>0,T=E.clearcoat>0,x=E.dispersion>0,z=E.iridescence>0,Y=E.sheen>0,Q=E.transmission>0,q=be&&!!E.anisotropyMap,Ct=T&&!!E.clearcoatMap,rt=T&&!!E.clearcoatNormalMap,Tt=T&&!!E.clearcoatRoughnessMap,At=z&&!!E.iridescenceMap,nt=z&&!!E.iridescenceThicknessMap,ut=Y&&!!E.sheenColorMap,Ft=Y&&!!E.sheenRoughnessMap,Rt=!!E.specularMap,lt=!!E.specularColorMap,Ht=!!E.specularIntensityMap,I=Q&&!!E.transmissionMap,it=Q&&!!E.thicknessMap,at=!!E.gradientMap,vt=!!E.alphaMap,tt=E.alphaTest>0,$=!!E.alphaHash,St=!!E.extensions;let Bt=Ti;E.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Bt=i.toneMapping);const ge={shaderID:st,shaderType:E.type,shaderName:E.name,vertexShader:Qt,fragmentShader:me,defines:E.defines,customVertexShaderID:Xt,customFragmentShaderID:Z,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:wt,batchingColor:wt&&O._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&O.instanceColor!==null,instancingMorph:Ut&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Dr,alphaToCoverage:!!E.alphaToCoverage,map:jt,matcap:ze,envMap:P,envMapMode:P&&K.mapping,envMapCubeUVHeight:H,aoMap:ue,lightMap:zt,bumpMap:Dt,normalMap:xt,displacementMap:f&&fe,emissiveMap:yt,normalMapObjectSpace:xt&&E.normalMapType===pg,normalMapTangentSpace:xt&&E.normalMapType===dg,metalnessMap:Ot,roughnessMap:Ue,anisotropy:be,anisotropyMap:q,clearcoat:T,clearcoatMap:Ct,clearcoatNormalMap:rt,clearcoatRoughnessMap:Tt,dispersion:x,iridescence:z,iridescenceMap:At,iridescenceThicknessMap:nt,sheen:Y,sheenColorMap:ut,sheenRoughnessMap:Ft,specularMap:Rt,specularColorMap:lt,specularIntensityMap:Ht,transmission:Q,transmissionMap:I,thicknessMap:it,gradientMap:at,opaque:E.transparent===!1&&E.blending===Er&&E.alphaToCoverage===!1,alphaMap:vt,alphaTest:tt,alphaHash:$,combine:E.combine,mapUv:jt&&v(E.map.channel),aoMapUv:ue&&v(E.aoMap.channel),lightMapUv:zt&&v(E.lightMap.channel),bumpMapUv:Dt&&v(E.bumpMap.channel),normalMapUv:xt&&v(E.normalMap.channel),displacementMapUv:fe&&v(E.displacementMap.channel),emissiveMapUv:yt&&v(E.emissiveMap.channel),metalnessMapUv:Ot&&v(E.metalnessMap.channel),roughnessMapUv:Ue&&v(E.roughnessMap.channel),anisotropyMapUv:q&&v(E.anisotropyMap.channel),clearcoatMapUv:Ct&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:rt&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:nt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&v(E.sheenRoughnessMap.channel),specularMapUv:Rt&&v(E.specularMap.channel),specularColorMapUv:lt&&v(E.specularColorMap.channel),specularIntensityMapUv:Ht&&v(E.specularIntensityMap.channel),transmissionMapUv:I&&v(E.transmissionMap.channel),thicknessMapUv:it&&v(E.thicknessMap.channel),alphaMapUv:vt&&v(E.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(xt||be),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!X.attributes.uv&&(jt||vt),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:gt,skinning:O.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Gt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Bt,decodeVideoTexture:jt&&E.map.isVideoTexture===!0&&se.getTransfer(E.map.colorSpace)===he,decodeVideoTextureEmissive:yt&&E.emissiveMap.isVideoTexture===!0&&se.getTransfer(E.emissiveMap.colorSpace)===he,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===qn,flipSided:E.side===mn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:St&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(St&&E.extensions.multiDraw===!0||wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function m(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)S.push(C),S.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(_(S,E),b(S,E),S.push(i.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function _(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function b(E,S){c.disableAll(),S.supportsVertexTextures&&c.enable(0),S.instancing&&c.enable(1),S.instancingColor&&c.enable(2),S.instancingMorph&&c.enable(3),S.matcap&&c.enable(4),S.envMap&&c.enable(5),S.normalMapObjectSpace&&c.enable(6),S.normalMapTangentSpace&&c.enable(7),S.clearcoat&&c.enable(8),S.iridescence&&c.enable(9),S.alphaTest&&c.enable(10),S.vertexColors&&c.enable(11),S.vertexAlphas&&c.enable(12),S.vertexUv1s&&c.enable(13),S.vertexUv2s&&c.enable(14),S.vertexUv3s&&c.enable(15),S.vertexTangents&&c.enable(16),S.anisotropy&&c.enable(17),S.alphaHash&&c.enable(18),S.batching&&c.enable(19),S.dispersion&&c.enable(20),S.batchingColor&&c.enable(21),S.gradientMap&&c.enable(22),E.push(c.mask),c.disableAll(),S.fog&&c.enable(0),S.useFog&&c.enable(1),S.flatShading&&c.enable(2),S.logarithmicDepthBuffer&&c.enable(3),S.reversedDepthBuffer&&c.enable(4),S.skinning&&c.enable(5),S.morphTargets&&c.enable(6),S.morphNormals&&c.enable(7),S.morphColors&&c.enable(8),S.premultipliedAlpha&&c.enable(9),S.shadowMapEnabled&&c.enable(10),S.doubleSided&&c.enable(11),S.flipSided&&c.enable(12),S.useDepthPacking&&c.enable(13),S.dithering&&c.enable(14),S.transmission&&c.enable(15),S.sheen&&c.enable(16),S.opaque&&c.enable(17),S.pointsUvs&&c.enable(18),S.decodeVideoTexture&&c.enable(19),S.decodeVideoTextureEmissive&&c.enable(20),S.alphaToCoverage&&c.enable(21),E.push(c.mask)}function y(E){const S=p[E.type];let C;if(S){const D=ni[S];C=s1.clone(D.uniforms)}else C=E.uniforms;return C}function A(E,S){let C;for(let D=0,O=h.length;D<O;D++){const W=h[D];if(W.cacheKey===S){C=W,++C.usedTimes;break}}return C===void 0&&(C=new Dy(i,S,E,r),h.push(C)),C}function w(E){if(--E.usedTimes===0){const S=h.indexOf(E);h[S]=h[h.length-1],h.pop(),E.destroy()}}function R(E){a.remove(E)}function L(){a.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:A,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:L}}function zy(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let c=i.get(o);return c===void 0&&(c={},i.set(o,c)),c}function n(o){i.delete(o)}function s(o,c,a){i.get(o)[c]=a}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Oy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Xf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function qf(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,p,v,g){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},i[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),t++,m}function c(u,f,d,p,v,g){const m=o(u,f,d,p,v,g);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):e.push(m)}function a(u,f,d,p,v,g){const m=o(u,f,d,p,v,g);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,f){e.length>1&&e.sort(u||Oy),n.length>1&&n.sort(f||Xf),s.length>1&&s.sort(f||Xf)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:a,finish:h,sort:l}}function By(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new qf,i.set(n,[o])):s>=r.length?(o=new qf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Hy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new qt};break;case"SpotLight":e={position:new N,direction:new N,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function Vy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Gy=0;function Wy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Xy(i){const t=new Hy,e=Vy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new xe,o=new xe;function c(l){let h=0,u=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,_=0,b=0,y=0,A=0,w=0,R=0;l.sort(Wy);for(let E=0,S=l.length;E<S;E++){const C=l[E],D=C.color,O=C.intensity,W=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=D.r*O,u+=D.g*O,f+=D.b*O;else if(C.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(C.sh.coefficients[j],O);R++}else if(C.isDirectionalLight){const j=t.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const K=C.shadow,H=e.get(C);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=C.shadow.matrix,_++}n.directional[d]=j,d++}else if(C.isSpotLight){const j=t.get(C);j.position.setFromMatrixPosition(C.matrixWorld),j.color.copy(D).multiplyScalar(O),j.distance=W,j.coneCos=Math.cos(C.angle),j.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),j.decay=C.decay,n.spot[v]=j;const K=C.shadow;if(C.map&&(n.spotLightMap[A]=C.map,A++,K.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[v]=K.matrix,C.castShadow){const H=e.get(C);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=X,y++}v++}else if(C.isRectAreaLight){const j=t.get(C);j.color.copy(D).multiplyScalar(O),j.halfWidth.set(C.width*.5,0,0),j.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=j,g++}else if(C.isPointLight){const j=t.get(C);if(j.color.copy(C.color).multiplyScalar(C.intensity),j.distance=C.distance,j.decay=C.decay,C.castShadow){const K=C.shadow,H=e.get(C);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,n.pointShadow[p]=H,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=C.shadow.matrix,b++}n.point[p]=j,p++}else if(C.isHemisphereLight){const j=t.get(C);j.skyColor.copy(C.color).multiplyScalar(O),j.groundColor.copy(C.groundColor).multiplyScalar(O),n.hemi[m]=j,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==p||L.spotLength!==v||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==_||L.numPointShadows!==b||L.numSpotShadows!==y||L.numSpotMaps!==A||L.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,L.directionalLength=d,L.pointLength=p,L.spotLength=v,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=_,L.numPointShadows=b,L.numSpotShadows=y,L.numSpotMaps=A,L.numLightProbes=R,n.version=Gy++)}function a(l,h){let u=0,f=0,d=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,_=l.length;m<_;m++){const b=l[m];if(b.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),u++}else if(b.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(b.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(b.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),f++}else if(b.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:c,setupView:a,state:n}}function Yf(i){const t=new Xy(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function c(){t.setup(e)}function a(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:c,setupLightsView:a,pushLight:r,pushShadow:o}}function qy(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let c;return o===void 0?(c=new Yf(i),t.set(s,[c])):r>=o.length?(c=new Yf(i),o.push(c)):c=o[r],c}function n(){t=new WeakMap}return{get:e,dispose:n}}const Yy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jy=`uniform sampler2D shadow_pass;
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
}`;function Ky(i,t,e){let n=new Fp;const s=new Jt,r=new Jt,o=new Fe,c=new M1({depthPacking:fg}),a=new b1,l={},h=e.maxTextureSize,u={[ss]:mn,[mn]:ss,[qn]:qn},f=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:Yy,fragmentShader:jy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new ln;p.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new we(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dp;let m=this.type;this.render=function(w,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),S=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Qi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const O=m!==Mi&&this.type===Mi,W=m===Mi&&this.type!==Mi;for(let X=0,j=w.length;X<j;X++){const K=w[X],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const st=H.getFrameExtents();if(s.multiply(st),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,H.mapSize.y=r.y)),H.map===null||O===!0||W===!0){const ft=this.type!==Mi?{minFilter:Ve,magFilter:Ve}:{};H.map!==null&&H.map.dispose(),H.map=new Hs(s.x,s.y,ft),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const ot=H.getViewportCount();for(let ft=0;ft<ot;ft++){const Gt=H.getViewport(ft);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),D.viewport(o),H.updateMatrices(K,ft),n=H.getFrustum(),y(R,L,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===Mi&&_(H,L),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(E,S,C)};function _(w,R){const L=t.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Hs(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,L,f,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,L,d,v,null)}function b(w,R,L,E){let S=null;const C=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)S=C;else if(S=L.isPointLight===!0?a:c,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const D=S.uuid,O=R.uuid;let W=l[D];W===void 0&&(W={},l[D]=W);let X=W[O];X===void 0&&(X=S.clone(),W[O]=X,R.addEventListener("dispose",A)),S=X}if(S.visible=R.visible,S.wireframe=R.wireframe,E===Mi?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:u[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const D=i.properties.get(S);D.light=L}return S}function y(w,R,L,E,S){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===Mi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const O=t.update(w),W=w.material;if(Array.isArray(W)){const X=O.groups;for(let j=0,K=X.length;j<K;j++){const H=X[j],st=W[H.materialIndex];if(st&&st.visible){const ot=b(w,st,E,S);w.onBeforeShadow(i,w,R,L,O,ot,H),i.renderBufferDirect(L,null,O,ot,w,H),w.onAfterShadow(i,w,R,L,O,ot,H)}}}else if(W.visible){const X=b(w,W,E,S);w.onBeforeShadow(i,w,R,L,O,X,null),i.renderBufferDirect(L,null,O,X,w,null),w.onAfterShadow(i,w,R,L,O,X,null)}}const D=w.children;for(let O=0,W=D.length;O<W;O++)y(D[O],R,L,E,S)}function A(w){w.target.removeEventListener("dispose",A);for(const L in l){const E=l[L],S=w.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}const Zy={[Yl]:jl,[Kl]:Jl,[Zl]:Ql,[Pr]:$l,[jl]:Yl,[Jl]:Kl,[Ql]:Zl,[$l]:Pr};function $y(i,t){function e(){let I=!1;const it=new Fe;let at=null;const vt=new Fe(0,0,0,0);return{setMask:function(tt){at!==tt&&!I&&(i.colorMask(tt,tt,tt,tt),at=tt)},setLocked:function(tt){I=tt},setClear:function(tt,$,St,Bt,ge){ge===!0&&(tt*=Bt,$*=Bt,St*=Bt),it.set(tt,$,St,Bt),vt.equals(it)===!1&&(i.clearColor(tt,$,St,Bt),vt.copy(it))},reset:function(){I=!1,at=null,vt.set(-1,0,0,0)}}}function n(){let I=!1,it=!1,at=null,vt=null,tt=null;return{setReversed:function($){if(it!==$){const St=t.get("EXT_clip_control");$?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),it=$;const Bt=tt;tt=null,this.setClear(Bt)}},getReversed:function(){return it},setTest:function($){$?J(i.DEPTH_TEST):gt(i.DEPTH_TEST)},setMask:function($){at!==$&&!I&&(i.depthMask($),at=$)},setFunc:function($){if(it&&($=Zy[$]),vt!==$){switch($){case Yl:i.depthFunc(i.NEVER);break;case jl:i.depthFunc(i.ALWAYS);break;case Kl:i.depthFunc(i.LESS);break;case Pr:i.depthFunc(i.LEQUAL);break;case Zl:i.depthFunc(i.EQUAL);break;case $l:i.depthFunc(i.GEQUAL);break;case Jl:i.depthFunc(i.GREATER);break;case Ql:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}vt=$}},setLocked:function($){I=$},setClear:function($){tt!==$&&(it&&($=1-$),i.clearDepth($),tt=$)},reset:function(){I=!1,at=null,vt=null,tt=null,it=!1}}}function s(){let I=!1,it=null,at=null,vt=null,tt=null,$=null,St=null,Bt=null,ge=null;return{setTest:function(re){I||(re?J(i.STENCIL_TEST):gt(i.STENCIL_TEST))},setMask:function(re){it!==re&&!I&&(i.stencilMask(re),it=re)},setFunc:function(re,di,Jn){(at!==re||vt!==di||tt!==Jn)&&(i.stencilFunc(re,di,Jn),at=re,vt=di,tt=Jn)},setOp:function(re,di,Jn){($!==re||St!==di||Bt!==Jn)&&(i.stencilOp(re,di,Jn),$=re,St=di,Bt=Jn)},setLocked:function(re){I=re},setClear:function(re){ge!==re&&(i.clearStencil(re),ge=re)},reset:function(){I=!1,it=null,at=null,vt=null,tt=null,$=null,St=null,Bt=null,ge=null}}}const r=new e,o=new n,c=new s,a=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],p=null,v=!1,g=null,m=null,_=null,b=null,y=null,A=null,w=null,R=new qt(0,0,0),L=0,E=!1,S=null,C=null,D=null,O=null,W=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,K=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),j=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),j=K>=2);let st=null,ot={};const ft=i.getParameter(i.SCISSOR_BOX),Gt=i.getParameter(i.VIEWPORT),Qt=new Fe().fromArray(ft),me=new Fe().fromArray(Gt);function Xt(I,it,at,vt){const tt=new Uint8Array(4),$=i.createTexture();i.bindTexture(I,$),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let St=0;St<at;St++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,vt,0,i.RGBA,i.UNSIGNED_BYTE,tt):i.texImage2D(it+St,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,tt);return $}const Z={};Z[i.TEXTURE_2D]=Xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),c.setClear(0),J(i.DEPTH_TEST),o.setFunc(Pr),Dt(!1),xt(Gu),J(i.CULL_FACE),ue(Qi);function J(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function gt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Ut(I,it){return u[I]!==it?(i.bindFramebuffer(I,it),u[I]=it,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=it),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=it),!0):!1}function wt(I,it){let at=d,vt=!1;if(I){at=f.get(it),at===void 0&&(at=[],f.set(it,at));const tt=I.textures;if(at.length!==tt.length||at[0]!==i.COLOR_ATTACHMENT0){for(let $=0,St=tt.length;$<St;$++)at[$]=i.COLOR_ATTACHMENT0+$;at.length=tt.length,vt=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,vt=!0);vt&&i.drawBuffers(at)}function jt(I){return p!==I?(i.useProgram(I),p=I,!0):!1}const ze={[As]:i.FUNC_ADD,[z0]:i.FUNC_SUBTRACT,[O0]:i.FUNC_REVERSE_SUBTRACT};ze[B0]=i.MIN,ze[H0]=i.MAX;const P={[V0]:i.ZERO,[G0]:i.ONE,[W0]:i.SRC_COLOR,[Xl]:i.SRC_ALPHA,[Z0]:i.SRC_ALPHA_SATURATE,[j0]:i.DST_COLOR,[q0]:i.DST_ALPHA,[X0]:i.ONE_MINUS_SRC_COLOR,[ql]:i.ONE_MINUS_SRC_ALPHA,[K0]:i.ONE_MINUS_DST_COLOR,[Y0]:i.ONE_MINUS_DST_ALPHA,[$0]:i.CONSTANT_COLOR,[J0]:i.ONE_MINUS_CONSTANT_COLOR,[Q0]:i.CONSTANT_ALPHA,[tg]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(I,it,at,vt,tt,$,St,Bt,ge,re){if(I===Qi){v===!0&&(gt(i.BLEND),v=!1);return}if(v===!1&&(J(i.BLEND),v=!0),I!==k0){if(I!==g||re!==E){if((m!==As||y!==As)&&(i.blendEquation(i.FUNC_ADD),m=As,y=As),re)switch(I){case Er:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wu:i.blendFunc(i.ONE,i.ONE);break;case Xu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Er:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wu:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,b=null,A=null,w=null,R.set(0,0,0),L=0,g=I,E=re}return}tt=tt||it,$=$||at,St=St||vt,(it!==m||tt!==y)&&(i.blendEquationSeparate(ze[it],ze[tt]),m=it,y=tt),(at!==_||vt!==b||$!==A||St!==w)&&(i.blendFuncSeparate(P[at],P[vt],P[$],P[St]),_=at,b=vt,A=$,w=St),(Bt.equals(R)===!1||ge!==L)&&(i.blendColor(Bt.r,Bt.g,Bt.b,ge),R.copy(Bt),L=ge),g=I,E=!1}function zt(I,it){I.side===qn?gt(i.CULL_FACE):J(i.CULL_FACE);let at=I.side===mn;it&&(at=!at),Dt(at),I.blending===Er&&I.transparent===!1?ue(Qi):ue(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const vt=I.stencilWrite;c.setTest(vt),vt&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),yt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):gt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(I){S!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),S=I)}function xt(I){I!==U0?(J(i.CULL_FACE),I!==C&&(I===Gu?i.cullFace(i.BACK):I===N0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):gt(i.CULL_FACE),C=I}function fe(I){I!==D&&(j&&i.lineWidth(I),D=I)}function yt(I,it,at){I?(J(i.POLYGON_OFFSET_FILL),(O!==it||W!==at)&&(i.polygonOffset(it,at),O=it,W=at)):gt(i.POLYGON_OFFSET_FILL)}function Ot(I){I?J(i.SCISSOR_TEST):gt(i.SCISSOR_TEST)}function Ue(I){I===void 0&&(I=i.TEXTURE0+X-1),st!==I&&(i.activeTexture(I),st=I)}function be(I,it,at){at===void 0&&(st===null?at=i.TEXTURE0+X-1:at=st);let vt=ot[at];vt===void 0&&(vt={type:void 0,texture:void 0},ot[at]=vt),(vt.type!==I||vt.texture!==it)&&(st!==at&&(i.activeTexture(at),st=at),i.bindTexture(I,it||Z[I]),vt.type=I,vt.texture=it)}function T(){const I=ot[st];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function rt(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Tt(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function At(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ut(I){Qt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Qt.copy(I))}function Ft(I){me.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),me.copy(I))}function Rt(I,it){let at=l.get(it);at===void 0&&(at=new WeakMap,l.set(it,at));let vt=at.get(I);vt===void 0&&(vt=i.getUniformBlockIndex(it,I.name),at.set(I,vt))}function lt(I,it){const vt=l.get(it).get(I);a.get(it)!==vt&&(i.uniformBlockBinding(it,vt,I.__bindingPointIndex),a.set(it,vt))}function Ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},st=null,ot={},u={},f=new WeakMap,d=[],p=null,v=!1,g=null,m=null,_=null,b=null,y=null,A=null,w=null,R=new qt(0,0,0),L=0,E=!1,S=null,C=null,D=null,O=null,W=null,Qt.set(0,0,i.canvas.width,i.canvas.height),me.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),c.reset()}return{buffers:{color:r,depth:o,stencil:c},enable:J,disable:gt,bindFramebuffer:Ut,drawBuffers:wt,useProgram:jt,setBlending:ue,setMaterial:zt,setFlipSided:Dt,setCullFace:xt,setLineWidth:fe,setPolygonOffset:yt,setScissorTest:Ot,activeTexture:Ue,bindTexture:be,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:At,texImage3D:nt,updateUBOMapping:Rt,uniformBlockBinding:lt,texStorage2D:rt,texStorage3D:Tt,texSubImage2D:Y,texSubImage3D:Q,compressedTexSubImage2D:q,compressedTexSubImage3D:Ct,scissor:ut,viewport:Ft,reset:Ht}}function Jy(i,t,e,n,s,r,o){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Jt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(T,x){return d?new OffscreenCanvas(T,x):uc("canvas")}function v(T,x,z){let Y=1;const Q=be(T);if((Q.width>z||Q.height>z)&&(Y=z/Math.max(Q.width,Q.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(Y*Q.width),Ct=Math.floor(Y*Q.height);u===void 0&&(u=p(q,Ct));const rt=x?p(q,Ct):u;return rt.width=q,rt.height=Ct,rt.getContext("2d").drawImage(T,0,0,q,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+q+"x"+Ct+")."),rt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function g(T){return T.generateMipmaps}function m(T){i.generateMipmap(T)}function _(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(T,x,z,Y,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=x;if(x===i.RED&&(z===i.FLOAT&&(q=i.R32F),z===i.HALF_FLOAT&&(q=i.R16F),z===i.UNSIGNED_BYTE&&(q=i.R8)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.R8UI),z===i.UNSIGNED_SHORT&&(q=i.R16UI),z===i.UNSIGNED_INT&&(q=i.R32UI),z===i.BYTE&&(q=i.R8I),z===i.SHORT&&(q=i.R16I),z===i.INT&&(q=i.R32I)),x===i.RG&&(z===i.FLOAT&&(q=i.RG32F),z===i.HALF_FLOAT&&(q=i.RG16F),z===i.UNSIGNED_BYTE&&(q=i.RG8)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RG8UI),z===i.UNSIGNED_SHORT&&(q=i.RG16UI),z===i.UNSIGNED_INT&&(q=i.RG32UI),z===i.BYTE&&(q=i.RG8I),z===i.SHORT&&(q=i.RG16I),z===i.INT&&(q=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(q=i.RGB16UI),z===i.UNSIGNED_INT&&(q=i.RGB32UI),z===i.BYTE&&(q=i.RGB8I),z===i.SHORT&&(q=i.RGB16I),z===i.INT&&(q=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),z===i.UNSIGNED_INT&&(q=i.RGBA32UI),z===i.BYTE&&(q=i.RGBA8I),z===i.SHORT&&(q=i.RGBA16I),z===i.INT&&(q=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),x===i.RGBA){const Ct=Q?lc:se.getTransfer(Y);z===i.FLOAT&&(q=i.RGBA32F),z===i.HALF_FLOAT&&(q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(q=Ct===he?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function y(T,x){let z;return T?x===null||x===Bs||x===Ro?z=i.DEPTH24_STENCIL8:x===ai?z=i.DEPTH32F_STENCIL8:x===Ao&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Bs||x===Ro?z=i.DEPTH_COMPONENT24:x===ai?z=i.DEPTH_COMPONENT32F:x===Ao&&(z=i.DEPTH_COMPONENT16),z}function A(T,x){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ve&&T.minFilter!==oi?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function w(T){const x=T.target;x.removeEventListener("dispose",w),L(x),x.isVideoTexture&&h.delete(x)}function R(T){const x=T.target;x.removeEventListener("dispose",R),S(x)}function L(T){const x=n.get(T);if(x.__webglInit===void 0)return;const z=T.source,Y=f.get(z);if(Y){const Q=Y[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(T),Object.keys(Y).length===0&&f.delete(z)}n.remove(T)}function E(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const z=T.source,Y=f.get(z);delete Y[x.__cacheKey],o.memory.textures--}function S(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let Q=0;Q<x.__webglFramebuffer[Y].length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[Y][Q]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=T.textures;for(let Y=0,Q=z.length;Y<Q;Y++){const q=n.get(z[Y]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(z[Y])}n.remove(T)}let C=0;function D(){C=0}function O(){const T=C;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),C+=1,T}function W(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function X(T,x){const z=n.get(T);if(T.isVideoTexture&&Ot(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(z,T,x);return}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function j(T,x){const z=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){Z(z,T,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function K(T,x){const z=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){Z(z,T,x);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function H(T,x){const z=n.get(T);if(T.version>0&&z.__version!==T.version){J(z,T,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}const st={[nh]:i.REPEAT,[Ls]:i.CLAMP_TO_EDGE,[ih]:i.MIRRORED_REPEAT},ot={[Ve]:i.NEAREST,[hg]:i.NEAREST_MIPMAP_NEAREST,[lo]:i.NEAREST_MIPMAP_LINEAR,[oi]:i.LINEAR,[zc]:i.LINEAR_MIPMAP_NEAREST,[Zi]:i.LINEAR_MIPMAP_LINEAR},ft={[mg]:i.NEVER,[Mg]:i.ALWAYS,[gg]:i.LESS,[Sp]:i.LEQUAL,[vg]:i.EQUAL,[yg]:i.GEQUAL,[_g]:i.GREATER,[xg]:i.NOTEQUAL};function Gt(T,x){if(x.type===ai&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===oi||x.magFilter===zc||x.magFilter===lo||x.magFilter===Zi||x.minFilter===oi||x.minFilter===zc||x.minFilter===lo||x.minFilter===Zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,st[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,st[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,st[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ot[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ot[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ft[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ve||x.minFilter!==lo&&x.minFilter!==Zi||x.type===ai&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Qt(T,x){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",w));const Y=x.source;let Q=f.get(Y);Q===void 0&&(Q={},f.set(Y,Q));const q=W(x);if(q!==T.__cacheKey){Q[q]===void 0&&(Q[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[q].usedTimes++;const Ct=Q[T.__cacheKey];Ct!==void 0&&(Q[T.__cacheKey].usedTimes--,Ct.usedTimes===0&&E(x)),T.__cacheKey=q,T.__webglTexture=Q[q].texture}return z}function me(T,x,z){return Math.floor(Math.floor(T/z)/x)}function Xt(T,x,z,Y){const q=T.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,Y,x.data);else{q.sort((nt,ut)=>nt.start-ut.start);let Ct=0;for(let nt=1;nt<q.length;nt++){const ut=q[Ct],Ft=q[nt],Rt=ut.start+ut.count,lt=me(Ft.start,x.width,4),Ht=me(ut.start,x.width,4);Ft.start<=Rt+1&&lt===Ht&&me(Ft.start+Ft.count-1,x.width,4)===lt?ut.count=Math.max(ut.count,Ft.start+Ft.count-ut.start):(++Ct,q[Ct]=Ft)}q.length=Ct+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),Tt=i.getParameter(i.UNPACK_SKIP_PIXELS),At=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let nt=0,ut=q.length;nt<ut;nt++){const Ft=q[nt],Rt=Math.floor(Ft.start/4),lt=Math.ceil(Ft.count/4),Ht=Rt%x.width,I=Math.floor(Rt/x.width),it=lt,at=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ht),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,Ht,I,it,at,z,Y,x.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Tt),i.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function Z(T,x,z){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);const Q=Qt(T,x),q=x.source;e.bindTexture(Y,T.__webglTexture,i.TEXTURE0+z);const Ct=n.get(q);if(q.version!==Ct.__version||Q===!0){e.activeTexture(i.TEXTURE0+z);const rt=se.getPrimaries(se.workingColorSpace),Tt=x.colorSpace===Ki?null:se.getPrimaries(x.colorSpace),At=x.colorSpace===Ki||rt===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let nt=v(x.image,!1,s.maxTextureSize);nt=Ue(x,nt);const ut=r.convert(x.format,x.colorSpace),Ft=r.convert(x.type);let Rt=b(x.internalFormat,ut,Ft,x.colorSpace,x.isVideoTexture);Gt(Y,x);let lt;const Ht=x.mipmaps,I=x.isVideoTexture!==!0,it=Ct.__version===void 0||Q===!0,at=q.dataReady,vt=A(x,nt);if(x.isDepthTexture)Rt=y(x.format===Po,x.type),it&&(I?e.texStorage2D(i.TEXTURE_2D,1,Rt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Rt,nt.width,nt.height,0,ut,Ft,null));else if(x.isDataTexture)if(Ht.length>0){I&&it&&e.texStorage2D(i.TEXTURE_2D,vt,Rt,Ht[0].width,Ht[0].height);for(let tt=0,$=Ht.length;tt<$;tt++)lt=Ht[tt],I?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Ft,lt.data):e.texImage2D(i.TEXTURE_2D,tt,Rt,lt.width,lt.height,0,ut,Ft,lt.data);x.generateMipmaps=!1}else I?(it&&e.texStorage2D(i.TEXTURE_2D,vt,Rt,nt.width,nt.height),at&&Xt(x,nt,ut,Ft)):e.texImage2D(i.TEXTURE_2D,0,Rt,nt.width,nt.height,0,ut,Ft,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){I&&it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Rt,Ht[0].width,Ht[0].height,nt.depth);for(let tt=0,$=Ht.length;tt<$;tt++)if(lt=Ht[tt],x.format!==Kn)if(ut!==null)if(I){if(at)if(x.layerUpdates.size>0){const St=Sf(lt.width,lt.height,x.format,x.type);for(const Bt of x.layerUpdates){const ge=lt.data.subarray(Bt*St/lt.data.BYTES_PER_ELEMENT,(Bt+1)*St/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Bt,lt.width,lt.height,1,ut,ge)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Rt,lt.width,lt.height,nt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?at&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,lt.width,lt.height,nt.depth,ut,Ft,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Rt,lt.width,lt.height,nt.depth,0,ut,Ft,lt.data)}else{I&&it&&e.texStorage2D(i.TEXTURE_2D,vt,Rt,Ht[0].width,Ht[0].height);for(let tt=0,$=Ht.length;tt<$;tt++)lt=Ht[tt],x.format!==Kn?ut!==null?I?at&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Rt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,lt.width,lt.height,ut,Ft,lt.data):e.texImage2D(i.TEXTURE_2D,tt,Rt,lt.width,lt.height,0,ut,Ft,lt.data)}else if(x.isDataArrayTexture)if(I){if(it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Rt,nt.width,nt.height,nt.depth),at)if(x.layerUpdates.size>0){const tt=Sf(nt.width,nt.height,x.format,x.type);for(const $ of x.layerUpdates){const St=nt.data.subarray($*tt/nt.data.BYTES_PER_ELEMENT,($+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,nt.width,nt.height,1,ut,Ft,St)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,Ft,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,nt.width,nt.height,nt.depth,0,ut,Ft,nt.data);else if(x.isData3DTexture)I?(it&&e.texStorage3D(i.TEXTURE_3D,vt,Rt,nt.width,nt.height,nt.depth),at&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,Ft,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,nt.width,nt.height,nt.depth,0,ut,Ft,nt.data);else if(x.isFramebufferTexture){if(it)if(I)e.texStorage2D(i.TEXTURE_2D,vt,Rt,nt.width,nt.height);else{let tt=nt.width,$=nt.height;for(let St=0;St<vt;St++)e.texImage2D(i.TEXTURE_2D,St,Rt,tt,$,0,ut,Ft,null),tt>>=1,$>>=1}}else if(Ht.length>0){if(I&&it){const tt=be(Ht[0]);e.texStorage2D(i.TEXTURE_2D,vt,Rt,tt.width,tt.height)}for(let tt=0,$=Ht.length;tt<$;tt++)lt=Ht[tt],I?at&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ut,Ft,lt):e.texImage2D(i.TEXTURE_2D,tt,Rt,ut,Ft,lt);x.generateMipmaps=!1}else if(I){if(it){const tt=be(nt);e.texStorage2D(i.TEXTURE_2D,vt,Rt,tt.width,tt.height)}at&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Ft,nt)}else e.texImage2D(i.TEXTURE_2D,0,Rt,ut,Ft,nt);g(x)&&m(Y),Ct.__version=q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function J(T,x,z){if(x.image.length!==6)return;const Y=Qt(T,x),Q=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+z);const q=n.get(Q);if(Q.version!==q.__version||Y===!0){e.activeTexture(i.TEXTURE0+z);const Ct=se.getPrimaries(se.workingColorSpace),rt=x.colorSpace===Ki?null:se.getPrimaries(x.colorSpace),Tt=x.colorSpace===Ki||Ct===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const At=x.isCompressedTexture||x.image[0].isCompressedTexture,nt=x.image[0]&&x.image[0].isDataTexture,ut=[];for(let $=0;$<6;$++)!At&&!nt?ut[$]=v(x.image[$],!0,s.maxCubemapSize):ut[$]=nt?x.image[$].image:x.image[$],ut[$]=Ue(x,ut[$]);const Ft=ut[0],Rt=r.convert(x.format,x.colorSpace),lt=r.convert(x.type),Ht=b(x.internalFormat,Rt,lt,x.colorSpace),I=x.isVideoTexture!==!0,it=q.__version===void 0||Y===!0,at=Q.dataReady;let vt=A(x,Ft);Gt(i.TEXTURE_CUBE_MAP,x);let tt;if(At){I&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,Ht,Ft.width,Ft.height);for(let $=0;$<6;$++){tt=ut[$].mipmaps;for(let St=0;St<tt.length;St++){const Bt=tt[St];x.format!==Kn?Rt!==null?I?at&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St,0,0,Bt.width,Bt.height,Rt,Bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St,Ht,Bt.width,Bt.height,0,Bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St,0,0,Bt.width,Bt.height,Rt,lt,Bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St,Ht,Bt.width,Bt.height,0,Rt,lt,Bt.data)}}}else{if(tt=x.mipmaps,I&&it){tt.length>0&&vt++;const $=be(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,Ht,$.width,$.height)}for(let $=0;$<6;$++)if(nt){I?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ut[$].width,ut[$].height,Rt,lt,ut[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,ut[$].width,ut[$].height,0,Rt,lt,ut[$].data);for(let St=0;St<tt.length;St++){const ge=tt[St].image[$].image;I?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St+1,0,0,ge.width,ge.height,Rt,lt,ge.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St+1,Ht,ge.width,ge.height,0,Rt,lt,ge.data)}}else{I?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Rt,lt,ut[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,Rt,lt,ut[$]);for(let St=0;St<tt.length;St++){const Bt=tt[St];I?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St+1,0,0,Rt,lt,Bt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,St+1,Ht,Rt,lt,Bt.image[$])}}}g(x)&&m(i.TEXTURE_CUBE_MAP),q.__version=Q.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function gt(T,x,z,Y,Q,q){const Ct=r.convert(z.format,z.colorSpace),rt=r.convert(z.type),Tt=b(z.internalFormat,Ct,rt,z.colorSpace),At=n.get(x),nt=n.get(z);if(nt.__renderTarget=x,!At.__hasExternalTextures){const ut=Math.max(1,x.width>>q),Ft=Math.max(1,x.height>>q);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,q,Tt,ut,Ft,x.depth,0,Ct,rt,null):e.texImage2D(Q,q,Tt,ut,Ft,0,Ct,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),yt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Q,nt.__webglTexture,0,fe(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Q,nt.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(T,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const Y=x.depthTexture,Q=Y&&Y.isDepthTexture?Y.type:null,q=y(x.stencilBuffer,Q),Ct=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=fe(x);yt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,q,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,q,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,q,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,T)}else{const Y=x.textures;for(let Q=0;Q<Y.length;Q++){const q=Y[Q],Ct=r.convert(q.format,q.colorSpace),rt=r.convert(q.type),Tt=b(q.internalFormat,Ct,rt,q.colorSpace),At=fe(x);z&&yt(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,Tt,x.width,x.height):yt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,Tt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X(x.depthTexture,0);const Q=Y.__webglTexture,q=fe(x);if(x.depthTexture.format===Co)yt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(x.depthTexture.format===Po)yt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function jt(T){const x=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",Q)};Y.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=Y}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const Y=T.texture.mipmaps;Y&&Y.length>0?wt(x.__webglFramebuffer[0],T):wt(x.__webglFramebuffer,T)}else if(z){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),Ut(x.__webglDepthbuffer[Y],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}else{const Y=T.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Ut(x.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(T,x,z){const Y=n.get(T);x!==void 0&&gt(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&jt(T)}function P(T){const x=T.texture,z=n.get(T),Y=n.get(x);T.addEventListener("dispose",R);const Q=T.textures,q=T.isWebGLCubeRenderTarget===!0,Ct=Q.length>1;if(Ct||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[rt]=[];for(let Tt=0;Tt<x.mipmaps.length;Tt++)z.__webglFramebuffer[rt][Tt]=i.createFramebuffer()}else z.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let rt=0;rt<x.mipmaps.length;rt++)z.__webglFramebuffer[rt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let rt=0,Tt=Q.length;rt<Tt;rt++){const At=n.get(Q[rt]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&yt(T)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const Tt=Q[rt];z.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[rt]);const At=r.convert(Tt.format,Tt.colorSpace),nt=r.convert(Tt.type),ut=b(Tt.internalFormat,At,nt,Tt.colorSpace,T.isXRRenderTarget===!0),Ft=fe(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,ut,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,z.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(z.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Gt(i.TEXTURE_CUBE_MAP,x);for(let rt=0;rt<6;rt++)if(x.mipmaps&&x.mipmaps.length>0)for(let Tt=0;Tt<x.mipmaps.length;Tt++)gt(z.__webglFramebuffer[rt][Tt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Tt);else gt(z.__webglFramebuffer[rt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);g(x)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let rt=0,Tt=Q.length;rt<Tt;rt++){const At=Q[rt],nt=n.get(At);let ut=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ut=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,nt.__webglTexture),Gt(ut,At),gt(z.__webglFramebuffer,T,At,i.COLOR_ATTACHMENT0+rt,ut,0),g(At)&&m(ut)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(rt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,Y.__webglTexture),Gt(rt,x),x.mipmaps&&x.mipmaps.length>0)for(let Tt=0;Tt<x.mipmaps.length;Tt++)gt(z.__webglFramebuffer[Tt],T,x,i.COLOR_ATTACHMENT0,rt,Tt);else gt(z.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,rt,0);g(x)&&m(rt),e.unbindTexture()}T.depthBuffer&&jt(T)}function ue(T){const x=T.textures;for(let z=0,Y=x.length;z<Y;z++){const Q=x[z];if(g(Q)){const q=_(T),Ct=n.get(Q).__webglTexture;e.bindTexture(q,Ct),m(q),e.unbindTexture()}}}const zt=[],Dt=[];function xt(T){if(T.samples>0){if(yt(T)===!1){const x=T.textures,z=T.width,Y=T.height;let Q=i.COLOR_BUFFER_BIT;const q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(T),rt=x.length>1;if(rt)for(let At=0;At<x.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const Tt=T.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let At=0;At<x.length;At++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const nt=n.get(x[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,z,Y,0,0,z,Y,Q,i.NEAREST),a===!0&&(zt.length=0,Dt.length=0,zt.push(i.COLOR_ATTACHMENT0+At),T.depthBuffer&&T.resolveDepthBuffer===!1&&(zt.push(q),Dt.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let At=0;At<x.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[At]);const nt=n.get(x[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&a){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function fe(T){return Math.min(s.maxSamples,T.samples)}function yt(T){const x=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ot(T){const x=o.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Ue(T,x){const z=T.colorSpace,Y=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Dr&&z!==Ki&&(se.getTransfer(z)===he?(Y!==Kn||Q!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function be(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=D,this.setTexture2D=X,this.setTexture2DArray=j,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=ze,this.setupRenderTarget=P,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=yt}function Qy(i,t){function e(n,s=Ki){let r;const o=se.getTransfer(s);if(n===Di)return i.UNSIGNED_BYTE;if(n===Qh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_p)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===xp)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===gp)return i.BYTE;if(n===vp)return i.SHORT;if(n===Ao)return i.UNSIGNED_SHORT;if(n===Jh)return i.INT;if(n===Bs)return i.UNSIGNED_INT;if(n===ai)return i.FLOAT;if(n===Bo)return i.HALF_FLOAT;if(n===yp)return i.ALPHA;if(n===Mp)return i.RGB;if(n===Kn)return i.RGBA;if(n===Co)return i.DEPTH_COMPONENT;if(n===Po)return i.DEPTH_STENCIL;if(n===Ho)return i.RED;if(n===eu)return i.RED_INTEGER;if(n===bp)return i.RG;if(n===nu)return i.RG_INTEGER;if(n===iu)return i.RGBA_INTEGER;if(n===Ha||n===Va||n===Ga||n===Wa)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sh||n===rh||n===oh||n===ah)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ah)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ch||n===lh||n===hh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ch||n===lh)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uh||n===fh||n===dh||n===ph||n===mh||n===gh||n===vh||n===_h||n===xh||n===yh||n===Mh||n===bh||n===Sh||n===Eh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===uh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ph)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_h)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Sh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eh)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wh||n===Th||n===Ah)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===wh)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Th)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ah)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rh||n===Ch||n===Ph||n===Ih)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ch)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ph)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ih)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ro?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const tM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eM=`
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

}`;class nM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Op(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new cn({vertexShader:tM,fragmentShader:eM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new Hr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class iM extends zr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,c="local-floor",a=1,l=null,h=null,u=null,f=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",g=new nM,m={},_=e.getContextAttributes();let b=null,y=null;const A=[],w=[],R=new Jt;let L=null;const E=new kn;E.viewport=new Fe;const S=new kn;S.viewport=new Fe;const C=[E,S],D=new E1;let O=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let J=A[Z];return J===void 0&&(J=new rl,A[Z]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Z){let J=A[Z];return J===void 0&&(J=new rl,A[Z]=J),J.getGripSpace()},this.getHand=function(Z){let J=A[Z];return J===void 0&&(J=new rl,A[Z]=J),J.getHandSpace()};function X(Z){const J=w.indexOf(Z.inputSource);if(J===-1)return;const gt=A[J];gt!==void 0&&(gt.update(Z.inputSource,Z.frame,l||o),gt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function j(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",K);for(let Z=0;Z<A.length;Z++){const J=w[Z];J!==null&&(w[Z]=null,A[Z].disconnect(J))}O=null,W=null,g.reset();for(const Z in m)delete m[Z];t.setRenderTarget(b),d=null,f=null,u=null,s=null,y=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){c=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",j),s.addEventListener("inputsourceschange",K),_.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,Ut=null,wt=null;_.depth&&(wt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=_.stencil?Po:Co,Ut=_.stencil?Ro:Bs);const jt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(jt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Hs(f.textureWidth,f.textureHeight,{format:Kn,type:Di,depthTexture:new zp(f.textureWidth,f.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const gt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,gt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Hs(d.framebufferWidth,d.framebufferHeight,{format:Kn,type:Di,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(a),l=null,o=await s.requestReferenceSpace(c),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(Z){for(let J=0;J<Z.removed.length;J++){const gt=Z.removed[J],Ut=w.indexOf(gt);Ut>=0&&(w[Ut]=null,A[Ut].disconnect(gt))}for(let J=0;J<Z.added.length;J++){const gt=Z.added[J];let Ut=w.indexOf(gt);if(Ut===-1){for(let jt=0;jt<A.length;jt++)if(jt>=w.length){w.push(gt),Ut=jt;break}else if(w[jt]===null){w[jt]=gt,Ut=jt;break}if(Ut===-1)break}const wt=A[Ut];wt&&wt.connect(gt)}}const H=new N,st=new N;function ot(Z,J,gt){H.setFromMatrixPosition(J.matrixWorld),st.setFromMatrixPosition(gt.matrixWorld);const Ut=H.distanceTo(st),wt=J.projectionMatrix.elements,jt=gt.projectionMatrix.elements,ze=wt[14]/(wt[10]-1),P=wt[14]/(wt[10]+1),ue=(wt[9]+1)/wt[5],zt=(wt[9]-1)/wt[5],Dt=(wt[8]-1)/wt[0],xt=(jt[8]+1)/jt[0],fe=ze*Dt,yt=ze*xt,Ot=Ut/(-Dt+xt),Ue=Ot*-Dt;if(J.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ue),Z.translateZ(Ot),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),wt[10]===-1)Z.projectionMatrix.copy(J.projectionMatrix),Z.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const be=ze+Ot,T=P+Ot,x=fe-Ue,z=yt+(Ut-Ue),Y=ue*P/T*be,Q=zt*P/T*be;Z.projectionMatrix.makePerspective(x,z,Y,Q,be,T),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ft(Z,J){J===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(J.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let J=Z.near,gt=Z.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(gt=g.depthFar)),D.near=S.near=E.near=J,D.far=S.far=E.far=gt,(O!==D.near||W!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,W=D.far),D.layers.mask=Z.layers.mask|6,E.layers.mask=D.layers.mask&3,S.layers.mask=D.layers.mask&5;const Ut=Z.parent,wt=D.cameras;ft(D,Ut);for(let jt=0;jt<wt.length;jt++)ft(wt[jt],Ut);wt.length===2?ot(D,E,S):D.projectionMatrix.copy(E.projectionMatrix),Gt(Z,D,Ut)};function Gt(Z,J,gt){gt===null?Z.matrix.copy(J.matrixWorld):(Z.matrix.copy(gt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(J.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(J.projectionMatrix),Z.projectionMatrixInverse.copy(J.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Io*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(f===null&&d===null))return a},this.setFoveation=function(Z){a=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(Z){return m[Z]};let Qt=null;function me(Z,J){if(h=J.getViewerPose(l||o),p=J,h!==null){const gt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Ut=!1;gt.length!==D.cameras.length&&(D.cameras.length=0,Ut=!0);for(let P=0;P<gt.length;P++){const ue=gt[P];let zt=null;if(d!==null)zt=d.getViewport(ue);else{const xt=u.getViewSubImage(f,ue);zt=xt.viewport,P===0&&(t.setRenderTargetTextures(y,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(y))}let Dt=C[P];Dt===void 0&&(Dt=new kn,Dt.layers.enable(P),Dt.viewport=new Fe,C[P]=Dt),Dt.matrix.fromArray(ue.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(ue.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(zt.x,zt.y,zt.width,zt.height),P===0&&(D.matrix.copy(Dt.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ut===!0&&D.cameras.push(Dt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const P=u.getDepthInformation(gt[0]);P&&P.isValid&&P.texture&&g.init(P,s.renderState)}if(wt&&wt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let P=0;P<gt.length;P++){const ue=gt[P].camera;if(ue){let zt=m[ue];zt||(zt=new Op,m[ue]=zt);const Dt=u.getCameraImage(ue);zt.sourceTexture=Dt}}}}for(let gt=0;gt<A.length;gt++){const Ut=w[gt],wt=A[gt];Ut!==null&&wt!==void 0&&wt.update(Ut,J,l||o)}Qt&&Qt(Z,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),p=null}const Xt=new Bp;Xt.setAnimationLoop(me),this.setAnimationLoop=function(Z){Qt=Z},this.dispose=function(){}}}const ys=new Ui,sM=new xe;function rM(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Ip(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,_,b,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&c(g,m)):m.isPointsMaterial?a(g,m,_,b):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===mn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===mn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=t.get(m),b=_.envMap,y=_.envMapRotation;b&&(g.envMap.value=b,ys.copy(y),ys.x*=-1,ys.y*=-1,ys.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),g.envMapRotation.value.setFromMatrix4(sM.makeRotationFromEuler(ys)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function c(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function a(g,m,_,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===mn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const _=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function oM(i,t,e,n){let s={},r={},o=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function a(_,b){const y=b.program;n.uniformBlockBinding(_,y)}function l(_,b){let y=s[_.id];y===void 0&&(p(_),y=h(_),s[_.id]=y,_.addEventListener("dispose",g));const A=b.program;n.updateUBOMapping(_,A);const w=t.render.frame;r[_.id]!==w&&(f(_),r[_.id]=w)}function h(_){const b=u();_.__bindingPointIndex=b;const y=i.createBuffer(),A=_.__size,w=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function u(){for(let _=0;_<c;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const b=s[_.id],y=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let w=0,R=y.length;w<R;w++){const L=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,S=L.length;E<S;E++){const C=L[E];if(d(C,w,E,A)===!0){const D=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let X=0;X<O.length;X++){const j=O[X],K=v(j);typeof j=="number"||typeof j=="boolean"?(C.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,D+W,C.__data)):j.isMatrix3?(C.__data[0]=j.elements[0],C.__data[1]=j.elements[1],C.__data[2]=j.elements[2],C.__data[3]=0,C.__data[4]=j.elements[3],C.__data[5]=j.elements[4],C.__data[6]=j.elements[5],C.__data[7]=0,C.__data[8]=j.elements[6],C.__data[9]=j.elements[7],C.__data[10]=j.elements[8],C.__data[11]=0):(j.toArray(C.__data,W),W+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,b,y,A){const w=_.value,R=b+"_"+y;if(A[R]===void 0)return typeof w=="number"||typeof w=="boolean"?A[R]=w:A[R]=w.clone(),!0;{const L=A[R];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return A[R]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function p(_){const b=_.uniforms;let y=0;const A=16;for(let R=0,L=b.length;R<L;R++){const E=Array.isArray(b[R])?b[R]:[b[R]];for(let S=0,C=E.length;S<C;S++){const D=E[S],O=Array.isArray(D.value)?D.value:[D.value];for(let W=0,X=O.length;W<X;W++){const j=O[W],K=v(j),H=y%A,st=H%K.boundary,ot=H+st;y+=st,ot!==0&&A-ot<K.storage&&(y+=A-ot),D.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=K.storage}}}const w=y%A;return w>0&&(y+=A-w),_.__size=y,_.__cache={},this}function v(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),b}function g(_){const b=_.target;b.removeEventListener("dispose",g);const y=o.indexOf(b.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function m(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:a,update:l,dispose:m}}class aM{constructor(t={}){const{canvas:e=zg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:c=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const _=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let A=!1;this._outputColorSpace=sn;let w=0,R=0,L=null,E=-1,S=null;const C=new Fe,D=new Fe;let O=null;const W=new qt(0);let X=0,j=e.width,K=e.height,H=1,st=null,ot=null;const ft=new Fe(0,0,j,K),Gt=new Fe(0,0,j,K);let Qt=!1;const me=new Fp;let Xt=!1,Z=!1;const J=new xe,gt=new N,Ut=new Fe,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function ze(){return L===null?H:1}let P=n;function ue(M,F){return e.getContext(M,F)}try{const M={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:a,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$h}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",tt,!1),P===null){const F="webgl2";if(P=ue(F,M),P===null)throw ue(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let zt,Dt,xt,fe,yt,Ot,Ue,be,T,x,z,Y,Q,q,Ct,rt,Tt,At,nt,ut,Ft,Rt,lt,Ht;function I(){zt=new vx(P),zt.init(),Rt=new Qy(P,zt),Dt=new hx(P,zt,t,Rt),xt=new $y(P,zt),Dt.reversedDepthBuffer&&f&&xt.buffers.depth.setReversed(!0),fe=new yx(P),yt=new zy,Ot=new Jy(P,zt,xt,yt,Dt,Rt,fe),Ue=new fx(y),be=new gx(y),T=new T1(P),lt=new cx(P,T),x=new _x(P,T,fe,lt),z=new bx(P,x,T,fe),nt=new Mx(P,Dt,Ot),rt=new ux(yt),Y=new ky(y,Ue,be,zt,Dt,lt,rt),Q=new rM(y,yt),q=new By,Ct=new qy(zt),At=new ax(y,Ue,be,xt,z,d,a),Tt=new Ky(y,z,Dt),Ht=new oM(P,fe,Dt,xt),ut=new lx(P,zt,fe),Ft=new xx(P,zt,fe),fe.programs=Y.programs,y.capabilities=Dt,y.extensions=zt,y.properties=yt,y.renderLists=q,y.shadowMap=Tt,y.state=xt,y.info=fe}I();const it=new iM(y,P);this.xr=it,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=zt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=zt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(M){M!==void 0&&(H=M,this.setSize(j,K,!1))},this.getSize=function(M){return M.set(j,K)},this.setSize=function(M,F,V=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=M,K=F,e.width=Math.floor(M*H),e.height=Math.floor(F*H),V===!0&&(e.style.width=M+"px",e.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(j*H,K*H).floor()},this.setDrawingBufferSize=function(M,F,V){j=M,K=F,H=V,e.width=Math.floor(M*V),e.height=Math.floor(F*V),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(ft)},this.setViewport=function(M,F,V,G){M.isVector4?ft.set(M.x,M.y,M.z,M.w):ft.set(M,F,V,G),xt.viewport(C.copy(ft).multiplyScalar(H).round())},this.getScissor=function(M){return M.copy(Gt)},this.setScissor=function(M,F,V,G){M.isVector4?Gt.set(M.x,M.y,M.z,M.w):Gt.set(M,F,V,G),xt.scissor(D.copy(Gt).multiplyScalar(H).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(M){xt.setScissorTest(Qt=M)},this.setOpaqueSort=function(M){st=M},this.setTransparentSort=function(M){ot=M},this.getClearColor=function(M){return M.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor(...arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,V=!0){let G=0;if(M){let k=!1;if(L!==null){const et=L.texture.format;k=et===iu||et===nu||et===eu}if(k){const et=L.texture.type,ht=et===Di||et===Bs||et===Ao||et===Ro||et===Qh||et===tu,bt=At.getClearColor(),mt=At.getClearAlpha(),Nt=bt.r,kt=bt.g,It=bt.b;ht?(p[0]=Nt,p[1]=kt,p[2]=It,p[3]=mt,P.clearBufferuiv(P.COLOR,0,p)):(v[0]=Nt,v[1]=kt,v[2]=It,v[3]=mt,P.clearBufferiv(P.COLOR,0,v))}else G|=P.COLOR_BUFFER_BIT}F&&(G|=P.DEPTH_BUFFER_BIT),V&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",tt,!1),At.dispose(),q.dispose(),Ct.dispose(),yt.dispose(),Ue.dispose(),be.dispose(),z.dispose(),lt.dispose(),Ht.dispose(),Y.dispose(),it.dispose(),it.removeEventListener("sessionstart",Jn),it.removeEventListener("sessionend",Cu),hs.stop()};function at(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const M=fe.autoReset,F=Tt.enabled,V=Tt.autoUpdate,G=Tt.needsUpdate,k=Tt.type;I(),fe.autoReset=M,Tt.enabled=F,Tt.autoUpdate=V,Tt.needsUpdate=G,Tt.type=k}function tt(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function $(M){const F=M.target;F.removeEventListener("dispose",$),St(F)}function St(M){Bt(M),yt.remove(M)}function Bt(M){const F=yt.get(M).programs;F!==void 0&&(F.forEach(function(V){Y.releaseProgram(V)}),M.isShaderMaterial&&Y.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,V,G,k,et){F===null&&(F=wt);const ht=k.isMesh&&k.matrixWorld.determinant()<0,bt=Gm(M,F,V,G,k);xt.setMaterial(G,ht);let mt=V.index,Nt=1;if(G.wireframe===!0){if(mt=x.getWireframeAttribute(V),mt===void 0)return;Nt=2}const kt=V.drawRange,It=V.attributes.position;let Kt=kt.start*Nt,le=(kt.start+kt.count)*Nt;et!==null&&(Kt=Math.max(Kt,et.start*Nt),le=Math.min(le,(et.start+et.count)*Nt)),mt!==null?(Kt=Math.max(Kt,0),le=Math.min(le,mt.count)):It!=null&&(Kt=Math.max(Kt,0),le=Math.min(le,It.count));const Ie=le-Kt;if(Ie<0||Ie===1/0)return;lt.setup(k,G,bt,V,mt);let ye,de=ut;if(mt!==null&&(ye=T.get(mt),de=Ft,de.setIndex(ye)),k.isMesh)G.wireframe===!0?(xt.setLineWidth(G.wireframeLinewidth*ze()),de.setMode(P.LINES)):de.setMode(P.TRIANGLES);else if(k.isLine){let Lt=G.linewidth;Lt===void 0&&(Lt=1),xt.setLineWidth(Lt*ze()),k.isLineSegments?de.setMode(P.LINES):k.isLineLoop?de.setMode(P.LINE_LOOP):de.setMode(P.LINE_STRIP)}else k.isPoints?de.setMode(P.POINTS):k.isSprite&&de.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Lo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),de.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))de.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Lt=k._multiDrawStarts,Te=k._multiDrawCounts,ne=k._multiDrawCount,bn=mt?T.get(mt).bytesPerElement:1,Xs=yt.get(G).currentProgram.getUniforms();for(let Sn=0;Sn<ne;Sn++)Xs.setValue(P,"_gl_DrawID",Sn),de.render(Lt[Sn]/bn,Te[Sn])}else if(k.isInstancedMesh)de.renderInstances(Kt,Ie,k.count);else if(V.isInstancedBufferGeometry){const Lt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Te=Math.min(V.instanceCount,Lt);de.renderInstances(Kt,Ie,Te)}else de.render(Kt,Ie)};function ge(M,F,V){M.transparent===!0&&M.side===qn&&M.forceSinglePass===!1?(M.side=mn,M.needsUpdate=!0,jo(M,F,V),M.side=ss,M.needsUpdate=!0,jo(M,F,V),M.side=qn):jo(M,F,V)}this.compile=function(M,F,V=null){V===null&&(V=M),m=Ct.get(V),m.init(F),b.push(m),V.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),M!==V&&M.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights();const G=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const et=k.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const bt=et[ht];ge(bt,V,k),G.add(bt)}else ge(et,V,k),G.add(et)}),m=b.pop(),G},this.compileAsync=function(M,F,V=null){const G=this.compile(M,F,V);return new Promise(k=>{function et(){if(G.forEach(function(ht){yt.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){k(M);return}setTimeout(et,10)}zt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let re=null;function di(M){re&&re(M)}function Jn(){hs.stop()}function Cu(){hs.start()}const hs=new Bp;hs.setAnimationLoop(di),typeof self<"u"&&hs.setContext(self),this.setAnimationLoop=function(M){re=M,it.setAnimationLoop(M),M===null?hs.stop():hs.start()},it.addEventListener("sessionstart",Jn),it.addEventListener("sessionend",Cu),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(F),F=it.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,F,L),m=Ct.get(M,b.length),m.init(F),b.push(m),J.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),me.setFromProjectionMatrix(J,ci,F.reversedDepth),Z=this.localClippingEnabled,Xt=rt.init(this.clippingPlanes,Z),g=q.get(M,_.length),g.init(),_.push(g),it.enabled===!0&&it.isPresenting===!0){const et=y.xr.getDepthSensingMesh();et!==null&&Nc(et,F,-1/0,y.sortObjects)}Nc(M,F,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(st,ot),jt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,jt&&At.addToRenderList(g,M),this.info.render.frame++,Xt===!0&&rt.beginShadows();const V=m.state.shadowsArray;Tt.render(V,M,F),Xt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,k=g.transmissive;if(m.setupLights(),F.isArrayCamera){const et=F.cameras;if(k.length>0)for(let ht=0,bt=et.length;ht<bt;ht++){const mt=et[ht];Iu(G,k,M,mt)}jt&&At.render(M);for(let ht=0,bt=et.length;ht<bt;ht++){const mt=et[ht];Pu(g,M,mt,mt.viewport)}}else k.length>0&&Iu(G,k,M,F),jt&&At.render(M),Pu(g,M,F);L!==null&&R===0&&(Ot.updateMultisampleRenderTarget(L),Ot.updateRenderTargetMipmap(L)),M.isScene===!0&&M.onAfterRender(y,M,F),lt.resetDefaultState(),E=-1,S=null,b.pop(),b.length>0?(m=b[b.length-1],Xt===!0&&rt.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Nc(M,F,V,G){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||me.intersectsSprite(M)){G&&Ut.setFromMatrixPosition(M.matrixWorld).applyMatrix4(J);const ht=z.update(M),bt=M.material;bt.visible&&g.push(M,ht,bt,V,Ut.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||me.intersectsObject(M))){const ht=z.update(M),bt=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ut.copy(M.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ut.copy(ht.boundingSphere.center)),Ut.applyMatrix4(M.matrixWorld).applyMatrix4(J)),Array.isArray(bt)){const mt=ht.groups;for(let Nt=0,kt=mt.length;Nt<kt;Nt++){const It=mt[Nt],Kt=bt[It.materialIndex];Kt&&Kt.visible&&g.push(M,ht,Kt,V,Ut.z,It)}}else bt.visible&&g.push(M,ht,bt,V,Ut.z,null)}}const et=M.children;for(let ht=0,bt=et.length;ht<bt;ht++)Nc(et[ht],F,V,G)}function Pu(M,F,V,G){const k=M.opaque,et=M.transmissive,ht=M.transparent;m.setupLightsView(V),Xt===!0&&rt.setGlobalState(y.clippingPlanes,V),G&&xt.viewport(C.copy(G)),k.length>0&&Yo(k,F,V),et.length>0&&Yo(et,F,V),ht.length>0&&Yo(ht,F,V),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Iu(M,F,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[G.id]===void 0&&(m.state.transmissionRenderTarget[G.id]=new Hs(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?Bo:Di,minFilter:Zi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const et=m.state.transmissionRenderTarget[G.id],ht=G.viewport||C;et.setSize(ht.z*y.transmissionResolutionScale,ht.w*y.transmissionResolutionScale);const bt=y.getRenderTarget(),mt=y.getActiveCubeFace(),Nt=y.getActiveMipmapLevel();y.setRenderTarget(et),y.getClearColor(W),X=y.getClearAlpha(),X<1&&y.setClearColor(16777215,.5),y.clear(),jt&&At.render(V);const kt=y.toneMapping;y.toneMapping=Ti;const It=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),m.setupLightsView(G),Xt===!0&&rt.setGlobalState(y.clippingPlanes,G),Yo(M,V,G),Ot.updateMultisampleRenderTarget(et),Ot.updateRenderTargetMipmap(et),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let le=0,Ie=F.length;le<Ie;le++){const ye=F[le],de=ye.object,Lt=ye.geometry,Te=ye.material,ne=ye.group;if(Te.side===qn&&de.layers.test(G.layers)){const bn=Te.side;Te.side=mn,Te.needsUpdate=!0,Lu(de,V,G,Lt,Te,ne),Te.side=bn,Te.needsUpdate=!0,Kt=!0}}Kt===!0&&(Ot.updateMultisampleRenderTarget(et),Ot.updateRenderTargetMipmap(et))}y.setRenderTarget(bt,mt,Nt),y.setClearColor(W,X),It!==void 0&&(G.viewport=It),y.toneMapping=kt}function Yo(M,F,V){const G=F.isScene===!0?F.overrideMaterial:null;for(let k=0,et=M.length;k<et;k++){const ht=M[k],bt=ht.object,mt=ht.geometry,Nt=ht.group;let kt=ht.material;kt.allowOverride===!0&&G!==null&&(kt=G),bt.layers.test(V.layers)&&Lu(bt,F,V,mt,kt,Nt)}}function Lu(M,F,V,G,k,et){M.onBeforeRender(y,F,V,G,k,et),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(y,F,V,G,M,et),k.transparent===!0&&k.side===qn&&k.forceSinglePass===!1?(k.side=mn,k.needsUpdate=!0,y.renderBufferDirect(V,F,G,k,M,et),k.side=ss,k.needsUpdate=!0,y.renderBufferDirect(V,F,G,k,M,et),k.side=qn):y.renderBufferDirect(V,F,G,k,M,et),M.onAfterRender(y,F,V,G,k,et)}function jo(M,F,V){F.isScene!==!0&&(F=wt);const G=yt.get(M),k=m.state.lights,et=m.state.shadowsArray,ht=k.state.version,bt=Y.getParameters(M,k.state,et,F,V),mt=Y.getProgramCacheKey(bt);let Nt=G.programs;G.environment=M.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(M.isMeshStandardMaterial?be:Ue).get(M.envMap||G.environment),G.envMapRotation=G.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Nt===void 0&&(M.addEventListener("dispose",$),Nt=new Map,G.programs=Nt);let kt=Nt.get(mt);if(kt!==void 0){if(G.currentProgram===kt&&G.lightsStateVersion===ht)return Uu(M,bt),kt}else bt.uniforms=Y.getUniforms(M),M.onBeforeCompile(bt,y),kt=Y.acquireProgram(bt,mt),Nt.set(mt,kt),G.uniforms=bt.uniforms;const It=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(It.clippingPlanes=rt.uniform),Uu(M,bt),G.needsLights=Xm(M),G.lightsStateVersion=ht,G.needsLights&&(It.ambientLightColor.value=k.state.ambient,It.lightProbe.value=k.state.probe,It.directionalLights.value=k.state.directional,It.directionalLightShadows.value=k.state.directionalShadow,It.spotLights.value=k.state.spot,It.spotLightShadows.value=k.state.spotShadow,It.rectAreaLights.value=k.state.rectArea,It.ltc_1.value=k.state.rectAreaLTC1,It.ltc_2.value=k.state.rectAreaLTC2,It.pointLights.value=k.state.point,It.pointLightShadows.value=k.state.pointShadow,It.hemisphereLights.value=k.state.hemi,It.directionalShadowMap.value=k.state.directionalShadowMap,It.directionalShadowMatrix.value=k.state.directionalShadowMatrix,It.spotShadowMap.value=k.state.spotShadowMap,It.spotLightMatrix.value=k.state.spotLightMatrix,It.spotLightMap.value=k.state.spotLightMap,It.pointShadowMap.value=k.state.pointShadowMap,It.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=kt,G.uniformsList=null,kt}function Du(M){if(M.uniformsList===null){const F=M.currentProgram.getUniforms();M.uniformsList=Xa.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function Uu(M,F){const V=yt.get(M);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function Gm(M,F,V,G,k){F.isScene!==!0&&(F=wt),Ot.resetTextureUnits();const et=F.fog,ht=G.isMeshStandardMaterial?F.environment:null,bt=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Dr,mt=(G.isMeshStandardMaterial?be:Ue).get(G.envMap||ht),Nt=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,kt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),It=!!V.morphAttributes.position,Kt=!!V.morphAttributes.normal,le=!!V.morphAttributes.color;let Ie=Ti;G.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ie=y.toneMapping);const ye=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,de=ye!==void 0?ye.length:0,Lt=yt.get(G),Te=m.state.lights;if(Xt===!0&&(Z===!0||M!==S)){const hn=M===S&&G.id===E;rt.setState(G,M,hn)}let ne=!1;G.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Te.state.version||Lt.outputColorSpace!==bt||k.isBatchedMesh&&Lt.batching===!1||!k.isBatchedMesh&&Lt.batching===!0||k.isBatchedMesh&&Lt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Lt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Lt.instancing===!1||!k.isInstancedMesh&&Lt.instancing===!0||k.isSkinnedMesh&&Lt.skinning===!1||!k.isSkinnedMesh&&Lt.skinning===!0||k.isInstancedMesh&&Lt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Lt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Lt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Lt.instancingMorph===!1&&k.morphTexture!==null||Lt.envMap!==mt||G.fog===!0&&Lt.fog!==et||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==rt.numPlanes||Lt.numIntersection!==rt.numIntersection)||Lt.vertexAlphas!==Nt||Lt.vertexTangents!==kt||Lt.morphTargets!==It||Lt.morphNormals!==Kt||Lt.morphColors!==le||Lt.toneMapping!==Ie||Lt.morphTargetsCount!==de)&&(ne=!0):(ne=!0,Lt.__version=G.version);let bn=Lt.currentProgram;ne===!0&&(bn=jo(G,F,k));let Xs=!1,Sn=!1,Gr=!1;const Ae=bn.getUniforms(),Ln=Lt.uniforms;if(xt.useProgram(bn.program)&&(Xs=!0,Sn=!0,Gr=!0),G.id!==E&&(E=G.id,Sn=!0),Xs||S!==M){xt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Ae.setValue(P,"projectionMatrix",M.projectionMatrix),Ae.setValue(P,"viewMatrix",M.matrixWorldInverse);const gn=Ae.map.cameraPosition;gn!==void 0&&gn.setValue(P,gt.setFromMatrixPosition(M.matrixWorld)),Dt.logarithmicDepthBuffer&&Ae.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Ae.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Sn=!0,Gr=!0)}if(k.isSkinnedMesh){Ae.setOptional(P,k,"bindMatrix"),Ae.setOptional(P,k,"bindMatrixInverse");const hn=k.skeleton;hn&&(hn.boneTexture===null&&hn.computeBoneTexture(),Ae.setValue(P,"boneTexture",hn.boneTexture,Ot))}k.isBatchedMesh&&(Ae.setOptional(P,k,"batchingTexture"),Ae.setValue(P,"batchingTexture",k._matricesTexture,Ot),Ae.setOptional(P,k,"batchingIdTexture"),Ae.setValue(P,"batchingIdTexture",k._indirectTexture,Ot),Ae.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&Ae.setValue(P,"batchingColorTexture",k._colorsTexture,Ot));const Dn=V.morphAttributes;if((Dn.position!==void 0||Dn.normal!==void 0||Dn.color!==void 0)&&nt.update(k,V,bn),(Sn||Lt.receiveShadow!==k.receiveShadow)&&(Lt.receiveShadow=k.receiveShadow,Ae.setValue(P,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ln.envMap.value=mt,Ln.flipEnvMap.value=mt.isCubeTexture&&mt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(Ln.envMapIntensity.value=F.environmentIntensity),Sn&&(Ae.setValue(P,"toneMappingExposure",y.toneMappingExposure),Lt.needsLights&&Wm(Ln,Gr),et&&G.fog===!0&&Q.refreshFogUniforms(Ln,et),Q.refreshMaterialUniforms(Ln,G,H,K,m.state.transmissionRenderTarget[M.id]),Xa.upload(P,Du(Lt),Ln,Ot)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Xa.upload(P,Du(Lt),Ln,Ot),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Ae.setValue(P,"center",k.center),Ae.setValue(P,"modelViewMatrix",k.modelViewMatrix),Ae.setValue(P,"normalMatrix",k.normalMatrix),Ae.setValue(P,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const hn=G.uniformsGroups;for(let gn=0,Fc=hn.length;gn<Fc;gn++){const us=hn[gn];Ht.update(us,bn),Ht.bind(us,bn)}}return bn}function Wm(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function Xm(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(M,F,V){const G=yt.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),yt.get(M.texture).__webglTexture=F,yt.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){const V=yt.get(M);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};const qm=P.createFramebuffer();this.setRenderTarget=function(M,F=0,V=0){L=M,w=F,R=V;let G=!0,k=null,et=!1,ht=!1;if(M){const mt=yt.get(M);if(mt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(mt.__webglFramebuffer===void 0)Ot.setupRenderTarget(M);else if(mt.__hasExternalTextures)Ot.rebindTextures(M,yt.get(M.texture).__webglTexture,yt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const It=M.depthTexture;if(mt.__boundDepthTexture!==It){if(It!==null&&yt.has(It)&&(M.width!==It.image.width||M.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(M)}}const Nt=M.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(ht=!0);const kt=yt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(kt[F])?k=kt[F][V]:k=kt[F],et=!0):M.samples>0&&Ot.useMultisampledRTT(M)===!1?k=yt.get(M).__webglMultisampledFramebuffer:Array.isArray(kt)?k=kt[V]:k=kt,C.copy(M.viewport),D.copy(M.scissor),O=M.scissorTest}else C.copy(ft).multiplyScalar(H).floor(),D.copy(Gt).multiplyScalar(H).floor(),O=Qt;if(V!==0&&(k=qm),xt.bindFramebuffer(P.FRAMEBUFFER,k)&&G&&xt.drawBuffers(M,k),xt.viewport(C),xt.scissor(D),xt.setScissorTest(O),et){const mt=yt.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,mt.__webglTexture,V)}else if(ht){const mt=F;for(let Nt=0;Nt<M.textures.length;Nt++){const kt=yt.get(M.textures[Nt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Nt,kt.__webglTexture,V,mt)}}else if(M!==null&&V!==0){const mt=yt.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,mt.__webglTexture,V)}E=-1},this.readRenderTargetPixels=function(M,F,V,G,k,et,ht,bt=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=yt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(mt=mt[ht]),mt){xt.bindFramebuffer(P.FRAMEBUFFER,mt);try{const Nt=M.textures[bt],kt=Nt.format,It=Nt.type;if(!Dt.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-G&&V>=0&&V<=M.height-k&&(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+bt),P.readPixels(F,V,G,k,Rt.convert(kt),Rt.convert(It),et))}finally{const Nt=L!==null?yt.get(L).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(M,F,V,G,k,et,ht,bt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=yt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(mt=mt[ht]),mt)if(F>=0&&F<=M.width-G&&V>=0&&V<=M.height-k){xt.bindFramebuffer(P.FRAMEBUFFER,mt);const Nt=M.textures[bt],kt=Nt.format,It=Nt.type;if(!Dt.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Kt),P.bufferData(P.PIXEL_PACK_BUFFER,et.byteLength,P.STREAM_READ),M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+bt),P.readPixels(F,V,G,k,Rt.convert(kt),Rt.convert(It),0);const le=L!==null?yt.get(L).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,le);const Ie=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Og(P,Ie,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Kt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,et),P.deleteBuffer(Kt),P.deleteSync(Ie),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,V=0){const G=Math.pow(2,-V),k=Math.floor(M.image.width*G),et=Math.floor(M.image.height*G),ht=F!==null?F.x:0,bt=F!==null?F.y:0;Ot.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,ht,bt,k,et),xt.unbindTexture()};const Ym=P.createFramebuffer(),jm=P.createFramebuffer();this.copyTextureToTexture=function(M,F,V=null,G=null,k=0,et=null){et===null&&(k!==0?(Lo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=k,k=0):et=0);let ht,bt,mt,Nt,kt,It,Kt,le,Ie;const ye=M.isCompressedTexture?M.mipmaps[et]:M.image;if(V!==null)ht=V.max.x-V.min.x,bt=V.max.y-V.min.y,mt=V.isBox3?V.max.z-V.min.z:1,Nt=V.min.x,kt=V.min.y,It=V.isBox3?V.min.z:0;else{const Dn=Math.pow(2,-k);ht=Math.floor(ye.width*Dn),bt=Math.floor(ye.height*Dn),M.isDataArrayTexture?mt=ye.depth:M.isData3DTexture?mt=Math.floor(ye.depth*Dn):mt=1,Nt=0,kt=0,It=0}G!==null?(Kt=G.x,le=G.y,Ie=G.z):(Kt=0,le=0,Ie=0);const de=Rt.convert(F.format),Lt=Rt.convert(F.type);let Te;F.isData3DTexture?(Ot.setTexture3D(F,0),Te=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ot.setTexture2DArray(F,0),Te=P.TEXTURE_2D_ARRAY):(Ot.setTexture2D(F,0),Te=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const ne=P.getParameter(P.UNPACK_ROW_LENGTH),bn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Xs=P.getParameter(P.UNPACK_SKIP_PIXELS),Sn=P.getParameter(P.UNPACK_SKIP_ROWS),Gr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ye.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ye.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Nt),P.pixelStorei(P.UNPACK_SKIP_ROWS,kt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,It);const Ae=M.isDataArrayTexture||M.isData3DTexture,Ln=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){const Dn=yt.get(M),hn=yt.get(F),gn=yt.get(Dn.__renderTarget),Fc=yt.get(hn.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,gn.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Fc.__webglFramebuffer);for(let us=0;us<mt;us++)Ae&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.get(M).__webglTexture,k,It+us),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.get(F).__webglTexture,et,Ie+us)),P.blitFramebuffer(Nt,kt,ht,bt,Kt,le,ht,bt,P.DEPTH_BUFFER_BIT,P.NEAREST);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||yt.has(M)){const Dn=yt.get(M),hn=yt.get(F);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Ym),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,jm);for(let gn=0;gn<mt;gn++)Ae?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Dn.__webglTexture,k,It+gn):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Dn.__webglTexture,k),Ln?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,hn.__webglTexture,et,Ie+gn):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,hn.__webglTexture,et),k!==0?P.blitFramebuffer(Nt,kt,ht,bt,Kt,le,ht,bt,P.COLOR_BUFFER_BIT,P.NEAREST):Ln?P.copyTexSubImage3D(Te,et,Kt,le,Ie+gn,Nt,kt,ht,bt):P.copyTexSubImage2D(Te,et,Kt,le,Nt,kt,ht,bt);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Ln?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(Te,et,Kt,le,Ie,ht,bt,mt,de,Lt,ye.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(Te,et,Kt,le,Ie,ht,bt,mt,de,ye.data):P.texSubImage3D(Te,et,Kt,le,Ie,ht,bt,mt,de,Lt,ye):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,et,Kt,le,ht,bt,de,Lt,ye.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,et,Kt,le,ye.width,ye.height,de,ye.data):P.texSubImage2D(P.TEXTURE_2D,et,Kt,le,ht,bt,de,Lt,ye);P.pixelStorei(P.UNPACK_ROW_LENGTH,ne),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,bn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Xs),P.pixelStorei(P.UNPACK_SKIP_ROWS,Sn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Gr),et===0&&F.generateMipmaps&&P.generateMipmap(Te),xt.unbindTexture()},this.initRenderTarget=function(M){yt.get(M).__webglFramebuffer===void 0&&Ot.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ot.setTextureCube(M,0):M.isData3DTexture?Ot.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ot.setTexture2DArray(M,0):Ot.setTexture2D(M,0),xt.unbindTexture()},this.resetState=function(){w=0,R=0,L=null,xt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const Ds=64,pn=32,mc=16,Uo=8,Cs=Ds*Uo,Uh=18,Xp=19,qp=47;function Yp(i,t,e=0,n=0,s="y",r=0){return i===1?t>0?[0,20,21][r]:t<0?[2,24,25][r]:[1,22,23][r]:i===2?[2,24,25][r]:i===3?[3,26,27][r]:i===5?(s==="x"?e:s==="z"?n:t)!==0?6:5:i===21?t>0?28:t<0?8:n===1?30:29:i===22?t>0?31:t<0?8:n===1?33:32:i===23?34:i===25?t===0?35:36:i===26?t===0?38:37:i>=27&&i<=29?(t>0?39:42)+i-27:i>=30&&i<=33?t>0?45:46:[0,0,2,3,4,5,7,8,9,10,11,12,13,14,15][i]??3}function lu(i,t,e){return[(i%Uo*Ds+mc+.12+t*(pn-.24))/Cs,(Math.floor(i/Uo)*Ds+mc+.12+e*(pn-.24))/Cs]}const ti=(i,t)=>(i%t+t)%t;function cM(i,t,e){const n=i;i>=20&&i<=27&&(i=[0,0,1,1,2,2,3,3][i-20],t=ti(t+(n&1?9:17),pn),i!==1&&(e=ti(e+(n&1?13:7),pn)));const s=Yt(t,e,i*877),r=Yt(Math.floor((t+3)/3),Math.floor(e/2),i*571);let o=0,c=255,a=(s-.5)*10+(r-.5)*8;const l=()=>{const f=ti(t+Math.floor(e/3)*3,9);o=r>.77?9877350:r<.19?7509594:8628059,(f<2&&e%4===1&&r>.45||s>.981)&&(o=11127158),f===3&&e%4===0&&(a-=9)},h=()=>{o=r>.82?11305046:r<.19?8938310:10056014,s>.966&&(o=13015659),t%9===Math.floor(e/3)%7&&(e+1)%5<3&&(a+=13)},u=()=>{const f=ti(2*t+e+Math.floor(e/4)*2,41);o=r>.72?10659488:r<.22?9608346:10199967,f<2&&r>.35&&(a-=19),f===2&&r>.47&&(a+=7),s>.95&&(a+=12)};switch(i){case 0:l();break;case 1:{const f=4+Math.floor(Yt(Math.floor(t/2),0,31)*4);e>=pn-f?(l(),e===pn-f&&(a-=17)):(h(),e===pn-f-1&&(a-=14));break}case 2:h();break;case 3:u();break;case 4:{o=14993811,ti(t+Math.floor(e*.6)+Math.floor(e/5)*2,17)<2&&e%4<2&&(a+=11),s>.93&&(o=12888951);break}case 5:{const f=ti(t+Math.round(Math.sin(e*.25+t*.26)*1.5),7);o=f===0?6310195:f<3?7888964:f===3?10848859:9530953,Math.abs(t-17)+Math.abs(e-8)*.65<2&&(o=5981238);break}case 6:{const f=Math.abs(t-15),d=Math.abs(e-16),p=Math.max(f*.98,d)+.2*Math.min(f,d);o=Math.min(t,e,31-t,31-e)<2?7886910:Math.floor(p)%4===0?11962711:14727035,t>19&&e===16-Math.floor((t-18)/3)&&(o=9792837);break}case 7:{const f=Yt(Math.floor(t/3),Math.floor((e+Math.floor(t/5))/2),931);o=f<.16?3373399:f<.42?5411918:f<.73?7120712:9158230,f>.82&&e%3===1&&(o=10602602),f<.16&&s<.3&&(c=0);break}case 8:{const f=Math.floor(e/8),d=ti(t+(f%2?16:0),32);o=e%8===0||d===0?9726792:e%8===7?14859649:13476203,e%8===3&&(Math.floor(t/4)+f)%3!==0&&(a-=9),d===2&&e%8===2&&(o=8021330);break}case 9:{const f=Math.floor(e/7),d=ti(t+f*5+(e%7<2?1:0),12);o=e%7===0||d===0?6846062:e%7===1||d===1?11843234:9739921;break}case 10:{const f=ti(t+Math.floor(e/8)%2*8,16);o=e%8===0||f===0?6649716:e%8===7||f===1?11647146:9149848;break}case 11:{const f=t===0||e===0||t===pn-1||e===pn-1,d=(t+e===22||t+e===25)&&t>4&&t<16;o=f?9161673:d?14811125:11328980,c=f?182:d?175:49,a=0;break}case 12:{u();for(const[f,d,p]of[[5,6,3],[16,13,4],[10,20,2],[21,3,2]])Math.abs(t-f)+Math.abs(e-d)*.85<p&&(o=e>d?5857630:4080708);break}case 13:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);o=f<2?5400165:f<4?12294239:Math.abs(d-13)<1.3?11503958:d<8?16771489:16041065;break}case 14:o=4365994,a=(r-.5)*3,(e===6||e===17)&&ti(t+2*e,19)<5&&(a+=9),c=163;break;case 15:o=r>.62?6649201:4741462;break;case 16:o=16777215,a=0;break;case Uh:case Xp:{c=0,o=6393927;for(const[f,d,p]of[[3,12,-2],[8,19,3],[15,10,2],[21,15,-3],[26,7,1]]){const v=f+Math.round(p*e/d);if(e<=d&&t===v&&(c=255,o=e<=2?5472834:7971660),i===Uh&&(f===8||f===21)){const g=Math.abs(t-(f+p))+Math.abs(e-(d+1));g<=2&&(c=255,o=g===0?15049005:f===8?16113574:15971143)}}break}case 28:case 29:case 30:{const f=Math.min(t,31-t);o=f<3||e<3||e>28?7755322:e%8===0?10186823:12819559,i===28?(t>4&&t<27&&e>4&&e<26&&(o=5599084),t>6&&t<25&&e>6&&e<24&&(t%5===2||e%5===2)&&(o=9018246),e>20&&e<23&&t>9&&t<25&&(o=14991218)):i===30?(e>12&&e<23&&t>4&&t<27&&(o=e===13||t===5?6244407:11240021),e===18&&t>12&&t<20&&(o=15780477),e<10&&f>5&&(o=5458749)):e<10&&f>4&&(o=6838334);break}case 31:case 32:case 33:{const f=t<4||t>27||e<3||e>28;o=f?5269096:e%8===2?9003332:12224336,t%24===3&&f&&e%8===4&&(o=12368525),i!==31&&e===20&&(o=5259060),i===33&&t>=13&&t<=18&&e>=13&&e<=22&&(o=t===13||e===22?16044424:11897414),i===33&&Math.abs(t-15.5)<1.5&&e>=15&&e<=17&&(o=6050110);break}case 34:{u();for(const[f,d,p]of[[8,12,6],[21,23,6],[24,6,3],[4,27,3]]){const v=Math.abs(t-f)*1.55+Math.abs(e-d);v<p+1.6&&(o=5663603),v<p&&(o=t<f?10216919:t===f?14614512:5283759)}break}case 35:case 36:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);o=f<2?3823198:f<4?12752741:f===4?4094079:7784898,f>5&&(o=d<7?15007729:d<12?11727321:Math.abs(t-15.5)<2||Math.abs(e-15.5)<2?5807259:8836557);break}case 37:case 38:{const f=Math.min(t,e,31-t,31-e),d=Math.abs(t-15.5)+Math.abs(e-15.5);o=f<1?5006441:f<3?8886418:7439751,i===37&&Math.abs(d-13)<2.1&&(o=13675380),i===37&&d<6&&(o=t<15?10999229:7584945),i===38&&(e===8||e===23)&&(o=12755305);break}case 39:case 40:case 41:{const f=i-39,d=Math.min(t,e,31-t,31-e);o=d<2?4150105:d<4?12965824:[5752740,7321057,13600220][f],d>5&&(t%4===0||e%4===0)&&(a-=9);for(let p=0;p<=f;p++){const v=e-(7+p*7),g=7-Math.abs(t-15.5);Math.abs(t-15.5)<7&&v>=g-2&&v<=g&&(o=16774596)}break}case 42:case 43:case 44:{const f=i-42,d=Math.min(t,31-t),p=[4166267,4620212,10117546][f];o=e<5||e>27?4413020:d<3?7308683:e===12||e===20?4215392:p,(d===5||d===6)&&(e===9||e===24)&&(o=13227463);break}case 45:{const f=Math.min(t,31-t),d=9-Math.abs(t-15.5);o=f<2?11631686:f<5?16770458:15643222,f>=5&&e%8===0&&(a-=15),Math.abs(t-15.5)<6&&Math.abs(e%16-d)<1.2&&(o=16772029);break}case 46:{const f=Math.min(t,31-t);o=e<=2||e>28?7622457:f<3?11565132:14064214,e%7===0&&(a-=19);break}default:o=9936274}return[(o>>>16&255)+a,(o>>>8&255)+a,(o&255)+a,c]}function lM(){const i=new Uint8ClampedArray(Cs*Cs*4),t=new Uint8ClampedArray(pn*pn*4);for(let n=0;n<qp;n++){for(let s=0;s<pn;s++)for(let r=0;r<pn;r++)t.set(cM(n,r,s),(r+pn*s)*4);for(let s=0;s<Ds;s++)for(let r=0;r<Ds;r++){const o=n%Uo*Ds+r,c=Math.floor(n/Uo)*Ds+s,a=(Math.min(31,Math.max(0,r-mc))+pn*Math.min(31,Math.max(0,s-mc)))*4;for(let l=0;l<4;l++)i[(o+Cs*c)*4+l]=t[a+l]}}const e=new Go(new Uint8Array(i.buffer),Cs,Cs);return e.colorSpace=sn,e.magFilter=Ve,e.minFilter=lo,e.generateMipmaps=!0,e.needsUpdate=!0,e}const hM=Object.freeze([Object.freeze({x:0,z:-1}),Object.freeze({x:1,z:0}),Object.freeze({x:0,z:1}),Object.freeze({x:-1,z:0})]),uM=Object.freeze({x:0,z:0});function On(i){return i>=30&&i<=33&&Number.isInteger(i)}function jp(i){return hM[i-30]??uM}function Si(i,t,e){const n=i===30?1-e:i===31?t:i===32?e:1-t;return 1-.96*Math.max(0,Math.min(1,n))}function fM(i){return i===27?3:i===28?6:i===29?10:0}const dM=[{n:[1,0,0],u:[0,0,-1],v:[0,1,0],o:[1,0,1]},{n:[-1,0,0],u:[0,0,1],v:[0,1,0],o:[0,0,0]},{n:[0,1,0],u:[1,0,0],v:[0,0,-1],o:[0,1,1]},{n:[0,-1,0],u:[1,0,0],v:[0,0,1],o:[0,0,0]},{n:[0,0,1],u:[1,0,0],v:[0,1,0],o:[0,0,1]},{n:[0,0,-1],u:[-1,0,0],v:[0,1,0],o:[1,0,0]}],hu=[[0,0],[1,0],[1,1],[0,1]],Kp=Array.from({length:qp},(i,t)=>hu.map(([e,n])=>lu(t,e,n)));function pM(i,t){return!(!i||mo(t)||i===t&&!On(i)||i===13&&t===10)}class gl{position=[];normal=[];uv=[];detail=[];indices=[];quad(t=!1,e=!1){const n=this.position.length/3-4;e?this.indices.push(n,n+1,n+3,n+1,n+2,n+3):this.indices.push(n,n+1,n+2,n,n+2,n+3),t&&this.indices.push(n+2,n+1,n,n+3,n+2,n)}finish(){if(!this.indices.length)return null;const t=new ln;return t.setAttribute("position",new Ee(this.position,3)),t.setAttribute("normal",new Ee(this.normal,3)),t.setAttribute("uv",new Ee(this.uv,2)),t.setAttribute("surface",new Ee(this.detail,3)),t.setIndex(this.indices),t.computeBoundingSphere(),t}}function mM(i,t,e,n,s,r){const o=r?Uh:Xp;for(let c=0;c<2;c++){const l=c===0?.24:-.24;for(let h=0;h<4;h++){const[u,f]=hu[h],d=u*2-1;i.position.push(t+.5+.27*d,e+f*.74,n+.5+l*d),i.normal.push(0,1,0),i.uv.push(...Kp[o][h]),i.detail.push(1,s,40+f)}i.quad(!0)}}function gM(i,t,e,n,s=1){const r=To(t,e,n),o=new gl,c=new gl,a=new gl;if(!i.occupied[r])return[null,null,null];if(i.dense[r]===4096&&t>0&&t<15&&n>0&&n<15&&[r-1,r+1,r-16,r+16,r+256,...e>0?[r-256]:[]].every(p=>i.dense[p]===4096))return[null,null,null];const l=(p,v,g)=>ji(p,v,g)?i.data[Ce(p,v,g)]:0,h=(p,v,g)=>mo(l(p,v,g))?1:0,u=t*16,f=e*16,d=n*16;for(let p=f;p<f+16;p++)for(let v=d;v<d+16;v++){let g=Ce(u,p,v);for(let m=u;m<u+16;m++,g++){const _=i.data[g];if(!_)continue;const b=_===13?c:_===10?a:o,y=On(_);let A=-1;for(const w of dM){const[R,L,E]=w.n,S=m+R,C=p+L,D=v+E;if(C<0||!pM(_,l(S,C,D)))continue;A===-1&&(A=Yt(m+p*13,v,i.salt^17));const O=_===5?i.axisAt(m,p,v):"y",W=Yp(_,L,R,E,O,Math.floor(A*3)),X=Kp[W],j=y&&L===1?_-30:W===5&&(O==="x"&&w.u[0]!==0||O==="z"&&w.u[2]!==0)?1:0,K=y&&L===1,H=K?Si(_,0,0)-Si(_,1,0):R,st=K?Si(_,0,0)-Si(_,0,1):E,ot=K?Math.hypot(H,1,st):1,ft=.94+.11*A,Gt=_===13&&l(m,p+1,v)!==13;for(let Xt=0;Xt<4;Xt++){const[Z,J]=hu[Xt],gt=w.o[0]+w.u[0]*Z+w.v[0]*J,Ut=w.o[1]+w.u[1]*Z+w.v[1]*J,wt=w.o[2]+w.u[2]*Z+w.v[2]*J,jt=y&&Ut===1?Si(_,gt,wt):Ut-(Gt&&Ut===1?.105:0);b.position.push(m+gt,p+jt,v+wt),b.normal.push(H/ot,L/ot,st/ot),b.uv.push(...X[(Xt+j)%4]);const ze=Z?1:-1,P=J?1:-1,ue=w.u[0]*ze,zt=w.u[1]*ze,Dt=w.u[2]*ze,xt=w.v[0]*P,fe=w.v[1]*P,yt=w.v[2]*P;let Ot=1;if(b===o){const Ue=h(S+ue,C+zt,D+Dt),be=h(S+xt,C+fe,D+yt),T=Ue&&be?1:h(S+ue+xt,C+zt+fe,D+Dt+yt);Ot=1-(Ue+be+T)*.103}b.detail.push(Ot,ft,_)}const Qt=b.detail.length,me=b===o&&b.detail[Qt-12]+b.detail[Qt-6]>b.detail[Qt-9]+b.detail[Qt-3];if(b.quad(_===13&&(L===1||m===0||v===0||m===Et-1||v===Et-1),me),s&&i.stage!=="flat"&&_===1&&L===1&&i.highest[m+Et*v]===p){const Xt=Yt(m>>3,v>>3,i.salt^75);Yt(m,v,i.salt^2534)<(.023+Xt*Xt*.21)*s&&mM(o,m,p+1,v,ft,Xt>.72)}}}}return[o.finish(),c.finish(),a.finish()]}const vl=(i,t,e)=>new N(i,t,e);class vM{sun={value:vl(0,1,0)};horizon={value:vl(.78,.87,.83)};zenith={value:vl(.23,.64,.8)};day={value:1};warm={value:0};linearColor=new qt;sky;clouds;constructor(t,e){const n={sun:this.sun,horizon:this.horizon,zenith:this.zenith,lightness:this.day,sunset:this.warm},s=new cn({uniforms:n,side:mn,depthWrite:!1,depthTest:!0,vertexShader:`varying vec3 direction;varying vec3 skyColor;
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
        }`});this.sky=new we(new au(270,32,16),s),this.sky.frustumCulled=!1,this.sky.renderOrder=2,t.add(this.sky);const r=new cn({uniforms:n,vertexShader:`varying float shade;varying float dist;
        void main(){vec4 pos=modelMatrix*instanceMatrix*vec4(position,1.);shade=.90+.1*normal.y;dist=length(pos.xyz-cameraPosition);
        gl_Position=projectionMatrix*viewMatrix*pos;}`,fragmentShader:`varying float shade;varying float dist;uniform float lightness,sunset;uniform vec3 horizon;
        void main(){vec3 col=mix(vec3(.085,.135,.22),vec3(.98,.968,.88),lightness)*shade;
          col=mix(col,vec3(1.,.65,.40)*shade,sunset*.64);
          gl_FragColor=vec4(mix(col,horizon,.12+.69*smoothstep(95.,260.,dist)),1.);
          #include <colorspace_fragment>
        }`}),o=66,c=4;this.clouds=new Do(new yn,r,o*c);const a=new De;for(let l=0;l<o;l++){const h=Yt(l,11,e)*480-112,u=Yt(l,12,e)*480-112,f=66+Yt(l,13,e)*17;for(let d=0;d<c;d++)a.position.set(h+d*4.6,f+Math.sin(Math.PI*d/3)*1.5,u+Yt(l,d,e)*4),a.scale.set(6+Yt(l+7,d,e)*7,1.6+Yt(l+12,d,e)*2.6,5+Yt(l+77,d,e)*7),a.updateMatrix(),this.clouds.setMatrixAt(l*c+d,a.matrix)}this.clouds.computeBoundingSphere(),t.add(this.clouds)}update(t,e,n){const s=(t-.25)*Math.PI*2;this.sun.value.set(Math.cos(s)*.8,Math.sin(s),Math.cos(s)*.6).normalize();const r=this.sun.value.y,o=si.smoothstep(r,-.27,.32),c=Math.exp(-Math.pow((r-.065)/.25,2));this.day.value=o,this.warm.value=c;const a=(l,h,u,f)=>{this.linearColor.setRGB(Math.min(1,h),Math.min(1,u),Math.min(1,f),sn),l.set(this.linearColor.r,this.linearColor.g,this.linearColor.b)};a(this.zenith.value,.095+o*.23+c*.14,.14+o*.52-c*.15,.24+o*.6-c*.13),a(this.horizon.value,.25+o*.57+c*.29,.32+o*.57-c*.13,.44+o*.45-c*.25),this.sky.position.copy(e.position),this.clouds.position.x=Math.sin(n/190)*10}dispose(t){t.remove(this.sky,this.clouds),this.sky.geometry.dispose(),this.sky.material.dispose(),this.clouds.geometry.dispose(),this.clouds.material.dispose(),this.clouds.dispose()}}function jf(i,t,e,n,s){return new cn({transparent:s,depthWrite:!s,uniforms:{...n,atlas:{value:i},columnHeights:{value:t},sun:e.sun,lightness:e.day,sunset:e.warm,horizon:e.horizon},vertexShader:`
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
      }`})}const Zp=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function $p(i,t,e,n,s){const[r,o,c]=Zp[i],a=Yp(n,o,r,c,s);if(a===5&&(s==="x"&&!r||s==="z"&&r!==0)&&([t,e]=[e,1-t]),a===45)for(let l=0;l<n-30;l++)[t,e]=[1-e,t];return lu(a,t,e)}function _M(i,t){const e=[],n=[],s=[],r=[],o=i.getAttribute("position"),c=i.getAttribute("uv");function a(h,u,f,d,p,v,g,m=0){const _=e.length/3,b=new qt(g);for(let y=0;y<o.count;y++){const A=Math.floor(y/4),[w,R,L]=Zp[A],E=.8+.15*R+.065*w+.05*L,S=o.getX(y),C=o.getY(y),D=o.getZ(y),O=On(m)&&C>0?Si(m,S+.5,D+.5)-.5:C;e.push(h+S*d,u+O*p,f+D*v);const W=c.getX(y),X=c.getY(y);n.push(...m?$p(A,W,X,m,"y"):lu(16,W,X)),s.push(b.r*E,b.g*E,b.b*E)}for(let y=0;y<i.index.count;y++)r.push(_+i.index.getX(y))}if(a(.1,-.54,.02,.57,.64,.61,3630181),a(.1,-.24,-.01,.6,.17,.62,12622438),a(.08,-.07,-.06,.52,.43,.53,11432010),a(-.16,.015,-.23,.2,.2,.33,14591349),t>=17&&t<=20){const h=t===18||t===20?9874602:13345647;a(-.08,.35,-.12,.14,1.18,.15,10052927),a(-.08,.72,-.12,.2,.16,.2,6055253),t<=18?(a(-.08,.91,-.12,.88,.2,.2,h),a(-.55,.78,-.12,.15,.27,.19,h),a(.37,.8,-.12,.15,.19,.18,h)):(a(-.19,.91,-.12,.49,.22,.22,h),a(-.44,.75,-.12,.28,.46,.23,h),a(-.53,.61,-.12,.13,.19,.24,12962741))}else t===34?(a(-.07,.16,-.19,.18,.38,.2,7948078),a(-.07,.39,-.32,.27,.2,.36,6649215),a(-.07,.43,-.57,.16,.13,.32,9543845)):t===35||t===36?(a(-.08,.36,-.14,.14,.98,.15,10446657),a(-.08,.81,-.14,.23,.23,.22,15037233),a(-.08,.94,-.14,.13,.18,.13,16761964)):t===38?(a(-.12,.38,-.27,.14,1,.14,11103553),a(-.12,.79,-.43,.12,.17,.34,12814677),a(-.12,-.07,-.43,.12,.16,.34,12814677),a(-.12,.35,-.55,.025,.96,.025,15652256)):t===37?a(-.08,.26,-.18,.17,.35,.17,14000983):t===16?a(-.06,.36,-.18,.16,1.05,.16,12620646):t===15||t===24?(a(-.1,.29,-.22,.4,.4,.36,t===24?8708039:5792095),a(-.1,.54,-.22,.22,.16,.24,t===24?13956827:7371126)):t&&a(-.11,.3,-.26,.66,.66,.66,16777215,t);const l=new ln;return l.setAttribute("position",new Ee(e,3)),l.setAttribute("uv",new Ee(n,2)),l.setAttribute("color",new Ee(s,3)),l.setIndex(r),l}function xM(){const t=new Uint8Array(1024).fill(255);function e(r,o,c,a,l,h){const u=Math.max(Math.abs(c-r),Math.abs(a-o));for(let f=0;f<=u;f++){const d=f/u,p=Math.round(r+(c-r)*d),v=Math.round(o+(a-o)*d);if(p<0||v<0||p>=32||v>=32)continue;const g=p+v*32;t[g]=Math.min(t[g],Math.round(245*(l+(h-l)*d)))}}[[[15,17],[12,19],[11,23],[7,25],[6,29],[2,32]],[[15,17],[16,13],[20,11],[19,7],[23,3],[23,0]],[[15,17],[18,18],[21,22],[26,22],[30,26],[32,27]],[[15,17],[11,15],[7,15],[6,12],[2,10],[-1,8]],[[11,23],[14,24],[15,28],[18,29]],[[20,11],[23,13],[26,11],[30,11]],[[7,15],[7,19],[4,22]],[[21,22],[19,25],[20,29]]].forEach((r,o)=>{const c=o<4?.02+o*.035:.51,a=o<4?.93:.98;for(let l=1;l<r.length;l++)e(r[l-1][0],r[l-1][1],r[l][0],r[l][1],c+(a-c)*(l-1)/(r.length-1),c+(a-c)*l/(r.length-1))});const s=new Go(t,32,32,Ho);return s.magFilter=Ve,s.minFilter=Ve,s.needsUpdate=!0,s}class yM{cube=new yn;mask=xM();hand;cracking;ghost;lastItem=-1;ghostTile="";recoil=0;phase=0;clock=0;constructor(t,e,n){this.hand=new we(new ln,new Fi({map:n,vertexColors:!0,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.hand.visible=!1,this.hand.renderOrder=12,this.hand.frustumCulled=!1,e.add(this.hand),t.add(e);const s="varying vec2 face;void main(){face=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";this.cracking=new we(this.cube,new cn({uniforms:{stages:{value:this.mask},progress:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,vertexShader:s,fragmentShader:`uniform sampler2D stages;uniform float progress;varying vec2 face;
        void main(){float crack=step(texture2D(stages,face).r,min(.985,progress));
          float lip=step(texture2D(stages,face+vec2(.03125,-.03125)).r,min(.985,progress));
          if(crack+lip<.2)discard;
          gl_FragColor=mix(vec4(.92,.74,.46,.27),vec4(.025,.031,.032,.87),crack);
          #include <colorspace_fragment>
        }`})),this.cracking.scale.setScalar(1.002),this.cracking.visible=!1,this.cracking.renderOrder=3,t.add(this.cracking);const r=this.cube.clone();r.setAttribute("plate",new Ee(new Float32Array(r.getAttribute("uv").count*2),2)),this.ghost=new we(r,new cn({uniforms:{atlas:{value:n},allowed:{value:1}},transparent:!0,depthWrite:!1,side:qn,forceSinglePass:!0,vertexShader:`attribute vec2 plate;varying vec2 uvPlate,face;varying float range;
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
        }`})),this.ghost.scale.setScalar(.993),this.ghost.visible=!1,this.ghost.renderOrder=4,t.add(this.ghost)}swing(){this.recoil=1}update(t,e,n,s,r,o,c=!0){const a=!!n&&n.active!==!1;this.hand.visible=a&&c,this.cracking.visible=a&&!!e&&n.mining>0,this.cracking.visible&&e&&n&&(this.cracking.position.set(e.x+.5,e.y+.5,e.z+.5),this.cracking.material.uniforms.progress.value=n.mining);const l=n?.preview;if(this.ghost.visible=a&&!!l&&!this.cracking.visible,l&&this.ghost.visible){this.ghost.position.set(l.x+.5,l.y+.5,l.z+.5),this.ghost.material.uniforms.allowed.value=Number(l.valid);const d=l.id+"/"+l.axis;if(d!==this.ghostTile){this.ghostTile=d;const p=this.ghost.geometry.getAttribute("uv"),v=this.ghost.geometry.getAttribute("plate"),g=this.cube.getAttribute("position"),m=this.ghost.geometry.getAttribute("position");for(let _=0;_<p.count;_++){const b=$p(_>>2,p.getX(_),p.getY(_),l.id,l.axis??"y");v.setXY(_,b[0],b[1]);const y=g.getX(_),A=g.getY(_),w=g.getZ(_);m.setXYZ(_,y,On(l.id)&&A>0?Si(l.id,y+.5,w+.5)-.5:A,w)}v.needsUpdate=!0,m.needsUpdate=!0}}if(!n||!a)return;if(this.recoil=Math.max(0,this.recoil-s*4.8),!c){this.phase=0;return}n.held!==this.lastItem&&(this.hand.geometry.dispose(),this.hand.geometry=_M(this.cube,n.held),this.lastItem=n.held),this.clock+=s,this.phase=n.mining>0?this.phase+s*16:0;const h=o?Math.max(Math.sin(this.phase*.5)**2,Math.sin(this.recoil*Math.PI)):0,u=n.moving&&o?Math.sin(this.clock*(n.sprinting?13:9))*.006:0,f=.54*Math.tan(t.fov*Math.PI/360);this.hand.position.set(f*t.aspect*.66-h*.046,-f*.8+u+h*.042,-.54-h*.045),this.hand.rotation.set(.15-h*.74,-.55+h*.15,-.31+h*.19),this.hand.scale.setScalar(.235),this.hand.material.color.setScalar(r)}dispose(){this.hand.removeFromParent(),this.hand.geometry.dispose(),this.hand.material.dispose(),this.cracking.removeFromParent(),this.cracking.material.dispose(),this.mask.dispose(),this.ghost.removeFromParent(),this.ghost.geometry.dispose(),this.ghost.material.dispose(),this.cube.dispose()}}const Ci=256,uu=96,fu=1.62,rs=1.8,rn=.3,os=.96,Nh=5,pe=1e-7,Nr=(i,t,e)=>i>=0&&i<Ci&&e>=0&&e<Ci&&t>=0&&t<uu,Rc=i=>i!==0&&i!==13,_l=(i,t,e)=>Math.min(e,Math.max(t,i));function du(i){return{...i,grounded:!1,vx:0,vy:0,vz:0,inWater:!1,flying:!1,wasJump:!1,crouched:!!i.crouched,coyote:0,jumpBuffer:0,eye:i.crouched?.79:fu,stride:0,bobOffset:0,fovOffset:0}}function gc(i){i.wasJump=!1,i.jumpBuffer=0,i.coyote=0,i.vx=0,i.vz=0,i.bobOffset=0,i.fovOffset=0}function Ws(i){return(i.eye??(i.crouched?.79:fu))+(i.bobOffset??0)}function Jp(i,t,e,n,s,r,o){const{x:c,z:a}=jp(i);return e+Si(i,s-t-c*o,r-n-a*o)}function Pi(i,t,e,n,s=rs){const r=Math.floor(t-rn+pe),o=Math.floor(t+rn-pe),c=Math.floor(e+pe),a=Math.floor(e+s-pe),l=Math.floor(n-rn+pe),h=Math.floor(n+rn-pe);if(!Nr(r,c,l)||!Nr(o,a,h))return!0;for(let u=c;u<=a;u++)for(let f=l;f<=h;f++)for(let d=r;d<=o;d++){const p=i.get(d,u,f);if(Rc(p)&&(!On(p)||e<Jp(p,d,u,f,t,n,rn-pe)-pe))return!0}return!1}function MM(i,t){return!Pi(i,t.x,t.y,t.z,t.crouched?os:rs)}function Fh(i,t,e,n){return i.get(Math.floor(t),Math.floor(e+.12),Math.floor(n))===13||i.get(Math.floor(t),Math.floor(e+1),Math.floor(n))===13}function No(i,t,e=!1){const n={yaw:Number.isFinite(t.yaw)?t.yaw:0,pitch:Number.isFinite(t.pitch)?_l(t.pitch,-1.55,1.55):0},s=(u,f,d,p=rs,v=!1)=>Number.isFinite(u)&&Number.isFinite(f)&&Number.isFinite(d)&&!Pi(i,u,f,d,p)&&(v||!Fh(i,u,f,d));if(s(t.x,t.y,t.z,t.crouched?os:rs,e))return{x:t.x,y:t.y,z:t.z,...n,...t.crouched?{crouched:!0}:{}};const r=i.spawn?.()??{x:128.5,y:60,z:128.5,...n},o=Number.isFinite(t.x)&&Number.isFinite(t.z)?t:r,c=_l(Math.floor(o.x),0,Ci-1),a=_l(Math.floor(o.z),0,Ci-1);function l(u,f){if(Nr(u,0,f))for(let d=uu-1;d>=0;d--){const p=i.get(u,d,f);if(p!==0)return p!==13&&s(u+.5,d+1,f+.5)?{x:u+.5,y:d+1,z:f+.5,...n}:void 0}}const h=l(c,a);if(h)return h;if(s(r.x,r.y,r.z))return{...r,...n};for(let u=1;u<Ci;u++)for(let f=-u;f<=u;f++){const d=l(c+f,a-u)??l(c+f,a+u);if(d)return d;if(Math.abs(f)<u){const p=l(c-u,a+f)??l(c+u,a+f);if(p)return p}}throw new Error("立てる場所が見つかりません。別のワールドかバックアップを開いてください。")}function Qp(i,t,e,n){if(!n)return!1;const s=t[e];t[e]=s+n;const r=t.crouched?os:rs;if(!Pi(i,t.x,t.y,t.z,r))return!1;if(e==="y"&&n<0){const l=vo(i,t.x,t.z,t.y-pe,s+pe);if(l)return t.y=l.y,!0}const o=e==="y"?n>0?r:0:n>0?rn:-rn,c=s+n+o,a=(n>0?Math.floor(c-pe):Math.ceil(c+pe))-o;if(e!=="y"&&Math.abs(a-s)>Math.abs(n)+pe){let l=0,h=1;for(let u=0;u<9;u++){const f=(l+h)/2;t[e]=s+n*f,Pi(i,t.x,t.y,t.z,r)?h=f:l=f}t[e]=s+n*l}else t[e]=a;return!0}function vo(i,t,e,n,s,r=rn-pe){let o=null;const c=Math.max(0,Math.ceil(n-1)),a=Math.min(uu-1,Math.floor(s)),l=Math.max(0,Math.floor(t-r)),h=Math.min(Ci-1,Math.floor(t+r)),u=Math.max(0,Math.floor(e-r)),f=Math.min(Ci-1,Math.floor(e+r));for(let d=c;d<=a;d++)for(let p=u;p<=f;p++)for(let v=l;v<=h;v++){const g=i.get(v,d,p);if(!Rc(g))continue;const m=On(g),_=m?Jp(g,v,d,p,t,e,r):d+1;_<n||_>s||(!o||_>o.y+pe||!m&&On(o.id)&&Math.abs(_-o.y)<=pe)&&(o={y:_,id:g})}return o}function xr(i,t,e,n,s=rn-pe){return vo(i,t,n,e-.002,e+.002,s)}function Kf(i,t,e,n,s,r,o){if(!n)return!1;const c=t.x+(e==="x"?n:0),a=t.z+(e==="z"?n:0);if(s&&(i.stage==="school"||i.stage==="park")){const l=i.stage==="school"?o0:M0,h=Math.sign(n)*(rn-pe),u=e==="x"?h:0,f=e==="z"?h:0,d=l(Math.floor(c+u),Math.floor(a+f)),p=l(Math.floor(c-u),Math.floor(a-f)),v=t.crouched?os:rs;if(d!==void 0&&Math.abs(d-t.y-1)<.003&&!Pi(i,c,d,a,v))return t[e]+=n,t.y=d,!1;if(d!==void 0||p!==void 0)if(xr(i,c,t.y,a))r&&(o=rn-pe);else{const m=vo(i,c,a,t.y-1.003,t.y-.997);if(m&&!Pi(i,c,m.y,a,v))return t[e]+=n,t.y=m.y,!1}}if(s){const l=Math.abs(n)+.054,h=vo(i,c,a,t.y-l,t.y+l);if(h&&(On(h.id)||On(s.id))){if(r&&!vo(i,c,a,t.y-l,t.y+l,o))return!0;if(!Pi(i,c,h.y,a,t.crouched?os:rs))return t[e]+=n,t.y=h.y,!1}}return r&&!xr(i,c,t.y,a,o)?!0:Qp(i,t,e,n)}function bM(i,t,e,n,s={}){if(!(n>0)||!Number.isFinite(n))return;const r=Math.min(n,.25),o=Math.ceil(r*100),c=r/o,a=Math.max(1,Math.hypot(e.forward,e.right)),l=e.forward/a,h=e.right/a,u=Math.sin(t.yaw),f=Math.cos(t.yaw),d=h*f-l*u,p=-h*u-l*f,v=s.sprintSpeed??0,g=Number.isFinite(v)&&v>0,m=g?v:6.4,_=g?m*.4:2;(e.jumpPressed||e.jump&&!t.wasJump)&&(t.jumpBuffer=.105);for(let b=0;b<o;b++){const y=t.x,A=t.z;t.inWater=Fh(i,t.x,t.y,t.z);const w=t.vy<=0?xr(i,y,t.y,A):null;w&&(t.y=w.y),t.crouched=!t.flying&&!t.inWater&&e.down&&(!!w||t.crouched)||t.crouched&&Pi(i,y,t.y,A);const R=t.flying?e.sprint?13:8:t.inWater?e.sprint?_:2:t.crouched?1.65:e.sprint?m:4.2;if(t.flying||t.inWater)t.vx=d*R,t.vz=p*R;else{const K=w&&On(w.id)?jp(w.id):null,H=K?t.crouched?2.4:6.4:0,st=K?R*.48:R,ot=d*st+(K?.x??0)*H-t.vx,ft=p*st+(K?.z??0)*H-t.vz,Qt=Math.min(1,(K?13:w?d||p?53:72:d||p?17:5)*c/(Math.hypot(ot,ft)||1));t.vx+=ot*Qt,t.vz+=ft*Qt}const L=!!w&&t.crouched&&!t.flying,E=L&&xr(i,y,t.y,A,.1)?.1:rn-pe,S=t.vx*c,C=t.vz*c,D=t.flying||t.inWater?null:w;if(Kf(i,t,"x",S,D,L,E)&&(t.vx=0),Kf(i,t,"z",C,D,L,E)&&(t.vz=0),w&&(t.coyote=.08),t.flying)t.coyote=t.jumpBuffer=0,t.vy=(Number(e.jump)-Number(e.down))*R;else if(t.inWater)t.coyote=t.jumpBuffer=0,t.vy=e.jump?4.9:Math.max(-2.1,t.vy-7*c);else{const K=w&&Math.abs(t.y-Math.round(t.y))<.002?fM(i.get(Math.floor(t.x),Math.round(t.y)-1,Math.floor(t.z))):0;(K||t.jumpBuffer>0&&t.coyote>0)&&(t.vy=K?Math.sqrt(48*K)+.12:8.35,t.jumpBuffer=t.coyote=0),t.vy>0||!xr(i,t.x,t.y,t.z)?t.vy=Math.max(-30,t.vy-24*c):t.vy=0}Qp(i,t,"y",t.vy*c)&&(t.vy=0),t.grounded=t.vy<=0&&!!xr(i,t.x,t.y,t.z),t.jumpBuffer=Math.max(0,t.jumpBuffer-c),t.coyote=Math.max(0,t.coyote-c);const O=Math.hypot(t.x-y,t.z-A);t.stride=(t.stride+O*4.2)%(Math.PI*2);const W=t.grounded&&!t.flying&&O>0&&s.bob!==!1?Math.sin(t.stride)*(t.crouched?.006:.021):0;t.bobOffset+=(W-t.bobOffset)*Math.min(1,18*c);const X=t.crouched?.79:fu;t.eye+=(X-t.eye)*Math.min(1,18*c),t.crouched&&t.eye>os-.07&&Pi(i,t.x,t.y,t.z,t.eye+.07)&&(t.eye=os-.07);const j=e.sprint&&!t.crouched&&O/c>4.2&&s.sprintFov!==!1?4:0;t.fovOffset+=(j-t.fovOffset)*Math.min(1,10*c)}t.inWater=Fh(i,t.x,t.y,t.z),t.wasJump=e.jump}function $n(i,t,e=Nh){if(!Number.isFinite(e)||e<0||![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=t.x,s=t.y+Ws(t),r=t.z,o=Math.cos(t.pitch),c=-Math.sin(t.yaw)*o,a=Math.sin(t.pitch),l=-Math.cos(t.yaw)*o;let h=Math.floor(n),u=Math.floor(s),f=Math.floor(r);const d=Math.sign(c),p=Math.sign(a),v=Math.sign(l),g=c?Math.abs(1/c):1/0,m=a?Math.abs(1/a):1/0,_=l?Math.abs(1/l):1/0,b=(D,O,W)=>W===0?1/0:Math.max(0,((W>0?O+1:O)-D)/W);let y=b(n,h,c),A=b(s,u,a),w=b(r,f,l),R=0,L=0,E=0,S=0;const C=Math.min(Nh,e);for(let D=0;D<=3*Math.ceil(C)+1&&S<=C&&Nr(h,u,f);D++){const O=i.get(h,u,f);if(On(O)){const K=Math.min(C,y,A,w),H=ft=>s+a*ft-u-Si(O,n+c*ft-h,r+l*ft-f),st=H(S),ot=H(K);if(st<=pe)return{x:h,y:u,z:f,id:O,nx:R,ny:L,nz:E,distance:S};if(ot<=0){const ft=S+(K-S)*st/(st-ot);return{x:h,y:u,z:f,id:O,nx:0,ny:1,nz:0,distance:ft}}}else if(Rc(O))return{x:h,y:u,z:f,id:O,nx:R,ny:L,nz:E,distance:S};R=L=E=0,S=Math.min(y,A,w);const W=y<=S+1e-10,X=A<=S+1e-10,j=w<=S+1e-10;W&&(y+=g,h+=d),X&&(A+=m,u+=p),j&&(w+=_,f+=v),W?R=-d:X?L=-p:E=-v}return null}function Wo(i,t,e,n){return t<i.x+rn-pe&&t+1>i.x-rn+pe&&n<i.z+rn-pe&&n+1>i.z-rn+pe&&e<i.y+(i.crouched?os:rs)-pe&&e+1>i.y+pe}function SM(i,t,e){if(!e||Math.abs(e.nx)+Math.abs(e.ny)+Math.abs(e.nz)!==1)return!1;const n=e.x+e.nx,s=e.y+e.ny,r=e.z+e.nz;return!Nr(n,s,r)||Rc(i.get(n,s,r))?!1:!Wo(t,n,s,r)}function tm(i,t,e){if(!e)return!1;const n=$n(i,t);return!!n&&n.x===e.x&&n.y===e.y&&n.z===e.z&&n.id===e.id&&n.nx===e.nx&&n.ny===e.ny&&n.nz===e.nz}function EM(i,t,e,n,s,r){if(!tm(i,t,r))return{ok:!1,message:"5ブロック以内の素材に照準を合わせてください。"};if(r.id===22&&i.chestAt?.(r.x,r.y,r.z)?.length)return{ok:!1,message:"先にチェストの中身を取り出してください。"};if(!te[r.id]?.block)return{ok:!1,message:"岩盤は掘れません。"};if(n==="creative")return i.set(r.x,r.y,r.z,0)?{ok:!0,message:te[r.id].name+"を取り除きました。"}:{ok:!1,message:"ここは掘れません。"};const o=Kd(e,r.id,e.hotbar[s]);return o.draft?i.set(r.x,r.y,r.z,0)?(Object.assign(e,o.draft),{ok:!0,message:o.message}):{ok:!1,message:"ここは掘れません。"}:{ok:!1,message:o.message}}function pu(i,t,e,n,s,r){const o=e.hotbar[s];if(!te[o]?.block)return"ホットバーから建材を選んでください。";if(n==="explore"&&!In(e,o))return te[o].name+"を持っていません。";if(!r)return"5ブロック以内の面に照準を合わせてください。";const c=r.x+r.nx,a=r.y+r.ny,l=r.z+r.nz;return Nr(c,a,l)?Wo(t,c,a,l)?"自分の体に重なる場所です。":SM(i,t,r)?null:"ここにはすでにブロックがあります。":"ワールドの外には置けません。"}function wM(i,t,e,n,s,r,o){const c=pu(i,t,e,n,s,r);if(c)return{ok:!1,message:c};if(!tm(i,t,r))return{ok:!1,message:"5ブロック以内の面に照準を合わせてください。"};const a=e.hotbar[s];return o!==void 0&&(a!==30||!On(o))?{ok:!1,message:"この建材の向きは変更できません。"}:i.set(r.x+r.nx,r.y+r.ny,r.z+r.nz,o??a)?(n==="explore"&&Zd(e,a),{ok:!0,message:te[a].name+"を置きました。"}):{ok:!1,message:"ここには置けません。"}}const TM=.17;function AM(i,t,e,n,s){if(t-s<0||n-s<0||t+s>=Ci||n+s>=Ci||e-s<0)return!0;for(let r=Math.floor(e-s);r<=Math.floor(e+s);r++)for(let o=Math.floor(n-s);o<=Math.floor(n+s);o++)for(let c=Math.floor(t-s);c<=Math.floor(t+s);c++){const a=i.get(c,r,o);if(a!==0&&a!==13)return!0}return!1}function Zf(i,t,e,n){const s=Math.max(1,Math.ceil(t.distanceTo(e)/.14));for(let r=1;r<=s;r++){const o=r/s;if(AM(i,t.x+(e.x-t.x)*o,t.y+(e.y-t.y)*o,t.z+(e.z-t.z)*o,n))return(r-1)/s}return 1}function em(i,t){nm(i,67+(t.fovOffset??0)),i.position.set(t.x,t.y+Ws(t),t.z),i.rotation.set(t.pitch,t.yaw,0,"YXZ")}function nm(i,t){Math.abs(t-i.fov)<=.01||(i.fov=t,i.updateProjectionMatrix())}class RM{eye=new N;raised=new N;aim=new N;screen=new N;boom=1;next=!1;reticle={x:50,y:50};reset(){this.boom=1,this.next=!1,this.reticle.x=this.reticle.y=50}update(t,e,n,s,r,o=!1){const c=Math.sin(n.yaw),a=Math.cos(n.yaw),l=Math.cos(n.pitch);this.eye.set(n.x,n.y+Ws(n),n.z);const h=s?Math.max(0,s.distance-.035):Nh;this.aim.set(n.x-c*l*h,this.eye.y+Math.sin(n.pitch)*h,n.z-a*l*h);const u=o?4.2:7.4,f=o?2.6:5.6;this.raised.set(n.x+c*u,this.eye.y+f,n.z+a*u);let d=Zf(e,this.eye,this.raised,TM);if(s&&(d=this.visibleFraction(t,e,d)),this.boom=this.next?Math.min(d,this.boom+(d-this.boom)*(1-Math.exp(-11*r))):d,this.next=!0,s&&this.boom!==d&&(this.boom=this.visibleFraction(t,e,this.boom)),t.position.lerpVectors(this.eye,this.raised,this.boom),this.boom<.23)return em(t,n),this.reticle.x=this.reticle.y=50,!1;const p=53;nm(t,p);const v=Math.min(1.65,this.boom*2.5),g=Math.atan2(n.y+1.03-t.position.y,u*this.boom+v),m=Math.atan2(this.aim.y-t.position.y,u*this.boom+l*h),_=p*Math.PI/180*.35;return t.rotation.set(Math.min(m+_,Math.max(m-_,g)),n.yaw,0,"YXZ"),t.updateMatrixWorld(),this.screen.copy(this.aim).project(t),this.reticle.x=(1+this.screen.x)*50,this.reticle.y=(1-this.screen.y)*50,!0}visibleFraction(t,e,n){for(;n>=.23&&(t.position.lerpVectors(this.eye,this.raised,n),Zf(e,t.position,this.aim,0)!==1);)n*=.61;return n}}function mu(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},c=i[0].morphTargetsRelative,a=new ln;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(c!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;a.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+h);h+=i[f].attributes.position.count}a.setIndex(u)}for(const h in r){const u=$f(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;a.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;a.morphAttributes=a.morphAttributes||{},a.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let v=0;v<o[h].length;++v)d.push(o[h][v][f]);const p=$f(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;a.morphAttributes[h].push(p)}}return a}function $f(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),c=new an(o,e,n);let a=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=a/e;for(let f=0,d=h.count;f<d;f++)for(let p=0;p<e;p++){const v=h.getComponent(f,p);c.setComponent(f+u,p,v)}}else o.set(h.array,a);a+=h.count*e}return s!==void 0&&(c.gpuType=s),c}const to=5847973,xl=9929704,Jf=16760167,yl=16771519,CM=3583139,Qf=3425640,eo=16480361,td=15972242,ed=3681102,PM=[.79,.67,1,.51,.72,.88];function Aa(i,t){const e=i.map(([s,r,o,c,a,l,h])=>{const u=new yn(c,a,l);u.translate(s,r,o);const f=new qt(h),d=new Float32Array(u.attributes.position.count*3);for(let p=0;p<d.length/3;p++){const v=PM[Math.floor(p/4)];f.multiplyScalar(v).toArray(d,p*3),f.setHex(h)}return u.setAttribute("color",new an(d,3)),u}),n=mu(e);for(const s of e)s.dispose();return new we(n,t)}class im{group=new li;body=new li;material=new Fi({vertexColors:!0,toneMapped:!1});head;arms=[];legs=[];shadow=new we(new Hr(.76,.76),new cn({transparent:!0,depthWrite:!1,vertexShader:`
        varying vec2 texel;
        void main() {
          texel = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }`,fragmentShader:`
        varying vec2 texel;
        void main() {
          float opacity = .33 * (1. - smoothstep(.09, .49, length(texel - .5)));
          gl_FragColor = vec4(.09, .13, .17, opacity);
        }`}));phase=0;idle=0;gait=0;actionPhase=0;actionBlend=0;constructor(){this.group.name="kids-avatar",this.group.visible=!1,this.group.add(this.body,this.shadow),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.012,this.shadow.renderOrder=1;const t=Aa([[0,.796,0,.39,.53,.29,Jf],[0,.57,0,.4,.095,.3,to],[0,.789,-.149,.034,.38,.015,yl],[0,1.044,.005,.39,.094,.32,eo],[-.102,.962,-.15,.087,.15,.025,eo],[0,.832,.174,.326,.385,.224,Qf],[0,.878,.237,.303,.28,.102,CM],[0,.972,.244,.303,.098,.106,7919294],[0,.849,.299,.086,.086,.025,yl],[0,.849,.315,.031,.031,.013,eo],[0,.686,.233,.22,.078,.108,2656899]],this.material);t.name="explorer-coat-and-pack",this.body.add(t),this.head=Aa([[0,.223,0,.426,.446,.405,td],[0,.27,.123,.428,.31,.158,to],[0,.446,.003,.494,.143,.451,to],[0,.534,.013,.444,.086,.417,xl],[0,.579,.026,.302,.038,.287,xl],[0,.421,-.181,.456,.056,.163,xl],[0,.498,.007,.194,.027,.125,yl],[-.102,.233,-.203,.039,.055,.011,ed],[.102,.233,-.203,.039,.055,.011,ed],[-.141,.167,-.203,.063,.018,.011,eo],[.141,.167,-.203,.063,.018,.011,eo],[0,.146,-.204,.054,.022,.011,9522272]],this.material),this.head.name="explorer-head",this.head.position.y=1.08,this.body.add(this.head);for(const e of[-1,1]){const n=Aa([[0,-.127,0,.122,.318,.182,Jf],[0,-.269,0,.126,.084,.185,to],[0,-.343,-.012,.113,.086,.129,td]],this.material);n.name="explorer-arm",n.position.set(.232*e,.969,.01),this.arms.push(n),this.body.add(n);const s=Aa([[0,-.146,.01,.158,.319,.168,Qf],[0,-.346,-.037,.173,.143,.247,to],[0,-.415,-.031,.176,.048,.251,2501193]],this.material);s.name="explorer-boot",s.position.set(.112*e,.441,.008),this.legs.push(s),this.body.add(s)}}update(t,e,n=!1,s=1,r=!1){const o=Math.min(.05,Math.max(0,e)),c=Math.hypot(t.vx,t.vz),a=!t.grounded&&!t.inWater&&!t.flying,l=t.grounded||t.inWater?Math.min(1,c/3.1):0;this.gait=si.damp(this.gait,l,17,o),this.phase=(this.phase+o*(4+Math.min(6.4,c)*1.65))%(Math.PI*2),this.idle=(this.idle+o*3)%(Math.PI*2),this.actionPhase=n?(this.actionPhase+o*20)%(Math.PI*2):0,this.actionBlend=si.damp(this.actionBlend,n?1:0,21,o);const h=Math.sin(this.phase)*this.gait,u=(.52+.35*Math.sin(this.actionPhase))*this.actionBlend;this.group.position.set(t.x,t.y,t.z),this.group.rotation.y=t.yaw,this.body.position.y=.004+(t.grounded?.028*this.gait*Math.abs(h):0)+.006*(1+Math.sin(this.idle)),this.body.scale.y=t.crouched?.54:1,this.head.rotation.x=si.clamp(t.pitch*.28,-.22,.21),this.head.rotation.z=.037*h,this.legs[0].rotation.x=r?1.08:.5*h+(a?.18:0),this.legs[1].rotation.x=r?1.08:-.5*h-(a?.21:0),this.arms[0].rotation.x=r?.4:-.49*h+(a?.24:0),this.arms[1].rotation.x=r?.4:.49*h+u+(a?.24:0),this.arms[0].rotation.z=t.flying?-.38:-.035,this.arms[1].rotation.z=t.flying?.38:.035,this.shadow.visible=t.grounded&&!t.inWater&&!t.flying;const f=si.clamp(s,0,1);this.material.color.setRGB(.58+f*.42,.66+f*.34,.8+f*.2)}dispose(){this.group.removeFromParent();for(const t of this.body.children)t instanceof we&&t.geometry.dispose();this.material.dispose(),this.shadow.geometry.dispose(),this.shadow.material.dispose()}}function IM(i,t,e,n){const s=t.position;if(Math.hypot(e.x-s.x,e.y-s.y,e.z-s.z)>28)return!1;for(const r of e.crouched?[.56,.88]:[.88,1.55]){const o=e.x,c=e.y+r,a=e.z;if(n.set(o,c,a).project(t),Math.abs(n.x)>.99||Math.abs(n.y)>.99||n.z<=-1||n.z>=1)continue;const l=Math.max(1,Math.ceil(Math.hypot(o-s.x,c-s.y,a-s.z)/.19));let h=!0;for(let u=1;u<l;u++){const f=u/l,d=i.get(Math.floor(s.x+(o-s.x)*f),Math.floor(s.y+(c-s.y)*f),Math.floor(s.z+(a-s.z)*f));if(d!==0&&d!==10&&d!==13){h=!1;break}}if(h)return!0}return!1}const LM=105,DM=.85,UM=520;function nd(i,t,e){const{pose:n,poseAt:s,sampleAgeMs:r}=t,o=Math.max(0,r??0),c={pose:n,poseAt:s,receivedAt:e,ageAtReceipt:o,vx:0,vz:0,snap:!1};if(!i)return c;const a=i.pose,l=s!==void 0&&i.poseAt!==void 0?s-i.poseAt:e-i.receivedAt,h=n.x-a.x,u=n.y-a.y,f=n.z-a.z,d=Math.hypot(h,f);return l<0||(l===0||s===void 0)&&h===0&&u===0&&f===0&&n.yaw===a.yaw&&n.moving===a.moving&&n.crouched===a.crouched&&n.flying===a.flying?i:(c.snap=l>650||d>Math.max(2.3,l*.012+.5)||Math.abs(u)>6,!c.snap&&l>=40&&l<=550&&n.moving&&Math.abs(u)<.65&&(c.vx=h*1e3/l,c.vz=f*1e3/l),c)}function sm(i,t){return i.ageAtReceipt+Math.max(0,t-i.receivedAt)}function rm(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=e.z-t.z,o=Math.ceil(Math.hypot(n,s,r)/.15);for(let c=1;c<=o;c++){const a=c/o;if(!MM(i,{x:t.x+n*a,y:t.y+s*a,z:t.z+r*a,crouched:e.crouched}))return(c-1)/o}return 1}function NM(i,t,e){const{pose:n,vx:s,vz:r}=t;if(!s&&!r)return n;const o=sm(t,e),c=Math.max(0,Math.min(1,(UM-o)/120)),a=Math.min(o,LM)/1e3,l=Math.min(a,DM/Math.hypot(s,r))*c,h={x:n.x+s*l,y:n.y,z:n.z+r*l,crouched:n.crouched},u=rm(i,n,h);return u===1?h:{...h,x:n.x+s*l*u,z:n.z+r*l*u}}function id(i){const t=document.createElement("canvas");t.width=512,t.height=96;const e=t.getContext("2d");e.font="bold 46px system-ui, sans-serif";const n=Math.min(490,Math.ceil(e.measureText(i).width)+50),s=(t.width-n)/2;e.fillStyle="#142e29eb",e.beginPath(),e.roundRect?e.roundRect(s,12,n,72,22):e.rect(s,12,n,72),e.fill(),e.strokeStyle="#eec983",e.lineWidth=3,e.stroke(),e.fillStyle="#fff6d9",e.textAlign="center",e.textBaseline="middle",e.fillText(i,256,49,n-34);const r=new x1(t);r.colorSpace=sn;const o=new f1(new Up({map:r,transparent:!0,depthWrite:!1,toneMapped:!1}));return o.scale.set(3.35,.63,1),o}class FM{constructor(t){this.scene=t}scene;actors=new Map;sample=new N;seatedPose;setPlayers(t,e=null,n){const s=new Set,r=performance.now();for(const o of t){s.add(o.id);const c=n?(n.includes(o.id)?"ケイ ":"ドロ ")+o.nickname:o.id===e?"鬼 "+o.nickname:o.nickname;let a=this.actors.get(o.id);if(a){a.caption!==c&&(this.releaseLabel(a.label),a.label=id(c),a.caption=c,a.avatar.group.add(a.label));const l=nd(a.motion,o,r);l!==a.motion&&(a.motion=l,a.snap||=l.snap)}else{const l=new im,h=id(c);l.group.visible=!0,l.group.name="online-player",l.group.add(h),this.scene.add(l.group),a={avatar:l,label:h,caption:c,body:du({...o.pose,pitch:0}),goal:o.pose,motion:nd(void 0,o,r),snap:!1},this.actors.set(o.id,a)}a.goal=o.pose}for(const[o,c]of this.actors)s.has(o)||this.release(o,c)}animate(t,e,n,s){const r=performance.now();for(const[o,c]of this.actors){const{body:a,avatar:l,label:h,motion:u}=c,f=s?u.pose:c.goal,d=this.seatedPose?.(o),p=Math.hypot(f.x-a.x,f.y-a.y,f.z-a.z)>12||!!s&&c.snap,v=p||t===0?1:1-Math.exp(-(s?24:6)*t),g=s&&!p&&t>0&&!d?NM(n,u,r):f,m={x:a.x+(g.x-a.x)*v,y:a.y+(g.y-a.y)*v,z:a.z+(g.z-a.z)*v,crouched:f.crouched},b=!!s&&!d&&!p&&rm(n,a,m)<1?f:m;a.x=b.x,a.y=b.y,a.z=b.z,c.snap=!1;const y=f.yaw-a.yaw;a.yaw+=Math.atan2(Math.sin(y),Math.cos(y))*v,a.crouched=f.crouched,a.flying=f.flying,a.grounded=!f.flying,a.vx=f.moving&&(!s||sm(u,r)<520)?3.3:0,h.position.y=f.crouched?1.23:2.02,d&&(Object.assign(a,d),a.vx=0,h.position.y=1.76),l.update(a,t,!1,e,!!d),h.visible=!s||IM(n,s,a,this.sample)}}dispose(){for(const[t,e]of this.actors)this.release(t,e)}release(t,{avatar:e,label:n}){this.releaseLabel(n),e.dispose(),this.actors.delete(t)}releaseLabel(t){t.removeFromParent(),t.material.map?.dispose(),t.material.dispose()}}const kM=[0,8629330,11041876,9608594,14663561,9861198,6528082,13080411,9608078,9084310,10344399,6647915,15975794,6932679,5857887];class zM{constructor(t,e){this.canvas=t,this.world=e;const n=t.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"high-performance"});if(!n)throw new Error("WebGL 2を利用できません。ChromeまたはEdgeの設定でグラフィック アクセラレーションを有効にして再起動してください。");this.gl=new aM({canvas:t,context:n,antialias:!1,alpha:!1}),this.gl.outputColorSpace=sn,this.gl.toneMapping=Ti,this.atlas.anisotropy=Math.min(4,this.gl.capabilities.getMaxAnisotropy()),this.gl.setClearColor(12376013),this.sky=new vM(this.scene,e.salt),this.uniforms.schoolLight.value=+(e.stage==="school");for(let r=0;r<this.heights.length;r++)this.heights[r]=Math.max(0,e.highest[r]);this.heightTexture=new Go(this.heights,256,256,Ho),this.heightTexture.magFilter=Ve,this.heightTexture.minFilter=Ve,this.heightTexture.needsUpdate=!0,this.materials=[jf(this.atlas,this.heightTexture,this.sky,this.uniforms,!1),jf(this.atlas,this.heightTexture,this.sky,this.uniforms,!0)],this.tools=new yM(this.scene,this.camera,this.atlas);const s=new yn(1.008,1.008,1.008);this.selection=new _1(new y1(s),new kp({color:16772533,toneMapped:!1})),s.dispose(),this.selection.visible=!1,this.selection.renderOrder=4,this.scene.add(this.selection),this.chips=new Do(new yn(.1,.1,.1),new Fi({color:16777215}),64),this.chips.count=0,this.chips.frustumCulled=!1,this.chips.visible=!1,this.scene.add(this.chips),this.border=this.makeBorder(),this.scene.add(this.border),this.unsubscribe=e.onEdit((r,o,c)=>{for(const h of C0(r,o,c))this.wanted.has(h)&&this.dirty.add(h);const a=r+256*c,l=Math.max(0,e.highest[a]);this.heights[a]!==l&&(this.heights[a]=l,this.heightTexture.needsUpdate=!0),this.lampDue=0})}canvas;world;scene=new h1;actors=new FM(this.scene);camera=new kn(67,1,.06,320);stats={draws:0,chunks:0,geometries:0,textures:0,fps:0,queued:0,triangles:0,chunkMs:0,rebuilt:0};gl;sky;atlas=lM();heightTexture;heights=new Uint8Array(256*256);uniforms={lampPositions:{value:Array.from({length:4},()=>new N)},lampCount:{value:0},lampColors:{value:Array.from({length:4},()=>new N)},fogEnd:{value:75},clock:{value:0},shadows:{value:1},extras:{value:1},submerged:{value:0},schoolLight:{value:0}};tools;kidsCamera=new RM;avatar;actionTime=0;materials;batches=new Map;pending=[];wanted=new Set;dirty=new Set;unsubscribe;selection;border;chips;particles=[];dummy=new De;chipColor=new qt;quality={distance:4,scale:1,shadows:!0};cx=-100;cz=-100;cy=-100;t=0;wt=0;ht=0;lampDue=0;elapsed=0;frameCount=0;totalFrames=0;lampCamera=new N(1/0,1/0,1/0);vegetation=1;visibleChunks=new Set;configure(t){const e=Math.max(2,Math.min(8,Math.round(t.distance)));e!==this.quality.distance&&(this.cx=-100);const n=t.vegetation===!1?0:t.quality==="high"?1.4:t.quality==="low"?.42:1;if(n!==this.vegetation){this.vegetation=n;for(const s of this.batches.keys())this.world.occupied[s]&&this.dirty.add(s)}this.quality={...t,distance:e,scale:Math.max(.45,Math.min(1.5,t.scale))},this.uniforms.shadows.value=t.shadows?t.quality==="high"?2:1:0,this.uniforms.extras.value=t.effects===!1?0:1,this.uniforms.fogEnd.value=(e+.45)*16,this.wt=0}makeBorder(){const t=[];for(const[r,o,c,a]of[[0,0,256,0],[256,0,256,256],[256,256,0,256],[0,256,0,0]])t.push(r,0,o,c,0,a,c,96,a,r,0,o,c,96,a,r,96,o);const e=new ln;e.setAttribute("position",new Ee(t,3));const n=new cn({side:qn,transparent:!0,depthWrite:!1,vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:`varying vec3 p;void main(){
        float limit=1.-smoothstep(1.,12.,distance(cameraPosition,p));if(limit<=0.)discard;
        vec2 grid=fract(vec2(p.x+p.z,p.y)*.5);float line=step(min(grid.x,grid.y),.022);
        gl_FragColor=vec4(.95,.79,.45,limit*(.06+.49*line));}`}),s=new we(e,n);return s.visible=!1,s}schedule(t){const e=Math.floor(t.x/16),n=Math.floor(t.z/16),s=Math.floor(t.y/16);if(e===this.cx&&n===this.cz&&s===this.cy)return;this.cx=e,this.cz=n,this.cy=s,this.wanted.clear(),this.pending.length=0;const r=this.quality.distance,o=-Math.sin(t.yaw),c=-Math.cos(t.yaw);for(let a=Math.max(0,n-r);a<=Math.min(15,n+r);a++)for(let l=Math.max(0,e-r);l<=Math.min(15,e+r);l++){const h=l-e,u=a-n,f=Math.hypot(h,u);if(f>r+.65)continue;const d=this.world.highest[l*16+8+256*(a*16+8)]>>4;for(let p=0;p<6;p++){const v=To(l,p,a);if(this.wanted.add(v),this.batches.has(v)||!this.world.occupied[v])continue;const g=h*o+u*c,m=Math.min(Math.abs(p-d)*2,Math.abs(p-s)*2);this.pending.push({key:v,priority:f*2.2+m+.2*Math.abs(p-s)-g*.55+(p+1<Math.min(s,d)?8:0)})}}this.pending.sort((a,l)=>l.priority-a.priority);for(const[a,l]of this.batches)this.wanted.has(a)||(this.removeMeshes(l),this.batches.delete(a));for(const a of this.dirty)this.wanted.has(a)||this.dirty.delete(a)}removeMeshes(t){for(const e of t)this.scene.remove(e),e.geometry.dispose()}rebuild(t){const e=this.batches.get(t);e&&this.removeMeshes(e);const n=[],s=gM(this.world,t&15,t>>>8,t>>>4&15,this.vegetation);for(let r=0;r<s.length;r++){const o=s[r];if(!o)continue;const c=new we(o,this.materials[r===0?0:1]);c.renderOrder=r===0?0:1,c.onBeforeRender=()=>{this.visibleChunks.add(t)},n.push(c),this.scene.add(c)}this.batches.set(t,n)}pump(){const t=performance.now(),e=this.totalFrames<4?8:3.5;let n=0;do{let s;if(this.dirty.size)s=this.dirty.values().next().value,this.dirty.delete(s);else if(this.pending.length){if(s=this.pending.pop().key,this.batches.has(s))continue}else break;this.rebuild(s),n++}while(n<9&&performance.now()-t<e);this.stats.chunkMs=n?performance.now()-t:0,this.stats.rebuilt=n}lamps(t){const e=[];for(const n of this.world.lamps){const s=(n&255)+.5,r=(n>>>16)+.5,o=(n>>>8&255)+.5,c=(s-t.x)**2+(o-t.z)**2+(r-t.y)**2;c>676||e.length===4&&c>=e[3].d||(e.push({key:n,d:c}),e.sort((a,l)=>a.d-l.d),e.length>4&&e.pop())}this.uniforms.lampCount.value=e.length,e.forEach(({key:n},s)=>{this.uniforms.lampPositions.value[s].set((n&255)+.5,(n>>>16)+.5,(n>>>8&255)+.5);const r=this.world.data[n]===25;this.uniforms.lampColors.value[s].set(r?.36:1.86,r?1.57:1.09,r?1.4:.43)})}effect(t,e,n,s,r="mine"){this.tools.swing(),this.actionTime=.26;const o=this.quality.effects===!1?0:r==="place"?3:7;for(let c=0;c<o;c++)this.particles.length>=64&&this.particles.shift(),this.particles.push({x:t+.5+(Math.random()-.5)*.65,y:e+.55+Math.random()*.38,z:n+.5+(Math.random()-.5)*.65,vx:(Math.random()-.5)*2.1,vy:1+Math.random()*1.7,vz:(Math.random()-.5)*2.1,life:.32+Math.random()*.17,id:s})}updateParticles(t){for(let e=this.particles.length-1;e>=0;e--){const n=this.particles[e];if(n.life-=t,n.life<=0){this.particles.splice(e,1);continue}n.vy-=8*t,n.x+=n.vx*t,n.y+=n.vy*t,n.z+=n.vz*t}this.chips.count=this.particles.length,this.chips.visible=this.chips.count>0;for(let e=0;e<this.chips.count;e++){const n=this.particles[e];this.dummy.position.set(n.x,n.y,n.z),this.dummy.rotation.set(n.life*4,e+n.life*5,e*.8),this.dummy.scale.setScalar(Math.min(1,n.life*5)),this.dummy.updateMatrix(),this.chips.setMatrixAt(e,this.dummy.matrix),this.chips.setColorAt(e,this.chipColor.setHex(kM[n.id]??(n.id===23||n.id===25||n.id===26?9554109:11837559)))}this.chips.count&&(this.chips.instanceMatrix.needsUpdate=!0,this.chips.instanceColor&&(this.chips.instanceColor.needsUpdate=!0))}update(t,e,n,s,r,o,c=!1){const a=Math.max(1,this.canvas.clientWidth),l=Math.max(1,this.canvas.clientHeight);if(a!==this.wt||l!==this.ht){this.wt=a,this.ht=l;const v=Math.min(window.devicePixelRatio||1,1.5),g=this.quality.quality==="standard"||this.quality.quality==="high"?2073600:12e5,m=Math.sqrt(g/(a*l));this.gl.setPixelRatio(Math.min(v,m)*this.quality.scale),this.gl.setSize(a,l,!1),this.camera.aspect=a/l,this.camera.updateProjectionMatrix()}this.t+=s,this.uniforms.clock.value=this.t;const h=Ws(t),u=o?this.kidsCamera.update(this.camera,this.world,o.player,o.hit,s,this.world.stage==="school"):!1;o||em(this.camera,t),this.sky.update(n,this.camera,this.t),c&&this.camera.updateMatrixWorld(),this.actors.animate(s,.52+.48*this.sky.day.value,this.world,c?this.camera:void 0),this.actionTime=Math.max(0,this.actionTime-s),u&&o&&(this.avatar||(this.avatar=new im,this.scene.add(this.avatar.group)),this.avatar.update(o.player,s,this.actionTime>0||!!r?.mining,.52+.48*this.sky.day.value,o.seated)),this.avatar&&(this.avatar.group.visible=u),this.selection.visible=!!e,e&&this.selection.position.set(e.x+.5,e.y+.5,e.z+.5);const f=this.camera.position;this.uniforms.submerged.value=+(this.world.get(Math.floor(f.x),Math.floor(f.y),Math.floor(f.z))===13),this.border.visible=Math.min(t.x,t.z,256-t.x,256-t.z)<12,this.schedule(t),this.pump(),this.lampDue-=s,(this.lampDue<=0||this.lampCamera.distanceToSquared(this.camera.position)>4)&&(this.lamps(t),this.lampDue=.23,this.lampCamera.copy(this.camera.position)),this.updateParticles(s);const d=this.world.highest[(t.x|0)+(t.z|0)*256]>t.y+h+1.5;this.tools.update(this.camera,e,r,s,(d?.57:.7)+this.sky.day.value*(d?.13:.3),this.uniforms.extras.value>0,!u),this.visibleChunks.clear(),this.gl.render(this.scene,this.camera);const p=this.gl.info;this.stats.draws=p.render.calls,this.stats.triangles=p.render.triangles,this.stats.geometries=p.memory.geometries,this.stats.chunks=this.visibleChunks.size,this.stats.textures=p.memory.textures,this.stats.queued=this.pending.length+this.dirty.size,this.totalFrames++,this.frameCount++,this.elapsed+=s,this.elapsed>=.6&&(this.stats.fps=Math.round(this.frameCount/this.elapsed),this.frameCount=0,this.elapsed=0)}dispose(){this.unsubscribe(),this.actors.dispose(),this.avatar?.dispose();for(const t of this.batches.values())this.removeMeshes(t);this.batches.clear(),this.dirty.clear(),this.wanted.clear(),this.pending.length=0,this.selection.geometry.dispose(),this.selection.material.dispose(),this.border.geometry.dispose(),this.border.material.dispose(),this.chips.geometry.dispose(),this.chips.material.dispose(),this.chips.dispose(),this.sky.dispose(this.scene),this.materials.forEach(t=>t.dispose()),this.tools.dispose(),this.atlas.dispose(),this.heightTexture.dispose(),this.scene.clear(),this.gl.dispose()}}const Cc=[{id:"classic",name:"森と湖",detail:"森や洞窟を探検できる、にぎやかなワールド。",thumbnail:"./art/stage-classic.webp"},{id:"flat",name:"まっさらな平地",detail:"木や建物のない草原。自由な建築に。",thumbnail:"./art/stage-flat.webp"},{id:"lake",name:"湖だけ",detail:"小さな砂島から出発。湖の中で魚に出会えます。",thumbnail:"./art/stage-lake.webp"},{id:"school",name:"学校",detail:"教室や階段に隠れ、廊下を回り込んで逃げよう。",thumbnail:"./art/stage-school.webp"},{id:"frontier",name:"西部の町",detail:"荒野と湖に囲まれた町。家を建て、保安官と町を守ろう。",thumbnail:"./art/stage-frontier.webp"},{id:"park",name:"みどりの大公園",detail:"大滑り台、ブランコ、巨大アスレチック、4人乗りシーソー。",thumbnail:"./art/stage-park.webp"},{id:"crossing",name:"渋谷スクランブル",detail:"大きな交差点と路地。広場からビルの間へ逃げ込もう。",thumbnail:"./art/stage-crossing.webp"}];function ts(i){return Cc.some(t=>t.id===i)}function _o(i,t){return i==="cops"?t==="park"||t==="crossing":i==="tag"&&(t==="flat"||t==="school")}const sd=i=>i==="tag"||i==="cops"||i==="explore"?i:"creative",Ms=i=>i==="tag"||i==="cops",OM=i=>i==="cops"?"CPUを加えると1人でも遊べます。CPUが2人以上なら、両チームにCPUが入ります。合計6人まで。":"CPUを加えると、プレイヤー1人でも対戦を始められます。合計6人まで。",rd=(i,t)=>_o(i,t)?OM(i):i==="cops"?"CPUは「みどりの大公園」と「渋谷スクランブル」で追加できます。":"CPUは「まっさらな平地」と「学校」で追加できます。",Ml=[1,3,5,10,15],bl=5,BM={classic:"森や丘、洞窟と湖が広がる地形。",flat:"見晴らしのよい、木や建物のない草原。",lake:"小さな砂島と、その周りに広がる大きな湖。"};function HM(i,t,e,n){const s=t==="creative";function r(a){const l=te[a];return l?{id:a,name:l.name,count:s?1/0:Cr(i,a),durability:s?void 0:In(i,a)?.durability,maxDurability:l.maxDurability}:null}const o=s?Object.keys(te).map(Number).filter(a=>te[a].block&&bc(a)===a||n.frontier&&zo(a)).map(r).filter(a=>!!a):i.slots.map(a=>({id:a.id,name:te[a.id].name,count:a.count,durability:a.durability,maxDurability:te[a.id].maxDurability})),c=s?[]:Hd.filter(a=>(!a.legacy||n.generator===1)&&(!a.frontier||n.frontier)).map(a=>({id:a.id,name:a.name,itemId:a.output.id,ingredients:a.inputs.map(l=>te[l.id].name+" "+Cr(i,l.id)+"/"+l.count).join(" ・ "),outputs:te[a.output.id].name+" ×"+a.output.count,craftable:Km(i,a,n),reason:Kh(i,a,n),equipment:jd(a,n.generator)?"作業台":"手作り"}));return{items:o,bar:i.hotbar.map(r),recipes:c,mode:t,selected:e,frontier:n.frontier}}const Me=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Sl=i=>i==="creative"?"クリエイティブ":"探索",od={lock:{name:"マウス固定",label:"視点を固定してプレイ"},drag:{name:"ドラッグ操作",label:"ドラッグ操作でプレイ"},tablet:{name:"タブレットモード",label:"タブレットモードでプレイ"}},Mt=i=>document.getElementById(i),Se=(i,t,e="")=>'<button type="button" class="'+e+'" data-action="'+i+'">'+t+"</button>",VM=()=>Se("back",'<span aria-hidden="true">‹</span> 戻る',"back"),bs=i=>'<header class="panel-head"><h1>'+i+"</h1>"+VM()+"</header>",GM=i=>Cc.find(t=>t.id===i)?.name??"";function ad(i,t=!1){return'<fieldset class="stage-picker"><legend>ステージ</legend><div class="stage-grid">'+Cc.map(({id:n,name:s,detail:r,thumbnail:o})=>'<label class="stage-card"><input type="radio" name="stage" value="'+n+'"'+(n===i?" checked":"")+'><img src="'+Me(new URL(o,document.baseURI).href)+'" width="560" height="315" alt="" draggable="false"><span><b>'+s+"</b><small>"+(t?BM[n]??r:r)+"</small></span></label>").join("")+"</div></fieldset>"}const El=i=>Number.isFinite(i)?String(i):"∞",cd=new Map,ld={17:"石や鉱石を素早く掘り、潮晶を採取",18:"石や鉱石をさらに速く掘り、潮晶を採取",19:"原木・木材の採掘を短縮",20:"原木・木材をさらに速く採掘",27:"約3ブロック跳び上がる",28:"約6ブロック跳び上がる",29:"約10ブロック跳び上がる",30:"1ブロックずつ高さを変えてつなぐ"};function WM(i){const t=cd.get(i);if(t)return t;const e=document.createElement("canvas");e.width=e.height=32;const n=e.getContext("2d");if(!n)return"";const s=(c,a)=>{n.fillStyle=c,n.beginPath(),n.moveTo(a[0][0],a[0][1]);for(const[l,h]of a.slice(1))n.lineTo(l,h);n.closePath(),n.fill()},r={1:["#86bc59","#916742","#705637"],2:["#bf9165","#9b704c","#77563d"],3:["#b4bac1","#828e98","#646d79"],4:["#f1d9a0","#ccb17e","#b79565"],5:["#d1ad75","#926645","#684630"],6:["#71ac63","#538959","#386c47"],7:["#e6ba82","#bf8c53","#9d7044"],8:["#b4b7b4","#8e9392","#6f797a"],9:["#b9bfc5","#89939e","#647483"],10:["#d8f3f0","#8db8bf","#69a7ae"],11:["#a0aaa9","#7b8486","#69777a"],12:["#ffe3a2","#eeb756","#bf893c"],21:["#eac98f","#a97651","#755040"],22:["#e2ac58","#aa793c","#876137"],23:["#9fc6bd","#689a96","#536f79"],25:["#c2fff1","#6dc7c7","#5aafaf"],26:["#a1c8c1","#668c89","#4e7176"],27:["#66d6a9","#338775","#266259"],28:["#7fc9ee","#4e88b8","#325e96"],29:["#d897e5","#9a67ad","#765183"]};if(r[i]){const c=r[i];s(c[1],[[2,9],[16,16],[16,31],[2,24]]),s(c[2],[[16,16],[30,9],[30,24],[16,31]]),s(c[0],[[2,9],[16,2],[30,9],[16,16]]);const a=(l,h,u,f,d)=>{n.strokeStyle=l,n.lineWidth=1.2,n.beginPath(),n.moveTo(h,u),n.lineTo(f,d),n.stroke()};if(i>=27&&i<=29)for(let l=0;l<i-26;l++){const h=14+l*4;s("#fff4c8",[[6,h+3],[9,h],[12,h+3],[12,h+5],[9,h+3],[6,h+5]])}if((i===22||i===21)&&(a("#573b34",3,15,16,22),a("#543c34",16,22,29,15),n.fillStyle="#ffe2a0",n.fillRect(9,16,3,5)),[23,25,26].includes(i)&&s("#c7fff1",[[6,15],[9,14],[12,20],[9,23]]),i===1&&(s("#6b9e4c",[[2,9],[16,16],[16,19],[11,17],[10,19],[8,15],[6,16],[2,13]]),s("#598340",[[16,16],[30,9],[30,12],[26,15],[23,15],[21,18],[16,19]])),[7,9,12].includes(i)){for(const l of[14,19])a("#533f3970",2,l,16,l+7),a("#493c4266",16,l+7,30,l);i===9&&(a("#56646b",8,12,8,17),a("#53616c",12,19,12,24))}else if(i===5){for(const l of[5,9,13])a("#5e422f",l,10+(l-2)/2,l,23+(l-2)/2);s("#99784c",[[8,9],[16,5],[24,9],[16,13]]),s("#d2ab76",[[11,9],[16,7],[21,9],[16,11]])}else if(i===10)a("#e0ffff",4,13,9,22),a("#c3eeee",18,17,22,23);else{n.fillStyle=i===11?"#35434a":"#ffffff38";for(const[l,h]of[[5,13],[9,19],[12,16],[19,21],[25,15],[16,7]])n.fillRect(l,h,i===11?3:2,i===11?3:1)}}else if(i===30)s("#9d6642",[[3,12],[16,5],[16,24],[3,29]]),s("#c88946",[[3,12],[16,5],[29,12],[16,28],[3,29]]),s("#f5ca70",[[3,12],[16,5],[29,12],[16,28]]),s("#e5f2ca",[[5,12],[9,10],[19,25],[16,28]]),s("#e5f2ca",[[14,6],[16,5],[29,12],[27,15]]);else if(i===34)s("#45362c",[[7,15],[15,14],[13,26],[6,29],[4,26]]),s("#4b5b63",[[6,10],[28,10],[28,15],[17,15],[14,19],[6,18]]),s("#b9ced1",[[8,9],[29,9],[29,12],[8,12]]);else if(i===35||i===36)s("#bc834b",[[6,29],[2,25],[19,8],[23,12]]),s("#e45631",[[15,13],[16,6],[25,2],[23,8],[29,7],[25,15],[19,18]]),s("#ffd681",[[17,14],[20,8],[24,7],[23,13],[20,16]]);else if(i===37)s("#5c4428",[[4,24],[11,6],[16,7],[11,27],[7,29]]),s("#e1ad54",[[13,27],[20,7],[25,8],[21,28],[17,30]]);else if(i===38)s("#a4643a",[[6,5],[14,2],[22,7],[27,15],[23,25],[15,30],[8,28],[17,25],[22,16],[18,8]]),s("#e9d8b8",[[6,5],[8,28],[10,28],[8,5]]);else if(i===24)s("#438c9a",[[7,16],[17,2],[25,13],[17,30],[10,26]]),s("#a6fff0",[[7,16],[17,2],[15,18],[10,26]]),s("#74ddd4",[[15,18],[17,2],[23,13]]);else if(i===15)s("#25323d",[[4,17],[9,8],[20,5],[28,12],[25,23],[14,27],[6,24]]),s("#53626c",[[5,16],[11,9],[20,7],[18,14],[10,20]]),s("#36454d",[[12,23],[19,16],[25,14],[24,21],[15,25]]);else if(s("#754e34",[[5,27],[8,29],[25,8],[22,5]]),s("#ca965f",[[5,25],[7,27],[24,6],[22,4]]),i>=17){const c=i===18||i===20,a=c?"#c3ccd0":"#e5c195",l=c?"#869398":"#b78a59";i<=18?(s(l,[[11,4],[17,3],[26,10],[29,16],[27,17],[23,12],[16,7],[10,7]]),s(a,[[9,4],[16,2],[23,5],[27,10],[25,12],[21,8],[15,5],[9,6]])):(s(l,[[17,5],[23,6],[28,10],[26,17],[19,17],[15,12]]),s(a,[[15,4],[22,4],[27,8],[24,14],[19,15],[13,10]]))}const o=e.toDataURL();return cd.set(i,o),o}function no(i){return'<img class="stamp" src="'+WM(i)+'" alt="" draggable="false">'}class XM{constructor(t){this.send=t;const e=new URL(location.href),n=e.pathname.indexOf("/webcraft777/");this.portal=n<0?"../index.html":e.pathname.slice(0,n+1)+"index.html",Mt("game").style.setProperty("--cover",'url("'+new URL("./art/panorama.webp",document.baseURI).href+'")'),Mt("game").addEventListener("click",s=>this.click(s)),this.panel.addEventListener("submit",s=>this.submit(s)),this.panel.addEventListener("change",s=>this.change(s)),this.panel.addEventListener("input",s=>this.settingOutput(s.target)),Mt("fallback").addEventListener("keydown",s=>{s.target.closest("[data-hold]")&&["Enter"," "].includes(s.key)&&(s.preventDefault(),this.startMining())}),Mt("fallback").addEventListener("keyup",()=>this.stopMining()),Mt("view-mode").addEventListener("keydown",s=>{s.code==="Space"&&s.stopPropagation()})}send;screen="title";panel=Mt("overlay");guideSeen=!1;guideTimer=0;inventoryState=null;noticeTimer=0;saveTimer=0;holding=!1;worldName="";kidsView=!1;room=null;onlineDraft={name:"みんなの建築ワールド",seed:"",nickname:"",code:"",mode:"creative",stage:"classic",stageChosen:!1,tagMinutes:bl,tagBots:0};portal;startMining(){this.holding||(this.holding=!0,this.send("mine-down"))}stopMining(){this.holding&&(this.holding=!1,this.send("mine-up"))}show(t,e,n=!1){this.stopMining(),window.clearTimeout(this.guideTimer);const s=["pause","ready","inventory","diagnostics","tag-result"].includes(t)||["settings","help"].includes(t)&&!Mt("game").classList.contains("home");["title","create","worlds","online","error"].includes(t)?Mt("game").classList.add("home"):s&&Mt("game").classList.remove("home"),this.screen=t,Mt("game").dataset.screen=t,this.panel.hidden=!1,this.panel.className="overlay "+(t==="title"?"title-overlay":"panel-overlay"),this.panel.innerHTML=t==="title"?e:'<div class="panel'+(n?" wide":"")+'">'+e+"</div>",Mt("hud").hidden=!0,Mt("debug").hidden=!0,this.mining(0),this.panel.scrollTop=0}click(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(n==="view-mode"&&e.id==="view-mode"&&t.detail>0&&Mt("scene").focus({preventScroll:!0}),n==="select"){this.send(n,Number(e.dataset.slot));return}const s=Number(e.dataset.index),r=e.dataset.side??"bag";if(n==="assign"){if(t.shiftKey&&(this.inventoryState?.mode==="explore"||this.inventoryState?.chest)){const o=this.inventoryState.chest!==void 0;this.send(o?"transfer":"split",{side:r,index:s,half:!1})}else this.send(n,{id:Number(e.dataset.id),slot:this.inventoryState?.selected??0});return}if(["split","sort","transfer","transfer-all"].includes(n)){this.send(n,{index:s,side:r,half:e.dataset.half==="yes"});return}if(n==="supply"){this.send(n,{id:Number(e.dataset.id),count:t.shiftKey?64:1});return}if(n==="craft"){this.send(n,{id:e.dataset.id,count:Number(e.dataset.count??1)});return}if(["load","export","original","preset"].includes(n)){this.send(n,e.dataset.id);return}if(n==="dismiss-guide"){Mt("guide").hidden=!0,this.guideSeen=!0,this.send(n);return}this.send(n)}submit(t){t.preventDefault();const e=t.target;if(e.id==="online-create-form"||e.id==="online-join-form"){const c=new FormData(e),a=String(c.get("nickname")??"").trim();if(this.onlineDraft.nickname=a,!a){this.toast("プレイヤー名を入力してください。"),e.querySelector("input")?.focus();return}if(e.id==="online-create-form"){const l=String(c.get("name")??"").trim(),h=String(c.get("seed")??"").trim(),u=sd(c.get("mode")),f=c.get("stage"),d=ts(f)?f:u==="cops"?"park":"classic",p=Number(c.get("tagMinutes")),v=Ml.find(_=>_===p)??bl,g=Number(c.get("tagBots")),m=_o(u,d)&&Number.isInteger(g)&&g>=0&&g<=4?g:0;if(Object.assign(this.onlineDraft,{name:l,seed:h,mode:u,stage:d,stageChosen:!0,...Ms(u)?{tagMinutes:v,tagBots:m}:{}}),!l){this.toast("ワールド名を入力してください。"),e.querySelector('[name="name"]')?.focus();return}this.send("online-create",{name:l,seed:h,nickname:a,mode:u,stage:d,...Ms(u)?{tagMinutes:v,...m?{tagBots:m}:{}}:{}})}else{const l=String(c.get("code")??"").trim().toUpperCase();this.onlineDraft.code=l,this.send("online-join",{code:l,nickname:a})}return}if(e.id!=="world-form")return;const n=new FormData(e),s=String(n.get("name")??"").trim();if(!s){this.toast("ワールド名を入力してください。"),e.querySelector("input")?.focus();return}const r=n.get("stage"),o=ts(r)?r:"classic";this.send("start",{name:s,seed:String(n.get("seed")??"").trim(),mode:n.get("mode")==="creative"?"creative":"explore",stage:o})}change(t){const e=t.target;if(e instanceof HTMLSelectElement&&e.id==="tag-minutes"){this.onlineDraft.tagMinutes=Ml.find(n=>n===Number(e.value))??bl;return}if(e instanceof HTMLSelectElement&&e.id==="tag-bots"){this.onlineDraft.tagBots=Number(e.value);return}if(e instanceof HTMLInputElement){if(e.name==="stage"&&e.form?.id==="online-create-form"&&e.checked&&ts(e.value)){this.onlineDraft.stage=e.value,this.onlineDraft.stageChosen=!0,this.updateBotSelector();return}if(e.name==="mode"&&e.form?.id==="online-create-form"&&e.checked){const n=sd(e.value);if(this.onlineDraft.mode=n,Mt("tag-time-option").hidden=Mt("tag-minutes").disabled=!Ms(n),!this.onlineDraft.stageChosen){const s=n==="cops"?"park":"classic";this.onlineDraft.stage=s,e.form.querySelector('input[name="stage"][value="'+s+'"]').checked=!0}this.updateBotSelector();return}if(e.id==="world-import"){const n=e.files?.[0];n&&this.send("import",n),e.value="";return}if(e.closest("#setting-form")){const n=new FormData(Mt("setting-form"));this.send("settings-change",{distance:Number(n.get("distance")),scale:Number(n.get("scale")),shadows:n.has("shadows"),sensitivity:Number(n.get("sensitivity")),volume:Number(n.get("volume")),muted:n.has("muted"),quality:n.get("quality"),vegetation:n.has("vegetation"),effects:n.has("effects"),invertY:n.has("invertY"),bob:n.has("bob"),sprintFov:n.has("sprintFov"),ambientVolume:Number(n.get("ambientVolume")),effectsVolume:Number(n.get("effectsVolume"))})}}}updateBotSelector(){const{mode:t,stage:e,tagBots:n}=this.onlineDraft,s=Mt("tag-bots");Mt("tag-bot-option").hidden=!Ms(t),s.disabled=!_o(t,e),s.value=String(s.disabled?0:n),Mt("tag-bot-help").textContent=rd(t,e)}settingOutput(t){if(!(t instanceof HTMLInputElement)||t.type!=="range")return;const e=t.parentElement?.querySelector("output");e&&(e.textContent=this.valueLabel(t.name,Number(t.value)))}valueLabel(t,e){return t==="distance"?e+" チャンク":t==="sensitivity"?e.toFixed(1)+" 倍":Math.round(e*100)+"%"}setWorld(t){this.worldName=t}title(t){this.worldName="",this.onlineSession(null),this.tagMode(null);const e='<a class="portal" href="'+Me(this.portal)+'"><span aria-hidden="true">‹</span> TK777 ARCADE</a>';this.show("title",'<div class="title-stage">'+e+'<div class="title-main"><h1 aria-label="ウェブクラフト777"><span>ウェブクラフト</span><strong>777</strong></h1><div class="start-actions">'+Se("goto-create",'<span>新しく始める</span><b aria-hidden="true">＋</b>',"primary")+Se("goto-worlds",'<span>つづきから</span><b aria-hidden="true">›</b>')+Se("online-menu","<span>マルチプレイ</span><small>最大6人</small>")+'</div><div class="title-sub">'+Se("goto-settings","設定")+Se("goto-help","操作説明")+"</div></div></div>"),this.panel.querySelector('[data-action="goto-worlds"]')?.setAttribute("title",t?"保存したワールドを開く":"ワールド一覧とバックアップの読み込み")}create(){this.show("create",bs("ワールドを作る")+'<form id="world-form">'+ad("classic")+'<div class="stage-fields"><label class="entry">ワールド名<input name="name" value="はじまりの谷" required maxlength="64" autocomplete="off"></label><label class="entry">地形のシード<input name="seed" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label></div><fieldset><legend>ゲームモード</legend><div class="modes"><label><input type="radio" name="mode" value="explore" checked><span><b>探索</b><small>木や石を集め、道具と建材を作る。</small></span></label><label><input type="radio" name="mode" value="creative"><span><b>クリエイティブ</b><small>素材は無制限。空を飛んで建築する。</small></span></label></div></fieldset><button type="submit" class="primary full">ワールドを作成</button></form>',!0)}onlineMenu(t="",e=""){t&&(this.onlineDraft.code=t.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8));const n=this.onlineDraft,s='<label class="entry">プレイヤー名<input name="nickname" value="'+Me(n.nickname)+'" placeholder="ワールド内に表示される名前" maxlength="24" required autocomplete="nickname"></label>',r=[["creative","建材を自由に使って建築する。"],["explore","素材を集めて道具や建材を作る。"],["tag","仲間と追いかけっこをする。"],["cops","ケイは確保、ドロは仲間を救出。"]].map(([u,f])=>'<label><input type="radio" name="mode" value="'+u+'"'+(n.mode===u?" checked":"")+"><span><b>"+(u==="cops"?"ドロケイ":u==="tag"?"鬼ごっこ":Sl(u))+"</b><small>"+f+"</small></span></label>").join(""),o='<div id="tag-time-option" class="entry"'+(Ms(n.mode)?"":" hidden")+'><label for="tag-minutes">制限時間</label><select name="tagMinutes" id="tag-minutes" aria-describedby="tag-time-help"'+(Ms(n.mode)?"":" disabled")+">"+Ml.map(u=>'<option value="'+u+'"'+(n.tagMinutes===u?" selected":"")+">"+u+"分</option>").join("")+'</select><small id="tag-time-help">隠れる時間が終わると制限時間が進みます。</small></div>',c=_o(n.mode,n.stage),a='<div id="tag-bot-option" class="entry"'+(Ms(n.mode)?"":" hidden")+'><label for="tag-bots">CPUの人数</label><select id="tag-bots" name="tagBots" aria-describedby="tag-bot-help"'+(c?"":" disabled")+">"+[0,1,2,3,4].map(u=>'<option value="'+u+'"'+((c?n.tagBots:0)===u?" selected":"")+">"+u+"人</option>").join("")+'</select><small id="tag-bot-help">'+rd(n.mode,n.stage)+"</small></div>",l='<form id="online-create-form" class="online-card" aria-labelledby="online-create-label"><h2 id="online-create-label">ルームを作る</h2>'+s+'<label class="entry">ワールド名<input name="name" value="'+Me(n.name)+'" required maxlength="64" autocomplete="off"></label><label class="entry"><span>地形のシード <small>任意</small></span><input name="seed" value="'+Me(n.seed)+'" placeholder="空欄ならランダム" maxlength="128" autocomplete="off"></label><fieldset class="online-room-modes"><legend>ゲームモード</legend><div class="modes">'+r+"</div></fieldset>"+ad(n.stage,!0)+o+a+'<button type="submit" class="primary full">ルームを作成</button></form>',h='<form id="online-join-form" class="online-card" aria-labelledby="online-join-label"><h2 id="online-join-label">ルームに参加する</h2>'+s+'<label class="entry">ルームコード<input id="online-code" name="code" value="'+Me(n.code)+'" placeholder="8文字の英数字" minlength="8" maxlength="8" pattern="[A-Za-z0-9]{8}" title="8文字の英数字" required autocapitalize="characters" autocorrect="off" autocomplete="off" spellcheck="false"></label><button type="submit" class="full">ルームに参加</button></form>';this.show("online",bs("マルチプレイ")+'<p class="online-description">最大6人が同じワールドで遊べます。探索では持ち物を各自で管理し、掘った場所や設置した作業台は仲間と共有されます。</p>'+(e?'<p class="online-error" role="alert">'+Me(e)+"</p>":"")+'<div class="online-forms"'+(t?" data-invited":"")+">"+(t?h+l:l+h)+"</div>",!0)}onlineSession(t){this.room=t;const e=Mt("online-hud"),n=t?t.state==="connecting"?"接続中":t.state==="reconnecting"?"再接続中":t.count+" / 6人"+(t.tagBots?"（CPU "+t.tagBots+"）":""):"";e.hidden=!t,Mt("game").toggleAttribute("data-online",!!t);const s=Mt("online-hud-code");s.textContent!==(t?.code??"")&&(s.textContent=t?.code??"");const r=Mt("online-hud-status");r.textContent!==n&&(r.textContent=n);const o=GM(t?.stage),c=Mt("online-hud-stage");c.hidden=!o,c.textContent!==o&&(c.textContent=o);const a=this.panel.querySelector("[data-online-status]");a&&a.textContent!==n&&(a.textContent=n);const l=this.panel.querySelector("[data-online-stage]");l&&(l.hidden=!o,l.textContent!==o&&(l.textContent=o))}tagMode(t){Mt("game").toggleAttribute("data-tag-play",!!t),Mt("game").toggleAttribute("data-cops-play",!!t?.cops);const e=Mt("tag-status"),n=Mt("tag-map-toggle"),s=Mt("tag-map");e.hidden=n.hidden=!t,s.hidden=!t?.mapOpen,n.setAttribute("aria-pressed",String(!!t?.mapOpen)),e.toggleAttribute("data-it",!!t?.it);const r=Mt("tag-role"),o=Mt("tag-hint");r.textContent!==(t?.label??"")&&(r.textContent=t?.label??""),o.textContent!==(t?.hint??"")&&(o.textContent=t?.hint??"");const c=Mt("tag-clock"),a=Mt("tag-clock-value"),l=t?.remaining;if(c.hidden=l===void 0,c.toggleAttribute("data-urgent",l!==void 0&&l<=10),l!==void 0){const f=Math.floor(l/60)+":"+String(l%60).padStart(2,"0");a.textContent!==f&&(a.textContent=f,a.dateTime="PT"+l+"S")}const h=t?.hide,u=Mt("tag-hide");if(u.hidden=!h,u.toggleAttribute("data-it",!!h&&!!t?.it),h){const f=Mt("tag-hide-count"),d=Mt("tag-hide-title"),p=Mt("tag-hide-detail"),v=String(h.remaining);f.textContent!==v&&(f.textContent=v,f.dateTime="PT"+v+"S"),d.textContent!==h.title&&(d.textContent=h.title),p.textContent!==h.detail&&(p.textContent=h.detail)}}tagResult({outcome:t,loser:e,winners:n,minutes:s}){const r={win:"勝利",lose:"敗北",spectator:"試合終了"}[t],o={win:"時間切れまで逃げ切りました。",lose:"時間切れの時点であなたが鬼でした。",spectator:"制限時間に達しました。"}[t],c=n.length?'<ul id="tag-result-winners">'+n.map(a=>"<li>"+Me(a)+"</li>").join("")+"</ul>":"<span>なし</span>";this.show("tag-result",'<section class="tag-result" data-outcome="'+t+'" aria-labelledby="tag-result-title"><header><div><h1 id="tag-result-title" tabindex="-1">'+r+"</h1><p>"+o+'</p></div><div class="tag-result-time"><small>制限 '+s+'分</small><time datetime="PT0S">0:00</time></div></header><dl class="tag-result-players"><div><dt>負け・時間切れ時の鬼</dt><dd id="tag-result-loser">'+Me(e)+"</dd></div><div><dt>勝ち・逃げ切った人</dt><dd>"+c+"</dd></div></dl>"+Se("online-leave","退出してタイトルへ","primary full")+"</section>"),Mt("tag-result-title").focus({preventScroll:!0})}copsResult(t,e,n){const s=e?"ケイの勝利":"ドロの勝利",r=t==="win"?"あなたのチームの勝ちです。":t==="lose"?"あなたのチームは負けました。":"対戦が終了しました。";this.show("tag-result",'<section class="tag-result" data-outcome="'+t+'" aria-labelledby="tag-result-title"><header><div><h1 id="tag-result-title" tabindex="-1">'+s+"</h1><p>"+(e?"ドロを全員確保しました。":"ドロが制限時間まで逃げ切りました。")+" "+r+'</p></div></header><dl class="tag-result-players"><div><dt>勝利メンバー</dt><dd><ul>'+n.map(o=>"<li>"+Me(o)+"</li>").join("")+"</ul></dd></div></dl>"+Se("online-leave","退出してタイトルへ","primary full")+"</section>"),Mt("tag-result-title").focus({preventScroll:!0})}worlds(t){const e=t.map(n=>{const s=new Date(n.updatedAt),r=Number.isFinite(s.getTime())?s.toLocaleString("ja-JP",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",o=Me(n.id),c=Cc.find(l=>l.id===(n.stage??"classic"))?.name,a=n.hasOriginal?'<button data-action="original" data-id="'+o+'">旧版の原本</button>':"";return"<li><div><strong>"+Me(n.name)+"</strong><small>"+[Sl(n.mode),c,r].filter(Boolean).join("　")+'</small></div><div class="row-actions"><button class="primary" data-action="load" data-id="'+o+'">開く</button><button data-action="export" data-id="'+o+'">書き出す</button>'+a+"</div></li>"}).join("");this.show("worlds",bs("ワールド一覧")+(t.length?'<ul class="worlds">'+e+"</ul>":'<p class="empty">このブラウザーには保存したワールドがありません。</p>')+'<div class="actions">'+Se("goto-create","新しく始める")+'<label class="file-btn">ファイルを読み込む<input id="world-import" type="file" accept=".json,application/json"></label></div>')}async confirmImport(t){const e=Mt("confirm-import");return Mt("confirm-body").textContent="保存済みの「"+t+"」を、読み込むファイルの状態で置き換えます。",e.returnValue="cancel",new Promise(n=>{e.addEventListener("close",()=>n(e.returnValue==="replace"),{once:!0}),e.showModal()})}loading(t){this.show("loading",'<div class="loading-mark" aria-hidden="true"></div><h1>読み込み中</h1><p role="status">'+Me(t)+"</p>")}error(t){this.show("error",bs("ゲームを開始できません")+'<p class="error-message">'+Me(t)+"</p>"+Se("title","タイトルへ戻る","primary"))}pause(t=!1,e="lock",n=""){const s=this.room,o=t&&Mt("game").hasAttribute("data-tag-play")?s?.tagBots?"「プレイ開始」を押すとCPUも参加します。":"遊ぶ人がそろってから「プレイ開始」を押してください。":"",c=Object.entries(od).filter(([a])=>a!==e).map(([a,{label:l}])=>Se("resume-"+a,l)).join("");this.show(t?"ready":"pause","<h1>"+(t?"ワールドの準備ができました":"一時停止")+"</h1>"+(n?'<p class="input-message" role="status">'+Me(n)+"</p>":"")+(s?'<div class="room-actions"><p>ルーム <strong>'+Me(s.code)+'</strong> <span data-online-status role="status"></span><small data-online-stage hidden></small></p>'+Se("online-copy","招待リンクをコピー")+(o?"<p>"+o+"</p>":"")+"</div>":"")+'<div class="pause-actions">'+Se("resume",t?"プレイ開始":"再開","primary")+'<p class="control-mode">操作方法　<strong>'+od[e].name+"</strong></p>"+c+'<button type="button" data-action="view-mode" aria-label="オリジナルモードとキッズモードの切り替え" aria-pressed="false"></button>'+(t?"":(s?"":Se("save","手動保存")+Se("export","ファイルへ書き出す"))+Se("goto-settings","設定")+Se("goto-help","操作説明")+Se("diagnostics","入力の診断・復旧"))+(s?Se("online-leave","退出してタイトルへ","danger"):Se("title","タイトルへ戻る"))+"</div>"),this.showViewMode(this.kidsView),s&&this.onlineSession(s)}diagnostics(t,e){this.show("diagnostics",bs("入力の診断・復旧")+'<p class="input-message">'+Me(t)+'</p><div class="pause-actions">'+Se("reset-input","入力をリセット","primary")+Se("export-diagnostics","診断をファイルに書き出す")+'</div><details class="input-trace"><summary>直近の入力記録</summary><pre>'+Me(e)+"</pre></details>")}play(t,e=!1,n=!1,s=!1){this.stopMining(),window.clearTimeout(this.guideTimer),this.screen="play",Mt("game").dataset.screen="play",Mt("game").dataset.playInput=n?"pending":t?"drag":"lock",Mt("game").classList.remove("home"),this.panel.hidden=!0,this.panel.replaceChildren(),Mt("hud").hidden=!1,Mt("fallback").hidden=!t;const r=Mt("guide");e&&(this.guideSeen=!1),r.hidden=!(e||t&&!this.guideSeen),r.innerHTML="<div><b>"+(s?"タッチ操作":t?"ドラッグ操作":"はじめの操作")+"</b>"+Se("dismiss-guide","閉じる","guide-close")+"</div>"+(s?"<p>左下のスティックで移動し、景色をドラッグして見回します。</p><p>照準を合わせて画面をタップすると設置。「採掘」は長押しします。</p>":"<p><kbd>WASD</kbd> 移動　<kbd>Space</kbd> ジャンプ　<kbd>E</kbd> 持ち物</p><p>"+(t?"画面をドラッグして見回します。「採掘」は長押し、「設置」はクリック。":"左クリック長押しで採掘、右クリックで設置。")+"</p>"+(t?'<a href="'+Me(location.href)+'" target="_blank" rel="noopener">独立したタブで開く ↗</a>':"")),!t&&e&&(this.guideTimer=window.setTimeout(()=>{this.screen==="play"&&!r.hidden&&(r.hidden=!0,this.guideSeen=!0,this.send("dismiss-guide"))},1e4))}help(){this.show("help",bs("操作説明")+'<dl class="keylist">'+[["W / A / S / D","移動"],["マウス / 矢印キー","視点を変える"],["K / 画面上のモードボタン","オリジナルモードと見下ろし視点のキッズモードを切り替える"],["Space / Shift","ジャンプ・水中で浮上 ／ ダッシュ"],["左クリック長押し","照準のブロックを採掘"],["右クリック","手に持っているブロックを設置"],["1 ～ 9 / ホイール","ホットバーを切り替える"],["C 長押し","しゃがむ。足場の端で踏みとどまり、低い坑道を通れる"],["Q / 中クリック","照準の建材を選ぶ"],["R / 向きボタン","原木や滑り台パーツの向きを切り替える"],["右クリック / V","住民と話す、または作業台・チェストを開く。しゃがんで右クリックすると設備の隣に設置"],["左クリック / X","照準を合わせたサメを攻撃。タッチ操作では画面の「攻撃」ボタン"],["Ctrl + Z","クリエイティブの通常ブロックを最大20回戻す。作業台とチェストは対象外"],["B / G","現在地を拠点に登録 ／ 探索目標の表示切り替え"],["E","持ち物・クラフトを開閉"],["Esc","一時停止"],["F","クリエイティブで飛行を切り替える"],["Space / Ctrl","飛行中に上昇 ／ 下降"],["F3","FPS・描画回数・チャンク数を表示"]].map(([t,e])=>"<div><dt>"+t+"</dt><dd>"+e+"</dd></div>").join("")+"</dl><h2>タブレットモード</h2><p>一時停止画面の「タブレットモードでプレイ」から、PCでも画面のスティックやボタンを使えます。左下のスティックで移動し、景色をドラッグして見回します。照準を合わせて画面を短くタップすると、選択中のブロックを設置できます。右下のボタンからも設置・採掘・ジャンプ・しゃがみができます。クリエイティブでは「飛行」で切り替え、上昇・下降ボタンを長押しします。</p><h2>ジャンプ台と滑り台</h2><p>ジャンプ台に乗ると、小・中・大の高さに合わせて跳び上がります。滑り台は、下りたい方向に坂のパーツを1ブロックずつ低くしてつなぎ、高い方から乗ります。</p><h2>探索のはじめ方</h2><p>木の幹に近づいて採掘し、持ち物を開いて原木から木材と棒を作ります。木のツルハシで石を掘り、石の道具や建材を作りましょう。持ち物のアイコンを選ぶと、選択中のホットバー枠に登録できます。</p><h2>西部の町</h2><p>案内に沿って作業場や建築区画に行けます。道具をホットバーで選び、左クリック、X、または画面の「使う」で使用します。探索でリボルバーを使うには弾、弓を使うには火矢が必要です。Vで町の人に話しかけたり、狙った炎を消したりできます。</p><h2>マルチプレイ</h2><p>ルームを作るときにステージと遊び方を選び、ルームコードを仲間に知らせます。探索では持ち物はプレイヤーごとに管理され、掘った場所や建物、設置した作業台は仲間と共有されます。</p><h2>鬼ごっこ</h2><p>最初と鬼が交代するたびに、20秒の隠れる時間が始まります。鬼はその場で待機し、逃げ役は移動できます。画面のカウントダウンが終わると追跡が始まり、制限時間の計測も進みます。時間切れのときに鬼だった人が負けです。</p><p>Mキーや画面上の「地図」で、地形とエリアごとの人数を確認できます。学校では、自分がいる階の地図を表示します。</p><h2>対戦中のダッシュ</h2><p>移動しながら Shift または画面の「ダッシュ」を長押しします。走るとスタミナが減り、ダッシュをやめて少し経つと回復します。ダッシュの速さは鬼ごっこでは鬼と逃げ役で10対7、ドロケイでは両チーム同じです。</p><h2>拠点と遠征</h2><p>木材4個で作業台、6個でチェストを作れます。床に置き、照準を合わせて右クリックで開きます。木の道具と灯晶ブロックを用意したら、拠点をBで登録して岩窟へ。潮晶を持ち帰ると、作業台で青緑色のランタンや象眼タイルを作れます。旧ワールドでは朝霧ガラスと石炭から潮晶を作れます。</p><h2>トラックパッドと視点操作</h2><p>Macでは、トラックパッドを押したまま指を動かすと見回せます。画面上の「採掘」「設置」を使います。クリックせずに見回したいときは、一時停止から「視点を固定してプレイ」を選んでください。</p><p>視点が動かなくなったら、Esc または「一時停止」から「入力の診断・復旧」を開きます。「入力をリセット」でドラッグ操作に戻れます。診断記録は端末に保存・書き出しできます。</p><h2>保存とバックアップ</h2><p>進行はこのブラウザーに自動保存されます。一時停止から手動保存もできます。ブラウザーのデータ削除前や別のPCに移すときは、タイトルの「つづきから」でワールドを「書き出す」を選びます。復元は同じ一覧の「ファイルを読み込む」から行えます。</p>")}showViewMode(t){this.kidsView=t;const e=t?"キッズモード":"オリジナルモード",n=Mt("view-mode");n.setAttribute("aria-pressed",String(t)),n.querySelector("span").textContent=e;const s=this.panel.querySelector('[data-action="view-mode"]');s&&(s.setAttribute("aria-pressed",String(t)),s.textContent="視点切替　現在は"+e)}expedition(t,e,n){const s=Mt("journey"),r=Mt("bearing");s.hidden=!t,s.textContent!==t&&(s.textContent=t);const o=[e,n].filter(Boolean).join("　·　");r.textContent!==o&&(r.textContent=o)}target(t){const e=Mt("target-hint");e.textContent!==t&&(e.textContent=t),e.hidden=!t||this.screen!=="play"}settings(t){const e=(s,r,o,c,a,l)=>'<label class="range"><span>'+r+"</span><output>"+this.valueLabel(s,o)+'</output><input type="range" name="'+s+'" min="'+c+'" max="'+a+'" step="'+l+'" value="'+o+'"></label>',n=(s,r,o)=>'<label class="check"><input type="checkbox" name="'+s+'" '+(o?"checked":"")+">"+r+"</label>";this.show("settings",bs("設定")+'<form id="setting-form"><fieldset><legend>画面</legend><input type="hidden" name="quality" value="'+t.quality+'"><div class="quality-presets">'+Object.entries({low:"低",standard:"標準",high:"高"}).map(([s,r])=>'<button type="button" data-action="preset" data-id="'+s+'" aria-pressed="'+(t.quality===s)+'">'+r+"</button>").join("")+"</div>"+(t.quality==="legacy"?"<p>旧版の描画倍率を使用中です。プリセットを選ぶと新しい画質に切り替わります。</p>":"")+e("distance","描画距離",t.distance,2,6,1)+e("scale","解像度倍率",t.scale,.5,1.5,.05)+n("shadows","影を表示する",t.shadows)+"</fieldset><fieldset><legend>景色と動き</legend>"+n("vegetation","草花を表示する",t.vegetation)+n("effects","水面・葉の追加演出",t.effects)+n("bob","歩行時に視点を揺らす",t.bob)+n("sprintFov","ダッシュ時に視野を広げる",t.sprintFov)+"</fieldset><fieldset><legend>操作と音</legend>"+n("invertY","マウスの上下を反転する",t.invertY)+e("effectsVolume","効果音",t.effectsVolume,0,1,.05)+e("ambientVolume","環境音",t.ambientVolume,0,1,.05)+e("sensitivity","マウス感度",t.sensitivity,.3,2.5,.1)+e("volume","主音量",t.volume,0,1,.05)+n("muted","ミュート",t.muted)+"</fieldset></form>")}slots(t){return t.bar.map((e,n)=>'<button class="slot'+(t.selected===n?" selected":"")+'" data-action="select" data-slot="'+n+'" aria-pressed="'+(t.selected===n)+'" aria-label="'+(n+1)+"番 "+Me(e?.name??"空き")+'"><small>'+(n+1)+"</small>"+(e?no(e.id)+"<em>"+El(e.count)+"</em>"+this.wear(e):"")+"</button>").join("")}wear(t){return t.durability!==void 0&&t.maxDurability?'<i class="wear" title="耐久 '+t.durability+" / "+t.maxDurability+'"><b style="width:'+Math.min(100,100*t.durability/t.maxDurability)+'%"></b></i>':""}hud(t){this.inventoryState=t;const e=t.bar[t.selected];Mt("hud-bar").innerHTML=this.slots(t);const n=Mt("game").hasAttribute("data-cops-play")?"ドロケイ":Mt("game").hasAttribute("data-tag-play")?"鬼ごっこ":Sl(t.mode);Mt("mode-tag").textContent=(this.worldName?this.worldName+"　／　":"")+n,Mt("equipped").textContent=e?e.name+"　"+El(e.count)+(e.durability!==void 0?"　耐久 "+e.durability+"/"+e.maxDurability:""):"素手"}inventory(t){const e=this.screen==="inventory",s=(e?this.panel.querySelector(".panel"):null)?.scrollTop??0,r=document.activeElement,o=e&&r?.dataset.action?Object.entries(r.dataset):null,c=!!this.panel.querySelector("details[open]");this.inventoryState=t;const a=g=>'<div class="storage-tools"><button data-action="sort" data-side="'+g+'">整理</button>'+(t.chest?'<button data-action="transfer-all" data-side="'+g+'">'+(g==="bag"?"すべて預ける":"すべて取り出す")+"</button>":"")+"</div>",l=(g,m)=>{const _=' data-index="'+g+'" data-side="'+m+'"';return'<div class="stack-actions">'+(t.chest?'<button data-action="transfer"'+_+">"+(m==="bag"?"預ける":"取る")+'</button><button data-action="transfer" data-half="yes"'+_+">半分</button>":'<button data-action="split"'+_+">分割</button>")+"</div>"},h=t.chest?"チェスト":t.benchUses!==void 0?"作業台":t.mode==="creative"?t.frontier?"建材と道具":"ブロック一覧":"持ち物とクラフト",u=t.chest?"<section><h2>チェスト　"+t.chest.length+" / 27 枠</h2>"+a("chest")+(t.chest.length?'<div class="bag-grid">'+t.chest.map((g,m)=>'<div class="stack"><span>'+no(g.id)+" "+Me(te[g.id].name)+" ×"+g.count+(g.durability?"　耐久 "+g.durability:"")+"</span>"+l(m,"chest")+"</div>").join("")+"</div>":'<p class="empty">まだ空です。所持品から預けられます。</p>')+"</section>":"",f=t.palette?'<details class="supply" '+(c?"open":"")+'><summary>建材を補充</summary><p>クリックで1個、Shift＋クリックで64個を所持品に加えます。</p><div class="bag-grid">'+t.palette.map(g=>'<button class="bag-item" data-action="supply" data-id="'+g.id+'">'+no(g.id)+Me(g.name)+"</button>").join("")+"</div></details>":"",d=t.items.map((g,m)=>'<div class="stack"><button class="bag-item" type="button" data-index="'+m+'" data-action="assign" data-id="'+g.id+'">'+no(g.id)+"<b>"+Me(g.name)+"</b><small>"+(g.durability!==void 0?"耐久 "+g.durability+"/"+g.maxDurability:"× "+El(g.count))+"</small>"+(ld[g.id]?"<small>"+ld[g.id]+"</small>":"")+this.wear(g)+"</button>"+(t.mode==="explore"||t.chest?l(m,"bag"):"")+"</div>").join(""),p=t.recipes.map(g=>"<li>"+no(g.itemId)+"<div><strong>"+Me(g.outputs)+"</strong><small>"+Me(g.ingredients)+"</small><small>"+g.equipment+"　"+(g.reason||(g.craftable?"制作可能 "+g.craftable+" 回":"所持品に空きがありません。"))+'</small></div><div class="craft-actions"><button data-action="craft" data-id="'+g.id+'" '+(g.craftable<1?"disabled":"")+">作る</button>"+(g.craftable>1?'<button data-action="craft" data-id="'+g.id+'" data-count="'+g.craftable+'">まとめて ×'+g.craftable+"</button>":"")+"</div></li>").join("");this.show("inventory",'<header class="panel-head"><h1>'+h+"</h1>"+Se("back","閉じる <kbd>E</kbd>","back")+'</header><div class="inventory-bar"><h2>ホットバー</h2><div class="hotbar">'+this.slots(t)+"</div><p>数字1〜9かクリックで枠を選び、アイコンを押すと登録。"+(t.mode==="explore"?" Shift＋クリックで"+(t.chest?"移動":"分割")+"。":"")+(t.benchUses!==void 0?"　この作業台で制作 "+t.benchUses+" 回":"")+"</p></div>"+f+'<div class="inventory-columns'+(t.mode==="creative"&&!t.chest?" palette":"")+'"><section><h2>'+(t.mode==="creative"&&!t.chest?t.frontier?"建材と道具":"建築ブロック":"所持品")+"</h2>"+(t.mode==="explore"||t.chest?a("bag"):"")+(d?'<div class="bag-grid">'+d+"</div>":'<p class="empty">'+(t.palette?"「建材を補充」を開くと、ここに素材を用意できます。":"まだ何も持っていません。木や土を採掘して集めましょう。")+"</p>")+"</section>"+(u||(t.mode==="creative"?"":'<section><h2>クラフト</h2><p class="ingredient-key">材料は所持数 / 必要数で表示します。</p><ul class="recipes">'+p+"</ul></section>"))+"</div>",!0);const v=this.panel.querySelector(".panel");v&&(v.scrollTop=s),o&&Array.from(this.panel.querySelectorAll("[data-action]")).find(g=>o.every(([m,_])=>g.dataset[m]===_))?.focus({preventScroll:!0})}mining(t){const e=Mt("mine-meter"),n=Math.round(Math.max(0,Math.min(1,Number.isFinite(t)?t:0))*100);e.hidden=n===0||this.screen!=="play",e.dataset.percent!==String(n)&&(e.dataset.percent=String(n),e.setAttribute("aria-valuenow",String(n)),e.style.setProperty("--progress",n+"%"))}debug(t){const e=Mt("debug");e.hidden=!t||this.screen!=="play",e.textContent!==t&&(e.textContent=t)}toast(t){const e=Mt("notice");e.textContent=t,e.hidden=!t,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{e.hidden=!0},2e3)}status(t){const e=Mt("save-status");e.textContent=t,e.hidden=!t,window.clearTimeout(this.saveTimer),!t.includes("中")&&!/失敗|できません/.test(t)&&(this.saveTimer=window.setTimeout(()=>{e.hidden=!0},3500))}}const wl=192;class qM{samples=[];cursor=0;nextLook=0;nextFrame=0;nextIssue=0;frames=0;moves=0;faults=0;lastIssue="";detailed=!1;enable(t){this.detailed=t}add(t,e,n,s={},r=!1){const o=performance.now();if(r&&(this.faults++,this.lastIssue=String(s.reason??e),e==="look-limited"||e==="discontinuity")){if(o<this.nextIssue)return;this.nextIssue=o+65}if(e==="look"){if(this.moves++,o<this.nextLook)return;this.nextLook=o+(this.detailed?12:65)}if(e==="frame"){if(this.frames++,o<this.nextFrame)return;this.nextFrame=o+(this.detailed?100:500)}this.samples[this.cursor]={timeMs:Math.round(o),mode:t,event:e,lock:n,...s},this.cursor=(this.cursor+1)%wl}report(){const t=this.samples.length<wl?this.samples.slice():[...this.samples.slice(this.cursor),...this.samples.slice(0,this.cursor)];return{game:"ウェブクラフト777",generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,viewport:[window.innerWidth,window.innerHeight],devicePixelRatio:window.devicePixelRatio||1,embedded:window.self!==window.top,capacity:wl,frames:this.frames,lookEvents:this.moves,anomalies:this.faults,lastIssue:this.lastIssue,events:t}}}const Tl=Math.PI*2;function Al(i){const t=i%Tl;return t>Math.PI?t-Tl:t<-Math.PI?t+Tl:t}function Rl(i){return Math.max(-1.55,Math.min(1.55,i))}function hd(i,t,e){return i==="lock"||i==="drag"||i==="tablet"?i:t==="lock"?"lock":t==="drag"?e.touch?"tablet":"drag":e.coarse?"tablet":e.mac?"drag":"lock"}const YM=new Set(["KeyW","KeyA","KeyS","KeyD","KeyC","Space","ShiftLeft","ShiftRight","ControlLeft","ControlRight","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),ud=2*Math.PI/3,fd=9,jM=360,dd=()=>Math.max(1024,window.screen?.width||0,window.screen?.height||0,window.innerWidth||0,window.innerHeight||0);class KM{constructor(t,e,n){if(this.canvas=t,this.controls=e,document.addEventListener("pointerlockchange",()=>this.reconcileLock()),document.addEventListener("pointerlockerror",()=>{this.hasRequestPromise||this.fallback("pointerlockerror")}),document.addEventListener("mousemove",s=>{if(this.mode==="locked"){if(!this.ownsLock()){this.reconcileLock();return}this.checkButtons(s),this.look(s.movementX,s.movementY)}}),t.addEventListener("contextmenu",s=>{this.active&&s.preventDefault()}),t.addEventListener("auxclick",s=>{this.active&&s.button===1&&s.preventDefault()}),t.addEventListener("pointerdown",s=>this.startView(s)),t.addEventListener("pointermove",s=>this.movePointer(s)),t.addEventListener("lostpointercapture",s=>this.release(s)),document.addEventListener("pointerdown",s=>{const r=s.target?.closest?.('[data-hold="mine"]');!this.drag||!r||r.disabled||s.button!==0||(s.pointerType!=="mouse"&&s.preventDefault(),this.grab(s,r,"mine")&&(this.mining=!0,this.controls.beginMine()))}),document.addEventListener("pointermove",s=>{s.target!==t&&this.movePointer(s)}),document.addEventListener("lostpointercapture",s=>this.release(s)),window.addEventListener("pointerup",s=>this.release(s)),window.addEventListener("pointercancel",s=>this.release(s)),window.addEventListener("mouseup",s=>{s.button===0&&this.dropMouseContact()}),t.addEventListener("wheel",s=>this.wheel(s),{passive:!1}),window.addEventListener("keydown",s=>this.keydown(s)),window.addEventListener("keyup",s=>this.keys.delete(s.code)),window.addEventListener("blur",()=>this.interrupt("blur")),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.interrupt("hidden"),this.controls.background())}),n){this.bindTouch(n.stick,"stick"),this.bindTouch(n.jump,"jump"),this.bindTouch(n.down,"down"),n.sprint&&this.bindTouch(n.sprint,"sprint");const s=()=>{this.drag&&this.reset()};window.addEventListener("orientationchange",s),window.screen?.orientation?.addEventListener?.("change",s)}}canvas;controls;keys=new Set;mining=!1;mode="idle";get pending(){return this.mode==="pending"}get active(){return this.pending||this.mode==="locked"||this.mode==="drag"}get drag(){return this.mode==="drag"}contacts=new Map;stickForward=0;stickRight=0;ticket=0;hasRequestPromise=!1;jumpEdge=!1;touchJumpEdge=!1;wheelSum=0;lastWheel=-1/0;nextWheel=-1/0;yaw=0;pitch=0;sensitivity=1;trace=new qM;ownsLock(){return document.pointerLockElement===this.canvas}record(t,e={},n=!1){this.trace.add(this.mode,t,this.ownsLock(),e,n)}setDiagnostics(t){this.trace.enable(t)}report(){return{...this.trace.report(),mode:this.mode,pointerLock:this.ownsLock(),sensitivity:this.sensitivity,yaw:this.yaw,pitch:this.pitch}}rememberView(t){Number.isFinite(t.yaw)&&Number.isFinite(t.pitch)&&(this.yaw=Al(t.yaw),this.pitch=Rl(t.pitch)),t.yaw=this.yaw,t.pitch=this.pitch}restoreAngles(t){t.yaw=this.yaw,t.pitch=this.pitch}applyLook(t,e,n,s,r=!1){if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(s)||s<=0||!Number.isFinite(e)||!Number.isFinite(n)){this.restoreAngles(t),this.fail("視点または感度に無効な数値が届きました。");return}this.sensitivity=s;let o=.00235*s;const c=Math.hypot(e,n),a=c*o;this.mode==="locked"&&a>ud&&c>dd()&&(o*=ud/a,this.record("look-limited",{dx:e,dy:n,reason:"単発の大きな視点移動を抑えました。"},!0));const l=Al(t.yaw-e*o),h=Rl(t.pitch+(r?1:-1)*n*o);if(!Number.isFinite(l)||!Number.isFinite(h)){this.restoreAngles(t),this.fail("視点の計算を復旧しました。");return}t.yaw=this.yaw=l,t.pitch=this.pitch=h}frame(t,e){if(this.mode==="locked"&&!this.ownsLock())return this.reconcileLock(),!1;if(!Number.isFinite(t.yaw)||!Number.isFinite(t.pitch)||!Number.isFinite(e))return this.restoreAngles(t),this.fail("前回の正常な視点に戻しました。"),!1;if(!this.active)return!1;const n=Math.min(.1,Math.max(0,e));return t.yaw=this.yaw=Al(t.yaw+(Number(this.keys.has("ArrowLeft"))-Number(this.keys.has("ArrowRight")))*n*1.65),t.pitch=this.pitch=Rl(t.pitch+(Number(this.keys.has("ArrowUp"))-Number(this.keys.has("ArrowDown")))*n*1.3),this.record("frame",{yaw:this.yaw,pitch:this.pitch,frameMs:Math.round(e*1e4)/10}),!0}fail(t){const e=typeof t=="string"?t:"ゲーム処理を中断しました。";this.record("recovery",{reason:e},!0),this.active&&this.controls.pause(),this.active&&this.stop(),this.controls.recovery?.("操作を中断しました。「再開」でドラッグ操作に切り替わります。")}look(t,e){if(!Number.isFinite(t)||!Number.isFinite(e)){this.fail("ブラウザーから無効な視点移動量が届きました。");return}if(!t&&!e)return;const n=dd();if(Math.abs(t)>n*16||Math.abs(e)>n*16){this.record("discontinuity",{reason:"単一イベントの不連続な移動量を除外しました。"},!0);return}this.controls.look(t,e),this.record("look",{dx:t,dy:e,yaw:this.yaw,pitch:this.pitch})}change(t){this.reset(),this.mode=t,this.record("mode")}interrupt(t){this.record(t),this.active&&this.controls.pause(),this.active?this.stop():this.reset()}reconcileLock(){if(this.ownsLock()){if(this.mode==="locked")return;if(!this.pending){document.exitPointerLock();return}this.change("locked"),this.controls.dragChanged(!1)}else this.mode==="locked"&&(this.interrupt("lock-lost"),this.controls.recovery?.("マウス固定が解除されました。「再開」でドラッグ操作に切り替わります。"))}fallback(t){if(this.pending){if(this.ownsLock()){this.reconcileLock();return}this.change("drag"),this.record("fallback",{reason:t}),this.controls.dragChanged(!0)}}start(t){if(!t&&(this.pending||this.mode==="locked"&&this.ownsLock()))return;this.stop();const e=++this.ticket;if(this.hasRequestPromise=!1,this.change(t?"drag":"pending"),this.canvas.focus({preventScroll:!0}),t){this.controls.dragChanged(!0);return}if(!this.canvas.requestPointerLock){this.fallback("unsupported");return}try{const n=this.canvas.requestPointerLock();n&&typeof n.then=="function"&&(this.hasRequestPromise=!0,n.then(()=>{e===this.ticket&&this.ownsLock()&&this.reconcileLock()},()=>{e===this.ticket&&this.fallback("rejected")}))}catch{this.fallback("sync-error")}window.setTimeout(()=>{e===this.ticket&&this.fallback("timeout")},750)}stop(){this.ticket++,this.change("paused"),this.ownsLock()&&document.exitPointerLock()}reset(){this.keys.clear();for(const t of this.contacts.values())this.dropContact(t);this.mining=!1,this.jumpEdge=!1,this.touchJumpEdge=!1,this.wheelSum=0,this.nextWheel=this.lastWheel=-1/0}cancelPlacementTap(){const t=this.findRole("look");t&&(t.tapStartedAt=void 0)}startView(t){if(!this.active||this.pending)return;if(this.mode==="locked"&&!this.ownsLock()){this.reconcileLock();return}if(t.pointerType!=="mouse"&&t.preventDefault(),t.button===2){this.controls.place();return}if(t.button===1){this.controls.pick?.();return}if(t.button!==0)return;if(this.mode==="locked"){if(!this.grab(t,this.canvas,"mine",!1))return;this.mining=!0,this.controls.beginMine();return}const e=this.grab(t,this.canvas,"look");e&&t.pointerType==="touch"&&(e.tapStartedAt=t.timeStamp)}findRole(t){for(const e of this.contacts.values())if(e.role===t)return e}grab(t,e,n,s=!0){if(this.contacts.has(t.pointerId)||this.findRole(n))return;const r={id:t.pointerId,element:e,role:n,pointerType:t.pointerType||"mouse",x:t.clientX,y:t.clientY};this.contacts.set(t.pointerId,r);try{s&&e.setPointerCapture?.(t.pointerId)}catch{this.contacts.delete(t.pointerId);return}return r}bindTouch(t,e){t.addEventListener("contextmenu",n=>n.preventDefault()),e==="jump"&&t.addEventListener("click",n=>{this.drag&&n.detail===0&&(this.touchJumpEdge=!0)}),t.addEventListener("pointerdown",n=>{!this.drag||n.button!==0||t.hidden||"disabled"in t&&t.disabled||!this.grab(n,t,e)||(n.preventDefault(),t.dataset.held="",e==="stick"&&this.updateStick(t,n.clientX,n.clientY),e==="jump"&&(this.touchJumpEdge=!0))})}updateStick(t,e,n){const s=t.getBoundingClientRect(),r=Math.min(s.width,s.height)*.29,o=e-(s.left+s.width/2),c=n-(s.top+s.height/2),a=Math.hypot(o,c);if(!(r>0)||!Number.isFinite(a))return;const l=Math.min(1,r/(a||1));t.style.setProperty("--stick-x",o*l+"px"),t.style.setProperty("--stick-y",c*l+"px");const h=Math.max(0,(Math.min(1,a/r)-.16)/.84)/(a||1);this.stickForward=-c*h||0,this.stickRight=o*h||0}dropMouseContact(){for(const t of this.contacts.values())t.pointerType==="mouse"&&this.dropContact(t)}checkButtons(t){Number.isInteger(t.buttons)&&!(t.buttons&1)&&this.dropMouseContact()}movePointer(t){const e=this.contacts.get(t.pointerId);if(!this.drag||!e)return;if(e.pointerType==="mouse"&&Number.isInteger(t.buttons)&&!(t.buttons&1)){this.dropContact(e);return}if(e.role==="stick"){this.updateStick(e.element,t.clientX,t.clientY);return}if(e.role!=="look")return;const n=t.clientX-e.x,s=t.clientY-e.y;if(e.tapStartedAt!==void 0){if(Math.hypot(n,s)<=fd)return;e.tapStartedAt=void 0}e.x=t.clientX,e.y=t.clientY,this.look(n,s)}dropContact(t){this.contacts.delete(t.id),t.role==="mine"&&(this.mining=!1),t.role==="stick"&&(this.stickForward=this.stickRight=0,t.element.style.removeProperty("--stick-x"),t.element.style.removeProperty("--stick-y")),t.role!=="look"&&t.role!=="mine"&&delete t.element.dataset.held;try{t.element.hasPointerCapture?.(t.id)&&t.element.releasePointerCapture(t.id)}catch{}}release(t){const e=this.contacts.get(t.pointerId);if(!e||t.type==="lostpointercapture"&&t.target!==e.element&&e.element.isConnected!==!1||t.type==="pointerup"&&e.pointerType==="mouse"&&(Number.isInteger(t.buttons)?t.buttons&1:t.button>0))return;e.role==="jump"&&t.type!=="pointerup"&&(this.touchJumpEdge=!1);const n=t.timeStamp-(e.tapStartedAt??1/0),s=this.drag&&t.type==="pointerup"&&n>=0&&n<=jM&&Math.hypot(t.clientX-e.x,t.clientY-e.y)<=fd&&document.elementFromPoint(t.clientX,t.clientY)===this.canvas;this.dropContact(e),s&&this.controls.place()}wheel(t){if(!this.active||(t.preventDefault(),this.pending||t.ctrlKey||t.metaKey))return;const e=t.deltaMode,n=t.deltaX,s=t.deltaY;if(!Number.isFinite(s)||!s||Math.abs(n)>Math.abs(s))return;const r=performance.now();(r-this.lastWheel>220||Math.sign(s)!==Math.sign(this.wheelSum))&&(this.wheelSum=0),this.lastWheel=r,!(r<this.nextWheel)&&(this.wheelSum+=s*(e===1?16:e===2?Math.max(window.innerHeight||0,100):1),!(Math.abs(this.wheelSum)<48)&&(this.controls.cycle(Math.sign(this.wheelSum)),this.wheelSum=0,this.nextWheel=r+120,this.record("wheel-step")))}keydown(t){if(!this.active||t.defaultPrevented)return;if(t.code==="KeyZ"&&(t.ctrlKey||t.metaKey)&&!t.altKey&&!t.shiftKey){t.preventDefault(),t.repeat||this.controls.undo?.();return}if(t.altKey||t.metaKey||t.ctrlKey&&!t.code.startsWith("Control")&&!this.keys.has("ControlLeft")&&!this.keys.has("ControlRight"))return;if(YM.has(t.code)){t.preventDefault(),!t.repeat&&!this.keys.has(t.code)&&t.code==="Space"&&(this.jumpEdge=!0),t.repeat||this.keys.add(t.code);return}const e=/^Digit([1-9])$/.exec(t.code);if(!(!["Escape","KeyE","KeyF","F3","KeyQ","KeyR","KeyB","KeyG","KeyV","KeyK","KeyX","KeyM"].includes(t.code)&&!e)&&(t.preventDefault(),!t.repeat))if(e)this.controls.select(Number(e[1])-1);else switch(t.code){case"Escape":this.controls.pause();break;case"KeyE":this.controls.inventory();break;case"KeyF":this.controls.fly();break;case"KeyQ":this.controls.pick?.();break;case"KeyR":this.controls.rotate?.();break;case"KeyB":this.controls.home?.();break;case"KeyG":this.controls.guide?.();break;case"KeyV":this.controls.interact?.();break;case"KeyK":this.controls.viewMode?.();break;case"KeyX":this.controls.attack?.();break;case"KeyM":this.controls.tagMap?.();break;default:this.controls.debug()}}movement(){const t=this.keys,e=this.jumpEdge||this.touchJumpEdge;this.jumpEdge=this.touchJumpEdge=!1;let n=this.findRole("sprint");n&&(n.element.hidden||"disabled"in n.element&&n.element.disabled)&&(this.dropContact(n),n=void 0);const s=Number(t.has("KeyW"))-Number(t.has("KeyS")),r=Number(t.has("KeyD"))-Number(t.has("KeyA")),o=!!(s||r);return{forward:o?s:this.stickForward,right:o?r:this.stickRight,jump:t.has("Space")||!!this.findRole("jump"),jumpPressed:e,sprint:t.has("ShiftLeft")||t.has("ShiftRight")||!!n,down:t.has("KeyC")||t.has("ControlLeft")||t.has("ControlRight")||!!this.findRole("down")}}}const Cl=i=>Math.max(0,Math.min(1,i)),ZM=["meadow","forest","shore","cave"];function $M(i,t){const e=Math.floor(t.x),n=Math.floor(t.y),s=Math.floor(t.z);if(t.inWater)return"shore";let r=0,o=0,c=0;for(const a of[-3,0,3])for(const l of[-3,0,3]){let h=!1,u=!1,f=!1;for(let d=1;d<=8;d++){const p=i.get(e+a,n+d,s+l);p===6&&(u=!0),[2,3,4,8,9,11,14,23].includes(p)&&(h=!0)}for(let d=-3;d<=1;d++)i.get(e+a,n+d,s+l)===13&&(f=!0);r+=Number(h),o+=Number(u),c+=Number(f)}return r>=5?"cave":c>=2?"shore":o>=2?"forest":"meadow"}const Wi={earth:{cut:960,pitch:85,width:1.05},stone:{cut:3200,pitch:181,width:.85},wood:{cut:1540,pitch:118,width:.95},sand:{cut:2400,pitch:72,width:1.3},foliage:{cut:3500,pitch:78,width:1.2},glass:{cut:5100,pitch:650,width:.74},water:{cut:1100,pitch:280,width:1.35}};function JM(i){return i===4?Wi.sand:i===6?Wi.foliage:i===13?Wi.water:[5,7,21,22].includes(i)?Wi.wood:[10,12,23,25,26].includes(i)?Wi.glass:[3,8,9,11,14].includes(i)?Wi.stone:Wi.earth}function QM(i,t){const s=i.createBuffer(1,128e3,16e3),r=s.getChannelData(0);let o=0,c=0;for(let l=0;l<r.length;l++){const h=l/16e3,u=Math.random()*2-1;o+=.035*(u-o),c+=.16*(u-c);const f=h/8*Math.PI*2,d=.73+.19*Math.sin(f)+.08*Math.sin(f*3+.7);let p=o*d;if(t==="forest"){p+=c*d*.36;for(const v of[1.1,1.33,5.4]){const g=h-v;g>0&&g<.22&&(p+=.073*Math.sin(Math.PI*g/.22)**2*Math.sin(2*Math.PI*(1600*g+1050*g*g)))}}else if(t==="shore")p=o*.65+c*(.24+.3*(.5+.5*Math.sin(2*f))**3);else if(t==="cave"){p=o*.26+.022*Math.sin(f*448);for(const v of[1.7,4.8,5.08]){const g=h-v;g>0&&g<.34&&(p+=.06*Math.min(1,g*200)*Math.exp(-16*g)*Math.sin(2*Math.PI*(835*g-180*g*g)))}}r[l]=p}const a=160;for(let l=0;l<a;l++){const h=l/a,u=r.length-a+l;r[u]=r[u]*(1-h)+r[0]*h}return s}class tb{ctx;master;effects;ambient;noise;vol=.45;muted=!1;effectsLevel=1;ambientLevel=.55;playing=!1;activeVoices=new Set;ambienceCache=new Map;layers=new Map;area="meadow";sampleIn=0;configure(t,e,n=1,s=.55){this.vol=Cl(t),this.muted=e,this.effectsLevel=Cl(n),this.ambientLevel=Cl(s);const r=this.ctx?.currentTime??0;this.master?.gain.setTargetAtTime(e?0:this.vol*.52,r,.025),this.effects?.gain.setTargetAtTime(this.effectsLevel,r,.025),this.ambient?.gain.setTargetAtTime(this.playing?this.ambientLevel*.7:0,r,.07)}unlock(){try{if(!this.ctx){const t=this.ctx=new AudioContext;this.master=t.createGain(),this.master.connect(t.destination),this.effects=t.createGain(),this.effects.connect(this.master),this.ambient=t.createGain(),this.ambient.gain.value=0,this.ambient.connect(this.master),this.noise=t.createBuffer(1,Math.ceil(t.sampleRate*.4),t.sampleRate);const e=this.noise.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1;this.configure(this.vol,this.muted,this.effectsLevel,this.ambientLevel)}this.ctx.resume().catch(()=>{})}catch{}}setPlaying(t){if(this.playing=t,this.sampleIn=0,!t){for(const n of this.activeVoices)try{n.stop()}catch{}this.activeVoices.clear();const e=this.ctx?.currentTime??0;for(const{gain:n,source:s}of this.layers.values())n.gain.cancelScheduledValues(e),n.gain.setTargetAtTime(0,e,.015),s.onended=()=>{s.disconnect(),n.disconnect()},s.stop(e+.09);this.layers.clear()}this.ctx&&this.ambient&&this.ambient.gain.setTargetAtTime(t?this.ambientLevel*.7:0,this.ctx.currentTime,.045)}environment(t,e,n){if(!this.playing||this.muted||!this.vol||!this.ambientLevel||this.ctx?.state!=="running"||!this.ambient||(this.sampleIn-=n,this.sampleIn>0))return;this.sampleIn=.36,this.area=$M(t,e);const s=this.ctx,r=s.currentTime;if(!this.layers.has(this.area)){const o=s.createBufferSource(),c=s.createGain();let a=this.ambienceCache.get(this.area);a||(a=QM(s,this.area),this.ambienceCache.set(this.area,a)),o.buffer=a,o.loop=!0,c.gain.value=0,o.connect(c),c.connect(this.ambient),o.start(),this.layers.set(this.area,{source:o,gain:c})}for(const o of ZM)this.layers.get(o)?.gain.gain.setTargetAtTime(o===this.area?1:0,r,.32)}track(t,e){this.activeVoices.add(t),t.onended=()=>{this.activeVoices.delete(t),t.disconnect();for(const n of e)n.disconnect()}}sound(t,e=1){const n=this.ctx,s=this.effects;if(!n||!s||this.muted||!this.vol||!this.effectsLevel||n.state!=="running"||!this.playing&&t!=="craft")return;const r=t==="craft"?3:2;if(this.activeVoices.size+r>12)return;const o=.935+.13*Math.random(),c=(p,v,g,m,_,b=.81)=>{const y=n.createOscillator(),A=n.createGain(),w=n.currentTime+v;y.type=_,y.frequency.setValueAtTime(p,w),y.frequency.exponentialRampToValueAtTime(p*b,w+g),A.gain.setValueAtTime(1e-4,w),A.gain.linearRampToValueAtTime(m,w+.006),A.gain.exponentialRampToValueAtTime(1e-4,w+g),y.connect(A),A.connect(s),this.track(y,[A]),y.start(w),y.stop(w+g+.01)};if(t==="craft"){[440,554.37,740].forEach((p,v)=>c(p,v*.055,.15,.19,"sine",1));return}if(t==="pickup"){c(590,0,.09,.105,"sine",1.45);return}if(t==="break"){c(243*o,0,.13,.27,"triangle"),c(137,.08,.17,.23,"triangle");return}const a=JM(e),l=(t==="step"?.095:t==="tap"?.075:t==="mine"?.17:.105)*a.width,h=n.createBufferSource(),u=n.createGain(),f=n.createBiquadFilter(),d=n.currentTime;h.buffer=this.noise,h.playbackRate.value=o,f.type="lowpass",f.frequency.value=a.cut*o,u.gain.setValueAtTime(1e-4,d),u.gain.linearRampToValueAtTime(t==="step"||t==="tap"?.15:.3,d+.004),u.gain.exponentialRampToValueAtTime(1e-4,d+l),h.connect(f),f.connect(u),u.connect(s),this.track(h,[f,u]),h.start(d,.06*Math.random()),h.stop(d+l),c(a.pitch*o*(t==="place"?1.17:1),0,l,t==="step"?.13:.21,a===Wi.glass?"sine":"triangle")}}const qa=180,om=96,pd=new Set([5,6,7]),Ra=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],Pl=.2,eb=i=>i===6?3.4:4.8;function kh(i){return{x:i%Et,y:i>>>16,z:(i>>>8)%Et}}function nb(i){if(!Array.isArray(i)||i.length>om)return!1;const t=new Set;for(const e of i){if(!e||!Number.isInteger(e.key)||e.key<Et*Et||e.key>=Et*Et*Ke||t.has(e.key)||!Number.isInteger(e.material)||e.material<1||e.material>33||e.material===13||!Number.isFinite(e.age)||e.age<0||e.age>=5||typeof e.spread!="boolean")return!1;t.add(e.key)}return!0}class ib{constructor(t){this.world=t}world;flames=new Map;pending=0;spreadLeft=qa;get count(){return this.flames.size}get budget(){return this.spreadLeft}records(){return this.flames.values()}has(t,e,n){return this.flames.has(Ce(t,e,n))}ignite(t,e,n,s=!0){if(!Number.isInteger(t)||!Number.isInteger(e)||!Number.isInteger(n)||e<1||!ji(t,e,n))return!1;const r=Ce(t,e,n),o=this.world.get(t,e,n);return this.flames.has(r)||this.flames.size>=om||!o||o===13||!s&&!pd.has(o)?!1:(this.flames.size||(this.spreadLeft=qa),this.flames.set(r,{key:r,material:o,age:0,spread:!1}),!0)}extinguish(t,e,n){return this.flames.delete(Ce(t,e,n))}step(t){if(!(!Number.isFinite(t)||t<=0))for(this.pending+=Math.min(t,.25);this.pending>=Pl;){this.pending-=Pl;const e=[...this.flames.values()];let n=Math.min(this.spreadLeft,9);for(const s of e){const{x:r,y:o,z:c}=kh(s.key);if(this.world.get(r,o,c)!==s.material){this.flames.delete(s.key);continue}s.age+=Pl;const a=pd.has(s.material);if(a&&!s.spread&&s.age>=1.2&&n>0){s.spread=!0;const l=((s.key^this.world.salt)>>>0)%Ra.length;for(let h=0;h<Ra.length&&n>0;h++){const[u,f,d]=Ra[(l+h)%Ra.length];this.ignite(r+u,o+f,c+d,!1)&&(n--,this.spreadLeft--)}}s.age>=(a?eb(s.material):2.2)&&(this.flames.delete(s.key),a&&this.world.set(r,o,c,0))}}}save(){return Array.from(this.flames.values(),t=>({...t}))}restore(t,e=qa){this.pending=0,this.spreadLeft=e,this.flames.clear();for(const n of t){const{x:s,y:r,z:o}=kh(n.key);this.world.get(s,r,o)===n.material&&this.flames.set(n.key,{...n})}}}const Rn=-1,Ei=3354679,Il=13738623,yr=4863539,md=16043109,Ca=[[0,1.06,0,.42,.49,.26,Rn],[0,.79,0,.42,.12,.25,Ei],[-.255,1.09,0,.1,.4,.16,Rn],[.255,1.09,0,.1,.4,.16,Rn],[-.258,.885,-.015,.1,.108,.14,Il],[.258,.885,-.015,.1,.108,.14,Il],[0,1.43,0,.3,.31,.29,Il],[0,1.49,.13,.29,.19,.074,5783607],[-.068,1.463,-.148,.039,.043,.021,Ei],[.068,1.463,-.148,.039,.043,.021,Ei],[0,1.61,0,.51,.045,.44,5782576],[0,1.69,.01,.28,.15,.26,7358514],[0,1.638,-.01,.29,.034,.275,11636818],[0,1.294,-.138,.27,.08,.041,14534038],[-.113,.45,0,.168,.62,.18,5982788,-1],[.113,.45,0,.168,.62,.18,5982788,1],[-.113,.094,-.04,.182,.16,.24,yr,-1],[.113,.094,-.04,.182,.16,.24,yr,1]],sb=[[0,.94,.02,.62,.52,1.26,Rn],[0,.747,.09,.53,.21,.88,8870202],[0,1.21,-.42,.38,.57,.48,Rn],[0,1.51,-.61,.33,.29,.46,Rn],[0,1.444,-.854,.31,.175,.13,12488292],[0,1.367,-.839,.26,.092,.18,9658436],[-.138,1.68,-.495,.089,.18,.093,Rn],[.138,1.68,-.495,.089,.18,.093,Rn],[-.167,1.541,-.73,.033,.068,.061,Ei],[.167,1.541,-.73,.033,.068,.061,Ei],[0,1.55,-.451,.09,.25,.23,Ei],[0,1.33,-.252,.09,.27,.22,Ei],[0,.755,.669,.12,.42,.11,Ei],[-.228,.41,-.425,.12,.67,.147,Rn,-1],[.228,.41,-.425,.12,.67,.147,Rn,1],[-.228,.41,.42,.12,.67,.147,Rn,1],[.228,.41,.42,.12,.67,.147,Rn,-1],[-.228,.075,-.425,.145,.15,.157,yr,-1],[.228,.075,-.425,.145,.15,.157,yr,1],[-.228,.075,.42,.145,.15,.157,yr,1],[.228,.075,.42,.145,.15,.157,yr,-1]],Ll={sheriff:[[.126,1.18,-.137,.083,.029,.024,md],[.126,1.18,-.139,.029,.087,.03,md],[0,1.618,0,.518,.055,.449,3228266],[0,1.697,.01,.294,.155,.268,4216703]],bandit:[[0,1.322,-.156,.309,.129,.06,11750471],[0,1.664,.015,.26,.18,.247,Ei]],gang:[[0,1.36,-.161,.31,.104,.052,9458350],[0,1.625,0,.514,.048,.45,4731212],[0,1.697,.01,.294,.155,.268,6438761]]},rb={horse:sb,resident:Ca,sheriff:[...Ca,...Ll.sheriff],bandit:[...Ca,...Ll.bandit],gang:[...Ca,...Ll.gang]},ob=[[0,1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,-1,0]],ab=[16758362,16771226,16018486];class cb{constructor(t,e){this.scene=t,this.world=e;const n=this.geometry.getAttribute("normal"),s=[];for(let r=0;r<n.count;r++){const o=.76+n.getY(r)*.2+n.getX(r)*.067+n.getZ(r)*.035;s.push(o,o,o)}this.geometry.setAttribute("color",new Ee(s,3)),this.mesh.instanceMatrix.setUsage(Ep),this.mesh.frustumCulled=!1,this.mesh.count=0,this.mesh.name="西部の町の住民・馬・火",this.scene.add(this.mesh)}scene;world;geometry=new yn;material=new Fi({vertexColors:!0});mesh=new Do(this.geometry,this.material,1152);root=new De;local=new De;matrix=new xe;color=new qt;direction=new N;up=new N(0,1,0);cursor=0;put(t,e,n=1){this.mesh.setMatrixAt(this.cursor,t.matrix),this.mesh.setColorAt(this.cursor++,this.color.setHex(e).multiplyScalar(n))}figure(t,e){const n=t.moving?Math.sin(t.stride):0;this.root.position.set(t.x,t.y+Math.abs(n)*.035,t.z),this.root.rotation.set(0,t.yaw,0),this.root.updateMatrix();for(const[s,r,o,c,a,l,h,u]of rb[t.kind])this.local.position.set(s,r,o+(u??0)*n*.14),this.local.rotation.set((u??0)*n*.35,0,0),this.local.scale.set(c,a,l),this.local.updateMatrix(),this.matrix.multiplyMatrices(this.root.matrix,this.local.matrix),this.mesh.setMatrixAt(this.cursor,this.matrix),this.mesh.setColorAt(this.cursor++,this.color.setHex(h===Rn?t.color:h).multiplyScalar(e))}fireOrigin(t,e,n,s){let r={x:t+.5,y:e+1,z:n+.5},o=1/0;for(const[c,a,l]of ob){if(ri(this.world.get(t+c,e+a,n+l)))continue;const h={x:t+.5+c*.59,y:e+.55+a*.49,z:n+.5+l*.59},u=Math.hypot(h.x-s.x,h.y-s.y,h.z-s.z)-(a===1?.18:0);u<o&&(o=u,r=h)}return r}update(t,e,n,s,r,o){this.cursor=0;const c=.65+.35*Math.max(0,Math.sin((o-.25)*Math.PI*2));for(const a of t)Math.hypot(a.x-s.x,a.y-s.y,a.z-s.z)<60&&this.figure(a,c);for(const a of e){const{x:l,y:h,z:u}=kh(a.key);if(Math.hypot(l-s.x,h-s.y,u-s.z)>64)continue;const f=this.fireOrigin(l,h,u,s),d=Math.sin(r*13+a.key)*.1;this.local.rotation.set(0,r*.8+a.key,0);for(let v=0;v<3;v++)this.local.position.set(f.x+(v-1)*.21,f.y+v%2*.2+d,f.z),this.local.scale.set(.35+v*.08,.6+d*2-v*.055,.29+v*.09),this.local.updateMatrix(),this.put(this.local,ab[v]);const p=(r*1.5+a.key)%1;this.local.position.set(f.x-.06+p*.32,f.y+.57+p*.7,f.z-.02),this.local.scale.setScalar(.21+p*.22),this.local.updateMatrix(),this.put(this.local,6509645)}for(const a of n){this.direction.set(a.to.x-a.from.x,a.to.y-a.from.y,a.to.z-a.from.z);const l=this.direction.length();l<.05||(this.local.position.set((a.from.x+a.to.x)/2,(a.from.y+a.to.y)/2,(a.from.z+a.to.z)/2),this.local.quaternion.setFromUnitVectors(this.up,this.direction.multiplyScalar(1/l)),this.local.scale.set(.032,l,.032),this.local.updateMatrix(),this.put(this.local,a.color))}this.mesh.count=this.cursor,this.mesh.visible=this.cursor>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){this.scene.remove(this.mesh),this.mesh.dispose(),this.geometry.dispose(),this.material.dispose()}}const vc=i=>({x:Math.floor(i.x)+.5,y:Math.round(i.y),z:Math.floor(i.z)+.5}),Be=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),dr=1e-5,Ya=i=>Math.floor(i.x)+Et*(Math.floor(i.z)+Et*Math.round(i.y)),lb=[[1,0],[0,1],[-1,0],[0,-1]];function Ze(i,t,e,n=!1){const s=Math.floor(t.x-e.radius+dr),r=Math.floor(t.x+e.radius-dr),o=Math.floor(t.z-e.radius+dr),c=Math.floor(t.z+e.radius-dr),a=Math.floor(t.y+dr),l=Math.floor(t.y+e.height-dr);if(s<0||o<0||a<1||r>=Et||c>=Et||l>=Ke)return!1;for(let h=a;h<=l;h++)for(let u=o;u<=c;u++)for(let f=s;f<=r;f++){const d=i.get(f,h,u);if(ri(d)||n&&d===13)return!1}return!0}function Vs(i,t,e){return Math.abs(t.y-Math.round(t.y))<.002&&!Ze(i,{...t,y:t.y-.003},e)}function am(i,t,e){const n=[];for(const[s,r]of lb){const o={x:t.x+s,y:t.y,z:t.z+r};for(const c of[0,1,-1])if(o.y=t.y+c,!(!Ze(i,o,e,!0)||!Vs(i,o,e))&&!(c===1&&!Ze(i,{...t,y:o.y},e,!0))&&!(c===-1&&!Ze(i,{...o,y:t.y},e,!0))){n.push({...o});break}}return n}function cm(i,t,e,n,s,r){const o=vc(t),c=vc(e);if(!Ze(i,o,n,!0)||!Vs(i,o,n))return[];const a=p=>Math.abs(p.x-c.x)+Math.abs(p.z-c.z)+.6*Math.abs(p.y-c.y),l={p:o,g:0,h:a(o),parent:null},h=[l],u=new Map([[Ya(o),0]]);let f=l;for(let p=0;h.length&&p<96&&!(performance.now()>=s);p++){let v=0;for(let m=1;m<h.length;m++){const _=h[m],b=h[v];(_.g+_.h<b.g+b.h||_.g+_.h===b.g+b.h&&_.h<b.h)&&(v=m)}const[g]=h.splice(v,1);if(g.g===u.get(Ya(g.p))){if(g.h<f.h&&(f=g),g.h<.01)break;for(const m of am(i,g.p,n)){if(Math.abs(m.x-o.x)>14||Math.abs(m.z-o.z)>14)continue;const _=Ya(m),b=g.g+1+.25*Math.abs(m.y-g.p.y);r?.has(_)||b>=(u.get(_)??1/0)||(u.set(_,b),h.push({p:m,g:b,h:a(m),parent:g}))}}}const d=[];for(let p=f;p?.parent;p=p.parent)d.push(p.p);return d.reverse()}const mr={resident:{radius:.33,height:1.8},sheriff:{radius:.33,height:1.8},horse:{radius:.475,height:1.85},bandit:{radius:.33,height:1.8},gang:{radius:.33,height:1.8}},Dl={resident:"町の住民",sheriff:"保安官",horse:"馬",bandit:"盗賊",gang:"ギャング"},gd=[10643783,14728851],hb=["エイダ","ルイス","ノラ"],vd=[5537137,11299396,10847574],xo={bandit:{color:10899525,health:42,pace:2.55},gang:{color:7623801,health:56,pace:2.27}},ja=100,ub=16,Ka=58,_d=i=>i.kind==="horse"?1.22:i.kind==="sheriff"?2.65:Nn(i)?xo[i.kind].pace:1.32,Nn=i=>i.kind==="bandit"||i.kind==="gang",xd=[[1,0],[-1,0],[0,1],[0,-1]],An=(i,t)=>Math.hypot(i.x-t.x,i.y-t.y,i.z-t.z),Pa=i=>({x:i.x+.5,y:i.y+.5,z:i.z+.5});function fb(i){return typeof i.x=="number"&&Number.isFinite(i.x)&&i.x>=1&&i.x<Et-1&&typeof i.y=="number"&&Number.isFinite(i.y)&&i.y>=1&&i.y<Ke-2&&typeof i.z=="number"&&Number.isFinite(i.z)&&i.z>=1&&i.z<Et-1}function lm(i){if(!i||typeof i!="object")return!1;const t=i;return Number.isInteger(t.health)&&t.health>=0&&t.health<=ja&&Number.isInteger(t.fireBudget)&&t.fireBudget>=0&&t.fireBudget<=qa&&typeof t.raidIn=="number"&&Number.isFinite(t.raidIn)&&t.raidIn>=0&&t.raidIn<=Ka&&Array.isArray(t.raiders)&&t.raiders.length<=4&&t.raiders.every(e=>e&&(e.kind==="bandit"||e.kind==="gang")&&fb(e)&&Number.isFinite(e.yaw)&&Math.abs(e.yaw)<=Math.PI*2&&Number.isInteger(e.hp)&&e.hp>0&&e.hp<=xo[e.kind].health)&&nb(t.fires)}function zh(i){const t=Math.cos(i.pitch);return{x:-Math.sin(i.yaw)*t,y:Math.sin(i.pitch),z:-Math.cos(i.yaw)*t}}const Ia=i=>({x:i.x,y:i.y+Ws(i),z:i.z}),ei=i=>({x:i.x,y:i.y+1.36,z:i.z}),hm=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function db(i,t,e){const n=zh(t);for(let s=0;s<e;s+=4.9){const r={...t,...hm(t,n,s)},o=$n(i,r,Math.min(5,e-s));if(o)return{...o,distance:o.distance+s}}return null}function pb(i,t,e,n){const{radius:s,height:r}=mr[e.kind];let o=0,c=n;for(const a of["x","y","z"]){const l=e[a]-(a==="y"?0:s),h=e[a]+(a==="y"?r:s),u=t[a];if(Math.abs(u)<1e-9){if(i[a]<l||i[a]>h)return 1/0}else{const f=(l-i[a])/u,d=(h-i[a])/u;if(o=Math.max(o,Math.min(f,d)),c=Math.min(c,Math.max(f,d)),c<o)return 1/0}}return o}function io(i,t,e,n=!1){const s=Math.max(1,Math.ceil(An(t,e)*5)),r=Math.floor(e.x),o=Math.floor(e.y),c=Math.floor(e.z);for(let a=1;a<=s;a++){const l=a/s,h=Math.floor(t.x+(e.x-t.x)*l),u=Math.floor(t.y+(e.y-t.y)*l),f=Math.floor(t.z+(e.z-t.z)*l);if(n&&h===r&&u===o&&f===c)return!0;if(ri(i.get(h,u,f)))return!1}return!0}function yd(i,t,e,n=2){for(let s=0;s<=n;s++)for(let r=-s;r<=s;r++)for(let o=-s;o<=s;o++){if(Math.max(Math.abs(o),Math.abs(r))!==s)continue;const c=vc({x:t.x+o,y:t.y,z:t.z+r});for(const a of[0,1,-1,2,-2]){const l={...c,y:c.y+a};if(Ze(i,l,e,!0)&&Vs(i,l,e))return l}}return null}class mb{constructor(t,e){this.world=t,this.fire=new ib(t),this.view=new cb(e,t);for(const n of t.frontierStructures){const s=Ce(n.x,n.y,n.z);this.town.set(s,n),t.get(n.x,n.y,n.z)===0&&this.damage.add(s),(n.id===5||n.id===7)&&n.y>=33&&n.y<=34&&xd.some(([r,o])=>t.get(n.x+r,n.y,n.z+o)===0)&&this.raidTargets.push(n)}this.add("sheriff","保安官クレイ",4747162,Zo.sheriff);for(const[n,s]of Zo.residents.entries())this.add("resident",hb[n]??"町の住民",vd[n]??vd[0],s);for(const[n,s]of Zo.horses.entries())this.add("horse",n===0?"栗毛の馬":"白たてがみの馬",gd[n]??gd[0],s);this.unsubscribe=t.onEdit((n,s,r)=>{const o=Ce(n,s,r);this.town.has(o)&&(t.get(n,s,r)===0?this.damage.add(o):this.damage.delete(o));for(const c of this.actors)c.path.some(a=>Math.abs(a.x-(n+.5))<1.25&&Math.abs(a.z-(r+.5))<1.25&&Math.abs(a.y-s)<2.1)&&(c.path=[],c.ready=0)})}world;health=ja;fire;view;town=new Map;damage=new Set;raidTargets=[];actors=[];trails=[];events=[];unsubscribe;clock=0;raidAt=ub;warned=!1;round=0;nextPlan=0;cursor=0;damageReady=0;actionReady=0;townFire=!1;add(t,e,n,s,r){const o=mr[t],c=yd(this.world,r??s,o,4);if(!c)return;const a={...c,kind:t,name:e,color:n,home:{...s},yaw:r?.yaw??Math.PI*.96,moving:!1,stride:0,hp:r?.hp??(t==="bandit"||t==="gang"?xo[t].health:ja),path:[],goal:null,ready:this.clock+.12+this.actors.length*.085,work:this.clock+.7,vy:0};this.actors.push(a)}inform(t){this.events.length<5&&this.events.push(t)}consumeEvent(){return this.events.shift()}restoreHealth(){this.health=ja,this.damageReady=this.clock+2.5,this.events.length=0}save(){return{health:this.health,raidIn:Math.min(Ka,Math.max(0,this.raidAt-this.clock)),fires:this.fire.save(),fireBudget:this.fire.budget,raiders:this.actors.filter(Nn).map(({kind:t,x:e,y:n,z:s,yaw:r,hp:o})=>({kind:t,x:e,y:n,z:s,yaw:r,hp:o}))}}restore(t){if(lm(t)){for(let e=this.actors.length-1;e>=0;e--)Nn(this.actors[e])&&this.actors.splice(e,1);this.health=t.health,this.raidAt=this.clock+t.raidIn,this.warned=t.raidIn<=5,this.fire.restore(t.fires,t.fireBudget);for(const e of t.raiders)this.add(e.kind,Dl[e.kind],xo[e.kind].color,e,e)}}aimedActor(t,e,n){const s=Ia(t),r=zh(t);let o,c=Math.min(e,n);for(const a of this.actors){const l=pb(s,r,a,c);l>=c||(c=l,o=a)}return o?{actor:o,distance:c}:null}targetLabel(t){const e=$n(this.world,t);if(e&&this.fire.has(e.x,e.y,e.z))return"燃えているブロック　操作で消火";const n=this.aimedActor(t,5,e?.distance??1/0)?.actor;return n?n.name+(n.kind==="resident"?"（修理）":""):null}interact(t){const e=$n(this.world,t);if(e&&this.fire.extinguish(e.x,e.y,e.z))return"火を消しました。";const n=this.aimedActor(t,5,e?.distance??1/0)?.actor;if(!n)return null;if(Nn(n))return"町を襲う"+Dl[n.kind]+"です。";switch(n.yaw=Math.atan2(n.x-t.x,n.z-t.z),n.kind){case"sheriff":return"クレイ「襲撃には私も応戦する。建物にも気をつけてくれ。」";case"horse":return n.name+"が耳をぴくりと動かした。";default:return n.name+"「壊れた町の建物は私たちで直すよ。建築区画は君が自由に使っていい。」"}}occupies(t,e,n){return this.actors.some(s=>{const r=mr[s.kind];return t<s.x+r.radius&&t+1>s.x-r.radius&&n<s.z+r.radius&&n+1>s.z-r.radius&&e<s.y+r.height&&e+1>s.y+1e-5})}trail(t,e,n){this.trails.length>=12&&this.trails.shift(),this.trails.push({from:t,to:e,color:n,until:this.clock+.19})}defeat(t){this.actors.splice(this.actors.indexOf(t),1),this.actors.some(Nn)||(this.inform("襲撃をしのいだ！ 住民たちが町の修理を始めます。"),this.raidAt=this.clock+Ka,this.warned=!1)}action(t,e){const n=e===36,s=e===35||e===38;if(!n&&!s&&e!==34)return{ok:!1,message:"装備を選んでください。"};if(this.clock<this.actionReady)return{ok:!1,message:""};const r=n?5:s?16:20,o=db(this.world,t,r),c=this.aimedActor(t,r,o?.distance??1/0);if(n&&(!o||c))return{ok:!1,message:"たいまつを当てるブロックに照準を合わせてください。"};const a=Ia(t),l=c?.distance??o?.distance??r,h=hm(a,zh(t),l),u={x:a.x+.24*Math.cos(t.yaw),y:a.y-.22,z:a.z-.24*Math.sin(t.yaw)};if(n&&o)return this.fire.ignite(o.x,o.y,o.z)?(this.actionReady=this.clock+.28,this.trail(u,h,16756060),{ok:!0,message:"たいまつを当てました。木や葉に火が広がります。"}):{ok:!1,message:"ここには火をつけられません。"};if(this.actionReady=this.clock+(s?.53:.34),this.trail(u,h,s?16750671:16768661),c){if(!Nn(c.actor))return{ok:!0,message:"発射しました。味方と馬にダメージは入りません。"};c.actor.hp-=s?27:23;const f=c.actor.name,d=c.actor.hp<=0;return d&&this.defeat(c.actor),{ok:!0,message:d?f+"を追い払った！":f+"に命中！"}}return s&&o&&this.fire.ignite(o.x,o.y,o.z)?{ok:!0,message:"火矢が着弾しました。"}:{ok:!0,message:s?"火矢を放ちました。":"リボルバーを発射しました。"}}raid(t){if(!(this.actors.some(Nn)||t.x<ao.minX-22||t.x>ao.maxX+22||t.z<ao.minZ-22||t.z>ao.maxZ+22)&&(!this.warned&&this.clock>=this.raidAt-5&&(this.warned=!0,this.inform("町に盗賊とギャングが近づいています。")),!(this.clock<this.raidAt))){this.round++;for(const[e,n]of Zo.raidSpawns.entries()){const s=(e+this.round)%3===0?"gang":"bandit";this.add(s,Dl[s],xo[s].color,n)}this.raidAt=this.clock+Ka,this.actors.some(Nn)?this.inform("襲撃開始！ 保安官が町を守っています。"):this.warned=!1}}damagedNear(t,e=26,n){let s,r=1/0;for(const o of this.damage){const c=this.town.get(o),a=Math.hypot(c.x+.5-t.x,c.z+.5-t.z),l=a+Math.max(0,c.y-t.y)*.035;a>e||l>=r||n&&!n(c)||(r=l,s=c)}return s}attackNear(t){let e,n=1/0;for(const s of this.raidTargets){const r=Be(t,Pa(s));r>=n||this.world.get(s.x,s.y,s.z)!==s.id||this.fire.has(s.x,s.y,s.z)||(n=r,e=s)}return e}approach(t,e){let n,s=1/0;for(const[r,o]of xd){const c={x:e.x+r+.5,y:t.y,z:e.z+o+.5},a=yd(this.world,c,mr[t.kind],0);if(!a)continue;const l=Be(t,a);l<s&&(s=l,n=a)}return n??{x:e.x+.5,y:t.y,z:e.z+.5}}wander(t){const e=Math.floor(this.clock/3)+this.actors.indexOf(t)*33,n=Yt(e,37,this.world.salt)*Math.PI*2,s=2+Yt(e,93,this.world.salt)*6;return{x:t.home.x+Math.cos(n)*s,z:t.home.z+Math.sin(n)*s,y:t.home.y}}plan(t,e,n){const s=this.world;let r;if(t.ready=this.clock+(Nn(t)?.69:1.1),Nn(t))if(An(t,e)<10&&io(s,ei(t),Ia(e)))r=e;else{const o=this.attackNear(t);r=o?this.approach(t,o):{...s.spawn(),z:s.spawn().z-10}}else if(t.kind==="sheriff"&&n.length){const o=n.reduce((c,a)=>An(t,c)<=An(t,a)?c:a);if(An(t,o)<=13&&io(s,ei(t),ei(o))){t.path=[],t.goal=null;return}r=o}else if(t.kind==="resident"){const o=!this.townFire&&!n.some(c=>An(c,t)<9)&&this.damagedNear(t);r=o?this.approach(t,o):this.wander(t)}else r=this.wander(t);t.goal={...r},t.path=cm(s,t,r,mr[t.kind],performance.now()+1.2)}walk(t,e,n){t.moving=!1;const s=mr[t.kind],r=this.world;if(!Ze(r,t,s))return;if(!Vs(r,t,s)){t.vy=Math.max(-13,t.vy-20*e);const h={...t,y:t.y+t.vy*e};Ze(r,h,s)?t.y=h.y:(t.y=Math.ceil(h.y-1e-5),t.vy=0);return}t.y=Math.round(t.y),t.vy=0;const o=t.path[0];if(!o)return;const c=Be(t,o);if(c<.03){t.path.shift();return}const a=Math.min(1,_d(t)*e/c),l={x:t.x+(o.x-t.x)*a,y:t.y,z:t.z+(o.z-t.z)*a};if(!Ze(r,l,s,!0)){const h={...l,y:t.y+1};if(o.y!==h.y||!Ze(r,{...t,y:h.y},s,!0)||!Ze(r,h,s,!0)){t.path=[],t.ready=0;return}l.y=h.y}Math.abs(l.y-n.y)<1.7&&Be(l,n)<s.radius+.27&&Be(l,n)<Be(t,n)||Ze(r,l,s,!0)&&(t.yaw=Math.atan2(t.x-o.x,t.z-o.z),Object.assign(t,l),t.moving=!0,t.stride=(t.stride+_d(t)*e*7)%(Math.PI*2))}acts(t,e,n){if(!(t.work>this.clock)){if(t.work=this.clock+.18,Nn(t)){if(An(t,e)<1.65&&io(this.world,ei(t),Ia(e))){this.damageReady<=this.clock&&this.health>0&&(this.damageReady=this.clock+1.35,this.health=Math.max(0,this.health-(t.kind==="bandit"?11:14)),this.inform(this.health===0?"町へ退避しました。":t.name+"の攻撃！ 体力 "+this.health),t.work=this.clock+.72);return}const s=this.attackNear(t);if(!s||Be(t,Pa(s))>2.25||!io(this.world,ei(t),Pa(s),!0))return;t.yaw=Math.atan2(t.x-s.x-.5,t.z-s.z-.5),t.kind==="gang"?(this.fire.ignite(s.x,s.y,s.z,!1)&&(this.trail(ei(t),Pa(s),16749914),this.inform("ギャングが木の建物に火をつけた！")),t.work=this.clock+2.7):(this.world.set(s.x,s.y,s.z,0),t.work=this.clock+1.65),t.path=[]}else if(t.kind==="sheriff"){const s=n.filter(o=>o.hp>0&&An(o,t)<=13&&io(this.world,ei(t),ei(o)));if(!s.length)return;const r=s.reduce((o,c)=>An(t,o)<=An(t,c)?o:c);t.yaw=Math.atan2(t.x-r.x,t.z-r.z),this.trail(ei(t),ei(r),16767121),r.hp-=13,r.hp<=0&&this.defeat(r),t.work=this.clock+.73}else if(t.kind==="resident"&&!this.townFire&&!n.some(s=>s.hp>0&&An(s,t)<9)){const s=this.damagedNear(t,3.7,r=>Math.abs(t.y-r.y)<=8&&!Wo(e,r.x,r.y,r.z)&&!this.occupies(r.x,r.y,r.z));if(!s)return;this.world.set(s.x,s.y,s.z,s.id),t.work=this.clock+.42}}}update(t,e,n=.4){if(!Number.isFinite(e)||e<=0)return;const s=Math.min(.12,e);this.clock+=s,this.fire.step(s),this.townFire=!1;for(const o of this.fire.records())if(this.town.has(o.key)){this.townFire=!0;break}this.raid(t);const r=this.actors.filter(Nn);if(this.actors.length&&this.clock>=this.nextPlan){this.nextPlan=this.clock+.05;for(let o=0;o<this.actors.length;o++){const c=this.actors[this.cursor++%this.actors.length];if(!(c.ready>this.clock||An(c,t)>88)){this.plan(c,t,r);break}}}for(const o of[...this.actors])o.hp>0&&An(o,t)<88&&(this.walk(o,s,t),this.acts(o,t,r));for(;this.trails.length&&this.trails[0].until<=this.clock;)this.trails.shift();this.view.update(this.actors,this.fire.records(),this.trails,t,this.clock,n)}dispose(){this.unsubscribe(),this.view.dispose()}}const ws=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,so=(i,t,e)=>ws(i,t,e)&&Number.isInteger(i),Ul=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),Nl=(i,t)=>typeof i=="string"&&i.trim().length>0&&i.length<=t;function gb(){try{return fp(JSON.parse(localStorage.getItem("tk777.webcraft.settings")||"null"))}catch{}return{...up}}function vb(i){try{localStorage.setItem("tk777.webcraft.settings",JSON.stringify(i))}catch{}}function Oh(i){if(!Ul(i)||i.format!=="webcraft777")throw new Error("ウェブクラフト777のワールドファイルを選んでください。");const t=i.version===1&&i.generator===1;if(!t&&(i.version!==2||i.generator!==1&&i.generator!==2))throw new Error("この保存形式または地形バージョンには対応していません。");const e=i.stage===void 0?"classic":i.stage;if(!ts(e)||e!=="classic"&&i.generator!==2||i.frontier!==void 0&&(e!=="frontier"||!lm(i.frontier))||i.sharkDefeated!==void 0&&typeof i.sharkDefeated!="boolean")throw new Error("ステージまたは生き物の保存情報が正しくありません。");if(t&&(!Ul(i.settings)||!["distance","scale","shadows","sensitivity","volume","muted"].every(a=>Object.hasOwn(i.settings,a))))throw new Error("旧ワールドの設定が欠けています。元のバックアップを確認してください。");const n=t?fp(i.settings):i.settings,s=t?op():i.fixtures,r=t?cp():i.journey;if(!ap(s)||!lp(r))throw Error("設備または探検記録を読めません。元のバックアップを確認してください。");const o=i.pose;if(!Nl(i.id,64)||!/^[a-zA-Z0-9-]+$/.test(i.id)||!Nl(i.name,64)||!Nl(i.seed,128)||i.mode!=="creative"&&i.mode!=="explore"||!so(i.revision,0,Number.MAX_SAFE_INTEGER)||!so(i.updatedAt,0,864e13)||!Ul(o)||!ws(o.x,0,256)||!ws(o.z,0,256)||!ws(o.y,-10,130)||!ws(o.yaw,-1e7,1e7)||!ws(o.pitch,-Math.PI/2,Math.PI/2)||!ws(i.day,0,1)||typeof i.guideSeen!="boolean"||typeof i.flying!="boolean"||o.crouched!==void 0&&typeof o.crouched!="boolean"||!so(i.selected,0,8)||!Zh(n)||!qh(i.bag))throw new Error("ワールド情報・設定または所持品のデータが正しくありません。");if(t&&(i.bag.hotbar.some(a=>a>20)||i.bag.slots.some(a=>a.id>20)))throw new Error("旧ワールドの所持品に未対応の素材があります。");if(!Array.isArray(i.edits)||i.edits.length>256*256*95)throw new Error("ブロック変更のデータが正しくありません。");const c=new Map;for(const a of i.edits){if(!Array.isArray(a)||a.length!==2||!so(a[0],65536,256*256*96-1)||!(t?so(a[1],0,13):wo(a[1]))||c.has(a[0]))throw new Error("ブロック変更に範囲外または重複した座標があります。");c.set(a[0],a[1])}if(s.chests.some(([a])=>c.get(a)!==22)||s.benches.some(([a])=>c.get(a)!==21)||s.axes.some(([a])=>c.has(a)&&c.get(a)!==5))throw Error("設備と建築記録が一致しません。");return{...i,version:2,stage:e,settings:n,fixtures:s,journey:r}}function _b(i){let t;try{t=JSON.parse(i)}catch{throw new Error("ファイルを読めません。書き出したJSONファイルを選んでください。")}return{save:Oh(t),original:t.version===1?t:void 0}}const xb=i=>JSON.stringify(i);class yb{constructor(t="tk777.webcraft777.v1"){this.database=t}database;connection;open(){return this.connection?this.connection:(this.connection=new Promise((t,e)=>{const n=indexedDB.open(this.database,2);n.onupgradeneeded=()=>{for(const s of["worlds","directory","originals"])n.result.objectStoreNames.contains(s)||n.result.createObjectStore(s,{keyPath:"id"})},n.onsuccess=()=>{n.result.onversionchange=()=>{n.result.close(),this.connection=void 0},t(n.result)},n.onerror=()=>e(n.error),n.onblocked=()=>e(new Error("ほかのタブのゲームを閉じてから、もう一度お試しください。"))}).catch(t=>{throw this.connection=void 0,t}),this.connection)}async list(){const t=await this.open();return new Promise((e,n)=>{const s=t.transaction(["directory","originals"]),r=s.objectStore("directory").getAll(),o=s.objectStore("originals").getAllKeys();s.oncomplete=()=>{const c=new Set(o.result);e(r.result.map(a=>({...a,hasOriginal:a.schemaVersion!==2||c.has(a.id)})).sort((a,l)=>l.updatedAt-a.updatedAt))},s.onabort=()=>n(s.error)})}async original(t){const e=await this.open();return new Promise((n,s)=>{const r=e.transaction(["originals","worlds"]).objectStore("originals").get(t);r.onsuccess=()=>{if(r.result){n(r.result);return}const o=r.transaction.objectStore("worlds").get(t);o.onsuccess=()=>n(o.result?.version===1?o.result:void 0),o.onerror=()=>s(o.error)},r.onerror=()=>s(r.error)})}async get(t){const e=await this.open(),n=await new Promise((s,r)=>{const o=e.transaction("worlds").objectStore("worlds").get(t);o.onsuccess=()=>s(o.result),o.onerror=()=>r(o.error)});if(n!==void 0)return Oh(n)}async write(t,e){const n=Oh(t),s=await this.open();return new Promise((r,o)=>{const c=s.transaction(["directory","worlds","originals"],"readwrite"),a=c.objectStore("directory"),l=a.get(t.id);let h,u=!1;l.onsuccess=()=>{if((l.result?.revision??null)!==e){u=!0,c.abort();return}const f=c.objectStore("worlds"),d=f.get(t.id);d.onsuccess=()=>{const A=d.result?.version===1?d.result:t.version===1?t:null;if(A){const w=c.objectStore("originals"),R=w.getKey(t.id);R.onsuccess=()=>{R.result===void 0&&w.add(A)}}},h={...n,revision:(e??0)+1,updatedAt:Date.now()};const{id:p,name:v,seed:g,mode:m,stage:_,updatedAt:b,revision:y}=h;c.objectStore("worlds").put(h),a.put({id:p,name:v,seed:g,mode:m,stage:_,updatedAt:b,revision:y,schemaVersion:2})},c.oncomplete=()=>r(h),c.onabort=()=>o(u?new Error("別のタブでこのワールドが保存されています。ワールド一覧から読み直してください。"):c.error??new Error("保存が中断されました。"))})}}const Md=900,bd=260,Mb=300,bb=7e3,Sb=12e3,Sd=12e3,Eb=1400,wb=1e4,Bh=10,Za=i=>i==="tag"||i==="cops",Tb={400:"部屋名・ニックネーム・合言葉を確認してください。",401:"部屋との接続が切れました。合言葉を入れて参加し直してください。",403:"このページからは部屋に接続できません。",404:"部屋が見つかりません。合言葉を確認してください。",409:"部屋が現在いっぱいです。",410:"部屋の有効期限が切れました。新しい部屋を作ってください。",426:"ゲームを再読み込みして、最新版でルームに入り直してください。",429:"通信が集中しています。少し待ってからお試しください。"};class Us extends Error{constructor(t,e,n=0){super(e==="invalid-response"?"部屋から正しい応答を受け取れませんでした。":e==="round-started"?"この鬼ごっこは始まっています。次のルームに参加してください。":e==="room-finished"?"この鬼ごっこは終了しました。新しいルームに参加してください。":Tb[t]??"マルチプレイに接続できませんでした。通信環境を確認してください。"),this.status=t,this.code=e,this.retryAfter=n,this.name="OnlineError"}status;code;retryAfter}function $e(){throw new Us(0,"invalid-response")}function xn(i){return i&&typeof i=="object"&&!Array.isArray(i)?i:void 0}function ks(i,t){return typeof i=="string"&&i.length>0&&i.length<=t}function Qe(i,t,e){return typeof i=="number"&&Number.isSafeInteger(i)&&i>=t&&i<=e}function uo(i,t,e){return typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e}function Ii(i){return ks(i,64)&&/^[a-z0-9_-]+$/i.test(i)}function La(i){return i===1||i===3||i===5||i===10||i===15}function Ed(i){const t=xn(i),e=xn(t?.room);return!t||!e||typeof e.code!="string"||!/^[A-Z0-9]{8}$/.test(e.code)||!ks(e.name,120)||!ks(e.seed,128)||e.generator!==2||e.mode!==void 0&&e.mode!=="explore"&&e.mode!=="creative"&&e.mode!=="tag"&&e.mode!=="cops"||e.stage!==void 0&&!ts(e.stage)||e.tagMinutes!==void 0&&(e.mode!=="tag"&&e.mode!=="cops"||!La(e.tagMinutes))||e.mode==="cops"&&(!ts(e.stage)||!La(e.tagMinutes))||e.tagBots!==void 0&&(!Qe(e.tagBots,0,4)||e.tagBots>0&&(!La(e.tagMinutes)||!_o(e.mode,e.stage)))||!Qe(e.createdAt,1,Number.MAX_SAFE_INTEGER)||!Ii(t.id)||!ks(t.token,256)||t.token.length<16||!/^[a-z0-9_.-]+$/i.test(t.token)?$e():{id:t.id,token:t.token,room:{code:e.code,name:e.name,seed:e.seed,generator:e.generator,createdAt:e.createdAt,mode:e.mode==="explore"||e.mode==="tag"||e.mode==="cops"?e.mode:"creative",stage:ts(e.stage)?e.stage:"classic",...La(e.tagMinutes)?{tagMinutes:e.tagMinutes}:{},...Qe(e.tagBots,1,4)?{tagBots:e.tagBots}:{}}}}function Ab(i){const t=xn(i),e=xn(t?.pose);if(!t||!e||!Ii(t.id)||!ks(t.nickname,80)||!uo(e.x,0,Et)||!uo(e.y,0,Ke)||!uo(e.z,0,Et)||!uo(e.yaw,-Math.PI*2,Math.PI*2)||typeof e.moving!="boolean"||typeof e.crouched!="boolean"||typeof e.flying!="boolean")return;const{x:n,y:s,z:r,yaw:o,moving:c,crouched:a,flying:l}=e;return{id:t.id,nickname:t.nickname,pose:{x:n,y:s,z:r,yaw:o,moving:c,crouched:a,flying:l},...t.cpu===!0?{cpu:!0}:{},...Qe(t.poseAt,1,Number.MAX_SAFE_INTEGER)?{poseAt:t.poseAt}:{}}}function Rb(i,t,e){const n=xn(i);return!n||!Qe(n.key,Et*Et,Et*Et*Ke-1)||!Qe(n.block,0,33)||n.block>12&&n.block!==21&&n.block!==23&&n.block<25||n.axis!=="y"&&!(n.block===5&&(n.axis==="x"||n.axis==="z"))||!Qe(n.revision,t+1,e)?$e():{key:n.key,block:n.block,axis:n.axis,revision:n.revision}}function Ps(i){return!Array.isArray(i)||i.length>6||!i.every(Ii)||new Set(i).size!==i.length?$e():i}function Cb(i,t){const e=xn(i);if(!e||e.it!==null&&!Ii(e.it)||e.previousIt!==null&&!Ii(e.previousIt)||e.phase!=="waiting"&&e.phase!=="hiding"&&e.phase!=="playing"&&e.phase!=="finished"||!Qe(e.hideUntil,0,Number.MAX_SAFE_INTEGER)||!Qe(e.seq,0,Number.MAX_SAFE_INTEGER))return $e();const n=Qe(e.endsAt,0,Number.MAX_SAFE_INTEGER)?e.endsAt:void 0,s=Qe(e.serverNow,1,Number.MAX_SAFE_INTEGER)?e.serverNow:void 0;if(t&&(n===void 0||s===void 0||e.phase!=="waiting"&&(!e.it||n<=e.hideUntil)))return $e();const r=e.enrolledIds===void 0?void 0:Ps(e.enrolledIds),o=e.winnerIds===void 0?[]:Ps(e.winnerIds),c=[];if(e.results!==void 0){if(!Array.isArray(e.results)||e.results.length>6)return $e();for(const a of e.results){const l=xn(a);if(!l||!Ii(l.id)||!ks(l.nickname,80))return $e();c.push({id:l.id,nickname:l.nickname})}}if(e.phase==="finished"){const a=new Set(c.map(l=>l.id));if(!t||e.it===null||o.includes(e.it)||!a.has(e.it)||!o.every(l=>a.has(l))||a.size!==o.length+1||c.length!==a.size)return $e()}return{it:e.it,previousIt:e.previousIt,phase:e.phase,hideUntil:e.hideUntil,seq:e.seq,endsAt:n??0,serverNow:s,enrolledIds:r,winnerIds:o,results:c}}function Pb(i){const t=xn(i);if(!t||t.phase!=="waiting"&&t.phase!=="hiding"&&t.phase!=="playing"&&t.phase!=="finished"||!Qe(t.hideUntil,0,Number.MAX_SAFE_INTEGER)||!Qe(t.endsAt,0,Number.MAX_SAFE_INTEGER)||!Qe(t.serverNow,1,Number.MAX_SAFE_INTEGER)||!Qe(t.seq,0,Number.MAX_SAFE_INTEGER)||t.winner!==null&&t.winner!=="police"&&t.winner!=="robbers"||t.phase==="finished"!=!!t.winner||!Array.isArray(t.results)||t.results.length>6)return $e();const e=[];for(const s of t.results){const r=xn(s);if(!r||!Ii(r.id)||!ks(r.nickname,80))return $e();e.push({id:r.id,nickname:r.nickname})}let n=null;if(t.event!=null){const s=xn(t.event);if(!s||s.kind!=="capture"&&s.kind!=="rescue"||!Ii(s.by))return $e();n={kind:s.kind,ids:Ps(s.ids),by:s.by}}return{phase:t.phase,hideUntil:t.hideUntil,endsAt:t.endsAt,serverNow:t.serverNow,seq:t.seq,policeIds:Ps(t.policeIds),jailedIds:Ps(t.jailedIds),enrolledIds:Ps(t.enrolledIds),winner:t.winner,winnerIds:Ps(t.winnerIds),results:e,event:n}}function Ib(i){if(i===void 0)return[];if(!Array.isArray(i)||i.length>6)return $e();const t=new Set,e=new Set;return i.map(n=>{const s=xn(n);if(!s||s.id!=="swings"&&s.id!=="seesaw"||!Qe(s.seat,0,s.id==="swings"?1:3)||!Ii(s.memberId)||!uo(s.pump,-1,1))return $e();const r=s.id+"/"+s.seat;return t.has(r)||e.has(s.memberId)?$e():(t.add(r),e.add(s.memberId),{id:s.id,seat:s.seat,memberId:s.memberId,pump:s.pump})})}function Lb(i,t,e,n,s){const r=xn(i);if(!r||!Qe(r.revision,t,Number.MAX_SAFE_INTEGER)||!Array.isArray(r.cells)||r.cells.length>wb||!Array.isArray(r.players)||r.players.length>6)return $e();const o=r.revision,c=r.cells.map(f=>Rb(f,t,o));if(new Set(c.map(f=>f.key)).size!==c.length||o>t&&!c.some(f=>f.revision===o))return $e();const a=new Set([e]),l=[];for(const f of r.players){const d=Ab(f);!d||a.has(d.id)||(a.add(d.id),l.push(d))}let h;if(n){const f=xn(r.result);if(!f||typeof f.ok!="boolean")return $e();const d=typeof f.reason=="string"&&/^[a-z-]{1,32}$/.test(f.reason)?f.reason:void 0;h={ok:f.ok,...d?{reason:d}:{}}}const u=s.mode==="tag"?{tag:Cb(r.tag,!!s.tagMinutes)}:s.mode==="cops"?{cops:Pb(r.cops),rides:Ib(r.rides)}:{};return{frame:{revision:o,cells:c,players:l,...u},result:h}}function Db(i){if(!i)return 0;const t=/^\d+$/.test(i)?Number(i)*1e3:Date.parse(i)-Date.now();return Number.isFinite(t)?Math.min(Math.max(t,0),6e4):0}class Ub{constructor(t,e=globalThis.fetch.bind(globalThis)){this.fetcher=e;const n=new URL(t),s=["127.0.0.1","localhost","[::1]"].includes(n.hostname);if(n.username||n.password||n.protocol!=="https:"&&!(s&&n.protocol==="http:"))throw new Error("安全なマルチプレイ接続先を指定してください。");this.origin=n.origin}fetcher;origin;async create(t){const e=t.mode!==void 0&&Za(t.mode),n=Ed(await this.request("rooms",{...t,protocol:Bh}));if(t.mode&&n.room.mode!==t.mode||e&&n.room.tagMinutes!==(t.tagMinutes??5)||t.stage&&n.room.stage!==t.stage||(t.tagBots??0)!==(n.room.tagBots??0))throw this.leave(n),new Us(426,"mode-unavailable");return n}async join(t){return Ed(await this.request("join",{...t,protocol:Bh}))}start(t,e){return new Nb(t,e,(n,s)=>this.request("sync",n,s),()=>this.leave(t))}async leave(t){try{await this.request("leave",{code:t.room.code,token:t.token},void 0,!0)}catch{}}async request(t,e,n,s=!1){const r=new AbortController,o=()=>r.abort();n?.aborted&&o();const c=setTimeout(o,bb);n?.addEventListener("abort",o,{once:!0});try{const a=await this.fetcher(this.origin+"/api/webcraft/"+t,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},signal:r.signal,cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer",redirect:"error",keepalive:s});if(!a.ok){const l=xn(await a.json().catch(()=>{})),h=typeof l?.error=="string"&&/^[a-z0-9_-]{1,40}$/i.test(l.error)?l.error:"http";throw new Us(a.status,h,Db(a.headers.get("Retry-After")))}return await a.json().catch(()=>$e())}catch(a){throw a instanceof Us?a:new Us(0,"network")}finally{clearTimeout(c),n?.removeEventListener("abort",o)}}}const Da=()=>typeof document<"u"&&document.hidden;class Nb{constructor(t,e,n,s){this.connection=t,this.hooks=e,this.send=n,this.leave=s,typeof document<"u"&&document.addEventListener("visibilitychange",this.visibility),this.schedule(0)}connection;hooks;send;leave;currentState="connecting";revision=0;lastStart=-1/0;retryAt=0;failures=0;timer;running;pending;sent;clockSample;closed=!1;finished=!1;get state(){return this.currentState}edit(t){return this.closed||this.state!=="connected"||Da()?Promise.resolve({ok:!1,reason:"offline"}):this.pending?Promise.resolve({ok:!1,reason:"busy"}):new Promise(e=>{this.pending={edit:{...t},resolve:e},this.schedule(0)})}close(){this.closed||(this.stop(),this.leave())}visibility=()=>{if(!Da()){this.schedule(0);return}clearTimeout(this.timer),this.timer=void 0,this.pending&&this.pending!==this.sent&&this.finishEdit({ok:!1,reason:"interrupted"})};updateState(t){this.currentState!==t&&(this.currentState=t,this.hooks.onState(t))}schedule(t){if(this.closed||this.finished||this.running||Da())return;clearTimeout(this.timer);const e=performance.now(),n=Za(this.connection.room.mode)?bd:Mb,s=Math.max(e+t,this.lastStart+n,this.retryAt);this.timer=setTimeout(()=>{this.tick()},s-e)}finishEdit(t){const e=this.pending;this.pending=void 0,this.sent=void 0,e?.resolve(t)}stop(){this.closed=!0,clearTimeout(this.timer),this.timer=void 0,this.running?.abort(),this.finishEdit({ok:!1,reason:"closed"}),typeof document<"u"&&document.removeEventListener("visibilitychange",this.visibility)}estimatedServerTime(t){const e=this.clockSample;return e&&t-e.receivedAt<Sd?Math.round(t+e.offset):void 0}timeChaseFrame(t,e,n){const s=t.cops?.serverNow??t.tag?.serverNow;if(s===void 0)return;const r=n-e,o=this.clockSample;r<=Eb&&(!o||r<=o.rtt||n-o.receivedAt>=Sd)&&(this.clockSample={offset:s-(e+n)/2,rtt:r,receivedAt:n});const c=this.estimatedServerTime(n)??s;for(const a of t.players)a.poseAt!==void 0&&(a.sampleAgeMs=Math.max(0,Math.min(2e3,c-a.poseAt)))}async tick(){if(this.timer=void 0,this.closed||this.finished||this.running||Da())return;const t=new AbortController;this.running=t,this.lastStart=performance.now(),this.sent=this.pending;const e=this.sent,{room:n,token:s,id:r}=this.connection;let o=!1;try{const c=this.hooks.pose(),a=this.hooks.ride?.(),l=c&&Za(n.mode)?this.estimatedServerTime(performance.now()):void 0;o=!!(e&&c),e&&!o&&this.finishEdit({ok:!1,reason:"offline"});const h=await this.send({protocol:Bh,code:n.code,token:s,since:this.revision,pose:c,...e&&c?{edit:e.edit}:{},...l!==void 0?{sampleAt:l}:{},...a===void 0?{}:{ride:a}},t.signal);if(this.closed)return;const{frame:u,result:f}=Lb(h,this.revision,r,o,n);this.timeChaseFrame(u,this.lastStart,performance.now()),this.finished=u.tag?.phase==="finished"||u.cops?.phase==="finished",this.hooks.onFrame(u),this.revision=u.revision,this.failures=this.retryAt=0,this.updateState("connected"),e&&f&&this.finishEdit(f)}catch(c){if(this.closed)return;const a=c instanceof Us?c:new Us(0,"invalid-response");if(a.status===400&&o&&e?.edit.actionId){this.finishEdit({ok:!1,reason:"invalid"});return}if([400,401,403,404,409,410,426].includes(a.status)){this.stop(),this.hooks.onEnd?.(a);return}this.pending&&this.finishEdit({ok:!1,reason:o?"uncertain":"offline"}),this.updateState("reconnecting"),this.failures=Math.min(this.failures+1,5),this.retryAt=performance.now()+Math.max(a.retryAfter,Math.min(Sb,Md*2**(this.failures-1)))}finally{this.running=void 0;const c=Za(n.mode)?bd:Md;this.closed||this.schedule(this.pending?0:Math.max(0,this.lastStart+c-performance.now()))}}}function Fb(i){const t=Gd("explore");return i!=="classic"&&i!=="frontier"&&(t.slots=[{id:5,count:16},{id:15,count:8}],t.hotbar[0]=5),t}const um=(i,t)=>"tk777.webcraft.exploration."+JSON.stringify([i,t.trim()]),ro=(i,t,e)=>typeof i=="number"&&Number.isFinite(i)&&i>=t&&i<=e,kb=i=>i&&ro(i.x,0,Et)&&ro(i.y,0,Ke)&&ro(i.z,0,Et)&&ro(i.pitch,-Math.PI/2,Math.PI/2)&&ro(i.yaw,-Math.PI*2,Math.PI*2)&&(i.crouched===void 0||typeof i.crouched=="boolean");function zb(i){const t=i?.edit;return t&&qh(i?.after)&&typeof t.actionId=="string"&&/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(t.actionId)&&(i?.message===void 0||typeof i.message=="string"&&i.message.length<=150)&&Number.isSafeInteger(t.key)&&t.key>=Et*Et&&t.key<Et*Et*Ke&&Number.isSafeInteger(t.fromRevision)&&t.fromRevision>=0&&wo(t.before)&&wo(t.block)&&(t.axis==="x"||t.axis==="y"||t.axis==="z")}function Ob(i,t){try{const e=JSON.parse(sessionStorage.getItem(um(i,t))??"null");if(e&&qh(e.bag)&&Number.isInteger(e.selected)&&e.selected>=0&&e.selected<=8&&lp(e.journey)&&kb(e.pose)&&(e.pending===void 0||zb(e.pending)))return e}catch{}}function Bb(i,t,e){try{sessionStorage.setItem(um(i,t),JSON.stringify(e))}catch{}}const Ts={sheep:{radius:.43,height:1.22},cow:{radius:.48,height:1.43},villager:{radius:.32,height:1.81}};function Hb({x:i,y:t,z:e}){return[i,t,e].every(Number.isFinite)&&i>=0&&i<Et&&e>=0&&e<Et&&t>=1&&t<Ke}const Vb=[["villager","ナギ",5082500,.6,-4],["sheep","わたげ",16050898,-2,-5],["cow","もみじ",8144182,4,-5],["villager","コハク",12748099,5,-2],["sheep","ミルク",15196367,-5,-5],["cow","カカオ",6244930,6,1],["villager","スミレ",10188701,-4,2],["sheep","ゆき",15917509,-6,-1],["cow","くるみ",5396065,7,3],["villager","ハル",10642512,2,5],["sheep","こむぎ",15386777,-2,6],["cow","あずき",10180928,5,7]];function fm(i,t,e){const n=vc(t);for(const s of[0,-1,1,-2,2,-3,3]){const r={...n,y:n.y+s};if(Ze(i,r,e,!0)&&Vs(i,r,e))return r}return null}function Gb(i,t){const e={radius:.48,height:1.81},n=fm(i,t,e);if(!n)return[];const s=new Set,r=[n],o=[],c=a=>a.x+"/"+a.y+"/"+a.z;s.add(c(n));for(let a=0;a<r.length&&a<440;a++){const l=r[a],h=Math.floor(l.x),u=Math.floor(l.z);if(Be(l,t)>=2.8&&[1,2,3,4,8].includes(i.get(h,l.y-1,u))){let f=!1;for(let d=l.y+2;d<Ke;d++)if(ri(i.get(h,d,u))){f=!0;break}f||o.push(l)}for(const f of am(i,l,e)){const d=c(f);Math.abs(f.x-n.x)>11||Math.abs(f.z-n.z)>11||s.has(d)||(s.add(d),r.push(f))}}return o}function oo(i,t){return Math.atan2(i.x-t.x,i.z-t.z)}function Wb(i,t,e){const{radius:n,height:s}=Ts[e.kind];let r=0,o=4.25;for(const c of["x","y","z"]){const a=e[c]-(c==="y"?0:n),l=e[c]+(c==="y"?s:n);if(Math.abs(t[c])<1e-9){if(i[c]<a||i[c]>l)return 1/0}else{const h=(a-i[c])/t[c],u=(l-i[c])/t[c];if(r=Math.max(r,Math.min(h,u)),o=Math.min(o,Math.max(h,u)),o<r)return 1/0}}return r}class Xb{constructor(t){this.world=t,this.unsubscribe=t.onEdit((e,n,s)=>{for(const r of this.entities){const o=this.motions.get(r.id),c=a=>Math.abs(a.x-(e+.5))<1.51&&Math.abs(a.z-(s+.5))<1.51&&n>=Math.floor(a.y)-2&&n<Math.ceil(a.y+Ts[r.kind].height)+1;!c(r)&&!o.path.some(c)||(o.path=[],o.due=0)}})}world;active=[];entities=[];clock=0;visualRevision=0;motions=new Map;unsubscribe;nextList=0;lastViewer=null;nextPlan=0;cursor=0;talking=null;lastMobile;track(t){this.motions.set(t.id,{mode:"idle",path:[],due:this.clock+1.8+this.motions.size*.31,seq:this.motions.size*57+1,vy:0,stride:0,grazing:0})}introduce(t){if(this.entities.length||!Hb(t))return!1;const e=Gb(this.world,t),n=[],s=Number.isFinite(t.yaw)?t.yaw:0,r=Math.cos(s),o=Math.sin(s);for(const[c,[a,l,h,u,f]]of Vb.entries()){const d=c===0?.7:2.8,p=u+(Yt(c,12,this.world.salt)-.5)*d,v=f+(Yt(c,73,this.world.salt)-.5)*d,g=t.x+p*r+v*o,m=t.z-p*o+v*r;let _,b=1/0;for(const A of e){if(n.some(R=>Be(R,A)<1.75))continue;let w=(g-A.x)**2+(m-A.z)**2+3*(t.y-A.y)**2;if(c===0){const R=A.x-t.x,L=A.z-t.z,E=-o*R-r*L,S=Math.abs(r*R-o*L);(E<2.8||S>E*.26)&&(w+=75)}w<b&&(b=w,_=A)}if(!_)return!1;const y=oo(_,t)+.48*(c%2?-1:1);n.push({..._,id:a+"-"+this.world.salt.toString(36)+"-"+c,name:l,kind:a,color:h,yaw:Math.atan2(Math.sin(y),Math.cos(y)),home:{..._}})}this.entities.push(...n),this.visualRevision++;for(const c of n)this.track(c);return this.refreshActive(t,!1),!0}refreshActive(t,e){const n=e?27:43,s=this.entities.filter(c=>Math.hypot(c.x-t.x,c.z-t.z,c.y-t.y)<n).sort((c,a)=>Be(c,t)-Be(a,t));this.active.length=0;let r=0,o=0;for(const c of s){if(c.kind==="villager"){if(o>=4)continue;o++}else{if(r>=8)continue;r++}this.active.push(c)}this.lastMobile=e,this.lastViewer={...t},this.nextList=this.clock+.35}talk(t,e){if(this.talking=t,this.visualRevision++,!t)return;const n=this.entities.find(s=>s.id===t&&s.kind==="villager");if(n){const s=this.motions.get(t);s.mode="talk",s.path=[],e&&(n.yaw=oo(n,e))}}overlapsBlock(t,e,n){return this.entities.some(s=>{const r=Ts[s.kind];return t<s.x+r.radius&&t+1>s.x-r.radius&&n<s.z+r.radius&&n+1>s.z-r.radius&&e<s.y+r.height&&e+1>s.y+1e-5})}target(t,e){if(![t.x,t.y,t.z,t.yaw,t.pitch].every(Number.isFinite))return null;const n=e??$n(this.world,t,4.25)?.distance??1/0;let s=Math.min(4.250001,n-1e-4),r=null;const o=Math.cos(t.pitch),c={x:-Math.sin(t.yaw)*o,y:Math.sin(t.pitch),z:-Math.cos(t.yaw)*o},a={x:t.x,y:t.y+Ws(t),z:t.z};for(const l of this.entities){const h=Wb(a,c,l);h<s&&(s=h,r=l)}return r}motion(t){return this.motions.get(t.id)}castsContactShadow(t){if(Math.abs(t.y-Math.round(t.y))>.003)return!1;const e=Ts[t.kind].radius*.82,n=Math.round(t.y)-1;return[-e,e].every(s=>[-e,e].every(r=>ri(this.world.get(Math.floor(t.x+s),n,Math.floor(t.z+r)))))}plan(t,e,n,s){e.seq++;const r=Yt(e.seq,42,this.world.salt),o=Yt(e.seq,81,this.world.salt);e.due=this.clock+2.5+r*3;const c=Be(t,n)<1.05&&Math.abs(t.y-n.y)<1.8;if(!c&&o<.28){e.path=[],e.mode=this.grazes(t)?"eat":"idle",e.grazing=this.clock+.9+r,t.yaw=Math.atan2(Math.sin(t.yaw+(r-.5)*.55),Math.cos(t.yaw+(r-.5)*.55));return}let a;if(c){const h=oo(n,t);a={x:t.x-Math.sin(h)*2.5,y:t.y,z:t.z-Math.cos(h)*2.5}}else{const h=t.kind==="villager"?4.2:5.5;a={x:t.home.x+Math.cos(r*6.28)*(.9+o*h),y:t.home.y,z:t.home.z+Math.sin(r*6.28)*(.9+o*h)}}const l=new Set;for(const h of this.active)h!==t&&l.add(Ya(h));e.path=cm(this.world,t,a,Ts[t.kind],s,l),e.mode=e.path.length?"walk":"idle"}grazes(t){return t.kind!=="villager"&&this.world.get(Math.floor(t.x),Math.floor(t.y-.01),Math.floor(t.z))===1}move(t,e,n,s){const r=Ts[t.kind],o=this.world;if(!Ze(o,t,r))return;if(Vs(o,t,r))t.y=Math.round(t.y),e.vy=0;else{e.vy=Math.max(-15,e.vy-22*n);const v={x:t.x,z:t.z,y:t.y+e.vy*n};Ze(o,v,r)?t.y=v.y:(t.y=Math.ceil(v.y-1e-5),e.vy=0)}if(!Vs(o,t,r)||!e.path.length)return;const c=e.path[0],a=Be(t,c);if(a<.025){e.path.shift(),e.path.length||(e.mode="idle");return}const l=t.kind==="villager"?.95:1.12,h=Math.min(1,l*n/a),u={x:t.x+(c.x-t.x)*h,y:t.y,z:t.z+(c.z-t.z)*h};if((v=>Math.abs(v.y-s.y)<1.75&&Be(v,s)<r.radius+.31)(u)&&Be(u,s)<=Be(t,s))return;if(this.active.some(v=>v!==t&&Math.abs(v.y-t.y)<1.4&&Be(v,u)<Ts[v.kind].radius+r.radius&&Be(v,u)<Be(v,t)-1e-6)){e.path=[],e.mode="idle",e.due=this.clock+.5;return}if(!Ze(o,u,r,!0)){const v={...u,y:t.y+1};if(c.y!==t.y+1||!Ze(o,{...t,y:t.y+1},r,!0)||!Ze(o,v,r,!0)){e.path=[],e.mode="idle";return}u.y=v.y}const p=fm(o,u,r);if(!p||p.y<u.y-1){e.path=[],e.mode="idle";return}t.yaw=oo(t,c),Object.assign(t,u),e.stride=(e.stride+l*n*6)%(Math.PI*2)}step(t,e,n){if(!Number.isFinite(t)||t<=0||![e.x,e.y,e.z].every(Number.isFinite))return;const s=Math.min(.1,t);this.clock+=s,(this.clock>=this.nextList||this.lastMobile!==n||!this.lastViewer||Be(e,this.lastViewer)>3)&&this.refreshActive(e,n);const r=this.clock,o=this.active.length;if(!o)return;const c=performance.now()+(n?1:1.8);let a=r>=this.nextPlan?n?1:2:0;const l=Math.ceil(s*60);for(let h=0;h<o;h++){const u=this.active[(h+this.cursor)%o],f=this.motions.get(u.id);this.talking===u.id?(f.path=[],f.mode="talk",u.yaw=oo(u,e)):f.grazing>r?(f.path=[],f.mode=this.grazes(u)?"eat":"idle"):(f.path.length||(f.mode="idle"),a>0&&r>=f.due&&performance.now()<c&&!f.path.length&&(this.plan(u,f,e,c),a--,this.nextPlan=r+(n?.07:.045)));for(let d=0;d<l;d++)this.move(u,f,s/l,e)}this.cursor=(this.cursor+1)%o}dispose(){this.unsubscribe(),this.active.length=0,this.motions.clear()}}const hi=(i,t,e,n,s,r,o,c)=>({joint:i,x:t,y:e,z:n,w:s,h:r,d:o,color:c}),ie=(i,t,e,n,s,r,o)=>hi("body",i,t,e,n,s,r,o),oe=(i,t,e,n,s,r,o)=>hi("head",i,t,e,n,s,r,o),Mr=3157042,Ua=16771268,wd=12553580,_c=["leftFront","rightFront","leftRear","rightRear"];function Td(i){const t=i==="sheep",e=[ie(0,.67,.035,.6,.47,.68,t?13087134:"coat"),...t?[ie(0,.73,.045,.73,.59,.77,"coat"),ie(-.31,.65,.02,.15,.34,.56,14668990),ie(.32,.67,.08,.14,.32,.49,15853259),ie(0,.98,.04,.56,.13,.64,16773852),ie(0,.69,.42,.5,.38,.13,15128509),ie(-.23,.72,-.32,.2,.26,.12,14932157),ie(.22,.74,-.32,.2,.27,.12,15984074),ie(.11,.96,-.17,.22,.14,.23,16248022)]:[ie(-.306,.7,.06,.035,.33,.25,16179136),ie(.306,.66,-.1,.035,.26,.21,15062201),ie(.081,.915,.09,.3,.04,.22,16575444),ie(-.03,.51,.27,.4,.14,.18,13213579),ie(-.19,.63,-.31,.16,.22,.03,15128247),ie(.314,.85,.12,.045,.17,.24,15853003),ie(-.25,.9,-.09,.15,.035,.18,13614488),hi("tail",0,-.12,0,.065,.29,.055,12097917),hi("tail",0,-.28,0,.088,.11,.08,5061686)],oe(0,.02,-.035,t?.34:.4,.36,.29,t?11899773:"coat"),oe(0,-.07,-.188,t?.28:.35,.15,.11,t?14136730:14002072),oe(-.102,.068,-.186,.062,.066,.02,Mr),oe(.102,.068,-.186,.062,.066,.02,Mr),oe(-.108,.082,-.198,.018,.021,.008,Ua),oe(.108,.082,-.198,.018,.021,.008,Ua),oe(-.215,.06,.014,.14,.078,.14,t?14466992:"coat"),oe(.215,.06,.014,.14,.078,.14,t?14466992:"coat"),oe(-.074,-.06,-.246,.036,.025,.01,Mr),oe(.074,-.06,-.246,.036,.025,.01,Mr)];t?e.push(oe(0,.197,-.03,.37,.105,.33,15524297)):e.push(oe(-.15,.23,.04,.07,.16,.08,Ua),oe(.15,.23,.04,.07,.16,.08,Ua),oe(0,.055,-.182,.1,.23,.018,15917005),oe(0,.215,-.015,.21,.075,.23,5520694));for(const[n,s]of _c.entries())e.push(hi(s,0,-.11,0,.136,.43,.14,t?12557181:n===2?15983303:8481111),hi(s,0,-.337,-.006,.146,.09,.156,5523522));return e}const qb=[ie(0,1.05,0,.46,.54,.28,"coat"),ie(0,.73,0,.43,.17,.27,8413004),ie(0,1.13,-.15,.22,.36,.035,15323038),ie(0,.855,-.145,.44,.09,.048,6441015),ie(0,1.3,-.135,.36,.11,.064,13273928),ie(.13,1.19,-.16,.067,.16,.047,14986853),ie(-.077,.983,-.174,.14,.085,.023,11045476),ie(.078,1.095,-.173,.04,.031,.014,12230523),ie(-.27,.98,0,.111,.05,.185,13346417),ie(.27,.98,0,.111,.05,.185,13346417),ie(.085,.855,-.176,.07,.063,.025,14726755),ie(-.22,.84,-.015,.13,.19,.15,10121806),ie(-.265,1.08,0,.105,.34,.18,"coat"),ie(.265,1.08,0,.105,.34,.18,"coat"),ie(-.265,.89,0,.103,.12,.15,wd),ie(.265,.89,0,.103,.12,.15,wd),oe(0,.005,0,.333,.34,.286,14198654),oe(0,.16,.008,.345,.1,.303,6638398),oe(0,.217,.022,.38,.072,.345,"coat"),oe(0,.254,.034,.29,.061,.255,"coat"),oe(0,.191,-.086,.35,.031,.245,4734776),oe(.132,.219,-.153,.046,.037,.026,15124352),oe(-.094,.117,-.145,.12,.048,.023,6638398),oe(-.168,-.007,.017,.04,.07,.088,13077613),oe(.168,-.007,.017,.04,.07,.088,13077613),oe(-.143,.069,.02,.063,.13,.24,6441533),oe(.143,.069,.02,.063,.13,.24,6441533),oe(-.067,.033,-.148,.043,.051,.012,Mr),oe(.067,.033,-.148,.043,.051,.012,Mr),oe(0,-.018,-.17,.067,.064,.057,12749163),oe(0,-.094,-.146,.073,.018,.013,11103576),hi("leftFront",0,-.27,0,.17,.55,.2,4541521),hi("rightFront",0,-.27,0,.17,.55,.2,4541521),hi("leftFront",0,-.602,-.023,.18,.13,.246,6310972),hi("rightFront",0,-.602,-.023,.18,.13,.246,6310972)],Fl={sheep:Td("sheep"),cow:Td("cow"),villager:qb},Yb=["body","head",..._c,"tail"];function jb(){const t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){const r=(s+n*32)*4,o=(Math.imul((s>>1)+17,191)^Math.imul((n>>1)+9,127))&31,c=(s+n*3)%19===0||n%9===0&&s%7<3?12:0,a=Math.min(255,220+o+((s^n)&3)-c);t[r]=a,t[r+1]=a,t[r+2]=a,t[r+3]=255}const e=new Go(t,32,32);return e.generateMipmaps=!0,e.magFilter=Ve,e.minFilter=Zi,e.needsUpdate=!0,e}function Kb(){return new cn({transparent:!0,depthWrite:!1,vertexShader:"varying vec2 pos;void main(){pos=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}",fragmentShader:`varying vec2 pos;void main(){vec2 p=floor(pos*20.+.5)/20.;
      float a=(1.-smoothstep(.2,1.,dot(p,p)))*.31;gl_FragColor=vec4(.065,.105,.069,a);
      #include <colorspace_fragment>
    }`})}class Zb{constructor(t){this.scene=t;const e=[],n=this.geometry.getAttribute("normal");for(let s=0;s<n.count;s++){const r=.76+n.getY(s)*.19+n.getX(s)*.075+n.getZ(s)*.035;e.push(r,r,r*.99)}this.geometry.setAttribute("color",new Ee(e,3)),this.mesh=new Do(this.geometry,this.material,1152),this.mesh.instanceMatrix.setUsage(Ep),this.mesh.count=0,this.mesh.frustumCulled=!1,this.mesh.name="羊・牛・村人",t.add(this.mesh),this.shade.name="足元の影",this.shade.frustumCulled=!1,this.shade.count=0,this.shade.renderOrder=.5,t.add(this.shade);for(const s of Yb){const r=new De;this.joints.set(s,r),this.root.add(r)}for(const s of Object.keys(Fl))for(const r of Fl[s])typeof r.color=="number"&&!this.palette.has(r.color)&&this.palette.set(r.color,new qt(r.color))}scene;geometry=new yn(1,1,1);texture=jb();material=new Fi({vertexColors:!0,map:this.texture});shade=new Do(new Hr(1,1).rotateX(-Math.PI/2),Kb(),24);mesh;root=new De;joints=new Map;local=new De;out=new xe;color=new qt;palette=new Map;previousClock=-1;previousRevision=-1;previousCenter=new N(1/0,0,0);previousDay=-1;previousMobile;pose(t,e,n){const s=e.motion(t),r=t.kind==="villager",o=t.kind==="cow",c=n?0:e.clock,a=t.id.charCodeAt(t.id.length-1),l=s.mode==="walk",h=n||!l?0:Math.sin(s.stride)*.48,u=n?0:Math.sin(c*2.2+a)*.009;this.root.position.set(t.x,t.y+u+(l?Math.abs(h)*.042:0),t.z),this.root.rotation.y=t.yaw,this.root.scale.setScalar(o?1.1:1),this.joints.get("body").position.set(0,0,0);const f=this.joints.get("head"),d=s.mode==="eat"&&!r&&!n,p=d?.5+.5*Math.sin(c*5):0;f.position.set(0,r?1.48:o?.88:.93,r?0:-.271),f.rotation.set(d?-.56-.25*p:u,!l&&!n&&s.mode!=="talk"?Math.sin(c*.9+a)*.15:0,0),d&&(f.position.y-=.23+.06*p);for(let g=0;g<_c.length;g++){const m=this.joints.get(_c[g]);m.position.set((g%2?1:-1)*(r?.115:.212),r?.667:.383,r?0:g<2?-.213:.247),m.rotation.x=h*([0,3].includes(g)?1:-1)}const v=this.joints.get("tail");v.position.set(0,.88,.37),v.rotation.z=n?0:Math.sin(c*2.1+a)*.2,this.root.updateMatrixWorld(!0)}update(t,e,n,s){const r=t.clock,o=r===this.previousClock;this.viewerVector.set(e.x,e.y,e.z);const c=this.previousCenter.distanceToSquared(this.viewerVector);if(this.previousRevision===t.visualRevision&&this.previousMobile===s&&c<.01&&Math.abs(n-this.previousDay)<.003&&(o||s&&r>=this.previousClock&&r-this.previousClock<1/30))return;this.previousClock=r,this.previousCenter.set(e.x,e.y,e.z),this.previousDay=n,this.previousMobile=s,this.previousRevision=t.visualRevision;const a=Math.sin((n-.25)*Math.PI*2),l=.48+.5*Math.max(0,Math.min(1,a*2+.25));let h=0,u=0;for(const f of t.entities){const d=Math.hypot(f.x-e.x,f.y-e.y,f.z-e.z);if(!(d>(s?28:44))){!s&&d<22&&t.castsContactShadow(f)&&(this.local.position.set(f.x,f.y+.006,f.z),this.local.rotation.y=f.yaw,this.local.scale.set(f.kind==="villager"?.58:.88,1,f.kind==="villager"?.52:.95),this.local.updateMatrix(),this.shade.setMatrixAt(u++,this.local.matrix),this.local.rotation.y=0),this.pose(f,t,d>21);for(const p of Fl[f.kind])this.local.position.set(p.x,p.y,p.z),this.local.scale.set(p.w,p.h,p.d),this.local.updateMatrix(),this.out.multiplyMatrices(this.joints.get(p.joint).matrixWorld,this.local.matrix),this.mesh.setMatrixAt(h,this.out),p.color==="coat"?this.color.setHex(f.color):this.color.copy(this.palette.get(p.color)),this.mesh.setColorAt(h++,this.color.multiplyScalar(l))}}this.shade.count=u,this.shade.visible=u>0,u&&(this.shade.instanceMatrix.needsUpdate=!0),this.mesh.count=h,this.mesh.visible=h>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}viewerVector=new N;dispose(){this.scene.remove(this.mesh,this.shade),this.mesh.dispose(),this.geometry.dispose(),this.material.dispose(),this.texture.dispose(),this.shade.dispose(),this.shade.geometry.dispose(),this.shade.material.dispose()}}const $b={ナギ:"こんにちは。この坂を下りた先が湖だよ。浅瀬から水の中をのぞいてみて。",コハク:"石や木材を集めたら、湖を眺められる小さな家を建ててみない？",スミレ:"わたげたちは、草の多い場所がお気に入り。少し待つと草を食べるよ。",ハル:"湖で大きな背びれを見かけたら気をつけて。岸に上がれば追ってこないよ。"};class Jb{simulation;view;talkUntil=0;mobile=globalThis.matchMedia?.("(pointer: coarse)").matches??!1;constructor(t,e,n=t.spawn()){if(this.simulation=new Xb(t),!this.simulation.introduce(n)){const s=t.spawn();if(!this.simulation.introduce(s))for(const[r,o]of[[-10,-6],[10,-6],[-12,6],[12,6],[0,16],[0,-21]]){const c=Math.floor(s.x)+r,a=Math.floor(s.z)+o;if(!ji(c,1,a))continue;const l=t.highest[c+Et*a]+1;if(this.simulation.introduce({x:c+.5,y:l,z:a+.5}))break}}this.view=this.simulation.entities.length?new Zb(e):null}update(t,e,n=.36){this.talkUntil&&this.simulation.clock>=this.talkUntil&&(this.simulation.talk(null),this.talkUntil=0),this.simulation.step(e,t,this.mobile),this.view?.update(this.simulation,t,n,this.mobile)}targetLabel(t,e){const n=this.simulation.target(t,e);if(!n)return null;const s=n.kind==="villager"?"住民":n.kind==="sheep"?"羊":"牛";return n.name+"（"+s+"）"}interact(t){const e=this.simulation.target(t);return e?e.kind==="villager"?(this.simulation.talk(e.id,t),this.talkUntil=this.simulation.clock+3.5,e.name+"「"+($b[e.name]??"こんにちは。いい天気だね。")+"」"):e.name+(e.kind==="sheep"?"「メェー」":"「モー」"):null}occupies(t,e,n){return this.simulation.overlapsBlock(t,e,n)}dispose(){this.view?.dispose(),this.simulation.dispose()}}const gu=13,Na=100,kl=4.5,Qb=1.52,t2=8.2,e2=[.79,.69,1,.63,.91,.75],pr=2110791,Fa=15792378,dm={jade:{radius:.55,vertical:.23,speed:1.33},amber:{radius:.5,vertical:.28,speed:1.04},shark:{radius:1.13,vertical:.44,speed:1.25}},n2={jade:"ヒスイフィッシュ",amber:"アンバーフィッシュ",shark:"サメ"},i2={jade:{body:[[0,0,.06,.21,.27,.46,4448177],[0,.09,-.03,.16,.17,.4,1674386],[0,-.09,.08,.2,.09,.37,12122280],[0,0,.27,.15,.18,.1,7662017],[0,.08,-.06,.027,.23,.26,3304615],[0,-.075,.05,.31,.034,.12,4241611],[-.108,.044,.2,.023,.062,.058,pr],[.108,.044,.2,.023,.062,.058,pr],[-.121,.057,.221,.009,.018,.018,Fa],[.121,.057,.221,.009,.018,.018,Fa]],tail:[[0,0,-.052,.115,.105,.12,5561532],[0,0,-.157,.047,.24,.115,3574715],[0,.106,-.208,.026,.095,.095,3781327],[0,-.106,-.208,.026,.095,.095,3781327]],tailOffset:-.215},amber:{body:[[0,0,.055,.245,.285,.36,15366194],[0,.085,.035,.195,.168,.29,16560459],[0,-.083,.025,.19,.13,.32,16765548],[0,-.006,.246,.17,.2,.13,16750140],[0,0,.109,.25,.283,.069,16773073],[0,.169,-.01,.052,.146,.201,15647836],[0,-.035,.045,.33,.04,.16,16165948],[-.091,.047,.238,.027,.067,.058,pr],[.091,.047,.238,.027,.067,.058,pr],[-.107,.061,.26,.008,.019,.015,Fa],[.107,.061,.26,.008,.019,.015,Fa]],tail:[[0,0,-.049,.12,.126,.16,15901246],[0,0,-.142,.055,.257,.135,16566610],[0,.094,-.208,.032,.086,.082,16769168],[0,-.094,-.208,.032,.086,.082,16769168]],tailOffset:-.19},shark:{body:[[0,-.025,.18,.65,.41,1.1,5404820],[0,.092,.17,.58,.24,1.05,3166064],[0,-.204,.23,.54,.13,.98,13821919],[0,-.037,.725,.51,.317,.32,6654623],[0,-.027,.876,.366,.229,.18,7442341],[0,-.189,.712,.48,.054,.31,15135455],[0,-.138,.791,.45,.028,.27,2702165],[0,-.043,-.406,.52,.31,.34,5010832],[0,.265,.065,.105,.2,.37,4351108],[0,.381,-.011,.078,.114,.23,4550288],[-.41,-.111,.176,.225,.078,.34,4154241],[.41,-.111,.176,.225,.078,.34,4154241],[-.55,-.135,.108,.12,.057,.217,5405585],[.55,-.135,.108,.12,.057,.217,5405585],[-.249,.032,.772,.039,.106,.112,15332843],[.249,.032,.772,.039,.106,.112,15332843],[-.271,.03,.801,.025,.063,.064,pr],[.271,.03,.801,.025,.063,.064,pr],[-.326,-.033,.329,.018,.099,.043,3890809],[.326,-.033,.329,.018,.099,.043,3890809],[-.329,-.027,.416,.017,.106,.042,3890809],[.329,-.027,.416,.017,.106,.042,3890809]],tail:[[0,-.026,-.09,.3,.235,.34,5470869],[0,-.018,-.222,.09,.43,.18,4615563],[0,.177,-.281,.076,.227,.154,5405850],[0,.306,-.337,.065,.073,.106,7641003],[0,-.185,-.282,.073,.13,.12,5537175]],tailOffset:-.58}};function Ad(i){const t=i.map(([n,s,r,o,c,a,l])=>{const h=new yn(o,c,a);h.translate(n,s,r);const u=new qt(l),f=new Float32Array(h.attributes.position.count*3);for(let d=0;d<f.length/3;d+=1)u.setHex(l).multiplyScalar(e2[Math.floor(d/4)]).toArray(f,d*3);return h.setAttribute("color",new an(f,3)),h}),e=mu(t);for(const n of t)n.dispose();return e}function zl(i,t,e,n){return i.get(Math.floor(t),Math.floor(e),Math.floor(n))===gu}function Cn(i,t,e){const{radius:n,vertical:s}=dm[e],r=Math.floor(t.y+s+.14);for(let o=Math.floor(t.y-s);o<=r;o+=1)for(let c=Math.floor(t.z-n);c<=Math.floor(t.z+n);c+=1)for(let a=Math.floor(t.x-n);a<=Math.floor(t.x+n);a+=1)if(i.get(a,o,c)!==gu)return!1;return!0}function s2(i){const{x:t,z:e}=i.spawn(),n=Math.floor(t),s=Math.floor(e),r=[],o=new N,c=[Fn-.5,Fn+.44,Fn-1.5,Fn-2.5],a=(l,h)=>{if((l+h)%2!==0)return;const u=n+l,f=s+h;for(const d of c)if(i.get(u,Math.floor(d),f)===gu&&(o.set(u+.5,d,f+.5),!(!Cn(i,o,"jade")&&!Cn(i,o,"amber")))){r.push(o.clone());return}};for(let l=2;l<=61;l+=1){for(let h=-l;h<=l;h+=1)a(h,-l),a(h,l),Math.abs(h)!==l&&(a(-l,h),a(l,h));if(r.length>=96&&r.some(h=>Cn(i,h,"shark")))break}return r.sort((l,h)=>Math.hypot(l.x-t,l.z-e)-Math.hypot(h.x-t,h.z-e)),r}function Rd(i,t,e,n){const s=e.filter(a=>Cn(i,a,t)),r=s.find(a=>n.every(l=>l.distanceToSquared(a)>5))??s[0];if(!r)return[];const o=s.filter(a=>a.distanceToSquared(r)<=85);o.sort((a,l)=>a.distanceToSquared(r)-l.distanceToSquared(r));const c=[];for(const a of o)if(!n.some(l=>l.distanceToSquared(a)<1.3)&&(n.push(a),c.push(a),c.length===5))break;return c}class r2{constructor(t,e,n=!1){if(this.world=t,this.scene=e,this.defeated=n,t.stage==="flat")return;const s=s2(t),r=[],o=s.find(c=>Cn(t,c,"shark"));o&&r.push(o),o&&!this.defeated&&(this.shark=this.addSchool("shark",[o])[0],this.sharkMaterial=this.shark.model.children[0].material),this.addSchool("jade",Rd(t,"jade",s,r)),this.addSchool("amber",Rd(t,"amber",s,r))}world;scene;fish=[];materials=new Set;geometries=new Set;events=[];target=new N;step=new N;ray=new ou;bitePoint=new N;rayHit=new N;sharkBox=new cs(new N(-.61,-.27,-1.03),new N(.61,.45,1));shark;sharkMaterial;playerHealth=Na;enemyHealth=Na;biteCooldown=0;attackCooldown=0;immunity=0;hitFlash=0;timeSinceBite=0;fade=0;chasing=!1;defeated;get health(){return Math.ceil(this.playerHealth)}get sharkHealth(){return this.defeated?0:this.shark?this.enemyHealth:null}get sharkDefeated(){return this.defeated}get hasAquaticLife(){return this.fish.length>0}addSchool(t,e){if(!e.length)return[];const n=i2[t],s=Ad(n.body),r=Ad(n.tail),o=new Fi({vertexColors:!0,toneMapped:!1});return this.geometries.add(s).add(r),this.materials.add(o),e.map((c,a)=>{const l=Yt(Math.floor(c.x),Math.floor(c.z),this.world.salt^(a+1)*213)*Math.PI*2,h=new li;h.name="aquatic-"+t,h.userData.species=n2[t],h.position.copy(c),h.rotation.y=l;const u=new we(r,o);u.position.z=n.tailOffset,h.add(new we(s,o),u),this.scene.add(h);const f={kind:t,model:h,tail:u,home:c,destination:c.clone(),phase:l,waypoint:a,nextTurn:0};return this.fish.push(f),f})}consumeEvent(){return this.events.shift()??null}resetHealth(){this.playerHealth=Na,this.immunity=3,this.timeSinceBite=0,this.chasing=!1,this.events.length=0}swimmerPoint(t){return this.bitePoint.set(t.x,t.y+.18,t.z),zl(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)||(this.bitePoint.y=t.y+1),zl(this.world,this.bitePoint.x,this.bitePoint.y,this.bitePoint.z)}openWaterLine(t,e){const n=Math.ceil(t.distanceTo(e)/.22);for(let s=1;s<n;s+=1)if(this.step.lerpVectors(t,e,s/n),!zl(this.world,this.step.x,this.step.y,this.step.z))return!1;return!0}canAttack(t){const e=this.shark;if(!e||this.defeated||!e.model.visible||this.health<=0||!this.swimmerPoint(t))return!1;const n=e.model.position,s=this.ray.origin.set(t.x,t.y+Ws(t),t.z).sub(n);if(s.lengthSq()>(kl+1.2)**2)return!1;const r=this.ray.direction.set(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch)),o=-e.model.rotation.y,c=(f,d)=>f*Math.cos(o)+d*Math.sin(o),a=(f,d)=>-f*Math.sin(o)+d*Math.cos(o);s.set(c(s.x,s.z),s.y,a(s.x,s.z)),r.set(c(r.x,r.z),r.y,a(r.x,r.z));const l=this.ray.intersectBox(this.sharkBox,this.rayHit);if(!l)return!1;const h=this.sharkBox.containsPoint(s)?0:l.distanceTo(s);if(h>kl)return!1;const u=$n(this.world,t,kl);return!u||u.distance>h+.055}attack(t){return this.canAttack(t)?(this.attackCooldown>0||(this.attackCooldown=.34,this.hitFlash=.22,this.enemyHealth=Math.max(0,this.enemyHealth-25),this.enemyHealth===0?(this.defeated=!0,this.fade=.7,this.events.push("サメを倒しました！")):this.events.push("サメにヒット！ 残り体力 "+this.enemyHealth)),!0):!1}update(t,e){const n=Math.min(.1,e);if(!Number.isFinite(n)||n<=0)return;this.attackCooldown=Math.max(0,this.attackCooldown-n),this.biteCooldown=Math.max(0,this.biteCooldown-n),this.immunity=Math.max(0,this.immunity-n),this.hitFlash=Math.max(0,this.hitFlash-n),this.timeSinceBite+=n;const s=this.swimmerPoint(t);!s&&this.timeSinceBite>=3&&this.playerHealth>0&&(this.playerHealth=Math.min(Na,this.playerHealth+20*n)),this.sharkMaterial&&this.sharkMaterial.color.setHex(this.hitFlash>.01?16756823:16777215);for(const r of this.fish){if(r===this.shark&&this.defeated){this.fade=Math.max(0,this.fade-n),r.model.visible=this.fade>0,r.model.scale.setScalar(this.fade/.7),r.model.rotation.z=(1-this.fade/.7)*1.8;continue}const o=r.model.position;if(r.model.visible=o.distanceToSquared(this.target.set(t.x,t.y,t.z))<62**2&&Cn(this.world,o,r.kind),!r.model.visible){Cn(this.world,r.home,r.kind)&&o.copy(r.home);continue}const c=r===this.shark&&s&&this.health>0&&this.immunity<=0&&o.distanceToSquared(this.bitePoint)<t2**2&&r.home.distanceToSquared(this.bitePoint)<19**2&&this.openWaterLine(o,this.bitePoint);r===this.shark&&(c&&!this.chasing&&this.events.push("サメがこちらに向かっています！"),this.chasing=c,c&&o.distanceToSquared(this.bitePoint)<Qb**2&&this.biteCooldown<=0&&(this.biteCooldown=1.4,this.timeSinceBite=0,this.playerHealth=Math.max(0,this.playerHealth-20),this.events.push(this.health>0?"サメにかまれた！ 体力 "+this.health:"体力がなくなりました。"))),r.nextTurn-=n,c?(this.target.copy(this.bitePoint),Cn(this.world,this.target,r.kind)||(this.target.y=o.y)):((r.nextTurn<=0||o.distanceToSquared(r.destination)<.2)&&this.swimWaypoint(r),this.target.copy(r.destination)),this.swim(r,this.target,n,c?2.7:dm[r.kind].speed),r.phase+=n*(c?9.3:5.8),r.tail.rotation.y=Math.sin(r.phase)*(c?.37:.27),r.model.rotation.z=Math.sin(r.phase*.57)*.035}}swimWaypoint(t){t.nextTurn=1.4+t.waypoint%5*.23;for(let e=0;e<8;e+=1){const n=this.world.salt^Math.floor(t.home.x*276+t.home.z*61),s=++t.waypoint,r=Yt(s,939,n)*Math.PI*2,o=1+Yt(s,817,n)*(t.kind==="shark"?5:3.5);if(this.step.set(t.home.x+Math.cos(r)*o,t.home.y+(Yt(s,794,n)-.5)*.84,t.home.z+Math.sin(r)*o),Cn(this.world,this.step,t.kind)){t.destination.copy(this.step);return}}t.destination.copy(t.home)}swim(t,e,n,s){const r=t.model.position,o=e.x-r.x,c=e.y-r.y,a=e.z-r.z,l=Math.hypot(o,c,a);if(l<.075)return;const h=Math.min(1,n*s/l);if(this.step.set(r.x+o*h,r.y+c*h,r.z+a*h),!Cn(this.world,this.step,t.kind)&&(this.step.y=r.y,!Cn(this.world,this.step,t.kind)&&(this.step.x=r.x,!Cn(this.world,this.step,t.kind)&&(this.step.x=r.x+o*h,this.step.z=r.z,!Cn(this.world,this.step,t.kind)))))return;const u=Math.atan2(this.step.x-r.x,this.step.z-r.z)-t.model.rotation.y;t.model.rotation.y+=Math.atan2(Math.sin(u),Math.cos(u))*Math.min(1,n*7),r.copy(this.step)}dispose(){for(const t of this.fish)t.model.removeFromParent();for(const t of this.geometries)t.dispose();for(const t of this.materials)t.dispose()}}const o2=5,br=Object.freeze({swings:Object.freeze({x:106.5,y:33,z:141.5,capacity:2}),seesaw:Object.freeze({x:146.5,y:33,z:141.5,capacity:4})}),Pc=2329472,pm=8638131,zs=15971915,vu=14776903,Cd=11029047,Gs=3427410,a2=11388868,c2=2252376,Is=3.82,Xi=2.91,Pd=1.14,yo=1.56,_u=3.52,mm=.55,l2=["swings","seesaw"],Id={swings:"ブランコ",seesaw:"シーソー"};function Hh(i){return i===0?-Pd:Pd}function $a(i){return i<2?-1:1}function gm(i){return i%2===0?-1:1}function h2(i){return i==="swings"||i==="seesaw"}function vm(i,t){return Number.isInteger(t)&&t>=0&&t<br[i].capacity}function Ld(i,t,e){if(!vm(i,t)||!Number.isFinite(e))return;const n=br[i],s=Math.sin(e),r=Math.cos(e);if(i==="swings")return{x:n.x+Hh(t),y:n.y+Is-Xi*r-.43,z:n.z-Xi*s,yaw:0};const o=$a(t),c=_u*o;return{x:n.x+c*r-.18*s,y:n.y+yo+c*s+.18*r-.43,z:n.z+gm(t)*mm,yaw:o*Math.PI/2}}function Ic(i,t){const e=[.82,.7,1,.59,.8,.88],n=new qt,s=t.map(([o,c,a,l,h,u,f,d])=>{const p=new yn(l,h,u);d&&p.rotateX(d),p.translate(o,c,a);const v=p.getAttribute("position"),g=new Float32Array(v.count*3);for(let m=0;m<v.count;m++)n.setHex(f).multiplyScalar(e[Math.floor(m/4)]).toArray(g,m*3);return p.setAttribute("color",new an(g,3)),p}),r=mu(s);return s.forEach(o=>o.dispose()),new we(r,i)}function u2(i){const t=[[0,Is,0,5.15,.26,.29,zs],[0,Is+.17,0,5.25,.08,.2,vu]];for(const e of[-2.29,2.29]){for(const n of[-1,1]){const s=n*1.73;t.push([e,.12,s,.51,.23,.5,Gs]),t.push([e,(Is+.12)/2,s/2,.27,Math.hypot(Is-.12,s),.27,Pc,-n*Math.atan2(1.73,3.7)])}t.push([e,1.56,0,.24,.14,2.15,pm]),t.push([e,Is,0,.41,.4,.42,Gs])}return Ic(i,t)}function f2(i,t){const e=t===0?vu:Pc,n=[[0,-Xi-.03,0,1.05,.16,.62,Gs],[0,-Xi+.06,-.02,.97,.1,.55,e],[0,-Xi+.16,.29,.92,.17,.13,e],[0,-.04,0,1.07,.13,.15,Gs]];for(const s of[-1,1])n.push([s*.43,-Xi/2,0,.059,Xi,.059,a2]),n.push([s*.43,-Xi+.36,0,.105,.59,.103,zs]);return Ic(i,n)}function d2(i){return Ic(i,[[0,.09,0,1.99,.17,1.98,Gs],[0,.44,0,1.1,.53,1.66,c2],[0,.96,0,.7,.62,1.55,Pc],[0,1.38,0,.59,.35,1.58,pm],[0,yo,0,.4,.4,2.02,Gs],[0,yo,-1.01,.25,.22,.08,zs],[0,yo,1.01,.25,.22,.08,zs]])}function p2(i){const t=[[0,0,0,8.48,.26,1.78,vu],[0,-.17,0,8.48,.15,.31,Cd],[0,.14,0,8.62,.08,.15,zs]];for(const e of[-1,1]){const n=e<0?Pc:Cd;t.push([e*4.23,.02,0,.16,.32,1.8,zs]);for(const s of[-1,1]){const r=s*mm;t.push([e*_u,.21,r,.84,.18,.6,n]),t.push([e*3.93,.44,r,.12,.43,.59,n]),t.push([e*2.89,.43,r,.1,.51,.1,Gs]),t.push([e*2.89,.7,r,.13,.12,.42,zs])}}return Ic(i,t)}class m2{group=new li;material=new Fi({vertexColors:!0,toneMapped:!1});swings=[];seesaw;occupants=new Map;seats=[[],[]];lastTime;constructor(t){this.group.name="park-rides";const e=new li,n=new li,{swings:s,seesaw:r}=br;e.name="park-swings",e.position.set(s.x,s.y,s.z),n.name="park-seesaw",n.position.set(r.x,r.y,r.z),e.add(u2(this.material)),n.add(d2(this.material));for(let o=0;o<s.capacity;o++){const c=f2(this.material,o);c.position.set(Hh(o),Is,0),c.name="park-swing-seat",e.add(c),this.swings.push(c)}this.seesaw=p2(this.material),this.seesaw.name="park-seesaw-deck",this.seesaw.position.y=yo,n.add(this.seesaw),this.group.add(e,n),t.add(this.group)}target(t){const e=l2.find(o=>{const c=br[o];return Math.abs(t.y-c.y)<2.2&&Math.hypot(t.x-c.x,t.z-c.z)<=o2});if(!e)return null;const n=this.seats[e==="swings"?0:1];let s,r=1/0;for(let o=0;o<br[e].capacity;o++){if(n[o])continue;const c=Ld(e,o,0),a=Math.hypot(c.x-t.x,c.z-t.z);a<r&&(r=a,s=o)}return{id:e,label:s===void 0?Id[e]+"は満席です":Id[e]+"に乗る",seat:s}}update(t,e){if(!Number.isFinite(e))return;this.occupants.clear();for(const l of this.seats)l.length=0;for(const l of t){const{id:h,seat:u,memberId:f}=l;if(!h2(h)||!vm(h,u)||this.occupants.has(f))continue;const d=this.seats[h==="swings"?0:1];if(d[u])continue;const p={id:h,seat:u,memberId:f,pump:Number.isFinite(l.pump)?si.clamp(l.pump,-1,1):0};d[u]=p,this.occupants.set(f,p)}const n=this.lastTime===void 0?.12:si.clamp((e-this.lastTime)/1e3,0,.12);this.lastTime=e;const s=e%6e5/1e3;for(const[l,h]of this.swings.entries()){const u=this.seats[0][l],f=s*2*Math.PI/2.5+l*.64,d=u?Math.sin(f)*(.2+.5*Math.abs(u.pump))+.036*u.pump:0;h.rotation.x=si.damp(h.rotation.x,d,10,n)}let r=0,o=0,c=0;for(const l of this.seats[1])l&&(r+=$a(l.seat)*(1+l.pump*.72),o+=Math.abs(l.pump),c++);const a=c?si.clamp(-r*.088+Math.sin(s*2*Math.PI/2.4)*(.08+.19*o/c),-.285,.285):0;this.seesaw.rotation.z=si.damp(this.seesaw.rotation.z,a,9,n)}playerPose(t){const e=this.occupants.get(t);if(!e)return;const n=e.id==="swings"?this.swings[e.seat].rotation.x:this.seesaw.rotation.z;return Ld(e.id,e.seat,n)}exit(t){const e=this.occupants.get(t);if(!e)return;const{id:n,seat:s}=e,r=br[n];return n==="swings"?{x:r.x+Hh(s),y:r.y+.03,z:r.z+(s===0?-3.62:3.62),yaw:0}:{x:r.x+_u*$a(s),y:r.y+.03,z:r.z+gm(s)*2.28,yaw:$a(s)*Math.PI/2}}dispose(){this.group.removeFromParent(),this.group.traverse(t=>{t instanceof we&&t.geometry.dispose()}),this.material.dispose(),this.occupants.clear();for(const t of this.seats)t.length=0}}const Dd=8,g2={minX:0,maxX:Et,minZ:0,maxZ:Et};function v2(i,t,e,n,s){const r=[0,0,0];for(let o=0;o<4;o++)for(let c=0;c<4;c++){const a=Math.floor(t+(c+.5)*n/4),l=Math.floor(e+(o+.5)*s/4),h=i.highest[a+l*Et],u=i.get(a,h,l),f=i.get(a,Fn,l)===13,d=i.stage==="crossing",p=f?[63,126,140]:u===4?[177,157,101]:u===5||u===6?[55,101,70]:d?h>33?[100,128,148]:[66,81,89]:[102,132,76],v=f?0:Math.ceil((h-30)*.9);for(let g=0;g<3;g++)r[g]+=p[g]+v}return"rgb("+r.map(o=>Math.round(o/16)).join(",")+")"}function _2(i,t,e,n){const s=i.get(t,e-1,n),r=i.get(t,e+1,n),o=i.get(t,e,n);return r&&r!==10?"#29444e":r===10?"#66b6c1":o?"#8b6b51":s?s===5||s===7?"#d9ad72":s===1||s===6?"#8baa70":"#b8b7a3":"#263f46"}class x2{constructor(t,e,n,s=!1){this.canvas=t,this.levelLabel=n,this.context=t.getContext("2d"),this.school=e.stage==="school",this.cops=s,this.bounds=this.school?s?p0:po:s&&(e.stage==="park"||e.stage==="crossing")?np:g2,this.columns=this.school?6:Dd,this.rows=this.school?5:Dd,this.counts=new Uint8Array(this.columns*this.rows),this.drawnCounts=new Uint8Array(this.counts.length),this.terrain=this.school?Ns.map(r=>this.drawBase(e,r)):[this.drawBase(e)],n&&(n.hidden=!this.school)}canvas;levelLabel;terrain;context;bounds;columns;rows;school;cops;counts;drawnCounts;drawnSelf=-2;drawnFloor=-1;drawBase(t,e){const n=this.canvas.ownerDocument.createElement("canvas");n.width=this.canvas.width,n.height=this.canvas.height;const s=n.getContext("2d");if(!s)return n;const r=n.width/this.columns,o=n.height/this.rows;if(e!==void 0){const{minX:c,maxX:a,minZ:l,maxZ:h}=this.bounds,u=n.width/(a-c),f=n.height/(h-l);for(let d=l;d<h;d++)for(let p=c;p<a;p++){const v=Math.round((p-c)*u),g=Math.round((d-l)*f);s.fillStyle=_2(t,p,e,d),s.fillRect(v,g,Math.round((p+1-c)*u)-v,Math.round((d+1-l)*f)-g)}}else{const{minX:c,maxX:a,minZ:l,maxZ:h}=this.bounds,u=(a-c)/this.columns,f=(h-l)/this.rows;for(let d=0;d<this.rows;d++)for(let p=0;p<this.columns;p++)s.fillStyle=v2(t,c+p*u,l+d*f,u,f),s.fillRect(p*r,d*o,r,o)}s.strokeStyle=this.school?"#e8f4ce65":"#153b3666",s.lineWidth=1,s.beginPath();for(let c=1;c<this.columns;c++)s.moveTo(c*r+.5,0),s.lineTo(c*r+.5,n.height);for(let c=1;c<this.rows;c++)s.moveTo(0,c*o+.5),s.lineTo(n.width,c*o+.5);return s.stroke(),n}zoneAt({x:t,z:e}){const{minX:n,maxX:s,minZ:r,maxZ:o}=this.bounds;return!Number.isFinite(t)||!Number.isFinite(e)||t<n||e<r||t>=s||e>=o?-1:Math.floor((t-n)*this.columns/(s-n))+this.columns*Math.floor((e-r)*this.rows/(o-r))}floorAt({y:t}){return this.school&&t>=(Ns[0]+Ns[1])/2?1:0}update(t,e,n){const s=this.context;if(!s)return;const r=this.zoneAt(e),o=this.floorAt(e);let c=0;if(this.counts.fill(0),n)for(const{pose:h}of t){if(this.floorAt(h)!==o){c++;continue}const u=this.zoneAt(h);u>=0&&this.counts[u]++}if(this.school&&this.levelLabel){const u=(this.cops&&o===0?"地上・校舎1階":"校舎 "+(o+1)+"階")+(c?"　別の階に "+c+"人":"");this.levelLabel.textContent!==u&&(this.levelLabel.textContent=u)}if(r===this.drawnSelf&&o===this.drawnFloor&&this.counts.every((h,u)=>h===this.drawnCounts[u]))return;this.drawnSelf=r,this.drawnFloor=o,this.drawnCounts.set(this.counts);const a=this.canvas.width/this.columns,l=this.canvas.height/this.rows;if(s.clearRect(0,0,this.canvas.width,this.canvas.height),s.globalAlpha=this.school?.72:.53,s.drawImage(this.terrain[o],0,0),s.globalAlpha=1,r>=0){const h=r%this.columns*a,u=Math.floor(r/this.columns)*l;s.fillStyle="#cef9ff4d",s.fillRect(h,u,a,l),s.strokeStyle="#d7f9ff",s.lineWidth=3,s.strokeRect(h+2,u+2,a-4,l-4)}if(s.font="800 24px system-ui,sans-serif",s.textAlign="center",s.textBaseline="middle",this.counts.forEach((h,u)=>{if(!h)return;const f=(u%this.columns+.5)*a,d=(Math.floor(u/this.columns)+.5)*l;s.beginPath(),s.arc(f,d,Math.min(a,l)*.34,0,Math.PI*2),s.fillStyle="#ffe292",s.fill(),s.strokeStyle="#4b4225",s.lineWidth=2,s.stroke(),s.fillStyle="#263025",s.fillText(String(h),f,d+1)}),this.cops&&o===0){const{minX:h,maxX:u,minZ:f,maxZ:d}=this.bounds,p=(Gl.x-h)/(u-h)*this.canvas.width,v=(Gl.z-f)/(d-f)*this.canvas.height;s.fillStyle="#45839a",s.fillRect(p-30,v-13,60,26),s.font="bold 18px system-ui, sans-serif",s.fillStyle="#fff7df",s.fillText("牢屋",p,v+1)}}}const Vh=1.2,_m=100,y2=25,M2=22;function b2(i,t=!1){return i==="tag"&&t?9:6.3}function S2(){return{energy:_m,rest:0,exhausted:!1}}function E2(i,t,e){if(!Number.isFinite(e)||e<=0)return!1;if(t&&!i.exhausted&&i.energy>0)return i.energy=Math.max(0,i.energy-y2*e),i.rest=0,i.exhausted=i.energy===0,!0;i.exhausted=t&&(i.exhausted||i.energy===0);const n=i.rest+e,s=Math.max(0,n-Math.max(i.rest,Vh));return i.rest=Math.min(Vh,n),i.energy=Math.min(_m,i.energy+M2*s),!1}const Ni=document.querySelector("#scene"),ke=document.querySelector("#hud"),w2=ke.querySelector("#tag-map-canvas"),T2=ke.querySelector("#tag-map-level"),Ol=ke.querySelector("#sprint-status"),Ud=ke.querySelector("#sprint-stamina"),Nd=ke.querySelector("#sprint-feedback"),Lc=ke.querySelector("#touch-controls"),Fd=ke.querySelector("#touch-fly"),A2=ke.querySelector("#life-status"),R2=ke.querySelector("#shark-status"),kd=ke.querySelector("#life-health"),zd=ke.querySelector("#shark-health"),C2=ke.querySelector("#life-health-number"),P2=ke.querySelector("#shark-health-number"),Bl=ke.querySelector("#touch-attack"),qi=ke.querySelector("#park-ride"),ka=ke.querySelector("#touch-rotate"),Ja={stick:ke.querySelector("#move-stick"),jump:ke.querySelector("#touch-jump"),down:ke.querySelector("#touch-down"),sprint:ke.querySelector("#touch-sprint")};Ni.tabIndex=-1;const as=new yb,Je=new tb,B=new XM((i,t)=>{Ru(i,t).catch(e=>B.toast(ui(e)))}),I2=["localhost","127.0.0.1","[::1]"].includes(location.hostname),xc=new Ub(I2?location.origin:"https://tk777-neonshift-scores.takesuke.chatgpt.site"),Gh=(new URLSearchParams(location.search).get("room")??"").trim().toUpperCase();let ae=null,$i="y",es=0,Mo=0,Hl=0,Qa=0;const xm=["北","東","南","西"];let Wh="";const xu=()=>Je.configure(He.volume,He.muted,He.effectsVolume,He.ambientVolume);let U=null,He=gb();const L2="tk777.webcraft.look",ym="tk777.webcraft.controls",Mm="tk777.webcraft.view";function D2(){try{return localStorage.getItem(Mm)==="kids"}catch{return!1}}function bm(){const i=window.matchMedia("(pointer: coarse)").matches;return{coarse:i,touch:i||navigator.maxTouchPoints>0,mac:/^Mac/i.test(navigator.platform)}}function Sm(){const i=bm();try{return hd(localStorage.getItem(ym),localStorage.getItem(L2),i)}catch{}return hd(null,null,i)}let zn=!1,bo=!1,Pe=Sm(),yu=!1;function Mu(){return Pe==="lock"?bm().touch?"tablet":"drag":Pe}let tc="",ec=0,ns=0,Ar=0,Vl=Promise.resolve(!0),Rr=0,gr=0,fo=0,is="",Od=50,ls=!1,Fr=!1;try{ls=!!Ni.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"})}catch{}const bu="WebGL 2を利用できません。ChromeまたはEdgeのハードウェア アクセラレーションを有効にして、ブラウザーを再起動してください。";function ui(i){return i instanceof DOMException?i.name==="QuotaExceededError"?"ブラウザーの保存容量が不足しています。ファイルへ書き出してバックアップしてください。":i.name==="SecurityError"||i.name==="NotAllowedError"?"ブラウザーのサイト設定で、このページのローカル保存を許可してください。":"保存領域にアクセスできませんでした。他のタブを閉じ、空き容量を確認してください。":i instanceof Error&&/[ぁ-龯]/u.test(i.message)?i.message:"処理を完了できませんでした。ページを開き直してお試しください。"}function Em(i){return{generator:i.world.generator,bench:ae?.id===21&&i.world.get(ae.x,ae.y,ae.z)===21,frontier:!!i.frontier}}function Xo(i,t){return!!te[i]?.block&&i!==22&&(i!==21||t==="explore")}function Dc(i){return!!i.online?.pendingExplore}function Fo(){const i=U,t=HM(i.data.bag,i.data.mode,i.data.selected,Em(i));return i.online&&i.data.mode==="creative"&&(t.items=t.items.filter(e=>Xo(e.id,"creative"))),i.online&&i.data.mode==="explore"&&(t.recipes=t.recipes.filter(e=>e.id!=="chest")),ae?.id===21&&(t.benchUses=i.world.benchUses(ae.x,ae.y,ae.z)),ae?.id===22&&(t.chest=i.world.chestAt(ae.x,ae.y,ae.z),i.data.mode==="creative"&&(t.palette=t.items,t.items=i.data.bag.slots.map(e=>({...e,name:te[e.id].name,maxDurability:te[e.id].maxDurability})))),t}function kr(){if(!U)return;if(U.online?.tagGame){B.expedition("","","");return}const{world:i,data:t,player:e}=U,n=t.journey,s=i.landmarks.find(o=>o.kind==="cave");if(i.stage==="frontier"){const o=!n.toolMade&&t.mode==="explore",c=o?"林で原木を集め、町の作業台で道具を作れます。":"空き区画に家を建てられます。",l=ep.map(u=>({x:(u.minX+u.maxX)/2,y:tp+1,z:(u.minZ+u.maxZ)/2})).reduce((u,f)=>Math.hypot(u.x-e.x,u.z-e.z)<=Math.hypot(f.x-e.x,f.z-e.z)?u:f),h=(o?"作業場 ":"建築区画 ")+ac(o?Ba.workbench:l,e);B.expedition(n.hidden?"":c,kc(n,e),n.hidden?"":h);return}if(i.stage!=="classic"){const o=n.toolMade?"石を集め、作業台で石の道具や建材を作ろう":"支給された原木で、木材と棒を作って道具を作ろう";B.expedition(t.mode==="explore"&&!n.hidden?o:"",kc(n,e),"");return}const r=i.landmarks.find(o=>Math.hypot(o.x-e.x,o.z-e.z)<12);r&&r.kind!==Wh&&pt.active&&B.toast(r.name+"　"+{grove:"大樹の根元で建築用の原木を採れます。",cave:"坑道の壁に潮晶の鉱脈があります。",ruin:"回廊の床には持ち帰れる象眼タイルがあります。"}[r.kind]),Wh=r?.kind??"",B.expedition(t.mode==="explore"&&!n.hidden?D0(n,i.generator):"",kc(n,e),t.mode==="explore"&&!n.hidden&&n.toolMade&&!n.caveVisited&&s?"岩窟 "+ac(s,e):"")}function wm(i,t=!1){if(!U||!pt.active)return!1;if(U.online?.tagGame)return Tu();if(U.online&&U.data.mode==="creative")return t&&B.toast("共同建築ルームでは、建材を自由に選んで建築できます。"),!1;const e=U.frontier?.interact(U.player)??U.land?.interact(U.player);return e?(B.toast(e),!0):!i||!(i.id===21||i.id===22&&!U.online)?(t&&B.toast(U.online?"作業台に照準を合わせてください。":U.land?"住民・動物・作業台・チェストに照準を合わせてください。":"作業台かチェストに照準を合わせてください。"),!1):(ae=i,fi(),B.inventory(Fo()),!0)}function U2(){if(!U||U.online?.tagGame)return;if(Dc(U)){B.toast("素材の変更を確認しています。少し待ってください。");return}const{world:i,player:t,data:e}=U,n=$n(i,t);if(!n){B.toast("選びたい建材に照準を合わせてください。");return}if(U.online&&!Xo(n.id,e.mode)){B.toast("このブロックは共有ワールドで使えません。");return}const s=bc(n.id),r=e.bag.hotbar.indexOf(s);if(e.mode==="explore"&&!In(e.bag,s)){B.toast("この建材は所持品にありません。");return}if(s===Li&&(es=n.id-Li),r>=0){ko(r);return}Wd(e.bag,e.selected,s,e.mode)?(Zn(),B.toast(te[s].name+"を選びました。")):B.toast("このブロックは選択できません。")}function N2(){if(!U||U.online?.tagGame)return;if(U.online){B.toast("共同建築では、置いたブロックを採掘して取り除けます。");return}if(U.data.mode!=="creative"){B.toast("元に戻す操作はクリエイティブで使えます。");return}const i=U,t=i.world.undo((e,n,s)=>Wo(i.player,e,n,s));je(),B.toast(t.message)}function Zn(){U&&(B.screen==="inventory"?B.inventory(Fo()):B.screen==="play"&&B.hud(Fo()))}function je(){tc="",ec=0,Mo=0,Qa=0,B.mining(0)}function Su(i){i!==Od&&(Od=i,ke.style.setProperty("--aim-y",i+"%"))}function Tm(){const i=U;if(!(!i||!["play","pause","ready"].includes(B.screen))){i.kids?(i.kidsPitch=i.player.pitch,i.player.pitch=i.originalPitch):(i.originalPitch=i.player.pitch,i.player.pitch=i.kidsPitch),i.kids=!i.kids,pt.rememberView(i.player),pt.mining=!1,pt.cancelPlacementTap(),je(),ns=0,i.view.kidsCamera.reset(),Su(50),is="",B.showViewMode(i.kids);try{localStorage.setItem(Mm,i.kids?"kids":"original")}catch{}}}function ko(i){!U||U.online?.tagGame||!Number.isInteger(i)||i<0||i>8||(U.data.selected=i,je(),Zn(),ic(U))}function fi(){pt.stop(),U&&gc(U.player),Je.setPlaying(!1),je(),ns=0,Ar=0,Rr=0}function Uc(){!U||!pt.active||(fi(),B.pause(!1,Pe))}function Am(){!U||!pt.active||U.online?.tagGame||(ae=null,fi(),B.inventory(Fo()))}function Rm(i){const t=i&&Pe==="tablet";Lc.hidden=!t,Fd.hidden=U?.data.mode!=="creative"||!!U.online?.tagGame,Ja.sprint.hidden=!t||!U?.online?.tagGame;const e=!!U?.player.flying;return Fd.setAttribute("aria-pressed",String(e)),Ja.jump.textContent=e?"上昇":"ジャンプ",Ja.down.textContent=e?"下降":"しゃがむ",t}function Cm(i){if(!U||!pt.active)return;i&&Pe==="lock"&&(Pe=Mu());const t=U.online?.tagGame;if(t&&!t.started){const{x:e,z:n}=U.player;t.peers.some(({pose:s})=>Math.hypot(e-s.x,n-s.z)<=1.2)&&Au(U,t.peers),t.started=!0}B.play(i,yu,pt.pending,Rm(i)),B.hud(Fo()),kr()}function nc(i){if(!(!U||!["ready","pause","inventory"].includes(B.screen))){if(!ls){B.pause(!1,Pe,"描画の復旧を待っています。ワールドを書き出すこともできます。");return}if(U.online&&(!U.online.ready||U.online.ended)){B.toast(U.online.ended?"退出してルームに参加し直してください。":"共有ワールドの読み込みが完了するまでお待ちください。");return}ae=null,yu=!U.data.guideSeen&&!U.online?.tagGame,Pe=i,Fr=!1,Rr=0,gr=0,fo=0,Je.unlock(),Je.setPlaying(!0),pt.start(i!=="lock"),pt.pending&&Cm(!1)}}function F2(i,t){U&&pt.applyLook(U.player,i,t,He.sensitivity,He.invertY)}const So={conflict:"ほかの人が先にこの場所を変更しました。照準を合わせ直してください。",range:"ブロックにもう少し近づいてください。",blocked:"ここは設置・採掘できません。建材や人が重なっていない場所を選んでください。",limit:"このルームで共有できるブロック変更数に達しました。",uncertain:"通信を確認しています。建築の結果が画面に反映されるまでお待ちください。",offline:"接続が戻ると建築できます。",invalid:"編集内容を共有できませんでした。照準を合わせ直してください。"};function Pm(i,t,e){const{key:n,block:s,before:r}=t,o=n&255,c=n>>>16,a=n>>>8&255,l=s===0,h=l?r:s;i.view.effect(o,c,a,h,l?"mine":"place"),Je.sound(l?"mine":"place",h),l&&i.data.mode==="explore"&&Je.sound("pickup"),!l&&i.data.mode==="explore"&&hp(i.data.journey,h,{x:o,y:c,z:a})&&kr(),B.toast(e??te[h].name+(l?"を取り除きました。":"を置きました。"))}function Eu(i){const t=i.online,e=t?.pendingExplore;!t?.sync||!e||t.editing||t.ended||t.state!=="connected"||(t.editing=!0,t.sync.edit(e.edit).then(n=>{if(U===i){if(!n.ok&&!["conflict","range","blocked","limit","invalid"].includes(n.reason??"")){n.reason==="uncertain"&&B.toast(So.uncertain);return}t.pendingExplore=void 0,n.ok?(i.data.bag=e.after,Pm(i,e.edit,e.message),Zn()):B.toast(So[n.reason??""]??So.invalid),Mn(i)}}).catch(n=>{U===i&&B.toast(ui(n))}).finally(()=>{t.editing=!1}))}function Im(i,t,e,n,s,r="y",o,c){const a=i.online;if(!a?.ready||a.ended||a.state!=="connected"||!a.sync){B.toast(So.offline);return}if(a.editing||a.pendingExplore)return;const l=i.world.get(t,e,n),h=Ce(t,e,n),u={key:h,before:l,fromRevision:a.versions.get(h)??0,block:s,axis:r};if(o){a.pendingExplore={edit:{...u,actionId:crypto.randomUUID()},after:o,message:c},Mn(i),Eu(i);return}a.editing=!0,a.sync.edit(u).then(f=>{if(U===i){if(!f.ok){B.toast(So[f.reason??""]??"共同建築の変更を確認できませんでした。");return}Pm(i,u)}}).catch(f=>{U===i&&B.toast(ui(f))}).finally(()=>{a.editing=!1})}function Lm(){if(!U||!pt.active)return;if(U.online?.tagGame){Tu();return}const{world:i,player:t,data:e,view:n}=U,s=$n(i,t);if(yc()||!t.crouched&&wm(s))return;if(s&&(U.land?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz)||U.frontier?.occupies(s.x+s.nx,s.y+s.ny,s.z+s.nz))){B.toast("住民や動物がいる場所には置けません。");return}const r=s&&e.mode==="creative"?i.capture(s.x+s.nx,s.y+s.ny,s.z+s.nz):null,o=e.bag.hotbar[e.selected],c=o===Li?Li+es:o;if(U.online){if(Dc(U))return;const l=pu(i,t,e.bag,e.mode,e.selected,s);if(l||!s){B.toast(l??"設置したい面に照準を合わせてください。");return}if(!Xo(o,e.mode)){B.toast("共有ワールドで使える建材を選んでください。");return}const h=e.mode==="explore"?structuredClone(e.bag):void 0;if(h&&!Zd(h,o))return;Im(U,s.x+s.nx,s.y+s.ny,s.z+s.nz,c,o===5?$i:"y",h),je();return}const a=wM(i,t,e.bag,e.mode,e.selected,s,c);if(a.ok&&s){const l=s.x+s.nx,h=s.y+s.ny,u=s.z+s.nz;o===5&&i.setAxis(l,h,u,$i),r&&i.remember(r),e.mode==="explore"&&hp(e.journey,o,{x:l,y:h,z:u})&&kr(),n.effect(l,h,u,o,"place"),Je.sound("place",o),Zn(),je()}B.toast(a.message)}function Dm(){!U||!pt.active||U.online?.tagGame||(U.data.bag.hotbar[U.data.selected]===Li?(es=(es+1)%4,B.toast("滑り台の下り方向　"+xm[es])):($i=$i==="y"?"x":$i==="x"?"z":"y",B.toast("原木の向き　"+{x:"東西",y:"縦",z:"南北"}[$i])))}function wu(i){if(!U||!pt.active||U.online?.tagGame)return;const{world:t,player:e,data:n,view:s}=U,r=$n(t,e);if(!pt.mining||!r){tc&&je();return}if(ns>0||U.online?.editing||Dc(U))return;const o=[r.x,r.y,r.z,r.id,n.selected].join("/");if(o!==tc&&(je(),tc=o),r.id===14){B.toast("岩盤は掘れません。"),pt.mining=!1,je();return}const c=n.bag.hotbar[n.selected],a=n.mode==="creative"||In(n.bag,c)?c:0,l=$m(r.id,a,n.mode);if(!Number.isFinite(l)){B.toast("この素材にはツルハシが必要です。"),pt.mining=!1,je();return}if(ec+=i,Mo=Math.min(1,ec/l),B.mining(Mo),Qa-=i,Qa<=0&&i>0&&Mo<.96&&(Je.sound("tap",r.id),Qa=.32),ec<l&&!(n.mode==="creative"&&i===0))return;if(U.online){if(!Xo(r.id,n.mode)){B.toast("このブロックは共有ワールドで取り除けません。"),pt.mining=!1,je();return}const f=n.mode==="explore"?Kd(n.bag,r.id,a):void 0;if(f&&!f.draft){B.toast(f.message),pt.mining=!1,je();return}U.online.state!=="connected"&&(pt.mining=!1),Im(U,r.x,r.y,r.z,0,"y",f?.draft,f?.message),je(),ns=.15;return}const h=n.mode==="creative"?t.capture(r.x,r.y,r.z):null,u=EM(t,e,n.bag,n.mode,n.selected,r);u.ok?(h&&t.remember(h),s.effect(r.x,r.y,r.z,r.id,"mine"),Je.sound(u.message.includes("壊れ")?"break":"mine",r.id),n.mode==="explore"&&Je.sound("pickup"),Zn()):pt.mining=!1,B.toast(u.message),je(),ns=n.mode==="creative"?.15:.11}function Um(){if(!U||!pt.active||U.online?.tagGame)return;const{player:i,data:t}=U;if(t.mode!=="creative"){B.toast("飛行はクリエイティブモードで使えます。");return}i.flying=!i.flying,i.vy=0;const e=Rm(pt.drag);B.toast(i.flying?e?"飛行中：上昇・下降ボタンで高さを変えられます。":"飛行中：Spaceで上昇、Ctrlで下降":"飛行を終了しました。")}function Xh(){const i=U,t=i?.aquatic;return!i||!t||!pt.active||!t.attack(i.player)?!1:(pt.mining=!1,je(),t.sharkDefeated&&!i.data.sharkDefeated&&(i.data.sharkDefeated=!0,Mn(i)),!0)}function yc(){const i=U,t=i?.frontier;if(!i||!t||!pt.active)return!1;const{player:e,data:n}=i,s=n.bag.hotbar[n.selected],r=ii;if(!zo(s))return!1;pt.mining=!1,je();const o=s===r.revolver?r.rounds:s===r.torch?r.torch:r.fireArrow;if(n.mode==="explore"){if(!In(n.bag,s))return B.toast("道具を持っていません。"),!0;if(o===r.fireArrow&&!In(n.bag,r.bow))return B.toast("火矢を使うには弓が必要です。"),!0;if(!In(n.bag,o))return B.toast(te[o].name+"がありません。"),!0}const c=t.action(e,s===r.bow?r.fireArrow:s);return c.ok&&(n.mode==="explore"&&$d(n.bag,o),Je.sound(s===r.revolver?"break":"place"),Zn(),Mn(i)),c.message&&B.toast(c.message),!0}function k2(i){const t=i.world.spawn();let e;try{e=No(i.world,t)}catch{e=No(i.world,{...t,y:Fn+3})}Object.assign(i.player,du({...e,pitch:i.kids?i.kidsPitch:e.pitch})),i.kids||(i.originalPitch=i.player.pitch),pt.reset(),pt.rememberView(i.player),je(),ns=0,i.view.kidsCamera.reset(),i.aquatic?.resetHealth(),i.frontier?.restoreHealth(),B.toast((i.frontier?"町の入口":"岸")+"に戻りました。持ち物は引き継がれています。")}function Nm(i,t){const e=i.aquatic,n=i.frontier?.health??e?.health??100,s=e?.sharkHealth??100,r=!!i.frontier||!!e?.hasAquaticLife&&(i.player.inWater||n<100);A2.hidden=!r&&!t,R2.hidden=!t;const o=!!i.frontier&&zo(i.data.bag.hotbar[i.data.selected]);Bl.hidden=!pt.active||!pt.drag||!t&&!o;const c=o?"使う":"攻撃";Bl.textContent!==c&&(Bl.textContent=c),kd.value!==n&&(kd.value=n,C2.textContent=String(n)),zd.value!==s&&(zd.value=s,P2.textContent=String(s))}const pt=new KM(Ni,{pause:Uc,inventory:Am,place:Lm,select:ko,look:F2,beginMine:()=>{!yc()&&!Xh()&&wu(0)},pick:U2,undo:N2,viewMode:Tm,tagMap:Om,attack:()=>{!yc()&&!Xh()&&U?.aquatic&&B.toast("近くのサメに照準を合わせてください。")},rotate:Dm,interact:()=>{U&&wm($n(U.world,U.player),!0)},home:()=>{if(U){const{x:i,y:t,z:e}=U.player;U.data.journey.home={x:i,y:t,z:e},kr(),B.toast("現在地を拠点に登録しました。")}},guide:()=>{U&&(U.data.journey.hidden=!U.data.journey.hidden,kr())},cycle:i=>{U&&ko((U.data.selected+i+9)%9)},fly:Um,debug:()=>{bo=!bo,bo||B.debug("")},dragChanged:Cm,background:()=>{U&&Mn(U)},recovery:i=>{U&&(fi(),Pe=Mu(),B.pause(!1,Pe,i))}},Ja);function Fm(i){const{x:t,y:e,z:n,yaw:s,pitch:r}=i.player;return{...i.data,sharkDefeated:i.aquatic?.sharkDefeated??i.data.sharkDefeated,frontier:i.frontier?.save()??i.data.frontier,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:i.player.crouched},flying:i.player.flying,edits:i.world.exportEdits(),fixtures:i.world.exportFixtures(),journey:structuredClone(i.data.journey),settings:{...He},bag:structuredClone(i.data.bag)}}function Mn(i){if(i.online){if(i.data.mode==="explore"){const{x:t,y:e,z:n,yaw:s,pitch:r,crouched:o}=i.player;Bb(i.online.connection.room.code,i.online.nickname,{bag:i.data.bag,selected:i.data.selected,journey:i.data.journey,pose:{x:t,y:e,z:n,yaw:s,pitch:i.kids?i.originalPitch:r,crouched:o},pending:i.online.pendingExplore})}return Promise.resolve(!0)}return Vl=Vl.then(async()=>{if(i!==U)return!0;B.status("保存中…");try{const t=await as.write(Fm(i),i.data.revision||null);return i.data.revision=t.revision,i.data.updatedAt=t.updatedAt,B.status("保存済み"),!0}catch(t){return B.status("保存失敗："+ui(t)),!1}}),Vl}function ic(i){if(i.online&&i.data.mode==="explore")return Mn(i)}async function Eo(){if(U){const i=U;if(fi(),i.online?.sync?.close(),!await Mn(i)&&!window.confirm("保存できませんでした。キャンセルすると今の状態をファイルへ書き出せます。保存せずにタイトルへ戻りますか？")){B.pause(!1,Pe);return}km(i),i.view.dispose(),U=null}B.onlineSession(null),B.title(!1);try{const i=await as.list();B.screen==="title"&&B.title(!!i.length)}catch(i){B.screen==="title"&&B.status("保存領域："+ui(i))}}function km(i){i.land?.dispose(),i.aquatic?.dispose(),i.frontier?.dispose(),i.online?.tagGame?.rides?.dispose(),qi.hidden=!0}function sc(i){const{stage:t,tagBots:e,mode:n}=i.connection.room;B.onlineSession({code:i.connection.room.code,count:i.count,state:i.state,stage:t,tagBots:e,cops:n==="cops"})}function z2({stamina:i},t){Ol.hidden=!1;const e=Math.ceil(i.energy);Ud.value!==e&&(Ud.value=e);const n=e<100&&i.rest>=Vh,s=i.exhausted?"empty":e<=25?"low":n?"recovering":t?"running":"ready";Ol.dataset.state!==s&&(Ol.dataset.state=s);const r=i.exhausted?e?"ダッシュを放す":"スタミナ切れ":t?"ダッシュ中":n?"回復中":e<100?"休憩中":Lc.hidden?"Shiftでダッシュ":"";Nd.textContent!==r&&(Nd.textContent=r)}function qo(i,t=performance.now()){const e=i.online,n=e?.tagGame;if(!e||!n)return;if(n.copsMode){O2(i,e,n,t);return}const s=n.status,r=e.connection.id,o=s?.it===r,c=s?.phase==="hiding",a=s?.phase==="playing",l=s?.phase==="finished",h=(a||c&&!!s.previousIt)&&!!e.connection.room.tagMinutes&&s.enrolledIds&&!s.enrolledIds.includes(r),u=l?"試合終了":a||c?o?"鬼":h?"観戦中":"逃げ役":"参加者を待っています",f=s?.serverNow===void 0?Date.now():s.serverNow+Math.max(0,t-n.receivedAt);let d;if(c){const g=Math.max(0,Math.ceil((s.hideUntil-f)/1e3)),m=n.hideRemaining=Math.min(n.hideRemaining??g,g),_=!!s.previousIt,b=o?_?"タッチされた！ あなたが鬼":"あなたが鬼":s.previousIt===r?"タッチ成功！":_?"鬼が交代！":"あなたは逃げ役",y=o?"カウントが終わるまでその場で待とう。":h?"追いかけっこの再開を待っています。":s.previousIt===r?"逃げ役になりました。すぐに逃げて隠れよう。":"鬼が動き出す前に隠れよう。";d={remaining:m,title:b,detail:y}}if(l)n.remaining=0;else if((a||c)&&s.endsAt>0){const g=Math.max(0,Math.ceil((s.endsAt-(c?s.hideUntil:f))/1e3));n.remaining=c?g:Math.min(n.remaining??g,g)}const p=l||c?"":h?"結果を待っています":a?o?"逃げ役にぶつかるとタッチ":"鬼から逃げて隠れよう":e.connection.room.tagBots?"プレイ開始を押すとCPUと対戦できます":"2人以上で開始",v=[u,p,n.open,n.remaining,d?.remaining,d?.title].join("/");n.uiKey!==v&&(B.tagMode({label:u,hint:p,it:o,mapOpen:n.open,remaining:n.remaining,hide:d}),n.uiKey=v),n.open&&t>=n.mapDue&&(n.map.update(n.peers,i.player,a),n.mapDue=t+240)}function O2(i,t,e,n){const s=e.cops,r=t.connection.id,o=s?.phase==="playing",c=s?.phase==="hiding",a=!!s?.policeIds.includes(r),l=!!s?.jailedIds.includes(r),h=o&&!s.enrolledIds.includes(r),u=(s?.serverNow??Date.now())+Math.max(0,n-e.receivedAt),f=c||o?Math.max(0,Math.ceil((s.endsAt-(c?s.hideUntil:u))/1e3)):void 0,d=c?{remaining:Math.max(0,Math.ceil((s.hideUntil-u)/1e3)),title:a?"ケイの待機時間":"あなたはドロ",detail:a?"ドロが逃げる間、その場で待とう。":"20秒の間にケイから離れ、身を隠そう。"}:void 0,p=s?.phase==="finished"?"試合終了":l?"牢屋":h?"観戦中":o||c?a?"ケイ":"ドロ":"参加者を待っています",v=s?.jailedIds.length??0,g=s?s.enrolledIds.filter(b=>!s.policeIds.includes(b)).length:0,m=l?"仲間の救出を待とう":h?"対戦を見守っています":o?a?"ドロに触れて確保　"+v+"/"+g:v?"仲間を救出　"+ac(Gl,i.player):"時間切れまで逃げよう":c||s?.phase==="finished"?"":t.connection.room.tagBots?"プレイ開始を押すとCPUと対戦できます":"2人以上で開始",_=[p,m,e.open,f,d?.remaining].join("/");e.uiKey!==_&&(B.tagMode({label:p,hint:m,it:a,mapOpen:e.open,remaining:f,hide:d,cops:!0}),e.uiKey=_),e.open&&n>=e.mapDue&&(e.map.update(e.peers,i.player,o&&!l&&!h),e.mapDue=n+240)}function za(i,t){const e=i.player;Object.assign(e,{x:t.x,y:t.y,z:t.z,vy:0}),t.yaw!==void 0&&(e.yaw=t.yaw,pt.rememberView(e)),gc(e),Ar=0,i.view.kidsCamera.reset()}function Tu(){const i=U,t=i?.online,e=t?.tagGame,n=t?.connection.id,s=e?.rides;if(!i||!e||!n||!s||!pt.active||!zm(e.cops,n))return!1;if(e.rideCommand!==void 0)return!0;if(s.playerPose(n))e.rideCommand=null;else{const r=s.target(i.player);if(!r)return!1;if(r.seat===void 0)return B.toast("すべての席が使用中です。"),!0;e.rideCommand={id:r.id,seat:r.seat}}return e.rideUntil=performance.now()+2200,!0}function zm(i,t){return!!i&&!i.jailedIds.includes(t)&&i.enrolledIds.includes(t)&&(i.phase==="playing"||i.phase==="hiding"&&!i.policeIds.includes(t))}function B2(i,t,e,n,s){const r=e.cops,o=t.connection.id,c=performance.now(),a=e.seats?.find(p=>p.memberId===o),l=e.rides?.exit(o),h=s.find(p=>p.memberId===o),u=n.jailedIds.includes(o),f=!!r?.jailedIds.includes(o),d=n.policeIds.includes(o);if(u&&!f?za(i,v0):f&&!u?za(i,_0):d&&!r?.policeIds.includes(o)?(za(i,m0),Au(i,e.peers)):a&&!h&&l&&!u&&za(i,l),e.rideCommand===null&&!h||e.rideCommand?.id===h?.id&&h||u?e.rideCommand=void 0:e.rideCommand!==void 0&&c>=(e.rideUntil??0)&&(e.rideCommand=void 0,B.toast("空いている席へ近づいてください。")),e.cops=n,e.seats=s,e.receivedAt=c,r?.phase!==n.phase&&(e.mapDue=0),n.seq!==r?.seq&&n.event)if(n.event.kind==="capture")B.toast(u&&!f?"確保された！ 仲間の救出を待とう。":n.event.by===o?"タッチ成功！ ドロを確保しました。":"ケイがドロを確保！");else{const p=n.event.by===o?t.nickname:e.peers.find(v=>v.id===n.event?.by)?.nickname;B.toast(p?p+"が牢屋の仲間を救出！":"仲間が牢屋から救出された！")}if(n.phase==="finished"&&r?.phase!=="finished"){e.open=!1,qi.hidden=!0,fi();const p=n.enrolledIds.includes(o)?n.winnerIds.includes(o)?"win":"lose":"spectator",v=n.results.filter(g=>n.winnerIds.includes(g.id)).map(g=>g.nickname);B.copsResult(p,n.winner==="police",v)}qo(i,c)}function Om(){const i=U,t=i?.online?.tagGame;!i||!t||!pt.active||(t.open=!t.open,t.mapDue=0,qo(i))}function Au({world:i,player:t},e){for(const[n,s]of[[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,2],[2,-2]]){const r=No(i,{...t,x:t.x+n,z:t.z+s});if(e.every(({pose:o})=>Math.hypot(r.x-o.x,r.z-o.z)>1.2)){Object.assign(t,{x:r.x,y:r.y,z:r.z});return}}}function H2(i,t,e){const{player:n,world:s}=i;let r=!1;for(const l of e.cells){const{key:h,block:u,axis:f,revision:d}=l;if((t.versions.get(h)??0)>=d)continue;const p=h&255,v=h>>>16,g=h>>>8&255;s.get(p,v,g)!==u&&s.set(p,v,g,u)&&ri(u)&&Wo(n,p,v,g)&&(r=!0),u===5&&s.setAxis(p,v,g,f),t.versions.set(h,d)}if(r){const{x:l,y:h,z:u}=No(s,n,!0);Object.assign(n,{x:l,y:h,z:u,vy:0}),gc(n)}const o=e.players.filter(l=>l.id!==t.connection.id),c=t.tagGame;if(c&&e.cops&&(c.peers=o,B2(i,t,c,e.cops,e.rides??[])),!t.ready&&!t.restoring&&!c&&o.length&&Au(i,o),c&&e.tag){const l=c.status,h=e.tag,u=t.connection.id;if(h.phase==="waiting"&&(c.remaining=void 0),(l?.phase!==h.phase||l.hideUntil!==h.hideUntil)&&(c.hideRemaining=void 0,c.mapDue=0),h.phase==="hiding"&&h.it===u&&(l?.phase!=="hiding"||l.it!==u)&&(gc(n),n.vy=0,Ar=0),c.status=h,c.receivedAt=performance.now(),c.peers=o,h.phase==="finished"&&l?.phase!=="finished"){c.open=!1,fi();const f=h.results.find(p=>p.id===h.it),d=h.results.filter(p=>p.id!==h.it).map(p=>p.nickname);B.tagResult({outcome:u===h.it?"lose":h.winnerIds.includes(u)?"win":"spectator",loser:f.nickname,winners:d,minutes:t.connection.room.tagMinutes})}else h.phase==="playing"&&l?.it!==h.it&&h.previousIt&&(h.it===u?B.toast("タッチされました！ あなたが鬼です。"):h.previousIt===u&&B.toast("タッチ成功！ 逃げ役になりました。"));qo(i)}const a=c?.status?.phase==="hiding"&&c.status.it===t.connection.id||c?.cops?.phase==="hiding"&&c.cops.policeIds.includes(t.connection.id);i.view.actors.setPlayers(a?[]:o,c?.status?.it,c?.cops?.policeIds),t.count!==o.length+1&&(t.count=o.length+1,sc(t)),t.ready=!0,is="",ae?.id===21&&s.get(ae.x,ae.y,ae.z)!==21&&(ae=null,Zn(),B.toast("作業台が取り除かれました。")),Eu(i)}function V2(i,t){sc(t),t.sync=xc.start(t.connection,{pose:()=>{if(U!==i||t.tagGame&&!t.tagGame.started)return null;const{x:e,y:n,z:s,yaw:r,crouched:o,flying:c,vx:a,vz:l}=i.player;return{x:e,y:n,z:s,yaw:r,crouched:o,flying:c,moving:Math.hypot(a,l)>.18}},ride:()=>{const e=t.tagGame;if(!e?.rides)return;if(e.rideCommand!==void 0)return e.rideCommand;const n=e.seats?.find(s=>s.memberId===t.connection.id);return n?{id:n.id,seat:n.seat,pump:e.pump??0}:void 0},onFrame:e=>{U===i&&H2(i,t,e)},onState:e=>{U===i&&(t.state=e,sc(t),Eu(i))},onEnd:e=>{U!==i||t.tagGame?.status?.phase==="finished"||t.tagGame?.cops?.phase==="finished"||(t.ended=!0,t.state="reconnecting",sc(t),fi(),B.pause(!1,Pe,ui(e)))}})}async function Oa(i,t,e,n="",s=""){if(U||zn)return;if(!ls){B.error(bu);return}zn=!0;let r;try{e&&(B.loading("ルームに接続中…"),r=await e()),B.loading("ワールドを準備しています…");const o=i?await as.get(i):void 0;if(i&&!o)throw new Error("ワールドが見つかりません。一覧を開き直してください。");const c=r?.room.seed||o?.seed||t?.seed?.trim().slice(0,128)||crypto.randomUUID().slice(0,8),a=t?.stage,l=r?.room.stage??o?.stage??(ts(a)?a:"classic"),h=r?.room.mode==="cops";let u=-1;const f=await wc.generate(c,A=>{const w=Math.min(10,Math.floor(A*10));u!==w&&(B.loading("地形を生成中　"+w*10+"%"),u=w)},r?.room.generator??o?.generator??2,l,h);o&&(f.loadEdits(o.edits),f.loadFixtures(o.fixtures));const d=f.spawn(),p=r?.room.mode==="tag"||h,v=r?r.room.mode==="explore"?"explore":"creative":t?.mode??o?.mode??"creative",g=r&&v==="explore"?Ob(r.room.code,s):void 0,m=()=>v==="explore"?Fb(l):Gd(p?"explore":v),_=o??{format:"webcraft777",version:2,generator:2,id:crypto.randomUUID(),fixtures:op(),journey:g?.journey??cp(),revision:0,updatedAt:Date.now(),name:r?.room.name||t?.name.trim().slice(0,64)||"新しいワールド",seed:c,mode:v,stage:l,pose:g?.pose??d,flying:!1,bag:g?.bag??m(),selected:g?.selected??0,edits:[],day:.39,settings:{...He},guideSeen:!1};if(!o&&!p&&v==="creative"&&l!=="classic"&&(_.bag.hotbar=l==="frontier"&&!r?[7,8,10,5,9,12,38,36,34]:[7,8,10,27,28,29,Li,9,12]),!_.journey.home){const{x:A,y:w,z:R}=d;_.journey.home={x:A,y:w,z:R}}ae=null,$i="y",es=0,Wh="",He={..._.settings},xu();const b=du(No(f,_.pose,!!(o||g)));b.flying=_.mode==="creative"&&_.flying;const y=new zM(Ni,f);if(U={world:f,data:_,player:b,view:y,kids:D2(),originalPitch:b.pitch,kidsPitch:-.43},U.kids&&(b.pitch=U.kidsPitch),y.configure(He),is="",Su(50),pt.rememberView(b),Fr=!1,Pe=Sm(),r){const A={connection:r,state:"connecting",count:1,ready:!1,ended:!1,editing:!1,versions:new Map,nickname:s,restoring:!!g,pendingExplore:g?.pending};if(U.online=A,p){A.tagGame={map:new x2(w2,f,T2,h),stamina:S2(),receivedAt:performance.now(),peers:[],started:!1,open:!1,mapDue:0,uiKey:"",copsMode:h,rides:h&&l==="park"?new m2(y.scene):void 0};const w=A.tagGame.rides;w&&(y.actors.seatedPose=R=>w.playerPose(R)),qo(U)}V2(U,A)}else l==="frontier"?(U.frontier=new mb(f,y.scene),_.frontier&&U.frontier.restore(_.frontier)):(l==="classic"||l==="lake")&&(l==="classic"&&(U.land=new Jb(f,y.scene,b)),U.aquatic=new r2(f,y.scene,_.sharkDefeated));Nm(U,!1),B.setWorld(_.name),B.showViewMode(U.kids),B.pause(!0,Pe),!o&&!r&&await Mn(U),bo=!1}catch(o){U?.online?.sync?U.online.sync.close():r&&xc.leave(r),U&&(km(U),U.view.dispose(),U=null),B.onlineSession(null),B.tagMode(null),e?B.onlineMenu(n,ui(o)):(console.error(o),B.error(ui(o)))}finally{zn=!1}}async function G2(){const i=U?.online?.connection.room.code;if(!i)return;const t=new URL(location.href);t.searchParams.set("room",i);try{await navigator.clipboard.writeText(t.href),B.toast("招待リンクをコピーしました。")}catch{window.prompt("招待リンクをコピーしてください。",t.href)}}async function Bm(){try{const i=await as.list();B.worlds(i)}catch(i){B.worlds([]),B.status("保存失敗："+ui(i))}}async function W2(i){if(!(!i||zn)){zn=!0;try{if(i.size>128*1024*1024)throw new Error("バックアップは128 MBまで読み込めます。");const{save:t,original:e}=_b(await i.text()),n=await wc.generate(t.seed,void 0,t.generator,t.stage);n.loadEdits(t.edits),n.loadFixtures(t.fixtures);const s=(await as.list()).find(r=>r.id===t.id);if(s&&!await B.confirmImport(s.name))return;await as.write(e??t,s?.revision??null),await Bm(),B.status("読み込み・保存が完了しました。")}catch(t){B.status("読み込み失敗："+ui(t))}finally{zn=!1}}}async function Bd(i,t=!1){const e=i?t?await as.original(i):await as.get(i):U?Fm(U):void 0;if(t&&!e){B.toast("このワールドには旧版の保管データがありません。");return}if(!e)throw new Error("書き出すワールドが見つかりません。");Hm("ウェブクラフト777-"+e.name.replace(/[\\/:*?"<>|]/g,"_")+".json",xb(e)),B.status("バックアップファイルを書き出しました。")}function Hm(i,t){const e=URL.createObjectURL(new Blob([t],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=i,document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),6e4)}async function Ru(i,t){if(!(zn&&!["resume","resume-drag","resume-lock","resume-tablet","dismiss-guide"].includes(i))&&!(B.screen==="tag-result"&&i!=="online-leave")){if(U&&Dc(U)&&["assign","craft","split","sort"].includes(i)){B.toast("素材の変更を確認しています。少し待ってください。");return}switch(i){case"goto-create":B.create();break;case"online-menu":B.onlineMenu(Gh);break;case"online-create":Je.unlock(),await Oa(null,void 0,()=>xc.create(t),"",t.nickname);break;case"online-join":Je.unlock(),await Oa(null,void 0,()=>xc.join(t),t.code,t.nickname);break;case"online-copy":await G2();break;case"tag-map":Om();break;case"park-ride":Tu();break;case"online-leave":if(U?.online){zn=!0;try{await Eo()}finally{zn=!1}}break;case"goto-worlds":await Bm();break;case"goto-help":B.help();break;case"goto-settings":B.settings(He);break;case"back":U?B.screen==="inventory"?nc(Pe):B.pause(!1,Pe):await Eo();break;case"title":if(!zn){zn=!0;try{await Eo()}finally{zn=!1}}break;case"start":Je.unlock(),await Oa(null,t);break;case"load":Je.unlock(),await Oa(t);break;case"resume":nc(Pe);break;case"resume-drag":case"resume-lock":case"resume-tablet":{const e=i==="resume-tablet"?"tablet":i==="resume-drag"?"drag":"lock";try{localStorage.setItem(ym,e)}catch{}nc(e);break}case"diagnostics":if(U){pt.setDiagnostics(!0);const e=pt.report(),n="視点入力 "+e.lookEvents+" 回　フレーム "+e.frames+" 回　異常 "+e.anomalies+" 件";B.diagnostics(e.lastIssue?n+`
`+e.lastIssue:n,JSON.stringify(e,null,2))}break;case"export-diagnostics":U&&Hm("ウェブクラフト777-入力診断.json",JSON.stringify(pt.report(),null,2));break;case"reset-input":U&&(fi(),pt.rememberView(U.player),Pe=Mu(),B.pause(!1,Pe,"入力をリセットしました。「再開」から操作できます。"));break;case"pause":Uc();break;case"attack-shark":yc()||Xh();break;case"rotate-material":Dm();break;case"view-mode":Tm();break;case"touch-fly":Lc.hidden||Um();break;case"inventory":Am();break;case"select":ko(t);break;case"assign":U&&(!U.online||Xo(t.id,U.data.mode))&&Wd(U.data.bag,t.slot,t.id,U.data.mode,!!U.frontier)&&(Zn(),ic(U),B.toast("ホットバーに登録しました。"));break;case"craft":if(U&&U.data.mode==="explore"&&B.screen==="inventory"){const e=t.count??1,n=t.id??t;if(U.online&&n==="chest"){B.toast("共有ワールドでは作業台を使えます。");break}const s=Zm(U.data.bag,n,e,Em(U));s.ok&&(ae?.id===21&&U.world.useBench(ae.x,ae.y,ae.z,e),I0(U.data.journey,n),Je.sound("craft"),Zn(),ic(U)),B.toast(s.message)}break;case"mine-down":pt.active&&(pt.mining=!0,wu(0));break;case"mine-up":pt.mining=!1,je();break;case"place":Lm();break;case"supply":{if(U&&B.screen==="inventory"&&ae?.id===22){const e=e0(U.data.bag,U.data.mode,t.id,t.count);B.toast(e.message),e.ok&&Zn()}break}case"split":case"sort":case"transfer":case"transfer-all":{if(!U||B.screen!=="inventory")break;const e=U.data.bag,n=ae?.id===22?U.world.chestAt(ae.x,ae.y,ae.z):void 0,s=t?.side==="chest"?"chest":"bag",r=s==="bag"?e.slots:n;if(!r)break;const o=i==="sort"?Qm(r):i==="split"?Jm(r,t.index):n?i==="transfer-all"?n0(e,n,s):Jd(e,n,s,t.index,t.half):void 0;o&&(B.toast(o.message),o.ok&&(Zn(),ic(U)));break}case"preset":{if(Object.hasOwn(cc,t)){const e=t;await Ru("settings-change",{...He,...cc[e],quality:e}),B.screen!=="tag-result"&&B.settings(He)}break}case"original":await Bd(t,!0);break;case"save":U&&await Mn(U);break;case"settings-change":Zh(t)&&(He={...t},vb(He),U?.view.configure(He),is="",xu());break;case"dismiss-guide":U&&(U.data.guideSeen=!0),yu=!1;break;case"import":await W2(t);break;case"export":await Bd(t);break}}}document.addEventListener("keydown",i=>{if(i.repeat||i.defaultPrevented||pt.active||document.querySelector("dialog[open]"))return;const t=/^Digit([1-9])$/.exec(i.code);if(B.screen==="inventory"&&t){i.preventDefault(),ko(Number(t[1])-1);return}B.screen==="inventory"&&(i.code==="KeyE"||i.code==="Escape")?(i.preventDefault(),i.code==="Escape"?B.pause(!1,Pe):nc(Pe)):i.code==="Escape"&&["settings","help","create","worlds","diagnostics","online"].includes(B.screen)&&(i.preventDefault(),Ru("back"))});Ni.addEventListener("webglcontextlost",i=>{i.preventDefault(),ls=!1,Uc(),U&&Mn(U),B.screen!=="tag-result"&&B.error("3D描画が中断されました。ページを再読み込みし、「つづきから」再開してください。")});Ni.addEventListener("webglcontextlost",i=>{i.preventDefault(),ls=!1,Fr=!0,fi(),B.screen!=="tag-result"&&(U?(B.pause(!1,Pe,"3D描画を中断しました。復旧後に再開できます。"),Mn(U)):B.error(bu))});Ni.addEventListener("webglcontextrestored",()=>{ls=!0,Fr=!1,is="",U?(U.view.configure(He),B.screen!=="tag-result"&&B.pause(!1,Pe,"3D描画が復旧しました。操作を再開できます。")):Eo()});window.addEventListener("pagehide",i=>{U&&(pt.active&&Uc(),U.online?(Mn(U),i.persisted||U.online.sync?.close()):Mn(U))});window.setInterval(()=>{U&&!document.hidden&&Mn(U)},25e3);function Vm(i){if(requestAnimationFrame(Vm),!U||!ls||Fr||document.hidden){Rr=0;return}try{X2(i)}catch(t){Fr=!0,pt.fail(t),console.error(t)}}function X2(i){if(!U)return;const t=U,e=Rr?(i-Rr)/1e3:0,n=Math.min(e,.1);Rr=i;const s=t.online?.tagGame;if(s?.status?.phase==="finished"||s?.cops?.phase==="finished")return;s&&qo(t,i);const r=t.online?.connection.id??"",o=s?.cops,c=s?.rides,a=!!o?.policeIds.includes(r),l=!!o?.jailedIds.includes(r);let h;if(c&&o){c.update(s.seats??[],o.serverNow+Math.max(0,i-s.receivedAt)),h=l?void 0:c.playerPose(r);const C=pt.active&&zm(o,r)&&!h?c.target(t.player):null,D=h?"降りる":C?.label??"";qi.hidden=!pt.active||!D,qi.setAttribute("aria-pressed",String(!!h)),D&&qi.textContent!==D&&(qi.textContent=D)}let u=!1,f=!1;if(pt.active){const C=t.player,D=pt.movement(),O=C.x,W=C.z;if(!pt.frame(C,e))return;const X=s?.status?.it===r,j=!h&&!l&&!(X&&s?.status?.phase==="hiding")&&!(a&&o?.phase==="hiding");if(s){const ot=o?.phase??s.status?.phase;u=j&&(ot==="hiding"||ot==="playing")&&D.sprint&&!D.down&&!C.crouched&&Math.hypot(D.forward,D.right)>.03,D.sprint=u&&!s.stamina.exhausted&&s.stamina.energy>0}h&&s?(s.pump=Math.abs(D.forward)>.1?Math.sign(D.forward):0,Object.assign(C,{x:h.x,y:h.y,z:h.z,vx:0,vy:0,vz:0})):j&&bM(t.world,C,D,n,s?{...He,sprintSpeed:b2(s.copsMode?"cops":"tag",X)}:He);const K=Math.hypot(O-C.x,W-C.z);u=u&&K>n*.2&&!C.crouched,f=D.sprint&&u,Je.environment(t.world,C,n),t.land?.update(C,n,t.data.day);const H=t.aquatic;H?.update(C,n),t.frontier?.update(C,n,t.data.day);const st=t.frontier?.consumeEvent()??H?.consumeEvent();st&&B.toast(st),(H&&H.health<=0||t.frontier&&t.frontier.health<=0)&&k2(t),Hl-=n,Hl<=0&&(Hl=.24,t.data.mode==="explore"&&t.world.stage==="classic"&&L0(t.data.journey,t.world,C,t.data.bag),kr()),Ar+=K,Ar>1.8&&(Ar=0,C.grounded&&!C.flying&&Je.sound("step",t.world.get(Math.floor(C.x),Math.floor(C.y-.05),Math.floor(C.z)))),t.data.day=t.online?(.39+Math.max(0,Date.now()-t.online.connection.room.createdAt)/6e5)%1:(t.data.day+n/600)%1,ns=Math.max(0,ns-n),wu(n)}s&&(E2(s.stamina,u,n),z2(s,f));const d=pt.active&&!s?$n(t.world,t.player):null;if(pt.active)is="";else{const C=Ni.clientWidth+"/"+Ni.clientHeight+"/"+t.data.id;if(is===C&&!t.view.stats.queued)return;is=C}const p=pt.active&&!!t.aquatic?.canAttack(t.player),v=pt.active&&!p?t.frontier?.targetLabel(t.player)??t.land?.targetLabel(t.player,d?.distance):null;pt.active&&Nm(t,p);const g=s?0:t.data.bag.hotbar[t.data.selected],m=d&&!t.player.crouched&&(t.online?t.data.mode==="explore"&&d.id===21:[21,22].includes(d.id)),_=g===Li;ka.hidden=!pt.active||!pt.drag||!_||p;const b="向き "+xm[es];!ka.hidden&&ka.textContent!==b&&(ka.textContent=b);const y=d&&!m&&!p&&!v&&te[g]?.block&&!pt.mining?{x:d.x+d.nx,y:d.y+d.ny,z:d.z+d.nz,id:_?Li+es:g,axis:$i,valid:!pu(t.world,t.player,t.data.bag,t.data.mode,t.data.selected,d)&&!t.land?.occupies(d.x+d.nx,d.y+d.ny,d.z+d.nz)}:null,A=Lc.hidden?"右クリック":"タップ",w=g===ii.revolver?ii.rounds:g===ii.torch?ii.torch:ii.fireArrow,R=pt.active&&t.frontier&&zo(g)?te[g].name+" ×"+(t.data.mode==="creative"?"∞":Cr(t.data.bag,w))+"　"+(pt.drag?"使うボタン / X":"左クリック / X"):"",L=h?"前後でこぐ　V またはボタンで降りる":qi.hidden?"":qi.textContent+"　V またはボタン";B.target(L||(p?pt.drag?"サメ　攻撃ボタン / X":"サメ　左クリック / X":R||(v?v+"　"+(t.frontier?"V / "+A:A+"で話す"):m?A+(d.id===21?"で作業台":"でチェスト"):"")));const E=Math.hypot(t.player.vx,t.player.vz),S=t.data.mode==="creative"||In(t.data.bag,g)?g:0;if(t.view.update(t.player,d,t.data.day,pt.active?n:0,{active:pt.active,held:S,mining:Mo,preview:y,moving:He.bob&&t.player.grounded&&E>.15,sprinting:E>4.5},t.kids?{player:t.player,hit:d,seated:!!h}:void 0,!!s),t.kids&&Su(Math.round(t.view.kidsCamera.reticle.y*20)/20),pt.active&&bo){if(fo++,!gr)gr=i,fo=0;else if(i-gr>600){const{x:C,y:D,z:O}=t.player,W=t.view.stats;B.debug(Math.round(fo*1e3/(i-gr))+" FPS　描画 "+W.draws+" 回　チャンク "+W.chunks+`
三角形 `+W.triangles.toLocaleString("ja-JP")+"　更新 "+W.chunkMs.toFixed(1)+" ms　待ち "+W.queued+`
形状 `+W.geometries+" 個　テクスチャ "+W.textures+` 個
座標 `+[C,D,O].map(X=>X.toFixed(1)).join(" / ")),fo=0,gr=i}}}xu();Eo().then(()=>{ls?/^[A-HJ-NP-Z2-9]{8}$/.test(Gh)&&B.screen==="title"&&B.onlineMenu(Gh):B.error(bu)});requestAnimationFrame(Vm);
