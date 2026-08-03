import { addDate, diffDay, isSameDate, subDate } from '../../utils/date';
import { UserStreakRepository } from '../user-streak/user-streak.repository';

export const StatService = {
  async getStreakStats() {
    const [userStreak, err] = await UserStreakRepository.getUserStreak();

    if (err) {
      return [null, err];
    }

    const today = new Date();
    const lastStreakIsToday = isSameDate(userStreak.lastActivityDate, today);

    const isStreak =
      isSameDate(userStreak.lastActivityDate, subDate(new Date(), 1)) ||
      lastStreakIsToday;

    return [
      {
        currentStreakDate: isStreak
          ? diffDay(
              lastStreakIsToday ? addDate(today, 1) : today,
              userStreak.currentStreakStartDate,
            )
          : 0,
        longestStreak: userStreak.longestStreak,
      },
      null,
    ];
  },
};
