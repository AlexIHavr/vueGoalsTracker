import { PERIOD_FILTERS, PERIOD_TYPES } from '../consts/periodOptions';

import type { ValueOf } from 'shared/types';

export type PeriodTypesValues = ValueOf<typeof PERIOD_TYPES>;
export type PeriodFiltersValues = ValueOf<typeof PERIOD_FILTERS>;

export type PeriodTypesOptions = {
  label: string;
  value: PeriodTypesValues;
}[];

export type PeriodFiltersOptions = {
  label: string;
  value: PeriodFiltersValues;
}[];
