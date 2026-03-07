import { zodResolver } from '@primevue/forms/resolvers/zod';
import z from 'zod';

import type { AuthFormFields } from '../interfaces/authFormFields';

const PASSWORD_MIN_LENGTH = 6;

export const authResolver = zodResolver(
  z.object({
    email: z.email({ error: 'Некорректная почта' }),
    password: z.string().min(PASSWORD_MIN_LENGTH, {
      error: `Пароль должен быть минимум ${PASSWORD_MIN_LENGTH} символов`,
    }),
  }) satisfies z.ZodType<AuthFormFields>
);
