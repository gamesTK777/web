import {Music, TRACKS} from './music.mjs'
import {Performance, visitThrough, windows} from './judgement.mjs'

const byId = id => document.getElementById(id)
const game = byId('game')
const highway = byId('note-highway')
const field = highway.querySelector('.note-field')
const hitLine = highway.querySelector('.hit-line')
const keys = [...document.querySelectorAll('.lane-key')]
const keyCodes = ['KeyF', 'KeyG', 'KeyJ', 'KeyK']
const laneByCode = new Map(keyCodes.map((code, lane) => [code, lane]))
const music = new Music()
const activeNotes = new Map()
const trackButtons = new Map()
const keyboard = new Set()
const pointers = new Map()
const keyFlashes = Array(keys.length).fill(0)
const flightTime = 1.84
const countIn = 2.45
const autoLookahead = .18
const scoreKey = id => `tk777.webmix.${id}.best.v1`
const volumeKey = 'tk777.webmix.volume'
let track = TRACKS[0]
let play = new Performance(track.chart)
let mode = 'manual'
let starting = false
let nextAutoSound = 0
let nextAutoDisplay = 0
let startAt = 0
let raf = 0
let hitY = 0
let judgementUntil = 0
let settlingPause = null
let best = savedNumber(scoreKey(track.id), 0, track.chart.length * 1000)

const playing = () => game.dataset.phase === 'playing' || game.dataset.phase === 'countdown'
const padded = n => String(n).padStart(6, '0')

function savedNumber(key, fallback, max) {
  try {
    const value = localStorage.getItem(key)
    if (value !== null && /^\d+$/.test(value) && Number(value) <= max) return Number(value)
  } catch { /* Storage may be unavailable in private or embedded browsers. */ }
  return fallback
}

function saveNumber(key, value) {
  try { localStorage.setItem(key, String(value)) } catch { /* Play remains available. */ }
}

function setText(node, value) {
  if (node.textContent !== value) node.textContent = value
}

