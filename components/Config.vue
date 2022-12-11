<template>
  <div>
    <h1>Config</h1>
    <ul>
      <li
        v-for="(display) of displayModes"
        :key="display"
        class="cursor-pointer"
        :class="{'text-green-300': activeDisplay == display}"
        @click="$store.commit('config/setDisplayNote', display)"
      >
        {{ display }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        displayModes: ["latine", "international", 'both']
    }
  },
  computed: {
    activeDisplay(){
        return this.$store.state.config.displayNote
    }
  }
}
</script>