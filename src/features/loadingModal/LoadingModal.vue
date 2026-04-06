<script setup lang="ts">
import { ProgressSpinner } from 'primevue';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

const visible = ref<boolean>(true);
</script>

<template>
  <Dialog
    v-model:visible="visible"
    header="Подождите, идет загрузка..."
    modal
    :closable="false"
    :close-on-escape="false"
  >
    <div class="loader-wrapper">
      <ProgressSpinner class="loader" />
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  text-align: center;
}

.loader {
  margin: 0 auto;
}
</style>
