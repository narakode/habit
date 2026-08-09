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
import { subDate } from '../../../utils/date';

const route = useRoute();

const stats = reactive({
  totalActivities: 0,
  completedPeriod: 0,
});
const activityTrendsRange = { start: subDate(new Date(), 30), end: new Date() };
const activityTrendsData = ref([]);

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

watch(
  habitLoaded,
  (loaded) => {
    if (loaded) {
      loadStats();
      loadActivityTrends();
    }
  },
  { immediate: true },
);
</script>

<template>
  <BaseSkeleton v-if="!habitLoaded" class="h-40" />
  <div v-else-if="habit" class="space-y-6">
    <HabitCard :habit="habit" :with-link="false" />
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
  </div>
</template>
