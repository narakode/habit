export function formatDate(date, format) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function subDate(date, sub) {
  const res = new Date(date);

  return new Date(res.setDate(res.getDate() - sub));
}

export function addDate(date, add) {
  const res = new Date(date);

  return new Date(res.setDate(res.getDate() + add));
}

export function setStartOfDay(date) {
  const res = new Date(date);

  res.setHours(0, 0, 0, 0);

  return res;
}

export function isSameDate(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

export function diffDay(dateA, dateB) {
  return Math.floor(Math.abs(dateA - dateB) / (1000 * 60 * 60 * 24));
}
