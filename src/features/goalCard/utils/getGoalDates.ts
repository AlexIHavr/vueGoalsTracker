import { MONTH_NAMES_LOWERCASE } from 'shared/consts';

import {
  isFullYear,
  isFullMonth,
  getDateLocalString,
  isFullDay,
} from './parseTimestamp';
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

  const startDate = goal.startDate.toDate();
  const endDate = goal.endDate.toDate();

  if (isFullYear(startDate, endDate)) {
    return 'Весь год';
  }

  if (isFullMonth(startDate, endDate)) {
    return `Весь ${MONTH_NAMES_LOWERCASE[startDate.getMonth()]}`;
  }

  const startDateString = getDateLocalString(startDate);
  const endDateString = getDateLocalString(endDate);

  if (goalStatus.value === GOAL_STATUSES.TO_DO) {
    return `От ${startDateString}`;
  }

  if (goalStatus.value === GOAL_STATUSES.EXPIRED) {
    return `До ${endDateString}`;
  }

  if (isFullDay(startDate, endDate)) {
    return startDateString;
  }

  return `${startDateString} - ${endDateString}`;
};
