<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  icon: String,
});
</script>

<template>
  <component
    :is="tag"
    class="w-full flex items-center px-3 py-2 gap-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
  >
    <Icon v-if="icon" :icon="icon" class="text-gray-400 dark:text-gray-500" />
    <slot />
  </component>
</template>
