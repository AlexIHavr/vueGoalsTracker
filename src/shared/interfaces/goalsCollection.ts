export interface GoalSettings {
  title: string;
  description?: string;
}

export interface GoalDocument extends GoalSettings {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}
