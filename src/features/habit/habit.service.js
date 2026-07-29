import { HabitRepository } from './habit.repository';

export const HabitService = {
  async getAll() {
    return await HabitRepository.getAll();
  },
  create(data) {
    return HabitRepository.create(data);
  },
  update(id, data) {
    return HabitRepository.update(id, data);
  },
  delete(id, data) {
    return HabitRepository.delete(id, data);
  },
};
