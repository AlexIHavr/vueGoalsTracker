<script setup lang="ts">
import { signOut } from 'firebase/auth';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { auth } from 'shared/api';
import { ROUTES_PATHS } from 'shared/consts';
import { useNotification } from 'shared/hooks';

const isLoading = ref<boolean>(false);

const router = useRouter();
const toast = useNotification();

const handleLogout = async () => {
  isLoading.value = true;

  try {
    await signOut(auth);

    toast.add({
      severity: 'success',
      summary: 'Вы успешно вышли',
    });

    router.push(ROUTES_PATHS.AUTH);
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Logout error',
      detail: (error as Error).message,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Button
    label="Logout"
    icon="pi pi-sign-out"
    severity="danger"
    raised
    :disabled="isLoading"
    @click="handleLogout"
  />
</template>
