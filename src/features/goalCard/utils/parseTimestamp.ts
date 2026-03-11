import { MAX_DAYS_IN_MONTH, MONTHS_IN_YEAR } from 'shared/consts';
import { getLastDayOfMonth } from 'shared/utils';

export const getDateLocalString = (date: Date) => {
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const isFullYear = (startDate: Date, endDate: Date) => {
  const isStartYear = startDate.getMonth() === 0 && startDate.getDate() === 1;

  const isEndYear =
    endDate.getMonth() === MONTHS_IN_YEAR - 1 &&
    endDate.getDate() === MAX_DAYS_IN_MONTH;

  return isStartYear && isEndYear;
};

export const isFullMonth = (startDate: Date, endDate: Date) => {
  const isSameMonth = startDate.getMonth() === endDate.getMonth();

  if (!isSameMonth) {
    return false;
  }

  const isStartMonth = startDate.getDate() === 1;

  const lastDayOfMonth = getLastDayOfMonth(
    endDate.getMonth(),
    endDate.getFullYear()
  );

  const isEndMonth = endDate.getDate() === lastDayOfMonth;

  return isStartMonth && isEndMonth;
};

export const isFullDay = (startDate: Date, endDate: Date) => {
  const isSameMonth = startDate.getMonth() === endDate.getMonth();

  if (!isSameMonth) {
    return false;
  }

  return endDate.getDate() === startDate.getDate();
};
