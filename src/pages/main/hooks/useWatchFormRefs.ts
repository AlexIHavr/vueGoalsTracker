import { watch, watchEffect, type Ref } from 'vue';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';
import type { BaseFormExpose } from 'features/baseForm';

export function useWatchFormRefs(
  createGoalsFormRef: Ref<BaseFormExpose | undefined>
) {
  watchEffect(() => {
    createGoalsFormRef.value?.formRef?.setValues({
      timesStart: DEFAULT_GOALS_FORM_FIELDS.timesStart,
      timesEnd: DEFAULT_GOALS_FORM_FIELDS.timesEnd,
      timesStep: DEFAULT_GOALS_FORM_FIELDS.timesStep,
      startDay: DEFAULT_GOALS_FORM_FIELDS.startDay,
      endDay: DEFAULT_GOALS_FORM_FIELDS.endDay,
    } as CreateGoalsFormFields);
  });

  watch(
    () => createGoalsFormRef.value?.formRef?.states.timesStart?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.timesEnd?.invalid) {
        formRefValue?.validate('timesEnd');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.timesEnd?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.timesStart?.invalid) {
        formRefValue?.validate('timesStart');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.startDate?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.endDate?.invalid) {
        formRefValue?.validate('endDate');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.endDate?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.startDate?.invalid) {
        formRefValue?.validate('startDate');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.startDay?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.endDay?.invalid) {
        formRefValue?.validate('endDay');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.endDay?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.startDay?.invalid) {
        formRefValue?.validate('startDay');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.startTime?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.endTime?.invalid) {
        formRefValue?.validate('endTime');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef?.states.endTime?.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.startTime?.invalid) {
        formRefValue?.validate('startTime');
      }
    }
  );
}
