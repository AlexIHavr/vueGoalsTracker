import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';
import type { FormResolverOptions } from '@primevue/forms';
import type { FormErrors } from 'shared/types';

export const MAX_FIELDS_COUNT = {
  TITLE_LENGTH: 20,
  DESCRIPTION_LENGTH: 100,
  TIMES_TO_COMPLETE: 1000,
} as const;

export const createGoalsResolver = ({ values }: FormResolverOptions) => {
  const {
    title,
    description,
    startTimesToComplete,
    endTimesToComplete,
    timesStepToComplete,
  } = values as CreateGoalsFormFields;
  const errors = {} as FormErrors<CreateGoalsFormFields>;

  if (!title) {
    errors.title = [{ message: 'Название обязательно' }];
  } else if (title.length > MAX_FIELDS_COUNT.TITLE_LENGTH) {
    errors.title = [
      {
        message: `Название не должно превышать ${MAX_FIELDS_COUNT.TITLE_LENGTH} символов`,
      },
    ];
  }

  if (description && description.length > MAX_FIELDS_COUNT.DESCRIPTION_LENGTH) {
    errors.description = [
      {
        message: `Описание не должно превышать ${MAX_FIELDS_COUNT.DESCRIPTION_LENGTH} символов`,
      },
    ];
  }

  if (endTimesToComplete === null) {
    errors.endTimesToComplete = [{ message: 'Количество раз обязательно' }];
  } else if (
    endTimesToComplete <= 0 ||
    endTimesToComplete > MAX_FIELDS_COUNT.TIMES_TO_COMPLETE
  ) {
    errors.endTimesToComplete = [
      {
        message: `Количество раз должно быть от 1 до ${MAX_FIELDS_COUNT.TIMES_TO_COMPLETE}`,
      },
    ];
  }

  if (startTimesToComplete === null) {
    errors.startTimesToComplete = [
      { message: 'Начальное количество раз обязательно' },
    ];
  } else if (
    startTimesToComplete < 0 ||
    startTimesToComplete > MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1
  ) {
    errors.startTimesToComplete = [
      {
        message: `Начальное количество раз должно быть от 0 до ${MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1}`,
      },
    ];
  } else if (startTimesToComplete >= endTimesToComplete) {
    errors.startTimesToComplete = [
      {
        message: 'Начальное количество раз не должно превышать количество раз',
      },
    ];
  }

  if (timesStepToComplete === null) {
    errors.timesStepToComplete = [{ message: 'Шаг обязательный' }];
  } else if (
    timesStepToComplete <= 0 ||
    timesStepToComplete > MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1
  ) {
    errors.timesStepToComplete = [
      {
        message: `Шаг должен быть от 1 до ${MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1}`,
      },
    ];
  }

  return { values, errors };
};
