<script setup lang="ts">
import Card from 'primevue/card';

import { useGoals } from 'shared/hooks';

import CreateGoalsDialog from './CreateGoalsDialog.vue';

const { data } = useGoals();
</script>

<template>
  <main class="goals-board-wrapper">
    <CreateGoalsDialog />

    <Card v-for="(d, id) in data" :key="id">
      <template #title>{{ d.title }}</template>
      <template #content>{{ d.description }}</template>
    </Card>
  </main>
</template>

<style lang="scss">
.goals-board-wrapper {
  margin-top: 20px;
}
</style>
