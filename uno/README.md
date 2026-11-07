# UNO — COLOR CIRCUIT

Buildless browser game. Open `index.html` through an HTTP server.

- Solo: 1 human and 1–5 CPU players. No server required.
- Online: 2–6 human players, one device/browser per player. Room code or invite link; no account required.
- The shared server owns the deck, every hand, shuffle, legal moves, and turn order. Each authenticated response includes only that player's hand and opponents' card counts.
- A 256-bit seat token stays in localStorage and travels in the Authorization header. It is not part of invite links or public snapshots.
- Polling uses room versions. Actions use version checks and unique IDs to prevent stale or duplicate moves.
- A turn lasts 60 seconds before automatic draw/pass. Explicit departure transfers the seat to CPU. Refreshing the same browser restores the seat. Idle rooms expire two hours after their last game/membership action.

The rules use the classic 108-card deck, seven-card deal, no draw-card stacking, and a server-enforced Wild Draw Four restriction. This version applies a two-card penalty immediately when a play leaves one card without UNO declaration; there is no challenge/reaction race. The first player to empty their hand wins one round.

## Maintenance

`engine.mjs` is the canonical rules module. The deployed server keeps an identical copy in `C:\files\AI\TK777\leaderboard-service\lib\uno-engine.mjs`; update both together. The server Site is `appgprj_6ae4267ae9ac81918f8a81ba5718301d` and the API prefix is `https://tk777-neonshift-scores.takesuke.chatgpt.site/api/uno`. Its source contains D1 schema migrations, authenticated room routes, and API tests. Deploy the server with the Sites workflow before publishing clients that depend on changed APIs.

Run `node --test uno/engine.test.mjs` from the web repository. The service tests are `node --test lib/uno-service.test.mjs` and `node lib/uno-http.integration.mjs`; the latter defaults to the local server and accepts `UNO_TEST_BASE` for a production smoke test.

## Turn and UNO feedback

- With two cards on your turn, UNO shows an explicit unselected/selected label, checkmark, and next-action explanation. Tapping again cancels selection. Choosing a wild color also shows the declaration state.
- The current player is marked in the roster. A persistent message beside your hand and a highlighted table banner identify your turn. Arrival pulses once per new turn; polling and a playable draw do not repeat it. Reduced-motion preferences suppress the pulse.
- Sending/reconnecting states remain visible and block card/UNO input consistently, including keyboard shortcuts. The rules, online API, and two-card penalty are unchanged.
- Run `node --test uno/*.test.mjs` for rules and UI integration checks. The UI tests execute the actual app handlers against the actual rules engine with an in-memory DOM and mocked networking; they do not replace browser QA.
- Verified in desktop Chrome at normal, narrow portrait, and landscape sizes. iPhone Safari and a live multi-device online match were not tested in this update.
