export function toUserStreak({
  lastActivityDate,
  currentStreakStartDate,
  longestStreak,
}) {
  return {
    lastActivityDate: new Date(lastActivityDate),
    currentStreakStartDate: new Date(currentStreakStartDate),
    longestStreak,
  };
}
