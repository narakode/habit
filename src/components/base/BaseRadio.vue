<script setup>
defineProps({
  name: String,
  label: String,
});
</script>

<template>
  <label class="inline-flex items-center gap-2">
    <input
      type="radio"
      :name="name"
      class="border-gray-300 checked:border-sky-600 checked:bg-sky-600 focus:ring-sky-600"
    />
    {{ label }}
  </label>
</template>
