import { supabase } from '../../../core/supabase';

export const SupabaseHabitRepository = {
  async getAll() {
    const { data, error, count } = await supabase
      .from('current_progress_habits')
      .select();

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
  async delete(id) {
    const { error } = await supabase.from('habits').delete().eq('id', id);

    if (error) {
      return [null, error];
    }

    return [true, null];
  },
};
