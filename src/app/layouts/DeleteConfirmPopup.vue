<script setup lang="ts">
import Button from 'primevue/button';
import ConfirmPopup from 'primevue/confirmpopup';
</script>

<template>
  <ConfirmPopup>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="delete-confirm-popup-wrapper">
        <h4 class="delete-confirm-popup-header">
          <i class="pi pi-info-circle delete-confirm-popup-icon" />
          <span>{{ message.message }}</span>
        </h4>

        <div class="delete-confirm-popup-buttons">
          <Button
            label="Удалить"
            size="small"
            severity="danger"
            icon="pi pi-trash"
            @click.stop="acceptCallback"
          />

          <Button
            label="Отменить"
            severity="secondary"
            size="small"
            icon="pi pi-times"
            @click.stop="rejectCallback"
          />
        </div>
      </div>
    </template>
  </ConfirmPopup>
</template>

<style lang="scss" scoped>
.delete-confirm-popup-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  padding: 10px;
}

.delete-confirm-popup-header {
  display: flex;
  gap: 5px;
  align-items: center;
}

.delete-confirm-popup-buttons {
  display: flex;
  gap: 5px;
}

.delete-confirm-popup-icon {
  font-size: var(--p-confirmpopup-icon-size);
}
</style>
