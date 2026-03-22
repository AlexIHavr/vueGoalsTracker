import { getLocaleNumberString } from 'shared/utils';

import type { GoalDocument } from 'shared/interfaces';

export const getGoalTimes = (goal: GoalDocument) => {
  if (!goal.isShowOneTimes && goal.timesEnd === 1) {
    return '';
  }

  const timesCurrentString = `${getLocaleNumberString(goal.timesCurrent)}${goal.timesSuffix}`;
  const timesEndString = `${getLocaleNumberString(goal.timesEnd)}${goal.timesSuffix}`;

  return `${timesCurrentString} из ${timesEndString}`;
};
