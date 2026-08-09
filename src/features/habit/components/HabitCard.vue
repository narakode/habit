<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseDropdownItem from '../../../components/base/BaseDropdownItem.vue';
import { getPercent } from '../../../utils/math';
import { updateDone } from '../habit.compose';

defineProps({
  habit: {
    type: Object,
    required: true,
  },
  withLink: {
    type: Boolean,
    default: true,
  },
});
defineEmits(['edit', 'delete']);

const targetLabel = {
  daily: 'Hari ini',
  weekly: 'Minggu ini',
  monthly: 'Bulan ini',
};
</script>

<template>
  <BaseCard bordered class="flex flex-col justify-between gap-4">
    <div class="flex items-center justify-between">
      <component
        :is="withLink ? 'router-link' : 'p'"
        :to="{ name: 'habits.detail', params: { id: habit.id } }"
        :class="[
          'font-bold flex items-center gap-2 text-lg',
          withLink ? 'hover:underline' : '',
        ]"
      >
        <Icon :icon="habit.icon" />
        {{ habit.name }}
      </component>
      <VDropdown placement="bottom-end">
        <button class="text-gray-500 dark:text-gray-400 cursor-pointer">
          <Icon icon="tabler:dots" />
        </button>

        <template #popper>
          <div class="py-1 min-w-30">
            <BaseDropdownItem icon="tabler:edit" @click="$emit('edit', habit)"
              >Edit</BaseDropdownItem
            >
            <BaseDropdownItem
              icon="tabler:trash"
              @click="$emit('delete', habit)"
              >Delete</BaseDropdownItem
            >
          </div>
        </template>
      </VDropdown>
    </div>
    <div v-if="habit.target" class="space-y-1">
      <div class="w-full h-1.5 bg-gray-100 rounded dark:bg-gray-700">
        <div
          class="bg-sky-600 h-full rounded dark:bg-sky-400"
          :style="{
            width: `${getPercent(habit.done, habit.target)}%`,
          }"
        ></div>
      </div>
      <div
        class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
      >
        <span>{{ habit.done }}/{{ habit.target }}</span>
        <span>{{ getPercent(habit.done, habit.target) }} %</span>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ targetLabel[habit.reset] }}
      </p>
      <div class="flex items-center justify-end gap-2">
        <button
          :disabled="habit.done === 0"
          class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 cursor-poiner hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:disabled:bg-gray-700"
          @click="updateDone(habit.id, -1)"
        >
          <Icon icon="tabler:minus" />
        </button>
        <p class="font-bold text-xl">{{ habit.done }}x</p>
        <button
          class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 cursor-poiner hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:disabled:bg-gray-700"
          @click="updateDone(habit.id, 1)"
        >
          <Icon icon="tabler:plus" />
        </button>
      </div>
    </div>
  </BaseCard>
</template>
