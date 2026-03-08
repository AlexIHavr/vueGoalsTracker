import { getLocaleNumberString } from 'shared/utils';

import { GOAL_STATUSES } from '../consts/goalStatuses';

import type { GoalStatus } from '../types/goalStatus';
import type { GoalDocument } from 'shared/interfaces';
import type { ComputedRef } from 'vue';

export const getGoalTimes = (
  goalStatus: ComputedRef<GoalStatus>,
  goal: GoalDocument
) => {
  if (goalStatus.value !== GOAL_STATUSES.IN_PROGRESS) {
    return '';
  }

  if (goal.timesEnd === 1) {
    return '';
  }

  const timesCurrentString = `${getLocaleNumberString(goal.timesCurrent)}${goal.timesSuffix}`;
  const timesEndString = `${getLocaleNumberString(goal.timesEnd)}${goal.timesSuffix}`;

  return `${timesCurrentString} из ${timesEndString}`;
};
