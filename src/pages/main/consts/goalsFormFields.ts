import { CURRENT_YEAR, MONTHS_IN_YEAR } from 'shared/consts';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';
import type { NotNullableObject } from 'shared/types';

export const MIN_START_DATE = new Date(CURRENT_YEAR, 0);
export const MAX_START_DATE = new Date(CURRENT_YEAR, MONTHS_IN_YEAR, 0);

export const DEFAULT_GOALS_FORM_FIELDS: NotNullableObject<CreateGoalsFormFields> =
  {
    title: '',
    description: '',
    timesStart: 0,
    timesEnd: 1,
    timesStep: 1,
    timesSuffix: '',
    startDate: MIN_START_DATE,
    endDate: MAX_START_DATE,
    startDay: 1,
    endDay: 31,
  } as const;
