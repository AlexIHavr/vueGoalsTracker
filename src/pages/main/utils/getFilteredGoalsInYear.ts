import { getGoalStatus, type GoalCardExpose } from 'features/goalCard';
import {
  selectedStatusFilters,
  selectedCategoryFilters,
  searchValue,
} from 'shared/store';

import type { GoalDocument } from 'shared/interfaces';

const isFoundInSearch = (
  searchValue: string,
  goal: GoalDocument,
  allGoals: GoalCardExpose[] | null
) => {
  const searchString = searchValue.toLowerCase();

  if (!searchString) {
    return true;
  }

  const isFoundTitle = goal.title.toLowerCase().includes(searchString);

  if (isFoundTitle) {
    return true;
  }

  const isFoundDescription = goal.description
    .toLowerCase()
    .includes(searchString);

  if (isFoundDescription) {
    return true;
  }

  const isFoundCategory = goal.category.toLowerCase().includes(searchString);

  if (isFoundCategory) {
    return true;
  }

  const goalRef = allGoals?.find(({ goalId }) => goalId === goal.id);

  const isFoundDates = goalRef?.goalDates.toLowerCase().includes(searchString);

  if (isFoundDates) {
    return true;
  }

  const isFoundTimes = goalRef?.goalTimes.toLowerCase().includes(searchString);

  return isFoundTimes;
};

export const getFilteredGoalsInYear = (
  sortedGoalsInYear: GoalDocument[],
  allGoals: GoalCardExpose[] | null
) => {
  const selectedStatusFiltersLength = selectedStatusFilters.value.length;
  const selectedCategoryFiltersLength = selectedCategoryFilters.value.length;

  return sortedGoalsInYear.filter((goal) => {
    const isIncludesStatus = !selectedStatusFiltersLength
      ? true
      : selectedStatusFilters.value.includes(getGoalStatus(goal));

    const isIncludesCategory = !selectedCategoryFiltersLength
      ? true
      : selectedCategoryFilters.value.includes(goal.category);

    return (
      isIncludesStatus &&
      isIncludesCategory &&
      isFoundInSearch(searchValue.value, goal, allGoals)
    );
  });
};
