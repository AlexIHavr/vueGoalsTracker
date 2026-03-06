import type { Timestamp } from 'firebase/firestore';

export interface GoalSettings {
  title: string;
  description?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  isCompleted: boolean;
  timesToComplete: {
    start: number;
    end: number;
    step: number;
    current: number;
  };
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
