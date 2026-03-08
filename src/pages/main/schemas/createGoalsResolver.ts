import { yupResolver } from '@primevue/forms/resolvers/yup';
import { date, number, object, ObjectSchema, ref, string } from 'yup';

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
  name: string,
  errorVerb: string = 'должно'
) => {
  const defaultField = DEFAULT_GOALS_FORM_FIELDS[field];

  return number()
    .nullable()
    .default(defaultField)
    .min(defaultField, `${name} не ${errorVerb} быть меньше ${defaultField}`)
    .max(
      MAX_TIMES,
      `${name} не ${errorVerb} превышать ${MAX_TIMES_LOCAL_STRING}`
    );
};

const createGoalsSchema: ObjectSchema<CreateGoalsFormFields> = object({
  title: string()
    .required('Название обязательно')
    .max(
      MAX_TITLE_LENGTH,
      `Название не должно превышать ${MAX_TITLE_LENGTH} символов`
    ),
  description: string().max(
    MAX_DESCRIPTION_LENGTH,
    `Описание не должно превышать ${MAX_DESCRIPTION_LENGTH} символов`
  ),
  timesStart: getTimesScheme('timesStart', 'Начальное количество').lessThan(
    ref('timesEnd'),
    'Начальное количество должно быть меньше количества'
  ),
  timesEnd: getTimesScheme('timesEnd', 'Количество').moreThan(
    ref('timesStart'),
    'Количество должно быть больше начального количества'
  ),
  timesStep: getTimesScheme('timesStep', 'Шаг', 'должен'),
  timesSuffix: string().max(
    MAX_TIMES_SUFFIX_LENGTH,
    `Наименование количества не должно превышать ${MAX_TIMES_SUFFIX_LENGTH} символов`
  ),
  startDate: date()
    .typeError('Некорректный формат даты')
    .required('Начало действия обязательно')
    .max(ref('endDate'), 'Начало действия должно быть больше конца действия'),
  endDate: date()
    .typeError('Некорректный формат даты')
    .required('Конец действия обязателен')
    .min(ref('startDate'), 'Конец действия должен быть меньше начала действия'),
});

export const createGoalsResolver = yupResolver(createGoalsSchema);
