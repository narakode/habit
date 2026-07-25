<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';

const stats = [
  {
    name: 'Streak Saat Ini',
    value: 18,
    unit: 'hari',
    icon: 'twemoji:fire',
  },
  {
    name: 'Rekor Streak',
    value: 42,
    unit: 'hari',
    icon: 'twemoji:trophy',
  },
  {
    name: 'Rata-Rata Target',
    value: 84,
    unit: '%',
    icon: 'twemoji:bar-chart',
  },
  {
    name: 'Habit Dilakukan',
    value: 1248,
    unit: 'kali',
    icon: 'twemoji:white-heavy-check-mark',
  },
  {
    name: 'Hari Aktif',
    value: 167,
    unit: 'hari',
    icon: 'twemoji:calendar',
  },
];
</script>

<template>
  <div class="pb-8">
    <h1 class="font-bold text-3xl mb-4">Statistik</h1>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <BaseCard
        v-for="stat in stats"
        :key="stat.name"
        bordered
        class="space-y-2"
      >
        <h3 class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Icon :icon="stat.icon" />
          {{ stat.name }}
        </h3>
        <p class="font-bold text-xl">{{ stat.value }} {{ stat.unit }}</p>
      </BaseCard>
    </div>
  </div>
</template>
