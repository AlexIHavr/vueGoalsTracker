import { yupResolver } from '@primevue/forms/resolvers/yup';
import { date, number, object, ObjectSchema, ref, string } from 'yup';

import { MAX_DAYS_IN_MONTH, MAX_TIMES } from 'shared/consts';
import { TIME_24_REGEX } from 'shared/consts';
import { getLocaleNumberString } from 'shared/utils';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_CATEGORY_LENGTH = 30;

const MAX_TIMES_SUFFIX_LENGTH = 5;

const MIN_TIMES_START = 0;
const MIN_DAY = 1;

const getNumberScheme = ({
  name,
  defaultValue,
  errorVerb = 'должно',
  minValue = MIN_DAY,
  maxValue = MAX_TIMES,
}: {
  name: string;
  defaultValue: number;
  errorVerb?: string;
  minValue?: number;
  maxValue?: number;
}) => {
  const min = minValue;

  return number()
    .transform((value) => (value === null ? defaultValue : value))
    .required(`${name} обязательно`)
    .min(min, `${name} не ${errorVerb} быть меньше ${min}`)
    .max(
      maxValue,
      `${name} не ${errorVerb} превышать ${getLocaleNumberString(maxValue)}`
    );
};

const createGoalSchema = (
  initialFields: GoalFormFields
): ObjectSchema<GoalFormFields> =>
  object({
    title: string()
      .trim()
      .required('Название обязательно')
      .max(
        MAX_TITLE_LENGTH,
        `Название не должно превышать ${MAX_TITLE_LENGTH} символов`
      ),
    description: string()
      .trim()
      .max(
        MAX_DESCRIPTION_LENGTH,
        `Описание не должно превышать ${MAX_DESCRIPTION_LENGTH} символов`
      )
      .defined(),
    category: string()
      .trim()
      .max(
        MAX_CATEGORY_LENGTH,
        `Категория не должна превышать ${MAX_CATEGORY_LENGTH} символов`
      )
      .defined(),
    timesStart: getNumberScheme({
      name: 'Начальное количество',
      defaultValue: initialFields.timesStart,
      minValue: MIN_TIMES_START,
    }).lessThan(
      ref('timesEnd'),
      'Начальное количество должно быть меньше количества'
    ),
    timesEnd: getNumberScheme({
      name: 'Количество',
      defaultValue: initialFields.timesEnd,
    }).moreThan(
      ref('timesStart'),
      'Количество должно быть больше начального количества'
    ),
    timesStep: getNumberScheme({
      name: 'Шаг',
      defaultValue: initialFields.timesStep,
      errorVerb: 'должен',
    }),
    timesSuffix: string()
      .max(
        MAX_TIMES_SUFFIX_LENGTH,
        `Наименование количества не должно превышать ${MAX_TIMES_SUFFIX_LENGTH} символов`
      )
      .defined(),
    startDate: date()
      .typeError('Некорректный формат даты')
      .required('Начало действия обязательно')
      .test(
        'is-less-than-endDate',
        'Начало действия должно быть меньше конца действия',
        function (value) {
          return value < this.parent.endDate;
        }
      ),
    endDate: date()
      .typeError('Некорректный формат даты')
      .required('Конец действия обязателен')
      .test(
        'is-more-than-startDate',
        'Конец действия должен быть больше начала действия',
        function (value) {
          return value > this.parent.startDate;
        }
      ),
    startDay: getNumberScheme({
      name: 'День начала',
      defaultValue: initialFields.startDay,
      errorVerb: 'должен',
      maxValue: MAX_DAYS_IN_MONTH,
    }).lessThan(ref('endDay'), 'День начала должно быть меньше дня окончания'),
    endDay: getNumberScheme({
      name: 'День окончания',
      defaultValue: initialFields.endDay,
      errorVerb: 'должен',
      maxValue: MAX_DAYS_IN_MONTH,
    }).moreThan(
      ref('startDay'),
      'День окончания должен быть больше дня начала'
    ),
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

export const getGoalResolver = (initialFields: GoalFormFields) =>
  yupResolver(createGoalSchema(initialFields));
