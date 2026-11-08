/* Seven original, sample-free fantasy scores for パル商人日記.
 * A score is scheduled one sixteenth-note step at a time by the audio manager.
 * The melodies, harmony and arrangements below were composed for this game.
 * This module only describes notes: importing it never creates audio resources.
 */
const metadata = [
  ['town', '灯りの帰り道', '町', 98, 8],
  ['dungeon-1-2', '若葉の探検路', '地下1–2階', 112, 8],
  ['dungeon-3-4', '水鏡の回廊', '地下3–4階', 90, 8],
  ['dungeon-5-6', '紅蓮の歯車', '地下5–6階', 128, 8],
  ['dungeon-7-8', '星灯りの遺跡', '地下7–8階', 106, 8],
  ['dungeon-9-10', '暁をひらく剣', '地下9–10階', 138, 16],
  ['swarm', '魔物たちの大騒ぎ', '魔物だまり', 156, 8],
];

export const TRACKS = Object.freeze(Object.fromEntries(metadata.map(([id, title, area, bpm, bars]) =>
  [id, Object.freeze({ id, title, area, bpm, bars })])));

export function getTrack(id) {
  return Object.hasOwn(TRACKS, id) ? TRACKS[id] : TRACKS.town;
}

const SCORES = {
  town: {
    chords: [[50,57,62,66],[47,54,59,62],[43,50,55,59],[45,52,57,61],
      [50,57,62,66],[54,57,61,66],[43,50,55,59],[45,52,57,61]],
    melody: [[74,78,81,78,76,74,69,73],[74,78,81,83,81,78,76,74],
      [71,74,78,76,74,71,67,69],[73,76,81,78,76,73,69,71],
      [74,78,81,86,85,81,78,76],[78,81,85,83,81,78,76,73],
      [74,78,79,78,74,71,69,67],[69,73,76,81,78,76,73,null]],
    rhythm: [0,3,4,6,8,10,12,14], lengths: [2.6,.8,1.7,1.6,1.6,1.6,1.6,1.4],
    lead: 'flute', leadLevel: .068,
  },
  'dungeon-1-2': {
    // E Dorian: a nimble call-and-response for the first uncertain steps.
    chords: [[40,47,52,55],[45,52,57,61],[38,45,50,54],[43,50,55,59],
      [40,47,52,55],[42,49,54,57],[45,52,57,61],[47,54,59,62]],
    melody: [[76,79,83,81,78,76,74,78],[81,85,88,null,85,83,81,78],
      [78,74,81,78,76,null,74,73],[74,79,83,81,79,78,76,74],
      [76,83,86,88,86,83,81,79],[78,81,85,83,81,78,76,73],
      [76,81,85,88,85,81,78,76],[78,83,86,83,78,74,73,null]],
    rhythm: [0,2,5,6,8,11,12,14], lengths: [1.5,2.4,.7,1.5,2.4,.7,1.5,1.4],
    lead: 'harp', leadLevel: .086,
  },
  'dungeon-3-4': {
    // Wide spaces between bell notes leave room for soft water-like answers.
    chords: [[45,52,57,60],[41,48,53,57],[48,55,60,64],[43,50,55,59],
      [45,52,57,60],[38,45,50,53],[41,48,53,57],[40,47,52,56]],
    melody: [[81,84,88,86,83],[81,77,84,88,86],[84,88,91,88,86],[83,86,90,88,83],
      [88,86,84,81,79],[81,77,74,77,81],[84,81,77,79,81],[80,83,88,83,null]],
    rhythm: [0,4,7,8,12], lengths: [3.5,2.4,.7,3.5,3.4],
    lead: 'bell', leadLevel: .051,
  },
  'dungeon-5-6': {
    // D minor, syncopated low strings and an insistent, but quiet, drum pulse.
    chords: [[38,45,50,53],[34,41,46,50],[41,48,53,57],[36,43,48,52],
      [38,45,50,53],[43,50,55,58],[34,41,46,50],[45,52,57,61]],
    melody: [[74,77,76,74,81,79,77,76],[77,82,81,77,74,72,74,77],
      [81,84,86,84,81,79,77,81],[79,76,72,76,79,82,81,79],
      [86,84,81,77,81,86,89,88],[86,82,79,77,79,82,86,84],
      [82,81,77,74,77,81,82,86],[85,81,76,73,76,81,85,null]],
    rhythm: [0,2,3,6,8,10,12,15], lengths: [1.4,.7,2.4,1.4,1.4,1.4,2.4,.7],
    lead: 'reed', leadLevel: .064,
  },
  'dungeon-7-8': {
    // B minor: an airy high melody above slowly moving suspended harmony.
    chords: [[47,54,59,62],[43,50,55,59],[50,57,62,66],[45,52,57,61],
      [40,47,52,55],[43,50,55,59],[47,54,59,62],[42,49,54,58]],
    melody: [[83,86,90,88,86,81],[83,86,91,90,86,83],[86,90,93,90,88,86],
      [85,88,92,90,88,85],[83,88,91,90,88,86],[86,91,95,93,90,86],
      [90,86,83,85,86,81],[82,85,90,88,85,null]],
    rhythm: [0,4,6,10,12,14], lengths: [3.4,1.5,3.4,1.4,1.5,1.4],
    lead: 'flute', leadLevel: .055,
  },
  'dungeon-9-10': {
    // A sixteen-bar C minor march: an opening call, ascent and final cadence.
    chords: [[36,43,48,51],[32,39,44,48],[39,46,51,55],[34,41,46,50],
      [36,43,48,51],[41,48,53,56],[32,39,44,48],[43,50,55,59],
      [36,43,48,51],[39,46,51,55],[44,51,56,60],[34,41,46,50],
      [41,48,53,56],[32,39,44,48],[43,50,55,59],[43,50,55,59]],
    melody: [[72,79,79,75,77,79,82,79],[80,79,75,72,68,72,75,79],
      [79,82,87,86,82,79,77,75],[77,82,86,84,82,80,77,74],
      [84,79,75,79,84,86,87,84],[89,87,84,80,77,80,84,87],
      [87,84,80,79,75,72,75,80],[83,79,74,71,74,79,83,null],
      [84,87,91,89,87,84,82,79],[87,86,82,79,82,87,91,89],
      [92,91,87,84,80,84,87,91],[89,86,82,80,77,80,82,86],
      [89,87,84,80,77,75,77,80],[87,84,80,75,72,75,80,84],
      [86,83,79,77,74,71,74,79],[83,86,91,86,83,79,74,null]],
    rhythm: [0,3,4,6,8,10,12,14], lengths: [2.5,.7,1.5,1.5,1.5,1.5,1.5,1.4],
    lead: 'reed', leadLevel: .067,
  },
  swarm: {
    // F-sharp minor: restless sixteenth-note pickups, quick bass and drum fills.
    chords: [[42,49,54,57],[38,45,50,54],[45,52,57,61],[40,47,52,56],
      [42,49,54,57],[47,54,59,62],[38,45,50,54],[49,56,61,65]],
    melody: [[78,81,85,84,81,78,76,78,81,85,88],[86,85,81,78,74,78,81,86,85,81,78],
      [85,88,90,88,85,81,83,85,88,92,90],[88,85,83,80,76,80,83,88,86,83,80],
      [90,88,85,81,78,81,85,90,93,92,90],[90,86,83,81,78,83,86,90,88,86,83],
      [86,85,81,78,74,78,81,86,85,81,78],[85,83,80,77,73,77,80,85,89,85,null]],
    rhythm: [0,1,3,4,6,8,9,11,12,14,15], lengths: [.65,1.4,.65,1.4,1.4,.65,1.4,.65,1.4,.65,.65],
    lead: 'reed', leadLevel: .061,
  },
};

