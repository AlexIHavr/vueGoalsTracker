import {
  MAX_DAYS_IN_MONTH,
  MAX_HOURS,
  MAX_MINUTES,
  MAX_START_DATE,
  MIN_START_DATE,
} from 'shared/consts';

import type { GoalFormFields, SwitchSettingsFields } from 'widgets/goalForm';

const MIN_TIME = '00:00';
const MAX_TIME = `${MAX_HOURS}:${MAX_MINUTES}`;

export const DEFAULT_GOALS_FORM_FIELDS = {
  title: '',
  description: '',
  category: '',
  timesStart: 0,
  timesEnd: 1,
  timesStep: 1,
  timesSuffix: '',
  startDate: MIN_START_DATE,
  endDate: MAX_START_DATE,
  startDay: 1,
  endDay: MAX_DAYS_IN_MONTH,
  startTime: MIN_TIME,
  endTime: MAX_TIME,
} as const satisfies GoalFormFields;

export const DEFAULT_SWITCH_SETTINGS_FIELDS = {
  showOneTimes: false,
  overTimes: false,
} as const satisfies SwitchSettingsFields;
