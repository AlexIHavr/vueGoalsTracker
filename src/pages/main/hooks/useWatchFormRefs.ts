import { watch, type Ref } from 'vue';

import type { BaseFormExpose } from 'features/baseForm';

export function useWatchFormRefs(
  createGoalsFormRef: Ref<BaseFormExpose | undefined>
) {
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
}
