<script setup lang="ts">
import Toast from 'primevue/toast';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { ROUTES_PATHS } from 'shared/consts';

import AppHeader from './layouts/AppHeader.vue';
import DeleteConfirmPopup from './layouts/DeleteConfirmPopup.vue';

const route = useRoute();

const isAuthPage = computed<boolean | null>(() =>
  route.matched[0] ? route.matched[0].path === ROUTES_PATHS.AUTH : null
);
</script>

<template>
  <Toast position="top-right" />

  <DeleteConfirmPopup />

  <AppHeader v-if="isAuthPage === false" />

  <router-view />
</template>
