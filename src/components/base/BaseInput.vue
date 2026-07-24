<script setup>
const value = defineModel();
</script>

<template>
  <input
    class="w-full h-10 border-gray-300 rounded-lg px-3 focus:border-sky-600 focus:ring-sky-600"
    v-model="value"
  />
</template>
