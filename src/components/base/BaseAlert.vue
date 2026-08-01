<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'error',
  },
  withClose: Boolean,
  loading: Boolean,
});
defineEmits(['close']);

const colorClass = computed(() => {
  return {
    error:
      'bg-red-100 border-red-200 text-red-800 dark:bg-red-500/20 dark:border-red-900 dark:text-red-400',
    info: 'bg-sky-100 border-sky-200 text-sky-800 dark:bg-sky-500/20 dark:border-sky-900 dark:text-sky-400',
  }[props.type];
});
const icon = computed(() => {
  return {
    error: 'tabler:alert-triangle-filled',
    info: 'tabler:alert-triangle-filled',
  }[props.type];
});
</script>

<template>
  <div :class="['border rounded-lg p-3 flex gap-2', colorClass]">
    <Icon
      :icon="loading ? 'gg:spinner' : icon"
      :class="['shrink-0 mt-1', loading ? 'animate-spin' : '']"
    />
    <p class="grow">
      <slot />
    </p>
    <button v-if="withClose" class="cursor-pointer" @click="$emit('close')">
      <Icon icon="tabler:x" class="shrink-0" />
    </button>
  </div>
</template>
