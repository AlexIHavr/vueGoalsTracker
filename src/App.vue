<script setup lang="ts">
import { Button } from 'primevue';

const toggleDarkMode = () => {
  // eslint-disable-next-line no-undef
  document.documentElement.classList.toggle('dark-theme');
};
</script>

<template>
  <Button label="Submit" />
  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
</template>
