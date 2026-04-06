import { useGoals } from 'shared/hooks';
import { parseTime, getLastDayOfMonth } from 'shared/utils';

import type { GoalDocument } from 'shared/interfaces';
import type { Ref } from 'vue';
import type { GoalFormExpose } from 'widgets/goalForm';

export function useEditGoal(editGoalForm: Ref<GoalFormExpose | null>) {
  const { updateGoal } = useGoals();

  const editGoal = async (goal: GoalDocument) => {
    if (!editGoalForm.value) {
      return;
    }

    const goalFormFields = editGoalForm.value.goalFormFields;
    const switchSettingsFields = editGoalForm.value.switchSettingsFields;

    const [startHours, startMinutes] = parseTime(goalFormFields.startTime);

    const [endHours, endMinutes] = parseTime(goalFormFields.endTime);

    const goalStartDate = goalFormFields.startDate;
    const goalEndDate = goalFormFields.endDate;

    let goalStartDay = goalFormFields.startDay ?? goalStartDate.getDate();

    const lastStartDayOfMonth = getLastDayOfMonth(goalStartDate.getMonth());

    if (goalStartDay > lastStartDayOfMonth) {
      goalStartDay = lastStartDayOfMonth - 1;
    }

    let goalEndDay = goalFormFields.endDay ?? goalEndDate.getDate();
    const lastEndDayOfMonth = getLastDayOfMonth(goalEndDate.getMonth());

    if (goalEndDay > lastEndDayOfMonth) {
      goalEndDay = lastEndDayOfMonth;
    }

    const startDate = new Date(
      goalStartDate.getFullYear(),
      goalStartDate.getMonth(),
      goal.periodType === 'month' ? goalStartDay : goalStartDate.getDate(),
      startHours,
      startMinutes
    );

    const endDate = new Date(
      goalEndDate.getFullYear(),
      goalEndDate.getMonth(),
      goal.periodType === 'month' ? goalEndDay : goalEndDate.getDate(),
      endHours,
      endMinutes
    );

    const timesStart = goalFormFields.timesStart ?? goal.timesStart;

    const timesEnd = goalFormFields.timesEnd ?? goal.timesEnd;

    const timesStep = goalFormFields.timesStep ?? goal.timesStep;

    await updateGoal(goal.id, {
      title: goalFormFields.title,
      description: goalFormFields.description,
      category: goalFormFields.category,
      timesSuffix: goalFormFields.timesSuffix,
      startDate,
      endDate,
      timesStart,
      timesEnd,
      timesStep,
      timesCurrent: goal.isCompleted ? timesEnd : timesStart,
      isShowOneTimes: switchSettingsFields.isShowOneTimes,
      isOverTimes: switchSettingsFields.isOverTimes,
    });
  };

  return editGoal;
}
