import test from 'node:test';
import assert from 'node:assert/strict';
import { CAST, getCast, displayStageName, defaultPortraitURL, defaultRewardURL, encounterLines } from './cast.mjs';
import { createEncounter, advanceEncounter, skipEncounter } from './encounter.mjs';

test('seven original adults have distinct identities, voices and three reward captions', () => {
  assert.equal(CAST.length, 7);
  for (const key of ['slug', 'name', 'role', 'personality']) assert.equal(new Set(CAST.map(profile => profile[key])).size, 7);
  for (const [index, profile] of CAST.entries()) {
    assert.equal(profile.id, index + 1); assert.ok(profile.age >= 20);
    assert.equal(profile.first.length, 3); assert.equal(profile.second.length, 2); assert.equal(profile.third.length, 2);
    assert.equal(profile.rewards.length, 3); assert.equal(new Set(profile.rewards).size, 3);
    for (const battle of [1, 2, 3]) {
      const lines = encounterLines(profile.id, battle);
      assert.ok(lines.every(line => line.trim().length > 0 && !line.includes('{name}')));
    }
    assert.equal(getCast(profile.id), profile);
  }
  assert.notDeepEqual(encounterLines(1, 1), encounterLines(1, 1, { retry: true }));
});

test('default asset mapping has all 28 unique slots and supports the hosted admin base URL', () => {
  const paths = CAST.flatMap(profile => [defaultPortraitURL(profile.id), ...[1, 2, 3].map(win => defaultRewardURL(profile.id, win))]);
  assert.equal(new Set(paths).size, 28); assert.ok(paths.every(path => path.startsWith('./assets/cast/') && path.endsWith('.webp')));
  assert.equal(defaultPortraitURL(7, 'https://example.test/cast'), 'https://example.test/cast/sara/portrait.webp');
  assert.equal(defaultRewardURL(4, 2, 'https://example.test/cast/'), 'https://example.test/cast/akane/win-2.webp');
  assert.equal(defaultRewardURL(1, 0), ''); assert.equal(defaultRewardURL(1, 4), ''); assert.equal(defaultPortraitURL(8), '');
});

test('generic server defaults get original names while administrator names remain intact', () => {
  for (const profile of CAST) assert.equal(displayStageName({ id: profile.id, name: `ステージ${profile.id}の対戦相手` }), profile.name);
  assert.equal(displayStageName({ id: 3, name: '  私の対戦キャラクター  ' }), '私の対戦キャラクター');
  assert.ok(encounterLines(3, 1, { name: 'カスタムの名前' }).join('').includes('カスタムの名前'));
  assert.ok(!encounterLines(3, 1, { name: 'カスタムの名前' }).join('').includes('小森こはる'));
});

test('encounter progression is immutable, completes only after the final line, and supports explicit skip', () => {
  let conversation = createEncounter(1, 1); const initial = conversation, original = structuredClone(initial);
  conversation = advanceEncounter(conversation); assert.equal(conversation.index, 1); assert.equal(conversation.complete, false);
  conversation = advanceEncounter(conversation); assert.equal(conversation.index, 2); assert.equal(conversation.complete, false);
  conversation = advanceEncounter(conversation); assert.equal(conversation.complete, true);
  assert.equal(advanceEncounter(conversation), conversation); assert.deepEqual(initial, original);
  const short = createEncounter(6, 2); assert.equal(skipEncounter(short).complete, true); assert.equal(short.complete, false);
  assert.throws(() => createEncounter(8, 1), RangeError); assert.throws(() => createEncounter(1, 4), RangeError);
});
