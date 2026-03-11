export const CURRENT_YEAR = new Date().getFullYear();

export const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
] as const;

export const MONTH_NAMES_LOWERCASE = MONTH_NAMES.map((month) =>
  month.toLowerCase()
);

export const MONTHS_IN_YEAR = 12;

export const DAYS_IN_YEAR =
  new Date(CURRENT_YEAR, 1, 29).getDate() === 29 ? 366 : 365;
