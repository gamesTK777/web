# ウェブミックス777

TK777 ARCADEの4鍵リズムゲームです。最初の曲一覧で、日本語・英語のオリジナル歌入り曲を各5曲と、インスト曲を3曲選べます。歌入り曲は1曲約2分です。曲を選ぶと演奏画面に切り替わり、手動演奏、自動演奏、曲別TOP10を選べます。

| 日本語 | 英語 |
| --- | --- |
| 夜明けの受信機 | Summer Static |
| 透明なフロア | Orbit on Air |
| 流星の停留所 | Paper City Lights |
| 月をアンプに | Bassline Parachute |
| 波を巻き戻す | No Last Train |

| 曲 | ジャンル | BPM |
| --- | --- | ---: |
| 夜明けのネオン | シンセハウス | 126 |
| 低音回廊 | テックハウス | 128 |
| 午前二時の閃光 | ピークタイム・テクノ | 138 |

「演奏スタート」では、判定ラインに重なったノーツに合わせて鍵盤を押します。PCの操作は左から `Space`（DJデッキの絵）、`J`、`K`、`L` です。スマートフォンでは画面下の鍵盤をタップします。歌入り曲の歌声と伴奏は曲のテンポに合わせて流れ続けます。インスト曲は、タイミングよく押したノーツの楽器が伴奏に重なります。成功したノーツは光の輪と粒になって消えます。

「自動演奏」では鍵盤の操作を任せて、曲全体を聴けます。どちらも一時停止・再開と音量調整ができます。演奏達成率は判定に成功したノーツの割合です。手動演奏の自己ベストは曲ごとにブラウザーへ保存します。

曲を選んで「TOP10」を押すと、選んだ曲の共有ランキングが見られます。手動演奏を最後まで終えたら、結果画面で公開するニックネームを入力して登録できます。開始時の登録受付とスコア送信にはインターネット接続が必要です。登録したニックネームとスコアは、同じ曲のランキングを開いた人に表示されます。ランキングの登録対象は手動演奏です。

静的配信で動作します。リポジトリのルートからHTTPサーバーを起動し、`/webmix777/` をブラウザーで開いてください。歌入り曲はACE-Step 1.5 Turboでオリジナルの歌詞付き音源を制作し、Hybrid Demucsで分離した2トラックを収録しています。開始時に選択中の曲だけを読み込み、Web Audioで2トラックを同期して再生します。インスト曲の伴奏と楽器の音はWeb Audioで生成します。

```sh
node --test webmix777/*.test.mjs webmix777/tracks/*.test.mjs
```

## 楽曲ジャケット

歌入り曲の `art/neon-voices-ja.webp` と `art/neon-voices-en.webp` は、組み込みのImageGenで生成し、WebPに変換したものです。

> Use case: stylized-concept. Square cover art for a playlist of original Japanese vocal club songs, no text. A gleaming handheld chrome stage microphone floats above the neon-soaked rooftop of a dense futuristic Japanese city after rain. Bright fuchsia tube lighting and glacier cyan highlights bloom against deep violet-blue darkness, with fine analog photo grain and thin shafts of light. A single iconic crop-safe silhouette, cinematic photography with polished stylized light, clean editorial composition for a professional rhythm arcade game, no people, logos, letters or watermark.

> Use case: stylized-concept. Square cover art for original English vocal club songs, no text. A single ice-blue glowing chrome microphone surrounded by clean electric chartreuse and violet light rings over an underground club stage, the concrete and light haze just visible behind. Vivid yet precise neon bloom, highly realistic metal, fine analog photo grain, dark indigo base, centered crop-safe subject for a professional rhythm arcade game. No people, logos, letters, watermark or UI.

`art/neon-dawn.webp`、`art/bass-corridor.webp`、`art/strobe-after-two.webp` は、組み込みのImageGenで生成した絵をWebPに変換したものです。生成時のプロンプトを以下に記録します。

> Use case: stylized-concept. Create one square album jacket artwork for an original Japanese rhythm arcade track entitled 夜明けのネオン, without any typography or logos. A single iconic brushed-metal vinyl record split by a vivid apricot dawn beam, floating above a tiny rain-glossed futuristic Tokyo-style skyline. Large front-facing angled disc with fine etched rings, flat high-end editorial composition, small concentrated glints of icy aqua and salmon neon, inky blue-black shadows, peach coral horizon at upper left; aubergine accents and cold teal at bottom right. Photorealistic materials under stylized lighting, strong crop-safe center silhouette, tactile film grain, not a UI screenshot. Sophisticated dance/electronic album art with sense of a sunrise after a night set. A few clean white optical streaks, enough dark space around edges to crop as app thumbnail. Artwork only, no text, no watermark, nothing resembling an existing game or licensed cover.

> Use case: stylized-concept. One original square album jacket for a Japanese underground tech-house track called 低音回廊. Tight, hypnotic bass music as a tactile underground club photo: a huge black loudspeaker cone built into an empty curved concrete acoustic tunnel, repeating rings and powerful perspective, glowing acid-lime light along the floor, deep bottle-green and black shadows with a few amber sparks, condensation on concrete. Slick sophisticated underground-club album art, photo-real textures under stylized hard light, fine analog grain, one strong crop-safe central silhouette. Original design. No printed text, logos, people, watermark, or UI.

> Use case: stylized-concept. One original square album jacket for a Japanese peak-time techno track called 午前二時の閃光. Empty warehouse dancefloor seen from a very low angle, overhead crossed white strobe tubes frozen above one reflective metal orb, vivid ultraviolet and electric blue with a few hot magenta sparks, powerful radial light through haze, glossy dark ground. Sophisticated intense club recording cover, photo-real materials with dramatic cinematic light, fine analog film grain, one bold central silhouette safe for thumbnail crop. Original design. No text, people, logos, watermark, or UI.
