<script setup>
import { computed } from 'vue';
import AppNavbar from './components/partials/AppNavbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const userPage = computed(() => {
  return route.matched.some((route) => route.meta.auth);
});
</script>

<template>
  <div
    :class="[
      'text-gray-900 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white',
      userPage ? '' : 'flex items-center justify-center',
    ]"
  >
    <AppNavbar v-if="userPage" />
    <div class="container px-4 mx-auto py-6 xl:py-8">
      <router-view />
    </div>
  </div>
</template>
