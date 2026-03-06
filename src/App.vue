<script setup lang="ts">
import Button from 'primevue/button';

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark-theme');
};
</script>

<template>
  <Button label="Submit" />
  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
</template>
