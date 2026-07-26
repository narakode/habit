<script setup>
import { Icon } from '@iconify/vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import { theme, toggle } from '../../../core/theme';
</script>

<template>
  <div class="max-w-sm md:max-w-screen-md mx-auto">
    <div class="mb-4 flex justify-between text-gray-600 dark:text-gray-400">
      <a href="" class="text-sm">narakode.id</a>
      <button class="cursor-pointer" @click="toggle">
        <Icon
          :icon="theme === 'light' ? 'tabler:moon-filled' : 'tabler:sun-filled'"
        />
      </button>
    </div>
    <BaseCard padless bordered class="grid md:grid-cols-2">
      <form
        action=""
        class="p-6 min-h-48 flex flex-col justify-between order-last md:order-first"
      >
        <div>
          <h1 class="font-bold text-xl mb-1">Welcome To Habit Tracker</h1>
          <p class="text-gray-600 dark:text-gray-400">
            Sign in with your google account below
          </p>
        </div>
        <BaseButton
          :surface="theme"
          icon="tabler:brand-google-filled"
          color="white"
        >
          Login with Google
        </BaseButton>
      </form>
      <div>
        <div
          class="bg-gray-200 aspect-[16/9] w-full rounded-t-lg md:aspect-[4/3] md:rounded-tl-none md:rounded-r-lg dark:bg-gray-700"
        ></div>
      </div>
    </BaseCard>
  </div>
</template>
