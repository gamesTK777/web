import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {runInNewContext} from 'node:vm';

const source = await readFile(new URL('./site-analytics.js', import.meta.url), 'utf8');
const host = 'https://gamestk777.github.io';
const visitorKey = 'tk777.analytics.visitor';
const optOutKey = 'tk777.analytics.optOut';

function listen(target) {
  const events = new Map();
  target.addEventListener = (name, callback) => events.set(name, callback);
  target.fire = (name, event) => events.get(name)?.(event);
  return target;
}

function fixture({
  page = 'mahjong', origin = host, pathname = '/web/mahjong/', state = new Map(),
  referrer = '', hidden = false, prerendering = false, now = Date.UTC(2026, 10, 21, 14, 59),
  browser = {}, legacyDnt, privacyControls = false, storageBlocked = false, byte = 123,
} = {}) {
  const requests = [];
  const button = listen({disabled: true});
  const message = {};
  const document = listen({
    referrer, hidden, prerendering,
    currentScript: {dataset: privacyControls ? {privacyControls: ''} : {page}},
    getElementById: id => id === 'measurement-toggle' ? button : message,
  });
  const window = listen({doNotTrack: legacyDnt});
  const storage = {
    getItem: key => state.get(key) ?? null,
    setItem: (key, value) => state.set(key, value),
    removeItem: key => state.delete(key),
  };
  class Clock extends Date {
    static now() { return now; }
  }
  let randomCalls = 0;
  runInNewContext(source, {
    document, window, location: {origin, pathname},
    navigator: {userAgent: 'Mozilla Windows Desktop', ...browser},
    get localStorage() {
      if (storageBlocked) throw new Error('Storage is blocked');
      return storage;
    },
    URL, Date: Clock,
    crypto: {getRandomValues: bytes => { randomCalls++; return bytes.fill(byte); }},
    fetch: (url, init) => { requests.push({url, init, payload: JSON.parse(init.body)}); return Promise.resolve(); },
  });
  return {requests, document, window, state, button, message, randomCalls: () => randomCalls};
}

test('only measurement categories and the daily random token leave the page', () => {
  const state = new Map();
  const first = fixture({
    state, referrer: 'https://www.google.co.jp/search?q=private-query',
    browser: {userAgent: 'Mozilla (iPhone; CPU iPhone OS) Mobile Private-UA'},
  });
  assert.equal(first.requests.length, 1);
  const [{url, init, payload}] = first.requests;
  const visitor = '7b'.repeat(16);
  assert.equal(url, 'https://tk777-neonshift-scores.takesuke.chatgpt.site/api/analytics/view');
  assert.deepEqual(payload, {page: 'mahjong', source: 'search', device: 'mobile', day: '2026-11-21', visitor});
  assert.equal(init.headers['Content-Type'], 'text/plain;charset=UTF-8');
  assert.equal(init.credentials, 'omit');
  assert.equal(init.referrerPolicy, 'no-referrer');
  assert.equal(init.keepalive, true);
  assert.equal(state.get(visitorKey), '2026-11-21:' + visitor);
  const second = fixture({
    state, page: 'uno', pathname: '/web/uno/', referrer: host + '/web/index.html?internal-secret',
    browser: {userAgent: 'Mozilla Macintosh', maxTouchPoints: 5}, byte: 124,
  });
  assert.deepEqual(second.requests[0].payload, {
    page: 'uno', source: 'internal', device: 'tablet', day: '2026-11-21', visitor,
  });
  assert.equal(second.randomCalls(), 0);
  const next = fixture({state, now: Date.UTC(2026, 10, 21, 15, 0), byte: 125});
  assert.equal(next.requests[0].payload.day, '2026-11-22');
  assert.equal(next.requests[0].payload.visitor, '7d'.repeat(16));
});

test('browser signals and the saved preference stop collection before generating an identifier', () => {
  for (const overrides of [
    {browser: {doNotTrack: '1'}},
    {browser: {globalPrivacyControl: true}},
    {legacyDnt: 'yes'},
    {state: new Map([[optOutKey, '1']])},
    {origin: 'http://127.0.0.1:3000'},
    {pathname: '/elsewhere/mahjong/'},
  ]) {
    const report = fixture(overrides);
    assert.equal(report.requests.length, 0);
    assert.equal(report.randomCalls(), 0);
  }
});

test('the privacy page can turn off measurement and clear the current token', () => {
  const state = new Map([[visitorKey, '2026-11-21:' + '00'.repeat(16)]]);
  const settings = fixture({state, pathname: '/web/privacy/', privacyControls: true});
  assert.equal(settings.button.disabled, false);
  assert.match(settings.message.textContent, /有効/);
  settings.button.fire('click');
  assert.equal(state.get(optOutKey), '1');
  assert.equal(state.has(visitorKey), false);
  assert.equal(fixture({state}).requests.length, 0);
  assert.equal(settings.requests.length, 0);
  settings.button.fire('click');
  assert.equal(state.has(optOutKey), false);
  assert.equal(fixture({state}).requests.length, 1);
});

test('hidden prerenders are recorded only on activation, and browser back navigation counts once', () => {
  const report = fixture({hidden: true, prerendering: true});
  report.document.hidden = false;
  report.document.fire('visibilitychange');
  assert.equal(report.requests.length, 0);
  report.document.prerendering = false;
  report.document.fire('prerenderingchange');
  report.document.fire('visibilitychange');
  report.window.fire('pageshow', {persisted: false});
  assert.equal(report.requests.length, 1);
  report.document.hidden = true;
  report.window.fire('pageshow', {persisted: true});
  assert.equal(report.requests.length, 1);
  report.document.hidden = false;
  report.document.fire('visibilitychange');
  report.document.fire('visibilitychange');
  assert.equal(report.requests.length, 2);
});

test('unavailable browser storage permits anonymous view totals, and the Vite source has its own page ID', () => {
  const report = fixture({storageBlocked: true, referrer: 'https://x.com/user/status/private', page: 'webcraft-play',
    pathname: '/web/webcraft777/index.html'});
  assert.deepEqual(report.requests[0].payload, {page: 'webcraft777', source: 'social', device: 'desktop', day: '2026-11-21'});
  assert.equal(report.randomCalls(), 0);
  const play = fixture({page: 'webcraft-play', pathname: '/web/webcraft777/play/'});
  assert.equal(play.requests[0].payload.page, 'webcraft-play');
});
