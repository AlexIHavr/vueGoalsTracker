export interface GoalSettings {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
}

export interface GoalDocument extends GoalSettings {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}
