import { readonly, ref } from 'vue';
import { HabitService } from './habit.service';

const _habits = ref({
  data: [],
  total: 0,
});
const _loaded = ref(false);

export function useHabit() {
  const habits = readonly(_habits);
  const loaded = readonly(_loaded);

  async function loadHabits() {
    const [res, err] = await HabitService.getAll();

    _habits.value = res;
    _loaded.value = true;
  }

  async function createHabit(data) {
    const [res, err] = await HabitService.create(data);

    if (err) {
      return [null, err];
    }

    _habits.value.data.push(res);
    _habits.value.total++;

    return [res, err];
  }

  async function updateHabit(id, data) {
    const [res, err] = await HabitService.update(id, data);

    if (err) {
      return [null, err];
    }

    const index = habits.value.data.findIndex((habit) => habit.id === id);

    _habits.value.data[index] = { ...res };

    return [res, err];
  }

  async function deleteHabit(id, data) {
    const [res, err] = await HabitService.delete(id, data);

    if (err) {
      return [null, err];
    }

    const index = habits.value.data.findIndex((habit) => habit.id === id);

    _habits.value.data.splice(index, 1);

    return [res, err];
  }

  return {
    habits,
    loaded,
    loadHabits,
    createHabit,
    updateHabit,
    deleteHabit,
  };
}
