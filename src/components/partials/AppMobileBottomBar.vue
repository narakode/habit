<script setup>
import { Icon } from '@iconify/vue';
import { navs } from '../../core/nav';
import { onMounted, onUnmounted, ref } from 'vue';
import { emitter } from '../../core/emitter';

const navActive = 'Home';
const hidden = ref(false);
const lastScrollY = ref(null);

function onScroll() {
  hidden.value = lastScrollY.value < window.scrollY;
  lastScrollY.value = window.scrollY;
}
function onOpenCreate() {
  emitter.emit('create-habit');
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
    <router-link
      v-for="nav in [
        { id: 'home', icon: 'tabler:home', name: 'Home' },
        ...navs,
      ]"
      :key="nav.id"
      :to="{ name: nav.id }"
      class="flex flex-col items-center justify-center"
    >
      <Icon
        :icon="nav.icon"
        :class="[
          'size-6',
          nav.id === $route.name ? 'text-sky-600 dark:text-sky-500' : '',
        ]"
      />
      <span
        :class="[
          'text-sm',
          nav.id === $route.name
            ? 'text-sky-600 font-medium dark:text-sky-500'
            : 'text-gray-500 dark:text-gray-400',
        ]"
        >{{ nav.name }}</span
      >
    </router-link>
  </nav>
  <button
    v-if="$route.name === 'home'"
    :class="[
      'size-12 bg-sky-600 text-white rounded-full flex items-center justify-center fixed right-4 md:hidden',
      hidden ? 'bottom-4' : 'bottom-20 sm:bottom-4',
    ]"
    @click="onOpenCreate"
  >
    <Icon icon="tabler:plus" class="size-5" />
  </button>
</template>
