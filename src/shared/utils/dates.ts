import { CURRENT_YEAR } from 'shared/consts';

export const getLastDayOfMonth = (
  monthIndex: number,
  year: number = CURRENT_YEAR
) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const parseTime = (time: string, separator = ':') => {
  return time.split(separator).map(Number);
};

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
