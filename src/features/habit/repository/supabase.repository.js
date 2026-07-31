import { supabase } from '../../../core/supabase';
import { formatDate } from '../../../utils/date';
import { toHabit } from '../habit.dto';

export const SupabaseHabitRepository = {
  async getAll() {
    const { data, error, count } = await supabase.rpc(
      'get_daily_progress_habits',
      { p_date: formatDate(new Date(), 'YYYY-MM-DD') },
    );

    if (error) {
      return [null, error];
    }

    return [{ data, total: count }, null];
  },
  async getCurrentProgress(id) {
    const { data, error } = await supabase
      .rpc('get_daily_progress_habits', {
        p_date: formatDate(new Date(), 'YYYY-MM-DD'),
      })
      .eq('id', id)
      .limit(1)
      .single();

    if (error) {
      return [null, error];
    }

    return [
      {
        id: data.id,
        name: data.name,
        icon: data.icon,
        reset: data.reset,
        target: data.target,
        done: data.done,
      },
      null,
    ];
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

    return [
      toHabit({
        id: data.id,
        name: data.name,
        icon: data.icon,
        reset: data.reset,
        target: data.target,
        done: 0,
      }),
      null,
    ];
  },
  async update(id, form) {
    const { data, error } = await supabase
      .from('habits')
      .update(form)
      .eq('id', id);

    if (error) {
      return [null, error];
    }

    return this.getCurrentProgress(id);
  },
  async delete(id) {
    const { error } = await supabase.from('habits').delete().eq('id', id);

    if (error) {
      return [null, error];
    }

    return [true, null];
  },
};
