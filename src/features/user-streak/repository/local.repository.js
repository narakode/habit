import { subDate } from '../../../utils/date';
import { toUserStreak } from '../user-streak.dto';

export const LocalUserStreakRepository = {
  getUserStreak() {
    return [
      toUserStreak({
        currentStreakStartDate: subDate(new Date(), 18),
        lastActivityDate: subDate(new Date(), 1),
        longestStreak: 38,
      }),
      null,
    ];
  },
};
