<template>
  <div>
    <ChordSelector class="mt-4 px-8" @chordSelected="(notes) => highlight(notes)" />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    highlight(notes) {
      this.$store.commit("piano/setLightNotes", notes);
    },
  },
  beforeDestroy(){
    this.$store.commit("piano/setLightNotes", [])
  },
};
</script>
