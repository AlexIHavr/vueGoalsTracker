import { ref } from 'vue';

import type { SortOrder, SortTypes } from 'shared/types';

export const selectedSortType = ref<SortTypes>('startDate');
export const selectedSortOrder = ref<SortOrder>('asc');
