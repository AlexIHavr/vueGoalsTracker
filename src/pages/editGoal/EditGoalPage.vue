<script setup lang="ts">
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
  <div>
    <div v-if="isLoading">Loading...</div>
    <GoalCard v-else-if="goal" :goal="goal" />
    <h3 v-else>Такой цели нет</h3>
  </div>
</template>
