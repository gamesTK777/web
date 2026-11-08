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

## Character voices

`voice.mjs` selects bundled natural Japanese recordings for all 231 original character lines. `recorded-voice.mjs` plays them with Web Audio at playback rate 1, so the standard dialogue has the same voice quality across devices and does not depend on installed system voices. The recordings use Microsoft `ja-JP-NanamiNeural` with seven subtle generation-time delivery presets; they are one female base voice with character-specific delivery, not seven separately recorded actors. A regional accent cannot be guaranteed. Details, per-file hashes and generation settings are stored in `assets/voices/`.

Encounter lines, all 21 victory captions, round starts, both players' public riichi declarations, CPU wins and draws can be spoken. Ordinary comments wait at least 12 seconds after another line. An idle human turn gets one gentle comment after 20 seconds. No concealed hand analysis is used for character remarks. Speech is optional and never controls turn progression or waits for playback to complete.

Voice on/off is available before starting, during encounters, and on victory images. The settings dialog includes per-character samples and voice volume. Replay is explicit; advancing a line, skipping, changing dialogs, ending, hiding or leaving the page cancels older speech. Preferences stay in localStorage under `tk777-seven-mahjong-voice`. The audio context starts only from a user gesture, before awaited work. MP3s download only when requested, with at most two pending downloads and a 24-clip decoded LRU cache. The game does not call an external synthesis service during play. Stopped or muted requests cannot revive when an old download finishes.

Administrator-customized text that does not match a bundled line retains device Japanese speech as a fallback. Standard recording errors keep the full caption and expose explicit replay; they never silently substitute a different device voice. Speech remains optional and cannot block game progression.

Validation for the natural-recording update: all 75 mahjong tests passed, including 12 recorded-audio checks for the 231-line manifest, user-gesture gating, duplicate requests, forced replay, bounded caching, source replacement, late callbacks, cancellation, media errors and custom-text fallback. All 231 MP3s match their provenance hashes and decode completely with ffmpeg; duration is 2.232–9.936 seconds, total 7,380,432 bytes. Seven representative character samples were decoded to nonzero PCM waveforms. Browser playback/layout checks are performed separately; this file does not claim a subjective listening-quality or iPhone hardware assessment from automated decoding.
