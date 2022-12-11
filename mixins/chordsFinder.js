export default {
  data() {
    return {
      renversedChords: [],
      exactChord: null,
    };
  },
  computed: {
    chords() {
      return this.$store.state.bank.chords;
    },
  },
  methods: {
    findChordsFromNotes(notes) {
      this.renversedChords = [];
      this.exactChord = null;
      for (let c in this.chords) {
        for (let n in this.chords[c]) {
          if (equalExactOrder(this.chords[c][n], notes)) {
            this.exactChord = { note: n, chord: c };
          } else if (equalsIgnoreOrder(this.chords[c][n], notes))
            this.renversedChords.push({ note: n, chord: c });
        }
      }
    },
  },
  watch: {
    "$store.state.piano.pressedNotes"(pressedNotes) {
      if (pressedNotes.length > 0) {
        this.findChordsFromNotes([
          ...new Set(
            [...pressedNotes]
              .sort((a, b) => a.number - b.number)
              .map((n) => n.name)
          ),
        ]);
      }
    },
  },
};

function equalsIgnoreOrder(a, b) {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
}

function equalExactOrder(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
