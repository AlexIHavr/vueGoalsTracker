<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import { inject } from 'vue';

import { BaseFormField } from 'features/baseFormField';
import { GoalTip } from 'shared/components';
import { ALL_EXCEPT_NUMBERS_REGEX } from 'shared/consts';

import { INITIAL_FIELDS_INJECT_KEY } from '../consts/injectKeys';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const initialFields = inject(INITIAL_FIELDS_INJECT_KEY);

const timesSuffix = defineModel<GoalFormFields['timesSuffix']>('timesSuffix', {
  required: true,
});

const timesStart = defineModel<GoalFormFields['timesStart'] | null>(
  'timesStart',
  { required: true }
);

const timesEnd = defineModel<GoalFormFields['timesEnd'] | null>('timesEnd', {
  required: true,
});

const timesStep = defineModel<GoalFormFields['timesStep'] | null>('timesStep', {
  required: true,
});
</script>

<template>
  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField
      name="timesSuffix"
      :initial-value="initialFields?.timesSuffix"
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

    <GoalTip
      text='Укажите здесь наименование, которое будет применяться ко всем количествам. Например при указании " раз" ваше количестве будет выглядеть как "0 раз из 5 раз"'
    />
  </div>

  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="timesStart">
      <InputNumber
        v-model="timesStart"
        input-id="goals-timesStart"
        fluid
        show-clear
        :suffix="timesSuffix"
        :min="0"
      />
      <label for="goals-timesStart">Начальное количество</label>
    </BaseFormField>

    <GoalTip text="Укажите начальное количество вашей цели" />
  </div>

  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="timesEnd">
      <InputNumber
        v-model="timesEnd"
        input-id="goals-timesEnd"
        fluid
        show-clear
        :suffix="timesSuffix"
        :min="0"
      />
      <label for="goals-timesEnd">Количество</label>
    </BaseFormField>

    <GoalTip
      text="Укажите какое количество раз должна будет выполниться ваша цель"
    />
  </div>

  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="timesStep">
      <InputNumber
        v-model="timesStep"
        input-id="goals-timesStep"
        fluid
        show-clear
        :suffix="timesSuffix"
        :min="0"
      />
      <label for="goals-timesStep">Шаг</label>
    </BaseFormField>

    <GoalTip
      text="Укажите с каким шагом будет выполняться ваша цель. Например при шаге 2 к вашему количеству будет каждый раз прибавляется 2"
    />
  </div>
</template>
