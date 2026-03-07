import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

export const DEFAULT_GOALS_FORM_FIELDS: Required<CreateGoalsFormFields> = {
  title: '',
  description: '',
  timesStart: 0,
  timesEnd: 1,
  timesStep: 1,
} as const;