function timeLabel(seconds) {
  const time = Math.max(0, Math.floor(seconds))
  return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`
}

function setPhase(phase) {
  game.dataset.phase = phase
  byId('ready').hidden = phase !== 'ready'
  byId('paused').hidden = phase !== 'paused'
  byId('results').hidden = phase !== 'result'
  byId('pause').hidden = phase !== 'countdown' && phase !== 'playing'
  byId('countdown').hidden = phase !== 'countdown'
  updateAvailability()
}

function updateAvailability() {
  const canChoose = !starting && ['ready','result'].includes(game.dataset.phase)
  for (const button of trackButtons.values()) button.disabled = !canChoose
  for (const id of ['start','auto-start','restart']) byId(id).disabled = starting
}

function setMode(next) {
  mode = next
  game.dataset.mode = mode
  setText(byId('mode-label'), mode === 'auto' ? 'AUTO' : '4 KEY')
  keys.forEach(key => { key.disabled = mode === 'auto' })
}

function heardTime(at = performance.now()) {
  const context = music.context
  const now = performance.now()
  const stamp = context.getOutputTimestamp?.()
  if (stamp?.performanceTime > 0 && Number.isFinite(stamp.contextTime) && Math.abs(now - stamp.performanceTime) < 250) {
    return Math.min(context.currentTime, Math.max(0, stamp.contextTime + (at - stamp.performanceTime) / 1000))
  }
  const latency = Math.min(.18, Math.max(0, (context.outputLatency || 0) + (context.baseLatency || 0)))
  return Math.max(0, context.currentTime - latency + (at - now) / 1000)
}

function sizeHighway() { hitY = hitLine.offsetTop + 1 }

function clearNotes() {
  activeNotes.clear()
  field.replaceChildren()
  judgementUntil = 0
  byId('judgement').textContent = ''
  keyFlashes.fill(0)
  keys.forEach(key => key.removeAttribute('data-hit'))
}

function resetKeys() {
  keyboard.clear()
  const captured = [...pointers]
  pointers.clear()
  for (const [pointer, lane] of captured) {
    if (keys[lane].hasPointerCapture?.(pointer)) keys[lane].releasePointerCapture(pointer)
  }
  keys.forEach(key => key.removeAttribute('data-held'))
}

function updateKey(lane) {
  keys[lane].toggleAttribute('data-held', keyboard.has(lane) || [...pointers.values()].includes(lane))
}

function updateScore() {
  setText(byId('mix-score'), padded(play.score))
  setText(byId('best-score'), padded(best))
  setText(byId('mix-completion'), `${Math.round(play.completion * 100)}%`)
  setText(byId('mix-combo'), String(play.combo))
  setText(byId('notes-played'), `${play.hits} / ${track.chart.length} ノーツ`)
  byId('completion-meter').value = play.completion
}

function flash(quality) {
  const label = byId('judgement')
  label.dataset.result = quality
  label.textContent = quality.toUpperCase()
  judgementUntil = performance.now() + 420
}

function showError(node, error) {
  node.textContent = error instanceof Error && error.message.startsWith('このブラウザー') ? error.message :
    '音声を有効にできませんでした。もう一度ボタンを押してください。'
  node.hidden = false
}

async function start(nextMode) {
  if (starting || (game.dataset.phase !== 'ready' && game.dataset.phase !== 'result')) return
  starting = true
  updateAvailability()
  const error = byId('audio-error')
  error.hidden = true
  try {
    if (settlingPause) { await settlingPause; settlingPause = null }
    const context = await music.unlock()
    if (context.state !== 'running') throw new Error('Audio unavailable')
    cancelAnimationFrame(raf)
    resetKeys()
    clearNotes()
    setMode(nextMode)
    play = new Performance(track.chart)
    nextAutoSound = nextAutoDisplay = 0
    startAt = context.currentTime + countIn
    music.start(startAt, track)
    updateScore()
    byId('song-progress').value = 0
    setText(byId('song-time'), '0:00')
    setPhase('countdown')
    sizeHighway()
    highway.focus({preventScroll: true})
    raf = requestAnimationFrame(frame)
    if (document.hidden) pause()
  } catch (cause) {
    music.stop()
    setMode('manual')
    setPhase('ready')
    showError(error, cause)
    byId('start').focus({preventScroll: true})
  } finally {
    starting = false
    updateAvailability()
  }
}

function pause() {
  if (!playing()) return
  setPhase('paused')
  cancelAnimationFrame(raf)
  resetKeys()
  byId('resume-error').hidden = true
  settlingPause = music.context.suspend().catch(() => {})
  byId('resume').focus({preventScroll: true})
}

async function resume() {
  const button = byId('resume')
  const error = byId('resume-error')
  if (button.disabled || game.dataset.phase !== 'paused') return
  button.disabled = true
  error.hidden = true
  try {
    if (settlingPause) { await settlingPause; settlingPause = null }
    const context = await music.unlock()
    if (context.state !== 'running') throw new Error('Audio unavailable')
    if (game.dataset.phase !== 'paused') return
    setPhase(heardTime() >= startAt ? 'playing' : 'countdown')
    highway.focus({preventScroll: true})
    raf = requestAnimationFrame(frame)
    if (document.hidden) pause()
  } catch (cause) {
    if (game.dataset.phase === 'paused') showError(error, cause)
  } finally { button.disabled = false }
}

function stop() {
  cancelAnimationFrame(raf)
  resetKeys()
  clearNotes()
  music.stop()
}

function finish() {
  stop()
  play.advance(track.duration + windows.good)
  if (mode === 'manual' && play.score > best) {
    best = play.score
    saveNumber(scoreKey(track.id), best)
  }
  updateScore()
  setText(byId('result-title'), mode === 'auto' ? '自動演奏の結果' : '演奏結果')
  setText(byId('restart-label'), mode === 'auto' ? 'もう一度自動演奏' : 'もう一度演奏')
  setText(byId('result-score'), padded(play.score))
  setText(byId('result-summary'), `メロディー ${play.hits} / ${track.chart.length} 音 · 最大コンボ ${play.maxCombo}`)
  for (const [quality, count] of Object.entries(play.counts)) setText(byId(`result-${quality}`), String(count))
  setPhase('result')
  byId('result-title').focus({preventScroll: true})
}

function drawNotes(time) {
  for (const [index, note] of activeNotes) {
    if (play.results[index]) {
      activeNotes.delete(index)
      note.remove()
    }
  }
  for (let index = play.firstPending; index < track.chart.length; index++) {
    const note = track.chart[index]
    const remaining = note.time - time
    if (remaining > flightTime) break
    if (play.results[index]) continue
    let element = activeNotes.get(index)
    if (!element) {
      element = document.createElement('div')
      element.className = 'note'
      element.dataset.lane = note.lane
      element.style.setProperty('--lane', note.lane)
      field.append(element)
      activeNotes.set(index, element)
    }
    const y = hitY * (1 - remaining / flightTime) - 5
    element.style.transform = `translate3d(0, ${y}px, 0)`
    element.toggleAttribute('data-late', remaining < -.05)
  }
}

function flashKey(lane, now) {
  keys[lane].setAttribute('data-hit', '')
  keyFlashes[lane] = now + 120
}

function playAutomatically(heard, raw, now) {
  // Queue sounds on the audio clock, then show each judged note when it is heard.
  nextAutoSound = visitThrough(track.chart, nextAutoSound, raw + autoLookahead, note => {
    music.hit(note, startAt + note.time)
  })
  const before = nextAutoDisplay
  nextAutoDisplay = visitThrough(track.chart, nextAutoDisplay, heard, note => {
    play.strike(note.lane, note.time)
    flashKey(note.lane, now)
  })
  if (nextAutoDisplay !== before) { flash('perfect'); updateScore() }
}

function frame(now) {
  if (!playing()) return
  const context = music.context
  if (context.state !== 'running') { pause(); return }
  const time = heardTime(now) - startAt
  const raw = context.currentTime - startAt
  music.update(raw)
  if (mode === 'auto') playAutomatically(time, raw, now)
  if (time >= track.duration) {
    byId('song-progress').value = 1
    setText(byId('song-time'), timeLabel(Math.round(track.duration)))
    finish()
    return
  }
  if (time >= 0 && game.dataset.phase === 'countdown') setPhase('playing')
  if (time < 0) setText(byId('countdown'), String(Math.ceil(-time)))
  if (judgementUntil && now >= judgementUntil) {
    byId('judgement').textContent = ''
    judgementUntil = 0
  }
  for (const [lane, expires] of keyFlashes.entries()) {
    if (expires && now >= expires) {
      keyFlashes[lane] = 0
      keys[lane].removeAttribute('data-hit')
    }
  }
  if (play.advance(time)) { flash('miss'); updateScore() }
  drawNotes(time)
  byId('song-progress').value = Math.max(0, time / track.duration)
  setText(byId('song-time'), timeLabel(time))
  raf = requestAnimationFrame(frame)
}

function strike(lane, event) {
  if (mode !== 'manual' || game.dataset.phase !== 'playing' || music.context.state !== 'running') return
  const now = performance.now()
  const stamp = Number.isFinite(event.timeStamp) && Math.abs(now - event.timeStamp) < 200 ? event.timeStamp : now
  const time = heardTime(stamp) - startAt
  if (play.advance(time)) { flash('miss'); updateScore() }
  const hit = play.strike(lane, time)
  if (!hit) return
  music.hit(hit.note, music.context.currentTime + .004)
  flashKey(lane, now)
  flash(hit.quality)
  updateScore()
}

window.addEventListener('keydown', event => {
  if (event.code === 'Escape' && playing()) { event.preventDefault(); pause(); return }
  const lane = laneByCode.get(event.code)
  if (lane === undefined || mode !== 'manual' || !playing() || event.metaKey || event.ctrlKey || event.altKey ||
      (event.target instanceof Element && event.target.closest('button,input,a'))) return
  event.preventDefault()
  if (event.repeat || keyboard.has(lane)) return
  keyboard.add(lane)
  updateKey(lane)
  strike(lane, event)
})

window.addEventListener('keyup', event => {
  const lane = laneByCode.get(event.code)
  if (lane !== undefined && keyboard.delete(lane)) updateKey(lane)
})

function releasePointer(event) {
  const lane = pointers.get(event.pointerId)
  if (lane === undefined) return
  pointers.delete(event.pointerId)
  updateKey(lane)
}

keys.forEach((key, lane) => {
  key.addEventListener('pointerdown', event => {
    if (mode !== 'manual' || !playing() || event.button !== 0 || pointers.has(event.pointerId)) return
    event.preventDefault()
    pointers.set(event.pointerId, lane)
    key.setPointerCapture?.(event.pointerId)
    updateKey(lane)
    strike(lane, event)
  })
  key.addEventListener('lostpointercapture', releasePointer)
  // Keyboard and assistive activation of a focused button has no pointer event.
  key.addEventListener('click', event => { if (event.detail === 0) strike(lane, event) })
})
window.addEventListener('pointerup', releasePointer)
window.addEventListener('pointercancel', releasePointer)
window.addEventListener('blur', resetKeys)
document.addEventListener('visibilitychange', () => { if (document.hidden) pause() })
window.addEventListener('pagehide', () => { if (playing()) pause() })

byId('start').addEventListener('click', () => { void start('manual') })
byId('auto-start').addEventListener('click', () => { void start('auto') })
byId('restart').addEventListener('click', () => { void start(mode) })
byId('pause').addEventListener('click', pause)
byId('resume').addEventListener('click', () => { void resume() })
function showTrack(nextTrack) {
  if (starting) return
  stop()
  track = nextTrack
  game.dataset.track = track.id
  setMode('manual')
  play = new Performance(track.chart)
  best = savedNumber(scoreKey(track.id), 0, track.chart.length * 1000)
  for (const [id, button] of trackButtons) button.setAttribute('aria-pressed', String(id === track.id))
  byId('track-art').src = track.art
  setText(byId('track-title'), track.title)
  setText(byId('track-genre'), track.genre)
  setText(byId('track-bpm'), String(track.bpm))
  setText(byId('track-length'), timeLabel(Math.round(track.duration)))
  byId('song-progress').value = 0
  setText(byId('song-time'), '0:00')
  byId('audio-error').hidden = true
  updateScore()
  setPhase('ready')
}

function returnToTracks() {
  showTrack(track)
  byId('start').focus({preventScroll: true})
}

byId('quit').addEventListener('click', returnToTracks)
byId('result-back').addEventListener('click', returnToTracks)

for (const entry of TRACKS) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'track-choice'
  button.dataset.track = entry.id
  const cover = new Image(36,36)
  cover.src = entry.art
  cover.alt = ''
  const caption = document.createElement('span')
  const title = document.createElement('strong')
  title.textContent = entry.title
  const meta = document.createElement('small')
  meta.textContent = `${entry.genre} · ${entry.bpm} BPM`
  caption.append(title, meta)
  const length = document.createElement('time')
  const seconds = Math.round(entry.duration)
  length.dateTime = `PT${seconds}S`
  length.textContent = timeLabel(seconds)
  button.append(cover, caption, length)
  button.addEventListener('click', () => showTrack(entry))
  trackButtons.set(entry.id, button)
  byId('track-picker').append(button)
}

const volume = byId('volume')
volume.value = savedNumber(volumeKey, 75, 100)
music.setVolume(Number(volume.value) / 100)
volume.addEventListener('input', () => {
  const value = Number(volume.value)
  music.setVolume(value / 100)
  saveNumber(volumeKey, value)
})
window.addEventListener('resize', sizeHighway)
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(sizeHighway).observe(highway)
showTrack(track)
