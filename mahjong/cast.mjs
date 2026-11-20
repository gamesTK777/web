// Original adult characters. Uploaded administration images always take priority.
const STAGE_REWARD_LINES = [
  '合計は私の負けだね。おめでとう！ これ、ご褒美。ゆっくり見ていってね。',
  '合計点はあなたのほうが上ね。約束どおり、ご褒美を用意したわ。',
  '合計では私の負けですね。おめでとうございます。こちら、ご褒美です。',
  '合計は私の負けか！ 悔しいけど、いい勝負だった。はい、勝ったご褒美！',
  '合計では、あなたの勝ちですね。おめでとう。お祝いに、これをどうぞ。',
  '合計したら、うちの負けやね。おめでとう！ これ、ご褒美や。見ていってな。',
  '合計では私の負けですね。おめでとうございます。ささやかですが、ご褒美をどうぞ。'
];
export const CAST = Object.freeze([
  {
    id: 1, slug: 'hinata', name: '春野ひなた', age: 24, role: 'カフェ店主', personality: '明るく、人なつこい', tableTitle: '陽だまりの卓',
    customGreeting: 'いらっしゃい！ 今日はコーヒーより先に、一局どう？',
    first: ['いらっしゃい！ {name}です。今日はコーヒーより先に、一局どう？', 'うちのお店でも、よく常連さんと打つの。気楽に遊んでいってね。', '準備できた？ じゃあ、やってみようか！'],
    second: ['さっきの一局、楽しかったね。もう少し打ててうれしいな。', 'でも、今度は私も勝ちにいくよ！'],
    third: ['もう三局目かあ。あっという間だったね。', 'よし、最後の一局も楽しもう！'],
    retry: ['おかえり！ また来てくれたんだ、うれしいな。', 'ひと息ついたら、もう一回やってみよっか。'],
    rewards: ['わあ、きれいに決まったね！ 一勝目、おめでとう。', 'これで二勝目だね。ちょっと悔しいけど、見事だったよ！', '私に三勝かあ。すごいね、おめでとう！']
  },
  {
    id: 2, slug: 'mio', name: '水瀬澪', age: 28, role: '建築設計士', personality: '冷静で、理論派', tableTitle: '青い設計図の卓',
    customGreeting: 'どうぞ。設計の仕事のあと、ここでよく打つの。',
    first: ['{name}です。設計の仕事のあと、ここでよく打つの。', 'どう組み立てるか考えるのが好き。仕事でも、麻雀でもね。', 'お待たせ。そろそろ始めようか。'],
    second: ['さっきの打ち方、少しわかった気がする。', '二局目は私も打ち方を変えてみるね。'],
    third: ['三局目ね。さっきの二局は、よく覚えてる。', '最後まで一手ずつ、丁寧にいこう。'],
    retry: ['戻ってきたね。さっきの一局、覚えてる？', '気持ちを切り替えて、最初からやろう。'],
    rewards: ['うまく組み立てたね。まずはあなたの一勝。', 'なるほど、そこで待ってたのね。二勝目、おめでとう。', '私から三勝ね。負けたけど、勉強になったわ。ありがとう。']
  },
  {
    id: 3, slug: 'koharu', name: '小森こはる', age: 26, role: '花屋', personality: '穏やかで、やさしい', tableTitle: '花風の卓',
    customGreeting: 'こんにちは。ちょうど、お花の手入れが終わったところです。',
    first: ['こんにちは。{name}です。ちょうど、お花の手入れが終わったところです。', 'よかったら、一局お付き合いしてもいいですか？', 'どうぞ、急がずに。ゆっくり始めましょうね。'],
    second: ['ふふ、もう一局ですね。ご一緒できてうれしいです。', '今度は私も、いつもと違う打ち方を試してみますね。'],
    third: ['もう最後の一局なんですね。', 'せっかくですから、最後まで楽しみましょう。'],
    retry: ['またお会いできましたね。どうぞ、こちらへ。', '大丈夫ですよ。もう一度、ゆっくり始めましょう。'],
    rewards: ['お上手ですね。一勝目、おめでとうございます。', '二勝目ですね。お祝いに、小さな花束をどうぞ。', 'これで三勝ですね。ご一緒できて、うれしかったです。']
  },
  {
    id: 4, slug: 'akane', name: '橘朱音', age: 30, role: 'アウトドア写真家', personality: '快活で、負けず嫌い', tableTitle: '風を追いかける卓',
    customGreeting: 'おっ、来たね！ ふだんは山や海で写真を撮ってるんだ。',
    first: ['おっ、来たね！ {name}だよ。ふだんは山や海で写真を撮ってるんだ。', '麻雀も大好き。打ち始めると、つい本気になっちゃうけどね。', 'よし、準備できた？ 思いっきりいこう！'],
    second: ['さっきの一手、よかったなあ！ ちょっと驚いたよ。', '今度は私からいくからね。気を抜かないでよ！'],
    third: ['よし、三局目！ 最後まで負ける気はないよ。', 'お互い本気でいこう。いい勝負にしようね！'],
    retry: ['おかえり！ また来ると思ってたよ。', 'さっきのことは置いといて、もう一勝負！'],
    rewards: ['うわ、やられた！ 今のはお見事。まずは一勝だね。', 'また勝ったか！ 二勝目、おめでとう。', '三勝も持ってかれた！ 悔しいけど、楽しかったよ！']
  },
  {
    id: 5, slug: 'shion', name: '月城紫苑', age: 32, role: '小説家', personality: '物静かで、ミステリアス', tableTitle: '余白を読む卓',
    customGreeting: 'ようこそ。原稿は置いてきました。今日は麻雀を。',
    first: ['ようこそ。{name}です。原稿は置いてきました。今日は麻雀を。', '伏せた牌を見ていると、相手が何を考えているのか気になって。', 'では、始めましょう。あなたの打ち方、楽しみです。'],
    second: ['先ほどは、思っていた展開と違いました。面白いですね。', '次は、私が少し意外な手を打ってみましょうか。'],
    third: ['もう最後の一局ですね。', '急ぐ必要はありません。最後まで、ゆっくり打ちましょう。'],
    retry: ['またいらしたんですね。お待ちしていました。', '同じ相手でも、毎回違う一局になりますからね。'],
    rewards: ['その待ちは読めませんでした。まずは一勝、おめでとう。', '二勝目ですね。今の一局は、しばらく忘れなさそうです。', '私に三勝ですか。思いがけない結果でした。おめでとう。']
  },
  {
    id: 6, slug: 'nagi', name: '朝比奈凪', age: 27, role: 'ジャズピアニスト', personality: 'お茶目で、軽やか', tableTitle: 'スウィングする卓',
    customGreeting: 'いらっしゃい。ピアノ弾いてへん日は、だいたいここにおるねん。',
    first: ['いらっしゃい。{name}やで。ピアノ弾いてへん日は、だいたいここにおるねん。', 'うまい下手は気にせんでええよ。気楽にやろ。', 'ほな、打とっか。うちも楽しみやわ。'],
    second: ['さっきの一局、ええテンポやったなあ。', '次はうちも、ちょっと仕掛けてみるで。'],
    third: ['もう三局目か。早いもんやねえ。', 'ほな、最後まで楽しくいこか。'],
    retry: ['おかえり。お、もう一回打つ？ ええよ！', 'さっきのは気にせんと、いこか。'],
    rewards: ['ええやん！ 一勝目、気持ちよう決まったなあ。', 'またやられたわ。二勝目、おめでとう。', 'うちから三勝も取ったん？ やるやん！ また一緒に打とこな。']
  },
  {
    id: 7, slug: 'sara', name: '九条沙羅', age: 36, role: 'ホテルラウンジ支配人', personality: '上品で、堂々としている', tableTitle: '七つ目の約束',
    customGreeting: 'お待ちしておりました。どうぞ、こちらのお席へ。',
    first: ['お待ちしておりました。{name}と申します。どうぞ、こちらのお席へ。', 'ここまで勝ち進んでこられた方ですもの。どうぞご遠慮なく。', '私も精いっぱいお相手します。それでは、始めましょう。'],
    second: ['見事な打ち方でした。お強いんですね。', '次は私も、少し思い切って打ってみます。'],
    third: ['いよいよ最後の一局ですね。ここまでお疲れさまでした。', 'あと一局、どうぞお付き合いください。'],
    retry: ['お戻りくださって、うれしいです。お席はご用意しております。', 'それでは、改めてお相手いたしましょう。'],
    rewards: ['お見事です。まずは一勝、おめでとうございます。', 'これで二勝目ですね。見事な打ち方でした。', 'この卓で三勝。お見事でした。お相手できて光栄です。']
  }
].map(profile => Object.freeze({...profile,stageReward:STAGE_REWARD_LINES[profile.id-1]})));

