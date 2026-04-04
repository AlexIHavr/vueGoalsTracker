<script setup lang="ts">
import Form, { type FormSubmitEvent } from '@primevue/forms/form';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { ref } from 'vue';

import type { BaseFormEvent } from './interfaces/baseFormEvent';

const {
  formSubmit,
  submitButtonLabel,
  submitButtonIcon = '',
} = defineProps<{
  formSubmit: (event: BaseFormEvent) => Promise<void>;
  submitButtonLabel: string;
  submitButtonIcon?: string;
}>();

const isLoading = ref<boolean>(false);
const submitErrorMessage = ref<string | null>(null);

const formRef = ref<HTMLFormElement | null>(null);

const handleFormSubmit = async (event: FormSubmitEvent) => {
  if (!event.valid) {
    return;
  }

  isLoading.value = true;
  submitErrorMessage.value = null;

  try {
    await formSubmit({ ...event, submitErrorMessage });
  } catch (error) {
    submitErrorMessage.value = (error as Error).message;
  } finally {
    isLoading.value = false;
  }
};

defineExpose({ formRef, isLoading });
</script>

<template>
  <Form v-slot="$form" ref="formRef" @submit="handleFormSubmit">
    <slot />

    <Button
      type="submit"
      raised
      :label="submitButtonLabel"
      :icon="'pi ' + submitButtonIcon"
      :loading="isLoading"
      :disabled="!$form.valid || isLoading"
    />

    <Message v-if="submitErrorMessage" severity="error">
      {{ submitErrorMessage }}
    </Message>
  </Form>
</template>
