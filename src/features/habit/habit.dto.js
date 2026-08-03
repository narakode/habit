export function toHabit({
  id,
  name,
  icon,
  reset,
  done,
  target,
  completedTarget,
  createdAt,
}) {
  return {
    id,
    name,
    icon,
    target,
    reset,
    done,
    persistedDone: done,
    completedTarget,
    createdAt,
  };
}

export function toHabits(data) {
  return data.map((item) => toHabit(item));
}

export function toActivityStats({ totalActivities, daysActive }) {
  return {
    totalActivities,
    daysActive,
  };
}
