import { zodResolver } from '@primevue/forms/resolvers/zod';
import z from 'zod';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type {
  CreateGoalsFormFields,
  CreateGoalsFormTimesFields,
} from '../types/createGoalsFormFields';

const MAX_TITLE_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_TIMES = 1_000_000;

const MAX_TIMES_LOCAL_STRING = MAX_TIMES.toLocaleString('ru-RU');

const getTimesScheme = (
  field: keyof CreateGoalsFormTimesFields,
  name: string
) => {
  const defaultField = DEFAULT_GOALS_FORM_FIELDS[field];

  return z.preprocess(
    (value) => (value === null ? defaultField : value),
    z
      .number({ error: `${name} обязательно` })
      .min(defaultField, {
        error: `${name} не должно быть меньше ${defaultField}`,
      })
      .max(MAX_TIMES, {
        error: `${name} не должно превышать ${MAX_TIMES_LOCAL_STRING}`,
      })
  );
};

export const createGoalsResolver = zodResolver(
  z
    .object({
      title: z
        .string()
        .nonempty({ error: 'Название обязательно' })
        .max(MAX_TITLE_LENGTH, {
          error: `Название не должно превышать ${MAX_TITLE_LENGTH} символов`,
        }),
      description: z.string().max(MAX_DESCRIPTION_LENGTH, {
        error: `Описание не должно превышать ${MAX_DESCRIPTION_LENGTH} символов`,
      }),
      timesStart: getTimesScheme('timesStart', 'Начальное количество раз'),
      timesEnd: getTimesScheme('timesEnd', 'Количество раз'),
      timesStep: getTimesScheme('timesStep', 'Шаг'),
    })
    .refine(({ timesStart, timesEnd }) => timesEnd > timesStart, {
      path: ['timesEnd'],
      error: 'Начальное количество раз не должно превышать количество раз',
    }) satisfies z.ZodType<CreateGoalsFormFields>
);
