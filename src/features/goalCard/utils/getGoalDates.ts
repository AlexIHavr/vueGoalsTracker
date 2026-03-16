import { MONTH_NAMES_LOWERCASE } from 'shared/consts';

import {
  isFullYear,
  isFullMonth,
  getDateLocalString,
  isFullDay,
  isStartTime,
  getTimeLocalString,
  isEndTime,
} from './parseDates';

import type { GoalDocument } from 'shared/interfaces';
import type { GoalStatus } from 'shared/types';
import type { ComputedRef } from 'vue';

export const getGoalDates = (
  goalStatus: ComputedRef<GoalStatus>,
  goal: GoalDocument
) => {
  const startDate = goal.startDate.toDate();
  const endDate = goal.endDate.toDate();

  const startDateString = getDateLocalString(startDate);
  const endDateString = getDateLocalString(endDate);

  const startTime = getTimeLocalString(startDate);
  const endTime = getTimeLocalString(endDate);

  const isInProgressOrCompleted =
    goalStatus.value === 'in-progress' || goalStatus.value === 'completed';

  const getToDoOrExpiredString = (timeString?: string) => {
    if (goalStatus.value === 'to-do') {
      const startTimeString =
        timeString ?? (isStartTime(startDate) ? '' : ` ${startTime}`);

      return `От ${startDateString}${startTimeString}`;
    }

    if (goalStatus.value === 'expired') {
      const endTimeString =
        timeString ?? (isEndTime(endDate) ? '' : ` ${endTime}`);

      return `До ${endDateString}${endTimeString}`;
    }

    return '';
  };

  switch (goal.periodType) {
    default:
    case 'year':
      if (isFullYear(startDate, endDate)) {
        return 'Весь год';
      }

      if (isInProgressOrCompleted) {
        return `${startDateString} - ${endDateString}`;
      }

      return getToDoOrExpiredString('');

    case 'month':
      if (isFullMonth(startDate, endDate)) {
        return `Весь ${MONTH_NAMES_LOWERCASE[startDate.getMonth()]}`;
      }

      if (isInProgressOrCompleted) {
        return `${startDateString} - ${endDateString}`;
      }

      return getToDoOrExpiredString('');

    case 'day':
      if (isFullDay(startDate, endDate)) {
        return startDateString;
      }

      if (isInProgressOrCompleted) {
        return `${startDateString} ${startTime} - ${endTime}`;
      }

      return getToDoOrExpiredString();
  }
};
