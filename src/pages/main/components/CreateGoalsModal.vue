<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, ref, watch } from 'vue';

import { LoadingModal } from 'features/loadingModal';
import { CURRENT_YEAR } from 'shared/consts';
import { selectedYear } from 'shared/store';
import { getEvenNumbers, getOddNumbers } from 'shared/utils';
import {
  GoalForm,
  type GoalFormExpose,
  type GoalFormFields,
  type SwitchSettingsFields,
} from 'widgets/goalForm';

import {
  DEFAULT_SWITCH_SETTINGS_FIELDS,
  DEFAULT_GOALS_FORM_FIELDS,
} from '../consts/goalsFormFields';
import { MONTH_INDEXES } from '../consts/periodOptions';
import { useCreatePeriodGoal } from '../hooks/useCreatePeriodGoal';
import ExtraSettings from '../ui/ExtraSettings.vue';

import type { PeriodFilterValue } from '../types/periodOptions';
import type { BaseFormExpose } from 'features/baseForm';
import type { PeriodTypeValue } from 'shared/types';

const isDialogVisible = ref<boolean>(false);

const createGoalsFormRef = ref<GoalFormExpose | null>(null);

const selectedPeriod = ref<PeriodTypeValue>('year');
const selectedPeriodFilter = ref<PeriodFilterValue>('all');
const selectedMonthChooseFilter = ref<number[]>([]);
const selectedDayChooseFilter = ref<number[]>([]);

const goalFormFields = computed<GoalFormFields | undefined>(
  () => createGoalsFormRef.value?.goalFormFields
);

const switchSettingsFields = computed<SwitchSettingsFields | undefined>(
  () => createGoalsFormRef.value?.switchSettingsFields
);

const goalFormRef = computed<BaseFormExpose | null | undefined>(
  () => createGoalsFormRef.value?.goalFormRef
);

const { createYearGoal, createMonthGoal, createDayGoal } = useCreatePeriodGoal(
  goalFormFields,
  switchSettingsFields
);

watch(selectedPeriod, () => {
  selectedPeriodFilter.value = 'all';

  const title = goalFormFields.value?.title;
  const description = goalFormFields.value?.description;
  const category = goalFormFields.value?.category;

  goalFormRef?.value?.formRef?.reset();

  createGoalsFormRef.value?.resetGoalForm();

  if (title) {
    goalFormFields.value.title = title;
  }

  if (description) {
    goalFormFields.value.description = description;
  }

  if (category) {
    goalFormFields.value.category = category;
  }

  goalFormRef?.value?.formRef?.setValues({
    title,
    description,
    category,
  } as GoalFormFields);
});

watch(selectedPeriodFilter, () => {
  selectedMonthChooseFilter.value = [];
});

watch(selectedMonthChooseFilter, () => {
  selectedDayChooseFilter.value = [];
});

const handleShowDialog = () => {
  isDialogVisible.value = true;
};

const resetDialog = () => {
  createGoalsFormRef.value?.resetGoalForm();

  selectedPeriod.value = 'year';
  selectedPeriodFilter.value = 'all';
  selectedMonthChooseFilter.value = [];
  selectedDayChooseFilter.value = [];

  isDialogVisible.value = false;
};

const handleCreateGoals = async () => {
  const isSelectedMonth = selectedPeriod.value === 'month';

  if (selectedPeriod.value === 'year') {
    await createYearGoal();
  } else {
    switch (selectedPeriodFilter.value) {
      case 'all':
        if (isSelectedMonth) {
          await createMonthGoal();
        } else {
          await createDayGoal();
        }
        break;

      case 'even':
        if (isSelectedMonth) {
          await createMonthGoal(getOddNumbers(MONTH_INDEXES));
        } else {
          await createDayGoal({
            months: selectedMonthChooseFilter.value,
            filterFunc: getEvenNumbers,
          });
        }
        break;

      case 'odd':
        if (isSelectedMonth) {
          await createMonthGoal(getEvenNumbers(MONTH_INDEXES));
        } else {
          await createDayGoal({
            months: selectedMonthChooseFilter.value,
            filterFunc: getOddNumbers,
          });
        }

        break;

      case 'choose':
        if (isSelectedMonth) {
          await createMonthGoal(selectedMonthChooseFilter.value);
        } else {
          await createDayGoal({
            months: selectedMonthChooseFilter.value,
            days: selectedDayChooseFilter.value,
          });
        }
        break;

      default: {
        const _: never = selectedPeriodFilter.value;
        return _;
      }
    }
  }

  resetDialog();
};
</script>

<template>
  <Button
    label="Добавить цели"
    icon="pi pi-plus"
    raised
    :disabled="selectedYear !== CURRENT_YEAR"
    @click="handleShowDialog"
  />

  <LoadingModal v-if="goalFormRef?.isLoading" />

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    :close-on-escape="!goalFormRef?.isLoading"
    @after-hide="resetDialog"
  >
    <template #header>
      <h2>Создать цели</h2>
    </template>

    <GoalForm
      ref="createGoalsFormRef"
      submit-button-icon="pi-plus"
      submit-button-label="Создать"
      :selected-period="selectedPeriod"
      :initial-fields="DEFAULT_GOALS_FORM_FIELDS"
      :initial-switch-settings="DEFAULT_SWITCH_SETTINGS_FIELDS"
      :form-submit="handleCreateGoals"
    >
      <ExtraSettings
        v-model:selected-period="selectedPeriod"
        v-model:selected-period-filter="selectedPeriodFilter"
        v-model:selected-month-choose-filter="selectedMonthChooseFilter"
        v-model:selected-day-choose-filter="selectedDayChooseFilter"
      />
    </GoalForm>
  </Dialog>
</template>
