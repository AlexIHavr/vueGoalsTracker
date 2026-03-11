import { MONTH_NAMES } from 'shared/consts';

import type {
  MonthChooseFiltersOptions,
  PeriodFiltersOptions,
  PeriodTypesOptions,
} from '../types/periodOptions';

export const MONTHS_IN_YEAR = 12;

export const PERIOD_TYPES = {
  YEAR: 'year',
  MONTH: 'month',
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
    label: 'Выбор',
    value: PERIOD_FILTERS.CHOOSE,
  },
] as const;

export const MONTH_INDEXES = Array.from(
  { length: MONTHS_IN_YEAR },
  (_, index) => index + 1
);

export const MONTH_CHOOSE_FILTERS_OPTIONS: MonthChooseFiltersOptions =
  MONTH_INDEXES.map((month) => ({
    label: MONTH_NAMES[month - 1]!,
    value: month,
  }));
