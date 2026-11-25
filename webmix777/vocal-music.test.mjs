import assert from 'node:assert/strict'
import test from 'node:test'
import {VocalMusic} from './vocal-music.mjs'

class Node {
  gain = {value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, setTargetAtTime() {}}
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
  createBuffer(channels, length) { return {getChannelData: () => new Float32Array(length)} }
  createBufferSource() {
    const source = new Node()
    source.start = (...args) => { source.started = args; this.sources.push(source) }
    source.stop = () => { source.stopped = true }
    return source
  }
  createOscillator() {
    const oscillator = new Node()
    oscillator.frequency = {setValueAtTime() {}, exponentialRampToValueAtTime() {}}
    oscillator.start = when => { oscillator.started = when; this.oscillators.push(oscillator) }
    oscillator.stop = when => { oscillator.stopped = when }
    return oscillator
  }
  async decodeAudioData(asset) { return {duration: 10, asset} }
  async resume() { this.state = 'running' }
}

const track = {duration: 10, audio: {backing: 'audio/test-base.mp3', stem: 'audio/test-stem.mp3'}}

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
  assert.equal(music.hit(null), false)
  assert.equal(music.hit({lane: 0}, 4.9), true)
  assert.equal(music.hit({lane: 3}, 5.5), true)
  music.update(7)
  assert.equal(context.sources.length, 2, 'hits and misses must not schedule new song sources')
  assert.ok(context.sources.every(source => !source.stopped && !source.disconnected))
  assert.deepEqual(context.oscillators.map(tap => tap.started), [5, 5.5])
  const [firstTap, pendingTap] = context.oscillators
  assert.equal(firstTap.peer.peer, backing.peer, 'the tap mixes into the song without routing either layer through it')
  firstTap.onended()
  assert.ok(firstTap.disconnected && firstTap.peer.disconnected)
  music.stop()
  assert.ok(context.sources.every(source => source.stopped))
  assert.equal(pendingTap.stopped, undefined, 'stopping the song cancels a pending tap immediately')
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
