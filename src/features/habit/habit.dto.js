export function toHabit({ id, name, icon, reset, done, target }) {
  return {
    id,
    name,
    icon,
    target,
    reset,
    done,
    persistedDone: done,
  };
}

export function toHabits(data) {
  return data.map((item) => toHabit(item));
}
