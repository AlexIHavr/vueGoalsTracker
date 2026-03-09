import { yupResolver } from '@primevue/forms/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';

import type { AuthFormFields } from '../interfaces/authFormFields';

const PASSWORD_MIN_LENGTH = 6;

const authSchema: ObjectSchema<AuthFormFields> = object({
  email: string().required('Почта обязательна').email('Некорректная почта'),
  password: string()
    .required('Пароль обязателен')
    .min(
      PASSWORD_MIN_LENGTH,
      `Пароль должен быть минимум ${PASSWORD_MIN_LENGTH} символов`
    ),
});

export const authResolver = yupResolver(authSchema);
