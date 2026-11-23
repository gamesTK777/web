import test from 'node:test'
import assert from 'node:assert/strict'
import {statSync} from 'node:fs'
import {Performance, visitThrough, windows} from '../judgement.mjs'
import {VOCAL_TRACKS} from './vocals.mjs'

test('the vocal catalog ships five independent tracks in each language', () => {
  assert.equal(VOCAL_TRACKS.length, 10)
  assert.equal(new Set(VOCAL_TRACKS.map(track => track.id)).size, 10)
  for (const language of ['ja', 'en']) {
    assert.equal(VOCAL_TRACKS.filter(track => track.language === language).length, 5)
  }
  for (const track of VOCAL_TRACKS) {
    assert.ok(track.duration >= 108 && track.duration <= 132, track.id)
    assert.notEqual(track.audio.backing, track.audio.stem, track.id)
    for (const path of [track.audio.backing, track.audio.stem, track.art]) {
      assert.ok(statSync(new URL('../' + path, import.meta.url)).size > 0, path)
    }
  }
})

test('every vocal slice stays on the recording timeline and the exact chart can be completed', () => {
  for (const track of VOCAL_TRACKS) {
    const run = new Performance(track.chart)
    assert.ok(track.chart.length > 0, track.id)
    let end = 0
    const next = visitThrough(track.chart, 0, track.duration, note => {
      assert.ok(Number.isInteger(note.lane) && note.lane >= 0 && note.lane < 4, track.id)
      assert.ok(note.time + .0001 >= end, track.id)
      assert.ok(note.duration > 0 && note.time < track.duration - windows.good, track.id)
      end = note.time + note.duration
      assert.ok(end <= track.duration + .0001, track.id)
      assert.equal(run.strike(note.lane, note.time)?.note, note, track.id)
    })
    assert.equal(next, track.chart.length, track.id)
    assert.equal(run.advance(track.duration), 0, track.id)
    assert.equal(run.completion, 1, track.id)
    assert.equal(run.score, track.chart.length * 1000, track.id)
  }
})
