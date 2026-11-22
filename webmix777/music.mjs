const bpm = 126
const beat = 60 / bpm
const barLength = 4 * beat
const measures = 36

const chords = {
  Am: { bass: 33, notes: [57, 60, 64, 67] },
  F: { bass: 29, notes: [53, 57, 60, 64] },
  C: { bass: 36, notes: [55, 60, 64, 67] },
  G: { bass: 31, notes: [55, 59, 62, 69] },
  Dm: { bass: 38, notes: [53, 57, 62, 69] },
  Em: { bass: 40, notes: [55, 59, 64, 67] },
}

const harmony = [
  'Am', 'F', 'C', 'G',
  'Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G',
  'F', 'G', 'Em', 'Am', 'F', 'G', 'Em', 'Am',
  'Dm', 'F', 'C', 'G',
  'Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G',
  'F', 'G', 'Am', 'Am',
].map(name => chords[name])

// Entries are [beat in the bar, MIDI pitch or chord, note length in beats].
// The backing arrangement has its own score below and never reads these parts.
const introduction = [
  [],
  [[0, 72, 1], [2, 76, 1.2]],
  [[0, 79, 1.3], [2, 76, .9]],
  [[1, 74, .7], [2, 71, .6], [3, 74, .75]],
]
const hook = [
  [[0, 76, .6], [1, 79, .38], [1.5, 81, .32], [2.5, 79, .68], [3.5, 76, .4]],
  [[0, 77, .7], [1.5, 76, .35], [2, 72, .68], [3, 69, .65]],
  [[.5, 72, .4], [1.5, 76, .35], [2, 79, .75], [3, 76, .6]],
  [[0, 74, .6], [1, 71, .4], [1.5, 74, .35], [2.5, 79, .5], [3.5, 74, .42]],
]
const rise = [
  [[0, 81, .7], [1, 79, .4], [1.5, 77, .35], [2.5, 76, .6], [3.5, 72, .4]],
  [[0, 74, .55], [.75, 79, .55], [1.5, 83, .4], [2.5, 81, .52], [3.5, 79, .25]],
  [[0, 76, .65], [1, 74, .35], [1.5, 71, .44], [2.5, 76, .6], [3.5, 79, .39]],
  [[0, 81, .82], [1.5, 76, .45], [2, 72, .45], [2.5, 74, .45], [3, 76, .75]],
]
const breakPart = [
  [[0, 69, 1.5], [2, 74, 1.05]],
  [[.5, 72, 1.1], [2.5, 76, .8]],
  [[0, 79, 1.4], [2, 76, .65], [3, 72, .65]],
  [[0, 71, .6], [1, 74, .6], [2, 79, .65], [3, 83, .72]],
]
const finale = [
  [[0, [76, 81], .72], [1, 79, .34], [1.5, 81, .36], [2.5, 84, .62], [3.5, 81, .35]],
  [[0, 77, .7], [1, 81, .5], [1.75, 79, .32], [2.5, 76, .53], [3.5, 72, .38]],
  [[0, [72, 79], .76], [1, 76, .35], [1.5, 79, .35], [2.5, 84, .56], [3.5, 83, .39]],
  [[0, 79, .56], [.75, 74, .39], [1.5, 71, .34], [2.5, 74, .53], [3.5, 79, .36]],
]
const outro = [
  [[0, 81, .68], [1, 77, .5], [2, 76, .74]],
  [[0, 74, .6], [1.5, 71, .5], [2.5, 74, .64]],
  [[0, [69, 76], .74], [1.5, 72, .56], [2.5, 69, 1]],
  [],
]

const parts = [
  { from: 0, score: introduction, voice: 'bell', title: '序奏' },
  { from: 4, score: [...hook, ...hook.slice(0, 3), [[0, 74, .5], [.75, 79, .4], [1.5, 83, .37], [2.5, 81, .72], [3.5, 79, .36]]], voice: 'lead', title: 'メインフレーズ' },
  { from: 12, score: [...rise, ...rise], voice: 'lead', title: '展開' },
  { from: 20, score: breakPart, voice: 'bell', title: 'ブレイク' },
  { from: 24, score: [...finale, ...finale.slice(0, 3), [[0, 83, .53], [.75, 79, .46], [1.5, 74, .34], [2.5, 79, .48], [3.5, 83, .36]]], voice: 'lead', title: 'フィナーレ' },
  { from: 32, score: outro, voice: 'bell', title: '余韻' },
]

