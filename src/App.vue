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
    <div class="container px-4 mx-auto py-6">
      <div class="space-y-4">
        <div
          v-for="activity in activities"
          :key="activity.name"
          class="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div class="flex items-center justify-between">
            <p class="font-bold flex items-center gap-2 text-lg">
              <Icon :icon="activity.icon" />
              {{ activity.name }}
            </p>
            <button class="text-gray-500">
              <Icon icon="tabler:dots" />
            </button>
          </div>
          <div v-if="activity.target" class="space-y-1">
            <div class="w-full h-2 bg-gray-100 rounded">
              <div
                class="bg-blue-500 h-full rounded"
                :style="{
                  width: `${(activity.done / activity.target) * 100}%`,
                }"
              ></div>
            </div>
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <span>{{ activity.done }}/{{ activity.target }}</span>
              <span>{{ (activity.done / activity.target) * 100 }} %</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">Hari ini</p>
            <div class="flex items-center justify-end gap-2">
              <button
                class="w-8 h-8 flex items-center justify-center rounded border border-gray-200"
              >
                <Icon icon="tabler:minus" />
              </button>
              <p class="font-bold text-xl">{{ activity.done }}x</p>
              <button
                class="w-8 h-8 flex items-center justify-center rounded border border-gray-200"
              >
                <Icon icon="tabler:plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button>Tambah Habbit</button>
    </div>
  </div>
</template>
