<template>
  <div class="mx-36">
    <h1>List of connected MIDI Devices:</h1>
    <ul>
      <li
        v-for="(device, index) of devices"
        :key="index"
        @click="$store.dispatch('midi/setupInput', device)"
      >
        {{ device.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    devices() {
      return this.$store.state.midi.devices
    },
  },
  created() {
    console.log(this.inputs)
  },
}
</script>