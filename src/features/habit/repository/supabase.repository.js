import { supabase } from '../../../core/supabase';
import { formatDate } from '../../../utils/date';
import { toActivityStats, toHabit, toHabits } from '../habit.dto';

export const SupabaseHabitRepository = {
  async getAll() {
    const { data, error, count } = await supabase.from('habits').select();

    if (error) {
      return [null, error];
    }

    return [
      {
        data: data.map((item) =>
          toHabit({
            id: item.id,
            createdAt: item.created_at,
            completedTarget: item.completed_periods,
            icon: item.icon,
            name: item.name,
            reset: item.reset,
            target: item.target,
          }),
        ),
        total: count,
      },
      null,
    ];
  },
  async getDailyProgress(date = new Date()) {
    const { data, error, count } = await supabase.rpc(
      'get_daily_progress_habits',
      { p_date: formatDate(date, 'YYYY-MM-DD') },
    );

    if (error) {
      return [null, error];
    }

    return [{ data: toHabits(data), total: count }, null];
  },
  async getDailyActvities(date = new Date()) {
    const { data, error, count } = await supabase.rpc(
      'get_daily_activities_habits',
      { p_date: formatDate(date, 'YYYY-MM-DD') },
    );

    if (error) {
      return [null, error];
    }

    return [{ data: toHabits(data), total: count }, null];
  },
  async getActivityStats() {
    const { data, error } = await supabase.rpc('get_user_habit_stats').single();

    if (error) {
      return [null, error];
    }

    return [
      toActivityStats({
        daysActive: data.active_days ?? 0,
        totalActivities: data.total_activities ?? 0,
      }),
      null,
    ];
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
      toHabit({
        id: data.id,
        name: data.name,
        icon: data.icon,
        reset: data.reset,
        target: data.target,
        done: data.done,
      }),
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
  async updateDone(id, done) {
    await supabase.rpc('increment_daily_habits_done', {
      p_date: formatDate(new Date(), 'YYYY-MM-DD'),
      p_habit_id: id,
      p_done: done,
    });
  },
  async delete(id) {
    const { error } = await supabase.from('habits').delete().eq('id', id);

    if (error) {
      return [null, error];
    }

    return [true, null];
  },
};
