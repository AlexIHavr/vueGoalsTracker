import type { GoalSettingsParams } from 'shared/interfaces';

export type CreateGoalsFormFields = Omit<
  GoalSettingsParams,
  'isCompleted' | 'timesCurrent' | 'startDate' | 'endDate'
>;

export type CreateGoalsFormTimesFields = Pick<
  GoalSettingsParams,
  'timesStart' | 'timesEnd' | 'timesStep'
>;
