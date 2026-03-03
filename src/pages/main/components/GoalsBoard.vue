<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';

import { useGoals } from 'shared/hooks';

import CreateGoalsDialog from './CreateGoalsDialog.vue';

const { data, removeGoal } = useGoals();
</script>

<template>
  <main class="goals-board-wrapper">
    <CreateGoalsDialog />

    <Card v-for="goal in data" :key="goal.id">
      <template #title>{{ goal.title }}</template>
      <template #content>{{ goal.description }}</template>
      <template #footer>
        <Button
          icon="pi pi-times"
          aria-label="Save"
          severity="danger"
          @click="removeGoal(goal.id)"
        />
      </template>
    </Card>
  </main>
</template>

<style lang="scss">
.goals-board-wrapper {
  margin-top: 20px;
}
</style>