const pitchLanes = { 0: 0, 2: 1, 4: 2, 5: 3, 7: 4, 9: 5, 11: 6 }
const chart = parts.flatMap(({ from, score, voice }) => score.flatMap((entries, index) =>
  entries.flatMap(([offset, pitches, length]) => (Array.isArray(pitches) ? pitches : [pitches])
    .map(pitch => Object.freeze({
      time: ((from + index) * 4 + offset) * beat,
      lane: pitchLanes[pitch % 12],
      pitch,
      duration: length * beat,
      voice,
    })))))

chart.sort((left, right) => left.time - right.time || left.lane - right.lane)

export const TRACK = Object.freeze({
  title: '夜明けのネオン',
  artist: 'ウェブミックス777',
  genre: 'SYNTH HOUSE',
  bpm,
  duration: measures * barLength,
  chart: Object.freeze(chart),
  sections: Object.freeze(parts.map(({ from, title }) => Object.freeze({ time: from * barLength, title }))),
})

function composeBacking() {
  const events = []
  function add(bar, offset, kind, detail) {
    events.push({ time: (bar * 4 + offset) * beat, kind, detail })
  }
  for (let bar = 0; bar < measures; bar++) {
    const chord = harmony[bar]
    const fullGroove = bar >= 4 && bar < 32 && bar !== 20 && bar !== 21
    const softGroove = bar >= 2 && bar < 34 && bar !== 20 && bar !== 21
    add(bar, 0, 'pad', { chord, length: bar === 35 ? 3.25 : 1.85, peak: fullGroove ? .14 : .23 })
    if (bar < 35) add(bar, fullGroove ? 2.5 : 2, 'pad', { chord, length: fullGroove ? .75 : 1.5, peak: .11 })

    if (softGroove) {
      for (const offset of fullGroove ? [0, 1, 2, 3] : [0, 2]) add(bar, offset, 'kick', fullGroove ? .51 : .35)
      if (bar !== 33) for (const offset of [1, 3]) add(bar, offset, 'clap', .22)
      for (const offset of [.5, 1.5, 2.5, 3.5]) {
        add(bar, offset, 'hat', { open: fullGroove && offset % 2 === .5, peak: fullGroove ? .12 : .08 })
      }
      if (bar >= 12 && bar !== 22 && bar < 32) {
        for (const offset of [1.25, 2.75, 3.75]) add(bar, offset, 'hat', { open: false, peak: .045 })
      }
    }

    if (fullGroove) {
      const octaveFill = bar % 4 === 3
      for (const [offset, shift, length] of [[.5, 0, .33], [1.5, 0, .3], [2.5, 12, .28], [3.5, octaveFill ? 7 : 0, .33]]) {
        add(bar, offset, 'bass', { pitch: chord.bass + shift, length, peak: .19 })
      }
    } else {
      add(bar, 0, 'bass', { pitch: chord.bass, length: bar === 35 ? 2.8 : 1.9, peak: .125 })
      if (bar > 1 && bar < 34) add(bar, 2.5, 'bass', { pitch: chord.bass, length: .65, peak: .1 })
    }
  }
  return events.sort((left, right) => left.time - right.time)
}

const backing = composeBacking()
const lookahead = .185
const silence = .0001
const frequency = pitch => 440 * 2 ** ((pitch - 69) / 12)
const boundedVolume = value => Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : .78

export class Music {
  context = null
  #master = null
  #volume = .78
  #noise = null
  #run = null

