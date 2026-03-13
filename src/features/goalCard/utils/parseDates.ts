import {
  MAX_DAYS_IN_MONTH,
  MAX_HOURS,
  MAX_MINUTES,
  MONTHS_IN_YEAR,
} from 'shared/consts';
import { getLastDayOfMonth } from 'shared/utils';

export const getDateLocalString = (date: Date) => {
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const getTimeLocalString = (date: Date, hour12: boolean = false) => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12,
  });
};

export const isFullYear = (startDate: Date, endDate: Date) => {
  const isStartYear = startDate.getMonth() === 0 && startDate.getDate() === 1;

  if (!isStartYear) {
    return false;
  }

  const isEndYear =
    endDate.getMonth() === MONTHS_IN_YEAR - 1 &&
    endDate.getDate() === MAX_DAYS_IN_MONTH;

  return isEndYear;
};

export const isFullMonth = (startDate: Date, endDate: Date) => {
  const isSameMonth = startDate.getMonth() === endDate.getMonth();

  if (!isSameMonth) {
    return false;
  }

  const isStartMonth = startDate.getDate() === 1;

  if (!isStartMonth) {
    return false;
  }

  const lastDayOfMonth = getLastDayOfMonth(
    endDate.getMonth(),
    endDate.getFullYear()
  );

  const isEndMonth = endDate.getDate() === lastDayOfMonth;

  return isEndMonth;
};

export const isStartTime = (date: Date) => {
  return date.getHours() === 0 && date.getMinutes() === 0;
};

export const isEndTime = (date: Date) => {
  return date.getHours() === MAX_HOURS && date.getMinutes() === MAX_MINUTES;
};

export const isSameDay = (startDate: Date, endDate: Date) => {
  return startDate.getDate() === endDate.getDate();
};

export const isFullDay = (startDate: Date, endDate: Date) => {
  const isSameMonth = startDate.getMonth() === endDate.getMonth();

  if (!isSameMonth) {
    return false;
  }

  if (!isSameDay(startDate, endDate)) {
    return false;
  }

  if (!isStartTime(startDate)) {
    return false;
  }

  return isEndTime(endDate);
};
