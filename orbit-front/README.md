# 機甲群星 オービットフロント

環潮同盟の四機を率い、赤環機構と月面採掘都市セレノを争う、一人用の戦略アクションゲームです。両軍の機体・資金・戦闘結果は一つの戦略マップに記録されます。

## 遊び始める

TK777 ARCADEの「機甲群星 オービットフロント」から「新しく始める」を選んでください。PCではクリック、iPhone・iPadではタップで命令します。盤面にキーボードフォーカスがある場合は矢印でマスを選び、Enterで決定できます。細部は地図の「拡大」で確認できます。

最初のターンに、中央工場 **G05** を守るバサルトを挟み撃ちにできます。

1. 味方の重砲機バサルトを **F03 → H05** と動かし、「待機」を選びます。
2. 偵察機ピケットを **D05 → F05** へ進め、G05への攻撃を選びます。盤面の線で左右から挟んでいることと、参戦数「自軍2機 対 敵軍1機」を確認します。
3. 攻撃を確定してピケットで出撃します。ピケットは工場の左、僚機のバサルトは右から登場します。敵の砲身が光ったら射線を横切るように動き、僚機に側面を狙わせてください。

1を飛ばした場合は同じ工場で1対1になります。命令を確定するまで移動先・攻撃先は変更できます。

## 操縦と勝敗

| 操作 | キーボード | タッチ |
| --- | --- | --- |
| 移動 | WASD・矢印 | 左スティック |
| 主射撃 | Jを押す・長押し | 射撃をタップ・長押し |
| 近接 | K | 近接 |
| 短距離ブースト | L | 急加速 |
| 標的変更 | Q | 敵をタップ |
| 戦闘の一時停止 | Esc | 右上の一時停止 |

タッチは横画面推奨です。操作機が撃破されたら、生存する自軍の僚機へ操縦が移ります。工場の建物は移動と射線の両方を遮ります。各戦闘は最長35秒で、生存した機体は元のマスへ残りHPを持ち帰ります。敵ターンでも、自軍機を選んで防衛できます。

敵本拠地でロボットが「占領」を実行すると勝利します。30ラウンド終了時は工場と本拠地の保有数で判定し、同数なら引き分けです。

## 生産・修理・成長

- 自軍ターン開始時に、本拠地1か所につき120 G、工場1か所につき90 Gを得ます。
- ピケットは120 G・1ターン、リベットは180 G・1ターン、バサルトは300 G・2ターンで完成します。周囲に空きがあれば自動配備。埋まっていた場合は空きを作り、施設の「配備先を選ぶ」で出撃させます。
- 母艦キャラベルの隣で「母艦に収容」を実行すると2機まで搭載できます。各自軍ターンの開始時に最大HPの約24%を修理します。母艦を選び、機体と空きマスを指定して再出撃できます。撃沈された場合は搭載機も失います。
- ロボットの生還で経験を1、撃破数ぶんを追加で獲得します。経験2でベテラン、5でエースに昇格し、攻撃力も上がります。援護参加の生還も戦歴になります。

## 保存と起動方法

確定した命令・生産・ターン交代・戦闘終了をブラウザのローカルストレージへ保存します。「つづきから」で再開できます。戦闘中に閉じた場合は、その戦闘の出撃機選択から再開します。保存は端末とブラウザごとに1作戦です。

静的なHTML、CSS、JavaScriptモジュール、同梱のWebP画像で動作します。ビルドや外部サービスは不要です。ローカルで動かす場合は、リポジトリのルートで以下を実行し、ブラウザで `http://localhost:8000/orbit-front/` を開きます。

```sh
python -m http.server 8000
```

戦略・戦闘の回帰テストは、Node.jsを使ってリポジトリのルートから実行できます。

```sh
node --test orbit-front/strategy.test.mjs orbit-front/battle.test.mjs
```

## 素材

月面マップ、交戦地形、共通の機体スプライト、陣営章はCanvas 2Dで描画しています。BGMは戦略と交戦にそれぞれ専用の譜面を用意し、効果音とともにWeb Audioで合成します。

タイトル用の新規生成イラストは `assets/moonrise.webp`、ポータル用トリミングは `assets/emblem.webp` です。内蔵の画像生成機能に渡した指示は以下です。

> Landscape title illustration for an original Japanese 16-bit pixel art lunar strategy videogame, wide 3:2. Strict pixel art: chunky hand-placed pixels, coherent limited palette, no anti-aliased outlines, beautifully composed retro painted pixel key art. Right two thirds: one original lunar industrial walker with broad squared pale ivory armored forearms, single horizontal cyan visor integrated into a squat angular helmet, dark peacock-teal shoulders, compact backpack, chunky short legs and weathered bronze hinges. Three-quarter portrait of robot, one of its large articulated arms in the foreground. A distinct much smaller four-legged purple mining machine with off-center cylindrical barrel on a lunar ridge in the distance. Monochrome slate lunar mining metropolis with tiny warm golden facility windows, orange horizon light, a distant small blue planet in a very dark starry sky. Left quarter remains dark and calm for later typography overlay. Mech should be industrial, asymmetrical with layered armor and mechanical joints. Dramatic long cobalt shadows. Highly readable silhouette, lush intentional art direction and retro arcade box art. No text, no letters, no insignia, no UI, no watermarks, absolutely original designs.
