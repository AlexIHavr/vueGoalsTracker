export const getDateLocalString = (date: Date) => {
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const isFullYear = (startDate: Date, endDate: Date) => {
  const isStartYear = startDate.getMonth() === 0 && startDate.getDate() === 1;

  const isEndYear = endDate.getMonth() === 11 && endDate.getDate() === 31;

  return isStartYear && isEndYear;
};

export const isFullMonth = (startDate: Date, endDate: Date) => {
  if (startDate.getMonth() !== endDate.getMonth()) {
    return false;
  }

  const isStartMonth = startDate.getDate() === 1;

  const lastDayOfMonth = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    0
  ).getDate();

  const isEndMonth = endDate.getDate() === lastDayOfMonth;

  return isStartMonth && isEndMonth;
};
