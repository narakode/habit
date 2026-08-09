import { ref } from 'vue';
import {
  toActivityStats,
  toDailyDoneStats,
  toHabit,
  toHabits,
  toHabitStats,
} from '../habit.dto';
import { diffDay, getDaysRange, subDate } from '../../../utils/date';

const habits = [
  {
    id: 1,
    name: 'Read Book',
    icon: 'twemoji:open-book',
    reset: 'daily',
    done: 1,
    completedTarget: 3,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Meditation',
    icon: 'twemoji:person-in-lotus-position',
    reset: 'daily',
    done: 2,
    completedTarget: 8,
    createdAt: subDate(new Date(), 14),
  },
  {
    id: 3,
    name: 'Journal',
    icon: 'twemoji:memo',
    reset: 'daily',
    done: 1,
    completedTarget: 15,
    createdAt: subDate(new Date(), 29),
  },
  {
    id: 4,
    name: 'Drink Water',
    icon: 'twemoji:potable-water',
    reset: 'daily',
    done: 6,
    completedTarget: 52,
    createdAt: subDate(new Date(), 5),
    target: 8,
  },
  {
    id: 5,
    name: 'Walk',
    icon: 'twemoji:person-walking',
    reset: 'daily',
    done: 5432,
    completedTarget: 5,
    createdAt: subDate(new Date(), 1),
    target: 8000,
  },
  {
    id: 6,
    name: 'Push Up',
    icon: 'twemoji:flexed-biceps',
    reset: 'daily',
    done: 35,
    completedTarget: 38,
    createdAt: subDate(new Date(), 4),
    target: 50,
  },
  {
    id: 7,
    name: 'Eat Fruits',
    icon: 'twemoji:red-apple',
    reset: 'daily',
    done: 3,
    completedTarget: 9,
    createdAt: subDate(new Date(), 288),
    target: 2,
  },
  {
    id: 8,
    name: 'Practice Coding',
    icon: 'twemoji:laptop',
    reset: 'daily',
    done: 4,
    completedTarget: 194,
    createdAt: subDate(new Date(), 162),
  },
];

export const LocalHabitRepository = {
  getCompletedPeriods(date = null) {
    return [
      {
        total: 0,
        data: toHabits(habits),
      },
      null,
    ];
  },
  getDailyProgress(date = null) {
    return [
      {
        total: 0,
        data: toHabits(habits),
      },
      null,
    ];
  },
  getDailyActivities(date = null) {
    return [
      {
        total: 0,
        data: toHabits(habits),
      },
      null,
    ];
  },
  getActivityStats() {
    return [
      toActivityStats({
        totalActivities: 1248,
        daysActive: 167,
      }),
      null,
    ];
  },
  getHabitStats() {
    return [
      toHabitStats({
        totalActivities: 1248,
        completedPeriod: 10,
      }),
      null,
    ];
  },
  getDailyDoneStats(range) {
    const total = diffDay(range.start, range.end);

    return [
      toDailyDoneStats(
        getDaysRange(range.start, range.end, 'YYYY-MM-DD').map((date) => ({
          date,
          done: Math.floor(Math.random() * 41) + 1,
        })),
      ),
      null,
    ];
  },
  getSingleById(id) {
    const habit = habits.find((habit) => habit.id == id);

    if (!habit) {
      return [null, new Error('404 not found')];
    }

    return [habit, null];
  },
  create(data) {
    const habit = toHabit({
      ...data,
      id: Date.now(),
      done: 0,
    });

    habits.push(habit);

    return [habit, null];
  },
  update(id, data) {
    const updateIndex = habits.findIndex((habit) => habit.id === id);
    const habit = toHabit({
      ...habits[updateIndex],
      ...data,
    });

    habits[updateIndex] = habit;

    return [habit, null];
  },
  updateDone(id, done) {
    const updateIndex = habits.findIndex((habit) => habit.id === id);

    habits[updateIndex].done = done;
  },
  delete(id) {
    const deleteIndex = habits.findIndex((habit) => habit.id === id);

    habits.splice(deleteIndex, 1);

    return [true, null];
  },
};