  async unlock() {
    if (!this.context) {
      const Audio = globalThis.AudioContext ?? globalThis.webkitAudioContext
      if (!Audio) throw new Error('このブラウザーは音声再生に対応していません。')
      this.context = new Audio({ latencyHint: 'interactive' })
      const context = this.context
      const compressor = context.createDynamicsCompressor()
      compressor.threshold.value = -16
      compressor.knee.value = 19
      compressor.ratio.value = 3
      compressor.attack.value = .005
      compressor.release.value = .18
      this.#master = context.createGain()
      this.#master.gain.value = this.#volume
      this.#master.connect(compressor).connect(context.destination)

      const frames = Math.ceil(context.sampleRate * .36)
      this.#noise = context.createBuffer(1, frames, context.sampleRate)
      const noise = this.#noise.getChannelData(0)
      let seed = 321_777
      for (let i = 0; i < frames; i++) {
        seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0
        noise[i] = seed / 2_147_483_648 - 1
      }
    }
    if (this.context.state !== 'running') await this.context.resume()
    return this.context
  }

  setVolume(value) {
    this.#volume = boundedVolume(value)
    if (this.#master) this.#master.gain.setTargetAtTime(this.#volume, this.context.currentTime, .035)
  }

  start(at = this.context?.currentTime) {
    if (!this.context || !Number.isFinite(at)) return
    this.stop()
    const context = this.context
    const output = context.createGain()
    const accompaniment = context.createGain()
    accompaniment.gain.value = .61
    const melody = context.createGain()
    melody.gain.value = .93
    accompaniment.connect(output)
    melody.connect(output)

    const echo = context.createDelay(.7)
    echo.delayTime.value = beat * .75
    const feedback = context.createGain()
    feedback.gain.value = .24
    const wet = context.createGain()
    wet.gain.value = .16
    melody.connect(echo)
    echo.connect(feedback).connect(echo)
    echo.connect(wet).connect(output)
    output.connect(this.#master)
    this.#run = { at, cursor: 0, output, accompaniment, melody, feedback, echo, wet, active: new Set() }
    this.update()
  }

  stop() {
    const run = this.#run
    if (!run) return
    this.#run = null
    run.output.disconnect()
    for (const source of run.active) {
      try { source.stop(this.context.currentTime) } catch { /* An ended source may still have an event queued. */ }
    }
    for (const node of [run.accompaniment, run.melody, run.feedback, run.echo, run.wet]) node.disconnect()
  }

  update(songTime = this.context?.currentTime - this.#run?.at) {
    const run = this.#run
    if (!run || !Number.isFinite(songTime)) return
    const now = this.context.currentTime
    // Late frames skip old events instead of stacking beats on top of one another.
    while (run.cursor < backing.length && backing[run.cursor].time <= songTime + lookahead) {
      const event = backing[run.cursor++]
      const when = run.at + event.time
      if (when >= now - .065) this.#playBacking(run, event, Math.max(now, when))
    }
  }

  hit(note, when = this.context?.currentTime) {
    const run = this.#run
    if (!run || !Number.isFinite(note?.pitch) || !Number.isFinite(when)) return false
    const onset = Math.max(when, this.context.currentTime)
    const length = Math.min(1, Math.max(.09, note.duration))
    if (note.voice === 'bell') this.#bell(run, frequency(note.pitch), onset, length)
    else this.#lead(run, frequency(note.pitch), onset, length)
    return true
  }

  #playBacking(run, { kind, detail }, when) {
    switch (kind) {
      case 'kick': this.#kick(run, when, detail); break
      case 'clap': this.#noiseHit(run, when, 'bandpass', 2150, .105, detail); break
      case 'hat': this.#noiseHit(run, when, 'highpass', 6800, detail.open ? .115 : .036, detail.peak); break
      case 'bass': this.#bass(run, when, detail); break
      case 'pad': this.#pad(run, when, detail); break
    }
  }

  #envelope(target, when, points) {
    const gain = this.context.createGain()
    gain.connect(target)
    gain.gain.setValueAtTime(silence, when)
    gain.gain.linearRampToValueAtTime(points[1], when + points[0])
    for (let i = 2; i < points.length; i += 2) gain.gain.exponentialRampToValueAtTime(points[i + 1], when + points[i])
    return gain
  }

