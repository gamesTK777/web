# マルチプレイのローカル試遊

ウェブクラフト777のフォルダーで次を実行します。公開用ビルドを作り直す場合は先に `npm run build` を実行してください。

```sh
node preview.mjs --online
```

Node.js 22.13以降または24系で起動できます。Node.js 22.12を使う場合は `node --experimental-sqlite preview.mjs --online` で起動します。起動後は表示されたローカルURLを同じPCのブラウザーで開きます。1つ目のタブで「マルチプレイ」から部屋を作り、別のタブで同じ合言葉を入力すると、2人の動きや建築を試せます。

ローカル試遊では部屋と建築内容をメモリーに保持します。端末間でインターネット経由の共同プレイをするときは公開版を使います。

部屋のロジックは `room-service.mjs`、データ構成は `schema.sql` にあります。ローカル試遊と自動テストは同じSQLを使用します。

```sh
node --test online/room-service.test.mjs
```
