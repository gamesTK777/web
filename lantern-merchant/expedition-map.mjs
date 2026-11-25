export const CHART_COLORS = Object.freeze({
  background:'#0c2027', remembered:'#3d6568', visible:'#77a9a1',
  wall:'#283e44', player:'#fff1bc', exit:'#75ead5', stairs:'#e4b579',
  trap:'#ef9f81', spent:'#926b61', enemy:'#eb7588', loot:'#e7d99a',
});

export function drawFloorChart(c,state,x,y,cell) {
  const {map,player,enemies,loot}=state, color=CHART_COLORS;
  if(!map||cell<=0)return;
  c.save();
  const paint=(column,row,fill,pad=0)=>{
    c.fillStyle=fill;
    c.fillRect(x+(column+pad)*cell,y+(row+pad)*cell,(1-2*pad)*cell,(1-2*pad)*cell);
  };
  c.fillStyle=color.background;
  c.fillRect(x,y,map.width*cell,map.height*cell);
  for(let row=0;row<map.height;row++){
    for(let column=0;column<map.width;column++){
      if(!map.seen[row][column])continue;
      const tile=map.tiles[row][column],lit=map.visible[row][column];
      const ink=tile===0?color.wall:tile===2?color.stairs:tile>=3?color.exit:lit?color.visible:color.remembered;
      paint(column,row,ink);
    }
  }
  const dot=(p,ink,scale)=>{
    c.fillStyle=ink;c.beginPath();
    c.arc(x+(p.x+.5)*cell,y+(p.y+.5)*cell,Math.max(1,cell*scale),0,Math.PI*2);c.fill();
  };
  for(const item of loot)if(map.visible[item.y][item.x])dot(item,color.loot,.18);
  for(const trap of map.traps??[]){
    if(trap.discovered&&map.seen[trap.y][trap.x])paint(trap.x,trap.y,trap.spent?color.spent:color.trap,.22);
  }
  for(const enemy of enemies)if(map.visible[enemy.y][enemy.x])dot(enemy,color.enemy,.25);
  dot(player,color.background,.44);dot(player,color.player,.32);
  c.restore();
}
