import { ref } from 'vue';

const habits = [
  {
    id: 1,
    name: 'Read Book',
    icon: 'twemoji:open-book',
    reset: 'daily',
    done: 1,
  },
  {
    id: 2,
    name: 'Meditation',
    icon: 'twemoji:person-in-lotus-position',
    reset: 'daily',
    done: 2,
  },
  {
    id: 3,
    name: 'Journal',
    icon: 'twemoji:memo',
    reset: 'daily',
    done: 1,
  },
  {
    id: 4,
    name: 'Drink Water',
    icon: 'twemoji:potable-water',
    reset: 'daily',
    done: 6,
    target: 8,
  },
  {
    id: 5,
    name: 'Walk',
    icon: 'twemoji:person-walking',
    reset: 'daily',
    done: 5432,
    target: 8000,
  },
  {
    id: 6,
    name: 'Push Up',
    icon: 'twemoji:flexed-biceps',
    reset: 'daily',
    done: 35,
    target: 50,
  },
  {
    id: 7,
    name: 'Eat Fruits',
    icon: 'twemoji:red-apple',
    reset: 'daily',
    done: 3,
    target: 2,
  },
  {
    id: 8,
    name: 'Practice Coding',
    icon: 'twemoji:laptop',
    reset: 'daily',
    done: 4,
  },
];

export const LocalHabitRepository = {
  getAll() {
    return [
      {
        total: 0,
        data: habits.map((habit) => habit),
      },
      null,
    ];
  },
  create(data) {
    const habit = {
      ...data,
      id: Date.now(),
      done: 0,
    };

    habits.push(habit);

    return [habit, null];
  },
  update(id, data) {
    const updateIndex = habits.findIndex((habit) => habit.id === id);
    habits[updateIndex] = {
      ...habits[updateIndex],
      ...data,
    };
  },
  delete(id) {
    const deleteIndex = habits.findIndex((habit) => habit.id === id);

    habits.splice(deleteIndex, 1);
  },
};
