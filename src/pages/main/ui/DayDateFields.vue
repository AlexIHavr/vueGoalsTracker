<script setup lang="ts">
import InputIcon from 'primevue/inputicon';
import InputMask from 'primevue/inputmask';

import { BaseFormField } from 'features/baseFormField';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

type StartTime = Pick<CreateGoalsFormFields, 'startTime'>['startTime'];
type EndTime = Pick<CreateGoalsFormFields, 'endTime'>['endTime'];

const startTime = defineModel<StartTime>('startTime', { required: true });

const endTime = defineModel<EndTime>('endTime', { required: true });
</script>

<template>
  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="startTime"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.startTime"
  >
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

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="endTime"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.endTime"
  >
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
</template>

<style lang="scss">
.time-icon {
  position: absolute;
  top: 50%;
  right: 11px;
  margin-top: -0.5rem;
  color: var(--p-datepicker-input-icon-color);
}

.p-inputmask {
  --p-inputtext-padding-x: var(--p-form-field-padding-x)
    calc((var(--p-form-field-padding-x) * 2) + var(--p-icon-size));
}
</style>
