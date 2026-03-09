import type {
  PeriodFiltersOptions,
  PeriodTypesOptions,
} from '../types/periodOptions';

export const PERIOD_TYPES = {
  YEAR: 'year',
  MONTH: 'month',
} as const;

export const PERIOD_FILTERS = {
  ALL: 'all',
  EVEN: 'even',
  ODD: 'odd',
  RANGE: 'range',
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
];

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
    label: 'Диапазон',
    value: PERIOD_FILTERS.RANGE,
  },
];
