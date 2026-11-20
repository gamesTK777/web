import test from 'node:test';
import assert from 'node:assert/strict';
import { createStageRewardVideo, stageRewardVideoId } from './reward-media.mjs';

function fixture() {
  const video = {
    calls: 0,
    hidden: true,
    paused: true,
    currentTime: 0,
    muted: false,
    pause() { this.paused = true; },
    load() { this.currentTime = 0; },
    removeAttribute(name) { delete this[name]; },
    async play() {
      this.calls++;
      this.paused = false;
      this.onplaying?.();
    },
  };
  const status = {}, playButton = {};
  const player = createStageRewardVideo({video, status, playButton});
  return {video, status, playButton, player};
}

test('only an explicitly identified MP4 in the designated slot is played', () => {
  const stage = {gallery: ['a', 'b'], rewards: ['c']};
  assert.equal(stageRewardVideoId(stage, {a: 'video/mp4', b: 'video/mp4'}), 'a');
  assert.equal(stageRewardVideoId(stage, {a: 'image/webp', b: 'video/mp4'}), null);
  assert.equal(stageRewardVideoId(stage, Object.create({a: 'video/mp4'})), null);
  assert.equal(stageRewardVideoId(stage, {c: 'video/mp4'}), null);
});

test('a reward starts muted once, pauses in place, and releases its resource when closed', () => {
  const f = fixture();
  f.player.show('/movie', true);
  assert.equal(f.video.src, '/movie');
  assert.equal(f.video.calls, 1);
  assert.equal(f.video.muted, true);
  f.video.currentTime = 6;
  f.player.pause();
  assert.equal(f.video.paused, true);
  assert.equal(f.video.currentTime, 6);
  f.player.clear();
  assert.equal(f.video.src, undefined);
  assert.equal(f.video.hidden, true);
  assert.equal(f.playButton.hidden, true);
});

test('an autoplay denial offers a manual play button and a subsequent media error clears the source', async () => {
  const f = fixture();
  const allowedPlay = f.video.play;
  f.video.play = () => Promise.reject(new Error('NotAllowedError'));
  f.player.show('/movie', true);
  await Promise.resolve();
  assert.equal(f.playButton.hidden, false);
  f.video.play = allowedPlay;
  f.playButton.onclick();
  assert.equal(f.playButton.hidden, true);
  assert.equal(f.status.hidden, true);
  f.video.onerror();
  assert.equal(f.video.src, undefined);
  assert.equal(f.video.hidden, true);
  assert.match(f.status.textContent, /読み込めませんでした/);
});

test('an earlier playback rejection or error cannot hide a new movie', async () => {
  const f = fixture();
  const allowedPlay = f.video.play;
  let rejectOld;
  f.video.play = () => new Promise((_, reject) => { rejectOld = reject; });
  f.player.show('/old', true);
  const oldError = f.video.onerror;
  f.video.play = allowedPlay;
  f.player.show('/new', true);
  rejectOld(new Error('AbortError'));
  oldError();
  await Promise.resolve();
  assert.equal(f.video.src, '/new');
  assert.equal(f.video.hidden, false);
  assert.equal(f.status.hidden, true);
});
