/** View-only battlefield layout. No engine state, save data or canvas pixels are
 * changed here: the renderer owns the intrinsic resolution and this module owns
 * one proportional CSS scale, pan, and the compact command panel. */
export const MAX_BATTLE_ZOOM = 3;

/** Largest undistorted board that fits the available rectangle, then zooms it.
 * availableHeight may be Infinity for the normal document-flow presentation. */
export function calculateBoardFit({boardWidth,boardHeight,availableWidth,availableHeight=Infinity,zoom=1}={}) {
  const positive=value=>Number.isFinite(value)&&value>0;
  if(!positive(boardWidth)||!positive(boardHeight)||!positive(availableWidth)||!(positive(availableHeight)||availableHeight===Infinity))throw new RangeError('Board and viewport sizes must be positive.');
  if(!positive(zoom))throw new RangeError('Zoom must be positive.');
  const boundedZoom=Math.max(1,Math.min(MAX_BATTLE_ZOOM,zoom));
  const fitScale=Math.min(availableWidth/boardWidth,availableHeight/boardHeight);
  const fitWidth=boardWidth*fitScale,fitHeight=boardHeight*fitScale;
  const width=fitWidth*boundedZoom,height=fitHeight*boundedZoom;
  return {width,height,fitWidth,fitHeight,scale:fitScale*boundedZoom,zoom:boundedZoom,overflowX:width>availableWidth+.5,overflowY:height>availableHeight+.5};
}

/** Compact fullscreen initially favors readable cells; explicit overview and
 * manual choices remain stable across viewport and orientation changes. */
export function calculatePresentationZoom({mode='auto',zoom=1,fullscreen=true,compact=false,fitWidth,fitHeight,columns,rows,targetCell=34}={}) {
  const bounded=value=>Math.max(1,Math.min(MAX_BATTLE_ZOOM,Number.isFinite(value)?value:1));
  if(mode==='overview')return 1;
  if(mode==='manual')return bounded(zoom);
  if(!fullscreen||!compact)return 1;
  if(![fitWidth,fitHeight,columns,rows,targetCell].every(value=>Number.isFinite(value)&&value>0))return 1;
  const cell=Math.min(fitWidth/columns,fitHeight/rows);
  return bounded(Math.ceil((targetCell/cell)*4-1e-9)/4);
}

/** createBattlePresentation({canvas,scrollContainer,getGridSize,onZoomChange})
 * Calls onZoomChange(zoom, metrics) after applying the proportional CSS layout.
 * The module owns #zoomInButton, #zoomOutButton, #fitBoardButton and info buttons.
 * Call refresh() after render; ResizeObserver/renderer attribute changes also
 * keep mission changes and visualViewport/fullscreen changes in sync. */
