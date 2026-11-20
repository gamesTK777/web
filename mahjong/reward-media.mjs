export function stageRewardVideoId(stage, mediaTypes) {
  const id = stage?.gallery?.[0];
  return typeof id === 'string' && id && mediaTypes && Object.hasOwn(mediaTypes, id) &&
    mediaTypes[id] === 'video/mp4' ? id : null;
}

export function createStageRewardVideo({ video, status, playButton }) {
  let generation = 0;

  function message(text, showPlay = false) {
    status.textContent = text;
    status.hidden = !text;
    playButton.hidden = !showPlay;
  }

  function pause() { video.pause(); }

  function clear() {
    generation++;
    pause();
    video.onplaying = null;
    video.onerror = null;
    video.removeAttribute('src');
    video.hidden = true;
    video.load();
    message('');
  }

  async function play() {
    if (video.hidden) return;
    const request = generation;
    try {
      await video.play();
    } catch {
      if (request === generation && !video.hidden) {
        message('再生ボタンを押すと動画が始まります。', true);
      }
    }
  }

  function show(src, autoplay) {
    clear();
    video.muted = true;
    const request = generation;
    video.onerror = () => {
      if (request !== generation) return;
      clear();
      message('ご褒美動画を読み込めませんでした。次へ進めます。');
    };
    video.onplaying = () => {
      if (request === generation) message('');
    };
    video.hidden = false;
    video.src = src;
    if (autoplay) void play();
    else message('再生ボタンを押すと動画が始まります。', true);
  }

  playButton.onclick = () => void play();
  return { show, clear, pause };
}
