<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from './BaseCard.vue';

defineProps({
  title: String,
  width: {
    type: String,
    default: 'fit',
  },
});

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
      <div class="container px-4 mx-auto">
        <BaseCard
          :class="[
            title ? 'divide-y divide-gray-200' : '',
            'mx-auto',
            width === 'fit' ? 'w-fit' : 'max-w-xl',
          ]"
          :padless="!!title"
          v-click-outside="onClose"
        >
          <header v-if="title" class="p-4 flex items-center justify-between">
            <h2 class="text-xl font-bold">{{ title }}</h2>

            <button
              class="text-gray-600 cursor-pointer"
              @click="visible = false"
            >
              <Icon icon="tabler:x" />
            </button>
          </header>
          <div :class="[title ? 'p-4' : 'space-y-4']">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="p-4">
            <slot name="footer" :close="onClose" />
          </footer>
        </BaseCard>
      </div>
    </div>
  </Transition>
</template>
