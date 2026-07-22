<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';

const visible = defineModel('visible');
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 z-9999999 flex items-center justify-center"
  >
    <BaseCard class="space-y-4">
      <h2 class="font-bold text-xl">Logout</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Apakah anda yakin ingin keluar dari aplikasi?
      </p>
      <div class="flex gap-2 justify-end">
        <BaseButton color="error">Logout</BaseButton>
        <BaseButton @click="visible = false">Batal</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>
