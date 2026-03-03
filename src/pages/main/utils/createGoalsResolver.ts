import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';
import type { FormResolverOptions } from '@primevue/forms';
import type { FormErrors } from 'shared/types';

export const createGoalsResolver = ({ values }: FormResolverOptions) => {
  const { title, description } = values as CreateGoalsFormFields;
  const errors = {} as FormErrors<CreateGoalsFormFields>;

  if (!title) {
    errors.title = [{ message: 'Название обязательно' }];
  } else if (title.length > 20) {
    errors.title = [{ message: 'Название не должно превышать 20 символов' }];
  }

  if (description && description.length > 100) {
    errors.description = [
      { message: 'Описание не должно превышать 100 символов' },
    ];
  }

  return { values, errors };
};
