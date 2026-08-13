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
import BaseHeatmap from '../../../components/base/BaseHeatmap.vue';

const targetCompletion = ref(0);
const habitStats = reactive({
  totalActivities: 0,
  daysActive: 0,
});

const stats = computed(() => ({
  currentStreak: {
    name: 'Current Streak',
    value: currentStreak.value,
    unit: 'hari',
    icon: 'twemoji:fire',
  },
  longestStreak: {
    name: 'Longest Streak',
    value: longestStreak.value,
    unit: 'hari',
    icon: 'twemoji:trophy',
  },
  targetCompletion: {
    name: 'Completion Rate',
    value: targetCompletion.value,
    unit: '%',
    icon: 'twemoji:bar-chart',
  },
  totalActivities: {
    name: 'Total Activities',
    value: habitStats.totalActivities,
    unit: 'kali',
    icon: 'twemoji:white-heavy-check-mark',
  },
  daysActive: {
    name: 'Days Active',
    value: habitStats.daysActive,
    unit: 'hari',
    icon: 'twemoji:calendar',
  },
}));

const activityTrendsRange = { start: subDate(new Date(), 30), end: new Date() };
const activityTrendsData = ref([]);

const heatmapTitle = formatDate(new Date(), 'MMMM YYYY');
const heatmapDays = getCalendar(
  new Date().getMonth(),
  new Date().getFullYear(),
);
const heatmapDaysData = ref([]);

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

  const currentMonth = new Date().getMonth();

  if (!err) {
    heatmapDaysData.value = heatmapDays.map((day, i) => {
      const stat = dailyDone.find((item) => item.date === formatDate(day));
      const count = stat?.done ?? 0;

      return {
        id: i,
        count: count,
        disabled: day.getMonth() !== currentMonth,
        date: day,
        tooltip: `${formatDate(day, 'DD MMM')} : ${count} activities`,
      };
    });
  }
}

loadActivityStats();
loadCompletionRate();
loadDailyDone();
loadyHeatmaps();
</script>

<template>
  <div class="pb-8 grid gap-6 lg:grid-cols-2">
    <div class="col-span-full">
      <h1 class="font-bold text-3xl mb-4">Stats</h1>
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
      <h2 class="font-bold text-2xl mb-4">Trend</h2>
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
        <BaseHeatmap :days="heatmapDaysData" />
      </BaseCard>
    </div>
  </div>
</template>
