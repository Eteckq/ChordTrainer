<template>
  <div class="text-center">
    <p class="text-gray-500 italic">Found: {{ score }}</p>
    <div class="flex-col justify-center items-center" v-if="currentChord">
      <p class="text-4xl my-2">
        {{ currentChord.note | translateNote($store.state.config.displayNote) }}
        {{ currentChord.mode }}
      </p>
      <p class="text-2xl text-gray-600  my-2">
        {{ nextChord.note | translateNote($store.state.config.displayNote) }}
        {{ nextChord.mode }}
      </p>
    </div>
    <p v-else>{{ timer }}..</p>
  </div>
</template>

<script>
import chordsFinder from "~/mixins/chordsFinder.js";
export default {
  mixins: [chordsFinder],
  data() {
    return {
      nextChord: null,
      currentChord: null,
      timer: 3,
      score: 0,
    };
  },
  watch: {
    exactChord(val) {
      if (val && this.currentChord) {
        this.compareChord(val);
      }
    },
  },
  props: {
    selectedNotes: {
      type: Array,
    },
    selectedChords: {
      type: Array,
    },
  },
  mounted() {
    setTimeout(() => {
      this.timer--;
      setTimeout(() => {
        this.timer--;
        setTimeout(() => {
          this.goToNextChord();
        }, 1000);
      }, 1000);
    }, 1000);
  },
  methods: {
    pickRandomChord() {
      return {
        mode: this.selectedChords[
          Math.floor(Math.random() * this.selectedChords.length)
        ],
        note: this.selectedNotes[Math.floor(Math.random() * this.selectedNotes.length)],
      };
    },
    goToNextChord() {
      if (this.nextChord) {
        this.currentChord = this.nextChord;
      } else {
        this.currentChord = this.pickRandomChord();
      }
      this.nextChord = this.pickRandomChord();
    },
    compareChord(notes) {
      // console.log(
      //   notes.note,
      //   this.currentChord.note,
      //   notes.chord,
      //   this.currentChord.mode
      // );
      if (
        notes.note == this.currentChord.note &&
        notes.chord == this.currentChord.mode
      ) {
        this.goToNextChord();
        this.score++;
      }
    },
  },
};
</script>

<style></style>