  #filter(target, type, cutoff) {
    const filter = this.context.createBiquadFilter()
    filter.type = type
    filter.frequency.value = cutoff
    filter.Q.value = .65
    filter.connect(target)
    return filter
  }

  #osc(type, hz, target, detune = 0) {
    const oscillator = this.context.createOscillator()
    oscillator.type = type
    oscillator.frequency.value = hz
    oscillator.detune.value = detune
    oscillator.connect(target)
    return oscillator
  }

  #play(run, sources, connections, when, length) {
    let remaining = sources.length
    for (const source of sources) {
      run.active.add(source)
      source.onended = () => {
        run.active.delete(source)
        source.disconnect()
        if (--remaining === 0) for (const node of connections) node.disconnect()
      }
      source.start(when)
      source.stop(when + length)
    }
  }

  #kick(run, when, peak) {
    const level = this.#envelope(run.accompaniment, when, [.002, peak, .06, peak * .34, .21, silence])
    const osc = this.#osc('sine', 152, level)
    osc.frequency.setValueAtTime(152, when)
    osc.frequency.exponentialRampToValueAtTime(52, when + .047)
    osc.frequency.exponentialRampToValueAtTime(45, when + .18)
    this.#play(run, [osc], [level], when, .215)
  }

  #noiseHit(run, when, type, cutoff, length, peak) {
    const level = this.#envelope(run.accompaniment, when, [.002, peak, length * .35, peak * .43, length, silence])
    const filter = this.#filter(level, type, cutoff)
    const source = this.context.createBufferSource()
    source.buffer = this.#noise
    source.connect(filter)
    this.#play(run, [source], [filter, level], when, length + .006)
  }

  #bass(run, when, { pitch, length, peak }) {
    const seconds = length * beat
    const level = this.#envelope(run.accompaniment, when, [.009, peak, seconds * .78, peak * .47, seconds + .12, silence])
    const filter = this.#filter(level, 'lowpass', 470)
    filter.frequency.setValueAtTime(690, when)
    filter.frequency.exponentialRampToValueAtTime(260, when + seconds * .75)
    const hz = frequency(pitch)
    this.#play(run, [this.#osc('triangle', hz, filter), this.#osc('sine', hz, filter)], [filter, level], when, seconds + .126)
  }

  #pad(run, when, { chord, length, peak }) {
    const seconds = length * beat
    const level = this.#envelope(run.accompaniment, when, [.04, peak / chord.notes.length, seconds, peak * .063, seconds + .23, silence])
    const filter = this.#filter(level, 'lowpass', 1430)
    const oscillators = chord.notes.map((pitch, index) => this.#osc(index % 2 ? 'sine' : 'triangle', frequency(pitch), filter, index * 3 - 5))
    this.#play(run, oscillators, [filter, level], when, seconds + .236)
  }

  #lead(run, hz, when, length) {
    const level = this.#envelope(run.melody, when, [.006, .235, .06, .155, length, .084, length + .16, silence])
    const filter = this.#filter(level, 'lowpass', 4400)
    filter.frequency.setValueAtTime(4400, when)
    filter.frequency.exponentialRampToValueAtTime(1720, when + length)
    const octave = this.context.createGain()
    octave.gain.value = .17
    octave.connect(filter)
    const core = this.#osc('triangle', hz, filter)
    const shine = this.#osc('sine', hz * 2, octave, 4)
    this.#play(run, [core, shine], [octave, filter, level], when, length + .165)
  }

  #bell(run, hz, when, length) {
    const level = this.#envelope(run.melody, when, [.004, .26, .05, .15, length, .058, length + .28, silence])
    const body = this.#osc('sine', hz, level)
    const modulation = this.context.createGain()
    modulation.gain.setValueAtTime(hz * 1.7, when)
    modulation.gain.exponentialRampToValueAtTime(silence, when + length * .83)
    modulation.connect(body.frequency)
    const strike = this.#osc('sine', hz * 2.01, modulation)
    this.#play(run, [body, strike], [modulation, level], when, length + .285)
  }
}
