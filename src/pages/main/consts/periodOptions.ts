import { MONTH_NAMES, MONTHS_IN_YEAR } from 'shared/consts';
import { getLastDayOfMonth } from 'shared/utils';

import type {
  MonthChooseFiltersOptions,
  PeriodFiltersOptions,
  PeriodTypesOptions,
} from '../types/periodOptions';

export const PERIOD_TYPES_OPTIONS: PeriodTypesOptions = [
  {
    label: 'Год',
    value: 'year',
  },
  {
    label: 'Месяц',
    value: 'month',
  },
  {
    label: 'День',
    value: 'day',
  },
] as const;

export const PERIOD_FILTERS_OPTIONS: PeriodFiltersOptions = [
  {
    label: 'Все',
    value: 'all',
  },
  {
    label: 'Четные',
    value: 'even',
  },
  {
    label: 'Нечетные',
    value: 'odd',
  },
  {
    label: 'Выбрать',
    value: 'choose',
  },
] as const;

export const MONTH_INDEXES = Array.from(
  { length: MONTHS_IN_YEAR },
  (_, index) => index
);

export const MONTH_CHOOSE_FILTERS_OPTIONS: MonthChooseFiltersOptions =
  MONTH_INDEXES.map((month) => ({
    label: MONTH_NAMES[month]!,
    value: month,
  }));

export const DAYS_NUMBERS_IN_MONTHS = Array.from(
  { length: MONTHS_IN_YEAR },
  (_, monthIndex) =>
    Array.from(
      { length: getLastDayOfMonth(monthIndex) },
      (_, index) => index + 1
    )
);

export const MAX_GOALS_COUNT = 1000;
