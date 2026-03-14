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
