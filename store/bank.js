const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const types = {
  maj: [4, 7],
  min: [3, 7],
  5: [7],
  7: [4, 7, 10],
  dim: [3, 6],
  aug: [4, 8],
  sus2: [2, 7],
  sus4: [5, 7],
  6: [4, 7, 9],
  maj7: [4, 7, 11],
  "7sus4": [5, 7, 10],
  9: [2, 4, 7, 10],
  add9: [2, 4, 7],
  min6: [3, 7, 9],
  min7: [3, 7, 10],
  min7b5: [3, 6, 10],
  min9: [2, 3, 7, 10],
  11: [2, 4, 5, 7, 10],
  13: [2, 4, 7, 9, 10],
  "9b": [1, 4, 7, 10],
  "9#": [3, 4, 7, 10],
  "13b": [2, 4, 7, 8, 10],
  "7dim": [3, 6, 9],
  "7b5": [4, 6, 10],
};
function translateNote(note) {
  return notes[note % notes.length];
}

function noteBuilder(intervals) {
  const accords = {};
  // Pour chaque fondamentales
  for (let fondamentale = 0; fondamentale < notes.length; fondamentale++) {
    const accord = [];
    accord.push(translateNote(fondamentale));
    for (const interval of intervals) {
      accord.push(translateNote(fondamentale + interval));
    }
    accords[notes[fondamentale]] = accord;
  }
  return accords;
}

let chords = {};
for (let type in types) {
  chords[type] = noteBuilder(types[type]);
}

export const state = () => ({
  chords,
  notes,
});
