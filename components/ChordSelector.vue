<template>
  <div class="text-center">
    <!-- <select v-model="selectedBank" class="my-5 border rounded p-2" name="bank">
      <option v-for="(type, index) in ['chords']" :key="index" :value="type">
        {{ type }}
      </option>
    </select> -->

    <select
      v-model="selectedFondamentale"
      class="my-5 border rounded p-2 text-black"
      name="bank"
    >
      <option v-for="note in notes" :key="note" :value="note">
        {{ note }}
      </option>
    </select>
    <select
      v-model="selectedMode"
      class="my-5 border rounded p-2 text-black"
      name="bank"
    >
      <option
        v-for="(type, index) in bank[selectedBank]"
        :key="index"
        :value="index"
      >
        {{ index }}
      </option>
    </select>

    <!-- <h2 class="text-2xl font-light">
        <span v-if="selectedBank === 'scales'">Gamme</span
        ><span v-if="selectedBank === 'chords'">Accord</span>
      </h2> -->
    <span class="text-4xl">{{ selectedFondamentale }}</span
    ><span class="text-xl">{{ selectedMode }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBank: "chords",
      selectedMode: null,
      selectedFondamentale: null,
    };
  },
  computed: {
    notes() {
      return this.$store.state.bank.notes;
    },
    bank() {
      return this.$store.state.bank;
    },
  },
  watch: {
    selectedBank() {
      this.select();
    },
    selectedMode() {
      this.select();
    },
    selectedFondamentale() {
      this.select();
    },
  },
  methods: {
    selectMode(mode) {
      if (this.selectedMode === mode) this.selectedMode = null;
      else this.selectedMode = mode;
    },
    selectFondamentale(note) {
      if (this.selectedFondamentale === note) this.selectedFondamentale = null;
      else this.selectedFondamentale = note;
    },
    select() {
      if (this.selectedBank && this.selectedMode && this.selectedFondamentale) {
        if (!this.bank[this.selectedBank][this.selectedMode]) {
          this.selectedMode = "maj";
        }
        const accord =
          this.bank[this.selectedBank][this.selectedMode][
            this.selectedFondamentale
          ];

        this.$emit("chordSelected", accord);
      }
    },
  },
};
</script>
