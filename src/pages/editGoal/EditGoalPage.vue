<script setup lang="ts">
import Card from 'primevue/card';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { ROUTES_PATHS } from 'shared/consts';
import { useGoals, useNotification } from 'shared/hooks';
import { getTimeLocalString } from 'shared/utils';
import { GoalCard } from 'widgets/goalCard';
import {
  GoalForm,
  type GoalFormExpose,
  type GoalFormFields,
  type SwitchSettingsFields,
} from 'widgets/goalForm';

import { useEditGoal } from './hooks/useEditGoal';

import type { GoalDocument } from 'shared/interfaces';

const route = useRoute();
const toast = useNotification();

const { getGoal } = useGoals();

const goal = getGoal(route.params[ROUTES_PATHS.EDIT_GOAL.params] as string);

const isLoading = goal.pending;

const editGoalForm = ref<GoalFormExpose | null>(null);

const editGoal = useEditGoal(editGoalForm);

const getInitialFields = (goal: GoalDocument): GoalFormFields => {
  const startDate = goal.startDate.toDate();
  const endDate = goal.endDate.toDate();

  return {
    title: goal.title,
    description: goal.description,
    category: goal.category,
    timesSuffix: goal.timesSuffix,
    timesStart: goal.timesStart,
    timesEnd: goal.timesEnd,
    timesStep: goal.timesStep,
    startDate,
    endDate,
    startDay: startDate.getDate(),
    endDay: endDate.getDate(),
    startTime: getTimeLocalString(startDate),
    endTime: getTimeLocalString(endDate),
  };
};

const getInitialSwitchSettings = (goal: GoalDocument): SwitchSettingsFields => {
  return { isOverTimes: goal.isOverTimes, isShowOneTimes: goal.isShowOneTimes };
};

const handleSubmitEditForm = (goal: GoalDocument) => async () => {
  await editGoal?.(goal);

  toast.add({
    severity: 'success',
    summary: 'Цель успешно изменена',
  });
};
</script>

<template>
  <div class="edit-goal-wrapper">
    <ProgressSpinner v-if="isLoading" />

    <div v-else class="edit-goal">
      <Message v-if="!goal" severity="error">
        <h4>Такой цели нет</h4>
      </Message>

      <Message v-else severity="success">
        <h4>Редактирование цели</h4>
      </Message>

      <div v-if="goal" class="edit-goal-form-wrapper">
        <GoalCard :goal="goal" />

        <Card>
          <template #content>
            <GoalForm
              ref="editGoalForm"
              submit-button-icon="pi-save"
              submit-button-label="Сохранить"
              :selected-period="goal.periodType"
              :initial-fields="getInitialFields(goal)"
              :initial-switch-settings="getInitialSwitchSettings(goal)"
              :form-submit="handleSubmitEditForm(goal)"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-goal-wrapper {
  display: flex;
}

.edit-goal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.edit-goal-form-wrapper {
  display: flex;
  gap: 10px;
}
</style>
