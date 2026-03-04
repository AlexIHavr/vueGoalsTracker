import type { FormSubmitEvent } from '@primevue/forms';
import type { Ref } from 'vue';

export interface BaseFormEvent extends FormSubmitEvent {
  submitErrorMessage: Ref<string | null>;
}
