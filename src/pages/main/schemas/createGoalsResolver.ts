import { zodResolver } from '@primevue/forms/resolvers/zod';
import z from 'zod';

import { getLocaleNumberString } from 'shared/utils';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type {
  CreateGoalsFormFields,
  CreateGoalsFormTimesFields,
} from '../interfaces/createGoalsFormFields';

const MAX_TITLE_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_TIMES = 1_000_000;
const MAX_TIMES_SUFFIX_LENGTH = 5;

const MAX_TIMES_LOCAL_STRING = getLocaleNumberString(MAX_TIMES);

const getTimesScheme = (
  field: keyof CreateGoalsFormTimesFields,
  name: string
) => {
  const defaultField = DEFAULT_GOALS_FORM_FIELDS[field];

  //preprocess ignores null value - fix open issue https://github.com/primefaces/primevue/issues/8364
  return z.preprocess(
    (value) => (value === null ? defaultField : value),
    z
      .number()
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
      timesStart: getTimesScheme('timesStart', 'Начальное количество'),
      timesEnd: getTimesScheme('timesEnd', 'Количество'),
      timesStep: getTimesScheme('timesStep', 'Шаг'),
      timesSuffix: z.string().max(MAX_TIMES_SUFFIX_LENGTH, {
        error: `Наименование количества не должно превышать ${MAX_TIMES_SUFFIX_LENGTH} символов`,
      }),
    })
    .refine(({ timesStart, timesEnd }) => timesEnd > timesStart, {
      path: ['timesEnd'],
      error: 'Начальное количество не должно превышать количество',
    }) satisfies z.ZodType<CreateGoalsFormFields>
);
