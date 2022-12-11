import Vue from 'vue'

Vue.filter('toLatine', (value) => {
  return {
    C: 'Do',
    'C#': 'Do#',
    D: 'Ré',
    'D#': 'Ré#',
    E: 'Mi',
    F: 'Fa',
    'F#': 'Fa#',
    G: 'Sol',
    'G#': 'Sol#',
    A: 'La',
    'A#': 'La#',
    B: 'Si',
  }[value]
})