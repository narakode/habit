<script setup>
import { Icon } from '@iconify/vue';

const icons = [
  // Health
  'twemoji:person-running',
  'twemoji:person-walking',
  'twemoji:bicycle',
  'twemoji:person-in-lotus-position',
  'twemoji:flexed-biceps',
  'twemoji:red-heart',
  'twemoji:pill',
  'twemoji:stethoscope',

  // Sleep
  'twemoji:bed',
  'twemoji:alarm-clock',

  // Food & Drink
  'twemoji:red-apple',
  'twemoji:green-salad',
  'twemoji:bread',
  'twemoji:glass-of-milk',
  'twemoji:potable-water',
  'twemoji:hot-beverage',

  // Study
  'twemoji:open-book',
  'twemoji:books',
  'twemoji:pencil',
  'twemoji:brain',

  // Work
  'twemoji:laptop',
  'twemoji:briefcase',
  'twemoji:calendar',
  'twemoji:chart-increasing',

  // Home
  'twemoji:house',
  'twemoji:broom',
  'twemoji:shopping-cart',
  'twemoji:key',

  // Finance
  'twemoji:money-bag',
  'twemoji:coin',
  'twemoji:credit-card',

  // Hobby
  'twemoji:musical-notes',
  'twemoji:guitar',
  'twemoji:camera',
  'twemoji:artist-palette',
  'twemoji:video-game',

  // Spiritual
  'twemoji:folded-hands',
  'twemoji:mosque',

  // Travel
  'twemoji:automobile',
  'twemoji:airplane',

  // Nature
  'twemoji:seedling',
  'twemoji:sun',

  // Productivity
  'twemoji:clipboard',
  'twemoji:bookmark',
  'twemoji:check-mark-button',
  'twemoji:hourglass-done',

  // Other
  'twemoji:star',
  'twemoji:fire',
  'twemoji:trophy',
];

const selected = defineModel('twemoji:star');
</script>

<template>
  <VDropdown class="h-full" placement="bottom-start">
    <button
      type="button"
      class="size-10 flex items-center justify-center border border-gray-300 rounded-l-lg cursor-pointer hover:bg-gray-100"
    >
      <Icon :icon="selected" />
    </button>
    <template #popper>
      <div class="min-w-40 max-h-40 overflow-y-scroll grid grid-cols-4 p-1">
        <div
          v-for="icon in icons"
          :key="icon"
          class="h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
          @click="selected = icon"
        >
          <Icon :icon="icon" />
        </div>
      </div>
    </template>
  </VDropdown>
</template>
