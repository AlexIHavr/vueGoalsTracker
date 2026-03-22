import { getGoalStatus, getGoalTimes } from 'features/goalCard';
import {
  selectedStatusFilters,
  selectedCategoryFilters,
  searchValue,
} from 'shared/store';
import { getDateLocalString, getTimeLocalString } from 'shared/utils';

import type { GoalDocument } from 'shared/interfaces';

const isFoundInSearch = (searchValue: string, goal: GoalDocument) => {
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

  const startDate = goal.startDate.toDate();
  const isFoundStartDate = getDateLocalString(startDate).includes(searchString);

  if (isFoundStartDate) {
    return true;
  }

  const endDate = goal.endDate.toDate();
  const isFoundEndDate = getDateLocalString(endDate).includes(searchString);

  if (isFoundEndDate) {
    return true;
  }

  const isFoundStartTime = getTimeLocalString(startDate).includes(searchString);

  if (isFoundStartTime) {
    return true;
  }

  const isFoundEndTime = getTimeLocalString(endDate).includes(searchString);

  if (isFoundEndTime) {
    return true;
  }

  const isFoundTimes = getGoalTimes(goal).toLowerCase().includes(searchString);

  return isFoundTimes;
};

export const getFilteredGoalsInYear = (goalsInYear: GoalDocument[]) => {
  const selectedStatusFiltersLength = selectedStatusFilters.value.length;
  const selectedCategoryFiltersLength = selectedCategoryFilters.value.length;
  const searchString = searchValue.value;

  if (
    !selectedStatusFiltersLength &&
    !selectedCategoryFiltersLength &&
    !searchString
  ) {
    return goalsInYear;
  }

  return goalsInYear.filter((goal) => {
    const isIncludesStatus = !selectedStatusFiltersLength
      ? true
      : selectedStatusFilters.value.includes(getGoalStatus(goal));

    const isIncludesCategory = !selectedCategoryFiltersLength
      ? true
      : selectedCategoryFilters.value.includes(goal.category);

    return (
      isIncludesStatus &&
      isIncludesCategory &&
      isFoundInSearch(searchString, goal)
    );
  });
};
