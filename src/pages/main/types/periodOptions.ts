import { PERIOD_FILTERS } from '../consts/periodOptions';

import type { MONTH_NAMES } from 'shared/consts';
import type { PeriodTypeValue, ValueOf } from 'shared/types';

export type PeriodFilterValue = ValueOf<typeof PERIOD_FILTERS>;
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
