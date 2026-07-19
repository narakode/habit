<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <nav
    class="border-b border-slate-300 h-14 flex items-center dark:border-slate-800"
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
