import { HabitRepository } from '../../repository';

export const HabitService = {
  getAll() {
    return HabitRepository.getAll();
  },
  create(data) {
    return HabitRepository.create();
  },
};
