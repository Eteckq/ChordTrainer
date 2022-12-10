<template>
  <div class="h-screen bg-gray-900 w-screen text-white">
      <PianoController class="pt-10"/>
      <Nuxt />
  </div>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('midi/init')
  }
}
</script>