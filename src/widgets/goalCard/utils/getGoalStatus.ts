import type { GoalDocument } from 'shared/interfaces';
import type { GoalStatus } from 'shared/types';

export const getGoalStatusExceptCompleted = ({
  startDate,
  endDate,
}: GoalDocument) => {
  const now = new Date();
  const isExpiredStatus = endDate.toDate() < now;
  const isInProgressStatus = startDate.toDate() <= now;

  if (isExpiredStatus) {
    return 'expired';
  }

  if (isInProgressStatus) {
    return 'in-progress';
  }

  return 'to-do';
};

export const getGoalStatus = (goal: GoalDocument): GoalStatus => {
  if (goal.isCompleted) {
    return 'completed';
  }

  return getGoalStatusExceptCompleted(goal);
};
