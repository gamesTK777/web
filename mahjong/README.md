# セブン麻雀

Seven-stage, two-player closed-hand arcade mahjong. Each stage plays all three rounds and advances when the sum of the player's three final point balances exceeds the rival's. Campaign progress stays in memory; shared TOP10 records are handled by the existing ranking service.

## 3Dの対局画面

対局が始まると、手前に自分の手牌、奥に相手の伏せ牌が並びます。牌を一度選んで「選んだ牌を打牌」を押すか、同じ牌をもう一度押して切ります。左右キーで選び、Enterでも打牌できます。小さい画面では卓の下にタップ用の手牌が並びます。「捨て牌を拡大」では、相手と自分の河、横向きのリーチ宣言牌を拡大して確認できます。

卓は同梱の Three.js で描画します。ゲーム状態は従来のエンジンが管理し、対戦中に描画側へ渡すCPUの手牌は伏せています。WebGLが使えない場合や途中で描画コンテキストを失った場合は、同じ対局を平面の卓で続けられます。

## 暗槓

操作欄の「カン」は常に表示され、自分の手番で暗槓できるときに押せます。カンできる組が複数あるときは、宣言する牌を選びます。4枚が手牌の横に並び、嶺上牌を1枚引いて同じ手番を続けます。カンのたびにドラ表示牌が1枚増えます。リーチ後に宣言できるのは、引いた牌が4枚目で、元の待ち方が変わらないときです。

## ステージ突破とご褒美動画

各ステージで3対局を行います。各局終了時の持ち点を合計し、相手より高い場合に突破します。リーチの支払いなども含めた実際の持ち点で判定します。1勝2敗でも合計で上回れば突破でき、同点または下回った場合は再挑戦できます。

突破すると、そのステージに登録されたMP4を1本、自動で消音再生します。動画の操作で音を出したり、一時停止したりできます。自動再生を制限する環境では「動画を再生する」から始めます。動画の途中でも「次のステージへ」「対局結果を見る」を選べます。未登録の場合は対局結果を表示し、最終ステージ突破後は完全クリアの記録へ進めます。

所有者は[管理画面](https://tk777-neonshift-scores.takesuke.chatgpt.site/mahjong-admin/)でステージを選び、「ステージ突破のご褒美動画」でMP4を1本アップロードするか、登録済みのMP4を選択します。「設定を保存する」で公開されます。上限は25MBで、H.264映像とAAC音声を推奨します。

現在のメディアAPIでは、各ステージの `gallery[0]` と `mediaTypes` の `video/mp4` を照合します。旧先頭枠の画像と差し替える際は空き枠があれば関連付けを移し、画像ファイルは素材一覧に保管します。後続の旧ギャラリー枠や勝利ごとの旧素材はゲームから参照しません。

## Characters and images

`cast.mjs` defines seven original adult characters, their roles, personalities, and pre-battle dialogue. The default rival portrait is `assets/cast/<slug>/portrait.webp`.

The game first uses a registered portrait from the administration service. When a portrait is unset, it uses the bundled image. A failed custom image gets one attempt at the bundled fallback before a clear placeholder appears. Administrator-supplied names remain intact; the old generic `ステージNの対戦相手` labels resolve to the original cast names.

The beginning of each battle shows an encounter dialog. First meetings have three lines; the second and third battles have their own shorter dialogue. A stage retry has a separate greeting. No round is created, no tiles are dealt, and no CPU timer runs until the player finishes or explicitly skips the conversation. Enter/Space on the buttons, right arrow, mouse and tap are supported. Reduced-motion preferences disable the entrance animation.

The administration copy of `cast.mjs` is served by the existing backend at `/mahjong-admin/cast.mjs`. Keep that copy aligned when changing profiles. Uploaded image IDs, API paths, and the existing `mahjong:arcade` ranking mode are unchanged.

## Validation

Run `node --test mahjong/*.test.mjs` from the repository root. In addition to the rules and campaign checks, `app-cast.test.mjs` executes the real app handlers with the real round/arcade engine and a small in-memory DOM. It verifies the encounter gate for all 21 battles, timer/input blocking, explicit skip, the three-round stage reward boundary, and custom portrait recovery. These checks complement browser QA; they do not emulate image decoding or layout.

Generated-image prompts and provenance are stored with the cast assets. The original source images are retained in the task workspace.

## キャラクターの台詞

対局前の会話、対局中の声かけは字幕で表示します。対局音とご褒美動画の音量は別扱いです。
