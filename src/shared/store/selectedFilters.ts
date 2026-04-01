import { ref } from 'vue';

import { appLocalStorage } from 'shared/utils';

import type { GoalStatus } from 'shared/types';

export const selectedStatusFilters = ref<GoalStatus[]>(
  appLocalStorage.get('selectedStatusFilters') ?? []
);

export const selectedCategoryFilters = ref<string[]>(
  appLocalStorage.get('selectedCategoryFilters') ?? []
);

const datesRangeFilters =
  appLocalStorage.get('selectedDatesRangeFilters') ?? [];
const parsedEndDate = datesRangeFilters[1]
  ? new Date(datesRangeFilters[1])
  : null;

export const selectedDatesRangeFilters = ref<[Date, Date | null] | []>(
  datesRangeFilters[0] ? [new Date(datesRangeFilters[0]), parsedEndDate] : []
);
