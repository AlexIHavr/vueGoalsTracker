import type { GoalSettingsParams } from 'shared/interfaces';

export type CreateGoalsFormFields = Omit<
  GoalSettingsParams,
  'isCompleted' | 'startDate' | 'endDate'
>;
