import { parseTimestamp, isFullYear, isFullMonth } from './parseTimestamp';
import { GOAL_STATUSES } from '../consts/goalStatuses';

import type { GoalStatus } from '../types/goalStatus';
import type { GoalDocument } from 'shared/interfaces';
import type { ComputedRef } from 'vue';

export const getGoalDates = (
  goalStatus: ComputedRef<GoalStatus>,
  goal: GoalDocument
) => {
  if (goalStatus.value === GOAL_STATUSES.COMPLETED) {
    return '';
  }

  const startDateString = parseTimestamp(goal.startDate);
  const endDateString = parseTimestamp(goal.endDate);

  if (isFullYear(goal.startDate, goal.endDate)) {
    return 'Целый год';
  }

  if (isFullMonth(goal.startDate, goal.endDate)) {
    return 'Целый месяц';
  }

  if (goalStatus.value === GOAL_STATUSES.TO_DO) {
    return `От ${startDateString}`;
  }

  if (goalStatus.value === GOAL_STATUSES.EXPIRED) {
    return `До ${endDateString}`;
  }

  return `${startDateString} - ${endDateString}`;
};
