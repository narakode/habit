<script setup>
import AuthLogoutConfirm from '../../core/auth/components/AuthLogoutConfirm.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import AppMobileBottomBar from './AppMobileBottomBar.vue';
import { navs } from '../../core/nav';
import BaseDropdownItem from '../base/BaseDropdownItem.vue';
import { theme, toggle } from '../../core/theme';

const logoutVisible = ref(false);
</script>

<template>
  <nav
    class="bg-white border-b border-gray-200 h-14 flex items-center dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="container px-4 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-8">
        <router-link
          :to="{ name: 'home' }"
          class="flex items-center gap-2 font-bold"
        >
          <Icon icon="twemoji:clipboard" />
          Habit Tracker
        </router-link>
        <div class="hidden sm:flex sm:items-center sm:gap-4">
          <router-link
            v-for="nav in navs"
            :key="nav.id"
            :to="{ name: nav.id }"
            :class="[
              'flex items-center gap-2',
              $route.name !== nav.id
                ? 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                : 'text-sky-600 font-semibold hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-400',
            ]"
          >
            <Icon :icon="nav.icon" />
            {{ nav.name }}
          </router-link>
        </div>
      </div>
      <div class="flex items-center gap-2 dark:text-gray-300">
        <button class="cursor-pointer" @click="toggle">
          <Icon
            :icon="theme === 'light' ? 'tabler:moon' : 'tabler:sun-filled'"
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
              <BaseDropdownItem tag="a" icon="tabler:user" href="">
                Profile
              </BaseDropdownItem>
              <BaseDropdownItem
                icon="tabler:logout"
                @click="logoutVisible = true"
              >
                Logout
              </BaseDropdownItem>
            </div>
          </template>
        </VDropdown>
      </div>
    </div>
  </nav>
  <AppMobileBottomBar />
  <AuthLogoutConfirm v-model:visible="logoutVisible" />
</template>
