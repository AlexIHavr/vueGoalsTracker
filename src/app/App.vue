<script setup lang="ts">
import Toast from 'primevue/toast';
import { onMounted } from 'vue';

import { DARK_THEME_CLASS } from 'shared/consts';
import { appLocalStorage } from 'shared/utils';

onMounted(() => {
  const isDarkTheme = appLocalStorage.get('is-dark-theme');

  if (isDarkTheme) {
    document.documentElement.classList.add(DARK_THEME_CLASS);
  }
});
</script>

<template>
  <Toast position="top-center" />
  <router-view></router-view>
</template>
