import test from 'node:test';
import assert from 'node:assert/strict';
import { TRACKS, getTrack, scheduleMusicStep } from './music-score.mjs';

const ids = ['town','dungeon-1-2','dungeon-3-4','dungeon-5-6','dungeon-7-8','dungeon-9-10','swarm'];
const instruments = new Set(['harp','flute','bell','reed','triangle','sine']);
function eventsAt(id, step, time = 10) {
  const events = [];
  scheduleMusicStep(id, step, time, {
    tone: (...args) => events.push({type:'tone',args}),
    percussion: (...args) => events.push({type:'percussion',args}),
  });
  return events;
}

test('seven immutable score descriptions cover every requested place and getTrack has a stable fallback', () => {
  assert.deepEqual(Object.keys(TRACKS), ids);
  assert.ok(Object.isFrozen(TRACKS));
  for (const id of ids) {
    const track = getTrack(id);
    assert.equal(track.id, id); assert.ok(Object.isFrozen(track));
    assert.equal(typeof track.title, 'string'); assert.ok(track.title.length > 3);
    assert.equal(typeof track.area, 'string');
    assert.ok(track.bpm >= 80 && track.bpm <= 160);
    assert.ok([8,16].includes(track.bars));
  }
  assert.equal(new Set(ids.map(id=>TRACKS[id].title)).size, 7);
  assert.equal(new Set(ids.map(id=>TRACKS[id].bpm)).size, 7);
  for (const invalid of [undefined,null,'dungeon','missing','__proto__','constructor']) assert.equal(getTrack(invalid), TRACKS.town);
});

test('each complete score produces bounded finite notes and percussion without requiring any audio context', () => {
  for (const id of ids) {
    const track = getTrack(id), unit = 60 / track.bpm / 4;
    let total = 0;
    for (let step = 0; step < track.bars * 16; step++) {
      const time = 10 + step * unit, events = eventsAt(id,step,time);
      assert.ok(events.length <= 9, `${id} has a bounded one-step workload`);
      for (const event of events) {
        total++;
        if (event.type === 'tone') {
          const [midi,when,duration,level,instrument] = event.args;
          assert.ok(Number.isFinite(midi) && midi >= 30 && midi <= 108);
          assert.ok(Number.isFinite(when) && when >= time && when <= time + unit);
          assert.ok(Number.isFinite(duration) && duration > 0 && duration <= unit * 14);
          assert.ok(level > 0 && level <= .1);
          assert.ok(instruments.has(instrument));
        } else {
          const [when,kind,amount] = event.args;
          assert.equal(when,time); assert.ok(['kick','snare','hat'].includes(kind));
          assert.ok(amount > 0 && amount <= .7);
        }
      }
    }
    assert.ok(total > 120 && total < track.bars * 90, `${id} contains a full, bounded arrangement`);
  }
});

test('all seven pieces have distinct note and rhythm phrases, beyond key and tempo changes', () => {
  const firstPhrases = [], rhythmPhrases = [];
  for (const id of ids) {
    // Compare intervals and event kinds instead of absolute pitch/BPM alone.
    const events = Array.from({length:32},(_,n)=>eventsAt(id,n));
    const firstNotes = events.flatMap((batch,step)=>batch.filter(e=>e.type==='tone').map(e=>({step,midi:e.args[0],instrument:e.args[4]})));
    const root=firstNotes[0].midi;
    firstPhrases.push(JSON.stringify(firstNotes.map(e=>[e.step,e.midi-root,e.instrument])));
    rhythmPhrases.push(JSON.stringify(events.map(batch=>batch.map(e=>e.type==='tone'?e.args[4]:e.args[1]))));
  }
  assert.equal(new Set(firstPhrases).size,7);
  assert.equal(new Set(rhythmPhrases).size,7);
});

test('the full musical loop repeats on its exact bar boundary, including the sixteen-bar final-depth theme', () => {
  for (const id of ids) {
    const loop = getTrack(id).bars * 16;
    for (let step = 0; step < loop; step++) assert.deepEqual(eventsAt(id,step),eventsAt(id,step+loop));
  }
});

test('invalid scheduling requests remain silent and an unknown track uses the town arrangement', () => {
  for (const step of [-1,NaN,Infinity,1.2,Number.MAX_SAFE_INTEGER+1]) assert.deepEqual(eventsAt('town',step),[]);
  for (const time of [-1,NaN,Infinity]) assert.deepEqual(eventsAt('town',0,time),[]);
  assert.doesNotThrow(()=>scheduleMusicStep('town',0,0));
  assert.deepEqual(eventsAt('unknown',8),eventsAt('town',8));
});
