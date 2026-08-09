import {
  addDate,
  addMonth,
  diffDay,
  diffMonth,
  diffWeek,
} from '../../utils/date';

export function getTotalPeriod(reset, createdAt) {
  if (reset === 'daily') {
    return diffDay(addDate(new Date(), 1), new Date(createdAt));
  }

  if (reset === 'weekly') {
    return diffWeek(addDate(new Date(), 7), new Date(createdAt));
  }

  return diffMonth(addMonth(new Date(), 1), new Date(createdAt));
}
