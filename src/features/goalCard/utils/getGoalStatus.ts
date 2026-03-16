import type { GoalDocument } from 'shared/interfaces';
import type { GoalStatus } from 'shared/types';

export const getGoalStatus = ({
  isCompleted,
  startDate,
  endDate,
}: GoalDocument): GoalStatus => {
  const now = new Date();
  const isExpiredStatus = endDate.toDate() < now;
  const isInProgressStatus = startDate.toDate() <= now;

  if (isCompleted) {
    return 'completed';
  }

  if (isExpiredStatus) {
    return 'expired';
  }

  if (isInProgressStatus) {
    return 'in-progress';
  }

  return 'to-do';
};
