<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

const isDialogVisible = ref(false);

const handleShowDialog = () => {
  isDialogVisible.value = true;
};
</script>

<template>
  <Button
    label="Добавить цели"
    icon="pi pi-plus"
    raised
    @click="handleShowDialog"
  />
  <Dialog v-model:visible="isDialogVisible" />
</template>
