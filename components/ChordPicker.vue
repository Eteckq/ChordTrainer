<template>
  <div class="text-center">
    <!-- <select v-model="selectedBank" class="my-5 border rounded p-2" name="bank">
      <option v-for="(type, index) in ['chords']" :key="index" :value="type">
        {{ type }}
      </option>
    </select> -->

    <div class="border mt-8 border-gray-600 w-full grid grid-cols-12">
      <div
        v-for="note in notes"
        :key="note"
        class="grid-cols-1 border-r border-l border-gray-700 cursor-pointer"
        :class="{
          'text-black bg-gray-300': selectedFondamentales.includes(note),
        }"
        @click="selectFondamentale(note)"
      >
        {{ note | translateNote($store.state.config.displayNote) }}
      </div>
    </div>

    <div class="border mt-8 border-gray-600 w-full grid grid-cols-6">
      <div
        v-for="(value, index) in bank[selectedBank]"
        :key="index"
        class="grid-cols-1 border py-2 border-gray-700 cursor-pointer"
        :class="{ 'text-black bg-gray-300': selectedModes.includes(index) }"
        @click="selectMode(index)"
      >
        {{ index }}
      </div>
    </div>

    <!-- <h2 class="text-2xl font-light">
        <span v-if="selectedBank === 'scales'">Gamme</span
        ><span v-if="selectedBank === 'chords'">Accord</span>
      </h2> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBank: "chords",
      selectedModes: [],
      selectedFondamentales: [],
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
    selectedModes() {
      this.select();
    },
    selectedFondamentales() {
      this.select();
    },
  },
  mounted() {
    this.selectedModes = ["maj"];
    this.selectedFondamentales = this.notes;
  },
  methods: {
    selectMode(mode) {
      if (this.selectedModes.includes(mode)) {
        if (this.selectedModes.length == 1) return;
        this.selectedModes = this.selectedModes.filter((m) => m != mode);
      } else this.selectedModes.push(mode);
    },
    selectFondamentale(note) {
      if (this.selectedFondamentales.includes(note)) {
        if (this.selectedFondamentales.length == 1) return;
        this.selectedFondamentales = this.selectedFondamentales.filter(
          (n) => n != note
        );
      } else this.selectedFondamentales.push(note);
    },
    select() {
      this.$emit("chordsSelected", {
        modes: this.selectedModes,
        notes: this.selectedFondamentales,
      });
    },
  },
};
</script>
