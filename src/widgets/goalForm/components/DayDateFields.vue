<script setup lang="ts">
import InputIcon from 'primevue/inputicon';
import InputMask from 'primevue/inputmask';
import { inject } from 'vue';

import { BaseFormField } from 'features/baseFormField';
import { GoalTip } from 'shared/components';

import { INITIAL_FIELDS_INJECT_KEY } from '../consts/injectKeys';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const initialFields = inject(INITIAL_FIELDS_INJECT_KEY);

const startTime = defineModel<GoalFormFields['startTime']>('startTime', {
  required: true,
});

const endTime = defineModel<GoalFormFields['endTime']>('endTime', {
  required: true,
});
</script>

<template>
  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="startTime" :initial-value="initialFields?.startTime">
      <InputMask
        id="goals-startTime"
        v-model="startTime"
        mask="99:99"
        placeholder="чч:мм"
        fluid
      />
      <label for="goals-startTime">Время начала*</label>
      <InputIcon class="pi pi-clock time-icon" />
    </BaseFormField>

    <GoalTip text="Укажите время начала действия вашей цели" />
  </div>

  <div class="goal-field-wrapper">
    <!-- @vue-generic {keyof GoalFormFields} -->
    <BaseFormField name="endTime" :initial-value="initialFields?.endTime">
      <InputMask
        id="goals-endTime"
        v-model="endTime"
        mask="99:99"
        placeholder="чч:мм"
        fluid
      />
      <label for="goals-endTime">Время окончания*</label>
      <InputIcon class="pi pi-clock time-icon" />
    </BaseFormField>

    <GoalTip text="Укажите время окончания действия вашей цели" />
  </div>
</template>

<style lang="scss" scoped>
.time-icon {
  position: absolute;
  top: 50%;
  right: 11px;
  margin-top: -0.5rem;
  color: var(--p-datepicker-input-icon-color);
}
</style>
