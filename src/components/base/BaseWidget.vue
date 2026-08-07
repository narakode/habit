<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from './BaseCard.vue';

defineProps({
  icon: String,
  name: String,
  value: Number,
  unit: String,
});
</script>

<template>
  <BaseCard bordered class="space-y-2">
    <h3 class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
      <Icon :icon="icon" />
      {{ name }}
    </h3>
    <p class="font-bold text-xl">{{ value }} {{ unit }}</p>

    <slot name="add-content" />
  </BaseCard>
</template>
