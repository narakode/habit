<script setup>
defineProps({
  days: Array,
});

function getHeatMapColor(count) {
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
</script>

<template>
  <div class="grid grid-cols-7 gap-2">
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Sen</div>
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Sel</div>
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Rab</div>
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Kam</div>
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Jum</div>
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Sab</div>
    <div class="text-xs text-center text-gray-600 dark:text-gray-400">Min</div>
    <div
      v-for="day in days"
      :key="day.id"
      :class="[
        'size-6 text-xs flex items-center justify-center',
        getHeatMapColor(day.count),
        day.disabled ? 'opacity-50' : '',
      ]"
      v-tooltip="day.tooltip"
    >
      {{ day.date.getDate() }}
    </div>
  </div>
</template>
