<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { ref } from 'vue';

import { useGoals, useNotification } from 'shared/hooks';

const isDialogVisible = ref(false);
const goalsTitle = ref<string>('');
const goalsDescription = ref<string>('');
const isLoading = ref<boolean>(false);

const { createGoal } = useGoals();
const toast = useNotification();

const handleShowDialog = () => {
  isDialogVisible.value = true;
};

const resetDialog = () => {
  goalsTitle.value = '';
  goalsDescription.value = '';
  isDialogVisible.value = false;
};

const handleCreateGoals = async () => {
  isLoading.value = true;

  await Promise.resolve(setTimeout(() => {}, 3000));

  try {
    await createGoal({
      title: goalsTitle.value,
      description: goalsDescription.value,
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
      <FloatLabel variant="on">
        <InputText id="goals-title" v-model="goalsTitle" size="large" fluid />
        <label for="goals-title">Название</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <Textarea
          id="goals-description"
          v-model="goalsDescription"
          size="large"
          class="goals-description"
          fluid
        />
        <label for="goals-description">Описание</label>
      </FloatLabel>
    </div>
    <template #footer>
      <div class="confirm-button">
        <Button
          label="Подтвердить"
          icon="pi pi-check"
          raised
          :loading="isLoading"
          :disabled="!goalsTitle || isLoading"
          @click="handleCreateGoals"
        />
      </div>
    </template>
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

.confirm-button {
  margin: 0 auto;
}
</style>
