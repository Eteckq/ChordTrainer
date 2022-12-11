import Vue from "vue";

Vue.filter("translateNote", (value, display = 'international') => {
  switch (display) {
    case "latine":
      return {
        C: "Do",
        "C#": "Do#",
        D: "Ré",
        "D#": "Ré#",
        E: "Mi",
        F: "Fa",
        "F#": "Fa#",
        G: "Sol",
        "G#": "Sol#",
        A: "La",
        "A#": "La#",
        B: "Si",
      }[value]
    case "both":
      return value + " | " + {
        C: "Do",
        "C#": "Do#",
        D: "Ré",
        "D#": "Ré#",
        E: "Mi",
        F: "Fa",
        "F#": "Fa#",
        G: "Sol",
        "G#": "Sol#",
        A: "La",
        "A#": "La#",
        B: "Si",
      }[value]
    case "international":
    default:
      return value
  }
  ;
});
