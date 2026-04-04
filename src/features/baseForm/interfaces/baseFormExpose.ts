import type { FormInstance } from '@primevue/forms/form';

export interface BaseFormExpose {
  readonly formRef: (FormInstance & { $el: HTMLFormElement }) | null;
  isLoading: boolean;
}
