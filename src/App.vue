<script setup>
import { computed } from 'vue';
import AppNavbar from './components/partials/AppNavbar.vue';
import { useRoute, useRouter } from 'vue-router';
import { setUser, user } from './core/auth/auth';
import { AuthService } from './core/auth/auth.service';
import { useHabit } from './features/habit/habit.compose.js';
import { useStreak } from './features/user-streak/user-streak.compose.js';

const router = useRouter();
const route = useRoute();
const { loadHabits } = useHabit();
const { loadStreak } = useStreak();

const userPage = computed(() => {
  return route.matched.some((route) => route.meta.auth);
});

async function init() {
  await setUser();

  if (!user.value) {
    router.push({ name: 'login' });
  } else {
    loadHabits();
    loadStreak();
  }
}

init();
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
