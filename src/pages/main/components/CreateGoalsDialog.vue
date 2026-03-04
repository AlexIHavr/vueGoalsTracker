<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { reactive, ref } from 'vue';

import { BaseForm } from 'features/baseForm';
import { BaseFormField } from 'features/baseFormField';
import { useGoals } from 'shared/hooks';

import { createGoalsResolver } from '../utils/createGoalsResolver';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

const createGoalsForm = reactive<CreateGoalsFormFields>({
  title: '',
  description: '',
});

const isDialogVisible = ref(false);

const { createGoal } = useGoals();

const handleShowDialog = () => {
  isDialogVisible.value = true;
};

const resetDialog = () => {
  createGoalsForm.title = '';
  createGoalsForm.description = '';

  isDialogVisible.value = false;
};

const handleCreateGoals = async () => {
  await createGoal({
    title: createGoalsForm.title,
    description: createGoalsForm.description,
    startDate: new Date(2026, 0),
    endDate: new Date(2026, 12, 0),
    isCompleted: false,
  });

  resetDialog();
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
    <BaseForm
      submit-button-label="Создать"
      submit-button-icon="pi-plus"
      class="create-goals-form"
      :model="createGoalsForm"
      :resolver="createGoalsResolver"
      :form-submit="handleCreateGoals"
    >
      <BaseFormField field-name="title">
        <InputText
          id="goals-title"
          v-model="createGoalsForm.title"
          size="large"
          fluid
        />
        <label for="goals-title">Название</label>
      </BaseFormField>

      <BaseFormField field-name="description">
        <Textarea
          id="goals-description"
          v-model="createGoalsForm.description"
          size="large"
          class="goals-description"
          fluid
        />
        <label for="goals-description">Описание</label>
      </BaseFormField>
    </BaseForm>
  </Dialog>
</template>

<style lang="scss">
.goals-header {
  margin: 0;
}

.create-goals-form {
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
