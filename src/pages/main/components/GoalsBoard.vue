<script setup lang="ts">
import { computed } from 'vue';

import { GoalCard } from 'features/goalCard';
import { useGoals } from 'shared/hooks';
import { selectedYearRef } from 'shared/store';

const { data } = useGoals();

const dataInYear = computed(() =>
  data.value
    .filter(
      ({ startDate }) =>
        startDate.toDate().getFullYear() === selectedYearRef.value
    )
    .sort(
      (firstGoal, secondGoal) =>
        firstGoal.startDate.seconds - secondGoal.startDate.seconds
    )
);
</script>

<template>
  <main class="goals-board-wrapper">
    <TransitionGroup name="goal-cards">
      <GoalCard v-for="goal in dataInYear" :key="goal.id" :goal="goal" />
    </TransitionGroup>
  </main>
</template>

<style lang="scss">
.goals-board-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.goal-cards-enter-active {
  transition: all 0.3s;
}

.goal-cards-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
