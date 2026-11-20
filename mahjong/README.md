# セブン麻雀

Seven-stage, two-player closed-hand arcade mahjong. Each stage plays all three rounds and advances when the sum of the player's three final point balances exceeds the rival's. Campaign progress stays in memory; shared TOP10 records are handled by the existing ranking service.

## 3Dの対局画面

対局が始まると、手前に自分の手牌、奥に相手の伏せ牌が並びます。牌を一度選んで「選んだ牌を打牌」を押すか、同じ牌をもう一度押して切ります。左右キーで選び、Enterでも打牌できます。小さい画面では卓の下にタップ用の手牌が並びます。「捨て牌を見る」では、相手と自分の河、横向きのリーチ宣言牌を拡大して確認できます。

卓は同梱の Three.js で描画します。ゲーム状態は従来のエンジンが管理し、対戦中に描画側へ渡すCPUの手牌は伏せています。WebGLが使えない場合や途中で描画コンテキストを失った場合は、同じ対局を平面の卓で続けられます。

## 2026-11-09：ご褒美のMP4動画対応

勝利時の3枠とステージ突破後の10枠に、静止画像とMP4を混在して登録できます。10件一括登録・個別差し替え・並べ替え・取り外しと、最後に「設定を保存する」操作は従来どおりです。対戦中のキャラクター画像は静止画像専用です。

MP4は1本25MB以下で、そのまま保存します。ブラウザーで再生しやすいH.264映像＋AAC音声を推奨します。静止画像の元ファイル20MB以下／保存時2MB以下への調整と、画像・動画を合わせた200件の保管上限は維持します。動画は自動再生せず、再生・一時停止・シーク・音量はプレイヤーで操作できます。ご褒美の切り替えや閲覧終了時には停止して読み込みを解放します。

設定のUUID参照は変更せず、公開APIの読み取り専用 `mediaTypes` で画像・動画を区別します。旧画像設定はそのまま利用できます。動画データの内容検証、所有者認証、同一オリジン制約、使用中素材の削除防止を維持し、動画配信はHTTP Rangeによる部分読み込みに対応します。

## 2026-11-08：3対局の合計点とステージ突破ギャラリー

途中で負けても3対局すべてをプレイし、各対局の終了時点の持ち点を合計して比較します。各対局は引き続き25,000点から開始。リーチ支払い・和了時のリーチ棒も含めた実際の持ち点を使い、ランキング用の獲得スコアとは別に表示します。1勝2敗でも合計で上回れば突破し、同点または下回った場合は同じステージを再挑戦できます。再挑戦時の得点破棄・減点は維持します。

1勝ごとの記念画像3枠は従来どおり。3対局終了後に合計点で突破すると、次ステージへ進む前に、その相手が敗北を認めてご褒美を案内する10枠の閲覧画面を開きます。前後ボタン、番号、左右キーに対応し、画像は縦横を問わず全体を表示。最終ステージもギャラリーを経由して完全クリアの記録へ進みます。未登録・読込失敗の枠は案内を出し、閲覧や進行を止めません。

ギャラリーを開くと、対戦相手からご褒美を案内する収録音声が流れます。

管理画面の「ステージ突破のご褒美10枚」に、ちょうど10枚をドラッグ＆ドロップするかファイル選択で登録します。ファイル名を自然な数字順で並べ、各画像をWebP・長辺1400px以下・2MB以下へ調整。10枚の準備後に順にアップロードし、すべて成功してから編集設定へ一括反映します。途中失敗時は従来の並びを維持。アップロード後は番号とプレビューで順序を確認でき、左右の入れ替え・個別差し替え・取り外しにも対応します。最後に「設定を保存する」で公開設定へ反映します。

各ステージに独立した `gallery: [null × 10]` を追加。旧設定を読み込んでも名前・対戦画像・勝利画像を維持し、追加枠だけを空にします。画像登録上限200枚、アップロード20回/分、元画像20MB/枚、保存画像2MB/枚。使用中・編集中の画像の削除防止、所有者認証、同一オリジン制約、設定バージョンの競合検出を維持します。ご褒美用の70枚は管理者が登録する枠であり、無関係な画像で自動補充しません。

