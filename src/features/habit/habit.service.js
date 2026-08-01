import { HabitRepository } from './habit.repository';

export const HabitService = {
  getAll() {
    return HabitRepository.getAll();
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
