import { MONTH_NAMES_LOWERCASE, PERIOD_TYPES } from 'shared/consts';

import {
  isFullYear,
  isFullMonth,
  getDateLocalString,
  isFullDay,
  isStartTime,
  getTimeLocalString,
  isEndTime,
} from './parseDates';
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

  const startDateString = getDateLocalString(startDate);
  const endDateString = getDateLocalString(endDate);

  const startTime = getTimeLocalString(startDate);
  const endTime = getTimeLocalString(endDate);

  const getNotInProgressString = () => {
    if (goalStatus.value === GOAL_STATUSES.TO_DO) {
      const startTimeString = isStartTime(startDate) ? '' : ` ${startTime}`;

      return `От ${startDateString}${startTimeString}`;
    }

    if (goalStatus.value === GOAL_STATUSES.EXPIRED) {
      const endTimeString = isEndTime(endDate) ? '' : ` ${endTime}`;

      return `До ${endDateString}${endTimeString}`;
    }

    return '';
  };

  switch (goal.periodType) {
    default:
    case PERIOD_TYPES.YEAR:
      if (isFullYear(startDate, endDate)) {
        return 'Весь год';
      }

      if (goalStatus.value === GOAL_STATUSES.IN_PROGRESS) {
        return `${startDateString} - ${endDateString}`;
      }

      return getNotInProgressString();

    case PERIOD_TYPES.MONTH:
      if (isFullMonth(startDate, endDate)) {
        return `Весь ${MONTH_NAMES_LOWERCASE[startDate.getMonth()]}`;
      }

      if (goalStatus.value === GOAL_STATUSES.IN_PROGRESS) {
        return `${startDateString} - ${endDateString}`;
      }

      return getNotInProgressString();

    case PERIOD_TYPES.DAY:
      if (isFullDay(startDate, endDate)) {
        return startDateString;
      }

      if (goalStatus.value === GOAL_STATUSES.IN_PROGRESS) {
        return `${startDateString} ${startTime} - ${endTime}`;
      }

      return getNotInProgressString();
  }
};
