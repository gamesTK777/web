const directions=Object.freeze([
  Object.freeze({x:0,z:-1}),Object.freeze({x:1,z:0}),
  Object.freeze({x:0,z:1}),Object.freeze({x:-1,z:0}),
]);
const stopped=Object.freeze({x:0,z:0});

export function isSlide(id:number):boolean {
  return id>=30&&id<=33&&Number.isInteger(id);
}
export function slideDirection(id:number):{readonly x:number;readonly z:number} {
  return directions[id-30]??stopped;
}
export function slideHeight(id:number,localX:number,localZ:number):number {
  const downhill=id===30?1-localZ:id===31?localX:id===32?localZ:1-localX;
  return 1-.96*Math.max(0,Math.min(1,downhill));
}
export function jumpPadHeight(id:number):number {
  return id===27?3:id===28?6:id===29?10:0;
}
