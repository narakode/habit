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
    const { data, error } = await supabase
      .from('habits')
      .insert(form)
      .select()
      .limit(1)
      .single();

    if (error) {
      return [null, error];
    }

    return [data, null];
  },
  async update(id, form) {
    const { data, error } = await supabase
      .from('habits')
      .update(form)
      .eq('id', id)
      .select()
      .limit(1)
      .single();

    if (error) {
      return [null, error];
    }

    return [data, null];
  },
  delete(id) {
    const deleteIndex = habits.findIndex((habit) => habit.id === id);

    habits.splice(deleteIndex, 1);
  },
};
