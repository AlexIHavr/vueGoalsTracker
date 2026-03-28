import { computed, watch, watchEffect, type Ref } from 'vue';

import type { GoalFormFields } from '../interfaces/goalFormFields';
import type { FormFieldState } from '@primevue/forms/form';
import type { BaseFormExpose } from 'features/baseForm';

export function useWatchFormRefs(
  createGoalsFormRef: Ref<BaseFormExpose | null>,
  initialFields: GoalFormFields
) {
  const formStates = computed<
    Record<keyof GoalFormFields, FormFieldState> | undefined
  >(() => createGoalsFormRef.value?.formRef?.states);

  const validateFormState = (field: keyof GoalFormFields) => {
    const formRefValue = createGoalsFormRef.value?.formRef;

    if (formStates.value?.[field]?.invalid) {
      formRefValue?.validate(field);
    }
  };

  watchEffect(() => {
    createGoalsFormRef.value?.formRef?.setValues({
      timesStart: initialFields.timesStart,
      timesEnd: initialFields.timesEnd,
      timesStep: initialFields.timesStep,
      startDay: initialFields.startDay,
      endDay: initialFields.endDay,
    } as GoalFormFields);
  });

  watch(
    () => formStates.value?.timesStart?.value,
    () => {
      validateFormState('timesEnd');
    }
  );

  watch(
    () => formStates.value?.timesEnd?.value,
    () => {
      validateFormState('timesStart');
    }
  );

  watch(
    () => formStates.value?.startDate?.value,
    () => {
      validateFormState('endDate');
    }
  );

  watch(
    () => formStates.value?.endDate?.value,
    () => {
      validateFormState('startDate');
    }
  );

  watch(
    () => formStates.value?.startDay?.value,
    () => {
      validateFormState('endDay');
    }
  );

  watch(
    () => formStates.value?.endDay?.value,
    () => {
      validateFormState('startDay');
    }
  );

  watch(
    () => formStates.value?.startTime?.value,
    () => {
      validateFormState('endTime');
    }
  );

  watch(
    () => formStates.value?.endTime?.value,
    () => {
      validateFormState('startTime');
    }
  );
}
