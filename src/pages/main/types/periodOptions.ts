import type { MONTH_NAMES } from 'shared/consts';
import type { PeriodTypeValue, ValueOf } from 'shared/types';

export type PeriodFilterValue = 'all' | 'even' | 'odd' | 'choose';
export type MonthChooseFilterLabel = ValueOf<typeof MONTH_NAMES>;

export type PeriodTypesOptions = Readonly<{
  label: string;
  value: PeriodTypeValue;
}>[];

export type PeriodFiltersOptions = Readonly<{
  label: string;
  value: PeriodFilterValue;
}>[];

export type MonthChooseFiltersOptions = Readonly<{
  label: MonthChooseFilterLabel;
  value: number;
}>[];
