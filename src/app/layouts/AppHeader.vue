<script setup lang="ts">
import { signOut } from 'firebase/auth';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';

import { auth } from 'shared/api';
import { ROUTES_PATHS } from 'shared/consts';
import { useMatchMedia, useNotification } from 'shared/hooks';
import { appLocalStorage } from 'shared/utils';

const isMobileMedia = useMatchMedia();

const isLoading = ref<boolean>(false);
const isDarkTheme = ref<boolean>(appLocalStorage.get('isDarkTheme') ?? false);

const router = useRouter();
const route = useRoute();
const toast = useNotification();
const user = useCurrentUser();

const handleLogout = async () => {
  isLoading.value = true;

  try {
    await signOut(auth);
    router.push(ROUTES_PATHS.AUTH);
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при выходе',
      detail: (error as Error).message,
    });
  } finally {
    isLoading.value = false;
  }
};

const handleToggleTheme = () => {
  document.documentElement.classList.toggle('dark-theme');

  isDarkTheme.value = !isDarkTheme.value;

  appLocalStorage.set('isDarkTheme', isDarkTheme.value);
};

const goToMain = () => {
  router.push(ROUTES_PATHS.MAIN);
};

watchEffect(() => {
  if (isMobileMedia.value) {
    document.documentElement.classList.add('is-mobile');
  } else {
    document.documentElement.classList.remove('is-mobile');
  }
});
</script>

<template>
  <header class="app-header">
    <Button
      label="Выйти"
      icon="pi pi-sign-out"
      severity="danger"
      raised
      :disabled="isLoading"
      @click="handleLogout"
    />

    <Button
      icon="pi pi-sync"
      severity="contrast"
      raised
      :label="isDarkTheme ? 'Светлая тема' : 'Темная тема'"
      @click="handleToggleTheme"
    />

    <Button
      icon="pi pi-home"
      raised
      :label="isMobileMedia ? '' : 'Все цели'"
      :class="{ active: route.path === ROUTES_PATHS.MAIN }"
      @click="goToMain"
    />

    <Message class="welcome-message" severity="secondary">
      <h4>Добро пожаловать {{ user?.email }}</h4>
    </Message>

    <Message severity="success">beta v.1.0.1</Message>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  .is-mobile & {
    justify-content: space-evenly;
  }
}

.welcome-message {
  flex-grow: 1;
}
</style>
