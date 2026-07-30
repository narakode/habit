export function toHabit({ id, name, icon, reset, done, target }) {
  return {
    id,
    name,
    icon,
    target,
    reset,
    done,
  };
}
