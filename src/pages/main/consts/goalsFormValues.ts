import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

export const DEFAULT_GOALS_FORM_FIELDS: CreateGoalsFormFields = {
  title: '',
  description: '',
  startTimesToComplete: 0,
  endTimesToComplete: 1,
  timesStepToComplete: 1,
} as const;
