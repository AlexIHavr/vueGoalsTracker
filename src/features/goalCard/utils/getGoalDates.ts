import { MONTH_NAMES_LOWERCASE } from 'shared/consts';
import { getDateLocalString, getTimeLocalString } from 'shared/utils';

import {
  isFullYear,
  isFullMonth,
  isFullDay,
  isEndTime,
  isStartTime,
} from './parseDates';

import type { GoalDocument } from 'shared/interfaces';
import type { GoalStatus } from 'shared/types';

export const getGoalDates = (goalStatus: GoalStatus, goal: GoalDocument) => {
  const startDate = goal.startDate.toDate();
  const endDate = goal.endDate.toDate();

  const startDateString = getDateLocalString(startDate);
  const endDateString = getDateLocalString(endDate);

  const isInProgressOrCompleted =
    goalStatus === 'in-progress' || goalStatus === 'completed';

  const getToDoOrExpiredString = (startTime?: string, endTime?: string) => {
    if (goalStatus === 'to-do') {
      if (startTime) {
        const startTimeString = isStartTime(startDate) ? '' : ` ${startTime}`;

        return `От ${startDateString}${startTimeString}`;
      }

      return `От ${startDateString}`;
    }

    if (goalStatus === 'expired') {
      if (endTime) {
        const endTimeString = isEndTime(endDate) ? '' : ` ${endTime}`;

        return `До ${endDateString}${endTimeString}`;
      }

      return `До ${endDateString}`;
    }

    return '';
  };

  switch (goal.periodType) {
    case 'year':
      if (isFullYear(startDate, endDate)) {
        return 'Весь год';
      }

      if (isInProgressOrCompleted) {
        return `${startDateString} - ${endDateString}`;
      }

      return getToDoOrExpiredString();

    case 'month':
      if (isFullMonth(startDate, endDate)) {
        return `Весь ${MONTH_NAMES_LOWERCASE[startDate.getMonth()]}`;
      }

      if (isInProgressOrCompleted) {
        return `${startDateString} - ${endDateString}`;
      }

      return getToDoOrExpiredString();

    case 'day': {
      if (isFullDay(startDate, endDate)) {
        return startDateString;
      }

      const startTime = getTimeLocalString(startDate);
      const endTime = getTimeLocalString(endDate);

      if (isInProgressOrCompleted) {
        return `${startDateString} ${startTime} - ${endTime}`;
      }

      return getToDoOrExpiredString(startTime, endTime);
    }

    default: {
      const _: never = goal.periodType;
      return _;
    }
  }
};
