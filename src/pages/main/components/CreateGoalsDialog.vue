<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import { computed, reactive, ref, watch } from 'vue';

import { BaseForm, type BaseFormExpose } from 'features/baseForm';
import { CURRENT_YEAR, PERIOD_TYPES } from 'shared/consts';
import { selectedYearRef } from 'shared/store';
import { getEvenNumbers, getOddNumbers } from 'shared/utils';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';
import {
  DAY_NUMBERS,
  MONTH_CHOOSE_FILTERS_OPTIONS,
  MONTH_INDEXES,
  PERIOD_FILTERS,
  PERIOD_FILTERS_OPTIONS,
  PERIOD_TYPES_OPTIONS,
} from '../consts/periodOptions';
import { useCreatePeriodGoal } from '../hooks/useCreatePeriodGoal';
import { useWatchFormRefs } from '../hooks/useWatchFormRefs';
import { createGoalsResolver } from '../schemas/createGoalsResolver';
import CommonGoalFields from '../ui/CommonGoalFields.vue';
import DayDateFields from '../ui/DayDateFields.vue';
import MonthDateFields from '../ui/MonthDateFields.vue';
import TimesFields from '../ui/TimesFields.vue';
import YearDateFields from '../ui/YearDateFields.vue';
import { getDayChooseFilterOptions } from '../utils/getDayChooseFilterOptions';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';
import type { PeriodFilterValue } from '../types/periodOptions';
import type { PeriodTypeValue } from 'shared/types';

const createGoalsForm = reactive<CreateGoalsFormFields>({
  ...DEFAULT_GOALS_FORM_FIELDS,
});

const isDialogVisible = ref<boolean>(false);
const createGoalsFormRef = ref<BaseFormExpose>();
const selectedPeriod = ref<PeriodTypeValue>(PERIOD_TYPES.YEAR);
const selectedPeriodFilter = ref<PeriodFilterValue>(PERIOD_FILTERS.ALL);
const selectedMonthChooseFilter = ref<number[]>([]);
const selectedDayChooseFilter = ref<number[]>([]);

const dayChooseFilterOptions = computed(() =>
  getDayChooseFilterOptions(selectedMonthChooseFilter)
);

const { createYearGoal, createMonthGoal, createDayGoal } =
  useCreatePeriodGoal(createGoalsForm);

useWatchFormRefs(createGoalsFormRef);

const resetCreateGoalsForm = () => {
  Object.assign(createGoalsForm, { ...DEFAULT_GOALS_FORM_FIELDS });
};

