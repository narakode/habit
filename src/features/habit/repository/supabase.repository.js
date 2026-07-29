import { supabase } from '../../../core/supabase';

export const SupabaseHabitRepository = {
  async getAll() {
    const { data, error, count } = await supabase.from('habits').select();

    if (error) {
      return [null, error];
    }

    return [{ data, total: count }, null];
  },
  async create(form) {
    const { data, error } = await supabase.from('habits').insert(form);

    if (error) {
      return [null, error];
    }

    return [data, null];
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
