# セブン麻雀

Seven-stage, two-player closed-hand arcade mahjong. Each stage requires three wins. Campaign progress stays in memory; shared TOP10 records are handled by the existing ranking service.

## Characters and images

`cast.mjs` defines seven original adult characters, their roles, personalities, pre-battle dialogue, and three victory captions each. The default image slots are `assets/cast/<slug>/portrait.webp` and `win-1.webp` through `win-3.webp`.

The game first uses a registered portrait/reward image from the administration service. When a slot is unset, it uses the corresponding bundled image. A failed custom image gets one attempt at the bundled fallback before a clear placeholder appears. Administrator-supplied names remain intact; the old generic `ステージNの対戦相手` labels resolve to the original cast names.

The beginning of each battle shows an encounter dialog. First meetings have three lines; the second and third battles have their own shorter dialogue. A stage retry has a separate greeting. No round is created, no tiles are dealt, and no CPU timer runs until the player finishes or explicitly skips the conversation. Enter/Space on the buttons, right arrow, mouse and tap are supported. Reduced-motion preferences disable the entrance animation.

The administration copy of `cast.mjs` is served by the existing backend at `/mahjong-admin/cast.mjs`. Keep that copy aligned when changing profiles. Uploaded image IDs, API paths, and the existing `mahjong:arcade` ranking mode are unchanged.

## Validation

Run `node --test mahjong/*.test.mjs` from the repository root. In addition to the rules and campaign checks, `app-cast.test.mjs` executes the real app handlers with the real round/arcade engine and a small in-memory DOM. It verifies the encounter gate for all 21 battles, timer/input blocking, explicit skip, all victory-image mappings, and custom-image recovery. These checks complement browser QA; they do not emulate image decoding or layout.

Generated-image prompts and provenance are stored with the cast assets. The original source images are retained in the task workspace.
