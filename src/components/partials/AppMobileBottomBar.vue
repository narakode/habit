<script setup>
import { Icon } from '@iconify/vue';
import { navs } from '../../core/nav';
import { onMounted, onUnmounted, ref } from 'vue';

const navActive = 'Home';
const hidden = ref(false);
const lastScrollY = ref(null);

function onScroll() {
  hidden.value = lastScrollY.value < window.scrollY;
  lastScrollY.value = window.scrollY;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <nav
    :class="[
      'fixed bottom-0 left-0 bg-white border-t w-full h-16 border-gray-200 grid grid-cols-3 dark:bg-gray-800 dark:border-gray-600 sm:hidden',
      hidden ? 'hidden' : '',
    ]"
  >
    <a
      v-for="nav in [{ icon: 'tabler:home', name: 'Home' }, ...navs]"
      :key="nav.name"
      href=""
      class="flex flex-col items-center justify-center"
    >
      <Icon
        :icon="nav.icon"
        :class="[
          'size-6',
          nav.name === navActive ? 'text-sky-600 dark:text-sky-500' : '',
        ]"
      />
      <span
        :class="[
          'text-sm',
          nav.name === navActive
            ? 'text-sky-600 font-semibold dark:text-sky-500'
            : 'text-gray-500 dark:text-gray-400',
        ]"
        >{{ nav.name }}</span
      >
    </a>
  </nav>
  <button
    :class="[
      'size-12 bg-sky-600 text-white rounded-full flex items-center justify-center fixed right-4 md:hidden',
      hidden ? 'bottom-4' : 'bottom-20 sm:bottom-4',
    ]"
  >
    <Icon icon="tabler:plus" class="size-5" />
  </button>
</template>
