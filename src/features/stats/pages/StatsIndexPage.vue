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
import { computed } from 'vue';
import { theme } from '../../../core/theme';

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

const activityChartOptions = computed(() => {
  return {
    scales: {
      x: {
        grid: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
        ticks: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
      },
      y: {
        grid: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
        ticks: {
          color: theme.value === 'light' ? '#d1d5db' : '#4b5563',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.value === 'light' ? '#4b5563' : '#d1d5db',
        },
      },
    },
  };
});

const heatmaps = [
  3, 0, 1, 5, 2, 4, 6, 0, 3, 2, 1, 7, 4, 5, 0, 2, 3, 1, 6, 4, 2, 0, 5, 3, 7, 2,
  1, 4, 3, 5, 2,
];

function getHeatMapColor(count) {
  if (count === 0) {
    return 'bg-gray-200 dark:bg-gray-700';
  }

  if (count <= 2) {
    return 'bg-sky-200 dark:bg-sky-900';
  }

  if (count <= 5) {
    return 'bg-sky-400 dark:bg-sky-700';
  }

  if (count <= 8) {
    return 'bg-sky-600 dark:bg-sky-500';
  }

  return 'bg-sky-800 dark:bg-sky-300';
}
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
        <Line :data="activityTrends" :options="activityChartOptions" />
      </BaseCard>
    </div>

    <div>
      <h2 class="font-bold text-2xl mb-4">Heatmap</h2>
      <BaseCard
        bordered
        class="flex flex-col items-center justify-center gap-2"
      >
        <p class="font-bold">Juli 2026</p>
        <div class="grid grid-cols-7 gap-2">
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Sen
          </div>
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Sel
          </div>
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Rab
          </div>
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Kam
          </div>
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Jum
          </div>
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Sab
          </div>
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Min
          </div>
          <div
            v-for="day in heatmaps"
            :key="day"
            :class="['size-6', getHeatMapColor(day)]"
            v-tooltip="`${day} aktifitas`"
          ></div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
