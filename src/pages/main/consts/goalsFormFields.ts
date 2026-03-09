import { CURRENT_YEAR } from 'shared/consts';

export const MIN_START_DATE = new Date(CURRENT_YEAR, 0);
export const MAX_START_DATE = new Date(CURRENT_YEAR, 12, 0);

export const DEFAULT_GOALS_FORM_FIELDS = {
  title: '',
  description: '',
  timesStart: 0,
  timesEnd: 1,
  timesStep: 1,
  timesSuffix: '',
  startDate: MIN_START_DATE,
  endDate: MAX_START_DATE,
} as const;