export function createBattlePresentation({canvas,scrollContainer,getGridSize=()=>({}),onZoomChange=()=>{},document=globalThis.document,window=globalThis.window}={}) {
  if(!document||!window)return null;
  canvas ||= document.getElementById('boardCanvas');
  scrollContainer ||= document.getElementById('boardScroll');
  const viewport=document.getElementById('gameViewport');
  if(!canvas||!scrollContainer||!viewport)return null;
  const byId=id=>document.getElementById(id);
  let zoom=1,mode='overview',frame=0,destroyed=false,metrics=null,infoOpen=false;
  let centerAnchor=null;
  const cleanups=[];
  const raf=window.requestAnimationFrame?.bind(window)||((fn)=>window.setTimeout(fn,16));
  const caf=window.cancelAnimationFrame?.bind(window)||window.clearTimeout.bind(window);
  const fullscreen=()=>document.body.classList.contains('game-fullscreen');
  function listen(node,event,fn,options){node?.addEventListener(event,fn,options);cleanups.push(()=>node?.removeEventListener(event,fn,options));}
  function updateControls(){
    const label=byId('zoomLabel');if(label)label.textContent=zoom===1?'全景':`${Math.round(zoom*100)}%`;
    if(label)label.setAttribute('aria-label',`${mode==='auto'?'自動プレイ倍率':mode==='overview'?'マップ全体を表示':'表示倍率'} ${Math.round(zoom*100)}%`);
    const minus=byId('zoomOutButton'),plus=byId('zoomInButton'),fitButton=byId('fitBoardButton');
    if(minus)minus.disabled=zoom<=1;
    if(plus)plus.disabled=zoom>=MAX_BATTLE_ZOOM;
    fitButton?.setAttribute('aria-pressed',String(mode==='overview'));
    viewport.dataset.zoomMode=mode;
    const save=byId('saveButton'),quickSave=byId('quickSaveButton');if(save&&quickSave)quickSave.disabled=save.disabled;
  }
  function applyLayout(){
    frame=0;if(destroyed)return;
    const availableWidth=scrollContainer.clientWidth;
    const availableHeight=fullscreen()?scrollContainer.clientHeight:Infinity;
    if(availableWidth<=0||availableHeight<=0)return;
    const full=fullscreen(),base=calculateBoardFit({boardWidth:canvas.width,boardHeight:canvas.height,availableWidth,availableHeight});
    const grid=getGridSize()||{};
    const compact=window.matchMedia?.('(max-width: 900px), (max-height: 500px)').matches??(window.innerWidth<=900||window.innerHeight<=500);
    zoom=calculatePresentationZoom({mode,zoom,fullscreen:full,compact,fitWidth:base.fitWidth,fitHeight:base.fitHeight,columns:grid.columns,rows:grid.rows});
    const next=calculateBoardFit({boardWidth:canvas.width,boardHeight:canvas.height,availableWidth,availableHeight,zoom});
    // Both axes always come from the exact same scale. Letterboxing belongs to
    // the parent; cellFromPointer can continue using the entire canvas rect.
    canvas.style.width=`${next.width.toFixed(4)}px`;
    canvas.style.height=`${next.height.toFixed(4)}px`;
    canvas.style.maxWidth='none';canvas.style.maxHeight='none';
    scrollContainer.dataset.boardFit=String(!next.overflowX&&!next.overflowY);
    scrollContainer.dataset.boardZoom=String(zoom);
    scrollContainer.dataset.overflowX=String(next.overflowX);scrollContainer.dataset.overflowY=String(next.overflowY);
    if(centerAnchor){
      scrollContainer.scrollLeft=Math.max(0,centerAnchor.x*next.width-availableWidth/2);
      scrollContainer.scrollTop=Math.max(0,centerAnchor.y*next.height-scrollContainer.clientHeight/2);
      centerAnchor=null;
    }
    // A normal game render must not recenter a manually panned map. Notify the
    // host only when its visible scale actually changes (including first fit).
    const changed=!metrics||Math.abs(next.width-metrics.width)>.01||Math.abs(next.height-metrics.height)>.01||next.zoom!==metrics.zoom;
    metrics=next;updateControls();if(changed)onZoomChange(zoom,next);
  }
  function refresh(){if(!destroyed&&!frame)frame=raf(applyLayout);}
  function setZoom(value){
    if(!Number.isFinite(value))return;
    mode='manual';
    const next=Math.max(1,Math.min(MAX_BATTLE_ZOOM,value));
    if(metrics&&next!==zoom){
      const board=canvas.getBoundingClientRect(),pane=scrollContainer.getBoundingClientRect(),clamp=value=>Math.max(0,Math.min(1,value));
      centerAnchor={x:clamp((pane.left+scrollContainer.clientLeft+scrollContainer.clientWidth/2-board.left)/board.width),y:clamp((pane.top+scrollContainer.clientTop+scrollContainer.clientHeight/2-board.top)/board.height)};
    }
    zoom=next;updateControls();refresh();
  }
  function fit(){mode='overview';zoom=1;centerAnchor=null;scrollContainer.scrollLeft=0;scrollContainer.scrollTop=0;updateControls();refresh();}
  function setInfoOpen(value=true){
    infoOpen=Boolean(value);viewport.dataset.infoOpen=String(infoOpen);
    byId('unitInfoButton')?.setAttribute('aria-expanded',String(infoOpen));
    refresh();
  }
  function revealCell({x,y,width,height}={}){
    if(![x,y,width,height].every(Number.isFinite)||width<=0||height<=0)return;
    const board=canvas.getBoundingClientRect(),pane=scrollContainer.getBoundingClientRect();
    const centerX=board.left+(x+.5)*board.width/width,centerY=board.top+(y+.5)*board.height/height;
    const padX=Math.min(35,scrollContainer.clientWidth*.12),padY=Math.min(35,scrollContainer.clientHeight*.12);
    const left=pane.left+scrollContainer.clientLeft+padX,right=pane.left+scrollContainer.clientLeft+scrollContainer.clientWidth-padX;
    const top=pane.top+scrollContainer.clientTop+padY,bottom=pane.top+scrollContainer.clientTop+scrollContainer.clientHeight-padY;
    const dx=centerX<left?centerX-left:centerX>right?centerX-right:0,dy=centerY<top?centerY-top:centerY>bottom?centerY-bottom:0;
    if(dx||dy)scrollContainer.scrollBy({left:dx,top:dy,behavior:'auto'});
  }
  listen(byId('zoomInButton'),'click',()=>setZoom(zoom+.25));
  listen(byId('zoomOutButton'),'click',()=>setZoom(zoom-.25));
  listen(byId('fitBoardButton'),'click',fit);
  listen(byId('unitInfoButton'),'click',()=>setInfoOpen(!infoOpen));
  listen(byId('closeUnitInfoButton'),'click',()=>{setInfoOpen(false);canvas.focus({preventScroll:true});});
  listen(byId('quickSaveButton'),'click',()=>{const save=byId('saveButton');if(save&&!save.disabled)save.click();});
  listen(byId('playMenuButton'),'click',()=>byId('menuButton')?.click());
  listen(window,'gamefullscreenchange',()=>{setInfoOpen(false);mode=fullscreen()?'auto':'overview';zoom=1;centerAnchor=null;scrollContainer.scrollLeft=0;scrollContainer.scrollTop=0;updateControls();refresh();});
  listen(window,'resize',refresh);
  listen(window.visualViewport,'resize',refresh);
  listen(window.visualViewport,'scroll',refresh);
  let resizeObserver,attributeObserver;
  if(window.ResizeObserver){resizeObserver=new window.ResizeObserver(refresh);resizeObserver.observe(scrollContainer);}
  if(window.MutationObserver){attributeObserver=new window.MutationObserver(refresh);attributeObserver.observe(canvas,{attributes:true,attributeFilter:['width','height']});}
  viewport.dataset.presentation='ready';setInfoOpen(false);fit();
  return {fit,zoomIn:()=>setZoom(zoom+.25),zoomOut:()=>setZoom(zoom-.25),setZoom,refresh,getZoom:()=>zoom,getMode:()=>mode,setInfoOpen,openInfo:()=>setInfoOpen(true),revealCell,
    destroy(){destroyed=true;if(frame)caf(frame);cleanups.forEach(fn=>fn());resizeObserver?.disconnect();attributeObserver?.disconnect();delete viewport.dataset.presentation;}
  };
}
