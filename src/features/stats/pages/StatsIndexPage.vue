<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import { computed, reactive, ref } from 'vue';
import { StatService } from '../stats.service';
import {
  formatDate,
  getCalendar,
  getDaysRange,
  subDate,
} from '../../../utils/date.js';
import {
  currentStreak,
  longestStreak,
} from '../../user-streak/user-streak.compose.js';
import BaseWidget from '../../../components/base/BaseWidget.vue';
import ActivityLineChart from '../components/ActivityLineChart.vue';

const targetCompletion = ref(0);
const habitStats = reactive({
  totalActivities: 0,
  daysActive: 0,
});

const stats = computed(() => ({
  currentStreak: {
    name: 'Streak Saat Ini',
    value: currentStreak.value,
    unit: 'hari',
    icon: 'twemoji:fire',
  },
  longestStreak: {
    name: 'Rekor Streak',
    value: longestStreak.value,
    unit: 'hari',
    icon: 'twemoji:trophy',
  },
  targetCompletion: {
    name: 'Rata-Rata Target',
    value: targetCompletion.value,
    unit: '%',
    icon: 'twemoji:bar-chart',
  },
  totalActivities: {
    name: 'Habit Dilakukan',
    value: habitStats.totalActivities,
    unit: 'kali',
    icon: 'twemoji:white-heavy-check-mark',
  },
  daysActive: {
    name: 'Hari Aktif',
    value: habitStats.daysActive,
    unit: 'hari',
    icon: 'twemoji:calendar',
  },
}));

const activityTrendsRange = { start: subDate(new Date(), 30), end: new Date() };
const activityTrendsData = ref([]);

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

async function loadActivityStats() {
  const [res, err] = await StatService.getActivityStats();

  if (!err) {
    habitStats.totalActivities = res.totalActivities;
    habitStats.daysActive = res.daysActive;
  }
}
async function loadCompletionRate() {
  const [completionRate, err] = await StatService.getCompletionRate();

  if (!err) {
    targetCompletion.value = completionRate;
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
        <BaseWidget
          v-for="stat in Object.values(stats)"
          :key="stat.name"
          bordered
          :icon="stat.icon"
          :name="stat.name"
          :value="stat.value"
          :unit="stat.unit"
        />
      </div>
    </div>

    <div>
      <h2 class="font-bold text-2xl mb-4">Tren</h2>
      <BaseCard bordered>
        <ActivityLineChart
          :data="activityTrendsData"
          :start="activityTrendsRange.start"
          :end="activityTrendsRange.end"
        />
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
