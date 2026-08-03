import { supabase } from '../../../core/supabase';
import { subDate } from '../../../utils/date';
import { toUserStreak } from '../user-streak.dto';

export const SupabaseUserStreakRepository = {
  async getUserStreak() {
    const { data, error } = await supabase.from('user_streaks').select();

    if (error) {
      return [null, error];
    }

    if (data.length === 0) {
      return [
        toUserStreak({
          currentStreakStartDate: null,
          lastActivityDate: null,
          longestStreak: 0,
        }),
        null,
      ];
    }

    const [streak] = data;

    return [
      toUserStreak({
        currentStreakStartDate: streak.current_streak_start_date,
        lastActivityDate: streak.last_activity_date,
        longestStreak: streak.longest_streak,
      }),
      null,
    ];
  },
};
