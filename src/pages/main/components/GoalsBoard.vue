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
  <TransitionGroup name="goal-cards" tag="main" class="goals-board">
    <GoalCard v-for="goal in dataInYear" :key="goal.id" :goal="goal" />
  </TransitionGroup>
</template>

<style lang="scss">
.goals-board {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.goal-cards-enter-active {
  animation: bounce-in 0.5s;
}

.goal-cards-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }

  100% {
    opacity: 0;
    transform: scale(0.3);
  }
}
</style>
