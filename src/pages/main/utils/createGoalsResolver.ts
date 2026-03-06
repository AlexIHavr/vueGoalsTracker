import type { CreateGoalsFormFields } from '../types/createGoalsFormFields';
import type { FormResolverOptions } from '@primevue/forms';
import type { FormErrors } from 'shared/types';

export const MAX_FIELDS_COUNT = {
  TITLE_LENGTH: 20,
  DESCRIPTION_LENGTH: 100,
  TIMES_TO_COMPLETE: 1000,
} as const;

export const createGoalsResolver = ({ values }: FormResolverOptions) => {
  const { title, description, timesStart, timesEnd, timesStep } =
    values as CreateGoalsFormFields;
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

  if (timesEnd === null) {
    errors.timesEnd = [{ message: 'Количество раз обязательно' }];
  } else if (timesEnd <= 0 || timesEnd > MAX_FIELDS_COUNT.TIMES_TO_COMPLETE) {
    errors.timesEnd = [
      {
        message: `Количество раз должно быть от 1 до ${MAX_FIELDS_COUNT.TIMES_TO_COMPLETE}`,
      },
    ];
  }

  if (timesStart === null) {
    errors.timesStart = [{ message: 'Начальное количество раз обязательно' }];
  } else if (
    timesStart < 0 ||
    timesStart > MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1
  ) {
    errors.timesStart = [
      {
        message: `Начальное количество раз должно быть от 0 до ${MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1}`,
      },
    ];
  } else if (timesStart >= timesEnd) {
    errors.timesStart = [
      {
        message: 'Начальное количество раз не должно превышать количество раз',
      },
    ];
  }

  if (timesStep === null) {
    errors.timesStep = [{ message: 'Шаг обязательный' }];
  } else if (
    timesStep <= 0 ||
    timesStep > MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1
  ) {
    errors.timesStep = [
      {
        message: `Шаг должен быть от 1 до ${MAX_FIELDS_COUNT.TIMES_TO_COMPLETE - 1}`,
      },
    ];
  }

  return { values, errors };
};
