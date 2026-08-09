<script setup>
import { Icon } from '@iconify/vue';
import BaseButton from './BaseButton.vue';

defineProps({
  icon: String,
  actionIcon: String,
  title: String,
  description: String,
  action: String,
});
defineEmits(['click-action']);
</script>

<template>
  <div class="flex flex-col items-center text-center gap-4">
    <Icon :icon="icon" class="size-14 text-gray-300 dark:text-gray-700" />
    <p class="font-bold text-3xl">{{ title }}</p>
    <p class="text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
    <BaseButton
      color="primary"
      :icon="actionIcon"
      @click="$emit('click-action')"
    >
      {{ action }}
    </BaseButton>
  </div>
</template>
