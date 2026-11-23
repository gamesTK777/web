const production = 'https://tk777-neonshift-scores.takesuke.chatgpt.site'
const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)
const api = loopback ? location.origin : production
const nicknameKey = 'tk777-arcade-nickname'
const modeFor = track => `webmix777:${track.id}`
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

async function request(path, data, controller = new AbortController()) {
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(api + '/api/games/' + path, {
      method: data ? 'POST' : 'GET',
      headers: data ? {'Content-Type': 'application/json'} : undefined,
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store', credentials: 'omit', signal: controller.signal,
    })
    const result = await response.json().catch(() => null)
    if (!response.ok || !result) {
      throw new Error(typeof result?.error === 'string' ? result.error : 'ランキングに接続できませんでした。')
    }
    return result
  } finally { clearTimeout(timeout) }
}

export class SongRanking {
  #track
  #run
  #loading
  #ownRecords = new Set()

  constructor() {
    const element = id => document.getElementById(id)
    this.trackName = element('ranking-track')
    this.entries = element('ranking-entries')
    this.status = element('ranking-status')
    this.refresh = element('ranking-retry')
    this.form = element('ranking-form')
    this.nickname = element('ranking-nickname')
    this.submit = element('ranking-submit')
    this.submitStatus = element('ranking-submit-status')
    this.refresh.addEventListener('click', () => { void this.load() })
    this.form.addEventListener('submit', event => { event.preventDefault(); void this.save() })
    this.nickname.addEventListener('input', () => this.nickname.setCustomValidity(''))
  }

  select(track) {
    this.#track = track
    this.#run = undefined
    this.form.hidden = true
    this.trackName.textContent = track.title
    void this.load()
  }

  async load() {
    const track = this.#track
    if (!track) return
    this.#loading?.abort()
    const loading = new AbortController()
    this.#loading = loading
    this.status.textContent = '読み込み中…'
    this.entries.replaceChildren()
    this.refresh.disabled = true
    this.refresh.hidden = true
    try {
      const mode = modeFor(track)
      const reply = await request('scores?mode=' + encodeURIComponent(mode), undefined, loading)
      if (this.#loading !== loading) return
      if (reply.mode !== mode || !Array.isArray(reply.entries)) throw new Error('Invalid leaderboard')
      const records = reply.entries.filter(entry => typeof entry?.nickname === 'string' &&
        Number.isSafeInteger(entry.score) && entry.score >= 0 && entry.score <= track.chart.length * 1000).slice(0, 10)
      for (const entry of records) {
        const row = document.createElement('li')
        if (this.#ownRecords.has(entry.id)) row.dataset.mine = ''
        const name = document.createElement('span')
        const score = document.createElement('strong')
        name.textContent = entry.nickname
        score.className = 'ranking-score'
        score.textContent = entry.score.toLocaleString('ja-JP')
        row.append(name, score)
        this.entries.append(row)
      }
      this.status.textContent = records.length ? '' : 'まだ記録がありません。'
    } catch {
      if (this.#loading === loading) this.status.textContent = 'ランキングを読み込めませんでした。'
    } finally {
      if (this.#loading === loading) {
        this.#loading = undefined
        this.refresh.disabled = false
        this.refresh.hidden = false
      }
    }
  }

  begin(manual) {
    this.#run = undefined
    this.form.hidden = true
    if (!manual) return
    const mode = modeFor(this.#track)
    this.#run = {
      track: this.#track,
      session: request('session', {mode, playMode: 'manual'})
        .then(reply => typeof reply.id === 'string' && uuid.test(reply.id) ? reply.id : null)
        .catch(() => null),
    }
  }

  async offer(score) {
    void this.load()
    const run = this.#run
    if (!run) return
    run.score = score
    this.nickname.setCustomValidity('')
    try { this.nickname.value = (localStorage.getItem(nicknameKey) || '').slice(0, 16) }
    catch { this.nickname.value = '' }
    this.submit.textContent = 'ランキングに登録'
    this.submit.disabled = true
    this.submitStatus.textContent = '演奏の登録受付を確認中…'
    this.form.hidden = false
    run.id = await run.session
    if (this.#run !== run) return
    this.submit.disabled = !run.id
    this.submitStatus.textContent = run.id ? '' :
      '演奏開始時に接続できませんでした。通信を確認してから、もう一度演奏してください。'
  }

  async save() {
    const run = this.#run
    if (!run?.id || !Number.isSafeInteger(run.score) || this.submit.disabled || this.form.hidden) return
    const nickname = this.nickname.value.normalize('NFKC').replace(/[\p{Cc}\p{Cf}]/gu, '').trim()
    if (!nickname || [...nickname].length > 16) {
      this.nickname.setCustomValidity('ニックネームを1〜16文字で入力してください。')
      this.nickname.reportValidity()
      return
    }
    this.submit.disabled = true
    this.submitStatus.textContent = '登録中…'
    try {
      const result = await request('scores', {id: run.id, mode: modeFor(run.track), playMode: 'manual', nickname,
        score: run.score, duration: Math.round(run.track.duration * 1000)})
      if (result.id !== run.id || result.saved !== true) throw new Error('保存を確認できませんでした。')
      this.#ownRecords.add(run.id)
      try { localStorage.setItem(nicknameKey, nickname) } catch { /* A new name can be entered next time. */ }
      if (this.#run === run) {
        this.submit.textContent = '登録済み'
        this.submitStatus.textContent = '登録しました。上位10件に入るとランキングに表示されます。'
      }
      if (this.#track === run.track) void this.load()
    } catch (error) {
      if (this.#run === run) {
        this.submit.disabled = false
        this.submitStatus.textContent = error instanceof Error && error.name !== 'AbortError' && error.name !== 'TypeError' ?
          error.message : '登録できませんでした。通信を確認して、もう一度お試しください。'
      }
    }
  }
}
