import { ref } from 'vue';

const habits = ref([]);

export const LocalHabitRepository = {
  getAll() {
    return habits.value;
  },
  create(data) {
    habits.value.push({
      ...data,
      done: 0,
    });
  },
};
