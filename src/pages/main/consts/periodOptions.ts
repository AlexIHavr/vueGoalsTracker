import type {
  MonthChooseFiltersOptions,
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

export const MONTH_CHOOSE_FILTERS_LABELS = [
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

export const MONTH_CHOOSE_FILTERS_OPTIONS: MonthChooseFiltersOptions =
  Array.from({ length: 12 }, (_, index) => ({
    label: MONTH_CHOOSE_FILTERS_LABELS[index]!,
    value: index,
  }));
