import {Music} from './music.mjs'

const hitFrequencies = [220, 420, 560, 710]

// The two layers reconstruct the full song and share a single start time.
export class VocalMusic extends Music {
  #loaded = null
  #recorded = null
  #bus = null
  #volume = .78

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
    if (!track?.audio) return super.start(at, track)
    if (!this.context || this.#loaded?.track !== track || !Number.isFinite(at))
      throw new Error('楽曲を再生する準備ができませんでした。')
    if (!this.#bus) {
      this.#bus = this.context.createGain()
      this.#bus.gain.value = this.#volume
      this.#bus.connect(this.context.destination)
    }
    const output = this.context.createGain()
    output.connect(this.#bus)
    const run = this.#recorded = {output, sources: new Set(), automatic}
    this.#playLayer(run, this.#loaded.backing, at, track.duration)
    this.#playLayer(run, this.#loaded.stem, at, track.duration)
  }

  update(songTime) {
    if (!this.#recorded) super.update(songTime)
  }

  hit(note, when = this.context?.currentTime) {
    const run = this.#recorded
    if (!run) return super.hit(note, when)
    const lane = note?.lane
    if (run.automatic || !Number.isFinite(when) || !Number.isInteger(lane) || lane < 0 || lane >= hitFrequencies.length) return false

    const context = this.context
    const onset = Math.max(when, context.currentTime)
    const end = onset + .034
    const tap = context.createOscillator()
    const envelope = context.createGain()
    tap.frequency.setValueAtTime(hitFrequencies[lane], onset)
    tap.frequency.exponentialRampToValueAtTime(hitFrequencies[lane] * .6, end)
    envelope.gain.setValueAtTime(0, onset)
    envelope.gain.linearRampToValueAtTime(.035, onset + .003)
    envelope.gain.linearRampToValueAtTime(0, end)
    tap.connect(envelope).connect(run.output)
    tap.start(onset)
    this.#trackSource(run, tap, envelope)
    tap.stop(end)
    return true
  }

  stop() {
    super.stop()
    const run = this.#recorded
    if (!run) return
    this.#recorded = null
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

  #trackSource(run, source, envelope) {
    source.onended = () => {
      run.sources.delete(source)
      source.disconnect()
      envelope?.disconnect()
    }
    run.sources.add(source)
  }
}
