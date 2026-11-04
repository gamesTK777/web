import {createGame,selectCard,resolvePair} from './engine.mjs?v=20261104-rebuild';

// Only this controller owns pair deadlines. Rendering and effects receive an
// already-unlocked state and cannot prevent the next turn by failing to finish.
export class MemorySession {
  constructor({onChange,onResult,onFinish,now=Date.now,schedule=(callback,delay)=>setTimeout(callback,delay),cancel=id=>clearTimeout(id)}={}) {
    if (typeof now!=='function'||typeof schedule!=='function'||typeof cancel!=='function') throw new TypeError('時刻とタイマーの関数が必要です。');
    this.state=null;
    this.generation=0;
    this._callbacks={onChange,onResult,onFinish};
    this._now=now;
    this._schedule=schedule;
    this._cancel=cancel;
    this._pending=null;
    this._startedAt=null;
    this._endedAt=null;
    this._finishNotified=false;
    this._disposed=false;
  }

  start(config) {
    const next=createGame(config);
    this.generation++;
    this._clearPending();
    this.state=next;
    this._startedAt=this._endedAt=null;
    this._finishNotified=false;
    this._disposed=false;
    this._notify('onChange',next);
    return this.state;
  }

  select(cardId) {
    if(this._disposed||!this.state)return false;
    const generation=this.generation;
    this.flushDue();
    if(this._disposed||generation!==this.generation)return false;
    const next=selectCard(this.state,cardId);
    if(next===this.state)return false;
    if(this._startedAt===null)this._startedAt=this._now();
    this.state=next;
    if(next.phase==='resolving') {
      const selected=next.selected.map(id=>next.cards.find(card=>card.id===id));
      const delay=selected[0].pairId===selected[1].pairId?450:850;
      const pending={generation:this.generation,state:next,deadline:this._now()+delay,timer:null};
      this._pending=pending;
      this._arm(pending,delay);
    }
    this._notify('onChange',next);
    return true;
  }

  flushDue() {
    const pending=this._pending;
    if(this._disposed||!pending||pending.generation!==this.generation||pending.state!==this.state||this._now()<pending.deadline)return false;
    const next=resolvePair(pending.state);
    this._clearPending();
    this.state=next;
    if(next.phase==='finished'&&this._endedAt===null)this._endedAt=this._now();
    this._notify('onChange',next);
    if(this._disposed||pending.generation!==this.generation)return true;
    this._notify('onResult',next.lastResult,next);
    if(!this._disposed&&pending.generation===this.generation&&next.phase==='finished'&&!this._finishNotified) {
      this._finishNotified=true;
      this._notify('onFinish',next);
    }
    return true;
  }

  elapsedMs() {
    if(this._startedAt===null)return 0;
    return Math.max(0,(this._endedAt===null?this._now():this._endedAt)-this._startedAt);
  }

  dispose() {
    if(this._startedAt!==null&&this._endedAt===null)this._endedAt=this._now();
    this.generation++;
    this._disposed=true;
    this._clearPending();
  }

  _arm(pending,delay) {
    try {
      pending.timer=this._schedule(()=>{
        if(this._disposed||this._pending!==pending||pending.generation!==this.generation||pending.state!==this.state)return;
        this.flushDue();
        if(this._pending===pending)this._arm(pending,Math.max(1,pending.deadline-this._now()));
      },delay);
    } catch(error) { this._report(error); }
  }

  _clearPending() {
    const pending=this._pending;
    this._pending=null;
    if(pending&&pending.timer!==null) {
      try { this._cancel(pending.timer); } catch(error) { this._report(error); }
    }
  }

  _notify(name,...args) {
    const callback=this._callbacks[name];
    if(typeof callback!=='function')return;
    try { callback(...args); } catch(error) { this._report(error); }
  }

  _report(error) {
    // A failing effect, sound, or render callback must not break game progress.
    try { console.error('Memory callback failed',error); } catch {}
  }
}
