import assert from 'node:assert/strict'
import {test} from 'node:test'
import {Performance, visitThrough} from './judgement.mjs'
import {TRACKS} from './music.mjs'

const chart = [
  {time: 1, lane: 2, pitch: 60}, {time: 1, lane: 3, pitch: 67},
  {time: 2, lane: 1, pitch: 64}, {time: 3, lane: 0, pitch: 65},
]

test('only a matching lane inside the timing window returns a note, once', () => {
  const mix = new Performance(chart)
  assert.equal(mix.strike(2, .84), null)
  assert.equal(mix.strike(0, 1), null)
  assert.deepEqual(mix.strike(2, .97), {note: chart[0], quality: 'perfect', index: 0})
  assert.equal(mix.strike(2, 1), null)
  assert.deepEqual(mix.strike(3, 1.06), {note: chart[1], quality: 'great', index: 1})
  assert.equal(mix.score, 1750)
  assert.equal(mix.completion, .5)
  assert.equal(mix.maxCombo, 2)
})

test('missing a note loses combo and can never sound after it expires', () => {
  const mix = new Performance(chart)
  mix.strike(2, 1.12)
  assert.equal(mix.advance(1.15), 1)
  assert.equal(mix.strike(3, 1), null)
  assert.equal(mix.combo, 0)
  assert.equal(mix.strike(1, 2.16), null)
  assert.equal(mix.advance(4), 2)
  assert.deepEqual(mix.counts, {perfect: 0, great: 0, good: 1, miss: 3})
  assert.equal(mix.completion, .25)
  assert.equal(mix.score, 400)
})

test('all the auto notes schedule and land once even when the same playback time repeats', () => {
  for (const track of TRACKS) {
    const performance = new Performance(track.chart), played = []
    let audio = 0, visual = 0
    const schedule = note => played.push(note)
    for (let time = 0; time <= track.duration; time += .037) {
      audio = visitThrough(track.chart, audio, time + .18, schedule)
      audio = visitThrough(track.chart, audio, time + .18, schedule)
      visual = visitThrough(track.chart, visual, time, note => performance.strike(note.lane, note.time))
      performance.advance(time)
    }
    assert.deepEqual(played, track.chart)
    assert.equal(performance.completion, 1)
    assert.equal(performance.counts.miss, 0)
  }
})
