// Piece rotations and SRS kick tables retained from the original game.
export const SHAPES = {
  I:[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
     [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
     [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
     [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
  O:[[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
     [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
     [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
     [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]],
  T:[[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],
     [[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]],
  S:[[[0,1,1],[1,1,0],[0,0,0]],[[0,1,0],[0,1,1],[0,0,1]],
     [[0,0,0],[0,1,1],[1,1,0]],[[1,0,0],[1,1,0],[0,1,0]]],
  Z:[[[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],
     [[0,0,0],[1,1,0],[0,1,1]],[[0,1,0],[1,1,0],[1,0,0]]],
  J:[[[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],
     [[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]]],
  L:[[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],
     [[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]]]
};
const KICKS_JLSTZ = {
  '0>1':[[-1,0],[-1,1],[0,-2],[-1,-2]], '1>0':[[1,0],[1,-1],[0,2],[1,2]],
  '1>2':[[1,0],[1,-1],[0,2],[1,2]],     '2>1':[[-1,0],[-1,1],[0,-2],[-1,-2]],
  '2>3':[[1,0],[1,1],[0,-2],[1,-2]],    '3>2':[[-1,0],[-1,-1],[0,2],[-1,2]],
  '3>0':[[-1,0],[-1,-1],[0,2],[-1,2]], '0>3':[[1,0],[1,1],[0,-2],[1,-2]]
};
const KICKS_I = {
  '0>1':[[-2,0],[1,0],[-2,-1],[1,2]], '1>0':[[2,0],[-1,0],[2,1],[-1,-2]],
  '1>2':[[-1,0],[2,0],[-1,2],[2,-1]], '2>1':[[1,0],[-2,0],[1,-2],[-2,1]],
  '2>3':[[2,0],[-1,0],[2,1],[-1,-2]], '3>2':[[-2,0],[1,0],[-2,-1],[1,2]],
  '3>0':[[1,0],[-2,0],[1,-2],[-2,1]], '0>3':[[-1,0],[2,0],[-1,2],[2,-1]]
};

export const COLORS = { I:'#54e5f4', O:'#f9d469', T:'#bc95ff', S:'#b7ff63', Z:'#f7789b', J:'#729fff', L:'#ffaf75' };
export const SKILLS = { pulse:60, freeze:45, prism:35 };
const emptyRow = () => Array(10).fill(null);

// Deterministic, DOM-free game rules. All animation and sound live in app.mjs.
export class Game {
  constructor({mode='arcade', random=Math.random, onEvent=()=>{}}={}) {
    this.mode=mode; this.random=random; this.onEvent=onEvent;
    this.board=Array.from({length:20}, emptyRow); this.queue=[];
    this.score=0; this.lines=0; this.level=1; this.combo=-1; this.backToBack=false;
    this.energy=mode==='arcade'?35:0; this.elapsed=0; this.slowTime=0;
    this.gravity=0; this.lockTime=0; this.lockResets=0;
    this.hold=null; this.holdUsed=false; this.state='playing'; this.piece=null;
    this.fillQueue(); this.spawn();
  }
  emit(type, detail={}) { this.onEvent({type,...detail}); }
  fillQueue() {
    while(this.queue.length<7) {
      const bag=Object.keys(SHAPES);
      for(let i=bag.length-1;i>0;i--) { const j=Math.floor(this.random()*(i+1)); [bag[i],bag[j]]=[bag[j],bag[i]]; }
      this.queue.push(...bag);
    }
  }
  cells(p=this.piece) {
    if(!p) return [];
    const result=[];
    SHAPES[p.t][p.r].forEach((row,y)=>row.forEach((v,x)=>{if(v)result.push({x:p.x+x,y:p.y+y,t:p.t});}));
    return result;
  }
  valid(p) { return this.cells(p).every(({x,y})=>x>=0&&x<10&&y<20&&(y<0||!this.board[y][x])); }
  spawn(type=null) {
    this.fillQueue(); const t=type||this.queue.shift(); this.fillQueue();
    this.piece={t,x:3,y:t==='I'?-1:0,r:0};
    this.gravity=0; this.lockTime=0; this.lockResets=0;
    if(!this.valid(this.piece)) this.finish(false);
  }
  finish(won) { this.state=won?'won':'over'; this.emit('end',{won}); }
  ghost() {
    const p={...this.piece}; if(!this.piece)return p;
    while(this.valid({...p,y:p.y+1}))p.y++;
    return p;
  }
  grounded() { return this.piece&&!this.valid({...this.piece,y:this.piece.y+1}); }
  resetLock(wasGrounded) {
    if(wasGrounded&&this.lockResets<15) {this.lockTime=0;this.lockResets++;}
  }
  move(dx) {
    if(this.state!=='playing')return false;
    const p={...this.piece,x:this.piece.x+dx};
    if(!this.valid(p))return false;
    const was=this.grounded(); this.piece=p; this.resetLock(was); return true;
  }
  rotate(dir=1) {
    if(this.state!=='playing'||this.piece.t==='O')return false;
    const old=this.piece, r=(old.r+dir+4)%4;
    const kicks=old.t==='I'?KICKS_I:KICKS_JLSTZ;
    for(const [x,y] of [[0,0],...(kicks[`${old.r}>${r}`]||[])]) {
      const p={...old,r,x:old.x+x,y:old.y-y};
      if(this.valid(p)) {const was=this.grounded();this.piece=p;this.resetLock(was);this.emit('rotate');return true;}
    }
    return false;
  }
  softDrop() {
    if(this.state!=='playing')return false;
    const p={...this.piece,y:this.piece.y+1};
    if(!this.valid(p))return false;
    this.piece=p;this.score++;this.gravity=0;return true;
  }
  hardDrop() {
    if(this.state!=='playing')return;
    const from=this.cells(); const p=this.ghost();
    this.score+=(p.y-this.piece.y)*2; this.piece=p;
    this.emit('drop',{from,cells:this.cells()}); this.lock();
  }
  holdPiece() {
    if(this.state!=='playing'||this.holdUsed)return false;
    const old=this.piece.t, held=this.hold;
    this.hold=old;this.spawn(held);this.holdUsed=true;
    this.emit('hold');return true;
  }
  lock() {
    if(this.state!=='playing')return;
    const cells=this.cells();
    // Locking above the visible ceiling ends the game instead of silently dropping cells.
    if(cells.some(c=>c.y<0)){this.finish(false);return;}
    cells.forEach(({x,y,t})=>this.board[y][x]=t);
    this.emit('lock',{cells});
    const rows=[]; this.board.forEach((row,y)=>{if(row.every(Boolean))rows.push(y);});
    if(rows.length) {
      this.combo++;
      const n=rows.length, b2b=n===4&&this.backToBack;
      let points=([0,100,300,500,800][n]+Math.max(0,this.combo)*50)*this.level;
      if(b2b)points+=400*this.level;
      this.score+=points;this.lines+=n;this.backToBack=n===4;
      if(this.mode==='arcade')this.energy=Math.min(100,this.energy+[0,18,36,60,90][n]+Math.max(0,this.combo)*4);
      const removed=rows.flatMap(y=>this.board[y].map((t,x)=>({x,y,t})));
      this.board=this.board.filter((_,y)=>!rows.includes(y));
      while(this.board.length<20)this.board.unshift(emptyRow());
      const priorLevel=this.level;
      if(this.mode==='arcade')this.level=1+Math.floor(this.lines/10);
      this.emit('clear',{rows,cells:removed,n,points,combo:this.combo,b2b});
      if(this.level>priorLevel)this.emit('level',{level:this.level});
    } else this.combo=-1;
    if(this.mode==='arcade')this.energy=Math.min(100,this.energy+2);
    if(this.mode==='sprint'&&this.lines>=40){this.finish(true);return;}
    this.holdUsed=false;this.spawn();
  }
  canUse(name) {
    return this.mode==='arcade'&&this.state==='playing'&&name in SKILLS&&this.energy>=SKILLS[name]
      &&(name!=='freeze'||this.slowTime<=0)
      &&(name!=='prism'||this.piece.t!=='I')
      &&(name!=='pulse'||this.board.some(row=>row.some(Boolean)));
  }
  useSkill(name) {
    if(!this.canUse(name))return false;
    let cells=[];
    if(name==='pulse') {
      let bottom=19;while(bottom>=0&&!this.board[bottom].some(Boolean))bottom--;
      const start=Math.max(0,bottom-2), count=bottom-start+1;
      const removed=this.board.slice(start,bottom+1);
      cells=removed.flatMap((row,i)=>row.map((t,x)=>({x,y:start+i,t})).filter(c=>c.t));
      const next=this.board.filter((_,y)=>y<start||y>bottom);
      while(next.length<20)next.unshift(emptyRow());
      // Settled rows can move into the current piece. Resolve before spending energy.
      const oldBoard=this.board;this.board=next;
      const candidate=[this.piece,{...this.piece,y:this.piece.y-count},{...this.piece,x:3,y:this.piece.t==='I'?-1:0,r:0}].find(p=>this.valid(p));
      if(!candidate){this.board=oldBoard;return false;}
      this.piece={...candidate};this.lockTime=0;
    }
    if(name==='freeze')this.slowTime=8000;
    if(name==='prism') {
      let candidate=null;
      for(const dy of [0,-1,-2])for(const dx of [0,-1,1,-2,2]) {
        const p={t:'I',r:0,x:this.piece.x+dx,y:this.piece.y+dy};
        if(!candidate&&this.valid(p))candidate=p;
      }
      if(!candidate&&this.valid({t:'I',r:0,x:3,y:-1}))candidate={t:'I',r:0,x:3,y:-1};
      if(!candidate)return false;
      this.piece=candidate;this.lockTime=0;this.gravity=0;cells=this.cells();
    }
    this.energy-=SKILLS[name]; this.emit('skill',{name,cells});return true;
  }
  get interval() {return (this.mode==='sprint'?800:Math.max(80,850*Math.pow(.81,this.level-1)))*(this.slowTime>0?4:1);}
  update(dt) {
    if(this.state!=='playing')return;
    this.elapsed+=dt;this.slowTime=Math.max(0,this.slowTime-dt);
    this.gravity+=dt;
    if(this.grounded()) {this.lockTime+=dt;if(this.lockTime>=500)this.lock();}
    else {
      while(this.gravity>=this.interval) {
        this.gravity-=this.interval;
        const p={...this.piece,y:this.piece.y+1};
        if(!this.valid(p))break;
        this.piece=p;
      }
    }
  }
}
