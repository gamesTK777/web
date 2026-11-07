// Presentation only: event marks never reveal hidden tiles or alter encounter state.
const COLORS=Object.freeze({dormant:'#d7b374',active:'#ed9870',cleared:'#a2cfab'});
const inside=(r,x,y)=>x>=r.x&&x<r.x+r.width&&y>=r.y&&y<r.y+r.height;
function doorway(map,r,x,y){
  return [[-1,0],[1,0],[0,-1],[0,1]].some(([dx,dy])=>!inside(r,x+dx,y+dy)&&map.tiles[y+dy]?.[x+dx]>0);
}

export function drawSwarmRoom(c,map,{visible,px,py,tile,time=0,reducedMotion=false}){
  const encounter=map?.swarm,room=map?.rooms?.[encounter?.roomIndex];
  if(!room||!Object.hasOwn(COLORS,encounter?.status))return;
  const active=encounter.status==='active',cleared=encounter.status==='cleared';
  const pulse=reducedMotion?0:(Math.sin(time/700)+1)/2,color=COLORS[encounter.status];
  c.save();c.strokeStyle=color;c.fillStyle=color;c.lineWidth=Math.max(1,tile*.025);
  for(let y=room.y;y<room.y+room.height;y++)for(let x=room.x;x<room.x+room.width;x++){
    if(!visible(x,y)||!(map.tiles[y]?.[x]>0))continue;
    const xx=px(x),yy=py(y),edge=x===room.x||x===room.x+room.width-1||y===room.y||y===room.y+room.height-1;
    c.save();c.beginPath();c.rect(xx,yy,tile,tile);c.clip();
    if(active){c.globalAlpha=.045+pulse*.018;c.fillRect(xx,yy,tile,tile);}
    if(edge&&(active||cleared)){
      c.globalAlpha=active?.42+pulse*.12:.30;
      const inset=tile*.10;c.beginPath();
      if(x===room.x){c.moveTo(xx+inset,yy);c.lineTo(xx+inset,yy+tile);}
      if(x===room.x+room.width-1){c.moveTo(xx+tile-inset,yy);c.lineTo(xx+tile-inset,yy+tile);}
      if(y===room.y){c.moveTo(xx,yy+inset);c.lineTo(xx+tile,yy+inset);}
      if(y===room.y+room.height-1){c.moveTo(xx,yy+tile-inset);c.lineTo(xx+tile,yy+tile-inset);}
      c.stroke();
    }
    if(doorway(map,room,x,y)){
      const cx=xx+tile*.5,cy=yy+tile*.5,r=tile*.12;
      c.globalAlpha=active?.65:cleared?.38:.40;
      c.beginPath();c.moveTo(cx,cy-r);c.lineTo(cx+r,cy);c.lineTo(cx,cy+r);c.lineTo(cx-r,cy);c.closePath();c.stroke();
      c.globalAlpha*=.7;c.fillRect(cx-tile*.025,cy-tile*.025,tile*.05,tile*.05);
    }
    c.restore();
  }
  c.restore();
}

function drawSwarmBadge(c,x,y,tile,active){
  const radius=Math.max(7,tile*.115);
  c.save();c.fillStyle=active?'#382b22ee':'#132b31e8';c.strokeStyle=active?'#f1bd7db3':'#cfb57880';c.lineWidth=1;
  c.beginPath();c.arc(x,y,radius,0,Math.PI*2);c.fill();c.stroke();
  c.fillStyle=active?'#ffd598':'#eed6a3';c.font=`${active?'':'italic '}700 ${Math.max(active?12:10,tile*(active?.22:.17))}px sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(active?'✦':'Z',x,y+.5);c.restore();
}
export const drawSwarmSleep=(c,x,y,tile)=>drawSwarmBadge(c,x,y,tile,false);
export const drawSwarmActive=(c,x,y,tile)=>drawSwarmBadge(c,x,y,tile,true);
