import { UserStreakRepository } from './user-streak.repository';

export const UserStreakService = {
  getUserStreak() {
    return UserStreakRepository.getUserStreak();
  },
};
