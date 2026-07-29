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

  return {
    habits,
    loaded,
    loadHabits,
  };
}
