<script setup>
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
  <nav>
    <a href="">Habbit Tracker</a>
    <a href="">Profile</a>
    <a href="">Logout</a>
  </nav>
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
</template>
