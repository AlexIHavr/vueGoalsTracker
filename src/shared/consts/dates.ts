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

export const MAX_DAYS_IN_MONTH = 31;

export const MAX_HOURS = 23;
export const MAX_MINUTES = 59;
export const MAX_SECONDS = 59;

export const MIN_START_DATE = new Date(CURRENT_YEAR, 0);
export const MAX_START_DATE = new Date(CURRENT_YEAR, MONTHS_IN_YEAR, 0);

export const DATE_FIELD_FORMAT = 'd MM';
