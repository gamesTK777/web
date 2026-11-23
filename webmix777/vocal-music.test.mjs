import assert from 'node:assert/strict'
import test from 'node:test'
import {VocalMusic} from './vocal-music.mjs'

class Node {
  gain = {value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, setTargetAtTime() {}}
  connect(peer) { return peer }
  disconnect() { this.disconnected = true }
}

class TestContext {
  sampleRate = 8_000
  currentTime = 0
  state = 'suspended'
  destination = new Node()
  sources = []
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
  async decodeAudioData(asset) { return {duration: 10, asset} }
  async resume() { this.state = 'running' }
}

const track = {duration: 10, audio: {backing: 'audio/test-base.mp3', stem: 'audio/test-stem.mp3'}}

test('an accepted interval starts its own voice slice with no voice during backing or a missed interval', async t => {
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
  assert.deepEqual(context.sources.map(s => s.buffer.asset), ['test-base.mp3'])
  assert.deepEqual(context.sources[0].started, [3, 0, 10])

  assert.equal(music.hit({time: 2, duration: .5}, 4.9), true)
  assert.equal(context.sources[1].buffer.asset, 'test-stem.mp3')
  assert.deepEqual(context.sources[1].started, [5, 2, .5])
  assert.equal(music.hit({time: 2.5, duration: .5}, 5.5), true)
  assert.deepEqual(context.sources[2].started, [5.5, 2.5, .5])

  context.currentTime = 6.125
  assert.equal(music.hit({time: 3, duration: .5}), true)
  assert.deepEqual(context.sources[3].started, [6.125, 3.125, .375])
  assert.equal(music.hit({time: 2, duration: .5}), false, 'audio never extends an expired note into the next slice')
  music.stop()
  assert.ok(context.sources.every(source => source.stopped))
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
  assert.deepEqual(context.sources.map(s => s.buffer.asset), ['test-base.mp3'])

  music.start(4, track, {automatic: true})
  const [, backing, stem] = context.sources
  assert.equal(backing.buffer.asset, 'test-base.mp3')
  assert.equal(stem.buffer.asset, 'test-stem.mp3')
  assert.deepEqual(backing.started, [4, 0, 10])
  assert.deepEqual(stem.started, [4, 0, 10])
  assert.equal(music.hit({time: 2, duration: .5}, 6), false)
  assert.equal(context.sources.length, 3, 'automatic playback does not also schedule individual slices')
})
