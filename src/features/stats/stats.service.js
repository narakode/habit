import {
  addDate,
  addMonth,
  diffDay,
  diffMonth,
  diffWeek,
  getDaysRange,
  isSameDate,
  subDate,
} from '../../utils/date';
import { HabitRepository } from '../habit/habit.repository';
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
  async getActivityStats() {
    return await HabitRepository.getActivityStats();
  },
  async getCompletionRate() {
    const [habits, err] = await HabitRepository.getCompletedPeriods();

    if (err) {
      return [null, err];
    }

    if (!habits.data) {
      return [0, null];
    }

    const totalPeriods = habits.data.reduce((total, habit) => {
      if (habit.reset === 'daily') {
        return (
          total + diffDay(addDate(new Date(), 1), new Date(habit.createdAt))
        );
      }

      if (habit.reset === 'weekly') {
        return (
          total + diffWeek(addDate(new Date(), 7), new Date(habit.createdAt))
        );
      }

      return (
        total + diffMonth(addMonth(new Date(), 1), new Date(habit.createdAt))
      );
    }, 0);

    const completedTarget = habits.data.reduce(
      (total, habit) => total + habit.completedTarget,
      0,
    );

    if (completedTarget < 1) {
      return [0, null];
    }

    return [Math.floor((completedTarget / totalPeriods) * 100), null];
  },
  async getDailyDoneStats(range) {
    const [data, err] = await HabitRepository.getDailyDoneStats(range);

    if (err) {
      return [null, err];
    }

    const stats = getDaysRange(range.start, range.end, 'YYYY-MM-DD').map(
      (date) => {
        const item = data.find((item) => item.date === date);

        return item?.done ?? 0;
      },
    );

    return [stats, null];
  },
  async getHeatmaps(range) {
    return await HabitRepository.getDailyDoneStats(range);
  },
};
