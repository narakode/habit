import { HabitRepository } from '../../repository';

export const HabitService = {
  getAll() {
    return HabitRepository.getAll();
  },
  create(data) {
    return HabitRepository.create();
  },
  update(id, data) {
    return HabitRepository.update(id, data);
  },
};
