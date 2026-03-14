<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';

import { BaseFormField } from 'features/baseFormField';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

type StartDay = Pick<CreateGoalsFormFields, 'startDay'>['startDay'];
type EndDay = Pick<CreateGoalsFormFields, 'endDay'>['endDay'];

const startDay = defineModel<StartDay>('startDay', { required: true });

const endDay = defineModel<EndDay>('endDay', { required: true });
</script>

<template>
  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="startDay">
    <InputNumber
      v-model="startDay"
      input-id="goals-startDay"
      fluid
      show-clear
      :min="DEFAULT_GOALS_FORM_FIELDS.startDay"
    />
    <label for="goals-startDay">День начала*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="endDay">
    <InputNumber
      v-model="endDay"
      input-id="goals-endDay"
      fluid
      show-clear
      :min="DEFAULT_GOALS_FORM_FIELDS.startDay"
    />
    <label for="goals-endDay">День окончания*</label>
  </BaseFormField>
</template>
