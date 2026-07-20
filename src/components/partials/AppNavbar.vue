<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const theme = ref(
  document.documentElement.classList.contains('dark') ? 'dark' : 'light',
);

function onToggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';

  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', theme.value);
}
</script>

<template>
  <nav
    class="bg-white border-b border-gray-200 h-14 flex items-center dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="container px-4 mx-auto flex items-center justify-between">
      <a href="" class="flex items-center gap-2 font-bold">
        <Icon icon="twemoji:clipboard" />
        Habbit Tracker
      </a>
      <div class="flex items-center gap-2">
        <button @click="onToggleTheme">
          <Icon
            :icon="
              theme === 'dark' ? 'tabler:moon-filled' : 'tabler:sun-filled'
            "
          />
          <span class="hidden">Profile</span>
        </button>
        <a href="">
          <Icon icon="tabler:user" />
          <span class="hidden">Profile</span>
        </a>
      </div>
    </div>
  </nav>
</template>
