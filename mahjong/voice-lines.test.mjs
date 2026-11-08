import test from 'node:test';
import assert from 'node:assert/strict';
import {CAST} from './cast.mjs';
import {VOICE_PROFILES,getVoiceProfile,chooseVoiceLine,spokenText} from './voice-lines.mjs';

test('each cast member has a distinct moderate Japanese prosody preset and voice preferences',()=>{
  assert.equal(VOICE_PROFILES.length,7);
  assert.equal(new Set(VOICE_PROFILES.map(p=>p.rate)).size,7);
  assert.equal(new Set(VOICE_PROFILES.map(p=>p.pitch)).size,7);
  assert.equal(new Set(VOICE_PROFILES.map(p=>p.style)).size,7);
  CAST.forEach(character=>{
    const profile=getVoiceProfile(character.id);
    assert.equal(profile.id,character.id);assert.equal(profile.name,character.name);
    assert.equal(profile.lang,'ja-JP');assert.ok(profile.rate>=.6&&profile.rate<=1.4);
    assert.ok(profile.pitch>=.5&&profile.pitch<=1.5);assert.ok(profile.volume>0&&profile.volume<=1);
    assert.ok(profile.preferredVoices.length>=2);assert.ok(Object.isFrozen(profile));assert.ok(Object.isFrozen(profile.preferredVoices));
    assert.ok(/^[ぁ-ゖー]+$/.test(profile.nameReading));
  });
  for(const id of [0,8,-1,1.5,'invalid',undefined])assert.equal(getVoiceProfile(id),null);
});

test('all observable game events have three short distinct variations for every character',()=>{
  for(const event of ['roundStart','playerRiichi','cpuRiichi','cpuWin','draw','playerTurn','playerGoodHand']){
    const voices=[];
    for(let stage=1;stage<=7;stage++){
      const variants=[0,1,2].map(variant=>chooseVoiceLine(stage,event,{variant}));
      assert.equal(new Set(variants).size,3,`${stage}/${event}`);
      variants.forEach(line=>{assert.ok(line.length>4&&line.length<=70);assert.equal(line.includes('{'),false);});
      voices.push(variants[0]);
    }
    assert.equal(new Set(voices).size,7,event);
  }
});

test('selection cycles predictably and invalid events or inputs never produce accidental speech',()=>{
  const first=chooseVoiceLine(6,'roundStart');
  assert.equal(first,chooseVoiceLine(6,'roundStart',{variant:3}));
  assert.equal(chooseVoiceLine(6,'roundStart',{variant:-1}),chooseVoiceLine(6,'roundStart',{variant:2}));
  assert.equal(first,chooseVoiceLine(6,'roundStart',{variant:NaN}));
  assert.equal(first,chooseVoiceLine(6,'roundStart',null));
  for(const event of ['unknown','toString','__proto__',null,undefined])assert.equal(chooseVoiceLine(1,event),'');
  assert.equal(chooseVoiceLine(8,'roundStart'),'');
});

test('phonetic preparation reads whole cast names and mahjong terms without corrupting ordinary text',()=>{
  for(const character of CAST){
    const profile=getVoiceProfile(character.id),original=`${character.name}です。手牌を見て、打牌します。和了も流局も、麻雀の時間です。`;
    const prepared=spokenText(character.id,original);
    assert.equal(prepared,`${profile.nameReading}です。てはいを見て、だはいします。あがりもりゅうきょくも、マージャンの時間です。`);
    assert.equal(original.startsWith(character.name),true);
  }
  assert.equal(spokenText(1,'一手間を大切に。春野さんと、あなたの一手。'),'一手間を大切に。春野さんと、あなたの一手。');
  assert.equal(spokenText(1,'カスタム対戦相手です。'),'カスタム対戦相手です。');
  assert.equal(spokenText(1,'こんにちは\u0000。'),'こんにちは。');
  assert.equal(spokenText(1,null),'');assert.equal(spokenText(1,17),'');
});
