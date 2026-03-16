import { ref } from 'vue';

import type { GoalStatus } from 'shared/types';

export const selectedStatusFilters = ref<GoalStatus[]>([]);
