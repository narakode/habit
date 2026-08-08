import { computed, readonly, ref } from 'vue';
import { StatService } from '../stats/stats.service';
import { UserStreakService } from './user-streak.service';
import { addDate, diffDay, isSameDate, subDate } from '../../utils/date';

const _longestStreak = ref(0);
const _lastActivityDate = ref(null);
const _currentStreakStartDate = ref(null);

export const longestStreak = readonly(_longestStreak);
export const todayStreak = computed(() => {
  if (!_lastActivityDate.value) {
    return false;
  }

  return isSameDate(_lastActivityDate.value, new Date());
});
export const currentStreak = computed(() => {
  if (!_lastActivityDate.value) {
    return 0;
  }

  const today = new Date();

  const isStreak =
    isSameDate(_lastActivityDate.value, subDate(new Date(), 1)) ||
    todayStreak.value;

  return isStreak
    ? diffDay(
        todayStreak.value ? addDate(today, 1) : today,
        _currentStreakStartDate.value,
      )
    : 0;
});

export async function loadStreak() {
  const [res, err] = await UserStreakService.getUserStreak();

  if (err) {
    return;
  }

  _lastActivityDate.value = res.lastActivityDate;
  _currentStreakStartDate.value = res.currentStreakStartDate;
  _longestStreak.value = res.longestStreak;
}

export function setStreakToday() {
  _lastActivityDate.value = new Date();
}