検証：ゲーム・管理フロント95テスト、共有サービス65テストが成功。1勝2敗の突破、2勝1敗でも点差による失敗、同点、リーチ支払い、3対局継続、画像枠の対応、最終ステージのギャラリー、自然音声、10枚の順序・途中失敗時の保持、所有者権限・画像参照の整合性を確認しました。Windows Chromeの隔離した確認用データで、実際の画像10ファイルをブラウザーのドロップ処理へ渡して登録し、ファイル名順・並べ替え・保存と再読み込みを確認。確認用の対局結果で1勝2敗87,000対63,000点の突破、勝利画像、ご褒美10枚の閲覧、次ステージ、最終ステージから完全クリア記録への遷移を確認しました。390px相当の縦画面でも横はみ出しなく閲覧できます。拡張機能の制限のためネイティブのファイル選択とOSからの実ドラッグは未検証。iPhone Safari実機も未確認です。公開設定へ試験画像は登録していません。

## Characters and images

`cast.mjs` defines seven original adult characters, their roles, personalities, pre-battle dialogue, and three victory captions each. The default image slots are `assets/cast/<slug>/portrait.webp` and `win-1.webp` through `win-3.webp`.

The game first uses a registered portrait/reward image from the administration service. When a slot is unset, it uses the corresponding bundled image. A failed custom image gets one attempt at the bundled fallback before a clear placeholder appears. Administrator-supplied names remain intact; the old generic `ステージNの対戦相手` labels resolve to the original cast names.

The beginning of each battle shows an encounter dialog. First meetings have three lines; the second and third battles have their own shorter dialogue. A stage retry has a separate greeting. No round is created, no tiles are dealt, and no CPU timer runs until the player finishes or explicitly skips the conversation. Enter/Space on the buttons, right arrow, mouse and tap are supported. Reduced-motion preferences disable the entrance animation.

The administration copy of `cast.mjs` is served by the existing backend at `/mahjong-admin/cast.mjs`. Keep that copy aligned when changing profiles. Uploaded image IDs, API paths, and the existing `mahjong:arcade` ranking mode are unchanged.

## Validation

Run `node --test mahjong/*.test.mjs` from the repository root. In addition to the rules and campaign checks, `app-cast.test.mjs` executes the real app handlers with the real round/arcade engine and a small in-memory DOM. It verifies the encounter gate for all 21 battles, timer/input blocking, explicit skip, all victory-image mappings, and custom-image recovery. These checks complement browser QA; they do not emulate image decoding or layout.

Generated-image prompts and provenance are stored with the cast assets. The original source images are retained in the task workspace.

## Character voices

`app.mjs` selects the bundled MP3 by character and caption. `recorded-voice.mjs` plays it through Web Audio at its recorded speed. The 245 licensed VOICEVOX Nemo clips use six Japanese voices with seven sets of delivery settings. Each character has an alternate recorded greeting for administrator-assigned names. Exact generation settings and file hashes are in [assets/voices/](assets/voices/).

Encounter lines, all 21 victory captions, round starts, both players' public riichi declarations, CPU wins and draws can be spoken. Ordinary comments wait at least 12 seconds after another line. An idle human turn gets one gentle comment after 20 seconds. No concealed hand analysis is used for character remarks. Speech is optional and never controls turn progression or waits for playback to complete.

Voice on/off is available before starting, during encounters, and on victory images. The settings dialog includes per-character samples and voice volume. Replay is explicit; advancing a line, skipping, changing dialogs, ending, hiding or leaving the page cancels older speech. Preferences stay in localStorage under `tk777-seven-mahjong-voice`. The audio context starts only from a user gesture, before awaited work. MP3s download only when requested, with at most two pending downloads and a 24-clip decoded LRU cache. The game does not call an external synthesis service during play. Stopped or muted requests cannot revive when an old download finishes.

If a recording fails to load, the full caption and replay control stay available. If Web Audio is unavailable, the game presents the dialogue as text. The game advances independently of audio playback.
