import { ref } from 'vue';

const habits = [
  {
    name: 'Read Book',
    icon: 'twemoji:open-book',
    done: 1,
  },
  {
    name: 'Meditation',
    icon: 'twemoji:person-in-lotus-position',
    done: 2,
  },
  {
    name: 'Journal',
    icon: 'twemoji:memo',
    done: 1,
  },
  {
    name: 'Drink Water',
    icon: 'twemoji:potable-water',
    done: 6,
    target: 8,
  },
  {
    name: 'Walk',
    icon: 'twemoji:person-walking',
    done: 5432,
    target: 8000,
  },
  {
    name: 'Push Up',
    icon: 'twemoji:flexed-biceps',
    done: 35,
    target: 50,
  },
  {
    name: 'Eat Fruits',
    icon: 'twemoji:red-apple',
    done: 3,
    target: 2,
  },
  {
    name: 'Practice Coding',
    icon: 'twemoji:laptop',
    done: 4,
  },
];

export const LocalHabitRepository = {
  getAll() {
    return [
      {
        total: 0,
        data: habits,
      },
      null,
    ];
  },
  create(data) {
    habits.push({
      ...data,
      id: Date.now(),
      done: 0,
    });
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
