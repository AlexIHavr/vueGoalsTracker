import { ref } from 'vue';

import { CURRENT_YEAR } from 'shared/consts';

export const selectedYearRef = ref<number>(CURRENT_YEAR);
