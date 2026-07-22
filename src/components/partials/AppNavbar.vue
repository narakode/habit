<script setup>
import AuthLogoutConfirm from '../../core/auth/components/AuthLogoutConfirm.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import AppMobileBottomBar from './AppMobileBottomBar.vue';
import { navs } from '../../core/nav';

const theme = ref(
  document.documentElement.classList.contains('dark') ? 'dark' : 'light',
);
const logoutVisible = ref(false);

function onToggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';

  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', theme.value);
}
</script>

<template>
  <nav
    class="bg-white border-b border-gray-200 h-14 flex items-center dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="container px-4 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-8">
        <a href="" class="flex items-center gap-2 font-bold">
          <Icon icon="twemoji:clipboard" />
          Habbit Tracker
        </a>
        <div class="hidden sm:flex sm:items-center sm:gap-4">
          <a
            v-for="nav in navs"
            :key="nav.name"
            href=""
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <Icon :icon="nav.icon" />
            {{ nav.name }}
          </a>
        </div>
      </div>
      <div class="flex items-center gap-2 dark:text-gray-300">
        <button class="cursor-pointer" @click="onToggleTheme">
          <Icon
            :icon="
              theme === 'dark' ? 'tabler:moon-filled' : 'tabler:sun-filled'
            "
          />
          <span class="hidden">Profile</span>
        </button>
        <a href="" class="sm:hidden">
          <Icon icon="tabler:user" />
        </a>
        <VDropdown placement="bottom-end">
          <button
            class="hidden cursor-pointer sm:flex items-center justify-center"
          >
            <Icon icon="tabler:user" />
          </button>

          <template #popper>
            <div class="min-w-48 py-1">
              <div class="px-3 py-2 gap-2 dark:text-white">
                <p>Ahmad</p>
                <p class="text-gray-500 text-sm dark:text-gray-400">@ahmad</p>
              </div>
              <hr class="border-gray-200 mb-1 dark:border-gray-700" />
              <a
                href=""
                class="w-full flex items-center px-3 py-2 gap-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <Icon
                  icon="tabler:user"
                  class="text-gray-500 dark:text-gray-400"
                />
                Profile
              </a>
              <button
                class="w-full flex items-center px-3 py-2 gap-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                @click="logoutVisible = true"
              >
                <Icon
                  icon="tabler:logout"
                  class="text-gray-500 dark:text-gray-400"
                />
                Logout
              </button>
            </div>
          </template>
        </VDropdown>
      </div>
    </div>
  </nav>
  <AppMobileBottomBar />
  <AuthLogoutConfirm v-model:visible="logoutVisible" />
</template>
