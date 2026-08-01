<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { theme } from '../../../core/theme';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import { HabitService } from '../../habit/habit.service';

const maxDate = new Date();
const date = ref(new Date());
const loaded = ref(false);
const loading = ref(true);

const activities = ref([]);

async function loadActivities() {
  loading.value = true;

  const [res, err] = await HabitService.getDailyActivities(date.value);

  if (!err) {
    activities.value = res.data;
    loaded.value = true;
  }

  loading.value = false;
}

loadActivities();

watch(date, () => loadActivities());
</script>

<template>
  <div class="space-y-4 pb-8">
    <h1 class="font-bold text-3xl">Riwayat Aktifitas</h1>

    <div class="flex justify-end">
      <VueDatePicker
        class="w-full sm:w-auto"
        :time-config="{ enableTimePicker: false }"
        :input-attrs="{ clearable: false }"
        :max-date="maxDate"
        :dark="theme === 'dark'"
        v-model="date"
      />
    </div>

    <BaseSkeleton v-if="!loaded" class="h-40" />

    <template v-else>
      <BaseAlert v-if="loading" type="info" loading>Loading</BaseAlert>

      <div class="overflow-x-auto">
        <table
          class="bg-white w-full border border-gray-200 text-left dark:bg-gray-800 dark:border-gray-700"
        >
          <thead>
            <tr
              class="border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
              <th class="px-4 py-2">Habit</th>
              <th class="px-4 py-2">Dilakukan</th>
            </tr>
          </thead>
          <tbody v-if="!activities.length">
            <tr>
              <td class="px-4 py-3 text-gray-600 dark:text-gray-400">
                Tidak ada data
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr
              v-for="activity in activities"
              :key="activity.name"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="px-4 py-3">
                <div class="flex gap-2 items-center">
                  <Icon :icon="activity.icon" />
                  <p>{{ activity.name }}</p>
                </div>
              </td>
              <td class="px-4 py-3">{{ activity.done }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
