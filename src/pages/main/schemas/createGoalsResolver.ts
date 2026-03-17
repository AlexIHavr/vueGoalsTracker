import { yupResolver } from '@primevue/forms/resolvers/yup';
import { date, number, object, ObjectSchema, ref, string } from 'yup';

import { MAX_DAYS_IN_MONTH } from 'shared/consts';
import { TIME_24_REGEX } from 'shared/consts/regex';
import { getLocaleNumberString } from 'shared/utils';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type {
  CreateGoalsFormFields,
  CreateGoalsFormNumberFields,
} from '../interfaces/createGoalsFormFields';

const MAX_TITLE_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_CATEGORY_LENGTH = 20;

const MAX_TIMES = 1_000_000;
const MAX_TIMES_SUFFIX_LENGTH = 5;

const MIN_DAY = 1;

const getNumberScheme = ({
  field,
  name,
  errorVerb = 'должно',
  minValue,
  maxValue = MAX_TIMES,
}: {
  field: keyof CreateGoalsFormNumberFields;
  name: string;
  errorVerb?: string;
  minValue?: number;
  maxValue?: number;
}) => {
  const min = minValue ?? DEFAULT_GOALS_FORM_FIELDS[field];

  return number()
    .required(`${name} обязательно`)
    .min(min, `${name} не ${errorVerb} быть меньше ${min}`)
    .max(
      maxValue,
      `${name} не ${errorVerb} превышать ${getLocaleNumberString(maxValue)}`
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
  category: string().max(
    MAX_CATEGORY_LENGTH,
    `Категория не должна превышать ${MAX_CATEGORY_LENGTH} символов`
  ),
  timesStart: getNumberScheme({
    field: 'timesStart',
    name: 'Начальное количество',
  }).lessThan(
    ref('timesEnd'),
    'Начальное количество должно быть меньше количества'
  ),
  timesEnd: getNumberScheme({ field: 'timesEnd', name: 'Количество' }).moreThan(
    ref('timesStart'),
    'Количество должно быть больше начального количества'
  ),
  timesStep: getNumberScheme({
    field: 'timesStep',
    name: 'Шаг',
    errorVerb: 'должен',
  }),
  timesSuffix: string().max(
    MAX_TIMES_SUFFIX_LENGTH,
    `Наименование количества не должно превышать ${MAX_TIMES_SUFFIX_LENGTH} символов`
  ),
  startDate: date()
    .typeError('Некорректный формат даты')
    .required('Начало действия обязательно')
    .max(ref('endDate'), 'Начало действия должно быть меньше конца действия'),
  endDate: date()
    .typeError('Некорректный формат даты')
    .required('Конец действия обязателен')
    .min(ref('startDate'), 'Конец действия должен быть больше начала действия'),
  startDay: getNumberScheme({
    field: 'startDay',
    name: 'День начала',
    errorVerb: 'должен',
    maxValue: MAX_DAYS_IN_MONTH,
  }).lessThan(ref('endDay'), 'День начала должно быть меньше дня окончания'),
  endDay: getNumberScheme({
    field: 'endDay',
    name: 'День окончания',
    errorVerb: 'должен',
    minValue: MIN_DAY,
    maxValue: MAX_DAYS_IN_MONTH,
  }).moreThan(ref('startDay'), 'День окончания должен быть больше дня начала'),
  startTime: string()
    .required('Время начала обязательно')
    .matches(TIME_24_REGEX, 'Некорректный формат времени')
    .test(
      'is-less-than-endTime',
      'Время начала должно быть меньше времени окончания',
      function (startTime) {
        return startTime < this.parent.endTime;
      }
    ),
  endTime: string()
    .required('Время окончания обязательно')
    .matches(TIME_24_REGEX, 'Некорректный формат времени')
    .test(
      'is-greater-than-startTime',
      'Время окончания должно быть больше времени начала',
      function (endTime) {
        return endTime > this.parent.startTime;
      }
    ),
});

export const createGoalsResolver = yupResolver(createGoalsSchema);
