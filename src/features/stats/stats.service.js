import { diffDay, isSameDate, subDate } from '../../utils/date';
import { UserStreakRepository } from '../user-streak/user-streak.repository';

export const StatService = {
  async getStreakStats() {
    const [userStreak, err] = await UserStreakRepository.getUserStreak();

    if (err) {
      return [null, err];
    }

    const isStreak = isSameDate(
      userStreak.lastActivityDate,
      subDate(new Date(), 1),
    );

    return [
      {
        currentStreakDate: isStreak
          ? diffDay(new Date(), userStreak.currentStreakStartDate)
          : 0,
        longestStreak: userStreak.longestStreak,
      },
      null,
    ];
  },
};
