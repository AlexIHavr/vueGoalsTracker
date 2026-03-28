<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { inject } from 'vue';

import { BaseFormField } from 'features/baseFormField';
import {
  DATE_FIELD_FORMAT,
  MAX_START_DATE,
  MIN_START_DATE,
} from 'shared/consts';

import { INITIAL_FIELDS_INJECT_KEY } from '../consts/injectKeys';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const initialFields = inject(INITIAL_FIELDS_INJECT_KEY);

const startDate = defineModel<GoalFormFields['startDate']>('startDate', {
  required: true,
});

const endDate = defineModel<GoalFormFields['endDate']>('endDate', {
  required: true,
});
</script>

<template>
  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="startDate" :initial-value="initialFields?.startDate">
    <DatePicker
      v-model="startDate"
      input-id="goals-startDate"
      icon-display="input"
      fluid
      show-icon
      :disabled-dates="[startDate]"
      :date-format="DATE_FIELD_FORMAT"
      :manual-input="false"
      :min-date="MIN_START_DATE"
      :max-date="MAX_START_DATE"
    />
    <label for="goals-startDate">Начало действия*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="endDate" :initial-value="initialFields?.endDate">
    <DatePicker
      v-model="endDate"
      input-id="goals-endDate"
      icon-display="input"
      fluid
      show-icon
      :disabled-dates="[endDate]"
      :date-format="DATE_FIELD_FORMAT"
      :manual-input="false"
      :min-date="MIN_START_DATE"
      :max-date="MAX_START_DATE"
    />
    <label for="goals-endDate">Конец действия*</label>
  </BaseFormField>
</template>
