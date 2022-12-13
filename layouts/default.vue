<template>
  <div class="h-screen bg-gray-900 w-screen text-white overflow-hidden">
    <Navbar />
    <PianoController />
    <Nuxt class="overflow-y-scroll bodyContent" />
    <!-- Right Panel -->
    <div v-if="false" class="absolute right-0 top-0 bottom-0 bg-gray-700 border-l w-1/5">
      <Config />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("midi/init", {notif: this.$toast});
    this.$store.dispatch("sounds/init");
  },
};
</script>

<style>
.bodyContent {
  height: calc(100vh - 353px);
}
</style>
