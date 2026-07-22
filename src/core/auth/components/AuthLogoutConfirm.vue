<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';

const visible = defineModel('visible');

function onClose() {
  visible.value = false;
}
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition transition-duration-150"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition transition-duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/50 z-9999999 flex items-center justify-center"
    >
      <BaseCard class="space-y-4" v-click-outside="onClose">
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
  </Transition>
</template>
