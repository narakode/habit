import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../features/habit/pages/HabitIndexPage.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../features/stats/pages/StatsIndexPage.vue'),
    },
  ],
});
