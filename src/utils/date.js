export function formatDate(date, format) {
  const day = `${date.getDate()}`.padStart(2, '0');

  if (format === 'DD MMM') {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];

    return `${day} ${months[date.getMonth()]}`;
  }

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');

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

export function addMonth(date, add) {
  const res = new Date(date);

  return new Date(res.setMonth(res.getMonth() + add));
}

export function setStartOfDay(date) {
  const res = new Date(date);

  res.setHours(0, 0, 0, 0);

  return res;
}

export function setStartOfWeek(date) {
  const res = new Date(date);

  res.setHours(0, 0, 0, 0);

  if (res.getDay() === 1) {
    return res;
  }

  if (res.getDay() === 0) {
    return res.setDate(res.getDate() - 6);
  }

  const diff = 1 - res.getDay();

  res.setDate(res.getDate() - diff);

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
  return Math.floor(
    Math.abs(setStartOfDay(dateA) - setStartOfDay(dateB)) /
      (1000 * 60 * 60 * 24),
  );
}

export function diffWeek(dateA, dateB) {
  return Math.floor(
    Math.abs(setStartOfWeek(dateA) - setStartOfWeek(dateB)) /
      (1000 * 60 * 60 * 24 * 7),
  );
}

export function diffMonth(dateA, dateB) {
  const yearDiff = (dateA.getFullYear() - dateB.getFullYear()) * 12;
  const monthDiff = dateA.getMonth() - dateB.getMonth();

  return yearDiff + monthDiff;
}

export function getDaysRange(dateA, dateB, format = null) {
  const total = diffDay(dateB, dateA);

  return Array.from({ length: total }, (_, i) => {
    const date = new Date(dateA);

    date.setDate(dateA.getDate() + (i + 1));
    date.setHours(0, 0, 0, 0);

    if (format) {
      return formatDate(date, format);
    }

    return date;
  });
}
