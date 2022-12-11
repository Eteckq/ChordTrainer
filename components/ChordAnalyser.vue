<template>
  <div class="text-center">
    <span class="text-2xl text-gray-400 italic">Chords</span>
    <br>
    <p class="text-4xl mb-4" v-if="exactChord">
      {{ exactChord.note | translateNote($store.state.config.displayNote) }} {{ exactChord.chord }}
    </p>
    <p class="text-3xl text-gray-300" v-for="(chord, i) in renversedChords" :key="i">
      {{ chord.note | translateNote($store.state.config.displayNote) }} {{ chord.chord }}
      <span class="text-xl text-gray-500">(renversed)</span>
    </p>
  </div>
</template>

<script>
import chordsFinder from '~/mixins/chordsFinder.js'
export default {
  mixins: [chordsFinder],
  
};


</script>

<style></style>
