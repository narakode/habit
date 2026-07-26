import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home',
      },
      component: () => import('../features/habit/pages/HabitIndexPage.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      meta: {
        title: 'Stats',
      },
      component: () => import('../features/stats/pages/StatsIndexPage.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        title: 'History',
      },
      component: () => import('../features/history/pages/HistoryIndexPage.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const { title } = to.meta;
  const appTitle = import.meta.env.VITE_APP_TITLE;

  document.title = title ? `${title} - ${appTitle}` : appTitle;
});
