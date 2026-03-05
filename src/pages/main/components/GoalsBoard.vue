<script setup lang="ts">
import { GoalCard } from 'features/goalCard';
import { useGoals } from 'shared/hooks';

const { data } = useGoals();
</script>

<template>
  <main class="goals-board-wrapper">
    <GoalCard v-for="goal in data" :key="goal.id" :goal="goal" />
  </main>
</template>

<style lang="scss">
.goals-board-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
