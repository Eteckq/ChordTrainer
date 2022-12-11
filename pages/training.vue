<template>
  <div>
    <div class="flex justify-center  my-2">
      <div v-if="!started" @click="started = true" class="cursor-pointer text-white bg-green-600 hover:bg-opacity-80 rounded-md py-3 px-6 text-5xl">Start !</div>
      <div v-else @click="started = false" class="cursor-pointer text-white bg-red-500 hover:bg-opacity-80 rounded-md py-3 px-6 text-5xl">Stop</div>
    </div>
    <ChordPicker class="mt-4 px-8" v-if="!started" @chordsSelected="selectChords" />
    <ChordTrainer v-if="started" :selectedNotes="selectedNotes" :selectedChords="selectedChords" />
  </div>
</template>

<script>
export default {
  name: "TrainingPage",
  data() {
    return {
      started: false,
      selectedChords: [],
      selectedNotes: [],
    };
  },
  methods: {
    selectChords(chords){
      this.selectedNotes = chords.notes
      this.selectedChords = chords.modes
    }
  },
};
</script>
