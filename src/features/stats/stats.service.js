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
import { getTotalPeriod } from './stats.utils';

export const StatService = {
  async getActivityStats() {
    return await HabitRepository.getActivityStats();
  },
  async getHabitStats() {
    return await HabitRepository.getHabitStats();
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
      return total + getTotalPeriod(habit.reset, habit.createdAt);
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
