<script setup>
import { computed, ref } from 'vue';
import { HabitService } from '../habit.service';
import { useRoute } from 'vue-router';
import { setTitle } from '../../../utils/head';
import HabitCard from '../components/HabitCard.vue';
import { findHabit, loaded } from '../habit.compose';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';

const route = useRoute();

const habit = computed(() => {
  const [found, err] = findHabit(route.params.id);

  if (err) {
    return null;
  }

  return found;
});
</script>

<template>
  <BaseSkeleton v-if="!loaded" class="h-40" />
  <template v-else>
    <HabitCard v-if="habit" :habit="habit" :with-link="false" />
  </template>
</template>
