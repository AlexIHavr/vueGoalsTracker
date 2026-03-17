import { DAYS_NUMBERS_IN_MONTHS } from '../consts/periodOptions';

export const getDaysInSelectedMonths = (
  selectedMonthChooseFilter: number[]
) => {
  if (selectedMonthChooseFilter.length === 1) {
    return DAYS_NUMBERS_IN_MONTHS[selectedMonthChooseFilter[0]!]!;
  }

  if (selectedMonthChooseFilter.length === 2) {
    const daysInFirstMonth =
      DAYS_NUMBERS_IN_MONTHS[selectedMonthChooseFilter[0]!]!;

    const daysInSecondMonth =
      DAYS_NUMBERS_IN_MONTHS[selectedMonthChooseFilter[1]!]!;

    if (daysInFirstMonth > daysInSecondMonth) {
      return daysInFirstMonth;
    } else {
      return daysInSecondMonth;
    }
  }

  return DAYS_NUMBERS_IN_MONTHS[0]!;
};
