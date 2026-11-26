import {Music} from './music.mjs'

export const comboAccentEvery = 8

const pads = [
  {length: .106, sweep: 155, tone: 52, body: .92, noise: .29, cutoff: 1_450},
  {length: .071, sweep: 315, tone: 180, body: .54, noise: .61, cutoff: 2_600},
  {length: .053, sweep: 540, tone: 360, body: .36, noise: .76, cutoff: 4_300},
  {length: .048, sweep: 760, tone: 510, body: .25, noise: .86, cutoff: 5_900},
]
const hitLevels = {good: .091, great: .107, perfect: .126}
const comboFill = [[.25, 2, .59], [.5, 3, .44]]

function makePad(context, lane, bright) {
  const {length, sweep, tone, body, noise, cutoff} = pads[lane]
  const rate = context.sampleRate
  const buffer = context.createBuffer(1, Math.ceil(rate * length), rate)
  const samples = buffer.getChannelData(0)
  const fast = 1 - Math.exp(-2 * Math.PI * cutoff * (bright ? 1.35 : 1) / rate)
  const slow = 1 - Math.exp(-2 * Math.PI * cutoff * .22 / rate)
  let seed = 77_017 + lane * 997
  let low = 0, high = 0, phase = 0
  for (let frame = 0; frame < samples.length; frame++) {
    const time = frame / rate
    seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0
    const random = seed / 2_147_483_648 - 1
    low += (random - low) * slow
    high += (random - high) * fast
    phase += 2 * Math.PI * (tone + (sweep - tone) * Math.exp(-time * 65)) / rate
    const thump = body * Math.sin(phase) * Math.exp(-time * (lane === 0 ? 37 : 98))
    const snap = noise * (high - low) * Math.exp(-time * (bright ? 115 : 165))
    const edges = Math.min(1, time / .001, (length - time) / .006)
    samples[frame] = (thump + snap) * edges
  }
  return buffer
}

// The two layers reconstruct the full song and share a single start time.
export class VocalMusic extends Music {
  #loaded = null
  #run = null
  #bus = null
  #volume = .78
  #pads = null

  async prepare(track) {
    if (!track.audio) {
      this.#loaded = null
      return
    }
    if (this.#loaded?.track === track) return
    this.#loaded = null
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 40_000)
    const decode = async path => {
      const response = await fetch(new URL(path, import.meta.url), {signal: controller.signal})
      if (!response.ok) throw new Error('Asset unavailable')
      return this.context.decodeAudioData(await response.arrayBuffer())
    }
    try {
      const [backing, stem] = await Promise.all([decode(track.audio.backing), decode(track.audio.stem)])
      if (Math.min(backing.duration, stem.duration) < track.duration - .08 ||
          Math.abs(backing.duration - stem.duration) > .08) throw new Error('Unaligned stems')
      this.#loaded = {track, backing, stem}
    } catch (cause) {
      controller.abort()
      throw new Error('楽曲を読み込めませんでした。通信を確認してからもう一度お試しください。', {cause})
    } finally {
      clearTimeout(timeout)
    }
  }

  setVolume(value) {
    super.setVolume(value)
    this.#volume = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : .78
    if (this.#bus) this.#bus.gain.setTargetAtTime(this.#volume, this.context.currentTime, .035)
  }

  start(at, track, {automatic = false} = {}) {
    this.stop()
    const recorded = Boolean(track?.audio)
    if (recorded && (!this.context || this.#loaded?.track !== track || !Number.isFinite(at)))
      throw new Error('楽曲を再生する準備ができませんでした。')
    if (!recorded) super.start(at, track)
    if (!this.context || !track || !Number.isFinite(at) || (!recorded && automatic)) return
    if (!automatic && !this.#pads) {
      this.#pads = [false, true].flatMap(bright => pads.map((_, lane) => makePad(this.context, lane, bright)))
    }
    if (!this.#bus) {
      this.#bus = this.context.createGain()
      this.#bus.gain.value = this.#volume
      this.#bus.connect(this.context.destination)
    }
    const output = this.context.createGain()
    output.connect(this.#bus)
    const run = this.#run = {at, beat: 60 / track.bpm, end: at + track.duration, output, sources: new Set(), recorded, automatic}
    if (recorded) {
      this.#playLayer(run, this.#loaded.backing, at, track.duration)
      this.#playLayer(run, this.#loaded.stem, at, track.duration)
    }
  }

  update(songTime) {
    if (!this.#run?.recorded) super.update(songTime)
  }

  hit(note, when = this.context?.currentTime, feedback) {
    const run = this.#run
    if (!run?.recorded) {
      const sounded = super.hit(note, when)
      if (!sounded || !run || !feedback) return sounded
    }
    const lane = note?.lane
    if (run.automatic || !Number.isFinite(when) || !Number.isInteger(lane) || lane < 0 || lane >= pads.length) return !run.recorded

    const onset = Math.max(when, this.context.currentTime)
    const quality = feedback?.quality
    const level = (Object.hasOwn(hitLevels, quality) ? hitLevels[quality] : hitLevels.good) * (run.recorded ? 1 : .54)
    this.#playPad(run, lane, onset, level, quality === 'perfect')
    const combo = feedback?.combo
    if (Number.isInteger(combo) && combo >= comboAccentEvery && combo % comboAccentEvery === 0) {
      // Reference the chart rather than the input, and skip accents that are already too late.
      const beatTime = run.at + note.time
      for (const [fraction, pad, accentLevel] of comboFill) {
        const time = beatTime + run.beat * fraction
        if (time >= onset + .035 && time <= onset + .31 && time < run.end - .08) {
          this.#playPad(run, pad, time, level * accentLevel, true)
        }
      }
    }
    return true
  }

  stop() {
    super.stop()
    const run = this.#run
    if (!run) return
    this.#run = null
    run.output.disconnect()
    for (const source of run.sources) source.stop()
    run.sources.clear()
  }

  #playLayer(run, buffer, when, duration) {
    const source = this.context.createBufferSource()
    source.buffer = buffer
    source.connect(run.output)
    source.start(when, 0, duration)
    this.#trackSource(run, source)
  }

  #playPad(run, lane, when, level, bright) {
    const source = this.context.createBufferSource()
    const gain = this.context.createGain()
    source.buffer = this.#pads[lane + (bright ? pads.length : 0)]
    gain.gain.value = level
    source.connect(gain).connect(run.output)
    source.start(when)
    this.#trackSource(run, source, gain)
  }

  #trackSource(run, source, gain) {
    source.onended = () => {
      run.sources.delete(source)
      source.disconnect()
      gain?.disconnect()
    }
    run.sources.add(source)
  }
}
