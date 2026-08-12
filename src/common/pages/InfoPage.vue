<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../components/base/BaseCard.vue';
</script>

<template>
  <div class="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
    <BaseCard bordered class="space-y-4">
      <h2 class="font-bold text-xl">Version History</h2>
      <div class="space-y-2">
        <h3 class="font-bold">v0.0.1</h3>
        <ol class="space-y-1">
          <li class="flex items-center gap-1.5">
            <Icon
              icon="tabler:square-check"
              class="text-sky-600 dark:text-sky-400"
            />
            Habit Tracker
          </li>
          <li class="flex items-center gap-1.5">
            <Icon
              icon="tabler:square-check"
              class="text-sky-600 dark:text-sky-400"
            />
            User Stats
          </li>
        </ol>
      </div>
    </BaseCard>
    <BaseCard bordered class="space-y-4">
      <h2 class="font-bold text-xl">Next Feature</h2>
      <ol class="space-y-1">
        <li class="flex items-center gap-2">
          <Icon
            icon="tabler:square-dashed"
            class="text-gray-400 dark:text-gray-500"
          />
          Edit habit target and reset
        </li>
        <li class="flex items-center gap-2">
          <Icon
            icon="tabler:square-dashed"
            class="text-gray-400 dark:text-gray-500"
          />
          Edit timezone
        </li>
        <li class="flex items-center gap-2">
          <Icon
            icon="tabler:square-dashed"
            class="text-gray-400 dark:text-gray-500"
          />
          Pause habbit
        </li>
        <li class="flex items-center gap-2">
          <Icon
            icon="tabler:square-dashed"
            class="text-gray-400 dark:text-gray-500"
          />
          Edit profile
        </li>
        <li class="flex items-center gap-2">
          <Icon
            icon="tabler:square-dashed"
            class="text-gray-400 dark:text-gray-500"
          />
          Custom reset period
        </li>
      </ol>
      <p>
        Any ideas?
        <a
          href="https://forms.gle/YAhJDSMGyZb3ezxE6"
          class="text-sky-600 font-medium hover:underline dark:text-sky-400"
          target="_blank"
          >Request a Feature</a
        >.
      </p>
    </BaseCard>
    <BaseCard bordered class="space-y-4">
      <h2 class="font-bold text-xl">Support</h2>
      <p>Support us and follow us on our social media platforms.</p>
      <ol class="flex items-center gap-2">
        <li>
          <a
            href="https://x.com/narakode"
            target="_blank"
            class="size-8 flex items-center justify-center rounded-lg bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-600 hover:dark:bg-sky-700"
          >
            <Icon icon="tabler:brand-twitter-filled" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/narakode.id/"
            target="_blank"
            class="size-8 flex items-center justify-center rounded-lg bg-rose-500 text-white hover:bg-rose-600 dark:bg-rose-600 hover:dark:bg-rose-700"
          >
            <Icon icon="tabler:brand-instagram-filled" />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/narakode.id/"
            target="_blank"
            class="size-8 flex items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 hover:dark:bg-blue-700"
          >
            <Icon icon="tabler:brand-facebook-filled" />
          </a>
        </li>
      </ol>
    </BaseCard>
  </div>
</template>
