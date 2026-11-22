export const windows = Object.freeze({perfect: .048, great: .095, good: .145})
const points = Object.freeze({perfect: 1000, great: 750, good: 400})

export class Performance {
  score = 0
  combo = 0
  maxCombo = 0
  hits = 0
  counts = {perfect: 0, great: 0, good: 0, miss: 0}
  firstPending = 0

  constructor(chart) {
    this.chart = chart
    this.results = Array(chart.length).fill(null)
    this.lanes = Array.from({length: 4}, () => [])
    chart.forEach((note, index) => this.lanes[note.lane].push(index))
  }

  advance(time) {
    let misses = 0
    while (this.firstPending < this.chart.length && time - this.chart[this.firstPending].time > windows.good) {
      const index = this.firstPending++
      if (this.results[index]) continue
      this.results[index] = 'miss'
      this.counts.miss++
      this.combo = 0
      misses++
    }
    return misses
  }

  strike(lane, time) {
    if (!Number.isFinite(time) || !this.lanes[lane]) return null
    let closest = -1
    let error = Infinity
    for (const index of this.lanes[lane]) {
      const offset = this.chart[index].time - time
      if (offset > windows.good) break
      if (this.results[index] || Math.abs(offset) > windows.good || Math.abs(offset) >= error) continue
      closest = index
      error = Math.abs(offset)
    }
    if (closest < 0) return null
    const quality = error <= windows.perfect ? 'perfect' : error <= windows.great ? 'great' : 'good'
    this.results[closest] = quality
    this.counts[quality]++
    this.score += points[quality]
    this.combo++
    this.maxCombo = Math.max(this.combo, this.maxCombo)
    this.hits++
    return {note: this.chart[closest], quality}
  }

  get completion() {
    return this.chart.length ? this.hits / this.chart.length : 0
  }
}

export function visitThrough(chart, start, time, visit) {
  let next = start
  while (next < chart.length && chart[next].time <= time) visit(chart[next++])
  return next
}
