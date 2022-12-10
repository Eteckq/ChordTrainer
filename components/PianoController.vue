<template>
  <div>
    <Piano
      :highlightedNotes="highlightedNotes"
      :pressedNotes="pressedNotes"
      :octaveLenght="octaveLenght"
      :displayNotes="false"
      @onReleaseNote="(note) => removeNote(note)"
      @onClickNote="(note) => addNote(note)"
    />
    
  </div>
</template>

<script>
export default {
  name: "PianoController",
  data() {
    return {
    };
  },
  computed: {
    octaveLenght(){
      return this.$store.state.piano.octaveCount
    },
    pressedNotes(){
      return this.$store.state.piano.pressedNotes
    },
    highlightedNotes(){
      return this.$store.state.piano.highlightedNotes
    },
  },
  methods: {
    addNote(note) {
      this.$store.commit('piano/addPressedNote', note)
    },
    removeNote(note) {
      this.$store.commit('piano/removePressedNote', note)
    },
  },
};
</script>
