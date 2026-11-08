// Prosody presets for the original cast. Voice names are preference hints only:
// the speech controller resolves them against Japanese voices on the device.
export const VOICE_PROFILES = Object.freeze([
  {id:1,rate:1.08,pitch:1.17,volume:.93,style:'明るく、弾むように',name:'春野ひなた',nameReading:'はるのひなた',preferredVoices:['Haruka','Ayumi','Nanami','Kyoko']},
  {id:2,rate:.96,pitch:.96,volume:.91,style:'落ち着いて、歯切れよく',name:'水瀬澪',nameReading:'みなせみお',preferredVoices:['Kyoko','Nanami','Haruka','Ayumi']},
  {id:3,rate:.88,pitch:1.07,volume:.86,style:'やわらかく、ゆっくり',name:'小森こはる',nameReading:'こもりこはる',preferredVoices:['Ayumi','Haruka','Kyoko','Nanami']},
  {id:4,rate:1.12,pitch:1.03,volume:.97,style:'はきはき、元気よく',name:'橘朱音',nameReading:'たちばなあかね',preferredVoices:['Nanami','Haruka','Ayumi','Kyoko']},
  {id:5,rate:.84,pitch:.85,volume:.86,style:'静かに、余韻を残して',name:'月城紫苑',nameReading:'つきしろしおん',preferredVoices:['Kyoko','Ayumi','Haruka','Nanami']},
  {id:6,rate:1.04,pitch:1.11,volume:.93,style:'軽やかに、関西ことばで',name:'朝比奈凪',nameReading:'あさひななぎ',preferredVoices:['Haruka','Nanami','Ayumi','Kyoko']},
  {id:7,rate:.91,pitch:.93,volume:.92,style:'上品に、ゆったりと',name:'九条沙羅',nameReading:'くじょうさら',preferredVoices:['Ayumi','Kyoko','Nanami','Haruka']}
].map(profile=>Object.freeze({...profile,lang:'ja-JP',preferredVoices:Object.freeze(profile.preferredVoices)})));

export function getVoiceProfile(stageId){
  const id=Number(stageId);
  return Number.isInteger(id)?VOICE_PROFILES[id-1]||null:null;
}

