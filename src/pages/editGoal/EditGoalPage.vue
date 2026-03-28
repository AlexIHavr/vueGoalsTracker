<script setup lang="ts">
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { useRoute } from 'vue-router';

import { GoalCard } from 'features/goalCard';
import { ROUTES_PATHS } from 'shared/consts';
import { useGoals } from 'shared/hooks';

const route = useRoute();

const { getGoal } = useGoals();

const goal = getGoal(route.params[ROUTES_PATHS.EDIT_GOAL.params] as string);

const isLoading = goal.pending;
</script>

<template>
  <div class="edit-goal-wrapper">
    <ProgressSpinner v-if="isLoading" />

    <div v-else class="edit-goal">
      <Message v-if="!goal" severity="error">
        <h4>Такой цели нет</h4>
      </Message>

      <Message v-else severity="success">
        <h4>Редактирование цели</h4>
      </Message>

      <GoalCard v-if="goal" :goal="goal" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-goal-wrapper {
  display: flex;
}

.edit-goal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>
