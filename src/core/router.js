import { registerGuards } from 'vue-auth-helper';
import { createRouter, createWebHistory } from 'vue-router';
import { AuthService } from './auth/auth.service';
import { setTitle } from '../utils/head';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home',
        auth: true,
      },
      component: () => import('../features/habit/pages/HabitIndexPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        title: 'Profile',
        auth: true,
      },
      component: () => import('../features/profile/pages/ProfileIndexPage.vue'),
    },
    {
      path: '/info',
      name: 'info',
      meta: {
        title: 'Updates and Support',
        auth: true,
      },
      component: () => import('../common/pages/InfoPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login',
        guest: true,
      },
      component: () => import('../features/auth/pages/AuthLoginPage.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      meta: {
        title: 'Stats',
        auth: true,
      },
      component: () => import('../features/stats/pages/StatsIndexPage.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: {
        title: 'History',
        auth: true,
      },
      component: () => import('../features/history/pages/HistoryIndexPage.vue'),
    },
    {
      path: '/habits/:id',
      name: 'habits.detail',
      meta: {
        title: 'Habit Detail',
        auth: true,
      },
      component: () => import('../features/habit/pages/HabitDetailPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: {
        title: '404',
      },
      component: () => import('../common/pages/NotFoundPage.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  const loggedIn = await AuthService.getLoggedIn();

  if (to.matched.some((route) => route.meta.auth) && !loggedIn) {
    return { name: 'login' };
  }

  if (to.matched.some((route) => route.meta.guest) && loggedIn) {
    return { name: 'home' };
  }
});

router.beforeEach((to) => {
  const { title } = to.meta;

  setTitle(title);
});
