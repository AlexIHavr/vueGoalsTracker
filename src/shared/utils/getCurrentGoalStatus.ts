import { GOAL_STATUSES } from '../consts/goalStatuses';

import type { GoalDocument } from 'shared/interfaces';
import type { ValueOf } from 'shared/types';

export const getCurrentGoalStatus = ({
  isCompleted,
  startDate,
  endDate,
}: GoalDocument): ValueOf<typeof GOAL_STATUSES> => {
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
