<script setup lang="ts">
import DatePicker from 'primevue/datepicker';

import { BaseFormField } from 'features/baseFormField';

import { DATE_FIELD_FORMAT } from '../consts/dateFormats';
import {
  DEFAULT_GOALS_FORM_FIELDS,
  MAX_START_DATE,
  MIN_START_DATE,
} from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

type StartDate = Pick<CreateGoalsFormFields, 'startDate'>['startDate'];
type EndDate = Pick<CreateGoalsFormFields, 'endDate'>['endDate'];

const startDate = defineModel<StartDate>('startDate', { required: true });

const endDate = defineModel<EndDate>('endDate', { required: true });
</script>

<template>
  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="startDate"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.startDate"
  >
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

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="endDate"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.endDate"
  >
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