const LINES=Object.freeze([
  {
    roundStart:['よーし、楽しい一局にしようね！','お待たせ！ ここからは、牌でお話ししよう。','さあ、始めよう！ 私もわくわくしてきたよ。'],
    playerRiichi:['おっ、リーチだね！ 私も気を引き締めなくちゃ。','いいね、その思いきり！ ここからが楽しみ。','わあ、勝負に出たね！ 最後まで、しっかり打つよ。'],
    cpuRiichi:['よーし、私もリーチ！ ここは勝負だよ。','準備できた！ リーチ、いくね！','私からも、リーチ！ ちょっとどきどきするな。'],
    cpuWin:['やったあ！ 今回は私の勝ちだね。次も、楽しみにしてるよ。','うれしい！ いい一局だったね。もう一度、遊ぼう！','よーし、決まった！ あなたと打つと、時間があっという間だね。'],
    draw:['あら、流局だね。こんな一局もあるよね。','今回は引き分け！ ひと息ついて、次を楽しもう。','おつかれさま！ 続きは、また新しい牌でね。'],
    playerTurn:['ゆっくりで大丈夫。あなたのペースで選んでね。','あわてなくていいよ。私も、お茶を飲んで待ってるね。','次は、どんな一手かな。のんびり考えてね。'],
    playerGoodHand:['いいリズムで打ってるね！','その落ち着き、すてきだな。','うんうん、対局が楽しくなってきた！']
  },
  {
    roundStart:['始めよう。一手ずつ、丁寧に。','配置は整った。あとは、選択ね。','この一局も、落ち着いて組み立てよう。'],
    playerRiichi:['リーチね。ここからは、選択を絞る。','わかった。私も、打ち方を変える。','勝負に出たね。慎重に、応える。'],
    cpuRiichi:['リーチ。ここは、前に出る。','組み立ては終わり。リーチ。','私も、リーチ。最後まで確かめよう。'],
    cpuWin:['今回は、私の答えが届いたね。対局をありがとう。','決まった。一局、きちんと結べてよかった。','私の勝ちね。次も、丁寧に打とう。'],
    draw:['流局。次は、新しい配置から。','引き分けね。結果を急がないことも大切。','今回は、ここまで。次の設計を考えよう。'],
    playerTurn:['考える時間はある。焦らずに。','一度、全体を見直してもいい。','自分のペースで、選んで。'],
    playerGoodHand:['落ち着いた進め方ね。','その丁寧さは、いいと思う。','いい対局になってきた。']
  },
  {
    roundStart:['それでは、ゆっくり始めましょう。','ひとつひとつ、大切に打ちますね。','今日の一局も、よい時間になりますように。'],
    playerRiichi:['リーチですね。私も、心を落ち着けて。','ふふ、いよいよですね。丁寧にお相手します。','あなたの決心、受け取りました。最後まで、ご一緒に。'],
    cpuRiichi:['私から、リーチをさせてください。','そろそろ、咲いてくれるでしょうか。リーチです。','少し勇気を出して。リーチ、です。'],
    cpuWin:['今回は、私の番でしたね。ご一緒できて、うれしかったです。','小さな花が咲きました。よい対局を、ありがとうございます。','私の勝ちになりましたね。また、ゆっくり打ちましょう。'],
    draw:['流局ですね。おつかれさまでした。','今回は引き分けでした。次の花を、待ちましょう。','咲くのは、次の一局でしょうか。ご一緒できて、よかったです。'],
    playerTurn:['どうぞ、ゆっくりお選びください。','急がなくて、大丈夫ですよ。','私は、のんびりお待ちしていますね。'],
    playerGoodHand:['穏やかな、よい時間ですね。','丁寧に打ってくださって、うれしいです。','ふふ、もう少しご一緒しましょう。']
  },
  {
    roundStart:['よし、出発！ いい一局にしよう！','準備はいい？ 私も、全力でいくよ！','ここから、どんな景色になるかな。さあ、勝負！'],
    playerRiichi:['おっ、リーチ！ いいね、盛り上がってきた！','来たね！ 私も、逃げ腰じゃいられないな。','その挑戦、受けて立つよ！'],
    cpuRiichi:['ここだ！ 私からリーチ！','よし、流れに乗るよ。リーチ！','出し惜しみなし！ リーチ、いくよ！'],
    cpuWin:['よっしゃ、今回は私の勝ち！ いい勝負だった！','決まった！ また、全力で打とうね！','登りきった！ 次の一局も、楽しみにしてる！'],
    draw:['おっと、流局！ 次のルートを探そう！','引き分けかあ！ こういう一局も、面白いね。','今回はここまで！ ひと息ついたら、また行こう！'],
    playerTurn:['景色を見回すつもりで、ゆっくり考えてね。','焦らなくていいよ。次の一歩を、決めよう！','考える時間も、冒険のうちだね！'],
    playerGoodHand:['いいね、いいね！ 楽しくなってきた！','その調子で、最後までいこう！','おっ、気持ちのいい対局だね！']
  },
  {
    roundStart:['では、新しい一頁を。','この一局が、静かに幕を開けます。','続きは、卓の上に記しましょう。'],
    playerRiichi:['リーチ。物語が、動きましたね。','新しい展開ですね。慎重に、読み進めましょう。','その決意が、どんな結末につながるのでしょう。'],
    cpuRiichi:['私から、一つの伏線を。リーチです。','ここで、物語を動かしましょう。リーチ。','静かな勝負を。リーチです。'],
    cpuWin:['今回は、私が結びを記しました。よい物語を、ありがとう。','一局の終わりですね。続きは、また新しい卓で。','この結末も、大切な一頁にしましょう。'],
    draw:['流局。余白を残す結末も、ありますね。','引き分けでしたね。物語は、次の一局へ。','今回は、静かな幕引きを。おつかれさまでした。'],
    playerTurn:['結末を急がずに。お待ちしています。','考える時間にも、言葉があります。','どうぞ、一行ずつ。あなたの速さで。'],
    playerGoodHand:['続きを、楽しみにしています。','丁寧な一局は、心に残りますね。','静かな、よい時間ですね。']
  },
  {
    roundStart:['ほな、セッション始めよか！','肩の力、抜いていこ。楽しく勝負や！','次の一音は、どんな牌やろ。始めよ！'],
    playerRiichi:['おっ、リーチ！ ええタイミングやね！','来た来た！ うちも、しっかり合わせるで。','勝負のフレーズやね。最後まで、付き合うわ！'],
    cpuRiichi:['ほな、うちからリーチや！','ここで一音、足してみよか。リーチ！','ええとこ、来たで。リーチや！'],
    cpuWin:['よっしゃ、今回はうちの勝ち！ ナイスセッションやった！','気持ちよく決まったわ！ また、一緒に打とこな。','この一局、ええ曲になったなあ。おおきに！'],
    draw:['あら、流局やね。次の曲に、いこか。','引き分けも、ええ余韻やん。おつかれさん！','今回はここまでやね。また、楽しく合わせよ！'],
    playerTurn:['急がんでええよ。自分のリズムでな。','ゆっくり考えとき。うちは、のんびり待ってるで。','間をとるんも、大事な音楽やからね。'],
    playerGoodHand:['ええリズムしてるやん！','楽しいセッションになってきたなあ。','その落ち着き、ええ感じやで。']
  },
  {
    roundStart:['それでは、心を込めてお相手いたします。','どうぞ、ご自身の一手を大切に。始めましょう。','よい対局になりますように。よろしくお願いいたします。'],
    playerRiichi:['リーチでございますね。私も、最善を尽くします。','確かな決意を感じます。丁寧に、お応えしましょう。','その一手に、敬意を。最後まで、お相手いたします。'],
    cpuRiichi:['私からも、リーチを申し上げます。','ここは、踏み込ませていただきます。リーチです。','準備が整いました。リーチでございます。'],
    cpuWin:['今回は、私に勝利が訪れました。よい対局を、ありがとうございます。','お相手いただき、光栄でした。またのご挑戦を、お待ちしております。','この一局に、心からの感謝を。また、ご一緒いたしましょう。'],
    draw:['流局でございますね。おつかれさまでした。','今回は引き分けに。次の一局を、楽しみにしております。','どちらにも譲らぬ、よい時間でした。ありがとうございます。'],
    playerTurn:['どうぞ、ごゆっくりお考えください。','お急ぎになる必要はございません。','ご自身の最善の一手を。お待ちしております。'],
    playerGoodHand:['落ち着いた進め方でいらっしゃいますね。','ご一緒できて、光栄でございます。','一手を大切にされる姿勢、すてきですね。']
  }
].map(events=>Object.freeze(Object.fromEntries(Object.entries(events).map(([key,lines])=>[key,Object.freeze(lines)])))));

export function chooseVoiceLine(stageId,event,options={}){
  const profile=getVoiceProfile(stageId),lines=profile&&LINES[profile.id-1][event];
  if(!Array.isArray(lines))return '';
  const variant=Number.isSafeInteger(options?.variant)?options.variant:0;
  return lines[(variant%lines.length+lines.length)%lines.length];
}

// Only full names and unambiguous mahjong words are substituted. User-defined
// names and ordinary fragments such as 「一手間」 remain untouched.
const READINGS=Object.freeze({'麻雀':'マージャン','手牌':'てはい','打牌':'だはい','和了':'あがり','流局':'りゅうきょく'});
export function spokenText(stageId,text){
  if(typeof text!=='string')return '';
  const profile=getVoiceProfile(stageId);
  let result=text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'');
  if(profile)result=result.split(profile.name).join(profile.nameReading);
  return result.replace(/麻雀|手牌|打牌|和了|流局/g,word=>READINGS[word]);
}
