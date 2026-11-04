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
