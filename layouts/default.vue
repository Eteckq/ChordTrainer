<template>
  <div class="h-screen bg-gray-900 w-screen text-white overflow-hidden">
    <Navbar />
    <PianoController />
    <Nuxt class="overflow-scroll bodyContent "/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("midi/init");
    this.$store.dispatch("sounds/init");
  },
};
</script>

<style>
.bodyContent {
  height: calc(100vh - 353px)
}
</style>