# ウェブミックス777

TK777 ARCADEの7鍵リズムゲームです。オリジナル曲「夜明けのネオン」は126 BPM、約69秒です。ドラムやベースなどの伴奏に、判定ラインに重なったノーツを押すたびにシンセのメロディーやベルの音が加わります。取り逃したノーツの音は鳴りません。

PCは `S D F Space J K L`、スマートフォンでは画面下の鍵盤を使います。音声は「演奏スタート」で有効になり、一時停止・再開と音量調整ができます。曲の完成度は、全ノーツのうち鳴らせた割合です。スコアはタイミングの精度で決まり、自己ベストと音量はブラウザーに保存します。

静的配信で動作します。リポジトリのルートからHTTPサーバーを起動し、`/webmix777/` をブラウザーで開いてください。伴奏と楽器の音はWeb Audioで生成します。

```sh
node --test webmix777/*.test.mjs
```

## 楽曲ジャケット

`art/neon-dawn.webp` は、組み込みのImageGenで生成した絵をWebPに変換したものです。生成時のプロンプトを以下に記録します。

> Use case: stylized-concept. Create one square album jacket artwork for an original Japanese rhythm arcade track entitled 夜明けのネオン, without any typography or logos. A single iconic brushed-metal vinyl record split by a vivid apricot dawn beam, floating above a tiny rain-glossed futuristic Tokyo-style skyline. Large front-facing angled disc with fine etched rings, flat high-end editorial composition, small concentrated glints of icy aqua and salmon neon, inky blue-black shadows, peach coral horizon at upper left; aubergine accents and cold teal at bottom right. Photorealistic materials under stylized lighting, strong crop-safe center silhouette, tactile film grain, not a UI screenshot. Sophisticated dance/electronic album art with sense of a sunrise after a night set. A few clean white optical streaks, enough dark space around edges to crop as app thumbnail. Artwork only, no text, no watermark, nothing resembling an existing game or licensed cover.
