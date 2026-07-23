<script setup>
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';

defineProps({
  title: String,
  message: String,
  confirmText: String,
  cancelText: String,
});

const visible = defineModel('visible');

function onClose() {
  visible.value = false;
}
</script>

<template>
  <BaseModal v-model:visible="visible">
    <h2 class="font-bold text-xl">{{ title }}</h2>
    <p class="text-gray-600 dark:text-gray-400">
      {{ message }}
    </p>
    <div class="flex gap-2 justify-end">
      <BaseButton color="error">{{ confirmText }}</BaseButton>
      <BaseButton @click="visible = false">{{ cancelText }}</BaseButton>
    </div>
  </BaseModal>
</template>
