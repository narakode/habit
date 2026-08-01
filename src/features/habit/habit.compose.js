import { readonly, ref } from 'vue';
import { HabitService } from './habit.service';
import { debounce } from '../../utils/debounce';

const habits = ref({
  data: [],
  total: 0,
});
const _loaded = ref(false);

export function useHabit() {
  const loaded = readonly(_loaded);

  async function loadHabits() {
    const [res, err] = await HabitService.getDailyProgress(new Date());

    habits.value = res;
    _loaded.value = true;
  }

  async function createHabit(data) {
    const [res, err] = await HabitService.create(data);

    if (err) {
      return [null, err];
    }

    habits.value.data.push(res);
    habits.value.total++;

    return [res, err];
  }

  async function updateHabit(id, data) {
    const [res, err] = await HabitService.update(id, data);

    if (err) {
      return [null, err];
    }

    const index = habits.value.data.findIndex((habit) => habit.id === id);

    habits.value.data[index] = { ...res };

    return [res, err];
  }

  async function deleteHabit(id, data) {
    const [res, err] = await HabitService.delete(id, data);

    if (err) {
      return [null, err];
    }

    const index = habits.value.data.findIndex((habit) => habit.id === id);

    habits.value.data.splice(index, 1);

    return [res, err];
  }

  const updateDoneDebounce = debounce(async (id, done) => {
    const index = habits.value.data.findIndex((habit) => habit.id === id);

    habits.value.data[index].persistedDone += done;

    await HabitService.updateDone(id, done);
  }, 500);

  async function updateDone(id, done) {
    const index = habits.value.data.findIndex((habit) => habit.id === id);

    habits.value.data[index].done += done;

    updateDoneDebounce(
      id,
      habits.value.data[index].done - habits.value.data[index].persistedDone,
    );
  }

  return {
    habits,
    loaded,
    loadHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    updateDone,
  };
}
