<script setup>
defineProps({
  name: String,
  label: String,
  inputValue: null,
});

const checked = defineModel();
</script>

<template>
  <label class="inline-flex items-center gap-2">
    <input
      type="radio"
      :name="name"
      :value="inputValue"
      class="border-gray-300 checked:border-sky-600 checked:bg-sky-600 focus:ring-sky-600 dark:bg-gray-700 dark:border-gray-700 dark:ring-offset-gray-800"
      v-model="checked"
    />
    {{ label }}
  </label>
</template>
