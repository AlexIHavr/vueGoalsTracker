import { CURRENT_YEAR, MAX_SECONDS } from 'shared/consts';
import { useGoals } from 'shared/hooks';
import { getLastDayOfMonth, parseTime } from 'shared/utils';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';
import { DAYS_NUMBERS_IN_MONTHS, MONTH_INDEXES } from '../consts/periodOptions';

import type { PeriodTypeValue } from 'shared/types';
import type { ComputedRef } from 'vue';
import type { GoalFormFields, SwitchSettingsFields } from 'widgets/goalForm';

interface CreateDayGoalParams {
  months?: number[];
  days?: number[];
  filterFunc?: (numbers: number[]) => number[];
}

export function useCreatePeriodGoal(
  createGoalsForm: ComputedRef<GoalFormFields | undefined>,
  switchSettingsFields: ComputedRef<SwitchSettingsFields | undefined>
) {
  const { createGoal } = useGoals();

  const createYearGoal = async (
    startDate?: Date,
    endDate?: Date,
    periodType: PeriodTypeValue = 'year'
  ) => {
    if (!createGoalsForm.value || !switchSettingsFields.value) {
      return;
    }

    const timesStart =
      createGoalsForm.value.timesStart ?? DEFAULT_GOALS_FORM_FIELDS.timesStart;

    const timesEnd =
      createGoalsForm.value.timesEnd ?? DEFAULT_GOALS_FORM_FIELDS.timesEnd;

    const timesStep =
      createGoalsForm.value.timesStep ?? DEFAULT_GOALS_FORM_FIELDS.timesStep;

    await createGoal({
      title: createGoalsForm.value.title,
      description: createGoalsForm.value.description,
      category: createGoalsForm.value.category,
      timesSuffix: createGoalsForm.value.timesSuffix,
      startDate: startDate ?? createGoalsForm.value.startDate,
      endDate: endDate ?? createGoalsForm.value.endDate,
      timesStart,
      timesEnd,
      timesStep,
      timesCurrent: timesStart,
      isCompleted: false,
      isShowOneTimes: switchSettingsFields.value.isShowOneTimes,
      isOverTimes: switchSettingsFields.value.isOverTimes,
      periodType,
    });
  };

  const createMonthGoal = async (months: number[] = []) => {
    if (!createGoalsForm.value) {
      return;
    }

    const startDay =
      createGoalsForm.value.startDay ?? DEFAULT_GOALS_FORM_FIELDS.startDay;
    const endDay =
      createGoalsForm.value.endDay ?? DEFAULT_GOALS_FORM_FIELDS.endDay;

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
    if (!createGoalsForm.value) {
      return;
    }

    const daysGoal: Promise<void>[] = [];

    (months.length ? months : MONTH_INDEXES).forEach((monthIndex) => {
      const daysInMonth = DAYS_NUMBERS_IN_MONTHS[monthIndex]!;

      const filteredDaysInMonth = filterFunc
        ? filterFunc(daysInMonth)
        : daysInMonth;

      (days.length ? days : filteredDaysInMonth).forEach((dayNumber) => {
        if (!createGoalsForm.value) {
          return;
        }

        const lastDay = getLastDayOfMonth(monthIndex);
        const day = dayNumber > lastDay ? lastDay : dayNumber;

        const [startHours, startMinutes] = parseTime(
          createGoalsForm.value.startTime
        );

        const [endHours, endMinutes] = parseTime(createGoalsForm.value.endTime);

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
