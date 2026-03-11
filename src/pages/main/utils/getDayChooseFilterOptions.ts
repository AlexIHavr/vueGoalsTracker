import { MAX_DAYS_IN_MONTH } from 'shared/consts';
import { getLastDayOfMonth } from 'shared/utils';

import type { Ref } from 'vue';

export const getDayChooseFilterOptions = (
  selectedMonthChooseFilter: Ref<number[]>
) => {
  let daysInMonth = MAX_DAYS_IN_MONTH;

  if (
    selectedMonthChooseFilter.value.length === 1 ||
    selectedMonthChooseFilter.value.length === 2
  ) {
    daysInMonth = Math.max(
      ...selectedMonthChooseFilter.value.map((monthIndex) =>
        getLastDayOfMonth(monthIndex)
      )
    );
  }

  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
};
