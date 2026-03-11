import { CURRENT_YEAR } from 'shared/consts';
import { useGoals } from 'shared/hooks';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';
import { MONTH_INDEXES } from '../consts/periodOptions';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

export function useCreatePeriodGoal(createGoalsForm: CreateGoalsFormFields) {
  const { createGoal } = useGoals();

  const createYearGoal = async (
    startDate: Date = createGoalsForm.startDate,
    endDate: Date = createGoalsForm.endDate
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
      timesSuffix: createGoalsForm.timesSuffix,
      startDate,
      endDate,
      timesStart,
      timesEnd,
      timesStep,
      timesCurrent: timesStart,
      isCompleted: false,
    });
  };

  const createMonthGoal = async (months: number[] = []) => {
    const startDay =
      createGoalsForm.startDay ?? DEFAULT_GOALS_FORM_FIELDS.startDay;
    const endDay = createGoalsForm.endDay ?? DEFAULT_GOALS_FORM_FIELDS.endDay;

    await Promise.all(
      (months.length ? months : MONTH_INDEXES).map((month) => {
        const lastDay = new Date(CURRENT_YEAR, month, 0).getDate();

        const startDate = new Date(
          CURRENT_YEAR,
          month - 1,
          startDay > lastDay ? lastDay : startDay
        );

        const endDate = new Date(
          CURRENT_YEAR,
          month - 1,
          endDay > lastDay ? lastDay : endDay
        );

        return createYearGoal(startDate, endDate);
      })
    );
  };

  return { createYearGoal, createMonthGoal };
}
