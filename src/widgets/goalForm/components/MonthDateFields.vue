<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';

import { BaseFormField } from 'features/baseFormField';
import { GoalTip } from 'features/goalTip';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const startDay = defineModel<GoalFormFields['startDay'] | null>('startDay', {
  required: true,
});

const endDay = defineModel<GoalFormFields['endDay'] | null>('endDay', {
  required: true,
});
</script>

<template>
  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="startDay">
      <InputNumber
        v-model="startDay"
        input-id="goals-startDay"
        fluid
        show-clear
        :min="0"
      />
      <label for="goals-startDay">День начала</label>
    </BaseFormField>

    <GoalTip
      text="Укажите с какого числа начнет действовать ваша цель в рамкам месяца (если день начала превышает количество дней в месяце, то будет выбран предпоследний день данного месяца)"
    />
  </div>

  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="endDay">
      <InputNumber
        v-model="endDay"
        input-id="goals-endDay"
        fluid
        show-clear
        :min="0"
      />
      <label for="goals-endDay">День окончания</label>
    </BaseFormField>

    <GoalTip
      text="Укажите до какого числа будет действовать ваша цель в рамкам месяца (если день окончания превышает количество дней в месяце, то будет выбран последний день данного месяца)"
    />
  </div>
</template>
