import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateBoardFit,calculatePresentationZoom,MAX_BATTLE_ZOOM} from './presentation.mjs';

test('overview fills one available axis without distorting or clipping a 16×12 board',()=>{
  for(const viewport of [{w:1250,h:610},{w:349,h:565},{w:786,h:218}]){
    const fit=calculateBoardFit({boardWidth:1280,boardHeight:960,availableWidth:viewport.w,availableHeight:viewport.h});
    assert.ok(fit.width<=viewport.w+.001&&fit.height<=viewport.h+.001);
    assert.ok(Math.abs(fit.width/fit.height-4/3)<1e-10);
    assert.ok(Math.abs(fit.width-viewport.w)<.001||Math.abs(fit.height-viewport.h)<.001);
    assert.equal(fit.overflowX,false);assert.equal(fit.overflowY,false);
  }
});
test('wide and tall missions keep their proportions in portrait and landscape',()=>{
  for(const board of [{w:1440,h:720},{w:800,h:1040}])for(const pane of [{w:349,h:480},{w:550,h:218}]){
    const fit=calculateBoardFit({boardWidth:board.w,boardHeight:board.h,availableWidth:pane.w,availableHeight:pane.h});
    assert.ok(Math.abs(fit.width*board.h-fit.height*board.w)<1e-7);
    assert.ok(fit.width<=pane.w+.001&&fit.height<=pane.h+.001);
  }
});
test('zoom enlarges the same rectangle and advertises the axes that need pan',()=>{
  const fit=calculateBoardFit({boardWidth:1280,boardHeight:960,availableWidth:360,availableHeight:500});
  const zoomed=calculateBoardFit({boardWidth:1280,boardHeight:960,availableWidth:360,availableHeight:500,zoom:2});
  assert.equal(zoomed.width,fit.width*2);assert.equal(zoomed.height,fit.height*2);
  assert.equal(zoomed.overflowX,true);assert.equal(zoomed.overflowY,true);
  assert.equal(calculateBoardFit({boardWidth:100,boardHeight:100,availableWidth:300,zoom:99}).zoom,MAX_BATTLE_ZOOM);
});
test('normal document flow fits width without imposing an unrelated height limit',()=>{
  const fit=calculateBoardFit({boardWidth:1600,boardHeight:800,availableWidth:900});
  assert.equal(fit.width,900);assert.equal(fit.height,450);assert.equal(fit.overflowY,false);
});
test('invalid geometry is rejected instead of producing an invisible or infinite canvas',()=>{
  for(const size of [0,-1,NaN,Infinity])assert.throws(()=>calculateBoardFit({boardWidth:size,boardHeight:100,availableWidth:300}),RangeError);
  assert.throws(()=>calculateBoardFit({boardWidth:100,boardHeight:100,availableWidth:300,availableHeight:0}),RangeError);
  assert.throws(()=>calculateBoardFit({boardWidth:100,boardHeight:100,availableWidth:300,zoom:NaN}),RangeError);
});
test('compact automatic play targets readable cells in portrait and landscape while desktop stays overview',()=>{
  const portrait=calculatePresentationZoom({compact:true,fitWidth:339,fitHeight:339*13/18,columns:18,rows:13});
  assert.equal(portrait,2);assert.ok(339*portrait/18>=34);
  const landscape=calculatePresentationZoom({compact:true,fitWidth:209*18/13,fitHeight:209,columns:18,rows:13});
  assert.equal(landscape,2.25);assert.ok(209*landscape/13>=34);
  assert.equal(calculatePresentationZoom({compact:false,fitWidth:861,fitHeight:622,columns:18,rows:13}),1);
});
test('explicit overview and manual zoom survive a change of pane size or orientation',()=>{
  for(const pane of [{fitWidth:339,fitHeight:245},{fitWidth:289,fitHeight:209}]){
    assert.equal(calculatePresentationZoom({mode:'overview',zoom:2,compact:true,columns:18,rows:13,...pane}),1);
    assert.equal(calculatePresentationZoom({mode:'manual',zoom:1.75,compact:true,columns:18,rows:13,...pane}),1.75);
  }
});
test('automatic play is bounded and missing grid metadata never hides the board',()=>{
  assert.equal(calculatePresentationZoom({compact:true,fitWidth:20,fitHeight:20,columns:18,rows:18}),MAX_BATTLE_ZOOM);
  assert.equal(calculatePresentationZoom({compact:true,fitWidth:339,fitHeight:245}),1);
  assert.equal(calculatePresentationZoom({fullscreen:false,compact:true,fitWidth:339,fitHeight:245,columns:18,rows:13}),1);
});
