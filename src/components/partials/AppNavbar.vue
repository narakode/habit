<script setup>
import { Icon } from '@iconify/vue';
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
      <a href="">
        <Icon icon="tabler:user" />
        <span class="hidden">Profile</span>
      </a>
      <a href="" class="hidden">Logout</a>
    </div>
  </nav>
</template>
