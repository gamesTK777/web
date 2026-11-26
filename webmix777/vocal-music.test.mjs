import assert from 'node:assert/strict'
import test from 'node:test'
import {VocalMusic, comboAccentEvery} from './vocal-music.mjs'

class Node {
  gain = {value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime() {}}
  connect(peer) { this.peer = peer; return peer }
  disconnect() { this.disconnected = true }
}

class TestContext {
  sampleRate = 8_000
  currentTime = 0
  state = 'suspended'
  destination = new Node()
  sources = []
  oscillators = []
  createDynamicsCompressor() {
    return Object.assign(new Node(), Object.fromEntries(['threshold', 'knee', 'ratio', 'attack', 'release'].map(key => [key, {value: 0}])))
  }
  createGain() { return new Node() }
  createDelay() { return Object.assign(new Node(), {delayTime: {value: 0}}) }
  createBuffer(channels, length, sampleRate) {
    const samples = new Float32Array(length)
    return {duration: length / sampleRate, getChannelData: () => samples}
  }
  createBufferSource() {
    const source = new Node()
    source.start = (...args) => { source.started = args; this.sources.push(source) }
    source.stop = () => { source.stopped = true }
    return source
  }
  createOscillator() {
    const oscillator = new Node()
    oscillator.frequency = {value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}}
    oscillator.detune = {value: 0}
    oscillator.start = when => { oscillator.started = when; this.oscillators.push(oscillator) }
    oscillator.stop = when => { oscillator.stopped = when }
    return oscillator
  }
  async decodeAudioData(asset) { return {duration: 10, asset} }
  async resume() { this.state = 'running' }
}

const track = {duration: 10, bpm: 120, audio: {backing: 'audio/test-base.mp3', stem: 'audio/test-stem.mp3'}}

test('manual playback keeps both full layers in sync through misses and successful key presses', async t => {
  const old = globalThis.AudioContext, oldFetch = globalThis.fetch
  t.after(() => { globalThis.AudioContext = old; globalThis.fetch = oldFetch })
  globalThis.AudioContext = TestContext
  const requested = []
  globalThis.fetch = async url => {
    requested.push(url.pathname)
    return {ok: true, arrayBuffer: async () => url.pathname.split('/').at(-1)}
  }
  const music = new VocalMusic()
  const context = await music.unlock()
  await music.prepare(track)
  await music.prepare(track)
  assert.equal(requested.length, 2)
  music.start(3, track)
  music.update(1.5)
  assert.deepEqual(context.sources.map(s => s.buffer.asset), ['test-base.mp3', 'test-stem.mp3'])
  assert.deepEqual(context.sources.map(s => s.started), [[3, 0, 10], [3, 0, 10]])
  assert.equal(context.oscillators.length, 0)
  const [backing, vocals] = context.sources
  assert.equal(backing.peer, vocals.peer)

  context.currentTime = 5
  assert.equal(music.hit(null, 5, {quality: 'miss', combo: 0}), false)
  assert.equal(music.hit({lane: 0}, 4.9, {quality: 'good', combo: 1}), true)
  assert.equal(music.hit({lane: 0}, 5.5, {quality: 'perfect', combo: 2}), true)
  music.update(7)
  assert.equal(context.sources.filter(source => source.buffer.asset).length, 2, 'hits and misses must not schedule new song sources')
  assert.ok([backing, vocals].every(source => !source.stopped && !source.disconnected))
  const [, , firstTap, pendingTap] = context.sources
  assert.equal(context.sources.length, 4)
  assert.deepEqual([firstTap.started, pendingTap.started], [[5], [5.5]])
  assert.equal(firstTap.peer.peer, backing.peer, 'the tap mixes into the song without routing either layer through it')
  assert.ok(firstTap.buffer.duration < .11)
  assert.ok(firstTap.buffer.getChannelData(0).some(sample => sample !== 0))
  assert.notDeepEqual(firstTap.buffer.getChannelData(0), pendingTap.buffer.getChannelData(0), 'PERFECT uses a different waveform')
  assert.ok(pendingTap.peer.gain.value > firstTap.peer.gain.value, 'PERFECT gets a stronger accent')
  firstTap.onended()
  assert.ok(firstTap.disconnected && firstTap.peer.disconnected)
  music.stop()
  assert.ok([backing, vocals, pendingTap].every(source => source.stopped), 'stopping the song cancels pending percussion')
})

