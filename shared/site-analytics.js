(() => {
  'use strict';

  const origin = 'https://gamestk777.github.io';
  const endpoint = 'https://tk777-neonshift-scores.takesuke.chatgpt.site/api/analytics/view';
  const optOutKey = 'tk777.analytics.optOut';
  const visitorKey = 'tk777.analytics.visitor';
  const tokenPattern = /^[0-9a-f]{32}$/;
  const script = document.currentScript;

  function browserOptedOut() {
    return navigator.globalPrivacyControl === true ||
      [navigator.doNotTrack, window.doNotTrack].some(value => value === '1' || value === 'yes');
  }

  function configurePrivacy() {
    const button = document.getElementById('measurement-toggle');
    const status = document.getElementById('measurement-status');
    if (!button || !status) return;

    function show() {
      try {
        const off = localStorage.getItem(optOutKey) === '1';
        button.disabled = false;
        button.textContent = off ? 'サイトの計測停止を解除する' : 'このブラウザーの計測を停止する';
        status.textContent = browserOptedOut() ? 'ブラウザーがトラッキングを拒否しています。閲覧は計測されません。' :
          off ? 'このブラウザーでは閲覧の計測を停止しています。' : 'このブラウザーでは閲覧の計測が有効です。';
      } catch {
        unavailable();
      }
    }

    function unavailable() {
      button.disabled = true;
      status.textContent = 'このブラウザーではサイトの設定を保存できません。計測を停止するには、ブラウザーのトラッキング拒否設定をご利用ください。';
    }

    button.addEventListener('click', () => {
      try {
        if (localStorage.getItem(optOutKey) === '1') {
          localStorage.removeItem(optOutKey);
        } else {
          localStorage.setItem(optOutKey, '1');
          localStorage.removeItem(visitorKey);
        }
        show();
      } catch {
        unavailable();
      }
    });
    window.addEventListener('storage', event => {
      if (event.key === optOutKey || event.key === null) show();
    });
    show();
  }

  if (script?.dataset.privacyControls !== undefined) {
    configurePrivacy();
    return;
  }

  if (location.origin !== origin || !/^\/web(?:\/|$)/.test(location.pathname)) return;
  const page = script?.dataset.page;
  if (!page || !/^[a-z0-9-]{1,24}$/.test(page)) return;
  // Vite preserves the data-page from its source entry in the built play entry.
  const pageId = page === 'webcraft-play' && /^\/web\/webcraft777(?:\/(?:index\.html)?)?$/.test(location.pathname)
    ? 'webcraft777' : page;

  function visitorFor(day) {
    try {
      const [storedDay, storedToken] = (localStorage.getItem(visitorKey) || '').split(':');
      if (storedDay === day && tokenPattern.test(storedToken)) return storedToken;
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      const visitor = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
      localStorage.setItem(visitorKey, day + ':' + visitor);
      return visitor;
    } catch {
      return undefined;
    }
  }

  function referrerSource() {
    if (!document.referrer) return 'direct';
    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin === origin) return 'internal';
      const host = referrer.hostname;
      const matches = domains => domains.some(domain => host === domain || host.endsWith('.' + domain));
      if (/(?:^|\.)google\.[a-z]{2,3}(?:\.[a-z]{2})?$/.test(host) ||
        matches(['bing.com', 'yahoo.com', 'yahoo.co.jp', 'duckduckgo.com', 'search.brave.com', 'ecosia.org', 'baidu.com', 'yandex.com'])) return 'search';
      if (matches(['x.com', 'twitter.com', 't.co', 'youtube.com', 'youtu.be', 'facebook.com', 'fb.com', 'instagram.com',
        'tiktok.com', 'reddit.com', 'discord.com', 'discord.gg', 'line.me', 'bsky.app', 'threads.net'])) return 'social';
    } catch {
      // No external URL is included in the event.
    }
    return 'other';
  }

  function deviceCategory() {
    const ua = navigator.userAgent;
    if (/iPad|Tablet|Kindle|Silk/i.test(ua) ||
      (/Android/i.test(ua) && !/Mobile/i.test(ua)) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'tablet';
    if (navigator.userAgentData?.mobile === true || /iPhone|iPod|Mobile/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  function recordView() {
    if (browserOptedOut()) return;
    try {
      if (localStorage.getItem(optOutKey) === '1') return;
    } catch {
      // A view can still be counted without a visitor token.
    }

    const day = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const visitor = visitorFor(day);
    const data = { page: pageId, source: referrerSource(), device: deviceCategory(), day, visitor };
    try {
      void fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Analytics is independent of gameplay.
    }
  }

  let pending = true;
  function recordWhenVisible() {
    if (!pending || document.hidden || document.prerendering) return;
    pending = false;
    recordView();
  }

  document.addEventListener('visibilitychange', recordWhenVisible);
  document.addEventListener('prerenderingchange', recordWhenVisible);
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    pending = true;
    recordWhenVisible();
  });
  recordWhenVisible();
})();
