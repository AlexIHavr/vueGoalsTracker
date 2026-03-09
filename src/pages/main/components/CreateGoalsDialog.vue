<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { reactive, ref } from 'vue';

import { BaseForm } from 'features/baseForm';
import { BaseFormField } from 'features/baseFormField';
import { ALL_EXCEPT_NUMBERS_REGEX, CURRENT_YEAR } from 'shared/consts';
import { useGoals } from 'shared/hooks';
import { selectedYearRef } from 'shared/store';

import { DATE_FIELD_FORMAT } from '../consts/dateFormats';
import {
  DEFAULT_GOALS_FORM_FIELDS,
  MAX_START_DATE,
  MIN_START_DATE,
} from '../consts/goalsFormFields';
import {
  PERIOD_FILTERS,
  PERIOD_FILTERS_OPTIONS,
  PERIOD_TYPES,
  PERIOD_TYPES_OPTIONS,
} from '../consts/periodOptions';
import { useWatchFormRefs } from '../hooks/useWatchFormRefs';
import { createGoalsResolver } from '../schemas/createGoalsResolver';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';
import type {
  PeriodFiltersValues,
  PeriodTypesValues,
} from '../types/periodOptions';

const createGoalsForm = reactive<CreateGoalsFormFields>({
  ...DEFAULT_GOALS_FORM_FIELDS,
});

const isDialogVisible = ref(false);
const createGoalsFormRef = ref(null);
const selectedPeriod = ref<PeriodTypesValues>(PERIOD_TYPES.YEAR);
const selectedPeriodFilter = ref<PeriodFiltersValues>(PERIOD_FILTERS.ALL);

const { createGoal } = useGoals();

useWatchFormRefs(createGoalsFormRef);

const handleShowDialog = () => {
  isDialogVisible.value = true;
};

const resetDialog = () => {
  Object.assign(createGoalsForm, { ...DEFAULT_GOALS_FORM_FIELDS });

  isDialogVisible.value = false;
};

