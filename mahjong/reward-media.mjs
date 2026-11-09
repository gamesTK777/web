/** Missing metadata is an old image asset. Only the supported MP4 type opts in. */
export function rewardMediaKind(id,mediaTypes){return id&&mediaTypes&&Object.hasOwn(mediaTypes,id)&&mediaTypes[id]==='video/mp4'?'video':'image';}

/** Native video arrows seek/change volume; a gallery must not steal them. */
export function isVideoControlEvent(event){
  if(event?.target?.tagName==='VIDEO'||event?.target?.closest?.('video'))return true;
  return typeof event?.composedPath==='function'&&event.composedPath().some(node=>node?.tagName==='VIDEO');
}

/** One media slot. No autoplay, no hidden audio, no mutation of its config. */
export function createRewardMediaController({image,video,empty,status=null,onVideoPlay=()=>{},onFallback=()=>{}}={}){
  let token=0,current=null,suspended=false,resumeAt=0;
  const pause=()=>{try{video?.pause?.();}catch{/* A detached media element can reject native calls. */}};
  function releaseVideo(){
    if(!video)return;
    video.onplay=null;video.onerror=null;video.onloadedmetadata=null;
    pause();video.removeAttribute('src');video.hidden=true;
    try{video.load?.();}catch{/* Some older WebViews expose no media loader. */}
  }
  function hideEmpty(){if(empty)empty.hidden=true;if(status){status.hidden=true;status.textContent='';}}
  function message(text){if(empty)empty.hidden=false;if(status){status.textContent=text;status.hidden=!text;}else if(empty)empty.textContent=text;}
  function reset(){token++;releaseVideo();if(image){image.onerror=null;image.hidden=true;image.removeAttribute('src');}hideEmpty();}
  function show(spec={}){
    reset();current={...spec,kind:rewardMediaKind(spec.id,spec.mediaTypes)};suspended=false;resumeAt=0;
    const serial=token,kind=current.kind;
    if(!spec.src){message(spec.emptyText||'ご褒美は未登録です。');return kind;}
    if(kind==='video'){
      onFallback(false);
      if(!video){message(spec.errorText||'動画を表示できません。次へ進めます。');return kind;}
      video.controls=true;video.playsInline=true;video.preload='metadata';video.autoplay=false;video.setAttribute('playsinline','');video.removeAttribute('autoplay');
      video.setAttribute('aria-label',spec.alt||'ご褒美動画');video.tabIndex=0;
      video.onplay=()=>{if(serial===token&&!suspended&&current?.kind==='video')onVideoPlay();else pause();};
      video.onerror=()=>{if(serial!==token||suspended)return;releaseVideo();message(spec.errorText||'動画を読み込めませんでした。ほかのご褒美へ進めます。');};
      if(Number.isFinite(spec.resumeAt)&&spec.resumeAt>0)video.onloadedmetadata=()=>{if(serial!==token||suspended)return;try{video.currentTime=Number.isFinite(video.duration)?Math.min(spec.resumeAt,Math.max(0,video.duration-.01)):spec.resumeAt;}catch{/* Seeking can be unavailable until a later browser event. */}};
      video.hidden=false;video.src=spec.src;
      return kind;
    }
    if(!image){message(spec.errorText||'画像を表示できません。次へ進めます。');return kind;}
    let fallback=!spec.id;
    onFallback(fallback);image.hidden=false;image.alt=spec.alt||'ご褒美画像';
    image.onerror=()=>{
      if(serial!==token)return;
      if(!fallback&&spec.fallbackSrc){fallback=true;onFallback(true);image.src=spec.fallbackSrc;}
      else{image.onerror=null;image.hidden=true;onFallback(false);message(spec.errorText||'画像を読み込めませんでした。ほかのご褒美へ進めます。');}
    };
    image.src=spec.src;return kind;
  }
  function clear(){reset();current=null;suspended=false;resumeAt=0;}
  function suspend(){
    if(!current||current.kind!=='video'||suspended)return;
    resumeAt=Number.isFinite(video?.currentTime)?Math.max(0,video.currentTime):0;
    suspended=true;token++;releaseVideo();message('動画を一時停止しました。画面に戻ったあと、再生ボタンで再開できます。');
  }
  function resume(){if(!suspended||!current)return;const spec={...current,resumeAt};show(spec);}
  return {show,clear,pause,suspend,resume,state:()=>({kind:current?.kind||null,id:current?.id||null,suspended})};
}
