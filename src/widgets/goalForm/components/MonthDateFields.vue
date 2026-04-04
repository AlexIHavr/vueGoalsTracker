<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { inject } from 'vue';

import { BaseFormField } from 'features/baseFormField';
import { GoalTip } from 'shared/components';

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
  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="startDay">
      <InputNumber
        v-model="startDay"
        input-id="goals-startDay"
        fluid
        show-clear
        :min="initialFields?.startDay"
      />
      <label for="goals-startDay">День начала</label>
    </BaseFormField>

    <GoalTip
      text="Укажите с какого числа начнет действовать ваша цель в рамкам месяца (если день начала превышает количество дней в месяце, то будет выбран последний день данного месяца)"
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
        :min="initialFields?.startDay"
      />
      <label for="goals-endDay">День окончания</label>
    </BaseFormField>

    <GoalTip
      text="Укажите до какого числа будет действовать ваша цель в рамкам месяца (если день окончания превышает количество дней в месяце, то будет выбран последний день данного месяца)"
    />
  </div>
</template>
