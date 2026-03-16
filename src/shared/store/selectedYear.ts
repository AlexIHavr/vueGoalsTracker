import { ref } from 'vue';

import { CURRENT_YEAR } from 'shared/consts';

export const selectedYear = ref<number>(CURRENT_YEAR);
