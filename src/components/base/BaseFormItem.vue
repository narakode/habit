<script setup>
import { useId } from 'vue';

defineProps({
  label: String,
});

const id = useId();
</script>

<template>
  <div>
    <label class="block mb-1" :for="id">{{ label }}</label>
    <slot :id="id" />
  </div>
</template>
