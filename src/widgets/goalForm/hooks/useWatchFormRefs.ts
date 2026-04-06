import { computed, watch, type Ref } from 'vue';

import type { GoalFormFields } from '../interfaces/goalFormFields';
import type { FormFieldState } from '@primevue/forms/form';
import type { BaseFormExpose } from 'features/baseForm';

export function useWatchFormRefs(
  createGoalsFormRef: Ref<BaseFormExpose | null>
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

  watch(
    () => createGoalsFormRef.value?.formRef?.valid,
    (value) => {
      if (
        !value &&
        formStates.value?.title.invalid &&
        createGoalsFormRef.value?.formRef?.$el?.parentElement
      ) {
        createGoalsFormRef.value?.formRef.$el.parentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  );

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
