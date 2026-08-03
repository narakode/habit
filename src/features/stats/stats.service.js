import {
  addDate,
  diffDay,
  diffMonth,
  diffWeek,
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
    const [habits, err] = await HabitRepository.getAll();

    if (err) {
      return [null, err];
    }

    if (!habits.data) {
      return [0, null];
    }

    const totalPeriods = habits.data.reduce((total, habit) => {
      if (habit.reset === 'daily') {
        return total + diffDay(habit.createdAt, new Date());
      }

      if (habit.reset === 'weekly') {
        return total + diffWeek(habit.createdAt, new Date());
      }

      return total + diffMonth(habit.createdAt, new Date());
    }, 0);
    const completedTarget = habits.data.reduce(
      (total, habit) => total + habit.completedTarget,
      0,
    );

    return [Math.floor((completedTarget / totalPeriods) * 100), null];
  },
};
