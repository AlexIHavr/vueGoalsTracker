import { MONTHS_IN_YEAR } from 'shared/consts';

import { DAYS_NUMBERS_IN_MONTHS } from '../consts/periodOptions';

import type { PeriodFilterValue } from '../types/periodOptions';
import type { PeriodTypeValue } from 'shared/types';

interface GetConfirmModalTextParams {
  selectedPeriod: PeriodTypeValue;
  selectedPeriodFilter: PeriodFilterValue;
  selectedMonthChooseFilter: number[];
  selectedDayChooseFilter: number[];
}

export const getConfirmModalText = ({
  selectedPeriod,
  selectedPeriodFilter,
  selectedMonthChooseFilter,
  selectedDayChooseFilter,
}: GetConfirmModalTextParams) => {
  const isOddFilter = selectedPeriodFilter === 'odd';
  const isEvenFilter = selectedPeriodFilter === 'even';

  let text = '';
  let allGoalsCount = 0;

  const getSelectText = () => {
    if (isOddFilter) {
      return 'нечетные';
    }

    if (isEvenFilter) {
      return 'четные';
    }

    return 'выбранные';
  };

  if (selectedPeriod === 'year') {
    text = 'Будет создано целей в текущем году:';
    allGoalsCount = 1;
  } else if (selectedPeriod === 'month') {
    text = `Будет создано целей на ${getSelectText()} месяцы в текущем году:`;

    if (isOddFilter || isEvenFilter) {
      allGoalsCount = MONTHS_IN_YEAR / 2;
    } else {
      allGoalsCount = selectedMonthChooseFilter.length || MONTHS_IN_YEAR;
    }
  } else {
    text = `Будет создано целей на ${getSelectText()} дни в текущем году:`;

    const daysInSelectedMonths = DAYS_NUMBERS_IN_MONTHS.filter((_, index) =>
      selectedMonthChooseFilter.includes(index)
    );

    allGoalsCount = (
      selectedMonthChooseFilter.length
        ? daysInSelectedMonths
        : DAYS_NUMBERS_IN_MONTHS
    ).reduce((acc, value) => {
      let daysInMonth = value.length;

      if (isOddFilter) {
        daysInMonth = Math.ceil(daysInMonth / 2);
      } else if (isEvenFilter) {
        daysInMonth = Math.floor(daysInMonth / 2);
      }

      const selectedDaysInMonth =
        selectedDayChooseFilter.length > daysInMonth
          ? daysInMonth
          : selectedDayChooseFilter.length || daysInMonth;

      return acc + selectedDaysInMonth;
    }, 0);
  }

  const getCountText = () => {
    if (allGoalsCount === 1) {
      return 'цель';
    }

    if (allGoalsCount <= 4) {
      return 'цели';
    }

    return 'целей';
  };

  return {
    text,
    allGoalsCountText: `${allGoalsCount} ${getCountText()}`,
    allGoalsCount,
  };
};
