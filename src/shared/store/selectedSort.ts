import { ref } from 'vue';

import { appLocalStorage } from 'shared/utils';

import type { SortOrder, SortTypes } from 'shared/types';

export const selectedSortType = ref<SortTypes>(
  appLocalStorage.get('selectedSortType') ?? 'startDate'
);
export const selectedSortOrder = ref<SortOrder>(
  appLocalStorage.get('selectedSortOrder') ?? 'asc'
);
