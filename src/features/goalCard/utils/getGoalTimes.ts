import { getLocaleNumberString } from 'shared/utils';

import type { GoalDocument } from 'shared/interfaces';
import type { GoalStatus } from 'shared/types';
import type { ComputedRef } from 'vue';

export const getGoalTimes = (
  goalStatus: ComputedRef<GoalStatus>,
  goal: GoalDocument
) => {
  if (!goal.isShowOneTimes && goal.timesEnd === 1) {
    return '';
  }

  const timesCurrentString = `${getLocaleNumberString(goal.timesCurrent)}${goal.timesSuffix}`;
  const timesEndString = `${getLocaleNumberString(goal.timesEnd)}${goal.timesSuffix}`;

  if (goalStatus.value == 'completed') {
    return `${timesEndString} из ${timesEndString}`;
  }

  return `${timesCurrentString} из ${timesEndString}`;
};
