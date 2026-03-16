import type { GoalSettings } from 'shared/interfaces';

export type SortTypes = keyof Pick<
  GoalSettings,
  'title' | 'startDate' | 'timesCurrent'
>;

export type SortOrder = 'asc' | 'desc';
