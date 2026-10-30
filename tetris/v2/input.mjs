export const KEY_ACTIONS={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowDown:'down',KeyS:'down',ArrowUp:'rotate',KeyX:'rotate',KeyZ:'rotateLeft',Space:'drop',KeyC:'hold',ShiftLeft:'hold',ShiftRight:'hold',Digit1:'pulse',Digit2:'avalanche',Digit3:'prism',Numpad1:'pulse',Numpad2:'avalanche',Numpad3:'prism'};
const repeatable=new Set(['left','right','down']);
// Never synthesize repeats in the render loop: a missed release must not cause drift.
export class KeyboardInput {
  constructor(){this.pressed=new Set();}
  reset(){this.pressed.clear();}
  release(code){this.pressed.delete(code);}
  press(code,repeated=false){
    const action=KEY_ACTIONS[code];if(!action)return null;
    if(repeated&&(!this.pressed.has(code)||!repeatable.has(action)))return null;
    this.pressed.add(code);return action;
  }
}

// One gesture controls one piece. Motion is distance-based, never time-repeated.
export class GestureInput {
  constructor(emit){this.emit=emit;this.reset();}
  reset(){this.active=null;this.pointers=new Set();this.blocked=false;}
  begin({id,x,y,time,unit=24,primary=true}){
    if(!primary||this.pointers.size){this.blocked=true;this.active=null;}
    this.pointers.add(id);
    if(this.blocked)return false;
    this.active={id,x,y,lastX:x,lastY:y,start:time,unit:Math.max(16,Math.min(32,unit)),axis:null,moved:0,distance:0};
    return true;
  }
  move({id,x,y,time}){
    const g=this.active;if(!g||g.id!==id||this.blocked)return;
    if(time-g.start>4000){this.cancel(id);return;}
    const dx=x-g.x,dy=y-g.y;g.distance=Math.max(g.distance,Math.hypot(dx,dy));
    if(!g.axis&&Math.max(Math.abs(dx),Math.abs(dy))>=10){
      if(Math.abs(dx)>Math.abs(dy)*1.2)g.axis='x';
      else if(Math.abs(dy)>Math.abs(dx)*1.2)g.axis='y';
    }
    if(g.axis==='x'){
      const steps=Math.trunc((x-g.lastX)/g.unit);g.lastX+=steps*g.unit;
      for(let i=0;i<Math.min(10,Math.abs(steps));i++){
        if(this.active!==g)break;g.moved++;this.emit(steps<0?'left':'right');
      }
    } else if(g.axis==='y'&&time-g.start>300&&dy>0){
      const steps=Math.max(0,Math.trunc((y-g.lastY)/g.unit));g.lastY+=steps*g.unit;
      for(let i=0;i<Math.min(20,steps);i++){
        if(this.active!==g)break;g.moved++;this.emit('down');
      }
    }
  }
  end(point){
    this.move(point);const g=this.active;
    if(g?.id===point.id)this.active=null;
    this.pointers.delete(point.id);if(!this.pointers.size)this.blocked=false;
    if(!g||g.id!==point.id)return;
    const dx=point.x-g.x,dy=point.y-g.y,duration=point.time-g.start;
    if(g.distance<8&&duration<=280){this.emit('rotate');return;}
    if(g.axis==='x'&&!g.moved&&Math.abs(dx)>=12)this.emit(dx<0?'left':'right');
    if(g.axis==='y'&&!g.moved){
      if(dy>=Math.max(40,g.unit*2)&&duration<=300&&dy/Math.max(1,duration)>=.35)this.emit('drop');
      else if(dy<=-40&&duration<=500)this.emit('hold');
    }
  }
  cancel(id){
    if(this.active?.id===id)this.active=null;
    this.pointers.delete(id);if(!this.pointers.size)this.blocked=false;
  }
}

export function bindGestures(surfaces,{input,enabled,unit,onBegin=()=>{},doc=document,win=window}){
  let capture=null;
  const point=e=>({id:e.pointerId,x:e.clientX,y:e.clientY,time:e.timeStamp});
  function releaseCapture(){
    if(capture){const [surface,id]=capture;capture=null;try{if(surface.hasPointerCapture(id))surface.releasePointerCapture(id);}catch{}}
  }
  function reset(){input.reset();releaseCapture();}
  for(const surface of surfaces){
    surface.addEventListener('pointerdown',e=>{
      if(e.button!==0||!enabled())return;
      e.preventDefault();onBegin();
      if(!input.begin({...point(e),unit:unit(),primary:e.isPrimary}))return;
      capture=[surface,e.pointerId];try{surface.setPointerCapture(e.pointerId);}catch{}
      surface.focus({preventScroll:true});
    });
    surface.addEventListener('pointermove',e=>{
      if(!enabled()||(e.pointerType==='mouse'&&e.buttons===0)){reset();return;}
      if(input.active?.id===e.pointerId){e.preventDefault();input.move(point(e));}
    });
    surface.addEventListener('lostpointercapture',e=>{input.cancel(e.pointerId);if(capture?.[1]===e.pointerId)capture=null;});
    surface.addEventListener('contextmenu',e=>{e.preventDefault();reset();});
  }
  // Capture releases even outside the board, over disabled controls or in a dialog.
  doc.addEventListener('pointerup',e=>{
    if(enabled())input.end(point(e));else input.cancel(e.pointerId);
    if(capture?.[1]===e.pointerId)releaseCapture();
  },true);
  doc.addEventListener('pointercancel',e=>{input.cancel(e.pointerId);if(capture?.[1]===e.pointerId)releaseCapture();},true);
  doc.addEventListener('pointerdown',e=>{if(!e.isPrimary)reset();},true);
  win.addEventListener('resize',reset);
  win.addEventListener('pointerout',e=>{if(!e.relatedTarget)reset();});
  return {reset};
}
