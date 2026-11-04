# PAIR GARDEN / ペアガーデン

Two-player local memory game. Serve the repository over HTTP and open `memory/index.html`.

`engine.mjs` owns immutable game rules, `controller.mjs` owns a single guarded pair-resolution timer, and `app.mjs` owns DOM rendering and sound. The controller resolves a pair and permits further input before invoking cosmetic callbacks. Visual transitions, audio completion, and particle effects never unlock the game.

Cards are flat native buttons. Hidden faces use explicit `hidden` attributes; no backface-visibility, nested3D transforms, global touch/click suppression, or full-screen match celebrations are used. Matched cards alone become disabled. A finished game deliberately opens the result dialog.

The board fits the available viewport; settings and help are inside a dialog. Resizing or rotating adjusts columns without replacing the current game. Visibility/page/focus recovery and every selection flush overdue pair resolution. Reset invalidates every old timer and DOM selection through a generation number.

Tests: `node --test memory/engine.test.mjs memory/controller.test.mjs`.

Browser acceptance: in each6/10/18-pair mode, match two cards, select a third while the match feedback is visible, then complete the board. Also check mismatches, rapid third taps, reset during resolution, modal settings, background recovery, keyboard arrows/Enter, and narrow portrait/landscape layouts. Browser-size tests do not replace actual iPhoneSafari device testing.
