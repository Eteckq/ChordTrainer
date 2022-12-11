<template>
  <div class="text-center">
    <span class="text-2xl text-gray-400 italic">Chords</span>
    <br>
    <p class="text-3xl" v-for="(chord, i) in chordsDetecteds" :key="i">
      {{ chord.note }} {{ chord.chord }}
      <span class="text-xl text-gray-500" v-if="chord.renversed">(renversed)</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chordsDetecteds: [],
    };
  },
  computed: {
    chords() {
      return this.$store.state.bank.chords;
    },
  },
  watch: {
    "$store.state.piano.pressedNotes"(pressedNotes) {
      if (pressedNotes.length > 0){
        this.findChordFromNotes([...new Set([...pressedNotes].sort((a,b) => a.number - b.number).map((n) => n.name))]);
      }
    },
  },
  methods: {
    findChordFromNotes(notes) {
      this.chordsDetecteds = [];
      for (let c in this.chords) {
        for (let n in this.chords[c]) {
          let chord = null;
          if (equalsIgnoreOrder(this.chords[c][n], notes))
            chord = { note: n, chord: c, renversed: true };
          if (equalExactOrder(this.chords[c][n], notes))
            chord.renversed = false;
          if (chord) this.chordsDetecteds.push(chord);
        }
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
</script>

<style></style>
