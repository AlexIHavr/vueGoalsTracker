<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import { computed, ref, watch } from 'vue';

import { LoadingModal } from 'features/loadingModal';
import { CURRENT_YEAR } from 'shared/consts';
import { useGoalsInYear, useNotification } from 'shared/hooks';
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
import { MAX_GOALS_COUNT, MONTH_INDEXES } from '../consts/periodOptions';
import { useCreatePeriodGoal } from '../hooks/useCreatePeriodGoal';
import ExtraSettings from '../ui/ExtraSettings.vue';
import { getConfirmModalText } from '../utils/getConfirmModalText';

import type { PeriodFilterValue } from '../types/periodOptions';
import type { BaseFormExpose } from 'features/baseForm';
import type { PeriodTypeValue } from 'shared/types';

const goalsInYear = useGoalsInYear();

const toast = useNotification();

const isCreateGoalsModalVisible = ref<boolean>(false);
const isConfirmModalVisible = ref<boolean>(false);
const isLoadingCreateGoals = ref<boolean>(false);

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

const maxCreateGoalsCount = computed(
  () => MAX_GOALS_COUNT - goalsInYear.value.length
);

const { createYearGoal, createMonthGoal, createDayGoal } = useCreatePeriodGoal(
  goalFormFields,
  switchSettingsFields,
  maxCreateGoalsCount.value
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

const handleShowCreateGoalsDialog = () => {
  isCreateGoalsModalVisible.value = true;
};

const resetDialog = () => {
  createGoalsFormRef.value?.resetGoalForm();

  selectedPeriod.value = 'year';
  selectedPeriodFilter.value = 'all';
  selectedMonthChooseFilter.value = [];
  selectedDayChooseFilter.value = [];

  isCreateGoalsModalVisible.value = false;
};

const handleShowConfirmModal = async () => {
  isConfirmModalVisible.value = true;
};

const handleCloseConfirmModal = () => {
  isConfirmModalVisible.value = false;
};

const confirmModalText = computed(() =>
  getConfirmModalText({
    selectedPeriod: selectedPeriod.value,
    selectedPeriodFilter: selectedPeriodFilter.value,
    selectedMonthChooseFilter: selectedMonthChooseFilter.value,
    selectedDayChooseFilter: selectedDayChooseFilter.value,
  })
);

const handleCreateGoals = async () => {
  handleCloseConfirmModal();

  isLoadingCreateGoals.value = true;

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

  isLoadingCreateGoals.value = false;

  toast.add({ severity: 'success', summary: 'Цели успешно добавлены' });
};
</script>

<template>
  <Button
    label="Добавить цели"
    icon="pi pi-plus"
    raised
    :disabled="selectedYear !== CURRENT_YEAR"
    @click="handleShowCreateGoalsDialog"
  />

  <LoadingModal v-if="isLoadingCreateGoals" />

  <Dialog
    v-model:visible="isConfirmModalVisible"
    header="Создать цели"
    modal
    dismissable-mask
  >
    <div class="confirm-modal-content">
      <Message severity="success" variant="simple">
        <div class="confirm-modal-header">
          <i class="pi pi-info-circle confirm-modal-header-icon" />
          <h4>{{ confirmModalText.text }}</h4>
        </div>
      </Message>

      <Message
        v-if="confirmModalText.allGoalsCount > maxCreateGoalsCount"
        severity="error"
      >
        <h4>
          Превышен лимит в {{ MAX_GOALS_COUNT }} целей,
          {{
            !maxCreateGoalsCount
              ? ' цели не могут быть созданы'
              : ` будут создано только ${maxCreateGoalsCount}`
          }}
        </h4>
      </Message>
      <Message v-else severity="success">
        <h4>{{ confirmModalText.allGoalsCountText }}</h4>
      </Message>

      <h4>Желаете продолжить?</h4>

      <div class="confirm-modal-button-group">
        <Button
          label="Создать"
          icon="pi pi-plus "
          raised
          :disabled="!maxCreateGoalsCount"
          @click="handleCreateGoals"
        />
        <Button
          label="Отменить"
          severity="contrast"
          icon="pi pi-times"
          raised
          @click="handleCloseConfirmModal"
        />
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="isCreateGoalsModalVisible"
    header="Создать цели"
    modal
    :close-on-escape="!isLoadingCreateGoals"
    @after-hide="resetDialog"
  >
    <GoalForm
      ref="createGoalsFormRef"
      submit-button-icon="pi-plus"
      submit-button-label="Создать"
      :selected-period="selectedPeriod"
      :initial-fields="DEFAULT_GOALS_FORM_FIELDS"
      :initial-switch-settings="DEFAULT_SWITCH_SETTINGS_FIELDS"
      :form-submit="handleShowConfirmModal"
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

<style lang="scss" scoped>
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.confirm-modal-header {
  display: flex;
  gap: 5px;
  align-items: center;
}

.confirm-modal-header-icon {
  font-size: var(--p-confirmpopup-icon-size);
}

.confirm-modal-button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
