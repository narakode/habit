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

  const months = [
    'Januari',
    'Febuari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  if (format === 'MMMM YYYY') {
    return `${months[date.getMonth()]} ${year}`;
  }

  if (format === 'DD MMMM YYYY') {
    return `${day} ${months[date.getMonth()]} ${year}`;
  }

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

  res.setMonth(res.getMonth() + add);

  return res;
}
export function subMonth(date, sub) {
  const res = new Date(date);

  res.setMonth(res.getMonth() - sub);

  return res;
}

export function setStartOfDay(date) {
  const res = new Date(date);

  res.setHours(0, 0, 0, 0);

  return res;
}

export function setStartOfWeek(date) {
  const res = new Date(date);

  res.setHours(0, 0, 0, 0);

  const day = res.getDay();

  res.setDate(res.getDate() - (day === 0 ? 6 : day - 1));

  return res;
}
export function setStartOfMonth(date) {
  const res = new Date(date.getFullYear(), date.getMonth(), 1);

  return res;
}

export function setEndOfMonth(date) {
  const res = new Date(date.getFullYear(), date.getMonth() + 1, 0);

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

export function getCalendar(month, year) {
  const cells = [];

  const startMonth = new Date(year, month, 1);
  const endMonth = new Date(year, month + 1, 0);

  const prevMonth = setEndOfMonth(subMonth(startMonth, 1));

  for (let i = startMonth.getDay() - 1; i >= 0; i--) {
    const date = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth(),
      prevMonth.getDate() - i,
    );

    cells.push(date);
  }

  for (let i = 1; i <= endMonth.getDate(); i++) {
    const date = new Date(year, month, i);

    cells.push(date);
  }

  const nextMonth = addMonth(startMonth, 1);

  let nextDay = 0;
  while (cells.length % 7 !== 0) {
    const date = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      nextMonth.getDate() + nextDay++,
    );

    cells.push(date);
  }

  return cells;
}
