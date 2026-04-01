<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { inject } from 'vue';

import { BaseFormField } from 'features/baseFormField';

import { INITIAL_FIELDS_INJECT_KEY } from '../consts/injectKeys';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const initialFields = inject(INITIAL_FIELDS_INJECT_KEY);

const startDay = defineModel<GoalFormFields['startDay'] | null>('startDay', {
  required: true,
});

const endDay = defineModel<GoalFormFields['endDay'] | null>('endDay', {
  required: true,
});
</script>

<template>
  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="startDay">
    <InputNumber
      v-model="startDay"
      input-id="goals-startDay"
      fluid
      show-clear
      :min="initialFields?.startDay"
    />
    <label for="goals-startDay">День начала*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="endDay">
    <InputNumber
      v-model="endDay"
      input-id="goals-endDay"
      fluid
      show-clear
      :min="initialFields?.startDay"
    />
    <label for="goals-endDay">День окончания*</label>
  </BaseFormField>
</template>