test('combo accents follow chart subdivisions, skipping spent or too-late follow-ups', async t => {
  const old = globalThis.AudioContext, oldFetch = globalThis.fetch
  t.after(() => { globalThis.AudioContext = old; globalThis.fetch = oldFetch })
  globalThis.AudioContext = TestContext
  globalThis.fetch = async url => ({ok: true, arrayBuffer: async () => url.pathname})
  const music = new VocalMusic()
  const context = await music.unlock()
  await music.prepare(track)
  music.start(3, track)

  context.currentTime = 5.08
  assert.equal(music.hit({lane: 1, time: 2}, 5.08, {quality: 'great', combo: comboAccentEvery}), true)
  const [stroke, firstAccent, secondAccent] = context.sources.slice(2)
  assert.deepEqual([stroke.started, firstAccent.started, secondAccent.started], [[5.08], [5.125], [5.25]])
  assert.ok(firstAccent.peer.gain.value < stroke.peer.gain.value && secondAccent.peer.gain.value < firstAccent.peer.gain.value)

  context.currentTime = 5.645
  assert.equal(music.hit({lane: 3, time: 2.5}, 5.645, {quality: 'good', combo: comboAccentEvery * 2}), true)
  assert.deepEqual(context.sources.slice(5).map(source => source.started), [[5.645], [5.75]])

  context.currentTime = 6.86
  assert.equal(music.hit({lane: 2, time: 4}, 6.86, {quality: 'good', combo: comboAccentEvery * 3}), true)
  assert.deepEqual(context.sources.slice(7).map(source => source.started), [[6.86], [7.125]])

  context.currentTime = 12.92
  assert.equal(music.hit({lane: 3, time: 9.92}, 12.92, {quality: 'perfect', combo: comboAccentEvery * 4}), true)
  assert.deepEqual(context.sources.slice(9).map(source => source.started), [[12.92]])
})

test('instrumental manual accents sit under pitched notes and autoplay adds no accent', async t => {
  const old = globalThis.AudioContext
  t.after(() => { globalThis.AudioContext = old })
  globalThis.AudioContext = TestContext
  const music = new VocalMusic()
  const context = await music.unlock()
  const instrumental = {duration: 9, bpm: 120, backing: []}
  const note = {lane: 1, time: 2, pitch: 64, duration: .32, voice: 'bell'}
  music.start(2, instrumental)
  assert.equal(music.hit(note, 4, {quality: 'perfect', combo: 1}), true)
  assert.equal(context.oscillators.length, 2, 'the original bell still sounds')
  assert.equal(context.sources.length, 1)
  assert.ok(context.sources[0].peer.gain.value < .08)
  music.start(2, instrumental, {automatic: true})
  assert.equal(music.hit(note, 4), true)
  assert.equal(context.oscillators.length, 4)
  assert.equal(context.sources.length, 1, 'automatic play has no extra percussion')
})

test('a missing stem blocks playback and can be loaded again on the next attempt', async t => {
  const old = globalThis.AudioContext, oldFetch = globalThis.fetch
  t.after(() => { globalThis.AudioContext = old; globalThis.fetch = oldFetch })
  globalThis.AudioContext = TestContext
  let servingStem = false
  globalThis.fetch = async url => {
    const asset = url.pathname.split('/').at(-1)
    return {ok: servingStem || asset.endsWith('-base.mp3'), arrayBuffer: async () => asset}
  }
  const music = new VocalMusic()
  const context = await music.unlock()
  await assert.rejects(music.prepare(track), /楽曲を読み込めませんでした/)
  assert.throws(() => music.start(3, track), /楽曲を再生する準備ができませんでした/)
  assert.equal(context.sources.length, 0)

  servingStem = true
  await music.prepare(track)
  music.start(3, track)
  assert.deepEqual(context.sources.map(s => s.buffer.asset), ['test-base.mp3', 'test-stem.mp3'])

  music.start(4, track, {automatic: true})
  const [firstBacking, firstStem, backing, stem] = context.sources
  assert.ok(firstBacking.stopped && firstStem.stopped)
  assert.equal(backing.buffer.asset, 'test-base.mp3')
  assert.equal(stem.buffer.asset, 'test-stem.mp3')
  assert.deepEqual(backing.started, [4, 0, 10])
  assert.deepEqual(stem.started, [4, 0, 10])
  assert.equal(music.hit({lane: 0}, 6), false)
  assert.equal(context.sources.length, 4, 'automatic playback starts only the two full layers')
  assert.equal(context.oscillators.length, 0, 'automatic playback adds no tap sounds')
})
