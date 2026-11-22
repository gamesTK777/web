# ウェブミックス777

TK777 ARCADEの4鍵リズムゲームです。「曲を選ぶ」から、次のオリジナル曲を選べます。

| 曲 | ジャンル | BPM |
| --- | --- | ---: |
| 夜明けのネオン | シンセハウス | 126 |
| 低音回廊 | テックハウス | 128 |
| 午前二時の閃光 | ピークタイム・テクノ | 138 |

「演奏スタート」では、判定ラインに重なったノーツを押すたびに、シンセやベルの音が伴奏へ加わります。PCは `F G J K`、スマートフォンでは画面下の鍵盤を使います。取り逃したノーツの音は鳴りません。

「自動演奏」では鍵盤の操作を任せて、全ノーツの音が入った曲を聴けます。どちらも一時停止・再開と音量調整ができます。曲の完成度は鳴らせたノーツの割合です。手動演奏の自己ベストは曲ごとにブラウザーへ保存します。

静的配信で動作します。リポジトリのルートからHTTPサーバーを起動し、`/webmix777/` をブラウザーで開いてください。伴奏と楽器の音はWeb Audioで生成します。

```sh
node --test webmix777/*.test.mjs
```

## 楽曲ジャケット

`art/neon-dawn.webp`、`art/bass-corridor.webp`、`art/strobe-after-two.webp` は、組み込みのImageGenで生成した絵をWebPに変換したものです。生成時のプロンプトを以下に記録します。

> Use case: stylized-concept. Create one square album jacket artwork for an original Japanese rhythm arcade track entitled 夜明けのネオン, without any typography or logos. A single iconic brushed-metal vinyl record split by a vivid apricot dawn beam, floating above a tiny rain-glossed futuristic Tokyo-style skyline. Large front-facing angled disc with fine etched rings, flat high-end editorial composition, small concentrated glints of icy aqua and salmon neon, inky blue-black shadows, peach coral horizon at upper left; aubergine accents and cold teal at bottom right. Photorealistic materials under stylized lighting, strong crop-safe center silhouette, tactile film grain, not a UI screenshot. Sophisticated dance/electronic album art with sense of a sunrise after a night set. A few clean white optical streaks, enough dark space around edges to crop as app thumbnail. Artwork only, no text, no watermark, nothing resembling an existing game or licensed cover.

> Use case: stylized-concept. One original square album jacket for a Japanese underground tech-house track called 低音回廊. Tight, hypnotic bass music as a tactile underground club photo: a huge black loudspeaker cone built into an empty curved concrete acoustic tunnel, repeating rings and powerful perspective, glowing acid-lime light along the floor, deep bottle-green and black shadows with a few amber sparks, condensation on concrete. Slick sophisticated underground-club album art, photo-real textures under stylized hard light, fine analog grain, one strong crop-safe central silhouette. Original design. No printed text, logos, people, watermark, or UI.

> Use case: stylized-concept. One original square album jacket for a Japanese peak-time techno track called 午前二時の閃光. Empty warehouse dancefloor seen from a very low angle, overhead crossed white strobe tubes frozen above one reflective metal orb, vivid ultraviolet and electric blue with a few hot magenta sparks, powerful radial light through haze, glossy dark ground. Sophisticated intense club recording cover, photo-real materials with dramatic cinematic light, fine analog film grain, one bold central silhouette safe for thumbnail crop. Original design. No text, people, logos, watermark, or UI.
