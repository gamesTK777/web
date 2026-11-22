const bpm = 138
const beat = 60 / bpm
const barBeats = 4
const measures = 36
const timeAt = (bar, offset = 0) => (bar * barBeats + offset) * beat

// Each phrase is written as [beat within the bar, MIDI pitch(es), length in beats].
const opening = [
  [],
  [[0, 69, .74], [2, 76, .64]],
  [[.5, 70, .54], [1.5, 72, .46], [3, 76, .55]],
  [[0, 69, .52], [1.5, 74, .41], [2.5, 76, .44], [3.5, 72, .31]],
]
const pulse = [
  [[0, 69, .32], [.75, 76, .28], [1.5, 70, .33], [2.5, 74, .34], [3.25, 76, .31]],
  [[.5, 69, .43], [1, 72, .26], [1.75, 77, .3], [2.5, 76, .36], [3.5, 74, .33]],
  [[0, 69, .33], [.75, 76, .29], [1.5, 70, .33], [2, 72, .38], [3, 79, .29], [3.5, 76, .31]],
  [[0, 74, .31], [.5, 72, .53], [1.5, 69, .31], [2.5, 70, .31], [3, 76, .41]],
]
const rise = [
  [[0, [69, 76], .58], [1, 81, .32], [1.5, 77, .47], [2.5, 76, .44], [3.5, 72, .37]],
  [[.5, 74, .44], [1, 76, .29], [1.75, 81, .31], [2.5, 82, .43], [3.5, 76, .28]],
  [[0, [70, 77], .62], [1, 74, .36], [1.5, 76, .43], [2.5, 79, .36], [3.5, 81, .37]],
  [[0, 82, .39], [.75, 81, .37], [1.5, 76, .36], [2, 77, .39], [3, [69, 76], .62]],
]
const breakAndBuild = [
  [[.5, 69, 1.08], [2.5, 76, .95]],
  [[0, 70, 1.14], [2, 77, .77], [3.5, 76, .4]],
  [[0, 72, .75], [1.5, 76, .55], [2.5, 81, .64], [3.5, 82, .38]],
  [[0, 84, .58], [1, 82, .35], [1.5, 79, .36], [2.5, 81, .56], [3.25, 76, .31]],
]
const drop = [
  [[0, [69, 76], .48], [.75, 81, .31], [1.5, 70, .37], [2, 77, .3], [2.75, 76, .34], [3.5, 81, .39]],
  [[0, 84, .42], [.75, 79, .33], [1.25, 74, .38], [2, 76, .32], [2.5, 72, .43], [3.5, 69, .34]],
  [[0, [70, 77], .46], [.75, 81, .3], [1.5, 76, .35], [2, 79, .37], [2.75, 77, .32], [3.5, 76, .34]],
  [[0, 74, .39], [.75, 72, .36], [1.5, 69, .31], [2, 76, .29], [2.5, 77, .35], [3.25, 76, .39]],
]
const secondDrop = [
  [[0, [69, 79], .49], [.75, 76, .28], [1.5, 82, .42], [2.25, 81, .34], [2.75, 76, .34], [3.5, 77, .33]],
  [[0, [72, 79], .47], [.75, 69, .31], [1.5, 74, .4], [2, 76, .31], [2.5, 81, .36], [3.5, 84, .35]],
  [[0, 82, .44], [.75, 76, .31], [1.25, 77, .38], [2, 70, .31], [2.75, 76, .31], [3.5, 81, .35]],
  [[0, 84, .39], [.75, 79, .31], [1.25, 74, .34], [2, 76, .31], [2.5, 72, .34], [3.25, [69, 76], .57]],
]
const outro = [
  [[0, 81, .52], [1.5, 76, .47], [2.5, 74, .6], [3.5, 72, .35]],
  [[0, 70, .65], [1.5, 76, .61], [3, 74, .57]],
  [[0, 72, .67], [1, 70, .55], [2, [69, 76], .93]],
  [],
]

