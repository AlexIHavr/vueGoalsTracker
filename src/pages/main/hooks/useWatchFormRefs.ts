import { watch, type Ref } from 'vue';

export function useWatchFormRefs(createGoalsFormRef: Ref) {
  watch(
    () => createGoalsFormRef.value?.formRef.states.timesStart.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.timesEnd.invalid) {
        formRefValue?.validate('timesEnd');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef.states.timesEnd.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.timesStart.invalid) {
        formRefValue?.validate('timesStart');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef.states.startDate.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.endDate.invalid) {
        formRefValue?.validate('endDate');
      }
    }
  );

  watch(
    () => createGoalsFormRef.value?.formRef.states.endDate.value,
    () => {
      const formRefValue = createGoalsFormRef.value?.formRef;

      if (formRefValue?.states.startDate.invalid) {
        formRefValue?.validate('startDate');
      }
    }
  );
}
