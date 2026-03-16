import { GOAL_STATUSES } from 'shared/consts';

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
    return GOAL_STATUSES.COMPLETED;
  }

  if (isExpiredStatus) {
    return GOAL_STATUSES.EXPIRED;
  }

  if (isInProgressStatus) {
    return GOAL_STATUSES.IN_PROGRESS;
  }

  return GOAL_STATUSES.TO_DO;
};
