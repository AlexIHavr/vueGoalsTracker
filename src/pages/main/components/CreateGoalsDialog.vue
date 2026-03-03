<script setup lang="ts">
import Form, { type FormSubmitEvent } from '@primevue/forms/form';
import FormField from '@primevue/forms/formfield';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Textarea from 'primevue/textarea';
import { reactive, ref } from 'vue';

import { useGoals, useNotification } from 'shared/hooks';

import { createGoalsResolver } from '../utils/createGoalsResolver';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

const createGoalsForm = reactive<CreateGoalsFormFields>({
  title: '',
  description: '',
});

const isDialogVisible = ref(false);
const isLoading = ref<boolean>(false);

const { createGoal } = useGoals();
const toast = useNotification();

const handleShowDialog = () => {
  isDialogVisible.value = true;
};

const resetDialog = () => {
  createGoalsForm.title = '';
  createGoalsForm.description = '';

  isDialogVisible.value = false;
};

const handleCreateGoals = async ({ valid }: FormSubmitEvent) => {
  if (!valid) {
    return;
  }

  isLoading.value = true;

  try {
    await createGoal({
      title: createGoalsForm.title,
      description: createGoalsForm.description,
      startDate: new Date(2026, 0),
      endDate: new Date(2026, 12, 0),
      isCompleted: false,
    });

    resetDialog();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при создании',
      detail: (error as Error).message,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Button
    label="Добавить цели"
    icon="pi pi-plus"
    raised
    @click="handleShowDialog"
  />
  <Dialog v-model:visible="isDialogVisible" modal>
    <template #header>
      <h2 class="goals-header">Создать цели</h2>
    </template>
    <div class="goals-content">
      <Form
        v-slot="$form"
        :model="createGoalsForm"
        :resolver="createGoalsResolver"
        @submit="handleCreateGoals"
      >
        <FormField v-slot="$field" name="title">
          <FloatLabel variant="on">
            <InputText
              id="goals-title"
              v-model="createGoalsForm.title"
              size="large"
              fluid
            />
            <label for="goals-title">Название</label>
          </FloatLabel>

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="description">
          <FloatLabel variant="on">
            <Textarea
              id="goals-description"
              v-model="createGoalsForm.description"
              size="large"
              class="goals-description"
              fluid
            />
            <label for="goals-description">Описание</label>
          </FloatLabel>

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <Button
          type="submit"
          label="Подтвердить"
          icon="pi pi-check"
          raised
          :loading="isLoading"
          :disabled="!$form.valid || isLoading"
        />
      </Form>
    </div>
  </Dialog>
</template>

<style lang="scss">
.goals-header {
  margin: 0;
}

.goals-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
  padding-top: 5px;
}

.goals-description {
  height: 100px;
  resize: none;
}
</style>