const parts = [
  {from: 0, title: 'イントロ', voice: 'bell', phrase: opening},
  {from: 4, title: 'グルーヴ', voice: 'acid', phrase: [...pulse, ...pulse]},
  {from: 12, title: 'ビルド', voice: 'stab', phrase: rise},
  {from: 16, title: 'ブレイク', voice: 'bell', phrase: breakAndBuild},
  {from: 20, title: 'ドロップ', voice: 'acid', phrase: [...drop, ...secondDrop, ...drop]},
  {from: 32, title: 'アウトロ', voice: 'stab', phrase: outro},
]
const laneOf = {0: 1, 2: 2, 4: 3, 5: 2, 7: 2, 9: 0, 10: 1}
const chart = parts.flatMap(({from, voice, phrase}) => phrase.flatMap((bar, index) =>
  bar.flatMap(([offset, tones, length]) => [tones].flat().map(pitch => Object.freeze({
    time: timeAt(from + index, offset),
    lane: laneOf[pitch % 12],
    pitch,
    duration: length * beat,
    voice: Array.isArray(tones) ? 'stab' : voice,
  })))))
chart.sort((a, b) => a.time - b.time || a.lane - b.lane)

const am = {notes: [45, 52, 57, 60]}
const bb = {notes: [46, 53, 57, 62]}
const g = {notes: [43, 50, 55, 57]}
const breakChords = [am, bb, g, am]
const bassRoots = [33, 33, 34, 33, 33, 29, 31, 33]

function composeBacking() {
  const events = []
  const add = (bar, offset, kind, detail) => events.push({time: timeAt(bar, offset), kind, detail})
  for (let bar = 0; bar < measures; bar++) {
    const breaking = bar >= 16 && bar < 20
    const dropping = bar >= 20 && bar < 32
    const grounded = bar >= 4 && bar < 34 && !breaking
    const ride = dropping || (bar >= 12 && bar < 16)

    if (bar === 35) {
      add(bar, 0, 'pad', {chord: am, length: 2.95, peak: .14})
      continue
    }
    if (breaking) {
      add(bar, 0, 'pad', {chord: breakChords[bar - 16], length: 2.95, peak: .2})
      if (bar === 18) add(bar, 2, 'kick', .58)
      if (bar === 19) {
        for (const offset of [0, 1, 2]) add(bar, offset, 'kick', .63)
        for (const offset of [1, 2, 2.5, 3, 3.25, 3.5]) add(bar, offset, 'clap', .15 + offset * .037)
      }
      continue
    }

    const kickSteps = bar === 34 ? [0, 1, 2] : [0, 1, 2, 3]
    for (const offset of kickSteps) {
      add(bar, offset, 'kick', dropping ? .84 : grounded ? .76 : .65)
      add(bar, offset + .14, 'rumble', dropping ? .2 : .14)
    }
    if (bar === 0 || bar === 2 || bar >= 33) add(bar, 0, 'pad', {chord: am, length: 2.9, peak: .13})
    if (bar >= 2 && bar < 34) {
      for (const offset of [1, 3]) add(bar, offset, 'clap', dropping ? .25 : .2)
      for (const offset of [.5, 1.5, 2.5, 3.5]) {
        add(bar, offset, 'hat', {open: grounded, peak: grounded ? .14 : .075})
        if (ride) add(bar, offset - .015, 'ride', dropping ? .13 : .088)
      }
      if (dropping) for (const offset of [.75, 1.75, 2.75, 3.75]) add(bar, offset, 'hat', {open: false, peak: .066})
    }
    if (grounded) {
      const root = bassRoots[bar % bassRoots.length]
      for (const [offset, shift] of [[.5, 0], [1.5, 0], [2.5, 12], [3.5, bar % 4 === 3 ? 7 : 0]]) {
        add(bar, offset, 'bass', {pitch: root + shift, length: .34, peak: dropping ? .235 : .185})
      }
      if (dropping && bar % 2 === 1) add(bar, 3.125, 'bass', {pitch: root + 12, length: .27, peak: .16})
    }
  }
  return events.sort((a, b) => a.time - b.time)
}

export const technoTrack = Object.freeze({
  id: 'strobe-after-two',
  title: '午前二時の閃光',
  artist: 'ウェブミックス777',
  genre: 'PEAK-TIME TECHNO',
  art: 'art/strobe-after-two.webp',
  bpm,
  duration: timeAt(measures),
  mix: Object.freeze({bed: .7, lead: .94, echo: .115, pump: .3}),
  chart: Object.freeze(chart),
  backing: Object.freeze(composeBacking()),
  sections: Object.freeze(parts.map(({from, title}) => Object.freeze({time: timeAt(from), title}))),
})
