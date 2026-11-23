import {Music} from './music.mjs'

// Both files start at the same original sample. The base plays from the
// beginning while a scored note admits only its corresponding stem interval.
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
    const run = this.#recorded = {at, output, sources: new Set(), stem: this.#loaded.stem, automatic}
    this.#play(run, this.#loaded.backing, at, 0, track.duration)
    if (automatic) this.#play(run, run.stem, at, 0, track.duration)
  }

  update(songTime) {
    if (!this.#recorded) super.update(songTime)
  }

  hit(note, when = this.context?.currentTime) {
    const run = this.#recorded
    if (!run) return super.hit(note, when)
    if (run.automatic) return false
    if (!Number.isFinite(when) || !Number.isFinite(note?.time) || !Number.isFinite(note.duration)) return false
    const nominal = run.at + note.time
    // Early input waits for the original beat. Late input catches the phrase
    // at the current beat and never consumes the next note's audio.
    const onset = Math.max(nominal, when, this.context.currentTime)
    const end = Math.min(note.time + note.duration, run.stem.duration)
    const cut = Math.min(end - note.time, onset - nominal)
    const offset = note.time + cut
    if (end - offset < .001) return false
    this.#play(run, run.stem, onset, offset, end - offset, true)
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

  #play(run, buffer, when, offset, duration, fade = false) {
    const source = this.context.createBufferSource()
    source.buffer = buffer
    let shape
    if (fade) {
      shape = this.context.createGain()
      const edge = Math.min(.0025, duration / 4)
      shape.gain.setValueAtTime(0, when)
      shape.gain.linearRampToValueAtTime(1, when + edge)
      shape.gain.setValueAtTime(1, when + duration - edge)
      shape.gain.linearRampToValueAtTime(0, when + duration)
      source.connect(shape).connect(run.output)
    } else {
      source.connect(run.output)
    }
    source.onended = () => {
      run.sources.delete(source)
      source.disconnect()
      shape?.disconnect()
    }
    source.start(when, offset, duration)
    run.sources.add(source)
  }
}
