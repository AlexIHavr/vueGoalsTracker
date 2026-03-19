import { ref } from 'vue';

import { appLocalStorage } from 'shared/utils';

import type { GoalStatus } from 'shared/types';

export const selectedStatusFilters = ref<GoalStatus[]>(
  appLocalStorage.get('selectedStatusFilters') ?? []
);

export const selectedCategoryFilters = ref<string[]>(
  appLocalStorage.get('selectedCategoryFilters') ?? []
);
