export const state = () => ({
  pressedNotes: [],
  highlightedNotes: [],
  startingOctave: 4,
  octaveCount: 1,
});

export const mutations = {
  setStartingOctave(state, octave) {
    state.startingOctave = octave;
  },
  setOctaveCount(state, count) {
    state.octaveCount = count;
  },
  setLightNotes(state, notes) {
    state.highlightedNotes = notes;
  },
  addPressedNote(state, note) {
    state.pressedNotes.push(note);
  },
  removePressedNote(state, note) {
    state.pressedNotes = state.pressedNotes.filter((n) => n.number != note.number);
  },
};
