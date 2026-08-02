import { HabitRepository } from './habit.repository';

export const HabitService = {
  getDailyProgress(date = null) {
    return HabitRepository.getDailyProgress(date);
  },
  getDailyActivities(date = null) {
    return HabitRepository.getDailyActvities(date);
  },
  getActivityStats() {
    return HabitRepository.getActivityStats();
  },
  create(data) {
    return HabitRepository.create(data);
  },
  update(id, data) {
    return HabitRepository.update(id, data);
  },
  updateDone(id, done) {
    return HabitRepository.updateDone(id, done);
  },
  delete(id, data) {
    return HabitRepository.delete(id, data);
  },
};
