<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { getPercent } from '../../../utils/math';
import { theme } from '../../../core/theme';

const yesterday = new Date().setDate(new Date().getDate() - 1);

const date = ref(new Date(yesterday));

const activities = [
  {
    name: 'Read Book',
    icon: 'twemoji:open-book',
    done: 1,
  },
  {
    name: 'Meditation',
    icon: 'twemoji:person-in-lotus-position',
    done: 2,
  },
  {
    name: 'Journal',
    icon: 'twemoji:memo',
    done: 1,
  },
  {
    name: 'Drink Water',
    icon: 'twemoji:potable-water',
    done: 6,
    target: 8,
  },
  {
    name: 'Walk',
    icon: 'twemoji:person-walking',
    done: 5432,
    target: 8000,
  },
  {
    name: 'Push Up',
    icon: 'twemoji:flexed-biceps',
    done: 35,
    target: 50,
  },
  {
    name: 'Eat Fruits',
    icon: 'twemoji:red-apple',
    done: 3,
    target: 2,
  },
  {
    name: 'Practice Coding',
    icon: 'twemoji:laptop',
    done: 4,
  },
];
</script>

<template>
  <div class="space-y-4 pb-8">
    <h1 class="font-bold text-3xl">Riwayat Aktifitas</h1>

    <div class="flex justify-end">
      <VueDatePicker
        class="w-full sm:w-auto"
        :time-config="{ enableTimePicker: false }"
        :input-attrs="{ clearable: false }"
        :max-date="yesterday"
        :dark="theme === 'dark'"
        v-model="date"
      />
    </div>

    <div class="overflow-x-auto">
      <table
        class="bg-white w-full border border-gray-200 text-left dark:bg-gray-800 dark:border-gray-700"
      >
        <tr
          class="border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <th class="px-4 py-2">Habit</th>
          <th class="px-4 py-2">Target</th>
          <th class="px-4 py-2">Dilakukan</th>
          <th class="px-4 py-2">Tercapai</th>
        </tr>
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
          <td class="px-4 py-3">{{ activity.target ?? '-' }}</td>
          <td class="px-4 py-3">{{ activity.done }}</td>
          <td class="px-4 py-3">
            {{
              !activity.target
                ? '100%'
                : `${getPercent(activity.done, activity.target)}%`
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
