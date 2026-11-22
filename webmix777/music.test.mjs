import assert from 'node:assert/strict'
import test from 'node:test'
import { Music, TRACK } from './music.mjs'

test('the original chart fits the song and uses all seven lanes', () => {
  assert.equal(TRACK.bpm, 126)
  assert.equal(TRACK.duration, 36 * (60 / TRACK.bpm) * 4)
  assert.deepEqual([...new Set(TRACK.chart.map(note => note.lane))].sort(), [0, 1, 2, 3, 4, 5, 6])
  let previousTime = 0
  const laneTimes = new Array(7).fill(-Infinity)
  for (const note of TRACK.chart) {
    assert.ok(Number.isInteger(note.pitch) && Number.isInteger(note.lane))
    assert.ok(note.time >= previousTime)
    assert.ok(note.time - laneTimes[note.lane] >= .2)
    assert.ok(note.time + note.duration < TRACK.duration - 1)
    laneTimes[note.lane] = note.time
    previousTime = note.time
  }
})

class Param {
  value = 0
  setValueAtTime() {}
  linearRampToValueAtTime() {}
  exponentialRampToValueAtTime() {}
  setTargetAtTime(value) { this.value = value }
}

class Node {
  gain = new Param()
  frequency = new Param()
  Q = new Param()
  detune = new Param()
  delayTime = new Param()
  threshold = new Param()
  knee = new Param()
  ratio = new Param()
  attack = new Param()
  release = new Param()
  connect(peer) { return peer }
  disconnect() { this.disconnected = true }
}

class TestContext {
  currentTime = 0
  sampleRate = 8_000
  state = 'suspended'
  destination = new Node()
  sources = []
  createDynamicsCompressor() { return new Node() }
  createGain() { return new Node() }
  createBiquadFilter() { return new Node() }
  createDelay() { return new Node() }
  createBuffer(channels, length) {
    const buffer = new Float32Array(length)
    return { getChannelData: () => buffer }
  }
  createOscillator() { return this.createBufferSource() }
  createBufferSource() {
    const source = new Node()
    source.start = when => { source.started = when; this.sources.push(source) }
    source.stop = when => { source.stopped = when }
    return source
  }
  async resume() { this.state = 'running' }
}

test('chart instruments are silent without a judged hit, and stop clears scheduled sounds', async () => {
  const old = globalThis.AudioContext
  globalThis.AudioContext = TestContext
  try {
    const music = new Music()
    const first = TRACK.chart[0]
    assert.equal(music.hit(first), false)
    const context = await music.unlock()
    music.start(3)
    assert.equal(context.sources.length, 0, 'the countdown contains no song sound')
    for (let frame = 0; frame < 100; frame++) {
      context.currentTime = 2.9 + frame / 48
      music.update(context.currentTime - 3)
    }
    assert.ok(context.sources.length > 0, 'a missed piece still has backing instruments')
    const melodyFrequency = 440 * 2 ** ((first.pitch - 69) / 12)
    assert.ok(context.sources.every(source => source.frequency.value !== melodyFrequency), 'backing never starts the missed melody note')

    const previousSources = context.sources.length
    assert.equal(music.hit(first), true)
    const voice = context.sources.slice(previousSources)
    assert.ok(voice.some(source => source.frequency.value === melodyFrequency))
    assert.ok(voice.every(source => source.started === context.currentTime), 'the instrument starts when the key is judged')
    music.stop()
    assert.ok(context.sources.every(source => source.stopped === context.currentTime))
    assert.equal(music.hit(first), false, 'the last run cannot sound during the results screen')
  } finally {
    globalThis.AudioContext = old
  }
})