watch(selectedPeriod, () => {
  selectedPeriodFilter.value = PERIOD_FILTERS.ALL;

  resetCreateGoalsForm();

  createGoalsFormRef.value?.formRef?.reset();
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
  resetCreateGoalsForm();

  selectedPeriod.value = PERIOD_TYPES.YEAR;
  selectedPeriodFilter.value = PERIOD_FILTERS.ALL;
  selectedMonthChooseFilter.value = [];
  selectedDayChooseFilter.value = [];

  isDialogVisible.value = false;
};

const handleCreateGoals = async () => {
  const isSelectedMonth = selectedPeriod.value === PERIOD_TYPES.MONTH;

  if (selectedPeriod.value === PERIOD_TYPES.YEAR) {
    await createYearGoal();
  } else {
    switch (selectedPeriodFilter.value) {
      default:
      case PERIOD_FILTERS.ALL:
        if (isSelectedMonth) {
          await createMonthGoal();
        } else {
          await createDayGoal();
        }
        break;

      case PERIOD_FILTERS.EVEN:
        if (isSelectedMonth) {
          await createMonthGoal(getEvenNumbers(MONTH_INDEXES));
        } else {
          await createDayGoal(getEvenNumbers(DAY_NUMBERS));
        }
        break;

      case PERIOD_FILTERS.ODD:
        if (isSelectedMonth) {
          await createMonthGoal(getOddNumbers(MONTH_INDEXES));
        } else {
          await createDayGoal(getOddNumbers(DAY_NUMBERS));
        }

        break;

      case PERIOD_FILTERS.CHOOSE:
        if (isSelectedMonth) {
          await createMonthGoal(selectedMonthChooseFilter.value);
        } else {
          await createDayGoal(
            selectedDayChooseFilter.value,
            selectedMonthChooseFilter.value
          );
        }
        break;
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
    :disabled="selectedYearRef !== CURRENT_YEAR"
    @click="handleShowDialog"
  />

  <Dialog
    v-model:visible="isDialogVisible"
    modal
    dismissable-mask
    @after-hide="resetDialog"
  >
    <template #header>
      <h2>Создать цели</h2>
    </template>

    <BaseForm
      ref="createGoalsFormRef"
      submit-button-label="Создать"
      submit-button-icon="pi-plus"
      class="create-goals-form"
      :resolver="createGoalsResolver"
      :form-submit="handleCreateGoals"
    >
      <CommonGoalFields
        v-model:title="createGoalsForm.title"
        v-model:description="createGoalsForm.description"
      />

      <Accordion>
        <AccordionPanel value="extraSettings">
          <AccordionHeader>Дополнительные параметры</AccordionHeader>
          <AccordionContent>
            <div class="extra-settings-wrapper">
              <div class="extra-settings">
                <Select
                  v-model="selectedPeriod"
                  class="period-select"
                  option-label="label"
                  option-value="value"
                  :options="PERIOD_TYPES_OPTIONS"
                  :disabled="!!createGoalsFormRef?.isLoading"
                />

                <div class="period-settings">
                  <Select
                    v-model="selectedPeriodFilter"
                    option-label="label"
                    option-value="value"
                    :options="PERIOD_FILTERS_OPTIONS"
                    :disabled="
                      selectedPeriod === PERIOD_TYPES.YEAR ||
                      !!createGoalsFormRef?.isLoading
                    "
                  />

                  <MultiSelect
                    v-model="selectedMonthChooseFilter"
                    input-id="month-choose-filter"
                    option-label="label"
                    option-value="value"
                    placeholder="Все месяцы"
                    :options="MONTH_CHOOSE_FILTERS_OPTIONS"
                    :disabled="
                      selectedPeriod === PERIOD_TYPES.YEAR ||
                      selectedPeriodFilter !== PERIOD_FILTERS.CHOOSE ||
                      !!createGoalsFormRef?.isLoading
                    "
                  />

                  <MultiSelect
                    v-model="selectedDayChooseFilter"
                    input-id="day-choose-filter"
                    placeholder="Все дни"
                    :options="dayChooseFilterOptions"
                    :disabled="
                      selectedPeriod !== PERIOD_TYPES.DAY ||
                      selectedPeriodFilter !== PERIOD_FILTERS.CHOOSE ||
                      !!createGoalsFormRef?.isLoading
                    "
                  />
                </div>
              </div>

              <Divider />

              <TimesFields
                v-model:times-suffix="createGoalsForm.timesSuffix"
                v-model:times-start="createGoalsForm.timesStart"
                v-model:times-end="createGoalsForm.timesEnd"
                v-model:times-step="createGoalsForm.timesStep"
              />

              <template v-if="selectedPeriod === PERIOD_TYPES.YEAR">
                <YearDateFields
                  v-model:start-date="createGoalsForm.startDate"
                  v-model:end-date="createGoalsForm.endDate"
                />
              </template>

              <template v-if="selectedPeriod === PERIOD_TYPES.MONTH">
                <MonthDateFields
                  v-model:start-day="createGoalsForm.startDay"
                  v-model:end-day="createGoalsForm.endDay"
                />
              </template>

              <template v-if="selectedPeriod === PERIOD_TYPES.DAY">
                <DayDateFields
                  v-model:start-time="createGoalsForm.startTime"
                  v-model:end-time="createGoalsForm.endTime"
                />
              </template>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </BaseForm>
  </Dialog>
</template>

<style lang="scss">
.create-goals-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
  padding-top: 5px;
}

.extra-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.extra-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.period-settings {
  display: flex;
  gap: 10px;
}

.p-accordionheader {
  --p-accordion-header-padding: 0 0 20px 0;
}

.p-accordionpanel {
  --p-accordion-panel-border-width: 0;
}

.p-accordioncontent-content {
  --p-accordion-content-padding: 0;
}

.p-divider-horizontal {
  --p-divider-horizontal-margin: 0;
}

.p-select,
.p-multiselect {
  width: 162px;
}

.period-select {
  width: 100%;
}
</style>
