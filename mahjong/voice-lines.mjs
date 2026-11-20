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
    roundStart:['よし、始めよっか。よろしくね！','お待たせ。今日も楽しく打とうね。','なんか緊張してきた。じゃあ、いくよ！'],
    playerRiichi:['おっ、リーチだ。早いね！','わ、来たね。ここからどうしようかな。','リーチね。私もちょっと考えさせて。'],
    cpuRiichi:['よし、そろった。リーチ！','どうしよっかな。うん、リーチしちゃおう。','ここで勝負するね。リーチ！'],
    cpuWin:['やった！ この局は私の勝ちだね。','うれしいな。最後までどきどきしたよ。','ふう、あがれた。いい対局だったね。'],
    draw:['あら、流局だね。おつかれさま！','最後まで決まらなかったね。ふう。','ここまでかあ。ちょっとひと息つこっか。'],
    playerTurn:['ゆっくり考えていいよ。待ってるね。','あわてなくて大丈夫だよ。','迷うよね。私もよく考え込んじゃう。'],
    playerGoodHand:['なんかいい感じだね！','落ち着いてるね。私も見習いたいな。','一緒に打てて楽しいな。']
  },
  {
    roundStart:['じゃあ、始めようか。よろしく。','準備できたよ。始めよう。','今度はどう組み立てようかな。よし、いこう。'],
    playerRiichi:['リーチね。河をもう一度見ておこう。','そっか、来たね。少し考えさせて。','リーチか。ここからは慎重にいくよ。'],
    cpuRiichi:['ここは押す。リーチ。','うん、待ちはこれでいい。リーチ。','迷ったけど、決めた。リーチね。'],
    cpuWin:['この局は私の勝ちね。対局ありがとう。','うまくいった。最後は少し迷ったよ。','決まったね。最後まで気が抜けなかったよ。'],
    draw:['流局ね。おつかれさま。','最後まで決まらなかったね。','ここで流局か。私も少し迷いすぎたかな。'],
    playerTurn:['時間はあるよ。ゆっくりどうぞ。','もう一度見直していいよ。待ってる。','迷うところだね。あせらなくていいよ。'],
    playerGoodHand:['なるほど。そういう打ち方もあるね。','落ち着いて打つね。いいと思う。','いい勝負になってきたね。']
  },
  {
    roundStart:['それじゃあ、始めましょうか。','今日はご一緒できてうれしいです。よろしくお願いします。','お茶もありますよ。では、始めましょう。'],
    playerRiichi:['あ、リーチですね。私もちょっと考えますね。','リーチですか。どきっとしました。','そう来ましたか。ゆっくり考えさせてくださいね。'],
    cpuRiichi:['はい。ここでリーチしますね。','少し迷いましたけど、リーチです。','では、リーチにします。'],
    cpuWin:['あ、あがれました。ありがとうございました。','この局は私でしたね。いい対局でした。','うまくいきました。最後まで緊張しました。'],
    draw:['流局ですね。おつかれさまでした。','決まらなかったですね。こういう局も好きです。','ふう。少しお茶にしましょうか。'],
    playerTurn:['どうぞ、ゆっくり考えてくださいね。','急がなくて大丈夫ですよ。','待ってますから、どうぞご自分のペースで。'],
    playerGoodHand:['丁寧に打つんですね。すてきです。','ふふ、楽しくなってきましたね。','なんだか落ち着きますね。']
  },
  {
    roundStart:['よし、勝負！ 本気でいくからね。','準備いい？ じゃあ始めるよ！','さあ、いこう！ いい勝負にしようね。'],
    playerRiichi:['おっ、リーチ！ おもしろくなってきたね。','来た来た！ さて、どうしよっか。','うわ、来たね！ まだまだ、こっからだよ。'],
    cpuRiichi:['ここだ。リーチ！','待ってたよ、この牌。リーチ！','よし、迷わない。リーチ！'],
    cpuWin:['やった！ この局は私がもらったよ。','よっしゃ、決まった！ いい勝負だったね。','ふう、勝った。思ったより手ごわかった！'],
    draw:['うわ、流局かあ。あとちょっとだったな。','決まらなかったか。うん、面白かった！','よし、ここでひと休み。おつかれ！'],
    playerTurn:['納得いくまで考えていいよ。','迷うときは、いったん深呼吸だよ。','時間はあるからさ。ゆっくりでいいよ。'],
    playerGoodHand:['お、いいね！ 楽しくなってきた。','そうきたか。いいじゃん！','いい勝負だね。私も負けないよ！']
  },
  {
    roundStart:['静かでいいですね。では、始めましょう。','お待たせしました。どんな一局になるかな。','よろしくお願いします。楽しみにしていました。'],
    playerRiichi:['リーチですね。なるほど、そう来ましたか。','あら、もうですか。少し考えますね。','ここからですね。慎重にいきます。'],
    cpuRiichi:['そろいました。リーチです。','少し迷っていましたが、リーチにします。','ここで決めましょう。リーチ。'],
    cpuWin:['この局は私でしたね。ありがとうございました。','あがれました。ほっとしています。','最後の牌まで、気が抜けませんでしたね。'],
    draw:['流局ですね。最後までわかりませんでした。','決まらないまま終わる局もありますね。','ここまでですね。おつかれさまでした。'],
    playerTurn:['どうぞ、気が済むまで考えてください。','大丈夫です。待っていますよ。','私も考えるのが好きです。ゆっくりどうぞ。'],
    playerGoodHand:['なるほど。覚えておきたい一手です。','静かだけど、いい勝負ですね。','先が読めないのは、楽しいですね。']
  },
  {
    roundStart:['ほな、始めよか。よろしゅう。','肩の力抜いてな。ぼちぼちいこか。','準備できた？ ほな、一局やろか。'],
    playerRiichi:['おっ、リーチか。やるやん！','来たなあ。うちも少し考えよ。','へえ、そこでリーチか。おもろなってきたな。'],
    cpuRiichi:['ほな、リーチや。','お、欲しかった牌や。リーチ！','よし、ここでいこ。リーチやで。'],
    cpuWin:['よっしゃ。今回はうちの勝ちやね。','あがれたわ。最後までええ勝負やった。','決まったなあ。付き合ってくれて、おおきに。'],
    draw:['あら、流局やね。おつかれさん。','結局どっちもあがられへんかったな。','ここまでかあ。ちょっと休もか。'],
    playerTurn:['急がんでええよ。待ってるから。','そこ迷うよなあ。ゆっくり考え。','自分のペースでええで。'],
    playerGoodHand:['おっ、ええ感じやん。','ええリズムで打つなあ。','うん、おもろい一局やな。']
  },
  {
    roundStart:['それでは始めましょうか。よろしくお願いいたします。','準備はよろしいですか。では、始めましょう。','お待たせいたしました。どうぞよろしく。'],
    playerRiichi:['リーチですね。私も慎重にまいります。','そう来ましたか。少し考えさせてください。','思い切りましたね。私も気を引き締めます。'],
    cpuRiichi:['ここで勝負いたします。リーチです。','手がそろいました。リーチ。','決めました。リーチにいたします。'],
    cpuWin:['この局は私がいただきました。ありがとうございました。','あがれました。最後まで気が抜けませんでしたね。','勝ててほっとしました。いい対局でしたね。'],
    draw:['流局でございますね。いい対局でした。','最後まで決まりませんでしたね。','ここまでですね。お相手いただき、ありがとうございます。'],
    playerTurn:['どうぞ、ごゆっくりお考えください。','お急ぎにならなくても大丈夫ですよ。','お待ちしていますので、ゆっくりどうぞ。'],
    playerGoodHand:['落ち着いて打たれますね。','丁寧な一手ですね。','いい対局になりましたね。']
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
