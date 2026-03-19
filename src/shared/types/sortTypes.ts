import type { GoalSettings } from 'shared/interfaces';

export type SortTypes = keyof Pick<
  GoalSettings,
  'title' | 'startDate' | 'timesEnd'
>;

export type SortOrder = 'asc' | 'desc';
