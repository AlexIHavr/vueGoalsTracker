import { DAYS_IN_YEAR, MONTH_NAMES, MONTHS_IN_YEAR } from 'shared/consts';

import type {
  MonthChooseFiltersOptions,
  PeriodFiltersOptions,
  PeriodTypesOptions,
} from '../types/periodOptions';

export const PERIOD_TYPES = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day',
} as const;

export const PERIOD_FILTERS = {
  ALL: 'all',
  EVEN: 'even',
  ODD: 'odd',
  CHOOSE: 'choose',
} as const;

export const PERIOD_TYPES_OPTIONS: PeriodTypesOptions = [
  {
    label: 'Год',
    value: PERIOD_TYPES.YEAR,
  },
  {
    label: 'Месяц',
    value: PERIOD_TYPES.MONTH,
  },
  {
    label: 'День',
    value: PERIOD_TYPES.DAY,
  },
] as const;

export const PERIOD_FILTERS_OPTIONS: PeriodFiltersOptions = [
  {
    label: 'Все',
    value: PERIOD_FILTERS.ALL,
  },
  {
    label: 'Четные',
    value: PERIOD_FILTERS.EVEN,
  },
  {
    label: 'Нечетные',
    value: PERIOD_FILTERS.ODD,
  },
  {
    label: 'Выборка',
    value: PERIOD_FILTERS.CHOOSE,
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
