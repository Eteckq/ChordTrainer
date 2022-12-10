<template>
  <div>
    <Piano
      :highlightedNotes="highlightedNotes"
      :pressedNotes="pressedNotes"
      :octaveLenght="2"
      :displayNotes="false"
      @onReleaseNote="(note) => removeNote(note)"
      @onClickNote="(note) => addNote(note)"
    />
    <ChordSelector @chordSelected="(notes) => highlight(notes)" />
  </div>
</template>

<script>
export default {
  name: "PianoController",
  data() {
    return {
      highlightedNotes: [],
      pressedNotes: [],
    };
  },
  methods: {
    highlight(notes) {
      this.highlightedNotes = notes;
    },
    addNote(number) {
      this.pressedNotes.push(number);
    },
    removeNote(number) {
      this.pressedNotes = this.pressedNotes.filter((n) => n != number);
    },
  },
};
</script>
