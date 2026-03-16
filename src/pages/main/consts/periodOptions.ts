import { DAYS_IN_YEAR, MONTH_NAMES, MONTHS_IN_YEAR } from 'shared/consts';

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

export const DAY_NUMBERS = Array.from(
  { length: DAYS_IN_YEAR },
  (_, i) => i + 1
);
