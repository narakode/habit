import { readonly, ref } from 'vue';
import { StatService } from '../stats/stats.service';

const _streak = ref({
  currentStreak: 0,
  longestStreak: 0,
});

export function useStreak() {
  const streak = readonly(_streak);

  async function loadStreak() {
    const [res, err] = await StatService.getStreakStats();

    if (!err) {
      _streak.value.currentStreak = res.currentStreakDate;
      _streak.value.longestStreak = res.longestStreak;
    }
  }

  return {
    streak,
    loadStreak,
  };
}
