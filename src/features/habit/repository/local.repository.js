import { ref } from 'vue';

const habits = [];

export const LocalHabitRepository = {
  getAll() {
    return habits;
  },
  create(data) {
    habits.push({
      ...data,
      id: Date.now(),
      done: 0,
    });
  },
  update(id, data) {
    const updateIndex = habits.findIndex((habit) => habit.id === id);
    habits[updateIndex] = {
      ...habits[updateIndex],
      ...data,
    };
  },
  delete(id) {
    const deleteIndex = habits.findIndex((habit) => habit.id === id);

    habits.splice(deleteIndex, 1);
  },
};
