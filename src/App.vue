<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from './components/partials/AppNavbar.vue';

const activities = [
  {
    name: 'Ngoding Project',
    done: 3,
    target: 0,
    reset: 'daily',
    icon: 'twemoji:laptop-computer',
  },
  {
    name: 'Ngaji',
    done: 2,
    target: 5,
    reset: 'daily',
    icon: 'twemoji:open-book',
  },
  {
    name: 'Shalat Wajib di Masjid',
    done: 3,
    target: 5,
    reset: 'daily',
    icon: 'twemoji:mosque',
  },
  {
    name: 'Nulis Blog',
    done: 1,
    target: 1,
    reset: 'daily',
    icon: 'twemoji:writing-hand',
  },
  {
    name: 'Baca Dorar',
    done: 1,
    target: 0,
    reset: 'daily',
    icon: 'twemoji:thread',
  },
  {
    name: 'Baca Blog',
    done: 1,
    target: 0,
    reset: 'daily',
    icon: 'twemoji:bookmark-tabs',
  },
];
</script>

<template>
  <div
    class="text-gray-900 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white"
  >
    <AppNavbar />
    <div class="container px-4 mx-auto py-6 xl:py-8 space-y-4">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="activity in activities"
          :key="activity.name"
          class="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between gap-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex items-center justify-between">
            <p class="font-bold flex items-center gap-2 text-lg">
              <Icon :icon="activity.icon" />
              {{ activity.name }}
            </p>
            <button class="text-gray-500 dark:text-gray-400">
              <Icon icon="tabler:dots" />
            </button>
          </div>
          <div v-if="activity.target" class="space-y-1">
            <div class="w-full h-1.5 bg-gray-100 rounded dark:bg-gray-700">
              <div
                class="bg-sky-600 h-full rounded dark:bg-sky-400"
                :style="{
                  width: `${(activity.done / activity.target) * 100}%`,
                }"
              ></div>
            </div>
            <div
              class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
            >
              <span>{{ activity.done }}/{{ activity.target }}</span>
              <span>{{ (activity.done / activity.target) * 100 }} %</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500 dark:text-gray-400">Hari ini</p>
            <div class="flex items-center justify-end gap-2">
              <button
                class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700"
              >
                <Icon icon="tabler:minus" />
              </button>
              <p class="font-bold text-xl">{{ activity.done }}x</p>
              <button
                class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700"
              >
                <Icon icon="tabler:plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="hidden md:flex bg-sky-600 text-white h-10 rounded-lg px-4 items-center gap-2 font-bold"
      >
        <Icon icon="tabler:plus" class="size-5" />
        Tambah Habbit
      </button>
      <button
        class="size-10 bg-sky-600 text-white rounded-full flex items-center justify-center fixed bottom-4 right-4 md:hidden"
      >
        <Icon icon="tabler:plus" class="size-5" />
      </button>
    </div>
  </div>
</template>
