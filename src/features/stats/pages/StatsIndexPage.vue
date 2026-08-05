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
import { computed, reactive, ref } from 'vue';
import { theme } from '../../../core/theme';
import { StatService } from '../stats.service';
import {
  formatDate,
  getCalendar,
  getDaysRange,
  subDate,
} from '../../../utils/date.js';

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

const stats = reactive({
  currentStreak: {
    name: 'Streak Saat Ini',
    value: 0,
    unit: 'hari',
    icon: 'twemoji:fire',
  },
  longestStreak: {
    name: 'Rekor Streak',
    value: 0,
    unit: 'hari',
    icon: 'twemoji:trophy',
  },
  targetCompletion: {
    name: 'Rata-Rata Target',
    value: 0,
    unit: '%',
    icon: 'twemoji:bar-chart',
  },
  totalActivities: {
    name: 'Habit Dilakukan',
    value: 0,
    unit: 'kali',
    icon: 'twemoji:white-heavy-check-mark',
  },
  daysActive: {
    name: 'Hari Aktif',
    value: 0,
    unit: 'hari',
    icon: 'twemoji:calendar',
  },
});

const activityTrendsRange = { start: subDate(new Date(), 30), end: new Date() };
const activityTrendsData = ref([]);
const activityTrends = computed(() => {
  return {
    labels: getDaysRange(
      activityTrendsRange.start,
      activityTrendsRange.end,
      'DD MMM',
    ),
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
        data: activityTrendsData.value,
      },
    ],
  };
});

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

const currentMonth = new Date().getMonth();

const heatmapTitle = formatDate(new Date(), 'MMMM YYYY');
const heatmapDays = getCalendar(
  new Date().getMonth(),
  new Date().getFullYear(),
);
const heatmaps = ref({});

function getHeatMapColor(date) {
  const count = heatmaps.value[date];

  if (!count || count === 0) {
    return 'bg-gray-200 text-gray-500 dark:bg-gray-700';
  }

  if (count <= 2) {
    return 'bg-sky-200 text-sky-500 dark:bg-sky-900';
  }

  if (count <= 5) {
    return 'bg-sky-400 text-sky-100 dark:bg-sky-700';
  }

  if (count <= 8) {
    return 'bg-sky-600 text-sky-200 dark:bg-sky-500';
  }

  return 'bg-sky-800 text-sky-300 dark:bg-sky-300 dark:text-sky-700';
}

async function loadStreakStats() {
  const [res, err] = await StatService.getStreakStats();

  if (!err) {
    stats.currentStreak.value = res.currentStreakDate;
    stats.longestStreak.value = res.longestStreak;
  }
}
async function loadActivityStats() {
  const [res, err] = await StatService.getActivityStats();

  if (!err) {
    stats.totalActivities.value = res.totalActivities;
    stats.daysActive.value = res.daysActive;
  }
}
async function loadCompletionRate() {
  const [completionRate, err] = await StatService.getCompletionRate();

  if (!err) {
    stats.targetCompletion.value = completionRate;
  }
}
async function loadDailyDone() {
  const [dailyDone, err] =
    await StatService.getDailyDoneStats(activityTrendsRange);

  if (!err) {
    activityTrendsData.value = dailyDone;
  }
}
async function loadyHeatmaps() {
  const [dailyDone, err] = await StatService.getHeatmaps({
    start: heatmapDays[0],
    end: heatmapDays[heatmapDays.length - 1],
  });

  if (!err) {
    heatmaps.value = Object.fromEntries(
      dailyDone.map((item) => [item.date, item.done]),
    );
  }
}

loadStreakStats();
loadActivityStats();
loadCompletionRate();
loadDailyDone();
loadyHeatmaps();
</script>

<template>
  <div class="pb-8 grid gap-6 xl:grid-cols-2">
    <div class="col-span-full">
      <h1 class="font-bold text-3xl mb-4">Statistik</h1>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <BaseCard
          v-for="stat in Object.values(stats)"
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
        <p class="font-bold">{{ heatmapTitle }}</p>
        <div class="grid grid-cols-7 gap-2">
          <div class="text-xs text-center text-gray-600 dark:text-gray-400">
            Min
          </div>
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
          <div
            v-for="day in heatmapDays"
            :key="day"
            :class="[
              'size-6 text-xs flex items-center justify-center',
              getHeatMapColor(formatDate(day)),
              day.getMonth() !== currentMonth ? 'opacity-50' : '',
            ]"
            v-tooltip="
              `${formatDate(day, 'DD MMM')} : ${heatmaps[formatDate(day)] ?? 0} aktifitas`
            "
          >
            {{ day.getDate() }}
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
