import type { FormInstance } from '@primevue/forms/form';

export interface BaseFormExpose {
  readonly formRef: FormInstance | null;
  isLoading: boolean;
}
