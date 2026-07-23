<script setup>
defineProps({
  padless: Boolean,
});
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700',
      padless ? '' : 'p-4',
    ]"
  >
    <slot />
  </div>
</template>
