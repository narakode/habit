<script setup>
const value = defineModel();
</script>

<template>
  <input
    class="w-full h-10 bg-transparent border-gray-300 rounded-lg px-3 disabled:bg-gray-50 focus:border-sky-600 focus:ring-sky-600 dark:disabled:bg-gray-700 dark:disabled:opacity-50 dark:border-gray-700 dark:placeholder-gray-400"
    v-model="value"
  />
</template>
