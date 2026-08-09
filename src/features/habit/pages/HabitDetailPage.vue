<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { HabitService } from '../habit.service';
import { useRoute } from 'vue-router';
import { setTitle } from '../../../utils/head';
import HabitCard from '../components/HabitCard.vue';
import { findHabit, loaded as habitLoaded } from '../habit.compose';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseWidget from '../../../components/base/BaseWidget.vue';
import { StatService } from '../../stats/stats.service';
import { getTotalPeriod } from '../../stats/stats.utils';
import { getPercent } from '../../../utils/math';
import BaseCard from '../../../components/base/BaseCard.vue';
import ActivityLineChart from '../../stats/components/ActivityLineChart.vue';
import { formatDate, getCalendar, subDate } from '../../../utils/date';
import BaseHeatmap from '../../../components/base/BaseHeatmap.vue';
import HabitDeleteConfirm from '../components/HabitDeleteConfirm.vue';
import HabitFormModal from '../components/HabitFormModal.vue';
import { Icon } from '@iconify/vue';
import BaseState from '../../../components/base/BaseState.vue';

const route = useRoute();

const stats = reactive({
  totalActivities: 0,
  completedPeriod: 0,
});
const activityTrendsRange = { start: subDate(new Date(), 30), end: new Date() };
const activityTrendsData = ref([]);
const heatmapTitle = formatDate(new Date(), 'MMMM YYYY');
const heatmapDays = getCalendar(
  new Date().getMonth(),
  new Date().getFullYear(),
);
const heatmapDaysData = ref([]);
const editModalVisible = ref(false);
const deleteConfirmVisible = ref(false);

const habit = computed(() => {
  const [found, err] = findHabit(route.params.id);

  if (err) {
    return null;
  }

  return found;
});

async function loadStats() {
  const [res, err] = await StatService.getHabitStats(route.params.id);

  if (!err) {
    stats.totalActivities = res.totalActivities;
    stats.completedPeriod = getPercent(
      res.completedPeriod,
      getTotalPeriod(habit.value.reset, habit.value.createdAt),
    );
  }
}
async function loadActivityTrends() {
  const [res, err] = await StatService.getDailyDoneStats(
    activityTrendsRange,
    route.params.id,
  );

  if (!err) {
    activityTrendsData.value = res;
  }
}
async function loadyHeatmaps() {
  const [daysDone, err] = await StatService.getHeatmaps(
    {
      start: heatmapDays[0],
      end: heatmapDays[heatmapDays.length - 1],
    },
    route.params.id,
  );

  const currentMonth = new Date().getMonth();

  if (!err) {
    heatmapDaysData.value = heatmapDays.map((day, i) => {
      const stat = daysDone.find((item) => item.date === formatDate(day));
      const count = stat?.done ?? 0;

      return {
        id: i,
        count: count,
        disabled: day.getMonth() !== currentMonth,
        date: day,
        tooltip: `${formatDate(day, 'DD MMM')} : ${count} aktifitas`,
      };
    });
  }
}

watch(
  habitLoaded,
  (loaded) => {
    if (loaded && habit.value) {
      loadStats();
      loadActivityTrends();
      loadyHeatmaps();
    }
  },
  { immediate: true },
);
</script>

<template>
  <BaseSkeleton v-if="!habitLoaded" class="h-40" />
  <template v-else>
    <BaseState
      v-if="!habit"
      icon="tabler:ghost-3"
      title="Habit Tidak Ditemukan"
      description="Habit yang diakses tidak dapat ditemukan"
      action="Kembali"
      action-icon="tabler:arrow-back-up"
      @click-action="$router.back()"
    />
    <div v-else class="space-y-6">
      <nav class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <RouterLink
          :to="{ name: 'home' }"
          class="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400"
        >
          <Icon icon="tabler:home" />
          Home
        </RouterLink>
        <span class="text-gray-400 dark:text-gray-500">
          <Icon icon="tabler:chevron-right" />
        </span>
        <span class="text-gray-400 dark:text-gray-500">Detail Habit</span>
      </nav>
      <HabitCard
        :habit="habit"
        :with-link="false"
        @edit="editModalVisible = true"
        @delete="deleteConfirmVisible = true"
      />
      <div>
        <h2 class="font-bold text-2xl mb-4">Statistik</h2>
        <div
          class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <BaseWidget
            icon="twemoji:white-heavy-check-mark"
            name="Total Aktifitas"
            :value="stats.totalActivities"
            unit="x"
          />
          <BaseWidget
            v-if="habit.target"
            icon="twemoji:bar-chart"
            name="Target Tercapai"
            :value="stats.completedPeriod"
            unit="%"
          />
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
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
            <BaseHeatmap :days="heatmapDaysData" />
          </BaseCard>
        </div>
      </div>
      <HabitDeleteConfirm
        :id="route.params.id"
        v-model:visible="deleteConfirmVisible"
        @deleted="$router.push({ name: 'home' })"
      />
      <HabitFormModal :habit="habit" v-model:visible="editModalVisible" />
    </div>
  </template>
</template>
