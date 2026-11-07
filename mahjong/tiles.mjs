// Original vector tile faces. Tile IDs: man 0–8, pin 9–17, sou 18–26, honors 27–33.
const RANKS=['一','二','三','四','五','六','七','八','九'];
const HONORS=['東','南','西','北','白','發','中'];
const SUITS=['萬子','筒子','索子'];
const COLORS=['#315f6b','#396c5c','#725d80','#8a625b','#526d91','#8b7452','#6f5b81'];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function tileName(id){return Number.isInteger(id)&&id>=0&&id<34?id<27?`${id%9+1}${SUITS[Math.floor(id/9)]}`:HONORS[id-27]:'伏せ牌';}
function positions(n){
  return [[],[[25,28]],[[25,14],[25,42]],[[15,13],[25,28],[35,43]],[[15,15],[35,15],[15,41],[35,41]],[[14,14],[36,14],[25,28],[14,42],[36,42]],[[16,12],[34,12],[16,28],[34,28],[16,44],[34,44]],[[14,10],[25,19],[36,28],[16,37],[34,37],[16,49],[34,49]],[[16,9],[34,9],[16,22],[34,22],[16,35],[34,35],[16,48],[34,48]],[[12,12],[25,12],[38,12],[12,28],[25,28],[38,28],[12,44],[25,44],[38,44]]][n];
}
function pin(n){return positions(n).map(([x,y],i)=>{const radius=n===1?12:n<4?6:4.4,color=(n===5&&i===2)||n===1?'#b74e45':n===7&&i<3?'#3e8169':'#315a80';return `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="${color}" stroke-width="${n===1?3.2:1.7}"/><circle cx="${x}" cy="${y}" r="${radius*.49}" fill="none" stroke="${n===1?'#3d816d':color}" stroke-width="1.3"/>${n===1?'<circle cx="25" cy="28" r="2.8" fill="#b74e45"/>':''}`;}).join('');}
function sou(n){
  if(n===1)return '<path d="M27 9C16 10 12 19 16 30L12 43L23 37L29 47L32 35C42 29 38 14 27 9Z" fill="#2c7c67"/><path d="M25 12C18 16 18 25 24 31L32 26L33 16Z" fill="#6faa85"/><path d="M27 18L39 20L32 24" fill="#bd5545"/><circle cx="28" cy="17" r="1.7" fill="#172f38"/><path d="M17 32L27 27M20 47L20 40M27 48L25 39" fill="none" stroke="#8d6b45" stroke-width="2"/>';
  return positions(n).map(([x,y],i)=>{const color=n===5&&i===2?'#b34f45':'#2e7864';return `<path d="M${x} ${y-5}L${x} ${y+5}" stroke="${color}" stroke-width="4.7" stroke-linecap="round"/><path d="M${x-3} ${y-3}L${x+3} ${y-3}M${x-3} ${y+3}L${x+3} ${y+3}" stroke="${color}" stroke-width="1.8"/><path d="M${x-1} ${y-3}L${x-1} ${y+2}" stroke="#99bd97" stroke-width="1.1"/>`;}).join('');
}
function face(id){
  if(id<9)return `<text x="25" y="27" text-anchor="middle" font-size="28" font-weight="800" fill="#213943">${RANKS[id]}</text><text x="25" y="49" text-anchor="middle" font-size="20" font-weight="800" fill="#b34d45">萬</text>`;
  if(id<18)return pin(id%9+1);
  if(id<27)return sou(id%9+1);
  if(id===31)return '<rect x="10" y="10" width="30" height="36" rx="2" fill="none" stroke="#547181" stroke-width="2.1"/><rect x="13" y="13" width="24" height="30" rx="1" fill="none" stroke="#c9d1c4" stroke-width="1"/>';
  return `<text x="25" y="39" text-anchor="middle" font-size="32" font-weight="800" fill="${id===32?'#25725b':id===33?'#b34d45':'#253c47'}">${HONORS[id-27]}</text>`;
}
export function tileHTML(id,{small=false,selected=false,disabled=false,hidden=false,index=null,button=false,label=null}={}){
  const valid=Number.isInteger(id)&&id>=0&&id<34,back=hidden||!valid,name=label||tileName(back?null:id),tag=button?'button':'span';
  const classes=['tile',small?'tile-small':'',selected?'is-selected':'',back?'tile-back':''].filter(Boolean).join(' ');
  const data=Number.isInteger(index)?` data-tile-index="${index}"`:valid?` data-tile="${id}"`:'';
  const attrs=button?` type="button"${disabled?' disabled':''} aria-pressed="${!!selected}"`:' role="img"';
  const art=back?'<span class="tile-back-mark" aria-hidden="true">✦</span>':`<svg viewBox="0 0 50 56" aria-hidden="true" focusable="false">${face(id)}</svg>`;
  return `<${tag} class="${classes}"${attrs}${data} aria-label="${esc(name)}" title="${esc(name)}">${art}</${tag}>`;
}
export function portraitPlaceholder(stage=1,name='キャラクター未登録'){
  const n=Math.min(7,Math.max(1,Math.floor(Number(stage)||1))),color=COLORS[n-1];
  return `<svg class="portrait-placeholder" viewBox="0 0 320 400" role="img" aria-label="${esc(name)}"><defs><linearGradient id="portrait-${n}" x2="0" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="#152d38"/></linearGradient></defs><rect width="320" height="400" fill="url(#portrait-${n})"/><path d="M25 60L160 20L295 60V340L160 380L25 340Z" fill="none" stroke="#e4c485" stroke-opacity=".35"/><circle cx="160" cy="142" r="63" fill="none" stroke="#d8bf8b" stroke-opacity=".2"/><path d="M92 278C92 233 113 209 141 204C112 188 112 156 119 128C123 92 149 79 170 87C207 92 215 129 206 164C209 185 214 203 225 215C203 215 194 210 184 204C211 212 231 242 232 278Z" fill="#aec2bf" opacity=".34"/><circle cx="160" cy="136" r="30" fill="#c1cfbf" opacity=".16"/><path d="M64 300H256M112 314H208" stroke="#edcf91" stroke-opacity=".3"/><text x="160" y="344" text-anchor="middle" font-size="11" letter-spacing="2.6" fill="#d4d7c3" font-family="system-ui,sans-serif">CHARACTER IMAGE</text><text x="160" y="366" text-anchor="middle" font-size="11" fill="#d4d7c3" font-family="system-ui,sans-serif">${esc(name)}</text></svg>`;
}
