export const state = () => ({
  pressedNotes: [],
  highlightedNotes: [],
  startingOctave: 3,
  octaveCount: 2,
});
export const actions = {
  addAndPlayNote({ commit }, note) {
    this.dispatch('sounds/playNote', note)
    commit('addPressedNote', note)
  },
  removeAndStopNote({ commit }, number) {
    this.dispatch('sounds/stopNote', number)
    commit('removePressedNote', number)
  },
}


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
  removePressedNote(state, number) {
    state.pressedNotes = state.pressedNotes.filter((n) => n.number != number);
  },
};
