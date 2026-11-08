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

`voice.mjs` uses the browser's speech synthesis with Japanese voices available on the current device. `voice-lines.mjs` defines seven separate prosody presets and 147 short lines. Voices are selected using Japanese voice names and female-voice hints; the same installed voice can serve multiple characters with different pitch/rate settings. This is device speech, not seven prerecorded actors, and a regional accent cannot be guaranteed by the synthesis API.

Encounter lines, all 21 victory captions, round starts, both players' public riichi declarations, CPU wins and draws can be spoken. Ordinary comments wait at least 12 seconds after another line. An idle human turn gets one gentle comment after 20 seconds. No concealed hand analysis is used for character remarks. Speech is optional and never controls turn progression or waits for playback to complete.

Voice on/off is available before starting, during encounters, and on victory images. The settings dialog includes per-character samples and voice volume. Replay is explicit; advancing a line, skipping, changing dialogs, ending, hiding or leaving the page cancels older speech. Preferences stay in localStorage under `tk777-seven-mahjong-voice`. A silent user-gesture warmup and visible replay buttons support platforms that gate speech behind a tap. A failed or unavailable Japanese voice leaves the text/game usable.

References: [MDN SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis), [device voice availability](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices), and [WebKit's user-gesture restriction](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/speech/SpeechSynthesis.cpp).

Browser QA for this update used Windows Chrome at desktop and phone-sized viewports. Controls, samples, mute, zero-volume behavior, text fallback and conversation progression were checked. This verification environment exposed Japanese voices but completed native requests without a reliable start event; audible playback and voice quality were not confirmed. iPhone Safari was not tested. A long line that ends immediately without starting is surfaced as a playback problem with an explicit replay path, instead of being reported as successful speech.
