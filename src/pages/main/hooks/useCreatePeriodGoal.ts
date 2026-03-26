import { CURRENT_YEAR, MAX_SECONDS } from 'shared/consts';
import { useGoals } from 'shared/hooks';
import { getLastDayOfMonth, parseTime } from 'shared/utils';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';
import { DAYS_NUMBERS_IN_MONTHS, MONTH_INDEXES } from '../consts/periodOptions';

import type {
  CheckboxSettingsFields,
  CreateGoalsFormFields,
} from '../interfaces/createGoalsFormFields';
import type { PeriodTypeValue } from 'shared/types';

interface CreateDayGoalParams {
  months?: number[];
  days?: number[];
  filterFunc?: (numbers: number[]) => number[];
}

export function useCreatePeriodGoal(
  createGoalsForm: CreateGoalsFormFields,
  checkboxSettingsFields: CheckboxSettingsFields
) {
  const { createGoal } = useGoals();

  const createYearGoal = async (
    startDate: Date = createGoalsForm.startDate,
    endDate: Date = createGoalsForm.endDate,
    periodType: PeriodTypeValue = 'year'
  ) => {
    const timesStart =
      createGoalsForm.timesStart ?? DEFAULT_GOALS_FORM_FIELDS.timesStart;

    const timesEnd =
      createGoalsForm.timesEnd ?? DEFAULT_GOALS_FORM_FIELDS.timesEnd;

    const timesStep =
      createGoalsForm.timesStep ?? DEFAULT_GOALS_FORM_FIELDS.timesStep;

    await createGoal({
      title: createGoalsForm.title,
      description: createGoalsForm.description,
      category: createGoalsForm.category,
      timesSuffix: createGoalsForm.timesSuffix,
      startDate,
      endDate,
      timesStart,
      timesEnd,
      timesStep,
      timesCurrent: timesStart,
      isCompleted: false,
      isShowOneTimes: checkboxSettingsFields.showOneTimes,
      isOverTimes: checkboxSettingsFields.overTimes,
      periodType,
    });
  };

  const createMonthGoal = async (months: number[] = []) => {
    const startDay =
      createGoalsForm.startDay ?? DEFAULT_GOALS_FORM_FIELDS.startDay;
    const endDay = createGoalsForm.endDay ?? DEFAULT_GOALS_FORM_FIELDS.endDay;

    await Promise.all(
      (months.length ? months : MONTH_INDEXES).map((monthIndex) => {
        const lastDay = getLastDayOfMonth(monthIndex);

        const startDate = new Date(
          CURRENT_YEAR,
          monthIndex,
          startDay > lastDay ? lastDay : startDay
        );

        const endDate = new Date(
          CURRENT_YEAR,
          monthIndex,
          endDay > lastDay ? lastDay : endDay
        );

        return createYearGoal(startDate, endDate, 'month');
      })
    );
  };

  const createDayGoal = async ({
    months = [],
    days = [],
    filterFunc,
  }: CreateDayGoalParams = {}) => {
    const daysGoal: Promise<void>[] = [];

    (months.length ? months : MONTH_INDEXES).forEach((monthIndex) => {
      const daysInMonth = DAYS_NUMBERS_IN_MONTHS[monthIndex]!;

      const filteredDaysInMonth = filterFunc
        ? filterFunc(daysInMonth)
        : daysInMonth;

      (days.length ? days : filteredDaysInMonth).forEach((dayNumber) => {
        const lastDay = getLastDayOfMonth(monthIndex);
        const day = dayNumber > lastDay ? lastDay : dayNumber;

        const [startHours, startMinutes] = parseTime(createGoalsForm.startTime);

        const [endHours, endMinutes] = parseTime(createGoalsForm.endTime);

        const startDate = new Date(
          CURRENT_YEAR,
          monthIndex,
          day,
          startHours,
          startMinutes
        );
        const endDate = new Date(
          CURRENT_YEAR,
          monthIndex,
          day,
          endHours,
          endMinutes,
          MAX_SECONDS
        );

        daysGoal.push(createYearGoal(startDate, endDate, 'day'));
      });
    });

    await Promise.all(daysGoal);
  };

  return { createYearGoal, createMonthGoal, createDayGoal };
}
