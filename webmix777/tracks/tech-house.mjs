const bpm = 128
const beat = 60 / bpm
const barTime = bar => bar * 4 * beat

const harmony = [
  { bass: 29, notes: [53, 56, 60, 67] },
  { bass: 25, notes: [49, 53, 56, 60] },
  { bass: 32, notes: [48, 55, 60, 65] },
  { bass: 27, notes: [51, 55, 58, 65] },
]

// Each row is [beat, lane, MIDI pitch, duration in beats].
const warmup = [
  [],
  [[0, 0, 65, .4], [2, 2, 72, .45]],
  [[.5, 0, 65, .5], [1.5, 1, 68, .35], [3, 2, 72, .44]],
  [[0, 3, 70, .45], [1, 1, 67, .38], [2.5, 2, 72, .55], [3.5, 3, 75, .44]],
]

const groove = [
  [[0, 0, 65, .36], [.75, 1, 68, .25], [1.5, 2, 72, .34], [2.5, 1, 68, .3], [3.5, 0, 65, .4]],
  [[0, 1, 65, .38], [1, 0, 61, .36], [1.75, 2, 68, .24], [2.5, 3, 72, .43], [3.5, 2, 68, .31]],
  [[.5, 0, 60, .32], [1.5, 1, 63, .31], [2, 2, 68, .38], [3, 3, 72, .38], [3.5, 1, 70, .34]],
  [[0, 2, 67, .42], [.75, 1, 70, .27], [1.5, 3, 75, .39], [2.5, 2, 72, .31], [3.5, 0, 67, .39]],
]

const build = [
  [[0, 1, 68, 1.1], [2, 3, 72, .83]],
  [[.5, 0, 65, .74], [2, 1, 68, .55], [3, 2, 72, .45]],
  [[0, 1, 72, .8], [1.5, 3, 75, .5], [2.5, 2, 77, .55], [3.5, 0, 75, .36]],
  [[0, 1, 70, .44], [.75, 2, 72, .35], [1.5, 3, 75, .32], [2.5, 2, 79, .42], [3.5, 0, 75, .39]],
]

const drop = [
  [[0, 0, 65, .41], [0, 2, 72, .45], [.75, 1, 68, .26], [1.5, 3, 77, .37], [2.5, 2, 75, .29], [3, 1, 72, .34], [3.5, 0, 68, .3]],
  [[0, 1, 65, .41], [.75, 0, 61, .29], [1.5, 2, 68, .3], [2, 3, 77, .4], [3, 2, 72, .35], [3.5, 0, 68, .34]],
  [[.5, 0, 60, .41], [1.5, 1, 68, .33], [2, 2, 72, .47], [2, 3, 75, .44], [3, 1, 72, .29], [3.5, 0, 68, .29]],
  [[0, 2, 67, .47], [.75, 1, 70, .25], [1.5, 3, 75, .4], [2.5, 2, 79, .45], [3.25, 1, 75, .3], [3.75, 3, 70, .24]],
]

const tail = [
  [[0, 0, 65, .5], [1.5, 1, 68, .43], [2.5, 2, 72, .61]],
  [[0, 3, 77, .51], [2, 2, 72, .43], [3, 1, 68, .48]],
  [[0, 0, 65, 1.18], [2, 2, 72, .92]],
  [],
]

const sections = [
  { from: 0, title: 'イントロ', bars: warmup, voice: 'stab' },
  { from: 4, title: 'グルーヴ', bars: [...groove, ...groove], voice: 'stab' },
  { from: 12, title: 'ビルドアップ', bars: build, voice: 'acid' },
  { from: 16, title: 'ドロップ', bars: [...drop, ...drop], voice: 'stab' },
  { from: 24, title: 'フック', bars: groove, voice: 'acid' },
  { from: 28, title: 'アウトロ', bars: tail, voice: 'stab' },
]

const chart = sections.flatMap(({ from, bars, voice }) => bars.flatMap((rows, bar) => rows.map(([offset, lane, pitch, length]) =>
  Object.freeze({ time: barTime(from + bar) + offset * beat, lane, pitch, duration: length * beat, voice }))))

const backing = []
const add = (bar, offset, kind, detail) => backing.push({ time: barTime(bar) + offset * beat, kind, detail })
for (let bar = 0; bar < 32; bar++) {
  const chord = harmony[bar >= 30 ? 0 : bar % 4]
  const breakdown = bar >= 12 && bar < 16
  const dropActive = bar >= 16 && bar < 28
  const hasBass = bar >= 1 && !breakdown && bar < 31
  const hasDrums = bar < 30 && !breakdown

  if (hasDrums) {
    for (const offset of bar === 11 || bar === 27 ? [0, 1, 2] : [0, 1, 2, 3]) {
      add(bar, offset, 'kick', dropActive ? .79 : .69)
    }
    if (bar >= 2) for (const offset of [1, 3]) add(bar, offset, 'clap', dropActive ? .26 : .22)
    for (const offset of [.5, 1.5, 2.5, 3.5]) add(bar, offset, 'hat', { open: bar >= 2, peak: dropActive ? .16 : .12 })
    if (bar >= 2) for (const offset of [.81, 1.81, 2.81, 3.81]) add(bar, offset, 'hat', { open: false, peak: .07 })
    if (dropActive) for (const offset of [1.5, 3.5]) add(bar, offset, 'ride', .095)
  }

  if (hasBass) {
    const eighths = [[.52, 0, .31], [1.18, 0, .18], [1.56, 0, .31], [2.52, 0, .26], [3.18, bar % 4 === 3 ? 7 : 12, .19], [3.53, 0, .31]]
    for (const [offset, change, length] of eighths) add(bar, offset, 'bass', { pitch: chord.bass + change, length, peak: change ? .15 : .225 })
  }

  if (breakdown || bar >= 30 || bar < 2) {
    add(bar, 0, 'pad', { chord, length: bar === 31 ? 2.9 : 2.2, peak: breakdown ? .27 : .18 })
  } else {
    add(bar, .5, 'pad', { chord, length: .62, peak: .19 })
    add(bar, 2.5, 'pad', { chord, length: .5, peak: .15 })
  }

  if (bar === 14 || bar === 15) {
    const rhythm = bar === 14 ? [1, 2, 3] : [0, .5, 1, 1.5, 2, 2.5, 2.75, 3, 3.25, 3.5]
    for (const offset of rhythm) add(bar, offset, 'clap', .08 + offset * .04)
  }
}

backing.sort((left, right) => left.time - right.time)

export const techHouseTrack = Object.freeze({
  id: 'bass-corridor', title: '低音回廊', artist: 'ウェブミックス777', genre: 'TECH HOUSE', art: 'art/bass-corridor.webp',
  bpm, duration: barTime(32), chart: Object.freeze(chart), backing: Object.freeze(backing),
  mix: Object.freeze({ bed: .72, lead: .97, echo: .12, pump: .28 }),
  sections: Object.freeze(sections.map(({ from, title }) => Object.freeze({ time: barTime(from), title }))),
})
