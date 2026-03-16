<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';

import { BaseFormField } from 'features/baseFormField';
import { ALL_EXCEPT_NUMBERS_REGEX } from 'shared/consts';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

const timesSuffix = defineModel<CreateGoalsFormFields['timesSuffix']>(
  'timesSuffix',
  { required: true }
);

const timesStart = defineModel<CreateGoalsFormFields['timesStart'] | null>(
  'timesStart',
  { required: true }
);

const timesEnd = defineModel<CreateGoalsFormFields['timesEnd'] | null>(
  'timesEnd',
  {
    required: true,
  }
);

const timesStep = defineModel<CreateGoalsFormFields['timesStep'] | null>(
  'timesStep',
  {
    required: true,
  }
);
</script>

<template>
  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="timesSuffix"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.timesSuffix"
  >
    <InputText
      id="goals-timesSuffix"
      v-model="timesSuffix"
      v-keyfilter="ALL_EXCEPT_NUMBERS_REGEX"
      fluid
      show-clear
    />
    <label for="goals-timesSuffix">Наименование количества</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="timesStart">
    <InputNumber
      v-model="timesStart"
      input-id="goals-timesStart"
      fluid
      show-clear
      :suffix="timesSuffix"
      :min="DEFAULT_GOALS_FORM_FIELDS.timesStart"
    />
    <label for="goals-timesStart">Начальное количество*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="timesEnd">
    <InputNumber
      v-model="timesEnd"
      input-id="goals-timesEnd"
      fluid
      show-clear
      :suffix="timesSuffix"
      :min="DEFAULT_GOALS_FORM_FIELDS.timesEnd"
    />
    <label for="goals-timesEnd">Количество*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="timesStep">
    <InputNumber
      v-model="timesStep"
      input-id="goals-timesStep"
      fluid
      show-clear
      :suffix="timesSuffix"
      :min="DEFAULT_GOALS_FORM_FIELDS.timesStep"
    />
    <label for="goals-timesStep">Шаг*</label>
  </BaseFormField>
</template>
