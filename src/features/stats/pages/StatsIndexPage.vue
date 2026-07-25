<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import { Line } from 'vue-chartjs';
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Colors,
  Filler,
  Tooltip,
} from 'chart.js';
import { getChartColor } from '../../../core/chart/chart.util';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Colors,
  Filler,
  Tooltip,
);

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

const activityTrends = {
  labels: Array.from({ length: 30 }, (_, i) => i++),
  datasets: [
    {
      label: 'Habit Dilakukan',
      fill: true,
      backgroundColor: getChartColor('blue', 0.3),
      borderColor: getChartColor('blue'),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHitRadius: 12,
      data: [
        3, 5, 2, 0, 4, 6, 7, 5, 1, 2, 3, 4, 6, 8, 5, 4, 3, 2, 1, 0, 5, 6, 4, 7,
        8, 6, 5, 3, 4, 6,
      ],
    },
  ],
};
</script>

<template>
  <div class="pb-8 grid gap-6 xl:grid-cols-2">
    <div class="col-span-full">
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

    <div>
      <h2 class="font-bold text-2xl mb-4">Tren</h2>
      <BaseCard bordered>
        <Line :data="activityTrends" />
      </BaseCard>
    </div>
  </div>
</template>
