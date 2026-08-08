<script setup>
defineProps({
  name: String,
  label: String,
  inputValue: null,
  disabled: Boolean,
});

const checked = defineModel();
</script>

<template>
  <label class="inline-flex items-center gap-2">
    <input
      type="radio"
      :name="name"
      :value="inputValue"
      :disabled="disabled"
      class="border-gray-300 disabled:opacity-75 checked:border-sky-600 checked:bg-sky-600 checked:disabled:border-gray-400 checked:disabled:bg-gray-400 focus:ring-sky-600 dark:bg-gray-700 dark:border-gray-700 dark:ring-offset-gray-800"
      v-model="checked"
    />
    <p :class="disabled ? 'opacity-50' : ''">
      {{ label }}
    </p>
  </label>
</template>
