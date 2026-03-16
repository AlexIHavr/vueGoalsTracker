import { selectedSortOrder, selectedSortType } from 'shared/store';

import type { GoalDocument } from 'shared/interfaces';

export const getSortedGoals = (goals: GoalDocument[]) => {
  const sortOrderK = selectedSortOrder.value === 'desc' ? -1 : 1;

  return goals.toSorted((firstGoal, secondGoal) => {
    switch (selectedSortType.value) {
      default:
      case 'startDate':
        return (
          (firstGoal.startDate.seconds - secondGoal.startDate.seconds) *
          sortOrderK
        );

      case 'title':
        return sortOrderK === 1
          ? firstGoal.title.localeCompare(secondGoal.title)
          : secondGoal.title.localeCompare(firstGoal.title);

      case 'timesCurrent':
        return (firstGoal.timesCurrent - secondGoal.timesCurrent) * sortOrderK;
    }
  });
};
