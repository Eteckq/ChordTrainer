export const state = () => ({
  displayNote: "both",
});

export const mutations = {
  setDisplayNote(state, display) {
    state.displayNote = display;
  },
};
