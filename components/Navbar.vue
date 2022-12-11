<template>
  <nav
    class="px-2 bg-gray-900 w-full border-b border-gray-600"
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <div class="items-center justify-between w-full flex">
        <ul
          class="flex p-4 rounded-lg flex-row space-x-8 mt-0 text-sm font-medium bg-gray-900 border-gray-700"
        >
          <li>
            <NuxtLink
              to="/"
              exact-active-class="text-blue-700"
              class="hover:text-blue-700 text-gray-400 border-gray-700"
              >Chord Picker</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/analyser"
              exact-active-class="text-blue-700"
              class="hover:text-blue-700 text-gray-400 border-gray-700"
              >Chord Analyser</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/analyser"
              exact-active-class="text-blue-700"
              class="hover:text-blue-700 text-gray-400 border-gray-700"
              >Services</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/analyser"
              exact-active-class="text-blue-700"
              class="hover:text-blue-700 text-gray-400 border-gray-700"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
