import type { Timestamp } from 'firebase/firestore';
import type { GOAL_STATUSES } from 'shared/consts';
import type { ValueOf } from 'shared/types';

export interface GoalSettings {
  title: string;
  description?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  isCompleted: boolean;
}

export interface GoalSettingsParams extends Omit<
  GoalSettings,
  'startDate' | 'endDate'
> {
  startDate: Date;
  endDate: Date;
}

export interface GoalDocument extends GoalSettings {
  readonly id: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface GoalData extends GoalDocument {
  status: ValueOf<typeof GOAL_STATUSES>;
}
