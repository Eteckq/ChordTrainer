<template>
  <div>
    <ChordSelector @chordSelected="(notes) => highlight(notes)" />
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
};
</script>
