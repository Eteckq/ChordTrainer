<template>
  <div>
    <Piano
      :highlightedNotes="highlightedNotes"
      :pressedNotes="pressedNotes"
      :octaveLenght="octaveLenght"
      :isLoaded="isLoaded"
      :displayNotes="false"
      :startingOctave="startingOctave"
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
    startingOctave(){
      return this.$store.state.piano.startingOctave
    },
    isLoaded(){
      return this.$store.state.sounds.loaded
    }
  },
  methods: {
    addNote(note) {
      this.$store.dispatch('piano/addAndPlayNote', note)
    },
    removeNote(note) {
      this.$store.dispatch('piano/removeAndStopNote', note.number)
    },
  },
};
</script>