export function getCast(stageId) {
  return Number.isInteger(Number(stageId)) ? CAST[Number(stageId) - 1] || null : null;
}

export function displayStageName(stage) {
  const profile = getCast(stage?.id);
  const name = typeof stage?.name === 'string' ? stage.name.trim() : '';
  return name && !/^ステージ[1-7]の対戦相手$/.test(name) ? name : profile?.name || '対戦相手';
}

function path(stageId, filename, base) {
  const profile = getCast(stageId);
  return profile ? `${String(base).replace(/\/?$/, '/')}${profile.slug}/${filename}.webp` : '';
}

export function defaultPortraitURL(stageId, base = './assets/cast/') {
  return path(stageId, 'portrait', base);
}

export function defaultRewardURL(stageId, win, base = './assets/cast/') {
  return Number.isInteger(win) && win >= 1 && win <= 3 ? path(stageId, `win-${win}`, base) : '';
}

export function encounterLines(stageId, battle = 1, { retry = false, name } = {}) {
  const profile = getCast(stageId);
  if (!profile) throw new RangeError('対戦相手のステージを確認してください。');
  if (!Number.isInteger(battle) || battle < 1 || battle > 3) throw new RangeError('対局数を確認してください。');
  const lines = retry && battle === 1 ? profile.retry : battle === 1 ? profile.first : battle === 2 ? profile.second : profile.third;
  if (lines === profile.first && name && name !== profile.name) {
    return [profile.customGreeting, ...lines.slice(1)];
  }
  return lines.map(line => line.replaceAll('{name}', profile.name));
}
