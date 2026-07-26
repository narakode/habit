<script setup>
import { Icon } from '@iconify/vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import { theme, toggle } from '../../../core/theme';
import { login } from 'vue-auth-helper';
import HabitIndexScreenshot from '../../../assets/login/habit-index.png';
import HabitStatsScreenshot from '../../../assets/login/habit-stats.png';
import HabitHistoryScreenshot from '../../../assets/login/habit-history.png';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const screenshotList = [
  HabitIndexScreenshot,
  HabitStatsScreenshot,
  HabitHistoryScreenshot,
];
const screenshots = useTemplateRef('screenshots');
const currentScreenshotCarousel = ref(0);
const screenshotCarousel = ref(null);

function startScreenshotCareousel() {
  screenshotCarousel.value = setInterval(() => {
    if (currentScreenshotCarousel.value === screenshotList.length - 1) {
      currentScreenshotCarousel.value = 0;
    } else {
      currentScreenshotCarousel.value++;
    }
  }, 5000);
}
function stopScreenshotCareousel() {
  clearInterval(screenshotCarousel.value);
}

onMounted(() => startScreenshotCareousel());
onUnmounted(() => stopScreenshotCareousel());
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
          @click="login('test', {}, new Date())"
        >
          Login with Google
        </BaseButton>
      </form>
      <div class="relative aspect-[16/9] md:aspect-[4/3]">
        <img
          v-for="(screenshot, index) in screenshotList"
          :key="index"
          :class="[
            'w-full h-full rounded-t-lg object-cover object-top-left absolute inset-0 transition-all duration-500 md:rounded-tl-none md:rounded-r-lg',
            index === currentScreenshotCarousel ? 'z-10' : 'opacity-0',
          ]"
          ref="screenshots"
          :src="screenshot"
        />
      </div>
    </BaseCard>
  </div>
</template>
