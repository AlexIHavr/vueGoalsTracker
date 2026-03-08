import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

const currentYear = new Date().getFullYear();

export const DEFAULT_GOALS_FORM_FIELDS: Required<CreateGoalsFormFields> = {
  title: '',
  description: '',
  timesStart: 0,
  timesEnd: 1,
  timesStep: 1,
  timesSuffix: '',
  startDate: new Date(currentYear, 0),
  endDate: new Date(currentYear, 12, 0),
} as const;
