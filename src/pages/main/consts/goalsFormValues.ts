import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

export const DEFAULT_GOALS_FORM_FIELDS: CreateGoalsFormFields = {
  title: '',
  description: '',
  timesToComplete: {
    start: 0,
    end: 1,
    step: 1,
    current: 0,
  },
} as const;
