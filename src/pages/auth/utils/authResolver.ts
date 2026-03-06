import type { AuthFormFields } from '../interfaces/authFormFields';
import type { FormResolverOptions } from '@primevue/forms';
import type { FormErrors } from 'shared/types';

export const authResolver = ({ values }: FormResolverOptions) => {
  const { email, password } = values as AuthFormFields;
  const errors = {} as FormErrors<AuthFormFields>;

  if (!email) {
    errors.email = [{ message: 'Почта обязательна' }];
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = [{ message: 'Некорректная почта' }];
  }

  if (!password) {
    errors.password = [{ message: 'Пароль обязателен' }];
  } else if (password.length < 6) {
    errors.password = [{ message: 'Пароль должен быть минимум 6 символов' }];
  }

  return { values, errors };
};
