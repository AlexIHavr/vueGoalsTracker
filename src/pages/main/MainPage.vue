<script setup lang="ts">
import { signOut } from 'firebase/auth';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';

import { auth } from 'shared/api';
import { DARK_THEME_CLASS, ROUTES_PATHS } from 'shared/consts';
import { useNotification } from 'shared/hooks';
import { appLocalStorage } from 'shared/utils';

const isLoading = ref<boolean>(false);
const isDarkTheme = ref<boolean>(appLocalStorage.get('is-dark-theme'));

const router = useRouter();
const toast = useNotification();
const user = useCurrentUser();

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

const handleToggleTheme = () => {
  document.documentElement.classList.toggle(DARK_THEME_CLASS);

  isDarkTheme.value = !isDarkTheme.value;

  appLocalStorage.set('is-dark-theme', isDarkTheme.value);
};
</script>

<template>
  <header class="main-header">
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      severity="danger"
      raised
      :disabled="isLoading"
      @click="handleLogout"
    />
    <Button
      :label="isDarkTheme ? 'Светлая тема' : 'Темная тема'"
      icon="pi pi-sync"
      severity="info"
      raised
      @click="handleToggleTheme"
    />
    <Message class="welcome-message" severity="secondary"
      >Добро пожаловать {{ user?.email }}</Message
    >
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  display: flex;
  gap: 10px;
}

.welcome-message {
  flex-grow: 1;
}
</style>
