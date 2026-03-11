import type { FormInstance } from '@primevue/forms/form';
import type { Ref } from 'vue';

export interface BaseFormExpose {
  formRef: FormInstance | null;
  isLoading: Ref<boolean>;
}
