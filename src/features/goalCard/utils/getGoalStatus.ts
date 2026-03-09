import { GOAL_STATUSES } from '../consts/goalStatuses';

import type { GoalStatus } from '../types/goalStatus';
import type { GoalDocument } from 'shared/interfaces';

export const getGoalStatus = ({
  isCompleted,
  startDate,
  endDate,
}: GoalDocument): GoalStatus => {
  const isExpiredStatus = endDate.seconds < Date.now() / 1000;
  const isInProgressStatus = startDate.seconds <= Date.now() / 1000;

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