export function scheduleMusicStep(id, n, time, { tone, percussion } = {}) {
  if (!Number.isSafeInteger(n) || n < 0 || !Number.isFinite(time) || time < 0 ||
      typeof tone !== 'function' || typeof percussion !== 'function') return;
  const track = getTrack(id), score = SCORES[track.id];
  const bar = Math.floor(n / 16) % track.bars, beat = n % 16, unit = 60 / track.bpm / 4;
  const chord = score.chords[bar], melody = score.melody[bar];
  const leadIndex = score.rhythm.indexOf(beat);
  if (leadIndex >= 0 && melody[leadIndex] !== null) {
    const note = melody[leadIndex];
    tone(note, time, unit * score.lengths[leadIndex], score.leadLevel, score.lead);
    if (track.id === 'dungeon-3-4') tone(note - 12, time + unit * .9, unit * 2.5, .018, 'flute');
    if (track.id === 'dungeon-7-8' && beat % 4 === 0) tone(note + 12, time + unit * .35, unit * 2.3, .013, 'bell');
    if (track.id === 'dungeon-9-10' && bar >= 8 && beat % 4 === 0) tone(note - 12, time + .008, unit * 1.6, .022, 'harp');
  }

  // Three sustained voices, never a full orchestral block over the melody.
  if (beat === 0) {
    const level = track.id === 'swarm' ? .014 : track.id === 'dungeon-3-4' ? .019 : .023;
    const length = track.id === 'swarm' ? 6 : track.id === 'dungeon-5-6' ? 7 : 13.2;
    for (const note of chord.slice(1)) tone(note + 12, time, unit * length, level, 'flute');
  }

  switch (track.id) {
    case 'town':
      if (beat % 4 === 0) tone(chord[beat === 8 ? 1 : 0], time, unit * 2.9, .07, 'triangle');
      if ([2,6,10,14].includes(beat)) tone(chord[[2,1,3,1][Math.floor(beat / 4)]] + 12, time, unit * 2.4, .041, 'harp');
      if (beat === 0 || beat === 8) percussion(time, 'kick', .36);
      if (beat === 4 || beat === 12) percussion(time, 'snare', .23);
      if (beat === 15 && bar % 2 === 1) tone(chord[3] + 24, time, unit * 2.5, .019, 'bell');
      break;
    case 'dungeon-1-2':
      if ([0,6,8,14].includes(beat)) tone(chord[beat % 8 === 6 ? 1 : 0], time, unit * 1.8, .078, 'triangle');
      if (beat % 4 === 3) tone(chord[[1,3,2,3][Math.floor(beat / 4)]] + 12, time, unit * 1.8, .038, 'flute');
      if (beat === 0 || beat === 10) percussion(time, 'kick', .4);
      if (beat === 4 || beat === 12) percussion(time, 'snare', .35);
      if (beat % 4 === 2) percussion(time, 'hat', .32);
      break;
    case 'dungeon-3-4':
      if (beat === 0 || beat === 8) tone(chord[beat === 8 ? 1 : 0], time, unit * 5.4, .068, 'sine');
      if ([2,6,10,14].includes(beat)) tone(chord[[2,3,1,3][Math.floor(beat / 4)]] + 24, time, unit * 3, .025, 'harp');
      if (beat === 0) percussion(time, 'kick', .22);
      if (beat === 12) percussion(time, 'snare', .17);
      if (beat === 6 || beat === 14) percussion(time, 'hat', .24);
      break;
    case 'dungeon-5-6':
      if ([0,3,6,8,11,14].includes(beat)) tone(chord[beat === 6 || beat === 14 ? 1 : 0], time, unit * 1.55, .09, 'triangle');
      if (beat % 2 === 1) tone(chord[[0,2,1,3][Math.floor(beat / 2) % 4]] + 12, time, unit * 1.4, .038, 'harp');
      if ([0,7,8,10].includes(beat)) percussion(time, 'kick', .62);
      if (beat === 4 || beat === 12) percussion(time, 'snare', .55);
      if (beat % 2 === 0) percussion(time, 'hat', beat % 4 === 0 ? .44 : .26);
      break;
    case 'dungeon-7-8':
      if (beat === 0 || beat === 8) tone(chord[beat === 8 ? 1 : 0], time, unit * 5.4, .064, 'triangle');
      if ([1,5,9,13].includes(beat)) tone(chord[[1,2,3,2][Math.floor(beat / 4)]] + 24, time, unit * 3.4, .021, 'bell');
      if (beat === 0 || beat === 8) percussion(time, 'kick', .27);
      if (beat === 12) percussion(time, 'snare', .21);
      if (beat === 3 || beat === 11) percussion(time, 'hat', .22);
      break;
    case 'dungeon-9-10':
      if (beat % 4 === 0 || beat === 14) tone(chord[beat === 8 || beat === 14 ? 1 : 0], time, unit * 2.6, .092, 'triangle');
      if (beat % 2 === 1) tone(chord[[0,1,2,3,2,1,3,1][Math.floor(beat / 2)]] + 24, time, unit * 1.8, .032, 'harp');
      if ([0,6,8,11].includes(beat)) percussion(time, 'kick', .65);
      if (beat === 4 || beat === 12 || bar % 4 === 3 && beat === 15) percussion(time, 'snare', beat === 15 ? .3 : .6);
      if (beat % 2 === 0) percussion(time, 'hat', beat % 4 === 0 ? .43 : .28);
      break;
    case 'swarm':
      if ([0,2,5,8,10,13,14].includes(beat)) tone(chord[beat === 5 || beat === 13 ? 1 : 0], time, unit * 1.1, .084, 'triangle');
      if ([2,5,7,10,13,15].includes(beat)) tone(chord[[2,1,3,2][Math.floor(beat / 4)]] + 12, time, unit * 1.2, .037, 'harp');
      if ([0,3,8,10].includes(beat)) percussion(time, 'kick', .65);
      if (beat === 4 || beat === 12 || bar % 2 === 1 && beat === 14) percussion(time, 'snare', beat === 14 ? .32 : .59);
      if (beat % 2 === 1) percussion(time, 'hat', beat % 4 === 1 ? .44 : .29);
      break;
  }
}
