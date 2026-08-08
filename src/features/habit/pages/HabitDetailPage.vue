<script setup>
import { ref } from 'vue';
import { HabitService } from '../habit.service';
import { useRoute } from 'vue-router';
import { setTitle } from '../../../utils/head';

const route = useRoute();

const habit = ref(null);

async function loadHabit() {
  const [res, err] = await HabitService.getSingleById(route.params.id);

  if (!err) {
    habit.value = { ...res };

    setTitle(habit.value.name);
  }
}

loadHabit();
</script>

<template>
  <div></div>
</template>
