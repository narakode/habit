<script setup>
defineProps({
  padless: Boolean,
  bordered: Boolean,
});
</script>

<template>
  <div
    :class="[
      'bg-white rounded-lg dark:bg-gray-800 dark:text-white',
      padless ? '' : 'p-4',
      bordered ? 'border border-gray-200 dark:border-gray-700' : '',
    ]"
  >
    <slot />
  </div>
</template>
