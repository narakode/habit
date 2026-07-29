<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps({
  icon: String,
  color: String,
  surface: String,
  loading: Boolean,
});

const colorClassList = computed(() => {
  return {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 disabled:hover:bg-sky-600',
    error: 'bg-rose-600 text-white hover:bg-rose-700',
    white: [
      'bg-white text-gray-900',
      props.surface === 'light'
        ? 'border border-gray-200 hover:bg-gray-100'
        : '',
    ],
    light:
      'border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700',
  }[props.color ?? 'light'];
});
</script>

<template>
  <button
    :disabled="loading"
    :class="[
      'h-10 rounded-lg px-4 inline-flex items-center gap-2 font-medium cursor-pointer justify-center text-center disabled:cursor-not-allowed disabled:opacity-50',
      colorClassList,
    ]"
  >
    <Icon v-if="loading" icon="gg:spinner" class="size-4 animate-spin" />
    <Icon v-else-if="icon" :icon="icon" class="size-4" />
    <slot />
  </button>
</template>
