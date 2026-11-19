import test from 'node:test'
import assert from 'node:assert/strict'
import {classifyEnvironment} from '../src/audio.ts'

test('ambient sound follows a planted grove, a shore and the roof of a mined room',()=>{
  const p={x:32.5,y:18,z:32.5};
  const sample=(fn:(x:number,y:number,z:number)=>number)=>classifyEnvironment({get:fn},p);
  assert.equal(sample(()=>0),'meadow');
  assert.equal(sample((_x,y)=>y===22?6:0),'forest');
  assert.equal(sample((x,y)=>y===17&&x===35?13:0),'shore');
  assert.equal(sample((_x,y)=>y===24?3:0),'cave');
  assert.equal(classifyEnvironment({get:()=>0},{...p,inWater:true}),'shore');
});