const handleCreateGoals = async () => {
  const timesStart =
    createGoalsForm.timesStart ?? DEFAULT_GOALS_FORM_FIELDS.timesStart;

  const timesEnd =
    createGoalsForm.timesEnd ?? DEFAULT_GOALS_FORM_FIELDS.timesEnd;

  const timesStep =
    createGoalsForm.timesStep ?? DEFAULT_GOALS_FORM_FIELDS.timesStep;

  await createGoal({
    ...createGoalsForm,
    timesStart,
    timesEnd,
    timesStep,
    timesCurrent: timesStart,
    isCompleted: false,
  });

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
      <!-- @vue-generic {keyof CreateGoalsFormFields} -->
      <BaseFormField
        name="title"
        :initial-value="DEFAULT_GOALS_FORM_FIELDS.title"
      >
        <InputText
          id="goals-title"
          v-model="createGoalsForm.title"
          size="large"
          fluid
        />
        <label for="goals-title">Название*</label>
      </BaseFormField>

      <!-- @vue-generic {keyof CreateGoalsFormFields} -->
      <BaseFormField
        name="description"
        :initial-value="DEFAULT_GOALS_FORM_FIELDS.description"
      >
        <Textarea
          id="goals-description"
          v-model="createGoalsForm.description"
          size="large"
          class="goals-description"
          fluid
        />
        <label for="goals-description">Описание</label>
      </BaseFormField>

      <Accordion>
        <AccordionPanel value="extraSettings">
          <AccordionHeader>Дополнительные параметры</AccordionHeader>
          <AccordionContent>
            <div class="extra-settings-wrapper">
              <div class="period-settings">
                <Select
                  v-model="selectedPeriod"
                  option-label="label"
                  option-value="value"
                  :default-value="PERIOD_TYPES.YEAR"
                  :options="PERIOD_TYPES_OPTIONS"
                />

                <Select
                  v-if="selectedPeriod !== PERIOD_TYPES.YEAR"
                  v-model="selectedPeriodFilter"
                  option-label="label"
                  option-value="value"
                  :default-value="PERIOD_FILTERS.ALL"
                  :options="PERIOD_FILTERS_OPTIONS"
                />
              </div>

              <Divider />

              <!-- @vue-generic {keyof CreateGoalsFormFields} -->
              <BaseFormField
                name="timesSuffix"
                :initial-value="DEFAULT_GOALS_FORM_FIELDS.timesSuffix"
              >
                <InputText
                  id="goals-timesSuffix"
                  v-model="createGoalsForm.timesSuffix"
                  v-keyfilter="ALL_EXCEPT_NUMBERS_REGEX"
                  fluid
                  show-clear
                />
                <label for="goals-timesSuffix">Наименование количества</label>
              </BaseFormField>

              <!-- @vue-generic {keyof CreateGoalsFormFields} -->
              <BaseFormField name="timesStart">
                <InputNumber
                  id="goals-timesStart"
                  v-model="createGoalsForm.timesStart"
                  fluid
                  show-clear
                  :pt:pcinputtext:root="{ autocomplete: 'off' }"
                  :suffix="createGoalsForm.timesSuffix"
                  :min="DEFAULT_GOALS_FORM_FIELDS.timesStart"
                />
                <label for="goals-timesStart">Начальное количество</label>
              </BaseFormField>

              <!-- @vue-generic {keyof CreateGoalsFormFields} -->
              <BaseFormField name="timesEnd">
                <InputNumber
                  id="goals-timesEnd"
                  v-model="createGoalsForm.timesEnd"
                  fluid
                  show-clear
                  :pt:pcinputtext:root="{ autocomplete: 'off' }"
                  :suffix="createGoalsForm.timesSuffix"
                  :min="DEFAULT_GOALS_FORM_FIELDS.timesEnd"
                />
                <label for="goals-timesEnd">Количество</label>
              </BaseFormField>

              <!-- @vue-generic {keyof CreateGoalsFormFields} -->
              <BaseFormField name="timesStep">
                <InputNumber
                  id="goals-timesStep"
                  v-model="createGoalsForm.timesStep"
                  fluid
                  show-clear
                  :pt:pcinputtext:root="{ autocomplete: 'off' }"
                  :suffix="createGoalsForm.timesSuffix"
                  :min="DEFAULT_GOALS_FORM_FIELDS.timesStep"
                />
                <label for="goals-timesStep">Шаг</label>
              </BaseFormField>

              <!-- @vue-generic {keyof CreateGoalsFormFields} -->
              <BaseFormField
                name="startDate"
                :initial-value="DEFAULT_GOALS_FORM_FIELDS.startDate"
              >
                <DatePicker
                  id="goals-startDate"
                  v-model="createGoalsForm.startDate"
                  fluid
                  show-icon
                  :date-format="DATE_FIELD_FORMAT"
                  :manual-input="false"
                  :min-date="MIN_START_DATE"
                  :max-date="MAX_START_DATE"
                />
                <label for="goals-startDate">Начало действия</label>
              </BaseFormField>

              <!-- @vue-generic {keyof CreateGoalsFormFields} -->
              <BaseFormField
                name="endDate"
                :initial-value="DEFAULT_GOALS_FORM_FIELDS.endDate"
              >
                <DatePicker
                  id="goals-endDate"
                  v-model="createGoalsForm.endDate"
                  fluid
                  show-icon
                  :date-format="DATE_FIELD_FORMAT"
                  :manual-input="false"
                  :min-date="MIN_START_DATE"
                  :max-date="MAX_START_DATE"
                />
                <label for="goals-endDate">Конец действия</label>
              </BaseFormField>
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

.goals-description {
  height: 100px;
  resize: none;
}

.extra-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.p-select {
  width: 135px;

  .p-select-label {
    padding-right: 0;
  }
}
</style>
