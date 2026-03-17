import type { Timestamp } from 'firebase/firestore';
import type { PeriodTypeValue } from 'shared/types';

export interface GoalSettings {
  title: string;
  description: string;
  category: string;
  startDate: Timestamp;
  endDate: Timestamp;
  isCompleted: boolean;
  timesStart: number;
  timesEnd: number;
  timesStep: number;
  timesCurrent: number;
  timesSuffix: string;
  periodType: PeriodTypeValue;
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
