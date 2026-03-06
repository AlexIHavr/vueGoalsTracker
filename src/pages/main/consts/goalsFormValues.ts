import type { CreateGoalsFormFields } from '../types/createGoalsFormFields';

export const DEFAULT_GOALS_FORM_FIELDS: CreateGoalsFormFields = {
  title: '',
  description: '',
  timesStart: 0,
  timesEnd: 1,
  timesStep: 1,
  timesCurrent: 0,
} as const;
