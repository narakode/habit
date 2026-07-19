<script setup>
import AppNavbar from './components/partials/AppNavbar.vue';

const activities = [
  {
    name: 'Ngoding Project',
    done: 3,
    target: 0,
    targetPeriod: null,
  },
  {
    name: 'Ngaji',
    done: 2,
    target: 5,
    targetPeriod: 'daily',
  },
  {
    name: 'Shalat Wajib di Masjid',
    done: 3,
    target: 5,
    targetPeriod: 'daily',
  },
  {
    name: 'Nulis Blog',
    done: 1,
    target: 1,
    targetPeriod: 'daily',
  },
  {
    name: 'Baca Dorar',
    done: 1,
    target: 0,
    targetPeriod: null,
  },
  {
    name: 'Baca Blog',
    done: 1,
    target: 0,
    targetPeriod: null,
  },
];
</script>

<template>
  <div class="text-slate-900 min-h-screen dark:bg-slate-900 dark:text-white">
    <AppNavbar />
    <ul>
      <li v-for="activity in activities" :key="activity.name">
        <p>{{ activity.name }}</p>
        <button>Action</button>
        <template v-if="activity.target">
          <progress :max="activity.target" :value="activity.done"></progress>
          <p>Target: {{ activity.target }}/{{ activity.targetPeriod }}</p>
        </template>
        <p>
          <button>-</button>
          {{ activity.done }}x
          <button>+</button>
        </p>
      </li>
    </ul>
    <button>Tambah Habbit</button>
  </div>
</template>
