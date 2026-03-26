<script setup lang="ts">
import Toast from 'primevue/toast';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { DARK_THEME_CLASS, ROUTES_PATHS } from 'shared/consts';
import { appLocalStorage } from 'shared/utils';

import AppHeader from './layouts/AppHeader.vue';

const route = useRoute();

const isAuthPage = computed<boolean | null>(() =>
  route.matched[0] ? route.matched[0].path === ROUTES_PATHS.AUTH : null
);

const isDarkTheme = appLocalStorage.get('isDarkTheme');

if (isDarkTheme) {
  document.documentElement.classList.add(DARK_THEME_CLASS);
}
</script>

<template>
  <Toast position="top-center" />

  <AppHeader v-if="isAuthPage === false" />

  <router-view />
</template>
