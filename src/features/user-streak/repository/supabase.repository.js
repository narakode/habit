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
          currentStreakStartDate: 0,
          lastActivityDate: null,
          longestStreak: 0,
        }),
        null,
      ];
    }

    const [streak] = data;

    return [
      toUserStreak({
        currentStreakStartDate: subDate(
          new Date(streak.current_streak_start_date),
          18,
        ),
        lastActivityDate: subDate(streak.last_activity_date, 1),
        longestStreak: streak.longest_streak,
      }),
      null,
    ];
  },
};
