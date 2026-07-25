<script setup>
import AppNavbar from './components/partials/AppNavbar.vue';
</script>

<template>
  <div
    class="text-gray-900 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white"
  >
    <AppNavbar />
    <div class="container px-4 mx-auto py-6 xl:py-8">
      <router-view />
    </div>
  </div>
</template>
